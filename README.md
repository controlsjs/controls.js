Controls.js
===========

Controls.js is a technology for building desktop-like applications (SPA). 
Controls.js uses web technologies but gives the user the same feeling as standard 
desktop or native applications. Your applications will run almost anywhere thanks 
to the support of variety of browsers, ability to build native applications 
from JavaScript, and the propagation of web based Operating Systems.

- **Latest stable release:** [Download 5.0.0](http://controlsjs.com/#DOWNLOADS)
| [On-line Documentation](http://controlsjs.com/docs/5.0.0/)
- **Development snapshot:** [Download 5.0.x](https://github.com/controlsjs/test/archive/master.zip)

For more details, see Controls.js website:
http://controlsjs.com


### License

The Controls.js is available in two licensing options: commercial and open source 
license. 

You may use Controls.js free of charge under the open source license but you must 
comply with the terms of the license agreement (see [GPLv3 license](http://www.gnu.org/licenses/gpl-3.0.html)), which 
requires you to distribute your application also under open source license 
and that you release source code of application to the general public.

Please note that 3rd party libraries are licensed under its own licenses.    

The commercial license can be purchased at Controls.js website:
http://controlsjs.com/#DOWNLOADS


### Building from sources

The package already contains release and debug build in 'build\' directory.
If you prefer to re-build it from sources perform the following steps:

1. **Install build system**

   The build system is based on Grunt, The JavaScript Task Runner.
   Grunt is installed and managed via npm, the Node.js package manager.
   - Download and install Node.js from http://nodejs.org web site.
   - Install Grunt's command line interface (CLI) globally. 
     You may need to use sudo (for OSX, *nix, BSD etc) or run your command 
     shell as Administrator (for Windows) to do this. To install Grunt CLI run 
     command:

     `npm install -g grunt-cli`
     
2. **Install build dependencies**

   Change current working directory to Controls.js Package root and run:  
  
     `npm install`
     
3. **Run build tool**

     `grunt`
     
   Now you'll find the built files in 'build\' directory.
