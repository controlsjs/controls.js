/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2014 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */

/** 
 *  Group: Settings 
 */

// --- ngSettings --------------------------------------------------------------

var ngSettingsByID = new Array();
var ngSettingsLastID = 0;

/** 
 *  Group: Variables   
 */
/** 
 *  Variable: ngsCookieMaxLen
 *  Maximal data length in one cookie.
 *  Default: 4050 
 */  
var ngsCookieMaxLen = 4050;

function getSettingsByID(Settingsid)
{
  if(ngSettingsByID) return ngSettingsByID[Settingsid];
  return null;
}

function ngset_Set(n,v)
{
  if(!this.IsValidName(n)) return;
  if((this.OnSetSetting)&&(!ngVal(this.OnSetSetting(this,n,v),false))) return;
  
  if((typeof this.Settings[n] === 'undefined')||(!ng_VarEquals(this.Settings[n],v)))
  {
    this.BeginUpdate();
    if(typeof v === 'undefined')
      delete this.Settings[n];
    else
      this.Settings[n]=v;
    this.changed=true;
    this.EndUpdate();
  }
}

function ngset_Get(n,defval)
{
  if(!this.IsValidName(n)) return defval;
  var v=ng_CopyVar(this.Settings[n]);
  if(this.OnGetSetting) v=this.OnGetSetting(this,n,v);
  if(typeof v==='undefined') v=defval;
  return v;
}

function ngset_BeginUpdate()
{
  this.update_cnt++;
  if(this.save_timer) { clearTimeout(this.save_timer); this.save_timer=null; }
}

function ngset_EndUpdate()
{
  this.update_cnt--;
  if(this.update_cnt<=0)
  {
    this.update_cnt = 0;
    if(this.changed) 
    {
      if(this.DelayedSave>0)
      {
        if(this.save_timer) clearTimeout(this.save_timer);
        var s=this;
        this.save_timer = setTimeout(function() {
          s.Save(); 
        },this.DelayedSave);
      }
      else this.Save();
    }
  }
}


function ngset_Clear()
{
  // clear only if not empty
  for(var i in this.Settings)
  {
    this.BeginUpdate();
    this.Settings = new Array();
    this.changed=true;
    this.EndUpdate();
    break;
  }
//  if(!this.rpc) this.rpc=new ngRPC();
//  this.rpc.sendRequest(ng_AddURLParam(this.StorageURL,'clear=1'));  
}

function ngset_Load()
{
  if(!this.rpc) this.rpc=new ngRPC();
  this.rpc.sendRequest(ng_AddURLParam(this.StorageURL,'load=1&id='+this.SettingsID));  
}

function ngset_IsValidName(n)
{
  if((typeof n === 'undefined')||(n=='')) return false;
  
  var re=/[a-zA-Z_$][0-9a-zA-Z_$]*/; 
  return (n.replace(re,'')=='');
}

function ngset_EncodeSetting(n,v)
{
  if(!this.IsValidName(n)) return undefined;
  if(typeof v === 'undefined') return v;
  if(this.OnEncodeSetting) v=this.OnEncodeSetting(this,n,v);
  else v=ng_URLEncode(v);
  
  v=v.replace("%40","%u0040"); // prevent @ auto-unescape 
  return v;
}

function ngset_BuildSettingsStr(p)
{
  var v,params='';
  for(var i in p)
  {
    v=p[i];
    if(typeof v === 'object')
    {
      if(params!='') params+='@';
      params+=i+'@{@'+this.BuildSettingsStr(v)+'@}';
      continue;      
    } 
    v=this.EncodeSetting(i,v);
    if(typeof v === 'undefined') continue;
    if(params!='') params+='@';
    params+=i+'-'+v;
  }
  return params;
}

function ngset_Save()
{
  if((this.OnSettingsSaving)&&(!ngVal(this.OnSettingsSaving(this),false))) return;

  if(this.save_timer) { clearTimeout(this.save_timer); this.save_timer=null; }
  
  // build params
  var i,params=this.BuildSettingsStr(this.Settings);
  // save to cookies
  var url=this.StorageURL;
  var c=1;
  if(params!='')
  {
    while(params!='')
    {
      ngSetCookieByURL('_ngs'+c,params.substr(0,ngsCookieMaxLen),this.StorageExpires,url,false);
      params=params.substring(ngsCookieMaxLen,params.length);
      c++;
      if(c>50) break;
    }
  }
  // clear rest
  var expires=ngCookieExpires(-3600);
  for(i=c;i<=50;i++)
    ngSetCookieByURL('_ngs'+i,'',expires,url,false);
    
  this.changed=false;
  if(this.OnSettingsSaved) this.OnSettingsSaved(this);
}

function ngset_do_load(id,data)
{
  if(typeof data === 'undefined') return; 
  var s=getSettingsByID(id);
  if(s)
  {
    s.Settings=data;
    s.changed = false; 
    if(s.OnSettingsLoaded) s.OnSettingsLoaded(s);
  }
}

/**
 *  Class: ngSettings
 *  Application settings.
 *   
 *  This class is used for storing settings into cookies.
 *  
 *  Syntax:
 *    new *ngSettings* (string id [, string storageurl])
 *    
 *  Parameters:
 *    id - unique ID of settings class
 *    storageurl - URL where settings are saved         
 */   
