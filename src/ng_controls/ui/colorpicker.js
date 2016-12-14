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

// --- ngColorPicker --------------------------------------------------------------

if(typeof ngUserControls == 'undefined'){ngUserControls = {};}

ngUserControls['ngColorControls'] = {
  Lib: 'ng_controls',
  ControlsGroup: 'Core',

  OnInit: function(){
    ngRegisterControlType('ngColorPicker',ngColorPicker);
    ngRegisterControlType('ngColorPickerBox',ngColorPickerBox);
    ngRegisterControlType('ngColorButton',ngColorButton);
    ngRegisterControlType('ngColorPickerDropDown',ngColorPickerDropDown);
    ngRegisterControlType('ngColorPickerHint',ngColorPickerHint);
    ngRegisterControlType('ngColorPickerButton',ngColorPickerButton);
  }
};

/**
 *  Class: ngColorPicker
 *  Standard color picker control.
 *
 *  See also:
 *    Abstract class <ngPanel>.
 */
function ngColorPicker(def,ref,parent)
{
  ng_MergeDef(def,{
    Controls: {
      Hue_Panel: {
        Controls: {
          Hue: {
            Data: {
              ColorComponent: 'H',
              MinValue: 0, MaxValue: 360
            },
            Events: {
              OnSelect: ngcopch_OnHueSelect
            },
            Methods: {
              DrawPlane: ngcopch_DrawHue,
              GetValue: ngcopch_GetHue
            }
          },
          HueEdit: {
            Data: {
              ColorComponent: 'H',
              Precision: 2,
              MaxLength: 6,
              MinValue: 0, MaxValue: 360
            },
            Methods: {
              GetValue: ngcopch_GetHue
            }
          }
        }
      },
      Saturation_Panel: {
        Controls: {
          Saturation: {
            Data: {
              ColorComponent: 'S',
              MinValue: 0, MaxValue: 1
            },
            Events: {
              OnSelect: ngcopch_OnSaturationSelect
            },
            Methods: {
              DrawPlane: ngcopch_DrawSaturation,
              GetValue: ngcopch_GetSaturation
            }
          },
          SaturationEdit: {
            Data: {
              ColorComponent: 'S',
              Precision: 2,
              MaxLength: 4,
              MinValue: 0, MaxValue: 1
            },
            Methods: {
              GetValue: ngcopch_GetSaturation
            }
          }
        }
      },
      Value_Panel: {
        Controls: {
          Value: {
            Data: {
              ColorComponent: 'V',
              MinValue: 0, MaxValue: 1
            },
            Events: {
              OnSelect: ngcopch_OnValueSelect
            },
            Methods: {
              DrawPlane: ngcopch_DrawValue,
              GetValue: ngcopch_GetValue
            }
          },
          ValueEdit: {
            Data: {
              ColorComponent: 'V',
              Precision: 2,
              MaxLength: 4,
              MinValue: 0, MaxValue: 1
            },
            Methods: {
              GetValue: ngcopch_GetValue
            }
          }
        }
      },
      Red_Panel: {
        Controls: {
          Red: {
            Data: {
              ColorComponent: 'R',
              MinValue: 0, MaxValue: 255
            },
            Events: {
              OnSelect: ngcopch_OnRedSelect
            },
            Methods: {
              DrawPlane: ngcopch_DrawRed,
              GetValue: ngcopch_GetRed
            }
          },
          RedEdit: {
            Data: {
              ColorComponent: 'R',
              MaxLength: 3,
              MinValue: 0, MaxValue: 255
            },
            Methods: {
              GetValue: ngcopch_GetRed
            }
          }
        }
      },
      Green_Panel: {
        Controls: {
          Green: {
            Data: {
              ColorComponent: 'G',
              MinValue: 0, MaxValue: 255
            },
            Events: {
              OnSelect: ngcopch_OnGreenSelect
            },
            Methods: {
              DrawPlane: ngcopch_DrawGreen,
              GetValue: ngcopch_GetGreen
            }
          },
          GreenEdit: {
            Data: {
              ColorComponent: 'G',
              MaxLength: 3,
              MinValue: 0, MaxValue: 255
            },
            Methods: {
              GetValue: ngcopch_GetGreen
            }
          }
        }
      },
      Blue_Panel: {
        Controls: {
          Blue: {
            Data: {
              ColorComponent: 'B',
              MinValue: 0, MaxValue: 255
            },
            Events: {
              OnSelect: ngcopch_OnBlueSelect
            },
            Methods: {
              DrawPlane: ngcopch_DrawBlue,
              GetValue: ngcopch_GetBlue
            }
          },
          BlueEdit: {
            Data: {
              ColorComponent: 'B',
              MaxLength: 3,
              MinValue: 0, MaxValue: 255
            },
            Methods: {
              GetValue: ngcopch_GetBlue
            }
          }
        }
      },
      Alpha_Panel: {
        Controls: {
          Alpha: {
            Data: {
              ColorComponent: 'A',
              MinValue: 0, MaxValue: 1
            },
            Events: {
              OnSelect: ngcopch_OnAlphaSelect
            },
            Methods: {
              DrawPlane: ngcopch_DrawAlpha,
              GetValue: ngcopch_GetAlpha
            }
          },
          AlphaEdit: {
            Data: {
              ColorComponent: 'A',
              Precision: 2,
              MaxLength: 4,
              MinValue: 0, MaxValue: 1
            },
            Methods: {
              GetValue: ngcopch_GetAlpha
            }
          }
        }
      },
      Preview_Panel: {
        Controls: {
          From: {
            Events: {
              OnClick: ngcopch_OnFromPreviewClick
            }
          },
          To: {
            Events: {
              OnUpdated: ngcopch_OnToPreviewUpdated,
              OnClick: ngcopch_OnToPreviewClick
            }
          }
        }
      }
    }
  });

  ng_MergeDef(def,{
    ParentReferences: false,
    OnCreated: ngcopch_OnPickerCreated,
    /**
     *  Group: Properties
     */
    Data: {
      /**
       *  Variable: Color
       *  -
       *  Type: string/object
       *  Default value: {H:0,S:0,V:0,R:0,G:0,B:0,A:1,HEX:'#000000',HEXA:'#000000ff'}
       */
      Color: null,
      /**
       *  Variable: AutoHeight
       *  - Change height by displayed content.
       *  Type: boolean
       *  Default value: false
       */
      AutoHeight: false,

      /**
       *  Variable: AsToolbar
       *  - If create from toolbar instead of panel.
       *  Type: boolean
       *  Default value: false
       */
      AsToolbar: false,

      /**
       *  Variable: EditsUpdate_timeout
       *  - Time delay to update edit values on drag.
       *  Type: integer
       *  Default value: 1000
       */
      EditsUpdate_timeout: 1000,
      EditsUpdate_timer: null
    },
    Controls: {
      Hue_Panel: {
        Type: 'ngPanel',
        Controls: {
          Hue: ngcopch_GetSliderLayout(),
          HueEdit: ngcopch_GetEditLayout(),
          HueLabel: {
            Type: 'ngButton',
            Data: { ngTextD: 'colorpicker_hue' }
          }
        }
      },
      Saturation_Panel: {
        Type: 'ngPanel',
        Controls: {
          Saturation: ngcopch_GetSliderLayout(),
          SaturationEdit: ngcopch_GetEditLayout(),
          SaturationLabel: {
            Type: 'ngButton',
            Data: { ngTextD: 'colorpicker_saturation' }
          }
        }
      },
      Value_Panel: {
        Type: 'ngPanel',
        Controls: {
          Value: ngcopch_GetSliderLayout(),
          ValueEdit: ngcopch_GetEditLayout(),
          ValueLabel: {
            Type: 'ngButton',
            Data: { ngTextD: 'colorpicker_value' }
          }
        }
      },
      Red_Panel: {
        Type: 'ngPanel',
        Controls: {
          Red: ngcopch_GetSliderLayout(),
          RedEdit: ngcopch_GetEditLayout(),
          RedLabel: {
            Type: 'ngButton',
            Data: { ngTextD: 'colorpicker_red' }
          }
        }
      },
      Green_Panel: {
        Type: 'ngPanel',
        Controls: {
          Green: ngcopch_GetSliderLayout(),
          GreenEdit: ngcopch_GetEditLayout(),
          GreenLabel: {
            Type: 'ngButton',
            Data: { ngTextD: 'colorpicker_green' }
          }
        }
      },
      Blue_Panel: {
        Type: 'ngPanel',
        Controls: {
          Blue: ngcopch_GetSliderLayout(),
          BlueEdit: ngcopch_GetEditLayout(),
          BlueLabel: {
            Type: 'ngButton',
            Data: { ngTextD: 'colorpicker_blue' }
          }
        }
      },
      Alpha_Panel: {
        Type: 'ngPanel',
        Controls: {
          Alpha: ngcopch_GetSliderLayout(),
          AlphaEdit: ngcopch_GetEditLayout(),
          AlphaLabel: {
            Type: 'ngButton',
            Data: { ngTextD: 'colorpicker_alpha' }
          }
        }
      },
      SatVal_Panel: {
        Type: 'ngPanel',
        Controls: {
          SatVal: {
            Type: 'ngPanel',
            ParentReferences: false,
            Controls: {
              Plane: {
                Type: 'ngPanel',
                L:0,R:0,T:0,B:0,
                style: {zIndex: 1},
                innerHTML: ngcopch_GetPlaneHTML(2),
                OnCreated: ngcopch_OnPlaneCreated,
                Events: {
                  OnUpdated: ngcopch_DrawSatVal
                }
              },
              Cursor: {
                Type: 'ngPanel',
                style: {zIndex: 2},
                Events: {
                  OnUpdated: ngcopch_PositionSatValCursor
                }
              },
              ClickCatcher: {
                Type: 'ngPanel',
                L:0,R:0,T:0,B:0,
                style: {zIndex: 3},
                OnCreated: ngcopch_OnSatValClickCatcherCreated
              }
            },
            Events: {
              OnSelect: ngcopch_OnSatValSelect,
              OnEscPress: ngcopch_OnSatValEscPress
            }
          },
          SatValLabel: {
            Type: 'ngButton',
            Data: { ngTextD: 'colorpicker_satval' }
          }
        }
      },
      Hex_Panel: {
        Type: 'ngPanel',
        Controls: {
          HexEdit: {
            Type: 'ngEdit',
            Data: { MaxLength: 7 },
            Events: {
              GetValue: ngcopch_GetHex,
              OnUpdate: ngcopch_ShowHexEditValue,
              OnBlur: function(){
                return ngcopch_ValidateHexEditValue(this);
              },
              OnKeyPress: function(event,node){
                if(event.keyCode === 13){
                  return ngcopch_ValidateHexEditValue(this);
                }
                return true;
              }
            }
          },
          HexLabel: {
            Type: 'ngButton',
            Data: { ngTextD: 'colorpicker_hex' }
          },
          AHexEdit: {
            Type: 'ngEdit',
            Data: { MaxLength: 9 },
            Events: {
              GetValue: ngcopch_GetAHex,
              OnUpdate: ngcopch_ShowHexEditValue,
              OnBlur: function(){
                return ngcopch_ValidateHexEditValue(this);
              },
              OnKeyPress: function(event,node){
                if(event.keyCode === 13){
                  return ngcopch_ValidateHexEditValue(this);
                }
                return true;
              }
            }
          },
          AHexLabel: {
            Type: 'ngButton',
            Data: { ngTextD: 'colorpicker_alphahex' }
          }
        }
      },
      Preview_Panel: {
        Type: 'ngPanel',
        Controls: {
          From: { Type: 'ngColorButton' },
          FromLabel: {
            Type: 'ngButton',
            Data: { ngTextD: 'colorpicker_from' }
          },
          To: { Type: 'ngColorButton' },
          ToLabel: {
            Type: 'ngButton',
            Data: { ngTextD: 'colorpicker_to' }
          }
        }
      }
    },
    /**
     *  Group: Methods
     */
    Metods: {
      /**
       *  Function: ShowHSV
       *  - set color, which color picker should be set to
       *
       *  Syntax:
       *    object *ShowHSV* (float/null hue, float/null saturation, float/null value)
       *
       *  Parameters:
       *    hue - null if do not set hue
       *    saturation - null if do not set saturation
       *    value - null if do not set value
       *
       *  Returns:
       *    {H:0-360, S:0-1, V:0-1, R:0-255, G:0-255, B:0-255, A:0-1, HEX:#??????, HEXA:#????????}
       */
      ShowHSV: ngcopch_ShowHSV,
      /**
       *  Function: ShowRGB
       *  - set color, which color picker should be set to
       *
       *  Syntax:
       *    object *ShowRGB* (integer/null red, integer/null green, integer/null blue)
       *
       *  Parameters:
       *    red - null if do not set red
       *    green - null if do not set green
       *    blue - null if do not set blue
       *
       *  Returns:
       *    {H:0-360, S:0-1, V:0-1, R:0-255, G:0-255, B:0-255, A:0-1, HEX:#??????, HEXA:#????????}
       */
      ShowRGB: ngcopch_ShowRGB,
      /**
       *  Function: ShowHEX
       *  - set color, which color picker should be set to
       *
       *  Syntax:
       *    object *ShowHEX* (string hexColor)
       *
       *  Parameters:
       *    hexColor -
       *
       *  Returns:
       *    {H:0-360, S:0-1, V:0-1, R:0-255, G:0-255, B:0-255, A:0-1, HEX:#??????, HEXA:#????????}
       */
      ShowHEX: ngcopch_ShowHEX,
      /**
       *  Function: SetColorHSV
       *  - set starting color, color picker will be set to this color too
       *
       *  Syntax:
       *    object *SetColorHSV* (float/null hue, float/null saturation, float/null value)
       *
       *  Parameters:
       *    hue - null if do not set hue
       *    saturation - null if do not set saturation
       *    value - null if do not set value
       *
       *  Returns:
       *    {H:0-360, S:0-1, V:0-1, R:0-255, G:0-255, B:0-255, A:0-1, HEX:#??????, HEXA:#????????}
       */
      SetColorHSV: ngcopch_SetHSVColor,
      /**
       *  Function: SetColorRGB
       *  - set starting color, color picker will be set to this color too
       *
       *  Syntax:
       *    object *SetColorRGB* (integer/null red, integer/null green, integer/null blue)
       *
       *  Parameters:
       *    red - null if do not set red
       *    green - null if do not set green
       *    blue - null if do not set blue
       *
       *  Returns:
       *    {H:0-360, S:0-1, V:0-1, R:0-255, G:0-255, B:0-255, A:0-1, HEX:#??????, HEXA:#????????}
       */
      SetColorRGB: ngcopch_SetRGBColor,
      /**
       *  Function: SetColorHEX
       *  - set starting color, color picker will be set to this color too
       *
       *  Syntax:
       *    object *SetColorHEX* (string hexColor)
       *
       *  Parameters:
       *    hexColor -
       *
       *  Returns:
       *    {H:0-360, S:0-1, V:0-1, R:0-255, G:0-255, B:0-255, A:0-1, HEX:#??????, HEXA:#????????}
       */
      SetColorHEX: ngcopch_SetHEXColor,
      /**
       *  Function: GetColor
       *  - get actual shown color
       *
       *  Syntax:
       *    object *GetColor* ()
       *
       *  Parameters:
       *
       *  Returns:
       *    {H:0-360, S:0-1, V:0-1, R:0-255, G:0-255, B:0-255, A:0-1, HEX:#??????, HEXA:#????????}
       */
      GetColor: ngcop_GetColor
    },
    /**
     *  Group: Events
     */
    Events: {
      /**
       *  Function: OnColorChanging
       *  -
       *
       *  Syntax:
       *    boolean *OnColorChanging* (object color)
       *
       *  Parameters:
       *    color - {H:0-360, S:0-1, V:0-1, R:0-255, G:0-255, B:0-255, A:0-1, HEX:#??????, HEXA:#????????}
       *
       *  Returns:
       *    - if change
       */
      OnColorChanging: null,
      /**
       *  Function: OnColorChanged
       *  -
       *
       *  Syntax:
       *    void *OnColorChanged* (object color)
       *
       *  Parameters:
       *    color - {H:0-360, S:0-1, V:0-1, R:0-255, G:0-255, B:0-255, A:0-1, HEX:#??????, HEXA:#????????}
       *
       *  Returns:
       *    -
       */
      OnColorChanged: null,

      OnUpdated: (def.Data && def.Data.AsToolbar )
        ? ngcopch_AutoHeight_Toolbar : ngcopch_AutoHeight_Panel
    }
  });

  ngcop_SetDefColor(def,{H:0,S:0,V:0,R:0,G:0,B:0,A:1,HEX:'#000000',HEXA:'#000000ff'});

  return ngCreateControlAsType(
    def,(def.Data.AsToolbar) ? 'ngToolBar' : 'ngPanel',ref,parent
  );
}

