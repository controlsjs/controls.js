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

  ngUserControls['menu_designinfo'] = {
    OnControlCreated: function(def, c) {
      if(!ngHASDESIGNINFO()) return;

      if (typeof def.DesignInfo==='undefined') def.DesignInfo = {};

      var di;
      switch(c.DefType)
      {
        case 'ngMenu':
          di = {
            ControlCategory: 'Menus',
            AddData: {
              InitProperties: {
                'Data.SelectType': null,
                'Data.Items': { value: "[{Text:'Item 1',OnMenuClick: null},{Text:'Item 2',OnMenuClick: null}]" }
              }
            },
            Properties: {
              Data: {
                properties: {
                  MenuHAlign: { type: 'string', dVal: 'left', readOnly: true,
                    items: ['left', 'right']
                  },
                  MenuHVlign: { type: 'string', dVal: 'top', readOnly: true,
                    items: ['top', 'bottom']
                  },
                  MaxHeight: { type: 'integer', help: 'default value is ScreenHeight-10' },
                  MinWidth: { type: 'integer', dVal: '100' },
                  SubMenuDef: { type: 'object', help: 'default value is same as menu' },
                  SubMenuOverlapX: { type: 'integer', dVal: '5' },
                  SubMenuOverlapY: { type: 'integer', dVal: '0' },
                  ActiveSubMenu: { type: 'object', lvl: 3 },
                  AutoPopup: { type: 'boolean' },
                  PopupX: { type: 'integer', lvl: 2 },
                  PopupY: { type: 'integer', lvl: 2 },
                  PopupElm: { type: 'integer' }
                }
              },
              Events: {
                properties: {
                  OnPopup: { type: 'function', dVal: 'function(c) { return true; }' },
                  OnDrawSeparator: { type: 'function', dVal: 'function(html, it, id, level) { }' },
                  OnHideSubMenu: { type: 'function', dVal: 'function() { return true; }' },
                  OnMenuClick: { type: 'function', dVal: 'function(c, m) { return true; }' },
                  OnClickOutside: { type: 'function', dVal: 'function(c, pi) { return true; }' },
                  OnSubMenuCreated: { type: 'function', dVal: 'function(p, ld, submenu) { }' },
                  OnGetScreenRect: { type: 'function', dVal: 'function(c, rect) { }' }
                }
              }
            }
          };
          break;

        case 'ngMenuBar':
          di = {
            ControlCategory: 'Menus',
            AddData: {
              InitProperties: {
                H: null,
                W: { value: 300 },
                Controls: null,
                Menu: { value: "{ Type: 'ngMenu', Data: { Items: [ { Text: 'Menu 1',OnMenuClick: null, SubMenu: [ { Text: 'SubMenu 1' }, { Text: 'SubMenu 2' } ] }, { Text: 'Menu 2',OnMenuClick: null, SubMenu: [ { Text: 'SubMenu 1' }, { Text: 'SubMenu 2' } ] } ] } }" }
              }
            },
            Properties: {
              Menu: { type: 'array', help: 'References to assigned ngMenu controls.' },
              ButtonDef: { type: 'object' }
            }
          };
          break;

        case 'ngMenuBarButton':
          di = {
            ControlCategory: false,
            Properties: {
              Data: {
                properties: {
                  AutoPopup: { type: 'boolean', dVal: 'false' }
                }
              }
            }
          };
          break;

        case 'ngSplitButton':
          di = {
            ControlCategory: 'Buttons',
            AddData: {
              InitProperties: {
                'Menu': {}
              }
            },
            Properties: {
              Menu: { type: 'object', dVal: "{Type: 'ngMenu',W: 100,Data: {Items:[{Text: 'Menu Item 1'},{Text: 'Menu Item 2'}]}}" },
              Data: {
                properties: {
                  SplitButton: { type: 'boolean' }
                }
              },
              Events: {
                properties: {
                  OnMenuClick: { type: 'function', dVal: 'function(c, m) { return true; }' }
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