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

// --- Resources Utils ---------------------------------------------------------
var ngTypesLang = 'en';

function ngTypesTxt(t,defval)
{
  if((typeof ngApp === 'object')&&(ngApp)&&(typeof ngApp.Text === 'function')) return ngApp.Text(t, defval); // Use Controls resources
  if(typeof ngc_Lang === 'undefined') ngc_Lang={};
  var l=ngc_Lang[ngTypesLang];
  if(typeof l === 'undefined') l=ngc_Lang['en'];
  if(typeof l === 'undefined') return ngVal(defval, t); 
  return ngVal(l[t],ngVal(defval, t));  
} 

// --- Limits ------------------------------------------------------------------

var SBYTE_MIN  = -127;
var SBYTE_MAX  = 127;
var BYTE_MIN   = 0;
var BYTE_MAX   = 255;
var SHORT_MIN  = -32767;
var SHORT_MAX  = 32767;
var USHORT_MIN = 0;
var USHORT_MAX = 65535;
var LONG_MIN   = -2147483647;
var LONG_MAX   = 2147483647;
var ULONG_MIN  = 0;
var ULONG_MAX  = 4294967295;
  
/**
 *  Variable: ng_SIUnits
 *  Definitions of SI units.    
 *  
 */       
var ng_SIUnits = ng_SIUnits || [ 
  { name: 'yotta', prefix: 'Y',  ex: Math.pow(10,24),  binex: Math.pow(1024,8), notcommon: true  },
  { name: 'zetta', prefix: 'Z',  ex: Math.pow(10,21),  binex: Math.pow(1024,7), notcommon: true  },
  { name: 'exa',   prefix: 'E',  ex: 1e18,  binex: 1152921504606847000, notcommon: true  },
  { name: 'peta',  prefix: 'P',  ex: 1e15,  binex: 1125899906842624},
  { name: 'tera',  prefix: 'T',  ex: 1e12,  binex: 1099511627776},
  { name: 'giga',  prefix: 'G',  ex: 1e9,   binex: 1073741824},
  { name: 'mega',  prefix: 'M',  ex: 1e6,   binex: 1048576},
  { name: 'kilo',  prefix: 'k',  ex: 1e3,   binex: 1024},
  { name: 'hekto', prefix: 'h',  ex: 1e2,   binex: 0,  notcommon: true },
  { name: 'deka',  prefix: 'da', ex: 1e1,   binex: 0,  notcommon: true },
  { name: '',      prefix: '',   ex: 1,     binex: 1},
  { name: 'deci',  prefix: 'd',  ex: 1e-1,  binex: 0,  notcommon: true },
  { name: 'centi', prefix: 'c',  ex: 1e-2,  binex: 0},
  { name: 'mili',  prefix: 'm',  ex: 1e-3,  binex: 0},
  { name: 'mikro', prefix: 'µ',  ex: 1e-6,  binex: 0},
  { name: 'nano',  prefix: 'n',  ex: 1e-9,  binex: 0},
  { name: 'piko',  prefix: 'p',  ex: 1e-12, binex: 0},
  { name: 'femto', prefix: 'f',  ex: 1e-15, binex: 0},
  { name: 'atto',  prefix: 'a',  ex: 1e-18, binex: 0, notcommon: true  },
  { name: 'zepto', prefix: 'z',  ex: 1e-21, binex: 0, notcommon: true  },
  { name: 'yokto', prefix: 'y',  ex: 1e-24, binex: 0, notcommon: true  },
  
  // IEC Binary
  { name: 'yobi',  prefix: 'Yi',  ex: Math.pow(1024,8),     binex: Math.pow(1024,8), notcommon: true  },
  { name: 'zebi',  prefix: 'Zi',  ex: Math.pow(1024,7),     binex: Math.pow(1024,7), notcommon: true  },
  { name: 'exbi',  prefix: 'Ei',  ex: 1152921504606847000,  binex: 1152921504606847000, notcommon: true  },
  { name: 'pebi',  prefix: 'Pi',  ex: 1125899906842624,  binex: 1125899906842624,    notcommon: true},
  { name: 'tebi',  prefix: 'Ti',  ex: 1099511627776,     binex: 1099511627776,       notcommon: true},
  { name: 'gibi',  prefix: 'Gi',  ex: 1073741824,        binex: 1073741824,          notcommon: true},
  { name: 'mebi',  prefix: 'Mi',  ex: 1048576,           binex: 1048576,             notcommon: true},
  { name: 'kibi',  prefix: 'Ki',  ex: 1024,              binex: 1024,                notcommon: true},
    
  // JEDEC Binary
  { name: 'kilo',  prefix: 'K',  ex: 1e3,   binex: 1024, notcommon: true}  
];

function ng_GetDecimalSeparator() {

  var detected_ds;

  return function() {
    var ds=ngTypesTxt('decimal_separator','');
    if(ds!='') return ds;
    
    if(typeof detected_ds==='undefined') 
    {
      var n = 1.1;
      if(typeof n.toLocaleString === 'function')     
        detected_ds = n.toLocaleString().substring(1, 2);
      else
        detected_ds = '.';
    }
    return detected_ds;
  }
} 

/**
 *  Function: ng_DecimalSeparator
 *  Gets decimal separator according to current application language.    
 *  
 *  Syntax:
 *    mixed *ng_DecimalSeparator* ()
 *  
 *  Parameters:
 *    - 
 *  
 *  Returns:
 *    Decimal separator.
 */       
var ng_DecimalSeparator = ng_DecimalSeparator || ng_GetDecimalSeparator();

/**
 *  Function: ng_decodeSIUnits
 *  Decodes given units to units with exponent (square, quadratic).    
 *  
 *  Syntax:
 *    object *ng_decodeSIUnits* (string units)
 *  
 *  Parameters:
 *    units - units string to decode 
 *  
 *  Returns:
 *    Decoded units.
 */       
function ng_decodeSIUnits(units)
{
  units=''+units;
  if(units.length>1)
  {
    switch(units.charAt(units.length-1))
    {
      case '2':      
      case '²':
        return { units: units.substring(0,units.length-1), exp: 2 }; 
      case '3':
      case '³':
        return { units: units.substring(0,units.length-1), exp: 3 }; 
    }
  } 
  return { units: units, exp: 1 };
}

/**
 *  Function: ng_CompareSIUnits
 *  Compares two decoded units.    
 *  
 *  Syntax:
 *    bool *ng_CompareSIUnits* (object u1, object u2)
 *  
 *  Parameters:
 *    u1 - first decoded units 
 *    u2 - second decoded units 
 *  
 *  Returns:
 *    TRUE if units are identical.
 */       
function ng_CompareSIUnits(u1,u2)
{
  u1=ng_decodeSIUnits(u1);
  u2=ng_decodeSIUnits(u2);
  return ((u1.units==u2.units)&&(u1.exp==u2.exp));
}

/**
 *  Function: ng_StripSIUnits
 *  Strips units from given string.    
 *  
 *  Syntax:
 *    string *ng_StripSIUnits* (string v, string units)
 *  
 *  Parameters:
 *    v - string with units 
 *    units - dimension units 
 *  
 *  Returns:
 *    String without units.
 */       
function ng_StripSIUnits(v,units)
{  
  var s=ng_StripSuffix(v,units);
  if(s!=v) return s;
  s=ng_StripSuffix(v,units+'2');
  if(s!=v) return s;
  s=ng_StripSuffix(v,units+'3');
  if(s!=v) return s;
  s=ng_StripSuffix(v,units+'²');
  if(s!=v) return s;
  s=ng_StripSuffix(v,units+'³');
  if(s!=v) return s;
  return v;
}

/**
 *  Function: ng_getSIUnits
 *  Gets SI units definition from given string with units.    
 *  
 *  Syntax:
 *    string *ng_getSIUnits* (string v, string units[, mixed def=null])
 *  
 *  Parameters:
 *    v - string with units 
 *    units - dimension units 
 *    def - default value, used if SI units definition not founds      
 *  
 *  Returns:
 *    SI units definition or default value if not found.
 */       
function ng_getSIUnits(v,units,def)
{
  if(ngVal(units,'')!='')
  {
    var baseunit=ng_StripSIUnits(units,'');  
    var u,l,id=-1;
    v=''+v;
    for(var i=0;i<ng_SIUnits.length;i++)
    {
      if(ng_SIUnits[i].prefix=='') { id=i; continue; }
      u=ng_SIUnits[i].prefix+units;
      l=v.length-(''+ng_StripSIUnits(v,ng_SIUnits[i].prefix+baseunit)).length;      
      if((l)&&(ng_CompareSIUnits(v.substr(-l,l),u))) return ng_SIUnits[i]; 
    }
    if(id>=0) {
      u=ng_SIUnits[id].prefix+units;
      l=v.length-(''+ng_StripSIUnits(v,ng_SIUnits[id].prefix+baseunit)).length;      
      if((l)&&(ng_CompareSIUnits(v.substr(-l,l),u))) return ng_SIUnits[id]; 
    } 
  }
  return ngVal(def,null);
}

function ng_parseHMS(v,sep,def)
{
  v=ng_toString(v);
  sep=ngVal(sep,':');
  var p,it=v.split(sep);
  if(it.length>3) return ngVal(def,null);
  for(var i=0;i<it.length;i++)
  {
    if(i==it.length-1)
    {
      if(!ng_isNumber(it[i])) return ngVal(def,null);
      p=ng_toFloat(it[i]);
      if(((p<0)||(p>=60))&&(i>0)) return ngVal(def,null); 
    }
    else
    {
      if(!ng_isInteger(it[i])) return ngVal(def,null);
      p=ng_toInteger(it[i]);
      if(((p<0)||(p>=60))&&(i>0)) return ngVal(def,null); 
    }
    it[i]=p;
  }  
  return it;
}


/** 
 *  Group: Type validation functions    
 */
 
/**
 *  Function: ng_typeString
 *  Tests if type of given variable is a string.   
 *  
 *  Syntax:
 *    bool *ng_typeString* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if type of variable is a string
 */       
function ng_typeString(n) { 
   return (typeof n==='string') || (Object.prototype.toString.call(n) === '[object String]');
} 

/**
 *  Function: ng_typeNumber
 *  Tests if type of given variable is a number.   
 *  
 *  Syntax:
 *    bool *ng_typeNumber* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if type of variable is a number
 */       
function ng_typeNumber(n) { 
   return (typeof n==='number');
} 

/**
 *  Function: ng_typeNumberInt
 *  Tests if type of given variable is an integer number.   
 *  
 *  Syntax:
 *    bool *ng_typeNumberInt* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if type of variable is an integer number
 */       
function ng_typeNumberInt(n) { 
   return ((typeof n==='number')&&(!isNaN(n))&&(n%1===0)); 
} 
 
/**
 *  Function: ng_typeNumberFloat
 *  Tests if type of given variable is a float number.   
 *  
 *  Syntax:
 *    bool *ng_typeNumberFloat* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if type of variable is a float number
 */       
function ng_typeNumberFloat(n) { 
   return ((typeof n==='number')&&(!isNaN(n))&&(n%1!==0)); 
} 

/**
 *  Function: ng_typeDate
 *  Tests if type of given variable is a date object.   
 *  
 *  Syntax:
 *    bool *ng_typeDate* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if type of variable is a date object
 */       
function ng_typeDate(d) { 
  return Object.prototype.toString.call(d) === '[object Date]';
}

/**
 *  Function: ng_typeObject
 *  Tests if type of given variable is a valid object.   
 *  
 *  Syntax:
 *    bool *ng_typeObject* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if type of variable is a valid object
 */       
function ng_typeObject(o) {
  return ((typeof o==='object')&&(o!==null));
}

