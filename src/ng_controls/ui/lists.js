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

/**
 *  Group: Lists
 */

// --- ngList ------------------------------------------------------------------

var nglUnchecked = 0;
var nglChecked = 1;
var nglGrayed = 2;

var nglSelectNone = 0;
var nglSelectSingle = 1;
var nglSelectMulti = 2;
var nglSelectMultiExt = 3;
var nglSelectSingleExt = 4;
var nglSelectCheck = 5;

var nglClickRow = 0;
var nglClickText = 1;
var nglClickCheckImg = 2;
var nglClickTreeImg = 3;
var nglClickItemImg = 4;

var nglSortAsc = 0;
var nglSortDesc = 1;

var nglRowItem = 0;
var nglRowGroup = 1;

var ngl_CurrentRowId='';
var ngl_FocusTime=0;

function ngl_BeginUpdate()
{
  this.update_cnt++;
}

function ngl_EndUpdate()
{
  this.update_cnt--;
  if(this.update_cnt<=0) {
    this.update_cnt=0;
    if(this._items_changed){
      this._items_changed = false;
      this.DoItemsChanged();
    }
    if(this.need_update) this.Update();
  }
}

function ngl_do_add(list,it,parent)
{
  this.need_update=true;
  if(typeof it==='undefined') return false;
  if(list!=this) ng_SetByRef(it,'Parent',list);
  this.update_cnt++;
  try {
    if((this.OnAdd)&&(!ngVal(this.OnAdd(this,it,parent),false))) { delete it.Parent; return false; }

    var action = this.GetItemAction(it);
    this.SyncItemAction(it,action);

    if((!action)&&(typeof it.RadioGroup !== 'undefined')&&(ngVal(it.Checked,0)))
    {
      this.radio_groups[it.RadioGroup]=it;
    }
    if((typeof it.Checked !== 'undefined')&&(it.Checked!=0)&&(it.Checked!=false))
      this.CheckChanged();
    return true;
  } finally {
    this.update_cnt--;
  }
}

function ngl_Add(it, parent)
{
  var list=parent;
  if((typeof list === 'undefined')||(list===null)) list=this;
  if(typeof it === 'string') { var o=new Object; o.Text=it; it=o; }
  if(typeof list.Items === 'undefined') list.Items=new Array();
  if(!this.do_add(list,it,parent)) return -1;

  var idx=list.Items.length;
  list.Items[idx]=it;
  
  this.DoItemsChanged();

  if(typeof it.Items!=='undefined')
  {
    var items=it.Items;
    delete it.Items;
    for(var j in items)
      this.Add(items[j],it);
  }
  return idx;
}

function ngl_AddItems(items, parent)
{
  if(!items) return;
  this.BeginUpdate();
  try {
    for(var j in items)
      this.Add(items[j], parent);
  } finally {
    this.EndUpdate();
  }
}

function ngl_SetItems(items)
{
  this.BeginUpdate();
  try {
    this.Clear();
    this.AddItems(items);
  } finally {
    this.EndUpdate();
  }
}

function ngl_Insert(idx, it, parent)
{
  var list=parent;
  if((typeof list === 'undefined')||(list===null)) list=this;
  if(typeof it === 'string') { var o=new Object; o.Text=it; it=o; }
  if(typeof list.Items === 'undefined') list.Items=new Array();
  if(!this.do_add(list,it,parent)) return -1;

  if(idx<0) idx=0;
  if(idx>list.Items.length) idx=list.Items.length;
  list.Items.splice(idx,0,it);

  if(typeof it.Items!=='undefined')
  {
    var items=it.Items;
    delete it.Items;
    for(var j in items)
      this.Add(items[j],it);
  }
  return idx;
}

function ngl_Replace(idx, it, parent)
{
  var list=parent;
  if((typeof list === 'undefined')||(list===null)) list=this;
  if((typeof list.Items === 'undefined')||(idx<0)||(idx>list.Items.length)) return null;

  if(!this.do_add(list,it,parent)) return null;

  var delit=null;
  if(idx<list.Items.length) {
    delit=list.Items[idx];
    this.do_remove(delit, parent);
  }

  list.Items[idx]=it;
  
  this.DoItemsChanged();
  
  if(typeof it.Items!=='undefined')
  {
    var items=it.Items;
    delete it.Items;
    for(var j in items)
      this.Add(items[j],it);
  }
  return delit;
}

function ngl_IndexOf(it, parent)
{
  var list=parent;
  if((typeof list === 'undefined')||(list===null)) list=this;
  if(typeof list.Items !== 'undefined')
    for(var i=0;i<list.Items.length;i++)
      if(list.Items[i]==it) return i;
  return -1;
}

function ngl_do_remove(it, parent)
{
  if(typeof it==='undefined') return;
  this.need_update=true;
  this.update_cnt++;
  try {
    if(this.SelCount>0) this.SelectItem(it,false);

    if((typeof it.RadioGroup !== 'undefined')&&(typeof this.radio_groups[it.RadioGroup] !== 'undefined')&&(this.radio_groups[it.RadioGroup]==it))
    {
      this.radio_groups[it.RadioGroup]=null;
    }

    if((typeof it.Checked !== 'undefined')&&(it.Checked!=0)&&(it.Checked!=false))
      this.CheckChanged();

    if(this.OnRemove) this.OnRemove(this,it,parent);
    it.Parent=null;
    if((typeof it.Controls !== 'undefined')&&(typeof this.ItemsControls !== 'undefined'))
    {
      if(this.Columns.length>0)
      {
        var cid,ctrls,ctrl;
        for(var i=0;i<this.Columns.length;i++)
        {
          cid=this.Columns[i].ID;
          if(typeof it.Controls[cid]!=='undefined')
          {
            ctrls=it.Controls[cid];
            for(var c in ctrls)
            {
              if((c=='Owner')||(c=='Parent')) continue;
              ctrl=ctrls[c];
              this.RemoveItemControl(ctrl);
              if((ctrl)&&(typeof ctrl.Dispose === 'function')) ctrl.Dispose();
            }
            delete it.Controls[cid];
          }
        }
      }
      else
      {
        var ctrl;
        for(var c in it.Controls)
        {
          if((c=='Owner')||(c=='Parent')) continue;
          ctrl=it.Controls[c];
          this.RemoveItemControl(ctrl);
          if((ctrl)&&(typeof ctrl.Dispose === 'function')) ctrl.Dispose();
        }
      }
    }
    if(it.Controls) delete it.Controls;
  }
  finally {
    this.update_cnt--;
  }
}

function ngl_Remove(it, parent)
{
  var list=parent;
  if((typeof list === 'undefined')||(list===null)) list=this;
  if(typeof list.Items === 'undefined') return -1;

  var idx=-1;
  for(var i=0;i<list.Items.length;i++)
    if(list.Items[i]==it) { idx=i; break; };

  if(idx>=0)
  {
    this.do_remove(it, parent);
    list.Items.splice(idx,1);
    
    this.DoItemsChanged();
  }
  return idx;
}

function ngl_Delete(idx, parent)
{
  var list=parent;
  if((typeof list === 'undefined')||(list===null)) list=this;
  if((typeof list.Items === 'undefined')||(idx<0)||(idx>=list.Items.length)) return null;

  var it=list.Items[idx];
  this.do_remove(it, parent);

  list.Items.splice(idx,1);
  
  this.DoItemsChanged();
  return it;
}

function ngl_GetPath(parent, path, create, oncreatefnc, userdata)
{
  var list=parent;
  if((typeof list === 'undefined')||(list===null)) list=this;

  var cname='';
  create=ngVal(create,true);
  oncreatefnc=ngVal(oncreatefnc, null);
  if(this.Columns.length>0) cname=this.Columns[0].ID;
  this.BeginUpdate();
  try
  {
    var s=0,name,found,nit,ngname;
    for(var i=0;i<=path.length;i++)
    {
      if((i!=path.length)&&(path.charAt(i)!="\\")) continue;
      name=path.substr(s,i-s);
      if(name!='')
      {
        if(name.charAt(0)=='$') { ngname=true; name=name.substr(1,name.length-1); }
        else ngname=false;
        found=null;
        if((list)&&(typeof list.Items !== 'undefined'))
        {
          if(this.Columns.length>0)
          {
            if(ngname)
            {
              for(var j=0;j<list.Items.length;j++)
                if((list.Items[j].ngText[cname] == name) || (list.Items[j].ngTextD[cname] == name)) { found = list.Items[j]; break; }
            }
            else
            {
              for(var j=0;j<list.Items.length;j++)
                if(list.Items[j].Text[cname] == name) { found = list.Items[j]; break; }
            }
          }
          else
          {
            if(ngname)
            {
              for(var j=0;j<list.Items.length;j++)
                if((list.Items[j].ngText == name) || (list.Items[j].ngTextD == name)) { found = list.Items[j]; break; }
            }
            else
            {
              for(var j=0;j<list.Items.length;j++)
                if(list.Items[j].Text == name) { found = list.Items[j]; break; }
            }
          }
        }
        if(found) list = found;
        else {
          if((create)&&(list))
          {
            nit=new ngListItem;
            if(this.Columns.length>0)
            {
              if(ngname)
              {
                nit.ngText=new Object;
                nit.Text=new Object;
                nit.ngText[cname]=name;
                nit.Text[cname]=ngTxt(name);
              }
              else
              {
                nit.Text=new Object;
                nit.Text[cname]=name;
              }
            }
            else
            {
              if(ngname)
              {
                nit.ngText=name;
                nit.Text=ngTxt(name);
              }
              else nit.Text=name;
            }
            if((oncreatefnc)&&(!ngVal(oncreatefnc(this, list, nit, userdata),false))) { list=null; break; }
            this.Add(nit,list);

            list=nit;
          }
          else { list=null; break; }
        }
      }
      s=i+1;
    }
  }
  catch(e)
  {
  }
  this.EndUpdate();
  return list;
}

function ngl_Scan(fnc, parent, userdata)
{
  if(typeof fnc !== 'function') return false;
  var list=parent;
  if((typeof list === 'undefined')||(list===null)) list=this;
  if(typeof list.Items !== 'undefined')
    for(var i=0;i<list.Items.length;i++)
    {
      if(typeof list.Items[i] === 'undefined') continue;
      if(!fnc(this, list.Items[i], list, userdata)) return false;
      if(!this.Scan(fnc, list.Items[i], userdata)) return false;
    }
  return true;
}

function ngl_ScanVisible(fnc, parent, userdata)
{
  if(typeof fnc !== 'function') return false;
  var list=parent;
  if((typeof list === 'undefined')||(list===null)) list=this;
  if(typeof list.Items !== 'undefined')
    for(var i=0;i<list.Items.length;i++)
    {
      var pi=list.Items[i];
      if(typeof pi === 'undefined') continue;
      if(!ngVal(pi.Visible,true)) continue;
      if(!fnc(this, pi, list, userdata)) return false;

      if((ngVal(pi.Collapsed,false))||(typeof pi.Items === 'undefined')||(!pi.Items.length)) continue;
      if(!this.ScanVisible(fnc, pi, userdata)) return false;
    }
  return true;
}

function ngl_Clear(parent)
{
  var list=parent;
  if((!list)||(list===this))
  {
    list=this;
    this.ClearSelected();
    this.ItemsControls = undefined;
    if((typeof list.Items === 'object')&&(!list.Items.length)) return;
  }
  if(typeof list.Items !== 'undefined')
  {
    for(var i=list.Items.length-1;i>=0;i--)
    {
      if(typeof list.Items[i] === 'undefined') continue;
      this.do_remove(list.Items[i], list);
      if(typeof list.Items[i].Items !== 'undefined')
        this.Clear(list.Items[i]);
    }
    delete list.Items;
  }
  if(list==this) this.Items=new Array();
  
  this.DoItemsChanged();
}

function ngl_ItemId(it)
{
  if(typeof it==='undefined') return '';
  var id='';
  do
  {
    var idx=this.IndexOf(it,it.Parent);
    if(idx<0) return '';
    id=idx+(id=='' ? '' : '_'+id);
    it=it.Parent;
  }
  while(it);
  return id;
}

function ngl_ItemById(id)
{
  var r=new Object;
  var list,idx=new Array();
  for(var j=0,i=id.length-1;i>=0;i--)
    if(id.charAt(i)=='_')
    {
      idx[j++]=parseInt(id.substring(i+1,id.length),10);
      id=id.substring(0,i);
      list=ngGetControlById(id, 'ngList');
      if(list)
      {
        r.list=list;
        r.item=list;
        for(i=idx.length-1;i>=0;i--)
          r.item=((r.item)&&(r.item.Items)&&(idx[i]>=0)&&(idx[i]<r.item.Items.length) ? r.item.Items[idx[i]] : null);
        if(r.item==list) r.item=null;
        return r;
      }
    }
  r.list=null;
  r.item=null;
  return r;
}

function nglist_ItemById(id)
{
  var result = this;
  if (id.charAt(id.length - 1) != '_')
    id += '_';
  var i = 0;
  while (id.length > 0)
  {
    if (id.charAt(i) == '_')
    {
      var item_id = parseInt(id.substring(0, i),10);
      id = id.substring(i + 1);
      if (!item_id.isNaN && result.Items && (item_id >= 0) && (item_id < result.Items.length) && (result.Items[item_id] !== null))
        result = result.Items[item_id];
      else
      {
        result = null;
        return result;
      }
      i = 0;
    }
    else
      i++;
  }
  return (result == this ? null : result);
}

function ngl_UpdateCollapsed(it,recursion,setall,id,level,collapsed)
{
  var list=it;
  if((typeof list === 'undefined')||(list===null)) list=this;
  level=ngVal(level,0);

  if(typeof list.Items === 'undefined') return level;
  var image,statechanged=false;
  if((typeof setall !== 'undefined')&&(list!=this)&&(ngVal(it.Collapsed,false)!=setall)&&((list.Items.length>0)||(typeof it.Collapsed !== 'undefined')))
  {
    statechanged=true;
    if(setall)
    {
      if((it.OnCollapsing)&&(!ngVal(it.OnCollapsing(this,it),false))) statechanged=false;
      if((statechanged)&&(this.OnCollapsing)&&(!ngVal(this.OnCollapsing(this,it),false))) statechanged=false;
    }
    else
    {
      if((it.OnExpanding)&&(!ngVal(it.OnExpanding(this,it),false))) statechanged=false;
      if((statechanged)&&(this.OnExpanding)&&(!ngVal(this.OnExpanding(this,it),false))) statechanged=false;
    }
    if(statechanged) it.Collapsed=setall;
  }
  if(list.Items.length==0) return level;

  if(this.update_cnt>0)
  {
    this.need_update=true;
    if(typeof setall !== 'undefined')
      for(var i=0;i<list.Items.length;i++)
      {
        if(typeof list.Items[i]==='undefined') continue;
        this.UpdateCollapsed(list.Items[i], true, setall, id+i, level+1, collapsed);
      }
    return level;
  }
  if(typeof id==='undefined') id=(list==this ? '' : this.ItemId(it));

  var l=level;
  if(this.Columns.length>0)
  {
    if(typeof collapsed === 'undefined')
    {
      collapsed=false;
      var p=list;
      while((!collapsed)&&(p))
      {
        collapsed=ngVal(p.Collapsed,false);
        p=p.Parent;
      }
    }
    collapsed=((collapsed)||(ngVal(list.Collapsed,false)));
    var o=document.getElementById(this.ID+'_G'+id+'_0');
    if(o) o.style.display=(collapsed ? 'none' : '');

    if(this.OnGetTreeImg) image=this.OnGetTreeImg(this, list, id);
    else image=this.TreeImg;
    if(image) ngc_ChangeImage(ngl_TreeImgDrawProps(this.ID+'_'+id+'T', collapsed, this.Enabled, image));

    if(list!=this) id+='_';

    for(var i=0;i<list.Items.length;i++)
    {
      if(typeof list.Items[i]==='undefined') continue;
      l=this.UpdateCollapsed(list.Items[i], true, setall, id+i, level+1, collapsed);
      if(l>level+1)
      {
        if((i+1)<list.Items.length)
        {
          var o=document.getElementById(this.ID+'_G'+id+(i+1));
          if(o) o.style.display=(collapsed ? 'none' : '');
        }
      }
    }
  }
  else
  {
    var o=document.getElementById(this.ID+'_G'+id);
    if(o) o.style.display=(ngVal(list.Collapsed,false) ? 'none' : 'block');

    if(this.OnGetTreeImg) image=this.OnGetTreeImg(this, list, id);
    else image=this.TreeImg;
    if(image) ngc_ChangeImage(ngl_TreeImgDrawProps(this.ID+'_'+id+'T', ngVal(list.Collapsed,false), this.Enabled, image));
    if(list!=this) id+='_';
    if((ngVal(recursion,false))||(typeof setall !== 'undefined'))
      for(var i=0;i<list.Items.length;i++)
      {
        if(typeof list.Items[i]==='undefined') continue;
        this.UpdateCollapsed(list.Items[i], true, setall, id+i, level+1, collapsed);
      }
  }
  if(statechanged)
  {
    if(setall)
    {
      if(it.OnCollapsed) it.OnCollapsed(this,it);
      if(this.OnCollapsed) this.OnCollapsed(this,it);
    }
    else
    {
      if(it.OnExpanded) it.OnExpanded(this,it);
      if(this.OnExpanded) this.OnExpanded(this,it);
    }
    this.UpdateColumns();
  }
  this.UpdateFrame();

  return l;
}

function ngl_Collapse(it)
{
  if((typeof it === 'undefined')||(ngVal(it.Collapsed,false))) return;
  if((it.OnCollapsing)&&(!ngVal(it.OnCollapsing(this,it),false))) return;
  if((this.OnCollapsing)&&(!ngVal(this.OnCollapsing(this,it),false))) return;
  it.Collapsed=true;
  this.UpdateCollapsed(it,false);
  this.UpdateColumns();
  if(it.OnCollapsed) it.OnCollapsed(this,it);
  if(this.OnCollapsed) this.OnCollapsed(this,it);
}

function ngl_Expand(it)
{
  if((typeof it === 'undefined')||(!ngVal(it.Collapsed,false))) return;
  if((it.OnExpanding)&&(!ngVal(it.OnExpanding(this,it),false))) return;
  if((this.OnExpanding)&&(!ngVal(this.OnExpanding(this,it),false))) return;
  it.Collapsed=false;
  this.UpdateCollapsed(it,false);
  this.UpdateColumns();
  if(it.OnExpanded) it.OnExpanded(this,it);
  if(this.OnExpanded) this.OnExpanded(this,it);
}

function ngl_CollapseAll(it)
{
  this.UpdateCollapsed(it,true,true);
}

function ngl_ExpandAll(it)
{
  this.UpdateCollapsed(it,true,false);
}

function ngl_ToggleCollapsed(it)
{
  if(typeof it === 'undefined') it=new Object;
  if((it!=this)&&(it.Items)&&((it.Items.length>0)||(typeof it.Collapsed !== 'undefined')))
  {
    if(it.Collapsed) this.Expand(it);
    else this.Collapse(it);
  }
}

function ngl_GetRowClassName(it, selected, id, level, part)
{
  var cn='';
  switch(part){
    case 1: //nglRowGroup
      if(this.OnGetRowGroupClassName)
      {
        cn=this.OnGetRowGroupClassName(this, it, id, level);
      }
      if(ngVal(cn,'')=='') return '';
    break;
    case 0: //nglRowItem
    default:
      cn='Row';
      if(this.OnGetRowClassName)
      {
        var c=this.OnGetRowClassName(this, it, id, level);
        if(ngVal(c,'')!='') cn=c;
      }
    break;
  }
  if(it)
  {
    if((!this.Enabled)||(!ngVal(it.Enabled,true))) cn+='Disabled';
    else
    {
      switch(it.Checked)
      {
        case true:
        case 1: cn+='Checked'; break;
        case 2: cn+='Grayed'; break;
      }
    }
  }
  cn=this.BaseClassName+cn;
  if((this.Enabled)&&(ngVal(selected,false))) cn=this.BaseClassName+'Selected '+cn;
  return cn;
}

function ngl_CheckedChanged(lid)
{
  var l=ngGetControlById(lid, 'ngList');
  if(l)
  {
    clearTimeout(l.checked_changed_timer);
    l.checked_changed_timer=null;
    if(l.OnCheckChanged) l.OnCheckChanged(l);
  }
}

function ngl_do_checked(it)
{
  var c=it.Checked;
  if(this.OnItemCheckChanged) this.OnItemCheckChanged(this,it);
  if(it.Checked==c)
  {
    var action = this.GetItemAction(it);
    if(action) action.CheckRadioGroup();
    else
      if((typeof it.RadioGroup !== 'undefined')&&(ngVal(it.Checked,0))&&(this.radio_groups[it.RadioGroup]!=it))
      {
        var uncheck=this.radio_groups[it.RadioGroup];
        this.radio_groups[it.RadioGroup]=it;
        if(uncheck) this.CheckItem(uncheck,0);
      }
    this.CheckChanged();
  }
}

function ngl_CheckChanged()
{
  clearTimeout(this.checked_changed_timer);
  this.checked_changed_timer=null;
  if(this.OnCheckChanged)
  {
    this.checked_changed_timer = setTimeout("ngl_CheckedChanged('"+this.ID+"')",(this.CheckedChangedDelay>0 ? this.CheckedChangedDelay : 1));
  }
}

function ngl_UpdateChecked(it,recursion,setall,id,level)
{
  var list=it;
  if((typeof list === 'undefined')||(list===null)) list=this;
  if((typeof it==='undefined')||(it===null)) { it={ }; recursion=ngVal(recursion,true); id=''; }
  if(typeof id==='undefined') id=(list==this ? '' : this.ItemId(it));

  level=ngVal(level,0);
  if(((this.ShowCheckboxes)||(typeof it.Checked!=='undefined'))&&(typeof setall !== 'undefined')&&(ngVal(it.Checked,0)!=setall))
  {
    it.Checked=setall;
    this.do_checked(it);
  }

  var undefined;
  var state=ngVal(it.Checked,0);
  if((typeof list.Items !== 'undefined')&&(list.Items.length>0))
  {
    recursion=ngVal(recursion,false);
    var checkgroup=ngVal(it.CheckGroup,false);
    if((checkgroup)||(typeof setall !== 'undefined')||(recursion))
    {
      if((!level)&&(checkgroup)&&(state!=2)) setall=state;
      if(!checkgroup) setall=undefined;
      var s,gstate;
      for(var i=0;i<list.Items.length;i++)
      {
        if(typeof list.Items[i] === 'undefined') continue;
        s=this.UpdateChecked(list.Items[i],recursion,setall,(id!='' ? id+'_'+i : undefined),level+1);
        if((this.ShowCheckboxes)||(typeof list.Items[i].Checked!=='undefined'))
        {
          if(typeof gstate === 'undefined') gstate=s;
          else if(s!=gstate) gstate=2;
        }
      }
      if((checkgroup)&&(typeof gstate!=='undefined')) state=gstate;
    }
  }

  if((list!=this)&&(id!=''))
  {
    if(this.update_cnt>0) this.need_update=true;
    else
    {
      var o=document.getElementById(this.ID+'_'+id);
      if(o)
      {
        var cn=this.GetRowClassName(it, this.selected[id], id, level, 0/*nglRowItem*/);
        var i=o.className.indexOf('_Focus');
        if(i>=0) cn+='_Focus';
        o.className=cn;
      }
      var image;
      if(this.OnGetCheckImg) image=this.OnGetCheckImg(this, it, id);
      else image=(typeof it.Checked === 'undefined' && (!this.ShowCheckboxes) ? null : this.CheckImg);
      if(image)
      {
        ngc_ChangeImage(ngl_CheckImgDrawProps(this.ID+'_'+id+'C', state, this.Enabled, image));
      }

      if(!level)
      {
        var pstate;
        it=list.Parent;
        while((it)&&(ngVal((it.CheckGroup),false)))
        {
          for(var i=0;i<it.Items.length;i++)
          {
            if((this.ShowCheckboxes)||(typeof it.Items[i].Checked!=='undefined'))
            {
              if(typeof pstate==='undefined') pstate=ngVal(it.Items[i].Checked,0);
              else if(ngVal(it.Items[i].Checked,0)!=pstate) { pstate=2; break; }
            }
          }
          if((typeof pstate!=='undefined')&&((this.ShowCheckboxes)||(typeof it.Checked!=='undefined'))&&(pstate!=ngVal(it.Checked,0)))
          {
            it.Checked=pstate;
            this.do_checked(it);
            this.UpdateChecked(it,false);
          }
          it=it.Parent;
        }
      }
    }
  }
  return state;
}

