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
      "ReadOnly": ng_diType('databind_expression', { Level: (typeof c.SetReadOnly === 'function') ? 'basic' : 'optional' }),
      "Error": ng_diType('databind_expression'),
      "ShowError": ng_diType('databind_expression')
    };

    // dependent bindings
    if(!di.NonVisual) {
      ng_MergeVar(props, {
        "OnClick": ng_diType('databind_function_name', { Level: 'optional' })
      });
    }

    if (typeof c.SetText === 'function')
    {
      props["Text"] = ng_diType('databind_expression', { Level: 'basic' });
      props["ngText"] = ng_diType('databind_expression', { Level: 'basic' });
    }

    var has_alt=(typeof c.Alt!=='undefined');
    props["Alt"] = ng_diType('databind_expression', { Level: has_alt ? 'basic' : 'optional' });
    props["ngAlt"] = ng_diType('databind_expression', { Level: has_alt ? 'basic' : 'optional' });

    var has_hint=(typeof c.Hint!=='undefined');
    props["Hint"] = ng_diType('databind_expression', { Level: has_hint ? 'basic' : 'optional' });
    props["ngHint"] = ng_diType('databind_expression', { Level: has_hint ? 'basic' : 'optional' });

    if (typeof c.SetInvalid === 'function')
    {
      props["Invalid"] = ng_diType('databind_expression', { Level: 'basic' });
      props["Valid"] = ng_diType('databind_expression', { Level: 'basic' });
    }

    var instantUpdateProperty = ng_diMixed([
      ng_diBoolean(false),
      ng_diType('databind_expression', undefined, {
        EditorOptions: {
          IgnoreDataModel: true
        }
      })
    ], { Level: 'basic' });

    var delayedUpdateProperty = ng_diMixed([
      ng_diInteger(500),
      ng_diType('databind_expression', undefined, {
        EditorOptions: {
          IgnoreDataModel: true
        }
      })
    ], { Level: 'basic' });

    switch (c.CtrlType)
    {
      case 'ngEdit':
        props["InstantUpdate"] = instantUpdateProperty;
        props["DelayedUpdate"] = delayedUpdateProperty;
        props["Focus"] = { Level: 'basic' };
        props["Lookup"] = ng_diType('databind_expression', { Level: 'basic' });
        props["KeyField"] = ng_diType('databind_string', { Level: 'basic' });
        props["Value"] = ng_diType('databind_expression', { Level: 'basic' });
        break;
      case 'ngMemo':
        props["InstantUpdate"] = instantUpdateProperty;
        props["DelayedUpdate"] = delayedUpdateProperty;
        props["Focus"] = { Level: 'basic' };
        props["Value"] = ng_diType('databind_expression', { Level: 'basic' });
        break;
      case 'ngToolBar':
        if(c.CtrlInheritsFrom('ngMenuBar')) {
          props["Value"] = ng_diType('databind_expression', { Level: 'basic' });
          props["Selected"] = ng_diType('databind_expression', { Level: 'optional' });
          props["Checked"] = ng_diType('databind_expression', { Level: 'basic' });
          props["ItemMapping"] = ng_diType('databind_itemmapping', { Level: 'basic' });
        }
        break;
      case 'ngList':
        props["Focus"] = { Level: 'basic' };
        props["Value"] = ng_diType('databind_expression', { Level: 'basic' });
        props["Selected"] = ng_diType('databind_expression', { Level: c.CtrlInheritsFrom('ngMenu') ? 'optional' : 'basic' });
        props["Checked"] = ng_diType('databind_expression', { Level: 'basic' });

        props["ItemMapping"] = ng_diType('databind_itemmapping', { Level: 'basic' });

        props["DelayedUpdate"] = ng_diMixed([
          ng_diInteger(10),
          ng_diType('databind_expression', undefined, {
            EditorOptions: {
              IgnoreDataModel: true
            }
          })
        ], { Level: 'basic' });

        props["ItemMatchingProps"] = ng_diArrayOf(ng_diType('databind_string', { Level: 'basic' }));
        
        props["SimpleArrayItemColumnID"] = ng_diType('databind_string', { Level: 'advanced' });
        props["KeyField"] = ng_diType('databind_string', { Level: 'basic' });
        break;
      case 'ngButton':
      case 'ngSysAction':
        props["Value"] = ng_diType('databind_expression', { Level: 'basic' });
        props["Checked"] = ng_diType('databind_expression', { Level: 'basic' });
        props["Command"] = ng_diType('databind_expression', { Level: 'basic' });
        break;

      case 'ngPages':
      case 'ngWebBrowser':
      case 'ngProgressBar':
      case 'ngCalendar':
        props["Value"] = ng_diType('databind_expression', { Level: 'basic' });
        break;

      default:
        if (typeof c.SetText === 'function')
        {
          props["Value"] = ng_diType('databind_expression', { Level: 'basic' });
        }
        break;
    }

    ng_MergeVar(di,
    {
      Properties: ng_diProperties({
        "DataBind": props
      })
    });
  }

  return {
    OnFormEditorInit: function(FE) {
      var databind_types = [
        // databind_itemmapping
        {
          TypeID: 'databind_objitemmapping',
          TypeBase: 'object',
          Name: 'databind item mapping',
          ShortName: 'obj',
          Basic: false,
          Options: {
            ChildDesignInfo: ng_diMixed([
              ng_diType('databind_string'),
              ng_diBoolean()
            ])
          }
        }
      ];
      FormEditor.RegisterPropertyType(databind_types);
      FE.RegisterPropertyTypesGroup('databind_itemmapping', ['databind_objitemmapping', 'databind_expression']);
    },

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
          IsBasic: true,
          IsContainer: true,
          IsViewModel: true,
          Properties: ng_diProperties({
            "ErrorHint": ng_diControl('ngTextHint', null, { Level: 'basic' }, { InheritedFrom: 'ngHint' }),
            "Data": {
              "DefaultFindFieldControlsBindings": ng_diTypeVal('array_strings', ["'Data'","'Value'","'Checked'","'Selected'","'Lookup'","'Error'","'Link'"], { Level: 'basic' }),
              "DisableOnCommand": ng_diBoolean(true, { Level: 'basic' })
            },
            "Events": {
              "OnSetViewModel": ng_diEvent('function(c, vm, ovm) {}',{ Level: 'basic' }),
              "OnResetErrors": ng_diEvent('function(c) { return true; }',{ Level: 'basic' }),
              "OnShowErrors": ng_diEvent('function(c, errmsg, errors) {}',{ Level: 'basic' }),

              "OnSetControlError": ng_diEvent('function(c, ec, err, setfocus) { return true; }',{ Level: 'basic' }),

              "OnSetControlVisible": ng_diEvent('function(c, vc) { return true; }',{ Level: 'basic' }),
              "OnSetControlFocus": ng_diEvent('function(c, fc) {}',{ Level: 'basic' }),

              "OnShowLoading": ng_diEvent('function(c) {}',{ Level: 'basic' }),
              "OnHideLoading": ng_diEvent('function(c) {}',{ Level: 'basic' }),
              "OnShowErrorMsg": ng_diEvent('function(c, msg) { alert(msg); }',{ Level: 'basic' }),

              "OnCommand": ng_diEvent('function(c, cmd, options) { return true; }',{ Level: 'basic' }),
              "OnCommandRequest": ng_diEvent('function(c, rpc) { return true; }',{ Level: 'basic' }),
              "OnCommandResults": ng_diEvent('function(c, cmd, sresults) {}',{ Level: 'basic' }),
              "OnCommandFinished": ng_diEvent('function(c, cmd, sresults) {}',{ Level: 'basic' }),
              "OnCommandCancel": ng_diEvent('function(c) {}',{ Level: 'basic' })
            },
            "OverrideEvents": {
              "OnFindFieldControls": ng_diEvent('function(c, fid, visibleonly, bindings, parentfielddef) { return null; }',{ Level: 'basic' })
            }
          },
          {
            "Controls": ng_diControls(undefined, { Level: 'basic' }, {
              ChildDesignInfo: ng_diControl(undefined, ng_diProperties({
                "Methods": {
                  "SetInvalid": ng_diFunction('function(s) { return ng_CallParent(this, "SetInvalid", arguments, true); }', { Level: 'basic' }),
                  "SetErrorState": ng_diFunction('function(s) { return ng_CallParent(this, "SetErrorState", arguments, true); }', { Level: 'basic' })
                }
              }))
            })
          })
        };
      });

      function EditField(d,c,ref) {
        return {
          ControlCategory: 'Edits',
          IsViewModel: true,
          Properties: ng_diProperties({
            "ErrorHint": ng_diControl('ngTextHint', null, { Level: 'basic' }, { InheritedFrom: 'ngHint' }),
            "Data": {
              "ErrorBindings": ng_diTypeVal('array_strings', [ "'Value'", "'Lookup'" ], { Level: 'basic' })
            },
            "Events": {
              "OnSetErrorState": ng_diEvent('function(c, state) { return true; }',{ Level: 'basic' }),
              "OnShowErrorHint": ng_diEvent('function(c, msg) { return true; }',{ Level: 'basic' }),
              "OnHideErrorHint": ng_diEvent('function(c) { return true; }',{ Level: 'basic' })
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
