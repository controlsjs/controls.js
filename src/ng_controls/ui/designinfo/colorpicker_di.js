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
ngUserControls['ngColorControls_designinfo'] = {
  OnFormEditorInit: function(FE)
  {
    FormEditor.RegisterPropertyType([
//      {
//        TypeID: 'color_hue',
//        TypeBase: 'integer',
//        Name: 'color hue',
//        ShortName: 'hue',
//        Options: {
//          DefaultCode: '255',
//          DefaultValue: 255,
//          MinValue: 0,
//          MaxValue: 255
//        }
//      },
//      {
//        TypeID: 'color_sat',
//        TypeBase: 'float',
//        Name: 'color saturation',
//        ShortName: 'sat',
//        Options: {
//          MinValue: 0,
//          MaxValue: 1
//        }
//      },
//      {
//        TypeID: 'color_val',
//        TypeBase: 'float',
//        Name: 'color value',
//        ShortName: 'val',
//        Options: {
//          MinValue: 0,
//          MaxValue: 1
//        }
//      },
//      {
//        TypeID: 'color_alpha',
//        TypeBase: 'float',
//        Name: 'color alpha',
//        ShortName: 'alpha',
//        Options: {
//          DefaultCode: '1',
//          DefaultValue: 1,
//          MinValue: 0,
//          MaxValue: 1
//        }
//      },
//      {
//        TypeID: 'color_red',
//        TypeBase: 'integer',
//        Name: 'color red',
//        ShortName: 'red',
//        Options: {
//          DefaultCode: '255',
//          DefaultValue: 255,
//          MinValue: 0,
//          MaxValue: 255
//        }
//      },
//      {
//        TypeID: 'color_green',
//        TypeBase: 'integer',
//        Name: 'color green',
//        ShortName: 'green',
//        Options: {
//          DefaultCode: '255',
//          DefaultValue: 255,
//          MinValue: 0,
//          MaxValue: 255
//        }
//      },
//      {
//        TypeID: 'color_blue',
//        TypeBase: 'integer',
//        Name: 'color blue',
//        ShortName: 'blue',
//        Options: {
//          DefaultCode: '255',
//          DefaultValue: 255,
//          MinValue: 0,
//          MaxValue: 255
//        }
//      },
//      {
//        TypeID: 'color_chnls_hsv',
//        TypeBase: 'object',
//        Name: 'color HSV channels',
//        ShortName: 'chnls',
//        Options: {
//          Add: false,
//          DestroyIfEmpty: true,
//          ObjectProperties: {
//            'H': ng_diTypeVal('color_hue',255,{ Required: true, Level: 'basic' }),
//            'S': ng_diTypeVal('color_sat',0,{ Required: true, Level: 'basic' }),
//            'V': ng_diTypeVal('color_val',0,{ Required: true, Level: 'basic' }),
//            'A': ng_diTypeVal('color_alpha',1,{ Level: 'basic' })
//          },
//          InitValue: {
//            'H': '255',
//            'S': '0',
//            'V': '0'
//          },
//          Editor: ''
//        }
//      },
//      {
//        TypeID: 'color_chnls_rgb',
//        TypeBase: 'object',
//        Name: 'color RGB channels',
//        ShortName: 'chnls',
//        Options: {
//          Add: false,
//          DestroyIfEmpty: true,
//          ObjectProperties: {
//            'R': ng_diTypeVal('color_red',255,{ Required: true, Level: 'basic' }),
//            'G': ng_diTypeVal('color_green',255,{ Required: true, Level: 'basic' }),
//            'B': ng_diTypeVal('color_blue',255,{ Required: true, Level: 'basic' }),
//            'A': ng_diTypeVal('color_alpha',1,{ Level: 'basic' })
//          },
//          InitValue: {
//            'R': '255',
//            'G': '255',
//            'B': '255'
//          },
//          Editor: ''
//        }
//      },
//      {
//        TypeID: 'color_chnls_hex',
//        TypeBase: 'object',
//        Name: 'color HEX channel',
//        ShortName: 'chnls',
//        Options: {
//          Add: false,
//          DestroyIfEmpty: true,
//          ObjectProperties: {
//            'HEX': ng_diTypeVal('color_hex6','#ffffff',{ Required: true, Level: 'basic' })
//          },
//          InitValue: {
//            'HEX': '#ffffff'
//          },
//          Editor: ''
//        }
//      },
//      {
//        TypeID: 'color_chnls_hexa',
//        TypeBase: 'object',
//        Name: 'color HEXA channels',
//        ShortName: 'chnls',
//        Options: {
//          Add: false,
//          DestroyIfEmpty: true,
//          ObjectProperties: {
//            'HEXA': ng_diTypeVal('color_hex8','#ffffffff',{ Level: 'basic' })
//          },
//          InitValue: {
//            'HEXA': '#ffffffff'
//          },
//          Editor: ''
//        }
//      },
      {
        TypeID: 'image_bckg',
        TypeBase: 'object',
        Name: 'background image',
        ShortName: 'bgimg',
        Options: {
          Add: false,
          DestroyIfEmpty: true,
          ObjectProperties: {
            'L': ng_diInteger(0,{ Level: 'basic' }),
            'T': ng_diInteger(0,{ Level: 'basic' }),
            'Src': ng_diTypeVal('url','http://',{ Level: 'basic' })
          }
        }
      },
      {
        TypeID: 'ngcop_layout',
        TypeBase: 'bitmask',
        Name: 'color picker layout',
        ShortName: 'cop-l',
        Options: {
          DefaultCode: 'ngCopLayout_Default',
          DefaultValue: {
            value: ngCopLayout_Default,
            identifiers: [{ id: 'ngCopLayout_Default', value: ngCopLayout_Default }]
          },
          EditorOptions: {
            BitMaskIdentifiers: [
              { id: 'ngColorPickerH', value: ngColorPickerH },
              { id: 'ngColorPickerS', value: ngColorPickerS },
              { id: 'ngColorPickerV', value: ngColorPickerV },
              { id: 'ngColorPickerSV', value: ngColorPickerSV },

              { id: 'ngColorPickerR', value: ngColorPickerR },
              { id: 'ngColorPickerG', value: ngColorPickerG },
              { id: 'ngColorPickerB', value: ngColorPickerB },

              { id: 'ngColorPickerA', value: ngColorPickerA },
              { id: 'ngColorPickerPreview', value: ngColorPickerPreview },

              { id: 'ngColorPickerHex', value: ngColorPickerHex },
              { id: 'ngColorPickerAHex', value: ngColorPickerAHex },
              { id: 'ngColorPickerEdits', value: ngColorPickerEdits },

              { id: 'ngColorPickerModeBar', value: ngColorPickerModeBar },

              { id: 'ngCopLayout_H_SV', value: ngCopLayout_H_SV },
              { id: 'ngCopLayout_HA_SV', value: ngCopLayout_HA_SV },
              { id: 'ngCopLayout_HSV', value: ngCopLayout_HSV },
              { id: 'ngCopLayout_HSVA', value: ngCopLayout_HSVA },
              { id: 'ngCopLayout_RGB', value: ngCopLayout_RGB },
              { id: 'ngCopLayout_RGBA', value: ngCopLayout_RGBA },
              { id: 'ngCopLayout_Default', value: ngCopLayout_Default }
            ]
          }
        }
      }
    ]);
  },
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    var undefined;

    function sliderlayout(props) {
      ng_MergeVar(props, {
        'ParentReferences': ng_diBoolean(false),
        'Data': {
          'PaddingH': ng_diInteger(0, { Level: 'basic' }),
          'PaddingV': ng_diInteger(0, { Level: 'basic' }),
          'MinValue': ng_diInteger(0, { Level: 'basic' }),
          'MaxValue': ng_diInteger(0, { Level: 'basic' }),
          'WithEditBounds': ng_diMixed([
            ng_diNull(),
            ng_diObject({
              "L": ng_diType('bounds', { DisplayName: 'Left (L)', Level: 'basic', Order: 0.11 }),
              "T": ng_diType('bounds', { DisplayName: 'Top (T)', Level: 'basic', Order: 0.12 }),
              "W": ng_diType('bounds', { DisplayName: 'Width (W)', Level: 'basic', Order: 0.13 }),
              "H": ng_diType('bounds', { DisplayName: 'Height (H)', Level: 'basic', Order: 0.14 }),
              "R": ng_diType('bounds', { DisplayName: 'Right (R)', Level: 'basic', Order: 0.15 }),
              "B": ng_diType('bounds', { DisplayName: 'Bottom (B)', Level: 'basic', Order: 0.16 })
            })
          ], { InitType: 'object', Level: 'basic' }),
          'WithoutEditBounds': ng_diMixed([
            ng_diNull(),
            ng_diObject({
              "L": ng_diType('bounds', { DisplayName: 'Left (L)', Level: 'basic', Order: 0.11 }),
              "T": ng_diType('bounds', { DisplayName: 'Top (T)', Level: 'basic', Order: 0.12 }),
              "W": ng_diType('bounds', { DisplayName: 'Width (W)', Level: 'basic', Order: 0.13 }),
              "H": ng_diType('bounds', { DisplayName: 'Height (H)', Level: 'basic', Order: 0.14 }),
              "R": ng_diType('bounds', { DisplayName: 'Right (R)', Level: 'basic', Order: 0.15 }),
              "B": ng_diType('bounds', { DisplayName: 'Bottom (B)', Level: 'basic', Order: 0.16 })
            })
          ], { InitType: 'object', Level: 'basic' }),
          'ChildHandling': ng_diIntegerIdentifiers('ngChildEnabledParentAware')
        },
        'ModifyControls': {
          'Plane': ng_diControl('ngPanel', ng_diProperties({
            'style': { 'zIndex': ng_diInteger(1, { Level: 'advanced' }) }
          }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
          'Cursor': ng_diControl('ngPanel', ng_diProperties({
            'style': { 'zIndex': ng_diInteger(2, { Level: 'advanced' }) }
          }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
          'ClickCatcher': ng_diControl('ngPanel', ng_diProperties({
            'style': { 'zIndex': ng_diInteger(3, { Level: 'advanced' }) }
          }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' })
        }
      });
      return ng_diControl('ngFrame', ng_diProperties(props), { Level: 'basic' }, { InheritedFrom: 'ngPanel' });
    }

    function editlayout(props) {
      ng_MergeVar(props, {
        'Data': {
          'Precision': ng_diInteger(0, { Level: 'basic' }),
          'MinValue': ng_diInteger(0, { Level: 'basic' }),
          'MaxValue': ng_diInteger(0, { Level: 'basic' })
        }
      });
      return ng_diControl('ngEdit', ng_diProperties(props), { Level: 'basic' }, { InheritedFrom: 'ngEdit' });
    }

    ngRegisterControlDesignInfo('ngColorPicker',function(d,c,ref) {

      return {
        ControlCategory: 'Misc',
        NewControl: {
          Default: {
            Properties: {
              'W': { Value: 100 },
              'H': { Value: 100 }
            }
          }
        },
        Properties: ng_diProperties({
          'Data': {
//            'Color': ng_diMixed(['null','color_hex6','color_hex8','color_chnls_hsv','color_chnls_rgb','color_chnls_hex','color_chnls_hexa'],{ InitType: 'color_hex6', Level: 'basic' }),
            'Color': ng_diMixed(['null','color_hex6','color_hex8'],{ InitType: 'color_hex6', Level: 'basic' }),
            'AutoHeight': ng_diBoolean(false, { Level: 'basic' }),
            'AsToolbar': ng_diBoolean(false, { Level: 'advanced' }),
            'EditsUpdate_timeout': ng_diInteger(1000,{ Level: 'advanced' }),
            'ChildHandling': ng_diIntegerIdentifiers('ngChildEnabledParentAware')
          },
          'Events': {
            'OnColorChanging': ng_diEvent('function(color) { return true; }', { Level: 'basic' }),
            'OnColorChanged': ng_diEvent('function(color) {}', { Level: 'basic' })
          },
          'ModifyControls': {
            'Hue_Panel': ng_diControl('ngPanel', ng_diProperties({
              'Data': { 'ChildHandling': ng_diIntegerIdentifiers('ngChildEnabledParentAware') },
              'ModifyControls': {
                'Hue': sliderlayout({
                  'Data': {
                    'ColorComponent': ng_diString('H', { Level: 'basic' }),
                    'MinValue': ng_diInteger(0), 'MaxValue': ng_diInteger(360)
                  }
                }),
                'HueEdit': editlayout({
                  'Data': {
                    'ColorComponent': ng_diString('H', { Level: 'basic' }),
                    'Precision': ng_diInteger(2),
                    'MaxLength': ng_diInteger(6),
                    'MinValue': ng_diInteger(0), 'MaxValue': ng_diInteger(360)
                  }
                }),
                'HueLabel': ng_diControl('ngText', ng_diProperties({
                  'Data': {
                    'ngTextD': ng_diString('colorpicker_hue')
                  }
                }), { Level: 'basic' })
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
            'Saturation_Panel': ng_diControl('ngPanel', ng_diProperties({
              'Data': { 'ChildHandling': ng_diIntegerIdentifiers('ngChildEnabledParentAware') },
              'ModifyControls': {
                'Saturation': sliderlayout({
                  'Data': {
                    'ColorComponent': ng_diString('S', { Level: 'basic' }),
                    'MinValue': ng_diInteger(0), 'MaxValue': ng_diInteger(1)
                  }
                }),
                'SaturationEdit': editlayout({
                  'Data': {
                    'ColorComponent': ng_diString('S', { Level: 'basic' }),
                    'Precision': ng_diInteger(2),
                    'MaxLength': ng_diInteger(4),
                    'MinValue': ng_diInteger(0), 'MaxValue': ng_diInteger(1)
                  }
                }),
                'SaturationLabel': ng_diControl('ngText', ng_diProperties({
                  'Data': {
                    'ngTextD': ng_diString('colorpicker_saturation')
                  }
                }), { Level: 'basic' })
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
            'Value_Panel': ng_diControl('ngPanel', ng_diProperties({
              'Data': { 'ChildHandling': ng_diIntegerIdentifiers('ngChildEnabledParentAware') },
              'ModifyControls': {
                'Value': sliderlayout({
                  'Data': {
                    'ColorComponent': ng_diString('V', { Level: 'basic' }),
                    'MinValue': ng_diInteger(0), 'MaxValue': ng_diInteger(1)
                  }
                }),
                'ValueEdit': editlayout({
                  'Data': {
                    'ColorComponent': ng_diString('V', { Level: 'basic' }),
                    'Precision': ng_diInteger(2),
                    'MaxLength': ng_diInteger(4),
                    'MinValue': ng_diInteger(0), 'MaxValue': ng_diInteger(1)
                  }
                }),
                'ValueLabel': ng_diControl('ngText', ng_diProperties({
                  'Data': {
                    'ngTextD': ng_diString('colorpicker_value')
                  }
                }), { Level: 'basic' })
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
            'Red_Panel': ng_diControl('ngPanel', ng_diProperties({
              'Data': { 'ChildHandling': ng_diIntegerIdentifiers('ngChildEnabledParentAware') },
              'ModifyControls': {
                'Red': sliderlayout({
                  'Data': {
                    'ColorComponent': ng_diString('R', { Level: 'basic' }),
                    'MinValue': ng_diInteger(0), 'MaxValue': ng_diInteger(255)
                  }
                }),
                'RedEdit': editlayout({
                  'Data': {
                    'ColorComponent': ng_diString('R', { Level: 'basic' }),
                    'MaxLength': ng_diInteger(3),
                    'MinValue': ng_diInteger(0), 'MaxValue': ng_diInteger(255)
                  }
                }),
                'RedLabel': ng_diControl('ngText', ng_diProperties({
                  'Data': {
                    'ngTextD': ng_diString('colorpicker_red')
                  }
                }), { Level: 'basic' })
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
            'Green_Panel': ng_diControl('ngPanel', ng_diProperties({
              'Data': { 'ChildHandling': ng_diIntegerIdentifiers('ngChildEnabledParentAware') },
              'ModifyControls': {
                'Green': sliderlayout({
                  'Data': {
                    'ColorComponent': ng_diString('G', { Level: 'basic' }),
                    'MinValue': ng_diInteger(0), 'MaxValue': ng_diInteger(255)
                  }
                }),
                'GreenEdit': editlayout({
                  'Data': {
                    'ColorComponent': ng_diString('G', { Level: 'basic' }),
                    'MaxLength': ng_diInteger(3),
                    'MinValue': ng_diInteger(0), 'MaxValue': ng_diInteger(255)
                  }
                }),
                'GreenLabel': ng_diControl('ngText', ng_diProperties({
                  'Data': {
                    'ngTextD': ng_diString('colorpicker_green')
                  }
                }), { Level: 'basic' })
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
            'Blue_Panel': ng_diControl('ngPanel', ng_diProperties({
              'Data': { 'ChildHandling': ng_diIntegerIdentifiers('ngChildEnabledParentAware') },
              'ModifyControls': {
                'Blue': sliderlayout({
                  'Data': {
                    'ColorComponent': ng_diString('B', { Level: 'basic' }),
                    'MinValue': ng_diInteger(0), 'MaxValue': ng_diInteger(255)
                  }
                }),
                'BlueEdit': editlayout({
                  'Data': {
                    'ColorComponent': ng_diString('B', { Level: 'basic' }),
                    'MaxLength': ng_diInteger(3),
                    'MinValue': ng_diInteger(0), 'MaxValue': ng_diInteger(255)
                  }
                }),
                'BlueLabel': ng_diControl('ngText', ng_diProperties({
                  'Data': {
                    'ngTextD': ng_diString('colorpicker_blue')
                  }
                }), { Level: 'basic' })
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
            'Alpha_Panel': ng_diControl('ngPanel', ng_diProperties({
              'Data': { 'ChildHandling': ng_diIntegerIdentifiers('ngChildEnabledParentAware') },
              'ModifyControls': {
                'Alpha': sliderlayout({
                  'Data': {
                    'ColorComponent': ng_diString('A', { Level: 'basic' }),
                    'MinValue': ng_diInteger(0), 'MaxValue': ng_diInteger(1)
                  }
                }),
                'AlphaEdit': editlayout({
                  'Data': {
                    'ColorComponent': ng_diString('A', { Level: 'basic' }),
                    'Precision': ng_diInteger(2),
                    'MaxLength': ng_diInteger(2),
                    'MinValue': ng_diInteger(0), 'MaxValue': ng_diInteger(1)
                  }
                }),
                'AlphaLabel': ng_diControl('ngText', ng_diProperties({
                  'Data': {
                    'ngTextD': ng_diString('colorpicker_alpha')
                  }
                }), { Level: 'basic' })
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
            'SatVal_Panel': ng_diControl('ngPanel', ng_diProperties({
              'Data': { 'ChildHandling': ng_diIntegerIdentifiers('ngChildEnabledParentAware') },
              'ModifyControls': {
                'SatVal': editlayout({}),
                'SatValLabel': ng_diControl('ngText', ng_diProperties({
                  'Data': {
                    'ngTextD': ng_diString('colorpicker_setval')
                  }
                }), { Level: 'basic' })
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
            'Hex_Panel': ng_diControl('ngPanel', ng_diProperties({
              'Data': { 'ChildHandling': ng_diIntegerIdentifiers('ngChildEnabledParentAware') },
              'ModifyControls': {
                'HexEdit': ng_diControl('ngEdit', ng_diProperties({
                  'Data': {
                    'MaxLength': ng_diInteger(7)
                  }
                }), { Level: 'basic' }, { InheritedFrom: 'ngEdit' }),
                'HexLabel': ng_diControl('ngText', ng_diProperties({
                  'Data': {
                    'ngTextD': ng_diString('colorpicker_hex')
                  }
                }), { Level: 'basic' }),
                'AHexEdit': ng_diControl('ngEdit', ng_diProperties({
                  'Data': {
                    'MaxLength': ng_diInteger(9)
                  }
                }), { Level: 'basic' }, { InheritedFrom: 'ngEdit' }),
                'AHexLabel': ng_diControl('ngText', ng_diProperties({
                  'Data': {
                    'ngTextD': ng_diString('colorpicker_alphahex')
                  }
                }), { Level: 'basic' })
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
            'Preview_Panel': ng_diControl('ngPanel', ng_diProperties({
              'Data': { 'ChildHandling': ng_diIntegerIdentifiers('ngChildEnabledParentAware') },
              'ModifyControls': {
                'From': ng_diControl('ngColorButton', null, { Level: 'basic' }, { InheritedFrom: 'ngColorButton' }),
                'FromLabel': ng_diControl('ngText', ng_diProperties({
                  'Data': {
                    'ngTextD': ng_diString('colorpicker_from')
                  }
                }), { Level: 'basic' }),
                'To': ng_diControl('ngColorButton', null, { Level: 'basic' }, { InheritedFrom: 'ngColorButton' }),
                'ToLabel': ng_diControl('ngText', ng_diProperties({
                  'Data': {
                    'ngTextD': ng_diString('colorpicker_to')
                  }
                }), { Level: 'basic' })
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngColorPickerBox',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        Properties: ng_diProperties({
          'Layout': ng_diTypeVal('ngcop_layout',ngCopLayout_Default,{ Level: 'basic' }),
          'ModifyControls': {
            'ModeBar': ng_diControl('ngFrame', ng_diProperties({
              'ParentReferences': ng_diBoolean(false),
              'Data': { 'ChildHandling': ng_diIntegerIdentifiers('ngChildEnabledParentAware') },
              'ModifyControls': {
                'Bar': ng_diControl('ngPanel', ng_diProperties({
                  'Data': { 'ChildHandling': ng_diIntegerIdentifiers('ngChildEnabledParentAware') },
                  'ModifyControls': {
                    'Env_H_SV': ng_diControl('ngPanel', ng_diProperties({
                      'Data': { 'ChildHandling': ng_diIntegerIdentifiers('ngChildEnabledParentAware') },
                      'ModifyControls': {
                        'H_SV': ng_diControl('ngRadioButton', ng_diProperties({
                          'Mode': ng_diString('h_sv'),
                          'ngTextD': ng_diString('colorpicker_H-SV'),
                          'Checked': ng_diInteger(1)
                        }), { Level: 'basic' }, { InheritedFrom: 'ngRadioButton' })
                      }
                    }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
                    'Env_HSV': ng_diControl('ngPanel', ng_diProperties({
                      'Data': { 'ChildHandling': ng_diIntegerIdentifiers('ngChildEnabledParentAware') },
                      'ModifyControls': {
                        'HSV': ng_diControl('ngRadioButton', ng_diProperties({
                          'Mode': ng_diString('hsv'),
                          'ngTextD': ng_diString('colorpicker_HSV')
                        }), { Level: 'basic' }, { InheritedFrom: 'ngRadioButton' })
                      }
                    }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
                    'Env_RGB': ng_diControl('ngPanel', ng_diProperties({
                      'Data': { 'ChildHandling': ng_diIntegerIdentifiers('ngChildEnabledParentAware') },
                      'ModifyControls': {
                        'RGB': ng_diControl('ngRadioButton', ng_diProperties({
                          'Mode': ng_diString('rgb'),
                          'ngTextD': ng_diString('colorpicker_RGB')
                        }), { Level: 'basic' }, { InheritedFrom: 'ngRadioButton' })
                      }
                    }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' })
                  }
                }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' })
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngColorButton',function(d,c,ref) {
      return {
        ControlCategory: 'Button',
        NewControl: {
          Default: {
            Properties: {
              'W': { Value: 100 }
            }
          }
        },
        Properties: ng_diProperties({
          'Data': {
//            'Color': ng_diMixed(['null','color_hex6','color_hex8','color_chnls_hsv','color_chnls_rgb','color_chnls_hex','color_chnls_hexa'], { InitType: 'color_hex6', Level: 'basic' }),
            'Color': ng_diMixed(['null','color_hex6','color_hex8'], { InitType: 'color_hex6', Level: 'basic' }),
            'BackgroundImg': ng_diMixed(['null','image_bckg'], { InitType: 'image_bckg', Level: 'advanced' }),
            'AllowAlpha': ng_diBoolean(true, { Level: 'basic' }),
            'Img': { Level: 'advanced' },
            'ImgAlign': { Level: 'advanced' },
            'ImgIndent': { Level: 'advanced' },
            'ngTextD': { Level: 'advanced' },
            'Text': { Level: 'advanced' },
            'TextAlign': { Level: 'advanced' },
            'Checked': { Level: 'advanced' },
            'RadioGroup': { Level: 'advanced' }
          },
          'Events': {
            'OnColorChanging': ng_diEvent('function(color) { return true; }', { Level: 'basic' }),
            'OnColorChanged': ng_diEvent('function(color) {}', { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngColorPickerDropDown',function(d,c,ref) {
      return {
        ControlCategory: 'Dropdown',
        NewControl: {
          Default: {
            Properties: {
              'W': { Value: 100 }
            }
          }
        },
        Properties: ng_diProperties({
          'CreateFrom': ng_diString('ngDropDown', { Level: 'optional', Order: 0.0101 }, { Editor: 'ngfeEditor_ControlType' }),
          'Data': {
//            'Color': ng_diMixed(['null','color_hex6','color_hex8','color_chnls_hsv','color_chnls_rgb','color_chnls_hex','color_chnls_hexa'], { InitType: 'color_hex6', Level: 'basic' }),
            'Color': ng_diMixed(['null','color_hex6','color_hex8'], { InitType: 'color_hex6', Level: 'basic' }),
            'AllowAlpha': ng_diBoolean(true, { Level: 'basic' })
          },
          'Events': {
            'OnColorChanging': ng_diEvent('function(color) { return true; }', { Level: 'basic' }),
            'OnColorChanged': ng_diEvent('function(color) {}', { Level: 'basic' })
          },
          'DropDown': ng_diControl('ngColorPickerBox', ng_diProperties({
            'ModifyControls': {
              'Buttons': ng_diControl('ngPanel', ng_diProperties({
                'ModifyControls': {
                    'Submit': ng_diControl('ngButton', ng_diProperties({
                      'Data': {
                        'ngTextD': ng_diString('colorpicker_Submit')
                      }
                    }), { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
                    'Cancel': ng_diControl('ngButton', ng_diProperties({
                      'Data': {
                        'ngTextD': ng_diString('colorpicker_Cancel')
                      }
                    }), { Level: 'basic' }, { InheritedFrom: 'ngButton' })
                }
              }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' })
            }
          }), { Level: 'basic' }, { InheritedFrom: 'ngColorPickerBox' })
        })
      };
    });

    ngRegisterControlDesignInfo('ngColorPickerHint',function(d,c,ref) {
      return {
        ControlCategory: 'Hint',
        NewControl: {
          Default: {
            Properties: {
              'W': { Value: 100 },
              'H': { Value: 100 }
            }
          }
        },
        Properties: ng_diProperties({
          'CreateFrom': ng_diString('ngHint', { Level: 'optional', Order: 0.0101 }, { Editor: 'ngfeEditor_ControlType' }),
          'ModifyControls': {
            'Picker': ng_diControl('ngColorPickerBox', ng_diProperties({
              'ModifyControls': {
                'Buttons': ng_diControl('ngPanel', ng_diProperties({
                  'ModifyControls': {
                    'Submit': ng_diControl('ngButton', ng_diProperties({
                      'Data': {
                        'ngTextD': ng_diString('colorpicker_Submit')
                      }
                    }), { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
                    'Cancel': ng_diControl('ngButton', ng_diProperties({
                      'Data': {
                        'ngTextD': ng_diString('colorpicker_Cancel')
                      }
                    }), { Level: 'basic' }, { InheritedFrom: 'ngButton' })
                  }
                }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' })
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngColorPickerBox' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngColorPickerButton',function(d,c,ref) {
      return {
        ControlCategory: 'Button',
        Properties: ng_diProperties({
          'CreateFrom': ng_diString('ngColorButton', { Level: 'optional', Order: 0.0101 }, { Editor: 'ngfeEditor_ControlType' }),
          'Data': {
            'PickerLayout': ng_diMixed(['null','ngcop_layout'], { InitType: 'ngcop_layout', Level: 'basic' }),
            'HintDef': ng_diControl('ngColorPickerHint', null, { Level: 'advanced' }, { InheritedFrom: 'ngColorPickerHint' })
          }
        })
      };
    });
  }
};