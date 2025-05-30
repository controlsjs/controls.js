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
      var dialogresultsconsts=[{Value:0,Text:'mbNone'},{Value:1,Text:'mbCancel'},{Value:2,Text:'mbOK'},{Value:4,Text:'mbYes'},{Value:8,Text:'mbNo'}];
      return {
        ControlCategory: 'Dialog',
        IsContainer: false,
        NewControl: {
          Default: {
            Properties: {
              "Data": {
                ObjectProperties: {
                  "Text": { ValueByRefName: true }
                }
              },
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
          "L": ng_diTypeVal('bounds', 200),
          "T": ng_diTypeVal('bounds', 150),
          "DialogType": ng_diString('ngWindow',{Level: 'optional'}),
          "DlgButtons": ng_diTypeVal('bitmask', mbOK, { Level: 'basic' }, {
            EditorOptions: {
              BitMaskIdentifiers: [
                {Value: mbNone,       ID: 'mbNone'},
                {Value: mbCancel,     ID: 'mbCancel'},
                {Value: mbOK,         ID: 'mbOK'},
                {Value: mbYes,        ID: 'mbYes'},
                {Value: mbNo,         ID: 'mbNo'},

                {Value: mbDefButton1, ID: 'mbDefButton1'},
                {Value: mbDefButton2, ID: 'mbDefButton2'},
                {Value: mbDefButton3, ID: 'mbDefButton3'},
                {Value: mbDefButton4, ID: 'mbDefButton4'}
              ]
            }
          }),
          "CloseBtn": ng_diBoolean(false, { Level: 'optional' }), // CloseBtn has no implementation in ngMessageDlg
          "Data": {
            "DialogResult": ng_diIntegerIdentifiers(0,dialogresultsconsts,{ Level: 'basic' }),

            // changed ngWindow defaults
            "AutoSize": ng_diBoolean(true, { Level: 'optional' }),
            "Centered": ng_diBoolean(true),
            "Visible": ng_diBoolean(false),
            "Sizeable": ng_diBoolean(false),
            "Modal": ng_diBoolean(true),
            "DisposeOnClose": ng_diBoolean(true)
          },
          "ModifyControls": {
            "Message": ng_diControl('ngText', ng_diProperties({
              "L": ng_diTypeVal('bounds', 15),
              "T": ng_diTypeVal('bounds', 15),
              "Data": {
                "AutoSize": ng_diBoolean(true)
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngText' }),
            "Content": ng_diControl('ngPanel', {
              "L": ng_diTypeVal('bounds', 15),
              "R": ng_diTypeVal('bounds', 15),
              "H": ng_diTypeVal('bounds', 15)
            }, { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
            "Buttons": ng_diControl('ngToolBar', ng_diProperties({
              "H": ng_diTypeVal('bounds', 23),
              "Data": {
                "CenterButtons": ng_diBoolean(true, { Level: 'basic' }),
                "Vertical": ng_diBoolean(true),
                "AutoSize": ng_diBoolean(true),
                "HPadding": ng_diInteger(10)
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngToolBar' }),
            "OK": ng_diControl('ngButton', ng_diProperties({
              "W": ng_diTypeVal('bounds', 80),
              "Data": {
                "ngText": ng_diString('mbOK'),
                "Default": ng_diBoolean(true),
                "DialogResult": ng_diIntegerIdentifiers('mbOK',dialogresultsconsts,{Level: 'basic'})
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
            "Yes": ng_diControl('ngButton', ng_diProperties({
              "W": ng_diTypeVal('bounds', 80),
              "Data": {
                "ngText": ng_diString('mbYes'),
                "Default": ng_diBoolean(true),
                "DialogResult": ng_diIntegerIdentifiers('mbYes',dialogresultsconsts,{Level: 'basic'})
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
            "No": ng_diControl('ngButton', ng_diProperties({
              "W": ng_diTypeVal('bounds', 80),
              "Data": {
                "ngText": ng_diString('mbNo'),
                "DialogResult": ng_diIntegerIdentifiers('mbNo',dialogresultsconsts,{Level: 'basic'})
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
            "Cancel": ng_diControl('ngButton', ng_diProperties({
              "W": ng_diTypeVal('bounds', 80),
              "Data": {
                "ngText": ng_diString('mbCancel'),
                "Cancel": ng_diBoolean(true),
                "DialogResult": ng_diIntegerIdentifiers('mbCancel',dialogresultsconsts,{Level: 'basic'})
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngButton' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngAboutDlg',function(d,c,ref) {
      return {
        ControlCategory: 'Dialog',
        NewControl: {
          Default: {
            Properties: {
            }
          }
        },
        Properties: ng_diProperties({
          "DialogType": ng_diString('ngMessageDlg'),
          "DlgButtons": ng_diTypeVal('bitmask', mbOK),
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
            "Message": ng_diControl(void 0, ng_diProperties({
              "Data": {
                "MinWidth": ng_diInteger(260)
              }
            })),
            "Content": ng_diControl(void 0, {
              "H": ng_diTypeVal('bounds', 125)
            }),
            "AppInfo": ng_diControl('ngList', ng_diProperties({
              "T": ng_diTypeVal('bounds', 20),
              "H": ng_diTypeVal('bounds', 90),
              "Data": {
                "CanSelectText": ng_diBoolean(true),
                "Items": ng_diType('ngListItems', { Collapsed: false, Level: 'basic' }, {
                  ObjectProperties: {
                    0: ng_diType('ngListItem',{ Level: 'basic' }, {
                      ObjectProperties: {
                        "id": ng_diString('SystemInfo',{ Level: 'basic' }),
                        "Collapsed": ng_diTypeVal('boolean', true)
                      }
                    }),
                    1: ng_diType('ngListItem',{ Level: 'basic' }, {
                      ObjectProperties: {
                        "id": ng_diString('Components',{ Level: 'basic' }),
                        "Collapsed": ng_diTypeVal('boolean', true)
                      }
                    }),
                    2: ng_diType('ngListItem',{ Level: 'basic' }, {
                      ObjectProperties: {
                        "id": ng_diString('Libraries',{ Level: 'basic' }),
                        "Visible": ng_diTypeVal('boolean', false)
                      }
                    }),
                    3: ng_diType('ngListItem',{ Level: 'basic' }, {
                      ObjectProperties: {
                        "id": ng_diString('Trademarks',{ Level: 'basic' }),
                        "Visible": ng_diTypeVal('boolean', false)
                      }
                    }),
                    4: ng_diType('ngListItem',{ Level: 'basic' }, {
                      ObjectProperties: {
                        "id": ng_diString('ReleaseNotes',{ Level: 'basic' }),
                        "Visible": ng_diTypeVal('boolean', false)
                      }
                    })
                  }
                })
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngList' }),
            "Buttons": ng_diControl(void 0, ng_diProperties({
              "R": ng_diTypeVal('bounds', 10),
              "Data": {
                "CenterButtons": ng_diBoolean(false)
              }
            }))
          }
        })
      };
    });
  }
};