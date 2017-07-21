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

/**
 *  Class: DesignInfo
 */
/*
 *  Group: Properties
 */
/*
  {
    ControlCategory: 'category',
    BaseControl: 'basetype',
    NonVisual: false,
    Image: {...},

    NewControl: {
      Default: {
        Properties: {
          "prop1": {
            Value: val,
            ValueByRefName: false
          },
          "prop2": { // object
            ObjectProperties: {
              "objpropname1": { ValueByRefName: true }
              ...
              "objpropnameN": { ... }
            }
          },
          ...
          "propN": { ... }
        },
        OnCreating: function(initprops, di, target_id, target_container) {
          return true;
        },
        OnCreatingPreview: function(initprops, di, target_id, target_container) {
        },
        OnCreated: function(control_id, initprops, di, target_id, target_container) {
        }
      },
      'variant1': {
      },
      ...
      'variantN': {
      }
    },
    Properties: {
      "property1": {
        DefaultType: 'type',
        InitType: 'type',
        Level: 'advanced' (basic|advanced|optional|hidden|invalid|parent|deprecated|experimental)
        PropertyGroup: 'All'(Definition|Data|DataBind|Events|...Events|Methods|Controls|All),
        Order: 0.5,
        Collapsed: false,
        ContainerProperty: false,
        Required: false,
        FixedType: false,
        Exclude: ['exprop1', 'exprop2', ... 'expropN'],
        OnPropertyInit: function(ch) {
          return true;
        },
        OnPropertySetValue: function(ch) {
          return true;
        },
        Types: {
          'type1': {
            DefaultValue: val,
            InitValue: val,

            Level: 'basic' (basic|hidden|invalid|deprecated|experimental),

            typeoption1: ...,
            ...
            typeoptionN: ...,

            Editor: 'ngfeEditor_XXX',
            EditorOptions: {
              ...
            },

            DestroyIfEmpty: true,
            ObjectProperties: {
              "objprop1": { ... },
              ...
              "objpropN": { ... }
            },
            ChildDesignInfo: {
              "childprop1": { ... },
              ...
              "childpropN": { ... }
            }
          }
          ...
          'typeN': {
          }
        }
      },
      ...
      "propertyN": {
      }
    },

    ActionsMenu: {
      'menuid1': {
        MultiSelect: true,
        Checked: 0,
        ...
        OnMenuClick: function(e, m, it) {
        }
      },
      ...
      'menuidN': {
      }
    },
    OnActionsMenuCreating: function(ActionsMenu) {
    },

    IsContainer: false,
    TargetContainer: function(control, target_control, control_elm, target_elm) {
      return null;
    }

  }
*/

/**
 *  Function: ng_DIProperties
 *  Creates control design info Properties.
 *  Helper function.
 *
 *  Syntax:
 *    object *ng_DIProperties* (object props [, object data={}])
 *
 *  Parameters:
 *    props - simplified properties definition
 *    data - optional standard properties definition to which props are merged to
 *
 *  Returns:
 *    Control design info Properties.
 */
function ng_DIProperties(props,data) {
  var di=((data)&&(typeof data==='object')) ? data : {};
  for(var i in props) {
    switch(i) {
      case 'Data':
      case 'Events':
      case 'OverrideEvents':
      case 'Methods':
      case 'style':
        if(typeof di[i]==='undefined') di[i]={};
        ng_MergeVar(di[i],{
          Types: {
            'object': {
              ObjectProperties: props[i]
            }
          }
        });
        break;
      case 'Controls':
      case 'ModifyControls':
        if(typeof di[i]==='undefined') di[i]={};
        ng_MergeVar(di[i],{
          Types: {
            'controls': {
              ObjectProperties: props[i]
            }
          }
        });
        break;
      case 'DataBind':
      case 'DOMDataBind':
        if(typeof di[i]==='undefined') di[i]={};
        ng_MergeVar(di[i],{
          Types: {
            'bindings': {
              ObjectProperties: {
                "0": {
                  Types: {
                    'object': {
                      ObjectProperties: props[i]
                    }
                  }
                }
              }
            }
          }
        });
        break;
      default:
        di[i]=props[i];
        break;
    }
  }
  return di;
};

/**
 *  Function: ng_DIProperty
 *  Creates property design info with specified type and default value.
 *  Helper function.
 *
 *  Syntax:
 *    object *ng_DIProperty* (mixed type, string defvalue [, object data={}])
 *
 *  Parameters:
 *    type - property type (or array of types)
 *    defvalue - property default value (or array of values)
 *    data - optional standard property definition to which props are merged to
 *
 *  Returns:
 *    Property design info.
 */
