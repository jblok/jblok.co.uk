module.exports = function(grunt){

  // define the url the site is being deployed to - used for defining resource paths
  var env = grunt.option('env');
  if (env == "prod"){
    var base_url = "http://www.jblok.co.uk";
  }
  else {
    var base_url = "http://192.168.0.5/jblok.co.uk-new/build";
  }

  // get the work data from external json file
  var work = grunt.file.readJSON("work.json");
  var secret = grunt.file.readJSON("secret.json");


  // set up preset grunt config - bake on index.html, build folder clean and assets copying
  var grunt_config = {
    bake: {
      index: {
        options: {
          content: {
            base_url: base_url,
            work_items: work
          }
        },
        files: {
          "build/index.html": "src/index.html"
        }
      }
    },
    clean: [ "build" ],
    copy: {
      default: {
        files: [
          {
            expand: true,
            cwd: "src",
            src: ['assets/css/**', 'assets/js/**','images/fulls/**', 'images/thumbs/**', 'LICENSE.txt', 'README.txt'],
            dest: 'build/'
          },
        ]
      }
    },
    sass: {
      default: {
        options: {
          sourcemap: "none",
          style: "compressed"
        },
        files: {
          'build/assets/css/main.css': 'src/assets/sass/main.scss',
          'build/assets/css/ie8.css': 'src/assets/sass/ie8.scss'
        }
      }
    },
    environments: {
      prod: {
        options: {
          local_path: 'build',
          current_symlink: 'public_html',
          deploy_path: '/home/admin/web/jblok.co.uk',
          host: secret.prod.host,
          port: secret.prod.port,
          username: secret.prod.username,
          privateKey: require('fs').readFileSync(secret.prod.privateKey),
          debug: true,
          releases_to_keep: '3'
        }
      }
    }
  }


  // define the tasks to run
  var tasks = [ "clean", "copy", "bake:index", "sass" ];


  //add bake tasks for each work item to generate a new page
  work.forEach(function(item, i){
    var task = {
      options: {
        content: {
          base_url: base_url,
          work_item: item
        }
      },
      files: {}
    };

    task.files["build/work/" + item.name + ".html"] = "src/templates/work.html";

    grunt_config.bake[item.name] = task;

    tasks.push("bake:"+item.name);
  });


  // todos:
  // mobile external link button is a bit wierd
  // sanity check in ie9
  // (optional) buttons to get shadow on hover like work items
  // (optional) change/obscure css and javascript
  // (optional) break sass main.scss into seperate modular files (e.g. buttons, work items, etc)
  // (future) rethink images on single work page - border radius or in computer screen or something

  grunt.initConfig(grunt_config);

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ssh-deploy');
  grunt.loadNpmTasks('grunt-bake');

  grunt.registerTask( "default", tasks);
};
