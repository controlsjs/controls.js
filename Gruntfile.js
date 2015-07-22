module.exports = function(grunt) {

  var packageJSON = grunt.file.readJSON('package.json');
  
  grunt.file.write('VERSION',packageJSON.version); // Update VERSION file
  
  var files = {
    libs: [
        'src/loader/libs.js'
    ],

    loader: [
        'src/loader/libs.js',
        'src/loader/loader.js',
        'src/loader/devices.js'
    ],
    
    controlsjs: [
        'src/ng_basic/lang/*/*.js',
        'src/ng_controls/lang/*/*.js',

        'src/ng_basic/*.js',
        'src/ng_controls/*.js',
        'libs/lib_json2/*.js'
    ],

    controlsjsvm: [
        'src/ng_basic/lang/*/*.js',
        'src/ng_controls/lang/*/*.js',
        'src/ng_controls/viewmodel/lang/*/*.js',

        'src/ng_basic/*.js',
        'src/ng_controls/*.js',
        'src/ng_controls/viewmodel/*.js',
        'libs/lib_json2/*.js'
    ],

    ng_winxp: [
        'src/ng_winxp/*.js'
    ],

    ng_wineight: [
        'src/ng_wineight/*.js'
    ],
    ng_wireframe: [
        'src/ng_wireframe/*.js'
    ],

    lib_knockout: [
        'libs/lib_knockout/src/namespace.js',
        'libs/lib_knockout/src/google-closure-compiler-utils.js',
        'libs/lib_knockout/src/version.js',
        'libs/lib_knockout/src/utils.js',
        'libs/lib_knockout/src/utils.domData.js',
        'libs/lib_knockout/src/subscribables/extenders.js',
        'libs/lib_knockout/src/subscribables/subscribable.js',
        'libs/lib_knockout/src/subscribables/dependencyDetection.js',
        'libs/lib_knockout/src/subscribables/observable.js',
        'libs/lib_knockout/src/subscribables/observableArray.js',
        'libs/lib_knockout/src/subscribables/observableArray.changeTracking.js',
        'libs/lib_knockout/src/subscribables/dependentObservable.js',
        'libs/lib_knockout/src/subscribables/mappingHelpers.js',
        'libs/lib_knockout/src/binding/bindingProvider.js',
        'libs/lib_knockout/src/binding/expressionRewriting.js',
        'libs/lib_knockout/src/binding/bindingAttributeSyntax.js',
    ],
    
    lib_hammerjs: [
        'libs/lib_hammerjs/hammer.js'
    ]

  };
  
  function getFiles(t)
  {
    var i,ret=[];
    var f=files[t];
    for(i=0;i<f.length;i++) ret.push(f[i]);
    for(i=1;i<arguments.length;i++) ret.push(arguments[i]);
    return ret;
  }  

  function releaseBuild(path)
  {
    return 'build/release/'+(typeof path === 'undefined' ? '' : path);
  }

  function debugBuild(path)
  {
    return 'build/debug/'+(typeof path === 'undefined' ? '' : path);
  }
  
  // Project configuration.
  grunt.initConfig({
    pkg: packageJSON,

    banner:          grunt.file.read('src/srcheader.txt'),
//                    '/* <%= pkg.title || pkg.name %> v<%= pkg.version %>\n' + 
//                     ' * Copyright (c) <%= pkg.releaseyear %> <%= pkg.author %>\n' +
//                     ' * All rights reserved.\n' +
//                     ' */\n',

    banner_hammerjs: '/*! Hammer.JS - v<%= pkg.lib_hammerjs.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                     '* <%= pkg.lib_hammerjs.homepage %>\n' +
                     '*\n' +
                     '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.lib_hammerjs.author.name %> <<%= pkg.lib_hammerjs.author.email %>>;\n' +
                     '* Licensed under the <%= _.pluck(pkg.lib_hammerjs.licenses, "type").join(", ") %> license */\n\n', 
     
    banner_knockout: '/*!\n' +
                     ' * Knockout JavaScript library v<%= pkg.lib_knockout.version %>\n' +
                     ' * (c) Steven Sanderson - <%= pkg.lib_knockout.homepage %>\n' +
                     ' * License: <%= pkg.lib_knockout.licenses[0].type %> (<%= pkg.lib_knockout.licenses[0].url %>)\n' +
                     ' */\n\n',
    
    copy: {
      ng_basic: {
        expand: true, 
        cwd:  'src/ng_basic/', 
        src:  'empty.gif',
        dest: releaseBuild('libs/ng_basic/')
      },
      ng_basic_debug: {
        expand: true,
        cwd:  'src/ng_basic/',
        src:  'empty.gif',
        dest: debugBuild('libs/ng_basic/')
      },
      ng_controls: {
        expand: true, 
        cwd:  'src/ng_controls/', 
        src:  'images/**',
        dest: releaseBuild('libs/ng_controls/')
      },
      ng_controls_debug: {
        expand: true,
        cwd:  'src/ng_controls/',
        src:  'images/**',
        dest: debugBuild('libs/ng_controls/')
      },
      ng_winxp: {
        expand: true,
        cwd:  'src/ng_winxp/',
        src: ['*.png','*.gif'],
        dest: releaseBuild('libs/ng_winxp/')
      },
      ng_winxp_debug: {
        expand: true,
        cwd:  'src/ng_winxp/',
        src: ['*.css','*.png','*.gif'],
        dest: debugBuild('libs/ng_winxp/')
      },
      ng_wineight: {
        expand: true,
        cwd:  'src/ng_wineight/',
        src: ['img/**'],
        dest: releaseBuild('libs/ng_wineight/')
      },
      ng_wineight_debug: {
        expand: true,
        cwd:  'src/ng_wineight/',
        src: ['*.css','img/**'],
        dest: debugBuild('libs/ng_wineight/')
      },
      ng_wireframe: {
        expand: true,
        cwd:  'src/ng_wireframe/',
        src: ['images/**'],
        dest: releaseBuild('libs/ng_wireframe/')
      },
      ng_wireframe_debug: {
        expand: true,
        cwd:  'src/ng_wireframe/',
        src: ['*.css','images/**'],
        dest: debugBuild('libs/ng_wireframe/')
      }
    },

    concat: {

      // Loader
      loader_debug: {
        src:   getFiles('loader'),
        dest:  debugBuild('loader.js')
      },
      loaderbar_debug: {
        src:   getFiles('loader','src/loader/progress-bar.js'),
        dest:  debugBuild('loader-bar.js')
      },
      loaderpercent_debug: {
        src:   getFiles('loader','src/loader/progress-percent.js'),
        dest:  debugBuild('loader-percent.js')
      },
      loaderimage_debug: {
        src:   getFiles('loader','src/loader/progress-image.js'),
        dest:  debugBuild('loader-image.js')
      },

      // Controls.js
      libs_debug: {
        src:   getFiles('libs'),
        dest:  debugBuild('libs.js')
      },

      lib_knockout_debug: {
        src:   getFiles('lib_knockout'),
        dest:  debugBuild('libs/lib_knockout/knockout.js')
      },
      lib_hammerjs_debug: {
        src:   getFiles('lib_hammerjs'),
        dest:  debugBuild('libs/lib_hammerjs/hammer.js')
      },

      controlsjs_debug: {
        src:   getFiles('controlsjs'),
        dest:  debugBuild('controls-notouch.js')
      },
      controlsjsvm_debug: {
        src:   getFiles('controlsjsvm'),
        dest:  debugBuild('controls-vm-notouch.js')
      },

      controlsjs_touch_debug: {
        src:   [ debugBuild('controls-notouch.js'), debugBuild('libs/lib_hammerjs/hammer.js') ],
        dest:  debugBuild('controls.js')
      },
      controlsjsvm_touch_debug: {
        src:   [ debugBuild('controls-vm-notouch.js'), debugBuild('libs/lib_hammerjs/hammer.js'), debugBuild('libs/lib_knockout/knockout.js') ],
        dest:  debugBuild('controls-vm.js')
      },
      controlsjs_touch: {
        src:   [ releaseBuild('controls-notouch.js'), releaseBuild('libs/lib_hammerjs/hammer.js') ],
        dest:  releaseBuild('controls.js')
      },
      controlsjsvm_touch: {
        src:   [ releaseBuild('controls-vm-notouch.js'), releaseBuild('libs/lib_hammerjs/hammer.js'), releaseBuild('libs/lib_knockout/knockout.js') ],
        dest:  releaseBuild('controls-vm.js')
      },

      // Libraries
      ng_winxp_debug: {
        src:   getFiles('ng_winxp'),
        dest:  debugBuild('libs/ng_winxp/winxp.js')
      },
      ng_wineight_debug: {
        src:   getFiles('ng_wineight'),
        dest:  debugBuild('libs/ng_wineight/wineight.js')
      },
      ng_wireframe_debug: {
        src:   getFiles('ng_wireframe'),
        dest:  debugBuild('libs/ng_wireframe/wireframe.js')
      }

    },
        
    'closure-compiler': {
      // Loader
      loader: {
        js:           getFiles('loader'),
        jsOutputFile: releaseBuild('loader.js'),
        noreport: true,
        options: {
            compilation_level: 'SIMPLE_OPTIMIZATIONS',
            warning_level:"DEFAULT"
        }
      },
      loaderbar: {
        js:           getFiles('loader','src/loader/progress-bar.js'),
        jsOutputFile: releaseBuild('loader-bar.js'),
        noreport: true,
        options: {
            compilation_level: 'SIMPLE_OPTIMIZATIONS',
            warning_level:"DEFAULT"
        }
      },
      loaderpercent: {
        js:           getFiles('loader','src/loader/progress-percent.js'),
        jsOutputFile: releaseBuild('loader-percent.js'),
        noreport: true,
        options: {
            compilation_level: 'SIMPLE_OPTIMIZATIONS',
            warning_level:"DEFAULT"
        }
      },
      loaderimage: {
        js:           getFiles('loader','src/loader/progress-image.js'),
        jsOutputFile: releaseBuild('loader-image.js'),
        noreport: true,
        options: {
            compilation_level: 'SIMPLE_OPTIMIZATIONS',
            warning_level:"DEFAULT"
        }
      },
      
      // Controls.js
      libs: {
        js:           getFiles('libs'),
        jsOutputFile: releaseBuild('libs.js'),
        noreport: true,
        options: {
            compilation_level: 'SIMPLE_OPTIMIZATIONS',
            warning_level:"DEFAULT"
        }
      },
      lib_knockout: {
        js:           getFiles('lib_knockout'),
        jsOutputFile: releaseBuild('libs/lib_knockout/knockout.js'),
        noreport: true,
        options: {
            compilation_level: 'SIMPLE_OPTIMIZATIONS',
            warning_level:"DEFAULT"
        }
      },
      lib_hammerjs: {
        js:           getFiles('lib_hammerjs'),
        jsOutputFile: releaseBuild('libs/lib_hammerjs/hammer.js'),
        noreport: true,
        options: {
            compilation_level: 'SIMPLE_OPTIMIZATIONS',
            warning_level:"DEFAULT"
        }
      },

      controlsjs: {
        js:           getFiles('controlsjs'),
        jsOutputFile: releaseBuild('controls-notouch.js'),
        noreport: true,
        options: {
            compilation_level: 'SIMPLE_OPTIMIZATIONS',
            warning_level:"DEFAULT"
        }
      },
      controlsjsvm: {
        js:           getFiles('controlsjsvm'),
        jsOutputFile: releaseBuild('controls-vm-notouch.js'),
        noreport: true,
        options: {
            compilation_level: 'SIMPLE_OPTIMIZATIONS',
            warning_level:"DEFAULT"
        }
      },

      // Libraries
      ng_winxp: {
        js:           getFiles('ng_winxp'),
        jsOutputFile: releaseBuild('libs/ng_winxp/winxp.js'),
        noreport: true,
        options: {
            compilation_level: 'SIMPLE_OPTIMIZATIONS',
            warning_level:"DEFAULT"
        }
      },
      ng_wineight: {
        js:           getFiles('ng_wineight'),
        jsOutputFile: releaseBuild('libs/ng_wineight/wineight.js'),
        noreport: true,
        options: {
            compilation_level: 'SIMPLE_OPTIMIZATIONS',
            warning_level:"DEFAULT"
        }
      },
      ng_wireframe: {
        js:           getFiles('ng_wireframe'),
        jsOutputFile: releaseBuild('libs/ng_wireframe/wireframe.js'),
        noreport: true,
        options: {
            compilation_level: 'SIMPLE_OPTIMIZATIONS',
            warning_level:"DEFAULT"
        }
      }

    },

    cssmin: {
      ng_winxp: {
        options: {
          keepSpecialComments: 0
        },
        files: [{
          expand: true,
          cwd:  'src/ng_winxp/',
          src: ['winxp.css'],
          dest: releaseBuild('libs/ng_winxp/'),
        }]
      },
      ng_wineight: {
        options: {
          keepSpecialComments: 0
        },
        files: [{
          expand: true,
          cwd:  'src/ng_wineight/',
          src: ['wineight.css'],
          dest: releaseBuild('libs/ng_wineight/'),
        }]
      },
      ng_wireframe: {
        options: {
          keepSpecialComments: 0
        },
        files: [{
          expand: true,
          cwd:  'src/ng_wireframe/',
          src: ['wireframe.css'],
          dest: releaseBuild('libs/ng_wireframe/'),
        }]
      }
    },
    
    usebanner: {
    
      lib_knockout_debug: {
        options: {
          position: 'top',
          banner: '<%= banner_knockout %>'
        },
        files: {
          src: [ debugBuild('libs/lib_knockout/*.js') ]
        }
      },
      lib_knockout: {
        options: {
          position: 'top',
          banner: '<%= banner_knockout %>'
        },
        files: {
          src: [ releaseBuild('libs/lib_knockout/*.js') ]
        }
      },
      lib_hammerjs: {
        options: {
          position: 'top',
          banner: '<%= banner_hammerjs %>'
        },
        files: {
          src: [ releaseBuild('libs/lib_hammerjs/*.js') ]
        }
      },

      controlsjs_enabledebug: {
        options: {
          position: 'top',
          banner: '// Debug ENABLED\nvar ngDEBUG=1;\n\n'
        },
        files: {
          src: [ debugBuild('loader*.js'),
                 debugBuild('controls*.js')
               ]
        }
      },
      controlsjs_debug: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [ debugBuild('*.js') ]
        }
      },
      controlsjstouch_debug: {
        options: {
          position: 'top',
          banner: '<%= banner_hammerjs %>'
        },
        files: {
          src: [ debugBuild('controls.js'),
                 debugBuild('controls-vm.js')
               ]
        }
      },

      controlsjs: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [ releaseBuild('*.js') ]
        }
      },
      controlsjstouch: {
        options: {
          position: 'top',
          banner: '<%= banner_hammerjs %>'
        },
        files: {
          src: [ releaseBuild('controls.js'),
                 releaseBuild('controls-vm.js')
               ]
        }
      },
      // Libraries
      ng_winxp: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [ releaseBuild('libs/ng_winxp/*.{js,css}') ]
        }
      },
      ng_winxp_debug: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [ debugBuild('libs/ng_winxp/*.{js,css}') ]
        }
      },
      ng_wineight: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [ releaseBuild('libs/ng_wineight/*.{js,css}') ]
        }
      },
      ng_wineight_debug: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [ debugBuild('libs/ng_wineight/*.{js,css}') ]
        }
      },
      ng_wireframe: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [ releaseBuild('libs/ng_wireframe/*.{js,css}') ]
        }
      },
      ng_wireframe_debug: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [ debugBuild('libs/ng_wireframe/*.{js,css}') ]
        }
      }

    },
    
    clean: {
      lib_knockout_debug: [ debugBuild('libs/lib_knockout/') ],
      lib_knockout:       [ releaseBuild('libs/lib_knockout/') ],
      lib_hammerjs_debug: [ debugBuild('libs/lib_hammerjs/') ],
      lib_hammerjs:       [ releaseBuild('libs/lib_hammerjs/') ]
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-closure-compiler');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).

  // controlsjs
  grunt.registerTask('controlsjs-debug', [
    'copy:ng_basic_debug',
    'copy:ng_controls_debug',

    'concat:loader_debug',
    'concat:loaderbar_debug',
    'concat:loaderpercent_debug',
    'concat:loaderimage_debug',
    'concat:libs_debug',
    'concat:lib_hammerjs_debug',
    'concat:lib_knockout_debug',
    'concat:controlsjs_debug',
    'concat:controlsjsvm_debug',
    'concat:controlsjs_touch_debug',
    'concat:controlsjsvm_touch_debug',

    'usebanner:lib_knockout_debug',
    'usebanner:controlsjs_enabledebug',
    'usebanner:controlsjs_debug',
    'usebanner:controlsjstouch_debug',

    'clean:lib_knockout_debug',
    'clean:lib_hammerjs_debug'
  ]);

  grunt.registerTask('controlsjs-release', [
    'closure-compiler:loader',
    'closure-compiler:loaderbar',
    'closure-compiler:loaderpercent',
    'closure-compiler:loaderimage',
    'closure-compiler:libs',
    'closure-compiler:lib_hammerjs',
    'closure-compiler:lib_knockout',
    'closure-compiler:controlsjs',
    'closure-compiler:controlsjsvm',
    'concat:controlsjs_touch',
    'concat:controlsjsvm_touch',

    'copy:ng_basic',
    'copy:ng_controls',

    'usebanner:lib_knockout',
    'usebanner:lib_hammerjs',
    'usebanner:controlsjs',
    'usebanner:controlsjstouch',

    'clean:lib_knockout',
    'clean:lib_hammerjs'
  ]);

  // ng_winxp
  grunt.registerTask('ng_winxp-debug', [
    'concat:ng_winxp_debug',
    'copy:ng_winxp_debug',
    'usebanner:ng_winxp_debug'
  ]);

  grunt.registerTask('ng_winxp-release', [
    'closure-compiler:ng_winxp',
    'copy:ng_winxp',
    'cssmin:ng_winxp',
    'usebanner:ng_winxp'
  ]);

  // ng_wineight
  grunt.registerTask('ng_wineight-debug', [
    'concat:ng_wineight_debug',
    'copy:ng_wineight_debug',
    'usebanner:ng_wineight_debug'
  ]);

  grunt.registerTask('ng_wineight-release', [
    'closure-compiler:ng_wineight',
    'copy:ng_wineight',
    'cssmin:ng_wineight',
    'usebanner:ng_wineight'
  ]);

  // ng_wireframe
  grunt.registerTask('ng_wireframe-debug', [
    'concat:ng_wireframe_debug',
    'copy:ng_wireframe_debug',
    'cssmin:ng_wireframe',
    'usebanner:ng_wireframe_debug'
  ]);

  grunt.registerTask('ng_wireframe-release', [
    'closure-compiler:ng_wireframe',
    'copy:ng_wireframe',
    'usebanner:ng_wireframe'
  ]);


  grunt.registerTask('debug', [
    'controlsjs-debug',
    'ng_winxp-debug',
    'ng_wineight-debug',
    'ng_wireframe-debug'
  ]);
  grunt.registerTask('release', [
    'controlsjs-release',
    'ng_winxp-release',
    'ng_wineight-release',
    'ng_wireframe-release'
  ]);

  grunt.registerTask('default', ['debug','release']);

};