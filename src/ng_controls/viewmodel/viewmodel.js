/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2014 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */

/*
TODO:
- ngDataSet
  - special types rendering (checkboxes, ...)
- db struct generator

- ngCalendar selected
- two stage insert and update (sessions) and command repeat on timeout
- file(s) upload
*/

var ngViewModels = new Array();

var ngViewModelNamespaces = new Array();

var fdNoTrim=0;
var fdTrim=1;
var fdLeftTrim=2;
var fdRightTrim=3;        

/**
 *  Function: getViewModelById
 *  Get ViewModel instance by its ID.
 *  
 *  Syntax: object *getViewModelById* (string id)
 *  
 *  Returns: 
 *  ViewModel instance or null if viewmodel not found.        
 */
function getViewModelById(id)
{
  return ngVal(ngViewModels[id],null);
}

function ngvm_setnsfields(scriptid,nsfields)
{
  if(!nsfields) return;
  var v,nsf,sid=NaN;
  if(scriptid.substring(0,2)=='VM') sid=parseInt(scriptid.substring(2,scriptid.length));
  for(var i in nsfields)
  {
    nsf=nsfields[i];
    v=ngViewModelNamespaces[i];
    if(typeof v==='object') ng_MergeVar(nsf,v);
    if(!isNaN(sid)) nsf.ServerURLIndex=sid;
    ngViewModelNamespaces[i]=nsf;
  }
}

/**
 *  Function: ng_ViewModelFormatError
 *  Formats ViewModel error object to one or more text messages.
 *  
 *  Syntax: array *ng_ViewModelFormatError* (object error)
 *  
 *  Parameters:
 *    error - ViewModel error object (<ngFieldDefException> or array of <ngFieldDefException>s)
 *        
 *  Returns: 
 *  Array of formated string messages.        
 */
function ng_ViewModelFormatError(err)
{
  if(!ng_typeObject(err)) return '';
  
  if(!(err instanceof ngFieldDefException))
  {
    var emsg,m,dn,msg=new Array();
    for(var i in err)
    {
      if(err[i] instanceof ngFieldDefException)
      {        
        emsg=ng_ViewModelFormatError(err[i]);
        if(emsg==='') continue;

        if(ngIsFieldDef(err[i].FieldDef)) 
        {
          dn=ng_Trim(err[i].FieldDef.GetDisplayName());
          if(dn.length>0)
          {
            if(dn.charAt(dn.length-1)!=':') dn+=': ';
            else dn+=' ';
          }
        }
        else 
        {
          if(ng_typeString(err[i].FieldDef)) dn=err[i].FieldDef+': ';
          else dn='';
        }        
        if(ng_typeString(emsg)) 
        {
          m=dn+emsg;
          if(!ng_inArray(m,msg)) msg.push(m);
        }
        if(ng_typeObject(emsg))
        {
          for(var j in emsg)
          {
            m=dn+emsg[j];
            if(!ng_inArray(m,msg)) msg.push(m);
          }
        }
      }    
    }
    return msg;
  }
  
  var msg;
  var isfielddef=ngIsFieldDef(err.FieldDef);
  if((isfielddef)&&(!err.FieldDef.__formatingerror))
  {
    err.FieldDef.__formatingerror=true;
    try
    {
      msg=err.FieldDef.FormatError(err);
    }
    finally
    {
      delete err.FieldDef.__formatingerror;
    }
    if(!ng_isEmpty(msg)) return msg;
  }
  msg=new Array();
  
  if(ng_typeObject(err.ErrorMessage))
  {
    for(var i in err.ErrorMessage)
      msg.push(ngTxt(err.ErrorMessage[i]));
  }
  else if(err.ErrorMessage!='') msg.push(ngTxt(err.ErrorMessage));

  if(err.Error & FIELDDEF_ERR_TYPE)
  {  
    if(isfielddef)
    {
      switch(err.FieldDef.Type)
      {
        case 'BOOL':          msg.push(ngTxt('viewmodel_err_type_bool')); break;
        case 'SBYTE':         
        case 'BYTE':          
        case 'SHORT':         
        case 'USHORT':        
        case 'LONG':          
        case 'ULONG':         
        case 'INTEGER':       msg.push(ngTxt('viewmodel_err_type_integer')); break;
        case 'FLOAT':         
        case 'DECIMAL':       msg.push(ngTxt('viewmodel_err_type_decimal')); break;
        case 'NVARCHAR':       
        case 'STRING':        msg.push(ngTxt('viewmodel_err_type_string')); break;
        case 'TIMESTAMP':
        case 'DATETIME':      
        case 'UTCTIMESTAMP':
        case 'UTCDATETIME':   msg.push(ngTxt('viewmodel_err_type_datetime')); break;
        case 'DATE':          
        case 'UTCDATE':       msg.push(ngTxt('viewmodel_err_type_date')); break;
        case 'TIME':          
        case 'UTCTIME':       msg.push(ngTxt('viewmodel_err_type_time')); break;
        case 'ARRAY':         msg.push(ngTxt('viewmodel_err_type_array')); break;
        default:              msg.push(ngTxt('viewmodel_err_type')); break;
      }
    } 
    else msg.push(ngTxt('viewmodel_err_type'));
  }

  if(err.Error & FIELDDEF_ERR_EMPTY)
    msg.push(ngTxt('viewmodel_err_empty'));

  if(err.Error & FIELDDEF_ERR_MIN)
  {
    if((!isfielddef)||(ng_isEmpty(err.FieldDef.MinValue)))
      msg.push(ngTxt('viewmodel_err_min_novalue'));
    else
    {
      if(err.FieldDef.Type=='ARRAY')
        msg.push(ng_sprintf(ngTxt('viewmodel_err_min_array'),parseInt(err.FieldDef.MinValue,10)));
      else
        msg.push(ng_sprintf(ngTxt('viewmodel_err_min'),ng_toString(err.FieldDef.MinValue)));
    }
  }

  if(err.Error & FIELDDEF_ERR_MAX)
  {
    if((!isfielddef)||(ng_isEmpty(err.FieldDef.MaxValue)))
      msg.push(ngTxt('viewmodel_err_max_novalue'));
    else
    {
      if(err.FieldDef.Type=='ARRAY')
        msg.push(ng_sprintf(ngTxt('viewmodel_err_max_array'),parseInt(err.FieldDef.MaxValue,10)));
      else
        msg.push(ng_sprintf(ngTxt('viewmodel_err_max'),ng_toString(err.FieldDef.MaxValue)));
    }
  }

  if(err.Error & FIELDDEF_ERR_ENUM)
    msg.push(ngTxt('viewmodel_err_enum'));

  if(err.Error & FIELDDEF_ERR_LEN)
  {
    if((!isfielddef)||(ng_isEmpty(err.FieldDef.Size)))
      msg.push(ngTxt('viewmodel_err_len_unknown'));
    else
      msg.push(ng_sprintf(ngTxt('viewmodel_err_len'),err.FieldDef.Size));
  }

  if(msg.length==0) return '';
  if(msg.length==1) return msg[0];
  return msg;
}


/**
 *  Class: ngFieldDefException
 *  This class implements <ngFieldDef> type exception. 
 */
var FIELDDEF_ERR       = 1;
var FIELDDEF_ERR_TYPE  = 2;
var FIELDDEF_ERR_EMPTY = 4;
var FIELDDEF_ERR_MIN   = 8;
var FIELDDEF_ERR_MAX   = 16;
var FIELDDEF_ERR_ENUM  = 32;
var FIELDDEF_ERR_LEN   = 64;

function ngFieldDefException(fd, err, msg, extinfo, childerrors)
{
  /*
   *  Group: Properties
   */

  /*  Variable: FieldDef
   *  Related ngFieldDef object.
   *  Type: object
   */
  this.FieldDef = fd;
  
  /*  Variable: Error
   *  Exception error type flags.
   *  Type: object
   *     
   *  Constants:
   *    FIELDDEF_ERR - unspecified error 
   *    FIELDDEF_ERR_TYPE - type conversion exception 
   *    FIELDDEF_ERR_EMPTY - field is empty 
   *    FIELDDEF_ERR_MIN - value is lower than minimal allowed 
   *    FIELDDEF_ERR_MAX - value is lower than maximum allowed                                     
   *    FIELDDEF_ERR_ENUM - value is not one of allowed
   *    FIELDDEF_ERR_LEN - length of value exceeds allowed 
   */        
  this.Error = err;

  /*  Variable: ErrorMessage
   *  Exception error message (optional).
   *  Type: string
   */
  this.ErrorMessage = ngVal(msg,'');
  
  /*  Variable: ExtendedInfo
   *  Exception extended error information (optional).
   *  Type: mixed
   */
  this.ExtendedInfo = ngVal(extinfo, null);

  /*  Variable: ChildErrors
   *  Exception raised by children.
   *  Type: object
   */
  this.ChildErrors = ngVal(childerrors,null);

  // Set parent to child errors
  if(ng_typeObject(this.ChildErrors)) {
    for(var i in this.ChildErrors)
      this.ChildErrors[i].Parent=this;
  }
}


function ngfd_Clear()
{
  var undefined;
  if(ko.isObservable(this.Value)) this.Value(undefined);
  else this.Value=undefined;
}

function ngfd_Validate(v)
{
  try
  {
    this.Serialize(v);
  }
  catch(e)
  {
    return e;
  }
  return true;
}

function ngfd_FormatError(err)
{
  if(this.OnFormatError) 
  {
    var msg=this.OnFormatError(this, err);
    if(!ng_isEmpty(msg)) return msg;
  }
  return this.DoFormatError(err);
}

function ngfd_DoFormatError(err)
{
  return ng_ViewModelFormatError(err);
}

function ngfd_GetDisplayName(substid)
{
  var dn=(ko.isObservable(this.DisplayName) ? this.DisplayName() : this.DisplayName);
  if((ng_isEmptyOrNull(dn))&&(ngVal(substid,true))) dn=ngVal(this.ID,'');
  return dn;
}

function ngfd_GetTypedDefaultValue()
{
  try   
  {
    return this.TypedValue(this.DefaultValue);
  }
  catch(e)
  {
    return ng_CopyVar(this.DefaultValue);
  }
}

function ngfd_GetTypedValue()
{
  var v;
  if(ko.isObservable(this.Value)) v=this.Value();
  else v=this.Value;
  return this.TypedValue(v);
}

