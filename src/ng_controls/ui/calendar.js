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
 *  Group: Calendar 
 */

// --- ngCalendar --------------------------------------------------------------

var ngcalSelectNone = 0;
var ngcalSelectSingle = 1;
var ngcalSelectMulti = 2;
var ngcalSelectMultiExt = 3;
var ngcalSelectRange = 4;

function ngcal_DateStrKey(d) {
  return d ? ''+d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate() : '';
}

function ngcal_SetMonth(date) {
  var changed=(this.CurrentDate.getMonth()!=date.getMonth());
  this.CurrentDate=date;
  if(changed) this.UpdateCalendar();
  return changed;
}

function ngcal_NextMonth(changeyear)
{
  var y,m,s;

  s=this.CurrentDate;
  y = s.getFullYear();
  m = s.getMonth()+1;
  if(m>11) { m=0; if(ngVal(changeyear,true)) y++; }
  this.CurrentDate = new Date(y,m,1);
  this.UpdateCalendar();
}

function ngcal_PrevMonth(changeyear)
{
  var y,m,s;

  s=this.CurrentDate;
  y = s.getFullYear();
  m = s.getMonth()-1;
  if(m<0) { m=11; if(ngVal(changeyear,true)) y--; }
  this.CurrentDate = new Date(y,m,1);
  this.UpdateCalendar();
}

function ngcal_NextYear()
{
  var y,m,s;

  s=this.CurrentDate;
  y = s.getFullYear()+1;
  m = s.getMonth();
  this.CurrentDate = new Date(y,m,1);
  this.UpdateCalendar();
}

function ngcal_PrevYear()
{
  var y,m,s;

  s=this.CurrentDate;
  y = s.getFullYear()-1;
  m = s.getMonth();
  this.CurrentDate = new Date(y,m,1);
  this.UpdateCalendar();
}

function ngcal_IsDayEnabled(date)
{
  var enabled=true;
  if((this.MinDate)&&(date<this.MinDate)) enabled=false;
  if((enabled)&&(this.MaxDate)&&(date>this.MaxDate)) enabled=false;
  if((enabled)&&(ngVal(this.BlockedDates[date],false))) enabled=false;
  if((enabled)&&(ngVal(this.BlockedDates[ngcal_DateStrKey(date)],false))) enabled=false;
  if((enabled)&&(ngVal(this.BlockedWeekDays[date.getDay()],false))) enabled=false;
  if(this.OnIsDayEnabled) enabled=this.OnIsDayEnabled(this, date, enabled);
  return enabled;
}

var ngcal_CurrentDay='';

function ngcal_DE(e, elm)
{
  if(!e) e=window.event;
  if((ngUsingTouch)&&(e)&&(e.type.toLowerCase().match(/mouse/))) return; // ignore mouse events if using touch

  if(ngcal_CurrentDay!='') 
  {
    var o=document.getElementById(ngcal_CurrentDay);
    ngcal_DL(e,o);
  }
  ngcal_CurrentDay=elm.id;
  var o=document.getElementById(elm.id);
  if(o)
  {
    var cn=o.className;
    var i=cn.indexOf('_Focus');
    if(i<0) cn=cn+'_Focus';
    o.className=cn;
  }
  ngc_EnterImg(elm.id+'I');
}

function ngcal_DL(e, elm)
{
  if(!e) e=window.event;
  if((ngUsingTouch)&&(e)&&(e.type.toLowerCase().match(/mouse/))) return; // ignore mouse events if using touch

  if(ngcal_CurrentDay==elm.id) ngcal_CurrentDay='';
  var o=document.getElementById(elm.id);
  if(o)
  {
    var cn=o.className;
    var i=cn.indexOf('_Focus');
    if(i>=0) cn=cn.substring(0,i);
    o.className=cn; 
  }
  ngc_LeaveImg(elm.id+'I');
}

function ngcal_DayFromElmId(id)
{
  var cid='',row='',col='';
  var i=id.lastIndexOf('_D');
  if(i>=0)
  {
    cid=id.substring(0,i);
    var ii=ng_Expand2Id(id.substring(i+2,id.length));
    if(ii.id1!='') row=parseInt(ii.id1);
    if(ii.id2!='') col=parseInt(ii.id2);
  }
  return { id: cid, row: row, col: col };
}