function ng_DIProperty(type, defvalue, data) {
  var di=((data)&&(typeof data==='object')) ? data : {};
  var mdi={
    Types: {}
  };
  var arrdefval;
  if(ng_IsArrayVar(type)) {
    arrdefval=ng_IsArrayVar(defvalue);
    var ftype,t;
    for(var i in type) {
      t=type[i];
      if(typeof ftype === 'undefined') ftype=t;
      mdi.Types[t]={};
      if((arrdefval)&&(i<defvalue.length)&&(typeof defvalue[i]!=='undefined')) mdi.Types[t].DefaultValue=defvalue[i];
    }
    type=ftype;
  }
  mdi.DefaultType=type;
  if((!arrdefval)&&(typeof defvalue!=='undefined')) {
    mdi.Types[type]={
      DefaultValue: defvalue
    };
  }
  ng_MergeVar(di, mdi);
  return di;
}

/**
 *  Function: ng_DIPropertyBool
 *  Creates boolean property design info.
 *  Helper function.
 *
 *  Syntax:
 *    object *ng_DIPropertyBool* (string defvalue [, object data={}])
 *
 *  Parameters:
 *    defvalue - property default value
 *    data - optional standard property definition to which props are merged to
 *
 *  Returns:
 *    Property design info.
 */
function ng_DIPropertyBool(defvalue, data) {
  var di=((data)&&(typeof data==='object')) ? data : {};
  ng_MergeVar(di, {
    DefaultType: 'boolean',
    Types: {
      'boolean': {
        DefaultValue: (defvalue ? true : false),
        InitValue: true
      }
    }
  });
  return di;
}

/**
 *  Function: ng_DIPropertyEvent
 *  Creates event property design info.
 *  Helper function.
 *
 *  Syntax:
 *    object *ng_DIPropertyEvent* (string defvalue [, object data={}])
 *
 *  Parameters:
 *    defvalue - property default value
 *    data - optional standard property definition to which props are merged to
 *
 *  Returns:
 *    Property design info.
 */
function ng_DIPropertyEvent(defvalue, data) {
  var di=((data)&&(typeof data==='object')) ? data : {};
  ng_MergeVar(di, {
    DefaultType: 'events',
    Types: {
      'function': {
        DefaultValue: defvalue
      }
    }
  });
  return di;
}

/**
 *  Function: ng_DIPropertyControl
 *  Creates control property design info.
 *  Helper function.
 *
 *  Syntax:
 *    object *ng_DIPropertyControl* (string type [, object data={}, string inheritedfrom, object properties])
 *
 *  Parameters:
 *    typed - control type
 *    data - optional standard property definition to which props are merged to
 *    inheritedfrom - optional control inheritance restriction
 *    properties - optional object properties definition
 *
 *  Returns:
 *    Property design info.
 */
function ng_DIPropertyControl(type, data, inheritedfrom, properties) {
  if(!type) type='feGenericControl';
  var di=((data)&&(typeof data==='object')) ? data : {};
  var mdi={
    DefaultType: 'control',
    Types: {
      'control': {
        Type: type
      }
    }
  };
  if(inheritedfrom) mdi.Types.control.InheritedFrom=inheritedfrom;
  if(properties) mdi.Types.control.ObjectProperties=properties;
  ng_MergeVar(di,mdi);
  return di;
}

/**
 *  Function: ng_DIPropertyRefName
 *  Creates property design info which is initialized by its reference name.
 *  Helper function.
 *
 *  Syntax:
 *    object *ng_DIPropertyRefName* ([object data={}])
 *
 *  Parameters:
 *    data - optional standard property definition to which props are merged to
 *
 *  Returns:
 *    Property design info.
 */
function ng_DIPropertyRefName(data) {
  var di=((data)&&(typeof data==='object')) ? data : {};
  ng_MergeVar(di, {
    DefaultType: 'string',
    OnPropertyInit: function (ch) {
      if (!ch.Value) {
        var selected = FormEditor.GetSelectedControlsIDs();
        if (selected.length === 1) {
          ch.Value = FormEditor.GetControlRefNameById(selected[0]);
        }
      }
      return true;
    }
  });
  return di;
}


