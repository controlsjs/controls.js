/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2014 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */

var DBVM_NO_ERROR=0;
var DBVM_SUCCESS=1;
var DBVM_ERROR_FAILED=-1;
var DBVM_ERROR_INVALIDARGS=-2;
var DBVM_ERROR_ACCESSDENIED=-3;
var DBVM_ERROR_NOTEXISTS=-4;
var DBVM_ERROR_DATACHANGED=-5;
var DBVM_ERROR_FAILED_SILENT=-6;
var DBVM_ERROR_INTERNAL=-101;

var DBVM_COMMANDS = ['new','load','insert','update','delete','cancel'];  

var dsdbLoaded   = 0; 
var dsdbInserted = 1; 
var dsdbUpdated  = 2; 
var dsdbDeleted  = 3; 
var dsdbNew      = 4; 

var recStateNone      = 0;
var recStateLoaded    = 1; 
var recStateNewRecord = 2; 
var recStateDeleted   = 3;
var recStateLoading   = 101;
var recStateInserting = 102;
var recStateDeleting  = 103;
var recStateUpdating  = 104;

function ng_ViewModelFormatDBError(err,cmd)
{
  var errmsg='';
  switch(err)
  {
    case DBVM_NO_ERROR:            errmsg=''; break;
    case DBVM_SUCCESS:             errmsg=''; break;
    case DBVM_ERROR_FAILED_SILENT: errmsg=''; break;       
    case DBVM_ERROR_FAILED:       
      switch(cmd)
      {
        case 'load':   errmsg='dbviewmodel_err_loadfailed'; break;
        case 'insert': errmsg='dbviewmodel_err_insertfailed'; break;
        case 'update': errmsg='dbviewmodel_err_updatefailed'; break;       
        case 'delete': errmsg='dbviewmodel_err_deletefailed'; break;
        default:       errmsg='dbviewmodel_err_failed'; break;
      }
      break;    
    case DBVM_ERROR_INVALIDARGS:  errmsg='dbviewmodel_err_invalidargs'; break;
    case DBVM_ERROR_ACCESSDENIED: errmsg='dbviewmodel_err_accessdenied'; break;
    case DBVM_ERROR_NOTEXISTS:    errmsg='dbviewmodel_err_notexists'; break;
    case DBVM_ERROR_DATACHANGED:  errmsg='dbviewmodel_err_datachanged'; break;
    case DBVM_ERROR_INTERNAL:     errmsg='dbviewmodel_err_internal'; break;
    default:                      errmsg='dbviewmodel_err_unknown'; break;    
  }
  return (errmsg!='' ? ngTxt(errmsg) : '');
}

function ngdbvm_ResetRecord() 
{
  this.Reset(); 
  this.ViewModel._RecordState(recStateNone);
}

function ngdbvm_EnterEditMode()
{
  this.ViewModel._EditMode(true);
}

function ngdbvm_ExitEditMode()
{
  this.ViewModel._EditMode(false);
}

function ngdbvm_NewRecord(options) 
{ 
  return this.Command('new',options);
}

function ngdbvm_CancelEdits(options)
{ 
  return this.Command('cancel',options);
}

function ngdbvm_LoadRecord(primarykeyvalues,options) 
{
  if(ng_typeObject(primarykeyvalues))
  {
    if(typeof options==='undefined') options={};
    options.PrimaryKeyValues=primarykeyvalues;
  }

  return this.Command('load',options);
}

function ngdbvm_InsertRecord(values,options) 
{ 
  if(ng_typeObject(values))
  {
    if(ngVal(options.ResetRecord,true)) this.Reset();
    this.SetValues(values);
  } 
  else 
    if(!ng_isEmpty(values)) 
      return false;
  return this.Command('insert',options); 
}

function ngdbvm_UpdateRecord(values,options) 
{ 
  if(ng_typeObject(values)) 
    this.SetValues(values);
  else 
    if(!ng_isEmpty(values)) 
      return false;
  return this.Command('update',options); 
}

function ngdbvm_DeleteRecord(primarykeyvalues,options) 
{ 
  if(ng_typeObject(primarykeyvalues))
  {
    if(typeof options==='undefined') options={};
    options.PrimaryKeyValues=primarykeyvalues;
  }

  return this.Command('delete',options);
}

function ngdbvm_PrimaryKeyNames()
{
  var ret=new Array();
  this.ScanValues(function(vm,val,instance,path,userdata)
  {
    // filter dbfields except primary key and _OriginalRecord
    if(path.substring(0,15)=='_OriginalRecord') return true;
    if((ngIsFieldDef(instance))&&(ngVal(instance.Attrs['PrimaryKey'],false)))
      ret.push(path);
    return true;
  });
  return ret;
} 

function ngdbvm_GetPrimaryKeyValues(useoriginalifavailable)
{
  var names=this.PrimaryKeyNames();
  useoriginalifavailable=ngVal(useoriginalifavailable,true);
  if((useoriginalifavailable)&&(ng_typeObject(this.ViewModel._OriginalRecord)))
  {
    for(var i=0;i<names.length;i++)
      names[i]='_OriginalRecord.'+names[i];  
  }
  else useoriginalifavailable=false;
  var values=this.GetValues(false,names);
  if(useoriginalifavailable) values=values._OriginalRecord;
  return values; 
}
  
function ngdbvm_DBDataSetsNotifyChange(type, primarykey)
{
  if(!this.DBDataSets) return;
  for(var i=0;i<this.DBDataSets.length;i++)
    this.DBDataSets[i].DoNotifyChange(this, type, primarykey);
}

function ngdbvm_IsChanged()
{
  var vm=this.ViewModel;
  if((!vm)||(!ng_typeObject(vm._OriginalRecord))) return false;
  
  var changed=false;
  this.ScanValues(function(vmodel,val,instance,path,userdata)
  {
    if(path.substring(0,15)=='_OriginalRecord') return true;
    
    var oval=vmodel.GetFieldByID('_OriginalRecord.'+path);
    if(ng_isEmpty(oval)) return true;
    
    if(ko.isObservable(val)) val=val();
    if(ngIsFieldDef(instance))
    {
      if(instance.PrivateField) return true;
      try {
        val=instance.TypedValue(val);
      } catch(e) { }
      try {
        oval=instance.TypedValue(oval);
      } catch(e) { }
    }
    if(ng_typeDate(val)) val=ng_toUnixTimestamp(val);        
    if(ng_typeDate(oval)) oval=ng_toUnixTimestamp(oval);        
    if(!ng_VarEquals(val,oval)) 
    {
      changed=true; 
      return false; 
    }      
    return true;
  });
  return changed;
}