function ngcal_MD(e,elm)
{
  if(!e) e=window.event;

  var ii=ngcal_DayFromElmId(elm.id);
  if((ii.id=='')||(ii.row=='')||(ii.col=='')) return;

  var c=ngGetControlById(ii.id, 'ngCalendar');
  if(!c) return;
    
  if(!c.Enabled) return;

  ii.row--;
  ii.col--;
  var date=c.DisplayedDates[ii.row*7+ii.col];
  e.cal=c;
  e.caldate=date;
  e.calrow=ii.row;
  e.calcol=ii.col;
  if((c.OnDayClick)&&(!ngVal(c.OnDayClick(e),false))) return;
  
  if(!c.SelectType) return;

  var shift=ngVal(e.shiftKey,false);
  var ctrl=ngVal(e.ctrlKey,false);

  // Handle select
  if((c.SelectType==3)&&(!ctrl)) // Single
    c.SelectedDates = new Array();

  if((c.CurrentDate.getMonth()!=date.getMonth())||(!c.IsDayEnabled(date))) return; // Select only enabled
  var changed=false;
  c.BeginUpdate();
  try {
    var s=(c.SelectType==ngcalSelectRange ? true : !(typeof c.SelectedDates[ngcal_DateStrKey(date)]!=='undefined'));
    if(((c.SelectType==2)||(c.SelectType==3))&&(shift)&&(c.last_selected!=null))
    {
      if(c.SelectType==3) s=true;
      var d=date,dk;
      if(d<=c.last_selected)
      {
        for(;d<=c.last_selected;)
        {
          dk=ngcal_DateStrKey(d);
          if((changed)||((typeof c.SelectedDates[dk]!=='undefined')!=s))
          {
            changed=true;
            if(s) c.SelectedDates[dk]=d;
            else delete c.SelectedDates[dk];
          }
          d.setDate(d.getDate()+1);
        }
      }
      else
      {
        for(;d>=c.last_selected;)
        {
          dk=ngcal_DateStrKey(d);
          if((changed)||((typeof c.SelectedDates[dk]!=='undefined')!=s))
          {
            changed=true;
            if(s) c.SelectedDates[dk]=d;
            else delete c.SelectedDates[dk];
          }
          d.setDate(d.getDate()-1);
        }
      }
    }
    else c.SelectDate(date,s,ctrl);
  }
  finally {
    if(changed) c.SelectChanged();
    c.EndUpdate();
  }
}

function ngcal_SelectChanged()
{
  if(this.OnSelectChanged) this.OnSelectChanged(this);
  this.UpdateCalendar();
}

function ngcal_ClearSelected()
{
  for(var i in this.SelectedDates)
  {    
    this.SelectedDates = new Array();
    this.last_selected = null; 
    this.SelectChanged();
    break;
  }
}

function ngcal_SelectDate(date, state, ctrl)
{
  if(this.SelectType==0) return;
  date=ngVal(date,null);
  if(!date) return;
  state=ngVal(state,true);
  date=ng_ExtractDate(date);

  if(this.SelectType==ngcalSelectRange)
  {
    if(!state) return;
    if(date<this.SelectFrom)    { this.SelectFrom=date; this.SelectChanged(); } 
    else if(date>this.SelectTo) { this.SelectTo=date;   this.SelectChanged(); }
    else
    {
      if(((this.SelectFrom-date)!=0)||((this.SelectTo-date)!=0))
      {
        this.SelectFrom=date;
        this.SelectTo=date;
        this.SelectChanged();
      }
    }
    return;
  }

  if((state)&&((this.SelectType==1)||((this.SelectType==3)&&(!ngVal(ctrl,false)))))
    this.SelectedDates = new Array();

  var dk=ngcal_DateStrKey(date);
  if((typeof this.SelectedDates[dk]!=='undefined')!=state)
  { 
    if(state) this.last_selected=date;
    if(state) this.SelectedDates[dk]=date;
    else delete this.SelectedDates[dk];
    this.SelectChanged();
  }  
  
  // Handle dropdown
  if(state)
  {
    var dd=ngVal(this.DropDownOwner,null);        
    if((dd)&&(this.SelectType==1))
    { 
      if(typeof dd.SetDate === 'function') dd.SetDate(date);
      else if(typeof dd.SetText === 'function') dd.SetText(this.FormatDate(date));
      if(dd.HideDropDown) dd.HideDropDown();
      dd.SetFocus();
    }
  }  
}

function ngcal_GetSelected()
{
  var items=new Array();
  if(this.SelectType==ngcalSelectRange)
  {
    items.push(this.SelectFrom);
    items.push(this.SelectTo);
  }
  else
  {
    for(var d in this.SelectedDates)
    {
      if(typeof this.SelectedDates[d]!=='undefined') items.push(this.SelectedDates[d]);
    }
  }
  return items;
}

function ngcal_SetSelected(dates)
{
  // Convert to array
  if((typeof dates === 'string')||(ng_typeDate(dates)))
  {
    var a=new Array();
    a[0]=dates;
    dates=a;
  }
  dates=ngVal(dates,null);
  if(!dates){
    this.ClearSelected();
    return;
  }

  this.BeginUpdate();
  try {
    this.ClearSelected()
    var d,f=0,rs=0;
    for(var i=0;i<dates.length;i++)
    {
      d=dates[i];
      if(typeof d==='string') d=this.ParseDate(d);
      if(typeof d!=='undefined')
      {
        d=ng_ExtractDate(d);
        if(this.SelectType==ngcalSelectRange)
        {
          if(!rs) this.SelectFrom=d;
          else if(rs==1) this.SelectTo=d;
          else if(rs>1) break;
          rs++;
        }
        else this.SelectedDates[ngcal_DateStrKey(d)]=d;

        if(!f) { this.CurrentDate=d; f=1; }
      }
    }
    if(rs==1) this.SelectTo=this.SelectFrom;
  }
  finally
  {
    this.SelectChanged();
    this.EndUpdate();
  }
}

function ngcal_BeginUpdate()
{
  this.update_cnt++;
}

function ngcal_EndUpdate()
{
  this.update_cnt--;
  if(this.update_cnt<=0) { this.update_cnt=0; if(this.need_update) this.UpdateCalendar(); }
}

function ngcal_DayImgDrawProps(id, s, enabled,o)
{
  var v=ngc_ImgProps(id,s,enabled,o);
  if(ngcal_CurrentDay==id.substring(0,id.length-1)) { v.aL=v.oL; v.aT=v.oT; }
  else { v.aL=v.L; v.aT=v.T; }
  return v;
}

