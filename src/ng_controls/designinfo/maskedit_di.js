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
var MaskEdit_DesignInfo = {
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    var undefined;
    ngRegisterControlDesignInfo('ngMaskEdit',function(d,c,ref) {
      return {
        ControlCategory: 'Edits',
        IsContainer: false,
        NewControl: {
          Default: {
            Properties: {
              "Data": {
                ObjectProperties: {
                  "Mask": { Value: '00:00:00' }
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "Data": {
            "HAlign": { Level: 'optional' },
            "HPadding": { Level: 'optional' },
            "VAlign": { Level: 'optional' },
            "Vertical": ng_DIPropertyBool(true, { Level: 'optional' }),
            "VPadding": { Level: 'optional' },
            "Wrapable": { Level: 'optional' },

            "ngAlt": { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": { DefaultType: 'string', Level: 'basic' },
            "LeftDef": { DefaultType: 'control', Level: 'basic',
              Types: {
                'control': {
                  Type: 'ngButton',
                  InheritedFrom: 'ngButton'
                }
              }
            },
            "EditDef": { DefaultType: 'control', Level: 'basic',
              Types: {
                'control': {
                  Type: 'ngEdit',
                  InheritedFrom: 'ngEdit'
                }
              }
            },
            "StaticDef": { DefaultType: 'control', Level: 'basic',
              Types: {
                'control': {
                  Type: 'ngButton',
                  InheritedFrom: 'ngButton'
                }
              }
            },
            "RightDef": { DefaultType: 'control', Level: 'basic',
              Types: {
                'control': {
                  Type: 'ngButton',
                  InheritedFrom: 'ngButton'
                }
              }
            },

            "Mask": ng_DIPropertyStrings('',[
              '00:00:00',
              '00:00',
              '0000-00-09',
              '0000-00-00 00:00:00',
              '999999999990.99',
              '990.990.990.990',
              '990°00\'00"Z'
            ], { Level: 'basic',
              Types: {
                'string': {
                  Editor: 'ngfeEditor_DropDown'
                }
              }
            }),
            "TextAlign": ng_DIPropertyStrings('left', ['left','right','center'], { Level: 'basic' }),
            "AutoSize": ng_DIPropertyBool(true),
            "CharWidth": ng_DIProperty('integer', 10, { Level: 'basic' }),
            "PartWidths": { DefaultType: 'array', 
              Types: {
                'array': {
                  ChildDesignInfo: {
                    DefaultType: 'integer'
                  }
                }
              }
            },
            "PartDefaultValues": { DefaultType: 'array', 
              Types: {
                'array': {
                  ChildDesignInfo: {
                    DefaultType: 'string'
                  }
                }
              }
            },
            "PartInitValues": { DefaultType: 'array_strings' },
            "DefaultValuesAsHint": ng_DIPropertyBool(true, { Level: 'basic' }),
            "PartDefs": { DefaultType: 'controls_array' },
            "Invalid": ng_DIPropertyBool(false, { Level: 'basic' }),
            "LockHintCaretPos": ng_DIPropertyBool(false, { Level: 'basic' }),
            "Text": { DefaultType: 'string', Level: 'basic' }
          },
          "Events": {
            "OnTextChanged": ng_DIPropertyEvent('function(c, cp) {}', { Level: 'basic' }),
            "OnGetAlt": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnValidate": ng_DIPropertyEvent('function(c, part, text, re) { return true; }', { Level: 'basic' }),
            "OnSetInvalid": ng_DIPropertyEvent('function(c, state, update) { return true; }', { Level: 'basic' }),
            "OnSetInvalidPart": ng_DIPropertyEvent('function(c, part, state, update) { return true; }', { Level: 'basic' }),
            "OnCreatePart": ng_DIPropertyEvent('function(c, partInfo, def, parts) {}'),
            "OnCreateLeftHolder": ng_DIPropertyEvent('function(c, def) {}'),
            "OnCreateRightHolder": ng_DIPropertyEvent('function(c, def) {}')
          },
          "OverrideEvents": {
            "OnGetText": ng_DIPropertyEvent('function(c) { return ""; }'),
            "OnSetText": ng_DIPropertyEvent('function(text, c) { return text; }'),
            "OnSetMask": ng_DIPropertyEvent('function(mask, c) { return mask; }')
          }
        })
      };
    },{
      Properties: {
        "Controls": { Level: 'optional' }
      }
    });
  }
};
ngUserControls['maskedit_designinfo'] = MaskEdit_DesignInfo;