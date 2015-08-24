var src 	= "./src";
var dest 	= "./assets";

module.exports = {
	less: {
	    src: src + "/css/**/*.less",
	    dest: dest + '/css',
	    settings: {
	    	paths: []
	    }
  	},
	browserSync: {
    	server: {
      		// Serve up our build folder
      		baseDir: './'
    	}
  	},
	browserify: {
	    // A separate bundle will be generated for each
	    // bundle config in the list below
	    bundleConfigs: [{
	      entries: src + '/scripts/libs.js',
	      dest: dest + '/js',
	      outputName: 'libs.js',
	      // list of modules to make require-able externally
	      require: ['underscore', 'react', 'react/addons', 'reflux', 'react-router'],
	      loadMaps: false
	    }, {
	      entries: src + '/scripts/main.jsx',
	      dest: dest + '/js',
	      outputName: 'main.js',
	      // list of externally available modules to exclude from the bundle
	      external: ['underscore', 'react', 'react/addons', 'reflux', 'react-router'],
	      loadMaps: true
	    }]
  }
};