/**
 *  Function: ng_typeArray
 *  Tests if type of given variable is an indexed array.   
 *  
 *  Syntax:
 *    bool *ng_typeArray* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if type of variable is an indexed array
 */       
function ng_typeArray(v) {
  return ng_IsArrayVar(v);
}

/** 
 *  Group: Value validation functions    
 */
 
/**
 *  Function: ng_isEmpty
 *  Tests if given variable is undefined.   
 *  
 *  Syntax:
 *    bool *ng_isEmpty* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if type of variable is undefined
 */       
function ng_isEmpty(n)
{ 
  return (typeof n==='undefined');
} 

/**
 *  Function: ng_isNull
 *  Tests if given variable is Null.   
 *  
 *  Syntax:
 *    bool *ng_isNull* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if type of variable is Null
 */       
function ng_isNull(n)
{ 
  return (n===null);
} 

/**
 *  Function: ng_isEmptyOrNull
 *  Tests if given variable is undefined or Null.   
 *  
 *  Syntax:
 *    bool *ng_isEmptyOrNull* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if type of variable is undefined or Null
 */       
function ng_isEmptyOrNull(n)
{ 
  return (ng_isEmpty(n) || ng_isNull(n));
} 

/**
 *  Function: ng_isEmptyObject
 *  Tests if given variable is undefined or Null or object without
 *  properties or object with properties which values are undefined or null.
 *
 *  Syntax:
 *    bool *ng_isEmptyObject* (mixed var)
 *
 *  Parameters:
 *    var - variable to test
 *
 *  Returns:
 *    TRUE if type of variable is empty object
 */
function ng_isEmptyObject(o)
{
  if(ng_isEmptyOrNull(o)) return true;
  if(typeof o !== 'object') return false;
  if(ng_typeDate(o)) return false;
  var v;
  for(var k in o) {
    v=o[k];
    if(!ng_isEmptyOrNull(v))
    {
      if((typeof v==='object')&&(ng_isEmptyObject(v))) continue;
      return false;
    }
  }
  return true;
}

/**
 *  Function: ng_isInvalid
 *  Tests if given variable has invalid value according its type.   
 *  
 *  Syntax:
 *    bool *ng_isInvalid* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if variable has invalid value
 */       
function ng_isInvalid(n)
{
  return ((n===null)
        ||(typeof n === 'undefined')
        ||((typeof n === 'number')&&(isNaN(n)))
        ||((ng_typeDate(n))&&(isNaN(n.getTime())))); 
} 

/**
 *  Function: ng_isNumber
 *  Tests if given variable is, or can be lossless converted to, a number.    
 *  
 *  Syntax:
 *    bool *ng_isNumber* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if variable can be a number
 */       
function ng_isNumber(v) 
{
  v=ng_toNumber(v);
  return (!isNaN(v));
}

/**
 *  Function: ng_isInteger
 *  Tests if given variable is, or can be lossless converted to, an integer number.    
 *  
 *  Syntax:
 *    bool *ng_isInteger* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if variable can be an integer number
 */       
function ng_isInteger(v) 
{
  v=ng_toNumber(v);
  if(isNaN(v)) return false;
  return ng_typeNumberInt(v);
}

/**
 *  Function: ng_isFloat
 *  Tests if given variable is, or can be lossless converted to, a float number.    
 *  
 *  Syntax:
 *    bool *ng_isFloat* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if variable can be a float number
 */       
function ng_isFloat(v) 
{
  v=ng_toNumber(v);
  if(isNaN(v)) return false;
  return ng_typeNumberFloat(v);
}

/**
 *  Function: ng_isSByte
 *  Tests if given variable is, or can be lossless converted to, a signed byte.    
 *  
 *  Syntax:
 *    bool *ng_isSByte* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if variable can be a signed byte
 */       
function ng_isSByte(v) {
  var n=ng_toNumber(v);
  return (!isNaN(n) && ng_typeNumberInt(n) && !isNaN(ng_toSByte(v)));
} 

/**
 *  Function: ng_isByte
 *  Tests if given variable is, or can be lossless converted to, a byte.    
 *  
 *  Syntax:
 *    bool *ng_isByte* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if variable can be a byte
 */       
function ng_isByte(v) {
  var n=ng_toNumber(v);
  return (!isNaN(n) && ng_typeNumberInt(n) && !isNaN(ng_toByte(v)));
} 

/**
 *  Function: ng_isShort
 *  Tests if given variable is, or can be lossless converted to, a short.    
 *  
 *  Syntax:
 *    bool *ng_isShort* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if variable can be a short
 */       
function ng_isShort(v) {
  var n=ng_toNumber(v);
  return (!isNaN(n) && ng_typeNumberInt(n) && !isNaN(ng_toShort(v)));
} 

/**
 *  Function: ng_isUShort
 *  Tests if given variable is, or can be lossless converted to, a unsigned short.    
 *  
 *  Syntax:
 *    bool *ng_isUShort* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if variable can be a unsigned short
 */       
function ng_isUShort(v) {
  var n=ng_toNumber(v);
  return (!isNaN(n) && ng_typeNumberInt(n) && !isNaN(ng_toUShort(v)));
} 

/**
 *  Function: ng_isLong
 *  Tests if given variable is, or can be lossless converted to, a long.    
 *  
 *  Syntax:
 *    bool *ng_isLong* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if variable can be a long
 */       
function ng_isLong(v) {
  var n=ng_toNumber(v);
  return (!isNaN(n) && ng_typeNumberInt(n) && !isNaN(ng_toLong(v)));
} 

/**
 *  Function: ng_isULong
 *  Tests if given variable is, or can be lossless converted to, a unsigned long.    
 *  
 *  Syntax:
 *    bool *ng_isULong* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if variable can be a unsigned long
 */       
function ng_isULong(v) {
  var n=ng_toNumber(v);
  return (!isNaN(n) && ng_typeNumberInt(n) && !isNaN(ng_toULong(v)));
} 

/** 
 *  Function: ng_isDate
 *  Tests if given variable is, or can be lossless converted to, a date object.    
 *  
 *  Syntax:
 *    bool *ng_isDate* (mixed var [, string format])
 *  
 *  Parameters:
 *    var - variable to test
 *    format - optional date and time format string, use default if not specified     
 *  
 *  Returns:
 *    TRUE if variable can be date object
 */       
function ng_isDate(v,format) {
  return(ng_toDate(v,null,format)!==null);
}

/** 
 *  Function: ng_isNVARCHAR
 *  Tests if given variable is, or can be lossless converted to, a NVARCHAR.    
 *  
 *  Syntax:
 *    bool *ng_isNVARCHAR* (mixed var [, int size])
 *  
 *  Parameters:
 *    var - variable to test    
 *    size - optional size limit 
 *  
 *  Returns:
 *    TRUE if variable can be NVARCHAR
 */       
function ng_isNVARCHAR(v,size) {
  v=ng_toNVARCHAR(v,void 0,null);
  if(v===null) return false;
  if(!ng_isEmpty(size)) {
    size=ngVal(size,0);
    if(v.length>size) 
      return false;
  }
  return true;
}

/** 
 *  Function: ng_isDECIMAL
 *  Tests if given variable is, or can be lossless converted to, a DECIMAL.    
 *  
 *  Syntax:
 *    bool *ng_isDECIMAL* (mixed var, int digits, int frac_digits)
 *  
 *  Parameters:
 *    var - variable to test    
 *    digits - total number of digits 
 *    frac_digits - number of digits in fraction part of number  
 *  
 *  Returns:
 *    TRUE if variable can be DECIMAL
 */       
function ng_isDECIMAL(v, digits, frac_digits) {
  return(ng_toDECIMAL(v, digits, frac_digits,null)!==null);
}

/**
 *  Function: ng_isDateISO8601
 *  Tests if given variable is, or can be lossless converted from, date string in ISO 8601 format.    
 *  
 *  Syntax:
 *    bool *ng_isDateISO8601* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if variable can be in ISO 8601 date format.
 */       
function ng_isDateISO8601(v) {
  return(ng_parseDateISO8601(v,null)!==null);
}

/**
 *  Function: ng_isSIUnits
 *  Tests if given variable is, or can be lossless converted from, string with SI units.    
 *  
 *  Syntax:
 *    bool *ng_isSIUnits* (mixed var, string units [, mixed allowedpref])
 *  
 *  Parameters:
 *    var - variable to test
 *    units - dimension units
 *    allowedpref - optional list of allowed SI prefixes       
 *  
 *  Returns:
 *    TRUE if variable can be a string with SI units
 */       
function ng_isSIUnits(v, units, allowedpref) {
  return(ng_parseSIUnits(v, units, null, allowedpref)!==null);
}

/**
 *  Function: ng_isDistance
 *  Tests if given variable represents, or can be lossless converted to, a distance.    
 *  
 *  Syntax:
 *    bool *ng_isDistance* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if variable can represent a distance.
 */       
function ng_isDistance(v) {
  return(ng_parseDistance(v, null)!==null);
}

/**
 *  Function: ng_isArea
 *  Tests if given variable represents, or can be lossless converted to, an area.    
 *  
 *  Syntax:
 *    bool *ng_isArea* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if variable can represent an area.
 */       
function ng_isArea(v) {
  return(ng_parseArea(v, null)!==null);
}

/**
 *  Function: ng_isSeconds
 *  Tests if given variable represents, or can be lossless converted to, seconds.    
 *  
 *  Syntax:
 *    bool *ng_isSeconds* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if variable can represent seconds.
 */       
function ng_isSeconds(v) {
  return(ng_parseSeconds(v, null)!==null);
}

/**
 *  Function: ng_isMinutes
 *  Tests if given variable represents, or can be lossless converted to, minutes.    
 *  
 *  Syntax:
 *    bool *ng_isMinutes* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if variable can represent minutes.
 */       
function ng_isMinutes(v) {
  return(ng_parseMinutes(v, null)!==null);
}

/**
 *  Function: ng_isHex
 *  Tests if given variable represents hexadecimal numbers.    
 *  
 *  Syntax:
 *    bool *ng_isHex* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if variable can represent hexadecimal numbers.
 */       
function ng_isHex(s) {
 return ng_isHex.REGEXP.test(''+s);  
}
ng_isHex.REGEXP = /^([0-9]|A|B|C|D|E|F)+$/i;

/**
 *  Function: ng_isDigits
 *  Tests if value of given variable contains only digits.    
 *  
 *  Syntax:
 *    bool *ng_isDigits* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if value of variable contains only digits
 */       
function ng_isDigits(s) {
 return ng_isDigits.REGEXP.test(''+s);  
}
ng_isDigits.REGEXP = /^[0-9]+$/;

/**
 *  Function: ng_isEmail
 *  Tests if value of given variable is e-mail.    
 *  
 *  Syntax:
 *    bool *ng_isEmail* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if value is e-mail
 */       
function ng_isEmail(s)
{
  return ng_isEmail.REGEXP.test((''+s).toLowerCase());
}
ng_isEmail.REGEXP = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");

/**
 *  Function: ng_isURL
 *  Tests if value of given variable is URL.    
 *  
 *  Syntax:
 *    bool *ng_isURL* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if value is URL
 */       
function ng_isURL(s) {
  return ((''+s).toLowerCase().indexOf('://')>=0);
}

/**
 *  Function: ng_isWWW
 *  Tests if value of given variable is web address.    
 *  
 *  Syntax:
 *    bool *ng_isWWW* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if value is web address
 */       
function ng_isWWW(s)
{
  if(ng_isURL(s)) return true;
  s=(''+s).toLowerCase();
  if((s=='localhost')||(s=='127.0.0.1')) return true;
  var i=s.indexOf('.');
  if(i<1) return false;
  var j=s.lastIndexOf('.');
  if(j<0) return false;
  var s=s.substring(j+1,s.length);
  var tdns=['aero','asia','biz','cat','com','coop','gov','info','int','jobs','mobi','museum','name','net','org','pro','tel','travel','xxx'];    
  return ((s.length==2)||(ng_inArray(s,tdns)));
}