function ngcal_UpdateCalendar()
{
  if(this.update_cnt>0) { this.need_update=true; return; }
  this.need_update=false;

  var o=this.Elm();
  if(!o) return;
  var cclass=this.BaseClassName;
  var now_date = ng_ExtractDate(new Date());
  var cur_month = this.CurrentDate.getMonth()+1;
  var cur_year = this.CurrentDate.getFullYear();
  var daysinmonth = new Array(0,31,28,31,30,31,30,31,31,30,31,30,31);
  if(ng_LeapYear(cur_year)) daysinmonth[2] = 29;

  var current_month = new Date(cur_year,cur_month-1,1);
  var display_date = current_month;
  var display_year = cur_year;
  var display_month = cur_month;
  var display_day = 1;
  
  if((this.SelectType==ngcalSelectRange)&&(this.SelectFrom>this.SelectTo))
  {
    var t=this.SelectFrom;
    this.SelectFrom=this.SelectTo;
    this.SelectTo=t;
  }
  
  var weekday = current_month.getDay();
  var offset  = (weekday >= this.WeekStartDay) ? weekday-this.WeekStartDay : 7-this.WeekStartDay+weekday ;
  if (offset > 0) 
  {
    display_month--;
    if (display_month < 1) { display_month = 12; display_year--; }
    display_day = daysinmonth[display_month]-offset+1;
  }
  
  var o=this.Elm();
  if(!o) return;
  var w=ng_ClientWidth(o);
  
  var to=document.getElementById(this.ID+'_Tab');
  var ho=document.getElementById(this.ID+'_Head');
  if((ho)&&(to))
  {
    var hw=ng_ClientWidth(to);
    var h=0,bo,tw,th=0,bh,bw,l=0;
    if(this.Navigation)
    {
      tw=hw;
      bo=(this.PrevMonBtn.Visible ? this.PrevMonBtn.Elm() : null);
      if(bo)
      {
        bo.style.left='0px';
        bo.style.top='0px';
        bw=ng_ClientWidth(bo);
        tw-=bw;
        l=bw;
        bh=ng_ClientHeight(bo);
        if(bh>th) th=bh;
      } 

      bo=(this.NextMonBtn.Visible ? this.NextMonBtn.Elm() : null);
      if(bo)
      {
        bo.style.top='0px';
        bw=ng_ClientWidth(bo);
        tw-=bw;        
        bo.style.left=(hw-bw)+'px';
        bh=ng_ClientHeight(bo);
        if(bh>th) th=bh;
      }

      bo=document.getElementById(this.ID+'_MON');
      if(bo) 
      {
        if(this.YearNavigation) ng_SetInnerHTML(bo,ngTxt('calendar_months')[cur_month-1]); 
        else ng_SetInnerHTML(bo,ngTxt('calendar_months')[cur_month-1]+' '+cur_year);
        bo.style.left=l+'px';
        bo.style.width=tw+'px';
        bh=ng_ClientHeight(bo);
        if(bh>th) th=bh;        
      }       
      h+=th;

      if(this.YearNavigation)
      {
        th=0;
        tw=hw;
        bo=(this.PrevYearBtn.Visible ? this.PrevYearBtn.Elm() : null);
        if(bo)
        {
          bo.style.display="block";
          bo.style.left='0px';
          bo.style.top=h+'px';
          bw=ng_ClientWidth(bo);
          tw-=bw;
          l=bw;
          bh=ng_ClientHeight(bo);
          if(bh>th) th=bh;
        } 
  
        bo=(this.NextYearBtn.Visible ? this.NextYearBtn.Elm() : null);
        if(bo)
        {
          bo.style.display="block";
          bo.style.top=h+'px';
          bw=ng_ClientWidth(bo);
          tw-=bw;        
          bo.style.left=(hw-bw)+'px';
          bh=ng_ClientHeight(bo);
          if(bh>th) th=bh;
        }
  
        bo=document.getElementById(this.ID+'_YEAR');
        if(bo) 
        {
          bo.style.display="block";
          ng_SetInnerHTML(bo,cur_year);
          bo.style.top=h+'px';
          bo.style.left=l+'px';
          bo.style.width=tw+'px';
          bh=ng_ClientHeight(bo);
          if(bh>th) th=bh;        
        }       
        h+=th;
      }
      else
      {
        bo=(this.PrevYearBtn.Visible ? this.PrevYearBtn.Elm() : null);
        if(bo) bo.style.display="none";
        bo=(this.NextYearBtn.Visible ? this.NextYearBtn.Elm() : null);
        if(bo) bo.style.display="none";
        bo=document.getElementById(this.ID+'_YEAR');
        if(bo) bo.style.display="none";
      }
    }     
    if(h>0) ho.style.height=h+'px';
    ho.style.display=(h ? '' : 'none');
  }
  
  var row,col,cid,image,now,enabled,selected,cn,alt,text;
  for(row=0;row<6;row++)
  {
    for(col=0;col<=6;col++)
    {      
      cid=this.ID+'_D'+(row+1)+'_'+(col+1);
      od = document.getElementById(cid);
      if(!od) continue;       

      display_date = new Date(display_year,display_month-1,display_day);
      this.DisplayedDates[row*7+col]=display_date;
      if(this.SelectType==ngcalSelectRange)
        selected=(display_date>=this.SelectFrom)&&(display_date<=this.SelectTo);
      else 
        selected=(typeof this.SelectedDates[ngcal_DateStrKey(display_date)]!=='undefined');
      if((!this.Enabled)||(display_month != cur_month)) enabled=false;
      else enabled=this.IsDayEnabled(display_date);
      now=((display_date-now_date)==0);
      cn=cclass+'Days '+cclass+(now ? 'Now' : 'Day');
      if(selected) cn+='Selected';
      if(!enabled) cn+='Disabled';
      if(ngcal_CurrentDay==cid) cn+='_Focus';
      
      if(this.OnGetDayImg) image=this.OnGetDayImg(this, display_date, col, row);
      else image=(now && this.ImgNow ? this.ImgNow : this.ImgDay);
      if(image) ngc_ChangeImage(ngcal_DayImgDrawProps(cid+'I', (selected ? 1 : 0), enabled, image));

      if(this.OnGetDayAlt) alt=ngVal(this.OnGetDayAlt(this, display_date, col, row),'');
      else alt=this.FormatDate(display_date);
      if(this.OnGetDayText) text=ngVal(this.OnGetDayText(this, display_date, col, row),'');
      else text=display_day;

      ng_SetInnerHTML(od,text);
      od.title=alt;
      od.className=cn;
      od.onmouseover = function(e) { ngcal_DE(e,this); }
      od.onmouseout  = function(e) { ngcal_DL(e,this); }
      od.onclick = function(e) { ngcal_MD(e,this); }
      od.onselectstart = function() {  return false; } 
      od.style.cursor = (enabled ? 'pointer' : 'default');
      
      display_day++;
      if (display_day > daysinmonth[display_month]) 
      {
        display_day=1;
        display_month++;
      }
      if (display_month > 12) 
      {
        display_month=1;
        display_year++;
      }
    }
  }
}

