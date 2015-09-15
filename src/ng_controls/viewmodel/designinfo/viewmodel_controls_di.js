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

  var ViewModel_Controls_DesignInfo = {
    OnControlCreated: function(def, c) {
      if(!ngHASDESIGNINFO()) return;

      if (typeof def.DesignInfo==='undefined') def.DesignInfo = {};

      var di;
      switch(c.DefType)
      {

        case 'ngSysViewModel':
          di = {
            BasicComponent: c.DefType,
            Properties: {
              Namespace: { type: 'string' },
              ViewModel: { type: 'function', dVal: 'function(owner){}' },
              FieldDefs: { type: 'array', dVal: '[]' },
              DefaultValues: { type: 'object', dVal: '{}' },
              ServerURL: { type: 'string' },
              ActiveCommand: { type: 'string' },
              Events: {
                properties: {
                  OnSetValues: { type: 'function', dVal: 'function(c,values,deserialize) { return true; }' },
                  OnSetValue: { type: 'function', dVal: 'function(c,setval,instance,valpath) {}' },
                  OnGetValues: { type: 'function', dVal: 'function(c, ret, writableonly, valuenames, errors, convtimestamps, serialize) {}' },
                  OnGetValue: { type: 'function', dVal: 'function(c,val,instance, valpath, errors) { return val; }' },
                  OnCommand: { type: 'function', dVal: 'function(c,cmd,options) { return true; }' },
                  OnGetCommandValueNames: { type: 'function', dVal: 'function(c,cmd,options) {}', lvl: 2 },
                  OnDoCommand: { type: 'function', dVal: 'function(c,cmd,options,vals,err) { return true; }' },
                  OnCommandRequest: { type: 'function', dVal: 'function(c,rpc) { return true; }' },
                  OnCommandResults: { type: 'function', dVal: 'function(c,cmd,sresults) {}' },
                  OnCommandFinished: { type: 'function', dVal: 'function(vm,cmd,sresults) {}' },
                  OnCommandCancel: { type: 'function', dVal: 'function(c) {}', lvl: 2 },
                  OnCommandData: { type: 'function', dVal: 'function(vm,cmd,sresults) {}' },
                  OnSetViewModel: { type: 'function', dVal: 'function(c,vm) { return vm; }' },
                  OnViewModelChanged: { type: 'function', dVal: 'function(c) {}', lvl: 2 },
                  OnResults: { type: 'function', dVal: 'function(vm,results) { return results; }' },
                  OnErrors: { type: 'function', dVal: 'function(vm,errors) { return true; }' },
                  OnShowErrors: { type: 'function', dVal: 'function(c,errors_msg,errors) {}' },
                  OnAssign: { type: 'function', dVal: 'function(c,src) {}', lvl: 2 }
                }
              }
            }
          }
          break;

        case 'ngViewModelForm':
          di = {
            BasicComponent: c.DefType,
            ControlCategory: 'Containers',
            IsContainer: true,
            ChildControlsDesignInfo: {
              Properties: {
                DataBind: {
                  properties: {
                    Error: { type: 'string' },
                    ShowError: { type: 'string' }
                  }
                }
              }
            },
            ControlsGroupNames: function(selected_idx) {
              var ref = FormEditor.GetControlRefByIdx(selected_idx);
              if (!ref) return null;

              var groups = [];
              for (var i = 0; i < ref.Pages.length; i++) groups.push('Pages.'+i+'.Controls');

              return groups;
            },
            Properties: {
              ErrorHint: { type: 'object', lvl: 2 },
              Controls: { lvl: 1 },
              Events: {
                properties: {
                  OnSetViewModel: { type: 'function', dVal: 'function(c,vm,ovm) {}' },
                  OnResetErrors: { type: 'function', dVal: 'function(c) { return true; }' },
                  OnShowErrors: { type: 'function', dVal: 'function(form,errors_msg,errors) {}' },
                  OnFindFieldControls: { type: 'function', dVal: 'function(c,fid, visibleonly, bindings) { var ctrls = []; return ctrls; }', lvl: 3 },
                  OnSetControlError: { type: 'function', dVal: 'function(c,ctrl,err,setfocus) { return true; }', lvl: 2 },
                  OnSetControlVisible: { type: 'function', dVal: 'function(c,ctrl) { return true; }' },
                  OnSetControlFocus: { type: 'function', dVal: 'function(c,ctrl) {}' },
                  OnShowLoading: { type: 'function', dVal: 'function(c) {}', lvl: 2 },
                  OnHideLoading: { type: 'function', dVal: 'function(c) {}', lvl: 2 },
                  OnShowErrorMsg: { type: 'function', dVal: 'function(c,msg) {}' },
                  OnCommand: { type: 'function', dVal: 'function(form,cmd,options) { return true; }' },
                  OnCommandRequest: { type: 'function', dVal: 'function(form,rpc) { return true; }' },
                  OnCommandResults: { type: 'function', dVal: 'function(form,rpc) { return true; }' },
                  OnCommandFinished: { type: 'function', dVal: 'function(form,cmd,sresults) {}' },
                  OnCommandCancel: { type: 'function', dVal: 'function(form) {}', lvl: 2 }
                }
              }
            }
          };
          break;

        case 'ngEditField':
        case 'ngEditNumField':
        case 'ngEditDateField':
        case 'ngEditTimeField':
        case 'ngDropDownField':
        case 'ngDropDownListField':
        case 'ngMemoField':
          di = {
            ControlCategory: 'Edits',
            Properties: {
              ErrorHint: { type: 'object', lvl: 2 },
              Events: {
                properties: {
                  OnSetErrorState: { type: 'function', dVal: 'function(c,state) { return true; }' },
                  OnShowErrorHint: { type: 'function', dVal: 'function(c,msg) { return true; }' },
                  OnHideErrorHint: { type: 'function', dVal: 'function(c) { return true; }' }
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

  ngUserControls['viewmodel_controls_designinfo'] = ViewModel_Controls_DesignInfo;
}