function ngfd_TypedValue(v)
{
  if(this.__typingvalue) return v;
  this.__typingvalue=true;
  try
  {
    if(ng_typeString(v)) v=this.ParseString(v);
  
    var err=0;
    if(this.OnTypedValue) 
    {
      try
      {
        var val=this.OnTypedValue(this, v);
        if(!ng_isEmpty(val)) return val;
      }
      catch(e)
      {
        if(e instanceof ngFieldDefException)
          err=e.Error;
        else 
          throw e;
      }
    }
    
    var origv=v;
    if(this.DoTypedValue) v=this.DoTypedValue(v); 
  
    if((this.NullIfEmpty)&&
      ((ng_isEmpty(v))
     ||((ng_typeString(v))&&(v.length==0))
     ||((ng_typeDate(v))&&(v.getTime()===0))
     ||((ng_typeArray(v))&&(v.length==0))))
      v=null;
  
    if(ng_isEmptyOrNull(v)) 
    {
      if(this.Required) throw new ngFieldDefException(this, err|FIELDDEF_ERR_EMPTY); // required
      return v;
    }
    
    function cast_numberwithlimit(fd,v,min,max)
    {
      v=parseInt(v,10);
      if(!ng_typeNumberInt(v)) return null;
      if((ng_isEmpty(fd.MinValue))||(parseInt(fd.MinValue,10)<min)) fd.MinValue=min; 
      if((ng_isEmpty(fd.MaxValue))||(parseInt(fd.MaxValue,10)>max)) fd.MaxValue=max;
      return v;     
    }
  
    var r=null;  
    switch(this.DataType) 
    {
      // boolean
      case 'BOOL':          r=ng_toBool(v,null); break;
      // numeric
      case 'INTEGER':       r=ng_toInteger(v,null); break;
      case 'FLOAT':         r=ng_toFloat(v,null); break;
      case 'SBYTE':         r=cast_numberwithlimit(this,v,SBYTE_MIN,SBYTE_MAX); break;
      case 'BYTE':          r=cast_numberwithlimit(this,v,BYTE_MIN,BYTE_MAX); break;
      case 'SHORT':         r=cast_numberwithlimit(this,v,SHORT_MIN,SHORT_MAX); break;
      case 'USHORT':        r=cast_numberwithlimit(this,v,USHORT_MIN,USHORT_MAX); break;
      case 'LONG':          r=cast_numberwithlimit(this,v,LONG_MIN,LONG_MAX); break;
      case 'ULONG':         r=cast_numberwithlimit(this,v,ULONG_MIN,ULONG_MAX); break;
      case 'DECIMAL':       r=ng_toDECIMAL(v,this.Size,this.Precision,null); break;
      // string
      case 'STRING':        r=ng_toString(v,null); break;
      case 'NVARCHAR':      r=ng_toNVARCHAR(v,undefined,null); 
                            if((r!==null)&&(!ng_isEmpty(this.Size))&&(r.length>this.Size))
                              throw new ngFieldDefException(this, err|FIELDDEF_ERR_LEN);
                            break;
      // date
      case 'TIMESTAMP':
      case 'DATETIME':      r=ng_toDate(v,null); break;
      case 'DATE':          r=ng_toDateOnly(v,null); break;
      case 'TIME':          r=ng_toDate(v,null); break;
      case 'UTCTIMESTAMP':
      case 'UTCDATETIME':   r=ng_toDate(v,null); break;
      case 'UTCDATE':       r=ng_toDateOnly(v,null); break;
      case 'UTCTIME':       r=ng_toDate(v,null); break;
      // array
      case 'ARRAY':         if(ng_typeArray(v)) r=(origv===v ? ng_CopyVar(v) : v);
                            else
                            {
                              r=new Array();
                              r.push(v);
                            }
                            break;
      case 'OBJECT':        r=(typeof v==='object' ? (origv===v ? ng_CopyVar(v) : v) : null); break;
      default:              r=(origv===v ? ng_CopyVar(v) : v); break;
    }
    if(r===null)
      throw new ngFieldDefException(this, err|FIELDDEF_ERR_TYPE); // type error
  
    // Test value limits
    var c=r;
    var typefnc=null;
    var checkminmax=true;
    switch(this.DataType) 
    {
      case 'BOOL':
        typefnc=ng_toBool;
        break;
      case 'INTEGER':
      case 'FLOAT':
      case 'SBYTE':
      case 'BYTE':
      case 'SHORT':
      case 'USHORT':
      case 'LONG':
      case 'ULONG':
        typefnc=ng_toNumber;
        c=typefnc(r);
        break;
      case 'DECIMAL':
        checkminmax=false;
        c=r;
        if((!ng_isEmpty(this.MinValue))&&(ng_toNumber(c)<ng_toNumber(this.MinValue))) err|=FIELDDEF_ERR_MIN;
        if((!ng_isEmpty(this.MaxValue))&&(ng_toNumber(c)>ng_toNumber(this.MaxValue))) err|=FIELDDEF_ERR_MAX;

        typefnc=null;        
        break;
      case 'STRING':
      case 'NVARCHAR':
        typefnc=ng_toString;
        if((this.Required)&&(!this.AllowEmpty)&&(c.length==0)) throw new ngFieldDefException(this, err|FIELDDEF_ERR_EMPTY); // required
        break;
      case 'TIMESTAMP':
      case 'DATETIME':
        typefnc=ng_toDate;
        if((this.Required)&&(!this.AllowEmpty)&&(c.getTime()==0)) throw new ngFieldDefException(this, err|FIELDDEF_ERR_EMPTY); // required
        break;
      case 'DATE':
        typefnc=ng_toDateOnly;
        if((this.Required)&&(!this.AllowEmpty)&&(c.getTime()==0)) throw new ngFieldDefException(this, err|FIELDDEF_ERR_EMPTY); // required
        break;
      case 'TIME':          
        typefnc=ng_toDate;
        if((this.Required)&&(!this.AllowEmpty)&&(c.getTime()==0)) throw new ngFieldDefException(this, err|FIELDDEF_ERR_EMPTY); // required
        break;
      case 'UTCTIMESTAMP':
      case 'UTCDATETIME':
        typefnc=ng_toDate;
        if((this.Required)&&(!this.AllowEmpty)&&(c.getTime()==0)) throw new ngFieldDefException(this, err|FIELDDEF_ERR_EMPTY); // required
        break;
      case 'UTCDATE':
        typefnc=ng_toDateOnly;
        if((this.Required)&&(!this.AllowEmpty)&&(c.getTime()==0)) throw new ngFieldDefException(this, err|FIELDDEF_ERR_EMPTY); // required
        break;
      case 'UTCTIME':       
        typefnc=ng_toDate;
        if((this.Required)&&(!this.AllowEmpty)&&(c.getTime()==0)) throw new ngFieldDefException(this, err|FIELDDEF_ERR_EMPTY); // required
        break;
      case 'ARRAY':
        typefnc=null;
        if((this.Required)&&(!this.AllowEmpty)&&(c.length==0)) throw new ngFieldDefException(this, err|FIELDDEF_ERR_EMPTY); // required
  
        checkminmax=false;
        if((!ng_isEmpty(this.MinValue))&&(c.length<parseInt(this.MinValue,10))) err|=FIELDDEF_ERR_MIN;
        if((!ng_isEmpty(this.MaxValue))&&(c.length>parseInt(this.MaxValue,10))) err|=FIELDDEF_ERR_MAX;
  
        typefnc=function(n) { return n; };
        break;      
      case 'OBJECT':
        typefnc=function(n) { return n; };
        checkminmax=false;
        break;        
      default:
        typefnc=function(n) { return n; };
        c=r;               
        break;
    }
    if(typefnc!==null)
    {
      if(checkminmax)
      {
        if((!ng_isEmpty(this.MinValue))&&(c<typefnc(this.MinValue))) err|=FIELDDEF_ERR_MIN;
        if((!ng_isEmpty(this.MaxValue))&&(c>typefnc(this.MaxValue))) err|=FIELDDEF_ERR_MAX;
      }
      if(!ng_isEmpty(this.Enum))
      {
        var i;
        for(i=0;i<this.Enum.length;i++)
          if(ng_VarEquals(c,typefnc(this.Enum[i]))) break;
        if(i>=this.Enum.length) err|=FIELDDEF_ERR_ENUM;
      }
      if(err) throw new ngFieldDefException(this, err);
    }
  }
  finally
  {
    delete this.__typingvalue;
  }
  return r;
}

function ngfd_TypedValueAs(v,field)
{
  if(!field) return v;
  try {
    v=field.TypedValue(v);
  }
  catch(e)
  {
    if(e.FieldDef==field) e.FieldDef=this;
    throw e;
  }   
  return v;   
}

function ngfd_Serialize(v)
{
  var r;

  if(this.OnSerialize) r=this.OnSerialize(this,v);  
  if((ng_isEmpty(r))&&(this.DoSerialize)) r=this.DoSerialize(v);
  if(ng_isEmpty(r)) r=this.TypedValue(v);
  if(((this.DataType=='ULONG')||(this.DataType=='INTEGER'))&&(!ng_isEmpty(r))) r=ng_toString(r); // PHP doesn't support unsigned longs and JavaScript big integers, pass it as string
  return r;
}

function ngfd_Deserialize(v)
{
  var r;
  if(this.OnDeserialize) r=this.OnDeserialize(this,v);
  if((ng_isEmpty(r))&&(this.DoDeserialize)) r=this.DoDeserialize(v);
  if(ng_isEmpty(r)) r=v; 
  switch(this.DataType) 
  {
    case 'TIMESTAMP':
    case 'DATETIME':
    case 'DATE':
    case 'TIME':
    case 'UTCTIMESTAMP':
    case 'UTCDATETIME':
    case 'UTCDATE':
    case 'UTCTIME':          
      r=ng_toDate(r,r);
      break;                   
  }
  try   
  {
    r=this.TypedValue(r);
  }
  catch(e)
  {
  }
  return r;  
}

function ngfd_FormatString(v)
{
  if(this.__formatingstring) return v;
  this.__formatingstring=true;
  try
  {  
    try   
    {
      v=this.TypedValue(v);
    }
    catch(e)
    {
    }   
    var s;
    if(this.OnFormatString) s=this.OnFormatString(this,v);
    if(ng_typeString(s)) return s; 
    if(this.DoFormatString) s=this.DoFormatString(v);  
    if(ng_typeString(s)) return s;
    var r=null;
    switch(this.DataType)
    {
      case 'DATE':          
        r=ng_FormatDate(ng_toDate(v),'',null);
        break;
      case 'TIME':          
        r=ng_FormatTime(ng_toDate(v),'',null);
        break;
      case 'UTCTIMESTAMP':
      case 'UTCDATETIME':
        r=ng_FormatDateTime(ng_fromUTCDate(v),'',null);
        break;
      case 'UTCDATE':       
        r=ng_FormatDate(ng_fromUTCDate(v),'',null);
        break;
      case 'UTCTIME':       
        r=ng_FormatTime(ng_fromUTCDate(v),'',null);
        break;
      case 'ARRAY':
        if((v)&&(typeof v==='object')&&(typeof v.join==='function'))
          r=v.join(',');
        else
          r=null;
        break;
    }
    if(r!==null) v=r;
    else v=ng_toString(v);
  }
  finally
  {
    delete this.__formatingstring;
  } 
  return v;
}

function ngfd_EditString(v)
{
  var s;
  if(this.OnEditString) s=this.OnEditString(this,v);
  if(ng_typeString(s)) return s; 
  if(this.DoEditString) s=this.DoEditString(v);  
  if(ng_typeString(s)) return s;
  return this.FormatString(v);
}

function ngfd_ParseString(v)
{
  if(this.__parsingstring) return v;
  this.__parsingstring=true;
  try
  {  
    v=''+v;
    var trim=ngVal(this.AutoTrim,1);
    switch(trim)
    {
      case 1: v=ng_Trim(v); break;
      case 2: v=ng_LTrim(v); break;
      case 3: v=ng_RTrim(v); break;
    }
    if(this.OnParseString) v=this.OnParseString(this,v);
    if(this.DoParseString) v=this.DoParseString(v);
    if(ng_typeString(v)) 
    {
      if((this.NullIfEmpty)&&(v.length==0)) v=null;
      else
      {    
        switch(this.DataType)
        {
          case 'DATE':          
            var r=ng_ParseDate(v,'',null);
            if(r!==null) v=r;
            break;
          case 'TIME':          
            var r=ng_ParseTime(v,'',null);
            if(r!==null) v=r;
            break;
          case 'UTCTIMESTAMP':
          case 'UTCDATETIME':
            var r=ng_ParseDateTime(v,'',null);          
            if(r!==null) v=ng_toUTCDate(r);
            break;
          case 'UTCDATE':       
            var r=ng_ParseDate(v,'',null);
            if(r!==null) v=ng_toUTCDate(r);
            break;
          case 'UTCTIME':       
            var r=ng_ParseTime(v,'',null);
            if(r!==null) v=ng_toUTCDate(r);
            break;
          case 'ARRAY':
            r=v.split(','); 
            break;
        }
      }
    }
    try   
    {
      v=this.TypedValue(v);
    }
    catch(e)
    {
    }
  }
  finally
  {
    delete this.__parsingstring;
  }   
  return v;
}

function ngfd_SetAttribute(attr,val)
{
  switch(attr)
  {
    case 'PrivateField': this.PrivateField=val; break;
    case 'DisplayName':  this.DisplayName=val; break;
    case 'Size':         this.Size=val; break; 
    case 'Precision':    this.Precision=val; break;

    case 'Required':     this.Required=val; break;
    case 'NullIfEmpty':  this.NullIfEmpty=val; break;
    case 'AllowEmpty':   this.AllowEmpty=val; break;
    case 'AutoTrim':     this.AutoTrim=val; break;
    case 'ReadOnly':     this.ReadOnly=val; break;
    case 'MinValue':     this.MinValue=val; break;
    case 'MaxValue':     this.MaxValue=val; break;
    case 'Enum':         this.Enum=val; break;
    case 'DefaultValue': this.DefaultValue=val; break;
    default:             this.Attrs[attr]=val; break;
  }
}

function ngfd_GetAttribute(attr)
{
  switch(attr)
  {
    case 'PrivateField': return this.PrivateField;
    case 'DisplayName':  return this.DisplayName;
    case 'Size':         return this.Size; 
    case 'Precision':    return this.Precision;

    case 'Required':     return this.Required;
    case 'NullIfEmpty':  return this.NullIfEmpty;
    case 'AllowEmpty':   return this.AllowEmpty;
    case 'AutoTrim':     return this.AutoTrim;
    case 'ReadOnly':     return this.ReadOnly;
    case 'MinValue':     return this.MinValue;
    case 'MaxValue':     return this.MaxValue;
    case 'Enum':         return this.Enum;
    case 'DefaultValue': return this.DefaultValue;
    default:             return this.Attrs[attr];
  }
}

function ngFieldDefCreateAs(fd, id, type, attrs)
{
  try 
  {          
    if(typeof type==='function')
    {
      fd.__fielddef = type;
      var args=Array.prototype.slice.apply(arguments);
      args.splice(2,1);
      args.splice(0,1);
      fd.__fielddef.apply(fd,args)          
    }
    else
    {
      fd.__fielddef = ngFieldDef;
      fd.__fielddef(id, type, attrs);
    }
  } finally {
    delete fd.__fielddef;
  }
}

function ngIsFieldDef(v)
{
  return (ng_typeObject(v))&&(!ng_isEmpty(v.DataType))&&(typeof v.Validate === 'function')&&(typeof v.Serialize === 'function')&&(typeof v.Deserialize === 'function');
}

/**
 *  Class: ngFieldDef
 *  This class implements ViewModel field type description object.   
 */
