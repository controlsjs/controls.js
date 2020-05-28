/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2014-2016 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */

function ng_Expand2Id(eid)
{
  var id1='';
  var id2='';
  if(typeof eid === 'string')
  {
    var i=eid.indexOf('_');
    if(i>=0)
    {
      id1=eid.substring(0,i);
      id2=eid.substring(i+1,eid.length);
    }
  }
  return {id1: id1, id2: id2};
}

function ng_OutlineHTML(t,c)
{
  c=ngVal(c,'');
  if(c=='') return t;

  var html=new ngStringBuilder;
  for(var i=0;i<3;i++)
    for(var j=0;j<3;j++)
    {
      if((i!=1)||(j!=1))
      {
        html.append("<span style=\"position: absolute; left:"+(i-1)+"px; top:"+(j-1)+"px; color: "+c+"\">");
        html.append(t);
        html.append("</span>")
      }
    }
  html.append("<span style=\"position: absolute; left:0px; top:0px;\">");
  html.append(t);
  html.append("</span><span style=\"visibility:hidden;margin-left:2px;\">"+t+"</span>");
  return html.toString();
}

// --- Images ------------------------------------------------------------------

var ng_CreateImageHTML = function(id,url,left,top,width, height, style, attr, innerHTML)
{
  if(ngIExplorer6) ng_CreateImageHTML=ng_CreateImageHTMLIE6;
  else             ng_CreateImageHTML=ng_CreateImageHTMLNotIE6;
  return ng_CreateImageHTML(id,url,left,top,width, height, style, attr, innerHTML);
}

function ng_CreateImageHTMLNotIE6(id,url,left,top,width, height, style, attr, innerHTML)
{
  if(typeof url==='object') { var img=ng_SelectHiResImage(url); url=img.Src; var img_width=img.SrcW; var img_height=ngVal(img.SrcH); }
  if(typeof attr==='undefined') attr='';
  if(typeof style==='undefined') style='';
  if(typeof innerHTML==='undefined') innerHTML='';
  if(url!='')
    style = "background: transparent url('"+url+"') no-repeat scroll "+(-left)+"px "+(-top)+(top==0 ? "pt" : "px")+";"
          + (typeof img_width!=='undefined' ? 'background-size:'+img_width+'px '+ngVal(img_height,0)+'px;' : '')
          + style;
  else
    if(ngIExplorer) style = "background: transparent url('"+ngEmptyURL+"');" + style;
  return '<span id="'+id+'" unselectable="on" style="font-size:0;line-height:0;overflow:hidden;width:'+width+'px;height:'+height+'px;'+style+'" '+attr+'>'+innerHTML+'</span>';
}

function ng_CreateImageHTMLIE6(id,url,left,top,width, height, style, attr, innerHTML)
{
  if(typeof url==='object') { var img=ng_SelectHiResImage(url); url=img.Src; }
  if(typeof attr==='undefined') attr='';
  if(typeof style==='undefined') style='';
  if(typeof innerHTML==='undefined') innerHTML='';
  if(url!='')
    innerHTML = '<span id="'+id+'_png" unselectable="on" style="position:absolute;font-size:0;line-height:0;left:'+(-left)+'px;top:'+(-top)+'px;width:'+(left+width)+'px;height:'+(top+height)+'px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+url+'\');"></span>'+innerHTML;
  else
    style = "background: transparent url('"+ngEmptyURL+"');" + style;
  return '<span id="'+id+'" unselectable="on" style="font-size:0;line-height:0;overflow:hidden;width:'+width+'px;height:'+height+'px;'+style+'" '+attr+'>'+innerHTML+'</span>';
}

