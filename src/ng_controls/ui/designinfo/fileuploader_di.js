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
var FileUploaderControl_DesignInfo = {
  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('ngFileUploader',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 300 },
              "H": { Value: 200 }
            }
          }
        },
        Properties: ng_diProperties({
          "ParentReferences": ng_diBoolean(false, { Level: 'optional' }),
          "FileUploaderID": ng_diString('Main', { Level: 'basic' }),
          "ButtonsAlign": ng_diStringValues('top', ['top','bottom'], { Level: 'basic' }),
          "ListFiles": ng_diBoolean(true, { Level: 'basic' }),
          "AllowedExtensions": ng_diMixed([
            ng_diUndefined(),
            ng_diBoolean()
          ], { InitType: 'boolean', Level: 'basic' }),
          "SelectFileType":ng_diIntegerIdentifiers('ngFupSelect_CheckItem',['ngFupSelect_None','ngFupSelect_Select','ngFupSelect_CheckBox','ngFupSelect_CheckItem'],{ Level: 'optional' }),
          "Data": {
            "MaxFilesCount": ng_diMixed(['undefined','integer'], { InitType: 'integer', Level: 'basic' }),
            "MaxFileSize": ng_diMixed(['undefined','integer'], { InitType: 'integer', Level: 'basic' }),
            "MaxBatchSize": ng_diMixed(['undefined','integer'], { InitType: 'integer', Level: 'basic' }),
            "AllowedExtensions": ng_diMixed(['undefined','array_strings'], { InitType: 'array_strings', Level: 'basic' }),
            "Accept": ng_diString('', { Level: 'basic' }),
            "UploadURL": ng_diType('url', { Level: 'basic' })
          },
          "Events": {
            "OnError": ng_diEvent('function(c, errmsg, data) {}', { Level: 'basic' }),
            "OnFileAdding": ng_diEvent('function(c, fname) { return true; }', { Level: 'basic' }),
            "OnFileAdded": ng_diEvent('function(c, fname, data) {}', { Level: 'basic' }),
            "OnFileChanging": ng_diEvent('function(c, fname, files) { return true; }', { Level: 'basic' }),
            "OnFileChanged": ng_diEvent('function(c, fname, files) {}', { Level: 'basic' }),
            "OnFileDeleting": ng_diEvent('function(c, it, chidx) { return true; }', { Level: 'basic' }),
            "OnFileDeleted": ng_diEvent('function(c, it, chidx) {}', { Level: 'basic' }),
            "OnUploadProgress": ng_diEvent('function(c, p) { return true; }', { Level: 'basic' }),
            "OnShowWaiting": ng_diEvent('function(c) {}', { Level: 'basic' }),
            "OnHideWaiting": ng_diEvent('function(c) {}', { Level: 'basic' }),
            "OnGetRequestParams": ng_diEvent('function(params) {}', { Level: 'basic' })
          },
          "ModifyControls": {
            "ListFiles": ng_diControl('ngList', ng_diProperties({
              "Data": {
                "Columns": ng_diType('ngListColumns', {}, {
                  ObjectProperties: {
                    0: ng_diType('ngListCol', { OnPropertyInit: null }, {
                      ObjectProperties: {
                        'ID': ng_diString('File', { OnPropertyInit: null }),
                        'Caption': ng_diString(ngTxt('ngfup_ColFile'), { OnPropertyInit: null })
                      }
                    })
                  }
                })
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngList' }),
            "DragAndDropPanel": ng_diControl('ngPanel', ng_diProperties({
              "style": {
                "zIndex": ng_diInteger(1000, { Level: 'basic'})
              },
              "Events": {
                "OnFilesDragOver": ng_diEvent('function(c, o) {}', { Level: 'basic' }),
                "OnFilesDragLeave": ng_diEvent('function(c, o) {}', { Level: 'basic' })
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngPanel' }),
            "DragAndDropInfo": ng_diControl('ngText', ng_diProperties({
              "T": ng_diTypeVal('bounds', '50%'),
              "Data": {
                "TextAlign": ng_diString('center')
              }
            }), { Level: 'basic' }),
            "Buttons": ng_diControl('ngToolBar', null, { Level: 'basic' }, { InheritedFrom: 'ngToolBar' }),
            "BtnAddFile": ng_diControl('ngButton', ng_diProperties({
              "Data": {
                "ngText": ng_diString('ngfup_AddFile')
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngButton' }),
            "BtnRemoveFiles": ng_diControl('ngButton', ng_diProperties({
              "Data": {
                "ngText": ng_diString('ngfup_RemoveFiles'),
                "Enabled": ng_diBoolean(false)
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngButton' })
          }
        })
      };
    });
  }
};
ngUserControls['fileuploader_designinfo'] = FileUploaderControl_DesignInfo;