function ngcal_DoUpdate(o)
{
  var cclass=this.BaseClassName;

  var html=new ngStringBuilder;
  html.append('<table id="'+this.ID+'_Tab" cellspacing="0" border="0" cellpadding="0">');

  html.append('<tr><td id="'+this.ID+'_Head" class="'+cclass+'Header" colspan="7" align="left" valign="top"><div style="position:absolute;">');
  var id,b,cn;
  for(var i=0;i<6;i++)
  {
    switch(i)
    {
      case 0: b=this.PrevMonBtn; cn="PrevMon"; break;
      case 1: id=this.ID+'_MON'; cn="Month"+(this.Enabled ? '' : 'Disabled'); b=null; break;
      case 2: b=this.NextMonBtn; cn="NextMon"; break;
      case 3: b=this.PrevYearBtn; cn="PrevYear"; break;
      case 4: id=this.ID+'_YEAR'; cn="Year"+(this.Enabled ? '' : 'Disabled'); b=null; break;
      case 5: b=this.NextYearBtn; cn="NextYear"; break;
    }
    if(b)
    {
      if(b.ID=='') b.Attach(this.ID+'_B'+(i+1));
      id=b.ID;
      b.Enabled=this.Enabled;
      if(typeof b.className !== 'undefined') cn=b.className;      
    }
    html.append('<div id="'+id+'" class="'+cclass+cn+'" style="position:absolute;"></div>');
  }
  html.append('</div>&nbsp;</td></tr>');

  var dp,w,image,hilite,alt,text;  
  // Day names
  var days=ngTxt('calendar_days_short');
  var days_title=ngTxt('calendar_days');
  html.append('<tr id="'+this.ID+'_WeekDays" class="'+cclass+'WeekDaysRow">');
  for(var i=0;i<7;i++)
  {
    html.append('<td>');
    w=(this.WeekStartDay+i)%7;    
    hilite=(ngVal(this.HiliteWeekDays[w],false));
    if(this.OnGetWeekDayImg) image=this.OnGetWeekDayImg(this, w);
    else image=this.ImgWeekDay;
    if(image)
    {
      dp=ngc_ImgProps(this.ID+'_WD'+dp, (hilite ? 1 : 0), this.Enabled, image);
      ngc_Img(html,dp,"position:absolute;",ngVal(image.Attrs,''));
    }
    cn='WeekDay';
    if(hilite) cn+='Hilite';
    if(!this.Enabled) cn+='Disabled';
    
    if(this.OnGetWeekDayAlt) alt=ngVal(this.OnGetWeekDayAlt(this,w),'');
    else alt=days_title[w];
    if(this.OnGetWeekDayText) text=ngVal(this.OnGetWeekDayText(this,w),'');
    else text=days[w];
        
    html.append('<div class="'+cclass+'WeekDays '+cclass+cn+'" title="'+ng_htmlEncode(alt)+'">'+text+'</div></td>')
  }
  html.append('</tr>');
  
  var dd=1,cid, row, col;
  for(row=1;row<=6;row++)
  {
    html.append('<tr>');
    for(col=1;col<=7;col++)
    {
      html.append('<td>');
      cid=this.ID+'_D'+row+'_'+col;
      if(this.OnGetDayImg) image=this.OnGetDayImg(this, null, col-1, row-1);
      else image=this.ImgDay;
      if(image)
      {
        dp=ngcal_DayImgDrawProps(cid+'I', 0, this.Enabled, image);
        ngc_Img(html,dp,"position:absolute;",ngVal(image.Attrs,''));
      }
      html.append('<div id="'+cid+'"></div></td>');
    }
    html.append('</tr>');
  }
  if((this.FastNavigation)&&(this.FastButtons)&&(this.FastButtons.length>0))
  {    
    html.append('<tr><td id="'+this.ID+'_Foot" class="'+cclass+'Footer" colspan="7" align="left" valign="top"><div style="position: absolute;">');
    var b,ci;
    for(var i=0;i<this.FastButtons.length;i++)
    {
      cn=cclass+'FastBtn';
      b=this.FastButtons[i];
      if(!b) continue;
      b.Enabled=this.Enabled;
      b.Parent=this;
      if(!b.Visible) continue;
      if(b.ID=='') b.Attach(this.ID+'_FB'+(i+1));
      if(typeof b.className !== 'undefined') 
      {
        cn=b.className;
        ci=cn.indexOf(' ');
        b.BaseClassName=(ci>=0 ? cn.substr(0,ci) : cn);
      }
      html.append('<div id="').append(b.ID).append('" class="').append(cn).append('" style="position: absolute; z-index:1;"></div>');
    }
    html.append('</div></td></tr>');
  }
  
  html.append('</table>');
  
  var hasframe=(!ng_EmptyVar(this.Frame));
  if(hasframe){
    html.append('<div id="'+this.ID+'_F" style="position: absolute;left:0px;top:0px;z-index:800;"></div>');
  }
  
  ng_SetInnerHTML(o, html.toString());
  for(var i=0;i<6;i++)
  {
    switch(i)
    {
      case 0: b=this.PrevMonBtn; break;
      case 1: b=null; break;
      case 2: b=this.NextMonBtn; break;
      case 3: b=this.PrevYearBtn; break;
      case 4: b=null; break;
      case 5: b=this.NextYearBtn; break;
    }
    if(b) 
    {
      b.Parent=this;      
      b.Update();
    }
  }
  this.UpdateCalendar();
  
  o.style.width='';
  o.style.height='';
  var w=ng_ClientWidth(o);

  if((this.FastNavigation)&&(this.FastButtons)&&(this.FastButtons.length>0))
  {    
    var b,bw,bh,img,bo,mh=0,bl=0,bt=0;
    for(var i=0;i<this.FastButtons.length;i++)
    {
      b=this.FastButtons[i];
      if(!b) continue;
      b.Update();
      bo=b.Elm();
      if(!bo) continue;
      bw=ng_OuterWidth(bo);
      if((bl+bw>w)&&(bl>0)) { bt+=mh; bl=0; mh=0; }
      bo.style.left=bl+'px';
      bo.style.top=bt+'px';      
      bh=ng_OuterHeight(bo);
      if(bh>mh) mh=bh;
      bl+=bw;    
    }
    bt+=mh;
    bo=document.getElementById(this.ID+'_Foot');
    if(bo) bo.style.height=bt+'px';
  }
  var h=ng_ClientHeight(o);

  ng_SetClientWidth(o,w);
  ng_SetClientHeight(o,h);
  var cbw=ng_StyleWidth(o);
  var cbh=ng_StyleHeight(o);
  if((this.Bounds.W!=cbw)||(this.Bounds.H!=cbh))
  {
    this.Bounds.W=cbw;
    this.Bounds.H=cbh;
    this.SetBounds();
  }
  var dd=ngVal(this.DropDownOwner,null);
  if(dd) this.MaxHeight=h;
  
  if(hasframe){
    var f=document.getElementById(this.ID+'_F');
    if(f)
    {
      var frame=new ngStringBuilder;
      ngc_ImgBox(frame, this.ID, 'ngCalendar', (this.ControlHasFocus ? 1 : 0), this.Enabled, 0,0,w,h,false, this.Frame);
      ng_SetInnerHTML(f,frame.toString());
    }
  }
  return true;
}

