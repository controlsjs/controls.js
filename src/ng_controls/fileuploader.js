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

var FileUploaderControl = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function() {

    /*  Class: ngFileUploader
     *  Standard control for uploading files.
     */
    function Create_ngFileUploader(def, ref, parent)
    {
      if (typeof(def.Data)==='undefined') def.Data = new Object();

      var base = ngVal(def.Base, 'ngPanel');
      var id   = ngVal(def.Data.FileUploaderID, 'Main');

      ng_MergeDef(def, {
        W: 400, H: 200,
        ParentReferences: false,
        ListFiles: true,
        DropTarget: (ngAndroid || ngiOS || ngWindowsPhone) ? false : true,
        Data: {
          FileUploaderID: id,
          UploadURL: ngLibPath('ng_controls')+'fileuploader.php'
        },
        Controls: {
          UploadIFrame: {
            Type: 'ngText',
            L: 0, B: 0, W: 0, H: 0,
            Data: {
              Text: ng_sprintf(ngTxt('ngfup_IFrame'), id, '1', '1', '1')
            }
          },
          UploadWindow: {
            Type: 'ngWindow',
            W: 260, H: 80,
            Data: {
              ngText: 'ngfup_AddFile',
              Visible: false,
              IFrameSize: { W: 250, H: 45 }
            },
            Controls: {
              TxtAddFile: {
                L: 5, T: 5, R: 0, B: 0,
                Type: 'ngText'
              }
            },
            Events: {
              OnVisibleChanged: function (o) {
                if (typeof(o)==='undefined') return;

                var visible = ngVal(o.Visible, true);

                if ((visible) && (o.Controls.TxtAddFile.GetText()==''))
                  o.Controls.TxtAddFile.SetText(ng_sprintf(ngTxt('ngfup_IFrame'), id, '2', o.IFrameSize.W, o.IFrameSize.H));

                if (!visible) delete c._addedViaAddFile;
              }
            }
          },
          WaitPanel: {
            Type: 'ngPanel',
            L: 0, T: 0, W: 0, H: 0,
            Data: {
              Visible: false,
              SetProgress: function(p) {
                if(this.OnProgress) this.OnProgress(this,p);
              }
            },
            Events: {
              OnVisibleChanged: function (o) {
                if (typeof(o)==='undefined') return;

                if (ngVal(o.Visible, true)) { if (o.OnShowWaiting) o.OnShowWaiting(o); }
                else                        { if (o.OnHideWaiting) o.OnHideWaiting(o); }
              }
            }
          },
          EdtFile: {
            Type: 'ngEdit',
            L: 0, T: 0, R: 140,
            Data: {
              ReadOnly: true
            }
          },
          BtnAddFile: {
            Type: 'ngButton',
            T: 0, R: 0, W: 120,
            Data: {
              ngText: 'ngfup_AddFile'
            },
            Events: {
              OnClick: function () { AddFile(); }
            }
          },
          ListFiles: {
            Type: 'ngList',
            L: 0, T: 40, B: 40, R: 0,
            Data: {
              SelectType: nglSelectNone,
              ShowCheckboxes: true,
              Columns: new Array(
                new ngListCol('File', ngTxt('ngfup_ColFile'))
              )
            },
            Events: {
              OnAdd: function(l,it,p) {
                if(l.Owner.DragAndDropPanel) l.Owner.DragAndDropPanel.SetVisible(false);
                return true;
              },
              OnRemove: function(l,it,p) {
                if((l.Items.length==1)&&(l.Owner.DragAndDropPanel)) l.Owner.DragAndDropPanel.SetVisible(true);
                return true;
              },
              OnCheckChanged: function(o) {
                var ischecked=false;
                this.Scan(function (list, item, parent, userData) {
                  if ((item.Checked)||(ischecked)) { ischecked=true; return false; }
                  return true;
                });
                if(o.Owner.BtnRemoveCheckedFiles) o.Owner.BtnRemoveCheckedFiles.SetEnabled(ischecked);
              },
              OnClickItem: function (o) {
                if ((o) && (o.listPart==0)) o.Owner.CheckItem(o.listItem, !ngVal(o.listItem.Checked, false));
              }
            }
          },
          DragAndDropPanel: {
            Type: 'ngPanel',
            L: 0, R: 0, T: 40, B: 40,
            style: {
              zIndex: 1000
            },
            Controls: {
              DragAndDropInfo: {
                Type: 'ngText',
                L: 0, R: 0, T: '50%',
                Data: {
                  TextAlign: 'center',
                  ngText: 'ngfup_DragAndDropAllowed'
                }
              }
            }
          },
          BtnRemoveCheckedFiles: {
            Type: 'ngButton',
            R: 0, B: 0,
            Data: {
              ngText: 'ngfup_RemoveCheckedFiles',
              Enabled: false
            },
            Events: {
              OnClick: function () { c.RemoveCheckedFiles(); }
            }
          }
        }
      });

      if(def.Controls) {
        if(!def.ListFiles) {
          if(def.Controls.UploadWindow) def.Controls.UploadWindow.parent=ngApp.Elm();
          if(def.Controls.ListFiles) ng_MergeVar(def.Controls.ListFiles,{ Data: { Visible: false } });
          if(def.Controls.DragAndDropPanel) ng_MergeVar(def.Controls.DragAndDropPanel,{ Data: { Visible: false } });
          if(def.Controls.BtnRemoveCheckedFiles) ng_MergeVar(def.Controls.BtnRemoveCheckedFiles,{ Data: { Visible: false } });
        }

        if((!def.DropTarget)||(!window.FormData)||(!('draggable' in document.createElement('span'))))
          delete def.Controls.DragAndDropPanel;
      }

      def.OnCreated=ngAddEvent(def.OnCreated, function (c, ref) {
        if(def.DropTarget) {
          c.RegisterDropTarget(c,function(c,o) {
            var dp=c.Controls.DragAndDropPanel;
            if((dp)&&(dp.OnFilesDragOver)) dp.OnFilesDragOver(dp,o);
          },function(c,o) {
            var dp=c.Controls.DragAndDropPanel;
            if((dp)&&(dp.OnFilesDragLeave)) dp.OnFilesDragLeave(dp,o);
          });
        }
      });

      var c = ngCreateControlAsType(def, base, ref, parent);
      if (!c) return c;

      // ===== PROPERTIES =====

      /*
       *  Group: Properties
       */
      /*  Variable: FileUploaderID
       *  ...
       *  Type: string
       *  Default value: *Main*
       */
      c.FileUploaderID = '';

      /*  Variable: MaxFilesCount
       *  ...
       *  Type: integer
       *  Default value: *undefined*
       */
      //c.MaxFilesCount = undefined;

      /*  Variable: Accept
       *  ...
       *  Type: string
       *  Default value: *''*
       */
      c.Accept = '';

      // ===== METHODS =====

      function AddFile()
      {
        var File = c.Controls.EdtFile.GetText();

        if ((c.OnFileAdding) && (!ngVal(c.OnFileAdding(c, File), false))) return false;
        if (File=='')
        {
          c._addedViaAddFile = true;
          c.ShowForm();

          return false;
        };

        c.Controls.EdtFile.SetText('');
        if(c.Controls.WaitPanel) c.Controls.WaitPanel.SetVisible(true);
        c.SetUploadProgress(/*undefined*/);

        if (c.OnFileChanged) c.OnFileChanged(c, '');

        var Form = c.GetForm();
        if (!Form) return false;

        if(!!window.FormData) {
          var formData = new FormData(Form);

          var rpc=c.GetRPC();
          if(rpc) {
            rpc.clearParams();
            rpc.SetParam('id',c.ID);
            rpc.SetParam('action','upload');
            rpc.FileFormData = formData;

            rpc.sendRequest(c.UploadURL);
            return true;
          }
        }
        Form.submit();
        return true;
      }

      window['ngfup_action'] = function (id, action, data)
      {
        if ((typeof(id)==='undefined') || (typeof(action)==='undefined')) return false;
        data = ngVal(data, null);

        var c = ngGetControlById(id);
        if ((!c) || (!ng_inArray('ngFileUploader', c.CtrlInheritedFrom))) return false;

        if (c[action]) c[action](data);

        return true;
      }

      /*
       *  Group: Methods
       */
      /*  Function: ServerData
       *  ...
       *
       *  Syntax:
       *    bool *ServerData* (object data)
       *
       *  Parameters:
       *    data - ...
       *
       *  Returns:
       *    -
       */

      c.ServerData = function (data) {
        if (typeof(data)==='undefined') return false;

        if(c.Controls.WaitPanel) c.Controls.WaitPanel.SetVisible(false);

        var maxfiles=ngVal(c.MaxFilesCount,-1);

        var errmsg='';
        function fileuploaded(data) {
          if (data === false) return;

          if (data.Error) {
            if(errmsg!='') errmsg+="\n";
            errmsg+=data.Name+': '+ngTxt(data.Error);
            return;
          }

          if((maxfiles>=0)&&(c.Controls.ListFiles.Items.length>=maxfiles)) {
            if(errmsg!='') errmsg+="\n";
            errmsg+=data.Name+': '+ngTxt('ngfup_Error_MaxFiles');
            return;
          }

          c.Controls.ListFiles.Add({ Text: { File: data.Name }, Hash: data.Hash });
          if (c.OnFileAdded) c.OnFileAdded(c, data.Name, data);
        }

        c.Controls.ListFiles.BeginUpdate();
        try {
          if(ng_IsArrayVar(data)) {
            for(var f=0;f<data.length;f++) {
              fileuploaded(data[f]);
            }
            if(errmsg!='') {
              if (c.OnServerError) c.OnServerError(c, errmsg, data);
              else alert(errmsg);
              return false;
            }
          }
          else {
            if (data.Error) {
              if (c.OnServerError) c.OnServerError(c, ngTxt(data.Error), data);
              else alert(ngTxt(data.Error));
              return false;
            }
            fileuploaded(data);
          }
        }
        finally {
          c.Controls.ListFiles.EndUpdate();
        }
        return true;
      }

      /*  Function: ChangeFile
       *  ...
       *
       *  Syntax:
       *    bool *ChangeFile* ()
       *
       *  Returns:
       *    -
       */

      c.ChangeFile = function () {
        var _addedViaAddFile = ngVal(c._addedViaAddFile, false);
        delete c._addedViaAddFile;

        var Form = c.GetForm();
        if (!Form) return false;

        var Value = '';
        var input=Form['ngfup_File[]'];
        var Files = [];
        if('files' in input) {
          for(var i=0;i<input.files.length;i++) {
            if(Value!='') Value+=', ';
            Value+=input.files[i].name;
            Files.push(input.files[i].name)
          }
        }
        else {
          Value = input.value;
          Value = Value.substring(Value.lastIndexOf('\\')+1, Value.length);  //Remove "fake" path (C:\fakepath\)
          if(Value!='') Files.push(Value);
        }

        if ((c.OnFileChanging) && (!ngVal(c.OnFileChanging(c, Value, Files), false))) return false;

        c.Controls.EdtFile.SetText(Value);
        c.ShowWindow(false);

        if (c.OnFileChanged) c.OnFileChanged(c, Value, Files);
        if (_addedViaAddFile) AddFile();

        return true;
      }

      /*  Function: RemoveCheckedFiles
       *  ...
       *
       *  Syntax:
       *    bool *RemoveCheckedFiles* ()
       *
       *  Returns:
       *    -
       */

      c.RemoveCheckedFiles = function () {
        var Checked = c.Controls.ListFiles.GetChecked();
        if (Checked.length==0) return false;

        c.Controls.ListFiles.BeginUpdate();
        for (var i=0;i<Checked.length;i++)
        {
          if ((c.OnFileDeleting) && (!ngVal(c.OnFileDeleting(c, Checked[i], i), false))) continue;
          c.Controls.ListFiles.Remove(Checked[i]);
          if (c.OnFileDeleted) c.OnFileDeleted(c, Checked[i], i);
        }
        c.Controls.ListFiles.EndUpdate();

        return true;
      }

      /*  Function: IsSelectedFile
       *  ...
       *
       *  Syntax:
       *    bool *IsSelectedFile* ()
       *
       *  Returns:
       *    -
       */

      c.IsSelectedFile = function () {
        return (c.Controls.EdtFile.GetText()=='' ? false : true);
      }

      /*  Function: GetSelectedFile
       *  ...
       *
       *  Syntax:
       *    string *GetSelectedFile* ()
       *
       *  Returns:
       *    -
       */

      c.GetSelectedFile = function () {
        return c.Controls.EdtFile.GetText();
      }

      /*  Function: GetForm
       *  ...
       *
       *  Syntax:
       *    object *GetForm* ()
       *
       *  Returns:
       *    -
       */

      c.GetForm = function () {
        var IFrame;

        //Get IFrame
        if (ngIExplorer) IFrame = document.getElementById('IFRAME_FileUploader_'+c.FileUploaderID+'_1');
        else IFrame = document.getElementById('IFRAME_FileUploader_'+c.FileUploaderID+'_2');
        if (!IFrame) return false;

        //Get Document
        var Doc = (IFrame.contentDocument ? IFrame.contentDocument : IFrame.contentWindow.document);
        if (!Doc) return false;

        //Get Form
        var Form = Doc.getElementById('ngfup_Form_'+id);
        if (!Form)  //Create Form if necessary
        {
          var CurDate = new Date();
          var url=ng_AddURLParam(c.UploadURL,'id='+c.ID+'&action=upload&ts='+CurDate.getTime()+'&lang='+ngApp.Lang);

          Doc.open();
          Doc.write('<html><body><form id="ngfup_Form_'+id+'" enctype="multipart/form-data" action="'+url+'" method="POST">');
          Doc.write('<input name="ngfup_File[]" type="file" onchange="if (typeof(parent.ngfup_action)===\'function\') parent.ngfup_action(\''+c.ID+'\', \'ChangeFile\');" size="20" multiple="multiple" '+(c.Accept!='' ? 'accept="'+c.Accept+'" ' : '')+'/>');
          Doc.write('</form></body></html>');
          Doc.close();

          Form = Doc.getElementById('ngfup_Form_'+id);
        }

        if (!Form) return false;

        return Form;
      }

      /*  Function: ShowForm
       *  ...
       *
       *  Syntax:
       *    bool *ShowForm* ()
       *
       *  Returns:
       *    -
       */

      c.ShowForm = function () {
        if (ngIExplorer)
        {
          var Form = c.GetForm();
          if (!Form) return false;

          Form['ngfup_File[]'].click();
        } else c.ShowWindow();

        return true;
      }

      /*  Function: ShowWindow
       *  ...
       *
       *  Syntax:
       *    bool *ShowWindow* ([bool show = true])
       *
       *  Parameters:
       *    show - ...
       *
       *  Returns:
       *    -
       */

      c.ShowWindow = function (show) {
        show = ngVal(show, true);

        c.Controls.UploadWindow.SetVisible(show);
        if (show) c.GetForm();

        return true;
      }

      /*  Function: GetFiles
       *  ...
       *
       *  Syntax:
       *    array *GetFiles* ()
       *
       *  Returns:
       *    -
       */

      c.GetFiles = function () {
        return c.Controls.ListFiles.Items;
      }

      var registered_targets={};

      function stopevent(e) {
        if(!e) e=window.event;
        if(e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
        if(e.preventDefault) e.preventDefault();
        else e.returnValue = false;
      }

      function filedrop(e) {
	      stopevent(e);
        var t=findtarget(e);
        if(t) {
          if(t.ondrop) {
            if(!ngVal(t.ondrop(c,t.elm),false)) return false;
          }
          else if(t.ondragleave) t.ondragleave(c,t.elm);
        }

        var files = e.target.files || e.dataTransfer.files;

        var formData = new FormData();
        for (var i = 0; i < files.length; i++) {
          formData.append('ngfup_File[]', files[i]);
        }

        var rpc=c.GetRPC();
        if(rpc) {
          rpc.clearParams();
          rpc.SetParam('id',c.ID);
          rpc.SetParam('action','upload');
          rpc.FileFormData = formData;

          rpc.sendRequest(c.UploadURL);
        }
        return false;
      }

      function findtarget(e) {
        var t = e.target || e.srcElement || e.originalTarget;
        while((t)&&(t!=document)) {
          if((t.id!='')&&(typeof registered_targets[t.id]!=='undefined')) {
            return registered_targets[t.id];
            break;
          }
          t=t.parentNode;
        }
        return null;
      }

      function filedragover(e) {
	      stopevent(e);
        var t=findtarget(e);
        if((t)&&(t.ondragover)) t.ondragover(c,t.elm);
        return false;
      }

      function filedragleave(e) {
	      stopevent(e);
        var t=findtarget(e);
        if((t)&&(t.ondragleave)) t.ondragleave(c,t.elm);
        return false;
      }

      function dodispose() {
        var delid=[];
        for(var i in registered_targets) {
          delid.push(i);
        }
        for(var i=0;i<delid.length;i++) {
          c.UnregisterDropTarget(delid[i]);
        }
        return true;
      }

      c.AddEvent('DoDispose',dodispose);

      /*  Function: RegisterDropTarget
       *  ...
       *
       *  Syntax:
       *    bool *RegisterDropTarget* (mixed target [, callback ondragover, callback ondragleave, callback ondrop])
       *
       *  Returns:
       *    TRUE if drop target was registered.
       */
      c.RegisterDropTarget = function(t,ondragover,ondragleave,ondrop) {
        var o=null;
        if(typeof t==='string') o=document.getElementByID(t);
        else {
          if(typeof t.Elm === 'function') {
            o=t.Elm();
            t=t.ID;
          }
          else if(typeof t.id!=='undefined') { o=t; t=t.id; }
        }

        if((o)&&(t!='')&&(('draggable' in o)&&(!!window.FormData))) {

          registered_targets[t]={
            elm: o,
            ondrop: ondrop,
            ondragover: ondragover,
            ondragleave: ondragleave
          };
          o.addEventListener("drop", filedrop, false);
          o.addEventListener("dragover", filedragover, false);
          o.addEventListener("dragleave", filedragleave, false);
          return true;
        }
        return false;
      }

      /*  Function: UnregisterDropTarget
       *  ...
       *
       *  Syntax:
       *    void *UnregisterDropTarget* (mixed target)
       *
       *  Returns:
       *    -
       */
      c.UnregisterDropTarget = function(t) {
        var o=null;
        if(typeof t==='string') o=document.getElementByID(t);
        else {
          if(typeof t.Elm === 'function') {
            o=t.Elm();
            t=t.ID;
          }
          else if(typeof t.id!=='undefined') { o=t; t=t.id; }
        }
        if((!o)&&(typeof registered_targets[t]!=='undefined')) o=registered_targets[t].elm;

        if(o) {
          o.removeEventListener("drop", filedrop, false);
          o.removeEventListener("dragover", filedragover, false);
          o.removeEventListener("dragleave", filedragleave, false);
        }

        delete registered_targets[t];
      }

      /*  Function: IsDropTarget
       *  ...
       *
       *  Syntax:
       *    bool *IsDropTarget* (mixed target)
       *
       *  Returns:
       *    TRUE if target is a registered file uploader drop target.
       */
      c.IsDropTarget = function(t) {
        if(typeof t!=='string') {
          if(typeof t.Elm === 'function') {
            t=t.ID;
          }
          else if(typeof t.id!=='undefined') { t=t.id; }
        }
        return typeof registered_targets[t] !== 'undefined';
      }

      /*  Function: SetUploadProgress
       *  ...
       *
       *  Syntax:
       *    void *SetUploadProgress* (integer progress)
       *
       *  Returns:
       *    -
       */
      c.SetUploadProgress = function(p) {
        if((c.OnUploadProgress)&&(!ngVal(c.OnUploadProgress(c,p),false))) return;
        if((c.Controls.WaitPanel)&&(typeof c.Controls.WaitPanel.SetProgress === 'function')) c.Controls.WaitPanel.SetProgress(p);
      }

      c.GetRPC = function() {
        if(!c.file_rpc) {
          c.file_rpc=new ngRPC(c.ID+'RPC','',true);
          c.file_rpc.Type=rpcHttpRequestPOST;
/*          c.file_rpc.OnReceivedData=function(rpc, response, xmlhttp,reqinfo) {
            return true;
          };*/
          c.file_rpc.OnHTTPRequestFailed = function(rpc,xmlhttp,reqinfo) {
            if(reqinfo.UploadFile) {
              c.ServerData({Error: 'ngfup_Error_General'});
            }
          };
          c.file_rpc.OnHTTPRequest=function (rpc,reqinfo) {
            if(c.file_rpc.Params['action']==='upload') {

              if(c.Controls.WaitPanel) c.Controls.WaitPanel.SetVisible(true);

              if("upload" in reqinfo.XMLHttp) {
                c.SetUploadProgress(0);

                reqinfo.XMLHttp.onload = function() {
                  c.SetUploadProgress(100);
                };

                reqinfo.XMLHttp.upload.onprogress = function (event) {
                  if (event.lengthComputable) {
                    c.SetUploadProgress(event.loaded / event.total * 100 | 0);
                  }
                }
              }
              else c.SetUploadProgress(/*undefined*/);

              if(typeof rpc.FileFormData !== 'undefined') {
                delete reqinfo.ReqHeaders["Content-type"];
                delete reqinfo.ReqHeaders["Content-length"];
                reqinfo.PostParams=rpc.FileFormData;
              }
              else {
                var boundary=Math.random().toString().substr(2);
                reqinfo.ReqHeaders["Content-type"]="multipart/form-data; charset=utf-8; boundary=" + boundary;

                var multipart = "--" + boundary
                           + "\r\nContent-Disposition: form-data; name=\"ngfup_File[]\"; filename=\""+rpc.FileName+"\""
                           + "\r\nContent-type: " + ngVal(rpc.FileContentType,'text/plain; charset=utf-8')
                           + "\r\n\r\n" + rpc.FileContent + "\r\n";
                multipart += "--"+boundary+"--\r\n";

                reqinfo.ReqHeaders["Content-length"]=multipart.length;
                reqinfo.PostParams=multipart;
              }
              reqinfo.UploadFile=true;

              // Move params to URL (were in PostParams which was replaced)
              var params=rpc.GetURLParams();
              if(params!='') reqinfo.URL=ng_AddURLParam(reqinfo.URL, params);
            }
            return true;
          }
        }
        return c.file_rpc;
      }

      /*  Function: UploadFile
       *  ...
       *
       *  Syntax:
       *    void *UploadFile* (string filename, string content [, string contenttype='text/plain; charset=utf-8'])
       *
       *  Returns:
       *    -
       */
      c.UploadFile = function (filename, content, contenttype) {
        if((filename=='')||(/[<>|:/\?\"\\]/.test(filename))) {
          throw 'Invalid filename!';
        }

        var rpc=c.GetRPC();
        if(rpc) {
          rpc.clearParams();
          rpc.SetParam('id',c.ID);
          rpc.SetParam('action','upload');
          delete rpc.FileFormData;
          rpc.FileName = filename;
          rpc.FileContent = ngVal(content,'');
          rpc.FileContentType = contenttype;

          rpc.sendRequest(c.UploadURL);
        }
      }

      // ===== EVENTS =====

      /*
       *  Group: Events
       */
      /*
       *  Event: OnServerError
       */
      c.OnServerError = null;

      /*
       *  Event: OnFileAdding
       */
      c.OnFileAdding = null;
      /*
       *  Event: OnFileAdded
       */
      c.OnFileAdded  = null;

      /*
       *  Event: OnFileChanging
       */
      c.OnFileChanging = null;
      /*
       *  Event: OnFileChanged
       */
      c.OnFileChanged  = null;

      /*
       *  Event: OnFileDeleting
       */
      c.OnFileDeleting = null;
      /*
       *  Event: OnFileDeleted
       */
      c.OnFileDeleted = null;

      /*
       *  Event: OnUploadProgress
       */
      c.OnUploadProgress = null;

      if (typeof(ngRegisterBindingHandler)==='function')
      {
        c.OnDataBindingInit = function (c, bindingKey, valueAccessor, allBindingsAccessor, viewModel) {

          switch (bindingKey)
          {
            case 'Value':
              c.AddEvent(function (c) {
                ngCtrlBindingWrite(bindingKey, c.GetFiles(), c, valueAccessor, allBindingsAccessor);
              }, 'OnFileAdded');

              c.AddEvent(function (c) {
                ngCtrlBindingWrite(bindingKey, c.GetFiles(), c, valueAccessor, allBindingsAccessor);
              }, 'OnFileDeleted');
            break;
          }

          return true;

        }

        //c.OnDataBindingUpdate = function (c, bindingKey, valueAccessor, allBindingsAccessor, viewModel) { return true; }
      }

      return c;
    }
    ngRegisterControlType('ngFileUploader', function(def, ref, parent) { return Create_ngFileUploader(def, ref, parent); });

    if (typeof(ngRegisterBindingHandler)==='function')
    {
      ngRegisterBindingHandler('FileUploader_IsSelectedFile',
        function (c, valueAccessor) {
          //ngCtrlBindingRead('FileUploader_IsSelectedFile', c, valueAccessor, function (val) { });
        },
        function (c, valueAccessor, allBindingsAccessor, viewModel) {
          c.AddEvent(function (c) {
            ngCtrlBindingWrite('FileUploader_IsSelectedFile', c.IsSelectedFile(), c, valueAccessor, allBindingsAccessor);
          }, 'OnFileChanged');
        }
      );
    }

  }
};

if (typeof(ngUserControls)==='undefined') ngUserControls = new Array();
ngUserControls['fileuploader'] = FileUploaderControl;
