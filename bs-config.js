module.exports = {
    server: {
        middleware: {
            1: require('connect-gzip-static')('./dist')
        },
        baseDir: "./dist"
    },
    files: ["./dist/**/*.{html,htm,css,js}"],
    port: 3000
};