module.exports = app => {
    const status = require("../controllers/status.controller.js");

    let router = require("express").Router();

    // 新增级别
    router.post("/createStatus", status.createStatus);

    // 获取所有级别列表
    router.get("/getAllLevel", status.findAll)

    // 修改级别
    router.post("/updateLevel/:id", status.update)

    app.use('/api/status', router);
};