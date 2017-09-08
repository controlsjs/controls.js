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
          ObjectProperties: {
            "L": ng_diInteger(0, { Level: 'basic', Order: 0.11 }),
            "T": ng_diInteger(0, { Level: 'basic', Order: 0.12 }),
            "R": ng_diInteger(0, { Level: 'basic', Order: 0.13 }),
            "B": ng_diInteger(0, { Level: 'basic', Order: 0.14 }),
            "HX": ng_diInteger(0, { Level: 'basic', Order: 0.15 }),
            "HY": ng_diInteger(0, { Level: 'basic', Order: 0.16 }),
            "Img": ng_diType('image', { Level: 'basic', Order: 0.17 })
          }
        }
      }
    ];
    FormEditor.RegisterPropertyType(win_types);
  },
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('ngWindow',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
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
          "CW": ng_diInteger(0, { Order: 0.141, Exclude: ['W'] }),
          "CH": ng_diInteger(0, { Order: 0.142, Exclude: ['H'] }),
          "R": null,
          "B": null,
          "ControlsPanel": ng_diControl('ngPanel', undefined, { IsContainer: false }),
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
            "AutoSize": ng_diBoolean(true),
            "Centered": ng_diBoolean(false, { Level: 'basic' }),
            "MinimizedBounds": ng_diMixed([
              ng_diUndefined(),
              ng_diObject({
                "L": ng_diType('bounds', { Level: 'basic', Order: 0.11 }),
                "T": ng_diType('bounds', { Level: 'basic', Order: 0.12 }),
                "W": ng_diType('bounds', { Level: 'basic', Order: 0.13 }),
                "H": ng_diType('bounds', { Level: 'basic', Order: 0.14 }),
                "R": ng_diType('bounds', { Level: 'basic', Order: 0.15 }),
                "B": ng_diType('bounds', { Level: 'basic', Order: 0.16 })
              })
            ], { InitType: 'object', Level: 'optional' }),
            "MinWidth": ng_diInteger(100, { Level: 'basic' }),
            "MinHeight": ng_diInteger(50, { Level: 'basic' }),
            "MaxWidth": ng_diInteger(0, { Level: 'basic' }),
            "MaxHeight": ng_diInteger(0, { Level: 'basic' }),
            "Buttons": ng_diObject(undefined, { Level: 'hidden' }),
            "Img": ng_diType('image', { Level: 'basic' }),
            "Frame": ng_diType('img_frame', { Level: 'basic', Collapsed: true } ),
            "CaptionImg": ng_diObject({
              "LeftImg": ng_diType('image', { Level: 'basic' }),
              "MiddleImg": ng_diType('image', { Level: 'basic' }, {
                EditorOptions: {
                  HorizontalImages: true
                }
              }),
              "RightImg": ng_diType('image', { Level: 'basic' })
            }, { Level: 'basic' }, { Add: false })
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
        })
      };
    });

    ngRegisterControlDesignInfo('ngHint',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
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
          "CW": ng_diInteger(0, { Order: 0.141, Exclude: ['W'] }),
          "CH": ng_diInteger(0, { Order: 0.142, Exclude: ['H'] }),
          "ControlsPanel": ng_diControl('ngPanel', undefined, { IsContainer: false }),
          "Data": {
            "ChildHandling": { Level: 'advanced' },
            "AutoSize": ng_diBoolean(true),
            "MinWidth": ng_diInteger(0, { Level: 'basic' }),
            "MinHeight": ng_diInteger(0, { Level: 'basic' }),
            "MaxWidth": ng_diInteger(0, { Level: 'basic' }),
            "MaxHeight": ng_diInteger(0, { Level: 'basic' }),
            "Anchor": ng_diString('auto', { Level: 'basic' }),
            "Anchors": ng_diMixed([
              ng_diNull(),
              ng_diObject(undefined, undefined, {
                ChildDesignInfo: ng_diType('ngHintAnchor')
              })
            ], { InitType: 'object', Level: 'basic' }),
            "PreferredAnchors": ng_diType('array_strings', { Level: 'basic' }),
            "Frame": ng_diType('img_frame', { Level: 'basic', Collapsed: true }),
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
        })
      };
    });

    ngRegisterControlDesignInfo('ngTextHint',function(d,c,ref) {
      return {
        ControlCategory: 'Labels',
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
            "OnClick": ng_diEvent('function(e) {}')
          },
          "OverrideEvents": {
            "OnSetText": ng_diEvent('function(text, c) { return text; }'),
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
        },{
          "ModifyControls": { Level: 'basic' }
        })
      };
    });
  }
};