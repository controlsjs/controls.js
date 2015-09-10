/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2014-2015 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */

if(ngHASDESIGNINFO()) {

  if(typeof ngUserControls === 'undefined') ngUserControls = new Array();

  ngUserControls['calendar_designinfo'] = {
    OnControlCreated: function(def, c) {
      if(!ngHASDESIGNINFO()) return;

      if (typeof def.DesignInfo==='undefined') def.DesignInfo = {};

      var di;
      switch(c.DefType)
      {

        case 'ngCalendar':
          di = {
            ControlCategory: 'Misc',
            Properties: {
              Data: {
                properties: {
                  CurrentDate: { type: 'object', dVal: 'new Date()', lvl: 2 },
                  WeekStartDay: { type: 'integer', dVal: '1' },
                  HiliteWeekDays: { type: 'array', dVal: '{0: true}', lvl: 2 },
                  DateFormat: { type: 'string' },
                  ImgWeekDay: { type: 'object', lvl: 3 },
                  ImgDay: { type: 'object', lvl: 3 },
                  ImgNow: { type: 'object', lvl: 3 },
                  PrevMonBtn: { type: 'object', help: 'class ngButton', lvl: 2 },
                  NextMonBtn: { type: 'object', help: 'class ngButton', lvl: 2 },
                  PrevYearBtn: { type: 'object', help: 'class ngButton', lvl: 2 },
                  NextYearBtn: { type: 'object', help: 'class ngButton', lvl: 2 },
                  TodayBtn: { type: 'object', help: 'class ngButton', lvl: 2 },
                  TomorrowBtn: { type: 'object', help: 'class ngButton', lvl: 2 },
                  NextWeekBtn: { type: 'object', help: 'class ngButton', lvl: 2 },
                  FastButtons: { type: 'array', dVal: 'new Array(this.TodayBtn, this.TomorrowBtn, this.NextWeekBtn)', lvl: 2 },
                  Navigation: { type: 'boolean' },
                  YearNavigation: { type: 'boolean', dVal: 'false' },
                  FastNavigation: { type: 'boolean' },
                  DisplayedDates: { type: 'array', dVal: '[]' },
                  SelectedDates: { type: 'array', dVal: '[]' },
                  SelectType: { type: 'integer', dVal: 'ngcalSelectSingle', readOnly: true,
                    items: ['ngcalSelectNone','ngcalSelectSingle','ngcalSelectMulti','ngcalSelectMultiExt','ngcalSelectRange']
                  },
                  SelectFrom: { type: 'object', dVal: 'new Date()', lvl: 2 },
                  SelectTo: { type: 'object', dVal: 'new Date()', lvl: 2 },
                  BlockedDates: { type: 'array', dVal: '[]', lvl: 2 },
                  BlockedWeekDays: { type: 'array', dVal: '[]', lvl: 2 },
                  MinDate: { type: 'object', lvl: 2 },
                  MaxDate: { type: 'object', lvl: 2 },
                  Frame: { type: 'object', dVal: '{}', lvl: 3 }
                }
              },
              Events: {
                properties: {
                  OnFormatDate: { type: 'function', dVal: 'function(c, d) { return ng_FormatDate(d, c.DateFormat); }' },
                  OnParseDate: { type: 'function', dVal: 'function(c, d) { return ng_ParseDate(d, c.DateFormat); }' },
                  OnDayClick: { type: 'function', dVal: 'function(e) { return true; }' },
                  OnIsDayEnabled: { type: 'function', dVal: 'function(c, date, enabled) { return enabled; }', lvl: 2 },
                  OnSelectChanged: { type: 'function', dVal: 'function(c) { }' },
                  OnGetWeekDayImg: { type: 'function', dVal: 'function(c, w) { return c.ImgWeekDay; }', lvl: 3 },
                  OnGetWeekDayText: { type: 'function', dVal: "function(c, w) { return ''; }", lvl: 2 },
                  OnGetWeekDayAlt: { type: 'function', dVal: "function(c, w) { return ''; }", lvl: 2 },
                  OnGetDayImg: { type: 'function', dVal: 'function(c, display_date, col, row) { return c.ImgDay; }', lvl: 3 },
                  OnGetDayText: { type: 'function', dVal: 'function(c, display_date, col, row) { return display_date; }', lvl: 2 },
                  OnGetDayAlt: { type: 'function', dVal: 'function(c, display_date, col, row) { return c.FormatDate(display_date); }', lvl: 2 }
                }
              }
            }
          };
          break;

        case 'ngEditDate':
          di = {
            ControlCategory: 'Edits',
            AddData: {
              InitProperties: {
                'W': { value: 120 },
                'Data.Text': { value: '' },
                'Data.DateFormat': { value: '' }
              }
            },
            Properties: {
              Data: {
                properties: {
                  DateFormat: { type: 'string' },
                  Text: { cType: 'feEditDate' }
                }
              },
              Events: {
                properties: {
                  OnFormatDate: { type: 'function', dVal: 'function(c, d) { return ng_FormatDate(d, c.DateFormat); }' },
                  OnParseDate: { type: 'function', dVal: 'function(c, d) { return ng_ParseDate(d, c.DateFormat); }' }
                }
              }
            }
          };
          break;

        case 'ngEditTime':
          di = {
            ControlCategory: 'Edits',
            AddData: {
              InitProperties: {
                'W': { value: 120 },
                'Data.Text': { value: '' },
                'Data.TimeFormat': { value: '' }
              }
            },
            Properties: {
              Data: {
                properties: {
                  Text: { cType: 'feEditTime' },
                  TimeFormat: { type: 'string' }
                }
              },
              Events: {
                properties: {
                  OnFormatTime: { type: 'function', dVal: 'function(c, d) { return ng_FormatTime(d, c.TimeFormat); }' },
                  OnParseTime: { type: 'function', dVal: 'function(c, d) { return ng_ParseTime(d, c.TimeFormat); }' }
                }
              }
            }
          };
          break;
      }

      if(typeof di!=='undefined') {
        ng_MergeVar(di, {
          Properties: {
            Type: { dVal: c.DefType }
          }
        });
        ng_MergeVar(di, def.DesignInfo);
        def.DesignInfo = di;
      }

    }
  }
}