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

var ADODBVM_FILTERTYPE_IGNORE     = 'IGNORE';
var ADODBVM_FILTERTYPE_STARTSWITH = 'STARTSWITH';
var ADODBVM_FILTERTYPE_ENDSWITH   = 'ENDSWITH';
var ADODBVM_FILTERTYPE_CONTAINS   = 'CONTAINS';
var ADODBVM_FILTERTYPE_GT         = 'GT';
var ADODBVM_FILTERTYPE_GTE        = 'GTE';
var ADODBVM_FILTERTYPE_LT         = 'LT';
var ADODBVM_FILTERTYPE_LTE        = 'LTE';
var ADODBVM_FILTERTYPE_NOTEQ      = 'NOTEQ';
var ADODBVM_FILTERTYPE_EQ         = 'EQ';

function ngdsc_UpdateDataSetColumns()
{
  if(!this.AutoDataSetColumns) return;
  
  var list=this.Controls.List;
  if(!list) return;

  list.Columns=new Array();
  var vm=this.ViewModel;  
  if((vm)&&(vm.ViewModel)) 
  {
    var fd,col,cols=vm.ViewModel.Columns;
    for(var i in cols)
    {
      fd=cols[i];
      if((!ngIsFieldDef(fd))||(ngVal(fd.Attrs['PrimaryKey'],false))) continue;
      col=new ngListCol(fd.ID, '', fd.Attrs['DataSetColumnAlign'], fd.Attrs['DataSetColumnWidth']);
      list.Columns.push(col);
    }
  }      
  this.Update(); 
}

function ngdsc_ColumnCaption(l,col,idx)
{
  if(typeof col === 'undefined') return '';
  var txt=ngVal(col.Caption,'');
  
  var ds=l.Owner.Owner;
  if(txt=='')
  {
    var vm=ds.ViewModel;
    if(vm) 
    {
      var fd=vm.GetFieldByID(col.ID);
      if(ngIsFieldDef(fd)) txt=fd.GetDisplayName(false); 
      if(txt=='') txt=ngTxt('VM.'+vm.Namespace+'.'+col.ID,col.ID);
      if((txt==col.ID)&&(txt.substr(0,8)==='Columns.')) txt=txt.substring(8,txt.length);
    }
  }
  var sd=ds.GetColumnSortDir(col.ID);
  if(typeof sd!=='undefined')
  {
    if(l.OnRenderSortDir) txt=l.OnRenderSortDir(l,txt,sd);
    else
    {
      if(sd==0) txt+='&nbsp;&uarr;';
      else      txt+='&nbsp;&darr;'; 
    }
  }  
  return txt; 
}

function ngdsc_CaptionClick(e,list,colidx,elm)
{
  var ds=list.Owner.Owner;
  if(ds.ToggleColumnSortDir(list.Columns[colidx].ID, !ngVal(e.ctrlKey,false))) {
    if(ds.IsDynamicData()) ds.Reset(true);
  }
}

function ngdsc_DoGetSortBy()
{
  var vm=this.ViewModel;
  var sb=vm && vm.ViewModel && this.SortByVMField!='' ? vm.ViewModel[this.SortByVMField] : null;
  if(sb) sb=ko.ng_gettypedvalue(sb,false);
  if(this.OnGetSortBy) return this.OnGetSortBy(this,sb);
  return sb;
}

function ngdsc_DoSetSortBy(val)
{
  if((this.OnSetSortBy)&&(!ngVal(this.OnSetSortBy(this,val),false))) return;

  var vm=this.ViewModel;
  if((!vm)||(this.SortByVMField=='')) return;
  var sb=vm.ViewModel[this.SortByVMField];
  if(sb) ko.ng_settypedvalue(sb,val,false);
}

function ngdsc_GetColumnSortDir(id)
{
  var sortby=this.DoGetSortBy();
  if(ng_isEmptyOrNull(sortby)) return;

  if(id.substr(0,8)==='Columns.') id=id.substring(8,id.length);

  for(var i=0;i<sortby.length;i++)
  {
    if(sortby[i].FieldID==id) return sortby[i].SortDir;
  }
}

