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
  var vm_ids={};
  var vm_namespaces={};

  function editor_vmids(api) {
    var items=[];
    for(var i in vm_ids) items.push(i);
    for(var i in ngViewModels)
      if(!vm_ids[i]) items.push(i);
    items.sort();
    return items;
  }

  function editor_vmnamespaces(api) {
    var items=[];
    for(var i in vm_namespaces)
      items.push(i);
    for(var i in ngViewModelNamespaces)
      if(!vm_namespaces[i]) items.push(i);
    items.sort();
    return items;
  }

  function scanvm(expr,flditems,fncitems,vm,pref) {
    var f;
    for(var j in vm) {
      f=vm[j];
      if(j==='Owner') continue;
      if(ngIsFieldDef(f)) { if(flditems) flditems.push(pref+j+'.Value'+(expr ? '()' : '')); continue; }
      if(ko.isObservable(f)) { if(flditems) flditems.push(pref+j+(expr ? '()' : '')); continue; }
      if(typeof f==='function') { if(fncitems) fncitems.push(pref+j); continue; }
      if(ng_IsObjVar(f)) { scanvm(expr,flditems,fncitems,f,j+'.'); continue; }
      if(flditems) flditems.push(pref+j);
    }
  }

  function editor_scanvm(api,expr,fld_items,fnc_items) {
    var flditems,fncitems,vm,c,ctrls=FormEditor.GetSelectedControls();
    var vms=[];
    for(var i=0;i<ctrls.length;i++) {
      c=ctrls[i].Control;
      if(!c) continue;
      vm=ng_FindViewModel({},c);
      if((!vm)||(ng_inArray(vm,vms))) continue;
      vms.push(vm);
      if(!ng_IsObjVar(vm.ViewModel)) continue;
      if(fld_items) flditems=[];
      if(fnc_items) fncitems=[];
      scanvm(expr,flditems,fncitems,vm.ViewModel,'');
      if(fld_items) {
        if(!i) for(var j=0;j<flditems.length;j++) fld_items.push(flditems[j]);
        else ng_ArrayIntersect(fld_items,flditems);
      }
      if(fnc_items) {
        if(!i) for(var j=0;j<fncitems.length;j++) fnc_items.push(fncitems[j]);
        else ng_ArrayIntersect(fnc_items,fncitems);
      }
    }
  }

  function editor_vm_fields(api) {
    var items=[];
    editor_scanvm(api,false,items);
    if(!items.length) return;
    items.sort();
    return items;
  }

  function editor_vm_fieldsexpr(api) {
    var items=[];
    editor_scanvm(api,true,items);
    if(!items.length) return;
    items.sort();
    return items;
  }

  function editor_vm_functions(api) {
    var items=[];
    editor_scanvm(api,false,null,items);
    if(!items.length) return;
    items.sort();
    return items;
  }

  function add_databind_di(di, def, c, ref)
  {
    var props = {
      "Calls": ng_diMixed([ng_diObject(undefined, undefined, {
        ChildDesignInfo: ng_diType('databind_function_name', { Level: 'basic' }, {
          EditorOptions: {
            IgnoreDataModel: true
          }
        })
      }),ng_diType('bindings_string')
      ], { Level: 'advanced' }),
      "Data": ng_diType('vm_databind_field', { Level: 'advanced' }),
      "Link": ng_diType('vm_databind_field', { Level: 'basic' }),
      "Controls": ng_diType('vm_databind_field', { Level: (di.IsContainer ? 'basic' : 'optional') })
    };

    // dependent bindings
    if(!di.NonVisual) {
      ng_MergeVar(props, {
        "MouseOver": ng_diType('vm_databind_function_name', { Level: 'advanced' })
      });

      if (typeof c.SetBounds === 'function')
      {
        var bprops={};
        var dip=ng_IsObjVar(di.Properties) ? di.Properties : {};
        if((dip.L)&&(typeof dip.L==='object')) bprops['L']=ng_diType('vm_databind_field', { DisplayName: 'Left (L)', Level: 'basic', Order: 0.11 });
        if((dip.T)&&(typeof dip.T==='object')) bprops['T']=ng_diType('vm_databind_field', { DisplayName: 'Top (T)', Level: 'basic', Order: 0.12 });
        if((dip.R)&&(typeof dip.R==='object')) bprops['R']=ng_diType('vm_databind_field', { DisplayName: 'Right (R)', Level: 'basic', Order: 0.15 });
        if((dip.B)&&(typeof dip.B==='object')) bprops['B']=ng_diType('vm_databind_field', { DisplayName: 'Bottom (B)', Level: 'basic', Order: 0.16 });
        if((dip.W)&&(typeof dip.W==='object')) bprops['W']=ng_diType('vm_databind_field', { DisplayName: 'Width (W)', Level: 'basic', Order: 0.13 });
        if((dip.H)&&(typeof dip.H==='object')) bprops['H']=ng_diType('vm_databind_field', { DisplayName: 'Height (H)', Level: 'basic', Order: 0.14 });
        props["Bounds"] = ng_diMixed([ng_diObject(bprops),'vm_databind_field'], { Level: 'basic', Collapsed: false });
      }

      if (typeof c.Elm === 'function')
      {
        var sprops={};
        var distyleprops=ng_IsObjVar(di.Properties) &&
                         ng_IsObjVar(di.Properties.style) &&
                         ng_IsObjVar(di.Properties.style.Types) &&
                         ng_IsObjVar(di.Properties.style.Types['object']) &&
                         ng_IsObjVar(di.Properties.style.Types['object'].ObjectProperties) ? di.Properties.style.Types['object'].ObjectProperties : {};

        for(var j in distyleprops) {
          sprops[j]=ng_diType('vm_databind_field', { Level: distyleprops[j].Level });
        }
        props["style"] = ng_diMixed([ng_diObject(sprops),'vm_databind_field'], { Level: 'advanced' });

        props["className"] = ng_diType('vm_databind_field', { Level: 'advanced' });
        props["SubClassName"] = ng_diType('vm_databind_field', { Level: 'advanced' });
        props["BaseClassName"] = ng_diType('vm_databind_field', { Level: 'advanced' });
      }

      if (typeof c.SetFocus === 'function')
      {
        props["Focus"] = ng_diType('vm_databind_function_name', { Level: 'optional' });
      }

      if (typeof c.SetOpacity === 'function')
      {
        props["Opacity"] = ng_diType('vm_databind_field', { Level: 'basic' });
      }

      if (typeof c.SetVisible === 'function')
      {
        props["Visible"] = ng_diType('vm_databind_field', { Level: 'basic' });
      }
    }

    if (typeof c.SetEnabled === 'function')
    {
      props["Enabled"] = ng_diType('vm_databind_field', { Level: 'basic' });
      props["Disabled"] = ng_diType('vm_databind_field', { Level: 'basic' });
    }


    switch (c.DefType)
    {
      case 'ngSysTimer':
        props["Value"] = ng_diType('vm_databind_field', { Level: 'basic' });
        props["Command"] = ng_diType('databind_string', { Level: 'basic' });
        break;

      case 'ngSysURLParams':
      case 'ngSysViewModelSettings':
      case 'ngSysRPC':
        props["Value"] = ng_diType('vm_databind_field', { Level: 'basic' });
        break;
    }

    var vm_di = {
      Properties: ng_diProperties({
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
          "OnIsViewModelControlChanged": ng_diEvent('function(c, val, oldval) { return true; }', { Level: (di.IsContainer ? 'basic' : 'optional') })
        }
      },{
        "DataBind": ng_diMixed([
          ng_diBindings(props),
          ng_diObject({
            "Default": {}
          }, undefined, {
            DestroyIfEmpty: true,
            ChildDesignInfo: ng_diMixed([
              ng_diBindings(props),
              ng_diType('bindings_string')
            ], { Level: 'basic' })
          }),
          ng_diType('bindings_string')
        ], { Level: 'basic', Order: 0.5 }),
        "DOMDataBind": ng_diMixed([
          ng_diBindings(),
          ng_diObject({
            "Default": {}
          }, undefined, {
            DestroyIfEmpty: true,
            ChildDesignInfo: ng_diMixed([
              ng_diBindings(),
              ng_diType('bindings_string')
            ], { Level: 'basic' })
          }),
          ng_diType('bindings_string')
        ], { Level: 'optional', Order: 0.5, PropertyGroup: 'DataBind' })
      })
    };
    if((c.DesignInfo)&&((!c.DesignInfo.NonVisual)||(!c.CtrlInheritsFrom('ngSysViewModel')))) {
      vm_di.Properties["ViewModel"]=ng_diType('viewmodel', { Level: 'basic', Order: 0.21, PropertyGroup: 'DataBind',
        Types: {
          'vmid': {
            DefaultValue: 'As parent or owner',
            InitValue: '',
            Editor: 'ngfeEditor_DropDown',
            EditorOptions: {
              Items: editor_vmids
            }
          }
        }
      });
    }
    

    // handle DataBind Events properties
    if (di && di.Properties && di.Properties.Events && di.Properties.Events.Types && di.Properties.Events.Types['object'])
    {
      var netbeans = ((typeof CodeMirrorIntegration !== 'undefined')&&(typeof CodeMirrorIntegration.RunningInNetBeans === 'function')&&(CodeMirrorIntegration.RunningInNetBeans()));

      var o = {},
          props = di.Properties.Events.Types['object'].ObjectProperties;
      for (var i in props)
      {
        o[i] = ng_diType('vm_databind_function_name');

        if (typeof props[i].Level !== undefined) o[i].Level = props[i].Level;
        else o[i].Level = 'advanced';
      }

      var eventprop1 = ng_diMixed([
        ng_diObject(o, undefined, { DestroyIfEmpty: true }),
        ng_diType('bindings_string')
      ], { Order: undefined, Level: 'advanced' });

      var eventprop2 = ng_diMixed([
        ng_diObject({}, undefined, { DestroyIfEmpty: true }),
        ng_diType('bindings_string')
      ], { Level: 'advanced' });
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
      "DeferUpdates": ng_diObject(deferbindings, { Level: 'advanced' }, { ChildDesignInfo: ng_diBoolean(false, { Level: 'basic' }) })
    });

  }

  function getpropertytext(p) {
    return (p.PropertyType==='string' ? ngVal(p.PropertyValue,'') : '');
  }

  return {
    OnFormEditorInit: function(FE) {

      FE.AddEvent('OnCreateForm', function(test) {
        if(test) return;
        vm_ids={};
        vm_namespaces={};
      });

      var fdtypes=['ngFieldDef'];
      var fdbasetypes=[
        'BOOL','INTEGER','FLOAT',
        'SBYTE','BYTE','SHORT','USHORT','LONG','ULONG',
        'DECIMAL','STRING','NVARCHAR',
        'TIMESTAMP','DATETIME','DATE', 'TIME',
        'UTCTIMESTAMP','UTCDATETIME','UTCDATE','UTCTIME',
        'ARRAY','OBJECT'
      ];

      var attrsprops={
        "PrivateField": ng_diBoolean(false, { Level: 'basic' }),
        "DisplayName": ng_diMixed(['undefined','string'], { Level: 'basic', InitType: 'string' }),
        "Size": ng_diMixed(['undefined','integer'], { Level: 'basic', InitType: 'integer' }),
        "Precision": ng_diMixed(['undefined','integer'], { Level: 'basic' }),
        "Required": ng_diBoolean(false, { Level: 'basic' }),
        "NullIfEmpty": ng_diBoolean(true, { Level: 'basic' }),
        "AllowEmpty": ng_diBoolean(false, { Level: 'basic' }),
        "AutoTrim": ng_diIntegerIdentifiers(1,['fdNoTrim','fdTrim','fdLeftTrim','fdRightTrim'],{ Level: 'basic' }),
        "ReadOnly": ng_diMixed(['undefined',ng_diBoolean(true)], { Level: 'basic', InitType: 'boolean' }),
        "MinValue": ng_diType('jstypes', { Level: 'basic', DefaultType: 'undefined' }),
        "MaxValue": ng_diType('jstypes', { Level: 'basic', DefaultType: 'undefined' }),
        "Enum": ng_diArrayOf(ng_diType('jstypes', { DefaultType: 'undefined' }), { Level: 'basic' }),
        "DefaultValue": ng_diType('jstypes', { Level: 'basic', DefaultType: 'undefined' }),
        "Command": ng_diMixed(['undefined','string'], { Level: 'basic', InitType: 'string' }),
        "NoReset": ng_diBoolean(false, { Level: 'basic' }),
        "Value": ng_diMixed(['ko.observable','ko.computed','jstypes'], { Level: 'basic', DefaultType: 'undefined' }),
        "RemoveEmptyItems": ng_diBoolean(false, { Level: 'optional' }),
        "Serialize": ng_diBoolean(true, { Level: 'advanced' }),
        "DateTimeFormat": ng_diString('', { Level: 'basic' }),
        "DateFormat": ng_diString('', { Level: 'basic' }),
        "TimeFormat": ng_diString('', { Level: 'basic' }),
        "FormatNumber": ng_diBoolean(false, { Level: 'basic' }),
        "DecimalSeparator": ng_diString('', { Level: 'basic' }),
        "ThousandsSeparator": ng_diString('', { Level: 'basic' }),

        "EditNumStep": ng_diInteger(1, { Level: 'optional' }),
        "EditNumStepRound": ng_diBoolean(false, { Level: 'optional' })
      };

      if(typeof ngUserControls['dbviewmodel'] === 'object')
      {
        attrsprops["PrimaryKey"]=ng_diBoolean(false, { Level: 'basic' });
        attrsprops["ReadOnly"]=ng_diBoolean(false, { Level: 'basic' });
        attrsprops["DBField"]=ng_diMixed(['boolean','string'], { Level: 'basic' });
      }
      if(typeof ngUserControls['viewmodel_dataset'] === 'object')
      {
        attrsprops["DataSetColumnAlign"]=ng_diStringValues('left', ['left', 'center', 'right'], { Level: 'optional' });
        attrsprops["DataSetColumnWidth"]=ng_diMixed(['undefined',ng_diInteger(0, {}, { InitValue: 100 })], { Level: 'optional', InitType: 'integer' });
      }

      function fdtype(typename, shortname, args) {
        fdtypes.push(typename);
        var di={
          TypeID: typename,
          TypeBase: 'callee',
          Name: typename,
          ShortName: shortname,
          Options: {
            Callee: typename,
            NewExpression: true,
            Add: false,
            DefaultCode: "new "+typename+"('')",
            DefaultValue: ["''"],
            ObjectProperties: {
              0: ng_diString('', { DisplayName: 'ID', Level: 'basic' })
            }
          }
        };
        if(args) {
          for(var i = 0; i<args.length; i++) {
            di.Options.ObjectProperties[i+1]=args[i];
          }
        }
        return di;
      }

      function fdattrvaltype(type,prop,nominmax) {
        if(!prop) prop={};
        var di={ 
          "Size": { Level: 'optional' },
          "Precision": { Level: 'optional' },
          "DefaultValue": { DefaultType: type },
          "Enum": { Types: { array: { ChildDesignInfo: { DefaultType: type }} } },
          "DateTimeFormat": { Level: 'optional' },
          "DateFormat": { Level: 'optional' },
          "TimeFormat": { Level: 'optional' },
        };
        switch(type) {
          case 'integer':
          case 'float':
            ng_MergeVar(di, {
              "FormatNumber": { Level: 'basic' },
              "DecimalSeparator": { Level: 'basic' },
              "ThousandsSeparator": { Level: 'basic' }
            })
          default:
            ng_MergeVar(di, {
              "FormatNumber": { Level: 'optional' },
              "DecimalSeparator": { Level: 'optional' },
              "ThousandsSeparator": { Level: 'optional' }
            })
        }

        if(!nominmax) {
          ng_MergeVar(di,{
            "MinValue": { DefaultType: type },
            "MaxValue": { DefaultType: type }
          });
        }
        else {
          ng_MergeVar(di,{
            "MinValue": { Level: 'optional' },
            "MaxValue": { Level: 'optional' }
          });
        }
        ng_MergeVar(prop,di);
        return { ObjectProperties: prop };
      }

      function fdattrvalstring(prop,nominmax) {
        if(!prop) prop={};
        ng_MergeVar(prop,{
          "Size": { Level: 'basic' }
        });
        return fdattrvaltype('string',prop,nominmax)
      }

      function vmdisplayname(pname, dispname) {
        var txt='';
        var idprops = FormEditor.GetSelectedControlsProperty(pname+'.0');
        for(var i=0;i<idprops.length;i++) {
          t=getpropertytext(idprops[i]);
          if(!i) txt=t;
          else if(t!=txt) { txt=''; break; }
        }
        var dn=dispname;
        if((txt!='')&&(dn!=txt)) dn=dn+': '+txt;
        return dn;
      }

      var vm_types = [
        // vm_databind_identifier
        {
          TypeID: 'vm_databind_identifier',
          TypeBase: 'databind_identifier',
          Name: 'databind identifier',
          ShortName: 'id',
          Options: {
            Priority: 0.21,
            EditorOptions: {
              Items: editor_vm_fields
            }
          }
        },
        // vm_databind_expression
        {
          TypeID: 'vm_databind_expression',
          TypeBase: 'databind_expression',
          Name: 'databind expression',
          Options: {
            Priority: 0.2,
            EditorOptions: {
              Items: editor_vm_fieldsexpr
            }
          }
        },
        // vm_databind_function_name
        {
          TypeID: 'vm_databind_function_name',
          TypeBase: 'databind_function_name',
          Name: 'databind function name',
          ShortName: 'fnc',
          Options: {
            EditorOptions: {
              Items: editor_vm_functions
            }
          }
        },

        // ko.observable
        {
          TypeID: 'ko.observable',
          TypeBase: 'callee',
          Name: 'ko.observable',
          ShortName: 'ko.o',
          Options: {
            Callee: 'ko.observable',
            NewExpression: false,
            Add: false,
            DefaultCode: "ko.observable('')",
            DefaultValue: ["''"],
            ObjectProperties: {
              0: ng_diType('jstypes', { DisplayName: 'Value', Required: true, Level: 'basic', DefaultType: 'string' })
            }
          }
        },

        // ko.computed
        {
          TypeID: 'ko.computed',
          TypeBase: 'callee',
          Name: 'ko.computed',
          ShortName: 'ko.c',
          Options: {
            Callee: 'ko.computed',
            NewExpression: false,
            Add: false,
            DefaultCode: "ko.computed({ read: function() {}, write: function(v) {}, owner: this})",
            DefaultValue: ['{ read: function() {}, write: function(v) {}, owner: this}'],
            ObjectProperties: {
              0: ng_diObject({
                "read": ng_diFunction('function() {}', { Required: true, Level: 'basic' }),
                "write": ng_diFunction('function(v) {}', { Level: 'basic' }),
                "owner": ng_diTypeVal('identifier','this', { Level: 'basic' })
              }, { DisplayName: 'Computed', Level: 'basic' })
            }
          }
        },

        // ViewModel Identifier
        {
          TypeID: 'vmid',
          TypeBase: 'string',
          Name: 'viewmodel id',
          ShortName: 'id',
          Options: {
          }
        },
        // ViewModel Object
        {
          TypeID: 'vmobject',
          TypeBase: 'object',
          Name: 'viewmodel object',
          ShortName: 'obj',
          Options: {
            ChildDesignInfo: ng_diMixed(['ko.observable','ko.computed','jstypes'], { Level: 'basic', DefaultType: 'undefined' })
          }
        },
        // ViewModel Constructor
        {
          TypeID: 'vmconstructor',
          TypeBase: 'function',
          Name: 'viewmodel constructor',
          ShortName: 'fnc',
          Options: {
            DefaultCode: 'function(vm) {}',
            DefaultValue: 'function(vm) {}'
          }
        },
        // ngViewModel
        {
          TypeID: 'ngViewModel',
          TypeBase: 'callee',
          Name: 'ngViewModel',
          ShortName: 'vm',
          Options: {
            Callee: 'ngViewModel',
            NewExpression: true,
            Add: false,
            DefaultCode: "new ngViewModel('')",
            DefaultValue: ["''"],
            ObjectProperties: {
              0: ng_diString('', { DisplayName: 'ID', Level: 'basic'}),
              1: ng_diString('', { DisplayName: 'Namespace', Level: 'basic'}),
              2: ng_diMixed(['vmobject', 'vmconstructor'], { DisplayName: 'ViewModel', Level: 'basic'}),
              3: ng_diType('url', { DisplayName: 'URL', Level: 'basic'})
            }
          }
        },

        // ngFieldDefAttrs
        {
          TypeID: 'ngFieldDefAttrs',
          TypeBase: 'object',
          Name: 'ngFieldDef Attrs',
          ShortName: 'attrs',
          Options: {
            ObjectProperties: attrsprops 
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
            InitValue: ["''", "'STRING'"],
            ObjectProperties: {
              0: ng_diString('', { DisplayName: 'ID', Required: true, Level: 'basic' }),
              1: ng_diStringValues('STRING', fdbasetypes, { DisplayName: 'Type', Required: true, Level: 'basic' }),
              2: ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' })
            }
          }
        },

        // ngFieldDefsArray
        {
          TypeID: 'ngFieldDefsArray',
          TypeBase: 'array',
          Name: 'ngFieldDefs',
          ShortName: 'fds',
          Basic: false,
          Options: {
            ChildDesignInfo: ng_diType('vmfielddef', {
              DefaultType: 'ngFieldDef_String',
              Level: 'basic',
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
              },
              DisplayName: vmdisplayname
            })
          }
        },

        // ngFieldDefsObject
        {
          TypeID: 'ngFieldDefsObject',
          TypeBase: 'object',
          Name: 'ngFieldDefsObject',
          ShortName: 'obj',
          Basic: false,
          Options: {
            ChildDesignInfo: ng_diType('vmfielddef', {
              DefaultType: 'ngFieldDef_String',
              Level: 'basic',
              DisplayName: vmdisplayname
            })
          }
        },


        // ngFieldDef_Bool
        fdtype('ngFieldDef_Bool', 'BOOL', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('boolean'))
        ]),

        // ngFieldDef_Integer
        fdtype('ngFieldDef_Integer', 'INT', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('integer'))
        ]),

        // ngFieldDef_Float
        fdtype('ngFieldDef_Float', 'FLT', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('float'))
        ]),

        // ngFieldDef_SByte
        fdtype('ngFieldDef_SByte', 'SB', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('integer'))
        ]),

        // ngFieldDef_Byte
        fdtype('ngFieldDef_Byte', 'B', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('integer'))
        ]),

        // ngFieldDef_Short
        fdtype('ngFieldDef_Short', 'S', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('integer'))
        ]),

        // ngFieldDef_UShort
        fdtype('ngFieldDef_UShort', 'US', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('integer'))
        ]),

        // ngFieldDef_Long
        fdtype('ngFieldDef_Long', 'L', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('integer'))
        ]),

        // ngFieldDef_ULong
        fdtype('ngFieldDef_ULong', 'UL', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('integer'))
        ]),

        // ngFieldDef_Decimal
        fdtype('ngFieldDef_Decimal', 'DEC', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('string', {
            'Size': { Level: 'basic' },
            'Precision': { Level: 'basic' },
            'FormatNumber': { Level: 'basic' },
            'DecimalSeparator': { Level: 'basic' },
            'ThousandsSeparator': { Level: 'basic' }
          }, true))
        ]),

        // ngFieldDef_String
        fdtype('ngFieldDef_String', 'STR', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvalstring())
        ]),

        // ngFieldDef_Timestamp
        fdtype('ngFieldDef_Timestamp', 'TS', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('datetime', {
            "DateTimeFormat": { Level: 'basic' }
          }))
        ]),

        // ngFieldDef_DateTime
        fdtype('ngFieldDef_DateTime', 'DT', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('datetime', {
            "DateTimeFormat": { Level: 'basic' }
          }))
        ]),

        // ngFieldDef_Date
        fdtype('ngFieldDef_Date', 'D', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('date', {
            "DateFormat": { Level: 'basic' }
          }))
        ]),

        // ngFieldDef_Time
        fdtype('ngFieldDef_Time', 'T', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('datetime', {
            "TimeFormat": { Level: 'basic' }
          }))
        ]),

        // ngFieldDef_UTCTimestamp
        fdtype('ngFieldDef_UTCTimestamp', 'UTS', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('datetime', {
            "DateTimeFormat": { Level: 'basic' }
          }))
        ]),

        // ngFieldDef_UTCDateTime
        fdtype('ngFieldDef_UTCDateTime', 'UDT', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('datetime', {
            "DateTimeFormat": { Level: 'basic' }
          }))
        ]),

        // ngFieldDef_UTCDate
        fdtype('ngFieldDef_UTCDate', 'UD', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('date', {
            "DateFormat": { Level: 'basic' }
          }))
        ]),

        // ngFieldDef_UTCTime
        fdtype('ngFieldDef_UTCTime', 'UT', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('datetime', {
            "TimeFormat": { Level: 'basic' }
          }))
        ]),

        // ngFieldDef_Array
        fdtype('ngFieldDef_Array', 'ARR', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('array', {
            'RemoveEmptyItems': { Level: 'basic' }
          })),
          ng_diMixed(['undefined','vmfielddef'], { DisplayName: 'ValueFieldDef', InitType: 'ngFieldDef_String', Level: 'basic' })
        ]),

        // ngFieldDef_Object
        fdtype('ngFieldDef_Object', 'OBJ', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('object',{},true)),
          ng_diMixed(['undefined','ngFieldDefsObject'], { DisplayName: 'PropsFieldDefs', InitType: 'ngFieldDefsObject', Level: 'basic' })
        ]),

        // ngFieldDef_WWW
        fdtype('ngFieldDef_WWW', 'WWW', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvalstring())
        ]),

        // ngFieldDef_Email
        fdtype('ngFieldDef_Email', '@', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvalstring({
            'AtSignIfEmpty': ng_diBoolean(true, { Level: 'basic' }),
          }))
        ]),

        // ngFieldDef_IP4
        fdtype('ngFieldDef_IP4', 'IP4', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvalstring())
        ]),

        // ngFieldDef_IP4
        fdtype('ngFieldDef_IP6', 'IP6', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvalstring())
        ]),

        // ngFieldDef_IP46
        fdtype('ngFieldDef_IP46', 'IP46', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvalstring())
        ]),

        // ngFieldDef_Currency
        fdtype('ngFieldDef_Currency', 'CUR', [
          ng_diString('', { DisplayName: 'Units', Level: 'basic' }),
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('string', {
            'Size': ng_diInteger(23, { Level: 'basic' }),
            'Precision': ng_diInteger(3, { Level: 'basic' }),
            'FormatNumber': { Level: 'basic' },
            'DecimalSeparator': { Level: 'basic' },
            'ThousandsSeparator': { Level: 'basic' },
            'CurrencyPrefix': ng_diString('', { Level: 'basic' }),
            'CurrencySuffix': ng_diString('', { Level: 'basic' }),
          })),
          ng_diStringValues('DECIMAL', fdbasetypes, { DisplayName: 'FieldType', Level: 'basic' })
        ]),

        // ngFieldDef_Distance
        fdtype('ngFieldDef_Distance', 'm', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('float', {
            'Precision': ng_diInteger(2, { Level: 'basic' })
          })),
          ng_diStringValues('FLOAT', fdbasetypes, { DisplayName: 'FieldType', Level: 'basic' })
        ]),

        // ngFieldDef_Area
        fdtype('ngFieldDef_Area', 'm2', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('float', {
            'Precision': ng_diInteger(2, { Level: 'basic' })
          })),
          ng_diStringValues('FLOAT', fdbasetypes, { DisplayName: 'FieldType', Level: 'basic' })
        ]),

        // ngFieldDef_Area
        fdtype('ngFieldDef_SIUnits', 'SI', [
          ng_diString('', { DisplayName: 'Units', Level: 'basic' }),
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('float', {
            'Precision': ng_diInteger(2, { Level: 'basic' }),
            'SIUnits': ng_diString('', { Level: 'basic' }),
            'SIAllowedPref': ng_diString('', { Level: 'basic' })
          })),
          ng_diString('', { DisplayName: 'SIAllowedPref', Level: 'basic' }),
          ng_diStringValues('FLOAT', fdbasetypes, { DisplayName: 'FieldType', Level: 'basic' })
        ]),

        // ngFieldDef_Minutes
        fdtype('ngFieldDef_Minutes', 'min', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('integer', {
            'Precision': ng_diInteger(0, { Level: 'basic' })
          })),
          ng_diStringValues('INTEGER', fdbasetypes, { DisplayName: 'FieldType', Level: 'basic' })
        ]),

        // ngFieldDef_Seconds
        fdtype('ngFieldDef_Seconds', 'sec', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('integer', {
            'Precision': ng_diInteger(0, { Level: 'basic' })
          })),
          ng_diStringValues('INTEGER', fdbasetypes, { DisplayName: 'FieldType', Level: 'basic' })
        ]),

        // ngFieldDef_Bytes
        fdtype('ngFieldDef_Bytes', 'kB', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('integer', {
            'Precision': ng_diInteger(0, { Level: 'basic' })
          })),
          ng_diStringValues('INTEGER', fdbasetypes, { DisplayName: 'FieldType', Level: 'basic' })
        ]),

        // ngFieldDef_RegExp
        fdtype('ngFieldDef_RegExp', 'reX', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvalstring({
            'RegExp': ng_diString('', { Level: 'basic' }),
            'RegExpMods': ng_diString('', { Level: 'basic' }),
            'RegExpError': ng_diString('', { Level: 'basic' })
          }))
        ]),

        // ngFieldDef_Percent
        fdtype('ngFieldDef_Percent', '%', [
          ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvaltype('string', {
            'Size': ng_diInteger(3,{ Level: 'basic' }),
            'Precision': ng_diInteger(0,{ Level: 'basic' }),
            'MinValue': ng_diInteger(0),
            'MaxValue': ng_diInteger(100)
          }, true))
        ])
      ];

      // ngFieldDef_Phone
      if(typeof ng_isPhone === 'function') {
        vm_types.push(
          fdtype('ngFieldDef_Phone', 'TEL', [
            ng_diType('ngFieldDefAttrs', { DisplayName: 'Attrs', Level: 'basic' }, fdattrvalstring({
              //'Size': { DefaultValue: NG_PHONE_MAXLENGTH },
              'PhoneAllowedPrefixes': ng_diType('array_strings', { Level: 'basic' }),
              'PhoneAllowShortcode': ng_diBoolean(false, { Level: 'basic' }),
              'PhonePrefix': ng_diString('', { Level: 'basic' }),
              'PhonePrefixOperation': ng_diIntegerIdentifiers(1,[{Value:-1,Text:'NG_PHONE_PREFIX_REMOVE'},{Value:0,Text:'NG_PHONE_PREFIX_DONTCHANGE'},{Value:1,Text:'NG_PHONE_PREFIX_ADD'},{Value:2,Text:'NG_PHONE_PREFIX_REPLACE'}],{ Level: 'basic' }),

              'PhoneZeros': ng_diBoolean(false, { Level: 'basic' }),
              'PhoneAllowedShortcodes': ng_diType('array_strings', { Level: 'basic' })
            }))
          ])
        );
      }

      FormEditor.RegisterPropertyType(vm_types);

      FE.RegisterPropertyTypesGroup('vm_databind_field', ['vm_databind_identifier','vm_databind_expression']);

      FE.RegisterPropertyTypesGroup('viewmodel', ['vmid','vmobject','ngViewModel']);
      FE.RegisterPropertyTypesGroup('vmfielddef', fdtypes);
    },

    OnControlCreated: function(def,c) {
      if(!FormEditor.Params.creatingform) return;

      switch(c.CtrlType)
      {
        case 'ngSysViewModel':
          if(ngVal(c.Namespace,'')!='') vm_namespaces[c.Namespace]=true;
          break;
        default:
          if((typeof def.ViewModel==='string')&&(def.ViewModel!='')) vm_ids[def.ViewModel]=true;
          break;
      }
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
          IsBasic: true,
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
            "Namespace": ng_diString('', { Level: 'basic', Order: 0.05 }, {
              Editor: 'ngfeEditor_DropDown',
              EditorOptions: {
                Items: editor_vmnamespaces
              }
            }),
            "FieldDefs": ng_diType('ngFieldDefsArray', { Level: 'basic', Order: 0.051, Collapsed: false }),
            "ViewModel": ng_diMixed(['vmobject', 'vmconstructor'], { Level: 'basic', Order: 0.052, PropertyGroup: 'Definition' }),
            "RefViewModel": ng_diType('vmid', { Level: 'basic', Order: 0.053 }, {
              Editor: 'ngfeEditor_DropDown',
              EditorOptions: {
                Items: function(api) {
                  var items=editor_vmids(api);
                  var idprops = FormEditor.GetSelectedControlsProperty("ID");
                  for(var i=0;i<idprops.length;i++) {
                    var t=getpropertytext(idprops[i]);
                    if(t=='') continue;
                    for(var j=items.length-1;j>=0;j--)
                      if(items[j]==t) { items.splice(j,1); break; }
                  }
                  return items;
                }
              }
            }),
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
          IsBasic: true,
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
