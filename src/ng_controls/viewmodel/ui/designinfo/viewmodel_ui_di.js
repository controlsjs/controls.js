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
ngUserControls['viewmodel_ui_designinfo'] = (function()
{
  function add_databind_di(di, def, c, ref)
  {
    var props = {
      "ReadOnly": { DefaultType: 'databind_string', Level: (typeof c.SetReadOnly === 'function') ? 'basic' : 'optional' },
      "Error": { DefaultType: 'databind_string' },
      "ShowError": { DefaultType: 'databind_string' }
    };

    // dependent bindings
    if(!di.NonVisual) {
      ng_MergeVar(props, {
        "OnClick": {
          DefaultType: 'databind_string',
          Types: {
            'databind_string': {
              EditorOptions: {
                DatabindFunction: true
              }
            }
          },
          Level: 'optional'
        }
      });
    }

    if (typeof c.SetText === 'function')
    {
      props["Text"] = { DefaultType: 'databind_string', Level: 'basic' };
      props["ngText"] = { DefaultType: 'databind_string', Level: 'basic' };
    }

    var has_alt=(typeof c.Alt!=='undefined');
    props["Alt"] = { DefaultType: 'databind_string', Level: has_alt ? 'basic' : 'optional' };
    props["ngAlt"] = { DefaultType: 'databind_string', Level: has_alt ? 'basic' : 'optional' };

    var has_hint=(typeof c.Hint!=='undefined');
    props["Hint"] = { DefaultType: 'databind_string', Level: has_hint ? 'basic' : 'optional' };
    props["ngHint"] = { DefaultType: 'databind_string', Level: has_hint ? 'basic' : 'optional' };

    if (typeof c.SetInvalid === 'function')
    {
      props["Invalid"] = { DefaultType: 'databind_string', Level: 'basic' };
      props["Valid"] = { DefaultType: 'databind_string', Level: 'basic' };
    }

    var instantUpdateProperty = {
      DefaultType: 'boolean',
      Types: {
        'boolean': {
          DefaultValue: false,
          EditorOptions: {
            IgnoreDataModel: true
          }
        }
      },
      Level: 'basic'
    };

    var delayedUpdateProperty = {
      DefaultType: 'integer',
      Types: {
        'integer': {
          DefaultValue: 500,
          EditorOptions: {
            IgnoreDataModel: true
          }
        }
      },
      Level: 'basic'
    };
    switch (c.CtrlType)
    {
      case 'ngEdit':
        props["InstantUpdate"] = instantUpdateProperty;
        props["DelayedUpdate"] = delayedUpdateProperty;
        props["Focus"] = { Level: 'basic' };
        props["Lookup"] = { DefaultType: 'databind_string', Level: 'basic' };
        props["Value"] = { DefaultType: 'databind_string', Level: 'basic' };
        break;
      case 'ngMemo':
        props["InstantUpdate"] = instantUpdateProperty;
        props["DelayedUpdate"] = delayedUpdateProperty;
        props["Focus"] = { Level: 'basic' };
        props["Value"] = { DefaultType: 'databind_string', Level: 'basic' };
        break;
      case 'ngToolBar':
        if(c.CtrlInheritsFrom('ngMenuBar')) {
          props["Value"] = { DefaultType: 'databind_string', Level: 'basic' };
          props["Selected"] = { DefaultType: 'databind_string', Level: 'optional' };
          props["Checked"] = { DefaultType: 'databind_string', Level: 'basic' };
        }
        break;
      case 'ngList':
        props["Focus"] = { Level: 'basic' };
        props["Value"] = { DefaultType: 'databind_string', Level: 'basic' };
        props["Selected"] = { DefaultType: 'databind_string', Level: c.CtrlInheritsFrom('ngMenu') ? 'optional' : 'basic' };
        props["Checked"] = { DefaultType: 'databind_string', Level: 'basic' };
        break;
      case 'ngButton':
      case 'ngSysAction':
        props["Value"] = { DefaultType: 'databind_string', Level: 'basic' };
        props["Checked"] = { DefaultType: 'databind_string', Level: 'basic' };
        props["Command"] = { DefaultType: 'databind_string', Level: 'basic' };
        break;

      case 'ngPages':
      case 'ngWebBrowser':
      case 'ngProgressBar':
      case 'ngCalendar':
        props["Value"] = { DefaultType: 'databind_string', Level: 'basic' };
        break;

      default:
        if (typeof c.SetText === 'function')
        {
          props["Value"] = { DefaultType: 'databind_string', Level: 'basic' };
        }
        break;
    }

    var netbeans = ((typeof CodeMirrorIntegration !== 'undefined')&&(typeof CodeMirrorIntegration.RunningInNetBeans === 'function')&&(CodeMirrorIntegration.RunningInNetBeans()));
    if (netbeans)
    {
      for (var i in props)
      {
        if (props[i].ignoreDataModel) continue;
        props[i].Types = {
          'databind_string': {
            Editor: 'ngfeEditor_DataBindDropDown'
          }
        };
      }
    }
    ng_MergeVar(di,
    {
      Properties: ng_DIProperties({
        "DataBind": { 
          Types: {
            'databind': {
              ObjectProperties: props
            }
          }
        }
      })
    });
  }

  return {
    OnControlDesignInfo: function(def, c, ref)
    {
      if((c)&&(!def.CtrlInheritanceDepth))
      {
        // define Databind DesignInfo of all controls
        add_databind_di(c.DesignInfo, def, c, ref);
      }
    },

    OnInit: function()
    {
      if(!ngDESIGNINFO) return;

      ngRegisterControlDesignInfo('ngViewModelForm',function(d,c,ref) {
        return {
          ControlCategory: 'Containers',
          IsContainer: true,
          BaseControl: 'ngViewModelForm',
          Properties: ng_DIProperties({
            "ErrorHint": ng_DIPropertyControl('ngTextHint',{ Level: 'basic' }, 'ngHint'),
            "Data": {
              "DefaultFindFieldControlsBindings": ng_DIProperty('array_strings', ["'Data'","'Value'","'Checked'","'Selected'","'Lookup'","'Error'","'Link'"], { Level: 'basic' }),
              "DisableOnCommand": ng_DIPropertyBool(true, { Level: 'basic' })
            },
            "Events": {
              "OnSetViewModel": ng_DIPropertyEvent('function(c, vm, ovm) {}',{ Level: 'basic' }),
              "OnResetErrors": ng_DIPropertyEvent('function(c) { return true; }',{ Level: 'basic' }),
              "OnShowErrors": ng_DIPropertyEvent('function(c, errmsg, errors) {}',{ Level: 'basic' }),

              "OnSetControlError": ng_DIPropertyEvent('function(c, ec, err, setfocus) { return true; }',{ Level: 'basic' }),

              "OnSetControlVisible": ng_DIPropertyEvent('function(c, vc) { return true; }',{ Level: 'basic' }),
              "OnSetControlFocus": ng_DIPropertyEvent('function(c, fc) {}',{ Level: 'basic' }),

              "OnShowLoading": ng_DIPropertyEvent('function(c) {}',{ Level: 'basic' }),
              "OnHideLoading": ng_DIPropertyEvent('function(c) {}',{ Level: 'basic' }),
              "OnShowErrorMsg": ng_DIPropertyEvent('function(c, msg) { alert(msg); }',{ Level: 'basic' }),

              "OnCommand": ng_DIPropertyEvent('function(c, cmd, options) { return true; }',{ Level: 'basic' }),
              "OnCommandRequest": ng_DIPropertyEvent('function(c, rpc) { return true; }',{ Level: 'basic' }),
              "OnCommandResults": ng_DIPropertyEvent('function(c, cmd, sresults) {}',{ Level: 'basic' }),
              "OnCommandFinished": ng_DIPropertyEvent('function(c, cmd, sresults) {}',{ Level: 'basic' }),
              "OnCommandCancel": ng_DIPropertyEvent('function(c) {}',{ Level: 'basic' })
            },
            "OverrideEvents": {
              "OnFindFieldControls": ng_DIPropertyEvent('function(c, fid, visibleonly, bindings, parentfielddef) { return null; }',{ Level: 'basic' })
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
                          "Methods": {
                            "SetInvalid": ng_DIProperty('function','function(s) { return ng_CallParent(this, "SetInvalid", arguments, true); }', { Level: 'basic' }),
                            "SetErrorState": ng_DIProperty('function','function(s) { return ng_CallParent(this, "SetErrorState", arguments, true); }', { Level: 'basic' })
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

      function EditField(d,c,ref) {
        return {
          ControlCategory: 'Edits',
          Properties: ng_DIProperties({
            "ErrorHint": ng_DIPropertyControl('ngTextHint',{ Level: 'basic' }, 'ngHint'),
            "Data": {
              "ErrorBindings": ng_DIProperty('array_strings', [ "'Value'", "'Lookup'" ], { Level: 'basic' })
            },
            "Events": {
              "OnSetErrorState": ng_DIPropertyEvent('function(c, state) { return true; }',{ Level: 'basic' }),
              "OnShowErrorHint": ng_DIPropertyEvent('function(c, msg) { return true; }',{ Level: 'basic' }),
              "OnHideErrorHint": ng_DIPropertyEvent('function(c) { return true; }',{ Level: 'basic' })
            }
          })
        };
      }
      ngRegisterControlDesignInfo('ngEditField',EditField);
      ngRegisterControlDesignInfo('ngEditNumField',EditField);
      ngRegisterControlDesignInfo('ngEditDateField',EditField);
      ngRegisterControlDesignInfo('ngEditTimeField',EditField);
      ngRegisterControlDesignInfo('ngDropDownField',EditField);
      ngRegisterControlDesignInfo('ngDropDownListField',EditField);
      ngRegisterControlDesignInfo('ngMemoField',EditField);
    }
  };
})();
