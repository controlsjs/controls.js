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
ngUserControls['list_designinfo'] = {
  OnFormEditorInit: function(FE) {
    var list_types = [
      // ngListItem
      {
        TypeID: 'ngListItem',
        TypeBase: 'object',
        Name: 'ngListItem',
        ShortName: 'item',
        Basic: false,
        Options: {
          ObjectProperties: {
            "Text": { DefaultType: 'undefined', InitType: 'string', Level: 'basic', Order: 0.5,
              OnPropertyInit: function(ch)
              {
                if (FormEditor.PropertyTypeInheritsFrom(ch.Type, 'string'))
                {
                  var tmp = ch.Name.split('.');
                  var itemID = ng_toInteger(tmp[tmp.length - 2]);
                  if (!isNaN(itemID)) ch.Value = 'Item ' + (itemID + 1);
                }

                return true;
              }
            },
            "Alt": { DefaultType: 'undefined', InitType: 'string', Level: 'basic', Order: 0.51 },
            "ID": { DefaultType: 'undefined', InitType: 'string', Level: 'basic', Order: 0.55 },
            "Checked": { DefaultType: 'integer', Level: 'basic', Order: 0.6,
              Types: {
                'integer': {
                   DefaultValue: 0,
                   InitValue: 1,
                   Editor: 'ngfeEditor_DropDownList',
                   EditorOptions: {
                     Items: [{Value:0,Text:'cbUnchecked'},{Value:1,Text:'chChecked'},{Value:2,Text:'cbGrayed'}]
                   }
                 }
              }
            },
            "AllowGrayed": { DefaultType: 'boolean', Level: 'basic', Order: 0.61,
              Types: {
                'boolean': {
                  DefaultValue: false,
                  InitValue: true
                }
              }
            },
            "Collapsed": { DefaultType: 'boolean', Level: 'basic', Order: 0.62,
              Types: {
                'boolean': {
                  DefaultValue: false,
                  InitValue: true
                }
              }
            },
            "Visible": { DefaultType: 'boolean', Level: 'basic', Order: 0.65,
              Types: {
                'boolean': {
                  DefaultValue: true
                }
              }
            },
            "Enabled": { DefaultType: 'boolean', Level: 'basic', Order: 0.66,
              Types: {
                'boolean': {
                  DefaultValue: true
                }
              }
            },
            "RadioGroup": { DefaultType: 'undefined', InitType: 'string', Level: 'basic', Order: 0.67 },
            "H": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic', Order: 0.7 },
            "MinHeight": { DefaultType: 'undefined', InitType: 'integer', Level: 'basic', Order: 0.71 },
            "Image": { DefaultType: 'image', Level: 'basic', Order: 0.73 },
            "Parent": { DefaultType: 'undefined', Level: 'hidden', Order: 0.8,
              Types: {
                'object': {},
                'null': {}
              }
            },
            "Items": { DefaultType: 'undefined', InitType: 'ngListItems', Level: 'basic', Order: 0.85,
              Types: {
                'ngListStringItems': {}
              }
            },
            "Controls": { DefaultType: 'undefined', InitType: 'controls', Level: 'basic', Order: 0.9,
              Types: {
                'controls': {
                  DestroyIfEmpty: true
                }
              }
            },
            "ControlsHolder": { DefaultType: 'undefined', Level: 'hidden', Order: 0.91,
              Types: {
                'object': {}
              }
            }
            // TODO - check API for all properties

            //OnCollapsing
            //OnCollapsed
            //OnExpanding
            //OnExpanded
          }
        }
      },

      // ngListItems
      {
        TypeID: 'ngListItems',
        TypeBase: 'array',
        Name: 'ngListItems',
        ShortName: 'items',
        Basic: false,
        Options: {
          Priority: 0.52,
          ChildDesignInfo: {
            DefaultType: 'ngListItem', Level: 'basic',
            Collapsed: false,
            OnPropertyInit: function(ch)
            {
              if (FormEditor.PropertyTypeInheritsFrom(ch.Type, 'object'))
              {
                var pname = ch.Name.substring(0, ch.Name.lastIndexOf('.'));
                if (pname)
                {
                  var controlsprops = FormEditor.GetControlsProperty(pname, [ch.ControlID]);
                  var itemscnt = (controlsprops[0] && (ng_IsArrayVar(controlsprops[0].PropertyValue)) ) ? controlsprops[0].PropertyValue.length : 0;

                  if (!ch.Value || typeof ch.Value !== 'object') ch.Value = {};
                  ch.Value.Text = "'Item " + (itemscnt + 1) + "'";
                }
              }

              return true;
            }
          }
        },
        Detect: function(esprimanode, raw, options)
        {
          if (ng_IsOverriden(this.Detect))
          {
            if (!this.Detect.callParent.apply(this, arguments)) return false;
          }

          // exclude arrays of strings
          var elms = esprimanode.elements;
          if (elms && elms.length > 0)
          {
            for (var i = 0; i < elms.length; i++)
            {
              if (!elms[i] || elms[i].type !== 'Literal' || typeof elms[i].value !== 'string')
              {
                return true;
              }
            }
            return false;
          }

          return true;
        },
        Read: function(v, type, Interface)
        {
          if (ng_IsOverriden(this.Read)) v = this.Read.callParent.apply(this, arguments);

          if (FormEditor.PropertyTypeInheritsFrom(type, 'ngListStringItems'))
          {
            if (ng_IsArrayVar(v))
            {
              for (var i = 0; i < v.length; i++)
              {
                v[i] = "{ Text: " + v[i] + " }";
              }
            }
          };

          return v;
        }
      },

      // ngListStringItems
      {
        TypeID: 'ngListStringItems',
        TypeBase: 'array_strings',
        Name: 'ngListStringItems',
        ShortName: 'items',
        Basic: false,
        Parse: true,
        Options: {
          Priority: 0.51,
          ChildDesignInfo: {
            DefaultType: 'string', Level: 'basic',
            Collapsed: false,
            OnPropertyInit: function(ch)
            {
              if (FormEditor.PropertyTypeInheritsFrom(ch.Type, 'string'))
              {
                var tmp = ch.Name.split('.'),
                    itemID = ng_toInteger(tmp[tmp.length - 1]);
                if (!isNaN(itemID)) ch.Value = 'Item ' + (itemID + 1);
              }

              return true;
            }
          }
        },
        Read: function(v, type, Interface)
        {
          if (ng_IsOverriden(this.Read)) v = this.Read.callParent.apply(this, arguments);

          if (FormEditor.PropertyTypeInheritsFrom(type, 'ngListItems'))
          {
            if (ng_IsArrayVar(v))
            {
              var node = Interface.GetEsprimaNode();
              if (node)
              {
                var v2 = [];
                for (var i = 0; i < node.elements.length; i++)
                {
                  var str = '';
                  if (node.elements[i])
                  {
                    switch(node.elements[i].type)
                    {
                      case 'ObjectExpression':
                        var props = node.elements[i].properties;
                        for (var j in props)
                        {
                          if (props[j] && props[j].key && props[j].key.name === 'Text' && props[j].value && props[j].value.type === 'Literal' && typeof props[j].value.value === 'string')
                          {
                            str = props[j].value.value;
                            break;
                          }
                        }
                        break;

                      case 'Literal':
                        if (typeof node.elements[i].value === 'string') str = node.elements[i].value;
                        break;
                    }
                  }

                  v2.push("'" + str + "'");
                }

                return v2;
              }
            }
          };

          return v;
        }
      }

      //TODO
      // list_column
      // list_columns
    ];

    FormEditor.RegisterPropertyType(list_types);
  },

  //OnControlDesignInfo: function(def, c, ref) {},

  OnInit: function()
  {
    if(!ngDESIGNINFO) return;

    ngRegisterControlDesignInfo('ngList',function(d,c,ref) {
      return {
        ControlCategory: 'Lists',
        BaseControl: 'ngList',
        NewControl: {
          Default: {
            Properties: {
              "W": { Value: 120 },
              "H": { Value: 180 },
              Data: {
                ObjectProperties: {
                  "Items": { Type: 'ngListItems',
                    ObjectProperties: {
                      0: {
                        Type: 'ngListItem',
                        Value: {
                          Text: "'Item 1'"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        Properties: ng_DIProperties({
          // TODO - define all properties
          "Data": {
            "Items": { DefaultType: 'ngListItems', Level: 'basic',
              Collapsed: true,
              Types: {
                'ngListStringItems': {}
              }
            }
          }
        })
      };
    });
  }
};