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
      "Calls": ng_diMixed(['object','databind_function_name']),
      "Data": ng_diType('databind_expression'),
      "Link": ng_diType('databind_expression', { Level: 'basic' }),
      "Controls": ng_diType('databind_expression', { Level: (di.IsContainer ? 'basic' : 'optional') })
    };

    // dependent bindings
    if(!di.NonVisual) {
      ng_MergeVar(props, {
        "MouseOver": ng_diType('databind_function_name')
      });

      if (typeof c.SetBounds === 'function')
      {
        props["Bounds"] = ng_diMixed(['object','databind_expression'], { Level: 'basic' });
      }

      if (typeof c.Elm === 'function')
      {
        props["style"] = ng_diMixed(['object','databind_expression']);
        props["className"] = ng_diType('databind_expression');
        props["SubClassName"] = ng_diType('databind_expression');
        props["BaseClassName"] = ng_diType('databind_expression');
      }

      if (typeof c.SetFocus === 'function')
      {
        props["Focus"] = ng_diType('databind_function_name', { Level: 'optional' });
      }

      if (typeof c.SetOpacity === 'function')
      {
        props["Opacity"] = ng_diType('databind_expression', { Level: 'basic' });
      }

      if (typeof c.SetVisible === 'function')
      {
        props["Visible"] = ng_diType('databind_expression', { Level: 'basic' });
      }
    }

    if (typeof c.SetEnabled === 'function')
    {
      props["Enabled"] = ng_diType('databind_expression', { Level: 'basic' });
      props["Disabled"] = ng_diType('databind_expression', { Level: 'basic' });
    }


    switch (c.DefType)
    {
      case 'ngSysTimer':
        props["Value"] = ng_diType('databind_expression', { Level: 'basic' });
        props["Command"] = ng_diType('databind_expression', { Level: 'basic' });
        break;

      case 'ngSysURLParams':
      case 'ngSysViewModelSettings':
      case 'ngSysRPC':
        props["Value"] = ng_diType('databind_expression', { Level: 'basic' });
        break;
    }

    var vm_di = {
      Properties: ng_diProperties({
        "ViewModel": ng_diType('viewmodel', { Level: 'basic', Order: 0.21, PropertyGroup: 'DataBind' }),
        "Data": {
          "ViewModelData": { Level: 'hidden' }
        },
        "Methods": {
          "SetViewModelData": ng_diFunction('function(val) { ng_CallParent(this,"SetViewModelData",arguments); }', { Level: 'advanced' }),
          "DoCreateViewModelControl": ng_diFunction('function(idx, itval, itvm, ci) { return { Type: \'\' }; }', { Level: (di.IsContainer ? 'basic' : 'optional') })
        },
        "Events": {
          "OnViewModelDataChanged": ng_diEvent('function(c, oldval) { }', { Level: 'basic' }),
          "OnDataBindingInit": ng_diEvent('function(c, bindingKey, valueAccessor, allBindings, bindingContext) { return true; }', { Level: 'optional' }),
          "OnDataBindingUpdate": ng_diEvent('function(c, bindingKey, valueAccessor, allBindings, bindingContext) { return true; }', { Level: 'optional' }),
          "OnIsViewModelControlChanged": ng_diEvent('function(c, val, oldval) { return true }', { Level: (di.IsContainer ? 'basic' : 'optional') })
        }
      },{
        "DataBind": ng_diMixed([
          ng_diBindings(props),
          ng_diObject({
            "Default": ng_diObject()
          }, undefined, { DestroyIfEmpty: true }),
          ng_diType('bindings_string')
        ], { Level: 'basic', Order: 0.5 }),
        "DOMDataBind": ng_diMixed([
          ng_diBindings(),
          ng_diObject({
            "Default": ng_diObject()
          }, undefined, { DestroyIfEmpty: true }),
          ng_diType('bindings_string')
        ], { Level: 'optional', Order: 0.5 })
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
        o[i] = ng_diType('databind_function_name');

        if (typeof props[i].Level !== undefined) o[i].Level = props[i].Level;
        else o[i].Level = 'advanced';
      }

      var eventprop1 = ng_diMixed([
        ng_diObject(o, undefined, { DestroyIfEmpty: true }),
        ng_diType('bindings_string')
      ], { Order: undefined });

      var eventprop2 = ng_diMixed([
        ng_diObject({}, undefined, { DestroyIfEmpty: true }),
        ng_diType('bindings_string')
      ]);
      for (var i in o)
      {
        eventprop2.Types['object'].ObjectProperties[i] = ng_CopyVar(o[i]);
        eventprop2.Types['object'].ObjectProperties[i].Level = 'advanced';
        delete eventprop2.Types['object'].ObjectProperties[i].Order;
      }

      var vm_events_di = {
        Properties: {
          "DataBind": ng_diBindings({
            "Events": eventprop1,
            "AfterEvents": eventprop2,
            "BeforeEvents": eventprop2,
            "OverrideEvents": eventprop2
          })
        }
      };
      ng_MergeVar(di, vm_events_di);
    }

    ng_MergeVar(di, vm_di);

    var deferbindings = {};
    var databindprops=di.Properties['DataBind'].Types['bindings'].ObjectProperties['0'].Types['object'].ObjectProperties;
    for(var i in window.ngBindingsHandlers) {
      if(typeof databindprops[i]!=='undefined') deferbindings[i]=ng_diBoolean(false);
    }

    ng_MergeVar(databindprops, {
      "DeferUpdates": ng_diObject(deferbindings)
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
            ChildDesignInfo: ng_diMixed(['undefined','jstypes'])
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
              "Required": ng_diBoolean(false, { Level: 'basic' })
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
              0: ng_diString('', { DisplayName: 'ID', Required: true, Level: 'basic' }, { InitValue: 'vmfield1' }),
              1: ng_diStringValues('STRING', [
                   'BOOL','INTEGER','FLOAT',
                   'SBYTE','BYTE','SHORT','USHORT','LONG','ULONG',
                   'DECIMAL','STRING','NVARCHAR',
                   'TIMESTAMP','DATETIME','DATE', 'TIME',
                   'UTCTIMESTAMP','UTCDATETIME','UTCDATE','UTCTIME',
                   'ARRAY','OBJECT'
                 ], { DisplayName: 'Type', Required: true, Level: 'basic' }),
              2: ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' })
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
              0: ng_diString('', { DisplayName: 'ID', Required: true, Level: 'basic' }, { InitValue: 'vmfield1' }),
              1: ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' })
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
              0: ng_diString('', { DisplayName: 'ID', Required: true, Level: 'basic' }, { InitValue: 'vmfield1' }),
              1: ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' })
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
          IsViewModel: true,
          NewControl: {
            Default: {
              Properties: {
                "ID": { ValueByRefName: true }
              }
            }
          },
          Properties: ng_diProperties({
            "ID": { Level: 'basic' },
            "Namespace": ng_diString('', { Level: 'basic', Order: 0.05 }),
            "FieldDefs": ng_diArrayOf(
              ng_diType('vmfielddef', {
                DefaultType: 'ngFieldDef_Integer',
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
              }), { Level: 'basic', Order: 0.051 }),
            "ViewModel": ng_diType('viewmodel_def', { Level: 'basic', Order: 0.052, PropertyGroup: 'Definition' }),
            "RefViewModel": ng_diType('vmid', { Level: 'basic', Order: 0.053 }),
            "Data": {
              "ViewModel": ng_diType('vmobject', { Level: 'basic' }),
              "DefaultValues": ng_diType('jsobject', { Level: 'basic' }),
              "ServerURL": ng_diType('url', {Level: 'basic' })
            },
            "Events": {
              "OnSetValues": ng_diEvent('function(c, values, deserialize) { return true; }',{ Level: 'basic' }),
              "OnGetValues": ng_diEvent('function(c, ret, writableonly, valuenames, errors, convtimestamps, serialize) {}',{ Level: 'basic' }),
              "OnCommand": ng_diEvent('function(c, cmd, options) { return true; }',{ Level: 'basic' }),
              "OnDoCommand": ng_diEvent('function(c, cmd, options, vals, err) { return true; }',{ Level: 'basic' }),
              "OnCommandRequest": ng_diEvent('function(c, rpc) { return true; }',{ Level: 'basic' }),
              "OnCommandResults": ng_diEvent('function(c, cmd, sresults) {}',{ Level: 'basic' }),
              "OnCommandFinished": ng_diEvent('function(c, cmd, sresults) {}',{ Level: 'basic' }),
              "OnCommandCancel": ng_diEvent('function(c) {}',{ Level: 'basic' }),
              "OnCommandData": ng_diEvent('function(c, cmd, sresults) {}',{ Level: 'basic' }),
              "OnViewModelChanged": ng_diEvent('function(c) {}',{ Level: 'basic' }),
              "OnErrors": ng_diEvent('function(c, errors) { return true; }',{ Level: 'basic' }),
              "OnShowErrors": ng_diEvent('function(c, errmsg, errors) { if(errmsg!="") alert(errmsg); }',{ Level: 'basic' }),
              "OnAssign": ng_diEvent('function(c, src) {}',{ Level: 'basic' })
            },
            "OverrideEvents": {
              "OnSetValue": ng_diEvent('function(c, setval, instance, valpath) { return setval; }',{ Level: 'basic' }),
              "OnGetValue": ng_diEvent('function(c, val,instance, valpath, errors) { return val; }',{ Level: 'basic' }),
              "OnGetCommandValueNames": ng_diEvent('function(c, cmd, options) { return []; }',{ Level: 'basic' }),
              "OnSetViewModel": ng_diEvent('function(c, vmodel) { return vmodel; }',{ Level: 'basic' }),
              "OnResults": ng_diEvent('function(c, results) { return results; }',{ Level: 'basic' })
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
          IsViewModel: true,
          Properties: ng_diProperties({
            "Events": {
              "OnSettingsLoaded": ng_diEvent('function(c, settings) {}',{ Level: 'basic' }),
              "OnInitialized": ng_diEvent('function(c, settings) {}',{ Level: 'basic' })
            }
          })
        };
      });

    }
  };
})();
ngUserControls['viewmodel_controls_designinfo'] = ViewModel_Controls_DesignInfo;
