## jblok.co.uk

The front end and build framework for the jblok.co.uk website.

The entire website is generated when `grunt` is run and this creates all the static HTML files for all the different project pages.

The pages that get generated are defined in work.json. To add a new project, simply add the information to work.json and rebuild. This should make it easier to update the site.

To try this yourself with your own content/front-end follow the below instructions.

### Build Instructions

1. Clone the repo

2. Run `npm install` to install dependencies

3. Define your projects in work.json

4. Change your base directory in Gruntfile.js

5. Run `grunt`

6. Run `npm start` to start a server locally on port 5609.

### Deploy Instructions

1. Build in prod mode `grunt --env=prod`

2. Deploy `build` folder to Netlify