function ngl_CheckItem(it, state)
{
  if(!it) return;

  var action = this.GetItemAction(it);
  if((action)&&(!action.in_action_check))
  {
    action.Check(state);
    return;
  }
  state=ngVal(state,1);
  if(ngVal(it.Checked,0)!=state)
  {
    it.Checked=state;
    this.do_checked(it);
    if(it.Checked==state) this.UpdateChecked(it);
  }
}

function ngl_CheckAllItems(it,state,respectcheckgroup)
{
  state=ngVal(state,1);
  if(ngVal(respectcheckgroup,false))
  {
    if((typeof it==='undefined')||(it===null)) it={ Checked: state, CheckGroup: true, Items: this.Items };
    this.UpdateChecked(it,true,state,'');
  }
  else
  {
    var self=this;
    function checkitems(it)
    {
      var list=it;
      if((typeof list==='undefined')||(list===null)) list=self;
      else self.CheckItem(it,state);
      if((typeof list.Items !== 'undefined')&&(list.Items.length>0))
      {
        for(var i=0;i<list.Items.length;i++)
        {
          if(!list.Items[i]) continue;
          checkitems(list.Items[i]);
        }
      }
    }
    checkitems(it);
  }
}

function ngl_CheckAll(it,respectcheckgroup)
{
  this.CheckAllItems(it,1,respectcheckgroup);
}

function ngl_UncheckAll(it,respectcheckgroup)
{
  this.CheckAllItems(it,0,respectcheckgroup);
}

function ngl_GetChecked()
{
  var ret=new Array();
  this.Scan(function (list, item, parent, userData) {
    if (item.Checked) ret.push(item);
    return true;
  });
  return ret;
}

function ngl_HasChecked()
{
  var has = false;
  this.Scan(function (list, item, parent, userData) {
    if (item.Checked){ has = true; return false; }
    return true;
  });
  return has;
}

function ngl_SetItemVisible(it, state)
{
  if(!it) return;

  var action = this.GetItemAction(it);
  if((action)&&(!action.in_action_visible))
  {
    action.SetVisible(state);
    return;
  }
  state=ngVal(state,true);
  if(ngVal(it.Visible,true)!=state)
  {
    it.Visible=state;
    if(this.OnSetItemVisible) this.OnSetItemVisible(this,it);
    if(it.Visible==state)
    {
      if(this.update_cnt>0) this.need_update=true;
      else
      {
        if((this.Columns.length>0)&&(!ngIExplorer)) this.Update();
        else
        {
          var o=document.getElementById(this.ID+'_'+this.ItemId(it));
          if(o)
          {
            o.style.display=(it.Visible ? 'block' : 'none');
          }
        }
      }
    }
  }
}

function ngl_SetItemEnabled(it, state)
{
  if(!it) return;

  var action = this.GetItemAction(it);
  if(action)
  {
    action.SetEnabled(state);
    return;
  }
  state=ngVal(state,true);
  if(ngVal(it.Enabled,true)!=state)
  {
    it.Enabled=state;
    if(this.OnSetItemEnabled) this.OnSetItemEnabled(this,it);
    if(it.Enabled==state) this.Update();
  }
}

function ngl_SetColumnVisible(id,visible)
{
  if(this.Columns.length>0)
  {
    var col;
    for(var i=0;i<this.Columns.length;i++)
    {
      col = this.Columns[i];
      if(col.ID!=id) continue;

      visible=ngVal(visible,true);
      if(ngVal(col.Visible,true)!==visible)
      {
        col.Visible=visible;
        if(this.OnSetColumnVisible) this.OnSetColumnVisible(this,col);

        if(col.Visible===visible) this.Update();
      }
      break;
    }
  }
}

function ngl_SelectChanged()
{
  var o,changed=false;
  var update=(this.update_cnt<=0);

  var cnt=0;
  var nd=new Array();
  for(var id in this.selected)
  {
    if(!ngVal(this.selected[id],false)) continue;
    cnt++;
    nd[id]=true;
    if(!ngVal(this.draw_selected[id],false))
    {
      changed=true;
      if(update)
      {
        o=document.getElementById(this.ID+'_'+id);
        if(o)
        {
          var cn=o.className;
          var i=cn.indexOf(this.BaseClassName+'Selected ');
          if(i<0) cn=this.BaseClassName+'Selected '+cn;
          o.className=cn;
          if(this.OnRedrawSelected) this.OnRedrawSelected(this,o,true,id);
        }
      }
    }
  }
  this.SelCount = cnt;

  for(var id in this.draw_selected)
  {
    if((!ngVal(this.selected[id],false))&&(ngVal(this.draw_selected[id],false)))
    {
      changed=true;
      if(update)
      {
        o=document.getElementById(this.ID+'_'+id);
        if(o)
        {
          var cn=o.className;
          var sclass=this.BaseClassName+'Selected ';
          var i=cn.indexOf(sclass);
          if(i>=0) cn=cn.substring(i+sclass.length,cn.length);
          o.className=cn;
          if(this.OnRedrawSelected) this.OnRedrawSelected(this,o,false,id);
        }
      }
    }
  }
  this.draw_selected=nd;
  if((changed)&&(this.OnSelectChanged))
  {
    this.OnSelectChanged(this);
    if(this.update_cnt>0) this.need_update=true;
  }
}

function ngl_SelectItem(it, state)
{
  if(!it) return;
  state=ngVal(state,true);
  var id=this.ItemId(it);
  if(id=='') return;
  if(ngVal(this.selected[id],false)!=state)
  {
    if(state)
    {
      this.last_selected=id;
      this.selected[id]=true;
    }
    else delete this.selected[id];
    this.SelectChanged();
  }
}

function ngl_ClearSelected()
{
  this.last_selected='';
  this.selected = {};
  this.SelectChanged();
}

function ngl_GetSelected()
{
  var ii,items=new Array();
  for(var id in this.selected)
  {
    if(!ngVal(this.selected[id],false)) continue;

    ii=ngl_ItemById(this.ID+'_'+id);
    if(ii.item) items[items.length]=ii.item;
  }
  return items;
}

function ngl_SetSelected(items)
{
  this.last_selected='';
  this.selected = {};
  if((items)&&(typeof items==='object')) {
    var it,id;
    for(var i in items) {
      it=items[i];
      id=this.ItemId(it);
      if(id=='') continue;
      this.last_selected=id;
      this.selected[id]=true;
    }
  }
  this.SelectChanged();
}

function ngl_IsItemSelected(it)
{
  var id=this.ItemId(it);
  if(id=='') return false;
  return ngVal(this.selected[id],false);
}

function ngl_GetItemFocus()
{
  var ii=ngl_ItemById(ngl_CurrentRowId);
  return (ii.list==this ? ii.item : null);
}

function ngl_SetItemFocus(it)
{
  if(!it)
  {
    var ii=ngl_ItemById(ngl_CurrentRowId);
    if(ii.list==this)
    {
      var o=document.getElementById(ngl_CurrentRowId);
      if(o) ngl_LeaveRow(false,o,(this.OnEnterRow!=null)||(this.OnLeaveRow!=null));
    }
    return;
  }
  var id=this.ItemId(it);
  if(id=='') return;

  var p=it.Parent;
  while(p)
  {
    if(p.Collapsed) this.Expand(p);
    p=p.Parent;
  }
  id=this.ID+'_'+id;
  if(id!=ngl_CurrentRowId)
  {
    ngl_FocusTime=new Date().getTime();
    var o=document.getElementById(id);
    if(o) ngl_EnterRow(false,o,(this.OnEnterRow!=null)||(this.OnLeaveRow!=null));

    var lo=this.ContentElm;
    if((lo)&&(o))
    {
      var oh=ng_ClientHeight(o);
      var loh=ng_ClientHeight(lo);
      var hh=0;
      var fhdr=document.getElementById(this.ID+'_FH');
      if(fhdr) hh=ng_ClientHeight(fhdr);

      if((o.offsetTop<lo.scrollTop+hh)||(o.offsetTop+oh>lo.scrollTop+loh))
      {
        var sc=o.offsetTop-hh;
        if(sc<0) sc=0;
        lo.scrollTop=sc;
      }
    }
  }
}

var ngl_ActSortList=null;
function ngl_SortFnc(a,b)
{
  var l=ngl_ActSortList;
  if(l.OnCompareItem) return l.OnCompareItem(l,a,b);
  var t1='',t2='';
  if(l.Columns.length>0)
  {
    t1=(typeof a.Text==='object' ? a.Text[l.SortColumn] : '');
    t2=(typeof b.Text==='object' ? b.Text[l.SortColumn] : '');
  }
  else
  {
    t1=a.Text;
    t2=b.Text;
  }
  t1=ngVal(t1,'');
  t2=ngVal(t2,'');
  if(!l.SortCaseSensitive)
  {
    if(typeof t1 === 'string') t1=t1.toLowerCase();
    if(typeof t2 === 'string') t2=t2.toLowerCase();
  }

  var r=0;
  if(t1<t2) r=-1;
  else if(t1>t2) r=1;
  if(l.SortDir==1) r=-r;
  return r;
}

function ngl_Sort(it, recursion, level, itemid)
{
  var list=it;
  if((typeof list === 'undefined')||(list===null)) list=this;
  if((typeof list.Items !== 'undefined')&&(list.Items.length>0))
  {
    level=ngVal(level,0);
    if(!level)
    {
      ngl_ActSortList=this;
      if((this.Columns.length>0)&&(ngVal(this.SortColumn,'')=='')) this.SortColumn=this.Columns[0].ID;
    }
    if(ngVal(itemid,'')=='')
    {
      itemid=this.ItemId(list);
      if(itemid!='') itemid+='_';
    }

    if(ngVal(recursion,true))
      for(var i=0;i<list.Items.length;i++)
        this.Sort(list.Items[i],true,level+1,itemid+i+'_');

    if(this.SelCount>0)
    {
      var saveselected=new Array();

      for(var i=0;i<list.Items.length;i++)
      {
        if(ngVal(this.selected[itemid+i],false))
        {
          saveselected.push(list.Items[i]);
          delete this.selected[itemid+i];
        }
      }
    }

    list.Items.sort(ngl_SortFnc);
    if((this.SelCount>0)&&(saveselected.length>0))
    {
      for(var i=0;i<list.Items.length;i++)
        for(var j=0;j<saveselected.length;j++)
          if(list.Items[i]==saveselected[j])
          {
            saveselected.splice(j,1);
            this.selected[itemid+i]=true;
            break;
          }
    }
    if(!level)
    {
      ngl_ActSortList=null;
      this.Update();
    }
  }
}

function ngl_FindCompare(fi, key, text)
{
  if(typeof text !== 'string')
  {
    return (text==key);
  }
  if(fi.ignorecase) text=text.toLowerCase();
  switch(fi.partial)
  {
    case 1:
      key=''+key;
      if(key.length>text.length) return false;
      return (text.substring(0,key.length)==key);
    case 2:
      key=''+key;
      return (text.indexOf(key)>=0);
    default:
      return (text==key);
  }
}

function ngl_FindItemCallback(list, it, parent, fi)
{
  var key,text;
  if(typeof fi.fromitem !== 'undefined')
  {
    if(fi.fromitem==it) delete fi.fromitem;
    return true;
  }
  if(list.Columns.length>0)
  {
    var col;
    for(var i=0;i<fi.cols.length;i++)
    {
      col=fi.cols[i];
      if((fi.visibleonly)&&(!ngVal(col.Visible,true))) continue;
      if(fi.ongetsearchtext) text=ngVal(fi.ongetsearchtext(list, it, col),'');
      else if(list.OnGetText) text=ngVal(list.OnGetText(list, it, col),'');
      else text=(typeof it.Text==='object' ? ngVal(it.Text[col.ID],'') : '');
      if(!ngl_FindCompare(fi, fi.key[i], text)) return true;
    }

  }
  else
  {
    if(fi.ongetsearchtext) text=ngVal(fi.ongetsearchtext(list, it),'');
    else if(list.OnGetText) text=ngVal(list.OnGetText(list, it),'');
    else text=ngVal(it.Text,'');
    if(!ngl_FindCompare(fi, fi.key, text)) return true;
  }
  fi.found=it;
  return false;
}

function ngl_FindItem(key, partial, ignorecase, visibleonly, fromitem, ongetsrchtext)
{
  var fi={
    found: null,
    partial: ngVal(partial,0),
    ignorecase: ngVal(ignorecase,true),
    visibleonly: ngVal(visibleonly,false),
    fromitem: fromitem,
    ongetsearchtext: ngVal(ongetsrchtext,null)
  };
  if(typeof key === 'object')
  {
    if((this.Columns.length<=0)||(!key)) return null;

    var newkey=[];
    var cols=[];
    var i,j,col;
    for(var i in key)
    {
      for(j=0;j<this.Columns.length;j++)
      {
        col=this.Columns[j];
        if((typeof col === 'object')&&(col.ID == i)&&((!fi.visibleonly)||(ngVal(col.Visible,true))))
        {
          if(fi.ignorecase) newkey.push((''+key[i]).toLowerCase());
          else newkey.push(key[i]);
          cols.push(col);
        }
      }
    }
    if(!cols.length) return null;
    fi.key=newkey;
    fi.cols=cols;
  }
  else
  {
    fi.key=(fi.ignorecase ? (''+key).toLowerCase() : key);
    if(this.Columns.length>0)
    {
      fi.key=[fi.key];
      fi.cols=[this.Columns[0]];
    }
  }
  if(fi.visibleonly) this.ScanVisible(ngl_FindItemCallback, null, fi);
  else this.Scan(ngl_FindItemCallback, null, fi);
  return fi.found;
}

function ngl_FindItemByIDCallback(list, it, parent, fi)
{
  if((!it.ID)||(it.ID!=fi.ID)) return true;
  fi.found=it;
  return false;
}

function ngl_FindItemByID(id)
{
  var fi=new Object;
  fi.ID=id;
  fi.found=null;
  this.Scan(ngl_FindItemByIDCallback, null, fi);
  return fi.found;
}

function ngl_DoDropDown(edit)
{
  this.SetVisible(true);
  if(!ngVal(edit.Suggestion,false))
  {
    var it=edit.ListItem;
    if(typeof it==='undefined') {
      var txt=edit.GetText();
      it=this.FindItem(txt,(txt==='' ? 0 : 1));
    }
    this.DropDownOwnerListItem=it;
  }
}

function ngl_DoDropDownFinished(edit)
{
  if(!ngVal(edit.Suggestion,false))
  {
    var it=this.DropDownOwnerListItem;
    if(it) this.SetItemFocus(it);
    this.SetFocus();
  }
}

function ngl_SelectDropDownItem(it)
{
  var ddoli=ngVal(this.DropDownOwnerListItem,null);
  delete this.DropDownOwnerListItem;

  var dd=this.DropDownOwner;
  if(dd)
  {
    it=ngVal(it,null);
    if(dd.DropDownType == ngeDropDownList) dd.ListItem = it;
    if((dd.OnListItemChanged)&&((ddoli===null)||(ddoli!=it))&&(!ngVal(dd.OnListItemChanged(dd,this,it,ddoli),false))) return false;
    var t='';
    if(it)
    {
      if(typeof it.Text === 'string') t=it.Text;
      else if((this.Columns.length>0)&&(typeof it.Text==='object')) t=it.Text[this.Columns[0]];
      if((ngVal(dd.Suggestion,false))&&(dd.OnSuggestionSetText))
      {
        var undefined;
        t=dd.OnSuggestionSetText(t,it);
        if(t=='') t=undefined;
      }
    }
    if(dd.OnListItemGetText) t=dd.OnListItemGetText(dd,this,it,t);
    if((typeof t!=='undefined')&&(typeof dd.SetText === 'function')) dd.SetText(t);
    if(dd.HideDropDown) dd.HideDropDown();
  }
  return true;
}

function ngl_SelectDropDownItemWithFocus(it)
{
  var ret=this.SelectDropDownItem(it);
  var dd=this.DropDownOwner;
  if((ret)&&(dd)) dd.SetFocus();
  return ret;
}

function ngl_GetClickInfo(e,elm,part)
{
  var ii={list: null, item: null };
  var pelm=elm;
  while(pelm)
  {
    if(ngVal(pelm.id,'')!='')
    {
      ii=ngl_ItemById(pelm.id);
      if(ii.item!==null) break;
      ii.list=null;
    }
    pelm=pelm.parentNode;
  }
  if(e.gesture)
  {
    var srce=e.gesture.srcEvent;
    if(srce) {
      e.altKey=srce.altKey;
      e.ctrlKey=srce.ctrlKey;
      e.shiftKey=srce.shiftKey;
    }
  }
  e.listObj=elm;
  e.listRowObj=pelm;
  e.listPart=part;
  e.listCol=-1;
  e.Owner=ii.list;
  e.list=ii.list;
  e.listItem=ii.item;
  if((e.list)&&(e.listPart != 0)&&(e.list.Columns.length>0))
  {
    var td = e.listObj;
    while (td && (typeof td.cellIndex === 'undefined'))
      td = td.parentNode;
    if (td)
      e.listCol = td.cellIndex;
  }
}

function ngl_DoPtrStart(pi)
{
  var eid=pi.EventID;
  var eidp=eid.substr(0,4);
  if(eidp==='item')
  {
    var cid=parseInt(eid.substring(4,eid.length),10);
    ngl_GetClickInfo(pi.StartEvent,pi.StartElement,cid);
    pi.SrcElement=pi.StartEvent.listRowObj;

    if(pi.Touch)
    {
      ngl_EnterRow(pi.Event,pi.StartEvent.listRowObj,(this.OnEnterRow!=null)||(this.OnLeaveRow!=null));
    }
  }
}

function ngl_DoPtrDrag(pi)
{
  var eid=pi.EventID;
  var eidp=eid.substr(0,4);
  if(eidp==='item')
  {
    if(pi.Touch)
    {
      if(!pi.IsInSrcElement())
      {
        if(ngl_CurrentRowId==pi.StartEvent.listRowObj.id)
          ngl_LeaveRow(pi.Event,pi.StartEvent.listRowObj,(this.OnEnterRow!=null)||(this.OnLeaveRow!=null));
      }
      else
      {
        if(ngl_CurrentRowId!=pi.StartEvent.listRowObj.id)
          ngl_EnterRow(pi.Event,pi.StartEvent.listRowObj,(this.OnEnterRow!=null)||(this.OnLeaveRow!=null));
      }
    }
  }
  return false;
}

function ngl_DoGesture(pi)
{
  return ngc_HandleScrollGesture(this,pi,this.ContentElm);
}

function ngl_DoPtrEnd(pi)
{
  var eid=pi.EventID;
  var eidp=eid.substr(0,4);
  if(eidp==='item')
  {
    if(pi.Touch)
    {
      if(pi.IsInSrcElement())
      {
        if(ngl_CurrentRowId==pi.StartEvent.listRowObj.id)
          ngl_LeaveRow(pi.Event,pi.StartEvent.listRowObj,(this.OnEnterRow!=null)||(this.OnLeaveRow!=null));
      }
    }
  }
}

function ngl_DoPtrClick(pi)
{
  if((!this.MouseEvents)||(this.ReadOnly)) return;

  if((typeof pi.ScrollTop!=='undefined')&&(Math.abs(pi.Y-pi.StartY)>10)) return;

  var eid=pi.EventID;
  var eidp=eid.substr(0,4);
  if(eidp==='item')
  {
    if((pi.EndTime-pi.StartTime>200)&&(!pi.IsInSrcElement())) return;
    var e=pi.StartEvent;
    var cid=parseInt(eid.substring(4,eid.length),10);
    ngl_GetClickInfo(e,pi.StartElement,cid);
    this.ClickItem(e.listItem, e);
    if((eid!=='item0')&&(ng_inDOM(pi.StartElement)))
    {
      // simulate old event bubbling
      ngl_GetClickInfo(e,pi.StartElement,0);
      this.ClickItem(e.listItem,e);

//      pi.EventID='item0';
//      this.DoPtrClick(pi);
//      pi.EventID=eid;
    }
  }
  else if(eidp==='capt')
  {
    var e=pi.StartEvent;
    var cid=parseInt(eid.substring(4,eid.length),10);
    if(e.gesture)
    {
      var srce=e.gesture.srcEvent;
      if(srce) {
        e.altKey=srce.altKey;
        e.ctrlKey=srce.ctrlKey;
        e.shiftKey=srce.shiftKey;
      }
    }
    if(this.OnCaptionClick) this.OnCaptionClick(e,this,cid,this.StartElement);
  }
}

function ngl_DoPtrDblClick(pi)
{
  if((!this.MouseEvents)||(this.ReadOnly)) return;
  var eid=pi.EventID;
  var eidp=eid.substr(0,4);
  if(eidp==='item')
  {
    if((pi.EndTime-pi.StartTime>=200)&&(!pi.IsInSrcElement())) return;
    var e=pi.StartEvent;
    var cid=parseInt(eid.substring(4,eid.length),10);
    ngl_GetClickInfo(e,pi.StartElement,cid);
    if((!e.listItem)||(!ngVal(e.listItem.Enabled,true))) return;

    if((e.listItem.OnDblClick)&&(!ngVal(e.listItem.OnDblClick(e),false))) return;
    if((this.OnDblClick)&&(!ngVal(this.OnDblClick(e),false))) return;
    if((e.listPart==1)||(e.listPart==4)) this.ToggleCollapsed(e.listItem);
    if((this.OnDblClickItem)&&(e.listPart)) this.OnDblClickItem(e);
    if(eid!=='item0')
    {
      // simulate old event bubbling
      pi.EventID='item0';
      this.DoPtrDblClick(pi);
      pi.EventID=eid;
    }
  }
  else if(eidp==='capt')
  {
    var e=pi.StartEvent;
    var cid=parseInt(eid.substring(4,eid.length),10);
    if(this.OnCaptionDblClick) this.OnCaptionDblClick(e,this,cid,this.StartElement);
  }
}

