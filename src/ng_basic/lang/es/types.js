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
// Locale Spanish (es-IC)
// Locale Spanish - Equatorial Guinea (es-GQ)
// Locale Spanish - Spain (es-ES)
// Locale Spanish (es-EA)
// Default locale Spanish (es)
if(typeof ngc_Lang['es'] === 'undefined') ngc_Lang['es']={};
ngc_Lang['es']['locale_language']           = 'Spanish';
ngc_Lang['es']['locale_language_native']    = 'Español';
ngc_Lang['es']['decimal_separator']         = ',';
ngc_Lang['es']['thousands_separator']       = "";
ngc_Lang['es']['date_format']               = 'd/M/yyyy';
ngc_Lang['es']['date_shortformat']          = 'd/M/yy';
ngc_Lang['es']['date_format_parse']         = 'd/M/y';
ngc_Lang['es']['time_format']               = 'H:mm:ss';
ngc_Lang['es']['time_shortformat']          = 'H:mm';
ngc_Lang['es']['time_format_parse']         = ["H:m:s","H:m"];
ngc_Lang['es']['time_am_pm']                = ["a. m.","p. m."];
ngc_Lang['es']['datetime_format']           = 'd/M/yyyy H:mm:ss';
ngc_Lang['es']['datetime_shortformat']      = 'd/M/yyyy H:mm';
ngc_Lang['es']['datetime_format_parse']     = ["d/M/y H:m:s","d/M/y H:m"];
ngc_Lang['es']['calendar_months']           = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
ngc_Lang['es']['calendar_months_short']     = ["ene","feb","mar","abr","may","jun","jul","ago","sept","oct","nov","dic"];
ngc_Lang['es']['calendar_months_formating'] = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
ngc_Lang['es']['calendar_days']             = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
ngc_Lang['es']['calendar_days_short']       = ["dom","lun","mar","mié","jue","vie","sáb"];
ngc_Lang['es']['calendar_days_formating']   = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];

// Locale Spanish - Argentina (es-ar)
if(typeof ngc_Lang['es-ar'] === 'undefined') ngc_Lang['es-ar']={};
ngc_Lang['es-ar']['decimal_separator']         = ',';
ngc_Lang['es-ar']['thousands_separator']       = '.';
ngc_Lang['es-ar']['time_format']               = 'hh:mm:ss';
ngc_Lang['es-ar']['time_shortformat']          = 'hh:mm';
ngc_Lang['es-ar']['time_format_parse']         = ["hh:m:s","hh:m"];
ngc_Lang['es-ar']['datetime_format']           = 'd/M/yyyy hh:mm:ss';
ngc_Lang['es-ar']['datetime_shortformat']      = 'd/M/yyyy hh:mm';
ngc_Lang['es-ar']['datetime_format_parse']     = ["d/M/y hh:m:s","d/M/y hh:m"];

// Locale Spanish - Ecuador (es-ec)
// Locale Spanish - Bolivia, Plurinational State of (es-bo)
(function(n) { for(var i=n.length-1;i>=0;i--) { var l=n[i];
if(typeof ngc_Lang[l] === 'undefined') ngc_Lang[l]={};
ngc_Lang[l]['decimal_separator']         = ',';
ngc_Lang[l]['thousands_separator']       = '.';
ngc_Lang[l]['time_format']               = 'h:mm:ss aa';
ngc_Lang[l]['time_shortformat']          = 'h:mm aa';
ngc_Lang[l]['time_format_parse']         = ["h:m:s aa","h:m aa"];
ngc_Lang[l]['datetime_format']           = 'd/M/yyyy h:mm:ss aa';
ngc_Lang[l]['datetime_shortformat']      = 'd/M/yyyy h:mm aa';
ngc_Lang[l]['datetime_format_parse']     = ["d/M/y h:m:s aa","d/M/y h:m aa"];
}})(["es-bo","es-ec"]);

