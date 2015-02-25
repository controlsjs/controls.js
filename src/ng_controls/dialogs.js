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
 *  Group: Dialogs 
 */

// --- English resources -------------------------------------------------------
if(typeof ngc_Lang === 'undefined') ngc_Lang=new Array();
if(typeof ngc_Lang['en'] === 'undefined') ngc_Lang['en']=new Array();
ngc_Lang['en']['mbOK']='OK';
ngc_Lang['en']['mbCancel']='Cancel';
ngc_Lang['en']['mbYes']='Yes';
ngc_Lang['en']['mbNo']='No';

ngc_Lang['en']['ngAbout']='About';
ngc_Lang['en']['ngAboutVersion']='Version %s';
ngc_Lang['en']['ngAboutBrowser']='Browser: %s';
ngc_Lang['en']['ngAboutWindow']='Window: %s';
ngc_Lang['en']['ngAboutLanguage']='Language: %s';
ngc_Lang['en']['ngAboutUserControls']='User Controls: %s';
ngc_Lang['en']['ngAboutSystemInfo']='System Info';
ngc_Lang['en']['ngAboutComponents']='Used Components';
ngc_Lang['en']['ngAboutLibraries']='Libraries';
ngc_Lang['en']['ngAboutTrademarks']='Legal Trademarks';
ngc_Lang['en']['ngAboutReleaseNotes']='Release Notes';

// --- Czech resources ---------------------------------------------------------
if(typeof ngc_Lang['cz'] === 'undefined') ngc_Lang['cz']=new Array();
ngc_Lang['cz']['mbOK']='OK';
ngc_Lang['cz']['mbCancel']='Storno';
ngc_Lang['cz']['mbYes']='Ano';
ngc_Lang['cz']['mbNo']='Ne';

ngc_Lang['cz']['ngAbout']='O aplikaci';
ngc_Lang['cz']['ngAboutVersion']='Verze %s';
ngc_Lang['cz']['ngAboutBrowser']='Prohlížeč: %s';
ngc_Lang['cz']['ngAboutWindow']='Okno: %s';
ngc_Lang['cz']['ngAboutLanguage']='Jazyk: %s';
ngc_Lang['cz']['ngAboutSystemInfo']='Systémové informace';
ngc_Lang['cz']['ngAboutComponents']='Použité komponenty';
ngc_Lang['cz']['ngAboutLibraries']='Knihovny';
ngc_Lang['cz']['ngAboutTrademarks']='Ochranné známky';
ngc_Lang['cz']['ngAboutReleaseNotes']='Poznámky k verzi';

// --- Slovak resources ---------------------------------------------------------
if(typeof ngc_Lang['sk'] === 'undefined') ngc_Lang['sk']=new Array();
ngc_Lang['sk']['mbOK']='OK';
ngc_Lang['sk']['mbCancel']='Storno';
ngc_Lang['sk']['mbYes']='Áno';
ngc_Lang['sk']['mbNo']='Nie';

ngc_Lang['sk']['ngAbout']='O aplikácii';
ngc_Lang['sk']['ngAboutVersion']='Verzia %s';
ngc_Lang['sk']['ngAboutBrowser']='Prehliadač: %s';
ngc_Lang['sk']['ngAboutWindow']='Okno: %s';
ngc_Lang['sk']['ngAboutLanguage']='Jazyk: %s';
ngc_Lang['sk']['ngAboutSystemInfo']='Systémové informácie';
ngc_Lang['sk']['ngAboutComponents']='Použité komponenty';
ngc_Lang['sk']['ngAboutLibraries']='Knižnice';
ngc_Lang['sk']['ngAboutTrademarks']='Ochranné známky';
ngc_Lang['sk']['ngAboutReleaseNotes']='Poznámky k verzii';


var mbNone   =  0;
var mbCancel =  1;
var mbOK     =  2;
var mbYes    =  4;
var mbNo     =  8;