function ngl_ClickItem(it, e)
{
  if(typeof e === 'undefined') e=new Object;
  if(e.list != this)
  {
    e.Owner = this;
    e.list = this;
    e.listItem = it;
    e.listObj=null;
    e.listRowObj=null;
    e.listPart=0;
    e.listCol=-1;
    this.ClickItem(it, e);
    e.listPart=1;
    e.listCol=(this.Columns.length>0 ? 0 : -1);
    e.listIgnoreSelect=false;
  }

  if((!e.list.Enabled)||(ngVal(e.list.ReadOnly,false))) return;
  if((!it)||(!ngVal(it.Enabled,true))) return;

  var action = !e.listIgnoreAction ? this.GetItemAction(it) : null;
  if((!e.listPart)&&((!action)||(!action.in_action_click)))
  {
    var delay=(new Date().getTime()) - this.ignore_select;
    if(delay<150) e.listIgnoreSelect=true;
    this.ignore_select=0;
  }
  if((e.listPart)||(!action)||(action.in_action_click)) {
    if(((it.OnClick)&&(!ngVal(it.OnClick(e),false)))
     ||((this.OnClick)&&(!ngVal(this.OnClick(e),false))))
    {
      if((e.listIgnoreSelect)&&(e.listPart)) this.ignore_select=new Date().getTime();
      return;
    }
  }
  switch(e.listPart)
  {
    case 0:
    case 2:
      if((e.listPart==0)&&(e.listIgnoreSelect)) break;
      if((e.listPart==2)||(this.SelectType==5)){
        if(action) break;
        if((this.ShowCheckboxes)||(typeof it.Checked !== 'undefined'))
        {
          if((!this.RadioAllowUncheck)&&(!ngVal(it.RadioAllowUncheck, false))&&(typeof it.RadioGroup!=='undefined')) this.CheckItem(it,1);
          else
          {
            var s=ngVal(it.Checked,0);
            switch(s)
            {
              case 0:
              case false:
                if(ngVal(it.AllowGrayed,false)) s=2;
                else s=1;
                break;
              case 1:
              case true:
                s=0;
                break;
              default:
                s=1;
                break;
            }
            this.CheckItem(it,s);
          }
          e.listIgnoreSelect=true;
        }
        break;
      }

      if(this.DropDownOwner) this.SelectDropDownItemWithFocus(it); // Handle drop down
      else
      {
        // Handle select
        if(!this.SelectType) break;

        var shift,ctrl;
        try {
          shift=ngVal(e.shiftKey,false);
          ctrl=ngVal(e.ctrlKey,false);
        }
        catch(err) // fixes IE<=8 access event properties problems
        {
          shift=false;
          ctrl=false;
        }
        if((this.SelectType==1)||((this.SelectType==3)&&(!ctrl)&&(!shift))) // Single
          this.selected={};
        if(((this.SelectType==2)||(this.SelectType==3))&&(shift)&&(this.last_selected!=''))
        {
          var s=!ngVal(this.selected[this.ItemId(it)],false);
          var lit=ngl_ItemById(this.ID+'_'+this.last_selected);
          if(lit.item)
          {
            var itms=[lit.item];
            var si=lit.item;
            while((si=this.NextVisibleItem(si))!=null)
            {
              if(ngVal(si.Enabled,true)) itms[itms.length]=si;
              if(si==it) break;
            }
            if(!si)
            {
              si=lit.item;
              itms=[lit.item];
              while((si=this.PrevVisibleItem(si))!=null)
              {
                if(ngVal(si.Enabled,true)) itms[itms.length]=si;
                if(si==it) break;
              }
            }
            if(si)
            {
              for(var i=0;i<itms.length;i++)
                if(s) this.selected[this.ItemId(itms[i])]=true;
                else delete this.selected[this.ItemId(itms[i])];
              this.SelectChanged();
              break;
            }
          }
        }
        else if(this.SelectType==4){
          var select = !ngVal(this.selected[this.ItemId(it)],false);
          this.selected={};
          this.SelectItem(it,select);
          this.SelectChanged();
        }
        else this.SelectItem(it,!ngVal(this.selected[this.ItemId(it)],false));
      }
      break;
    case 3:
      this.ToggleCollapsed(it);
      e.listIgnoreAction=true;
      e.listIgnoreSelect=true;
      break;
  }
  if(e.listIgnoreAction) action=null;
  var clickitem=false;
  if(e.listPart)
  {
    if(e.listIgnoreSelect)
    {
      this.ignore_select=new Date().getTime();
      clickitem=true;
    }
  }
  else
    if(!e.listIgnoreSelect)
      clickitem=true;

  if(clickitem)
  {
    if((action)&&(!action.in_action_click))
    {
      if(e.listPart!=3) action.Click(e);
      return;
    }
    if(it.OnClickItem) it.OnClickItem(e);
    if(this.OnClickItem) this.OnClickItem(e);
  }
}

function ngl_DoMouseEnter(e, mi, elm)
{
  if(this.leave_timer) {
    clearTimeout(this.leave_timer);
    delete this.leave_timer;
    return;
  }
  ngc_EnterBox(this.ID);
  if(this.OnMouseEnter) this.OnMouseEnter(this);
}

function ngl_DoLeave(lid)
{
  var l=ngGetControlById(lid, 'ngList');
  if(l)
  {
    if(l.leave_timer) clearTimeout(l.leave_timer);
    delete l.leave_timer;

    var ii=ngl_ItemById(ngl_CurrentRowId);
    if(ii.list==l)
    {
      var o=document.getElementById(ngl_CurrentRowId);
      if(o) ngl_LeaveRow(false,o,(l.OnEnterRow!=null)||(l.OnLeaveRow!=null));
    }
    ngc_LeaveBox(lid);
    if(l.OnMouseLeave) l.OnMouseLeave(l);
  }
}

function ngl_DoMouseLeave(e)
{
  if(this.leave_timer) clearTimeout(this.leave_timer);
  this.leave_timer=setTimeout("ngl_DoLeave('"+this.ID+"');",100);
}

var ngl_LeaveRowTimer = null;
var ngl_LeaveRowElement = null;
var ngl_LeaveRowEnterLeave = false;

function ngl_EnterRow(e,elm,enterleave)
{
  if((!e)&&(e!==false)) e=window.event;
  if((ngUsingTouch)&&(e)&&(e.type.toLowerCase().match(/mouse/))) return; // ignore mouse events if using touch

  var ts=new Date().getTime();
  if((e)&&(ts<ngl_FocusTime+200)) return;

  if(ngl_LeaveRowTimer)
  {
    clearTimeout(ngl_LeaveRowTimer);
    ngl_LeaveRowTimer=null;
    if((ngl_LeaveRowElement)&&(ngl_LeaveRowElement.id==elm.id))
    {
      ngl_LeaveRowElement=null;
      return;
    }
    ngl_DoLeaveRow();
  }

  var cn=elm.className;
  if(ngl_CurrentRowId!='')
  {
    var o=document.getElementById(ngl_CurrentRowId);
    ngl_LeaveRow(e,o,enterleave);
  }
  ngl_CurrentRowId=elm.id;
  var i=cn.indexOf('_Focus');
  if(i<0) cn=cn+'_Focus';
  elm.className=cn;
  ngc_EnterImg(elm.id+'C');
  ngc_EnterImg(elm.id+'T');
  ngc_EnterImg(elm.id+'I');

  if(enterleave)
  {
    var ii=ngl_ItemById(elm.id);
    if((ii.list)&&(ii.list.OnEnterRow)) ii.list.OnEnterRow(ii.list, ii.item, elm.id);
  }
}

function ngl_LeaveRow(e,elm,enterleave)
{
  if((!e)&&(e!==false)) e=window.event;
  if((ngUsingTouch)&&(e)&&(e.type.toLowerCase().match(/mouse/))) return; // ignore mouse events if using touch

  if(!elm) return;
  var ts=new Date().getTime();
  if((e)&&(ts<ngl_FocusTime+200)) return;

  if(ngl_LeaveRowTimer)
  {
    clearTimeout(ngl_LeaveRowTimer);
    ngl_LeaveRowTimer=null;
    if((ngl_LeaveRowElement)&&(ngl_LeaveRowElement.id!=elm.id))
    {
      ngl_DoLeaveRow();
    }
  }
  ngl_LeaveRowElement = elm;
  ngl_LeaveRowEnterLeave = enterleave;
  if(e) ngl_LeaveRowTimer = setTimeout("ngl_DoLeaveRow()",50);
  else ngl_DoLeaveRow();
}

function ngl_DoLeaveRow()
{
  if(ngl_LeaveRowTimer) clearTimeout(ngl_LeaveRowTimer);
  ngl_LeaveRowTimer=null;

  var elm=ngl_LeaveRowElement;
  var enterleave=ngl_LeaveRowEnterLeave;

  ngl_LeaveRowElement=null;
  if(!elm) return;

  var cn=elm.className;
  if(ngl_CurrentRowId==elm.id) ngl_CurrentRowId='';
  var i=cn.indexOf('_Focus');
  if(i>=0) cn=cn.substring(0,i);
  elm.className=cn;
  ngc_LeaveImg(elm.id+'C');
  ngc_LeaveImg(elm.id+'T');
  ngc_LeaveImg(elm.id+'I');

  if(enterleave)
  {
    var ii=ngl_ItemById(elm.id);
    if((ii.list)&&(ii.list.OnLeaveRow)) ii.list.OnLeaveRow(ii.list, ii.item, elm.id);
  }
}

function ngl_FirstVisibleItem(it,enabledonly)
{
  var list=it;
  if((typeof list === 'undefined')||(list===null)) list=this;

  if((typeof list.Items !== 'undefined')&&(list.Items.length>0))
  {
    for(var pi,i=0;i<list.Items.length;i++)
    {
      pi=list.Items[i];
      if(typeof pi === 'undefined') pi=new Object;
      if((ngVal(pi.Visible,true))&&((!enabledonly)||(ngVal(pi.Enabled,true))))
      {
        if(document.getElementById(this.ID+'_'+this.ItemId(pi))) return pi;
      }
      if((!ngVal(pi.Collapsed,false))&&(typeof pi.Items !== 'undefined')&&(pi.Items.length>0))
      {
        var p=this.FirstVisibleItem(pi,enabledonly);
        if(p) return p;
      }
    }
  }
  return null;
}

function ngl_LastVisibleItem(it,enabledonly)
{
  var list=it;
  if((typeof list === 'undefined')||(list===null)) list=this;

  if((typeof list.Items !== 'undefined')&&(list.Items.length>0))
  {
    for(var pi,i=list.Items.length-1;i>=0;i--)
    {
      pi=list.Items[i];
      if(typeof pi === 'undefined') pi=new Object;
      if((!ngVal(pi.Collapsed,false))&&(typeof pi.Items !== 'undefined')&&(pi.Items.length>0))
      {
        var p=this.LastVisibleItem(pi,enabledonly);
        if(p) return p;
      }
      if((ngVal(pi.Visible,true))&&((!enabledonly)||(ngVal(pi.Enabled,true))))
      {
        if(document.getElementById(this.ID+'_'+this.ItemId(pi))) return pi;
      }
    }
  }
  return null;
}

function ngl_NextVisibleItem(it,subitems,enabledonly)
{
  if(!it) return this.FirstVisibleItem(it,enabledonly);
  var parent = ngVal(it.Parent, null);
  if(!parent) parent=this;
  var i,pi;
  var curvisible=false;
  if((ngVal(it.Visible,true))&&((!enabledonly)||(ngVal(it.Enabled,true))))
  {
    if(document.getElementById(this.ID+'_'+this.ItemId(it))) curvisible=true;
  }
  for(i=0;i<parent.Items.length;i++)
  {
    pi=parent.Items[i];
    if(pi==it)
    {
      if((ngVal(subitems,true))&&(!ngVal(it.Collapsed,false)))
      {
        pi=this.FirstVisibleItem(it,enabledonly);
        if(pi)
        {
          if(document.getElementById(this.ID+'_'+this.ItemId(pi))) return pi;
        }
      }
      for(i++;i<parent.Items.length;i++)
      {
        pi=parent.Items[i];
        if(typeof pi === 'undefined') pi=new Object;
        if((ngVal(pi.Visible,true))&&((!enabledonly)||(ngVal(pi.Enabled,true))))
        {
          if(document.getElementById(this.ID+'_'+this.ItemId(pi))) return pi;
        }
        if(!ngVal(pi.Collapsed,false))
        {
          var p=this.FirstVisibleItem(pi,enabledonly);
          if(p) return p;
        }
      }
      return(parent == this ? (curvisible ? null : this.FirstVisibleItem(null,enabledonly)) : this.NextVisibleItem(parent,false,enabledonly));
    }
  }
  return (curvisible ? null : this.FirstVisibleItem(null,enabledonly));
}

function ngl_PrevVisibleItem(it,subitems,enabledonly)
{
  if(!it) return this.LastVisibleItem(it,enabledonly);
  var parent = ngVal(it.Parent, null);
  if(!parent) parent=this;
  var i,pi;
  var curvisible=false;
  if((ngVal(it.Visible,true))&&((!enabledonly)||(ngVal(it.Enabled,true))))
  {
    if(document.getElementById(this.ID+'_'+this.ItemId(it))) curvisible=true;
  }
  for(i=parent.Items.length-1;i>=0;i--)
  {
    pi=parent.Items[i];
    if(pi==it)
    {
      for(i--;i>=0;i--)
      {
        pi=parent.Items[i];
        if(typeof pi === 'undefined') pi=new Object;
        if(!ngVal(pi.Collapsed,false))
        {
          var p=this.LastVisibleItem(pi,enabledonly);
          if(p) return p;
        }
        if((ngVal(pi.Visible,true))&&((!enabledonly)||(ngVal(pi.Enabled,true))))
        {
          if(document.getElementById(this.ID+'_'+this.ItemId(pi))) return pi;
        }
      }
      if(parent==this) return (curvisible ? null : this.LastVisibleItem(null,enabledonly));
      if((ngVal(parent.Visible,true))&&((!enabledonly)||(ngVal(parent.Enabled,true))))
      {
        if(document.getElementById(this.ID+'_'+this.ItemId(parent))) return parent;
      }
      return this.PrevVisibleItem(parent,enabledonly);
    }
  }
  return (curvisible ? null : this.LastVisibleItem(null,enabledonly)); //return null;
}

function ngl_KeyDown(e)
{
  if(!e) e=window.event;
  ngl_FocusTime=new Date().getTime();

  var l=ngGetControlById(this.id, 'ngList');
  if((l)&&(l.Enabled)&&(l.KeyEvents)&&(!l.ReadOnly))
  {
    var edit=l.DropDownOwner;
    var et=ngGetControlByElement(e.target || e.srcElement || e.originalTarget);
    if((et)&&(et!==l)&&(et!=edit)) return;

    e.Owner=l;
    if((l.OnKeyDown)&&(!ngVal(l.OnKeyDown(e),false))) return false;

    var ieKey=e.keyCode;
    switch(ieKey)
    {
      case 9:  // Tab
        if(!l.DropDownOwner) break;
        if(e.preventDefault) e.preventDefault();
        e.returnValue = false;
      case 27: // Esc
        var e=l.DropDownOwner;
        if(e)
        {
          if(e.HideDropDown) e.HideDropDown();
          e.SetFocus();
        }
        break;
      case 33: // PgUp
      case 34: // PgDown
      case 38: // Up
      case 35: // End
      case 36: // Home
      case 40: // Down
      {
        var ii=ngl_ItemById(ngl_CurrentRowId);
        if(ii.list!=l)
        {
          ii.list=l;
          ii.item=null;
        }
        switch(ieKey)
        {
          case 40: ii.item=l.NextVisibleItem(ii.item,true,true); break; // Down
          case 38: ii.item=l.PrevVisibleItem(ii.item,true,true); break; // Up
          case 36: ii.item=l.FirstVisibleItem(null,true); break; // Home
          case 35: ii.item=l.LastVisibleItem(null,true); break; // End
          case 33: // PgUp
          {
            var ni;
            for(var i=0;i<l.PageSize;i++)
            {
              ni=l.PrevVisibleItem(ii.item,true,true);
              if(!ni) break;
              ii.item=ni;
            }
            break;
          }
          case 34: // PgDown
          {
            var ni;
            for(var i=0;i<l.PageSize;i++)
            {
              ni=l.NextVisibleItem(ii.item,true,true);
              if(!ni) break;
              ii.item=ni;
            }
            break;
          }
        }
        if(ii.item)
        {
          l.SetItemFocus(ii.item);
          var nrid=l.ID+'_'+l.ItemId(ii.item);
        }
        return false;
      }
      case 37: // Left
      {
        var ii=ngl_ItemById(ngl_CurrentRowId);
        if(ii.list!=l)
        {
          ii.list=l;
          ii.item=null;
        }
        if((ii.item)&&(typeof ii.item.Items !== 'undefined')&&(ii.item.Items.length>0))
        {
          l.Collapse(ii.item);
        }
        break;
      }
      case 39: // Right
      {
        var ii=ngl_ItemById(ngl_CurrentRowId);
        if(ii.list!=l)
        {
          ii.list=l;
          ii.item=null;
        }
        if((ii.item)&&(typeof ii.item.Items !== 'undefined')&&(ii.item.Items.length>0))
        {
          l.Expand(ii.item);
        }
        break;
      }
      case 32: // Spacebar
      case 13: // Enter
        var o=document.getElementById(ngl_CurrentRowId);
        if(o)
        {
          ngl_GetClickInfo(e,o,(ieKey == 32 ? 2 : 1));
          l.ClickItem(e.listItem, e);
          // simulate event bubbling
          ngl_GetClickInfo(e,o,0);
          l.ClickItem(e.listItem, e);
        }
        return false;
    }
  }
}

function ngl_KeyUp(e)
{
  if(!e) e=window.event;
  var l=ngGetControlById(this.id, 'ngList');
  if((l)&&(l.Enabled)&&(l.KeyEvents)&&(!l.ReadOnly))
  {
    var edit=l.DropDownOwner;
    var et=ngGetControlByElement(e.target || e.srcElement || e.originalTarget);
    if((et)&&(et!==l)&&(et!=edit)) return;
    e.Owner=l;
    if((l.OnKeyUp)&&(!ngVal(l.OnKeyUp(e),false))) return false;
  }
}

function ngl_CheckImgDrawProps(id, s, enabled,o)
{
  var v=ngc_ImgProps(id,s,enabled,o);
  if(ngl_CurrentRowId==id.substring(0,id.length-1)) { v.aL=v.oL; v.aT=v.oT; }
  else { v.aL=v.L; v.aT=v.T; }
  return v;
}

function ngl_TreeImgDrawProps(id, s, enabled, o)
{
  var v=ngc_ImgProps(id,s,enabled,o);
  if(ngl_CurrentRowId==id.substring(0,id.length-1)) { v.aL=v.oL; v.aT=v.oT; }
  else { v.aL=v.L; v.aT=v.T; }
  return v;
}

function ngl_ItemImgDrawProps(id, enabled, o)
{
  var v=ngc_ImgDrawProps(id,'', '',0,enabled,o);
  if(ngl_CurrentRowId==id.substring(0,id.length-1)) { v.aL=v.oL; v.aT=v.oT; }
  else { v.aL=v.L; v.aT=v.T; }
  return v;
}

function ngl_CreateImage(html, dp, image, clickid, il, hasdblclick)
{
  ngc_Img(html,dp,"position:absolute; margin-left: "+ngVal(image.x,il)+"px;",' '+ngc_PtrEventsHTML(this,'item'+clickid,'tap drag'+(hasdblclick ? ' doubletap' : ''))+' '+ngVal(image.Attrs,''));
}

function ngl_ActionSetItemVisible(state, data)
{
  if(data) this.SetItemVisible(data, state);
}

function ngl_ActionItemCheck(state, data)
{
  if(data) this.CheckItem(data, state);
}

function ngl_ActionItemClick(e, data)
{
  if(data) this.ClickItem(data, e);
}

function ngl_DoActionUpdate(cid)
{
  var c=ngGetControlById(cid);
  if(!c) return;
  if(c.ActionUpdateTimer) clearTimeout(c.ActionUpdateTimer); c.ActionUpdateTimer = null;
  c.Update();
}

function ngl_ActionItemUpdate(data)
{
  if(this.ActionUpdateTimer) clearTimeout(this.ActionUpdateTimer);
  this.ActionUpdateTimer = setTimeout("ngl_DoActionUpdate('"+this.ID+"')",100);
}

function ngl_SetItemAction(it, ac)
{
  if(!it) return null;

  if(typeof ac === 'string')
  {
    ac=ngGetControlById(ac);
    if(!ac) return null;
  }
  ac=ngVal(ac,null);

  var oac=ngVal(it.Action,null);
  if(oac == ac) return ac;

  if((oac)&&(oac.RemoveControl)) oac.RemoveControl(this, it);
  it.Action=ac;
  if((ac)&&(ac.AddControl)) ac.AddControl(this, it);
  this.SyncItemAction(it);
  return ac;
}

function ngl_GetItemAction(it)
{
  if(!it) return null;
  var ac=ngVal(it.Action,null);
  if(typeof ac === 'string') ac=this.SetItemAction(it,ac);
  return ac;
}

function ngl_SyncItemAction(it, action)
{
  if(!it) return null;
  if(typeof action === 'undefined') action = this.GetItemAction(it);
  if(action)
  {
    it.Visible = action.Visible;
    it.Enabled = action.Enabled;
    it.Checked = action.Checked;
    it.Image = action.GetImg();
    if(this.Columns.length>0) it.Text[this.Columns[0].ID] = action.GetText();
    else it.Text = action.GetText();
    it.Alt = action.GetAlt();
  }
}

function ngl_DoDrawItemText(html, text, it, col, id, level)
{
  html.append(text);
}

