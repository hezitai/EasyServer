module.exports = (sequelize, Sequelize) => {
    const Status = sequelize.define("status", {
        // 等级
        level: {
            type: Sequelize.INTEGER
        },
        // 等级名称
        levelName: {
            type: Sequelize.STRING
        },
        insideLevel: {
            type: Sequelize.INTEGER
        },
        insideLevelName: {
            type: Sequelize.STRING
        }
    });

    return Status;
};