var ngcal_LeaveTimer = null;

function ngcal_DoMouseEnter(e, mi, elm)
{
  if(ngcal_LeaveTimer) clearTimeout(ngcal_LeaveTimer); ngcal_LeaveTimer=null;
  if((mi)&&(mi.Object)&&(mi.Object!=this)) ngcal_DoLeave(mi.Object.ID);
  if(this.OnMouseEnter) this.OnMouseEnter(this);
}

function ngcal_DoLeave(lid)
{
  if(ngcal_LeaveTimer) clearTimeout(ngcal_LeaveTimer); ngcal_LeaveTimer=null;
  var l=ngGetControlById(lid, 'ngCalendar');
  if(lid)
  {
    if(ngcal_CurrentDay!='')
    {
      var o=document.getElementById(ngcal_CurrentDay);
      if(o) ngcal_DL(null,o);    
    }
    if(l.OnMouseLeave) l.OnMouseLeave(l);
  }
}

function ngcal_DoMouseLeave(e)
{
  ngcal_LeaveTimer=setTimeout("ngcal_DoLeave('"+this.ID+"');",100);
}

function ngcal_DoDropDown(edit)
{
  if(typeof edit.GetDate === 'function') this.SetSelected(edit.GetDate());
  else this.SetSelected(edit.GetText());
  this.SetVisible(true);
  this.SetFocus();
}

function ngcal_FormatDate(d)
{
  if(this.OnFormatDate) return this.OnFormatDate(this, d);
  var format=this.DateFormat;
  if(format=='') 
  {
    var dd=ngVal(this.DropDownOwner,null);        
    if(dd) format=ngVal(dd.DateFormat,'');
  }
  return ng_FormatDate(d,format);
}