/**
 * GET SLIDER LAYOUT
 * @returns (object)
 */
function ngcopch_GetSliderLayout()
{
  return {
    Type: 'ngPanel',
    ParentReferences: false,
    Data: {
      Vertical: false,
      PaddingH: 0, PaddingV: 0,
      MinValue: 0, MaxValue: 0,
      WithEditBounds: null,
      WithoutEditBounds: null
    },
    Controls: {
      Plane: {
        Type: 'ngPanel',
        L:0,R:0,T:0,B:0,
        style: { zIndex: 1 },
        innerHTML: ngcopch_GetPlaneHTML(),
        OnCreated: ngcopch_OnPlaneCreated,
        Events: {
          OnUpdated: ngcopch_DrawSlider
        },
        Methods: {
          GetImg: ngc_GetImg
        }
      },
      Cursor: {
        Type: 'ngPanel',
        style: {zIndex: 2},
        Events: {
          OnUpdated: ngcopch_PositionSliderCursor
        }
      },
      ClickCatcher: {
        Type: 'ngPanel',
        L:0,R:0,T:0,B:0,
        style: {zIndex: 3},
        OnCreated: ngcopch_OnSliderClickCatcherCreated
      }
    },
    Events: {
      OnEscPress: ngcopch_OnSliderEscPress
    }
  };
}

/**
 * GET EDIT LAYOUT
 * @returns (object)
 */
function ngcopch_GetEditLayout()
{
  return {
    Type: 'ngEdit',
    Data: {
      Precision: 0,
      MinValue: 0, MaxValue: 0
    },
    Events: {
      OnUpdate: ngcopch_ShowEditValue,
      OnBlur: ngcopch_OnEditBlur,
      OnKeyPress: ngcopch_OnEditKeyPress
    }
  };
}

/**
 * VALIDATE ON EDIT BLUR
 * @returns (boolean)
 */
function ngcopch_OnEditBlur()
{
  return ngcopch_ValidateEditValue(this);
}

/**
 * VALIDATE ON EDIT ENTER PRESS
 * @param event (object)
 * @returns (boolean)
 */
function ngcopch_OnEditKeyPress(event)
{
  if(event.keyCode === 13){
    return ngcopch_ValidateEditValue(this);
  }
  return true;
}

/**
 * GET PLANE INNER HTML
 * @param shapesCnt (integer)
 * @returns (string)
 */
function ngcopch_GetPlaneHTML(shapesCnt)
{
  if(ngIExplorer && (ngIExplorerVersion < 10)){
    shapesCnt = ng_toInteger(shapesCnt,1);
    var shape = '<v:rect stroked=False filled=True style="display:block;position:absolute">'
      + '<v:fill opacity="1"></v:fill>'
    + '</v:rect>';

    var html = '';
    for(var i=0;i<shapesCnt;i++){
      html +=shape;
    }
    return html;
  }
  else{
    return '<canvas></canvas>';
  }
}

ngcopch_ColorPickers = new Array();
/**
 * DO ON COLOR PICKER CREATED
 * @param picker (ngColorPicker)
 */
function ngcopch_OnPickerCreated(picker)
{
  ngcopch_ColorPickers.push(picker);
  if(typeof window.addEventListener === 'function'){
    window.addEventListener("keydown",ngcopch_OnKeyDown,true);
  }
  else if(typeof window.attachEvent === 'function'){
    window.attachEvent('onkeydown',ngcopch_OnKeyDown);
  }

  if(picker.Color){
    ngcob_SetButtonColor(
        picker.Controls.From,
        picker.Color
      );
  }
  return true;
}

/**
 * DO ON PLANE CREATED
 * @param plane (ngPanel)
 */
function ngcopch_OnPlaneCreated(plane)
{
  var node = plane.Elm();

  if(ngIExplorer && (ngIExplorerVersion < 10)){

    var childs = node.children;
    for(var i=0;i<childs.length;i++){
      var shape = childs[i];
      shape.id = plane.ID + '_Shape' + (i+1);
    }
  }
  else{
    var canvas = node.getElementsByTagName('canvas').item(0);
    canvas.id = plane.ID + '_Canvas';
  }

  var parentPanel = plane.ParentControl;

  var padV = ng_toInteger(parentPanel.PaddingV,0);
  var padH = ng_toInteger(parentPanel.PaddingH,0);

  plane.SetBounds({ L:padH, T:padV, R:padH, B:padV });

  return true;
}

/**
 * DO ON SLIDER CLICK CATCHER CREATED
 * @param panel (ngPanel)
 */
function ngcopch_OnSliderClickCatcherCreated(panel)
{
  ngc_PtrEvents(panel,'slider','drag tap');

  panel.GetPointerPos = ngc_GetPointerPos;
  panel.OnPtrStart = ngcopch_OnSliderSelectStart;
  panel.OnPtrDrag = ngcopch_OnSliderSelectDrag;
  panel.OnPtrEnd = ngcopch_OnSliderSelectEnd;

  var slider = panel.ParentControl;
  var padV = ng_toInteger(slider.PaddingV,0);
  var padH = ng_toInteger(slider.PaddingH,0);

  panel.SetBounds({ L:padH, T:padV, R:padH, B:padV });

  return true;
}

/**
 * DO ON SATURATION/VALUE CLICK CATCHER CREATED
 * @param panel (ngPanel)
 */
function ngcopch_OnSatValClickCatcherCreated(panel)
{
  ngc_PtrEvents(panel,'satval','drag tap');

  panel.GetPointerPos =  ngc_GetPointerPos;
  panel.OnPtrStart = ngcopch_OnSatValSelectStart;
  panel.OnPtrDrag = ngcopch_OnSatValSelectDrag;
  panel.OnPtrEnd = ngcopch_OnSatValSelectEnd;

  var satVal = panel.ParentControl;
  var padV = ng_toInteger(satVal.PaddingV,0);
  var padH = ng_toInteger(satVal.PaddingH,0);

  panel.SetBounds({ L:padH, T:padV, R:padH, B:padV });
  return true;
}

/**
 * DO ON KEY DOWN
 * @param event (object)
 */
function ngcopch_OnKeyDown(event)
{
  if(
    (typeof ngcopch_ColorPickers !== 'object')
    || (ngcopch_ColorPickers === null)
  ){return true;}

  for(var i in ngcopch_ColorPickers){

    var picker = ngcopch_ColorPickers[i];

    switch(event.keyCode){
      case 27:
        if(
          (typeof picker.Dragged === 'object') && (picker.Dragged !== null)
          && (typeof picker.Dragged.OnEscPress === 'function')
        ){
          picker.Dragged.OnEscPress();
        }
        break;
    }

  }
  return true;
}

/**
 * GET SLIDER SELECT VALUE
 * @param panel (ngPanel)
 * @param event (object)
 */
function ngcopch_GetSliderSelectValue(panel,event)
{
  if(typeof panel.PointerInfo !== 'object'){return false;}
  var info = panel.PointerInfo;
  var panelNode = info.StartElement;
  var parentPanel = panel.ParentControl;

  ng_BeginMeasureElement(panelNode);
  var panelSize = (parentPanel.Vertical) ? ng_ClientHeight(panelNode) : ng_ClientWidth(panelNode);
  var panelPos = ng_ParentPosition(panelNode);
  ng_EndMeasureElement(panelNode);

  var minVal = ng_toFloat(parentPanel.MinValue,0);
  var maxVal = ng_toFloat(parentPanel.MaxValue,0);

  var clickPos = (parentPanel.Vertical) ? (event.Y-panelPos.y) : (event.X-panelPos.x);
  var value = (panelSize === 0) ? 0 : ((maxVal-minVal) * (clickPos/panelSize)) + minVal;

  if(value < minVal){value = minVal;}
  else if(value > maxVal){value = maxVal;}
  return value;
}

/**
 * SET CANVAS SIZE
 * @param canvas (object)
 * @param w (number)
 * @param h (number)
 */
function ngcopch_SetCanvasSize(canvas,w,h)
{
  if(ngIExplorer && (ngIExplorerVersion < 10)){
    canvas.style.width = (w-1) + 'px';
    canvas.style.height = (h-1) + 'px';
    canvas.style.left = '0px';
    canvas.style.top = '0px';
  }
  else{
    canvas.width = w;
    canvas.height = h;
  }
}

/**
 * DO ON HUE CURSOR UPDATED
 * @param cursor (ngPanel)
 * @param node (object)
 */
function ngcopch_PositionSliderCursor(cursor,node)
{
  var parentPanel = cursor.ParentControl;

  var value = 0;
  if(typeof parentPanel.GetValue === 'function'){
    value = parentPanel.GetValue();
  }
  else{return true;}

  var vertical = parentPanel.Vertical;

  var parentNode = parentPanel.Elm();
  ng_BeginMeasureElement(parentNode);
  var size = (vertical) ? ng_ClientHeight(parentNode) : ng_ClientWidth(parentNode);
  ng_EndMeasureElement(parentNode);

  var w = (typeof cursor.Bounds.W === 'number') ? cursor.Bounds.W : 0;
  var h = (typeof cursor.Bounds.H === 'number') ? cursor.Bounds.H : 0;

  var padH = ng_toInteger(parentPanel.PaddingH,0);
  var padV = ng_toInteger(parentPanel.PaddingV,0);

  size -= ((vertical) ? padV : padH)*2;

  var minVal = ng_toInteger(parentPanel.MinValue,0);
  var maxVal = ng_toInteger(parentPanel.MaxValue,0);

  var pos = Math.round(size * (value-minVal) / (maxVal-minVal));
  pos += (vertical) ? padV : padH;
  pos -= ((vertical) ? h : w)/2;

  cursor.SetBounds({
    L: (vertical) ? 0 : pos,
    T: (vertical) ? pos : 0
  });

  return true;
}

/**
 * DO ON SATURATION/VALUE CURSOR UPDATED
 * @param cursor (ngPanel)
 * @param node (object)
 */
function ngcopch_PositionSatValCursor(cursor,node)
{
  var satValPanel = cursor.ParentControl;
  var color = satValPanel.Owner.Owner.GetColor();
  var saturation = ng_toFloat(color.S,0);
  if(saturation < 0){saturation = 0;}
  else if(saturation > 1){saturation = 1;}

  var value = ng_toFloat(color.V,0);
  if(value < 0){value = 0;}
  else if(value > 1){value = 1;}

  var satValNode = satValPanel.Elm();
  ng_BeginMeasureElement(satValNode);
  var satValW = ng_ClientWidth(satValNode);
  var satValH = ng_ClientHeight(satValNode);
  ng_EndMeasureElement(satValNode);

  var w = (typeof cursor.Bounds.W === 'number') ? cursor.Bounds.W : 0;
  var h = (typeof cursor.Bounds.H === 'number') ? cursor.Bounds.H : 0;

  var top = satValH*(1-value);
  var left = satValW*(saturation);

  cursor.SetBounds({
    L: left-(h/2),
    T: top-(w/2)
  });

  return true;
}

/**
 * GET HUE
 * @returns (number)
 */
function ngcopch_GetHue()
{
  return ng_toFloat(this.Owner.Owner.GetColor().H,0);
}

/**
 * GET SATURATION
 * @returns (number)
 */
function ngcopch_GetSaturation()
{
  return ng_toFloat(this.Owner.Owner.GetColor().S,0);
}

/**
 * GET VALUE
 * @returns (number)
 */
function ngcopch_GetValue()
{
  return ng_toFloat(this.Owner.Owner.GetColor().V,0);
}

/**
 * GET RED
 * @returns (number)
 */
function ngcopch_GetRed()
{
  return ng_toInteger(this.Owner.Owner.GetColor().R,0);
}

/**
 * GET GREEN
 * @returns (number)
 */
function ngcopch_GetGreen()
{
  return ng_toInteger(this.Owner.Owner.GetColor().G,0);
}

/**
 * GET BLUE
 * @returns (number)
 */
function ngcopch_GetBlue()
{
  return ng_toInteger(this.Owner.Owner.GetColor().B,0);
}

/**
 * GET ALPHA
 * @returns (number)
 */
function ngcopch_GetAlpha()
{
  return ng_toFloat(this.Owner.Owner.GetColor().A,100);
}

/**
 * GET HEX
 * @returns (string)
 */
function ngcopch_GetHex()
{
  return ng_toString(this.Owner.Owner.GetColor().HEX,'');
}

/**
 * GET HEX WITH ALPHA CHANNEL
 * @returns (string)
 */
function ngcopch_GetAHex()
{
  return ng_toString(this.Owner.Owner.GetColor().HEXA,'');
}

/**
 * DRAW SLIDER PLANE
 * @param plane (ngPanel)
 * @param node (object)
 */
function ngcopch_DrawSlider(plane,node)
{
  ng_BeginMeasureElement(node);
  var w = ng_ClientWidth(node);
  var h = ng_ClientHeight(node);
  ng_EndMeasureElement(node);

  var parentPanel = this.ParentControl;
  var vertical = parentPanel.Vertical;

  var useShape = (ngIExplorer && (ngIExplorerVersion < 10));

  var canvas = document.getElementById(
    plane.ID + ((useShape) ? '_Shape1' : '_Canvas')
  );
  if(!canvas){return false;}

  if(typeof parentPanel.DrawPlane === 'function'){
    return parentPanel.DrawPlane(plane,canvas,w,h,vertical);
  }

  return true;
}

/**
 * DRAW SLIDER GRADIENT ON PLANE
 * @param plane (ngPanel)
 * @param canvas (object)
 * @param w (number)
 * @param h (number)
 * @param vertical (boolean)
 * @param colors (array)
 */
