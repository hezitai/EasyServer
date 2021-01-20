module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        // 登录账号
        loginName: {
            type: Sequelize.STRING
        },
        // 登录密码
        loginPassword: {
            type: Sequelize.STRING
        },
        // 真实姓名
        userName: {
            type: Sequelize.STRING
        },
        // 用户手机号
        userPhoneNumber: {
            type: Sequelize.STRING
        },
        // 用户邮箱
        userEmail: {
            type: Sequelize.STRING
        },
        // 用户性别：true男，false女
        sex: {
            type: Sequelize.STRING
        },
        //是否注销 true注销  false未注销
        isDestroy: {
            type: Sequelize.BOOLEAN
        },
        token: {
            type: Sequelize.STRING
        },
        level: {
            type: Sequelize.INTEGER
        },
        insideLevel: {
            type: Sequelize.INTEGER
        },
        // userLevelName: {
        //     type: Sequelize.STRING
        // },
        // userInsideLevelName: {
        //     type: Sequelize.STRING
        // },
    });

    return User;
};