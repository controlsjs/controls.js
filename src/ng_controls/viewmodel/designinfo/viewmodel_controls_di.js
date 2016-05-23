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
var ViewModel_Controls_DesignInfo = null;
(function()
{
  function add_databind_di(di, def, c, ref)
  {
    var props = {
      Calls: { DefaultType: 'object', Level: 'advanced',
        Types: {
          'databind_string': {}
        }
      },
      MouseOver: {
        DefaultType: 'databind_string',
        Types: {
          'databind_string': {
            EditorOptions: {
              DatabindFunction: true
            }
          }
        }
      },
      Data: { DefaultType: 'databind_string', Level: 'advanced' },
      Link: { DefaultType: 'databind_string' },
      OnClick: {
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
      ReadOnly: { DefaultType: 'databind_string', Level: (typeof c.SetReadOnly === 'function') ? 'basic' : 'optional' },
      Error: { DefaultType: 'databind_string', Level: 'advanced' },
      ShowError: { DefaultType: 'databind_string', Level: 'advanced' }
    };

    // dependent bindings
    if (typeof c.SetBounds === 'function')
    {
      props.Bounds = {
        DefaultType: 'object',
        Types: {
          'databind_string': {}
        }
      };
    }

    if (typeof c.Elm === 'function' && c.DesignInfo && !c.DesignInfo.NonVisual)
    {
      props.style = {
        DefaultType: 'object', Level: 'advanced',
        Types: {
          'databind_string': {}
        }
      };
      props.className = { DefaultType: 'databind_string', Level: 'advanced' };
      props.SubClassName = { DefaultType: 'databind_string', Level: 'advanced' };
      props.BaseClassName = { DefaultType: 'databind_string', Level: 'advanced' };
    }

    if (typeof c.SetFocus === 'function')
    {
      props.Focus = { DefaultType: 'databind_string', Level: 'optional' };
    }

    if (typeof c.SetOpacity === 'function')
    {
      props.Opacity = { DefaultType: 'databind_string' };
    }

    if (typeof c.SetEnabled === 'function')
    {
      props.Enabled = { DefaultType: 'databind_string' };
      props.Disabled = { DefaultType: 'databind_string' };
    }

    if (typeof c.SetVisible === 'function')
    {
      props.Visible = { DefaultType: 'databind_string' };
    }

    if (typeof c.SetText === 'function')
    {
      props.Text = { DefaultType: 'databind_string' };
      props.ngText = { DefaultType: 'databind_string' };
    }

    var has_alt=(typeof c.Alt!=='undefined');
    props.Alt = { DefaultType: 'databind_string', Level: has_alt ? 'basic' : 'optional' };
    props.ngAlt = { DefaultType: 'databind_string', Level: has_alt ? 'basic' : 'optional' };

    var has_hint=(typeof c.Hint!=='undefined');
    props.Hint = { DefaultType: 'databind_string', Level: has_hint ? 'basic' : 'optional' };
    props.ngHint = { DefaultType: 'databind_string', Level: has_hint ? 'basic' : 'optional' };

    if (typeof c.SetInvalid === 'function')
    {
      props.Invalid = { DefaultType: 'databind_string' };
      props.Valid = { DefaultType: 'databind_string' };
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
      }
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
      }
    };

    switch (c.DefType)
    {
      case 'ngEdit':
        props.InstantUpdate = instantUpdateProperty;
        props.DelayedUpdate = delayedUpdateProperty;
        props.Focus = { Level: 'basic' };
        props.Lookup = { DefaultType: 'databind_string' };
        props.Value = { DefaultType: 'databind_string' };
        break;
      case 'ngMemo':
        props.InstantUpdate = instantUpdateProperty;
        props.DelayedUpdate = delayedUpdateProperty;
        props.Focus = { Level: 'basic' };
        props.Value = { DefaultType: 'databind_string' };
        break;
      case 'ngList':
        props.Focus = { Level: 'basic' };
        props.Value = { DefaultType: 'databind_string' };
        props.Selected = { DefaultType: 'databind_string' };
        props.Checked = { DefaultType: 'databind_string' };
        break;
      case 'ngButton':
      case 'ngSysAction':
        props.Value = { DefaultType: 'databind_string' };
        props.Checked = { DefaultType: 'databind_string' };
        props.Command = { DefaultType: 'databind_string' };
        break;

      case 'ngSysTimer':
        props.Value = { DefaultType: 'databind_string' };
        props.Command = { DefaultType: 'databind_string' };
        break;

      case 'ngPages':
      case 'ngWebBrowser':
      case 'ngProgressBar':
      case 'ngCalendar':
      case 'ngSysURLParams':
      case 'ngSysViewModelSettings':
      case 'ngSysRPC':
        props.Value = { DefaultType: 'databind_string' };
        break;

      default:
        if (typeof c.SetText === 'function')
        {
          props.Value = { DefaultType: 'databind_string' };
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
      Properties: {
        ViewModel: {
          DefaultType: 'string',
          Types: {
            'function': {},
            'identifier': {}
          }
        },
        DataBind: {
          DefaultType: 'databind',
          Types: {
            'databind_string': {},
            'object': {}
          },
          DestroyIfEmpty: true,
          ObjectProperties: props
        },
        Data: {
          ObjectProperties: {
            ViewModelData: { DefaultCode: 'undefined', Level: 'hidden' }
          }
        },
        Methods: {
          ObjectProperties: {
            SetViewModelData:{
              DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function(val) { if (ng_IsOverriden(this.SetViewModelData)) this.SetViewModelData.callParent.apply(this, arguments); }'
                }
              },
              Level: 'advanced'
            }
          }
        },
        Events: {
          ObjectProperties: {
            OnViewModelDataChanged: {
              DefaultType: 'events',
              Types: {
                'function': {
                  DefaultValue: 'function(c, oldval) { }'
                }
              },
              Level: 'advanced'
            },
            OnDataBindingInit: {
              DefaultType: 'events',
              Types: {
                'function': {
                  DefaultValue: 'function(c, bindingKey, valueAccessor, allBindings, bindingContext) { return true; }'
                }
              },
              Level: 'optional'
            },
            OnDataBindingUpdate: {
              DefaultType: 'events',
              Types: {
                'function': {
                  DefaultValue: 'function(c, bindingKey, valueAccessor, allBindings, bindingContext) { return true; }'
                }
              },
              Level: 'optional'
            }
          }
        }
      }
    };

    // handle DataBind Events properties
    if (c.DesignInfo && c.DesignInfo.Properties && c.DesignInfo.Properties.Events)
    {
      var netbeans = ((typeof CodeMirrorIntegration !== 'undefined')&&(typeof CodeMirrorIntegration.RunningInNetBeans === 'function')&&(CodeMirrorIntegration.RunningInNetBeans()));

      var o = {},
          props = c.DesignInfo.Properties.Events.ObjectProperties;
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
          'databind_string': {}
        },
        DestroyIfEmpty: true,
        ObjectProperties: o
      };
      var eventprop2 = {
        DefaultType: 'object',
        Types: {
          'databind_string': {}
        },
        DestroyIfEmpty: true,
        Level: 'advanced',
        ObjectProperties: {}
      };
      for (var i in o)
      {
        eventprop2.ObjectProperties[i] = ng_CopyVar(o[i]);
        eventprop2.ObjectProperties[i].Level = 'advanced';
      }

      var vm_events_di = {
        Properties: {
          DataBind: {
            ObjectProperties: {
              Events: eventprop1,
              AfterEvents: eventprop2,
              BeforeEvents: eventprop2,
              OverrideEvents: eventprop2
            }
          }
        }
      };
      ng_MergeVar(di, vm_events_di);
    }

    ng_MergeVar(di, vm_di);
  }


  ViewModel_Controls_DesignInfo = {
    OnControlDesignInfo: function(def, c, ref)
    {
      var di;

      if (!c) return di;

      switch (c.DefType)
      {
        case 'ngSysViewModel':
        case 'ngViewModelForm':
        case 'ngSysViewModelSettings':
        case 'ngEditField':
        case 'ngEditNumField':
        case 'ngEditDateField':
        case 'ngEditTimeField':
        case 'ngDropDownField':
        case 'ngDropDownListField':
        case 'ngMemoField':
          break;
      }

      di = ngNullVal(di, {});

      // define Databind DesignInfo of all controls
      add_databind_di(di, def, c, ref);

      return di;
    }
  };

  ngUserControls['viewmodel_controls_designinfo'] = ViewModel_Controls_DesignInfo;
})();