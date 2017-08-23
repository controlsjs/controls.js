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
 *  Group: Menu
 *  Menu components.
 */

/**
 *  Group: Variables
 */
/**
 *  Variable: ngCurrentPopupMenu
 *  Reference to active popup <ngMenu>.
 */
var ngCurrentPopupMenu = null;

/**
 *  Variable: ngCurrentAppPopupMenu
 *  Reference to active application popup <ngMenu> (ngApp.PopupMenu).
 */
var ngCurrentAppPopupMenu = null;


// --- Menu Functions ----------------------------------------------------------

/*
  Menu captions:

  Submenus are delimited by backslashes ('\').

  <caption>         - submenu identified by its <caption>
  %<name>[:caption] - <name> represents existing component ID or submenu ID
  #<itemindex>      - submenu at exact position <itemindex>

  The following captions are used only when new items are inserted.

  @#<itemindex>[+|-]:<caption> - inserts menu item <caption> after(+)/before(-) item on position <itemindex>
  @%<name>[+|-]:<caption>      - inserts menu item <caption> after(+)/before(-) item identified by <name>
  @<caption>[+|-]:<caption>    - inserts menu item <caption> after(+)/before(-) item <caption>
  @[+|-]:<caption>             - inserts menu item <caption> after(+)/before(-) <base> menu item

  Examples:

  "%CompactWindow\Tutorial\Menu 1"
  "%FullWindow\#1\Test"
  "%FullWindow\%Tools\Menu 2"
  "%FullWindow\%Tools:My Tools\Menu 2"
  "%Tray\@Options-:Menu Before Options"
  "%Tray\@2+:Menu Ater Item nr. 2"
  "%Tray\@%MHelp:Menu After Help"
*/

function ngm_gm_getlist(list)
{
  if(list)
  {
    if(list.CtrlType=='ngButton')
    {
      list=list.Menu;
      if(!list) return null;
    }
    if((list.CtrlType!='ngList')&&(list.CtrlType!='ngToolBar'))
    {
      list=list.SubMenu;
      if(!list) return null;
    }
    if((list.CtrlType!='ngList')&&(list.CtrlType!='ngToolBar')) return null;
  }
  return list;
}

function ngGetMenu(parent, path, create, oncreatefnc, userdata)
{
  var undefined,list=ngm_gm_getlist(parent);
  var ret=null;

  create=ngVal(create,true);
  oncreatefnc=ngVal(oncreatefnc, null);
  try
  {
    var s=0,name,found,nit,ngname,item=null, items, pos,at,id;
    for(var i=0;i<=path.length;i++)
    {
      if((i!=path.length)&&(path.charAt(i)!="\\")) continue;
      name=path.substr(s,i-s);
      if(name!='')
      {
        if((!list)&&(name.charAt(0)!='%')) return null;
        if(list)
        {
          if(list.CtrlType=='ngToolBar') items = list.Menu;
          else items = list.Items;
        } else items = undefined;

        pos=-1;
        id='';
        found=null;
        switch(name.charAt(0))
        {
          case '#':
            if((list)&&(typeof items !== 'undefined'))
            {
              name=name.substr(1,name.length-1);
              var idx=parseInt(name);
              if((idx>0)&&(idx<=items.length)) found = items[idx-1];
            }
            break;
          case '%':
          {
            name=name.substr(1,name.length-1);
            var idx=name.indexOf(':');
            if(idx>=0)
            {
              id=name.substr(0,idx);
              name=name.substr(idx+1,name.length-idx);
            }
            else { id=name; name=''; }

            var rlist=ngGetControlById(id);
            if(rlist)
            {
              list=ngm_gm_getlist(rlist); if(!list) return null;
              item=null; s=i+1;
              if(list.CtrlType=='ngToolBar') items = list.Menu;
              else items = list.Items;
              continue;
            }
            else
            {
              if(!list) return null;
              for(var j=0;j<items.length;j++)
                if(items[j].ID == id) { found = items[j]; break; }
            }
            break;
          }
          case '@':
          {
            var idx=name.indexOf(':');
            if(idx>=0)
            {
              at=name.substr(1,idx-1);
              name=name.substr(idx+1,name.length-idx);
              if(at.length>0)
              {
                var after=(at.charAt(at.length-1)=='-' ? 0 : 1);
                if((at.charAt(at.length-1)=='-')||(at.charAt(at.length-1)=='+')) at=at.substr(0,at.length-1);
                if(at.charAt(0)=='#') pos=parseInt(at.substr(1,at.length-1));
                else
                {
                  if(at.charAt(0)=='%')
                  {
                    found=null;
                    at=at.substr(1,at.length-1);
                    var rlist=ngGetControlById(at);
                    if(rlist)
                    {
                      rlist=ngm_gm_getlist(rlist); if(!rlist) return null;
                      list=rlist.Owner; item=null;
                      if(!list) return null;
                      if(list.CtrlType=='ngToolBar') items = list.Menu;
                      else items = list.Items;
                      if(typeof items !== 'undefined')
                        for(var j=0;j<items.length;j++)
                          if((items[j].SubMenu == rlist)||(items[j].Menu == rlist)) { pos=j+after; break; }
                    }
                    else
                    {
                      if(typeof items !== 'undefined')
                        for(var j=0;j<items.length;j++)
                          if(items[j].ID == at)
                          {
                            pos=j+after;
                            break;
                          }
                    }
                  }
                  else
                  {
                    if((list)&&(!item)&&(typeof items !== 'undefined'))
                    {
                      if(ngname)
                      {
                        for(var j=0;j<items.length;j++)
                          if(items[j].ngText == at) { pos=j+after; break; }
                      }
                      else
                      {
                        for(var j=0;j<items.length;j++)
                          if(items[j].Text == at) { pos=j+after; break; }
                      }
                    }
                  }
                }
              }
            }
          }
          default:
            if(name.charAt(0)=='$') { ngname=true; name=name.substr(1,name.length-1); }
            else ngname=false;
            if((list)&&(!item)&&(name!='-')&&(typeof items !== 'undefined'))
            {
              if(ngname)
              {
                for(var j=0;j<items.length;j++)
                  if(items[j].ngText == name) { found = items[j]; break; }
              }
              else
              {
                for(var j=0;j<items.length;j++)
                  if(items[j].Text == name) { found = items[j]; break; }
              }
            }
            break;
        }

        if(found)
        {
          item = found;
          if((list)&&(list.CtrlType=='ngToolBar'))
          {
            if(found.Menu) { list=found.Menu; item = null; }
          }
          else
          {
            if(found.SubMenu) { list=found.SubMenu; item = null; }
          }
          ret=found;
        }
        else {
          if((create)&&(list))
          {
            nit=new ngListItem;
            if(ngname)
            {
              nit.ngText=name;
              nit.Text=ngTxt(name);
            }
            else nit.Text=name;
            if(id!='') nit.ID=id;

            if((oncreatefnc)&&(!ngVal(oncreatefnc(list, nit, userdata),false))) { ret=null; break; }

            if(list.CtrlType=='ngToolBar')
            {
              var cit=list.InsertItem(pos, nit);
              if(cit) {
                list=cit.Menu;
                nit=null;
              }
            }
            else
            {
              if(item)
              {
                var def=new Object;
                def.Items=new Array(nit);
                if(ngVal(item.ID,'')!='') def.ID=item.ID;
                list=list.CreateSubMenu(item, def);
              }
              else
              {
                if((pos<0)||(typeof list.Items === 'undefined')||(pos>=list.Items.length)) list.Add(nit);
                else list.Insert(pos,nit);
              }
            }

            item=nit;
            ret=nit;
          }
          else { ret=null; break; }
        }
      }
      s=i+1;
    }
  }
  catch(e)
  {
  }
  return ret;
}

// --- ngMenu ------------------------------------------------------------------

function ngmn_WindowWidth()
{
  var o=(ngApp ? ngApp.TopElm() : null);
  return ng_ClientWidthEx(o);
}

function ngmn_WindowHeight()
{
  var o=(ngApp ? ngApp.TopElm() : null);
  return ng_ClientHeightEx(o);
}

function ngmn_GetScreenRect()
{
  var rect={ Left: 0, Top: 0, Right: 0, Bottom: 0 };

  var wo=(ngApp ? ngApp.TopElm() : null);
  rect.Right=ng_ClientWidthEx(wo);
  rect.Bottom=ng_ClientHeightEx(wo);
  if(this.OnGetScreenRect) this.OnGetScreenRect(this,rect);
  return rect;
}

function ngmn_IsInsidePopup(t,intype,e)
{
  var tc=ngGetControlByElement(t,'ngList');
  while(tc)
  {
    if((tc===this)||(tc.ActiveSubMenu===this)) break;
    tc=tc.Owner;
  }
  return (tc ? true : false);
}

function ngmn_DisableContextMenu(e)
{
  if(!e)
  {
     e=window.event;
     e.returnValue = false;
  }
  else
  {
    if(e.preventDefault) e.preventDefault();
  }
  return false;
}

function ngmn_OnScroll(c,e,elm)
{
  c.HideSubMenu();
}

function ngmn_DoAttach(elm)
{
  if(elm) elm.oncontextmenu = ngmn_DisableContextMenu;
}

function ngmn_DoDispose()
{
  var p=this.Owner;

  if(p) {
    if(ngVal(p.ActiveSubMenu, null)==this)
    {
      p.ClearSelected();
      p.ActiveSubMenu=null;
    }
  }

  if(this.SubMenuTimer) clearTimeout(this.SubMenuTimer); this.SubMenuTimer=null;

  if(ngCurrentPopupMenu === this)
  {
    ngCurrentPopupMenu = null;
    ngc_DeactivatePopup(this);
  }

  if((this.ParentMenu)&&(this.ParentMenu.SubMenu===this)) {
    delete this.ParentMenu.SubMenu;
  }
  return true;
}

