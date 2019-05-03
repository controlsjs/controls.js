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
    IsContainer: false,
    IsBasic: false,
    IsViewModel: false,
    NonVisual: false,
    GridSize: 20,
    Image: {...},

    NewControl: {
      Default: {
        Properties: {
          "prop1": {
            Value: val,
            ValueByRefName: false,

            // W and H  dimenstion properties are rounded to nearest non-zero possitive grid by default
            Grid: true
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
        Level: 'advanced' (basic|advanced|optional|hidden|invalid|deprecated|experimental|user)
        PropertyGroup: 'All'(Definition|Data|DataBind|Events|...Events|Methods|Controls|All),
        DisplayName: 'PropertyName' (function(propertyname, displayname) { return displayname; }),
        Order: 0.5,
        Collapsed: true,
        ContainerProperty: false,
        Required: false,
        FixedType: false,
        Exclude: ['exprop1', 'exprop2', ... 'expropN'],
        DesignRemove: false,
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

    TargetContainer: function(control, target_control, control_elm, target_elm) {
      return null;
    }

  }
*/

/**
 *  Function: ng_diType
 *  Defines property design info.
 *
 *  Syntax:
 *    object *ng_diType* (string type [, object pdata={}, object tdata={}])
 *
 *  Parameters:
 *    type - property type
 *    pdata - additional property definition
 *    tdata - additional type definition
 *
 *  Returns:
 *    Property design info.
 */
function ng_diType(type, pdata, tdata) {
  var di=((tdata)&&(typeof tdata==='object')) ? tdata : {};
  var types={};
  types[type]=di;
  var ret=((pdata)&&(typeof pdata==='object')) ? pdata : {};
  ng_MergeVar(ret,{ DefaultType: type, Types: types });
  return ret;
}

/**
 *  Function: ng_diTypeVal
 *  Defines property design info.
 *
 *  Syntax:
 *    object *ng_diTypeVal* (string type [, mixed defvalue, object pdata={}, object tdata={}])
 *
 *  Parameters:
 *    type - property type
 *    defvalue - property default value
 *    pdata - additional property definition
 *    tdata - additional type definition
 *
 *  Returns:
 *    Property design info.
 */
function ng_diTypeVal(type, defval, pdata, tdata) {
  var di=((tdata)&&(typeof tdata==='object')) ? tdata : {};
  if((typeof defval!=='undefined')&&(typeof di.DefaultValue==='undefined')) {
    di.DefaultValue=defval;
    if(typeof di.InitValue==='undefined') di.InitValue=defval;
  }
  var types={};
  types[type]=di;
  var ret=((pdata)&&(typeof pdata==='object')) ? pdata : {};
  ng_MergeVar(ret,{ DefaultType: type, Types: types });
  return ret;
}

/**
 *  Function: ng_diDisableType
 *  Disables specified property type.
 *
 *  Syntax:
 *    object *ng_diDisableType* (mixed type [, object pdata={}])
 *
 *  Parameters:
 *    type - property type to be disabled (can be list of types defined as index array)
 *    pdata - additional property definition
 *
 *  Returns:
 *    Property design info.
 */
function ng_diDisableType(type, pdata) {
  var types={};
  if(!ng_IsArrayVar(type)) type=[type];
  for(var i=0;i<type.length;i++) types[type[i]]=false;
  var ret=((pdata)&&(typeof pdata==='object')) ? pdata : {};
  ng_MergeVar(ret,{ Types: types });
  return ret;
}

/**
 *  Function: ng_diReplaceType
 *  Replaces specified property type with another one.
 *
 *  Syntax:
 *    object *ng_diReplaceType* (mixed oldtype, mixed newtype [, object pdata={}])
 *
 *  Parameters:
 *    oldtype - property type to be disabled (can be list of types defined as index array)
 *    newtype - new property type (string type or design info)
 *    pdata - additional property definition
 *
 *  Returns:
 *    Property design info.
 */
function ng_diReplaceType(oldtype, newtype, pdata) {
  if(typeof newtype==='string') newtype=ng_diType(newtype);
  var ret=((pdata)&&(typeof pdata==='object')) ? pdata : {};
  ng_MergeVar(ret,ng_diDisableType(oldtype, newtype));
  return ret;
}

/**
 *  Function: ng_diBoolean
 *  Defines boolean type property design info.
 *
 *  Syntax:
 *    object *ng_diBoolean* ([string defvalue, object pdata={}, object tdata={}])
 *
 *  Parameters:
 *    defvalue - property default value
 *    pdata - additional property definition
 *    tdata - additional type definition
 *
 *  Returns:
 *    Property design info.
 */
function ng_diBoolean(defval, pdata, tdata) {
  var di=((tdata)&&(typeof tdata==='object')) ? tdata : {};
  ng_MergeVar(di, {
    InitValue: true
  });
  return ng_diTypeVal('boolean', defval, pdata, di);
}

/**
 *  Function: ng_diString
 *  Defines string type property design info.
 *
 *  Syntax:
 *    object *ng_diString* ([string defvalue, object pdata={}, object tdata={}])
 *
 *  Parameters:
 *    defvalue - property default value
 *    pdata - additional property definition
 *    tdata - additional type definition
 *
 *  Returns:
 *    Property design info.
 */
function ng_diString(defval, pdata, tdata) {
  return ng_diTypeVal('string', defval, pdata, tdata);
}

/**
 *  Function: ng_diInteger
 *  Defines integer type property design info.
 *
 *  Syntax:
 *    object *ng_diInteger* ([integer defvalue, object pdata={}, object tdata={}])
 *
 *  Parameters:
 *    defvalue - property default value
 *    pdata - additional property definition
 *    tdata - additional type definition
 *
 *  Returns:
 *    Property design info.
 */
function ng_diInteger(defval, pdata, tdata) {
  return ng_diTypeVal('integer', defval, pdata, tdata);
}

/**
 *  Function: ng_diFloat
 *  Defines float type property design info.
 *
 *  Syntax:
 *    object *ng_diFloat* ([float defvalue, object pdata={}, object tdata={}])
 *
 *  Parameters:
 *    defvalue - property default value
 *    pdata - additional property definition
 *    tdata - additional type definition
 *
 *  Returns:
 *    Property design info.
 */
function ng_diFloat(defval, pdata, tdata) {
  return ng_diTypeVal('float', defval, pdata, tdata);
}

/**
 *  Function: ng_diNumber
 *  Defines number type property design info.
 *
 *  Syntax:
 *    object *ng_diNumber* ([number defvalue, object pdata={}, object tdata={}])
 *
 *  Parameters:
 *    defvalue - property default value
 *    pdata - additional property definition
 *    tdata - additional type definition
 *
 *  Returns:
 *    Property design info.
 */
function ng_diNumber(defval, pdata, tdata) {
  return ng_diTypeVal('number', defval, pdata, tdata);
}

/**
 *  Function: ng_diIdentifier
 *  Defines identifier type property design info.
 *
 *  Syntax:
 *    object *ng_diIdentifier* ([string defvalue, object pdata={}, object tdata={}])
 *
 *  Parameters:
 *    defvalue - property default value
 *    pdata - additional property definition
 *    tdata - additional type definition
 *
 *  Returns:
 *    Property design info.
 */
function ng_diIdentifier(defval, pdata, tdata) {
  return ng_diTypeVal('identifier', defval, pdata, tdata);
}

/**
 *  Function: ng_diFunction
 *  Defines function type property design info.
 *
 *  Syntax:
 *    object *ng_diFunction* ([string defvalue, object pdata={}, object tdata={}])
 *
 *  Parameters:
 *    defvalue - property default value
 *    pdata - additional property definition
 *    tdata - additional type definition
 *
 *  Returns:
 *    Property design info.
 */
function ng_diFunction(defval, pdata, tdata) {
  return ng_diTypeVal('function', defval, pdata, tdata);
}

/**
 *  Function: ng_diExpression
 *  Defines expression type property design info.
 *
 *  Syntax:
 *    object *ng_diExpression* ([string defvalue, object pdata={}, object tdata={}])
 *
 *  Parameters:
 *    defvalue - property default value
 *    pdata - additional property definition
 *    tdata - additional type definition
 *
 *  Returns:
 *    Property design info.
 */
function ng_diExpression(defval, pdata, tdata) {
  return ng_diTypeVal('expression', defval, pdata, tdata);
}

/**
 *  Function: ng_diComputed
 *  Defines computed type property design info.
 *
 *  Syntax:
 *    object *ng_diComputed* ([string defvalue, object pdata={}, object tdata={}])
 *
 *  Parameters:
 *    defvalue - property default value
 *    pdata - additional property definition
 *    tdata - additional type definition
 *
 *  Returns:
 *    Property design info.
 */
function ng_diComputed(defval, pdata, tdata) {
  return ng_diTypeVal('computed', defval, pdata, tdata);
}

/**
 *  Function: ng_diUndefined
 *  Defines null type property design info.
 *
 *  Syntax:
 *    object *ng_diNull* ([object pdata={}, object tdata={}])
 *
 *  Parameters:
 *    pdata - additional property definition
 *    tdata - additional type definition
 *
 *  Returns:
 *    Property design info.
 */
function ng_diUndefined(pdata, tdata) {
  return ng_diType('undefined', pdata, tdata);
}

/**
 *  Function: ng_diNull
 *  Defines null type property design info.
 *
 *  Syntax:
 *    object *ng_diNull* ([object pdata={}, object tdata={}])
 *
 *  Parameters:
 *    pdata - additional property definition
 *    tdata - additional type definition
 *
 *  Returns:
 *    Property design info.
 */
function ng_diNull(pdata, tdata) {
  return ng_diType('null', pdata, tdata);
}

/**
 *  Function: ng_diObject
 *  Defines object type property design info.
 *
 *  Syntax:
 *    object *ng_diObject* ([object properties, object pdata={}, object tdata={}, string basetype='object'])
 *
 *  Parameters:
 *    properties - object properties
 *    pdata - additional property definition
 *    tdata - additional type definition
 *    basetype - property type
 *
 *  Returns:
 *    Property design info.
 */
function ng_diObject(properties, pdata, tdata, basetype) {
  var di=((tdata)&&(typeof tdata==='object')) ? tdata : {};
  if(properties) {
    if(ng_IsArrayVar(properties)) {
      var props={};
      for(var i=0;i<properties.length;i++) props[i]=properties[i];
      properties=props;
    }
    di.ObjectProperties=properties;
  }
  return ng_diType(ngVal(basetype,'object'),pdata,di);
}

/**
 *  Function: ng_diArray
 *  Defines array type property design info.
 *
 *  Syntax:
 *    object *ng_diArray* ([object pdata={}, object tdata={}])
 *
 *  Parameters:
 *    pdata - additional property definition
 *    tdata - additional type definition
 *
 *  Returns:
 *    Property design info.
 */
function ng_diArray(pdata, tdata) {
  return ng_diType('array', pdata, tdata);
}

/**
 *  Function: ng_diArrayOf
 *  Defines array type property design info.
 *
 *  Syntax:
 *    object *ng_diArrayOf* (mixed itemptype, [object pdata={}, object tdata={}, basetype='array'])
 *
 *  Parameters:
 *    itemptype - items property definition; can be defined also as string type
 *    pdata - additional property definition
 *    tdata - additional type definition
 *    basetype - property type
 *
 *  Returns:
 *    Property design info.
 */
function ng_diArrayOf(itemptype, pdata, tdata, basetype) {
  if(typeof itemptype==='string') {
    if(itemptype==='string') return ng_diType('array_strings', pdata, tdata);
    pdata=((pdata)&&(typeof pdata==='object')) ? pdata : {};
    itemptype=ng_diType(itemptype, { Level: pdata.Level });
  }
  var di=((tdata)&&(typeof tdata==='object')) ? tdata : {};
  if(itemptype) {
    ng_MergeVar(di, {
      ChildDesignInfo: itemptype
    });
  }
  return ng_diType(ngVal(basetype,'array'),pdata,di);
}

/**
 *  Function: ng_diArrayOfControls
 *  Defines array of controls type property design info.
 *
 *  Syntax:
 *    object *ng_diArrayOfControls* (mixed controlptype, [object pdata={}, object tdata={}])
 *
 *  Parameters:
 *    controlptype - items property control definition; can be defined also as string type
 *    pdata - additional property definition
 *    tdata - additional type definition
 *
 *  Returns:
 *    Property design info.
 */
function ng_diArrayOfControls(controlptype, pdata, tdata) {
  return ng_diArrayOf(controlptype, pdata, tdata, 'controls_array');
}

/**
 *  Function: ng_diControls
 *  Defines controls references type property design info.
 *
 *  Syntax:
 *    object *ng_diControls* ([object references, object pdata={}, object tdata={}])
 *
 *  Parameters:
 *    references - controls reference properties
 *    pdata - additional property definition
 *    tdata - additional type definition
 *
 *  Returns:
 *    Property design info.
 */
function ng_diControls(references, pdata, tdata) {
  return ng_diObject(references, pdata, tdata, 'controls');
}

/**
 *  Function: ng_diControl
 *  Defines control type property design info.
 *
 *  Syntax:
 *    object *ng_diControl* (string ctrltype [, object properties, object pdata={}, object tdata={}, string basetype='control'])
 *
 *  Parameters:
 *    ctrltype - control type
 *    properties - optional control properties definition
 *    pdata - additional property definition
 *    tdata - additional type definition
 *    basetype - property type
 *
 *  Returns:
 *    Property design info.
 */
function ng_diControl(ctrltype, properties, pdata, tdata, basetype) {
  var di=((tdata)&&(typeof tdata==='object')) ? tdata : {};
  if(properties) di.ObjectProperties=properties;
  if(ctrltype) {
    if(!di.ObjectProperties) di.ObjectProperties = {};
    ng_MergeVar(di.ObjectProperties, { Type: ng_diString(ctrltype) });
  }
  return ng_diType(ngVal(basetype,'control'),pdata,di);
}

/**
 *  Function: ng_diEvent
 *  Defines event type property design info.
 *
 *  Syntax:
 *    object *ng_diEvent* (string defvalue [, object pdata={}, object tdata={}])
 *
 *  Parameters:
 *    defvalue - property default value
 *    pdata - additional property definition
 *    tdata - additional type definition
 *
 *  Returns:
 *    Property design info.
 */
function ng_diEvent(defvalue, pdata, tdata, basetype) {
  var di=((pdata)&&(typeof pdata==='object')) ? pdata : {};
  if(typeof di.DefaultType==='undefined') di.DefaultType='events';
  return ng_diTypeVal(ngVal(basetype,'function'),defvalue,di,tdata);
}

/**
 *  Function: ng_diBindings
 *  Defines bindings type property design info.
 *
 *  Syntax:
 *    object *ng_diBindings* (object bindings, [object pdata={}, object tdata={}, basetype='bindings'])
 *
 *  Parameters:
 *    bindings - function arguments as array of properties
 *    pdata - additional property definition
 *    tdata - additional type definition
 *    basetype - property type
 *
 *  Returns:
 *    Property design info.
 */
function ng_diBindings(props, pdata, tdata, basetype) {
  return ng_diObject([ng_diObject(props)], pdata, tdata, ngVal(basetype,'bindings'));
}

/**
 *  Function: ng_diMixed
 *  Defines mixed types property design info.
 *
 *  Syntax:
 *    object *ng_diMixed* (mixed types [, object pdata={}])
 *
 *  Parameters:
 *    types - list of property types defined as a list of property design infos or as a list of types; the first type in list is considered as default type
 *    pdata - additional property definition
 *
 *  Returns:
 *    Property design info.
 */
function ng_diMixed(types, pdata) {
  var di=((pdata)&&(typeof pdata==='object')) ? pdata : {};
  if(!ng_IsArrayVar(types)) types=[types];

  for(var i in types) {
    if(typeof types[i]==='string') {
      ng_MergeVar(di,ng_diType(types[i]));
      continue;
    }
    ng_MergeVar(di,types[i]);
  }
  if((typeof di.DefaultType ==='undefined')&&(typeof di.Types==='object')&&(di.Types)) {
    for(var j in di.Types) {
      di.DefaultType=j; break;
    }
  }
  return di;
}

/**
 *  Function: ng_diStringRefName
 *  Defines string type property design info which is initialized by control's reference name.
 *
 *  Syntax:
 *    object *ng_diStringRefName* ([object pdata={}, object tdata={}, string basetype='string'])
 *
 *  Parameters:
 *    pdata - additional property definition
 *    tdata - additional type definition
 *    basetype - property type
 *
 *  Returns:
 *    Property design info.
 */
function ng_diStringRefName(pdata, tdata, basetype) {
  var di=((pdata)&&(typeof pdata==='object')) ? pdata : {};
  ng_MergeVar(di, {
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
  return ng_diType(ngVal(basetype,'string'),di,tdata);
}

/**
 *  Function: ng_diTypeValues
 *  Defines property design info where value of this property is picked from defined list of values.
 *
 *  Syntax:
 *    object *ng_diTypeValues* (string type, string defvalue, array values [, object pdata={}, object tdata={}])
 *
 *  Parameters:
 *    type - property type
 *    defvalue - property default value or name
 *    values - list of values defined as object { Value: X, Text: 'Value1' }
 *    pdata - additional property definition
 *    tdata - additional type definition
 *
 *  Returns:
 *    Property design info.
 */
function ng_diTypeValues(type, defvalue, values, pdata, tdata) {
  var c,defival;
  if(values) {
    for(var i=values.length-1;i>=0;i--) {
      c=values[i];
      if(typeof c==='undefined') { values.splice(i,1); continue; }
      if(typeof c==='string') { c={ Text:c, Value: i }; values[i]=c; }
      if(c.Text===defvalue) defival=c.Value;
      else if(c.Value===defvalue) { defival=c.Value; defvalue=c.Text; }
    }
  }
  var di=((tdata)&&(typeof tdata==='object')) ? tdata : {};
  ng_MergeVar(di, {
    Editor: 'ngfeEditor_DropDownList',
    EditorOptions: {
      Items: values
    }
  });
  return ng_diTypeVal(type,defival,pdata,di);
}

/**
 *  Function: ng_diStringValues
 *  Defines string type property design info where value of this property is picked from defined list of strings.
 *
 *  Syntax:
 *    object *ng_diStringValues* (string defvalue, array strings [, object pdata={}, object tdata={}, string basetype='string'])
 *
 *  Parameters:
 *    defvalue - property default value
 *    strings - list of strings
 *    pdata - additional property definition
 *    tdata - additional type definition
 *    basetype - property type
 *
 *  Returns:
 *    Property design info.
 */
function ng_diStringValues(defvalue, strings, pdata, tdata, basetype) {
  var di=((tdata)&&(typeof tdata==='object')) ? tdata : {};
  ng_MergeVar(di, {
    Editor: 'ngfeEditor_DropDownList',
    EditorOptions: {
      Items: strings
    }
  });
  return ng_diTypeVal(ngVal(basetype,'string'),defvalue,pdata,di);
}

/**
 *  Function: ng_diIntegerIdentifiers
 *  Defines integer property design info where value is defined by one or more identifiers.
 *  The property will be resolved by identifier name or by identifier value.
 *
 *  Syntax:
 *    object *ng_diIntegerIdentifiers* (mixed defvalue, array consts [, object pdata={}, object ids_tdata={}, object int_tdata={}, string ids_basetype='identifier', int_basetype='integer'])
 *
 *  Parameters:
 *    defvalue - property default value, identifier name or value
 *    consts - list of identifiers, identifier is defined as object { Value: X, Text: 'Const1' } or as string,
 *             if string is used the value is considered as item order in a array,
 *             undefined items are skipped
 *    data - additional property definition
 *    ids_tdata - additional identifier type definition
 *    int_tdata - additional integer type definition
 *    ids_basetype - identifier property type
 *    int_basetype - integer property type
 *
 *  Returns:
 *    Property design info.
 */
function ng_diIntegerIdentifiers(defvalue, consts, pdata, ids_tdata, int_tdata, ids_basetype, int_basetype) {
  if(typeof consts==='undefined') {
    if(typeof defvalue==='string') {
      return ng_diTypeVal(ngVal(ids_basetype,'identifier'),defvalue, pdata, ids_tdata);
    }
    else {
      return ng_diTypeVal(ngVal(int_basetype,'integer'), defvalue, pdata, int_tdata);
    }
  }
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
  var di1=((ids_tdata)&&(typeof ids_tdata==='object')) ? ids_tdata : {};
  ng_MergeVar(di1, {
    Editor: 'ngfeEditor_DropDown',
    EditorOptions: {
      Items: ids
    }
  });
  var di2=((int_tdata)&&(typeof int_tdata==='object')) ? int_tdata : {};
  ng_MergeVar(di2, {
    Level: 'hidden',
    Editor: 'ngfeEditor_DropDownList',
    EditorOptions: {
      Items: consts
    }
  });

  return ng_diMixed([
    ng_diTypeVal(ngVal(ids_basetype,'identifier'),defvalue, null, di1),
    ng_diTypeVal(ngVal(int_basetype,'integer'), defival, null, di2)
  ],pdata);
}

/**
 *  Function: ng_diProperties
 *  Creates control design info Properties.
 *
 *  Syntax:
 *    object *ng_diProperties* (object props [, object data={}])
 *
 *  Parameters:
 *    props - simplified properties definition
 *    data - optional standard properties definition to which props are merged to
 *
 *  Returns:
 *    Control design info Properties.
 */
function ng_diProperties(props,data) {
  var di=((data)&&(typeof data==='object')) ? data : {};
  for(var i in props) {
    switch(i) {
      case 'Data':
      case 'Events':
      case 'AfterEvents':
      case 'BeforeEvents':
      case 'OverrideEvents':
      case 'Methods':
      case 'style':
        if(typeof di[i]==='undefined') di[i]={};
        di[i]=ng_diObject(props[i],di[i]);
        break;
      case 'Controls':
      case 'ModifyControls':
        if(typeof di[i]==='undefined') di[i]={};
        di[i]=ng_diControls(props[i],di[i]);
        break;
      case 'DataBind':
      case 'DOMDataBind':
        if(typeof di[i]==='undefined') di[i]={};
        di[i]=ng_diBindings(props[i],di[i]);
        break;
      default:
        di[i]=props[i];
        break;
    }
  }
  return di;
};

(function()
{
  var undefined;
  function getBaseProperties()
  {
    var BaseDI = {
      Properties: {
        "ID": ng_diStringRefName({ Level: 'optional', Order: 0.001 }),
        "Type": ng_diString('', { Level: 'basic', Order: 0.01 }, { Editor: 'ngfeEditor_ControlType' }),
        "L": ng_diType('bounds', { DisplayName: "Left (L)", Level: 'basic', Order: 0.11 }),
        "T": ng_diType('bounds', { DisplayName: "Top (T)", Level: 'basic', Order: 0.12 }),
        "R": ng_diType('bounds', { DisplayName: "Right (R)", Level: 'basic', Order: 0.15 }),
        "B": ng_diType('bounds', { DisplayName: "Bottom (B)", Level: 'basic', Order: 0.16 }),
        "ParentReferences": ng_diBoolean(true, { Level: 'optional', Order: 0.302 }),
        "OnCreating": ng_diEvent('function(def, ref, parent, options) { return true; }', { Level: 'advanced', Order: 0.306, DesignRemove: true }),
        "OnCreated": ng_diEvent('function(c, refs, options) {}', { Level: 'advanced', Order: 0.307, DesignRemove: true }),
        "Data": ng_diObject({
          "Enabled": ng_diBoolean(true, { Level: 'basic' }),
          "ChildHandling": ng_diTypeVal('bitmask', ngChildEnabledAsParent, { Level: 'optional' }, {
            EditorOptions: {
              BitMaskIdentifiers: [
                {Value: ngChildEnabledAsParent,    ID: 'ngChildEnabledAsParent', Exclude: [ngChildEnabledIndependent] },
                {Value: ngChildEnabledParentAware, ID: 'ngChildEnabledParentAware', Exclude: [ngChildEnabledIndependent]},
                {Value: ngChildEnabledIndependent, ID: 'ngChildEnabledIndependent', Exclude: [ngChildEnabledAsParent, ngChildEnabledParentAware] }
              ]
            }
          })
        }, { Level: 'basic', Order: 0.4 }, { DestroyIfEmpty: true }),
        "Controls": ng_diControls(undefined, { Level: 'optional', Order: 0.65, ContainerProperty: true, PropertyGroup: 'Controls', ModifyControlsProperty: 'ModifyControls' }, {
          ChildDesignInfo: {
            PropertyGroup: 'Controls',
            Level: 'basic'
          }
        }),
        "ModifyControls": ng_diControls(undefined, { Level: 'optional', Order: 0.7, ContainerProperty: true, PropertyGroup: 'Controls', Collapsed: false }, {
          DestroyIfEmpty: true,
          ChildDesignInfo: ng_diControl(undefined, ng_diProperties({
            "IgnoreModifyIfMissing": ng_diBoolean(false, { Level: 'basic', Order: 0.002 })
          }),
          {
            PropertyGroup: 'Controls',
            Level: 'basic'
          })
        }),
        "Events": ng_diObject({
          "OnSetEnabled": ng_diEvent('function(c, v, p) { return true; }', { Level: 'advanced' }),
          "OnEnabledChanged": ng_diEvent('function(c, p) {}', { Level: 'basic' }),
          "OnAddChildControl": ng_diEvent('function(obj) {}', { Level: 'advanced' }),
          "OnRemoveChildControl": ng_diEvent('function(obj) {}', { Level: 'advanced' })
        }, { Level: 'basic', Order: 0.92 }, { DestroyIfEmpty: true, ChildDesignInfo: ng_diFunction('function(c) { return true; }', { DesignRemove: true, Level: 'user' }) }),
        "Methods": ng_diObject({
          "DoDispose": ng_diFunction('function() { return ng_CallParent(this, "DoDispose", arguments, true); }', { Level: 'advanced' }),
          "DoCreate": ng_diFunction('function(props, ref, nd, parent) { ng_CallParent(this, "DoCreate", arguments); }', { Level: 'advanced' }),
          "DoSetEnabled": ng_diFunction('function(v) { ng_CallParent(this, "DoSetEnabled", arguments); }', { Level: 'advanced' }),
          "DoSetChildEnabled": ng_diFunction('function(c, v, p) { ng_CallParent(this, "DoSetChildEnabled", arguments); }', { Level: 'advanced' }),
          "DoSetChildControlsEnabled": ng_diFunction('function(cc, v, p) { ng_CallParent(this, "DoSetChildControlsEnabled", arguments); }', { Level: 'advanced' }),

          "Enable": ng_diFunction('function() { ng_CallParent(this, "Enable", arguments); }',{ Level: 'optional' }),
          "Disable": ng_diFunction('function() { ng_CallParent(this, "Disable, arguments); }',{ Level: 'optional' }),
          "SetEnabled": ng_diFunction('function(v, p) { ng_CallParent(this, "SetEnabled", arguments); }',{ Level: 'optional' }),
          "AddChildControl": ng_diFunction('function(obj) { ng_CallParent(this, "AddChildControl", arguments); }', { Level: 'optional' }),
          "RemoveChildControl": ng_diFunction('function(obj) { ng_CallParent(this, "RemoveChildControl", arguments); }', { Level: 'optional' }),
          "SetChildControlsEnabled": ng_diFunction('function(v, p) { ng_CallParent(this, "SetChildControlsEnabled", arguments); }', { Level: 'optional' }),
          "Elm": ng_diFunction('function() { return ng_CallParent(this, "Elm", arguments, null); }',{ Level: 'optional' }),
          "CtrlInheritsFrom": ng_diFunction('function(type) { return ng_CallParent(this, "CtrlInheritsFrom", arguments, false); }',{ Level: 'optional' }),
          "Create": ng_diFunction('function(props, ref) { return ng_CallParent(this, "Create", arguments, null); }',{ Level: 'optional' }),
          "Dispose": ng_diFunction('function() { ng_CallParent(this, "Dispose", arguments); }',{ Level: 'optional' }),
          "AddEvent": ng_diFunction('function(ev, fce, once) { ng_CallParent(this, "AddEvent", arguments); }',{ Level: 'optional' }),
          "RemoveEvent": ng_diFunction('function(ev, fce) { ng_CallParent(this, "RemoveEvent", arguments); }',{ Level: 'optional' })
        }, { Level: 'basic', Order: 0.8 }, { DestroyIfEmpty: true, ChildDesignInfo: ng_diFunction('function() {}', { DesignRemove: true, Level: 'user' }) })
      }
    };

    return BaseDI;
  }

  window.ngControlDesignInfo = function(obj)
  {
    if ((!ngHASDESIGNINFO()) || (!obj) || (typeof obj.DesignInfo !== 'undefined')) return;

    obj.DesignInfo = {
      Properties: {
        "W": ng_diType('bounds', { DisplayName: "Width (W)", Level: 'basic', Order: 0.13 }),
        "H": ng_diType('bounds', { DisplayName: "Height (H)", Level: 'basic', Order: 0.14 }),
        "ScrollBars": ng_diIntegerIdentifiers('ssNone',['ssNone','ssDefault','ssAuto','ssBoth','ssHorizontal','ssVertical'],{ Level: 'optional', Order: 0.301 }),
        "style": ng_diObject({
          "background": ng_diString('', { Level: 'optional' }),
          "backgroundColor": ng_diType('css_colors', { Level: 'optional' }),
          "backgroundImage": ng_diString('', { Level: 'optional' }),
          "border": ng_diString('', { Level: 'optional' }),
          "borderColor": ng_diTypeVal('css_colors', '#000000ff', { Level: 'optional' }),
          "borderBottom": ng_diString('', { Level: 'optional' }),
          "borderLeft": ng_diString('', { Level: 'optional' }),
          "borderRight": ng_diString('', { Level: 'optional' }),
          "borderTop": ng_diString('', { Level: 'optional' }),
          "borderStyle": ng_diStringValues('none', ['none','solid','dotted','dashed','double','groove','ridge','inset','outset'],{ Level: 'optional' }),
          "borderWidth": ng_diMixed(['css_dim_px', 'string'], { Level: 'optional' }),
          "color": ng_diTypeVal('css_colors', '#000000', { Level: 'optional' }),
          "cursor": ng_diType('css_cursor', { Level: 'optional' }),
          "fontFamily": ng_diStringValues('', [
            '"Times New Roman", Times, serif',
            'Georgia, serif',
            'Arial, Helvetica, sans-serif',
            '"Arial Black", Gadget, sans-serif',
            '"Comic Sans MS", cursive, sans-serif',
            'Impact, Charcoal, sans-serif',
            'Tahoma, Geneva, sans-serif',
            'Verdana, Geneva, sans-serif',
            '"Courier New", Courier, monospace',
            '"Lucida Console", Monaco, monospace'
          ], { Level: 'optional' }, { InitValue: 'Arial, Helvetica, sans-serif' }),
          "fontSize": ng_diType('css_dim_px', { Level: 'optional' }, { InitValue: '12px' }),
          "fontStyle": ng_diStringValues('normal', ['normal','italic','oblique','initial','inherit'], { Level: 'optional' }),
          "fontWeight": ng_diStringValues('normal', ['normal','bold','bolder','lighter','100','200','300','400','500','600','700','800','900'], { Level: 'optional' }),
          "lineHeight": ng_diType('css_dim_px', { Level: 'optional' }, { InitValue: '12px' }),
          "margin": ng_diString('', { Level: 'optional' }),
          "marginBottom": ng_diType('css_dim_px', { Level: 'optional' }),
          "marginLeft": ng_diType('css_dim_px', { Level: 'optional' }),
          "marginRight": ng_diType('css_dim_px', { Level: 'optional' }),
          "marginTop": ng_diType('css_dim_px', { Level: 'optional' }),
          "padding": ng_diString('', { Level: 'optional' }),
          "paddingBottom": ng_diType('css_dim_px', { Level: 'optional' }),
          "paddingLeft": ng_diType('css_dim_px', { Level: 'optional' }),
          "paddingRight": ng_diType('css_dim_px', { Level: 'optional' }),
          "paddingTop": ng_diType('css_dim_px', { Level: 'optional' }),
          "textAlign": ng_diStringValues('left', ['left','center','right','justify','initial','inherit'], { Level: 'optional' }),
          "verticalAlign": ng_diStringValues('baseline', ['baseline','sub','super','top','text-top','middle','bottom','text-bottom','initial','inherit'], { Level: 'optional' }),
          "textDecoration": ng_diStringValues('none', ['none','underline','overline','line-through','initial','inherit'], { Level: 'optional' }),
          "textTransform": ng_diStringValues('none', ['none','uppercase','lowercase','capitalize','initial','inherit'], { Level: 'optional' }),
          "whiteSpace": ng_diStringValues('normal', ['normal','nowrap','pre','pre-line','pre-wrap','initial','inherit'], { Level: 'optional' }),
          "zIndex": ng_diInteger(0, { Level: 'advanced' })
        }, { Level: 'advanced', Order: 0.252 }, { DestroyIfEmpty: true }),
        "Opacity": ng_diFloat(1.0, { Level: 'basic', Order: 0.253 }, { InitValue: 0.5 }),
        "className": ng_diString('', { Level: 'advanced', Order: 0.251 }),
        "innerHTML": ng_diString('', { Level: 'hidden', Order: 0.303 }),
        "id": ng_diString('', { Level: 'optional', Order: 0.05 }),
        "parent": ng_diMixed(['string','object'], { Level: 'optional', Order: 0.07 }),
        "IE6AlignFix": ng_diBoolean(ngIE6AlignFix, { Level: 'optional', Order: 0.304 }),
        "OnCreateHTMLElement": ng_diEvent('function(props, ref, c) {}', { Level: 'optional', Order: 0.305, DesignRemove: true }),
        "Data": ng_diObject({
          "Visible": ng_diBoolean(true, { Level: 'basic' }),
          "IsPopup": ng_diBoolean(false, { Level: 'advanced' }),
          "HiResControl": ng_diBoolean(false, { Level: 'advanced' }),
          "PopupGroup": ng_diString('default', { Level: 'optional' }),
          "Gestures": ng_diObject({
            "drag":       ng_diBoolean(false, { Level: 'advanced' }),
            "dragleft":   ng_diBoolean(false, { Level: 'optional' }),
            "dragright":  ng_diBoolean(false, { Level: 'optional' }),
            "dragup":     ng_diBoolean(false, { Level: 'optional' }),
            "dragdown":   ng_diBoolean(false, { Level: 'optional' }),
            "hold":       ng_diBoolean(false, { Level: 'advanced' }),
            "release":    ng_diBoolean(false, { Level: 'advanced' }),
            "swipe":      ng_diBoolean(false, { Level: 'advanced' }),
            "swipeleft":  ng_diBoolean(false, { Level: 'optional' }),
            "swiperight": ng_diBoolean(false, { Level: 'optional' }),
            "swipeup":    ng_diBoolean(false, { Level: 'optional' }),
            "swipedown":  ng_diBoolean(false, { Level: 'optional' }),
            "tap":        ng_diBoolean(false, { Level: 'advanced' }),
            "doubletap":  ng_diBoolean(false, { Level: 'advanced' }),
            "touch":      ng_diBoolean(false, { Level: 'advanced' }),
            "transform":  ng_diBoolean(false, { Level: 'optional' }),
            "pinch":      ng_diBoolean(false, { Level: 'optional' }),
            "pinchin":    ng_diBoolean(false, { Level: 'optional' }),
            "pinchout":   ng_diBoolean(false, { Level: 'optional' }),
            "rotate":     ng_diBoolean(false, { Level: 'optional' })
          }, { Level: 'advanced' }, { DestroyIfEmpty: true }),
          "ngText": ng_diString('', { DisplayName: 'Text Resource (ngText)', Level: 'optional' }, { Editor: 'ngfeEditor_Lang' }),
          "ngTextD": ng_diString('', { DisplayName: 'Text Resource (ngTextD)', Level: 'optional' }, { Editor: 'ngfeEditor_Lang' }),
          "ngAlt": ng_diString('', { DisplayName: 'Alt Resource (ngAlt)', Level: 'optional' }, { Editor: 'ngfeEditor_Lang' }),
          "ngAltD": ng_diString('', { DisplayName: 'Alt Resource (ngAltD)', Level: 'optional' }, { Editor: 'ngfeEditor_Lang' }),
          "ngHint": ng_diString('', { DisplayName: 'Hint Resource (ngHint)', Level: 'optional' }, { Editor: 'ngfeEditor_Lang' }),
          "ngHintD": ng_diString('', { DisplayName: 'Hint Resource (ngHintD)', Level: 'optional' }, { Editor: 'ngfeEditor_Lang' })
        }),
        "Events": ng_diObject({
          "OnSetVisible": ng_diEvent('function(c, v) { return true; }', { Level: 'advanced' }),
          "OnVisibleChanged": ng_diEvent('function(c) {}', { Level: 'basic' }, { Level: 'advanced' }),
          "OnUpdate": ng_diEvent('function(c) { return true; }', { Level: 'advanced' }),
          "OnUpdated": ng_diEvent('function(c, elm) {}', { Level: 'advanced' }),
          "OnUpdateLater": ng_diEvent('function(c, s) {}', { Level: 'advanced' }),
          "OnMouseEnter": ng_diEvent('function(c) {}', { Level: 'advanced' }),
          "OnMouseLeave": ng_diEvent('function(c) {}', { Level: 'advanced' }),
          "OnIsInsidePopup": ng_diEvent('function(c, target, intype, e) { return false; }', { Level: 'advanced' }),
          "OnClickOutside": ng_diEvent('function(c, pi) { return false; }', { Level: 'advanced' }),
          "OnPointerDown": ng_diEvent('function(c, pi) { return true; }', { Level: 'advanced' }),
          "OnPointerUp": ng_diEvent('function(c, pi) { return true; }', { Level: 'advanced' }),
          "OnPtrStart": ng_diEvent('function(c, pi) {}', { Level: 'advanced' }),
          "OnPtrEnd": ng_diEvent('function(c, pi) {}', { Level: 'advanced' }),
          "OnGesture": ng_diEvent('function(c, pi) { return true; }', { Level: 'advanced' }),
          "OnPtrDrag": ng_diEvent('function(c, pi) { return true; }', { Level: 'advanced' })
        }),

        "Methods": ng_diObject({
          "DoMouseEnter": ng_diFunction('function(e, mi, elm) { ng_CallParent(this, "DoMouseEnter", arguments); }', { Level: 'optional' }),
          "DoMouseLeave": ng_diFunction('function(e, mi, elm) { ng_CallParent(this, "DoMouseLeave", arguments); }', { Level: 'optional' }),
          "DoClickOutside": ng_diFunction('function(pi) { return ng_CallParent(this, "DoClickOutside", arguments, false); }', { Level: 'optional' }),
          "IsInsidePopup": ng_diFunction('function(target, intype, e) { return ng_CallParent(this, "IsInsidePopup", arguments, false); }', { Level: 'optional' }),

          "DoAcceptGestures": ng_diFunction('function(elm, gestures) { ng_CallParent(this, "DoAcceptGestures", arguments); }', { Level: 'advanced' }),

          "DoAcceptPtrGestures": ng_diFunction('function(elm, eid, gestures, ev) { ng_CallParent(this, "DoAcceptPtrGestures", arguments); }', { Level: 'optional' }),
          "DoGetPtrOptions": ng_diFunction('function(eid, opts) { ng_CallParent(this, "DoGetPtrOptions", arguments); }', { Level: 'optional' }),

          "DoUpdate": ng_diFunction('function(elm) { return ng_CallParent(this, "DoUpdate", arguments, false); }', { Level: 'advanced' }),
          "DoAttach": ng_diFunction('function(elm, elmid) { ng_CallParent(this, "DoAttach", arguments); }', { Level: 'advanced' }),
          "DoRelease": ng_diFunction('function(elm) { ng_CallParent(this, "DoRelease", arguments); }', { Level: 'advanced' }),
          "DoSetVisible": ng_diFunction('function(elm, v) { ng_CallParent(this, "DoSetVisible", arguments); }', { Level: 'advanced' }),
          "DoResize": ng_diFunction('function(elm) { return ng_CallParent(this, "DoResize", arguments, 0); }', { Level: 'advanced' }),

          "SetVisible": ng_diFunction('function(v) { ng_CallParent(this, "SetVisible", arguments); }', { Level: 'optional' }),
          "SetFocus": ng_diFunction('function(state) { ng_CallParent(this, "SetFocus", arguments); }', { Level: 'optional' }),
          "SetBounds": ng_diFunction('function(props) { return ng_CallParent(this, "SetBounds", arguments, false); }', { Level: 'optional' }),
          "UpdateBounds": ng_diFunction('function(props, recursive) { return ng_CallParent(this, "UpdateBounds", arguments, false); }', { Level: 'optional' }),
          "SetScrollBars": ng_diFunction('function(v) { ng_CallParent(this, "SetScrollBars", arguments); }', { Level: 'optional' }),
          "SetPopup": ng_diFunction('function(p) { ng_CallParent(this, "SetPopup", arguments); }', { Level: 'optional' }),
          "SetOpacity": ng_diFunction('function(v) { ng_CallParent(this, "SetOpacity", arguments); }', { Level: 'optional' }),
          "Align": ng_diFunction('function(o) { return ng_CallParent(this, "Align", arguments, 0); }', { Level: 'optional' }),
          "Attach": ng_diFunction('function(o) { ng_CallParent(this, "Attach", arguments); }', { Level: 'optional' }),
          "Release": ng_diFunction('function() { ng_CallParent(this, "Release", arguments); }', { Level: 'optional' }),
          "Update": ng_diFunction('function(recursive) { ng_CallParent(this, "Update", arguments); }', { Level: 'optional' }),
          "UpdateLater": ng_diFunction('function(s) { ng_CallParent(this, "UpdateLater", arguments); }', { Level: 'optional' }),
          "UpdateChildren": ng_diFunction('function(recursive) { ng_CallParent(this, "UpdateChildren", arguments); }', { Level: 'optional' }),

          "DoPointerDown": ng_diFunction('function(pi) { return ng_CallParent(this, "DoPointerDown", arguments, true); }', { Level: 'advanced' }),
          "DoPtrStart": ng_diFunction('function(pi) { ng_CallParent(this, "DoPtrStart", arguments); }', { Level: 'advanced' }),
          "DoPtrEnd": ng_diFunction('function(pi) { ng_CallParent(this, "DoPtrEnd", arguments); }', { Level: 'advanced' }),
          "DoPtrDrag": ng_diFunction('function(pi) { return ng_CallParent(this, "DoPtrDrag", arguments, false); }', { Level: 'advanced' }),
          "DoPtrClick": ng_diFunction('function(pi) { ng_CallParent(this, "DoPtrClick", arguments); }', { Level: 'advanced' }),
          "DoPtrDblClick": ng_diFunction('function(pi) { ng_CallParent(this, "DoPtrDblClick", arguments); }', { Level: 'advanced' })
        })
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
})();


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
      var cdi=c.DesignInfo;
      var di = {};

      if(c.GetText===ngc_GetText) {
        ng_MergeVar(cdi.Properties, {
          "Data": ng_diObject({
            "DesignText": ng_diString('', { Level: 'basic' })
          })
        });
      }

      // define common DesignInfo
      var events = (cdi && cdi.Properties && cdi.Properties.Events) ? cdi.Properties.Events : {},
          eventstype = [{ id: 'Before', order: 0.91 }, { id: 'After', order: 0.93 }, { id: 'Override', order: 0.94 }],
          id;
      di.Properties = ngNullVal(di.Properties, {});
      for (var i = 0; i < eventstype.length; i++)
      {
        id = eventstype[i].id + 'Events';
        di.Properties[id] = ngNullVal(cdi.Properties[id], {});
        ng_MergeDI(di.Properties[id], events);
        di.Properties[id].Order = eventstype[i].order;
      }
      return di;
    }
  },
  OnInit: function() {
    if(!ngDESIGNINFO) return;

    ngc_GetText=ng_OverrideFunction(ngc_GetText, function() {
      if((this.InDesignMode)&&(ngVal(this.DesignText,'')!=='')) return this.DesignText;
      return ngc_GetText.callParent.apply(this,arguments);
    });

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