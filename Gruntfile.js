module.exports = function(grunt){

  // define th url the site is being deployed to - used for defining resource paths
  var base_url = "http://web.dev/jblok.co.uk-new/build";

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
          sourcemap: "none"
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


  //define deployment task, and watch task maybe?
  // repoint domain dns to DO server
  // commit to git repo and add link in footer
  // (optional) change/obscure css and javascript

  // console.log(grunt_config.bake);
  // console.log(tasks);

  grunt.initConfig( grunt_config );

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ssh-deploy');
  grunt.loadNpmTasks('grunt-bake');

  grunt.registerTask( "default", tasks);

};