var mbDefButton1 = 256; 
var mbDefButton2 = 512;
var mbDefButton3 = 768;
var mbDefButton4 = 1024;

var mbDefButtonMask = mbDefButton1|mbDefButton2|mbDefButton3|mbDefButton4;

var mbMinimalWidth  = 180;
var mbMinimalHeight = 0;


// --- Dialog create helper fnc ------------------------------------------------

/** 
 *  Group: Functions   
 */
/**
 *  Function: ngMessageDlg
 *  Creates dialog.
 *  
 *  Syntax:
 *    object *ngMessageDlg* (string type, string text, string caption [, function onclose = undefined, object def = {}])
 *
 *  Parameters:
 *    type - dialog control type
 *    text - message text
 *    caption - dialog caption
 *    onclose - on close function callback 
 *    def - dialog definition
 *               
 *  Returns:
 *    Created dialog.
 *    
 *  Definition specials:
 *    DlgLangTxt - if true (default) uses proper locale for caption and text (ngTxt). 
 *    DlgHtmlEncode - if true (default) encodes HTML special characters in caption and text
 *    DlgShowDialog - if true (default) shows dialog after creation   
 */
function ngMessageDlg(type, text, caption, onclose, def)
{
  if(typeof def==='undefined') def=new Object;  
  ng_MergeDef(def, {
    DlgLangTxt: true, 
    DlgHtmlEncode: true,
    DlgShowDialog: true,
    Type: type,
    Data: {
      Text: caption
    },
    Events: {
      OnClose: onclose
    },
    Controls: {
      Message: {
        Data: {
          Text: text
        }
      }
    }     
  });
  if(def.DlgLangTxt)
  {
    if(typeof caption!=='undefined') caption=ngTxt(caption, caption);
    if(typeof text!=='undefined')    text   =ngTxt(text, text);
  }  
  if(def.DlgHtmlEncode)
  {
    caption = ng_htmlEncode(caption);
    text = ng_htmlEncode(text);
    text = text.replace(/\n/g, "<br/>");
  }
    
  var win=ngCreateWindow(def);
  if((win)&&(def.DlgShowDialog)) win.Show();
  return win;
}

// --- ngMessageDlg ------------------------------------------------------------

function dlgbx_BtnClick(e)
{
  var b=e.Owner;
  if(typeof b.DialogResult !== 'undefined')
  {
    b.Owner.Owner.DialogResult=b.DialogResult;
    b.Owner.Owner.Close();
  }
}

function dlgbx_Center()
{
  var o=this.Elm();
  if(!o) return;
  var po=o.offsetParent;
  if((po)&&(po==document.body)) po=null;
  var pw=(po ? ng_ClientWidth(po) : ng_WindowWidth()); 
  var ph=(po ? ng_ClientHeight(po) : ng_WindowHeight()); 
  
  var b=this.Bounds;
  var w=ng_ClientWidth(o);
  var h=ng_ClientHeight(o);

  b.L=Math.round((pw-w)/2);
  b.T=Math.round(0.40*ph-(h/2));
  if(b.T<0) b.T=0;
  
  this.SetBounds();
}

