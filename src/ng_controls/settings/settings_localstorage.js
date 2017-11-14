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
 *  Group: Settings Local Storage
 */

// --- ngSettingsLocalStorage --------------------------------------------------

if(typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['settings_localstorage'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function() {

    function ngsetls_Clear(settings)
    {
      var sid=ngVal(this.StorageId,'');
      if(sid!='') {
        var undefined,cinfo = {
          Owner: settings,
          StorageID: sid
        };
        if((this.OnClearData)&&(!ngVal(this.OnClearData(this,cinfo),false))) return false;
        try {
          if(cinfo.StorageID!='') window.localStorage.removeItem(cinfo.StorageID);
        }
        catch(e) {
        }
      }
      return true;
    }

    function ngsetls_IsActive() {
      try {
        return (ngVal(this.StorageId,'')!='') && ('localStorage' in window && window['localStorage'] !== null);
      } catch(e) {
        return false;
      }
    }

    function ngsetls_Load(settings)
    {
      var sid=ngVal(this.StorageId,'');
      if(sid=='') return;

      var undefined,linfo = {
        Owner: settings,
        StorageID: sid,
        Settings: undefined,
        LoadData: undefined
      };

      if((this.OnLoadingData)&&(!ngVal(this.OnLoadingData(this,linfo),false))) return;
      if(linfo.StorageID!='') {
        try {
          linfo.LoadData = window.localStorage.getItem(linfo.StorageID);
        }
        catch(e) {
        }
      }

      if((this.OnLoadData)&&(!ngVal(this.OnLoadData(this,linfo),false))) return;
      if(typeof linfo.Settings === 'undefined') {
        try {
          if(linfo.LoadData!='') linfo.Settings = JSON.parse(linfo.LoadData);
        }
        catch(e) {
        }
      }
      if((typeof linfo.Settings!=='object')||(!linfo.Settings)) linfo.Settings=null;

      settings.DataLoaded(this,linfo.Settings);
    }

    function ngsetls_Save(settings,data)
    {
      var sid=ngVal(this.StorageId,'');
      if(sid=='') return;

      var undefined,sinfo = {
        Owner: settings,
        StorageID: sid,
        Settings: data,
        SaveData: undefined
      };

      if((this.OnSaveData)&&(!ngVal(this.OnSaveData(this,sinfo),false))) return;
      if(typeof sinfo.SaveData === 'undefined') sinfo.SaveData=JSON.stringify(sinfo.Settings);

      if(sinfo.StorageID!='') {
        try {
          window.localStorage.setItem(sinfo.StorageID,sinfo.SaveData);
        } catch(e) {
          return;
        }
      }
      settings.DataSaved(this);
    }

    /**
     *  Class: ngSettingsLocalStorage
     *  Application local webstorage for settings.
     *
     *  This class is used for storing applications settings into local browser storage.
     *
     *  Syntax:
     *    new *ngSettingsLocalStorage* ([string storageid])
     *
     *  Parameters:
     *    storageid - name of key to which settings are stored to
     */
    window.ngSettingsLocalStorage = function(storageid)
    {
      this.StorageId = ngVal(storageid,'');

      this.IsActive=ngsetls_IsActive;

      this.Load=ngsetls_Load;
      this.Save=ngsetls_Save;
      this.Clear=ngsetls_Clear;

      this.AddEvent = ngObjAddEvent;
      this.RemoveEvent = ngObjRemoveEvent;
      /*
       *  Group: Events
       */
      /*
       *  Event: OnLoadingData
       */
      this.OnLoadingData = null;
      /*
       *  Event: OnLoadData
       */
      this.OnLoadData = null;
      /*
       *  Event: OnSaveData
       */
      this.OnSaveData = null;
      /*
       *  Event: OnClearData
       */
      this.OnClearData = null;
    };


    if((typeof ngApp === 'object')&&(ngApp))
    {
      var storageurl='settings/';

      var sp=ngVal(ngApp.StartParams,null);
      if((sp)&&(typeof sp.AppSettingsStorageURL !== 'undefined')) storageurl=sp.AppSettingsStorageURL;
        
      if((storageurl.indexOf('//')<0)&&(storageurl.substr(0,1)!=='/'))
      {
        var idx = ngApp.AppPath.indexOf('//')
        if(idx>=0)
        {
          idx=ngApp.AppPath.indexOf('/',idx+2);
          if(idx>=0) storageurl=ngApp.AppPath.substr(idx,ngApp.AppPath.length)+storageurl;
        }
      }

      if(typeof ngApp.SettingsStorages === 'undefined') ngApp.SettingsStorages={};
      ngApp.SettingsStorages.LocalStorage = new ngSettingsLocalStorage('ngSettings'+storageurl);
    }
  }
}
