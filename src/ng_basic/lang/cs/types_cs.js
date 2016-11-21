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
if(typeof ngc_Lang['cs'] === 'undefined') ngc_Lang['cs']={};

ngc_Lang['cs']['decimal_separator'] = ',';
ngc_Lang['cs']['thousands_separator'] = ' ';

ngc_Lang['cs']['date_format']           = 'd.M.yyyy';
ngc_Lang['cs']['date_shortformat']     = 'd.M.yy';
ngc_Lang['cs']['date_format_parse']     = 'd.M.y';
ngc_Lang['cs']['time_format']           = 'HH:mm:ss';
ngc_Lang['cs']['time_shortformat']      = 'HH:mm';
ngc_Lang['cs']['time_format_parse']     = ngc_Lang['cs']['time_shortformat_parse'] = ['H:m:s','H:m'];
ngc_Lang['cs']['datetime_format']       = 'd.M.yyyy HH:mm:ss';
ngc_Lang['cs']['datetime_shortformat']  = 'd.M.yyyy HH:mm';
ngc_Lang['cs']['datetime_format_parse'] = ngc_Lang['cs']['datetime_shortformat_parse'] = ['d.M.y H:m:s','d.M.y H:m'];

ngc_Lang['cs']['calendar_months']       = new Array('Leden','Únor','Březen','Duben','Květen','Červen','Červenec','Srpen','Září','Říjen','Listopad','Prosinec');
ngc_Lang['cs']['calendar_months_short'] = new Array('Led','Úno','Bře','Dub','Kvě','Čer','Čnc','Srp','Zář','Říj','Lis','Pro');
ngc_Lang['cs']['calendar_days']         = new Array('Neděle','Pondělí','Úterý','Středa','Čtvrtek','Pátek','Sobota');
ngc_Lang['cs']['calendar_days_short']   = new Array('Ne','Po','Út','St','Čt','Pá','So');
ngc_Lang['cs']['calendar_days_letter']  = new Array('N','P','Ú','S','Č','P','S');