// Locale Spanish - Chile (es-cl)
if(typeof ngc_Lang['es-cl'] === 'undefined') ngc_Lang['es-cl']={};
ngc_Lang['es-cl']['decimal_separator']         = ',';
ngc_Lang['es-cl']['thousands_separator']       = '.';
ngc_Lang['es-cl']['date_format']               = 'dd-MM-yyyy';
ngc_Lang['es-cl']['date_shortformat']          = 'dd-MM-yy';
ngc_Lang['es-cl']['date_format_parse']         = 'd-M-y';
ngc_Lang['es-cl']['time_format']               = 'h:mm:ss aa';
ngc_Lang['es-cl']['time_shortformat']          = 'h:mm aa';
ngc_Lang['es-cl']['time_format_parse']         = ["h:m:s aa","h:m aa"];
ngc_Lang['es-cl']['datetime_format']           = 'dd-MM-yyyy h:mm:ss aa';
ngc_Lang['es-cl']['datetime_shortformat']      = 'dd-MM-yyyy h:mm aa';
ngc_Lang['es-cl']['datetime_format_parse']     = ["d-M-y h:m:s aa","d-M-y h:m aa"];
ngc_Lang['es-cl']['calendar_months_short']     = ["ene.","feb.","mar.","abr.","may.","jun.","jul.","ago.","sept.","oct.","nov.","dic."];

// Locale Spanish - Paraguay (es-py)
// Locale Spanish - Venezuela, Bolivarian Republic of (es-ve)
// Locale Spanish - Colombia (es-co)
(function(n) { for(var i=n.length-1;i>=0;i--) { var l=n[i];
if(typeof ngc_Lang[l] === 'undefined') ngc_Lang[l]={};
ngc_Lang[l]['decimal_separator']         = ',';
ngc_Lang[l]['thousands_separator']       = '.';
ngc_Lang[l]['time_format']               = 'h:mm:ss aa';
ngc_Lang[l]['time_shortformat']          = 'h:mm aa';
ngc_Lang[l]['time_format_parse']         = ["h:m:s aa","h:m aa"];
ngc_Lang[l]['datetime_format']           = 'd/M/yyyy h:mm:ss aa';
ngc_Lang[l]['datetime_shortformat']      = 'd/M/yyyy h:mm aa';
ngc_Lang[l]['datetime_format_parse']     = ["d/M/y h:m:s aa","d/M/y h:m aa"];
ngc_Lang[l]['calendar_months_short']     = ["ene.","feb.","mar.","abr.","may.","jun.","jul.","ago.","sept.","oct.","nov.","dic."];
}})(["es-co","es-ve","es-py"]);

// Locale Spanish - Costa Rica (es-cr)
if(typeof ngc_Lang['es-cr'] === 'undefined') ngc_Lang['es-cr']={};
ngc_Lang['es-cr']['decimal_separator']         = ',';
ngc_Lang['es-cr']['thousands_separator']       = ' ';
ngc_Lang['es-cr']['time_format']               = 'h:mm:ss aa';
ngc_Lang['es-cr']['time_shortformat']          = 'h:mm aa';
ngc_Lang['es-cr']['time_format_parse']         = ["h:m:s aa","h:m aa"];
ngc_Lang['es-cr']['datetime_format']           = 'd/M/yyyy h:mm:ss aa';
ngc_Lang['es-cr']['datetime_shortformat']      = 'd/M/yyyy h:mm aa';
ngc_Lang['es-cr']['datetime_format_parse']     = ["d/M/y h:m:s aa","d/M/y h:m aa"];

