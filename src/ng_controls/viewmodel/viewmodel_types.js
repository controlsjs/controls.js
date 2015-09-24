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

/*  Class: ngFieldDef_Bool
 *  <ngViewModel> Boolean field (based on <ngFieldDef> BOOL).
 *  
 *  Syntax:
 *    new *ngFieldDef_Bool* ([string id ='', object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngFieldDef_Bool(id, attrs) {
  ngFieldDefCreateAs(this,id,'BOOL',attrs);
}

/*  Class: ngFieldDef_Integer
 *  <ngViewModel> Integer field (based on <ngFieldDef> INTEGER).
 *  
 *  Syntax:
 *    new *ngFieldDef_Integer* ([string id ='', object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngFieldDef_Integer(id, attrs) {
  ngFieldDefCreateAs(this,id,'INTEGER',attrs);
}

/*  Class: ngFieldDef_Float
 *  <ngViewModel> Float field (based on <ngFieldDef> FLOAT).
 *  
 *  Syntax:
 *    new *ngFieldDef_Float* ([string id ='', object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngFieldDef_Float(id, attrs) {
  ngFieldDefCreateAs(this,id,'FLOAT',attrs);
}

/*  Class: ngFieldDef_SByte
 *  <ngViewModel> Signed byte field (based on <ngFieldDef> SBYTE).
 *  
 *  Syntax:
 *    new *ngFieldDef_SByte* ([string id ='', object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngFieldDef_SByte(id, attrs) {
  ngFieldDefCreateAs(this,id,'SBYTE',attrs);
}

/*  Class: ngFieldDef_Byte
 *  <ngViewModel> Byte field (based on <ngFieldDef> BYTE).
 *  
 *  Syntax:
 *    new *ngFieldDef_Byte* ([string id ='', object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngFieldDef_Byte(id, attrs) {
  ngFieldDefCreateAs(this,id,'BYTE',attrs);
}

/*  Class: ngFieldDef_Short
 *  <ngViewModel> Short field (based on <ngFieldDef> SHORT).
 *  
 *  Syntax:
 *    new *ngFieldDef_Short* ([string id ='', object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngFieldDef_Short(id, attrs) {
  ngFieldDefCreateAs(this,id,'SHORT',attrs);
}

/*  Class: ngFieldDef_UShort
 *  <ngViewModel> Unsigned short field (based on <ngFieldDef> USHORT).
 *  
 *  Syntax:
 *    new *ngFieldDef_UShort* ([string id ='', object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngFieldDef_UShort(id, attrs) {
  ngFieldDefCreateAs(this,id,'USHORT',attrs);
}

/*  Class: ngFieldDef_Long
 *  <ngViewModel> Long field (based on <ngFieldDef> LONG).
 *  
 *  Syntax:
 *    new *ngFieldDef_Long* ([string id ='', object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngFieldDef_Long(id, attrs) {                    
  ngFieldDefCreateAs(this,id,'LONG',attrs);
}

/*  Class: ngFieldDef_ULong
 *  <ngViewModel> Unsigned long field (based on <ngFieldDef> ULONG).
 *  
 *  Syntax:
 *    new *ngFieldDef_ULong* ([string id ='', object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngFieldDef_ULong(id, attrs) {
  ngFieldDefCreateAs(this,id,'ULONG',attrs);
}

/*  Class: ngFieldDef_Decimal
 *  <ngViewModel> Decimal field (based on <ngFieldDef> DECIMAL).
 *  
 *  Syntax:
 *    new *ngFieldDef_Decimal* ([string id ='', object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngFieldDef_Decimal(id, attrs) {
  ngFieldDefCreateAs(this,id,'DECIMAL',attrs);
}

/*  Class: ngFieldDef_String
 *  <ngViewModel> String field (based on <ngFieldDef> NVARCHAR).
 *  
 *  Syntax:
 *    new *ngFieldDef_String* ([string id ='', object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngFieldDef_String(id, attrs) {
  ngFieldDefCreateAs(this,id,((ng_typeObject(attrs))&&(attrs['Size']>0)) ? 'NVARCHAR' : 'STRING',attrs);
}

/*  Class: ngFieldDef_Timestamp
 *  <ngViewModel> Timestamp field (based on <ngFieldDef> TIMESTAMP).
 *  
 *  Syntax:
 *    new *ngFieldDef_Timestamp* ([string id ='', object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngFieldDef_Timestamp(id, attrs) {
  ngFieldDefCreateAs(this,id,'TIMESTAMP',attrs);
}

/*  Class: ngFieldDef_DateTime
 *  <ngViewModel> Date and time field (based on <ngFieldDef> DATETIME).
 *  
 *  Syntax:
 *    new *ngFieldDef_DateTime* ([string id ='', object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngFieldDef_DateTime(id, attrs) {
  ngFieldDefCreateAs(this,id,'DATETIME',attrs);
}

/*  Class: ngFieldDef_Date
 *  <ngViewModel> Date field (based on <ngFieldDef> DATE).
 *  
 *  Syntax:
 *    new *ngFieldDef_Date* ([string id ='', object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngFieldDef_Date(id, attrs) {
  ngFieldDefCreateAs(this,id,'DATE',attrs);
}

/*  Class: ngFieldDef_Time
 *  <ngViewModel> Time field (based on <ngFieldDef> TIME).
 *  
 *  Syntax:
 *    new *ngFieldDef_Time* ([string id ='', object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngFieldDef_Time(id, attrs) {
  ngFieldDefCreateAs(this,id,'TIME',attrs);
}

/*  Class: ngFieldDef_UTCTimestamp
 *  <ngViewModel> UTC timestamp field (based on <ngFieldDef> UTCTIMESTAMP).
 *  
 *  Syntax:
 *    new *ngFieldDef_UTCTimestamp* ([string id ='', object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngFieldDef_UTCTimestamp(id, attrs) {
  ngFieldDefCreateAs(this,id,'UTCTIMESTAMP',attrs);
}

/*  Class: ngFieldDef_UTCDateTime
 *  <ngViewModel> UTC date and time field (based on <ngFieldDef> UTCDATETIME).
 *  
 *  Syntax:
 *    new *ngFieldDef_UTCDateTime* ([string id ='', object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngFieldDef_UTCDateTime(id, attrs) {
  ngFieldDefCreateAs(this,id,'UTCDATETIME',attrs);
}

/*  Class: ngFieldDef_UTCDate
 *  <ngViewModel> UTC date field (based on <ngFieldDef> UTCDATE).
 *  
 *  Syntax:
 *    new *ngFieldDef_UTCDate* ([string id ='', object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngFieldDef_UTCDate(id, attrs) {
  ngFieldDefCreateAs(this,id,'UTCDATE',attrs);
}

/*  Class: ngFieldDef_UTCTime
 *  <ngViewModel> UTC time field (based on <ngFieldDef> UTCTIME).
 *  
 *  Syntax:
 *    new *ngFieldDef_UTCTime* ([string id ='', object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngFieldDef_UTCTime(id, attrs) {
  ngFieldDefCreateAs(this,id,'UTCTIME',attrs);
}

function ngfd_ArrayDoTypedValue(v)
{
  if(v===null) return null;
  var r;
  if(typeof v!=='object')
    throw new ngFieldDefException(this, FIELDDEF_ERR_TYPE); // type error

  var pack=ngVal(this.Attrs['RemoveEmptyItems'],false);
  if(ngIsFieldDef(this.ValueFieldDef))
  {
    var errs=null;
    var fd=this.ValueFieldDef;
    r=[];
    for(var k in v)
    {
      try
      {
        if(typeof this.Item === 'function') {
          fd=this.Item(k,false);
          if(!ngIsFieldDef(fd)) fd=this.ValueFieldDef;
        }
        var val=v[k];
        if(ngIsFieldDef(val)) val=val.Value;
        if(ko.isObservable(val)) val=val();
        val=fd.TypedValue(val);
        if(pack) {
          if(ng_isEmptyOrNull(val)) continue;
          r.push(val);
        }
        else r[k]=val;
      }
      catch(e)
      {
        if(typeof this.Item === 'function') e.FieldDef=this.Item(k); // Get ngFieldDef for item (if available)
        else {
          e.FieldDef=ng_CopyVar(this.ValueFieldDef);
          e.FieldDef.ID=k;
        }
        if(errs===null) errs={};
        errs[k]=e;
      }
    }
    if(errs!==null)
    {
      throw new ngFieldDefException(this, FIELDDEF_ERR_TYPE,'viewmodel_err_arrayitem',null,errs); // type error
    }
  }
  else {
    if(!pack) r=v;
    else {
      var val;
      r=[];
      for(var k in v)
      {
        val=v[k];
        if(ng_isEmptyOrNull(val)) continue;
        r.push(val);
      }
    }
  }
  return r;
}

function ngfd_ArrayFormatItemError(err)
{
  return ngTxt('viewmodel_err_type');
}

function ngfd_ArrayFormatError(err)
{
  if(err.ErrorMessage=='viewmodel_err_arrayitem') {
    return this.DoFormatItemError(err);
  }
  return ng_ViewModelFormatError(err);  
}

function ngfd_ArrayGetChildFieldByID(propid)
{
  if(typeof this.Item === 'function') {
    var pid,i=propid.indexOf('.');
    if(i>=0) {
      pid=propid.substr(i+1,propid.length-i);
      propid=propid.substr(0,i);
    }
    else pid='';
    var item=this.Item(ng_toInteger(propid));  // Get ngFieldDef for item (if available)
    if(pid!='') item=vmGetFieldByID(item,pid);
    return item;
  }
  return; // undefined
}

/*  Class: ngFieldDef_Array
 *  <ngViewModel> Array field (based on <ngFieldDef> ARRAY).
 *  
 *  Syntax:
 *    new *ngFieldDef_Array* ([string id ='', object attrs={}, object valfielddef=null])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 *    valfielddef - ngFieldDef instance used for array value type casting and validation, null if validation is not required 
 */    
