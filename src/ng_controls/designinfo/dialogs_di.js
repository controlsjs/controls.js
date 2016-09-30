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
ngUserControls['dialogs_designinfo'] = {
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('ngMessageDlg',function(d,c,ref) {
      return {
        ControlCategory: 'Dialogs',
        IsContainer: false,
        NewControl: {
          Default: {
            Properties: {
              "ModifyControls": {
                ObjectProperties: {
                  "Message": {
                    ObjectProperties: {
                      "Data": {
                        ObjectProperties: {
                          "Text": { ValueByRefName: true }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },

        Properties: ng_DIProperties({
          "DialogType": ng_DIProperty('string','ngWindow',{Level: 'optional'}),
          "DlgButtons": { DefaultType: 'bitmask', Level: 'basic',
            Types: {
              'bitmask': {
                DefaultValue: {
                  value: mbOK
                },
                EditorOptions: {
                  BitMaskIdentifiers: [
//                    {value: mbNone,       id: 'mbNone'},
                    {value: mbCancel,     id: 'mbCancel'},
                    {value: mbOK,         id: 'mbOK'},
                    {value: mbYes,        id: 'mbYes'},
                    {value: mbNo,         id: 'mbNo'},

                    {value: mbDefButton1, id: 'mbDefButton1'},
                    {value: mbDefButton2, id: 'mbDefButton2'},
                    {value: mbDefButton3, id: 'mbDefButton3'},
                    {value: mbDefButton4, id: 'mbDefButton4'}
                  ]
                }
              }
            }
          },
          "CloseBtn": ng_DIPropertyBool(false, { Level: 'optional' }), // CloseBtn has no implementation in ngMessageDlg
          "Data": {
            "DialogResult": ng_DIPropertyIntConstants(0,[{Value:0,Text:'mbNone'},{Value:1,Text:'mbCancel'},{Value:2,Text:'mbOK'},{Value:4,Text:'mbYes'},{Value:8,Text:'mbNo'}],{ Level: 'basic' }),

            // changed ngWindow defaults
            "AutoSize": { Level: 'optional' },
            "Centered": ng_DIPropertyBool(true),
            "Visible": ng_DIPropertyBool(false),
            "Sizeable": ng_DIPropertyBool(false),
            "Modal": ng_DIPropertyBool(true),
            "DisposeOnClose": ng_DIPropertyBool(true)
          },
          "ModifyControls": {
            "Message": ng_DIPropertyControl('ngText', { Level: 'basic' }, 'ngText'),
            "Content": ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel'),
            "Buttons": { DefaultType: 'control', Level: 'basic',
              Types: {
                'control': {
                  Type: 'ngToolBar',
                  InheritedFrom: 'ngToolBar',
                  ObjectProperties: ng_DIProperties({
                    "Data": {
                      "CenterButtons": ng_DIPropertyBool(true, { Level: 'basic' })
                    }
                  })
                }
              }
            },
            "OK": ng_DIPropertyControl('ngButton', { Level: 'basic' }, 'ngButton'),
            "Yes": ng_DIPropertyControl('ngButton', { Level: 'basic' }, 'ngButton'),
            "No": ng_DIPropertyControl('ngButton', { Level: 'basic' }, 'ngButton'),
            "Cancel": ng_DIPropertyControl('ngButton', { Level: 'basic' }, 'ngButton')
          }
        },{
          Properties: {
            "ModifyControls": { Level: 'basic' }
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngAboutDlg',function(d,c,ref) {
      return {
        ControlCategory: 'Dialogs',
        Properties: ng_DIProperties({
          "AboutSystemInfo": ng_DIProperty(['null','ngListStringItems'],undefined, { InitType: 'ngListItems', Level: 'basic' }),
          "AboutComponents": ng_DIProperty(['null','ngListStringItems'],undefined, { InitType: 'ngListItems', Level: 'basic' }),
          "AboutLibraries": ng_DIProperty(['null','ngListStringItems'],undefined, { InitType: 'ngListItems', Level: 'basic' }),
          "AboutTrademarks": ng_DIProperty(['null','ngListStringItems'],undefined, { InitType: 'ngListItems', Level: 'basic' }),
          "AboutReleaseNotes": ng_DIProperty(['null','ngListStringItems'],undefined, { InitType: 'ngListItems', Level: 'basic' }),
          "Data": {
            "AppName": ng_DIProperty('string',ngTxt('ngAppName',document.title),{ Level: 'basic' }),
            "AppVersion": ng_DIProperty('string','Version 1.0.0',{ Level: 'basic' }),
            "AppCopyright": ng_DIProperty('string',ngTxt('ngAppCopyright',''),{ Level: 'basic' }),
            "AppText": ng_DIProperty('string','',{ Level: 'basic' }),
          },
          "ModifyControls": {
            "AppInfo": ng_DIPropertyControl('ngList', { Level: 'basic' }, 'ngList')
          }
        })
      };
    });
  }
};