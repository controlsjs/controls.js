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
        Properties: ng_DIProperties({
          "ParentReferences": ng_DIPropertyBool(false, { Level: 'optional' }),
          "FileUploaderID": ng_DIProperty('string', 'Main', { Level: 'basic' }),
          "ButtonsAlign": ng_DIPropertyStrings('top', ['top','bottom'], { Level: 'basic' }),
          "ListFiles": ng_DIPropertyBool(true, { Level: 'basic' }),
          "AllowedExtensions":  ng_DIProperty(['undefined','boolean'],undefined,{ InitType: 'boolean', Level: 'basic' }),
          "Data": {
            "MaxFilesCount": ng_DIProperty(['undefined','integer'],undefined,{ InitType: 'integer', Level: 'basic' }),
            "MaxFileSize":  ng_DIProperty(['undefined','integer'],undefined,{ InitType: 'integer', Level: 'basic' }),
            "MaxBatchSize":  ng_DIProperty(['undefined','integer'],undefined,{ InitType: 'integer', Level: 'basic' }),
            "AllowedExtensions":  ng_DIProperty(['undefined','array_strings'],undefined,{ InitType: 'array_strings', Level: 'basic' }),
            "Accept": { DefaultType: 'string', Level: 'basic' },
            "UploadURL": { DefaultType: 'url', Level: 'basic' }
          },
          "Events": {
            "OnError": ng_DIPropertyEvent('function(c, errmsg, data) {}', { Level: 'basic' }),
            "OnFileAdding": ng_DIPropertyEvent('function(c, fname) { return true; }', { Level: 'basic' }),
            "OnFileAdded ": ng_DIPropertyEvent('function(c, fname, data) {}', { Level: 'basic' }),
            "OnFileChanging": ng_DIPropertyEvent('function(c, fname, files) { return true; }', { Level: 'basic' }),
            "OnFileChanged ": ng_DIPropertyEvent('function(c, fname, files) {}', { Level: 'basic' }),
            "OnFileDeleting": ng_DIPropertyEvent('function(c, it, chidx) { return true; }', { Level: 'basic' }),
            "OnFileDeleted": ng_DIPropertyEvent('function(c, it, chidx) {}', { Level: 'basic' }),
            "OnUploadProgress": ng_DIPropertyEvent('function(c, p) { return true; }', { Level: 'basic' }),
            "OnShowWaiting": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' }),
            "OnHideWaiting": ng_DIPropertyEvent('function(c) {}', { Level: 'basic' }),
            "OnGetRequestParams": ng_DIPropertyEvent('function(params) {}', { Level: 'basic' })
          },
          "ModifyControls": {
            "ListFiles": ng_DIPropertyControl('ngList', { Level: 'basic' }, 'ngList'),
            "DragAndDropPanel": ng_DIPropertyControl('ngPanel', { Level: 'basic' }, 'ngPanel', ng_DIProperties({
              "Events": {
                "OnFilesDragOver": ng_DIPropertyEvent('function(c, o) {}', { Level: 'basic' }),
                "OnFilesDragLeave": ng_DIPropertyEvent('function(c, o) {}', { Level: 'basic' })
              }
            })),
            "DragAndDropInfo": ng_DIPropertyControl('ngText', { Level: 'basic' }),
            "Buttons": ng_DIPropertyControl('ngToolBar', { Level: 'basic' }, 'ngToolBar'),
            "BtnAddFile": ng_DIPropertyControl('ngButton', { Level: 'basic' }, 'ngButton'),
            "BtnRemoveFiles": ng_DIPropertyControl('ngButton', { Level: 'basic' }, 'ngButton')
          }
        },{
          "ModifyControls": { Level: 'basic' }
        })
      };
    });
  }
};
ngUserControls['fileuploader_designinfo'] = FileUploaderControl_DesignInfo;
