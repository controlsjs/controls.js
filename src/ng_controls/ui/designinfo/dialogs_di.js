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
ngUserControls['dialogs_designinfo'] = {
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('ngMessageDlg',function(d,c,ref) {
      return {
        ControlCategory: 'Dialog',
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

        Properties: ng_diProperties({
          "DialogType": ng_diString('ngWindow',{Level: 'optional'}),
          "DlgButtons": ng_diTypeVal('bitmask', { value: mbOK }, { Level: 'basic' }, {
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
          }),
          "CloseBtn": ng_diBoolean(false, { Level: 'optional' }), // CloseBtn has no implementation in ngMessageDlg
          "Data": {
            "DialogResult": ng_diIntegerIdentifiers(0,[{Value:0,Text:'mbNone'},{Value:1,Text:'mbCancel'},{Value:2,Text:'mbOK'},{Value:4,Text:'mbYes'},{Value:8,Text:'mbNo'}],{ Level: 'basic' }),

            // changed ngWindow defaults
            "AutoSize": { Level: 'optional' },
            "Centered": ng_diBoolean(true),
            "Visible": ng_diBoolean(false),
            "Sizeable": ng_diBoolean(false),
            "Modal": ng_diBoolean(true),
            "DisposeOnClose": ng_diBoolean(true)
          },
          "ModifyControls": {
            "Message": ng_diControl('ngText', null, { Level: 'basic' }, { InheritedFrom: 'ngText' }),
            "Content": ng_diControl('ngPanel', null, { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
            "Buttons": ng_diControl('ngToolBar', ng_diProperties({
                         "Data": {
                           "CenterButtons": ng_diBoolean(true, { Level: 'basic' })
                         }
                       }), { Level: 'basic' }, { InheritedFrom: 'ngToolBar' }),
            "OK": ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
            "Yes": ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
            "No": ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
            "Cancel": ng_diControl('ngButton', null, { Level: 'basic' }, { InheritedFrom: 'ngButton' })
          }
        },{
          "ModifyControls": { Level: 'basic' }
        })
      };
    });

    ngRegisterControlDesignInfo('ngAboutDlg',function(d,c,ref) {
      return {
        ControlCategory: 'Dialog',
        Properties: ng_diProperties({
          "AboutSystemInfo": ng_diMixed(['null','ngListStringItems'], { InitType: 'ngListItems', Level: 'basic' }),
          "AboutComponents": ng_diMixed(['null','ngListStringItems'], { InitType: 'ngListItems', Level: 'basic' }),
          "AboutLibraries": ng_diMixed(['null','ngListStringItems'], { InitType: 'ngListItems', Level: 'basic' }),
          "AboutTrademarks": ng_diMixed(['null','ngListStringItems'], { InitType: 'ngListItems', Level: 'basic' }),
          "AboutReleaseNotes": ng_diMixed(['null','ngListStringItems'], { InitType: 'ngListItems', Level: 'basic' }),
          "Data": {
            "AppName": ng_diString(ngTxt('ngAppName',document.title),{ Level: 'basic' }),
            "AppVersion": ng_diString('Version 1.0.0',{ Level: 'basic' }),
            "AppCopyright": ng_diString(ngTxt('ngAppCopyright',''),{ Level: 'basic' }),
            "AppText": ng_diString('',{ Level: 'basic' })
          },
          "ModifyControls": {
            "AppInfo": ng_diControl('ngList', null, { Level: 'basic' }, { InheritedFrom: 'ngList' })
          }
        })
      };
    });
  }
};