/**
 *  Function: ng_DIPropertyValues
 *  Creates property design info for list of values.
 *  Helper function.
 *
 *  Syntax:
 *    object *ng_DIPropertyValues* (string type, string defvalue, array values [, object data={}])
 *
 *  Parameters:
 *    type - property type
 *    defvalue - property default value or name
 *    values - list of values defined as object { Value: X, Text: 'Value1' }
 *    data - optional standard property definition to which props are merged to
 *
 *  Returns:
 *    Property design info.
 */
function ng_DIPropertyValues(type, defvalue, values, data) {
  var di=((data)&&(typeof data==='object')) ? data : {};
  var c,defival;
  for(var i=values.length-1;i>=0;i--) {
    c=values[i];
    if(typeof c==='undefined') { values.splice(i,1); continue; }
    if(typeof c==='string') { c={ Text:c, Value: i }; values[i]=c; }
    if(c.Text===defvalue) defival=c.Value;
    else if(c.Value===defvalue) { defival=c.Value; defvalue=c.Text; }
  }

  var mdi={
    DefaultType: type,
    Types: {}
  };
  mdi.Types[type]={
    DefaultValue: defival,
    Editor: 'ngfeEditor_DropDownList',
    EditorOptions: {
      Items: values
    }
  }
  ng_MergeVar(di, mdi);
  return di;
}

/**
 *  Function: ng_DIPropertyStrings
 *  Creates property design info for list of strings.
 *  Helper function.
 *
 *  Syntax:
 *    object *ng_DIPropertyStrings* (string defvalue, array strings [, object data={}])
 *
 *  Parameters:
 *    defvalue - property default value
 *    strings - list of strings
 *    data - optional standard property definition to which props are merged to
 *
 *  Returns:
 *    Property design info.
 */
function ng_DIPropertyStrings(defvalue, strings, data) {
  var di=((data)&&(typeof data==='object')) ? data : {};
  ng_MergeVar(di, {
    DefaultType: 'string',
    Types: {
      'string': {
        DefaultValue: defvalue,
        Editor: 'ngfeEditor_DropDownList',
        EditorOptions: {
          Items: strings
        }
      }
    }
  });
  return di;
}

/**
 *  Function: ng_DIPropertyIntConstants
 *  Creates property design info for list of integer constants.
 *  Helper function.
 *
 *  Syntax:
 *    object *ng_DIPropertyIntConstants* (mixed defvalue, array consts [, object data={}])
 *
 *  Parameters:
 *    defvalue - property default value, constant name or value
 *    consts - list of constants, constant is defined as object { Value: X, Text: 'Const1' } or as string,
 *             if string is used the value is considered as item order in a array,
 *             undefined items are skipped
 *    data - optional standard property definition to which props are merged to
 *
 *  Returns:
 *    Property design info.
 */
function ng_DIPropertyIntConstants(defvalue, consts, data) {
  var di=((data)&&(typeof data==='object')) ? data : {};
  var c,defival;
  var ids=[];
  for(var i=consts.length-1;i>=0;i--) {
    c=consts[i];
    if(typeof c==='undefined') { consts.splice(i,1); continue; }
    if(typeof c==='string') { c={ Text:c, Value: i }; consts[i]=c; }
    if(c.Text===defvalue) defival=c.Value;
    else if(c.Value===defvalue) { defival=c.Value; defvalue=c.Text; }
    ids.unshift(c.Text);
  }
  ng_MergeVar(di, {
    DefaultType: 'identifier',
    Types: {
      'identifier': {
        DefaultValue: defvalue,
        Editor: 'ngfeEditor_DropDown',
        EditorOptions: {
          Items: ids
        }
      },
      'integer': {
        DefaultValue: defival,
        Level: 'hidden',
        Editor: 'ngfeEditor_DropDownList',
        EditorOptions: {
          Items: consts
        }
      }
    }
  });
  return di;
}

