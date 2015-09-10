/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2014-2015 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */

if(ngHASDESIGNINFO()) {

  if(typeof ngUserControls === 'undefined') ngUserControls = new Array();

  var MaskEdit_DesignInfo = {
    OnControlCreated: function(def, c) {
      if(!ngHASDESIGNINFO()) return;

      if (typeof def.DesignInfo==='undefined') def.DesignInfo = {};

      var di;
      switch(c.DefType)
      {

        case 'ngMaskEdit':
          di = {
            ControlCategory: 'Edits',
            AddData: {
              InitProperties: {
                'W': { value: 120 },
                'H': null,
                'Data': {},
                'Data.Mask': { value: '' },
                'Controls': null
              }
            },
            Properties: {
              Data: {
                properties: {
                  Mask: { type: 'string',
                    help: '<b>Mask:</b><br /><br />'+
                      '0 - required digit [0-9]<br />'+
                      '9 - optional digit [0-9]<br />'+
                      'C - required letter [A-Za-z]<br />'+
                      'X - optional letter [A-Za-z]<br />'+
                      'A - required uppercase letter [A-Z]<br />'+
                      'a - required lowercase letter [a-z]<br />'+
                      'Z - optional uppercase letter [A-Z]<br />'+
                      'z - optional lowercase letter [a-z]<br />'+
                      '! - required char<br />'+
                      '? - optional char<br />'+
                      '\\ - escape char<br /><br />'
                  },
                  TextAlign: { type: 'string', dVal: 'left', readOnly: true,
                    items: ['left', 'center', 'right']
                  },
                  AutoSize: { type: 'boolean', dVal: 'undefined' },
                  CharWidth: { type: 'integer', dVal: '10' },
                  PartWidths: { type: 'array' },
                  PartDefaultValues: { type: 'array' },
                  PartInitValues: { type: 'array' },
                  DefaultValuesAsHint: { type: 'boolean' },
                  PartDefs: { type: 'array' },
                  DefaultValuesAsHint: { type: 'boolean', dVal: 'false' }
                }
              },
              Controls: { lvl: 3 },
              Events: {
                properties: {
                  OnGetText: { type: 'function', dVal: 'function(c) { return c.Text; }' },
                  OnSetText: { type: 'function', dVal: 'function(text, c) { return text; }' },
                  OnSetMask: { type: 'function', dVal: 'function(mask, c) { return mask; }' },
                  OnTextChanged: { type: 'function', dVal: 'function(c, o) { }' },
                  OnGetAlt: { type: 'function', dVal: 'function(c) { return c.Alt; }', lvl: 2 },
                  OnValidate: { type: 'function', dVal: 'function(c, part, test, re) { return test; }' },
                  OnCreatePart: { type: 'function', dVal: 'function(c, partInfo, def, parts) { } }' },
                  OnCreateLeftHolder: { type: 'function', dVal: 'function(c, def) { } }' },
                  OnCreateRightHolder: { type: 'function', dVal: 'function(c, def) { } }' }
                }
              }
            }
          };
          break;

      }

      if(typeof di!=='undefined') {
        ng_MergeVar(di, {
          Properties: {
            Type: { dVal: c.DefType }
          }
        });
        ng_MergeVar(di, def.DesignInfo);
        def.DesignInfo = di;
      }

    }
  }

  ngUserControls['maskedit_designinfo'] = MaskEdit_DesignInfo;
}