function ngmn_Update(recursive)
{
  if(!this.Visible) return;
  if(!this.__menuvishandling)
  {
    this.__menuvishandling=true;
    var self=this;
    function parentsetvisible(c)
    {
      if(!c.Visible) self.HideSubMenu();
    }

    function parentdispose()
    {
      var p=this.ParentControl;
      var remove=true;
      while(p)
      {
        if(typeof p.HideSubMenu === 'function') remove=false;
        if(remove) p.RemoveEvent('OnVisibleChanged',parentsetvisible);
        if(typeof p.PopupChildMenus!=='undefined')
        {
          for(var i=p.PopupChildMenus.length-1;i>=0;i--)
            if(p.PopupChildMenus[i]===self) p.PopupChildMenus.splice(i,1);
        }
        p=p.ParentControl;
      }
      return true;
    }

    var p=this.ParentControl;
    if(p)
    {
      while((p)&&(typeof p.HideSubMenu !== 'function'))
      {
        p.AddEvent('OnVisibleChanged',parentsetvisible);
        p=p.ParentControl;
      }
      this.AddEvent('DoDispose',parentdispose);
    }
  }
}

function ngmn_ParentIsInsidePopup(c,t,intype,e)
{
  if(typeof c.PopupChildMenus!=='undefined')
  {
    for(var i=0;i<c.PopupChildMenus.length;i++)
      if(c.PopupChildMenus[i].IsInsidePopup(t,intype,e)) return true;
  }
  return false;
}

function ngmn_ParentChildMenusVisibleChanged(c)
{
  if(!c.Visible) c.PopupChildMenus=new Array();
}

function ngmn_SetCurrentPopupMenu(menu)
{
  var p=menu;
  while(p)
  {
    if(p===ngCurrentPopupMenu) return;
    if((p!==menu)&&(ngc_IsActivePopup(p)))
    {
      if(typeof p.PopupChildMenus==='undefined')
      {
        p.PopupChildMenus=new Array();
        p.AddEvent('OnIsInsidePopup',ngmn_ParentIsInsidePopup);
        p.AddEvent('OnVisibleChanged',ngmn_ParentChildMenusVisibleChanged);
      }
      var i;
      for(i=0;i<p.PopupChildMenus.length;i++)
        if(p.PopupChildMenus[i]===menu) break;
      if(i>=p.PopupChildMenus.length)
        p.PopupChildMenus.push(menu);
      break;
    }
    if(p.ParentControl) p=p.ParentControl;
    else p=p.Owner;
  }
  if((ngCurrentPopupMenu)&&(ngCurrentPopupMenu!==menu))
    ngCurrentPopupMenu.HideMenu();
  ngCurrentPopupMenu=menu;
  ngc_ActivatePopup(menu);
}

function ngmn_DoPopup()
{
  var mo=this.Elm();
  if(!mo) return null;

  if((this.OnPopup)&&(!ngVal(this.OnPopup(this),false))) return null;

  this.AutoPopup = ngVal(this.AutoPopup, !this.Visible);
  this.HideSubMenu();

  if(!this.Visible)
  {
    mo.style.left='-10000px';
    mo.style.top='-10000px';
  }

  var zidx;
  if(typeof this.zIndex!=='undefined'){
    zidx=this.zIndex;
  }
  else{
    // Compute zIndex by submenu level
    if((typeof ngModalCnt!=='undefined')&&(typeof ngModalZIndexDelta!=='undefined'))
    {
      // move menu over modal windows
      zidx=(ngModalZIndexDelta-1000);
      zidx+=(ngModalCnt*ngModalZIndexDelta);
    }
    else zidx=10000;

    var p=this;
    while((p)&&(typeof p.HideSubMenu === 'function'))
    {
      zidx++;
      p=p.Owner;
    }
  }
  mo.style.zIndex=zidx;
  if((typeof this.Bounds.H === 'undefined')&&((typeof this.Bounds.B === 'undefined')||(typeof this.Bounds.T === 'undefined')))
    mo.style.height='auto';
  if((typeof this.Bounds.W === 'undefined')&&((typeof this.Bounds.R === 'undefined')||(typeof this.Bounds.L === 'undefined')))
    mo.style.width='auto';

  this.SetVisible(true);

  var minw=ngVal(this.MinWidth,100);

  var hasframe=(!ng_EmptyVar(this.Frame));
  var resize=false;
  ng_BeginMeasureElement(mo);
  var mw=ng_OuterWidth(mo);
  if(mw<minw) { resize=true; ng_SetOuterWidth(mo,minw); }
  else if(ngOpera) ng_SetOuterWidth(mo,mw);// Opera scrollbar fix
  var maxh=this.MaxHeight;
  if(typeof maxh === 'undefined')
  {
    var srect=this.GetScreenRect();
    maxh=srect.Bottom-srect.Top-10;
  }
  if(ng_OuterHeight(mo)>maxh) { resize=true; ng_SetOuterHeight(mo,maxh); }
  ng_EndMeasureElement(mo);
  if((resize)&&(hasframe)) this.Update();

  ngCurrentAppPopupMenu=null; // prevent opening ngApplication menu

  return mo;
}

function ngmn_Popup(x,y,halign,valign)
{
  var mo=this.DoPopup();
  if(!mo) return;

  halign=ngVal(halign,this.MenuHAlign);
  valign=ngVal(valign,this.MenuVAlign);
  halign=ngVal(halign,'left');
  valign=ngVal(valign,'top');
  var msi=ngVal(this.MinScreenIndent,5);

  ng_BeginMeasureElement(mo);
  var sw=ng_OuterWidth(mo);
  var sh=ng_OuterHeight(mo);
  ng_EndMeasureElement(mo);

  var mx,my;

  var srect=this.GetScreenRect();
  if(halign==='right')
  {
    mx=x-sw;
    if(mx<srect.Left) mx=x;
  }
  else
  {
    if(halign==='center')
    {
      mx=x-Math.round(sw/2);
    }
    else
    {
      mx=x;
    }
    if(mx+sw>srect.Right-msi) mx=x-sw; // right
  }
  if((mx<srect.Left)||(mx+sw>srect.Right-msi)) mx=srect.Left+msi;

  if(valign==='bottom')
  {
    my=y-sh;
    if(my<srect.Top) my=y;
  }
  else
  {
    if(valign==='center')
    {
      my=y-Math.round(sh/2);
    }
    else
    {
      my=y;
    }
    if(my+sh>srect.Bottom-msi) my=y-sh; // bottom
  }
  if((my<srect.Top)||(my+sh>srect.Bottom-msi)) my=srect.Top+msi;

  mo.style.left=mx+'px';
  mo.style.top=my+'px';

  this.PopupX = x;
  this.PopupY = y;
  delete this.PopupElm;

  this.SetFocus();
}

function ngmn_PopupCtrl(c,halign,valign)
{
  var o=null;
  // detect if it is control or just element
  if(typeof c === 'string')
  {
    var nc=ngGetControlById(c);
    if(!nc) c=document.getElementById(c);
    else c=nc;
  }
  if(typeof c.Elm === 'function') o=c.Elm();
  else { o=c; c=null; }

  if(!o) return;

  var mo=this.DoPopup();
  if(!mo) return;

  var ox=0,oy=0,msi;
  if(c)
  {
    halign=ngVal(halign,c.MenuHAlign);
    valign=ngVal(valign,c.MenuVAlign);
    ox=ngVal(c.MenuOverlapX,0);
    oy=ngVal(c.MenuOverlapY,0);
    msi=c.MinScreenIndent;
  }
  halign=ngVal(halign,this.MenuHAlign);
  valign=ngVal(valign,this.MenuVAlign);
  halign=ngVal(halign,'left');
  valign=ngVal(valign,'top');
  msi=ngVal(msi,this.MinScreenIndent);
  msi=ngVal(msi,5);

  var mp=mo.parentNode;
  var pos=ng_ParentPosition(o,mp,true);
  ng_BeginMeasureElement(o);
  pos.w=ng_OuterWidth(o);
  pos.h=ng_OuterHeight(o);
  ng_EndMeasureElement(o);

  ng_BeginMeasureElement(mo);
  var sw=ng_OuterWidth(mo);
  var sh=ng_OuterHeight(mo);
  ng_EndMeasureElement(mo);

  var mx,my;

  var srect=this.GetScreenRect();
  if(halign==='right')
  {
    if(valign==='center')
    {
      mx=pos.x+pos.w+ox;
      if(mx+sw>srect.Right-msi) mx=pos.x-sw-ox; // right
    }
    else
    {
      mx=pos.x+pos.w-sw-ox;
      if(mx<srect.Left) mx=pos.x+ox;
    }
  }
  else
  {
    if(halign==='center')
    {
      mx=pos.x+Math.round(pos.w/2)-Math.round(sw/2)+ox;
    }
    else
    {
      if(valign==='center')
      {
        mx=pos.x-sw-ox;
        if(mx<srect.Left) mx=pos.x+pos.w+ox;
      }
      else
      {
        mx=pos.x+ox;
      }
    }
    if(mx+sw>srect.Right-msi) mx=pos.x+pos.w-sw-ox; // right
  }
  if((mx<srect.Left)||(mx+sw>srect.Right-msi)) mx=srect.Left+msi;


  if(valign==='bottom')
  {
    my=pos.y-sh-oy;
    if(my<srect.Top) my=pos.y+pos.h+oy;
  }
  else
  {
    if(valign==='center')
    {
      my=pos.y+Math.round(pos.h/2)-Math.round(sh/2)+oy;
    }
    else
    {
      my=pos.y+pos.h+oy;
    }
    if(my+sh>srect.Bottom-msi) my=pos.y-sh-oy; // bottom
  }
  if((my<srect.Top)||(my+sh>srect.Bottom-msi)) my=srect.Top+msi;

  mx+=ng_ScrollX(mp);
  my+=ng_ScrollY(mp);

  mo.style.left=mx+'px';
  mo.style.top=my+'px';

  delete this.PopupX;
  delete this.PopupY;
  this.PopupElm = o;

  this.SetFocus();
}

