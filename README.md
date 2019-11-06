<div align="center">
  <img width="150" height="150" src="https://webpack.js.org/assets/icon-square-big.svg">
  <h1>Webpack layout template for multi-page website</h1>
  <p>
    Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.
  </p>
</div>

## This assembly implements:

- clean the bundle folder before assembly in production mode
- show errors to the screen of the browser in development mode
- use of SASS as a CSS pre-processor
- use autoprefixer for adding vendor properties to the CSS
- minification and optimization of CSS in production mode
- assembly of media queries into single blocks and mooving at the end of the CSS stlyle file
- use of PUG as Html pre-processor and template engine
- Html minification in production mode
- compression image (jpg, png, svg, gif)
- add source-maps in development mode
- LiveServer for relead pages in development mode
- Babel transporter to support old JavaScript standards
- integration normalize.css
- integration  Bootstrap 4 grid

## Build Setup:

``` bash
# Download repository:
git clone https://github.com/AnarAgaev/Webpack-template.git

# Go to the app:
cd webpack-template

# Install dependencies:
npm install

# Server with hot reload at http://localhost:8081/
npm run dev

# Output will be at dist/ folder
npm run build
```

## Project Structure:

* `src/index.js` - main app file where you include/import all required libs and init app
* `src/js` - put the custom app scripts here
* `src/scss` - put the custom app SASS styles here. main.scss is main file the rest SASS files are import to it
* `src/pug` - put the custom app PUG here
* `src/pug/mixins` - in this folder you can put the mixins used throughout the project
* `src/pug/templates` - in this folder you can put the custom templates for your application
* `src/pug/pages` - put the custom app PUG files in folders at this directory. **Each page has its own folder. The main file of the page in the folder should be called index.pug.** Include the page components in the main PUG file
* `src/img` - put images here. Don't forget to use correct path: `img/some.jpg`
* `src/font` - put the custom fonts for your project in this folder
* `static/` - folder with additional static resources to be copied to the root of the output folder
  
  
<div align="center">
  <h2>Settings:</h2>
</div>
  
  
## Import Another libs:
1. Install libs
2. Import libs in `src/index.js`
``` js
// Bootstrap example
import Bootstrap from 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
```

## Import only SASS or CSS libs:
1. Install libs
2. Go to `src/scss/main.scss`
3. Import libs in node modules to main.scss
``` scss
// Sass librarys example:
@import '../../node_modules/spinners/stylesheets/spinners';
// CSS librarys example:
@import '../../node_modules/flickity/dist/flickity.css';
```
4. Import into the `src/index.js` entry point
``` css
// // Bootstrap grid example:
import 'bootstrap/dist/css/bootstrap-grid.min.css';
```
Use either the 3. or 4. method to add one library

## Import js files:
1. Create another js module in `src/js/modules` folder
2. Import modules in `src/js/main.js` file

## Create new HTML pages:
**Each page has its own folder!**
1. Create your own folder for each page in `src/pug/pages/`
2. Create `index.pug` file in your page folder. Created file must have the name **index.pug**
3. Сreate components for the page in the folder 
4. Include components in the main page file `index.pug`

## Add Fonts:
Add @font-face in `/scss/fonts.scss`:

``` scss
// Example with Helvetica
@font-face {
  font-family: "Helvetica-Base";
  src: url('/assets/fonts/Helvetica/Base/Helvetica-Base.eot'); /* IE9 Compat Modes */
  src: url('/assets/fonts/Helvetica/Base/Helvetica-Base.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('/assets/fonts/Helvetica/Base/Helvetica-Base.woff') format('woff'), /* Pretty Modern Browsers */
       url('/assets/fonts/Helvetica/Base/Helvetica-Base.ttf')  format('truetype'), /* Safari, Android, iOS */
       url('/assets/fonts/Helvetica/Base/Helvetica-Base.svg') format('svg'); /* Legacy iOS */
}
```

Add variables for font in `/scss/_variables.scss`:

``` scss
$primaryFont : 'Helvetica-Base', Arial, sans-serif;
```

## License
[MIT](./LICENSE)

Copyright (c) 2019-present, [Anar Agaev](https://github.com/AnarAgaev)