/**
 *  Function: ng_isIP4
 *  Tests if value of given variable is IP4 address.    
 *  
 *  Syntax:
 *    bool *ng_isIP4* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if value is IP4 address
 */       
function ng_isIP4(s) {
  return ng_isIP4.REGEXP.test(''+s)
}
ng_isIP4.REGEXP = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i;

/**
 *  Function: ng_isIP6
 *  Tests if value of given variable is IP6 address.    
 *  
 *  Syntax:
 *    bool *ng_isIP6* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if value is IP6 address
 */       
function ng_isIP6(s)
{
  return ng_isIP6.REGEXP.test(s);
}
ng_isIP6.REGEXP = new RegExp("^\\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:)))(%.+)?\\s*$");

/**
 *  Function: ng_isUnicode
 *  Tests if value of given variable is unicode string.    
 *  
 *  Syntax:
 *    bool *ng_isUnicode* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if value is unicode string
 */       
function ng_isUnicode(s)
{
  var c;
  s=''+s;
  for(var i=0;i<s.length;s++) 
  { 
    c=s.charCodeAt(i);
    if(c>255) return true;
  }
  return false;    
}

/**
 *  Function: ng_isASCII
 *  Tests if value of given variable is ASCII string.    
 *  
 *  Syntax:
 *    bool *ng_isASCII* (mixed var)
 *  
 *  Parameters:
 *    var - variable to test    
 *  
 *  Returns:
 *    TRUE if value is a ASCII string
 */       
function ng_isASCII(s)
{
  var c;
  s=''+s;
  for(var i=0;i<s.length;s++) 
  { 
    c=s.charCodeAt(i);
    if(c>127) return false;
  }
  return true;    
}
 
/** 
 *  Group: Conversions functions    
 */
 
/**
 *  Function: ng_toBool
 *  Converts given variable to boolean.    
 *  
 *  Syntax:
 *    bool *ng_toBool* (mixed var)
 *  
 *  Parameters:
 *    var - variable to convert    
 *  
 *  Returns:
 *    Converted value.
 */       
function ng_toBool(v)
{
  if((ng_typeString(v))&&(v.length>0))
  {
    var c=v.toLowerCase();
    if((c=='0')||(c=='false')||(c=='f')||(c=='n')||(c=='no')||(c=='off')||(c=='disabled')) return false;
    return true;
  }  
  return !!v;
}

