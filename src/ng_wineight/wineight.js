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

/*
 *  Group: Constants
 */
var WE_DARK = 0;
var WE_LIGHT = 1;
/**
 *  Variable: WinEightControls
 *  Reference to WinEight control definitions.
 */
var WinEightControls = {
  Lib: 'ng_wineight',
  ControlsGroup: 'WinEight Skin',

  Theme: WE_LIGHT,
  ColorScheme: 'Green',
  BackgroundColor: 'Auto',

  InvTheme: function(theme) {
    return (ngVal(theme,this.Theme)===WE_DARK ? WE_LIGHT : WE_DARK);
  },

  ControlImages: [
    'img/we_base.png?4',
    'img/we_hbox.png?3',
    'img/we_vbox.png?3',
    'img/we_icons.png?13',

    // pre-load
    'img/progressline_black.gif?1',
    'img/progressline_white.gif?1',
    'img/progressring_black.gif?1',
    'img/progressring_white.gif?1',
    'img/progressdot_black.gif?1',
    'img/progressdot_white.gif?1'
  ],

  Images: {
    ToggleSwitchLight: { L: 0, T: 122, W: 50, H: 19, SL: 102, DL: 204, DSL: 255, oL: 51, oSL: 153 },
    ToggleSwitchDark: { L: 0, T: 147, W: 50, H: 19, SL: 102, DL: 204, DSL: 255, oL: 51, oSL: 153 },
    CheckBoxLeftLight: { L: 0, T: 5, W: 31, H: 32, SL: 64, DL: 0, DSL: 128, GL: 160, oL: 32, oSL: 96, oGL: 193 },
    CheckBoxLeftDark: { L: 224, T: 5, W: 31, H: 32, SL: 288, DL: 224, DSL: 353, GL: 385, oL: 256, oSL: 320, oGL: 417 },
    CheckBoxRightLight: { L: -10, T: 5, W: 31, H: 32, SL: 54, DL: -10, DSL: 118, GL: 150, oL: 22, oSL: 86, oGL: 183 },
    CheckBoxRightDark: { L: 214, T: 5, W: 31, H: 32, SL: 278, DL: 214, DSL: 343, GL: 375, oL: 246, oSL: 310, oGL: 407 },
    ListCheckBoxLight: { L: 0, T: 4, W: 27, H: 34, SL: 64, DL: 0, DSL: 128, GL: 160 },
    ListCheckBoxDark: { L: 224, T: 4, W: 27, H: 34, SL: 288, DL: 224, DSL: 353, GL: 385, oL: 0, oSL: 64, oGL: 160 },
    RadioLeftLight: { L: 0, T: 39, W: 32, H: 32, SL: 68, DL: 0, DSL: 136, oL: 34, oSL: 102 },
    RadioLeftDark: { L: 170, T: 39, W: 32, H: 32, SL: 238, DL: 170, DSL: 306, oL: 204, oSL: 272 },
    RadioRightLight: { L: -9, T: 39, W: 32, H: 32, SL: 59, DL: -9, DSL: 127, oL: 25, oSL: 93 },
    RadioRightDark: { L: 161, T: 39, W: 32, H: 32, SL: 229, DL: 161, DSL: 297, oL: 195, oSL: 263 },
    ListRadioLight: { L: 0, T: 38, W: 28, H: 34, SL: 68, DL: 0, DSL: 136 },
    ListRadioDark: { L: 170, T: 38, W: 28, H: 34, SL: 238, DL: 170, DSL: 306, oL: 0, oSL: 68 },

    TreeImgDark: { ST: 768, W: 22, H: 34, SL: 43, DL: 77, DSL: 76, Src: 3, L: 44, T: 865, DT: 865, DST: 768, oL: 11, oSL: 9, oST: 768 },
    TreeImgLight: { ST: 768, W: 22, H: 34, SL: 10, DL: 77, DSL: 76, Src: 3, L: 11, T: 865, DT: 865, DST: 768 },
    TreeImgSelLight: { ST: 768, W: 22, H: 34, SL: 43, DL: 77, DSL: 76, Src: 3, L: 44, T: 865, DT: 865, DST: 768 },

    DropDownTreeImgDark: { ST: 768, W: 22, H: 34, SL: 43, DL: 77, DSL: 76, Src: 3, L: 44, T: 865, DT: 865, DST: 768, oL: 11, oSL: 9, oST: 768 },
    DropDownTreeImgLight: { ST: 768, W: 22, H: 34, SL: 10, DL: 77, DSL: 76, Src: 3, L: 11, T: 865, DT: 865, DST: 768, oL: 44, oSL: 43, oST: 768 },

    AboutTreeImgDark: { ST: 775, W: 22, H: 19, SL: 43, DL: 77, DSL: 76, Src: 3, L: 44, T: 872, DT: 872, DST: 775 },
    AboutTreeImgLight: { ST: 775, W: 22, H: 19, SL: 10, DL: 77, DSL: 76, Src: 3, L: 11, T: 872, DT: 872, DST: 775 },


    AppButtonLight: { L: 0, T: 79, SL: 68, DL: 136, W: 33, H: 32, oL: 34, oSL: 102 },
    AppButtonDark: { L: 170, T: 79, SL: 238, DL: 136, W: 33, H: 32, oL: 204, oSL: 272 },
    ButtonLight: {
      MiddleImg: { L: 0, T: -32, H: 32, DT: 264, Src: 1, oT: 297, ST: 330, oST: 429 },
      MenuRightImg: { L: 1, T: 243, W: 27, H: 32, SL: 89, DL: 59, oL: 29, oSL: 119 },
      MenuRightBtnImg: { L: 0, T: 243, W: 28, H: 32, SL: 88, DL: 58, oL: 28, oSL: 118 }
    },
    ButtonDark: {
      LeftImg: { L: 0, T: 198, W: 2, H: 32, DT: 264, Src: 1, oT: 198, ST: 198, oST: 463 },
      MiddleImg: { L: 0, T: 363, H: 32, DT: 264, Src: 1, oT: 396, ST: 198, oST: 463 },
      RightImg: { L: 0, T: 198, W: 2, H: 32, DT: 264, Src: 1, oT: 198, ST: 198, oST: 463 },

      MenuRightImg: { L: 149, T: 243, W: 27, H: 32, DL: 59, oL: 179, SL: 209, oSL: 239 },
      MenuRightBtnImg: { L: 148, T: 243, W: 28, H: 32, DL: 58, oL: 178, SL: 208, oSL: 238 }
    },

    GroupBox: {
      Top: { L: 0, T: -29, H: 29, Src: 1 }
/*      Top: { L: 0, T: -30, H: 32, DT: 66, Src: 1 },
      Left: { L: 88, T: 0, W: 2, SL: 103, DL: 118, Src: 2 },
      Right: { L: 88, T: 0, W: 2, SL: 103, DL: 118, Src: 2 },
      Bottom: { L: 0, T: 0, H: 2, DT: 66, Src: 1 }*/
    },
/*    GroupBox: {
      Top: { L: 0, T: -31, H: 32, Src: 1 }
    },*/

    GroupBoxNoText: {
      Top: { L: 0, T: 0, H: 2, DT: 99, Src: 1 },
      Left: { L: 15, T: 0, W: 2, DL: 107, Src: 2 },
      Right: { L: 15, T: 0, W: 2, DL: 107, Src: 2 },
      Bottom: { L: 0, T: 0, H: 2, DT: 99, Src: 1 }
    },

    EditLight: {
      LeftImg: { L: 0, T: 207, W: 15, H: 32, SL: 64, DL: 96, oL: 32, oSL: 64 },
      LeftImgBtn: { L: 0, T: 207, W: 2, H: 32, SL: 64, DL: 96, oL: 32, oSL: 64 },
      MiddleImg: { L: 0, T: 0, H: 32, ST: 66, DT: 99, Src: 1, oT: 33, oST: 66 },
      RightImg: { L: 16, T: 207, W: 15, H: 32, SL: 80, DL: 112, oL: 48, oSL: 80 },
      RightImgBtn: { L: 29, T: 207, W: 2, H: 32, SL: 93, DL: 125, oL: 61, oSL: 93 },
      LeftImgReq: { L: 128, T: 207, W: 15, H: 32, SL: 128, DL: 96, oL: 161, oSL: 128 },
      LeftImgBtnReq: { L: 128, T: 207, W: 2, H: 32, SL: 128, DL: 96, oL: 161, oSL: 128 },
      MiddleImgReq: { L: 0, T: 132, H: 32, ST: 132, DT: 99, Src: 1, oT: 165, oST: 132 },
      RightImgReq: { L: 144, T: 207, W: 15, H: 32, SL: 144, DL: 112, oL: 177, oSL: 144 },
      RightImgBtnReq: { L: 157, T: 207, W: 2, H: 32, SL: 157, DL: 125, oL: 190, oSL: 157 }
    },
    EditDark: {
      LeftImg: { L: 268, T: 243, H: 32, DL: 300, oL: 284, SL: 268, oSL: 268, W: 15 },
      LeftImgBtn: { L: 268, T: 243, H: 32, DL: 300, oL: 284, SL: 268, oSL: 268, W: 2 },
      MiddleImg: { L: 0, T: 198, H: 32, DT: 264, Src: 1, oT: 231, ST: 198, oST: 198 },
      RightImg: { L: 268, T: 243, H: 32, DL: 300, oL: 284, SL: 268, oSL: 268, W: 15 },
      RightImgBtn: { L: 268, T: 243, H: 32, DL: 300, oL: 284, SL: 268, oSL: 268, W: 2 },
      LeftImgReq: { L: 128, T: 207, W: 15, H: 32, DL: 193, oL: 161, SL: 128, oSL: 128 },
      LeftImgBtnReq: { L: 128, T: 207, W: 2, H: 32, DL: 193, oL: 161, SL: 128, oSL: 128 },
      MiddleImgReq: { L: 0, T: 132, H: 32, DT: 264, Src: 1, oT: 165, ST: 132, oST: 132 },
      RightImgReq: { L: 144, T: 207, W: 15, H: 32, DL: 193, oL: 177, SL: 144, oSL: 144 },
      RightImgBtnReq: { L: 157, T: 207, W: 2, H: 32, DL: 193, oL: 190, SL: 157, oSL: 157 }
    },

    DropDown: { L: 0, T: 864, W: 33, H: 32, oL: 0, DL: 67, Src: 3, SL: 34, oSL: 33 },

    EditEllipsis: { L: 0, T: 2*32+1, SL: 33, DL: 66, W: 33, H: 32, Src: 3 },
    EditSearch: { L: 0, T: 5*32, SL: 33, DL: 66, W: 33, H: 32, Src: 3 },
    EditArrowRight: { L: 0, T: 1*32, SL: 33, DL: 66, W: 33, H: 32, Src: 3 },
    EditArrowLeft: { L: 0, T: 0*32, SL: 33, DL: 66, W: 33, H: 32, Src: 3 },

    MemoLight: {
      LeftTop: { L: 0, T: 207, W: 15, H: 13, SL: 64, DL: 96, oL: 32, oSL: 64 },
      Top: { L: 0, T: 0, H: 13, ST: 66, DT: 99, Src: 1, oT: 33, oST: 66 },
      RightTop: { L: 16, T: 207, W: 15, H: 13, SL: 80, DL: 112, oL: 48, oSL: 80 },
      Left: { L: 15, T: 0, W: 15, SL: 77, DL: 107, Src: 2, oL: 45, oSL: 77 },
      Right: { L: 2, T: 0, W: 15, SL: 64, DL: 94, Src: 2, oL: 32, oSL: 64 },
      LeftBottom: { L: 0, T: 226, W: 15, H: 13, SL: 64, DL: 96, oL: 32, oSL: 64 },
      Bottom: { L: 0, T: 19, H: 13, ST: 85, DT: 118, Src: 1, oT: 52, oST: 85 },
      RightBottom: { L: 16, T: 226, W: 15, H: 13, SL: 80, DL: 112, oL: 48, oSL: 80 }
    },

    MemoReqLight: {
      LeftTop: { L: 128, T: 207, W: 15, H: 13, DL: 96, oL: 161, SL: 128, oSL: 128 },
      Top: { L: 0, T: 132, H: 13, DT: 99, Src: 1, oT: 165, ST: 132, oST: 132 },
      RightTop: { L: 144, T: 207, W: 15, H: 13, DL: 112, oL: 177, SL: 144, oSL: 144 },
      Left: { L: 139, T: 0, W: 15, DL: 45, Src: 2, oL: 169, SL: 139, oSL: 139 },
      Right: { L: 126, T: 0, W: 15, DL: 94, Src: 2, oL: 156, SL: 126, oSL: 126 },
      LeftBottom: { L: 128, T: 226, W: 15, H: 13, DL: 96, oL: 161, SL: 128, oSL: 128 },
      Bottom: { L: 0, T: 151, H: 13, DT: 118, Src: 1, oT: 184, ST: 151, oST: 151 },
      RightBottom: { L: 144, T: 226, W: 15, H: 13, DL: 112, oL: 177, SL: 144, oSL: 144 }
    },

    MemoDark: {
      LeftTop: { L: 268, T: 243, W: 15, H: 13, DL: 300, oL: 284, SL: 268, oSL: 268 },
      Top: { L: 0, T: 199, H: 13, DT: 101, Src: 1, oT: 231, ST: 199, oST: 199 },
      RightTop: { L: 268, T: 243, W: 15, H: 13, DL: 300, oL: 284, SL: 268, oSL: 268 },
      Left: { L: 0, T: 0, W: 15, DL: 109, Src: 2, oL: 48, SL: 0, oSL: 0 },
      Right: { L: 0, T: 0, W: 15, DL: 110, Src: 2, oL: 47, SL: 0, oSL: 0 },
      LeftBottom: { L: 268, T: 262, W: 15, H: 13, DL: 300, oL: 284, SL: 268, oSL: 268 },
      Bottom: { L: 0, T: 217, H: 13, DT: 116, Src: 1, oT: 250, ST: 217, oST: 217 },
      RightBottom: { L: 268, T: 262, W: 15, H: 13, DL: 300, oL: 284, SL: 268, oSL: 268 }
    },
    MemoReqDark: {
      LeftTop: { L: 128, T: 207, W: 15, H: 13, DL: 193, oL: 161, SL: 128, oSL: 128 },
      Top: { L: 0, T: 132, H: 13, DT: 101, Src: 1, oT: 165, ST: 132, oST: 132 },
      RightTop: { L: 144, T: 207, W: 15, H: 13, DL: 193, oL: 177, SL: 144, oSL: 144 },
      Left: { L: 139, T: 0, W: 15, DL: 109, Src: 2, oL: 169, SL: 139, oSL: 139 },
      Right: { L: 126, T: 0, W: 15, DL: 110, Src: 2, oL: 156, SL: 126, oSL: 126 },
      LeftBottom: { L: 128, T: 226, W: 15, H: 13, DL: 193, oL: 161, SL: 128, oSL: 128 },
      Bottom: { L: 0, T: 151, H: 13, DT: 116, Src: 1, oT: 184, ST: 151, oST: 151 },
      RightBottom: { L: 144, T: 226, W: 15, H: 13, DL: 193, oL: 177, SL: 144, oSL: 144 }
    },

    PagesBoxUpLight: {
      Top: { L: 0, T: -30, H: 32, Src: 1 },
      Left: { L: 15, T: 0, W: 2, Src: 2 },
      Right: { L: 15, T: 0, W: 2, Src: 2 },
      Bottom: { L: 0, T: 0, H: 2, Src: 1 }
    },

    PagesBoxUpDark: {
      Top: { L: 0, T: 496, H: 32, Src: 1 },
      Left: { L: 0, T: 0, W: 2, Src: 2 },
      Right: { L: 0, T: 0, W: 2, Src: 2 },
      Bottom: { L: 0, T: 2, H: 2, Src: 1 }
    },

    PagesUpLight: [
     {
       LeftImg: { L: -14, T: 207, SL: 257, W: 14, H: 32, oL: 227, oT: 209, oSL: 257, DL: -14, oST: 207, DSL: 257 },
       MiddleImg: { L: 0, T: -32, ST: 624, H: 32, Src: 1, oT: 661, oST: 624, DT: -32, DST: 624 },
       RightImg: { L: -14, T: 207, SL: 272, W: 14, H: 32, oL: 227, oT: 209, oSL: 272, DL: -14, oST: 207, DSL: 272 }
     }
    ],
    PagesUpDark: [
     {
       MiddleImg: { L: 0, T: -32, ST: 198, H: 32, Src: 1, oT: 693, DT: -32, oST: 198, DST: 198 }
     }
    ],

    PagesBoxDownLight: {
      Top: { L: 0, T: 0, H: 2, Src: 1 },
      Left: { L: 15, T: 0, W: 2, Src: 2 },
      Right: { L: 15, T: 0, W: 2, Src: 2 },
      Bottom: { L: 0, T: 559, H: 32, Src: 1 }
    },

    PagesBoxDownDark: {
      Top: { L: 0, T: 2, H: 2, Src: 1 },
      Left: { L: 0, T: 0, W: 2, Src: 2 },
      Right: { L: 0, T: 0, W: 2, Src: 2 },
      Bottom: { L: 0, T: 526, H: 32, Src: 1 }
    },
    PagesDownLight: [
     {
       LeftImg: { L: -14, T: 207, SL: 287, W: 14, H: 32, oL: 227, oT: 205, oSL: 287, DL: -14, oST: 207, DSL: 287 },
       MiddleImg: { L: 0, T: -32, ST: 594, H: 32, Src: 1, oST: 594, oT: 658, DT: -32, DST: 594 },
       RightImg: { L: -14, T: 207, SL: 302, W: 14, H: 32, oL: 227, oT: 205, oSL: 302, DL: -14, oST: 207, DSL: 302 }
     }
    ],
    PagesDownDark: [
     {
       MiddleImg: { L: 0, T: -32, ST: 198, H: 32, Src: 1, oT: 693, DT: -32, oST: 198, DST: 198 }
     }
    ],

    Sections: [
     {
       MiddleImg: { L: 0, T: -32, H: 32, Src: 1 }
     }
    ],

    ProgressBar: {
      MiddleImg: { L:0, T:-6, H:6, Src:1 },
      BarImg:    { L:0, T:-6, H:6, Src:1 }
    },

    VSplitLight: { L: 383, T: 74, W: 16, H: 36, oL: 318, DL: -16 },
    VSplitDark: { L: 383, T: 112, W: 16, H: 36, oL: 318, DL: -16 },

    HSplitLight: { L: 405, T: 84, W: 36, H: 16, oL: 340, DL: -36 },
    HSplitDark: { L: 405, T: 122, W: 36, H: 16, oL: 340, DL: -36 },

    DropPanelButtonLight: {
      L: 0, T: 2*32+10, DL: 66, W: 33, H: 20, Src: 3
    },
    DropPanelButtonDark: {
      L: 33, T: 2*32+10, DL: 66, W: 33, H: 20, Src: 3
    },
    DropPanelButtonMiddleLight: { L: 0, T: -20, oT: 660, oST: 660, H: 20, Src: 1 },
    DropPanelButtonMiddleDark: { L: 0, T: -20, oT: 693, oST: 693, H: 20, Src: 1 },

    PagingFirstLight: { L: 0, T: 896, W: 32, H: 32, Src: 3, SL: 33, DL: 67 },
    PagingPrevLight: { L: 0, T: 800, W: 32, H: 32, Src: 3, SL: 33, DL: 67 },
    PagingNextLight: { L: 0, T: 768, W: 32, H: 32, Src: 3, SL: 33, DL: 67 },
    PagingLastLight: { L: 0, T: 928, W: 32, H: 32, Src: 3, SL: 33, DL: 67 },

    PagingFirstDark: { L: 33, T: 896, W: 32, H: 32, Src: 3, SL: 0, DL: 67 },
    PagingPrevDark: { L: 33, T: 800, W: 32, H: 32, Src: 3, SL: 0, DL: 67 },
    PagingNextDark: { L: 33, T: 768, W: 32, H: 32, Src: 3, SL: 0, DL: 67 },
    PagingLastDark: { L: 33, T: 928, W: 32, H: 32, Src: 3, SL: 0, DL: 67 },

    WindowLight: {
      LeftTop: { L: -1, T: -1, W: 10, H: 15, Src: 2 },
      Top: { L: 0, T: 592, H: 15, Src: 1 },
      RightTop: { L: 292, T: 206, W: 10, H: 15 },
      RightTopBtn: { L: -34, T: -26, W: 34, H: 26 },
      Left: { L: -1, T: 0, W: 10, Src: 2 },
      Right: { L: 187, T: 0, W: 10, Src: 2 },
      LeftBottom: { L: -1, T: 406, W: 10, H: 15, Src: 2 },
      Bottom: { L: 0, T: 643, H: 15, Src: 1 },
      RightBottom: { L: 262, T: 225, W: 10, H: 15 }
    },
    WindowDark: {
      LeftTop: { L: 210, T: 207, W: 10, H: 15 },
      Top: { L: 0, T: 527, H: 15, Src: 1 },
      RightTop: { L: 215, T: 207, W: 10, H: 15 },
      RightTopBtn: { L: 0, T: 2, W: 34, H: 26, Src: 1 },
      Left: { L: 195, T: 0, W: 10, Src: 2 },
      Right: { L: -9, T: 0, W: 10, Src: 2 },
      LeftBottom: { L: 210, T: 224, W: 10, H: 15 },
      Bottom: { L: 0, T: 512, H: 15, Src: 1 },
      RightBottom: { L: 215, T: 224, W: 10, H: 15 }
    },

    WindowCaptionLight: {
      LeftImg: { L: -1, T: -1, W: 10, H: 15, Src: 2 },
      MiddleImg: { L: 0, T: 579, H: 41, Src: 1 },
      RightImg: { L: -10, T: -15, W: 10, H: 15 },
      RightImgBtn: { L: 603, T: 567, W: 34, H: 41, Src: 1 }
    },
    WindowCaptionDark: {
      MiddleImg: { L: 0, T: -45, H: 41, Src: 1 },
      RightImgBtn: { L: 0, T: 2, W: 34, H: 26, Src: 1 }
    },

    WinCloseBtnLight: { L: 107, T: 171, W: 34, H: 26, oL: 107, oT: 278, DL: -107 },
    WinCloseBtnDark: { L: 245, T: 171, W: 34, H: 26, oL: 247, oT: 278, DL: -245 },
    WinMaxBtnLight: { L: 174, T: 171, W: 34, H: 26, SL: 210, DL: -34, oL: 177, oT: 278, oSL: 212, oST: 278 },
    WinMaxBtnDark: { L: 36, T: 171, W: 34, H: 26, SL: 72, DL: -34, oL: 36, oT: 278, oSL: 72, oST: 278 },
    WinMinBtnLight: { L: 140, T: 171, W: 34, H: 26, DL: -34, oL: 142, oT: 278 },
    WinMinBtnDark: { L: 2, T: 171, W: 34, H: 26, DL: -34, oL: 2, oT: 278 },

    Hint: {
      Top: { L: 0, T: 0, H: 2, Src: 1 },
      Left: { L: 15, T: 0, W: 2, Src: 2 },
      Right: { L: 15, T: 0, W: 2, Src: 2 },
      Bottom: { L: 0, T: 30, H: 2, Src: 1 }
    },
    HintAnchors: {
      topleft:      { L: 12, T: -8, HX: 7, HY: 1,
                     Img: { L: 331, T: 214, W: 16, H: 10 } },
      topright:     { R: 12, T: -8, HX: 7, HY: 1,
                     Img: { L: 331, T: 214, W: 16, H: 10 } },
      bottomright:  { R: 12, B: -8, HX: 7, HY: 8,
                      Img: { L: 357, T: 214, W: 16, H: 10 } },
      bottomleft:   { L: 12, B: -8, HX: 7, HY: 8,
                      Img: { L: 357, T: 214, W: 16, H: 10 } },

      lefttop:      { L: -8, T: 12, HX: 1, HY: 7,
                     Img: { L: 403, T: 214, W: 10, H: 16 } },
      leftbottom:   { L: -8, B: 12, HX: 1, HY: 7,
                     Img: { L: 403, T: 214, W: 10, H: 16 } },
      righttop:     { R: -8, T: 12, HX: 8, HY: 7,
                     Img: { L: 383, T: 214, W: 10, H: 16 } },
      rightbottom:  { R: -8, B: 12, HX: 8, HY: 7,
                     Img: { L: 383, T: 214, W: 10, H: 16 } }
    },

    TextHint: {
      LeftTop: { L: 0, T: 207, W: 7, H: 6 },
      Top: { L: 0, T: 0, H: 6, Src: 1 },
      RightTop: { L: 24, T: 207, W: 7, H: 6 },
      Left: { L: 15, T: 0, W: 7, Src: 2 },
      Right: { L: 10, T: 0, W: 7, Src: 2 },
      LeftBottom: { L: 0, T: 233, W: 7, H: 6 },
      Bottom: { L: 0, T: 26, H: 6, Src: 1 },
      RightBottom: { L: 24, T: 233, W: 7, H: 6 }
    },
    TextHintAnchors: {
      topleft:      { L: 12, T: -8, HX: 7, HY: 1,
                     Img: { L: 331, T: 214, W: 16, H: 10 } },
      topright:     { R: 12, T: -8, HX: 7, HY: 1,
                     Img: { L: 331, T: 214, W: 16, H: 10 } },
      bottomright:  { R: 12, B: -8, HX: 7, HY: 8,
                      Img: { L: 357, T: 214, W: 16, H: 10 } },
      bottomleft:   { L: 12, B: -8, HX: 7, HY: 8,
                      Img: { L: 357, T: 214, W: 16, H: 10 } }
    },

    CalendarMonPrevLight: { L: 0, T: 800, W: 32, H: 32, Src: 3, SL: 33, DL: 66 },
    CalendarMonNextLight: { L: 0, T: 768, W: 32, H: 32, Src: 3, SL: 33, DL: 66 },
    CalendarYearPrevLight: { L: 0, T: 809, W: 32, H: 13, Src: 3, SL: 33, DL: 66 },
    CalendarYearNextLight: { L: 0, T: 777, W: 32, H: 13, Src: 3, SL: 33, DL: 66 },
    CalendarMonPrevDark: { L: 33, T: 800, W: 32, H: 32, Src: 3, SL: 0, DL: 66 },
    CalendarMonNextDark: { L: 33, T: 768, W: 32, H: 32, Src: 3, SL: 0, DL: 66 },
    CalendarYearPrevDark: { L: 33, T: 809, W: 32, H: 13, Src: 3, SL: 0, DL: 66 },
    CalendarYearNextDark: { L: 33, T: 777, W: 32, H: 13, Src: 3, SL: 0, DL: 66 },

    CalendarImgDayLight: { L: -33, T: 297, W: 33, H: 33, oL: 0, oSL: 0, DL: -33, Src: 1 },
    CalendarImgDayDark: { L: 0, T: -33, W: 33, H: 33, Src: 1, oT: 693, DT: -33 },

    ColorButtonLight: {
      LeftImg: { L: 0, T: 207, H: 32, W: 2, DL: 96 },
      MiddleImg: { L: 0, T: 726, H: 32, DT: 759, Src: 1 },
      RightImg: { L: 0, T: 207, H: 32, W: 2, DL: 96 },
      Background: { L: 5, T: 858, H: 28, Src: 1 }
    },
    ColorButtonDark: {
      LeftImg: { L: 268, T: 243, H: 32, W: 2, DL: 300 },
      MiddleImg: { L: 0, T: 792, H: 32, DT: 825, Src: 1 },
      RightImg: { L: 268, T: 243, H: 32, W: 2, DL: 300 },
      Background: { L: 5, T: 858, H: 28, Src: 1 }
    },
    ColorPickerLight: {
      HorizontalSliderCursor: { L: 283, T: 170, W: 16, H: 28 },
      VerticalSliderCursor: { L: 321, T: 170, W: 28, H: 16 },
      AlphaSliderBackground: { L: 0, T: 860, H: 28, Src: 1 },
      PreviewIcon: { L: 0, T: 928, W: 33, H: 32, Src: 3 },
      SatValCursor: { L: 355, T: 170, W: 10, H: 10}
    },
    ColorPickerDark: {
      HorizontalSliderCursor: { L: 300, T: 170, W: 16, H: 28 },
      VerticalSliderCursor: { L: 321, T: 187, W: 28, H: 16 },
      AlphaSliderBackground: { L: 0, T: 860, H: 28, Src: 1 },
      PreviewIcon: { L: 33, T: 928, W: 33, H: 32, Src: 3 },
      SatValCursor: { L: 355, T: 187, W: 10, H: 10}
    },
    ColorPickerDropDownLight: {
      DropDownButton: {
        LeftImg: { L: 0, T: 209, H: 28, W: 2, DL: 96, SL: 64 },
        LeftImgReq: { L: 128, T: 209, H: 28, W: 2, DL: 64 },
        Background: { L: 5, T: 860, H: 28, Src: 1 },
        Img: { L: -80, T: -28, H: 28, W: 80 }
      }
    },
    ColorPickerDropDownDark: {
      DropDownButton: {
        LeftImg: { L: 0, T: 308, H: 28, W: 2, DL: 32, SL: 0, oL: 16, oDL: 32, oSL: 0 },
        LeftImgReq: { L: 128, T: 209, H: 28, W: 2, oL: 161, DL: 32, DT:308, oDL: 32 },
        Background: { L: 5, T: 860, H: 28, Src: 1 },
        Img: { L: -76, T: -28, H: 28, W: 76 }
      }
    },

    FileUploaderFilesLight: {
      Top: { L: 0, T: 0, H: 2, Src: 1 },
      Left: { L: 15, T: 0, W: 2, Src: 2 },
      Right: { L: 15, T: 0, W: 2, Src: 2 },
      Bottom: { L: 0, T: 30, H: 2, Src: 1 }
    },

    SubMenuLight: { L: 0, T: 768, W: 32, H: 32, Src: 3, SL: 33, DL: 66, oL: 33 },
    SubMenuDark: { L: 33, T: 768, W: 32, H: 32, Src: 3, SL: 0, DL: 66, oL: 0 },

    MenuCheckBoxLight: { L: -33, T: 241, W: 33, H: 32, DL: -33, SL: 322, oSL: 382, DSL: 352 },
    MenuCheckBoxDark: { L: -33, T: 241, W: 33, H: 32, DL: -33, SL: 382, oSL: 322, DSL: 352 },

    AppIcons: [{
      Empty: -1,
      Minus: 0,
      Plus:  1,
      Ellipsis: 2,
      Layers: 3,
      Routing: 4,
      Search: 5,
      Close: 6,
      Pan: 7,
      DrawCircle: 8,
      DrawLine: 9,
      DrawArea: 10,
      DrawPoint: 11,
      SelectObjects: 12,
      Refresh: 13,
      MeasureRadius: 14,
      MeasureLine: 15,
      MeasureArea: 16,
      OK: 17,
      Back: 18,
      Forward: 19,
      Up: 20,
      Down: 21,
      Erase: 22,
      Calendar: 23,
      Next: 24,
      Prev: 25,
      PageUp: 26,
      PageDown: 27,
      First: 28,
      Last: 29,
      Filter: 30,
      Edit: 31,
      Stop: 32,
      Play: 33,
      Pause: 34,
      New: 35,
      Open: 36,
      Save: 37,
      SaveAll: 38,
      Folder: 39,
      Settings: 40,
      Attachment: 41,
      Shopping: 42,
      Copy: 43,
      Clipboard: 44,
      Paste: 45,
      Cut: 46,
      Print: 47,
      Help: 48,
      Alert: 49,
      Time: 50,
      Lock: 51,
      Unlock: 52,
      Login: 53,
      Link: 54,
      Mail: 55,
      User: 56,
      Users: 57,
      Phone: 58,
      Camera: 59,
      Favorites: 60,
      Chat: 61
    },{
      // automaticaly created from AppIcons
    }
    ],

    AppMenuIcons: [ {
      // automaticaly created from AppIcons
    },{
      // automaticaly created from AppIcons
    }
    ]
  },

  AppIcon: function(icon,theme)
  {
    var ic=this.Images.AppIcons[ngVal(theme,this.Theme)][icon];
    if(typeof ic==='undefined') ic=null;
    return ic;
  },
  AppMenuIcon: function(icon,theme)
  {
    var ic=this.Images.AppMenuIcons[ngVal(theme,this.Theme)][icon];
    if(typeof ic==='undefined') ic=null;
    return ic;
  },
  SetBackgroundColor: function (color)
  {
    color=ngVal(color,this.BackgroundColor);
    if((typeof color==='undefined')||(color==='Auto')) color=(this.Theme ? '#FFFFFF' : '#000000');
    if(color!=='None') {
      this.BackgroundColor=color;
      var aelm=ngApp.TopElm();
      if(aelm) {
        if(color.charAt(0)=='#') aelm.style.backgroundColor = color;
        else aelm.className=aelm.className+' we'+color;
      }
    }
  },

  OnInit: function() {

    var wineight=this;
    var libpath=ngLibPath('ng_wineight');
    var ctrlimages=this.ControlImages;
    var winimages = this.Images;
    var skinfnc={};

    ngApp.AddEvent('OnRunInternalFinished', function() {
      wineight.SetBackgroundColor();
    });

    for (var i in winimages.AppIcons[0])
    {
      var n=winimages.AppIcons[0][i];
      winimages.AppIcons[0][i]={ L: 33, T: n*32, SL: 0, DL: 66, W: 33, H: 32, Src: 3 };
      winimages.AppIcons[1][i]={ L: 0, T: n*32, SL: 33, DL: 66, W: 33, H: 32, Src: 3 };
      winimages.AppMenuIcons[0][i]={ L: 33, T: n*32, oL: 0, DL: 66, W: 33, H: 32, Src: 3 };
      winimages.AppMenuIcons[1][i]={ L: 0, T: n*32, oL: 33, DL: 66, W: 33, H: 32, Src: 3 };
    }

    function colorscheme(def) {
      return ngVal(def.ColorScheme,wineight.ColorScheme);
    }

    function theme(def) {
      return ngVal(def.Theme,wineight.Theme);
    }

    /*
     *  Group: Control Types
     */

    /*  Class: wePanel
     *  Standard panel control (based on <ngPanel>).
     */
    /*<>*/
    ngRegisterControlType('wePanel', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='wePanel';
      return ngCreateControlAsType(def, 'ngPanel', ref, parent);
    });

    /*  Class: weFrame
     *  Standard frame control (based on <ngFrame>).
     */
    /*<>*/
    ngRegisterControlType('weFrame', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='wePanel';
      return ngCreateControlAsType(def, 'ngFrame', ref, parent);
    });

    /*  Class: weColorPanel
     *  Standard panel control (based on <ngPanel>).
     */
    /*<>*/
    ngRegisterControlType('weColorPanel', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='we'+colorscheme(def);
      return ngCreateControlAsType(def, 'ngPanel', ref, parent);
    });
    /*  Class: weColorFrame
     *  Standard Frame control (based on <ngFrame>).
     */
    /*<>*/
    ngRegisterControlType('weColorFrame', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='we'+colorscheme(def);
      return ngCreateControlAsType(def, 'ngFrame', ref, parent);
    });

    /*  Class: weText
     *  Standard text control (based on <ngText>).
     */
    /*<>*/
    ngRegisterControlType('weText', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className=(theme(def) ? 'weTextLight' : 'weTextDark') + (typeof def.ColorScheme !== 'undefined' ? ' we'+def.ColorScheme+'Text' : '');
      return ngCreateControlAsType(def, 'ngText', ref, parent);
    });

    /*  Class: weSmallText
     *  Standard text control (based on <ngText>).
     */
    /*<>*/
    ngRegisterControlType('weSmallText', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className=(theme(def) ? 'weSmallTextLight' : 'weSmallTextDark') + (typeof def.ColorScheme !== 'undefined' ? ' we'+def.ColorScheme+'Text' : '');
      return ngCreateControlAsType(def, 'ngText', ref, parent);
    });

    /*  Class: weCaption
     *  Standard text control (based on <ngText>).
     */
    /*<>*/
    ngRegisterControlType('weCaption', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className=(theme(def) ? 'weCaptionLight' : 'weCaptionDark') +' we'+colorscheme(def)+'Text';
      return ngCreateControlAsType(def, 'ngButton', ref, parent);
    });

    /*  Class: weTitle
     *  Standard text control (based on <ngText>).
     */
    /*<>*/
    ngRegisterControlType('weTitle', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className=(theme(def) ? 'weTitleLight' : 'weTitleDark')+' we'+colorscheme(def)+'Text';
      return ngCreateControlAsType(def, 'ngButton', ref, parent);
    });

    /*  Class: weImage
     *  Standard image control (based on <ngImage>).
     */
    /*<>*/
    ngRegisterControlType('weImage', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='weImage';
      return ngCreateControlAsType(def, 'ngImage', ref, parent);
    });

    skinfnc.Create_weCheckBox=function(def,ref,parent,imgleft,imgright,controltype) {
      if(typeof def.className === 'undefined') def.className=(theme(def) ? 'weCheckBoxLight' : 'weCheckBoxDark') + (typeof def.ColorScheme !== 'undefined' ? ' we'+def.ColorScheme+'Text' : '');

      def.OnCreated=ngAddEvent(def.OnCreated, function (c, ref) {
        if((c.TextAlign=='right')||(c.TextAlign=='center'))
        {
          c.TextAlign='right';
          if(ng_EmptyVar(c.LeftImg)) c.LeftImg=imgleft;
        }
        else
        {
          c.TextAlign='left';
          if(ng_EmptyVar(c.RightImg)) c.RightImg=imgright;
        }
      });
      return ngCreateControlAsType(def, ngVal(controltype,'ngCheckBox'), ref, parent);
    };
    /*  Class: weCheckBox
     *  Standard check box control (based on <ngCheckBox>).
     */
    ngRegisterControlType('weCheckBox', function(def,ref,parent) {
      var th=theme(def);
      return skinfnc.Create_weCheckBox(def,ref,parent,(th ? winimages.CheckBoxLeftLight : winimages.CheckBoxLeftDark),(th ? winimages.CheckBoxRightLight : winimages.CheckBoxRightDark));
    });

    /*  Class: weRadioButton
     *  Standard radio button control (based on <ngRadioButton>).
     */
    ngRegisterControlType('weRadioButton', function(def,ref,parent) {
      var th=theme(def);
      if(typeof def.className === 'undefined') def.className=(th ? 'weRadioLight' : 'weRadioDark');
      return skinfnc.Create_weCheckBox(def,ref,parent,(th ? winimages.RadioLeftLight : winimages.RadioLeftDark),(th ? winimages.RadioRightLight : winimages.RadioRightDark), 'ngRadioButton');
    });

    /*  Class: weToggleSwitch
     *  Standard check box control (based on <ngCheckBox>).
     */
    ngRegisterControlType('weToggleSwitch', function(def,ref,parent) {
      var th=theme(def);
      if(typeof def.className === 'undefined') def.className=(th ? 'weToggleSwitchLight' : 'weToggleSwitchDark')+(!th && typeof def.ColorScheme === 'undefined' ? '' : ' we'+colorscheme(def));
      var img=(th ? winimages.ToggleSwitchLight : winimages.ToggleSwitchDark);
      var c=skinfnc.Create_weCheckBox(def,ref,parent,img,img);
      if(c)
      {
        c.OnGetText=function(c) { return ''; };
        c.AddEvent('DoAcceptGestures',function(o,gestures) {
          gestures.swipeleft=true;
          gestures.swiperight=true;
        });
        c.AddEvent('DoGesture',function(pi) {
          if(pi.Gesture==='swipeleft')  { c.Check(0); delete pi.Gestures.tap; return true; }
          if(pi.Gesture==='swiperight') { c.Check(1); delete pi.Gestures.tap; return true; }
          return false;
        });
      }
      return c;
    });

    /*  Class: weButton
     *  Standard button control (based on <ngButton>).
     */
    /*<>*/
    skinfnc.Create_weButton=function(def,ref,parent)
    {
      var th=theme(def);
      if(typeof def.className === 'undefined')
        def.className=(th ? 'weButtonLight' : 'weButtonDark') + (typeof def.ColorScheme === 'undefined' ? '' : ' we'+def.ColorScheme);

      def.OnCreated=ngAddEvent(def.OnCreated, function (c, ref) {
        if(ngVal(c.Default,false))
        {
          var o=c.Elm();
          if(o)
          {
            var cn=o.className;
            o.className=cn.replace(/Button/,'ButtonDefault');
            c.BaseClassName=c.BaseClassName.replace(/Button/,'ButtonDefault');
          }
        }
      });

      var c=ngCreateControlAsType(def, 'ngButton', ref, parent);
      if(c) {
        if(!th) {
          c.LeftImg=winimages.ButtonDark.LeftImg;
          c.MiddleImg=winimages.ButtonDark.MiddleImg;
          c.RightImg=(typeof def.Menu === 'object' ? winimages.ButtonDark.MenuRightImg : winimages.ButtonDark.RightImg);
        }
        else
        {
          c.MiddleImg=winimages.ButtonLight.MiddleImg;
          if(typeof def.Menu === 'object')
          {
            c.RightImg=winimages.ButtonLight.MenuRightImg;
          }
        }
      }
      return c;
    };


    ngRegisterControlType('weButton', function(def,ref,parent) {
      return skinfnc.Create_weButton(def,ref,parent);
    });

    /*  Class: weAppButton
     *  Standard application button control (based on <ngButton>).
     */
    /*<>*/
    /*
     *  Group: Properties
     */
    /*
     *  Variable: AppIcons
     *  ...
     *  Type: Array
     *  Default value: *undefined*
     */
    skinfnc.Create_weAppButton=function(def,ref,parent)
    {
      var th=theme(def);
      var img=(th ? winimages.AppButtonLight : winimages.AppButtonDark);
      var appimages=winimages.AppIcons[th];
      ng_MergeDef(def, {
        className: (th ? 'weAppButtonLight' : 'weAppButtonDark'),
        W: img.W
      });
      if((typeof def.Menu === 'object')&&(def.Menu))
      {
        ng_MergeDef(def, {
          Data: {
            MenuVAlign: 'bottom',
            MenuHAlign: 'center',
            MenuOverlapY: 10
          },
          Menu: {
          }
        });
      }
      var c=ngCreateControlAsType(def, 'ngButton', ref, parent);
      if(c) {
        c.OnGetImg = function(b, idx) {
          var image;
          switch(idx)
          {
            case 0: image=b.LeftImg; break;
            case 1: image=b.MiddleImg; break;
            case 2: image=b.RightImg; break;
            case -1:
              image=b.Img;
              var images=b.AppImages;
              if(!images) images=appimages;
              if(typeof image === 'string') image=images[image];
              break;
          }
          return image;
        };
        c.MiddleImg=img;
      }
      return c;
    };

    ngRegisterControlType('weAppButton', function(def,ref,parent) { return skinfnc.Create_weAppButton(def,ref,parent); });

    /*  Class: weLabel
     *  Standard label control (based on <ngButton>).
     */
    /*<>*/
    ngRegisterControlType('weLabel', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className=(theme(def) ? 'weLabelLight' : 'weLabelDark') + (typeof def.ColorScheme !== 'undefined' ? ' we'+def.ColorScheme+'Text' : '');
      return ngCreateControlAsType(def, 'ngButton', ref, parent);
    });
    /*  Class: weLink
     *  Standard link control (based on <ngButton>).
     */
    /*<>*/
    ngRegisterControlType('weLink', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className=(theme(def) ? 'weLinkLight' : 'weLinkDark')+' we'+colorscheme(def)+'Text';
      return ngCreateControlAsType(def, 'ngButton', ref, parent);
    });

    /*  Class: weGroup
     *  Standard group control (based on <ngGroup>).
     */
    /*<>*/
    skinfnc.Create_weGroup=function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className=(theme(def) ? 'weGroupBoxLight' : 'weGroupBoxDark')+' we'+colorscheme(def)+'Text';
      var c=ngCreateControlAsType(def, 'ngGroup', ref, parent);
      def.OnCreated=ngAddEvent(def.OnCreated, function (c, ref) {
        if((c)&&(ng_EmptyVar(c.Frame))) c.Frame=(c.Text == '' && (!c.OnGetText) ? winimages.GroupBoxNoText : winimages.GroupBox);
      });
      return c;
    };
    ngRegisterControlType('weGroup', skinfnc.Create_weGroup);
    ngRegisterControlType('weGroupBox', skinfnc.Create_weGroup);

    this.weEdit_AddProperties=function(def,c,th)
    {
      var img=(th ? winimages.EditLight : winimages.EditDark);
      var req=ngVal(c.Invalid,false);

      var leftimg=(req ? img.LeftImgReq : img.LeftImg);
      var rightimg=(req ? img.RightImgReq : img.RightImg);

      c.LeftImg=leftimg;
      c.MiddleImg=(req ? img.MiddleImgReq : img.MiddleImg);
      c.RightImg=rightimg;

      var leftbtn=false;
      var rightbtn=false;

      def.OnCreated=ngAddEvent(def.OnCreated, function (c, ref) {
        if((c.LeftImg===leftimg)||(c.RightImg===rightimg))
        {
          var req=ngVal(c.Invalid,false);

          if(c.Buttons)
          {
            var a,b;
            for(var i=0;(i<c.Buttons.length)&&((!leftbtn)||(!rightbtn));i++)
            {
              b=c.Buttons[i];
              a=ngVal(b.ButtonAlign,'');
              if(a=='left') leftbtn=true;
              else rightbtn=true;
            }
          }

          if((c.LeftImg===leftimg)&&(leftbtn))
            c.LeftImg=(req ? img.LeftImgBtnReq : img.LeftImgBtn);
          if((c.RightImg===rightimg)&&(rightbtn))
            c.RightImg=(req ? img.RightImgBtnReq : img.RightImgBtn);
        }
      });

      c.DoSetInvalid=function(r,update) {
        if(!r)
        {
          if(c.LeftImg) c.LeftImg=(leftbtn ? img.LeftImgBtn : img.LeftImg);
          if(c.MiddleImg) c.MiddleImg=img.MiddleImg;
          if(c.RightImg) c.RightImg=(rightbtn ? img.RightImgBtn : img.RightImg);
        }
        else
        {
          if(c.LeftImg) c.LeftImg=(leftbtn ? img.LeftImgBtnReq : img.LeftImgReq);
          if(c.MiddleImg) c.MiddleImg=img.MiddleImgReq;
          if(c.RightImg) c.RightImg=(rightbtn ? img.RightImgBtnReq : img.RightImgReq);
        }
        if(update) c.DoUpdateImages();
      };
    };

    this.Prepare_DropDown=function(def)
    {
      if((def.DropDown)&&(typeof def.DropDown === 'object'))
      {
        var defdd=def.DropDown;
        if(typeof defdd.Theme === 'undefined') defdd.Theme=WE_LIGHT;
        var dth=theme(defdd);
        if(typeof defdd.className === 'undefined') defdd.className=(dth ? 'weDropDownLight we'+colorscheme(def)+'DropDown' : 'weDropDownDark');
        if(defdd.Type === 'weTreeList')
        {
          if(typeof defdd.OverrideEvents==='undefined') defdd.OverrideEvents={};
          defdd.OverrideEvents.OnGetTreeImg=function(list,item,id) {
            return (typeof list.TreeImg !== 'undefined' ? list.TreeImg : (dth ? winimages.DropDownTreeImgLight : winimages.DropDownTreeImgDark));
          };
        }
      }
    };

    skinfnc.Create_weEdit=function(def,ref,parent) {
      var th=theme(def);
      if(typeof def.className === 'undefined') def.className=(th ? 'weEditLight' : 'weEditDark');
      wineight.Prepare_DropDown(def);
      var c=ngCreateControlAsType(def, 'ngEdit', ref, parent);
      if(c) {
        wineight.weEdit_AddProperties(def,c,th);
      }
      return c;
    };

    /*  Class: weEdit
     *  Standard edit control (based on <ngEdit>).
     */
    /*<>*/
    ngRegisterControlType('weEdit', function(def,ref,parent) { return skinfnc.Create_weEdit(def,ref,parent); });
    ngRegisterControlType('weEditBox', function(def,ref,parent) { return skinfnc.Create_weEdit(def,ref,parent); });

    /*  Class: weEditBoxBtn
     *  Standard edit control with ellipsis button (based on <weEdit>).
     */
    /*<>*/
    skinfnc.Create_weEditBoxBtn=function(def,ref,parent,basetype) {
      var th=theme(def);
      if(typeof def.className === 'undefined') def.className=(th ? 'weEditLight' : 'weEditDark');
      wineight.Prepare_DropDown(def);
      var c=ngCreateControlAsType(def, ngVal(basetype,'weEdit'), ref, parent);
      if(!c) return c;
      var b=new ngButton();
      b.LeftImg=winimages.EditEllipsis;
      b.OnClick = function(ci)
      {
        var e=(ci.Owner ? ngVal(ci.Owner.Parent,null) : null);
        if((e)&&(e.OnEllipsis)) e.OnEllipsis(ci, e.GetText());
      };
      c.Buttons=new Array(b);
      /*
       *  Group: Methods
       */
      /*  Function: Ellipsis
       *  Invokes ellipsis.
       *
       *  Syntax:
       *    void *Ellipsis* ()
       *
       *  Parameters:
       *    -
       *  Returns:
       *    -
       */
      c.Ellipsis=function() {
        b.Click();
      };
      /*
       *  Group: Events
       */
      /*
       *  Event: OnEllipsis
       */
      c.OnEllipsis=null;
      return c;
    };

    ngRegisterControlType('weEditBoxBtn', function(def,ref,parent) { return skinfnc.Create_weEditBoxBtn(def,ref,parent); });

    /*  Class: weSearchBox
     *  Standard search box control (based on <weEdit>).
     */
    /*<>*/
    skinfnc.Create_weSearchBox=function(def,ref,parent,basetype)
    {
      var th=theme(def);
      if(typeof def.className === 'undefined') def.className=(th ? 'weEditLight' : 'weEditDark');
      wineight.Prepare_DropDown(def);
      var c=ngCreateControlAsType(def, ngVal(basetype,'weEdit'), ref, parent);
      if(!c) return c;
      if(typeof def.DropDown !== 'undefined') c.Suggestion=true;

      var b=new ngButton();
      b.LeftImg=winimages.EditSearch;
      b.Default=true;
      b.OnClick = function(ci)
      {
        var e=(ci.Owner ? ngVal(ci.Owner.Parent,null) : null);
        if((e)&&(e.OnSearch)) e.OnSearch(ci, e.GetText());
      };
      c.Buttons=[b];
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
        if(typeof t !== 'undefined') c.SetText(t);
        b.Click();
      };
      /*
       *  Group: Events
       */
      /*
       *  Event: OnSearch
       */
      // c.OnSearch=null;
      return c;
    };
    ngRegisterControlType('weSearchBox', function(def,ref,parent) { return skinfnc.Create_weSearchBox(def,ref,parent); });

    /*  Class: weEditNum
     *  Standard edit number control with spin buttons (based on <ngEditNum>).
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
    skinfnc.Create_weEditNum=function(def,ref,parent,basetype)
    {
      var th=theme(def);
      if(typeof def.className === 'undefined') def.className=(th ? 'weEditLight' : 'weEditDark');
      wineight.Prepare_DropDown(def);
      var c=ngCreateControlAsType(def, ngVal(basetype,'ngEditNum'), ref, parent);
      if(!c) return c;
      wineight.weEdit_AddProperties(def,c,th);
      c.TextAlign='center';
      if(c.ButtonUp)  c.ButtonUp.LeftImg =winimages.EditArrowRight;
      if(c.ButtonDown) {
        c.ButtonDown.LeftImg=winimages.EditArrowLeft;
        c.ButtonDown.ButtonAlign='left';
      }
      return c;
    };
    ngRegisterControlType('weEditNum', function(def,ref,parent) { return skinfnc.Create_weEditNum(def,ref,parent); });
    ngRegisterControlType('weEditBoxNum', function(def,ref,parent) { return skinfnc.Create_weEditNum(def,ref,parent); });

    /*  Class: weColorEdit
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
    skinfnc.Create_weColorEdit=function(def,ref,parent,basetype)
    {
      var th=theme(def);
      ng_MergeDef(def, {
        className: (th ? 'weEditLight' : 'weEditDark'),
        Data: { TextAlign: 'center' },
        DropDown: null//{ className: 'weDropDown', Type: 'wePanel' }
      });
      wineight.Prepare_DropDown(def);
      var c=ngDropDown_Create(def,ref,parent, ngVal(basetype,'ngEdit'));
      if(!c) return c;

      wineight.weEdit_AddProperties(def,c,th);
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
      b.Bounds.W=33;
      b.AutoSize=false;
      b.HTMLEncode=false;
      b.OnGetText = function(e) {
        var c=this.Enabled ? this.Parent.GetColor() : 'D6D6D6';
        return '<div style="margin:2px; line-height: 0px; font-size: 0px; position: absolute;left:0px;top:0px;width:28px; height:28px; background-color: #'+ng_htmlEncode(c)+'"></div>';
      };
      c.OnTextChanged = function(e) {
        e.DropDownButton.Update();
      };
      return c;
    };
    ngRegisterControlType('weColorEdit', function(def,ref,parent) { return skinfnc.Create_weColorEdit(def,ref,parent); });
    ngRegisterControlType('weColorEditBox', function(def,ref,parent) { return skinfnc.Create_weColorEdit(def,ref,parent); });

    if (ngUserControls['maskedit'])
    {
      /*  Class: weMaskEdit
       *  Standard mask edit control (based on <ngMaskEdit>).
       */
      skinfnc.Create_weMaskEdit=function(def, ref, parent)
      {
        if (typeof(def.Data)==='undefined') def.Data = new Object();
        var invalid = ngVal(def.Data.Invalid, false);

        var th  = theme(def);
        var img = (th ? winimages.EditLight : winimages.EditDark);

        delete def.H;
        ng_MergeDef(def, {
          H: img.MiddleImg.H,
          Data: {
            LeftDef: {
              W: img.LeftImg.W,
              Data: {
                LeftImg: (invalid ? img.LeftImgReq : img.LeftImg),
                MiddleImg: (invalid ? img.MiddleImgReq : img.MiddleImg),
                RightImg: null
              }
            },
            EditDef: {
              Type: 'weEdit',
              Data: {
                LeftImg: null,
                MiddleImg: (invalid ? img.MiddleImgReq : img.MiddleImg),
                RightImg: null
              }
            },
            StaticDef: {
              Type: 'weLabel',
              Data: {
                MiddleImg: (invalid ? img.MiddleImgReq : img.MiddleImg)
              }
            },
            RightDef: {
              W: img.RightImg.W,
              Data: {
                LeftImg: null,
                MiddleImg: (invalid ? img.MiddleImgReq : img.MiddleImg),
                RightImg: (invalid ? img.RightImgReq : img.RightImg)
              }
            }
          }
        });

        var c = ngCreateControlAsType(def, 'ngMaskEdit', ref, parent);
        if (!c) return c;

        c.DoSetInvalid = function (ctrl, state, update) {
          if (typeof(ctrl)==='undefined') return false;
          state  = ngVal(state, true);
          update = ngVal(update, true);

          if (!state)
          {
            if (ctrl.LeftImg)   ctrl.LeftImg   = img.LeftImg;
            if (ctrl.MiddleImg) ctrl.MiddleImg = img.MiddleImg;
            if (ctrl.RightImg)  ctrl.RightImg  = img.RightImg;
          } else
          {
            if (ctrl.LeftImg)   ctrl.LeftImg   = img.LeftImgReq;
            if (ctrl.MiddleImg) ctrl.MiddleImg = img.MiddleImgReq;
            if (ctrl.RightImg)  ctrl.RightImg  = img.RightImgReq;
          }

          if (update)
          {
            var focus = (c.HasFocus ? 1 : 0);

            if (ctrl.LeftImg)   ngc_ChangeImage(ngpg_ImgDrawProps(ctrl.ID+'_IL', focus, ctrl.Enabled, ctrl.LeftImg));
            if (ctrl.MiddleImg) ngc_ChangeImageS(ngpg_ImgDrawProps(ctrl.ID+'_IM', focus, ctrl.Enabled, ctrl.MiddleImg));
            if (ctrl.RightImg)  ngc_ChangeImage(ngpg_ImgDrawProps(ctrl.ID+'_IR', focus, ctrl.Enabled, ctrl.RightImg));
          }

          return true;
        };

        return c;
      };
      ngRegisterControlType('weMaskEdit', function(def,ref,parent) { return skinfnc.Create_weMaskEdit(def,ref,parent); });
      ngRegisterControlType('weMaskEditBox', function(def,ref,parent) { return skinfnc.Create_weMaskEdit(def,ref,parent); });
    }

    /*  Class: weDropDown
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
    skinfnc.Create_weDropDown=function(def,ref,parent,basetype,dropdownlist) {
      var th=theme(def);
      if(typeof def.className === 'undefined') def.className=(th ? 'weEditLight' : 'weEditDark');
      var c=ngDropDown_Create(def,ref,parent, ngVal(basetype,'ngDropDown'),dropdownlist);
      if(!c) return c;
      wineight.weEdit_AddProperties(def,c,th);
      c.DropDownButton.LeftImg=winimages.DropDown;
      wineight.Prepare_DropDown(def);
      return c;
    };
    ngRegisterControlType('weDropDown', function(def,ref,parent) { return skinfnc.Create_weDropDown(def,ref,parent,'ngDropDown'); });

    /*  Class: weDropDownList
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
    ngRegisterControlType('weDropDownList', function(def,ref,parent) { return skinfnc.Create_weDropDown(def,ref,parent,'ngDropDownList',true); });

    /*  Class: weMemo
     *  Standard memo control (based on <ngMemo>).
     */
    /*<>*/
    skinfnc.Create_weMemo=function(def,ref,parent,basetype) {
      var th=theme(def);
      if(typeof def.className === 'undefined') def.className=(th ? 'weMemoLight' : 'weMemoDark');
      var c=ngCreateControlAsType(def, ngVal(basetype, 'ngMemo'), ref, parent);
      if(!c) return;

      c.AddEvent('OnFocus', function(c) {
        var o=c.Elm();
        if(o)
        {
          var cn=o.className;
          var idx=cn.indexOf(' ');
          if(idx<0) o.className=cn+' '+cn+'Focus';
        }
        return true;
      });

      c.AddEvent('OnBlur', function(c) {
        var o=(!c.MouseInControl ? c.Elm() : null);
        if(o)
        {
          var cn=o.className;
          var idx=cn.indexOf(' ');
          if(idx>=0) o.className=cn.substring(0,idx);
        }
        return true;
      });

      c.AddEvent('DoMouseLeave', function(e, mi) {

        var o=(!c.ControlHasFocus ? c.Elm() : null);
        if(o)
        {
          var cn=o.className;
          var idx=cn.indexOf(' ');
          if(idx>=0) o.className=cn.substring(0,idx);
        }
        return true;
      });

      var req=ngVal(c.Invalid,false);
      if(th)
        c.Frame=(req ? winimages.MemoReqLight : winimages.MemoLight);
      else
        c.Frame=(req ? winimages.MemoReqDark : winimages.MemoDark);

      c.DoSetInvalid=function(r,update) {
        if(th)
          c.Frame=(r ? winimages.MemoReqLight : winimages.MemoLight);
        else
          c.Frame=(r ? winimages.MemoReqDark : winimages.MemoDark);
        if(update) c.DoUpdateImages();
      };
      return c;
    };
    ngRegisterControlType('weMemo', function(def,ref,parent) { return skinfnc.Create_weMemo(def,ref,parent); });

    skinfnc.Create_wePages=function(def,ref,parent) {
      var th=theme(def);
      if(typeof def.className === 'undefined') def.className=(th ? 'wePagesLight' : 'wePagesDark')+' we'+colorscheme(def)+'Text';
      var c=ngCreateControlAsType(def, 'ngPages', ref, parent);
      if(!c) return null;
      c.PagesIndent=20;
      def.OnCreated=ngAddEvent(def.OnCreated, function (c, ref) {
        if(c.PagesVAlign=='bottom')
        {
          if(ng_EmptyVar(c.Frame))
            c.Frame=ng_CopyVar(th ? winimages.PagesBoxDownLight : winimages.PagesBoxDownDark);
          if(ng_EmptyVar(c.PageImages))
          {
            c.PageImages=th ? winimages.PagesDownLight : winimages.PagesDownDark;
            c.RowOverlap=1;
          }
        }
        else
        {
          if(ng_EmptyVar(c.Frame))
            c.Frame=ng_CopyVar(th ? winimages.PagesBoxUpLight : winimages.PagesBoxUpDark);
          if(ng_EmptyVar(c.PageImages))
          {
            c.PageImages=th ? winimages.PagesUpLight : winimages.PagesUpDark;
            c.RowOverlap=1;
          }
        }
      });
      return c;
    };
    /*  Class: wePages
     *  Standard pages control (based on <ngPages>).
     */
    /*<>*/
    ngRegisterControlType('wePages', function(def,ref,parent) { return skinfnc.Create_wePages(def,ref,parent); });

    /*  Class: weSections
     *  Standard pages control (based on <ngPages>).
     */
    /*<>*/
    ngRegisterControlType('weSections', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className=(theme(def) ? 'weSectionsLight' : 'weSectionsDark')+' we'+colorscheme(def)+'Text';
      var c=ngCreateControlAsType(def, 'ngPages', ref, parent);
      if(c) c.PageImages=winimages.Sections;
      return c;
    });

    /*  Class: weToolBar
     *  Standard toolbar control (based on <ngToolBar>).
     */
    /*<>*/
    ngRegisterControlType('weToolBar', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='weToolBar' + (typeof def.ColorScheme === 'undefined' ? '' : ' we'+def.ColorScheme);
      return ngCreateControlAsType(def, 'ngToolBar', ref, parent);
    });
    /*  Class: weProgressBar
     *  Standard progress bar control (based on <ngProgressBar>).
     */
    /*<>*/
    ngRegisterControlType('weProgressBar', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='weProgressBar';
      var c=ngCreateControlAsType(def, 'ngProgressBar', ref, parent);
      if(!c) return c;
      c.Smooth=true;
      c.MiddleImg=winimages.ProgressBar.MiddleImg;
      c.BarImg=ng_CopyVar(winimages.ProgressBar.BarImg);
      c.BarImg.Attrs='class="we'+(theme(def) ? colorscheme(def) : 'White')+'"';
      return c;
    });

    skinfnc.Create_weProgressImg=function(def,ref,parent,img,h,th) {

      ng_MergeDef(def, {
        className: (th ? 'weLabelLight' : 'weLabelDark'),
        Data: {
          TextAlign: 'center',
          HTMLEncode: false
        }
      });
      var img=ctrlimages[img];
      ng_PreloadImage(img);
      var c=ngCreateControlAsType(def, 'ngButton', ref, parent);
      if(c)
      {
        c.AddEvent(function (b) {
          var txt=ngTxt(b.Text,'');
          if(txt!='') txt='&nbsp;<span style="line-height: '+h+'px">'+txt+'</span>';
          return '<img src="'+img+'" align="top" />'+txt;
        }, 'OnGetText');
      }
      return c;
    };

    /*  Class: weProgressRing
     *  Standard progress dot control (based on <ngText>).
     */
    /*<>*/
    ngRegisterControlType('weProgressRing', function(def,ref,parent) {
      var th=theme(def);
      return skinfnc.Create_weProgressImg(def,ref,parent,(th ? 6 : 7),40,th);
    });
    /*  Class: weProgressDot
     *  Standard progress dot control (based on <ngText>).
     */
    /*<>*/
    ngRegisterControlType('weProgressDot', function(def,ref,parent) {
      var th=theme(def);
      return skinfnc.Create_weProgressImg(def,ref,parent,(th ? 8 : 9),22,th);
    });
    /*  Class: weProgressLine
     *  Standard progress dot control (based on <ngText>).
     */
    /*<>*/
    ngRegisterControlType('weProgressLine', function(def,ref,parent) {
      var th=theme(def);
      return skinfnc.Create_weProgressImg(def,ref,parent,(th ? 4 : 5),40,th);
    });

    /**
     * List Controls
     */
    if(ngUserControls['list'])
    {
      /*  Class: weList
       *  Standard list control (based on <ngList>).
       */
      /*<>*/
      skinfnc.Create_weList=function(def,ref,parent) {
        var th=theme(def);
        if(typeof def.className === 'undefined') def.className=(th ? 'weListBoxLight we'+colorscheme(def)+'ListBox': 'weListBoxDark');
        var c=ngCreateControlAsType(def, 'ngList', ref, parent);
        if(!c) return c;

        c.AddEvent('DoUpdate',function(o) {
          var cn=o.className;
          var ci=cn.indexOf(' ');
          var dc=this.BaseClassName+'Disabled';
          var idx=cn.indexOf(dc);
          if(this.Enabled) {
            if(idx>=0)
            {
              cn=cn.substring(idx+dc.length,cn.length);
              o.className=this.BaseClassName+(cn.length>0 ? ' '+cn : '');
            }
          }
          else {
            if(idx<0) o.className=this.BaseClassName+' '+dc+(ci >= 0 ? cn.substring(ci,cn.length) : '');
          }
          return true;
        });

        var istree=(def.Type === 'weTreeList');

        delete c.CheckImg; // make it undefined
        delete c.TreeImg; // make it undefined

        c.OnGetCheckImg=function(list,item,id) {
          if((typeof item.Checked==='undefined')&&(!list.ShowCheckboxes)) return null;
          if(typeof list.CheckImg !== 'undefined') return list.CheckImg;
          if((!list.RadioAllowUncheck)&&(!ngVal(item.RadioAllowUncheck, false))&&(typeof item.RadioGroup!=='undefined')) return ((th) || (list.Enabled && list.selected[id]) ? winimages.ListRadioLight : winimages.ListRadioDark);
          return((th)||(list.Enabled && list.selected[id]) ? winimages.ListCheckBoxLight : winimages.ListCheckBoxDark);
        };

        if(istree) {
          c.DefaultIndent=27;
          c.OnGetTreeImg=function(list,item,id) {
            return (typeof list.TreeImg !== 'undefined' ? list.TreeImg : (th ? (list.selected[id] ? winimages.TreeImgSelLight : winimages.TreeImgLight) : ( list.selected[id] ? winimages.TreeImgLight : winimages.TreeImgDark)));
          };
        }

        c.AddEvent('OnRedrawSelected', function(list, ielm, selected, id) {

          var item=list.ItemById(id);
          if(!item) return;

          if((!th)&&((typeof item.Checked!=='undefined')||(list.ShowCheckboxes)))
          {
            var img;
            if((!list.RadioAllowUncheck)&&(!ngVal(item.RadioAllowUncheck, false))&&(typeof item.RadioGroup!=='undefined')) img=(list.selected[id] ? winimages.ListRadioLight : winimages.ListRadioDark);
            else img=(list.selected[id] ? winimages.ListCheckBoxLight : winimages.ListCheckBoxDark);
            if(img) ngc_ChangeImage(ngl_CheckImgDrawProps(list.ID+'_'+id+'C', item.Checked, list.Enabled, img));
          }

          if(istree)
          {
            var timg = (th ? (list.selected[id] ? winimages.TreeImgSelLight : winimages.TreeImgLight) : ( list.selected[id] ? winimages.TreeImgLight : winimages.TreeImgDark));
            if(timg)
            {
              var collapsed=false;
              var p=item;
              while((!collapsed)&&(p))
              {
                collapsed=ngVal(p.Collapsed,false);
                p=p.Parent;
              }
              ngc_ChangeImage(ngl_TreeImgDrawProps(list.ID+'_'+id+'T', collapsed, list.Enabled, timg));
            }
          }
        });

        return c;
      };
      ngRegisterControlType('weList', function(def,ref,parent) { return skinfnc.Create_weList(def,ref,parent); });
      ngRegisterControlType('weListBox', function(def,ref,parent) { return skinfnc.Create_weList(def,ref,parent); });
      ngRegisterControlType('weTreeList', function(def,ref,parent) { return skinfnc.Create_weList(def,ref,parent); });


      /*  Class: wePageList
       *  Standard list control (based on <ngPageList>).
       */
      /*<>*/

      this.wePageListPagingControlsDef=function(def, th)
      {
        return {
          FirstPage: {
            Type: 'weButton',
            Theme: th,
            Data: {
              ToolBarHPadding: 5,
              Img: (th ? winimages.PagingFirstLight : winimages.PagingFirstDark),
              Text: ''
            }
          },
          PrevPage: {
            Type: 'weButton',
            Theme: th,
            Data: {
              ToolBarHPadding: 5,
              Img: (th ? winimages.PagingPrevLight : winimages.PagingPrevDark),
              Text: ''
            }
          },
          PageNo: {
            Type: 'weEdit',
            Theme: th,
            W: 64,
            Data: {
              ToolBarHPadding: 5,
              Text: '1',
              TextAlign: 'center'
            }
          },
          Page0: {
            Type: 'weButton',
            Theme: th,
            className: (th ? 'wePageButtonLight' : 'wePageButtonDark') + (typeof def.ColorScheme === 'undefined' ? '' : ' we'+def.ColorScheme),
            Data: {
              ToolBarHPadding: 5,
              //MinWidth: 18,
              Text: '1',
              TextAlign: 'center'
            }
          },
          NextPage: {
            Type: 'weButton',
            Theme: th,
            Data: {
              Img: (th ? winimages.PagingNextLight : winimages.PagingNextDark),
              Text: '',
              ImgAlign: 'right',
              ToolBarHPadding: 5
            }
          },
          LastPage: {
            Type: 'weButton',
            Theme: th,
            Data: {
              Img: (th ? winimages.PagingLastLight : winimages.PagingLastDark),
              ImgAlign: 'right',
              Text: ''
            }
          }
        };
      };

      skinfnc.Create_wePageList=function(def,ref,parent,controltype,listtype)
      {
        var th=theme(def);
        ng_MergeDef(def, {
          className: (th ? 'weListBoxLight' : 'weListBoxDark'),
          Data: {
            AverageItemHeight: 38
          },
          /*
           *  Group: Controls
           */
          Controls: {
            /*  Object: List
             *  <weList>
             */
            List: {
              Type: ngVal(listtype,'weList'),
              Theme: th
            },
            /*  Object: Loading
             *  <weProgressDot>
             */
            Loading: {
              Type: 'weProgressDot',
              Theme: th,
              L: 10, T: ((controltype==='ngDataSet') || (controltype==='ngDBDataSet') || (def.Controls && def.Controls.List && def.Controls.List.Data && def.Controls.List.Data.Columns && def.Controls.List.Data.Columns.length>0) ? 55 : 8),
              Data: {
                Visible: false
              }
            },
            /*  Object: Paging
             *  <ngToolBar>
             */
            Paging: {
              className: (th ? 'wePageListPagingLight' : 'wePageListPagingDark'),
              H: 32,
              /*  Object: FirstPage
               *  <weButton>
               */
              /*  Object: PrevPage
               *  <weButton>
               */
              /*  Object: PageNo
               *  <stdEdit>
               */
              /*
               *  Object: Page0
               *  <weButton>
               */
              /*
               *  Object: NextPage
               *  <weButton>
               */
              /*
               *  Object: LastPage
               *  <weButton>
               */
              Controls: wineight.wePageListPagingControlsDef(def, th)
            }
          }
        });

        return ngCreateControlAsType(def, ngVal(controltype,'ngPageList'), ref, parent);
      };
      ngRegisterControlType('wePageList', function (def,ref,parent) { return skinfnc.Create_wePageList(def,ref,parent,'ngPageList'); });
      ngRegisterControlType('wePageTreeList', function (def,ref,parent) { return skinfnc.Create_wePageList(def,ref,parent,'ngPageList','weTreeList'); });
    }

    /**
     * Panels Controls
     */
    if(ngUserControls['panels'])
    {
      /*  Class: weAlignPanel
       *  Standard panel control (based on <ngAlignPanel (ngAlignFrame)>).
       */
      /*<>*/
      ngRegisterControlType('weAlignPanel', function(def,ref,parent) {
        if(typeof def.className === 'undefined') def.className=(typeof def.ColorScheme === 'undefined' ? 'wePanel' : 'we'+def.ColorScheme);
        return ngCreateControlAsType(def, 'ngAlignPanel', ref, parent);
      });

      /*  Class: weAlignFrame
       *  Standard Frame control (based on <ngAlignPanel (ngAlignFrame)>).
       */
      /*<>*/
      ngRegisterControlType('weAlignFrame', function(def,ref,parent) {
        if(typeof def.className === 'undefined') def.className=(typeof def.ColorScheme === 'undefined' ? 'wePanel' : 'we'+def.ColorScheme);
        return ngCreateControlAsType(def, 'ngAlignFrame', ref, parent);
      });

      /*  Class: weSplitPanel
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
      skinfnc.Create_weSplitPanel=function(def,ref,parent)
      {
        var th=theme(def);
        if(typeof def.className === 'undefined') def.className=(th ? 'weSplitPanelLight' : 'weSplitPanelDark')+' we'+colorscheme(def)+'Split';
        var c=ngCreateControlAsType(def, 'ngSplitPanel', ref, parent);
        if(c)
        {
          var vsplit=(c.PanelAlign=='left')||(c.PanelAlign=='right');
          c.HandleImg=(vsplit ? (th ? winimages.VSplitLight : winimages.VSplitDark) : (th ? winimages.HSplitLight : winimages.HSplitDark));
        }
        return c;
      };

      ngRegisterControlType('weSplitPanel', function(def,ref,parent) { return skinfnc.Create_weSplitPanel(def,ref,parent); });

      /*  Class: weDropPanel
       *  Drop-down panel control (based on <ngDropPanel>).
       */
      /*<>*/
      skinfnc.Create_weDropPanel=function(def,ref,parent)
      {
        if(typeof def.Theme === 'undefined') def.Theme=wineight.InvTheme();
        var th=theme(def);
        if(typeof def.className === 'undefined') def.className=(th ? 'weDropPanelLight' : 'weDropPanelDark') + (typeof def.ColorScheme === 'undefined' ? '' : ' we'+def.ColorScheme);
        var c=ngCreateControlAsType(def, 'ngDropPanel', ref, parent);
        ng_MergeDef(def, {
          H: 72,
          Button: {
            Data: {
              MiddleImg: (th ? winimages.DropPanelButtonMiddleLight : winimages.DropPanelButtonMiddleDark),
              Img: (th ? winimages.DropPanelButtonLight : winimages.DropPanelButtonDark),
              TextAlign: 'right',
              ImgIndent: 20
            }
          }
        });
        if(((typeof def.W==='undefined')&&(typeof def.CW==='undefined'))&&((typeof def.L==='undefined')||(typeof def.R==='undefined')))
        {
          if(typeof def.L==='undefined') def.L=0;
          if(typeof def.R==='undefined') def.R=0;
        }
        return c;
      };

      ngRegisterControlType('weDropPanel', function(def,ref,parent) { return skinfnc.Create_weDropPanel(def,ref,parent); });
    }

    /**
     * Window Controls
     */
    if(ngUserControls['window'])
    {
      /*  Class: weWindow
       *  Standard window control (based on <ngWindow>).
       */
      /*<>*/
      /*  Class: weDialog
       *  Standard dialog control (based on <ngWindow>).
       */
      /*<>*/
      skinfnc.Create_weWindow=function(def,ref,parent) {
        var dialog=(def.Type === 'weDialog');
        var th=theme(def);
        if(typeof def.className === 'undefined') def.className=(dialog ? 'weDialog' : 'weWindow')+(th ? 'Light' : 'Dark') +' we'+colorscheme(def) +' we'+colorscheme(def)+'Text';
        var c=ngCreateControlAsType(def, 'ngWindow', ref, parent);
        if(!c) return c;
        var closebtn=ngVal(def.CloseBtn,(dialog ? true : false));
        c.Frame=(th ? winimages.WindowLight : winimages.WindowDark);
        c.CaptionImg = (th ? winimages.WindowCaptionLight : winimages.WindowCaptionDark);
        c.MinimizedBounds = { H: 42 };
        if(closebtn)
        {
          c.Frame.RightTop=c.Frame.RightTopBtn;
          c.CaptionImg.RightImg=c.CaptionImg.RightImgBtn;
        }
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
        if(closebtn)
        {
          b=new ngButton;
          c.CloseButton=b;
          b.LeftImg=(th ? winimages.WinCloseBtnLight : winimages.WinCloseBtnDark);
          b.OnClick = function(ci)
          {
            var e=(ci.Owner ? ngVal(ci.Owner.Parent,null) : null);
            if((e)&&(e.Close)) e.Close(e);
          };
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
          };
          c.AddEvent(function(o) {
            // update button state before update
            var s=(c.IsMaximized() ? 1 : 0);
            if((c.MaxButton)&&(c.MaxButton.Checked!=s)) c.MaxButton.Check(s);
            return true;
          }, 'DoUpdate');
          b.LeftImg=(th ? winimages.WinMaxBtnLight : winimages.WinMaxBtnDark);
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
          };
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
          b.LeftImg=(th ? winimages.WinMinBtnLight : winimages.WinMinBtnDark);
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
          };
          if(!c.Buttons) c.Buttons=new Array();
          c.Buttons[c.Buttons.length]=b;
        }
        return c;
      };
      ngRegisterControlType('weWindow', function(def,ref,parent) { return skinfnc.Create_weWindow(def,ref,parent); });
      ngRegisterControlType('weDialog', function(def,ref,parent) { return skinfnc.Create_weWindow(def,ref,parent); });

      /*  Class: weHint
       *  Standard hint control (based on <ngHint>).
       */
      /*<>*/
      ngRegisterControlType('weHint', function(def,ref,parent) {
        if(typeof def.className === 'undefined') def.className='weHint';
        var c=ngCreateControlAsType(def, 'ngHint', ref, parent);
        if(c)
        {
          c.Frame=ng_CopyVar(winimages.Hint);
          c.Anchors=ng_CopyVar(winimages.HintAnchors);
        }
        return c;
      });

      /*  Class: weTextHint
       *  Standard hint text control (based on <ngTextHint>).
       */
      /*<>*/
      ngRegisterControlType('weTextHint', function(def,ref,parent) {
        ng_MergeDef(def, {
          className: 'weTextHint',
          /*
           *  Group: Controls
           */
          Controls: {
            /*  Object: Hint
             *  <weText>
             */
            Hint: {
              Type: 'weText',
              L: 5, T: 2,
              Theme: WE_LIGHT
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
      /*  Class: weMessageDlg
       *  Standard message box dialog (based on <ngMessageDlg>).
       */
      /*<>*/
      function wedlgbx_CalcAutoSize()
      {
        if(!ngVal(this.ControlsPanel,false)) return;

        var o=this.Elm();
        if(!o) return;
        var po=o.parentNode;
        var ph=ng_ClientHeightEx(po);

        var cmw=ng_OuterWidth(o)-ng_ClientWidth(this.ControlsPanel.Elm());

        // set to max size (eliminate scrollbars)
        ng_SetClientHeight(o,ph);

        var w=0,h=0,bw=0,minx=0,miny=0;

        // calculate size and position of msg box components
        var msg=ngVal(this.Controls.Message,null);
        var content=ngVal(this.Controls.Content,null);
        var btns=ngVal(this.Controls.Buttons,null);

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
            if(!o) continue;
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
        o=(btns ? btns.Elm() : null);
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

        // add margin
        h+=miny;

        // check minimal dialog size
        if(h<mbMinimalHeight) h=mbMinimalHeight;

        this.SetClientRect({ H: h });

        // check parent size
        if(this.Bounds.H>ph) this.Bounds.H=ph;
        if(this.Bounds.H<this.MinHeight) this.MinHeight=this.Bounds.H;
        this.SetBounds();
        this.Update();
      }

      skinfnc.Create_weMessageDlg=function(def,ref,parent) {
        var th=theme(def);
        var po=parent;
        var pw=ng_ClientWidthEx(po);
        var margin=ngIExplorer6 ? Math.round(pw*.25) : '25%';
        if(pw<600) margin=10;
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
          DialogType: 'weDialog',
          L: 0, W: '100%',
          CloseBtn: false,
          /*
           *  Group: Controls
           */
          Data: {
            Frame: { },
            CaptionImg: { LeftImg: null, MiddleImg: null, RightImg: null },
            CalcAutoSize: wedlgbx_CalcAutoSize,
            CheckBounds: function() { return false; }
          },
          Events: {
            OnGetText: function(c) {
              return '';
            }
          },
          Controls: {
            Title: {
              Type: 'weCaption',
              Theme: th,
              ColorScheme: (th===WE_DARK ? 'White' : undefined),
              L: margin, T: 27,
              Events: {
                OnGetText: function(c) {
                  return c.Owner.Owner.Text;
                }
              }
            },
            /*  Object: Message
             *  <weText>
             */
            Message: {
              Type: 'weText',
              Theme: th,
              L: margin, R: margin, T: 67
  //            style: { border: '1px solid red' }
            },
            /*  Object: Content
             *  <ngPanel>
             */
            Content: {
              Type: 'ngPanel',
              L: margin, R: margin, H: 15
            },
            /*  Object: Buttons
             *  <ngToolBar>
             */
            Buttons: {
              Type: 'ngToolBar',
              L: margin, R: margin, H: 32,
              Data: {
                HAlign: 'right',
                CenterButtons: false,
                Vertical: false,
                HPadding: 10
              },
              Controls: {
                /*  Object: OK
                 *  <weButton>
                 */
                OK: {
                  Type: 'weButton',
                  Theme: th,
                  W: 90
                },
                /*  Object: Yes
                 *  <weButton>
                 */
                Yes: {
                  Type: 'weButton',
                  Theme: th,
                  W: 90
                },
                /*  Object: No
                 *  <weButton>
                 */
                No: {
                  Type: 'weButton',
                  Theme: th,
                  W: 90
                },
                /*  Object: Cancel
                 *  <weButton>
                 */
                Cancel: {
                  Type: 'weButton',
                  Theme: th,
                  W: 90
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
                   *  <weCheckBox> (if DlgCheckBox defined)
                   */
                  CheckBox: {
                    Type: 'weCheckBox',
                    Theme: th,
                    L: 0, B: 10,
                    Data: def.DlgCheckBox
                  }
                }
              }
            }
          });
          def.Controls.Content.H+=21;
        }
        if(def.DialogType==='weMessageDlg')  def.DialogType='weDialog';
        return ngCreateControlAsType(def, 'ngMessageDlg', ref, parent);
      };

      ngRegisterControlType('weMessageDlg', function(def,ref,parent) { return skinfnc.Create_weMessageDlg(def,ref,parent);});

      /*  Class: dlgMessageBox
       *  Message box dialog (based on <weMessageDlg>).
       */
      /*<>*/
      skinfnc.Create_dlgMessageBox=function(def,ref,parent) {
        delete def.DialogType;
        def.DlgButtons=ngVal(def.DlgButtons,mbOK);
        return ngCreateControlAsType(def, 'weMessageDlg', ref, parent);
      };
      ngRegisterControlType('weDlgMessageBox', function(def,ref,parent) { return skinfnc.Create_dlgMessageBox(def,ref,parent);});

      /*  Class: dlgInputBox
       *  Input box dialog (based on <weMessageDlg>).
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
      skinfnc.Create_dlgEditBox=function(def,ref,parent) {

        var th=theme(def);
        delete def.DialogType;
        def.DlgAllowEmpty=ngVal(def.DlgAllowEmpty,false);
        var cdef={
          DialogType: 'weMessageDlg',
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
              H: 68,
              Controls: {
                /*  Object: Edit
                 *  <weEdit>
                 */
                Edit: {
                  Type: 'weEdit',
                  Theme: th,
                  L: 0, T: 6, R: 0,
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
          case 'weDlgMemoBox':
            edit.Type='weMemo';
            edit.H=100;
            cdef.Controls.Content.H=132;
            break;
          case 'weDlgDropDownBox':
          case 'weDlgDropDownListBox':
            edit.Type=(def.Type==='weDlgDropDownBox' ? 'weDropDown' : 'weDropDownList');
            edit.DropDown={ Type: 'weList', Theme: WE_LIGHT, Data: {  } };
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
        var c=ngCreateControlAsType(def, 'weMessageDlg', ref, parent);
        if((c)&&(def.Type!='weDlgDropDownListBox'))
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

      ngRegisterControlType('weDlgInputBox', function(def,ref,parent) { return skinfnc.Create_dlgEditBox(def,ref,parent);});

      /*  Class: dlgDropDownBox
       *  Dropdown dialog (based on <weMessageDlg>).
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
       *  <weDropDown>
       */
      ngRegisterControlType('weDlgDropDownBox', function(def,ref,parent) { return skinfnc.Create_dlgEditBox(def,ref,parent);});
      /*  Class: dlgDropDownListBox
       *  Dropdown list dialog (based on <weMessageDlg>).
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
       *  <weDropDownList>
       */
      ngRegisterControlType('weDlgDropDownListBox', function(def,ref,parent) { return skinfnc.Create_dlgEditBox(def,ref,parent);});

      /*  Class: dlgMemoBox
       *  Input memo dialog (based on <weMessageDlg>).
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
       *  <weMemo>
       */
      ngRegisterControlType('weDlgMemoBox', function(def,ref,parent) { return skinfnc.Create_dlgEditBox(def,ref,parent);});

      /*  Class: dlgListBox
       *  List box dialog (based on <weMessageDlg>).
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
      skinfnc.Create_dlgListBox=function(def,ref,parent) {
        var th=theme(def);
        delete def.DialogType;
        def.DlgAllowEmpty=ngVal(def.DlgAllowEmpty,false);
        var cdef={
          DialogType: 'weMessageDlg',
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
              H: 276,
              Controls: {
                /*  Object: List
                 *  <weList>
                 */
                List: {
                  Type: 'weList',
                  Theme: th,
                  L: 0, T: 6, R: 0, H: 250,
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

        var c=ngCreateControlAsType(def, 'weMessageDlg', ref, parent);
        if(c) {
          c.AddEvent('OnVisibleChanged', function (c) {
            if(c.Visible) c.Controls.List.SetFocus();
          });
        }
        return c;
      };

      ngRegisterControlType('weDlgListBox', function(def,ref,parent) { return skinfnc.Create_dlgListBox(def,ref,parent);});

      /*  Class: dlgProgressBox
       *  Progress box dialog (based on <weMessageDlg>).
       */
      /*<>*/
      skinfnc.Create_dlgProgressBox=function(def,ref,parent) {
        var th=theme(def);
        delete def.DialogType;
        ng_MergeDef(def, {
          DlgButtons: mbNone,
          Data: {
          },
          /*
           *  Group: Controls
           */
          Controls: {
            Title: null,
            Message: {
              Data: {
                MinWidth: 230
              }
            },
            Content: {
              H: 16,
              Controls: {
                /*  Object: Progress
                 *  <weProgressBar>
                 */
                Progress: {
                  Type: 'weProgressBar',
                  Theme: th,
                  L: 0, T: 5, R: 0
                }
              }
            }
          }
        });
        return ngCreateControlAsType(def, 'weMessageDlg', ref, parent);
      };

      ngRegisterControlType('weDlgProgressBox', function(def,ref,parent) { return skinfnc.Create_dlgProgressBox(def,ref,parent);});

      /*  Class: dlgWaitBox
       *  Wait box dialog (based on <weMessageDlg>).
       */
      /*<>*/
      skinfnc.Create_dlgWaitBox=function(def,ref,parent) {
        var th=theme(def);
        delete def.DialogType;
        ng_MergeDef(def, {
          DlgButtons: mbNone,
          Data: {
          },
          /*
           *  Group: Controls
           */
          Controls: {
            Title: null,
            Content: {
              Controls: {
                /*  Object: Progress
                 *  <weProgressLine>
                 */
                Progress: {
                  Type: 'weProgressLine',
                  Theme: th,
                  L: -45, T: 5
                }
              }
            }
          }
        });
        return ngCreateControlAsType(def, 'weMessageDlg', ref, parent);
      };

      ngRegisterControlType('weDlgWaitBox', function(def,ref,parent) { return skinfnc.Create_dlgWaitBox(def,ref,parent);});

      /*  Class: dlgAbout
       *  Application about dialog (based on <ngAboutDlg>).
       */
      /*<>*/
      skinfnc.Create_dlgAbout=function(def,ref,parent) {
        var th=theme(def);
        var po=parent;
        var pw=ng_ClientWidthEx(po);
        var margin=ngIExplorer6 ? Math.round(pw*.25) : '25%';
        if(pw<600) margin=10;
        var cdef={
          DialogType: 'weDlgMessageBox',
          DlgIcon: null,
          /*
           *  Group: Controls
           */
          Controls: {
            Title: null,
            Message: {
              className: (th ? 'weAboutMessageLight' : 'weAboutMessageDark')+(th ? ' we'+colorscheme(def)+'Text' : ''),
              Data: {
                MinWidth: 260
              }
            },
            Content: {
              H: 190,
              Controls: {
                /*  Object: AppInfo
                 *  <weList>
                 */
                AppInfo: {
                  className: (th ? 'weTextListBoxLight' : 'weTextListBoxDark')+' weAboutList',
                  Type: 'weListBox',
                  Theme: th,
                  H: 150,
                  Data: {
                    DefaultIndent: 0
                  },
                  OverrideEvents: {
                    OnGetTreeImg: function(list,item,id) {
                      return((list.selected[id] && !th)||(!list.selected[id] && th)  ? winimages.AboutTreeImgLight : winimages.AboutTreeImgDark);
                    }
                  }
                }
              }
            },
            Buttons: {
              R: margin
            }
          }

        };
        if((typeof def.DlgIcon === 'object')&&(def.DlgIcon))
        {
          cdef.Controls.Message.Data.MinWidth-=(def.DlgIcon.W+10);
        }
        ng_MergeDef(def, cdef, true);
        return ngCreateControlAsType(def, 'ngAboutDlg', ref, parent);
      };

      ngRegisterControlType('weDlgAbout', function(def,ref,parent) { return skinfnc.Create_dlgAbout(def,ref,parent);});
    }
    /**
     * Calendar Controls
     */
    if(ngUserControls['calendar'])
    {
      /*  Class: weCalendar
       *  Standard calendar control (based on <ngCalendar>).
       */
      /*<>*/
      skinfnc.Create_weCalendar=function(def,ref,parent) {
        var th=theme(def);
        if(typeof def.className === 'undefined') def.className=(th ? 'weCalendarLight we'+colorscheme(def)+'Calendar' : 'weCalendarDark');
        var c=ngCreateControlAsType(def, 'ngCalendar', ref, parent);
        if(!c) return c;
        c.PrevMonBtn.Img=(th ? winimages.CalendarMonPrevLight : winimages.CalendarMonPrevDark);
        c.PrevMonBtn.Text='';
        c.NextMonBtn.Img=(th ? winimages.CalendarMonNextLight : winimages.CalendarMonNextDark);
        c.NextMonBtn.Text='';
        c.PrevYearBtn.Img=(th ? winimages.CalendarYearPrevLight : winimages.CalendarYearPrevDark);
        c.PrevYearBtn.Text='';
        c.NextYearBtn.Img=(th ? winimages.CalendarYearNextLight : winimages.CalendarYearNextDark);
        c.NextYearBtn.Text='';
        c.ImgDay = (th ? winimages.CalendarImgDayLight : winimages.CalendarImgDayDark);

        for(var i=0;i<c.FastButtons.length;i++)
        {
          var b=c.FastButtons[i];
          if(!th) {
            b.LeftImg=winimages.ButtonDark.LeftImg;
            b.MiddleImg=winimages.ButtonDark.MiddleImg;
            b.RightImg=winimages.ButtonDark.RightImg;
          }
          else b.MiddleImg=winimages.ButtonLight.MiddleImg;
          b.className='weButton'+(th ? 'Light' : 'Dark')+' weCalBtn';
        }
        return c;
      };

      ngRegisterControlType('weCalendar', function(def,ref,parent) { return skinfnc.Create_weCalendar(def,ref,parent); });

      /*  Class: weEditDate
       *  Standard edit date control (based on <ngEditDate>).
       */
      /*<>*/
      skinfnc.Create_weEditDate=function(def,ref,parent,basetype) {
        var th=theme(def);
        ng_MergeDef(def, {
          className: (th ? 'weEditLight' : 'weEditDark'),
          DropDown: {
            Type: 'weCalendar',
            style: { padding: '10px' }
          }
        });
        wineight.Prepare_DropDown(def);
        var dth=theme(def.DropDown);
        def.DropDown.className=(dth ? 'weCalendarLight we'+colorscheme(def)+'Calendar ' : 'weCalendarDark ')+def.DropDown.className;

        var c=skinfnc.Create_weDropDown(def,ref,parent,ngVal(basetype,'ngEditDate'),false);
        if(!c) return c;
        wineight.weEdit_AddProperties(def,c,th);
        c.DropDownButton.LeftImg=winimages.AppIcons[1]['Calendar'];
        c.DropDownButton.Alt = ngTxt('calendar');
        c.DropDownButton.Default = false;
        return c;
      };

      ngRegisterControlType('weEditDate', function(def,ref,parent) { return skinfnc.Create_weEditDate(def,ref,parent); });

      /*  Class: weEditTime
       *  Standard edit date control (based on <ngEditTime>).
       */
      /*<>*/
      skinfnc.Create_weEditTime=function(def,ref,parent,basetype) {
        var th=theme(def);
        var div=1;
        ng_MergeDef(def, {
          className: (th ? 'weEditLight' : 'weEditDark'),
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
            Type: 'weList'
          }
        });
        wineight.Prepare_DropDown(def);

        div=ngVal(def.DropDown.HourDivider,2);
        if(div<=0) div=1;
        div=60/div;
        var c=ngCreateControlAsType(def, ngVal(basetype,'ngEditTime'), ref, parent);
        if(!c) return c;

        if(def.Type == 'ngDropDownList') c.DropDownType=ngeDropDownList;
        ngDropDown_Add(c);

        wineight.weEdit_AddProperties(def,c,th);
        c.DropDownButton.LeftImg=winimages.DropDown;
        c.DropDownButton.Default = false;
        wineight.Prepare_DropDown(def);
        return c;
      };

      ngRegisterControlType('weEditTime', function(def,ref,parent) { return skinfnc.Create_weEditTime(def,ref,parent); });
    }

    /**
     * Color Controls
     */
    if(ngUserControls['ngColorControls'])
    {

      /**  Class: weColorPickerBox
       *  Standard color picker box control (based on <ngColorPickerBox>).
       */
      this.colorpicker_doUpdateSlider = function(o){
        var cn = o.className;
        var idx = cn.indexOf(' ');
        if(this.Enabled) {
          if(idx >= 0){o.className = cn.substring(0,idx);}
        }
        else {
          if(idx < 0){o.className = cn+' '+cn+'Disabled';}
        }
        return true;
      };

      this.colorpicker_barButtonDef = function(def,th){
        if(!def){def = {};}
        ng_MergeDef(def,{
          L:0, T:0, R:0,
          Type: 'weButton',
          Theme: th,
          Events: {
            OnClick: function(){this.Check(true);return true;}
          }
        });
        return def;
      };

      this.colorpicker_sliderDef = function(def,th){
        if(!def){def = {};}
        ng_MergeDef(def,{
          L:10,T:32,R:10,H:28,
          className: (th) ? 'weColorPickerSliderLight' : 'weColorPickerSliderDark',
          Data: {
            WithEditBounds: { R:92 },
            WithoutEditBounds: { R:10 }
          },
          Events: {
            DoUpdate: wineight.colorpicker_doUpdateSlider
          }
        });
        return def;
      };

      this.colorpicker_editDef = function(def,th){
        if(!def){def = {};}
        ng_MergeDef(def,{
          Type: 'weEdit',
          R:10,W:80,T:32,
          Theme: th
        });
        return def;
      };

      this.colorpicker_labelDef = function(def,th){
        if(!def){def = {};}
        ng_MergeDef(def,{
          Type: 'weLabel',
          L:10,R:10,T:0,
          Theme: th,
          Data: { TextAlign: 'left' }
        });
        return def;
      };

      this.colorpicker_addSliderCursor = function(slider,horizontal,vertical){
        ng_MergeDef(slider,{
          Controls: {
            Cursor: {
              Type: 'ngImage',
              Data: {
                Img: (slider.Data.Vertical)? vertical : horizontal
              }
            }
          }
        });
      };

      ngRegisterControlType('weColorPickerBox', function(def,ref,parent) {
        var th = theme(def);
        var images = (th) ? winimages.ColorPickerLight : winimages.ColorPickerDark;

        ng_MergeDef(def, {
          className: (th) ? 'weColorPickerLight' : 'weColorPickerDark',
          Data: {
            AutoHeight: true,
            AsToolbar: true,
            Vertical: true
          },
          Controls: {
            ModeBar: {
              L:0, R:0, H:42,
              Controls: {
                Bar: {
                  L:10, R:10, T:10, H:32,
                  Controls: {
                    Env_H_SV: {
                      L:0, T:0, W:'33%', B:0,
                      Controls: {
                        H_SV: wineight.colorpicker_barButtonDef({ R:1 },th)
                      }
                    },
                    Env_HSV: {
                      L:'33%', R:'33%', T:0, B:0,
                      Controls: {
                        HSV: wineight.colorpicker_barButtonDef({ L:1, R:1 },th)
                      }
                    },
                    Env_RGB: {
                      R:0,T:0, W:'33%', B:0,
                      Controls: {
                        RGB: wineight.colorpicker_barButtonDef({ L:1 },th)
                      }
                    }
                  }
                }
              },
              Events:{
                OnModeChanged: function(mode){
                  var showLabels = (mode !== 'h_sv');
                  var sliderTop = (mode === 'h_sv') ? 10: 32;
                  var sliderPanelH = (mode === 'h_sv') ? 42: 64;

                  var controls = this.Owner;
                  controls.HueLabel.SetVisible(showLabels);
                  controls.AlphaLabel.SetVisible(showLabels);
                  controls.SatValLabel.SetVisible(showLabels);
                  controls.FromLabel.SetVisible(showLabels);
                  controls.ToLabel.SetVisible(showLabels);
                  controls.Hue.SetBounds({T:sliderTop});
                  controls.Alpha.SetBounds({T:sliderTop});
                  controls.SatVal.SetBounds({T:sliderTop});
                  controls.From.SetBounds({T:sliderTop});
                  controls.To.SetBounds({T:sliderTop});
                  controls.PreviewIcon.SetBounds({T:sliderTop});
                  controls.Hue_Panel.SetBounds({H:sliderPanelH});
                  controls.Alpha_Panel.SetBounds({H:sliderPanelH});
                  controls.Preview_Panel.SetBounds({H:sliderPanelH});
                  controls.Hue_Panel.Update();
                  controls.Alpha_Panel.Update();
                  controls.Preview_Panel.Update();
                }
              }
            },
            Hue_Panel: {
              L:0,R:0,H:64,
              Controls: {
                Hue: wineight.colorpicker_sliderDef({},th),
                HueEdit: wineight.colorpicker_editDef({},th),
                HueLabel: wineight.colorpicker_labelDef({},th)
              }
            },
            Saturation_Panel: {
              L:0,R:0,H:64,
              Controls: {
                Saturation: wineight.colorpicker_sliderDef({},th),
                SaturationEdit: wineight.colorpicker_editDef({},th),
                SaturationLabel: wineight.colorpicker_labelDef({},th)
              }
            },
            Value_Panel: {
              L:0,R:0,H:64,
              Controls: {
                Value: wineight.colorpicker_sliderDef({},th),
                ValueEdit: wineight.colorpicker_editDef({},th),
                ValueLabel: wineight.colorpicker_labelDef({},th)
              }
            },
            Red_Panel: {
              L:0,R:0,H:64,
              Controls: {
                Red: wineight.colorpicker_sliderDef({},th),
                RedEdit: wineight.colorpicker_editDef({},th),
                RedLabel: wineight.colorpicker_labelDef({},th)
              }
            },
            Green_Panel: {
              L:0,R:0,H:64,
              Controls: {
                Green: wineight.colorpicker_sliderDef({},th),
                GreenEdit: wineight.colorpicker_editDef({},th),
                GreenLabel: wineight.colorpicker_labelDef({},th)
              }
            },
            Blue_Panel: {
              L:0,R:0,H:64,
              Controls: {
                Blue: wineight.colorpicker_sliderDef({},th),
                BlueEdit: wineight.colorpicker_editDef({},th),
                BlueLabel: wineight.colorpicker_labelDef({},th)
              }
            },
            Alpha_Panel: {
              L:0,R:0,H:64,
              Controls: {
                Alpha: wineight.colorpicker_sliderDef({
                  Controls: {
                    Plane: {
                      Data: { Img: images.AlphaSliderBackground }
                    }
                  }
                },th),
                AlphaEdit: wineight.colorpicker_editDef({},th),
                AlphaLabel: wineight.colorpicker_labelDef({},th)
              }
            },
            SatVal_Panel: {
              L:0,H:258,R:0,
              Controls: {
                SatVal: {
                  L:10,R:10,T:32,B:0,
                  className: (th) ? 'weColorPickerSatValLight' : 'weColorPickerSatValDark',
                  Controls: {
                    Cursor: {
                      Type: 'ngImage',
                      Data: { Img: images.SatValCursor }
                    }
                  },
                  Events: {
                    DoUpdate: wineight.colorpicker_doUpdateSlider
                  }
                },
                SatValLabel: wineight.colorpicker_labelDef({},th)
              }
            },
            Hex_Panel: {
              L:0,R:0,H:64,
              Controls: {
                AHexEdit: {
                  Type: 'weEdit',
                  L:10,W:120,T:32,
                  Theme: th,
                  Data: { TextAlign: 'left' }
                },
                HexEdit: {
                  Type: 'weEdit',
                  R:10,W:120,T:32,
                  Theme: th,
                  Data: { TextAlign: 'left' }
                },
                HexLabel: {
                  Type: 'weLabel',
                  R:10,W:140,T:0,
                  Theme: th,
                  Data: { TextAlign: 'right' }
                },
                AHexLabel: {
                  Type: 'weLabel',
                  L:10,W:140,T:0,
                  Theme: th,
                  Data: { TextAlign: 'left' }
                }
              }
            },
            Preview_Panel: {
              L:0,R:0,H:64,
              Controls: {
                From: {
                  Type: 'weColorButton',
                  L:10, T:32, W:120,
                  Theme: th
                },
                FromLabel: {
                  Type: 'weLabel',
                  L:10,W:140,T:0,
                  Theme: th,
                  Data: { TextAlign: 'left' }
                },
                To: {
                  Type: 'weColorButton',
                  R:10, T:32, W:120,
                  Theme: th
                },
                ToLabel: {
                  Type: 'weLabel',
                  R:10,W:140,T:0,
                  Theme: th,
                  Data: { TextAlign: 'right' }
                },
                PreviewIcon: {
                  Type: 'ngButton',
                  L:'50%',T:32,
                  style: { marginLeft: '-16px' },
                  Data: { Img: images.PreviewIcon }
                }
              }
            }
          }
        });

        var hs = images.HorizontalSliderCursor;
        var vs = images.VerticalSliderCursor;

        wineight.colorpicker_addSliderCursor(def.Controls.Hue_Panel.Controls.Hue,hs,vs);
        wineight.colorpicker_addSliderCursor(def.Controls.Saturation_Panel.Controls.Saturation,hs,vs);
        wineight.colorpicker_addSliderCursor(def.Controls.Value_Panel.Controls.Value,hs,vs);
        wineight.colorpicker_addSliderCursor(def.Controls.Red_Panel.Controls.Red,hs,vs);
        wineight.colorpicker_addSliderCursor(def.Controls.Green_Panel.Controls.Green,hs,vs);
        wineight.colorpicker_addSliderCursor(def.Controls.Blue_Panel.Controls.Blue,hs,vs);
        wineight.colorpicker_addSliderCursor(def.Controls.Alpha_Panel.Controls.Alpha,hs,vs);

        var c = ngCreateControlAsType(def, 'ngColorPickerBox', ref, parent);
        if(c){
          c.DoAutoHeight = function(height){return height+10;};
        }
        return c;
      });

      /**  Class: weColorButton
       *  Standard color button control (based on <ngColorButton>).
       */
      ngRegisterControlType('weColorButton', function(def,ref,parent) {
        var th = theme(def);
        var images = (th) ? winimages.ColorButtonLight
          : winimages.ColorButtonDark;

        ng_MergeDef(def, {
          Data: {
            BackgroundImg: images.Background,
            LeftImg: images.LeftImg,
            MiddleImg: images.MiddleImg,
            RightImg:images.RightImg
          }
        });

        return ngCreateControlAsType(def, 'ngColorButton', ref, parent);

      });

      /**  Class: weColorPickerDropDown
       *  Standard color picker drop down control (based on <weDropDown>).
       */
      ngRegisterControlType('weColorPickerDropDown', function(def,ref,parent) {
        var th = theme(def);

        ng_MergeDef(def, {
          CreateFrom: 'weDropDown',
          Data: {
            TextAlign: 'center',
            DropDownAlign: 'right'
          },
          DropDown: {
            W:296, H:418,
            Type: 'weColorPickerBox',
            Theme: WE_LIGHT,
            Layout : (def.Data && (def.Data.AllowAlpha === false)) ? ngCopLayout_Default : ngCopLayout_Default | ngColorPickerA,
            Data: {
              MaxHeight: 600
            },
            ModifyControls: {
              ModeBar: {
                Events:{
                  OnModeChanged: function(mode){
                    var edit = this.Owner.Owner.Owner;
                    if(edit.DropDownControl.Visible){
                      edit.DropDown();
                    }
                  }
                }
              },
              SatVal_Panel: {
                H: (def.Data && (def.Data.AllowAlpha === false)) ? 236 : 194
              },
              Buttons: {
                Type: 'ngPanel',
                L:0,R:0,H:42,
                Controls: {
                  Submit: {
                    Type: 'weButton',
                    L:10,T:10, W:133,
                    Theme: WE_LIGHT
                  },
                  Cancel: {
                    Type: 'weButton',
                    R:10,T:10, W:133,
                    Theme: WE_LIGHT
                  }
                }
              }
            }
          },
          Events: {
            OnFocus: function(){
              this.DropDownButton.Check(true);
            },
            OnBlur: function(){
              this.DropDownButton.Check(false);
            },
            OnSetInvalid: function(edit,state){
              var th = this.DropDownButton.Theme;
              var images = (th)
                ? winimages.ColorPickerDropDownLight.DropDownButton
                : winimages.ColorPickerDropDownDark.DropDownButton;
              this.DropDownButton.LeftImg = (state)
                ? images.LeftImgReq : images.LeftImg;
              this.DropDownButton.Update();
              return true;
            },
            OnMouseEnter: function(edit){
              if(this.DropDownButton){
                this.DropDownButton.DoMouseEnter();
              }
            },
            OnMouseLeave: function(edit){
              if(this.DropDownButton){
                this.DropDownButton.DoMouseLeave();
              }
            }
          }
        });

        var c = ngCreateControlAsType(def, 'ngColorPickerDropDown', ref, parent);
        if(!c) return c;

        var images = (th)
          ? winimages.ColorPickerDropDownLight.DropDownButton
          : winimages.ColorPickerDropDownDark.DropDownButton;
        var req = !!c.Invalid;

        c.DropDownButton.BackgroundImg = images.Background;
        c.DropDownButton.LeftImg = (req) ? images.LeftImgReq : images.LeftImg;
        c.DropDownButton.Img = images.Img;
        c.DropDownButton.MiddleImg = null;
        c.DropDownButton.RightImg = null;
        c.DropDownButton.Default = false;
        c.DropDownButton.Theme = th;
        c.DropDownButton.AddEvent('OnUpdate',function(){
          var o=this.Elm();
          if(o) o.style.marginTop = '2px';
          return true;
        });
        return c;
      });

      /**  Class: weColorPickerHint
       *  Standard color picker hint control (based on <weHint>).
       */

      ngRegisterControlType('weColorPickerHint', function(def,ref,parent) {
        var th = theme(def);

        var layout = ngCopLayout_Default | ngColorPickerHex | ngColorPickerAHex;
        if(def.Data && (def.Data.AllowAlpha) !== false){ layout = layout | ngColorPickerA; }


        ng_MergeDef(def, {
          CreateFrom: 'weHint',
          Controls: {
            Picker: {
              Type: 'weColorPickerBox',
              Theme: WE_LIGHT,
              W:296,
              Layout : layout,
              ModifyControls: {
                ModeBar: {
                  Events:{
                    OnModeChanged: function(mode){
                      var picker = this.Owner.Owner;
                      picker.ParentControl.ParentControl.Update(false);
                    }
                  }
                },
                SatVal_Panel: {
                  H: (def.Data && (def.Data.AllowAlpha === false)) ? 236 : 194
                },
                Buttons: {
                  Type: 'ngPanel',
                  L:0,R:0,H:42,
                  Controls: {
                    Submit: {
                      Type: 'weButton',
                      L:10,T:10, W:133,
                      Theme: WE_LIGHT
                    },
                    Cancel: {
                      Type: 'weButton',
                      R:10,T:10, W:133,
                      Theme: WE_LIGHT
                    }
                  }
                }
              }
            }
          }
        });

        return ngCreateControlAsType(def, 'ngColorPickerHint', ref, parent);
      });

      /**  Class: weColorPickerButton
       *  Standard color picker button control (based on <weColorButton>).
       */

      ngRegisterControlType('weColorPickerButton', function(def,ref,parent) {
        var th = theme(def);

        ng_MergeDef(def, {
          CreateFrom: 'weColorButton',
          Data: {
            HintDef: {
              Type: 'weColorPickerHint',
              Theme: th
            }
          }
        });

        return ngCreateControlAsType(def, 'ngColorPickerButton', ref, parent);
      });
    }

    /**
     * Menu Controls
     */
    if(ngUserControls['menu'])
    {
      /*  Class: weMenu
       *  Standard menu control (based on <ngMenu>).
       */
      /*<>*/
      skinfnc.Create_weMenu=function(def,ref,parent) {
        if(typeof def.Theme==='undefined') def.Theme=WE_LIGHT;
        var th=theme(def);
        ng_MergeDef(def, {
          className: (th ? 'weMenuLight we'+colorscheme(def)+'Menu' : 'weMenuDark'),
          Data: {
            SubMenuImg: (th ? winimages.SubMenuLight : winimages.SubMenuDark),
            SubMenuDef: { Type: 'weMenu' }
          }
        });
        var c=ngCreateControlAsType(def, 'ngMenu', ref, parent);
        if(c)
        {
          c.OnGetCheckImg = function(list,item) {
            if((typeof item.Checked==='undefined')||(!list.ShowCheckboxes)) return null;
            //if((!list.RadioAllowUncheck)&&(!ngVal(item.RadioAllowUncheck, false))&&(typeof item.RadioGroup!=='undefined')) return WinXPControls.Images.Radio;
            return (th ? winimages.MenuCheckBoxLight : winimages.MenuCheckBoxDark);
          };
          /*
           *  Group: Properties
           */
          /*
           *  Variable: MenuImages
           *  ...
           *  Type: Array
           *  Default value: *undefined*
           */
          c.OnGetItemImg = function(list, it, id, level) {
            var images=list.MenuImages;
            if(!images) images=winimages.AppMenuIcons[th];
            var image=it.Image;
            if(typeof image === 'string') image=images[image];
            if(typeof image === 'undefined') image=list.ItemImg;
            if(typeof image === 'string') image=images[image];
            return image;
          };
        }
        return c;
      };

      ngRegisterControlType('weMenu', function(def,ref,parent) { return skinfnc.Create_weMenu(def,ref,parent); });

      /*  Class: weMenuBar
       *  Standard menu bar control (based on <ngMenuBar>).
       */
      /*<>*/
      ngRegisterControlType('weMenuBar', function(def,ref,parent) {
        ng_MergeDef(def, {
          className: (theme(def) ? 'weMenuBarLight we'+colorscheme(def)+'MenuBar' : 'weMenuBarDark'+(typeof def.ColorScheme === 'undefined' ? '': ' we'+def.ColorScheme)),
          Data: {
            SubMenuDef: { Type: 'weMenu' }
          }
        });
        return ngCreateControlAsType(def, 'ngMenuBar', ref, parent);
      });

      /*  Class: weMenuBarButton
       *  Standard menu bar button control (based on <ngMenuBarButton>).
       */
      /*<>*/
      ngRegisterControlType('weMenuBarButton', function(def,ref,parent) {
        return ngCreateControlAsType(def, 'ngMenuBarButton', ref, parent);
      });
      /*  Class: weSplitButton
       *  Button with menu control (based on <ngSplitButton>).
       */
      /*<>*/
      skinfnc.Create_weSplitButton=function(def,ref,parent) {
        var th=theme(def);
        if(typeof def.className === 'undefined') def.className=(th ? 'weSplitButtonLight' : 'weSplitButtonDark');
        var c=ngCreateControlAsType(def, 'ngSplitButton', ref, parent);
        if(!c) return c;
        if(!th) {
          c.LeftImg=winimages.ButtonDark.LeftImg;
          c.MiddleImg=winimages.ButtonDark.MiddleImg;
          c.RightImg=winimages.ButtonDark.MenuRightBtnImg;
        }
        else
        {
          c.MiddleImg=winimages.ButtonLight.MiddleImg;
          c.RightImg=winimages.ButtonLight.MenuRightBtnImg;
        }
        return c;
      };

      ngRegisterControlType('weSplitButton', function(def,ref,parent) { return skinfnc.Create_weSplitButton(def,ref,parent); });
    }

    if (ngUserControls['fileuploader'])
    {
      skinfnc.Create_weFileUploader=function(def, ref, parent)
      {
        var th=theme(def);
        ng_MergeDef(def, {
          Base: 'wePanel',
          className: th ? 'weFileUploaderLight' : 'weFileUploaderDark',
          Controls: {
            ListFiles: {
              Type: 'weList',
              Theme: WE_LIGHT,
              Data: {
                Frame: th ? winimages.FileUploaderFilesLight : null
              }
            },
            DragAndDropPanel: {
              Events: {
                OnFilesDragOver: function(c,elm) {
                  ngfup_AddDragBox(c.Owner.Owner,2);
                },
                OnFilesDragLeave: function(c,elm) {
                  ngfup_RemoveDragBox(c.Owner.Owner);
                }
              },
              Controls: {
                DragAndDropInfo: {
                  Type: 'weSmallText',
                  Theme: WE_LIGHT,
                  style: {
                    marginTop: '-6px'
                  }
                }
              }
            },
            Buttons: {
              Data: {
                HPadding: 20,
                VPadding: 20
              },
              Controls: {
                BtnAddFile: {
                  Type: 'weButton',
                  Theme: th
                },
                BtnRemoveFiles: {
                  Type: 'weButton',
                  Theme: th
                }
              }
            }
          },
          Events: {
            OnError: function (o, error, data) {
              error = ng_htmlEncode(error);
              error = error.replace(/\n/g, "<br/>");

              ngMessageDlg('weDlgMessageBox', error);
            },
            OnUploadProgress: function(c,p) {
              if(c.curDialog) {
                var progress=c.curDialog.Controls.Progress;
                if(progress) {
                  if(typeof p==='undefined') {
                    if(!progress.process_cnt) progress.BeginProcess();
                  }
                  else {
                    while(progress.process_cnt) progress.EndProcess();
                    progress.SetPosition(p);
                  }
                }
              }
            },
            OnShowWaiting: function (o) {
              if (typeof(o)==='undefined') return;

              o.curDialog = ngMessageDlg('weDlgProgressBox', 'ngfup_Uploading');
              if ((o.curDialog)&&(o.curDialog.Controls.Progress)) o.curDialog.Controls.Progress.BeginProcess();
            },
            OnHideWaiting: function (o) {
              if (o) {
                if (o.curDialog) o.curDialog.Close();
                delete o.curDialog;
              }
            }
          }
        });
        if(def.ListFiles === false) {
          if((typeof def.H === 'undefined')&&((typeof def.T === 'undefined')||(typeof def.B === 'undefined'))) def.H=32;
        }
        if(def.Controls.Buttons){
          def.OnCreated=ngAddEvent(def.OnCreated, function (c, ref) {
            var bo=c.Controls.Buttons.Elm();
            if(bo) {
              if(c.ButtonsAlign==='top') bo.style.marginBottom='20px';
              else                       bo.style.marginTop='20px';
            }
          });
        }

        return ngCreateControlAsType(def, 'ngFileUploader', ref, parent);
      };
      ngRegisterControlType('weFileUploader', function(def,ref,parent) { return skinfnc.Create_weFileUploader(def,ref,parent); });
    }

    /**
     * ViewModel Controls
     */
    if(ngUserControls['viewmodel_controls'])
    {
      /*  Class: weViewModelForm
       *  View model form control (based on <ngViewModelForm>).
       */
      /*<>*/
      skinfnc.Create_weViewModelForm=function(def,ref,parent, base_type)
      {
        if(typeof def.className === 'undefined') def.className=(typeof def.ColorScheme === 'undefined' ? 'wePanel' : 'we'+def.ColorScheme);
        ng_MergeDef(def, {
          ErrorHint: {
            Type: 'weTextHint'
          }
        });
        var c=ngCreateControlAsType(def, ngVal(base_type,'ngViewModelForm'), ref, parent);
        if(c)
        {
          c.AddEvent('OnShowErrorMsg', function(form,msg) {
            if(typeof ngMessageDlg==='function') {
              ngMessageDlg('weDlgMessageBox',msg,(typeof form.Caption === 'undefined' ? ngTxt('ngAppName') : ngTxt(form.Caption, form.Caption)), null /*, { DlgIcon: mbIconError }*/);
            }
            else alert(ng_htmlDecode(msg));
            return true;
          });
        }
        return c;
      };

      ngRegisterControlType('weViewModelForm', function(def,ref,parent) { return skinfnc.Create_weViewModelForm(def,ref,parent); } );

      /*  Class: weEditField
       *  Standard drop down control (based on <ngEditField>).
       */
      /*<>*/

      skinfnc.Create_weEditFieldDef=function(def)
      {
        ng_MergeDef(def,{
          Data: {
            HintX: 19, HintY: 27
          },
          ErrorHint: {
            Type: 'weTextHint'
          }
        });
      };

      skinfnc.Create_weEditField=function(def,ref,parent) {
        var th=theme(def);
        skinfnc.Create_weEditFieldDef(def);
        if(typeof def.className === 'undefined') def.className=(th ? 'weEditLight' : 'weEditDark');
        wineight.Prepare_DropDown(def);
        var c=ngCreateControlAsType(def, 'ngEditField', ref, parent);
        if(c) {
          wineight.weEdit_AddProperties(def,c,th);
        }
        return c;
      };
      ngRegisterControlType('weEditField', function(def,ref,parent) { return skinfnc.Create_weEditField(def,ref,parent); });

      /*  Class: weSearchBoxField
       *  Standard search box field control (based on <weSearchBox>).
       */
      /*<>*/
      ngRegisterControlType('weSearchBoxField', function(def,ref,parent) { return skinfnc.Create_weSearchBox(def,ref,parent,'weEditField'); });

      /*  Class: weEditBoxBtnField
       *  Standard edit field control with elipsis button (based on <weEditBoxBtn>).
       */
      /*<>*/
      ngRegisterControlType('weEditBoxBtnField', function(def,ref,parent) { return skinfnc.Create_weEditBoxBtn(def,ref,parent,'weEditField'); });

      /*  Class: weEditNumField
       *  Standard drop down field control (based on <ngEditNumField>).
       */
      /*<>*/
      ngRegisterControlType('weEditNumField', function(def,ref,parent) {
        skinfnc.Create_weEditFieldDef(def);
        return skinfnc.Create_weEditNum(def,ref,parent,'ngEditNumField');
      });

      /*  Class: weColorEditField
       *  Standard color edit field control (based on <weColorEdit>).
       */
      ngRegisterControlType('weColorEditField', function(def,ref,parent) {
        skinfnc.Create_weEditFieldDef(def);
        return skinfnc.Create_weColorEdit(def,ref,parent,'ngDropDownField');
      });

      /*  Class: weDropDownField
       *  Standard drop down field control (based on <ngDropDownField>).
       */
      ngRegisterControlType('weDropDownField', function(def,ref,parent) {
        skinfnc.Create_weEditFieldDef(def);
        return skinfnc.Create_weDropDown(def,ref,parent,'ngDropDownField',false);
      });

      /*  Class: weDropDownListField
       *  Standard drop down list field control (based on <ngDropDownListField>).
       */
      ngRegisterControlType('weDropDownListField', function(def,ref,parent) {
        skinfnc.Create_weEditFieldDef(def);
        return skinfnc.Create_weDropDown(def,ref,parent,'ngDropDownListField',true);
      });

      if(ngUserControls['calendar'])
      {
        /*  Class: weEditDateField
         *  Standard edit date field control (based on <ngEditDate>).
         */
        /*<>*/
        ngRegisterControlType('weEditDateField', function(def,ref,parent) {
          skinfnc.Create_weEditFieldDef(def);
          return skinfnc.Create_weEditDate(def,ref,parent,'ngEditDateField');
        });

        /*  Class: weEditTimeField
         *  Standard edit date field control (based on <ngEditTime>).
         */
        /*<>*/
        ngRegisterControlType('weEditTimeField', function(def,ref,parent) {
          skinfnc.Create_weEditFieldDef(def);
          return skinfnc.Create_weEditTime(def,ref,parent,'ngEditTimeField');
        });
      }

      /*  Class: weMemoField
       *  Standard memo field control (based on <ngMemoField>).
       */
      /*<>*/
      ngRegisterControlType('weMemoField', function(def,ref,parent) {
        skinfnc.Create_weEditFieldDef(def);
        return skinfnc.Create_weMemo(def,ref,parent,'ngMemoField');
      });
    }
    /**
     * DB ViewModel Controls
     */
    if(ngUserControls['dbviewmodel'])
    {
      /*  Class: weDBViewModelForm
       *  View model form control (based on <ngDBViewModelForm>).
       */
      /*<>*/
      ngRegisterControlType('weDBViewModelForm',  function(def,ref,parent) {
        var c=skinfnc.Create_weViewModelForm(def,ref,parent,'ngDBViewModelForm');
        if(c)
        {
          c.AddEvent('OnDeleteQuery',function(form,querytxt,successfnc,failfnc) {
            if(typeof ngMessageDlg==='function') {
              ngMessageDlg('weDlgMessageBox',querytxt,(typeof form.Caption === 'undefined' ? ngTxt('ngAppName') : ngTxt(form.Caption, form.Caption)), function(c) {
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
              }, { /*DlgIcon: mbIconQuestion,*/ DlgButtons: mbYes | mbNo | mbDefButton2 }, {Theme:WE_LIGHT});
              return false;
            }
            else
            {
              if(confirm(ng_htmlDecode(querytxt)))
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
              ngMessageDlg('weDlgMessageBox',querytxt,(typeof form.Caption === 'undefined' ? ngTxt('ngAppName') : ngTxt(form.Caption, form.Caption)), function(c) {
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
              }, { /*DlgIcon: mbIconWarning,*/ DlgButtons: mbYes | mbNo | mbDefButton2 }, {Theme:WE_LIGHT});
              return false;
            }
            else
            {
              if(confirm(ng_htmlDecode(querytxt)))
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
      /*  Class: weDBToolBar
       *  Standard ViewModel database toolbar control (based on <ngDBToolBar>).
       */
      skinfnc.Create_weDBToolBar=function(def,ref,parent) {
        var th=theme(def);
        if(typeof def.className === 'undefined') def.className='weToolBar' + (typeof def.ColorScheme === 'undefined' ? '' : ' we'+def.ColorScheme);
        ng_MergeDef(def, {
          W: 260,
          Data: {
            HPadding: 10
          },
          Controls: {
            New: {
              Type: 'weButton',
              Theme: th
            },
            Delete: {
              Type: 'weButton',
              Theme: th,
              Data: {
                ToolBarHPadding: 20
              }
            },
            Insert: {
              Type: 'weButton',
              Theme: th
            },
            Update: {
              Type: 'weButton',
              Theme: th
            },
            Cancel: {
              Type: 'weButton',
              Theme: th
            }
          }
        });
        return ngCreateControlAsType(def, 'ngDBToolBar', ref, parent);
      };

      ngRegisterControlType('weDBToolBar', function(def,ref,parent) { return skinfnc.Create_weDBToolBar(def,ref,parent); });

      /*  Class: weDataSet
       *  Standard dataset control (based on <ngDataSet>).
       */
      /*<>*/
      ngRegisterControlType('weDataSet', function (def,ref,parent) { return skinfnc.Create_wePageList(def,ref,parent,'ngDataSet'); });

      /*  Class: weDBDataSet
       *  Standard dataset control (based on <ngDBDataSet>).
       */
      /*<>*/
      skinfnc.Create_weDBDataSet=function(def,ref,parent) {
        var th=theme(def);
        ng_MergeDef(def, {
          Controls: {
            Paging: {
              Controls: {
                NewRecord: {
                  Type: 'weButton',
                  Theme: th,
                  Data: {
                    ToolBarHPadding: 10
                  }
                },
                LoadRecord: {
                  Type: 'weButton',
                  Theme: th,
                  Data: {
                    ToolBarHPadding: 10
                  }
                },
                DeleteRecord: {
                  Type: 'weButton',
                  Theme: th,
                  Data: {
                    ToolBarHPadding: 20
                  }
                },
                Refresh: {
                  Type: 'weButton',
                  Theme: th,
                  Data: {
                    ToolBarHPadding: 20
                  }
                }
              }
            }
          }
        });
        return skinfnc.Create_wePageList(def,ref,parent,'ngDBDataSet');
      };

      ngRegisterControlType('weDBDataSet', function (def,ref,parent) { return skinfnc.Create_weDBDataSet(def,ref,parent); });
    }
  }
};

ngUserControls['wineight'] = WinEightControls;
