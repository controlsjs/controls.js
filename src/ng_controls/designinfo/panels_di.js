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
ngUserControls['panels_designinfo'] = {
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    var alignpanel_DI={
      NewControl: {
        Default: {
          Properties: {
            "W": { Value: 100 },
            "H": { Value: 100 }
          }
        }
      },
      Properties: ng_DIProperties({
        "Data": {
          "AutoSize": { DefaultType: 'boolean', Level: 'basic',
            Types: {
              'boolean': {
                InitValue: true
              }
            }
          }
        }
      },
      {
        "Controls": {
          Types: {
            'controls': {
              ChildDesignInfo: {
                Types: {
                  'control': {
                    ObjectProperties: ng_DIProperties({
                      "Data": {
                        "ControlAlign": ng_DIPropertyIntConstants('alNone',['alNone','alClient', 'alLeft','alRight', 'alTop', 'alBottom'],{ Level: 'basic',  Order: 0.8 }),
                        "AlignAutoUpdate": { DefaultType: 'boolean', Level: 'basic',  Order: 0.8,
                          Types: {
                            'boolean': {
                              DefaultValue: true
                            }
                          }
                        }
                      }
                    })
                  }
                }
              }
            }
          }
        }
      })
    };
    ngRegisterControlDesignInfo('ngAlignPanel',function(d,c,ref) {
      alignpanel_DI.BaseControl='ngAlignPanel';
      return alignpanel_DI;
    });

    ngRegisterControlDesignInfo('ngAlignFrame',function(d,c,ref) {
      alignpanel_DI.BaseControl='ngAlignFrame';
      return alignpanel_DI;
    });

    ngRegisterControlDesignInfo('ngDropPanel',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        IsContainer: true,

        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 100 }
            }
          }
        },
        Properties: ng_DIProperties({
          "ParentReferences": { Level: 'advanced' },
          "W": {
            Exclude: ['CW']
          },
          "H": {
            Exclude: ['CH']
          },
          "CW": { DefaultType: 'integer', Order: 0.141,
            Exclude: ['W']
          },
          "CH": { DefaultType: 'integer', Order: 0.142,
            Exclude: ['H']
          },
          "DroppedDown": { DefaultType: 'boolean', Level: 'basic',
            Types: {
              'boolean': {
                InitValue: true
              }
            }
          },
          "ControlsPanel": { DefaultType: 'control', Level: 'basic',
            IsContainer: false,
            Types: {
              'control': {
                Type: 'ngPanel'
              }
            }
          },
          "Button": { DefaultType: 'control', Level: 'basic',
            Types: {
              'control': {
                Type: 'ngButton',
                InheritedFrom: 'ngButton'
              }
            }
          },
          "Events": {
            "OnDropDown": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c, state) { return true; }'
                }
              }
            }
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngSplitPanel',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',

        IsContainer: true,
        TargetContainer: function(control, target_control, control_elm, target_elm)
        {
          var id = ngVal(target_control.ID, '');
          var part = id.substring(id.lastIndexOf('_') + 1);
          switch (part) {
            case 'P1': return 'Controls1';
            case 'P2': return 'Controls2';
            default: return '';
          }
        },

        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 400 },
              "H": { Value: 100 }
            }
          }
        },
        Properties: ng_DIProperties({
          "ParentReferences": { Level: 'advanced' },
          "Controls1": { DefaultType: 'controls', Level: 'basic', Order: 0.65,
            ContainerProperty: true,
            Types: {
              'controls': {
                ChildDesignInfo: {
                  DisplayInControls: true
                }
              }
            }
          },
          "Controls2": { DefaultType: 'controls', Level: 'basic', Order: 0.65,
            ContainerProperty: true,
            Types: {
              'controls': {
                ChildDesignInfo: {
                  DisplayInControls: true
                }
              }
            }
          },
          "ControlsPanel1": { DefaultType: 'control', Level: 'basic',
            IsContainer: false,
            Types: {
              'control': {
                Type: 'ngPanel'
              }
            }
          },
          "ControlsPanel2": { DefaultType: 'control', Level: 'basic',
            IsContainer: false,
            Types: {
              'control': {
                Type: 'ngPanel'
              }
            }
          },
          "Data": {
            "PanelAlign": ng_DIPropertyStrings('left', ['left','right','top','bottom'], { Level: 'basic' }),
            "ResizeMode": { DefaultType: 'bitmask', Level: 'basic',
              Types: {
                'bitmask': {
                  DefaultValue: {
                    value: ngspResizeNone
                  },
                  EditorOptions: {
                    BitMaskIdentifiers: [
//                      {value: ngspResizeNone,        id: 'ngspResizeNone'},
                      {value: ngspResizeSize,        id: 'ngspResizeSize'},
                      {value: ngspResizeMinSize,     id: 'ngspResizeMinSize'},
                      {value: ngspResizeMaxSize,     id: 'ngspResizeMaxSize'},
                      {value: ngspResizeAutoMinimize,id: 'ngspResizeAutoMinimize'},
                      {value: ngspResizeAutoMaximize,id: 'ngspResizeAutoMaximize'}
                    ]
                  }
                }
              }
            },
            "Size": { DefaultType: 'integer', Level: 'basic',
              Types: {
                'integer': {
                  DefaultValue: 200
                }
              }
            },
            "MinSize": { DefaultType: 'integer', Level: 'basic',
              Types: {
                'integer': {
                  DefaultValue: 0
                }
              }
            },
            "MaxSize": { DefaultType: 'integer', Level: 'basic',
              Types: {
                'integer': {
                  DefaultValue: 0
                }
              }
            },
            "AutoMinimize": { DefaultType: 'integer', Level: 'basic',
              Types: {
                'integer': {
                  DefaultValue: 0
                }
              }
            },
            "AutoMaximize": { DefaultType: 'integer', Level: 'basic',
              Types: {
                'integer': {
                  DefaultValue: 0
                }
              }
            },
            "HandleVisible": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                  DefaultValue: true
                }
              }
            },
            "MoverStartImg": { DefaultType: 'image', Level: 'basic' },
            "MoverMiddleImg": { DefaultType: 'image', Level: 'basic',
              Types: {
                'image': {
                   EditorOptions: {
                     HorizontalImages: true
                   }
                 }
              }
            },
            "MoverEndImg": { DefaultType: 'image', Level: 'basic' },
            "HandleImg": { DefaultType: 'image', Level: 'basic' }
          },
          "Events": {
            "OnResize": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { return true; }'
                }
              }
            },
            "OnHandleClick": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { return true; }'
                }
              }
            },
            "OnHandleEnter": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) {}'
                }
              }
            },
            "OnHandleLeave": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) {}'
                }
              }
            },
            "OnSizeChanging": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c, cursize) { return true; }'
                }
              }
            },
            "OnSizeChanged": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) {}'
                }
              }
            },
            "OnMinimize": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { return true; }'
                }
              }
            },
            "OnMaximize": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { return true; }'
                }
              }
            },
            "OnRestore": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { return true; }'
                }
              }
            }
          },
          "OverrideEvents": {
            "OnGetImg": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c, imgidx) { return null; }'
                }
              }
            }
          }
        })
      };
    });
  }
};