/**
 *  Function: ng_toString
 *  Converts given variable to string.    
 *  
 *  Syntax:
 *    mixed *ng_toBool* (mixed var [,mixed def=''])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_toString(v,def)
{
  switch(typeof v)
  {
    case 'undefined': return ngVal(def,'');
//    case 'boolean': return (''+v); // (v ? 'true' : 'false')
    case 'object':
      if(v===null) return ngVal(def,'');
      if(ng_typeDate(v)) return ng_FormatDateTime(v,void 0,ngVal(def,''));
      if(typeof v.FormatString === 'function') return v.FormatString(v,def);
      if((typeof JSON !== 'undefined')&&(typeof JSON.stringify === 'function'))
      {
        try {
          return JSON.stringify(v);
        }
        catch(e) { }
      }
      return ngVal(def,'');
    case 'number':
      return ((''+v).replace('.',ng_DecimalSeparator()));
    case 'string':
      return v;
  }
  return ''+v;
}

/**
 *  Function: ng_toObject
 *  Converts given variable to object.    
 *  
 *  Syntax:
 *    mixed *ng_toObject* (mixed var [,mixed def=null])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_toObject(v,def)
{
  if(ng_typeDate(v)) 
  {
    if(ng_isInvalid(v)) return ngVal(def,null);
    return {
      year:     v.getFullYear(),
      mon:      v.getMonth()+1,
      mday:     v.getDate(),
      hour:     v.getHours(),
      min:      v.getMinutes(),
      sec:      v.getSeconds(),
      ms:       v.getMilliseconds(),
      tzoffset: v.getTimezoneOffset()
    };
  }
  if(typeof v==='object') return v;
  if(ng_typeString(v))
  {
    if((typeof JSON !== "undefined")&&(typeof JSON.parse === "function"))
    {
      try {
        return window.JSON.parse(v);
      }
      catch(e) { }
    }
  }
  return ngVal(def,null);
}

/**
 *  Function: ng_toNumber
 *  Converts given variable to number.    
 *  
 *  Syntax:
 *    mixed *ng_toNumber* (mixed var [,mixed def=NaN])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_toNumber(v,def) 
{
  if(ng_isEmptyOrNull(v)) return ngVal(def,NaN);
  if(ng_typeString(v)) 
  {
    if(v==='') return ngVal(def,NaN);
    v=v.replace(ng_DecimalSeparator(), '.');
  } 
  v = (+v);
  return(isNaN(v) ? ngVal(def,NaN) : v);
} 

/**
 *  Function: ng_toSByte
 *  Converts given variable to signed byte.    
 *  
 *  Syntax:
 *    mixed *ng_toSByte* (mixed var [,mixed def=NaN])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_toSByte(v,def)
{
  v=parseInt(v,10);
  return((isNaN(v))||(v<SBYTE_MIN)||(v>SBYTE_MAX) ? ngVal(def,NaN) : v);
}

/**
 *  Function: ng_toByte
 *  Converts given variable to byte.    
 *  
 *  Syntax:
 *    mixed *ng_toByte* (mixed var [,mixed def=NaN])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_toByte(v,def)
{
  v=parseInt(v,10);
  return((isNaN(v))||(v<BYTE_MIN)||(v>BYTE_MAX) ? ngVal(def,NaN) : v);
}

/**
 *  Function: ng_toShort
 *  Converts given variable to short.    
 *  
 *  Syntax:
 *    mixed *ng_toShort* (mixed var [,mixed def=NaN])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_toShort(v,def)
{
  v=parseInt(v,10);
  return((isNaN(v))||(v<SHORT_MIN)||(v>SHORT_MAX) ? ngVal(def,NaN) : v);
}

/**
 *  Function: ng_toUShort
 *  Converts given variable to unsigned short.    
 *  
 *  Syntax:
 *    mixed *ng_toUShort* (mixed var [,mixed def=NaN])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_toUShort(v,def)
{
  v=parseInt(v,10);
  return((isNaN(v))||(v<USHORT_MIN)||(v>USHORT_MAX) ? ngVal(def,NaN) : v);
}

/**
 *  Function: ng_toLong
 *  Converts given variable to long.    
 *  
 *  Syntax:
 *    mixed *ng_toLong* (mixed var [,mixed def=NaN])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_toLong(v,def)
{
  v=parseInt(v,10);
  return((isNaN(v))||(v<LONG_MIN)||(v>LONG_MAX) ? ngVal(def,NaN) : v);
}

/**
 *  Function: ng_toULong
 *  Converts given variable to unsigned long.    
 *  
 *  Syntax:
 *    mixed *ng_toULong* (mixed var [,mixed def=NaN])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_toULong(v,def)
{
  v=parseInt(v,10);
  return((isNaN(v))||(v<ULONG_MIN)||(v>ULONG_MAX) ? ngVal(def,NaN) : v);
}

/**
 *  Function: ng_toInteger
 *  Converts given variable to integer number.    
 *  
 *  Syntax:
 *    mixed *ng_toInteger* (mixed var [,mixed def=NaN])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_toInteger(v,def)
{
  v=parseInt(v,10);
  return(isNaN(v) ? ngVal(def,NaN) : v);
}

/**
 *  Function: ng_toFloat
 *  Converts given variable to float number.    
 *  
 *  Syntax:
 *    mixed *ng_toFloat* (mixed var [,mixed def=NaN])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_toFloat(v,def)
{
  if(typeof v==='object') return ngVal(def,NaN);
  v=parseFloat((''+v).replace(ng_DecimalSeparator(), '.')); 
  return(isNaN(v) ? ngVal(def,NaN) : v);
}

/**
 *  Function: ng_toDate
 *  Converts given variable to date object.    
 *  
 *  Syntax:
 *    mixed *ng_toDate* (mixed var [,mixed def=null, format=undefined])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails
 *    format - optional parsing format       
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_toDate(v,def,format)
{
  if(ng_isEmptyOrNull(v)) return ngVal(def,null); 
  if(ng_typeDate(v))
  {
    return (isNaN(v.getTime()) ? ngVal(def,null) : v);
  }  
  if(ng_typeString(v)) 
  {
    var d=ng_ParseDateTime(v, format, null);
    if((ng_isInvalid(d))&&(typeof format==='undefined')) 
    {
      d=ng_ParseDate(v, format, null);
      if(ng_isInvalid(d)) d=ng_ParseTime(v, format, null); 
    }
    return (ng_isInvalid(d) ? ngVal(def,null) : d); 
  }
  if(ng_typeObject(v)) 
  {
    var d=new Date(0);
    if(!ng_isInvalid(v.year))
    {
      var y=v.year+'';
      if (y.length < 4)
      {
        if(parseInt($y,10) > 70) y=''+(y-0+1900); 
        else                     y=''+(y-0+2000);
      } 
      d.setFullYear(y);
    }
    if(!ng_isInvalid(v.mon))  d.setMonth(v.mon-1);
    if(!ng_isInvalid(v.mday)) d.setDate(v.mday);
    if(!ng_isInvalid(v.hour)) d.setHours(v.hour);
    if(!ng_isInvalid(v.min))  d.setMinutes(v.min);
    if(!ng_isInvalid(v.sec))  d.setSeconds(v.sec);
    if(!ng_isInvalid(v.ms))   d.setMilliseconds(Number("0." + v.ms) * 1000);
    if(!ng_isInvalid(v.tzoffset))
    {
      var offset = (d.getTimezoneOffset()-v.tzoffset) * 60 * 1000;
      if(offset!=0) d.setTime(d.getTime()-offset);
    }

    return (ng_isInvalid(d) ? ngVal(def,null) : d);    
  }
  v=ng_fromUnixTimestamp(v);
  return (ng_isInvalid(v) ? ngVal(def,null) : v);    
}

/**
 *  Function: ng_toDateOnly
 *  Converts given variable to date object .    
 *  
 *  Syntax:
 *    mixed *ng_toDateOnly* (mixed var [,mixed def=null, format=undefined])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails
 *    format - optional parsing format       
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_toDateOnly(v,def,format)
{
  var dt=ng_toDate(v,def,format);
  if((!ng_typeDate(dt))||(ng_isInvalid(dt))) return ngVal(def,null);
  return ng_ExtractDate(dt);
}

/**
 *  Function: ng_toNVARCHAR
 *  Converts given variable to NVARCHAR.    
 *  
 *  Syntax:
 *    mixed *ng_toNVARCHAR* (mixed var [, int size, mixed def=''])
 *  
 *  Parameters:
 *    var - variable to convert
 *    size - optional size limit 
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_toNVARCHAR(v,size,def)
{
  if((ng_typeObject(v))&&(!ng_typeDate(v))) return ngVal(def,'');
  v=ng_toString(v,null);
  if(ng_isInvalid(v)) return ngVal(def,'');
  v=ng_RTrim(v);
  if(typeof size==='undefined') return v;
  if(size<0) size=0;
  return v.substring(0,size); 
}

/**
 *  Function: ng_toDECIMAL
 *  Converts given variable to DECIMAL.    
 *  
 *  Syntax:
 *    mixed *ng_toDECIMAL* (mixed var, int digits, int frac_digits [,mixed def=NaN])
 *  
 *  Parameters:
 *    var - variable to convert
 *    digits - total number of digits 
 *    frac_digits - number of digits in fraction part of number  
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_toDECIMAL(v, digits, frac_digits, def)
{
  if((ng_isInvalid(digits))||(ng_isInvalid(frac_digits))) return def;
  
  function str_repeat(c,n)
  {
    var s='';
    for(var i=n;i>0;i--)
      s=s+c;
    return s;
  }
  
  if(frac_digits>0) digits++;
  else if(frac_digits<0) frac_digits=0;
  var i;
  if(ng_typeString(v))
  {     
    v=ng_Trim(v.replace(ng_DecimalSeparator(), '.'));
    if(v!='')
    {
      var ov=v;
      var sgn=0;
      if(v.length>0)
      {
        if(v.charAt(0)=='+') sgn=1;
        else if(v.charAt(0)=='-') sgn=-1;
      }
      if(sgn) v=v.substr(1,v.length);
      var l=v.length;
      for(i=0;i<l;i++) // strip zeros
        if(v.charAt(i)!='0') break;
      v=v.substr(i,v.length);
      if((i==l)||(v.charAt(0)=='.')) v='0'+v; // add leading zero
  
      if(ng_toDECIMAL.REGEXP.test(v))
      {
        var i=v.indexOf('.');
        var l=v.length;
        if(i==l-1) { v=v.substr(0,l-1); i=-1; }
        if(i<0)
        { 
          if(frac_digits>0)
            v+='.'+str_repeat('0',frac_digits);
        }
        else
        {        
          var fd=l-(i+1);
          if(fd!=frac_digits)
          {
            if(fd<frac_digits) v+=str_repeat('0',frac_digits-fd);
            else
            {
              // round
              var n,r=0;
              for(var j=l-1;(j>=0)&&((r)||(fd>frac_digits));j--)
              {
                if(j===i) continue;
                n=parseInt(v.charAt(j));
                if(r) 
                {
                  n++;
                  v=v.substr(0,j)+(n % 10)+v.substr(j+1,v.length);
                  if((n<10)&&(fd<=frac_digits)) break;
                }
                r=(n<5 ? 0 : 1);
                fd--;
              }
              v=v.substr(0,i+(frac_digits ? 1+frac_digits : 0));
              if((j<0)&&(r)) v='1'+v;
            }
          }
        }        
        if(v.length>digits) return ngVal(def,'');
        if((sgn<0)&&(v!='0')) v='-'+v;
        return v;
      }
      v=ov;              
    }
  }

  v=ng_toNumber(v);
  if(isNaN(v)) return ngVal(def,'');
  v=''+v.toFixed(frac_digits);
  if(v.indexOf('e')>=0) return ngVal(def,'');

  var sgn=0;
  if(v.length>0)
  {
    if(v.charAt(0)=='+') sgn=1;
    else if(v.charAt(0)=='-') sgn=-1;
  }
  if(sgn) v=v.substr(1);

  var i=v.indexOf('.');
  if(i<0) 
  {
    if(frac_digits>0)
      v=v+'.'+str_repeat('0',frac_digits);
  }
  else 
  {
    var l=v.length;
    var fd=l-(i+1);
    if(fd<frac_digits) v=v+str_repeat('0',frac_digits-fd);
  }
  if(v.length>digits) return ngVal(def,'');
  if(sgn<0) v='-'+v;
  return v;
}
ng_toDECIMAL.REGEXP = new RegExp("^-?(0|([1-9]\\d*))(\\.\\d+)?$");

/**
 *  Function: ng_toUTCDate
 *  Converts given variable to UTC date.    
 *  
 *  Syntax:
 *    mixed *ng_toUTCDate* (mixed var [,mixed def=null])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_toUTCDate(d,def)
{
  d=ng_toDate(d);
  if(ng_isInvalid(d)) return ngVal(def, null);

  d=new Date(d.getTime()); 
  var offset = d.getTimezoneOffset() * 60 * 1000;
  d.setTime(d.getTime()+offset);
  return (ng_isInvalid(d) ? ngVal(def, null) : d);
}

/**
 *  Function: ng_fromUTCDate
 *  Converts given variable from UTC date.    
 *  
 *  Syntax:
 *    mixed *ng_fromUTCDate* (mixed var [,mixed def=null])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_fromUTCDate(d,def)
{
  d=ng_toDate(d);
  if(ng_isInvalid(d)) return ngVal(def, null);
  
  d=new Date(d.getTime()); 
  var offset = d.getTimezoneOffset() * 60 * 1000;
  d.setTime(d.getTime()-offset);
  return (ng_isInvalid(d) ? ngVal(def, null) : d);
}

/**
 *  Function: ng_toUnixTimestamp
 *  Converts given variable to UNIX timestamp.    
 *  
 *  Syntax:
 *    mixed *ng_toUnixTimestamp* (mixed var [,mixed def=NaN])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_toUnixTimestamp(d,def)
{
  d=ng_toDate(d);
  if(ng_isInvalid(d)) return ngVal(def,NaN);
  return Math.round(d.getTime() / 1000);
}

/**
 *  Function: ng_fromUnixTimestamp
 *  Converts UNIX timestamp to date.    
 *  
 *  Syntax:
 *    mixed *ng_fromUnixTimestamp* (mixed var [,mixed def=null])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_fromUnixTimestamp(d,def)
{
  d=ng_toNumber(d);
  if(isNaN(d)) return ngVal(def,null);
  return new Date(d*1000);
}

/**
 *  Function: ng_formatDateISO8601
 *  Converts given variable to date string in ISO 8601 format.     
 *  
 *  Syntax:
 *    mixed *ng_formatDateISO8601* (mixed var [, mixed def=''])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_formatDateISO8601(d,def) { 
  function LZ(x) { return(x<10 ? '0'+x : x); }
  d=ng_toDate(d);  
  if(ng_isInvalid(d)) return ngVal(def,'');
  return d.getUTCFullYear()+'-'
  + LZ(d.getUTCMonth()+1)+'-'
  + LZ(d.getUTCDate())+'T'
  + LZ(d.getUTCHours())+':'
  + LZ(d.getUTCMinutes())+':'
  + LZ(d.getUTCSeconds())+'Z';
} 

/**
 *  Function: ng_parseDateISO8601
 *  Converts given variable from date string in ISO 8601 format to date.     
 *  
 *  Syntax:
 *    mixed *ng_parseDateISO8601* (mixed var [, mixed def=null])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_parseDateISO8601(s,def) {
  s=''+s;
  var d = s.match(ng_parseDateISO8601.REGEXP);

  function SLZ(s)
  {
    s=''+s;
    for(var i=0;i<s.length;i++)
      if(s.charAt(i)!='0')
      {
        s=s.substring(i,s.length);
        break;
      }
    return s;
  }

  if(d===null) return ngVal(def,null);
  
  var offset = 0;
  var date = new Date(0, 0, 1);

  var y=parseInt(d[1],10);
  var m=parseInt(SLZ(d[3]),10);
  var day=parseInt(SLZ(d[5]),10);
  
  if((isNaN(y))||(isNaN(m))||(isNaN(day))||(y<1000)||(m<1)||(m>12)||(day<1)||(day>ng_DaysInMonth(m,y)))
    return ngVal(def,null);
    
  date.setFullYear(y);
  date.setMonth(m - 1);   
  date.setDate(day);
  
  var hh=parseInt(SLZ(d[7]),10); 
  var mm=parseInt(SLZ(d[8]),10); 
  var ss=parseInt(SLZ(d[10]),10); 
  var uu=parseInt(SLZ(d[12]),10);

  if((!isNaN(hh))||(!isNaN(mm))||(!isNaN(ss))||(!isNaN(uu))||(d[14]))
  {
    if(isNaN(hh)) hh=0;
    else if((hh<0)||(hh>23)) return ngVal(def,null);
    if(isNaN(mm)) mm=0;
    else if((mm<0)||(mm>59)) return ngVal(def,null);
    if(isNaN(ss)) ss=0;
    else if((ss<0)||(ss>59)) return ngVal(def,null);
    
    date.setHours(hh); 
    date.setMinutes(mm); 
    date.setSeconds(ss); 
    if(!isNaN(uu)) date.setMilliseconds(ng_toNumber("0." + d[12]) * 1000); 
    if (d[14]) {
        offset = (ng_toNumber(d[16]) * 60) + ng_toNumber(d[17]);
        offset *= ((d[15] == '-') ? 1 : -1);
    }  
  }
  offset -= date.getTimezoneOffset();
  date.setTime(Number(Number(date) + (offset * 60 * 1000)));
  return date;
}
ng_parseDateISO8601.REGEXP = new RegExp("([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
      "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\\.([0-9]+))?)?" +
      "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?");

/**
 *  Function: ng_parseSIUnits
 *  Converts given variable from string with SI units to number.    
 *  
 *  Syntax:
 *    mixed *ng_parseSIUnits* (mixed var, string units [, mixed def=NaN, mixed allowedpref, bool binary=false])
 *  
 *  Parameters:
 *    var - variable to convert
 *    units - dimension units
 *    def - default value, used if conversion fails      
 *    allowedpref - optional list of allowed SI prefixes
 *    binary - if TRUE, use binary exponents        
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_parseSIUnits(v, units, def, allowedpref, binary)
{
  if(ng_typeNumber(v)) return v;
  var un=ng_decodeSIUnits(units);
  var u=ng_getSIUnits(v,units,null);
  if(u===null) 
  {
    v=ng_toNumber(v);
    return (isNaN(v) ? ngVal(def,NaN) : v); 
  }
  if(ng_typeString(allowedpref))
  {
    var a=[];
    a.push(allowedpref);
    allowedpref=a;
  }
  if((u.prefix!='')&&(allowedpref)&&(!ng_inArray(u.prefix,allowedpref)))
    return ngVal(def,NaN);
  v=ng_StripSIUnits(v,u.prefix+un.units);
  v=ng_toNumber(v);
  if(isNaN(v)) return ngVal(def,NaN);
  if(binary) {
    if((un.exp!=1)||(u.binex==0)) return ngVal(def,NaN);
    v*=u.binex;
  }
  else v*=Math.pow(u.ex,un.exp);   
  return (isNaN(v) ? ngVal(def,NaN) : v); 
}

/**
 *  Function: ng_formatSIUnits
 *  Converts given variable to string followed by SI units.    
 *  
 *  Syntax:
 *    mixed *ng_formatSIUnits* (mixed var, string units [, mixed def='', mixed allowedpref, int precision, function formatfnc, mixed userdata, bool binary=false])
 *  
 *  Parameters:
 *    var - variable to convert
 *    units - dimension units
 *    def - default value, used if conversion fails      
 *    allowedpref - optional list of allowed SI prefixes
 *    precision - optional required output number precision
 *    formatfnc - optional formating function callback
 *    userdata - user data passed to formating function           
 *    binary - if TRUE, use binary exponents        
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 *    
 *  Callback:
 *    mixed function (number var,object si_def, string units, mixed def, array allowedpref, mixed userdata)
 *    
 *    Returns formated value.       
 */       