function ngdbvm_BeginRecordUpdate() 
{
  this.recordchangesupdate++;
}

function ngdbvm_EndRecordUpdate()
{
  this.recordchangesupdate--;
  if(this.recordchangesupdate<=0)
  {
    this.ViewModel._RecordChanged(this.IsChanged());
    this.recordchangesupdate=0;
  }
}

function ngdbvm_Reset(callback)
{
  this.BeginRecordUpdate();
  try {
    this.__origDBVMReset(callback);
  }
  finally {
    this.EndRecordUpdate();
  }
}

function ngdbvm_SetValues(values,deserialize)
{
  this.BeginRecordUpdate();
  try {
    this.__origDBVMSetValues(values,deserialize);
  } 
  finally {
    this.EndRecordUpdate();
  }
}
  
function ngdbvm_DBFieldNames(notprimarykey)
{
  var ret={};
  this.ScanValues(function(vm,val,instance,path,userdata)
  {
    if(path.substring(0,15)=='_OriginalRecord') return true;
    if((ngIsFieldDef(instance))&&(ngVal(instance.Attrs['DBField'],false))&&((!notprimarykey)||(!ngVal(instance.Attrs['PrimaryKey'],false))))
      ret[path]=instance;
    return true;
  });
  return ret;
};

function ngdbvm_AllDBFields(fillvalues)
{
  fillvalues=ngVal(fillvalues,true);
  var ret={};
  this.ScanValues(function(vm,val,instance,path,userdata)
  {
    if(path.substring(0,15)=='_OriginalRecord') return true;
    if((ngIsFieldDef(instance))&&(ngVal(instance.Attrs['DBField'],false)))
    {
      var fid=instance.Attrs['DBField'];
      if(fid) {
        if(fid===true) fid=instance.ID;
        var dbf={ DBFieldId: fid, FieldDef: instance };
        if(fillvalues) {
          var val=instance.Value();
          try {
            val=instance.TypedValue(val);
          }
          catch(e) {
          }
          dbf.Value=val;
        }
        ret[fid]=dbf;
      }
    }
    return true;
  });
  return ret;
}

function ngdbvm_GetDBValues(dbfields,notreadonly,notprimarykey)
{
  notreadonly=ngVal(notreadonly,false);
  notprimarykey=ngVal(notprimarykey,false)
  dbfields=ngVal(dbfields,null);
  var fields={};
  var fd,val,dbf;
  if(dbfields===null) dbfields=this.AllDBFields(false);
  for(var i in dbfields)
  {
    dbf=dbfields[i];
    fd=dbf.FieldDef;
    if((notreadonly)&&(ngVal(fd.Attrs['ReadOnly'],false))) continue;
    if((notprimarykey)&&(ngVal(fd.Attrs['PrimaryKey'],false))) continue;
    val=fd.Value();
    try {
      val=fd.TypedValue(val);
    }
    catch(e) {
    }
    dbf.Value=val;
    fields[i]=dbf;
  }
  return fields;
}

function ngdbvm_GetOriginalDBValues(dbfields)
{
  if(!ng_typeObject(this.ViewModel._OriginalRecord)) return false;
  dbfields=ngVal(dbfields,null);

  if(dbfields===null) dbfields=this.AllDBFields(false);
  var fd,val,dbf;
  for(var i in dbfields)
  {
    dbf=dbfields[i];
    fd=dbf.FieldDef;
    val=this.GetFieldValueByID('_OriginalRecord.'+fd.ID);
    try {
      val=fd.TypedValue(val);
    }
    catch(e) {
    }
    dbf.OriginalValue=val;
  }
  return dbfields;
}

/*  Class: ngSysDBViewModel
 *  This class implements non-visual <ngSysDBViewModel> control (based on <ngSysViewModel>).
 */
