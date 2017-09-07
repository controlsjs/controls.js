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
            "L": { DefaultType: 'integer', Level: 'basic', Order: 0.11 },
            "T": { DefaultType: 'integer', Level: 'basic', Order: 0.12 },
            "R": { DefaultType: 'integer', Level: 'basic', Order: 0.13 },
            "B": { DefaultType: 'integer', Level: 'basic', Order: 0.14 },
            "HX": { DefaultType: 'integer', Level: 'basic', Order: 0.15 },
            "HY": { DefaultType: 'integer', Level: 'basic', Order: 0.16 },
            "Img": { DefaultType: 'image', Level: 'basic', Order: 0.17 }
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
        Properties: ng_DIProperties({
          "ParentReferences": ng_DIPropertyBool(false, { Level: 'optional' }),
          "W": {
            Exclude: ['CW']
          },
          "H": {
            Exclude: ['CH']
          },
          "CW": { DefaultType: 'integer', Order: 0.141,
            Exclude: ['W']
          },
          "CH": { DefaultType: 'integer', Order: 0.142,
            Exclude: ['H']
          },
          "R": null,
          "B": null,
          "ControlsPanel": { DefaultType: 'control',
            IsContainer: false,
            Types: {
              'control': {
                Type: 'ngPanel'
              }
            }
          },
          "style": {
            "zIndex": { Level: 'hidden' }
          },
          "Buttons": { DefaultType: 'controls_array', 
            Collapsed: false,
            PropertyGroup: 'Controls',
            Types: {
              'controls_array': {
                DestroyIfEmpty: true,
                ChildDesignInfo: {
                  PropertyGroup: 'Controls',
                  Types: {
                    'control': {
                      InheritedFrom: 'ngButton',
                      ObjectProperties: ng_DIProperties({
                        "Data": {
                          "ButtonAlign": ng_DIPropertyStrings('right', ['left','right'], { Level: 'basic', Order: 0.8 })
                        }
                      })
                    }
                  }
                }
              }
            }
          },
          "Data": {
            "ChildHandling": { Level: 'advanced' },
            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'basic' },
            "Text": ng_DIPropertyRefName({ Level: 'basic' }),
            "HTMLEncode": ng_DIPropertyBool(ngVal(ngDefaultHTMLEncoding,false), { Level: 'basic' }),
            "BackgroundColor": { DefaultType: 'css_colors', Level: 'basic' },
            "Sizeable": ng_DIPropertyBool(true, { Level: 'basic' }),
            "Moveable": ng_DIPropertyBool(true, { Level: 'basic' }),
            "Modal": ng_DIPropertyBool(false, { Level: 'basic' }),
            "DisposeOnClose": ng_DIPropertyBool(false, { Level: 'basic' }),
            "AutoSize": ng_DIPropertyBool(true),
            "Centered": ng_DIPropertyBool(false, { Level: 'basic' }),
            "MinimizedBounds": { DefaultType: 'undefined', InitType: 'object', Level: 'optional',
              Types: {
                'object': {
                  ObjectProperties: {
                    "L": { DefaultType: 'bounds', Level: 'basic', Order: 0.11 },
                    "T": { DefaultType: 'bounds', Level: 'basic', Order: 0.12 },
                    "W": { DefaultType: 'bounds', Level: 'basic', Order: 0.13 },
                    "H": { DefaultType: 'bounds', Level: 'basic', Order: 0.14 },
                    "R": { DefaultType: 'bounds', Level: 'basic', Order: 0.15 },
                    "B": { DefaultType: 'bounds', Level: 'basic', Order: 0.16 }
                  }
                }
              }
            },
            "MinWidth": ng_DIProperty('integer',100, { Level: 'basic' }),
            "MinHeight": ng_DIProperty('integer',50, { Level: 'basic' }),
            "MaxWidth": ng_DIProperty('integer',0, { Level: 'basic' }),
            "MaxHeight": ng_DIProperty('integer',0, { Level: 'basic' }),
            "Buttons": { DefaultType: 'object', Level: 'hidden' },
            "Img": { DefaultType: 'image', Level: 'basic' },
            "Frame": { DefaultType: 'img_frame', Level: 'basic',
              Collapsed: true
            },
            "CaptionImg": { DefaultType: 'object', Level: 'basic',
              Types: {
                'object': {
                  Add: false,
                  ObjectProperties: {
                    "LeftImg": { DefaultType: 'image', Level: 'basic' },
                    "MiddleImg": { DefaultType: 'image', Level: 'basic' },
                    "RightImg": { DefaultType: 'image', Level: 'basic' }
                  }
                }
              }
            }
          },
          "Events": {
            "OnClick": ng_DIPropertyEvent('function(e) {}', { Level: 'basic' }),
            "OnDblClick": ng_DIPropertyEvent('function(e) {}', { Level: 'basic' }),
            "OnMinimize": ng_DIPropertyEvent('function(c) { return true; }', { Level: 'basic' }),
            "OnMaximize": ng_DIPropertyEvent('function(c) { return true; }', { Level: 'basic' }),
            "OnRestore": ng_DIPropertyEvent('function(c) { return true; }', { Level: 'basic' }),
            "OnClose": ng_DIPropertyEvent('function(c) { return true; }', { Level: 'basic' }),
            "OnMouseMoving": ng_DIPropertyEvent('function(c, pos) {}', { Level: 'basic' }),
            "OnMouseMove": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' }),
            "OnMouseResizing": ng_DIPropertyEvent('function(c, rect) {}', { Level: 'basic' }),
            "OnMouseResize": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' })
          },
          "OverrideEvents": {
            "OnGetText": ng_DIPropertyEvent('function(c) { return ""; }',{ Level: 'basic' }),
            "OnGetImg": ng_DIPropertyEvent('function(c) { return null; }', { Level: 'basic' })
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
        Properties: ng_DIProperties({
          "ParentReferences": ng_DIPropertyBool(true),
          "W": {
            Exclude: ['CW']
          },
          "H": {
            Exclude: ['CH']
          },
          "CW": { DefaultType: 'integer', Order: 0.141,
            Exclude: ['W']
          },
          "CH": { DefaultType: 'integer', Order: 0.142,
            Exclude: ['H']
          },
          "ControlsPanel": { DefaultType: 'control',
            IsContainer: false,
            Types: {
              'control': {
                Type: 'ngPanel'
              }
            }
          },
          "Data": {
            "ChildHandling": { Level: 'advanced' },
            "AutoSize": ng_DIPropertyBool(true),
            "MinWidth": ng_DIProperty('integer',0, { Level: 'basic' }),
            "MinHeight": ng_DIProperty('integer',0, { Level: 'basic' }),
            "MaxWidth": ng_DIProperty('integer',0, { Level: 'basic' }),
            "MaxHeight": ng_DIProperty('integer',0, { Level: 'basic' }),
            "Anchor": ng_DIProperty('string','auto', { Level: 'basic' }),
            "Anchors": { DefaultType: 'null', InitType: 'object', Level: 'basic',
              Types: {
                'null': {},
                'object': {
                  ChildDesignInfo: {
                    DefaultType: 'ngHintAnchor'
                  }
                }
              }
            },
            "PreferredAnchors": { DefaultType: 'array_strings', Level: 'basic' },
            "Frame": { DefaultType: 'img_frame', Level: 'basic',
              Collapsed: true
            },
            "ControlsInside": ng_DIPropertyBool(true, { Level: 'basic' }),
            "AutoHideTimeout": ng_DIProperty('integer',0, { Level: 'basic' }),
            "DisposeOnHide": ng_DIPropertyBool(false, { Level: 'basic' }),
            "PopupX": { DefaultType: 'integer', Level: 'hidden' },
            "PopupY": { DefaultType: 'integer', Level: 'hidden' }
          },
          "Events": {
            "OnCheckPlacement": ng_DIPropertyEvent('function(c, p) {}', { Level: 'basic' }),
            "OnPopup": ng_DIPropertyEvent('function(c, info) { return true; }', { Level: 'basic' })
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
        Properties: ng_DIProperties({
          "ParentReferences": ng_DIPropertyBool(false, { Level: 'optional' }),
          "Data": {
            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'basic' },
            "Text": ng_DIPropertyRefName({ Level: 'basic' })
          },
          "Events": {
            "OnClick": ng_DIPropertyEvent('function(e) {}')
          },
          "OverrideEvents": {
            "OnSetText": ng_DIPropertyEvent('function(text, c) { return text; }'),
            "OnGetText": ng_DIPropertyEvent('function(c) { return ""; }',{ Level: 'basic' })
          },
          "ModifyControls": {
            "Hint": { DefaultType: 'control', Level: 'basic',
              Types: {
                'control': {
                  Type: 'ngText',
                  InheritedFrom: 'ngText',
                  ObjectProperties: ng_DIProperties({
                    "Data": {
                      "Text": { Level: 'hidden' },
                      "ngText": { Level: 'hidden' },
                      "ngTextD": { Level: 'hidden' }
                    }
                  })
                }
              }
            }
          }
        },{
          "ModifyControls": { Level: 'basic' }
        })
      };
    });
  }
};