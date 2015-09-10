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
  // functions for creating basic component design info
  window.ngControlDesignInfo = function(obj)
  {
    if((!ngHASDESIGNINFO())||(!obj)||(typeof obj.DesignInfo !== 'undefined')) return;

    obj.DesignInfo = {
      // basic control create properties
      AddData: {
        InitProperties: {
          L: {},
          T: {}
        }
      },

      // list of basic control properties
      Properties: {
        Type: { type: 'string', readOnly: true },
        L: { type: ['integer','string'], cType: 'feBoundsEditNum', dVal: '0', help: "To set relative bounds write number + %" },
        T: { type: ['integer','string'], cType: 'feBoundsEditNum', dVal: '0' },
        W: { type: ['integer','string'], cType: 'feBoundsEditNum', dVal: '150' },
        H: { type: ['integer','string'], cType: 'feBoundsEditNum', dVal: '100' },
        R: { type: ['integer','string'], cType: 'feBoundsEditNum', dVal: '0' },
        B: { type: ['integer','string'], cType: 'feBoundsEditNum', dVal: '0' },
        id: { type: 'string', lvl: 3 },
        className: { type: 'string', lvl: 2 },
        style: { type: 'object', dVal: '{}', lvl: 2 },
        Opacity: { type: 'real', dVal: '1', lvl: 2 },
        ScrollBars: { type: 'integer', dVal: 'ssNone', lvl: 2, readOnly: true,
          items: ['ssNone','ssDefault','ssAuto','ssBoth','ssHorizontal','ssVertical']
        },
        ParentReferences: { type: 'boolean', dVal: 'true' },
        innerHTML: { type: 'string', lvl: 3 },
        OnCreateHTMLElement: { type: 'function', dVal: 'function(props, ref, c) {}', lvl: 3 },
        Data: {
          properties: {
            Enabled: { type: 'boolean' },
            Visible: { type: 'boolean' }
          }
        },
        Controls: { type: 'group', lvl: 3 },
        OnCreated: { type: 'function', dVal: 'function(c, refs, options) {}', lvl: 2 },
        Events: { lvl: 2,
          properties: {
            OnSetEnabled: { type: 'function', dVal: 'function(c, v, p) { return true; }', lvl: 2 },
            OnEnabledChanged: { type: 'function', dVal: 'function(c, p) { }', lvl: 2 },
            OnSetVisible: { type: 'function', dVal: 'function(c, v) { return true; }', lvl: 2 },
            OnVisibleChanged: { type: 'function', dVal: 'function(c) { }', lvl: 2 },
            OnUpdate: { type: 'function', dVal: 'function(c) { return true; }', lvl: 2 },
            OnUpdated: { type: 'function', dVal: 'function(c, o) { }', lvl: 2 },
            OnMouseEnter: { type: 'function', dVal: 'function(c) { }', lvl: 2 },
            OnMouseLeave: { type: 'function', dVal: 'function(c) { }', lvl: 2 }
          }
        }
      }
    };

    //menu.js ngControl extension
    if ((ngUserControls)&&(typeof ngUserControls['menu'] !== 'undefined'))
    {
      obj.DesignInfo.Properties.Menu = { type: 'object', lvl: 2 };
      obj.DesignInfo.Properties.PopupMenu = { type: 'object', lvl: 2 };
    }
  };

  window.ngSysControlDesignInfo = function(obj)
  {
    if((!ngHASDESIGNINFO())||(!obj)||(typeof obj.DesignInfo !== 'undefined')) return;

    obj.DesignInfo = {
      NonVisual: true,
      ControlCategory: 'System',
      AddData: {
        InitProperties: {
          ID: { value: '' },
          L: {},
          T: {}
        }
      },
      Properties: {
        Type: { type: 'string', readOnly: true },
        L: { type: ['integer','string'], cType: 'feBoundsEditNum', dVal: '0' },
        T: { type: ['integer','string'], cType: 'feBoundsEditNum', dVal: '0' },
        R: { type: ['integer','string'], cType: 'feBoundsEditNum', dVal: '0' },
        B: { type: ['integer','string'], cType: 'feBoundsEditNum', dVal: '0' },
        ID: { type: 'string' },
        OnCreated: { type: 'function', dVal: 'function(c, refs, options) {}', lvl: 2 },
        Data: {
          properties: {
            Enabled: { type: 'boolean' }
          }
        },
        Events: {
          properties: {
            OnSetEnabled: { type: 'function', dVal: 'function(c, v, p) { return true; }' },
            OnEnabledChanged: { type: 'function', dVal: 'function(c, p) { }' }
          }
        }
      }
    };
  };


  if(typeof ngUserControls === 'undefined') ngUserControls = new Array();
  ngUserControls['controls_designinfo'] = {
    OnControlCreated: function(def, c) {
      if(!ngHASDESIGNINFO()) return;

      if (typeof FormEditor==='undefined') FormEditor = {};

      FormEditor.PropertiesOrderPriority = ngNullVal(FormEditor.PropertiesOrderPriority, [
        'Type',
        'ID',
        'L', 'T', 'W', 'H', 'R', 'B', 'CW', 'CH',
        'id',
        'Theme', 'ColorScheme', 'BackgroundColor',
        'Namespace',
        'ServerURL',
        'ActiveCommand',
        'DefaultValues',
        'FieldDefs', 'ViewModel', 'DBViewModel',
        'EditButtons',
        'ErrorHint',
        'className', 'style', 'Opacity',
        'ScrollBars',
        'ParentReferences',
        'innerHTML',
        'OnCreateHTMLElement',
        'OnCreated',
        'TreeImg',
        'DropDown',
        'ArrowsAlign',
        'Arrows',
        'DroppedDown',
        'Mover',
        'CloseBtn', 'HelpBtn', 'MaxBtn', 'MinBtn',
        'Menu', 'PopupMenu',
        'ButtonDef',
        'Data',
        'DataBind',
        'Pages',
        'ControlsPanel', 'ControlsPanel1', 'ControlsPanel2', 'Controls1', 'Controls2', 'Controls',
        'Events'
      ]);


      // add package-dependend design info
      def = ngVal(def, {});
      def.DesignInfo = ngVal(def.DesignInfo, {});
      def.DesignInfo.Properties = ngVal(def.DesignInfo.Properties, {});
      if (def && def.DesignInfo && def.DesignInfo.Properties)
      {
        if ((ngUserControls)&&(typeof ngUserControls['dbviewmodel'] !== 'undefined'))
        {
          def.DesignInfo.Properties.DBViewModel = { type: 'string' };
        }

        if ((ngUserControls)&&(typeof ngUserControls['viewmodel_controls'] !== 'undefined'))
        {
          var props = {
            Visible: { type: 'string' },
            Enabled: { type: 'string' },
            Disabled: { type: 'string', lvl: 2 },
            ReadOnly: { type: 'string' },

            Focus: { type: 'string' },
            MouseOver: { type: 'string', lvl: 2, databind_function: true },
            Data: { type: 'string', lvl: 2 },
            Link: { type: 'string', lvl: 2 },
            OnClick: { type: 'string', databind_function: true }
          };

          if (c) {
            if (typeof c.SetText === 'function') {
              props.Text = { type: 'string' };
              props.ngText = { type: 'string', lvl: 2 };
              props.Alt = { type: 'string' };
              props.ngAlt = { type: 'string', lvl: 2 };
              props.Hint = { type: 'string' };
              props.ngHint = { type: 'string', lvl: 2 };
            }

            if (typeof c.SetInvalid === 'function') {
              props.Invalid = { type: 'string' };
              props.Valid = { type: 'string', lvl: 2 };
            }

            var instantUpdateProperty = { type: 'boolean', dVal: 'false', ignoreDataModel: true },
                delayedUpdateProperty = { type: 'integer', cType: 'feEdit', dVal: '500', ignoreDataModel: true };

            switch (c.DefType) {
              case 'ngEdit':
                props.InstantUpdate = instantUpdateProperty;
                props.DelayedUpdate = delayedUpdateProperty;
                props.Lookup = { type: 'string' };
                break;
              case 'ngMemo':
                props.InstantUpdate = instantUpdateProperty;
                props.DelayedUpdate = delayedUpdateProperty;
                break;
              case 'ngList':
                props.Value = { type: 'string' };
                props.Selected = { type: 'string' };
                props.Checked = { type: 'string' };
                break;
              case 'ngButton':
              case 'ngSysAction':
                props.Value = { type: 'string' };
                props.Checked = { type: 'string' };
                props.Command = { type: 'string' };
                break;

              case 'ngPages':
              case 'ngWebBrowser':
              case 'ngProgressBar':
              case 'ngCalendar':
                props.Value = { type: 'string' };
                break;
              default:
                if (typeof c.SetText === 'function') {
                  props.Value = { type: 'string' };
                }
                break;
            }
          }

          if ((typeof CodeMirrorIntegration !== 'undefined')&&(typeof CodeMirrorIntegration.RunningInNetBeans === 'function')&&(CodeMirrorIntegration.RunningInNetBeans()))
            for (var i in props) {
              if (props[i].ignoreDataModel) continue;
              props[i].cType = 'feDropDown';
            }

          def.DesignInfo.Properties.ViewModel = { type: 'string' };
          def.DesignInfo.Properties.DataBind = {
            dVal: 'ng_Bindings({})',
            properties: props
          };
        }
      }


      var di;
      switch(c.DefType)
      {
        case 'ngPanel':
          di = {
            BasicComponent: c.DefType,
            ControlCategory: 'Containers',
            AddData: {
              InitProperties: {
                W: {}, H: {}, Controls: {}
              }
            },
            Properties: {
              Controls: { lvl: 1 }
            }
          };
          break;

        case 'ngText':
          di = {
            ControlCategory: 'Labels',
            AddData: {
              InitProperties: {
                'Data': {},
                'Data.Text': { value: 'Text' }
              }
            },
            Properties: {
              Data: {
                properties: {
                  TextAlign: { type: 'string', dVal: 'left', readOnly: true,
                    items: ['left', 'center', 'right']
                  },
                  AutoSize: { type: 'boolean', dVal: 'false', lvl: 2 },
                  AutoSizeMode: { type: 'string', dVal: 'auto', lvl: 2, readOnly: true,
                    items: [ 'auto', 'horizontal', 'vertical']
                  },
                  MinWidth: { type: 'integer', dVal: 'undefined', lvl: 2 },
                  MinHeight: { type: 'integer', dVal: 'undefined', lvl: 2 },
                  Text: { type: 'string' },
                  ngText: { type: 'string' },
                  ngTextD: { type: 'string', lvl: 2 },
                  Alt: { type: 'string', lvl: 2 },
                  ngAlt: { type: 'string', lvl: 2 },
                  ngAltD: { type: 'string', lvl: 2 },
                  HTMLEncode: { type: 'boolean', dVal: 'false', lvl: 3 },
                  CanSelect: { type: 'boolean', lvl: 2 }
                }
              },
              Events: {
                properties: {
                  OnSetText: { type: 'function', dVal: 'function(text, c) { return text; }' },
                  OnGetText: { type: 'function', dVal: 'function(c) { return c.Text; }' },
                  OnGetAlt: { type: 'function', dVal: 'function(c) { return c.Alt; }' }
                }
              }
            }
          };
          break;

        case 'ngImage':
          di = {
            BasicComponent: c.DefType,
            ControlCategory: 'Misc',
            AddData: {
              InitProperties: {
                'Data': {},
                'Data.Img': { value: "{L:0,T:0,W:50,H:50,Src:''}" }
              }
            },
            Properties: {
              Data: {
                properties: {
                  Alt: { type: 'string' },
                  ngAlt: { type: 'string' },
                  ngAltD: { type: 'string', lvl: 2 },
                  AutoSize: { type: 'boolean' },
                  Img: { type: 'object' }
                }
              },
              Events: {
                properties: {
                  OnGetAlt: { type: 'function', dVal: 'function(c) { return c.Alt; }' },
                  OnGetImg: { type: 'function', dVal: 'function(c) { return c.Img; }' }
                }
              }
            }
          };
          break;

        case 'ngImageMap':
          di = {
            BasicComponent: c.DefType,
            ControlCategory: 'Misc',
            Properties: {
              Data: {
                properties: {
                  Alt: { type: 'string' },
                  ngAlt: { type: 'string' },
                  ngAltD: { type: 'string', lvl: 2 },
                  AutoSize: { type: 'boolean' },
                  Img: { type: 'object' },
                  Cursor: { type: 'string', dVal: '' },
                  Shapes: { type: 'array' }
                }
              },
              Events: {
                properties: {
                  OnGetAlt: { type: 'function', dVal: 'function(c) { return c.Alt; }' },
                  OnGetImg: { type: 'function', dVal: 'function(c) { return c.Img; }' },
                  OnGetShapeAlt: { type: 'function', dVal: 'function(c, i) { return c.Shapes[i]; }' },
                  OnShapeClick: { type: 'function', dVal: 'function(c, i) { return c.Shapes[i]; }' },
                  OnMouseEnter: { type: 'function', dVal: 'function(c) { }', lvl: 1 },
                  OnMouseLeave: { type: 'function', dVal: 'function(c) { }', lvl: 1 },
                  OnMouseShapeEnter: { type: 'function', dVal: 'function(p, bi) { }' },
                  OnMouseShapeLeave: { type: 'function', dVal: 'function(p, bi) { }' }
                }
              }
            }
          };
          break;

        case 'ngButton':
          di = {
            ControlCategory: 'Buttons',
            AddData: {
              InitProperties: {
                'Data': {},
                'Data.Text': { value: 'Button' }
              }
            },
            Properties: {
              H: undefined,
              Data: {
                properties: {
                  Action: { type: 'string' },
                  Default: { type: 'boolean' },
                  Cancel: { type: 'boolean' },
                  Text: { type: 'string', dVal: 'Button' },
                  ngText: { type: 'string', dVal: 'Button' },
                  ngTextD: { type: 'string', dVal: 'Button', lvl: 2 },
                  TextAlign: { type: 'string', dVal: 'center', readOnly: true, lvl: 2,
                    items: ['left', 'center', 'right']
                  },
                  Alt: { type: 'string' },
                  ngAlt: { type: 'string' },
                  ngAltD: { type: 'string', lvl: 2 },
                  HTMLEncode: { type: 'boolean', dVal: 'false', lvl: 3 },

                  AutoSize: { type: 'boolean', lvl: 2 },
                  MinWidth: { type: 'integer', dVal: 'undefined', lvl: 3 },
                  Checked: { type: 'integer', dVal: '1', readOnly: true,
                    items: ['0', '1', '2']
                  },
                  RadioGroup: { type: 'string', lvl: 2 },
                  Cursor: { type: 'string', dVal: 'pointer', lvl: 2 },
                  ReadOnly: { type: 'boolean', dVal: 'false', lvl: 2 },
                  Img: { type: 'object' },
                  ImgAlign: { type: 'string', dVal: 'left', lvl: 2,
                    items: ['left', 'center', 'right']
                  },
                  ImgIndent: { type: 'integer', dVal: '0' },
                  LeftImg: { type: 'object' },
                  MiddleImg: { type: 'object' },
                  RightImg: { type: 'object' }
                }
              },
              Events: {
                properties: {
                  OnSetText: { type: 'function', dVal: 'function(text, c) { return text; }', lvl: 2 },
                  OnGetText: { type: 'function', dVal: 'function(c) { return c.Text; }', lvl: 2 },
                  OnGetAlt: { type: 'function', dVal: 'function(c) { return c.Alt; }', lvl: 2 },
                  OnCheckChanged: { type: 'function', dVal: 'function(c) { }' },
                  OnClick: { type: 'function', dVal: 'function(e) { return true; }' },
                  OnDblClick: { type: 'function', dVal: 'function(e) { }' },

                  OnGetImg: { type: 'function', dVal: 'function(c, idx) { return null; }', lvl: 3,
                    help: 'idx values: <br><br>-1 for c.Img,<br>0 for c.LeftImg,<br>1 for c.MiddleImg,<br>2 for c.RightImg.<br>Return value is an image.'
                  },
                  OnGetClassName: { type: 'function', dVal: 'function(c, cls, text) { return c.BaseClassName+cls; }', lvl: 3 }
                }
              }
            }
          };
          break;

        case 'ngGroup':
          di = {
            AddData: {
              InitProperties: {
                W: {}, H: {}, Controls: {},
                Data: {},
                'Data.Text': {}
              }
            },
            ControlCategory: 'Containers',
            Properties: {
              CW: { type: ['integer','string'], cType: 'feBoundsEditNum', dVal: '150', lvl: 2 },
              CH: { type: ['integer','string'], cType: 'feBoundsEditNum', dVal: '100', lvl: 2 },
              ControlsPanel: { type: 'group', lvl: 2 },
              Data: {
                properties: {
                  Text: { type: 'string' },
                  ngText: { type: 'string' },
                  ngTextD: { type: 'string', lvl: 2 },
                  HTMLEncode: { type: 'boolean', dVal: 'false', lvl: 3 },
                  Frame: { type: 'object', dVal: '{}' },
                  ControlsInside: { type: 'boolean' }
                }
              },
              Controls: { lvl: 1 },
              Events: {
                properties: {
                  OnGetText: { type: 'function', dVal: 'function(c) { return c.Text; }', lvl: 1 }
                }
              }
            }
          };
          break;

        case 'ngEdit':
          di = {
            ControlCategory: 'Edits',
            AddData: {
              InitProperties: {
                'W': { value: 80 },
                'Data': {},
                'Data.Text': { value: 'Edit' }
              }
            },
            Properties: {
              DropDown: { type: 'object', cType: 'ngControl', lvl: 3, dVal: "{Type:'ngList'}" },
              Data: {
                properties: {
                  Text: { type: 'string' },
                  ngText: { type: 'string' },
                  ngTextD: { type: 'string', lvl: 2 },
                  DefaultText: { type: 'string' },
                  TextAlign: { type: 'string', dVal: 'left', readOnly: true,
                    items: ['left', 'center', 'right']
                  },
                  Alt: { type: 'string' },
                  ngAlt: { type: 'string' },
                  ngAltD: { type: 'string', lvl: 2 },
                  Hint: { type: 'string' },
                  ngHint: { type: 'string' },
                  ngHintD: { type: 'string', lvl: 2 },
                  HintStyle: { type: 'integer', dVal: '0', lvl: 2 },
                  ReadOnly: { type: 'boolean', dVal: 'false' },
                  Password: { type: 'boolean', dVal: 'false' },
                  MaxLength: { type: 'integer', dVal: '0', lvl: 2 },
                  LeftImg: { type: 'object' },
                  MiddleImg: { type: 'object' },
                  RightImg: { type: 'object' },
                  OffsetTop: { type: 'integer', dVal: '0', lvl: 2 },
                  HasFocus: { type: 'boolean', dVal: 'false', lvl: 2 },
                  SelectOnFocus: { type: 'boolean' },
                  LockHintCaretPos: { type: 'boolean', lvl: 2 },
                  Buttons: { type: 'array', dVal: 'null', lvl: 2 },
                  DropDownType: { type: 'integer', dVal: 'ngeDropDownEdit', readOnly: true, lvl: 3,
                    items: ['ngeDropDownEdit', 'ngeDropDownList']
                  },
                  DropDownControl: { type: 'object', lvl: 3 },
                  DropDownWidth: { type: 'integer', dVal: 'undefined', lvl: 3 },
                  DropDownAlign: { type: 'integer', dVal: 'left', readOnly: true, lvl: 3,
                    items: ['left', 'right']
                  },
                  Suggestion: { type: 'boolean', dVal: 'false', lvl: 2 },
                  SuggestionDelay: { type: 'integer', dVal: '200', lvl: 2 },
                  SuggestionSearchColumn: { type: 'string', lvl: 2 },
                  SuggestionIgnoreCase: { type: 'boolean', lvl: 2 },
                  SuggestionPartial: { type: 'integer', dVal: '2', lvl: 2 },
                  SuggestionURL: { type: 'string', lvl: 2 },
                  SuggestionType: { type: 'string', lvl: 2 }
                }
              },
              Events: {
                properties: {
                  OnSetText: { type: 'function', dVal: 'function(text, c) { return text; }' },
                  OnGetText: { type: 'function', dVal: 'function(c) { return c.Text; }' },
                  OnTextChanged: { type: 'function', dVal: 'function(c) { }' },
                  OnGetAlt: { type: 'function', dVal: 'function(c) { return c.Alt; }', lvl: 2 },
                  OnGetHint: { type: 'function', dVal: 'function(c) { return c.Hint; }', lvl: 2 },
                  OnGetClassName: { type: 'function', dVal: 'function(c, cls, text, hint) { return cls; }', lvl: 2 },
                  OnDropDown: { type: 'function', dVal: 'function(c, l) { return true; }', lvl: 3 },
                  OnHideDropDown: { type: 'function', dVal: 'function(c, l) { return true; }', lvl: 3 },
                  OnClickOutside: { type: 'function', dVal: 'function(dd, pi) { return true; }', lvl: 3 },
                  OnKeyDown: { type: 'function', dVal: 'function(e, elm) { return true; }', lvl: 2 },
                  OnKeyUp: { type: 'function', dVal: 'function(e, elm) { return true; }', lvl: 2 },
                  OnKeyPress: { type: 'function', dVal: 'function(e, elm) { return true; }', lvl: 2 },
                  OnFocus: { type: 'function', dVal: 'function(c) { }' },
                  OnBlur: { type: 'function', dVal: 'function(c) { }' },
                  OnGetImg: { type: 'function', dVal: 'function(c, idx) { return null; }', lvl: 3,
                    help: 'idx values: <br><br>0 for c.LeftImg,<br>1 for c.MiddleImg,<br>2 for c.RightImg.<br>Return value is an image.'
                  },
                  OnSuggestionSetText: { type: 'function', dVal: 'null', lvl: 2 },
                  OnSuggestionSearch: { type: 'function', dVal: 'function(c,txt,res) { return true; }', lvl: 2 },
                  OnSuggestionCompareItem: { type: 'function', dVal: 'function(c,txt,t,list,it,parent) { return true; }', lvl: 2 },
                  OnSuggestionURL: { type: 'function', dVal: 'function(c, url) { return url; }', lvl: 2 },
                  OnSuggestionResults: { type: 'function', dVal: 'function(c,txt,data,res) { return true; }', lvl: 2 },
                  OnSuggestionData: { type: 'function', dVal: 'function(c,txt,data) { return true; }', lvl: 2 },
                  OnSetReadOnly: { type: 'function', dVal: 'function(c,ro) { return true; }', lvl: 2 },
                  OnReadOnlyChanged: { type: 'function', dVal: 'function(c,ro) {}', lvl: 2 }
                }
              }
            }
          };
          break;

        case 'ngMemo':
          di = {
            ControlCategory: 'Edits',
            AddData: {
              InitProperties: {
                'W': { value: 150 },
                'H': { value: 150 },
                'Data': {},
                'Data.Text': { value: 'MemoBox' }
              }
            },
            Properties: {
              Data: {
                properties: {
                  Text: { type: 'string' },
                  ngText: { type: 'string' },
                  ngTextD: { type: 'string', lvl: 2 },
                  DefaultText: { type: 'string' },
                  TextAlign: { type: 'string', dVal: 'left', readOnly: true,
                    items: ['left', 'center', 'right']
                  },
                  Alt: { type: 'string' },
                  ngAlt: { type: 'string' },
                  ngAltD: { type: 'string', lvl: 2 },
                  Hint: { type: 'string' },
                  ngHint: { type: 'string' },
                  ngHintD: { type: 'string', lvl: 2 },
                  HintStyle: { type: 'integer', dVal: '0', lvl: 2 },
                  ReadOnly: { type: 'boolean', dVal: 'false' },
                  Frame: { type: 'object', dVal: '{}', lvl: 2 },
                  HasFocus: { type: 'boolean', dVal: 'false', lvl: 2 },
                  SelectOnFocus: { type: 'boolean' },
                  LockHintCaretPos: { type: 'boolean', lvl: 2 }
                }
              },
              Events: {
                properties: {
                  OnSetText: { type: 'function', dVal: 'function(text, c) { return text; }' },
                  OnGetText: { type: 'function', dVal: 'function(c) { return c.Text; }' },
                  OnTextChanged: { type: 'function', dVal: 'function(c) { }' },
                  OnGetAlt: { type: 'function', dVal: 'function(c) { return c.Alt; }', lvl: 2 },
                  OnGetHint: { type: 'function', dVal: 'function(c) { return c.Hint; }', lvl: 2 },
                  OnGetClassName: { type: 'function', dVal: 'function(c, cls, text, hint) { return cls; }', lvl: 2 },
                  OnKeyDown: { type: 'function', dVal: 'function(e, elm) { return true; }', lvl: 2 },
                  OnKeyUp: { type: 'function', dVal: 'function(e, elm) { return true; }', lvl: 2 },
                  OnKeyPress: { type: 'function', dVal: 'function(e, elm) { return true; }', lvl: 2 },
                  OnFocus: { type: 'function', dVal: 'function(c) { }' },
                  OnBlur: { type: 'function', dVal: 'function(c) { }' },
                  OnSetReadOnly: { type: 'function', dVal: 'function(c,ro) { return true; }', lvl: 2 },
                  OnReadOnlyChanged: { type: 'function', dVal: 'function(c,ro) {}', lvl: 2 }
                }
              }
            }
          };
          break;

        case 'ngPages':
          di = {
            BasicComponent: c.DefType,
            ControlCategory: 'Containers',
            AddData: {
              InitProperties: {
                W: {}, H: {}, Pages: {}
              },
              ControlsGroup: function(selected_idx, clicked_idx) {
                var ref = FormEditor.GetControlRefByIdx(selected_idx);
                if (!ref) return '';
                return 'Pages.'+ref.Page+'.Controls';
              },
              ControlsGroupNames: function(selected_idx) {
                var ref = FormEditor.GetControlRefByIdx(selected_idx);
                if (!ref) return null;

                var groups = [];
                for (var i = 0; i < ref.Pages.length; i++) groups.push('Pages.'+i+'.Controls');

                return groups;
              }
            },
            Properties: {
              Pages: { type: 'array', dVal: "[{Text:'Page 1', Controls:{}},{Text:'Page 2', Controls:{}}]" },
              ControlsPanel: { type: 'group', lvl: 2 },
              Data: {
                properties: {
                  Page: { type: 'integer', dVal: '0' },
                  PagesVisible: { type: 'boolean' },
                  PagesIndent: { type: 'integer', dVal: '0' },
                  PagesSize: { type: 'integer', dVal: '0' },
                  MaxRows: { type: 'integer', dVal: '0' },
                  PagesAlign: { type: 'string', dVal: 'left', readOnly: true,
                    items: ['left', 'right']
                  },
                  PagesVAlign: { type: 'string', dVal: 'top', readOnly: true,
                    items: ['top', 'bottom']
                  },
                  TextAlign: { type: 'string', dVal: 'center', readOnly: true,
                    items: ['left', 'center', 'right']
                  },
                  HTMLEncode: { type: 'boolean', dVal: 'false', lvl: 3 },
                  RowOverlap: { type: 'integer', dVal: '0' },
                  PageImages: { type: 'array' },
                  Frame: { type: 'object', dVal: '{}' }
                }
              },
              Events: {
                properties: {
                  OnPageChanging: { type: 'function', dVal: 'function(c, p) { return true; }' },
                  OnPageChanged: { type: 'function', dVal: 'function(c, op) { }' },
                  OnGetText: { type: 'function', dVal: 'function(c, i) { return c.Pages[i].Text; }' },
                  OnGetAlt: { type: 'function', dVal: 'function(c, i) { return c.Pages[i].Alt; }' },
                  OnClick: { type: 'function', dVal: 'function(e) { return true; }' },
                  OnDblClick: { type: 'function', dVal: 'function(e) { return true; }' }
                }
              }
            },
            Events: {
              OnGetDesignInfo: function(idx, di) {
                var ref = FormEditor.GetControlRefByIdx(idx);
                if ((!ref)|| ref.Pages.length==0) return di;

                var page_props = {
                  id: { type: 'string', lvl: 3 },
                  Text: { type: 'string' },
                  Alt: { type: 'string' },
                  Visible: { type: 'boolean' },
                  Enabled: { type: 'boolean' },
                  ControlsPanel: { type: 'group', lvl: 2 },
                  Controls: { type: 'group' },
                  W: { type: ['integer','string'], cType: 'feBoundsEditNum', dVal: '150' },
                  H: { type: ['integer','string'], cType: 'feBoundsEditNum', dVal: '150' },
                  MinWidth: { type: 'integer' }
                }

                for (var i = 0; i < ref.Pages.length; i++) {
                  di.Properties['Pages.'+i] = {};
                  di.Properties['Pages.'+i].properties = page_props;
                }

                return di;
              }
//               HandleClick: function(pi, idx) {
//                 console.log(pi, 'HandleClick ngPages', idx);
//                 var ref = FormEditor.GetControlRefByIdx(idx);
//                 if ((ref)&& typeof ref.DoPtrClick==='function') {
//                   console.log('HandleClick clicked');
//                   //var elm = ref.Elm();
//                   //debugger;
//                   //ref.DoPtrClick(pi);
//                   //ref.DoPtrStart(pi);
//                 }
//                 return true;
//               }
//               OnRefresh: function(c, data, idx) {
//                 console.log('OnRefresh ngPages', c, data, idx);
//               }
            },
            Menu: {
              Text: 'Pages',
              Items: function(c, menu, idx) {
                var updateMenu = function(m, idx) {
                  var ref = FormEditor.GetControlRefByIdx(idx); //reference c je neplatna
                  if ((((ref) && typeof ref.DesignInfo==='object')&& typeof ref.DesignInfo.Menu==='object')&& typeof ref.DesignInfo.Menu.Items==='function') {
                    var items = ref.DesignInfo.Menu.Items(ref, m, idx);
                    m.SetItems(items);
                  }
                }

                var items = [
                  { Text: 'Add Page', OnMenuClick: function(e, m, it) {
                    var ref = FormEditor.GetControlRefByIdx(idx);
                    if (!ref) return false;

                    var pageCode = "{Text:'Page "+(ref.Pages.length+1)+"',Controls:{}}";

                    FormEditor.SetObjectProperties([
                      { name: 'Pages.' + ref.Pages.length, type: 'array', value: pageCode, appControlIdx: idx },
                      { name: 'Data.Page', value: ref.Pages.length, appControlIdx: idx }
                    ], function(chData){ updateMenu(m, idx); FormEditor.UpdatePropertiesList(); });

                    return false;
                  }},
                  { Text: 'Delete Page', Enabled: c.Pages.length, OnMenuClick: function(e, m, it) {
                    var ref = FormEditor.GetControlRefByIdx(idx);
                    if (!ref) return false;
                    var newPageSelect = ref.Page - 1;
                    if (newPageSelect < 0) newPageSelect = 0;

                    var listRef = FormEditor.GetListRefByIdx(idx);
                    if (listRef) {
                      var pages = FormEditor.GetObjectProperty(listRef,'Pages');
                      if (((pages)&& pages.listRef)&& pages.listRef.Value.vtype=='ObjectExpression') {
                        if (ref.Page != ref.Pages.length - 1) {
                          ngDEBUGWARN('Pages is defined as an object (not as an array). Only last page can be deleted.');
                          return false;
                        }
                      }
                    }

                    FormEditor.SetObjectProperties([
                      { name: 'Pages.' + ref.Page, value: null, appControlIdx: idx },
                      { name: 'Data.Page', value: newPageSelect, appControlIdx: idx }
                    ], function(chData){ updateMenu(m, idx); FormEditor.UpdatePropertiesList(); });

                    return false;
                  }},
                  { Text: '-' }
                ];

                if (typeof c.Pages!=='object') return true;
                var text, checked;
                for (var j in c.Pages) {
                  text = c.Pages[j].Text + ' (' + j + ')';
                  checked = j == c.Page;
                  if (checked) var checked_text = text;
                  items.push({
                    Text: text,
                    RadioGroup: 'menu_pages',
                    Checked: checked,
                    Page: j,
                    OnMenuClick: function(e, m, it) {
                      m.CheckItem(it, true);
                      FormEditor.SetObjectProperties([{ name: 'Data.Page', value: it.Page, appControlIdx: idx }], function(chData){ updateMenu(m, idx); });
                      return false;
                    }
                  });
                }
/*
                items.push({ Text: '-' });

                items.push({ Text: 'Edit properties - ' + checked_text, OnMenuClick: function(e, m, it) {
//                   if ((FormEditor.GUI)&& FormEditor.GUI.EditorListFrame) {
//                     FormEditor.GUI.EditorListFrame.Dispose();
//                     delete FormEditor.GUI.EditorListFrame;
//                   }

//                   var props = {
//                     Text: { type: 'string', dVal: 'Page' }
//                   };
//                   var def = {
//                     EditorListFrame: {
//                       Type: 'feFrame',
//                       L: 0, T: 0, R: 0, B: 0,
//                       Data: {
//                         ScrollBars: ssAuto
//                       },
//                       Controls: {
//                         DesignInfoEditorList: FormEditor.GetPropertiesListDef(props)
//                       }
//                     }
//                   }

                  //FormEditor.GUI.AddControls(def, FormEditor.GUI.DesignInfoEditorHolder);
//                   FormEditor.GUI.DesignInfoEditorHolder.Controls.AddControls(def);
//                   FormEditor.GUI.DesignInfoEditorHolder.Show();

                  return false;
                }});
*/
                return items;
              }
            }
          };
          break;

        case 'ngToolBar':
          di = {
            BasicComponent: c.DefType,
            ControlCategory: 'Containers',
            AddData: {
              InitProperties: {
                W: {}, H: {}, Controls: {}
              }
            },
            ChildControlsDesignInfo: {
              Properties: {
                Data: {
                  properties: {
                    ToolBarIgnore: { type: 'boolean', dVal: 'false' },
                    ToolBarAutoUpdate: { type: 'boolean' },
                    ToolBarIndent: { type: 'integer', dVal: '0' },
                    ToolBarHPadding: { type: 'integer' },
                    ToolBarVPadding: { type: 'integer' },
                    ToolBarWidth: { type: 'integer' },
                    ToolBarHeight: { type: 'integer' },
                    ToolBarBreak: { type: 'boolean', dVal: 'false' },
                    ToolBarNoWrap: { type: 'boolean', dVal: 'false' }
                  }
                }
              }
            },
            Properties: {
              Data: {
                properties: {
                  AutoSize: { type: 'boolean', dVal: 'false' },
                  Vertical: { type: 'boolean', dVal: 'false' },
                  VPadding: { type: 'integer', dVal: '0' },
                  HPadding: { type: 'integer', dVal: '0' },
                  VAlign: { type: 'string', dVal: 'top', readOnly: true,
                    items: ['top', 'bottom']
                  },
                  HAlign: { type: 'string', dVal: 'left', readOnly: true,
                    items: ['left', 'right']
                  },
                  Wrapable: { type: 'boolean' }
                }
              },
              Controls: { lvl: 1 }
            }
          }
          break;

        case 'ngProgressBar':
          di = {
            ControlCategory: 'Misc',
            AddData: {
              InitProperties: {
                W: {}
              }
            },
            Properties: {
              Data: {
                properties: {
                  Position: { type: 'integer', dVal: '0' },
                  Smooth: { type: 'boolean', dVal: 'false' },
                  LeftImg: { type: 'object' },
                  MiddleImg: { type: 'object' },
                  RightImg: { type: 'object' },
                  BarImg: { type: 'object' }
                }
              }
            }
          }
          break;

        case 'ngWebBrowser':
          di = {
            BasicComponent: c.DefType,
            ControlCategory: 'Misc',
            AddData: {
              InitProperties: {
                W: { value: '320' }, H: { value: '240' },
                Data: {},
                'Data.URL': { value: '' }
              }
            },
            Properties: {
              Data: {
                properties: {
                  URL: { type: 'string' }
                }
              },
              Events: {
                properties: {
                  OnSetURL: { type: 'function', dVal: 'function(c, url) { return true; }' },
                  OnGetURL: { type: 'function', dVal: 'function(c, url) { return url; }' },
                  OnSetHTML: { type: 'function', dVal: 'function(c, html) { return html; }' }
                }
              }
            }
          }
          break;

        //Derived controls
        case 'ngFrame':
          di = {
            BasicComponent: c.DefType,
            ControlCategory: 'Containers',
            Properties: {
              ParentReferences: { dVal: 'false' },
              Controls: { lvl: 1 }
            }
          };
          break;

        case 'ngCheckBox':
          di = {
            ControlCategory: 'Buttons',
            AddData: {
              InitProperties: {
                'Data': {},
                'Data.Text': { value: 'CheckBox' }
              }
            },
            Properties: {
              Data: {
                properties: {
                  AllowGrayed: { type: 'boolean', dVal: 'false' },
                  TextAlign: { type: 'string', dVal: 'right', readOnly: true, lvl: 1,
                    items: ['left', 'right']
                  },
                  RadioGroup: { lvl: 1 }
                }
              }
            }
          };
          break;

        case 'ngRadioButton':
          di = {
            ControlCategory: 'Buttons',
            AddData: {
              InitProperties: {
                'Data': {},
                'Data.Text': { value: 'RadioButton' }
              }
            },
            Properties: {
              Data: {
                properties: {
                  AllowGrayed: { type: 'boolean', dVal: 'false' },
                  RadioGroup: { type: 'string', dVal: 'default' },
                  TextAlign: { type: 'string', dVal: 'right', readOnly: true, lvl: 1,
                    items: ['left', 'right']
                  },
                  RadioGroup: { lvl: 1 }
                }
              }
            }
          };
          break;

        case 'ngDropDownList':
          di = {
            ControlCategory: 'Edits',
            Properties: {
              DropDown: { lvl: 1 },
              Data: {
                properties: {
                  DropDownType: { type: 'integer', dVal: 'ngeDropDownList', readOnly: true, lvl: 2,
                    items: ['ngeDropDownEdit', 'ngeDropDownList']
                  },
                  Suggestion: { lvl: 1 }
                }
              }
            }
          };
        case 'ngDropDown':
          di = {
            ControlCategory: 'Edits',
            Properties: {
              DropDown: { lvl: 1 },
              Data: {
                properties: {
                  DropDownType: { type: 'integer', dVal: 'ngeDropDownEdit', readOnly: true, lvl: 2,
                    items: ['ngeDropDownEdit', 'ngeDropDownList']
                  },
                  Suggestion: { lvl: 1 }
                }
              }
            }
          }
          break;

        case 'ngEditNum':
          di = {
            ControlCategory: 'Edits',
            Properties: {
              ArrowsAlign: { type: 'string', dVal: 'right',
                items: ['left', 'right', 'both']
              },
              Arrows: { type: 'string', dVal: 'leftright',
                items: ['none', 'leftright', 'updown']
              },
              Data: {
                properties: {
                  Step: { type: 'integer', dVal: '1' },
                  StepRound: { type: 'boolean', dVal: 'false' },
                  MinNum: { type: 'integer' },
                  MaxNum: { type: 'integer' },
                  DefaultNum: { type: 'integer', dVal: '0' },

                  Text: { lvl: 2 },
                  ngText: { lvl: 2 },
                  ngTextD: { lvl: 2 },
                  TextAlign: { lvl: 2 },
                  Hint: { lvl: 2 },
                  ngHint: { lvl: 2 },
                  Password: { lvl: 2 },
                  Suggestion: { lvl: 3 },
                  SuggestionDelay: { lvl: 3 },
                  SuggestionSearchColumn: { lvl: 3 },
                  SuggestionIgnoreCase: { lvl: 3 },
                  SuggestionPartial: { lvl: 3 },
                  SuggestionURL: { lvl: 3 },
                  SuggestionType: { lvl: 3 }
                }
              },
              Events: {
                properties: {
                  OnGetNum: { type: 'function', dVal: 'function(c) { }' },
                  OnSetNum: { type: 'function', dVal: 'function(c, n) { }' },
                  OnUp: { type: 'function', dVal: 'function(e, n) { return true; }' },
                  OnDown: { type: 'function', dVal: 'function(e, n) { return true; }' },
                  OnSetText: { lvl: 2 },
                  OnGetText: { lvl: 2 },
                  OnTextChanged: { lvl: 2 },
                  OnGetAlt: { lvl: 2 }
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