module.exports.routers = {
    require : {
        index : require('./routes/index'),
        admin : require('./routes/admin')
    },
    use : {
        index : "/",
        admin : "/admin"
    }
}