function ngFieldDef(id, type, attrs)
{
  attrs=ngVal(attrs,{});
  
  /*
   *  Group: Properties
   */

  /*  Variable: Owner
   *  Owner (usualy <ngViewModel>) of <ngFieldDef>.
   *  Type: object
   */
  this.Owner    = null;
  /*  Variable: Parent
   *  Reference to parent ngFieldDef (if exists).
   *  Type: mixed
   */
  //this.Parent    = undefined;
  
  /*  Variable: ID
   *  Field identifier.   
   *  Type: string
   */
  this.ID       = ngVal(id,'');
  
  /*  Variable: Type
   *  Basic field type.   
   *  Type: string
   *
   *  Constants:
   *    'BOOL' - boolean type
   *    'INTEGER' - integer type
   *    'FLOAT' - float number type
   *    'SBYTE' - signed byte (-127..127)
   *    'BYTE' - unsigned byte (0..255)
   *    'SHORT' - signed short (-32767..32767)
   *    'USHORT' - unsigned short (0-65535)
   *    'LONG' - signed long (-2147483647..2147483647)
   *    'ULONG' - unsigned long (0..4294967295)
   *    'DECIMAL' - number with fixed decimal   
   *    'STRING' - string type 
   *    'NVARCHAR' - string type with limited length
   *    'TIMESTAMP' - date and time type 
   *    'DATETIME' - date and time type
   *    'DATE' - date only type
   *    'TIME' - time only type           
   *    'UTCTIMESTAMP' - date and time type (UTC)
   *    'UTCDATETIME' - date and time type (UTC) 
   *    'UTCDATE' - date only type (UTC) 
   *    'UTCTIME' - time only type (UTC)       
   *    'ARRAY' - array type
   */
  this.Type     = ngVal(this.Type, type);
  
  /*  Variable: DataType
   *  Field type identifier.   
   *  Type: string
   */
  this.DataType = ngVal(type,'');

  /*  Variable: PrivateField
   *  Determines if field is private. Private fields are never sent to server.   
   *  Type: boolean
   *  Default value: *false*   
   */
  this.PrivateField = false;
  
  /*  Variable: Attrs
   *  Field extended attributes.   
   *  Type: object
   *  Default value: *{}*
   */
  this.Attrs = {};

  /*  Variable: DisplayName
   *  Textual description of field.   
   *  Type: string
   *  Default value: *undefined*
   */
  // this.DisplayName=undefined;

  /*  Variable: Size
   *  Field size.   
   *  Type: integer
   *  Default value: *undefined*
   */
  // this.Size=undefined;
  
  /*  Variable: Precision
   *  Field precision.   
   *  Type: integer
   *  Default value: *undefined*
   */
  // this.Precision=undefined;

  /*  Variable: Required
   *  If TRUE, the value of field is required.   
   *  Type: boolean
   *  Default value: *false*
   */
  this.Required=false;

  /*  Variable: NullIfEmpty
   *  If TRUE, the empty value of field is considered as null.   
   *  Type: boolean
   *  Default value: *true*
   */
  this.NullIfEmpty=true;

  /*  Variable: AllowEmpty
   *  If TRUE, the empty values are accepted even if Required is TRUE
   *  Type: boolean
   *  Default value: *false*
   */
  this.AllowEmpty=false;

  /*  Variable: AutoTrim
   *  Type of automatic string trim.   
   *  Type: integer
   *  Default value: *fdTrim*
   *     
   *  Constants:
   *    fdNoTrim - don't trim    
   *    fdTrim - trim leading and trailing spaces
   *    fdLeftTrim - trim leading spaces
   *    fdRightTrim - trim trailing spaces        
   */
  // this.AutoTrim=undefined;

  /*  Variable: ReadOnly
   *  If TRUE, the value cannot be modified.   
   *  Type: string
   *  Default value: *undefined*
   */
  // this.ReadOnly=undefined;

  /*  Variable: MinValue
   *  Minimal allowed value.   
   *  Type: mixed
   *  Default value: *undefined*
   */
  // this.MinValue=undefined;

  /*  Variable: MaxValue
   *  Maximum allowed value.   
   *  Type: mixed
   *  Default value: *undefined*
   */
  // this.MaxValue=undefined;

  /*  Variable: Enum
   *  Enumeration of allowed values.   
   *  Type: array
   *  Default value: *undefined*
   */
  // this.Enum=undefined;

  /*  Variable: DefaultValue
   *  Default value of field.   
   *  Type: mixed
   *  Default value: *undefined*
   */
  // this.DefaultValue=undefined;

  /*  Variable: Value
   *  Value of field.   
   *  Type: mixed
   *  Default value: *undefined*
   */
  this.Value = undefined;

  /*
   *  Group: Methods
   */

  /*  Function: GetDisplayName
   *  Gets field DisplayName.   
   *   
   *  Syntax:
   *    string *GetDisplayName* ([bool substid=true])
   *     
   *  Parameters:
   *    substid - if TRUE, returns field ID if display name is not defined 
   *             
   *  Returns:
   *    The field display name.     
   */
  this.GetDisplayName = ngfd_GetDisplayName;

  /*  Function: GetTypedValue
   *  Gets field *typed* value.   
   *   
   *  Syntax:
   *    mixed *GetTypedValue* ()
   *     
   *  Returns:
   *    The field value.     
   */
  this.GetTypedValue = ngfd_GetTypedValue;

  /*  Function: GetTypedDefaultValue
   *  Gets field *typed* default value.   
   *   
   *  Syntax:
   *    mixed *GetTypedDefaultValue* ()
   *     
   *  Returns:
   *    The field default value.     
   */
  this.GetTypedDefaultValue = ngfd_GetTypedDefaultValue;

  /*  Function: GetAttribute
   *  Gets field attribute.   
   *   
   *  Syntax:
   *    mixed *GetAttribute* (string attr)
   *     
   *  Parameters:
   *    attr - attribute id
   *             
   *  Returns:
   *    The value of specified attribute.     
   */
  this.GetAttribute = ngfd_GetAttribute;

  /*  Function: SetAttribute
   *  Sets field attribute.   
   *   
   *  Syntax:
   *    void *SetAttribute* (string attr, mixed value)
   *     
   *  Parameters:
   *    attr - attribute id
   *    value - attribute value   
   *             
   *  Returns:
   *    -     
   */
  this.SetAttribute = ngfd_SetAttribute;

  /*  Function: TypedValue
   *  Converts given value according to field type.   
   *   
   *  Syntax:
   *    mixed *TypedValue* (mixed value)
   *     
   *  Parameters:
   *    value - value to convert   
   *             
   *  Returns:
   *    Converted value or throws <ngFieldDefException> if convert fails.      
   */
  this.TypedValue = ngfd_TypedValue;

  /*  Function: TypedValueAs
   *  Converts given value according to external field type.   
   *   
   *  Syntax:
   *    mixed *TypedValueAs* (mixed value, ngFieldDef field)
   *     
   *  Parameters:
   *    value - value to convert
   *    field - field to which type value should be converted       
   *             
   *  Returns:
   *    Converted value or throws <ngFieldDefException> if convert fails. 
   *    Thrown exception has reference to this field, not external.       
   */
  this.TypedValueAs = ngfd_TypedValueAs;
  
  /*  Function: Clear
   *  Sets field value to undefined.   
   *   
   *  Syntax:
   *    void *Clear* (void)
   *     
   *  Returns:
   *    -     
   */   
  this.Clear = ngfd_Clear;
  
  /*  Function: Validate
   *  Validates if given value can be converted according to field type.   
   *   
   *  Syntax:
   *    mixed *Validate* (mixed value)
   *     
   *  Parameters:
   *    value - value to test   
   *             
   *  Returns:
   *    TRUE if value can be converted or <ngFieldDefException> object with description of conversion failure.     
   */   
  this.Validate    = ngfd_Validate;
  
  /*  Function: FormatError
   *  Formats ViewModel error object to one or more text messages.
   *   
   *  Syntax:
   *    array *FormatError* (object error)
   *     
   *  Parameters:
   *    error - ViewModel error object (<ngFieldDefException> or array of <ngFieldDefException>s)   
   *             
   *  Returns: 
   *  Array of formated string messages.        
   */
  this.FormatError = ngfd_FormatError;

  this.DoFormatError = ngfd_DoFormatError;  
  
  /*  Function: Serialize
   *  Exports (and converts) given value from ViewModel.      
   *   
   *  Syntax:
   *    mixed *Serialize* (mixed value)
   *     
   *  Parameters:
   *    value - value to serialize   
   *             
   *  Returns:
   *    Exported value or throws <ngFieldDefException> if convert fails.      
   */   
  this.Serialize   = ngfd_Serialize;
  
  /*  Function: Deserialize
   *  Imports (and converts) given value to ViewModel.      
   *   
   *  Syntax:
   *    mixed *Deserialize* (mixed value)
   *     
   *  Parameters:
   *    value - value to deserialize   
   *             
   *  Returns:
   *    Imported value or throws <ngFieldDefException> if convert fails.      
   */   
  this.Deserialize = ngfd_Deserialize;

  /*  Function: FormatString
   *  Converts given value to string according to field type.      
   *   
   *  Syntax:
   *    string *FormatString* (mixed value)
   *     
   *  Parameters:
   *    value - value to convert   
   *             
   *  Returns:
   *    String value.      
   */   
  this.FormatString = ngfd_FormatString;

  /*  Function: EditString
   *  Converts given value to string suitable for editation according to field type.      
   *   
   *  Syntax:
   *    string *EditString* (mixed value)
   *     
   *  Parameters:
   *    value - value to convert   
   *             
   *  Returns:
   *    String value for edit.      
   */   
  this.EditString = ngfd_EditString;
  
  /*  Function: ParseString
   *  Converts given string value to value according to field type.      
   *   
   *  Syntax:
   *    mixed *ParseString* (string str)
   *     
   *  Parameters:
   *    str - string value    
   *             
   *  Returns:
   *    Value according to field type.      
   */   
  this.ParseString  = ngfd_ParseString;

  /*
   *  Group: Events
   */

  /*
   *  Event: OnFormatError
   */   
  this.OnFormatError = null;  
  /*
   *  Event: OnSerialize
   */   
  this.OnSerialize   = null;
  /*
   *  Event: OnDeserialize
   */   
  this.OnDeserialize = null;
  /*
   *  Event: OnTypedValue
   */   
  this.OnTypedValue  = null;
  
  /*
   *  Event: OnFormatString
   */   
  this.OnFormatString = null;
  /*
   *  Event: OnEditString
   */   
  this.OnEditString = null;
  /*
   *  Event: OnParseString
   */   
  this.OnParseString = null;

  for(var i in attrs)
    this.SetAttribute(i,attrs[i]);
}

function ngvm_SetValues(values,deserialize)
{
  deserialize=ngVal(deserialize,false);
  if((this.OnSetValues)&&(!ngVal(this.OnSetValues(this,values,deserialize),false))) return;         

  var self=this;
  function setvalues(o,d,path)
  {
    var val,valpath,setval,instance;
    if(o==self) return;
    if(path!='') path+='.';
    if((!d)||(typeof d!=='object')) return;
    if((!o)||(typeof o!=='object')) return;
    for(var i in o)
    {
      if((o==self.ViewModel)&&(i=='Owner')) continue;
      if(typeof d[i]==='undefined') continue;
      val=instance=o[i];
      if(ngIsFieldDef(instance)) 
      {
        if(instance.PrivateField) continue;
        val=instance.Value;
      }
      valpath=path+i;
      if(ko.isObservable(val)) 
      {
        if(ko.isWriteableObservable(val))
        { 
          instance.__Loading=true;
          try
          {
            setval=d[i];
            if(this.OnSetValue) setval=this.OnSetValue(this,setval,instance, valpath);
            if((deserialize)&&(typeof instance.Deserialize === 'function')) val(instance.Deserialize(setval));
            else 
            {
              if(typeof instance.TypedValue === 'function')
              {
                try   
                {
                  setval=instance.TypedValue(setval);
                }
                catch(e)
                {
                }
              }
              val(setval);
            }
          }
          finally
          {
            delete instance.__Loading;
          }
        }
      } 
      else 
      {    
        if(typeof val==='function') continue;
        if((ng_typeObject(d[i]))&&(!ng_typeDate(d[i]))&&(!ng_IsArrayVar(d[i]))) setvalues(val,d[i],valpath);
        else 
        {
          setval=d[i];
          if(this.OnSetValue) setval=this.OnSetValue(this,setval,instance, valpath);
          o[i]=setval;
        }
      }
    }    
    for(var i in d)
    {
      if(typeof o[i]==='undefined')
      {
        valpath=path+i;
        if((ng_typeObject(d[i]))&&(!ng_typeDate(d[i]))&&(!ng_IsArrayVar(d[i]))) { val=o[i]={}; setvalues(val,d[i],valpath); }
        else {
          setval=d[i];
          if(this.OnSetValue) setval=this.OnSetValue(this,setval,instance, valpath);
          o[i]=setval;
        }
      }
    }
  }
  setvalues(this.ViewModel,values,'');  
}