function ngcal_ParseDate(d)
{
  if(this.OnParseDate) return this.OnParseDate(this, d);
  var format=this.DateFormat;
  if(format=='') 
  {
    var dd=ngVal(this.DropDownOwner,null);        
    if(dd) format=ngVal(dd.DateFormat,'');
  }
  return ng_ParseDate(d,format);
}

/**
 *  Class: ngCalendar
 *  This class implements a generic calendar control. 
 *
 *  Syntax:
 *    new *ngCalendar* ([string id])
 *    
 *  Parameters:
 *    id - control ID
 *    
 *  See also:
 *    Abstract class <ngControl>.    
 */
function ngCalendar(id)
{
  ngControl(this, id, 'ngCalendar');

  /*
   *  Group: Properties
   */
  /*  Variable: CurrentDate
   *  ...
   *  Type: date
   *  Default value: *new Date()*   
   */
  this.CurrentDate = new Date();

  /*  Variable: WeekStartDay
   *  ...
   *  Type: int
   *  Default value: *1*   
   */
  this.WeekStartDay = 1;
  /*  Variable: HiliteWeekDays
   *  ...
   *  Type: array
   *  Default value: *{0:true}*   
   */
  this.HiliteWeekDays = {0: true};

  /*  Variable: DateFormat
   *  ...
   *  Type: string
   */
  this.DateFormat = '';
  
  /*  Variable: ImgWeekDay
   *  ...
   *  Type: object
   */
  this.ImgWeekDay = null;
  /*  Variable: ImgDay
   *  ...
   *  Type: object
   */
  this.ImgDay = null;
  /*  Variable: ImgNow
   *  ...
   *  Type: object
   */
  this.ImgNow = null;
  
  var b=new ngButton();
  b.Text = '&lt;';
  b.Alt = ngTxt('calendar_prevmonth');
  b.OnClick = function(e) { if(e.Owner.Parent) e.Owner.Parent.PrevMonth(!e.Owner.Parent.YearNavigation); };
  /*  Variable: PrevMonBtn
   *  ...
   *  Type: object
   */
  this.PrevMonBtn = b;
   
  b=new ngButton();
  b.Text = '&gt;';
  b.Alt = ngTxt('calendar_nextmonth');
  b.OnClick = function(e) { if(e.Owner.Parent) e.Owner.Parent.NextMonth(!e.Owner.Parent.YearNavigation); };
  /*  Variable: NextMonBtn
   *  ...
   *  Type: object
   */
  this.NextMonBtn = b;

  b=new ngButton();
  b.Text = '&lt;';
  b.Alt = ngTxt('calendar_prevyear');
  b.OnClick = function(e) { if(e.Owner.Parent) e.Owner.Parent.PrevYear(); };
  /*  Variable: PrevYearBtn
   *  ...
   *  Type: object
   */
  this.PrevYearBtn = b;
   
  b=new ngButton();
  b.Text = '&gt;';
  b.Alt = ngTxt('calendar_nextyear');
  b.OnClick = function(e) { if(e.Owner.Parent) e.Owner.Parent.NextYear(); };
  /*  Variable: NextYearBtn
   *  ...
   *  Type: object
   */
  this.NextYearBtn = b;
  

  b=new ngButton();
  b.Text = ngTxt('calendar_today');
  b.Alt = ngTxt('calendar_today');
  b.OnClick = function(e) { if(e.Owner.Parent) e.Owner.Parent.SelectDate(new Date()); };
  /*  Variable: TodayBtn
   *  ...
   *  Type: object
   */
  this.TodayBtn = b;
  
  b=new ngButton();
  b.Text = ngTxt('calendar_tomorrow');
  b.Alt = ngTxt('calendar_tomorrow_alt');
  b.OnClick = function(e) { if(e.Owner.Parent) { var d=new Date(); d.setDate(d.getDate()+1); e.Owner.Parent.SelectDate(d); } };
  /*  Variable: TomorrowBtn
   *  ...
   *  Type: object
   */
  this.TomorrowBtn = b;

  b=new ngButton();
  b.Text = ngTxt('calendar_nextweek');
  b.Alt = ngTxt('calendar_nextweek_alt');
  b.OnClick = function(e) { if(e.Owner.Parent) { var d=new Date(); d.setDate(d.getDate()+7); e.Owner.Parent.SelectDate(d); } };
  /*  Variable: NextWeekBtn
   *  ...
   *  Type: object
   */
  this.NextWeekBtn = b;
  
  /*  Variable: FastButtons
   *  ...
   *  Type: array
   *  Default value: *new Array(this.TodayBtn, this.TomorrowBtn, this.NextWeekBtn)*   
   */
  this.FastButtons = new Array(this.TodayBtn, this.TomorrowBtn, this.NextWeekBtn);
  
  /*  Variable: Navigation
   *  ...
   *  Type: bool
   *  Default value: *true*   
   */
  this.Navigation = true;
  /*  Variable: YearNavigation
   *  ...
   *  Type: bool
   *  Default value: *false*   
   */
  this.YearNavigation = false;
  /*  Variable: FastNavigation
   *  ...
   *  Type: bool
   *  Default value: *true*   
   */
  this.FastNavigation = true;
  
  /*  Variable: DisplayedDates
   *  ...
   *  Type: array
   *  Default value: *{}*   
   */
  this.DisplayedDates = new Array();
  
  /*  Variable: SelectedDates
   *  ...
   *  Type: array
   *  Default value: *{}*   
   */
  this.SelectedDates = new Array();
  /*  Variable: SelectType
   *  ...
   *  Type: enum
   *  
   *  Constants:
   *   ngcalSelectNone - ...
   *   ngcalSelectSingle - ...
   *   ngcalSelectMulti - ...
   *   ngcalSelectMultiExt - ... 
   *   ngcalSelectRange - ...
   *           
   *  Default value: *ngcalSelectSingle*   
   */
  this.SelectType = ngcalSelectSingle;
  /*  Variable: SelectFrom
   *  ...
   *  Type: date
   *  Default value: *new Date()*   
   */
  this.SelectFrom = new Date();
  /*  Variable: SelectTo
   *  ...
   *  Type: date
   *  Default value: *new Date()*   
   */
  this.SelectTo = new Date();

  /*  Variable: BlockedDates
   *  ...
   *  Type: object
   *  Default value: *{}*   
   */
  this.BlockedDates = {};
  /*  Variable: BlockedWeekDays
   *  ...
   *  Type: object
   *  Default value: *{}*   
   */
  this.BlockedWeekDays = {};
  /*  Variable: MinDate
   *  ...
   *  Type: date
   *  Default value: *null*   
   */
  this.MinDate = null;
  /*  Variable: MaxDate
   *  ...
   *  Type: date
   *  Default value: *null*   
   */
  this.MaxDate = null;
  /*  Variable: Frame
   *  ...
   *  Type: object
   */
  this.Frame = new Object;
    
  /*
   *  Group: Methods
   */
  /*  Function: FormatDate
   *  Formats date to string.   
   *   
   *  Syntax:
   *    string *FormatDate* (date d)
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   *     
   *  See also:
   *    Format strings in <ng_FormatDateTime>.   
   */
  this.FormatDate = ngcal_FormatDate;
  /*  Function: ParseDate
   *  Parses date from string.   
   *   
   *  Syntax:
   *    date *ParseDate* (string s)
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   *     
   *  See also:
   *    Format strings in <ng_FormatDateTime>.   
   */
  this.ParseDate = ngcal_ParseDate;

  /*  Function: SetMonth
   *  Moves calendar page to month by given date.
   *
   *  Syntax:
   *    void *SetMonth* (date monthdate)
   *
   *  Parameters:
   *
   *  Returns:
   *    TRUE if page changed.
   */
  this.SetMonth = ngcal_SetMonth;

  /*  Function: NextMonth
   *  Moves calendar page to next month.     
   *   
   *  Syntax:
   *    void *NextMonth* ([bool changeyear = true])
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.NextMonth = ngcal_NextMonth;
  /*  Function: PrevMonth
   *  Moves calendar page to previous month.     
   *   
   *  Syntax:
   *    void *PrevMonth* ([bool changeyear = true])
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.PrevMonth = ngcal_PrevMonth;
  /*  Function: NextYear
   *  Moves calendar page to next year.     
   *   
   *  Syntax:
   *    void *NextYear* ()
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.NextYear = ngcal_NextYear;
  /*  Function: PrevYear
   *  Moves calendar page to previous year.     
   *   
   *  Syntax:
   *    void *PrevYear* ()
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.PrevYear = ngcal_PrevYear;

  /*  Function: ClearSelected
   *  Clears selected dates.     
   *   
   *  Syntax:
   *    void *ClearSelected* ()
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.ClearSelected = ngcal_ClearSelected;
  /*  Function: SelectDate
   *  Adds/removes date to/from selection/     
   *   
   *  Syntax:
   *    void *SelectDate* (date d, bool state, bool ctrlkey)
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.SelectDate = ngcal_SelectDate;
  /*  Function: GetSelected
   *  Gets selected dates as indexed array.     
   *   
   *  Syntax:
   *    array *GetSelected* ()
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.GetSelected = ngcal_GetSelected;
  /*  Function: SetSelected
   *  Sets selected dates from array. Items can be a date types or string types.     
   *   
   *  Syntax:
   *    void *SetSelected* (array dates)
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.SetSelected = ngcal_SetSelected;
  
  this.last_selected = null; 
  this.SelectChanged = ngcal_SelectChanged; 

  /*  Function: IsDayEnabled
   *  Determines if specified date is available for selection.     
   *   
   *  Syntax:
   *    bool *IsDayEnabled* (date d)
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.IsDayEnabled=ngcal_IsDayEnabled;
      
  this.DoUpdate = ngcal_DoUpdate;

  this.need_update=false;
  this.update_cnt=0;
  /*  Function: BeginUpdate
   *  Prevents the updating of the calendar until the <EndUpdate> method is called.     
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
  this.BeginUpdate = ngcal_BeginUpdate;
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
  this.EndUpdate = ngcal_EndUpdate;
  /*  Function: UpdateCalendar
   *  Repaints the calendar page. Faster then updating whole control by calling
   *  Update() method.      
   *   
   *  Syntax:
   *    void *UpdateCalendar* ()
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  this.UpdateCalendar = ngcal_UpdateCalendar;
  
  this.DoDropDown = ngcal_DoDropDown;
  this.DoMouseEnter = ngcal_DoMouseEnter;
  this.DoMouseLeave = ngcal_DoMouseLeave;
  
  /*
   *  Group: Events
   */
  /*
   *  Event: OnFormatDate
   */     
  this.OnFormatDate = null;
  /*
   *  Event: OnParseDate
   */     
  this.OnParseDate = null;
  
  /*
   *  Event: OnDayClick
   */     
  this.OnDayClick = null;  
  /*
   *  Event: OnIsDayEnabled
   */     
  this.OnIsDayEnabled = null;
  /*
   *  Event: OnSelectChanged
   */     
  this.OnSelectChanged = null;
  
  /*
   *  Event: OnGetWeekDayImg
   */     
  this.OnGetWeekDayImg = null;
  /*
   *  Event: OnGetWeekDayText
   */     
  this.OnGetWeekDayText = null;
  /*
   *  Event: OnGetWeekDayAlt
   */     
  this.OnGetWeekDayAlt = null;

  /*
   *  Event: OnGetDayImg
   */     
  this.OnGetDayImg = null;
  /*
   *  Event: OnGetDayText
   */     
  this.OnGetDayText = null;
  /*
   *  Event: OnGetDayAlt
   */     
  this.OnGetDayAlt = null;

  /*
   *  Event: OnMouseEnter
   */     
  this.OnMouseEnter = null;
  /*
   *  Event: OnMouseLeave
   */     
  this.OnMouseLeave = null;
 
  ngControlCreated(this);
}

