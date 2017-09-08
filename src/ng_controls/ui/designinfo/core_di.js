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
    var undefined;
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
            "Shape": ng_diStringValues('rect', ['rect','circle','poly'], { Level: 'basic', Order: 0.4 }),
            "Coords": ng_diString('', { Level: 'basic', Order: 0.41 }),
            "Alt": ng_diString('', { Level: 'basic' }),
            "OnClick": ng_diEvent('function(e) { return true; }', { Level: 'basic' })
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
            "id": ng_diMixed(['undefined','string'], { InitType: 'string', Level: 'basic' }),
            "Text": ng_diMixed(['undefined','string'], { InitType: 'string', Level: 'basic', Order: 0.4 }),
            "Alt":  ng_diMixed(['undefined','string'], { InitType: 'string', Level: 'basic' }),
            "Visible": ng_diBoolean(true, { Level: 'basic' }),
            "Enabled": ng_diBoolean(true, { Level: 'basic' }),
            "ControlsPanel": ng_diControl('ngPanel', null, { Level: 'advanced', IsContainer: false }),
            "W": ng_diMixed(['undefined','bounds'], { InitType: 'bounds_integer', Level: 'basic' }),
            "H": ng_diMixed(['undefined','bounds'], { InitType: 'bounds_integer', Level: 'basic' }),
            "MinWidth": ng_diMixed(['undefined', 'integer'], { InitType: 'integer', Level: 'basic' }),
            "Controls": ng_diControls(undefined, { Level: 'basic', ContainerProperty: true }, {
              DestroyIfEmpty: true,
              ChildDesignInfo: {
                PropertyGroup: 'Controls'
              }
            })
          }
        }
      }
    ];
    FormEditor.RegisterPropertyType(types);
  },
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;
    var undefined;

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
          "Data": ng_diObject({
            "ChildHandling": { Level: 'optional' },
            "FormID": ng_diString('', { Level: 'optional' })
          })
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
        Properties: ng_diProperties({
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
            "TextAlign": ng_diStringValues('left', ['left','right','center','justify'], { Level: 'basic' }),
            "AutoSize": ng_diBoolean(false),
            "AutoSizeMode": ng_diStringValues('auto', ['auto','horizontal','vertical']),
            "MinWidth": ng_diMixed(['undefined', 'integer'], { InitType: 'integer' }),
            "MinHeight": ng_diMixed(['undefined', 'integer'], { InitType: 'integer' }),

            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'basic' },
            "Text": ng_diStringRefName({ Level: 'basic' }, { Editor: 'ngfeEditor_Text' }),
            "ngAlt": { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": ng_diString('', { Level: 'basic' }),
            "HTMLEncode": ng_diBoolean(ngVal(ngDefaultHTMLEncoding,false), { Level: 'basic' }),
            "CanSelect": ng_diBoolean(true, { Level: 'basic' })
          },
          "OverrideEvents": {
            "OnSetText": ng_diEvent('function(text, c) { return text; }'),
            "OnGetText": ng_diEvent('function(c) { return ""; }',{ Level: 'basic' }),
            "OnGetAlt": ng_diEvent('function(c) { return ""; }', { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngImage',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        BaseControl: 'ngImage',
        Properties: ng_diProperties({
          "Data": {
            "ngAlt":  { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": ng_diString('', { Level: 'basic' }),
            "AutoSize": ng_diBoolean(true),
            "Img": ng_diType('image', { Level: 'basic' })
          },
          "OverrideEvents": {
            "OnGetImg": ng_diEvent('function(c) { return null; }', { Level: 'basic' }),
            "OnGetAlt": ng_diEvent('function(c) { return ""; }', { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngImageMap',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        BaseControl: 'ngImageMap',
        Properties: ng_diProperties({
          "Data": {
            "ngAlt":  { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": ng_diString('', { Level: 'basic' }),
            "AutoSize": ng_diBoolean(true),
            "Img": ng_diType('image', { Level: 'basic' }),
            "Cursor": ng_diType('css_cursor', { Level: 'basic' }),
            "Shapes": ng_diArrayOf('ngImageShape', { Level: 'basic' })
          },
          "Events": {
            "OnShapeClick": ng_diEvent('function(e) { }', { Level: 'basic' }),
            "OnMouseEnter":  { },
            "OnMouseLeave":  { },
            "OnMouseShapeEnter": ng_diEvent('function(c, shapeidx) { }'),
            "OnMouseShapeLeave": ng_diEvent('function(c, shapeidx) { }')
          },
          "OverrideEvents": {
            "OnGetImg": ng_diEvent('function(c) { return null; }', { Level: 'basic' }),
            "OnGetAlt": ng_diEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetShapeAlt": ng_diEvent('function(c, shapeidx) { return ""; }', { Level: 'basic' })
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
        Properties: ng_diProperties({
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
            "Action": ng_diString('', { Level: 'basic' }), // TODO: browse from existing actions
            "TextAlign": ng_diStringValues('center', ['left','right','center'], { Level: 'basic' }),
            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'basic' },
            "Text": ng_diStringRefName({ Level: 'basic' }),
            "ngAlt":  { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": ng_diString('', { Level: 'basic' }),
            "HTMLEncode": ng_diBoolean(ngVal(ngDefaultHTMLEncoding,false), { Level: 'basic' }),
            "AutoSize": ng_diBoolean(true),
            "MinWidth": ng_diMixed(['undefined', 'integer'], { InitType: 'integer' }),
            "Checked": ng_diTypeValues('integer', 0, ['Unchecked','Checked','Grayed'], { Level: 'basic' }, { InitValue: 1 }),
            "RadioGroup": ng_diMixed(['undefined', 'string'], { InitType: 'string' }), // TODO: browse from existing radio groups
            "Cursor": ng_diTypeVal('css_cursor', 'pointer', { Level: 'basic' }),
            "ReadOnly": ng_diBoolean(false, { Level: 'basic' }),
            "Img": ng_diType('image', { Level: 'basic' }),
            "ImgAlign": ng_diStringValues('left', ['left','right'], { Level: 'basic' }),
            "ImgIndent": ng_diInteger(0, { Level: 'basic' }),
            "LeftImg": ng_diType('image', { Level: 'basic' }),
            "MiddleImg": ng_diType('image', { Level: 'basic' }, {
              EditorOptions: {
                HorizontalImages: true
              }
            }),
            "RightImg": ng_diType('image', { Level: 'basic' }),
            "Default": ng_diBoolean(false, { Level: 'basic' }),
            "Cancel": ng_diBoolean(false, { Level: 'basic' })
          },
          "Events": {
            "OnCheckChanged": ng_diEvent('function(c) { }', { Level: 'basic' }),
            "OnDblClick": ng_diEvent('function(e) { }', { Level: 'basic' }),
            "OnClick": ng_diEvent('function(e) { }', { Level: 'basic' }),
            "OnMouseEnter": { },
            "OnMouseLeave": { }
          },
          "OverrideEvents": {
            "OnSetText": ng_diEvent('function(text, c) { return text; }'),
            "OnGetText": ng_diEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetAlt": ng_diEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetImg": ng_diEvent('function(c, idx) { return null; }', { Level: 'basic' }),
            "OnGetClassName": ng_diEvent('function(c, cls, text) { return cls; }', { Level: 'basic' })
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
        Properties: ng_diProperties({
          "ParentReferences": { Level: 'advanced' },
          "W": { Exclude: ['CW'] },
          "H": { Exclude: ['CH'] },
          "CW": ng_diInteger(0, { Order: 0.141, Exclude: ['W'] }),
          "CH": ng_diInteger(0, { Order: 0.142, Exclude: ['H'] }),
          "ControlsPanel": ng_diControl('ngPanel', undefined, { Level: 'advanced', IsContainer: false }),
          "Data": {
            "ChildHandling": { Level: 'advanced' },
            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'basic' },
            "Text": ng_diStringRefName({ Level: 'basic' }),
            "HTMLEncode": ng_diBoolean(ngVal(ngDefaultHTMLEncoding,false), { Level: 'basic' }),
            "Frame": ng_diType('img_frame', { Level: 'basic', Collapsed: true }),
            "ControlsInside": ng_diBoolean(true, { Level: 'basic' })
          },
          "OverrideEvents": {
            "OnSetText": ng_diEvent('function(text, c) { return text; }'),
            "OnGetText": ng_diEvent('function(c) { return ""; }', { Level: 'basic' })
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
        Properties: ng_diProperties({
          "H": null,
          "Buttons": ng_diArrayOfControls(
            ng_diControl(undefined, ng_diProperties({
              "Data": {
                "ButtonAlign": ng_diStringValues('right', ['left','right'], { Level: 'basic', Order: 0.8 })
              }
            }), { Level: 'basic', PropertyGroup: 'Controls' }, { InheritedFrom: 'ngButton' }),
            { Level: 'basic', Collapsed: false, PropertyGroup: 'Controls' }, { DestroyIfEmpty: true }),
          "DropDown": ng_diControl(undefined, undefined, { PropertyGroup: 'Controls' }),
          "Data": {
            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'optional' },
            "Text": ng_diStringRefName({ Level: 'basic' }),
            "DefaultText": ng_diString('', { Level: 'basic' }),
            "TextAlign": ng_diStringValues('left', ['left','right','center'], { Level: 'basic' }),
            "ngAlt":  { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": ng_diString('', { Level: 'basic' }),
            "ngHint":  { Level: 'advanced' },
            "ngHintD": { Level: 'basic' },
            "Hint": ng_diString('', { Level: 'basic' }),
            "HintStyle": ng_diIntegerIdentifiers(ngVal(ngDefaultHintStyle,1),['ngHintHideOnFocus','ngHintHideOnInput'],{ Level: 'basic' }),
            "ReadOnly": ng_diBoolean(false, { Level: 'basic' }),
            "Password": ng_diBoolean(false, { Level: 'basic' }),
            "MaxLength": ng_diInteger(0, { Level: 'basic' }),
            "LeftImg": ng_diType('image', { Level: 'basic' }),
            "MiddleImg": ng_diType('image', { Level: 'basic' }, {
               EditorOptions: {
                 HorizontalImages: true
               }
            }),
            "RightImg": ng_diType('image', { Level: 'basic' }),
            "OffsetTop": ng_diInteger(0, { Level: 'basic' }),
            "SelectOnFocus": ng_diBoolean(true, { Level: 'basic' }),
            "DropDownType": ng_diIntegerIdentifiers(0,['ngeDropDownEdit','ngeDropDownList']),
            "DropDownWidth": ng_diMixed(['undefined', 'integer'], { InitType: 'integer' }),
            "DropDownAlign": ng_diStringValues('left', ['left','right']),
            "LockHintCaretPos": ng_diBoolean(true, { Level: 'basic' }),
            "Invalid": ng_diBoolean(false, { Level: 'basic' }),
            "Suggestion": ng_diBoolean(false),
            "SuggestionDelay": ng_diInteger(200),
            "SuggestionSearchColumn": ng_diString(),
            "SuggestionIgnoreCase": ng_diBoolean(true),
            "SuggestionPartial": ng_diTypeValues('integer',2,[{Value:2,Text:'Contains'},{Value:1,Text:'Starts With'},{Value:0,Text:'Equals'},{Value:-1,Text:'Custom'}]),
            "SuggestionURL": ng_diType('url'),
            "SuggestionType": ng_diString()
          },
          "Methods": {
            "DoFocus": ng_diFunction('function(e, elm) { ng_CallParent(this, "DoFocus", arguments); }'),
            "DoBlur": ng_diFunction('function(e, elm) { ng_CallParent(this, "DoBlur", arguments); }'),
            "DoUpdateImages": ng_diFunction('function() { ng_CallParent(this, "DoUpdateImages", arguments); }'),
            "DoSetInvalid": ng_diFunction('function(state, update) { ng_CallParent(this, "DoSetInvalid", arguments); }')
          },
          "OverrideEvents": {
            "OnSetText": ng_diEvent('function(text, c) { return text; }'),
            "OnGetText": ng_diEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetAlt": ng_diEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetHint": ng_diEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetClassName": ng_diEvent('function(c, cls, text, hint) { return cls; }', { Level: 'basic' }),
            "OnGetImg": ng_diEvent('function(c, idx) { return null; }', { Level: 'basic' }),
            "OnSuggestionSetText": ng_diEvent('function(text, it) { return text; }'),
            "OnSuggestionURL": ng_diEvent('function(c, url) { return url; }'),

            // ngList DropDown Events
            "OnListItemGetText":  ng_diEvent('function(c, list, it, t) { return t; }',{ Level: 'optional' })
          },
          "Events": {
            "OnTextChanged": ng_diEvent('function(c) { }', { Level: 'basic' }),
            "OnDropDown": ng_diEvent('function(c, dd) { return true; }'),
            "OnHideDropDown": ng_diEvent('function(c, dd) { return true; }'),
            "OnClickOutside": { },
            "OnKeyDown": ng_diEvent('function(e, elm) { return true; }', { Level: 'basic' }),
            "OnKeyUp": ng_diEvent('function(e, elm) { return true; }', { Level: 'basic' }),
            "OnKeyPress": ng_diEvent('function(e, elm) { return true; }', { Level: 'basic' }),
            "OnMouseEnter": { },
            "OnMouseLeave": { },
            "OnFocus": ng_diEvent('function(c) { }', { Level: 'basic' }),
            "OnBlur": ng_diEvent('function(c) { }', { Level: 'basic' }),
            "OnSetInvalid": ng_diEvent('function(c, state, update) { return true; }', { Level: 'basic' }),
            "OnSetReadOnly": ng_diEvent('function(c, state) { return true; }', { Level: 'basic' }),
            "OnReadOnlyChanged": ng_diEvent('function(c, state) { }', { Level: 'basic' }),
            "OnSuggestionSearch": ng_diEvent('function(c, txt, res) { return true; }'),
            "OnSuggestionCompareItem": ng_diEvent('function(c, txt, itemtxt, list, it, parent) { return (txt==itemtxt); }'),
            "OnSuggestionResults": ng_diEvent('function(c, txt, data, res) { return true; }'),
            "OnSuggestionData": ng_diEvent('function(c, txt, data) { return true; }'),

            // ngList DropDown Events
            "OnListItemChanged": ng_diEvent('function(c, list, it, ddoli) { return true; }',{ Level: 'optional' })
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
        Properties: ng_diProperties({
          "Data": {
            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'optional' },
            "Text": ng_diStringRefName({ Level: 'basic' }),
            "DefaultText": ng_diString('', { Level: 'basic' }),
            "TextAlign": ng_diStringValues('left', ['left','right','center'], { Level: 'basic' }),
            "ngAlt":  { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": ng_diString('', { Level: 'basic' }),
            "ngHint": { Level: 'advanced' },
            "ngHintD": { Level: 'basic' },
            "Hint": ng_diString('', { Level: 'basic' }),
            "HintStyle": ng_diIntegerIdentifiers(ngVal(ngDefaultHintStyle,1),['ngHintHideOnFocus','ngHintHideOnInput'],{ Level: 'basic' }),
            "ReadOnly": ng_diBoolean(false, { Level: 'basic' }),
            "Frame": ng_diType('img_frame', { Level: 'basic' }),
            "SelectOnFocus": ng_diBoolean(true, { Level: 'basic' }),
            "LockHintCaretPos": ng_diBoolean(true, { Level: 'basic' }),
            "Invalid": ng_diBoolean(false, { Level: 'basic' })
          },
          "Methods": {
            "DoFocus": ng_diFunction('function(e, elm) { ng_CallParent(this, "DoFocus", arguments); }'),
            "DoBlur": ng_diFunction('function(e, elm) { ng_CallParent(this, "DoBlur", arguments); }'),
            "DoUpdateImages": ng_diFunction('function() { ng_CallParent(this, "DoUpdateImages", arguments); }'),
            "DoSetInvalid": ng_diFunction('function(state, update) { ng_CallParent(this, "DoSetInvalid", arguments); }')
          },
          "OverrideEvents": {
            "OnSetText": ng_diEvent('function(text, c) { return text; }'),
            "OnGetText": ng_diEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetAlt": ng_diEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetHint": ng_diEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetClassName": ng_diEvent('function(c, cls, text, hint) { return cls; }', { Level: 'basic' })
          },
          "Events": {
            "OnTextChanged": ng_diEvent('function(c) { }', { Level: 'basic' }),
            "OnKeyDown": ng_diEvent('function(e, elm) { return true; }', { Level: 'basic' }),
            "OnKeyUp": ng_diEvent('function(e, elm) { return true; }', { Level: 'basic' }),
            "OnKeyPress": ng_diEvent('function(e, elm) { return true; }', { Level: 'basic' }),
            "OnMouseEnter": { },
            "OnMouseLeave": { },
            "OnFocus": ng_diEvent('function(c) { }', { Level: 'basic' }),
            "OnBlur": ng_diEvent('function(c) { }', { Level: 'basic' }),
            "OnSetInvalid": ng_diEvent('function(c, state, update) { return true; }', { Level: 'basic' }),
            "OnSetReadOnly": ng_diEvent('function(c, state) { return true; }', { Level: 'basic' }),
            "OnReadOnlyChanged": ng_diEvent('function(c, state) { }', { Level: 'basic' })
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
        Properties: ng_diProperties({
          "Pages": ng_diArrayOf(
            ng_diType('ngPage', {
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
            }), { Level: 'basic', Collapsed: false }),
          "ControlsPanel": ng_diControl('ngPanel', undefined, { Level: 'advanced', IsContainer: false }),
          "Data": {
            "ChildHandling": { Level: 'advanced' },
            "Page": ng_diInteger(0, { Level: 'basic' }),
            "PagesVisible": ng_diBoolean(true, { Level: 'basic' }),
            "PagesIndent": ng_diInteger(0, { Level: 'basic' }),
            "PagesSize": ng_diInteger(0, { Level: 'basic' }),
            "MaxRows": ng_diInteger(0, { Level: 'basic' }),
            "PagesAlign": ng_diStringValues('left', ['left','right'], { Level: 'basic' }),
            "PagesVAlign": ng_diStringValues('top', ['top','bottom'], { Level: 'basic' }),
            "TextAlign": ng_diStringValues('left', ['left','right','center','justify'], { Level: 'basic' }),
            "HTMLEncode": ng_diBoolean(ngVal(ngDefaultHTMLEncoding,false), { Level: 'basic' }),
            "RowOverlap": ng_diInteger(0, { Level: 'basic' }),
            "PageImages": ng_diArrayOf('image', { Level: 'basic' }),
            "Frame": ng_diType('img_frame', { Level: 'basic', Collapsed: true })
          },
          "OverrideEvents": {
            "OnGetText": ng_diEvent('function(c, pg) { return ""; }', { Level: 'basic' }),
            "OnGetAlt": ng_diEvent('function(c, pg) { return ""; }', { Level: 'basic' })
          },
          "Events": {
            "OnPageChanging": ng_diEvent('function(c, page) { return true; }', { Level: 'basic' }),
            "OnPageChanged": ng_diEvent('function(c, oldpage) { return true; }', { Level: 'basic' }),
            "OnClick": ng_diEvent('function(e) { return true; }', { Level: 'basic' }),
            "OnDblClick": ng_diEvent('function(e) { return true; }', { Level: 'basic' })
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
        Properties: ng_diProperties({
          "Data": {
            "ChildHandling": { Level: 'advanced' },
            "AutoSize": ng_diBoolean(false),
            "Vertical": ng_diBoolean(false, { Level: 'basic' }),
            "VPadding": ng_diInteger(0, { Level: 'basic' }),
            "HPadding": ng_diInteger(0, { Level: 'basic' }),
            "VAlign": ng_diStringValues('top', ['top','bottom'], { Level: 'basic' }),
            "HAlign": ng_diStringValues('left', ['left','right'], { Level: 'basic' }),
            "Wrapable": ng_diBoolean(true, { Level: 'basic' })
          }
        },
        {
          "Controls": ng_diControls(undefined, { Level: 'basic' }, {
            ChildDesignInfo: ng_diControl(undefined, ng_diProperties({
              "Data": {
                "ToolBarIgnore": ng_diBoolean(false, { Level: 'basic', Order: 0.8 }),
                "ToolBarAutoUpdate": ng_diBoolean(true, { Level: 'basic', Order: 0.8 }),
                "ToolBarIndent": ng_diMixed(['undefined', 'integer'], { InitType: 'integer', Level: 'basic', Order: 0.8 }),
                "ToolBarHPadding": ng_diMixed(['undefined', 'integer'], { InitType: 'integer', Level: 'basic', Order: 0.8 }),
                "ToolBarVPadding": ng_diMixed(['undefined', 'integer'], { InitType: 'integer', Level: 'basic', Order: 0.8 }),
                "ToolBarWidth": ng_diMixed(['undefined', 'integer'], { InitType: 'integer', Level: 'basic', Order: 0.8 }),
                "ToolBarHeight": ng_diMixed(['undefined', 'integer'], { InitType: 'integer', Level: 'basic', Order: 0.8 }),
                "ToolBarBreak": ng_diBoolean(false, { Level: 'basic', Order: 0.8 }),
                "ToolBarNoWrap": ng_diBoolean(false, { Level: 'basic', Order: 0.8 })
              }
            }))
          })
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
        Properties: ng_diProperties({
          "Data": {
            "Position": ng_diInteger(0, { Level: 'basic' }),
            "Smooth": ng_diBoolean(false, { Level: 'basic' }),
            "LeftImg": ng_diType('image', { Level: 'basic' }),
            "MiddleImg": ng_diType('image', { Level: 'basic' }, {
              EditorOptions: {
                HorizontalImages: true
              }
            }),
            "RightImg": ng_diType('image', { Level: 'basic' }),
            "BarImg": ng_diType('image', { Level: 'basic' }, {
              EditorOptions: {
                HorizontalImages: true
              }
            })
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
        Properties: ng_diProperties({
          "Data": {
            "URL": ng_diType('url', { Level: 'basic' }),
            "DesignLive": ng_diBoolean(false, { Level: 'basic', Order: 0.95 })
          },
          "OverrideEvents": {
            "OnGetURL": ng_diEvent('function(c, url) { return url; }', { Level: 'basic' }),
            "OnSetHTML": ng_diEvent('function(c, html) { return html; }', { Level: 'basic' })
          },
          "Events": {
            "OnSetURL": ng_diEvent('function(c, url) { return true; }', { Level: 'basic' })
          }

        })
      };
    });

    // Derived controls

    ngRegisterControlDesignInfo('ngFrame',function(d,c,ref) {
      var di={
        Properties: {
          "ParentReferences": ng_diBoolean(false, { Level: 'optional' }),
          "Data": ng_diObject({
            "ChildHandling": { Level: 'optional' },
            "FormID": ng_diString('', { Level: 'optional' })
          })
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
        Properties: ng_diProperties({
          "Data": {
            "RadioGroup": ng_diString('default', { Level: 'basic' }),
            "AllowGrayed": ng_diBoolean(false, { Level: 'basic' }),
            "RadioAllowUncheck": ng_diBoolean(false, { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngCheckBox',function(d,c,ref) {
      return {
        Properties: ng_diProperties({
          "Data": {
            "AllowGrayed": ng_diBoolean(false, { Level: 'basic' })
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
        Properties: ng_diProperties({
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
        Properties: ng_diProperties({
          "DropDownType": ng_diMixed([
            ng_diIdentifier('ngeDropDownList'),
            ng_diInteger(1)
          ])
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
        Properties: ng_diProperties({
          "ArrowsAlign": ng_diStringValues('right', ['left','right','both'], { Level: 'basic' }),
          "Arrows": ng_diStringValues('leftright', ['none','leftright','updown'], { Level: 'basic' }),
          "Data": {
            "Step": ng_diInteger(1, { Level: 'basic' }),
            "StepRound": ng_diBoolean(false, { Level: 'basic' }),
            "MinNum": ng_diInteger(0, { Level: 'basic' }),
            "MaxNum": ng_diInteger(0, { Level: 'basic' }),
            "DefaultNum": ng_diInteger(0, { Level: 'basic' })
          },
          "Methods": {
            "DoDown": ng_diFunction('function() { ng_CallParent(this, "DoDown", arguments); }'),
            "DoUp": ng_diFunction('function() { ng_CallParent(this, "DoUp", arguments); }')
          },
          "OverrideEvents": {
            "OnGetNum": ng_diEvent('function(c) { return 0; }')
          },
          "Events": {
            "OnSetNum": ng_diEvent('function(c, num) {  }'),
            "OnUp": ng_diEvent('function(e, num) { return true; }', { Level: 'basic' }),
            "OnDown": ng_diEvent('function(e, num) { return true; }', { Level: 'basic' })
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
        Properties: ng_diProperties({
          "ID": { Level: 'basic' },
          "Data": {
            "ngText": ng_diString('', { Level: 'advanced' }, { Editor: 'ngfeEditor_Lang' }),
            "ngTextD": ng_diString('', { Level: 'basic' }, { Editor: 'ngfeEditor_Lang' }),
            "ngAlt": ng_diString('', { Level: 'advanced' }, { Editor: 'ngfeEditor_Lang' }),
            "ngAltD": ng_diString('', { Level: 'basic' }, { Editor: 'ngfeEditor_Lang' }),
            "Text": ng_diStringRefName({ Level: 'basic' }),
            "Alt": ng_diString('', { Level: 'basic' }),
            "Checked": ng_diTypeValues('integer', 0, ['Unchecked','Checked','Grayed'], { Level: 'basic' }, { InitValue: 1 }),
            "RadioGroup": ng_diMixed(['undefined', 'string'], { InitType: 'string', Level: 'basic' }), // TODO: browse from existing radio groups
            "Img": ng_diType('image', { Level: 'basic' }),
            "Visible": ng_diBoolean(true, { Level: 'basic' })
          },
          "Events": {
            "OnClick": ng_diEvent('function(e) { }', { Level: 'basic' }),
            "OnCheckChanged": ng_diEvent('function(c) { }', { Level: 'basic' }),
            "OnSetVisible": ng_diEvent('function(c, v) { return true; }'),
            "OnVisibleChanged": ng_diEvent('function(c) {}', { Level: 'basic' }),
            "OnUpdate": ng_diEvent('function(c) { return true; }')
          },
          "OverrideEvents": {
            "OnSetText": ng_diEvent('function(text, c) { return text; }'),
            "OnGetText": ng_diEvent('function(c) { return ""; }',{ Level: 'basic' }),
            "OnGetAlt": ng_diEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetImg": ng_diEvent('function(c, idx) { return null; }', { Level: 'basic' })
          }
        })
      }
    });
 }
};