function ngmn_PopupSubMenu(o,halign,valign)
{
  if(!o) return;
  var mo=this.DoPopup();
  if(!mo) return;

  halign=ngVal(halign,this.MenuHAlign);
  valign=ngVal(valign,this.MenuVAlign);
  halign=ngVal(halign,'left');
  valign=ngVal(valign,'top');
  var msi=ngVal(this.MinScreenIndent,5);

  var mp=mo.parentNode;
  var pos=ng_ParentPosition(o,mp,true);
  ng_BeginMeasureElement(o);
  pos.w=ng_OuterWidth(o);
  pos.h=ng_OuterHeight(o);
  ng_EndMeasureElement(o);

  ng_BeginMeasureElement(mo);
  var sw=ng_OuterWidth(mo);
  var sh=ng_OuterHeight(mo);
  ng_EndMeasureElement(mo);

  var ox=ngVal(this.SubMenuOverlapX,5);
  var oy=ngVal(this.SubMenuOverlapY,0);

  var mx,my;

  var srect=this.GetScreenRect();
  if(halign=='right')
  {
    mx=pos.x-sw+ox;
    if(mx<srect.Left) mx=pos.x+pos.w-ox;
  }
  else
  {
    mx=pos.x+pos.w-ox;
    if(mx+sw>srect.Right-msi) mx=pos.x-sw+ox; // right
  }
  if((mx<srect.Left)||(mx+sw>srect.Right-msi)) mx=srect.Left+msi;

  var mt=ng_GetCurrentStylePx(mo,'padding-top') +
         ng_GetCurrentStylePx(mo,'margin-top') +
         ng_GetCurrentStylePx(mo,'border-top-width');
  var mb=ng_GetCurrentStylePx(mo,'padding-bottom') +
         ng_GetCurrentStylePx(mo,'margin-bottom') +
         ng_GetCurrentStylePx(mo,'border-bottom-width');
  if(valign=='bottom')
  {
    my=pos.y+pos.h-sh-oy+mb;
    if(my<srect.Top) my=pos.y+oy-mt;
  }
  else
  {
    my=pos.y+oy-mt;
    if(my+sh>srect.Bottom-msi) my=pos.y+pos.h-sh-oy+mb; // bottom
  }
  if((my<srect.Top)||(my+sh>srect.Bottom-msi)) my=srect.Top+msi;

  mx+=ng_ScrollX(mp);
  my+=ng_ScrollY(mp);

  mo.style.left=mx+'px';
  mo.style.top=my+'px';

  delete this.PopupX;
  delete this.PopupY;
  this.PopupElm = o;
}

function ngmn_ShowSubMenu(it)
{
  var m=it.SubMenu;
  if(this.ActiveSubMenu)
  {
    if(this.ActiveSubMenu==m) return;
    this.HideSubMenu();
  }
  if(m)
  {
    if((m.Visible)||(!this.Enabled)||(!ngVal(it.Enabled,true))) return;

    this.SelectItem(it);
    this.ActiveSubMenu=m;
    var o=document.getElementById(this.ID+'_'+this.ItemId(it));
    if(o) m.PopupSubMenu(o);
  }
  else
  {
    this.ClearSelected();
    this.ActiveSubMenu=null;
  }
}

function ngmn_SetVisible(v)
{
  v=ngVal(v,true);
  if(this.Visible==v) return;
  var p=this.Owner;
  if(!v)
  {
    this.HideSubMenu();
    if((p)&&(ngVal(p.ActiveSubMenu, null)==this))
    {
      p.ClearSelected();
      p.ActiveSubMenu=null;
    }
    if(this.SubMenuTimer) clearTimeout(this.SubMenuTimer); this.SubMenuTimer=null;

    delete this.PopupX;
    delete this.PopupY;
    delete this.PopupElm;

    if(ngCurrentPopupMenu === this)
    {
      ngCurrentPopupMenu = null;
      ngc_DeactivatePopup(this);
    }
  }
  else
  {
    if(ngVal(this.AutoPopup,false)) ngmn_SetCurrentPopupMenu(this);
  }
}

function ngmn_HideSubMenu()
{
  var m=this.ActiveSubMenu;
  if(m)
  {
    if((this.OnHideSubMenu)&&(!ngVal(this.OnHideSubMenu(this),false))) return;
    this.ClearSelected();
    m.SetVisible(false);
    this.ActiveSubMenu=null;
  }
}

function ngmn_SubMenuTimer(iid,t)
{
  var ii=ngl_ItemById(iid);
  if(ii.list)
  {
    if(ii.list.SubMenuTimer) clearTimeout(ii.list.SubMenuTimer);
    ii.list.SubMenuTimer=null;
    if(t)
    {
      var p=ii.list.Owner;
      if((p)&&(ngVal(p.Visible,true))) ii.list.ShowSubMenu(ii.item);
    }
    else
    {
      var l=ii.list;
      while(l)
      {
        if((l.MouseInControl)&&(l!==ii.list)) return;
        l=l.ActiveSubMenu;
      }
      ii.list.HideSubMenu();
    }
  }
}

function ngmn_OnEnterRow(l,it,id)
{
  if((!l.ActiveSubMenu)||(l.ActiveSubMenu!==it.SubMenu))
    l.ClearSelected();
  else
    l.SelectItem(it);
  if((l.Owner)&&(l.Owner.SubMenuTimer))
  {
    clearTimeout(l.Owner.SubMenuTimer);
    l.Owner.SubMenuTimer=null;
  }
  if((l.ActiveSubMenu)||((it.SubMenu)&&((typeof l.PointerInfo === 'undefined')||(!l.PointerInfo.Touch))))
  {
    if(l.SubMenuTimer) clearTimeout(l.SubMenuTimer);
    l.SubMenuTimer = setTimeout("ngmn_SubMenuTimer('"+id+"',1);",200);
  }
  ngc_EnterImg(id+'M');
  return true;
}

function ngmn_OnLeaveRow(l,it,id)
{
  if(l.SubMenuTimer) clearTimeout(l.SubMenuTimer);
  l.SubMenuTimer=null;

  if((l.ActiveSubMenu)&&(l.ActiveSubMenu!==it.SubMenu))
  {
    l.SubMenuTimer = setTimeout("ngmn_SubMenuTimer('"+id+"',0)",200);
  }
  ngc_LeaveImg(id+'M');
  return true;
}

function ngmn_OnEnter(l)
{
  var p=l.Owner;
  if(typeof p.HideSubMenu==='function')
  {
    p.ClearSelected();
    for(var i=0;i<p.Items.length;i++)
      if(p.Items[i].SubMenu==l)
      {
        p.SelectItem(p.Items[i]);
        break;
      }
  }
  // l.SetFocus(); // disabled because of Opera - focusing scrolls document :(
  return true;
}


function ngmn_OnKeyDown(e)
{
  var l=this;
  switch(e.keyCode)
  {
    case 39:
    case 37:
    case 27:
      var ii=ngl_ItemById(ngl_CurrentRowId);
      if(ii.list!=l)
      {
        ii.list=l;
        ii.item=null;
      }
      switch(e.keyCode)
      {
        case 27:
          ii.list.HideMenu();
          break;
        case 39:
          var m=(ii.item ? ii.item.SubMenu : null);
          if(m)
          {
            ii.list.ShowSubMenu(ii.item);
            m.SetFocus();
            m.SetItemFocus(m.FirstVisibleItem());
          }
          else
          {
            var p=(ii.list && ii.list.Owner ? ii.list.Owner : null);
            if(p)
            {
              var btn;
              while(p)
              {
                if(p.CtrlType == 'ngToolBar') break;
                if(p.CtrlType == 'ngButton') btn=p;
                p=p.Owner;
              }
              if((p)&&(typeof p.Menu === 'object')) // ToolBar
              {
                for(var i=0;i<p.Menu.length;i++)
                  if(p.Menu[i]==btn)
                  {
                    i++;
                    if(i>=p.Menu.length) i=0;
                    if((i>=0)&&(i<p.Menu.length))
                    {
                      btn=p.Menu[i];
                      if((btn)&&(btn.CtrlType=='ngButton')&&(typeof btn.Menu === 'object'))
                      {
                        ii.list.AutoPopup=true;
                        btn.Click();
                        btn.Menu.SetItemFocus(btn.Menu.FirstVisibleItem());
                      }
                    }
                    break;
                  }

              }
            }
          }
          break;
        case 37:
          var p=(ii.list && ii.list.Owner ? ii.list.Owner : null);
          if(p)
          {
            if(typeof p.HideSubMenu === 'function') // Menu
            {
              p.SetFocus();
              for(var i=0;i<p.Items.length;i++)
                if(p.Items[i].SubMenu==ii.list)
                {
                  p.SetItemFocus(p.Items[i]);
                  break;
                }
              p.HideSubMenu();
              if(p.SubMenuTimer) clearTimeout(p.SubMenuTimer); p.SubMenuTimer=null;
            }
            else
            {
              var btn;
              while(p)
              {
                if(p.CtrlType == 'ngToolBar') break;
                if(p.CtrlType == 'ngButton') btn=p;
                p=p.Owner;
              }
              if((p)&&(typeof p.Menu === 'object')) // ToolBar
              {
                for(var i=0;i<p.Menu.length;i++)
                  if(p.Menu[i]==btn)
                  {
                    i--;
                    if(i<0) i=p.Menu.length-1;
                    if((i>=0)&&(i<p.Menu.length))
                    {
                      btn=p.Menu[i];
                      if((btn)&&(btn.CtrlType=='ngButton')&&(typeof btn.Menu === 'object'))
                      {
                        ii.list.AutoPopup=true;
                        btn.Click();
                        btn.Menu.SetItemFocus(btn.Menu.FirstVisibleItem());
                      }
                    }
                    break;
                  }
              }
            }
          }
          break;
      }
  }
  return true;
}


function ngmn_MenuText(list, it, col)
{
  var txt,t=new ngStringBuilder;

  if(typeof it.OnGetText === 'function') txt=ngVal(it.OnGetText(list, it, col),'');
  else
  {
    if(list.Columns.length>0)
    {
      txt=ngVal(it.Text[col.ID],'');
      if(txt=='') txt='&nbsp;';
    }
    else txt=it.Text;
  }
  var image=list.SubMenuImg;
  if((it.SubMenu)&&(image)&&((list.Columns.length<=0)||(col.ID==list.Columns[list.Columns.length-1].ID)))
  {
    var id=list.ItemId(it);
    var dp=ngl_ItemImgDrawProps(list.ID+'_'+id+'M', (list.Enabled)&&(ngVal(it.Enabled,true)), image);
    t.append('<div style="position: relative;">');
    ngc_Img(t,dp,"width: "+dp.W+"px;",'class="'+list.BaseClassName+'SubMenu"');
    t.append('<div style="padding-right:'+dp.W+'px">')
    t.append(txt);
    t.append('</div></div>');
  }
  else t.append(txt);
  return t.toString();
}

