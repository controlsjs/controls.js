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
//            'H': ng_DIProperty('color_hue',255,{ Required: true, Level: 'basic' }),
//            'S': ng_DIProperty('color_sat',0,{ Required: true, Level: 'basic' }),
//            'V': ng_DIProperty('color_val',0,{ Required: true, Level: 'basic' }),
//            'A': ng_DIProperty('color_alpha',1,{ Level: 'basic' })
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
//            'R': ng_DIProperty('color_red',255,{ Required: true, Level: 'basic' }),
//            'G': ng_DIProperty('color_green',255,{ Required: true, Level: 'basic' }),
//            'B': ng_DIProperty('color_blue',255,{ Required: true, Level: 'basic' }),
//            'A': ng_DIProperty('color_alpha',1,{ Level: 'basic' })
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
//            'HEX': ng_DIProperty('color_hex6','#ffffff',{ Required: true, Level: 'basic' })
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
//            'HEXA': ng_DIProperty('color_hex8','#ffffffff',{ Level: 'basic' })
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
            'L': ng_DIProperty('integer',0,{ Level: 'basic' }),
            'T': ng_DIProperty('integer',0,{ Level: 'basic' }),
            'Src': ng_DIProperty('url','http://',{ Level: 'basic' })
          }
        }
      }
    ]);
  },
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    var undefined;
    ngRegisterControlDesignInfo('ngColorPicker',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        Properties: ng_DIProperties({
          'Data': {
//            'Color': ng_DIProperty(['null','color_hex6','color_hex8','color_chnls_hsv','color_chnls_rgb','color_chnls_hex','color_chnls_hexa'],null,{ InitType: 'color_hex6', Level: 'basic' }),
            'Color': ng_DIProperty(['null','color_hex6','color_hex8'],null,{ InitType: 'color_hex6', Level: 'basic' }),
            'AutoHeight': ng_DIPropertyBool(false, { Level: 'basic' }),
            'AsToolbar': ng_DIPropertyBool(false, { Level: 'basic' }),
            'EditsUpdate_timeout': ng_DIProperty('integer',1000,{ Level: 'basic' })
          },
          'Events': {
            'OnColorChanging': ng_DIPropertyEvent('function(color) { return true; }', { Level: 'basic' }),
            'OnColorChanged': ng_DIPropertyEvent('function(color) {}', { Level: 'basic' })
          },
          'ModifyControls': {
            'Hue_Panel': ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel',ng_DIProperties({
              'ModifyControls': {
                'Hue': ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel'),
                'HueEdit': ng_DIPropertyControl('ngEdit', { Level: 'basic' }, 'ngEdit'),
                'HueLabel': ng_DIPropertyControl('ngText', { Level: 'basic' })
              }
            }, { 'ModifyControls': { Level: 'basic' } })),
            'Saturation_Panel': ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel', ng_DIProperties({
              'ModifyControls': {
                'Saturation': ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel'),
                'SaturationEdit': ng_DIPropertyControl('ngEdit', { Level: 'basic' }, 'ngEdit'),
                'SaturationLabel': ng_DIPropertyControl('ngText', { Level: 'basic' })
              }
            }, { 'ModifyControls': { Level: 'basic' } })),
            'Value_Panel': ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel', ng_DIProperties({
              'ModifyControls': {
                'Value': ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel'),
                'ValueEdit': ng_DIPropertyControl('ngEdit', { Level: 'basic' }, 'ngEdit'),
                'ValueLabel': ng_DIPropertyControl('ngText', { Level: 'basic' })
              }
            }, { 'ModifyControls': { Level: 'basic' } })),
            'Red_Panel': ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel', ng_DIProperties({
              'ModifyControls': {
                'Red': ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel'),
                'RedEdit': ng_DIPropertyControl('ngEdit', { Level: 'basic' }, 'ngEdit'),
                'RedLabel': ng_DIPropertyControl('ngText', { Level: 'basic' })
              }
            }, { 'ModifyControls': { Level: 'basic' } })),
            'Green_Panel': ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel',ng_DIProperties({
              'ModifyControls': {
                'Green': ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel'),
                'GreenEdit': ng_DIPropertyControl('ngEdit', { Level: 'basic' }, 'ngEdit'),
                'GreenLabel': ng_DIPropertyControl('ngText', { Level: 'basic' })
              }
            }, { 'ModifyControls': { Level: 'basic' } })),
            'Blue_Panel': ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel',ng_DIProperties({
              'ModifyControls': {
                'Blue': ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel'),
                'BlueEdit': ng_DIPropertyControl('ngEdit', { Level: 'basic' }, 'ngEdit'),
                'BlueLabel': ng_DIPropertyControl('ngText', { Level: 'basic' })
              }
            }, { 'ModifyControls': { Level: 'basic' } })),
            'Alpha_Panel': ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel',ng_DIProperties({
              'ModifyControls': {
                'Alpha': ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel'),
                'AlphaEdit': ng_DIPropertyControl('ngEdit', { Level: 'basic' }, 'ngEdit'),
                'AlphaLabel': ng_DIPropertyControl('ngText', { Level: 'basic' })
              }
            }, { 'ModifyControls': { Level: 'basic' } })),
            'SatVal_Panel': ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel', ng_DIProperties({
              'ModifyControls': {
                'SatVal': ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel'),
                'SatValLabel': ng_DIPropertyControl('ngText', { Level: 'basic' })
              }
            }, { 'ModifyControls': { Level: 'basic' } })),
            'Hex_Panel': ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel', ng_DIProperties({
              'ModifyControls': {
                'HexEdit': ng_DIPropertyControl('ngEdit', { Level: 'basic' }, 'ngEdit'),
                'HexLabel': ng_DIPropertyControl('ngText', { Level: 'basic' }),
                'AHexEdit': ng_DIPropertyControl('ngEdit', { Level: 'basic' }, 'ngEdit'),
                'AHexLabel': ng_DIPropertyControl('ngText', { Level: 'basic' })
              }
            }, { 'ModifyControls': { Level: 'basic' } })),
            'Preview_Panel': ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel', ng_DIProperties({
              'ModifyControls': {
                'From': ng_DIPropertyControl('ngColorButton', { Level: 'basic' }, 'ngColorButton'),
                'FromLabel': ng_DIPropertyControl('ngText', { Level: 'basic' }),
                'To': ng_DIPropertyControl('ngColorButton', { Level: 'basic' }, 'ngColorButton'),
                'ToLabel': ng_DIPropertyControl('ngText', { Level: 'basic' })
              }
            }, { 'ModifyControls': { Level: 'basic' } }))
          }
        },{
          'ModifyControls': { Level: 'basic' }
        })
      };
    });

    ngRegisterControlDesignInfo('ngColorPickerBox',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        Properties: ng_DIProperties({
          'Layout': { DefaultType: 'bitmask', Level: 'basic',
            Types: {
              'bitmask': {
                DefaultValue: {
                  value: ngCopLayout_Default
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
          },
          'ModifyControls': {
            'ModeBar': ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel',ng_DIProperties({
              'ModifyControls': {
                'Bar': ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel',ng_DIProperties({
                  'ModifyControls': {
                    'Env_H_SV': ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel',ng_DIProperties({
                      'ModifyControls': {
                        'To': ng_DIPropertyControl('ngRadioButton', { Level: 'basic' }, 'ngRadioButton')
                      }
                    }, { "ModifyControls": { Level: 'basic' } })),
                    'Env_HSV': ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel',ng_DIProperties({
                      'ModifyControls': {
                        'To': ng_DIPropertyControl('ngRadioButton', { Level: 'basic' }, 'ngRadioButton')
                      }
                    }, { "ModifyControls": { Level: 'basic' } })),
                    'Env_RGB': ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel',ng_DIProperties({
                      'ModifyControls': {
                        'To': ng_DIPropertyControl('ngRadioButton', { Level: 'basic' }, 'ngRadioButton')
                      }
                    }, { "ModifyControls": { Level: 'basic' } }))
                  }
                }, { "ModifyControls": { Level: 'basic' } }))
              }
            }, { "ModifyControls": { Level: 'basic' } }))
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngColorButton',function(d,c,ref) {
      return {
        ControlCategory: 'Buttons',
        NewControl: {
          _noMerge:true,
          Default: {
            Properties: {
              'W': { Value: 100 }
            }
          }
        },
        Properties: ng_DIProperties({
          'Data': {
//            'Color': ng_DIProperty(['null','color_hex6','color_hex8','color_chnls_hsv','color_chnls_rgb','color_chnls_hex','color_chnls_hexa'],null,{ InitType: 'color_hex6', Level: 'basic' }),
            'Color': ng_DIProperty(['null','color_hex6','color_hex8'],null,{ InitType: 'color_hex6', Level: 'basic' }),
            'BackgroundImg': ng_DIProperty(['null','image_bckg'],null,{ InitType: 'image_bckg', Level: 'basic' }),
            'AllowAlpha': ng_DIPropertyBool(true, { Level: 'basic' })
          },
          'Events': {
            'OnColorChanging': ng_DIPropertyEvent('function(color) { return true; }', { Level: 'basic' }),
            'OnColorChanged': ng_DIPropertyEvent('function(color) {}', { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngColorPickerDropDown',function(d,c,ref) {
      return {
        ControlCategory: 'Edits',
        NewControl: {
          _noMerge:true,
          Default: {
            Properties: {
              'W': { Value: 200 }
            }
          }
        },
        Properties: ng_DIProperties({
          'Data': {
//            'Color': ng_DIProperty(['null','color_hex6','color_hex8','color_chnls_hsv','color_chnls_rgb','color_chnls_hex','color_chnls_hexa'],null,{ InitType: 'color_hex6', Level: 'basic' }),
            'Color': ng_DIProperty(['null','color_hex6','color_hex8'],null,{ InitType: 'color_hex6', Level: 'basic' }),
            'AllowAlpha': ng_DIPropertyBool(false, { Level: 'basic' })
          },
          'Events': {
            'OnColorChanging': ng_DIPropertyEvent('function(color) { return true; }', { Level: 'basic' }),
            'OnColorChanged': ng_DIPropertyEvent('function(color) {}', { Level: 'basic' })
          },
          'DropDown': ng_DIPropertyControl('ngColorPickerBox', { Level: 'basic' }, 'ngColorPickerBox', ng_DIProperties({
            'ModifyControls': {
              'Buttons': ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel', ng_DIProperties({
                'ModifyControls': {
                  'Submit': ng_DIPropertyControl('ngButton', { Level: 'basic' }, 'ngButton'),
                  'Cancel': ng_DIPropertyControl('ngButton', { Level: 'basic' }, 'ngButton')
                }
              }, { 'ModifyControls': { Level: 'basic' } }))
            }
          }, { "ModifyControls": { Level: 'basic' } }))
        })
      };
    });

    ngRegisterControlDesignInfo('ngColorPickerHint',function(d,c,ref) {
      return {
        ControlCategory: 'Containers'
      };
    });

    ngRegisterControlDesignInfo('ngColorPickerButton',function(d,c,ref) {
      return {
        ControlCategory: 'Buttons'
      };
    });
  }
};