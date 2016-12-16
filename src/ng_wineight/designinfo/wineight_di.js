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
var WinEight_DesignInfo = {
  OnInit: function() {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('weColorPickerBox',function(d,c,ref) {
      return {
        NewControl: {
          _noMerge:true,
          Default: {
            Properties: {
              'W': { Value: 320 }
            }
          }
        },
        Properties: ng_DIProperties({
          'Data': {
            'AutoHeight': ng_DIPropertyBool(true, { Level: 'basic' }),
            'AsToolbar': ng_DIPropertyBool(true, { Level: 'basic' }),
            'Vertical': ng_DIPropertyBool(true, { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('weColorButton',function(d,c,ref) {
      return {
        ControlCategory: 'Buttons',
        NewControl: {
          _noMerge:true,
          Default: {
            Properties: {
              'W': { Value: 150 }
            }
          }
        }
      };
    });

    ngRegisterControlDesignInfo('weColorPickerDropDown',function(d,c,ref) {
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
          'DropDown': ng_DIPropertyControl('weColorPickerBox', { Level: 'basic' }, 'weColorPickerBox', ng_DIProperties({
            'Data': {
              'MaxHeight': ng_DIProperty('integer',600,{ Level: 'basic' })
            }
          }))
        })
      };
    });

    ngRegisterControlDesignInfo('weColorPickerHint',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        NewControl: {
          _noMerge:true
        },
        Properties: ng_DIProperties({
          'ModifyControls': {
            'Picker': ng_DIPropertyControl('weColorPickerBox', { Level: 'basic' }, 'weColorPickerBox', ng_DIProperties({
              'W': ng_DIProperty('bounds',296,{ Level: 'basic' })
            }))
          }
        }, { "ModifyControls": { Level: 'basic' } })
      };
    });
  }
};
ngUserControls['wineight_designinfo'] = WinEight_DesignInfo;