(function()
{
  function getBaseProperties()
  {
    var BaseDI = {
      Properties: {
        "ID": ng_DIPropertyRefName({ Level: 'optional', Order: 0.001 }),
        "Type": { DefaultType: 'string', Level: 'basic', Order: 0.01,
          Types: {
            'string': {
              Editor: 'ngfeEditor_ControlType'
            }
          }
        },
        "L": { DefaultType: 'bounds', Level: 'basic', Order: 0.11 },
        "T": { DefaultType: 'bounds', Level: 'basic', Order: 0.12 },
        "R": { DefaultType: 'bounds', Level: 'basic', Order: 0.15 },
        "B": { DefaultType: 'bounds', Level: 'basic', Order: 0.16 },
        "ParentReferences": ng_DIPropertyBool(true, { Level: 'optional', Order: 0.302 }),
        "OnCreating": ng_DIPropertyEvent('function(def, ref, parent, options) { return true; }', { Order: 0.306 }),
        "OnCreated": ng_DIPropertyEvent('function(c, refs, options) {}', { Order: 0.307 }),
        "Data": { DefaultType: 'object', Level: 'basic', Order: 0.4,
          Types: {
            'object': {
              DestroyIfEmpty: true,
              ObjectProperties:
              {
                "Enabled": ng_DIPropertyBool(true, { Level: 'basic' }),
                "ChildHandling": ng_DIPropertyIntConstants(0,['ngChildEnabledAsParent','ngChildEnabledParentAware','ngChildEnabledIndependent'],{ Level: 'optional' }) // TODO: change to bitmask when bitmask editor will be better
                /*"ChildHandling": { DefaultType: 'bitmask', Level: 'optional',
                  Types: {
                    'bitmask': {
                      DefaultValue: {
                        value: ngChildEnabledAsParent
                      },
                      EditorOptions: {
                        BitMaskIdentifiers: [
                          {value: ngChildEnabledAsParent,    id: 'ngChildEnabledAsParent'},
                          {value: ngChildEnabledParentAware, id: 'ngChildEnabledParentAware'},
                          {value: ngChildEnabledIndependent, id: 'ngChildEnabledIndependent'}
                        ]
                      }
                    }
                  }
                }*/
              }
            }
          }
        },

        "Controls": { DefaultType: 'controls', Level: 'optional', Order: 0.65,
          ContainerProperty: true,
          Types: {
            'controls': {
              ChildDesignInfo: {
                PropertyGroup: 'Controls'
              }
            }
          }
        },
        "ModifyControls": { DefaultType: 'controls', Level: 'optional', Order: 0.7,
          ContainerProperty: true,
          Types: {
            'controls': {
              DestroyIfEmpty: true,
              ChildDesignInfo: {
                PropertyGroup: 'Controls'
              }
            }
          }
        },

        "Events": { DefaultType: 'object', Order: 0.92,
          Types: {
            'object': {
              DestroyIfEmpty: true,
              ObjectProperties:
              {
                "OnSetEnabled": ng_DIPropertyEvent('function(c, v, p) { return true; }'),
                "OnEnabledChanged": ng_DIPropertyEvent('function(c, p) {}', { Level: 'basic' })
              }
            }
          }
        },

        "Methods": { DefaultType: 'object', Order: 0.8,
          Types: {
            'object': {
              DestroyIfEmpty: true,
              // TODO: return values??
              ObjectProperties:
              {
                "DoDispose": ng_DIProperty('function','function() { return ng_CallParent(this, "DoDispose", arguments, true); }'),
                "DoCreate": ng_DIProperty('function','function(props, ref, nd, parent) { ng_CallParent(this, "DoCreate", arguments); }'),
                "DoSetEnabled": ng_DIProperty('function','function(v) { ng_CallParent(this, "DoSetEnabled", arguments); }'),
                "DoSetChildEnabled": ng_DIProperty('function','function(c, v, p) { ng_CallParent(this, "DoSetChildEnabled", arguments); }'),

                "Enable": ng_DIProperty('function','function() { ng_CallParent(this, "Enable", arguments); }',{ Level: 'optional' }),
                "Disable": ng_DIProperty('function','function() { ng_CallParent(this, "Disable, arguments); }',{ Level: 'optional' }),
                "SetEnabled": ng_DIProperty('function','function(v, p) { ng_CallParent(this, "SetEnabled", arguments); }',{ Level: 'optional' }),
                "SetChildControlsEnabled": ng_DIProperty('function','function(v, p) { ng_CallParent(this, "SetChildControlsEnabled", arguments); }', { Level: 'optional' }),
                "Elm": ng_DIProperty('function','function() { return ng_CallParent(this, "Elm", arguments, null); }',{ Level: 'optional' }),
                "CtrlInheritsFrom": ng_DIProperty('function','function(type) { ng_CallParent(this, "CtrlInheritsFrom", arguments); }',{ Level: 'optional' }),
                "Create": ng_DIProperty('function','function(props, ref) { ng_CallParent(this, "Create", arguments); }',{ Level: 'optional' }),
                "Dispose": ng_DIProperty('function','function() { ng_CallParent(this, "Dispose", arguments); }',{ Level: 'optional' }),
                "AddEvent": ng_DIProperty('function','function(ev, fce, once) { ng_CallParent(this, "AddEvent", arguments); }',{ Level: 'optional' }),
                "RemoveEvent": ng_DIProperty('function','function(ev, fce) { ng_CallParent(this, "RemoveEvent", arguments); }',{ Level: 'optional' })
              }
            }
          }
        }
      }
    };

    return BaseDI;
  }

  window.ngControlDesignInfo = function(obj)
  {
    if ((!ngHASDESIGNINFO()) || (!obj) || (typeof obj.DesignInfo !== 'undefined')) return;

    obj.DesignInfo = {
      Properties: {
        "W": { DefaultType: 'bounds', Level: 'basic', Order: 0.13 },
        "H": { DefaultType: 'bounds', Level: 'basic', Order: 0.14 },
        "ScrollBars": ng_DIPropertyIntConstants('ssNone',['ssNone','ssDefault','ssAuto','ssBoth','ssHorizontal','ssVertical'],{ Level: 'optional', Order: 0.301 }),
        "style": { DefaultType: 'object', Order: 0.252,
          Types: {
            'object': {
              DestroyIfEmpty: true,
              ObjectProperties:
              {
                "background": { DefaultType: 'string', Level: 'optional' },
                "backgroundColor": { DefaultType: 'css_colors', Level: 'optional' },
                "backgroundImage": { DefaultType: 'string', Level: 'optional' },
                "border": { DefaultType: 'string', Level: 'optional' },
                "borderColor": ng_DIProperty('css_colors', '#000000ff', { Level: 'optional' }),
                "borderBottom": { DefaultType: 'string', Level: 'optional' },
                "borderLeft": { DefaultType: 'string', Level: 'optional' },
                "borderRight": { DefaultType: 'string', Level: 'optional' },
                "borderTop": { DefaultType: 'string', Level: 'optional' },
                "borderStyle": ng_DIPropertyStrings('none', ['none','solid','dotted','dashed','double','groove','ridge','inset','outset'],{ Level: 'optional' }),
                "borderWidth": { DefaultType: 'css_dim_px', Level: 'optional',
                  Types: {
                    'string': {}
                  }
                },
                "color": ng_DIProperty('css_colors', '#000000', { Level: 'optional' }),
                "cursor": { DefaultType: 'css_cursor', Level: 'optional' },
                "fontFamily": ng_DIPropertyStrings('',
                  [ '"Times New Roman", Times, serif',
                    'Georgia, serif',
                    'Arial, Helvetica, sans-serif',
                    '"Arial Black", Gadget, sans-serif',
                    '"Comic Sans MS", cursive, sans-serif',
                    'Impact, Charcoal, sans-serif',
                    'Tahoma, Geneva, sans-serif',
                    'Verdana, Geneva, sans-serif',
                    '"Courier New", Courier, monospace',
                    '"Lucida Console", Monaco, monospace'
                  ],
                  {
                    Level: 'optional',
                    Types: {
                      'string': {
                        InitValue: 'Arial, Helvetica, sans-serif'
                      }
                    }
                  }
                ),
                "fontSize": { DefaultType: 'css_dim_px', Level: 'optional',
                  Types: {
                    'css_dim_px': {
                      InitValue: '12px'
                    }
                  }
                },
                "fontStyle": ng_DIPropertyStrings('normal', ['normal','italic','oblique','initial','inherit'], { Level: 'optional' }),
                "fontWeight": ng_DIPropertyStrings('normal', ['normal','bold','bolder','lighter','100','200','300','400','500','600','700','800','900'], { Level: 'optional' }),
                "lineHeight": { DefaultType: 'css_dim_px', Level: 'optional',
                  Types: {
                    'css_dim_px': {
                      InitValue: '12px'
                    }
                  }
                },
                "margin": { DefaultType: 'string', Level: 'optional' },
                "marginBottom": { DefaultType: 'css_dim_px', Level: 'optional' },
                "marginLeft": { DefaultType: 'css_dim_px', Level: 'optional' },
                "marginRight": { DefaultType: 'css_dim_px', Level: 'optional' },
                "marginTop": { DefaultType: 'css_dim_px', Level: 'optional' },
                "padding": { DefaultType: 'string', Level: 'optional' },
                "paddingBottom": { DefaultType: 'css_dim_px', Level: 'optional' },
                "paddingLeft": { DefaultType: 'css_dim_px', Level: 'optional' },
                "paddingRight": { DefaultType: 'css_dim_px', Level: 'optional' },
                "paddingTop": { DefaultType: 'css_dim_px', Level: 'optional' },
                "textAlign": ng_DIPropertyStrings('left', ['left','center','right','justify','initial','inherit'],{ Level: 'optional' }),
                "verticalAlign": ng_DIPropertyStrings('baseline', ['baseline','sub','super','top','text-top','middle','bottom','text-bottom','initial','inherit'], { Level: 'optional' }),
                "textDecoration": ng_DIPropertyStrings('none', ['none','underline','overline','line-through','initial','inherit'], { Level: 'optional' }),
                "textTransform": ng_DIPropertyStrings('none', ['none','uppercase','lowercase','capitalize','initial','inherit'], { Level: 'optional' }),
                "whiteSpace": ng_DIPropertyStrings('normal', ['normal','nowrap','pre','pre-line','pre-wrap','initial','inherit'], { Level: 'optional' }),
                "zIndex": { DefaultType: 'integer' }
              }
            }
          }
        },
        "Opacity": ng_DIProperty('float', 1.0, { Level: 'basic', Order: 0.253 }),
        "className": { DefaultType: 'string', Order: 0.251 },
        "innerHTML": { DefaultType: 'string', Level: 'hidden', Order: 0.303 },
        "id": { DefaultType: 'string', Level: 'optional', Order: 0.05 },
        "parent": { DefaultType: 'string', Level: 'optional', Order: 0.07,
          Types: {
            'object': {}
          }
        },
        "IE6AlignFix": ng_DIPropertyBool(ngIE6AlignFix, { Level: 'optional', Order: 0.304 }),
        "OnCreateHTMLElement": ng_DIPropertyEvent('function(props, ref, c) {}', { Level: 'optional', Order: 0.305 }),
        "Data": {
          Types: {
            'object': {
              ObjectProperties:
              {
                "Visible": ng_DIPropertyBool(true, { Level: 'basic' }),
                "IsPopup": ng_DIPropertyBool(false),
                "PopupGroup": ng_DIProperty('string','default', { Level: 'optional' }),
                "Gestures": { DefaultType: 'object', Level: 'advanced',
                  Types: {
                    'object': {
                      DestroyIfEmpty: true,
                      ObjectProperties:
                      {
                        "drag":       ng_DIPropertyBool(false),
                        "dragleft":   ng_DIPropertyBool(false, { Level: 'optional' }),
                        "dragright":  ng_DIPropertyBool(false, { Level: 'optional' }),
                        "dragup":     ng_DIPropertyBool(false, { Level: 'optional' }),
                        "dragdown":   ng_DIPropertyBool(false, { Level: 'optional' }),
                        "hold":       ng_DIPropertyBool(false),
                        "release":    ng_DIPropertyBool(false),
                        "swipe":      ng_DIPropertyBool(false),
                        "swipeleft":  ng_DIPropertyBool(false, { Level: 'optional' }),
                        "swiperight": ng_DIPropertyBool(false, { Level: 'optional' }),
                        "swipeup":    ng_DIPropertyBool(false, { Level: 'optional' }),
                        "swipedown":  ng_DIPropertyBool(false, { Level: 'optional' }),
                        "tap":        ng_DIPropertyBool(false),
                        "doubletap":  ng_DIPropertyBool(false),
                        "touch":      ng_DIPropertyBool(false),
                        "transform":  ng_DIPropertyBool(false, { Level: 'optional' }),
                        "pinch":      ng_DIPropertyBool(false, { Level: 'optional' }),
                        "pinchin":    ng_DIPropertyBool(false, { Level: 'optional' }),
                        "pinchout":   ng_DIPropertyBool(false, { Level: 'optional' }),
                        "rotate":     ng_DIPropertyBool(false, { Level: 'optional' })
                      }
                    }
                  }
                },
                "ngText": { DefaultType: 'string', Level: 'optional',
                  Types: {
                    'string': {
                      DefaultValue: '',
                      Editor: 'ngfeEditor_Lang'
                    }
                  }
                },
                "ngTextD": { DefaultType: 'string', Level: 'optional',
                  Types: {
                    'string': {
                      DefaultValue: '',
                      Editor: 'ngfeEditor_Lang'
                    }
                  }
                },
                "ngAlt": { DefaultType: 'string', Level: 'optional',
                  Types: {
                    'string': {
                      DefaultValue: '',
                      Editor: 'ngfeEditor_Lang'
                    }
                  }
                },
                "ngAltD": { DefaultType: 'string', Level: 'optional',
                  Types: {
                    'string': {
                      DefaultValue: '',
                      Editor: 'ngfeEditor_Lang'
                    }
                  }
                },
                "ngHint": { DefaultType: 'string', Level: 'optional',
                  Types: {
                    'string': {
                      DefaultValue: '',
                      Editor: 'ngfeEditor_Lang'
                    }
                  }
                },
                "ngHintD": { DefaultType: 'string', Level: 'optional',
                  Types: {
                    'string': {
                      DefaultValue: '',
                      Editor: 'ngfeEditor_Lang'
                    }
                  }
                }
              }
            }
          }
        },

        "Events": {
          Types: {
            'object': {
              DestroyIfEmpty: true,
              ObjectProperties:
              {
                "OnSetVisible": ng_DIPropertyEvent('function(c, v) { return true; }'),
                "OnVisibleChanged": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' }),
                "OnUpdate": ng_DIPropertyEvent('function(c) { return true; }'),
                "OnUpdated": ng_DIPropertyEvent('function(c, elm) {}'),
                "OnUpdateLater": ng_DIPropertyEvent('function(c, s) {}'),
                "OnMouseEnter": ng_DIPropertyEvent('function(c) {}'),
                "OnMouseLeave": ng_DIPropertyEvent('function(c) {}'),
                "OnIsInsidePopup": ng_DIPropertyEvent('function(c, target, intype, e) { return true; }'),
                "OnClickOutside": ng_DIPropertyEvent('function(c, pi) { return true; }'),
                "OnPointerDown": ng_DIPropertyEvent('function(c, pi) { return true; }'),
                "OnPointerUp": ng_DIPropertyEvent('function(c, pi) { return true; }'),
                "OnPtrStart": ng_DIPropertyEvent('function(c, pi) {}'),
                "OnPtrEnd": ng_DIPropertyEvent('function(c, pi) {}'),
                "OnGesture": ng_DIPropertyEvent('function(c, pi) { return true; }'),
                "OnPtrDrag": ng_DIPropertyEvent('function(c, pi) { return true; }')
              }
            }
          }
        },

        "Methods": {
          Types: {
            'object': {
              // TODO: return values??
              ObjectProperties:
              {
                "DoMouseEnter": ng_DIProperty('function','function(e, mi, elm) { ng_CallParent(this, "DoMouseEnter", arguments); }', { Level: 'optional' }),
                "DoMouseLeave": ng_DIProperty('function','function(e, mi, elm) { ng_CallParent(this, "DoMouseLeave", arguments); }', { Level: 'optional' }),
                "DoClickOutside": ng_DIProperty('function','function(pi) { ng_CallParent(this, "DoClickOutside", arguments); }', { Level: 'optional' }),
                "IsInsidePopup": ng_DIProperty('function','function(target, intype, e) { ng_CallParent(this, "IsInsidePopup", arguments); }', { Level: 'optional' }),

                "DoAcceptGestures": ng_DIProperty('function','function(elm, gestures) { ng_CallParent(this, "DoAcceptGestures", arguments); }'),

                "DoAcceptPtrGestures": ng_DIProperty('function','function(elm, eid, gestures, ev) { ng_CallParent(this, "DoAcceptPtrGestures", arguments); }', { Level: 'optional' }),
                "DoGetPtrOptions": ng_DIProperty('function','function(eid, opts) { ng_CallParent(this, "DoGetPtrOptions", arguments); }', { Level: 'optional' }),

                "DoUpdate": ng_DIProperty('function','function(elm) { ng_CallParent(this, "DoUpdate", arguments); }'),
                "DoAttach": ng_DIProperty('function','function(elm, elmid) { ng_CallParent(this, "DoAttach", arguments); }'),
                "DoRelease": ng_DIProperty('function','function(elm) { ng_CallParent(this, "DoRelease", arguments); }'),
                "DoSetVisible": ng_DIProperty('function','function(elm, v) { ng_CallParent(this, "DoSetVisible", arguments); }'),
                "DoResize": ng_DIProperty('function','function(elm) { ng_CallParent(this, "DoResize", arguments); }'),

                "SetVisible": ng_DIProperty('function','function(v) { ng_CallParent(this, "SetVisible", arguments); }', { Level: 'optional' }),
                "SetFocus": ng_DIProperty('function','function(state) { ng_CallParent(this, "SetFocus", arguments); }', { Level: 'optional' }),
                "SetBounds": ng_DIProperty('function','function(props) { ng_CallParent(this, "SetBounds", arguments); }', { Level: 'optional' }),
                "SetScrollBars": ng_DIProperty('function','function(v) { ng_CallParent(this, "SetScrollBars", arguments); }', { Level: 'optional' }),
                "SetPopup": ng_DIProperty('function','function(p) { ng_CallParent(this, "SetPopup", arguments); }', { Level: 'optional' }),
                "SetOpacity": ng_DIProperty('function','function(v) { ng_CallParent(this, "SetOpacity", arguments); }', { Level: 'optional' }),
                "Align": ng_DIProperty('function','function(o) { ng_CallParent(this, "Align", arguments); }', { Level: 'optional' }),
                "Attach": ng_DIProperty('function','function(o) { ng_CallParent(this, "Attach", arguments); }', { Level: 'optional' }),
                "Release": ng_DIProperty('function','function() { ng_CallParent(this, "Release", arguments); }', { Level: 'optional' }),
                "Update": ng_DIProperty('function','function(recursive) { ng_CallParent(this, "Update", arguments); }', { Level: 'optional' }),
                "UpdateLater": ng_DIProperty('function','function(s) { ng_CallParent(this, "UpdateLater", arguments); }', { Level: 'optional' }),

                "DoPointerDown": ng_DIProperty('function','function(pi) { ng_CallParent(this, "DoPointerDown", arguments); }'),
                "DoPointerUp": ng_DIProperty('function','function(pi) { ng_CallParent(this, "DoPointerUp", arguments); }'),
                "DoPtrStart": ng_DIProperty('function','function(pi) { ng_CallParent(this, "DoPtrStart", arguments); }'),
                "DoPtrEnd": ng_DIProperty('function','function(pi) { ng_CallParent(this, "DoPtrEnd", arguments); }'),
                "DoPtrDrag": ng_DIProperty('function','function(pi) { ng_CallParent(this, "DoPtrDrag", arguments); }'),
                "DoPtrClick": ng_DIProperty('function','function(pi) { ng_CallParent(this, "DoPtrClick", arguments); }'),
                "DoPtrDblClick": ng_DIProperty('function','function(pi) { ng_CallParent(this, "DoPtrDblClick", arguments); }')
              }
            }
          }
        }
      }
    };

    ng_MergeDI(obj.DesignInfo ,getBaseProperties());
  };

  window.ngSysControlDesignInfo = function(obj)
  {
    if ((!ngHASDESIGNINFO()) || (!obj) || (typeof obj.DesignInfo !== 'undefined')) return;

    obj.DesignInfo = {
      NonVisual: true,
      ControlCategory: 'System',
      Properties: {
        "R": {},
        "B": {}
      }
    };

    ng_MergeDI(obj.DesignInfo ,getBaseProperties());
  };
})()


