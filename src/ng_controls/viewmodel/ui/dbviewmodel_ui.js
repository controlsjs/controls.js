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

if(typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['dbviewmodel_ui'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function() {

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
      if(this.GetDBViewModel()!==dbvm) return;
    
      var list=this.Controls.List;
      if(changetype===dsdbLoaded)
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
          if(changetype===dsdbDeleted)
          {
            if(primarykey) {
              var sel=list.GetSelected();
              for(var i=0;i<sel.length;i++)
              {
                var itpk=this.GetRecordPrimaryKey(sel[i]);
                if(ng_VarEquals(primarykey,itpk))
                {
                  sel=sel[i];
                  list.SelectItem(sel,false);
                  if((list.SelCount===0)&&(this.AutoSelectNextOnDelete))
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
            } else {
              list.ClearSelected();
              if(this.AutoSelectNextOnDelete) {
                var found=null;
                this.ScanVisiblePageItems(function(ds,it,list,userdata) {
                  if(!found) found=it;
                  return false;
                });
                if(found) list.SelectItem(found);
              }
            }
          }
          else list.ClearSelected();
        }
        if(changetype!==dsdbNew)
        {
          this.MaxLength=void 0;
          this.InvalidateData();
        }
      }
      if(this.OnDBViewModelChanged) this.OnDBViewModelChanged(this, changetype, primarykey);
    }
    function ngdbdsc_DBVMDoDispose()
    {
      if(this.DBDataSets)
      {
        for(var i=this.DBDataSets.length-1;i>=0;i--)
          if(this.DBDataSets[i].DBViewModel===this)
            this.DBDataSets[i].SetDBViewModel(null);
      }
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
        odbvm.RemoveEvent('DoDispose',        ngdbdsc_DBVMDoDispose);
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
        dbvm.AddEvent('DoDispose',        ngdbdsc_DBVMDoDispose);
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
      if(!ds) return true;
      var dbvm=ds.GetDBViewModel();
      if((!dbvm)||(typeof dbvm.GetPrimaryKeyValues !== 'function')||(!ds.AutoSelectDBVMRecord))
      {
        delete this.__dbvmpk;
        return true;
      }
      this.__dbvmpk=dbvm.GetPrimaryKeyValues();
      return true;
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
    
    function ngdbdsc_DoDispose()
    {
      this.SetDBViewModel(null);
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
      c.AddEvent('DoDispose', ngdbdsc_DoDispose);
    
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
      c.AutoSelectNextOnDelete = true;
    
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
    
    ngRegisterControlType('ngDBViewModelForm', Create_ngDBViewModelForm);
    ngRegisterControlType('ngDBDataSet', function(def, ref, parent) { return Create_ngDBDataSet(def, ref, parent); });
    ngRegisterControlType('ngDBToolBar', function(def, ref, parent) { return Create_ngDBToolBar(def, ref, parent); });
  }
};