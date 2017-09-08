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

if (typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['dbviewmodel_ui_designinfo'] = {
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('ngDBViewModelForm',function(d,c,ref) {
      return {
        ControlCategory: 'System',
        BaseControl: 'ngDBViewModelForm',
        IsViewModel: true,
        Properties: ng_diProperties({
          "Data": {
            "DeleteCommands": ng_diTypeVal('array_strings', ["'delete'"], { Level: 'basic' }),
            "ChangeCommands": ng_diTypeVal('array_strings', ["'load'", "'new'"], { Level: 'basic' }),
            "ChangeQueryText": ng_diString('dbviewmodel_form_changed', { Level: 'basic' }),
            "DeleteQueryText": ng_diString('dbviewmodel_form_deletequery', { Level: 'basic' })
          },
          "Events": {
            "OnChangedQuery": ng_diEvent('function(c, querytxt, successfnc, failfnc) {}',{ Level: 'basic' }),
            "OnDeleteQuery": ng_diEvent('function(c, querytxt, successfnc, failfnc) {}',{ Level: 'basic' }),

            "OnDBError": ng_diEvent('function(c, cmd, sresults) {}',{ Level: 'basic' })
          },
          "OverrideEvents": {
            "OnGetChangeQueryText": ng_diEvent('function(c) { return ""; }',{ Level: 'basic' }),
            "OnGetDeleteQueryText": ng_diEvent('function(c) { return ""; }',{ Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngDBDataSet',function(d,c,ref) {
      return {
        IsViewModel: true,
        Properties: ng_diProperties({
          "DBViewModel": ng_diMixed(['string', 'identifier'], { Level: 'basic' }),
          "EditButtons": ng_diBoolean(true, { Level: 'basic' }),
          "RefreshButton": ng_diBoolean(true, { Level: 'basic' }),
          "Data": {
            "LoadOnSelect": ng_diBoolean(false, { Level: 'basic' }),
            "LoadOnClick": ng_diBoolean(false, { Level: 'basic' }),
            "LoadOnDblClick": ng_diBoolean(true, { Level: 'basic' }),
            "AutoSelectDBVMRecord": ng_diBoolean(true, { Level: 'basic' }),
            // change default
            "PagingType": ng_diTypeVal('bitmask', { value: plPagingDataSetEx }), // TODO: Check bitmask value definition
            "PagingInside": ng_diBoolean(false)
          },
          "Events": {
            "OnNewRecord": ng_diEvent('function(c, dbvm) { return true; }',{ Level: 'basic' }),
            "OnLoadRecord": ng_diEvent('function(c, dbvm, it) { return true; }',{ Level: 'basic' }),
            "OnDeleteRecord": ng_diEvent('function(c, dbvm, it) { return true; }',{ Level: 'basic' }),

            "OnDBViewModelChanged": ng_diEvent('function(c, changetype, primarykey) {}',{ Level: 'basic' })
          },
          "ModifyControls": {
            "NewRecord": ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
            "LoadRecord": ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
            "DeleteRecord": ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
            "Refresh": ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngDBToolBar',function(d,c,ref) {
      return {
        BaseControl: 'ngDBToolBar',
        IsViewModel: true,
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 250 },
              "H": { Value: 30 }
            }
          }
        },
        Properties: ng_diProperties({
          "ModifyControls": {
            "New": ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
            "Delete": ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
            "Insert": ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
            "Update": ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
            "Cancel": ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' })
          }
        })
      };
    });
  }
};