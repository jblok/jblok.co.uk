module.exports = function(grunt){

  // define the url the site is being deployed to - used for defining resource paths
  var base_url = "http://192.168.0.5/jblok.co.uk-new/build";

  // get the work data from external json file
  var work = grunt.file.readJSON("work.json");

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
            src: ['assets/css/**', 'assets/fonts/**', 'assets/js/**','images/**', 'LICENSE.txt', 'README.txt'],
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
    }

    //,
    // secret: grunt.file.readJSON('secret.json'),
    // environments: {
    //   prod: {
    //     options: {
    //       local_path: 'dist',
    //       current_symlink: 'current',
    //       deploy_path: '/full/path'
    //       host: '<%= secret.staging.host %>',
    //       username: '<%= secret.staging.username %>',
    //       password: '<%= secret.staging.password %>',
    //       port: '<%= secret.staging.port %>',
    //       debug: true,
    //       releases_to_keep: '3'
    //     }
    //   }
    // }
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


  // define deployment task, and watch task maybe?
  // make sure all copy is written - wearesupernatural isnt
  // repoint domain dns to DO server and setup new virtual host on DO
  // minify css and compress pngs/jpgs
  // mobile external link button is a bit wierd
  // work out how to detect environment and set base_url up top
  // vendor prefix your shadows and transitions and things
  // (optional) buttons to get shadow on hover like work items
  // (optional) change/obscure css and javascript

  // console.log(grunt_config.bake);
  // console.log(tasks);

  grunt.initConfig( grunt_config );

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ssh-deploy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-bake');

  grunt.registerTask( "default", tasks);

};