function ngcopch_DrawSliderGradient(
  plane,canvas,w,h,vertical,colors
){
  var red,green,blue,color,pos;

  if(ngIExplorer && (ngIExplorerVersion < 10)){

    var fill = canvas.children[0];
    fill.type = 'gradient';
    fill.method= 'sigma';
    fill.angle = (vertical) ? "0" : "90";

    var fillColors = new Array();

    for(var i=colors.length;i>0;i--){

      red = ng_toInteger(colors[i-1].R,0);
      green = ng_toInteger(colors[i-1].G,0);
      blue = ng_toInteger(colors[i-1].B,0);
      color = 'rgb('+red+','+green+','+blue+')';
      if(i === colors.length){fill.color = color;}
      else if(i === 1){fill.color2 = color;}
      else{
        pos = (i === 0) ? 0 : 1-((i-1) / (colors.length-1));
        fillColors.push(pos+' '+color);
      }

    }

    fill.colors.value = fillColors.join(',');

  }else{

    if(!canvas.getContext){return false;}
    var ctx = canvas.getContext("2d");

    var gradient = (vertical)
      ? ctx.createLinearGradient(0,0,0,h)
      : ctx.createLinearGradient(0,0,w,0);

    for(var j=0;j<colors.length;j++){

      red = ng_toInteger(colors[j].R,0);
      green = ng_toInteger(colors[j].G,0);
      blue = ng_toInteger(colors[j].B,0);
      color = 'rgb('+red+','+green+','+blue+')';
      pos = (j === 0) ? 0 : j/(colors.length-1);
      gradient.addColorStop(pos,color);

    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,w,h);
  }
}

/**
 * DRAW HUE PLANE
 * @param plane (ngPanel)
 * @param canvas (object)
 * @param w (number)
 * @param h (number)
 * @param vertical (boolean)
 */
function ngcopch_DrawHue(plane,canvas,w,h,vertical)
{
  if(
    (w === plane.Width) && (h === plane.Height)
    && (vertical === plane.Vertical)
  ){return true;}

  plane.Width = w;
  plane.Height = h;
  plane.Vertical = vertical;

  ngcopch_SetCanvasSize(canvas,w,h);

  ngcopch_DrawSliderGradient(
    plane,canvas,w,h,vertical,
    [
      {R:255,G:0,B:0},{R:255,G:255,B:0},{R:0,G:255,B:0},
      {R:0,G:255,B:255},{R:0,G:0,B:255},{R:255,G:0,B:255},
      {R:255,G:0,B:0}
    ]
  );

  return true;
}

/**
 * DRAW SATURATION PLANE
 * @param plane (ngPanel)
 * @param canvas (object)
 * @param w (number)
 * @param h (number)
 * @param vertical (boolean)
 */
function ngcopch_DrawSaturation(plane,canvas,w,h,vertical)
{
  var color = plane.ParentControl.Owner.Owner.GetColor();
  var hue = ng_toFloat(color.H,0);
  var value = ng_toFloat(color.V,0);

  if(
    (w === plane.Width) && (h === plane.Height)
    && (vertical === plane.Vertical)
    && (hue === plane.Hue) && (value === plane.Value)
  ){return true;}

  plane.Width = w;
  plane.Height = h;
  plane.Vertical = vertical;
  plane.Hue = hue;
  plane.Value = value;

  var startColor = ColorsConverter.HSVToRGB(hue,0,value);
  var endColor = ColorsConverter.HSVToRGB(hue,1,value);

  if((startColor === null) || (endColor === null)){return false;}

  ngcopch_SetCanvasSize(canvas,w,h);

  ngcopch_DrawSliderGradient(
    plane,canvas,w,h,vertical,
    [startColor,endColor]
  );

  return true;
}

/**
 * DRAW VALUE PLANE
 * @param plane (ngPanel)
 * @param canvas (object)
 * @param w (number)
 * @param h (number)
 * @param vertical (boolean)
 */
function ngcopch_DrawValue(plane,canvas,w,h,vertical)
{
  var color = plane.ParentControl.Owner.Owner.GetColor();
  var hue = ng_toFloat(color.H,0);
  var saturation = ng_toFloat(color.S,0);

  if(
    (w === plane.Width) && (h === plane.Height)
    && (vertical === plane.Vertical)
    && (hue === plane.Hue) && (saturation === plane.Saturation)
  ){return true;}

  plane.Width = w;
  plane.Height = h;
  plane.Vertical = vertical;
  plane.Hue = hue;
  plane.Saturation = saturation;

  var startColor = ColorsConverter.HSVToRGB(hue,saturation,0);
  var endColor = ColorsConverter.HSVToRGB(hue,saturation,1);
  if((startColor === null) || (endColor === null)){return false;}

  ngcopch_SetCanvasSize(canvas,w,h);

  ngcopch_DrawSliderGradient(
    plane,canvas,w,h,vertical,
    [startColor,endColor]
  );

  return true;
}

/**
 * DRAW RED PLANE
 * @param plane (ngPanel)
 * @param canvas (object)
 * @param w (number)
 * @param h (number)
 * @param vertical (boolean)
 */
function ngcopch_DrawRed(plane,canvas,w,h,vertical)
{
  var color = plane.ParentControl.Owner.Owner.GetColor();
  var green = ng_toInteger(color.G,0);
  var blue = ng_toInteger(color.B,0);

  if(
    (w === plane.Width) && (h === plane.Height)
    && (vertical === plane.Vertical)
    && (green === plane.Green) && (blue === plane.Blue)
  ){return true;}

  plane.Width = w;
  plane.Height = h;
  plane.Vertical = vertical;
  plane.Green = green;
  plane.Blue = blue;

  ngcopch_SetCanvasSize(canvas,w,h);

  ngcopch_DrawSliderGradient(
    plane,canvas,w,h,vertical,
    [{R:0,G:green,B:blue},{R:255,G:green,B:blue}]
  );

  return true;
}

/**
 * DRAW GREEN PLANE
 * @param plane (ngPanel)
 * @param canvas (object)
 * @param w (number)
 * @param h (number)
 * @param vertical (boolean)
 */
function ngcopch_DrawGreen(plane,canvas,w,h,vertical)
{
  var color = plane.ParentControl.Owner.Owner.GetColor();
  var red = ng_toInteger(color.R,0);
  var blue = ng_toInteger(color.B,0);

  if(
    (w === plane.Width) && (h === plane.Height)
    && (vertical === plane.Vertical)
    && (red === plane.Red) && (blue === plane.Blue)
  ){return true;}

  plane.Width = w;
  plane.Height = h;
  plane.Vertical = vertical;
  plane.Red = red;
  plane.Blue = blue;

  ngcopch_SetCanvasSize(canvas,w,h);

  ngcopch_DrawSliderGradient(
    plane,canvas,w,h,vertical,
    [{R:red,G:0,B:blue},{R:red,G:255,B:blue}]
  );

  return true;
}

/**
 * DRAW BLUE PLANE
 * @param plane (ngPanel)
 * @param canvas (object)
 * @param w (number)
 * @param h (number)
 * @param vertical (boolean)
 */
function ngcopch_DrawBlue(plane,canvas,w,h,vertical)
{
  var color = plane.ParentControl.Owner.Owner.GetColor();
  var red = ng_toInteger(color.R,0);
  var green = ng_toInteger(color.G,0);

  if(
    (w === plane.Width) && (h === plane.Height)
    && (vertical === plane.Vertical)
     && (red === plane.Red) && (green === plane.Green)
   ){return true;}

  plane.Width = w;
  plane.Height = h;
  plane.Vertical = vertical;
  plane.Red = red;
  plane.Green = green;

  ngcopch_SetCanvasSize(canvas,w,h);

  ngcopch_DrawSliderGradient(
    plane,canvas,w,h,vertical,
    [{R:red,G:green,B:0},{R:red,G:green,B:255}]
  );

  return true;
}

/**
 * DRAW ALPHA PLANE
 * @param plane (ngPanel)
 * @param canvas (object)
 * @param w (number)
 * @param h (number)
 * @param vertical (boolean)
 */
function ngcopch_DrawAlpha(plane,canvas,w,h,vertical)
{
  ngcop_DrawTransparentBackground(plane.Elm(),plane.GetImg());

  var color = plane.ParentControl.Owner.Owner.GetColor();
  var red = ng_toInteger(color.R,0);
  var green = ng_toInteger(color.G,0);
  var blue = ng_toInteger(color.B,0);

  if(
    (w === plane.Width) && (h === plane.Height)
    && (vertical === plane.Vertical)
     && (red === plane.Red) && (green === plane.Green) && (blue === plane.Blue)
   ){return true;}

  plane.Width = w;
  plane.Height = h;
  plane.Vertical = vertical;
  plane.Red = red;
  plane.Green = green;
  plane.Blue = blue;

  ngcopch_SetCanvasSize(canvas,w,h);

  if(ngIExplorer && (ngIExplorerVersion < 10)){

    var fill = canvas.children[0];
    fill.type = 'gradient';
    fill.method = 'sigma';
    fill.angle = (vertical) ? "0" : "270";

    fill.color2 = 'rgb('+red+','+green+','+blue+')';
    fill.color = fill.color2;
    fill.opacity = '100%';
    fill.opacity2 = '0%';

  }else{

    if(!canvas.getContext){return false;}
    var ctx = canvas.getContext("2d");

    var gradient = (vertical)
      ? ctx.createLinearGradient(0,0,0,h)
      : ctx.createLinearGradient(0,0,w,0);

    gradient.addColorStop(0,'transparent');
    gradient.addColorStop(1,'rgb('+red+','+green+','+blue+')');

    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,w,h);
  }

  return true;
}

/**
 * DRAW SATURATION/VALUE PLANE
 * @param plane (ngPanel)
 * @param node (object)
 */
function ngcopch_DrawSatVal(plane,node)
{
  ng_BeginMeasureElement(node);
  var w = ng_ClientWidth(node);
  var h = ng_ClientHeight(node);
  ng_EndMeasureElement(node);

  var color = this.ParentControl.Owner.Owner.GetColor();
  var hue = ng_toFloat(color.H,0);

  if((hue === this.Hue) && (w === this.Width) && (h === this.Height)){
    return true;
  }

  this.Hue = hue;
  this.Width = w;
  this.Height = h;

  var hueColor = ColorsConverter.HSVToRGB(hue,1,1);
  if(hueColor === null){return false;}

  var useShape = (ngIExplorer && (ngIExplorerVersion < 10));

  var canvas = null;
  var shape1 = null;
  var shape2 = null;

  if(useShape){
    shape1 = document.getElementById(plane.ID + '_Shape1');
    shape2 = document.getElementById(plane.ID + '_Shape2');
    if(!shape1 || !shape2){return false;}

    ngcopch_SetCanvasSize(shape1,w,h);
    ngcopch_SetCanvasSize(shape2,w,h);
  }
  else{
    canvas = document.getElementById(plane.ID +  '_Canvas');
    if(!canvas){return false;}

    ngcopch_SetCanvasSize(canvas,w,h);
  }

  if((w === 0) || (h === 0)){return true;}

  if(useShape){

    shape1.style.zIndex = '1';
    var fill1 = shape1.children[0];
    fill1.type = 'gradient';
    fill1.method = 'sigma';
    fill1.angle = "90";

    fill1.color = 'rgb('+hueColor.R+','+hueColor.G+','+hueColor.B+')';
    fill1.color2 = 'rgb(255,255,255)';

    shape2.style.zIndex = '2';
    var fill2 = shape2.children[0];
    fill2.type = 'gradient';
    fill2.method = 'linear';
    fill2.angle = "180";

    fill2.color2 = 'rgb(0,0,0)';
    fill2.color = 'rgb(255,255,255)';
    fill2.opacity = '100%';
    fill2.opacity2 = '0%';

  }else{
    if(!canvas.getContext){return false;}
    var ctx = canvas.getContext("2d");

    var satGrd = ctx.createLinearGradient(0,0,w,0);
    satGrd.addColorStop(0,'rgb(255,255,255)');
    satGrd.addColorStop(1,'rgb('+hueColor.R+','+hueColor.G+','+hueColor.B+')');

    ctx.fillStyle = satGrd;
    ctx.fillRect(0,0,w,h);

    var valGrd = ctx.createLinearGradient(0,0,0,h);
    valGrd.addColorStop(0,'transparent');
    valGrd.addColorStop(1,'rgb(0,0,0)');

    ctx.fillStyle = valGrd;
    ctx.fillRect(0,0,w,h);
  }

  return true;
}

/**
 * SHOW EDIT VALUE
 * @param edit (ngEdit)
 */
function ngcopch_ShowEditValue(edit)
{
  if(edit.Invalid){return true;}
  var value = 0;
  if(typeof edit.GetValue === 'function'){
    value = edit.GetValue();
  }

  if(typeof edit.Precision === 'number'){
    var multiplier = Math.pow(10,edit.Precision);
    value = Math.round(value*multiplier) / multiplier;
  }

  edit.SetText(value.toString());
  return true;
}

/**
 * SHOW HEX EDIT VALUE
 * @param edit (ngEdit)
 */
function ngcopch_ShowHexEditValue(edit)
{
  if(edit.Invalid){return true;}
  var value = '';
  if(typeof edit.GetValue === 'function'){
    value = edit.GetValue();
  }

  edit.SetText(value.toString().toUpperCase());
  return true;
}


/**
 * VALIDATE EDIT VALUE
 * @param edit (ngEdit)
 */
function ngcopch_ValidateEditValue(edit)
{
  var text = edit.GetText();

  var minVal = ng_toFloat(edit.MinValue,0);
  var maxVal = ng_toFloat(edit.MaxValue,0);

  var value = NaN;
  if((text === '') || (text === '.')){
    value = minVal;
  }
  else{
    if(text.substring(text.length-1,text.length) === '.'){
      text = text.substring(0,text.length-1);
    }
    value = parseFloat(text.match(/^-?\d*(\.\d+)?$/));
  }

  if(!isNaN(value) && ((value < minVal) || (value > maxVal))){
    value = NaN;
  }

  if(isNaN(value)){
    edit.SetInvalid(true);
    return true;
  }
  else{
    if(typeof edit.Precision === 'number'){
      var multiplier = Math.pow(10,edit.Precision);
      value = Math.round(value*multiplier) / multiplier;
    }

    edit.SetText(value.toString());
    edit.SetInvalid(false);

    var target = edit.ColorComponent;
    if(typeof target !== 'string'){return true;}

    var picker = edit.Owner.Owner;
    var color = ngcopch_ChangeColorByTarget(picker,value,target);

    ngcopch_SelectedColorChanged(picker,color);
  }

  return true;
}

/**
 * VALIDATE HEX EDIT VALUE
 * @param edit (ngEdit)
 */
