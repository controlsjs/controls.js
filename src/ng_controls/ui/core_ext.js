/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2026 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */

if(typeof ngUserControls === 'undefined') ngUserControls = {};
ngUserControls['coreextui'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function() {

    // --- ngTextEllipsis ----------------------------------------------------------
    
    /*  Class: ngTextEllipsis
    *  Standard text ellipsis control (based on <ngText>).
    */
    ngRegisterControlType('ngTextEllipsis', function (def, ref, parent)
    {
      ng_MergeDef(def, {
        Data: {
          HTMLEncode: ngVal(ngDefaultHTMLEncoding,false),
          LengthLimit: void 0,
          MaxTextHeight: void 0,
          TrimPos: 'right',
          MaxWordLength: 10,
          WordSeparators: void 0,
          EllipsisText: '…',
          EllipsisLangRes: true,
          ShowMore: true,
          ShowMoreText: 'ngTextEllipsis_ShowMore_Long', // ngTextEllipsis_ShowMore_Short
          ShowMoreLangRes: true,
          ShowMoreAlign: 'after',
          ShowMoreHTMLEncode: void 0,
          ShowLess: true,
          ShowLessText: 'ngTextEllipsis_ShowLess_Long', // ngTextEllipsis_ShowLess_Short
          ShowLessLangRes: true,
          ShowLessAlign: 'after',
          ShowLessHTMLEncode: void 0,
          
          Expanded: false
        },
        Methods: {
          DoRelease: function(o) {
            delete this.cache_cw;
            delete this.cache_ch;
            delete this.cache_txt;
            delete this.cache_visiblechars;
            ng_CallParent(this, 'DoRelease', arguments);
          },
          DoExpand: function() {
            this.Expanded=true;
            this.Update();
            if(this.OnExpanded) this.OnExpanded(this);
          },
          Expand: function()
          {
            if(this.Expanded) return;
            if((this.OnExpanding)&&(!ngVal(this.OnExpanding(this),false))) return;
            this.DoExpand();
          },
          DoCollapse: function() {
            this.Expanded=false;
            this.Update();
            if(this.OnCollapsed) this.OnCollapsed(this);
          },
          Collapse: function()
          {
            if(!this.Expanded) return;
            if((this.OnCollapsing)&&(!ngVal(this.OnCollapsing(this),false))) return;
            this.DoCollapse();
          },
          ToggleExpanded: function()
          {
            if(this.Expanded) this.Collapse();
            else this.Expand();
          },
          ShowMoreClick: function(e)
          {
            this.ToggleExpanded();
          },
          DoPtrClick: function (pi)
          {
            if(pi.EventID==='expandtoggle')
            {
              var e=pi.Event;
              if(typeof e === 'undefined') e=new Object;
              e.Owner = this;
              this.ShowMoreClick(e);
              return;
            }
            ng_CallParent(this, 'DoPtrClick', arguments);
          },
          DoPtrStart: function (pi)
          {
            if(pi.EventID==='expandtoggle') return;
            ng_CallParent(this, 'DoPtrStart', arguments);          
          },
          GetEllipsisText: function() {
            if(this.OnGetEllipsisText) return ngVal(this.OnGetEllipsisText(this),'');
            if(this.EllipsisLangRes) return ngTxt(this.EllipsisText, this.EllipsisText);
            return this.EllipsisText;
          },
          GetShowMoreText: function() {
            if(this.OnGetShowMoreText) return ngVal(this.OnGetShowMoreText(this),'');
            if(this.ShowMoreLangRes) return ngTxt(this.ShowMoreText, this.ShowMoreText);
            return this.ShowMoreText;
          },
          GetShowLessText: function() {
            if(this.OnGetShowLessText) return ngVal(this.OnGetShowLessText(this),'');
            if(this.ShowLessLangRes) return ngTxt(this.ShowLessText, this.ShowLessText);
            return this.ShowLessText;
          },
          TruncateText: function(text, maxTextLength, trimpos, maxWordLength, ishtml, ellipsis, wordseparators) {
            if(typeof ishtml==='undefined') ishtml=(this.HTMLEncode!==ngHtmlEncode);
            if(typeof maxTextLength==='undefined')  maxTextLength=this.maxTextLength;
            if(typeof trimpos==='undefined') trimpos=this.TrimPos;
            if(typeof maxWordLength==='undefined') maxWordLength=this.MaxWordLength;
            if(typeof ellipsis==='undefined') ellipsis=this.GetEllipsisText();
            if(typeof wordseparators==='undefined') wordseparators=this.WordSeparators;
            return ngTextEllipsis(text, ishtml, maxTextLength, trimpos, maxWordLength, ellipsis,wordseparators);
          },
          GetVisibleCharCount: function(text, ishtml, nocache) {
            var o = this.Elm();
            if (!o) return;
            var o2 = document.getElementById(this.ID + '_T');
            if (!o2) {
              ng_CallParent(this, 'DoUpdate', [o]);
              o2 = document.getElementById(this.ID + '_T');
              if (!o2) return;
            }

            if (typeof ishtml === 'undefined') ishtml = (this.HTMLEncode !== ngHtmlEncode);
            if (typeof text === 'undefined') text = this.GetText();
            
            var maxWordLength=ngVal(this.MaxWordLength,10);
            var wordseparators=this.WordSeparators;
            var trimpos = this.TrimPos;
            if (typeof trimpos !== 'number') {
              trimpos = '' + ngVal(trimpos, 'right');
              if (trimpos === 'left') trimpos = 0;
              else if (trimpos === 'middle') trimpos = 50;
              else if (trimpos === 'right') trimpos = 100;
              else trimpos = parseInt(trimpos, 10) || 100;
            }

            var oldcontent = o2.innerHTML;
            var oldwidth2 = o2.style.width;
            var oldheight2 = o2.style.height;
            var oldheight = o.style.height;

            ng_BeginMeasureElement(o);
            var cw = ng_ClientWidth(o);
            var ch = ng_ClientHeight(o);

            if(this.MaxTextHeight!=='undefined') {
              ng_SetStyleHeight(o,this.MaxTextHeight);
              ch = ng_ClientHeight(o);
            }

            if ((!nocache) && (this.cache_cw === cw) && (this.cache_ch === ch) && 
                (this.cache_txt === text) && (this.cache_trimpos === trimpos) && 
                (this.cache_mwl === maxWordLength)) {
              o.style.height = oldheight;
              return this.cache_visiblechars;
            }

            o2.style.width = cw + 'px';
            o2.style.height = '';

            var t,ellipsisRaw = this.GetEllipsisText();
            var low = 0;
            var high = ishtml ? ng_htmlDecode(text).length : text.length;
            var bestFit = 0;

            var align,btn=this.GetButtonHTML(false);
            if(btn!=='') align=(''+this.ShowMoreAlign).toLowerCase();

            try {
              while (low <= high) {
                var mid = Math.floor((low + high) / 2);
                t = ngTextEllipsis(text, ishtml, mid, trimpos, maxWordLength, ellipsisRaw, wordseparators);
                if(btn!=='') {
                  if(align==='before') t=btn+t;
                  else t=t+btn;
                }
                o2.innerHTML = t;

                if (o2.scrollHeight > ch) {
                  high = mid - 1;
                } else {
                  bestFit = mid;
                  low = mid + 1;
                }
              }
            } finally {
              ng_EndMeasureElement(o);
              o.style.height = oldheight;
              o2.style.width = oldwidth2;
              o2.style.height = oldheight2;
              o2.innerHTML = oldcontent;
            }

            if (!nocache) {
              this.cache_cw = cw;
              this.cache_ch = ch;
              this.cache_txt = text;
              this.cache_trimpos = trimpos;
              this.cache_mwl = maxWordLength;
              this.cache_visiblechars = bestFit;
            }
            return bestFit;
          },
          GetButtonHTML: function(expanded) {
            expanded=ngVal(expanded,this.Expanded);
            var t=ngVal(expanded ? (this.ShowLess ? this.GetShowLessText() :'') : (this.ShowMore ? this.GetShowMoreText() : ''),'');
            if(t!='') {
              t=ngHtmlVal(t, true, ngVal(expanded ? this.ShowLessHTMLEncode : this.ShowMoreHTMLEncode, this.HTMLEncode));
              var align=(expanded ? this.ShowLessAlign : this.ShowMoreAlign);
              if((align!=='after')&&(align!=='before')) align='after';
              align=align.substr(0,1).toUpperCase()+align.substr(1).toLowerCase();
              return '<span id="'+this.ID+'_MORE" class="'+this.BaseClassName+(expanded ? 'ShowLess' : 'ShowMore')+align+'" '+ ngc_PtrEventsHTML(this, 'expandtoggle', 'tap drag') +'>'+t+'</span>';
            }
            return '';
          },
          DoUpdate: function(o) {
            var text;
            var htmlencode=this.HTMLEncode;
            var ishtml=(htmlencode!==ngHtmlEncode);
            this.Truncated=false;
            var maxlen=this.LengthLimit;
            if((typeof maxlen==='undefined')&&((!this.AutoSize)||(typeof this.MaxTextHeight!=='undefined'))) {
              text=this.GetText();
              maxlen=this.GetVisibleCharCount(text,ishtml);
            }
            maxlen=ngNullVal(maxlen,0);
            if(maxlen<=0) return ng_CallParent(this, 'DoUpdate', arguments,true);

            var ret;
            var orig_gettext=this.GetText;
            var orig_getalt=this.GetAlt;
            try {
              var alt;
              if(typeof text==='undefined') text=this.GetText();
              var newtext=this.TruncateText(text, maxlen, ngNullVal(this.TrimPos,100), ngNullVal(this.MaxWordLength,0), ishtml, this.GetEllipsisText(), this.WordSeparators);
              if(text!==newtext) { // truncated
                this.Truncated=true;
                alt=this.GetAlt();
                if(!this.Expanded) {
                  if(alt=='') alt=(ishtml ? ng_htmlDecode(text) : text);
                  text=newtext;
                }
              } else {
                return ng_CallParent(this, 'DoUpdate', arguments,true);
              }
              var self=this;
              this.GetAlt=function() { return alt; };
              this.GetText=function() {
                var ret=ngHtmlVal(text, true, htmlencode);
                if(self.AutoSize) {
                  var btn=self.GetButtonHTML();
                  if(btn!=='') {
                    var align=(this.Expanded ? this.ShowLessAlign : this.ShowMoreAlign);
                    if((''+align).toLowerCase()==='before') ret=btn+ret;
                    else ret+=btn;
                  }
                }
                return ret;
              };
              this.HTMLEncode=false;
              ret=ng_CallParent(this, 'DoUpdate', arguments,true);
            } finally {
              this.HTMLEncode=htmlencode;
              this.GetText=orig_gettext;
              this.GetAlt=orig_getalt;
            }
            return ret;
          }
        },
        Events: {
          OnGetEllipsisText: null,
          OnGetShowMoreText: null,
          OnGetShowLessText: null,
          OnExpanding: null,
          OnExpanded: null,
          OnCollapsing: null,
          OnCollapsed: null
        }
      });
      return ngCreateControlAsType(def, 'ngText', ref, parent);
    });
    
    // --- ngImageMap --------------------------------------------------------------

    function ngimgmap_DoCreate(d, ref, elm, parent)
    {
      if(((typeof d.W !== 'undefined')||((typeof d.L !== 'undefined')&&(typeof d.R !== 'undefined')))&&((typeof d.Data === 'undefined')||(typeof d.Data.AutoSize === 'undefined')))
        this.AutoSize=false;
    }

    function imgm_DoPtrStart(pi)
    {
      var eid=pi.EventID;
      if(eid.substr(0,3)==='shp')
      {
        var inelm=pi.IsInSrcElement();
        if(!inelm) // elementFromPoint has problem to detect area elements (FireFox)
        {
          pi.SrcElement=document.getElementById(this.ID+'_HM');
        }
        if(pi.Touch) {
          var bi=parseInt(eid.substring(3,eid.length));
          imgm_EnterShape(this,bi);
          pi.InShapeElm=true;
        }
      }
    }

    function imgm_DoPtrDrag(pi)
    {
      var eid=pi.EventID;
      if(eid.substr(0,3)==='shp')
      {
        if(pi.Touch)
        {
          var bi=parseInt(eid.substring(3,eid.length));
          var inelm=pi.IsInSrcElement();
          if((inelm)&&(!pi.InShapeElm))
          {
            imgm_EnterShape(this,bi);
            pi.InShapeElm=true;
          }
          else if((!inelm)&&(pi.InShapeElm))
          {
            imgm_LeaveShape(this,bi);
            pi.InShapeElm=false;
          }
        }
        return true;
      }
      return false;
    }

    function imgm_DoPtrEnd(pi)
    {
      var eid=pi.EventID;
      if(eid.substr(0,3)==='shp')
      {
        if((pi.Touch)&&(pi.InShapeElm)) {
          var bi=parseInt(eid.substring(3,eid.length));
          imgm_LeaveShape(this,bi);
        }
        delete pi.InShapeElm;
      }
    }

    function imgm_DoPtrClick(pi)
    {
      var eid=pi.EventID;
      if(eid.substr(0,3)==='shp')
      {
        if((pi.EndTime-pi.StartTime>=200)&&(!pi.IsInSrcElement())) return;
        var bi=parseInt(eid.substring(3,eid.length));
        var e=pi.Event;
        e.Owner=this;
        e.imap=this;
        e.imapshpidx=bi;
        if((bi>=0)&&(bi<this.Shapes.length))
        {
          var s=ngVal(this.Shapes[bi],null);
          e.imapshp=s;
          if((s)&&(s.OnClick)&&(!ngVal(s.OnClick(e),false))) return;
          if(this.OnShapeClick) this.OnShapeClick(e);
        }
      }
    }

    function imgm_LeaveShape(p,bi)
    {
      if((bi>=0)&&(bi<p.Shapes.length))
      {
        var s=ngVal(p.Shapes[bi],null);
        ngc_ChangeImg(p.ID+'_I', 0, p.Enabled, p.GetImg());
        var o=p.Elm();
        try { if(o) o.style.cursor=ngVal(p.Cursor,'default'); } catch(e) { }

        if((s)&&(s.OnMouseLeave)&&(!ngVal(s.OnMouseLeave(s,p,bi),false))) return;
        if(p.OnMouseShapeLeave) p.OnMouseShapeLeave(p,bi);
      }
    }

    function imgm_EnterShape(p,bi)
    {
      if((bi>=0)&&(bi<p.Shapes.length))
      {
        var s=ngVal(p.Shapes[bi],null);
        var img=(s ? ngVal(s.Img,null) : null);
        ngc_ChangeImg(p.ID+'_I', 0, p.Enabled, img);
        var clickev=((p.OnShapeClick)||((s)&&(s.OnClick)))&&(p.Enabled);
        var o=p.Elm();
        try { if(o) o.style.cursor=(s && s.Cursor ? s.Cursor : (clickev ? 'pointer' : 'default')); } catch(e) { }

        if((s)&&(s.OnMouseEnter)&&(!ngVal(s.OnMouseEnter(s,p,bi),false))) return;
        if(p.OnMouseShapeEnter) p.OnMouseShapeEnter(p,bi);
      }
    }

    function ngimgmap_DoMouseEnter(e, mi, elm)
    {
      ngc_EnterImg(this.ID+'_I');
      if(this.OnMouseEnter) this.OnMouseEnter(this);
    }

    function ngimgmap_DoMouseLeave(e, mi)
    {
      if(this.OnMouseLeave) this.OnMouseLeave(this);
      ngc_LeaveImg(this.ID+'_I');
      var o=this.Elm();
      try { if(o) o.style.cursor=ngVal(this.Cursor,'default'); } catch(e) { }
    }

    function ngimgmap_DoUpdate(o)
    {
      var salt;

      var alt=this.GetAlt();
      var image=this.GetImg();

      var html=new ngStringBuilder;
      if(image)
      {
        var dp=ngc_ImgProps(this.ID+'_I', 0, this.Enabled, image);
        ngc_Img(html,dp,"position:absolute;",(alt!='' ? 'title="'+ngHtmlAttr(alt)+'"' : '')+ngVal(image.Attrs,''));
        if(this.AutoSize)
        {
          ng_SetClientWidth(o,dp.W);
          ng_SetClientHeight(o,dp.H);
          var cbw=ng_StyleWidth(o);
          var cbh=ng_StyleHeight(o);
          if((this.Bounds.W!=cbw)||(this.Bounds.H!=cbh))
          {
            this.Bounds.W=cbw;
            this.Bounds.H=cbh;
            this.SetBounds();
          }
        }
      }
      var w=ng_ClientWidth(o);
      var h=ng_ClientHeight(o);

      var imgmap=new ngStringBuilder();
      for(var i=0;i<this.Shapes.length;i++)
      {
        var s=this.Shapes[i];
        if(ngVal(s.Coords,'')=='') continue;

        if(this.OnGetShapeAlt) salt=ngVal(this.OnGetShapeAlt(this,i),'');
        else salt=ngVal(s.Alt,'');

        var clickev=((this.OnShapeClick)||(s.OnClick))&&(this.Enabled);
        imgmap.append('<area id="'+this.ID+'_S'+i+'" shape="'+ngVal(s.Shape,'rect')+'" coords="'+s.Coords+'" title="'+ngHtmlAttr(salt)+'"');
        if(clickev)
        {
          imgmap.append(' '+ngc_PtrEventsHTML(this,'shp'+i,'tap drag'));
        }
        imgmap.append(' />');
      }
      if(!imgmap.empty())
      {
        html.append('<img id="'+this.ID+'_HM" src="'+ngEmptyURL+'" style="position:absolute; width:'+w+'px; height:'+h+'px; z-index: 10;" alt="'+ngHtmlAttr(alt)+'" border="0" usemap="#'+this.ID+'_IMAP" />');
        html.append('<map id="'+this.ID+'_IM" name="'+this.ID+'_IMAP">');
        html.append(imgmap);
        html.append('</map>');
      }
      ng_SetInnerHTML(o,html.toString());
      var s;
      var self=this;
      function addevents(s,idx) {
        s.onmouseover=function(e) {
          if(!e) e=window.event;
          if((ngUsingTouch)&&(e)&&(e.type.toLowerCase().match(/mouse/))) return; // ignore mouse events if using touch
          imgm_EnterShape(self,idx);
        };
        s.onmouseout=function(e) {
          if(!e) e=window.event;
          if((ngUsingTouch)&&(e)&&(e.type.toLowerCase().match(/mouse/))) return; // ignore mouse events if using touch
          imgm_LeaveShape(self,idx);
        };
      }
      for(var i=0;i<this.Shapes.length;i++)
      {
        s=document.getElementById(this.ID+'_S'+i);
        if(s) addevents(s,i);
      }
      return true;
    }

    /**
     *  Class: ngImageMap
     *  This class implements a generic imagemap control.
     *
     *  Syntax:
     *    new *ngImageMap* ([string id])
     *
     *  Parameters:
     *    id - control ID
     *
     *  See also:
     *    Abstract class <ngControl>.
     */
    window.ngImageMap=function(id)
    {
      ngControl(this, id, 'ngImageMap');

      this.DoCreate = ngimgmap_DoCreate;
      this.DoUpdate = ngimgmap_DoUpdate;
      this.DoMouseEnter = ngimgmap_DoMouseEnter;
      this.DoMouseLeave = ngimgmap_DoMouseLeave;
      this.DoPtrStart = imgm_DoPtrStart;
      this.DoPtrDrag = imgm_DoPtrDrag;
      this.DoPtrEnd = imgm_DoPtrEnd;
      this.DoPtrClick = imgm_DoPtrClick;

      /*
      *  Group: Properties
      */
      /*  Variable: Alt
      *  ...
      *  Type: string
      */
      this.Alt = '';
      /*  Variable: Img
      *  ...
      *  Type: object
      */
      this.Img = null;
      /*  Variable: Cursor
      *  ...
      *  Type: string
      */
    //  this.Cursor = undefined;
      /*  Variable: AutoSize
      *  ...
      *  Type: bool
      */
      this.AutoSize = true;

      /*  Variable: Shapes
      *  ...
      *  Type: array
      */
      this.Shapes = new Array();
      /*
      *  Group: Methods
      */
      /*  Function: GetAlt
      *  Gets alt text.
      *
      *  Syntax:
      *    string *GetAlt* (void)
      *
      *  Returns:
      *    Alt text.
      */
      this.GetAlt=ngc_GetAlt;

      /*  Function: GetImg
      *  Gets image.
      *
      *  Syntax:
      *    object *GetImg* (void)
      *
      *  Returns:
      *    The image.
      */
      this.GetImg=ngc_GetImg;

      /*
      *  Group: Events
      */
      /*
      *  Event: OnGetAlt
      */
      this.OnGetAlt = null;
      /*
      *  Event: OnGetImg
      */
      this.OnGetImg = null;

      /*
      *  Event: OnGetShapeAlt
      */
      this.OnGetShapeAlt = null;

      /*
      *  Event: OnShapeClick
      */
      this.OnShapeClick = null;
      /*
      *  Event: OnMouseEnter
      */
      this.OnMouseEnter = null;
      /*
      *  Event: OnMouseLeave
      */
      this.OnMouseLeave = null;

      /*
      *  Event: OnMouseShapeEnter
      */
      this.OnMouseShapeEnter = null;
      /*
      *  Event: OnMouseShapeLeave
      */
      this.OnMouseShapeLeave = null;

      ngControlCreated(this);
    }
    ngRegisterControlType('ngImageMap', function() { return new window.ngImageMap; });

    // --- ngWebBrowser ------------------------------------------------------------

    function ngwb_DoCreate(def, ref, elm, parent)
    {
      var url=(ngIExplorer && (ngIExplorerVersion < 8) ? 'javascript:' : 'about:blank');
      ng_SetInnerHTML(elm,'<iframe src="'+url+'" id="'+this.ID+'_F" style="position: absolute;" frameborder="0" allowtransparency="yes"></iframe>');
    }

    function ngwb_DoUpdate(o)
    {
      var frame=this.GetBrowser();
      if(!frame) return true;

      var w=ng_ClientWidth(o);
      var h=ng_ClientHeight(o);
      ng_SetClientWidth(frame,w);
      ng_SetClientHeight(frame,h);

      var url=this.GetURL();
      if((frame.src!=this.opened_url)&&((!this.InDesignMode)||(this.DesignLive)))
      {
        frame.src=url;
        this.opened_url=frame.src;
      }
      return true;
    }

    function ngwb_SetURL(url)
    {
      if((this.OnSetURL)&&(!ngVal(this.OnSetURL(this,url),false))) return;
      this.URL=url;
      var br=this.GetBrowser()
      if((br)&&((!this.InDesignMode)||(this.DesignLive)))
      {
        br.src=url;
        this.opened_url=br.src;
      }
    }

    function ngwb_GetURL()
    {
      var url=this.URL;
      if(this.OnGetURL) url=this.OnGetURL(this,url);
      return url;
    }

    function ngwb_GetBrowser()
    {
      var frame=document.getElementById(this.ID+'_F');
      return frame;
    }

    function ngwb_GetDocument()
    {
      var br=this.GetBrowser()
      if(!br) return null;
      try
      {
        return (br.contentDocument ? br.contentDocument : br.contentWindow.document);
      }
      catch(e)
      {
        return null;
      }
    }

    function ngwb_SetHTML(html, allowdelayed)
    {
      if(this.OnSetHTML)
      {
        html=this.OnSetHTML(this,html);
        if(html=='') return;
      }
      if(this.opened_url!='') this.SetURL('about:blank');

      var doc=this.GetDocument();
      if(doc)
      {
        try
        {
          doc.open();
          if(typeof html==='object')
          {
            if(html)
              for(var i in html)
                doc.write(html[i]);
          }
          else doc.write(html);
          doc.close();
          return;
        }
        catch(e)
        {
        }
      }
      if(ngVal(allowdelayed, true))
      {
        // we don't have access to document, try it later
        var c=this;
        this.set_html_timeout=setTimeout(function(e) {
          if(c.set_html_timeout) clearTimeout(c.set_html_timeout); c.set_html_timeout=null;
          if(typeof c.SetHTML==='function') c.SetHTML(html,false);
        },200);
      }
    }

    /**
     *  Class: ngWebBrowser
     *  This class implements a web browser control.
     *
     *  Syntax:
     *    new *ngWebBrowser* ([string id])
     *
     *  Parameters:
     *    id - control ID
     *
     *  See also:
     *    Abstract class <ngControl>.
     */

    window.ngWebBrowser=function(id)
    {
      ngControl(this, id, 'ngWebBrowser');
      this.DoCreate = ngwb_DoCreate;
      this.DoUpdate = ngwb_DoUpdate;

      /*
      *  Group: Properties
      */
      /*  Variable: URL
      *  ...
      *  Type: string
      */
      this.URL = '';

      /*
      *  Group: Methods
      */
      /*  Function: SetURL
      *  Sets browser URL.
      *
      *  Syntax:
      *    void *SetURL* (string url)
      *
      *  Returns:
      *    -
      */
      this.SetURL = ngwb_SetURL;
      /*  Function: GetURL
      *  Gets browser URL.
      *
      *  Syntax:
      *    string *GetURL* ()
      *
      *  Returns:
      *    The URL.
      */
      this.GetURL = ngwb_GetURL;
      /*  Function: SetHTML
      *  Sets HTML code directly into browser.
      *
      *  Syntax:
      *    void *SetHTML* (string html [, bool allowdelayed=true])
      *
      *  Returns:
      *    -
      */
      this.SetHTML = ngwb_SetHTML;
      /*  Function: GetBrowser
      *  Gets browser IFRAME element.
      *
      *  Syntax:
      *    object *GetBrowser* ()
      *
      *  Returns:
      *    IFRAME element.
      */
      this.GetBrowser = ngwb_GetBrowser;
      /*  Function: GetDocument
      *  Gets browser document object.
      *
      *  Syntax:
      *    object *GetDocument* ()
      *
      *  Returns:
      *    Document object.
      */
      this.GetDocument = ngwb_GetDocument;

      /*
      *  Group: Events
      */
      /*
      *  Event: OnSetURL
      */
      this.OnSetURL = null;
      /*
      *  Event: OnGetURL
      */
      this.OnGetURL = null;
      /*
      *  Event: OnSetHTML
      */
      this.OnSetHTML = null;

      ngControlCreated(this);
    }
    ngRegisterControlType('ngWebBrowser', function() { return new window.ngWebBrowser; });
  }
};