function ng_formatSIUnits(v, units, def, allowedpref, precision, formatfnc, userdata, binary)
{
  if(ng_typeString(v)) 
  {
    var s=ng_parseSIUnits(v, units);
    if(!isNaN(s)) v=s;
  }
  v=ng_toNumber(v);
  if(isNaN(v)) return ngVal(def,'');

  if(ng_typeString(allowedpref)) 
  {
    var a=[];
    a.push(allowedpref);
    allowedpref=a;
  }
  var u,fu=null;
  var mul=1,fmul=1;
  var un=ng_decodeSIUnits(units);
  if((binary)&&(un.exp!=1)) return ngVal(def,'');
  for(var i=ng_SIUnits.length-2;i>=0;i--)
  {
    if(binary)
    {
      if(ng_SIUnits[i].binex==0) continue;
      else mul=ng_SIUnits[i].binex;
    }
    else mul=Math.pow(ng_SIUnits[i].ex,un.exp);
    if((v>=mul)&&(((allowedpref)&&((ng_SIUnits[i].prefix=='')||(ng_inArray(ng_SIUnits[i].prefix,allowedpref))))||((!allowedpref)&&(!ng_SIUnits[i].notcommon))))
    {
      fu=ng_SIUnits[i];
      fmul=mul;
    }
  }
  if(!ng_typeObject(fu)) return ng_toString(v)+' '+units;
  v/=fmul;
  if(isNaN(v)) return ngVal(def,'');
  if(typeof formatfnc==='function') return formatfnc(v,fu,units,def,allowedpref, userdata);
  if(typeof precision!=='undefined') return ng_toString(ng_toFloat(v.toFixed(precision)))+' '+fu.prefix+units; 
  return ng_toString(v)+' '+fu.prefix+units;  
}

/**
 *  Function: ng_parseBytes
 *  Converts given variable from bytes with units to number.     
 *  
 *  Syntax:
 *    mixed *ng_parseBytes* (mixed var [, mixed def=NaN])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_parseBytes(v, def) {
  if(ng_typeString(v)) {
    v=ng_Unformat3Num(v).toUpperCase();
  }
  return ng_parseSIUnits(v, 'B', def, false, true);
}

/**
 *  Function: ng_formatBytes
 *  Converts given variable to distance with units.     
 *  
 *  Syntax:
 *    mixed *ng_formatBytes* (mixed var [, mixed def='', int precision, function formatfnc, mixed userdata])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *    precision - optional required output number precision
 *    formatfnc - optional formating function callback
 *    userdata - user data passed to formating function           
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 *    
 *  Callback:
 *    mixed function (number var,object si_def, string units, mixed def, array allowedpref, mixed userdata)
 *    
 *    Returns formated value.       
 */       
function ng_formatBytes(v, def, precision, formatfnc, userdata) {
  return ng_Format3Num(ng_formatSIUnits(v, 'B', def, false, precision,formatfnc, userdata, true));
}

/**
 *  Function: ng_parseDistance
 *  Converts given variable from distance with units to number.     
 *  
 *  Syntax:
 *    mixed *ng_parseDistance* (mixed var [, mixed def=NaN])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_parseDistance(v, def) {
  return ng_parseSIUnits(ng_Unformat3Num(v), 'm', def, ['m','c','d','k']);
}

/**
 *  Function: ng_formatDistance
 *  Converts given variable to distance with units.     
 *  
 *  Syntax:
 *    mixed *ng_formatDistance* (mixed var [, mixed def='', int precision, function formatfnc, mixed userdata])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *    precision - optional required output number precision
 *    formatfnc - optional formating function callback
 *    userdata - user data passed to formating function           
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 *    
 *  Callback:
 *    mixed function (number var,object si_def, string units, mixed def, array allowedpref, mixed userdata)
 *    
 *    Returns formated value.       
 */       
function ng_formatDistance(v, def, precision, formatfnc, userdata) {
  precision=ngVal(precision,2);
  return ng_Format3Num(ng_formatSIUnits(v, 'm', def, ['m','c','k'], precision, formatfnc, userdata));
}

/**
 *  Function: ng_parseArea
 *  Converts given variable from area with units to number.     
 *  
 *  Syntax:
 *    mixed *ng_parseArea* (mixed var [, mixed def=NaN])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_parseArea(v, def) {
  return ng_parseSIUnits(ng_Unformat3Num(v), 'm²', def, ['m','c','d','k']);
}

/**
 *  Function: ng_formatArea
 *  Converts given variable to area with units.     
 *  
 *  Syntax:
 *    mixed *ng_formatArea* (mixed var [, mixed def='', int precision, function formatfnc, mixed userdata])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *    precision - optional required output number precision
 *    formatfnc - optional formating function callback
 *    userdata - user data passed to formating function           
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 *    
 *  Callback:
 *    mixed function (number var,object si_def, string units, mixed def, array allowedpref, mixed userdata)
 *    
 *    Returns formated value.       
 */       
function ng_formatArea(v, def, precision, formatfnc, userdata) {
  precision=ngVal(precision,2);
  return ng_Format3Num(ng_formatSIUnits(v, 'm²', def, ['m','c','k'], precision, formatfnc, userdata));
}

/**
 *  Function: ng_parseSeconds
 *  Converts given variable from string time to number of seconds.    
 *  
 *  Syntax:
 *    mixed *ng_parseSeconds* (mixed var [, mixed def=NaN])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_parseSeconds(v,def)
{
  var hms=ng_parseHMS(v);
  if(hms===null) return ngVal(def,NaN);
  var s=0;
  var j=0;
  for(var i=hms.length-1;i>=0;i--)
  {
    switch(j++)
    {
      case 0: s+=hms[i]; break;
      case 1: s+=hms[i]*60; break;
      case 2: s+=hms[i]*3600; break;
    }
  }
  if(ng_isInvalid(s)) return ngVal(def,NaN);
  return s;
}

/**
 *  Function: ng_formatSeconds
 *  Converts given variable from number of seconds to string time.    
 *  
 *  Syntax:
 *    mixed *ng_formatSeconds* (mixed var [, mixed def=''])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_formatSeconds(v,def,ms)
{
  if(!ng_isNumber(v)) return ngVal(def,'');
  var h=Math.floor(v/3600);
  v-=h*3600;
  var m=Math.floor(v/60);
  v-=m*60;
  var s=Math.floor(v);
  v-=s;
  if((ng_isInvalid(h))||(ng_isInvalid(m))||(ng_isInvalid(s)))  return ngVal(def,'');
  return ng_sprintf('%02d:%02d:%02d',h,m,s)+(v>0 && !ng_isInvalid(v) && ms ? (''+ng_toFloat(v.toFixed(3))).substr(1,4) : '');
}
  
/**
 *  Function: ng_parseMinutes
 *  Converts given variable from string time to number of minutes.    
 *  
 *  Syntax:
 *    mixed *ng_parseMinutes* (mixed var [, mixed def=NaN])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_parseMinutes(v,def)
{
  var hms=ng_parseHMS(v);
  if(hms===null) return ngVal(def,NaN);
  var s=0;
  var j=(hms.length==3 ? -1 : 0);
  for(var i=hms.length-1;i>=0;i--)
  {
    switch(j++)
    {
      case -1: s+=hms[i]/60; break;
      case  0: s+=hms[i]; break;
      case  1: s+=hms[i]*60; break;
    }    
  }
  if(ng_isInvalid(s)) return ngVal(def,NaN);
  return s;
}

/**
 *  Function: ng_formatMinutes
 *  Converts given variable from number of minutes to string time.    
 *  
 *  Syntax:
 *    mixed *ng_formatMinutes* (mixed var [, mixed def=''])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_formatMinutes(v,def,ms)
{
  if(!ng_isNumber(v)) return ngVal(def,'');
  var m=Math.floor(v/60);
  v-=m*60;
  var s=Math.floor(v);
  v-=s;
  if((ng_isInvalid(m))||(ng_isInvalid(s)))  return ngVal(def,'');
  return ng_sprintf('%02d:%02d',m,s)+(v>0 && !ng_isInvalid(v) && ms ? (''+ng_toFloat(v.toFixed(3))).substr(1,4) : '');
}
  
/**
 *  Function: ng_formatWWW
 *  Converts given variable to web address.    
 *  
 *  Syntax:
 *    mixed *ng_formatWWW* (mixed var [, mixed def=''])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_formatWWW(s,def)
{
  if(!ng_isWWW(s)) return ngVal(def,'');
  return (ng_isURL(s) ? s : 'https://'+s);
}

/**
 *  Function: ng_toASCII
 *  Converts given variable to ASCII string.    
 *  
 *  Syntax:
 *    mixed *ng_toASCII* (mixed var [, mixed def=''])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_toASCII(s,def) {
  return(ng_isASCII(s) ? s : ngVal(def,''));
}

/**
 *  Function: ng_toNonUnicode
 *  Converts given variable to non-unicode string.    
 *  
 *  Syntax:
 *    mixed *ng_toNonUnicode* (mixed var [, mixed def=''])
 *  
 *  Parameters:
 *    var - variable to convert
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_toNonUnicode(s,def) {
  return(!ng_isUnicode(s) ? s : ngVal(def,''));
}

/**
 *  Function: ng_toHex
 *  Converts given variable to hexadecimal.    
 *  
 *  Syntax:
 *    mixed *ng_toHex* (mixed var [, int padding, mixed def=''])
 *  
 *  Parameters:
 *    var - variable to convert
 *    padding - size of 0 padding 
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_toHex(v,p,def)
{
  p=ng_toNumber(p);
  if(ng_typeString(v))
  {
    var c,s='';
    if((isNaN(p))||(p>=4)) p=4;
    else p=2;
    for(var i=0;i<v.length;i++)
    {
      c=v.charCodeAt(i);
      if((c>255)&&(p==2)) c=255;
      s+=(0x10000+c).toString(16).substr(-p).toUpperCase();
    }
    return s;
  }
  v=ng_toNumber(v);
  if(isNaN(v)) return ngVal(def,'');

  v=v.toString(16).toUpperCase();
  if((isNaN(p))||(p<1)) p=1;
  while(v.length < p) v='0'+v; 
  return v;
}

/**
 *  Function: ng_Hex2Str
 *  Decodes hexadecimal encoded string.    
 *  
 *  Syntax:
 *    mixed *ng_Hex2Str* (mixed var [, int padding, mixed def=''])
 *  
 *  Parameters:
 *    var - variable to convert
 *    padding - size of 0 padding 
 *    def - default value, used if conversion fails      
 *  
 *  Returns:
 *    Converted value or default value if conversion fails.
 */       
function ng_Hex2Str(v,p,def)
{
  v=''+v;
  p=ng_toNumber(p);
  if((isNaN(p))||(p>=4)) p=4;
  else p=2;
  var l=v.length/p;
  var s='';
  var c;
  for(var i=0;i<l;i++)
  {
    c=parseInt(v.substr(i*p,p), 16);
    if(isNaN(c)) return ngVal(def,'');
    s+=String.fromCharCode(c); 
  }
  return s;
} 

/** 
 *  Group: Array functions    
 */
 
/**
 *  Function: ng_idxInArray
 *  Finds given value in indexed array.   
 *  
 *  Syntax:
 *    int *ng_idxInArray* (mixed value, array arr [, int fromidx=0, int toidx=arr.length, function cmpfnc, mixed userdata])
 *  
 *  Parameters:
 *    value - value to find  
 *    arr - array to scan 
 *    fromidx - start scan array from this index
 *    toidx - end scan array if reached to this index 
 *    cmdfnc - compare function callback
 *    userdata - user data passed to compare function           
 *  
 *  Returns:
 *    Index of value in array of -1 if value not found.
 *    
 *  Callback:
 *    bool function (v1,v2,userdata)
 *    
 *    Returns true if v1 is equal to v2.       
 */       
function ng_idxInArray(value, arr, fromidx, toidx, cmpfnc, userdata)
{
  if(typeof cmpfnc!=='function') {
    if (Array.prototype.indexOf && (typeof toidx==='undefined' || toidx===null || toidx>=arr.length)) {
       return arr.indexOf(value, ngVal(fromidx, 0));
    }
    cmpfnc=function(a,b) { return a===b; }
  }
  var t=ngVal(toidx,arr.length);
  if(t>arr.length) t=arr.length;
  for(var i=ngVal(fromidx,0);i<t;i++) 
    if(cmpfnc(arr[i],value,userdata)) return i; 
  return -1; 
} 