function ng_CreateImageHTMLSW(id,l,w,url,left,top,width,height, style, attr, innerHTML)
{
  if(typeof attr==='undefined') attr='';
  if(typeof style==='undefined') style='';
  if(typeof innerHTML==='undefined') innerHTML='';
  if((typeof width === 'undefined')||(url==''))
  {
    if(typeof url==='object') { var img=ng_SelectHiResImage(url); url=img.Src; var img_width=img.SrcW; var img_height=ngVal(img.SrcH); }
    if((ngIExplorer6)&&(url!=''))
    {
      width=img_width;
      if(typeof width==='undefined') {
        var img=ng_PreloadImage(url);
        if(!img) return '';
        width=img.width;
      }
    }
    else
    {
      if(url!='')
        style = "background: transparent url('"+url+"') repeat-x scroll "+(-left)+"px "+(-top)+(top==0 ? "pt" : "px")+";"
              + (typeof img_width!=='undefined' ? 'background-size:'+img_width+'px '+ngVal(img_height,0)+'px;' : '')
              + style;
      else
        if(ngIExplorer) style = "background: transparent url('"+ngEmptyURL+"');" + style;
      return '<span id="'+id+'_1" unselectable="on" style="font-size:0;line-height:0;overflow:hidden;width:'+w+'px;height:'+height+'px;'+style+'left:'+l+'px;" '+attr+'>'+innerHTML+'</span>';
    }
  }
  if(width<=0) return '';
  var html=new ngStringBuilder;
  var i=1;
  while(w>0)
  {
    if(w<width) width=w;
    html.append(ng_CreateImageHTML(id+'_'+i,url,left,top,width,height,style+'left:'+l+'px;',attr,innerHTML))
    w-=width;
    l+=width;
    i++;
  }
  return html.toString();
}

function ng_CreateImageHTMLSH(id,t,h,url,left,top,width,height, style, attr,innerHTML)
{
  if(typeof attr==='undefined') attr='';
  if(typeof style==='undefined') style='';
  if(typeof innerHTML==='undefined') innerHTML='';
  if((typeof height==='undefined')||(url==''))
  {
    if(typeof url==='object') { var img=ng_SelectHiResImage(url); url=img.Src; var img_width=img.SrcW; var img_height=ngVal(img.SrcH); }
    if((ngIExplorer6)&&(url!=''))
    {
      height=img_height;
      if(typeof height==='undefined') {
        var img=ng_PreloadImage(url);
        if(!img) return '';
        height=img.height;
      }
    }
    else
    {
      if(url!='')
        style = "background: transparent url('"+url+"') repeat-y scroll "+(-left)+"px "+(-top)+(top==0 ? "pt" : "px")+";"
              + (typeof img_width!=='undefined' ? 'background-size:'+img_width+'px '+ngVal(img_height,0)+'px;' : '')
              + style;
      else
        if(ngIExplorer) style = "background: transparent url('"+ngEmptyURL+"');" + style;
      return '<span id="'+id+'_1" unselectable="on" style="font-size:0;line-height:0;overflow:hidden;width:'+width+'px;height:'+h+'px;'+style+'top:'+t+'px" '+attr+'>'+innerHTML+'</span>';
    }
  }
  if(height<=0) return '';
  var html=new ngStringBuilder;
  var i=1;
  while(h>0)
  {
    if(h<height) height=h;
    html.append(ng_CreateImageHTML(id+'_'+i,url,left,top,width,height,style+'top:'+t+'px;',attr,innerHTML))
    h-=height;
    t+=height;
    i++;
  }
  return html.toString();
}

function ng_SwapImageHTML(id, left, top)
{
  var o;
  if((typeof left==='undefined')||(typeof top==='undefined')) return;
  if(ngIExplorer6)
  {
    o=document.getElementById(id+'_png');
    if(o)
    {
      o.style.pixelLeft=-left;
      o.style.pixelTop=-top;
      return;
    }
  }
  o=document.getElementById(id);
  if(o) o.style.backgroundPosition=(-left)+"px "+(-top)+(top==0 ? "pt" : "px");
}