function ngSettings(id, storageurl)
{
  if(typeof id === 'undefined')
  {
    ngSettingsLastID++;
    id = 'ngSettings'+ngSettingsLastID;
  }
  this.rpc      = null;  
  this.changed = false; 
  this.update_cnt = false;
  this.save_timer = null;
  ngSettingsByID[id]=this;
  this.SettingsID = id;
  this.Settings = new Array();  
  
  /*
   *  Group: Properties
   */
  /*  Variable: StorageURL
   *  URL where settings are saved.
   *  
   *  Default value: *ngApp.AppPath + 'settings/'*  
   */ 
  this.StorageURL = ngVal(storageurl,ngApp.AppPath+'settings/');
  /*  Variable: StorageExpires
   *  Storage cookies expiration time (in seconds).
   *  
   *  Default value: *10 years*  
   */ 
  this.StorageExpires = ngCookieExpires(3600 * 24 * 365 * 10); // 10 years  
  /*  Variable: DelayedSave
   *  Timeout (in ms) after the changes are saved. 
   *  If 0 (zero) the changes are saved immediatelly.    
   *  
   *  Default value: *200*  
   */ 
  this.DelayedSave = 200;

  /*
   *  Group: Methods
   */
  /*  Function: Set
   *  Sets setting.
   *  
   *  Syntax:
   *    void *Set* (string name, mixed value)
   *    
   *  Parameters:
   *    name - setting name
   *    value - setting value
   *    
   *  Returns:
   *    -
   */          
  this.Set = ngset_Set;
  /*  Function: Get
   *  Gets setting.
   *  
   *  Syntax:
   *    mixed *Get* (string name)
   *    
   *  Parameters:
   *    name - setting name
   *    
   *  Returns:
   *    Value of setting.
   */          
  this.Get = ngset_Get;
  
  /**
   *  Function: BeginUpdate
   *  Starts updating settings.
   *  Any changes are saved after the EndUpdate function is called.       
   *  
   *  Syntax:
   *    void *BeginUpdate* ()
   *     
   *  Returns:
   *    -  
   */               
  this.BeginUpdate = ngset_BeginUpdate;
  /**
   *  Function: EndUpdate
   *  Ends settings update.    
   *   
   *  Syntax:
   *    void *BeginUpdate* ()
   *     
   *  Returns:
   *    -  
   */               
  this.EndUpdate = ngset_EndUpdate;

  /**
   *  Function: IsValidName
   *  Checks if given name is a valid setting name.    
   *   
   *  Syntax:
   *    bool *IsValidName* (string name)
   *     
   *  Parameters:
   *    name - setting name
   *    
   *  Returns:
   *    TRUE if name is a valid setting name.
   */               
  this.IsValidName = ngset_IsValidName;
  
  /**
   *  Function: Clear
   *  Clears all settings.    
   *   
   *  Syntax:
   *    void *Clear* ()
   *     
   *  Returns:
   *    -  
   */               
  this.Clear = ngset_Clear;
  /**
   *  Function: Load
   *  Sends settings load request to the server.    
   *   
   *  Syntax:
   *    void *Load* ()
   *     
   *  Returns:
   *    -  
   */               
  this.Load  = ngset_Load;
  /**
   *  Function: Save
   *  Saves settings into cookies.    
   *   
   *  Syntax:
   *    void *Save* ()
   *     
   *  Returns:
   *    -  
   */               
  this.Save  = ngset_Save;
  
  this.EncodeSetting = ngset_EncodeSetting;
  this.BuildSettingsStr = ngset_BuildSettingsStr;
  
  /*
   *  Group: Events
   */
  /*
   *  Event: OnEncodeSetting
   */     
  this.OnEncodeSetting = null;
  /*
   *  Event: OnSetSetting
   */     
  this.OnSetSetting = null;
  /*
   *  Event: OnGetSetting
   */     
  this.OnGetSetting = null;
  /*
   *  Event: OnSettingsSaving
   */     
  this.OnSettingsSaving = null;
  /*
   *  Event: OnSettingsSaved
   */     
  this.OnSettingsSaved = null;
  /*
   *  Event: OnSettingsLoaded
   */     
  this.OnSettingsLoaded = null;
}


if(typeof ngUserControls === 'undefined') ngUserControls = new Array();
ngUserControls['settings'] = {

  OnInit: function() {
    if((typeof ngApp === 'object')&&(ngApp)&&(typeof ngApp.Settings === 'undefined'))
    {
      ngApp.Settings=new ngSettings('ngAppSettings');

      var sp=ngVal(ngApp.StartParams,null);
      if((sp)&&(typeof sp.AppSettingsStorageURL !== 'undefined'))
      {
        var storage=sp.AppSettingsStorageURL;
        if(storage.substr(0,4)!='http')
        {
          if(storage.substr(0,1)=='/') 
          {
            var idx = ngApp.AppPath.indexOf('//')
            if(idx>=0)
            {
              idx=ngApp.AppPath.indexOf('/',idx+2);
              if(idx>=0) storage=ngApp.AppPath.substr(0,idx)+storage;
              else storage=ngApp.AppPath+storage;
            }
          }
          else storage=ngApp.AppPath+storage;
        }
        ngApp.Settings.StorageURL=storage;
      }
        
      if(typeof ngLoadedSettings !== 'undefined') 
      {
        ngApp.Settings.Settings=ngLoadedSettings;
        ngLoadedSettings=undefined;
      }
    }    
  }
};