function Create_ngSysDBViewModel(def,ref,parent) 
{ 
  ng_MergeVar(def, {
    Data: {
      RecordStateEditMode: {
        recStateNewRecord: true,
        recStateLoaded: true,
        recStateNone: false,
        recStateDeleted: false
      }
    }
  });

  var c=ngCreateControlAsType(def, 'ngSysViewModel', ref, parent);
  if(!c) return c; 
  /*
   *  Group: Properties
   */
   
  c.ResetRecordOnLoad = false;
  
  c.DBDataSets=new Array();
  c.CancelEditsValues = null;
  c.recordchangesupdate=0;
    
  c.RecordStateEditMode = { };
    
  /*
   *  Group: Methods
   */
  c.NewRecord    = ngdbvm_NewRecord;
  c.LoadRecord   = ngdbvm_LoadRecord;
  c.InsertRecord = ngdbvm_InsertRecord;
  c.UpdateRecord = ngdbvm_UpdateRecord;
  c.DeleteRecord = ngdbvm_DeleteRecord;
  c.CancelEdits  = ngdbvm_CancelEdits;
  c.ResetRecord  = ngdbvm_ResetRecord;

  c.EnterEditMode = ngdbvm_EnterEditMode;
  c.ExitEditMode  = ngdbvm_ExitEditMode;

  c.PrimaryKeyNames = ngdbvm_PrimaryKeyNames;
  c.GetPrimaryKeyValues = ngdbvm_GetPrimaryKeyValues;
  c.IsChanged = ngdbvm_IsChanged;
  
  c.BeginRecordUpdate = ngdbvm_BeginRecordUpdate;
  c.EndRecordUpdate = ngdbvm_EndRecordUpdate;
  
  c.DBDataSetsNotifyChange = ngdbvm_DBDataSetsNotifyChange;

  c.__origDBVMReset=c.Reset;
  c.__origDBVMSetValues=c.SetValues;
  c.Reset = ngdbvm_Reset;
  c.SetValues = ngdbvm_SetValues;

  c.DBFieldNames = ngdbvm_DBFieldNames;
  c.AllDBFields = ngdbvm_AllDBFields;
  c.GetDBValues = ngdbvm_GetDBValues;
  c.GetOriginalDBValues = ngdbvm_GetOriginalDBValues;

  /*
   *  Group: Events
   */
  c.OnNewRecord    = null;
  c.OnInsertRecord = null;
  c.OnLoadRecord   = null;
  c.OnUpdateRecord = null;
  c.OnDeleteRecord = null;
  c.OnCancelEdits  = null;

  c.OnInsertFailed = null;
  c.OnLoadFailed   = null;
  c.OnUpdateFailed = null;
  c.OnDeleteFailed = null;
  
  c.OnRecordInserted = null;
  c.OnRecordLoaded   = null;
  c.OnRecordUpdated  = null;
  c.OnRecordDeleted  = null;
  
  c.OnDBSuccess = null;
  c.OnDBError = null;

  c.AddEvent('OnViewModelChanged', function(vm) {
    if(ng_typeObject(vm.ViewModel._OriginalRecord))
    {
      vm.ScanValues(function(vmodel,val,instance,path,userdata)
      {
        if(path.substring(0,15)=='_OriginalRecord') return true;
        if((!ko.isObservable(val))||(val.monrecchanges)) return true;
        
        if(ngIsFieldDef(instance))
        {
          if(instance.PrivateField) return true;
        }
        
        var orig=vm.GetFieldByID('_OriginalRecord.'+path);
        if(ng_isEmpty(orig)) return true;
         
        val.monrecchanges=true;
        val.subscribe(function(newval) {
          if(!c.recordchangesupdate) {
            vm.ViewModel._RecordChanged(vm.IsChanged());
          }
        });
        return true;
      });
    }
  });

  c.SetViewModel({
    _RecordChanged: ko.observable(false),
    _RecordState: ko.observable(recStateNone),
    _EditMode:      ko.observable(false),
    NewRecord:    function() { return c.NewRecord(); },
    LoadRecord:   function() { return c.LoadRecord(); },
    InsertRecord: function() { return c.InsertRecord(); },
    UpdateRecord: function() { return c.UpdateRecord(); },
    DeleteRecord: function() { return c.DeleteRecord(); },
    CancelEdits:  function() { return c.CancelEdits(); },
    ResetRecord:    function() { return c.ResetRecord(); },
    EnterEditMode:  function() { return c.EnterEditMode(); },
    ExitEditMode:   function() { return c.ExitEditMode(); }
  });
      
  c.ViewModel._RecordState.subscribe(function(rs) {
    switch(rs) {
      case 0:   rs='recStateNone'; break;
      case 1:   rs='recStateLoaded'; break;
      case 2:   rs='recStateNewRecord'; break;
      case 3:   rs='recStateDeleted'; break;
      case 101: rs='recStateLoading'; break;
      case 102: rs='recStateInserting'; break;
      case 103: rs='recStateDeleting'; break;
      case 104: rs='recStateUpdating'; break;
    };
    var em=c.RecordStateEditMode[rs];
    if((typeof em !== 'undefined')&&(em !== null)) c.ViewModel._EditMode(em ? true : false);
  });
      
  c.AddEvent('OnDoCommand', function(vm,cmd,options) {
    switch(cmd)
    {
      case 'new':
        vm.ResetRecord();
        vm.ViewModel._RecordState(recStateNewRecord);
        if(vm.OnNewRecord) vm.OnNewRecord(vm,options);
        return true;
      case 'cancel':
        if(vm.OnCancelEdits) vm.OnCancelEdits(vm,options);
  
        if(!ng_isEmptyOrNull(vm.CancelEditsValues)) 
          c.LoadRecord(vm.CancelEditsValues, { IgnoreFormChanges: true });
        else
          vm.ResetRecord();
        return true;
      case 'load':   vm.ViewModel._RecordState(recStateLoading); break;
      case 'insert': vm.ViewModel._RecordState(recStateInserting); break;
      case 'update': vm.ViewModel._RecordState(recStateUpdating); break;
      case 'delete': vm.ViewModel._RecordState(recStateDeleting); break;
    }
    return false;
  });

  c.AddEvent('OnCommand', function(vm,cmd,options) {
    switch(cmd)
    {
      case 'new':
        if(ng_isEmpty(options.ValueNames)) options.ValueNames=ngVal(vm.GetCommandValueNames(cmd,options,true),[]);
        break;
      case 'cancel':
        options.ValueNames=[];
        break;
      case 'load':
        if(ngVal(options.ResetRecordOnLoad,vm.ResetRecordOnLoad)) vm.ResetRecord();
      case 'delete':
        var pk=vm.PrimaryKeyNames();
        if(pk.length>0)
        {
          var names=options.ValueNames;
          if(ng_isEmpty(names)) names=ngVal(vm.GetCommandValueNames(cmd,options,true),[]);

          if(ng_typeObject(options.PrimaryKeyValues)) // PK values specified, remove pk
          {
            for(var i=names.length-1;i>=0;i--)
              if(ng_inArray(names[i],pk)) names.splice(i,1);
          }
          else
          {
            // always add pk
            if(names.length==0) names=pk;
            else
              for(var i=0;i<pk.length;i++)
                if(!ng_inArray(pk[i],names)) names.push(pk[i]);
          }

          options.ValueNames=names;
        }
        break;
    }
    if(!ng_isEmpty(options.ValueNames)) // Add _OriginalRecord values if not included
    {
      var val,path,vn=options.ValueNames, newvn=[];
      for(var i=vn.length-1;i>=0;i--)
      {
        path='_OriginalRecord.'+vn[i];
        val=vm.GetFieldByID(path);
        if(ng_isEmpty(val)) continue;
        newvn.push(path);
      }
      for(var i=0;i<newvn.length;i++)
        if(!ng_inArray(newvn[i],vn)) vn.push(newvn[i]);
    }
    switch(cmd)
    {
      case 'load':
      case 'delete':
        var pkvals = options.PrimaryKeyValues;
        if(ng_typeObject(pkvals)) // PK values specified, handle values manualy
        {
          var v,fd,err={};
          var typedpkvals={};
          for(var i=0;i<pk.length;i++)
          {
            v=vmGetFieldValueByID(pkvals,pk[i]);
            fd=this.GetFieldByID(pk[i]);
            try {
              if(fd) v=fd.Serialize(v);
              vmSetFieldValueByID(typedpkvals,pk[i],v);
            }
            catch(e)
            {
              err[pk[i]]=e;
            }
          }
          pkvals=typedpkvals;
          options.PrimaryKeyValues = typedpkvals;

          var delpk=(cmd==='delete' ? ng_CopyVar(pkvals) : false);
          pkvals._OriginalRecord=ng_CopyVar(pkvals); // prevent IsChanged detection
          options.Values=pkvals;
          ng_MergeVar(options.Values,vm.GetValues(false,options.ValueNames,err,true,true));
          if(!ng_EmptyVar(err))
          {
            if((this.OnErrors)&&(!ngVal(this.OnErrors(this,err),false))) return false;
            if(!ng_EmptyVar(err))
            {
              this.ShowErrors(err);
              return false;
            }
          }
          if(delpk) vm._deleteprimarykey=delpk;
        }
        else {
          options.PrimaryKeyValues = vm.GetPrimaryKeyValues();
          if(cmd==='delete') vm._deleteprimarykey = options.PrimaryKeyValues;
        }
        break;
    }
    switch(cmd)
    {
      case 'load':   if(vm.OnLoadRecord)   vm.OnLoadRecord(vm,options); break;
      case 'insert': if(vm.OnInsertRecord) vm.OnInsertRecord(vm,options); break;
      case 'update': if(vm.OnUpdateRecord) vm.OnUpdateRecord(vm,options); break;
      case 'delete':
        if(vm.OnDeleteRecord) vm.OnDeleteRecord(vm,options); 
        break;
    }
    // Save Record State
    vm._recordstate=vm.ViewModel._RecordState();
    return true;
  })
  c.AddEvent('OnCommandData', function (vm,cmd,sresults) {
    if(ngVal(sresults.DBError,0)!=0)
    {
      if(sresults.DBError==1)
      {
        vm.ViewModel._RecordChanged(vm.IsChanged());
        switch(cmd)
        {
          case 'load':   if(vm.OnRecordLoaded)   vm.OnRecordLoaded(vm,sresults); break;
          case 'insert': if(vm.OnRecordInserted) vm.OnRecordInserted(vm,sresults); break;
          case 'update': if(vm.OnRecordUpdated)  vm.OnRecordUpdated(vm,sresults); break;
          case 'delete': if(vm.OnRecordDeleted)  vm.OnRecordDeleted(vm,sresults,vm._deleteprimarykey); break;
        }        
        if(vm.OnDBSuccess) vm.OnDBSuccess(vm,cmd,sresults);
  
        if(cmd=='delete') vm.CancelEditsValues = null;
        else vm.CancelEditsValues=vm.GetValues(true,vm.PrimaryKeyNames()); 
        delete vm._deleteprimarykey;
      }
    }
  });
  
  c.AddEvent('OnCommandFinished', function (vm,cmd,sresults) {    
    // Restore Record State
    if(typeof vm._recordstate!=='undefined') vm.ViewModel._RecordState(vm._recordstate);
    delete vm._recordstate;
    
    if(ngVal(sresults.DBError,0)!=0)
    {
      if(sresults.DBError!=1)
      {
        delete sresults.Values; // remove server response on any DB error
        delete vm._deleteprimarykey;
        switch(cmd)
        {
          case 'load':   if(vm.OnLoadFailed)   vm.OnLoadFailed(vm,sresults); break;
          case 'insert': if(vm.OnInsertFailed) vm.OnInsertFailed(vm,sresults); break;
          case 'update': if(vm.OnUpdateFailed) vm.OnUpdateFailed(vm,sresults); break;
          case 'delete': if(vm.OnDeleteFailed) vm.OnDeleteFailed(vm,sresults); break;
        }
        if(vm.OnDBError) vm.OnDBError(vm,cmd,sresults);
        else 
        {
          var errmsg=ng_ViewModelFormatDBError(sresults.DBError,cmd);
          if(errmsg!='') alert(errmsg);
        }
      }
    }
    return true;
  });
  return c;
}