function dlgbx_CalcAutoSize()
{
  if(!ngVal(this.ControlsPanel,false)) return;
 
  var o=this.Elm();
  if(!o) return;
  var po=o.offsetParent;
  if((po)&&(po==document.body)) po=null;
  var pw=(po ? ng_ClientWidth(po) : ng_WindowWidth()); 
  var ph=(po ? ng_ClientHeight(po) : ng_WindowHeight()); 

  var cmw=ng_OuterWidth(o)-ng_ClientWidth(this.ControlsPanel.Elm());

  // set to max size (eliminate scrollbars)
  ng_SetClientWidth(o,pw);
  ng_SetClientHeight(o,ph);
   
  var w=0,h=0,bw=0,minx=0,miny=0;

  // calculate size and position of msg box components
  var msg=ngVal(this.Controls.Message,null);
  var content=ngVal(this.Controls.Content,null); 
  var btns=ngVal(this.Controls.Buttons,null);
  var fnote=ngVal(this.Controls.Footnote,null);

  // calculate right/bottom margin by minimal left/top position of components   
  var cc=this.ControlsPanel.ChildControls;
  if(typeof cc !== 'undefined')
  {
    minx=10000,miny=10000;
    var l,t;
    for(var i=0;i<cc.length;i++) 
    {
      if(cc[i]==btns) continue;
      o=cc[i].Elm();
      l=ng_GetCurrentStylePx(o,'left');
      if(l<minx) minx=l;
      if(cc[i]!=content)
      {
        t=ng_GetCurrentStylePx(o,'top');
        if(t<miny) miny=t;
      }      
    }
  }
  
  // message
  o=(msg ? msg.Elm() : null);
  if((o)&&(msg.Visible))
  {
    var ml=ng_GetCurrentStylePx(o,'left');
    var mw=ng_OuterWidth(o)
    if(ml+mw+minx+cmw>pw) // text width overflows maximal allowed width 
    {
      mw=pw-cmw-minx-ml;
      msg.AutoSizeMode='vertical';
      msg.SetBounds({W: mw});
      msg.Update(false); 
    } 
    w=ml+mw;        
    h=ng_GetCurrentStylePx(o,'top')+ng_OuterHeight(o);
  }  
  // put content under message
  o=(content ? content.Elm() : null);
  if((o)&&(content.Visible))
  {
    content.SetBounds({ T: h });  
    h+=ng_OuterHeight(o);
  }
  // center buttons and put them under content/message
  o=(btns ? btns.Elm() : null)
  if(o)
  {
    var cc=btns.ChildControls;
    if((btns.Visible)&&(typeof cc !== 'undefined')&&(cc.length>0))
    {
      bw=ng_OuterWidth(o);
      if(btns.CenterButtons)
      {
        o.style.marginLeft=(-Math.round(bw/2))+'px';  
        btns.SetBounds({ L: '50%', T: h });
      }
      else btns.SetBounds({ T: h });
      h+=ng_OuterHeight(o);
      btns.SetVisible(true);
    }
    else btns.SetVisible(false);
  }
  // put footnote under buttons
  o=(fnote ? fnote.Elm() : null);
  if((o)&&(fnote.Visible))
  {
    fnote.SetBounds({ T: h });  
    h+=ng_OuterHeight(o);
  }

  // add margin
  if(w<bw) w=bw+2*minx;  
  else     w+=minx;
  h+=miny;
  
  // check minimal dialog size
  if(w<mbMinimalWidth)  w=mbMinimalWidth;
  if(h<mbMinimalHeight) h=mbMinimalHeight;

  this.SetClientRect({W: w, H: h });

  // check parent size
  if(this.Bounds.W>pw) this.Bounds.W=pw;
  if(this.Bounds.H>ph) this.Bounds.H=ph;

  if(this.Bounds.W<this.MinWidth) this.MinWidth=this.Bounds.W;
  if(this.Bounds.H<this.MinHeight) this.MinHeight=this.Bounds.H;
  this.SetBounds();
  this.Update();
}

// --- ngAboutDlg --------------------------------------------------------------

function ngAboutBrowser()
{
  var browser='';
  if(ngIExplorer) 
  {
    browser='Internet Explorer '+ngIExplorerVersion;        
    if((ngIExplorer6)&&(ngIE6AlignFix)) browser+=' (align fix)';
  }
  if(ngFireFox)
  {
    if(ngFireFox1x) browser='FireFox 1.x';
    else if(ngFireFox2x) browser='FireFox 2.x';
    else browser='FireFox';
  }
  if(ngOpera)  browser='Opera'+ngOperaVersion;
  if(ngSafari) browser='Safari';
  if(ngChrome) browser='Chrome';
  
  if(browser=='')
  {
    browser=navigator.userAgent;
    var i=browser.indexOf('(');
    if(i>=0) browser=browser.substr(0,i);
  }
  return browser;
} 

