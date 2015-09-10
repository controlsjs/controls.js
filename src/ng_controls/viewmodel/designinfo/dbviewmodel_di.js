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

  var DBViewModel_DesignInfo = {
    OnControlCreated: function(def, c) {
      if(!ngHASDESIGNINFO()) return;

      if (typeof def.DesignInfo==='undefined') def.DesignInfo = {};

      var di;
      switch(c.DefType)
      {

        case 'ngSysDBViewModel':
          di = {
            Properties: {
              ViewModel: { type: 'function' },
              DBViewModel: null,
              Events: {
                properties: {
                  OnNewRecord: { type: 'function', dVal: 'function(vm) {}' },
                  OnInsertRecord: { type: 'function', dVal: 'function(vm,options) {}' },
                  OnLoadRecord: { type: 'function', dVal: 'function(vm,options) {}' },
                  OnUpdateRecord: { type: 'function', dVal: 'function(vm,options) {}' },
                  OnDeleteRecord: { type: 'function', dVal: 'function(vm,options) {}' },
                  OnCancelEdits: { type: 'function', dVal: 'function(vm) {}' },
                  OnInsertFailed: { type: 'function', dVal: 'function(vm,sresults) {}' },
                  OnLoadFailed: { type: 'function', dVal: 'function(vm,sresults) {}' },
                  OnUpdateFailed: { type: 'function', dVal: 'function(vm,sresults) {}' },
                  OnDeleteFailed: { type: 'function', dVal: 'function(vm,sresults) {}' },
                  OnRecordInserted: { type: 'function', dVal: 'function(vm,sresults) {}' },
                  OnRecordLoaded: { type: 'function', dVal: 'function(vm,sresults) {}' },
                  OnRecordUpdated: { type: 'function', dVal: 'function(vm,sresults) {}' },
                  OnRecordDeleted: { type: 'function', dVal: 'function(vm,sresults) {}' },
                  OnDBSuccess: { type: 'function', dVal: 'function(vm,cmd,sresults) {}' },
                  OnDBError: { type: 'function', dVal: 'function(vm,cmd,sresults) {}' }
                }
              }
            }
          };
          break;

        case 'ngDBViewModelForm':
          di = {
            BasicComponent: c.DefType,
            Properties: {
              Events: {
                properties: {
                  OnChangedQuery: { type: 'function', dVal: 'function(c,querytxt,successfnc,failfnc) {}' },
                  OnDeleteQuery: { type: 'function', dVal: 'function(c,querytxt,successfnc,failfnc) {}' },
                  OnGetChangeQueryText: { type: 'function', dVal: 'function(c) { var querytxt = \'\'; return querytxt; }' },
                  OnGetDeleteQueryText: { type: 'function', dVal: 'function(c) { var querytxt = \'\'; return querytxt; }' },
                  OnDBError: { type: 'function', dVal: 'function(form,cmd,sresults) {}' }
                }
              }
            }
          };
          break;

        case 'ngDBDataSet':
          di = {
            Properties: {
              DBViewModel: { type: 'string' },
              EditButtons: { type: 'boolean' },
              Data: {
                properties: {
                  LoadOnSelect: { type: 'boolean', dVal: 'false' },
                  LoadOnClick: { type: 'boolean', dVal: 'false' },
                  LoadOnDblClick: { type: 'boolean' },
                  AutoSelectDBVMRecord: { type: 'boolean' }
                }
              },
              Events: {
                properties: {
                  OnNewRecord: { type: 'function', dVal: 'function(c,evm) { return true; }' },
                  OnLoadRecord: { type: 'function', dVal: 'function(c,evm,it) { return true; }' },
                  OnDeleteRecord: { type: 'function', dVal: 'function(c,evm,it) { return true; }' },
                  OnDBViewModelChanged: { type: 'function', dVal: 'function(form,changetype,primarykey) {}' }
                }
              }
            }
          };
          break;

        case 'ngDBToolBar':
          di = {
            ControlCategory: 'Containers'
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

  ngUserControls['dbviewmodel_designinfo'] = DBViewModel_DesignInfo;
}