function ngdbvmf_NewRecord()
{
  if((this.ViewModel)&&(typeof this.ViewModel.NewRecord==='function')) return this.ViewModel.NewRecord();
  return false;
}

function ngdbvmf_LoadRecord()
{
  if((this.ViewModel)&&(typeof this.ViewModel.LoadRecord==='function')) return this.ViewModel.LoadRecord();
  return false;
}
 
function ngdbvmf_InsertRecord()
{
  if((this.ViewModel)&&(typeof this.ViewModel.InsertRecord==='function')) return this.ViewModel.InsertRecord();
  return false;
}
 
function ngdbvmf_UpdateRecord()
{
  if((this.ViewModel)&&(typeof this.ViewModel.UpdateRecord==='function')) return this.ViewModel.UpdateRecord();
  return false;
}
 
function ngdbvmf_DeleteRecord()
{
  if((this.ViewModel)&&(typeof this.ViewModel.DeleteRecord==='function')) return this.ViewModel.DeleteRecord();
  return false;
}

function ngdbvmf_CancelEdits()
{
  if((this.ViewModel)&&(typeof this.ViewModel.CancelEdits==='function')) return this.ViewModel.CancelEdits();
  return false;
}
   
function ngdbvmf_ResetRecord()
{
  if((this.ViewModel)&&(typeof this.ViewModel.ResetRecord==='function')) return this.ViewModel.ResetRecord();
  return false;
}

function ngdbvmf_SetViewModel(vm)
{
  if(typeof vm==='string') vm=getViewModelById(vm);
  if((vm)&&(vm.ViewModelForm)) return;
  var ovm=this.ViewModel;
  if(typeof ovm==='object' && ovm)
    ovm.RemoveEvent('OnDBError',ngdbvmf_OnDBError);    
  if(vm)
    vm.AddEvent('OnDBError',ngdbvmf_OnDBError);    
}