function ng_CreateBoxHTML(id, url, left, top, width, height, innersize, images, style, innerHTML)
{
  var img;
  var html=new ngStringBuilder;

  var noimg = {L:0,T:0,W:0,H:0};
  style='position:absolute;'+style;
  var dp={};
  dp.Left        = (images.Left ? images.Left : noimg);
  dp.Top         = (images.Top ? images.Top : noimg);
  dp.Right       = (images.Right ? images.Right : noimg);
  dp.Bottom      = (images.Bottom ? images.Bottom : noimg);
  dp.LeftTop     = (images.LeftTop ? images.LeftTop : noimg);
  dp.RightTop    = (images.RightTop ? images.RightTop : noimg);
  dp.LeftBottom  = (images.LeftBottom ? images.LeftBottom : noimg);
  dp.RightBottom = (images.RightBottom ? images.RightBottom : noimg);

  if(innersize)
  {
    width+=dp.Left.W;
    width+=dp.Right.W;
    height+=dp.Top.H;
    height+=dp.Bottom.H;
  }
  img=dp.LeftTop;
  if(img.W) html.append(ng_CreateImageHTML(id+'_LT', ngVal(img.Src,url), img.L,img.T,img.W,img.H, style+"left:"+left+"px;top: "+top+"px;"));

  img=dp.Top;
  if(img.W) html.append(ng_CreateImageHTMLSW(id+'_T', dp.LeftTop.W,(width-dp.LeftTop.W-dp.RightTop.W), ngVal(img.Src,url), img.L,img.T,img.W,img.H, style+"top: "+top+"px;"));

  img=dp.RightTop;
  if(img.W) html.append(ng_CreateImageHTML(id+'_RT', ngVal(img.Src,url), img.L,img.T,img.W,img.H, style+"left:"+(left+width-img.W)+"px;top: "+top+"px;"));

  img=dp.Left;
  if(img.W) html.append(ng_CreateImageHTMLSH(id+'_L',top+(dp.LeftTop.H ? dp.LeftTop.H : dp.Top.H),(height-(dp.LeftTop.H ? dp.LeftTop.H : dp.Top.H)-(dp.LeftBottom.H ? dp.LeftBottom.H : dp.Bottom.H)), ngVal(img.Src,url), img.L,img.T,img.W,img.H, style+"left: "+left+"px;"));

  img=dp.Right;
  if(img.W) html.append(ng_CreateImageHTMLSH(id+'_R',top+(dp.RightTop.H ? dp.RightTop.H : dp.Top.H),(height-(dp.RightTop.H ? dp.RightTop.H : dp.Top.H)-(dp.RightBottom.H ? dp.RightBottom.H : dp.Bottom.H)), ngVal(img.Src,url), img.L,img.T,img.W,img.H, style+"left: "+(left+width-img.W)+"px;"));

  img=dp.LeftBottom;
  if(img.W) html.append(ng_CreateImageHTML(id+'_LB', ngVal(img.Src,url), img.L,img.T,img.W,img.H, style+"left:"+left+"px;top: "+(top+height-img.H)+"px;"));

  img=dp.Bottom;
  if(img.W) html.append(ng_CreateImageHTMLSW(id+'_B', dp.LeftBottom.W,(width-dp.LeftBottom.W-dp.RightBottom.W), ngVal(img.Src,url), img.L,img.T,img.W,img.H, style+"top: "+(top+height-img.H)+"px;"));

  img=dp.RightBottom;
  if(img.W) html.append(ng_CreateImageHTML(id+'_RB', ngVal(img.Src,url), img.L,img.T,img.W,img.H, style+"left:"+(left+width-img.W)+"px;top: "+(top+height-img.H)+"px;"));

  if(typeof innerHTML !== 'undefined')
  {
    html.append('<div id="'+id+'_C" style="'+style+'overflow:auto; left:'+(left+dp.Left.W)+'px;top:'+(top+dp.Top.W)+'px;width:'+(width-dp.Left.W-dp.Right.W)+'px;height:'+(height-dp.Top.H-dp.Bottom.H)+'px;">');
    html.append(innerHTML);
    html.append('</div>');
  }
  return html.toString();
}