function ngFieldDef_Array(id, attrs, valfielddef) {
  ngFieldDefCreateAs(this,id,'ARRAY',attrs);
  this.ValueFieldDef=ngVal(valfielddef,null);
  if(ng_typeObject(this.ValueFieldDef)) ng_SetByRef(this.ValueFieldDef,'Parent',this);
  this.DoTypedValue = ngfd_ArrayDoTypedValue;
  this.DoFormatError = ngfd_ArrayFormatError;  
  this.DoFormatItemError = ngfd_ArrayFormatItemError;
  this.GetChildFieldByID = ngfd_ArrayGetChildFieldByID;
}

function ngfd_ObjectDoTypedValue(v)
{
  if(v===null) return null;
  var r;
  if(ng_typeObject(this.PropsFieldDefs))
  {
    r={};
    var isempty=this.NullIfEmpty ? true : false;
    var fd,errs=null;
    for(var k in this.PropsFieldDefs)
    {
      try
      {
        var val=vmGetFieldByID(v,k);
        fd=this.PropsFieldDefs[k];
        if(ngIsFieldDef(val))
        {
          if(val.PrivateField) continue;
          val=val.Value;
        }
        if(ko.isObservable(val)) val=val();
        if(ngIsFieldDef(fd)) val=fd.TypedValue(val);
        if((isempty)&&(!ng_isEmptyObject(val))) isempty=false;
        vmSetFieldValueByID(r,k,val);
      }
      catch(e)
      {
        if(errs===null) errs={};
        errs[k]=e;
      }
    }
    if(errs!==null)
    {
      throw new ngFieldDefException(this, FIELDDEF_ERR_TYPE,'viewmodel_err_objproperty',null,errs); // type error
    }
    if(isempty) r=null;
  }
  else {
    if(!ng_typeObject(v)) throw new ngFieldDefException(this, FIELDDEF_ERR_TYPE,'viewmodel_err_objproperty'); // type error
    else
    {
      if(this.NullIfEmpty) {
        var isempty=true;
        for(var k in v) {
          if(!ng_isEmptyObject(v[k])) { isempty=false; break; }
        }
        if(isempty) v=null;
      }
    }
    r=v;
  }
  return r;
}

