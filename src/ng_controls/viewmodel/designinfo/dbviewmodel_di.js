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
ngUserControls['dbviewmodel_designinfo'] = {
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('ngSysDBViewModel',function(d,c,ref) {
      return {
        ControlCategory: 'System',
        IsBasic: true,
        IsViewModel: true,
        Properties: ng_diProperties({
          "Data": {
            "ResetRecordOnLoad": ng_diBoolean(false, { Level: 'basic' }),
            "RecordStateEditMode": ng_diObject({
              "recStateNewRecord": ng_diBoolean(true, { Level: 'basic' }),
              "recStateLoaded": ng_diBoolean(true, { Level: 'basic' }),
              "recStateNone": ng_diBoolean(false, { Level: 'basic' }),
              "recStateDeleted": ng_diBoolean(false, { Level: 'basic' })
            }, { Level: 'basic', Collapsed: false }, { ChildDesignInfo: ng_diBoolean(false, { Level:'basic' }) })
          },
          "Methods": {
            "GetChangedFields": ng_diFunction('function() { return ng_CallParent(this, "GetChangedFields", arguments, []); }', { Level: 'advanced' }),
            "IsChanged": ng_diFunction('function() { return ng_CallParent(this, "IsChanged", arguments, false); }', { Level: 'advanced' })
          },
          "Events": {
            "OnNewRecord": ng_diEvent('function(c, options) {}',{ Level: 'basic' }),
            "OnInsertRecord": ng_diEvent('function(c, options) {}',{ Level: 'basic' }),
            "OnLoadRecord": ng_diEvent('function(c, options) {}',{ Level: 'basic' }),
            "OnUpdateRecord": ng_diEvent('function(c, options) {}',{ Level: 'basic' }),
            "OnDeleteRecord": ng_diEvent('function(c, options) {}',{ Level: 'basic' }),
            "OnCancelEdits": ng_diEvent('function(c, options) {}',{ Level: 'basic' }),

            "OnInsertFailed": ng_diEvent('function(c, sresults) {}',{ Level: 'basic' }),
            "OnLoadFailed": ng_diEvent('function(c, sresults) {}',{ Level: 'basic' }),
            "OnUpdateFailed": ng_diEvent('function(c, sresults) {}',{ Level: 'basic' }),
            "OnDeleteFailed": ng_diEvent('function(c, sresults) {}',{ Level: 'basic' }),

            "OnRecordInserted": ng_diEvent('function(c, sresults) {}',{ Level: 'basic' }),
            "OnRecordLoaded": ng_diEvent('function(c, sresults) {}',{ Level: 'basic' }),
            "OnRecordUpdated": ng_diEvent('function(c, sresults) {}',{ Level: 'basic' }),
            "OnRecordDeleted": ng_diEvent('function(c, sresults) {}',{ Level: 'basic' }),

            "OnDBSuccess": ng_diEvent('function(c, cmd, sresults) {}',{ Level: 'basic' }),
            "OnDBError": ng_diEvent('function(c, cmd,sresults) {}',{ Level: 'basic' }),

            "OnCheckFieldChanged": ng_diEvent('function(c, chinfo) {}',{ Level: 'basic' })
          }
        })
      };
    });
    ngRegisterControlDesignInfo('ngSysDBDataSetViewModel',function(d,c,ref) {
      return {
        ControlCategory: 'System',
        IsBasic: true,
        IsViewModel: true,
        Properties: ng_diProperties({
          "Events": {
            "OnDBSuccess": ng_diEvent('function(c, cmd, sresults) {}',{ Level: 'basic' }),
            "OnDBError": ng_diEvent('function(c, cmd,sresults) {}',{ Level: 'basic' })
          }
        })
      };
    });
  }
};