// --- Control images ----------------------------------------------------------

function ngc_ChangeImage(dp)
{
  ng_SwapImageHTML(dp.id, dp.aL, dp.aT);
  var o=document.getElementById(dp.id);
  if(o)
  {
    if((dp.L!=dp.oL)||(dp.T!=dp.oT))
    {
      o.setAttribute('L',dp.L);
      o.setAttribute('T',dp.T);
      o.setAttribute('oL',dp.oL);
      o.setAttribute('oT',dp.oT);
    }
    else
    {
      if(!ng_nullAttr(o.getAttribute('L'))) o.setAttribute('L','');
      if(!ng_nullAttr(o.getAttribute('T'))) o.setAttribute('T','');
      if(!ng_nullAttr(o.getAttribute('oL'))) o.setAttribute('oL','');
      if(!ng_nullAttr(o.getAttribute('oT'))) o.setAttribute('oT','');
    }
    return true;
  }
  return false;
}

function ngc_ChangeImageS(dp)
{
  var i,id=dp.id;
  for(i=1;i<1000;i++)
  {
    dp.id=id+'_'+i;
    if(!ngc_ChangeImage(dp)) break;
  }
  dp.id=id;
  return(i>1);
}

function ngc_ChangeImg(id,state,enabled,image)
{
  if(image)
  {
    var dp=ngc_ImgProps(id, state, enabled, image);
    ngc_ChangeImage(dp);
  }
}

function ngc_ChangeImgS(id,state,enabled,image)
{
  if(image)
  {
    var dp=ngc_ImgProps(id, state, enabled, image);
    ngc_ChangeImageS(dp);
  }
}

function ngc_ChangeBox(id,state,enabled,images)
{
  if(!images) return;
  if(images.Left)        ngc_ChangeImgS(id+'_L',state,enabled,images.Left);
  if(images.Top)         ngc_ChangeImgS(id+'_T',state,enabled,images.Top);
  if(images.Right)       ngc_ChangeImgS(id+'_R',state,enabled,images.Right);
  if(images.Bottom)      ngc_ChangeImgS(id+'_B',state,enabled,images.Bottom);

  if(images.LeftTop)     ngc_ChangeImg(id+'_LT',state,enabled,images.LeftTop);
  if(images.RightTop)    ngc_ChangeImg(id+'_RT',state,enabled,images.RightTop);
  if(images.LeftBottom)  ngc_ChangeImg(id+'_LB',state,enabled,images.LeftBottom);
  if(images.RightBottom) ngc_ChangeImg(id+'_RB',state,enabled,images.RightBottom);
}

function ngc_EnterImg(id)
{
  var o=document.getElementById(id);
  if(o)
  {
    var l=o.getAttribute('oL');
    var t=o.getAttribute('oT');
    if((!ng_nullAttr(l))&&(!ng_nullAttr(t))) ng_SwapImageHTML(id, l, t)
    return true;
  }
  else return false;
}

function ngc_LeaveImg(id)
{
  var o=document.getElementById(id);
  if(o)
  {
    var l=o.getAttribute('L');
    var t=o.getAttribute('T');
    if((!ng_nullAttr(l))&&(!ng_nullAttr(t))) ng_SwapImageHTML(id, l, t)
    return true;
  }
  return false;
}

function ngc_EnterImgS(id)
{
  for(var i=1;i<1000;i++)
    if(!ngc_EnterImg(id+'_'+i)) break;
}

function ngc_LeaveImgS(id)
{
  for(var i=1;i<1000;i++)
    if(!ngc_LeaveImg(id+'_'+i)) break;
}

function ngc_EnterBox(id)
{
  ngc_EnterImg(id+'_LT');
  ngc_EnterImgS(id+'_T');
  ngc_EnterImg(id+'_RT');
  ngc_EnterImgS(id+'_L');
  ngc_EnterImgS(id+'_R');
  ngc_EnterImg(id+'_LB');
  ngc_EnterImgS(id+'_B');
  ngc_EnterImg(id+'_RB');
}