function ngvm_GetValues(writableonly, valuenames, errors, convtimestamps, serialize)
{
  serialize=ngVal(serialize,false);
  convtimestamps=ngVal(convtimestamps,false);
  writableonly=ngVal(writableonly,false);
  errors=ngVal(errors,{});

  var self=this;
  function getvalues(o,d,path)
  {
    var val,valpath,instance;
    if(o==self) return;
    if(path!='') path+='.';
    for(var i in o)
    {
      if((o==self.ViewModel)&&(i=='Owner')) continue;
      val=instance=o[i];
      if(ngIsFieldDef(instance)) 
      {
        if(instance.PrivateField) continue;
        val=instance.Value;
      }
      valpath=path+i;
      if(ko.isObservable(val)) 
      {
        if((writableonly)&&(!ko.isWriteableObservable(val))) continue;      
        if((serialize)&&(!val['__serialize'])) continue;

        if((!valuenames)||(ng_inArray(valpath,valuenames)))
        {
          instance.__Saving=true;
          try
          {
            val=val();
            if(self.OnGetValue) val=self.OnGetValue(self,val,instance, valpath, errors);
            if((serialize)&&(typeof instance.Serialize === 'function')) 
              d[i]=instance.Serialize(val);              
            else 
            {
              if(typeof instance.TypedValue === 'function')
                d[i]=instance.TypedValue(val);
              else 
                d[i]=val;
            }
          }
          catch(e)
          {
            errors[valpath]=e;
          }
          delete instance.__Saving;
          if((convtimestamps)&&(ng_typeDate(d[i]))) d[i]=ng_toUnixTimestamp(d[i]);
        }
      }
      else 
      {    
        if(typeof val==='function') continue;
        if((ng_typeObject(val))&&(!ng_typeDate(val))&&(!ng_IsArrayVar(val))) 
        {
          d[i]={}; 
          getvalues(val,d[i],valpath);
        }
        else 
        {
          if((!valuenames)||(ng_inArray(valpath,valuenames)))
          {
            if(self.OnGetValue) val=self.OnGetValue(self,val,instance, valpath, errors);
            if((convtimestamps)&&(ng_typeDate(val))) val=ng_toUnixTimestamp(val);
            d[i]=val;
          }
        }
      }      
    }    
  }
  
  var ret={};           
  getvalues(this.ViewModel,ret,'');
  if(this.OnGetValues) {
    try
    {
      this.OnGetValues(this, ret, writableonly, valuenames, errors, convtimestamps, serialize);
    }
    catch(e)
    {
      if((ng_typeObject(e.FieldDef))&&(e.FieldDef.ID!='')) errors[e.FieldDef.ID]=e;
      else throw e;
    }
  }         
  return ret;  
}

function ngvm_IsValid(writableonly, valuenames)
{
  var err={};
  this.GetValues(writableonly, valuenames, err);
  for(var i in err)
    return err;

  return true;
}

function ngvm_Errors(writableonly, valuenames)
{
  return ng_ViewModelFormatError(this.IsValid(writableonly, valuenames));
}

function ngvm_ShowErrors(errors)
{
  if(typeof errors==='undefined') errors=this.IsValid();
  if(!ng_typeObject(errors)) return false;

  for(var i in errors)
  {                   
    if(this.OnShowErrors) this.OnShowErrors(this,ng_ViewModelFormatError(errors),errors);
    else 
    {
      var errmsg=ng_ViewModelFormatError(errors);
      if(ng_IsArrayVar(errmsg)) errmsg=errmsg.join("\n");
      if(errmsg!='') alert(errmsg);
    }
    return true;
  }
  return false;
}

function ngvm_GetRPC()
{
  if(!this.rpc) 
  {
    this.rpc=new ngRPC(this.ID);
    this.rpc.nocache=true;
  }
  return this.rpc;
}

function ngvm_makeobservable(o,serializeable)
{
  if((!o)||(typeof o!=='object')) return false;
  var isarray,ret=false;
  for(var i in o)
  {
    isarray=ng_IsArrayVar(o[i]);
    if((typeof o[i]!=='function')&&((isarray)||(typeof o[i]!=='object')||(ng_typeDate(o[i])))) 
    {
      if(isarray) o[i]=ko.observableArray(o[i]);
      else o[i]=ko.observable(o[i]);
      if(serializeable) ko.ng_serialize(o[i]);
      continue;
    } 
    ngvm_makeobservable(o[i],serializeable);
  }  
}                            

function ngvm_recievedata(results)
{
  if(!results) return;
    
  // Parse request id
  var vmid='';
  var reqid=ngVal(results.reqid,'');
  var i=reqid.lastIndexOf('_');
  if(i>=0)
  {
    vmid=reqid.substring(0,i);
    reqid=reqid.substring(i+1,reqid.length);
  }
  if(vmid=='') return;
 
  // Get ngViewModel
  var vm=getViewModelById(vmid);
  if(!vm) return;
   
  // Check request id
  if(reqid!=vm.rpc_reqid) return;
                   
  var sresults;
  if(vm.OnResults)
  {
    sresults = vm.OnResults(vm, results);
    if(!sresults) return;     
  }
  else sresults=results;

  var cmd=vm.ActiveCommand;
  if(vm.OnCommandResults) vm.OnCommandResults(vm,cmd,sresults);

  // Update ViewModel
  if(sresults.ViewModel) {
    var vmodel=sresults.ViewModel;
    if(typeof vmodel !== 'function')
    {
      if(!sresults.Values) sresults.Values={};
      ng_MergeVar(sresults.Values,vmodel);
      ngvm_makeobservable(vmodel,true);
    }
    vm.SetViewModel(vmodel);
  }
  
  vm.ActiveCommand='';
  if(vm.OnCommandFinished) vm.OnCommandFinished(vm,cmd,sresults);

  // Handle Errors
  function create_exceptions(err)
  {
    if(ng_typeObject(err.childerrs))
      for(var k in err.childerrs)
        err.childerrs[k] = create_exceptions(err.childerrs[k]);

    var fd=vm.GetFieldByID(err.field);
    return new ngFieldDefException(ngIsFieldDef(fd) ? fd : ngTxt('VM.'+vm.Namespace+'.'+err.field,err.field), err.err, err.errmsg, err.errext, err.childerrs);
  }

  if(sresults.Errors)
  {
    var err,fd;
    var errors=new Array();
    for(var e in sresults.Errors)
    {
      err=sresults.Errors[e];
      errors.push(create_exceptions(err));
    }
    if(errors.length>0)
    {
      if((vm.OnErrors)&&(!ngVal(vm.OnErrors(vm,errors),false))) return false;
      if(!ng_EmptyVar(errors))
        vm.ShowErrors(errors);
      return false;
    }
  }

  // Update Values
  if(sresults.Values) {
    if(!ngVal(sresults.NoReset,false)) 
    {
      // Reset all except PrivateFields
      vm.Reset(function (vm,val,instance,path) {
        if((ngIsFieldDef(instance))&&(instance.PrivateField)) return false;
        return true;
      });
    }
    vm.SetValues(sresults.Values,true);
  }
  if(vm.OnCommandData) vm.OnCommandData(vm,cmd,sresults);
  
  // Fire callback
  if(typeof sresults.Callback === 'function') {
    vm.ViewModel.__servercallback=sresults.Callback;
    try {
      vm.ViewModel.__servercallback();
    }
    finally {
      delete vm.ViewModel.__servercallback;
    }
  }      
}

function ngvm_GetCommandValueNamesByFieldAttrs(cmd,exactmatch)
{
  exactmatch=ngVal(exactmatch,false);
  var valuenames=[];
  var attrfound=false;
  this.ScanValues(function(vm,val,instance,valpath) {
    if(ngIsFieldDef(instance))
    {
      var forcmd=instance.Attrs['Command'];
      if(forcmd!=='') 
      {
        if(ng_isEmpty(forcmd))
        {
          if(!exactmatch) valuenames.push(valpath);
        }
        else
        {
          attrfound=true;
          if((forcmd===cmd)||(ng_inArray(cmd,forcmd))) 
            valuenames.push(valpath); 
        }
      }
      else attrfound=true;
    }
    else if(!exactmatch) valuenames.push(valpath);
    return true;
  });
  if(!attrfound) return; // undefined - no special values for command;
  return valuenames;
}

function ngvm_GetCommandValueNames(cmd,options,exactmatch)
{
  if(this.OnGetCommandValueNames) 
  {
    if(typeof options === 'undefined') options={};  
    return this.OnGetCommandValueNames(this,cmd,options);
  }
  else return this.GetCommandValueNamesByFieldAttrs(cmd,exactmatch);
}

function ngvm_CancelCommand()
{
  if(this.ActiveCommand!='')
  {
    this.rpc_reqid++;
    if(this.OnCommandCancel) this.OnCommandCancel(this);
  }
  this.ActiveCommand='';
}

function ngvm_Command(cmd,options)
{
  if(typeof options === 'undefined') options={};
  if((this.OnCommand)&&(!ngVal(this.OnCommand(this,cmd,options),false))) return false;

  this.CancelCommand();

  var err={};
  var vals=options.Values;
  if(ng_isEmpty(vals))
  {
    var valuenames=options.ValueNames;
    if(ng_isEmpty(valuenames)) valuenames=this.GetCommandValueNames(cmd,options);
    vals=this.GetValues(false,valuenames,err,true,true);
  }
  if(ng_EmptyVar(err))
  {
    try
    {
      if(this.OnDoCommand)
      {
        var ret=(ngVal(this.OnDoCommand(this,cmd,options,vals,err),true));
        if((ret)&&(ng_EmptyVar(err))) return true;
      }
    }
    catch(e)
    {
      if((ng_typeObject(e.FieldDef))&&(e.FieldDef.ID!='')) err[e.FieldDef.ID]=e;
      else throw e;
    }
  }
  if(!ng_EmptyVar(err))
  {
    if((this.OnErrors)&&(!ngVal(this.OnErrors(this,err),false))) return false;
    if(!ng_EmptyVar(err))
    {
      this.ShowErrors(err); 
      return false;
    }
  }                
  
  var url=ngVal(options.URL,this.ServerURL);
  if(url=='') return false;

  var rpc=this.GetRPC();
  if(!rpc) return false;

  this.rpc_reqid++;
  rpc.clearParams();
  if(ngVal(this.Namespace,'')!='') rpc.Params.ns=this.Namespace;
  rpc.Params.cmd=cmd;
  rpc.Params.data=ko.toJSON(vals);  
  rpc.Params.reqid=this.ID+'_'+this.rpc_reqid;
  if(options.Params) ng_MergeVar(rpc.Params,options.Params);  
  rpc.URL = url;
  this.ActiveCommand=cmd;

  if((this.OnCommandRequest)&&(!ngVal(this.OnCommandRequest(this,rpc),false))) return false;

  rpc.sendRequest();
  return true;
}

function ngvm_SetViewModel(vmodel)
{
  if(!vmodel) return;
  if(this.OnSetViewModel)
  {
    vmodel=this.OnSetViewModel(this,vmodel);
    if(!vmodel) return;
  }
  this.ViewModel.Owner=this;
  if(typeof vmodel === 'function') 
  {                                     
    this.viewmodel_history.push(vmodel);    
    this.ViewModel.__newvmodel = vmodel;
    try {
      this.ViewModel.__newvmodel(this);
    } finally {
      delete this.ViewModel.__newvmodel;
    }
  }
  else 
  { 
    this.viewmodel_history.push(ng_CopyVar(vmodel));    
    ngvm_makeobservable(vmodel,false);
    ng_MergeVar(this.ViewModel,vmodel);
  }
  this.DefaultValues = this.GetValues(true);
  this.ViewModel.Owner=this;
  if(this.OnViewModelChanged) this.OnViewModelChanged(this);
}

function ngvm_ScanValues(callback)
{
  var undefined;
  var self=this;
  function scanvalues(o,path)
  {
    var val,valpath,instance;
    if(o==self) return;
    if((!o)||(typeof o!=='object')) return;
    if(path!='') path+='.';
    for(var i in o)
    {
      if((o==self.ViewModel)&&(i=='Owner')) continue;
      val=instance=o[i];
      if(ngIsFieldDef(instance)) val=instance.Value;
      valpath=path+i;
      if(ko.isObservable(val))
      {
        if(!callback(self,val,instance,valpath)) return false;
      }
      else
      {
        if(typeof val === 'function') continue;
        if((ng_typeObject(val))&&(!ng_typeDate(val))&&(!ng_IsArrayVar(val)))
        { 
          if(!scanvalues(val,valpath)) return false;
        }
        else if(!callback(self,val,instance,valpath)) return false;
      }
    }   
    return true; 
  }
  if(typeof callback!=='function') return;
  scanvalues(this.ViewModel,'');  
}

function ngvm_Reset(callback) 
{
  var undefined;
  var self=this;
  function resetvalues(o,path)
  {
    var val,valpath,instance;
    if(o==self) return;
    if((!o)||(typeof o!=='object')) return;
    if(path!='') path+='.';
    for(var i in o)
    {
      if((o==self.ViewModel)&&(i=='Owner')) continue;
      val=instance=o[i];
      valpath=path+i;
      if(ngIsFieldDef(instance))
      { 
        if(instance.Attrs['NoReset']===true) continue;
        val=instance.Value;
        defaultval=instance.GetTypedDefaultValue();
      }
      else
      {
        if((ng_typeObject(o[i]))&&(!ng_typeDate(o[i]))&&(!ng_IsArrayVar(o[i]))) defaultval=undefined;
        else defaultval=ng_CopyVar(vmGetFieldByID(self.DefaultValues,valpath));
      }
      if((typeof callback==='function')&&(!callback(this,val,instance,valpath,defaultval))) continue;

      if(ko.isObservable(val)) 
      {
        if(ko.isWriteableObservable(val)) val(defaultval);
      } 
      else 
      {    
        if(typeof val === 'function') continue;
        if((ng_typeObject(o[i]))&&(!ng_typeDate(o[i]))&&(!ng_IsArrayVar(o[i]))) 
        {
          resetvalues(val,valpath);
          var found=false;
          for(var j in val) { found=true; break; }
          if(!found) delete o[i];
        }
        else 
        {
          if(typeof defaultval!=='undefined') o[i]=defaultval;
          else delete o[i];
        }
      }
    }    
  }
  resetvalues(this.ViewModel,'');  
}

