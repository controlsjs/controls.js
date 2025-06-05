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
// Locale Portuguese - Brazil (pt-BR)
// Default locale Portuguese (pt)
if(typeof ngc_Lang['pt'] === 'undefined') ngc_Lang['pt']={};
ngc_Lang['pt']['locale_language']           = 'Portuguese';
ngc_Lang['pt']['locale_language_native']    = 'Português';
ngc_Lang['pt']['decimal_separator']         = ',';
ngc_Lang['pt']['thousands_separator']       = '.';
ngc_Lang['pt']['date_format']               = 'dd/MM/yyyy';
ngc_Lang['pt']['date_shortformat']          = 'dd/MM/yy';
ngc_Lang['pt']['date_format_parse']         = 'd/M/y';
ngc_Lang['pt']['time_format']               = 'HH:mm:ss';
ngc_Lang['pt']['time_shortformat']          = 'HH:mm';
ngc_Lang['pt']['time_format_parse']         = ["H:m:s","H:m"];
ngc_Lang['pt']['time_am_pm']                = ["AM","PM"];
ngc_Lang['pt']['datetime_format']           = 'dd/MM/yyyy HH:mm:ss';
ngc_Lang['pt']['datetime_shortformat']      = 'dd/MM/yyyy HH:mm';
ngc_Lang['pt']['datetime_format_parse']     = ["d/M/y H:m:s","d/M/y H:m"];
ngc_Lang['pt']['calendar_months']           = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
ngc_Lang['pt']['calendar_months_short']     = ["jan.","fev.","mar.","abr.","mai.","jun.","jul.","ago.","set.","out.","nov.","dez."];
ngc_Lang['pt']['calendar_months_formating'] = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
ngc_Lang['pt']['calendar_days']             = ["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"];
ngc_Lang['pt']['calendar_days_short']       = ["dom.","seg.","ter.","qua.","qui.","sex.","sáb."];
ngc_Lang['pt']['calendar_days_formating']   = ["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"];

// Locale Portuguese - Angola (pt-ao)
if(typeof ngc_Lang['pt-ao'] === 'undefined') ngc_Lang['pt-ao']={};
ngc_Lang['pt-ao']['decimal_separator']         = ',';
ngc_Lang['pt-ao']['thousands_separator']       = ' ';
ngc_Lang['pt-ao']['time_am_pm']                = ["da manhã","da tarde"];
ngc_Lang['pt-ao']['calendar_days_short']       = ["domingo","segunda","terça","quarta","quinta","sexta","sábado"];

// Locale Portuguese - Guinea-Bissau (pt-gw)
// Locale Portuguese - Mozambique (pt-mz)
// Locale Portuguese - Portugal (pt-pt)
// Locale Portuguese - Sao Tome and Principe (pt-st)
// Locale Portuguese - Timor-Leste (pt-tl)
// Locale Portuguese - Cape Verde (pt-cv)
(function(n) { for(var i=n.length-1;i>=0;i--) { var l=n[i];
if(typeof ngc_Lang[l] === 'undefined') ngc_Lang[l]={};
ngc_Lang[l]['decimal_separator']         = ',';
ngc_Lang[l]['thousands_separator']       = "";
ngc_Lang[l]['time_am_pm']                = ["da manhã","da tarde"];
ngc_Lang[l]['calendar_days_short']       = ["domingo","segunda","terça","quarta","quinta","sexta","sábado"];
}})(["pt-cv","pt-tl","pt-st","pt-pt","pt-mz","pt-gw"]);

// Locale Portuguese - Macao (pt-mo)
if(typeof ngc_Lang['pt-mo'] === 'undefined') ngc_Lang['pt-mo']={};
ngc_Lang['pt-mo']['decimal_separator']         = ',';
ngc_Lang['pt-mo']['thousands_separator']       = "";
ngc_Lang['pt-mo']['time_format']               = 'h:mm:ss aa';
ngc_Lang['pt-mo']['time_shortformat']          = 'h:mm aa';
ngc_Lang['pt-mo']['time_format_parse']         = ["h:m:s aa","h:m aa"];
ngc_Lang['pt-mo']['time_am_pm']                = ["da manhã","da tarde"];
ngc_Lang['pt-mo']['datetime_format']           = 'dd/MM/yyyy h:mm:ss aa';
ngc_Lang['pt-mo']['datetime_shortformat']      = 'dd/MM/yyyy h:mm aa';
ngc_Lang['pt-mo']['datetime_format_parse']     = ["d/M/y h:m:s aa","d/M/y h:m aa"];
ngc_Lang['pt-mo']['calendar_days_short']       = ["domingo","segunda","terça","quarta","quinta","sexta","sábado"];
