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

if (typeof ngUserControls === 'undefined') ngUserControls = [];
ngUserControls['calendar_designinfo'] = {
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;
    var undefined;

    ngRegisterControlDesignInfo('ngCalendar',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        Properties: ng_DIProperties({
          "Data": {
            "CurrentDate": { DefaultType: 'computed', // TODO: Date selection editor
              Types: {
                'computed': {
                  DefaultValue: 'function() { return new Date(); }'
                }
              }
            },
            "WeekStartDay": ng_DIProperty('integer', 1, { Level: 'basic' }),
            "HiliteWeekDays": { DefaultType: 'object',
              Types: {
                'object': {
                  Add: false,
                  ObjectProperties: {
                    0: ng_DIPropertyBool(false,{ Level: 'basic' }),
                    1: ng_DIPropertyBool(false,{ Level: 'basic' }),
                    2: ng_DIPropertyBool(false,{ Level: 'basic' }),
                    3: ng_DIPropertyBool(false,{ Level: 'basic' }),
                    4: ng_DIPropertyBool(false,{ Level: 'basic' }),
                    5: ng_DIPropertyBool(false,{ Level: 'basic' }),
                    6: ng_DIPropertyBool(false,{ Level: 'basic' })
                  }
                }
              }
            },
            "DateFormat": { DefaultType: 'string', Level: 'basic' },
            "ImgWeekDay": { DefaultType: 'image', Level: 'basic' },
            "ImgDay": { DefaultType: 'image', Level: 'basic' },
            "ImgNow": { DefaultType: 'image', Level: 'basic' },
            "Navigation": ng_DIPropertyBool(true, { Level: 'basic' }),
            "YearNavigation": ng_DIPropertyBool(false, { Level: 'basic' }),
            "FastNavigation": ng_DIPropertyBool(true, { Level: 'basic' }),
            "DisplayedDates": { DefaultType: 'array', Level: 'hidden' },
            "SelectedDates": { DefaultType: 'array', Level: 'hidden' },
            "SelectType": ng_DIPropertyIntConstants(1,['ngcalSelectNone','ngcalSelectSingle','ngcalSelectMulti','ngcalSelectMultiExt','ngcalSelectRange'],{ Level: 'basic' }),
            "SelectFrom": { DefaultType: 'computed', // TODO: Date selection editor
              Types: {
                'computed': {
                  DefaultValue: 'function() { return new Date(); }'
                }
              }
            },
            "SelectTo": { DefaultType: 'computed', // TODO: Date selection editor
              Types: {
                'computed': {
                  DefaultValue: 'function() { return new Date(); }'
                }
              }
            },
            "BlockedDates": { DefaultType: 'array', Level: 'advanced' },
            "BlockedWeekDays": { DefaultType: 'object',
              Types: {
                'object': {
                  Add: false,
                  ObjectProperties: {
                    0: ng_DIPropertyBool(false,{ Level: 'basic' }),
                    1: ng_DIPropertyBool(false,{ Level: 'basic' }),
                    2: ng_DIPropertyBool(false,{ Level: 'basic' }),
                    3: ng_DIPropertyBool(false,{ Level: 'basic' }),
                    4: ng_DIPropertyBool(false,{ Level: 'basic' }),
                    5: ng_DIPropertyBool(false,{ Level: 'basic' }),
                    6: ng_DIPropertyBool(false,{ Level: 'basic' })
                  }
                }
              }
            },
            "MinDate": { DefaultType: 'computed', // TODO: Date selection editor
              Types: {
                'computed': {
                  DefaultValue: 'function() { return new Date(); }'
                }
              }
            },
            "MaxDate": { DefaultType: 'computed', // TODO: Date selection editor
              Types: {
                'computed': {
                  DefaultValue: 'function() { return new Date(); }'
                }
              }
            },
            "Frame": { DefaultType: 'img_frame', Level: 'basic',
              Collapsed: true
            }
          },
          "Events": {
            "OnDayClick": ng_DIPropertyEvent('function(e) { return true; }', { Level: 'basic' }),
            "OnSelectChanged": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' })
          },
          "OverrideEvents": {
            "OnFormatDate": ng_DIPropertyEvent('function(c, d) { return ng_FormatDate(d); }', { Level: 'basic' }),
            "OnParseDate": ng_DIPropertyEvent('function(c, d) { return ng_ParseDate(d); }', { Level: 'basic' }),
            "OnIsDayEnabled": ng_DIPropertyEvent('function(c, date, enabled) { return enabled; }', { Level: 'basic' }),
            "OnGetWeekDayImg": ng_DIPropertyEvent('function(c, wday) { return null; }', { Level: 'basic' }),
            "OnGetWeekDayText": ng_DIPropertyEvent('function(c, wday) { return ""; }', { Level: 'basic' }),
            "OnGetWeekDayAlt": ng_DIPropertyEvent('function(c, wday) { return ""; }', { Level: 'basic' }),
            "OnGetDayImg": ng_DIPropertyEvent('function(c, display_date, col, row) { return null; }', { Level: 'basic' }),
            "OnGetDayText": ng_DIPropertyEvent('function(c, display_date, col, row) { return ""; }', { Level: 'basic' }),
            "OnGetDayAlt": ng_DIPropertyEvent('function(c, display_date, col, row) { return ""; }', { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngEditDate',function(d,c,ref) {
      return {
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 }
            }
          }
        },
        Properties: ng_DIProperties({
          "Data": {
            "DateFormat": { DefaultType: 'string', Level: 'basic' },
            "Text": { OnPropertyInit: null }
          },
          "OverrideEvents": {
            "OnFormatDate": ng_DIPropertyEvent('function(c, d) { return ng_FormatDate(d); }', { Level: 'basic' }),
            "OnParseDate": ng_DIPropertyEvent('function(c, d) { return ng_ParseDate(d); }', { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngEditTime',function(d,c,ref) {
      return {
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 }
            }
          }
        },
        Properties: ng_DIProperties({
          "Data": {
            "TimeFormat": { DefaultType: 'string', Level: 'basic' },
            "Text": { OnPropertyInit: null }
          },
          "OverrideEvents": {
            "OnFormatTime": ng_DIPropertyEvent('function(c, t) { return ng_FormatTime(t); }', { Level: 'basic' }),
            "OnParseTime": ng_DIPropertyEvent('function(c, t) { return ng_ParseTime(t); }', { Level: 'basic' })
          }
        })
      };
    });
  }
};