function vmGetFieldByID(vm,propid)
{
  propid=''+propid;
  if((!vm)||(propid=='')) return; // undefined
  var p,pids=propid.split('.');
  if(!pids.length) return; // undefined
  for(var i=0;i<pids.length;i++)
  {
    if(ngIsFieldDef(vm)) {
      if(typeof vm.GetChildFieldByID === 'function') {
        pids.splice(0,i);
        return vm.GetChildFieldByID(pids.join('.'));
      }
    }
    p=vm[pids[i]];
    if(i===pids.length-1) return p;
    if((!p)||(typeof p!=='object')) return; // undefined
    vm=p;        
  }
  return; //undefined
}

function ngvm_GetFieldByID(propid)
{
  return vmGetFieldByID(this.ViewModel,propid);
}

function vmGetFieldValueByID(vm,propid)
{
  var p=vmGetFieldByID(vm,propid);
  return (typeof p === 'function' ? p() : p);
}

function ngvm_GetFieldValueByID(propid)
{
  return vmGetFieldValueByID(this.ViewModel,propid);
}

function vmSetFieldValueByID(vm,propid,val)
{
  propid=''+propid;
  if((!vm)||(propid=='')) return;
  var p,pids=propid.split('.');
  if(pids.length<1) return; // empty
  for(var i=0;i<pids.length-1;i++)
  {
    p=vm[pids[i]];
    if((!p)||(typeof p!=='object')) 
    {
      if(typeof p==='undefined')
      {
        p={};
        vm[pids[i]]=p;
      }
      else return; // not diveable 
    }
    vm=p;        
  }
  var prop=pids[pids.length-1];
  p=vm[prop];
  if(typeof p === 'function') p(val);
  else vm[prop]=val;
}    

function ngvm_SetFieldValueByID(propid,val)
{
  vmSetFieldValueByID(this.ViewModel,propid,val); 
}

function ngvm_Assign(src)
{
  this.viewmodel_history = [];    

  this.ViewModel={ };
  this.DefaultValues = { };
  
  this.Namespace=this.ID;
  this.ServerURL = '';
  this.ViewModel={ };
  if(src)
  {
    this.Namespace=ngVal(src.Namespace,this.ID);
    this.ServerURL=ngVal(src.ServerURL,'');

    for(var i=0;i<src.viewmodel_history.length;i++)
      this.SetViewModel(src.viewmodel_history[i]);

    var values=src.GetValues(false);
    this.SetValues(values);
  }
  if(this.OnAssign) this.OnAssign(this,src); 
}

function ngvm_SetNamespace(ns)
{
  if(this.Namespace==ns) return;
  this.Namespace=ngVal(ns,'');
  if(this.Namespace!='') {
    var nsdef=ngViewModelNamespaces[ns];
    if(ng_typeObject(nsdef))
    {
      if(this.ServerURL=='') this.ServerURL=ngVal(nsdef.ServerURL,'');
      if((ng_typeObject(nsdef.ViewModel))||(typeof nsdef.ViewModel==='function')) this.SetViewModel(nsdef.ViewModel);
    }
  } 
}

/**
 *  Class: ngViewModel
 *  This class implements ViewModel object.   
 */
function ngViewModel(id,namespace,vmodel,url)
{
  id=ngVal(id,'');
  this.ID = id;
  if(id!='') { 
    ngViewModels[id] = this;
  }
  this.rpc = null;
  this.rpc_reqid = 0;
  this.viewmodel_history = [];    

  /*
   *  Group: Properties
   */

  /*  Variable: Namespace
   *  ViewModel namespace.   
   *  Type: string
   *  Default value: *''*
   */
  this.Namespace = '';

  /*  Variable: ViewModel
   *  ViewModel properties.   
   *  Type: object
   *  Default value: *{ }*
   */
  this.ViewModel={ };

  /*  Variable: DefaultValues
   *  Holds default values for non-<ngFieldDef> properties.   
   *  Type: object
   *  Default value: *{ }*
   */
  this.DefaultValues = { };
  
  /*  Variable: ServerURL
   *  ViewModel's server script URL.   
   *  Type: string
   *  Default value: *''*
   */
  this.ServerURL = ngVal(url,'');

  /*  Variable: ActiveCommand
   *  Current running server-side command.   
   *  Type: string
   *  Default value: *''*
   */
  this.ActiveCommand = '';
  
  /*
   *  Group: Methods
   */

  /*  Function: Assign
   *  Assigns settings and values from another ViewModel.   
   *   
   *  Syntax:
   *    void *Assign* (<ngViewModel> vm)
   *     
   *  Parameters:
   *    vm - source viewmodel    
   *             
   *  Returns:
   *    -     
   */   
  this.Assign = ngvm_Assign;

  /*  Function: SetNamespace
   *  Sets ViewModel namespace. 
   *  If specified namespace is registered, the settings of viewmodel is copied 
   *  from registered namespace.   
   *   
   *  Syntax:
   *    void *SetNamespace* (string ns)
   *     
   *  Parameters:
   *    ns - namespace   
   *             
   *  Returns:
   *    -     
   */   
  this.SetNamespace = ngvm_SetNamespace;
  
  /*  Function: SetViewModel
   *  Sets ViewModel *modification*.   
   *   
   *  Syntax:
   *    void *SetViewModel* (mixed vm)
   *     
   *  Parameters:
   *    vm - object containing new properties of viewmodel or function which adds new properties to viewmodel   
   *             
   *  Returns:
   *    -     
   */   
  this.SetViewModel = ngvm_SetViewModel;
   
  /*  Function: SetValues
   *  Sets values to ViewModel.   
   *   
   *  Syntax:
   *    void *SetValues* (object values)
   *     
   *  Parameters:
   *    values - object containing new values   
   *             
   *  Returns:
   *    -     
   */   
  this.SetValues = ngvm_SetValues;

  /*  Function: GetValues
   *  Gets values from ViewModel.   
   *   
   *  Syntax:
   *    void *GetValues* ([bool writableonly=false, array valuenames=undefined, object errors={}, bool convtimestamps=false])
   *     
   *  Parameters:
   *    writableonly - if TRUE, return only values of non-read-only properties 
   *    valuenames - optional list of property names, returned values are only from properties specified on this list 
   *    errors - all errors which occured during serialization (including type conversion erros) are recorded into this object as name-value pairs "property path":"exception"    
   *    convtimestamps - if TRUE, values of type Date are returned as timestamps (integer)            
   *             
   *  Returns:
   *    Object containing values.     
   */   
  this.GetValues = ngvm_GetValues;
  
  /*  Function: ScanValues
   *  Scans all ViewModel values.   
   *   
   *  Syntax:
   *    void *ScanValues* (function callback)
   *     
   *  Parameters:
   *    callback - function which is called on each ViewModel value   
   *             
   *  Returns:
   *    -     
   *    
   *  Callback:
   *    function *callback* (<ngViewModel> vm, mixed value, <ngFieldDef> instance, string propid)
   *    
   *  Callback parameters:
   *    vm - ViewModel on which is scan performed
   *    value - observable or value 
   *    instance - <ngFieldDef> or same as value
   *    propid - property ID (including path) in ViewModel
   *    
   *  Callback returns:
   *    TRUE, if continue scan.                                      
   */   
  this.ScanValues = ngvm_ScanValues;

  /*  Function: GetFieldByID
   *  Gets field in ViewModel based on property ID.   
   *   
   *  Syntax:
   *    mixed *GetFieldByID* (string propid)
   *     
   *  Parameters:
   *    propid - property ID (including path) in ViewModel   
   *             
   *  Returns:
   *    ViewModel property.     
   */      
  this.GetFieldByID = ngvm_GetFieldByID;

  /*  Function: GetFieldValueByID
   *  Gets ViewModel value based on property ID.   
   *   
   *  Syntax:
   *    mixed *GetFieldValueByID* (string propid)
   *     
   *  Parameters:
   *    propid - property ID (including path) in ViewModel   
   *             
   *  Returns:
   *    Value of property.     
   */      
  this.GetFieldValueByID = ngvm_GetFieldValueByID;

  /*  Function: SetFieldValueByID
   *  Sets ViewModel value based on property ID.   
   *   
   *  Syntax:
   *    void *SetFieldValueByID* (string propid, mixed value)
   *     
   *  Parameters:
   *    propid - property ID (including path) in ViewModel
   *    value - property value      
   *             
   *  Returns:
   *    -     
   */      
  this.SetFieldValueByID = ngvm_SetFieldValueByID;

  /*  Function: Reset
   *  Resets ViewModel to initial state.   
   *   
   *  Syntax:
   *    void *Reset* ([function callback])
   *     
   *  Parameters:
   *    callback - optional callback function which is called before value is reset   
   *             
   *  Returns:
   *    -
   *            
   *  Callback:
   *    function *callback* (<ngViewModel> vm, mixed value, <ngFieldDef> instance, string propid)
   *    
   *  Callback parameters:
   *    vm - ViewModel on which is scan performed
   *    value - observable or value 
   *    instance - <ngFieldDef> or same as value
   *    propid - property ID (including path) in ViewModel
   *    
   *  Callback returns:
   *    If FALSE, reset of the property will be skipped                                        
   */   
  this.Reset = ngvm_Reset;

  /*  Function: IsValid
   *  Tests if all (or selected) ViewModel's properties are valid.   
   *   
   *  Syntax:
   *    mixed *IsValid* ([bool writableonly=false, array valuenames=undefined])
   *     
   *  Parameters:
   *    writableonly - if TRUE, return only values of non-read-only properties 
   *    valuenames - optional list of property names, returned values are only from properties specified on this list 
   *             
   *  Returns:
   *    TRUE if ViewModel's properties are valid or object with errors as name-value pairs "property path":"exception".    
   */      
  this.IsValid = ngvm_IsValid;

  /*  Function: Errors
   *  Gets textual description of ViewModel's errors.   
   *   
   *  Syntax:
   *    array *Errors* ([bool writableonly=false, array valuenames=undefined])
   *     
   *  Parameters:
   *    writableonly - if TRUE, return only values of non-read-only properties 
   *    valuenames - optional list of property names, returned values are only from properties specified on this list 
   *             
   *  Returns:
   *    Array of formated string messages.    
   */      
  this.Errors = ngvm_Errors;

  /*  Function: ShowErrors
   *  Displays ViewModel errors.   
   *   
   *  Syntax:
   *    void *ShowErrors* ([object errors])
   *     
   *  Parameters:
   *    errors - optional error object, if not specified the <ngViewModel.IsValid> is used for getting errors
   *             
   *  Returns:
   *    TRUE is one or more error present and displayed.     
   */      
  this.ShowErrors = ngvm_ShowErrors;
  
  /**
   *  Function: Command
   *  Sends command to the server.
   *  
   *  Syntax:
   *    void *Command* (string cmd[, object options])
   *    
   *  Parameters:
   *    cmd - command id
   *    options - command options
   *     
   *  Returns:
   *    TRUE if command was sent.
   *    
   *  Command options:
   *    ValueNames - optional list of property names; values, which are send to server, are only from properties specified on this list
   *    Values - optional object with values which are send to server (ViewModel values are ignored) 
   *    URL - optional server URL, default is <ServerURL>
   *    Params - optional request <ngRPC> parameters
   */
  this.Command = ngvm_Command;

  /**
   *  Function: CancelCommand
   *  Cancels running command.
   *  
   *  Syntax:
   *    void *CancelCommand* ()
   *    
   *  Returns:
   *    -
   */   
  this.CancelCommand = ngvm_CancelCommand;

  /**
   *  Function: GetCommandValueNames
   *  Gets value names for specified command.
   *  
   *  Syntax:
   *    mixed *GetCommandValueNames* (string cmd[, object options, bool exactmatch=false])
   *    
   *  Parameters:
   *    cmd - command id
   *    options - command options (see <Command>)
   *    exactmatch - return only value names which are exactly defined for specified command
   *     
   *  Returns:
   *    Array of value names to be passed together with command or undefined if no specific value names defined for command (all values are sent to server).
   */
  this.GetCommandValueNames = ngvm_GetCommandValueNames;

  /**
   *  Function: GetCommandValueNamesByFieldAttrs
   *  Gets value names for specified command based on field attribute 'Command'.
   *  
   *  Syntax:
   *    mixed *GetCommandValueNamesByFieldAttrs* (string cmd [, bool exactmatch=false])
   *    
   *  Parameters:
   *    cmd - command id
   *    exactmatch - return only value names which are exactly defined for specified command
   *
   *  Returns:
   *    Array of value names to be passed together with command or undefined if no specific value names defined for command (all values are sent to server).
   */
  this.GetCommandValueNamesByFieldAttrs = ngvm_GetCommandValueNamesByFieldAttrs;

  /*  Function: GetRPC
   *  Gets current <ngRPC> for ViewModel requests.
   *   
   *  Syntax:
   *    <ngRPC> *GetRPC* ()
   *     
   *  Returns:
   *    Instance of <ngRPC>.     
   */   
  this.GetRPC = ngvm_GetRPC;

  this.AddEvent = ngObjAddEvent;
  this.RemoveEvent = ngObjRemoveEvent; 

  /*
   *  Group: Events
   */

  /*
   *  Event: OnSetValues
   */   
  this.OnSetValues = null;
  /*
   *  Event: OnSetValue
   */   
  this.OnSetValue = null;
  /*
   *  Event: OnGetValues
   */   
  this.OnGetValues = null;
  /*
   *  Event: OnGetValue
   */   
  this.OnGetValue = null;
  
  /*
   *  Event: OnCommand
   */   
  this.OnCommand = null;
  
  /*
   *  Event: OnGetCommandValueNames
   */   
  this.OnGetCommandValueNames = null;
  
  /*
   *  Event: OnDoCommand
   */   
  this.OnDoCommand = null;
  /*
   *  Event: OnCommandRequest
   */   
  this.OnCommandRequest = null;
  /*
   *  Event: OnCommandResults
   */   
  this.OnCommandResults = null;
  /*
   *  Event: OnCommandFinished
   */   
  this.OnCommandFinished = null;
  /*
   *  Event: OnCommandCancel
   */   
  this.OnCommandCancel = null;
  /*
   *  Event: OnCommandData
   */   
  this.OnCommandData = null;
  
  /*
   *  Event: OnSetViewModel
   */   
  this.OnSetViewModel = null;
  /*
   *  Event: OnViewModelChanged
   */   
  this.OnViewModelChanged = null;
  
  /*
   *  Event: OnResults
   */   
  this.OnResults = null;
  
  /*
   *  Event: OnErrors
   */   
  this.OnErrors = null;
  /*
   *  Event: OnShowErrors
   */   
  this.OnShowErrors = null;
  
  /*
   *  Event: OnAssign
   */   
  this.OnAssign = null;

  this.SetNamespace(ngVal(namespace,id));
  if(vmodel) this.SetViewModel(vmodel);   
}

