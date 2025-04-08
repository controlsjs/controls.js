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

if(typeof ngBindingsHandlers === 'undefined') ngBindingsHandlers = {};

function ngRegisterBindingHandler(type,update,init,after)
{
  var handler=ngBindingsHandlers[type];

  if(typeof handler==='undefined') {
    handler = {
      Init: null,
      Update: null,
      AddEvent: ngObjAddEvent,
      RemoveEvent: ngObjRemoveEvent
    }
    ngBindingsHandlers[type] = handler;
  }

  if(typeof init==='function')   handler.AddEvent('Init',init,true);
  if(typeof update==='function') handler.AddEvent('Update',update,true);
  if(typeof after!=='undefined') handler.After=after;
}

function ng_Bindings(bindings)
{
  if(arguments.length<=1)
  {
    if(ng_typeString(bindings)) return bindings;
    if(!ng_typeObject(bindings)) return '';
    var ret='',v;
    var isarray=ng_IsArrayVar(bindings);
    for(var i in bindings)
    {
      if(ret!='') ret+=',';
      if(!isarray) ret+=i+':';
      v=bindings[i];
      if(ng_typeObject(v)) {
        if(ng_IsArrayVar(v)) ret+='['+ng_Bindings(v)+']';
        else ret+='{'+ng_Bindings(v)+'}';
      }
      else ret+=ng_toString(v);
    }
    return ret;
  }
  else
  {
    var ret=new Object;
    var mid='self',arg;
    for(var i=0;i<arguments.length;i++)
    {
      arg=arguments[i];
      if(ng_typeObject(arg))
      {
        if(mid=='') break;
        ret[mid]=ng_Bindings(arg);
        mid='';
      }
      else
      {
        if(ng_typeString(arg))
        {
          if((mid=='')||(mid=='self')) mid=arg;
          else {
            ret[mid]=arg;
            mid='';
          }
        }
        else mid='';
      }
    }
    return ret;
  }
}

function ngBindingDeferUpdates(type, allBindingsAccessor, setstate) {
  var deferupdates=allBindingsAccessor.get("DeferUpdates");
  if(!ng_typeObject(deferupdates)) deferupdates={};
  if((typeof deferupdates[type]==='undefined')&&(typeof setstate!=='undefined')) {
    deferupdates[type]=setstate;
    allBindingsAccessor.set('DeferUpdates',deferupdates);
  }
  return !!ngVal(deferupdates[type],ko.options['deferUpdates']);
}

function ngApplyBindings(ctrl, viewModel, databind)
{
  if((!ctrl)||(ngVal(databind,'')=='')||(typeof ctrl.InDesignMode !== 'undefined')) return false;
  if(ng_IsObjVar(databind)){databind = ng_Bindings(databind);}

  if(ng_typeString(viewModel))
  {
    var vm=getViewModelById(viewModel);
    if(!vm) {
      ngDEBUGERROR('ViewModel "'+viewModel+'" referenced from control "'+ctrl.ID+'" not found!');
      return false;
    }
    viewModel=vm;
  }
  if(!viewModel) {
    ngDEBUGERROR('ViewModel for control "'+ctrl.ID+'" not found!');
    return false;
  }

  if(viewModel.ViewModel) viewModel=viewModel.ViewModel;

  var bindingContext = (viewModel && (viewModel instanceof ko.bindingContext)
                        ? viewModel
                        : new ko.bindingContext(viewModel));

  function add_ctrl_binding(c,type,valueAccessor,allBindingsAccessor,viewModel)
  {
    if(typeof c.DataBindings!=='object') c.DataBindings={};
    var binding = {
      ViewModel: viewModel,
      ValueAccessor: valueAccessor,
      BindingsAccessor: allBindingsAccessor
    };
    c.DataBindings[type]=binding;
  }

  // Returns the value of a valueAccessor function
  function evaluateValueAccessor(valueAccessor) {
      return valueAccessor();
  }

  // Given a function that returns bindings, create and return a new object that contains
  // binding value-accessors functions. Each accessor function calls the original function
  // so that it always gets the latest value and all dependencies are captured. This is used
  // by ko.applyBindingsToNode and getBindingsAndMakeAccessors.
  function makeAccessorsFromFunction(callback) {
      return ko.utils.objectMap(ko.dependencyDetection.ignore(callback), function(value, key) {
          return function() {
            var v=callback()[key];
            return (ngIsFieldDef(v) ? v.Value : v); // if ngFieldDef, use Value
          };
      });
  }

  // This function is used if the binding provider doesn't include a getBindingAccessors function.
  // It must be called with 'this' set to the provider instance.
  function getBindingsAndMakeAccessors(node, context) {
//        return makeAccessorsFromFunction(this['getBindings'].bind(this, node, context));
      return makeAccessorsFromFunction(this['parseBindingsString'].bind(this, databind, context, ctrl, {'valueAccessors':false}));
  }

  function topologicalSortBindings(bindings) {
    // Depth-first sort
    var result = [],                // The list of key/handler pairs that we will return
        bindingsConsidered = {},    // A temporary record of which bindings are already in 'result'
        cyclicDependencyStack = []; // Keeps track of a depth-search so that, if there's a cycle, we know which bindings caused it
    ko.utils.objectForEach(bindings, function pushBinding(bindingKey) {
        if (!bindingsConsidered[bindingKey]) {
            if(bindingKey.substring(0,3)=='_ko') return;
            var binding = ko['getBindingHandler'](bindingKey);
            if (binding) {
                // First add dependencies (if any) of the current binding
                if (binding['After']) {
                    cyclicDependencyStack.push(bindingKey);
                    ko.utils.arrayForEach(binding['After'], function(bindingDependencyKey) {
                        if (bindings[bindingDependencyKey]) {
                            if (ko.utils.arrayIndexOf(cyclicDependencyStack, bindingDependencyKey) !== -1) {
                                var errmsg="Cannot combine the following bindings, because they have a cyclic dependency: " + cyclicDependencyStack.join(", ");
                                ngDEBUGERROR(errmsg);
                                throw Error(errmsg);
                            } else {
                                pushBinding(bindingDependencyKey);
                            }
                        }
                    });
                    cyclicDependencyStack.pop();
                }
                // Next add the current binding
                result.push({ key: bindingKey, handler: binding });
            }
            bindingsConsidered[bindingKey] = true;
        }
    });

    return result;
  }


  var oldhandler = ko['getBindingHandler'];
  var olddefer = ko.options['deferUpdates'];
  try
  {
    ko['getBindingHandler'] = function(bindingKey) {
        return (ngBindingsHandlers ? ngBindingsHandlers[bindingKey] : null);
    };

    // Use bindings if given, otherwise fall back on asking the bindings provider to give us some bindings
    var bindings;
  /*  if (sourceBindings && typeof sourceBindings !== 'function') {
        bindings = sourceBindings;
    } else {*/
        var provider = ko.bindingProvider['instance'],
            getBindings = /*provider['getBindingAccessors'] ||*/ getBindingsAndMakeAccessors;
        if (/*sourceBindings || */(bindingContext._subscribable) || (ko.version!=='3.0.0')) { // in ko 3.4.0 this condition doesn't exists
            // When an obsevable view model is used, the binding context will expose an observable _subscribable value.
            // Get the binding from the provider within a computed observable so that we can update the bindings whenever
            // the binding context is updated.
            var bindingsUpdater = ko.dependentObservable(
                function() {
                    bindings = /*sourceBindings ? sourceBindings(bindingContext, ctrl) :*/ getBindings.call(provider, ctrl, bindingContext);
                    // Register a dependency on the binding context
                    if (bindings && bindingContext._subscribable)
                        bindingContext._subscribable();
                    return bindings;
                },
                null, { disposeWhenNodeIsRemoved: false/*node*/ }
            );

            if (!bindings || !bindingsUpdater.isActive())
                bindingsUpdater = null;

            if(bindingsUpdater) {
              ctrl.AddEvent('DoDispose',function() {
                if(bindingsUpdater) bindingsUpdater.dispose();
                return true;
              });
            }

        } else {
            bindings = ko.dependencyDetection.ignore(getBindings, provider, [ctrl, bindingContext]);
        }
  //  }

  //  var bindingHandlerThatControlsDescendantBindings;
    if (bindings) {
        // Return the value accessor for a given binding. When bindings are static (won't be updated because of a binding
        // context update), just return the value accessor from the binding. Otherwise, return a function that always gets
        // the latest binding value and registers a dependency on the binding updater.
        var getValueAccessor = bindingsUpdater
            ? function(bindingKey) {
                return function() {
                    return evaluateValueAccessor(bindingsUpdater()[bindingKey]);
                };
            } : function(bindingKey) {
                return bindings[bindingKey];
            };

        // Use of allBindings as a function is maintained for backwards compatibility, but its use is deprecated
        function allBindings() {
            return ko.utils.objectMap(bindingsUpdater ? bindingsUpdater() : bindings, evaluateValueAccessor);
        }
        // The following is the 3.x allBindings API
        allBindings['get'] = function(key) {
            return bindings[key] && evaluateValueAccessor(getValueAccessor(key));
        };
        allBindings['has'] = function(key) {
            return key in bindings;
        };
        allBindings['set'] = function(key, val) {
            bindings[key] = ko.observable(val);
        };

        // First put the bindings into the right order
        var orderedBindings = topologicalSortBindings(bindings);

        // Go through the sorted bindings, calling init and update for each
        ko.utils.arrayForEach(orderedBindings, function(bindingKeyAndHandler) {
            // Note that topologicalSortBindings has already filtered out any nonexistent binding handlers,
            // so bindingKeyAndHandler.handler will always be nonnull.
            var handlerInitFn = bindingKeyAndHandler.handler["Init"],
                handlerUpdateFn = bindingKeyAndHandler.handler["Update"],
                bindingKey = bindingKeyAndHandler.key;

            add_ctrl_binding(ctrl, bindingKey, getValueAccessor(bindingKey), allBindings, bindingContext['$data']);

  //          if (node.nodeType === 8) {
  //              validateThatBindingIsAllowedForVirtualElements(bindingKey);
  //          }

            try {
                // Run init, ignoring any dependencies
                if ((typeof handlerInitFn === "function")||(ctrl.OnDataBindingInit)) {
                    ko.dependencyDetection.ignore(function() {
                      if((ctrl.OnDataBindingInit)&&(!ngVal(ctrl.OnDataBindingInit(ctrl,bindingKey,getValueAccessor(bindingKey), allBindings, bindingContext['$data']),false))) return;
                      if(typeof handlerInitFn === "function") {
                        var initResult = handlerInitFn(ctrl, getValueAccessor(bindingKey), allBindings, bindingContext['$data'], bindingContext);

    /*                      // If this binding handler claims to control descendant bindings, make a note of this
                          if (initResult && initResult['controlsDescendantBindings']) {
                              if (bindingHandlerThatControlsDescendantBindings !== undefined)
                                  throw new Error("Multiple bindings (" + bindingHandlerThatControlsDescendantBindings + " and " + bindingKey + ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");
                              bindingHandlerThatControlsDescendantBindings = bindingKey;
                          }*/
                      }
                    });
                }

                // Run update in its own computed wrapper
                if ((typeof handlerUpdateFn === "function")||(ctrl.OnDataBindingUpdate)) {
                    var deferupdates=allBindings.get('DeferUpdates');
                    if(!ng_typeObject(deferupdates)) deferupdates={};

                    ko.options['deferUpdates']=!!ngVal(deferupdates[bindingKey],olddefer);
                    try {
                      var dependentObservable = ko.dependentObservable(
                          function() {
                              if((ctrl.OnDataBindingUpdate)&&(!ngVal(ctrl.OnDataBindingUpdate(ctrl,bindingKey,getValueAccessor(bindingKey), allBindings, bindingContext['$data']),false))) return;
                              if (typeof handlerUpdateFn === "function") handlerUpdateFn(ctrl, getValueAccessor(bindingKey), allBindings, bindingContext['$data'], bindingContext);
                          },
                          null,
                          { disposeWhenNodeIsRemoved: false/*node*/ }
                      );
                      ctrl.AddEvent('DoDispose',function() {
                        dependentObservable.dispose();
                        return true;
                      });
                    }
                    finally {
                      ko.options['deferUpdates']=olddefer;
                    }
                }
            } catch (ex) {
                ex.message = "Unable to process binding \"" + bindingKey + ": " + bindings[bindingKey] + "\"\nMessage: " + ex.message;
                ngDEBUGERROR(ex.message)
                throw ex;
            }
        });
    }
  }
  finally
  {
    ko.options['deferUpdates']=olddefer;
    ko['getBindingHandler']=oldhandler;
  }

  return true;
}

