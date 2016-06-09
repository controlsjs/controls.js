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
            L: {},
            T: {}
          }
        }
      },
      Properties: {
        Type: {
          DefaultType: 'string',
          Types: {
            'string': {
              Editor: 'ngfeEditor_ControlType'
            }
          },
          Level: 'basic',
          Order: 0.01
        },
        L: { DefaultType: 'bounds', Level: 'basic', Order: 0.11 },
        T: { DefaultType: 'bounds', Level: 'basic', Order: 0.12 },
        R: { DefaultType: 'bounds', Level: 'basic', Order: 0.15 },
        B: { DefaultType: 'bounds', Level: 'basic', Order: 0.16 },
        ParentReferences: {
          DefaultType: 'boolean',
          Types: {
            'boolean': {
              DefaultValue: true
            }
          },
          Level: 'optional',
          Order: 0.302
        },
        OnCreating: {
          DefaultType: 'events',
          Types: {
            'function': {
              DefaultValue: 'function(def ,ref, parent, options) { return true; }'
            }
          },
          Order: 0.306
        },
        OnCreated: {
          DefaultType: 'events',
          Types: {
            'function': {
              DefaultValue: 'function(c, refs, options) {}'
            }
          },
          Order: 0.307
        },

        Data: {
          DefaultType: 'object',
          Types: {
            'object': {
              DestroyIfEmpty: true,
              ObjectProperties:
              {
                Enabled: {
                  Types: {
                    'boolean': {
                      DefaultValue: true
                    }
                  },
                  Level: 'basic'
                }
              }
            }
          },
          Level: 'basic',
          Order: 0.4
        },

        ModifyControls: {
          DefaultType: 'object',
          Types: {
            'object': {
              DestroyIfEmpty: true
            }
          },
          Level: 'optional',
          Order: 0.7
        },

        Events: {
          DefaultType: 'object',
          Types: {
            'object': {
              DestroyIfEmpty: true,
              ObjectProperties:
              {
                OnSetEnabled: {
                  DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c, v, p) { return true; }'
                    }
                  }
                },
                OnEnabledChanged: {
                  DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c, p) {}'
                    }
                  },
                  Level: 'basic'
                }
              }
            }
          },
          Order: 0.92
        },

        Methods: {
          DefaultType: 'object',
          Types: {
            'object': {
              DestroyIfEmpty: true,
              ObjectProperties:
              {
                SetChildControlsEnabled: {
                  DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(v, p) { if (ng_IsOverriden(this.SetChildControlsEnabled)) this.SetChildControlsEnabled.callParent.apply(this, arguments); }'
                    }
                  },
                  Level: 'experimental'
                },
                DoDispose: {
                  DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function() { if (ng_IsOverriden(this.DoDispose)) return this.DoDispose.callParent.apply(this, arguments); }'
                    }
                  }
                },
                DoCreate: {
                  DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(props, ref, nd, parent) { if (ng_IsOverriden(this.DoCreate)) this.DoCreate.callParent.apply(this, arguments); }'
                    }
                  }
                },
                DoSetEnabled: {
                  DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(v) { if (ng_IsOverriden(this.DoSetEnabled)) this.DoSetEnabled.callParent.apply(this, arguments); }'
                    }
                  }
                },
                Enable: { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function() { if (ng_IsOverriden(this.Enable)) this.Enable.callParent.apply(this, arguments); }'
                    }
                  }
                },
                Disable: { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function() { if (ng_IsOverriden(this.Disable)) this.Disable.callParent.apply(this, arguments); }'
                    }
                  }
                },
                SetEnabled: { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(v, p) { if (ng_IsOverriden(this.SetEnabled)) this.SetEnabled.callParent.apply(this, arguments); }'
                    }
                  }
                },
                Elm: { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function() { if (ng_IsOverriden(this.Elm)) this.Elm.callParent.apply(this, arguments); }'
                    }
                  }
                },
                CtrlInheritsFrom: { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(type) { if (ng_IsOverriden(this.CtrlInheritsFrom)) return this.CtrlInheritsFrom.callParent.apply(this, arguments); }'
                    }
                  }
                },
                Create: { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(props, ref) { if (ng_IsOverriden(this.Create)) return this.Create.callParent.apply(this, arguments); }'
                    }
                  }
                },
                Dispose: { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function() { if (ng_IsOverriden(this.Dispose)) this.Dispose.callParent.apply(this, arguments); }'
                    }
                  }
                },
                AddEvent: { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(ev, fce, once) { if (ng_IsOverriden(this.AddEvent)) this.AddEvent.callParent.apply(this, arguments); }'
                    }
                  }
                },
                RemoveEvent: { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(ev, fce) { if (ng_IsOverriden(this.RemoveEvent)) this.RemoveEvent.callParent.apply(this, arguments); }'
                    }
                  }
                }
              }
            }
          },
          Order: 0.8
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
        W: { DefaultType: 'bounds', Level: 'basic', Order: 0.13 },
        H: { DefaultType: 'bounds', Level: 'basic', Order: 0.14 },
        ScrollBars: {
          DefaultType: 'identifier',
          Types: {
            'identifier': {
              DefaultValue: 'ssNone',
              Editor: 'ngfeEditor_DropDownList',
              EditorOptions: {
                Items: ['ssNone','ssDefault','ssAuto','ssBoth','ssHorizontal','ssVertical']
              }
            }
          },
          Level: 'optional',
          Order: 0.301
        },
        style: {
          DefaultType: 'object',
          Types: {
            'object': {
              DestroyIfEmpty: true,
              ObjectProperties:
              {
                background: { DefaultType: 'string', Level: 'optional' },
                backgroundColor: { DefaultType: 'css_colors', Level: 'optional' },
                backgroundImage: { DefaultType: 'string', Level: 'optional' },
                border: { DefaultType: 'string', Level: 'optional' },
                borderColor: {
                  DefaultType: 'css_colors', Level: 'optional',
                  Types: {
                    'css_colors': {
                      DefaultValue: '#000000ff'
                    }
                  }
                },
                borderBottom: { DefaultType: 'string', Level: 'optional' },
                borderLeft: { DefaultType: 'string', Level: 'optional' },
                borderRight: { DefaultType: 'string', Level: 'optional' },
                borderTop: { DefaultType: 'string', Level: 'optional' },
                borderStyle: {
                  DefaultType: 'string',
                  Level: 'optional',
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
                borderWidth: { DefaultType: 'string_px', Level: 'optional', Types: { 'string': {} } },
                color: { DefaultType: 'css_colors', Level: 'optional' },
                cursor: {
                  DefaultType: 'string', Level: 'optional',
                  Types: {
                    'string': {
                      DefaultValue: 'auto',
                      Editor: 'ngfeEditor_DropDown',
                      EditorOptions: {
                        Items: ['auto','crosshair','default','hand','pointer','move','e-resize','ne-resize','nw-resize','n-resize','se-resize','sw-resize','s-resize','w-resize','text','wait', 'help','url("")']
                      }
                    }
                  }
                },
                font: { DefaultType: 'string', Level: 'optional' },
                fontSize: { DefaultType: 'string', Level: 'optional' },
                fontStyle: {
                  DefaultType: 'string', Level: 'optional',
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
                fontWeight: {
                  DefaultType: 'string', Level: 'optional',
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
                lineHeight: { DefaultType: 'integer', Level: 'optional' },
                margin: { DefaultType: 'string', Level: 'optional' },
                marginBottom: { DefaultType: 'string_px', Level: 'optional' },
                marginLeft: { DefaultType: 'string_px', Level: 'optional' },
                marginRight: { DefaultType: 'string_px', Level: 'optional' },
                marginTop: { DefaultType: 'string_px', Level: 'optional' },
                padding: { DefaultType: 'string', Level: 'optional' },
                paddingBottom: { DefaultType: 'string_px', Level: 'optional' },
                paddingLeft: { DefaultType: 'string_px', Level: 'optional' },
                paddingRight: { DefaultType: 'string_px', Level: 'optional' },
                paddingTop: { DefaultType: 'string_px', Level: 'optional' },
                textAlign: {
                  DefaultType: 'string', Level: 'optional',
                  Types: {
                    'string': {
                      DefaultValue: 'left',
                      Editor: 'ngfeEditor_DropDownList',
                      EditorOptions: {
                        Items: ['left','center','right','justify']
                      }
                    }
                  }
                },
                textDecoration: {
                  DefaultType: 'string', Level: 'optional',
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
                zIndex: { DefaultType: 'integer' }
              }
            }
          },
          Order: 0.252
        },
        Opacity: {
          DefaultType: 'float',
          Types: {
            'float': {
              DefaultValue: 1.0
            }
          },
          Level: 'basic',
          Order: 0.253
        },
        className: { DefaultType: 'string', Order: 0.251 },
        innerHTML: { DefaultType: 'string', Level: 'hidden', Order: 0.303 },
        id: { DefaultType: 'string', Level: 'optional', Order: 0.05 },
        parent: {
          DefaultType: 'string',
          Types: {
            'object': {}
          },
          Level: 'optional',
          Order: 0.07
        },
        IE6AlignFix: {
          DefaultType: 'boolean',
          Types: {
            'boolean': {
              DefaultValue: ngIE6AlignFix
            }
          },
          Level: 'optional',
          Order: 0.304
        },
        OnCreateHTMLElement: {
          DefaultType: 'events',
          Types: {
            'function': {
              DefaultValue: 'function(props, ref, c) {}'
            }
          },
          Level: 'optional',
          Order: 0.305
        },

        Data: {
          Types: {
            'object': {
              ObjectProperties:
              {
                Visible: {
                  Types: {
                    'boolean': {
                      DefaultValue: true
                    }
                  },
                  Level: 'basic'
                },
                IsPopup: { DefaultType: 'boolean' },
                Gestures: {
                  DefaultType: 'object',
                  Types: {
                    'object': {
                      DestroyIfEmpty: true,
                      ObjectProperties:
                      {
                        drag: { DefaultType: 'boolean' },
                        drapleft: { DefaultType: 'boolean', Level: 'optional' },
                        dragright: { DefaultType: 'boolean', Level: 'optional' },
                        dragup: { DefaultType: 'boolean', Level: 'optional' },
                        dragdown: { DefaultType: 'boolean', Level: 'optional' },
                        hold: { DefaultType: 'boolean' },
                        release: { DefaultType: 'boolean' },
                        swipe: { DefaultType: 'boolean' },
                        swipeleft: { DefaultType: 'boolean', Level: 'optional' },
                        swiperight: { DefaultType: 'boolean', Level: 'optional' },
                        swipeup: { DefaultType: 'boolean', Level: 'optional' },
                        swipedown: { DefaultType: 'boolean', Level: 'optional' },
                        tap: { DefaultType: 'boolean' },
                        doubletap: { DefaultType: 'boolean' },
                        touch: { DefaultType: 'boolean' },
                        transform: { DefaultType: 'boolean', Level: 'optional' },
                        pinch: { DefaultType: 'boolean', Level: 'optional' },
                        pinchin: { DefaultType: 'boolean', Level: 'optional' },
                        pinchout: { DefaultType: 'boolean', Level: 'optional' },
                        rotate: { DefaultType: 'boolean', Level: 'optional' }
                      }
                    }
                  },
                  Level: 'advanced'
                }
              }
            }
          }
        },

        Controls: {
          DefaultType: 'object',
          Types: {
            'object': {
              DestroyIfEmpty: true
            }
          },
          Level: 'optional',
          Order: 0.65
        },

        Events: {
          Types: {
            'object': {
              DestroyIfEmpty: true,
              ObjectProperties:
              {
                OnSetVisible: {
                  DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c, v) { return true; }'
                    }
                  }
                },
                OnVisibleChanged: {
                  DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c) {}'
                    }
                  },
                  Level: 'basic'
                },
                OnUpdate: {
                  DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c) { return true; }'
                    }
                  }
                },
                OnUpdated: {
                  DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c, elm) {}'
                    }
                  }
                },
                OnMouseEnter: {
                  DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c) {}'
                    }
                  },
                  Level: 'basic'
                },
                OnMouseLeave: {
                  DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c) {}'
                    }
                  },
                  Level: 'basic'
                },

                OnIsInsidePopup: {
                  DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c, target, intype, e) { return true; }'
                    }
                  }
                },
                OnClickOutside: {
                  DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c, pi) { return true; }'
                    }
                  }
                },
                OnPointerDown: {
                  DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c, pi) { return true; }'
                    }
                  }
                },
                OnPointerUp: {
                  DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c, pi) { return true; }'
                    }
                  }
                },
                OnPtrStart: {
                  DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c, pi) {}'
                    }
                  }
                },
                OnPtrEnd: {
                  DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c, pi) {}'
                    }
                  }
                },
                OnGesture: {
                  DefaultType: 'events',
                  Types: {
                    'function': {
                      DefaultValue: 'function(c, pi) { return true; }'
                    }
                  }
                },
                OnPtrDrag: {
                  DefaultType: 'events',
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

        Methods: {
          Types: {
            'object': {
              ObjectProperties:
              {
                DoMouseEnter: {
                  DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(e, mi, elm) { if (ng_IsOverriden(this.DoMouseEnter)) this.DoMouseEnter.callParent.apply(this, arguments); }'
                    }
                  },
                  Level: 'optional'
                },
                DoMouseLeave: {
                  DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(e, mi, elm) { if (ng_IsOverriden(this.DoMouseLeave)) this.DoMouseLeave.callParent.apply(this, arguments); }'
                    }
                  },
                  Level: 'optional'
                },
                DoClickOutside: {
                  DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(pi) { if (ng_IsOverriden(this.DoClickOutside)) return this.DoClickOutside.callParent.apply(this, arguments); }'
                    }
                  },
                  Level: 'optional'
                },
                IsInsidePopup: {
                  DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(target, intype, e) { if (ng_IsOverriden(this.IsInsidePopup)) return this.IsInsidePopup.callParent.apply(this, arguments); }'
                    }
                  },
                  Level: 'optional'
                },
                DoAcceptGestures: {
                  DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(elm, gestures) { if (ng_IsOverriden(this.DoAcceptGestures)) this.DoAcceptGestures.callParent.apply(this, arguments); }'
                    }
                  }
                },
                DoAcceptPtrGestures: {
                  DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(elm, eid, gestures, ev) { if (ng_IsOverriden(this.DoAcceptPtrGestures)) this.DoAcceptPtrGestures.callParent.apply(this, arguments); }'
                    }
                  },
                  Level: 'optional'
                },
                DoGetPtrOptions: {
                  DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(eid, opts) { if (ng_IsOverriden(this.DoGetPtrOptions)) this.DoGetPtrOptions.callParent.apply(this, arguments); }'
                    }
                  },
                  Level: 'optional'
                },

                DoUpdate: {
                  DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(elm) { if (ng_IsOverriden(this.DoUpdate)) return this.DoUpdate.callParent.apply(this, arguments); }'
                    }
                  }
                },
                DoAttach: { DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(elm, elmid) { if (ng_IsOverriden(this.DoAttach)) this.DoAttach.callParent.apply(this, arguments); }'
                    }
                  }
                },
                DoRelease: {
                  DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(elm) { if (ng_IsOverriden(this.DoRelease)) this.DoRelease.callParent.apply(this, arguments); }'
                    }
                  }
                },
                DoSetVisible: {
                  DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(elm, v) { if (ng_IsOverriden(this.DoSetVisible)) this.DoSetVisible.callParent.apply(this, arguments); }'
                    }
                  }
                },
                DoResize: {
                  DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(elm) { if (ng_IsOverriden(this.DoResize)) return this.DoResize.callParent.apply(this, arguments); }'
                    }
                  }
                },
                SetVisible: { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(v) { if (ng_IsOverriden(this.SetVisible)) this.SetVisible.callParent.apply(this, arguments); }'
                    }
                  }
                },
                SetFocus: { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(state) { if (ng_IsOverriden(this.SetFocus)) this.SetFocus.callParent.apply(this, arguments); }'
                    }
                  }
                },
                SetBounds: { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(props) { if (ng_IsOverriden(this.SetBounds)) return this.SetBounds.callParent.apply(this, arguments); }'
                    }
                  }
                },
                SetScrollBars: { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(v) { if (ng_IsOverriden(this.SetScrollBars)) this.SetScrollBars.callParent.apply(this, arguments); }'
                    }
                  }
                },
                SetPopup: { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(p) { if (ng_IsOverriden(this.SetPopup)) this.SetPopup.callParent.apply(this, arguments); }'
                    }
                  }
                },
                SetOpacity: { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(v) { if (ng_IsOverriden(this.SetOpacity)) this.SetOpacity.callParent.apply(this, arguments); }'
                    }
                  }
                },
                Align: { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(o) { if (ng_IsOverriden(this.Align)) return this.Align.callParent.apply(this, arguments); }'
                    }
                  }
                },
                Attach: { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(o) { if (ng_IsOverriden(this.Attach)) this.Attach.callParent.apply(this, arguments); }'
                    }
                  }
                },
                Release: { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function() { if (ng_IsOverriden(this.Release)) this.Release.callParent.apply(this, arguments); }'
                    }
                  }
                },
                Update: { DefaultType: 'function', Level: 'optional',
                  Types: {
                    'function': {
                      DefaultValue: 'function(recursive) { if (ng_IsOverriden(this.Update)) this.Update.callParent.apply(this, arguments); }'
                    }
                  }
                },
                DoPointerDown: { DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(pi) { if (ng_IsOverriden(this.DoPointerDown)) return this.DoPointerDown.callParent.apply(this, arguments); }'
                    }
                  }
                },
                DoPointerUp: { DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(pi) { if (ng_IsOverriden(this.DoPointerUp)) return this.DoPointerUp.callParent.apply(this, arguments); }'
                    }
                  }
                },
                DoPtrStart: { DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(pi) { if (ng_IsOverriden(this.DoPtrStart)) return this.DoPtrStart.callParent.apply(this, arguments); }'
                    }
                  }
                },
                DoPtrEnd: { DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(pi) { if (ng_IsOverriden(this.DoPtrEnd)) return this.DoPtrEnd.callParent.apply(this, arguments); }'
                    }
                  }
                },
                DoPtrDrag: { DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(pi) { if (ng_IsOverriden(this.DoPtrDrag)) return this.DoPtrDrag.callParent.apply(this, arguments); }'
                    }
                  }
                },
                DoPtrClick: { DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(pi) { if (ng_IsOverriden(this.DoPtrClick)) this.DoPtrClick.callParent.apply(this, arguments); }'
                    }
                  }
                },
                DoPtrDblClick: { DefaultType: 'function',
                  Types: {
                    'function': {
                      DefaultValue: 'function(pi) { if (ng_IsOverriden(this.DoPtrDblClick)) this.DoPtrDblClick.callParent.apply(this, arguments); }'
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    ng_MergeVar(obj.DesignInfo ,getBaseProperties());
  };

  window.ngSysControlDesignInfo = function(obj)
  {
    if ((!ngHASDESIGNINFO()) || (!obj) || (typeof obj.DesignInfo !== 'undefined')) return;

    obj.DesignInfo = {
      NonVisual: true,
      ControlCategory: 'System',
      Properties: {
        R: {},
        B: {}
      }
    };

    ng_MergeVar(obj.DesignInfo ,getBaseProperties());
  };
})()


