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

  var ViewModel_Dataset_DesignInfo = {
    OnControlCreated: function(def, c) {
      if(!ngHASDESIGNINFO()) return;

      if (typeof def.DesignInfo==='undefined') def.DesignInfo = {};

      var di;
      switch(c.DefType)
      {

        case 'ngDataSet':
          di = {
            ControlCategory: 'Lists',
            AddData: {
              InitProperties: {
                'W': { value: 120 },
                'H': { value: 90 },
                'Data': null,
                'Data.PagingType': null,
                'Controls': {},
                'Controls.List': { value: "{Data:{SelectType: nglSelectSingle,Columns:[]}}" }
              }
            },
            Properties: {
              Data: {
                properties: {
                  AutoDataSetColumns: { type: 'boolean', dVal: 'false' },
                  GetRecordsCommand: { type: 'string', dVal: 'resetfilters' }
                }
              },
              Events: {
                properties: {
                  OnGetFieldDefValue: { type: 'function', dVal: 'function(c,fd,it,col) { return fd.Value(); }' },
                  OnSetViewModel: { type: 'function', dVal: 'function(c,vm,ovm) {}' }
                }
              },
              Controls: { lvl: 1 }
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

  ngUserControls['viewmodel_dataset_designinfo'] = ViewModel_Dataset_DesignInfo;
}