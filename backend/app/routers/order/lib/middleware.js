var jwt = require('jsonwebtoken');
const middleware = {};

middleware.verifyToken = (req, res, next) => {
    try {
        
        // if (!req.session["_id"]) return res.reply(messages.unauthorized());
        var token = req.headers.authorization;
        if (!token) {
            // return res.reply(messages.unauthorized());
            return res.reply("true");
        }
        token = token.replace('Bearer ', '');
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err)
                return res.reply(messages.unauthorized());

            if (decoded.sRole === "user") {
                req.userId = decoded.id;
                req.role = decoded.sRole;
                req.name = decoded.oName;
                req.email = decoded.sEmail;
                next();
            } else
                return res.reply(messages.unauthorized());
        });
    } catch (error) {
        return res.reply(messages.server_error());
    }
}




middleware.verifyWithoutToken = (req, res, next) => {
    try {
        // if (!req.session["_id"] && !req.session["admin_id"]) return res.reply(messages.unauthorized());

        var token = req.headers.authorization;

        if (token && token != undefined && token != '') {
            token = token.replace('Bearer ', '');
            jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {

                if (err) {
                    return res.reply(messages.unauthorized());
                }
                req.userId = decoded.id;
                req.role = decoded.sRole;
                next();
            });
        } else {
            next();
        }
    } catch (error) {
        return res.reply(messages.server_error());
    }
}



module.exports = middleware;