function ngdsc_IsAllowedSortBy(sortby)
{
  if(!ng_typeArray(sortby)) return false;
  var vm=this.ViewModel;
  var allowed=vm && vm.ViewModel && this.AllowedSortByVMField!='' ? vm.ViewModel[this.AllowedSortByVMField] : null;
  if(allowed) allowed=ko.ng_gettypedvalue(allowed,false);
  if(this.OnGetAllowedSortBy) allowed=this.OnGetAllowedSortBy(this,allowed);
  if(ng_isEmptyOrNull(allowed)) return false;

  var i,j,al;

  for(i=0;i<allowed.length;i++)
  {
    al=allowed[i];
    if(!ng_typeArray(al)) {
      if(ng_typeObject(al)) {
        if(ng_typeArray(al.SortBy)) al=[al.SortBy];
        else al=[al];
      }
    }
    if((al.length>0)&&(al[0].FieldID=='*')) return true;
    if(al.length==sortby.length)
    {
      for(j=0;j<sortby.length;j++)
      {
        if(!ng_typeObject(sortby[j])) return false;
        if(al[j].FieldID=='*') return true;
        if((al[j].FieldID!=sortby[j].FieldID)||(al[j].SortDir!=sortby[j].SortDir)) break;
      }
      if(j==sortby.length) return true;
    }
  }
  return false;
}

function ngdsc_SetColumnSortDir(id, sortdir, clear)
{
  if(id.substr(0,8)==='Columns.') id=id.substring(8,id.length);
  
  var i,changed=false;
  var sortby=(clear ? null : this.DoGetSortBy());
  if(ng_isEmptyOrNull(sortby)) sortby=[];
  else sortby=ng_CopyVar(sortby);

  for(i=0;i<sortby.length;i++)
  {
    if(sortby[i].FieldID==id) 
    {
      if(sortby[i].SortDir!=sortdir) changed=true;
      sortby[i].SortDir=sortdir;
      break;
    } 
  }
  if(i==sortby.length)
  {
    sortby.push({FieldID: id, SortDir: sortdir});
    changed=true;
  }
  if((changed)&&(this.IsAllowedSortBy(sortby)))
  {
    this.DoSetSortBy(sortby);
    return true;
  }
  return false;     
}

function ngdsc_ToggleColumnSortDir(id, clear)
{
  var sortdir=ngVal(this.GetColumnSortDir(id),1);
  if(this.SetColumnSortDir(id, sortdir==0 ? 1 : 0,ngVal(clear,true))) return true;
  return false;
}

function ngdsc_GetRecord(it)
{
  if(!it) return null;
  var rec=it.Record;
  if(this.OnGetRecord) rec=this.OnGetRecord(this,it);
  if(!ng_typeObject(rec)) return null;
  return ng_CopyVar(rec);
}

function ngdsc_DrawItem(l,ret,html,it,id,level,collapsed)
{
  var ds=l.Owner.Owner;
  if(!ds) return true;
  var vm=ds.ViewModel;
  if(!vm) return true;
  var rec=it.Record;
  if(ds.OnGetRecord) rec=ds.OnGetRecord(this,it);
  var vals={ Columns: rec };
  vm.SetValues(vals);    
  return true;
}

function ngdsc_ColumnText(l,it,col)
{
  if(typeof col === 'undefined') return '';
  var ds=l.Owner.Owner;
  if(!ds) return '';
  var vm=ds.ViewModel;
  if(!vm) return '';
  var fd=vm.GetFieldByID(col.ID);
  var kodd=ko.dependencyDetection.registerDependency; 
  try
  {
    // prevent dependency detection to register observables used only
    // for output formating
    ko.dependencyDetection.registerDependency=function() {};
    if(ngIsFieldDef(fd))
    {
      if(ds.OnGetFieldDefValue) return ngVal(ds.OnGetFieldDefValue(ds,fd,it,col),'');
      return fd.FormatString(ko.ng_getvalue(fd.Value));
    }
    return ng_toString(ko.isObservable(fd) ? fd() : fd);
  }
  finally {
    ko.dependencyDetection.registerDependency=kodd;
  }
}

function ngdsc_GetValues(vm,values, writableonly, valuenames, errors, convtimestamps, serialize)
{
  // Remove Columns.* which are used only for formating and do not contains any usable data
  delete values.Columns;
  var remove=[];
  for(var e in errors)
    if(e.substr(0,8)=='Columns.') remove.push(e);
  for(var r in remove) delete errors[remove[r]];
}

