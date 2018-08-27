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

if(typeof ngUserControls === 'undefined') ngUserControls = {};
var ViewModel_Dataset_DesignInfo = {
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('ngDataSet',function(d,c,ref) {
      return {
        ControlCategory: 'Dataset',
        IsViewModel: true,
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 400 },
              "H": { Value: 200 }
            }
          }
        },
        Properties: ng_diProperties({
          "Data": {
            "AutoDataSetColumns": ng_diBoolean(false, { Level: 'basic',
              Exclude: ['ModifyControls.List.Data.Columns', 'Controls.List.Data.Columns']
            }),
            "GetRecordsCommand": ng_diString('resetfilters', { Level: 'advanced' }),
            "SortByVMField": ng_diString('SortBy', { Level: 'basic' }),
            "AllowedSortByVMField": ng_diString('AllowedSortBy', { Level: 'basic' })
          },
          "Events": {
            "OnSetViewModel": ng_diEvent('function(c, vm, ovm) {}',{ Level: 'basic' }),
            "OnReloadDataSet": ng_diEvent('function(c) { return true; }',{ Level: 'basic' }),
            "OnApplyFilters": ng_diEvent('function(c) { return true; }',{ Level: 'basic' }),
            "OnResetFilters": ng_diEvent('function(c) { return true; }',{ Level: 'basic' }),
            "OnSetSortBy": ng_diEvent('function(c, sortby) { return true; }',{ Level: 'basic' })
          },
          "OverrideEvents": {
            "OnGetFieldDefValue": ng_diEvent('function(c, fd, it, col) { return ""; }',{ Level: 'basic' }),
            "OnGetRecord": ng_diEvent('function(c, it) { return it.Record; }',{ Level: 'basic' }),
            "OnGetSortBy": ng_diEvent('function(c, sortby) { return sortby; }',{ Level: 'basic' }),
            "OnGetAllowedSortBy": ng_diEvent('function(c, allowed) { return allowed; }',{ Level: 'basic' })
          }
        })
      };
    });
  }
};
ngUserControls['viewmodel_dataset_designinfo'] = ViewModel_Dataset_DesignInfo;