function ngc_LeaveBox(id)
{
  ngc_LeaveImg(id+'_LT');
  ngc_LeaveImgS(id+'_T');
  ngc_LeaveImg(id+'_RT');
  ngc_LeaveImgS(id+'_L');
  ngc_LeaveImgS(id+'_R');
  ngc_LeaveImg(id+'_LB');
  ngc_LeaveImgS(id+'_B');
  ngc_LeaveImg(id+'_RB');
}

function ngc_Img(html,dp,style,attrs,innerHTML)
{
  html.append(ng_CreateImageHTML(dp.id,dp.Src,dp.aL,dp.aT,dp.W,dp.H,style,(((dp.L!=dp.oL)||(dp.T!=dp.oT)) ? ' L="'+dp.L+'" T="'+dp.T+'" oL="'+dp.oL+'" oT="'+dp.oT+'" ' : '')+attrs,innerHTML));
}

function ngc_ImgSW(html,dp,l,w,style,attrs,innerHTML)
{
  html.append(ng_CreateImageHTMLSW(dp.id,l,w,dp.Src,dp.aL,dp.aT,dp.W, dp.H,"position:absolute;"+style,(((dp.L!=dp.oL)||(dp.T!=dp.oT)) ? ' L="'+dp.L+'" T="'+dp.T+'" oL="'+dp.oL+'" oT="'+dp.oT+'" ' : '')+attrs,innerHTML));
}

function ngc_ImgSH(html,dp,t,h,style,attrs,innerHTML)
{
  html.append(ng_CreateImageHTMLSH(dp.id,t,h,dp.Src,dp.aL,dp.aT,dp.W, dp.H,"position:absolute;"+style,(((dp.L!=dp.oL)||(dp.T!=dp.oT)) ? ' L="'+dp.L+'" T="'+dp.T+'" oL="'+dp.oL+'" oT="'+dp.oT+'" ' : '')+attrs,innerHTML));
}

