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
ngUserControls['uicore'] = {
  OnFormEditorInit: function(FE)
  {
    var types = [
      // ngImageShape
      {
        TypeID: 'ngImageShape',
        TypeBase: 'object',
        Name: 'ngImageShape',
        ShortName: 'shape',
        Basic: false,
        Options: {
          Add: false,
          ObjectProperties: {
            "Shape": ng_DIPropertyStrings('rect', ['rect','circle','poly'], { Level: 'basic', Order: 0.4 }),
            "Coords": { DefaultType: 'string', Level: 'basic', Order: 0.41 },
            "Alt": { DefaultType: 'string', Level: 'basic' },
            "OnClick": ng_DIPropertyEvent('function(e) { return true; }', { Level: 'basic' })
          }
        }
      },
      // ngPage
      {
        TypeID: 'ngPage',
        TypeBase: 'object',
        Name: 'ngPage',
        ShortName: 'page',
        Basic: false,
        Options: {
          ObjectProperties: {
            "id":   { DefaultType: 'undefined', InitType: 'string', Level: 'basic' },
            "Text": { DefaultType: 'undefined', InitType: 'string', Level: 'basic', Order: 0.4 },
            "Alt":  { DefaultType: 'undefined', InitType: 'string', Level: 'basic' },
            "Visible": ng_DIPropertyBool(true, { Level: 'basic' }),
            "Enabled": ng_DIPropertyBool(true, { Level: 'basic' }),
            "ControlsPanel": ng_DIPropertyControl('ngPanel', { Level: 'advanced', IsContainer: false }),
            "W": ng_DIProperty(['undefined','bounds'],undefined, { InitType: 'bounds_integer', Level: 'basic' }),
            "H": ng_DIProperty(['undefined','bounds'],undefined, { InitType: 'bounds_integer', Level: 'basic' }),
            "MinWidth": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic' },
            "Controls": { DefaultType: 'controls', Level: 'basic',
              ContainerProperty: true,
              Types: {
                'controls': {
                  DestroyIfEmpty: true,
                  ChildDesignInfo: {
                    PropertyGroup: 'Controls'
                  }
                }
              }
            }
          }
        }
      }
    ];
    FormEditor.RegisterPropertyType(types);
  },
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('ngPanel',function(d,c,ref) {
      var di={
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 100 }
            }
          }
        },
        Properties: {
          "ParentReferences": { Level: 'advanced' },
          "ScrollBars": { Level: 'basic' },
          "Controls": { Level: 'basic' },
          "Data": {
            Types: {
              'object': {
                ObjectProperties: {
                  "ChildHandling": { Level: 'optional' },
                  "FormID": { DefaultType: 'string', Level: 'optional' }
                }
              }
            }
          }
        }
      };
      if(!d.CtrlInheritanceDepth) {
        di.ControlCategory='Containers';
        di.IsContainer=true;
        di.BaseControl='ngPanel';
        di.Properties["Data"].Types.object.ObjectProperties["FormID"].Level='advanced';
        di.Properties["Data"].Types.object.ObjectProperties["ChildHandling"].Level='advanced';
      }
      return di;
    });

    ngRegisterControlDesignInfo('ngText',function(d,c,ref) {
      return {
        ControlCategory: 'Labels',
        NewControl: {
          Default: {
            Properties: {
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
          "style": {
            "color": { Level: 'basic' },
            "fontFamily": { Level: 'basic' },
            "fontSize": { Level: 'basic' },
            "fontStyle": { Level: 'basic' },
            "fontWeight": { Level: 'basic' },
            "lineHeight": { Level: 'basic' },
            "textTransform": { Level: 'basic' },
            "whiteSpace": { Level: 'basic' }
          },

          "Data": {
            "TextAlign": ng_DIPropertyStrings('left', ['left','right','center','justify'], { Level: 'basic' }),
            "AutoSize": ng_DIPropertyBool(false),
            "AutoSizeMode": ng_DIPropertyStrings('auto', ['auto','horizontal','vertical']),
            "MinWidth":  { DefaultType: 'undefined', InitType: 'integer' },
            "MinHeight": { DefaultType: 'undefined', InitType: 'integer' },

            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'basic' },
            "Text": ng_DIPropertyRefName({ Level: 'basic',
              Types: {
                'string': {
                  Editor: 'ngfeEditor_Text'
                }
              }
            }),
            "ngAlt": { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": { DefaultType: 'string', Level: 'basic' },
            "HTMLEncode": ng_DIPropertyBool(ngVal(ngDefaultHTMLEncoding,false), { Level: 'basic' }),
            "CanSelect": ng_DIPropertyBool(true, { Level: 'basic' })
          },
          "OverrideEvents": {
            "OnSetText": ng_DIPropertyEvent('function(text, c) { return text; }'),
            "OnGetText": ng_DIPropertyEvent('function(c) { return ""; }',{ Level: 'basic' }),
            "OnGetAlt": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngImage',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        BaseControl: 'ngImage',
        Properties: ng_DIProperties({
          "Data": {
            "ngAlt":  { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": { DefaultType: 'string', Level: 'basic' },
            "AutoSize": ng_DIPropertyBool(true),
            "Img": { DefaultType: 'image', Level: 'basic' }
          },
          "OverrideEvents": {
            "OnGetImg": ng_DIPropertyEvent('function(c) { return null; }', { Level: 'basic' }),
            "OnGetAlt": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngImageMap',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        BaseControl: 'ngImageMap',
        Properties: ng_DIProperties({
          "Data": {
            "ngAlt":  { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": { DefaultType: 'string', Level: 'basic' },
            "AutoSize": ng_DIPropertyBool(true),
            "Img": { DefaultType: 'image', Level: 'basic' },
            "Cursor": { DefaultType: 'css_cursor', Level: 'basic' },
            "Shapes": { DefaultType: 'array', Level: 'basic',
              Types: {
                'array': {
                  ChildDesignInfo: {
                    DefaultType: 'ngImageShape'
                  }
                }
              }
            }
          },
          "Events": {
            "OnShapeClick": ng_DIPropertyEvent('function(e) { }', { Level: 'basic' }),
            "OnMouseEnter":  { },
            "OnMouseLeave":  { },
            "OnMouseShapeEnter": ng_DIPropertyEvent('function(c, shapeidx) { }'),
            "OnMouseShapeLeave": ng_DIPropertyEvent('function(c, shapeidx) { }')
          },
          "OverrideEvents": {
            "OnGetImg": ng_DIPropertyEvent('function(c) { return null; }', { Level: 'basic' }),
            "OnGetAlt": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetShapeAlt": ng_DIPropertyEvent('function(c, shapeidx) { return ""; }', { Level: 'basic' })
          }
        })
      }
    });

    ngRegisterControlDesignInfo('ngButton',function(d,c,ref) {
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
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "H": null,
          "style": {
            "color": { Level: 'basic' },
            "fontFamily": { Level: 'basic' },
            "fontSize": { Level: 'basic' },
            "fontStyle": { Level: 'basic' },
            "fontWeight": { Level: 'basic' },
            "textTransform": { Level: 'basic' }
          },
          "Data": {
            "Action": { DefaultType: 'string', Level: 'basic'
              // TODO: browse from existing actions
            },
            "TextAlign": ng_DIPropertyStrings('center', ['left','right','center'], { Level: 'basic' }),
            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'basic' },
            "Text": ng_DIPropertyRefName({ Level: 'basic' }),
            "ngAlt":  { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": { DefaultType: 'string', Level: 'basic' },
            "HTMLEncode": ng_DIPropertyBool(ngVal(ngDefaultHTMLEncoding,false), { Level: 'basic' }),
            "AutoSize": ng_DIPropertyBool(true),
            "MinWidth": { DefaultType: 'undefined', InitType: 'integer' },
            "Checked": ng_DIPropertyValues('integer', 0, ['Unchecked','Checked','Grayed'], { Level: 'basic',
              Types: {
                'integer': {
                   InitValue: 1
                 }
              }
            }),
            "RadioGroup": { DefaultType: 'undefined', InitType: 'string'
              // TODO: browse from existing radio groups
            },
            "Cursor": ng_DIProperty('css_cursor', 'pointer', { Level: 'basic' }),
            "ReadOnly": ng_DIPropertyBool(false, { Level: 'basic' }),
            "Img": { DefaultType: 'image', Level: 'basic' },
            "ImgAlign": ng_DIPropertyStrings('left', ['left','right'], { Level: 'basic' }),
            "ImgIndent": { DefaultType: 'integer', Level: 'basic' },
            "LeftImg": { DefaultType: 'image', Level: 'basic' },
            "MiddleImg": { DefaultType: 'image', Level: 'basic',
              Types: {
                'image': {
                   EditorOptions: {
                     HorizontalImages: true
                   }
                 }
              }
            },
            "RightImg": { DefaultType: 'image', Level: 'basic' },
            "Default": ng_DIPropertyBool(false, { Level: 'basic' }),
            "Cancel": ng_DIPropertyBool(false, { Level: 'basic' })
          },
          "Events": {
            "OnCheckChanged": ng_DIPropertyEvent('function(c) { }', { Level: 'basic' }),
            "OnDblClick": ng_DIPropertyEvent('function(e) { }', { Level: 'basic' }),
            "OnClick": ng_DIPropertyEvent('function(e) { }', { Level: 'basic' }),
            "OnMouseEnter": { },
            "OnMouseLeave": { }
          },
          "OverrideEvents": {
            "OnSetText": ng_DIPropertyEvent('function(text, c) { return text; }'),
            "OnGetText": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetAlt": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetImg": ng_DIPropertyEvent('function(c, idx) { return null; }', { Level: 'basic' }),
            "OnGetClassName": ng_DIPropertyEvent('function(c, cls, text) { return cls; }', { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngGroup',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        IsContainer: true,
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 100 },
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
          "ParentReferences": { Level: 'advanced' },
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
          "ControlsPanel": { DefaultType: 'control', Level: 'advanced',
            IsContainer: false,
            Types: {
              'control': {
                Type: 'ngPanel'
              }
            }
          },
          "Data": {
            "ChildHandling": { Level: 'advanced' },
            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'basic' },
            "Text": ng_DIPropertyRefName({ Level: 'basic' }),
            "HTMLEncode": ng_DIPropertyBool(ngVal(ngDefaultHTMLEncoding,false), { Level: 'basic' }),
            "Frame": { DefaultType: 'img_frame', Level: 'basic',
              Collapsed: true
            },
            "ControlsInside": ng_DIPropertyBool(true, { Level: 'basic' })
          },
          "OverrideEvents": {
            "OnSetText": ng_DIPropertyEvent('function(text, c) { return text; }'),
            "OnGetText": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' })
          }
        },
        {
          "Controls": { Level: 'basic' }
        })
      };
    });

    ngRegisterControlDesignInfo('ngEdit',function(d,c,ref) {
      return {
        ControlCategory: 'Edits',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "Data": {
                ObjectProperties: {
                  "Text": { ValueByRefName: true }
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "H": null,
          "Buttons": { DefaultType: 'controls_array', Level: 'basic',
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
          "DropDown": { DefaultType: 'control',
            PropertyGroup: 'Controls'
          },
          "Data": {
            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'optional' },
            "Text": ng_DIPropertyRefName({ Level: 'basic' }),
            "DefaultText": { DefaultType: 'string', Level: 'basic' },
            "TextAlign": ng_DIPropertyStrings('left', ['left','right','center'], { Level: 'basic' }),
            "ngAlt":  { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": { DefaultType: 'string', Level: 'basic' },
            "ngHint":  { Level: 'advanced' },
            "ngHintD": { Level: 'basic' },
            "Hint": { DefaultType: 'string', Level: 'basic' },
            "HintStyle": ng_DIPropertyIntConstants(ngVal(ngDefaultHintStyle,1),['ngHintHideOnFocus','ngHintHideOnInput'],{ Level: 'basic' }),
            "ReadOnly": ng_DIPropertyBool(false, { Level: 'basic' }),
            "Password": ng_DIPropertyBool(false, { Level: 'basic' }),
            "MaxLength": { DefaultType: 'integer', Level: 'basic' },
            "LeftImg": { DefaultType: 'image', Level: 'basic' },
            "MiddleImg": { DefaultType: 'image', Level: 'basic',
              Types: {
                'image': {
                   EditorOptions: {
                     HorizontalImages: true
                   }
                 }
              }
            },
            "RightImg": { DefaultType: 'image', Level: 'basic' },
            "OffsetTop": { DefaultType: 'integer', Level: 'basic' },
            "SelectOnFocus": ng_DIPropertyBool(true, { Level: 'basic' }),
            "DropDownType": ng_DIPropertyIntConstants(0,['ngeDropDownEdit','ngeDropDownList']),
            "DropDownWidth": { DefaultType: 'undefined', InitType: 'integer' },
            "DropDownAlign": ng_DIPropertyStrings('left', ['left','right']),
            "LockHintCaretPos": ng_DIPropertyBool(true, { Level: 'basic' }),
            "Invalid": ng_DIPropertyBool(false, { Level: 'basic' }),
            "Suggestion": ng_DIPropertyBool(false),
            "SuggestionDelay": ng_DIProperty('integer',200),
            "SuggestionSearchColumn": { DefaultType: 'string' },
            "SuggestionIgnoreCase": ng_DIPropertyBool(true),
            "SuggestionPartial": ng_DIPropertyValues('integer',2,[{Value:2,Text:'Contains'},{Value:1,Text:'Starts With'},{Value:0,Text:'Equals'},{Value:-1,Text:'Custom'}]),
            "SuggestionURL": { DefaultType: 'url' },
            "SuggestionType": { DefaultType: 'string' }
          },
          "Methods": {
            "DoFocus": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function(e, elm) { ng_CallParent(this, "DoFocus", arguments); }'
                }
              }
            },
            "DoBlur": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function(e, elm) { ng_CallParent(this, "DoBlur", arguments); }'
                }
              }
            },
            "DoUpdateImages": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function() { ng_CallParent(this, "DoUpdateImages", arguments); }'
                }
              }
            },
            "DoSetInvalid": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function(state, update) { ng_CallParent(this, "DoSetInvalid", arguments); }'
                }
              }
            }
          },
          "OverrideEvents": {
            "OnSetText": ng_DIPropertyEvent('function(text, c) { return text; }'),
            "OnGetText": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetAlt": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetHint": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetClassName": ng_DIPropertyEvent('function(c, cls, text, hint) { return cls; }', { Level: 'basic' }),
            "OnGetImg": ng_DIPropertyEvent('function(c, idx) { return null; }', { Level: 'basic' }),
            "OnSuggestionSetText": ng_DIPropertyEvent('function(text, it) { return text; }'),
            "OnSuggestionURL": ng_DIPropertyEvent('function(c, url) { return url; }'),

            // ngList DropDown Events
            "OnListItemGetText":  ng_DIPropertyEvent('function(c, list, it, t) { return t; }',{ Level: 'optional' })
          },
          "Events": {
            "OnTextChanged": ng_DIPropertyEvent('function(c) { }', { Level: 'basic' }),
            "OnDropDown": ng_DIPropertyEvent('function(c, dd) { return true; }'),
            "OnHideDropDown": ng_DIPropertyEvent('function(c, dd) { return true; }'),
            "OnClickOutside": { },
            "OnKeyDown": ng_DIPropertyEvent('function(e, elm) { return true; }', { Level: 'basic' }),
            "OnKeyUp": ng_DIPropertyEvent('function(e, elm) { return true; }', { Level: 'basic' }),
            "OnKeyPress": ng_DIPropertyEvent('function(e, elm) { return true; }', { Level: 'basic' }),
            "OnMouseEnter": { },
            "OnMouseLeave": { },
            "OnFocus": ng_DIPropertyEvent('function(c) { }', { Level: 'basic' }),
            "OnBlur": ng_DIPropertyEvent('function(c) { }', { Level: 'basic' }),
            "OnSetInvalid": ng_DIPropertyEvent('function(c, state, update) { return true; }', { Level: 'basic' }),
            "OnSetReadOnly": ng_DIPropertyEvent('function(c, state) { return true; }', { Level: 'basic' }),
            "OnReadOnlyChanged": ng_DIPropertyEvent('function(c, state) { }', { Level: 'basic' }),
            "OnSuggestionSearch": ng_DIPropertyEvent('function(c, txt, res) { return true; }'),
            "OnSuggestionCompareItem": ng_DIPropertyEvent('function(c, txt, itemtxt, list, it, parent) { return (txt==itemtxt); }'),
            "OnSuggestionResults": ng_DIPropertyEvent('function(c, txt, data, res) { return true; }'),
            "OnSuggestionData": ng_DIPropertyEvent('function(c, txt, data) { return true; }'),

            // ngList DropDown Events
            "OnListItemChanged": ng_DIPropertyEvent('function(c, list, it, ddoli) { return true; }',{ Level: 'optional' })
          }
        })
      };
    });
    ngRegisterControlDesignInfo('ngMemo',function(d,c,ref) {
      return {
        ControlCategory: 'Edits',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 100 },
              "Data": {
                ObjectProperties: {
                  "Text": { ValueByRefName: true }
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "Data": {
            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'optional' },
            "Text": ng_DIPropertyRefName({ Level: 'basic' }),
            "DefaultText": { DefaultType: 'string', Level: 'basic' },
            "TextAlign": ng_DIPropertyStrings('left', ['left','right','center'], { Level: 'basic' }),
            "ngAlt":  { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": { DefaultType: 'string', Level: 'basic' },
            "ngHint": { Level: 'advanced' },
            "ngHintD": { Level: 'basic' },
            "Hint": { DefaultType: 'string', Level: 'basic' },
            "HintStyle": ng_DIPropertyIntConstants(ngVal(ngDefaultHintStyle,1),['ngHintHideOnFocus','ngHintHideOnInput'],{ Level: 'basic' }),
            "ReadOnly": ng_DIPropertyBool(false, { Level: 'basic' }),
            "Frame": { DefaultType: 'img_frame', Level: 'basic' },
            "SelectOnFocus": ng_DIPropertyBool(true, { Level: 'basic' }),
            "LockHintCaretPos": ng_DIPropertyBool(true, { Level: 'basic' }),
            "Invalid": ng_DIPropertyBool(false, { Level: 'basic' })
          },
          "Methods": {
            "DoFocus": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function(e, elm) { ng_CallParent(this, "DoFocus", arguments); }'
                }
              }
            },
            "DoBlur": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function(e, elm) { ng_CallParent(this, "DoBlur", arguments); }'
                }
              }
            },
            "DoUpdateImages": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function() { ng_CallParent(this, "DoUpdateImages", arguments); }'
                }
              }
            },
            "DoSetInvalid": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function(state, update) { ng_CallParent(this, "DoSetInvalid", arguments); }'
                }
              }
            }
          },
          "OverrideEvents": {
            "OnSetText": ng_DIPropertyEvent('function(text, c) { return text; }'),
            "OnGetText": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetAlt": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetHint": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetClassName": ng_DIPropertyEvent('function(c, cls, text, hint) { return cls; }', { Level: 'basic' })
          },
          "Events": {
            "OnTextChanged": ng_DIPropertyEvent('function(c) { }', { Level: 'basic' }),
            "OnKeyDown": ng_DIPropertyEvent('function(e, elm) { return true; }', { Level: 'basic' }),
            "OnKeyUp": ng_DIPropertyEvent('function(e, elm) { return true; }', { Level: 'basic' }),
            "OnKeyPress": ng_DIPropertyEvent('function(e, elm) { return true; }', { Level: 'basic' }),
            "OnMouseEnter": { },
            "OnMouseLeave": { },
            "OnFocus": ng_DIPropertyEvent('function(c) { }', { Level: 'basic' }),
            "OnBlur": ng_DIPropertyEvent('function(c) { }', { Level: 'basic' }),
            "OnSetInvalid": ng_DIPropertyEvent('function(c, state, update) { return true; }', { Level: 'basic' }),
            "OnSetReadOnly": ng_DIPropertyEvent('function(c, state) { return true; }', { Level: 'basic' }),
            "OnReadOnlyChanged": ng_DIPropertyEvent('function(c, state) { }', { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngPages',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        IsContainer: true,
        TargetContainer: function(control, target_control, control_elm, target_elm)
        {
          if (!control) return 'Pages.0.Controls';
          return 'Pages.' + ngVal(control.Page, 0) + '.Controls';
        },
        BaseControl: 'ngPages',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 100 },
              "Data": {
                ObjectProperties: {
                  "HTMLEncode": { Value: true }
                }
              },
              "Pages": {
                ObjectProperties: {
                  "0": {
                    ObjectProperties: {
                      Text: { Value: 'Page 1', Type: 'string' }
                    }
                  }
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "Pages": { DefaultType: 'array', Level: 'basic',
            Collapsed: false,
            Types: {
              'array': {
                ChildDesignInfo: {
                  DefaultType: 'ngPage',
                  Collapsed: false,
                  OnPropertyInit: function(ch)
                  {
                    if (FormEditor.PropertyTypeInheritsFrom(ch.Type, 'ngPage'))
                    {
                      var pageid = ng_toInteger(ch.Name.substring(ch.Name.lastIndexOf('.') + 1));
                      if (!isNaN(pageid))
                      {
                        if (!ch.Value || typeof ch.Value !== 'object') ch.Value = {};
                        ch.Value.Text = "'Page " + (pageid + 1) + "'";
                      }
                    }

                    return true;
                  }
                }
              }
            }
          },
          "ControlsPanel": { DefaultType: 'control', Level: 'advanced',
            IsContainer: false,
            Types: {
              'control': {
                Type: 'ngPanel'
              }
            }
          },
          "Data": {
            "ChildHandling": { Level: 'advanced' },
            "Page": { DefaultType: 'integer', Level: 'basic' },
            "PagesVisible": ng_DIPropertyBool(true, { Level: 'basic' }),
            "PagesIndent": { DefaultType: 'integer', Level: 'basic' },
            "PagesSize": { DefaultType: 'integer', Level: 'basic' },
            "MaxRows": { DefaultType: 'integer', Level: 'basic' },
            "PagesAlign": ng_DIPropertyStrings('left', ['left','right'], { Level: 'basic' }),
            "PagesVAlign": ng_DIPropertyStrings('top', ['top','bottom'], { Level: 'basic' }),
            "TextAlign": ng_DIPropertyStrings('left', ['left','right','center','justify'], { Level: 'basic' }),
            "HTMLEncode": ng_DIPropertyBool(ngVal(ngDefaultHTMLEncoding,false), { Level: 'basic' }),
            "RowOverlap": { DefaultType: 'integer', Level: 'basic' },
            "PageImages": { DefaultType: 'array', Level: 'basic' },
            "Frame": { DefaultType: 'img_frame', Level: 'basic',
              Collapsed: true
            }
          },
          "OverrideEvents": {
            "OnGetText": ng_DIPropertyEvent('function(c, pg) { return ""; }', { Level: 'basic' }),
            "OnGetAlt": ng_DIPropertyEvent('function(c, pg) { return ""; }', { Level: 'basic' })
          },
          "Events": {
            "OnPageChanging": ng_DIPropertyEvent('function(c, page) { return true; }', { Level: 'basic' }),
            "OnPageChanged": ng_DIPropertyEvent('function(c, oldpage) { return true; }', { Level: 'basic' }),
            "OnClick": ng_DIPropertyEvent('function(e) { return true; }', { Level: 'basic' }),
            "OnDblClick": ng_DIPropertyEvent('function(e) { return true; }', { Level: 'basic' })
          }
        }),

        ActionsMenu: {
          'add_page': {
            Text: 'Add Page',
            MultiSelect: false,
            Checked: 0,
            OnMenuClick: function(e, m, it)
            {
              var pages = FormEditor.GetSelectedControlsProperty('Pages');
              for (var i in pages)
              {
                var p = pages[i];
                if (!p) continue;

                var pages_cnt;
                if (p.PropertyDefined === 0) pages_cnt = 0;
                else pages_cnt = ng_IsArrayVar(p.PropertyValue) ? p.PropertyValue.length : 0;

                FormEditor.SetControlsProperty({ Name: 'Pages.' + pages_cnt,                           ControlID: p.ControlID, UseInit: FormEditor.Params.PEInitializePropertiesOnAdd, Interactive: FormEditor.Params.PEInitializePropertiesOnAdd });
                FormEditor.SetControlsProperty({ Name: 'Data.Page', Type: 'integer', Value: pages_cnt, ControlID: p.ControlID });
              }

              return false;
            }
          },
          'delete_page': {
            Text: '@%add_page+:Delete Page',
            MultiSelect: false,
            Checked: 0,
            OnMenuClick: function(e, m, it)
            {
              var selected = FormEditor.GetSelectedControls();
              if (selected.length !== 1 || !selected[0]) return false;

              var cidx = selected[0].ControlID,
                  pages = FormEditor.GetControlsProperty('Pages', [cidx]),
                  pages_defined = (pages.PropertyDefined !== 0),
                  pages_cnt = (pages_defined && ng_IsArrayVar(pages[0].PropertyValue)) ? pages[0].PropertyValue.length : 0;
              if (pages_cnt === 0) return false;

              var page_selected = 0;
              var pgs = FormEditor.GetControlsProperty('Data.Page', [cidx]);
              if (pgs && pgs[0] && pgs[0].PropertyDefined !== 0 && ng_isInteger(pgs[0].PropertyValue)) page_selected = pgs[0].PropertyValue;

              var new_pg_select = page_selected - 1;
              if (new_pg_select < 0) new_pg_select = 0;

              var pg_Text = FormEditor.GetControlsProperty('Pages.'+page_selected+'.Text', [cidx]),
                  pg_txt = (pg_Text && pg_Text[0] && pg_Text[0].PropertyDefined !== 0 && typeof pg_Text[0].PropertyValue === 'string') ? pg_Text[0].PropertyValue : '';

              FormEditor.MessageDlg('feMessageBox', 'Delete page `'+pg_txt+'` (ID: '+page_selected+')?', 'Delete Page', function(c) {
                if (c.DialogResult === mbYes)
                {
                  FormEditor.SetControlsProperty({ Name: 'Pages.' + page_selected, Destroy: true });
                  FormEditor.SetControlsProperty({ Name: 'Data.Page', Destroy: new_pg_select === 0, Type: 'integer', Value: new_pg_select });

                  return true;
                }

                return true;
              }, {
                CloseBtn: true,
                DlgButtons: mbYes|mbNo,
                DlgIcon: mbIconQuestion,
                Controls: {
                  Buttons: {
                    Controls: {
                      Yes: {
                        Data: { Default: false }
                      },
                      No: {
                        Data: {
                          Default: true,
                          Cancel: true
                        }
                      }
                    }
                  }
                }
              });

              return false;
            }
          }
        },

        OnActionsMenuCreating: function(actions)
        {
          if (!actions) actions = {};

          var selected = FormEditor.GetSelectedControls();
          if (selected.length === 0) return;

          // add actions
          actions['delim1'] = { Text: '@%delete_page+:-' };

          var selected_pages = FormEditor.GetSelectedControlsProperty('Pages'),
              lastid = 'delim1';
          for (var i in selected)
          {
            if (!selected[i]) continue;

            var ctrlType = selected[i].DefType;
            if (!FormEditor.TypeInheritsFrom(ctrlType, 'ngPages')) continue;

            var pages = selected_pages[i];
            if (!pages) continue;

            var refname = (selected[i] && selected[i].ControlRefName) ? selected[i].ControlRefName : '';
            if (refname)
            {
              var cidx = selected[i].ControlID,
                  id = 'select_page_' + cidx,
                  pages_defined = (pages.PropertyDefined !== 0),
                  pages_cnt = (pages_defined && ng_IsArrayVar(pages.PropertyValue)) ? pages.PropertyValue.length : 0,
                  rootadd = (selected.length === 1);

              var page_selected = 0,
                  pgs = FormEditor.GetControlsProperty('Data.Page', [cidx]);
              if (pgs && pgs[0] && pgs[0].PropertyDefined !== 0 && ng_isInteger(pgs[0].PropertyValue)) page_selected = pgs[0].PropertyValue;

              if (!rootadd)
              {
                actions[id] = {
                  Text: refname + ' (' + pages_cnt + ' Pages Inside)',
                  MultiSelect: true,
                  Enabled: pages_cnt > 0,
                  Checked: 0,
                  OnMenuClick: function(e, m, it)
                  {
                    return false;
                  }
                };
              }

              var selit;
              for (var pg = 0; pg < pages_cnt; pg++)
              {
                var pg_Text = FormEditor.GetControlsProperty('Pages.'+pg+'.Text', [cidx]),
                    pg_txt = (pg_Text && pg_Text[0] && pg_Text[0].PropertyDefined !== 0 && typeof pg_Text[0].PropertyValue === 'string') ? pg_Text[0].PropertyValue : '',
                    checked = (pg === page_selected) ? 1 : 0;

                var action = {
                  Text: (!rootadd ? ('%'+id+'\\') : '@%'+lastid+'+:' ) + ('('+pg+') - ' + pg_txt),
                  MultiSelect: true,
                  ControlID: cidx,
                  Page: pg,
                  PageText: pg_txt,
                  Checked: checked,
                  OnMenuClick: function(e, m, it)
                  {
                    FormEditor.SetControlsProperty({ Name: 'Data.Page', Type: 'integer', Value: it.Page, ControlID: it.ControlID });

                    return false;
                  }
                };
                lastid = id+'_'+pg;
                actions[lastid] = action;

                if (checked) selit = action;
              }

              if (selected.length === 1)
              {
                var dit = actions['delete_page'];
                if (dit)
                {
                  dit.Enabled = (ngVal(dit.Enabled, true) && (pages_cnt > 0));
                  if (dit.Enabled && selit)
                  {
                    dit.Text = '@%add_page+:Delete Page (' + (selit.PageText ? selit.PageText : selit.Page) + ')';
                    dit.Text = dit.Text.replace(/ /g, '&nbsp;');
                  }
                }
              }
            }
          }
        }

      };
    });
    ngRegisterControlDesignInfo('ngToolBar',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        IsContainer: true,
        BaseControl: 'ngToolBar',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 150 },
              "H": { Value: 30 }
            }
          }
        },
        Properties: ng_DIProperties({
          "Data": {
            "ChildHandling": { Level: 'advanced' },
            "AutoSize": ng_DIPropertyBool(false),
            "Vertical": ng_DIPropertyBool(false, { Level: 'basic' }),
            "VPadding": { DefaultType: 'integer', Level: 'basic' },
            "HPadding": { DefaultType: 'integer', Level: 'basic' },
            "VAlign": ng_DIPropertyStrings('top', ['top','bottom'], { Level: 'basic' }),
            "HAlign": ng_DIPropertyStrings('left', ['left','right'], { Level: 'basic' }),
            "Wrapable": ng_DIPropertyBool(true, { Level: 'basic' })
          }
        },
        {
          "Controls": {
            Level: 'basic',
            Types: {
              'controls': {
                ChildDesignInfo: {
                  Types: {
                    'control': {
                      ObjectProperties: ng_DIProperties({
                        "Data": {
                          "ToolBarIgnore": ng_DIPropertyBool(false, { Level: 'basic', Order: 0.8 }),
                          "ToolBarAutoUpdate": ng_DIPropertyBool(true, { Level: 'basic', Order: 0.8 }),
                          "ToolBarIndent": { DefaultType: 'integer', Level: 'basic', Order: 0.8 },
                          "ToolBarHPadding": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic', Order: 0.8 },
                          "ToolBarVPadding": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic', Order: 0.8 },
                          "ToolBarWidth": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic', Order: 0.8 },
                          "ToolBarHeight": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic', Order: 0.8 },
                          "ToolBarBreak": ng_DIPropertyBool(false, { Level: 'basic', Order: 0.8 }),
                          "ToolBarNoWrap": ng_DIPropertyBool(false, { Level: 'basic', Order: 0.8 })
                        }
                      })
                    }
                  }
                }
              }
            }
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngProgressBar',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 }
            }
          }
        },
        Properties: ng_DIProperties({
          "Data": {
            "Position": { DefaultType: 'integer', Level: 'basic' },
            "Smooth": ng_DIPropertyBool(false, { Level: 'basic' }),
            "LeftImg": { DefaultType: 'image', Level: 'basic' },
            "MiddleImg": { DefaultType: 'image', Level: 'basic',
              Types: {
                'image': {
                   EditorOptions: {
                     HorizontalImages: true
                   }
                 }
              }
            },
            "RightImg": { DefaultType: 'image', Level: 'basic' },
            "BarImg": { DefaultType: 'image', Level: 'basic',
              Types: {
                'image': {
                   EditorOptions: {
                     HorizontalImages: true
                   }
                 }
              }
            }
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngWebBrowser',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        BaseControl: 'ngWebBrowser',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 100 }
            }
          }
        },
        Properties: ng_DIProperties({
          "Data": {
            "URL": { DefaultType: 'url', Level: 'basic' },
            "DesignLive": ng_DIPropertyBool(false, { Level: 'basic', Order: 0.95 })
          },
          "OverrideEvents": {
            "OnGetURL": ng_DIPropertyEvent('function(c, url) { return url; }', { Level: 'basic' }),
            "OnSetHTML": ng_DIPropertyEvent('function(c, html) { return html; }', { Level: 'basic' })
          },
          "Events": {
            "OnSetURL": ng_DIPropertyEvent('function(c, url) { return true; }', { Level: 'basic' })
          }

        })
      };
    });

    // Derived controls

    ngRegisterControlDesignInfo('ngFrame',function(d,c,ref) {
      var di={
        Properties: {
          "ParentReferences": ng_DIPropertyBool(false, { Level: 'optional' }),
          "Data": {
            Types: {
              'object': {
                ObjectProperties: {
                  "ChildHandling": { Level: 'optional' },
                  "FormID": { DefaultType: 'string', Level: 'optional' }
                }
              }
            }
          }
        }
      };
      if(d.CtrlInheritanceDepth<2) {
        di.ControlCategory='Containers';
        di.IsContainer=true;
        di.BaseControl='ngFrame';
        di.Properties["Data"].Types.object.ObjectProperties["FormID"].Level='advanced';
        di.Properties["Data"].Types.object.ObjectProperties["ChildHandling"].Level='advanced';
      }
      return di;
    });

    ngRegisterControlDesignInfo('ngRadioButton',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "Data": {
            "RadioGroup": ng_DIProperty('string','default', { Level: 'basic' }),
            "AllowGrayed": ng_DIPropertyBool(false, { Level: 'basic' }),
            "RadioAllowUncheck": ng_DIPropertyBool(false, { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngCheckBox',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "Data": {
            "AllowGrayed": ng_DIPropertyBool(false, { Level: 'basic' })
          }
        })
      };
    });

    function DropDownDI(d,c,ref) {
      return {
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "DropDown": { Value: "{ Type: 'ngList' }"}
            }
          }
        },
        Properties: ng_DIProperties({
          "DropDown":         { Level: 'basic' },
          "Data": {
            "DropDownWidth":  { Level: 'basic' },
            "DropDownAlign":  { Level: 'basic' },
            "DropDownType":   { Level: 'optional' }
          },
          "OverrideEvents": {
            // ngList DropDown Events
            "OnListItemGetText":  { Level: 'basic' }
          },
          "Events": {
            "OnDropDown":     { Level: 'basic' },
            "OnHideDropDown": { Level: 'basic' },

            // ngList DropDown Events
            "OnListItemChanged": { Level: 'basic' }
          }
        })
      };
    }

    ngRegisterControlDesignInfo('ngDropDownList',function(d,c,ref) {
      var di={
        NewControl: {
          Default: {
            Properties: {
              "DropDown": {
                ObjectProperties: {
                  "Type": "'ngList'"
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "DropDownType": {
            Types: {
              'identifier': {
                DefaultValue: 'ngeDropDownList'
              },
              'integer': {
                DefaultValue: 1
              }
            }
          }
        })
      };
      ng_MergeDI(di,DropDownDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('ngDropDown',function(d,c,ref) {
      var di={
        NewControl: {
          Default: {
            Properties: {
              "Data": {
                ObjectProperties: {
                  "Text": { ValueByRefName: true }
                }
              },
              "DropDown": {
                ObjectProperties: {
                  "Type": "'ngList'"
                }
              }
            }
          }
        }
      };
      ng_MergeVar(di,DropDownDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('ngEditNum',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "ArrowsAlign": ng_DIPropertyStrings('right', ['left','right','both'], { Level: 'basic' }),
          "Arrows": ng_DIPropertyStrings('leftright', ['none','leftright','updown'], { Level: 'basic' }),
          "Data": {
            "Step": ng_DIProperty('integer', 1, { Level: 'basic' }),
            "StepRound": ng_DIPropertyBool(false, { Level: 'basic' }),
            "MinNum": { DefaultType: 'integer', Level: 'basic' },
            "MaxNum": { DefaultType: 'integer', Level: 'basic' },
            "DefaultNum": { DefaultType: 'integer', Level: 'basic' }
          },
          "Methods": {
            "DoDown": ng_DIProperty('function','function() { ng_CallParent(this, "DoDown", arguments); }'),
            "DoUp": ng_DIProperty('function','function() { ng_CallParent(this, "DoUp", arguments); }')
          },
          "OverrideEvents": {
            "OnGetNum": ng_DIPropertyEvent('function(c) { return 0; }')
          },
          "Events": {
            "OnSetNum": ng_DIPropertyEvent('function(c, num) {  }'),
            "OnUp": ng_DIPropertyEvent('function(e, num) { return true; }', { Level: 'basic' }),
            "OnDown": ng_DIPropertyEvent('function(e, num) { return true; }', { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngSysAction',function(d,c,ref) {
      return {
        ControlCategory: 'System',
        BaseControl: 'ngSysAction',
        NewControl: {
          Default: {
            Properties: {
              "L": {},
              "T": {},
              "ID": { ValueByRefName: true }
            }
          }
        },
        Properties: ng_DIProperties({
          "ID": { Level: 'basic' },
          "Data": {
            "ngText": { DefaultType: 'string', Level: 'advanced',
              Types: {
                'string': {
                  Editor: 'ngfeEditor_Lang'
                }
              }
            },
            "ngTextD": { DefaultType: 'string', Level: 'basic',
              Types: {
                'string': {
                  Editor: 'ngfeEditor_Lang'
                }
              }
            },
            "ngAlt": { DefaultType: 'string', Level: 'advanced',
              Types: {
                'string': {
                  Editor: 'ngfeEditor_Lang'
                }
              }
            },
            "ngAltD": { DefaultType: 'string', Level: 'basic',
              Types: {
                'string': {
                  Editor: 'ngfeEditor_Lang'
                }
              }
            },
            "Text": ng_DIPropertyRefName({ Level: 'basic' }),
            "Alt": { DefaultType: 'string', Level: 'basic' },
            "Checked": ng_DIPropertyValues('integer', 0, ['Unchecked','Checked','Grayed'], { Level: 'basic',
              Types: {
                'integer': {
                   InitValue: 1
                 }
              }
            }),
            "RadioGroup": { DefaultType: 'undefined', InitType: 'string', Level: 'basic'
              // TODO: browse from existing radio groups
            },
            "Img": { DefaultType: 'image', Level: 'basic' },
            "Visible": ng_DIPropertyBool(true, { Level: 'basic' })
          },
          "Events": {
            "OnClick": ng_DIPropertyEvent('function(e) { }', { Level: 'basic' }),
            "OnCheckChanged": ng_DIPropertyEvent('function(c) { }', { Level: 'basic' }),
            "OnSetVisible": ng_DIPropertyEvent('function(c, v) { return true; }'),
            "OnVisibleChanged": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' }),
            "OnUpdate": ng_DIPropertyEvent('function(c) { return true; }')
          },
          "OverrideEvents": {
            "OnSetText": ng_DIPropertyEvent('function(text, c) { return text; }'),
            "OnGetText": ng_DIPropertyEvent('function(c) { return ""; }',{ Level: 'basic' }),
            "OnGetAlt": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetImg": ng_DIPropertyEvent('function(c, idx) { return null; }', { Level: 'basic' })
          }
        })
      }
    });
 }
};