const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: function(req, res, next) {
        userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password},
        function(err, result){
            if(err) {
                next(err)
            }
            else {
                res.json({status: "success", message: "User added successfully", data: null})
            }
        })
    },
    authenticate: function(req, res,next) {
        userModel.findOne({email: req.body.email}, 
        function(err, userInfo){
            if(err) {
                nect(err);
            }
            else {
                if(bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({ id: userInfo._id }, process.env.JWT_KEY, { expiresIn: '1h' });
                    res.json({status: "success", message: "User Found!", data: { user: userInfo, token: token}});
                }
                else {
                    res.json({status: "error", message: "Inavlid email/password!", data: null})
                }
            }
        })
    }
}