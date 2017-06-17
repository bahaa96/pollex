const path = require("path")
const glob = require('glob')
const webpack = require("webpack")
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')
let envFile = require("node-env-file")


process.env.NODE_ENV = process.env.NODE_ENV || "development"

let env = process.env.NODE_ENV


try {
    envFile(path.join(__dirname, "config/" + env + ".env"))
}catch (e) {

}

const extractSass = new ExtractTextPlugin({
    filename: 'public/bundle.css',
    disable: env === "development"
});


module.exports = {
    entry: [
        "script-loader!jquery/dist/jquery.min.js",
        "script-loader!tether/dist/js/tether.min.js",
        "script-loader!bootstrap/dist/js/bootstrap.min.js",
        "./app/app.jsx"
    ],
    externals:{
        jquery: "jQuery",
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': "jquery",
            "JQuery": "jquery",
            "window.jQuery": "jquery",
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        extractSass,
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'public/index.html')),
            minimize: env === "production"
        }),
        // This defines some variables to be able to use them in bundle.js
        // FireBase config variables
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                API_KEY: JSON.stringify(process.env.API_KEY),
                AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
                DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
                PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
                STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
                MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID),
            }
        }),

    ],
    output: {
        path: __dirname,
        filename: "./public/bundle.js"
    },
    resolve: {
        modules: [
            "node_modules/",
            "app/components/"
        ],
        alias: {
            app: "app",
            public: "public",
            styles: path.resolve(__dirname, "styles"),
            reducers: path.join(__dirname, "app/reducers/index.jsx"),
            actions: path.join(__dirname, "app/actions/index.jsx"),
            store: path.join(__dirname, "app/store/configureStore.jsx"),
        },
        extensions: [" ", ".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015', "stage-0"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: extractSass.extract({
                    use: "css-loader",
                    fallback: env === "development" ? "style-loader" : undefined

                })
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: ["css-loader", "sass-loader"],
                    fallback: env === "development" ? "style-loader" : undefined
                })
            },
            {
                test: /\.(eot|(png|gif|jp(e)?g|svg)|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
                use: 'url-loader'
            }
        ]
    },

    devtool : env === "development" ? "cheap-module-eval-source-map" : undefined
}