// Locale Spanish - United States (es-us)
// Locale Spanish - Cuba (es-cu)
(function(n) { for(var i=n.length-1;i>=0;i--) { var l=n[i];
if(typeof ngc_Lang[l] === 'undefined') ngc_Lang[l]={};
ngc_Lang[l]['decimal_separator']         = '.';
ngc_Lang[l]['thousands_separator']       = ',';
ngc_Lang[l]['time_format']               = 'h:mm:ss aa';
ngc_Lang[l]['time_shortformat']          = 'h:mm aa';
ngc_Lang[l]['time_format_parse']         = ["h:m:s aa","h:m aa"];
ngc_Lang[l]['time_am_pm']                = ["a.m.","p.m."];
ngc_Lang[l]['datetime_format']           = 'd/M/yyyy h:mm:ss aa';
ngc_Lang[l]['datetime_shortformat']      = 'd/M/yyyy h:mm aa';
ngc_Lang[l]['datetime_format_parse']     = ["d/M/y h:m:s aa","d/M/y h:m aa"];
}})(["es-cu","es-us"]);

// Locale Spanish - Guatemala (es-gt)
// Locale Spanish - Honduras (es-hn)
// Locale Spanish - Nicaragua (es-ni)
// Locale Spanish - El Salvador (es-sv)
// Locale Spanish - Dominican Republic (es-do)
(function(n) { for(var i=n.length-1;i>=0;i--) { var l=n[i];
if(typeof ngc_Lang[l] === 'undefined') ngc_Lang[l]={};
ngc_Lang[l]['decimal_separator']         = '.';
ngc_Lang[l]['thousands_separator']       = ',';
ngc_Lang[l]['time_format']               = 'h:mm:ss aa';
ngc_Lang[l]['time_shortformat']          = 'h:mm aa';
ngc_Lang[l]['time_format_parse']         = ["h:m:s aa","h:m aa"];
ngc_Lang[l]['datetime_format']           = 'd/M/yyyy h:mm:ss aa';
ngc_Lang[l]['datetime_shortformat']      = 'd/M/yyyy h:mm aa';
ngc_Lang[l]['datetime_format_parse']     = ["d/M/y h:m:s aa","d/M/y h:m aa"];
}})(["es-do","es-sv","es-ni","es-hn","es-gt"]);

// Locale Spanish - Mexico (es-mx)
if(typeof ngc_Lang['es-mx'] === 'undefined') ngc_Lang['es-mx']={};
ngc_Lang['es-mx']['decimal_separator']         = '.';
ngc_Lang['es-mx']['thousands_separator']       = ',';
ngc_Lang['es-mx']['time_format']               = 'h:mm:ss aa';
ngc_Lang['es-mx']['time_shortformat']          = 'h:mm aa';
ngc_Lang['es-mx']['time_format_parse']         = ["h:m:s aa","h:m aa"];
ngc_Lang['es-mx']['time_am_pm']                = ["a.m.","p.m."];
ngc_Lang['es-mx']['datetime_format']           = 'd/M/yyyy h:mm:ss aa';
ngc_Lang['es-mx']['datetime_shortformat']      = 'd/M/yyyy h:mm aa';
ngc_Lang['es-mx']['datetime_format_parse']     = ["d/M/y h:m:s aa","d/M/y h:m aa"];
ngc_Lang['es-mx']['calendar_months_short']     = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];

// Locale Spanish - Puerto Rico (es-pr)
// Locale Spanish - Panama (es-pa)
(function(n) { for(var i=n.length-1;i>=0;i--) { var l=n[i];
if(typeof ngc_Lang[l] === 'undefined') ngc_Lang[l]={};
ngc_Lang[l]['decimal_separator']         = '.';
ngc_Lang[l]['thousands_separator']       = ',';
ngc_Lang[l]['date_format']               = 'MM/dd/yyyy';
ngc_Lang[l]['date_shortformat']          = 'MM/dd/yy';
ngc_Lang[l]['date_format_parse']         = 'M/d/y';
ngc_Lang[l]['time_format']               = 'h:mm:ss aa';
ngc_Lang[l]['time_shortformat']          = 'h:mm aa';
ngc_Lang[l]['time_format_parse']         = ["h:m:s aa","h:m aa"];
ngc_Lang[l]['datetime_format']           = 'MM/dd/yyyy h:mm:ss aa';
ngc_Lang[l]['datetime_shortformat']      = 'MM/dd/yyyy h:mm aa';
ngc_Lang[l]['datetime_format_parse']     = ["M/d/y h:m:s aa","M/d/y h:m aa"];
}})(["es-pa","es-pr"]);