function ngc_ImgBox(html, id, type, s, enabled, left, top, width, height, innersize, images, style, attrs, innerHTML, dp)
{
  var img;
  var ltstyle,tstyle,rtstyle,lstyle,rstyle,lbstyle,bstyle,rbstyle,cstyle;
  var ltattrs,tattrs,rtattrs,lattrs,rattrs,lbattrs,battrs,rbattrs,cattrs;
  var sz,d1,d2;

  var noimg = {L:0,T:0,aL:0,aT:0,oT:0,oL:0,W:0,H:0};
  var gstyle='position:absolute;';
  if(typeof style==='string') gstyle+=style;
  if(typeof style==='object')
  {
    ltstyle=ngVal(style.LeftTop,'');
    tstyle=ngVal(style.Top,'');
    rtstyle=ngVal(style.RightTop,'');
    lstyle=ngVal(style.Left,'');
    rstyle=ngVal(style.Right,'');
    lbstyle=ngVal(style.LeftBottom,'');
    bstyle=ngVal(style.Bottom,'');
    rbstyle=ngVal(style.RightBottom,'');
    cstyle=ngVal(style.Content,'');
  }
  else ltstyle=tstyle=rtstyle=lstyle=rstyle=lbstyle=bstyle=rbstyle=cstyle='';
  var gattrs='';
  if(typeof attrs==='string') gattrs+=attrs;
  if(typeof attrs==='object')
  {
    ltattrs=ngVal(attrs.LeftTop,'');
    tattrs=ngVal(attrs.Top,'');
    rtattrs=ngVal(attrs.RightTop,'');
    lattrs=ngVal(attrs.Left,'');
    rattrs=ngVal(attrs.Right,'');
    lbattrs=ngVal(attrs.LeftBottom,'');
    battrs=ngVal(attrs.Bottom,'');
    rbattrs=ngVal(attrs.RightBottom,'');
    cattrs=ngVal(attrs.Content,'');
  }
  else ltattrs=tattrs=rtattrs=lattrs=rattrs=lbattrs=battrs=rbattrs=cattrs='';

  if(typeof dp==='undefined') dp={};
  dp.Left        =(images.Left ? ngc_ImgProps(id+'_L', s, enabled, images.Left) : noimg);
  dp.Top         =(images.Top ? ngc_ImgProps(id+'_T', s, enabled, images.Top) : noimg);
  dp.Right       =(images.Right ? ngc_ImgProps(id+'_R', s, enabled, images.Right) : noimg);
  dp.Bottom      =(images.Bottom ? ngc_ImgProps(id+'_B', s, enabled, images.Bottom) : noimg);
  dp.LeftTop     =(images.LeftTop ? ngc_ImgProps(id+'_LT', s, enabled, images.LeftTop) : noimg);
  dp.RightTop    =(images.RightTop ? ngc_ImgProps(id+'_RT', s, enabled, images.RightTop) : noimg);
  dp.LeftBottom  =(images.LeftBottom ? ngc_ImgProps(id+'_LB', s, enabled, images.LeftBottom) : noimg);
  dp.RightBottom =(images.RightBottom ? ngc_ImgProps(id+'_RB', s, enabled, images.RightBottom) : noimg);

  if(innersize)
  {
    width+=dp.Left.W;
    width+=dp.Right.W;
    height+=dp.Top.H;
    height+=dp.Bottom.H;
  }
  sz=dp.LeftTop.W+dp.RightTop.W;
  if(sz>width)
  {
    d1=Math.round((sz-width)/2);
    d2=(sz-width)-d1;
    dp.LeftTop.W-=d1;
    dp.RightTop.W-=d2;
    dp.RightTop.L+=d2;
    dp.RightTop.oL+=d2;
    dp.RightTop.aL+=d2;
  }
  sz=dp.LeftBottom.W+dp.RightBottom.W;
  if(sz>width)
  {
    d1=Math.round((sz-width)/2);
    d2=(sz-width)-d1;
    dp.LeftBottom.W-=d1;
    dp.RightBottom.W-=d2;
    dp.RightBottom.L+=d2;
    dp.RightBottom.oL+=d2;
    dp.RightBottom.aL+=d2;
  }
  sz=dp.LeftTop.H+dp.LeftBottom.H;
  if(sz>height)
  {
    d1=Math.round((sz-height)/2);
    d2=(sz-height)-d1;
    dp.LeftTop.H-=d1;
    dp.LeftBottom.H-=d2;
    dp.LeftBottom.T+=d2;
    dp.LeftBottom.oT+=d2;
    dp.LeftBottom.aT+=d2;
  }
  sz=dp.RightTop.H+dp.RightBottom.H;
  if(sz>height)
  {
    d1=Math.round((sz-height)/2);
    d2=(sz-height)-d1;
    dp.RightTop.H-=d1;
    dp.RightBottom.H-=d2;
    dp.RightBottom.T+=d2;
    dp.RightBottom.oT+=d2;
    dp.RightBottom.aT+=d2;
  }

  img=dp.LeftTop;
  if(img.W) ngc_Img(html,img,gstyle+ltstyle+"left:"+left+"px;top: "+top+"px;",gattrs+ltattrs);

  img=dp.Top;
  if(img.H) ngc_ImgSW(html,img,dp.LeftTop.W,(width-dp.LeftTop.W-dp.RightTop.W),gstyle+tstyle+"top: "+top+"px;",gattrs+tattrs);

  img=dp.RightTop;
  if(img.W) ngc_Img(html,img,gstyle+rtstyle+"left:"+(left+width-img.W)+"px;top: "+top+"px;",gattrs+rtattrs);

  img=dp.Left;
  if(img.W) ngc_ImgSH(html,img,top+(dp.LeftTop.H ? dp.LeftTop.H : dp.Top.H),(height-(dp.LeftTop.H ? dp.LeftTop.H : dp.Top.H)-(dp.LeftBottom.H ? dp.LeftBottom.H : dp.Bottom.H)),gstyle+lstyle+"left: "+left+"px;",gattrs+lattrs);

  img=dp.Right;
  if(img.W) ngc_ImgSH(html,img,top+(dp.RightTop.H ? dp.RightTop.H : dp.Top.H),(height-(dp.RightTop.H ? dp.RightTop.H : dp.Top.H)-(dp.RightBottom.H ? dp.RightBottom.H : dp.Bottom.H)),gstyle+rstyle+"left: "+(left+width-img.W)+"px;",gattrs+rattrs);

  img=dp.LeftBottom;
  if(img.W) ngc_Img(html,img,gstyle+lbstyle+"left:"+left+"px;top: "+(top+height-img.H)+"px;",gattrs+lbattrs);

  img=dp.Bottom;
  if(img.H) ngc_ImgSW(html,img,dp.LeftBottom.W,(width-dp.LeftBottom.W-dp.RightBottom.W),gstyle+bstyle+"top: "+(top+height-img.H)+"px;",gattrs+battrs);

  img=dp.RightBottom;
  if(img.W) ngc_Img(html,img,gstyle+rbstyle+"left:"+(left+width-img.W)+"px;top: "+(top+height-img.H)+"px;",gattrs+rbattrs);

  if(typeof innerHTML !== 'undefined')
  {
    html.append('<div id="'+id+'_CB" style="'+gstyle+cstyle+'left:'+(left+dp.Left.W)+'px;top:'+(top+dp.Top.H)+'px;width:'+(width-dp.Left.W-dp.Right.W)+'px;height:'+(height-dp.Top.H-dp.Bottom.H)+'px;" '+gattrs+cattrs+'>');
    html.append(innerHTML);
    html.append('</div>');
  }
}

