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
    ]);
  },
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    var undefined;
    ngRegisterControlDesignInfo('ngColorPicker',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        NewControl: {
          _noMerge:true,
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
            'AsToolbar': ng_diBoolean(false, { Level: 'basic' }),
            'EditsUpdate_timeout': ng_diInteger(1000,{ Level: 'basic' })
          },
          'Events': {
            'OnColorChanging': ng_diEvent('function(color) { return true; }', { Level: 'basic' }),
            'OnColorChanged': ng_diEvent('function(color) {}', { Level: 'basic' })
          },
          'ModifyControls': {
            'Hue_Panel': ng_diControl('ngPanel', ng_diProperties({
              'ModifyControls': {
                'Hue': ng_diControl('ngPanel', null, { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
                'HueEdit': ng_diControl('ngEdit', null, { Level: 'basic' }, { InheritedFrom: 'ngEdit' }),
                'HueLabel': ng_diControl('ngText', null, { Level: 'basic' })
              }
            }, { 'ModifyControls': { Level: 'basic' } }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
            'Saturation_Panel': ng_diControl('ngPanel', ng_diProperties({
              'ModifyControls': {
                'Saturation': ng_diControl('ngPanel', null, { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
                'SaturationEdit': ng_diControl('ngEdit', null, { Level: 'basic' }, { InheritedFrom: 'ngEdit' }),
                'SaturationLabel': ng_diControl('ngText', null, { Level: 'basic' })
              }
            }, { 'ModifyControls': { Level: 'basic' } }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
            'Value_Panel': ng_diControl('ngPanel', ng_diProperties({
              'ModifyControls': {
                'Value': ng_diControl('ngPanel', null, { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
                'ValueEdit': ng_diControl('ngEdit', null, { Level: 'basic' }, { InheritedFrom: 'ngEdit' }),
                'ValueLabel': ng_diControl('ngText', null, { Level: 'basic' })
              }
            }, { 'ModifyControls': { Level: 'basic' } }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
            'Red_Panel': ng_diControl('ngPanel', ng_diProperties({
              'ModifyControls': {
                'Red': ng_diControl('ngPanel', null, { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
                'RedEdit': ng_diControl('ngEdit', null, { Level: 'basic' }, { InheritedFrom: 'ngEdit' }),
                'RedLabel': ng_diControl('ngText', null, { Level: 'basic' })
              }
            }, { 'ModifyControls': { Level: 'basic' } }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
            'Green_Panel': ng_diControl('ngPanel', ng_diProperties({
              'ModifyControls': {
                'Green': ng_diControl('ngPanel', null, { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
                'GreenEdit': ng_diControl('ngEdit', null, { Level: 'basic' }, { InheritedFrom: 'ngEdit' }),
                'GreenLabel': ng_diControl('ngText', null, { Level: 'basic' })
              }
            }, { 'ModifyControls': { Level: 'basic' } }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
            'Blue_Panel': ng_diControl('ngPanel', ng_diProperties({
              'ModifyControls': {
                'Blue': ng_diControl('ngPanel', null, { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
                'BlueEdit': ng_diControl('ngEdit', null, { Level: 'basic' }, { InheritedFrom: 'ngEdit' }),
                'BlueLabel': ng_diControl('ngText', null, { Level: 'basic' })
              }
            }, { 'ModifyControls': { Level: 'basic' } }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
            'Alpha_Panel': ng_diControl('ngPanel', ng_diProperties({
              'ModifyControls': {
                'Alpha': ng_diControl('ngPanel', null, { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
                'AlphaEdit': ng_diControl('ngEdit', null, { Level: 'basic' }, { InheritedFrom: 'ngEdit' }),
                'AlphaLabel': ng_diControl('ngText', null, { Level: 'basic' })
              }
            }, { 'ModifyControls': { Level: 'basic' } }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
            'SatVal_Panel': ng_diControl('ngPanel', ng_diProperties({
              'ModifyControls': {
                'SatVal': ng_diControl('ngPanel', null, { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
                'SatValLabel': ng_diControl('ngText', null, { Level: 'basic' })
              }
            }, { 'ModifyControls': { Level: 'basic' } }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
            'Hex_Panel': ng_diControl('ngPanel', ng_diProperties({
              'ModifyControls': {
                'HexEdit': ng_diControl('ngEdit', null, { Level: 'basic' }, { InheritedFrom: 'ngEdit' }),
                'HexLabel': ng_diControl('ngText', null, { Level: 'basic' }),
                'AHexEdit': ng_diControl('ngEdit', null, { Level: 'basic' }, { InheritedFrom: 'ngEdit' }),
                'AHexLabel': ng_diControl('ngText', null, { Level: 'basic' })
              }
            }, { 'ModifyControls': { Level: 'basic' } }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
            'Preview_Panel': ng_diControl('ngPanel', ng_diProperties({
              'ModifyControls': {
                'From': ng_diControl('ngColorButton', null, { Level: 'basic' }, { InheritedFrom: 'ngColorButton' }),
                'FromLabel': ng_diControl('ngText', null, { Level: 'basic' }),
                'To': ng_diControl('ngColorButton', null, { Level: 'basic' }, { InheritedFrom: 'ngColorButton' }),
                'ToLabel': ng_diControl('ngText', null, { Level: 'basic' })
              }
            }, { 'ModifyControls': { Level: 'basic' } }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' })
          }
        },{
          'ModifyControls': { Level: 'basic' }
        })
      };
    });

    ngRegisterControlDesignInfo('ngColorPickerBox',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        Properties: ng_diProperties({
          'Layout': ng_diTypeVal('ngcop_layout',ngCopLayout_Default,{ Level: 'basic' }),
          'ModifyControls': {
            'ModeBar': ng_diControl('ngPanel', ng_diProperties({
              'ModifyControls': {
                'Bar': ng_diControl('ngPanel', ng_diProperties({
                  'ModifyControls': {
                    'Env_H_SV': ng_diControl('ngPanel', ng_diProperties({
                      'ModifyControls': {
                        'To': ng_diControl('ngRadioButton', null, { Level: 'basic' }, { InheritedFrom: 'ngRadioButton' })
                      }
                    }, { "ModifyControls": { Level: 'basic' } }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
                    'Env_HSV': ng_diControl('ngPanel', ng_diProperties({
                      'ModifyControls': {
                        'To': ng_diControl('ngRadioButton', null, { Level: 'basic' }, { InheritedFrom: 'ngRadioButton' })
                      }
                    }, { "ModifyControls": { Level: 'basic' } }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
                    'Env_RGB': ng_diControl('ngPanel', ng_diProperties({
                      'ModifyControls': {
                        'To': ng_diControl('ngRadioButton', null, { Level: 'basic' }, { InheritedFrom: 'ngRadioButton' })
                      }
                    }, { "ModifyControls": { Level: 'basic' } }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' })
                  }
                }, { "ModifyControls": { Level: 'basic' } }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' })
              }
            }, { "ModifyControls": { Level: 'basic' } }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngColorButton',function(d,c,ref) {
      return {
        ControlCategory: 'Button',
        NewControl: {
          _noMerge:true,
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
            'BackgroundImg': ng_diMixed(['null','image_bckg'], { InitType: 'image_bckg', Level: 'basic' }),
            'AllowAlpha': ng_diBoolean(true, { Level: 'basic' })
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
          _noMerge:true,
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
                  'Submit': ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
                  'Cancel': ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' })
                }
              }, { 'ModifyControls': { Level: 'basic' } }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' })
            }
          }, { "ModifyControls": { Level: 'basic' } }), { Level: 'basic' }, { InheritedFrom: 'ngColorPickerBox' })
        })
      };
    });

    ngRegisterControlDesignInfo('ngColorPickerHint',function(d,c,ref) {
      return {
        ControlCategory: 'Hint',
        NewControl: {
          _noMerge:true,
          Default: {
            Properties: {
              'W': { Value: 100 },
              'H': { Value: 100 }
            }
          }
        },
        Properties: ng_diProperties({
          'ModifyControls': {
            'Picker': ng_diControl('ngColorPickerBox', ng_diProperties({
              'ModifyControls': {
                'Buttons': ng_diControl('ngPanel', ng_diProperties({
                  'ModifyControls': {
                    'Submit': ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
                    'Cancel': ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' })
                  }
                }, { 'ModifyControls': { Level: 'basic' } }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' })
              }
            }, { "ModifyControls": { Level: 'basic' } }), { Level: 'basic' }, { InheritedFrom: 'ngColorPickerBox' })
          }
        }, { "ModifyControls": { Level: 'basic' } })
      };
    });

    ngRegisterControlDesignInfo('ngColorPickerButton',function(d,c,ref) {
      return {
        ControlCategory: 'Button',
        Properties: ng_diProperties({
          'Data': {
            'PickerLayout': ng_diMixed(['null','ngcop_layout'], { InitType: 'ngcop_layout', Level: 'basic' }),
            'HintDef': ng_diControl('ngColorPickerHint', null, { Level: 'basic' }, { InheritedFrom: 'ngColorPickerHint' })
          }
        })
      };
    });
  }
};