function ngl_DrawItemText(html, it, id, level)
{
  if((this.OnDrawItemText)&&(!ngVal(this.OnDrawItemText(this, html, it, id, level),false))) return;

  var text,alt,emptytext;
  var state=ngVal(it.Checked,0);
  var itenabled=ngVal(it.Enabled,true);
  var selected=ngVal(this.selected[id],false);
  if(selected)  this.draw_selected[id]=true;
  var enterleave=((this.OnEnterRow!=null)||(this.OnLeaveRow!=null));
  var hasdblclick=(this.OnDblClick)||(it.OnDblClick);
  var hasdblclickitem=(hasdblclick) || (this.OnDblClickItem);
  var hastoggle=((it.Items)&&((it.Items.length>0)||(typeof it.Collapsed !== 'undefined')));
  var cclass=this.BaseClassName;

  var rowevents=' '+ngc_PtrEventsHTML(this,'item0','tap drag'+(hasdblclick ? ' doubletap' : ''))+' onmouseover="ngl_EnterRow(event,this,'+(enterleave ? '1' : '0')+');" onmouseout="ngl_LeaveRow(event,this,'+(enterleave ? '1' : '0')+');"';
  var textevents=' '+ngc_PtrEventsHTML(this,'item1','tap drag'+(hasdblclickitem || hastoggle ? ' doubletap' : ''));
  var indent=this.ListIndent;
  var minheight=ngVal(it.MinHeight,this.MinItemHeight);
  minheight=ngVal(minheight,0);
  var height;
  if(this.OnMeasureItem) height=this.OnMeasureItem(this, it, id, level);
  if(typeof height==='undefined') height=it.H;
  if(typeof height==='undefined') height=this.ItemHeight;

  if(this.OnCalcIndent) indent+=this.OnCalcIndent(this, it, id, level);
  else
  {
    if((typeof this.Indent === 'object')&&(this.Indent)&&(this.Indent.length>0))
    {
      var cnt=this.Indent.length;
      if(level>=cnt) indent+=this.Indent[cnt-1]+(level-cnt+1)*this.DefaultIndent;
      else indent+=this.Indent[level];
    }
    else indent+=level*(this.Indent ? this.Indent : this.DefaultIndent);
  }

  var images=null,image,il=0;
  if(this.OnGetItemImg) image=this.OnGetItemImg(this, it, id, level);
  else image=ngVal(it.Image,this.ItemImg);
  if(image)
  {
    if(typeof image.x === 'undefined') il-=ngVal(image.sx, image.W);
    if(!images) images=new ngStringBuilder;
    if(image.H>minheight) minheight=image.H;
    ngl_CreateImage(images, ngl_ItemImgDrawProps(this.ID+'_'+id+'I', (this.Enabled)&&(itenabled), image), image, 4, il, hasdblclickitem || hastoggle);
  }
  if(this.OnGetCheckImg) image=this.OnGetCheckImg(this, it, id);
  else image=(typeof it.Checked === 'undefined' && (!this.ShowCheckboxes) ? null : this.CheckImg);
  if(image)
  {
    if(typeof image.x === 'undefined') il-=ngVal(image.sx, image.W);
    if(!images) images=new ngStringBuilder;
    if(image.H>minheight) minheight=image.H;
    ngl_CreateImage(images, ngl_CheckImgDrawProps(this.ID+'_'+id+'C', state, (this.Enabled)&&(itenabled), image), image, 2, il, hasdblclickitem);
  }
  if((typeof it.Collapsed !== 'undefined')||(typeof it.Items !== 'undefined')&&(it.Items.length>0))
  {
    if(this.OnGetTreeImg) image=this.OnGetTreeImg(this, it, id);
    else image=this.TreeImg;
    if(image)
    {
      if(typeof image.x === 'undefined') il-=ngVal(image.sx, image.W);
      if(!images) images=new ngStringBuilder;
      if(image.H>minheight) minheight=image.H;
      ngl_CreateImage(images, ngl_TreeImgDrawProps(this.ID+'_'+id+'T', ngVal(it.Collapsed,false), (this.Enabled)&&(itenabled), image), image, 3, il, hasdblclickitem);
    }
  }

  if(typeof height!=='undefined') minheight=-1;
  if(this.Columns.length>0)
  {
    var col;
    html.append('<tr class="'+this.GetRowClassName(it, selected, id, level, 0/*nglRowItem*/)+'" '+(ngVal(it.Visible,true) ? '' : 'style="display:none;" ')+'id="'+this.ID+'_'+id+'"'+rowevents+'>');
    for(var i=0;i<this.Columns.length;i++)
    {
      col=this.Columns[i];
      if(!ngVal(col.Visible,true)) continue;

      html.append('<td valign="'+ngVal(col.VAlign,'top')+'" align="'+ngVal(col.Align,'left')+'"'+(minheight>0 ? ' height="'+minheight+'"' : '')+'>');
      if(this.OnGetAlt) alt=ngVal(this.OnGetAlt(this, it, col),'');
      else
      {
        if(typeof it.Alt === 'string') alt=it.Alt;
        else alt=(typeof it.Alt === 'object' ? ngVal(it.Alt[col.ID],'') : '');
      }

      if(!i)
      {
        html.append('<div ');
        if(alt!='') html.append('title="'+ng_htmlEncode(alt)+'" ');
        html.append('style="padding-left: '+indent+'px;'+(typeof height!=='undefined' ? 'height:'+height+'px;' : '')+'">');
        html.append(images);
      }
      if(this.OnGetText)
      {
        text=ngVal(this.OnGetText(this, it, col),'');
        if(this.HTMLEncode) text=ng_htmlEncode(text,true);
      }
      else
      {
        text=(typeof it.Text==='object' ? ngVal(it.Text[col.ID],'') : '');
        if(this.HTMLEncode) text=ng_htmlEncode(text,true);
      }
      emptytext=(text=='');
      if(emptytext) text='<div style="width:0px;position:relative;overflow:hidden;">&nbsp;</div>'; // text padding

      if((typeof it.ControlsHolder !== 'undefined')&&(typeof it.ControlsHolder[col.ID] !== 'undefined'))
      {
        if(!emptytext)
        {
          html.append('<div class="'+cclass+'Text"'+textevents);
          if((i)&&(alt!='')) html.append(' title="'+ng_htmlEncode(alt)+'"');
          html.append('>');
          this.DoDrawItemText(html, text, it, col, id, level);
          html.append('</div>');
        }
        html.append('<div style="position:relative;height:1px;">');
        html.append(it.ControlsHolder[col.ID].innerHTML);
        html.append('</div>');
      }
      else
      {
        html.append('<div class="'+cclass+'Text"'+textevents);
        if((i)&&(alt!='')) html.append(' title="'+ng_htmlEncode(alt)+'"');
        html.append('>');
        this.DoDrawItemText(html, text, it, col, id, level);
        html.append('</div>');
      }

      if(!i) html.append('</div>');
      html.append('</td>');
    }
    html.append('</tr>');
  }
  else
  {
    if(this.OnGetText)
    {
      text=ngVal(this.OnGetText(this, it),'');
      if(this.HTMLEncode) text=ng_htmlEncode(text,true);
    }
    else
    {
      text=ngVal(it.Text,'');
      if(this.HTMLEncode) text=ng_htmlEncode(text,true);
    }
    emptytext=(text=='');
    if(emptytext) text='<div style="width:0px;position:relative;overflow:hidden;">&nbsp;</div>'; // text padding

    if(this.OnGetAlt) alt=ngVal(this.OnGetAlt(this, it),'');
    else alt=ngVal(it.Alt,'');

    html.append('<div class="'+this.GetRowClassName(it, selected, id, level, 0/*nglRowItem*/)+'" ');
    if(alt!='') html.append('title="'+ng_htmlEncode(alt)+'" ');
    var style=(typeof height!=='undefined' ? 'height:'+height+'px;' : '')+(ngVal(it.Visible,true) ? '' : 'display:none;');
    if(style!='') style=' style="'+style+'"';
    html.append('id="'+this.ID+'_'+id+'"'+style+rowevents+'>');
    html.append('<div style="position:relative;padding-left: '+indent+'px;">');

    if(minheight>0) html.append('<div style="float:left;width:0px;height:'+minheight+'px;"></div>');
    if(images) html.append(images);

    if(typeof it.ControlsHolder !== 'undefined')
    {
      if(!emptytext) {
        html.append('<div class="'+cclass+'Text" style="position:relative;"'+textevents+'>'); // pos:relative - IE6 background-color fix
        this.DoDrawItemText(html, text, it, void 0, id, level);
        html.append('</div>');

      }
      html.append('<div style="position:relative;height:1px;">');
      html.append(it.ControlsHolder.innerHTML);
      html.append('</div>');
    } else {
      html.append('<div class="'+cclass+'Text" style="position:relative;"'+textevents+'>'); // pos:relative - IE6 background-color fix
      this.DoDrawItemText(html, text, it, void 0, id, level);
      html.append('</div>');
    }

    if(minheight>0) html.append('<div style="clear:both;height:0px;overflow:hidden;"></div>');
    html.append('</div></div>');
  }
}

function ngl_DrawItem(html, it, id, level,pcollapsed)
{
  if(typeof it === 'undefined') it=new Object;

  var action = this.GetItemAction(it);
  this.SyncItemAction(it,action);

  var selected=ngVal(this.selected[id],false);
  var state=ngVal(it.Checked,0);
  var ret={l:level, s: state};

  if(action) action.CheckRadioGroup();
  else
    if((typeof it.RadioGroup !== 'undefined')&&(state)&&(this.radio_groups[it.RadioGroup]!=it))
    {
      var uncheck=this.radio_groups[it.RadioGroup];
      this.radio_groups[it.RadioGroup]=it;
      if(uncheck) this.CheckItem(uncheck,0);
    }

  if((this.OnDrawItem)&&(!ngVal(this.OnDrawItem(this, ret, html, it, id, level, pcollapsed),false))) return ret;

  var shtml,checkgroup=ngVal(it.CheckGroup,false);
  if(checkgroup) shtml=new ngStringBuilder;
  else
  {
    shtml=html;
    this.DrawItemText(html,it,id,level);
  }
  if(this.Columns.length>0)
  {
    var collapsed=(pcollapsed)||(ngVal(it.Collapsed,false));
    if((typeof it.Items !== 'undefined')&&(it.Items.length>0))
    {
      if(level>0) shtml.append('</tbody>');
      var cn=this.GetRowClassName(it, selected, id, level, 1/*nglRowGroup*/);
      shtml.append('<tbody id="'+this.ID+'_G'+id+'_0"'+(collapsed ? ' style="display:none;"' : '')+(cn ? ' class="'+cn+'"' : '')+'>');
      var l,lvl=level;
      var gstate;
      for(var i=0;i<it.Items.length;i++)
      {
        l=this.DrawItem(shtml,it.Items[i], id+'_'+i, level+1,collapsed);
        lvl=l.l;
        if((this.ShowCheckboxes)||(typeof it.Items[i].Checked!=='undefined'))
        {
          if(typeof gstate==='undefined') gstate=l.s;
          else if(l.s!=gstate) gstate=2;
        }
        if(lvl>level+1)
        {
          shtml.append('</tbody>');
          if((i+1)<it.Items.length)
          {
            var cn=this.GetRowClassName(it, selected, id, lvl, 1/*nglRowGroup*/);
            shtml.append('<tbody id="'+this.ID+'_G'+id+'_'+(i+1)+'"'+(collapsed ? ' style="display:none;"' : '')+(cn ? ' class="'+cn+'"' : '')+'>');
          }
        }
        if((checkgroup)&&(typeof gstate!=='undefined')) { it.Checked=gstate; ret.s=gstate; }
      }
      ret.l=lvl;
    }
  }
  else
  {
    if((typeof it.Items !== 'undefined')&&(it.Items.length>0))
    {
      var cn=this.GetRowClassName(it, selected, id, level, 1/*nglRowGroup*/);
      shtml.append('<div id="'+this.ID+'_G'+id+'" level="'+level+'" style="display:'+(ngVal(it.Collapsed,false) ? 'none' : 'block')+';"'+(cn ? ' class="'+cn+'"' : '')+'>');
      var l,gstate;
      for(var i=0;i<it.Items.length;i++)
      {
        l=this.DrawItem(shtml,it.Items[i], id+'_'+i, level+1);
        if((this.ShowCheckboxes)||(typeof it.Items[i].Checked!=='undefined'))
        {
          if(typeof gstate==='undefined') gstate=l.s;
          else if(l.s!=gstate) gstate=2;
        }
      }
      shtml.append('</div>');
      if((checkgroup)&&(typeof gstate!=='undefined')) { it.Checked=gstate; ret.s=gstate; }
    }
  }
  if(checkgroup)
  {
     this.DrawItemText(html,it,id,level);
     html.append(shtml);
     delete shtml;
  }
  return ret;
}

function ngl_CalcIndent()
{
  var indent,maxindent=0,it=null;

  for(var i=0;(i<this.Items.length)||(!i);i++)
  {
    if(this.Items.length>0) it=this.Items[i];
    if(!it) it=new ngListItem(':MeasureImg:');

    indent=this.CalcItemIndent(it);
    if(indent>maxindent) maxindent=indent;
  }
  if(typeof this.ListIndent === 'undefined') this.ListIndent=maxindent;
  if(typeof this.DefaultIndent === 'undefined') this.DefaultIndent=maxindent;
}

function ngl_CalcItemIndent(item)
{
  var indent=0;
  if(!item) return indent;

  var id,image;
  if((this.OnGetItemImg)||(this.OnGetCheckImg)||(this.OnGetTreeImg)) id=this.ItemId(item);
  if(this.OnGetItemImg) image=this.OnGetItemImg(this, item, id, 0);
  else
  {
    this.SyncItemAction(item);
    image=ngVal(item.Image,this.ItemImg);
  }
  if(image) indent+=ngVal(image.W,0);

  if(this.OnGetCheckImg) image=this.OnGetCheckImg(this, item, id);
  else image=(typeof item.Checked === 'undefined' && (!this.ShowCheckboxes) ? null : this.CheckImg);
  if(image) indent+=ngVal(image.W,0);

  if(this.OnGetTreeImg) image=this.OnGetTreeImg(this, item, id);
  else image=this.TreeImg;
  if(image) indent+=ngVal(image.W,0);
  return indent;
}

function ngl_DoUpdate(o)
{
  if((this.update_cnt>0)||(this.ID=='')) { this.need_update=true; return; }
  this.need_update=false;

  if(this.ActionUpdateTimer) clearTimeout(this.ActionUpdateTimer); this.ActionUpdateTimer=null;

  // Calculate indent
  if((typeof this.ListIndent === 'undefined')||(typeof this.DefaultIndent === 'undefined'))
  {
    this.CalcIndent();
  }

  var cclass=this.BaseClassName;
  var html=new ngStringBuilder;
  this.draw_selected = {};

  var hascolumns=(this.Columns.length>0);
  if(hascolumns)
  {
    var text,hascaptions=false,captions=new Array();
    var width100=-1;
    var d,md=this.Columns.length;
    var col,cl2,visiblecolumns,cn=0;
    for(var i=0;i<this.Columns.length;i++)
    {
      col=this.Columns[i];
      if(!ngVal(col.Visible,true)) continue;
      cn++;

      if(typeof col.Width === 'undefined')
      {
        if(typeof cl2 === 'undefined') {
          visiblecolumns=cn;
          for(var j=i+1;j<this.Columns.length;j++) {
            if(ngVal(this.Columns[j].Visible,true)) visiblecolumns++;
          }
          cl2=visiblecolumns/2;
        }
        d=Math.abs(cl2-cn);
        if(d<md)
        {
          md=d;
          width100=i;
        }
      }
      if(this.OnGetColumnCaption) text=ngVal(this.OnGetColumnCaption(this, col, i),'');
      else text=ngVal(col.Caption,'');
      captions[i]=text;
      if(text!='') hascaptions=true;
    }
  }
  var hasframe=(!ng_EmptyVar(this.Frame));
  var showheader=(hascolumns && hascaptions && ngVal(this.ShowHeader,true));
  var embed=this.HasEmbededContent=(hasframe)||(showheader);
  var scroll=0;
  if(embed)
  {
    var cb=document.getElementById(this.ID+'_CB');
    if(cb) scroll=cb.scrollTop;
    ng_SetScrollBars(o, ssNone);

    var w,h;
    if((typeof this.Bounds.W==='undefined')&&((typeof this.Bounds.L==='undefined')||(typeof this.Bounds.R==='undefined')))
    {
      if(o.style.width=='0px') w='0px';
      else {
        w=ng_StyleWidth(o);
        if(!w) w='auto';
        else w+='px';
      }
    }
    else
    {
      w=ng_ClientWidth(o);
      var p=ng_GetCurrentStylePx(o,'padding-left'); if(p>0) w-=p;
      p=ng_GetCurrentStylePx(o,'padding-right'); if(p>0) w-=p;
      w+='px';
    }
    if((typeof this.Bounds.H==='undefined')&&((typeof this.Bounds.T==='undefined')||(typeof this.Bounds.B==='undefined')))
    {
      if(o.style.height=='0px') h='0px';
      else {
        h=ng_StyleHeight(o);
        if(!h) h='auto';
        else h+='px';
      }
    }
    else
    {
      h=ng_ClientHeight(o);
      var p=ng_GetCurrentStylePx(o,'padding-bottom'); if(p>0) h-=p;
      p=ng_GetCurrentStylePx(o,'padding-top'); if(p>0) h-=p;
      h+='px';
    }

    html.append('<div id="'+this.ID+'_F" style="position: absolute;left:0px;top:0px;z-index:800;"></div>');
    html.append('<div id="'+this.ID+'_CB" class="'+cclass+'Back" style="position:relative;left:0px;top:0px;width:'+w+';height:'+h+';');
    switch((w=='auto')&&(h=='auto') ? ssNone : ngVal(this.ScrollBars, ssNone))
    {
      case ssNone:       html.append('overflow:hidden;overflowX:hidden;overflowY:hidden;'); break;
      case ssAuto:       html.append('overflow:auto;  overflowX:auto;  overflowY:auto;');   break;
      case ssBoth:       html.append('overflow:scroll;overflowX:scroll;overflowY:scroll;'); break;
      case ssHorizontal: html.append('overflow:scroll;overflowX:scroll;overflowY:hidden;'); break;
      case ssVertical:   html.append('overflow:scroll;overflowX:hidden;overflowY:scroll;'); break;
      case ssDefault:    html.append('overflow:visible;overflowX:visible;overflowY:visible;'); break;
    }
    html.append('">');
  }
  else scroll=o.scrollTop;

  if(hascolumns)
  {
    html.append('<table id="'+this.ID+'_TB" cellspacing="0" cellpadding="0" border="0" style="position:relative;left:0px;right:0px;overflow:hidden;">');

    function th_append(s)
    {
      if(showheader) thead.append(s);
      html.append(s);
    }

    var thead=(showheader ? new ngStringBuilder : html);
    var col,text;
    th_append('<thead>');
    th_append('<tr>');
    var cw;
    for(var i=0;i<this.Columns.length;i++)
    {
      col=this.Columns[i];
      if(!ngVal(col.Visible,true)) continue;

      th_append('<td');
      if(i==width100) th_append(' width="'+(visiblecolumns==1 ? 1 : 100)+'%"'); // strange fix, 100% will not work if one column
      th_append(' align="'+ngVal(col.Align,'left')+'"');
      if(!showheader) html.append(' style="visibility: hidden"');
      th_append('>');
      if(this.OnGetColumnWidth) cw=this.OnGetColumnWidth(this, col, i, captions[i]);
      else cw=col.Width;
      th_append('<div style="position:relative; font-size:0px; line-height:0px; height:0px; width:'+(typeof cw==='undefined' ? 0 : cw)+'px"></div>');
      if(showheader)
      {
        text=captions[i];
        if(text=='') text='<div style="width:0px;position:relative;overflow:hidden;">&nbsp;</div>'; // text padding
        th_append('<div class="'+cclass+'Caption"');
        thead.append(' id="'+this.ID+'_H'+i+'" '+ngc_PtrEventsHTML(this,'capt'+i,'tap drag'+(this.OnCaptionDblClick ? ' doubletap' : '')));
        th_append('>');
        th_append(text);
        th_append('</div></td>');
      }
    }
    th_append('</tr>');
    th_append('</thead>');
  }
  var l;
  for(var i=0;i<this.Items.length;i++)
  {
    l=this.DrawItem(html, this.Items[i], i, 0, false);
    if(l.l>0) html.append('</tbody>');

    if(typeof this.next_draw_itemidx === 'undefined') continue;
    if(this.next_draw_itemidx>i) i=this.next_draw_itemidx-1;
    delete this.next_draw_itemidx;
  }
  if(hascolumns)
  {
    html.append('</table>');
  }
  if(embed)
  {
    html.append('</div>');
  }
  if(showheader)
  {
    html.append('<div id="'+this.ID+'_FH" class="'+this.BaseClassName+'Header" style="position:absolute;left:'+ng_GetCurrentStylePx(o,'padding-left')+'px;top:'+ng_GetCurrentStylePx(o,'padding-top')+'px;z-index:100;overflow:hidden; background-color: inherit;">');
    html.append('<table id="'+this.ID+'_TH" cellspacing="0" cellpadding="0" border="0" style="overflow:hidden;">');
    html.append(thead);
    html.append('</table>');
    html.append('</div>');
  }
  ng_SetInnerHTML(o,html.toString());
  var cb;
  if(embed)
  {
    cb=this.ContentElm=document.getElementById(this.ID+'_CB');
  }
  else
  {
    cb=null;
    this.ContentElm=o;
  }

  if(showheader)
  {
    this.UpdateColumns();
  }
  if(typeof this.ItemsControls !== 'undefined')
  {
    function setbounds(c) {
      if(!c) return;
      if(typeof c.SetBounds==='function') c.SetBounds();
      var cc=c.ChildControls;
      if(typeof cc !== 'undefined')
        for(var i=cc.length-1;i>=0;i--)
          setbounds(cc[i]);
    }
    var cc;
    for(var i=0;i<this.ItemsControls.length;i++)
    {
      cc=this.ItemsControls[i];
      setbounds(cc);
      if(typeof cc.Update==='function') cc.Update();
    }
  }

  if(embed)
  {
    if(hasframe)
    {
      var f=document.getElementById(this.ID+'_F');
      if(f)
      {
        var w=ng_ClientWidth(o);
        var h=ng_ClientHeight(o);

        var frame=new ngStringBuilder;
        ngc_ImgBox(frame, this.ID, 'ngList', (this.ControlHasFocus ? 1 : 0), this.Enabled, 0,0,w,h,false, this.Frame);
        ng_SetInnerHTML(f,frame.toString());
      }
    }
    var self=this;
    var fhdr=(showheader ? document.getElementById(this.ID+'_FH') : null);
    if(cb) cb.onscroll = function(e) {
      if(fhdr) fhdr.scrollLeft=cb.scrollLeft;
      if(self.OnScroll)
      {
        self.OnScroll(self,e,cb);
      }
    };
  }
  try {
    this.ContentElm.scrollTop=scroll;
  }
  catch(e) { }

  return true;
}

function ngl_UpdateColumns()
{
  if((!this.ContentElm)||(!this.Columns.length)) return;

  var cb=this.ContentElm;
  var fhdr=document.getElementById(this.ID+'_FH');
  if(!fhdr) return;

  var tb=document.getElementById(this.ID+'_TB');
  if(!tb) return;
  var hdr=document.getElementById(this.ID+'_TH');
  if(!hdr) return;

  ng_SetClientWidth(hdr,ng_ClientWidth(tb));
  ng_SetClientWidth(fhdr,ng_ClientWidth(cb));
  var origf=tb.firstChild.firstChild.firstChild;
  var newf=fhdr.firstChild.firstChild.firstChild.firstChild;
  while((origf)&&(newf))
  {
    if(origf.getAttribute("width")!='100%')
    {
      ng_SetClientWidth(newf.firstChild,ng_ClientWidth(origf));
    }
    origf=origf.nextSibling;
    newf=newf.nextSibling;
  }
}

function ngl_UpdateFrame()
{
  var frame = document.getElementById(this.ID+'_F');
  if(!frame){return true;}

  var o = this.Elm();
  if(!o){return true;}

  var w = ng_ClientWidth(o);
  var h = ng_ClientHeight(o);

  var html=new ngStringBuilder;
  ngc_ImgBox(html, this.ID, 'ngList', 0, this.Enabled, 0,0,w,h,false, this.Frame, '', '');
  ng_SetInnerHTML(frame,html.toString());
}

function ngl_AddItemControl(obj)
{
  if(!obj) return;
  if(typeof this.ItemsControls === 'undefined') this.ItemsControls = new Array();
  this.ItemsControls[this.ItemsControls.length]=obj;
  obj.ParentControl=this;
}

function ngl_RemoveItemControl(obj)
{
  if(!obj) return;
  if(typeof this.ItemsControls === 'undefined') return;
  for(var i=this.ItemsControls.length-1;i>=0;i--)
    if(this.ItemsControls[i]==obj) this.ItemsControls.splice(i, 1);

  if(!this.ItemsControls.length) this.ItemsControls=undefined;
  obj.ParentControl=undefined;
}

function ngl_SetReadOnly(ro)
{
  ro=ngVal(ro,true);
  if(ro==this.ReadOnly) return true;
  if ((this.OnSetReadOnly) && (!ngVal(this.OnSetReadOnly(this,ro), false))) return false;

  this.ReadOnly=ro;

  if (this.OnReadOnlyChanged) this.OnReadOnlyChanged(this,ro);
  return true;
}