function ngc_ImgProps(id, s, enabled, o)
{
  var v=new Object;
  v.id=id;
  v.W=o.W;
  v.H=o.H;
  v.Src=ngVal(o.Src,ngControlImages);
  if(!enabled)
  {
    switch(s)
    {
      case 0:
      case false:
        v.L=o.DL; v.T=o.DT;
        v.oL=o.oDL; v.oT=o.oDT;
        break;
      case 1:
      case true:
        v.L=o.DSL; v.T=o.DST;
        v.oL=o.oDSL; v.oT=o.oDST;
        break;
      case 2:
        v.L=o.DGL; v.T=o.DGT;
        v.oL=o.oDGL; v.oT=o.oDGT;
        break;
    }
    v.L=ngVal(v.L, o.DL);
    v.T=ngVal(v.T, o.DT);
    v.oL=ngVal(v.oL, o.oDL);
    v.oT=ngVal(v.oT, o.oDT);

    if((typeof v.L === 'undefined')&&(typeof v.T === 'undefined')) enabled=true;
    else
    {
      v.L=ngVal(v.L, o.L);
      v.T=ngVal(v.T, o.T);
    }
  }
  if(enabled)
  {
    switch(s)
    {
      case 0:
      case false:
        v.L=o.L; v.T=o.T;
        v.oL=o.oL; v.oT=o.oT;
        break;
      case 1:
      case true:
        v.L=o.SL; v.T=o.ST;
        v.oL=o.oSL; v.oT=o.oST;
        break;
      case 2:
        v.L=o.GL; v.T=o.GT;
        v.oL=o.oGL; v.oT=o.oGT;
        break;
    }
    v.L=ngVal(v.L, o.L);
    v.T=ngVal(v.T, o.T);
    v.oL=ngVal(v.oL, o.oL);
    v.oT=ngVal(v.oT, o.oT);
  }
  v.oL=ngVal(v.oL, v.L);
  v.oT=ngVal(v.oT, v.T);

  v.aL=v.L; v.aT=v.T;

  return v;
}

function ngc_ImgDrawProps(id, type, ctrlid, s, enabled, o)
{
  return ngc_ImgProps(id, s, enabled, o);
}