function ngdsc_LoadData(ds, list, idx, cnt)
{ 
  var vm=ds.ViewModel;
  if((!vm)||(!vm.ViewModel.Records)||(!ngIsFieldDef(vm.ViewModel.Offset))||(!ngIsFieldDef(vm.ViewModel.Count))) {
    return [];
  }
  var undefined;
  vm.ViewModel.Records.SetTypedValue(undefined,false);
  if(idx==999999999)
  {
    vm.ViewModel.Offset.Value(undefined);
    vm.ViewModel.Count.Value(undefined);
    vm.Command('recordcount');
  }
  else
  {
    vm.ViewModel.Offset.Value(idx);
    vm.ViewModel.Count.Value(cnt);
    if(!vm.Command(ds.GetRecordsCommand))
    {      
      ds.SetAsyncData(999999999, null); // cancel load
    }
  }
  return; // undefined
}

function ngdsc_DataLoaded(vm,cmd)
{
  var ds=vm.DataSetControl;
  if(!ds) return;
  
  if(cmd=='recordcount')
  {
    if(ng_typeNumber(vm.ViewModel.TotalCount))
    {
      ds.SetLength(vm.ViewModel.TotalCount);
    }
    delete vm.ViewModel.TotalCount;
    ds.SetAsyncData(999999999, null);
  }
  else
  {  
    ds.GetRecordsCommand = 'getrecords';    
    var offset=vm.ViewModel.Offset.GetTypedValue(false);
    var records=vm.ViewModel.Records.GetTypedValue(false);
    var data=new Array();
    if(ng_IsArrayVar(records))
      for(var i=0;i<records.length;i++)
        data[i]= { Record: records[i] };      
    ds.SetAsyncData(offset, data);
  }  
}

function ngdsc_ViewModelChanged(vm)
{
  var ds=vm.DataSetControl;
  if(ds) ds.UpdateDataSetColumns();
}

function ngdsc_ReloadDataSet()
{
  if((this.OnReloadDataSet)&&(!ngVal(this.OnReloadDataSet(this),false))) return;
  if(this.IsDynamicData()) this.Reset(true);
}

function ngdsc_ApplyFilters()
{
  this.GetRecordsCommand='applyfilters';
  if((this.OnApplyFilters)&&(!ngVal(this.OnApplyFilters(this),false))) return;
  if(this.IsDynamicData()) this.Reset(true);
}

function ngdsc_ResetFilters()
{
  var filters=this.ViewModel ? this.ViewModel.ViewModel.Filters : null;
  if(ng_typeObject(filters)) 
  {
    function resetfilters(o)
    {    
      for(var i in o)
      {
        var f=o[i];
        if(ngIsFieldDef(f))
        {
          var val=f.Value;
          if(ko.isObservable(val)) val(f.DefaultValue);
          else f.Value=f.DefaultValue;  
        }
        else if((!ko.isObservable(f))&&(ng_typeObject(f))&&(!ng_typeDate(f))) resetfilters(f);
      }
    }
    resetfilters(filters);
  }

  this.GetRecordsCommand='resetfilters';
  if((this.OnResetFilters)&&(!ngVal(this.OnResetFilters(this),false))) return;
  if(this.IsDynamicData()) this.Reset(true);
}

function ngdscvm_ReloadDataSet()
{
  var ds=this.Owner.DataSetControl;
  if(ds) ds.ReloadDataSet();
}

function ngdscvm_ApplyFilters()
{
  var ds=this.Owner.DataSetControl;
  if(ds) ds.ApplyFilters(); 
}

function ngdscvm_ResetFilters()
{
  var ds=this.Owner.DataSetControl;
  if(ds) ds.ResetFilters()
}

