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
ngUserControls['list_designinfo'] = {
  //OnFormEditorInit: function(FE) {},
  //OnControlDesignInfo: function(def, c, ref) {},

  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    function ngListItemsDI()
    {
      var di = {
        DefaultType: 'object',
        Types: {
          'object': {
            DefaultValue: "{}",
            ObjectProperties: {
              Text:           { DefaultType: 'string',
                                Types: {
                                  'string': {
                                    InitValue: 'Item'
                                  }
                                },
                                Level: 'basic',
                                Order: 0.5
                              },
              Alt:            { DefaultType: 'string', Order: 0.51 },
              ID:             { DefaultType: 'undefined',
                                InitType: 'string',
                                Order: 0.55
                              },
              Checked:        { DefaultType: 'integer',
                                Level: 'basic',
                                Order: 0.6,
                                Types: {
                                  'integer': {
                                     DefaultValue: 0,
                                     InitValue: 1,
                                     Editor: 'ngfeEditor_DropDownList',
                                     EditorOptions: {
                                       Items: [{Value:0,Text:'cbUnchecked'},{Value:1,Text:'chChecked'},{Value:2,Text:'cbGrayed'}]
                                     }
                                   }
                                }
                              },
              AllowGrayed:    { DefaultType: 'boolean',
                                Order: 0.61,
                                Types: {
                                  'boolean': {
                                    DefaultValue: false,
                                    InitValue: true
                                  }
                                }
                              },
              Collapsed:      { DefaultType: 'boolean',
                                Order: 0.62,
                                Types: {
                                  'boolean': {
                                    DefaultValue: false,
                                    InitValue: true
                                  }
                                }
                              },
              Visible:        { DefaultType: 'boolean',
                                Order: 0.65,
                                Types: {
                                  'boolean': {
                                    DefaultValue: true
                                  }
                                },
                                Level: 'basic'
                              },
              Enabled:        { DefaultType: 'boolean',
                                Order: 0.66,
                                Types: {
                                  'boolean': {
                                    DefaultValue: true
                                  }
                                },
                                Level: 'basic'
                              },
              RadioGroup:     { DefaultType: 'undefined',
                                InitType: 'undefined',
                                Order: 0.67
                              },
              H:              { DefaultType: 'undefined',
                                InitType: 'integer',
                                Order: 0.7
                              },
              MinHeight:      { DefaultType: 'undefined',
                                InitType: 'integer',
                                Order: 0.71
                              },
              Image:          { DefaultType: 'image', Order: 0.73 },
              Parent:         { DefaultType: 'undefined',
                                Order: 0.8,
                                Types: {
                                  'object': {},
                                  'null': {}
                                },
                                Level: 'hidden'
                              },
              Controls:       { DefaultType: 'undefined',
                                InitType: 'object',
                                Order: 0.9
                              },
              ControlsHolder: { DefaultType: 'undefined',
                                Types: {
                                  'object': {}
                                },
                                Level: 'hidden',
                                Order: 0.91
                              }
              // TODO - check API for all properties

              //OnCollapsing
              //OnCollapsed
              //OnExpanding
              //OnExpanded
            }
          }
        }
      };

      di.Types['object'].ObjectProperties.Items = {
         DefaultType: 'undefined',
         InitType: 'array',
         Level: 'basic',
         Order: 0.85,
         Collapsed: true,
         Types: {
           'array': {
             DefaultValue: '[]'
           }
         }
      };
      ng_SetByRef(di.Types['object'].ObjectProperties.Items, 'ChildDesignInfo', di);

      return di;
    }

    ngRegisterControlDesignInfo('ngList',function(d,c,ref) {
      return {
        ControlCategory: 'Lists',
        BaseControl: 'ngList',
        NewControl: {
          Default: {
            Properties: {
              W: { Value: 120 },
              H: { Value: 180 },
              Data: {
                ObjectProperties: {
                  Items: { Type: 'array',
                           //Value: [], // TODO - merge arrays
                           ObjectProperties: {
                             0: {
                               Type: 'object',
                               Value: {
                                 Text: 'Item 1'
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
          Data: {
            Items: { DefaultType: 'array',
                     Level: 'basic',
                     Collapsed: false,
                     ChildDesignInfo: ngListItemsDI(),
                     Types: {
                       'array': {
                         DefaultValue: '[]'
                       }
                     }
                   }
          }
        })
      };
    });

  }
};