// --- Controls Registration ---------------------------------------------------

/*  Class: ngEditDate
 *  Standard edit date control (based on <ngEdit>).
 */
/*<>*/
function Create_ngEditDate(def, ref, parent)
{
  var c=ngCreateControlAsType(def, 'ngEdit', ref, parent);
  if(!c) return;
  /*
   *  Group: Properties
   */
  /*  Variable: DateFormat
   *  ...
   *  Type: string
   */
  c.DateFormat = '';        
  /*
   *  Group: Methods
   */
  /*  Function: FormatDate
   *  Formats date to string.
   *   
   *  Syntax:
   *    string *FormatDate* (date d)
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  c.FormatDate = function(d)
  {
    if(this.OnFormatDate) return this.OnFormatDate(this, d);
    return ng_FormatDate(d,this.DateFormat);
  }        
  /*  Function: ParseDate
   *  Parses date from string.
   *   
   *  Syntax:
   *    date *ParseDate* (string s)
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  c.ParseDate = function(d)
  {
    if(this.OnParseDate) return this.OnParseDate(this, d);
    return ng_ParseDate(d,this.DateFormat);
  }
  /*  Function: GetDate
   *  Gets edited date.
   *   
   *  Syntax:
   *    date *GetDate* ()
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -
   */              
  c.GetDate = function()
  {
    return this.ParseDate(this.GetText());
  }
  /*  Function: SetDate
   *  Sets edited date.
   *   
   *  Syntax:
   *    void *SetDate* (date d)
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -
   */              
  c.SetDate = function(d)
  {
    this.SetText(this.FormatDate(d));
  }                 
  /*
   *  Group: Events
   */
  /*
   *  Event: OnFormatDate
   */     
  c.OnFormatDate = null;
  /*
   *  Event: OnParseDate
   */     
  c.OnParseDate = null;
  return c;
}