if (typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['controls_designinfo'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'FormEditor Controls',
  FormEditorIgnoreControls: true,

  OnFormEditorInit: function(FE)
  {
    FE.RegisterPropertyTypesGroup('events', ['function', 'identifier', 'null', 'undefined']);
  },

  OnControlDesignInfo: function(def, c, ref)
  {
    if(!def.CtrlInheritanceDepth) {
      var di = {};
      // define common DesignInfo
      var events = (c.DesignInfo && c.DesignInfo.Properties && c.DesignInfo.Properties.Events) ? c.DesignInfo.Properties.Events : {},
          eventstype = [{ id: 'Before', order: 0.91 }, { id: 'After', order: 0.93 }, { id: 'Override', order: 0.94 }],
          id;
      di.Properties = ngNullVal(di.Properties, {});
      for (var i = 0; i < eventstype.length; i++)
      {
        id = eventstype[i].id + 'Events';
        di.Properties[id] = ngNullVal(c.DesignInfo.Properties[id], {});
        ng_MergeDI(di.Properties[id], events);
        di.Properties[id].Order = eventstype[i].order;
      }
      return di;
    }
  },
  OnInit: function() {
    if(!ngDESIGNINFO) return;

    // register generic control
    function feGenericControl(id)
    {
      ngControl(this, id, 'feGenericControl');
      ngControlCreated(this);
    }
    ngRegisterControlType('feGenericControl', function() { return new feGenericControl; });

    function feGenericSysControl(id)
    {
      ngSysControl(this, id, 'feGenericSysControl');
      ngControlCreated(this);
    }
    ngRegisterControlType('feGenericSysControl', function() { return new feGenericSysControl; });
  }
};