function ng_FindViewModel(def, c)
{
  var vm=def.ViewModel;
  if(typeof vm==='undefined')
  {
    var p=c;
    while((p)&&(!vm))
    {
      vm=p.ViewModel;
      p=p.ParentControl;
    }
    if(typeof vm==='undefined')
    {
      var p=c.Owner;
      while((p)&&(!vm))
      {
        vm=p.ViewModel;
        p=p.Owner;
      }
    }
  }
  if(ng_typeString(vm))
  {
    var vmi=getViewModelById(vm);
    if(vmi) vm=vmi;
  }
  return vm;
}

if(typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['viewmodel_controls'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnControlCreated: function(def,c,ref) {
    if((typeof def.ViewModel !== 'undefined')&&(typeof c.ViewModel === 'undefined')) c.ViewModel=def.ViewModel;

    if(typeof c.InDesignMode !== 'undefined') return;

    var dombind=def.DOMDataBind;
    if(typeof dombind !== 'undefined') {
      def.OnCreated=ngAddEvent(def.OnCreated, function(c,ref) {
        var o=c.Elm();
        if(o) {
          var vm=ng_FindViewModel(def, c);
          if(vm) ko.applyBindings(vm, o);
        }
        return true;
      });
      ng_OverrideMethod(c,'DoAttach', function(o,oid) {
        if(o) o.setAttribute('data-bind',dombind);
        ng_CallParent(c,'DoAttach',arguments);
      });
      delete def.DOMDataBind;
    }

    var bind=def.DataBind;
    if(typeof bind !== 'undefined') {
      def.OnCreated=ngAddEvent(def.OnCreated, function(c,ref) {
        var vm=ng_FindViewModel(def, c);

        if(typeof bind==='object')
        {
          for(var vm2 in bind)
            ngApplyBindings(c, (vm2=='self' ? vm : vm2), bind[vm2]);
          return true;
        }

        ngApplyBindings(c, vm, bind);
        return true;
      });
      delete def.DataBind;
    }
  },

  OnInit: function() {

    function ngsvm_DoCreate(def, ref)
    {
      if(this.ID!='') {
        ngViewModels[this.ID] = this;
      }
    }

    /*  Class: ngSysViewModel
     *  This class implements non-visual <ngSysViewModel> control (based on <ngViewModel>).
     */
    window.ngSysViewModel = function(id, namespace)
    {
      ngSysControl(this, id, 'ngSysViewModel');
      this.DoCreate=ngsvm_DoCreate;
      this.AddEvent(function() {
        if(this.ID!='') {
          if(ngViewModels[this.ID] === this) delete ngViewModels[this.ID];
        }
      },'Dispose');
      ngViewModel.apply(this,[id, namespace]);
      ngControlCreated(this);
    }

    var vmdevice;
    var vmdeviceprofile;

    function vm_setdevice(device,dinfo) {
      var avm=ngApp.ViewModel;
      if(!avm) return;
      if(vmdevice()!=ngDevice) vmdevice(ngDevice);
      if(!ng_VarEquals(vmdeviceprofile(),ngDeviceProfile)) vmdeviceprofile(ngDeviceProfile);
    }

    var vmappwidth,vmappheight,vmwinwidth,vmwinheight;
    var vmresizetimer=null;
    function vm_onresize() {
      if(vmresizetimer) clearTimeout(vmresizetimer);
      vmresizetimer=setTimeout(function() {
        clearTimeout(vmresizetimer); vmresizetimer=null;
        var avm=ngApp.ViewModel;
        if(!avm) return;
        if(vmappwidth()!=ngApp.LastResizeW) vmappwidth(ngApp.LastResizeW);
        if(vmappheight()!=ngApp.LastResizeH) vmappheight(ngApp.LastResizeH);
        var ww=ng_WindowWidth();
        var wh=ng_WindowHeight();
        if(vmwinwidth()!=ww) vmwinwidth(ww);
        if(vmwinheight()!=wh) vmwinheight(wh);
      },80); // invoke before nga_DoResize ...<100
    }

    function vmtrackdevicechanged() {
      return true;
    }

    if(ngApp) {
      if((ngApp.ViewModel==='undefined')||(!ngApp.ViewModel))
        ngApp.ViewModel={};

      var avm=ngApp.ViewModel;

      vmappwidth=ko.observable(ngApp.LastResizeW);
      vmappheight=ko.observable(ngApp.LastResizeH);
      vmwinwidth=ko.observable(ng_WindowWidth());
      vmwinheight=ko.observable(ng_WindowHeight());

      avm.AppWidth=ko.computed(function() { return vmappwidth(); }, avm);
      avm.AppHeight=ko.computed(function() { return vmappheight(); }, avm);

      avm.WindowWidth=ko.computed(function() { return vmwinwidth(); }, avm);
      avm.WindowHeight=ko.computed(function() { return vmwinheight(); }, avm);

      avm.Lang=ko.observable(ngApp.Lang);
      avm.LangCountry=ko.observable(ngApp.LangCountry);
      avm.LangVariant=ko.observable(ngApp.LangVariant);
      avm.LangId=ko.observable(ngMakeLangId(ngApp.Lang,ngApp.LangCountry,ngApp.LangVariant));

      var changinglang=false;

      ngApp.AddEvent('OnLangChanged', function(app) {
        var oldchanginglang=changinglang;
        changinglang=true;
        try {
          avm.Lang(app.Lang);
          avm.LangCountry(app.LangCountry);
          avm.LangVariant(app.LangVariant);
          avm.LangId(ngMakeLangId(app.Lang,app.LangCountry,app.LangVariant));
        } finally {
          changinglang=oldchanginglang;
        }
      });

      avm.Lang.subscribe(function(val) {
        if(changinglang) return;
        ngApp.SetLang(val);
      });

      avm.LangCountry.subscribe(function(val) {
        if(changinglang) return;
        ngApp.SetLang(ngApp.Lang, val);
      });

      avm.LangVariant.subscribe(function(val) {
        if(changinglang) return;
        ngApp.SetLang(ngApp.Lang, ngApp.LangCountry, val);
      });

      avm.LangId.subscribe(function(val) {
        if(changinglang) return;
        ngApp.SetLangById(val);
      });

      avm.FullScreenMode=ko.observable(ngVal(ngApp.InFullScreenMode,false));
      ngApp.AddEvent('OnEnterFullScreenMode',function() {
        avm.FullScreenMode(true);
      });
      ngApp.AddEvent('OnExitFullScreenMode',function() {
        avm.FullScreenMode(false);
      });

      avm.FullScreenControl=ko.observable(ngVal(ngApp.FullScreenControl,null));
      ngApp.AddEvent('OnEnterFullScreen',function(c, options) {
        avm.FullScreenControl(c);
      });
      ngApp.AddEvent('OnExitFullScreen',function(c, options) {
        if(avm.FullScreenControl()===c) avm.FullScreenControl(null);
      });

      if(typeof ngSetDevice==='function') {
        vmdevice=ko.observable(ngDevice);
        vmdeviceprofile=ko.observable(ngDeviceProfile);

        function ngdevice_computed() {
          return ko.computed({
          read: function() {
            return vmdevice();
          },
          write: function(value) {
            ngSetDevice(value);
          },
          owner:avm});
        }

        function ngdeviceprofile_computed() {
          return ko.computed(function() { return vmdeviceprofile(); }, avm);
        }
        avm.ngDevice=ngdevice_computed();
        avm.ngDeviceProfile=ngdeviceprofile_computed();

        var actdev=ngdevice_computed();
        var actdevprof=ngdeviceprofile_computed();

        var vmdynamicdeviceinit=false;

        var oldddsubscribe=actdev.subscribe;
        actdev.subscribe=function() {
          if(vmdynamicdeviceinit==false) {
            vmdynamicdeviceinit=true;
            ngApp.AddEvent('OnDeviceChanged',vmtrackdevicechanged);
          }
          return oldddsubscribe.apply(this, arguments);
        }

        var oldddprofsubscribe=actdevprof.subscribe;
        actdevprof.subscribe=function() {
          if(vmdynamicdeviceinit==false) {
            vmdynamicdeviceinit=true;
            ngApp.AddEvent('OnDeviceChanged',vmtrackdevicechanged);
          }
          return oldddprofsubscribe.apply(this, arguments);
        }
        avm.ngDeviceD=actdev;
        avm.ngDeviceProfileD=actdevprof;

        ngOnDeviceChanged=ngAddEvent(ngOnDeviceChanged,vm_setdevice);
      }

      window.onresize = ngAddEvent(window.onresize, vm_onresize);
    }

    ngRegisterControlType('ngSysViewModel',(function()
    {
      var fc=function(def, ref, parent) {
        var vm=new ngSysViewModel;
        if(!vm) return vm;
        vm.SetNamespace(ngVal(def.Namespace,vm.Namespace));
        if((ng_typeArray(def.FieldDefs))&&(def.FieldDefs.length>0))
        {
          function setfielddefs()
          {
            var fd;
            for(var i=0;i<def.FieldDefs.length;i++)
            {
              fd=def.FieldDefs[i];
              if((ngIsFieldDef(fd))&&(fd.ID!='')) ko.ng_fielddef(this,fd);
            }
          }
          vm.SetViewModel(setfielddefs);
        }
        if((typeof def.ViewModel === 'object')||(typeof def.ViewModel === 'function')) vm.SetViewModel(def.ViewModel);
        if((typeof def.Data === 'object')&&(typeof def.Data.ViewModel === 'object'))
        {
          vm.SetValues(def.Data.ViewModel);
          delete def.Data.ViewModel;
        }

        if(typeof def.RefViewModel !== 'undefined')
        {
          def.OnCreated=ngAddEvent(def.OnCreated, function (c, ref) {
            var refvm=def.RefViewModel;
            if(ng_typeString(refvm)) refvm=getViewModelById(refvm);
            if(refvm) vm.Assign(refvm);
          });
        }
        return vm;
      };
      fc.ControlsGroup='System';
      return fc;
    })());


    window.DSVM_SORT_ASC=0;
    window.DSVM_SORT_DESC=1;

    window.ngSortBy = function(field,sortdir) {
      this.FieldID=field;
      this.SortDir=ngVal(sortdir,0)
    };

    window.ngSortBy.Fields = function() {
      var args=arguments;
      if((args.length===1)&&(ng_IsArrayVar(args[0]))) args=args[0];
      var arg,dir=0;
      var f=null;
      var ret=[];
      for(var i=0;i<=args.length;i++) {
        if(i<args.length)
        {
          arg=args[i];
          if(ng_isNumber(arg))
          {
            dir=arg;
            continue;
          }
        }
        if(f)
        {
          ret.push(new ngSortBy(f,dir));
          dir=0;
          f=null;
        }
        if(ng_typeString(arg)) f=arg;
      }
      return ret;
    };

    window.ngSortBy.AllowAnySortBy = function() {
      return [new ngSortBy('*')];
    };

    function ngdsvm_HasDataSet() {
      if(ng_IsArrayVar(this.DataSet)) return true;

      var ds=this.ViewModel.DataSet;
      if(ngIsFieldDef(ds)) {
        ds=ds.GetTypedValue(false);
        if(ng_IsArrayVar(ds)) return true;
      }
      return false;
    }

    function ngdsvm_DoGetDataSet() {
      var ds=this.ViewModel.DataSet;
      if(ngIsFieldDef(ds)) {
        ds=ds.GetTypedValue(false);
        if(ng_IsArrayVar(ds)) return ng_CopyVar(ds);
      }
      return ng_CopyVar(this.DataSet);
    }

    window.DBVM_FILTERTYPE_IGNORE=     'IGNORE';
    window.DBVM_FILTERTYPE_STARTSWITH= 'STARTSWITH';
    window.DBVM_FILTERTYPE_ENDSWITH=   'ENDSWITH';
    window.DBVM_FILTERTYPE_CONTAINS=   'CONTAINS';
    window.DBVM_FILTERTYPE_GT=         'GT';
    window.DBVM_FILTERTYPE_GTE=        'GTE';
    window.DBVM_FILTERTYPE_LT=         'LT';
    window.DBVM_FILTERTYPE_LTE=        'LTE';
    window.DBVM_FILTERTYPE_NOTEQ=      'NOTEQ';
    window.DBVM_FILTERTYPE_EQ=         'EQ';
    window.DBVM_FILTERTYPE_IN=         'IN';

    function ngdsvm_DoFilterDataSetField(fd,fid,val,filterval,filtertype)
    {
      if(this.OnFilterDataSetField) return ngVal(this.OnFilterDataSetField(this,fd,fid,val,filterval,filtertype),false);
      if(filterval===null) return true;
      switch(filtertype)
      {
        case DBVM_FILTERTYPE_IGNORE:
          return true;
        case DBVM_FILTERTYPE_STARTSWITH:
        case DBVM_FILTERTYPE_ENDSWITH:
        case DBVM_FILTERTYPE_CONTAINS:
          val=ng_toString(val).toLowerCase();
          filterval=ng_toString(filterval).toLowerCase();
          break;
      }

      switch(filtertype)
      {
        case DBVM_FILTERTYPE_STARTSWITH:
          if(val.substr(0,filterval.length)===filterval) return true;
          break;
        case DBVM_FILTERTYPE_ENDSWITH:
          if((val.length>=filterval.length)&&(val.substr(val.length-filterval.length,filterval.length)===filterval)) return true;
          break;
        case DBVM_FILTERTYPE_CONTAINS:
          if(val.indexOf(filterval)>=0) return true;
          break;
        case DBVM_FILTERTYPE_GT:
          if(val>filterval) return true;
          break;
        case DBVM_FILTERTYPE_GTE:
          if(val>=filterval) return true;
          break;
        case DBVM_FILTERTYPE_LT:
          if(val<filterval) return true;
          break;
        case DBVM_FILTERTYPE_LTE:
          if(val<=filterval) return true;
          break;
        case DBVM_FILTERTYPE_NOTEQ:
          if(val!=filterval) return true;
          break;
        case DBVM_FILTERTYPE_IN:
          if(ng_IsArrayVar(filterval)) {
            var aval, afd=ngIsFieldDef(fd) ? fd.ValueFieldDef : void 0;
            for(var i=0;i<filterval.length;i++) {
              aval=filterval[i];
              if(afd) {
                try {
                  aval=afd.TypedValue(aval);
                } catch(e) {
                }
              }
              if(val==aval) return true;
            }
          }
          else if(val==filterval) return true;
          break;
        default:
        case DBVM_FILTERTYPE_EQ:
          if(val==filterval) return true;
          break;
      }
      return false;
    }

    function ngdsvm_DoFilterDataSet(ds) {
      var filtervals=this.GetActiveFilterValues(null, true, false);
      if(!ng_EmptyVar(filtervals)) {
        var i,f,v,r,m,fd,ft,fds=[];
        var filterfields={};
        for(i in filtervals) filterfields[i]=this.GetFieldByID('Filters.'+i);
        for(i=0;i<ds.length;i++) {
          r=ds[i];
          m=true;
          for(f in filtervals) {
            v=vmGetFieldValueByID(r,f);
            fd=filterfields[f];
            if(ngIsFieldDef(fd)) {
              ft=ngVal(fd.Attrs['FilterType'],null);
              if(ft===null) {
                if(((fd.DataType==='STRING')||(fd.DataType==='NVARCHAR'))&&(ng_isEmpty(fd.Enum))) ft=DBVM_FILTERTYPE_STARTSWITH;
                else if(fd.DataType==='ARRAY') ft=DBVM_FILTERTYPE_IN;
              }
            }
            else { ft=DBVM_FILTERTYPE_EQ; fd=null; }
            if(!this.DoFilterDataSetField(fd,f,v,filtervals[f],ft)) { m=false; break; }
          }
          if(m) fds.push(r);
        }
        ds=fds;
      }
      return ds;
    }

    function ngdsvm_DoSortDataSet(ds, sortby) {
      if((ng_IsArrayVar(sortby))&&(sortby.length>0)&&(ng_IsArrayVar(ds))&&(typeof ds.sort==='function')) {
        var oncompare=this.OnSortCompare;
        ds.sort(function (a,b) {
          var v1,v2,f,d,r;
          for(var i=0;i<sortby.length;i++) {
            f=ngVal(sortby[i].FieldID,'');
            if(f==='') continue;
            d=ngVal(sortby[i].SortDir,0);
            v1=(ng_typeObject(a) ? a[f] : void 0);
            v2=(ng_typeObject(b) ? b[f] : void 0);
            if(oncompare) {
              r=oncompare(ds,v1,v2,f,d,a,b);
              if(typeof r==='undefined') {
                if(v1<v2) return d ? 1 : -1;
                if(v1>v2) return d ? -1 : 1;
              }
              else {
                if(r!==0) {
                  if(d) r=r<0 ? 1 : -1;
                  return r;
                }
              }
            }
            else {
              if(v1<v2) return d ? 1 : -1;
              if(v1>v2) return d ? -1 : 1;
            }
          }
          return 0;
        });
      }
      return ds;
    }

    function ngdsvm_DoGetRecords(offset, count, coldefs, sortby)
    {
      var recs;
      if(this.OnDoGetRecords) recs=this.OnDoGetRecords(this, offset, count, coldefs, sortby);
      if(!ng_IsArrayVar(recs)) {
        var ds=this.DoGetDataSet();
        if(ng_IsArrayVar(ds)) {
          ds=this.DoFilterDataSet(ds);
          if(!ng_IsArrayVar(ds)) return;
          ds=this.DoSortDataSet(ds, sortby);
          if(!ng_IsArrayVar(ds)) return;
          recs=[];

          if((offset<=0)&&(count<0)) recs=ds;
          else {
            var to=offset+(count < 0 ? ds.length : count);

            for(var i=offset;(i<to)&&(i<ds.length);i++)
            recs.push(ds[i]);
          }
        }
      }
      return recs;
    }

    function ngdsvm_DoGetTotalCount()
    {
      var totalcnt;
      if(this.OnDoGetTotalCount) totalcnt=this.OnDoGetTotalCount(this);
      if(!ng_isNumber(totalcnt)) {
        var ds=this.DoGetDataSet();
        if(ng_IsArrayVar(ds)) {
          ds=this.DoFilterDataSet(ds);
          if(ng_IsArrayVar(ds)) totalcnt=ds.length;
        }
      }
      return totalcnt;
    }

    function ngdsvm_IsAllowedSortBy(sortby)
    {
      if(!ng_IsArrayVar(sortby)) return false;

      var vm=this.ViewModel;
      if(!vm) return false;
      var allowedsortby;
      if(ngIsFieldDef(vm.AllowedSortBy)) {
        allowedsortby=vm.AllowedSortBy.GetTypedValue(false,null);
      } else
        return false;

      if(!ng_IsArrayVar(allowedsortby)) return false;

      var sbcnt=sortby.length;
      var cnt=allowedsortby.length;
      for(var i=0;i<cnt;i++)
      {
        var asb=allowedsortby[i];
        var asbcnt=asb.length;
        if((asbcnt>0)&&(asb[0].FieldID=='*')) return true;
        if(asbcnt===sbcnt)
        {
          for(var j=0;j<sbcnt;j++)
          {
            var s1=sortby[j];
            var s2=asb[j];
            if(s2.FieldID==='*') return true;
            if((s1.FieldID!==s2.FieldID)||(s1.SortDir!==s2.SortDir)) break;
          }
          if(j===sbcnt) return true;
        }
      }
      return false;
    }

    function ngdsvm_GetActiveFilterValues(filterfields, asarray, includenull)
    {
      var vals={};
      var vm=this.ViewModel;
      if((!vm)||(ng_EmptyVar(vm._ActiveFilters))) return vals;

      if(ngNullVal(filterfields,null)===null) filterfields=this.GetFilterDefs();
      var fd,val;
      for(i in filterfields)
      {
        fd=filterfields[i];
        if(!fd) continue;

        if((!ngIsFieldDef(fd))||(!fd.PrivateField)) val=vmGetFieldValueByID(vm,'_ActiveFilters.'+i);
        else val=ko.ng_getvalue(fd);

        try
        {
          if(ngIsFieldDef(fd)) val=fd.TypedValue(val);
          if((includenull)||(val!==null)) {
            if(asarray) vals[i]=val;
            else vmSetFieldValueByID(vals,i,val);
          }
        }
        catch(e)
        {
        }
      }
      return vals;
    }

    function ngdsvm_DoCommand(c,cmd,options,vals,err) {

      if(!options.DataSetRecords) delete vals['Records'];

      var offset=ko.ng_getvalue(c.ViewModel.Offset);
      var count=ko.ng_getvalue(c.ViewModel.Count);
      offset=ng_toNumber(offset,0);

      if(offset<0)
      {
        if((count===null)||(count === void 0)) count+=offset;
        offset=0;
      }
      if((count===null)||(count === void 0)) count=-1;
      else {
        count=ng_toNumber(count,0);
        if(count<0) count=0;
      }

      function getrecords() {
        var sortby=ko.ng_getvalue(c.ViewModel.SortBy);
        if(!c.IsAllowedSortBy(sortby))
        {
          if(ngIsFieldDef(c.ViewModel.SortBy)) sortby=c.ViewModel.SortBy.GetTypedDefaultValue();
        }

        var recs=c.DoGetRecords(offset, count, c.GetColumnDefs(), sortby);
        if((ng_IsArrayVar(recs))&&(c.ViewModel)) {
          var vm=c.ViewModel;
          if(ngIsFieldDef(vm.Records)) recs=vm.Records.TypedValue(recs);
          vm.Records=ko.ng_setvalue(vm.Records, recs);
          return true;
        }
        return false;
      }

      function applyfilters() {
        var activefilters={};
        c.ScanValues(function(vm,val,instance,valpath) {
          if(valpath.substr(0,8)==='Filters.') {
            valpath=valpath.substr(8);
            if(ngIsFieldDef(instance)) {
              if(instance.PrivateField) return true;
              try {
                val=instance.GetTypedValue();
              } catch(e) {
                val=instance.GetTypedDefaultValue();
              }
            }
            vmSetFieldValueByID(activefilters,valpath,val);
          }
          return true;
        });
        var vm=c.ViewModel;
        if(vm) {
          if(ng_EmptyVar(activefilters)) delete vm._ActiveFilters;
          else vm._ActiveFilters=ko.ng_setvalue(vm._ActiveFilters, activefilters);
        }
      }
      var noserver=(ngVal(options.URL,this.ServerURL)=='') || c.HasDataSet(); // no server
      var cmderr;
      switch(cmd)
      {
        case 'getrecords':
          if(c.OnGetRecords) {
            var ret=c.OnGetRecords(c, offset, count);
            if(ngVal(ret,true)) return true;
          }
          if(noserver) {
            if(getrecords()) return true;
          }
          cmderr='viewmodel_err_cmd_data';
          break;
        case 'recordcount':
          if(c.OnGetTotalCount) {
            var ret=c.OnGetTotalCount(c);
            if(ngVal(ret,true)) return true;
          }
          if(noserver) {
            var totalcnt=c.DoGetTotalCount();
            if((ng_isNumber(totalcnt))&&(c.ViewModel)) {
              var vm=c.ViewModel;
              if(ngIsFieldDef(vm.TotalCount)) totalcnt=vm.TotalCount.TypedValue(totalcnt);
              vm.TotalCount=ko.ng_setvalue(vm.TotalCount, totalcnt);
              return true;
            }
          }
          cmderr='viewmodel_err_cmd_data';
          break;
        case 'applyfilters':
          if(c.OnApplyFilters) {
            var ret=c.OnApplyFilters(c);
            if(ngVal(ret,true)) return true;
          }
          if(noserver) {
            applyfilters();
            getrecords();
            return true;
          }
          cmderr='viewmodel_err_cmd_data';
          break;
        case 'resetfilters':
          if(c.OnResetFilters) {
            var ret=c.OnResetFilters(c);
            if(ngVal(ret,true)) return true;
          }
          if(noserver) {
            c.ScanValues(function(vm,val,instance,valpath) {
              if(valpath.substr(0,8)==='Filters.') {
                if(ngIsFieldDef(instance)) {
                  if((ko.isObservable(instance.Value))&&(typeof instance.DefaultValue!=='undefined'))
                    ko.ng_setvalue(instance.Value, instance.DefaultValue)
                  else instance.Clear();
                }
                else {
                  var val=vmGetFieldValueByID(c.DefaultValues,valpath);
                  if(typeof val!=='undefined') vmSetFieldValueByID(vm, valpath, val);
                }
              }
              return true;
            });
            applyfilters();
            getrecords();
            return true;
          }
          cmderr='viewmodel_err_cmd_data';
          break;
      }
      if((typeof options.CommandErrorMessage==='undefined')&&(cmderr)) options.CommandErrorMessage=ngTxt(cmderr);
      return ng_CallParent(c,'OnDoCommand',arguments,false);
    }

    function ngdsvmm_GetRecords() {
      var c=this.Owner;
      if(c) c.Command('getrecords');
    }

    function ngdsvmm_GetTotalCount() {
      var c=this.Owner;
      if(c) c.Command('recordcount');
    }

    function ngdsvmm_ApplyFilters() {
      var c=this.Owner;
      if(c) c.Command('applyfilters');
    }

    function ngdsvmm_ResetFilters() {
      var c=this.Owner;
      if(c) c.Command('resetfilters');
    }

    function ngdsvm_GetColumnDefs() {
      var defs={};
      this.ScanValues(function(vm,val,instance,valpath) {
        if(valpath.substr(0,8)==='Columns.') {
          valpath=valpath.substr(8);
          if(ngIsFieldDef(instance)) defs[valpath]=instance;
          else defs[valpath]=val;
        }
        return true;
      });
      return defs;
    }

    function ngdsvm_GetFilterDefs() {
      var defs={};
      this.ScanValues(function(vm,val,instance,valpath) {
        if(valpath.substr(0,8)==='Filters.') {
          valpath=valpath.substr(8);
          if(ngIsFieldDef(instance)) defs[valpath]=instance;
          else defs[valpath]=val;
        }
        return true;
      });
      return defs;
    }

    ngRegisterControlType('ngSysDataSetViewModel',(function()
    {
      var fc=function(def, ref, parent) {
        ng_MergeDef(def, {
          Data: {
            DataSet: void 0
          },
          Methods: {
            HasDataSet: ngdsvm_HasDataSet,
            DoGetDataSet: ngdsvm_DoGetDataSet,
            DoFilterDataSet: ngdsvm_DoFilterDataSet,
            DoFilterDataSetField: ngdsvm_DoFilterDataSetField,
            DoSortDataSet: ngdsvm_DoSortDataSet,

            DoGetRecords: ngdsvm_DoGetRecords,
            DoGetTotalCount: ngdsvm_DoGetTotalCount,
            GetColumnDefs: ngdsvm_GetColumnDefs,
            GetFilterDefs: ngdsvm_GetFilterDefs,
            IsAllowedSortBy: ngdsvm_IsAllowedSortBy,
            GetActiveFilterValues: ngdsvm_GetActiveFilterValues
          },
          OverrideEvents: {
            OnDoCommand: ngdsvm_DoCommand,
            OnDoGetRecords: null,
            OnDoGetTotalCount: null
          },
          Events: {
            OnGetRecords: null,
            OnGetTotalCount: null,
            OnApplyFilters: null,
            OnResetFilters: null,
            OnSortCompare: null,
            OnFilterDataSetField: null
          }
        });
        def.OnCreated=ngAddEvent(def.OnCreated, function(c,ref) {
          var fd,cols=c.GetColumnDefs();
          for(var i in cols) {
            fd=cols[i];
            if(!ngIsFieldDef(fd)) continue;
            fd.ReadOnly=void 0;
            fd.Required=false;
            fd.Attrs['Serialize']=false;
          }
        });
        var vmdata;
        if((typeof def.Data === 'object')&&(typeof def.Data.ViewModel === 'object'))
        {
          // set values after dataset fields are created
          vmdata=def.Data.ViewModel;
          delete def.Data.ViewModel;
        }

        var c=ngCreateControlAsType(def, 'ngSysViewModel', ref, parent);
        if(c) {
          var vm=c.ViewModel;
          if(vm) {
            if(typeof vm.Offset==='undefined')        ko.ng_fielddef(vm, new ngFieldDef('Offset', 'INTEGER'));
            if(typeof vm.Count==='undefined')         ko.ng_fielddef(vm, new ngFieldDef('Count', 'INTEGER'));
            if(typeof vm.DataSet==='undefined')       {
              ko.ng_fielddef(vm, new ngDataSetFieldDef('DataSet', { DefaultValue: null } ));
              vm.DataSet.Value(null); // Knockout workaround
            }
            if(typeof vm.SortBy==='undefined')        ko.ng_fielddef(vm, new ngFieldDef('SortBy', 'ARRAY'));
            if(typeof vm.AllowedSortBy==='undefined') ko.ng_fielddef(vm, new ngLookupFieldDef('AllowedSortBy'));
            if(typeof vm.Records==='undefined')       ko.ng_fielddef(vm, new ngFieldDef('Records', 'ARRAY', { NullIfEmpty: false }));
            if(typeof vm.TotalCount==='undefined')    ko.ng_fielddef(vm, new ngFieldDef('TotalCount', 'INTEGER'));
            if(typeof vm.GetRecords==='undefined')    vm.GetRecords=ngdsvmm_GetRecords;
            if(typeof vm.GetTotalCount==='undefined') vm.GetTotalCount=ngdsvmm_GetTotalCount;
            if(typeof vm.ApplyFilters==='undefined')  vm.ApplyFilters=ngdsvmm_ApplyFilters;
            if(typeof vm.ResetFilters==='undefined')  vm.ResetFilters=ngdsvmm_ResetFilters;

            if(((ng_typeArray(def.ColumnFieldDefs))&&(def.ColumnFieldDefs.length>0))
             ||((ng_typeArray(def.FilterFieldDefs))&&(def.FilterFieldDefs.length>0)))
            {
              function addfielddefs(vm,fdefs,prefix) {
                if(!ng_typeArray(fdefs)) return;

                var fd;
                for(var i=0;i<fdefs.length;i++)
                {
                  fd=fdefs[i];
                  if((ngIsFieldDef(fd))&&(fd.ID!='')) {
                    if(fd.ID.substr(0,prefix.length)!==prefix) fd.ID=prefix+fd.ID;
                    ko.ng_fielddef(vm,fd);
                  }
                }
              }

              function setfielddefs()
              {
                addfielddefs(this,def.ColumnFieldDefs,"Columns.");
                addfielddefs(this,def.FilterFieldDefs,"Filters.");
              }
              c.SetViewModel(setfielddefs);
            }

            if(typeof vmdata!=='undefined') c.SetValues(vmdata);
          }
        }
        return c;
      };
      fc.ControlsGroup='System';
      return fc;
    })());

    if(ngUserControls['settings'])
    {
      function ngsvmset_DoCreate(def,ref) {

        if((!this._settings)&&(typeof ngApp === 'object')&&(ngApp)&&(ng_typeObject(ngApp.Settings))) {
          this._settings=ngApp.Settings;
        }
        if(this._settings) {
          var self=this;
          this._settingsloaded=function(settings) {
            if(this.Enabled) {
              if(self.OnSettingsLoaded) self.OnSettingsLoaded(self,settings);
            } else self._changed=true;
          }
          this._settings.AddEvent('OnSettingsLoaded',this._settingsloaded);
        }
        if((this.Enabled)&&(this._settings)&&(!this._initialized)) {
          this._initialized=true;
          if(this.OnInitialized) this.OnInitialized(this,this._settings);
        }
      }

      function ngsvmset_DoSetEnabled(s) {
        this.Enabled=s;
        if((s)&&(this._settings)) {
          if(!this._initialized) {
            this._initialized=true;
            this._changed=false;
            if(this.OnInitialized) this.OnInitialized(this,this._settings);
          }
          if(this._changed) {
            this._changed=false;
            if(this._settingsloaded) this._settingsloaded(this._settings);
          }
        }
      }

      function ngsvmset_DoDispose() {
        if((this._settings)&&(this._settingsloaded)) {
          this._settings.RemoveEvent('OnSettingsLoaded',this._settingsloaded);
        }
        return true;
      }

      function ngsvmset_SetValues(values) {
        if((ng_typeObject(values))&&(this._settings)&&(this.Enabled)) {
          this._settings.BeginUpdate();
          try {
            for(var i in values) {
              this._settings.Set(i,values[i]);
            }
          }
          finally {
            this._settings.EndUpdate();
          }
        }
      }

      /**
       *  Class: ngSysViewModelSettings
       *  This class implements ngSysViewModelSettings non-visual control.
       *  Allows easy storage of ViewModel values into ngSettings.
       *
       *  Syntax:
       *    new *ngSysViewModelSettings* ([ngSettings settings, string id])
       *
       *  Parameters:
       *    settings - settings instance, ngApp.Settings is used if not provided
       *    id - control ID
       */
      window.ngSysViewModelSettings = function(settings,id)
      {
        ngSysControl(this, id, 'ngSysViewModelSettings');

        this._settings = ngVal(settings,null);
        this._changed = false;
        this._initialized = false;

        /*
         *  Group: Methods
         */
        /*  Function: SetValues
         *  Sets settings values.
         *
         *  Syntax:
         *    void *SetValues* (object values)
         *
         *  Parameters:
         *    values - object with values to be set
         *
         *  Returns:
         *    -
         */
        this.SetValues = ngsvmset_SetValues;

        this.DoCreate = ngsvmset_DoCreate;
        this.DoDispose = ngsvmset_DoDispose;
        this.DoSetEnabled = ngsvmset_DoSetEnabled;

        /*
         *  Group: Events
         */
        /*
         *  Event: OnSettingsLoaded
         */
        this.OnSettingsLoaded = null;
        /*
         *  Event: OnInitialized
         */
        this.OnInitialized = null;

        ngControlCreated(this);
      }

      ngRegisterControlType('ngSysViewModelSettings', (function()
      {
        var fc=function(def, ref, parent) {
          return new ngSysViewModelSettings(def.Settings);
        };
        fc.ControlsGroup='System';
        return fc;
      })());
    }

    function value_lock(type,c,fnc) {
      type='binding_updating'+ngVal(type,'');
      if(c[type]) return false;
      c[type]=true;
      try {
        fnc();
      }
      finally { delete c[type]; }
      return true;
    }

    window.ngCtrlBindingLock = value_lock;

    function is_value_locked(type, c) {
      return (c['binding_updating'+ngVal(type,'')] ? true : false);
    }

    window.ngCtrlBindingIsLocked = is_value_locked;

    function value_write_ex(val,valueAccessor, allBindingsAccessor) {
      var modelValue = valueAccessor();
      val=ko.ng_setvalue(modelValue,val);
      if(!ko.isObservable(modelValue)) {
        var allBindings = allBindingsAccessor();
        if (allBindings['_ko_property_writers'] && allBindings['_ko_property_writers']['value']) {
          allBindings['_ko_property_writers']['value'](val);
        }
      }
      return (modelValue===val);
    }

    window.ngCtrlBindingWriteEx = value_write_ex;

    function value_write(type,val,c, valueAccessor, allBindingsAccessor, obj)
    {
      type='binding_updating'+ngVal(type,'');
      if(c[type]) return false;

      var ret=false;
      c[type]=true;
      try {
        ret=value_write_ex(val,valueAccessor, allBindingsAccessor);
      }
      finally { delete c[type]; }
      return ret;
    }
    window.ngCtrlBindingWrite = value_write;

    function value_read(type,c, valueAccessor, setfnc)
    {
      var val=ko.ng_getvalue(valueAccessor());
      return value_lock(type,c,function() {
        setfnc(val)
      });;
    }
    window.ngCtrlBindingRead = value_read;

    function format_text_value(valueAccessor, val)
    {
      var obval=valueAccessor();
      if((obval)&&(typeof obval.FieldDef !== 'undefined'))
      {
        if((arguments.length==1)&&(obval.FieldDef.Value)) val=obval.FieldDef.Value;
        return obval.FieldDef.FormatString(ko.ng_getvalue(val));
      }
      else
      {
        if(arguments.length==1) val=obval;
        return ng_toString(ko.ng_getvalue(val));
      }
    }
    window.ngCtrlBindingFormatString = format_text_value;

    function format_edit_value(valueAccessor, val)
    {
      var obval=valueAccessor();
      if((obval)&&(typeof obval.FieldDef !== 'undefined'))
      {
        if((arguments.length==1)&&(obval.FieldDef.Value)) val=obval.FieldDef.Value;
        return obval.FieldDef.EditString(ko.ng_getvalue(val));
      }
      else
      {
        if(arguments.length==1) val=obval;
        return ng_toString(ko.ng_getvalue(val));
      }
    }
    window.ngCtrlBindingEditString = format_edit_value;

    function parse_text_value(valueAccessor, val)
    {
      var obval=valueAccessor();
      if((obval)&&(typeof obval.FieldDef !== 'undefined')) return obval.FieldDef.ParseString(val);
      else return val;
    }
    window.ngCtrlBindingParseString = parse_text_value;

    ngRegisterBindingHandler('Visible',
      function (c, valueAccessor) {
        value_read('Visible',c,valueAccessor,function(val) {
          if(c.SetVisible) c.SetVisible(ng_toBool(val));
        });
      },
      function (c, valueAccessor, allBindingsAccessor,viewModel) {
        c.AddEvent(function(c) {
          value_write('Visible',c.Visible,c, valueAccessor, allBindingsAccessor);
        },'OnVisibleChanged');
      }
    );

    ngRegisterBindingHandler('Bounds',
      function (c, valueAccessor, allBindingsAccessor) {
        var binding=allBindingsAccessor();
        var boundsupdate = ngVal(binding["BoundsDelayedUpdate"],10);

        value_read('Bounds',c,valueAccessor,function(val) {
          if((!ng_typeObject(val))||(typeof c.SetBounds !== 'function')) return;
          if((c.SetBounds(val))&&(boundsupdate>=0)) {
            if(c._vmboundsupdtimer) clearTimeout(c._vmboundsupdtimer);
            if(boundsupdate>0) {
              c._vmboundsupdtimer=setTimeout(function() {
                if(c._vmboundsupdtimer) clearTimeout(c._vmboundsupdtimer);
                c._vmboundsupdtimer=null;
                if(c.Update) c.Update();
              },boundsupdate);
            }
            else if(c.Update) c.Update();
          }
        });
      },
      function (c, valueAccessor, allBindingsAccessor,viewModel) {
        if(typeof c.SetBounds === 'function') {
          ng_OverrideMethod(c,'SetBounds', function(props) {
            var ret=ng_CallParent(c,'SetBounds',arguments,false);
            if(typeof props!=='undefined') {
              value_write('Bounds',props,c, valueAccessor, allBindingsAccessor);
            }
            return ret;
          });
          c.AddEvent(function() {
            if(c._vmboundsupdtimer) clearTimeout(c._vmboundsupdtimer);
            c._vmboundsupdtimer=null;
            return true;
          },'DoDispose');
        }
      }
    );

    ngRegisterBindingHandler('style',
      function (c, valueAccessor, allBindingsAccessor) {
        var elm=c.Elm();
        if(elm) {
          value_read('style',c,valueAccessor,function(val) {
            if(ng_typeObject(val)) {
              for(var i in val) {
                elm.style[i] = val[i] || ""; // Empty string removes the value, whereas null/undefined have no effect
              }
            }
          });
        }
      },
      null);

    ngRegisterBindingHandler('className',
      function (c, valueAccessor, allBindingsAccessor) {
        var elm=c.Elm();
        if(elm) {
          value_read('className',c,valueAccessor,function(val) {
            var bcls=val;
            var bi=bcls.indexOf(' ');
            if(bi>=0) bcls=bcls.substr(0,bi);
            elm.className=val;
            if(ngVal(c.BaseClassName,'')!=bcls) {
              c.BaseClassName=bcls;
              c.Update();
            }
          });
        }
      },
      null);

    ngRegisterBindingHandler('SubClassName',
      function (c, valueAccessor, allBindingsAccessor) {
        var elm=c.Elm();
        if(elm) {
          value_read('className',c,valueAccessor,function(val) {
            if(ngVal(c.BaseClassName,'')!='') val=c.BaseClassName+' '+val;
            elm.className=val;
          });
        }
      },
      null);

    ngRegisterBindingHandler('BaseClassName',
      function (c, valueAccessor, allBindingsAccessor) {
        var elm=c.Elm();
        if(elm) {
          value_read('className',c,valueAccessor,function(val) {
            if(ngVal(c.BaseClassName,'')!=val) {
              var bcls;
              var scls=elm.className;
              var bi=scls.indexOf(' ');
              if(bi>=0) bcls=scls.substr(0,bi);
              else      bcls=scls;
              if(ngVal(c.BaseClassName,'')==bcls) {
                if(bi>=0) scls=scls.substr(bi+1);
                else      scls='';
              }
              if((val!='')&&(scls!='')) scls=' '+scls;
              elm.className=val+scls;
              c.BaseClassName=val;
              c.Update();
            }
          });
        }
      },
      null);

    ngRegisterBindingHandler('Opacity',
      function (c, valueAccessor, allBindingsAccessor) {
        var elm=c.Elm();
        if(elm) {
          value_read('Opacity',c,valueAccessor,function(val) {
            c.SetOpacity(ng_toFloat(val));
          });
        }
      },
      function (c, valueAccessor, allBindingsAccessor,viewModel) {
        c.AddEvent(function(o) {
          value_write('Opacity',o,c, valueAccessor, allBindingsAccessor);
        },'SetOpacity');
      });

    function update_enabled(c,valueAccessor,inverse)
    {
      value_read('Enabled',c,valueAccessor,function(val) {
        val=ng_toBool(val);
        if(inverse) val=!val;
        if(c.SetEnabled) c.SetEnabled(val);
      });
    }

    function init_enabled(c,valueAccessor,allBindingsAccessor,inverse)
    {
      c.AddEvent(function(c) {
        value_write('Enabled',inverse ? !c.Enabled : c.Enabled,c, valueAccessor, allBindingsAccessor);
      },'OnEnabledChanged');
    }

    ngRegisterBindingHandler('Enabled',
      function (c, valueAccessor) {
        update_enabled(c,valueAccessor,false);
      },
      function (c, valueAccessor,allBindingsAccessor,viewModel) {
        init_enabled(c,valueAccessor,allBindingsAccessor,false);
      }
    );

    ngRegisterBindingHandler('Disabled',
      function (c, valueAccessor) {
        update_enabled(c,valueAccessor,true);
      },
      function (c, valueAccessor,allBindingsAccessor,viewModel) {
        init_enabled(c,valueAccessor,allBindingsAccessor,false);
      }
    );

    function update_childenabled(c,valueAccessor,inverse)
    {
      value_read('ChildEnabled',c,valueAccessor,function(val) {
        val=ng_toBool(val);
        if(inverse) val=!val;
        if(c.SetChildControlsEnabled) c.SetChildControlsEnabled(val);
      });
    }

    function init_childenabled(c,valueAccessor,allBindingsAccessor,inverse)
    {
      ng_OverrideMethod(c,'SetChildControlsEnabled', function(v,p) {
        ng_CallParent(this, "SetChildControlsEnabled", arguments);
        value_write('ChildEnabled',inverse ? !v : v, c, valueAccessor, allBindingsAccessor);
      });
    }

    ngRegisterBindingHandler('ChildEnabled',
      function (c, valueAccessor) {
        update_childenabled(c,valueAccessor,false);
      },
      function (c, valueAccessor,allBindingsAccessor,viewModel) {
        init_childenabled(c,valueAccessor,allBindingsAccessor,false);
      }
    );

    ngRegisterBindingHandler('ChildDisabled',
      function (c, valueAccessor) {
        update_childenabled(c,valueAccessor,true);
      },
      function (c, valueAccessor,allBindingsAccessor,viewModel) {
        init_childenabled(c,valueAccessor,allBindingsAccessor,false);
      }
    );

    ngRegisterBindingHandler('Focus',
      function (c, valueAccessor, allBindingsAccessor) {
        value_read('Focus',c,valueAccessor,function(val) {
           val=ng_toBool(val);
           if(c._controlfocused!=val)
            c.SetFocus(val);
        });
      },
      function (c, valueAccessor, allBindingsAccessor,viewModel) {
        value_write('Focus',false,c, valueAccessor, allBindingsAccessor);
        if(typeof c.OnFocus !== 'undefined') c.AddEvent('OnFocus', function(c) { c._controlfocused=true; value_write('Focus',true,c, valueAccessor, allBindingsAccessor); return true; });
        if(typeof c.OnBlur !== 'undefined') c.AddEvent('OnBlur', function(c) { value_write('Focus',false,c, valueAccessor, allBindingsAccessor); c._controlfocused=false; return true; });
      }
    );

    ngRegisterBindingHandler('MouseOver', null,
      function (c, valueAccessor, allBindingsAccessor,viewModel) {
        value_write('MouseOver',false,c, valueAccessor, allBindingsAccessor);
        c.AddEvent(function(c) { value_write('MouseOver',true,c, valueAccessor, allBindingsAccessor); },'OnMouseEnter');
        c.AddEvent(function(c) { value_write('MouseOver',false,c, valueAccessor, allBindingsAccessor); },'OnMouseLeave');
      }
    );

    ngRegisterBindingHandler('DragOver', null,
      function (c, valueAccessor, allBindingsAccessor,viewModel) {
        value_write('DragOver',false,c, valueAccessor, allBindingsAccessor);
        c.AddEvent(function(c) { value_write('DragOver',true,c, valueAccessor, allBindingsAccessor); },'OnDragEnter');
        c.AddEvent(function(c) { value_write('DragOver',false,c, valueAccessor, allBindingsAccessor); },'OnDragLeave');
      }
    );

    ngRegisterBindingHandler('Dragged', null,
      function (c, valueAccessor, allBindingsAccessor,viewModel) {
        value_write('Dragged',false,c, valueAccessor, allBindingsAccessor);
        c.AddEvent(function(c) { value_write('Dragged',true,c, valueAccessor, allBindingsAccessor); },'OnDragStarted');
        c.AddEvent(function(c) { value_write('Dragged',false,c, valueAccessor, allBindingsAccessor); },'OnDragEnd');
      }
    );

    function event_init(eventtype, c, valueAccessor, allBindingsAccessor, viewModel) {
      var eventsToHandle = valueAccessor() || {};
      for(var eventNameOutsideClosure in eventsToHandle) {
          (function() {
              var eventName = eventNameOutsideClosure; // Separate variable to be captured by event handler closure
              if (typeof eventName === "string") {
                  var fnc = function (event) {
                      var handlerFunction = valueAccessor()[eventName];
                      if(ng_typeString(handlerFunction)) handlerFunction=viewModel[handlerFunction];
                      if (!handlerFunction) return true;
                      var allBindings = allBindingsAccessor();

                      // Take all the event args, and prefix with the viewmodel
                      var argsForHandler = ko.utils.makeArray(arguments);
                      argsForHandler.unshift(viewModel);
                      return handlerFunction.apply(viewModel, argsForHandler);
                  };
                  switch(eventtype)
                  {
                    case 1:
                      c.AddEvent(fnc,eventName);
                      break;
                    case 2:
                      c[eventName] = fnc;
                    default:
                      c.AddEvent(eventName, fnc);
                      break;
                  }
              }
          })();
      }
    }

    ngRegisterBindingHandler('Events', null,
      function (c, valueAccessor, allBindingsAccessor, viewModel) {
        event_init(0, c, valueAccessor, allBindingsAccessor, viewModel)
      }
    );
    ngRegisterBindingHandler('AfterEvents', null,
      function (c, valueAccessor, allBindingsAccessor, viewModel) {
        event_init(0, c, valueAccessor, allBindingsAccessor, viewModel)
      }
    );
    ngRegisterBindingHandler('BeforeEvents', null,
      function (c, valueAccessor, allBindingsAccessor, viewModel) {
        event_init(1, c, valueAccessor, allBindingsAccessor, viewModel)
      }
    );
    ngRegisterBindingHandler('OverrideEvents', null,
      function (c, valueAccessor, allBindingsAccessor, viewModel) {
        event_init(2, c, valueAccessor, allBindingsAccessor, viewModel)
      }
    );

    ngRegisterBindingHandler('Calls', null,
      function (c, valueAccessor, allBindingsAccessor, viewModel) {
        var callsToHandle = valueAccessor() || {};
        for(var eventNameOutsideClosure in callsToHandle) {
            (function() {
                var eventName = eventNameOutsideClosure; // Separate variable to be captured by event handler closure
                if (typeof eventName === "string") {
                    var fnc = function () {
                        var handlerFunction = valueAccessor()[eventName];
                        if(ng_typeString(handlerFunction)) handlerFunction=c[handlerFunction];
                        if (!handlerFunction) return true;
                        return handlerFunction.apply(c, arguments);
                    };
                    ngObjAddEvent.apply(viewModel,[eventName, fnc]);
                }
            })();
        }

      }
    );

    ngRegisterBindingHandler('Data',
      function (c, valueAccessor, allBindingsAccessor) {
        value_read('Data',c,valueAccessor,function(val) {
          if(c.SetViewModelData) c.SetViewModelData(val);
        });
      },
      function (c, valueAccessor, allBindingsAccessor,viewModel) {
        c.OnViewModelDataChanged = c.OnViewModelDataChanged || null;
        c.ViewModelData=void 0;
        if(typeof c.SetViewModelData !== 'function')
          c.SetViewModelData = function (val)
          {
            if(ng_VarEquals(c.ViewModelData,val)) return;
            var oldval=c.ViewModelData;
            c.ViewModelData=val;
            if(c.OnViewModelDataChanged) c.OnViewModelDataChanged(c,oldval)
            value_write('Data',val,c, valueAccessor, allBindingsAccessor);
          }
      }
    );

    function value_init(c, valueAccessor, allBindingsAccessor, viewModel) {

      switch(c.CtrlType)
      {
        case 'ngSysURLParams':
          ngBindingDeferUpdates('Value',allBindingsAccessor,true);

          c.AddEvent('OnInitialized',function(c) {
            ngCtrlBindingWrite('Value',c.Params,c, valueAccessor, allBindingsAccessor);
          });
          c.AddEvent('OnParamsChanged',function(c) {
            ngCtrlBindingWrite('Value',c.Params,c, valueAccessor, allBindingsAccessor);
          });
          break;
        case 'ngSysViewModelSettings':
          ngBindingDeferUpdates('Value',allBindingsAccessor,true);

          function loadvmsettings(settings) {
            ngCtrlBindingLock('Value',c,function() {
              var v=valueAccessor();
              if((v)&&(ko.isObservable(v))) props=v();
              else props=v;
              if(ng_typeObject(props)) {
                for(var i in props) {
                  props[i]=ko.ng_setvalue(props[i],settings.Get(i,ko.ng_getvalue(props[i])));
                }
                if((v)&&(ko.isWriteableObservable(v))) v(props);
              }
            });
          }
          if((c._settings)&&(c.Enabled)) loadvmsettings(c._settings);
          c.AddEvent('OnInitialized',function(c,settings) {
            loadvmsettings(settings);
          });
          c.AddEvent('OnSettingsLoaded',function(c,settings) {
            loadvmsettings(settings);
          });
          break;
      }
    };

    function value_update(c, valueAccessor, allBindingsAccessor) {
      switch(c.CtrlType)
      {
        case 'ngSysTimer':
          ngCtrlBindingRead('Value',c,valueAccessor,function(val) {
            var v=ng_toInteger(val,null);
            if((c.Interval!==v)&&(v!==null)) {
              c.Interval=v;
              if(c.IsStarted()) c.Restart();
            }
          });
          break;
        case 'ngSysRPC':
          ngCtrlBindingRead('Value',c,valueAccessor,function(val) {
            if(ng_typeObject(val)) {
              for(var i in val) {
                c.SetParam(i,val[i]);
              }
            }
          });
          break;
        case 'ngSysFileDownloader':
          ngCtrlBindingRead('Value',c,valueAccessor,function(val) {
            c.Download(val);
          });
          break;
        case 'ngSysURLParams':
          ngCtrlBindingRead('Value',c,valueAccessor,function(val) {
            if(ng_typeObject(val)) c.SetValues(val);
          });
          break;
        case 'ngSysViewModelSettings':
          ngCtrlBindingRead('Value',c,valueAccessor,function(val) {
            c.SetValues(val);
          });
          break;
      }
    };
    ngRegisterBindingHandler('Value',value_update,value_init);


    ngRegisterBindingHandler('Command',null,
      function (c, valueAccessor, allBindingsAccessor, viewModel) {
        var valuenames = allBindingsAccessor()["ValueNames"];
        var cmd = ''+valueAccessor();
        if(cmd=='') return;
        switch(c.CtrlType)
        {
          case 'ngSysTimer':
            c.AddEvent('OnTimer', function(c) {
              if((viewModel.Owner)&&(viewModel.Owner.Command))
                viewModel.Owner.Command(cmd, (valuenames ? { ValueNames: valuenames } : void 0));
              return true;
            });
            break;
        }
      }
    );

    ngRegisterBindingHandler('Controls',
      function (c, valueAccessor, allBindingsAccessor) {
        ngCtrlBindingRead('Controls',c,valueAccessor,function(val) {
          var controlsdelayedupdate = ngVal(allBindingsAccessor.get("ControlsDelayedUpdate"),10);
          var controlsignoreitemval = ngVal(allBindingsAccessor.get("ControlsIgnoreItemValue"),false);

          if(c._vmcontrolsupdtimer) clearTimeout(c._vmcontrolsupdtimer);
          c._vmcontrolsupdtimer=null;

          if(typeof val==='undefined') val=null;
          if((val!==null)&&(!ng_typeArray(val))) val=[val];
          if(!ng_typeArray(c.VMControls._oldval)) c.VMControls._oldval=[];
          var oldval=c.VMControls._oldval;
          var dfrom=0;
          if((ng_typeArray(val))&&(ng_typeArray(oldval))) {
            if(!controlsignoreitemval) {
              if(c.OnIsViewModelControlChanged)
              {
                for(var i=0;i<val.length && i<oldval.length;i++) {
                  if(!ngVal(c.OnIsViewModelControlChanged(c,val[i],oldval[i]),true)) dfrom=i+1;
                  else break;
                }
              }
              else {
                for(var i=0;i<val.length && i<oldval.length;i++) {
                  if(ng_VarEquals(val[i],oldval[i])) dfrom=i+1;
                  else break;
                }
              }
            }
            else {
              if(val.length<oldval.length) dfrom=val.length;
              else dfrom=oldval.length;
            }
          }
          else {
            if((val!==null)&&(ng_typeArray(c.VMControls))) {
              dfrom=val.length < c.VMControls.length ? val.length : c.VMControls.length;
            }
          }
          var changed=false;

          var dispcnt=oldval.length-dfrom;
          if(dispcnt>0) oldval.splice(dfrom, dispcnt);

          dispcnt=c.VMControls.length-dfrom;
          if(dispcnt>0) {
            if(controlsdelayedupdate>0) {
              if(typeof c._vmdisposecontrols==='undefined') c._vmdisposecontrols=[];
            }

            function disposecntrl(vc) {
              if(controlsdelayedupdate>0) {
                c._vmdisposecontrols.push(vc);
              }
              else {
                if(typeof vc.Dispose==='function') vc.Dispose();
              }
            }

            var vc;
            for(var i=c.VMControls.length-1;i>=dfrom;i--) {
              vc=c.VMControls[i];
              if(!vc) continue;
              if(ng_typeArray(vc)) {
                for(var j=0;j<vc.length;j++) {
                  if(vc[j]) {
                    changed=true;
                    disposecntrl(vc[j]);
                  }
                }
              }
              else {
                changed=true;
                disposecntrl(vc);
              }
            }

            c.VMControls.splice(dfrom, dispcnt);
          }

          if(val!==null) {
            if(typeof c.DoCreateViewModelControl === 'function') {
              var def;
              var arrval=ko.ng_unwrapobservable(valueAccessor());

              var ci={
                Value: arrval,
                UnwrappedValue: val,
                UpdatingFrom: dfrom,
                Count: val.length,
                DisposedCount: dispcnt,
                CreateCount: val.length-dfrom,
                ValueAccessor: valueAccessor,
                AllBindingsAccessor: allBindingsAccessor
              };

              function createcntrl(def) {
                if(ng_typeObject(def)) {
                  def.ParentReferences=false;
                  var cdef={ Control: def };
                  var ref=ngCreateControls(cdef,void 0,c);
                  if(typeof ref.Control !== 'undefined') return ref.Control;
                }
                return null;
              }

              var cc;
              for(var i=dfrom;i<val.length;i++) {
                changed=true;
                oldval[i]=ng_CopyVar(val[i]);
                c.VMControls[i]=null;
                def=c.DoCreateViewModelControl(i, val[i], arrval[i], ci);
                if(ng_typeArray(def)) {
                  cc=[];
                  for(var j=0;j<def.length;j++)
                    cc.push(createcntrl(def[j]));
                }
                else cc=createcntrl(def);
                if(cc) c.VMControls[i]=cc;
              }
            }
            else {
              ngDEBUGWARN('Using binding "Controls" but method DoCreateViewModelControl() is missing!',c);
            }
          }
          if(changed) {
            if(controlsdelayedupdate>0) {
              c._vmcontrolsupdtimer=setTimeout(function() {
                if(c._vmcontrolsupdtimer) clearTimeout(c._vmcontrolsupdtimer);
                c._vmcontrolsupdtimer=null;
                if(ng_typeArray(c._vmdisposecontrols)) {
                  for(var i=0;i<c._vmdisposecontrols.length;i++) {
                    if(typeof c._vmdisposecontrols[i].Dispose==='function') c._vmdisposecontrols[i].Dispose();
                  }
                  c._vmdisposecontrols=[];
                }
                if(c.Update) c.Update();
              },controlsdelayedupdate);
            }
            else {
              if(c.Update) c.Update();
            }
          }
        });

      },
      function (c, valueAccessor, allBindingsAccessor,viewModel) {
        ngBindingDeferUpdates('Controls',allBindingsAccessor,true);

        if(typeof c.VMControls === 'undefined') {
          c.VMControls=[];
          c.VMControls._oldval=[];
        }
        c.AddEvent(function() {
          if(c._vmcontrolsupdtimer) clearTimeout(c._vmcontrolsupdtimer);
          c._vmcontrolsupdtimer=null;
          if(ng_typeArray(c._vmdisposecontrols)) {
            for(var i=0;i<c._vmdisposecontrols.length;i++) {
              if(typeof c._vmdisposecontrols[i].Dispose==='function') c._vmdisposecontrols[i].Dispose();
            }
          }
          delete c._vmdisposecontrols;
          return true;
        },'DoDispose');
      }
    );

    ngRegisterBindingHandler('Link',null,null);
  }
};