function ngfd_ObjectDoFormatPropertyError(err)
{
  return ngTxt('viewmodel_err_type');
}

function ngfd_ObjectFormatError(err)
{
  if(err.ErrorMessage=='viewmodel_err_objproperty') {
    return this.DoFormatPropertyError(err);
  }
  return ng_ViewModelFormatError(err);  
}

function ngfd_ObjectGetChildFieldByID(propid)
{
  if(ng_typeObject(this.PropsFieldDefs)) {
    var p,i,pid='';

    while(propid!='') {
      p=this.PropsFieldDefs[propid];
      if(typeof p!=='undefined') {
        if(pid!='') p=vmGetFieldByID(p,pid);
        return p;
      }
      i=propid.lastIndexOf('.');
      if(i<0) break;
      if(pid!='') pid='.'+pid;
      pid=propid.substr(i+1,propid.length-i)+pid;
      propid=propid.substr(0,i);
    }
  }
  return; // undefined
}

/*  Class: ngFieldDef_Object
 *  <ngViewModel> Object field (based on <ngFieldDef> OBJECT).
 *  
 *  Syntax:
 *    new *ngFieldDef_Object* ([string id ='', object attrs={}, object propsfielddefs=null])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 *    propsfielddefs - associative array of ngFieldDef instances used for object properties value type casting and validation, null if validation is not required 
 */    
