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
      if (typeof def.FileUploaderID !== 'undefined') def.Data.FileUploaderID=def.FileUploaderID;

      var buttonsalign='top';
      var base = ngVal(def.Base, 'ngPanel');
      var id = ngVal(def.Data.FileUploaderID, 'Main');
      // some browsers don't support click() on input file, define where support is available
      var uploadwin = !( ngIExplorer || ((ngFireFox)&&(ngFireFoxVersion>=4)) || ngChrome || ngiOS || ((ngOpera)&&(ngOperaVersion>=12)) );


      function isfileschecked(l) {
        var ischecked=false;
        l.Scan(function (list, item, parent, userData) {
          if ((item.Checked)||(ischecked)) { ischecked=true; return false; }
          return true;
        });
        return ischecked;
      }

      ng_MergeDef(def, {
        W: 400, H: 200,
        ParentReferences: false,
        ListFiles: true,
        UseUploadWindow: uploadwin,
        DropTarget: (ngAndroid || ngiOS || ngWindowsPhone) ? false : true,
        Data: {
          FileUploaderID: id,
          UploadURL: ngLibPath('ng_controls')+'fileuploader.php'
        },
        Controls: {
          UploadIFrame: {
            Type: 'ngText',
            L: 0, T: 0, W: 0, H: 0,
            Data: {
              Text: ng_sprintf(ngTxt('ngfup_IFrame'), id, '1', '1', '1')
            },
            Events: {
              OnUpdated: function(o) {
                c.GetForm(); // force IFRAME creation
              }
            }
          },
          UploadWindow: {
            Type: 'ngWindow',
            W: 260, H: 80,
            Data: {
              Centered: false,
              ngText: 'ngfup_AddFile',
              Visible: false,
              Modal: true,
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

                var winw,winh,cw,ch;

                var ow=o.Elm();
                var oc=o.Owner.Owner.Elm();
                ng_BeginMeasureElement(ow);
                try {
                  winw=ng_OuterWidth(ow);
                  winh=ng_OuterHeight(ow);
                } finally {
                  ng_EndMeasureElement(ow);
                }
                ng_BeginMeasureElement(oc);
                try {
                  cw=ng_OuterWidth(oc);
                  ch=ng_OuterHeight(oc);
                } finally {
                  ng_EndMeasureElement(oc);
                }

                var pp=ng_ParentPosition(oc,ow.parentNode);
                var l=pp.x+Math.round((cw-winw)/2);
                var t=pp.y+Math.round((ch-winh)/2);
                if(l<0) l=0;
                if(t<0) t=0;
                o.SetBounds({L: l, T: t });

                if ((visible) && (o.Controls.TxtAddFile.GetText()==''))
                  o.Controls.TxtAddFile.SetText(ng_sprintf(ngTxt('ngfup_IFrame'), id, '2', o.IFrameSize.W, o.IFrameSize.H));
              }
            }
          },
          ListFiles: {
            Type: 'ngList',
            L: 0, T: 0, B: 0, R: 0,
            Data: {
              SelectType: nglSelectNone,
              ShowCheckboxes: true,
              ShowHeader: false,
              Columns: new Array(
                new ngListCol('File', ngTxt('ngfup_ColFile'))
              )
            },
            Events: {
              OnUpdated: function(l,o) {
                if(l.Owner.DragAndDropPanel) {
                  if(l.Owner.DragAndDropPanel.SetBounds(l.Bounds)) l.Owner.DragAndDropPanel.Update();
                }
              },
              OnAdd: function(l,it,p) {
                if(l.Owner.DragAndDropPanel) l.Owner.DragAndDropPanel.SetVisible(false);
                return true;
              },
              OnRemove: function(l,it,p) {
                if((l.Items.length==1)&&(l.Owner.DragAndDropPanel)) l.Owner.DragAndDropPanel.SetVisible(true);
                return true;
              },
              OnCheckChanged: function(o) {
                if(o.Owner.BtnRemoveCheckedFiles) o.Owner.BtnRemoveCheckedFiles.SetEnabled(isfileschecked(this));
              },
              OnClickItem: function (o) {
                if ((o) && (o.listPart==0)) o.Owner.CheckItem(o.listItem, !ngVal(o.listItem.Checked, false));
              }
            }
          },
          DragAndDropPanel: {
            Type: 'ngPanel',
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
          Buttons: {
            Type: 'ngToolBar',
            L: 0, B: 0, R: 0,
            Events: {
              OnUpdated: function(c,o) {
                if(c.Owner.ListFiles) {
                  var h=ng_OuterHeight(o);
                  if(c.Owner.ListFiles.SetBounds(buttonsalign == 'top' ? {T:h} : {B:h})) c.Owner.ListFiles.Update();
                }
              }
            },
            Controls: {
              BtnAddFile: {
                Type: 'ngButton',
                Data: {
                  ngText: 'ngfup_AddFile'
                },
                Events: {
                  OnClick: function () { c.ShowForm(); }
                }
              },
              BtnRemoveCheckedFiles: {
                Type: 'ngButton',
                Data: {
                  ngText: 'ngfup_RemoveCheckedFiles',
                  Enabled: false
                },
                Events: {
                  OnClick: function () { c.RemoveCheckedFiles(); }
                }
              }
            }
          }
        }
      });
      uploadwin=uploadwin || def.UseUploadWindow;

      if(typeof def.Data.MaxFilesCount === 'undefined') {
        var max=parseInt(ngVal(ngApp.StartParams['ngFileUploader.'+id+'.MaxFilesCount'], 0),10);
        if(max>0) def.Data.MaxFilesCount=max;
      }

      if(typeof def.Data.MaxFileSize === 'undefined') {
        var max=parseInt(ngVal(ngApp.StartParams['ngFileUploader.'+id+'.MaxFileSize'], 0),10);
        if(max>0) def.Data.MaxFileSize=max;
      }

      if(typeof def.Data.MaxBatchSize === 'undefined') {
        var max=parseInt(ngVal(ngApp.StartParams['ngFileUploader.'+id+'.MaxBatchSize'], 0),10);
        if(max>0) def.Data.MaxBatchSize=max;
      }

      if(typeof def.Data.AllowedExtensions === 'undefined') {
        var allowedext=ngVal(ngApp.StartParams['ngFileUploader.'+id+'.AllowedExtensions'], '');
        if(allowedext!='') def.Data.AllowedExtensions=allowedext;
      }

      if(def.Controls) {
        if(typeof def.Controls.UploadWindow.parent === 'undefined') def.Controls.UploadWindow.parent=(typeof ngApp === 'object')&&(ngApp) ? ngApp.TopElm() : document.body;
        if(!def.ListFiles) {
          if(def.Controls.Buttons) {
            if(def.Controls.Buttons.Controls.BtnRemoveCheckedFiles) ng_MergeVar(def.Controls.Buttons.Controls.BtnRemoveCheckedFiles,{ Data: { Visible: false } });
          }
          if(def.Controls.ListFiles) ng_MergeVar(def.Controls.ListFiles,{ Data: { Visible: false } });
          if(def.Controls.DragAndDropPanel) ng_MergeVar(def.Controls.DragAndDropPanel,{ Data: { Visible: false } });
        }

        if((!def.DropTarget)||(!window.FormData)||(!('draggable' in document.createElement('span'))))
          delete def.Controls.DragAndDropPanel;
      }

      if(typeof def.ButtonsAlign!=='undefined') buttonsalign=def.ButtonsAlign;
      if(typeof def.Data.ButtonsAlign!=='undefined') buttonsalign=def.Data.ButtonsAlign;

      if(buttonsalign=='top') {
        delete def.Controls.Buttons.B;
        if(def.Controls.Buttons.T==='undefined') def.Controls.Buttons.T=0;
      }

      def.OnCreated=ngAddEvent(def.OnCreated, function (c, ref) {
        if((c.Controls.BtnRemoveCheckedFiles)&&(c.Controls.ListFiles)) {
          c.Controls.BtnRemoveCheckedFiles.AddEvent('OnSetEnabled',function(o,v) {
            if((v)&&(c.Controls.ListFiles)&&(!isfileschecked(c.Controls.ListFiles))) {
              return false;
            }
            return true;
          });
        }

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

      c.ButtonsAlign=buttonsalign;

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

      /*  Variable: MaxFileSize
       *  ...
       *  Type: integer
       *  Default value: *undefined*
       */
      //c.MaxFileSize = undefined;

      /*  Variable: MaxBatchSize
       *  ...
       *  Type: integer
       *  Default value: *undefined*
       */
      //c.MaxBatchSize = undefined;

      /*  Variable: AllowedExtensions
       *  ...
       *  Type: array
       *  Default value: *undefined*
       */
      //c.AllowedExtensions = undefined;

      /*  Variable: Accept
       *  ...
       *  Type: string
       *  Default value: *''*
       */
      c.Accept = '';

      c.Waiting = false;

      // ===== METHODS =====

      function sendfiles()
      {
        if(!c.Enabled) return false;

        var Form = c.GetForm();
        if (!Form) return false;

        if(!!window.FormData) {
          var formData = new FormData(Form);

          var rpc=c.GetRPC();
          if(rpc) {
            rpc.clearParams();
            rpc.SetParam('id',c.ID);
            rpc.SetParam('fuid',c.FileUploaderID);
            rpc.SetParam('action','upload');
            rpc.FileFormData = formData;

            rpc.sendRequest(c.UploadURL);
            return true;
          }
        }
        c.ShowWaiting(true);
        c.SetUploadProgress(/*undefined*/);
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

        c.ShowWaiting(false);

        var maxfiles=ngVal(c.MaxFilesCount,-1);

        var errmsg='';
        function fileuploaded(data) {
          if (data === false) return;

          if (data.Error) {
            if(errmsg!='') errmsg+="\n";
            if(ngVal(data.Name,'')!='') errmsg+=data.Name+': ';
            errmsg+=ngTxt(data.Error);
            return;
          }

          if((maxfiles>=0)&&(c.Controls.ListFiles.Items.length>=maxfiles)) {
            if(errmsg!='') errmsg+="\n";
            if(ngVal(data.Name,'')!='') errmsg+=data.Name+': ';
            errmsg+=ngTxt('ngfup_Error_MaxFiles');
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
              c.ShowError(errmsg, data);
              return false;
            }
          }
          else {
            if (data.Error) {
              c.ShowError(ngTxt(data.Error), data);
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

      function checkfiles(files) {
        var maxfiles=ngVal(c.MaxFilesCount,-1);
        var curfiles=0;
        if(c.Controls.ListFiles) curfiles=c.Controls.ListFiles.Items.length;
        if((maxfiles>=0)&&(curfiles+files.length>maxfiles)) {
          c.ShowError(ngTxt('ngfup_Error_MaxFiles'),null);
          return false;
        }

        function ext(fn) {
          var i=fn.lastIndexOf('.');
          if(i<0) return '';
          return fn.substr(i+1);
        }

        var maxbatchsize=parseInt(ngVal(c.MaxBatchSize,0));
        var maxsize=parseInt(ngVal(c.MaxFileSize,0));
        var batchsize=0;
        var checkext=(!ng_EmptyVar(c.AllowedExtensions));
        if((checkext)||(maxsize>0)) {
          var errmsg='';
          var s,e,found;
          for(var i=0;i<files.length;i++) {
            if(checkext) {
              e=ext(files[i].name).toLowerCase();
              found=false;
              if(e!='') {
                for(var j in c.AllowedExtensions)
                  if(c.AllowedExtensions[j].toLowerCase()===e) { found=true; break; }
              }
              if(!found) {
                if(errmsg!='') errmsg+="\n";
                errmsg+=files[i].name+': '+ngTxt('ngfup_Error_Extension');
                continue;
              }
            }
            if(typeof files[i].size !== 'undefined') {
              s=parseInt(files[i].size,10);
              if(batchsize>=0) batchsize+=s;
              if((maxsize>0)&&(s>maxsize)) {
                if(errmsg!='') errmsg+="\n";
                errmsg+=files[i].name+': '+ngTxt('ngfup_Error_Size');
                continue;
              }
            }
            else batchsize=-1;
          }
          if(errmsg!='') {
            c.ShowError(errmsg,null);
            return false;
          }
          if((batchsize>0)&&(maxbatchsize>0)&&(batchsize>maxbatchsize)) {
            c.ShowError(ngTxt('ngfup_Error_MaxBatch'),null);
            return false;
          }
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
        if((new Date().getTime()-showformtime)<1000) return; // probably invoked by showing dialog
        var Form = c.GetForm();
        if (!Form) return false;

        var Value = '';
        var input=Form['ngfup_File[]'];
        var Files = [];
        if('files' in input) {
          if(!input.files.length) return false;
          if(!checkfiles(input.files)) return false;

          for(var i=0;i<input.files.length;i++) {
            if ((c.OnFileAdding) && (!ngVal(c.OnFileAdding(c, input.files[i].name), false))) return false;

            if(Value!='') Value+=', ';
            Value+=input.files[i].name;
            Files.push(input.files[i].name)
          }
        }
        else {
          Value = input.value;
          Value = Value.substring(Value.lastIndexOf('\\')+1, Value.length);  //Remove "fake" path (C:\fakepath\)
          if(Value!='') Files.push(Value);
          if ((c.OnFileAdding) && (!ngVal(c.OnFileAdding(c, input.value), false))) return false;
        }

        if ((c.OnFileChanging) && (!ngVal(c.OnFileChanging(c, Value, Files), false))) return false;

        c.ShowWindow(false);

        if (c.OnFileChanged) c.OnFileChanged(c, Value, Files);
        sendfiles();

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
        try {
          for (var i=0;i<Checked.length;i++)
          {
            if ((c.OnFileDeleting) && (!ngVal(c.OnFileDeleting(c, Checked[i], i), false))) continue;
            c.Controls.ListFiles.Remove(Checked[i]);
            if (c.OnFileDeleted) c.OnFileDeleted(c, Checked[i], i);
          }
        }
        finally {
          c.Controls.ListFiles.EndUpdate();
        }
        return true;
      }

      /*  Function: ClearFiles
       *  ...
       *
       *  Syntax:
       *    void *ClearFiles* ()
       *
       *  Returns:
       *    -
       */

      c.ClearFiles = function () {
        var list=c.Controls.ListFiles;

        list.BeginUpdate();
        try {
          for (var i=list.Items.length-1;i>=0;i--)
          {
            if ((c.OnFileDeleting) && (!ngVal(c.OnFileDeleting(c, list.Items[i], i), false))) continue;
            c.Controls.ListFiles.Remove(list.Items[i]);
            if (c.OnFileDeleted) c.OnFileDeleted(c, list.Items[i], i);
          }
        }
        finally {
          list.EndUpdate();
        }
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
        if (!uploadwin) IFrame = document.getElementById('IFRAME_FileUploader_'+c.FileUploaderID+'_1');
        else IFrame = document.getElementById('IFRAME_FileUploader_'+c.FileUploaderID+'_2');
        if (!IFrame) return false;

        //Get Document
        var Doc = (IFrame.contentDocument ? IFrame.contentDocument : IFrame.contentWindow.document);
        if (!Doc) return false;

        //Get Form
        var Form = Doc.getElementById('ngfup_Form_'+c.FileUploaderID);
        if (!Form)  //Create Form if necessary
        {
          var CurDate = new Date();
          var url=ng_AddURLParam(c.UploadURL,'id='+ng_URLEncode(c.ID)+'&fuid='+ng_URLEncode(c.FileUploaderID)+'&action=upload&ts='+CurDate.getTime()+'&lang='+ng_URLEncode(ngApp.Lang));

          Doc.open();
          Doc.write('<html><body><form id="ngfup_Form_'+c.FileUploaderID+'" enctype="multipart/form-data" action="'+url+'" method="POST">');
          Doc.write('<input name="ngfup_File[]" type="file" onchange="if (typeof(parent.ngfup_action)===\'function\') parent.ngfup_action(\''+c.ID+'\', \'ChangeFile\');" size="20" '+(c.MaxFilesCount==1 ?  '' : 'multiple="multiple" ')+(c.Accept!='' ? 'accept="'+c.Accept+'" ' : '')+'/>');
          Doc.write('</form></body></html>');
          Doc.close();

          Form = Doc.getElementById('ngfup_Form_'+c.FileUploaderID);
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

      var showformtime=0;
      c.ShowForm = function () {
        showformtime=new Date().getTime();
        if (!uploadwin)
        {
          var Form = c.GetForm();
          if (!Form) return false;

          var uploadinput=Form['ngfup_File[]'];

          if(uploadinput) {
            uploadinput.value=null;
            uploadinput.click();
            return true;
          }
        }
        c.ShowWindow();
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
        if(!c.Enabled) return false;
        var t=findtarget(e);
        if(t) {
          if(t.ondrop) {
            if(!ngVal(t.ondrop(c,t.elm),false)) return false;
          }
          else if(t.ondragleave) t.ondragleave(c,t.elm);
        }

        var files = e.target.files || e.dataTransfer.files;

        if(!checkfiles(files)) return false;

        var formData = new FormData();
        for (var i = 0; i < files.length; i++) {
          formData.append('ngfup_File[]', files[i]);
        }

        var rpc=c.GetRPC();
        if(rpc) {
          rpc.clearParams();
          rpc.SetParam('id',c.ID);
          rpc.SetParam('fuid',c.FileUploaderID);
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
        if(!c.Enabled) return false;
        var t=findtarget(e);
        if((t)&&(t.ondragover)) t.ondragover(c,t.elm);
        return false;
      }

      function filedragleave(e) {
	      stopevent(e);
        if(!c.Enabled) return false;
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
        if(c.InDesignMode) return false;

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
        if(c.InDesignMode) return;

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
      }

      c.GetRPC = function() {
        if(!c.file_rpc) {
          c.file_rpc=new ngRPC(c.ID+'RPC','',true);
          c.file_rpc.Type=rpcHttpRequestPOST;
          c.file_rpc.OnReceivedData=function(rpc, response, xmlhttp,reqinfo) {
            c.ShowWaiting(false); // hide waiting when request is finished
            return true;
          };
          c.file_rpc.OnHTTPRequestFailed = function(rpc,xmlhttp,reqinfo) {
            if(reqinfo.UploadFile) {
              c.ServerData({Error: 'ngfup_Error_General'});
            }
          };
          c.file_rpc.OnHTTPRequest=function (rpc,reqinfo) {
            if(c.file_rpc.Params['action']==='upload') {

              c.ShowWaiting(true);

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
       *    bool *UploadFile* (string filename, string content [, string contenttype='text/plain; charset=utf-8'])
       *
       *  Returns:
       *    TRUE if upload request was send.
       */
      c.UploadFile = function (filename, content, contenttype) {
        if((filename=='')||(/[<>|:/\?\"\\]/.test(filename))) {
          throw 'Invalid filename!';
        }
        contenttype=ngVal(contenttype,'text/plain; charset=utf-8');
        var ctype=contenttype;
        var p=ctype.indexOf(';');
        if(p>=0) ctype=ctype.substr(0,p);

        var curtime=new Date();
        if(!checkfiles([{name:filename, size: content.length, type: ctype, lastModified: curtime.getTime(), lastModifiedDate: curtime }])) return false;

        if ((c.OnFileAdding) && (!ngVal(c.OnFileAdding(c, filename), false))) return false;

        var rpc=c.GetRPC();
        if(rpc) {
          rpc.clearParams();
          rpc.SetParam('id',c.ID);
          rpc.SetParam('fuid',c.FileUploaderID);
          rpc.SetParam('action','upload');
          delete rpc.FileFormData;
          rpc.FileName = filename;
          rpc.FileContent = ngVal(content,'');
          rpc.FileContentType = contenttype;

          rpc.sendRequest(c.UploadURL);
          return true;
        }
        return false;
      }

      c.ShowError = function (errmsg, data) {
        if(errmsg!='') {
          if (c.OnError) c.OnError(c, errmsg, data);
          else alert(ng_htmlDecode(errmsg));
          return false;
        }
      }

      c.ShowWaiting = function(v) {
        v=ngVal(v,true);
        if(v!=c.Waiting) {
          c.Waiting=v;
          if (v) { if (c.OnShowWaiting) c.OnShowWaiting(c); }
          else   { if (c.OnHideWaiting) c.OnHideWaiting(c); }
        }
      }

      window['ngfup_AddDragBox'] = function(c,w,border) {
        var elm=c.Elm();
        if(typeof w === 'undefined') w=1;
        if(typeof border === 'undefined') border='dotted black';
        if(typeof c.Bounds.L !== 'undefined') {
          if(typeof c._dragboxMarginLeft === 'undefined') c._dragboxMarginLeft=elm.style.marginLeft;
          elm.style.marginLeft='-'+w+'px';
        }
        if(typeof c.Bounds.T !== 'undefined') {
          if(typeof c._dragboxMarginTop === 'undefined') c._dragboxMarginTop=elm.style.marginTop;
          elm.style.marginTop='-'+w+'px';
        }
        if(typeof c.Bounds.R !== 'undefined') {
          if(typeof c._dragboxMarginRight === 'undefined') c._dragboxMarginRight=elm.style.marginRight;
          elm.style.marginRight='-'+w+'px';
        }
        if(typeof c.Bounds.B !== 'undefined') {
          if(typeof c._dragboxMarginBottom === 'undefined') c._dragboxMarginBottom=elm.style.marginBottom;
          elm.style.marginBottom='-'+w+'px';
        }
        if(typeof c._dragboxBorder === 'undefined') c._dragboxBorder=elm.style.border;
        elm.style.border=w+'px '+border;
      };

      window['ngfup_RemoveDragBox'] = function(c) {
        var elm=c.Elm();
        if(typeof c._dragboxMarginLeft !== 'undefined') elm.style.marginLeft=c._dragboxMarginLeft;
        if(typeof c._dragboxMarginTop !== 'undefined') elm.style.marginTop=c._dragboxMarginTop;
        if(typeof c._dragboxMarginRight !== 'undefined') elm.style.marginRight=c._dragboxMarginRight;
        if(typeof c._dragboxMarginBottom !== 'undefined') elm.style.marginBottom=c._dragboxMarginBottom;
        elm.style.border=ngVal(c._dragboxBorder,'');
        delete c._dragboxMarginLeft;
        delete c._dragboxMarginTop;
        delete c._dragboxMarginRight;
        delete c._dragboxMarginBottom;
        delete c._dragboxBorder;
      };

      // ===== EVENTS =====

      /*
       *  Group: Events
       */
      /*
       *  Event: OnError
       */
      c.OnError = null;

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

      /*
       *  Event: OnShowWaiting
       */
      c.OnShowWaiting = null;
      /*
       *  Event: OnHideWaiting
       */
      c.OnHideWaiting = null;

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
  }
};

if (typeof(ngUserControls)==='undefined') ngUserControls = new Array();
ngUserControls['fileuploader'] = FileUploaderControl;