function ngdbvmf_ChangeQuery(successfnc,failfnc)
{                                                   
  var querytxt;
  if(this.OnGetChangeQueryText) querytxt=ngVal(this.OnGetChangeQueryText(this),'');
  else querytxt=ngTxt(this.ChangeQueryText); 

  if(this.OnChangedQuery)
  {
    this.OnChangedQuery(this,querytxt,successfnc,failfnc);
  }
  else 
  {
    if(confirm(querytxt)) 
    {
      if(typeof successfnc === 'function') successfnc(this);
    }
    else
    {
      if(typeof failfnc === 'function') failfnc(this);
    }
  }
}

function ngdbvmf_DeleteQuery(successfnc,failfnc)
{
  var querytxt;
  if(this.OnGetDeleteQueryText) querytxt=ngVal(this.OnGetDeleteQueryText(this),'');
  else querytxt=ngTxt(this.DeleteQueryText); 

  if(this.OnDeleteQuery)
  {
    this.OnDeleteQuery(this,querytxt,successfnc,failfnc);
  }
  else 
  {
    if(confirm(querytxt)) 
    {
      if(typeof successfnc === 'function') successfnc(this);
    }
    else
    {
      if(typeof failfnc === 'function') failfnc(this);
    }
  }
  return true;
}

function ngdbvmf_IsChanged()
{                    
  var vm=this.ViewModel;
  if((!vm)||(typeof vm.IsChanged!=='function')) return false;
  return vm.IsChanged();
}

function ngdbvmf_OnCommand(form,cmd,options)
{ 
  var vm=form.ViewModel;
  if(!vm) return true;
  
  var recstate=(typeof vm.ViewModel._RecordState === 'function' ? vm.ViewModel._RecordState() : recStateNone);
  if((recstate==recStateLoaded)||(recstate==recStateNewRecord))
  {
    var checkchange=false;
    var cmds=form.ChangeCommands;
    for(var i=0;i<cmds.length;i++)
      if(cmd==cmds[i]) { checkchange=true; break; }
    if((checkchange)&&(!ngVal(options.IgnoreFormChanges,false))&&(form.IsChanged()))
    {    
      form.ChangeQuery(function(form) {
        options.IgnoreFormChanges=true;
        if(form.ViewModel) form.ViewModel.Command(cmd,options);
      });     
      return false;
    }
  
    var deletecmd=false;
    cmds=form.DeleteCommands;
    for(var i=0;i<cmds.length;i++)
      if(cmd==cmds[i]) { deletecmd=true; break; }
    if((deletecmd)&&(!ngVal(options.SkipDeleteQuery,false)))
    {
      form.DeleteQuery(function(form) {
        options.SkipDeleteQuery=true;
        if(form.ViewModel) form.ViewModel.Command(cmd,options);
      });
      return false;
    }
  }
  return true;
}

function ngdbvmf_OnDBError(vm,cmd,sresults)
{
  var form=vm.ViewModelForm;
  if(form) 
  {
    if(form.OnDBError) form.OnDBError(form,cmd,sresults);
    else
    {    
      var errmsg=ng_ViewModelFormatDBError(sresults.DBError,cmd);
      if(errmsg!='') 
      {
        if(form.OnShowErrorMsg) form.OnShowErrorMsg(form,errmsg);
        else alert(errmsg);
      }
    } 
  }
  return true;
}


/*  Class: ngDBViewModelForm
 *  View model form control (based on <ngViewModelForm>).
 */
function Create_ngDBViewModelForm(def,ref,parent) 
{ 
  var c=ngCreateControlAsType(def, 'ngViewModelForm', ref, parent);            
  if(!c) return c; 
  c.AddEvent('OnCommand', ngdbvmf_OnCommand); 
  c.AddEvent(ngdbvmf_SetViewModel,'SetViewModel');
  
  /*
   *  Group: Properties
   */
  c.DeleteCommands = [ 'delete' ];
  c.ChangeCommands = [ 'load', 'new' ];

  c.ChangeQueryText = 'dbviewmodel_form_changed';
  c.DeleteQueryText = 'dbviewmodel_form_deletequery';
  
  /*
   *  Group: Methods
   */
  c.NewRecord    = ngdbvmf_NewRecord;
  c.LoadRecord   = ngdbvmf_LoadRecord; 
  c.InsertRecord = ngdbvmf_InsertRecord; 
  c.UpdateRecord = ngdbvmf_UpdateRecord; 
  c.DeleteRecord = ngdbvmf_DeleteRecord; 
  c.CancelEdits  = ngdbvmf_CancelEdits; 
  
  c.ResetRecord = ngdbvmf_ResetRecord;

  c.IsChanged = ngdbvmf_IsChanged;
  
  c.ChangeQuery = ngdbvmf_ChangeQuery;
  c.DeleteQuery = ngdbvmf_DeleteQuery;
  
  /*
   *  Group: Events
   */
  c.OnChangedQuery = null;
  c.OnDeleteQuery = null;
  
  c.OnGetChangeQueryText = null;
  c.OnGetDeleteQueryText = null;

  c.OnDBError = null;        

  return c;
}

function ngdbdsc_OnNewRecord(vm)
{
  if(typeof vm.DBDataSetsNotifyChange === 'function') vm.DBDataSetsNotifyChange(dsdbNew, null);  
}

function ngdbdsc_RecordLoaded(vm,sresults)
{
  if(typeof vm.DBDataSetsNotifyChange === 'function') vm.DBDataSetsNotifyChange(dsdbLoaded, (typeof vm.GetPrimaryKeyValues === 'function' ? vm.GetPrimaryKeyValues() : null));  
}

function ngdbdsc_RecordInserted(vm,sresults)
{
  if(typeof vm.DBDataSetsNotifyChange === 'function') vm.DBDataSetsNotifyChange(dsdbInserted, (typeof vm.GetPrimaryKeyValues === 'function' ? vm.GetPrimaryKeyValues() : null));  
}

