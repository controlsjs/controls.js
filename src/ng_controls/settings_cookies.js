/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2015 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */

/**
 *  Group: Settings Cookies Storage
 */

// --- ngSettingsCookiesStorage ------------------------------------------------

/**
 *  Group: Variables
 */
/**
 *  Variable: ngsCookieMaxLen
 *  Maximal data length in one cookie.
 *  Default: 4050
 */
var ngsCookieMaxLen = (typeof ngsCookieMaxLen === 'undefined' ? 4050 : ngsCookieMaxLen);

if(typeof ngUserControls === 'undefined') ngUserControls = new Array();
ngUserControls['settings_cookies'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function() {

    function ngsetcoo_EncodeSetting(settings,n,v)
    {
      if(!settings.IsValidName(n)) return undefined;
      if(typeof v === 'undefined') return v;
      if(this.OnEncodeSetting) v=this.OnEncodeSetting(this,n,v,settings);
      else v=ng_URLEncode(v);

      v=v.replace("%40","%u0040"); // prevent @ auto-unescape
      return v;
    }

    function ngsetcoo_BuildSettingsStr(settings,p)
    {
      if((typeof p !== 'object')||(!p)) return '';
      var v,params='';
      for(var i in p)
      {
        v=p[i];
        if((typeof v === 'object')&&(v))
        {
          if(params!='') params+='@';
          params+=i+'@{@'+this.BuildSettingsStr(settings,v)+'@}';
          continue;
        }
        v=this.EncodeSetting(settings,i,v);
        if(typeof v === 'undefined') continue;
        if(params!='') params+='@';
        params+=i+'-'+v;
      }
      return params;
    }

    function ngsetcoo_GetRPC() {
      if(!this.rpc) {
        this.rpc=new ngRPC();
        this.rpc.nocache=true;
      }
      return this.rpc;
    }

    function ngsetcoo_IsActive() {
      return((this.StorageURL!='')&&(!ngCordova));
    }

    function ngsetcoo_Load(settings)
    {
      if(this.StorageURL!='')
      {
        if(typeof window.ngLoadedSettings !== 'undefined')
        {
          var data=window.ngLoadedSettings;
          delete ngLoadedSettings;
          settings.DataLoaded(this,data);
          return;
        }
        var rpc=this.GetRPC();
        if(rpc) rpc.sendRequest(ng_AddURLParam(this.StorageURL,'load=1&id='+settings.SettingsID));
      }
    }

    function ngsetcoo_Save(settings,data)
    {
    console.log('CookiesSave',data);
      // save to cookies
      var url=this.StorageURL;
      if(url!='')
      {
        // build params
        var i,params=this.BuildSettingsStr(settings,data);
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

        settings.DataSaved(this);
      }
    }

    window.ngset_do_load = function(id,data)
    {
      if(typeof data === 'undefined') return;
      var s=getSettingsByID(id);
      if(s) s.DataLoaded(this,data);
    };

    /**
     *  Class: ngSettingsCookiesStorage
     *  Application cookies settings storage.
     *
     *  This class is used for storing applications settings into cookies.
     *
     *  Syntax:
     *    new *ngSettingsCookiesStorage* ([string storageurl])
     *
     *  Parameters:
     *    storageurl - URL to which cookies are attached to
     */
    window.ngSettingsCookiesStorage = function(storageurl)
    {
      this.rpc      = null;
      /*
       *  Group: Properties
       */
      /*  Variable: Priority
       *  Storage priority.
       *
       *  Default value: *0.2*
       */
      this.Priority = 0.2;
      /*  Variable: StorageURL
       *  URL where settings are saved.
       *
       *  Default value: *''*
       */
      this.StorageURL = ngVal(storageurl,'');
      /*  Variable: StorageExpires
       *  Storage cookies expiration time (in seconds).
       *
       *  Default value: *10 years*
       */
      this.StorageExpires = ngCookieExpires(3600 * 24 * 365 * 10); // 10 years

      this.EncodeSetting = ngsetcoo_EncodeSetting;
      this.BuildSettingsStr = ngsetcoo_BuildSettingsStr;
      this.GetRPC=ngsetcoo_GetRPC;

      this.IsActive=ngsetcoo_IsActive;
      this.Load=ngsetcoo_Load;
      this.Save=ngsetcoo_Save;

      this.AddEvent = ngObjAddEvent;
      this.RemoveEvent = ngObjRemoveEvent;
      /*
       *  Group: Events
       */
      /*
       *  Event: OnEncodeSetting
       */
      this.OnEncodeSetting = null;
    };

    if((typeof ngApp === 'object')&&(ngApp))
    {
      var storageurl;
      var sp=ngVal(ngApp.StartParams,null);
      if((sp)&&(typeof sp.AppSettingsStorageURL !== 'undefined'))
      {
        storageurl=sp.AppSettingsStorageURL;
        if(storageurl.substr(0,4)!='http')
        {
          if(storageurl.substr(0,1)=='/')
          {
            var idx = ngApp.AppPath.indexOf('//')
            if(idx>=0)
            {
              idx=ngApp.AppPath.indexOf('/',idx+2);
              if(idx>=0) storageurl=ngApp.AppPath.substr(0,idx)+storageurl;
              else storageurl=ngApp.AppPath+storageurl;
            }
          }
          else storageurl=ngApp.AppPath+storageurl;
        }
      }

      if(typeof ngApp.SettingsStorages === 'undefined') ngApp.SettingsStorages={};
      ngApp.SettingsStorages.Cookies = new ngSettingsCookiesStorage(storageurl);
    }
  }
};
