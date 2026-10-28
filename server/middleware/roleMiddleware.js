module.exports.allowedRoles = (allowedroles)=> {
    return (req, res, next) => {
        try {
            if(!req.user) {
                return res.status(401).json({
                    message : "LogIn required"
                });
            }
            if(!allowedroles.includes(req.user.role)) {
                return res.status(403).json({
                    message : "Access denied. Unauthorized access"
                });
            }
            return next();
        } catch(error) {
            console.log(error.message);
            return res.status(500).json({
                message : "Server Error"
            });
        }
    }
}