function ngFieldDef_Object(id, attrs, propsfielddefs) {
  ngFieldDefCreateAs(this,id,'OBJECT',attrs);
  var fd;
  if(ng_IsArrayVar(propsfielddefs))
  {
    var k={};
    for(var i=0;i<propsfielddefs.length;i++) {
      fd=propsfielddefs[i];
      if((ngIsFieldDef(fd))&&(fd.ID!='')) {
        k[fd.ID]=fd;
        ng_SetByRef(fd,'Parent',this);
      }
    }
    propsfielddefs=k;
  }
  else {
    if(ng_typeObject(propsfielddefs))
    {
      var k={};
      for(var i in propsfielddefs) {
        fd=propsfielddefs[i];
        if(ngIsFieldDef(fd)) {
          ng_SetByRef(fd,'Parent',this);
          fd.ID=''+i;
          k[fd.ID]=fd;
        }
        else k[i]=fd;
      }
      propsfielddefs=k;
    }
    else propsfielddefs=null;
  }
  this.PropsFieldDefs=propsfielddefs;

  this.DoTypedValue = ngfd_ObjectDoTypedValue;
  this.DoFormatError = ngfd_ObjectFormatError;  
  this.DoFormatPropertyError = ngfd_ObjectDoFormatPropertyError;
  this.GetChildFieldByID = ngfd_ObjectGetChildFieldByID;
}

function ngfd_WWWDoTypedValue(v)
{
  var s=ng_toString(v);
  if(s!='') 
  {
    v=ng_formatWWW(v,null);
    if(v===null) throw new ngFieldDefException(this, FIELDDEF_ERR, 'viewmodel_err_www');
  }
  return v;
}