function ngcopch_ValidateHexEditValue(edit)
{
  var text = edit.GetText();

  var firstL = text.substring(0,1);
  if(firstL !== '#'){ text = '#'+text; }

  var maxLng = edit.MaxLength;

  if(((text.length === 7) || (text.length === 9)) && (text.length === maxLng)){

    var rgb = (maxLng === 7)
      ? ColorsConverter.HexToRGB(text)
      : ColorsConverter.HexToRGBA(text);

    if(rgb){
      edit.SetInvalid(false);

      var picker = edit.Owner.Owner;
      var color = picker.GetColor();

      var color = {
        R:rgb.R, G:rgb.G, B:rgb.B,
        A: ((maxLng === 7) ? color.A : rgb.A)
      };
      color = ngcop_RecalculateHSV(color);
      color = ngcop_RecalculateHEX(color);

      text = text.toUpperCase();

      if(
        ((maxLng === 7) && (text === color.HEX.toUpperCase()))
        || (text === color.HEXA.toUpperCase())
      ){
        ngcopch_ChangeSelectedColor(picker,color);

        if(maxLng === 7){
          ngcopch_UpdateHex(picker,true,true);
        }
        else{
          ngcopch_UpdateAll(picker,true,true);
        }

        edit.SetText(text);
        ngcopch_SelectedColorChanged(picker,color);

        return true;
      }
    }
  }

  edit.SetInvalid(true);
  return true;
}

/**
 * DO ON SELECTION START
 * @param panel (ngPanel)
 * @param event (object)
 */
function ngcopch_OnSliderSelectStart(panel,event)
{
  var slider = panel.ParentControl;
  var picker = slider.Owner.Owner;
  slider.SelectStartValue = (typeof slider.GetValue === 'function') ? slider.GetValue() : 0;
  picker.Dragged = slider;
  return true;
}

/**
 * DO SATURATION/VALUE SELECTION START
 * @param panel (ngPanel)
 * @param event (object)
 */
function ngcopch_OnSatValSelectStart(panel,event)
{
  var satVal = panel.ParentControl;
  var picker = satVal.Owner.Owner;
  var color = picker.GetColor();
  satVal.SelectStartSaturation = ng_toFloat(color.S,0);
  satVal.SelectStartValue = ng_toFloat(color.V,0);
  picker.Dragged = satVal;
  return true;
}

/**
 * DO ON SELECTION DRAG
 * @param panel (ngPanel)
 * @param event (object)
 */
function ngcopch_OnSliderSelectDrag(panel,event)
{
  var slider = panel.ParentControl;
  var picker = slider.Owner.Owner;

  if(picker.Dragged !== slider){return false;}

  if(typeof slider.OnSelect === 'function'){
    slider.OnSelect(panel,event,false);
  }

  return true;
}

/**
 * DO ON SATURATION/VALUE SELECTION DRAG
 * @param panel (ngPanel)
 * @param event (object)
 */
function ngcopch_OnSatValSelectDrag(panel,event)
{
  return ngcopch_OnSliderSelectDrag(panel,event);
}

/**
 * DO ON SELECTION END
 * @param panel (ngPanel)
 * @param event (object)
 */
function ngcopch_OnSliderSelectEnd(panel,event)
{
  var slider = panel.ParentControl;
  var picker = slider.Owner.Owner;

  if(
    (picker.Dragged === slider)
    && (typeof slider.OnSelect === 'function')
  ){
    slider.OnSelect(panel,event,true);
  }

  slider.SelectStartValue = null;
  picker.Dragged = null;

  clearTimeout(picker.EditsUpdate_timer);
  picker.EditsUpdate_timer = null;
  return true;
}

/**
 * DO SATURATION/VALUE SELECTION END
 * @param panel (ngPanel)
 * @param event (object)
 */
function ngcopch_OnSatValSelectEnd(panel,event)
{
  var satVal = panel.ParentControl;
  var picker = satVal.Owner.Owner;

  if(
    (picker.Dragged === satVal)
    && (typeof satVal.OnSelect === 'function')
  ){
    satVal.OnSelect(panel,event,true);
  }

  satVal.SelectStartSaturation = null;
  satVal.SelectStartValue = null;
  picker.Dragged = null;

  clearTimeout(picker.EditsUpdate_timer);
  picker.EditsUpdate_timer = null;
  return true;
}

/**
 * DO ON SLIDER ESC PRESS
 */
function ngcopch_OnSliderEscPress()
{
  var picker = this.Owner.Owner;

  clearTimeout(picker.EditsUpdate_timer);
  picker.EditsUpdate_timer = null;

  if(typeof this.SelectStartValue === 'number'){
    var color = ngcopch_ChangeColorByTarget(
      picker,
      this.SelectStartValue,
      this.ColorComponent
    );

    ngcopch_SelectedColorChanged(picker,color);
  }

  picker.Dragged = null;
}

/**
 * DO ON SATURATION/VALUE ESC PRESS
 */
function ngcopch_OnSatValEscPress()
{
  var picker = this.Owner.Owner;

  clearTimeout(picker.EditsUpdate_timer);
  picker.EditsUpdate_timer = null;

  if(
    (typeof this.SelectStartSaturation === 'number')
    && (typeof this.SelectStartValue === 'number')
  ){

    var color = picker.GetColor();
    color.S = this.SelectStartSaturation;
    color.V = this.SelectStartValue;
    color = ngcop_RecalculateRGB(color);
    color = ngcop_RecalculateHEX(color);
    color = ngcopch_ChangeSelectedColor(picker,color);

    ngcopch_UpdateSatVal(picker,true);
    ngcopch_SelectedColorChanged(picker,color);
  }

  picker.Dragged = null;
}


/**
 * DO ON HSV SELECT
 * @param hue (number)
 * @param saturation (number)
 * @param value (number)
 * @param picker (ngPanel)
 */
function ngcopch_OnHSVSelect(hue,saturation,value,picker)
{
  var pColor = picker.GetColor();
  if(typeof hue !== 'number'){ hue = ng_toFloat(pColor.H,0); }
  if(typeof saturation !== 'number'){ saturation = ng_toFloat(pColor.S,0); }
  if(typeof value !== 'number'){ value = ng_toFloat(pColor.V,0); }

  var color = {H:hue, S:saturation, V:value, A:pColor.A};
  color = ngcop_RecalculateRGB(color);
  color = ngcop_RecalculateHEX(color);
  color = ngcopch_ChangeSelectedColor(picker,color);

  return ngcopch_SelectedColorChanged(picker,color);
}

/**
 * DO ON RGB SELECT
 * @param red (integer)
 * @param green (integer)
 * @param blue (integer)
 * @param picker (ngPanel)
 */
function ngcopch_OnRGBSelect(red,green,blue,picker)
{
  var pColor = picker.GetColor();
  if(typeof red !== 'number'){ red = ng_toInteger(pColor.R,0); }
  if(typeof green !== 'number'){ green = ng_toInteger(pColor.G,0); }
  if(typeof blue !== 'number'){ blue = ng_toInteger(pColor.B,0); }

  var color = {R:red, G:green, B:blue, A:pColor.A};

  color = ngcop_RecalculateHSV(color);
  color = ngcop_RecalculateHEX(color);
  color = ngcopch_ChangeSelectedColor(picker,color);

  return ngcopch_SelectedColorChanged(picker,color);
}

/**
 * DO ON HUE SELECT
 * @param panel (ngPanel)
 * @param event (object)
 * @param end (boolean)
 */
function ngcopch_OnHueSelect(panel,event,end)
{
  var hue = ngcopch_GetSliderSelectValue(panel,event);
  if(hue === false){return false;}

  var picker = panel.ParentControl.Owner.Owner;
  var changed = ngcopch_OnHSVSelect(
    hue,null,null,picker
  );

  if(changed){
    ngcopch_UpdateHue(picker,end);
  }

  return true;
}

/**
 * DO ON SATURATION SELECT
 * @param panel (ngPanel)
 * @param event (object)
 * @param end (boolean)
 */
function ngcopch_OnSaturationSelect(panel,event,end)
{
  var saturation = ngcopch_GetSliderSelectValue(panel,event);
  if(saturation === false){return false;}

  var picker = panel.ParentControl.Owner.Owner;
  var changed = ngcopch_OnHSVSelect(
    null,saturation,null,picker
  );

  if(changed){
    ngcopch_UpdateSaturation(picker,end);
  }

  return true;
}

/**
 * DO ON VALUE SELECT
 * @param panel (ngPanel)
 * @param event (object)
 * @param end (boolean)
 */
function ngcopch_OnValueSelect(panel,event,end)
{
  var value = ngcopch_GetSliderSelectValue(panel,event);
  if(value === false){return false;}

  var picker = panel.ParentControl.Owner.Owner;
  var changed = ngcopch_OnHSVSelect(
    null,null,value,picker
  );

  if(changed){
    ngcopch_UpdateValue(picker,end);
  }

  return true;
}

/**
 * DO ON RED SELECT
 * @param panel (ngPanel)
 * @param event (object)
 * @param end (boolean)
 */
function ngcopch_OnRedSelect(panel,event,end)
{
  var red = ngcopch_GetSliderSelectValue(panel,event);
  if(red === false){return false;}

  var picker = panel.ParentControl.Owner.Owner;
  var changed = ngcopch_OnRGBSelect(
    Math.round(red),null,null,picker
  );

  if(changed){
    ngcopch_UpdateRed(picker,end);
  }

  return true;
}

/**
 * DO ON GREEN SELECT
 * @param panel (ngPanel)
 * @param event (object)
 * @param end (boolean)
 */
function ngcopch_OnGreenSelect(panel,event,end)
{
  var green = ngcopch_GetSliderSelectValue(panel,event);
  if(green === false){return false;}

  var picker = panel.ParentControl.Owner.Owner;
  var changed = ngcopch_OnRGBSelect(
    null,Math.round(green),null,picker
  );

  if(changed){
    ngcopch_UpdateGreen(picker,end);
  }

  return true;
}

/**
 * DO ON BLUE SELECT
 * @param panel (ngPanel)
 * @param event (object)
 * @param end (boolean)
 */
function ngcopch_OnBlueSelect(panel,event,end)
{
  var blue = ngcopch_GetSliderSelectValue(panel,event);
  if(blue === false){return false;}

  var picker = panel.ParentControl.Owner.Owner;
  var changed = ngcopch_OnRGBSelect(
    null,null,Math.round(blue),picker
  );

  if(changed){
    ngcopch_UpdateBlue(picker,end);
  }

  return true;
}

/**
 * DO ON SATURATION/VALUE SELECT
 * @param panel (ngPanel)
 * @param event (object)
 * @param end (boolean)
 */
function ngcopch_OnSatValSelect(panel,event,end)
{
  if(typeof panel.PointerInfo !== 'object'){return false;}
  var info = panel.PointerInfo;
  var panelNode = info.StartElement;

  ng_BeginMeasureElement(panelNode);
  var panelW = ng_ClientWidth(panelNode);
  var panelH = ng_ClientHeight(panelNode);
  var panelPos = ng_ParentPosition(panelNode);
  ng_EndMeasureElement(panelNode);

  var clickXPos = (event.X-panelPos.x);
  var clickYPos = (event.Y-panelPos.y);

  var saturation = (panelW === 0) ? 0 : clickXPos/panelW;
  var value = (panelH === 0) ? 0 : 1-(clickYPos/panelH);

  if(saturation < 0){saturation = 0;}
  else if(saturation > 1){saturation = 1;}
  if(value < 0){value = 0;}
  else if(value > 1){value = 1;}

  var picker = panel.ParentControl.Owner.Owner;

  var color = picker.GetColor();
  color.S = saturation;
  color.V = value;
  color = ngcop_RecalculateRGB(color);
  color = ngcop_RecalculateHEX(color);
  color = ngcopch_ChangeSelectedColor(picker,color);

  if(color){
    ngcopch_UpdateSatVal(picker,end);
    ngcopch_SelectedColorChanged(picker,color);
  }

  return true;
}

/**
 * DO ON ALPHA SELECT
 * @param panel (ngPanel)
 * @param event (object)
 * @param end (boolean)
 */
function ngcopch_OnAlphaSelect(panel,event,end)
{
  var alpha = ngcopch_GetSliderSelectValue(panel,event);
  if(alpha === false){return false;}

  var picker = panel.ParentControl.Owner.Owner;
  var color = picker.GetColor();
  color.A = alpha;
  color = ngcop_RecalculateHEX(color);
  color = ngcopch_ChangeSelectedColor(picker,color);

  if(color){
    ngcopch_UpdateAlpha(picker,end);
    ngcopch_SelectedColorChanged(picker,color);
  }

  return true;
}

/**
 * UPDATE HUE
 * @param picker (ngColorPicker)
 * @param updateEdits (boolean)
 * @param forceValid (boolean)
 */
function ngcopch_UpdateHue(picker,updateEdits,forceValid)
{
  picker.Controls.Hue.Controls.Cursor.Update();
  picker.Controls.Saturation.Controls.Plane.Update();
  picker.Controls.Value.Controls.Plane.Update();

  picker.Controls.Red.Update();
  picker.Controls.Green.Update();
  picker.Controls.Blue.Update();
  picker.Controls.Alpha.Controls.Plane.Update();

  picker.Controls.SatVal.Controls.Plane.Update();
  picker.Controls.To.Update();

  var edits = ['HueEdit',
               'RedEdit','GreenEdit','BlueEdit',
               'HexEdit','AHexEdit'];

  if(updateEdits){
    ngcopch_UpdateEdits(picker,edits,forceValid);
  }
  else{
    ngcopch_SetUpdateEditsTimer(picker,edits,forceValid);
  }
}

/**
 * UPDATE SATURATION
 * @param picker (ngColorPicker)
 * @param updateEdits (boolean)
 * @param forceValid (boolean)
 */
function ngcopch_UpdateSaturation(picker,updateEdits,forceValid)
{
  picker.Controls.Saturation.Controls.Cursor.Update();
  picker.Controls.Value.Controls.Plane.Update();

  picker.Controls.Red.Update();
  picker.Controls.Green.Update();
  picker.Controls.Blue.Update();
  picker.Controls.Alpha.Controls.Plane.Update();

  picker.Controls.SatVal.Controls.Cursor.Update();
  picker.Controls.To.Update();

  var edits = ['SaturationEdit',
               'RedEdit','GreenEdit','BlueEdit',
               'HexEdit','AHexEdit'];

  if(updateEdits){
    ngcopch_UpdateEdits(picker,edits,forceValid);
  }
  else{
    ngcopch_SetUpdateEditsTimer(picker,edits,forceValid);
  }
}

/**
 * UPDATE VALUE
 * @param picker (ngColorPicker)
 * @param updateEdits (boolean)
 * @param forceValid (boolean)
 */
function ngcopch_UpdateValue(picker,updateEdits,forceValid)
{
  picker.Controls.Value.Controls.Cursor.Update();
  picker.Controls.Saturation.Controls.Plane.Update();

  picker.Controls.Red.Update();
  picker.Controls.Green.Update();
  picker.Controls.Blue.Update();
  picker.Controls.Alpha.Controls.Plane.Update();

  picker.Controls.SatVal.Controls.Cursor.Update();
  picker.Controls.To.Update();

  var edits = ['ValueEdit',
               'RedEdit','GreenEdit','BlueEdit',
               'HexEdit','AHexEdit'];

  if(updateEdits){
    ngcopch_UpdateEdits(picker,edits,forceValid);
  }
  else{
    ngcopch_SetUpdateEditsTimer(picker,edits,forceValid);
  }
}

