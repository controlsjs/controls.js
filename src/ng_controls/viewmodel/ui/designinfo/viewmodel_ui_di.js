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
      "ReadOnly": ng_diType('vm_databind_field', { Level: (typeof c.SetReadOnly === 'function') ? 'basic' : 'optional' }),
      "Error": ng_diType('vm_databind_field', { Level: 'advanced' }),
      "ShowError": ng_diType('vm_databind_field', { Level: 'advanced' })
    };

    var ndi = {
      "DataBind": props
    };

    function dievent(evname, ev, nooverride) {
      if(typeof ndi["Events"] === 'undefined') ndi["Events"]={};
      if(typeof ndi["AfterEvents"] === 'undefined') ndi["AfterEvents"]={};
      if(typeof ndi["BeforeEvents"] === 'undefined') ndi["BeforeEvents"]={};
      if((!nooverride)&&(typeof ndi["OverrideEvents"] === 'undefined')) ndi["OverrideEvents"]={};

      ndi["Events"][evname] = ev;
      ndi["AfterEvents"][evname] = ev;
      ndi["BeforeEvents"][evname] = ev;
      if(!nooverride) ndi["OverrideEvents"][evname] = ev;
    }

    // dependent bindings
    if(!di.NonVisual) {
      ng_MergeVar(props, {
        "OnClick": ng_diType('vm_databind_function_name', { Level: typeof c.OnClick !== 'undefined' ? 'basic' : 'optional' })
      });
    }

    if (typeof c.SetText === 'function')
    {
      props["Text"] = ng_diType('vm_databind_field', { Level: 'basic' });
      props["ngText"] = ng_diType('vm_databind_field', { DisplayName: 'Text Resource (ngText)', Level: 'basic' });
    }

    var has_alt=(typeof c.Alt!=='undefined');
    props["Alt"] = ng_diType('vm_databind_field', { Level: has_alt ? 'basic' : 'optional' });
    props["ngAlt"] = ng_diType('vm_databind_field', { DisplayName: 'Alt Resource (ngAlt)', Level: has_alt ? 'basic' : 'optional' });

    var has_hint=(typeof c.Hint!=='undefined');
    props["Hint"] = ng_diType('vm_databind_field', { Level: has_hint ? 'basic' : 'optional' });
    props["ngHint"] = ng_diType('vm_databind_field', { DisplayName: 'Hint Resource (ngHint)', Level: has_hint ? 'basic' : 'optional' });

    if (typeof c.SetInvalid === 'function')
    {
      props["Invalid"] = ng_diType('vm_databind_field', { Level: 'basic' });
      props["Valid"] = ng_diType('vm_databind_field', { Level: 'basic' });
    }

    var instantUpdateProperty = ng_diMixed([
      ng_diBoolean(false),
      ng_diType('vm_databind_field', { Level: 'advanced' }, {
        EditorOptions: {
          IgnoreDataModel: true
        }
      })
    ], { Level: 'basic' });

    var delayedUpdateProperty = ng_diMixed([
      ng_diInteger(500),
      ng_diType('vm_databind_field', { Level: 'advanced' }, {
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
        props["Lookup"] = ng_diType('vm_databind_field', { Level: 'basic' });
        props["KeyField"] = ng_diTypeVal('databind_string', 'Value', { Level: 'basic' });
        props["Value"] = ng_diType('vm_databind_field', { Level: 'basic' });
        break;
      case 'ngMemo':
        props["InstantUpdate"] = instantUpdateProperty;
        props["DelayedUpdate"] = delayedUpdateProperty;
        props["Focus"] = { Level: 'basic' };
        props["Value"] = ng_diType('vm_databind_field', { Level: 'basic' });
        break;
      case 'ngToolBar':
        if(c.CtrlInheritsFrom('ngMenuBar')) {
          props["Value"] = ng_diType('vm_databind_field', { Level: 'basic' });
          props["Selected"] = ng_diType('vm_databind_field', { Level: 'optional' });
          props["Checked"] = ng_diType('vm_databind_field', { Level: 'basic' });
          props["ItemMapping"] = ng_diMixed(['databind_ngmenu_itemmapping', 'vm_databind_field'], { Level: 'basic' });
        }
        else {
          if(c.CtrlInheritsFrom('ngMaskEdit')) {
            props["InstantUpdate"] = instantUpdateProperty;
            props["DelayedUpdate"] = delayedUpdateProperty;
            props["Focus"] = { Level: 'basic' };
            props["Value"] = ng_diType('vm_databind_field', { Level: 'basic' });    
          }
          break;
        }
      case 'ngList':
        if(c.CtrlType==='ngList') {
          props["Focus"] = { Level: 'basic' };
          props["Value"] = ng_diType('vm_databind_field', { Level: 'basic' });
          props["Selected"] = ng_diType('vm_databind_field', { Level: c.CtrlInheritsFrom('ngMenu') ? 'optional' : 'basic' });
          props["Checked"] = ng_diType('vm_databind_field', { Level: 'basic' });

          props["ItemMapping"] = ng_diMixed([c.CtrlInheritsFrom('ngMenu') ? 'databind_ngmenu_itemmapping' : 'databind_nglist_itemmapping', 'vm_databind_field'], { Level: 'basic' });
        }

        props["DelayedUpdate"] = ng_diMixed([
          ng_diInteger(10),
          ng_diType('vm_databind_field', void 0, {
            EditorOptions: {
              IgnoreDataModel: true
            }
          })
        ], { Level: 'basic' });

        props["ItemMatchingProps"] = ng_diArrayOf(ng_diType('databind_string', { Level: 'basic' }), { Level: 'advanced' });
        
        var coleditor;
        if(typeof ngUserControls['list_designinfo'] ==='object') {
          var editor_listcolumns=ngUserControls['list_designinfo'].EditorListColumns;
          if(editor_listcolumns) {
            coleditor={
              Editor: 'ngfeEditor_DropDown',
              EditorOptions: {
                Items: editor_listcolumns
              }
            };
          }
        }
        props["SimpleArrayItemColumnID"] = ng_diType('databind_string', { Level: 'advanced' }, coleditor);

        props["KeyField"] = ng_diTypeVal('databind_string', 'Value', { Level: 'basic' });

        dievent("OnCreateViewModelItem",ng_diEvent('function(c,ci) { ci.NewItem={}; return true; ', { Level: 'advanced' }));
        break;
      case 'ngButton':
      case 'ngSysAction':
        props["Value"] = ng_diType('vm_databind_field', { Level: 'optional', DisplayName: 'Check (Value)' });
        props["Checked"] = ng_diType('vm_databind_field', { Level: 'basic' });
        props["Command"] = ng_diType('databind_string', { Level: 'basic' });
        props["ValueNames"] = ng_diMixed([
          ng_diArrayOf(ng_diMixed(['databind_string','vm_databind_field'], { Level: 'basic' })),
          'vm_databind_field'
        ], { Level: 'basic' });
        break;

      case 'ngPages':
        props["Value"] = ng_diType('vm_databind_field', { Level: 'basic', DisplayName: 'Page (Value)' });
        break;
      case 'ngWebBrowser':
        props["Value"] = ng_diType('vm_databind_field', { Level: 'basic', DisplayName: 'URL (Value)' });
        break;
      case 'ngProgressBar':
        props["Value"] = ng_diType('vm_databind_field', { Level: 'basic', DisplayName: 'Position (Value)' });
        break;
      case 'ngCalendar':
        props["Value"] = ng_diType('vm_databind_field', { Level: 'basic', DisplayName: 'Selected (Value)' });
        break;

      default:
        if (typeof c.SetText === 'function')
        {
          props["Value"] = ng_diType('vm_databind_field', { Level: 'basic' });
        }
        break;
    }

    ng_MergeVar(di, {
      Properties: ng_diProperties(ndi)
    });
  }

  return {
    OnFormEditorInit: function(FE) {
      var databind_types = [
        // databind_nglist_itemmapping
        {
          TypeID: 'databind_nglist_itemmapping',
          TypeBase: 'object',
          Name: 'databind list item mapping',
          ShortName: 'obj',
          Basic: false,
          Options: {
            ChildDesignInfo: ng_diMixed([
              ng_diType('databind_string'),
              ng_diBoolean()
            ], { Level: 'basic' }),
            ObjectProperties: {
              "Text": ng_diBoolean(false),
              "Alt": ng_diBoolean(false),
              "ID": ng_diBoolean(false),
              "Checked": ng_diBoolean(false),
              "CheckGroup": ng_diBoolean(false),
              "AllowGrayed": ng_diBoolean(false),
              "Collapsed": ng_diBoolean(false),
              "Visible": ng_diBoolean(false),
              "Enabled": ng_diBoolean(false),
              "RadioGroup": ng_diBoolean(false),
              "RadioAllowUncheck": ng_diBoolean(false),
              "H": ng_diBoolean(false),
              "MinHeight": ng_diBoolean(false),
              "Image": ng_diBoolean(false),
              "Items": ng_diBoolean(false)
            }
          }
        },
        // databind_ngmenu_itemmapping
        {
          TypeID: 'databind_ngmenu_itemmapping',
          TypeBase: 'databind_nglist_itemmapping',
          Name: 'databind menu item mapping',
          ShortName: 'obj',
          Basic: false,
          Options: {
            ObjectProperties: {
              "Items": { Level: 'optional' },
              "Collapsed": { Level: 'optional' },
              "CheckGroup": { Level: 'optional' },
              "SubMenu": ng_diBoolean(false)
            }
          }
        }
      ];
      FormEditor.RegisterPropertyType(databind_types);
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
          ControlCategory: 'Container',
          IsBasic: true,
          IsContainer: true,
          IsViewModel: true,
          Properties: ng_diProperties({
            "ErrorHint": ng_diControl('ngTextHint', ng_diProperties({
              "ParentReferences": ng_diBoolean(false),
              "Data": {
                "IsPopup": ng_diBoolean(true)
              }
            }), { Level: 'basic', PropertyGroup: 'Controls' }, { InheritedFrom: 'ngHint' }),
            "Data": {
              "DefaultFindFieldControlsBindings": ng_diTypeVal('array_strings', ["'Data'","'Value'","'Checked'","'Selected'","'Lookup'","'Error'","'Link'"], { Level: 'advanced' }),
              "DisableOnCommand": ng_diMixed([
                ng_diBoolean(true),
                ng_diArrayOf('string')
              ], { Level: 'basic' }),
              "DisableDelay":  ng_diInteger(1, { Level: 'basic' })
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

              "OnDisableControlsCommand": ng_diEvent('function(c, cmd) { return true; }',{ Level: 'advanced' }),
              "OnDisableControls": ng_diEvent('function(c) { return true; }',{ Level: 'advanced' }),
              "OnEnableControls": ng_diEvent('function(c) { return true; }',{ Level: 'advanced' }),

              "OnCommand": ng_diEvent('function(c, cmd, options) { return true; }',{ Level: 'basic' }),
              "OnCommandError": ng_diEvent('function(c, msg, cmd, options) { }',{ Level: 'basic' }),
              "OnCommandRequest": ng_diEvent('function(c, rpc) { return true; }',{ Level: 'basic' }),
              "OnCommandResults": ng_diEvent('function(c, cmd, sresults) {}',{ Level: 'basic' }),
              "OnCommandFinished": ng_diEvent('function(c, cmd, sresults) {}',{ Level: 'basic' }),
              "OnCommandCancel": ng_diEvent('function(c, cmd) {}',{ Level: 'basic' })
            },
            "OverrideEvents": {
              "OnFindFieldControls": ng_diEvent('function(c, fid, visibleonly, bindings, parentfielddef) { return null; }',{ Level: 'basic' })
            }
          },
          {
            "Controls": ng_diControls(void 0, { Level: 'basic' }, {
              ChildDesignInfo: ng_diControl(void 0, ng_diProperties({
                "Methods": {
                  "SetInvalid": ng_diFunction('function(s) { return ng_CallParent(this, "SetInvalid", arguments, true); }', { Level: 'advanced' }),
                  "SetErrorState": ng_diFunction('function(s) { return ng_CallParent(this, "SetErrorState", arguments, true); }', { Level: 'advanced' })
                }
              }))
            })
          })
        };
      });

      function EditField(d,c,ref) {
        return {
          ControlCategory: 'Edit Field',
          IsViewModel: true,
          Properties: ng_diProperties({
            "ErrorHint": ng_diControl('ngTextHint', ng_diProperties({
              "ParentReferences": ng_diBoolean(false),
              "Data": {
                "IsPopup": ng_diBoolean(true)
              }
            }), { Level: 'basic', PropertyGroup: 'Controls' }, { InheritedFrom: 'ngHint' }),
            "Data": {
              "HintX": { Level: 'advanced' },
              "HintY": { Level: 'advanced' },
              "ErrorBindings": ng_diTypeVal('array_strings', [ "'Value'", "'Lookup'" ], { Level: 'advanced' })
            },
            "Events": {
              "OnSetErrorState": ng_diEvent('function(c, state) { return true; }',{ Level: 'basic' }),
              "OnShowErrorHint": ng_diEvent('function(c, msg) { return true; }',{ Level: 'basic' }),
              "OnHideErrorHint": ng_diEvent('function(c) { return true; }',{ Level: 'basic' })
            }
          })
        };
      }

      function DropDownField(d,c,ref) {
        var di=EditField(d,c,ref);
        di.ControlCategory='Dropdown Field';
        return di;
      }

      ngRegisterControlDesignInfo('ngEditField',EditField);
      ngRegisterControlDesignInfo('ngEditNumField',EditField);
      ngRegisterControlDesignInfo('ngEditDateField',EditField);
      ngRegisterControlDesignInfo('ngEditTimeField',EditField);
      ngRegisterControlDesignInfo('ngMaskEditField',EditField);
      ngRegisterControlDesignInfo('ngDropDownField',DropDownField);
      ngRegisterControlDesignInfo('ngDropDownListField',DropDownField);
      ngRegisterControlDesignInfo('ngMemoField',EditField);
    }
  };
})();
