const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const ct = require('../plugin/checkToken')

// 注册新用户
exports.createUser = (req, res) => {
    // Validate request
    if (!req.body.loginName) {
        res.status(400).send({
            message: "请输入登录名!"
        });
        return;
    }

    if (!req.body.loginPassword) {
        res.status(400).send({
            message: "请输入密码!"
        });
        return;
    }

    if (!req.body.userName) {
        res.status(400).send({
            message: "请输入姓名!"
        });
        return;
    }

    if (!req.body.userPhoneNumber) {
        res.status(400).send({
            message: "请输入电话!"
        });
        return;
    }
    // Create a Tutorial
    const user = {
        loginName: req.body.loginName,
        loginPassword: req.body.loginPassword,
        userName: req.body.userName,
        userPhoneNumber: req.body.userPhoneNumber,
        userEmail: req.body.userEmail,
        sex: req.body.sex,
        isDestroy: false,
        userLevel: 9,
        userInsideLevel: 2,
    };

    // Save Tutorial in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

// 登录
exports.findOne = (req, res) => {
    const login = {
        loginName: req.body.loginName,
        // loginPassword: req.body.loginPassword
    };
    // const insideLevels = req.body.insideLevel;
    User.findOne({
            where: login,
            // include: { all: true }
            include: [{
                model: db.status,
                // where: {
                //     insideLevel: {
                //         [Op.like]: `%${insideLevels}%`
                //     }
                // }
                // attributes: ['level', 'insideLevel']
            }],
            // raw: true
            // include: [{ all: true }]
        })
        .then(data => {
            if (data.loginPassword != req.body.loginPassword) {
                res.status(400).send({
                    message: "密码错误!",
                    code: 2
                });
            } else if (data.isDestroy == true) {
                res.status(400).send({
                    message: '该用户已注销',
                    code: 3,
                    // data: data
                });
                return
            } else {
                let content = {
                    name: req.body.id
                }; // 要生成token的主题信息
                let secretOrPrivateKey = "hzt" // 这是加密的key（密钥） 
                let token = jwt.sign(content, secretOrPrivateKey, {
                    expiresIn: 3600 // 过期时间 s
                });

                data.token = token; //token写入数据库
                data.save().then(data => {}).catch(err => {
                        res.status(500).send({
                            message: err.message,
                        });
                    })
                    // req.body.token = token
                res.send({
                    message: `登录成功`,
                    data: data,
                    code: 1
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message,
            });
        });
};

//修改密码/账户信息
exports.update = (req, res) => {
    console.log(req.body);
    console.log(req.headers);
    // if(ct.checkToken(req.headers, )){

    // }
    const userinfomation = {
        loginPassword: req.body.loginPassword,
        userName: req.body.userName,
        userPhoneNumber: req.body.userPhoneNumber,
        userEmail: req.body.userEmail,
        sex: req.body.sex,
    };
    if (req.body.loginName) {
        res.status(400).send({
            message: 'loginName禁止修改'
        });
        return
    }
    if (req.body.isDestroy == false || req.body.isDestroy == true || req.body.isDestroy) {
        res.status(400).send({
            message: 'isDestroy禁止修改'
        });
        return
    }
    User.update(userinfomation, {
            where: {
                id: req.params.id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `信息修改成功`
                });
            } else {
                res.send({
                    message: `信息修改失败，请核对用户id`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User"
            });
        });
};

//注销账户
exports.delete = (req, res) => {
    const id = req.params.id;
    const info = {
        isDestroy: true
    };
    User.update(info, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `账户已注销`
                });
            } else {
                res.send({
                    message: `用户不存在或用户id错误`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

// 设置权限
exports.updateLevel = (req, res) => {
    console.log(req.body)
    const level = {
        userLevel: req.body.userLevel,
        userInsideLevel: req.body.userInsideLevel,
    };
    if (typeof req.body.userLevel != 'number') {
        res.status(400).send({
            message: '请填写权限信息'
        });
        return
    }
    if (typeof req.body.userInsideLevel != 'number') {
        res.status(400).send({
            message: '请填写权限信息'
        });
        return
    }
    User.update(level, {
            where: {
                id: req.params.id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `权限修改成功`
                });
            } else {
                res.send({
                    message: `权限修改失败，请核对用户id`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User"
            });
        });
};