/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2014-2015 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */

if(ngHASDESIGNINFO()) {

  if(typeof ngUserControls === 'undefined') ngUserControls = new Array();

  var FileUploaderControl_DesignInfo = {
    OnControlCreated: function(def, c) {
      if(!ngHASDESIGNINFO()) return;

      if (typeof def.DesignInfo==='undefined') def.DesignInfo = {};

      var di;
      switch(c.DefType)
      {
        case 'ngFileUploader':
          di = {
            ControlCategory: 'Misc',
            AddData: {
              InitProperties: {
                'W': { value: 360 },
                'H': { value: 250 },
                'Data': {},
                'Data.FileUploaderID': {}
              }
            },
            Properties: {
              Base: { type: 'string', dVal: 'ngPanel' },
              Data: {
                properties: {
                  FileUploaderID: { type: 'string', dVal: 'Main' }
                }
              },
              Controls: { lvl: 3 },
              Events: {
                properties: {
                  OnServerError: { type: 'function', dVal: 'function(c, errmsg, data) {}' },
                  OnFileAdding: { type: 'function', dVal: 'function(c,File) { return true; }' },
                  OnFileAdded: { type: 'function', dVal: 'function(c, name, data) {}' },
                  OnFileChanging: { type: 'function', dVal: 'function(c, Value) { return true; }' },
                  OnFileChanged: { type: 'function', dVal: 'function(c, Value) {}' },
                  OnFileDeleting: { type: 'function', dVal: 'function(c, checked, idx) { return true; }' },
                  OnFileDeleted: { type: 'function', dVal: 'function(c, checked, idx) {}' }
                }
              }
            }
          };
          break;
      }

      if(typeof di!=='undefined') {
        ng_MergeVar(di, {
          Properties: {
            Type: { dVal: c.DefType }
          }
        });
        ng_MergeVar(di, def.DesignInfo);
        def.DesignInfo = di;
      }

    }
  }

  ngUserControls['fileuploader_designinfo'] = FileUploaderControl_DesignInfo;
}