/*  Class: ngFieldDef_WWW
 *  <ngViewModel> WWW string field (based on <ngFieldDef> NVARCHAR).
 *  
 *  Syntax:
 *    new *ngFieldDef_WWW* ([string id ='', object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngFieldDef_WWW(id, attrs)
{
  ngFieldDefCreateAs(this,id,((ng_typeObject(attrs))&&(attrs['Size']>0)) ? 'NVARCHAR' : 'STRING',attrs);
  this.DoTypedValue = ngfd_WWWDoTypedValue;
}

function ngfd_EmailParseAtSign(v, add)
{
  var s   = ng_toString(v);
      add = ng_toBool(add);

  if ((add)  && (s==''))  return '@';  //Add
  if ((!add) && (s=='@')) return '';   //Remove

  return s;
}

function ngfd_EmailParseString(v)
{
  return (ngVal(this.Attrs['AtSignIfEmpty'], true) ? this.ParseAtSign(v, false) : v);
}

function ngfd_EmailFormatString(v)
{
  return (ngVal(this.Attrs['AtSignIfEmpty'], true) ? this.ParseAtSign(v, false) : v);
}

function ngfd_EmailEditString(v)
{
  return (ngVal(this.Attrs['AtSignIfEmpty'], true) ? this.ParseAtSign(v, true) : v);
}

function ngfd_EmailDoTypedValue(v)
{
  var s=ng_toString(v);
  if((s!='')&&(!ng_isEmail(s))) throw new ngFieldDefException(this, FIELDDEF_ERR, 'viewmodel_err_email');
  return s;
}

/*  Class: ngFieldDef_Email
 *  <ngViewModel> Email string field (based on <ngFieldDef> NVARCHAR).
 *  
 *  Syntax:
 *    new *ngFieldDef_Email* ([string id ='', object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngFieldDef_Email(id, attrs)
{
  ngFieldDefCreateAs(this,id,((ng_typeObject(attrs))&&(attrs['Size']>0)) ? 'NVARCHAR' : 'STRING',attrs);
  this.DoTypedValue = ngfd_EmailDoTypedValue;
  this.ParseAtSign  = ngfd_EmailParseAtSign;

  this.DoParseString  = ngfd_EmailParseString;
  this.DoFormatString = ngfd_EmailFormatString;
  this.DoEditString   = ngfd_EmailEditString;
}

function ngfd_IP4DoTypedValue(v)
{
  var s=ng_toString(v);
  if((s!='')&&(!ng_isIP4(s))) throw new ngFieldDefException(this, FIELDDEF_ERR, 'viewmodel_err_ip4');
  return v;
}

/*  Class: ngFieldDef_IP4
 *  <ngViewModel> IP4 string field (based on <ngFieldDef> NVARCHAR).
 *  
 *  Syntax:
 *    new *ngFieldDef_IP4* ([string id ='', object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngFieldDef_IP4(id, attrs)
{
  ngFieldDefCreateAs(this,id,((ng_typeObject(attrs))&&(attrs['Size']>0)) ? 'NVARCHAR' : 'STRING',attrs);
  this.DoTypedValue = ngfd_IP4DoTypedValue;
}

function ngfd_IP6DoTypedValue(v)
{
  var s=ng_toString(v);
  if((s!='')&&(!ng_isIP6(s))) throw new ngFieldDefException(this, FIELDDEF_ERR, 'viewmodel_err_ip6');
  return v;
}

/*  Class: ngFieldDef_IP6
 *  <ngViewModel> IP6 string field (based on <ngFieldDef> NVARCHAR).
 *  
 *  Syntax:
 *    new *ngFieldDef_IP6* ([string id ='', object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngFieldDef_IP6(id, attrs)
{
  ngFieldDefCreateAs(this,id,((ng_typeObject(attrs))&&(attrs['Size']>0)) ? 'NVARCHAR' : 'STRING',attrs);
  this.DoTypedValue = ngfd_IP6DoTypedValue;
}

function ngfd_CurrencyFormatString(v)
{
  var prefix=ngVal(this.Attrs['CurrencyPrefix'],'');
  var suffix=ngVal(this.Attrs['CurrencySuffix'],'');

  var unit=ngVal(this.Attrs['CurrencyUnits'],'');
  if(unit!='') suffix+=' '+unit;
  
  v=ng_toDECIMAL(v,this.Size,this.Precision,null);
  if(v===null) return '';
  var zeros=ngVal(this.Attrs['Zeros'],1);
  if((zeros==0)||(zeros==1))
  {
    var i=v.lastIndexOf('.');
    if(i>=0)
    {
      for(var l=v.length-1;l>=i;l--)
      {
        if(v.charAt(l)=='.')
        {
           if(zeros==1) l++;
           else l--;
           break;
        }
        if(v.charAt(l)!='0') break;
      }
      v=v.substr(0,l+1);
    }
  }
  v=ng_Format3Num(v);
  if(suffix!='') v=ng_AddSuffix(v, suffix, true);
  if(prefix!='') v=ng_AddPrefix(v, prefix, true);
  return v; 
}

function ngfd_CurrencyParseString(v)
{           
  var prefix=ngVal(this.Attrs['CurrencyPrefix'],'');
  var suffix=ngVal(this.Attrs['CurrencySuffix'],'');

  var unit=ngVal(this.Attrs['CurrencyUnits'],'');
  if(unit!='') suffix=ng_Trim(suffix+' '+unit);

  if(suffix!='') v=ng_StripSuffix(v, suffix, true);
  if(prefix!='') v=ng_StripPrefix(v, prefix, true);
  
  return ng_toDECIMAL(ng_Unformat3Num(v),this.Size,this.Precision,null);
}

/*  Class: ngFieldDef_Currency
 *  <ngViewModel> Currency field (based on <ngFieldDef> DECIMAL).
 *  
 *  Syntax:
 *    new *ngFieldDef_Currency* ([string id ='', string units='', object attrs={}, string fieldtype = 'DECIMAL'])
 *    
 *  Parameters:
 *    id - field id
 *    units - currency unit 
 *    attrs - field attributes
 *    fieldtype - optional base data type 
 */    
