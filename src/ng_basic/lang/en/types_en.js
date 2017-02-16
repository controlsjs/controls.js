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
if(typeof ngc_Lang === 'undefined') ngc_Lang={};
// Default locale English (en)
if(typeof ngc_Lang['en'] === 'undefined') ngc_Lang['en']={};
ngc_Lang['en']['locale_language']           = "English";
ngc_Lang['en']['locale_language_native']    = "English";
ngc_Lang['en']['decimal_separator']         = ".";
ngc_Lang['en']['thousands_separator']       = ",";
ngc_Lang['en']['date_format']               = "M/d/yyyy";
ngc_Lang['en']['date_shortformat']          = "M/d/yy";
ngc_Lang['en']['date_format_parse']         = "M/d/y";
ngc_Lang['en']['time_format']               = "h:mm:ss a";
ngc_Lang['en']['time_shortformat']          = "h:mm a";
ngc_Lang['en']['time_format_parse']         = ["h:m:s a","h:m a","h:m:sa","h:ma",'H:m:s','H:m'];
ngc_Lang['en']['datetime_format']           = "M/d/yyyy h:mm:ss a";
ngc_Lang['en']['datetime_shortformat']      = "M/d/yyyy h:mm a";
ngc_Lang['en']['datetime_format_parse']     = ["M/d/y h:m:s a","M/d/y h:m a","M/d/y h:m:sa","M/d/y h:ma","M/d/y H:m:s","M/d/y H:m"];
ngc_Lang['en']['calendar_months']           = ["January","February","March","April","May","June","July","August","September","October","November","December"];
ngc_Lang['en']['calendar_months_short']     = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
ngc_Lang['en']['calendar_days']             = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
ngc_Lang['en']['calendar_days_short']       = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

// Locale English - United Kingdom (en-gb)
if(typeof ngc_Lang['en-gb'] === 'undefined') ngc_Lang['en-gb']={};
ngc_Lang['en-gb']['date_format']               = "dd/MM/yyyy";
ngc_Lang['en-gb']['date_shortformat']          = "dd/MM/yy";
ngc_Lang['en-gb']['date_format_parse']         = "d/M/y";
ngc_Lang['en-gb']['time_format']               = "HH:mm:ss";
ngc_Lang['en-gb']['time_shortformat']          = "HH:mm";
ngc_Lang['en-gb']['time_format_parse']         = ["H:m:s","H:m","h:m:s a","h:m a","h:m:sa","h:ma"];
ngc_Lang['en-gb']['datetime_format']           = "dd/MM/yyyy HH:mm:ss";
ngc_Lang['en-gb']['datetime_shortformat']      = "dd/MM/yyyy HH:mm";
ngc_Lang['en-gb']['datetime_format_parse']     = ["d/M/y H:m:s","d/M/y H:m","d/M/y h:m:s a","d/M/y h:m a","d/M/y h:m:sa","d/M/y h:ma"];
