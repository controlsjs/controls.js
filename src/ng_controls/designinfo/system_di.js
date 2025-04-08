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
ngUserControls['system_designinfo'] = {
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('ngSysContainer',function(d,c,ref) {
      return {
        ControlCategory: 'System',
        IsBasic: true,
        IsContainer: true,
        Properties: {
          "ParentReferences": ng_diBoolean(false, { Level: 'advanced' }),
          "Controls": { Level: 'basic' },
          "ModifyControls": { Level: 'basic' },
          "Data": ng_diObject({
            "ChildHandling": { Level: 'basic' }
          })
        }
      };
    });

    ngRegisterControlDesignInfo('ngSysTimer',function(d,c,ref) {
      return {
        ControlCategory: 'System',
        IsBasic: true,
        Properties: ng_diProperties({
          "Data": {
            "Interval": ng_diInteger(0,{Level:'basic'}),
            "Repeat": ng_diMixed([
              ng_diBoolean(true),
              ng_diInteger(0, void 0, { InitValue: 1 })
            ], { Level:'basic' })
          },
          "Events": {
            "OnTimer": ng_diEvent('function(c, tickcnt) { return true; }',{Level:'basic'}),
            "OnStart": ng_diEvent('function(c) { return true; }',{Level:'basic'}),
            "OnStop": ng_diEvent('function(c, tickcnt) {}',{Level:'basic'})
          }
        })
      }
    });

    ngRegisterControlDesignInfo('ngSysRPC',function(d,c,ref) {
      return {
        ControlCategory: 'System',
        IsBasic: true,
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
        Properties: ng_diProperties({
          "Data": {
            "nocache": ng_diBoolean(false, { Level: 'basic' }),
            "Type": ng_diIntegerIdentifiers('rpcAuto',[
              'rpcNone','rpcAuto','rpcScript','rpcIFrame',
              'rpcHttpRequest','rpcHttpRequestPOST','rpcHttpRequestGET',
              'rpcJSON','rpcJSONPOST','rpcJSONGET',
              'rpcData','rpcDataPOST','rpcDataGET',
              {Value:99,Text:'rpcUser'}
            ],{ Level: 'basic' }),
            "HTTPMethod": ng_diStringValues('',['GET','POST','PUT','DELETE','OPTIONS','HEAD','CONNECT'], { Level: 'advanced' }, { Editor: 'ngfeEditor_DropDown' }),
            "URL": ng_diType('url', { Level: 'basic' }),
            "Timeout": ng_diInteger(0,{Level:'basic'}),
            "Params": ng_diObject(void 0, { Level: 'basic' }, {
              ChildDesignInfo: ng_diString('', { Level: 'basic' })
            })
          },
          "Events": {
            "OnRequest": ng_diEvent('function(c, reqinfo) { return true; }',{ Level: 'basic' }),
            "OnSendRequest": ng_diEvent('function(c, url, reqinfo) { return true; }',{ Level: 'basic' }),
            "OnRequestSent": ng_diEvent('function(c, url, reqinfo) {}',{ Level: 'basic' }),
            "OnError": ng_diEvent('function(c, reqinfo) {}',{ Level: 'basic' }),
            "OnIFrameRequest": ng_diEvent('function(c, doc, url, reqinfo) { return true; }', { Level: 'advanced' }),
            "OnHTTPRequest": ng_diEvent('function(c, reqinfo) { return true; }', { Level: 'advanced' }),
            "OnHTTPReadyStateChanged": ng_diEvent('function(c, xmlhttp, reqinfo) { return true; }', { Level: 'advanced' }),
            "OnHTTPRequestFailed": ng_diEvent('function(c, xmlhttp, reqinfo) {}', { Level: 'advanced' }),
            "OnReceivedJSON": ng_diEvent('function(c, data, xmlhttp, reqinfo) {}',{ Level: 'basic' }),
            "OnReceivedData": ng_diEvent('function(c, response, xmlhttp, reqinfo) { return true; }',{ Level: 'basic' })
          },
          "OverrideEvents": {
            "OnEncodeParam": ng_diEvent('function(c, name, value) { return value; }',{ Level: 'basic' })
          }
        })
      }
    });

    ngRegisterControlDesignInfo('ngSysFileDownloader',function(d,c,ref) {
      return {
        ControlCategory: 'System',
        IsBasic: true,
        Properties: ng_diProperties({
          "Data": {
            "URL": ng_diType('url', { Level: 'basic' }),
            "Params": ng_diObject(void 0, { Level: 'basic' }, {
              ChildDesignInfo: ng_diString('', { Level: 'basic' })
            }),
            "NoCache": ng_diBoolean(true, { Level: 'basic' }),
            "Type": ng_diIntegerIdentifiers('rpcAuto',['rpcScript','rpcIFrame'],{ Level: 'advanced' })
          },
          "Events": {
            "OnDownload": ng_diEvent('function(c, opts) { return true; }',{ Level: 'basic' })
          }
        })
      }
    });

    ngRegisterControlDesignInfo('ngSysURLParams',function(d,c,ref) {
      return {
        ControlCategory: 'System',
        IsBasic: true,
        Properties: ng_diProperties({
          "Data": {
            "Params": ng_diObject(void 0, { Level: 'basic' }, {
              ChildDesignInfo: ng_diString('', { Level: 'basic' })
            }),
            "DefaultValues": ng_diObject(void 0, { Level: 'basic' }, {
              ChildDesignInfo: ng_diString('', { Level: 'basic' })
            })
          },
          "Events": {
            "OnInit": ng_diEvent('function(c, name, val) { return true; }',{ Level: 'basic' }),
            "OnUpdate": ng_diEvent('function(c, name, val) { return text; }',{ Level: 'basic' }),
            "OnInitialized": ng_diEvent('function(c) {}',{ Level: 'basic' }),
            "OnParamsChanged": ng_diEvent('function(c) {}',{ Level: 'basic' })
          },
          "OverrideEvents": {
            "OnGetParam": ng_diEvent('function(c, name, val) { return val; }',{ Level: 'basic' }),
            "OnSetParam": ng_diEvent('function(c, name, val) { return val; }',{ Level: 'basic' })
          }
        })
      }
    });
  }
};