/**
 *  Function: ng_inArray
 *  Tests if given value is in indexed array.   
 *  
 *  Syntax:
 *    int *ng_inArray* (mixed value, array arr [, int fromidx=0, int toidx=arr.length, function cmpfnc, mixed userdata])
 *  
 *  Parameters:
 *    value - value to find  
 *    arr - array to scan 
 *    fromidx - start scan array from this index
 *    toidx - end scan array if reached to this index 
 *    cmdfnc - compare function callback
 *    userdata - user data passed to compare function           
 *  
 *  Returns:
 *    TRUE if value is present in array.
 *    
 *  Callback:
 *    bool function (v1,v2,userdata)
 *    
 *    Returns true if v1 is equal to v2.       
 */       
function ng_inArray(value, arr, fromidx, toidx,cmpfnc,userdata) {
  return (ng_idxInArray(value, arr, fromidx, toidx, cmpfnc,userdata)>=0);
}

/**
 *  Function: ng_ArrayIntersect
 *  Compares the values of two (or more) array and returns the matches.
 *
 *  Syntax:
 *    array *ng_ArrayIntersect* (array arr1, array arr2 [, array arr3, ...])
 *
 *  Parameters:
 *    arr1 - array to compare from
 *    arr2 - array to compare against
 *    arrN - more arrays to compare against
 *
 *  Returns:
 *    Array containing the entries from arr1 that are present in all the other arrays.
 */
function ng_ArrayIntersect() {
  var ret={};
  var len=arguments.length;
  var len1=len-1;
  var arr,found;

  var arr1=arguments[0];
  var idxvar=ng_IsArrayVar(arr1);
  for(var k1 in arr1) {
    for(var i=1;i<len;i++) {
      arr = arguments[i];
      idxvar = idxvar && ng_IsArrayVar(arr);
      found = false;
      for(var k in arr) {
        if (arr[k] === arr1[k1]) {
          if (i === len1) {
            ret[k1] = arr1[k1];
          }
          found=true;
          break;
        }
      }
      if(!found) break;
    }
  }
  if(idxvar) {
    var ret2=[];
    for(var i in ret) ret2.push(ret[i]);
    ret=ret2;
  }
  return ret;
}

/** 
 *  Group: DateTime functions    
 */
 
/**
 *  Function: ng_DefaultDateFormat
 *  Gets default date format according to selected language.  
 *  
 *  Syntax:
 *    string *ng_DefaultDateFormat* (bool parse [, bool shortfmt=false])
 *  
 *  Parameters: 
 *    parse - if TRUE, return date and time format for parsing purposes.
 *    shortfmt - if TRUE,  return date and time short format, ignored if parse is TRUE
 *     
 *  Returns:
 *    Default date format.
 *     
 *  See also:
 *    Format strings in <ng_FormatDateTime>.   
 */       
function ng_DefaultDateFormat(parse,shortfmt)
{
  if(parse) shortfmt=false;
  var s=ngTypesTxt('date_'+(shortfmt ? 'short' : '')+'format'+(parse ? '_parse' : ''),'');
  if(s=='') s=ngTypesTxt('date_'+(shortfmt ? 'short' : '')+'format','');
  if((s=='')&&(shortfmt)) return ng_DefaultDateFormat(parse,false);
  return s;
}

/**
 *  Function: ng_DefaultTimeFormat
 *  Gets default time format according to selected language.  
 *  
 *  Syntax:
 *    string *ng_DefaultTimeFormat* (bool parse [, bool shortfmt=false])
 *  
 *  Parameters: 
 *    parse - if TRUE, return date and time format for parsing purposes.
 *    shortfmt - if TRUE,  return date and time short format, ignored if parse is TRUE
 *        
 *  Returns:
 *    Default time format.
 *     
 *  See also:
 *    Format strings in <ng_FormatDateTime>.   
 */       
function ng_DefaultTimeFormat(parse,shortfmt)
{
  if(parse) shortfmt=false;
  var s=ngTypesTxt('time_'+(shortfmt ? 'short' : '')+'format'+(parse ? '_parse' : ''),'');
  if(s=='') s=ngTypesTxt('time_'+(shortfmt ? 'short' : '')+'format','');
  if((s=='')&&(shortfmt)) return ng_DefaultTimeFormat(parse,false);
  return s;
}

/**
 *  Function: ng_DefaultDateTimeFormat
 *  Gets default date and time format according to selected language.  
 *  
 *  Syntax:
 *    string *ng_DefaultDateTimeFormat* (bool parse [, bool shortfmt=false])
 *    
 *  Parameters:
 *    parse - if TRUE, return date and time format for parsing purposes.
 *    shortfmt - if TRUE,  return date and time short format, ignored if parse is TRUE
 *  
 *  Returns:
 *    Default date and time format.
 *     
 *  See also:
 *    Format strings in <ng_FormatDateTime>.   
 */       
function ng_DefaultDateTimeFormat(parse,shortfmt)
{
  if(parse) shortfmt=false;
  var s=ngTypesTxt('datetime_'+(shortfmt ? 'short' : '')+'format'+(parse ? '_parse' : ''),'');
  if(s=='') s=ngTypesTxt('datetime_'+(shortfmt ? 'short' : '')+'format','');
  if((s=='')&&(shortfmt)) return ng_DefaultDateTimeFormat(parse,false);
  return s;
}

/**
 *  Variable: ng_DateFormat
 *  Gets default date format function.
 *  
 *  Default value: <ng_DefaultDateFormat>   
 */
var ng_DateFormat     = ng_DefaultDateFormat;
/**
 *  Variable: ng_TimeFormat
 *  Gets default time format function.
 *  
 *  Default value: <ng_DefaultTimeFormat>   
 */
var ng_TimeFormat     = ng_DefaultTimeFormat;
/**
 *  Variable: ng_DateTimeFormat
 *  Gets default date and time format function.
 *  
 *  Default value: <ng_DefaultDateTimeFormat>   
 */
var ng_DateTimeFormat = ng_DefaultDateTimeFormat;


/**
 *  Function: ng_ExtractDate
 *  Extracts date part from datetime variable.   
 *  
 *  Syntax:
 *    date *ng_ExtractDate* (date d)
 *  
 *  Parameters:
 *    -    
 *  
 *  Returns:
 *    Date without time part.
 */       
function ng_ExtractDate(dt)
{
  if(!ng_typeDate(dt)) return;
  return new Date(dt.getFullYear(),dt.getMonth(),dt.getDate());
} 

/**
 *  Function: ng_LeapYear
 *  Detects if year is a leap year.   
 *  
 *  Syntax:
 *    bool *ng_LeapYear* (int year)
 *  
 *  Parameters:
 *    -    
 *  
 *  Returns:
 *    TRUE if year is a leap year.
 */       
function ng_LeapYear(y)
{
  return (((y%4 == 0)&&(y%100 != 0))||(y%400 == 0)); 
}

/**
 *  Function: ng_DaysInMonth
 *  Determines number of days in month.   
 *  
 *  Syntax:
 *    bool *ng_LeapYear* (int month[, int year])
 *  
 *  Parameters:
 *    -    
 *  
 *  Returns:
 *    Number of days.
 */       
function ng_DaysInMonth(m,y)
{
  switch (m)
  {
  /*	The February case, check for leap year */
    case 2:
      if(typeof y === 'undefined') y=new Date().getFullYear();
      return (ng_LeapYear(y) ? 29 : 28);
  /* Months with 31 days */
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    default:
      return 30;
  }
}

// Field        | Full Form          | Short Form
// -------------+--------------------+-----------------------
// Year         | yyyy (4 digits)    | yy (2 digits), y (2 or 4 digits)
// Month        | MMM (name or abbr.)| MM (2 digits), M (1 or 2 digits)
//              | NNN (abbr.)        |
// Day of Month | dd (2 digits)      | d (1 or 2 digits)
// Day of Week  | EE (name)          | E (abbr)
// Hour (1-12)  | hh (2 digits)      | h (1 or 2 digits)
// Hour (0-23)  | HH (2 digits)      | H (1 or 2 digits)
// Hour (0-11)  | KK (2 digits)      | K (1 or 2 digits)
// Hour (1-24)  | kk (2 digits)      | k (1 or 2 digits)
// Minute       | mm (2 digits)      | m (1 or 2 digits)
// Second       | ss (2 digits)      | s (1 or 2 digits)
// Milliseconds | u                  |
// AM/PM        | a                  |

/**
 *  Function: ng_FormatTime
 *  Formats time to string.   
 *  
 *  Syntax:
 *    string *ng_FormatTime* (date d [, string format, mixed def])
 *  
 *  Parameters:
 *    -    
 *  
 *  Returns:
 *    Formated time.
 *     
 *  See also:
 *    Format strings in <ng_FormatDateTime>.   
 */       
function ng_FormatTime(date, format, def) 
{
  if((typeof format==='undefined')||(format=='')) format=ng_TimeFormat(false);
  return ng_FormatDateTime(date, format, def);
}

/**
 *  Function: ng_FormatDate
 *  Formats date to string.   
 *  
 *  Syntax:
 *    string *ng_FormatDate* (date d [, string format, mixed def])
 *  
 *  Parameters:
 *    d - date
 *    format - format string
 *    def - returned value if d is not date      
 *    
 *  Returns:
 *    Formated date.
 *     
 *  See also:
 *    Format strings in <ng_FormatDateTime>.   
 */       
function ng_FormatDate(date, format, def) 
{
  if((typeof format==='undefined')||(format=='')) format=ng_DateFormat(false);
  return ng_FormatDateTime(date, format, def);
}
/**
 *  Function: ng_FormatDateTime
 *  Formats date and time to string.   
 *  
 *  Syntax:
 *    string *ng_FormatDateTime* (date d [, string format, mixed def])
 *  
 *  Parameters:
 *    d - date
 *    format - format string
 *    def - returned value if d is not date      
 *
 *  Format strings:
 *   yyyy - year (4 digits)
 *   yy - year (2 digits)
 *   y - year (2 or 4 digits)
 *   q - quarter (1 digit)
 *   MM - month (2 digits)
 *   M - month (1 or 2 digits)  
 *   MMM - full name of month
 *   MMMM - full name of month used in formating
 *   NNN - short name of month
 *   d - day of month (1 or 2 digits)
 *   dd - day of month (2 digits)
 *   E - short name of day of week       
 *   EE - full name of day of week   
 *   EEE - full name of day of week used in formating
 *   HH - hour 0-23 (2 digits)
 *   H - hour 0-23 (1 or 2 digits)
 *   hh - hour 1-12 (2 digits)
 *   h - hour 1-12 (1 or 2 digits)
 *   kk - hour 1-24 (2 digits)
 *   k - hour 1-24 (1 or 2 digits)
 *   KK - hour 0-11 (2 digits)
 *   K - hour 0-11 (1 or 2 digits)
 *   mm - minute (2 digits)
 *   m - minute (1 or 2 digits)
 *   ss - second (2 digits)
 *   s - second (1 or 2 digits)
 *   u - milliseconds
 *   a - AM/PM
 *   aa - locale version of AM/PM
 *  
 *  Returns:
 *    Formated date and time.
 */       
