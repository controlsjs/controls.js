/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2014-2017 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */

if (typeof ngUserControls === 'undefined') ngUserControls = {};
var WinEight_DesignInfo = (function() {

  var undefined;
  var avail_schemes=[
    'Blue',
    'LtBlue',
    'Green',
    'Yellow',
    'Maroon',
    'Gray',
    'LtGray',
    'DkGray',
    'White'
  ];
  var used_schemes={};

return {
  OnFormEditorInit: function(FE)
  {
    FE.AddEvent('OnCreateForm', function(test) {
      if(!test) used_schemes={};
    });

    var skin_types = [
      // weMenuItem
      {
        TypeID: 'weMenuItem',
        TypeBase: 'ngMenuItem',
        Name: 'weMenuItem',
        ShortName: 'item',
        Basic: false,
        Options: {
          ObjectProperties: {
            "Image": ng_diMixed(['image', ng_diString('Empty',{},{
              Editor: 'ngfeEditor_DropDown',
              EditorOptions: {
                Items: function(api) {
                  var items=['Empty'];
                  if((typeof WinEightControls === 'object')&&(WinEightControls)) {
                    var images=WinEightControls.Images.AppIcons[0];
                    items=[];
                    for(var i in images) {
                      if((i==='_noMerge')||(i==='Src')) continue;
                      items.push(i);
                    }
                  }
                  return items;
                }
              }
            })], { DefaultType: 'string' })
          }
        }
      },
      // weMenuItems
      {
        TypeID: 'weMenuItems',
        TypeBase: 'ngMenuItems',
        Name: 'weMenuItems',
        ShortName: 'items',
        Basic: false,
        Options: {
          Priority: 0.5301,
          ChildDesignInfo: ng_diReplaceType('ngMenuItem','weMenuItem')
        }
      }
    ];
    FormEditor.RegisterPropertyType(skin_types);
  },
  OnControlCreated: function(def,c) {
    if(!FormEditor.Params.creatingform) return;
    if(typeof def.ColorScheme !== 'undefined') {
      var scheme=''+ngVal(def.ColorScheme,'');
      if(scheme!=='') used_schemes[scheme]=true;
    }
  },

  OnInit: function() {
    if(!ngDESIGNINFO) return;

    function deftheme() {
      var deftheme;
      if((typeof WinEightControls === 'object')&&(WinEightControls)) deftheme=WinEightControls.Theme;
      return ngVal(deftheme,1);
    }

    function themeDI(di, theme) {
      if(!di) di={};
      if(typeof theme==='undefined') theme=deftheme();
      ng_MergeVar(di, {
        Properties: {
          "Theme": ng_diIntegerIdentifiers(theme,['WE_DARK','WE_LIGHT'], { Level: 'basic', Order: 0.05 }, { Editor: 'ngfeEditor_DropDownList' })
        }
      });

      return di;
    }

    function defscheme() {
      var defscheme;
      if((typeof WinEightControls === 'object')&&(WinEightControls)) defscheme=WinEightControls.ColorScheme;
      return ngVal(defscheme,"Green");
    }

    function themeSchemeDI(di,theme,scheme) {
      return themeDI(schemeDI(di,scheme),theme);
    }

    function defSchemeClassName(schemesuffix) {
      return ng_diString('we'+defscheme()+ngVal(schemesuffix,''));
    }

    function defThemeClassName(css, light, dark) {
      if(typeof light==='undefined') light='we'+css+'Light';
      if(typeof dark==='undefined') dark='we'+css+'Dark';
      return ng_diString((deftheme() ? light : dark));
    }

    function defthemetxt() {
      return deftheme() ? 'Light' : 'Dark';
    }

    function defthemetxtinv() {
      return deftheme() ? 'Dark' : 'Light';
    }

    function defThemeSchemeClassName(css, schemesuffix, light, dark) {
      if(typeof light==='undefined') light='we'+css+'Light';
      if(typeof dark==='undefined') dark='we'+css+'Dark';
      return ng_diString((deftheme() ? light : dark) + ' we'+defscheme()+ngVal(schemesuffix,''));
    }

    function schemeDI(di, scheme) {
      if(!di) di={};
      if(typeof scheme==='undefined') scheme=defscheme();
      ng_MergeVar(di, {
        Properties: {
          "ColorScheme": ng_diString(scheme, { Level: 'basic', Order: 0.06 }, {
            Editor: 'ngfeEditor_DropDown',
            EditorOptions: {
              Items: function(api) {
                var items=[];
                for(var i in used_schemes) items.push(i);
                for(var i=0;i<avail_schemes.length;i++) {
                  if(!used_schemes[avail_schemes[i]]) items.push(avail_schemes[i]);
                }
                return items;
              }
            }
          })
        }
      });
      return di;
    }

    ngRegisterControlDesignInfo('wePanel',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: {
          "className": ng_diString('wePanel')
        }
      };
    });
    ngRegisterControlDesignInfo('weFrame',function(d,c,ref) {
      return {
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: {
          "className": ng_diString('wePanel')
        }
      };
    });

    ngRegisterControlDesignInfo('weColorPanel',function(d,c,ref) {
      return schemeDI({
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: {
          "className": defSchemeClassName()
        }
      });
    });
    ngRegisterControlDesignInfo('weColorFrame',function(d,c,ref) {
      return schemeDI({
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: {
          "className": defSchemeClassName()
        }
      });
    });
    
    ngRegisterControlDesignInfo('weText',function(d,c,ref) {
      return themeSchemeDI({
        ControlCategory: 'Label',
        Properties: {
          "className": defThemeClassName('Text')
        }
      });
    });
    
    ngRegisterControlDesignInfo('weSmallText',function(d,c,ref) {
      return themeSchemeDI({
        ControlCategory: 'Label',
        Properties: {
          "className": defThemeClassName('SmallText')
        }
      });
    });
    
    ngRegisterControlDesignInfo('weCaption',function(d,c,ref) {
      return themeSchemeDI({
        ControlCategory: 'Label',
        Properties: {
          "className": defThemeSchemeClassName('Caption','Text')
        }
      });
    });
    
    ngRegisterControlDesignInfo('weTitle',function(d,c,ref) {
      return themeSchemeDI({
        ControlCategory: 'Label',
        Properties: {
          "className": defThemeSchemeClassName('Title','Text')
        }
      });
    });
    
    ngRegisterControlDesignInfo('weImage',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        Properties: {
          "className": ng_diString('weImage')
        }
      };
    });
    
    function weCheckBoxDI(d,c,ref) {
      return themeSchemeDI({
        ControlCategory: 'Checkbox & Radio',
        Properties: ng_diProperties({
          "className": defThemeClassName('CheckBox'),
          "Data": {
            "TextAlign": ng_diStringValues('right', ['left','right']),
            "LeftImg": ng_diTypeVal('image', 'WinEightControls.Images.CheckBoxLeft'+defthemetxt())
          }
        })
      });
    }
    ngRegisterControlDesignInfo('weCheckBox',weCheckBoxDI);
    
    ngRegisterControlDesignInfo('weRadioButton',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "className": defThemeClassName('Radio'),
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WinEightControls.Images.RadioLeft'+defthemetxt())
          }
        })
      };
      ng_MergeVar(di,weCheckBoxDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('weToggleSwitch',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "className": defThemeClassName('ToggleSwitch'),
          "ColorScheme": undefined,
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WinEightControls.Images.ToggleSwitch'+defthemetxt())
          }
        })
      };
      ng_MergeVar(di,weCheckBoxDI(d,c,ref));
      return di;
    });
    
    function weButtonDI(d,c,ref) {
      return themeSchemeDI({
        ControlCategory: 'Button',
        Properties: ng_diProperties({
          "className": defThemeClassName('Button'),
          "Data": {
            "LeftImg": deftheme() ? ng_diNull() : ng_diTypeVal('image', 'WinEightControls.Images.Button'+defthemetxt()+'.LeftImg'),
            "MiddleImg": deftheme() ? ng_diNull() : ng_diTypeVal('image', 'WinEightControls.Images.Button'+defthemetxt()+'.MiddleImg'),
            "RightImg": deftheme() ? ng_diNull() : ng_diTypeVal('image', 'WinEightControls.Images.Button'+defthemetxt()+'.RightImg')
          }
        })
      });
    }
    ngRegisterControlDesignInfo('weButton',weButtonDI);
    
    ngRegisterControlDesignInfo('weAppButton',function(d,c,ref) {
      return themeDI({
        ControlCategory: 'Button',
        NewControl: {
          Default: {
            Properties: {
              "Data": {
                ObjectProperties: {
                  "Img": { Value: "OK" }
                }
              }
            }
          }
        },
        Properties: ng_diProperties({
          "className": defThemeClassName('AppButton'),
          "Data": {
            "MenuVAlign": ng_diString('bottom'),
            "MenuHAlign": ng_diString('center'),
            "MenuOverlapY": ng_diInteger(10),
            "MiddleImg": ng_diTypeVal('image', 'WinEightControls.Images.AppButton'+defthemetxt()),
            "Img": ng_diMixed(['image', ng_diString('Empty',{},{
              Editor: 'ngfeEditor_DropDown',
              EditorOptions: {
                Items: function(api) {
                  var items=['Empty'];
                  if((typeof WinEightControls === 'object')&&(WinEightControls)) {
                    var images=WinEightControls.Images.AppIcons[0];
                    items=[];
                    for(var i in images) {
                      if((i==='_noMerge')||(i==='Src')) continue;
                      items.push(i);
                    }
                  }
                  return items;
                }
              }
            })], { DefaultType: 'string' })
          }
        })
      });
    });
    
    ngRegisterControlDesignInfo('weLabel',function(d,c,ref) {
      return themeSchemeDI({
        ControlCategory: 'Label',
        Properties: {
          "className": defThemeClassName('Label')
        }
      });
    });
    
    ngRegisterControlDesignInfo('weLink',function(d,c,ref) {
      return themeSchemeDI({
        ControlCategory: 'Button',
        Properties: {
          "className": defThemeSchemeClassName('Link','Text')
        }
      });
    });
    
    function weGroupDI(d,c,ref) {
      return themeSchemeDI({
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": defThemeSchemeClassName('GroupBox','Text'),
          "Data": {
            "Frame": ng_diType('img_frame', {}, {
              ObjectProperties: {
                "Top": ng_diTypeVal('image', 'WinEightControls.Images.GroupBox.Top')
              }
            })
          }
        })
      });
    }
    ngRegisterControlDesignInfo('weGroup',weGroupDI);
    ngRegisterControlDesignInfo('weGroupBox',function(d,c,ref) {
      var di=weGroupDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });
    
    function weEditDI(d,c,ref) {
      return themeDI({
        ControlCategory: 'Edit',
        Properties: ng_diProperties({
          "className": defThemeClassName('Edit'),
          "DropDown": ng_diControl(undefined, themeSchemeDI({
            "className": ng_diString('weDropDownLight we'+defscheme()+'DropDown')
          }, 1/*WE_LIGHT*/).Properties),
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WinEightControls.Images.Edit'+defthemetxt()+'.LeftImg'),
            "MiddleImg": ng_diTypeVal('image', 'WinEightControls.Images.Edit'+defthemetxt()+'.MiddleImg'),
            "RightImg": ng_diTypeVal('image', 'WinEightControls.Images.Edit'+defthemetxt()+'.RightImg')
          }
        })
      });
    }
    ngRegisterControlDesignInfo('weEdit',weEditDI);
    ngRegisterControlDesignInfo('weEditBox',function(d,c,ref) {
      var di=weEditDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });
    
    function weEditBoxBtnDI(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "Buttons": { Level: 'advanced' },
          "Methods": {
            "Elipsis": ng_diFunction('function() { ng_CallParent(this, "Elipsis", arguments); }', { Level: 'advanced' })
          },
          "Events": {
            "OnElipsis": ng_diEvent('function(c, text) {}', { Level: 'basic' })
          }
        })
      };
      return di;
    };
    ngRegisterControlDesignInfo('weEditBoxBtn',function(d,c,ref) {
      var di=weEditBoxBtnDI(d,c,ref);
      ng_MergeVar(di,weEditDI(d,c,ref));
      return di;
    });
    
    function weSearchBoxDI(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "Buttons": { Level: 'advanced' },
          "Methods": {
            "Search": ng_diFunction('function(text) { ng_CallParent(this, "Search", arguments); }')
          },
          "Events": {
            "OnSearch": ng_diEvent('function(c, text) {}', { Level: 'basic' })
          }
        })
      };
      return di;
    }
    ngRegisterControlDesignInfo('weSearchBox',function(d,c,ref) {
      var di=weSearchBoxDI(d,c,ref);
      ng_MergeVar(di,weEditDI(d,c,ref));
      return di;
    });
    
    function weEditNumDI(d,c,ref) {
      var di={
        ControlCategory: 'Edit',
        Properties: ng_diProperties({
          "Data": {
            "TextAlign": ng_diString('center')
          }
        })
      };
      ng_MergeVar(di,weEditDI(d,c,ref));
      return di;
    }
    ngRegisterControlDesignInfo('weEditNum', weEditNumDI);
    ngRegisterControlDesignInfo('weEditBoxNum',function(d,c,ref) {
      var di=weEditNumDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });

    function weColorEditDI(d,c,ref) {
      return {
        NewControl: {
          _noMerge: true,
          Default: {
            Properties: {
              "W": { Value: 100 },
              "Data": {
                ObjectProperties: {
                  "Text": { Value: 'FFFFFF' }
                }
              }
            }
          }
        },
        Properties: ng_diProperties({
          "Data": {
            "TextAlign": ng_diString('center')
          },
          "Methods": {
            "GetColor": ng_diFunction('function() { return ng_CallParent(this, "GetColor", arguments); }')
          }
        })
      };
    }
    ngRegisterControlDesignInfo('weColorEdit',function(d,c,ref) {
      var di=weColorEditDI(d,c,ref);
      ng_MergeVar(di,weEditDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('weColorEditBox',function(d,c,ref) {
      var di=weColorEditDI(d,c,ref);
      ng_MergeVar(di,weEditDI(d,c,ref));
      di.ControlCategory=false;
      return di;
    });

    function weMaskEditDI(d,c,ref) {
      return themeDI({
        ControlCategory: 'Edit',
        Properties: ng_diProperties({
          "H": ng_diInteger(WinEightControls.Images[deftheme() ? 'EditLight' : 'EditDark'].MiddleImg.H),
          "Data": {
            "LeftDef": ng_diControl(undefined, ng_diProperties({
              "W": ng_diInteger(WinEightControls.Images[deftheme() ? 'EditLight' : 'EditDark'].LeftImg.W),
              "Data": {
                "LeftImg": ng_diTypeVal('image', 'WinEightControls.Images.Edit'+defthemetxt()+'.LeftImg'),
                "MiddleImg": ng_diTypeVal('image', 'WinEightControls.Images.Edit'+defthemetxt()+'.MiddleImg')
              }
            })),
            "EditDef": ng_diControl('weEdit', ng_diProperties({
              "Data": {
                "MiddleImg": ng_diTypeVal('image', 'WinEightControls.Images.Edit'+defthemetxt()+'.MiddleImg')
              }
            })),
            "StaticDef": ng_diControl('weLabel', ng_diProperties({
              "Data": {
                "MiddleImg": ng_diTypeVal('image', 'WinEightControls.Images.Edit'+defthemetxt()+'.MiddleImg')
              }
            })),
            "RightDef": ng_diControl(undefined, ng_diProperties({
              "W": ng_diInteger(WinEightControls.Images[deftheme() ? 'EditLight' : 'EditDark'].RightImg.W),
              "Data": {
                "MiddleImg": ng_diTypeVal('image', 'WinEightControls.Images.Edit'+defthemetxt()+'.MiddleImg'),
                "RightImg": ng_diTypeVal('image', 'WinEightControls.Images.Edit'+defthemetxt()+'.RightImg')
              }
            }))
          }
        })
      });
    }
    ngRegisterControlDesignInfo('weMaskEdit',weMaskEditDI);
    ngRegisterControlDesignInfo('weMaskEditBox',function(d,c,ref) {
      var di=weMaskEditDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });

    function weDropDownDI(d,c,ref) {
      return {
        ControlCategory: 'Dropdown',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "DropDown": { Value: "{ Type: 'weList' }"}
            }
          }
        }
      };
    }

    ngRegisterControlDesignInfo('weDropDown',function(d,c,ref) {
      var di=weDropDownDI(d,c,ref);
      ng_MergeVar(di,weEditDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('weDropDownList',function(d,c,ref) {
      var di=weDropDownDI(d,c,ref);
      ng_MergeVar(di,weEditDI(d,c,ref));
      return di;
    });
    
    function weMemoDI(d,c,ref) {
      return themeDI({
        ControlCategory: 'Edit',
        Properties: ng_diProperties({
          "className": defThemeClassName('Memo'),
          "Data": {
            "Frame": ng_diType('img_frame', {}, {
              ObjectProperties: {
                "LeftTop": ng_diTypeVal('image', 'WinEightControls.Images.Memo'+defthemetxt()+'.LeftTop'),
                "Top": ng_diTypeVal('image', 'WinEightControls.Images.Memo'+defthemetxt()+'.Top'),
                "RightTop": ng_diTypeVal('image', 'WinEightControls.Images.Memo'+defthemetxt()+'.RightTop'),
                "Left": ng_diTypeVal('image', 'WinEightControls.Images.Memo'+defthemetxt()+'.Left'),
                "Right": ng_diTypeVal('image', 'WinEightControls.Images.Memo'+defthemetxt()+'.Right'),
                "LeftBottom": ng_diTypeVal('image', 'WinEightControls.Images.Memo'+defthemetxt()+'.LeftBottom'),
                "Bottom": ng_diTypeVal('image', 'WinEightControls.Images.Memo'+defthemetxt()+'.Bottom'),
                "RightBottom": ng_diTypeVal('image', 'WinEightControls.Images.Memo'+defthemetxt()+'.RightBottom')
              }
            })
          }
        })
      });
    };
    ngRegisterControlDesignInfo('weMemo', weMemoDI);
    
    function wePagesDI(d,c,ref) {
      return themeSchemeDI({
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": defThemeSchemeClassName('Pages','Text'),
          "Data": {
            "PagesIndent": ng_diInteger(20),
            "PageImages": ng_diArray(undefined, {
              ObjectProperties: {
                0: ng_diObject({
                    "LeftImg": ng_diTypeVal('image', 'WinEightControls.Images.PagesUp'+defthemetxt()+'[0].LeftImg'),
                    "MiddleImg": ng_diTypeVal('image', 'WinEightControls.Images.PagesUp'+defthemetxt()+'[0].MiddleImg'),
                    "RightImg": ng_diTypeVal('image', 'WinEightControls.Images.PagesUp'+defthemetxt()+'[0].RightImg')
                  })
              }
            }),
            "Frame": ng_diType('img_frame', {}, {
              ObjectProperties: {
                "Top": ng_diTypeVal('image', 'WinEightControls.Images.PagesBoxUp'+defthemetxt()+'.Top'),
                "Left": ng_diTypeVal('image', 'WinEightControls.Images.PagesBoxUp'+defthemetxt()+'.Left'),
                "Right": ng_diTypeVal('image', 'WinEightControls.Images.PagesBoxUp'+defthemetxt()+'.Right'),
                "Bottom": ng_diTypeVal('image', 'WinEightControls.Images.PagesBoxUp'+defthemetxt()+'.Bottom')
              }
            })
          }
        })
      });
    };
    ngRegisterControlDesignInfo('wePages', wePagesDI);
    ngRegisterControlDesignInfo('weSections',function(d,c,ref) {
      return themeSchemeDI({
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": defThemeSchemeClassName('Sections','Text'),
          "Data": {
            "PageImages": ng_diArray(undefined, {
              ObjectProperties: {
                0: ng_diObject({
                    "MiddleImg": ng_diTypeVal('image', 'WinEightControls.Images.Sections.MiddleImg')
                  })
              }
            })
          }
        })
      });
    });
    
    ngRegisterControlDesignInfo('weToolBar',function(d,c,ref) {
      return themeSchemeDI({
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('weToolBar')
        })
      });
    });
    
    ngRegisterControlDesignInfo('weProgressBar',function(d,c,ref) {
      return themeSchemeDI({
        ControlCategory: 'Progress',
        Properties: ng_diProperties({
          "className": ng_diString('weProgressBar'),
          "Data": {
            "Smooth": ng_diBoolean(true),
            "MiddleImg": ng_diTypeVal('image', 'WinEightControls.Images.ProgressBar.MiddleImg'),
            "BarImg": ng_diTypeVal('image', 'WinEightControls.Images.ProgressBar.BarImg')
          }
        })
      });
    });
    
    function weProgressImgDI(d,c,ref) {
      return themeDI({
        ControlCategory: 'Progress',
        NewControl: {
          Default: {
            Properties: {
            }
          }
        },
        Properties: ng_diProperties({
          "className": defThemeClassName('Label'),
          "Data": {
            "TextAlign": ng_diString('center'),
            "HTMLEncode": ng_diBoolean(false)
          }
        })
      });
    };
    ngRegisterControlDesignInfo('weProgressRing', weProgressImgDI);
    ngRegisterControlDesignInfo('weProgressDot', weProgressImgDI);
    ngRegisterControlDesignInfo('weProgressLine', weProgressImgDI);

    function weListDI(d,c,ref) {
      return themeSchemeDI({
        ControlCategory: 'List',
        Properties: ng_diProperties({
          "className": deftheme() ? defThemeSchemeClassName('ListBox','ListBox') : ng_diString('weListBoxDark')
        })
      });
    }
    ngRegisterControlDesignInfo('weList',weListDI);
    ngRegisterControlDesignInfo('weListBox',function(d,c,ref) {
      var di=weListDI(d,c,ref);
      di.ControlCategory=false;
      return di;
    });
    ngRegisterControlDesignInfo('weTreeList',function(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "Data": {
            "DefaultIndent" : ng_diInteger(27),
            "TreeImg": ng_diTypeVal('image', 'WinEightControls.Images.TreeImg'+defthemetxt())
          }
        })
      };
      ng_MergeVar(di, weListDI(d,c,ref));
      return di;
    });

    function wePageListDI(d,c,ref) {
      return themeSchemeDI({
        ControlCategory: 'List',
        Properties: ng_diProperties({
          "className": defThemeClassName('ListBox'),
          Data: {
            "AverageItemHeight" : ng_diInteger(38)
          },
          "ModifyControls": {
            "List": ng_diControl('weList'),
            "Loading": ng_diControl('weProgressDot',ng_diProperties({
              "L": ng_diTypeVal('bounds', 10),
              "T": ng_diTypeVal('bounds', 8),
              "Data": {
                "Visible": ng_diBoolean(false)
              }
            }), { Level: 'basic' }),
            "NoData": ng_diControl('weText',ng_diProperties({
              "L": ng_diTypeVal('bounds', 10),
              "T": ng_diTypeVal('bounds', 8),
              "Data": {
                "Visible": ng_diBoolean(false)
              }
            }), { Level: 'basic' }),
            "Paging": ng_diControl(undefined, {
              "className": defThemeClassName('PageListPaging'),
              "H": ng_diTypeVal('bounds', 32)
            }),
            "FirstPage": ng_diControl('weButton',ng_diProperties({
              "Data": {
                "ToolBarHPadding": ng_diInteger(5),
                "Img": ng_diTypeVal('image', 'WinEightControls.Images.PagingFirst'+defthemetxt()),
                "Text": ng_diString('')
              }
            })),
            "PrevPage": ng_diControl('weButton',ng_diProperties({
              "Data": {
                "ToolBarHPadding": ng_diInteger(5),
                "Img": ng_diTypeVal('image', 'WinEightControls.Images.PagingPrev'+defthemetxt()),
                "Text": ng_diString('')
              }
            })),
            "PageNo": ng_diControl('weEdit',ng_diProperties({
              "W": ng_diTypeVal('bounds', 64),
              "Data": {
                "ToolBarHPadding": ng_diInteger(5),
                "Text": ng_diString('1'),
                "TextAlign": ng_diString('center')
              }
            })),
            "Page0": ng_diControl('weButton',ng_diProperties({
              "className": defThemeClassName('PageButton'),
              "Data": {
                "ToolBarHPadding": ng_diInteger(5),
                "Text": ng_diString('1'),
                "TextAlign": ng_diString('center')
              }
            })),
            "NextPage": ng_diControl('weButton',ng_diProperties({
              "Data": {
                "Img": ng_diTypeVal('image', 'WinEightControls.Images.PagingNext'+defthemetxt()),
                "Text": ng_diString(''),
                "ImgAlign": ng_diString('right'),
                "ToolBarHPadding": ng_diInteger(5)
              }
            })),
            "LastPage": ng_diControl('weButton',ng_diProperties({
              "Data": {
                "Img": ng_diTypeVal('image', 'WinEightControls.Images.PagingLast'+defthemetxt()),
                "ImgAlign": ng_diString('right'),
                "Text": ng_diString('')
              }
            }))
          }
        })
      });
    }
    ngRegisterControlDesignInfo('wePageList',wePageListDI);
    ngRegisterControlDesignInfo('wePageTreeList',function(d,c,ref) {
      var di={
        ControlCategory: 'List',
        IsContainer: true,
        Properties: ng_diProperties({
          "ModifyControls": {
            "List": ng_diControl('weTreeList')
          }
        })
      };
      ng_MergeVar(di,wePageListDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('weSplitPanel',function(d,c,ref) {
      return themeSchemeDI({
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": defThemeSchemeClassName('SplitPanel','Split'),
          "Data": {
            "HandleImg": ng_diTypeVal('image', 'WinEightControls.Images.VSplit'+defthemetxt())
          }
        })
      });
    });
    
    ngRegisterControlDesignInfo('weDropPanel',function(d,c,ref) {
      return themeSchemeDI({
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: ng_diProperties({
          "H": ng_diTypeVal('bounds', 72),
          "className": defThemeClassName('DropPanel'),
          "Button": ng_diControl(undefined, ng_diProperties({
            "Data": {
              "MiddleImg": ng_diTypeVal('image', 'WinEightControls.Images.DropPanelButtonMiddle'+defthemetxtinv()),
              "Img": ng_diTypeVal('image', 'WinEightControls.Images.DropPanelButton'+defthemetxtinv()),
              "TextAlign": ng_diString('right'),
              "ImgIndent": ng_diInteger(20)
            }
          }))
        })
      });
    });
    
    function weWindowDI(d,c,ref) {
      var frameimg = 'WinEightControls.Images.Window'+defthemetxt(),
          capimg= 'WinEightControls.Images.WindowCaption'+defthemetxt();
      return themeSchemeDI({
        ControlCategory: 'Window',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": defThemeSchemeClassName('Window',' we'+defscheme()+'Text'),
          "CloseBtn": ng_diBoolean(false, { Level: 'basic', Order: 0.31 }),
          "MaxBtn": ng_diBoolean(false, { Level: 'basic', Order: 0.31 }),
          "MinBtn": ng_diBoolean(false, { Level: 'basic', Order: 0.31 }),
          "Data": {
            "Frame": ng_diType('img_frame', {}, {
              ObjectProperties: {
                "LeftTop": ng_diTypeVal('image', frameimg+'.LeftTop'),
                "Top": ng_diTypeVal('image', frameimg+'.Top'),
                "RightTop": ng_diTypeVal('image', frameimg+'.RightTop'),
                "Left": ng_diTypeVal('image', frameimg+'.Left'),
                "Right": ng_diTypeVal('image', frameimg+'.Right'),
                "LeftBottom": ng_diTypeVal('image', frameimg+'.LeftBottom'),
                "Bottom": ng_diTypeVal('image', frameimg+'.Bottom'),
                "RightBottom": ng_diTypeVal('image', frameimg+'.RightBottom')
              }
            }),
            "CaptionImg": ng_diObject({
              "LeftImg": ng_diTypeVal('image', capimg+'.LeftImg'),
              "MiddleImg": ng_diTypeVal('image', capimg+'.MiddleImg'),
              "RightImg": ng_diTypeVal('image', capimg+'.RightImg')
            })
          }
        })
      });
    }
    ngRegisterControlDesignInfo('weWindow',weWindowDI);
    ngRegisterControlDesignInfo('weDialog',function(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "className": defThemeSchemeClassName('Dialog',' we'+defscheme()+'Text'),
          "CloseBtn": ng_diBoolean(true),
          "Data": {
            "Modal": ng_diBoolean(true),
            "Visible": ng_diBoolean(false),
            "Sizeable": ng_diBoolean(false),
            "Centered": ng_diBoolean(true)
          }
        })
      };
      ng_MergeVar(di,weWindowDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('weHint',function(d,c,ref) {
      return {
        ControlCategory: 'Hint',
        IsContainer: true,
        Properties: ng_diProperties({
          "className": ng_diString('weHint'),
          "Data": {
            "Frame": ng_diType('img_frame', {}, {
              ObjectProperties: {
                "Top": ng_diTypeVal('image', 'WinEightControls.Images.Hint.Top'),
                "Left": ng_diTypeVal('image', 'WinEightControls.Images.Hint.Left'),
                "Right": ng_diTypeVal('image', 'WinEightControls.Images.Hint.Right'),
                "Bottom": ng_diTypeVal('image', 'WinEightControls.Images.Hint.Bottom')
              }
            }),
            "Anchors": ng_diObject({
              "topleft": ng_diObject({
                "L": ng_diInteger(12),
                "T": ng_diInteger(-8),
                "HX": ng_diInteger(7),
                "HY": ng_diInteger(1),
                "Img": ng_diTypeVal('image', 'WinEightControls.Images.HintAnchorsImg.topleft')
              },undefined,undefined,'ngHintAnchor'),
              "topright": ng_diObject({
                "R": ng_diInteger(12),
                "T": ng_diInteger(-8),
                "HX": ng_diInteger(7),
                "HY": ng_diInteger(1),
                "Img": ng_diTypeVal('image', 'WinEightControls.Images.HintAnchorsImg.topright')
              },undefined,undefined,'ngHintAnchor'),
              "bottomright": ng_diObject({
                "R": ng_diInteger(12),
                "B": ng_diInteger(-8),
                "HX": ng_diInteger(7),
                "HY": ng_diInteger(8),
                "Img": ng_diTypeVal('image', 'WinEightControls.Images.HintAnchorsImg.bottomright')
              },undefined,undefined,'ngHintAnchor'),
              "bottomleft": ng_diObject({
                "L": ng_diInteger(12),
                "B": ng_diInteger(-8),
                "HX": ng_diInteger(7),
                "HY": ng_diInteger(8),
                "Img": ng_diTypeVal('image', 'WinEightControls.Images.HintAnchorsImg.bottomleft')
              },undefined,undefined,'ngHintAnchor'),
              "lefttop": ng_diObject({
                "L": ng_diInteger(-8),
                "T": ng_diInteger(12),
                "HX": ng_diInteger(1),
                "HY": ng_diInteger(7),
                "Img": ng_diTypeVal('image', 'WinEightControls.Images.HintAnchorsImg.lefttop')
              },undefined,undefined,'ngHintAnchor'),
              "leftbottom": ng_diObject({
                "L": ng_diInteger(-8),
                "B": ng_diInteger(12),
                "HX": ng_diInteger(1),
                "HY": ng_diInteger(7),
                "Img": ng_diTypeVal('image', 'WinEightControls.Images.HintAnchorsImg.leftbottom')
              },undefined,undefined,'ngHintAnchor'),
              "righttop": ng_diObject({
                "R": ng_diInteger(-8),
                "T": ng_diInteger(12),
                "HX": ng_diInteger(8),
                "HY": ng_diInteger(7),
                "Img": ng_diTypeVal('image', 'WinEightControls.Images.HintAnchorsImg.righttop')
              },undefined,undefined,'ngHintAnchor'),
              "rightbottom": ng_diObject({
                "R": ng_diInteger(-8),
                "B": ng_diInteger(12),
                "HX": ng_diInteger(8),
                "HY": ng_diInteger(7),
                "Img": ng_diTypeVal('image', 'WinEightControls.Images.HintAnchorsImg.rightbottom')
              },undefined,undefined,'ngHintAnchor')
            })
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('weTextHint',function(d,c,ref) {
      return {
        ControlCategory: 'Hint',
        Properties: ng_diProperties({
          "className": ng_diString('weTextHint'),
          "Data": {
            "Frame": ng_diType('img_frame', {}, {
              ObjectProperties: {
                "LeftTop": ng_diTypeVal('image', 'WinEightControls.Images.TextHint.LeftTop'),
                "Top": ng_diTypeVal('image', 'WinEightControls.Images.TextHint.Top'),
                "RightTop": ng_diTypeVal('image', 'WinEightControls.Images.TextHint.RightTop'),
                "Left": ng_diTypeVal('image', 'WinEightControls.Images.TextHint.Left'),
                "Right": ng_diTypeVal('image', 'WinEightControls.Images.TextHint.Right'),
                "LeftBottom": ng_diTypeVal('image', 'WinEightControls.Images.TextHint.LeftBottom'),
                "Bottom": ng_diTypeVal('image', 'WinEightControls.Images.TextHint.Bottom'),
                "RightBottom": ng_diTypeVal('image', 'WinEightControls.Images.TextHint.RightBottom')
              }
            }),
            "Anchors": ng_diObject({
              "topleft": ng_diObject({
                "L": ng_diInteger(12),
                "T": ng_diInteger(-8),
                "HX": ng_diInteger(7),
                "HY": ng_diInteger(1),
                "Img": ng_diTypeVal('image', 'WinEightControls.Images.TextHintAnchorsImg.topleft')
              },undefined,undefined,'ngHintAnchor'),
              "topright": ng_diObject({
                "R": ng_diInteger(12),
                "T": ng_diInteger(-8),
                "HX": ng_diInteger(7),
                "HY": ng_diInteger(1),
                "Img": ng_diTypeVal('image', 'WinEightControls.Images.TextHintAnchorsImg.topright')
              },undefined,undefined,'ngHintAnchor'),
              "bottomright": ng_diObject({
                "R": ng_diInteger(12),
                "B": ng_diInteger(-8),
                "HX": ng_diInteger(7),
                "HY": ng_diInteger(8),
                "Img": ng_diTypeVal('image', 'WinEightControls.Images.TextHintAnchorsImg.bottomright')
              },undefined,undefined,'ngHintAnchor'),
              "bottomleft": ng_diObject({
                "L": ng_diInteger(12),
                "B": ng_diInteger(-8),
                "HX": ng_diInteger(7),
                "HY": ng_diInteger(8),
                "Img": ng_diTypeVal('image', 'WinEightControls.Images.TextHintAnchorsImg.bottomleft')
              },undefined,undefined,'ngHintAnchor')
            })
          },
          "ModifyControls": {
            "Hint": ng_diControl('weText', {
              "L": ng_diTypeVal('bounds', 5),
              "T": ng_diTypeVal('bounds', 2),
              "Theme": ng_diIntegerIdentifiers('WE_LIGHT')
            })
          }
        })
      };
    });
    
    function weMessageDlgDI(d,c,ref) {
      return {
        ControlCategory: 'Dialog',
        IsContainer: false,
        Properties: ng_diProperties({
          "L": null,
          "R": null,
          "W": ng_diTypeVal('bounds_string', '100%'),
          "CloseBtn": ng_diBoolean(false),
          "DlgCheckBox": ng_diObject({
            "Checked": ng_diTypeValues('integer', 0, ['Unchecked','Checked','Grayed'], { Level: 'basic' }, { InitValue: 1 }),
            "AllowGrayed": ng_diBoolean(false, { Level: 'basic' }),
            "ngText": ng_diString('', { DisplayName: 'Text Resource (ngText)', Level: 'advanced' }, { Editor: 'ngfeEditor_Lang' }),
            "ngTextD": ng_diString('', { DisplayName: 'Text Resource (ngTextD)', Level: 'basic' }, { Editor: 'ngfeEditor_Lang' }),
            "Text": ng_diString('',{ Level: 'basic' }),
            "ngAlt": ng_diString('', { DisplayName: 'Alt Resource (ngAlt)', Level: 'advanced' }, { Editor: 'ngfeEditor_Lang' }),
            "ngAltD": ng_diString('', { DisplayName: 'Alt Resource (ngAltD)', Level: 'basic' }, { Editor: 'ngfeEditor_Lang' }),
            "Alt": ng_diString('', { Level: 'basic' }),
            "HTMLEncode": ng_diBoolean(ngVal(ngDefaultHTMLEncoding,false), { Level: 'basic' })
          }, { Level: 'basic' }),
          "DialogType": ng_diString('weDialog'),
          "Data": {
            "Frame": ng_diType('img_frame', {}, {
              ObjectProperties: {
                "LeftTop": ng_diTypeVal('image', null),
                "Top": ng_diTypeVal('image', null),
                "RightTop": ng_diTypeVal('image', null),
                "Left": ng_diTypeVal('image', null),
                "Right": ng_diTypeVal('image', null),
                "LeftBottom": ng_diTypeVal('image', null),
                "Bottom": ng_diTypeVal('image', null),
                "RightBottom": ng_diTypeVal('image', null)
              }
            }),
            "CaptionImg": ng_diObject({
              "LeftImg": ng_diTypeVal('image', null),
              "MiddleImg": ng_diTypeVal('image', null),
              "RightImg": ng_diTypeVal('image', null)
            })
          },
          "ModifyControls": {
            "Title": ng_diControl('weCaption', {
              "ColorScheme": ng_diString(deftheme() ? defscheme() : 'White'),
              "L": ng_diTypeVal('bounds_string', '25%'),
              "T": ng_diTypeVal('bounds', 27)
            }),
            "Message": ng_diControl('weText', {
              "L": ng_diTypeVal('bounds_string', '25%'),
              "T": ng_diTypeVal('bounds', 67)
            }),
            "Content": ng_diControl('ngPanel', {
              "L": ng_diTypeVal('bounds_string', '25%'),
              "R": ng_diTypeVal('bounds_string', '25%'),
              "H": ng_diTypeVal('bounds', 15)
            }),
            "Buttons": ng_diControl('ngToolBar', ng_diProperties({
              "L": ng_diTypeVal('bounds_string', '25%'),
              "R": ng_diTypeVal('bounds_string', '25%'),
              "H": ng_diTypeVal('bounds', 32),
              "Data": {
                "HAlign": ng_diString('right'),
                "CenterButtons": ng_diBoolean(false),
                "Vertical": ng_diBoolean(false),
                "HPadding": ng_diInteger(10)
              }
            })),
            "OK": ng_diControl('weButton', { "W": ng_diTypeVal('bounds', 90) }),
            "Yes": ng_diControl('weButton', { "W": ng_diTypeVal('bounds', 90) }),
            "No": ng_diControl('weButton', { "W": ng_diTypeVal('bounds', 90) }),
            "Cancel": ng_diControl('weButton', { "W": ng_diTypeVal('bounds', 90) }),
            "CheckBox": ng_diControl('weCheckBox', {
              "B": ng_diTypeVal('bounds', 10)
            }, { Level: 'basic' })
          }
        })
      };
    };
    ngRegisterControlDesignInfo('weMessageDlg',weMessageDlgDI);
    ngRegisterControlDesignInfo('weDlgMessageBox',function(d,c,ref) {
      var di=weMessageDlgDI(d,c,ref);
      ng_MergeVar(di, {
        Properties: {
          "DlgButtons": ng_diTypeVal('bitmask', mbOK)
        }
      })
      di.ControlCategory=false;
      return di;
    });
    
    function dlgInputBoxDI(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "DlgAllowEmpty": ng_diBoolean(false, { Level: 'basic' }),
          "DialogType": ng_diString('weMessageDlg'),
          "DlgButtons": ng_diTypeVal('bitmask', mbOK|mbCancel),
          "DlgHint": ng_diString('', { Level: 'basic' }),
          "ModifyControls": {
            "Message": ng_diControl(undefined, ng_diProperties({
              "Data": {
                "MinWidth": ng_diInteger(250)
              }
            })),
            "Content": ng_diControl(undefined, {
              "H": ng_diTypeVal('bounds', 68)
            }),
            "Edit": ng_diControl('weEdit', {
              "T": ng_diTypeVal('bounds', 6)
            }, { Level: 'basic' }, { InheritedFrom: 'ngEdit' })
          }
        })
      };
      ng_MergeVar(di,weMessageDlgDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('weDlgInputBox',dlgInputBoxDI);

    function dlgDropDownBoxDI(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "DlgItems": ng_diMixed(['ngListItems','ngListStringItems'], { Collapsed: false, Level: 'basic' }),
          "ModifyControls": {
            "Edit": ng_diControl('weDropDown', {
              "DropDown": ng_diControl('weList', {
                "Theme": ng_diIntegerIdentifiers('WE_LIGHT')
              })
            }, { Level: 'basic' }, { InheritedFrom: 'ngDropDown' })
          }
        })
      };
      ng_MergeVar(di,dlgInputBoxDI(d,c,ref));
      return di;
    }

    ngRegisterControlDesignInfo('weDlgDropDownBox',dlgDropDownBoxDI);
    ngRegisterControlDesignInfo('weDlgDropDownListBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "ModifyControls": {
            "Edit": ng_diControl('weDropDownList', {}, { Level: 'basic' }, { InheritedFrom: 'ngDropDownList' })
          }
        })
      };
      ng_MergeVar(di,dlgDropDownBoxDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('weDlgMemoBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "ModifyControls": {
            "Content": ng_diControl(undefined, {
              "H": ng_diTypeVal('bounds', 132)
            }),
            "Edit": ng_diControl('weMemo', {
              "H": ng_diTypeVal('bounds', 100)
            }, { Level: 'basic' }, { InheritedFrom: 'ngMemo' })
          }
        })
      };
      ng_MergeVar(di,dlgInputBoxDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('weDlgListBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "DlgAllowEmpty": ng_diBoolean(false, { Level: 'basic' }),
          "DlgItems": ng_diMixed(['ngListItems','ngListStringItems'], { Level: 'basic', Collapsed: false }),
          "DialogType": ng_diString('weMessageDlg'),
          "DlgButtons": ng_diTypeVal('bitmask', mbOK|mbCancel),
          "ModifyControls": {
            "Message": ng_diControl(undefined, ng_diProperties({
              "Data": {
                "MinWidth": ng_diInteger(300)
              }
            })),
            "Content": ng_diControl(undefined, {
              "H": ng_diTypeVal('bounds', 276)
            }),
            "List": ng_diControl('weList', ng_diProperties({
              "T": ng_diTypeVal('bounds', 6),
              "H": ng_diTypeVal('bounds', 250),
              "Data": {
                "SelectType": ng_diIntegerIdentifiers('nglSelectSingle')
              }
            }), { Level: 'basic' }, { InheritedFrom: 'ngList' })
          }
        })
      };
      ng_MergeVar(di,weMessageDlgDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('weDlgProgressBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "DlgButtons": ng_diTypeVal('bitmask', mbNone),
          "ModifyControls": {
            "Message": ng_diControl(undefined, ng_diProperties({
              "Data": {
                "MinWidth": ng_diInteger(230)
              }
            })),
            "Content": ng_diControl(undefined, {
              "H": ng_diTypeVal('bounds', 16)
            }),
            "Progress": ng_diControl('weProgressBar', {
              "T": ng_diTypeVal('bounds', 5)
            }, { Level: 'basic' }, { InheritedFrom: 'ngProgressBar' })
          }
        })
      };
      ng_MergeVar(di,weMessageDlgDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('weDlgWaitBox',function(d,c,ref) {
      var di = {
        Properties: ng_diProperties({
          "DlgButtons": ng_diTypeVal('bitmask', mbNone),
          "ModifyControls": {
            "Title": undefined,
            "Message": ng_diControl(undefined, {
              "L": ng_diTypeVal('bounds', 40)
            }),
            "Progress": ng_diControl('weProgressLine', {
              "L": ng_diTypeVal('bounds', -45),
              "T": ng_diTypeVal('bounds', 5)
            }, { Level: 'basic' }),
            "Content": ng_diControl(undefined, ng_diProperties({
              "Data": {
                "Visible": ng_diBoolean(false)
              }
            }))
          }
        })
      };
      ng_MergeVar(di,weMessageDlgDI(d,c,ref));
      return di;
    });
    
    ngRegisterControlDesignInfo('weDlgAbout',function(d,c,ref) {
      return {
        ControlCategory: 'Dialog',
        Properties: ng_diProperties({
          "DialogType": ng_diString('weDlgMessageBox'),
          "DlgIcon": ng_diNull(),
          "ModifyControls": {
            "Title": undefined,
            "Message": ng_diControl(undefined, ng_diProperties({
              "className": deftheme() ? defThemeSchemeClassName('AboutMessage','Text') : defThemeClassName('AboutMessage'),
              "Data": {
                "MinWidth": ng_diInteger(260)
              }
            })),
            "Content": ng_diControl(undefined, {
              "H": ng_diTypeVal('bounds', 190)
            }),
            "AppInfo": ng_diControl('weListBox', ng_diProperties({
              "className": defThemeClassName('TextListBox',' weAboutList'),
              "H": ng_diTypeVal('bounds', 150),
              "Data": {
                "DefaultIndent": ng_diInteger(0)
              }
            }))
          }
        })
      };
    });
    
    ngRegisterControlDesignInfo('weCalendar',function(d,c,ref) {
      return themeSchemeDI({
        ControlCategory: 'Misc',
        Properties: ng_diProperties({
          "className": deftheme() ? defThemeSchemeClassName('Calendar','Calendar') : ng_diString('weCalendarDark')
        })
      });
    });
    
    function weEditDateDI(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "DropDown": ng_diControl('weCalendar', ng_diProperties({
            "className": deftheme() ? defThemeSchemeClassName('Calendar','Calendar weDropDownLight we'+defscheme()+'DropDown') : ng_diString('weCalendarDark weDropDownDark we'+defscheme()+'DropDown'),
            "style": {
              "padding": ng_diString('10px', { Level: 'basic' })
            }
          }), { Level: 'basic' })
        })
      };
      ng_MergeVar(di,weEditDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('weEditDate',weEditDateDI);
    
    function weEditTimeDI(d,c,ref) {
      var di={
        Properties: ng_diProperties({
          "DropDown": ng_diControl('weList', {}, { Level: 'basic' })
        })
      };
      ng_MergeVar(di,weEditDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('weEditTime',weEditTimeDI);

    function colorpicker_barButtonDef(props) {
      return ng_diControl('weButton',ng_diProperties(props));
    }
    function colorpicker_sliderDef(props) {
      ng_MergeVar(props,{
        'L': ng_diTypeVal('bounds',10),
        'T': ng_diTypeVal('bounds',32),
        'R': ng_diTypeVal('bounds',10),
        'H': ng_diTypeVal('bounds',28),
        'className': defThemeClassName('ColorPickerSlider'),
        'Data': {
          'WithEditBounds': ng_diObject({ 'R': ng_diInteger(92) }),
          'WithoutEditBounds': ng_diObject({ 'R': ng_diInteger(10) })
        }
      });
      return ng_diControl(undefined, ng_diProperties(props));
    }

    function colorpicker_editDef() {
      return ng_diControl('weEdit', {
        'R': ng_diTypeVal('bounds',10),
        'W': ng_diTypeVal('bounds',80),
        'T': ng_diTypeVal('bounds',32)
      });
    }

    function colorpicker_labelDef() {
      return ng_diControl('weLabel', ng_diProperties({
        'L': ng_diTypeVal('bounds',10),
        'R': ng_diTypeVal('bounds',10),
        'Data': {
          'TextAlign': ng_diString('left')
        }
      }));
    }


    ngRegisterControlDesignInfo('weColorPickerBox',function(d,c,ref) {
      return themeDI({
        ControlCategory: 'Misc',
        NewControl: {
          Default: {
            Properties: {
              'W': { Value: 300 }
            }
          }
        },
        Properties: ng_diProperties({
          'className': defThemeClassName('ColorPicker'),
          'Data': {
            'AutoHeight': ng_diBoolean(true),
            'AsToolbar': ng_diBoolean(true),
            'Vertical': ng_diBoolean(true)
          },
          'ModifyControls': {
            'ModeBar': ng_diControl(undefined, ng_diProperties({
              'H': ng_diTypeVal('bounds',42),
              'ModifyControls': {
                'Bar': ng_diControl(undefined, ng_diProperties({
                  'L': ng_diTypeVal('bounds',10),
                  'R': ng_diTypeVal('bounds',10),
                  'T': ng_diTypeVal('bounds',10),
                  'H': ng_diTypeVal('bounds',32),
                  'ModifyControls': {
                    'Env_H_SV': ng_diControl(undefined, ng_diProperties({
                      'W': ng_diTypeVal('bounds_string','33%'),
                      'ModifyControls': {
                        'H_SV': colorpicker_barButtonDef({
                          'R': ng_diTypeVal('bounds',1)
                        })
                      }
                    })),
                    'Env_HSV': ng_diControl(undefined, ng_diProperties({
                      'L': ng_diTypeVal('bounds_string','33%'),
                      'R': ng_diTypeVal('bounds_string','33%'),
                      'ModifyControls': {
                        'HSV': colorpicker_barButtonDef({
                          'L': ng_diTypeVal('bounds',1),
                          'R': ng_diTypeVal('bounds',1)
                        })
                      }
                    })),
                    'Env_RGB': ng_diControl(undefined, ng_diProperties({
                      'W': ng_diTypeVal('bounds_string','33%'),
                      'ModifyControls': {
                        'RGB': colorpicker_barButtonDef({
                          'L': ng_diTypeVal('bounds',1)
                        })
                      }
                    }))
                  }
                }))
              }
            })),
            'Hue_Panel': ng_diControl(undefined, ng_diProperties({
              'H': ng_diTypeVal('bounds',64),
              'ModifyControls': {
                'Hue': colorpicker_sliderDef(),
                'HueEdit': colorpicker_editDef(),
                'HueLabel': colorpicker_labelDef()
              }
            })),
            'Saturation_Panel': ng_diControl(undefined, ng_diProperties({
              'H': ng_diTypeVal('bounds',64),
              'ModifyControls': {
                'Saturation': colorpicker_sliderDef(),
                'SaturationEdit': colorpicker_editDef(),
                'SaturationLabel': colorpicker_labelDef()
              }
            })),
            'Value_Panel': ng_diControl(undefined, ng_diProperties({
              'H': ng_diTypeVal('bounds',64),
              'ModifyControls': {
                'Value': colorpicker_sliderDef(),
                'ValueEdit': colorpicker_editDef(),
                'ValueLabel': colorpicker_labelDef()
              }
            })),
            'Red_Panel': ng_diControl(undefined, ng_diProperties({
              'H': ng_diTypeVal('bounds',64),
              'ModifyControls': {
                'Red': colorpicker_sliderDef(),
                'RedEdit': colorpicker_editDef(),
                'RedLabel': colorpicker_labelDef()
              }
            })),
            'Green_Panel': ng_diControl(undefined, ng_diProperties({
              'H': ng_diTypeVal('bounds',64),
              'ModifyControls': {
                'Green': colorpicker_sliderDef(),
                'GreenEdit': colorpicker_editDef(),
                'GreenLabel': colorpicker_labelDef()
              }
            })),
            'Blue_Panel': ng_diControl(undefined, ng_diProperties({
              'H': ng_diTypeVal('bounds',64),
              'ModifyControls': {
                'Blue': colorpicker_sliderDef(),
                'BlueEdit': colorpicker_editDef(),
                'BlueLabel': colorpicker_labelDef()
              }
            })),
            'Alpha_Panel': ng_diControl(undefined, ng_diProperties({
              'H': ng_diTypeVal('bounds',64),
              'ModifyControls': {
                'Alpha': colorpicker_sliderDef(),
                'AlphaEdit': colorpicker_editDef(),
                'AlphaLabel': colorpicker_labelDef()
              }
            })),
            'SatVal_Panel': ng_diControl(undefined, ng_diProperties({
              'H': ng_diTypeVal('bounds',258),
              'ModifyControls': {
                'SatVal': ng_diControl(undefined, ng_diProperties({
                  'L': ng_diTypeVal('bounds',10),
                  'R': ng_diTypeVal('bounds',10),
                  'T': ng_diTypeVal('bounds',32),
                  'className': defThemeClassName('ColorPickerSatVal'),
                  'ModifyControls': {
                    'Cursor': ng_diControl('ngImage', ng_diProperties({
                      'Data': {
                        'Img': ng_diTypeVal('image', 'WinEightControls.Images.ColorPicker'+defthemetxt()+'.SatValCursor')
                      }
                    }))
                  }
                })),
                'SatValLabel': colorpicker_labelDef()
              }
            })),
            'Hex_Panel': ng_diControl(undefined, ng_diProperties({
              'H': ng_diTypeVal('bounds',64),
              'ModifyControls': {
                'AHexEdit': ng_diControl('weEdit', ng_diProperties({
                  'L': ng_diTypeVal('bounds',10),
                  'W': ng_diTypeVal('bounds',120),
                  'T': ng_diTypeVal('bounds',32),
                  'Data': {
                    'TextAlign': ng_diString('left')
                  }
                })),
                'HexEdit': ng_diControl('weEdit', ng_diProperties({
                  'R': ng_diTypeVal('bounds',10),
                  'W': ng_diTypeVal('bounds',120),
                  'T': ng_diTypeVal('bounds',32),
                  'Data': {
                    'TextAlign': ng_diString('left')
                  }
                })),
                'HexLabel': ng_diControl('weLabel', ng_diProperties({
                  'R': ng_diTypeVal('bounds',10),
                  'W': ng_diTypeVal('bounds',140),
                  'Data': {
                    'TextAlign': ng_diString('right')
                  }
                })),
                'AHexLabel': ng_diControl('weLabel', ng_diProperties({
                  'L': ng_diTypeVal('bounds',10),
                  'W': ng_diTypeVal('bounds',140),
                  'T': ng_diTypeVal('bounds',0),
                  'Data': {
                    'TextAlign': ng_diString('left')
                  }
                }))
              }
            })),
            'Preview_Panel': ng_diControl(undefined, ng_diProperties({
              'H': ng_diTypeVal('bounds',64),
              'ModifyControls': {
                'From': ng_diControl('weColorButton', {
                  'L': ng_diTypeVal('bounds',10),
                  'T': ng_diTypeVal('bounds',32),
                  'W': ng_diTypeVal('bounds',120)
                }),
                'FromLabel': ng_diControl('weLabel', ng_diProperties({
                  'L': ng_diTypeVal('bounds',10),
                  'W': ng_diTypeVal('bounds',140),
                  'Data': {
                    'TextAlign': ng_diString('left')
                  }
                })),
                'To': ng_diControl('weColorButton', {
                  'R': ng_diTypeVal('bounds',10),
                  'T': ng_diTypeVal('bounds',32),
                  'W': ng_diTypeVal('bounds',120)
                }),
                'ToLabel': ng_diControl('weLabel', ng_diProperties({
                  'R': ng_diTypeVal('bounds',10),
                  'W': ng_diTypeVal('bounds',140),
                  'Data': {
                    'TextAlign': ng_diString('right')
                  }
                })),
                'PreviewIcon': ng_diControl('ngButton', ng_diProperties({
                  'L': ng_diTypeVal('bounds_string','50%'),
                  'T': ng_diTypeVal('bounds',32),
                  'style': {
                    'marginLeft': ng_diTypeVal('css_dim_px', '-16px', { Level: 'advanced' })
                  },
                  'Data': {
                    'Img': ng_diTypeVal('image', 'WinEightControls.Images.ColorPicker'+defthemetxt()+'.PreviewIcon')
                  }
                }))
              }
            }))
          }
        })
      });
    });

    ngRegisterControlDesignInfo('weColorButton',function(d,c,ref) {
      return themeDI({
        ControlCategory: 'Button',
        NewControl: {
          Default: {
            Properties: {
              'W': { Value: 80 }
            }
          }
        },
        Properties: ng_diProperties({
          "Data": {
            "BackgroundImg": ng_diTypeVal('image', 'WinEightControls.Images.ColorButton'+defthemetxt()+'.Background'),
            "LeftImg": ng_diTypeVal('image', 'WinEightControls.Images.ColorButton'+defthemetxt()+'.LeftImg'),
            "MiddleImg": ng_diTypeVal('image', 'WinEightControls.Images.ColorButton'+defthemetxt()+'.MiddleImg'),
            "RightImg":ng_diTypeVal('image', 'WinEightControls.Images.ColorButton'+defthemetxt()+'.RightImg')
          }
        })
      });
    });

    ngRegisterControlDesignInfo('weColorPickerDropDown',function(d,c,ref) {
      return themeDI({
        ControlCategory: 'Dropdown',
        NewControl: {
          Default: {
            Properties: {
              'W': { Value: 200 }
            }
          }
        },
        Properties: ng_diProperties({
          'CreateFrom': ng_diString('weDropDown'),
          'Data': {
            'TextAlign': ng_diString('center'),
            'DropDownAlign': ng_diString('right')
          },
          'DropDown': ng_diControl('weColorPickerBox', ng_diProperties({
            "Theme": ng_diIntegerIdentifiers('WE_LIGHT'),
            'W': ng_diTypeVal('bounds',296),
            'H': ng_diTypeVal('bounds',418),
            'Data': {
              'MaxHeight': ng_diInteger(600,{ Level: 'basic' })
            },
            'ModifyControls': {
              'Buttons': ng_diControl(undefined, ng_diProperties({
                'H': ng_diTypeVal('bounds',42),
                'ModifyControls': {
                  'Submit': ng_diControl('weButton', {
                    'L': ng_diTypeVal('bounds',10),
                    'T': ng_diTypeVal('bounds',10),
                    'W': ng_diTypeVal('bounds',133),
                    'Theme': ng_diIntegerIdentifiers('WE_LIGHT')
                  }),
                  'Cancel': ng_diControl('weButton', {
                    'R': ng_diTypeVal('bounds',10),
                    'T': ng_diTypeVal('bounds',10),
                    'W': ng_diTypeVal('bounds',133),
                    'Theme': ng_diIntegerIdentifiers('WE_LIGHT')
                  })
                }
              }))
            }
          }))
        })
      });
    });

    ngRegisterControlDesignInfo('weColorPickerHint',function(d,c,ref) {
      return themeDI({
        ControlCategory: 'Hint',
        NewControl: {
          Default: {
          }
        },
        Properties: ng_diProperties({
          'CreateFrom': ng_diString('weHint'),
          'ModifyControls': {
            'Picker': ng_diControl('weColorPickerBox', ng_diProperties({
              'Theme': ng_diIntegerIdentifiers('WE_LIGHT'),
              'W': ng_diTypeVal('bounds',296),
              'ModifyControls': {
                'Buttons': ng_diControl(undefined, ng_diProperties({
                  'H': ng_diTypeVal('bounds',42),
                  'ModifyControls': {
                    'Submit': ng_diControl('weButton', {
                      'L': ng_diTypeVal('bounds',10),
                      'T': ng_diTypeVal('bounds',10),
                      'W': ng_diTypeVal('bounds',133)
                    }),
                    'Cancel': ng_diControl('weButton', {
                      'R': ng_diTypeVal('bounds',10),
                      'T': ng_diTypeVal('bounds',10),
                      'W': ng_diTypeVal('bounds',133)
                    })
                  }
                }))
              }
            }))
          }
        })
      });
    });
    
    ngRegisterControlDesignInfo('weColorPickerButton',function(d,c,ref) {
      return themeDI({
        ControlCategory: 'Button',
        NewControl: {
          Default: {
            Properties: {
              'W': { Value: 80 }
            }
          }
        },
        Properties: ng_diProperties({
          "CreateFrom": ng_diString('weColorButton'),
          "Data": {
            "HintDef": ng_diControl('weColorPickerHint')
          }
        })
      });
    });
    /********************************/
    
    ngRegisterControlDesignInfo('weMenu',function(d,c,ref) {
      return themeSchemeDI({
        ControlCategory: 'Menu',
        Properties: ng_diProperties({
          "className": deftheme() ? defThemeSchemeClassName('Menu', 'Menu') : ng_diString('weMenuDark'),
          "Theme": ng_diIntegerIdentifiers('WE_LIGHT'),
          "Data": {
            "Items": ng_diReplaceType('ngMenuItems','weMenuItems'),
            "SubMenuImg": ng_diTypeVal('image', 'WinEightControls.Images.SubMenu'+defthemetxt()),
            "SubMenuDef": ng_diControl('weMenu')
          }
        })
      });
    });
    
    ngRegisterControlDesignInfo('weMenuBar',function(d,c,ref) {
      return themeSchemeDI({
        ControlCategory: 'Menu',
        Properties: ng_diProperties({
          "className": deftheme() ? defThemeSchemeClassName('MenuBar','MenuBar') : ng_diString('weMenuBarDark'),
          "Data": {
            "SubMenuDef": ng_diControl('weMenu')
          }
        })
      });
    });
    
    ngRegisterControlDesignInfo('weMenuBarButton','ngMenuBarButton');
    
    ngRegisterControlDesignInfo('weSplitButton',function(d,c,ref) {
      return themeDI({
        ControlCategory: 'Button',
        Properties: ng_diProperties({
          "className": defThemeClassName('SplitButton'),
          "Data": {
            "LeftImg": ng_diTypeVal('image', 'WinEightControls.Images.Button'+defthemetxt()+'.LeftImg'),
            "MiddleImg": ng_diTypeVal('image', 'WinEightControls.Images.Button'+defthemetxt()+'.MiddleImg'),
            "RightImg": ng_diTypeVal('image', 'WinEightControls.Images.Button'+defthemetxt()+'.MenuRightBtnImg')
          }
        })
      });
    });
    
    ngRegisterControlDesignInfo('weFileUploader',function(d,c,ref) {
      return themeDI({
        ControlCategory: 'Misc',
        Properties: ng_diProperties({
          "className": defThemeClassName('FileUploader'),
          "ModifyControls": {
            "ListFiles": ng_diControl('weList', ng_diProperties({
              "Theme": ng_diIntegerIdentifiers('WE_LIGHT'),
              "Data": {
                "Frame": ng_diType('img_frame', {}, {
                  ObjectProperties: {
                    "Top": ng_diTypeVal('image', 'WinEightControls.Images.FileUploaderFilesLight.Top'),
                    "Left": ng_diTypeVal('image', 'WinEightControls.Images.FileUploaderFilesLight.Left'),
                    "Right": ng_diTypeVal('image', 'WinEightControls.Images.FileUploaderFilesLight.Right'),
                    "Bottom": ng_diTypeVal('image', 'WinEightControls.Images.FileUploaderFilesLight.Bottom')
                  }
                })
              }
            })),
            "DragAndDropInfo": ng_diControl('weSmallText', ng_diProperties({
              "Theme": ng_diIntegerIdentifiers('WE_LIGHT'),
              "style": {
                "marginTop": ng_diTypeVal('css_dim_px', '-6px', { Level: 'advanced' })
              }
            })),
            "Buttons": ng_diControl(undefined, ng_diProperties({
              "Data": {
                "HPadding": ng_diInteger(20),
                "VPadding": ng_diInteger(20)
              }
            })),
            "BtnAddFile": ng_diControl('weButton'),
            "BtnRemoveFiles": ng_diControl('weButton')
          }
        })
      });
    });
    

    ngRegisterControlDesignInfo('weLoginForm',function(d,c,ref) {
      return themeDI({
        ControlCategory: 'Form',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 260 }
            }
          }
        },
        Properties: ng_diProperties({
          "W": ng_diTypeVal('bounds',260),
          "ModifyControls": {
            "OrganizationLabel": ng_diControl('weLabel'),
            "Organization": ng_diControl('weEdit'),
            "LoginLabel": ng_diControl('weLabel'),
            "Login": ng_diControl('weEdit'),
            "PasswordLabel": ng_diControl('weLabel'),
            "Password": ng_diControl('weEdit'),
            "CapsLockWarn": ng_diControl('weText', ng_diProperties({
              "style": {
                "marginTop": ng_diTypeVal('css_dim_px', '5px', { Level: 'advanced' }),
                "marginBottom": ng_diTypeVal('css_dim_px', '5px', { Level: 'advanced' })
              }
            })),
            "RememberMe": ng_diControl('weCheckBox', ng_diProperties({
              "style": {
                "marginTop": ng_diTypeVal('css_dim_px', '5px', { Level: 'advanced' })
              }
            })),
            "LoginBtn": ng_diControl('weButton', ng_diProperties({
             'W': ng_diTypeVal('bounds',100),
              "style": {
                "marginTop": ng_diTypeVal('css_dim_px', '8px', { Level: 'advanced' })
              }
            })),
            "Progress": ng_diControl('weProgressDot', ng_diProperties({
              "style": {
                "marginLeft": ng_diTypeVal('css_dim_px', '10px', { Level: 'advanced' }),
                "marginTop": ng_diTypeVal('css_dim_px', '12px', { Level: 'advanced' })
              },
              "Data": {
                "Visible": ng_diBoolean(false)
              }
            }), { Level: 'basic' }),
            "Error": ng_diControl('weText', ng_diProperties({
              "className": ng_diString('weLoginFormErrorMessage'),
              "style": {
                "marginTop": ng_diTypeVal('css_dim_px', '8px', { Level: 'advanced' })
              }
            }))
          }
        })
      });
    });

    ngRegisterControlDesignInfo('wePasswordForm',function(d,c,ref) {
      return themeDI({
        ControlCategory: 'Form',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 260 }
            }
          }
        },
        Properties: ng_diProperties({
          "W": ng_diTypeVal('bounds',260),
          "ModifyControls": {
            "OldPasswordLabel": ng_diControl('weLabel'),
            "OldPassword": ng_diControl('weEdit'),
            "NewPasswordLabel": ng_diControl('weLabel'),
            "NewPassword": ng_diControl('weEdit'),
            "ConfirmNewPasswordLabel":  ng_diControl('weLabel'),
            "ConfirmNewPassword": ng_diControl('weEdit'),
            "CapsLockWarn": ng_diControl('weText', ng_diProperties({
              "style": {
                "marginTop": ng_diTypeVal('css_dim_px', '5px', { Level: 'advanced' }),
                "marginBottom": ng_diTypeVal('css_dim_px', '5px', { Level: 'advanced' })
              }
            })),
            "Error": ng_diControl('weText', ng_diProperties({
              "className": ng_diString('weLoginFormErrorMessage'),
              "style": {
                "marginTop": ng_diTypeVal('css_dim_px', '8px', { Level: 'advanced' })
              }
            }))
          }
        })
      });
    });

    ngRegisterControlDesignInfo('weLoginButton',function(d,c,ref) {
      return themeSchemeDI({
        ControlCategory: 'Button',
        Properties: ng_diProperties({
          "className": defThemeSchemeClassName('Link','Text'),
          "Menu": ng_diControl('weMenu')
        })
      });
    });

    function weViewModelFormDI(d,c,ref) {
      return schemeDI({
        ControlCategory: 'Container',
        IsContainer: true,
        Properties: {
          "className": ng_diString('wePanel'),
          "ErrorHint": ng_diControl('weTextHint')
        }
      });
    }

    ngRegisterControlDesignInfo('weViewModelForm',weViewModelFormDI);
    
    function weEditFieldDI (d,c,ref) {
      var di = {
        ControlCategory: 'Edit Field',
        Properties: ng_diProperties({
          "Data": {
            "HintX": ng_diInteger(19),
            "HintY": ng_diInteger(27)
          },
          "ErrorHint": ng_diControl('weTextHint')
        })
      };
      ng_MergeVar(di,weEditDI(d,c,ref));
      return di;
    };
    ngRegisterControlDesignInfo('weEditField',weEditFieldDI);
    ngRegisterControlDesignInfo('weSearchBoxField',function(d,c,ref) {
      var di=weSearchBoxDI(d,c,ref);
      ng_MergeVar(di,weEditFieldDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('weEditBoxBtnField',function(d,c,ref) {
      var di=weEditBoxBtnDI(d,c,ref);
      ng_MergeVar(di,weEditFieldDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('weEditNumField',function(d,c,ref) {
      var di=weEditDI(d,c,ref);
      ng_MergeVar(di,weEditFieldDI(d,c,ref));
      di.ControlCategory='Edit Field';
      return di;
    });
    ngRegisterControlDesignInfo('weColorEditField',function(d,c,ref) {
      var di=weColorEditDI(d,c,ref);
      ng_MergeVar(di,weEditFieldDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('weDropDownField',function(d,c,ref) {
      var di=weEditDI(d,c,ref);
      ng_MergeVar(di,weEditFieldDI(d,c,ref));
      di.ControlCategory='Dropdown Field';
      return di;
    });
    ngRegisterControlDesignInfo('weDropDownListField',function(d,c,ref) {
      var di=weEditDI(d,c,ref);
      ng_MergeVar(di,weEditFieldDI(d,c,ref));
      di.ControlCategory='Dropdown Field';
      return di;
    });
    ngRegisterControlDesignInfo('weEditDateField',function(d,c,ref) {
      var di=weEditDateDI(d,c,ref);
      ng_MergeVar(di,weEditFieldDI(d,c,ref));
      di.ControlCategory='Edit Field';
      return di;
    });
    ngRegisterControlDesignInfo('weEditTimeField',function(d,c,ref) {
      var di=weEditTimeDI(d,c,ref);
      ng_MergeVar(di,weEditFieldDI(d,c,ref));
      di.ControlCategory='Edit Field';
      return di;
    });
    ngRegisterControlDesignInfo('weMemoField',function(d,c,ref) {
      var di=weMemoDI(d,c,ref);
      ng_MergeVar(di,weEditFieldDI(d,c,ref));
      di.ControlCategory='Edit Field';
      return di;
    });
    
    ngRegisterControlDesignInfo('weDBViewModelForm',weViewModelFormDI);

    ngRegisterControlDesignInfo('weDBToolBar',function(d,c,ref) {
      return themeSchemeDI({
        ControlCategory: 'Container',
        //IsContainer: true, // TODO: Check why ModifyControls not work with this
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 420 }, // 407
              "H": { Value: 32 }
            }
          }
        },
        Properties: ng_diProperties({
          "className": ng_diString('weToolBar'),
          "W": ng_diTypeVal('bounds', 260),
          "Data": {
            "HPadding": ng_diInteger(10)
          },
          "ModifyControls": {
            "New": ng_diControl('weButton'),
            "Delete": ng_diControl('weButton', ng_diProperties({
              "Data": {
                "ToolBarHPadding": ng_diInteger(20)
              }
            })),
            "Insert": ng_diControl('weButton'),
            "Update": ng_diControl('weButton'),
            "Cancel": ng_diControl('weButton')
          }
        })
      });
    });
    
    ngRegisterControlDesignInfo('weDataSet', function(d,c,ref) {
      var di = {
        ControlCategory: 'Dataset'
      };
      ng_MergeVar(di,wePageListDI(d,c,ref));
      return di;
    });

    ngRegisterControlDesignInfo('weDBDataSet',function(d,c,ref) {
      var di = {
        ControlCategory: 'Dataset',
        Properties: ng_diProperties({
          "ModifyControls": {
            "NewRecord": ng_diControl('weButton', ng_diProperties({
              "Data": {
                "ToolBarHPadding": ng_diInteger(10)
              }
            })),
            "LoadRecord": ng_diControl('weButton', ng_diProperties({
              "Data": {
                "ToolBarHPadding": ng_diInteger(10)
              }
            })),
            "DeleteRecord": ng_diControl('weButton', ng_diProperties({
              "Data": {
                "ToolBarHPadding": ng_diInteger(20)
              }
            })),
            "Refresh": ng_diControl('weButton', ng_diProperties({
              "Data": {
                "ToolBarHPadding": ng_diInteger(20)
              }
            }))
          }
        })
      };
      ng_MergeVar(di,wePageListDI(d,c,ref));
      return di;
    });
    
  }
};
})();
ngUserControls['wineight_designinfo'] = WinEight_DesignInfo;