function ngmn_DrawItemText(html, it, id, level)
{
  var txt;
  var cclass=this.BaseClassName;
  if(this.Columns.length>0) txt=ngVal(it.Text[this.Columns[0].ID],'');
  else txt=it.Text;
  if(txt=='-')
  {
    it.Visible=false;
    var h=((this.Items[0]==it)||(this.Items[this.Items.length-1]==it));
    if(this.OnDrawSeparator) this.OnDrawSeparator(html,it,id,level,this);
    else
    {
      if(this.Columns.length>0) html.append('<tr class="'+cclass+'Row" '+(h ? 'style="display:none" ' : '')+'id="'+this.ID+'_'+id+'"><td colspan="'+this.Columns.length+'"><div class="'+cclass+'Separator">&nbsp;</div></td></tr>');
      else html.append('<div id="'+this.ID+'_'+id+'" '+(h ? 'style="display:none" ' : '')+'class="'+cclass+'Separator"></div>');
    }
  }
  else this.DefaultDrawItemText(html,it,id,level);
}

function ngmn_DoCreate(def, ref, elm, parent)
{
  if((typeof this.SubMenuDef !== 'object')||(!this.SubMenuDef)) {
    this.SubMenuDef={ Type: def.Type };
  }

  if((typeof def.Data !== 'undefined')&&(ngVal(def.Data.Visible,false))) return; // Visible menus are static
  // All menus are in document.body
  var parent=((typeof ngApp === 'object')&&(ngApp) ? ngApp.TopElm() : document.body);
  var p=elm.parentNode;
  if((p)&&(p!=parent))
  {
    p.removeChild(elm);
    parent.appendChild(elm);
  }
}

function ngmn_HideMenu()
{
  var h=this;
  var p=this;
  while(p)
  {
    if(typeof p.HideSubMenu !== 'function') { p=null; break; }
    h=p;
    if(!ngVal(p.AutoPopup,false)) break;
    p=p.Owner;
  }
  if((!p)&&(h)) h.SetVisible(false);
  else if(h) h.HideSubMenu();
}

function ngmn_MenuClick(it, e)
{
  if(!it) return false;
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
  }
  if((!this.Enabled)||(!ngVal(it.Enabled,true))) return false;

  if((it.SubMenu)&&(typeof this.PointerInfo !== 'undefined')&&(this.PointerInfo.Touch))
  {
    this.ShowSubMenu(it);
    return false;
  }

  if((this.OnMenuClick)&&(!ngVal(this.OnMenuClick(e,this,it),false))) return false;
  var onclick=it.OnMenuClick;
  if(onclick)
  {
    if(!ngVal(onclick(e,this,it),true)) return false;
    this.HideMenu();
  }
  else
  {
    var ac=this.GetItemAction(it);
    if(!ac) ac=it;
    else
      if(ac.OnClick)
      {
        ac=null; // OnClick defined
        this.HideMenu();
      }

    if(ac)
    {
      if((typeof ac.Checked!=='undefined')||(typeof ac.RadioGroup!=='undefined'))
      {
        this.CheckItem(it, (typeof ac.RadioGroup!=='undefined' ? 1 : (ngVal(ac.Checked,0)==0 ? 1 : 0)) );
        this.HideMenu();
      }
      else
      {
        if(it.SubMenu)
        {
          this.ShowSubMenu(it);
          return false;
        }
        else this.HideMenu();
      }
    }
    else if(typeof it.SubMenu === 'undefined') this.HideMenu();
  }
  return true;
}

function ngmn_OnClick(e)
{
  if((!e.listPart)&&(e.listItem)&&(e.list))  return e.list.MenuClick(e.listItem, e);
  return false;
}

function ngmn_GetResText(list,it,col)
{
  return ngTxt(it.ngTextD);
}

function ngmn_CreateSubMenu(it,m)
{
  if(!it) return null;

  if(typeof m === 'undefined') m=new Object;

  var smd=null;
  var smox=m.SubMenuOverlapX,smoy=m.SubMenuOverlapY;
  var smha=m.MenuHAlign,smva=m.MenuVAlign;
  var smc=m.OnSubMenuCreated;
  var p=this;
  while((p)&&(typeof p.HideSubMenu === 'function'))
  {
    if((!smd)&&(typeof p.SubMenuDef === 'object')&&(!ngVal(p.SubMenuDef.AutoDef,false)))
      smd=p.SubMenuDef;
    if((typeof smox === 'undefined')&&(typeof smoy === 'undefined')&&((typeof p.SubMenuOverlapX !== 'undefined')||(typeof p.SubMenuOverlapY !== 'undefined')))
    {
      smox=p.SubMenuOverlapX;
      smoy=p.SubMenuOverlapY;
    }
    if((typeof smha === 'undefined')&&(typeof smva === 'undefined')&&((typeof p.MenuHAlign !== 'undefined')||(typeof p.MenuVAlign !== 'undefined')))
    {
      smha=p.MenuHAlign;
      smva=p.MenuVAlign;
    }
    if((typeof smc === 'undefined')&&(typeof p.OnSubMenuCreated !== 'undefined'))
      smc= p.OnSubMenuCreated;
    p=p.Owner;
  }
  var ld=ng_CopyVar(smd ? smd : this.SubMenuDef);
  var ldefs={ SubMenu: ld };
  if(typeof ld.Data === 'undefined')
    ld.Data = m;
  else
  {
    var d=ld.Data;
    ld.Data=m;
    ng_MergeVar(ld.Data,d);
  }
  if(typeof m.ID === 'string') ld.id=m.ID;
  if(typeof smox !== 'undefined') m.SubMenuOverlapX = smox;
  if(typeof smoy !== 'undefined') m.SubMenuOverlapY = smoy;
  if(typeof smha !== 'undefined') m.MenuHAlign = smha;
  if(typeof smva !== 'undefined') m.MenuVAlign = smva;
  if(typeof smc  !== 'undefined') m.OnSubMenuCreated = smc;
  m.Owner=this;
  m.ParentMenu=it;

  var lref=ngCreateControls(ldefs,undefined,((typeof ngApp === 'object')&&(ngApp) ? ngApp.TopElm() : undefined));
  it.SubMenu=lref.SubMenu;
  if((lref.SubMenu)&&(p.OnSubMenuCreated)) p.OnSubMenuCreated(p,ld,lref.SubMenu);

  return it.SubMenu;
}

function ngmn_OnAdd(list, it, parent)
{
  // Handle menu click
  if(!it.OnClick) it.OnClick=ngmn_OnClick;

  // Handle string resources
  if((typeof it.ngText !== 'undefined')&&(ngVal(it.Text,'')==''))
    it.Text=ngTxt(it.ngText);
  if((typeof it.ngTextD !== 'undefined')&&(!it.OnGetText))
    it.OnGetText = ngmn_GetResText;

  // Handle submenu
  var m=it.SubMenu;
  if(typeof m === 'object')
  {
    if(typeof m.HideSubMenu !== 'function')
    {
      if(typeof m.Items === 'undefined')
      {
        var o=new Object;
        o.Items=m;
        m=o;
      }
      delete it.SubMenu;
      list.CreateSubMenu(it, m);
    }
    else m.Owner=list;
  }

  return true;
}

function ngmn_OnRemove(list, it, parent)
{
  if((it.SubMenu)&&(typeof it.SubMenu.Dispose === 'function')) it.SubMenu.Dispose();
  return true;
}

function ngmn_BeginUpdate(recursive)
{
  this.ListBeginUpdate();

  recursive=ngVal(recursive,true);
  this.update_info.push(recursive);
  if(recursive)
  {
    this.Scan(
      function(list, item, parent, userdata)
      {
        var m=item.SubMenu;
        if(m) m.BeginUpdate(true);
        return true;
      }
    );
  }
}

function ngmn_EndUpdate()
{
  this.ListEndUpdate();
  if(this.update_info.length>0)
  {
    var recursive=this.update_info.pop();
    if(recursive)
    {
      this.Scan(
        function(list, item, parent, userdata)
        {
          var m=item.SubMenu;
          if(m) m.EndUpdate(true);
          return true;
        }
      );
    }
  }
}

function ngmn_GetMenu(path, create, parent, oncreatefnc, userdata)
{
  create=ngVal(create,false);
  parent=ngVal(parent,this);
  oncreatefnc=ngVal(oncreatefnc, null);
  return ngGetMenu(parent, path, create, oncreatefnc, userdata);
}

function ngmn_GetMenuItemByID(id, recursive)
{
  var found={ Menu: null, Item: null };

  this.ScanMenu(function(list, it, parent, data) {
    if((it.ID)&&(it.ID==id)) {
      found.Menu=list;
      found.Item=it;
      return false;
    }
    return true;
  },recursive,null);
  return found;
}

function ngmn_ScanMenu(fnc, recursive, parent, userdata)
{
  if(typeof fnc !== 'function') return false;
  recursive=ngVal(recursive,true);

  var cancel=false;
  function scanfnc(list, it, parent, data) {
    if(!fnc(list, it, parent, userdata)) {
      cancel=true;
      return false;
    }

    if((it.SubMenu)&&(recursive))
    {
      it.SubMenu.Scan(scanfnc, null);
      if(cancel) return false;
    }
    return true;
  }
  return this.Scan(scanfnc, parent);
}

// --- ngMenuBar ---------------------------------------------------------------

function ngmb_DoCreate(def, ref, elm, parent)
{
  if(typeof def.Button === 'object') this.ButtonDef = ng_CopyVar(def.Button);
  if(typeof def.Type !== 'undefined') this.DefType = def.Type;

  var dm=def.Menu;
  if(typeof dm === 'object')
  {
    if((typeof this.SubMenuDef !== 'object')||(!this.SubMenuDef))
    {
      this.SubMenuDef={ Type: dm.Type };
    }

    var it;
    if((typeof dm.Data === 'object')&&(typeof dm.Data.Items === 'object'))
    {
      this.update_cnt++;
      try {
        var items=dm.Data.Items;
        for(var i=0;i<items.length;i++) {
          this.AddItem(items[i]);
        }
      } finally {
        this.update_cnt--;
        this._items_changed = false;
        this.need_update = false;
      }
    }
  }
}