function ngdsc_SetViewModel(vm)
{
  if(ng_typeString(vm)) vm=getViewModelById(vm);
  if((vm)&&(vm.DataSetControl)) return;
  var ovm=this.ViewModel;
  if(ovm)
  {
    this.RemoveEvent('OnLoadData',ngdsc_LoadData);
    ovm.RemoveEvent('OnGetValues', ngdsc_GetValues);
    ovm.RemoveEvent('OnCommandData', ngdsc_DataLoaded);
    ovm.RemoveEvent('OnViewModelChanged', ngdsc_ViewModelChanged);
    delete ovm.DataSetControl;
    delete ovm.ReloadDataSet;
    delete ovm.ApplyFilters;
    delete ovm.ResetFilters;
  }
  this.ViewModel=vm;
  if(vm)
  {
    vm.DataSetControl=this;
    vm.SetViewModel(function() { 
      this.ReloadDataSet = ngdscvm_ReloadDataSet; 
      this.ApplyFilters = ngdscvm_ApplyFilters; 
      this.ResetFilters = ngdscvm_ResetFilters; 
    });

    if(!this.OnLoadData) {
      if((vm.ViewModel.Records)&&(ngIsFieldDef(vm.ViewModel.Offset))&&(ngIsFieldDef(vm.ViewModel.Count))) {
        this.OnLoadData=ngdsc_LoadData;
      }
    }
    vm.AddEvent('OnGetValues', ngdsc_GetValues);
    vm.AddEvent('OnCommandData', ngdsc_DataLoaded);
    vm.AddEvent('OnViewModelChanged', ngdsc_ViewModelChanged);
  }
  if(this.OnSetViewModel) this.OnSetViewModel(this,vm,ovm);
}


/*  Class: ngDataSet
 *  ViewModel dataset control (based on <ngPageList>).
 */
/*<>*/
function Create_ngDataSet(def, ref, parent,basetype)
{
  var c=ngCreateControlAsType(def, ngVal(basetype,'ngPageList'), ref, parent);
  if(!c) return c;

  def.OnCreated=ngAddEvent(def.OnCreated, function (c, ref) {
    var vm=ng_FindViewModel(def, c);
    if(ng_typeObject(vm)) c.SetViewModel(vm);

    var list=c.Controls.List;
    if(list) {
      c.AutoDataSetColumns=(list.Columns.length==0);

      list.AddEvent('OnGetColumnCaption', ngdsc_ColumnCaption);
      list.AddEvent('OnGetText', ngdsc_ColumnText);
      list.AddEvent('OnDrawItem', ngdsc_DrawItem);
      list.AddEvent('OnCaptionClick', ngdsc_CaptionClick);
    }

    c.UpdateDataSetColumns();
  });

  /*
   *  Group: Properties
   */
  c.ViewModel = null;

  c.AutoDataSetColumns   = false;
  c.GetRecordsCommand    = 'resetfilters';

  c.SortByVMField        = 'SortBy';
  c.AllowedSortByVMField = 'AllowedSortBy';

  /*
   *  Group: Methods
   */
  c.SetViewModel         = ngdsc_SetViewModel;
  c.UpdateDataSetColumns = ngdsc_UpdateDataSetColumns;

  c.DoGetSortBy          = ngdsc_DoGetSortBy;
  c.DoSetSortBy          = ngdsc_DoSetSortBy;
  c.IsAllowedSortBy      = ngdsc_IsAllowedSortBy;
  c.GetColumnSortDir     = ngdsc_GetColumnSortDir;
  c.SetColumnSortDir     = ngdsc_SetColumnSortDir;
  c.ToggleColumnSortDir  = ngdsc_ToggleColumnSortDir;
  
  c.GetRecord            = ngdsc_GetRecord;

  c.ReloadDataSet        = ngdsc_ReloadDataSet;
  c.ApplyFilters         = ngdsc_ApplyFilters;
  c.ResetFilters         = ngdsc_ResetFilters;

  /*
   *  Group: Events
   */
  c.OnGetFieldDefValue = null;
  c.OnSetViewModel = null;
  c.OnGetRecord = null;
  c.OnReloadDataSet = null;
  c.OnApplyFilters = null;
  c.OnResetFilters = null;
  c.OnGetSortBy = null;
  c.OnSetSortBy = null;
  c.OnGetAllowedSortBy = null;
  return c;
}

if(typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['viewmodel_dataset'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function() {
    ngRegisterControlType('ngDataSet', function(def, ref, parent) { return Create_ngDataSet(def, ref, parent); });
  }
};   

