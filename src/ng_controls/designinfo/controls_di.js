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
 *    object *ng_DIPropertyControl* (string type [, object data={}, string inheritedfrom])
 *
 *  Parameters:
 *    typed - control type
 *    data - optional standard property definition to which props are merged to
 *    inheritedfrom - optional control inheritance restriction
 *
 *  Returns:
 *    Property design info.
 */
function ng_DIPropertyControl(type, data, inheritedfrom) {
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
    ids.push(c.Text);
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
                "Enabled": ng_DIPropertyBool(true, { Level: 'basic' })
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
                "SetChildControlsEnabled": ng_DIProperty('function','function(v, p) { ng_CallParent(this, "SetChildControlsEnabled", arguments); }', { Level: 'experimental' }),

                "DoDispose": ng_DIProperty('function','function() { return ng_CallParent(this, "DoDispose", arguments, true); }'),
                "DoCreate": ng_DIProperty('function','function(props, ref, nd, parent) { ng_CallParent(this, "DoCreate", arguments); }'),
                "DoSetEnabled": ng_DIProperty('function','function(v) { ng_CallParent(this, "DoSetEnabled", arguments); }'),

                "Enable": ng_DIProperty('function','function() { ng_CallParent(this, "Enable", arguments); }',{ Level: 'optional' }),
                "Disable": ng_DIProperty('function','function() { ng_CallParent(this, "Disable, arguments); }',{ Level: 'optional' }),
                "SetEnabled": ng_DIProperty('function','function(v, p) { ng_CallParent(this, "SetEnabled", arguments); }',{ Level: 'optional' }),
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


if (typeof ngUserControls === 'undefined') ngUserControls = [];
ngUserControls['controls_designinfo'] = {
  OnFormEditorInit: function(FE)
  {
    var types = [
      // ngImageShape
      {
        TypeID: 'ngImageShape',
        TypeBase: 'object',
        Name: 'ngImageShape',
        ShortName: 'shape',
        Basic: false,
        Options: {
          Add: false,
          ObjectProperties: {
            "Shape": ng_DIPropertyStrings('rect', ['rect','circle','poly'], { Level: 'basic', Order: 0.4 }),
            "Coords": { DefaultType: 'string', Level: 'basic', Order: 0.41 },
            "Alt": { DefaultType: 'string', Level: 'basic' },
            "OnClick": ng_DIPropertyEvent('function(e) { return true; }', { Level: 'basic' })
          }
        }
      },
      // ngPage
      {
        TypeID: 'ngPage',
        TypeBase: 'object',
        Name: 'ngPage',
        ShortName: 'page',
        Basic: false,
        Options: {
          ObjectProperties: {
            "id":   { DefaultType: 'undefined', InitType: 'string', Level: 'basic' },
            "Text": { DefaultType: 'undefined', InitType: 'string', Level: 'basic', Order: 0.4 },
            "Alt":  { DefaultType: 'undefined', InitType: 'string', Level: 'basic' },
            "Visible": ng_DIPropertyBool(true, { Level: 'basic' }),
            "Enabled": ng_DIPropertyBool(true, { Level: 'basic' }),
            "ControlsPanel": ng_DIPropertyControl('ngPanel', { Level: 'advanced', IsContainer: false }),
            "W": ng_DIProperty(['undefined','bounds'],undefined, { InitType: 'bounds_integer', Level: 'basic' }),
            "H": ng_DIProperty(['undefined','bounds'],undefined, { InitType: 'bounds_integer', Level: 'basic' }),
            "MinWidth": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic' },
            "Controls": { DefaultType: 'controls', Level: 'basic',
              ContainerProperty: true,
              Types: {
                'controls': {
                  DestroyIfEmpty: true,
                  ChildDesignInfo: {
                    PropertyGroup: 'Controls'
                  }
                }
              }
            }
          }
        }
      }
    ];
    FormEditor.RegisterPropertyType(types);

    FE.RegisterPropertyTypesGroup('events', ['function', 'identifier', 'null', 'undefined']);
    FE.AddPropertyTypeToGroup('object', 'images');
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



    ngRegisterControlDesignInfo('ngPanel',function(d,c,ref) {
      var di={
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 100 }
            }
          }
        },
        Properties: {
          "ParentReferences": { Level: 'advanced' },
          "ScrollBars": { Level: 'basic' },
          "Controls": { Level: 'basic' }
        }
      };
      if(!d.CtrlInheritanceDepth) {
        di.ControlCategory='Containers';
        di.IsContainer=true;
        di.BaseControl='ngPanel';
      }
      return di;
    });

    ngRegisterControlDesignInfo('ngText',function(d,c,ref) {
      return {
        ControlCategory: 'Labels',
        NewControl: {
          Default: {
            Properties: {
              "Data": {
                ObjectProperties: {
                  "Text": { ValueByRefName: true },
                  "HTMLEncode": { Value: true }
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "style": {
            "color": { Level: 'basic' },
            "fontFamily": { Level: 'basic' },
            "fontSize": { Level: 'basic' },
            "fontStyle": { Level: 'basic' },
            "fontWeight": { Level: 'basic' },
            "lineHeight": { Level: 'basic' },
            "textTransform": { Level: 'basic' },
            "whiteSpace": { Level: 'basic' }
          },

          "Data": {
            "TextAlign": ng_DIPropertyStrings('left', ['left','right','center','justify'], { Level: 'basic' }),
            "AutoSize": ng_DIPropertyBool(false),
            "AutoSizeMode": ng_DIPropertyStrings('auto', ['auto','horizontal','vertical']),
            "MinWidth":  { DefaultType: 'undefined', InitType: 'integer' },
            "MinHeight": { DefaultType: 'undefined', InitType: 'integer' },

            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'basic' },
            "Text": ng_DIPropertyRefName({ Level: 'basic',
              Types: {
                'string': {
                  Editor: 'ngfeEditor_Text'
                }
              }
            }),
            "ngAlt": { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": { DefaultType: 'string', Level: 'basic' },
            "HTMLEncode": ng_DIPropertyBool(ngVal(ngDefaultHTMLEncoding,false), { Level: 'basic' }),
            "CanSelect": ng_DIPropertyBool(true, { Level: 'basic' })
          },
          "OverrideEvents": {
            "OnSetText": ng_DIPropertyEvent('function(text, c) { return text; }'),
            "OnGetText": ng_DIPropertyEvent('function(c) { return ""; }',{ Level: 'basic' }),
            "OnGetAlt": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngImage',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        BaseControl: 'ngImage',
        Properties: ng_DIProperties({
          "Data": {
            "ngAlt":  { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": { DefaultType: 'string', Level: 'basic' },
            "AutoSize": ng_DIPropertyBool(true),
            "Img": { DefaultType: 'image', Level: 'basic' }
          },
          "OverrideEvents": {
            "OnGetImg": ng_DIPropertyEvent('function(c) { return null; }', { Level: 'basic' }),
            "OnGetAlt": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngImageMap',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        BaseControl: 'ngImageMap',
        Properties: ng_DIProperties({
          "Data": {
            "ngAlt":  { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": { DefaultType: 'string', Level: 'basic' },
            "AutoSize": ng_DIPropertyBool(true),
            "Img": { DefaultType: 'image', Level: 'basic' },
            "Cursor": { DefaultType: 'css_cursor', Level: 'basic' },
            "Shapes": { DefaultType: 'array', Level: 'basic',
              Types: {
                'array': {
                  ChildDesignInfo: {
                    DefaultType: 'ngImageShape'
                  }
                }
              }
            }
          },
          "Events": {
            "OnShapeClick": ng_DIPropertyEvent('function(e) { }', { Level: 'basic' }),
            "OnMouseEnter":  { },
            "OnMouseLeave":  { },
            "OnMouseShapeEnter": ng_DIPropertyEvent('function(c, shapeidx) { }'),
            "OnMouseShapeLeave": ng_DIPropertyEvent('function(c, shapeidx) { }')
          },
          "OverrideEvents": {
            "OnGetImg": ng_DIPropertyEvent('function(c) { return null; }', { Level: 'basic' }),
            "OnGetAlt": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetShapeAlt": ng_DIPropertyEvent('function(c, shapeidx) { return ""; }', { Level: 'basic' })
          }
        })
      }
    });

    ngRegisterControlDesignInfo('ngButton',function(d,c,ref) {
      return {
        ControlCategory: 'Buttons',
        NewControl: {
          Default: {
            Properties: {
              "Data": {
                ObjectProperties: {
                  "Text": { ValueByRefName: true },
                  "HTMLEncode": { Value: true }
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "H": { Level: 'optional' },
          "style": {
            "color": { Level: 'basic' },
            "fontFamily": { Level: 'basic' },
            "fontSize": { Level: 'basic' },
            "fontStyle": { Level: 'basic' },
            "fontWeight": { Level: 'basic' },
            "textTransform": { Level: 'basic' }
          },
          "Data": {
            "Action": { DefaultType: 'string', Level: 'basic'
              // TODO: browse from existing actions
            },
            "TextAlign": ng_DIPropertyStrings('center', ['left','right','center'], { Level: 'basic' }),
            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'basic' },
            "Text": ng_DIPropertyRefName({ Level: 'basic' }),
            "ngAlt":  { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": { DefaultType: 'string', Level: 'basic' },
            "HTMLEncode": ng_DIPropertyBool(ngVal(ngDefaultHTMLEncoding,false), { Level: 'basic' }),
            "AutoSize": ng_DIPropertyBool(true),
            "MinWidth": { DefaultType: 'undefined', InitType: 'integer' },
            "Checked": ng_DIPropertyValues('integer', 0, ['Unchecked','Checked','Grayed'], { Level: 'basic',
              Types: {
                'integer': {
                   InitValue: 1
                 }
              }
            }),
            "RadioGroup": { DefaultType: 'undefined', InitType: 'string'
              // TODO: browse from existing radio groups
            },
            "Cursor": ng_DIProperty('css_cursor', 'pointer', { Level: 'basic' }),
            "ReadOnly": ng_DIPropertyBool(false, { Level: 'basic' }),
            "Img": { DefaultType: 'image', Level: 'basic' },
            "ImgAlign": ng_DIPropertyStrings('left', ['left','right'], { Level: 'basic' }),
            "ImgIndent": { DefaultType: 'integer', Level: 'basic' },
            "LeftImg": { DefaultType: 'image', Level: 'basic' },
            "MiddleImg": { DefaultType: 'image', Level: 'basic',
              Types: {
                'image': {
                   EditorOptions: {
                     HorizontalImages: true
                   }
                 }
              }
            },
            "RightImg": { DefaultType: 'image', Level: 'basic' },
            "Default": ng_DIPropertyBool(false, { Level: 'basic' }),
            "Cancel": ng_DIPropertyBool(false, { Level: 'basic' })
          },
          "Events": {
            "OnCheckChanged": ng_DIPropertyEvent('function(c) { }', { Level: 'basic' }),
            "OnDblClick": ng_DIPropertyEvent('function(e) { }', { Level: 'basic' }),
            "OnClick": ng_DIPropertyEvent('function(e) { }', { Level: 'basic' }),
            "OnMouseEnter": { },
            "OnMouseLeave": { }
          },
          "OverrideEvents": {
            "OnSetText": ng_DIPropertyEvent('function(text, c) { return text; }'),
            "OnGetText": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetAlt": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetImg": ng_DIPropertyEvent('function(c, idx) { return null; }', { Level: 'basic' }),
            "OnGetClassName": ng_DIPropertyEvent('function(c, cls, text) { return cls; }', { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngGroup',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        IsContainer: true,
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 100 },
              "Data": {
                ObjectProperties: {
                  "Text": { ValueByRefName: true },
                  "HTMLEncode": { Value: true }
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "ParentReferences": { Level: 'advanced' },
          "W": { 
            Exclude: ['CW']
          },
          "H": {
            Exclude: ['CH']
          },
          "CW": { DefaultType: 'integer', Order: 0.141,
            Exclude: ['W']
          },
          "CH": { DefaultType: 'integer', Order: 0.142,
            Exclude: ['H']
          },
          "ControlsPanel": { DefaultType: 'control', Level: 'advanced',
            IsContainer: false,
            Types: {
              'control': {
                Type: 'ngPanel'
              }
            }
          },
          "Data": {
            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'basic' },
            "Text": ng_DIPropertyRefName({ Level: 'basic' }),
            "HTMLEncode": ng_DIPropertyBool(ngVal(ngDefaultHTMLEncoding,false), { Level: 'basic' }),
            "Frame": { DefaultType: 'img_frame', Level: 'basic',
              Collapsed: true
            },
            "ControlsInside": ng_DIPropertyBool(true, { Level: 'basic' })
          },
          "OverrideEvents": {
            "OnSetText": ng_DIPropertyEvent('function(text, c) { return text; }'),
            "OnGetText": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' })
          }
        },
        {
          "Controls": { Level: 'basic' }
        })
      };
    });

    ngRegisterControlDesignInfo('ngEdit',function(d,c,ref) {
      return {
        ControlCategory: 'Edits',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "Data": {
                ObjectProperties: {
                  "Text": { ValueByRefName: true }
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "Buttons": { DefaultType: 'controls_array', Level: 'basic',
            Collapsed: false,
            PropertyGroup: 'Controls',
            Types: {
              'controls_array': {
                DestroyIfEmpty: true,
                ChildDesignInfo: {
                  PropertyGroup: 'Controls',
                  Types: {
                    'control': {
                      InheritedFrom: 'ngButton',
                      ObjectProperties: ng_DIProperties({
                        "Data": {
                          "ButtonAlign": ng_DIPropertyStrings('right', ['left','right'], { Level: 'basic', Order: 0.8 })
                        }
                      })
                    }
                  }
                }
              }
            }
          },
          "DropDown": { DefaultType: 'control', 
            PropertyGroup: 'Controls'
          },
          "Data": {
            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'optional' },
            "Text": ng_DIPropertyRefName({ Level: 'basic' }),
            "DefaultText": { DefaultType: 'string', Level: 'basic' },
            "TextAlign": ng_DIPropertyStrings('left', ['left','right','center'], { Level: 'basic' }),
            "ngAlt":  { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": { DefaultType: 'string', Level: 'basic' },
            "ngHint":  { Level: 'advanced' },
            "ngHintD": { Level: 'basic' },
            "Hint": { DefaultType: 'string', Level: 'basic' },
            "HintStyle": ng_DIPropertyIntConstants(ngVal(ngDefaultHintStyle,1),['ngHintHideOnFocus','ngHintHideOnInput'],{ Level: 'basic' }),
            "ReadOnly": ng_DIPropertyBool(false, { Level: 'basic' }),
            "Password": ng_DIPropertyBool(false, { Level: 'basic' }),
            "MaxLength": { DefaultType: 'integer', Level: 'basic' },
            "LeftImg": { DefaultType: 'image', Level: 'basic' },
            "MiddleImg": { DefaultType: 'image', Level: 'basic',
              Types: {
                'image': {
                   EditorOptions: {
                     HorizontalImages: true
                   }
                 }
              }
            },
            "RightImg": { DefaultType: 'image', Level: 'basic' },
            "OffsetTop": { DefaultType: 'integer', Level: 'basic' },
            "SelectOnFocus": ng_DIPropertyBool(true, { Level: 'basic' }),
            "DropDownType": ng_DIPropertyIntConstants(0,['ngeDropDownEdit','ngeDropDownList']),
            "DropDownWidth": { DefaultType: 'undefined', InitType: 'integer' },
            "DropDownAlign": ng_DIPropertyStrings('left', ['left','right']),
            "LockHintCaretPos": ng_DIPropertyBool(true, { Level: 'basic' }),
            "Invalid": ng_DIPropertyBool(false, { Level: 'basic' }),
            "Suggestion": ng_DIPropertyBool(false),
            "SuggestionDelay": ng_DIProperty('integer',200),
            "SuggestionSearchColumn": { DefaultType: 'string' },
            "SuggestionIgnoreCase": ng_DIPropertyBool(true),
            "SuggestionPartial": ng_DIPropertyValues('integer',2,[{Value:2,Text:'Contains'},{Value:1,Text:'Starts With'},{Value:0,Text:'Equals'},{Value:-1,Text:'Custom'}]),
            "SuggestionURL": { DefaultType: 'url' },
            "SuggestionType": { DefaultType: 'string' }
          },
          "Methods": {
            "DoFocus": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function(e, elm) { ng_CallParent(this, "DoFocus", arguments); }'
                }
              }
            },
            "DoBlur": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function(e, elm) { ng_CallParent(this, "DoBlur", arguments); }'
                }
              }
            },
            "DoUpdateImages": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function() { ng_CallParent(this, "DoUpdateImages", arguments); }'
                }
              }
            },
            "DoSetInvalid": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function(state, update) { ng_CallParent(this, "DoSetInvalid", arguments); }'
                }
              }
            }
          },
          "OverrideEvents": {
            "OnSetText": ng_DIPropertyEvent('function(text, c) { return text; }'),
            "OnGetText": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetAlt": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetHint": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetClassName": ng_DIPropertyEvent('function(c, cls, text, hint) { return cls; }', { Level: 'basic' }),
            "OnGetImg": ng_DIPropertyEvent('function(c, idx) { return null; }', { Level: 'basic' }),
            "OnSuggestionSetText": ng_DIPropertyEvent('function(text, it) { return text; }'),
            "OnSuggestionURL": ng_DIPropertyEvent('function(c, url) { return url; }')
          },
          "Events": {
            "OnTextChanged": ng_DIPropertyEvent('function(c) { }', { Level: 'basic' }),
            "OnDropDown": ng_DIPropertyEvent('function(c, dd) { return true; }'),
            "OnHideDropDown": ng_DIPropertyEvent('function(c, dd) { return true; }'),
            "OnClickOutside": { },
            "OnKeyDown": ng_DIPropertyEvent('function(e, elm) { return true; }', { Level: 'basic' }),
            "OnKeyUp": ng_DIPropertyEvent('function(e, elm) { return true; }', { Level: 'basic' }),
            "OnKeyPress": ng_DIPropertyEvent('function(e, elm) { return true; }', { Level: 'basic' }),
            "OnMouseEnter": { },
            "OnMouseLeave": { },
            "OnFocus": ng_DIPropertyEvent('function(c) { }', { Level: 'basic' }),
            "OnBlur": ng_DIPropertyEvent('function(c) { }', { Level: 'basic' }),
            "OnSetInvalid": ng_DIPropertyEvent('function(c, state, update) { return true; }', { Level: 'basic' }),
            "OnSetReadOnly": ng_DIPropertyEvent('function(c, state) { return true; }', { Level: 'basic' }),
            "OnReadOnlyChanged": ng_DIPropertyEvent('function(c, state) { }', { Level: 'basic' }),
            "OnSuggestionSearch": ng_DIPropertyEvent('function(c, txt, res) { return true; }'),
            "OnSuggestionCompareItem": ng_DIPropertyEvent('function(c, txt, itemtxt, list, it, parent) { return (txt==itemtxt); }'),
            "OnSuggestionResults": ng_DIPropertyEvent('function(c, txt, data, res) { return true; }'),
            "OnSuggestionData": ng_DIPropertyEvent('function(c, txt, data) { return true; }')
          }
        })
      };
    });
    ngRegisterControlDesignInfo('ngMemo',function(d,c,ref) {
      return {
        ControlCategory: 'Edits',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 100 },
              "Data": {
                ObjectProperties: {
                  "Text": { ValueByRefName: true }
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "Data": {
            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'optional' },
            "Text": ng_DIPropertyRefName({ Level: 'basic' }),
            "DefaultText": { DefaultType: 'string', Level: 'basic' },
            "TextAlign": ng_DIPropertyStrings('left', ['left','right','center'], { Level: 'basic' }),
            "ngAlt":  { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": { DefaultType: 'string', Level: 'basic' },
            "ngHint": { Level: 'advanced' },
            "ngHintD": { Level: 'basic' },
            "Hint": { DefaultType: 'string', Level: 'basic' },
            "HintStyle": ng_DIPropertyIntConstants(ngVal(ngDefaultHintStyle,1),['ngHintHideOnFocus','ngHintHideOnInput'],{ Level: 'basic' }),
            "ReadOnly": ng_DIPropertyBool(false, { Level: 'basic' }),
            "Frame": { DefaultType: 'img_frame', Level: 'basic' },
            "SelectOnFocus": ng_DIPropertyBool(true, { Level: 'basic' }),
            "LockHintCaretPos": ng_DIPropertyBool(true, { Level: 'basic' }),
            "Invalid": ng_DIPropertyBool(false, { Level: 'basic' })
          },
          "Methods": {
            "DoFocus": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function(e, elm) { ng_CallParent(this, "DoFocus", arguments); }'
                }
              }
            },
            "DoBlur": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function(e, elm) { ng_CallParent(this, "DoBlur", arguments); }'
                }
              }
            },
            "DoUpdateImages": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function() { ng_CallParent(this, "DoUpdateImages", arguments); }'
                }
              }
            },
            "DoSetInvalid": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function(state, update) { ng_CallParent(this, "DoSetInvalid", arguments); }'
                }
              }
            }
          },
          "OverrideEvents": {
            "OnSetText": ng_DIPropertyEvent('function(text, c) { return text; }'),
            "OnGetText": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetAlt": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetHint": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetClassName": ng_DIPropertyEvent('function(c, cls, text, hint) { return cls; }', { Level: 'basic' })
          },
          "Events": {
            "OnTextChanged": ng_DIPropertyEvent('function(c) { }', { Level: 'basic' }),
            "OnKeyDown": ng_DIPropertyEvent('function(e, elm) { return true; }', { Level: 'basic' }),
            "OnKeyUp": ng_DIPropertyEvent('function(e, elm) { return true; }', { Level: 'basic' }),
            "OnKeyPress": ng_DIPropertyEvent('function(e, elm) { return true; }', { Level: 'basic' }),
            "OnMouseEnter": { },
            "OnMouseLeave": { },
            "OnFocus": ng_DIPropertyEvent('function(c) { }', { Level: 'basic' }),
            "OnBlur": ng_DIPropertyEvent('function(c) { }', { Level: 'basic' }),
            "OnSetInvalid": ng_DIPropertyEvent('function(c, state, update) { return true; }', { Level: 'basic' }),
            "OnSetReadOnly": ng_DIPropertyEvent('function(c, state) { return true; }', { Level: 'basic' }),
            "OnReadOnlyChanged": ng_DIPropertyEvent('function(c, state) { }', { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngPages',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        IsContainer: true,
        TargetContainer: function(control, target_control, control_elm, target_elm)
        {
          if (!control) return 'Pages.0.Controls';
          return 'Pages.' + ngVal(control.Page, 0) + '.Controls';
        },
        BaseControl: 'ngPages',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 100 },
              "Data": {
                ObjectProperties: {
                  "HTMLEncode": { Value: true }
                }
              },
              "Pages": {
                ObjectProperties: {
                  "0": {
                    ObjectProperties: {
                      Text: { Value: 'Page 1', Type: 'string' }
                    }
                  }
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "Pages": { DefaultType: 'array', Level: 'basic',
            Collapsed: false,
            Types: {
              'array': {
                ChildDesignInfo: {
                  DefaultType: 'ngPage',
                  Collapsed: false,
                  OnPropertyInit: function(ch)
                  {
                    if (FormEditor.PropertyTypeInheritsFrom(ch.Type, 'ngPage'))
                    {
                      var pageid = ng_toInteger(ch.Name.substring(ch.Name.lastIndexOf('.') + 1));
                      if (!isNaN(pageid))
                      {
                        if (!ch.Value || typeof ch.Value !== 'object') ch.Value = {};
                        ch.Value.Text = "'Page " + (pageid + 1) + "'";
                      }
                    }

                    return true;
                  }
                }
              }
            }
          },
          "ControlsPanel": { DefaultType: 'control', Level: 'advanced',
            IsContainer: false,
            Types: {
              'control': {
                Type: 'ngPanel'
              }
            }
          },
          "Data": {
            "Page": { DefaultType: 'integer', Level: 'basic' },
            "PagesVisible": ng_DIPropertyBool(true, { Level: 'basic' }),
            "PagesIndent": { DefaultType: 'integer', Level: 'basic' },
            "PagesSize": { DefaultType: 'integer', Level: 'basic' },
            "MaxRows": { DefaultType: 'integer', Level: 'basic' },
            "PagesAlign": ng_DIPropertyStrings('left', ['left','right'], { Level: 'basic' }),
            "PagesVAlign": ng_DIPropertyStrings('top', ['top','bottom'], { Level: 'basic' }),
            "TextAlign": ng_DIPropertyStrings('left', ['left','right','center','justify'], { Level: 'basic' }),
            "HTMLEncode": ng_DIPropertyBool(ngVal(ngDefaultHTMLEncoding,false), { Level: 'basic' }),
            "RowOverlap": { DefaultType: 'integer', Level: 'basic' },
            "PageImages": { DefaultType: 'array', Level: 'basic' },
            "Frame": { DefaultType: 'img_frame', Level: 'basic',
              Collapsed: true
            }
          },
          "OverrideEvents": {
            "OnGetText": ng_DIPropertyEvent('function(c, pg) { return ""; }', { Level: 'basic' }),
            "OnGetAlt": ng_DIPropertyEvent('function(c, pg) { return ""; }', { Level: 'basic' })
          },
          "Events": {
            "OnPageChanging": ng_DIPropertyEvent('function(c, page) { return true; }', { Level: 'basic' }),
            "OnPageChanged": ng_DIPropertyEvent('function(c, oldpage) { return true; }', { Level: 'basic' }),
            "OnClick": ng_DIPropertyEvent('function(e) { return true; }', { Level: 'basic' }),
            "OnDblClick": ng_DIPropertyEvent('function(e) { return true; }', { Level: 'basic' })
          }
        }),

        ActionsMenu: {
          'add_page': {
            Text: 'Add Page',
            MultiSelect: false,
            Checked: 0,
            OnMenuClick: function(e, m, it)
            {
              var pages = FormEditor.GetSelectedControlsProperty('Pages');
              for (var i in pages)
              {
                var p = pages[i];
                if (!p) continue;

                var pages_cnt;
                if (p.PropertyDefined === 0) pages_cnt = 0;
                else pages_cnt = ng_IsArrayVar(p.PropertyValue) ? p.PropertyValue.length : 0;

                FormEditor.SetControlsProperty({ Name: 'Pages.' + pages_cnt,                           ControlID: p.ControlID, UseInit: FormEditor.Params.PEInitializePropertiesOnAdd, Interactive: FormEditor.Params.PEInitializePropertiesOnAdd });
                FormEditor.SetControlsProperty({ Name: 'Data.Page', Type: 'integer', Value: pages_cnt, ControlID: p.ControlID });
              }

              return false;
            }
          },
          'delete_page': {
            Text: '@%add_page+:Delete Page',
            MultiSelect: false,
            Checked: 0,
            OnMenuClick: function(e, m, it)
            {
              var selected = FormEditor.GetSelectedControls();
              if (selected.length !== 1 || !selected[0]) return false;

              var cidx = selected[0].ControlID,
                  pages = FormEditor.GetControlsProperty('Pages', [cidx]),
                  pages_defined = (pages.PropertyDefined !== 0),
                  pages_cnt = (pages_defined && ng_IsArrayVar(pages[0].PropertyValue)) ? pages[0].PropertyValue.length : 0;
              if (pages_cnt === 0) return false;

              var page_selected = 0;
              var pgs = FormEditor.GetControlsProperty('Data.Page', [cidx]);
              if (pgs && pgs[0] && pgs[0].PropertyDefined !== 0 && ng_isInteger(pgs[0].PropertyValue)) page_selected = pgs[0].PropertyValue;

              var new_pg_select = page_selected - 1;
              if (new_pg_select < 0) new_pg_select = 0;

              var pg_Text = FormEditor.GetControlsProperty('Pages.'+page_selected+'.Text', [cidx]),
                  pg_txt = (pg_Text && pg_Text[0] && pg_Text[0].PropertyDefined !== 0 && typeof pg_Text[0].PropertyValue === 'string') ? pg_Text[0].PropertyValue : '';

              FormEditor.MessageDlg('feMessageBox', 'Delete page `'+pg_txt+'` (ID: '+page_selected+')?', 'Delete Page', function(c) {
                if (c.DialogResult === mbYes)
                {
                  FormEditor.SetControlsProperty({ Name: 'Pages.' + page_selected, Destroy: true });
                  FormEditor.SetControlsProperty({ Name: 'Data.Page', Destroy: new_pg_select === 0, Type: 'integer', Value: new_pg_select });

                  return true;
                }

                return true;
              }, {
                CloseBtn: true,
                DlgButtons: mbYes|mbNo,
                DlgIcon: mbIconQuestion,
                Controls: {
                  Buttons: {
                    Controls: {
                      Yes: {
                        Data: { Default: false }
                      },
                      No: {
                        Data: {
                          Default: true,
                          Cancel: true
                        }
                      }
                    }
                  }
                }
              });

              return false;
            }
          }
        },

        OnActionsMenuCreating: function(actions)
        {
          if (!actions) actions = {};

          var selected = FormEditor.GetSelectedControls();
          if (selected.length === 0) return;

          // add actions
          actions['delim1'] = { Text: '@%delete_page+:-' };

          var selected_pages = FormEditor.GetSelectedControlsProperty('Pages'),
              lastid = 'delim1';
          for (var i in selected)
          {
            if (!selected[i]) continue;

            var ctrlType = selected[i].DefType;
            if (!FormEditor.TypeInheritsFrom(ctrlType, 'ngPages')) continue;

            var pages = selected_pages[i];
            if (!pages) continue;

            var refname = (selected[i] && selected[i].ControlRefName) ? selected[i].ControlRefName : '';
            if (refname)
            {
              var cidx = selected[i].ControlID,
                  id = 'select_page_' + cidx,
                  pages_defined = (pages.PropertyDefined !== 0),
                  pages_cnt = (pages_defined && ng_IsArrayVar(pages.PropertyValue)) ? pages.PropertyValue.length : 0,
                  rootadd = (selected.length === 1);

              var page_selected = 0,
                  pgs = FormEditor.GetControlsProperty('Data.Page', [cidx]);
              if (pgs && pgs[0] && pgs[0].PropertyDefined !== 0 && ng_isInteger(pgs[0].PropertyValue)) page_selected = pgs[0].PropertyValue;

              if (!rootadd)
              {
                actions[id] = {
                  Text: refname + ' (' + pages_cnt + ' Pages Inside)',
                  MultiSelect: true,
                  Enabled: pages_cnt > 0,
                  Checked: 0,
                  OnMenuClick: function(e, m, it)
                  {
                    return false;
                  }
                };
              }

              var selit;
              for (var pg = 0; pg < pages_cnt; pg++)
              {
                var pg_Text = FormEditor.GetControlsProperty('Pages.'+pg+'.Text', [cidx]),
                    pg_txt = (pg_Text && pg_Text[0] && pg_Text[0].PropertyDefined !== 0 && typeof pg_Text[0].PropertyValue === 'string') ? pg_Text[0].PropertyValue : '',
                    checked = (pg === page_selected) ? 1 : 0;

                var action = {
                  Text: (!rootadd ? ('%'+id+'\\') : '@%'+lastid+'+:' ) + ('('+pg+') - ' + pg_txt),
                  MultiSelect: true,
                  ControlID: cidx,
                  Page: pg,
                  PageText: pg_txt,
                  Checked: checked,
                  OnMenuClick: function(e, m, it)
                  {
                    FormEditor.SetControlsProperty({ Name: 'Data.Page', Type: 'integer', Value: it.Page, ControlID: it.ControlID });

                    return false;
                  }
                };
                lastid = id+'_'+pg;
                actions[lastid] = action;

                if (checked) selit = action;
              }

              if (selected.length === 1)
              {
                var dit = actions['delete_page'];
                if (dit)
                {
                  dit.Enabled = (ngVal(dit.Enabled, true) && (pages_cnt > 0));
                  if (dit.Enabled && selit)
                  {
                    dit.Text = '@%add_page+:Delete Page (' + (selit.PageText ? selit.PageText : selit.Page) + ')';
                    dit.Text = dit.Text.replace(/ /g, '&nbsp;');
                  }
                }
              }
            }
          }
        }

      };
    });
    ngRegisterControlDesignInfo('ngToolBar',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        IsContainer: true,
        BaseControl: 'ngToolBar',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 150 },
              "H": { Value: 30 }
            }
          }
        },
        Properties: ng_DIProperties({
          "Data": {
            "AutoSize": ng_DIPropertyBool(false),
            "Vertical": ng_DIPropertyBool(false, { Level: 'basic' }),
            "VPadding": { DefaultType: 'integer', Level: 'basic' },
            "HPadding": { DefaultType: 'integer', Level: 'basic' },
            "VAlign": ng_DIPropertyStrings('top', ['top','bottom'], { Level: 'basic' }),
            "HAlign": ng_DIPropertyStrings('left', ['left','right'], { Level: 'basic' }),
            "Wrapable": ng_DIPropertyBool(true, { Level: 'basic' })
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
                        "Data": {
                          "ToolBarIgnore": ng_DIPropertyBool(false, { Level: 'basic', Order: 0.8 }),
                          "ToolBarAutoUpdate": ng_DIPropertyBool(true, { Level: 'basic', Order: 0.8 }),
                          "ToolBarIndent": { DefaultType: 'integer', Level: 'basic', Order: 0.8 },
                          "ToolBarHPadding": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic', Order: 0.8 },
                          "ToolBarVPadding": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic', Order: 0.8 },
                          "ToolBarWidth": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic', Order: 0.8 },
                          "ToolBarHeight": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic', Order: 0.8 },
                          "ToolBarBreak": ng_DIPropertyBool(false, { Level: 'basic', Order: 0.8 }),
                          "ToolBarNoWrap": ng_DIPropertyBool(false, { Level: 'basic', Order: 0.8 })
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

    ngRegisterControlDesignInfo('ngProgressBar',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 }
            }
          }
        },
        Properties: ng_DIProperties({
          "Data": {
            "Position": { DefaultType: 'integer', Level: 'basic' },
            "Smooth": ng_DIPropertyBool(false, { Level: 'basic' }),
            "LeftImg": { DefaultType: 'image', Level: 'basic' },
            "MiddleImg": { DefaultType: 'image', Level: 'basic',
              Types: {
                'image': {
                   EditorOptions: {
                     HorizontalImages: true
                   }
                 }
              }
            },
            "RightImg": { DefaultType: 'image', Level: 'basic' },
            "BarImg": { DefaultType: 'image', Level: 'basic',
              Types: {
                'image': {
                   EditorOptions: {
                     HorizontalImages: true
                   }
                 }
              }
            }
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngWebBrowser',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        BaseControl: 'ngWebBrowser',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 100 }
            }
          }
        },
        Properties: ng_DIProperties({
          "Data": {
            "URL": { DefaultType: 'url', Level: 'basic' },
            "DesignLive": ng_DIPropertyBool(false, { Level: 'basic' })
          },
          "OverrideEvents": {
            "OnGetURL": ng_DIPropertyEvent('function(c, url) { return url; }', { Level: 'basic' }),
            "OnSetHTML": ng_DIPropertyEvent('function(c, html) { return html; }', { Level: 'basic' })
          },
          "Events": {
            "OnSetURL": ng_DIPropertyEvent('function(c, url) { return true; }', { Level: 'basic' })
          }

        })
      };
    });

    // Derived controls

    ngRegisterControlDesignInfo('ngFrame',function(d,c,ref) {
      var di={
        Properties: {
          "ParentReferences": ng_DIPropertyBool(false, { Level: 'optional' })
        }
      };
      if(!d.CtrlInheritanceDepth) {
        di.ControlCategory='Containers';
        di.IsContainer=true;
        di.BaseControl='ngFrame';
      }
      return di;
    });

    ngRegisterControlDesignInfo('ngRadioButton',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "Data": {
            "RadioGroup": ng_DIProperty('string','default', { Level: 'basic' }),
            "AllowGrayed": ng_DIPropertyBool(false, { Level: 'basic' }),
            "RadioAllowUncheck": ng_DIPropertyBool(false, { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngCheckBox',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "Data": {
            "AllowGrayed": ng_DIPropertyBool(false, { Level: 'basic' })
          }
        })
      };
    });

    function DropDownDI(d,c,ref) {
      return {
        NewControl: {
          Default: {
            Properties: {
              "DropDown": { Value: "{ Type: 'ngList' }"}
            }
          }
        },
        Properties: ng_DIProperties({
          "DropDown":         { Level: 'basic' },
          "Data": {
            "DropDownWidth":  { Level: 'basic' },
            "DropDownAlign":  { Level: 'basic' },
            "DropDownType":   { Level: 'optional' }
          },
          "Events": {
            "OnDropDown":     { Level: 'basic' },
            "OnHideDropDown": { Level: 'basic' }
          }
        })
      };
    }

    ngRegisterControlDesignInfo('ngDropDownList',function(d,c,ref) {
      var di={
        NewControl: {
          Default: {
            Properties: {
              "Data": {
                ObjectProperties: {
                  "Text": undefined
                }
              },
              "DropDown": {
                ObjectProperties: {
                  "Type": "'ngList'"
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "DropDownType": {
            Types: {
              'identifier': {
                DefaultValue: 'ngeDropDownList'
              },
              'integer': {
                DefaultValue: 1
              }
            }
          }
        })
      };
      ng_MergeDI(di,DropDownDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('ngDropDown',function(d,c,ref) {
      var di={
        NewControl: {
          Default: {
            Properties: {
              "DropDown": {
                ObjectProperties: {
                  "Type": "'ngList'"
                }
              }
            }
          }
        }
      };
      ng_MergeDI(di,DropDownDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('ngEditNum',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "ArrowsAlign": ng_DIPropertyStrings('right', ['left','right','both'], { Level: 'basic' }),
          "Arrows": ng_DIPropertyStrings('leftright', ['none','leftright','updown'], { Level: 'basic' }),
          "Data": {
            "Step": ng_DIProperty('integer', 1, { Level: 'basic' }),
            "StepRound": ng_DIPropertyBool(false, { Level: 'basic' }),
            "MinNum": { DefaultType: 'integer', Level: 'basic' },
            "MaxNum": { DefaultType: 'integer', Level: 'basic' },
            "DefaultNum": { DefaultType: 'integer', Level: 'basic' }
          },
          "Methods": {
            "DoDown": ng_DIProperty('function','function() { ng_CallParent(this, "DoDown", arguments); }'),
            "DoUp": ng_DIProperty('function','function() { ng_CallParent(this, "DoUp", arguments); }')
          },
          "OverrideEvents": {
            "OnGetNum": ng_DIPropertyEvent('function(c) { return 0; }')
          },
          "Events": {
            "OnSetNum": ng_DIPropertyEvent('function(c, num) {  }'),
            "OnUp": ng_DIPropertyEvent('function(e, num) { return true; }', { Level: 'basic' }),
            "OnDown": ng_DIPropertyEvent('function(e, num) { return true; }', { Level: 'basic' })
          }
        })
      };
    });

  }
};