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

  ngUserControls['window_designinfo'] = {
    OnControlCreated: function(def, c) {
      if(!ngHASDESIGNINFO()) return;

      if (typeof def.DesignInfo==='undefined') def.DesignInfo = {};

      var di;
      switch(c.DefType)
      {

        case 'ngWindow':
          di = {
            IsContainer: true,
            ControlCategory: 'Containers',
            AddData: {
              InitProperties: {
                W: { value: '320' }, H: { value: '240'}, Controls: {}
              }
            },
            Properties: {
              CW: { type: ['integer','string'], cType: 'feBoundsEditNum', dVal: '320', lvl: 2 },
              CH: { type: ['integer','string'], cType: 'feBoundsEditNum', dVal: '240', lvl: 2 },
              ParentReferences: { dVal: 'false', lvl: 2 },
              ControlsPanel: { type: 'object', lvl: 2 },
              Data: {
                properties: {
                  Text: { type: 'string' },
                  HTMLEncode: { type: 'boolean', dVal: 'false', lvl: 3 },
                  BackgroundColor: { type: 'string' },
                  Sizeable: { type: 'boolean' },
                  Moveable: { type: 'boolean' },
                  Modal: { type: 'boolean', dVal: 'false' },
                  DisposeOnClose: { type: 'boolean', dVal: 'false' },
                  AutoSize: { type: 'boolean' },
                  Centered: { type: 'boolean', dVal: 'false' },
                  Modal: { type: 'boolean', dVal: 'false' },
                  MinimizedBounds: { type: 'object' },
                  MinWidth: { type: 'integer', dVal: '100' },
                  MinHeight: { type: 'integer', dVal: '50' },
                  MaxWidth: { type: 'integer', dVal: '0' },
                  MaxHeight: { type: 'integer', dVal: '0' },
                  Buttons: { type: 'object' },
                  Img: { type: 'object' },
                  Frame: { type: 'object', dVal: '{}' },
                  CaptionImg: { type: 'object', dVal: '{}' }
                }
              },
              Controls: { lvl: 1 },
              Events: {
                properties: {
                  OnClick: { type: 'function', dVal: 'function(e) { }' },
                  OnDblClick: { type: 'function', dVal: 'function(e) { }' },
                  OnMinimize: { type: 'function', dVal: 'function(c) { return true; }' },
                  OnMaximize: { type: 'function', dVal: 'function(c) { return true; }' },
                  OnRestore: { type: 'function', dVal: 'function(c) { return true; }' },
                  OnClose: { type: 'function', dVal: 'function(c) { return true; }' },
                  OnMouseMoving: { type: 'function', dVal: 'function(c, pos) { }' },
                  OnMouseMove: { type: 'function', dVal: 'function(c) { }' },
                  OnMouseResizing: { type: 'function', dVal: 'function(c, rect) { }' },
                  OnMouseResize: { type: 'function', dVal: 'function(c) { }' }
                }
              }
            }
          };
          break;

        case 'ngHint':
          di = {
            IsContainer: true,
            ControlCategory: 'Containers',
            AddData: {
              InitProperties: {
                W: {}, H: {}, Controls: {},
                Data: {}
              }
            },
            Properties: {
              CW: { type: ['integer','string'], cType: 'feBoundsEditNum', dVal: '150', lvl: 2 },
              CH: { type: ['integer','string'], cType: 'feBoundsEditNum', dVal: '100', lvl: 2 },
              ControlsPanel: { type: 'object', lvl: 2 },
              Data: {
                properties: {
                  AutoSize: { type: 'boolean' },
                  MinWidth: { type: 'integer', dVal: '0' },
                  MinHeight: { type: 'integer', dVal: '0' },
                  MaxWidth: { type: 'integer', dVal: '0' },
                  MaxHeight: { type: 'integer', dVal: '0' },
                  Anchor: { type: 'string', dVal: 'auto' },
                  Anchors: { type: 'object' },
                  PreferredAnchors: { type: 'array', dVal: 'null' },
                  Frame: { type: 'object', dVal: '{}', lvl: 3 },
                  ControlsInside: { type: 'boolean', lvl: 2 },
                  AutoHideTimeout: { type: 'integer', dVal: '0', lvl: 2 },
                  DisposeOnHide: { type: 'boolean', dVal: 'false', lvl: 2 },
                  PopupX: { type: 'integer', lvl: 3, help: 'internal variable' },
                  PopupY: { type: 'integer', lvl: 3, help: 'internal variable' },
                  PopupElm: { type: 'integer', lvl: 3, help: 'internal variable' }
                }
              },
              Controls: { lvl: 1 },
              Events: {
                properties: {
                  OnCheckPlacement: { type: 'function', dVal: 'function(c, p) { }' },
                  OnPopup: { type: 'function', dVal: 'function(c, info) { return true; }' }
                }
              }
            }
          };
          break;

        case 'ngTextHint':
          di = {
            ControlCategory: 'Labels',
            Properties: {
              ParentReferences: { dVal: 'false', lvl: 2 },
              Data: {
                properties: {
                  Text: { type: 'string' }
                }
              },
              Controls: { lvl: 3,
                properties: {
                  Hint: { type: 'ngControl', lvl: 3 }
                }
              },
              Events: {
                properties: {
                  OnClick: { type: 'function', dVal: 'function(e) { }' }
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