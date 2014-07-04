module.exports = function(grunt) {

  var packageJSON = grunt.file.readJSON('package.json');
  
  grunt.file.write('VERSION',packageJSON.version); // Update VERSION file
  
  var files = {
    loader: [
        'src/loader/libs.js',
        'src/loader/loader.js',
        'src/loader/devices.js'
    ],
    
    controlsjs: [
        'src/ng_basic/*.js',
        'src/ng_controls/*.js',
        'libs/lib_json2/*.js'
    ],

    controlsjsvm: [
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
    var ver='';
    if((typeof packageJSON === 'object')&&(typeof packageJSON.version !== 'undefined')) ver=packageJSON.version+'/';
    return 'build/release/'+ver+(typeof path === 'undefined' ? '' : path);
  }

  function debugBuild(path)
  {
    var ver='';
    if((typeof packageJSON === 'object')&&(typeof packageJSON.version !== 'undefined')) ver=packageJSON.version+'/';
    return 'build/debug/'+ver+(typeof path === 'undefined' ? '' : path);
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
      ng_winxp: {
        expand: true, 
        cwd:  'src/ng_winxp/', 
        src: ['*.css','*.png','*.gif'],
        dest: releaseBuild('libs/ng_winxp/')
      },
      ng_wineight: {
        expand: true, 
        cwd:  'src/ng_wineight/', 
        src: ['*.css','img/**'],
        dest: releaseBuild('libs/ng_wineight/')
      },
      ng_wireframe: {
        expand: true, 
        cwd:  'src/ng_wireframe/', 
        src: ['*.css','images/**'],
        dest: releaseBuild('libs/ng_wireframe/')
      },
      ng_basic: {
        expand: true, 
        cwd:  'src/ng_basic/', 
        src:  'empty.gif',
        dest: releaseBuild('libs/ng_basic/')
      },
      ng_controls: {
        expand: true, 
        cwd:  'src/ng_controls/', 
        src:  'images/**',
        dest: releaseBuild('libs/ng_controls/')
      },
      ng_winxp_debug: {
        expand: true, 
        cwd:  'src/ng_winxp/', 
        src: ['*.css','*.png','*.gif'],
        dest: debugBuild('libs/ng_winxp/')
      },
      ng_wineight_debug: {
        expand: true, 
        cwd:  'src/ng_wineight/', 
        src: ['*.css','img/**'],
        dest: debugBuild('libs/ng_wineight/')
      },
      ng_wireframe_debug: {
        expand: true, 
        cwd:  'src/ng_wireframe/', 
        src: ['*.css','images/**'],
        dest: debugBuild('libs/ng_wireframe/')
      },
      ng_basic_debug: {
        expand: true, 
        cwd:  'src/ng_basic/', 
        src:  'empty.gif',
        dest: debugBuild('libs/ng_basic/')
      },
      ng_controls_debug: {
        expand: true, 
        cwd:  'src/ng_controls/', 
        src:  'images/**',
        dest: debugBuild('libs/ng_controls/')
      }
    },

    concat: {
    
      // Loader
      loader: {
        src:   getFiles('loader'),
        dest:  debugBuild('loader.js')
      },
      loaderbar: {
        src:   getFiles('loader','src/loader/progress-bar.js'),
        dest:  debugBuild('loader-bar.js')
      },
      loaderpercent: {
        src:   getFiles('loader','src/loader/progress-percent.js'),
        dest:  debugBuild('loader-percent.js')
      },
      loaderimage: {
        src:   getFiles('loader','src/loader/progress-image.js'),
        dest:  debugBuild('loader-image.js')
      },

      // Libraries      
      lib_knockout: {
        src:   getFiles('lib_knockout'),        
        dest:  debugBuild('libs/lib_knockout/knockout.js')
      },          
      lib_hammerjs: {
        src:   getFiles('lib_hammerjs'),        
        dest:  debugBuild('libs/lib_hammerjs/hammer.js')
      },
      ng_winxp: {
        src:   getFiles('ng_winxp'),        
        dest:  debugBuild('libs/ng_winxp/winxp.js')
      },      
      ng_wineight: {
        src:   getFiles('ng_wineight'),        
        dest:  debugBuild('libs/ng_wineight/wineight.js')
      },      
      ng_wireframe: {
        src:   getFiles('ng_wireframe'),        
        dest:  debugBuild('libs/ng_wireframe/wireframe.js')
      },      
            
      // Controls.js
      controlsjs: {
        src:   getFiles('controlsjs'),
        dest:  debugBuild('controls-notouch.js')
      },
      controlsjsvm: {
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
      controlsjs_touch_release: {
        src:   [ releaseBuild('controls-notouch.js'), releaseBuild('libs/lib_hammerjs/hammer.js') ],
        dest:  releaseBuild('controls.js')
      },
      controlsjsvm_touch_release: {
        src:   [ releaseBuild('controls-vm-notouch.js'), releaseBuild('libs/lib_hammerjs/hammer.js'), releaseBuild('libs/lib_knockout/knockout.js') ],
        dest:  releaseBuild('controls-vm.js')
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
      
      // Libraries
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
      },      
      
      // Controls.js
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
      }
    },
    
    usebanner: {
    
      debug: {
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
      
      lib_knockout: {
        options: {
          position: 'top',
          banner: '<%= banner_knockout %>'
        },
        files: {
          src: [ releaseBuild('libs/lib_knockout/*.js'),
                 debugBuild('libs/lib_knockout/*.js')
               ]   
        }
      },
      lib_hammerjs: {
        options: {
          position: 'top',
          banner: '<%= banner_hammerjs %>'
        },
        files: {
          src: [ releaseBuild('libs/lib_hammerjs/*.js')/*,
                 debugBuild('libs/lib_hammerjs/*.js') // Sources already contains banner */
               ]   
        }
      },

      controlsjsvm: {
        options: {
          position: 'top',
          banner: '<%= banner_knockout %>'
        },
        files: {
          src: [ releaseBuild('controls-vm*.js'),
                 debugBuild('controls-vm*.js')
               ]   
        }
      },
      controlsjstouch: {
        options: {
          position: 'top',
          banner: '<%= banner_hammerjs %>'
        },
        files: {
          src: [ releaseBuild('controls.js'),
                 releaseBuild('controls-vm.js'),
                 debugBuild('controls.js'),  
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
          src: [ releaseBuild('*.js'),
                 releaseBuild('libs/ng_winxp/*.{js,css}'),
                 releaseBuild('libs/ng_wineight/*.{js,css}'),
                 releaseBuild('libs/ng_wireframe/*.{js,css}'),
                 debugBuild('*.js'),
                 debugBuild('libs/ng_winxp/*.{js,css}'),
                 debugBuild('libs/ng_wineight/*.{js,css}'),
                 debugBuild('libs/ng_wireframe/*.{js,css}'),
               ]   
        }
      }
    },
    
    clean: [ releaseBuild('libs/lib_knockout/'), releaseBuild('libs/lib_hammerjs/'),
             debugBuild('libs/lib_knockout/'), debugBuild('libs/lib_hammerjs/') ]
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-closure-compiler');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['closure-compiler','copy','concat','usebanner','clean']);

};