/**
 * UPDATE SATURATION AND VALUE
 * @param picker (ngColorPicker)
 * @param updateEdits (boolean)
 * @param forceValid (boolean)
 */
function ngcopch_UpdateSatVal(picker,updateEdits,forceValid)
{
  picker.Controls.SatVal.Controls.Cursor.Update();

  picker.Controls.Saturation.Update();
  picker.Controls.Value.Update();

  picker.Controls.Red.Update();
  picker.Controls.Green.Update();
  picker.Controls.Blue.Update();
  picker.Controls.Alpha.Controls.Plane.Update();

  picker.Controls.To.Update();

  var edits = ['SaturationEdit','ValueEdit',
               'RedEdit','GreenEdit','BlueEdit',
               'HexEdit','AHexEdit'];

  if(updateEdits){
    ngcopch_UpdateEdits(picker,edits,forceValid);
  }
  else{
    ngcopch_SetUpdateEditsTimer(picker,edits,forceValid);
  }
}

/**
 * UPDATE RED
 * @param picker (ngColorPicker)
 * @param updateEdits (boolean)
 * @param forceValid (boolean)
 */
function ngcopch_UpdateRed(picker,updateEdits,forceValid)
{
  picker.Controls.Red.Controls.Cursor.Update();
  picker.Controls.Green.Controls.Plane.Update();
  picker.Controls.Blue.Controls.Plane.Update();
  picker.Controls.Alpha.Controls.Plane.Update();

  picker.Controls.Hue.Controls.Cursor.Update();
  picker.Controls.Saturation.Update();
  picker.Controls.Value.Update();

  picker.Controls.SatVal.Update();
  picker.Controls.To.Update();

  var edits = ['RedEdit',
               'HueEdit','SaturationEdit','ValueEdit',
               'HexEdit','AHexEdit'];

  if(updateEdits){
    ngcopch_UpdateEdits(picker,edits,forceValid);
  }
  else{
    ngcopch_SetUpdateEditsTimer(picker,edits,forceValid);
  }
}

/**
 * UPDATE GREEN
 * @param picker (ngColorPicker)
 * @param updateEdits (boolean)
 * @param forceValid (boolean)
 */
function ngcopch_UpdateGreen(picker,updateEdits,forceValid)
{
  picker.Controls.Green.Controls.Cursor.Update();
  picker.Controls.Red.Controls.Plane.Update();
  picker.Controls.Blue.Controls.Plane.Update();
  picker.Controls.Alpha.Controls.Plane.Update();

  picker.Controls.Hue.Controls.Cursor.Update();
  picker.Controls.Saturation.Update();
  picker.Controls.Value.Update();

  picker.Controls.SatVal.Update();
  picker.Controls.To.Update();

  var edits = ['GreenEdit',
               'HueEdit','SaturationEdit','ValueEdit',
               'HexEdit','AHexEdit'];

  if(updateEdits){
    ngcopch_UpdateEdits(picker,edits,forceValid);
  }
  else{
    ngcopch_SetUpdateEditsTimer(picker,edits,forceValid);
  }
}

/**
 * UPDATE BLUE
 * @param picker (ngColorPicker)
 * @param updateEdits (boolean)
 * @param forceValid (boolean)
 */
function ngcopch_UpdateBlue(picker,updateEdits,forceValid)
{
  picker.Controls.Blue.Controls.Cursor.Update();
  picker.Controls.Red.Controls.Plane.Update();
  picker.Controls.Green.Controls.Plane.Update();
  picker.Controls.Alpha.Controls.Plane.Update();

  picker.Controls.Hue.Controls.Cursor.Update();
  picker.Controls.Saturation.Update();
  picker.Controls.Value.Update();

  picker.Controls.SatVal.Update();
  picker.Controls.To.Update();

  var edits = ['BlueEdit',
               'HueEdit','SaturationEdit','ValueEdit',
               'HexEdit','AHexEdit'];

  if(updateEdits){
    ngcopch_UpdateEdits(picker,edits,forceValid);
  }
  else{
    ngcopch_SetUpdateEditsTimer(picker,edits,forceValid);
  }
}

/**
 * UPDATE ALPHA
 * @param picker (ngColorPicker)
 * @param updateEdits (boolean)
 * @param forceValid (boolean)
 */
function ngcopch_UpdateAlpha(picker,updateEdits,forceValid)
{
  picker.Controls.Alpha.Controls.Cursor.Update();

  picker.Controls.To.Update();

  var edits = ['AlphaEdit','AHexEdit'];

  if(updateEdits){
    ngcopch_UpdateEdits(picker,edits,forceValid);
  }
  else{
    ngcopch_SetUpdateEditsTimer(picker,edits,forceValid);
  }
}

/**
 * UPDATE HEX
 * @param picker (ngColorPicker)
 * @param updateEdits (boolean)
 * @param forceValid (boolean)
 */
function ngcopch_UpdateHex(picker,updateEdits,forceValid)
{
  picker.Controls.Hue.Controls.Cursor.Update();
  picker.Controls.Saturation.Update();
  picker.Controls.Value.Update();

  picker.Controls.Red.Update();
  picker.Controls.Green.Update();
  picker.Controls.Blue.Update();
  picker.Controls.Alpha.Controls.Plane.Update();

  picker.Controls.SatVal.Update();
  picker.Controls.To.Update();

  var edits = ['RedEdit','GreenEdit','BlueEdit',
               'HueEdit','SaturationEdit','ValueEdit',
               'HexEdit','AHexEdit'];

  if(updateEdits){
    ngcopch_UpdateEdits(picker,edits,forceValid);
  }
  else{
    ngcopch_SetUpdateEditsTimer(picker,edits,forceValid);
  }
}

/**
 * UPDATE ALL PICKER CONTENT
 * @param picker (ngColorPicker)
 * @param updateEdits (boolean)
 * @param forceValid (boolean)
 */
function ngcopch_UpdateAll(picker,updateEdits,forceValid)
{
  picker.Controls.Hue.Controls.Cursor.Update();
  picker.Controls.Saturation.Update();
  picker.Controls.Value.Update();

  picker.Controls.Red.Update();
  picker.Controls.Green.Update();
  picker.Controls.Blue.Update();
  picker.Controls.Alpha.Update();

  picker.Controls.SatVal.Update();
  picker.Controls.To.Update();

  var edits = ['RedEdit','GreenEdit','BlueEdit',
               'HueEdit','SaturationEdit','ValueEdit',
               'AlphaEdit',
               'HexEdit','AHexEdit'];

  if(updateEdits){
    ngcopch_UpdateEdits(picker,edits,forceValid);
  }
  else{
    ngcopch_SetUpdateEditsTimer(picker,edits,forceValid);
  }
}

/**
 * SET ALL EDITS VALID
 * @param picker (ngColorPicker)
 */
function ngcopch_SetAllEditsValid(picker)
{

  var edits = ['RedEdit','GreenEdit','BlueEdit',
               'HueEdit','SaturationEdit','ValueEdit',
               'AlphaEdit',
               'HexEdit','AHexEdit'];

  for(var i in edits){
    var edit = picker.Controls[edits[i]];
    if(edit.Invalid && (typeof edit.SetInvalid === 'function')){
      edit.SetInvalid(false);
    }
  }
}

/**
 * UPDATE EDITS
 * @param picker (ngColorPicker)
 * @param edits (object)
 * @param forceValid (boolean)
 */
function ngcopch_UpdateEdits(picker,edits,forceValid)
{
  if(typeof forceValid === 'undefined'){
    forceValid = true;
  }

  for(var i in edits){
    var edit = picker.Controls[edits[i]];
    if(forceValid && edit.Invalid && (typeof edit.SetInvalid === 'function')){
      edit.SetInvalid(false);
    }
    edit.Update();
  }
}

/**
 * UPDATE EDITS
 * @param picker (ngColorPicker)
 * @param edits (object)
 * @param forceValid (boolean)
 */
function ngcopch_SetUpdateEditsTimer(picker,edits,forceValid)
{
  for(var i in edits){
    edits[i] = "'"+edits[i]+"'";
  }
  clearTimeout(picker.EditsUpdate_timer);
  picker.EditsUpdate_timer = null;

  var timeout = (picker.EditsUpdate_timeout > 0) ? picker.EditsUpdate_timeout : 1;
  var call = "ngcopch_UpdateEdits("
      +"ngGetControlById('"+picker.ID+"','"+picker.CtrlType+"'),"
      +"["+edits.join(',')+"]"
      + ((typeof forceValid === 'undefined') ? '' : ','+ (!!forceValid).toString())
    +")";

  picker.EditsUpdate_timer = setTimeout(call,timeout);
}


/**
 * CHANGE COLOR BY TARGET COLOR COMPONENT
 * @param picker (object)
 * @param value (number)
 * @param target (string)
 * @return (object|null)
 */
function ngcopch_ChangeColorByTarget(picker,value,target)
{
  var color = picker.GetColor();

  switch(target){
    case 'H': color.H = value; break;
    case 'S': color.S = value; break;
    case 'V': color.V = value; break;
    case 'R': color.R = value; break;
    case 'G': color.G = value; break;
    case 'B': color.B = value; break;
    case 'A': color.A = value; break;
    default: return null;
  }

  switch(target){
    case 'H': case 'S': case 'V':
      color = ngcop_RecalculateRGB(color);
      break;
    case 'R': case 'G': case 'B':
      color = ngcop_RecalculateHSV(color);
      break;
  }

  color = ngcop_RecalculateHEX(color);
  color = ngcopch_ChangeSelectedColor(picker,color);

  if(color){
    switch(target){
      case 'H': ngcopch_UpdateHue(picker,true); break;
      case 'S': ngcopch_UpdateSaturation(picker,true); break;
      case 'V': ngcopch_UpdateValue(picker,true); break;
      case 'R': ngcopch_UpdateRed(picker,true); break;
      case 'G': ngcopch_UpdateGreen(picker,true); break;
      case 'B': ngcopch_UpdateBlue(picker,true); break;
      case 'A': ngcopch_UpdateAlpha(picker,true); break;
    }
  }

  return color;
}

/**
 * CHANGE SELECTED COLOR
 * @param picker (ngPanel)
 * @param color (object/null)
 */
function ngcopch_ChangeSelectedColor(picker,color)
{
  if(
    (typeof picker.OnColorChanging === 'function')
    && !(picker.OnColorChanging(color))
  ){return null;}

  ngcop_SetColor(picker,color);

  return color;
}

/**
 * DO WHEN SELECTED COLOR WAS CHANGED
 * @param picker (ngPanel)
 * @param color (object/null)
 * @return (object)
 */
function ngcopch_SelectedColorChanged(picker,color)
{
  if(color && (typeof picker.OnColorChanged === 'function')
  ){
    picker.OnColorChanged(color);
  }
  return color;
}

/**
 * DO ON TO PREVIEW UPDATED
 * @param preview (ngPanel)
 * @param node (object)
 */
function ngcopch_OnToPreviewUpdated(preview,node)
{
  ngcob_SetButtonColor(
    preview,
    preview.Owner.Owner.GetColor()
  );
}

/**
 * DO ON FROM PREVIEW CLICK
 * @param event (object)
 */
function ngcopch_OnFromPreviewClick(event)
{
  var color = this.GetColor();
  if(color){
    var picker = this.Owner.Owner;
    ngcopch_ChangeSelectedColor(
      picker,color
    );
    ngcopch_SetAllEditsValid(picker);
    picker.Update();

    ngcopch_SelectedColorChanged(picker,color);
  }
  return true;
}

/**
 * DO ON TO PREVIEW CLICK
 * @param event (object)
 */
function ngcopch_OnToPreviewClick(event)
{
  if(this.GetColor()){
    ngcob_SetButtonColor(
      this.Owner.From,
      this.GetColor()
    );
  }
  return true;
}

/**
 * SET PICKER HEIGHT BY CONTENT IN PANEL
 * @param picker (ngColorPicker)
 */
function ngcopch_AutoHeight_Panel(picker)
{
  if(!picker.AutoHeight){return;}
  var maxHeight = 0;
  var height;

  for(var i in picker.ChildControls){
    var control = picker.ChildControls[i];

    if(control.Visible && control.Bounds){
      height = ng_toInteger(control.Bounds.H,0);
      height += ng_toInteger(control.Bounds.T,0);
      if(height > maxHeight){
        maxHeight = height;
      }
    }
  }

  if(typeof picker.DoAutoHeight === 'function'){
    var h = picker.DoAutoHeight(maxHeight);
    if(typeof h === 'number'){
      maxHeight = h;
    }
  }

  if(picker.Bounds.H !== maxHeight){
    picker.SetBounds({H:maxHeight});
    picker.Update(false);
  }
}

/**
 * SET PICKER HEIGHT BY CONTENT IN TOOLBAR
 * @param picker (ngColorPicker)
 */
function ngcopch_AutoHeight_Toolbar(picker)
{
  if(!picker.AutoHeight){return;}
  var height = 0;

  for(var i in picker.ChildControls){
    var control = picker.ChildControls[i];

    if(control.Visible && control.Bounds){
      height += ng_toInteger(control.Bounds.H,0);
    }
  }

  if(typeof picker.DoAutoHeight === 'function'){
    var h = picker.DoAutoHeight(height);
    if(typeof h === 'number'){
      height = h;
    }
    else{return;}
  }

  if(picker.Bounds.H !== height){
    picker.SetBounds({H:height});
    picker.Update(false);
  }
}

/**
 * SHOW SELECTION HSV
 * @param hue (float/null)
 * @param saturation (float/null)
 * @param value (float/null)
 * @param alpha (float/null)
 * @returns (object) | color
 */
function ngcopch_ShowHSV(hue,saturation,value,alpha)
{
  var pColor = this.GetColor();
  if((hue !== null)  && (typeof hue !== 'number')){return pColor;}
  if((saturation !== null)  && (typeof saturation !== 'number')){return pColor;}
  if((value !== null) && (typeof value !== 'number')){return pColor;}
  var aType = typeof alpha;
  if((alpha !== null) && (aType !== 'undefined') && (aType !== 'number')){return pColor;}
  if(hue === null){hue = pColor.H;}
  if(saturation === null){saturation = pColor.S;}
  if(value === null){value = pColor.V;}
  if(alpha === null || (aType === 'undefined')){alpha = pColor.A;}

  var color = ngcop_HSVAToColor(hue,saturation,value,alpha);
  color = ngcopch_ChangeSelectedColor(this,color);

  if(color){
    ngcopch_SetAllEditsValid(this);
    this.Update();

    ngcopch_SelectedColorChanged(this,color);
  }

  return this.GetColor();
}

/**
 * SHOW SELECTION RGB
 * @param red (integer)
 * @param green (integer)
 * @param blue (integer)
 * @param alpha (float/null)
 * @returns (object) | color
 */
