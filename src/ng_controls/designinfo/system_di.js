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
ngUserControls['system_designinfo'] = {
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    var undefined;
    ngRegisterControlDesignInfo('ngSysAction',function(d,c,ref) {
      return {
        ControlCategory: 'System',
        NewControl: {
          Default: {
            Properties: {
              "L": {},
              "T": {},
              "ID": { ValueByRefName: true }
            }
          }
        },
        Properties: ng_DIProperties({
          "ID": { Level: 'basic' },
          "Data": {
            "ngText": { DefaultType: 'string', Level: 'advanced',
              Types: {
                'string': {
                  Editor: 'ngfeEditor_Lang'
                }
              }
            },
            "ngTextD": { DefaultType: 'string', Level: 'basic',
              Types: {
                'string': {
                  Editor: 'ngfeEditor_Lang'
                }
              }
            },
            "ngAlt": { DefaultType: 'string', Level: 'advanced',
              Types: {
                'string': {
                  Editor: 'ngfeEditor_Lang'
                }
              }
            },
            "ngAltD": { DefaultType: 'string', Level: 'basic',
              Types: {
                'string': {
                  Editor: 'ngfeEditor_Lang'
                }
              }
            },
            "Text": ng_DIPropertyRefName({ Level: 'basic' }),
            "Alt": { DefaultType: 'string', Level: 'basic' },
            "Checked": ng_DIPropertyValues('integer', 0, ['Unchecked','Checked','Grayed'], { Level: 'basic',
              Types: {
                'integer': {
                   InitValue: 1
                 }
              }
            }),
            "RadioGroup": { DefaultType: 'undefined', InitType: 'string', Level: 'basic'
              // TODO: browse from existing radio groups
            },
            "Img": { DefaultType: 'image', Level: 'basic' },
            "Visible": ng_DIPropertyBool(true, { Level: 'basic' })
          },
          "Events": {
            "OnClick": ng_DIPropertyEvent('function(e) { }', { Level: 'basic' }),
            "OnCheckChanged": ng_DIPropertyEvent('function(c) { }', { Level: 'basic' }),
            "OnSetVisible": ng_DIPropertyEvent('function(c, v) { return true; }'),
            "OnVisibleChanged": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' }),
            "OnUpdate": ng_DIPropertyEvent('function(c) { return true; }')
          },
          "OverrideEvents": {
            "OnSetText": ng_DIPropertyEvent('function(text, c) { return text; }'),
            "OnGetText": ng_DIPropertyEvent('function(c) { return ""; }',{ Level: 'basic' }),
            "OnGetAlt": ng_DIPropertyEvent('function(c) { return ""; }', { Level: 'basic' }),
            "OnGetImg": ng_DIPropertyEvent('function(c, idx) { return null; }', { Level: 'basic' })
          }
        })
      }
    });

    ngRegisterControlDesignInfo('ngSysTimer',function(d,c,ref) {
      return {
        ControlCategory: 'System',
        Properties: ng_DIProperties({
          "Data": {
            "Interval": ng_DIProperty('integer',0,{Level:'basic'}),
            "Repeat": { DefaultType: 'boolean', Level:'basic',
              Types: {
                'boolean': { DefaultValue: true },
                'integer': { InitValue: 1 }
              }
            }
          },
          "Events": {
            "OnTimer": ng_DIPropertyEvent('function(c, tickcnt) { return true; }',{Level:'basic'}),
            "OnStart": ng_DIPropertyEvent('function(c) {}',{Level:'basic'}),
            "OnStop": ng_DIPropertyEvent('function(c, tickcnt) {}',{Level:'basic'}),
          }
        })
      }
    });

    ngRegisterControlDesignInfo('ngSysRPC',function(d,c,ref) {
      return {
        ControlCategory: 'System',
          NewControl: {
          Default: {
            Properties: {
              "L": {},
              "T": {},
              "Data": {
                ObjectProperties: {
                  "nocache": { Value: true },
                  "Type": { Value: 'rpcJSONGET' }
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "Data": {
            "nocache": ng_DIPropertyBool(false, {Level: 'basic' }),
            "Type": ng_DIPropertyIntConstants('rpcAuto',[
              'rpcNone','rpcAuto','rpcScript','rpcIFrame',
              'rpcHttpRequest','rpcHttpRequestPOST','rpcHttpRequestGET',
              'rpcJSON','rpcJSONPOST','rpcJSONGET',
              'rpcData','rpcDataPOST','rpcDataGET',
              {Value:99,Text:'rpcUser'}
            ],{ Level: 'basic' }),
            "HTTPMethod": ng_DIPropertyStrings('',['GET','POST','PUT','DELETE','OPTIONS','HEAD','CONNECT'], {
              Types: {
                'string': {
                  Editor: 'ngfeEditor_DropDown'
                }
              }
            }),
            "URL": { DefaultType: 'url', Level: 'basic' },
            "Params": { DefaultType: 'object', Level: 'basic',
              Types: {
                'object': {
                  ChildDesignInfo: {
                    DefaultType: 'string'
                  }
                }
              }
            },
          },
          "Events": {
            "OnRequest": ng_DIPropertyEvent('function(c, reqinfo) { return true; }',{ Level: 'basic' }),
            "OnSendRequest": ng_DIPropertyEvent('function(c, url, reqinfo) { return true; }',{ Level: 'basic' }),
            "OnRequestSent": ng_DIPropertyEvent('function(c, url, reqinfo) {}',{ Level: 'basic' }),
            "OnIFrameRequest": ng_DIPropertyEvent('function(c) { return true; }'),
            "OnHTTPRequest": ng_DIPropertyEvent('function(c, reqinfo) { return true; }'),
            "OnHTTPReadyStateChanged": ng_DIPropertyEvent('function(c, xmlhttp, reqinfo) { return true; }'),
            "OnHTTPRequestFailed": ng_DIPropertyEvent('function(c, xmlhttp, reqinfo) {}'),
            "OnReceivedJSON": ng_DIPropertyEvent('function(c, data, xmlhttp) {}',{ Level: 'basic' }),
            "OnReceivedData": ng_DIPropertyEvent('function(c, response, xmlhttp, reqinfo) { return true; }',{ Level: 'basic' }),
          },
          "OverrideEvents": {
            "OnEncodeParam": ng_DIPropertyEvent('function(c, name, value) { return value; }',{ Level: 'basic' }),
          }
        })
      }
    });

    ngRegisterControlDesignInfo('ngSysURLParams',function(d,c,ref) {
      return {
        ControlCategory: 'System',
        Properties: ng_DIProperties({
          "Data": {
            "Params": { DefaultType: 'object', Level: 'basic',
              Types: {
                'object': {
                  ChildDesignInfo: {
                    DefaultType: 'string'
                  }
                }
              }
            },
            "DefaultValues": { DefaultType: 'object', Level: 'basic',
              Types: {
                'object': {
                  ChildDesignInfo: {
                    DefaultType: 'string'
                  }
                }
              }
            }
          },
          "Events": {
            "OnInit": ng_DIPropertyEvent('function(c, name, val) { return true; }',{ Level: 'basic' }),
            "OnUpdate": ng_DIPropertyEvent('function(c, name, val) { return text; }',{ Level: 'basic' }),
            "OnInitialized": ng_DIPropertyEvent('function(c) {}',{ Level: 'basic' }),
            "OnParamsChanged": ng_DIPropertyEvent('function(c) {}',{ Level: 'basic' })
          },
          "OverrideEvents": {
            "OnGetParam": ng_DIPropertyEvent('function(c, name, val) { return val; }',{ Level: 'basic' }),
            "OnSetParam": ng_DIPropertyEvent('function(c, name, val) { return val; }',{ Level: 'basic' })
          }
        })
      }
    });
  }
};