function ngFieldDef_Currency(id, units, attrs, fieldtype)
{
  attrs=ngVal(attrs,{}); 
  fieldtype=ngVal(fieldtype,'DECIMAL');
  attrs['CurrencyUnits']=ngVal(units,'');
  if(fieldtype=='DECIMAL') {
    attrs['Size'] = ngVal(attrs['Size'],23);
    attrs['Precision'] = ngVal(attrs['Precision'],3);
  }
  ngFieldDefCreateAs(this,id,fieldtype,attrs);

  this.DoFormatString = ngfd_CurrencyFormatString;
  this.DoParseString = ngfd_CurrencyParseString;
}

function ngfd_DistanceFormatString(v) {
  return ng_formatDistance(v, '', ngVal(this.Precision,2));
}

function ngfd_DistanceParseString(v) {           
  return ng_parseDistance(v,null);
}

/*  Class: ngFieldDef_Distance
 *  <ngViewModel> Distance field (based on <ngFieldDef> FLOAT).
 *  
 *  Syntax:
 *    new *ngFieldDef_Distance* ([string id ='', object attrs={}, string fieldtype = 'FLOAT'])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 *    fieldtype - optional base data type 
 */    
function ngFieldDef_Distance(id, attrs, fieldtype)
{
  fieldtype=ngVal(fieldtype,'FLOAT');
  ngFieldDefCreateAs(this,id,fieldtype,attrs);

  this.DoFormatString = ngfd_DistanceFormatString;
  this.DoParseString = ngfd_DistanceParseString;
}

function ngfd_AreaFormatString(v) {
  return ng_formatArea(v, '', ngVal(this.Precision,2));
}

function ngfd_AreaParseString(v) {           
  return ng_parseArea(v,null);
}

/*  Class: ngFieldDef_Area
 *  <ngViewModel> Area field (based on <ngFieldDef> FLOAT).
 *  
 *  Syntax:
 *    new *ngFieldDef_Area* ([string id ='', object attrs={}, string fieldtype = 'FLOAT'])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 *    fieldtype - optional base data type 
 */    
function ngFieldDef_Area(id, attrs, fieldtype)
{
  fieldtype=ngVal(fieldtype,'FLOAT');
  ngFieldDefCreateAs(this,id,fieldtype,attrs);

  this.DoFormatString = ngfd_AreaFormatString;
  this.DoParseString = ngfd_AreaParseString;
}

function ngfd_SIUnitsFormatString(v) {
  var units=ng_toString(this.Attrs['SIUnits']);
  return ng_formatSIUnits(v, units, '', this.Attrs['SIAllowedPref'], ngVal(this.Precision,2));
}

function ngfd_SIUnitsParseString(v) {           
  var units=ng_toString(this.Attrs['SIUnits']);
  return ng_parseSIUnits(v, units, null, this.Attrs['SIAllowedPref']);
}

/*  Class: ngFieldDef_SIUnits
 *  <ngViewModel> SIUnits field (based on <ngFieldDef> FLOAT).
 *  
 *  Syntax:
 *    new *ngFieldDef_SIUnits* ([string id ='', string units='', object attrs={}, array allowedprefixes=undefined, string fieldtype = 'FLOAT'])
 *    
 *  Parameters:
 *    id - field id
 *    units - field units 
 *    attrs - field attributes
 *    allowedprefixes - allowed SI prefixes 
 *    fieldtype - optional base data type 
 */    
