## jblok.co.uk

The front end and build framework for the jblok.co.uk website.

The entire website is generated when `grunt` is run and this creates all the static HTML files for all the different project pages.

The pages that get generated are defined in work.json. To add a new project, simply add the information to work.json and rebuild. This should make it easier to update the site.

To try this yourself with your own content/front-end follow the below instructions.

### Build Instructions

1) Clone the repo

2) Run `npm install` to install dependencies

3) Define your projects in work.json

4) Change your base directory in Gruntfile.js

5) Run `grunt`

6) In a browser, navigate to the build folder in the directory you cloned to.


Front end adapted from Strata template by HTML5 UP (html5up.net | @n33co)
