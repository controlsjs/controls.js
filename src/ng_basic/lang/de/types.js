/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2025 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */
if(typeof ngc_Lang === 'undefined') ngc_Lang={};
// Locale German - Luxembourg (de-LU)
// Locale German - Germany (de-DE)
// Locale German - Belgium (de-BE)
// Default locale German (de)
if(typeof ngc_Lang['de'] === 'undefined') ngc_Lang['de']={};
ngc_Lang['de']['locale_language']           = 'German';
ngc_Lang['de']['locale_language_native']    = 'Deutsch';
ngc_Lang['de']['decimal_separator']         = ',';
ngc_Lang['de']['thousands_separator']       = '.';
ngc_Lang['de']['date_format']               = 'd.M.yyyy';
ngc_Lang['de']['date_shortformat']          = 'd.M.yy';
ngc_Lang['de']['date_format_parse']         = 'd.M.y';
ngc_Lang['de']['time_format']               = 'HH:mm:ss';
ngc_Lang['de']['time_shortformat']          = 'HH:mm';
ngc_Lang['de']['time_format_parse']         = ["H:m:s","H:m"];
ngc_Lang['de']['time_am_pm']                = ["AM","PM"];
ngc_Lang['de']['datetime_format']           = 'd.M.yyyy HH:mm:ss';
ngc_Lang['de']['datetime_shortformat']      = 'd.M.yyyy HH:mm';
ngc_Lang['de']['datetime_format_parse']     = ["d.M.y H:m:s","d.M.y H:m"];
ngc_Lang['de']['calendar_months']           = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
ngc_Lang['de']['calendar_months_short']     = ["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];
ngc_Lang['de']['calendar_months_formating'] = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
ngc_Lang['de']['calendar_days']             = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
ngc_Lang['de']['calendar_days_short']       = ["So","Mo","Di","Mi","Do","Fr","Sa"];
ngc_Lang['de']['calendar_days_formating']   = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];

// Locale German - Austria (de-at)
if(typeof ngc_Lang['de-at'] === 'undefined') ngc_Lang['de-at']={};
ngc_Lang['de-at']['decimal_separator']         = ',';
ngc_Lang['de-at']['thousands_separator']       = ' ';
ngc_Lang['de-at']['calendar_months']           = ["Jänner","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
ngc_Lang['de-at']['calendar_months_short']     = ["Jän","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];
ngc_Lang['de-at']['calendar_months_formating'] = ["Jänner","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];

// Locale German - Liechtenstein (de-li)
// Locale German - Switzerland (de-ch)
(function(n) { for(var i=n.length-1;i>=0;i--) { var l=n[i];
if(typeof ngc_Lang[l] === 'undefined') ngc_Lang[l]={};
ngc_Lang[l]['decimal_separator']         = '.';
ngc_Lang[l]['thousands_separator']       = '’';
}})(["de-ch","de-li"]);

