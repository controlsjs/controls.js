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
var DBViewModel_DesignInfo = {
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('ngSysDBViewModel',function(d,c,ref) {
      return {
        ControlCategory: 'System',
        BaseControl: 'ngSysDBViewModel',
        IsViewModel: true,
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
  }
};
ngUserControls['dbviewmodel_designinfo'] = DBViewModel_DesignInfo;