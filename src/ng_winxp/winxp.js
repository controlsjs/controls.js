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

if(typeof ngUserControls === 'undefined') ngUserControls = new Array();

var mbIconInformation = 'info';
var mbIconWarning     = 'warn';
var mbIconQuestion    = 'question';
var mbIconError       = 'err';
/**
 *  Variable: WinXPControls
 *  Reference to WinXP control definitions.
 */
var WinXPControls = {

  ControlImages: [
    'winxp_base.png?7',
    'winxp_hbox.png?5',
    'winxp_vbox.png?5'
  ],

  Images: {

    CheckBox: { L: 1, T: 25, oL: 17, SL: 33, oSL: 49, GL: 65, oGL: 81, DL: 97, DSL: 113, W: 13, H: 16 },
    CheckBoxLeft: { L: 1, T: 25, oL: 17, SL: 33, oSL: 49, GL: 65, oGL: 81, DL: 97, DSL: 113, W: 15, H: 16 },
    CheckBoxRight: { L: -1, T: 25, oL: 15, SL: 31, oSL: 47, GL: 63, oGL: 79, DL: 95, DSL: 111, W: 15, H: 16 },

    Radio: { L: 129, T: 25, oL: 145, SL: 161, oSL: 177, DL: 209, DSL: 193, W: 13, H: 16 },
    RadioLeft: { L: 129, T: 25, oL: 145, SL: 161, oSL: 177, DL: 209, DSL: 193, W: 15, H: 16 },
    RadioRight: { L: 127, T: 25, oL: 143, SL: 159, oSL: 175, DL: 207, DSL: 191, W: 15, H: 16 },

    Button: {
      LeftImg: { L: 0, T: 1, oL: 12, W: 4, H: 23, SL: 24, DL: 47, oSL: 36 },
      MiddleImg: { L: 0, T: 253, ST: 277, DT: 301, H: 23, Src: 1, oT: 326, oST: 350 },
      RightImg: { L: 8, T: 1, oL: 19, W: 4, H: 23, SL: 31, DL: 54, oSL: 43 },
      MenuRightImg: { L: 6, T: 42, oL: 23, SL: 40, oSL: 58, DL: 76, W: 11, H: 23 },

      MenuRightBtnImg: { L: 1, T: 42, oL: 18, SL: 35, oSL: 53, DL: 71, W: 16, H: 23 }
    },

    DefButton: {
      LeftImg: { L: 58, T: 1, oL: 12, SL: 24, DL: 47, W: 4, H: 23, oSL: 36 },
      MiddleImg: { L: 0, T: 374, oT: 326, ST: 277, oST: 350, DT: 301, H: 23, Src: 1 },
      RightImg: { L: 65, T: 1, oL: 19, SL: 31, DL: 54, W: 4, H: 23, oSL: 43 }
    },

    Edit: {
      LeftImg: { L: 70, T: 2, W: 2, H: 21, DL: 86 },

      MiddleImg: { L: 0, T: 486, DT: 532, H: 21, Src: 1 },

      RightImg: { L: 75, T: 2, W: 2, H: 21, DL: 91 },

      LeftImgReq: { L: 78, T: 2, W: 2, H: 21, DL: 86 },

      MiddleImgReq: { L: 0, T: 509, DT: 532, H: 21, Src: 1 },

      RightImgReq: { L: 83, T: 2, W: 2, H: 21, DL: 91 },
      ArrowLeft: { L: 28, T: 82, W: 9, H: 21, oL: 79, DL: 130 },
      ArrowRight: { L: 40, T: 82, W: 9, H: 21, oL: 91, DL: 142 },
      ArrowDown: { L: 0, T: 80, W: 13, H: 21, oL: 51, DL: 102 },
      ArrowUp: { L: 14, T: 80, W: 13, H: 21, oL: 65, DL: 116 }
    },

    SubMenu: { L: 330, T: 54, DT: 71, W: 10, H: 16 },

    MenuCheckBox: { L: 359, T: -14, oST: 42, ST: 56, DT: -14, DST: 73, W: 14, H: 14 },

    MenuRadio: { L: 374, T: -14, oST: 42, ST: 56, DT: -14, DST: 73, W: 14, H: 14 },

    SubMenuWhite: { L: 330, T: 40, DT: 71, W: 10, H: 16 },

    MenuCheckBoxWhite: { L: 359, T: -14, ST: 42, DT: -14, DST: 73, W: 14, H: 14 },

    MenuRadioWhite: { L: 374, T: -14, ST: 42, DT: -14, DST: 73, W: 14, H: 14 },

    GroupBox: {
      LeftTop: { L: 361, T: -5, W: 5, H: 11 },
      Top: { L: 0, T: 48, H: 8, Src: 1 },
      RightTop: { L: 369, T: -5, W: 5, H: 11 },
      Left: { L:14, T: 0, W: 1, Src: 2 },
      Right: { L: 14, T: 0, W: 1, Src: 2 },
      LeftBottom: { L: 361, T: 37, W: 5, H: 4 },
      Bottom: { L: 0, T: 62, H: 1, Src: 1 },
      RightBottom: { L: 369, T: 37, W: 5, H: 4 }
    },

    GroupBoxNoText: {
      LeftTop: { L: 361, T: 2, W: 5, H: 4 },
      Top: { L: 0, T: 62, H: 1, Src: 1 },
      RightTop: { L: 369, T: 2, W: 5, H: 4 },
      Left: { L:14, T: 0, W: 1, Src: 2 },
      Right: { L: 14, T: 0, W: 1, Src: 2 },
      LeftBottom: { L: 361, T: 37, W: 5, H: 4 },
      Bottom: { L: 0, T: 62, H: 1, Src: 1 },
      RightBottom: { L: 369, T: 37, W: 5, H: 4 }
    },

    Memo: {
      LeftTop: { L: 70, T: 2, W: 3, H: 3, DL: 86 },
      Top: { L: 0, T: 84, H: 3, DT: 104, Src: 1 },
      RightTop: { L: 74, T: 2, W: 3, H: 3, DL: 90 },
      Left: { L:21, T: 0, W: 3, DL: 41, Src: 2  },
      Right: { L: 26, T: 0, W: 3, DL: 46, Src: 2 },
      LeftBottom: { L: 70, T: 20, W: 3, H: 3, DL: 86 },
      Bottom: { L: 0, T: 89, H: 3, DT: 109, Src: 1 },
      RightBottom: { L: 74, T: 20, W: 3, H: 3, DL: 90 }
    },

    MemoReq: {
      LeftTop: { L: 78, T: 2, W: 3, H: 3, DL: 86 },
      Top: { L: 0, T: 94, H: 3, DT: 104, Src: 1 },
      RightTop: { L: 82, T: 2, W: 3, H: 3, DL: 90 },
      Left: { L:31, T: 0, W: 3, DL: 41, Src: 2  },
      Right: { L: 36, T: 0, W: 3, DL: 46, Src: 2 },
      LeftBottom: { L: 78, T: 20, W: 3, H: 3, DL: 86 },
      Bottom: { L: 0, T: 99, H: 3, DT: 109, Src: 1 },
      RightBottom: { L: 82, T: 20, W: 3, H: 3, DL: 90 }
    },

    PagesBoxUp: {
      LeftTop: { L: 361, T: -17, W: 5, H: 23 },
      LeftTop2: { L: 361, T: -15, W: 1, H: 23 },
      Top: { L: 0, T: 36, H: 23, Src: 1 },
      RightTop: { L: 369, T: -17, W: 5, H: 23 },
      RightTop2: { L: 373, T: -15, W: 1, H: 23 },
      Left: { L:14, T: 0, W: 1, Src: 2 },
      Right: { L: 14, T: 0, W: 1, Src: 2 },
      LeftBottom: { L: 361, T: 37, W: 5, H: 4 },
      Bottom: { L: 0, T: 59, H: 4, Src: 1 },
      RightBottom: { L: 369, T: 37, W: 5, H: 4 }
    },

    PagesBoxDown: {
      LeftTop: { L: 361, T: 2, W: 5, H: 4 },
      Top: { L: 0, T: 55, H: 4, Src: 1 },
      RightTop: { L: 369, T: 2, W: 5, H: 4 },
      Left: { L:14, T: 0, W: 1, Src: 2 },
      Right: { L: 14, T: 0, W: 1, Src: 2 },
      LeftBottom: { L: 361, T: 37, W: 5, H: 23 },
      LeftBottom2: { L: 361, T: 35, W: 5, H: 23 },
      Bottom: { L: 0, T: 59, H: 23, Src: 1 },
      RightBottom: { L: 369, T: 37, W: 5, H: 23 },
      RightBottom2: { L: 373, T: 35, W: 1, H: 23 }
    },

    PagesUp: new Array(
     {
       LeftImg: { L: 361, SL: 346, DSL: 346, T: 2, W: 5, H: 20 },
       MiddleImg: { L: 0, T: 444, H: 20, Src: 1, ST: 398, DST: 398 },
       RightImg: { L: 369, SL: 350, DSL: 350, T: 2, W: 5, H: 20 },
       Separator: { L: 340, T: 2, W: 6, H: 20 }
     }
    ),
    PagesDown: new Array(
     {
       LeftImg: { L: 361, SL: 346, DSL: 346, T: 21, W: 5, H: 20 },
       MiddleImg: { L: 0, T: 444, H: 20, Src: 1, ST: 421, DST: 421 },
       RightImg: { L: 369, SL: 350, DSL: 350, T: 21, W: 5, H: 20 },
       Separator: { L: 340, T: 21, W: 6, H: 20 }
     }
    ),

    ProgressBar: {
      LeftImg: { L: 118, T: 2, W: 4, H: 17 },
      MiddleImg: { L: 0, T: 602, H: 17, Src: 1 },
      RightImg: { L: 133, T: 2, W: 3, H: 17 },
      BarImg: { L: 123, T: 2, W: 8, H: 17 }
    },

    TreeImgPlusMinus: { L: 242, T: 26, W: 17, H: 16, SL: 226 },

    TreeImgTriangle: { L: 260, T: 26, W: 15, H: 16, SL: 276 },

    TreeImgFolder: { L: 309, T: 26, W: 20, H: 16, SL: 290 },

    DropDown: { L: 137, T: 0, oL: 154, DL: 171, W: 16, H: 21 },

    Elipsis: { L: 188, T: 0, oL: 207, DL: 226, W: 18, H: 21 },

    Search: { L: 245, T: 0, oL: 264, DL: 283, W: 18, H: 21 },

    Calendar: { L: 301, T: -2, W: 19, H: 21, DL: 320 },

    VSplitMover: {
      L: 94, T: 0,
      W: 8,
      Src: 2
    },

    VSplitMoverLeft: {
      L: 101, T: 0,
      W: 8,
      Src: 2
    },

    VSplitMoverRight: {
      L: 87, T: 0,
      W: 8,
      Src: 2
    },

    VSplit: { L: 401, T: 16, DL: 408, W: 8, H: 43 },

    VSplitNone: {
      L: -8, T: 0,
      W: 8, H: 1
    },

    HSplitMover: { L: 0, T: 238, H: 8, Src: 1 },

    HSplitMoverTop: { L: 0, T: 245, H: 8, Src: 1 },

    HSplitMoverBottom: { L: 0, T: 231, H: 8, Src: 1 },

    HSplit: { L: 379, T: 0, DT: 7, W: 43, H: 8 },

    HSplitNone: {
      L: 0, T: -8,
      W: 1, H: 8
    },

    PgListPgNo: {
      LeftImg: { L: 94, T: 2, DL: 100, W: 2, H: 20 },

      MiddleImg: { L: 0, T: 556, DL: 0, H: 20, Src: 1 },

      RightImg: { L: 97, T: 2, DL: 103, W: 2, H: 20 }
    },

    Window: {
      LeftTop: { L: 83, T: 139, W: 5, H: 29 },
      Top: { L: 0, T: 0, H: 3, Src: 1 },
      RightTop: { L: 159, T: 139, W: 5, H: 29 },
      Left: { L:0, T: 0, W: 3, Src: 2 },
      Right: { L: 5, T: 0, W: 3, Src: 2 },
      LeftBottom: { L: 0, T: 139, W: 15, H: 3 },
      Bottom: { L: 0, T: 31, H: 3, Src: 1 },
      RightBottom: { L: 4, T: 144, W: 15, H: 3 }
    },

    WinCloseBtn: { L: 90, T: 40, oL: 113, W: 23, H: 24 },

    WinMinBtn: { L: 136, T: 40, oL: 159, W: 23, H: 24 },

    WinMaxBtn: { L: 182, T: 40, oL: 205, SL: 228, oSL: 251, W: 23, H: 24 },

    WinRestoreBtn: { L: 228, T: 40, oL: 251, W: 23, H: 24 },

    WinHelpBtn: { L: 273, T: 40, oL: 296, W: 23, H: 24 },

    WindowCaption: {
      LeftImg: { L: 83, T: 139, W: 40, H: 29 },
      MiddleImg: { L: 0, T: 0, H: 29, Src: 1 },
      RightImg: { L: 124, T: 139, W: 40, H: 29 }
    },

    ArrowDown: { L: 0, T: 86, W: 13, H: 9, oL: 51, DL: 102 },

    ArrowUp: { L: 14, T: 86, W: 13, H: 9, oL: 65, DL: 116 },

    ArrowLeft: { L: 29, T: 86, W: 9, H: 13, oL: 80, DL: 131 },

    ArrowRight: { L: 40, T: 86, W: 9, H: 13, oL: 91, DL: 142 },

    PagingFirst: { L: -1, T: 66, oL: 83, DL: 167, W: 18, H: 18 },
    PagingPrev: { L: 20, T: 66, oL: 104, DL: 188, W: 18, H: 18 },
    PagingNext: { L: 39, T: 66, oL: 123, DL: 207, W: 18, H: 18 },
    PagingLast: { L: 60, T: 66, oL: 144, DL: 228, W: 18, H: 18 },

    DlgIcons: {
      info:     { L: 251, T: 127, W: 32, H: 32 },
      question: { L: 285, T: 127, W: 32, H: 32 },
      err:      { L: 319, T: 127, W: 32, H: 32 },
      warn:     { L: 353, T: 127, W: 32, H: 32 }
    },

    MiniDlgIcons: {
      info:     { L: 250, T: 66, W: 20, H: 20 },
      question: { L: 270, T: 66, W: 20, H: 20 },
      err:      { L: 291, T: 66, W: 20, H: 20 },
      warn:     { L: 311, T: 66, W: 20, H: 20 }
    },

    Hint: {
      LeftTop: { L: 20, T: 139, W: 30, H: 18 },
      Top: { L: 0, T: 114, H: 5, Src: 1 },
      RightTop: { L: 51, T: 139, W: 30, H: 18 },
      Left: { L:51, T: 0, W: 7, Src: 2 },
      Right: { L: 64, T: 0, W: 14, Src: 2 },
      LeftBottom: { L: 20, T: 158, W: 30, H: 30 },
      Bottom: { L: 0, T: 149, H: 15, Src: 1 },
      RightBottom: { L: 51, T: 158, W: 30, H: 30 }
    },
    HintAnchors: {
      topleft:     { L: 15, T: -11, HX: 22, HY: 0,
                     Img: { L: 350, T: 89, W: 29, H: 16 } },
      topright:    { R: 22, T: -11, HX: 6, HY: 0,
                     Img: { L: 318, T: 89, W: 29, H: 16 } },
      bottomright: { R: 22, B: -2, HX: 10, HY: 15,
                     Img: { L: 314, T: 106, W: 34, H: 17 } },
      bottomleft:  { L: 15, B: -2, HX: 22, HY: 15,
                     Img: { L: 350, T: 106, W: 34, H: 17 } },

      lefttop:     { L: -9, T: 13, HX: 0, HY: 22,
                     Img: { L: 237, T: 91, W: 16, H: 29 } },
      leftbottom:  { L: -9, B: 23, HX: 0, HY: 6,
                     Img: { L: 255, T: 91, W: 16, H: 29 } },
      righttop:    { R: -3, T: 13, HX: 15, HY: 22,
                     Img: { L: 293, T: 91, W: 17, H: 34 } },
      rightbottom: { R: -3, B: 22, HX: 15, HY: 10,
                     Img: { L: 274, T: 87, W: 17, H: 34 } }
    },

    TextHint: {
      LeftTop: { L: 178, T: 139, W: 30, H: 15 },
      Top: { L: 0, T: 187, H: 5, Src: 1 },
      RightTop: { L: 210, T: 139, W: 30, H: 15 },
      Left: { L:51, T: 0, W: 7, Src: 2 },
      Right: { L: 64, T: 0, W: 14, Src: 2 },
      LeftBottom: { L: 178, T: 156, W: 30, H: 25 },
      Bottom: { L: 0, T: 214, H: 15, Src: 1 },
      RightBottom: { L: 210, T: 156, W: 30, H: 25 }
    },
    TextHintAnchors: {
      topleft:     { L: 6, T: -15, HX: 0, HY: 0 },
      bottomleft:  { L: 6, B: -5, HX: 0, HY: 0 },
      topright:    { R: 15, T: -15, HX: 0, HY: 0 },
      bottomright: { R: 15, B: -5, HX: 0, HY: 0 }
    },

    BtnArrowUp:    { SL: 122, T: 104, oSL: 148, L: 174, oL: 200, W: 25, H: 14 },
    BtnArrowDown:  { SL: 122, T: 119, oSL: 148, L: 174, oL: 200, W: 25, H: 14 },
    BtnArrowLeft:  { L: 1, T: 104, oL: 31, SL: 61, oSL: 92, W: 14, H: 25 },
    BtnArrowRight: { L: 16, T: 104, oL: 46, SL: 76, oSL: 107, W: 14, H: 25 },

    DropPanel: {
      Left: { L: 79, T: 0, W: 7, Src: 2 },
      Right: { L: 79, T: 0, W: 7, Src: 2 },
      BottomButton: {
        Left: { L: 85, T: 172, W: 6, H: 14 },
        Middle: { L: 0, T: 164, H: 14, Src: 1 },
        Right: { L: 95, T: 172, W: 6, H: 14 }
      },
      TopButton: {
        Left: { L: 112, T: 173, W: 6, H: 14 },
        Middle: { L: 0, T: 172, H: 14, Src: 1 },
        Right: { L: 104, T: 173, W: 6, H: 14 }
      }
    },

    Close: { L: 205, T: 87, oL: 215, SL: 215, DL: 225, W: 10, H: 10 }

  },

  OnControlCreated: function(def,c) {
    switch(def.Type)
    {
      case 'stdGroup':
      case 'stdGroupBox':
        if(ng_EmptyVar(c.Frame))
          c.Frame=(c.Text == '' && (!c.OnGetText) ? this.Images.GroupBoxNoText : this.Images.GroupBox)
        break;
      case 'stdCheckBox':
        if((c.TextAlign=='right')||(c.TextAlign=='center'))
        {
          c.TextAlign='right';
          if(ng_EmptyVar(c.LeftImg)) c.LeftImg=this.Images.CheckBoxLeft;
          if(!c.OnGetClassName) c.OnGetClassName=function(c,cls,text) { return 'BtnLeft'; };
        }
        else
        {
          c.TextAlign='left';
          if(ng_EmptyVar(c.RightImg)) c.RightImg=this.Images.CheckBoxRight;
          if(!c.OnGetClassName) c.OnGetClassName=function(c,cls,text) { return 'BtnRight'; };
        }
        break;
      case 'stdRadioButton':
        if((c.TextAlign=='right')||(c.TextAlign=='center'))
        {
          c.TextAlign='right';
          if(ng_EmptyVar(c.LeftImg)) c.LeftImg=this.Images.RadioLeft;
          if(!c.OnGetClassName) c.OnGetClassName=function(c,cls,text) { return 'BtnLeft'; };
        }
        else
        {
          c.TextAlign='left';
          if(ng_EmptyVar(c.RightImg)) c.RightImg=this.Images.RadioRight;
          if(!c.OnGetClassName) c.OnGetClassName=function(c,cls,text) { return 'BtnRight'; };
        }
        break;
      case 'stdPages':
        if(c.PagesVAlign=='bottom')
        {
          if(ng_EmptyVar(c.Frame))
          {
            c.Frame=ng_CopyVar(this.Images.PagesBoxDown);
            if(c.PagesVisible)
            {
              if(c.PagesAlign=='right') c.Frame.RightBottom=c.Frame.RightBottom2;
              else c.Frame.LeftBottom=c.Frame.LeftBottom2;
            }
          }
          if(ng_EmptyVar(c.PageImages))
          {
            c.PageImages= this.Images.PagesDown;
            c.RowOverlap=1;
          }
        }
        else
        {
          if(ng_EmptyVar(c.Frame))
          {
            c.Frame=ng_CopyVar(this.Images.PagesBoxUp);
            if(c.PagesVisible)
            {
              if(c.PagesAlign=='right') c.Frame.RightTop=c.Frame.RightTop2;
              else c.Frame.LeftTop=c.Frame.LeftTop2;
            }
          }
          if(ng_EmptyVar(c.PageImages))
          {
            c.PageImages= this.Images.PagesUp;
            c.RowOverlap=1;
          }
        }
        break;
    }
  },

  OnInit: function() {
    var libpath=ngLibPath('ng_winxp');
    // Init images
    for(var i=0;i<this.ControlImages.length;i++)
      this.ControlImages[i]=libpath+this.ControlImages[i];
    var winimages=this.Images;
    var winxp=this;

    /*
     *  Group: Control Types
     */

    /*  Class: stdPanel
     *  Standard panel control (based on <ngPanel>).
     */
    /*<>*/
    ngRegisterControlType('stdPanel', function(def,ref,parent) { return ngCreateControlAsType(def, 'ngPanel', ref, parent); });
    /*  Class: stdFrame
     *  Standard frame control (based on <ngFrame>).
     */
    /*<>*/
    ngRegisterControlType('stdFrame', function(def,ref,parent) { return ngCreateControlAsType(def, 'ngFrame', ref, parent); });
    /*  Class: stdAlignPanel
     *  Standard panel control (based on <ngAlignPanel (ngAlignFrame)>).
     */
    /*<>*/
    ngRegisterControlType('stdAlignPanel', function(def,ref,parent) { return ngCreateControlAsType(def, 'ngAlignPanel', ref, parent); });
    /*  Class: stdAlignFrame
     *  Standard Frame control (based on <ngAlignPanel (ngAlignFrame)>).
     */
    /*<>*/
    ngRegisterControlType('stdAlignFrame', function(def,ref,parent) { return ngCreateControlAsType(def, 'ngAlignFrame', ref, parent); });

    /*  Class: stdText
     *  Standard text control (based on <ngText>).
     */
    /*<>*/
    ngRegisterControlType('stdText', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='wxpText';
      return ngCreateControlAsType(def, 'ngText', ref, parent);
    });
    /*  Class: stdImage
     *  Standard image control (based on <ngImage>).
     */
    /*<>*/
    ngRegisterControlType('stdImage', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='wxpImage';
      return ngCreateControlAsType(def, 'ngImage', ref, parent);
    });
    /*  Class: stdCheckBox
     *  Standard check box control (based on <ngCheckBox>).
     */
    ngRegisterControlType('stdCheckBox', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='wxpCheckBox';
      return ngCreateControlAsType(def, 'ngCheckBox', ref, parent);
    });
    /*  Class: stdRadioButton
     *  Standard radio button control (based on <ngRadioButton>).
     */
    ngRegisterControlType('stdRadioButton', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='wxpRadio';
      return ngCreateControlAsType(def, 'ngRadioButton', ref, parent);
    });
    /*  Class: stdButton
     *  Standard button control (based on <ngButton>).
     */
    /*<>*/
    ngRegisterControlType('stdButton', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='wxpButton';
      var c=ngCreateControlAsType(def, 'ngButton', ref, parent);
      if(c) {
        if((ngVal(c.Default,false))&&(typeof def.Menu !== 'object'))
        {
          c.LeftImg=winimages.DefButton.LeftImg;
          c.MiddleImg=winimages.DefButton.MiddleImg;
          c.RightImg=winimages.DefButton.RightImg;
        }
        else
        {
          c.LeftImg=winimages.Button.LeftImg;
          c.MiddleImg=winimages.Button.MiddleImg;
          c.RightImg=(typeof def.Menu === 'object' ? winimages.Button.MenuRightImg : winimages.Button.RightImg);
        }
      }
      return c;
    });
    /*  Class: stdFlatButton
     *  Standard button control (based on <ngButton>).
     */
    /*<>*/
    ngRegisterControlType('stdFlatButton', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='wxpFlatButton';
      var c=ngCreateControlAsType(def, 'ngButton', ref, parent);
      if(!c) return c;
      c.AddEvent('DoUpdate',function(o) {
        var cn=o.className;
        var idx=cn.indexOf(' ');
        if(this.Enabled) {
          if(idx>=0) cn=cn.substring(0,idx);
          if(this.Checked) cn=cn+' '+cn+'Checked';
          o.className=cn;
        }
        else {
          if(idx>=0) cn=cn.substring(0,idx);
          o.className=cn+' '+cn+'Disabled';
        }
        return true;
      });
/*      if(c) {
        if((ngVal(c.Default,false))&&(typeof def.Menu != 'object'))
        {
          c.LeftImg=winimages.DefButton.LeftImg;
          c.MiddleImg=winimages.DefButton.MiddleImg;
          c.RightImg=winimages.DefButton.RightImg;
        }
        else
        {
          c.LeftImg=winimages.Button.LeftImg;
          c.MiddleImg=winimages.Button.MiddleImg;
          c.RightImg=(typeof def.Menu == 'object' ? winimages.Button.MenuRightImg : winimages.Button.RightImg);
        }
      }*/
      return c;
    });
    /*  Class: stdLabel
     *  Standard label control (based on <ngButton>).
     */
    /*<>*/
    ngRegisterControlType('stdLabel', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='wxpLabel';
      return ngCreateControlAsType(def, 'ngButton', ref, parent);
    });
    /*  Class: stdLink
     *  Standard link control (based on <ngButton>).
     */
    /*<>*/
    ngRegisterControlType('stdLink', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='wxpLink';
      return ngCreateControlAsType(def, 'ngButton', ref, parent);
    });
    /*  Class: stdGroup
     *  Standard group control (based on <ngGroup>).
     */
    /*<>*/
    function Create_stdGroup(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='wxpGroupBox';
      return ngCreateControlAsType(def, 'ngGroup', ref, parent);
    }
    ngRegisterControlType('stdGroup', Create_stdGroup);
    ngRegisterControlType('stdGroupBox', Create_stdGroup);

    /*  Class: stdEdit
     *  Standard edit control (based on <ngEdit>).
     */
    /*<>*/
    this.stdEdit_AddProperties=function(c)
    {
      /*
       *  Group: Properties
       */
      /*  Variable: Invalid
       *  ...
       *  Type: bool
       *  Default value: *false*
       */
      c.Invalid=ngVal(c.Invalid,false);
      c.LeftImg=(c.Invalid ? winimages.Edit.LeftImgReq : winimages.Edit.LeftImg);
      c.MiddleImg=(c.Invalid ? winimages.Edit.MiddleImgReq : winimages.Edit.MiddleImg);
      c.RightImg=(c.Invalid ? winimages.Edit.RightImgReq : winimages.Edit.RightImg);
      /*
       *  Group: Methods
       */
      /*  Function: SetInvalid
       *  Sets (visual) invalid state of control.
       *
       *  Syntax:
       *    void *SetInvalid* (bool r [,bool update=true])
       *
       *  Parameters:
       *    -
       *  Returns:
       *    -
       */
      c.SetInvalid=function(r,update) {
        if(!r)
        {
          c.LeftImg=winimages.Edit.LeftImg;
          c.MiddleImg=winimages.Edit.MiddleImg;
          c.RightImg=winimages.Edit.RightImg;
        }
        else
        {
          c.LeftImg=winimages.Edit.LeftImgReq;
          c.MiddleImg=winimages.Edit.MiddleImgReq;
          c.RightImg=winimages.Edit.RightImgReq;
        }
        c.Invalid=r;
        if(ngVal(update,true))
        {
          if(c.LeftImg)   ngc_ChangeImage(ngpg_ImgDrawProps(c.ID+'_IL', 0, c.Enabled, c.LeftImg));
          if(c.MiddleImg) ngc_ChangeImageS(ngpg_ImgDrawProps(c.ID+'_IM', 0, c.Enabled, c.MiddleImg));
          if(c.RightImg)  ngc_ChangeImage(ngpg_ImgDrawProps(c.ID+'_IR', 0, c.Enabled, c.RightImg));
        }
      }
    }

    function Create_stdEdit(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='wxpEdit';
      if((typeof def.DropDown !== 'undefined')&&(typeof def.DropDown.className === 'undefined')) def.DropDown.className='wxpDropDown';
      var c=ngCreateControlAsType(def, 'ngEdit', ref, parent);
      if(c) {
        winxp.stdEdit_AddProperties(c);
      }
      return c;
    }
    ngRegisterControlType('stdEdit', Create_stdEdit);
    ngRegisterControlType('stdEditBox', Create_stdEdit);

    /*  Class: stdEditBoxBtn
     *  Standard edit control with elipsis button (based on <stdEdit>).
     */
    /*<>*/
    function Create_stdEditBoxBtn(def,ref,parent,basetype) {
      if(typeof def.className === 'undefined') def.className='wxpEdit';
      if((typeof def.DropDown !== 'undefined')&&(typeof def.DropDown.className === 'undefined')) def.DropDown.className='wxpDropDown';
      var c=ngCreateControlAsType(def, ngVal(basetype,'stdEdit'), ref, parent);
      if(!c) return c;
      var b=new ngButton();
      b.LeftImg=winimages.Elipsis;
      b.OnClick = function(ci)
      {
        var e=(ci.Owner ? ngVal(ci.Owner.Parent,null) : null);
        if((e)&&(e.OnElipsis)) e.OnElipsis(ci, e.GetText());
      }
      c.Buttons=new Array(b);
      /*
       *  Group: Methods
       */
      /*  Function: Elipsis
       *  Invokes elipsis.
       *
       *  Syntax:
       *    void *Elipsis* ()
       *
       *  Parameters:
       *    -
       *  Returns:
       *    -
       */
      c.Elipsis=function() {
        b.Click();
      }
      /*
       *  Group: Events
       */
      /*
       *  Event: OnElipsis
       */
      // c.OnElipsis=null;
      return c;
    }

    ngRegisterControlType('stdEditBoxBtn', function(def,ref,parent) { return Create_stdEditBoxBtn(def,ref,parent); });

    /*  Class: stdSearchBox
     *  Standard search box control (based on <stdEdit>).
     */
    /*<>*/
    function Create_stdSearchBox(def,ref,parent,basetype)
    {
      if(typeof def.className === 'undefined') def.className='wxpEdit';
      if((typeof def.DropDown !== 'undefined')&&(typeof def.DropDown.className === 'undefined')) def.DropDown.className='wxpDropDown';
      var c=ngCreateControlAsType(def, ngVal(basetype,'stdEdit'), ref, parent);
      if(!c) return c;
      if(typeof def.DropDown !== 'undefined') c.Suggestion=true;

      var b=new ngButton();
      b.LeftImg=winimages.Search;
      b.Default=true;
      b.OnClick = function(ci)
      {
        var e=(ci.Owner ? ngVal(ci.Owner.Parent,null) : null);
        if((e)&&(e.OnSearch)) e.OnSearch(ci, e.GetText());
      }
      c.Buttons=new Array(b);
      /*
       *  Group: Methods
       */
      /*  Function: Search
       *  Invokes search.
       *
       *  Syntax:
       *    void *Search* ([string txt])
       *
       *  Parameters:
       *    txt - search text
       *
       *  Returns:
       *    -
       */
      c.Search=function(t) {
        if(typeof t !== 'undefined') this.SetText(t);
        b.Click();
      }
      /*
       *  Group: Events
       */
      /*
       *  Event: OnSearch
       */
      // c.OnSearch=null;
      return c;
    }
    ngRegisterControlType('stdSearchBox', function(def,ref,parent) { return Create_stdSearchBox(def,ref,parent); });

    /*  Class: stdEditNum
     *  Standard edit number control with spin buttons (based on <ngEditNum>).
     */
    /*<>*/
    /*
     *  Group: Definition
     */
    /*
    /*  Variable: Arrows
     *
     *  Constants:
     *    'none' - ...
     *    'leftright' - ...
     *    'updown' - ...
     */
    /*<>*/
    /*
     *  Group: Properties
     */
    /*  Variable: Invalid
     *  ...
     *  Type: bool
     *  Default value: *false*
     */
    /*
     *  Group: Methods
     */
    /*  Function: SetInvalid
     *  Sets (visual) invalid state of control.
     *
     *  Syntax:
     *    void *SetInvalid* (bool r [,bool update=true])
     *
     *  Parameters:
     *    -
     *  Returns:
     *    -
     */
    function Create_stdEditNum(def,ref,parent, basetype)
    {
      if(typeof def.className === 'undefined') def.className='wxpEdit';
      if((typeof def.DropDown !== 'undefined')&&(typeof def.DropDown.className === 'undefined')) def.DropDown.className='wxpDropDown';
      var c=ngCreateControlAsType(def, ngVal(basetype,'ngEditNum'), ref, parent);
      if(!c) return c;
      winxp.stdEdit_AddProperties(c);
      var type=ngVal(def.Arrows,'leftright');
      if(type!='none')
      {
        if(c.ButtonUp)   c.ButtonUp.LeftImg  =(type == 'leftright' ? winimages.Edit.ArrowRight : winimages.Edit.ArrowUp);
        if(c.ButtonDown) c.ButtonDown.LeftImg=(type == 'leftright' ? winimages.Edit.ArrowLeft  : winimages.Edit.ArrowDown);
      }
      return c;
    }
    ngRegisterControlType('stdEditNum', function(def,ref,parent) { return Create_stdEditNum(def,ref,parent); });
    ngRegisterControlType('stdEditBoxNum', function(def,ref,parent) { return Create_stdEditNum(def,ref,parent); });
    /*  Class: stdColorEdit
     *  Standard color edit control (based on <ngDropDown>).
     */
    /*<>*/
    /*
     *  Group: Properties
     */
    /*  Variable: Invalid
     *  ...
     *  Type: bool
     *  Default value: *false*
     */
    /*
     *  Group: Methods
     */
    /*  Function: SetInvalid
     *  Sets (visual) invalid state of control.
     *
     *  Syntax:
     *    void *SetInvalid* (bool r [,bool update=true])
     *
     *  Parameters:
     *    -
     *  Returns:
     *    -
     */
    function Create_stdColorEdit(def,ref,parent,basetype)
    {
      ng_MergeDef(def, {
        className: 'wxpEdit',
        Data: { TextAlign: 'center' },
        DropDown: null//{ className: 'wxpDropDown', Type: 'stdPanel' }
      });
      var c=ngDropDown_Create(def,ref,parent, ngVal(basetype,'ngEdit'));
      if(!c) return c;

      winxp.stdEdit_AddProperties(c);
      /*
       *  Group: Methods
       */
      /*  Function: GetColor
       *  Gets edited color value.
       *
       *  Syntax:
       *    string *GetColor* ()
       *
       *  Parameters:
       *
       *  Returns:
       *    -
       */
      c.GetColor = function() {
        var col=this.GetText();
        if((col.length>0)&&(col[0]=='#'))
        {
          col=col.substring(2,col.length);
        }
        return col;
      };

      var b=c.DropDownButton;
      b.Bounds.W=29;
      b.AutoSize=false;
      b.OnGetText = function(e) {
        var c=this.Enabled ? this.Parent.GetColor() : 'CCCCCC';
        return '<div style="margin:3px; line-height: 0px; font-size: 0px; position: absolute;left:0px;top:0px;width: 23px; height:13px; border: 1px solid '+(this.Enabled ? 'black' : '#A0A0A0')+'; background-color: #'+c+'"></div>';
      }
      c.OnTextChanged = function(e) {
        e.DropDownButton.Update();
      }
      return c;
    }
    ngRegisterControlType('stdColorEdit', function(def,ref,parent) { return Create_stdColorEdit(def,ref,parent); });
    ngRegisterControlType('stdColorEditBox', function(def,ref,parent) { return Create_stdColorEdit(def,ref,parent); });

    /*  Class: stdMaskEdit
     *  Standard mask edit control (based on <ngMaskEdit>).
     */
    function Create_stdMaskEdit(def, ref, parent)
    {
      if (typeof(def.Data)==='undefined') def.Data = new Object();
      var invalid = ngVal(def.Data.Invalid, false);

      ng_MergeDef(def, {
        H: winimages.Edit.MiddleImg.H,
        Data: {
          LeftDef: {
            W: winimages.Edit.LeftImg.W,
            Data: {
              LeftImg: (invalid ? winimages.Edit.LeftImgReq : winimages.Edit.LeftImg),
              MiddleImg: (invalid ? winimages.Edit.MiddleImgReq : winimages.Edit.MiddleImg),
              RightImg: null
            }
          },
          EditDef: {
            Type: 'stdEdit',
            Data: {
              LeftImg: null,
              MiddleImg: (invalid ? winimages.Edit.MiddleImgReq : winimages.Edit.MiddleImg),
              RightImg: null
            }
          },
          StaticDef: {
            Type: 'stdLabel',
            Data: {
              MiddleImg: (invalid ? winimages.Edit.MiddleImgReq : winimages.Edit.MiddleImg)
            }
          },
          RightDef: {
            W: winimages.Edit.RightImg.W,
            Data: {
              LeftImg: null,
              MiddleImg: (invalid ? winimages.Edit.MiddleImgReq : winimages.Edit.MiddleImg),
              RightImg: (invalid ? winimages.Edit.RightImgReq : winimages.Edit.RightImg)
            }
          }
        }
      });

      var c = ngCreateControlAsType(def, 'ngMaskEdit', ref, parent);
      if (!c) return c;

      c.DoInvalid = function (ctrl, state, update) {
        if (typeof(ctrl)=='undefined') return false;
        state  = ngVal(state, true);
        update = ngVal(update, true);

        if (!state)
        {
          if (ctrl.LeftImg)   ctrl.LeftImg   = winimages.Edit.LeftImg;
          if (ctrl.MiddleImg) ctrl.MiddleImg = winimages.Edit.MiddleImg;
          if (ctrl.RightImg)  ctrl.RightImg  = winimages.Edit.RightImg;
        } else
        {
          if (ctrl.LeftImg)   ctrl.LeftImg   = winimages.Edit.LeftImgReq;
          if (ctrl.MiddleImg) ctrl.MiddleImg = winimages.Edit.MiddleImgReq;
          if (ctrl.RightImg)  ctrl.RightImg  = winimages.Edit.RightImgReq;
        }

        if (update)
        {
          if (ctrl.LeftImg)   ngc_ChangeImage(ngpg_ImgDrawProps(ctrl.ID+'_IL', 0, ctrl.Enabled, ctrl.LeftImg));
          if (ctrl.MiddleImg) ngc_ChangeImageS(ngpg_ImgDrawProps(ctrl.ID+'_IM', 0, ctrl.Enabled, ctrl.MiddleImg));
          if (ctrl.RightImg)  ngc_ChangeImage(ngpg_ImgDrawProps(ctrl.ID+'_IR', 0, ctrl.Enabled, ctrl.RightImg));
        }

        return true;
      }

      return c;
    }
    ngRegisterControlType('stdMaskEdit', function(def,ref,parent) { return Create_stdMaskEdit(def,ref,parent); });
    ngRegisterControlType('stdMaskEditBox', function(def,ref,parent) { return Create_stdMaskEdit(def,ref,parent); });

    /*  Class: stdDropDown
     *  Standard drop down control (based on <ngDropDown>).
     */
    /*<>*/
    /*
     *  Group: Properties
     */
    /*  Variable: Invalid
     *  ...
     *  Type: bool
     *  Default value: *false*
     */
    /*
     *  Group: Methods
     */
    /*  Function: SetInvalid
     *  Sets (visual) invalid state of control.
     *
     *  Syntax:
     *    void *SetInvalid* (bool r [,bool update=true])
     *
     *  Parameters:
     *    -
     *  Returns:
     *    -
     */
    function Create_stdDropDown(def,ref,parent,basetype,dropdownlist) {
      if(typeof def.className === 'undefined') def.className='wxpEdit';
      var c=ngDropDown_Create(def,ref,parent, ngVal(basetype,'ngEdit'),dropdownlist);
      if(!c) return c;
      winxp.stdEdit_AddProperties(c);
      c.DropDownButton.LeftImg=winimages.DropDown;
      if(typeof def.DropDown.className === 'undefined') def.DropDown.className='wxpDropDown';
      return c;
    }
    ngRegisterControlType('stdDropDown', function(def,ref,parent) { return Create_stdDropDown(def,ref,parent,'ngEdit',false); });

    /*  Class: stdDropDownList
     *  Standard drop down list control (based on <ngDropDownList>).
     */
    /*<>*/
    /*
     *  Group: Properties
     */
    /*  Variable: Invalid
     *  ...
     *  Type: bool
     *  Default value: *false*
     */
    /*
     *  Group: Methods
     */
    /*  Function: SetInvalid
     *  Sets (visual) invalid state of control.
     *
     *  Syntax:
     *    void *SetInvalid* (bool r [,bool update=true])
     *
     *  Parameters:
     *    -
     *  Returns:
     *    -
     */
    ngRegisterControlType('stdDropDownList', function(def,ref,parent) { return Create_stdDropDown(def,ref,parent,'ngEdit',true); });


    /*  Class: stdMemo
     *  Standard memo control (based on <ngMemo>).
     */
    /*<>*/
    function Create_stdMemo(def,ref,parent,basetype) {
      if(typeof def.className === 'undefined') def.className='wxpMemo';
      var c=ngCreateControlAsType(def, ngVal(basetype, 'ngMemo'), ref, parent);
      if(!c) return;
      /*
       *  Group: Properties
       */
      /*  Variable: Invalid
       *  ...
       *  Type: bool
       *  Default value: *false*
       */
      c.Invalid=ngVal(c.Invalid,false);
      c.Frame=(c.Invalid ? winimages.MemoReq : winimages.Memo);
      /*
       *  Group: Methods
       */
      /*  Function: SetInvalid
       *  Sets (visual) invalid state of control.
       *
       *  Syntax:
       *    void *SetInvalid* (bool r [,bool update=true])
       *
       *  Parameters:
       *    -
       *  Returns:
       *    -
       */
      c.SetInvalid=function(r,update) {
        c.Frame=(r ? winimages.MemoReq : winimages.Memo);
        c.Invalid=r;
        if(ngVal(update,true)) c.Update();
      }
      return c;
    }
    ngRegisterControlType('stdMemo', function(def,ref,parent) { return Create_stdMemo(def,ref,parent); });
    /*  Class: stdPages
     *  Standard pages control (based on <ngPages>).
     */
    /*<>*/
    ngRegisterControlType('stdPages', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='wxpPages';
      return ngCreateControlAsType(def, 'ngPages', ref, parent);
    });
    /*  Class: stdToolBar
     *  Standard toolbar control (based on <ngToolBar>).
     */
    /*<>*/
    ngRegisterControlType('stdToolBar', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='wxpToolBar';
      return ngCreateControlAsType(def, 'ngToolBar', ref, parent);
    });

    /*  Class: stdWebBrowser
     *  Standard web browser control (based on <ngWebBrowser>).
     */
    /*<>*/
    ngRegisterControlType('stdWebBrowser', function(def,ref,parent) { return ngCreateControlAsType(def, 'ngWebBrowser', ref, parent); });

    /*  Class: stdProgressBar
     *  Standard progress bar control (based on <ngProgressBar>).
     */
    /*<>*/
    ngRegisterControlType('stdProgressBar', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='wxpProgressBar';
      var c=ngCreateControlAsType(def, 'ngProgressBar', ref, parent);
      if(!c) return c;
      c.LeftImg=winimages.ProgressBar.LeftImg;
      c.MiddleImg=winimages.ProgressBar.MiddleImg;
      c.RightImg=winimages.ProgressBar.RightImg;
      c.BarImg=winimages.ProgressBar.BarImg;
      return c;
    });
    /*  Class: stdProgressDot
     *  Standard progress dot control (based on <ngText>).
     */
    /*<>*/
    ngRegisterControlType('stdProgressDot', function(def,ref,parent) {
      ng_MergeDef(def, {
        className: 'wxpLabel',
        Data: {
          TextAlign: 'center'
        }
      });
      ng_PreloadImage(libpath+'loading.gif');
      var c=ngCreateControlAsType(def, 'ngButton', ref, parent);
      if(c)
      {
        c.AddEvent(function (b) {
          var txt=ngTxt(b.Text);
          if(txt!='') txt='&nbsp;<span style="line-height: 16px">'+txt+'</span>';
          return '<img src="'+libpath+'loading.gif" align="top" />'+txt;
        }, 'OnGetText');
      }
      return c;
    });

    /**
     * List Controls
     */
    if(ngUserControls['list'])
    {
      /*  Class: stdList
       *  Standard list control (based on <ngList>).
       */
      /*<>*/
      function Create_stdList(def,ref,parent) {
        if(typeof def.className === 'undefined') def.className='wxpListBox';
        var c=ngCreateControlAsType(def, 'ngList', ref, parent);
        if(!c) return c;
        c.AddEvent('DoUpdate',function(o) {
          var cn=o.className;
          var idx=cn.indexOf(' ');
          if(this.Enabled) {
            if(idx>=0) o.className=cn.substring(0,idx);
          }
          else {
            if(idx<0) o.className=cn+' '+cn+'Disabled';
          }
          return true;
        });
        c.OnGetCheckImg = function(list,item) {
          if((typeof item.Checked==='undefined')&&(!list.ShowCheckboxes)) return null;
          if(typeof item.RadioGroup!=='undefined') return winimages.RadioLeft;
          return winimages.CheckBoxLeft;
        }
        /*
         *  Group: Definition
         */
        /*
         *  Variable: TreeImg
         *
         *  Constants:
         *    'triangle' - ...
         *    'folder' - ...
         *    'plusminus' - ...
         */
        /*<>*/
        switch(ngVal(def.TreeImg, (def.Type == 'stdTreeList' ? 'plusminus' : '')))
        {
          case 'triangle':  c.TreeImg = winimages.TreeImgTriangle; break;
          case 'folder':    c.TreeImg = winimages.TreeImgFolder; break;
          case 'plusminus': c.TreeImg = winimages.TreeImgPlusMinus; break;
        }
        return c;
      }
      ngRegisterControlType('stdList', Create_stdList);
      ngRegisterControlType('stdListBox', Create_stdList);
      ngRegisterControlType('stdTreeList', Create_stdList);
      /*  Class: stdPageList
       *  Standard list control (based on <ngPageList>).
       */
      /*<>*/

      this.stdPageListPagingControlsDef=function()
      {
        return {
          FirstPage: {
            Type: 'stdFlatButton',
            Data: {
              ToolBarHPadding: 5,
              Img: winimages.PagingFirst,
              Text: ''
            }
          },
          PrevPage: {
            Type: 'stdFlatButton',
            Data: {
              ToolBarHPadding: 5,
              Img: winimages.PagingPrev,
              Text: ''
            }
          },
          PageNo: {
            Type: 'stdEdit',
            W: 30,
            className: 'wxpPgListPgNo',
            Data: {
              ToolBarHPadding: 5,
              LeftImg: winimages.PgListPgNo.LeftImg,
              MiddleImg: winimages.PgListPgNo.MiddleImg,
              RightImg: winimages.PgListPgNo.RightImg,
              Text: '1',
              TextAlign: 'center'
            }
          },
          Page0: {
            Type: 'stdFlatButton',
            Data: {
              ToolBarHPadding: 5,
              MinWidth: 18,
              Text: '1',
              TextAlign: 'center'
            }
          },
          NextPage: {
            Type: 'stdFlatButton',
            Data: {
              Img: winimages.PagingNext,
              Text: '',
              ImgAlign: 'right',
              ToolBarHPadding: 5
            }
          },
          LastPage: {
            Type: 'stdFlatButton',
            Data: {
              Img: winimages.PagingLast,
              ImgAlign: 'right',
              Text: ''
            }
          }
        };
      }

      function Create_stdPageList(def,ref,parent,controltype,listtype)
      {
        ng_MergeDef(def, {
          className: 'wxpListBox',
          /*
           *  Group: Controls
           */
          Controls: {
            /*  Object: List
             *  <stdList>
             */
            List: {
              Type: ngVal(listtype,'stdList'),
              style: { border: '0px' }
            },
            /*  Object: Loading
             *  <stdProgressDot>
             */
            Loading: {
              Type: 'stdProgressDot',
              L: 10, T: ((controltype==='ngDataSet') || (controltype==='ngDBDataSet') || (def.Controls && def.Controls.List && def.Controls.List.Data && def.Controls.List.Data.Columns && def.Controls.List.Data.Columns.length>0) ? 31 : 10),
              Data: {
                Visible: false
              }
            },
            /*  Object: Paging
             *  <ngToolBar>
             */
            Paging: {
              className: 'wxpPageListPaging',
              /*  Object: FirstPage
               *  <stdFlatButton>
               */
              /*  Object: PrevPage
               *  <stdFlatButton>
               */
              /*  Object: PageNo
               *  <stdEdit>
               */
              /*
               *  Object: Page0
               *  <stdFlatButton>
               */
              /*
               *  Object: NextPage
               *  <stdFlatButton>
               */
              /*
               *  Object: LastPage
               *  <stdFlatButton>
               */
              Controls: winxp.stdPageListPagingControlsDef()
            }
          }
        });

        var c=ngCreateControlAsType(def, ngVal(controltype,'ngPageList'), ref, parent);
        if(!c) return c;
        c.AddEvent('DoUpdate',function(o) {
          var cn=o.className;
          var idx=cn.indexOf(' ');
          if(this.Enabled) {
            if(idx>=0) o.className=cn.substring(0,idx);
          }
          else {
            if(idx<0) o.className=cn+' '+cn+'Disabled';
          }
          return true;
        });
        return c;
      }
      ngRegisterControlType('stdPageList', function (def,ref,parent) { return Create_stdPageList(def,ref,parent,'ngPageList'); });
      ngRegisterControlType('stdPageTreeList', function (def,ref,parent) { return Create_stdPageList(def,ref,parent,'ngPageList','stdTreeList'); });
    }

    /**
     * Panels Controls
     */
    if(ngUserControls['panels'])
    {
      /*  Class: stdSplitPanel
       *  Standard split panel control (based on <ngSplitPanel>).
       */
      /*<>*/
        /*
         *  Group: Definition
         */
        /*
         *  Variable: Mover
         *
         *  Constants:
         *    'handle' - ...
         *    'both' - ...
         *    'controls1' - ...
         *    'controls2' - ...
         *    'none' - ...
         */
        /*<>*/
      ngRegisterControlType('stdSplitPanel', function(def,ref,parent) {
        if(typeof def.className === 'undefined') def.className='wxpSplitPanel';
        var c=ngCreateControlAsType(def, 'ngSplitPanel', ref, parent);
        if(c)
        {
          var vsplit=(c.PanelAlign=='left')||(c.PanelAlign=='right');
          var mover=ngVal(def.Mover,'handle');
          switch(mover)
          {
            case 'both':      c.MoverMiddleImg=(vsplit ? winimages.VSplitMover : winimages.HSplitMover); break;
            case 'controls1': c.MoverMiddleImg=(vsplit ? (c.PanelAlign=='left' ? winimages.VSplitMoverLeft : winimages.VSplitMoverRight) : (c.PanelAlign=='top' ? winimages.HSplitMoverTop : winimages.HSplitMoverBottom)); break;
            case 'controls2': c.MoverMiddleImg=(vsplit ? (c.PanelAlign=='left' ? winimages.VSplitMoverRight : winimages.VSplitMoverLeft) : (c.PanelAlign=='top' ? winimages.HSplitMoverBottom : winimages.HSplitMoverTop)); break;
          }
          c.HandleImg=(mover=='none' ? (vsplit ? winimages.VSplitNone : winimages.HSplitNone) : (vsplit ? winimages.VSplit : winimages.HSplit));
        }
        return c;
      });
      /*  Class: stdDropPanel
       *  Drop-down panel control (based on <ngDropPanel>).
       */
      /*<>*/
      ngRegisterControlType('stdDropPanel', function(def,ref,parent) {
        if(typeof def.className === 'undefined') def.className='wxpDropPanel';
        var c=ngCreateControlAsType(def, 'ngDropPanel', ref, parent);
        ng_MergeDef(def, {
          ControlsPanel: {
            Type: 'ngGroup',
            ControlsPanel: {
              style: { backgroundColor: '#FFFFFF'}
            },
            Data: {
              Frame: {
                Left: winimages.DropPanel.Left,
                Right: winimages.DropPanel.Right
              }
            }
          },
          Button: {
            Data: {
              OnGetImg: function(b,idx)
              {
                var image=null;
                var btntop=(b.Owner && typeof b.Owner.Bounds.T == 'undefined');
                switch(idx)
                {
                  case -1: image=(btntop ? winimages.BtnArrowDown : winimages.BtnArrowUp); break;
                  case 0: image=(btntop ? winimages.DropPanel.TopButton.Left : winimages.DropPanel.BottomButton.Left); break;
                  case 1: image=(btntop ? winimages.DropPanel.TopButton.Middle : winimages.DropPanel.BottomButton.Middle); break;
                  case 2: image=(btntop ? winimages.DropPanel.TopButton.Right : winimages.DropPanel.BottomButton.Right); break;
                }
                return ngVal(image,null);
              }
            }
          }
        });
        return c;
      });
    }

    /**
     * Window Controls
     */
    if(ngUserControls['window'])
    {
      /*  Class: stdWindow
       *  Standard window control (based on <ngWindow>).
       */
      /*<>*/
      /*  Class: stdDialog
       *  Standard dialog control (based on <ngWindow>).
       */
      /*<>*/
      function Create_stdWindow(def,ref,parent) {
        var dialog=(def.Type == 'stdDialog');
        if(typeof def.className === 'undefined') def.className=(dialog ? 'wxpDialog' : 'wxpWindow');
        var c=ngCreateControlAsType(def, 'ngWindow', ref, parent);
        if(!c) return c;
        c.Frame=winimages.Window;
        c.CaptionImg = winimages.WindowCaption;
        if(dialog)
        {
          c.Modal=true;
          c.Visible=false;
          c.Sizeable=false;
          c.Centered=true;
        }
        /*
         *  Group: Definition
         */
        /*
         *  Variable: CloseBtn
         *  ...
         *  Type: bool
         */
        /*<>*/
        var b;
        if(ngVal(def.CloseBtn,(dialog ? true : false)))
        {
          b=new ngButton;
          c.CloseButton=b;
          b.LeftImg=winimages.WinCloseBtn;
          b.OnClick = function(ci)
          {
            var e=(ci.Owner ? ngVal(ci.Owner.Parent,null) : null);
            if((e)&&(e.Close)) e.Close(e);
          }
          if(!c.Buttons) c.Buttons=new Array();
          c.Buttons[c.Buttons.length]=b;
        }
        /*
         *  Variable: HelpBtn
         *  ...
         *  Type: bool
         */
        /*<>*/
        if(ngVal(def.HelpBtn,false))
        {
          b=new ngButton;
          c.HelpButton=b;
          b.LeftImg=winimages.WinHelpBtn;
          b.OnClick = function(ci)
          {
            var e=(ci.Owner ? ngVal(ci.Owner.Parent,null) : null);
            if((e)&&(e.OnHelp)) e.OnHelp(e);
          }
          if(!c.Buttons) c.Buttons=new Array();
          c.Buttons[c.Buttons.length]=b;
        }
        /*
         *  Variable: MaxBtn
         *  ...
         *  Type: bool
         */
        /*<>*/
        if(ngVal(def.MaxBtn,false))
        {
          b=new ngButton;
          c.MaxButton=b;
          c.OnDblClick = function(e)
          {
            if(e.win)
            {
              if(e.win.MaxButton) e.win.MaxButton.Click();
            }
          }
          c.AddEvent(function(o) {
            // update button state before update
            var s=(c.IsMaximized() ? 1 : 0);
            if((c.MaxButton)&&(c.MaxButton.Checked!=s)) c.MaxButton.Check(s);
            return true;
          }, 'DoUpdate');
          b.LeftImg=winimages.WinMaxBtn;
          b.OnClick = function(ci)
          {
            var e=(ci.Owner ? ngVal(ci.Owner.Parent,null) : null);
            if(e)
            {
              ci.Owner.Check(e.IsMaximized() ? 0 : 1);
              if(ci.Owner.Checked)
              {
                if(e.Maximize) e.Maximize(e);
              }
              else
              {
                if(e.Restore) e.Restore(e);
              }
            }
          }
          if(!c.Buttons) c.Buttons=new Array();
          c.Buttons[c.Buttons.length]=b;
        }
        /*
         *  Variable: MinBtn
         *  ...
         *  Type: bool
         */
        /*<>*/
        if(ngVal(def.MinBtn,false))
        {
          b=new ngButton;
          c.MinButton=b;
          b.LeftImg=winimages.WinMinBtn;
          c.AddEvent(function(o) {
            // update button state before update
            var s=(c.IsMinimized() ? 1 : 0);
            if((c.MinButton)&&(c.MinButton.Checked!=s)) c.MinButton.Check(s);
            return true;
          }, 'DoUpdate');
          b.OnClick = function(ci)
          {
            var e=(ci.Owner ? ngVal(ci.Owner.Parent,null) : null);
            if(e)
            {
              ci.Owner.Check(e.IsMinimized() ? 0 : 1);
              if(ci.Owner.Checked)
              {
                if(e.Minimize) e.Minimize(e);
              }
              else
              {
                if(e.Restore) e.Restore(e);
              }
            }
          }
          if(!c.Buttons) c.Buttons=new Array();
          c.Buttons[c.Buttons.length]=b;
        }
        return c;
      }
      ngRegisterControlType('stdWindow', Create_stdWindow);
      ngRegisterControlType('stdDialog', Create_stdWindow);

      /*  Class: stdHint
       *  Standard hint control (based on <ngHint>).
       */
      /*<>*/
      ngRegisterControlType('stdHint', function(def,ref,parent) {
        if(typeof def.className === 'undefined') def.className='wxpHint';
        var c=ngCreateControlAsType(def, 'ngHint', ref, parent);
        if(c)
        {
          c.Frame=ng_CopyVar(winimages.Hint);
          c.Anchors=ng_CopyVar(winimages.HintAnchors);
        }
        return c;
      });

      /*  Class: stdTextHint
       *  Standard hint text control (based on <ngTextHint>).
       */
      /*<>*/
      ngRegisterControlType('stdTextHint', function(def,ref,parent) {
        ng_MergeDef(def, {
          className: 'wxpTextHint',
          /*
           *  Group: Controls
           */
          Controls: {
            /*  Object: Hint
             *  <stdText>
             */
            Hint: {
              Type: 'stdText',
              L: 5, T: 2
            }
          }
        });
        var c=ngCreateControlAsType(def, 'ngTextHint', ref, parent);
        if(c)
        {
          c.Frame=ng_CopyVar(winimages.TextHint);
          c.Anchors=ng_CopyVar(winimages.TextHintAnchors);
        }
        return c;
      });
    }

    /**
     * Dialogs Controls
     */
    if(ngUserControls['dialogs'])
    {
      /*  Class: stdMessageDlg
       *  Standard message box dialog (based on <ngMessageDlg>).
       */
      /*<>*/
      ngRegisterControlType('stdMessageDlg', function(def,ref,parent) {

        /*
         *  Group: Definition
         */
        /*
         *  Variable: DlgCheckBox
         *  ...
         *  Type: object
         *  Default value: *undefined*
         */
        /*<>*/
        ng_MergeDef(def, {
          DialogType: 'stdDialog',
          /*
           *  Group: Controls
           */
          Controls: {
            /*  Object: Message
             *  <stdText>
             */
            Message: {
              Type: 'stdText'
  //            style: { border: '1px solid red' }
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
                HPadding: 10
              },
              Controls: {
                /*  Object: OK
                 *  <stdButton>
                 */
                OK: {
                  Type: 'stdButton',
                  W: 80
                },
                /*  Object: Yes
                 *  <stdButton>
                 */
                Yes: {
                  Type: 'stdButton',
                  W: 80
                },
                /*  Object: No
                 *  <stdButton>
                 */
                No: {
                  Type: 'stdButton',
                  W: 80
                },
                /*  Object: Cancel
                 *  <stdButton>
                 */
                Cancel: {
                  Type: 'stdButton',
                  W: 80
                }
              }

            }
          }
        });
        if(typeof def.DlgCheckBox !== 'undefined')
        {
          ng_MergeDef(def, {
            Controls: {
              Content: {
                Controls: {
                  /*  Object: CheckBox
                   *  <stdCheckBox> (if DlgCheckBox defined)
                   */
                  CheckBox: {
                    Type: 'stdCheckBox',
                    L: 0, B: 10,
                    Data: def.DlgCheckBox
                  }
                }
              }
            }
          });
          def.Controls.Content.H+=25;
        }
        if(def.DialogType=='stdMessageDlg') def.DialogType='stdDialog';
        return ngCreateControlAsType(def, 'ngMessageDlg', ref, parent);
      });

      /*  Class: dlgMessageBox
       *  Message box dialog (based on <stdMessageDlg>).
       */
      /*<>*/
      ngRegisterControlType('dlgMessageBox', function(def,ref,parent) {

        delete def.DialogType;
        def.DlgButtons=ngVal(def.DlgButtons,mbOK);
        /*
         *  Group: Definition
         */
        /*
         *  Variable: DlgIcon
         *  ...
         *  Type: mixed
         *  Default value: *mbIconInformation*
         */
        /*<>*/
        def.DlgIcon=ngVal(def.DlgIcon,mbIconInformation);
        var ic=null;
        if(typeof def.DlgIcon === 'object') ic=def.DlgIcon;
        else if(typeof def.DlgIcon !== 'undefined') ic=ngVal(winimages.DlgIcons[def.DlgIcon],null);
        if(ic)
        {
          ng_MergeDef(def,{
            Data: {
            },
            /*
             *  Group: Controls
             */
            Controls: {
              Message: {
                L: 15+ic.W+10, T: 25,
                Data: {
                  MinHeight: (typeof def.DlgCheckBox !== 'undefined' ? (ic.H>=30 ? ic.H-30 : 0) : ic.H-10)
                }
              },
              /*  Object: Icon
               *  <stdImage>
               */
              Icon: {
                Type: 'stdImage',
                L: 15, T: 15, W: ic.W, H: ic.H,
                Data: {
                  Img: ic
                }
              },
              Content: {
                H: 10,
                Controls: {
                }
              }
            }
          });
          if(def.Controls.Content.Controls.Check) def.Controls.Content.Controls.Check.L=ic.W+10;
        }
        return ngCreateControlAsType(def, 'stdMessageDlg', ref, parent);
      });

      /*  Class: dlgInputBox
       *  Input box dialog (based on <stdMessageDlg>).
       */
      /*<>*/
      /*
       *  Group: Definition
       */
      /*
       *  Variable: DlgAllowEmpty
       *  ...
       *  Type: bool
       *  Default value: *false*
       */
      /*<>*/
      /*
       *  Variable: DlgHint
       *  ...
       *  Type: string
       *  Default value: *''*
       */
      /*<>*/
      function Create_dlgEditBox(def,ref,parent) {

        delete def.DialogType;
        def.DlgAllowEmpty=ngVal(def.DlgAllowEmpty,false);
        var cdef={
          DialogType: 'stdMessageDlg',
          DlgButtons: mbOK|mbCancel,
          Data: {
          },
          /*
           *  Group: Controls
           */
          Controls: {
            Message: {
              Data: {
                MinWidth: 250
              }
            },
            Content: {
              H: 30,
              Controls: {
                /*  Object: Edit
                 *  <stdEdit>
                 */
                Edit: {
                  Type: 'stdEdit',
                  L: 0, T: 2, R: 0,
                  Data: {
                  }
                }
              }
            },
            Buttons: {
              Controls: {
                OK: {
                  Data: { }
                }
              }
            }
          }
        };
        var edit=cdef.Controls.Content.Controls.Edit;
        switch(def.Type)
        {
          case 'dlgMemoBox':
            edit.Type='stdMemo';
            edit.H=100;
            cdef.Controls.Content.H=110;
            break;
          case 'dlgDropDownBox':
          case 'dlgDropDownListBox':
            edit.Type=(def.Type=='dlgDropDownBox' ? 'stdDropDown' : 'stdDropDownList');
            edit.DropDown={ Type: 'stdList', Data: {  } };
            if(typeof def.DlgItems!=='undefined') edit.DropDown.Data.Items=def.DlgItems;
            break;
        }
        if(typeof def.DlgHint !== 'undefined') edit.Data.Hint=def.DlgHint;
        if(!def.DlgAllowEmpty)
        {
          edit.Data.OnTextChanged = function(c) {
            c.Owner.OK.SetEnabled(c.GetText()!='');
            return true;
          };
          cdef.Controls.Buttons.Controls.OK.Data.Enabled=false;
        }
        ng_MergeDef(def, cdef);
        var c=ngCreateControlAsType(def, 'stdMessageDlg', ref, parent);
        if(def.Type!='dlgDropDownListBox')
        {
          c.AddEvent('OnVisibleChanged', function (c) {
            var hint,edit=c.Controls.Edit;
            if(edit.OnGetHint) hint=ngVal(edit.OnGetHint(edit),'');
            else hint=edit.Hint;
            if((c.Visible)&&(hint=='')) edit.SetFocus();
          });
        }
        return c;
      };

      ngRegisterControlType('dlgInputBox', Create_dlgEditBox);

      /*  Class: dlgDropDownBox
       *  Dropdown dialog (based on <stdMessageDlg>).
       */
      /*<>*/
      /*
       *  Group: Definition
       */
      /*
       *  Variable: DlgAllowEmpty
       *  ...
       *  Type: bool
       *  Default value: *false*
       */
      /*<>*/
      /*
       *  Variable: DlgHint
       *  ...
       *  Type: string
       *  Default value: *''*
       */
      /*<>*/
      /*
       *  Variable: DlgItems
       *  ...
       *  Type: array
       *  Default value: *[]*
       */
      /*<>*/
      /*
       *  Group: Controls
       */
      /*  Object: Edit
       *  <stdDropDown>
       */
      ngRegisterControlType('dlgDropDownBox', Create_dlgEditBox);
      /*  Class: dlgDropDownListBox
       *  Dropdown list dialog (based on <stdMessageDlg>).
       */
      /*<>*/
      /*
       *  Group: Definition
       */
      /*
       *  Variable: DlgAllowEmpty
       *  ...
       *  Type: bool
       *  Default value: *false*
       */
      /*<>*/
      /*
       *  Variable: DlgHint
       *  ...
       *  Type: string
       *  Default value: *''*
       */
      /*<>*/
      /*
       *  Variable: DlgItems
       *  ...
       *  Type: array
       *  Default value: *[]*
       */
      /*<>*/
      /*
       *  Group: Controls
       */
      /*  Object: Edit
       *  <stdDropDownList>
       */
      ngRegisterControlType('dlgDropDownListBox', Create_dlgEditBox);

      /*  Class: dlgMemoBox
       *  Input memo dialog (based on <stdMessageDlg>).
       */
      /*<>*/
      /*
       *  Group: Definition
       */
      /*
       *  Variable: DlgAllowEmpty
       *  ...
       *  Type: bool
       *  Default value: *false*
       */
      /*<>*/
      /*
       *  Variable: DlgItems
       *  ...
       *  Type: array
       *  Default value: *[]*
       */
      /*<>*/
      /*
       *  Group: Controls
       */
      /*  Object: Edit
       *  <stdMemo>
       */
      ngRegisterControlType('dlgMemoBox', Create_dlgEditBox);

      /*  Class: dlgListBox
       *  List box dialog (based on <stdMessageDlg>).
       */
      /*<>*/
      /*
       *  Group: Definition
       */
      /*
       *  Variable: DlgAllowEmpty
       *  ...
       *  Type: bool
       *  Default value: *false*
       */
      /*<>*/
      /*
       *  Variable: DlgHint
       *  ...
       *  Type: string
       *  Default value: *''*
       */
      /*<>*/
      ngRegisterControlType('dlgListBox', function(def,ref,parent) {
        delete def.DialogType;
        def.DlgAllowEmpty=ngVal(def.DlgAllowEmpty,false);
        var cdef={
          DialogType: 'stdMessageDlg',
          DlgButtons: mbOK|mbCancel,
          Data: {
          },
          /*
           *  Group: Controls
           */
          Controls: {
            Message: {
              Data: {
                MinWidth: 300
              }
            },
            Content: {
              H: 265,
              Controls: {
                /*  Object: List
                 *  <stdList>
                 */
                List: {
                  Type: 'stdList',
                  L: 0, T: 2, R: 0, H: 250,
                  Data: {
                    SelectType: nglSelectSingle
                  }
                }
              }
            },
            Buttons: {
              Controls: {
                OK: {
                  Data: { }
                }
              }
            }
          }
        };
        var list=cdef.Controls.Content.Controls.List;
        if(typeof def.DlgItems!=='undefined') list.Data.Items=def.DlgItems;
        if(!def.DlgAllowEmpty)
        {
          list.Data.OnSelectChanged = function(c) {
            if(c.Owner.OK.SetEnabled) c.Owner.OK.SetEnabled(c.SelCount>0);
            return true;
          };
          cdef.Controls.Buttons.Controls.OK.Data.Enabled=false;
        }
        ng_MergeDef(def, cdef);

        var c=ngCreateControlAsType(def, 'stdMessageDlg', ref, parent);
        c.AddEvent('OnVisibleChanged', function (c) {
          if(c.Visible) c.Controls.List.SetFocus();
        });
        return c;
      });

      /*  Class: dlgProgressBox
       *  Progress box dialog (based on <stdMessageDlg>).
       */
      /*<>*/
      ngRegisterControlType('dlgProgressBox', function(def,ref,parent) {

        delete def.DialogType;
        ng_MergeDef(def, {
          DlgButtons: mbNone,
          Data: {
          },
          /*
           *  Group: Controls
           */
          Controls: {
            Message: {
              Data: {
                MinWidth: 230
              }
            },
            Content: {
              H: 30,
              Controls: {
                /*  Object: Progress
                 *  <stdProgressBar>
                 */
                Progress: {
                  Type: 'stdProgressBar',
                  L: 0, T: 5, R: 0
                }
              }
            }
          }
        });
        return ngCreateControlAsType(def, 'stdMessageDlg', ref, parent);
      });

      /*  Class: dlgWaitBox
       *  Wait box dialog (based on <stdMessageDlg>).
       */
      /*<>*/
      ngRegisterControlType('dlgWaitBox', function(def,ref,parent) {

        delete def.DialogType;
        ng_MergeDef(def, {
          DlgButtons: mbNone,
          Data: {
          },
          /*
           *  Group: Controls
           */
          Controls: {
            Message: {
              L: 40,
              Data: {
              }
            },
            /*  Object: Progress
             *  <stdProgressDot>
             */
            Progress: {
              Type: 'stdProgressDot',
              L: 15, T: 15
            },
            Content: {
              Data: {
                Visible: false
              }
            }
          }
        });
        return ngCreateControlAsType(def, 'stdMessageDlg', ref, parent);
      });
      /*  Class: dlgAbout
       *  Application about dialog (based on <ngAboutDlg>).
       */
      /*<>*/
      ngRegisterControlType('dlgAbout', function(def,ref,parent) {
        var cdef={
          DialogType: 'dlgMessageBox',
          DlgIcon: null,

          /*
           *  Group: Controls
           */
          Controls: {
            Message: {
              className: 'wxpAboutMessage',
  //            T: 15
              Data: {
                MinWidth: 260
              }
            },
            Content: {
  //            H: 125,
              Controls: {
                /*  Object: AppInfo
                 *  <stdList>
                 */
                AppInfo: {
                  Type: 'stdTreeList',
                  style: { border: '0px' },
    //              L:0, T: 20, R: 0, H: 90,
                  TreeImg: 'triangle',
                  Data: {
  //                  ListIndent: 0,
                    DefaultIndent: 0
                  }
                }
              }
            }
          }

        };
        if((typeof def.DlgIcon === 'object')&&(def.DlgIcon))
        {
          cdef.Controls.Message.Data.MinWidth-=(def.DlgIcon.W+10);
        }
        ng_MergeDef(def, cdef);
        return ngCreateControlAsType(def, 'ngAboutDlg', ref, parent);
      });
    }

    /**
     * Calendar Controls
     */
    if(ngUserControls['calendar'])
    {
      /*  Class: stdCalendar
       *  Standard calendar control (based on <ngCalendar>).
       */
      /*<>*/
      ngRegisterControlType('stdCalendar', function(def,ref,parent) {
        if(typeof def.className === 'undefined') def.className='wxpCalendar';
        var c=ngCreateControlAsType(def, 'ngCalendar', ref, parent);
        if(!c) return c;
        c.PrevMonBtn.LeftImg=winimages.ArrowLeft;
        c.PrevMonBtn.Text='';
        c.NextMonBtn.LeftImg=winimages.ArrowRight;
        c.NextMonBtn.Text='';
        c.PrevYearBtn.LeftImg=winimages.ArrowLeft;
        c.PrevYearBtn.Text='';
        c.NextYearBtn.LeftImg=winimages.ArrowRight;
        c.NextYearBtn.Text='';
        for(var i=0;i<c.FastButtons.length;i++)
        {
          var b=c.FastButtons[i];
          b.LeftImg=winimages.Button.LeftImg;
          b.MiddleImg=winimages.Button.MiddleImg;
          b.RightImg=winimages.Button.RightImg;
          b.className='wxpButton';
        }
        //c.ImgWeekDay = winimages.Elipsis;
        //c.ImgDay = winimages.Elipsis;
        return c;
      });

      /*  Class: stdEditDate
       *  Standard edit date control (based on <ngEditDate>).
       */
      /*<>*/
      function Create_stdEditDate(def,ref,parent,basetype) {
        ng_MergeDef(def, {
          className: 'wxpEdit',
          DropDown: {
            className: 'wxpCalendar wxpDropDown',
            Type: 'stdCalendar',
            style: { padding: '10px' }
          }
        });
        var c=Create_stdDropDown(def,ref,parent, ngVal(basetype,'ngEditDate'),false);
        if(!c) return c;
        winxp.stdEdit_AddProperties(c);
        c.DropDownButton.LeftImg=winimages.Calendar;
        c.DropDownButton.Alt = ngTxt('calendar');
        c.DropDownButton.Default = false;
        return c;
      }

      ngRegisterControlType('stdEditDate', function(def,ref,parent) { return Create_stdEditDate(def,ref,parent); });

      /*  Class: stdEditTime
       *  Standard edit date control (based on <ngEditTime>).
       */
      /*<>*/
      function Create_stdEditTime(def,ref,parent,basetype) {
        var div=1;
        ng_MergeDef(def, {
          className: 'wxpEdit',
          Data: {
  //          DropDownWidth: 100,
  //          DropDownAlign: 'right'
          },
          Events: {
            OnDropDown: function (e,l) {
              if(!l.Items.length)
              {
                l.BeginUpdate();
                var items=[];
                for(var i=0;i<24;i++)
                  for(var j=0;j<60;j+=div)
                  {
                    var d=new Date(0,0,0,i,j,0);
                    items.push({Text:ng_FormatTime(d,ng_TimeFormat(false,true)),Time:d});
                  }
                l.AddItems(items);
                l.EndUpdate();
              }
              return true;
            },
            OnListItemChanged: function(e,l,it,oit) {
              e.SetDate(it.Time);
              if(e.HideDropDown) e.HideDropDown();
              return false;
            }
          },
          DropDown: {
            className: 'wxpDropDown',
            Type: 'stdList'
          }
        });
        div=ngVal(def.DropDown.HourDivider,2);
        if(div<=0) div=1;
        div=60/div;
        var c=ngCreateControlAsType(def, ngVal(basetype,'ngEditTime'), ref, parent);
        if(!c) return c;

        if(def.Type == 'ngDropDownList') c.DropDownType=ngeDropDownList;
        ngDropDown_Add(c);

        winxp.stdEdit_AddProperties(c);
        c.DropDownButton.LeftImg=winimages.DropDown;
        c.DropDownButton.Default = false;
        if(typeof def.DropDown.className === 'undefined') def.DropDown.className='wxpDropDown';
        return c;
      }

      ngRegisterControlType('stdEditTime', function(def,ref,parent) { return Create_stdEditTime(def,ref,parent); });
    }

    /**
     * Menu Controls
     */
    if(ngUserControls['menu'])
    {
      /*  Class: stdMenu
       *  Standard menu control (based on <ngMenu>).
       */
      /*<>*/
      ngRegisterControlType('stdMenu', function(def,ref,parent) {
        ng_MergeDef(def, {
          className: 'wxpMenu',
          Data: {
            SubMenuImg: winimages.SubMenu,
            SubMenuDef: { Type: 'stdMenu' }
          }
        });
        var c=ngCreateControlAsType(def, 'ngMenu', ref, parent);
        if(c)
        {
          c.OnGetCheckImg = function(list,item) {
            if((typeof item.Checked==='undefined')||(!list.ShowCheckboxes)) return null;
            //if(typeof item.RadioGroup!=='undefined') return WinXPControls.Images.Radio;
            return WinXPControls.Images.MenuCheckBox;
          }
        }
        return c;
      });
      /*  Class: stdMenuBar
       *  Standard menu bar control (based on <ngMenuBar>).
       */
      /*<>*/
      ngRegisterControlType('stdMenuBar', function(def,ref,parent) {
        if(typeof def.className === 'undefined') def.className='wxpMenuBar';
        return ngCreateControlAsType(def, 'ngMenuBar', ref, parent);
      });
      /*  Class: stdMenuBarButton
       *  Standard menu bar button control (based on <ngMenuBarButton>).
       */
      /*<>*/
      ngRegisterControlType('stdMenuBarButton', function(def,ref,parent) {
        return ngCreateControlAsType(def, 'ngMenuBarButton', ref, parent);
      });
      /*  Class: stdSplitButton
       *  Button with menu control (based on <ngSplitButton>).
       */
      /*<>*/
      ngRegisterControlType('stdSplitButton', function(def,ref,parent) {
        if(typeof def.className === 'undefined') def.className='wxpSplitButton';
        var c=ngCreateControlAsType(def, 'ngSplitButton', ref, parent);
        if(!c) return c;
        c.LeftImg=winimages.Button.LeftImg;
        c.MiddleImg=winimages.Button.MiddleImg;
        c.RightImg=winimages.Button.MenuRightBtnImg;
        return c;
      });
    }

    /**
     * ViewModel Controls
     */
    if(ngUserControls['viewmodel_controls'])
    {
      /*  Class: stdViewModelForm
       *  View model form control (based on <ngViewModelForm>).
       */
      /*<>*/
      function Create_stdViewModelForm(def,ref,parent, base_type)
      {
        ng_MergeDef(def, {
          ErrorHint: {
            Type: 'stdTextHint',
            className: 'wxpEditFieldError'
          }
        });
        var c=ngCreateControlAsType(def, ngVal(base_type,'ngViewModelForm'), ref, parent);
        if(c)
        {
          c.AddEvent('OnShowErrorMsg', function(form,msg) {
            if(typeof ngMessageDlg==='function') {
              ngMessageDlg('dlgMessageBox',msg,(typeof form.Caption === 'undefined' ? ngTxt('ngAppName') : ngTxt(form.Caption)), null , { DlgIcon: mbIconError });
            }
            else alert(msg);
            return true;
          });
        }
        return c;
      }

      ngRegisterControlType('stdViewModelForm', function(def,ref,parent) { return Create_stdViewModelForm(def,ref,parent); } );

      /*  Class: stdEditField
       *  Standard drop down control (based on <ngEditField>).
       */
      /*<>*/

      function Create_stdEditFieldDef(def)
      {
        ng_MergeDef(def,{
          Data: {
            HintX: 0
          },
          ErrorHint: {
            Type: 'stdTextHint',
            className: 'wxpEditFieldError'
          }
        });
      }

      function Create_stdEditField(def,ref,parent) {
        Create_stdEditFieldDef(def);
        if(typeof def.className === 'undefined') def.className='wxpEdit';
        if((typeof def.DropDown !== 'undefined')&&(typeof def.DropDown.className === 'undefined')) def.DropDown.className='wxpDropDown';
        var c=ngCreateControlAsType(def, 'ngEditField', ref, parent);
        if(c) {
          winxp.stdEdit_AddProperties(c);
        }
        return c;
      }
      ngRegisterControlType('stdEditField', Create_stdEditField);

      /*  Class: stdSearchBoxField
       *  Standard search box field control (based on <stdSearchBox>).
       */
      /*<>*/
      ngRegisterControlType('stdSearchBoxField', function(def,ref,parent) { return Create_stdSearchBox(def,ref,parent,'stdEditField'); });

      /*  Class: stdEditBoxBtnField
       *  Standard edit field control with elipsis button (based on <stdEditBoxBtn>).
       */
      /*<>*/
      ngRegisterControlType('stdEditBoxBtnField', function(def,ref,parent) { return Create_stdEditBoxBtn(def,ref,parent,'stdEditField'); });

      /*  Class: stdEditNumField
       *  Standard drop down field control (based on <ngEditNumField>).
       */
      /*<>*/
      ngRegisterControlType('stdEditNumField', function(def,ref,parent) {
        Create_stdEditFieldDef(def);
        return Create_stdEditNum(def,ref,parent,'ngEditNumField');
      });

      /*  Class: stdColorEditField
       *  Standard color edit field control (based on <stdColorEdit>).
       */
      ngRegisterControlType('stdColorEditField', function(def,ref,parent) {
        Create_stdEditFieldDef(def);
        return Create_stdColorEdit(def,ref,parent,'ngDropDownField');
      });

      /*  Class: stdDropDownField
       *  Standard drop down field control (based on <ngDropDownField>).
       */
      ngRegisterControlType('stdDropDownField', function(def,ref,parent) {
        Create_stdEditFieldDef(def);
        return Create_stdDropDown(def,ref,parent,'ngDropDownField',false);
      });

      /*  Class: stdDropDownListField
       *  Standard drop down list field control (based on <ngDropDownListField>).
       */
      ngRegisterControlType('stdDropDownListField', function(def,ref,parent) {
        Create_stdEditFieldDef(def);
        return Create_stdDropDown(def,ref,parent,'ngDropDownListField',true);
      });

      /*  Class: stdEditDateField
       *  Standard edit date field control (based on <ngEditDate>).
       */
      /*<>*/
      ngRegisterControlType('stdEditDateField', function(def,ref,parent) {
        Create_stdEditFieldDef(def);
        return Create_stdEditDate(def,ref,parent,'ngEditDateField');
      });

      /*  Class: stdEditTimeField
       *  Standard edit date field control (based on <ngEditTime>).
       */
      /*<>*/
      ngRegisterControlType('stdEditTimeField', function(def,ref,parent) {
        Create_stdEditFieldDef(def);
        return Create_stdEditTime(def,ref,parent,'ngEditTimeField');
      });

      /*  Class: stdMemoField
       *  Standard memo field control (based on <ngMemoField>).
       */
      /*<>*/
      ngRegisterControlType('stdMemoField', function(def,ref,parent) {
        Create_stdEditFieldDef(def);
        return Create_stdMemo(def,ref,parent,'ngMemoField');
      });
    }

    /**
     * ViewModel DataSet Controls
     */
    if(ngUserControls['viewmodel_dataset'])
    {
      /*  Class: stdDataSet
       *  Standard dataset control (based on <ngDataSet>).
       */
      /*<>*/
      ngRegisterControlType('stdDataSet', function (def,ref,parent) { return Create_stdPageList(def,ref,parent,'ngDataSet'); });
    }

    /**
     * DB ViewModel Controls
     */
    if(ngUserControls['dbviewmodel'])
    {
      /*  Class: stdDBViewModelForm
       *  View model form control (based on <ngDBViewModelForm>).
       */
      /*<>*/
      ngRegisterControlType('stdDBViewModelForm',  function(def,ref,parent) {
        var c=Create_stdViewModelForm(def,ref,parent,'ngDBViewModelForm');
        if(c)
        {
          c.AddEvent('OnDeleteQuery',function(form,querytxt,successfnc,failfnc) {
            if(typeof ngMessageDlg==='function') {
              ngMessageDlg('dlgMessageBox',querytxt,(typeof form.Caption === 'undefined' ? ngTxt('ngAppName') : ngTxt(form.Caption)), function(c) {
                if(c.DialogResult==mbYes)
                {
                  if(typeof successfnc === 'function') successfnc(form);
                }
                else
                {
                  if(typeof failfnc === 'function') failfnc(form);
                }
                c.Hide();
                return true;
              }, { DlgIcon: mbIconQuestion, DlgButtons: mbYes | mbNo | mbDefButton2 });
              return false;
            }
            else
            {
              if(confirm(querytxt))
              {
                if(typeof successfnc === 'function') successfnc(form);
              }
              else
              {
                if(typeof failfnc === 'function') failfnc(form);
              }
              return true;
            }
          });

          c.AddEvent('OnChangedQuery',function(form,querytxt,successfnc,failfnc) {
            if(typeof ngMessageDlg==='function') {
              ngMessageDlg('dlgMessageBox',querytxt,(typeof form.Caption === 'undefined' ? ngTxt('ngAppName') : ngTxt(form.Caption)), function(c) {
                if(c.DialogResult==mbYes)
                {
                  if(typeof successfnc === 'function') successfnc(form);
                }
                else
                {
                  if(typeof failfnc === 'function') failfnc(form);
                }
                c.Hide();
                return true;
              }, { DlgIcon: mbIconWarning, DlgButtons: mbYes | mbNo | mbDefButton2 });
              return false;
            }
            else
            {
              if(confirm(querytxt))
              {
                if(typeof successfnc === 'function') successfnc(form);
              }
              else
              {
                if(typeof failfnc === 'function') failfnc(form);
              }
              return true;
            }
          });
        }
        return c;
      });

      /*  Class: stdDBToolBar
       *  Standard ViewModel database toolbar control (based on <ngDBToolBar>).
       */
      ngRegisterControlType('stdDBToolBar', function (def,ref,parent) {
        ng_MergeDef(def, {
          W: 260,
          className: 'wxpToolBar',
           Data: {
             HPadding: 5
           },
          Controls: {
            New: {
              Type: 'stdButton',
              W: 60
            },
            Delete: {
              Type: 'stdButton',
              W: 60,
              Data: {
                ToolBarHPadding: 10
              }
            },
            Insert: {
              Type: 'stdButton',
              W: 60
            },
            Update: {
              Type: 'stdButton',
              W: 60
            },
            Cancel: {
              Type: 'stdButton',
              W: 60
            }
          }
        });
        return ngCreateControlAsType(def, 'ngDBToolBar', ref, parent);
      });

      /*  Class: stdDBDataSet
       *  Standard dataset control (based on <ngDBDataSet>).
       */
      /*<>*/
      ngRegisterControlType('stdDBDataSet', function (def,ref,parent) {
        ng_MergeDef(def, {
          Controls: {
            Paging: {
              Controls: {
                NewRecord: {
                  Type: 'stdFlatButton',
                  Data: {
                    ToolBarHPadding: 5
                  }
                },
                LoadRecord: {
                  Type: 'stdFlatButton',
                  Data: {
                    ToolBarHPadding: 5
                  }
                },
                DeleteRecord: {
                  Type: 'stdFlatButton',
                  Data: {
                    ToolBarHPadding: 10
                  }
                },
                Refresh: {
                  Type: 'stdFlatButton',
                  Data: {
                    ToolBarHPadding: 10
                  }
                }
              }
            }
          }
        });
        return Create_stdPageList(def,ref,parent,'ngDBDataSet');
      });

    }
  }
};
ngUserControls['winxp'] = WinXPControls;
