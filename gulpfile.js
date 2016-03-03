/// <vs SolutionOpened='sync, copy-folders' />

/*
npm install --save-dev gulp gulp-chmod
npm install --save-dev gulp gulp-changed
npm install --save-dev gulp del
npm install --save-dev gulp gulp-sourcemaps
npm install --save-dev gulp gulp-concat
npm install --save-dev gulp gulp-uglify
npm install --save-dev gulp gulp-order
npm install --save-dev gulp-inject
npm install --save-dev gulp-zip
 */

var gulp = require("gulp");
//chmod changes the file permisions so we can overwrite without errors from gulp
var chmod = require('gulp-chmod');
var changed = require('gulp-changed');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var order = require('gulp-order');
var inject = require('gulp-inject');
var zip = require('gulp-zip');

//var browserSync = require('browser-sync').create();
var clientPath = "../../../../../../[branch]/imis.net/Packages/Platform/Asi.WebAppRoot[subfolder]";
//var clientPath = "../../../../../../../SpecialBranches/ScrumV3/[branch]/imis.net/Packages/Platform/Asi.WebAppRoot[subfolder]";



var sources = ["app/**/*.*", "Content/**/*.*", "views/**/*.*", "Examples/**/*.*"];

var app = "app",
    content = "Content",
    scripts = "Scripts",
    views  = "views";

//Watch for changed files and folders and make sure they are copied to our destination
//at the moment we just copy everything, even files that have not changed
gulp.task("sync", function () {
    gulp.watch(sources, ["copy-all"])
        .on("error", swallowError)
        .on("change", function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        })
        .on("delete", function (event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
    
});


//Copy all files/folders on startup
gulp.task("copy-all", ["copy-sources", "copy-samples"], function () {
});

gulp.task("copy-bundles", ["bundle-angular-asiCore", "copy-bundles"], function () {
});

gulp.task("copy-sources", function () {
    var clientPath100 = buildClientPath("Main100", "/Areas/ng/");
    var clientPath10 = buildClientPath("Main10", "/Areas/ng/");
    copyFiles(sources, clientPath100, ".");
    copyFiles(sources, clientPath10, ".");
    
});

//copy the samples, but do not keep the example folder in the destination
gulp.task("copy-samples", function () {
    var clientPath100 = buildClientPath("Main100", "/Areas");
    var clientPath10 = buildClientPath("Main10", "/Areas");
    copyFiles("examples/**/*.*", clientPath100, "examples");
    copyFiles("examples/**/*.*", clientPath10, "examples");
});

//copy the bundles
gulp.task("copy-bundles", function () {
    var clientPath100 = buildClientPath("Main100","/AsiCommon/Scripts/AngularBundles");
    var clientPath10 = buildClientPath("Main10", "/AsiCommon/Scripts/AngularBundles");
    copyFiles("Scripts/bundle/*.*", clientPath100, "Scripts/bundle");
    copyFiles("Scripts/bundle/*.*", clientPath10, "Scripts/bundle");
});



function copyFiles(sourcesFiles, destination, basePath) {
    return gulp.src(sourcesFiles, { base: basePath })
        .pipe(changed(destination))
        .pipe(chmod(755))
        .pipe(gulp.dest(destination));
}

//Build our destination path, injecting the right branch and subfolder
function buildClientPath(branch, subfolder) {
    return clientPath.replace("[branch]", branch).replace("[subfolder]", subfolder);
}


//Clean out destination folders 
gulp.task("clean", function () {
    var clientPath100 = buildClientPath("Main100", "/ng/");
    var clientPath10 = buildClientPath("Main10", "/ng/");
    del(clientPath100, { force: true });
    del(clientPath10, { force: true });
});

//Clean out folders and copy
gulp.task("clean-copy", ["clean","copy-all"], function () {

});

function swallowError(error) {
    console.log(error);
}


var angularFiles = ["Scripts/angular.js", "Scripts/angular-sanitize.js", "Scripts/angular-ui-router.js", "Scripts/angular-ui/ui-bootstrap-tpls.min.js"];
var angularSpinFiles =["Scripts/spin/spin.min.js", "Scripts/spin/angular-spinner.min.js", "Scripts/spin/angular-loading-spinner.js"];


gulp.task("bundle-angular", function() {
    return gulp.src(angularFiles, { base: "." })
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('angular-bundle.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('maps'))
        .pipe(chmod(755))
        .pipe(gulp.dest("Scripts/bundle"));
});

gulp.task("bundle-angular-spin", function() {
    return gulp.src(angularSpinFiles, { base: "./Scripts/spin" })
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('angular-spin-bundle.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('maps'))
        .pipe(chmod(755))
        .pipe(gulp.dest("Scripts/bundle"))
        .on("error", swallowError);
});

//bundles our 3rd party stuff
gulp.task("bundle", ["bundle-angular", "bundle-angular-spin", "bundle-angular-asiCore"], function () {
});


//Build our client side API and spit it out to the right folders.
//We build it slightly differently for our release machines
/*

/*Angular Core API bundling TODO - make this generic so it will work with all our folders/modules and with either branch
 * At the moment we do not have gulp in our CI build so i'm going to checkin the output into TFS in v10 and v100
 */
var coreFiles = ["app/core/*.js", "!app/core/*spec.js"];
gulp.task("bundle-angular-asiCore", function () {
    return gulp.src(coreFiles, { base: "." })
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(order([
            "**/*angularGlobals.js",
            "**/app.module.js",
            "**/*module.js",
            "**/*controller.js",
            "**/*.js"
        ]))
        .pipe(concat('angular-asi-core-bundle.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('maps'))
        .pipe(chmod(755))
        .pipe(gulp.dest("Scripts/bundle"));
});

/*
Inject the source files into each index.html file, in the correct order
At the moment this only works for one iPArt at a time, we need to change the paths for each iPart
*/


gulp.task('inject', function () {

    //var iPartPath = "./app/fundraising/donationentry/";
    var iPartPath = "./examples/innov/helloworld/"; //INNOVATIONS
    var prefix = "~/Areas";
    var codePaths =
    [
        iPartPath + "/**/*.js",
        "!./**/*.spec.js"
    ];
    var target = gulp.src(iPartPath + 'index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(codePaths, { read: false }).pipe(
            order([
                "**/*angularGlobals.js",
                "**/app.module.js",
                "**/*module.js",
                "**/*.service.js",
                "!**/*ontroller.js",
                "**/*ontroller.js"
            ]));

    return target.pipe(inject(sources, {
        //Options:
        addPrefix: prefix,
        addRootSlash: false,
        transform: transformHtmlJs
        }))
      .pipe(gulp.dest(iPartPath));
});

function transformHtmlJs(filepath) {
    //filepath = filepath.replace("examples/", "");
    return '<script src="' + filepath + '" defer></script>';
};

/*
Create our iPart zip file ready for upload
*/
gulp.task('zip', function () {
    var zipPath = "./examples/innov";
    var company = "innov";
    return gulp.src([zipPath + "/**", "!./**/*.zip"])
        .pipe(zip(company + ".zip"))
        .pipe(gulp.dest(zipPath));
});


/*
TODO create a task that will Bundle all our iPart code, putting our files in the correct order and including maps and create us a zip file
*/


