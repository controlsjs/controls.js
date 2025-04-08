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

if (typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['calendar_designinfo'] = {
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('ngCalendar',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        Properties: ng_diProperties({
          "PrevMonBtn": ng_diControl('ngButton', ng_diProperties({
            "Data": {
              "Text": ng_diString('&lt;'),
              "ngAltD": ng_diString('calendar_prevmonth')
            }
          }), { Level: 'basic', PropertyGroup: 'Controls' }, { InheritedFrom: 'ngButton' }),
          "NextMonBtn": ng_diControl('ngButton', ng_diProperties({
            "Data": {
              "Text": ng_diString('&gt;'),
              "ngAltD": ng_diString('calendar_nextmonth')
            }
          }), { Level: 'basic', PropertyGroup: 'Controls' }, { InheritedFrom: 'ngButton' }),
          "PrevYearBtn": ng_diControl('ngButton', ng_diProperties({
            "Data": {
              "Text": ng_diString('&lt;'),
              "ngAltD": ng_diString('calendar_prevyear')
            }
          }), { Level: 'basic', PropertyGroup: 'Controls' }, { InheritedFrom: 'ngButton' }),
          "NextYearBtn": ng_diControl('ngButton', ng_diProperties({
            "Data": {
              "Text": ng_diString('&gt;'),
              "ngAltD": ng_diString('calendar_nextyear')
            }
          }), { Level: 'basic', PropertyGroup: 'Controls' }, { InheritedFrom: 'ngButton' }),
          "FastButtons": ng_diArrayOfControls(
            ng_diControl(void 0, ng_diProperties({
            }), { Level: 'basic', PropertyGroup: 'Controls' }, { InheritedFrom: 'ngButton' }),
            { Level: 'basic', Collapsed: false, PropertyGroup: 'Controls' }, { DestroyIfEmpty: true }),
          "Data": {
            "CurrentDate": ng_diType('date', { Level: 'advanced' }),
            "WeekStartDay": ng_diInteger(1, { Level: 'basic' }),
            "HiliteWeekDays": ng_diObject({ 0: ng_diBoolean(false, { DisplayName: 'Sunday (0)', Level: 'basic' }),
                                            1: ng_diBoolean(false, { DisplayName: 'Monday (1)', Level: 'basic' }),
                                            2: ng_diBoolean(false, { DisplayName: 'Tuesday (2)', Level: 'basic' }),
                                            3: ng_diBoolean(false, { DisplayName: 'Wednesday (3)', Level: 'basic' }),
                                            4: ng_diBoolean(false, { DisplayName: 'Thursday (4)', Level: 'basic' }),
                                            5: ng_diBoolean(false, { DisplayName: 'Friday (5)', Level: 'basic' }),
                                            6: ng_diBoolean(false, { DisplayName: 'Saturday (6)', Level: 'basic' })
                                         },
                                         { Level: 'basic' },{ Add: false }),
            "ClickAllDays": ng_diBoolean(false, { Level: 'basic' }),
            "DateFormat": ng_diString('', { Level: 'basic' }),
            "ParseDateFormat": ng_diString('', { Level: 'basic' }),
            "ImgWeekDay": ng_diType('image', { Level: 'advanced' }),
            "ImgDay": ng_diType('image', { Level: 'advanced' }),
            "ImgNow": ng_diType('image', { Level: 'advanced' }),
            "Navigation": ng_diBoolean(true, { Level: 'basic' }),
            "YearNavigation": ng_diBoolean(false, { Level: 'basic' }),
            "FastNavigation": ng_diBoolean(true, { Level: 'basic' }),
            "DisplayedDates": ng_diArray({ Level: 'hidden' }),
            "SelectedDates": ng_diArray({ Level: 'hidden' }),
            "SelectType": ng_diIntegerIdentifiers(1,['ngcalSelectNone','ngcalSelectSingle','ngcalSelectMulti','ngcalSelectMultiExt','ngcalSelectRange'], { Level: 'basic' }),
            "SelectFrom": ng_diType('date', { Level: 'advanced' }),
            "SelectTo": ng_diType('date', { Level: 'advanced' }),
            "BlockedDates": ng_diArrayOf(ng_diType('date', { Level: 'advanced' }), { Level: 'advanced' }),
            "BlockedWeekDays": ng_diObject({ 0: ng_diBoolean(false, { DisplayName: 'Sunday (0)', Level: 'basic' }),
                                             1: ng_diBoolean(false, { DisplayName: 'Monday (1)', Level: 'basic' }),
                                             2: ng_diBoolean(false, { DisplayName: 'Tuesday (2)', Level: 'basic' }),
                                             3: ng_diBoolean(false, { DisplayName: 'Wednesday (3)', Level: 'basic' }),
                                             4: ng_diBoolean(false, { DisplayName: 'Thursday (4)', Level: 'basic' }),
                                             5: ng_diBoolean(false, { DisplayName: 'Friday (5)', Level: 'basic' }),
                                             6: ng_diBoolean(false, { DisplayName: 'Saturday (6)', Level: 'basic' })
                                           }, { Level: 'basic' }, { Add: false }),
            "MinDate": ng_diType('date', { Level: 'advanced' }),
            "MaxDate": ng_diType('date', { Level: 'advanced' }),
            "Frame": ng_diType('img_frame', { Level: 'advanced' })
          },
          "Events": {
            "OnDayClick": ng_diEvent('function(e) { return true; }', { Level: 'basic' }),
            "OnSelectChanged": ng_diEvent('function(c) {}', { Level: 'basic' })
          },
          "OverrideEvents": {
            "OnFormatDate": ng_diEvent('function(c, d) { return ng_FormatDate(d); }', { Level: 'basic' }),
            "OnParseDate": ng_diEvent('function(c, d) { return ng_ParseDate(d); }', { Level: 'basic' }),
            "OnIsDayEnabled": ng_diEvent('function(c, date, enabled) { return enabled; }', { Level: 'basic' }),
            "OnGetWeekDayImg": ng_diEvent('function(c, wday) { return null; }', { Level: 'advanced' }),
            "OnGetWeekDayText": ng_diEvent('function(c, wday) { return ""; }', { Level: 'advanced' }),
            "OnGetWeekDayAlt": ng_diEvent('function(c, wday) { return ""; }', { Level: 'advanced' }),
            "OnGetDayImg": ng_diEvent('function(c, display_date, col, row) { return null; }', { Level: 'advanced' }),
            "OnGetDayText": ng_diEvent('function(c, display_date, col, row) { return ""; }', { Level: 'advanced' }),
            "OnGetDayAlt": ng_diEvent('function(c, display_date, col, row) { return ""; }', { Level: 'advanced' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngEditDate',function(d,c,ref) {
      return {
        ControlCategory: 'Edit',
        NewControl: {
          "Default": {
            Properties: {
              "W": { Value: 100 }
            }
          }
        },
        Properties: ng_diProperties({
          "Data": {
            "DateFormat": ng_diString('', { Level: 'basic' }),
            "ParseDateFormat": ng_diString('', { Level: 'basic' }),
            "Text": { OnPropertyInit: null }
          },
          "OverrideEvents": {
            "OnFormatDate": ng_diEvent('function(c, d) { return ng_FormatDate(d); }', { Level: 'basic' }),
            "OnParseDate": ng_diEvent('function(c, d) { return ng_ParseDate(d); }', { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngEditTime',function(d,c,ref) {
      return {
        ControlCategory: 'Edit',
        NewControl: {
          "Default": {
            Properties: {
              "W": { Value: 100 }
            }
          }
        },
        Properties: ng_diProperties({
          "Data": {
            "TimeFormat": ng_diString('', { Level: 'basic' }),
            "ParseTimeFormat": ng_diString('', { Level: 'basic' }),
            "Text": { OnPropertyInit: null }
          },
          "OverrideEvents": {
            "OnFormatTime": ng_diEvent('function(c, t) { return ng_FormatTime(t); }', { Level: 'basic' }),
            "OnParseTime": ng_diEvent('function(c, t) { return ng_ParseTime(t); }', { Level: 'basic' })
          }
        })
      };
    });
  }
};