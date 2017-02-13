const { FuseBox, TypeScriptHelpers } = require("fuse-box");

FuseBox.init({
    homeDir: "src",
    outFile: "bundle.js",
    sourceMap: {
        bundleReference: "sourcemaps.js.map",
        outFile: "sourcemaps.js.map",
    },
    plugins: [TypeScriptHelpers()]
}).devServer("> index.tsx")
