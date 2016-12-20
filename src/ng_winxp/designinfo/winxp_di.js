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

if (typeof ngUserControls === 'undefined') ngUserControls = [];
var WinXP_DesignInfo = {
  OnInit: function() {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('stdPanel',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        IsContainer: true,
        Properties: ng_DIProperties({
          "Data": {
            "FormID": { Level: 'advanced' }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('stdFrame',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        IsContainer: true,
        Properties: ng_DIProperties({
          "Data": {
            "FormID": { Level: 'advanced' }
          }
        })
      };
    });
/*    ngRegisterControlDesignInfo('stdAlignPanel',function(d,c,ref) {
      return {
      };
    });
    ngRegisterControlDesignInfo('stdAlignFrame',function(d,c,ref) {
      return {
      };
    });*/
    ngRegisterControlDesignInfo('stdText',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wxpText'
              }
            }
          },
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('stdImage',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wxpImage'
              }
            }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('stdCheckBox',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wxpCheckBox'
              }
            }
          },
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "Data": {
            "TextAlign": {
              Types: {
                'string': {
                  DefaultValue: 'right',
                  EditorOptions: {
                    Items: ['left','right']
                  }
                }
              }
            },
            "LeftImg": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WinXPControls.Images.CheckBoxLeft' }
              }
            },
            "MiddleImg": { Level: 'advanced' },
            "RightImg": { Level: 'advanced' }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('stdRadioButton',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wxpRadio'
              }
            }
          },
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "Data": {
            "TextAlign": {
              Types: {
                'string': {
                  DefaultValue: 'right',
                  EditorOptions: {
                    Items: ['left','right']
                  }
                }
              }
            },
            "LeftImg": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WinXPControls.Images.RadioLeft' }
              }
            },
            "MiddleImg": { Level: 'advanced' },
            "RightImg": { Level: 'advanced' }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('stdButton',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wxpButton'
              }
            }
          },
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "Data": {
            "LeftImg": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WinXPControls.Images.DefButton.LeftImg' }
              }
            },
            "MiddleImg": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WinXPControls.Images.DefButton.MiddleImg' }
              }
            },
            "RightImg": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WinXPControls.Images.DefButton.RightImg' }
              }
            }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('stdFlatButton',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "style": {
            "color": { Level: 'advanced' },
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wxpFlatButton'
              }
            }
          },
          "Data": {
            "LeftImg": { Level: 'advanced' },
            "MiddleImg": { Level: 'advanced' },
            "RightImg": { Level: 'advanced' }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('stdLabel',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wxpLabel'
              }
            }
          },
          "Data": {
            "LeftImg": { Level: 'advanced' },
            "MiddleImg": { Level: 'advanced' },
            "RightImg": { Level: 'advanced' }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('stdLink',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wxpLink'
              }
            }
          },
          "Data": {
            "LeftImg": { Level: 'advanced' },
            "MiddleImg": { Level: 'advanced' },
            "RightImg": { Level: 'advanced' }
          }
        })
      };
    });

    function stdGroupDI(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "style": {
            "fontFamily": { Level: 'advanced' },
            "fontSize": { Level: 'advanced' }
          },
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wxpGroupBox'
              }
            }
          },
          "Data": {
            "Frame": { Level: 'advanced',
              Types: {
                'img_frame': {
                  ObjectProperties: {
                    "LeftTop": {
                      Types: {
                        'image': { DefaultValue: 'WinXPControls.Images.GroupBox.LeftTop' }
                      }
                    },
                    "Top": {
                      Types: {
                        'image': { DefaultValue: 'WinXPControls.Images.GroupBox.Top' }
                      }
                    },
                    "RightTop": {
                      Types: {
                        'image': { DefaultValue: 'WinXPControls.Images.GroupBox.RightTop' }
                      }
                    },
                    "Left": {
                      Types: {
                        'image': { DefaultValue: 'WinXPControls.Images.GroupBox.Left' }
                      }
                    },
                    "Right": {
                      Types: {
                        'image': { DefaultValue: 'WinXPControls.Images.GroupBox.Right' }
                      }
                    },
                    "LeftBottom": {
                      Types: {
                        'image': { DefaultValue: 'WinXPControls.Images.GroupBox.LeftBottom' }
                      }
                    },
                    "Bottom": {
                      Types: {
                        'image': { DefaultValue: 'WinXPControls.Images.GroupBox.Bottom' }
                      }
                    },
                    "RightBottom": {
                      Types: {
                        'image': { DefaultValue: 'WinXPControls.Images.GroupBox.RightBottom' }
                      }
                    }
                  }
                }
              }
            }
          }
        })
      };
    }
    ngRegisterControlDesignInfo('stdGroup',stdGroupDI);
    ngRegisterControlDesignInfo('stdGroupBox',function(d,c,ref) {
      var di=stdGroupDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });

    function stdEditDI(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "className": { Level: 'advanced',
            Types: {
              'string': {
                DefaultValue: 'wxpEdit'
              }
            }
          },
          Data: {
            "LeftImg": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WinXPControls.Images.Edit.LeftImg' }
              }
            },
            "MiddleImg": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WinXPControls.Images.Edit.MiddleImg' }
              }
            },
            "RightImg": { Level: 'advanced',
              Types: {
                'image': { DefaultValue: 'WinXPControls.Images.Edit.RightImg' }
              }
            }
          }
        })
      };
    }
    ngRegisterControlDesignInfo('stdEdit',stdEditDI);
    ngRegisterControlDesignInfo('stdEditBox',function(d,c,ref) {
      var di=stdEditDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });

    ngRegisterControlDesignInfo('stdColorPickerBox',function(d,c,ref) {
      return {
        NewControl: {
          _noMerge:true,
          Default: {
            Properties: {
              'W': { Value: 200 }
            }
          }
        },
        Properties: ng_DIProperties({
          'Data': {
            'AutoHeight': ng_DIPropertyBool(true, { Level: 'basic' }),
            'AsToolbar': ng_DIPropertyBool(true, { Level: 'basic' }),
            'Vertical': ng_DIPropertyBool(true, { Level: 'basic' })
          }
        })
      };
    });

    ngRegisterControlDesignInfo('stdColorButton',function(d,c,ref) {
      return {
        ControlCategory: 'Buttons',
        NewControl: {
          _noMerge:true,
          Default: {
            Properties: {
              'W': { Value: 100 }
            }
          }
        }
      };
    });

    ngRegisterControlDesignInfo('stdColorPickerDropDown',function(d,c,ref) {
      return {
        ControlCategory: 'Edits',
        NewControl: {
          _noMerge:true,
          Default: {
            Properties: {
              'W': { Value: 200 }
            }
          }
        },
        Properties: ng_DIProperties({
          'DropDown': ng_DIPropertyControl('weColorPickerBox', { Level: 'basic' }, 'weColorPickerBox', ng_DIProperties({
            'Data': {
              'MaxHeight': ng_DIProperty('integer',480,{ Level: 'basic' })
            }
          }))
        })
      };
    });

    ngRegisterControlDesignInfo('stdColorPickerHint',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        NewControl: {
          _noMerge:true
        },
        Properties: ng_DIProperties({
          'ModifyControls': {
            'Picker': ng_DIPropertyControl('weColorPickerBox', { Level: 'basic' }, 'weColorPickerBox', ng_DIProperties({
              'W': ng_DIProperty('bounds',196,{ Level: 'basic' })
            }))
          }
        }, { "ModifyControls": { Level: 'basic' } })
      };
    });
  }
};
ngUserControls['winxp_designinfo'] = WinXP_DesignInfo;