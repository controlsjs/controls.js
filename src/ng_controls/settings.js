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

var ngOnSettingsCreated = (typeof ngOnSettingsCreated !== 'undefined' ? ngOnSettingsCreated : null);

function getSettingsByID(Settingsid)
{
  if(ngSettingsByID) return ngSettingsByID[Settingsid];
  return null;
}

function ngset_Set(n,v)
{
  if(!this.IsValidName(n)) return;
  if(typeof v === 'function') v=v(); // functions are not allowed, get return value
  if((this.OnSetSetting)&&(!ngVal(this.OnSetSetting(this,n,v),false))) return;
  
  if((typeof v === 'undefined')||(!ng_VarEquals(this.Settings[n],v)))
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

function ngset_IsValidName(n)
{
  if((typeof n !== 'string')||(n=='')) return false;

  var storage=this.GetStorage();
  if((storage)&&(storage.IsValidName)) return storage.IsValidName(this,n);

  var re=/[a-zA-Z_$][0-9a-zA-Z_$]*/;
  return (n.replace(re,'')=='');
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


function ngset_GetStorage() {
  var storage=null;

  if(this.OnGetStorage) {
    storage=ngVal(this.OnGetStorage(this),null);
  }

  if(!storage) {
    if((typeof this.Storages !== 'object')||(!this.Storages)) return null;
    var stype=this.StorageType;
    if((stype=='')||(stype==='auto')) {
      var s,sp,p=0;
      stype='';
      for(var i in this.Storages) {
        s=this.Storages[i];
        if((!s)||(!s.IsActive)||(!s.IsActive())) continue; // active only
        sp=ngVal(s.Priority,0.5);
        if(sp>1) sp=1;
        if(sp<0) sp=0;
        if(sp>p) {
          stype=i;
          p=sp;
        }
      }
      if(stype=='') {
        ngDEBUGWARN("ngSettings: Storages doesn't exists or all inactive!");
        return null;
      }
      if(this.StorageType=='') this.StorageType=stype;
    }
    storage=ngVal(this.Storages[stype],null);
  }

  if(!storage) {
    ngDEBUGWARN('ngSettings: Storage not found!');
  }
  if((storage)&&((!storage.IsActive)||(!storage.IsActive()))) {
    ngDEBUGWARN('ngSettings: Selected storage is not active!');
    return null;
  }

  return storage;
}

function ngset_Clear()
{
  var storage=this.GetStorage();
  if((storage)&&(storage.Clear)) {
    if(storage.Clear(this)) {
      this.Settings = {};
      this.changed=false;
      return;
    }
  }

  // clear only if not empty, save empty settings
  for(var i in this.Settings)
  {
    this.BeginUpdate();
    this.Settings = {};
    this.changed=true;
    this.EndUpdate();
    break;
  }
}

function ngset_Load()
{
  if((this.OnSettingsLoading)&&(!ngVal(this.OnSettingsLoading(this),false))) return;

  var storage=this.GetStorage();
  if((storage)&&(storage.Load)) {

    if(this.AllowStorageMigration) {
      // Prepare for migration process if needed
      this.migration_data={
        storage: storage,
        altstorage: null,
        used_storages: []
      }
    }
    else delete this.migration_data;

    storage.Load(this);
  }
}

function ngset_DataLoaded(storage,data)
{
  if((typeof data!=='object')||(!data)) {
    // Storage has no data, check if we are prepared for migration and if alternative storages exists
    if((typeof this.migration_data === 'object')&&(typeof this.Storages === 'object')&&(this.Storages)) {
      this.migration_data.used_storages.push(storage);

      // select other available storage sorted by priority
      var altstorage=null;
      var sp,s,p=0;
      for(var i in this.Storages) {
        s=this.Storages[i];
        if((!s)||(!s.Load)||(!s.IsActive)||(!s.IsActive())) continue; // active only
        for(var j in this.migration_data.used_storages) {
          if(this.migration_data.used_storages[j]===s) { s=null; break; }
        }
        if(!s) continue;
        sp=ngVal(s.Priority,0.5);
        if(sp>1) sp=1;
        if(sp<0) sp=0;
        if(sp>p) {
          altstorage=s;
          p=sp;
        }
      }
      if(altstorage) {
        // try load data from alternative storage
        this.migration_data.altstorage=altstorage;
        altstorage.Load(this);
        return;
      }
      delete this.migration_data;
    }
    data={};
  }

  if((this.OnDataLoaded)&&(!ngVal(this.OnDataLoaded(this,data,storage),false))) return;

  this.Settings = ng_CopyVar(data);
  this.changed = false;
  if(this.OnSettingsLoaded) this.OnSettingsLoaded(this,storage);

  if(typeof this.migration_data === 'object') {
    if(this.migration_data.altstorage) {
      // Data was loaded from alternative storage, save data to original storage
      if(this.migration_data.storage.Save) {
        var savedata = ng_CopyVar(this.Settings);
        if((!this.OnDataSave)||(ngVal(this.OnDataSave(this,savedata),false))) {
          this.migration_data.storage.Save(this,savedata);
          return;
        }
      }
    }
    delete this.migration_data;
  }
}

function ngset_Save()
{
  if((this.OnSettingsSaving)&&(!ngVal(this.OnSettingsSaving(this),false))) return;

  if(this.save_timer) { clearTimeout(this.save_timer); this.save_timer=null; }

  var storage=this.GetStorage();
  if((storage)&&(storage.Save)) {

    var data = ng_CopyVar(this.Settings);
    if((this.OnDataSave)&&(!ngVal(this.OnDataSave(this,data),false))) return;

    storage.Save(this,data);
    this.changed=false;
  }
}

function ngset_DataSaved(storage)
{
  if((typeof this.migration_data === 'object')&&(this.migration_data.storage===storage)) {
    // data was saved by migration process, clear data in alternative storage (forces data to be on one place)
    var altstorage=this.migration_data.altstorage;
    delete this.migration_data;
    if(altstorage) {
      if(altstorage.Clear) altstorage.Clear(this);
      else if(altstorage.Save) altstorage.Save(this,{});
    }
  }
  if(this.OnSettingsSaved) this.OnSettingsSaved(this,storage);
}

/**
 *  Class: ngSettings
 *  Application settings.
 *   
 *  This class is used for storing applications settings.
 *  
 *  Syntax:
 *    new *ngSettings* (string id [, object options])
 *    
 *  Parameters:
 *    id - unique ID of settings class
 *    options - optional initial settings
 */   
function ngSettings(id, options)
{
  if(typeof id === 'undefined')
  {
    ngSettingsLastID++;
    id = 'ngSettings'+ngSettingsLastID;
  }
  this.changed = false; 
  this.update_cnt = false;
  this.save_timer = null;
  ngSettingsByID[id]=this;
  this.SettingsID = id;
  this.Settings = {};
  
  /*
   *  Group: Properties
   */
  /*  Variable: StorageType
   *  Used storage type in Storages.
   *
   *  Default value: *''*
   */
  this.StorageType = '';

  /*  Variable: Storages
   *  Available storages.
   *
   *  Default value: *ngApp.SettingsStorages*
   */
  this.Storages = ((typeof ngApp === 'object')&&(ngApp)&&(typeof ngApp.SettingsStorages === 'object')&&(ngApp.SettingsStorages)) ? ngApp.SettingsStorages : {};

  /*  Variable: AllowStorageMigration
   *  Controls if data can be migrated between storages.
   *
   *  Default value: *true*
   */
  this.AllowStorageMigration = true;


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
   *  Request load of settings (can be async operation).
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
   *  Saves settings.    
   *   
   *  Syntax:
   *    void *Save* ()
   *     
   *  Returns:
   *    -  
   */               
  this.Save  = ngset_Save;

  this.DataLoaded  = ngset_DataLoaded;
  this.DataSaved  = ngset_DataSaved;
  this.GetStorage = ngset_GetStorage;
  this.AddEvent = ngObjAddEvent;
  this.RemoveEvent = ngObjRemoveEvent;

  /*
   *  Group: Events
   */
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
   *  Event: OnSettingsLoading
   */
  this.OnSettingsLoading = null;
  /*
   *  Event: OnSettingsLoaded
   */     
  this.OnSettingsLoaded = null;
  /*
   *  Event: OnDataLoaded
   */
  this.OnDataLoaded = null;
  /*
   *  Event: OnDataSave
   */
  this.OnDataSave = null;
  /*
   *  Event: OnGetStorage
   */
  this.OnGetStorage = null;

  if((typeof options === 'object')&&(options))
    ng_MergeVarReplace(this,options);

  if(ngOnSettingsCreated) ngOnSettingsCreated(this);
}


if(typeof ngUserControls === 'undefined') ngUserControls = new Array();
ngUserControls['settings'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function() {
    if((typeof ngApp === 'object')&&(ngApp)&&(typeof ngApp.Settings === 'undefined'))
    {
      window.ngInit=ngAddEvent(function() {
        if(typeof ngApp.Settings === 'undefined') {
          var sp=ngVal(ngApp.StartParams,null);
          ngApp.Settings=new ngSettings('ngAppSettings',(sp ? sp.AppSettingsOptions : null));
          ngApp.Settings.Load();
        }
      },window.ngInit);
    }    
  }
};
