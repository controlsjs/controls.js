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

(function()
{
  function getBaseProperties()
  {
    var BaseDI = {
      NewControl: {
        Default: {
          Properties: {
            "L": {},
            "T": {}
          }
        }
      },
      Properties: {
        "Type": { DefaultType: 'string', Level: 'basic', Order: 0.01,
          Types: {
            'string': {
              Editor: 'ngfeEditor_ControlType'
            }
          }
        },
        "L": { DefaultType: 'bounds', Level: 'basic', Order: 0.11 },
        "T": { DefaultType: 'bounds', Level: 'basic', Order: 0.12 },
        "R": { DefaultType: 'bounds', Level: 'basic', Order: 0.15 },
        "B": { DefaultType: 'bounds', Level: 'basic', Order: 0.16 },
        "ParentReferences": { DefaultType: 'boolean', Level: 'optional', Order: 0.302,
          Types: {
            'boolean': {
              DefaultValue: true
            }
          }
        },
        "OnCreating": { DefaultType: 'events', Order: 0.306,
          Types: {
            'function': {
              DefaultValue: 'function(def, ref, parent, options) { return true; }'
            }
          }
        },
        "OnCreated": { DefaultType: 'events', Order: 0.307,
          Types: {
            'function': {
              DefaultValue: 'function(c, refs, options) {}'
            }
          }
        },

        "Data": { DefaultType: 'object', Level: 'basic', Order: 0.4,
          Types: {
            'object': {
              DestroyIfEmpty: true,
              ObjectProperties:
              {
                "Enabled": { DefaultType: 'boolean', Level: 'basic',
                  Types: {
                    'boolean': {
                      DefaultValue: true
                    }
                  }
                }
              }
            }
          }
        },

        "ModifyControls": { DefaultType: 'controls', Level: 'optional', Order: 0.7,
          ContainerProperty: true,
          Types: {
            'controls': {
              DestroyIfEmpty: true,
              ChildDesignInfo: {
                DisplayInControls: true
              }
            }
          }
        },

        "Events": { DefaultType: 'object', Order: 0.92,
          Types: {
            'object': {
              DestroyIfEmpty: true,
              ObjectProperties:
              {
                "OnSetEnabled": { DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c, v, p) { return true; }'
                    }
                  }
                },
                "OnEnabledChanged": { DefaultType: 'events', Level: 'basic',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c, p) {}'
                    }
                  }
                }
              }
            }
          }
        },

        "Methods": { DefaultType: 'object', Order: 0.8,
          Types: {
            'object': {
              DestroyIfEmpty: true,
              ObjectProperties:
              {
                "SetChildControlsEnabled": { DefaultType: 'function', Level: 'experimental',
                  Types: {
                    'function': {
                      DefaultValue: 'function(v, p) { ng_CallParent(this, "SetChildControlsEnabled", arguments); }'
                    }
                  }
                },
                "DoDispose": { DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function() { return ng_CallParent(this, "DoDispose", arguments, true); }' // TODO: return value??
                    }
                  }
                },
                "DoCreate": { DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(props, ref, nd, parent) { ng_CallParent(this, "DoCreate", arguments); }'
                    }
                  }
                },
                "DoSetEnabled": { DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(v) { ng_CallParent(this, "DoSetEnabled", arguments); }'
                    }
                  }
                },
                "Enable": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function() { ng_CallParent(this, "Enable", arguments); }'
                    }
                  }
                },
                "Disable": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function() { ng_CallParent(this, "Disable, arguments); }'
                    }
                  }
                },
                "SetEnabled": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(v, p) { ng_CallParent(this, "SetEnabled", arguments); }'
                    }
                  }
                },
                "Elm": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function() { return ng_CallParent(this, "Elm", arguments, null); }' // TODO: return value??
                    }
                  }
                },
                "CtrlInheritsFrom": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(type) { ng_CallParent(this, "CtrlInheritsFrom", arguments); }'
                    }
                  }
                },
                "Create": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(props, ref) { ng_CallParent(this, "Create", arguments); }'
                    }
                  }
                },
                "Dispose": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function() { ng_CallParent(this, "Dispose", arguments); }'
                    }
                  }
                },
                "AddEvent": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(ev, fce, once) { ng_CallParent(this, "AddEvent", arguments); }'
                    }
                  }
                },
                "RemoveEvent": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(ev, fce) { ng_CallParent(this, "RemoveEvent", arguments); }'
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    return BaseDI;
  }

  window.ngControlDesignInfo = function(obj)
  {
    if ((!ngHASDESIGNINFO()) || (!obj) || (typeof obj.DesignInfo !== 'undefined')) return;

    obj.DesignInfo = {
      Properties: {
        "W": { DefaultType: 'bounds', Level: 'basic', Order: 0.13 },
        "H": { DefaultType: 'bounds', Level: 'basic', Order: 0.14 },
        "ScrollBars": { DefaultType: 'identifier', Level: 'optional', Order: 0.301,
          Types: {
            'identifier': {
              DefaultValue: 'ssNone',
              Editor: 'ngfeEditor_DropDownList',
              EditorOptions: {
                Items: ['ssNone','ssDefault','ssAuto','ssBoth','ssHorizontal','ssVertical']
              }
            }
          }
        },
        "style": { DefaultType: 'object', Order: 0.252,
          Types: {
            'object': {
              DestroyIfEmpty: true,
              ObjectProperties:
              {
                "background": { DefaultType: 'string', Level: 'optional' },
                "backgroundColor": { DefaultType: 'css_colors', Level: 'optional' },
                "backgroundImage": { DefaultType: 'string', Level: 'optional' },
                "border": { DefaultType: 'string', Level: 'optional' },
                "borderColor": { DefaultType: 'css_colors', Level: 'optional',
                  Types: {
                    'css_colors': {
                      DefaultValue: '#000000ff'
                    }
                  }
                },
                "borderBottom": { DefaultType: 'string', Level: 'optional' },
                "borderLeft": { DefaultType: 'string', Level: 'optional' },
                "borderRight": { DefaultType: 'string', Level: 'optional' },
                "borderTop": { DefaultType: 'string', Level: 'optional' },
                "borderStyle": { DefaultType: 'string', Level: 'optional',
                  Types: {
                    'string': {
                      DefaultValue: 'none',
                      DefaultCode: "'none'",
                      Editor: 'ngfeEditor_DropDownList',
                      EditorOptions: {
                        Items: ['none','solid','dotted','dashed','double','groove','ridge','inset','outset']
                      }
                    }
                  }
                },
                "borderWidth": { DefaultType: 'css_dim_px', Level: 'optional',
                  Types: {
                    'string': {}
                  }
                },
                "color": { DefaultType: 'css_colors', Level: 'optional',
                  Types: {
                    'css_colors': {
                      DefaultValue: '#000000'
                    }
                  }
                },
                "cursor": { DefaultType: 'css_cursor', Level: 'optional' },
                "fontFamily": { DefaultType: 'string', Level: 'optional',
                  Types: {
                    'string': {
                      DefaultValue: '',
                      InitValue: 'Arial, Helvetica, sans-serif',
                      Editor: 'ngfeEditor_DropDownList',
                      EditorOptions: {
                        Items: ['"Times New Roman", Times, serif',
                                'Georgia, serif',
                                'Arial, Helvetica, sans-serif',
                                '"Arial Black", Gadget, sans-serif',
                                '"Comic Sans MS", cursive, sans-serif',
                                'Impact, Charcoal, sans-serif',
                                'Tahoma, Geneva, sans-serif',
                                'Verdana, Geneva, sans-serif',
                                '"Courier New", Courier, monospace',
                                '"Lucida Console", Monaco, monospace'
                               ]
                      }
                    }
                  }
                },
                "fontSize": { DefaultType: 'css_dim_px', Level: 'optional',
                  Types: {
                    'css_dim_px': {
                      InitValue: '12px'
                    }
                  }
                },
                "fontStyle": { DefaultType: 'string', Level: 'optional',
                  Types: {
                    'string': {
                      DefaultValue: 'normal',
                      Editor: 'ngfeEditor_DropDownList',
                      EditorOptions: {
                        Items: ['normal','italic','oblique','initial','inherit']
                      }
                    }
                  }
                },
                "fontWeight": { DefaultType: 'string', Level: 'optional',
                  Types: {
                    'string': {
                      DefaultValue: 'normal',
                      Editor: 'ngfeEditor_DropDownList',
                      EditorOptions: {
                        Items: ['normal','bold','bolder','lighter','100','200','300','400','500','600','700','800','900']
                      }
                    }
                  }
                },
                "lineHeight": { DefaultType: 'css_dim_px', Level: 'optional',
                  Types: {
                    'css_dim_px': {
                      InitValue: '12px'
                    }
                  }
                },
                "margin": { DefaultType: 'string', Level: 'optional' },
                "marginBottom": { DefaultType: 'css_dim_px', Level: 'optional' },
                "marginLeft": { DefaultType: 'css_dim_px', Level: 'optional' },
                "marginRight": { DefaultType: 'css_dim_px', Level: 'optional' },
                "marginTop": { DefaultType: 'css_dim_px', Level: 'optional' },
                "padding": { DefaultType: 'string', Level: 'optional' },
                "paddingBottom": { DefaultType: 'css_dim_px', Level: 'optional' },
                "paddingLeft": { DefaultType: 'css_dim_px', Level: 'optional' },
                "paddingRight": { DefaultType: 'css_dim_px', Level: 'optional' },
                "paddingTop": { DefaultType: 'css_dim_px', Level: 'optional' },
                "textAlign": { DefaultType: 'string', Level: 'optional',
                  Types: {
                    'string': {
                      DefaultValue: 'left',
                      Editor: 'ngfeEditor_DropDownList',
                      EditorOptions: {
                        Items: ['left','center','right','justify','initial','inherit']
                      }
                    }
                  }
                },
                "verticalAlign": { DefaultType: 'string', Level: 'optional',
                  Types: {
                    'string': {
                      DefaultValue: 'baseline',
                      Editor: 'ngfeEditor_DropDown',
                      EditorOptions: {
                        Items: ['baseline','sub','super','top','text-top','middle','bottom','text-bottom','initial','inherit']
                      }
                    }
                  }
                },
                "textDecoration": { DefaultType: 'string', Level: 'optional',
                  Types: {
                    'string': {
                      DefaultValue: 'none',
                      Editor: 'ngfeEditor_DropDownList',
                      EditorOptions: {
                        Items: ['none','underline','overline','line-through','initial','inherit']
                      }
                    }
                  }
                },
                "textTransform": { DefaultType: 'string', Level: 'optional',
                  Types: {
                    'string': {
                      DefaultValue: 'none',
                      Editor: 'ngfeEditor_DropDownList',
                      EditorOptions: {
                        Items: ['none','uppercase','lowercase','capitalize','initial','inherit']
                      }
                    }
                  }
                },
                "whiteSpace": { DefaultType: 'string', Level: 'optional',
                  Types: {
                    'string': {
                      DefaultValue: 'normal',
                      Editor: 'ngfeEditor_DropDownList',
                      EditorOptions: {
                        Items: ['normal','nowrap','pre','pre-line','pre-wrap','initial','inherit']
                      }
                    }
                  }
                },
                "zIndex": { DefaultType: 'integer' }
              }
            }
          }
        },
        "Opacity": { DefaultType: 'float', Level: 'basic', Order: 0.253,
          Types: {
            'float': {
              DefaultValue: 1.0
            }
          }
        },
        "className": { DefaultType: 'string', Order: 0.251 },
        "innerHTML": { DefaultType: 'string', Level: 'hidden', Order: 0.303 },
        "id": { DefaultType: 'string', Level: 'optional', Order: 0.05 },
        "parent": { DefaultType: 'string', Level: 'optional', Order: 0.07,
          Types: {
            'object': {}
          }
        },
        "IE6AlignFix": { DefaultType: 'boolean', Level: 'optional', Order: 0.304,
          Types: {
            'boolean': {
              DefaultValue: ngIE6AlignFix
            }
          }
        },
        "OnCreateHTMLElement": { DefaultType: 'events', Level: 'optional', Order: 0.305,
          Types: {
            'function': {
              DefaultValue: 'function(props, ref, c) {}'
            }
          }
        },

        "Data": {
          Types: {
            'object': {
              ObjectProperties:
              {
                "Visible": { DefaultType: 'boolean', Level: 'basic',
                  Types: {
                    'boolean': {
                      DefaultValue: true
                    }
                  }
                },
                "IsPopup": { DefaultType: 'boolean',
                  Types: {
                    'boolean': {
                      InitValue: true
                    }
                  }
                },
                "Gestures": { DefaultType: 'object', Level: 'advanced',
                  Types: {
                    'object': {
                      DestroyIfEmpty: true,
                      ObjectProperties:
                      {
                        "drag": { DefaultType: 'boolean',
                          Types: {
                            'boolean': {
                              InitValue: true
                            }
                          }
                        },
                        "dragleft": { DefaultType: 'boolean', Level: 'optional',
                          Types: {
                            'boolean': {
                              InitValue: true
                            }
                          }
                        },
                        "dragright": { DefaultType: 'boolean', Level: 'optional',
                          Types: {
                            'boolean': {
                              InitValue: true
                            }
                          }
                        },
                        "dragup": { DefaultType: 'boolean', Level: 'optional',
                          Types: {
                            'boolean': {
                              InitValue: true
                            }
                          }
                        },
                        "dragdown": { DefaultType: 'boolean', Level: 'optional',
                          Types: {
                            'boolean': {
                              InitValue: true
                            }
                          }
                        },
                        "hold": { DefaultType: 'boolean',
                          Types: {
                            'boolean': {
                              InitValue: true
                            }
                          }
                        },
                        "release": { DefaultType: 'boolean',
                          Types: {
                            'boolean': {
                              InitValue: true
                            }
                          }
                        },
                        "swipe": { DefaultType: 'boolean',
                          Types: {
                            'boolean': {
                              InitValue: true
                            }
                          }
                        },
                        "swipeleft": { DefaultType: 'boolean', Level: 'optional',
                          Types: {
                            'boolean': {
                              InitValue: true
                            }
                          }
                        },
                        "swiperight": { DefaultType: 'boolean', Level: 'optional',
                          Types: {
                            'boolean': {
                              InitValue: true
                            }
                          }
                        },
                        "swipeup": { DefaultType: 'boolean', Level: 'optional',
                          Types: {
                            'boolean': {
                              InitValue: true
                            }
                          }
                        },
                        "swipedown": { DefaultType: 'boolean', Level: 'optional',
                          Types: {
                            'boolean': {
                              InitValue: true
                            }
                          }
                        },
                        "tap": { DefaultType: 'boolean',
                          Types: {
                            'boolean': {
                              InitValue: true
                            }
                          }
                        },
                        "doubletap": { DefaultType: 'boolean',
                          Types: {
                            'boolean': {
                              InitValue: true
                            }
                          }
                        },
                        "touch": { DefaultType: 'boolean',
                          Types: {
                            'boolean': {
                              InitValue: true
                            }
                          }
                        },
                        "transform": { DefaultType: 'boolean', Level: 'optional',
                          Types: {
                            'boolean': {
                              InitValue: true
                            }
                          }
                        },
                        "pinch": { DefaultType: 'boolean', Level: 'optional',
                          Types: {
                            'boolean': {
                              InitValue: true
                            }
                          }
                        },
                        "pinchin": { DefaultType: 'boolean', Level: 'optional',
                          Types: {
                            'boolean': {
                              InitValue: true
                            }
                          }
                        },
                        "pinchout": { DefaultType: 'boolean', Level: 'optional',
                          Types: {
                            'boolean': {
                              InitValue: true
                            }
                          }
                        },
                        "rotate": { DefaultType: 'boolean', Level: 'optional',
                          Types: {
                            'boolean': {
                              InitValue: true
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "ngText": { DefaultType: 'string', Level: 'optional',
                  Types: {
                    'string': {
                      DefaultValue: '',
                      Editor: 'ngfeEditor_Lang'
                    }
                  }
                },
                "ngTextD": { DefaultType: 'string', Level: 'optional',
                  Types: {
                    'string': {
                      DefaultValue: '',
                      Editor: 'ngfeEditor_Lang'
                    }
                  }
                },
                "ngAlt": { DefaultType: 'string', Level: 'optional',
                  Types: {
                    'string': {
                      DefaultValue: '',
                      Editor: 'ngfeEditor_Lang'
                    }
                  }
                },
                "ngAltD": { DefaultType: 'string', Level: 'optional',
                  Types: {
                    'string': {
                      DefaultValue: '',
                      Editor: 'ngfeEditor_Lang'
                    }
                  }
                },
                "ngHint": { DefaultType: 'string', Level: 'optional',
                  Types: {
                    'string': {
                      DefaultValue: '',
                      Editor: 'ngfeEditor_Lang'
                    }
                  }
                },
                "ngHintD": { DefaultType: 'string', Level: 'optional',
                  Types: {
                    'string': {
                      DefaultValue: '',
                      Editor: 'ngfeEditor_Lang'
                    }
                  }
                }
              }
            }
          }
        },

        "Controls": { DefaultType: 'controls', Level: 'optional', Order: 0.65,
          ContainerProperty: true,
          Types: {
            'controls': {
              ChildDesignInfo: {
                DisplayInControls: true
              }
            }
          }
        },

        "Events": {
          Types: {
            'object': {
              DestroyIfEmpty: true,
              ObjectProperties:
              {
                "OnSetVisible": { DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c, v) { return true; }'
                    }
                  }
                },
                "OnVisibleChanged": { DefaultType: 'events', Level: 'basic',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c) {}'
                    }
                  }
                },
                "OnUpdate": { DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c) { return true; }'
                    }
                  }
                },
                "OnUpdated": { DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c, elm) {}'
                    }
                  }
                },
                "OnUpdateLater": { DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c, s) {}'
                    }
                  }
                },
                "OnMouseEnter": { DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c) {}'
                    }
                  }
                },
                "OnMouseLeave": { DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c) {}'
                    }
                  }
                },

                "OnIsInsidePopup": { DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c, target, intype, e) { return true; }'
                    }
                  }
                },
                "OnClickOutside": { DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c, pi) { return true; }'
                    }
                  }
                },
                "OnPointerDown": { DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c, pi) { return true; }'
                    }
                  }
                },
                "OnPointerUp": { DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c, pi) { return true; }'
                    }
                  }
                },
                "OnPtrStart": { DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c, pi) {}'
                    }
                  }
                },
                "OnPtrEnd": { DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c, pi) {}'
                    }
                  }
                },
                "OnGesture": { DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c, pi) { return true; }'
                    }
                  }
                },
                "OnPtrDrag": { DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c, pi) { return true; }'
                    }
                  }
                }
              }
            }
          }
        },

        "Methods": {
          Types: {
            'object': {
              ObjectProperties:
              {
                "DoMouseEnter": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(e, mi, elm) { ng_CallParent(this, "DoMouseEnter", arguments); }'
                    }
                  }
                },
                "DoMouseLeave": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(e, mi, elm) { ng_CallParent(this, "DoMouseLeave", arguments); }'
                    }
                  }
                },
                "DoClickOutside": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(pi) { ng_CallParent(this, "DoClickOutside", arguments); }'
                    }
                  }
                },
                "IsInsidePopup": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(target, intype, e) { ng_CallParent(this, "IsInsidePopup", arguments); }'
                    }
                  }
                },
                "DoAcceptGestures": { DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(elm, gestures) { ng_CallParent(this, "DoAcceptGestures", arguments); }'
                    }
                  }
                },
                "DoAcceptPtrGestures": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(elm, eid, gestures, ev) { ng_CallParent(this, "DoAcceptPtrGestures", arguments); }'
                    }
                  }
                },
                "DoGetPtrOptions": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(eid, opts) { ng_CallParent(this, "DoGetPtrOptions", arguments); }'
                    }
                  }
                },

                "DoUpdate": { DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(elm) { ng_CallParent(this, "DoUpdate", arguments); }'
                    }
                  }
                },
                "DoAttach": { DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(elm, elmid) { ng_CallParent(this, "DoAttach", arguments); }'
                    }
                  }
                },
                "DoRelease": { DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(elm) { ng_CallParent(this, "DoRelease", arguments); }'
                    }
                  }
                },
                "DoSetVisible": { DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(elm, v) { ng_CallParent(this, "DoSetVisible", arguments); }'
                    }
                  }
                },
                "DoResize": { DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(elm) { ng_CallParent(this, "DoResize", arguments); }'
                    }
                  }
                },
                "SetVisible": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(v) { ng_CallParent(this, "SetVisible", arguments); }'
                    }
                  }
                },
                "SetFocus": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(state) { ng_CallParent(this, "SetFocus", arguments); }'
                    }
                  }
                },
                "SetBounds": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(props) { ng_CallParent(this, "SetBounds", arguments); }'
                    }
                  }
                },
                "SetScrollBars": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(v) { ng_CallParent(this, "SetScrollBars", arguments); }'
                    }
                  }
                },
                "SetPopup": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(p) { ng_CallParent(this, "SetPopup", arguments); }'
                    }
                  }
                },
                "SetOpacity": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(v) { ng_CallParent(this, "SetOpacity", arguments); }'
                    }
                  }
                },
                "Align": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(o) { ng_CallParent(this, "Align", arguments); }'
                    }
                  }
                },
                "Attach": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(o) { ng_CallParent(this, "Attach", arguments); }'
                    }
                  }
                },
                "Release": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function() { ng_CallParent(this, "Release", arguments); }'
                    }
                  }
                },
                "Update": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(recursive) { ng_CallParent(this, "Update", arguments); }'
                    }
                  }
                },
                "UpdateLater": { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(s) { ng_CallParent(this, "UpdateLater", arguments); }'
                    }
                  }
                },
                "DoPointerDown": { DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(pi) { ng_CallParent(this, "DoPointerDown", arguments); }'
                    }
                  }
                },
                "DoPointerUp": { DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(pi) { ng_CallParent(this, "DoPointerUp", arguments); }'
                    }
                  }
                },
                "DoPtrStart": { DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(pi) { ng_CallParent(this, "DoPtrStart", arguments); }'
                    }
                  }
                },
                "DoPtrEnd": { DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(pi) { ng_CallParent(this, "DoPtrEnd", arguments); }'
                    }
                  }
                },
                "DoPtrDrag": { DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(pi) { ng_CallParent(this, "DoPtrDrag", arguments); }'
                    }
                  }
                },
                "DoPtrClick": { DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(pi) { ng_CallParent(this, "DoPtrClick", arguments); }'
                    }
                  }
                },
                "DoPtrDblClick": { DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(pi) { ng_CallParent(this, "DoPtrDblClick", arguments); }'
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    ng_MergeDI(obj.DesignInfo ,getBaseProperties());
  };

  window.ngSysControlDesignInfo = function(obj)
  {
    if ((!ngHASDESIGNINFO()) || (!obj) || (typeof obj.DesignInfo !== 'undefined')) return;

    obj.DesignInfo = {
      NonVisual: true,
      ControlCategory: 'System',
      Properties: {
        "R": {},
        "B": {}
      }
    };

    ng_MergeDI(obj.DesignInfo ,getBaseProperties());
  };
})()


