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

  ngUserControls['panels_designinfo'] = {
    OnControlCreated: function(def, c) {
      if(!ngHASDESIGNINFO()) return;

      if (typeof def.DesignInfo==='undefined') def.DesignInfo = {};

      var di;
      switch(c.DefType)
      {

        case 'ngAlignPanel':
        case 'ngAlignFrame':
          di = {
            BasicComponent: c.DefType,
            ControlCategory: 'Containers',
            ChildControlsDesignInfo: {
              Properties: {
                Data: {
                  properties: {
                    ControlAlign: { type: 'integer', dVal: 'alNone', readOnly: true,
                      items: ['alNone','alClient','alLeft','alRight','alTop','alBottom']
                    },
                    AlignAutoUpdate: { type: 'boolean' }
                  }
                }
              }
            },
            Properties: {
              Data: {
                properties: {
                  AutoSize: { type: 'boolean', dVal: 'false' }
                }
              }
            }
          };
          break;

        case 'ngSplitPanel':
          di = {
            IsContainer: true,
            ControlCategory: 'Containers',
            AddData: {
              InitProperties: {
                W: {}, H: {},
                Data: {},
                'Data.PanelAlign': {},
                'Data.Size': { value: 50 },
                Controls1: {}, Controls2: {}
              },
              ControlsGroup: function(selected_idx, clicked_idx) {
                var ref = FormEditor.GetControlRefByIdx(clicked_idx);
                if (!ref) return '';

                var id = ngVal(ref.ID, '');
                var part = id.substring(id.lastIndexOf('_') + 1);
                switch (part) {
                  case 'P1': return 'Controls1';
                  case 'P2': return 'Controls2';
                  default: return '';
                }
              },
              ControlsGroupNames: ['Controls1','Controls2']
            },
            Properties: {
              Data: {
                properties: {
                  PanelAlign: { type: 'string', dVal: 'left', readOnly: true,
                    items: ['left','right','top','bottom']
                  },
                  ResizeMode: { type: 'integer', dVal: 'ngspResizeSize', readOnly: true,
                    items: ['ngspResizeNone','ngspResizeSize','ngspResizeMinSize','ngspResizeMaxSize','ngspResizeAutoMinimize','ngspResizeAutoMaximize']
                  },
                  Size: { type: 'integer', dVal: '200' },
                  MinSize: { type: 'integer', dVal: '0' },
                  MaxSize: { type: 'integer', dVal: '0' },
                  AutoMinimize: { type: 'integer', dVal: '0' },
                  AutoMaximize: { type: 'integer', dVal: '0' },
                  HandleVisible: { type: 'boolean' },
                  MoverStartImg: { type: 'object', lvl: 3 },
                  MoverMiddleImg: { type: 'object', lvl: 3 },
                  MoverEndImg: { type: 'object', lvl: 3 },
                  HandleImg: { type: 'object', lvl: 3 }
                }
              },
              Controls: { lvl: 3 },
              ControlsPanel1: { type: 'object', lvl: 2 },
              ControlsPanel2: { type: 'object', lvl: 2 },
              Controls1: { type: 'group' },
              Controls2: { type: 'group' },
              Events: {
                properties: {
                  OnGetImg: { type: 'function', dVal: 'function(c, idx) { return null; }', lvl: 3,
                    help: 'idx values: <br><br>0 for c.MoverStartImg,<br>1 for c.MoverMiddleImg,<br>2 for c.MoverEndImg,<br>3 for c.HandleImg.<br>Return value is an image.'
                  },
                  OnResize: { type: 'function', dVal: 'function(c) { return true; }' },
                  OnHandleClick: { type: 'function', dVal: 'function(c) { return true; }' },
                  OnSizeChanging: { type: 'function', dVal: 'function(c, cursize) { return true; }' },
                  OnSizeChanged: { type: 'function', dVal: 'function(c) { }' },
                  OnMinimize: { type: 'function', dVal: 'function(c) { return true; }' },
                  OnMaximize: { type: 'function', dVal: 'function(c) { return true; }' },
                  OnRestore: { type: 'function', dVal: 'function(c) { return true; }' },
                  OnHandleEnter: { type: 'function', dVal: 'function(c) {}' },
                  OnHandleLeave: { type: 'function', dVal: 'function(c) {}' }
                }
              }
            }
          };
          break;

        case 'ngDropPanel':
          di = {
            IsContainer: true,
            ControlCategory: 'Containers',
            AddData: {
              InitProperties: {
                CW: {}, CH: {}, DroppedDown: { value: 'true' }, Controls: {}
              }
            },
            Properties: {
              DroppedDown: { type: 'boolean', dVal: 'false' },
              CW: { type: ['integer','string'], cType: 'feBoundsEditNum', dVal: '150' },
              CH: { type: ['integer','string'], cType: 'feBoundsEditNum', dVal: '100' },
              Data: {
                properties: {
                  Button: { type: 'object', lvl: 3 }
                }
              },
              ControlsPanel: { type: 'object', lvl: 2 },
              Controls: { lvl: 1 },
              Events: {
                properties: {
                  OnDropDown: { type: 'function', dVal: 'function(c, dd) { return true; }' }
                }
              }
            },
            Menu: {
              Text: 'DropPanel',
              Items: function(c, menu, data, idx) {
                var items = [
                  { Text: 'Toggle Dropdown', Checked: c.IsDroppedDown(), OnMenuClick: function(e, li, it) {
                    li.CheckItem(it, !it.Checked);
                    FormEditor.SetObjectProperties([{ name: 'DroppedDown', value: it.Checked, appControlIdx: idx }]);
                    return false;
                  }}
                ];
                return items;
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