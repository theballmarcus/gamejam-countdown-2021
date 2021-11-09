module.exports.routers = {
    require : {
        index : require('./routes/index'),
        login : require('./routes/login'),
        logout : require('./routes/logout'),
        register : require('./routes/register'),
        home : require('./routes/home'),
        admin : require('./routes/admin'),
	countdown :  require('./routes/countdown')

    },
    use : {
        index : "/",
        login : "/login",
        logout : "/logout",
        register : "/register",
        home : "/home",
        admin : "/admin",
	countdown : "/countdown"

    }
}

