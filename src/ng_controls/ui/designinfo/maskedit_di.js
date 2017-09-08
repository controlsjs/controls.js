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
        Properties: ng_diProperties({
          "Data": {
            "HAlign": { Level: 'optional' },
            "HPadding": { Level: 'optional' },
            "VAlign": { Level: 'optional' },
            "Vertical": ng_diBoolean(true, { Level: 'optional' }),
            "VPadding": { Level: 'optional' },
            "Wrapable": { Level: 'optional' },

            "ngAlt": { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": ng_diString('', { Level: 'basic' }),
            "LeftDef": ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
            "EditDef": ng_diControl('ngEdit', null, { Level: 'basic' }, { InheritedFrom: 'ngEdit' }),
            "StaticDef": ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
            "RightDef": ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' }),

            "Mask": ng_diStringValues('',[
              '00:00:00',
              '00:00',
              '0000-00-09',
              '0000-00-00 00:00:00',
              '999999999990.99',
              '990.990.990.990',
              '990°00\'00"Z'
            ], { Level: 'basic' }, { Editor: 'ngfeEditor_DropDown' }),
            "TextAlign": ng_diStringValues('left', ['left','right','center'], { Level: 'basic' }),
            "AutoSize": ng_diBoolean(true),
            "CharWidth": ng_diInteger(10, { Level: 'basic' }),
            "PartWidths": ng_diArrayOf('integer'),
            "PartDefaultValues": ng_diArrayOf('string'),
            "PartInitValues": ng_diType('array_strings'),
            "DefaultValuesAsHint": ng_diBoolean(true, { Level: 'basic' }),
            "PartDefs": ng_diArrayOfControls(),
            "Invalid": ng_diBoolean(false, { Level: 'basic' }),
            "LockHintCaretPos": ng_diBoolean(false, { Level: 'basic' }),
            "Text": ng_diString('', { Level: 'basic' })
          },
          "Events": {
            "OnTextChanged": ng_diEvent('function(c, cp) {}', { Level: 'basic' }),
            "OnGetAlt": ng_diEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnValidate": ng_diEvent('function(c, part, text, re) { return true; }', { Level: 'basic' }),
            "OnSetInvalid": ng_diEvent('function(c, state, update) { return true; }', { Level: 'basic' }),
            "OnSetInvalidPart": ng_diEvent('function(c, part, state, update) { return true; }', { Level: 'basic' }),
            "OnCreatePart": ng_diEvent('function(c, partInfo, def, parts) {}'),
            "OnCreateLeftHolder": ng_diEvent('function(c, def) {}'),
            "OnCreateRightHolder": ng_diEvent('function(c, def) {}')
          },
          "OverrideEvents": {
            "OnGetText": ng_diEvent('function(c) { return ""; }'),
            "OnSetText": ng_diEvent('function(text, c) { return text; }'),
            "OnSetMask": ng_diEvent('function(mask, c) { return mask; }')
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