if (typeof ngUserControls === 'undefined') ngUserControls = [];
ngUserControls['controls_designinfo'] = {
  OnFormEditorInit: function(FE)
  {
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
        ng_MergeVar(di.Properties[id], events);
        di.Properties[id].Order = eventstype[i].order;
      }
      return di;
    }
  },
  OnInit: function() {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('ngPanel',function(d,c,ref) {
      return {
        NewControl: {
          Default: {
            Properties: {
              W: { Value: 100 },
              H: { Value: 100 }
            }
          }
        }
      };
    });

    ngRegisterControlDesignInfo('ngText',function(d,c,ref) {
      return {
        NewControl: {
          Default: {
            Properties: {
              Data: {
                ObjectProperties: {
                  Text: { }
                }
              }
            },
            OnCreating: function(initprops,di) {
              initprops.Data.ObjectProperties.Text.Value=initprops.ControlRefName.Value;
              return true;
            }
          }
        },
        Properties: {
          Data: {
            Types: {
              'object': {
                ObjectProperties:
                {
                  Text: {
                    DefaultType: 'string',
                    Types: {
                      'string': { }
                    },
                    Level: 'basic'
                  }
                }
              }
            }
          }
        }
      };
    });

    ngRegisterControlDesignInfo('ngImage',function(d,c,ref) {
      return {
      };
    });
    ngRegisterControlDesignInfo('ngImageMap',function(d,c,ref) {
      return {
      };
    });
    ngRegisterControlDesignInfo('ngButton',function(d,c,ref) {
      return {
      };
    });
    ngRegisterControlDesignInfo('ngGroup',function(d,c,ref) {
      return {
      };
    });
    ngRegisterControlDesignInfo('ngEdit',function(d,c,ref) {
      return {
      };
    });
    ngRegisterControlDesignInfo('ngMemo',function(d,c,ref) {
      return {
      };
    });
    ngRegisterControlDesignInfo('ngPages',function(d,c,ref) {
      return {
      };
    });
    ngRegisterControlDesignInfo('ngToolBar',function(d,c,ref) {
      return {
      };
    });
    ngRegisterControlDesignInfo('ngProgressBar',function(d,c,ref) {
      return {
      };
    });
    ngRegisterControlDesignInfo('ngWebBrowser',function(d,c,ref) {
      return {
      };
    });

    // Derived controls

    ngRegisterControlDesignInfo('ngFrame',function(d,c,ref) {
      return {
      };
    });
    ngRegisterControlDesignInfo('ngRadioButton',function(d,c,ref) {
      return {
      };
    });
    ngRegisterControlDesignInfo('ngCheckBox',function(d,c,ref) {
      return {
      };
    });
    ngRegisterControlDesignInfo('ngDropDownList',function(d,c,ref) {
      return {
      };
    });
    ngRegisterControlDesignInfo('ngDropDown',function(d,c,ref) {
      return {
      };
    });
    ngRegisterControlDesignInfo('ngEditNum',function(d,c,ref) {
      return {
      };
    });

  }
};