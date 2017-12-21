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
ngUserControls['menu_designinfo'] = {
  OnFormEditorInit: function(FE) {
    var undefined;

    function getpropertytext(p) {
      return (p.PropertyType==='string' ? ngVal(p.PropertyValue,'') : '');
    }

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
            // change defaults
            "Items": { Level: 'optional' },
            "Collapsed": { Level: 'optional' },
            "CheckGroup": { Level: 'optional' },
            "OnMenuClick": ng_diEvent('function(e, m, it) { return true; }', { Order: 0.8, Level: 'basic' }),
            "SubMenu": ng_diType('ngMenuItems', { Level: 'basic', Collapsed: false, Order: 0.9 })
          }
        }
      },
      // ngMenuItems
      {
        TypeID: 'ngMenuItems',
        TypeBase: 'ngListItems',
        Name: 'ngMenuItems',
        ShortName: 'items',
        Basic: false,
        Options: {
          Priority: 0.53,
          ChildDesignInfo: ng_diType('ngMenuItem')
        }
      }
    ];
    FormEditor.RegisterPropertyType(menu_types);
  },
  OnControlDesignInfo: function(def, c, ref)
  {
    if((c)&&(!def.CtrlInheritanceDepth)&&(c.DesignInfo)&&(!c.DesignInfo.NonVisual)) {
      var di=c.DesignInfo;
      ng_MergeVar(di, {
        Properties: ng_diProperties({
          "Data": {
            "MenuHAlign": ng_diStringValues('left', ['left','center','right'],{ Level: 'optional' }),
            "MenuVAlign": ng_diStringValues('top', ['top','center','bottom'],{ Level: 'optional' }),
            "MinScreenIndent": ng_diInteger(5,{ Level: 'optional' }),
            "MenuOverlapX": ng_diInteger(0,{ Level: 'optional' }),
            "MenuOverlapY": ng_diInteger(0,{ Level: 'optional' })
          }
        })
      });
      if(!c.CtrlInheritsFrom('ngMenu')) {
        var hasonclick=((di.Properties)&&(di.Properties.Events)
                      &&(di.Properties.Events.Types)&&(di.Properties.Events.Types.object)
                      &&(di.Properties.Events.Types.object.ObjectProperties)
                      &&(di.Properties.Events.Types.object.ObjectProperties.OnClick));

        ng_MergeVar(di, {
          Properties: {
            "Menu": ng_diControl('ngMenu', {
              "Type": { Required: true }
            }, { Level: hasonclick ? 'basic' : 'optional', PropertyGroup: 'Controls' }, { InheritedFrom: 'ngMenu' }),

            "PopupMenu": ng_diControl('ngMenu', {
              "Type": { Required: true }
            }, { Level: 'basic', PropertyGroup: 'Controls' }, { InheritedFrom: 'ngMenu' })
          }
        });
      }
    }
  },
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    var undefined;
    ngRegisterControlDesignInfo('ngMenu',function(d,c,ref) {
      return {
        ControlCategory: 'Menu',
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
        Properties: ng_diProperties({
          "Data": {
            "Items": ng_diReplaceType(['ngListItems','ngListStringItems'],'ngMenuItems'),
            "MenuHAlign": ng_diStringValues('left', ['left','center','right'],{ Level: 'basic' }),
            "MenuVAlign": ng_diStringValues('top', ['top','center','bottom'],{ Level: 'basic' }),
            "MaxHeight": ng_diMixed(['undefined','integer'], { InitType: 'integer', Level: 'basic' }),
            "MinWidth": ng_diInteger(100,{ Level: 'basic' }),
            "MinScreenIndent": ng_diInteger(5,{ Level: 'basic' }),
            "SubMenuImg": ng_diType('image', { Level: 'advanced' }),
            "SubMenuDef": ng_diControl('ngMenu', {
              "AutoDef": ng_diBoolean(false,{ Level: 'optional' })
            }, { Level: 'advanced' }, { InheritedFrom: 'ngMenu' }),
            "SubMenuOverlapX": ng_diInteger(5,{ Level: 'advanced' }),
            "SubMenuOverlapY": ng_diInteger(0,{ Level: 'advanced' }),
            "AutoPopup": ng_diMixed([
              ng_diUndefined(),
              ng_diBoolean(true)
            ],{ InitType: 'boolean', Level: 'advanced' }),
            "ActiveSubMenu": ng_diObject(undefined, { Level: 'hidden' }),
            "PopupX": ng_diInteger(undefined, { Level: 'hidden' }),
            "PopupY": ng_diInteger(undefined, { Level: 'hidden' }),
            "PopupElm": ng_diObject(undefined, { Level: 'hidden' }),

            // change defaults
            "Visible": ng_diBoolean(false),
            "PopupGroup": ng_diString('menu', { Level: 'optional' }),
            "ShowCheckboxes": ng_diBoolean(true, { Level: 'advanced' }),
            "ShowHeader": ng_diBoolean(false, { Level: 'advanced' }),
            "Columns": { Level: 'advanced' },
            "SelectType": { Level: 'advanced' },
            "SortCaseSensitive": { Level: 'advanced' },
            "SortColumn": { Level: 'advanced' },
            "SortDir": { Level: 'advanced' }
          },
          "Events": {
            "OnPopup": ng_diEvent('function(c) { return true; }', { Level: 'basic' }),
            //"OnPopupMenu": ng_diEvent('function(c) { return true; }', { Level: 'basic' }),
            "OnDrawSeparator": ng_diEvent('function(html, it, id, level, c) {}', { Level: 'basic' }),
            "OnHideSubMenu": ng_diEvent('function(c) { return true; }', { Level: 'basic' }),
            "OnMenuClick": ng_diEvent('function(e, c, it) { return true; }', { Level: 'basic' }),
            "OnClickOutside": { Level: 'basic' },
            "OnSubMenuCreated": ng_diEvent('function(c, def, m) {}', { Level: 'basic' }),
            "OnGetScreenRect": ng_diEvent('function(c, rect) {}', { Level: 'basic' })
          }
        })
      }
    });

    ngRegisterControlDesignInfo('ngMenuBar',function(d,c,ref) {
      return {
        ControlCategory: 'Menu',
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
        Properties: ng_diProperties({
          "Menu": { Level: 'basic' },
          "Button": ng_diControl('ngMenuBarButton', {
            "Type": { Required: true }
          }, { Level: 'basic' }, { InheritedFrom: 'ngMenuBarButton' }),
          "Data": {
            "SubMenuDef": ng_diControl('ngMenu', {
              "AutoDef": ng_diBoolean(false,{ Level: 'optional' })
            }, { Level: 'advanced' }, { InheritedFrom: 'ngMenu' })
          },
          "Events": {
            "OnItemsChanged": ng_diEvent('function(c, items) {}', { Level: 'basic' })
          }
        })
      }
    });

    ngRegisterControlDesignInfo('ngMenuBarButton',function(d,c,ref) {
      return {
        ControlCategory: false,
        Properties: ng_diProperties({
          "Data": {
            "AutoPopup": ng_diBoolean(false, { Level: 'basic' })
          }
        })
      }
    });

    ngRegisterControlDesignInfo('ngSplitButton',function(d,c,ref) {
      return {
        ControlCategory: 'Button',
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