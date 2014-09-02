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
  if(ds.ToggleColumnSortDir(list.Columns[colidx].ID, !ngVal(e.ctrlKey,false)))
    ds.Reset(true);
}

function ngdsc_GetColumnSortDir(id)
{
  var vm=this.ViewModel;
  if(!vm) return;
  var sortby=vm.ViewModel.SortBy.Value();
  if(ng_isEmptyOrNull(sortby)) return;

  if(id.substr(0,8)==='Columns.') id=id.substring(8,id.length);

  for(var i=0;i<sortby.length;i++)
  {
    if(sortby[i].FieldID==id) return sortby[i].SortDir;
  }
}

function ngdsc_SetColumnSortDir(id, sortdir)
{
  var vm=this.ViewModel;
  if(!vm) return false;

  if(id.substr(0,8)==='Columns.') id=id.substring(8,id.length);
  
  var i,changed=false;
  var sortby=ng_CopyVar(vm.ViewModel.SortBy.Value());
  if(ng_isEmptyOrNull(sortby)) return false;
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
  if(changed) 
  {
    var i,j,al,allowed=vm.ViewModel.AllowedSortBy.Value();
    var ok=false;
    if(ng_isEmptyOrNull(allowed)) return false;

    for(i=0;i<allowed.length;i++)
    {
      al=allowed[i];
      if((al.length>0)&&(al[0].FieldID=='*')) { ok=true; break; }
      if(al.length==sortby.length)
      {
        for(j=0;j<sortby.length;j++)
        {
          if(al[j].FieldID=='*') { j=sortby.length; break; }
          if((al[j].FieldID!=sortby[j].FieldID)||(al[j].SortDir!=sortby[j].SortDir)) break;
        }
        if(j==sortby.length) { ok=true; break; }
      }
    }
    if(ok) 
    {
      vm.ViewModel.SortBy.Value(sortby);
      return true;
    }  
  }
  return false;     
}

function ngdsc_ToggleColumnSortDir(id, clear)
{
  var vm=this.ViewModel;
  if(!vm) return;

  clear=ngVal(clear,true);
  var sortdir=ngVal(this.GetColumnSortDir(id),1);

  var oldsd=vm.ViewModel.SortBy.Value();
  if(clear) vm.ViewModel.SortBy.Value([]);
    
  if(this.SetColumnSortDir(id, sortdir==0 ? 1 : 0)) return true;
  vm.ViewModel.SortBy.Value(oldsd);
  return false;
}

function ngdsc_GetRecord(it)
{
  if((!it)||(!ng_typeObject(it.Record))) return null;
  return ng_CopyVar(it.Record);
}

function ngdsc_DrawItem(l,ret,html,it,id,level,collapsed)
{
  var ds=l.Owner.Owner;
  if(!ds) return true;
  var vm=ds.ViewModel;
  if(!vm) return true;
  var vals={ Columns: it.Record };
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
  if(ngIsFieldDef(fd))
  {
    if(ds.OnGetFieldDefValue) return ngVal(ds.OnGetFieldDefValue(ds,fd,it,col),'');
    return fd.FormatString(fd.Value());
  }
  else val=(ko.isObservable(fd) ? fd() : fd);
  return ng_toString(val);
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
  if(!vm) return [];
  var undefined;
  vm.ViewModel.Records.Value(undefined);
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
    var offset=vm.ViewModel.Offset.Value();
    var records=vm.ViewModel.Records.Value();
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
  this.Reset(true);
}

function ngdsc_ApplyFilters()
{
  this.GetRecordsCommand='applyfilters';
  this.Reset(true);
}

function ngdsc_ResetFilters()
{
  var filters=this.ViewModel.ViewModel.Filters;
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
  this.Reset(true);
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

    c.AddEvent('OnLoadData', ngdsc_LoadData);
    c.UpdateDataSetColumns();
  });

  
  /*
   *  Group: Properties
   */
  c.ViewModel = null;

  c.AutoDataSetColumns   = false;
  c.GetRecordsCommand    = 'resetfilters';

  /*
   *  Group: Methods
   */
  c.SetViewModel         = ngdsc_SetViewModel;
  c.UpdateDataSetColumns = ngdsc_UpdateDataSetColumns;

  c.GetColumnSortDir = ngdsc_GetColumnSortDir;
  c.SetColumnSortDir = ngdsc_SetColumnSortDir;
  c.ToggleColumnSortDir = ngdsc_ToggleColumnSortDir;
  
  c.GetRecord           = ngdsc_GetRecord; 

  c.ReloadDataSet       = ngdsc_ReloadDataSet; 
  c.ApplyFilters        = ngdsc_ApplyFilters; 
  c.ResetFilters        = ngdsc_ResetFilters; 

  /*
   *  Group: Events
   */
  c.OnGetFieldDefValue = null;
  c.OnSetViewModel = null;
  return c;
}

if(typeof ngUserControls === 'undefined') ngUserControls = new Array();
ngUserControls['viewmodel_dataset'] = {
  OnInit: function() {
    ngRegisterControlType('ngDataSet', function(def, ref, parent) { return Create_ngDataSet(def, ref, parent); });
  }
};   

