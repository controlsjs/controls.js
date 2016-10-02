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

if(typeof ngUserControls === 'undefined') ngUserControls = [];
var ViewModel_Dataset_DesignInfo = {
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('ngDataSet',function(d,c,ref) {
      return {
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 400 },
              "H": { Value: 200 },
              "ModifyControls": {
                ObjectProperties: {
                  "List": {
                    ObjectProperties: {
                      "Data": {
                        Type: 'object',
                        ObjectProperties: {
                          "HTMLEncode": { Type: 'boolean', Value: true },
                          "Columns": { Type: 'ngListColumns',
                            ObjectProperties: {
                              0: {
                                Type: 'ngListCol',
                                Value: {
                                  Caption: "'Column1'",
                                  ID: "'Columns.c1'"
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "Data": {
            "AutoDataSetColumns": ng_DIPropertyBool(false, { Level: 'basic',
              // TODO: Check why not working
              Exclude: ['ModifyControls.List.Data.Columns', 'Controls.List.Data.Columns']
            }),
            "GetRecordsCommand": ng_DIProperty('string','resetfilters', { Level: 'advanced' }),
            "SortByVMField": ng_DIProperty('string','SortBy', { Level: 'basic' }),
            "AllowedSortByVMField": ng_DIProperty('string','AllowedSortBy', { Level: 'basic' }),
          },
          "Events": {
            "OnSetViewModel": ng_DIPropertyEvent('function(c, vm, ovm) {}',{ Level: 'basic' }),
            "OnReloadDataSet": ng_DIPropertyEvent('function(c) { return true; }',{ Level: 'basic' }),
            "OnApplyFilters": ng_DIPropertyEvent('function(c) { return true; }',{ Level: 'basic' }),
            "OnResetFilters": ng_DIPropertyEvent('function(c) { return true; }',{ Level: 'basic' }),
            "OnSetSortBy": ng_DIPropertyEvent('function(c, sortby) { return true; }',{ Level: 'basic' })
          },
          "OverrideEvents": {
            "OnGetFieldDefValue": ng_DIPropertyEvent('function(c, fd, it, col) { return ""; }',{ Level: 'basic' }),
            "OnGetRecord": ng_DIPropertyEvent('function(c, it) { return it.Record; }',{ Level: 'basic' }),
            "OnGetSortBy": ng_DIPropertyEvent('function(c, sortby) { return sortby; }',{ Level: 'basic' }),
            "OnGetAllowedSortBy": ng_DIPropertyEvent('function(c, allowed) { return allowed; }',{ Level: 'basic' })
          }
        })
      };
    });
  }
};
ngUserControls['viewmodel_dataset_designinfo'] = ViewModel_Dataset_DesignInfo;