// --- Controls Registration ---------------------------------------------------

/*  Class: ngEditTime
 *  Standard edit date control (based on <ngEdit>).
 */
/*<>*/
function Create_ngEditTime(def, ref, parent)
{
  var c=ngCreateControlAsType(def, 'ngEdit', ref, parent);
  if(!c) return;
  /*
   *  Group: Properties
   */
  /*  Variable: TimeFormat
   *  ...
   *  Type: string
   */
  c.TimeFormat = '';        
  /*
   *  Group: Methods
   */
  /*  Function: FormatTime
   *  Formats date to string.
   *   
   *  Syntax:
   *    string *FormatTime* (date d)
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  c.FormatTime = function(d)
  {
    if(c.OnFormatTime) return c.OnFormatTime(c, d);
    return ng_FormatTime(d,c.TimeFormat);
  }        
  /*  Function: ParseTime
   *  Parses date from string.
   *   
   *  Syntax:
   *    date *ParseTime (string s)
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -     
   */
  c.ParseTime = function(d)
  {
    if(c.OnParseTime) return c.OnParseTime(c, d);
    return ng_ParseTime(d,c.DateFormat);
  }
  /*  Function: GetDate
   *  Gets edited date.
   *   
   *  Syntax:
   *    date *GetDate* ()
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -
   */              
  c.GetDate = function()
  {
    return c.ParseTime(c.GetText());
  }
  /*  Function: SetDate
   *  Sets edited date.
   *   
   *  Syntax:
   *    void *SetDate* (date d)
   *     
   *  Parameters:
   *   
   *  Returns:
   *    -
   */              
  c.SetDate = function(d)
  {
    c.SetText(c.FormatTime(d));
  }                 
  /*
   *  Group: Events
   */
  /*
   *  Event: OnFormatTime
   */     
  c.OnFormatTime = null;
  /*
   *  Event: OnParseTime
   */     
  c.OnParseTime = null;
  return c;
}

if(typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['calendar'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function() {
    ngRegisterControlType('ngCalendar', function() { return new ngCalendar; });
    ngRegisterControlType('ngEditDate', Create_ngEditDate);
    ngRegisterControlType('ngEditTime', Create_ngEditTime);
  }
};