function ngl_CreateItemControls(it, recursive)
{
  this.BeginUpdate();
  try {
    if((typeof it === 'undefined')||(it===null)) it=this;
    else
    {
      if((typeof it.Controls !== 'undefined')&&(typeof it.Controls.Owner === 'undefined')&&(typeof it.Controls.Parent === 'undefined'))
      {
        if(this.Columns.length>0)
        {
          var cid;
          for(var i=0;i<this.Columns.length;i++)
          {
            cid=this.Columns[i].ID;
            if(typeof it.Controls[cid] !== 'undefined')
            {
              if(typeof it.ControlsHolder === 'undefined') it.ControlsHolder=new Object;

              it.ControlsHolder[cid]=document.createElement('div');
              var lref=ngCreateControls(it.Controls[cid],undefined,it.ControlsHolder[cid]);
              var ref;
              if(typeof it.Controls === 'undefined') it.Controls=new Object;
              var ctrls=new Object;
              ng_SetByRef(ctrls,'Owner',this);
              ng_SetByRef(ctrls,'Parent',it);
              it.Controls[cid]=ctrls;
              if(!this.ParentReferences) ref=ctrls;
              else ref=this.Owner;
              var c;
              for(var j in lref)
              {
                c=lref[j];
                c.Owner=ref;
                this.AddItemControl(c);
                if(ref) ref[j]=c;
                if(ref!=ctrls) ctrls[j]=c;
              }
            }
          }
        }
        else
        {
          it.ControlsHolder=document.createElement('div');
          var lref=ngCreateControls(it.Controls,undefined,it.ControlsHolder);
          var ref;

          it.Controls=new Object;
          ng_SetByRef(it.Controls,'Owner',this);
          ng_SetByRef(it.Controls,'Parent',it);
          if(!this.ParentReferences) ref=it.Controls;
          else ref=this.Owner;
          var c;
          for(var j in lref)
          {
            c=lref[j];
            c.Owner=ref;
            this.AddItemControl(c);
            if(ref) ref[j]=c;
            if(ref!=it.Controls) it.Controls[j]=c;
          }
        }
        this.Update();
      }
    }
    if((typeof it.Items!=='undefined')&&(ngVal(recursive,true)))
    {
      for(var j in it.Items)
      {
        this.CreateItemControls(it.Items[j],true);
      }
    }
  } finally {
    this.EndUpdate();
  }
}

function ngl_DoCreate(def, ref, elm, parent)
{
  if(typeof def.Data !== 'undefined')
  {
    if(typeof def.Data.ParentReferences !== 'undefined') this.ParentReferences = def.Data.ParentReferences;
    if(typeof def.Data.Items !== 'undefined')
    {
      this.Items=new Array();
      this.BeginUpdate();
      try {
        this.AddItems(def.Data.Items);
        this.CreateItemControls();
      } finally {
        this.need_update=false;
        this.EndUpdate();
      }
    }
  }
  this.SetScrollBars(ngVal(this.ScrollBars, ssAuto));
}

function ngl_DoFocus(e,elm)
{
  ngc_Enter(e, this.Elm(), this.CtrlType);
  ngc_ChangeBox(this.ID, 1, this.Enabled, this.Frame);
  if((this.OnFocus)&&(this.Enabled)) this.OnFocus(this);
}

function ngl_DoBlur(e,elm)
{
  ngc_Leave(e, this.Elm(), this.CtrlType);
  ngc_ChangeBox(this.ID, 0, this.Enabled, this.Frame);

  var ii=ngl_ItemById(ngl_CurrentRowId);
  if(ii.list==this)
  {
    var o=document.getElementById(ngl_CurrentRowId);
    if(o) ngl_LeaveRow(false,o,(this.OnEnterRow!=null)||(this.OnLeaveRow!=null));
  }
  if((this.OnBlur)&&(this.Enabled)) this.OnBlur(this);
}

function ngl_DoAttach(o)
{
  if(o)
  {
    if((!ngAndroid) // DIVs with enabled focus on Android 4.3 has tap highlight which cannot be disabled
     &&(o.getAttribute("tabindex")==null)) o.setAttribute("tabindex",0);
    var t=this.CtrlType;
    var self=this;
    o.onkeydown   = ngl_KeyDown;
    o.onkeyup     = ngl_KeyUp;
    o.onfocus     = function(e) { ngc_Focus(e, this, t); };
    o.onblur      = function(e) { ngc_Blur(e, this, t); };
    o.onscroll    = function(e) {
      if((self.OnScroll)&&(!self.HasEmbededContent))
      {
        self.OnScroll(self,e,o);
      }
    };
  }
}

function ngl_DoDispose()
{
  if(this.leave_timer) clearTimeout(this.leave_timer);
  delete this.leave_timer;
  var ii=ngl_ItemById(ngl_CurrentRowId);
  if(ii.list===this) ngl_CurrentRowId='';
  this.Clear();
  return true;
}

function ngl_ItemsChanged()
{
  if(this.update_cnt>0) {
    this._items_changed = true;
    this.need_update = true;
  }
  else {
    this.DoItemsChanged();
    this.Update();
  }
}

function ngl_DoItemsChanged()
{
  if(this.update_cnt > 0) this._items_changed = true;
  else if(this.OnItemsChanged) this.OnItemsChanged(this,this.Items);
}

/**
 *  Class: ngListItem
 *  This class implements <ngList> item.
 *
 *  Syntax:
 *    new *ngListItem* (mixed text)
 *
 *  Parameters:
 *    text - item text(s)
 *
 *  See also:
 *    <ngList>
 */
function ngListItem(txt)
{
  /*
   *  Group: Properties
   */
  /*  Variable: Text
   *  ...
   *  Type: mixed
   */
  this.Text=txt;
  /*  Variable: ID
   *  ...
   *  Type: string
   *  Default value: *undefined*
   */
  //this.ID=undefined;
  /*  Variable: Checked
   *  ...
   *  Type: enum
   *
   *  Constants:
   *    nglUnchecked (0) - ...
   *    nglChecked (1) - ...
   *    nglGrayed (2) - ...
   *
   *  Default value: *nglUnchecked*
   */
  //this.Checked=0;
  /*  Variable: AllowGrayed
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  //this.AllowGrayed=false;
  /*  Variable: Collapsed
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  //this.Collapsed=false;
  /*  Variable: Visible
   *  ...
   *  Type: bool
   *  Default value: *true*
   */
  //this.Visible=true;
  /*  Variable: Enabled
   *  ...
   *  Type: bool
   *  Default value: *true*
   */
  //this.Visible=true;
  /*  Variable: RadioGroup
   *  ...
   *  Type: string
   */
  //this.RadioGroup='';
  /*  Variable: H
   *  ...
   *  Type: int
   */
  //this.H=undefined;
  /*  Variable: MinHeight
   *  ...
   *  Type: int
   *  Default value: *undefined*
   */
  // this.MinHeight = undefined;
  /*  Variable: Image
   *  ...
   *  Type: object
   */
  //this.Image=undefined;
  /*  Variable: Parent
   *  ...
   *  Type: object (<ngList> or <ngListItem>)
   */
  //this.Parent=list;
  /*  Variable: Items
   *  ...
   *  Type: array
   *  Default value: *null*
   */
  //this.Items = null;
  /*  Variable: Controls
   *  ...
   *  Type: object
   */
  //this.Controls = undefined;
  /*  Variable: ControlsHolder
   *  ...
   *  Type: object
   */
  //this.ControlsHolder = undefined;

  /*
   *  Group: Events
   */
  /*
   *  Event: OnCollapsing
   */
  //this.OnCollapsing=null;
  /*
   *  Event: OnCollapsed
   */
  //this.OnCollapsed=null;
  /*
   *  Event: OnExpanding
   */
  //this.OnExpanding=null;
  /*
   *  Event: OnExpanded
   */
  //this.OnExpanded=null;
}

/**
 *  Class: ngListCol
 *  This class implements <ngList> column.
 *
 *  Syntax:
 *    new *ngListCol* (string id, string caption [, string align='left', int width=undefined, bool visible=true])
 *
 *  Parameters:
 *    id - column id
 *    caption - column caption
 *    align - column alignment
 *    width - column width in pixels
 *    visible - column visibility
 *
 *  See also:
 *    <ngList>
 */
function ngListCol(id, caption, align, width, visible)
{
  /*
   *  Group: Properties
   */
  /*  Variable: ID
   *  ...
   *  Type: string
   */
  this.ID=id;
  /*  Variable: Caption
   *  ...
   *  Type: string
   */
  this.Caption=caption;
  /*  Variable: Align
   *  ...
   *  Type: string
   *  Default value: *'left'*
   */
  /*  Variable: VAlign
   *  ...
   *  Type: string
   *  Default value: *'top'*
   */
  this.Align=ngVal(align,'left');
  /*  Variable: Width
   *  ...
   *  Type: int
   */
  this.Width=width;
  /*  Variable: Visible
   *  ...
   *  Type: bool
   */
  this.Visible=ngVal(visible,true);
}

/**
 *  Class: ngList
 *  This class implements a generic list control.
 *
 *  Syntax:
 *    new *ngList* ([string id])
 *
 *  Parameters:
 *    id - control ID
 *
 *  See also:
 *    Abstract class <ngControl>.
 */
function ngList(id)
{
  ngControl(this, id, 'ngList');
  this.DoCreate = ngl_DoCreate;
  this.DoAttach = ngl_DoAttach;
  this.DoMouseEnter = ngl_DoMouseEnter;
  this.DoMouseLeave = ngl_DoMouseLeave;
  this.DoPtrStart = ngl_DoPtrStart;
  this.DoPtrDrag = ngl_DoPtrDrag;
  this.DoPtrEnd = ngl_DoPtrEnd;
  this.DoPtrClick = ngl_DoPtrClick;
  this.DoPtrDblClick = ngl_DoPtrDblClick;
  this.DoGesture = ngl_DoGesture;
  this.DoFocus = ngl_DoFocus;
  this.DoBlur = ngl_DoBlur;
  this.DoDispose = ngl_DoDispose;
  this.ItemsChanged = ngl_ItemsChanged;
  this.DoItemsChanged = ngl_DoItemsChanged;
  this.ignore_select = 0;

  /*
   *  Group: Properties
   */
  /*  Variable: Columns
   *  ...
   *  Type: array
   */
  this.Columns = new Array();
  /*  Variable: Items
   *  ...
   *  Type: array
   */
  this.Items = new Array();
  /*  Variable: HTMLEncode
   *  ...
   *  Type: bool
   *  Default value: <ngDefaultHTMLEncoding>
   */
  this.HTMLEncode = ngVal(ngDefaultHTMLEncoding,false);

  this.radio_groups = {};

  /*  Variable: ListIndent
   *  ...
   *  Type: integer
   */
  // optional:
  //this.ListIndent=undefined;
  /*  Variable: DefaultIndent
   *  ...
   *  Type: integer
   */
  //this.DefaultIndent=undefined;
  /*  Variable: Indent
   *  ...
   *  Type: mixed
   *  Default value: *null*
   */
  this.Indent=null;

  /*  Variable: ShowCheckboxes
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  this.ShowCheckboxes = false;
  /*  Variable: RadioAllowUncheck
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  this.RadioAllowUncheck = false;

  /*  Variable: ShowHeader
   *  ...
   *  Type: bool
   *  Default value: *true*
   */
  //this.ShowHeader=true;
  /*  Variable: CheckImg
   *  ...
   *  Type: object
   */
  this.CheckImg = null;
  /*  Variable: TreeImg
   *  ...
   *  Type: object
   */
  this.TreeImg = null;
  /*  Variable: ItemImg
   *  ...
   *  Type: object
   */
  this.ItemImg = null;

  /*  Variable: KeyEvents
   *  ...
   *  Type: bool
   *  Default value: *true*
   */
  this.KeyEvents=true;
  /*  Variable: PageSize
   *  ...
   *  Type: int
   *  Default value: *10*
   */
  this.PageSize = 10;
  /*  Variable: ItemHeight
   *  ...
   *  Type: int
   *  Default value: *undefined*
   */
  // this.ItemHeight = undefined;
  /*  Variable: MinItemHeight
   *  ...
   *  Type: int
   *  Default value: *undefined*
   */
  // this.MinItemHeight = undefined;
  /*  Variable: MouseEvents
   *  ...
   *  Type: bool
   *  Default value: *true*
   */
  this.MouseEvents=true;
  /*  Variable: ReadOnly
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  this.ReadOnly=false;

  /*  Variable: SelectType
   *  ...
   *  Type: enum
   *
   *  Constants:
   *    nglSelectNone - ...
   *    nglSelectSingle - ...
   *    nglSelectMulti - ...
   *    nglSelectMultiExt - ...
   *    nglSelectSingleExt - ...
   *    nglSelectCheck - ...
   *
   *  Default value: *nglSelectNone*
   */
  this.SelectType = nglSelectNone;
  /*  Variable: SelCount
   *  ...
   *  Type: int
   */
  this.SelCount = 0;
  /*  Variable: SortColumn
   *  ...
   *  Type: string
   */
  this.SortColumn = '';
  /*  Variable: SortDir
   *  ...
   *  Type: enum
   *
   *  Constants:
   *    nglSortAsc - ...
   *    nglSortDesc - ...
   *
   *  Default value: *nglSortAsc*
   */
  this.SortDir = nglSortAsc;

  /*  Variable: SortCaseSensitive
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  this.SortCaseSensitive = false;

  /*  Variable: CheckedChangedDelay
   *  ...
   *  Type: int
   *  Default value: *0*
   */
  this.CheckedChangedDelay = 0;

  /*  Variable: ItemsControls
   *  ...
   *  Type: array
   */
  //this.ItemsControls = new Array();
  /*
   *  Variable: ParentReferences
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  this.ParentReferences=false;
  /*  Variable: Frame
   *  ...
   *  Type: object
   */
  this.Frame = new Object;

  this.do_add = ngl_do_add;
  this.do_remove = ngl_do_remove;

  /*
   *  Group: Methods
   */
  /*  Function: Add
   *  Adds new item at the end of the list.
   *
   *  Syntax:
   *    int *Add* (mixed item [, object parent=null])
   *
   *  Returns:
   *    Index of new item.
   */
  this.Add = ngl_Add;
  /*  Function: AddItems
   *  Adds multiple items (even recursive) at the end of the list.
   *
   *  Syntax:
   *    void *AddItems* (array items [, object parent=null])
   *
   *  Returns:
   *    -
   */
  this.AddItems = ngl_AddItems;
  /*  Function: SetItems
   *  Sets list items.
   *
   *  Syntax:
   *    void *SetItems* (array items)
   *
   *  Returns:
   *    -
   */
  this.SetItems = ngl_SetItems;
  /*  Function: Insert
   *  Inserts new item at the position specified by index.
   *
   *  Syntax:
   *    int *Insert* (int index, mixed item [, object parent=null])
   *
   *  Returns:
   *    Index of new item.
   */
  this.Insert = ngl_Insert;
  /*  Function: Replace
   *  Replaces item at the position specified by index.
   *
   *  Syntax:
   *    object *Replace* (int index, mixed item [, object parent=null])
   *
   *  Returns:
   *    Deleted item object.
   */
  this.Replace = ngl_Replace;
  /*  Function: Remove
   *  Deletes all references to the item from list.
   *
   *  Syntax:
   *    void *Remove* (object item [, object parent=null])
   *
   *  Returns:
   *    -
   */
  this.Remove = ngl_Remove;
  /*  Function: Delete
   *  Removes item at specified index from list.
   *
   *  Syntax:
   *    object *Delete* (int index [, object parent=null])
   *
   *  Returns:
   *    Deleted item object.
   */
  this.Delete = ngl_Delete;
  /*  Function: Clear
   *  Deletes all items from the list.
   *
   *  Syntax:
   *    void *Delete* ([object parent=null])
   *
   *  Returns:
   *    -
   */
  this.Clear = ngl_Clear;
  /*  Function: IndexOf
   *  Returns the index of the item in list.
   *
   *  Syntax:
   *    int *IndexOf* (object item, [object parent=null])
   *
   *  Returns:
   *    -
   */
  this.IndexOf = ngl_IndexOf;

  /*  Function: GetPath
   *  Gets/creates items by specified path.
   *
   *  Syntax:
   *    object *GetPath* (object parent, string path [, create=true, function oncreatefnc=null, mixed userdata])
   *
   *  Returns:
   *    -
   */
  this.GetPath = ngl_GetPath;

  /*  Function: Collapse
   *  Collapses an item.
   *
   *  Syntax:
   *    void *Collapse* (object item)
   *
   *  Returns:
   *    -
   */
  this.Collapse = ngl_Collapse;
  /*  Function: Expand
   *  Expands an item.
   *
   *  Syntax:
   *    void *Expand* (object item)
   *
   *  Returns:
   *    -
   */
  this.Expand = ngl_Expand;
  /*  Function: CollapseAll
   *  Collapses all items in tree.
   *
   *  Syntax:
   *    void *CollapseAll* ([object parent=null])
   *
   *  Returns:
   *    -
   */
  this.CollapseAll = ngl_CollapseAll;
  /*  Function: ExpandAll
   *  Expands all items in tree.
   *
   *  Syntax:
   *    void *ExpandAll* ([object parent=null])
   *
   *  Returns:
   *    -
   */
  this.ExpandAll = ngl_ExpandAll;
  /*  Function: ToggleCollapsed
   *  Collapses/Expands an item.
   *
   *  Syntax:
   *    void *ToggleCollapsed* (object item)
   *
   *  Returns:
   *    -
   */
  this.ToggleCollapsed = ngl_ToggleCollapsed;
  /*  Function: CheckItem
   *  Sets item check state.
   *
   *  Syntax:
   *    void *CheckItem* (object item [, enum state=nglChecked])
   *
   *  Constants:
   *    nglUnchecked (0) - ...
   *    nglChecked (1) - ...
   *    nglGrayed (2) - ...
   *
   *  Returns:
   *    -
   */
  this.CheckItem = ngl_CheckItem;
  /*  Function: CheckAllItems
   *  Checks all subitems of item.
   *
   *  Syntax:
   *    void *CheckAllItems* ([object parent=null, enum state=nglChecked, bool respectcheckgroup=false])
   *
   *  Returns:
   *    -
   */
  this.CheckAllItems = ngl_CheckAllItems;
  /*  Function: CheckAll
   *  Checks all items in tree.
   *
   *  Syntax:
   *    void *CheckAll* ([object parent=null, bool respectcheckgroup=false])
   *
   *  Returns:
   *    -
   */
  this.CheckAll = ngl_CheckAll;
  /*  Function: UncheckAll
   *  Unchecks all items in tree.
   *
   *  Syntax:
   *    void *UncheckAll* ([object parent=null, bool respectcheckgroup=false])
   *
   *  Returns:
   *    -
   */
  this.UncheckAll = ngl_UncheckAll;
  /*  Function: GetChecked
   *  Gets references to all checked items.
   *
   *  Syntax:
   *    array *GetChecked* ()
   *
   *  Returns:
   *    Array of items.
   */
  this.GetChecked = ngl_GetChecked;
  /*  Function: HasChecked
   *  Gets if list contains any checked item.
   *
   *  Syntax:
   *    boolean *HasChecked* ()
   *
   *  Returns:
   *    -
   */
  this.HasChecked = ngl_HasChecked;
  /*  Function: ClickItem
   *  Clicks the item.
   *
   *  Syntax:
   *    void *ClickItem* (it [, event ev])
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  this.ClickItem = ngl_ClickItem;
  /*  Function: SetItemVisible
   *  Sets item visibility.
   *
   *  Syntax:
   *    void *SetItemVisible* (object item [, bool visible = true])
   *
   *  Returns:
   *    -
   */
  this.SetItemVisible = ngl_SetItemVisible;
  /*  Function: SetItemEnabled
   *  Sets enabled state of the item.
   *
   *  Syntax:
   *    void *SetItemEnabled* (object item [, bool enabled = true])
   *
   *  Returns:
   *    -
   */
  this.SetItemEnabled = ngl_SetItemEnabled;
  /*  Function: SetColumnVisible
   *  Sets column visibility.
   *
   *  Syntax:
   *    void *SetColumnVisible* (int id [, bool visible = true])
   *
   *  Returns:
   *    -
   */
  this.SetColumnVisible = ngl_SetColumnVisible;

  /*  Function: Sort
   *  Performs a sort on the list.
   *
   *  Syntax:
   *    void *Sort* ([object item, bool recursion=true])
   *
   *  Returns:
   *    -
   *
   *  See also:
   *    <OnCompareItem>
   */
  this.Sort = ngl_Sort;

  /*  Function: Scan
   *  Recursive scan items in list.
   *
   *  Syntax:
   *    int *Scan* (function scanfnc [, object parent=null, mixed userdata])
   *
   *  Returns:
   *    -
   */
  this.Scan = ngl_Scan;
  /*  Function: ScanVisible
   *  Recursive scan only visible items in list.
   *
   *  Syntax:
   *    int *ScanVisible* (function scanfnc [, object parent=null, mixed userdata])
   *
   *  Returns:
   *    -
   */
  this.ScanVisible = ngl_ScanVisible;

  /*  Function: FindItem
   *  Locates an item in list by given key.
   *
   *  Syntax:
   *    object *FindItem* (mixed key [, int partial=0, bool ignorecase=true, bool visibleonly=false])
   *
   *  Returns:
   *    -
   */
  this.FindItem = ngl_FindItem;
  /*  Function: FindItemByID
   *  Locates an item by given ID.
   *
   *  Syntax:
   *    object *FindItemByID* (string id)
   *
   *  Returns:
   *    -
   */
  this.FindItemByID = ngl_FindItemByID;


  /*  Function: GetItemFocus
   *  Gets focused item.
   *
   *  Syntax:
   *    object *GetItemFocus* ()
   *
   *  Returns:
   *    -
   */
  this.GetItemFocus = ngl_GetItemFocus;

  /*  Function: SetItemFocus
   *  Sets focus to specified item.
   *
   *  Syntax:
   *    void *SetItemFocus* (object item)
   *
   *  Returns:
   *    -
   */
  this.SetItemFocus = ngl_SetItemFocus;

  /*  Function: FirstVisibleItem
   *  Locates first visible item in a list.
   *
   *  Syntax:
   *    object *FirstVisibleItem* ([object item=null])
   *
   *  Returns:
   *    -
   */
  this.FirstVisibleItem = ngl_FirstVisibleItem;
  /*  Function: PrevVisibleItem
   *  Locates previous visible item in a list.
   *
   *  Syntax:
   *    object *PrevVisibleItem* (object item [, bool subitems=true])
   *
   *  Returns:
   *    -
   */
  this.PrevVisibleItem = ngl_PrevVisibleItem;
  /*  Function: NextVisibleItem
   *  Locates next visible item in a list.
   *
   *  Syntax:
   *    object *NextVisibleItem* (object item [, bool subitems=true])
   *
   *  Returns:
   *    -
   */
  this.NextVisibleItem = ngl_NextVisibleItem;
  /*  Function: LastVisibleItem
   *  Locates last visible item in a list.
   *
   *  Syntax:
   *    object *LastVisibleItem* ([object item=null])
   *
   *  Returns:
   *    -
   */
  this.LastVisibleItem = ngl_LastVisibleItem;

  this.draw_selected = {};
  this.selected = {};
  this.last_selected = '';
  this.SelectChanged = ngl_SelectChanged;

  /*  Function: ClearSelected
   *  Clears selection.
   *
   *  Syntax:
   *    void *ClearSelected* ()
   *
   *  Returns:
   *    -
   */
  this.ClearSelected = ngl_ClearSelected;
  /*  Function: SelectItem
   *  Adds item to selection.
   *
   *  Syntax:
   *    void *SelectItem* (object item [, bool state=true])
   *
   *  Returns:
   *    -
   */
  this.SelectItem = ngl_SelectItem;
  /*  Function: GetSelected
   *  Gets references to all selected items.
   *
   *  Syntax:
   *    array *GetSelected* ()
   *
   *  Returns:
   *    Array of items.
   */
  this.GetSelected = ngl_GetSelected;

  /*  Function: SetSelected
   *  Sets what items are selected.
   *  Previous selection is discarded.
   *
   *  Syntax:
   *    void *SetSelected* (array items)
   *
   *  Returns:
   *    -
   */
  this.SetSelected = ngl_SetSelected;

  /*  Function: IsItemSelected
   *  Determines if given item is selected.
   *
   *  Syntax:
   *    array *IsItemSelected* (object item)
   *
   *  Returns:
   *    TRUE if item is selected.
   */
  this.IsItemSelected = ngl_IsItemSelected;

  this.do_checked = ngl_do_checked;
  this.CheckChanged = ngl_CheckChanged;

  /*  Function: UpdateChecked
   *  Update item(s) checked state. Faster then updating whole control by calling
   *  Update() method.
   *
   *  Syntax:
   *    void *UpdateChecked* (object item [, bool recursion=false, bool setall=undefined])
   *
   *    void *UpdateChecked* ()
   *
   *  Returns:
   *    -
   */
  this.UpdateChecked = ngl_UpdateChecked;
  /*  Function: UpdateCollapsed
   *  Update item(s) collapsed state. Faster then updating whole control by calling
   *  Update() method.
   *
   *  Syntax:
   *    void *UpdateCollapsed* (object item [, bool recursion=false, bool setall=undefined])
   *
   *    void *UpdateCollapsed* ()
   *
   *  Returns:
   *    -
   */
  this.UpdateCollapsed = ngl_UpdateCollapsed;

  /*  Function: CreateItemControls
   *  Converts Controls definition into real controls.
   *
   *  Syntax:
   *    void *CreateItemControls* ([object item=null, bool recursive=true])
   *
   *  Returns:
   *    -
   */
  this.CreateItemControls = ngl_CreateItemControls;
  /*  Function: AddItemControl
   *  Adds control to <ItemsControls> array.
   *
   *  Syntax:
   *    void *AddItemControl* (object obj)
   *
   *  Returns:
   *    -
   */
  this.AddItemControl = ngl_AddItemControl;
  /*  Function: RemoveItemControl
   *  Removes control ftom <ItemsControls> array.
   *
   *  Syntax:
   *    void *RemoveItemControl* (object obj)
   *
   *  Returns:
   *    -
   */
  this.RemoveItemControl = ngl_RemoveItemControl;

  /*  Function: SetReadOnly
   *  Sets readonly state of control.
   *
   *  Syntax:
   *    void *SetReadOnly* ([bool ro=true])
   *
   *  Parameters:
   *    ro - readonly state
   *
   *  Returns:
   *    -
   */
  this.SetReadOnly=ngl_SetReadOnly;

  this.ItemId = ngl_ItemId;
  this.ItemById = nglist_ItemById;
  this.CalcIndent=ngl_CalcIndent;
  this.CalcItemIndent=ngl_CalcItemIndent;

  this.DoDropDown = ngl_DoDropDown;
  this.DoDropDownFinished = ngl_DoDropDownFinished;
  this.SelectDropDownItem = ngl_SelectDropDownItem;
  this.SelectDropDownItemWithFocus = ngl_SelectDropDownItemWithFocus;

  this.GetRowClassName = ngl_GetRowClassName;
  this.DrawItemText = ngl_DrawItemText;
  this.DoDrawItemText = ngl_DoDrawItemText;
  this.DrawItem = ngl_DrawItem;
  this.DoUpdate = ngl_DoUpdate;
  this.UpdateColumns = ngl_UpdateColumns;
  this.UpdateFrame = ngl_UpdateFrame;

  this.ActionUpdateTimer = null;
  this.SetItemAction = ngl_SetItemAction;
  this.GetItemAction = ngl_GetItemAction;
  this.SyncItemAction = ngl_SyncItemAction;
  this.ActionSetVisible = ngl_ActionSetItemVisible;
  this.ActionCheck = ngl_ActionItemCheck;
  this.ActionClick = ngl_ActionItemClick;
  this.ActionUpdate = ngl_ActionItemUpdate;

  /*  Function: BeginUpdate
   *  Prevents the updating of the list until the <EndUpdate> method is called.
   *
   *  Syntax:
   *    void *BeginUpdate* ()
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   *
   *  See also:
   *    <EndUpdate>
   */
  this.BeginUpdate = ngl_BeginUpdate;
  /*  Function: EndUpdate
   *  Performs the repaints deferred by a call to <BeginUpdate>.
   *
   *  Syntax:
   *    void *EndUpdate* ()
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   *
   *  See also:
   *    <BeginUpdate>
   */
  this.EndUpdate = ngl_EndUpdate;

  this.update_cnt=0;
  this.need_update=false;

  this.checked_changed_timer = null;

  /*
   *  Group: Events
   */
  /*
   *  Event: OnAdd
   */
  this.OnAdd = null;
  /*
   *  Event: OnRemove
   */
  this.OnRemove = null;
  /*
   *  Event: OnItemsChanged
   */
  this.OnItemsChanged = null;
  /*
   *  Event: OnGetText
   */
  this.OnGetText = null;
  /*
   *  Event: OnGetAlt
   */
  this.OnGetAlt = null;

  /*
   *  Event: OnExpanding
   */
  this.OnExpanding = null;
  /*
   *  Event: OnExpanded
   */
  this.OnExpanded = null;
  /*
   *  Event: OnCollapsing
   */
  this.OnCollapsing = null;
  /*
   *  Event: OnCollapsed
   */
  this.OnCollapsed = null;

  /*
   *  Event: OnItemCheckChanged
   */
  this.OnItemCheckChanged = null;

  /*
   *  Event: OnCheckChanged
   */
  this.OnCheckChanged = null;

  /*
   *  Event: OnSetItemVisible
   */
  this.OnSetItemVisible = null;

  /*
   *  Event: OnSetItemEnabled
   */
  this.OnSetItemEnabled = null;

  /*
   *  Event: OnSetColumnVisible
   */
  this.OnSetColumnVisible = null;

  /*
   *  Event: OnSelectChanged
   */
  this.OnSelectChanged = null;
  /*
   *  Event: OnRedrawSelected
   */
  this.OnRedrawSelected = null;

  /*
   *  Event: OnCompareItem
   */
  this.OnCompareItem = null;

  /*
   *  Event: OnClickItem
   */
  this.OnClickItem = null;
  /*
   *  Event: OnDblClickItem
   */
  this.OnDblClickItem = null;

  /*
   *  Event: OnDblClick
   */
  this.OnDblClick = null;
  /*
   *  Event: OnClick
   */
  this.OnClick = null;

  /*
   *  Event: OnCaptionClick
   */
  this.OnCaptionClick = null;
  /*
   *  Event: OnCaptionDblClick
   */
  this.OnCaptionDblClick = null;

  /*
   *  Event: OnKeyDown
   */
  this.OnKeyDown = null;
  /*
   *  Event: OnKeyUp
   */
  this.OnKeyUp = null;

  /*
   *  Event: OnScroll
   */
  this.OnScroll = null;
  /*
   *  Event: OnMouseEnter
   */
  this.OnMouseEnter = null;
  /*
   *  Event: OnMouseLeave
   */
  this.OnMouseLeave = null;

  /*
   *  Event: OnEnterRow
   */
  this.OnEnterRow = null;
  /*
   *  Event: OnLeaveRow
   */
  this.OnLeaveRow = null;

  /*
   *  Event: OnFocus
   */
  this.OnFocus = null;
  /*
   *  Event: OnBlur
   */
  this.OnBlur = null;

  /*
   *  Event: OnDrawItem
   */
  this.OnDrawItem = null;
  /*
   *  Event: OnDrawItemText
   */
  this.OnDrawItemText = null;
  /*
   *  Event: OnGetRowClassName
   */
  this.OnGetRowClassName = null;
  /*
   *  Event: OnGetRowGroupClassName
   */
  this.OnGetRowGroupClassName = null;
  /*
   *  Event: OnMeasureItem
   */
  this.OnMeasureItem = null;
  /*
   *  Event: OnCalcIndent
   */
  this.OnCalcIndent = null;
  /*
   *  Event: OnGetItemImg
   */
  this.OnGetItemImg = null;
  /*
   *  Event: OnGetCheckImg
   */
  this.OnGetCheckImg = null;
  /*
   *  Event: OnGetTreeImg
   */
  this.OnGetTreeImg = null;
  /*
   *  Event: OnGetColumnCaption
   */
  this.OnGetColumnCaption = null;
  /*
   *  Event: OnGetColumnWidth
   */
  this.OnGetColumnWidth = null;
  /*
   *  Event: OnSetReadOnly
   */
  this.OnSetReadOnly = null;

  /*
   *  Event: OnReadOnlyChanged
   */
  this.OnReadOnlyChanged = null;

  ngControlCreated(this);

  // TODO:
  // - caption mouse focus
  // - group hotkeys
  // - partial update
  // - items drag&drop
  // - columns drag&drop
}