function ngFieldDef_SIUnits(id, units, attrs, allowedpref, fieldtype)
{
  attrs=ngVal(attrs,{}); 
  fieldtype=ngVal(fieldtype,'FLOAT');
  attrs['SIUnits']=ngVal(units,'');
  attrs['SIAllowedPref']=allowedpref;
  ngFieldDefCreateAs(this,id,fieldtype,attrs);

  this.DoFormatString = ngfd_SIUnitsFormatString;
  this.DoParseString = ngfd_SIUnitsParseString;
}

function ngfd_MinutesFormatString(v) {
  return ng_formatMinutes(v, '', ngVal(this.Precision,0)>0);
}

function ngfd_MinutesParseString(v) {           
  return ng_parseMinutes(v,null);
}

/*  Class: ngFieldDef_Minutes
 *  <ngViewModel> Minutes field (based on <ngFieldDef> FLOAT).
 *  
 *  Syntax:
 *    new *ngFieldDef_Minutes* ([string id ='', object attrs={}, string fieldtype = 'INTEGER'])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 *    fieldtype - optional base data type 
 */    
function ngFieldDef_Minutes(id, attrs, fieldtype)
{
  fieldtype=ngVal(fieldtype,'INTEGER');
  ngFieldDefCreateAs(this,id,fieldtype,attrs);

  this.DoFormatString = ngfd_MinutesFormatString;
  this.DoParseString = ngfd_MinutesParseString;
}

function ngfd_SecondsFormatString(v) {
  return ng_formatSeconds(v, '', ngVal(this.Precision,0)>0);
}

function ngfd_SecondsParseString(v) {           
  return ng_parseSeconds(v,null);
}

/*  Class: ngFieldDef_Seconds
 *  <ngViewModel> Seconds field (based on <ngFieldDef> FLOAT).
 *  
 *  Syntax:
 *    new *ngFieldDef_Seconds* ([string id ='', object attrs={}, string fieldtype = 'INTEGER'])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 *    fieldtype - optional base data type 
 */    
function ngFieldDef_Seconds(id, attrs, fieldtype)
{
  fieldtype=ngVal(fieldtype,'INTEGER');
  ngFieldDefCreateAs(this,id,fieldtype,attrs);

  this.DoFormatString = ngfd_SecondsFormatString;
  this.DoParseString = ngfd_SecondsParseString;
}

function ngfd_BytesFormatString(v) {
  return ng_formatBytes(v, '', ngVal(this.Precision,0)>0);
}

function ngfd_BytesParseString(v) {           
  return ng_parseBytes(v,null);
}

/*  Class: ngFieldDef_Bytes
 *  <ngViewModel> Bytes field (based on <ngFieldDef> FLOAT).
 *  
 *  Syntax:
 *    new *ngFieldDef_Bytes* ([string id ='', object attrs={}, string fieldtype = 'INTEGER'])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 *    fieldtype - optional base data type 
 */    
function ngFieldDef_Bytes(id, attrs, fieldtype)
{
  fieldtype=ngVal(fieldtype,'INTEGER');
  ngFieldDefCreateAs(this,id,fieldtype,attrs);

  this.DoFormatString = ngfd_BytesFormatString;
  this.DoParseString = ngfd_BytesParseString;
}

function ngfd_IsPhone(v) {
  return ng_isPhone(v,false,ngVal(this.Attrs['PhoneAllowShortcode'],false));
}

function ngfd_PhoneFormatString(v) {   
  return(this.IsPhone(v) ? ng_FormatPhone(v, v, ngVal(this.Attrs['PhoneZeros'],false),ngVal(this.Attrs['PhoneSeparator'],' ')) : v);
}

function ngfd_PhoneEditString(v) {
  var s=ng_UnformatPhone(v,v);
  return (this.IsPhone(s) ? s : v);
}   

function ngfd_PhoneParseString(v) {
  var s=ng_UnformatPhone(v,v);
  return (this.IsPhone(s) ? s : v);
}

