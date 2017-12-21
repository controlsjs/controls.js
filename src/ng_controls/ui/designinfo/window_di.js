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
ngUserControls['window_designinfo'] = {
  OnFormEditorInit: function(FE) {
    var win_types = [
      // ngHintAnchor
      {
        TypeID: 'ngHintAnchor',
        TypeBase: 'object',
        Name: 'ngHintAnchor',
        ShortName: 'an',
        Basic: false,
        Options: {
          Add: false,
          ObjectProperties: {
            "L": ng_diInteger(0, { DisplayName: 'Left (L)', Level: 'basic', Order: 0.11 }),
            "T": ng_diInteger(0, { DisplayName: 'Top (T)', Level: 'basic', Order: 0.12 }),
            "R": ng_diInteger(0, { DisplayName: 'Right (R)', Level: 'basic', Order: 0.13 }),
            "B": ng_diInteger(0, { DisplayName: 'Bottom (B)', Level: 'basic', Order: 0.14 }),
            "HX": ng_diInteger(0, { DisplayName: 'Hotspot X (HX)', Level: 'basic', Order: 0.15 }),
            "HY": ng_diInteger(0, { DisplayName: 'Hotspot Y (HY)', Level: 'basic', Order: 0.16 }),
            "Img": ng_diType('image', { Level: 'basic', Order: 0.17 })
          }
        }
      }
    ];
    FormEditor.RegisterPropertyType(win_types);
  },
  OnControlDesignInfo: function(def, c, ref)
  {
    if((c)&&(!def.CtrlInheritanceDepth)&&(c.DesignInfo)&&(!c.DesignInfo.NonVisual)) {
      ng_MergeVar(c.DesignInfo, {
        Properties: ng_diProperties({
          "Data": {
            "HintX": ng_diInteger(0, { Level: 'optional' }),
            "HintY": ng_diInteger(0, { Level: 'optional' })
          }
        })
      });
    }
  },
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    function editor_anchors() {
      var a, i, j, k, citems, items=[];
      var anchors = FormEditor.GetSelectedControlsProperty('Data.Anchors');
      for(i=0;i<anchors.length;i++) {
        citems=[];
        a=anchors[i].PropertyDesignInfo.Types && anchors[i].PropertyDesignInfo.Types['object'] ? anchors[i].PropertyDesignInfo.Types['object'].ObjectProperties : false;
        if(ng_IsObjVar(a)) {
          for(j in a) citems.push(j);
        }
        if(!i) items=citems;
        else {
          for(k=citems.length-1;k>=0;k--) {
            for(j=0;j<items.length;j++)
              if(items[j]===citems[k]) break;
            if(j>=items.length) citems.splice(k,1);
          }
          for(k=items.length-1;k>=0;k--) {
            for(j=0;j<citems.length;j++)
              if(items[j]===citems[k]) break;
            if(j>=citems.length) items.splice(k,1);
          }
        }
      }
      return items;
    }

    ngRegisterControlDesignInfo('ngWindow',function(d,c,ref) {
      return {
        ControlCategory: 'Window',
        IsContainer: true,

        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 300 },
              "H": { Value: 200 },
              "Data": {
                ObjectProperties: {
                  "Text": { ValueByRefName: true },
                  "HTMLEncode": { Value: true }
                }
              }
            }
          }
        },
        Properties: ng_diProperties({
          "ParentReferences": ng_diBoolean(false, { Level: 'optional' }),
          "W": { Exclude: ['CW'] },
          "H": { Exclude: ['CH'] },
          "CW": ng_diInteger(0, { Order: 0.141, Exclude: ['W'], Level: 'advanced' }),
          "CH": ng_diInteger(0, { Order: 0.142, Exclude: ['H'], Level: 'advanced' }),
          "R": null,
          "B": null,
          "ControlsPanel": ng_diControl('ngPanel', undefined, { IsContainer: false, Level: 'advanced' }),
          "style": {
            "zIndex": { Level: 'hidden' }
          },
          "Buttons": ng_diArrayOfControls(
            ng_diControl(undefined, ng_diProperties({
              "Data": {
                "ButtonAlign": ng_diStringValues('right', ['left','right'], { Level: 'basic', Order: 0.8 })
              }
            }), { Level: 'basic', PropertyGroup: 'Controls' }, { InheritedFrom: 'ngButton' }),
            { Level: 'basic', Collapsed: false, PropertyGroup: 'Controls' }, { DestroyIfEmpty: true }),
          "Data": {
            "ChildHandling": { Level: 'advanced' },
            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'basic' },
            "Text": ng_diStringRefName({ Level: 'basic' }),
            "HTMLEncode": ng_diBoolean(ngVal(ngDefaultHTMLEncoding,false), { Level: 'basic' }),
            "BackgroundColor": ng_diType('css_colors', { Level: 'basic' }),
            "Sizeable": ng_diBoolean(true, { Level: 'basic' }),
            "Moveable": ng_diBoolean(true, { Level: 'basic' }),
            "Modal": ng_diBoolean(false, { Level: 'basic' }),
            "DisposeOnClose": ng_diBoolean(false, { Level: 'basic' }),
            "AutoSize": ng_diBoolean(true, { Level: 'advanced' }),
            "Centered": ng_diBoolean(false, { Level: 'basic' }),
            "MinimizedBounds": ng_diMixed([
              ng_diUndefined(),
              ng_diObject({
                "L": ng_diType('bounds', { DisplayName: 'Left (L)', Level: 'basic', Order: 0.11 }),
                "T": ng_diType('bounds', { DisplayName: 'Top (T)', Level: 'basic', Order: 0.12 }),
                "W": ng_diType('bounds', { DisplayName: 'Width (W)', Level: 'basic', Order: 0.13 }),
                "H": ng_diType('bounds', { DisplayName: 'Height (H)', Level: 'basic', Order: 0.14 }),
                "R": ng_diType('bounds', { DisplayName: 'Right (R)', Level: 'basic', Order: 0.15 }),
                "B": ng_diType('bounds', { DisplayName: 'Bottom (B)', Level: 'basic', Order: 0.16 })
              })
            ], { InitType: 'object', Level: 'optional' }),
            "MinWidth": ng_diInteger(100, { Level: 'basic' }),
            "MinHeight": ng_diInteger(50, { Level: 'basic' }),
            "MaxWidth": ng_diInteger(0, { Level: 'basic' }),
            "MaxHeight": ng_diInteger(0, { Level: 'basic' }),
            "Buttons": ng_diObject(undefined, { Level: 'hidden' }),
            "Img": ng_diType('image', { Level: 'basic' }),
            "Frame": ng_diType('img_frame', { Level: 'advanced' } ),
            "CaptionImg": ng_diObject({
              "LeftImg": ng_diType('image', { Level: 'advanced' }),
              "MiddleImg": ng_diType('image', { Level: 'advanced' }, {
                EditorOptions: {
                  HorizontalImages: true
                }
              }),
              "RightImg": ng_diType('image', { Level: 'advanced' })
            }, { Level: 'advanced' }, { Add: false })
          },
          "Events": {
            "OnClick": ng_diEvent('function(e) {}', { Level: 'basic' }),
            "OnDblClick": ng_diEvent('function(e) {}', { Level: 'basic' }),
            "OnMinimize": ng_diEvent('function(c) { return true; }', { Level: 'basic' }),
            "OnMaximize": ng_diEvent('function(c) { return true; }', { Level: 'basic' }),
            "OnRestore": ng_diEvent('function(c) { return true; }', { Level: 'basic' }),
            "OnClose": ng_diEvent('function(c) { return true; }', { Level: 'basic' }),
            "OnMouseMoving": ng_diEvent('function(c, pos) {}', { Level: 'basic' }),
            "OnMouseMove": ng_diEvent('function(c) {}', { Level: 'basic' }),
            "OnMouseResizing": ng_diEvent('function(c, rect) {}', { Level: 'basic' }),
            "OnMouseResize": ng_diEvent('function(c) {}', { Level: 'basic' })
          },
          "OverrideEvents": {
            "OnGetText": ng_diEvent('function(c) { return ""; }',{ Level: 'basic' }),
            "OnGetImg": ng_diEvent('function(c) { return null; }', { Level: 'basic' })
          }
        }, {
          "Controls": { Level: 'basic' },
          "ModifyControls": { Level: 'basic' }
        })
      };
    });

    ngRegisterControlDesignInfo('ngHint',function(d,c,ref) {
      return {
        ControlCategory: 'Hint',
        IsContainer: true,

        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 50 },
              "Data": {
                ObjectProperties: {
                  "Visible": { Value: true }
                }
              }
            }
          }
        },
        Properties: ng_diProperties({
          "ParentReferences": ng_diBoolean(true),
          "W": { Exclude: ['CW'] },
          "H": { Exclude: ['CH'] },
          "CW": ng_diInteger(0, { Order: 0.141, Exclude: ['W'], Level: 'advanced' }),
          "CH": ng_diInteger(0, { Order: 0.142, Exclude: ['H'], Level: 'advanced' }),
          "ControlsPanel": ng_diControl('ngPanel', undefined, { IsContainer: false, Level: 'advanced' }),
          "Data": {
            "ChildHandling": { Level: 'advanced' },
            "AutoSize": ng_diBoolean(true, { Level: 'advanced' }),
            "MinWidth": ng_diInteger(0, { Level: 'basic' }),
            "MinHeight": ng_diInteger(0, { Level: 'basic' }),
            "MaxWidth": ng_diInteger(0, { Level: 'basic' }),
            "MaxHeight": ng_diInteger(0, { Level: 'basic' }),
            "Anchor": ng_diString('auto', { Level: 'basic' }, {
              Editor: 'ngfeEditor_DropDown',
              EditorOptions: {
                Items: function(api) {
                  var items=editor_anchors();
                  items.splice(0,0,'auto');
                  return items;
                }
              }
            }),
            "Anchors": ng_diMixed([
              ng_diNull(),
              ng_diObject(undefined, undefined, {
                ChildDesignInfo: ng_diType('ngHintAnchor', { Level: 'basic' })
              })
            ], { InitType: 'object', Level: 'basic' }),
            "PreferredAnchors": ng_diType('array_strings', { Level: 'basic' }, {
              ChildDesignInfo: {
                Types: {
                  'string': {
                    Editor: 'ngfeEditor_DropDown',
                    EditorOptions: {
                      Items: function(api) {
                        return editor_anchors();
                      }
                    }
                  }
                }
              }
            }),
            "Frame": ng_diType('img_frame', { Level: 'advanced' }),
            "ControlsInside": ng_diBoolean(true, { Level: 'basic' }),
            "AutoHideTimeout": ng_diInteger(0, { Level: 'basic' }),
            "DisposeOnHide": ng_diBoolean(false, { Level: 'basic' }),
            "PopupX": ng_diInteger(undefined, { Level: 'hidden' }),
            "PopupY": ng_diInteger(undefined, { Level: 'hidden' })
          },
          "Events": {
            "OnCheckPlacement": ng_diEvent('function(c, p) {}', { Level: 'basic' }),
            "OnPopup": ng_diEvent('function(c, info) { return true; }', { Level: 'basic' })
          }
        }, {
          "Controls": { Level: 'basic' },
          "ModifyControls": { Level: 'basic' }
        })
      };
    });

    ngRegisterControlDesignInfo('ngTextHint',function(d,c,ref) {
      return {
        ControlCategory: 'Hint',
        IsContainer: false,
        NewControl: {
          Default: {
            Properties: {
              "Data": {
                ObjectProperties: {
                  "Text": { ValueByRefName: true },
                  "Visible": { Value: true }
                }
              }
            }
          }
        },
        Properties: ng_diProperties({
          "ParentReferences": ng_diBoolean(false, { Level: 'optional' }),
          "Data": {
            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'basic' },
            "Text": ng_diStringRefName({ Level: 'basic' })
          },
          "Events": {
            "OnClick": ng_diEvent('function(e) {}', { Level: 'advanced' })
          },
          "OverrideEvents": {
            "OnSetText": ng_diEvent('function(text, c) { return text; }', { Level: 'advanced' }),
            "OnGetText": ng_diEvent('function(c) { return ""; }',{ Level: 'basic' })
          },
          "ModifyControls": {
            "Hint": ng_diControl('ngText', ng_diProperties({
              "Data": {
                "Text": { Level: 'hidden' },
                "ngText": { Level: 'hidden' },
                "ngTextD": { Level: 'hidden' }
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngText' })
          }
        })
      };
    });
  }
};