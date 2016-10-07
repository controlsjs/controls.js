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
ngUserControls['menu_designinfo'] = {
  OnFormEditorInit: function(FE) {
    var menu_types = [
      // ngMenuItem
      {
        TypeID: 'ngMenuItem',
        TypeBase: 'ngListItem',
        Name: 'ngMenuItem',
        ShortName: 'item',
        Basic: false,
        Options: {
          ObjectProperties: {
            "SubMenu": { DefaultType: 'ngMenuItems', Level: 'basic', Collapsed: true },
            "OnMenuClick": ng_DIPropertyEvent('function(e, m, it) { return true; }', { Order: 0.9, Level: 'basic' }),
            // change defaults
            "Items": { Level: 'optional' },
            "Collapsed": { Level: 'optional' },
            "CheckGroup": { Level: 'optional' }
          }
        }
      },
      // ngMenuItems
      {
        TypeID: 'ngMenuItems',
        TypeBase: 'array',
        Name: 'ngMenuItems',
        ShortName: 'items',
        Basic: false,
        Options: {
          Priority: 0.53,
          ChildDesignInfo: {
            DefaultType: 'ngMenuItem', Level: 'basic'
          }
        }
      }
    ];
    FormEditor.RegisterPropertyType(menu_types);
  },
  OnControlDesignInfo: function(def, c, ref)
  {
    if((c)&&(!def.CtrlInheritanceDepth)&&(c.DesignInfo)&&(!c.DesignInfo.NonVisual)&&(!c.CtrlInheritsFrom('ngMenu'))) {
      var di=c.DesignInfo;
      var hasonclick=((di.Properties)&&(di.Properties.Events)
                    &&(di.Properties.Events.Types)&&(di.Properties.Events.Types.object)
                    &&(di.Properties.Events.Types.object.ObjectProperties)
                    &&(di.Properties.Events.Types.object.ObjectProperties.OnClick));

      ng_MergeVar(di, {
        Properties: {
          "Menu": {
            Level: hasonclick ? 'basic' : 'optional',
            PropertyGroup: 'Controls',
            DefaultType: 'control',
            Types: {
              'control': {
                Type: 'ngMenu',
                InheritedFrom: 'ngMenu',
                ObjectProperties: {
                  "Type": { Required: true }
                }
              }
            }
          },
          "PopupMenu": {
            Level: 'basic',
            PropertyGroup: 'Controls',
            DefaultType: 'control',
            Types: {
              'control': {
                Type: 'ngMenu',
                InheritedFrom: 'ngMenu',
                ObjectProperties: {
                  "Type": { Required: true }
                }
              }
            }
          }
        }
      });
    }
  },
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    var undefined;
    ngRegisterControlDesignInfo('ngMenu',function(d,c,ref) {
      return {
        ControlCategory: 'Menus',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 150 },
              "Data": {
                ObjectProperties: {
                  "Items": { Type: 'ngMenuItems',
                    ObjectProperties: {
                      0: {
                        Type: 'ngListItem',
                        Value: {
                          Text: "'Item 1'"
                        }
                      }
                    }
                  },
                  "Visible": { Value: true }
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "Data": {
            "Items": { DefaultType: 'ngMenuItems', Level: 'basic',
              Types: {
                'ngMenuItems': {},
                'ngListItems': { Level: 'hidden' },
                'ngListStringItems': { Level: 'hidden' }
              }
            },
            "MenuHAlign": ng_DIPropertyStrings('left', ['left','center','right'],{ Level: 'basic' }),
            "MenuVAlign": ng_DIPropertyStrings('top', ['top','center','bottom'],{ Level: 'basic' }),
            "MaxHeight": ng_DIProperty(['undefined','integer'],undefined,{ InitType: 'integer', Level: 'basic' }),
            "MinWidth": ng_DIProperty('integer',100,{ Level: 'basic' }),
            "MinScreenIndent": ng_DIProperty('integer',5,{ Level: 'basic' }),
            "SubMenuDef": { DefaultType: 'control', 
              Types: {
                'control': {
                  Type: 'ngMenu',
                  InheritedFrom: 'ngMenu',
                  ObjectProperties: {
                    "AutoDef": ng_DIPropertyBool(false,{ Level: 'basic' })
                  }
                }
              }
            },
            "SubMenuOverlapX": ng_DIProperty('integer',5,{ Level: 'basic' }),
            "SubMenuOverlapY": ng_DIProperty('integer',0,{ Level: 'basic' }),
            "AutoPopup": ng_DIProperty(['undefined','boolean'],[undefined,true],{ InitType: 'boolean', Level: 'advanced' }),

            "ActiveSubMenu": { DefaultType: 'object', Level: 'hidden' },
            "PopupX": { DefaultType: 'integer', Level: 'hidden' },
            "PopupY": { DefaultType: 'integer', Level: 'hidden' },
            "PopupElm": { DefaultType: 'object', Level: 'hidden' },

            // change defaults
            "Visible": ng_DIPropertyBool(false),
            "PopupGroup": ng_DIProperty('string','menu', { Level: 'optional' }),
            "ShowCheckboxes": ng_DIPropertyBool(true, { Level: 'advanced' }),
            "ShowHeader": ng_DIPropertyBool(false, { Level: 'advanced' }),
            "Columns": { Level: 'advanced' },
            "SelectType": { Level: 'advanced' },
            "SortCaseSensitive": { Level: 'advanced' },
            "SortColumn": { Level: 'advanced' },
            "SortDir": { Level: 'advanced' }
          },
          "Events": {
            "OnPopup": ng_DIPropertyEvent('function(c) { return true; }', { Level: 'basic' }),
            //"OnPopupMenu": ng_DIPropertyEvent('function(c) { return true; }', { Level: 'basic' }),
            "OnDrawSeparator": ng_DIPropertyEvent('function(html, it, id, level, c) {}', { Level: 'basic' }),
            "OnHideSubMenu": ng_DIPropertyEvent('function(c) { return true; }', { Level: 'basic' }),
            "OnMenuClick": ng_DIPropertyEvent('function(e, c, it) { return true; }', { Level: 'basic' }),
            "OnClickOutside": { Level: 'basic' },
            "OnSubMenuCreated": ng_DIPropertyEvent('function(c, def, m) {}', { Level: 'basic' }),
            "OnGetScreenRect": ng_DIPropertyEvent('function(c, rect) {}', { Level: 'basic' })
          }
        })
      }
    });

    ngRegisterControlDesignInfo('ngMenuBar',function(d,c,ref) {
      return {
        ControlCategory: 'Menus',
        IsContainer: false,
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 150 },
              "H": { Value: 30 },
              "Menu": {
                Type: 'object',
                ObjectProperties: {
                  "Type": { Type: 'string', Value: 'ngMenu' }
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "Menu": { Level: 'basic' },
          "Button": {
            Level: 'basic',
            DefaultType: 'control',
            Types: {
              'control': {
                Type: 'ngMenuBarButton',
                InheritedFrom: 'ngMenuBarButton',
                ObjectProperties: {
                  "Type": { Required: true }
                }
              }
            }
          }
        })
      }
    });

    ngRegisterControlDesignInfo('ngMenuBarButton',function(d,c,ref) {
      return {
        ControlCategory: false,
        Properties: ng_DIProperties({
          "Data": {
            "AutoPopup": ng_DIPropertyBool(false, { Level: 'basic' })
          }
        })
      }
    });

    ngRegisterControlDesignInfo('ngSplitButton',function(d,c,ref) {
      return {
        ControlCategory: 'Buttons',
        NewControl: {
          Default: {
            Properties: {
              "Data": {
                ObjectProperties: {
                  "Text": { ValueByRefName: true },
                  "HTMLEncode": { Value: true }
                }
              },
              "Menu": {
                ObjectProperties: {
                  "Type": { Type: 'string', Value: 'ngMenu' }
                }
              }
            }
          }
        }
      }
    });
  }
};