function ngfd_PhoneFormatError(err)
{
  if(err.ErrorMessage=='viewmodel_err_invalidphoneprefix')
  {
    var prefixes='';
    var allowed=this.Attrs['PhoneAllowedPrefixes'];
    for(var i in allowed)
    {
      if(prefixes!='') prefixes+=', ';
      prefixes+=allowed[i];
    }
    if(prefixes=='') return ngTxt('viewmodel_err_invalidphoneprefix_novalue');
    return ng_sprintf(ngTxt('viewmodel_err_invalidphoneprefix'),prefixes);
  }
  return ng_ViewModelFormatError(err);  
}

function ngfd_PhoneTypedValue(v)
{
  if(v!=null)
  {
    var s=ng_toString(v,null);
    if(s===null) return s;
    
    var allowed=this.Attrs['PhoneAllowedPrefixes'];
    var allowscode=ngVal(this.Attrs['PhoneAllowShortcode'],false);

    var prefix=this.Attrs['PhonePrefix'];
    var op=ngVal(this.Attrs['PhonePrefixOperation'],!ng_isEmpty(prefix) ? NG_PHONE_PREFIX_ADD : NG_PHONE_PREFIX_DONTCHANGE);
    prefix=ngVal(prefix,'');

    var n=ng_NormalizePhone(s,op,prefix);
    if((n===false)||(!ng_isPhone(n,!ng_isEmpty(allowed) ? false : true,allowscode,this.Attrs['PhoneAllowedShortcodes']))) 
      throw new ngFieldDefException(this, FIELDDEF_ERR, 'viewmodel_err_notphone');
    
    if(!ng_isEmpty(allowed))
    {
      if((!allowscode)||(!ng_isShortCode(n)))
      {
        if(!ng_hasPhoneValidPrefix(n, false, allowed))
          throw new ngFieldDefException(this, FIELDDEF_ERR, 'viewmodel_err_invalidphoneprefix');
      }
    }
    v=n;
  }
  return v;  
}

/*  Class: ngFieldDef_Phone
 *  <ngViewModel> Phone field (based on <ngFieldDef> NVARCHAR).
 *  
 *  Syntax:
 *    new *ngFieldDef_Phone* ([string id ='', object attrs={}])
 *    
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */    
function ngFieldDef_Phone(id, attrs)
{
  this.Size=NG_PHONE_MAXLENGTH;
  ngFieldDefCreateAs(this,id,((ng_typeObject(attrs))&&(attrs['Size']>0)) ? 'NVARCHAR' : 'STRING',attrs);

  this.IsPhone = ngfd_IsPhone;
  
  this.DoFormatError = ngfd_PhoneFormatError;
  this.DoTypedValue = ngfd_PhoneTypedValue; 
  this.DoFormatString = ngfd_PhoneFormatString;
  this.DoEditString = ngfd_PhoneEditString;
  this.DoParseString = ngfd_PhoneParseString;
}

function ngfd_RegExpDoTypedValue(v)
{
  var s = ng_toString(v);
  if ((s!='') && (this.Attrs['RegExp']!=''))
  {
    var re     = new RegExp(this.Attrs['RegExp'], ngVal(this.Attrs['RegExpMods'], ''));
    var result = re.exec(s);
    if (!result) throw new ngFieldDefException(this, FIELDDEF_ERR, ngVal(this.Attrs['RegExpError'], 'viewmodel_err_format'));

    if (result.length>1)
    {
      v = '';
      for (var i=1;i<result.length;i++)
        v += result[i];
    }
  }

  return v;
}

/*  Class: ngFieldDef_RegExp
 *  <ngViewModel> RegExp string field (based on <ngFieldDef> NVARCHAR).
 *
 *  Syntax:
 *    new *ngFieldDef_RegExp* ([string id ='', object attrs={}])
 *
 *  Parameters:
 *    id - field id
 *    attrs - field attributes
 */
function ngFieldDef_RegExp(id, attrs)
{
  ngFieldDefCreateAs(this,id,((ng_typeObject(attrs))&&(attrs['Size']>0)) ? 'NVARCHAR' : 'STRING',attrs);
  this.DoTypedValue = ngfd_RegExpDoTypedValue;
}