function ngmb_ClearItems()
{
  if((typeof this.Menu==='object')&&(this.Menu)&&(this.Menu.length>0))
  {
    for(var i=this.Menu.length-1;i>=0;i--) this.Menu[i].Dispose();
    this.Menu=new Array();
    this.Items=new Array();
    this.ItemsChanged();
  }
}

function ngmb_SetItems(items)
{
  this.update_cnt++;
  try {
    this.ClearItems();
    if((items)&&(typeof items==='object')) {
      for(var i=0;i<items.length;i++) {
        this.AddItem(items[i]);
      }
    }
  } finally {
    this.update_cnt--;
    this.ItemsChanged();
  }
}

function ngmb_AddItem(it)
{
  return this.InsertItem(-1, it);
}

function ngmb_MenuButtontClick()
{
  var m=this.Menu;
  if((typeof m==='object')&&(m)&&(!m.Items.length)) return;
  ngmn_DefaultClick.apply(this,arguments);
}

function ngmb_InsertItem(idx, it)
{
  var ld,undefined;
  if(typeof this.ButtonDef === 'object') ld=ng_CopyVar(this.ButtonDef);
  else {
    ld={ Type: typeof this.DefType !== 'undefined' ? this.DefType+'Button' : 'ngButton' };
  }
  if(typeof ld.className === 'undefined') ld.className=this.BaseClassName+'Button';
  if(typeof ld.Data === 'undefined') ld.Data = new Object;

  if(typeof it!=='object') it={ Text:it };

  for(var j in it)
    ld.Data[j]=it[j];

  ld.Menu=ng_CopyVar(this.SubMenuDef);
  if((typeof ld.Menu!=='object')||(!ld.Menu)) ld.Menu={};
  if(typeof ld.Menu.Type === 'undefined') ld.Menu.Type='ngMenu';
  if((typeof ld.Menu.Data !== 'object')||(!ld.Menu.Data)) ld.Menu.Data = new Object;
  ld.Menu.Data.Items=ld.Data.SubMenu ? ld.Data.SubMenu : new Array();
  delete ld.Data.SubMenu;
  delete ld.Data.Menu;

  var ldefs={ MenuBtn: ld };
  var lref=ngCreateControls(ldefs,undefined,this.ID);
  if(lref.MenuBtn)
  {
    it.SubMenu=lref.MenuBtn.Menu;
    lref.MenuBtn.MenuItem=it;
    lref.MenuBtn.AddEvent('DoDispose',ngmb_ButtonDispose);
    if(lref.MenuBtn.OnClick===ngmn_DefaultClick) lref.MenuBtn.OnClick=ngmb_MenuButtontClick;
    
    lref.MenuBtn.Owner=this;
    if(typeof this.Menu === 'undefined') this.Menu = new Array();
    if(typeof this.Items === 'undefined') this.Items = new Array();
    if((idx<0)||(idx>=this.Items.length)) {
      this.Menu.push(lref.MenuBtn);
      this.Items.push(it);
    }
    else
    {
      var cc=this.ChildControls;
      if((cc)&&(cc.length>0)&&(cc[cc.length-1]==lref.MenuBtn))
      {
        cc.splice(cc.length-1,1);
        var pos=0;
        if((idx>0)&&(idx<this.Menu.length)) {
          var prevmenu=this.Menu[idx-1];
          for(var i=0;i<cc.length;i++)
            if(cc[i]===prevmenu) { pos=i+1; break; }
        }
        cc.splice(pos,0,lref.MenuBtn);
      }
      this.Menu.splice(idx,0,lref.MenuBtn);
      this.Items.splice(idx,0,it);
    }
    this.ItemsChanged();
  }
  return lref.MenuBtn;
}

function ngmb_ButtonDispose()
{
  if((this.Owner)&&(this.Owner.Menu)&&(typeof this.Owner.Menu === 'object'))
  {
    for(var i=this.Owner.Menu.length-1;i>=0;i--)
    {
      if(this.Owner.Menu[i]===this) {
        this.Owner.Menu.splice(i,1);
        this.Owner.Items.splice(i,1);
        for(i++;i<this.Owner.Menu.length;i++) {
          if(this.Owner.Menu[i].Menu) this.Owner.Menu[i].Menu.HideMenu();
        }
        this.Owner.ItemsChanged();
        break;
      }
    }
  }
  return true;
}

function ngmb_DeleteItem(idx)
{
  if((typeof this.Menu==='object')&&(this.Menu)&&(idx>=0)&&(idx<this.Menu.length))
  {
    var c=this.Menu[idx];
    this.Menu.splice(idx,1);
    this.Items.splice(idx,1);
    for(var i=idx;i<this.Menu.length;i++)
    {
      m=this.Menu[i].Menu;
      if(m) m.HideMenu();
    }
    if(c) c.Dispose();
    this.ItemsChanged();
  }
}

function ngmb_HideSubMenu()
{
  if((typeof this.Menu==='object')&&(this.Menu))
  {
    var m;
    for(var i=0;i<this.Menu.length;i++)
    {
      m=this.Menu[i].Menu;
      if(m) m.HideMenu();
    }
  }
}

function ngmb_ItemsChanged()
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

function ngmb_CheckUpdate(o)
{
  if((this.update_cnt>0)||(this.ID=='')) { this.need_update=true; return false; }
  this.need_update=false;
  return true;
}

function ngmb_DoItemsChanged()
{
  if(this.update_cnt > 0) this._items_changed = true;
  else if(this.OnItemsChanged) this.OnItemsChanged(this,this.Items);
}

function ngmb_BeginUpdate(recursive)
{
  this.update_cnt++;
  if((typeof this.Menu==='object')&&(this.Menu))
  {
    recursive=ngVal(recursive,true);
    var m;
    for(var i=0;i<this.Menu.length;i++)
    {
      m=this.Menu[i].Menu;
      if(m) m.BeginUpdate(recursive);
    }
  }
}

