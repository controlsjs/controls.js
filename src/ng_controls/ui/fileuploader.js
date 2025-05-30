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

var ngFupSelect_None      = 0;
var ngFupSelect_Select    = 1;
var ngFupSelect_CheckBox  = 2;
var ngFupSelect_CheckItem = 3;

var FileUploaderControl = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function() {

    window.ngfup_action = function(id, action, data){
      if((typeof(id)==='undefined') || (typeof(action)==='undefined')){return false;}
      data = ngVal(data, null);

      var c = ngGetControlById(id);
      if((c) && (c.CtrlInheritsFrom('ngFileUploader') || c.CtrlInheritsFrom('ngSysFileUploader'))){
        if(c[action]){c[action](data);}
        return true;
      }
      return false;
    };

    function ngfup_ServerData(data){
      if(typeof(data) === 'undefined'){return false;}

      this.ShowWaiting(false);

      this.Controls.ListFiles.BeginUpdate();
      try{
        if(ng_IsArrayVar(data)){
          var errorData = [];
          for(var f = 0; f < data.length; f++){
            var error = this.AddUploadedFile(data[f]);
            if(error){errorData.push(error);}
          }
          if(errorData.length > 0){
            this.ShowError(errorData);
            return false;
          }
        }
        else{
          var error = this.AddUploadedFile(data);
          if(error){
            this.ShowError(error);
            return false;
          }
        }
      }
      finally{
        this.Controls.ListFiles.EndUpdate();
      }

      if(this.Controls.BtnAddFile){
        this.Controls.BtnAddFile.SetEnabled(this.CheckMaxFiles(+1));
      }
      return true;
    }

    function ngfup_UploadFile(filename, content, contenttype){
      if((filename == '') || (/[<>|:/\?\"\\]/.test(filename))){
        throw 'Invalid filename!';
      }
      if(!window.FormData) return false;

      contenttype = ngVal(contenttype,'text/plain; charset=utf-8');
      var ctype = contenttype;
      var p = ctype.indexOf(';');
      if(p >= 0){ctype = ctype.substr(0,p);}

      var curtime = new Date();

      if(!this.CheckFiles([{
        name: filename,
        size: content.length,
        type: ctype,
        lastModified: curtime.getTime(),
        lastModifiedDate: curtime
      }])){return false;}

      if((this.OnFileAdding) && (!ngVal(this.OnFileAdding(this, filename), false))){
        return false;
      }

      var rpc = this.GetRPC();
      if(rpc){
        rpc.clearParams();
        delete rpc.FileFormData;
        rpc.FileName = filename;
        rpc.FileContent = ngVal(content,'');
        rpc.FileContentType = contenttype;

        var params = {
          id: this.ID,
          fuid: this.FileUploaderID,
          action: 'upload'
        };

        if(this.OnGetRequestParams){this.OnGetRequestParams(params);}
        for(var i in params){rpc.SetParam(i,params[i]);}

        rpc.sendRequest(this.UploadURL);
        return true;
      }
      return false;
    }

    function ngfup_AddUploadedFile(data){
      if((typeof data !== 'object') || (data === null)){return null;}

      if(data.Error){ return { Name: data.Name, Error: data.Error }; }
      if(!this.CheckMaxFiles()){return { Name: data.Name, Error: { Message: 'ngfup_Error_MaxFiles', Data: this.MaxFilesCount } };}

      this.DoAddUploadedFile(data);
      if(this.OnFileAdded){this.OnFileAdded(this, data.Name, data);}
      return null;
    }

    function ngfup_DoAddUploadedFile(data){
      if((typeof data !== 'object') || (data === null)){return;}

      this.Controls.ListFiles.Add({ Text: { File: data.Name }, Hash: data.Hash });
    }

    function ngfup_OnCreated(c){
      var elm = c.Elm();
      if(elm){
        var frameId = 'FileUploader_'+c.ID+'_IF';
        if(!document.getElementById(frameId)){
          ng_AppendInnerHTML(elm,
            '<iframe id="'+frameId+'" name="'+frameId+'"'
            + ' scrolling="no" frameborder="0" style="'
              + 'position:absolute;width:1px;height:1px;left:-1px;top:-1px;'
              + 'overflow:hidden;border:0px;'
            + '"></iframe>'
          );
        }
      }

      if((c.Controls.BtnAddFile)&&(c.Controls.ListFiles)){
        c.Controls.BtnAddFile.AddEvent(
          'OnSetEnabled',ngfup_OnSetAddBtnEnabled
        );
      }

      if((c.Controls.BtnRemoveFiles)&&(c.Controls.ListFiles)){
        c.Controls.BtnRemoveFiles.AddEvent(
          'OnSetEnabled',ngfup_OnSetRemoveBtnEnabled
        );
      }

      if(c.DropTarget){
        c.RegisterDropTarget(c,ngfup_OnDragOver,ngfup_OnDragLeave);
      }
    }

    function ngfup_OnSetAddBtnEnabled(o,v){
      if(!v){return true;}
      var uploader = this.ParentControl.ParentControl;
      return uploader.CheckMaxFiles(+1);
    }

    function ngfup_OnSetRemoveBtnEnabled(o,v){
      if(!v){return true;}
      var uploader = this.ParentControl.ParentControl;
      return uploader.HasFilesToRemove();
    }

    function ngfup_OnRemoveBtnClick(){
      this.ParentControl.ParentControl.RemoveFiles();
    }

    function ngfup_OnDragOver(c,o){
      var dp = c.Controls.DragAndDropPanel;
      if((dp) && (dp.OnFilesDragOver)){dp.OnFilesDragOver(dp,o);}
    }

    function ngfup_OnDragLeave(c,o){
      var dp = c.Controls.DragAndDropPanel;
      if((dp) && (dp.OnFilesDragLeave)){dp.OnFilesDragLeave(dp,o);}
    }

    function ngfup_GetForm(){
      return document.getElementById('FileUploader_'+this.ID+'_FO');
    }

    function ngfup_GetFiles(){
      return this.Controls.ListFiles.Items;
    };

    function ngfup_OnAddFileButtonUpdated(){
      var uploader = this.ParentControl.ParentControl;
      var form = uploader.GetForm();
      if(!form){
        var node = this.Elm();
        if(!node){return;}

        var useLabel = !((ngFireFox && (ngFireFoxVersion<22)) || (ngOpera && (ngOperaVersion<12)));
        var id = 'FileUploader_'+uploader.ID;

        ng_AppendInnerHTML(node,
          '<form id="'+id+'_FO" target="'+id+'_IF" action="" '
            + 'enctype="multipart/form-data" method="POST" style="'
            + 'position:absolute;left:0px;top:0px;width:100%;height:100%;margin:0px;padding:0px;'
            + 'opacity:0;-moz-opacity:0;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0);'
            + 'z-index:3'
          + '" >'
            + '<input id="'+id+'_FO_I" name="ngfup_File[]" type="file" size="20" '
              + 'onchange="ngfup_action(\''+uploader.ID+'\', \'ChangeFile\');" '
              + 'style="'
                + 'position:absolute;left:-100%;top:0px;width:200%;height:100%;margin:0px;padding:0px;'
                + 'font-size:10000px;cursor:pointer !important;z-index:4;'
              + '"/>'
            + (useLabel
              ? '<label for="'+id+'_FO_I" style="'
                  + 'position:absolute;left:0;top:0;width:100%;height:100%;margin:0px;padding:0px;'
                  + 'cursor:pointer !important;'
                + '"></label>'
              : ''
            )
          + '</form>'
        );

        form = uploader.GetForm();
      }
      if(form){
        form.style.display = (this.Enabled) ? 'block' : 'none';
        var input = form['ngfup_File[]'];
        if(input){
          var accept = '';
          if(
            (typeof uploader.Accept === 'string')
            && (uploader.Accept !== '')
          ){
            accept = uploader.Accept;
          }
          else if(
            ng_IsArrayVar(uploader.AllowedExtensions)
            && (uploader.AllowedExtensions.length > 0)
          ){
            accept = '.'+uploader.AllowedExtensions.join(',.');
          }
          input.accept = accept;
          input.multiple = !(uploader.MaxFilesCount == 1);
        }
      }
      return true;
    }

    function ngfup_ListOnUpdated(l){
      if(l.Owner.DragAndDropPanel && l.Owner.DragAndDropPanel.SetBounds(l.Bounds)){
        l.Owner.DragAndDropPanel.Update();
      }
    }

    function ngfup_ListOnAdd(l){
      if(l.Owner.DragAndDropPanel){
        l.Owner.DragAndDropPanel.SetVisible(false);
      }
      return true;
    }

    function ngfup_ListOnRemove(l){
      if((l.Items.length==1)&&(l.Owner.DragAndDropPanel)){
        l.Owner.DragAndDropPanel.SetVisible(true);
      }
      return true;
    }

    function ngfup_OnFilesDragOver(c){
      var cElm = c.Owner.Owner.Elm();
      if(!cElm){return;}

      var cn = cElm.className;
      if(cn.indexOf('_Drag')<0){cElm.className = cn+'_Drag';}
    }

    function ngfup_OnFilesDragLeave(c){
      var cElm = c.Owner.Owner.Elm();
      if(!cElm){return;}

      var cn = cElm.className;
      var idx = cn.indexOf('_Drag');
      if(idx >= 0){
        cElm.className = cn.substring(0,idx)+cn.substring(idx+5);
      }
    }

    function ngfup_OnButtonsUpdated(c,o){
      if(c.Owner.ListFiles){
        var h = ng_OuterHeight(o);
        var bounds = c.ParentControl.ButtonsAlign == 'top' ? {T:h} : {B:h};
        if(c.Owner.ListFiles.SetBounds(bounds)){
          c.Owner.ListFiles.Update();
        }
      }
    }

    function ngfup_Sendfiles(c){
      if(!c.Enabled){return false;}

      var Form = c.GetForm();
      if(!Form){return false;}

      var params = {
        id: c.ID,
        fuid: c.FileUploaderID,
        action: 'upload'
      };

      if(c.OnGetRequestParams){c.OnGetRequestParams(params);}

      if(!!window.FormData) {

        var rpc = c.GetRPC();
        if(rpc){
          rpc.clearParams();
          rpc.FileFormData = new FormData(Form);
          for(var i in params){rpc.SetParam(i,params[i]);}

          rpc.sendRequest(c.UploadURL);
          return true;
        }
      }

      var urlParams = 'ts='+(new Date().getTime())+'&lang='+ng_URLEncode(ngApp.Lang);
      for(var i in params){
        urlParams += '&'+ng_URLEncode(i)+'='+ng_URLEncode(params[i]);
      }
      Form.action = ng_AddURLParam(c.UploadURL,urlParams);

      c.ShowWaiting(true);
      c.SetUploadProgress();
      Form.submit();
      return true;
    }

    function ngfup_GetRPC(){
      if(!this.file_rpc){
        var rpc = new ngRPC(this.ID+'RPC','',true);
        rpc.Type = rpcHttpRequestPOST;
        rpc.Owner = this;
        rpc.AddEvent('OnReceivedData', ngfup_RPC_OnReceivedData);
        rpc.AddEvent('OnHTTPRequestFailed', ngfup_RPC_OnHTTPRequestFailed);
        rpc.AddEvent('OnHTTPRequest', ngfup_RPC_OnHTTPRequest);
        this.file_rpc = rpc;
      }
      return this.file_rpc;
    }

    function ngfup_RPC_OnReceivedData(rpc, response, xmlhttp,reqinfo){
      rpc.Owner.ShowWaiting(false); // hide waiting when request is finished
      return true;
    }

    function ngfup_RPC_OnHTTPRequestFailed(rpc,xmlhttp,reqinfo){
      if(reqinfo.UploadFile){
        rpc.Owner.ServerData({Error: 'ngfup_Error_General'});
      }
    }

    function ngfup_RPC_OnHTTPRequest(rpc,reqinfo){
      if(rpc.Owner.file_rpc.Params['action'] === 'upload'){
        rpc.Owner.ShowWaiting(true);

        if("upload" in reqinfo.XMLHttp){
          rpc.Owner.SetUploadProgress(0);

          reqinfo.XMLHttp.onload = function(){
            rpc.Owner.SetUploadProgress(100);
          };

          reqinfo.XMLHttp.upload.onprogress = function(event){
            if(event.lengthComputable){
              rpc.Owner.SetUploadProgress(event.loaded / event.total * 100 | 0);
            }
          };
        }
        else{
          rpc.Owner.SetUploadProgress();
        }

        if(typeof rpc.FileFormData !== 'undefined'){
          delete reqinfo.ReqHeaders["Content-type"];
          delete reqinfo.ReqHeaders["Content-length"];
          reqinfo.PostParams = rpc.FileFormData;
        }
        else{
          var boundary = Math.random().toString().substr(2);
          reqinfo.ReqHeaders["Content-type"]="multipart/form-data; charset=utf-8; boundary=" + boundary;

          var multipart = "--" + boundary
            + "\r\nContent-Disposition: form-data; name=\"ngfup_File[]\"; filename=\""+rpc.FileName+"\""
            + "\r\nContent-type: " + ngVal(rpc.FileContentType,'text/plain; charset=utf-8')
            + "\r\n\r\n" + rpc.FileContent + "\r\n"
            + "--"+boundary+"--\r\n";

          reqinfo.ReqHeaders["Content-length"] = multipart.length;
          reqinfo.PostParams = multipart;
        }
        reqinfo.UploadFile = true;

        // Move params to URL (were in PostParams which was replaced)
        var params = rpc.GetURLParams();
        if(params != ''){reqinfo.URL = ng_AddURLParam(reqinfo.URL, params);}
      }
      return true;
    }

    function ngfup_Extension(fileName){
      var i = fileName.lastIndexOf('.');
      return (i < 0) ? '' : fileName.substr(i+1);
    }

    function ngfup_CheckFiles(files) {
      if(!this.CheckMaxFiles(files.length)){
        this.ShowError({ Error: { Message: 'ngfup_Error_MaxFiles', Data: this.MaxFilesCount } });
        return false;
      }

      var maxbatchsize = parseInt(ngVal(this.MaxBatchSize,0));
      var maxsize = parseInt(ngVal(this.MaxFileSize,0));
      var batchsize = 0;
      var checkext = (!ng_EmptyVar(this.AllowedExtensions));
      if((checkext) || (maxsize>0)){
        var errorData = [];
        var s,e,found,f;
        for(var i = 0; i < files.length; i++){
          f=files[i];
          if((checkext)&&(typeof f.name!=='undefined')) {
            e = ngfup_Extension(''+f.name).toLowerCase();
            found = false;
            if(e != ''){
              for(var j in this.AllowedExtensions){
                if(this.AllowedExtensions[j].toLowerCase() === e){
                  found = true;
                  break;
                }
              }
            }
            if(!found){
              errorData.push({ Name: f.name, Error: { Message: 'ngfup_Error_Extension', Data: this.AllowedExtensions.join(', ') } });
              continue;
            }
          }
          if(typeof f.size !== 'undefined'){
            s = parseInt(f.size,10);
            if(batchsize >= 0){batchsize += s;}
            if((maxsize > 0) && (s > maxsize)){
              errorData.push({ Name: f.name, Error: { Message: 'ngfup_Error_Size', Data: this.MaxFileSize } });
              continue;
            }
          }
          else batchsize = -1;
        }
        if(errorData.length > 0){
          this.ShowError(errorData);
          return false;
        }
        if((batchsize > 0) && (maxbatchsize > 0) && (batchsize > maxbatchsize)){
          this.ShowError({ Error: { Message: 'ngfup_Error_MaxBatch', Data: this.MaxBatchSize } });
          return false;
        }
      }
      return true;
    }

    function ngfup_CheckMaxFiles(correction){
      correction = ngVal(correction,0);
      var maxfiles = ngVal(this.MaxFilesCount,-1);
      var curfiles = (this.Controls.ListFiles) ? this.Controls.ListFiles.Items.length : 0;
      return !((maxfiles >= 0) && (curfiles+correction > maxfiles));
    }

    function ngfup_HasFilesToRemove(){
      var list = this.Controls.ListFiles;
      switch(this.SelectFileType){
        case ngFupSelect_Select:
          var selected = (list) ? list.GetSelected() : [];
          return (selected.length > 0);
        break;
        case ngFupSelect_CheckBox:
        case ngFupSelect_CheckItem:
          return (list && list.HasChecked());
        break;
      }
      return false;
    }

    function ngfup_GetFilesToRemove(){
      var list = this.Controls.ListFiles;
      switch(this.SelectFileType){
        case ngFupSelect_Select:
          return (list) ? list.GetSelected() : [];
        break;
        case ngFupSelect_CheckBox:
        case ngFupSelect_CheckItem:
          return (list) ? list.GetChecked() : [];
        break;
      }
      return null;
    }

    function ngfup_RemoveFiles(){
      var items = this.GetFilesToRemove();
      if(!ng_IsArrayVar(items) || (items.length < 1)){return false;}

      this.Controls.ListFiles.BeginUpdate();
      try{
        for(var i = 0; i < items.length; i++){
          if(this.OnFileDeleting && (!ngVal(this.OnFileDeleting(this, items[i], i), false))){
            continue;
          }
          this.Controls.ListFiles.Remove(items[i]);
          if(this.OnFileDeleted){this.OnFileDeleted(this, items[i], i);}
        }
      }
      finally{
        this.Controls.ListFiles.EndUpdate();
      }

      if(this.Controls.BtnAddFile){
        this.Controls.BtnAddFile.SetEnabled(this.CheckMaxFiles(+1));
      }
      return true;
    }

    function ngfup_ClearFiles(){
      var list = this.Controls.ListFiles;

      list.BeginUpdate();
      try{
        for(var i = list.Items.length-1; i >= 0; i--){
          if(this.OnFileDeleting && (!ngVal(this.OnFileDeleting(this, list.Items[i], i), false))){
            continue;
          }
          this.Controls.ListFiles.Remove(list.Items[i]);
          if(this.OnFileDeleted){this.OnFileDeleted(this, list.Items[i], i);}
        }
      }
      finally{
        list.EndUpdate();
      }

      if(this.Controls.BtnAddFile){
        this.Controls.BtnAddFile.SetEnabled(this.CheckMaxFiles(+1));
      }
    }

    function ngfup_UploadFiles(files){
      if(!files) return false;
      if((!window.FormData)||(!('File' in window))) return false;
      var rpc = this.GetRPC();
      if(!rpc) return false;

      if((!ng_IsObjVar(files))||(typeof files.length==='undefined')) {
        var arr=[];
        arr.push(files);
        files=arr;
      }

      var hasfilehandles=('FileSystemHandle' in window);

      function canupload(f) {
        if(!f) return false;
        return (f instanceof File)||(f instanceof Blob)||((hasfilehandles)&&(f instanceof FileSystemHandle));
      }

      var f,upload=[];
      for(var i = 0; i < files.length; i++) {
        f=files[i];
        if(!canupload(f)) {
          if((ng_IsObjVar(f))&&(canupload(f.File))) f=f.File;
          else f=null;
        }
        if(f) upload.push(f);
      }
      if(!upload.length) return false;
      if(!this.CheckFiles(upload)) return false;

      var formData = new FormData();
      var self=this;
      var numfiles=0;

      function addfile(f) {
        if((hasfilehandles)&&(f instanceof FileSystemHandle)) {
          f.getFile().then(addfile)['catch'](function(e) {
            addfile(null);
          });
          return;
        }
        if(f) { formData.append('ngfup_File[]', f); numfiles++; }

        if(!upload.length) {
          if(!numfiles) return;

          rpc.clearParams();
          rpc.FileFormData = formData;

          var params = {
            id: self.ID,
            fuid: self.FileUploaderID,
            action: 'upload'
          };

          if(self.OnGetRequestParams){self.OnGetRequestParams(params);}
          for(var i in params){rpc.SetParam(i,params[i]);}

          rpc.sendRequest(self.UploadURL);
          return;
        }
        addfile(upload.shift());
      }
      addfile(upload.shift());
      return true;
    }

    function ngfup_ChangeFile(){
      var Form = this.GetForm();
      if(!Form){return false;}

      var Value = '';
      var input=Form['ngfup_File[]'];
      var Files = [];
      if('files' in input){
        if(!input.files.length || !this.CheckFiles(input.files)){
          Form.reset();
          return false;
        }

        for(var i = 0;i < input.files.length; i++){
          if(this.OnFileAdding && (!ngVal(this.OnFileAdding(this, input.files[i].name), false))){
            Form.reset();
            return false;
          }

          if(Value != ''){Value += ', ';}
          Value += input.files[i].name;
          Files.push(input.files[i].name);
        }
      }
      else{
        Value = input.value;
        Value = Value.substring(Value.lastIndexOf('\\')+1, Value.length);  //Remove "fake" path (C:\fakepath\)
        if(Value != ''){Files.push(Value);}

        if(this.OnFileAdding && (!ngVal(this.OnFileAdding(this, input.value), false))){
          Form.reset();
          return false;
        }
      }

      if(this.OnFileChanging && (!ngVal(this.OnFileChanging(this, Value, Files), false))){
        Form.reset();
        return false;
      }

      if(this.OnFileChanged){this.OnFileChanged(this, Value, Files);}
      ngfup_Sendfiles(this);

      Form.reset();
      return true;
    };

    function ngfup_RegisterDropTarget(t,ondragover,ondragleave,ondrop){
      if(this.InDesignMode){return false;}

      var o = null;
      if(typeof t === 'string'){
        o = document.getElementByID(t);
      }
      else{
        if(typeof t.Elm === 'function'){o = t.Elm(); t = t.ID;}
        else if(typeof t.id !== 'undefined'){o = t; t = t.id;}
      }

      if(o && (t != '') && (('draggable' in o) && (!!window.FormData))){
        if(!this._drop_targets){this._drop_targets = {};}
        var c = this;
        var target = {
          elm: o,
          ondrop: ondrop,
          ondragover: ondragover,
          ondragleave: ondragleave,
          dropevent: function(e){ngfup_FileDrop(c,e);},
          dragoverevent: function(e){ngfup_FileDragOver(c,e);},
          dragleaveevent: function(e){ngfup_FileDragLeave(c,e);}
        };
        this._drop_targets[t] = target;

        ngfup_AddDropListener(o, "drop", target.dropevent);
        ngfup_AddDropListener(o, "dragover", target.dragoverevent);
        ngfup_AddDropListener(o, "dragleave", target.dragleaveevent);
        return true;
      }
      return false;
    };

    function ngfup_UnregisterDropTarget(t){
      if(this.InDesignMode){return;}

      var o = null;
      if(typeof t!=='string'){
        if(typeof t.Elm === 'function') t = t.ID;
        else if(typeof t.id !== 'undefined') t = t.id;
      }
      if((t!=='') && (this._drop_targets) && (this._drop_targets[t])){
        o = this._drop_targets[t];
      }

      if(o) {
        if(o.dropevent)      ngfup_RemoveDropListener(o.elm, "drop", o.dropevent);
        if(o.dragoverevent)  ngfup_RemoveDropListener(o.elm, "dragover", o.dragoverevent);
        if(o.dragleaveevent) ngfup_RemoveDropListener(o.elm, "dragleave", o.dragleaveevent);
        delete this._drop_targets[t];
      }
    }

    function ngfup_IsDropTarget(t){
      if(typeof t !== 'string'){
        if(typeof t.Elm === 'function'){t = t.ID;}
        else if(typeof t.id !== 'undefined'){t = t.id;}
      }
      return (t!=='') && !!this._drop_targets[t];
    }

    function ngfup_FindTarget(c,e){
      var t = e.target || e.srcElement || e.originalTarget;
      while(t && (t != document)){
        if((t.id !== '') && (typeof c._drop_targets[t.id]!=='undefined')){
          return c._drop_targets[t.id];
          break;
        }
        t = t.parentNode;
      }
      return null;
    }

    function ngfup_SetUploadProgress(p){
      if(this.OnUploadProgress){this.OnUploadProgress(this,p);}
    }

    function ngfup_FormatBytes(bytes) {
      if (bytes<=0) return '-';
      var units = ['B', 'kB', 'MB', 'GB', 'TB'];
      var i = parseInt(Math.log(bytes) / Math.log(1024));
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + units[i];
    }

    function ngfup_ErrorToMessage(data){
      var errmsg = '';
      if(!data || !data.Error){return errmsg;}
      if(ngVal(data.Name,'') != ''){errmsg += data.Name+': ';}
      var err=data.Error;
      if(typeof err === 'object') {
        if(!ng_EmptyVar(err.Data)) {
          switch(err.Message) {
            case 'ngfup_Error_Size':
              return errmsg + ng_sprintf(ngTxt('ngfup_Error_Size_Num'),ngfup_FormatBytes(err.Data));
            case 'ngfup_Error_Extension':
              return errmsg + ng_sprintf(ngTxt('ngfup_Error_Extension_Info'),err.Data);
            case 'ngfup_Error_MaxFiles':
              return errmsg + ng_sprintf(ngTxt('ngfup_Error_MaxFiles_Num'),err.Data);
            case 'ngfup_Error_MaxBatch':
              return errmsg + ng_sprintf(ngTxt('ngfup_Error_MaxBatch_Num'),ngfup_FormatBytes(err.Data));
          }
        }
        err=err.Message;
      }
      errmsg += ngTxt(err);
      return errmsg;
    }

    function ngfup_ShowError(data){
      var errmsg = '';

      if(ng_IsArrayVar(data)){
        var exterr,err;

        for(var i in data){
          err=data[i];
          if((err)&&(typeof err.Error === 'object')&&(err.Error)&&(err.Error.Message==='ngfup_Error_Extension')) {
            exterr=err.Error.Data;
            delete err.Error.Data;
          }
          var msg = this.ErrorToMessage(err);
          if(msg != ''){errmsg += (errmsg == '') ? msg : "\n"+msg;}
        }

        if(!ng_EmptyVar(exterr)) {
          if(errmsg != '') errmsg+="\n\n";
          errmsg+=ng_sprintf(ngTxt('ngfup_Error_AllowedExtensions'),exterr);
        }
      }
      else{
        errmsg += this.ErrorToMessage(data);
      }

      if(errmsg != ''){
        if(this.OnError){
          return this.OnError(this, errmsg, data);
        }
        else{
          alert(ng_htmlDecode(errmsg));
          return true;
        }
      }
      return false;
    }

    function ngfup_ShowWaiting(show){
      show = ngVal(show,true);
      if(show != this.Waiting){
        this.Waiting = show;
        if(show){
          if(this.OnShowWaiting){this.OnShowWaiting(this);}
        }
        else{
          if(this.OnHideWaiting){this.OnHideWaiting(this);}
        }
      }
    }

    function ngfup_DoDispose(){
      var delid = [];
      if(this._drop_targets){
        for(var i in this._drop_targets){delid.push(i);}
      }

      for(var i = 0; i < delid.length; i++){
        this.UnregisterDropTarget(delid[i]);
      }
      return true;
    }

    function ngfup_StopEvent(e){
      if(!e){e = window.event;}
      if(e.stopPropagation){e.stopPropagation();}
      else{e.cancelBubble = true;}
      if(e.preventDefault){e.preventDefault();}
      else{e.returnValue = false;}
    }

    function ngfup_AddDropListener(o,e,f){
      if(o.addEventListener){o.addEventListener(e,f,false);}
      else if(o.attachEvent){o.attachEvent(e,f);}
    }
    function ngfup_RemoveDropListener(o,e,f){
      if(o.removeEventListener){o.removeEventListener(e,f,false);}
      else if(o.detachEvent){o.detachEvent(e,f);}
    }

    function ngfup_FileDrop(c,e){
      ngfup_StopEvent(e);
      if(!c.Enabled){return false;}
      var t = ngfup_FindTarget(c,e);
      if(t){
        if(t.ondrop){
          if(!ngVal(t.ondrop(c,t.elm),false)){return false;}
        }
        else if(t.ondragleave){
          t.ondragleave(c,t.elm);
        }
      }
      c.UploadFiles(e.target.files || e.dataTransfer.files);
      return false;
    }

    function ngfup_FileDragOver(c,e){
      ngfup_StopEvent(e);
      if(!c.Enabled){return false;}
      var t = ngfup_FindTarget(c,e);
      if(t && t.ondragover){t.ondragover(c,t.elm);}
      return false;
    }

    function ngfup_FileDragLeave(c,e){
      ngfup_StopEvent(e);
      if(!c.Enabled){return false;}
      var t = ngfup_FindTarget(c,e);
      if(t && t.ondragleave){t.ondragleave(c,t.elm);}
      return false;
    }

    function ngfup_OnGetDragAndDropText(){
      return ngTxt(
        (this.ParentControl.ParentControl.MaxFilesCount == 1)
          ? 'ngfup_DragAndDropOne' : 'ngfup_DragAndDropMore'
      );
    }

    function ngfup_ListOnClickItem(event){
      if(!event){return;}
      var uploader = this.ParentControl;
      if(
        (uploader.SelectFileType == ngFupSelect_CheckItem)
        && (event.listPart == 0)
      ){
        var item = event.listItem;
        this.CheckItem(item, !ngVal(item.Checked, false));
      }
    }

    function ngfup_ListOnCheckChanged(){
      var button = this.Owner.BtnRemoveFiles;
      if(button){
        var selectType = this.ParentControl.SelectFileType;
        if((selectType == ngFupSelect_CheckItem) || (selectType == ngFupSelect_CheckBox)){
          button.SetEnabled(this.HasChecked());
        }
      }
    }

    function ngfup_ListOnSelectChanged(){
      var button = this.Owner.BtnRemoveFiles;
      if(button){
        var selectType = this.ParentControl.SelectFileType;
        if(selectType == ngFupSelect_Select){
          var selected = this.GetSelected();
          button.SetEnabled(selected.length > 0);
        }
      }
    }

    function ngfup_LoadSettings(id, data)
    {
      if(typeof data.MaxFilesCount === 'undefined') {
        var max=parseInt(ngVal(ngApp.StartParams['ngFileUploader.'+id+'.MaxFilesCount'], 0),10);
        if(max>0) data.MaxFilesCount=max;
      }

      if(typeof data.MaxFileSize === 'undefined') {
        var max=parseInt(ngVal(ngApp.StartParams['ngFileUploader.'+id+'.MaxFileSize'], 0),10);
        if(max>0) data.MaxFileSize=max;
      }

      if(typeof data.MaxBatchSize === 'undefined') {
        var max=parseInt(ngVal(ngApp.StartParams['ngFileUploader.'+id+'.MaxBatchSize'], 0),10);
        if(max>0) data.MaxBatchSize=max;
      }

      if(typeof data.AllowedExtensions === 'undefined') {
        var allowedext=ngVal(ngApp.StartParams['ngFileUploader.'+id+'.AllowedExtensions'], '');
        if(allowedext!='') data.AllowedExtensions=allowedext;
      }
    }

    /*  Class: ngFileUploader
     *  Standard control for uploading files.
     */
    function Create_ngFileUploader(def, ref, parent)
    {
      if (typeof(def.Data)==='undefined') def.Data = {};
      if (typeof def.FileUploaderID !== 'undefined') def.Data.FileUploaderID=def.FileUploaderID;

      var buttonsalign='top';
      var base = ngVal(def.Base, 'ngFrame');
      var id = ngVal(def.Data.FileUploaderID, 'Main');
      var selectFileType = ngVal(def.SelectFileType, ngFupSelect_CheckItem);
      selectFileType = ngVal(def.Data.SelectFileType, selectFileType);

      ng_MergeDef(def, {
        ParentReferences: false,
        ListFiles: true,
        Data: {
          FileUploaderID: id,
          UploadURL: ngLibPath('ng_controls')+'ui/fileuploader.php',
          DropTarget: void 0,
          MaxFilesCount: void 0,
          MaxFileSize: void 0,
          MaxBatchSize: void 0,
          AllowedExtensions: void 0,
          SelectFileType: selectFileType
        },
        Controls: {
          ListFiles: {
            Type: 'ngList',
            L: 0, T: 0, B: 0, R: 0,
            Data: {
              SelectType: (selectFileType == ngFupSelect_Select) ? nglSelectMulti : nglSelectNone ,
              ShowCheckboxes: !!((selectFileType == ngFupSelect_CheckBox) || (selectFileType == ngFupSelect_CheckItem)),
              ShowHeader: false,
              Columns: new Array(
                new ngListCol('File', ngTxt('ngfup_ColFile'))
              )
            },
            Events: {
              OnUpdated: ngfup_ListOnUpdated,
              OnAdd: ngfup_ListOnAdd,
              OnRemove: ngfup_ListOnRemove,
              OnClickItem: ngfup_ListOnClickItem,
              OnCheckChanged: ngfup_ListOnCheckChanged,
              OnSelectChanged: ngfup_ListOnSelectChanged
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
                  TextAlign: 'center'
                },
                Events: {
                  OnGetText: ngfup_OnGetDragAndDropText
                }
              }
            },
            Events: {
              OnFilesDragOver: ngfup_OnFilesDragOver,
              OnFilesDragLeave: ngfup_OnFilesDragLeave
            }
          },
          Buttons: {
            Type: 'ngToolBar',
            L: 0, B: 0, R: 0,
            Events: {
              OnUpdated: ngfup_OnButtonsUpdated
            },
            Controls: {
              BtnAddFile: {
                Type: 'ngButton',
                Data: {
                  ngText: 'ngfup_AddFile'
                },
                Events: {
                  OnUpdated: ngfup_OnAddFileButtonUpdated
                }
              },
              BtnRemoveFiles: {
                Type: 'ngButton',
                Data: {
                  ngText: 'ngfup_RemoveFiles',
                  Enabled: false
                },
                Events: {
                  OnClick: ngfup_OnRemoveBtnClick
                }
              }
            }
          }
        }
      });

      def.Data.DropTarget = !!ngVal(def.DropTarget, !(ngAndroid || ngiOS || ngWindowsPhone));

      ngfup_LoadSettings(id, def.Data);

      if(def.Controls) {
        if(!def.ListFiles) {
          if(def.Controls.Buttons) {
            if(def.Controls.Buttons.Controls.BtnRemoveFiles){
              ng_MergeVar(def.Controls.Buttons.Controls.BtnRemoveFiles,
                { Data: { Visible: false } }
              );
            }
          }
          if(def.Controls.ListFiles){
            ng_MergeVar(def.Controls.ListFiles,
              { Data: { Visible: false } }
            );
          }
          if(def.Controls.DragAndDropPanel){
            ng_MergeVar(def.Controls.DragAndDropPanel,
              { Data: { Visible: false } }
            );
          }
        }

        if((!def.Data.DropTarget)||(!window.FormData)||(!('draggable' in document.createElement('span'))))
          delete def.Controls.DragAndDropPanel;
      }

      if(typeof def.ButtonsAlign!=='undefined') buttonsalign=def.ButtonsAlign;
      if(typeof def.Data.ButtonsAlign!=='undefined') buttonsalign=def.Data.ButtonsAlign;

      if((buttonsalign=='top') && def.Controls.Buttons) {
        delete def.Controls.Buttons.B;
        if(def.Controls.Buttons.T==='undefined') def.Controls.Buttons.T=0;
      }

      def.OnCreated = ngAddEvent(def.OnCreated,ngfup_OnCreated);

      var c = ngCreateControlAsType(def, base, ref, parent);
      if(!c){return c;}

      c.ButtonsAlign = buttonsalign;

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
      c.ServerData = ngfup_ServerData;

      /*  Function: AddUploadedFile
       *  ...
       *
       *  Syntax:
       *    bool *AddUploadedFile* (object data)
       *
       *  Parameters:
       *    data - ...
       *
       *  Returns:
       *    -
       */
      c.AddUploadedFile = ngfup_AddUploadedFile;

      /*  Function: DoAddUploadedFile
       *  ...
       *
       *  Syntax:
       *    void *DoAddUploadedFile* (object data)
       *
       *  Parameters:
       *    data - ...
       *
       *  Returns:
       *    -
       */
      c.DoAddUploadedFile = ngfup_DoAddUploadedFile;


      /*  Function: ChangeFile
       *  ...
       *
       *  Syntax:
       *    bool *ChangeFile* ()
       *
       *  Returns:
       *    -
       */
      c.ChangeFile = ngfup_ChangeFile;

      /*  Function: CheckFiles
       *  ...
       *
       *  Syntax:
       *    bool *CheckFiles* ()
       *
       *  Returns:
       *    -
       */
      c.CheckFiles = ngfup_CheckFiles;

      /*  Function: CheckMaxFiles
       *  ...
       *
       *  Syntax:
       *    bool *CheckMaxFiles* ()
       *
       *  Returns:
       *    -
       */
      c.CheckMaxFiles = ngfup_CheckMaxFiles;

      /*  Function: RemoveFiles
       *  ...
       *
       *  Syntax:
       *    bool *RemoveFiles* ()
       *
       *  Returns:
       *    -
       */
      c.RemoveFiles = ngfup_RemoveFiles;

      /*  Function: ClearFiles
       *  ...
       *
       *  Syntax:
       *    void *ClearFiles* ()
       *
       *  Returns:
       *    -
       */
      c.ClearFiles = ngfup_ClearFiles;

      /*  Function: UploadFiles
       *  ...
       *
       *  Syntax:
       *    void *UploadFiles* (array files)
       *
       *  Returns:
       *    -
       */
      c.UploadFiles = ngfup_UploadFiles;

      /*  Function: GetForm
       *  ...
       *
       *  Syntax:
       *    object *GetForm* ()
       *
       *  Returns:
       *    -
       */
      c.GetForm = ngfup_GetForm;

      /*  Function: GetFiles
       *  ...
       *
       *  Syntax:
       *    array *GetFiles* ()
       *
       *  Returns:
       *    -
       */
      c.GetFiles = ngfup_GetFiles;

      /*  Function: RegisterDropTarget
       *  ...
       *
       *  Syntax:
       *    bool *RegisterDropTarget* (mixed target [, callback ondragover, callback ondragleave, callback ondrop])
       *
       *  Returns:
       *    TRUE if drop target was registered.
       */
      c.RegisterDropTarget = ngfup_RegisterDropTarget;

      /*  Function: UnregisterDropTarget
       *  ...
       *
       *  Syntax:
       *    void *UnregisterDropTarget* (mixed target)
       *
       *  Returns:
       *    -
       */
      c.UnregisterDropTarget = ngfup_UnregisterDropTarget;

      /*  Function: IsDropTarget
       *  ...
       *
       *  Syntax:
       *    bool *IsDropTarget* (mixed target)
       *
       *  Returns:
       *    TRUE if target is a registered file uploader drop target.
       */
      c.IsDropTarget = ngfup_IsDropTarget;

      /*  Function: SetUploadProgress
       *  ...
       *
       *  Syntax:
       *    void *SetUploadProgress* (integer progress)
       *
       *  Returns:
       *    -
       */
      c.SetUploadProgress = ngfup_SetUploadProgress;

      /*  Function: GetRPC
       *  ...
       *
       *  Syntax:
       *    ngRPC *GetRPC* ()
       *
       *  Returns:
       *    -
       */
      c.GetRPC = ngfup_GetRPC;

      /*  Function: UploadFile
       *  ...
       *
       *  Syntax:
       *    bool *UploadFile* (string filename, string content [, string contenttype='text/plain; charset=utf-8'])
       *
       *  Returns:
       *    TRUE if upload request was send.
       */
      c.UploadFile = ngfup_UploadFile;

      /*  Function: ShowError
       *  ...
       *
       *  Syntax:
       *    void *ShowError* (mixed data)
       *
       *  Returns:
       *    -
       */
      c.ShowError = ngfup_ShowError;

      /*  Function: ErrorToMessage
       *  ...
       *
       *  Syntax:
       *    void *ErrorToMessage* (object data)
       *
       *  Returns:
       *    -
       */
      c.ErrorToMessage = ngfup_ErrorToMessage;

      /*  Function: ShowWaiting
       *  ...
       *
       *  Syntax:
       *    void *ShowWaiting* (boolean show)
       *
       *  Returns:
       *    -
       */
      c.ShowWaiting = ngfup_ShowWaiting;

      /*  Function: HasFilesToRemove
       *  ...
       *
       *  Syntax:
       *    bool *HasFilesToRemove* ()
       *
       *  Returns:
       *    -
       */
      c.HasFilesToRemove = ngfup_HasFilesToRemove;

      /*  Function: GetFilesToRemove
       *  ...
       *
       *  Syntax:
       *    array *GetFilesToRemove* ()
       *
       *  Returns:
       *    -
       */
      c.GetFilesToRemove = ngfup_GetFilesToRemove;

      c.AddEvent('DoDispose',ngfup_DoDispose);

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

      /*
       *  Event: OnGetRequestParams
       */
      c.OnGetRequestParams = null;

      return c;
    }
    ngRegisterControlType('ngFileUploader', Create_ngFileUploader);

    function fup_ResetSettings(){
      this.MaxFilesCount=void 0;
      this.MaxFileSize=void 0;
      this.MaxBatchSize=void 0;
      this.AllowedExtensions=void 0;
    }

    function fup_LoadSettings(reset){
      if(reset) this.ResetSettings();
      ngfup_LoadSettings(ngVal(this.FileUploaderID,'Main'), this);
    }

    function fup_CheckMaxFiles(numfiles){
      var maxfiles = ngVal(this.MaxFilesCount,-1);
      return !((maxfiles >= 0) && (numfiles > maxfiles));
    }

    function fup_AddUploadedFile(data){
      if((typeof data !== 'object') || (data === null)){return null;}
      if(data.Error){ return { Name: data.Name, Error: data.Error }; }

      this.DoAddUploadedFile(data);
      if(this.OnFileAdded){this.OnFileAdded(this, data.Name, data);}
      return null;
    }

    function fup_DoAddUploadedFile(data){
    }

    function fup_ServerData(data) {
      if(typeof(data) === 'undefined'){return false;}
      this.ShowWaiting(false);

      if(ng_IsArrayVar(data)){
        var errorData = [];
        for(var f = 0; f < data.length; f++){
          var error = this.AddUploadedFile(data[f]);
          if(error){errorData.push(error);}
        }
        if(errorData.length > 0){
          this.ShowError(errorData);
          return false;
        }
      }
      else{
        var error = this.AddUploadedFile(data);
        if(error){
          this.ShowError(error);
          return false;
        }
      }
      return true;
    }

    /**
     *  Class: ngFileUploader
     *  This class implements file uploader object.
     *
     *  Syntax:
     *    new *ngFileUploader* ()
     */
    window.ngFileUploader = function(id) {
      id = ngVal(id, 'Main');
      this.FileUploaderID=id;
      this.UploadURL=ngLibPath('ng_controls')+'ui/fileuploader.php';
      this.MaxFilesCount=void 0;
      this.MaxFileSize=void 0;
      this.MaxBatchSize=void 0;
      this.AllowedExtensions=void 0;

      this.GetRPC = ngfup_GetRPC;

      this.UploadFiles = ngfup_UploadFiles;
      this.UploadFile = ngfup_UploadFile;

      this.CheckMaxFiles = fup_CheckMaxFiles;
      this.CheckFiles = ngfup_CheckFiles;
      this.SetUploadProgress = ngfup_SetUploadProgress;
      this.ShowWaiting = ngfup_ShowWaiting;
      this.ShowError = ngfup_ShowError;
      this.ErrorToMessage = ngfup_ErrorToMessage;

      this.ResetSettings = fup_ResetSettings;
      this.LoadSettings = fup_LoadSettings;

      this.ServerData = fup_ServerData;
      this.AddUploadedFile = fup_AddUploadedFile;
      this.DoAddUploadedFile = fup_DoAddUploadedFile;

      this.OnFileAdding = null;
      this.OnFileAdded = null;
      this.OnGetRequestParams = null;
      this.OnError = null;

      this.OnShowWaiting = null;
      this.OnHideWaiting = null;
      this.OnUploadProgress = null;
    };

    function ngsysfup_DoCreate(def,ref) {
      if (typeof def.FileUploaderID !== 'undefined') this.FileUploaderID=def.FileUploaderID;
      var id = ngVal(this.FileUploaderID, 'Main');
      ngfup_LoadSettings(id, this);
    }

    function ngsysfup_UploadFile() {
      return this.Enabled ? ng_CallParent(this,'UploadFile',arguments,false) : false;
    }

    function ngsysfup_UploadFiles() {
      return this.Enabled ? ng_CallParent(this,'UploadFiles',arguments,false) : false;
    }

    function ngsysfup_DoDispose()
    {
      if(this.file_rpc) {
        if(ngVal(this.file_rpc.id,'')!='') delete ngRPCByID[this.file_rpc.id];
      }
      return true;
    }

    /**
     *  Class: ngSysFileUploader
     *  This class implements ngSysFileUploader non-visual control.
     *
     *  Syntax:
     *    new *ngSysFileUploader* ([string id])
     *
     *  Parameters:
     *    id - control ID
     *
     *  See also:
     *    Abstract class <ngSysControl> class.
     */
    window.ngSysFileUploader = function(id)
    {
      ngSysControl(this, id, 'ngSysFileUploader');
      ngFileUploader.apply(this);
      this.DoCreate = ngsysfup_DoCreate;
      this.DoDispose = ngsysfup_DoDispose;
      ng_OverrideMethod(this,'UploadFile',ngsysfup_UploadFile);
      ng_OverrideMethod(this,'UploadFiles',ngsysfup_UploadFiles);
      ngControlCreated(this);
    }
    ngRegisterControlType('ngSysFileUploader', function() { return new ngSysFileUploader; });
  },

  AddDragBox: function(c,w) {
    var elm = c.Elm();
    if(!elm){return;}
    if(typeof w === 'undefined'){w = 1;}
    if(typeof c.Bounds.L !== 'undefined'){
      if(typeof c._dragboxMarginLeft === 'undefined'){c._dragboxMarginLeft = elm.style.marginLeft;}
      elm.style.marginLeft = '-'+w+'px';
    }
    if(typeof c.Bounds.T !== 'undefined'){
      if(typeof c._dragboxMarginTop === 'undefined'){c._dragboxMarginTop = elm.style.marginTop;}
      elm.style.marginTop = '-'+w+'px';
    }
    if(typeof c.Bounds.R !== 'undefined'){
      if(typeof c._dragboxMarginRight === 'undefined'){c._dragboxMarginRight = elm.style.marginRight;}
      elm.style.marginRight = '-'+w+'px';
    }
    if(typeof c.Bounds.B !== 'undefined'){
      if(typeof c._dragboxMarginBottom === 'undefined'){c._dragboxMarginBottom = elm.style.marginBottom;}
      elm.style.marginBottom = '-'+w+'px';
    }
    if(typeof c._dragboxBorderWidth === 'undefined'){c._dragboxBorder = elm.style.borderWidth;}
    elm.style.borderWidth = w+'px';
  },

  RemoveDragBox: function(c) {
    var elm = c.Elm();
    if(!elm){return;}
    if(typeof c._dragboxMarginLeft !== 'undefined'){elm.style.marginLeft = c._dragboxMarginLeft;}
    if(typeof c._dragboxMarginTop !== 'undefined'){elm.style.marginTop = c._dragboxMarginTop;}
    if(typeof c._dragboxMarginRight !== 'undefined'){elm.style.marginRight = c._dragboxMarginRight;}
    if(typeof c._dragboxMarginBottom !== 'undefined'){elm.style.marginBottom = c._dragboxMarginBottom;}
    elm.style.borderWidth = ngVal(c._dragboxBorderWidth,'');
    delete c._dragboxMarginLeft;
    delete c._dragboxMarginTop;
    delete c._dragboxMarginRight;
    delete c._dragboxMarginBottom;
    delete c._dragboxBorder;
  }
};

if (typeof(ngUserControls)==='undefined') ngUserControls = {};
ngUserControls['fileuploader'] = FileUploaderControl;