function ng_FormatDateTime(date, format,def) 
{
  date=ng_toDate(date);
  if(date===null) return ngVal(def,'');

  if(ng_IsArrayVar(format))
  {
    if(!format.length) format='';
    else format=format[0];
  }

  var y=date.getFullYear();
  var M=date.getMonth()+1;
  var d=date.getDate();
  var E=date.getDay();
  var H=date.getHours();
  var m=date.getMinutes();
  var s=date.getSeconds();
  var u=date.getMilliseconds();

  if((typeof format==='undefined')||(format=='')) format=ng_DateTimeFormat(false);
  format+='';
  var h=H;
  if(H>12) h=H-12;
  else if(!H) h=12;	
  var K=(H>11 ? H-12 : H);

  function LZ(x) { return(x<10 ? '0'+x : x); }
  function formatms(x) {
    var t=('000'+(x%1000));
    return t.substr(t.length-3,3);
  }
  
  var res='';
  var token,c,i=0;
  while(i < format.length) 
  {
    c=format.charAt(i);
    if((c==="\\")&&(i+1 < format.length)) {
      res+=format.charAt(i+1);
      i+=2;
      continue;      
    }
    token='';
    while ((format.charAt(i)==c) && (i < format.length)) 
      token += format.charAt(i++);

    switch(token)
    {
      case 'y': 
      case 'yyyy': res+=y; break;
      case 'yy': 	 res+=(''+y).substring(2,4); break;
      case 'q':    res+=Math.ceil(M/3); break;
      case 'M':    res+=M; break;
      case 'MM':   res+=LZ(M); break;
      case 'MMM':  res+=ngTypesTxt('calendar_months')[M-1]; break;
      case 'MMMM': res+=ngTypesTxt('calendar_months_formating')[M-1]; break;
      case 'NNN':  res+=ngTypesTxt('calendar_months_short')[M-1]; break;
      case 'd':    res+=d; break;
      case 'dd':   res+=LZ(d); break;
      case 'E':    res+=ngTypesTxt('calendar_days_short')[E]; break;
      case 'EE':   res+=ngTypesTxt('calendar_days')[E]; break;
      case 'EEE':  res+=ngTypesTxt('calendar_days_formating')[E]; break;
      case 'H':    res+=H; break;
      case 'HH':   res+=LZ(H); break;
      case 'h':    res+=h; break;
      case 'hh':   res+=LZ(h); break;
      case 'K':    res+=K; break;
      case 'k':    res+=H+1; break;
      case 'KK':   res+=LZ(K); break;
      case 'kk':   res+=LZ(H+1); break;
      case 'm':    res+=m; break; 
      case 'mm':   res+=LZ(m); break;
      case 's':    res+=s; break;
      case 'ss':   res+=LZ(s); break;
      case 'a':    res+=(H>11 ? 'PM' : 'AM'); break;
      case 'aa':   res+=ngTypesTxt('time_am_pm',['AM','PM'])[(H>11 ? 1 : 0)]; break;
      case 'u':    res+=formatms(u); break;
      default:     res+=token; break;
    }		
  }
  return res;
}

/**
 *  Function: ng_ParseTime
 *  Parses time from string.   
 *  
 *  Syntax:
 *    date *ng_ParseTime* (string s [, string format, mixed def])
 *  
 *  Parameters:
 *    s - string to be parsed
 *    format - format string
 *    def - returned value if d is not time      
 *  
 *  Returns:
 *    Parsed time.
 *    
 *  See also:
 *    Format strings in <ng_FormatDateTime>.   
 */       
function ng_ParseTime(date, format,def) 
{
  if((typeof format==='undefined')||(format=='')) format=ng_TimeFormat(true);
  return ng_ParseDateTime(date, format,def);
}

/**
 *  Function: ng_ParseDate
 *  Parses date from string.   
 *  
 *  Syntax:
 *    date *ng_ParseDate* (string s [, string format, mixed def])
 *  
 *  Parameters:
 *    s - string to be parsed
 *    format - format string
 *    def - returned value if d is not date      
 *  
 *  Returns:
 *    Parsed date.
 *     
 *  See also:
 *    Format strings in <ng_FormatDateTime>.   
 */       
function ng_ParseDate(date, format, def) 
{
  if((typeof format==='undefined')||(format=='')) format=ng_DateFormat(true);
  var d=ng_ParseDateTime(date, format);
  if(ng_isInvalid(d)) return def;
  d=ng_ExtractDate(d);
  if(ng_isInvalid(d)) return def;
  return d;
}

/**
 *  Function: ng_ParseDateTime
 *  Parses date and time from string.   
 *  
 *  Syntax:
 *    date *ng_ParseDateTime* (string s [, string format, mixed def])
 *  
 *  Parameters:
 *    s - string to be parsed
 *    format - format string
 *    def - returned value if d is not datetime      
 *  
 *  Returns:
 *    Parsed date and time.
 *     
 *  See also:
 *    Format strings in <ng_FormatDateTime>.   
 */       
function ng_ParseDateTime(val, format, def) 
{
  if((typeof format==='undefined')||(format=='')) format=ng_DateTimeFormat(true);
  
  if(ng_IsArrayVar(format))
  {
    for(var i=0;i<format.length;i++)
    {
      var d=ng_ParseDateTime(val,format[i],null);
      if((d!==null)&&(ng_typeDate(d))) return d;      
    }
    return def;
  }
  
  val+='';
  format+='';
  var token2="";
  var c,x,y,token;

  var now=new Date();
  var year=now.getFullYear(),month,date,hh=0,mm=0,ss=0,uu=0;
  var ampm="",names,name;

  function getInt(str,i,minlength,maxlength) 
  {
    var token,i;
    for(var x=maxlength; x>=minlength; x--) 
    {
      token=str.substring(i,i+x);
      if(token.length < minlength) return null;
      if(ng_isDigits(token)) return token; 
    }
    return null;
  }

  var i_val=0;
  var i_format=0;
  while (i_format < format.length) 
  {		
    c=format.charAt(i_format);
    token="";
    while ((format.charAt(i_format)==c) && (i_format < format.length)) 
      token += format.charAt(i_format++);
      
    switch(token)
    {
      case 'yyyy':
      case 'yy':
      case 'y':
        if (token=='yyyy') { x=4;y=4; }
        if (token=='yy')   { x=2;y=2; }
        if (token=='y')    { x=2;y=4; }
        year=getInt(val,i_val,x,y);
        if(year==null) return def; 
        i_val += year.length;
        if(year.length==2) 
        {
          if(year > 70) year=1900+(year-0); 
          else          year=2000+(year-0); 
        }
        break;
      case 'MMMM':
      case 'MMM':
      case 'NNN':
        month=0;
        switch(token) {
          case 'MMMM': names=ngTypesTxt('calendar_months_formating'); break;
          case 'MMM':  names=ngTypesTxt('calendar_months'); break;
          default:     names=ngTypesTxt('calendar_months_short'); break;
        }

        for(var i=0; i<names.length; i++) 
        {
          name=names[i];
          if (val.substring(i_val,i_val+name.length).toLowerCase()==name.toLowerCase()) 
          {
            month=i+1;
            i_val += name.length;
            break;
           }
        }
        if ((month < 1)||(month>12)) return def;
        break;
      case 'EEE':
      case 'EE':
      case 'E':
        switch(token) {
          case 'EEE': names=ngTypesTxt('calendar_days_formating'); break
          case 'E':   names=ngTypesTxt('calendar_days_short'); break
          default:    names=ngTypesTxt('calendar_days'); break
        }
        for(var i=0; i<names.length; i++) 
        {
          name=names[i];
          if(val.substring(i_val,i_val+name.length).toLowerCase()==name.toLowerCase()) 
          {
            i_val += name.length;
            break;
          }  				
        }
        break;
      case 'q':
        var quarter=getInt(val,i_val,1,1);
        if((quarter==null)||(quarter<1)||(quarter>4)) return def;
        month=((quarter-1)*3+1);
        i_val+=1;
        break;
      case 'MM':
      case 'M':
        month=getInt(val,i_val,token.length,2);
        if((month==null)||(month<1)||(month>12)) return def;
        i_val+=month.length;
        break;
      case 'dd':
      case 'd':
         date=getInt(val,i_val,token.length,2);
        if((date==null)||(date<1)||(date>31)) return def;
        i_val+=date.length;
        break;
      case 'hh':
      case 'h':
        hh=getInt(val,i_val,token.length,2);
        if((hh==null)||(hh<1)||(hh>12)) return def;
        i_val+=hh.length;
        break;
      case 'HH':
      case 'H':
        hh=getInt(val,i_val,token.length,2);
        if((hh==null)||(hh<0)||(hh>23)) return def;
        i_val+=hh.length;
        break;
      case 'KK':
      case 'K':
        hh=getInt(val,i_val,token.length,2);
        if((hh==null)||(hh<0)||(hh>11)) return def;
        i_val+=hh.length;
        break;
      case 'kk':
      case 'k':
        hh=getInt(val,i_val,token.length,2);
        if((hh==null)||(hh<1)||(hh>24)) return def;
        i_val+=hh.length; hh--;
        break;
      case 'mm':
      case 'm':
        mm=getInt(val,i_val,token.length,2);
        if((mm==null)||(mm<0)||(mm>59)) return def;
        i_val+=mm.length;
        break;
      case 'ss':
      case 's':
        ss=getInt(val,i_val,token.length,2);
        if((ss==null)||(ss<0)||(ss>59)) return def;
        i_val+=ss.length;
        break;
      case 'aa':
        names=ngTypesTxt('time_am_pm');
        ampm="";
        for(var i=0; i<names.length && i<2; i++)
        {
          name=names[i];
          if (val.substring(i_val,i_val+name.length).toLowerCase()==name.toLowerCase())
          {
            if(!i) ampm='AM';
            else ampm='PM';
            i_val += name.length;
            break;
           }
        }
        if(ampm!=='') break;
      case 'a':
        if(val.substring(i_val,i_val+2).toLowerCase()=='am')      ampm='AM';
        else if(val.substring(i_val,i_val+2).toLowerCase()=='pm') ampm='PM';
        else return def;
        i_val+=2;
        break;
      case 'u':
        uu=getInt(val,i_val,1,3);
        if(uu==null) return def;
        i_val+=uu.length;
        uu=(uu+'000').substr(0,3);
        if((uu<0)||(uu>=1000)) return def;
        break;
      default:
        if(val.substring(i_val,i_val+token.length)!=token) return def;
        else i_val+=token.length;
        break;
    }
  }
  if(i_val != val.length) return def; // not all parsed

  var no_date=ng_isEmpty(date);
  var no_month=ng_isEmpty(month);
/*  var no_hh=ng_isEmpty(hh);
  var no_mm=ng_isEmpty(mm);
  var no_ss=ng_isEmpty(ss);
  var no_uu=ng_isEmpty(uu);
  
  if((no_hh)&&(no_mm)&&(no_ss)&&(no_uu))
  {
    hh=now.getHours();
    mm=now.getMinutes();
    ss=now.getSeconds();
    uu=now.getMilliseconds();
  }
  else
  {
    if(no_hh) hh=0;
    if(no_mm) mm=0;
    if(no_ss) ss=0;
    if(no_uu) uu=0;    
  //}*/

  if(no_date)
  {
    if(no_month) date=now.getDate();
    else date=1;
  }
  if(no_month) month=now.getMonth()+1;

  // Is valid month?
  if((month==2)&&(date>28)) 
  {
    if((!ng_LeapYear(year))||(date>29)) return def;		
  }
  if((date>30)&&((month==4)||(month==6)||(month==9)||(month==11))) return def;

  if((hh<12)&&(ampm=='PM'))      hh=hh-0+12;
  else if((hh>11)&&(ampm=='AM')) hh-=12;
  return new Date(year,month-1,date,hh,mm,ss,uu);
}


/**
 *  Function: ng_ParseJSONDateTime
 *  Parses date string formated by JSON encoder.   
 *  
 *  Syntax:
 *    date *ng_ParseJSONDateTime* (string s [ mixed def])
 *  
 *  Parameters:
 *    s - string to be parsed
 *    def - returned value if d is not datetime      
 *  
 *  Returns:
 *    Parsed date and time.
 */       