function ngfd_DataSetFieldSerialize(v)
{
  return (this.DataSetNeedUpdate || !ng_typeArray(v) ? '__LOAD__' : '__LOADED__');
}

function ngfd_DataSetFieldDeserialize(v)
{
  if(v=='__LOADED__')
  {
    v=this.GetTypedValue();
    if(ng_isEmpty(v)) v=new Array();
    return v;
  }
  this.DataSetNeedUpdate = false;
  return;
}

function ngfd_InvalidateDataSet()
{
  this.DataSetNeedUpdate = true;
}

/*  Class: ngDataSetFieldDef
 *  <ngViewModel> DataSet field (based on <ngFieldDef> ARRAY).
 *  
 *  Syntax:
 *    new *ngDataSetFieldDef* (string id [, object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngDataSetFieldDef(id, attrs)
{
  ngFieldDefCreateAs(this,id,'ARRAY',attrs);
  
  /*
   *  Group: Properties
   */

  /*  Variable: DataSetNeedUpdate
   *  Indicates if fresh data is requested from server on data update.   
   *  Type: bool
   *  Default value: *true*
   */
  this.DataSetNeedUpdate = true;

  /*
   *  Group: Methods
   */

  /*  Function: InvalidateDataSet
   *  Indicated that fresh data is requested from server on data update.        
   *   
   *  Syntax:
   *    void *InvalidateDataSet* ()
   *     
   *  Returns:
   *    -      
   */   
  this.InvalidateDataSet = ngfd_InvalidateDataSet;
  
  this.DoSerialize = ngfd_DataSetFieldSerialize;
  this.DoDeserialize = ngfd_DataSetFieldDeserialize;
}

/*  Class: ngLookupFieldDef
 *  <ngViewModel> Lookup field (based on <ngFieldDef> ARRAY).
 *  
 *  Syntax:
 *    new *ngLookupFieldDef* (string id [, object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngLookupFieldDef(id, attrs)
{
  ngFieldDefCreateAs(this,id,'ARRAY',attrs);

  /*
   *  Group: Properties
   */
  /*  Variable: DataSetNeedUpdate
   *  Indicates if fresh data is requested from server on data update.   
   *  Type: bool
   *  Default value: *true*
   */
  this.DataSetNeedUpdate = false;

  /*
   *  Group: Methods
   */

  /*  Function: InvalidateDataSet
   *  Indicated that fresh data is requested from server on data update.        
   *   
   *  Syntax:
   *    void *InvalidateDataSet* ()
   *     
   *  Returns:
   *    -      
   */   
  this.InvalidateDataSet = ngfd_InvalidateDataSet;

  this.DoSerialize = ngfd_DataSetFieldSerialize;
  this.DoDeserialize = ngfd_DataSetFieldDeserialize;
}