function ngcopch_ShowRGB(red,green,blue,alpha)
{
  var pColor = this.GetColor();
  if((red !== null)  && (typeof red !== 'number')){return pColor;}
  if((green !== null)  && (typeof green !== 'number')){return pColor;}
  if((blue !== null) && (typeof blue !== 'number')){return pColor;}
  var aType = typeof alpha;
  if((alpha !== null) && (aType !== 'undefined') && (aType !== 'number')){return pColor;}

  if(red === null){red = pColor.R;}
  if(green === null){green = pColor.G;}
  if(blue === null){blue = pColor.B;}
  if(alpha === null || (aType === 'undefined')){alpha = pColor.A;}

  var color = ngcop_RGBAToColor(red,green,blue,alpha);
  color = ngcopch_ChangeSelectedColor(this,color);

  if(color){
    ngcopch_SetAllEditsValid(this);
    this.Update();

    ngcopch_SelectedColorChanged(this,color);
  }

  return this.GetColor();
}

/**
 * SHOW SELECTION HEX
 * @param hexColor (string)
 * @returns (object) | color
 */
function ngcopch_ShowHEX(hexColor)
{
  if(
    (typeof hexColor !== 'string')
    || (hexColor.substring(0,1) !== '#')
  ){
    return this.GetColor();
  }

  var color = ngcop_HexToColor(hexColor);
  if(color === null){return this.GetColor();}

  color = ngcopch_ChangeSelectedColor(this,color);

  if(color){
    ngcopch_SetAllEditsValid(this);
    this.Update();

    ngcopch_SelectedColorChanged(this,color);
  }

  return this.GetColor();

}

/**
 * SET HSV COLOR
 * @param picker (ngColorPicker)
 * @param color (object)
 * @returns (object) - color
 */
function ngcopch_SetPickerColor(picker,color)
{
  color = ngcopch_ChangeSelectedColor(picker,color);

  if(color){
    ngcopch_SetAllEditsValid(picker);
    ngcob_SetButtonColor(
      picker.Controls.From,
      color
    );

    ngcopch_UpdateAll(picker,true,true);

    ngcopch_SelectedColorChanged(picker,color);
  }

  return picker.GetColor();
}

/**
 * SET HSV COLOR
 * @param hue (float/null)
 * @param saturation (float/null)
 * @param value (float/null)
 * @param alpha (float/null)
 * @returns (object) - color
 */
function ngcopch_SetHSVColor(hue,saturation,value,alpha)
{
  var color = this.ShowHSV(hue,saturation,value,alpha);
  ngcob_SetButtonColor(
    this.Controls.From,
    color
  );
  return color;
}

/**
 * SET RGB COLOR
 * @param red (integer)
 * @param green (integer)
 * @param blue (integer)
 * @param alpha (float/null)
 * @returns (object) - color
 */
function ngcopch_SetRGBColor(red,green,blue,alpha)
{
  var color = this.ShowRGB(red,green,blue,alpha);
  ngcob_SetButtonColor(
    this.Controls.From,
    color
  );
  return color;
}

/**
 * SET HEX COLOR
 * @param hexColor (string)
 * @returns (object) - color
 */
function ngcopch_SetHEXColor(hexColor)
{
  if(
    (typeof hexColor !== 'string')
    || (hexColor.substring(0,1) !== '#')
  ){
    return this.GetColor();
  }

  var color = this.ShowHEX(hexColor);
  ngcob_SetButtonColor(
    this.Controls.From,
    color
 );
  return color;
}

/**
 * SET DEFAULT COLOR TO DEFINITION
 * @param def (object)
 * @param defColor (object)
 */
function ngcop_SetDefColor(def,defColor)
{
  if(!def){return;}

  if(!def.Data){ def.Data = {}; }
  if(!def.Data.Color){
    def.Data.Color = defColor;
    return;
  }

  var c = def.Data.Color;
  switch(typeof c){

    case 'string':
      var col = ngcop_HexToColor(c);
      if(col){
        if(def.Data && (def.Data.AllowAlpha === false)){
          col = ngcop_RemoveColorTransparency(col);
        }
        def.Data.Color = col;
        return;
      }
    break;
    case 'object':
      var alpha = 1;
      if(!def.Data || (def.Data.AllowAplha !== false)){
        if(typeof c.A === 'number'){alpha = c.A;}
        else{alpha = (typeof defColor === "object" && defColor) ? defColor.A : 1;}
      };

      if((typeof c.H === 'number') && (typeof c.S === 'number') && (typeof c.V === 'number')){
        var col = ngcop_HSVAToColor(c.H,c.S,c.V,alpha);
        if(col){
          def.Data.Color = col;
          return;
        }
      }

      if((typeof c.R === 'number') && (typeof c.G === 'number') && (typeof c.B === 'number')){
        var col = ngcop_RGBAToColor(c.R,c.G,c.B,alpha);
        if(col){
          def.Data.Color = col;
          return;
        }
      }

      if((typeof c.HEX === 'string') && (c.HEX.length === 7)){
        var col = ngcop_HexToColor(c.HEX);
        if(col){
          def.Data.Color = col;
          return;
        }
      }

      if((typeof c.HEXA === 'string') && (c.HEXA.length === 9)){
        var col = ngcop_HexToColor(c.HEXA);
        if(col){
          if(def.Data && (def.Data.AllowAplha === false)){
            col = ngcop_RemoveColorTransparency(col);
          }
          def.Data.Color = col;
          return;
        }
      }
    break;
  }

  def.Data.Color = defColor;
}

/**
 * DRAW TRANSPARENT BACKGROUND
 * @param node (object)
 * @param image (object)
 */
function ngcop_DrawTransparentBackground(node,image)
{
  if(image && (typeof image.Src === 'string')){
    var lType = typeof image.L;
    var tType = typeof image.T;
    var x =  '0px';
    var y = '0px';
    if(lType === 'string'){x = '-'+image.L;}
    else if(lType === 'number'){x = (image.L*-1) + 'px';}
    if(tType === 'string'){y = '-'+image.T;}
    else if(tType === 'number'){y = (image.T*-1) + 'px';}
    node.style.background = "url('"+image.Src+"') repeat scroll "+x+" "+y+" transparent";
  }
  else{
    node.style.background = '';
  }
}

/**
 * RECALCULATE HSV COLOR
 * @param color (object)
 * @returns (object)
 */
function ngcop_RecalculateHSV(color)
{
  var HSVColor = ColorsConverter.RGBToHSV(
      color.R,color.G,color.B
  );

  color.H = HSVColor.H;
  color.S = HSVColor.S;
  color.V = HSVColor.V;

  return color;
}

/**
 * RECALCULATE RGB COLOR
 * @param color (object)
 * @returns (object)
 */
function ngcop_RecalculateRGB(color)
{
  var RGBColor = ColorsConverter.HSVToRGB(
      color.H,color.S,color.V
  );

  color.R = RGBColor.R;
  color.G = RGBColor.G;
  color.B = RGBColor.B;

  return color;
}

/**
 * RECALCULATE HEX COLOR
 * @param color (object)
 */
function ngcop_RecalculateHEX(color)
{
  if(typeof color === 'object'){
    color.HEX = ColorsConverter.RGBToHex(
        color.R,color.G,color.B
    );
    color.HEXA = ColorsConverter.RGBAToHex(
        color.R,color.G,color.B,color.A
    );

  }
  return color;
}

/**
 * HSVA TO COLOR
 * @param hue (float/null)
 * @param saturation (float/null)
 * @param value (float/null)
 * @param alpha (float/null)
 * @returns (object) | color
 */
function ngcop_HSVAToColor(hue,saturation,value,alpha)
{
  if(hue < 0){hue = 0;}
  else if(hue > 360){hue = 360;}

  if(saturation < 0){saturation = 0;}
  else if(saturation > 1){saturation = 1;}

  if(value < 0){value = 0;}
  else if(value > 1){value = 1;}

  if(alpha < 0){alpha = 0;}
  else if(value > 1){alpha = 1;}

  var color = {H: hue,S: saturation,V: value, A:alpha};
  color = ngcop_RecalculateRGB(color);
  color = ngcop_RecalculateHEX(color);

  return color;
}

/**
 * RGBA TO COLOR
 * @param red (integer)
 * @param green (integer)
 * @param blue (integer)
 * @param alpha (float/null)
 * @returns (object) | color
 */
function ngcop_RGBAToColor(red,green,blue,alpha)
{
  if(red < 0){red = 0;}
  else if(red > 255){red = 255;}
  red = Math.round(red);

  if(green < 0){green = 0;}
  else if(green > 255){green = 255;}
  green = Math.round(green);

  if(blue < 0){blue = 0;}
  else if(blue > 255){blue = 255;}
  blue = Math.round(blue);

  if(alpha < 0){alpha = 0;}
  else if(alpha > 1){alpha = 1;}

  var color = {R:red, G:green, B:blue, A:alpha};
  color = ngcop_RecalculateHSV(color);
  color = ngcop_RecalculateHEX(color);

  return color;
}

/**
 * HEX TO COLOR
 * @param hexColor (string)
 * @returns (object|null) - color
 */
function ngcop_HexToColor(hexColor)
{
  var rgb;
  if(hexColor.length === 7){
    rgb = ColorsConverter.HexToRGB(hexColor);
    if(!rgb){return null;}
    rgb.A = 1;
  }
  else if(hexColor.length === 9){
    rgb = ColorsConverter.HexToRGBA(hexColor);
    if(!rgb){return null;}
  }
  else{return null;}

  var color = {R:rgb.R, G:rgb.G, B:rgb.B, A:rgb.A};
  color = ngcop_RecalculateHSV(color);
  color = ngcop_RecalculateHEX(color);

  return color;
}

/**
 * REMOVE COLOR TRANSPARENCY
 * @param color (object)
 * @returns (object|null) - color
 */
function ngcop_RemoveColorTransparency(color)
{
  if(typeof color !== 'object'){return null;}

  color.A = 1;
  if(typeof color.HEX === 'string'){
    color.HEXA = '#'+color.HEX.substring(1,7)+'ff';
  }
  return color;
}

/**
 * SET  COLOR
 * @param target (object)
 * @param color (object)
 * @returns (object)
 */
function ngcop_SetColor(target,color)
{
  if(typeof target.GetColor !== 'function'){return null;}

  var pColor = target.GetColor();
  if(color === null){return pColor;}

  if(typeof color.H !== 'number'){return pColor;}
  if(typeof color.S !== 'number'){return pColor;}
  if(typeof color.V !== 'number'){return pColor;}
  if(typeof color.R !== 'number'){return pColor;}
  if(typeof color.G !== 'number'){return pColor;}
  if(typeof color.B !== 'number'){return pColor;}
  if(typeof color.A !== 'number'){return pColor;}
  if(typeof color.HEX !== 'string'){return pColor;}
  if(typeof color.HEXA !== 'string'){return pColor;}

  target.Color = {
    H: color.H, S: color.S, V: color.V,
    R: color.R, G: color.G, B: color.B,
    A: color.A,
    HEX: color.HEX, HEXA: color.HEXA
  };
  if(typeof target.ShowColor === 'function'){
    target.ShowColor();
  }

  return target.GetColor();
}

/**
 * GET COLOR
 * @returns (object)
 */
function ngcop_GetColor()
{
  return this.Color;
}

/**
 * VALIDATE HSV COLOR
 * @param hue (float/null)
 * @param saturation (float/null)
 * @param value (float/null)
 * @param alpha (float/null)
 * @param defColor (object)
 * @returns (object) | color
 */
function ngcop_CheckHSV(hue,saturation,value,alpha,defColor)
{
  if(typeof defColor !== 'object'){return null;}

  if((hue !== null)  && (typeof hue !== 'number')){return defColor;}
  if((saturation !== null)  && (typeof saturation !== 'number')){return defColor;}
  if((value !== null) && (typeof value !== 'number')){return defColor;}
  var aType = typeof alpha;
  if((alpha !== null) && (aType !== 'undefined') && (aType !== 'number')){return defColor;}

  if(hue === null){hue = defColor.H;}
  if(saturation === null){saturation = defColor.S;}
  if(value === null){value = defColor.V;}
  if(alpha === null || (aType === 'undefined')){alpha = defColor.A;}

  return ngcop_HSVAToColor(hue,saturation,value,alpha);
}

/**
 * SET RGB COLOR
 * @param red (integer)
 * @param green (integer)
 * @param blue (integer)
 * @param alpha (float/null)
 * @param defColor (object)
 * @returns (object) | color
 */
function ngcop_CheckRGB(red,green,blue,alpha,defColor)
{
  if(typeof defColor !== 'object'){return null;}

  if((red !== null)  && (typeof red !== 'number')){return defColor;}
  if((green !== null)  && (typeof green !== 'number')){return defColor;}
  if((blue !== null) && (typeof blue !== 'number')){return defColor;}
  var aType = typeof alpha;
  if((alpha !== null) && (aType !== 'undefined') && (aType !== 'number')){return defColor;}

  if(red === null){red = defColor.R;}
  if(green === null){green = defColor.G;}
  if(blue === null){blue = defColor.B;}
  if(alpha === null || (aType === 'undefined')){alpha = defColor.A;}

  return ngcop_RGBAToColor(red,green,blue,alpha);
}

/**
 *  Class: ngColorPickerBox
 *  Standard color picker box control.
 *
 *  See also:
 *    Abstract class <ngPanel>.
 */

var ngColorPickerH         = 1;
var ngColorPickerS         = 2;
var ngColorPickerV         = 4;
var ngColorPickerSV        = 8;

var ngColorPickerR         = 16;
var ngColorPickerG         = 32;
var ngColorPickerB         = 64;

var ngColorPickerA         = 128;
var ngColorPickerPreview   = 256;

var ngColorPickerHex       = 512;
var ngColorPickerAHex      = 1024;
var ngColorPickerEdits     = 2048;

var ngColorPickerModeBar     = 4096;

var ngCopLayout_H_SV  = ngColorPickerH | ngColorPickerSV | ngColorPickerPreview;
var ngCopLayout_HA_SV  = ngCopLayout_H_SV | ngColorPickerA;
var ngCopLayout_HSV  = ngColorPickerH | ngColorPickerS | ngColorPickerV | ngColorPickerPreview;
var ngCopLayout_HSVA  = ngCopLayout_HSV | ngColorPickerA;
var ngCopLayout_RGB  = ngColorPickerR | ngColorPickerG | ngColorPickerB | ngColorPickerPreview;
var ngCopLayout_RGBA  = ngCopLayout_RGB | ngColorPickerA;

var ngCopLayout_Default  = ngColorPickerModeBar | ngCopLayout_H_SV | ngColorPickerEdits;

