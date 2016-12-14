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
      {
        TypeID: 'color_channels',
        TypeBase: 'object',
        Name: 'color channels',
        ShortName: 'chnls',
        Options: {
          Add: false,
          DestroyIfEmpty: true,
          ObjectProperties: {
            'H': ng_DIProperty('integer',255,{ Options: { MinValue: 0, MaxValue: 255 }, Level: 'basic' }),
            'S': ng_DIProperty('float',0,{ Options: { MinValue: 0, MaxValue: 1 }, Level: 'basic' }),
            'V': ng_DIProperty('float',0,{ Options: { MinValue: 0, MaxValue: 1 }, Level: 'basic' }),
            'R': ng_DIProperty('integer',255,{ Options: { MinValue: 0, MaxValue: 255 }, Level: 'basic' }),
            'G': ng_DIProperty('integer',255,{ Options: { MinValue: 0, MaxValue: 255 }, Level: 'basic' }),
            'B': ng_DIProperty('integer',255,{ Options: { MinValue: 0, MaxValue: 255 }, Level: 'basic' }),
            'A': ng_DIProperty('float',1,{ Options: { MinValue: 0, MaxValue: 1 }, Level: 'basic' }),
            'HEX': ng_DIProperty('color_hex6','#ffffff',{ Level: 'basic' }),
            'HEXA': ng_DIProperty('color_hex8','#ffffffff',{ Level: 'basic' })
          }
        }
      },
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
            'Src': ng_DIProperty('string','http://',{ Level: 'basic' })
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
          "Data": {
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngColorPickerBox',function(d,c,ref) {
      return {
        ControlCategory: 'Misc'
      };
    });

    ngRegisterControlDesignInfo('ngColorButton',function(d,c,ref) {
      return {
        ControlCategory: 'Buttons',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "Data": {
                ObjectProperties: {
                  "Text": undefined,
                  "HTMLEncode": undefined
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          'Data': {
            'Color': ng_DIProperty(['null','color_channels'],null,{ InitType: 'color_channels', Level: 'basic' }),
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
        ControlCategory: 'Edits'
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