function ngdbdsc_RecordUpdated(vm,sresults)
{
  if(typeof vm.DBDataSetsNotifyChange === 'function') vm.DBDataSetsNotifyChange(dsdbUpdated, (typeof vm.GetPrimaryKeyValues === 'function' ? vm.GetPrimaryKeyValues() : null));
}

function ngdbdsc_RecordDeleted(vm,sresults,delpk)
{
  if(typeof vm.DBDataSetsNotifyChange === 'function') vm.DBDataSetsNotifyChange(dsdbDeleted, delpk);
}

function ngdbdsc_DoNotifyChange(dbvm, changetype, primarykey)
{
  if(this.GetDBViewModel()!=dbvm) return;
  
  var list=this.Controls.List;
  if(changetype==dsdbLoaded)
  {  
    if((this.AutoSelectDBVMRecord)&&(list))
    {
      list.ClearSelected();
      list.Update();
    }
  } 
  else
  {
    if(list) 
    {
      if(changetype==dsdbDeleted)
      {
        var sel=list.GetSelected();
        for(var i=0;i<sel.length;i++)
        {
          var itpk=this.GetRecordPrimaryKey(sel[i]);
          if((primarykey)&&(ng_VarEquals(primarykey,itpk)))
          {
            sel=sel[i];
            list.SelectItem(sel,false);
            if(list.SelCount==0)
            {
              var found=null;
              this.ScanVisiblePageItems(function(ds,it,list,userdata) {
                if(sel==it) {
                  sel=null;
                  if(found) return false;
                  return true;
                }
                found=it;
                if(!sel) return false;
                return true;
              });
              if(found) list.SelectItem(found); 
            }
            break;            
          }                              
        }
      }
      else list.ClearSelected();
    }
    if(changetype!=dsdbNew) 
    {
      var undefined;
      this.MaxLength=undefined;
      this.InvalidateData();
    }
  }  
  if(this.OnDBViewModelChanged) this.OnDBViewModelChanged(this, changetype, primarykey);
}

function ngdbdsc_SetDBViewModel(dbvm)
{
  if(typeof dbvm==='string') 
  {
    var vm=getViewModelById(dbvm);
    if(vm) dbvm=vm;
  }
  var odbvm=this.DBViewModel;
  if((odbvm)&&(typeof odbvm!=='string'))
  {
    if(odbvm.DBDataSets)
      for(var i=0;i<odbvm.DBDataSets.length;i++)
        if(odbvm.DBDataSets[i]==this)
        {
          odbvm.DBDataSets.splice(i,1);
          break;
        } 
    odbvm.RemoveEvent('OnNewRecord',      ngdbdsc_OnNewRecord); 
    odbvm.RemoveEvent('OnRecordLoaded',   ngdbdsc_RecordLoaded); 
    odbvm.RemoveEvent('OnRecordInserted', ngdbdsc_RecordInserted); 
    odbvm.RemoveEvent('OnRecordUpdated',  ngdbdsc_RecordUpdated); 
    odbvm.RemoveEvent('OnRecordDeleted',  ngdbdsc_RecordDeleted);          
  }
  this.DBViewModel=dbvm;
  if((dbvm)&&(typeof dbvm!=='string'))
  {
    if(dbvm.DBDataSets) 
    {
      var i;
      for(i=0;i<dbvm.DBDataSets.length;i++)
        if(dbvm.DBDataSets[i]==this) break;

      if(i<dbvm.DBDataSets.length) return;
      dbvm.DBDataSets.push(this);      
    }
    dbvm.AddEvent('OnNewRecord',      ngdbdsc_OnNewRecord); 
    dbvm.AddEvent('OnRecordLoaded',   ngdbdsc_RecordLoaded); 
    dbvm.AddEvent('OnRecordInserted', ngdbdsc_RecordInserted); 
    dbvm.AddEvent('OnRecordUpdated',  ngdbdsc_RecordUpdated); 
    dbvm.AddEvent('OnRecordDeleted',  ngdbdsc_RecordDeleted);
  }
}

function ngdbdsc_GetDBViewModel()
{
  var vm=this.DBViewModel;
  if(typeof vm === 'string')
  {
    var vmi=getViewModelById(vm);
    if(!vmi) return null;
    this.SetDBViewModel(vmi);    
    vm=this.DBViewModel;
  }
  return vm;
}

function ngdbdsc_SelectChanged(list)
{
  var ds=list.Owner.Owner;
  if((!ds)||(ds.ds_select_changing)) return;
  
  ds.ds_select_changing=true;
  try
  {
    var selected=(list.SelCount==1);
    if(ds.Controls.LoadRecord)   ds.Controls.LoadRecord.SetEnabled(selected);
    if(ds.Controls.DeleteRecord) ds.Controls.DeleteRecord.SetEnabled(selected);
    if((selected)&&(ds.LoadOnSelect)) ds.LoadRecord();
  }
  finally
  {
    delete ds.ds_select_changing;
  }
}

function ngdbdsc_DoUpdateBefore(o)
{
  var ds=this.Owner.Owner;
  if(!ds) return;
  var dbvm=ds.GetDBViewModel();
  if((!dbvm)||(typeof dbvm.GetPrimaryKeyValues !== 'function')||(!ds.AutoSelectDBVMRecord))
  {
    delete this.__dbvmpk;
    return;
  }
  this.__dbvmpk=dbvm.GetPrimaryKeyValues();
}

function ngdbdsc_DrawItem(l,ret,html,it,id,level,collapsed)
{
  if(l.SelCount!=0) return true; // Record selected, skip detection
  
  var ds=l.Owner.Owner;
  if((!ds)||(!ds.AutoSelectDBVMRecord)||(!l.__dbvmpk)) return true;
  
  // Autoselect loaded record
  var itpk=ds.GetRecordPrimaryKey(it);
  if(ng_VarEquals(l.__dbvmpk,itpk))
  {
    var los=ds.LoadOnSelect;
    try
    { 
      ds.LoadOnSelect=false;
      l.SelectItem(it);
    }
    finally
    {
      ds.LoadOnSelect=los;
    }
  }
  return true; 
}

