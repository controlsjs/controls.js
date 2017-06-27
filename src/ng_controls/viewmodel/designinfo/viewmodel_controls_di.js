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
var ViewModel_Controls_DesignInfo = (function()
{
  function add_databind_di(di, def, c, ref)
  {
    var props = {
      "Calls": { DefaultType: 'object',
        Types: {
          'databind_function_name': {}
        }
      },
      "Data": { DefaultType: 'databind_expression' },
      "Link": { DefaultType: 'databind_expression', Level: 'basic' },
      "Controls": { DefaultType: 'databind_expression', Level: (di.IsContainer ? 'basic' : 'optional') }
    };

    // dependent bindings
    if(!di.NonVisual) {
      ng_MergeVar(props, {
        "MouseOver": {
          DefaultType: 'databind_function_name'
        }
      });

      if (typeof c.SetBounds === 'function')
      {
        props["Bounds"] = {
          DefaultType: 'object',
          Types: {
            'databind_expression': {}
          },
          Level: 'basic'
        };
      }

      if (typeof c.Elm === 'function')
      {
        props["style"] = {
          DefaultType: 'object',
          Types: {
            'databind_expression': {}
          }
        };
        props["className"] = { DefaultType: 'databind_expression' };
        props["SubClassName"] = { DefaultType: 'databind_expression' };
        props["BaseClassName"] = { DefaultType: 'databind_expression' };
      }

      if (typeof c.SetFocus === 'function')
      {
        props["Focus"] = { DefaultType: 'databind_function_name', Level: 'optional' };
      }

      if (typeof c.SetOpacity === 'function')
      {
        props["Opacity"] = { DefaultType: 'databind_expression', Level: 'basic' };
      }

      if (typeof c.SetVisible === 'function')
      {
        props["Visible"] = { DefaultType: 'databind_expression', Level: 'basic' };
      }
    }

    if (typeof c.SetEnabled === 'function')
    {
      props["Enabled"] = { DefaultType: 'databind_expression', Level: 'basic' };
      props["Disabled"] = { DefaultType: 'databind_expression', Level: 'basic' };
    }


    switch (c.DefType)
    {
      case 'ngSysTimer':
        props["Value"] = { DefaultType: 'databind_expression', Level: 'basic' };
        props["Command"] = { DefaultType: 'databind_expression', Level: 'basic' };
        break;

      case 'ngSysURLParams':
      case 'ngSysViewModelSettings':
      case 'ngSysRPC':
        props["Value"] = { DefaultType: 'databind_expression', Level: 'basic' };
        break;
    }

    var vm_di = {
      Properties: ng_DIProperties({
        "ViewModel": { DefaultType: 'viewmodel', Level: 'basic', Order: 0.21,
          PropertyGroup: 'DataBind'
        },
        "Data": {
          "ViewModelData": { Level: 'hidden' }
        },
        "Methods": {
          "SetViewModelData": ng_DIProperty('function', 'function(val) { ng_CallParent(this,"SetViewModelData",arguments); }', { Level: 'advanced' }),
          "DoCreateViewModelControl": ng_DIProperty('function', 'function(idx, itval, itvm, ci) { return { Type: \'\' }; }', { Level: (di.IsContainer ? 'basic' : 'optional') })
        },
        "Events": {
          "OnViewModelDataChanged": ng_DIPropertyEvent('function(c, oldval) { }', { Level: 'basic' }),
          "OnDataBindingInit": ng_DIPropertyEvent('function(c, bindingKey, valueAccessor, allBindings, bindingContext) { return true; }', { Level: 'optional' }),
          "OnDataBindingUpdate": ng_DIPropertyEvent('function(c, bindingKey, valueAccessor, allBindings, bindingContext) { return true; }', { Level: 'optional' }),
          "OnIsViewModelControlChanged": ng_DIPropertyEvent('function(c, val, oldval) { return true }', { Level: (di.IsContainer ? 'basic' : 'optional') })
        }
      },{
        "DataBind": { DefaultType: 'bindings', Level: 'basic', Order: 0.5,
          Types: {
            'bindings_string': {},
            'object': {
              DestroyIfEmpty: true,
              ObjectProperties: {
                Default: {
                  DefaultType: 'object'
                }
              }
            },
            'bindings': {
              ObjectProperties: {
                "0": {
                  Types: {
                    'object': {
                      ObjectProperties: props
                    }
                  }
                }
              }
            }
          }
        },
        "DOMDataBind": { DefaultType: 'bindings', Level: 'optional', Order: 0.5,
          PropertyGroup: 'DataBind',
          Types: {
            'bindings_string': {},
            'object': {
              DestroyIfEmpty: true,
              ObjectProperties: {
                Default: {
                  DefaultType: 'object'
                }
              }
            },
            'bindings': {}
          }
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
          DefaultType: 'databind_function_name'
        };

        if (typeof props[i].Level !== undefined) o[i].Level = props[i].Level;
        else o[i].Level = 'advanced';
      }

      var eventprop1 = {
        DefaultType: 'object',
        Types: {
          'bindings_string': {},
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
          'bindings_string': {},
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
              'bindings': {
                ObjectProperties: {
                  "0": {
                    Types: {
                      'object': {
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
              }
            }
          }
        }
      };
      ng_MergeVar(di, vm_events_di);
    }

    ng_MergeVar(di, vm_di);

    var deferbindings = {};
    var databindprops=di.Properties['DataBind'].Types['bindings'].ObjectProperties['0'].Types['object'].ObjectProperties;
    for(var i in window.ngBindingsHandlers) {
      if(typeof databindprops[i]!=='undefined') deferbindings[i]=ng_DIPropertyBool(false);
    }

    ng_MergeVar(databindprops, {
      "DeferUpdates": {
        DefaultType: 'object',
        Types: {
          'object': {
            ObjectProperties: deferbindings
          }
        }
      }
    });

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
        // ngFieldDefAttrs
        {
          TypeID: 'ngFieldDefAttrs',
          TypeBase: 'object',
          Name: 'ngFieldDef Attrs',
          ShortName: 'attrs',
          Options: {
            ObjectProperties: {
              "Required": { DefaultType: 'boolean', Level: 'basic' }
            }
          }
        },

        // ngFieldDef
        {
          TypeID: 'ngFieldDef',
          TypeBase: 'callee',
          Name: 'ngFieldDef',
          ShortName: 'FD',
          Options: {
            Callee: 'ngFieldDef',
            NewExpression: true,
            Level: 'hidden',
            Add: false,
            DefaultCode: "new ngFieldDef()",
            DefaultValue: [],
            InitValue: ["'vmfield1'", "'STRING'"],
            ObjectProperties: {
              0: { DefaultType: 'string', Level: 'basic',
                   DisplayName: 'ID',
                   Required: true,
                   Types: {
                     'string': {
                       InitValue: 'vmfield1'
                     }
                   }
                 },
              1: { DefaultType: 'string', Level: 'basic',
                   DisplayName: 'Type',
                   Required: true,
                   Types: {
                     'string': {
                       DefaultValue: 'STRING',
                       Editor: 'ngfeEditor_DropDownList',
                       EditorOptions: {
                         Items: [
                           'BOOL','INTEGER','FLOAT',
                           'SBYTE','BYTE','SHORT','USHORT','LONG','ULONG',
                           'DECIMAL','STRING','NVARCHAR',
                           'TIMESTAMP','DATETIME','DATE', 'TIME',
                           'UTCTIMESTAMP','UTCDATETIME','UTCDATE','UTCTIME',
                           'ARRAY','OBJECT'
                         ]
                       }
                     }
                   }
                 },
              2: { DefaultType: 'ngFieldDefAttrs', Level: 'basic',
                   DisplayName: 'Attrs'
                 }
            }
          }
        },

        // ngFieldDef_Bool
        {
          TypeID: 'ngFieldDef_Bool',
          TypeBase: 'callee',
          Name: 'ngFieldDef_Bool',
          ShortName: 'BOOL',
          Options: {
            Callee: 'ngFieldDef_Bool',
            NewExpression: true,
            DefaultCode: "new ngFieldDef_Bool()",
            DefaultValue: [],
            InitValue: ["'vmfield1'"],
            Add: false,
            ObjectProperties: {
              0: { DefaultType: 'string', Level: 'basic',
                   DisplayName: 'ID',
                   Required: true,
                   Types: {
                     'string': {
                       InitValue: 'vmfield1'
                     }
                   }
                 },
              1: { DefaultType: 'ngFieldDefAttrs', Level: 'basic',
                   DisplayName: 'Attrs'
                 }
            }
          }
        },

        // ngFieldDef_Integer
        {
          TypeID: 'ngFieldDef_Integer',
          TypeBase: 'callee',
          Name: 'ngFieldDef_Integer',
          ShortName: 'INT',
          Options: {
            Callee: 'ngFieldDef_Integer',
            NewExpression: true,
            DefaultCode: "new ngFieldDef_Integer()",
            DefaultValue: [],
            InitValue: ["'vmfield1'"],
            Add: false,
            ObjectProperties: {
              0: { DefaultType: 'string', Level: 'basic',
                   DisplayName: 'ID',
                   Required: true,
                   Types: {
                     'string': {
                       InitValue: 'vmfield1'
                     }
                   }
                 },
              1: { DefaultType: 'ngFieldDefAttrs', Level: 'basic',
                   DisplayName: 'Attrs'
                 }
            }
          }
        }


      ];
      FormEditor.RegisterPropertyType(vm_types);

      FE.RegisterPropertyTypesGroup('viewmodel',     ['vmid','vmobject']);
      FE.RegisterPropertyTypesGroup('viewmodel_def', ['vmobject', 'vmconstructor']);
      FE.RegisterPropertyTypesGroup('vmfielddef',    ['ngFieldDef',
                                                      'ngFieldDef_Bool',
                                                      'ngFieldDef_Integer'
                                                       // TODO: Implement more ngFieldDef_*
                                                     ]); 

    },
    OnControlDesignInfo: function(def, c, ref)
    {
      if((c)&&(!def.CtrlInheritanceDepth))
      {
        // define Databind DesignInfo of all controls
        add_databind_di(c.DesignInfo, def, c, ref); // TODO: determine how to make it last call ever
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
                    DefaultType: 'ngFieldDef_Integer',
                    Types: {
                      'vmfielddef': {}
                    },
                    OnPropertyInit: function(ch)
                    {
                      if (FormEditor.PropertyTypeInheritsFrom(ch.Type, 'callee'))
                      {
                        var pname = ch.Name.substring(0, ch.Name.lastIndexOf('.'));
                        if (pname)
                        {
                          var controlsprops = FormEditor.GetControlsProperty(pname, [ch.ControlID]);
                          var itemscnt = (controlsprops[0] && (ng_IsArrayVar(controlsprops[0].PropertyValue)) ) ? controlsprops[0].PropertyValue.length : 0;

                          if (!ng_IsArrayVar(ch.Value)) ch.Value = [];
                          ch.Value[0] = "'Field" + (itemscnt + 1) + "'";
                        }
                      }
                      return true;
                    }
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
            "DataBind": { Level: 'optional' }
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

    }
  };
})();
ngUserControls['viewmodel_controls_designinfo'] = ViewModel_Controls_DesignInfo;
