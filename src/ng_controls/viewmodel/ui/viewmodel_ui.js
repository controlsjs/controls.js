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

/*
TODO:
- ngDataSet
  - special types rendering (checkboxes, ...)
- db struct generator

- ngCalendar selected
- two stage insert and update (sessions) and command repeat on timeout
- file(s) upload
*/

if(typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['viewmodel_ui'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function() {

    // Simple calculation based on Levenshtein distance.
    function ngca_calcEditDistMatrix(oldArray, newArray, cmpfnc, maxAllowedDistance) {
      var distances = [];
      for (var i = 0; i <= newArray.length; i++)
          distances[i] = [];

      // Top row - transform old array into empty array via deletions
      for (var i = 0, j = Math.min(oldArray.length, maxAllowedDistance); i <= j; i++)
          distances[0][i] = i;

      // Left row - transform empty array into new array via additions
      for (var i = 1, j = Math.min(newArray.length, maxAllowedDistance); i <= j; i++) {
          distances[i][0] = i;
      }

      // Fill out the body of the array
      var oldIndex, oldIndexMax = oldArray.length, newIndex, newIndexMax = newArray.length;
      var distanceViaAddition, distanceViaDeletion;
      for (oldIndex = 1; oldIndex <= oldIndexMax; oldIndex++) {
          var newIndexMinForRow = Math.max(1, oldIndex - maxAllowedDistance);
          var newIndexMaxForRow = Math.min(newIndexMax, oldIndex + maxAllowedDistance);
          for (newIndex = newIndexMinForRow; newIndex <= newIndexMaxForRow; newIndex++) {
              if (cmpfnc(oldArray[oldIndex - 1],newArray[newIndex - 1]))
                  distances[newIndex][oldIndex] = distances[newIndex - 1][oldIndex - 1];
              else {
                  var northDistance = distances[newIndex - 1][oldIndex] === undefined ? Number.MAX_VALUE : distances[newIndex - 1][oldIndex] + 1;
                  var westDistance = distances[newIndex][oldIndex - 1] === undefined ? Number.MAX_VALUE : distances[newIndex][oldIndex - 1] + 1;
                  distances[newIndex][oldIndex] = Math.min(northDistance, westDistance);
              }
          }
      }

      return distances;
    }

    function ngca_findEditScriptFromEditDistMatrix(editDistanceMatrix, oldArray, newArray) {
      var oldIndex = oldArray.length;
      var newIndex = newArray.length;
      var editScript = [];
      var maxDistance = editDistanceMatrix[newIndex][oldIndex];
      if (maxDistance === undefined)
          return null; // maxAllowedDistance must be too small
      while ((oldIndex > 0) || (newIndex > 0)) {
          var me = editDistanceMatrix[newIndex][oldIndex];
          var distanceViaAdd = (newIndex > 0) ? editDistanceMatrix[newIndex - 1][oldIndex] : maxDistance + 1;
          var distanceViaDelete = (oldIndex > 0) ? editDistanceMatrix[newIndex][oldIndex - 1] : maxDistance + 1;
          var distanceViaRetain = (newIndex > 0) && (oldIndex > 0) ? editDistanceMatrix[newIndex - 1][oldIndex - 1] : maxDistance + 1;
          if ((distanceViaAdd === undefined) || (distanceViaAdd < me - 1)) distanceViaAdd = maxDistance + 1;
          if ((distanceViaDelete === undefined) || (distanceViaDelete < me - 1)) distanceViaDelete = maxDistance + 1;
          if (distanceViaRetain < me - 1) distanceViaRetain = maxDistance + 1;

          if ((distanceViaAdd <= distanceViaDelete) && (distanceViaAdd < distanceViaRetain)) {
              editScript.push({ status: 1/*"added"*/, value: newArray[newIndex - 1] });
              newIndex--;
          } else if ((distanceViaDelete < distanceViaAdd) && (distanceViaDelete < distanceViaRetain)) {
              editScript.push({ status: 2/*"deleted"*/, value: oldArray[oldIndex - 1] });
              oldIndex--;
          } else {
              editScript.push({ status: 0/*"retained"*/, value: oldArray[oldIndex - 1] });
              newIndex--;
              oldIndex--;
          }
      }
      return editScript.reverse();
    }

    function ng_GetArraysEditScript(oldArray, newArray, cmpfnc, maxEditsToConsider) {
      if (maxEditsToConsider === undefined) {
          return ng_GetArraysEditScript(oldArray, newArray, cmpfnc, 1)                 // First consider likely case where there is at most one edit (very fast)
              || ng_GetArraysEditScript(oldArray, newArray, cmpfnc, 10)                // If that fails, account for a fair number of changes while still being fast
              || ng_GetArraysEditScript(oldArray, newArray, cmpfnc, Number.MAX_VALUE); // Ultimately give the right answer, even though it may take a long time
      } else {
          oldArray = oldArray || [];
          newArray = newArray || [];
          var editDistanceMatrix = ngca_calcEditDistMatrix(oldArray, newArray, cmpfnc, maxEditsToConsider);
          return ngca_findEditScriptFromEditDistMatrix(editDistanceMatrix, oldArray, newArray);
      }
    };

    var ngvmf_hintevents_initialized = false;

    function ngvmf_DoDispose()
    {
      this.SetViewModel(null);
      return true;
    }
    
    function ngvmf_OnCommand(vm,cmd,options)
    {
      var form=vm.ViewModelForm;
      if(form)
      {
        if((form.OnCommand)&&(!ngVal(form.OnCommand(form,cmd,options),false))) return false;
        form.ResetErrors();
      }
      return true;
    }
    
    function ngvmf_ShowControl(c,s)
    {
      if(!c) return;
      var o=c['binding_updatingVisible'];
      try
      {
        c['binding_updatingVisible']=true;
        c.SetVisible(s);
      }
      finally
      {
        if(ng_isEmpty(o)) delete c['binding_updatingVisible'];
        else c['binding_updatingVisible']=o;
      }
    }
    
    function ngvmf_EnableControl(c,s)
    {
      if(!c) return;
      var o=c['binding_updatingEnabled'];
      try
      {
        c['binding_updatingEnabled']=true;
        c.SetEnabled(s);
      }
      finally
      {
        if(ng_isEmpty(o)) delete c['binding_updatingEnabled'];
        else c['binding_updatingEnabled']=o;
      }
    }
    
    function ngvmf_IntSetChildControlsEnabled(v,p)
    {
      if(typeof this._intSetChildControlsEnabled!=='function') return;
      var o=this['binding_updatingChildEnabled'];
      var t=this.SetChildControlsEnabled;
      try
      {
        this['binding_updatingChildEnabled']=true;
        this.SetChildControlsEnabled=this._intSetChildControlsEnabled;
        this.SetChildControlsEnabled.apply(this,arguments);
      }
      finally
      {
        this.SetChildControlsEnabled=t;
        if(ng_isEmpty(o)) delete this['binding_updatingChildEnabled'];
        else this['binding_updatingChildEnabled']=o;
      }
    }
    
    function ngvmf_DoSetChildEnabled(c,v,p)
    {
      if(!v) {
        if((typeof c.SetChildControlsEnabled === 'function')&&(typeof c._intSetChildControlsEnabled === 'undefined'))
        {
          c._intSetChildControlsEnabled=c.SetChildControlsEnabled;
          c.SetChildControlsEnabled=ngvmf_IntSetChildControlsEnabled;
        }
        this.EnableControl(c,v);
      }
      else {
        this.EnableControl(c,v);
        if(typeof c._intSetChildControlsEnabled!=='undefined')
        {
          c.SetChildControlsEnabled=c._intSetChildControlsEnabled;
          delete c._intSetChildControlsEnabled;
        }
      }
    }
    
    function ngvmf_DisableControls()
    {
      if(this.disablectrlscnt<=0)
      {
        this.disablectrlscnt=0;
        if((!this.OnDisableControls)||(ngVal(this.OnDisableControls(this),false)))
          this.SetChildControlsEnabled(false);
      }
      this.disablectrlscnt++;
    }
    
    function ngvmf_EnableControls()
    {
      if(this.disablectrlscnt<=0) return;
      this.disablectrlscnt--;
      if(!this.disablectrlscnt) {
        if((!this.OnEnableControls)||(ngVal(this.OnEnableControls(this),false)))
          this.SetChildControlsEnabled(true);
      }
    }
    
    function ngvmf_OnCommandRequest(vm,rpc)
    {
      var form=vm.ViewModelForm;
      if(form)
      {
        if((form.OnCommandRequest)&&(!ngVal(form.OnCommandRequest(form,rpc),false))) return false;
    
        form.ShowLoading(true);
    
        if(form.DisableOnCommand) {
          var delay = form.DisableDelay;
          if(delay<=0) delay=1;
          if(form.disable_ctrls_timer) clearTimeout(form.disable_ctrls_timer);
          form.disable_ctrls_timer=setTimeout(function() {
            if(form.disable_ctrls_timer) clearTimeout(form.disable_ctrls_timer);
            delete form.disable_ctrls_timer;
    
            if((form.DisableOnCommand===true)||(ng_inArray(vm.ActiveCommand, form.DisableOnCommand))) {
              if((!form.OnDisableControlsCommand)||(ngVal(form.OnDisableControlsCommand(form,vm.ActiveCommand),true))) {
                form.controls_disabled=true;
                form.DisableControls();
              }
            }
          },delay);
        }
      }
      return true;
    }
    
    function ngvmf_OnCommandCancel(vm, cmd)
    {
      var form=vm.ViewModelForm;
      if(form)
      {
        if(form.OnCommandCancel) form.OnCommandCancel(form, cmd);
        if(form.disable_ctrls_timer) {
          clearTimeout(form.disable_ctrls_timer);
          delete form.disable_ctrls_timer;
        }
        else {
          if((form.controls_disabled)&&(form.DisableOnCommand)) form.EnableControls();
        }
        delete form.controls_disabled;
      }
    }
    
    function ngvmf_OnCommandError(vm,msg,cmd,options)
    {
      var form=vm.ViewModelForm;
      if(form)
      {
        if(form.OnCommandError) form.OnCommandError(form,msg,cmd,options);
        else {
          if(form.OnShowErrorMsg) form.OnShowErrorMsg(this,msg);
          else alert(msg);
        }
      }
    }
    
    function ngvmf_OnCommandResults(vm,cmd,sresults)
    {
      var form=vm.ViewModelForm;
      if(form)
      {
        if(form.OnCommandResults) form.OnCommandResults(form,cmd,sresults);
        if(form.disable_ctrls_timer) {
          clearTimeout(form.disable_ctrls_timer);
          delete form.disable_ctrls_timer;
        }
        else if((form.controls_disabled)&&(form.DisableOnCommand)) form.EnableControls();
        delete form.controls_disabled;
      }
      return true;
    }
    function ngvmf_OnCommandFinished(vm,cmd,sresults)
    {
      var form=vm.ViewModelForm;
      if(form)
      {
        form.ShowLoading(false);
        if(form.OnCommandFinished) form.OnCommandFinished(form,cmd,sresults);
      }
      return true;
    }
    
    function ngvmf_OnShowErrors(vm,errmsg,errors)
    {
      var form=vm.ViewModelForm;
      if(form) form.ShowErrors(errors);
      return false;
    }
    
    function ngvmf_FindFieldControl(fid, visibleonly, bindings, parentfielddef)
    {
      var found=this.FindFieldControls(fid, visibleonly, bindings, parentfielddef);
      if(found.length>0) return found[0];
      return null;
    }
    
    function ngvmf_FindFieldControls(fid, visibleonly, bindings, parentfielddef)
    {
      visibleonly=ngVal(visibleonly,true);
      bindings=ngVal(bindings,this.DefaultFindFieldControlsBindings);
      parentfielddef=ngVal(parentfielddef,null);
      if(this.OnFindFieldControls)
      {
        var ctrls=this.OnFindFieldControls(this,fid, visibleonly, bindings, parentfielddef);
        if(ng_IsArrayVar(ctrls)) return ctrls;
      }
      var found=[];
      if(bindings)
      {
        var b={};
        for(var j=0;j<bindings.length;j++)
          b[bindings[j]]=true;
        bindings=b;
      }
    
      function checkvalue(v,fid,parentfielddef)
      {
        var fd = (v && v.FieldDef) ? v.FieldDef : v;
        if(ngIsFieldDef(fd)) return ((fd.ID==fid)&&(ngVal(fd.Parent,null)===parentfielddef));
        return false;
      }
    
      function findfield(f)
      {
        if(!ng_typeObject(f.ChildControls)) return;
        var c,b,v,cf;
        for(var i=0;i<f.ChildControls.length;i++)
        {
          c=f.ChildControls[i];
          if((!c)||((visibleonly)&&(!c.Visible))) continue;
          if(c.DataBindings)
          {
            cf=false;
            for(var j in c.DataBindings)
            {
              if((bindings)&&(typeof bindings[j] === 'undefined')) continue;
              b=c.DataBindings[j];
              if((ng_typeObject(b))&&(b.ValueAccessor))
              {
                v=b.ValueAccessor();
                if(ng_typeArray(v))
                {
                  for(var k in v)
                  {
                    if(checkvalue(v[k],fid,parentfielddef)) { found.push(c); cf=true; break; }
                  }
                }
                else if(v)
                  if(checkvalue(v,fid,parentfielddef)) { found.push(c); cf=true; }
              }
              if(cf) break;
            }
          }
          findfield(c);
        }
      }
      findfield(this);
      return found;
    }
    
    function ngvmf_ResetErrors()
    {
      if((this.OnResetErrors)&&(!ngVal(this.OnResetErrors(this),false))) return;
    
      if(this.ErrorHint) this.ErrorHint.SetVisible(false);
    
      function reseterrors(f)
      {
        if(!ng_typeObject(f.ChildControls)) return false;
        var c;
        for(var i=0;i<f.ChildControls.length;i++)
        {
          c=f.ChildControls[i];
          if((!c)||((ng_typeObject(c.DataBindings))&&(c.DataBindings['Error']))) continue;
          if(typeof c.SetErrorState === 'function') c.SetErrorState(false);
          else
          {
            c.ErrorMessage='';
            if(typeof c.SetInvalid === 'function') c.SetInvalid(false);
          }
          reseterrors(c);
        }
        return false;
      }
      reseterrors(this);
    }
    
    var ngvmf_active_errorhints = new Array();
    
    function ngvmf_HideErrorHintEvent(e)
    {
      var hints=ngvmf_active_errorhints;
      if(hints)
        for(var i=hints.length-1;i>=0;i--)
          hints[i].SetVisible(false);
      return true;
    }
    
    function ngvmf_ErrorHintVisibleChanged(c)
    {
      var hints=ngvmf_active_errorhints;
      for(var i=0;i<hints.length;i++)
      {
        if(hints[i]==c)
        {
          if(c.Visible) return;
          hints.splice(i,1);
          return;
        }
      }
      if(c.Visible) hints.push(c);
    }
    
    function ngvmf_FocusControl(c)
    {
      if(!c) return;
      if(this.OnSetControlFocus) this.OnSetControlFocus(this,c);
      else
      {
        c.SetFocus(false);
        c.SetFocus();
      }
    }
    
    function ngvmf_ShowControlError(c,err,setfocus)
    {
      if(!c) return;
      if((err===false)||(err===null)) err='';
      err=(ng_typeString(err) ? err : ng_ViewModelFormatError(err));
      c.ErrorMessage=err;
    
      if((this.OnSetControlError)&&(!ngVal(this.OnSetControlError(this,c,err,setfocus),false))) return;
    
      if(typeof c.SetErrorState === 'function') c.SetErrorState(err!='');
      else
        if (typeof c.SetInvalid === 'function') c.SetInvalid(err!='');
    
      if(err==='')
      {
        this.HideControlError(c);
        return;
      }
      else
        if(ngVal(setfocus,false))
        {
          if(typeof c.SetErrorState !== 'function') // Not Edit field
          {
            var hint=this.GetErrorHint();
            if(hint)
            {
              if(ng_isEmpty(c.HintX)) c.HintX=0;
              if(typeof hint.SetText === 'function') hint.SetText(err);
              hint.ErrorControl=c;
              hint.ErrorMessage=err;
              hint.PopupCtrl(c);
              if(!ngvmf_hintevents_initialized)
              {
                document.onmousedown = ngAddEvent(ngvmf_HideErrorHintEvent, document.onmousedown);
                document.onkeydown = ngAddEvent(ngvmf_HideErrorHintEvent, document.onkeydown);
                ngvmf_hintevents_initialized = true;
              }
            }
          }
          this.FocusControl(c);
        }
    }
    
    function ngvmf_HideControlError(c)
    {
      var hint=this.GetErrorHint();
      if(hint)
      {
        if((!c)||(c===hint.ErrorControl)) hint.SetVisible(false);
      }
    }
    
    function ngvmf_ShowErrors(errors)
    {
      if((typeof errors==='undefined')&&(ng_typeObject(this.ViewModel))) errors=this.ViewModel.IsValid();
      if(!ng_typeObject(errors)) return false;
    
      for(var i in errors) // tests if errors exists
      {
        if(this.OnShowErrors) this.OnShowErrors(this,ng_ViewModelFormatError(errors),errors);
        else
        {
          var form=this;
    
          var msg=[],fieldcontrols=[];
          function showerrors(err)
          {
            if(!ng_typeObject(err)) return;
    
            if(!(err instanceof ngFieldDefException))
            {
              for(var i in err)
              {
                if(err[i] instanceof ngFieldDefException) showerrors(err[i]);
              }
            }
            else
            {
              var m,emsg;
    
              if(ngIsFieldDef(err.FieldDef))
              {
                var controlsfound=false;
    
                function findchildfieldcontrols(err) {
                  var lvl=0;
    
                  if(ng_typeObject(err.ChildErrors)) {
                    var cerr;
                    for(var i in err.ChildErrors) {
                      cerr=err.ChildErrors[i];
                      if(cerr instanceof ngFieldDefException) {
                        var l=findchildfieldcontrols(cerr);
                        if(l>lvl) lvl=l;
                      }
                      if(ngIsFieldDef(cerr.FieldDef)) {
                        var ctrls=form.FindFieldControls(cerr.FieldDef.ID,false,undefined,err.FieldDef);
                        if(ctrls.length>0)
                        {
                          controlsfound=true;
                          for(var j=0;j<ctrls.length;j++)
                            fieldcontrols.push({ Control: ctrls[j], Err: cerr, Level: lvl});
                        }
                      }
                    }
                    lvl++;
                  }
                  return lvl;
                }
                var lvl=findchildfieldcontrols(err);
    
                var ctrls=form.FindFieldControls(err.FieldDef.ID,false);
                if(ctrls.length>0)
                {
                  controlsfound=true;
                  for(var j=0;j<ctrls.length;j++)
                    fieldcontrols.push({ Control: ctrls[j], Err: err, Level: lvl});
                }
                if(controlsfound) return;
    
                dn=ng_Trim(err.FieldDef.GetDisplayName());
                if(dn.length>0)
                {
                  if(dn.charAt(dn.length-1)!=':') dn+=': ';
                  else dn+=' ';
                }
                emsg=ng_ViewModelFormatError(err);
              }
              else
              {
                emsg=ng_ViewModelFormatError(err);
                if(ng_typeString(err.FieldDef)) dn=err.FieldDef+': ';
                else dn='';
              }
              if((ng_typeString(emsg))&&(emsg!==''))
              {
                m=dn+emsg;
                if(!ng_inArray(m,msg)) msg.push(m);
              }
              if(ng_typeObject(emsg))
              {
                for(var j in emsg)
                {
                  m=dn+emsg[j]
                  if(!ng_inArray(m,msg)) msg.push(m);
                }
              }
            }
          }
          showerrors(errors);
          if(fieldcontrols.length>0)
          {
            var focuscontrol=[];
            function focusfield(f)
            {
              if(!ng_typeObject(f.ChildControls)) return false;
              var c;
              for(var i=0;i<f.ChildControls.length;i++)
              {
                c=f.ChildControls[i];
                if((!c)||(!c.Visible)) continue;
                for(var j=0;j<fieldcontrols.length;j++)
                {
                  if(c===fieldcontrols[j].Control)
                  {
                    var p=c.ParentControl;
                    while(p)
                    {
                      if(!p.Visible) break;
                      p=p.ParentControl;
                    }
                    if(!p)
                    {
                      focuscontrol[fieldcontrols[j].Level]=j;
                      if(!fieldcontrols[j].Level) return true;
                    }
                  }
                }
                if(focusfield(c)) return true;
              }
              return false;
            }
            focusfield(this);
    
            if(!focuscontrol.length)
            {
              var focusfound=false;
              if((this.OnSetControlVisible)&&(ngVal(this.OnSetControlVisible(this,fieldcontrols[0].Control),false)))
              {
                focusfield(this);
                focusfound=true;
              }
    
              if(!focusfound)
              {
                var err,dn,m;
                for(var i=0;i<fieldcontrols.length;i++)
                {
                  err=fieldcontrols[i].Err;
                  dn=ng_Trim(err.FieldDef.GetDisplayName());
                  if(dn.length>0)
                  {
                    if(dn.charAt(dn.length-1)!=':') dn+=': ';
                    else dn+=' ';
                  }
                  var emsg=ng_ViewModelFormatError(err);
                  if((ng_typeString(emsg))&&(emsg!==''))
                  {
                    m=dn+emsg;
                    if(!ng_inArray(m,msg)) msg.push(m);
                  }
                  if(ng_typeObject(emsg))
                  {
                    for(var j in emsg)
                    {
                      m=dn+emsg[j]
                      if(!ng_inArray(m,msg)) msg.push(m);
                    }
                  }
                }
              }
            }
    
            var fc=-1;
            for(var j=0;j<focuscontrol.length;j++)
              if(typeof focuscontrol[j]!=='undefined') { fc=focuscontrol[j]; break; }
    
            for(var j=0;j<fieldcontrols.length;j++)
              if(j!=fc) this.ShowControlError(fieldcontrols[j].Control,fieldcontrols[j].Err);
    
            if(fc>=0) this.ShowControlError(fieldcontrols[fc].Control,fieldcontrols[fc].Err,true);
          }
          if(msg.length>0)
          {
            msg=msg.join("\n");
            if(this.OnShowErrorMsg) form.OnShowErrorMsg(this,msg);
            else alert(msg);
          }
        }
        return true;
      }
      return false;
    }
    
    function ngvmf_SetViewModel(vm)
    {
      if(ng_typeString(vm)) vm=getViewModelById(vm);
      if((vm)&&(vm.ViewModelForm)) return;
      var ovm=this.ViewModel;
      if(ng_typeObject(ovm))
      {
        if(typeof ovm.RemoveEvent === 'function') { // check if not pure ViewModel
          ovm.RemoveEvent('OnShowErrors',ngvmf_OnShowErrors);
          ovm.RemoveEvent('OnCommand',ngvmf_OnCommand);
          ovm.RemoveEvent('OnCommandRequest',ngvmf_OnCommandRequest);
          ovm.RemoveEvent('OnCommandResults',ngvmf_OnCommandResults);
          ovm.RemoveEvent('OnCommandFinished',ngvmf_OnCommandFinished);
          ovm.RemoveEvent('OnCommandCancel',ngvmf_OnCommandCancel);
          ovm.RemoveEvent('OnCommandError',ngvmf_OnCommandError);
        }
        delete ovm.ViewModelForm;
      }
      this.ViewModel=vm;
      if(ng_typeObject(vm))
      {
        vm.ViewModelForm=this;
        if(typeof vm.AddEvent === 'function') { // check if not pure ViewModel
          vm.AddEvent('OnShowErrors',ngvmf_OnShowErrors);
          vm.AddEvent(ngvmf_OnCommand,'OnCommand');
          vm.AddEvent('OnCommandRequest',ngvmf_OnCommandRequest);
          vm.AddEvent('OnCommandResults',ngvmf_OnCommandResults);
          vm.AddEvent('OnCommandFinished',ngvmf_OnCommandFinished);
          vm.AddEvent('OnCommandCancel',ngvmf_OnCommandCancel);
          vm.AddEvent('OnCommandError',ngvmf_OnCommandError);
        }
      }
      if(this.OnSetViewModel) this.OnSetViewModel(this,vm,ovm);
    }
    
    function ngvmf_ShowLoading(v)
    {
      if((v)&&(this.OnShowLoading)) { this.OnShowLoading(this); return; }
      if((!v)&&(this.OnHideLoading)) { this.OnHideLoading(this); return; }
    
      if(ng_typeObject(this.Controls)&&(typeof this.Controls.Loading === 'object')&&(typeof this.Controls.Loading.SetVisible === 'function')) this.Controls.Loading.SetVisible(v);
    }
    
    function ngvmf_GetErrorHint()
    {
      if(!this.ErrorHint)
      {
        var ldefs = {
          ErrorHint: this.ErrorHintDef
        };
        var lref=ngCreateControls(ldefs,undefined,ngApp ? ngApp.TopElm() : undefined);
        this.ErrorHint=ngVal(lref.ErrorHint,null);
        if(this.ErrorHint)
        {
          ngAddChildControl(this,this.ErrorHint);
          this.ErrorHint.AddEvent(ngvmf_ErrorHintVisibleChanged,'OnVisibleChanged');
        }
      }
      return this.ErrorHint;
    }
    
    /*  Class: ngViewModelForm
     *  View model form control (based on <ngFrame>).
     */
    /*<>*/
    function Create_ngViewModelForm(def, ref, parent)
    {
      ng_MergeDef(def, {
        ParentReferences: false,
        ErrorHint: {
          Type: 'ngTextHint',
          ParentReferences: false,
          Data: {
            IsPopup: true
          }
        }
      });
      var c=ngCreateControlAsType(def, 'ngFrame', ref, parent);
      if(!c) return c;
    
      def.OnCreated=ngAddEvent(def.OnCreated, function (c, ref) {
        if(typeof c.FormID === 'undefined') c.FormID=c.ID; // make default buttons in form
    
        var vm=null;
        if(typeof def.ViewModel === 'undefined')
        {
          if((c.Controls)&&(c.Controls.ViewModel)) vm=c.Controls.ViewModel;
        }
        if(!ng_typeObject(vm)) vm=ng_FindViewModel(def, c);
        if(ng_typeObject(vm)) c.SetViewModel(vm);
    
      });
    
      c.disablectrlscnt=0;
    
      /*
       *  Group: Properties
       */
      c.DefaultFindFieldControlsBindings=['Data','Value','Checked','Selected','Lookup','Error','Link'];
    
      c.ErrorHintDef = def.ErrorHint;
      c.ErrorHint = null;
    
      c.DisableOnCommand = true;
      c.DisableDelay = 1;
    
      c.ChildHandling = 1; // ngChildEnabledParentAware
      /*
       *  Group: Methods
       */
      c.DoDispose = ngvmf_DoDispose;
      c.DoSetChildEnabled = ngvmf_DoSetChildEnabled;
    
      c.GetErrorHint = ngvmf_GetErrorHint;
      c.DisableControls = ngvmf_DisableControls;
      c.EnableControls = ngvmf_EnableControls;
      c.EnableControl = ngvmf_EnableControl;
      c.ShowControl = ngvmf_ShowControl;
    
      c.FindFieldControl = ngvmf_FindFieldControl;
      c.FindFieldControls = ngvmf_FindFieldControls;
    
      c.FocusControl = ngvmf_FocusControl;
      c.ShowControlError = ngvmf_ShowControlError;
      c.HideControlError = ngvmf_HideControlError;
    
      c.SetViewModel = ngvmf_SetViewModel;
      c.ResetErrors = ngvmf_ResetErrors;
      c.ShowErrors = ngvmf_ShowErrors;
      c.ShowLoading = ngvmf_ShowLoading;
    
      /*
       *  Group: Events
       */
      c.OnSetViewModel = null;
      c.OnResetErrors = null;
      c.OnShowErrors = null;
    
      c.OnFindFieldControls = null;
      c.OnSetControlError = null;
    
      c.OnSetControlVisible = null;
      c.OnSetControlFocus = null;
    
      c.OnShowLoading = null;
      c.OnHideLoading = null;
      c.OnShowErrorMsg = null;
    
      c.OnDisableControlsCommand = null;
      c.OnDisableControls = null;
      c.OnEnableControls = null;
    
      c.OnCommand = null;
      c.OnCommandRequest = null;
      c.OnCommandResults = null;
      c.OnCommandFinished = null;
      c.OnCommandCancel = null;
      c.OnCommandError = null;
    
      return c;
    }    
    ngRegisterControlType('ngViewModelForm', function(def, ref, parent) { return Create_ngViewModelForm(def, ref, parent); });

    function ngve_GetFieldDefs()
    {
      var fdefs=[];
      if(this.DataBindings)
      {
        var bind;
        for(var i=0;i<this.ErrorBindings.length;i++)
        {
          bind=this.DataBindings[this.ErrorBindings[i]];
          if(ng_typeObject(bind))
          {
            var v=bind.ValueAccessor();
            if((v)&&(ng_typeObject(v.FieldDef))) fdefs.push(v.FieldDef);
          }
        }
      }
      return fdefs;
    }
    
    function ngve_Validate()
    {
      var err,fd,singleerr;
      var errs={};
      var fdefs=this.GetFieldDefs();
      for(var i=0;i<fdefs.length;i++)
      {
        fd=fdefs[i];
        err=fd.Validate(fd.Value());
        if(err===true) continue;
        if(ng_isEmpty(singleerr)) singleerr=err;
        else singleerr=null;
        errs[fd.ID]=err;
      }
      if(ng_isEmpty(singleerr)) return true;
      if(singleerr!==null) return singleerr;
      return errs;
    }
    
    
    function ngve_GetErrorHint()
    {
      if(!this.ErrorHint)
      {
        var ldefs = {
          ErrorHint: this.ErrorHintDef
        };
        var lref=ngCreateControls(ldefs,undefined,ngApp ? ngApp.TopElm() : undefined);
        this.ErrorHint=ngVal(lref.ErrorHint,null);
        if(this.ErrorHint) {
          var self=this;
          this.ErrorHint.AddEvent('OnIsInsidePopup', function (h,t,w,pi) {
            return (ngGetControlByElement(t)===self);
          });
          ngAddChildControl(this,this.ErrorHint);
        }
      }
      return this.ErrorHint;
    }
    
    function ngve_ShowErrorHint(msg)
    {
      msg=ngVal(msg,this.ErrorMessage);
      if(ng_EmptyVar(msg))
      {
        this.HideErrorHint();
        this.ErrorMessage='';
        return;
      }
      this.ErrorMessage=msg;
      this.SetErrorState(true);
    
      if((this.OnShowErrorHint)&&(!ngVal(this.OnShowErrorHint(this,msg),false))) return;
    
      var hint=this.GetErrorHint();
      if(!hint) return;
      if(typeof hint.SetText === 'function')
      {
        if(ng_IsArrayVar(msg)) msg=msg.join("<br/>");
        hint.SetText(msg);
      }
      hint.PopupCtrl(this);
    }
    
    function ngve_HideErrorHint()
    {
      if((this.OnHideErrorHint)&&(!ngVal(this.OnHideErrorHint(this),false))) return;
      if(this.ErrorHint) this.ErrorHint.SetVisible(false);
    }
    
    function ngve_SetErrorState(state)
    {
      if(this.ErrorState == state) return;
    
      if((this.OnSetErrorState)&&(!ngVal(this.OnSetErrorState(this,state),false))) return;
    
      this.ErrorState = state;
    
      if(!state)
      {
        this.HideErrorHint();
        this.ErrorMessage='';
      }
      if(typeof this.SetInvalid === 'function') this.SetInvalid(state ? true : false);
    }
    
    function ngve_SetEditText(t)
    {
      var oldedittext=this.__setEditText;
      this.__setEditText=true;
      try
      {
        this.SetText(t);
      }
      finally
      {
        if(!oldedittext) delete this.__setEditText;
      }
    }
    
    /*  Class: ngEditField
     *  Edit field control (based on <ngEdit>).
     */
    /*<>*/
    function Create_EditField(def, ref, parent, modtype)
    {
      ng_MergeDef(def, {
        ErrorHint: {
          Type: 'ngTextHint',
          ParentReferences: false,
          Data: {
            IsPopup: true
          }
        },
        Data: {
          ErrorMessage: '',    
          ErrorState: false,        
          ErrorBindings: [ 'Value', 'Lookup' ]
        },
        Methods: {
          GetFieldDefs: ngve_GetFieldDefs,
          GetErrorHint: ngve_GetErrorHint,
        
          ShowErrorHint: ngve_ShowErrorHint,
          HideErrorHint: ngve_HideErrorHint,
          SetErrorState: ngve_SetErrorState,
          Validate: ngve_Validate,
          SetEditText: ngve_SetEditText,

          DoMouseDown: function(e) {
            if((c.HasFocus)||(!c.ErrorState))
              ng_CallParent(c,'DoMouseDown',arguments);
          },
          DropDown: function() {
            var oldignoreerror=c.__ignoreerror;
            c.__ignoreerror=true;
            try {
              var ret=ng_CallParent(c,'DropDown',arguments,false);
            }
            finally {
              if(oldignoreerror) delete c.__ignoreerror;
            }
            return ret;
          }
        },
        Events: {
          OnSetErrorState: null,
          OnShowErrorHint: null,
          OnHideErrorHint: null    
        }
      });

      var c=ngCreateControlAsType(def, modtype, ref, parent);
      if(!c) return c;
    
      c.ErrorHint = null;
      c.ErrorHintDef = def.ErrorHint;
        
      def.OnCreated=ngAddEvent(def.OnCreated, function (c, ref) {
        c.AddEvent('OnFocus', function(c) {
          if(c.ErrorState) {
            if(ng_EmptyVar(c.ErrorMessage))
            {
              var errors=c.Validate();
              if(errors!==true) c.ShowErrorHint(ng_ViewModelFormatError(errors));
              else c.SetErrorState(false);
            }
            else c.ShowErrorHint();
          }
          return true;
        });
        c.AddEvent('OnBlur', function(c) {
          if((ng_EmptyVar(c.ErrorMessage))&&(!c.__ignoreerror))
          {
            var errors=c.Validate();
            if(errors!==true) c.SetErrorState(true);
          }
          c.HideErrorHint();
          return true;
        });
        c.AddEvent('OnTextChanged', function (c,t) {
          if(!this.__setEditText)
            c.SetErrorState(false);
        });
      });
      return c;
    }    
    ngRegisterControlMod('ngEditField', 'ngEdit', Create_EditField);

    /*  Class: ngEditNumField
     *  Edit number field control (based on <ngEditNum>).
     */
    /*<>*/
    ngRegisterControlMod('ngEditNumField', ['ngEditField','ngEditNum'], function(def, ref, parent, modtype)
    {
      var c=ngCreateControlAsType(def, modtype, ref, parent);
      if(!c) return c;

      c.AddEvent('OnGetNum',function(c) {
        var txt=c.GetText();
        var bind=(c.DataBindings ? c.DataBindings.Value : null);
        if(bind)
          return ng_toNumber(ngCtrlBindingParseString(bind.ValueAccessor,txt));
        var n=parseInt(txt);
        if(isNaN(n)) return undefined;

        if((typeof c.MinNum !== 'undefined')&&(n<c.MinNum)) n=c.MinNum;
        if((typeof c.MaxNum !== 'undefined')&&(n>c.MaxNum)) n=c.MaxNum;
        return n;
      });
      c.AddEvent('OnSetNum',function(c,n) {
        if((typeof c.MinNum !== 'undefined')&&(n<c.MinNum)) n=c.MinNum;
        if((typeof c.MaxNum !== 'undefined')&&(n>c.MaxNum)) n=c.MaxNum;

        var bind=(c.DataBindings ? c.DataBindings.Value : null);
        if(bind)
        {
          var modelValue = bind.ValueAccessor();
          if(ko.isObservable(modelValue))
          {
            if (ko.isWriteableObservable(modelValue))
            {
              modelValue(n);
              return;
            }
          }
        }
        c.SetText(''+n);
      });

      return c;
    });

    if(ngUserControls['calendar'])
    {
      /*  Class: ngEditDateField
       *  Edit date field control (based on <ngEditDate>).
       */
      /*<>*/
      ngRegisterControlMod('ngEditDateField', 'ngEditDate', Create_EditField);

      /*  Class: ngEditTimeField
       *  Edit time field control (based on <ngEditTime>).
       */
      /*<>*/
      ngRegisterControlMod('ngEditTimeField', 'ngEditTime', Create_EditField);
    }

    /*  Class: ngDropDownField
     *  Dropdown field control (based on <ngDropDown>).
     */
    /*<>*/
    ngRegisterControlMod('ngDropDownField', 'ngDropDown', Create_EditField);

    /*  Class: ngDropDownListField
     *  Dropdown list field control (based on <ngDropDownList>).
     */
    /*<>*/
    ngRegisterControlMod('ngDropDownListField', 'ngDropDownList', Create_EditField);

    /*  Class: ngMemoField
     *  Memo field control (based on <ngMemo>).
     */
    /*<>*/
    ngRegisterControlMod('ngMemoField', 'ngMemo', Create_EditField);


    /* Bindings */

    function update_text(c,valueAccessor,ngtxt)
    {
      if(typeof c.SetText === 'function')
      {
        ngCtrlBindingRead('Text',c,valueAccessor,function(val) {
          var txt=ngCtrlBindingFormatString(valueAccessor,val);
          if(ngtxt) txt=ngTxt(txt);
          c.SetText(txt);
        });
      }
    }

    function init_text(c,valueAccessor, allBindingsAccessor,viewModel)
    {
      if(typeof c.SetText === 'function')
        c.AddEvent(function(val) {
          var txt=ngCtrlBindingParseString(valueAccessor,val);
          ngCtrlBindingWrite('Text',txt,c, valueAccessor, allBindingsAccessor);
        },'SetText');
    };

    ngRegisterBindingHandler('Text', function (c, valueAccessor) {
      update_text(c,valueAccessor,false);
    },init_text);
    ngRegisterBindingHandler('ngText', function (c, valueAccessor) {
      update_text(c,valueAccessor,true);
    },init_text);

    function update_textproperty(propid,c,valueAccessor,ngtxt)
    {
      if(typeof c[propid] === 'undefined') return;
      var val=ng_toString(ko.utils.unwrapObservable(valueAccessor()));
      var txt=ngCtrlBindingFormatString(valueAccessor,val);
      if(ngtxt) txt=ngTxt(txt);
      if(txt!=c[propid])
      {
        c[propid]=txt;
        c.Update();
      }
    }

    ngRegisterBindingHandler('Alt', function (c, valueAccessor) {
      update_textproperty('Alt',c,valueAccessor,false);
    });
    ngRegisterBindingHandler('ngAlt', function (c, valueAccessor) {
      update_textproperty('Alt',c,valueAccessor,true);
    });
    ngRegisterBindingHandler('Hint', function (c, valueAccessor) {
      update_textproperty('Hint',c,valueAccessor,false);
    });
    ngRegisterBindingHandler('ngHint', function (c, valueAccessor) {
      update_textproperty('Hint',c,valueAccessor,true);
    });

    ngRegisterBindingHandler('ReadOnly', function (c, valueAccessor) {
      var val=ng_toBool(ko.utils.unwrapObservable(valueAccessor()));
      if(typeof c.SetReadOnly === 'function')
        c.SetReadOnly(val);
      else
      {
        if(val!=ngVal(c.ReadOnly,false))
        {
          c.ReadOnly=val;
          c.Update();
        }
      }
    });

    ngRegisterBindingHandler('Invalid',
      function (c, valueAccessor) {
        if(typeof c.SetInvalid === 'function')
        {
          ngCtrlBindingRead('Invalid',c,valueAccessor,function(val) {
            c.SetInvalid(ng_toBool(val));
          });
        }
      },
      function (c, valueAccessor, allBindingsAccessor,viewModel) {
        if(typeof c.SetInvalid === 'function')
          c.AddEvent(function(v) {
            ngCtrlBindingWrite('Invalid',v,c, valueAccessor, allBindingsAccessor);
          },'SetInvalid');
      }
    );

    ngRegisterBindingHandler('Valid',
      function (c, valueAccessor) {
        if(typeof c.SetInvalid === 'function') {
          ngCtrlBindingRead('Invalid',c,valueAccessor,function(val) {
            c.SetInvalid(ng_toBool(val));
          });
        }
      },
      function (c, valueAccessor, allBindingsAccessor,viewModel) {
        if(typeof c.SetInvalid === 'function')
          c.AddEvent(function(v) {
            ngCtrlBindingWrite('Invalid',!v,c, valueAccessor, allBindingsAccessor);
          },'SetInvalid');
      }
    );

    ngRegisterBindingHandler('OnClick', null,
      function (c, valueAccessor, allBindingsAccessor, viewModel) {
        var fnc = function (event) {
          var handlerFunction = valueAccessor();
          if(ng_typeString(handlerFunction)) handlerFunction=viewModel[handlerFunction];
          if (!handlerFunction) return true;
          //var allBindings = allBindingsAccessor();

          var argsForHandler = ko.utils.makeArray(arguments);
          argsForHandler.unshift(viewModel);
          return handlerFunction.apply(viewModel, argsForHandler);
        }
        c.AddEvent('OnClick', fnc);
      }
    );

    function isMenu(list) {
      return (typeof list.HideSubMenu==='function');
    }

    function vmPrepareCompareKeys(props) {
      if(typeof props!=='object') return;
      var keys={};
      for(var i in props) keys[props[i]]=true;
      return keys;
    }

    function vmPrepareItemMapping(c, bindinfo, mapping, allBindingsAccessor)
    {
      if(!ng_typeObject(mapping)) return;
      var map={}, revmap={}, p;

      if(typeof window.ngOnVMPrepareListItemMapping === 'function') {
        mapping=ng_CopyVar(mapping);
        window.ngOnVMPrepareListItemMapping(c, mapping, allBindingsAccessor);
      }

      for(var i in mapping) {
        p=mapping[i];
        if((!p)||(p=='')) continue;
        if(p===true) p=i;
        map[i]=p;
        revmap[p]=i;
      }

      bindinfo.ItemMapping = map;
      bindinfo.RevItemMapping = revmap;
    }

    // add value to array if not exists
    function arr_push_uniq(arr, val, copy) {
      for(var i=arr.length-1;i>=0;i--) {
        if(ng_VarEquals(arr[i], val)) return false;
      }
      if(copy) arr.push(ng_CopyVar(val));
      else arr.push(val);
      return true;
    }

    function arr_remove(arr, val, uniq) {
      var ret=false;
      for(var i=arr.length-1;i>=0;i--) {
        if(ng_VarEquals(arr[i], val)) {
          arr.splice(i,1);
          ret=true;
          if(uniq) return true;
        }
      }
      return ret;
    }

    function arr_sync(arr1,arr2) {
      var i,j,found;
      var changed=false;
      for(i=0;i<arr1.length;i++)
      {
        found=false;
        for(j=arr2.length-1;j>=0;j--) {
          if(ng_VarEquals(arr1[i],arr2[j])) {
            arr2.splice(j,1);
            found=true;
          }
        }
        if(!found) { arr1.splice(i,1); i--; changed=true; }
      }
      for(j=0;j<arr2.length;j++) {
        arr1.push(ng_CopyVar(arr2[j]));
        changed=true;
      }
      return changed;
    }

    function vmGetListItem(list,v,bindinfo,subitems) {
      if((typeof v==='undefined')||(v===null)) return v;
      var c=v;
      v=ko.ng_unwrapobservable(c);

      if((!ng_typeObject(v))||(ng_typeDate(v))) {
        if(typeof bindinfo.SimpleArrayItemColumnID!=='undefined') {
          var it={ Text: {}, _vmSimpleArrayItem: true };
          it.Text[bindinfo.SimpleArrayItemColumnID]=v;
          return it;
        }
        return {Text: v, _vmSimpleArrayItem: true };
      }

      if(bindinfo.RevItemMapping) {
        var p,nv={};
        for(var i in v) {
          p=bindinfo.RevItemMapping[i];
          if(p) nv[p]=v[i];
        }
        v=nv;
      }

      var ismenu=isMenu(list);
      var iswriteable=ko.isWriteableObservable(c);

      var items,submenu;
      if(typeof v.Items!=='undefined') {
        items=v.Items;
        v.Items=null;
      }
      if((ismenu)&&(typeof v.SubMenu!=='undefined')) {
        submenu=v.SubMenu;
        v.SubMenu=null;
      }
      c=ko.ng_getvalue(v);
      if(items) v.Items=items;
      if(submenu) v.SubMenu=submenu;

      if(v===c) c=ng_CopyVar(v);
      else {
        if(iswriteable) {
          if(ko.isObservable(v.Checked))   c._vmChecked=v.Checked;
          if(ko.isObservable(v.Collapsed)) c._vmCollapsed=v.Collapsed;
        }
      }
      //console.log(v);

      if(subitems!==false) {
        if(ko.isObservable(items)) items=items();
        if(ng_IsArrayVar(items)) {
          c.Items=[];
          for(var i in items)
            c.Items[i]=vmGetListItem(list,items[i],bindinfo);
        }
        else delete c.Items;

        if(ismenu) {
          if(ko.isObservable(submenu)) submenu=submenu();
          if(ng_IsArrayVar(submenu)) {
            c.SubMenu=[];
            for(var i in submenu)
              c.SubMenu[i]=vmGetListItem(list,submenu[i],bindinfo);
          }
          else delete c.SubMenu;
        }
      }
      else {
        if(v!==c) {
          if(items) c.Items=items;
          if(submenu) c.SubMenu=submenu;
        }
      }
      return c;
    }

    function vmSetListItem(list,vmit,it,bindinfo,syncsubitems) {

      var vmval=ko.ng_unwrapobservable(vmit);
      if((vmval!==vmit)&&(!ko.isWriteableObservable(vmit))) return vmit;

      if(!ng_typeObject(vmval)) {

        if((bindinfo.SimpleArray)||(it._vmSimpleArrayItem)) {
          if(typeof bindinfo.SimpleArrayItemColumnID!=='undefined') {
            it=it.Text[bindinfo.SimpleArrayItemColumnID];
          }
          else it=it.Text;
        }

        if(vmval!==vmit) {
          vmit(it);
          return vmit;
        }
        if(!ng_typeObject(it)) return it;
        if(vmval!==vmit) vmval={};
        else {
          vmit=vmval={};
        }
      }

      var ismenu=isMenu(list);
      var pitems,psubmenu,p;
      if(bindinfo.ItemMapping)
      {
        pitems=bindinfo.ItemMapping['Items'];
        if(ismenu) psubmenu=bindinfo.ItemMapping['SubMenu'];
      }
      else {
        pitems='Items';
        if(ismenu) psubmenu='SubMenu';
      }

      var ex={};
      // Don't touch original Items/SubMenu
      if(pitems) ex[pitems]=true;
      if((ismenu)&&(psubmenu)) ex[psubmenu]=true;

      if((vmit!==vmval)&&(typeof vmit.valueWillMutate === 'function')) vmit.valueWillMutate();
      for(var i in it) {
        switch(i) {
          case 'Items':
          case 'Parent':
          case 'Controls':
          case 'ControlsHolder':
          case '_byRef':
          case '_vmChecked':
          case '_vmCollapsed':
          case '_vmSimpleArrayItem':
            break;
          default:
            if(ismenu){
              if(
                (i==='SubMenu')
                || ((i==='OnClick')&&(it.OnClick===ngmn_OnClick))
                || ((i==='OnGetText')&&(it.OnGetText===ngmn_GetResText))
              ) break;
            }

            if(bindinfo.ItemMapping) {
              p=bindinfo.ItemMapping[i];
              if(!p) break;
            }
            else p=i;
            ex[p]=true;
            vmval[p]=ko.ng_setvalue(vmval[p],it[i]);
            break;
        }
      }
      var nv,delkeys={}
      for(var i in vmval) {
        if((ex[i])||(ko.isObservable(vmval[i]))) continue;
        if((ng_typeObject(vmval[i]))&&(!ng_typeDate(vmval[i]))) {
          nv=ko.ng_getvalue(vmval[i]); // detect if object has observables
          if(nv!==vmval[i]) {
            continue;
          }
        }
        delkeys[i]=true;
      }
      for(var i in delkeys) delete vmval[i];

      var items=it.Items;
      var vitems=pitems ? vmval[pitems] : null;

      if(ng_IsArrayVar(items)) {
        if(ko.isObservable(vitems)) {
          if(ko.isWriteableObservable(vitems)) {
            var aitems=vitems();
            var isarray=true;
            if(!ng_IsArrayVar(aitems)) { aitems=[]; isarray=false; }
            if(typeof vitems.valueWillMutate === 'function') vitems.valueWillMutate();
            syncsubitems(aitems,items,list);
            if((isarray)&&(typeof vitems.valueHasMutated === 'function')) vitems.valueHasMutated();
            else vitems(aitems);
          }
        }
        else {
          if(!ng_IsArrayVar(vitems)) {
            vitems=[];
            vmval[pitems]=vitems;
          }
          syncsubitems(vitems,items,list);
        }
      }
      else {
        if(ko.isObservable(vitems)) {
          if(ko.isWriteableObservable(vitems)) {
            var undefined;
            vitems(undefined);
          }
        }
        else delete vmval[pitems];
      }

      if(ismenu) {
        var submenu=(it.SubMenu && isMenu(it.SubMenu) ? it.SubMenu.Items : null);
        var vsubmenu=psubmenu ? vmval[psubmenu] : null;

        if(ng_IsArrayVar(submenu)) {
          if(ko.isObservable(vsubmenu)) {
            if(ko.isWriteableObservable(vsubmenu)) {
              var asubmenu=vsubmenu();
              var isarray=true;
              if(!ng_IsArrayVar(asubmenu)) { asubmenu=[]; isarray=false; }
              if(typeof vsubmenu.valueWillMutate === 'function') vsubmenu.valueWillMutate();
              syncsubitems(asubmenu,submenu,it.SubMenu);
              if((isarray)&&(typeof vsubmenu.valueHasMutated === 'function')) vsubmenu.valueHasMutated();
              else vsubmenu(asubmenu);
            }
          }
          else {
            if(!ng_IsArrayVar(vsubmenu)) {
              vsubmenu=[];
              vmval[psubmenu]=vsubmenu;
            }
            syncsubitems(vsubmenu,submenu,it.SubMenu);
          }
        }
        else {
          if(ko.isObservable(vsubmenu)) {
            if(ko.isWriteableObservable(vsubmenu)) {
              var undefined;
              vsubmenu(undefined);
            }
          }
          else delete vmval[psubmenu];
        }
      }

      if(bindinfo.ItemMapping) {
        var p,nvmit={},keys={};
        for(var i in vmit)
        {
          p=bindinfo.ItemMapping[i];
          if(p) {
            nvmit[p]=vmit[i];
            keys[i]=true;
          }
        }
        for(var i in keys) delete vmit[i];
        for(var i in nvmit) vmit[i]=nvmit[i];
      }

      if(vmit!==vmval) {
        if(typeof vmit.valueHasMutated === 'function') vmit.valueHasMutated();
        else vmit(vmval);
      }
      return vmit;
    }

    function register_listchanges(c, list, menubar)
    {
      if(list._VMChangesRegistered) return;
      list._VMChangesRegistered=true;

      list.AddEvent(function() {
        if((c.need_vmupdate)&&(c.update_cnt<=1)) {
          var oldupcnt=c.update_cnt;
          c.update_cnt=0; // force listupdate()
          try {
            c.UpdateVMValues();
          } finally {
            c.update_cnt=oldupcnt;
          }
        }
      },'EndUpdate');
      list.AddEvent(function(l,items) {
        c.UpdateVMValues();
      },'OnItemsChanged');

      if((c!==list)||(!menubar)) {
        list.AddEvent(function(l,it) {
          if((c._vmdispose)||(it._vmSimpleArrayItem)) return;
          if(ko.isObservable(it._vmCollapsed)) {
            if(!ko.isWriteableObservable(it._vmCollapsed)) return;
              ngCtrlBindingLock('Value',c,function() {
                it._vmCollapsed(true);
              });
          }
          else c.UpdateVMValues();
        },'OnCollapsed');
        list.AddEvent(function(l,it) {
          if((c._vmdispose)||(it._vmSimpleArrayItem)) return;
          if(ko.isObservable(it._vmCollapsed)) {
            if(!ko.isWriteableObservable(it._vmCollapsed)) return;
            ngCtrlBindingLock('Value',c,function() {
              it._vmCollapsed(false);
            });
          }
          else c.UpdateVMValues();
        },'OnExpanded');
        list.AddEvent(function(l,it) {
          if((ngCtrlBindingIsLocked('Value',c))||(ngCtrlBindingIsLocked('Checked',c))||(c._vmdispose)) {
          //console.log('ItemCheckChanged IGNORED',it);
            return;
          }
          //console.log('ItemCheckChanged',it);
          if((c.DataBindings)&&(c.DataBindings.Checked))
          {
            var checkedacc=c.DataBindings.Checked.ValueAccessor();
            if((c.CheckedKeyField!='')&&(checkedacc)) {
              var checked=checkedacc();
              if(ng_IsArrayVar(checked)) {
                var sval=vmGetFieldValueByID(it,c.CheckedKeyField);
                if((typeof sval!=='undefined')&&(it.Checked ? arr_push_uniq(checked,sval,true) : arr_remove(checked,sval))) {
                  update_checked_items(c,checked); // check the other items with the same id, need to do it synchronously
                  checkedacc(checked);
                }
              }
            }
          }

          if(it._vmSimpleArrayItem) return;

          if(ko.isObservable(it._vmChecked)) {
            if(!ko.isWriteableObservable(it._vmChecked)) return;
            ngCtrlBindingLock('Value',c,function() {
              it._vmChecked(it.Checked);
            });
          }
          else c.UpdateVMValues();
        },'OnItemCheckChanged');
      }
    }

    if(typeof window.ngVMIgnoredPropsInCompareListItems === 'undefined') window.ngVMIgnoredPropsInCompareListItems = {};
    var ignoredprops=window.ngVMIgnoredPropsInCompareListItems;
    ignoredprops._byRef=true;
    ignoredprops.Items=true;
    ignoredprops.Parent=true;
    ignoredprops.Controls=true;
    ignoredprops.ControlsHolder=true;
    ignoredprops.Checked=true;
    ignoredprops.Collapsed=true;
    ignoredprops._vmChecked=true;
    ignoredprops._vmCollapsed=true;

    function compareListItems(a,b,bindinfo)
    {
      if(typeof window.ngOnVMCompareListItemProps === 'function') {
        var ret=window.ngOnVMCompareListItemProps(a,b,bindinfo);
        if(typeof ret!=='undefined') return ret;
      }

      if((a._vmSimpleArrayItem)&&(b._vmSimpleArrayItem)) {
         if(typeof bindinfo.SimpleArrayItemColumnID!=='undefined') {
          if((typeof a.Text!=='object')||(typeof b.Text!=='object')) return false;
          return (a.Text[bindinfo.SimpleArrayItemColumnID]==b.Text[bindinfo.SimpleArrayItemColumnID]);
        }
        return a.Text==b.Text;
      }
      if((a._vmSimpleArrayItem)||(b._vmSimpleArrayItem)) return false;

      if(typeof bindinfo.KeyField !== 'undefined') {
        if((!a)||(!b)) return false;
        var svala=vmGetFieldValueByID(a,bindinfo.KeyField);
        var svalb=vmGetFieldValueByID(b,bindinfo.KeyField);
        if((typeof svala!=='undefined')&&(typeof svalb!=='undefined')) return ng_VarEquals(svala,svalb);
        if((typeof svala!=='undefined')||(typeof svalb!=='undefined')) return false;
      }

      var keys;
      if(typeof bindinfo.CompareKeys !== 'undefined') keys=bindinfo.CompareKeys;
      else {
        keys={};
        var ignoredprops=window.ngVMIgnoredPropsInCompareListItems;
        if((typeof ignoredprops==='object')&&(ignoredprops)) {
          for(var i in a) if(!ignoredprops[i]) keys[i]=true;
          for(var i in b) if(!ignoredprops[i]) keys[i]=true;
        }

        if((bindinfo.CompareInfo)&&(bindinfo.CompareInfo.IsMenu)) {
          delete keys.SubMenu;
          if(((a.OnClick===ngmn_OnClick)&&(typeof b.OnClick === 'undefined'))||
             ((b.OnClick===ngmn_OnClick)&&(typeof a.OnClick === 'undefined'))) delete keys.OnClick;
          if(((a.OnGetText===ngmn_GetResText)&&(typeof b.OnGetText === 'undefined'))||
             ((b.OnGetText===ngmn_GetResText)&&(typeof a.OnGetText === 'undefined'))) delete keys.OnGetText;
        }
      }

      var aref=a['_byRef'];
      var bref=b['_byRef'];
      for(var i in keys)
        if(!ng_VarEquals(a[i],b[i],((aref)&&(aref[i]))||((bref)&&(bref[i])))) return false;

      return true;
    }

    function value_init(c, valueAccessor, allBindingsAccessor, viewModel) {
      var menubar=(c.CtrlType==='ngToolBar')&&(c.CtrlInheritsFrom('ngMenuBar'));
      if((c.CtrlType==='ngList')||(menubar))
      {
        var bindinfo={},undefined;
        var binding=allBindingsAccessor();
        bindinfo.DelayedUpdate = ngVal(binding["DelayedUpdate"],10);
        bindinfo.KeyField  = binding["KeyField"];
        bindinfo.CompareKeys = vmPrepareCompareKeys(binding["ItemMatchingProps"]);
        if((ng_IsArrayVar(c.Columns))&&(c.Columns.length>0)) {
          bindinfo.SimpleArrayItemColumnID = binding["SimpleArrayItemColumnID"];
          if(typeof bindinfo.SimpleArrayItemColumnID === 'undefined') bindinfo.SimpleArrayItemColumnID=c.Columns[0].ID;
        }
        vmPrepareItemMapping(c, bindinfo, binding["ItemMapping"], allBindingsAccessor);

        ngBindingDeferUpdates('Value',allBindingsAccessor,true);

        function compareListItems_init(a,b) {
          return compareListItems(a,b,bindinfo);
        }

        function newlistitem(it,list) {
          var ci = {
            NewItem: (bindinfo.SimpleArray ? undefined : {}),
            BindInfo: bindinfo,
            Owner: c,
            List: list,
            ListItem: it
          };
          // List event: OnCreateViewModelItem
          if((c.OnCreateViewModelItem)&&(!ngVal(c.OnCreateViewModelItem(c,ci),false))) return ci.NewItem;
          return vmSetListItem(list,ci.NewItem,ci.ListItem,bindinfo,newlistsubitems);
        }

        function newlistsubitems(vitems,it,owner) {
          for(var i=0;i<it.length;i++)
            vitems[i]=newlistitem(it[i],owner);
        }

        function scan_newmenus(owner,item) {
          if(item.SubMenu) register_listchanges(c, item.SubMenu, menubar);
          owner.ScanMenu(function(list,it,parent,userdata) {
            if(it.SubMenu) register_listchanges(c, it.SubMenu, menubar);
            return true;
          },true,item);
        }

        function synclistinit(arr, parent, owner)
        {
          var items=[];
          for(var i=0;i<arr.length;i++)
            items[i]=vmGetListItem(owner,arr[i],bindinfo,false);

          var ismenu=isMenu(owner);

          bindinfo.CompareInfo={
            List: owner,
            IsMenu: ismenu
          };
          var editScript=ng_GetArraysEditScript(items,parent,compareListItems_init);
          delete bindinfo.CompareInfo;
          if(editScript) {
            for (var i = 0, j = 0; i < editScript.length; i++) {
              switch (editScript[i].status) {
                case 0://"retained":
                  arr[j]=vmSetListItem(owner,arr[j],parent[j],bindinfo,synclistinit);
                  if(ismenu) scan_newmenus(owner,parent[j]);
                  //console.log('init retained',arr[j]);
                  j++;
                  break;
                case 2://"deleted":
                  //console.log('init deleted',j);
                  arr.splice(j,1);
                  break;
                case 1://"added":
                  arr.splice(j,0,newlistitem(parent[j], owner));
                  if(ismenu) scan_newmenus(owner,parent[j]);
                  //console.log('init added',arr[j]);
                  j++;
                  break;
              }
            }
          }
        }

        function updatelist()
        {
          //console.log('listupdated',c);
          if(c._vmdispose) return;

          if(c.binding_update_timer) clearTimeout(c.binding_update_timer);
          c.binding_update_timer=null;

          if(typeof bindinfo.KeyField === 'undefined') {
            if(c.DataBindings.Checked) bindinfo.KeyField=ngVal(c.CheckedKeyField,'Value');
            if(c.DataBindings.Selected) bindinfo.KeyField=ngVal(c.SelectKeyField,'Value');
          }

          ngCtrlBindingLock('Value',c,function() {
            var v=valueAccessor();
            if((v)&&(ko.isWriteableObservable(v))) {

              var fd=v.FieldDef;
              bindinfo.SimpleArray=((ng_typeObject(fd))&&(ng_typeObject(fd.ValueFieldDef))&&(fd.ValueFieldDef.DataType!=='OBJECT')); // simple array is ngFieldDef_Array of simple types

              var varr=v();
              if(!ng_IsArrayVar(varr))
              {
                var arr=[];
                synclistinit(arr, c.Items, c);
                v(arr);
              }
              else
              {
                if(typeof v.valueWillMutate === 'function') v.valueWillMutate();
                synclistinit(varr, c.Items, c);
                if(typeof v.valueHasMutated === 'function') v.valueHasMutated();
                else v(varr);
              }
            }
          });
        }

        function listupdated()
        {
          if(c._vmdispose) return;

          c.need_vmupdate=false;
          if(bindinfo.DelayedUpdate<=0) updatelist();
          else {
            if(c.binding_update_timer) clearTimeout(c.binding_update_timer);
            c.binding_update_timer=setTimeout(updatelist,bindinfo.DelayedUpdate);
          }
        }

        if(typeof c.UpdateVMValues !== 'function') {
          c.UpdateVMValues = function() {
            if((ngCtrlBindingIsLocked('Value',c))||(c._vmdispose)) {
              //console.log('ignore UpdateVMValues');
              return;
            }
            if(c.update_cnt>0) c.need_vmupdate=true;
            else listupdated();
          }
        }

        c.need_vmupdate = false;
        c.binding_update_timer = null;

        c.OnCreateViewModelItem = c.OnCreateViewModelItem || null;

        register_listchanges(c,c, menubar);

        c.AddEvent(function() {
          if(c.binding_update_timer) clearTimeout(c.binding_update_timer);
          c.binding_update_timer=null;
          c._vmdispose=true;
          return true;
        },'DoDispose');

        return;
      }

      switch(c.CtrlType)
      {
        case 'ngEdit':
          if(typeof c.GetDate === 'function')
          {
            if((typeof c.GetTimeFormat === 'function')&&(c.CtrlInheritsFrom('ngEditTime'))) {
              var v=valueAccessor();
              if((v)&&(typeof v.FieldDef !== 'undefined'))
              {
                var fd=v.FieldDef;
                if(ngVal(c.TimeFormat,'')=='') {
                  if(!ng_isEmpty(fd.Attrs['TimeFormat'])) c.TimeFormat=fd.Attrs['TimeFormat'];
                  else if(!ng_isEmpty(fd.Attrs['DateTimeFormat'])) c.TimeFormat=fd.Attrs['DateTimeFormat'];
                }
                if(ngVal(c.ParseTimeFormat,'')=='') {
                  if(!ng_isEmpty(fd.Attrs['ParseTimeFormat'])) c.ParseTimeFormat=fd.Attrs['ParseTimeFormat'];
                  else if(!ng_isEmpty(fd.Attrs['ParseDateTimeFormat'])) c.ParseTimeFormat=fd.Attrs['ParseDateTimeFormat'];
                }
              }
            }
            else if(c.CtrlInheritsFrom('ngEditDate')) {
              var v=valueAccessor();
              if((v)&&(typeof v.FieldDef !== 'undefined'))
              {
                var fd=v.FieldDef;
                if(ngVal(c.DateFormat,'')=='') {
                  if(!ng_isEmpty(fd.Attrs['DateFormat'])) c.DateFormat=fd.Attrs['DateFormat'];
                  else if(!ng_isEmpty(fd.Attrs['DateTimeFormat'])) c.DateFormat=fd.Attrs['DateTimeFormat'];
                }
                if(ngVal(c.ParseDateFormat,'')=='') {
                  if(!ng_isEmpty(fd.Attrs['ParseDateFormat'])) c.ParseDateFormat=fd.Attrs['ParseDateFormat'];
                  else if(!ng_isEmpty(fd.Attrs['ParseDateTimeFormat'])) c.ParseDateFormat=fd.Attrs['ParseDateTimeFormat'];
                }
              }
            }
          }
          else if((typeof c.DoUp === 'function')&&(c.CtrlInheritsFrom('ngEditNum')))
          {
            if(c.OnGetText === ngedn_GetText)
              delete c.OnGetText; // Remove ngEditNum GetText handler, ViewModel do all check stuff itself

            var v=valueAccessor();
            if((v)&&(typeof v.FieldDef !== 'undefined'))
            {
              var n,fd=v.FieldDef;
              if(!ng_isEmpty(fd.MinValue))
              {
                n=parseInt(fd.MinValue,10);
                if(!isNaN(n)) c.MinNum=n;
              }
              if(!ng_isEmpty(fd.MaxValue))
              {
                n=parseInt(fd.MaxValue,10);
                if(!isNaN(n)) c.MaxNum=n;
              }
              if(!ng_isEmpty(fd.DefaultValue))
              {
                n=parseInt(fd.DefaultValue,10);
                if(!isNaN(n)) c.DefaultNum=n;
              }
              if(!ng_isEmpty(fd.Attrs['EditNumStep']))
              {
                n=parseInt(fd.Attrs['EditNumStep'],10);
                if(!isNaN(n)) c.Step=n;
              }
              if(!ng_isEmpty(fd.Attrs['EditNumStepRound']))
              {
                c.StepRound=ng_toBool(fd.Attrs['EditNumStepRound']);
              }
            }
          }
        case 'ngMemo':
          var binding=allBindingsAccessor();
          var instantupdate = ngVal(binding["InstantUpdate"],false);
          var updatedelay = ngVal(binding["DelayedUpdate"],500);
          c.AddEvent(function(c) {
            if(c.binding_update_timer) {
              clearTimeout(c.binding_update_timer);
              c.binding_update_timer=null;
            }
            if((instantupdate)||(!c.HasFocus))
            {
              var val=ngCtrlBindingParseString(valueAccessor,c.GetText());
              ngCtrlBindingWrite('Value',val,c, valueAccessor, allBindingsAccessor);
            }
            else
            {
              if(updatedelay>0)
              {
                c.binding_update_timer=setTimeout(function() {
                  clearTimeout(c.binding_update_timer);
                  c.binding_update_timer=null;
                  if(typeof c.GetText === 'function') {
                    var val=ngCtrlBindingParseString(valueAccessor,c.GetText());
                    ngCtrlBindingWrite('Value',val,c, valueAccessor, allBindingsAccessor);
                  }
                },updatedelay);
              }
            }
            return true;
          },'OnTextChanged');
          c.AddEvent(function(c) {
            if(c.binding_update_timer) {
              clearTimeout(c.binding_update_timer);
              c.binding_update_timer=null;
            }
            ngCtrlBindingRead('Value',c,valueAccessor,function(val) {
              if(typeof c.SetText === 'function')
                var et=ngCtrlBindingEditString(valueAccessor,val);
                if(typeof c.SetEditText === 'function') c.SetEditText(et);
                else c.SetText(et);
            });
            return true;
          },'OnFocus');
          c.AddEvent(function(c) {
            if(c.binding_update_timer) clearTimeout(c.binding_update_timer);
            delete c.binding_update_timer;

            var val=ngCtrlBindingParseString(valueAccessor,c.GetText());
            if(ngCtrlBindingWrite('Value',val,c, valueAccessor, allBindingsAccessor))
              value_update(c, valueAccessor);
            return true;
          },'OnBlur');
          break;
        case 'ngPages':
          c.AddEvent(function(c,op) {
            var p=c.Page;
            if((p>=0)&&(p<c.Pages.length))
            {
              var pg=c.Pages[p];
              if(ngVal(pg.id,'')!='') p=pg.id;
              if(ngCtrlBindingWrite('Value',p,c, valueAccessor, allBindingsAccessor))
                value_update(c, valueAccessor);
            }
            return true;
          },'OnPageChanged');
          break;
        case 'ngButton':
        case 'ngSysAction':
          c.AddEvent(function(c) {
            if(ngCtrlBindingWrite('Value',ng_toNumber(c.Checked),c, valueAccessor, allBindingsAccessor))
              value_update(c, valueAccessor);
            return true;
          },'OnCheckChanged');
          break;
        case 'ngProgressBar':
          c.AddEvent('SetPosition',function(p) {
            ngCtrlBindingWrite('Value',p,c, valueAccessor, allBindingsAccessor);
            return true;
          });
          break;
        case 'ngWebBrowser':
          c.AddEvent('SetURL',function(p) {
            var txt=ngCtrlBindingParseString(valueAccessor,p);
            ngCtrlBindingWrite('Value',txt,c, valueAccessor, allBindingsAccessor);
            return true;
          });
          break;
        case 'ngCalendar':
          var v=valueAccessor();
          if((v)&&(typeof v.FieldDef !== 'undefined'))
          {
            var fd=v.FieldDef;
            if(ngVal(c.DateFormat,'')=='') {
              if(!ng_isEmpty(fd.Attrs['DateFormat'])) c.DateFormat=fd.Attrs['DateFormat'];
              else if(!ng_isEmpty(fd.Attrs['DateTimeFormat'])) c.DateFormat=fd.Attrs['DateTimeFormat'];
            }
            if(ngVal(c.ParseDateFormat,'')=='') {
              if(!ng_isEmpty(fd.Attrs['ParseDateFormat'])) c.ParseDateFormat=fd.Attrs['ParseDateFormat'];
              else if(!ng_isEmpty(fd.Attrs['ParseDateTimeFormat'])) c.ParseDateFormat=fd.Attrs['ParseDateTimeFormat'];
            }
          }
          c.AddEvent(function(c) {
            var val=c.GetSelected();
            if((c.SelectType==ngcalSelectSingle)&&(val.length==1)) val=val[0];
            if(ngCtrlBindingWrite('Value',val,c, valueAccessor, allBindingsAccessor))
              value_update(c, valueAccessor);
            return true;
          },'OnSelectChanged');
          break;
        case 'ngFileUploader':
          c.AddEvent(function(c){
            ngCtrlBindingWrite(bindingKey, c.GetFiles(), c, valueAccessor, allBindingsAccessor);
          }, 'OnFileAdded');

          c.AddEvent(function(c){
            ngCtrlBindingWrite(bindingKey, c.GetFiles(), c, valueAccessor, allBindingsAccessor);
          }, 'OnFileDeleted');
          break;
      }
    };

    function value_update(c, valueAccessor, allBindingsAccessor) {

      var menubar=(c.CtrlType==='ngToolBar')&&(c.CtrlInheritsFrom('ngMenuBar'));
      if((c.CtrlType==='ngList')||(menubar))
      {
        if(c._vmdispose) return;

        function readvmvalues(arr, list)
        {
          var ismenu=isMenu(list);
          for(var i=0;i<arr.length;i++)
          {
            var vmit=vmGetListItem(list,arr[i],bindinfo);
            if(ng_IsArrayVar(vmit.Items)) readvmvalues(vmit.Items, list);
            if((ismenu)&&(ng_IsArrayVar(vmit.SubMenu))) readvmvalues(vmit.SubMenu, list);
          }
        }

        function compareListItems_update(a,b) {
          return compareListItems(a,b,bindinfo);
        }

        function synclistupdate(arr, items, list) {
          //console.log('vmupdated',c);

          var vitems=[];
          for(var i=0;i<arr.length;i++)
            vitems[i]=vmGetListItem(list,arr[i],bindinfo);

          synclistupdateex(vitems, items, list, list);
        }

        function synclistupdateex(arr, items, parent, list)
        {
          var ismenu=isMenu(list);
          bindinfo.CompareInfo={
            List: list,
            IsMenu: ismenu
          };
          var editScript=ng_GetArraysEditScript(items,arr,compareListItems_update);
          delete bindinfo.CompareInfo;
          if(editScript) {
            for (var i = 0, j = 0; i < editScript.length; i++) {
              switch (editScript[i].status) {
                case 0://"retained":
                  //console.log('update retained',arr[j]);

                  var it=items[j];
                  var vmit=arr[j];
                  for(var p in vmit) {
                    if((ismenu)&&(p==='SubMenu')) continue;
                    if((ignoredprops[p])||(ng_VarEquals(it[p],vmit[p]))) continue;
                    it[p]=vmit[p];
                    list.need_update=true;
                    list.DoItemsChanged();
                  }

                  if((c!==list)||(!menubar)) {
                    if((typeof vmit.Checked !== 'undefined')&&(it.Checked!==vmit.Checked)) list.CheckItem(it,vmit.Checked);
                    if((bindinfo.Checked)&&(it.Checked)) {
                      var sval=vmGetFieldValueByID(vmit,bindinfo.CheckedKeyField);
                      if(typeof sval!=='undefined') bindinfo.Checked.push(sval);
                    }
                    if((typeof vmit.Collapsed !== 'undefined')&&(it.Collapsed!==vmit.Collapsed)) {
                      if(vmit.Collapsed) list.Collapse(it);
                      else list.Expand(it);
                    }
                  }

                  var vitems=vmit.Items;
                  if(ng_IsArrayVar(vitems))
                    synclistupdateex(vitems, it.Items, it, list);
                  else {
                    if(((c!==list)||(!menubar))&&(ng_IsArrayVar(it.Items))) list.Clear(it);
                  }

                  if(ismenu) {
                    var vsubmenu=vmit.SubMenu;
                    if(ng_IsArrayVar(vsubmenu)) {
                      if(!it.SubMenu) {
                        if(typeof list.CreateSubMenu === 'function') {
                          list.need_update=true;
                          list.CreateSubMenu(it);
                          if(it.SubMenu) register_listchanges(c, it.SubMenu, menubar);
                        }
                      }
                      if(it.SubMenu) {
                        if(isMenu(it.SubMenu)) {
                          synclistupdateex(vsubmenu, it.SubMenu.Items, it.SubMenu, it.SubMenu);
                        }
                      }
                    }
                    else {
                      if((c!==list)||(!menubar)) {
                        var sm=it.SubMenu;
                        if((sm)&&(typeof sm.Dispose === 'function')) {
                          delete it.SubMenu;
                          sm.Dispose();
                          list.need_update=true;
                        }
                      }
                    }
                  }
                  j++;
                  break;
                case 2://"deleted":
                  //console.log('update deleted',j);
                  if((c===list)&&(menubar)) {
                    list.DeleteItem(j);
                  }
                  else {
                    if(c===list) {
                      // Handle dropdown edit value
                      var it=editScript[i].value;
                      if((keyfield)&&(typeof selval!=='undefined')&&(ng_VarEquals(vmGetFieldValueByID(it,keyfield),selval)))
                      {
                        e.ListItem = { };
                        vmSetFieldValueByID(e.ListItem,keyfield,selval);
                        e.SetText('');
                      }
                    }
                    list.Delete(j,parent);
                  }
                  break;
                case 1://"added":
                  var item=editScript[i].value;
                  if(!ng_typeObject(item)) item={};

                  //console.log('update added',item);
                  if((c===list)&&(menubar)) {
                    list.InsertItem(j,item);
                  }
                  else {
                    list.Insert(j,item,parent);

                    if((bindinfo.Checked)&&(item.Checked)) {
                      var sval=vmGetFieldValueByID(item,bindinfo.CheckedKeyField);
                      if(typeof sval!=='undefined') bindinfo.Checked.push(sval);
                    }

                    if(c===list) {
                      // Handle dropdown edit value
                      if((keyfield)&&(typeof selval!=='undefined')&&(ng_VarEquals(vmGetFieldValueByID(item,keyfield),selval)))
                        c.SelectDropDownItem(item);
                    }
                  }

                  // Register notification of changes on all newly created submenus
                  if(ismenu) {
                    if(item.SubMenu) register_listchanges(c, item.SubMenu, menubar);
                    list.ScanMenu(function(list,it,parent,userdata) {
                      if(it.SubMenu) register_listchanges(c, it.SubMenu, menubar);
                      return true;
                    },true,item);
                  }

                  j++;
                  break;
              }
            }
          }
        }

        var bindinfo={};
        var binding=allBindingsAccessor();
        bindinfo.KeyField = binding["KeyField"];
        bindinfo.CompareKeys = vmPrepareCompareKeys(binding["ItemMatchingProps"]);
        if((ng_IsArrayVar(c.Columns))&&(c.Columns.length>0)) {
          bindinfo.SimpleArrayItemColumnID = binding["SimpleArrayItemColumnID"];
          if(typeof bindinfo.SimpleArrayItemColumnID === 'undefined') bindinfo.SimpleArrayItemColumnID=c.Columns[0].ID;
        }
        vmPrepareItemMapping(c, bindinfo, binding["ItemMapping"], allBindingsAccessor);
        var ignoredprops=window.ngVMIgnoredPropsInCompareListItems;
        if(!ng_typeObject(ignoredprops)) ignoredprops={};

        if(c.DataBindings.Checked) {
          bindinfo.CheckedKeyField = ngVal(c.CheckedKeyField, bindinfo.KeyField);
          if(typeof bindinfo.CheckedKeyField === 'undefined') bindinfo.CheckedKeyField='Value';
          bindinfo.Checked=[];
          if(typeof bindinfo.KeyField === 'undefined') bindinfo.KeyField=bindinfo.CheckedKeyField;
        }

        if(c.DataBindings.Selected) {
          if(typeof bindinfo.KeyField === 'undefined') bindinfo.KeyField=ngVal(c.SelectKeyField,'Value');
        }

        if(ngCtrlBindingIsLocked('Value',c)) {
          //console.log('updating ignore');
          readvmvalues(ko.ng_unwrapobservable(valueAccessor()),c); // just read to subscribe observables
          return;
        }

        var e=menubar ? null : c.DropDownOwner;
        if(e)
        {
          var selval;
          var keyfield=ngVal(e.LookupKeyField, 'Value');
          if(e.ListItem) selval=vmGetFieldValueByID(e.ListItem,keyfield);
        }

        ngCtrlBindingLock('Value',c,function() {

          c.need_vmupdate=false;
          if(c.binding_update_timer) clearTimeout(c.binding_update_timer);
          c.binding_update_timer=null;

          if(!menubar) {
            var selectedacc;
            if(c.DataBindings.Selected) {
              selectedacc=c.DataBindings.Selected.ValueAccessor();
              if((selectedacc)&&(typeof selectedacc.valueWillMutate === 'function')) selectedacc.valueWillMutate();
            }
          }

          var val=ko.ng_unwrapobservable(valueAccessor());
          c.BeginUpdate();
          try
          {
            if(ng_IsArrayVar(val))
            {
              synclistupdate(val, c.Items, c);
            }
            else
            {
              if(menubar) c.ClearItems();
              else c.Clear();
              // Handle dropdown edit value
              if((!menubar)&&(keyfield)&&(typeof selval!=='undefined'))
              {
                e.ListItem = { };
                vmSetFieldValueByID(e.ListItem,keyfield,selval);
                e.SetText('');
              }
            }
          }
          finally
          {
            var needupdate=false;
            if((c.update_cnt==1)&&(c.need_update)) {
              c.need_update=false;
              needupdate=true;
            }
            c.EndUpdate();
            if(needupdate) {
              c.need_update=true;
              c.UpdateLater();
            }
          }

          if(!menubar) {
            ko.dependencyDetection.ignore(function() {
              if(c.DataBindings.Checked) {
                var checkedacc=c.DataBindings.Checked.ValueAccessor();
                if((bindinfo.Checked)&&(checkedacc)) {
                  var checked=checkedacc();
                  if(!ng_IsArrayVar(checked)) checked=[];
                  if(arr_sync(checked,bindinfo.Checked)) {
                    //console.log('VMUpdate Checked',checked);
                    checkedacc(checked);
                  }
                }
              }
              if(selectedacc) {
                if(typeof selectedacc.valueHasMutated === 'function') selectedacc.valueHasMutated();
                else selectedacc(selectedacc());
              }
            });
          }
        });
        return;
      }

      switch(c.CtrlType)
      {
        case 'ngButton':
        case 'ngSysAction':
          ngCtrlBindingRead('Value',c,valueAccessor,function(val) {
            var v=ng_toNumber(val);
            if((isNaN(v))||((v!=0)&&(v!=1)&&(v!=2))) v=(ng_toBool(val) ? 1 : 0);
            c.Check(v);
          });
          break;
        case 'ngPages':
          ngCtrlBindingRead('Value',c,valueAccessor,function(val) {
            if((ng_IsArrayVar(val))&&(val.length==1)) val=val[0];
            c.SetPage(val);
          });
          break;
        case 'ngWebBrowser':
          ngCtrlBindingRead('Value',c,valueAccessor,function(val) {
            var txt=ngCtrlBindingFormatString(valueAccessor,val);
            c.SetURL(ng_formatWWW(txt,txt));
          });
          break;
        case 'ngProgressBar':
          ngCtrlBindingRead('Value',c,valueAccessor,function(val) {
            c.SetPosition(ng_toInteger(val,0));
          });
          break;
        case 'ngCalendar':
          ngCtrlBindingRead('Value',c,valueAccessor,function(val) {
            c.SetSelected(ng_toDate(val));
          });
          break;
        case 'ngFileUploader':
        case 'ngSysFileUploader':
          ngCtrlBindingRead('Value',c,valueAccessor,function(val) {
            c.UploadFiles(val);
          });
          break;
        default:
          if(typeof c.SetText === 'function') {
            ngCtrlBindingRead('Value',c,valueAccessor,function(val) {
              c.SetText(ngCtrlBindingFormatString(valueAccessor,val));
            });
          }
          break;
      }
    };
    ngRegisterBindingHandler('Value',value_update,value_init);

    ngRegisterBindingHandler('Lookup',
      function (c, valueAccessor, allBindingsAccessor, viewModel) {
        if(c.CtrlType==='ngEdit')
        {
          ngCtrlBindingRead('Lookup',c,valueAccessor,function(val) {
            var list=c.DropDownControl;
            if(!list) return;
            if((list.CtrlType!=='ngList')&&(ng_IsObjVar(list.Controls))&&(ng_IsObjVar(list.Controls.List))&&(list.Controls.List.CtrlType==='ngList')) list=list.Controls.List;
            var found=null;
            var keyfield=ngVal(c.LookupKeyField, 'Value');
            if(!ng_isEmpty(val))
            {
              if(typeof list.Scan==='function') {
                list.Scan(function(list,it,parent,userdata) {
                  if(ng_VarEquals(vmGetFieldValueByID(it,keyfield),val))
                  {
                    found=it;
                    return false;
                  }
                  return true;
                });
              }
            }
            if(!found)
            {
              c.ListItem = { };
              vmSetFieldValueByID(c.ListItem,keyfield,ng_CopyVar(val));
              c.SetText('');
            }
            else
            {
              list.SelectDropDownItem(found);
            }
          });
        }
      },
      function (c, valueAccessor, allBindingsAccessor, viewModel) {
        if(c.CtrlType==='ngEdit')
        {
          var undefined;
          c.LookupKeyField = ngVal(allBindingsAccessor()["KeyField"],'Value');
          c.AddEvent(function(e,l,it,oit) {
            var keyfield=ngVal(e.LookupKeyField, 'Value');
            var kfval=vmGetFieldValueByID(it,keyfield);
            if(!ng_isEmpty(kfval))
            {
              ngCtrlBindingWrite('Lookup',ng_CopyVar(kfval),e, valueAccessor, allBindingsAccessor);
            }
            return true;
          },'OnListItemChanged');
          c.AddEvent(function(e,l) {
            var obval=valueAccessor();
            if((obval)&&(typeof obval.FieldDef !== 'undefined')&&(ngVal(obval.FieldDef.ReadOnly,false))) return false;

            var keyfield=ngVal(e.LookupKeyField, 'Value');
            var list=e.DropDownControl;
            if((list.CtrlType!=='ngList')&&(ng_IsObjVar(list.Controls))&&(ng_IsObjVar(list.Controls.List))&&(list.Controls.List.CtrlType==='ngList')) list=list.Controls.List;
            var selval=(e.ListItem ? vmGetFieldValueByID(e.ListItem,keyfield) : undefined);
            if(!ng_isEmpty(selval))
            {
              if(typeof list.Scan==='function') {
                list.Scan(function(list,it,parent,userdata) {
                  if(ng_VarEquals(vmGetFieldValueByID(it,keyfield),selval))
                  {
                    list.SelectDropDownItem(it);
                    return false;
                  }
                  return true;
                });
              }
            }
            return true;
          },'OnDropDown');
        }
      }
    );

    ngRegisterBindingHandler('Selected',
      function (c, valueAccessor, allBindingsAccessor, viewModel) {
        if(c.CtrlType==='ngList')
        {
          ngCtrlBindingRead('Selected',c,valueAccessor,function(val) {
            var keyfield=ngVal(c.SelectKeyField, 'Value');
            c.selected={};
            if(!ng_isEmpty(val))
            {
              if(!ng_typeArray(val))
              {
                var a=new Array();
                a.push(val);
                val=a;
              }
              c.Scan(function(c,it,parent,userdata) {
                for(var j=0;j<val.length;j++)
                {
                  if(ng_VarEquals(vmGetFieldValueByID(it,keyfield),val[j]))
                  {
                    var id=c.ItemId(it);
                    if(id!='')
                    {
                      c.last_selected=id;
                      c.selected[id]=true;
                    }
                    break;
                  }
                }
                return true;
              });
            }
            c.SelectChanged();
          });
        }
      },
      function (c, valueAccessor, allBindingsAccessor, viewModel) {
        if(c.CtrlType==='ngList')
        {
          ngBindingDeferUpdates('Selected',allBindingsAccessor,true);

          c.SelectKeyField = ngVal(allBindingsAccessor.get("KeyField"),'Value');
          c.AddEvent(function(list) {
            ngCtrlBindingRead('Selected',c,valueAccessor,function(origsel) {
              var keyfield=ngVal(c.SelectKeyField, 'Value');
              var selected=list.GetSelected();
              var val=new Array();
              var sval;
              for(var i in selected)
              {
                sval=vmGetFieldValueByID(selected[i],keyfield);
                if(typeof sval!=='undefined') val.push(sval);
              }
              if(!ng_IsArrayVar(origsel)) origsel=[];
              if(arr_sync(origsel,val)) {
                ngCtrlBindingWriteEx(origsel, valueAccessor, allBindingsAccessor);
              }
            });
            return true;
          },'OnSelectChanged');
        }
      }
    );

    function update_checked_items(c,val) {
      var keyfield=ngVal(c.CheckedKeyField, 'Value');
      if(!ng_isEmpty(val)&&(!ng_typeArray(val)))
      {
        var a=new Array();
        a.push(val);
        val=a;
      }
      c.BeginUpdate();
      var checkchanged=false;
      var emptyval=ng_isEmpty(val);
      try {
        c.Scan(function(c,it,parent,userdata) {
          var check;
          var sval=vmGetFieldValueByID(it,keyfield);
          if(typeof sval==='undefined') check=ngVal(it.Checked,0);
          else {
            check=0;
            if(!emptyval) {
              for(var j=0;j<val.length;j++)
                if(ng_VarEquals(sval,val[j]))
                {
                  check=1;
                  break;
                }
            }
          }
          if((ngVal(it.Checked,0)!=check)&&((!check)||(it.Checked!=2))) { // persist gray state
            c.CheckItem(it,check);
            checkchanged=true;
          }
          return true;
        });
      } finally {
        c.EndUpdate();
      }
      return checkchanged;
    }

    ngRegisterBindingHandler('Checked',
      function (c, valueAccessor, allBindingsAccessor, viewModel) {
        switch(c.CtrlType)
        {
          case 'ngButton':
          case 'ngSysAction':
            ngCtrlBindingRead('Checked',c,valueAccessor,function(val) {
              var v=ng_toNumber(val);
              if((isNaN(v))||((v!=0)&&(v!=1)&&(v!=2))) v=(ng_toBool(val) ? 1 : 0);
              c.Check(v);
            });
            break;
          case 'ngList':
            ngCtrlBindingRead('Checked',c,valueAccessor,function(val) {
              //console.log('VM Check Changed',val);
              if((update_checked_items(c,val))&&(typeof c.UpdateVMValues==='function')) {
                if(!ngCtrlBindingIsLocked('Value',c)) c.UpdateVMValues();
              }
            });
            break;
        }
      },
      function (c, valueAccessor, allBindingsAccessor, viewModel) {
        switch(c.CtrlType)
        {
          case 'ngButton':
          case 'ngSysAction':
            c.AddEvent(function(c) {
              ngCtrlBindingWrite('Checked',ng_toNumber(c.Checked),c, valueAccessor, allBindingsAccessor);
              return true;
            },'OnCheckChanged');
            break;
          case 'ngList':
            ngBindingDeferUpdates('Checked',allBindingsAccessor,true);

            c.CheckedKeyField = ngVal(allBindingsAccessor.get("KeyField"),'Value');
            c.AddEvent(function(list) {
              ngCtrlBindingRead('Checked',c,valueAccessor,function(origchecked) {
                var keyfield=ngVal(c.CheckedKeyField, 'Value');
                var val=new Array();
                c.Scan(function(c,it,parent,userdata) {
                  if(ngVal(it.Checked,0))
                  {
                    var sval=vmGetFieldValueByID(it,keyfield);
                    if(typeof sval!=='undefined') val.push(sval);
                  }
                  return true;
                });
                if(!ng_IsArrayVar(origchecked)) origchecked=[];
                if(arr_sync(origchecked,val)) {
                  ngCtrlBindingWriteEx(origchecked,valueAccessor, allBindingsAccessor);
                  //console.log('Check changed', origchecked);
                }
              });
              return true;
            },'OnCheckChanged');
            break;
        }
      }
    );

    function paging_recs(recs,isdataset) {
      recs=ko.ng_getvalue(recs);
      if(isdataset) {
        var data=new Array();
        if(ng_IsArrayVar(recs))
          for(var i=0;i<recs.length;i++)
            data[i]={ Record: recs[i] };
        recs=data;
      }
      return recs;
    }

    function paging_subscribe(c,val) {
      if(!ng_typeObject(val)) return;
      if((ko.isObservable(val.Records))&&(!val.Records.PagingBindingRegistered)) {
        val.Records.PagingBindingRegistered=true;
        val.Records.subscribe(function(recs) {
          if(val.Records.PagingChanging) return;
          recs=paging_recs(recs,c.CtrlInheritsFrom('ngDataSet'));
          var offset=ko.ng_getvalue(val.Offset);
          var timer=setTimeout(function() {
            clearTimeout(timer);
            c.SetAsyncData(offset, recs);
          },1);
        });
      }
      if((ko.isObservable(val.TotalCount))&&(!val.TotalCount.PagingBindingRegistered)) {
        val.TotalCount.PagingBindingRegistered=true;
        val.TotalCount.subscribe(function(totalcount) {
          if(val.TotalCount.PagingChanging) return;
          var timer=setTimeout(function() {
            clearTimeout(timer);
            if(ng_typeNumber(totalcount)) {
              if(!totalcount) {
                c.Reset(true);
                return;
              }
              c.SetLength(totalcount);
            }
            c.SetAsyncData(999999999, null);
          },1);
        });
      }
    }

    ngRegisterBindingHandler('Paging',
      function (c, valueAccessor, allBindingsAccessor, viewModel) {
        if(c.CtrlInheritsFrom('ngPageList')) {
          var val=valueAccessor();
          if(ko.isObservable(val)) val=val();
          if(c.binding_reset_timer) clearTimeout(c.binding_reset_timer);
          delete c.binding_reset_timer;
          if(ng_IsArrayVar(val)) {
            if(typeof c.BindingPagingVM === 'object') {
              c.BindingPagingVM.Value=val;
              c.binding_reset_timer=setTimeout(function() {
                 if(c.binding_reset_timer) clearTimeout(c.binding_reset_timer);
                 delete c.binding_reset_timer;
                c.Reset(true);
              },1);
              return;
            }
            var paging={
              Value: val,
              Offset: ko.observable(),
              Count: ko.observable(),
              Records: ko.observableArray(),
              GetRecords: function() {
                var offset=paging.Offset();
                var cnt=paging.Count();
                var recs=[];

                if(ng_IsArrayVar(paging.Value)) {
                  var len=paging.Value.length;
                  var pidx=offset;
                  for(var i=0;(i<cnt)&&(pidx<len);i++,pidx++)
                    recs.push(paging.Value[pidx]);
                }
                paging.Records(recs);
              },
              TotalCount: ko.observable(),
              GetTotalCount: function() {
                paging.TotalCount(ng_IsArrayVar(paging.Value) ? paging.Value.length : 0);
              }
            };
            c.BindingPagingVM = paging;
            c.Reset(true);
            val=paging;
          }
          else delete c.BindingPagingVM;
          paging_subscribe(c,val);
        }
      },
      function (c, valueAccessor, allBindingsAccessor, viewModel) {
        if(c.CtrlInheritsFrom('ngPageList')) {
          var undefined;

          ngBindingDeferUpdates('Paging',allBindingsAccessor,true);
          var isdataset=c.CtrlInheritsFrom('ngDataSet');

          function loaddata(ds, list, idx, cnt)
          {
            var val=valueAccessor();
            var recs;
            ngCtrlBindingLock('Paging',c,function() {
              if(typeof c.BindingPagingVM === 'object') val=c.BindingPagingVM;
              else if(ko.isObservable(val)) val=val();
              if(!ng_typeObject(val)) return;
              var totalcount=(idx==999999999)&&((ko.isObservable(val.TotalCount))||(typeof val.GetTotalCount === 'function'));
              if(val.Records) val.Records.PagingChanging=true;
              if(val.TotalCount) val.TotalCount.PagingChanging=true;
              try {
                if(totalcount) {
                  ko.ng_setvalue(val.TotalCount,undefined);
                }
                else {
                  ko.ng_setvalue(val.Records,undefined);
                }
                ko.ng_setvalue(val.Count,cnt);
                ko.ng_setvalue(val.Offset,idx);
                paging_subscribe(c,val);
                var getrecs=true;
                if(totalcount) {
                  if(typeof val.GetTotalCount === 'function') {
                    val.GetTotalCount();
                    getrecs=false;
                  }
                }
                if(getrecs) {
                  if(isdataset) {
                    switch(c.GetRecordsCommand) {
                      case 'applyfilters':
                        if(typeof val.ApplyFilters === 'function') {
                          val.ApplyFilters();
                          getrecs=false;
                        }
                        break;
                      case 'resetfilters':
                        if(typeof val.ResetFilters === 'function') {
                          val.ResetFilters();
                          getrecs=false;
                        }
                        break;
                    }
                  }
                  if((getrecs)&&(typeof val.GetRecords === 'function')) val.GetRecords();
                }
              }
              finally {
                if(val.TotalCount) delete val.TotalCount.PagingChanging;
                if(val.Records) delete val.Records.PagingChanging;
              }
              if(totalcount) {
                var tc=ko.ng_getvalue(val.TotalCount);
                if((typeof tc!=='undefined')&&(ng_typeNumber(tc))) {
                  var timer=setTimeout(function() {
                    clearTimeout(timer);
                    c.SetLength(tc);
                    c.SetAsyncData(999999999, null);
                  },1);
                  recs=undefined;
                  return;
                }
              }
              var records=ko.ng_getvalue(val.Records);
              if(ng_IsArrayVar(records)) {
                recs=paging_recs(records,isdataset);
              }
            });
            return recs;
          }

          ng_OverrideMethod(c,'OnLoadData',loaddata);
          return true;
        }
        return false;
      }
    );

    ngRegisterBindingHandler('Controls',
      null,
      function (c, valueAccessor, allBindingsAccessor, viewModel) {
        if((c.CtrlInheritsFrom('ngVLayoutDnD'))||(c.CtrlInheritsFrom('ngHLayoutDnD'))) {
          c.AddEvent('OnDragDropControl', function(c, ctrl, insertbefore, di, pi) {
            if(!ng_IsObjVar(di.DragData)) return;
            var dc=di.DragData.DragControl;
            if((!dc)||(!dc.ParentControl)) return;

            var fromidx=ngVal(di.DragData.ChildIndex,-1);
            var toidx=ngVal(di.DragContext.InsertBeforeIdx,-1);

            var fromValue, samevalue;
            var toValue = valueAccessor();

            if(dc.ParentControl===c)
            {
              fromValue=toValue;
              samevalue=true;
            } else {
              var bindings=dc.ParentControl.DataBindings;
              if((!ng_IsObjVar(bindings))||(!ng_IsObjVar(bindings.Controls))) return;
              fromValue=bindings.Controls.ValueAccessor();
              samevalue = (toValue === fromValue);
            }

            if((samevalue)&&((fromidx===toidx)||(fromidx+1===toidx))) return;

            if((ko.isObservable(fromValue))&&(!ko.isWriteableObservable(fromValue))) return;  
            if((!samevalue)&&(ko.isObservable(toValue))&&(!ko.isWriteableObservable(toValue))) return;  

            var fromarr=ko.ng_getvalue(fromValue);
            var toarr=samevalue ? fromarr : ko.ng_getvalue(toValue);
            if((ng_IsArrayVar(fromarr))&&(ng_IsArrayVar(toarr))&&(fromidx>=0)&&(fromidx<fromarr.length)) {
              if((samevalue)&&(toidx===-1)&&(fromidx===fromarr.length-1)) return;
              var it=fromarr[fromidx];
              if((samevalue)&&(fromidx<toidx)) toidx--;
              var fromacc = (ko.isObservable(fromValue)) && (typeof fromValue.splice==='function') ? fromValue : fromarr;
              var toacc = samevalue ? fromacc : ((ko.isObservable(toValue)) && (typeof toValue.splice==='function') ? toValue : toarr);
              fromacc.splice(fromidx,1);
              if(toidx<0) toacc.push(it);
              else toacc.splice(toidx,0,it);
              if((fromacc===fromarr)&&(ko.isObservable(fromValue))) fromValue(fromarr);
              if((!samevalue)&&(toacc===toarr)&&(ko.isObservable(toValue))) toValue(toarr);
            }
          });    
          return true;
        }
        return false;
      }
    );

    ngRegisterBindingHandler('Command',null,
      function (c, valueAccessor, allBindingsAccessor, viewModel) {
        var valuenames = allBindingsAccessor.get("ValueNames");
        var cmd = ''+valueAccessor();
        if(cmd=='') return;
        switch(c.CtrlType)
        {
          case 'ngButton':
          case 'ngSysAction':
            var undefined;
            c.AddEvent('OnClick', function(e) {
              if((viewModel.Owner)&&(viewModel.Owner.Command))
                viewModel.Owner.Command(cmd, (valuenames ? { ValueNames: valuenames } : undefined));
              return true;
            });
            c.Update();
            break;
        }
      }
    );

    function error_binding(c,valueAccessor,focus)
    {
      var txt=ng_toString(ko.utils.unwrapObservable(valueAccessor()));

      var f=c.ParentControl;
      while(f)
      {
        if(typeof f.ShowControlError === 'function')
        {
          f.ShowControlError(c,txt,focus);
          return;
        }
        f=f.ParentControl;
      }
      if((txt===false)||(txt===null)) txt='';
      c.ErrorMessage=txt;
      var err=(txt!=='');
      if(typeof c.SetErrorState === 'function') c.SetErrorState(err);
      else
        if(typeof c.SetInvalid === 'function') c.SetInvalid(err);
    }

    ngRegisterBindingHandler('Error', function (c, valueAccessor) {
      error_binding(c,valueAccessor,false);
    });

    ngRegisterBindingHandler('ShowError', function (c, valueAccessor) {
      error_binding(c,valueAccessor,true);
    });
  }
};