// --- ngPageList --------------------------------------------------------------

var plDisplayFixed = 0;
var plDisplayFit   = 1;

var plFirstPage = -9999;
var plLastPage  = -9998;

var plPaging_First        = 1;
var plPaging_Prev         = 2;
var plPaging_Next         = 4;
var plPaging_Last         = 8;
var plPaging_Pages        = 16;
var plPaging_PageNo       = 32;
var plPaging_HideDisabled = 256;

var plPagingUser       = -1;
var plPagingSimple     = plPaging_Prev  | plPaging_Next;
var plPagingSimple2    = plPaging_Prev  | plPaging_Next   | plPaging_HideDisabled;
var plPagingSimpleEx   = plPaging_Prev  | plPaging_PageNo | plPaging_Next;
var plPagingPages      = plPaging_Prev  | plPaging_Pages  | plPaging_Next;
var plPagingPages2     = plPaging_First | plPaging_Prev   | plPaging_Pages  | plPaging_Next  | plPaging_Last;
var plPagingPagesEx    = plPagingPages  | plPaging_HideDisabled;
var plPagingPagesEx2   = plPagingPages2 | plPaging_HideDisabled;
var plPagingDataSet    = plPaging_First | plPaging_Prev   | plPaging_Next   | plPaging_Last;
var plPagingDataSetEx  = plPaging_First | plPaging_Prev   | plPaging_PageNo | plPaging_Next  | plPaging_Last;
var plPagingAll        = 511; // all bits

var plDisplayPagingNone      = 0;
var plDisplayPagingAlways    = 1;
var plDisplayPagingNotEmpty  = 2;
var plDisplayPagingMorePages = 3;

function npgl_OnListChanged(list,it,parent)
{
  if(!parent) list.ListPagingChanged();
  return true;
}

function npgl_ListPagingChanged()
{
  this.page_start=new Array();
  this.page_start[0]=0;
}

function npgl_DoUpdate(o)
{
  if(this.Controls.List.Enabled!=this.Enabled) // enabled is not in sync, fix it
  {
    for(var i in this.Controls)
    {
      if(typeof this.Controls[i].SetEnabled==='function') this.Controls[i].SetEnabled(this.Enabled);
    }
    if(this.Enabled) this.Controls.List.paging_needs_update=true;
  }
  return true;
}

function npgl_DoUpdateBefore(o)
{
  if((this.update_cnt>0)||(this.ID=='')) return;
  this.need_update=false;

  var pl=this.Owner.Owner;
  if(!pl) return false;

  if((this.display_mode!=pl.DisplayMode) // Display mode changed
    ||(pl.DisplayMode==plDisplayFixed)&&(this.displayed_items!=pl.DisplayedItems))
  {
    this.ListPagingChanged();
  }

  if(pl.DisplayMode==plDisplayFixed)
  {
    if(this.ContentElm) ng_SetScrollBars(this.ContentElm,ssAuto);
  }

  if(pl.TopIndex>=this.Items.length)
  {
//  pl.LastPage();
    pl.SetPage(pl.PageByIndex(pl.GetLength()));

  }

  if(this.draw_page!=pl.Page) // page changed
  {
    if(this.ContentElm) this.ContentElm.scrollTop=0;
  }

  var to=(pl.Controls.Paging ? pl.Controls.Paging.Elm() : null);
  if((to)&&(to.parentNode))
  {
    var pgheight=ng_OuterHeight(to);
    if(pl.PagingInside)
    {
      to.style.position='relative';
      var bounds = { T:0, B: '' };
      if(ngIExplorer6) bounds.R=2;
      pl.Controls.Paging.SetBounds(bounds);
      pl.Controls.List.SetBounds({B: 0});
      this.draw_paging_height=pgheight;
    }
    else
    {
      to.style.position='absolute';
      pl.Controls.Paging.SetBounds({ T:'', B: 0, R: 0 });
      var pgvisible=pl.IsPagingVisible();
      if((pl.Controls.Paging)&&(pl.Controls.Paging.Visible!=pgvisible))
        pl.Controls.List.paging_needs_update=true;
      pl.Controls.List.SetBounds({B: (pgvisible ? pgheight /*  pl.Controls.Paging.Bounds.H*/ : 0) });
      if(to.parentNode == pl.Elm()) to=null;
      this.draw_paging_height=0;
    }
    if(to)
    {
      this.draw_paging_elm=to.parentNode.removeChild(to);
    }
  }
  else
  {
    this.draw_paging_height=0;
    pl.Controls.List.SetBounds({B: 0});
  }

  this.Loading=false;
  var fit=(pl.DisplayMode==plDisplayFit);
  var ncnt=pl.DisplayedItems;
  if(fit) {
    ncnt=Math.max(this.max_displayed_items,ncnt);
    var aih=ngVal(pl.GetAverageItemHeight(),0);
    if(aih>0) {
      var gcnt = Math.floor((ng_ClientHeight(o)-1)/aih);
      if(gcnt>ncnt) ncnt=gcnt;
    }
    ncnt+=2;
  }
  else ncnt++;
  if(pl.IsAsyncLoadingBlock(pl.TopIndex,ncnt)) { this.Loading=true; return false; }
  if(!this.draw_measure) {
    if(!pl.NeedData(pl.TopIndex,ncnt))
    {
      if(pl.AsyncWaiting()) this.Loading=true;
      return false;
    }

    if(fit) {
      this.measure_loadto=pl.TopIndex+ncnt;
    }
  }
  this.draw_measure=fit;
  return true;
}

function npgl_GetAverageItemHeight()
{
  var ih,mih;
  var list=this.Controls.List;
  if(list) {
    ih=list.ItemHeight;
    mih=list.MinItemHeight;
  }
  if(typeof ih==='undefined') ih=this.AverageItemHeight;
  if((typeof mih!=='undefined')&&(ngVal(ih,0)<mih)) ih=mih;
  return ih;
}

function npgl_getitemsperpage(max)
{
  var ncnt=this.DisplayedItems;
  if(this.DisplayMode==plDisplayFit) {
    var list=this.Controls.List;
    if(list) {
      var maxh=ngVal(list.list_maxheight,0);
      if((maxh>0)||(max)) {
        var aih=ngVal(this.GetAverageItemHeight(),0);
        if(aih>0) {
          if((max)&&(!maxh)) {
            // max possible items wanted, list was not rendered
            // use full height of list (header and paging height are ignored)
            var lo=list.Elm();
            if(lo) maxh=ng_ClientHeight(lo);
          }
          if(maxh>0) ncnt=Math.floor(maxh/aih);
        }
      }
      if((max)&&(list.max_displayed_items)) ncnt=Math.max(list.max_displayed_items, ncnt);
    }
  }
  return ncnt;
}

function npgl_ItemsPerPage()
{
  return this.getitemsperpage();
}

function npgl_DataRequestPerPage()
{
  return this.getitemsperpage(true)+(this.DisplayMode==plDisplayFit ? 2 : 1);
}

function npgl_OnDrawItem(list, ret, html, it, id, level, pcollapsed)
{
  if(list.in_measure) return true;
  var pl=list.Owner/*controls*/.Owner/*pagelist*/;
  if(list.draw_measure)
  {
    list.draw_measure=false;

    var o=list.Elm();
    if(list.HasEmbededContent)
    {
      var del=1;
      if(list.Columns.length>0) { del++; html.append('</table>'); }
      html.append('</div>');
      ng_SetInnerHTML(o,html.toString());
      html.strings.splice(html.strings.length-del,del);
      o=document.getElementById(list.ID+'_CB');
    }
    if(o)
    {
      var maxh = ng_ClientHeight(o)-1;

      var hheight = 0, io;
      var p=ng_GetCurrentStylePx(o,'padding-top'); if(p>0) maxh-=p;
      p=ng_GetCurrentStylePx(o,'padding-bottom'); if(p>0) maxh-=p;

      var changed_height=false;
      if((list.draw_height!=maxh)&&(list.draw_height>0))
      {
        list.max_displayed_items=0;
        changed_height=true;
        list.ListPagingChanged();
      }
      list.draw_height=maxh;

      var scrollbars=false;

      if(list.Columns.length>0) // Measure header
      {
        ng_SetInnerHTML(o,html.toString()+'</table>');
        io=document.getElementById(list.ID+'_TB');
        if(io) hheight=ng_OuterHeight(io);
      }
      maxh -= list.draw_paging_height;
      maxh -= hheight;
      list.list_maxheight=maxh;

      var cnt=0;
      var i,it,items,tmp_html,ih=0,l;
      list.in_measure=true;
      try {
        for(i=pl.TopIndex;i<list.Items.length;i++)
        {
          tmp_html=new ngStringBuilder(html);

          if(!pl.IsDataLoaded(i+1))
          {
            var lfrom=i+1;
            var aih=ngVal(pl.GetAverageItemHeight(),0);
            if((aih<=0)&&(cnt)) aih=(ih/cnt);
            var lcnt=(aih>0 ? Math.floor(maxh/aih) : 0);
            var dcnt=Math.max(this.max_displayed_items, pl.DisplayedItems)-(i-pl.TopIndex);
            if(dcnt>lcnt) lcnt=dcnt;
            if(lcnt<1) lcnt=1;
            lcnt+=2;

            if(pl.IsAsyncLoadingBlock(lfrom,lcnt)) list.Loading=true;
            else {
              if(pl.LoadFullPage) {
                lcnt+=(lfrom-pl.TopIndex);
                lfrom=pl.TopIndex;
              }
              pl.DoLoadData(lfrom,lcnt);
            }
            if(lfrom+lcnt>list.measure_loadto) list.measure_loadto=lfrom+lcnt;
          }

          it=list.Items[i];
          if(typeof it === 'undefined') it=new Object;

          items=it.Items;
          it.Items=undefined;
          l=list.DrawItem(tmp_html, it, i, 0, false);
          it.Items=items;

          if(l.l>0) tmp_html.append('</tbody>');
          if(list.Columns.length>0) tmp_html.append('</table>');
          ng_SetInnerHTML(o,tmp_html.toString());

          io=document.getElementById(list.ID+'_'+i);
          if(io)
          {
            o.style.display='block';
            h=ng_OuterHeight(io);
            o.style.display=(this.Visible ? 'block' : 'none');
          }
          else h=0;

          maxh-=h;
          if(maxh<0) break;

          ih+=h;
          cnt++;
          if((typeof it.Items === 'object')&&(!ngVal(it.Collapsed,false))) scrollbars=true; // have subitems
        }
      } finally {
        delete list.measure_loadto;
        list.in_measure=false;
        ng_SetInnerHTML(o,'');
      }
      if(i<list.Items.length) {
        pl.DisplayedItems=cnt;
        if(pl.DisplayedItems>this.max_displayed_items) this.max_displayed_items=pl.DisplayedItems;
      }
      else
      {
        if((cnt)&&(ih)) {
          var aih=ngVal(pl.GetAverageItemHeight(),0);
          if(aih<=0) aih=(ih/cnt);
          pl.DisplayedItems=cnt+Math.floor(maxh/aih); // guess displayed items
        }
      }
      if(pl.DisplayedItems<=0) pl.DisplayedItems=1;

      if(this.displayed_items!=pl.DisplayedItems) { // number of displayed items changed
        list.paging_needs_update=true;
      }
      if(changed_height)
      {
        var op=pl.Page;
        if(!pl.TopIndex)
        {
          list.page_start_found=true;
          list.page_start[0]=0;
          pl.Page=0;
        }
        else // guess page no
        {
          var ipp=pl.ItemsPerPage();
          if(ipp>0) pl.Page=Math.floor((pl.TopIndex+ipp-1)/ipp);
        }
        if(op!=pl.Page)
        {
          list.paging_needs_update=true;
        }
      }
      if((!pl.TopIndex)||((pl.Page>0)&&(typeof list.page_start[pl.Page] !== 'undefined')))
      {
        var nti = pl.TopIndex+pl.DisplayedItems;
        if((typeof pl.MaxLength === 'undefined') || (nti <= pl.MaxLength)){
          list.page_start[pl.Page+1]=nti;
        }
      }

      if(list.ContentElm) ng_SetScrollBars(list.ContentElm,scrollbars ? ssAuto : ssNone);
    }
  }
  if(!level)
  {
    var pl=list.Owner/*controls*/.Owner/*pagelist*/;
    if(list.draw_length!=list.Items.length) // items changed
    {
      list.paging_needs_update=true;
    }
    if(pl.IsAsyncLoadingBlock(pl.TopIndex,pl.DisplayedItems))
    {
      list.Loading=true;
      list.next_draw_itemidx=list.Items.length;
      return false;
    }

    if(id<pl.TopIndex) list.next_draw_itemidx=pl.TopIndex;
    if(id>=pl.TopIndex+pl.DisplayedItems) list.next_draw_itemidx=list.Items.length;
    return ((id>=pl.TopIndex)&&(id<pl.TopIndex+pl.DisplayedItems));
  }
  return true;
}

function npgl_ShowNoData(v)
{
  if((v)&&(this.OnShowNoData)) {
    this.OnShowNoData(this);
    return;
  }
  if((!v)&&(this.OnHideNoData)) {
    this.OnHideNoData(this);
    return;
  }
  if((typeof this.Controls.NoData === 'object')&&(typeof this.Controls.NoData.SetVisible === 'function')) {
    if((v)&&(typeof this.Controls.NoData.SetText === 'function')) {
      var txt;
      if(this.OnNoDataText) {
        txt=ngVal(this.OnNoDataText(this),'');
      }
      else {
        txt=ngVal(this.NoDataText,'');
        if(txt!='') txt=ngTxt(txt,txt);
      }
      if(txt!='') this.Controls.NoData.SetText(txt);
      else v=false;
    }
    this.Controls.NoData.SetVisible(v);
  }
}

function npgl_ShowLoading(v)
{
  if((v)&&(this.OnShowLoading)) {
    this.OnShowLoading(this);
    return;
  }
  if((!v)&&(this.OnHideLoading)) {
    this.OnHideLoading(this);
    return;
  }
  if((typeof this.Controls.Loading === 'object')&&(typeof this.Controls.Loading.SetVisible === 'function')) this.Controls.Loading.SetVisible(v);
}

function npgl_DoUpdateAfter(o)
{
  if((this.update_cnt>0)||(this.ID=='')) return;

  this.draw_measure=false;
  var pl=this.Owner.Owner;
  if(!pl) return true;

  if(pl.IsAsyncLoadingBlock(pl.TopIndex,pl.DisplayedItems)) this.Loading=true;
  if(pl.loading_displayed!=this.Loading)
  {
    pl.loading_displayed=this.Loading;
    pl.ShowLoading(this.Loading ? true : false);
  }
  if(this.Loading)
  {
    pl.ShowNoData(false);
    if(this.ContentElm) ng_SetInnerHTML(this.ContentElm,'');
  }
  else {
    pl.ShowNoData(pl.IsDynamicData() ? (typeof pl.MaxLength!=='undefined')&&(pl.MaxLength<=0) : (!this.Items.length));
  }

  if(this.draw_paging_elm)
  {
    if(pl.PagingInside)
    {
      if(this.ContentElm) this.ContentElm.appendChild(this.draw_paging_elm);
    }
    else
    {
      var io=pl.Elm();
      if(io) io.appendChild(this.draw_paging_elm);
    }
    this.draw_paging_elm=null;
  }
  if((pl.PagingInside)&&(pl.Controls.Paging)) pl.Controls.Paging.SetVisible(!this.Loading && pl.IsPagingVisible());
  if(this.paging_needs_update)
  {
    this.paging_needs_update=false;
    pl.UpdatePaging();
  }

  this.draw_page=pl.Page;
  this.draw_length=this.Items.length;
  this.displayed_items=pl.DisplayedItems;
  this.display_mode=pl.DisplayMode;
  delete this.draw_paging_height;

  if((this.init_page>0)&&((pl.DisplayMode==plDisplayFixed)||(!this.Loading)))
  {
    var p=this.init_page;
    this.init_page=0;
    pl.SetPage(p);
  }
  if((pl.AutoSelectFirstItem)&&(!pl.firstitemselected)&&(this.SelCount==0)&&(pl.IsDataLoaded(0)))
  {
    pl.firstitemselected=true;
    this.SelectItem(this.Items[0]);
  }

  return true;
}