// --- Controls Registration ---------------------------------------------------

if(typeof ngUserControls === 'undefined') ngUserControls = new Array();
ngUserControls['dialogs'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function() {

    /*  Class: ngMessageDlg
     *  Basic message dialog (based on <ngWindow>).
     */
    /*<>*/
    /*
     *  Group: Definition
     */
    /*
     *  Variable: DlgButtons
     *  ...
     *  Type: integer
     *  Default value: *mbOK*       
     */
    /*
     *  Variable: DialogType
     *  ...
     *  Type: string
     *  Default value: *'ngWindow'*       
     */

    /*
     *  Group: Properties
     */
    /*
     *  Variable: DialogResult
     *  ...
     *  Type: integer
     */    
    ngRegisterControlType('ngMessageDlg', function(def,ref,parent) {      
      ng_MergeDef(def, {
        DialogType: 'ngWindow',
        W: 200, H: 150,
        CloseBtn: false,
        Data: {          
          DialogResult: mbNone,
          
          AutoSize: true,
          Centered: true,
          Visible: false,
          Sizeable: false,
          Modal: true,
          DisposeOnClose: true,
          
          // override standard dialog functions
          Center: dlgbx_Center,            
          CalcAutoSize: dlgbx_CalcAutoSize
        },
        /*
         *  Group: Controls
         */  
        Controls: {
          /*  Object: Message
           *  <ngText>     
           */     
          Message: {
            Type: 'ngText',
            L: 15, T: 15, 
            Data: {
              AutoSize: true
            }
          },
          /*  Object: Content
           *  <ngPanel>     
           */     
          Content: {
            Type: 'ngPanel',
            L: 15, R: 15, H: 15
          },            
          /*  Object: Buttons
           *  <ngToolBar>     
           */     
          Buttons: {
            Type: 'ngToolBar',
            H: 23,
            Data: {
              CenterButtons: true,
              Vertical: true,
              AutoSize: true,
              HPadding: 10
            },
            Controls: {
              /*  Object: OK
               *  <ngButton>     
               */     
              OK: {
                Type: 'ngButton',
                W: 80,
                Data: {
                  ngText: 'mbOK',
                  Default: true,
                  DialogResult: mbOK
                }              
              },
              /*  Object: Yes
               *  <ngButton>     
               */     
              Yes: {
                Type: 'ngButton',
                W: 80,
                Data: {
                  ngText: 'mbYes',
                  Default: true,
                  DialogResult: mbYes
                }              
              },
              /*  Object: No
               *  <ngButton>     
               */     
              No: {
                Type: 'ngButton',
                W: 80,
                Data: {
                  ngText: 'mbNo',
                  DialogResult: mbNo
                }              
              },
              /*  Object: Cancel
               *  <ngButton>     
               */     
              Cancel: {
                Type: 'ngButton',
                W: 80,
                Data: {
                  ngText: 'mbCancel',
                  Cancel: true,
                  DialogResult: mbCancel
                }
              }              
            }                                        
          }
/*       ,Footnote: {
            Type: 'ngPanel',
            L: 15, R: 15, H: 15
          }*/
        }
      });
      var b,btns=def.Controls.Buttons.Controls;
      var revertbtn=def.Controls.Buttons.Data.HAlign==='right' ? true : false;
      var bcnt=0;
      def.DlgButtons=ngVal(def.DlgButtons, mbOK);
      if(!(def.DlgButtons & mbOK))     delete btns.OK;
      if(!(def.DlgButtons & mbYes))    delete btns.Yes;
      if(!(def.DlgButtons & mbNo))     delete btns.No;
      if(!(def.DlgButtons & mbCancel)) delete btns.Cancel;

      if(revertbtn)
      {
        for(var i in btns) bcnt++;

        var t=new Array();
        for(var l in btns) t.push(l);
        var tb=new Object;
        for(var j=t.length-1;j>=0;j--)
          tb[t[j]]=btns[t[j]];
        btns=tb;
        def.Controls.Buttons.Controls=tb;
      }
      
      var defbtn = def.DlgButtons & mbDefButtonMask;
      switch(defbtn)
      {
        case mbDefButton1: defbtn=!revertbtn ? 1 : bcnt; break;
        case mbDefButton2: defbtn=!revertbtn ? 2 : bcnt-1; break;
        case mbDefButton3: defbtn=!revertbtn ? 3 : bcnt-2; break;
        case mbDefButton4: defbtn=!revertbtn ? 4 : bcnt-3; break;
        default:           defbtn=-1; break;
      }
      var defresult=undefined;
      var cancel=false;
      bcnt=0;
      for(var i in btns)
      {
        b=btns[i];
        bcnt++;
        if(typeof b.Data === 'undefined') b.Data=new Object;
        if(defbtn!=-1) 
        {
          if(bcnt==defbtn)
          {
            b.Data.Default=true;
            if(typeof b.Data.Cancel!=='undefined') b.Data.Cancel=false;
          }
          else if(typeof b.Data.Default!=='undefined') b.Data.Default=undefined;
        }
        if(typeof b.Data.DialogResult !== 'undefined')
        {
          if(!b.Data.OnClick) b.Data.OnClick=dlgbx_BtnClick;
          if(b.Data.DialogResult == mbCancel) // cancel found, assign close btn  
          {
            def.Data.DialogResult=mbCancel;
            def.CloseBtn=true;
            defresult=mbNone;
          }
          if(typeof defresult==='undefined') defresult=b.Data.DialogResult;
          else if(defresult != b.Data.DialogResult) defresult=mbNone;
        }
      }
      if(bcnt==1) // one button
      {
        if(typeof b.Data.Default==='undefined') b.Data.Default=true;
        if(typeof b.Data.Cancel ==='undefined') b.Data.Cancel=true;
      }
      if(ngVal(defresult,mbNone)!=mbNone) // one action, assign close btn
      {
        def.Data.DialogResult=defresult;
        def.CloseBtn=true;
      }
      if(def.DialogType == 'ngMessageDlg') def.DialogType='ngWindow';

      var c=ngCreateControlAsType(def, def.DialogType, ref, parent);
      if(!c) return c;

      if(c.CloseButton) c.CloseButton.AddEvent(function() {
        c.DialogResult=(ngVal(defresult,mbNone)!=mbNone ? defresult : mbCancel);
      }, 'OnClick');

      return c;
    });

    /*  Class: ngAboutDlg
     *  Application about dialog (based on <ngMessageDlg>).
     */
    /*<>*/
    ngRegisterControlType('ngAboutDlg', function(def,ref,parent) {
      var appname=ngTxt('ngAppName',document.title);
      var sp=ngVal(ngApp.StartParams, null);
      var appver=(sp ? ngVal(sp.Version,'') : '');
      var appcopy=ngTxt('ngAppCopyright','');
      if(appver!='') 
      {
        var i=appver.indexOf('.');
        if(i<0) appver+='.0';
        appver=ng_sprintf(ngTxt('ngAboutVersion'),appver);
      }      

      ng_MergeDef(def, {
        DialogType: 'ngMessageDlg',
        DlgButtons: mbOK,

        /*
         *  Group: Definition
         */
        /*
         *  Variable: AboutSystemInfo
         *  ...
         *  Type: array
         *  Default value: *null*       
         */
        AboutSystemInfo: null,
        /*
         *  Variable: AboutComponents
         *  ...
         *  Type: array
         *  Default value: *null*       
         */
        AboutComponents: null,
        /*
         *  Variable: AboutLibraries
         *  ...
         *  Type: array
         *  Default value: *null*       
         */
        AboutLibraries: null,
        /*
         *  Variable: AboutTrademarks
         *  ...
         *  Type: array
         *  Default value: *null*       
         */
        AboutTrademarks: null,
        /*
         *  Variable: AboutReleaseNotes
         *  ...
         *  Type: array
         *  Default value: *null*       
         */
        AboutReleaseNotes: null,

        Data: {
          /*
           *  Group: Properties
           */
          /*
           *  Variable: AppName
           *  ...
           *  Type: string
           */
          AppName: appname,
          /*
           *  Variable: AppVersion
           *  ...
           *  Type: string
           */
          AppVersion: appver,
          /*
           *  Variable: AppCopyright
           *  ...
           *  Type: string
           */
          AppCopyright: appcopy,
          /*
           *  Variable: AppText
           *  ...
           *  Type: string
           */
          AppText: '',
                        
          ngText: 'ngAbout'      
        },
        /*
         *  Group: Controls
         */  
        Controls: {
          Message: {
            Data: {
              MinWidth: 260
            },
            Events: {
              OnGetText: function(c) {
                c=c.ParentControl.ParentControl;
                var txt='<b>'+c.AppName+'</b>';
                if(c.AppVersion!='') txt+='<br /><i>'+c.AppVersion+'</i>';
                if(c.AppCopyright!='') txt+='<br />&nbsp;<br />'+appcopy;
                if(c.AppText!='') txt+='<br />&nbsp;<br />'+c.AppText;
                return txt;
              }
            }
          },
          Content: {
            H: 125, 
            Controls: {
              /*  Object: AppInfo
               *  <ngList>     
               */     
              AppInfo: {
                Type: 'ngList',
                L:0, T: 20, R: 0, H: 90,
                Data: {
                  Items: [ 
                    { id: 'SystemInfo',   Text: '<b>'+ngTxt('ngAboutSystemInfo')+'</b>',   Collapsed: true },
                    { id: 'Components',   Text: '<b>'+ngTxt('ngAboutComponents')+'</b>',   Collapsed: true },
                    { id: 'Libraries',    Text: '<b>'+ngTxt('ngAboutLibraries')+'</b>',    Visible: false },
                    { id: 'Trademarks',   Text: '<b>'+ngTxt('ngAboutTrademarks')+'</b>',   Visible: false },
                    { id: 'ReleaseNotes', Text: '<b>'+ngTxt('ngAboutReleaseNotes')+'</b>', Visible: false }
                  ]
                },
                Events: {
                  OnClick: function(e) {
                    if((e.listPart==1)&&(typeof e.listItem.Collapsed !=='undefined'))
                    {
                      e.list.ToggleCollapsed(e.listItem);
                      
                      // auto scroll items in bottom half of the list
                      var lo=e.list.Elm();
                      var o=e.listObj;
                      if((lo)&&(o)&&(!e.listItem.Collapsed))
                      {                   
                        var loh=ng_ClientHeight(lo);
                        if(o.offsetTop>lo.scrollTop+loh/2)
                          lo.scrollTop=o.offsetTop;
                      }
                    }
                    return true;
                  }                  
                }
              }              
            }
          },
          Buttons: {
            R: 15,
            Data: {
              CenterButtons: false
            }
          }            
        }
      });      
      
      // Languages
      var langs='';
      var alangs=ngGetSupportedLangs();

      if(alangs.length>0)
      {
        alangs.sort();
        for(var i=0;i<alangs.length;i++)
        {
          if(alangs[i]==ngApp.Lang) continue;
          if(langs!='') langs+=', ';
          langs+=alangs[i];
        }
        langs=" ("+langs+")";
      }
      else langs='none';
      
      // Window
      var window=ng_WindowWidth()+'x'+ng_WindowHeight();
      
      var items=def.Controls.Content.Controls.AppInfo.Data.Items;
      items[0].Collapsed=true;
      items[0].Items=[ ng_sprintf(ngTxt('ngAboutBrowser'),ngAboutBrowser()), ng_sprintf(ngTxt('ngAboutWindow'),window), ng_sprintf(ngTxt('ngAboutLanguage'),ngApp.Lang+langs) ];
      
      function ngAboutAddInfo(f,t)
      {
        if((typeof f === 'object')&&(f)&&(f.length>0))
        {
          t.Collapsed=true;
          if(!ngVal(t.Visible,true)) t.Visible=true;
          if(typeof t.Items==='undefined') t.Items=new Array();
          for(var i=0;i<f.length;i++)
            t.Items[t.Items.length]=(typeof f[i]==='string' ? { Text: f[i] } : f[i]);        
        }
      }
      
      ngAboutAddInfo(def.AboutSystemInfo,items[0]);

      // Components
      items[1].Collapsed=true;
      items[1].Items=[ { Text: 'Controls v'+ngControlsVersion+'<br /><small>'+ngControlsCopyright+'</small>' } ];

      // ngMapAPI
      if(typeof ngMapAPIVersion !== 'undefined')
      {
        var l=items[1].Items.length;
        var mapcopy=ngVal(ngMapAPICopyright,'');
        items[1].Items[l]= { Text: 'ngMapAPI v'+ngMapAPIVersion+'<br /><small>'+mapcopy+'</small>' };
      }

      // User Controls
      if(typeof ngUserControls !== 'undefined')
      {
        var actrls=new Array();
        for(var i in ngUserControls)
          actrls[actrls.length]=i;
        
        if(actrls.length>0)
        {
          var ctrls='',uc,uccopy,ucver,ucname;
          actrls.sort();
          for(var i=0;i<actrls.length;i++)
          {
            if(i>0) ctrls+=', ';
            uc=ngUserControls[actrls[i]];
            if(uc)
            {
              ucver=ngVal(uc.Version,'');
              ucver+=ngVal(uc.SubVersion,(ucver!='' ? '.0' : ''));
              uccopy=ngVal(uc.Copyright,'');
              ucname=ngVal(uc.Name,(uccopy!='' ? actrls[i] : ''));
              if(ucname!='')
              {              
                if(ucver!='') ucname+=' v'+ucver;
                if(uccopy!='') ucname+='<br /><small>'+uccopy+'</small>';
                items[1].Items[items[1].Items.length]= { Text: ucname };
              }
            }
            ctrls+=actrls[i];
          }
          items[1].Items[0].Collapsed=true;
          items[1].Items[0].Items=[ { Text: ng_sprintf(ngTxt('ngAboutUserControls'),ctrls) } ];
        }
      }
      
      
      ngAboutAddInfo(def.AboutComponents,items[1]);
      
      // Libraries
      if(typeof ngLib !== 'undefined') 
      {
        items[2].Collapsed=true;
        items[2].Items = new Array;
        items[2].Visible=(items[2].Visible)||(!ng_EmptyVar(ngLib));
        var libitems=items[2].Items;
        for(var i in ngLib)
        {
          var txt=i;
          var ver=(typeof ngLib[i] === 'object' ? ngVal(ngLib[i].version,'') : '');
          if(ver!='') txt+=' v'+ver;
          libitems[libitems.length] = { Text: txt };
        }
      }

      ngAboutAddInfo(def.AboutLibraries,items[2]);
      ngAboutAddInfo(def.AboutTrademarks,items[3]);      
      ngAboutAddInfo(def.AboutReleaseNotes,items[4])

      if(def.DialogType == 'ngAboutDlg') def.DialogType='ngMessageDlg';  
      return ngCreateControlAsType(def, def.DialogType, ref, parent);
    });
  }
};