if (typeof ngUserControls === 'undefined') ngUserControls = [];
ngUserControls['controls_designinfo'] = {
  OnFormEditorInit: function(FE)
  {
    var types = [
      // ngImageShape
      {
        TypeID: 'ngImageShape',
        TypeBase: 'object',
        Name: 'ngImageShape',
        ShortName: 'shape',
        Basic: false,
        Options: {
          Add: false,
          ObjectProperties: {
            "Shape": { DefaultType: 'string', Level: 'basic', Order: 0.4,
              Types: {
                'string': {
                  DefaultValue: 'rect',
                  Editor: 'ngfeEditor_DropDownList',
                  EditorOptions: {
                    Items: ['rect','circle','poly']
                  }
                }
              }
            },
            "Coords": { DefaultType: 'string', Level: 'basic', Order: 0.41 },
            "Alt": { DefaultType: 'string', Level: 'basic' },
            "OnClick": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(e) { return true; }'
                }
              }
            }
          }
        }
      },
      // ngPage
      {
        TypeID: 'ngPage',
        TypeBase: 'object',
        Name: 'ngPage',
        ShortName: 'page',
        Basic: false,
        Options: {
          ObjectProperties: {
            "id":   { DefaultType: 'undefined', InitType: 'string', Level: 'basic' },
            "Text": { DefaultType: 'undefined', InitType: 'string', Level: 'basic' },
            "Alt":  { DefaultType: 'undefined', InitType: 'string', Level: 'basic' },
            "Visible": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                  DefaultValue: true
                }
              }
            },
            "Enabled": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                  DefaultValue: true
                }
              }
            },
            "ControlsPanel": { DefaultType: 'control', Level: 'basic',
              IsContainer: false
            },
            "W": { DefaultType: 'undefined', InitType: 'bounds_integer', Level: 'basic',
              Types: {
                'bounds': {}
              }
            },
            "H": { DefaultType: 'undefined', InitType: 'bounds_integer', Level: 'basic',
              Types: {
                'bounds': {}
              }
            },
            "MinWidth": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic' },
            "Controls": { DefaultType: 'controls', Level: 'basic',
              ContainerProperty: true,
              Types: {
                'controls': {
                  DestroyIfEmpty: true,
                  ChildDesignInfo: {
                    DisplayInControls: true
                  }
                }
              }
            }
          }
        }
      }
    ];
    FormEditor.RegisterPropertyType(types);

    FE.RegisterPropertyTypesGroup('events', ['function', 'identifier', 'null', 'undefined']);
    FE.AddPropertyTypeToGroup('object', 'images');
  },

  OnControlDesignInfo: function(def, c, ref)
  {
    if(!def.CtrlInheritanceDepth) {
      var di = {};
      // define common DesignInfo
      var events = (c.DesignInfo && c.DesignInfo.Properties && c.DesignInfo.Properties.Events) ? c.DesignInfo.Properties.Events : {},
          eventstype = [{ id: 'Before', order: 0.91 }, { id: 'After', order: 0.93 }, { id: 'Override', order: 0.94 }],
          id;
      di.Properties = ngNullVal(di.Properties, {});
      for (var i = 0; i < eventstype.length; i++)
      {
        id = eventstype[i].id + 'Events';
        di.Properties[id] = ngNullVal(c.DesignInfo.Properties[id], {});
        ng_MergeDI(di.Properties[id], events);
        di.Properties[id].Order = eventstype[i].order;
      }
      return di;
    }
  },
  OnInit: function() {
    if(!ngDESIGNINFO) return;

    function di_initasrefname(ch) {
      if (!ch.Value) {
        var selected = FormEditor.GetSelectedControlsIDs();
        if (selected.length === 1) {
          ch.Value = FormEditor.GetControlRefNameById(selected[0]);
        }
      }
      return true;
    }

    // register generic control
    function feGenericControl(id)
    {
      ngControl(this, id, 'feGenericControl');
      ngControlCreated(this);
    }
    ngRegisterControlType('feGenericControl', function() { return new feGenericControl; });

    function feGenericSysControl(id)
    {
      ngSysControl(this, id, 'feGenericSysControl');
      ngControlCreated(this);
    }
    ngRegisterControlType('feGenericSysControl', function() { return new feGenericSysControl; });



    ngRegisterControlDesignInfo('ngPanel',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        IsContainer: true,
        BaseControl: 'ngPanel',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 100 }
            }
          }
        },
        Properties: {
          "ParentReferences": { Level: 'advanced' },
          "ScrollBars": { Level: 'basic' },
          "Controls": { Level: 'basic' }
        }
      };
    });

    ngRegisterControlDesignInfo('ngText',function(d,c,ref) {
      return {
        ControlCategory: 'Labels',
        NewControl: {
          Default: {
            Properties: {
              "Data": {
                ObjectProperties: {
                  "Text": { ValueByRefName: true },
                  "HTMLEncode": { Value: true }
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "style": {
            "color": { Level: 'basic' },
            "fontFamily": { Level: 'basic' },
            "fontSize": { Level: 'basic' },
            "fontStyle": { Level: 'basic' },
            "fontWeight": { Level: 'basic' },
            "lineHeight": { Level: 'basic' },
            "textTransform": { Level: 'basic' },
            "whiteSpace": { Level: 'basic' }
          },

          "Data": {
            "TextAlign": { DefaultType: 'string', Level: 'basic',
              Types: {
                'string': {
                  DefaultValue: 'left',
                  Editor: 'ngfeEditor_DropDownList',
                  EditorOptions: {
                    Items: ['left','right','center','justify']
                  }
                }
              }
            },
            "AutoSize": { DefaultType: 'boolean',
              Types: {
                'boolean': {
                  InitValue: true
                }
              }
            },
            "AutoSizeMode": { DefaultType: 'string',
              Types: {
                'string': {
                  DefaultValue: 'auto',
                  Editor: 'ngfeEditor_DropDownList',
                  EditorOptions: {
                    Items: ['auto','horizontal','vertical']
                  }
                }
              }
            },
            "MinWidth":  { DefaultType: 'undefined', InitType: 'integer' },
            "MinHeight": { DefaultType: 'undefined', InitType: 'integer' },

            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'basic' },
            "Text": { DefaultType: 'string', Level: 'basic',
              Types: {
                'string': {
                  Editor: 'ngfeEditor_Text'
                }
              },
              OnPropertyInit: di_initasrefname
            },
            "ngAlt": { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": { DefaultType: 'string', Level: 'basic' },
            "HTMLEncode": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                  DefaultValue: ngVal(ngDefaultHTMLEncoding,false),
                  InitValue: true
                }
              }
            },
            "CanSelect": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': { DefaultValue: true }
              }
            }
          },
          "OverrideEvents": {
            "OnSetText": { DefaultType: 'events',
              Types: {
                'function': {
                  DefaultValue: 'function(text, c) { return text; }'
                }
              }
            },
            "OnGetText": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { return ""; }'
                }
              }
            },
            "OnGetAlt": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { return ""; }'
                }
              }
            }
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngImage',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        BaseControl: 'ngImage',
        Properties: ng_DIProperties({
          "Data": {
            "ngAlt":  { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": { DefaultType: 'string', Level: 'basic' },
            "AutoSize": { DefaultType: 'boolean',
              Types: {
                'boolean': {
                   DefaultValue: true
                 }
              }
            },
            "Img": { DefaultType: 'image', Level: 'basic' }
          },
          "OverrideEvents": {
            "OnGetImg": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { return null; }'
                }
              }
            },
            "OnGetAlt": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { return ""; }'
                }
              }
            }
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngImageMap',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        BaseControl: 'ngImageMap',
        Properties: ng_DIProperties({
          "Data": {
            "ngAlt":  { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": { DefaultType: 'string', Level: 'basic' },
            "AutoSize": { DefaultType: 'boolean',
              Types: {
                'boolean': {
                   DefaultValue: true
                 }
              }
            },
            "Img": { DefaultType: 'image', Level: 'basic' },
            "Cursor": { DefaultType: 'css_cursor', Level: 'basic' },
            "Shapes": { DefaultType: 'array', Level: 'basic',
              Types: {
                'array': {
                  ChildDesignInfo: {
                    DefaultType: 'ngImageShape'
                  }
                }
              }
            }
          },
          "Events": {
            "OnShapeClick": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(e) { }'
                }
              }
            },
            "OnMouseEnter":  { },
            "OnMouseLeave":  { },
            "OnMouseShapeEnter": { DefaultType: 'events',
              Types: {
                'function': {
                  DefaultValue: 'function(c, shapeidx) { }'
                }
              }
            },
            "OnMouseShapeLeave": { DefaultType: 'events',
              Types: {
                'function': {
                  DefaultValue: 'function(c, shapeidx) { }'
                }
              }
            }
          },
          "OverrideEvents": {
            "OnGetImg": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { return null; }'
                }
              }
            },
            "OnGetAlt": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { return ""; }'
                }
              }
            },
            "OnGetShapeAlt": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c, shapeidx) { return ""; }'
                }
              }
            }
          }
        })
      }
    });

    ngRegisterControlDesignInfo('ngButton',function(d,c,ref) {
      return {
        ControlCategory: 'Buttons',
        NewControl: {
          Default: {
            Properties: {
              "Data": {
                ObjectProperties: {
                  "Text": { ValueByRefName: true },
                  "HTMLEncode": { Value: true }
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "H": { Level: 'optional' },
          "style": {
            "color": { Level: 'basic' },
            "fontFamily": { Level: 'basic' },
            "fontSize": { Level: 'basic' },
            "fontStyle": { Level: 'basic' },
            "fontWeight": { Level: 'basic' },
            "textTransform": { Level: 'basic' }
          },
          "Data": {
            "Action": { DefaultType: 'string', Level: 'basic'
              // TODO: browse from existing actions
            },
            "TextAlign": { DefaultType: 'string', Level: 'basic',
              Types: {
                'string': {
                  DefaultValue: 'center',
                  Editor: 'ngfeEditor_DropDownList',
                  EditorOptions: {
                    Items: ['left','right','center']
                  }
                }
              }
            },
            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'basic' },
            "Text": { DefaultType: 'string', Level: 'basic',
              OnPropertyInit: di_initasrefname
            },
            "ngAlt":  { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": { DefaultType: 'string', Level: 'basic' },
            "HTMLEncode": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                  DefaultValue: ngVal(ngDefaultHTMLEncoding,false),
                  InitValue: true
                }
              }
            },
            "AutoSize": { DefaultType: 'boolean',
              Types: {
                'boolean': {
                   DefaultValue: true
                 }
              }
            },
            "MinWidth": { DefaultType: 'undefined', InitType: 'integer' },
            "Checked": { DefaultType: 'integer', Level: 'basic',
              Types: {
                'integer': {
                   DefaultValue: 0,
                   InitValue: 1,
                   Editor: 'ngfeEditor_DropDownList',
                   EditorOptions: {
                     Items: [{Value:0,Text:'Unchecked'},{Value:1,Text:'Checked'},{Value:2,Text:'Grayed'}]
                   }
                 }
              }
            },
            "RadioGroup": { DefaultType: 'undefined', InitType: 'string'
              // TODO: browse from existing radio groups
            },
            "Cursor": { DefaultType: 'css_cursor', Level: 'basic',
              Types: {
                'css_cursor': {
                  DefaultValue: 'pointer'
                }
              }
            },
            "ReadOnly": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                  InitValue: true
                }
              }
            },
            "Img": { DefaultType: 'image', Level: 'basic' },
            "ImgAlign": { DefaultType: 'string', Level: 'basic',
              Types: {
                'string': {
                  DefaultValue: 'left',
                  Editor: 'ngfeEditor_DropDownList',
                  EditorOptions: {
                    Items: ['left','right']
                  }
                }
              }
            },
            "ImgIndent": { DefaultType: 'integer', Level: 'basic' },
            "LeftImg": { DefaultType: 'image', Level: 'basic' },
            "MiddleImg": { DefaultType: 'image', Level: 'basic',
              Types: {
                'image': {
                   EditorOptions: {
                     HorizontalImages: true
                   }
                 }
              }
            },
            "RightImg": { DefaultType: 'image', Level: 'basic' },
            "Default": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                  InitValue: true
                }
              }
            },
            "Cancel": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                  InitValue: true
                }
              }
            }
          },
          "Events": {
            "OnCheckChanged": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { }'
                }
              }
            },
            "OnDblClick": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(e) { }'
                }
              }
            },
            "OnClick": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(e) { }'
                }
              }
            },
            "OnMouseEnter": { },
            "OnMouseLeave": { }
          },
          "OverrideEvents": {
            "OnSetText": { DefaultType: 'events',
              Types: {
                'function': {
                  DefaultValue: 'function(text, c) { return text; }'
                }
              }
            },
            "OnGetText": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { return ""; }'
                }
              }
            },
            "OnGetAlt": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { return ""; }'
                }
              }
            },
            "OnGetImg": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c, idx) { return null; }'
                }
              }
            },
            "OnGetClassName": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c, cls, text) { return cls; }'
                }
              }
            }
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngGroup',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        IsContainer: true,
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 100 },
              "Data": {
                ObjectProperties: {
                  "Text": { ValueByRefName: true },
                  "HTMLEncode": { Value: true }
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "ParentReferences": { Level: 'advanced' },
          "W": { 
            Exclude: ['CW']
          },
          "H": {
            Exclude: ['CH']
          },
          "CW": { DefaultType: 'integer', Order: 0.141,
            Exclude: ['W']
          },
          "CH": { DefaultType: 'integer', Order: 0.142,
            Exclude: ['H']
          },
          "ControlsPanel": { DefaultType: 'control', Level: 'basic',
            IsContainer: false,
            Types: {
              'control': {
                DefaultValue: { Type: "'ngPanel'" }
              }
            }
          },
          "Data": {
            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'basic' },
            "Text": { DefaultType: 'string', Level: 'basic',
              OnPropertyInit: di_initasrefname
            },
            "HTMLEncode": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                  DefaultValue: ngVal(ngDefaultHTMLEncoding,false),
                  InitValue: true
                }
              }
            },
            "Frame": { DefaultType: 'img_frame', Level: 'basic',
              Collapsed: true
            },
            "ControlsInside": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                   DefaultValue: true
                 }
              }
            }
          },
          "OverrideEvents": {
            "OnSetText": { DefaultType: 'events',
              Types: {
                'function': {
                  DefaultValue: 'function(text, c) { return text; }'
                }
              }
            },
            "OnGetText": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { return ""; }'
                }
              }
            }
          }
        },
        {
          "Controls": { Level: 'basic' }
        })
      };
    });

    ngRegisterControlDesignInfo('ngEdit',function(d,c,ref) {
      var hintstyle='ngHintHideOnInput';
      switch(ngDefaultHintStyle)
      {
        case 0: hintstyle='ngHintHideOnFocus'; break;
        case 1: hintstyle='ngHintHideOnInput'; break;
      }
      return {
        ControlCategory: 'Edits',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "Data": {
                ObjectProperties: {
                  "Text": { ValueByRefName: true }
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "Buttons": { DefaultType: 'controls_array', Level: 'basic',
            Collapsed: false,
            DisplayInControls: true,
            Types: {
              'controls_array': {
                DestroyIfEmpty: true,
                ChildDesignInfo: {
                  DisplayInControls: true,
                  Types: {
                    'control': {
                      InheritedFrom: 'ngButton',
                      ObjectProperties: ng_DIProperties({
                        "Data": {
                          "ButtonAlign": { DefaultType: 'string', Level: 'basic', Order: 0.8,
                            Types: {
                              'string': {
                                DefaultValue: 'right',
                                Editor: 'ngfeEditor_DropDownList',
                                EditorOptions: {
                                  Items: ['left','right']
                                }
                              }
                            }
                          }
                        }
                      })
                    }
                  }
                }
              }
            }
          },
          "DropDown": { DefaultType: 'control', 
            DisplayInControls: true
          },
          "Data": {
            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'optional' },
            "Text": { DefaultType: 'string', Level: 'basic',
              OnPropertyInit: di_initasrefname
            },
            "DefaultText": { DefaultType: 'string', Level: 'basic' },
            "TextAlign": { DefaultType: 'string', Level: 'basic',
              Types: {
                'string': {
                  DefaultValue: 'left',
                  Editor: 'ngfeEditor_DropDownList',
                  EditorOptions: {
                    Items: ['left','right','center']
                  }
                }
              }
            },
            "ngAlt":  { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": { DefaultType: 'string', Level: 'basic' },
            "ngHint":  { Level: 'advanced' },
            "ngHintD": { Level: 'basic' },
            "Hint": { DefaultType: 'string', Level: 'basic' },
            "HintStyle": { DefaultType: 'identifier', Level: 'basic',
              Types: {
                'identifier': {
                  DefaultValue: hintstyle,
                  Editor: 'ngfeEditor_DropDown',
                  EditorOptions: {
                    Items: ['ngHintHideOnFocus','ngHintHideOnInput']
                  }
                },
                'integer': {
                  DefaultValue: ngDefaultHintStyle,
                  Editor: 'ngfeEditor_DropDownList',
                  EditorOptions: {
                    Items: [{Value:0,Text:'ngHintHideOnFocus'},{Value:1,Text:'ngHintHideOnInput'}]
                  }
                }
              }
            },
            "ReadOnly": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                  InitValue: true
                }
              }
            },
            "Password": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                  InitValue: true
                }
              }
            },
            "MaxLength": { DefaultType: 'integer', Level: 'basic' },
            "LeftImg": { DefaultType: 'image', Level: 'basic' },
            "MiddleImg": { DefaultType: 'image', Level: 'basic',
              Types: {
                'image': {
                   EditorOptions: {
                     HorizontalImages: true
                   }
                 }
              }
            },
            "RightImg": { DefaultType: 'image', Level: 'basic' },
            "OffsetTop": { DefaultType: 'integer', Level: 'basic' },
            "SelectOnFocus": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': { DefaultValue: true }
              }
            },
            "DropDownType": { DefaultType: 'identifier', 
              Types: {
                'identifier': {
                  DefaultValue: 'ngeDropDownEdit',
                  Editor: 'ngfeEditor_DropDown',
                  EditorOptions: {
                    Items: ['ngeDropDownEdit','ngeDropDownList']
                  }
                },
                'integer': {
                  DefaultValue: 0,
                  Editor: 'ngfeEditor_DropDownList',
                  EditorOptions: {
                    Items: [{Value:0,Text:'ngeDropDownEdit'},{Value:1,Text:'ngeDropDownList'}]
                  }
                }
              }
            },
            "DropDownWidth": { DefaultType: 'undefined', InitType: 'integer' },
            "DropDownAlign": { DefaultType: 'string', 
              Types: {
                'string': {
                  DefaultValue: 'left',
                  Editor: 'ngfeEditor_DropDownList',
                  EditorOptions: {
                    Items: ['left','right']
                  }
                }
              }
            },
            "LockHintCaretPos": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': { DefaultValue: true }
              }
            },
            "Invalid": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                  InitValue: true
                }
              }
            },
            "Suggestion": { DefaultType: 'boolean',
              Types: {
                'boolean': {
                  InitValue: true
                }
              }
            },
            "SuggestionDelay": { DefaultType: 'integer',
              Types: {
                'integer': { DefaultValue: 200 }
              }
            },
            "SuggestionSearchColumn": { DefaultType: 'string' },
            "SuggestionIgnoreCase": { DefaultType: 'boolean',
              Types: {
                'boolean': { DefaultValue: true }
              }
            },
            "SuggestionPartial":  { DefaultType: 'integer',
              Types: {
                'integer': {
                  DefaultValue: 2,
                  Editor: 'ngfeEditor_DropDownList',
                  EditorOptions: {
                    Items: [{Value:2,Text:'Contains'},{Value:1,Text:'Starts With'},{Value:0,Text:'Equals'},{Value:-1,Text:'Custom'}]
                  }
                }
              }
            },
            "SuggestionURL": { DefaultType: 'url' },
            "SuggestionType": { DefaultType: 'string' }
          },
          "Methods": {
            "DoFocus": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function(e, elm) { ng_CallParent(this, "DoFocus", arguments); }'
                }
              }
            },
            "DoBlur": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function(e, elm) { ng_CallParent(this, "DoBlur", arguments); }'
                }
              }
            },
            "DoUpdateImages": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function() { ng_CallParent(this, "DoUpdateImages", arguments); }'
                }
              }
            },
            "DoSetInvalid": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function(state, update) { ng_CallParent(this, "DoSetInvalid", arguments); }'
                }
              }
            }
          },
          "OverrideEvents": {
            "OnSetText": { DefaultType: 'events',
              Types: {
                'function': {
                  DefaultValue: 'function(text, c) { return text; }'
                }
              }
            },
            "OnGetText": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { return ""; }'
                }
              }
            },
            "OnGetAlt": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { return ""; }'
                }
              }
            },
            "OnGetHint": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { return ""; }'
                }
              }
            },
            "OnGetClassName": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c, cls, text, hint) { return cls; }'
                }
              }
            },
            "OnGetImg": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c, idx) { return null; }'
                }
              }
            },
            "OnSuggestionSetText": { DefaultType: 'events',
              Types: {
                'function': {
                  DefaultValue: 'function(text, it) { return text; }'
                }
              }
            },
            "OnSuggestionURL": { DefaultType: 'events',
              Types: {
                'function': {
                  DefaultValue: 'function(c, url) { return url; }'
                }
              }
            }
          },
          "Events": {
            "OnTextChanged": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { }'
                }
              }
            },
            "OnDropDown": { DefaultType: 'events',
              Types: {
                'function': {
                  DefaultValue: 'function(c, dd) { return true; }'
                }
              }
            },
            "OnHideDropDown": { DefaultType: 'events',
              Types: {
                'function': {
                  DefaultValue: 'function(c, dd) { return true; }'
                }
              }
            },
            "OnClickOutside": { },
            "OnKeyDown": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(e, elm) { return true; }'
                }
              }
            },
            "OnKeyUp": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(e, elm) { return true; }'
                }
              }
            },
            "OnKeyPress": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(e, elm) { return true; }'
                }
              }
            },
            "OnMouseEnter": { },
            "OnMouseLeave": { },
            "OnFocus": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { }'
                }
              }
            },
            "OnBlur": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { }'
                }
              }
            },
            "OnSetInvalid": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c, state, update) { return true; }'
                }
              }
            },
            "OnSetReadOnly": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c, state) { return true; }'
                }
              }
            },
            "OnReadOnlyChanged": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c, state) { }'
                }
              }
            },
            "OnSuggestionSearch": { DefaultType: 'events',
              Types: {
                'function': {
                  DefaultValue: 'function(c, txt, res) { return true; }'
                }
              }
            },
            "OnSuggestionCompareItem": { DefaultType: 'events',
              Types: {
                'function': {
                  DefaultValue: 'function(c, txt, itemtxt, list, it, parent) { return (txt==itemtxt); }'
                }
              }
            },
            "OnSuggestionResults": { DefaultType: 'events',
              Types: {
                'function': {
                  DefaultValue: 'function(c, txt, data, res) { return true; }'
                }
              }
            },
            "OnSuggestionData": { DefaultType: 'events',
              Types: {
                'function': {
                  DefaultValue: 'function(c, txt, data) { return true; }'
                }
              }
            }
          }
        })
      };
    });
    ngRegisterControlDesignInfo('ngMemo',function(d,c,ref) {
      var hintstyle='ngHintHideOnInput';
      switch(ngDefaultHintStyle)
      {
        case 0: hintstyle='ngHintHideOnFocus'; break;
        case 1: hintstyle='ngHintHideOnInput'; break;
      }
      return {
        ControlCategory: 'Edits',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 100 },
              "Data": {
                ObjectProperties: {
                  "Text": { ValueByRefName: true }
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "Data": {
            "ngText":  { Level: 'advanced' },
            "ngTextD": { Level: 'optional' },
            "Text": { DefaultType: 'string', Level: 'basic',
              OnPropertyInit: di_initasrefname
            },
            "DefaultText": { DefaultType: 'string', Level: 'basic' },
            "TextAlign": { DefaultType: 'string', Level: 'basic',
              Types: {
                'string': {
                  DefaultValue: 'left',
                  Editor: 'ngfeEditor_DropDownList',
                  EditorOptions: {
                    Items: ['left','right','center']
                  }
                }
              }
            },
            "ngAlt":  { Level: 'advanced' },
            "ngAltD": { Level: 'basic' },
            "Alt": { DefaultType: 'string', Level: 'basic' },
            "ngHint": { Level: 'advanced' },
            "ngHintD": { Level: 'basic' },
            "Hint": { DefaultType: 'string', Level: 'basic' },
            "HintStyle": { DefaultType: 'identifier', Level: 'basic',
              Types: {
                'identifier': {
                  DefaultValue: hintstyle,
                  Editor: 'ngfeEditor_DropDown',
                  EditorOptions: {
                    Items: ['ngHintHideOnFocus','ngHintHideOnInput']
                  }
                },
                'integer': {
                  DefaultValue: ngDefaultHintStyle,
                  Editor: 'ngfeEditor_DropDownList',
                  EditorOptions: {
                    Items: [{Value:0,Text:'ngHintHideOnFocus'},{Value:1,Text:'ngHintHideOnInput'}]
                  }
                }
              }
            },
            "ReadOnly": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                  InitValue: true
                }
              }
            },
            "Frame": { DefaultType: 'img_frame', Level: 'basic' },
            "SelectOnFocus": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': { DefaultValue: true }
              }
            },
            "LockHintCaretPos": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': { DefaultValue: true }
              }
            },
            "Invalid": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                  InitValue: true
                }
              }
            }
          },
          "Methods": {
            "DoFocus": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function(e, elm) { ng_CallParent(this, "DoFocus", arguments); }'
                }
              }
            },
            "DoBlur": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function(e, elm) { ng_CallParent(this, "DoBlur", arguments); }'
                }
              }
            },
            "DoUpdateImages": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function() { ng_CallParent(this, "DoUpdateImages", arguments); }'
                }
              }
            },
            "DoSetInvalid": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function(state, update) { ng_CallParent(this, "DoSetInvalid", arguments); }'
                }
              }
            }
          },
          "OverrideEvents": {
            "OnSetText": { DefaultType: 'events',
              Types: {
                'function': {
                  DefaultValue: 'function(text, c) { return text; }'
                }
              }
            },
            "OnGetText": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { return ""; }'
                }
              }
            },
            "OnGetAlt": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { return ""; }'
                }
              }
            },
            "OnGetHint": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { return ""; }'
                }
              }
            },
            "OnGetClassName": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c, cls, text, hint) { return cls; }'
                }
              }
            }
          },
          "Events": {
            "OnTextChanged": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { }'
                }
              }
            },
            "OnKeyDown": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(e, elm) { return true; }'
                }
              }
            },
            "OnKeyUp": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(e, elm) { return true; }'
                }
              }
            },
            "OnKeyPress": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(e, elm) { return true; }'
                }
              }
            },
            "OnMouseEnter": { },
            "OnMouseLeave": { },
            "OnFocus": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { }'
                }
              }
            },
            "OnBlur": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { }'
                }
              }
            },
            "OnSetInvalid": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c, state, update) { return true; }'
                }
              }
            },
            "OnSetReadOnly": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c, state) { return true; }'
                }
              }
            },
            "OnReadOnlyChanged": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c, state) { }'
                }
              }
            }
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngPages',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        IsContainer: true,
        TargetContainer: function(control, target_control, control_elm, target_elm)
        {
          if (!control) return 'Pages.0.Controls';
          return 'Pages.' + ngVal(control.Page, 0) + '.Controls';
        },
        BaseControl: 'ngPages',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 100 },
              "Data": {
                ObjectProperties: {
                  "HTMLEncode": { Value: true }
                }
              },
              "Pages": {
                ObjectProperties: {
                  "0": {
                    ObjectProperties: {
                      Text: { Value: 'Page 1', Type: 'string' }
                    }
                  }
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "Pages": { DefaultType: 'array', Level: 'basic',
            Collapsed: false,
            Types: {
              'array': {
                ChildDesignInfo: {
                  DefaultType: 'ngPage',
                  Collapsed: false,
                  OnPropertyInit: function(ch)
                  {
                    if (FormEditor.PropertyTypeInheritsFrom(ch.Type, 'ngPage'))
                    {
                      var pageid = ng_toInteger(ch.Name.substring(ch.Name.lastIndexOf('.') + 1));
                      if (!isNaN(pageid))
                      {
                        if (!ch.Value || typeof ch.Value !== 'object') ch.Value = {};
                        ch.Value.Text = "'Page " + (pageid + 1) + "'";
                      }
                    }

                    return true;
                  }
                }
              }
            }
          },
          "ControlsPanel": { DefaultType: 'control', Level: 'basic',
            IsContainer: false,
            Types: {
              'control': {
                DefaultValue: { Type: "'ngPanel'" }
              }
            }
          },
          "Data": {
            "Page": { DefaultType: 'integer', Level: 'basic' },
            "PagesVisible": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                  DefaultValue: true
                }
              }
            },
            "PagesIndent": { DefaultType: 'integer', Level: 'basic' },
            "PagesSize": { DefaultType: 'integer', Level: 'basic' },
            "MaxRows": { DefaultType: 'integer', Level: 'basic' },
            "PagesAlign": { DefaultType: 'string',Level: 'basic',
              Types: {
                'string': {
                  DefaultValue: 'left',
                  Editor: 'ngfeEditor_DropDownList',
                  EditorOptions: {
                    Items: ['left','right']
                  }
                }
              }
            },
            "PagesVAlign": { DefaultType: 'string', Level: 'basic',
              Types: {
                'string': {
                  DefaultValue: 'top',
                  Editor: 'ngfeEditor_DropDownList',
                  EditorOptions: {
                    Items: ['top','bottom']
                  }
                }
              }
            },
            "TextAlign": { DefaultType: 'string', Level: 'basic',
              Types: {
                'string': {
                  DefaultValue: 'left',
                  Editor: 'ngfeEditor_DropDownList',
                  EditorOptions: {
                    Items: ['left','right','center','justify']
                  }
                }
              }
            },
            "HTMLEncode": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                  DefaultValue: ngVal(ngDefaultHTMLEncoding,false),
                  InitValue: true
                }
              }
            },
            "RowOverlap": { DefaultType: 'integer', Level: 'basic' },
            "PageImages": { DefaultType: 'array', Level: 'basic' },
            "Frame": { DefaultType: 'img_frame', Level: 'basic',
              Collapsed: true
            }
          },
          "OverrideEvents": {
            "OnGetText": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c, pg) { return ""; }'
                }
              }
            },
            "OnGetAlt": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c, pg) { return ""; }'
                }
              }
            }
          },
          "Events": {
            "OnPageChanging": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c, page) { return true; }'
                }
              }
            },
            "OnPageChanged": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c, oldpage) { return true; }'
                }
              }
            },
            "OnClick": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(e) { return true; }'
                }
              }
            },
            "OnDblClick": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(e) { return true; }'
                }
              }
            }
          }
        }),

        ActionsMenu: {
          'add_page': {
            Text: 'Add Page',
            MultiSelect: false,
            Checked: 0,
            OnMenuClick: function(e, m, it)
            {
              var pages = FormEditor.GetSelectedControlsProperty('Pages');
              for (var i in pages)
              {
                var p = pages[i];
                if (!p) continue;

                var pages_cnt;
                if (p.PropertyDefined === 0) pages_cnt = 0;
                else pages_cnt = ng_IsArrayVar(p.PropertyValue) ? p.PropertyValue.length : 0;

                FormEditor.SetControlsProperty({ Name: 'Pages.' + pages_cnt,                           ControlID: p.ControlID, UseInit: FormEditor.Params.PEInitializePropertiesOnAdd, Interactive: FormEditor.Params.PEInitializePropertiesOnAdd });
                FormEditor.SetControlsProperty({ Name: 'Data.Page', Type: 'integer', Value: pages_cnt, ControlID: p.ControlID });
              }

              return false;
            }
          },
          'delete_page': {
            Text: '@%add_page+:Delete Page',
            MultiSelect: false,
            Checked: 0,
            OnMenuClick: function(e, m, it)
            {
              var selected = FormEditor.GetSelectedControls();
              if (selected.length !== 1 || !selected[0]) return false;

              var cidx = selected[0].ControlID,
                  pages = FormEditor.GetControlsProperty('Pages', [cidx]),
                  pages_defined = (pages.PropertyDefined !== 0),
                  pages_cnt = (pages_defined && ng_IsArrayVar(pages[0].PropertyValue)) ? pages[0].PropertyValue.length : 0;
              if (pages_cnt === 0) return false;

              var page_selected = 0;
              var pgs = FormEditor.GetControlsProperty('Data.Page', [cidx]);
              if (pgs && pgs[0] && pgs[0].PropertyDefined !== 0 && ng_isInteger(pgs[0].PropertyValue)) page_selected = pgs[0].PropertyValue;

              var new_pg_select = page_selected - 1;
              if (new_pg_select < 0) new_pg_select = 0;

              FormEditor.SetControlsProperty({ Name: 'Pages.' + page_selected, Destroy: true });
              FormEditor.SetControlsProperty({ Name: 'Data.Page', Destroy: new_pg_select === 0, Type: 'integer', Value: new_pg_select });

              return false;
            }
          }
        },

        OnActionsMenuCreating: function(actions)
        {
          if (!actions) actions = {};

          var selected = FormEditor.GetSelectedControls();
          if (selected.length === 0) return;

          // add actions
          actions['delim1'] = { Text: '@%delete_page+:-' };

          var selected_pages = FormEditor.GetSelectedControlsProperty('Pages'),
              lastid = 'delim1';
          for (var i in selected)
          {
            if (!selected[i]) continue;

            var ctrlType = selected[i].DefType;
            if (!FormEditor.TypeInheritsFrom(ctrlType, 'ngPages')) continue;

            var pages = selected_pages[i];
            if (!pages) continue;

            var refname = (selected[i] && selected[i].ControlRefName) ? selected[i].ControlRefName : '';
            if (refname)
            {
              var cidx = selected[i].ControlID,
                  id = 'select_page_' + cidx,
                  pages_defined = (pages.PropertyDefined !== 0),
                  pages_cnt = (pages_defined && ng_IsArrayVar(pages.PropertyValue)) ? pages.PropertyValue.length : 0,
                  rootadd = (selected.length === 1);

              var page_selected = 0,
                  pgs = FormEditor.GetControlsProperty('Data.Page', [cidx]);
              if (pgs && pgs[0] && pgs[0].PropertyDefined !== 0 && ng_isInteger(pgs[0].PropertyValue)) page_selected = pgs[0].PropertyValue;

              if (!rootadd)
              {
                actions[id] = {
                  Text: refname + ' (' + pages_cnt + ' Pages Inside)',
                  MultiSelect: true,
                  Enabled: pages_cnt > 0,
                  Checked: 0,
                  OnMenuClick: function(e, m, it)
                  {
                    return false;
                  }
                };
              }

              var selit;
              for (var pg = 0; pg < pages_cnt; pg++)
              {
                var pg_Text = FormEditor.GetControlsProperty('Pages.'+pg+'.Text', [cidx]),
                    pg_txt = (pg_Text && pg_Text[0] && pg_Text[0].PropertyDefined !== 0 && typeof pg_Text[0].PropertyValue === 'string') ? pg_Text[0].PropertyValue : '',
                    checked = (pg === page_selected) ? 1 : 0;

                var action = {
                  Text: (!rootadd ? ('%'+id+'\\') : '@%'+lastid+'+:' ) + ('('+pg+') - ' + pg_txt),
                  MultiSelect: true,
                  ControlID: cidx,
                  Page: pg,
                  PageText: pg_txt,
                  Checked: checked,
                  OnMenuClick: function(e, m, it)
                  {
                    FormEditor.SetControlsProperty({ Name: 'Data.Page', Type: 'integer', Value: it.Page, ControlID: it.ControlID });

                    return false;
                  }
                };
                lastid = id+'_'+pg;
                actions[lastid] = action;

                if (checked) selit = action;
              }

              if (selected.length === 1)
              {
                var dit = actions['delete_page'];
                if (dit)
                {
                  dit.Enabled = (ngVal(dit.Enabled, true) && (pages_cnt > 0));
                  if (dit.Enabled && selit)
                  {
                    dit.Text = '@%add_page+:Delete Page (' + (selit.PageText ? selit.PageText : selit.Page) + ')';
                    dit.Text = dit.Text.replace(/ /g, '&nbsp;');
                  }
                }
              }
            }
          }
        }

      };
    });
    ngRegisterControlDesignInfo('ngToolBar',function(d,c,ref) {
      return {
        ControlCategory: 'Containers',
        IsContainer: true,
        BaseControl: 'ngToolBar',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 50 }
            }
          }
        },
        Properties: ng_DIProperties({
          "Data": {
            "AutoSize": { DefaultType: 'boolean' },
            "Vertical": { DefaultType: 'boolean', Level: 'basic' },
            "VPadding": { DefaultType: 'integer', Level: 'basic' },
            "HPadding": { DefaultType: 'integer', Level: 'basic' },
            "VAlign":   { DefaultType: 'string', Level: 'basic',
              Types: {
                'string': {
                  DefaultValue: 'top',
                  Editor: 'ngfeEditor_DropDownList',
                  EditorOptions: {
                    Items: ['top','bottom']
                  }
                }
              }
            },
            "HAlign": { DefaultType: 'string', Level: 'basic',
              Types: {
                'string': {
                  DefaultValue: 'left',
                  Editor: 'ngfeEditor_DropDownList',
                  EditorOptions: {
                    Items: ['left','right']
                  }
                }
              }
            },
            "Wrapable": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                  DefaultValue: true
                }
              }
            }
          }
        },
        {
          "Controls": {
            Level: 'basic',
            Types: {
              'controls': {
                ChildDesignInfo: {
                  Types: {
                    'control': {
                      ObjectProperties: ng_DIProperties({
                        "Data": {
                          "ToolBarIgnore": { DefaultType: 'boolean', Level: 'basic', Order: 0.8,
                            Types: {
                              'boolean': {
                                InitValue: true
                              }
                            }
                          },
                          "ToolBarAutoUpdate": { DefaultType: 'boolean', Level: 'basic', Order: 0.8,
                            Types: {
                              'boolean': {
                                DefaultValue: true
                              }
                            }
                          },
                          "ToolBarIndent": { DefaultType: 'integer', Level: 'basic', Order: 0.8 },
                          "ToolBarHPadding": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic', Order: 0.8 },
                          "ToolBarVPadding": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic', Order: 0.8 },
                          "ToolBarWidth": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic', Order: 0.8 },
                          "ToolBarHeight": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic', Order: 0.8 },
                          "ToolBarBreak": { DefaultType: 'boolean', Level: 'basic', Order: 0.8,
                            Types: {
                              'boolean': {
                                InitValue: true
                              }
                            }
                          },
                          "ToolBarNoWrap": { DefaultType: 'boolean', Level: 'basic', Order: 0.8,
                            Types: {
                              'boolean': {
                                InitValue: true
                              }
                            }
                          }
                        }
                      })
                    }
                  }
                }
              }
            }
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngProgressBar',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 }
            }
          }
        },
        Properties: ng_DIProperties({
          "Data": {
            "Position": { DefaultType: 'integer', Level: 'basic' },
            "Smooth": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                  InitValue: true
                }
              }
            },
            "LeftImg": { DefaultType: 'image', Level: 'basic' },
            "MiddleImg": { DefaultType: 'image', Level: 'basic',
              Types: {
                'image': {
                   EditorOptions: {
                     HorizontalImages: true
                   }
                 }
              }
            },
            "RightImg": { DefaultType: 'image', Level: 'basic' },
            "BarImg": { DefaultType: 'image', Level: 'basic',
              Types: {
                'image': {
                   EditorOptions: {
                     HorizontalImages: true
                   }
                 }
              }
            }
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngWebBrowser',function(d,c,ref) {
      return {
        ControlCategory: 'Misc',
        BaseControl: 'ngWebBrowser',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 100 },
              "H": { Value: 100 }
            }
          }
        },
        Properties: ng_DIProperties({
          "Data": {
            "URL": { DefaultType: 'url', Level: 'basic' },
            "DesignLive": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                  InitValue: true
                }
              }
            }
          },
          "OverrideEvents": {
            "OnGetURL": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c, url) { return url; }'
                }
              }
            },
            "OnSetHTML": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c, html) { return html; }'
                }
              }
            }
          },
          "Events": {
            "OnSetURL": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(c, url) { return true; }'
                }
              }
            }
          }

        })
      };
    });

    // Derived controls

    ngRegisterControlDesignInfo('ngFrame',function(d,c,ref) {
      return {
        BaseControl: 'ngFrame',
        Properties: {
          "ParentReferences": { Level: 'optional',
            Types: {
              'boolean': {
                DefaultValue: false
              }
            }
          }
        }
      };
    });

    ngRegisterControlDesignInfo('ngRadioButton',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "Data": {
            "RadioGroup": { Level: 'basic',
              Types: {
                'string': { DefaultValue: 'default' }
              }
            },
            "AllowGrayed": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                  InitValue: true
                }
              }
            },
            "RadioAllowUncheck": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                  InitValue: true
                }
              }
            }
          }
        })
      };
    });

    ngRegisterControlDesignInfo('ngCheckBox',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "Data": {
            "AllowGrayed": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                  InitValue: true
                }
              }
            }
          }
        })
      };
    });

    function DropDownDI(d,c,ref) {
      return {
        NewControl: {
          Default: {
            Properties: {
              "DropDown": { Value: "{ Type: 'ngList' }"}
            }
          }
        },
        Properties: ng_DIProperties({
          "DropDown":         { Level: 'basic' },
          "Data": {
            "DropDownWidth":  { Level: 'basic' },
            "DropDownAlign":  { Level: 'basic' },
            "DropDownType":   { Level: 'optional' }
          },
          "Events": {
            "OnDropDown":     { Level: 'basic' },
            "OnHideDropDown": { Level: 'basic' }
          }
        })
      };
    }

    ngRegisterControlDesignInfo('ngDropDownList',function(d,c,ref) {
      var di={
        NewControl: {
          Default: {
            Properties: {
              "Data": {
                ObjectProperties: {
                  "Text": undefined
                }
              },
              "DropDown": {
                ObjectProperties: {
                  "Type": "'ngList'"
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          "DropDownType": {
            Types: {
              'identifier': {
                DefaultValue: 'ngeDropDownList'
              }
            }
          }
        })
      };
      ng_MergeDI(di,DropDownDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('ngDropDown',function(d,c,ref) {
      var di={
        NewControl: {
          Default: {
            Properties: {
              "DropDown": {
                ObjectProperties: {
                  "Type": "'ngList'"
                }
              }
            }
          }
        }
      };
      ng_MergeDI(di,DropDownDI(d,c,ref));
      return di;
    });
    ngRegisterControlDesignInfo('ngEditNum',function(d,c,ref) {
      return {
        Properties: ng_DIProperties({
          "ArrowsAlign": { DefaultType: 'string', Level: 'basic',
            Types: {
              'string': {
                DefaultValue: 'right',
                Editor: 'ngfeEditor_DropDownList',
                EditorOptions: {
                  Items: ['left','right','both']
                }
              }
            }
          },
          "Arrows": { DefaultType: 'string', Level: 'basic',
            Types: {
              'string': {
                DefaultValue: 'leftright',
                Editor: 'ngfeEditor_DropDownList',
                EditorOptions: {
                  Items: ['none','leftright','updown']
                }
              }
            }
          },
          "Data": {
            "Step": { DefaultType: 'integer', Level: 'basic',
              Types: {
                'integer': {
                  DefaultValue: 1
                }
              }
            },
            "StepRound": { DefaultType: 'boolean', Level: 'basic',
              Types: {
                'boolean': {
                  InitValue: true
                }
              }
            },
            "MinNum": { DefaultType: 'integer', Level: 'basic' },
            "MaxNum": { DefaultType: 'integer', Level: 'basic' },
            "DefaultNum": { DefaultType: 'integer', Level: 'basic' }
          },
          "Methods": {
            "DoDown": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function() { ng_CallParent(this, "DoDown", arguments); }'
                }
              }
            },
            "DoUp": { DefaultType: 'function',
              Types: {
                'function': {
                  DefaultValue: 'function() { ng_CallParent(this, "DoUp", arguments); }'
                }
              }
            }
          },
          "OverrideEvents": {
            "OnGetNum": { DefaultType: 'events',
              Types: {
                'function': {
                  DefaultValue: 'function(c) { return 0; }'
                }
              }
            }
          },
          "Events": {
            "OnSetNum": { DefaultType: 'events',
              Types: {
                'function': {
                  DefaultValue: 'function(c, num) {  }'
                }
              }
            },
            "OnUp": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(e, num) { return true; }'
                }
              }
            },
            "OnDown": { DefaultType: 'events', Level: 'basic',
              Types: {
                'function': {
                  DefaultValue: 'function(e, num) { return true; }'
                }
              }
            }
          }
        })
      };
    });

  }
};