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
var ViewModel_Controls_DesignInfo = (function()
{
  function add_databind_di(di, def, c, ref)
  {
    var props = {
      "Calls": { DefaultType: 'object',
        Types: {
          'databind_string': {}
        }
      },
      "Data": { DefaultType: 'databind_string' },
      "Link": { DefaultType: 'databind_string', Level: 'basic' },
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
        },
        "MouseOver": {
          DefaultType: 'databind_string',
          Types: {
            'databind_string': {
              EditorOptions: {
                DatabindFunction: true
              }
            }
          }
        }
      });

      if (typeof c.SetBounds === 'function')
      {
        props["Bounds"] = {
          DefaultType: 'object',
          Types: {
            'databind_string': {}
          },
          Level: 'basic'
        };
      }

      if (typeof c.Elm === 'function')
      {
        props["style"] = {
          DefaultType: 'object',
          Types: {
            'databind_string': {}
          }
        };
        props["className"] = { DefaultType: 'databind_string' };
        props["SubClassName"] = { DefaultType: 'databind_string' };
        props["BaseClassName"] = { DefaultType: 'databind_string' };
      }

      if (typeof c.SetFocus === 'function')
      {
        props["Focus"] = { DefaultType: 'databind_string', Level: 'optional' };
      }

      if (typeof c.SetOpacity === 'function')
      {
        props["Opacity"] = { DefaultType: 'databind_string', Level: 'basic' };
      }

      if (typeof c.SetVisible === 'function')
      {
        props["Visible"] = { DefaultType: 'databind_string', Level: 'basic' };
      }
    }

    if (typeof c.SetEnabled === 'function')
    {
      props["Enabled"] = { DefaultType: 'databind_string', Level: 'basic' };
      props["Disabled"] = { DefaultType: 'databind_string', Level: 'basic' };
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

    switch (c.DefType)
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
      case 'ngList':
        props["Focus"] = { Level: 'basic' };
        props["Value"] = { DefaultType: 'databind_string', Level: 'basic' };
        props["Selected"] = { DefaultType: 'databind_string', Level: 'basic' };
        props["Checked"] = { DefaultType: 'databind_string', Level: 'basic' };
        break;
      case 'ngButton':
      case 'ngSysAction':
        props["Value"] = { DefaultType: 'databind_string', Level: 'basic' };
        props["Checked"] = { DefaultType: 'databind_string', Level: 'basic' };
        props["Command"] = { DefaultType: 'databind_string', Level: 'basic' };
        break;

      case 'ngSysTimer':
        props["Value"] = { DefaultType: 'databind_string', Level: 'basic' };
        props["Command"] = { DefaultType: 'databind_string', Level: 'basic' };
        break;

      case 'ngPages':
      case 'ngWebBrowser':
      case 'ngProgressBar':
      case 'ngCalendar':
      case 'ngSysURLParams':
      case 'ngSysViewModelSettings':
      case 'ngSysRPC':
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

    var vm_di = {
      Properties: ng_DIProperties({
        "ViewModel": { DefaultType: 'viewmodel', Level: 'basic', Order: 0.21,
          PropertyGroup: 'DataBind'
        },
        "DataBind": { DefaultType: 'databind', Level: 'basic', Order: 0.5,
          Types: {
            'databind_string': {},
            'object': {
              DestroyIfEmpty: true,
              ObjectProperties: {
                Default: {
                  DefaultType: 'object'
                }
              }
            },
            'databind': {
              DestroyIfEmpty: true,
              ObjectProperties: props
            }
          }
        },
        "DOMDataBind": { DefaultType: 'databind', Level: 'optional', Order: 0.5,
          PropertyGroup: 'DataBind',
          Types: {
            'databind_string': {},
            'object': {
              DestroyIfEmpty: true,
              ObjectProperties: {
                Default: {
                  DefaultType: 'object'
                }
              }
            },
            'databind': {
              DestroyIfEmpty: true
            }
          },
        },
        "Data": {
          "ViewModelData": { Level: 'hidden' }
        },
        "Methods": {
          "SetViewModelData": ng_DIProperty('function', 'function(val) { ng_CallParent(this,"SetViewModelData",arguments); }', { Level: 'advanced' })
        },
        "Events": {
          "OnViewModelDataChanged": ng_DIPropertyEvent('function(c, oldval) { }', { Level: 'basic' }),
          "OnDataBindingInit": ng_DIPropertyEvent('function(c, bindingKey, valueAccessor, allBindings, bindingContext) { return true; }', { Level: 'optional' }),
          "OnDataBindingUpdate": ng_DIPropertyEvent('function(c, bindingKey, valueAccessor, allBindings, bindingContext) { return true; }', { Level: 'optional' })
        }
      })
    };

    // handle DataBind Events properties
    if (di && di.Properties && di.Properties.Events && di.Properties.Events.Types && di.Properties.Events.Types['object'])
    {
      var netbeans = ((typeof CodeMirrorIntegration !== 'undefined')&&(typeof CodeMirrorIntegration.RunningInNetBeans === 'function')&&(CodeMirrorIntegration.RunningInNetBeans()));

      var o = {},
          props = di.Properties.Events.Types['object'].ObjectProperties;
      for (var i in props)
      {
        o[i] = {
          DefaultType: 'databind_string',
          Types: {
            'databind_string': {
              EditorOptions: {
                DatabindFunction: true
              }
            }
          }
        };
        if (netbeans) o[i].Types['databind_string'].Editor = 'ngfeEditor_DataBindDropDown';

        if (typeof props[i].Level !== undefined) o[i].Level = props[i].Level;
        else o[i].Level = 'advanced';
      }

      var eventprop1 = {
        DefaultType: 'object',
        Types: {
          'databind_string': {},
          'object': {
            DestroyIfEmpty: true,
            ObjectProperties: o
          }
        },
        Order: undefined
      };
      var eventprop2 = {
        DefaultType: 'object',
        Types: {
          'databind_string': {},
          'object': {
            DestroyIfEmpty: true,
            ObjectProperties: {}
          }
        }
      };
      for (var i in o)
      {
        eventprop2.Types['object'].ObjectProperties[i] = ng_CopyVar(o[i]);
        eventprop2.Types['object'].ObjectProperties[i].Level = 'advanced';
        delete eventprop2.Types['object'].ObjectProperties[i].Order;
      }

      var vm_events_di = {
        Properties: {
          "DataBind": {
            Types: {
              'databind': {
                ObjectProperties: {
                  "Events": eventprop1,
                  "AfterEvents": eventprop2,
                  "BeforeEvents": eventprop2,
                  "OverrideEvents": eventprop2
                }
              }
            }
          }
        }
      };
      ng_MergeVar(di, vm_events_di);
    }

    ng_MergeVar(di, vm_di);
  }

  return {
    OnFormEditorInit: function(FE) {
      var vm_types = [
        // ViewModel Identifier
        {
          TypeID: 'vmid',
          TypeBase: 'string',
          Name: 'viewmodel id',
          ShortName: 'vmi',
          Options: {
          }
        },
        // ViewModel Object
        {
          TypeID: 'vmobject',
          TypeBase: 'object',
          Name: 'viewmodel object',
          ShortName: 'vm',
          Options: {
            ChildDesignInfo: {
              DefaultType: 'undefined',
              Types: {
                'jstypes': {}
              }
            }
          }
        },
        // ViewModel Constructor
        {
          TypeID: 'vmconstructor',
          TypeBase: 'function',
          Name: 'viewmodel constructor',
          ShortName: 'vmc',
          Options: {
            // TODO: Check why not working?
            DefaultValue: 'function(vm) {}'
          }
        },
        // ngFieldDef
        {
          // TODO: add detect, method arguments as virtual properties
          TypeID: 'ngFieldDef',
          TypeBase: 'code',
          Name: 'ngFieldDef',
          ShortName: 'fd',
          Options: {
            DefaultValue: 'new ngFieldDef("name","type",{})'
          }
        }

      ];
      FormEditor.RegisterPropertyType(vm_types);

      FE.RegisterPropertyTypesGroup('viewmodel',     ['vmid','vmobject']);
      FE.RegisterPropertyTypesGroup('viewmodel_def', ['vmobject', 'vmconstructor']);
      FE.RegisterPropertyTypesGroup('vmfielddef',    ['ngFieldDef']); // TODO: Implement more ngFieldDef_*

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

      ngRegisterControlDesignInfo('ngSysViewModel',function(d,c,ref) {
        return {
          ControlCategory: 'System',
          BaseControl: 'ngSysViewModel',
          NewControl: {
            Default: {
              Properties: {
                "ID": { ValueByRefName: true }
              }
            }
          },
          Properties: ng_DIProperties({
            "ID": { Level: 'basic' },
            "Namespace": { DefaultType: 'string', Level: 'basic', Order: 0.05 },
            "FieldDefs": { DefaultType: 'array', Level: 'basic', Order: 0.051,
              Types: {
                'array': {
                  ChildDesignInfo: {
                    DefaultType: 'vmfielddef'
                  }
                }
              }
            },
            "ViewModel": { DefaultType: 'viewmodel_def', Level: 'basic', Order: 0.052,
              PropertyGroup: 'Definition'
            },
            "RefViewModel": { DefaultType: 'vmid', Level: 'basic', Order: 0.053 },
            "Data": {
              "ViewModel": { DefaultType: 'vmobject', Level: 'basic' },
              "DefaultValues": { DefaultType: 'jsobject', Level: 'basic' },
              "ServerURL": { DefaultType: 'url', Level: 'basic' }
            },
            "Events": {
              "OnSetValues": ng_DIPropertyEvent('function(c, values, deserialize) { return true; }',{ Level: 'basic' }),
              "OnGetValues": ng_DIPropertyEvent('function(c, ret, writableonly, valuenames, errors, convtimestamps, serialize) {}',{ Level: 'basic' }),
              "OnCommand": ng_DIPropertyEvent('function(c, cmd, options) { return true; }',{ Level: 'basic' }),
              "OnDoCommand": ng_DIPropertyEvent('function(c, cmd, options, vals, err) { return true; }',{ Level: 'basic' }),
              "OnCommandRequest": ng_DIPropertyEvent('function(c, rpc) { return true; }',{ Level: 'basic' }),
              "OnCommandResults": ng_DIPropertyEvent('function(c, cmd, sresults) {}',{ Level: 'basic' }),
              "OnCommandFinished": ng_DIPropertyEvent('function(c, cmd, sresults) {}',{ Level: 'basic' }),
              "OnCommandCancel": ng_DIPropertyEvent('function(c) {}',{ Level: 'basic' }),
              "OnCommandData": ng_DIPropertyEvent('function(c, cmd, sresults) {}',{ Level: 'basic' }),
              "OnViewModelChanged": ng_DIPropertyEvent('function(c) {}',{ Level: 'basic' }),
              "OnErrors": ng_DIPropertyEvent('function(c, errors) { return true; }',{ Level: 'basic' }),
              "OnShowErrors": ng_DIPropertyEvent('function(c, errmsg, errors) { if(errmsg!="") alert(errmsg); }',{ Level: 'basic' }),
              "OnAssign": ng_DIPropertyEvent('function(c, src) {}',{ Level: 'basic' })
            },
            "OverrideEvents": {
              "OnSetValue": ng_DIPropertyEvent('function(c, setval, instance, valpath) { return setval; }',{ Level: 'basic' }),
              "OnGetValue": ng_DIPropertyEvent('function(c, val,instance, valpath, errors) { return val; }',{ Level: 'basic' }),
              "OnGetCommandValueNames": ng_DIPropertyEvent('function(c, cmd, options) { return []; }',{ Level: 'basic' }),
              "OnSetViewModel": ng_DIPropertyEvent('function(c, vmodel) { return vmodel; }',{ Level: 'basic' }),
              "OnResults": ng_DIPropertyEvent('function(c, results) { return results; }',{ Level: 'basic' })
            }
          },{
            "DataBind": { Level: 'optional' },
          })
        };
      });
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
      ngRegisterControlDesignInfo('ngSysViewModelSettings',function(d,c,ref) {
        return {
          ControlCategory: 'System',
          BaseControl: 'ngSysViewModelSettings',
          Properties: ng_DIProperties({
            "Events": {
              "OnSettingsLoaded": ng_DIPropertyEvent('function(c, settings) {}',{ Level: 'basic' }),
              "OnInitialized": ng_DIPropertyEvent('function(c, settings) {}',{ Level: 'basic' })
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
ngUserControls['viewmodel_controls_designinfo'] = ViewModel_Controls_DesignInfo;