function ngdbdsc_OnClick(e)
{
  var ds=e.list.Owner.Owner;
  if((e.listPart!=0)||(!ds)||(!ds.LoadOnSelect)||(e.listIgnoreSelect)) return true;  
  var evm=ds.GetDBViewModel();
  if(!evm) return true;

  var form=evm.ViewModelForm;
  if((form)&&(typeof form.IsChanged === 'function')&&(form.IsChanged()))
  {
    form.ChangeQuery(function(form) {
      ds.LoadRecord(e.listItem,true);
    });    
    e.listIgnoreSelect=true; 
  }  
  return true;
}

function ngdbdsc_OnClickItem(e)
{
  var ds=e.list.Owner.Owner;
  if((!ds)||(ds.LoadOnSelect)||(!ds.LoadOnClick)) return;
  ds.LoadRecord(e.listItem);
}

function ngdbdsc_OnDblClickItem(e)
{
  var ds=e.list.Owner.Owner;
  if((!ds)||(ds.LoadOnSelect)||(!ds.LoadOnDblClick)) return;
  ds.LoadRecord(e.listItem);
}

function ngdbdsc_LoadRecord(it,ignorechanged)
{
  var evm=this.GetDBViewModel();
  if(!evm) return false;
  var doselect=true;
  if(!it)
  {
    var sel=this.Controls.List.GetSelected();
    if(sel.length==1) it=sel[0]; 
    if(!it) return false;
    doselect=false; 
  }
  if((this.OnLoadRecord)&&(!ngVal(this.OnLoadRecord(this,evm,it),false))) return false;

  var form=evm.ViewModelForm;
  if((form)&&(!ngVal(ignorechanged,false))&&(typeof form.IsChanged === 'function')&&(form.IsChanged()))
  {
    var self=this;
    form.ChangeQuery(function(form) {
      self.LoadRecord(it,true);
    });     
    return false;
  }
  if((doselect)&&(!this.ds_select_changing)) {
    this.ds_select_changing=true;
    try
    {
      this.Controls.List.selected=[];
      this.Controls.List.SelectItem(it,true);
    }
    finally
    {
      delete this.ds_select_changing;
    }
  }
  return (typeof evm.LoadRecord === 'function' ? evm.LoadRecord(this.GetRecordPrimaryKey(it),{IgnoreFormChanges:true}) : false);  
} 

function ngdbdsc_NewRecord()
{
  var evm=this.GetDBViewModel();
  if(!evm) return false;
  if((this.OnNewRecord)&&(!ngVal(this.OnNewRecord(this,evm),false))) return false;

  if(typeof evm.NewRecord === 'function') evm.NewRecord();
  else evm.Reset();

  this.Controls.List.ClearSelected();
  return true;
}

function ngdbdsc_DeleteRecord(it)
{
  var evm=this.GetDBViewModel();
  if(!evm) return false;
  if(!it)
  {
    var sel=this.Controls.List.GetSelected();
    if(sel.length==1) it=sel[0];
    if(!it) return false;
  }
  if((this.OnDeleteRecord)&&(!ngVal(this.OnDeleteRecord(this,evm,it),false))) return false;
  return (typeof evm.DeleteRecord === 'function' ? evm.DeleteRecord(this.GetRecordPrimaryKey(it)) : false);
}

function ngdbdsc_GetRecordPrimaryKey(it)
{
  if((!it)||(!ng_typeObject(it.Record))) return null;
  var vm=this.ViewModel;
  if((!vm)||(!vm.ViewModel.Columns)) return {};
  
  function getrecordpk(o,d,pk)
  {
    var fd;
    for(var i in o)
    {
      if(i=='Owner') continue;
      fd=o[i];
      if(ngIsFieldDef(fd))
      {
        if(ngVal(fd.Attrs['PrimaryKey'],false))
          if(typeof d[i]!=='undefined') pk[i]=d[i];
        continue;
      }
        
      if((ng_typeObject(fd))&&(!ng_typeDate(fd))&&(ng_typeObject(d[i]))&&(!ng_typeDate(d[i]))) 
      {
        pk[i]={};
        getrecordpk(fd,d[i],pk[i])
        if(ng_EmptyVar(pk[i])) delete pk[i];
      }         
    }
  }
  var pk={};
  getrecordpk(vm.ViewModel.Columns, it.Record,pk);
  return pk;
} 


function ngdbdsc_SetViewModel(ds,vm,ovm)
{
  if(ovm) {
    delete ovm.NewRecord;
    delete ovm.LoadRecord;
    delete ovm.DeleteRecord;
  }
  if(vm) {
    vm.SetViewModel({ 
      NewRecord:    function() { return ds.NewRecord(); },
      LoadRecord:   function() { return ds.LoadRecord(); },
      DeleteRecord: function() { return ds.DeleteRecord(); }
    });
  }
}

/*  Class: ngDBDataSet
 *  ViewModel dataset control (based on <ngDataSet>).
 */