function npgl_OnExpanding(l,it)
{
  var pl=this.Owner.Owner;
  if(this.ContentElm) ng_SetScrollBars(this.ContentElm,ssAuto);
  var to=(ngIExplorerVersion==7 && pl && pl.Controls.Paging ? pl.Controls.Paging.Elm() : null);
  if(to) // IE7 fix
  {
    to.style.display='none';
    to.style.display='block';
  }
  return true;
}

function npgl_SetPage(p)
{
  p=parseInt(p,10);
  if((isNaN(p))||((p<0)&&(p!=plFirstPage)&&(p!=plLastPage))) return;
  if((p!=this.Page)||(this.TopIndex===999999999))
  {
    if((p===plFirstPage)&&(this.TopIndex===0)) return;
    if(this.TopIndex===999999999) this.TopIndex=0;
    var needupdate=false;
    var list=this.Controls.List;
    if((this.OnPageChanging)&&(!ngVal(this.OnPageChanging(this,p),false))) return;

    var op=this.Page;
    var pti=this.TopIndex;

    if(p==plFirstPage)
    {
      this.TopIndex=0;
      list.page_start[0]=0;
      p=0;
    }
    else
      switch(p-op)
      {
        case 1: // next page
          var ti=list.page_start[p];
          var oti=list.page_start[op];
          if((list.page_start_found)&&(typeof ti!=='undefined')&&(typeof oti!=='undefined')) { this.TopIndex=ti; list.page_start_found=true; }
          else
          {
            list.page_start_found=false;
            this.TopIndex+=this.DisplayedItems;
            if(oti != 'undefined') list.page_start[p]=this.TopIndex;
          }
          break;
        case -1: // prev page
          var ti=list.page_start[p];
          var oti=list.page_start[op];
          if((list.page_start_found)&&(typeof ti!=='undefined')&&(typeof oti!=='undefined')) { this.TopIndex=ti; list.page_start_found=true; }
          else
          {
            list.page_start_found=false;
            this.TopIndex-=this.ItemsPerPage();
          }
          if(this.TopIndex<0) this.TopIndex=0;
          break;
        default: // any page
          var len=this.GetLength();
          if((p==plLastPage)&&((!this.IsDynamicData())||(typeof this.MaxLength!=='undefined')))
          {
            p=this.PageByIndex(len);
          }
          for(var q=0;q<2;q++)
          {
            if(p!=plLastPage)
            {
              var ti=list.page_start[p];
              if(typeof ti!=='undefined') { this.TopIndex=ti; list.page_start_found=true; }
              else
              {
                var i=0,s=0;
                if(this.DisplayMode!=plDisplayFixed)
                {
                  var sp=-1;
                  for(i in list.page_start)
                  {
                    if((i>sp)&&(i<=p)&&(typeof list.page_start[i] !== 'undefined')) sp=i;
                  }
                  if(sp>=0)
                  {
                    s=list.page_start[sp];
                    i=sp;
                  }
                  else i=0;
/*                  for(i=p-1;i>0;i--)
                  {
                    if(typeof list.page_start[i] !== 'undefined')
                    {
                      s=list.page_start[i];
                      break;
                    }
                  }*/
                }
                var ap=(p-i);

                this.TopIndex=s;
                if(ap>0){this.TopIndex += ap*this.ItemsPerPage();}
                list.page_start_found=false;
              }
            }
            else this.TopIndex=999999999; // dynamic data, determine items count
            if((p==plLastPage)||((this.TopIndex>0)&&(this.TopIndex>=list.Items.length)))
            {
              if(!this.AsyncWaiting()) this.async_datapage=(p==plLastPage ? op : p);
            }
            this.NeedData(this.TopIndex,Math.max(list.max_displayed_items, this.DisplayedItems)+((this.DisplayMode==plDisplayFit) ? 2 : 1));
            if(!this.AsyncWaiting()) delete this.async_datapage;
            if(p==plLastPage) {
              pti=999999999;
              needupdate=true;
              p=this.PageByIndex(len);
              break;
            }
            if((this.TopIndex>0)&&(this.TopIndex>=len))
              p=this.PageByIndex(len);
            else break;
          }
          break;
      }
    if(this.TopIndex>=list.Items.length) { this.TopIndex=pti; p=op; }
    if(p<0) p=0;
    if(!this.TopIndex) { list.page_start[0]=0; list.page_start_found=true; }
    else if((!p)&&(this.TopIndex>0)) p=1;

    this.Page=p;
    this.UpdatePaging();

    if((pti!=this.TopIndex)||(needupdate)) list.Update();
    if(this.OnPageChanged) this.OnPageChanged(this,op);
  }
}

function npgl_SetPagingType(pt, update)
{
  if(typeof pt!=='undefined')
  {
    if(pt==this.PagingType) return;
    this.PagingType=pt;
  }
  else pt=this.PagingType;

  if(pt==plPagingUser) return;
  var c;
  var changed=false, update_paging=false;
  var first=((pt & plPaging_First)!=0);
  var prev=((pt & plPaging_Prev)!=0);
  var pageno=((pt & plPaging_PageNo)!=0);
  var pages=((pt & plPaging_Pages)!=0);
  var next=((pt & plPaging_Next)!=0);
  var last=((pt & plPaging_Last)!=0);
  var hidedisabled=((pt & plPaging_HideDisabled)!=0);

  c=this.Controls.FirstPage; if((c)&&(c.InitVisible!=first)) { c.InitVisible=first; changed=true; }
  c=this.Controls.PrevPage;  if((c)&&(c.InitVisible!=prev)) { c.InitVisible=prev; changed=true; }
  c=this.Controls.NextPage;  if((c)&&(c.InitVisible!=next)) { c.InitVisible=next; changed=true; }
  c=this.Controls.LastPage;  if((c)&&(c.InitVisible!=last)) { c.InitVisible=last; changed=true; }
  c=this.Controls.PageNo;    if((c)&&(c.InitVisible!=pageno)) { c.InitVisible=pageno; changed=true; update_paging=true; }
  if(this.PagesVisible != pages) { this.PagesVisible = pages; update_paging=true; changed=true; }

  if(this.PagingHideDisabled!=hidedisabled) { this.PagingHideDisabled=hidedisabled; changed=true; }
  if((changed)&&(ngVal(update,true)))
  {
    if((update_paging)&&(this.Controls.List)) this.Controls.List.paging_needs_update=true;
    this.Update();
  }
}

function npgl_IsPagingVisible()
{
  var v=false;
  if((!this.Controls.List)||((this.Controls.List.Loading)&&(this.PagingInside))) return v;
  switch(this.DisplayPaging)
  {
    case plDisplayPagingAlways: v=true; break;
    case plDisplayPagingNotEmpty: v=(this.Controls.List)&&(this.GetLength()>0); break;
    case plDisplayPagingMorePages: v=(this.Controls.List)&&((this.Page>0)||(this.IsNextPageAvailable())); break;
  }
  return v;
}

function npgl_IsPrevPageAvailable()
{
  return (this.TopIndex>0);
}

function npgl_IsNextPageAvailable()
{
  if((this.IsDynamicData())&&(typeof this.MaxLength === 'undefined')) return true;
  return (this.TopIndex+this.DisplayedItems<this.GetLength());
}

function npgl_UpdatePaging()
{
  var s;
  var pginfo = {
    PageNo: ''+(this.Page+1),
    PrevPage:  this.IsPrevPageAvailable(),
    NextPage:  this.IsNextPageAvailable(),
    PagingVisible: this.IsPagingVisible(),
    PagingTo: this.Page+ngVal(this.PagingLookout,Math.floor((this.PagingSize-1)/2)),
    Update: false
  };
  pginfo.FirstPage=pginfo.PrevPage;
  pginfo.LastPage=pginfo.NextPage;
  if(this.PagingInside) pginfo.Update=true;

  var ms=ngVal(this.PagingMinSize,0);
  if((ms)&&(pginfo.PagingTo<ms)) pginfo.PagingTo=ms-1;
  if(pginfo.PagingTo<0) pginfo.PagingTo=0;

  if((!this.IsDynamicData())||(typeof this.MaxLength !== 'undefined'))
  {
    var numitems=this.GetLength();
    var ipp=this.ItemsPerPage();
    while(pginfo.PagingTo>this.Page) // remove pages over last page
    {
      s=this.Controls.List.page_start[pginfo.PagingTo];
      if(typeof s==='undefined') {
        s=this.TopIndex+(pginfo.PagingTo-this.Page)*ipp;
      }
      if(s<numitems) break;
      pginfo.PagingTo--;
    }
  }
  pginfo.PagingFrom=pginfo.PagingTo-this.PagingSize;

  if((this.OnPagingUpdating)&&(!ngVal(this.OnPagingUpdating(this,pginfo),false))) return;

  if(this.Controls.Paging)
  {
    var v=pginfo.PagingVisible;
    if(v!=this.Controls.Paging.Visible)
    {
      this.Controls.Paging.SetVisible(v);
      if(!this.PagingInside) this.Controls.List.SetBounds({B: (v ? (typeof this.draw_paging_height !== 'undefined' ? this.draw_paging_height : ng_OuterHeight(this.Controls.Paging.Elm())) /*this.Controls.Paging.Bounds.H*/ : 0) });
    }
  }

  var e,c,v;
  // update FirstPage
  c=this.Controls.FirstPage;
  if(c)
  {
    e=pginfo.FirstPage;
    c.SetEnabled(this.Enabled && e);
    if(this.PagingType!=plPagingUser)
    {
      v=(c.InitVisible && (e || (!this.PagingHideDisabled)));
      if(c.Visible!=v) pginfo.Update=true;
      c.SetVisible(v);
    }
  }
  // update PrevPage
  c=this.Controls.PrevPage;
  if(c)
  {
    e=pginfo.PrevPage;
    c.SetEnabled(this.Enabled && e);
    if(this.PagingType!=plPagingUser)
    {
      v=(c.InitVisible && (e || (!this.PagingHideDisabled)));
      if(c.Visible!=v) pginfo.Update=true;
      c.SetVisible(v);
    }
  }
  // update NextPage
  c=this.Controls.NextPage;
  if(c)
  {
    e=pginfo.NextPage;
    c.SetEnabled(this.Enabled && e);
    if(this.PagingType!=plPagingUser)
    {
      v=(c.InitVisible && (e || (!this.PagingHideDisabled)));
      if(c.Visible!=v) pginfo.Update=true;
      c.SetVisible(v);
    }
  }
  // update LastPage
  c=this.Controls.LastPage;
  if(c)
  {
    e=pginfo.LastPage;
    c.SetEnabled(this.Enabled && e);
    if(this.PagingType!=plPagingUser)
    {
      v=(c.InitVisible && (e || (!this.PagingHideDisabled)));
      if(c.Visible!=v) pginfo.Update=true;
      c.SetVisible(v);
    }
  }
  // update PageNo
  c=this.Controls.PageNo;
  if(c)
  {
    if(this.PagingType!=plPagingUser) c.SetVisible(c.InitVisible);
    if(c.Text!=pginfo.PageNo) { c.Text=pginfo.PageNo; if(c.Visible) pginfo.Update=true; }
  }

  // update paging
  var checked,pg=pginfo.PagingTo;
  if(pginfo.PagingFrom<0) pginfo.PagingFrom=0;
  for(var i=this.PagingSize-1;i>=0;i--)
  {
    c=this.Controls['Page'+i];
    if((!c)||(typeof c==='undefined')) continue;
    txt=''+(pg+1);
    if(c.Text!=txt) { c.Text=txt; pginfo.Update=true; }
    c.Page=pg;
    checked=((pg==this.Page) ? 1 : 0);
    v=(this.PagesVisible && (pg>=pginfo.PagingFrom));
    if(c.Checked!=checked) { c.Checked=checked; if(v) pginfo.Update=true; }
    c.SetVisible(v);
    pg--;
  }
  if((this.OnPagingUpdated)&&(!ngVal(this.OnPagingUpdated(this,pginfo),false))) return;

  if((pginfo.Update)&&(this.Controls.Paging)) { this.Controls.Paging.Update(); return true; }
  return false;
}

function npgl_FirstPage()
{
  this.SetPage(plFirstPage);
}

function npgl_NextPage()
{
  this.SetPage(this.Page+1);
}

function npgl_PrevPage()
{
  this.SetPage(this.Page-1);
}

function npgl_LastPage()
{
  this.SetPage(plLastPage);
}

function npgl_PageByIndex(idx)
{
  var d,pgstart=0,pg=0;
  var list=this.Controls.List;
  if(!list) return 0;
  if(idx<0) idx=0;
  var len=this.GetLength();
  if(idx>=len) idx=len-1;
  if(this.DisplayMode!=plDisplayFixed)
  {
    var d,mind=100000;
    for(var i in list.page_start)
    {
      s=list.page_start[i];
      if(typeof s!=='undefined')
      {
        d=Math.abs(s-idx);
        if(d<mind) { mind=d; pg=parseInt(i,10); pgstart=parseInt(s,10); }
      }
    }
  }
  var ni=(idx-pgstart);
  if(ni>0) {
    var ipp=this.ItemsPerPage();
    if(ipp>0)
    {
      d=Math.floor(ni/ipp);
      pg+=d;
    }
  }
  return pg;
}

function npgl_OnKeyDown(e)
{
  switch(e.keyCode)
  {
    case 33:
    {
      var pl=e.Owner.Owner.Owner;
      if((pl)&&(pl.KeyEvents)) pl.PrevPage();
      return false;
    }
    case 34:
    {
      var pl=e.Owner.Owner.Owner;
      if((pl)&&(pl.KeyEvents)) pl.NextPage();
      return false;
    }
  }
  return true;
}

function npgl_PageButtonClick(e)
{
  var pg=e.Owner.Page;
  if(typeof pg !== 'undefined') e.Owner/*button*/.Owner/*controls*/.Owner/*pagelist*/.SetPage(pg);
}

function npgl_NeedData(idx,cnt)
{
  var list=this.Controls.List;
  if((!list)||(cnt<=0)) return true;

  if(idx>=list.Items.length)
  {
    if(this.LoadFullPage) {
      if(idx>this.TopIndex) {
        cnt+=idx-this.TopIndex;
        idx=this.TopIndex;
      }
    }
    return this.DoLoadData(idx,cnt);
  }
  var lfrom,lcnt;
  for(var i=0;(i<cnt)&&(idx+i<=list.Items.length);i++)
  {
    if(!this.IsDataLoaded(idx+i))
    {
      lfrom=idx+i;
      lcnt=cnt-i;
      if(this.LoadFullPage) {
        if(lfrom>this.TopIndex) {
          lcnt+=lfrom-this.TopIndex;
          lfrom=this.TopIndex;
        }
      }
      if(!this.DoLoadData(lfrom,lcnt)) return false;
      if(this.AsyncData) break;
    }
  }
  return true;
}

function npgl_IsDynamicData()
{
  return ((this.OnLoadData)||(this.AsyncDataURL!=''))&&((!this.InDesignMode)||(this.DesignLive));
}

function npgl_IsDataLoaded(idx)
{
  if(!this.IsDynamicData()) return true;

  var list=this.Controls.List;
  if(!list) return true;

  if(this.OnIsDataLoaded) return this.OnIsDataLoaded(this,list,idx);

  if(idx<0) return true;
  if(idx>=list.Items.length) return false;

  // if caching is disabled or loading of full pages is enabled, anything outside current view is not loaded (up-to-date)
  if(((!this.CacheData)||(this.LoadFullPage))
    &&((idx<this.TopIndex)
     ||(idx>=(typeof list.measure_loadto!=='undefined' ? list.measure_loadto :
             (this.DisplayMode==plDisplayFit ? 0 :
              this.TopIndex+this.DisplayedItems))))) return false;

  var it=list.Items[idx];
  if(typeof it==='undefined') return false;
  for(var i in it) // if any property exists data loaded
  {
    return true;
  }
  return false;
}

function npgl_InvalidateData(idx, cnt)
{
  var list=this.Controls.List;
  if(!list) return;

  if(typeof idx === 'undefined')
  {
    idx=0;
    cnt=list.Items.length;
  }
  if(typeof cnt==='undefined') return;

  if(this.IsDynamicData())
  {
    if((!this.OnInvalidateData)||(ngVal(this.OnInvalidateData(this,idx,cnt),false)))
    {
      if(idx<list.Items.length)
        for(var i=0;(i<cnt)&&(idx+i<=list.Items.length);i++)
        {
          list.do_remove(list.Items[idx+i],list);
          delete list.Items[idx+i];
        }
    }

    if(!this.IsAsyncLoadingBlock(idx, cnt))
    {
      var to=idx+cnt;
      if(!this.AsyncWaiting())
      {
        var lato=this.last_asyncdata_index+this.last_asyncdata_count;
        if(!((idx<this.last_asyncdata_index)&&(to<this.last_asyncdata_index))||((idx>=lato)&&(to>=lato)))
        {
          this.last_asyncdata_index=-1;
          this.last_asyncdata_count=0;
        }
      }
    }
  }
  var ato=this.TopIndex+this.DisplayedItems;
  if(!((idx<this.TopIndex)&&(to<this.TopIndex))||((idx>=ato)&&(to>=ato))) list.Update();
}



function npgl_AsyncTimeout(lid)
{
  var l=ngGetControlById(lid, 'ngPanel');
  if(l)
  {
    if(l.async_datatimeout_timer) clearTimeout(l.async_datatimeout_timer);
    l.async_datatimeout_timer=null;
    if(l.AsyncWaiting())
    {
      l.DoLoadData(l.async_dataindex,l.async_datacount,true); // retry load
      if(l.async_datatimeout_retry<0) // no more attempts, set empty data
        l.SetAsyncData(l.async_dataindex, new Array());
    }
  }
}

function npgl_Refresh()
{
  var undefined;
  this.MaxLength = undefined;
  this.InvalidateData(this.TopIndex,this.DisplayedItems);
}

function npgl_GetRPC()
{
  if(!this.IsDynamicData()) return null;
  if(!this.async_rpc)
  {
    this.async_rpc=new ngRPC(this.ID);
    this.async_rpc.nocache=true;
  }
  return this.async_rpc;
}

function npgl_DoLoadData(idx,cnt,retry)
{
  if(!this.IsDynamicData()) return true;

  var list=this.Controls.List;
  if(!list)
  {
    this.async_datatimeout_retry=-1;
    return false;
  }

  if(typeof this.MaxLength !== 'undefined')
  {
    if(idx>this.MaxLength) cnt=0;
    else if(idx+cnt>this.MaxLength) cnt=this.MaxLength-idx;
  }

  if((typeof cnt === 'undefined')||(cnt<1))
  {
    this.async_datatimeout_retry=-1;
    return true;
  }

  if((typeof this.MinDataBatch!=='undefined')&&(cnt<this.MinDataBatch)) {
    cnt=this.MinDataBatch;
  }

  var lato=this.last_asyncdata_index+this.last_asyncdata_count;
  var ato=idx+cnt;
  if((idx>=this.last_asyncdata_index)&&(idx<lato)&&(ato>=this.last_asyncdata_index)&&(ato<=lato))
  {
    this.async_datatimeout_retry=-1;
    return true; // data was already loaded during last load data
  }

  if((this.async_dataindex==idx)&&(this.async_datacount==cnt)&&(ngVal(retry,false)))
  {
    this.async_datatimeout_retry--;
    if(this.async_datatimeout_retry<0) // no more retry, data loading failed
    {
      this.async_datatimeout_retry=-1;
      return true;
    }
    this.async_dataindex = undefined;
    this.async_datacount = undefined;
  }
  else if(!this.AsyncWaiting()) this.async_datatimeout_retry=this.AsyncDataRetryCnt;

  if(this.AsyncData)
  {
    if(this.AsyncWaiting()) return false;

    this.async_dataindex = idx;
    this.async_datacount = cnt;

    // Set timeout timer
    if(this.async_datatimeout_timer) clearTimeout(this.async_datatimeout_timer);
    this.async_datatimeout_timer=null;
    if((this.AsyncDataTimeout>0)&&(this.async_datatimeout_retry>=0))
      this.async_datatimeout_timer=setTimeout("npgl_AsyncTimeout('"+this.ID+"');",this.AsyncDataTimeout*1000);
  }

  var data;
  if(this.OnLoadData) data=this.OnLoadData(this,list,idx,cnt);
  else
  {
    var rpc=this.GetRPC();
    if(rpc){
      var url=this.AsyncDataURL;
      url=ng_AddURLParam(url,'id='+ng_URLEncode(this.ID)+'&i='+idx+'&c='+cnt);
      if((typeof ngApp==='object')&&(ngApp)) url=ng_AddURLParam(url,'lang='+ngApp.Lang);
      if(this.OnAsyncURLRequest) url=this.OnAsyncURLRequest(this,url,idx,cnt);
      if(url!='') rpc.sendRequest(url);
    }
  }
  if((typeof data==='object')&&(data))
  {
    this.async_dataindex = undefined;
    this.async_datacount = undefined;

    if(this.async_datatimeout_timer) clearTimeout(this.async_datatimeout_timer);
    this.async_datatimeout_timer=null;

    var j;
    if((data.length>=0)&&(data.length<cnt)) // trim length if not enough data
    {
      this.SetLength(idx+data.length);
    }
    for(var i=0;i<data.length;i++)
    {
      j=i+idx;
      if(j>=list.Items.length)
      {
        list.Items.length=j;
        if((typeof this.MaxLength!=='undefined')&&(this.MaxLength<j)) this.SetLength(j);
      }
      if(typeof data[i] !== 'undefined')  list.Replace(j,(typeof data[i]==='string' ? {Text: data[i]} : ng_CopyVar(data[i])));
    }
  }
  return true;
}

function npgl_AsyncWaiting()
{
  return (ngVal(this.async_dataindex,-1)>=0);
}

function npglSetAsyncDataCallback(lid, idx, data, length)
{
  var l=ngGetControlById(lid, 'ngPanel');
  if(!l) return false;
  if((typeof length!=='undefined')&&(length!==null)) l.SetLength(length);
  l.SetAsyncData(idx,data);
  return true;
}

