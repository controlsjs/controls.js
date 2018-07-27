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

/**
 *  Variable: WireframeControls
 *  Reference to "Wireframe" skin control definitions.
 */
var WireframeControls = {
  Lib: 'ng_wireframe',
  ControlsGroup: 'Wireframe Skin',

  ControlImages: [
    'images/wireframe_base.png?5',
    'images/wireframe_h.png?5',
    'images/wireframe_v.png?5',
    'images/wireframe_dot.gif?3'
  ],
  Images: {
    CheckBox: { L: 1, T: 30, oL: 21, SL: 41, oSL: 61, GL: 81, oGL: 101, DL: 121, DSL: 141, W: 16, H: 20, DGL: 161 },
    CheckBoxLeft: { L: 1, T: 30, oL: 21, SL: 41, oSL: 61, GL: 81, oGL: 101, DL: 121, DSL: 141, W: 20, H: 20, DGL: 161 },
    CheckBoxRight: { L: -3, T: 30, oL: 17, SL: 37, oSL: 57, GL: 77, oGL: 97, DL: 117, DSL: 137, W: 20, H: 20, DGL: 157 },

    Radio: { L: 181, T: 30, oL: 201, SL: 221, oSL: 241, DL: 261, DSL: 281, W: 16, H: 20 },
    RadioLeft: { L: 181, T: 30, oL: 201, SL: 221, oSL: 241, DL: 261, DSL: 281, W: 20, H: 20 },
    RadioRight: { L: 177, T: 30, oL: 197, SL: 217, oSL: 237, DL: 257, DSL: 277, W: 20, H: 20 },

    Button: {
      LeftImg: { L: 1, T: 1, oL: 15, W: 6, H: 27, SL: 29, DL: 57, oSL: 43 },
      MiddleImg: { L: 0, T: 0, ST: 56, oT: 28, DT: 112, oST: 84, H: 27, Src: 1 },
      RightImg: { L: 8, T: 1, oL: 22, W: 6, H: 27, SL: 36, DL: 64, oSL: 50 }
    },

    DefButton: {
      LeftImg: { L: 71, T: 1, oL: 15, SL: 29, DL: 57, W: 6, H: 27, oSL: 43 },
      MiddleImg: { L: 0, T: 140, oT: 28, ST: 56, DT: 112, oST: 84, H: 27, Src: 1 },
      RightImg: { L: 78, T: 1, oL: 22, SL: 36, DL: 64, W: 6, H: 27, oSL: 50 }
    },

    Edit: {
      LeftImg: { L: 85, T: 1, W: 5, H: 27, oL: 97, SL: 85, oSL: 85, DL: 109, oDL: 109 },
      MiddleImg: { L: 50, T: 168, H: 27, oT: 196, ST: 168, oST: 168, DT: 224, oDT: 224, Src: 1 },
      RightImg: { L: 91, T: 1, W: 5, H: 27, oL: 103, SL: 91, oSL: 91, DL: 115, oDL: 115 },

      LeftImgReq: { L: 121, T: 1, W: 5, H: 27, DL: 109 },
      MiddleImgReq: { L: 50, T: 252, H: 27, oT: 252, DT: 224, oDT: 224, Src: 1 },
      RightImgReq: { L: 127, T: 1, W: 5, H: 27, DL: 115 },

      ArrowLeft: { L: 140, T: 133, W: 12, H: 26, oL: 160, DL: 180 },
      ArrowRight: { L: 139, T: 113, W: 12, H: 26, oL: 159, DL: 179 },
      ArrowUp: { L: 139, T: 94, W: 14, H: 26, oL: 159, DL: 179 },
      ArrowDown: { L: 140, T: 76, W: 14, H: 26, oL: 160, DL: 180 }
    },

    ElipsisButton: { L: 457, T: 1, oL: 485, DL: 513, W: 27, H: 27 },
    SearchButton: { L: 217, T: 1, oL: 245, DL: 273, W: 27, H: 27 },

    Calendar: {
      EditButton: {L: 301, T: 1, oL: 329, DL: 357, W: 27, H: 27 },

      ArrowLeft: { L: 138, T: 137, W: 16, H: 21, oL: 158, DL: 178 },
      ArrowRight: { L: 138, T: 117, W: 16, H: 21, oL: 158, DL: 178 },

      Header: { T: 280, DT: 333, Src: 1 },
      Footer: { T: 325, DT: 378, H: 32, Src: 1 },
      WeekDays: { T: 300, DT: 353, H: 22, Src: 1 },

      ImgDay: { L: -22, T: 53, oL: 276, DL: -22, W: 22, H: 22, SL: 298, oSL: 298 },
      ImgNow: { L: 342, T: 53, DL: 320, W: 22, H: 22, SL: 298, oSL: 298},

      FastButton: {
        LeftImg: { L: 1, T: 1, oL: 15, W: 6, H: 27, SL: 29, DL: 57, oSL: 43 },
        MiddleImg: { L: 0, T: 0, ST: 56, oT: 28, DT: 112, oST: 84, H: 27, Src: 1 },
        RightImg: { L: 8, T: 1, oL: 22, W: 6, H: 27, SL: 36, DL: 64, oSL: 50 }
      },
      Frame: {
        LeftTop: { L: 10, T: 110, W: 2, H: 3, DL: 28 },
        Top: { L: 0, T: 320, H: 2, DT: 373, Src: 1 },
        RightTop: { L: 7, T: 110, W: 2, H: 3, DL: 24 },
        Left: { L: 1, T: 0, W: 2, DL: 9, Src: 2 },
        Right: { L: 6, T: 0, W: 2, DL: 14, Src: 2 },
        LeftBottom: { L: 10, T: 115, W: 2, H: 2, DL: 28 },
        Bottom: { L: 0, T: 325, H: 2, DT: 378, Src: 1 },
        RightBottom: { L: 7, T: 115, W: 2, H: 2, DL: 24 }
      }
    },

    Time: {
      EditButton: {L: 541, T: 1, oL: 569, DL: 597, W: 27, H: 27 }
    },

    ColorPreview: { L: 385, T: 1, DL: 421, W: 35, H: 27},

    DropDown: { L: 133, T: 1, oL: 161, DL: 189, W: 27, H: 27 },
    DropDownBox: {
      LeftTop: { L: 10, T: 110, W: 2, H: 2, DL: 28 },
      Top: { L: 0, T: 320, H: 2, DT: 373, Src: 1 },
      RightTop: { L: 7, T: 110, W: 2, H: 2, DL: 25 },
      Left: { L: 1, T: 0, W: 2, DL: 9, Src: 2 },
      Right: { L: 6, T: 0, W: 2, DL: 14, Src: 2 },
      LeftBottom: { L: 10, T: 115, W: 2, H: 2, DL: 28 },
      Bottom: { L: 0, T: 325, H: 2, DT: 378, Src: 1 },
      RightBottom: { L: 7, T: 115, W: 2, H: 2, DL: 25 }
    },

    List:{
      Box: {
        LeftTop: { L: 10, T: 110, W: 2, H: 3, DL: 28 },
        Top: { L: 0, T: 320, H: 2, DT: 373, Src: 1 },
        RightTop: { L: 7, T: 110, W: 2, H: 3, DL: 24 },
        Left: { L: 1, T: 0, W: 2, DL: 9, Src: 2 },
        Right: { L: 6, T: 0, W: 2, DL: 14, Src: 2 },
        LeftBottom: { L: 10, T: 115, W: 2, H: 2, DL: 28 },
        Bottom: { L: 0, T: 325, H: 2, DT: 378, Src: 1 },
        RightBottom: { L: 7, T: 115, W: 2, H: 2, DL: 24 }
      },
      BoxCaption: { L: 0, T: 294, H: 28, DT: 347, Src: 1 },
      TreeImgTriangle: { L: 138, T: 78, W: 16, H: 20, DL: 178, DSL: 178, ST: 116, DST: 116 }
    },

    Group: {
      Box: {
        LeftTop: { L: 10, T: 102, W: 3, H: 11, DL: 28 },
        Top: { L: 0, T: 312, H: 11, DT: 365, Src: 1 },
        RightTop: { L: 6, T: 102, W: 3, H: 11, DL: 24 },
        Left: { L: 1, T: 0, W: 3, DL: 9, Src: 2 },
        Right: { L: 5, T: 0, W: 3, DL: 13, Src: 2 },
        LeftBottom: { L: 10, T: 114, W: 3, H: 3, DL: 28 },
        Bottom: { L: 0, T: 324, H: 3, DT: 377, Src: 1 },
        RightBottom: { L: 6, T: 114, W: 3, H: 3, DL: 24 }
      },

      BoxNoText: {
        LeftTop: { L: 10, T: 110, W: 3, H: 3, DL: 28 },
        Top: { L: 0, T: 320, H: 3, DT: 373, Src: 1 },
        RightTop: { L: 6, T: 110, W: 3, H: 3, DL: 24 },
        Left: { L: 1, T: 0, W: 3, DL: 9, Src: 2 },
        Right: { L: 5, T: 0, W: 3, DL: 13, Src: 2 },
        LeftBottom: { L: 10, T: 114, W: 3, H: 3, DL: 28 },
        Bottom: { L: 0, T: 324, H: 3, DT: 377, Src: 1 },
        RightBottom: { L: 5, T: 114, W: 3, H: 3, DL: 24 }
      }
    },

    Pages: {
      BoxUp: {
        LeftTop: { L: 10, T: 76, W: 2, H: 36, DL: 28 },
        LeftTop2: { L: 10, T: 76, W: 2, H: 36, DL: 28 },
        Top: { L: 0, T: 286, H: 36, DT: 339, Src: 1 },
        RightTop: { L: 7, T: 76, W: 2, H: 36, DL: 24 },
        RightTop2: { L: 7, T: 76, W: 2, H: 36, DL: 24 },
        Left: { L: 1, T: 0, W: 2, DL: 9, Src: 2 },
        Right: { L: 6, T: 0, W: 2, DL: 13, Src: 2 },
        LeftBottom: { L: 10, T: 115, W: 2, H: 2, DL: 28 },
        Bottom: { L: 0, T: 325, H: 2, DT: 377, Src: 1 },
        RightBottom: { L: 7, T: 115, W: 2, H: 2, DL: 24 }
      },

      BoxDown: {
        LeftTop: { L: 10, T: 110, W: 2, H: 2, DL: 28 },
        Top: { L: 0, T: 320, H: 2, DT: 365, Src: 1 },
        RightTop: { L: 7, T: 110, W: 2, H: 2, DL: 24 },
        Left: { L: 1, T: 0, W: 2, DL: 9, Src: 2 },
        Right: { L: 6, T: 0, W: 2, DL: 13, Src: 2 },
        LeftBottom: { L: 10, T: 115, W: 2, H: 36, DL: 28 },
        LeftBottom2: { L: 10, T: 115, W: 2, H: 36, DL: 28 },
        Bottom: { L: 0, T: 325, H: 36, DT: 377, Src: 1 },
        RightBottom: { L: 7, T: 115, W: 2, H: 36, DL: 24 },
        RightBottom2: { L: 7, T: 115, W: 2, H: 36, DL: 24 }
      },

      PagesUp: new Array(
        {
          LeftImg: { L: 37, T: 76, W: 8, H: 39, SL: 57, oL: 117, oSL: 57, DL: 77, DSL: 97 },
          MiddleImg: { L: 0, T: 420, H: 39, oT: 494, DT: 568, ST: 644, oST: 644, DST: 724, Src: 1 },
          RightImg: { L: 46, T: 76, W: 10, H: 39, SL: 66, oL: 126, oSL: 66, DL: 86, DSL: 106 },
          Separator: { L: -100, T: -100, W: 4, H: 39 }
        }
      ),
      PagesDown: new Array(
        {
          LeftImg:   { L: 37, T: 116, W: 8, H: 39, SL: 57, oL: 117, oSL: 57, DL: 77, DSL: 97 },
          MiddleImg: { L: 0, T: 454, H: 39, oT: 528, DT: 605, ST: 684, oST: 684, DST: 764, Src: 1 },
          RightImg:  { L: 46, T: 116, W: 10, H: 39, SL: 66, oL: 126, oSL: 66, DL: 86, DSL: 106 },
          Separator: { L: -100, T: -100, W: 4, H: 39 }
        }
      )
    },

    PagingFirst: { L: 1, T: 53, oL: 93, DL: 185, W: 22, H: 22 },
    PagingPrev: { L: 24, T: 53, oL: 116, DL: 208, W: 22, H: 22 },
    PagingNext: { L: 47, T: 53, oL: 139, DL: 231, W: 22, H: 22 },
    PagingLast: { L: 70, T: 53, oL: 162, DL: 254, W: 22, H: 22 },
    PagingPage: { L: -22, T: 53, oL: 276, DL: 320, W: 22, H: 22, SL: 298, oSL: 298 },

    Window: {
      Frame: {
        LeftTop:     { L: 201, T: 85, W: 8, H: 28, DL: 219 },
        Top:         { L: 0, T: 814, H: 8, DT: 835, Src: 1 },
        RightTop:    { L: 210, T: 85, W: 8, H: 28, DL: 228 },
        Left:        { L: 17, T: 0, W: 8, DL: 29, Src: 2 },
        Right:       { L: 20, T: 0, W: 8, DL: 32, Src: 2 },
        LeftBottom:  { L: 201, T: 114, W: 8, H: 8, DL: 219 },
        Bottom:      { L: 0, T: 817, H: 8, DT: 838, Src: 1 },
        RightBottom: { L: 210, T: 114, W: 8, H: 8, DL: 228 }
      },
      Caption: {
        LeftImg:   { L: -100, T: -100, W: 8, H: 28, DL: 218 },
        MiddleImg: { L: 0, T: 857, H: 31, DT: 889, Src: 1 },
        RightImg:  { L: -100, T: -100, W: 8, H: 28, DL: 227 }
      },
      Buttons: {
        Close:    { L: 364, T: 53, oL: 387, W: 24, H: 22, DL: 410 },
        Minimize: { L: 364, T: 76, oL: 387, W: 24, H: 22, DL: 410 },
        Maximize: { L: 364, T: 99, oL: 387, SL: 364, oSL: 387, W: 24, H: 22, ST: 122, DL: 410, oST: 122, DSL: 410, DST: 122 }
      }
    },

    Hint: {
      Frame: {
        LeftTop:     { L: 201, T: 85, W: 8, H: 8, DL: 219 },
        Top:         { L: 0, T: 814, H: 8, DT: 835, Src: 1 },
        RightTop:    { L: 210, T: 85, W: 8, H: 8, DL: 228 },
        Left:        { L: 17, T: 0, W: 8, DL: 29, Src: 2 },
        Right:       { L: 20, T: 0, W: 8, DL: 32, Src: 2 },
        LeftBottom:  { L: 201, T: 114, W: 8, H: 8, DL: 219 },
        Bottom:      { L: 0, T: 817, H: 8, DT: 838, Src: 1 },
        RightBottom: { L: 210, T: 114, W: 8, H: 8, DL: 228 }
      },
      AnchorsImg: {
        topleft:     { L: 237, T: 76, W: 21, H: 40, DL: 301 },
        topcenter:   { L: 259, T: 76, W: 19, H: 40, DL: 323 },
        topright:    { L: 279, T: 76, W: 21, H: 40, DL: 343 },

        bottomleft:   { L: 237, T: 117, W: 21, H: 40, DL: 301 },
        bottomcenter: { L: 259, T: 117, W: 19, H: 40, DL: 323 },
        bottomright:  { L: 279, T: 117, W: 21, H: 40, DL: 343 },

        lefttop:     { L: 237, T: 158, W: 40, H: 21, DL: 319 },
        leftcenter:  { L: 237, T: 180, W: 40, H: 19, DL: 319 },
        leftbottom:  { L: 237, T: 200, W: 40, H: 21, DL: 319 },

        righttop:    { L: 278, T: 158, W: 40, H: 21, DL: 360 },
        rightcenter: { L: 278, T: 180, W: 40, H: 19, DL: 360 },
        rightbottom: { L: 278, T: 200, W: 40, H: 21, DL: 360 }
      },
      Anchors: {
        topleft:     { L: 7, T: -32, HX: 13, HY: 1 },
        topcenter:   { L: 90, T: -32, HX: 9, HY: 1 },
        topright:    { R: 7, T: -32, HX: 8, HY: 1 },

        bottomleft:   { L: 7, B: -32, HX: 13, HY: 39 },
        bottomcenter: { L: 90, B: -32, HX: 9, HY: 39 },
        bottomright:  { R: 7, B: -32, HX: 8, HY: 39 },

        lefttop:     { L: -32, T: 7, HX: 1, HY: 13 },
        leftcenter:  { L: -32, T: 55, HX: 1, HY: 9 },
        leftbottom:  { L: -32, B: 7, HX: 1, HY: 8 },

        righttop:    { R: -32, T: 7, HX: 39, HY: 13 },
        rightcenter: { R: -32, T: 55, HX: 39, HY: 9 },
        rightbottom: { R: -32, B: 7, HX: 39, HY: 8 }
      }
    },

    TextHint: {
      Frame: {
        LeftTop:     { L: 201, T: 132, W: 4, H: 4, DL: 219 },
        Top:         { L: 0, T: 921, H: 4, DT: 939, Src: 1 },
        RightTop:    { L: 214, T: 132, W: 4, H: 4, DL: 232 },
        Left:        { L: 41, T: 0, W: 4, DL: 59, Src: 2 },
        Right:       { L: 54, T: 0, W: 4, DL: 72, Src: 2 },
        LeftBottom:  { L: 201, T: 145, W: 4, H: 4, DL: 219 },
        Bottom:      { L: 0, T: 934, H: 4, DT: 952, Src: 1 },
        RightBottom: { L: 214, T: 145, W: 4, H: 4, DL: 232 }
      },
      AnchorsImg: {
        topleft:     { L: 401, T: 146, W: 21, H: 27, DT: 202 },
        topright:    { L: 437, T: 146, W: 21, H: 27, DT: 202 },

        left:        { L: 459, T: 168, W: 27, H: 13, DT: 226 },
        right:       { L: 487, T: 168, W: 27, H: 13, DT: 226 },

        bottomleft:  { L: 401, T: 174, W: 21, H: 27, DT: 230 },
        bottomright: { L: 437, T: 174, W: 21, H: 27, DT: 230 }
      },
      Anchors: {
        topleft:     { L: 0, T: -19, HX: 0, HY: 0 },
        topright:    { R: 0, T: -19, HX: 21, HY: 0 },

        left:        { L: -19, T: 7, HX: 0, HY: 13 },
        right:       { R: -19, T: 7, HX: 27, HY: 13 },

        bottomleft:  { L: 0, B: -19, HX: 0, HY: 27 },
        bottomright: { R: 0, B: -19, HX: 21, HY: 27 }
      },
      NoAnchors: {
        topleft:     { L: -2, T: -16, HX: 0, HY: 0 },
        topright:    { R: 15, T: -16, HX: 0, HY: 0 },

        bottomleft:  { L: -2, B: -16, HX: 0, HY: 0 },
        bottomright: { R: 15, B: -16, HX: 0, HY: 0 }
      }
    },

    Memo: {
      Frame: {
        LeftTop:     { L: 85, T: 1, W: 5, H: 5, oL: 97, SL: 85, oSL: 85, DL: 109, oDL: 109 },
        Top:         { L: 0, T: 168, H: 5, oT: 196, ST: 168, oST: 168, DT: 224, oDT: 224, Src: 1 },
        RightTop:    { L: 91, T: 1, W: 5, H: 5, oL: 103, SL: 91, oSL: 91, DL: 115, oDL: 115 },
        Left:        { L: 77, T: 0, W: 5, oL: 105, SL: 77, oSL: 77, DL: 133, oDL: 133, Src: 2 },
        Right:       { L: 99, T: 0, W: 5, oL: 127, SL: 99, oSL: 99, DL: 155, oDL: 155, Src: 2 },
        LeftBottom:  { L: 85, T: 23, W: 5, H: 5, oL: 97, SL: 85, oSL: 85, DL: 109, oDL: 109 },
        Bottom:      { L: 0, T: 190, H: 5, oT: 218, ST: 190, oST: 190, DT: 246, oDT: 246, Src: 1 },
        RightBottom: { L: 91, T: 23, W: 5, H: 5, oL: 103, SL: 91, oSL: 91, DL: 115, oDL: 115 }
      },
      ReqFrame: {
        LeftTop:     { L: 121, T: 1, W: 5, H: 5, SL: 121, oSL: 121, DL: 109, oDL: 109 },
        Top:         { L: 0, T: 252, H: 5, ST: 252, oST: 252, DT: 224, oDT: 224, Src: 1 },
        RightTop:    { L: 127, T: 1, W: 5, H: 5, SL: 127, oSL: 127, DL: 115, oDL: 115 },
        Left:        { L: 161, T: 0, W: 5, SL: 161, oSL: 161, DL: 133, oDL: 133, Src: 2 },
        Right:       { L: 183, T: 0, W: 5, SL: 183, oSL: 183, DL: 155, oDL: 155, Src: 2 },
        LeftBottom:  { L: 121, T: 23, W: 5, H: 5, SL: 121, oSL: 121, DL: 109, oDL: 109 },
        Bottom:      { L: 0, T: 274, H: 5, ST: 274, oST: 274, DT: 246, oDT: 246, Src: 1 },
        RightBottom: { L: 127, T: 23, W: 5, H: 5, SL: 127, oSL: 127, DL: 115, oDL: 115 }
      }
    },

    SplitPanel: {
      VSplit: { L: 306, T: 222, W: 15, H: 46, oL: 322, SL: 322, DL: 338 },
      VSplitNone: { L: -3, T: -1, W: 3, H: 1 },

      HSplit: { L: 354, T: 222, W: 46, H: 15, oT: 238, ST: 238, DT: 254 },
      HSplitNone: { L: -1, T: -3, W: 1, H: 3 }
    },

    DropPanel:      {
      Left:  { L: 17, T: 0, W: 8, DL: 29, Src: 2 },
      Right: { L: 20, T: 0, W: 8, DL: 32, Src: 2 },
      BottomButton: {
        Left:   { L: 201, T: 114, W: 8, H: 18, DL: 219 },
        Middle: { L: 0, T: 817, H: 18, DT: 838, Src: 1 },
        Right:  { L: 210, T: 114, W: 8, H: 18, DL: 228 }
      },
      TopButton:    {
        Left:   {L: 201, T: 75, W: 8, H: 18, DL: 219},
        Middle: { L: 0, T: 804, H: 18, DT: 825, Src: 1 },
        Right:  { L: 210, T: 75, W: 8, H: 18, DL: 228 }
      },
      UpButton:     { L: 201, T: 212, W: 35, H: 18, oT: 230, DT: 248, oDT: 248, ST: 158, oST: 176, DST: 194, oDST: 194 },
      DownButton:   { L: 201, T: 158, W: 35, H: 18, oT: 176, DT: 194, oDT: 194, ST: 212, oST: 230, DST: 248, oDST: 248 }
    },

    Menu: {
      MenuButton:  { L: 136, T: 75, W: 20, H: 27, DL: 176, oDL: 176 },
      SplitButton: { L: 434, T: 89, oL: 455, oSL: 455, DL: 476, W: 20, H: 27, ST: 117, oST: 117, DSL: 476, DST: 117, oDL: 476 },
      SubMenu:     { L: 137, T: 116, W: 14, H: 20, oL: 157, DL: 177, oDL: 177 },
      Caption:     { L: 0, T: 294, H: 28, DT: 347, Src: 1 },
      Separator:   { L: 0, T: 320, H: 2, DT: 373, Src: 1 },
      CheckBox:    { L: 303, T: 30, W: 16, H: 20, oL: 323, SL: 341, oSL: 361, GL: 381, oGL: 401, DL: 421, DSL: 441, DGL: 461 },
      Frame:       {
        LeftTop:     { L: 10, T: 110, W: 2, H: 3, DL: 28 },
        Top:         { L: 0, T: 320, H: 2, DT: 373, Src: 1 },
        RightTop:    { L: 7, T: 110, W: 2, H: 3, DL: 24 },
        Left:        { L: 1, T: 0, W: 2, DL: 9, Src: 2 },
        Right:       { L: 6, T: 0, W: 2, DL: 14, Src: 2 },
        LeftBottom:  { L: 10, T: 115, W: 2, H: 2, DL: 28 },
        Bottom:      { L: 0, T: 325, H: 2, DT: 378, Src: 1 },
        RightBottom: { L: 7, T: 115, W: 2, H: 2, DL: 24 }
      }
    },

    MenuBar: {
      LeftImg:   { L: -6, T: -27, W: 6, H: 27, oL: 15, oT: 1, SL: 29, ST: 1, DL: -6, DT: -27, oSL: 43, oST: 1 },
      MiddleImg: { L: 0, T: -27, ST: 56, oT: 28, DT: -27, oST: 84, H: 27, Src: 1 },
      RightImg:  { L: -6, T: -27, W: 6, H: 27, oL: 22, oT: 1, SL: 36, ST: 1, DL: -6, DT: -27, oSL: 50, oST: 1 }
    },

    ProgressBar: {
      LeftImg:   { L: 434, T: 68, W: 2, H: 20, DL: 442 },
      MiddleImg: { L: 0, T: 957, H: 20, DT: 978, Src: 1 },
      RightImg:  { L: 438, T: 68, W: 3, H: 20, DL: 446 },
      BarImg:    { L: 450, T: 68, W: 10, H: 20, DL: 461 }
    },

    EyeIcon:     { L: 1, T: 157, W: 26, H: 27, oL: 28, DL: 55 },
    LockIcon:    { L: 1, T: 185, W: 18, H: 27, oL: 20, DL: 39 },
    AimIcon:     { L: 1, T: 213, W: 21, H: 27, oL: 23, DL: 45 },
    PulseIcon:   { L: 1, T: 241, W: 18, H: 27, oL: 20, DL: 39 },
    ElipsisIcon: { L: 95, T: 156, W: 27, H: 27, oT: 184, DT: 212 },
    SearchIcon:  { L: 123, T: 156, W: 27, H: 27, oT: 184, DT: 212 },
    CalendarIcon: { L: 95, T: 240, W: 27, H: 27, oL: 123, DL: 151 },
    ClockIcon: { L: 95, T: 268, W: 27, H: 27, oL: 123, DL: 151 }
  },

  OnControlCreated: function(def,c) {
    switch(def.Type)
    {
      case 'wfrCheckBox':
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
      case 'wfrRadioButton':
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
      case 'wfrGroup':
      case 'wfrGroupBox':
        if(ng_EmptyVar(c.Frame))
          c.Frame = (c.Text == '' && (!c.OnGetText) ? this.Images.Group.BoxNoText : this.Images.Group.Box)
        break;
      case 'wfrPages':
        if(c.PagesVAlign == 'bottom'){
          if(ng_EmptyVar(c.Frame)){
            c.Frame = ng_CopyVar(this.Images.Pages.BoxDown);
            if(c.PagesVisible){
              if(c.PagesAlign == 'right'){
                c.Frame.RightBottom = c.Frame.RightBottom2;
              }
              else{
                c.Frame.LeftBottom = c.Frame.LeftBottom2;
              }
            }
          }
          if(ng_EmptyVar(c.PageImages)){
            c.PageImages = this.Images.Pages.PagesDown;
            c.RowOverlap = 1;
          }
        }
        else{
          if(ng_EmptyVar(c.Frame)){
            c.Frame = ng_CopyVar(this.Images.Pages.BoxUp);
            if(c.PagesVisible){
              if(c.PagesAlign == 'right'){
                c.Frame.RightTop = c.Frame.RightTop2;
              }
              else{
                c.Frame.LeftTop = c.Frame.LeftTop2;
              }
            }
          }
          if(ng_EmptyVar(c.PageImages)){
            c.PageImages = this.Images.Pages.PagesUp;
            c.RowOverlap = 1;
          }
        }
        break;
    }
  },

  OnInit: function()
  {
    // Set path if running as part of Controls.js library
    var cjs=(typeof ngLib==='object' && ngLib ? ngLib['controls.js'] : null);
    if((typeof cjs==='object')&&(cjs)) {
      var l={ path: cjs.path+(ngDEBUG ? 'debug' : 'release')+'/libs/ng_wireframe/' };
      if(typeof cjs.URL!=='undefined') l.URL=cjs.URL;
      ngLib['ng_wireframe']=l;
    }

    var libpath = ngLibPath('ng_wireframe');
    var WFRImages = this.Images;
    var WFR = this;
    var skinfnc={};

    for(var i in WFRImages.Hint.Anchors) {
      WFRImages.Hint.Anchors[i].Img=WFRImages.Hint.AnchorsImg[i];
    }
    for(var i in WFRImages.TextHint.Anchors) {
      WFRImages.TextHint.Anchors[i].Img=WFRImages.TextHint.AnchorsImg[i];
    }

    /**
     *  Group: Control Types
     */

    /** Class: wfrPanel
     *  "Wireframe" skin panel control (based on <ngPanel>).
     */
    ngRegisterControlType('wfrPanel', function(def,ref,parent){
      return ngCreateControlAsType(def, 'ngPanel', ref, parent);
    });

    /** Class: wfrFrame
     *  "Wireframe" skin frame control (based on <ngFrame>).
     */
    ngRegisterControlType('wfrFrame', function(def,ref,parent){
      return ngCreateControlAsType(def, 'ngFrame', ref, parent);
    });

    /** Class: wfrToolBar
     *  "Wireframe" skin toolbar control (based on <ngToolBar>).
     */
    ngRegisterControlType('wfrToolBar', function(def,ref,parent) {
      if(typeof def.className === 'undefined'){ def.className = 'wfrToolBar'; }
      return ngCreateControlAsType(def, 'ngToolBar', ref, parent);
    });

    /** Class: wfrText
     *  "Wireframe" skin text control (based on <ngText>).
     */
    ngRegisterControlType('wfrText', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='wfrText';
      return ngCreateControlAsType(def, 'ngText', ref, parent);
    });

    /** Class: wfrButton
     *  "Wireframe" skin button control (based on <ngButton>).
     */
    ngRegisterControlType('wfrButton', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='wfrButton';
      var c=ngCreateControlAsType(def, 'ngButton', ref, parent);
      if(c){
        if((ngVal(c.Default,false))){
          c.LeftImg = WFRImages.DefButton.LeftImg;
          c.MiddleImg = WFRImages.DefButton.MiddleImg;
          c.RightImg = WFRImages.DefButton.RightImg;
        }
        else{
          c.LeftImg = WFRImages.Button.LeftImg;
          c.MiddleImg = WFRImages.Button.MiddleImg;
          c.RightImg = WFRImages.Button.RightImg;
        }

        if(typeof def.Menu === 'object'){
          c.Img = WFRImages.Menu.MenuButton;
          c.ImgAlign = 'right';
        }
      }
      return c;
    });

    /** Class: wfrCheckBox
     *  "Wireframe" skin check box control (based on <ngCheckBox>).
     */
    ngRegisterControlType('wfrCheckBox', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='wfrCheckBox';
      return ngCreateControlAsType(def, 'ngCheckBox', ref, parent);
    });

    /** Class: wfrRadioButton
     *  "Wireframe" skin radio button control (based on <ngRadioButton>).
     */
    ngRegisterControlType('wfrRadioButton', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='wfrRadio';
      return ngCreateControlAsType(def, 'ngRadioButton', ref, parent);
    });

    /** Class: wfrLabel
     *  "Wireframe" skin label control (based on <ngButton>).
     */
    ngRegisterControlType('wfrLabel', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='wfrLabel';
      return ngCreateControlAsType(def, 'ngButton', ref, parent);
    });

    /** Class: wfrLink
     *  "Wireframe" skin link control (based on <ngButton>).
     */
    ngRegisterControlType('wfrLink', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className='wfrLink';
      return ngCreateControlAsType(def, 'ngButton', ref, parent);
    });

    /**  Class: wfrEdit
     *  "Wireframe" skin edit control (based on <ngEdit>).
     */
    this.wfrEdit_AddProperties = function(c)
    {
      var req = ngVal(c.Invalid,false);
      c.LeftImg = (req ? WFRImages.Edit.LeftImgReq : WFRImages.Edit.LeftImg);
      c.MiddleImg = (req ? WFRImages.Edit.MiddleImgReq : WFRImages.Edit.MiddleImg);
      c.RightImg = (req ? WFRImages.Edit.RightImgReq : WFRImages.Edit.RightImg);

      c.DoSetInvalid = function(r,update)
      {
        if(!r){
          if(c.LeftImg){
            c.LeftImg = WFRImages.Edit.LeftImg;
          }
          if(c.MiddleImg){
            c.MiddleImg = WFRImages.Edit.MiddleImg;
          }
          if(c.RightImg){
            c.RightImg = WFRImages.Edit.RightImg;
          }
        }
        else{
          if(c.LeftImg){
            c.LeftImg = WFRImages.Edit.LeftImgReq;
          }
          if(c.MiddleImg){
            c.MiddleImg = WFRImages.Edit.MiddleImgReq;
          }
          if(c.RightImg){
            c.RightImg = WFRImages.Edit.RightImgReq;
          }
        }

        c.Elm().className = (!r) ? 'wfrEdit' : 'wfrEdit wfrEdit_Invalid';

        if(update){
          c.DoUpdateImages();
        }
      }
    }

    skinfnc.Create_wfrEdit=function(def,ref,parent)
    {
      if(typeof def.className === 'undefined') def.className = (def.Data && def.Data.Invalid)
        ? 'wfrEdit wfrEdit_Invalid' : 'wfrEdit';
      if((typeof def.DropDown !== 'undefined')&&(typeof def.DropDown.className === 'undefined')){
        def.DropDown.className = 'wfrDropDown';
      }
      var c = ngCreateControlAsType(def, 'ngEdit', ref, parent);
      if(c) {
        WFR.wfrEdit_AddProperties(c);
      }
      return c;
    }
    ngRegisterControlType('wfrEdit', skinfnc.Create_wfrEdit);
    ngRegisterControlType('wfrEditBox', skinfnc.Create_wfrEdit);

    /** Class: wfrEditBoxBtn
     *  "Wireframe" skin edit control with elipsis button (based on <stdEdit>).
     */
    skinfnc.Create_wfrEditBoxBtn=function(def,ref,parent,basetype)
    {
      if(typeof def.className === 'undefined') def.className='wfrEdit';
      if((typeof def.DropDown !== 'undefined') && (typeof def.DropDown.className === 'undefined')){
        def.DropDown.className = 'wfrDropDown';
      }
      var c = ngCreateControlAsType(def, ngVal(basetype,'wfrEdit'), ref, parent);
      if(!c){return c;}
      var b = new ngButton();
      b.LeftImg = WFRImages.ElipsisButton;
      c.RightImg = null;
      b.OnClick = function(ci){
        var e = (ci.Owner ? ngVal(ci.Owner.Parent,null) : null);
        if((e) && (e.OnElipsis)){
          e.OnElipsis(ci, e.GetText());
        }
      }
      c.Buttons = new Array(b);

      c.Elipsis = function(){
        b.Click();
      }
      return c;
    }

    ngRegisterControlType('wfrEditBoxBtn', function(def,ref,parent){
      return skinfnc.Create_wfrEditBoxBtn(def,ref,parent);
    });

    /**  Class: wfrEditNum
     *  "Wireframe" skin edit number control with spin buttons (based on <ngEditNum>).
     */
    skinfnc.Create_wfrEditNum=function(def,ref,parent, basetype)
    {
      if(typeof def.className === 'undefined'){def.className = 'wfrEdit';}
      if((typeof def.DropDown !== 'undefined') && (typeof def.DropDown.className === 'undefined')){
        def.DropDown.className = 'wfrDropDown';
      }
      var c = ngCreateControlAsType(def, ngVal(basetype,'ngEditNum'), ref, parent);
      if(!c){return c;}
      WFR.wfrEdit_AddProperties(c);
      var type = ngVal(def.Arrows,'leftright');
      if(c.ButtonUp){
        c.ButtonUp.LeftImg  = (type == 'leftright' ? WFRImages.Edit.ArrowRight : WFRImages.Edit.ArrowUp);
      }
      if(c.ButtonDown){
        c.ButtonDown.LeftImg = (type == 'leftright' ? WFRImages.Edit.ArrowLeft  : WFRImages.Edit.ArrowDown);
      }
      return c;
    }
    ngRegisterControlType('wfrEditNum', function(def,ref,parent){
      return skinfnc.Create_wfrEditNum(def,ref,parent);
    });
    ngRegisterControlType('wfrEditBoxNum', function(def,ref,parent){
      return skinfnc.Create_wfrEditNum(def,ref,parent);
    });

    /**  Class: wfrColorEdit
     *  "Wireframe" skin color edit control (based on <ngDropDown>).
     */
    skinfnc.Create_wfrColorEdit=function(def,ref,parent,basetype)
    {
      ng_MergeDef(def, {
        className: 'wfrEdit',
        Data: {
          TextAlign: 'center'
        },
        DropDown: null
      });
      var c = ngDropDown_Create(def,ref,parent, ngVal(basetype,'ngEdit'));
      if(!c){return c;}

      WFR.wfrEdit_AddProperties(c);
      c.DropDownButton.Img = WFRImages.ColorPreview;
      c.RightImg = null;
      /**
       *  Group: Methods
       */
      /** Function: GetColor
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
      c.GetColor = function(){
        var col = this.GetText();
        if((col.length > 0) && (col[0] === '#')){
          col = col.substring(2,col.length);
        }
        return col;
      };

      c.DropDownButton.HTMLEncode = false;
      c.DropDownButton.OnGetText = function(e){
        var col = this.Enabled ? this.Parent.GetColor() : 'cccccc';
        col = (col === '') ? 'ffffff' : col;
        this.Elm().style.backgroundColor = '#' + ng_htmlEncode(col);

        return '';
      }

      c.OnTextChanged = function(e){
        e.DropDownButton.Update();
      }
      return c;
    }
    ngRegisterControlType('wfrColorEdit', function(def,ref,parent){
      return skinfnc.Create_wfrColorEdit(def,ref,parent);
    });
    ngRegisterControlType('wfrColorEditBox', function(def,ref,parent){
      return skinfnc.Create_wfrColorEdit(def,ref,parent);
    });

    if (ngUserControls['maskedit'])
    {
      /*  Class: wfrMaskEdit
       *  "Wireframe" skin mask edit control (based on <ngMaskEdit>).
       */
      skinfnc.Create_wfrMaskEdit=function(def, ref, parent)
      {
        if (typeof(def.Data)==='undefined') def.Data = new Object();
        var invalid = ngVal(def.Data.Invalid, false);

        if(typeof def.className === 'undefined'){
          def.className = 'wfrMaskEdit';
        }

        delete def.H;
        ng_MergeDef(def, {
          H: WFRImages.Edit.MiddleImg.H,
          Data: {
            LeftDef: {
              W: WFRImages.Edit.LeftImg.W,
              Data: {
                LeftImg: (invalid ? WFRImages.Edit.LeftImgReq : WFRImages.Edit.LeftImg),
                MiddleImg: (invalid ? WFRImages.Edit.MiddleImgReq : WFRImages.Edit.MiddleImg),
                RightImg: null
              }
            },
            EditDef: {
              Type: 'wfrEdit',
              Data: {
                LeftImg: null,
                MiddleImg: (invalid ? WFRImages.Edit.MiddleImgReq : WFRImages.Edit.MiddleImg),
                RightImg: null
              }
            },
            StaticDef: {
              Type: 'wfrLabel',
              Data: {
                MiddleImg: (invalid ? WFRImages.Edit.MiddleImgReq : WFRImages.Edit.MiddleImg)
              }
            },
            RightDef: {
              W: WFRImages.Edit.RightImg.W,
              Data: {
                LeftImg: null,
                MiddleImg: (invalid ? WFRImages.Edit.MiddleImgReq : WFRImages.Edit.MiddleImg),
                RightImg: (invalid ? WFRImages.Edit.RightImgReq : WFRImages.Edit.RightImg)
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
            if (ctrl.LeftImg)   ctrl.LeftImg   = WFRImages.Edit.LeftImg;
            if (ctrl.MiddleImg) ctrl.MiddleImg = WFRImages.Edit.MiddleImg;
            if (ctrl.RightImg)  ctrl.RightImg  = WFRImages.Edit.RightImg;
          } else
          {
            if (ctrl.LeftImg)   ctrl.LeftImg   = WFRImages.Edit.LeftImgReq;
            if (ctrl.MiddleImg) ctrl.MiddleImg = WFRImages.Edit.MiddleImgReq;
            if (ctrl.RightImg)  ctrl.RightImg  = WFRImages.Edit.RightImgReq;
          }

          ctrl.Elm().className = (!state) ? ctrl.BaseClassName : ctrl.BaseClassName+' '+ctrl.BaseClassName+'_Invalid';

          if (update)
          {
            var focus = (c.HasFocus ? 1 : 0);

            if (ctrl.LeftImg)   ngc_ChangeImage(ngpg_ImgDrawProps(ctrl.ID+'_IL', focus, ctrl.Enabled, ctrl.LeftImg));
            if (ctrl.MiddleImg) ngc_ChangeImageS(ngpg_ImgDrawProps(ctrl.ID+'_IM', focus, ctrl.Enabled, ctrl.MiddleImg));
            if (ctrl.RightImg)  ngc_ChangeImage(ngpg_ImgDrawProps(ctrl.ID+'_IR', focus, ctrl.Enabled, ctrl.RightImg));
          }

          return true;
        }

        return c;
      }
      ngRegisterControlType('wfrMaskEdit', function(def,ref,parent) { return skinfnc.Create_wfrMaskEdit(def,ref,parent); });
      ngRegisterControlType('wfrMaskEditBox', function(def,ref,parent) { return skinfnc.Create_wfrMaskEdit(def,ref,parent); });
    }

    /** Class: wfrDropDown
     *  "Wireframe" skin drop down control (based on <ngDropDown>).
     */

    /**
     *  Group: Properties
     */

    /**  Variable: Invalid
     *  ...
     *  Type: boolean
     *  Default value: *false*
     */

    /**
     *  Group: Methods
     */

    /** Function: SetInvalid
     *  Sets (visual) invalid state of control.
     *
     *  Syntax:
     *    void *SetInvalid* (boolean r [,boolean update = true])
     *
     *  Parameters:
     *    -
     *  Returns:
     *    -
     */
    skinfnc.Create_wfrDropDown=function(def,ref,parent,basetype,dropdownlist)
    {
      if(typeof def.className === 'undefined'){def.className = 'wfrEdit';}

      ng_MergeDef(def,{
        DropDown: {
          Type: 'wfrListBox',
          Data:{
            Frame: WFRImages.DropDownBox
          }
        }
      });

      var c = ngDropDown_Create(def,ref,parent, ngVal(basetype,'ngDropDown'),dropdownlist);
      if(!c){return c;}
      WFR.wfrEdit_AddProperties(c);
      c.DropDownButton.LeftImg = WFRImages.DropDown;
      c.RightImg = null;
      if(typeof def.DropDown.className === 'undefined'){
        def.DropDown.className = 'wfrDropDown';
      }
      return c;
    }

    ngRegisterControlType('wfrDropDown',
        function(def,ref,parent){
          return skinfnc.Create_wfrDropDown(def,ref,parent,'ngDropDown',false);
        }
    );
    ngRegisterControlType('wfrDropDownList',
        function(def,ref,parent){
          return skinfnc.Create_wfrDropDown(def,ref,parent,'ngDropDownList',true);
        }
    );

    /** Class: wfrSearchBox
     *  "Wireframe" skin search box control (based on <stdEdit>).
     */

    skinfnc.Create_wfrSearchBox=function(def,ref,parent,basetype)
    {
      if(typeof def.className === 'undefined') def.className = 'wfrEdit';
      if((typeof def.DropDown !== 'undefined') && (typeof def.DropDown.className === 'undefined')){
        def.DropDown.className = 'wfrDropDown';
      }
      var c = ngCreateControlAsType(def, ngVal(basetype,'wfrEdit'), ref, parent);
      if(!c){return c;}
      if(typeof def.DropDown !== 'undefined'){c.Suggestion = true;}
      c.RightImg = null;

      var b = new ngButton();
      b.LeftImg = WFRImages.SearchButton;
      b.Default = true;
      b.OnClick = function(ci){
        var e = (ci.Owner ? ngVal(ci.Owner.Parent,null) : null);
        if((e) && (e.OnSearch)){
          e.OnSearch(ci, e.GetText());
        }
      }
      c.Buttons = new Array(b);
      /**
       *  Group: Methods
       */

      /** Function: Search
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
      c.Search = function(t){
        if(typeof t !== 'undefined'){this.SetText(t);}
        b.Click();
      }
      return c;
    }

    ngRegisterControlType('wfrSearchBox', function(def,ref,parent){
      return skinfnc.Create_wfrSearchBox(def,ref,parent);
    });

    /**
     * List Controls
     */
    if(ngUserControls['list']){
      /** Class: wfrList
       *  "Wireframe" skin list control (based on <ngList>).
       */
      skinfnc.Create_wfrList=function(def,ref,parent)
      {

        if(typeof def.className === 'undefined') def.className = 'wfrListBox';
        var c = ngCreateControlAsType(def, 'ngList', ref, parent);
        if(!c) return c;
        c.AddEvent('DoUpdate',function(o){
          var cn = o.className;
          var idx = cn.indexOf(' ');
          if(this.Enabled) {
            if(idx >= 0){o.className = cn.substring(0,idx);}
          }
          else {
            if(idx < 0){o.className = cn+' '+cn+'Disabled';}
          }
          return true;
        });
        c.OnGetCheckImg = function(list,item){
          if((typeof item.Checked === 'undefined') && (!list.ShowCheckboxes)){return null;}
          if((!list.RadioAllowUncheck)&&(!ngVal(item.RadioAllowUncheck, false))&&(typeof item.RadioGroup !== 'undefined')){return WFRImages.RadioLeft;}
          return WFRImages.CheckBoxLeft;
        }

        if(def.Type == 'wfrTreeList'){
          c.TreeImg = WFRImages.List.TreeImgTriangle;
        }

        c.AddEvent('OnUpdated',function(o){
          if(o.Columns.length > 0 && (typeof o.ShowHeader === 'undefined' || o.ShowHeader === true)){
            var captionImg = 'url("' + WFRImages.List.BoxCaption.Src + '") repeat-x scroll 0px -';
            captionImg += (o.Enabled)
              ? (WFRImages.List.BoxCaption.T) ? WFRImages.List.BoxCaption.T : 0
              : (WFRImages.List.BoxCaption.DT) ? WFRImages.List.BoxCaption.DT : 0;
            captionImg += 'px';

            var backTbl = document.getElementById(o.ID + '_TB');
            var frontTbl = document.getElementById(o.ID + '_TH');

            if(backTbl && backTbl.children[0]){
              var backHead = backTbl.children[0];
              if(backHead && backHead.nodeName === 'THEAD'){
                backHead.children[0].style.background = captionImg;
              }
            }

            if(frontTbl && frontTbl.children[0]){
              var frontHead = frontTbl.children[0];
              if(frontHead && frontHead.nodeName === 'THEAD'){
                frontHead.children[0].style.background = captionImg;
              }
            }
          }
          return true;
        });

        c.Frame = WFRImages.List.Box;
        return c;
      }

      ngRegisterControlType('wfrList', skinfnc.Create_wfrList);
      ngRegisterControlType('wfrListBox', skinfnc.Create_wfrList);
      ngRegisterControlType('wfrTreeList', skinfnc.Create_wfrList);

      /** Class: wfrPageList
       *  Standard list control (based on <ngPageList>).
       */
      this.wfrPageListPagingControlsDef = function()
      {
        return {
          FirstPage: {
            Type: 'ngButton',
            className: 'wfrPgListPagingButton',
            Data: {
              ToolBarHPadding: 5,
              Img: WFRImages.PagingFirst,
              Text: ''
            }
          },
          PrevPage: {
            Type: 'ngButton',
            className: 'wfrPgListPagingButton',
            Data: {
              ToolBarHPadding: 5,
              Img: WFRImages.PagingPrev,
              Text: ''
            }
          },
          PageNo: {
            Type: 'wfrEdit',
            W: 30,
            Data: {
              ToolBarHPadding: 5,
              Text: '1',
              TextAlign: 'center'
            }
          },
          Page0: {
            Type: 'ngButton',
            className: 'wfrPgListPagingButton',
            Data: {
              ToolBarHPadding: 5,
              MinWidth: 22,
              MiddleImg: WFRImages.PagingPage,
              Text: '1',
              TextAlign: 'center'
            }
          },
          NextPage: {
            Type: 'ngButton',
            className: 'wfrPgListPagingButton',
            Data: {
              Img: WFRImages.PagingNext,
              Text: '',
              ImgAlign: 'right',
              ToolBarHPadding: 5
            }
          },
          LastPage: {
            Type: 'ngButton',
            className: 'wfrPgListPagingButton',
            Data: {
              Img: WFRImages.PagingLast,
              ImgAlign: 'right',
              Text: ''
            }
          }
        };
      }

      skinfnc.Create_wfrPageList=function(def,ref,parent,controltype)
      {
        ng_MergeDef(def, {
          className: 'wfrListBox',
          Data: {
            AverageItemHeight: 24
          },
          Controls: {
            List: {
              Type: (def.Type && def.Type === 'wfrPageTreeList') ? 'wfrTreeList' : 'wfrList'
            },
            Loading: {
              Type: 'wfrProgressDot',
              L: 15, T: ((controltype==='ngDataSet') || (controltype==='ngDBDataSet') || (def.Controls && def.Controls.List && def.Controls.List.Data && def.Controls.List.Data.Columns && def.Controls.List.Data.Columns.length>0) ? 43 : 15),
              Data: {
                Visible: false
              }
            },
            Paging: {
              H:27,
              className: 'wfrPageListPaging',
              Controls: WFR.wfrPageListPagingControlsDef()
            }
          }
        });

        var c = ngCreateControlAsType(def, ngVal(controltype,'ngPageList'), ref, parent);
        if(!c){return c;}
        c.AddEvent('DoUpdate',function(o){
          var cn = o.className;
          var idx = cn.indexOf(' ');
          if(this.Enabled){
            if(idx >= 0){o.className = cn.substring(0,idx);}
          }
          else{
            if(idx < 0){o.className = cn+' '+cn+'Disabled';}
          }
          return true;
        });
        return c;
      }

      ngRegisterControlType('wfrPageList', function (def,ref,parent){
        return skinfnc.Create_wfrPageList(def,ref,parent,'ngPageList');
      });
      ngRegisterControlType('wfrPageTreeList', function (def,ref,parent){
        return skinfnc.Create_wfrPageList(def,ref,parent,'ngPageList');
      });
    }

    /** Class: wfrGroup
     *  "Wireframe" skin group control (based on <ngGroup>).
     */
    skinfnc.Create_wfrGroup=function(def,ref,parent)
    {
      if(typeof def.className === 'undefined') def.className = 'wfrGroupBox';
      return ngCreateControlAsType(def, 'ngGroup', ref, parent);
    }
    ngRegisterControlType('wfrGroup', skinfnc.Create_wfrGroup);
    ngRegisterControlType('wfrGroupBox', skinfnc.Create_wfrGroup);

    /** Class: wfrPages
     *  "Wireframe" skin pages control (based on <ngPages>).
     */
    ngRegisterControlType('wfrPages', function(def,ref,parent) {
      if(typeof def.className === 'undefined') def.className = 'wfrPages';
      ng_MergeDef(def, {
        ControlsPanel: {
          L:5,T:5,R:5,B:5
        }
      });
      var c = ngCreateControlAsType(def, 'ngPages', ref, parent);
      return c;
    });

    /**
     * Window Controls
     */
    if(ngUserControls['window'])
    {
      /** Class: wfrWindow
       *  "Wireframe" skin window control (based on <ngWindow>).
       */

      /** Class: wfrDialog
       *  "Wireframe" skin dialog control (based on <ngWindow>).
       */
      skinfnc.Create_wfrWindow=function(def,ref,parent) {
        var dialog = (def.Type == 'wfrDialog');
        if(typeof def.className === 'undefined') def.className = (dialog ? 'wfrDialog' : 'wfrWindow');
        var c = ngCreateControlAsType(def, 'ngWindow', ref, parent);
        if(!c){return c;}
        c.Frame = WFRImages.Window.Frame;
        c.CaptionImg = WFRImages.Window.Caption;
        if(dialog){
          c.Modal = true;
          c.Visible = false;
          c.Sizeable = false;
          c.Centered = true;
        }

        /**
         *  Group: Definition
         */

        /**
         *  Variable: CloseBtn
         *  ...
         *  Type: bool
         */
        var b;
        if(ngVal(def.CloseBtn,(dialog ? true : false)))
        {
          b = new ngButton;
          c.CloseButton = b;
          b.LeftImg = WFRImages.Window.Buttons.Close;
          b.OnClick = function(ci){
            var e = (ci.Owner ? ngVal(ci.Owner.Parent,null) : null);
            if((e)&&(e.Close)){e.Close(e);}
          }
          if(!c.Buttons){c.Buttons = new Array();}
          c.Buttons[c.Buttons.length] = b;
        }

        /**
         *  Variable: MaxBtn
         *  ...
         *  Type: bool
         */
        if(ngVal(def.MaxBtn,false)){
          b = new ngButton;
          c.MaxButton = b;
          c.OnDblClick = function(e){
            if(e.win){
              if(e.win.MaxButton){
                e.win.MaxButton.Click();
              }
            }
          }
          c.AddEvent(function(o){
            // update button state before update
            var s = (c.IsMaximized() ? 1 : 0);
            if((c.MaxButton)&&(c.MaxButton.Checked!=s)){
              c.MaxButton.Check(s);
            }
            return true;
          }, 'DoUpdate');
          b.LeftImg = WFRImages.Window.Buttons.Maximize;
          b.OnClick = function(ci)
          {
            var e = (ci.Owner ? ngVal(ci.Owner.Parent,null) : null);
            if(e){
              ci.Owner.Check(e.IsMaximized() ? 0 : 1);
              if(ci.Owner.Checked){
                if(e.Maximize) e.Maximize(e);
              }
              else{
                if(e.Restore) e.Restore(e);
              }
            }
          }
          if(!c.Buttons){
            c.Buttons = new Array();
          }
          c.Buttons[c.Buttons.length] = b;
        }

        /**
         *  Variable: MinBtn
         *  ...
         *  Type: bool
         */
        if(ngVal(def.MinBtn,false))
        {
          b = new ngButton;
          c.MinButton = b;
          b.LeftImg = WFRImages.Window.Buttons.Minimize;
          c.AddEvent(function(o){
            // update button state before update
            var s = (c.IsMinimized() ? 1 : 0);
            if((c.MinButton)&&(c.MinButton.Checked!=s)){
              c.MinButton.Check(s);
            }
            return true;
          }, 'DoUpdate');
          b.OnClick = function(ci){
            var e = (ci.Owner ? ngVal(ci.Owner.Parent,null) : null);
            if(e){
              ci.Owner.Check(e.IsMinimized() ? 0 : 1);
              if(ci.Owner.Checked){
                if(e.Minimize){e.Minimize(e);}
              }
              else{
                if(e.Restore){e.Restore(e);}
              }
            }
          }
          if(!c.Buttons){
            c.Buttons = new Array();
          }
          c.Buttons[c.Buttons.length] = b;
        }

        return c;
      }

      ngRegisterControlType('wfrWindow', skinfnc.Create_wfrWindow);
      ngRegisterControlType('wfrDialog', skinfnc.Create_wfrWindow);

      /** Class: wfrHint
       *  "Wireframe" skin hint control (based on <ngHint>).
       */
      ngRegisterControlType('wfrHint', function(def,ref,parent){
        if(typeof def.className === 'undefined'){def.className = 'wfrHint';}
        var c = ngCreateControlAsType(def, 'ngHint', ref, parent);
        if(c) {
          c.Frame = ng_CopyVar(WFRImages.Hint.Frame);
          c.Anchors = ng_CopyVar(WFRImages.Hint.Anchors);
        }
        return c;
      });

      /** Class: wfrTextHint
       *  "Wireframe" skin hint text control (based on <ngTextHint>).
       */
      ngRegisterControlType('wfrTextHint', function(def,ref,parent){
        var show = (def.Data && def.Data.showAnchors === false) ? false : true;
        ng_MergeDef(def,{
          className: 'wfrTextHint',
          Data: {
            showAnchors: show,
            Frame: WFRImages.TextHint.Frame,
            Anchors: (show) ? WFRImages.TextHint.Anchors : WFRImages.TextHint.NoAnchors
          },
          Controls: {
            Hint: {
              Type: 'wfrText',
              L: 5, T: 2
            }
          }
        });
        var c = ngCreateControlAsType(def, 'ngTextHint', ref, parent);
        return c;
      });

    }

    /**
     * Calendar Controls
     */
    if(ngUserControls['calendar'])
    {
      /** Class: wfrCalendar
       *  "Wireframe" skin calendar control (based on <ngCalendar>).
       */
      ngRegisterControlType('wfrCalendar', function(def,ref,parent) {
        ng_MergeDef(def,{
          className: 'wfrCalendar',
          Data: {
            Frame: WFRImages.Calendar.Frame
          },
          Events: {
            OnUpdated: function(calendar){
              //set header line
              var header = document.getElementById(calendar.ID + '_Head');
              if(header) {
                var headerImg = 'url("' + WFRImages.Calendar.Header.Src + '") repeat-x scroll 0px -';
                var top = (calendar.Enabled)
                  ? ((WFRImages.Calendar.Header.T) ? WFRImages.Calendar.Header.T : 0)
                  : ((WFRImages.Calendar.Header.DT) ? WFRImages.Calendar.Header.DT : 0);
                top += (calendar.YearNavigation) ? 0 : +21 ;
                headerImg += top + 'px';
                header.style.background = headerImg;
              }

              //set footer line
              var footer = document.getElementById(calendar.ID + '_Foot');
              if(footer) {
                var footerImg = 'url("' + WFRImages.Calendar.Footer.Src + '") repeat-x scroll 0px -';
                var top = (calendar.Enabled)
                  ? ((WFRImages.Calendar.Footer.T) ? WFRImages.Calendar.Footer.T : 0)
                  : ((WFRImages.Calendar.Footer.DT) ? WFRImages.Calendar.Footer.DT : 0);
                footerImg += top + 'px';
                var height = (WFRImages.Calendar.Footer.H) ? WFRImages.Calendar.Footer.H : 0;
                footer.style.background = footerImg;
                footer.style.height = height + 'px';
              }

              //set WeekDays line
              var wd = document.getElementById(calendar.ID + '_WeekDays');
              if(wd) {
                var wdImg = 'url("' + WFRImages.Calendar.WeekDays.Src + '") repeat-x scroll 0px -';
                var top = (calendar.Enabled)
                  ? ((WFRImages.Calendar.WeekDays.T) ? WFRImages.Calendar.WeekDays.T : 0)
                  : ((WFRImages.Calendar.WeekDays.DT) ? WFRImages.Calendar.WeekDays.DT : 0);
                wdImg += top + 'px';
                var height = (WFRImages.Calendar.WeekDays.H) ? WFRImages.Calendar.WeekDays.H : 0;
                wd.style.background = wdImg;
                wd.style.height = height + 'px';
              }

              return true;
            }
          }
        });

        var c = ngCreateControlAsType(def, 'ngCalendar', ref, parent);
        if(!c){return c;}
        c.PrevMonBtn.LeftImg = WFRImages.Calendar.ArrowLeft;
        c.PrevMonBtn.Text = '';
        c.NextMonBtn.LeftImg = WFRImages.Calendar.ArrowRight;
        c.NextMonBtn.Text = '';
        c.PrevYearBtn.LeftImg = WFRImages.Calendar.ArrowLeft;
        c.PrevYearBtn.Text = '';
        c.NextYearBtn.LeftImg = WFRImages.Calendar.ArrowRight;
        c.NextYearBtn.Text = '';

        c.ImgDay = WFRImages.Calendar.ImgDay;
        c.ImgNow = WFRImages.Calendar.ImgNow;

        for(var i=0; i < c.FastButtons.length; i++){
          var b = c.FastButtons[i];
          b.LeftImg = WFRImages.Calendar.FastButton.LeftImg;
          b.MiddleImg = WFRImages.Calendar.FastButton.MiddleImg;
          b.RightImg = WFRImages.Calendar.FastButton.RightImg;

        }

        return c;
      });

      /** Class: wfrEditDate
       *  "Wireframe" skin edit date control (based on <ngEditDate>).
       */
      skinfnc.Create_wfrEditDate=function(def,ref,parent,basetype) {
        ng_MergeDef(def, {
          className: 'wfrEdit',
          DropDown: {
            className: 'wfrCalendar',
            Type: 'wfrCalendar'
          }
        });
        var c = skinfnc.Create_wfrDropDown(def,ref,parent, ngVal(basetype,'ngEditDate'),false);
        if(!c){return c;}
        c.DropDownButton.LeftImg = WFRImages.Calendar.EditButton;
        c.DropDownButton.Default = false;
        c.RightImg = null;
        return c;
      }

      ngRegisterControlType('wfrEditDate', function(def,ref,parent){
        return skinfnc.Create_wfrEditDate(def,ref,parent);
      });

      /** Class: wfrEditTime
       *  "Wireframe" skin edit time control (based on <ngEditDate>).
       */
      skinfnc.Create_wfrEditTime=function(def,ref,parent,basetype) {
        var div=1;
        ng_MergeDef(def, {
          className: 'wfrEdit',
          Data: {},
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
            className: 'wfrDropDown',
            Type: 'wfrList'
          }
        });
        div=ngVal(def.DropDown.HourDivider,2);
        if(div<=0) div=1;
        div=60/div;
        var c=ngCreateControlAsType(def, ngVal(basetype,'ngEditTime'), ref, parent);
        if(!c) return c;

        if(def.Type == 'ngDropDownList') c.DropDownType=ngeDropDownList;
        ngDropDown_Add(c);

        WFR.wfrEdit_AddProperties(c);
        c.DropDownButton.LeftImg = WFRImages.Time.EditButton;
        c.DropDownButton.Default = false;
        c.RightImg = null;
        if(typeof def.DropDown.className === 'undefined') def.DropDown.className='wfrDropDown';
        return c;
      }

      ngRegisterControlType('wfrEditTime', function(def,ref,parent){
        return skinfnc.Create_wfrEditTime(def,ref,parent);
      });
    }

    /** Class: wfrMemo
     *  "Wireframe" skin memo control (based on <ngMemo>).
     */
    skinfnc.Create_wfrMemo=function(def,ref,parent,basetype) {
      if(typeof def.className === 'undefined'){
        def.className = (def.Data && def.Data.Invalid) ? 'wfrMemo wfrMemoInvalid' : 'wfrMemo';
      }
      var c = ngCreateControlAsType(def, ngVal(basetype, 'ngMemo'), ref, parent);
      if(!c){return;}

      var req = ngVal(c.Invalid,false);
        c.Frame = (req ? WFRImages.Memo.ReqFrame : WFRImages.Memo.Frame);

      c.DoSetInvalid = function(r,update){
        c.Frame = (r ? WFRImages.Memo.ReqFrame :  WFRImages.Memo.Frame);
        var o = c.Elm();
        if(o){
          var cn = o.className;
          var idx = cn.indexOf('_');
          if(idx < 0){
            o.className = (r) ? 'wfrMemo wfrMemoInvalid' : 'wfrMemo';
          }
          else{
            o.className = ((r) ? 'wfrMemo wfrMemoInvalid' : 'wfrMemo') + o.className.substring(idx,cn.length);
          }
        }
        if(update){c.DoUpdateImages();}
      }

      c.AddEvent('OnFocus', function(c){
        var o = c.Elm();
        if(o){
          var cn = o.className;
          var idx = cn.indexOf('_');
          if(idx < 0){
            o.className = o.className + '_Focus';
          }
        }
        return true;
      });

      c.AddEvent('OnBlur', function(c){
        var o = (!c.MouseInControl) ? c.Elm() : null;
        if(o){
          var cn = o.className;
          var idx = cn.indexOf('_');
          if(idx >= 0){
            o.className = cn.substring(0,idx);
          }
        }
        return true;
      });

      c.AddEvent('DoMouseLeave', function(e, mi){

        var o = (!c.ControlHasFocus) ? c.Elm() : null;
        if(o){
          var cn = o.className;
          var idx = cn.indexOf('_');
          if(idx >= 0){
            o.className = cn.substring(0,idx);
          }
        }
        return true;
      });

      return c;
    }
    ngRegisterControlType('wfrMemo', function(def,ref,parent){
      return skinfnc.Create_wfrMemo(def,ref,parent);
    });

    /**
     * Panels Controls
     */
    if(ngUserControls['panels'])
    {
      /**  Class: wfrSplitPanel
       *  "Wireframe" skin split panel control (based on <ngSplitPanel>).
       */
      ngRegisterControlType('wfrSplitPanel', function(def,ref,parent) {
        if(typeof def.className === 'undefined'){
          def.className = 'wfrSplitPanel';
        }
        var c = ngCreateControlAsType(def, 'ngSplitPanel', ref, parent);
        if(c){
          var vsplit = (c.PanelAlign=='left') || (c.PanelAlign=='right');
          var mover = ngVal(def.Mover,'handle');
          c.HandleImg = (mover == 'none')
            ? (vsplit) ? WFRImages.SplitPanel.VSplitNone : WFRImages.SplitPanel.HSplitNone
            : (vsplit) ? WFRImages.SplitPanel.VSplit : WFRImages.SplitPanel.HSplit;
        }

        return c;
      });

      /** Class: wfrDropPanel
       *  "Wireframe" skin drop-down panel control (based on <ngDropPanel>).
       */
      ngRegisterControlType('wfrDropPanel', function(def,ref,parent) {
        if(typeof def.className === 'undefined'){def.className = 'wfrDropPanel';}
        var c = ngCreateControlAsType(def, 'ngDropPanel', ref, parent);
        ng_MergeDef(def, {
          ControlsPanel: {
            Type: 'ngGroup',
            ControlsPanel: {
              style: { backgroundColor: '#FFFFFF'}
            },
            Data: {
              Frame: {
                Left: WFRImages.DropPanel.Left,
                Right: WFRImages.DropPanel.Right
              }
            }
          },
          Button: {
            Data: {
              OnGetImg: function(b,idx)
              {
                var image=null;
                var btntop=(b.Owner && typeof b.Owner.Bounds.T == 'undefined');
                switch(idx){
                  case -1: image = (btntop ? WFRImages.DropPanel.DownButton : WFRImages.DropPanel.UpButton); break;
                  case 0: image = (btntop ? WFRImages.DropPanel.TopButton.Left : WFRImages.DropPanel.BottomButton.Left); break;
                  case 1: image = (btntop ? WFRImages.DropPanel.TopButton.Middle : WFRImages.DropPanel.BottomButton.Middle); break;
                  case 2: image = (btntop ? WFRImages.DropPanel.TopButton.Right : WFRImages.DropPanel.BottomButton.Right); break;
                }
                return ngVal(image,null);
              }
            }
          },
          Events: {
            OnDropDown: function(panel,opened){
              var button = panel.Button;
              if(button){
                delete ngMouseInControls[button.ID];
                button.MouseInControl = false;
              }
              return true;
            }
          }
        });
        return c;
      });
    }

    /**
     * Menu Controls
     */
    if(ngUserControls['menu'])
    {
      /** Class: wfrMenu
       *  "Wireframe" skin menu control (based on <ngMenu>).
       */
      ngRegisterControlType('wfrMenu', function(def,ref,parent) {
        ng_MergeDef(def, {
          className: 'wfrMenu',
          Data: {
            SubMenuImg: WFRImages.Menu.SubMenu,
            SubMenuDef: { Type: 'wfrMenu' },
            Frame: WFRImages.Menu.Frame,
            SeparatorImg : WFRImages.Menu.Separator
          }
        });
        var c = ngCreateControlAsType(def, 'ngMenu', ref, parent);
        if(!c){return c;}
        c.OnGetCheckImg = function(list,item) {
            if((typeof item.Checked === 'undefined') || (!list.ShowCheckboxes)){return null;}
            return WireframeControls.Images.Menu.CheckBox;
        }

        c.AddEvent('DoUpdate',function(o){
          var cn = o.className;
          var idx = cn.indexOf(' ');
          if(this.Enabled) {
            if(idx >= 0){o.className = cn.substring(0,idx);}
          }
          else {
            if(idx < 0){o.className = cn+' '+cn+'Disabled';}
          }
          return true;
        });

        c.AddEvent('OnUpdated',function(o){
          if(o.Columns.length > 0 && (o.ShowHeader === true)){
            var captionImg = 'url("' + WFRImages.Menu.Caption.Src + '") repeat-x scroll 0px -';
            captionImg += (o.Enabled)
              ? (WFRImages.Menu.Caption.T) ? WFRImages.Menu.Caption.T : 0
              : (WFRImages.Menu.Caption.DT) ? WFRImages.Menu.Caption.DT : 0;
            captionImg += 'px';

            var backTbl = document.getElementById(o.ID + '_TB');
            var frontTbl = document.getElementById(o.ID + '_TH');

            if(backTbl && backTbl.children[0]){
              var backHead = backTbl.children[0];
              if(backHead && backHead.nodeName === 'THEAD'){
                backHead.children[0].style.background = captionImg;
              }
            }

            if(frontTbl && frontTbl.children[0]){
              var frontHead = frontTbl.children[0];
              if(frontHead && frontHead.nodeName === 'THEAD'){
                frontHead.children[0].style.background = captionImg;
              }
            }
          }
          return true;
        });

        c.DrawItemText = function(html, it, id, level)
        {
          var txt;
          var cclass = this.BaseClassName;
          if(this.Columns.length>0){
            txt = ngVal(it.Text[this.Columns[0].ID],'');
          }
          else{
            txt = it.Text;
          }

          if(txt === '-'){
            it.Visible = false;
            var h = ((this.Items[0] == it) || (this.Items[this.Items.length-1] == it));
            if(this.OnDrawSeparator){
              this.OnDrawSeparator(html,it,id,level);
            }
            else{
              var img = '';
              if(this.SeparatorImg){
                img = "background: url('" + this.SeparatorImg.Src + "') repeat-x scroll 0px -";
                img += (this.Enabled)
                  ? (this.SeparatorImg.T) ? this.SeparatorImg.T : 0
                  : (this.SeparatorImg.DT) ? this.SeparatorImg.DT : 0;
                img += 'px;';
              }

              if(this.Columns.length > 0){
                html.append(
                  '<tr id="'+this.ID+'_'+id+'" '
                  + 'class="'+cclass+'Row" '
                  + 'style="'+ (h ? 'display:none;' : '')
                  + '"><td colspan="'+this.Columns.length+'" class="'+cclass+'SeparatorCell">'
                  + '<div class="'+cclass+'Separator" '
                  + 'style="' + img
                  + '">&nbsp;</div>'
                  + '</td></tr>'
                );
              }
              else{
                html.append(
                  '<div id="'+this.ID+'_'+id+'" '
                  + 'class="'+cclass+'Separator" '
                  + 'style="'+ (h ? 'display:none; ' : '') + img
                  + '"></div>'
                );
              }
            }
          }
          else this.DefaultDrawItemText(html,it,id,level);
        }

        return c;
      });

      /** Class: wfrMenuBar
       *  "Wireframe" skin menu bar control (based on <ngMenuBar>).
       */
      ngRegisterControlType('wfrMenuBar', function(def,ref,parent) {
        ng_MergeDef(def, {
          className: 'wfrMenuBar',
          Data: {
            SubMenuDef: { Type: 'wfrMenu' }
          }
        });
        var c = ngCreateControlAsType(def, 'ngMenuBar', ref, parent);
        return c;
      });

      /** Class: wfrMenuBarButton
       *  "Wireframe" skin menu bar button control (based on <ngMenuBarButton>).
       */
      ngRegisterControlType('wfrMenuBarButton', function(def,ref,parent) {
        var c = ngCreateControlAsType(def, 'ngMenuBarButton', ref, parent);
        if(!c){return c;}
        c.LeftImg = WFRImages.MenuBar.LeftImg;
        c.MiddleImg = WFRImages.MenuBar.MiddleImg;
        c.RightImg = WFRImages.MenuBar.RightImg;
        return c;
      });

      /** Class: stdSplitButton
       *  "Wireframe" skin button with menu control (based on <ngSplitButton>).
       */
      ngRegisterControlType('wfrSplitButton', function(def,ref,parent) {
        if(typeof def.className === 'undefined'){def.className = 'wfrSplitButton';}
        var c = ngCreateControlAsType(def, 'ngSplitButton', ref, parent);
        if(!c){return c;}
        c.LeftImg = WFRImages.Button.LeftImg;
        c.MiddleImg = WFRImages.Button.MiddleImg;
        c.RightImg = WFRImages.Menu.SplitButton;
        return c;
      });
    }

    /**
     * Dialogs Controls
     */
    if(ngUserControls['dialogs']){

      /** Class: wfrMessageDlg
       *  "Wireframe" skin message box dialog (based on <ngMessageDlg>).
       */
      ngRegisterControlType('wfrMessageDlg', function(def,ref,parent) {

        ng_MergeDef(def, {
          DialogType: 'wfrDialog',
          Controls: {
            Message: {
              Type: 'wfrText'
            },
            Content: {
              Type: 'ngPanel',
              L: 15, R: 15, H: 15
            },
            Buttons: {
              Type: 'wfrToolBar',
              H: 27,
              Data: {
                HPadding: 10
              },
              Controls: {
                OK: {
                  Type: 'wfrButton',
                  W: 80
                },
                Yes: {
                  Type: 'wfrButton',
                  W: 80
                },
                No: {
                  Type: 'wfrButton',
                  W: 80
                },
                Cancel: {
                  Type: 'wfrButton',
                  W: 80
                }
              }

            }
          }
        });

        if(typeof def.DlgCheckBox !== 'undefined'){
          ng_MergeDef(def, {
            Controls: {
              Content: {
                Controls: {
                  CheckBox: {
                    Type: 'wfrCheckBox',
                    L: 0, B: 10,
                    Data: def.DlgCheckBox
                  }
                }
              }
            }
          });
          def.Controls.Content.H += 30;
        }

        if(def.DialogType === 'wfrMessageDlg'){
          def.DialogType = 'wfrDialog';
        }
        return ngCreateControlAsType(def, 'ngMessageDlg', ref, parent);
      });

      /** Class: wfrDlgMessageBox
       *  "Wireframe" skin message box dialog (based on <wfrMessageDlg>).
       */
      ngRegisterControlType('wfrDlgMessageBox', function(def,ref,parent) {

        delete def.DialogType;

        def.DlgButtons = ngVal(def.DlgButtons,mbOK);
        def.DlgIcon = ngVal(def.DlgIcon,null);

        var ic = null;
        if(typeof def.DlgIcon === 'object'){
          ic = def.DlgIcon;
        }
        else if(typeof def.DlgIcon !== 'undefined'){
          ic = ngVal(WFRImages[def.DlgIcon],null);
        }

        if(ic){
          ng_MergeDef(def, {
            Controls: {
              Message: {
                L: (15 + ic.W + 10), T: 25,
                Data: {
                  MinHeight: (typeof def.DlgCheckBox !== 'undefined' ? ((ic.H >= 30) ? ic.H - 30 : 0) : ic.H - 10)
                }
              },
              Icon: {
                Type: 'ngImage',
                L: 15, T: 20, W: ic.W, H: ic.H,
                Data: {
                  Img: ic
                }
              },
              Content: {
                H: 20,
                Controls: {}
              }
            }
          });
          if(def.Controls.Content.Controls.Check){
            def.Controls.Content.Controls.Check.L = ic.W + 10;
          }
        }
        return ngCreateControlAsType(def, 'wfrMessageDlg', ref, parent);
      });

      /** Class: wfrDlgInputBox
       *  "Wireframe" skin input box dialog (based on <wfrMessageDlg>).
       */
      /** Class: wfrDlgDropDownBox
       *  "Wireframe" skin drop down box dialog (based on <wfrMessageDlg>).
       */
      /** Class: wfrDlgDropDownListBox
       *  "Wireframe" skin drop down list box dialog (based on <wfrMessageDlg>).
       */
      /** Class: wfrDlgDropDownTreeListBox
       *  "Wireframe" skin drop down tree list box dialog (based on <wfrMessageDlg>).
       */
      /** Class: wfrDlgMemoBox
       *  "Wireframe" skin memo box dialog (based on <wfrMessageDlg>).
       */
      skinfnc.Create_wfrDlgEditBox=function(def,ref,parent)
      {
        delete def.DialogType;
        def.DlgAllowEmpty = ngVal(def.DlgAllowEmpty,false);
        var cdef = {
          DialogType: 'wfrMessageDlg',
          DlgButtons: mbOK|mbCancel,
          Controls: {
            Message: {
              Data: {
                MinWidth: 250
              }
            },
            Content: {
              H: 40,
              Controls: {
                Edit: {
                  Type: 'wfrEdit',
                  L: 0, T: 2, R: 0,
                  Data: {}
                }
              }
            },
            Buttons: {
              Controls: {
                OK: {
                  Data: {}
                }
              }
            }
          }
        };

        var edit = cdef.Controls.Content.Controls.Edit;
        switch(def.Type)
        {
          case 'wfrDlgMemoBox':
            edit.Type = 'wfrMemo';
            edit.H = 100;
            cdef.Controls.Content.H = 120;
            break;
          case 'wfrDlgDropDownBox':
            edit.Type = 'wfrDropDown';
            edit.DropDown = { Type: 'wfrList', Data: {} };
            if(typeof def.DlgItems !== 'undefined'){
              edit.DropDown.Data.Items = def.DlgItems;
            }
            break;
          case 'wfrDlgDropDownListBox':
            edit.Type = 'wfrDropDownList';
            edit.DropDown = { Type: 'wfrList', Data: {} };
            if(typeof def.DlgItems !== 'undefined'){
              edit.DropDown.Data.Items = def.DlgItems;
            }
            break;
          case 'wfrDlgDropDownTreeListBox':
            edit.Type = 'wfrDropDownList';
            edit.DropDown = { Type: 'wfrTreeList', Data: {} };
            if(typeof def.DlgItems !== 'undefined'){
              edit.DropDown.Data.Items = def.DlgItems;
            }
            break;
        }
        if(typeof def.DlgHint !== 'undefined'){
          edit.Data.Hint = def.DlgHint;
        }
        if(!def.DlgAllowEmpty){
          edit.Data.OnTextChanged = function(c){
            c.Owner.OK.SetEnabled(c.GetText() !== '');
            return true;
          };
          cdef.Controls.Buttons.Controls.OK.Data.Enabled = false;
        }
        ng_MergeDef(def, cdef);
        var c = ngCreateControlAsType(def, 'wfrMessageDlg', ref, parent);
        if(def.Type !== 'wfrDlgDropDownListBox' && def.Type !== 'wfrDlgDropDownTreeListBox'){
          c.AddEvent('OnVisibleChanged', function (c){
            var hint,edit = c.Controls.Edit;
            if(edit.OnGetHint){
              hint = ngVal(edit.OnGetHint(edit),'');
            }
            else{
              hint = edit.Hint;
            }
            if((c.Visible) && (hint=='')){
              edit.SetFocus();
            }
          });
        }
        return c;
      };

      ngRegisterControlType('wfrDlgInputBox', skinfnc.Create_wfrDlgEditBox);
      ngRegisterControlType('wfrDlgDropDownBox', skinfnc.Create_wfrDlgEditBox);
      ngRegisterControlType('wfrDlgDropDownListBox', skinfnc.Create_wfrDlgEditBox);
      ngRegisterControlType('wfrDlgDropDownTreeListBox', skinfnc.Create_wfrDlgEditBox);
      ngRegisterControlType('wfrDlgMemoBox', skinfnc.Create_wfrDlgEditBox);

      /** Class: wfrDlgListBox
       *  "Wireframe" skin list box dialog (based on <wfrMessageDlg>).
       */
      ngRegisterControlType('wfrDlgListBox', function(def,ref,parent) {
        delete def.DialogType;
        def.DlgAllowEmpty = ngVal(def.DlgAllowEmpty,false);
        var cdef = {
          DialogType: 'wfrMessageDlg',
          DlgButtons: mbOK|mbCancel,
          Data: {},
          Controls: {
            Message: {
              Data: {
                MinWidth: 300
              }
            },
            Content: {
              H: 265,
              Controls: {
                List: {
                  Type: 'wfrList',
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
        var list = cdef.Controls.Content.Controls.List;
        if(typeof def.DlgItems !== 'undefined'){
          list.Data.Items = def.DlgItems;
        }
        if(!def.DlgAllowEmpty){
          list.Data.OnSelectChanged = function(c){
            if(c.Owner.OK.SetEnabled){
              c.Owner.OK.SetEnabled(c.SelCount > 0);
            }
            return true;
          };
          cdef.Controls.Buttons.Controls.OK.Data.Enabled = false;
        }
        ng_MergeDef(def, cdef);

        var c = ngCreateControlAsType(def, 'wfrMessageDlg', ref, parent);
        c.AddEvent('OnVisibleChanged', function(c){
          if(c.Visible){
            c.Controls.List.SetFocus();
          }
        });
        return c;
      });

      /** Class: wfrDlgProgressBox
       *  "Wireframe" skin progress box dialog (based on <wfrMessageDlg>).
       */
      ngRegisterControlType('wfrDlgProgressBox', function(def,ref,parent) {

        delete def.DialogType;
        ng_MergeDef(def, {
          DlgButtons: mbNone,
          Data: {},
          Controls: {
            Message: {
              Data: {
                MinWidth: 250
              }
            },
            Content: {
              H: 30,
              Controls: {
                Progress: {
                  Type: 'wfrProgressBar',
                  L: 0, T: 5, R: 0
                }
              }
            }
          }
        });
        return ngCreateControlAsType(def, 'wfrMessageDlg', ref, parent);
      });

      /** Class: wfrDlgWaitBox
       *  "Wireframe" skin wait box dialog (based on <wfrMessageDlg>).
       */
      ngRegisterControlType('wfrDlgWaitBox', function(def,ref,parent) {

        delete def.DialogType;
        ng_MergeDef(def, {
          DlgButtons: mbNone,
          Data: {},
          Controls: {
            Message: {
              L: 45,
              Data: {}
            },
            Progress: {
              Type: 'wfrProgressDot',
              L: 15, T: 13
            },
            Content: {
              Data: {
                Visible: false
              }
            }
          }
        });
        return ngCreateControlAsType(def, 'wfrMessageDlg', ref, parent);
      });

     /** Class: wfrDlgAbout
      *  "Wireframe" skin application about dialog (based on <ngAboutDlg>).
      */
     ngRegisterControlType('wfrDlgAbout', function(def,ref,parent) {
       var cdef = {
         DialogType: 'wfrDlgMessageBox',
         DlgIcon: null,
         Controls: {
           Message: {
             className: 'wfrAboutMessage',
             Data: {
               MinWidth: 260
             }
           },
           Content: {
             H: 220,
             Controls: {
               AppInfo: {
                 Type: 'wfrTreeList',
                 H: 200,
                 Data: {
                   Frame: null,
                   DefaultIndent: 0
                 }
               }
             }
           },
           Buttons: {
             H: 47,
             Data: {
               VAlign: 'bottom'
             }
           }
         }

       };
       if((typeof def.DlgIcon === 'object') && (def.DlgIcon)){
         cdef.Controls.Message.Data.MinWidth -= (def.DlgIcon.W + 10);
       }
       ng_MergeDef(def, cdef);
       return ngCreateControlAsType(def, 'ngAboutDlg', ref, parent);
     });
    }

    /** Class: wfrProgressBar
     *  "Wireframe" skin progress bar control (based on <ngProgressBar>).
     */
    ngRegisterControlType('wfrProgressBar', function(def,ref,parent){
      if(typeof def.className === 'undefined'){
        def.className = 'wfrProgressBar';
      }
      ng_MergeDef(def, {
        Data: {
          LeftImg: WFRImages.ProgressBar.LeftImg,
          MiddleImg: WFRImages.ProgressBar.MiddleImg,
          RightImg: WFRImages.ProgressBar.RightImg,
          BarImg: WFRImages.ProgressBar.BarImg
        }
      });

      var c = ngCreateControlAsType(def, 'ngProgressBar', ref, parent);
      return c;
    });

    /** Class: wfrProgressDot
     *  "Wireframe" skin progress dot control (based on <ngText>).
     */
    ngRegisterControlType('wfrProgressDot', function(def,ref,parent){
      ng_MergeDef(def, {
        className: 'wfrLabel',
        Data: {
          TextAlign: 'center',
          HTMLEncode: false
        }
      });
      var c = ngCreateControlAsType(def, 'ngButton', ref, parent);
      if(c){
        c.AddEvent(
          function (b){
            var txt = ngVal(b.Text, '');
            if(txt !== ''){
              txt = '&nbsp;<span style="line-height: 22px">' + ng_htmlEncode(txt) + '</span>';
            }
            return '<img src="' + WireframeControls.ControlImages[3] + '" align="top" />' + txt;
          },
          'OnGetText'
        );
      }
      return c;
    });

    /**
     * Auth Controls
     */
    if (ngUserControls['auth_controls'])
    {
      /*  Class: wfrLoginForm
       *  Standard menu control (based on <ngLoginForm>).
       */
      /*<>*/
      ngRegisterControlType('wfrLoginForm', {
        Type: 'ngLoginForm',
        W: 200,
        Data: {
          VPadding: 2
        },
        Controls: {
          OrganizationLabel: {
            Type: 'wfrLabel'
          },
          Organization: {
            Type: 'wfrEdit'
          },
          LoginLabel: {
            Type: 'wfrLabel'
          },
          Login: {
            Type: 'wfrEdit'
          },
          PasswordLabel: {
            Type: 'wfrLabel'
          },
          Password: {
            Type: 'wfrEdit'
          },
          CapsLockWarn: {
            Type: 'wfrText',
            style: {
              marginBottom: '5px'
            }
          },
          RememberMe: {
            Type: 'wfrCheckBox'
          },
          LoginBtn: {
            Type: 'wfrButton',
            W: 100,
            style: {
              marginTop: '10px'
            }
          },
          Progress: {
            Type: 'wfrProgressDot',
            style: {
              marginLeft: '10px',
              marginTop: '12px'
            },
            Data: {
              Visible: false
            }
          },
          Error: {
            Type: 'wfrText',
            style: {
              marginTop: '5px'
            }
          }
        }
      });

      /*  Class: wfrPasswordForm
       *  Standard menu control (based on <ngPasswordForm>).
       */
      /*<>*/
      ngRegisterControlType('wfrPasswordForm', {
        Type: 'ngPasswordForm',
        W: 200,
        Data: {
          VPadding: 2
        },
        ModifyControls: {
          OldPasswordLabel: {
            Type: 'wfrLabel'
          },
          OldPassword: {
            Type: 'wfrEdit'
          },
          NewPasswordLabel: {
            Type: 'wfrLabel'
          },
          NewPassword: {
            Type: 'wfrEdit'
          },
          ConfirmNewPasswordLabel: {
            Type: 'wfrLabel'
          },
          ConfirmNewPassword: {
            Type: 'wfrEdit'
          },
          CapsLockWarn: {
            Type: 'wfrText',
            style: {
              marginTop: '5px'
            }
          },
          Error: {
            Type: 'wfrText',
            style: {
              marginTop: '5px'
            }
          }
        }
      });

      /*  Class: wfrLoginButton
       *  Standard menu control (based on <ngLoginButton>).
       */
      /*<>*/
      ngRegisterControlType('wfrLoginButton', {
        Type: 'ngLoginButton',
        className: 'wfrLink',
        Menu: {
          Type: 'wfrMenu'
        }
      });
    }

    /**
     * ViewModel Controls
     */
    if(ngUserControls['viewmodel_controls']){

      /** Class: wfrViewModelForm
       *  "Wireframe" skin view model form control (based on <ngViewModelForm>).
       */
      skinfnc.Create_wfrViewModelForm=function(def,ref,parent, base_type)
      {
        ng_MergeDef(def, {
          ErrorHint: {
            Type: 'wfrTextHint',
            className: 'wfrEditFieldError'
          }
        });
        var c = ngCreateControlAsType(def, ngVal(base_type,'ngViewModelForm'), ref, parent);
        if(c){
          c.AddEvent('OnShowErrorMsg', function(form,msg){
            if(typeof ngMessageDlg==='function') {
              ngMessageDlg('dlgMessageBox',msg,(typeof form.Caption === 'undefined' ? ngTxt('ngAppName') : ngTxt(form.Caption, form.Caption)), null , { DlgIcon: mbIconError });
            }
            else alert(msg);
            return true;
          });
        }
        return c;
      }

      ngRegisterControlType('wfrViewModelForm', function(def,ref,parent){
        return skinfnc.Create_wfrViewModelForm(def,ref,parent);
      });

      /** Class: wfrEditField
       *  "Wireframe" skin view model drop down control (based on <ngEditField>).
       */

      skinfnc.Create_wfrEditFieldDef=function(def)
      {
        ng_MergeDef(def,{
          Data: {
            HintX: 10,
            HintY: 17
          },
          ErrorHint: {
            Type: 'wfrTextHint',
            className: 'wfrEditFieldError',
            Data: {
              Anchor: 'topleft|bottomleft|left'
            }
          }
        });
      }

      skinfnc.Create_wfrEditField=function(def,ref,parent) {
        skinfnc.Create_wfrEditFieldDef(def);
        if(typeof def.className === 'undefined'){ def.className = 'wfrEdit'; }
        if((typeof def.DropDown !== 'undefined') && (typeof def.DropDown.className === 'undefined')){
          def.DropDown.className = 'wfrDropDown';
        }
        var c = ngCreateControlAsType(def, 'ngEditField', ref, parent);
        if(c){
          WFR.wfrEdit_AddProperties(c);
        }
        return c;
      }
      ngRegisterControlType('wfrEditField', skinfnc.Create_wfrEditField);

      /** Class: wfrSearchBoxField
       *  "Wireframe" skin view model search box field control (based on <stdSearchBox>).
       */
      ngRegisterControlType('wfrSearchBoxField', function(def,ref,parent){
        return skinfnc.Create_wfrSearchBox(def,ref,parent,'wfrEditField');
      });

      /** Class: wfrEditBoxBtnField
       *  "Wireframe" skin view model edit field control with elipsis button (based on <stdEditBoxBtn>).
       */
      ngRegisterControlType('wfrEditBoxBtnField', function(def,ref,parent){
        return skinfnc.Create_wfrEditBoxBtn(def,ref,parent,'wfrEditField');
      });

      /** Class: wfrEditNumField
       *  "Wireframe" skin view model drop down field control (based on <ngEditNumField>).
       */
      ngRegisterControlType('wfrEditNumField', function(def,ref,parent){
        skinfnc.Create_wfrEditFieldDef(def);
        return skinfnc.Create_wfrEditNum(def,ref,parent,'ngEditNumField');
      });

      /** Class: wfrColorEditField
       *  "Wireframe" skin view model color edit field control (based on <stdColorEdit>).
       */
      ngRegisterControlType('wfrColorEditField', function(def,ref,parent){
        skinfnc.Create_wfrEditFieldDef(def);
        return skinfnc.Create_wfrColorEdit(def,ref,parent,'ngDropDownField');
      });

      /** Class: wfrDropDownField
       *  "Wireframe" skin view model drop down field control (based on <ngDropDownField>).
       */
      ngRegisterControlType('wfrDropDownField', function(def,ref,parent){
        skinfnc.Create_wfrEditFieldDef(def);
        return skinfnc.Create_wfrDropDown(def,ref,parent,'ngDropDownField',false);
      });

      /** Class: wfrDropDownListField
       *  "Wireframe" skin view model drop down list field control (based on <ngDropDownListField>).
       */
      ngRegisterControlType('wfrDropDownListField', function(def,ref,parent){
        skinfnc.Create_wfrEditFieldDef(def);
        return skinfnc.Create_wfrDropDown(def,ref,parent,'ngDropDownListField',true);
      });

      if(ngUserControls['calendar'])
      {
        /** Class: wfrEditDateField
         *  "Wireframe" skin view model edit date field control (based on <ngEditDate>).
         */
        ngRegisterControlType('wfrEditDateField', function(def,ref,parent) {
          skinfnc.Create_wfrEditFieldDef(def);
          return skinfnc.Create_wfrEditDate(def,ref,parent,'ngEditDateField');
        });

        /** Class: wfrEditTimeField
         *  "Wireframe" skin view model edit date field control (based on <ngEditTime>).
         */
        ngRegisterControlType('wfrEditTimeField', function(def,ref,parent) {
          skinfnc.Create_wfrEditFieldDef(def);
          return skinfnc.Create_wfrEditTime(def,ref,parent,'ngEditTimeField');
        });
      }

      /** Class: wfrMemoField
       *  "Wireframe" skin view model memo field control (based on <ngMemoField>).
       */
      ngRegisterControlType('wfrMemoField', function(def,ref,parent) {
        skinfnc.Create_wfrEditFieldDef(def);
        return skinfnc.Create_wfrMemo(def,ref,parent,'ngMemoField');
      });
    }
  }
};

ngUserControls['wfs'] = WireframeControls;