function ng_ParseJSONDateTime(val,def) 
{
  var a = ng_ParseJSONDateTime.REGEXP_ISO.exec(val);
  if(a) return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));

  a = ng_ParseJSONDateTime.REGEXP_MS.exec(val);
  if(a) {
    var offset = 0;
    if (a[2]) {
      offset = (ng_toNumber(a[4]) * 60) + ng_toNumber(a[5]);
      offset *= ((a[3] == '-') ? 1 : -1);
    }
    // TODO: Check timezones
    var date=new Date(parseInt(a[1]))
    offset -= date.getTimezoneOffset();
    date.setTime(Number(Number(date) + (offset * 60 * 1000)));
    
    return date;
  }
  return def;
}
ng_ParseJSONDateTime.REGEXP_ISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
ng_ParseJSONDateTime.REGEXP_MS = /^\/Date\(([+-]?[0-9]*)(([+-]?)([0-9]{2})([0-9]{2}))?\)\/$/;
    
/**
 *  Function: ng_GetDateFormat
 *  Tries to figure out the date format from given text date. 
 *  
 *  Syntax:
 *    date *ng_GetDateFormat* (string s [, bool preferEuro=true])
 *  
 *  Parameters:
 *    -    
 *  
 *  Returns:
 *    Date format.
 *     
 *  See also:
 *    Format strings in <ng_FormatDateTime>.   
 */       
function ng_GetDateFormat(val, preferEuro) 
{
  if(val=='') return '';
  preferEuro=ngVal(preferEuro,true);
  var generalFormats=new Array('y-M-d','MMM d, y','MMM d,y','y-MMM-d','d-MMM-y','MMM d');
  var monthFirst=new Array('M/d/y','M-d-y','M.d.y','MMM-d','M/d','M-d');
  var dateFirst =new Array('d/M/y','d-M-y','d.M.y','d-MMM','d/M','d-M');
  var checkList=new Array(generalFormats,preferEuro?dateFirst:monthFirst,preferEuro?monthFirst:dateFirst);
  var d=null;
  for (var i=0; i<checkList.length; i++) 
  {
    var l=checkList[i];
    for (var j=0; j<l.length; j++) 
    {
      d=ng_ParseDate(val,l[j]);
      if(typeof d !== 'undefined') return l[j]; 
    }
  }
  return '';
}

/** 
 *  Group: String functions    
 */
 
/**
 *  Function: ng_Trim
 *  Trims leading and trailing spaces.   
 *  
 *  Syntax:
 *    string *ng_Trim* (string s)
 *  
 *  Parameters:
 *    s - string to be trimmed     
 *  
 *  Returns:
 *    Trimmed string.
 */       
function ng_Trim(s) {
  if (s===true) return '1';
  if ((s===false) || (s===null)) return '';

  var t = typeof(s);
  if ((t!='string') && (t!='number')) return t;

  return (''+s).replace(/^\s+|\s+$/g,"");
}

/**
 *  Function: ng_LTrim
 *  Trims leading spaces.   
 *  
 *  Syntax:
 *    string *ng_LTrim* (string s)
 *  
 *  Parameters:
 *    s - string to be trimmed     
 *  
 *  Returns:
 *    Trimmed string.
 */       
function ng_LTrim(s) {
  return (''+s).replace(/^\s+/,"");
}

/**
 *  Function: ng_RTrim
 *  Trims trailing spaces.   
 *  
 *  Syntax:
 *    string *ng_RTrim* (string s)
 *  
 *  Parameters:
 *    s - string to be trimmed     
 *  
 *  Returns:
 *    Trimmed string.
 */       
function ng_RTrim(s) {
  return (''+s).replace(/\s+$/,"");
}

/**
 *  Function: ng_StripPrefix
 *  Strips given prefix from a string.   
 *  
 *  Syntax:
 *    string *ng_StripPrefix* (string s, string prefix [, bool caseinsensitive=false])
 *  
 *  Parameters:
 *    s - string      
 *    prefix - prefix string
 *    caseinsensitive - if TRUE, prefix is tested without case sensitivity  
 *  
 *  Returns:
 *    String without prefix.
 */       
function ng_StripPrefix(v, pref, caseinsensitive)
{
  v=''+v;
  pref=''+pref;
  var p=v.substring(0,pref.length);
  if(caseinsensitive) { p=p.toLowerCase(); pref=pref.toLowerCase(); }
  return (p==pref ? v.substring(pref.length,v.length) : v);
}

/**
 *  Function: ng_StripSuffix
 *  Strips given suffix from a string.   
 *  
 *  Syntax:
 *    string *ng_StripSuffix* (string s, string suffix [, bool caseinsensitive=false])
 *  
 *  Parameters:
 *    s - string      
 *    suffix - suffix string
 *    caseinsensitive - if TRUE, suffix is tested without case sensitivity  
 *  
 *  Returns:
 *    String without suffix.
 */       
function ng_StripSuffix(v, suff, caseinsensitive)
{
  v=''+v;
  suff=''+suff;
  if(v.length<suff.length) return v;
  var s=v.substring(v.length-suff.length,v.length);
  if(caseinsensitive) { s=s.toLowerCase(); suff=suff.toLowerCase(); }
  return (s==suff ? v.substring(0,v.length-suff.length) : v);
}

/**
 *  Function: ng_AddPrefix
 *  Adds given prefix to a string (if not already present).   
 *  
 *  Syntax:
 *    string *ng_AddPrefix* (string s, string prefix [, bool caseinsensitive=false])
 *  
 *  Parameters:
 *    s - string      
 *    prefix - prefix string
 *    caseinsensitive - if TRUE, prefix is tested without case sensitivity  
 *  
 *  Returns:
 *    String with prefix.
 */       
function ng_AddPrefix(v, pref, caseinsensitive) {
  return ''+pref+ng_StripPrefix(v,pref,caseinsensitive); 
}

/**
 *  Function: ng_AddSuffix
 *  Adds given suffix to a string (if not already present).   
 *  
 *  Syntax:
 *    string *ng_AddSuffix* (string s, string suffix [, bool caseinsensitive=false])
 *  
 *  Parameters:
 *    s - string      
 *    suffix - suffix string
 *    caseinsensitive - if TRUE, suffix is tested without case sensitivity  
 *  
 *  Returns:
 *    String with suffix.
 */       
function ng_AddSuffix(v, suff, caseinsensitive) {
  return ng_StripSuffix(v,suff,caseinsensitive)+suff; 
}

/**
 *  Function: ng_AddSlash
 *  Adds slash '/' to end of a string (if not already present).   
 *  
 *  Syntax:
 *    string *ng_AddSlash* (string s)
 *  
 *  Parameters:
 *    s - string      
 *  
 *  Returns:
 *    String with slash '/'.
 */       
function ng_AddSlash(v) {
  return ng_AddSuffix(v,'/');
}

/**
 *  Function: ng_StripSlash
 *  Strips slash '/' from end of a string.   
 *  
 *  Syntax:
 *    string *ng_StripSlash* (string s)
 *  
 *  Parameters:
 *    s - string      
 *  
 *  Returns:
 *    String without slash '/'.
 */       
function ng_StripSlash(v) {
  return ng_StripSuffix(v,'/');
}

/**
 *  Function: ng_AddBackslash
 *  Adds backslash '\' to end of a string (if not already present).
 *  
 *  Syntax:
 *    string *ng_AddBackslash* (string s)
 *  
 *  Parameters:
 *    s - string      
 *  
 *  Returns:
 *    String with backslash '\'.
 */       
function ng_AddBackslash(v) {
  return ng_AddSuffix(v,"\\");
}

/**
 *  Function: ng_StripBackslash
 *  Strips backslash '\' from end of a string.
 *  
 *  Syntax:
 *    string *ng_StripBackslash* (string s)
 *  
 *  Parameters:
 *    s - string      
 *  
 *  Returns:
 *    String without backslash '\'.
 */       
function ng_StripBackslash(v) {
  return ng_StripSuffix(v,"\\");
}

/**
 *  Function: ng_StripQuotes
 *  Strips quotes from quoted string.   
 *  
 *  Syntax:
 *    string *ng_StripQuotes* (string s [, string quotestr])
 *  
 *  Parameters:
 *    s - string
 *    quotestr - optional quote string definition, if not specified  ' or " is used         
 *  
 *  Returns:
 *    String without quotes.
 */       
function ng_StripQuotes(v,q) 
{
  if(ng_isEmpty(q))
  {
    var o=ng_StripQuotes(v,'"');
    if(o.length<v.length) return o;
    return ng_StripQuotes(v,"'");
  }
  q=''+q;
  if((v.length>=q.length*2)&&(v.substring(0,q.length)==q)&&(v.substring(v.length-q.length,v.length)==q))
    return v.substring(q.length,v.length-q.length);
  return v;
}        

/**
 *  Function: ng_QuoteStr
 *  Adds quotes to string.   
 *  
 *  Syntax:
 *    string *ng_QuoteStr* (string s [, string quotestr])
 *  
 *  Parameters:
 *    s - string
 *    quotestr - optional quote string definition, if not specified  ' or " is used         
 *  
 *  Returns:
 *    String with quotes.
 */       
function ng_QuoteStr(v,q)
{
  v=ng_StripQuotes(v,q);
  if(ng_isEmpty(q)) q='"';
  q=''+q;
  return q+v+q;
} 

/**
 *  Function: ng_Unformat3Num
 *  Removes thousands separator from string.    
 *  
 *  Syntax:
 *    string *ng_Unformat3Num* (mixed var [, string separator=ngTxt('thousands_separator')])
 *  
 *  Parameters:
 *    var - variable to convert
 *    separator - thousands separator      
 *  
 *  Returns:
 *    String without thousands separator.
 */       
function ng_Unformat3Num(v,sep)
{
  if(!ng_typeString(v)) return v;
  if(typeof sep==='undefined')
    sep=ngTypesTxt('thousands_separator',' ');
  return ng_Format3Num(v,'',sep);
}

/**
 *  Function: ng_Format3Num
 *  Adds thousands separator to string.    
 *  
 *  Syntax:
 *    string *ng_Format3Num* (mixed var [, string separator=ngTxt('thousands_separator')])
 *  
 *  Parameters:
 *    var - variable to convert
 *    separator - thousands separator      
 *  
 *  Returns:
 *    String with thousands separator.
 */       
function ng_Format3Num(v,sep,rsep)
{
  if(typeof sep==='undefined')
    sep=ngTypesTxt('thousands_separator',' ');
  if((ng_isInvalid(v))||(ng_typeObject(v))) return '';    
  v=ng_toString(v);
  rsep=ngVal(rsep,sep);
  var rsep_nbspace=(typeof rsep==='string')&&(rsep.charCodeAt(0)===160); // handle non-breaking space
  var dsep=ng_DecimalSeparator();
  var from=v.lastIndexOf(dsep);
  if((from<0)&&(sep!='.')&&(rsep!='.')) from=v.lastIndexOf('.');
  if(from<0) {
    var c;
    for(from=v.length-1;from>=0;from--)
    {
      c=v.charAt(from);
      if((c>='0')&&(c<='9')) break;
    }
  }
  else from--;
  var s='',j=0,c,sign=false;
  for(var i=v.length-1;i>=0;i--)
  {
    c=v.charAt(i);
    if(i<=from)
    {
      if((c==rsep)||((c===' ')&&(rsep_nbspace))||((rsep===' ')&&(v.charCodeAt(i)===160))) continue;
      if((c==='+')||(c==='-')) { sign=true; s=c+s; continue; }
      if((c<'0')||(c>'9')||(sign)) return v;
      if((!(j++%3))&&(i<from)) s=sep+s;
    }
    s=c+s;
  }
  return s;
}