if(typeof ngUserControls === 'undefined') ngUserControls = new Array();
ngUserControls['viewmodel'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function() {

    if(typeof ngViewModelsServerURL === 'function')
    {
      var surls=ngViewModelsServerURL();
      if(surls)
      {
        var ns, surl;
        for(var i in ngViewModelNamespaces)
        {
          ns=ngViewModelNamespaces[i];
          if(typeof ns.ServerURLIndex!=='undefined')
          {
            if((ns.ServerURLIndex>0)&&(ns.ServerURLIndex<=surls.length))
            {
              surl = surls[ns.ServerURLIndex-1];
              if((surl.charAt(0)=='/')||(surl.indexOf('://')>=0)) ns.ServerURL=surl;
              else ns.ServerURL=ngApp.AppPath+surl;
            }
          }
        }
      }
    }

    /**
     *  Class: Knockout extensions 
     *  This extends Knockout functions for viewmodel definition.   
     */
     
    /*  Function: ko.ng_noserialize
     *  Marks viewmodel property as non-serializable. 
     *  Non-serializable properties is not send to server.
     *   
     *  Syntax:
     *    object *ko.ng_noserialize* (object vmprop)
     *     
     *  Parameters:
     *    vmprop - viewmodel property   
     *             
     *  Returns:
     *    vmprop - this simplifies function chaining.     
     */   
    ko.ng_noserialize = function (v)
    {
      if(typeof v==='function') delete v['__serialize'];
      return v;
    }                   

    /*  Function: ko.ng_serialize
     *  Marks viewmodel property as serializable. 
     *  Only serializable properties can be send to server.   
     *   
     *  Syntax:
     *    object *ko.ng_serialize* (object vmprop)
     *     
     *  Parameters:
     *    vmprop - viewmodel property   
     *             
     *  Returns:
     *    vmprop - this simplifies function chaining.     
     */   
    ko.ng_serialize = function (v)
    {
      if(typeof v==='function') v['__serialize']=true;
      return v;
    }

    /*  Function: ko.ng_writeallowed
     *  Tests if viewmodel property is writeable.
     *
     *  Syntax:
     *    bool *ko.ng_writeallowed* (object vmprop)
     *
     *  Parameters:
     *    vmprop - viewmodel property
     *
     *  Returns:
     *    TRUE if property is writeable.
     */
    ko.ng_writeallowed = function (v)
    {
      if(!ko.isWriteableObservable(v)) return false;
      var fd=v.FieldDef;
      return (!ngIsFieldDef(fd))||((!ngVal(fd.ReadOnly,false))||(ngVal(fd.__Loading,false)));
    }

    function viewmodel(vm)
    {
      if(!ng_typeString(vm)) return vm;
      vm=getViewModelById(vm);
      return (vm ? vm.ViewModel : null);
    }
    
    /*  Function: ko.ng_delegate
     *  Creates computed viewmodel property which value is gathered from another model. 
     *   
     *  Syntax:
     *    function *ko.ng_delegate* (mixed viewmodel, string propname [, bool readonly])
     *     
     *  Parameters:
     *    viewmodel - string ID or instance of viewmodel
     *    propname - viewmodel property name in reference viewmodel
     *    readonly - if TRUE, the value in current viewmodel is read-only                  
     *             
     *  Returns:
     *    Computed viewmodel property.      
     */   
    ko.ng_delegate = function (viewModel,propName,readonly)
    {      
      return ko.ng_noserialize(ko.computed({
        read: function() {
          return vmGetFieldValueByID(viewmodel(viewModel),propName);
        }, 
        write: function(val) {
          if(ngVal(readonly,false)) return;
          vmSetFieldValueByID(viewmodel(viewModel),propName,val);
        },
        owner: this})); 
    };     

    /*  Function: ko.ng_linkvalue
     *  Sets one-way synchronization of value from one viewmodel property to other.
     *
     *  Syntax:
     *    void *ko.ng_linkvalue* (observable prop, mixed viewmodel, string propname [, bool callonsync=null])
     *
     *  Parameters:
     *    prop - viewmodel property where synchronized value is stored
     *    viewmodel - string ID or instance of viewmodel
     *    propname - viewmodel property name which value to be synchronized in reference viewmodel
     *    callonsync - optional function which is called when value was synchronized
     *
     *  Callbacks:
     *    void *callonsync* (mixed value, observable prop, observable srcprop, object srcviewmodel)
     */
    ko.ng_linkvalue = function (prop,viewModel,propName,callonsync) {
      var vm=viewmodel(viewModel);
      var f=vmGetFieldByID(vm,propName);
      if((ko.isObservable(f))&&(ko.isObservable(prop))) {
        prop(f());
        f.subscribe(function(v) {
          prop(v);
          if(typeof callonsync === 'function') callonsync(v,prop,f,vm);
        });
      }
    };

    /*  Function: ko.ng_linkvalues
     *  Sets two-way synchronization of values between two viewmodel properties.
     *
     *  Syntax:
     *    void *ko.ng_linkvalues* (mixed viewmodel1, string propname1, mixed viewmodel2, string propname2, [, bool callonsync=null])
     *
     *  Parameters:
     *    viewmodel1 - string ID or instance of viewmodel
     *    propname1 - viewmodel property name in reference viewmodel
     *    viewmodel2 - string ID or instance of viewmodel
     *    propname2 - viewmodel property name in reference viewmodel
     *    callonsync - optional function which is called when value was synchronized
     *
     *  Callbacks:
     *    void *callonsync* (mixed value, string changedpropname, observable changedprop, object viewmodel1, observable prop1, object viewmodel2, observable prop2)
     */
    ko.ng_linkvalues = function (viewModel1,propName1,viewModel2,propName2,callonsync) {
      var vm1=viewmodel(viewModel1);
      var prop=vmGetFieldByID(vm1,propName1);
      var vm2=viewmodel(viewModel2);
      var f=vmGetFieldByID(vm2,propName2);
      if((ko.isObservable(f))&&(ko.isObservable(prop))) {
        f(prop());
        f.subscribe(function(v) {
          var v2=prop();
          if(!ng_VarEquals(v,v2)) {
            prop(v);
            if(typeof callonsync === 'function') callonsync(v,propName2,prop,vm1,prop,vm2,f);
          }
        });
        prop.subscribe(function(v) {
          var v2=f();
          if(!ng_VarEquals(v,v2)) {
            f(v);
            if(typeof callonsync === 'function') callonsync(v,propName1,f,vm1,prop,vm2,f);
          }
        });
      }
    }

    /*  Function: ko.ng_bool2val
     *  Creates computed viewmodel property which translates boolean to other viewmodel
     *  property value (or values).       
     *   
     *  Syntax:
     *    function *ko.ng_bool2val* (mixed viewmodel, string propname, mixed trueValue [, mixed falseValue])
     *     
     *  Parameters:
     *    viewmodel - string ID or instance of viewmodel
     *    propname - viewmodel property name in reference viewmodel
     *    trueValue - value which is translated as TRUE                   
     *    falseValue - value which is translated as FALSE                   
     *             
     *  Returns:
     *    Computed viewmodel property.      
     */   
    ko.ng_bool2val = function (viewModel,propName,trueValue,falseValue)
    {      
      var hasFalse=(arguments.length>3);
      
      return ko.ng_noserialize(ko.computed({
        read: function() {
          var vm=viewmodel(viewModel);
          var pval=vmGetFieldValueByID(vm,propName);                
          var val=cmpval(vm,trueValue);
          if(ng_VarEquals(pval,val)) return true;
          if(hasFalse)
          {
            val=cmpval(vm,falseValue);
            if(ng_VarEquals(pval,val)) return false;
            return; // undefined
          }                
          else return false;          
        }, 
        write: function(val) {
          var vm=viewmodel(viewModel);
          val=ng_toBool(val,false);
          if(val===true)
          {
            var v=cmpval(vm,trueValue);                  
            vmSetFieldValueByID(vm,propName,v);
          }
          else if((hasFalse)&&(val===false))
          {
            var v=cmpval(vm,falseValue);                  
            vmSetFieldValueByID(vm,propName,v);
          }
        },
        owner: this})); 
    };     

    function vmvaluesfromarray(vm,cargs,from,to)
    {
      var sargs=new Array();
      if(!vm) return sargs;
      from=ngVal(from,0);
      to=ngVal(to,cargs.length-1);
      for(var i=from;i<=to;i++)
        sargs.push(vmGetFieldValueByID(vm,cargs[i]));            
      return sargs;
    }
    
    function expand_args(args)
    {
      var a,ret=[];
      for(var i=0;i<args.length;i++)
      {
        a=args[i];
        if(ng_IsArrayVar(a))
        {
          for(var j=0;j<a.length;j++)
            ret.push(a[j]);
        }
        else ret.push(a);
      }
      return ret;
    }

    /*  Function: ko.ng_sprintf
     *  Creates computed viewmodel property which formats string (PHP like sprintf function) based on values of other viewmodel properties. 
     *   
     *  Syntax:
     *    function *ko.ng_sprintf* (mixed viewmodel, string format [, string propname1, string propname2, ...])
     *     
     *  Parameters:
     *    viewmodel - string ID or instance of viewmodel
     *    format - text with format characters
     *    propname1..N - viewmodel property names, values of these properties are used as arguments for string formating
     *    
     *    If any of parameters is indexed array the array items are expanded inline as function parameters.                 
     *             
     *  Returns:
     *    Computed viewmodel property.      
     */   
    ko.ng_sprintf = function ()
    {
      var fargs=expand_args(arguments);
    
      return ko.ng_noserialize(ko.computed(
        function() {
          if(!fargs || fargs.length < 2) return;
          var vals=vmvaluesfromarray(viewmodel(fargs[0]),fargs,2);
          for(var i=0;i<vals.length;i++)
            if((ng_isEmptyOrNull(vals[i]))||(typeof vals[i]==='function')) vals[i]='';
          vals.splice(0,0,fargs[1]);
          return ng_sprintf.apply(window,vals);
        },this)); 
    };

    /*  Function: ko.ng_changed
     *  Creates computed viewmodel property which detects value changes of enumerated properties. 
     *   
     *  Syntax:
     *    function *ko.ng_changed* (mixed viewmodel, [, string propname1, string propname2, ...])
     *     
     *  Parameters:
     *    viewmodel - string ID or instance of viewmodel
     *    propname1..N - viewmodel property names on which change state is maintained
     *               
     *    If any of parameters is indexed array the array items are expanded inline as function parameters.                 
     *             
     *  Returns:
     *    Computed viewmodel property.      
     */   
    ko.ng_changed = function ()
    {
      var fargs=expand_args(arguments);
      var initialized=false;
      var changed = ko.observable(false);
      
      return ko.ng_noserialize(ko.computed({
        read: function() {
          if(!fargs || fargs.length < 1) return changed();
          var vm=viewmodel(fargs[0]);
          if(!vm) return changed();
          if(!initialized)
          {
            var p;
            for(var i=1;i<fargs.length;i++)
            {
              p=vmGetFieldByID(vm,fargs[i]);                
              if((p)&&(typeof p.subscribe === 'function'))
                p.subscribe(function(newValue) { changed(true); });
            }
            initialized=true;
          }
          return changed();
        }, 
        write: function(val) {
          changed(val ? true : false);
        },
        owner: this})); 
    }

    /*  Function: ko.ng_dataversion
     *  Creates computed viewmodel property, similar to <ko.ng_changed>, which detects value 
     *  changes of enumerated properties and increases it's value every time the change occurs. 
     *   
     *  Syntax:
     *    function *ko.ng_dataversion* (mixed viewmodel, [, string propname1, string propname2, ...])
     *     
     *  Parameters:
     *    viewmodel - string ID or instance of viewmodel
     *    propname1..N - viewmodel property names on which change state is maintained
     *               
     *    If any of parameters is indexed array the array items are expanded inline as function parameters.                 
     *             
     *  Returns:
     *    Computed viewmodel property.      
     */   
    ko.ng_dataversion = function ()
    {
      var fargs=expand_args(arguments);
      var initialized=false;
      var version = ko.observable(1);
      
      return ko.ng_noserialize(ko.computed({
        read: function() {
          if(!fargs || fargs.length < 1) return version();
          var vm=viewmodel(fargs[0]);
          if(!vm) return version();
          if(!initialized)
          {
            var p;
            for(var i=1;i<fargs.length;i++)
            {
              p=vmGetFieldByID(vm,fargs[i]);                
              if((p)&&(typeof p.subscribe === 'function'))
                p.subscribe(function(newValue) { version(version()+1); });
            }
            initialized=true;
          }
          return version();
        }, 
        write: function(val) {
          val=parseInt(val);
          if(isNaN(val)) return;
          version(val);
        },
        owner: this})); 
    }

    function cmpprop(vm,propid)
    {
      if((ng_typeString(propid))&&(propid.length>1))
      {
        switch(propid.charAt(0))
        {
          case '$': 
            var p=vmGetFieldByID(vm,propid.substring(1,propid.length));
            if(p) return p;
            break;
          case '!':
          case '-':
            if((propid.length>2)&&(propid.charAt(1)=='$'))
            {
              var p=vmGetFieldByID(vm,propid.substring(2,propid.length));
              if(p) return p;
            }
            break;
        }
      }
      return cmpval(vm,propid);                
    }
    
    function cmpval(vm,propid)
    {
      if((ng_typeString(propid))&&(propid.length>1))
      {
        switch(propid.charAt(0))
        {
          case '$': 
            return vmGetFieldValueByID(vm,propid.substring(1,propid.length));
          case '!':
            if((propid.length>2)&&(propid.charAt(1)=='$'))
              return !vmGetFieldValueByID(vm,propid.substring(2,propid.length));
            break;
          case '-':
            if((propid.length>2)&&(propid.charAt(1)=='$'))
              return -vmGetFieldValueByID(vm,propid.substring(2,propid.length));
            break;
        }
      }
      if(typeof propid==='function') return propid(vm);
      return propid;
    }
    
    /*  Function: ko.ng_matches
     *  Creates computed viewmodel property which is set to TRUE if all enumerated 
     *  properties equals to specified values.
     *   
     *  Syntax:
     *    function *ko.ng_matches* (mixed viewmodel, string propname1, mixed val1 [, string propname2, mixed val2, ...])
     *     
     *  Parameters:
     *    viewmodel - string ID or instance of viewmodel
     *    propname1..N - viewmodel property names which values are compared 
     *    val1..N - values for comparsion, $ can be used to reference other viewmodel property 
     *    
     *    If any of parameters is indexed array the array items are expanded inline as function parameters.
     *             
     *  Returns:
     *    Computed viewmodel property.      
     */   
    ko.ng_matches = function ()
    {
      var fargs=expand_args(arguments);
      var initialized=false;
      var matches = ko.observable(false);
      
      function cmpmatches(vm) 
      { 
        var pval,val;
        var m=false;
        for(var i=1;i<fargs.length-1;i+=2)
        {
          pval=vmGetFieldValueByID(vm,fargs[i]);                
          val=cmpval(vm,fargs[i+1]);                
          if(i==1) m=ng_VarEquals(pval,val);
          else if(!ng_VarEquals(pval,val)) m=false;
          if(!m) break;
        }
        matches(m);
      }
              
      return ko.ng_noserialize(ko.computed(
        function() {          
          if(!fargs || fargs.length < 1) return matches();
          var vm=viewmodel(fargs[0]);
          if(!vm) return matches();
          if(!initialized)
          {
            var pval,val;
            var m=false;
            for(var i=1;i<fargs.length-1;i+=2)
            {
              (function() {
                var p=vmGetFieldByID(vm,fargs[i]);
                if(typeof p==='undefined') p=vmGetFieldValueByID(vm,fargs[i]);                
                var v=cmpprop(vm,fargs[i+1]);
                if(typeof v==='undefined') v=cmpval(vm,fargs[i+1]);                
                                      
                if((p)&&(typeof p.subscribe === 'function'))
                  p.subscribe(function (newValue) {
                    val=(typeof v === 'function' ? v() : v);
                    if(newValue!=val) matches(false);
                    else cmpmatches(vm);
                  });
                if((v)&&(typeof v.subscribe === 'function'))
                  v.subscribe(function (newValue) {
                    pval=(typeof p === 'function' ? p() : p);
                    if(newValue!=pval) matches(false);
                    else cmpmatches(vm);
                  });
                pval=(typeof p === 'function' ? p() : p);
                val=(typeof v === 'function' ? v() : v);
              })();
              if(i==1) m=ng_VarEquals(pval,val);
              else if(!ng_VarEquals(pval,val)) m=false;
            }
            matches(m);
            initialized=true;
          }
          return matches();
        }, this)); 
    }

    /*  Function: ko.ng_matches_one
     *  Creates computed viewmodel property which is set to TRUE if at least one of enumerated 
     *  properties equal to specified value.
     *   
     *  Syntax:
     *    function *ko.ng_matches_one* (mixed viewmodel, string propname1, mixed val1 [, string propname2, mixed val2, ...])
     *     
     *  Parameters:
     *    viewmodel - string ID or instance of viewmodel
     *    propname1..N - viewmodel property names which values are compared 
     *    val1..N - values for comparsion, $ can be used to reference other viewmodel property 
     *    
     *    If any of parameters is indexed array the array items are expanded inline as function parameters.
     *         
     *  Returns:
     *    Computed viewmodel property.      
     */   
    ko.ng_matches_one = function ()
    {
      var fargs=expand_args(arguments);
      var initialized=false;
      var matches = ko.observable(false);
      
      function cmpmatches(vm) 
      { 
        var pval,val;
        var m=false;
        for(var i=1;i<fargs.length-1;i+=2)
        {
          pval=vmGetFieldValueByID(vm,fargs[i]);                
          val=cmpval(vm,fargs[i+1]);                
          if(i==1) m=ng_VarEquals(pval,val);
          else if(ng_VarEquals(pval,val)) m=true;
          if(m) break;
        }
        matches(m);
      }
              
      return ko.ng_noserialize(ko.computed(
        function() {
          if(!fargs || fargs.length < 1) return matches();
          var vm=viewmodel(fargs[0]);
          if(!vm) return matches();
          if(!initialized)
          {
            var pval,val;
            var m=false;
            for(var i=1;i<fargs.length-1;i+=2)
            {
              (function() {
                var p=vmGetFieldByID(vm,fargs[i]);
                if(typeof p==='undefined') p=vmGetFieldValueByID(vm,fargs[i]);                
                var v=cmpprop(vm,fargs[i+1]);
                if(typeof v==='undefined') v=cmpval(vm,fargs[i+1]);                
                                      
                if((p)&&(typeof p.subscribe === 'function'))
                  p.subscribe(function (newValue) {
                    val=(typeof v === 'function' ? v() : v);
                    if(newValue==val) matches(true);
                    else cmpmatches(vm);
                  });
                if((v)&&(typeof v.subscribe === 'function'))
                  v.subscribe(function (newValue) {
                    pval=(typeof p === 'function' ? p() : p);
                    if(newValue==pval) matches(true);
                    else cmpmatches(vm);
                  });
                pval=(typeof p === 'function' ? p() : p);
                val=(typeof v === 'function' ? v() : v);
              })();
              if(i==1) m=ng_VarEquals(pval,val);
              else if(ng_VarEquals(pval,val)) m=true;
            }
            matches(m);
            initialized=true;
          }
          return matches();
        }, this)); 
    }

    /*  Function: ko.ng_timer
     *  Creates computed viewmodel property which is repeatedly updated on specified interval.
     *  The value of this property is date and time of last update.      
     *   
     *  Syntax:
     *    function *ko.ng_timer* (int interval)
     *     
     *  Parameters:
     *    interval - update interval in milliseconds 
     *             
     *  Returns:
     *    Computed viewmodel property.      
     */   
    ko.ng_timer = function (interval)
    {
      var val = ko.observable(new Date());
      var timer_interval=0;
      
      function inittimer(interval) {
        interval=parseInt(interval);
        if(isNaN(interval)) return;

        var timer = null;
        if(timer_interval==interval) return;
        
        if(interval>0) 
        {
          if(timer) clearInterval(timer);
          timer=setInterval(function () {
            val(new Date());
          },interval);
        }
        else 
        {
          clearInterval(timer); 
          timer=null; 
        }
        timer_interval=interval;
      }
      
      inittimer(interval);
      
      return ko.ng_noserialize(ko.computed({
        read:  function()  { return val(); }, 
        write: function(i) { inittimer(i); },
        owner: this})); 
    };

    /*  Function: ko.ng_lookup
     *  Creates computed viewmodel property which transforms value of given property to value in lookup table. 
     *   
     *  Syntax:
     *    function *ko.ng_lookup* (mixed viewmodel, string propname, mixed lookupviewmodel, string lookuppropname, string lookupkeyfield='Value', lookupdatafield='Text')
     *     
     *  Parameters:
     *    viewmodel - string ID or instance of viewmodel
     *    propname - viewmodel property to be transformed 
     *    lookupviewmodel - string ID or instance of lookup viewmodel  
     *    lookuppropname - lookup viewmodel property where lookup table is stored
     *    lookupkeyfield - property name where key is stored in lookup table 
     *    lookupdatafield - property name where transformed value is stored in lookup table, if null or undefined the transformed value is whole lookup table item                
     *         
     *  Returns:
     *    Computed viewmodel property.      
     */   
    ko.ng_lookup = function (viewModel, propname, lookupviewmodel, lookuppropname, lookupkeyfield, lookupdatafield)
    {
      lookupkeyfield=ngVal(lookupkeyfield,'Value');
      lookupdatafield=ngVal(lookupdatafield,'Text');

      return ko.ng_noserialize(ko.computed({
        read: function() {
          var vm=viewmodel(viewModel);
          var pval=vmGetFieldValueByID(vm,propname);

          var lvm=viewmodel(lookupviewmodel);
          var lpval=vmGetFieldValueByID(lvm,lookuppropname);
          
          if(!ng_typeArray(lpval)) return; // undefined
          
          for(var i=0;i<lpval.length;i++)
          {
            if((lpval[i]!==null)&&(ng_typeObject(lpval[i]))
             &&(ng_VarEquals(lpval[i][lookupkeyfield],pval)))
            {
              if((typeof lookupdatafield === 'undefined')||(lookupdatafield === null)) return lpval[i]; // if lookupdatafield is not defined, return whole object 
              return lpval[i][lookupdatafield];
            }
          }
          // not found, undefined          
        }, 
        write: function(val) {
          var vm=viewmodel(viewModel);

          var lvm=viewmodel(lookupviewmodel);
          var lpval=vmGetFieldValueByID(lvm,lookuppropname);
          
          if(!ng_typeArray(lpval)) return; 

          var cmpval;          
          for(var i=0;i<lpval.length;i++)
          {
            if((lpval[i]!==null)&&(ng_typeObject(lpval[i])))
            {
              if((typeof lookupdatafield === 'undefined')||(lookupdatafield === null)) 
                cmpval=lpval[i]; // if lookupdatafield is not defined, compare whole object
              else 
                cmpval=lpval[i][lookupdatafield];
              if(ng_VarEquals(cmpval,val))
              {
                vmSetFieldValueByID(vm,propname,lpval[i][lookupkeyfield]);
                return;
              }
            }
          }
          var undefined;
          vmSetFieldValueByID(vm,propname,undefined);        
        },
        owner: this})); 
    };

    /*  Function: ng_array_item
     *  Creates computed indexed array item accessor.
     *  Allows binding of non-observable array items.
     *
     *  Syntax:
     *    function *ko.ng_array_item* (observable arr, mixed idx)
     *
     *  Parameters:
     *    arr - an array
     *    idx - item index (can be observable)
     *
     *  Returns:
     *    Computed viewmodel property.
     */
    ko.ng_array_item=function(arr,idx) {
      return ko.ng_noserialize(ko.computed({
        read: function() {
          var a=arr();
          var i=idx;
          if(ko.isObservable(i)) i=i();
          if(ng_typeArray(a)) {
            return a[i];
          }
          // return undefined;
        },
        write: function(v) {
          var a=arr();
          if(!ng_typeArray(a)) {
            a=[];
            arr(a);
          }
          var i=idx;
          if(ko.isObservable(i)) i=i();
          a[i]=v;
          arr.valueHasMutated();
        },
        owner: this}));
    };

    /*  Function: ko.ng_fielddef
     *  Encapsulates <ngFieldDef> into viewmodel.
     *   
     *  Syntax:
     *    <ngFieldDef> *ko.ng_fielddef* (mixed viewmodel, <ngFieldDef> fielddef [, mixed value])
     *     
     *  Parameters:
     *    viewmodel - instance of viewmodel
     *    fielddef - <ngFieldDef> which schould be part of the viewmodel
     *    value - optional initial value of <ngFieldDef>             
     *             
     *  Returns:
     *    Encapsulated <ngFieldDef> as viewmodel property.      
     */   
    ko.ng_fielddef = function(vm,fd,value) {

      if((!ng_typeObject(vm))||(!ng_typeObject(fd))||(ngVal(fd.ID,'')=='')) return;

      var parent=vm;
      var p=vm;
      var pids=fd.ID.split('.');
      for(var i=0;i<pids.length-1;i++)
      {
        parent=p[pids[i]];
        if(ng_isEmpty(parent)) parent=vm[pids[i]]={};
        if((!ng_typeObject(parent))||(ngIsFieldDef(parent))) return; // invalid path
        p=parent;        
      }
      var fid=pids[pids.length-1];

      parent[fid]=fd;
      ng_SetByRef(fd,'Owner',vm);

      var val;
      var isarray  = (fd.DataType==='ARRAY');
      var isobject = (fd.DataType==='OBJECT');

      if(typeof value === 'undefined') {
        value=fd.Attrs['Value'];
        delete fd.Attrs['Value'];
      }

      if(ko.isObservable(value))
      {
        defaultval=ng_CopyVar(value());
        isarray = isarray || ng_IsArrayVar(defaultval);
        val=value;
      }
      else 
      {
        if(typeof value==='undefined') defaultval=fd.GetTypedDefaultValue();
        else defaultval=ng_CopyVar(value);
        isarray = isarray || ng_IsArrayVar(defaultval);
        val=(isarray ? ko.observableArray(defaultval) : ko.observable(defaultval));
      }

      // Create OBJECT binding access
      if((isobject)&&(ng_typeObject(fd.PropsFieldDefs))) {

        var pfd,v=val();
        var writing_properties=false;

        val.subscribe(function(v) {
          if(writing_properties) return;
          fd.Value(v);
        });
        var objprops={};
        for(var k in fd.PropsFieldDefs) {
          pfd=fd.PropsFieldDefs[k];
          if(ngIsFieldDef(pfd)) {
            ko.ng_fielddef(objprops,pfd,vmGetFieldByID(v,k));
            pfd=pfd.Value;
          }
          else objprops[k]=pfd;
          if(ko.isObservable(pfd)) {
            pfd.subscribe(function(v) {
              if(writing_properties) return;
              writing_properties=true;
              var isempty=fd.NullIfEmpty ? true : false;
              try {
                var pfd,r={};
                for(var k in fd.PropsFieldDefs)
                {
                  pfd=fd.PropsFieldDefs[k];
                  if(ngIsFieldDef(pfd))
                  {
                    if(pfd.PrivateField) continue;
                    if(typeof pfd.TypedValue === 'function')
                    {
                      try {
                        pfd=pfd.GetTypedValue();
                        if((isempty)&&(!ng_isEmptyObject(pfd))) isempty=false;
                        vmSetFieldValueByID(r,k,pfd);
                        continue;
                      }
                      catch(e) {
                      }
                    }
                    pfd=pfd.Value;
                  }
                  if(ko.isObservable(pfd)) pfd=pfd();
                  if((isempty)&&(!ng_isEmptyObject(pfd))) isempty=false;
                  vmSetFieldValueByID(r,k,pfd);
                }
              } finally {
                if(isempty) r=null;
                val(r);
                writing_properties=false;
              }
            });
          }
        }
      }
      // Create ARRAY binding access
      if(isarray) {
        var items_fd={};

        fd.ClearFieldDefs=function() {
          for(var i in items_fd) delete items_fd[i];
          items_fd={};
        };
        fd.Item=function(idx,create) {

          function arritem(idx, create) {
            if((typeof idx==='undefined')||(idx<0)) return;

            var sidx=''+idx;
            if(typeof items_fd[sidx] === 'undefined')
            {
              if(!ngVal(create,true)) return;
              var valAccessor=ko.computed({
                read: function() {
                  var a=val();
                  if(ng_typeArray(a)) return a[idx];
                  // return undefined;
                },
                write: function(v) {
                  if(writeallowed()) {
                    var a=val();
                    var pack=(ngVal(fd.Attrs['RemoveEmptyItems'],false));
                    if(!ng_typeArray(a)) {
                      if((pack)&&(ng_isEmptyOrNull(v))) return;
                      a=[];
                      val(a);
                    }
                    if(idx>=a.length) {
                      if(ng_isEmptyOrNull(v)) {
                        if(pack) return;
                        if((ngIsFieldDef(fd.ValueFieldDef))&&(ng_typeObject(fd.ValueFieldDef.PropsFieldDefs)))
                        {
                          // array of objects and writing undefined after end -> array was shrinked
                          return;
                        }
                      }
                    }
                    else
                      if(ng_VarEquals(a[idx],v)) return;

                    val.valueWillMutate();
                    a[idx]=v;
                    val.valueHasMutated();
                  }
                },
                owner: vm
              });

              if(ngIsFieldDef(fd.ValueFieldDef))
              {
                var ifd=ng_CopyVar(fd.ValueFieldDef);
                ng_SetByRef(ifd,'Parent',fd);
                ifd.ID=sidx;
                ko.ng_fielddef(items_fd,ifd,valAccessor);
              }
              else items_fd[sidx]=valAccessor;
            }
            return items_fd[sidx];
          }
          if(ko.isObservable(idx)) {
            return ko.computed({
              read: function() {
                return arritem(idx(),create);
              },
              owner: vm
            });
          }
          else return arritem(idx,create);
        };
      }

      function writeallowed()
      {
        return (ko.isWriteableObservable(val))&&((!ngVal(fd.ReadOnly,false))||(ngVal(fd.__Loading,false)));
      }
      
      function array_writeallowed(reqarray)
      {
        if(writeallowed())
        {
          var isarray=(ng_typeArray(val()));
          if((reqarray)&&(!isarray))
          {
            isarray=true;
            val([]);  
          } 
          return isarray;
        }
        return false;
      }
      
      if(isobject) {
        fd.Value=ko.computed({
          read: function() {
            return val();
          },
          write: function(v) {
            if(writeallowed()) {
              var isempty=fd.NullIfEmpty ? true : false;
              if(ng_typeObject(fd.PropsFieldDefs)) {
                if(writing_properties) return;
                if(ng_typeString(v)) {
                  try { v=JSON.parse(v); } catch(e) {}
                }
                var pfd,pv;
                writing_properties=true;

                try {
                  if(ng_typeObject(v)) {
                    for(var k in fd.PropsFieldDefs) {
                      pfd=fd.PropsFieldDefs[k];
                      pv=vmGetFieldByID(v,k);
                      if(ngIsFieldDef(pfd)) {
                        if(typeof pfd.TypedValue === 'function')
                        {
                          try {
                            pv=pfd.TypedValue(pv);
                          }
                          catch(e)
                          {
                          }
                        }
                        pfd=pfd.Value;
                      }
                      if((isempty)&&(!ng_isEmptyObject(pv))) isempty=false;
                      if(ko.isObservable(pfd)) pfd(pv);
                      else vmSetFieldValueByID(objprops,k,pv);
                    }
                  }
                  else {
                    for(var k in fd.PropsFieldDefs) {
                      pfd=fd.PropsFieldDefs[k];
                      if(ngIsFieldDef(pfd)) pfd=pfd.Value;
                      if(ko.isObservable(pfd)) pfd(undefined);
                      else vmSetFieldValueByID(objprops,k,undefined);
                    }
                  }
                } finally {
                  if(isempty) v=null;
                  val(v);
                  writing_properties=false;
                }
                return;
              }
              val(v);
            }
          },
          owner: vm});
        fd.Properties=objprops;
      }
      else {
        fd.Value=ko.computed({
          read: function() {
            return val();
          },
          write: function(v) {
            if(writeallowed()) val(v);
          },
          owner: vm});
      }

      if(ngVal(fd.Attrs['Serialize'],true)) ko.ng_serialize(fd.Value);
      if(isarray)
      {      
        fd.Value.count= ko.computed(function() {
            var v=val();
            if(ng_typeArray(v)) return v.length;
            return 0;
          },vm);

        fd.Value.valueWillMutate = function() {
          val.valueWillMutate(); 
        }
        fd.Value.valueHasMutated = function() {
          val.valueHasMutated();
        }

        fd.Value.remove= function() {
          if(array_writeallowed(true)) return val.remove.apply(val,arguments);
          else return; // undefined
        }
        fd.Value.removeAll= function() {
          if(array_writeallowed(true)) return val.removeAll();
          else return [];
        }
        
        fd.Value.indexOf = function(v) { return (ng_typeArray(val()) ? val.indexOf(v) : -1); }
        fd.Value.lastIndexOf = function(v) { return (ng_typeArray(val()) ? val.lastIndexOf(v) : -1); }

        fd.Value.pop= function() {
          if(array_writeallowed()) return val.pop.apply(val,arguments);
          else return; // undefined
        }
        fd.Value.push= function() {          
          if(array_writeallowed(true)) return val.push.apply(val,arguments);
          else return (ng_typeArray(val()) ? val().length : 0);
        }
        fd.Value.reverse= function() {
          if(array_writeallowed(true)) return val.reverse.apply(val,arguments);
          else return val();
        }
        fd.Value.shift= function() {
          if(array_writeallowed(true)) return val.shift.apply(val,arguments);
          else return; // undefined
        }
        fd.Value.sort= function() {
          if(array_writeallowed(true)) return val.sort.apply(val,arguments);
          else return val();
        }
        fd.Value.unshift= function() {
          if(array_writeallowed(true)) return val.unshift.apply(val,arguments);
          else return (ng_typeArray(val()) ? val().length : 0);
        }
        fd.Value.splice= function() {
          if(array_writeallowed(true)) return val.splice.apply(val,arguments);
          else return [];
        }
        fd.Value.slice= function() {
          if(!ng_typeArray(val())) return [];
          return val.slice.apply(val,arguments);
        }        
      } 
      fd.Value.FieldDef = fd;
            
      // Make description observable
      if(!ko.isObservable(fd.DisplayName))
      {
        var nameid=fd.ID;
        var pfd=fd;
        while(1) {
          if(!pfd.Parent) break;
          pfd=pfd.Parent;
          nameid=pfd.ID+'.'+nameid;
        }
        var pvm=pfd.Owner;
        if(ng_isEmptyOrNull(fd.DisplayName))
        {
          if((pvm.Owner)&&(ngVal(pvm.Owner.Namespace,'')!=''))
          {
            var dn=ngTxt('VM.'+pvm.Owner.Namespace+'.'+nameid,'');
            if(dn!='') fd.DisplayName=dn;
          }
          else fd.DisplayName=nameid;
        } 
        var displayname=ko.observable(fd.DisplayName);
        fd.DisplayName=ko.ng_serialize(
         ko.computed({
           read: function() {
             var dn=displayname();
             if((ng_isEmptyOrNull(dn))&&(pvm.Owner)&&(ngVal(pvm.Owner.Namespace,'')!='')) {
               dn=ngTxt('VM.'+pvm.Owner.Namespace+'.'+nameid,nameid);
             }
             return dn;
           }, 
           write: function(v) {
             displayname(v);
           },
           owner: vm})
        );
      }

      var error = ko.ng_noserialize(
        ko.computed(function() { return ngVal(fd.FormatError(fd.Validate(val())),''); },vm)
      );
      fd.Error=error;
      fd.Error.FieldDef = fd;
      fd.IsValid=ko.ng_noserialize(
        ko.computed(function() { return (error()===''); },vm)
      );
      return fd; 
    };

/*    ko.ng_timestamp = function ()
    {
    };*/
    
/*    ko.ng_md5 = function ()
    {
    };*/

  }
};