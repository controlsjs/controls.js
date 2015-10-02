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

  ngUserControls['system_designinfo'] = {
    OnControlCreated: function(def, c) {
      if(!ngHASDESIGNINFO()) return;

      if (typeof def.DesignInfo === 'undefined') def.DesignInfo = {};

      var di;
      switch(c.DefType)
      {
        case 'ngSysAction':
          di = {
            BasicComponent: c.DefType,
            Properties: {
              Data: {
                properties: {
                  Text: { type: 'string' },
                  ngText: { type: 'string' },
                  ngTextD: { type: 'string', lvl: 2 },
                  Alt: { type: 'string' },
                  ngAlt: { type: 'string' },
                  ngAltD: { type: 'string', lvl: 2 },
                  Checked: { type: 'integer', dVal: '1', readOnly: true,
                    items: ['0', '1', '2']
                  },
                  RadioGroup: { type: 'string' },
                  Img: { type: 'object' },
                  Visible: { type: 'boolean' }
                }
              },
              Events: {
                properties: {
                  OnSetText: { type: 'function', dVal: 'function(text, c) { return text; }' },
                  OnGetText: { type: 'function', dVal: 'function(c) { return c.Text; }' },
                  OnGetAlt: { type: 'function', dVal: 'function(c) { return c.Alt; }' },
                  OnCheckChanged: { type: 'function', dVal: 'function(c) { }' },
                  OnClick: { type: 'function', dVal: 'function(e) { return true; }' },
                  OnGetImg: { type: 'function', dVal: 'function(c) { return c.Img; }' },
                  OnSetVisible: { type: 'function', dVal: 'function(c, v) { return true; }' },
                  OnVisibleChanged: { type: 'function', dVal: 'function(c) { }' },
                  OnUpdate: { type: 'function', dVal: 'function(c) { return true; }' }
                }
              }
            }
          };
          break;

         case 'ngSysTimer':
           di = {
             BasicComponent: c.DefType,
             Properties: {
               Data: {
                 properties: {
                   Interval: { type: 'integer', dVal: 1000 },
                   Repeat: { type: ['boolean','integer'], dVal: true }
                 }
               },
               Events: {
                 properties: {
                   OnTimer: { type: 'function', dVal: 'function(c, tickcnt) { return true; }' },
                   OnStart: { type: 'function', dVal: 'function(c) { return true; }', lvl: 2 },
                   OnStop: { type: 'function', dVal: 'function(c, tickcnt) { }', lvl: 2 }
                 }
               }
             }
           }
           break;
         case 'ngSysRPC':
           di = {
             BasicComponent: c.DefType,
             AddData: {
               InitProperties: {
                   Data: {},
                  'Data.Type': {value:'rpcJSONGET'},
                  'Data.nocache': {value:true}
               }
             },
             Properties: {
               Data: {
                 properties: {
                   Type: { type: 'integer', dVal: 'rpcAuto', readOnly: true,
                     items: ['rpcAuto',
                             'rpcScript',
                             'rpcIFrame',
                             'rpcHttpRequest',
                             'rpcHttpRequestPOST',
                             'rpcHttpRequestGET',
                             'rpcJSON',
                             'rpcJSONPOST',
                             'rpcJSONGET',
                             'rpcData',
                             'rpcDataPOST',
                             'rpcDataGET',
                             'rpcUser']
                   },
                   nocache: { type: 'boolean', dVal: false },
                   HTTPMethod: { type: 'string', lvl: 2 },
                   URL: { type: 'string' },
                   Params: { type: 'object', lvl: 2 }
                 }
               },
               Events: {
                 properties: {
                   OnEncodeParam: { type: 'function', dVal: 'function(c, name, value) { return value; }', lvl: 2 },
                   OnRequest: { type: 'function', dVal: 'function(c, reqinfo) { return true; }' },
                   OnSendRequest: { type: 'function', dVal: 'function(c, url, doc) { return true; }' },
                   OnRequestSent: { type: 'function', dVal: 'function(c, url, reqinfo) { }' },
                   OnIFrameRequest: { type: 'function', dVal: 'function(c, url, doc) { return true; }', lvl: 2 },
                   OnHTTPRequest: { type: 'function', dVal: 'function(c, reqinfo) { return true; }', lvl: 2 },
                   OnHTTPReadyStateChanged: { type: 'function', dVal: 'function(c, xmlhttp) { return true; }', lvl: 2 },
                   OnHTTPRequestFailed: { type: 'function', dVal: 'function(c, xmlhttp) { }', lvl: 2 },
                   OnReceivedJSON: { type: 'function', dVal: 'function(c, json, xmlhttp) { }' },
                   OnReceivedData: { type: 'function', dVal: 'function(c, response, xmlhttp) { return true; }' }
                 }
               }
             }
           }
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