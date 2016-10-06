/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2014-2016 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */

if (typeof ngUserControls === 'undefined') ngUserControls = [];
var DBViewModel_DesignInfo = {
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('ngSysDBViewModel',function(d,c,ref) {
      return {
        ControlCategory: 'System',
        BaseControl: 'ngSysDBViewModel',
        Properties: ng_DIProperties({
          "Data": {
            "ResetRecordOnLoad": ng_DIPropertyBool(false, { Level: 'basic' }),
            "RecordStateEditMode": { DefaultType: 'object', Level: 'basic',
              Collapsed: false,
              Types: {
                'object': {
                  ChildDesignInfo: { DefaultType: 'boolean' },
                  ObjectProperties: {
                    "recStateNewRecord": ng_DIPropertyBool(true, { Level: 'basic' }),
                    "recStateLoaded": ng_DIPropertyBool(true, { Level: 'basic' }),
                    "recStateNone": ng_DIPropertyBool(false, { Level: 'basic' }),
                    "recStateDeleted": ng_DIPropertyBool(false, { Level: 'basic' })
                  }
                }
              }
            }
          },
          "Events": {
            "OnNewRecord": ng_DIPropertyEvent('function(c, options) {}',{ Level: 'basic' }),
            "OnInsertRecord": ng_DIPropertyEvent('function(c, options) {}',{ Level: 'basic' }),
            "OnLoadRecord": ng_DIPropertyEvent('function(c, options) {}',{ Level: 'basic' }),
            "OnUpdateRecord": ng_DIPropertyEvent('function(c, options) {}',{ Level: 'basic' }),
            "OnDeleteRecord": ng_DIPropertyEvent('function(c, options) {}',{ Level: 'basic' }),
            "OnCancelEdits": ng_DIPropertyEvent('function(c, options) {}',{ Level: 'basic' }),

            "OnInsertFailed": ng_DIPropertyEvent('function(c, sresults) {}',{ Level: 'basic' }),
            "OnLoadFailed": ng_DIPropertyEvent('function(c, sresults) {}',{ Level: 'basic' }),
            "OnUpdateFailed": ng_DIPropertyEvent('function(c, sresults) {}',{ Level: 'basic' }),
            "OnDeleteFailed": ng_DIPropertyEvent('function(c, sresults) {}',{ Level: 'basic' }),

            "OnRecordInserted": ng_DIPropertyEvent('function(c, sresults) {}',{ Level: 'basic' }),
            "OnRecordLoaded": ng_DIPropertyEvent('function(c, sresults) {}',{ Level: 'basic' }),
            "OnRecordUpdated": ng_DIPropertyEvent('function(c, sresults) {}',{ Level: 'basic' }),
            "OnRecordDeleted": ng_DIPropertyEvent('function(c, sresults) {}',{ Level: 'basic' }),

            "OnDBSuccess": ng_DIPropertyEvent('function(c, cmd, sresults) {}',{ Level: 'basic' }),
            "OnDBError": ng_DIPropertyEvent('function(c, cmd,sresults) {}',{ Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngDBViewModelForm',function(d,c,ref) {
      return {
        ControlCategory: 'System',
        BaseControl: 'ngDBViewModelForm',
        Properties: ng_DIProperties({
          "Data": {
            "DeleteCommands": ng_DIProperty('array_strings', ["'delete'"], { Level: 'basic' }),
            "ChangeCommands": ng_DIProperty('array_strings', ["'load'", "'new'"], { Level: 'basic' }),
            "ChangeQueryText": ng_DIProperty('string', 'dbviewmodel_form_changed', { Level: 'basic' }),
            "DeleteQueryText": ng_DIProperty('string', 'dbviewmodel_form_deletequery', { Level: 'basic' })
          },
          "Events": {
            "OnChangedQuery": ng_DIPropertyEvent('function(c, querytxt, successfnc, failfnc) {}',{ Level: 'basic' }),
            "OnDeleteQuery": ng_DIPropertyEvent('function(c, querytxt, successfnc, failfnc) {}',{ Level: 'basic' }),

            "OnDBError": ng_DIPropertyEvent('function(c, cmd, sresults) {}',{ Level: 'basic' })
          },
          "OverrideEvents": {
            "OnGetChangeQueryText": ng_DIPropertyEvent('function(c) { return ""; }',{ Level: 'basic' }),
            "OnGetDeleteQueryText": ng_DIPropertyEvent('function(c) { return ""; }',{ Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngDBDataSet',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "DBViewModel": { DefaultType: 'string', Level: 'basic',
            Types: {
              'string': {},
              'identifier': {}
            }
          },
          "EditButtons": ng_DIPropertyBool(true, { Level: 'basic' }),
          "RefreshButton": ng_DIPropertyBool(true, { Level: 'basic' }),
          "Data": {
            "LoadOnSelect": ng_DIPropertyBool(false, { Level: 'basic' }),
            "LoadOnClick": ng_DIPropertyBool(false, { Level: 'basic' }),
            "LoadOnDblClick": ng_DIPropertyBool(true, { Level: 'basic' }),
            "AutoSelectDBVMRecord": ng_DIPropertyBool(true, { Level: 'basic' }),

            // change default
            "PagingType": {
              Types: {
                'bitmask': {
                  DefaultValue: {
                    // TODO: Check bitmask value definition
                    value: plPagingDataSetEx
                  }
                }
              }
            },
            "PagingInside": ng_DIPropertyBool(false)
          },
          "Events": {
            "OnNewRecord": ng_DIPropertyEvent('function(c, dbvm) { return true; }',{ Level: 'basic' }),
            "OnLoadRecord": ng_DIPropertyEvent('function(c, dbvm, it) { return true; }',{ Level: 'basic' }),
            "OnDeleteRecord": ng_DIPropertyEvent('function(c, dbvm, it) { return true; }',{ Level: 'basic' }),

            "OnDBViewModelChanged": ng_DIPropertyEvent('function(c, changetype, primarykey) {}',{ Level: 'basic' })
          },
          "ModifyControls": {
            "NewRecord": ng_DIPropertyControl('ngButton', { Level: 'basic' }, 'ngButton'),
            "LoadRecord": ng_DIPropertyControl('ngButton', { Level: 'basic' }, 'ngButton'),
            "DeleteRecord": ng_DIPropertyControl('ngButton', { Level: 'basic' }, 'ngButton'),
            "Refresh": ng_DIPropertyControl('ngButton', { Level: 'basic' }, 'ngButton')
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngDBToolBar',function(d,c,ref) {
      return {
        BaseControl: 'ngDBToolBar',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 250 },
              "H": { Value: 30 }
            }
          }
        },
        Properties: ng_DIProperties({
          "ModifyControls": {
            "New": ng_DIPropertyControl('ngButton', { Level: 'basic' }, 'ngButton'),
            "Delete": ng_DIPropertyControl('ngButton', { Level: 'basic' }, 'ngButton'),
            "Insert": ng_DIPropertyControl('ngButton', { Level: 'basic' }, 'ngButton'),
            "Update": ng_DIPropertyControl('ngButton', { Level: 'basic' }, 'ngButton'),
            "Cancel": ng_DIPropertyControl('ngButton', { Level: 'basic' }, 'ngButton')
          }
        })
      };
    });
  }
};
ngUserControls['dbviewmodel_designinfo'] = DBViewModel_DesignInfo;