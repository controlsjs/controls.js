module.exports = function(grunt) {

  // ** Languages **************************************************************

  var lang='*';
  //var lang='{en,cs}';
  //var lang='en';

  // ** Default Build **********************************************************

  //var defaultBuild = 'controls';
  //var defaultBuild = 'controls-vm';
  var defaultBuild = 'controls+vm';
  //var defaultBuild = 'controls-notouch';
  //var defaultBuild = 'controls-vm-notouch';
  //var defaultBuild = 'controls-noui';
  //var defaultBuild = 'controls-vm-noui';

  // ---------------------------------------------------------------------------

  var packageJSON = grunt.file.readJSON('package.json');
  
  grunt.file.write('VERSION',packageJSON.version); // Update VERSION file

  var config = {
    pkg: packageJSON,

    banner: grunt.file.read('src/srcheader.txt'),

    copy: {},
    concat: {},
    closurecompiler: {},
    cssmin: {},
    usebanner: {},
    clean: {
      debug: [ debugBuild() ],
      release: [ releaseBuild() ]
    }
  };

  var files = {
    libs: [ 'src/loader/libs.js' ]
  };
  
  function getFiles(t)
  {
    var f,i,ret=[];
    if(typeof t==='object') {
      for(var j in t) {
        f=files[t[j]];
        if(typeof f==='function') f=f();
        for(i=0;i<f.length;i++) ret.push(f[i]);
      }
    }
    else {
      f=files[t];
      if(typeof f==='function') f=f();
      for(i=0;i<f.length;i++) ret.push(f[i]);
    }
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

  function compilerfiles(dest,files) {
    var files=getFiles(files);
    for(var i=2;i<arguments.length;i++) files.push(arguments[i]);
    var f={};
    f[releaseBuild(dest)]=files;
    return f;
  }

  function registerConfig(taskid,actions) {
    for(var i in actions) config[i][taskid]=actions[i];
  }

  function registerTask(taskid,actions,noregister) {
    var actlist=[];
    for(var i in actions) {
      if(actions[i]!==true) {
        config[i][taskid]=actions[i];
        actlist.push(i+':'+taskid);
      }
      else actlist.push(i);
    }
    if(!noregister) grunt.registerTask(taskid, actlist);
    return actlist;
  }

  function defaultBanner(src,debug,banner)
  {
    if(typeof src==='string') src=[src];
    if(debug) {
      for(var i in src) src[i]=debugBuild(src[i]);
    }
    else {
      for(var i in src) src[i]=releaseBuild(src[i]);
    }
    if(typeof banner==='undefined') banner='banner';
    return {
      options: {
        position: 'top',
        banner: '<%= '+banner+' %>'
      },
      files: {
        src: src
      }
    };
  };

  function debugBanner(src,banner) { return defaultBanner(src,true,banner); }
  function releaseBanner(src,banner) { return defaultBanner(src,false,banner); }

  function enableDebugBanner(file) {
    var b=debugBanner(file);
    b.options.banner+='\n// Debug ENABLED\nvar ngDEBUG=1;\n\n';
    return b;
  }

  // == Controls.js Design Info ================================================

  files['controlsjs_di'] = [
    'src/ng_controls/designinfo/*.js'
  ];

  files['controlsjs_ui_di'] = [
    'src/ng_controls/ui/designinfo/*.js'
  ];

  files['controlsjs_vm_di'] = [
      'src/ng_controls/designinfo/*.js',
      'src/ng_controls/viewmodel/designinfo/*.js'
  ];

  files['controlsjs_ui_vm_di'] = [
      'src/ng_controls/viewmodel/ui/designinfo/*.js'
  ];

  function controlsDI(files) {
    return {
      clean: [ debugBuild('libs/ng_controls/designinfo/controls_di.js') ],
      concat: {
        src:   getFiles(files),
        dest:  debugBuild('libs/ng_controls/designinfo/controls_di.js')
      },
      usebanner: debugBanner('libs/ng_controls/designinfo/controls_di.js')
    };
  }

  registerTask('controls-di', controlsDI('controlsjs_di'));

  registerTask('controls-vm-di', controlsDI(['controlsjs_di','controlsjs_vm_di']));

  registerTask('controls-ui-di', controlsDI(['controlsjs_di','controlsjs_ui_di']));

  registerTask('controls-ui-vm-di', controlsDI(['controlsjs_di','controlsjs_vm_di','controlsjs_ui_di','controlsjs_ui_vm_di']));

  // == Controls.js ============================================================

  files['controlsjs'] = [
    'src/ng_basic/lang/'+lang+'/*.js',
    'src/ng_basic/*.js',
    'src/ng_controls/*.js',
    'src/ng_controls/settings/*.js',
    'libs/lib_json2/*.js'
  ];

  files['controlsjs_vm'] = [
    'src/ng_controls/viewmodel/lang/'+lang+'/*.js',
    'src/ng_controls/viewmodel/*.js'
  ];

  files['controlsjs_ui'] = [
    'src/ng_controls/ui/lang/'+lang+'/*.js',
    'src/ng_controls/ui/*.js'
  ];

  files['controlsjs_ui_vm'] = [
    'src/ng_controls/viewmodel/ui/lang/'+lang+'/*.js',
    'src/ng_controls/viewmodel/ui/*.js'
  ];

  // -- Controls.js debug ------------------------------------------------------

  registerConfig('ng_basic-img-debug', {
    copy: {
      expand: true,
      cwd:  'src/ng_basic/',
      src:  'empty.gif',
      dest: debugBuild('libs/ng_basic/')
    }
  });

  registerConfig('ng_controls-img-debug', {
    copy: {
      expand: true,
      cwd:  'src/ng_controls/',
      src:  'images/**',
      dest: debugBuild('libs/ng_controls/')
    },
  });

  registerConfig('controls+vm-debug', {
    copy: {
      src:  debugBuild('controls.js'),
      dest: debugBuild('controls-vm.js')
    }
  });

  function controlsRAW(files) {
    return {
      clean: [ debugBuild('controls-raw.js') ],
      concat: {
        src:   getFiles(files),
        dest:  debugBuild('controls-raw.js')
      },
      usebanner: enableDebugBanner('controls-raw.js')
    };
  }

  registerTask('controls-raw-debug', controlsRAW('controlsjs'));

  registerTask('controls-vm-raw-debug', controlsRAW(['controlsjs','controlsjs_vm']));

  registerTask('controls-ui-raw-debug', controlsRAW(['controlsjs','controlsjs_ui']));

  registerTask('controls-ui-vm-raw-debug', controlsRAW(['controlsjs','controlsjs_vm','controlsjs_ui','controlsjs_ui_vm']));

  registerTask('controls-nolib-debug', {
    clean: [ debugBuild('controls.js') ],
    copy: {
      src:   debugBuild('controls-raw.js'),
      dest:  debugBuild('controls.js')
    },
    usebanner: enableDebugBanner('controls.js')
  });

  registerTask('controls-lib-ui-debug', {
    clean: [ debugBuild('controls.js') ],
    concat: {
      src:   [ debugBuild('controls-raw.js'),
               debugBuild('libs/lib_hammerjs/hammer.js')
             ],
      dest:  debugBuild('controls.js')
    },
    usebanner: enableDebugBanner('controls.js')
  });

  registerTask('controls-lib-vm-debug', {
    clean: [ debugBuild('controls.js') ],
    concat: {
      src:   [ debugBuild('controls-raw.js'),
               debugBuild('libs/lib_knockout/knockout.js')
             ],
      dest:  debugBuild('controls.js')
    },
    usebanner: enableDebugBanner('controls.js')
  });

  registerTask('controls-lib-ui-vm-debug', {
    clean: [ debugBuild('controls.js') ],
    concat: {
      src:   [ debugBuild('controls-raw.js'),
               debugBuild('libs/lib_hammerjs/hammer.js'),
               debugBuild('libs/lib_knockout/knockout.js')
             ],
      dest:  debugBuild('controls.js')
    },
    usebanner: enableDebugBanner('controls.js')
  });

  registerTask('controls-prepare-debug', {
    clean: [ debugBuild('libs.js'),
             debugBuild('libs/ng_basic/'),
             debugBuild('libs/ng_controls/'),
             debugBuild('controls-raw.js'),
             debugBuild('controls.js')
           ],
    copy: {
      src:   getFiles('libs'),
      dest:  debugBuild('libs.js')
    },
    'copy:ng_basic-img-debug': true,
    'copy:ng_controls-img-debug': true,
  });

  registerTask('controls-finalize-debug', {
    clean: [ debugBuild('controls-raw.js') ],
    'clean:lib_knockout-debug': true,
    'clean:lib_hammerjs-debug': true
  });

  grunt.registerTask('controls-debug', [
    'lib_hammerjs-debug',
    'controls-prepare-debug',
    'concat:controls-ui-raw-debug',
    'controls-lib-ui-debug',
    'controls-finalize-debug',
    'controls-di'
  ]);

  grunt.registerTask('controls-vm-debug', [
    'lib_hammerjs-debug',
    'lib_knockout-debug',
    'controls-prepare-debug',
    'concat:controls-ui-vm-raw-debug',
    'controls-lib-ui-vm-debug',
    'controls-finalize-debug',
    'controls-ui-vm-di'
  ]);

  grunt.registerTask('controls+vm-debug', [
    'lib_hammerjs-debug',
    'lib_knockout-debug',
    'controls-prepare-debug',

    'concat:controls-ui-vm-raw-debug',
    'controls-lib-ui-vm-debug',
    'copy:controls+vm-debug',
    'clean:controls-ui-vm-raw-debug',

    'concat:controls-ui-raw-debug',
    'controls-lib-ui-debug',

    'controls-finalize-debug',
    'controls-ui-vm-di'
  ]);

  grunt.registerTask('controls-notouch-debug', [
    'controls-prepare-debug',
    'concat:controls-ui-raw-debug',
    'controls-nolib-debug',
    'controls-finalize-debug',
    'controls-ui-di'
  ]);

  grunt.registerTask('controls-vm-notouch-debug', [
    'lib_knockout-debug',
    'controls-prepare-debug',
    'concat:controls-ui-vm-raw-debug',
    'controls-lib-vm-debug',
    'controls-finalize-debug',
    'controls-ui-vm-di'
  ]);

  grunt.registerTask('controls-noui-debug', [
    'controls-prepare-debug',
    'concat:controls-raw-debug',
    'controls-nolib-debug',
    'controls-finalize-debug',
    'controls-di'
  ]);

  grunt.registerTask('controls-vm-noui-debug', [
    'lib_knockout-debug',
    'controls-prepare-debug',
    'concat:controls-vm-raw-debug',
    'controls-lib-vm-debug',
    'controls-finalize-debug',
    'controls-vm-di'
  ]);

  // -- Controls.js release ----------------------------------------------------

  registerConfig('ng_basic-img-release', {
    copy: {
      expand: true,
      cwd:  'src/ng_basic/',
      src:  'empty.gif',
      dest: releaseBuild('libs/ng_basic/')
    }
  });

  registerConfig('ng_controls-img-release', {
    copy: {
      expand: true,
      cwd:  'src/ng_controls/',
      src:  'images/**',
      dest: releaseBuild('libs/ng_controls/')
    },
  });

  registerConfig('controls+vm-release', {
    copy: {
      src:  releaseBuild('controls.js'),
      dest: releaseBuild('controls-vm.js')
    }
  });

  function controlsRAWRelease(files) {
    return {
      clean: [ releaseBuild('controls-raw.js') ],
      closurecompiler: {
        files: compilerfiles('controls-raw.js',files),
        options: {
          compilation_level: 'SIMPLE_OPTIMIZATIONS'
        }
      },
      usebanner: releaseBanner('controls-raw.js')
    };
  }

  registerTask('controls-raw-release', controlsRAWRelease('controlsjs'));

  registerTask('controls-vm-raw-release', controlsRAWRelease(['controlsjs','controlsjs_vm']));

  registerTask('controls-ui-raw-release', controlsRAWRelease(['controlsjs','controlsjs_ui']));

  registerTask('controls-ui-vm-raw-release', controlsRAWRelease(['controlsjs','controlsjs_vm','controlsjs_ui','controlsjs_ui_vm']));

  registerTask('controls-nolib-release', {
    clean: [ releaseBuild('controls.js') ],
    copy: {
      src:   releaseBuild('controls-raw.js'),
      dest:  releaseBuild('controls.js')
    },
    usebanner: releaseBanner('controls.js')
  });

  registerTask('controls-lib-ui-release', {
    clean: [ releaseBuild('controls.js') ],
    concat: {
      src:   [ releaseBuild('controls-raw.js'),
               releaseBuild('libs/lib_hammerjs/hammer.js')
             ],
      dest:  releaseBuild('controls.js')
    },
    usebanner: releaseBanner('controls.js')
  });

  registerTask('controls-lib-vm-release', {
    clean: [ releaseBuild('controls.js') ],
    concat: {
      src:   [ releaseBuild('controls-raw.js'),
               releaseBuild('libs/lib_knockout/knockout.js')
             ],
      dest:  releaseBuild('controls.js')
    },
    usebanner: releaseBanner('controls.js')
  });

  registerTask('controls-lib-ui-vm-release', {
    clean: [ releaseBuild('controls.js') ],
    concat: {
      src:   [ releaseBuild('controls-raw.js'),
               releaseBuild('libs/lib_hammerjs/hammer.js'),
               releaseBuild('libs/lib_knockout/knockout.js')
             ],
      dest:  releaseBuild('controls.js')
    },
    usebanner: releaseBanner('controls.js')
  });


  registerTask('controls-prepare-release', {
    clean: [ releaseBuild('libs.js'),
             releaseBuild('libs/ng_basic/'),
             releaseBuild('libs/ng_controls/'),
             releaseBuild('controls-raw.js'),
             releaseBuild('controls.js')
           ],
    closurecompiler: {
      files: compilerfiles('libs.js','libs'),
      options: {
        compilation_level: 'SIMPLE_OPTIMIZATIONS'
      }
    },
    'copy:ng_basic-img-release': true,
    'copy:ng_controls-img-release': true,
  });

  registerTask('controls-finalize-release', {
    clean: [ releaseBuild('controls-raw.js') ],
    'clean:lib_knockout-release': true,
    'clean:lib_hammerjs-release': true
  });

  grunt.registerTask('controls-release', [
    'lib_hammerjs-release',
    'controls-prepare-release',
    'closurecompiler:controls-ui-raw-release',
    'controls-lib-ui-release',
    'controls-finalize-release'
  ]);

  grunt.registerTask('controls-vm-release', [
    'lib_hammerjs-release',
    'lib_knockout-release',
    'controls-prepare-release',
    'closurecompiler:controls-ui-vm-raw-release',
    'controls-lib-ui-vm-release',
    'controls-finalize-release'
  ]);

  grunt.registerTask('controls+vm-release', [
    'lib_hammerjs-release',
    'lib_knockout-release',
    'controls-prepare-release',

    'closurecompiler:controls-ui-vm-raw-release',
    'controls-lib-ui-vm-release',
    'copy:controls+vm-release',
    'clean:controls-ui-vm-raw-release',

    'closurecompiler:controls-ui-raw-release',
    'controls-lib-ui-release',

    'controls-finalize-release',
    'controls-ui-vm-di'
  ]);

  grunt.registerTask('controls-notouch-release', [
    'controls-prepare-release',
    'closurecompiler:controls-ui-raw-release',
    'controls-nolib-release',
    'controls-finalize-release'
  ]);

  grunt.registerTask('controls-vm-notouch-release', [
    'lib_knockout-release',
    'controls-prepare-release',
    'closurecompiler:controls-ui-vm-raw-release',
    'controls-lib-vm-release',
    'controls-finalize-release'
  ]);

  grunt.registerTask('controls-noui-release', [
    'controls-prepare-release',
    'closurecompiler:controls-raw-release',
    'controls-nolib-release',
    'controls-finalize-release'
  ]);

  grunt.registerTask('controls-vm-noui-release', [
    'lib_knockout-release',
    'controls-prepare-release',
    'closurecompiler:controls-vm-raw-release',
    'controls-lib-vm-release',
    'controls-finalize-release'
  ]);

  // == Library: Hammer.js =====================================================

  files['lib_hammerjs'] = [
    'libs/lib_hammerjs/hammer.js'
  ];

  config.banner_hammerjs =
  '/*! Hammer.JS - v<%= pkg.lib_hammerjs.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
  ' * <%= pkg.lib_hammerjs.homepage %>\n' +
  ' *\n' +
  ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.lib_hammerjs.author.name %> <<%= pkg.lib_hammerjs.author.email %>>;\n' +
  ' * Licensed under the <%= _.pluck(pkg.lib_hammerjs.licenses, "type").join(", ") %> license */\n\n';

  registerTask('lib_hammerjs-debug', {
    clean: [ debugBuild('libs/lib_hammerjs/') ],
    concat: {
      src:   getFiles('lib_hammerjs'),
      dest:  debugBuild('libs/lib_hammerjs/hammer.js')
    }
  });

  registerTask('lib_hammerjs-release', {
    clean: [ releaseBuild('libs/lib_hammerjs/') ],
    closurecompiler: {
      files: compilerfiles('libs/lib_hammerjs/hammer.js','lib_hammerjs'),
      options: {
        compilation_level: 'SIMPLE_OPTIMIZATIONS'
      }
    },
    usebanner: releaseBanner('libs/lib_hammerjs/*.js','banner_hammerjs')
  });

  // == Library: Knockout.js ===================================================

  files['lib_knockout'] = [
    'libs/lib_knockout/src/namespace.js',
    'libs/lib_knockout/src/google-closure-compiler-utils.js',
    'libs/lib_knockout/src/version.js',
    'libs/lib_knockout/src/options.js',
    'libs/lib_knockout/src/tasks.js',
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
  ];

  config.banner_knockout =
  '/*!\n' +
  ' * Knockout JavaScript library v<%= pkg.lib_knockout.version %>\n' +
  ' * (c) Steven Sanderson - <%= pkg.lib_knockout.homepage %>\n' +
  ' * License: <%= pkg.lib_knockout.licenses[0].type %> (<%= pkg.lib_knockout.licenses[0].url %>)\n' +
  ' */\n\n';

  registerTask('lib_knockout-debug', {
    clean: [ debugBuild('libs/lib_knockout/') ],
    concat: {
      src:   getFiles('lib_knockout'),
      dest:  debugBuild('libs/lib_knockout/knockout.js')
    },
    usebanner: debugBanner('libs/lib_knockout/*.js', 'banner_knockout')
  });

  registerTask('lib_knockout-release', {
    clean: [ releaseBuild('libs/lib_knockout/') ],
    closurecompiler: {
      files: compilerfiles('libs/lib_knockout/knockout.js','lib_knockout'),
      options: {
        compilation_level: 'SIMPLE_OPTIMIZATIONS'
      }
    },
    usebanner: releaseBanner('libs/lib_knockout/*.js', 'banner_knockout')
  });

  // == Loaders ================================================================

  files['loader'] = [
    'src/loader/libs.js',
    'src/loader/loader.js',
    'src/loader/devices.js'
  ];

  registerTask('loader-debug', {
    clean: [ debugBuild('loader.js') ],
    concat: {
      src:   getFiles('loader'),
      dest:  debugBuild('loader.js')
    },
    usebanner: enableDebugBanner('loader.js')
  });

  registerTask('loader-release', {
    clean: [ releaseBuild('loader.js') ],
    closurecompiler: {
      files: compilerfiles('loader.js','loader'),
      options: {
        compilation_level: 'SIMPLE_OPTIMIZATIONS'
      }
    },
    usebanner: releaseBanner('loader.js')
  });

  registerTask('loaderbar-debug', {
    clean: [ debugBuild('loader-bar.js') ],
    concat: {
      src:   getFiles('loader','src/loader/progress-bar.js'),
      dest:  debugBuild('loader-bar.js')
    },
    usebanner: enableDebugBanner('loader-bar.js')
  });

  registerTask('loaderbar-release', {
    clean: [ releaseBuild('loader-bar.js') ],
    closurecompiler: {
      files: compilerfiles('loader-bar.js','loader','src/loader/progress-bar.js'),
      options: {
        compilation_level: 'SIMPLE_OPTIMIZATIONS'
      }
    },
    usebanner: releaseBanner('loader-bar.js')
  });

  registerTask('loaderpercent-debug', {
    clean: [ debugBuild('loader-percent.js') ],
    concat: {
      src:   getFiles('loader','src/loader/progress-percent.js'),
      dest:  debugBuild('loader-percent.js')
    },
    usebanner: enableDebugBanner('loader-percent.js')
  });

  registerTask('loaderpercent-release', {
    clean: [ releaseBuild('loader-percent.js') ],
    closurecompiler: {
      files: compilerfiles('loader-percent.js','loader','src/loader/progress-percent.js'),
      options: {
        compilation_level: 'SIMPLE_OPTIMIZATIONS'
      }
    },
    usebanner: releaseBanner('loader-percent.js')
  });

  registerTask('loaderimage-debug', {
    clean: [ debugBuild('loader-image.js') ],
    concat: {
      src:   getFiles('loader','src/loader/progress-image.js'),
      dest:  debugBuild('loader-image.js')
    },
    usebanner: enableDebugBanner('loader-image.js')
  });

  registerTask('loaderimage-release', {
    clean: [ releaseBuild('loader-image.js') ],
    closurecompiler: {
      files: compilerfiles('loader-image.js','loader','src/loader/progress-image.js'),
      options: {
        compilation_level: 'SIMPLE_OPTIMIZATIONS'
      }
    },
    usebanner: releaseBanner('loader-image.js')
  });

  grunt.registerTask('loaders-debug', [
    'loader-debug',
    'loaderbar-debug',
    'loaderpercent-debug',
    'loaderimage-debug',
  ]);

  grunt.registerTask('clean-loaders-debug', [
    'clean:loader-debug',
    'clean:loaderbar-debug',
    'clean:loaderpercent-debug',
    'clean:loaderimage-debug',
  ]);

  grunt.registerTask('loaders-release', [
    'loader-release',
    'loaderbar-release',
    'loaderpercent-release',
    'loaderimage-release'
  ]);

  grunt.registerTask('clean-loaders-release', [
    'clean:loader-release',
    'clean:loaderbar-release',
    'clean:loaderpercent-release',
    'clean:loaderimage-release'
  ]);

  grunt.registerTask('clean-loaders', [
    'clean-loaders-debug',
    'clean-loaders-release'
  ]);

  // == WinEight Skin ==========================================================

  files['ng_wineight'] = [
    'src/ng_wineight/*.js'
  ];

  files['ng_wineight_di'] = [
    'src/ng_wineight/designinfo/*.js'
  ];

  registerTask('ng_wineight-di', {
    clean: [ debugBuild('libs/ng_wineight/designinfo/wineight_di.js') ],
    concat: {
      src:   getFiles('ng_wineight_di'),
      dest:  debugBuild('libs/ng_wineight/designinfo/wineight_di.js')
    },
    usebanner: debugBanner('libs/ng_wineight/designinfo/wineight_di.js')
  })

  registerTask('ng_wineight-debug', {
    clean: [ debugBuild('libs/ng_wineight/') ],
    concat: {
      src:   getFiles('ng_wineight'),
      dest:  debugBuild('libs/ng_wineight/wineight.js')
    },
    copy: {
      expand: true,
      cwd:  'src/ng_wineight/',
      src: ['*.css','img/**'],
      dest: debugBuild('libs/ng_wineight/')
    },
    usebanner: debugBanner('libs/ng_wineight/*.{js,css}'),
    'ng_wineight-di': true
  });

  registerTask('ng_wineight-release', {
    clean: [ releaseBuild('libs/ng_wineight/') ],
    closurecompiler: {
      files: compilerfiles('libs/ng_wineight/wineight.js','ng_wineight'),
      options: {
        compilation_level: 'SIMPLE_OPTIMIZATIONS'
      }
    },
    copy: {
      expand: true,
      cwd:  'src/ng_wineight/',
      src: ['img/**'],
      dest: releaseBuild('libs/ng_wineight/')
    },
    cssmin: {
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
    usebanner: releaseBanner('libs/ng_wineight/*.{js,css}')
  });

  // == WinXP Skin =============================================================

  files['ng_winxp'] = [
    'src/ng_winxp/*.js'
  ];

  files['ng_winxp_di'] = [
    'src/ng_winxp/designinfo/*.js'
  ];

  registerTask('ng_winxp-di', {
    clean: [ debugBuild('libs/ng_winxp/designinfo/winxp_di.js') ],
    concat: {
      src:   getFiles('ng_winxp_di'),
      dest:  debugBuild('libs/ng_winxp/designinfo/winxp_di.js')
    },
    usebanner: debugBanner('libs/ng_winxp/designinfo/winxp_di.js')
  })

  registerTask('ng_winxp-debug', {
    clean: [ debugBuild('libs/ng_winxp/') ],
    concat: {
      src:   getFiles('ng_winxp'),
      dest:  debugBuild('libs/ng_winxp/winxp.js')
    },
    copy: {
      expand: true,
      cwd:  'src/ng_winxp/',
      src: ['*.css','*.png','*.gif'],
      dest: debugBuild('libs/ng_winxp/')
    },
    usebanner: debugBanner('libs/ng_winxp/*.{js,css}'),
    'ng_winxp-di': true
  });

  registerTask('ng_winxp-release', {
    clean: [ releaseBuild('libs/ng_winxp/') ],
    closurecompiler: {
      files: compilerfiles('libs/ng_winxp/winxp.js','ng_winxp'),
      options: {
        compilation_level: 'SIMPLE_OPTIMIZATIONS'
      }
    },
    copy: {
      expand: true,
      cwd:  'src/ng_winxp/',
      src: ['*.png','*.gif'],
      dest: releaseBuild('libs/ng_winxp/')
    },
    cssmin: {
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
    usebanner: releaseBanner('libs/ng_winxp/*.{js,css}')
  });

  // == Wireframe Skin =========================================================

  files['ng_wireframe'] = [
    'src/ng_wireframe/*.js'
  ];

  files['ng_wireframe_di'] = [
    'src/ng_wireframe/designinfo/*.js'
  ];

  registerTask('ng_wireframe-di', {
    clean: [ debugBuild('libs/ng_wireframe/designinfo/wireframe_di.js') ],
    concat: {
      src:   getFiles('ng_wireframe_di'),
      dest:  debugBuild('libs/ng_wireframe/designinfo/wireframe_di.js')
    },
    usebanner: debugBanner('libs/ng_wireframe/designinfo/wireframe_di.js')
  })

  registerTask('ng_wireframe-debug', {
    clean: [ debugBuild('libs/ng_wireframe/') ],
    concat: {
      src:   getFiles('ng_wireframe'),
      dest:  debugBuild('libs/ng_wireframe/wireframe.js')
    },
    copy: {
      expand: true,
      cwd:  'src/ng_wireframe/',
      src: ['*.css','images/**'],
      dest: debugBuild('libs/ng_wireframe/')
    },
    usebanner: debugBanner('libs/ng_wireframe/*.{js,css}'),
    'ng_wireframe-di': true
  });

  registerTask('ng_wireframe-release', {
    clean: [ releaseBuild('libs/ng_wireframe/') ],
    closurecompiler: {
      files: compilerfiles('libs/ng_wireframe/wireframe.js','ng_wireframe'),
      options: {
        compilation_level: 'SIMPLE_OPTIMIZATIONS'
      }
    },
    copy: {
      expand: true,
      cwd:  'src/ng_wireframe/',
      src: ['images/**'],
      dest: releaseBuild('libs/ng_wireframe/')
    },
    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      files: [{
        expand: true,
        cwd:  'src/ng_wireframe/',
        src: ['wireframe.css'],
        dest: releaseBuild('libs/ng_wireframe/'),
      }]
    },
    usebanner: releaseBanner('libs/ng_wireframe/*.{js,css}')
  });

  // == Skins ==================================================================

  grunt.registerTask('skins-debug', [
    'ng_winxp-debug',
    'ng_wineight-debug',
    'ng_wireframe-debug'
  ]);

  grunt.registerTask('clean-skins-debug', [
    'clean:ng_winxp-debug',
    'clean:ng_wineight-debug',
    'clean:ng_wireframe-debug'
  ]);

  grunt.registerTask('skins-release', [
    'ng_winxp-release',
    'ng_wineight-release',
    'ng_wireframe-release'
  ]);

  grunt.registerTask('clean-skins-release', [
    'clean:ng_winxp-release',
    'clean:ng_wineight-release',
    'clean:ng_wireframe-release'
  ]);

  grunt.registerTask('clean-skins', [
    'clean-skins-debug',
    'clean-skins-release'
  ]);

  // == Builds =================================================================

  grunt.registerTask('clean-all', [
    'clean:debug',
    'clean:release'
  ]);

  grunt.registerTask('clean-debug', [
    'clean:debug'
  ]);

  grunt.registerTask('clean-release', [
    'clean:release'
  ]);

  grunt.registerTask('debug', [
    'clean-debug',
    'loaders-debug',
    defaultBuild+'-debug',
    'skins-debug'
  ]);

  grunt.registerTask('release', [
    'clean-release',
    'loaders-release',
    defaultBuild+'-release',
    'skins-release'
  ]);

  grunt.registerTask('default', ['debug','release']);

  // ---------------------------------------------------------------------------

  grunt.initConfig(config);

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-closurecompiler');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

};