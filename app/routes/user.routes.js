module.exports = app => {
    const user = require("../controllers/user.controller.js");

    let router = require("express").Router();

    // 注册
    router.post("/createUser", user.createUser);

    // 登录
    router.post("/loginUser", user.findOne);

    // 修改
    router.post("/updateUser/:id", user.update);

    // 注销
    router.get("/deleteUser/:id", user.delete);

    // 修改权限
    router.post("/updateUserLevel/:id", user.updateLevel);

    app.use('/api/user', router);
};