function Create_ngDBDataSet(def, ref, parent, basetype)
{
  var hasbuttons=false;
  if (ngVal(def.EditButtons, true))
  {
    hasbuttons=true;
    ng_MergeDef(def, {
      Controls: {
        Paging: {
          Controls: {
            NewRecord: {
              Type: 'ngButton',
              Data: {
                ngTextD: 'dbviewmodel_dataset_new',
                ngAltD: 'dbviewmodel_dataset_new'
              },
              Events: {
                OnClick: function(e) { e.Owner/*button*/.Owner/*controls*/.Owner/*pagelist*/.NewRecord(); }
              }
            },
            LoadRecord: {
              Type: 'ngButton',
              Data: {
                ngTextD: 'dbviewmodel_dataset_edit',
                ngAltD: 'dbviewmodel_dataset_edit',
                Enabled: false
              },
              Events: {
                OnClick: function(e) { e.Owner/*button*/.Owner/*controls*/.Owner/*pagelist*/.LoadRecord(); }
              }
            },
            DeleteRecord: {
              Type: 'ngButton',
              Data: {
                ngTextD: 'dbviewmodel_dataset_delete',
                ngAltD: 'dbviewmodel_dataset_delete',
                Enabled: false
              },
              Events: {
                OnClick: function(e) { e.Owner/*button*/.Owner/*controls*/.Owner/*pagelist*/.DeleteRecord(); }
              }
            }
          }
        }
      }
    });
  } else
  {
    if ((def.Controls) && (def.Controls.Paging) && (def.Controls.Paging.Controls))
    {
      def.Controls.Paging.Controls.NewRecord = null;
      def.Controls.Paging.Controls.LoadRecord = null;
      def.Controls.Paging.Controls.DeleteRecord = null;
    }
  }

  if (ngVal(def.RefreshButton, true))
  {
    hasbuttons=true;
    ng_MergeDef(def, {
      Controls: {
        Paging: {
          Controls: {
            Refresh: {
              Type: 'ngButton',
              Data: {
                ngTextD: 'dbviewmodel_dataset_refresh',
                ngAltD: 'dbviewmodel_dataset_refresh'
              },
              Events: {
                OnClick: function(e) { e.Owner/*button*/.Owner/*controls*/.Owner/*pagelist*/.ApplyFilters(); }
              }
            }
          }
        }
      }
    });
  } else
  {
    if ((def.Controls) && (def.Controls.Paging) && (def.Controls.Paging.Controls))
    {
      def.Controls.Paging.Controls.Refresh = null;
    }
  }

  var c=ngCreateControlAsType(def, ngVal(basetype,'ngDataSet'), ref, parent);
  if(!c) return c;
  
  c.AddEvent('OnSetViewModel', ngdbdsc_SetViewModel);

  def.OnCreated=ngAddEvent(def.OnCreated, function (c, ref) {
    c.DBViewModel=ngVal(def.DBViewModel,c.DBViewModel);

    var list=c.Controls.List;
    if(list) {
      if(list.SelectType==nglSelectNone) list.SelectType=nglSelectSingle;
      list.AddEvent('OnSelectChanged', ngdbdsc_SelectChanged);
      list.AddEvent('OnClick', ngdbdsc_OnClick);
      list.AddEvent('OnClickItem', ngdbdsc_OnClickItem);
      list.AddEvent('OnDblClickItem', ngdbdsc_OnDblClickItem);
      list.AddEvent('OnDrawItem', ngdbdsc_DrawItem);
      list.AddEvent(ngdbdsc_DoUpdateBefore,'DoUpdate');
    }
  });

  c.DisplayPaging = (hasbuttons ? plDisplayPagingAlways : plDisplayPagingNotEmpty);
  c.PagingType = plPagingDataSetEx;
  c.PagingInside = false;

  c.DoNotifyChange = ngdbdsc_DoNotifyChange;
  
  /*
   *  Group: Properties
   */
  c.DBViewModel = null;

  c.LoadOnSelect   = false;
  c.LoadOnClick    = false;
  c.LoadOnDblClick = true;
  
  c.AutoSelectDBVMRecord = true;

  /*
   *  Group: Methods
   */
  c.SetDBViewModel = ngdbdsc_SetDBViewModel;
  c.GetDBViewModel = ngdbdsc_GetDBViewModel;
  
  c.NewRecord      = ngdbdsc_NewRecord;
  c.LoadRecord     = ngdbdsc_LoadRecord;
  c.DeleteRecord   = ngdbdsc_DeleteRecord;
  
  c.GetRecordPrimaryKey = ngdbdsc_GetRecordPrimaryKey; 
  
  /*
   *  Group: Events
   */
  c.OnNewRecord    = null;
  c.OnLoadRecord   = null;
  c.OnDeleteRecord = null;
  
  c.OnDBViewModelChanged = null;

  return c;     
}

/*  Class: ngDBToolBar
 *  ViewModel database toolbar control (based on <ngToolBar>).
 */
function Create_ngDBToolBar(def, ref, parent, basetype)
{
  ng_MergeDef(def, {
    ParentReferences: false,
    Controls: {
      New: {
        Type: 'ngButton',
        DataBind: 'Command: "new", Enabled: _RecordState() != recStateNewRecord',
        Data: {
          ngTextD: 'dbviewmodel_toolbar_new',
          ngAltD: 'dbviewmodel_toolbar_new'
        }
      },
      Delete: {
        Type: 'ngButton',
        DataBind: 'Command: "delete", Enabled: _RecordState() == recStateLoaded',
        Data: {
          ngTextD: 'dbviewmodel_toolbar_delete',
          ngAltD: 'dbviewmodel_toolbar_delete'
        }
      },         
      Insert: {
        Type: 'ngButton',
        DataBind: 'Command: "insert", Visible: _RecordState() == recStateNewRecord',
        Data: {
          ngTextD: 'dbviewmodel_toolbar_insert',
          ngAltD: 'dbviewmodel_toolbar_insert'
        }
      },
      Update: {
        Type: 'ngButton',
        DataBind: 'Command: "update", Enabled: _RecordChanged(), Visible: _RecordState() != recStateNewRecord',
        Data: {
          ngTextD: 'dbviewmodel_toolbar_update',
          ngAltD: 'dbviewmodel_toolbar_update'
        }
      },
      Cancel: {
        Type: 'ngButton',
        DataBind: 'Command: "cancel", Enabled: _RecordChanged() || _RecordState() == recStateNewRecord',
        Data: {
          ngTextD: 'dbviewmodel_toolbar_cancel',
          ngAltD: 'dbviewmodel_toolbar_cancel'
        }
      }
    }         
  });
  return ngCreateControlAsType(def, ngVal(basetype,'ngToolBar'), ref, parent);
}

if(typeof ngUserControls === 'undefined') ngUserControls = new Array();
ngUserControls['dbviewmodel'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function() {

    ngRegisterControlType('ngSysDBViewModel',(function() { var def=Create_ngSysDBViewModel; def.ControlsGroup='System'; return def; })());
    ngRegisterControlType('ngDBViewModelForm', Create_ngDBViewModelForm);
    ngRegisterControlType('ngDBDataSet', function(def, ref, parent) { return Create_ngDBDataSet(def, ref, parent); });    
    ngRegisterControlType('ngDBToolBar', function(def, ref, parent) { return Create_ngDBToolBar(def, ref, parent); });    
  }
};