// Locale Spanish - Peru (es-pe)
if(typeof ngc_Lang['es-pe'] === 'undefined') ngc_Lang['es-pe']={};
ngc_Lang['es-pe']['decimal_separator']         = '.';
ngc_Lang['es-pe']['thousands_separator']       = ',';
ngc_Lang['es-pe']['time_format']               = 'h:mm:ss aa';
ngc_Lang['es-pe']['time_shortformat']          = 'h:mm aa';
ngc_Lang['es-pe']['time_format_parse']         = ["h:m:s aa","h:m aa"];
ngc_Lang['es-pe']['datetime_format']           = 'd/M/yyyy h:mm:ss aa';
ngc_Lang['es-pe']['datetime_shortformat']      = 'd/M/yyyy h:mm aa';
ngc_Lang['es-pe']['datetime_format_parse']     = ["d/M/y h:m:s aa","d/M/y h:m aa"];
ngc_Lang['es-pe']['calendar_months']           = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Setiembre","Octubre","Noviembre","Diciembre"];
ngc_Lang['es-pe']['calendar_months_short']     = ["Ene.","Feb.","Mar.","Abr.","May.","Jun.","Jul.","Ago.","Set.","Oct.","Nov.","Dic."];
ngc_Lang['es-pe']['calendar_months_formating'] = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","setiembre","octubre","noviembre","diciembre"];

// Locale Spanish - Philippines (es-ph)
if(typeof ngc_Lang['es-ph'] === 'undefined') ngc_Lang['es-ph']={};
ngc_Lang['es-ph']['time_format']               = 'h:mm:ss aa';
ngc_Lang['es-ph']['time_shortformat']          = 'h:mm aa';
ngc_Lang['es-ph']['time_format_parse']         = ["h:m:s aa","h:m aa"];
ngc_Lang['es-ph']['datetime_format']           = 'd/M/yyyy h:mm:ss aa';
ngc_Lang['es-ph']['datetime_shortformat']      = 'd/M/yyyy h:mm aa';
ngc_Lang['es-ph']['datetime_format_parse']     = ["d/M/y h:m:s aa","d/M/y h:m aa"];

// Locale Spanish - Uruguay (es-uy)
if(typeof ngc_Lang['es-uy'] === 'undefined') ngc_Lang['es-uy']={};
ngc_Lang['es-uy']['decimal_separator']         = ',';
ngc_Lang['es-uy']['thousands_separator']       = '.';
ngc_Lang['es-uy']['time_format']               = 'h:mm:ss aa';
ngc_Lang['es-uy']['time_shortformat']          = 'h:mm aa';
ngc_Lang['es-uy']['time_format_parse']         = ["h:m:s aa","h:m aa"];
ngc_Lang['es-uy']['datetime_format']           = 'd/M/yyyy h:mm:ss aa';
ngc_Lang['es-uy']['datetime_shortformat']      = 'd/M/yyyy h:mm aa';
ngc_Lang['es-uy']['datetime_format_parse']     = ["d/M/y h:m:s aa","d/M/y h:m aa"];
ngc_Lang['es-uy']['calendar_months']           = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Setiembre","Octubre","Noviembre","Diciembre"];
ngc_Lang['es-uy']['calendar_months_short']     = ["Ene.","Feb.","Mar.","Abr.","May.","Jun.","Jul.","Ago.","Set.","Oct.","Nov.","Dic."];
ngc_Lang['es-uy']['calendar_months_formating'] = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","setiembre","octubre","noviembre","diciembre"];
