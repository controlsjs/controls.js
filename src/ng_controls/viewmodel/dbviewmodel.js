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
          dbf.Value=instance.GetTypedValue(false);
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
  var fd,dbf;
  if(dbfields===null) dbfields=this.AllDBFields(false);
  for(var i in dbfields)
  {
    dbf=dbfields[i];
    fd=dbf.FieldDef;
    if((notreadonly)&&(ngVal(fd.Attrs['ReadOnly'],false))) continue;
    if((notprimarykey)&&(ngVal(fd.Attrs['PrimaryKey'],false))) continue;
    dbf.Value=fd.GetTypedValue(false);
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
    LoadRecord:   function(vm,primarykeyvalues) { return c.LoadRecord(primarykeyvalues); },
    InsertRecord: function(vm,values) { return c.InsertRecord(values); },
    UpdateRecord: function(vm,values) { return c.UpdateRecord(values); },
    DeleteRecord: function(vm,primarykeyvalues) { return c.DeleteRecord(primarykeyvalues); },
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
        if(sresults.DBError!=DBVM_ERROR_DATACHANGED) delete sresults.Values; // remove server response on any DB error
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

if(typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['dbviewmodel'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function() {
    ngRegisterControlType('ngSysDBViewModel',(function() { var def=Create_ngSysDBViewModel; def.ControlsGroup='System'; return def; })());
  }
};