function npgl_SetAsyncData(idx, data)
{
  if(!this.AsyncWaiting()) return;
  var list=this.Controls.List;
  if(!list) return;

  var changed=false;
  idx=ngVal(idx,this.async_dataindex);
  if((this.OnSetAsyncData)&&(!ngVal(this.OnSetAsyncData(this, idx, data),false))) return;
  if((typeof data==='object')&&(data)&&(idx!=999999999)) // data available and not length detection
  {
    var j;
    var asynclast=this.async_dataindex+this.async_datacount;
    list.BeginUpdate();
    try {
      if((idx==this.async_dataindex)&&(data.length>=0)&&(data.length<this.async_datacount)) // loading current block, trim length if not enough data
      {
        this.SetLength(idx+data.length);
        changed=true;
      }
      for(var i=0;i<data.length;i++)
      {
        j=i+idx;
        if(j>=list.Items.length)
        {
          list.Items.length=j;
          if((typeof this.MaxLength!=='undefined')&&(this.MaxLength<j)) this.SetLength(j);
        }
        if(typeof data[i] !== 'undefined')
        {
          list.Replace(j,(typeof data[i]==='string' ? {Text: data[i]} : ng_CopyVar(data[i])));
          if((j>=this.async_dataindex)&&(j<asynclast)) changed=true;
        }
      }
    }
    finally {
      if(changed) list.need_update=false;
      list.EndUpdate();
    }
  }
  idx=this.async_dataindex;
  var cnt=this.async_datacount;

  // check if all required data are filled
  if(!changed)
    for(var i=0;(i<cnt)&&(idx+i<list.Items.length);i++)
    {
      if(!this.IsDataLoaded(idx+i)) return;
    }

  idx=this.async_dataindex;
  if((this.IsAsyncLoadingBlock(this.TopIndex,this.DisplayedItems))||(this.List.Loading)) changed=true;

  this.last_asyncdata_index=this.async_dataindex;
  this.last_asyncdata_count=this.async_datacount;

  // Clear timeout timer
  if(this.async_datatimeout_timer) clearTimeout(this.async_datatimeout_timer);
  this.async_datatimeout_timer=null;

  this.async_dataindex=undefined;
  this.async_datacount=undefined;
  if(typeof this.async_datapage!=='undefined') // request was beyond length
  {
    var p=this.async_datapage;
    var len=this.GetLength();
    if(idx>=len) p=this.PageByIndex(len);
    delete this.async_datapage;
    if(this.Page!=p)
    {
      this.SetPage(p);
      return;
    }
  }
  if((typeof data!=='object')||(changed)) list.Update();
}

function npgl_SetLength(l)
{
  if(this.OnSetLength) l=this.OnSetLength(this,l);
  var list=this.Controls.List;
  if(list) list.paging_needs_update=true;

  if(!this.IsDynamicData()) // not dynamic data, adjust list length
  {
    if(typeof l === 'undefined') return;
    if(list) list.Items.length=l;
  }
  else
  {
    this.MaxLength=l;
    if(typeof l === 'undefined') return;
    if((list)&&(l<list.Items.length)) list.Items.length=l;
  }
}

function npgl_GetLength()
{
  if((this.IsDynamicData())&&(typeof this.MaxLength !== 'undefined')) return this.MaxLength;
  var list=this.Controls.List;
  return (list ? list.Items.length : 0);
}

function npgl_IsAsyncLoadingBlock(idx, cnt)
{
  if(!this.AsyncWaiting()) return false;
  var to=idx+cnt;
  var ato=this.async_dataindex+this.async_datacount;
  return (!((idx<this.async_dataindex)&&(to<this.async_dataindex))||((idx>=ato)&&(to>=ato)));
}

function npgl_IndexOf(it, parent)
{
  var pl=this.Owner.Owner;
  if(pl)
  {
    var list=parent;
    if((!list)||(list==this))
    {
      for(var i=pl.TopIndex;(i<pl.TopIndex+pl.DisplayedItems)&&(i<this.Items.length);i++)
        if(this.Items[i]==it) return i;
    }
  }
  return this.IndexOf.callParent(it,parent);
}

function npgl_Reset(doclear)
{
  var list=this.Controls.List;
  if(list) list.BeginUpdate();
  try {
    delete this.firstitemselected;
    this.MaxLength = undefined;
    this.async_dataindex = undefined;
    this.async_datacount = undefined;
    this.last_asyncdata_index=-1;
    this.last_asyncdata_count=0;

    if(list) list.ClearSelected();
    this.FirstPage();
    this.InvalidateData();
  }
  finally {
    if(list)
    {
      list.max_displayed_items=0;
      if(ngVal(doclear,false)) list.Clear();
      list.EndUpdate();
    }
  }
}

function npgl_GetPageTopItems()
{
  var items=new Array();
  var list=this.Controls.List;
  for(var i=this.TopIndex;(i<this.TopIndex+this.DisplayedItems)&&(i<list.Items.length);i++)
  {
    if(i<0) continue;
    items[items.length]=list.Items[i];
  }
  return items;
}

function npgl_ScanPageItems(fnc, recursive, userdata)
{
  if(typeof fnc !== 'function') return false;
  var list=this.Controls.List;
  for(var i=this.TopIndex;(i<this.TopIndex+this.DisplayedItems)&&(i<list.Items.length);i++)
  {
    if(i<0) continue;

    if(!fnc(this, list.Items[i], list, userdata)) return false;
    if((ngVal(recursive,true))&&(!list.Scan(fnc, list.Items[i], userdata))) return false;
  }
  return true;
}


function npgl_ScanVisiblePageItems(fnc, recursive, userdata)
{
  if(typeof fnc !== 'function') return false;
  var list=this.Controls.List;
  for(var i=this.TopIndex;(i<this.TopIndex+this.DisplayedItems)&&(i<list.Items.length);i++)
  {
    if(i<0) continue;

    var pi=list.Items[i];
    if(typeof pi === 'undefined') continue;
    if(!ngVal(pi.Visible,true)) continue;
    if(!fnc(this, pi, list, userdata)) return false;

    if((ngVal(pi.Collapsed,false))||(typeof pi.Items === 'undefined')||(!pi.Items.length)) continue;
    if((ngVal(recursive,true))&&(!list.ScanVisible(fnc, pi, userdata))) return false;
  }
  return true;
}

/**
 *  Class: ngPageList
 *  This class implements <ngPageList> control (based on component <ngFrame>)
 */
function Create_ngPageList(def, ref, parent)
{
  var undefined;
  ng_MergeDef(def, {
    Data: {
      PagingSize: 5
    },
    Controls : {
      List: {
        Type: 'ngList',
        style: { border: '0px' },
        L: 0, T: 0, R: 0, B: 24
      },
      Paging: {
        Type: 'ngToolBar',
        L:0, B: 0, R: 0, H: 24,
        Data: {
          Visible: false
        },
        Controls: {
          FirstPage: {
            Type: 'ngButton',
            Data: {
              Text: '|<'
            },
            Events: {
              OnClick: function(e) { e.Owner/*button*/.Owner/*controls*/.Owner/*pagelist*/.FirstPage(); }
            }
          },
          PrevPage: {
            Type: 'ngButton',
            Data: {
              Text: '<'
            },
            Events: {
              OnClick: function(e) { e.Owner/*button*/.Owner/*controls*/.Owner/*pagelist*/.PrevPage(); }
            }
          },
          PageNo: {
            Type: 'ngEdit',
            W: 30,
            Data: {
              Text: '1',
              TextAlign: 'center'
            },
            Events: {
              OnKeyDown: function(e) { if(e.keyCode==13) { e.Owner/*button*/.Owner/*controls*/.Owner/*pagelist*/.SetPage(parseInt(e.Owner.GetText())-1,10); return false; } return true; }
            }
          },
          Page0: {
            Type: 'ngButton',
            Data: {
              Text: '1',
              TextAlign: 'center'
            },
            Events: {
              OnClick: npgl_PageButtonClick
            }
          },
          NextPage: {
            Type: 'ngButton',
            Data: {
              Text: '>'
            },
            Events: {
              OnClick: function(e) { e.Owner/*button*/.Owner/*controls*/.Owner/*pagelist*/.NextPage(); }
            }
          },
          LastPage: {
            Type: 'ngButton',
            Data: {
              Text: '>|'
            },
            Events: {
              OnClick: function(e) { e.Owner/*button*/.Owner/*controls*/.Owner/*pagelist*/.LastPage(); }
            }
          }
        }
      }
    }
  });

  // Create paging
  var pgsize=ngVal(def.Data.PagingSize,5);
  if(pgsize<0) pgsize=1;

  for(var i=1;i<pgsize;i++)
  {
    if((typeof def.Controls.Paging!=='object')||(!def.Controls.Paging)) continue;
    var bdef=new Object;
    bdef['Page'+i]=def.Controls.Paging.Controls.Page0;
    ng_MergeDef(def.Controls.Paging.Controls, bdef);
  }

  var c=ngCreateControlAsType(def, 'ngFrame', ref, parent);
  if(!c) return c;
  /*
   *  Group: Properties
   */
  /*  Variable: DisplayMode
   *  ...
   *  Type: int
   *  Default value: *plDisplayFit*
   */
  c.DisplayMode = plDisplayFit;

  /*  Variable: PagingType
   *  ...
   *  Type: int
   *  Default value: *plPagingSimple*
   */
  c.PagingType = plPagingSimple;
  /*  Variable: PagingSize
   *  ...
   *  Type: int
   *  Default value: *5*
   */
  c.PagingSize=pgsize;

  /*  Variable: PagingMinSize
   *  ...
   *  Type: int
   */
  c.PagingMinSize=undefined;

  /*  Variable: PagingLookout
   *  ...
   *  Type: int
   */
  c.PagingLookout = undefined;

  /*  Variable: PagingInside
   *  ...
   *  Type: bool
   *  Default value: *true*
   */
  c.PagingInside = true;

  /*  Variable: PagingHideDisabled
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  c.PagingHideDisabled = false;
  /*  Variable: DisplayPaging
   *  ...
   *  Type: int
   *  Default value: *plDisplayPagingMorePages*
   */
  c.DisplayPaging=plDisplayPagingMorePages;

  /*  Variable: KeyEvents
   *  ...
   *  Type: bool
   *  Default value: *true*
   */
  c.KeyEvents=true;

  /*  Variable: AutoSelectFirstItem
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  c.AutoSelectFirstItem=false;

  /*  Variable: Page
   *  ...
   *  Type: int
   *  Default value: *0*
   */
  c.Page=0;

  /*  Variable: TopIndex
   *  ...
   *  Type: int
   *  Default value: *0*
   */
  c.TopIndex=0;
  /*  Variable: DisplayedItems
   *  ...
   *  Type: int
   *  Default value: *10*
   */
  c.DisplayedItems=10;

  /*  Variable: AverageItemHeight
   *  ...
   *  Type: int
   *  Default value: *undefined*
   */
  c.AverageItemHeight = undefined;

  /*  Variable: MaxLength
   *  ...
   *  Type: int
   *  Default value: *undefined*
   */
  c.MaxLength=undefined;

  /*  Variable: CacheData
   *  ...
   *  Type: bool
   *  Default value: *true*
   */
  c.CacheData = true;
  /*  Variable: LoadFullPage
   *  ...
   *  Type: bool
   *  Default value: *false*
   */
  c.LoadFullPage = false;

  /*  Variable: MinDataBatch
   *  ...
   *  Type: int
   *  Default value: *undefined*
   */
  c.MinDataBatch=undefined;

  /*  Variable: AsyncData
   *  ...
   *  Type: bool
   *  Default value: *true*
   */
  c.AsyncData = true;
  /*  Variable: AsyncDataTimeout
   *  ...
   *  Type: int
   *  Default value: *30*
   */
  c.AsyncDataTimeout = 30;
  /*  Variable: AsyncDataRetryCnt
   *  ...
   *  Type: int
   *  Default value: *3*
   */
  c.AsyncDataRetryCnt = 3;

  /*  Variable: AsyncDataURL
   *  ...
   *  Type: string
   *  Default value: *''*
   */
  c.AsyncDataURL = '';

  /*  Variable: NoDataText
   *  ...
   *  Type: string
   *  Default value: *''*
   */
  c.NoDataText = '';

  /*
   *  Group: Methods
   */
  /*  Function: SetPage
   *  Sets current page.
   *
   *  Syntax:
   *    void *SetPage* (int page)
   *
   *  Returns:
   *    -
   *
   *  Constants:
   *    plFirstPage - first page
   *    plLastPage  - last page
   */
  c.SetPage = npgl_SetPage;

  /*  Function: NextPage
   *  Switches to next page.
   *
   *  Syntax:
   *    void *NextPage* ()
   *
   *  Returns:
   *    -
   */
  c.NextPage = npgl_NextPage;
  /*  Function: PrevPage
   *  Switches to previous page.
   *
   *  Syntax:
   *    void *PrevPage* ()
   *
   *  Returns:
   *    -
   */
  c.PrevPage = npgl_PrevPage;
  /*  Function: FirstPage
   *  Switches to first page.
   *
   *  Syntax:
   *    void *FirstPage* ()
   *
   *  Returns:
   *    -
   */
  c.FirstPage = npgl_FirstPage;
  /*  Function: LastPage
   *  Switches to last page.
   *
   *  Syntax:
   *    void *LastPage* ()
   *
   *  Returns:
   *    -
   */
  c.LastPage = npgl_LastPage;


  /*  Function: IsPrevPageAvailable
   *  Checks if previous page is available.
   *
   *  Syntax:
   *    bool *IsPrevPageAvailable* ()
   *
   *  Returns:
   *    TRUE if previous page is available.
   */
  c.IsPrevPageAvailable = npgl_IsPrevPageAvailable;
  /*  Function: IsNextPageAvailable
   *  Checks if next page is available.
   *
   *  Syntax:
   *    bool *IsNextPageAvailable* ()
   *
   *  Returns:
   *    TRUE if next page is available.
   */
  c.IsNextPageAvailable = npgl_IsNextPageAvailable;

  /*  Function: PageByIndex
   *  Returns page number by given item index.
   *
   *  Syntax:
   *    int *PageByIndex* (int index)
   *
   *  Returns:
   *    Page number.
   */
  c.PageByIndex = npgl_PageByIndex;

  /*  Function: SetPagingType
   *  Sets visible paging elements.
   *
   *  Syntax:
   *    void *SetPagingType* (int pagingtype [, bool update=true])
   *
   *  Returns:
   *    -
   */
  c.SetPagingType = npgl_SetPagingType;

  /*  Function: ItemsPerPage
   *  Returns number of displayed items per page.
   *
   *  Syntax:
   *    int *ItemsPerPage* ()
   *
   *  Returns:
   *    Number of items.
   */
  c.ItemsPerPage = npgl_ItemsPerPage;

  c.getitemsperpage = npgl_getitemsperpage;

  /*  Function: DataRequestPerPage
   *  Determines how much data is needed to fill the page when doing dynamic requests.
   *
   *  Syntax:
   *    int *DataRequestPerPage* ()
   *
   *  Returns:
   *    Requested number of items.
   */
  c.DataRequestPerPage = npgl_DataRequestPerPage;

  /*  Function: GetAverageItemHeight
   *  Determines average height of list item.
   *  The average item height is based on ngPageList property AverageItemHeight (if defined)
   *  and list properties ItemHeight and/or MinItemHeight. The item height cannot be determited
   *  if none of these properties are defined.
   *
   *  Syntax:
   *    mixed *GetAverageItemHeight* ()
   *
   *  Returns:
   *    Height of the item or undefined if cannot be determined.
   */
  c.GetAverageItemHeight = npgl_GetAverageItemHeight;

  c.IsPagingVisible = npgl_IsPagingVisible;
  c.UpdatePaging = npgl_UpdatePaging;

  c.SetAsyncData = npgl_SetAsyncData;

  /*  Function: SetLength
   *  Sets number of items in list.
   *
   *  Syntax:
   *    void *SetLength* (int length)
   *
   *  Returns:
   *    -
   */
  c.SetLength = npgl_SetLength;
  /*  Function: GetLength
   *  Gets number of items in list.
   *
   *  Syntax:
   *    int *GetLength* ()
   *
   *  Returns:
   *    Number of items.
   */
  c.GetLength = npgl_GetLength;

  /*  Function: IsDynamicData
   *  Determines if list is using dynamic data from server.
   *
   *  Syntax:
   *    bool *IsDynamicData* ()
   *
   *  Returns:
   *    TRUE if list loads dynamic data from server.
   */
  c.IsDynamicData = npgl_IsDynamicData;

  /*  Function: GetRPC
   *  Gets current ngRPC for server data loading if dynamic.
   *
   *  Syntax:
   *    ngRPC *GetRPC* ()
   *
   *  Returns:
   *    Instance of ngRPC or null if not dynamic.
   */
  c.GetRPC = npgl_GetRPC;

  c.IsDataLoaded = npgl_IsDataLoaded;
  c.DoLoadData = npgl_DoLoadData;
  c.NeedData = npgl_NeedData;

  /*  Function: GetPageTopItems
   *  Provides access to top level items on current page.
   *
   *  Syntax:
   *    array *GetPageTopItems* ()
   *
   *  Returns:
   *    Array of items on current page.
   */
  c.GetPageTopItems = npgl_GetPageTopItems;

  /*  Function: InvalidateData
   *  Invalidates loaded data from server.
   *
   *  Syntax:
   *    void *InvalidateData* ([int idx=0, int cnt=max])
   *
   *  Returns:
   *    -
   */
  c.InvalidateData = npgl_InvalidateData;
  /*  Function: Refresh
   *  Invalidates data from server on current page.
   *
   *  Syntax:
   *    void *Refresh* ()
   *
   *  Returns:
   *    -
   */
  c.Refresh = npgl_Refresh;
  /*  Function: Reset
   *  Switches to the first page, clears selection and invalidates
   *  all data loaded from server if list is dynamic.
   *
   *  Syntax:
   *    void *Reset* ([bool doclear=false])
   *
   *  Returns:
   *    -
   */
  c.Reset = npgl_Reset;
  /*  Function: ScanPageItems
   *  Recursive scan items on current page.
   *
   *  Syntax:
   *    bool *ScanPageItems* (function scanfnc [, bool recursive=true, mixed userdata])
   *
   *  Returns:
   *    -
   */
  c.ScanPageItems = npgl_ScanPageItems;

  /*  Function: ScanVisiblePageItems
   *  Recursive scan visible items on current page..
   *
   *  Syntax:
   *    bool *ScanVisiblePageItems* (function scanfnc [, bool recursive=true, mixed userdata])
   *
   *  Returns:
   *    -
   */
  c.ScanVisiblePageItems = npgl_ScanVisiblePageItems;

  /*  Function: ShowLoading
   *  Shows default loading control, if available.
   *
   *  Syntax:
   *    void *ShowLoading* (bool visible)
   *
   *  Returns:
   *    -
   */
  c.ShowLoading=npgl_ShowLoading;

  /*  Function: ShowNoData
   *  Shows no data control, if available.
   *
   *  Syntax:
   *    void *ShowNoData* (bool visible)
   *
   *  Returns:
   *    -
   */
  c.ShowNoData=npgl_ShowNoData;

  c.IsAsyncLoadingBlock = npgl_IsAsyncLoadingBlock;

  c.loading_displayed=false;
  c.last_asyncdata_index=-1;
  c.last_asyncdata_count=0;
  c.async_rpc=null;
  //c.async_dataindex = undefined;
  //c.async_datacount = undefined;

  c.AsyncWaiting = npgl_AsyncWaiting;


  /*
   *  Group: Events
   */
  /*
   *  Event: OnPageChanging
   */
  c.OnPageChanging = null;
  /*
   *  Event: OnPageChanged
   */
  c.OnPageChanged = null;
  /*
   *  Event: OnPagingUpdating
   */
  c.OnPagingUpdating = null;
  /*
   *  Event: OnPagingUpdated
   */
  c.OnPagingUpdated = null;
  /*
   *  Event: OnLoadData
   */
  c.OnLoadData = null;
  /*
   *  Event: OnInvalidateData
   */
  c.OnInvalidateData = null;
  /*
   *  Event: OnAsyncURLRequest
   */
  c.OnAsyncURLRequest = null;
  /*
   *  Event: OnSetAsyncData
   */
  c.OnSetAsyncData = null;
  /*
   *  Event: OnSetLength
   */
  c.OnSetLength = null;
  /*
   *  Event: OnShowLoading
   */
  c.OnShowLoading = null;
  /*
   *  Event: OnHideLoading
   */
  c.OnHideLoading = null;

  /*
   *  Event: OnShowNoData
   */
  c.OnShowNoData = null;
  /*
   *  Event: OnHideNoData
   */
  c.OnHideNoData = null;
  /*
   *  Event: OnNoDataText
   */
  c.OnNoDataText = null;

  /*
   *  Group: Controls
   */
  /*
   *  Object: List
   *  <ngList>
   */
  /*
   *  Object: Paging
   *  <ngToolBar>
   */
  /*
   *  Object: FirstPage
   *  <ngButton>
   */
  /*
   *  Object: PrevPage
   *  <ngButton>
   */
  /*
   *  Object: PageNo
   *  <ngEdit>
   */
  /*
   *  Object: Page0
   *  <ngButton>
   */
  /*
   *  Object: NextPage
   *  <ngButton>
   */
  /*
   *  Object: LastPage
   *  <ngButton>
   */

  def.OnCreated=ngAddEvent(def.OnCreated, function (c, ref) {

    // Handle focus
    ng_OverrideMethod(c,'SetFocus',function(s) {
      if(ngVal(s,true)) {
        if(c.List) c.List.SetFocus(true);
        else c.SetFocus.callParent(true);
      }
      else
      {
        if(c.List) c.List.SetFocus(false);
        c.SetFocus.callParent(false);
      }
    });
    // Group pages in paging and save visibility
    if(c.Controls.Paging)
    {
      var cc=c.Controls.Paging.ChildControls;

      if(typeof cc !== 'undefined')
      {
        var reverse=(c.Controls.Paging.HAlign=='right'); // reverse paging
        if(reverse)
        {
          var ncc=new Array();
          var j=0;
          for(var i=cc.length-1;i>=0;i--)
            ncc[j++]=cc[i];

          c.Controls.Paging.ChildControls=ncc;
          cc=ncc;
        }

        var c0;
        for(var j=1;j<c.PagingSize;j++)
        {
          var c0=c.Controls['Page'+j];
          if(!c0) continue;
          c0.InitVisible=c0.Visible;
          for(var i=cc.length-1;i>=0;i--)
            if(cc[i]==c0)
            {
              cc.splice(i, 1);
              break;
            }
        }

        var pidx=-1,c0;
        for(var i=cc.length-1;i>=0;i--)
        {
          c0=cc[i];
          c0.InitVisible=c0.Visible;
          if(c0==c.Controls.Page0) pidx=i+1;
        }
        if(pidx>=0)
        {
          if(reverse)
          {
            pidx--;
            for(var j=c.PagingSize-1;j>0;j--)
            {
              c0=c.Controls['Page'+j];
              if(c0) cc.splice(pidx++,0,c0);
            }
          }
          else
            for(var j=1;j<c.PagingSize;j++)
            {
              c0=c.Controls['Page'+j];
              if(c0) cc.splice(pidx++,0,c0);
            }
        }
      }
    }
    var pt=c.PagingType;
    c.PagingType=c.PagingType-1;
    c.SetPagingType(pt,false);

    c.AddEvent(npgl_DoUpdate,'DoUpdate');
    var l=c.Controls.List;
    c.List=ngVal(l,null);
    if(l)
    {
      l.draw_page=-1;
      l.draw_length=-1;
      l.draw_height=0;
      l.paging_needs_update=true;
      l.page_start_found=true;
      l.init_page=c.Page;
      l.in_measure=false;
      l.displayed_items=c.DisplayedItems;
      l.max_displayed_items=0;
      l.display_mode=c.DisplayMode;
      l.ListPagingChanged=npgl_ListPagingChanged;
      l.ListPagingChanged();

      ng_OverrideMethod(l,'IndexOf',npgl_IndexOf);

      l.AddEvent(npgl_DoUpdateBefore,'DoUpdate');
      l.AddEvent('OnKeyDown', npgl_OnKeyDown);
      l.AddEvent('DoUpdate',npgl_DoUpdateAfter);
      l.AddEvent('OnDrawItem', npgl_OnDrawItem);
      l.AddEvent('OnExpanding', npgl_OnExpanding);
      l.AddEvent('OnAdd', npgl_OnListChanged);
      l.AddEvent('OnRemove', npgl_OnListChanged);
    }
    c.Page=0;
  });
  return c;
}

if(typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['list'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function() {
    ngRegisterControlType('ngList', function() { return new ngList; });
    ngRegisterControlType('ngPageList', Create_ngPageList);
  }
};
