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

  ngUserControls['ngColorControls_designinfo'] = {
    OnControlCreated: function(def, c) {
      if(!ngHASDESIGNINFO()) return;

      if (typeof def.DesignInfo==='undefined') def.DesignInfo = {};

      var di;
      switch(c.DefType)
      {

        case 'ngColorPicker':
          di = {
            ControlCategory: 'Misc',
            Properties: {
              Data: {
                properties: {
                  Color: { type: ['object','string'], dVal: '{H:0,S:0,V:0,R:0,G:0,B:0,A:1,HEX:"#000000",AHEX:"#ff000000"}' },
                  AutoHeight: { type: 'boolean', dVal: 'false' },
                  AsToolbar: { type: 'boolean', dVal: 'false' },
                  EditsUpdate_timeout: { type: 'integer', dVal: '1000' }
                }
              },
              Events: {
                properties: {
                  OnColorChanging: { type: 'function', dVal: 'function(color) { return true; }' },
                  OnColorChanged: { type: 'function', dVal: 'function(color) {}' }
                }
              }
            }
          };
          break;

        case 'ngColorPickerBox':
          di = {
            ControlCategory: 'Misc',
            Properties: {
              Layout: { type: 'integer', dVal: 'ngCopLayout_Default' }
            }
          };
          break;

        case 'ngColorButton':
          di = {
            ControlCategory: 'Buttons',
            AddData: {
              InitProperties: {
                'Data.Text': merge_undefined
              }
            },
            Properties: {
              Data: {
                properties: {
                  Color: { type: ['object','string'], dVal: 'null' },
                  BackgroundImg: { type: 'object', dVal: 'null' },
                  AllowAlpha: { type: 'boolean', dVal: 'true' },

                  Alt: null, ngAlt: null,
                  Text: null, ngText: null
                }
              },
              Events: {
                properties: {
                  OnColorChanging: { type: 'function', dVal: 'function(color) { return true; }' },
                  OnColorChanged: { type: 'function', dVal: 'function(color) {}' }
                }
              }
            }
          };
          break;
        case 'ngColorPickerDropDown':
          di = {
            ControlCategory: 'Edits',
            Properties: {
              Data: {
                properties: {
                  Color: { type: ['object','string'], dVal: '{H:0,S:0,V:0,R:0,G:0,B:0,A:1,HEX:"#000000",AHEX:"#ff000000"}' },
                  AllowAlpha: { type: 'boolean', dVal: 'true' }
                }
              },
              Events: {
                properties: {
                  OnColorChanging: { type: 'function', dVal: 'function(color) { return true; }' },
                  OnColorChanged: { type: 'function', dVal: 'function(color) {}' }
                }
              }
            }
          };
          break;

        case 'ngColorPickerHint':
          di = {
            ControlCategory: 'Containers'
          };
          break;

        case 'ngColorPickerButton':
          di = {
            ControlCategory: 'Buttons',
            Properties: {
              Data: {
                properties: {
                  PickerLayout: { type: 'integer', dVal: 'null' },
                  HintDef: { type: 'object', dVal: '{...}' }
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
}