function ngmb_EndUpdate()
{
  if(this.update_cnt>0) {
    if((typeof this.Menu==='object')&&(this.Menu))
    {
      var m;
      for(var i=0;i<this.Menu.length;i++)
      {
        m=this.Menu[i].Menu;
        if(m) m.EndUpdate();
      }
    }
  }
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

function ngmb_ScanMenu(fnc, recursive, parent, userdata)
{
  if(typeof fnc !== 'function') return false;
  recursive=ngVal(recursive,true);

  if((parent)&&(typeof parent==='object')) {
    if(parent.MenuItem) parent=parent.MenuItem;
    if(parent.SubMenu) {
      if(!parent.SubMenu.ScanMenu(fnc, recursive, null, userdata)) return false;
    }
    return true;
  }

  if(typeof this.Items !== 'undefined') {
    var it;
    for(var i=0;i<this.Items.length;i++)
    {
      it=this.Items[i];
      if(typeof it === 'undefined') continue;
      if(!fnc(this, it, this, userdata)) return false;
      if((it.SubMenu)&&(recursive))
      {
        if(!it.SubMenu.ScanMenu(fnc, true, null, userdata)) return false;
      }
    }
  }
  return true;
}


// --- ngMenuBar ngButton ------------------------------------------------------

function ngmbb_ButtonEnterMenu()
{
  var p=this.Menu;
  if((typeof p==='object')&&(p)&&(this.Enabled)&&(!this.ReadOnly))
  {
    if(p.Visible) return;

    while(p)
    {
      if(p.CtrlType == 'ngToolBar')
      {
        var mv=false;
        var m,cc=p.ChildControls;
        if(typeof cc !== 'undefined')
        {
          for(var i=0;i<cc.length;i++)
          {
            m=(typeof p.ChildControls[i].Menu === 'object' ? p.ChildControls[i].Menu : null);
            if(m)
            {
              mv=(mv)||(m.Visible);
              if(m!=this.Menu) m.SetVisible(false);
            }
          }
        }
        break;
      }
      p=p.Owner;
    }

    if((!this.Menu.Visible)&&((mv)||(ngVal(this.AutoPopup,false)))&&(this.Menu.Items.length)) {
      this.Menu.PopupCtrl(this);
    }
  }
}

// --- ngSplitButton -----------------------------------------------------------

function ngmnb_SetControlVisible(v)
{
  var m=this.Menu;
  if((typeof m==='object')&&(m))
  {
    if(!v)
    {
      m.AutoPopup=true;
      m.HideMenu();
    }
  }
}

function ngsbtn_SetMenuVisible(m,v)
{
  var p=m.Owner;
  if((p)&&(typeof p.GetImg === 'function'))
  {
    ngc_ChangeImg(p.ID+'_IR', v, p.Enabled, p.GetImg(2));
  }
  return true;
}

function ngsbtn_Click(e)
{
  var m=this.Menu;
  if((typeof m==='object')&&(m))
  {
    if(m.Visible)
    {
      m.AutoPopup=true;
      m.HideMenu();
    }
  }
  return true;
}

function ngsbtn_DoMenuClick(b)
{
  var m=this.Menu;
  if((typeof m==='object')&&(m)&&(this.Enabled))
  {
    if((this.OnMenuClick)&&(!ngVal(this.OnMenuClick(this,m),false))) return;
    if(m.Visible)
    {
      m.AutoPopup=true;
      m.HideMenu();
    }
    else
    {
      var mw=ngVal(m.MinWidth,100);
      var cw=ng_OuterWidth(this.Elm());
      if((cw>0)&&(mw<cw)) m.MinWidth=cw;
      m.PopupCtrl(this);
    }
  }
}

function ngsbtn_DoPtrClick(pi)
{
  if(pi.EventID==='menu') this.DoMenuClick(this);
}

function ngsbtn_DoUpdate(o)
{
  var m=this.Menu;
  if((typeof m==='object')&&(m))
  {
    var oi=document.getElementById(this.ID+'_IR')
    if(oi)
    {
      ngc_ChangeImg(this.ID+'_IR', m.Visible, this.Enabled, this.GetImg(2));

      // Modify standard ngButton
      var p=oi.parentNode;
      if(p)
      {
        var p2=p.parentNode;
        if(p2)
        {
          var p3=p2.parentNode;
           var w=ng_OuterWidth(p2)-ng_ClientWidth(oi);
           ng_SetStyleWidth(p2,w);
          p.removeChild(oi);
          p3.appendChild(oi);
          ngc_PtrListener(this, oi, 'menu', 'tap');
          oi.style.zIndex=2;
          var cursor='';
          if(this.Enabled)
          {
            if(typeof this.Cursor !== 'undefined')
            {
              cursor=this.Cursor;
            }
            else cursor='pointer';
          }
          else cursor='default';
          try { oi.style.cursor=cursor; } catch(e) { }
        }
      }
    }
  }
  return true;
}

// --- ngControl Menu ----------------------------------------------------------

function ngmnb_SetMenuVisible(m,v)
{
  var p=m.Owner;
  if(typeof p.Check === 'function') p.Check(v);
  return true;
}

function ngmn_DefaultClick(e)
{
  var m=this.Menu;
  if((typeof m==='object')&&(m))
  {
    if(m.Visible)
    {
      if(typeof m.HideMenu === 'function') {
        m.AutoPopup=true;
        m.HideMenu();
      }
    }
    else if((this.Enabled)&&(typeof m.PopupCtrl === 'function')) m.PopupCtrl(this);
  }
}

function ngmn_DoMenuDispose()
{
  var m=this.Menu;
  if((typeof m==='object')&&(m)&&(typeof m.Dispose === 'function'))
    m.Dispose();
  return true;
}

function ngmn_DoControlDispose()
{
  var oc=this.Owner;
  if((oc)&&(oc!=this)) ng_SetControlMenu(oc,null);
  return true;
}

function ngmn_PopupMouseMenu(e)
{
  if (!e) e = window.event;
  if(e.button != 2) return true;
  var c=ngGetControlById(this.id);
  if((!c)||(!c.PopupMenu)||(!ngVal(c.Enabled,true))) return true;

  var pos=ngc_DoGetPointerPos(null,e,null);
  if(typeof pos.x === 'undefined') return true;
  var mpos=ng_ParentPosition(ngApp ? ngApp.TopElm() : document.body);
  pos.x-=mpos.x;
  pos.y-=mpos.y;
  if((c.OnPopupMenu)&&(!ngVal(c.OnPopupMenu(c, c.PopupMenu, e, pos),false))) return true;
  c.PopupMenu.Popup(pos.x,pos.y);

  if(e.stopPropagation) e.stopPropagation();
  else e.cancelBubble = true;
  ngc_ptrevignore(e);
  return true;
}

function ngmn_DoPopupAttach(elm)
{
  if(!elm) return;
  elm.oncontextmenu = ngmn_DisableContextMenu;

  if(elm.ngAddEvent) return;
  elm.ngAddEvent = ngObjAddEvent;

  if(ngHammerJS()) // HammerJS library is present
  {
    Hammer.event.bindDom(elm, Hammer.EVENT_TYPES[Hammer.EVENT_START], ngmn_PopupMouseMenu);
  }
  else
  {
    if (window.navigator.msPointerEnabled)
      elm.addEventListener("MSPointerDown", ngmn_PopupMouseMenu, false);
    else
      elm.ngAddEvent('onmousedown',ngmn_PopupMouseMenu);
  }
}

function ngmn_DoAcceptGestures(o,gestures)
{
  gestures.hold=true;
}

function ngmn_DoGesture(pi)
{
  if(pi.Gesture==='hold')
  {
    var valign,halign;
    var pm=this.PopupMenu;
    if(pm) {
      if((pi.Touch)&&(typeof pm.MenuVAlign==='undefined')&&(typeof pm.MenuHAlign==='undefined')) {
        valign='bottom';
        halign='center';
      }
      if((this.OnPopupMenu)&&(!ngVal(this.OnPopupMenu(this, pm, pi.Event, {x:pi.X,y:pi.Y}),false))) return true;
      pm.Popup(pi.X,pi.Y,halign,valign);
      return true;
    }
  }
  return false;
}

function ngmn_DoPopupDispose()
{
  var m=this.PopupMenu;
  if((typeof m==='object')&&(m)&&(typeof m.Dispose === 'function'))
    m.Dispose();
  return true;
}

function ngmn_DoPopupControlDispose()
{
  var oc=this.Owner;
  if((oc)&&(oc!=this)) ng_SetControlPopup(oc,null);
  return true;
}

function ngmn_SetPopupControlVisible(v)
{
  var m=this.PopupMenu;
  if((typeof m==='object')&&(m))
  {
    if(!v)
    {
      m.AutoPopup=true;
      m.HideMenu();
    }
  }
}

/**
 *  Function: ng_SetControlMenu
 *  Assigns <ngMenu> to control.
 *
 *  Syntax:
 *    void *ng_SetControlMenu* (object ctrl, object menu)
 *
 *  Parameters:
 *    ctrl - control to which is menu assigned
 *    menu - <ngMenu> control or null
 *
 *  Returns:
 *    -
 *
 *  Notes:
 *    Control must support OnClick event.
 *    If menu is assigned, the reference is stored in Menu property in control.
 */
function ng_SetControlMenu(c,m)
{
  if(!c) return;
  m=ngVal(m,null);
  var om=ngVal(c.Menu,null);
  if(om == m) return;
  var mb=ngVal(c.SplitButton,false);
  if(om) // unregister old
  {
    if(typeof om.HideMenu === 'function') om.HideMenu();
    if(!m)
    {
      c.RemoveEvent('SetVisible',ngmnb_SetControlVisible);
      c.RemoveEvent('SetEnable',ngmnb_SetControlVisible);
      c.RemoveEvent('DoDispose',ngmn_DoMenuDispose);
      if(c.OnClick == ngmn_DefaultClick) c.OnClick=null;
    }

    var oc=ngVal(om.Owner,null);
    if(oc==c)
    {
      om.Owner=null;
      if(mb) om.RemoveEvent('OnSetVisible',ngsbtn_SetMenuVisible);
      else   om.RemoveEvent('OnSetVisible',ngmnb_SetMenuVisible);
    }
    om.RemoveEvent('DoDispose',ngmn_DoControlDispose);
  }
  c.Menu = m;
  if(m) // register new
  {
    var oc=m.Owner;
    if((oc)&&(oc!=c)) ng_SetControlMenu(oc,null);

    m.Owner=c;
    if(!om)
    {
      c.AddEvent('SetVisible',ngmnb_SetControlVisible);
      c.AddEvent('SetEnable',ngmnb_SetControlVisible);
      c.AddEvent('DoDispose',ngmn_DoMenuDispose);

      if((typeof c.OnClick !== 'undefined')&&(!c.OnClick)&&(!mb))
        c.OnClick=ngmn_DefaultClick;
    }
    if(mb) m.AddEvent('OnSetVisible',ngsbtn_SetMenuVisible);
    else   m.AddEvent('OnSetVisible',ngmnb_SetMenuVisible);
    m.AddEvent(ngmn_DoControlDispose,'DoDispose');
  }
}

// --- ngApplication Popupmenu -------------------------------------------------
var nga_popup_initialized = false;

function nga_DoPopupMenuStart(e)
{
  if (!e) e = window.event;
  ngCurrentAppPopupMenu=null;
  var appmenu=((e.button == 2)&&(typeof ngApp === 'object')&&(typeof ngApp.PopupMenu === 'object')&&(ngApp.PopupMenu) ? ngApp.PopupMenu : null);
  if((appmenu)&&((!ngCurrentPopupMenu)||(ngCurrentPopupMenu==appmenu)))
  {
    ngCurrentAppPopupMenu=appmenu;
  }
  return true;
}

function nga_DoPopupMenu(e)
{
  if (!e) e = window.event;
  if(ngCurrentAppPopupMenu)
  {
    var pos=ngc_DoGetPointerPos(null,e,null);
    if(typeof pos.x === 'undefined') return true;
    var mpos=ng_ParentPosition(ngApp ? ngApp.TopElm() : document.body);
    pos.x-=mpos.x;
    pos.y-=mpos.y;

    var timer=setTimeout(function() {
      clearTimeout(timer);
      var menu=ngCurrentAppPopupMenu;
      ngCurrentAppPopupMenu=null;
      if((menu)&&(typeof menu.Popup === 'function'))
      {
        ngCurrentAppPopupMenu=null;
        if(e.preventDefault) e.preventDefault();
        menu.Popup(pos.x,pos.y);
      }
    },10);
  }
  return true;
}

function nga_DoPopupMenuTouch(e)
{
  if(((e.type!=='hold')&&(e.type!=='touch'))||(e.gesture.pointerType===Hammer.POINTER_MOUSE)||(e.ngGestureHandled)||(typeof ngApp !== 'object')||(typeof ngApp.PopupMenu !== 'object')||(!ngApp.PopupMenu)) return;
  if(e.type==='touch')
  {
    ngCurrentAppPopupMenu=((!ngCurrentPopupMenu)||(ngCurrentPopupMenu==ngApp.PopupMenu) ? ngApp.PopupMenu : null);
  }
  else
  {
    if(ngCurrentAppPopupMenu)
    {
      var timer=setTimeout(function() {
        clearTimeout(timer);
        var pm=ngCurrentAppPopupMenu;
        ngCurrentAppPopupMenu=null;
        if((pm)&&(typeof pm.Popup === 'function'))
        {
          var mx=e.gesture.center.pageX;
          var my=e.gesture.center.pageY;
          if((typeof pm.MenuVAlign==='undefined')&&(typeof pm.MenuHAlign==='undefined')) {
            valign='bottom';
            halign='center';
          }
          pm.Popup(mx,my,halign,valign);
        }
      },10);
    }
  }
}

function nga_SetPopupMenu(m)
{
  var om=ngVal(this.PopupMenu,null);
  if(om==m) return;
  if(om)
  {
    if(typeof om.HideMenu === 'function') om.HideMenu();
    om.Owner = null;
  }
  this.PopupMenu = m;
  if(m)
  {
    m.Owner = this;

    if(!nga_popup_initialized)
    {
      if(ngHammerJS()) // HammerJS library is present
      {
        Hammer.event.bindDom(document, Hammer.EVENT_TYPES[Hammer.EVENT_START], nga_DoPopupMenuStart);
        Hammer.event.bindDom(document, Hammer.EVENT_TYPES[Hammer.EVENT_END], nga_DoPopupMenu);

        nga_popup_hammer=Hammer(document, { prevent_mouseevents: true, hold_threshold: 10 });
        nga_popup_hammer.on("hold touch", nga_DoPopupMenuTouch);
      }
      else
      {
        if (window.navigator.msPointerEnabled) {
          document.addEventListener("MSPointerDown", nga_DoPopupMenuStart, false);
          document.addEventListener("MSPointerUp", nga_DoPopupMenu, false);
        }
        else
        {
          document.onmousedown = ngAddEvent(nga_DoPopupMenuStart, document.onmousedown);
          document.onmouseup = ngAddEvent(nga_DoPopupMenu, document.onmouseup);
        }
      }
      nga_popup_initialized = true;
    }
    if(!document.oncontextmenu) document.oncontextmenu = ngmn_DisableContextMenu;
  }
  else
  {
    if(document.oncontextmenu == ngmn_DisableContextMenu) document.oncontextmenu=null;
  }
}

/**
 *  Function: ng_SetControlPopup
 *  Assigns popup <ngMenu> to control.
 *
 *  Syntax:
 *    void *ng_SetControlPopup* (object ctrl, object menu)
 *
 *  Parameters:
 *    ctrl - control to which is popup menu assigned
 *    menu - <ngMenu> control or null
 *
 *  Returns:
 *    -
 *
 *  Notes:
 *    If menu is assigned, the reference is stored in PopupMenu property in control.
 */
function ng_SetControlPopup(c,m)
{
  if(!c) return;
  m=ngVal(m,null);
  var om=ngVal(c.PopupMenu,null);
  if(om == m) return;
  if(om) // unregister old
  {
    if(typeof om.HideMenu === 'function') om.HideMenu();
    if(!m)
    {
      c.RemoveEvent('SetVisible',ngmn_SetPopupControlVisible);
      c.RemoveEvent('SetEnable',ngmn_SetPopupControlVisible);
      c.RemoveEvent('DoAttach',ngmn_DoPopupAttach);
      c.RemoveEvent('DoAcceptGestures',ngmn_DoAcceptGestures);
      c.RemoveEvent('DoGesture',ngmn_DoGesture);
      c.RemoveEvent('DoDispose',ngmn_DoPopupDispose);
    }
    om.RemoveEvent('DoDispose',ngmn_DoPopupControlDispose);
    var oc=ngVal(om.Owner,null);
    if(oc==c) om.Owner=null;
  }
  c.PopupMenu = m;
  if(m) // register new
  {
    var oc=m.Owner;
    if((oc)&&(oc!=c)) ng_SetControlPopup(oc,null);

    m.Owner=c;
    if(!om)
    {
      c.AddEvent('SetVisible',ngmn_SetPopupControlVisible);
      c.AddEvent('SetEnable',ngmn_SetPopupControlVisible);
      c.AddEvent('DoAttach',ngmn_DoPopupAttach);
      c.AddEvent('DoAcceptGestures',ngmn_DoAcceptGestures);
      c.AddEvent('DoGesture',ngmn_DoGesture);
      c.AddEvent('DoDispose',ngmn_DoPopupDispose);
    }
    m.AddEvent(ngmn_DoPopupControlDispose,'DoDispose');
  }
}

// --- Controls Registration ---------------------------------------------------
/*
 *  Class: ngListItem (in context of ngMenu)
 *  This class implements <ngList> item.
 *
 *  See also:
 *    <ngMenu>, <ngList>
 */
/*
 *  Group: Properties
 */
/*  Variable: SubMenu
 *  References to sub menu <ngMenu> control.
 *  Type: object
 *  Default value: *undefined*
 */
//c.SubMenu = undefined;
/*
 *  Group: Events
 */
/*
 *  Event: OnMenuClick
 */
// c.OnMenuClick = null;
/*
 *  Event: OnGetText
 */
// c.OnGetText = null;

/*  Class: ngMenu
 *  Menu control (based on <ngList>).
 */
/*<>*/
function Create_ngMenu(def, ref, parent)
{
  var c=ngCreateControlAsType(def, 'ngList', ref, parent);
  if(!c) return c;

  /*
   *  Group: Properties
   */

  /*  Variable: MenuHAlign
   *  Horizonal align of menu to popup position.
   *  Type: string
   *  Default value: *'left'*
   */
  //c.MenuHAlign = 'left';
  /*  Variable: MenuVAlign
   *  Vertical align of menu to popup position.
   *  Type: string
   *  Default value: *'top'*
   */
  //c.MenuVAlign = 'top';
  /*  Variable: MaxHeight
   *  Meximal height of the menu.
   *  Type: integer
   *  Default value: *ScreenHeight-10*
   */
  //c.MaxHeight = ScreenHeight-10;
  /*  Variable: MinWidth
   *  Minimal width of the menu.
   *  Type: integer
   *  Default value: *100*
   */
  //c.MinWidth = 100;
  /*  Variable: MinScreenIndent;
   *  Minimal menu distance from screen edge.
   *  Type: integer
   *  Default value: *5*
   */
  //c.MinScreenIndent = 5;

  /*  Variable: SubMenuDef
   *  Specifies definition which is used in case of submenu creation.
   *  Type: object
   *  Default value: *same as menu*
   */
//  c.SubMenuDef={ Type: c.Type };

  /*  Variable: SubMenuOverlapX
   *  Specifies how much submenu overlaps menu in horizontal in pixels.
   *  Type: integer
   *  Default value: *5*
   */
  //c.SubMenuOverlapX = 5;
  /*  Variable: SubMenuOverlapY
   *  Specifies how much submenu overlaps menu in vertical in pixels.
   *  Type: integer
   *  Default value: *0*
   */
  //c.SubMenuOverlapY = 0;

  /*  Variable: ActiveSubMenu
   *  Reference to active submenu.
   *  Type: object
   *  Default value: *undefined*
   */
  //c.ActiveSubMenu = undefined;

  /*  Variable: AutoPopup
   *  If true the menu handles its visibility by itself.
   *  Type: bool
   *  Default value: *undefined*
   */
  //c.AutoPopup = undefined;
  /*  Variable: PopupX
   *  Horizontal popup position in pixels.
   *  Type: integer
   *  Default value: *undefined*
   */
  //c.PopupX = undefined;
  /*  Variable: PopupY
   *  Vertical popup position in pixels.
   *  Type: integer
   *  Default value: *undefined*
   */
  //c.PopupY = undefined;
  /*  Variable: PopupElm
   *  Element to which menu was aligned during popup.
   *  Type: integer
   *  Default value: *undefined*
   */
  //c.PopupElm = undefined;

  c.ShowCheckboxes = true;
  c.ShowHeader = false;
  c.PopupGroup='menu';
  c.DoPopup = ngmn_DoPopup;
  c.IsInsidePopup = ngmn_IsInsidePopup;
  /*
   *  Group: Methods
   */
  /*  Function: Popup
   *  Popups menu at specified position.
   *
   *  Syntax:
   *    void *Popup* (integer x, integer y [, string halign, string valign])
   *
   *  Returns:
   *    -
   */
  c.Popup = ngmn_Popup;
  /*  Function: PopupCtrl
   *  Popups menu along specified control.
   *
   *  Syntax:
   *    void *PopupCtrl* (object ctrl [, string halign, string valign])
   *
   *  Returns:
   *    -
   */
  c.PopupCtrl = ngmn_PopupCtrl;
  /*  Function: PopupSubMenu
   *  Popups menu as submenu along specified element.
   *
   *  Syntax:
   *    void *PopupSubMenu* (object elm [, string halign, string valign])
   *
   *  Returns:
   *    -
   */
  c.PopupSubMenu = ngmn_PopupSubMenu;

  /*  Function: ShowSubMenu
   *  Shows item submenu.
   *
   *  Syntax:
   *    void *ShowSubMenu* (object item)
   *
   *  Returns:
   *    -
   */
  c.ShowSubMenu = ngmn_ShowSubMenu;
  /*  Function: GetMenuItemByID
   *  Gets menu item by given ID.
   *
   *  Syntax:
   *    void *GetMenuItemByID* (string id [,bool recursive=true])
   *
   *  Returns:
   *    -
   */
  c.GetMenuItemByID = ngmn_GetMenuItemByID;
  /*  Function: ScanMenu
   *  Recursive scan items in menu and its submenus.
   *
   *  Syntax:
   *    int *ScanMenu* (function scanfnc [, recursive=true, object parent=null, mixed userdata])
   *
   *  Returns:
   *    -
   */
  c.ScanMenu = ngmn_ScanMenu;
  /*  Function: GetMenu
   *  Gets (or creates) menu item.
   *
   *  Syntax:
   *    void *GetMenu* (string path[, bool create=false, object parent=null, function oncreatefnc, mixed userdata])
   *
   *  Returns:
   *    -
   */
  c.GetMenu = ngmn_GetMenu;
  /*  Function: MenuClick
   *  Clicks the menu item.
   *
   *  Syntax:
   *    void *MenuClick* (it [, event ev])
   *
   *  Parameters:
   *
   *  Returns:
   *    -
   */
  c.MenuClick = ngmn_MenuClick;

  /*  Function: CreateSubMenu
   *  Creates item submenu.
   *
   *  Syntax:
   *    object *CreateSubMenu* (object item, object submenudata)
   *
   *  Returns:
   *    -
   */
  c.CreateSubMenu = ngmn_CreateSubMenu;
  /*  Function: HideSubMenu
   *  Hides opened submenu.
   *
   *  Syntax:
   *    void *HideSubMenu* ()
   *
   *  Returns:
   *    -
   */
  c.HideSubMenu = ngmn_HideSubMenu;

  /*  Function: HideMenu
   *  Hides menu (and all superior or child menus with AutoPopup=true).
   *
   *  Syntax:
   *    void *HideMenu* (void)
   *
   *  Returns:
   *    -
   */
  c.HideMenu = ngmn_HideMenu;
  /*  Function: BeginUpdate
   *  Prevents the updating of the menu until the <EndUpdate> method is called.
   *
   *  Syntax:
   *    void *BeginUpdate* (bool recursive=true)
   *
   *  Returns:
   *    -
   */
  c.ListBeginUpdate = c.BeginUpdate;
  c.BeginUpdate = ngmn_BeginUpdate;
  /*  Function: EndUpdate
   *  Performs the repaints deferred by a call to <BeginUpdate>.
   *
   *  Syntax:
   *    void *EndUpdate* ()
   *
   *  Returns:
   *    -
   */
  c.ListEndUpdate = c.EndUpdate;
  c.EndUpdate = ngmn_EndUpdate;
  c.update_info = new Array();
  /*  Function: GetScreenRect
   *  Gets menu allowed screen rectangle (used for proper menu alignment).
   *
   *  Syntax:
   *    object *GetScreenRect* ()
   *
   *  Returns:
   *    The screen rectangle { Left:, Top:, Right:, Bottom: }
   */
  c.GetScreenRect = ngmn_GetScreenRect;

  c.AddEvent(ngmn_DoCreate, 'DoCreate');
  c.AddEvent(ngmn_OnEnterRow,'OnEnterRow');
  c.AddEvent(ngmn_OnLeaveRow,'OnLeaveRow');
  c.AddEvent(ngmn_SetVisible,'SetVisible');
  c.AddEvent(ngmn_OnEnter,'OnMouseEnter');
  c.AddEvent('OnAdd',ngmn_OnAdd);
  c.AddEvent('OnRemove',ngmn_OnRemove);
  c.AddEvent('OnKeyDown',ngmn_OnKeyDown);
  c.AddEvent('OnScroll',ngmn_OnScroll);
  c.AddEvent('DoAttach',ngmn_DoAttach);
  c.AddEvent(ngmn_Update,'Update');
  c.AddEvent('DoDispose',ngmn_DoDispose);

  c.OnGetText = ngmn_MenuText;

  c.DefaultDrawItemText=c.DrawItemText;
  c.DrawItemText = ngmn_DrawItemText;

  /*
   *  Group: Events
   */
  /*
   *  Event: OnPopup
   */
  c.OnPopup = null;
  /*
   *  Event: OnPopupMenu
   */
  c.OnPopupMenu = null;
  /*
   *  Event: OnDrawSeparator
   */
  c.OnDrawSeparator = null;
  /*
   *  Event: OnHideSubMenu
   */
  c.OnHideSubMenu = null;
  /*
   *  Event: OnMenuClick
   */
  c.OnMenuClick = null;
  /*
   *  Event: OnClickOutside
   */
  c.OnClickOutside = null;
  /*
   *  Event: OnSubMenuCreated
   */
  //c.OnSubMenuCreated = null;
  /*
   *  Event: OnGetScreenRect
   */
  c.OnGetScreenRect = null;

  c.Visible=false;

  if(def.style) c.zIndex=def.style.zIndex;

  return c;
}

/*  Class: ngMenuBar
 *  Menu bar control (based on <ngToolBar>).
 */
/*<>*/
function Create_ngMenuBar(def, ref, parent)
{
  var c=ngCreateControlAsType(def, 'ngToolBar', ref, parent);
  if(!c) return c;
  /*
   *  Group: Methods
   */
  /*  Function: BeginUpdate
   *  Prevents the updating of the menu until the <EndUpdate> method is called.
   *
   *  Syntax:
   *    void *BeginUpdate* (bool recursive=true)
   *
   *  Returns:
   *    -
   */
  c.BeginUpdate = ngmb_BeginUpdate;
  /*  Function: EndUpdate
   *  Performs the repaints deferred by a call to <BeginUpdate>.
   *
   *  Syntax:
   *    void *EndUpdate* ()
   *
   *  Returns:
   *    -
   */
  c.EndUpdate = ngmb_EndUpdate;

  /*  Function: AddItem
   *  Adds new menu item at the end of the menu.
   *
   *  Syntax:
   *    control *AddItem* (mixed item)
   *
   *  Returns:
   *    Created control (ngButton).
   */
  c.AddItem = ngmb_AddItem;
  /*  Function: InsertItem
   *  Inserts new menu item at the position specified by index.
   *
   *  Syntax:
   *    control *InsertItem* (int index, mixed item)
   *
   *  Returns:
   *    Created control (ngButton).
   */
  c.InsertItem = ngmb_InsertItem;
  /*  Function: DeleteItem
   *  Removes item at specified index from menu bar.
   *
   *  Syntax:
   *    void *DeleteItem* (int index)
   *
   *  Returns:
   *    -
   */
  c.DeleteItem = ngmb_DeleteItem;
  /*  Function: ClearItems
   *  Deletes all items from the menu bar.
   *
   *  Syntax:
   *    void *ClearItems* ()
   *
   *  Returns:
   *    -
   */
  c.ClearItems = ngmb_ClearItems;
  /*  Function: SetItems
   *  Sets menu bar items.
   *
   *  Syntax:
   *    void *SetItems* (array items)
   *
   *  Returns:
   *    -
   */
  c.SetItems = ngmb_SetItems;
  /*  Function: HideSubMenu
   *  Hides opened submenu.
   *
   *  Syntax:
   *    void *HideSubMenu* ()
   *
   *  Returns:
   *    -
   */
  c.HideSubMenu = ngmb_HideSubMenu;
  /*  Function: ScanMenu
   *  Recursive scan items in menu and its submenus.
   *
   *  Syntax:
   *    int *ScanMenu* (function scanfnc [, recursive=true, object parent=null, mixed userdata])
   *
   *  Returns:
   *    -
   */
  c.ScanMenu = ngmb_ScanMenu;
  /*  Function: GetMenu
   *  Gets (or creates) menu item.
   *
   *  Syntax:
   *    void *GetMenu* (string path[, bool create=false, object parent=null, function oncreatefnc, mixed userdata])
   *
   *  Returns:
   *    -
   */
  c.GetMenu = ngmn_GetMenu;

  c.ItemsChanged = ngmb_ItemsChanged;
  c.DoItemsChanged = ngmb_DoItemsChanged;

  c.update_cnt=0;
  c.need_update=false;
  c.AddEvent(ngmb_CheckUpdate, 'OnUpdate');

  c.AddEvent(ngmb_DoCreate, 'DoCreate');
  /*
   *  Group: Definition
   */
  /*  Variable: ButtonDef
   *  Definition of menubar buttons.
   *  Type: object
   */

  /*
   *  Group: Properties
   */
  /*  Variable: Menu
   *  References to assigned <ngMenu> controls.
   *  Type: array
   */
  c.Menu = new Array();

  /*  Variable: Items
   *  Menu items from which menu buttons were created.
   *  Type: array
   */
  c.Items = new Array();

  /*
   *  Group: Events
   */
  /*
   *  Event: OnItemsChanged
   */
  c.OnItemsChanged = null;
  return c;
}

/*  Class: ngMenuBarButton
 *  Button for menu representation in menu bar control (based on <ngButton>).
 */
/*<>*/
function Create_ngMenuBarButton(def, ref, parent)
{
  var c=ngCreateControlAsType(def, 'ngButton', ref, parent);
  if(!c) return c;
//  c.AddEvent('OnMouseLeave',ngmbb_ButtonLeaveMenu);
  c.AddEvent('OnMouseEnter',ngmbb_ButtonEnterMenu);
  /*
   *  Group: Properties
   */

  /*  Variable: AutoPopup
   *  If TRUE the menu is automaticaly poped up when mouse enters the button.
   *  Type: bool
   *  Default value: *false*
   */
  c.AutoPopup=false;
  return c;
}

/*  Class: ngSplitButton
 *  Button with menu dropdown (based on <ngButton>).
 */
/*<>*/
function Create_ngSplitButton(def, ref, parent)
{
  /*
   *  Group: Properties
   */
  /*  Variable: SplitButton
   *  Determines that button is a split button (for detection).
   *  Type: bool
   *  Default value: *true*
   */
  if(typeof def.Data === 'undefined') def.Data=new Object;
  def.Data.SplitButton=true;
  var c=ngCreateControlAsType(def, 'ngButton', ref, parent);
  if(!c) return c;
  c.AddEvent('DoUpdate',ngsbtn_DoUpdate);
  c.AddEvent('DoPtrClick',ngsbtn_DoPtrClick);
  c.AddEvent(ngsbtn_Click,'Click');
  c.DoMenuClick = ngsbtn_DoMenuClick;
  /*
   *  Group: Events
   */
  /*
   *  Event: OnMenuClick
   */
  if(typeof c.OnMenuClick === 'undefined') c.OnMenuClick = null;
  return c;
}

if(typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['menu'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnControlCreated: function(def,c) {

    if(c.InDesignMode) return;

    /*
     *  Class: ngControl
     *  Extensions of ngControl definition.
     */
    /*
     *  Group: Definition
     */
    /*  Variable: Menu
     *  Defines ngMenu control which will be opened on control OnClick event.
     *  Type: object
     */
    // c.Menu = { }
    if((typeof def.Menu === 'object')&&(c.CtrlType!='ngToolBar')&&(typeof c.Menu === 'undefined'))
    {
      var ldefs={Control: def.Menu };
      var lref=ngCreateControls(ldefs,undefined,((typeof ngApp === 'object')&&(ngApp) ? ngApp.TopElm() : undefined));
      ng_SetControlMenu(c,lref.Control);
    }
    /*  Variable: PopupMenu
     *  Defines ngMenu control which opens on right mouse click on control.
     *  Type: object
     */
    // c.PopupMenu = { }
    if((typeof def.PopupMenu === 'object')&&(typeof c.PopupMenu === 'undefined'))
    {
      var ld=def.PopupMenu;
      if(typeof ld.Data === 'undefined') ld.Data = new Object;
      var ldefs={Control: ld };
      var lref=ngCreateControls(ldefs,undefined,((typeof ngApp === 'object')&&(ngApp) ? ngApp.TopElm() : undefined));
      ng_SetControlPopup(c, lref.Control);
    }
  },

  OnInit: function() {
    ngRegisterControlType('ngMenu', Create_ngMenu);
    ngRegisterControlType('ngMenuBar', Create_ngMenuBar);
    ngRegisterControlType('ngMenuBarButton', Create_ngMenuBarButton);
    ngRegisterControlType('ngSplitButton', Create_ngSplitButton);

    if((typeof ngApp === 'object')&&(ngApp))
    {
      ngApp.Menu = null;
      ngApp.SetPopupMenu = nga_SetPopupMenu;
    }
  }
};