function ngColorPickerBox(def,ref,parent)
{

  ng_MergeDef(def,{
    /**  Variable: Layout
     *  ...
     *  Type: integer
     *  Default value: *ngCopLayout_Default*
     */
    Layout: ngCopLayout_Default,
    OnCreated: ngcopbx_OnPickerBoxCreated,
    Controls: {
      ModeBar: {
        Type: 'ngPanel',
        ParentReferences: false,
        Controls: {
          Bar: {
            Type: 'ngPanel',
            Controls: {
              Env_H_SV: {
                Type: 'ngPanel',
                Controls: {
                  H_SV: {
                    Type: 'ngRadioButton',
                    Data: {
                      Mode: 'h_sv',
                      ngTextD: 'colorpicker_H-SV',
                      Checked: true
                    },
                    Events: { OnCheckChanged: ngcopbx_OnModeChange }
                  }
                }
              },
              Env_HSV: {
                Type: 'ngPanel',
                Controls: {
                  HSV: {
                    Type: 'ngRadioButton',
                    Data: {
                      Mode: 'hsv',
                      ngTextD: 'colorpicker_HSV'
                    },
                    Events: { OnCheckChanged: ngcopbx_OnModeChange }
                  }
                }
              },
              Env_RGB: {
                Type: 'ngPanel',
                Controls: {
                  RGB: {
                    Type: 'ngRadioButton',
                    Data: {
                      Mode: 'rgb',
                      ngTextD: 'colorpicker_RGB'
                    },
                    Events: { OnCheckChanged: ngcopbx_OnModeChange }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  if(def.Layout){
    var defLayout = (def.Layout & ngCopLayout_Default) === ngCopLayout_Default;
    var showEdits = !defLayout && (def.Layout & ngColorPickerEdits);
    var showHexes = !defLayout && ((def.Layout & ngColorPickerHex) || (def.Layout & ngColorPickerAHex));

    ng_MergeDef(def,{
      Controls: {
        ModeBar: {
          Data: { Visible: !!(def.Layout & ngColorPickerModeBar) }
        },
        Hue_Panel: {
          Data: { Visible: !!(def.Layout & ngColorPickerH) },
          Controls: {
            HueEdit: { Data: { Visible: showEdits } }
          }
        },
        Saturation_Panel: {
          Data: { Visible: !!(def.Layout & ngColorPickerS) },
          Controls: {
            SaturationEdit: { Data: { Visible: (def.Layout & ngColorPickerEdits) } }
          }
        },
        Value_Panel: {
          Data: { Visible: !!(def.Layout & ngColorPickerV) },
          Controls: {
            ValueEdit: { Data: { Visible: (def.Layout & ngColorPickerEdits) } }
          }
        },
        Red_Panel: {
          Data: { Visible: !!(def.Layout & ngColorPickerR) },
          Controls: {
            RedEdit: { Data: { Visible: (def.Layout & ngColorPickerEdits) } }
          }
        },
        Green_Panel: {
          Data: { Visible: !!(def.Layout & ngColorPickerG) },
          Controls: {
            GreenEdit: { Data: { Visible: (def.Layout & ngColorPickerEdits) } }
          }
        },
        Blue_Panel: {
          Data: { Visible: !!(def.Layout & ngColorPickerB) },
          Controls: {
            BlueEdit: { Data: { Visible: (def.Layout & ngColorPickerEdits) } }
          }
        },
        Alpha_Panel: {
          Data: { Visible: !!(def.Layout & ngColorPickerA) },
          Controls: {
            AlphaEdit: { Data: { Visible: showEdits } }
          }
        },
        SatVal_Panel: { Data: { Visible: !!(def.Layout & ngColorPickerSV) } },
        Hex_Panel: {
          Data: { Visible: showHexes },
          Controls: {
            HexEdit: { Data: { Visible: !!(def.Layout & ngColorPickerHex) } },
            HexLabel: { Data: { Visible: !!(def.Layout & ngColorPickerHex) } },
            AHexEdit: { Data: { Visible: !!(def.Layout & ngColorPickerAHex) } },
            AHexLabel: { Data: { Visible: !!(def.Layout & ngColorPickerAHex) } }
          }
        },
        Preview_Panel: { Data: { Visible: !!(def.Layout & ngColorPickerPreview) } }
      }
    });
  }

  if((typeof def.Data !== 'object') || (def.Data == null)){
    def.Data = {};
  }
  def.Data.Layout = def.Layout;
  return ngCreateControlAsType(def,'ngColorPicker',ref,parent);
}

/**
 * DO ON COLOR PICKER BOX CREATED
 * @param picker (ngColorPicker)
 */
function ngcopbx_OnPickerBoxCreated(picker)
{
  var modeBar = picker.Controls.ModeBar;
  modeBar.Controls.H_SV.RadioGroup = picker.ID + '_mode';
  modeBar.Controls.HSV.RadioGroup = picker.ID + '_mode';
  modeBar.Controls.RGB.RadioGroup = picker.ID + '_mode';

  var isDefault = (picker.Layout & ngCopLayout_Default) === ngCopLayout_Default;

  var showEdits = (isDefault) ? false : !!(picker.Layout & ngColorPickerEdits);

  ngcopbx_StretchSliders(picker,showEdits);

  if(isDefault){
    for(var i in modeBar.Controls){
      if(modeBar.Controls[i].Checked){
        if(typeof modeBar.OnModeChanged === 'function'){
          modeBar.OnModeChanged(modeBar.Controls[i].Mode);
        }
        break;
      }
    }
  }

  return ngcopch_OnPickerCreated(picker);
}

/**
 * DO ON MODE CHANGE
 * @param button (ngButton)
 */
function ngcopbx_OnModeChange(button)
{
  if(!button.Checked){return true;}

  var modeBar = button.Owner.Owner;
  var picker = modeBar.Owner.Owner;

  var mode = button.Mode;

  var showHue = false;
  var showSaturation = false;
  var showValue = false;
  var showSatVal = false;
  var showRed = false;
  var showGreen = false;
  var showBlue = false;

  var showEdits = !!(picker.Layout & ngColorPickerEdits);
  var showHexes = (picker.Layout & ngColorPickerHex) || (picker.Layout & ngColorPickerAHex);

  switch(mode){
    case 'h_sv':
      showHue = true;
      showSatVal = true;
      showEdits = false;
      showHexes = false;
      break;
    case 'hsv':
      showHue = true;
      showSaturation = true;
      showValue = true;
      break;
    case 'rgb':
      showRed = true;
      showGreen = true;
      showBlue = true;
      break;
  }

  picker.Controls.Hue_Panel.SetVisible(showHue);
  picker.Controls.Saturation_Panel.SetVisible(showSaturation);
  picker.Controls.Value_Panel.SetVisible(showValue);
  picker.Controls.SatVal_Panel.SetVisible(showSatVal);
  picker.Controls.Red_Panel.SetVisible(showRed);
  picker.Controls.Green_Panel.SetVisible(showGreen);
  picker.Controls.Blue_Panel.SetVisible(showBlue);

  picker.Controls.HueEdit.SetVisible(showEdits);
  picker.Controls.AlphaEdit.SetVisible(showEdits);
  picker.Controls.Hex_Panel.SetVisible(showHexes);

  ngcopbx_StretchSliders(picker,showEdits);

  if(typeof modeBar.OnModeChanged === 'function'){
    modeBar.OnModeChanged(mode);
  }

  return true;
}

/**
 * STRETCH SLIDERS BY EDITS
 * @param picker (ngColorPicker)
 * @param showEdits (boolean)
 */
function ngcopbx_StretchSliders(picker,showEdits)
{
  var slidersToStretch = new Array('Hue','Saturation','Value','Red','Green','Blue','Alpha');
  for(var i in slidersToStretch){
    var sliderPanel = picker.Controls[slidersToStretch[i]+'_Panel'];
    if(!sliderPanel.Visible){continue;}

    var slider = picker.Controls[slidersToStretch[i]];
    if(
      showEdits
      && (typeof slider.WithEditBounds === 'object')
      && (slider.WithEditBounds !== null)
    ){
      slider.SetBounds(slider.WithEditBounds);
    }
    else if(
      !showEdits
      && (typeof slider.WithoutEditBounds === 'object')
      && (slider.WithoutEditBounds !== null)
    ){
      slider.SetBounds(slider.WithoutEditBounds);

    }
    else{continue;}
    slider.Update();
  }
}

/**
 *  Class: ngColorButton
 *  Standard color button control.
 *
 *  See also:
 *    Abstract class <ngButton>.
 */

function ngColorButton(def,ref,parent)
{
  /**
   *  Group: Properties
   */

  ng_MergeDef(def,{
    Data: {
      /**
       *  Variable: Color
       *  -
       *  Type: string/object
       *  Default value: null
       */
      Color: null,

      /**
       *  Variable: BackgroundImg
       *  -
       *  Type: object
       *  Default value: null
       */
      BackgroundImg: null,

      /**
       *  Variable: AllowAlpha
       *  - If alpha channel is allowed.
       *  Type: boolean
       *  Default value: true
       */
      AllowAlpha: true
    },
    OnCreated: function(button){
      button.ShowColor();
      return true;
    },
    /**
     *  Group: Methods
     */
    Methods: {
      /**
       *  Function: ShowColor
       *  -
       *
       *  Syntax:
       *    void *ShowColor* ()
       *
       */
      ShowColor: ngcob_ShowButtonColor,
      /**
       *  Function: SetColorHSV
       *  -
       *
       *  Syntax:
       *    object *SetColorHSV* (float/null hue, float/null saturation, float/null value)
       *
       *  Parameters:
       *    hue - null if do not set hue
       *    saturation - null if do not set saturation
       *    value - null if do not set value
       *
       *  Returns:
       *    {H:0-360, S:0-1, V:0-1, R:0-255, G:0-255, B:0-255, A:0-1, HEX:#??????, HEXA:#????????}
       */
      SetColorHSV: ngcob_SetHSV,
      /**
       *  Function: SetColorRGB
       *  -
       *
       *  Syntax:
       *    object *SetColorRGB* (integer/null red, integer/null green, integer/null blue)
       *
       *  Parameters:
       *    red - null if do not set red
       *    green - null if do not set green
       *    blue - null if do not set blue
       *
       *  Returns:
       *    {H:0-360, S:0-1, V:0-1, R:0-255, G:0-255, B:0-255, A:0-1, HEX:#??????, HEXA:#????????}
       */
      SetColorRGB: ngcob_SetRGB,
      /**
       *  Function: SetColorHEX
       *  -
       *
       *  Syntax:
       *    object *SetColorHEX* (string hexColor)
       *
       *  Parameters:
       *    hexColor -
       *
       *  Returns:
       *    {H:0-360, S:0-1, V:0-1, R:0-255, G:0-255, B:0-255, A:0-1, HEX:#??????, HEXA:#????????}
       */
      SetColorHEX: ngcob_SetHEX,
      /**
       *  Function: GetColor
       *  -
       *
       *  Syntax:
       *    object *GetColor* ()
       *
       *  Parameters:
       *    -
       *
       *  Returns:
       *    {R:0-255, G:0-255, B:0-255, A:0-1, [...]}
       */
      GetColor: ngcop_GetColor
    },
    /**
     *  Group: Events
     */
    Events: {
      OnUpdated: ngcob_AddHTMLContent,
      /**
       *  Function: OnColorChanging
       *  -
       *
       *  Syntax:
       *    boolean *OnColorChanging* (object targetColor)
       *
       *  Parameters:
       *    color - {H:0-360, S:0-1, V:0-1, R:0-255, G:0-255, B:0-255, A:0-1, HEX:#??????, HEXA:#????????}
       *
       *  Returns:
       *    - if change
       */
      OnColorChanging: null,
      /**
       *  Function: OnColorChanged
       *  -
       *
       *  Syntax:
       *    void *OnColorChanged* (object color)
       *
       *  Parameters:
       *    color - {H:0-360, S:0-1, V:0-1, R:0-255, G:0-255, B:0-255, A:0-1, HEX:#??????, HEXA:#????????}
       *
       *  Returns:
       *    -
       */
      OnColorChanged: null
    }
  });

  ngcop_SetDefColor(def,null);
  return ngCreateControlAsType(def,'ngButton',ref,parent);
}

/**
 * ADD COLOR BUTTON HTML CONTENT
 * @param button (ngButton)
 */
function ngcob_AddHTMLContent(button)
{
  var backgroundNode = document.getElementById(this.ID+'_BCK');
  var colorNode = document.getElementById(this.ID+'_CO');

  if(!backgroundNode || !colorNode){

    var buttonNode = this.Elm();
    if(!buttonNode){return true;}

    if(buttonNode.children[0]){
      buttonNode.children[0].style.zIndex = '3';
    }

    if(!backgroundNode){
      ng_AppendInnerHTML(
          buttonNode,
          '<div id="'+this.ID+'_BCK" style="display:block; position:absolute; overflow:hidden;'
            + ' z-index:1; left:0px; right:0px; top:0px; bottom:0px;"/>'
      );

      var backgroundNode = document.getElementById(this.ID+'_BCK');
      if(backgroundNode){
        ngcop_DrawTransparentBackground(
          backgroundNode,
          this.BackgroundImg
        );
      }
    }

    if(!colorNode){
      ng_AppendInnerHTML(
          buttonNode,
          '<div id="'+this.ID+'_CO" style="display:block; position:absolute; overflow:hidden;'
            + ' z-index:2; left:0px; right:0px; top:0px; bottom:0px;"/>'
      );
    }
  }

  if(this.GetColor()){
    this.ShowColor();
  }

  return true;
}

/**
 * SET COLOR TO COLOR BUTTON
 * @param button (ngColorButton)
 * @param color (object)
 * @returns (object)
 */
function ngcob_SetButtonColor(button,color)
{
  if(!button.AllowAlpha){
    color = ngcop_RemoveColorTransparency(color);
  }

  return ngcop_SetColor(button,color);
}

/**
 * SET HSV COLOR
 * @param hue (float/null)
 * @param saturation (float/null)
 * @param value (float/null)
 * @param alpha (float/null)
 * @returns (object) | color
 */
function ngcob_SetHSV(hue,saturation,value,alpha)
{
  var color = this.GetColor();
  color = ngcop_CheckHSV(hue,saturation,value,alpha,color);

  ngcob_ChangeColor(this,color);

  return this.GetColor();
}

/**
 * SET RGB COLOR
 * @param red (integer)
 * @param green (integer)
 * @param blue (integer)
 * @param alpha (float/null)
 * @returns (object) | color
 */
function ngcob_SetRGB(red,green,blue,alpha)
{
  var color = this.GetColor();
  color = ngcop_CheckRGB(red,green,blue,alpha,color);

  ngcob_ChangeColor(this,color);

  return this.GetColor();
}

/**
 * SET HEX COLOR
 * @param hexColor (string)
 * @returns (object) | color
 */
function ngcob_SetHEX(hexColor)
{
  if(
    (typeof hexColor !== 'string')
    || (hexColor.substring(0,1) !== '#')
  ){
    return this.GetColor();
  }

  var color = ngcop_HexToColor(hexColor);
  if(color === null){return this.GetColor();}

  ngcob_ChangeColor(this,color);

  return this.GetColor();
}

/**
 * SHOW COLOR IN COLOR BUTTON
 */
function ngcob_ShowButtonColor()
{
  var colorNode = document.getElementById(this.ID+'_CO');
  var color = this.GetColor();

  if(colorNode && (typeof color === 'object') && (color !== null)){
    colorNode.style.backgroundColor = 'rgb('+color.R+','+color.G+','+color.B+')';
    colorNode.style.opacity = color.A;
    colorNode.style.mozOpacity = color.A;
    colorNode.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity='+Math.floor(color.A*100)+')';
  }
}

/**
 * CHANGE COLOR BUTTON COLOR
 * @param button (ngButton)
 * @param color (object/null)
 */
function ngcob_ChangeColor(button,color)
{
  if(
    (typeof button.OnColorChanging === 'function')
    && !(button.OnColorChanging(color))
  ){return null;}

  ngcob_SetButtonColor(
      button,color
  );

  button.Update();

  if(typeof button.OnColorChanged === 'function'){
    button.OnColorChanged(color);
  }
}

/**
 *  Class: ngColorPickerDropDown
 *  Standard color picker drop down control.
 *
 *  See also:
 *    Abstract class <ngDropDown>.
 */

function ngColorPickerDropDown(def,ref,parent)
{
  /**
   *  Group: Properties
   */

  /**
   *  Variable: Color
   *  -
   *  Type: string/object
   *  Default value: {H:0,S:0,V:0,R:0,G:0,B:0,A:1,HEX:'#000000',HEXA:'#000000ff'}
   */

  def.Data = ngNullVal(def.Data, {});

  ng_MergeDef(def, {
    Data: {
      /**
       *  Variable: AllowAlpha
       *  - If alpha channel is allowed.
       *  Type: boolean
       *  Default value: true
       */
      AllowAlpha: true,

      MaxLength: (def.Data.AllowAlpha === false) ? 7 : 9
    },
    DropDown: {
      Type: 'ngColorPickerBox',
      Controls: {
        ModeBar: {},
        Hue_Panel: {}, Saturation_Panel: {}, Value_Panel: {},
        Red_Panel: {}, Green_Panel: {}, Blue_Panel: {},
        Alpha_Panel: {}, SatVal_Panel: {},
        Hex_Panel: {}, Preview_Panel: {},
        Buttons: {
          Type: 'ngPanel',
          Controls: {
            Submit: {
              Type: 'ngButton',
              Data: { ngTextD: 'colorpicker_Submit' },
              Events: { OnClick: ngcopdd_SubmitColor }
            },
            Cancel: {
              Type: 'ngButton',
              Data: { ngTextD: 'colorpicker_Cancel' },
              Events: { OnClick: ngcopdd_CancelColor }
            }
          }
        }
      }
    },
    OnCreated: function(edit){
      edit.ShowColor();
      return true;
    },
    Events: {
      OnBlur: function(){
        return ngcopdd_ValidateHex(this);
      },
      OnKeyPress: function(event,node){
        if(event.keyCode === 13){
          return ngcopdd_ValidateHex(this);
        }
        return true;
      }
    }
  });

  ngcop_SetDefColor(def,{H:0,S:0,V:0,R:0,G:0,B:0,A:1,HEX:'#000000',HEXA:'#000000ff'});

  var c = ngCreateControlAsType(def,
    (typeof def.CreateFrom === 'string') ? def.CreateFrom : 'ngDropDown',
    ref,parent
  );
  if(!c){return c;}
  c.DropDownButton.AddEvent('OnUpdated',ngcob_AddHTMLContent);
  c.DropDownButton.AddEvent('GetColor',function(){return this.Color;});
  c.DropDownButton.AddEvent('ShowColor',ngcob_ShowButtonColor);
  c.DropDownButton.AddEvent('OnClick',ngcopdd_OnUserDrop);
  c.DropDownButton.AllowAlpha = (c.AllowAlpha === false) ? false : true;

  /**
   *  Group: Methods
   */

  c.AddEvent('ShowColor',ngcopdd_ShowDropDownColor);

  /**
   *  Function: SetColorHSV
   *  -
   *
   *  Syntax:
   *    object *SetColorHSV* (float/null hue, float/null saturation, float/null value)
   *
   *  Parameters:
   *    hue - null if do not set hue
   *    saturation - null if do not set saturation
   *    value - null if do not set value
   *
   *  Returns:
   *    {H:0-360, S:0-1, V:0-1, R:0-255, G:0-255, B:0-255, A:0-1, HEX:#??????, HEXA:#????????}
   */
  c.AddEvent('SetColorHSV',ngcopdd_SetHSV);

  /**
   *  Function: SetColorRGB
   *  -
   *
   *  Syntax:
   *    object *SetColorRGB* (integer/null red, integer/null green, integer/null blue)
   *
   *  Parameters:
   *    red - null if do not set red
   *    green - null if do not set green
   *    blue - null if do not set blue
   *
   *  Returns:
   *    {H:0-360, S:0-1, V:0-1, R:0-255, G:0-255, B:0-255, A:0-1, HEX:#??????, HEXA:#????????}
   */
  c.AddEvent('SetColorRGB',ngcopdd_SetRGB);

  /**
   *  Function: SetColorHEX
   *  -
   *
   *  Syntax:
   *    object *SetColorHEX* (string hexColor)
   *
   *  Parameters:
   *    hexColor -
   *
   *  Returns:
   *    {H:0-360, S:0-1, V:0-1, R:0-255, G:0-255, B:0-255, A:0-1, HEX:#??????, HEXA:#????????}
   */
  c.AddEvent('SetColorHEX',ngcopdd_SetHEX);

  /**
   *  Function: GetColor
   *  -
   *
   *  Syntax:
   *    object *GetColor* ()
   *
   *  Parameters:
   *    -
   *
   *  Returns:
   *    {R:0-255, G:0-255, B:0-255, A:0-1, [...]}
   */
  c.AddEvent('GetColor',ngcop_GetColor);

  /**
   *  Group: Events
   */

  /**
   *  Function: OnColorChanging
   *  -
   *
   *  Syntax:
   *    boolean *OnColorChanging* (object targetColor)
   *
   *  Parameters:
   *    color - {H:0-360, S:0-1, V:0-1, R:0-255, G:0-255, B:0-255, A:0-1, HEX:#??????, HEXA:#????????}
   *
   *  Returns:
   *    - if change

   */
  c.OnColorChanging = null;

  /**
   *  Function: OnColorChanged
   *  -
   *
   *  Syntax:
   *    void *OnColorChanged* (object color)
   *
   *  Parameters:
   *    color - {H:0-360, S:0-1, V:0-1, R:0-255, G:0-255, B:0-255, A:0-1, HEX:#??????, HEXA:#????????}
   *
   *  Returns:
   *    -
   */
  c.OnColorChanged = null;

  return c;
}

/**
 * SUBMIT DROP DOWN PICKER COLOR
 */
function ngcopdd_SubmitColor()
{
  var picker = this.Owner.Owner;
  var edit = picker.Owner;
  edit.HideDropDown();

  ngcopdd_ChangeColor(
    edit,
    picker.GetColor()
  );

  return true;
}

/**
 * CANCEL DROP DOWN PICKER COLOR
 */
function ngcopdd_CancelColor()
{
  var picker = this.Owner.Owner;
  var edit = picker.Owner;
  edit.HideDropDown();
  return true;
}

/**
 * CANCEL DROP DOWN PICKER COLOR
 */
function ngcopdd_OnUserDrop()
{
  var edit = this.Parent;
  var picker = edit.DropDownControl;
  if(picker.Visible){
    ngcopch_SetPickerColor(
      picker,
      edit.GetColor()
    );
    return true;
  }
  return true;
}

/**
 * SET COLOR
 * @param dropDown (ngColorPickerDropDown)
 * @param color (object)
 * @returns (object) | color
 */
function ngcopdd_SetDropDownColor(dropDown,color)
{

  if(!dropDown.AllowAlpha){
    color = ngcop_RemoveColorTransparency(color);
  }

  return ngcop_SetColor(dropDown,color);
}

/**
 * SET HSV COLOR
 * @param hue (float/null)
 * @param saturation (float/null)
 * @param value (float/null)
 * @param alpha (float/null)
 * @returns (object) | color
 */
function ngcopdd_SetHSV(hue,saturation,value,alpha)
{
  var color = this.GetColor();
  color = ngcop_CheckHSV(hue,saturation,value,alpha,color);

  ngcopdd_ChangeColor(this,color);

  return this.GetColor();
}

/**
 * SET RGB COLOR
 * @param red (integer)
 * @param green (integer)
 * @param blue (integer)
 * @param alpha (float/null)
 * @returns (object) | color
 */
function ngcopdd_SetRGB(red,green,blue,alpha)
{
  var color = this.GetColor();
  color = ngcop_CheckRGB(red,green,blue,alpha,color);

  ngcopdd_ChangeColor(this,color);

  return this.GetColor();
}

/**
 * SET HEX COLOR
 * @param hexColor (string)
 * @returns (object) | color
 */
function ngcopdd_SetHEX(hexColor)
{
  if(
    (typeof hexColor !== 'string')
    || (hexColor.substring(0,1) !== '#')
  ){
    return this.GetColor();
  }

  var color = ngcop_HexToColor(hexColor);
  if(color === null){return this.GetColor();}

  ngcopdd_ChangeColor(this,color);

  return this.GetColor();
}

/**
 * CHANGE DROPDOWN COLOR
 * @param dropDown (ngEdit)
 * @param color (object/null)
 */
function ngcopdd_ChangeColor(dropDown,color)
{
  if(
    (typeof dropDown.OnColorChanging === 'function')
    && !(dropDown.OnColorChanging(color))
  ){return null;}

  ngcopdd_SetDropDownColor(
      dropDown,color
    );

  dropDown.Update();

  if(typeof dropDown.OnColorChanged === 'function'){
    dropDown.OnColorChanged(color);
  }
}

/**
 * SHOW COLOR PICKER DROP DOWN COLOR
 */
function ngcopdd_ShowDropDownColor()
{
  var color = ngcob_SetButtonColor(
    this.DropDownButton,
    this.GetColor()
  );

  var text = (this.AllowAlpha) ? color.HEXA : color.HEX;
  this.SetText(text.toUpperCase());

  if(this.DropDownControl.Visible){
    ngcopch_SetPickerColor(
      this.DropDownControl,
      color
    );
  }
}

/**
 * VALIDATE COLOR PICKER DROP DOWN HEX VALUE
 * @param edit (ngEdit)
 */
function ngcopdd_ValidateHex(edit)
{
  var text = edit.GetText();

  var firstL = text.substring(0,1);
  if(firstL !== '#'){ text = '#'+text; }

  if(
    (edit.AllowAlpha && (text.length === 9))
    || (!edit.AllowAlpha && (text.length === 7))
  ){

    var rgb = (edit.AllowAlpha)
      ? ColorsConverter.HexToRGBA(text)
      : ColorsConverter.HexToRGB(text);

    if(rgb){

      if(typeof rgb.A === 'undefined'){rgb.A = 1;}

      var color = ngcop_RecalculateHSV(rgb);
      color = ngcop_RecalculateHEX(color);

      text = text.toUpperCase();

      if(
        (edit.AllowAlpha && (text === color.HEXA.toUpperCase()))
        || (!edit.AllowAlpha && (text === color.HEX.toUpperCase()))
      ){
        edit.SetInvalid(false);
        ngcopdd_ChangeColor(edit,color);
        return true;
      }
    }
  }

  edit.SetInvalid(true);
  return true;
}

/**
 *  Class: ngColorPickerHint
 *  Standard color picker hint control.
 *
 *  See also:
 *    Abstract class <ngHint>.
 */

function ngColorPickerHint(def,ref,parent)
{
  ng_MergeDef(def, {
    ParentReferences: false,
    Controls: {
      Picker: {
        Type: 'ngColorPickerBox',
        Controls: {
          ModeBar: {},
          Hue_Panel: {}, Saturation_Panel: {}, Value_Panel: {},
          Red_Panel: {}, Green_Panel: {}, Blue_Panel: {},
          Alpha_Panel: {}, SatVal_Panel: {},
          Hex_Panel: {}, Preview_Panel: {},
          Buttons: {
            Type: 'ngPanel',
            Controls: {
              Submit: {
                Type: 'ngButton',
                Data: { ngTextD: 'colorpicker_Submit' }
              },
              Cancel: {
                Type: 'ngButton',
                Data: { ngTextD: 'colorpicker_Cancel' }
              }
            }
          }
        }
      }
    }
  });

  return ngCreateControlAsType(def,
    (typeof def.CreateFrom === 'string') ? def.CreateFrom : 'ngHint',
    ref,parent
  );
}

/**
 *  Class: ngColorPickerButton
 *  Standard color picker button control.
 *
 *  See also:
 *    Abstract class <ngColorButton>.
 */

function ngColorPickerButton(def,ref,parent)
{
  ng_MergeDef(def, {
    Data: {

      /**
       *  Group: Properties
       */

      /**
       *  Variable: PickerLayout
       *  - Hint color picker layout.
       *  Type: integer
       *  Default value: null
       */
      PickerLayout: null,

      /**
       *  Variable: HintDef
       *  - Hint definition.
       *  Type: boolean
       *  Default value: object
       */
      HintDef: {
        Type: 'ngColorPickerHint',
        Controls: {
          Picker: {
            Controls: {
              ModeBar: {},
              Hue_Panel: {}, Saturation_Panel: {}, Value_Panel: {},
              Red_Panel: {}, Green_Panel: {}, Blue_Panel: {},
              Alpha_Panel: {}, SatVal_Panel: {},
              Hex_Panel: {}, Preview_Panel: {},
              Buttons: {
                Controls: {
                  Submit: {
                    Events: { OnClick: ngcopb_SubmitColor }
                  },
                  Cancel: {
                    Events: { OnClick: ngcopb_CancelColor }
                  }
                }
              }
            }
          }
        }
      }
    },
    Events: {
      OnClick: function(){
        if(!this.Hint && (typeof this.HintDef === 'object')){
          this.Hint = ngCreateHint(this.HintDef);
          this.Hint.Owner = this;
        }
        if(this.Hint && (typeof this.Hint.PopupCtrl === 'function')){
          this.Hint.PopupCtrl(this);

          var picker = this.Hint.Controls.Picker;
          if(picker){
            ngcopch_SetPickerColor(
              picker,this.GetColor()
            );
          }
        }
      }
    }
  });

  var pLayout = def.Data.PickerLayout;
  if(typeof pLayout === 'number'){
    def.Data.HintDef.Controls.Picker.Layout = pLayout;
  }

  if(def.Data && def.Data.HintDef){
    if(typeof def.Data.HintDef.Data !== 'object'){
      def.Data.HintDef.Data = {};
    }
    def.Data.HintDef.Data.AllowAlpha =
      (def.Data.AllowAlpha === false) ? false : true;
  }

  var c = ngCreateControlAsType(def,
    (typeof def.CreateFrom === 'string') ? def.CreateFrom : 'ngColorButton',
    ref,parent
  );
  if(!c){return c;}

  c.AddEvent('ShowColor',ngcopb_ShowButtonColor);

  return c;
}

/**
 * SUBMIT COLOR PICKER BUTTON COLOR
 */
function ngcopb_SubmitColor()
{
  var picker = this.Owner.Owner;
  var hint = picker.Owner.Owner;
  hint.SetVisible(false);

  ngcob_ChangeColor(
    hint.Owner,
    picker.GetColor()
  );

  return true;
}

/**
 * CANCEL COLOR PICKER BUTTON COLOR
 */
function ngcopb_CancelColor()
{
  var hint = this.Owner.Owner.Owner.Owner;
  if(typeof hint.SetVisible === 'function'){
    hint.SetVisible(false);
  }
  return true;
}

/**
 * SHOW COLOR IN COLOR PICKER BUTTON
 */
function ngcopb_ShowButtonColor()
{
  if(this.Hint && this.Hint.Visible){
    var picker = this.Hint.Controls.Picker;
    if(picker){
      ngcopch_SetPickerColor(picker,this.GetColor());
    }
  }
}