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
// Locale zh-Hans
// Locale zh-Hans-CN
// Default locale Chinese (zh)
if(typeof ngc_Lang['zh'] === 'undefined') ngc_Lang['zh']={};
ngc_Lang['zh']['locale_language']           = 'Chinese';
ngc_Lang['zh']['locale_language_native']    = '中文';
ngc_Lang['zh']['decimal_separator']         = '.';
ngc_Lang['zh']['thousands_separator']       = ',';
ngc_Lang['zh']['date_format']               = 'yyyy/M/d';
ngc_Lang['zh']['date_shortformat']          = 'yy/M/d';
ngc_Lang['zh']['date_format_parse']         = 'y/M/d';
ngc_Lang['zh']['time_format']               = 'HH:mm:ss';
ngc_Lang['zh']['time_shortformat']          = 'HH:mm';
ngc_Lang['zh']['time_format_parse']         = ["H:m:s","H:m"];
ngc_Lang['zh']['time_am_pm']                = ["上午","下午"];
ngc_Lang['zh']['datetime_format']           = 'yyyy/M/d HH:mm:ss';
ngc_Lang['zh']['datetime_shortformat']      = 'yyyy/M/d HH:mm';
ngc_Lang['zh']['datetime_format_parse']     = ["y/M/d H:m:s","y/M/d H:m"];
ngc_Lang['zh']['calendar_months']           = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
ngc_Lang['zh']['calendar_months_short']     = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
ngc_Lang['zh']['calendar_months_formating'] = ["1","2","3","4","5","6","7","8","9","10","11","12"];
ngc_Lang['zh']['calendar_days']             = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
ngc_Lang['zh']['calendar_days_short']       = ["周日","周一","周二","周三","周四","周五","周六"];
ngc_Lang['zh']['calendar_days_formating']   = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];

// Locale zh-hans-hk
if(typeof ngc_Lang['zh-hans-hk'] === 'undefined') ngc_Lang['zh-hans-hk']={};
ngc_Lang['zh-hans-hk']['date_format']               = 'd/M/yyyy';
ngc_Lang['zh-hans-hk']['date_shortformat']          = 'd/M/yy';
ngc_Lang['zh-hans-hk']['date_format_parse']         = 'd/M/y';
ngc_Lang['zh-hans-hk']['time_format']               = 'aah:mm:ss';
ngc_Lang['zh-hans-hk']['time_shortformat']          = 'aah:mm';
ngc_Lang['zh-hans-hk']['time_format_parse']         = ["aah:m:s","aah:m"];
ngc_Lang['zh-hans-hk']['datetime_format']           = 'd/M/yyyy aah:mm:ss';
ngc_Lang['zh-hans-hk']['datetime_shortformat']      = 'd/M/yyyy aah:mm';
ngc_Lang['zh-hans-hk']['datetime_format_parse']     = ["d/M/y aah:m:s","d/M/y aah:m"];

// Locale zh-hans-mo
if(typeof ngc_Lang['zh-hans-mo'] === 'undefined') ngc_Lang['zh-hans-mo']={};
ngc_Lang['zh-hans-mo']['date_format']               = 'yyyy年M月d日';
ngc_Lang['zh-hans-mo']['date_shortformat']          = 'yy年M月d日';
ngc_Lang['zh-hans-mo']['date_format_parse']         = 'y年M月d日';
ngc_Lang['zh-hans-mo']['time_format']               = 'aah:mm:ss';
ngc_Lang['zh-hans-mo']['time_shortformat']          = 'aah:mm';
ngc_Lang['zh-hans-mo']['time_format_parse']         = ["aah:m:s","aah:m"];
ngc_Lang['zh-hans-mo']['datetime_format']           = 'yyyy年M月d日 aah:mm:ss';
ngc_Lang['zh-hans-mo']['datetime_shortformat']      = 'yyyy年M月d日 aah:mm';
ngc_Lang['zh-hans-mo']['datetime_format_parse']     = ["y年M月d日 aah:m:s","y年M月d日 aah:m"];

// Locale zh-hans-sg
if(typeof ngc_Lang['zh-hans-sg'] === 'undefined') ngc_Lang['zh-hans-sg']={};
ngc_Lang['zh-hans-sg']['date_format']               = 'yyyy年M月d日';
ngc_Lang['zh-hans-sg']['date_shortformat']          = 'yy年M月d日';
ngc_Lang['zh-hans-sg']['date_format_parse']         = 'y年M月d日';
ngc_Lang['zh-hans-sg']['time_format']               = 'aah:mm:ss';
ngc_Lang['zh-hans-sg']['time_shortformat']          = 'aah:mm';
ngc_Lang['zh-hans-sg']['time_format_parse']         = ["aah:m:s","aah:m"];
ngc_Lang['zh-hans-sg']['datetime_format']           = 'yyyy年M月d日 aah:mm:ss';
ngc_Lang['zh-hans-sg']['datetime_shortformat']      = 'yyyy年M月d日 aah:mm';
ngc_Lang['zh-hans-sg']['datetime_format_parse']     = ["y年M月d日 aah:m:s","y年M月d日 aah:m"];
ngc_Lang['zh-hans-sg']['calendar_months']           = ["1","2","3","4","5","6","7","8","9","10","11","12"];
ngc_Lang['zh-hans-sg']['calendar_months_short']     = ["1","2","3","4","5","6","7","8","9","10","11","12"];

// Locale zh-hant-mo
// Locale zh-hant-hk
(function(n) { for(var i=n.length-1;i>=0;i--) { var l=n[i];
if(typeof ngc_Lang[l] === 'undefined') ngc_Lang[l]={};
ngc_Lang[l]['date_format']               = 'd/M/yyyy';
ngc_Lang[l]['date_shortformat']          = 'd/M/yy';
ngc_Lang[l]['date_format_parse']         = 'd/M/y';
ngc_Lang[l]['time_format']               = 'aah:mm:ss';
ngc_Lang[l]['time_shortformat']          = 'aah:mm';
ngc_Lang[l]['time_format_parse']         = ["aah:m:s","aah:m"];
ngc_Lang[l]['datetime_format']           = 'd/M/yyyy aah:mm:ss';
ngc_Lang[l]['datetime_shortformat']      = 'd/M/yyyy aah:mm';
ngc_Lang[l]['datetime_format_parse']     = ["d/M/y aah:m:s","d/M/y aah:m"];
ngc_Lang[l]['calendar_months']           = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
ngc_Lang[l]['calendar_days_short']       = ["週日","週一","週二","週三","週四","週五","週六"];
}})(["zh-hant-hk","zh-hant-mo"]);

// Locale zh-hant
// Locale zh-hant-tw
(function(n) { for(var i=n.length-1;i>=0;i--) { var l=n[i];
if(typeof ngc_Lang[l] === 'undefined') ngc_Lang[l]={};
ngc_Lang[l]['time_format']               = 'aah:mm:ss';
ngc_Lang[l]['time_shortformat']          = 'aah:mm';
ngc_Lang[l]['time_format_parse']         = ["aah:m:s","aah:m"];
ngc_Lang[l]['datetime_format']           = 'yyyy/M/d aah:mm:ss';
ngc_Lang[l]['datetime_shortformat']      = 'yyyy/M/d aah:mm';
ngc_Lang[l]['datetime_format_parse']     = ["y/M/d aah:m:s","y/M/d aah:m"];
ngc_Lang[l]['calendar_months']           = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
ngc_Lang[l]['calendar_days_short']       = ["週日","週一","週二","週三","週四","週五","週六"];
}})(["zh-hant-tw","zh-hant"]);
