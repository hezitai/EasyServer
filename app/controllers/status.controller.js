const db = require("../models");
const Status = db.status;
const Op = db.Sequelize.Op;

// 新增
exports.createStatus = (req, res) => {

    const Statuss = {
        level: req.body.level,
        levelName: req.body.levelName,
        insideLevelName: req.body.insideLevelName,
        insideLevel: req.body.insideLevel
    };

    // Save Status in the database
    Status.create(Statuss)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Status."
            });
        });
};


// 查询全部
exports.findAll = (req, res) => {
    const level = req.query.level;
    const insideLevel = req.query.insideLevel;
    var condition = {
        level: level,
        // insideLevel: insideLevel
    } ? {
        level: {
            [Op.like]: `%${level}%`,
            // [Op.like]: `%${insideLevel}`
        },
        // insideLevel: {}
    } : null;
    Status.findAll({
            where: condition
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Statuss."
            });
        });
};


// Update a Status by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Status.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Status was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Status with id=${id}. Maybe Status was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Status with id=" + id
            });
        });
};
// // Find a single Status with an id
// exports.findOne = (req, res) => {
//     const id = req.params.id;

//     Status.findByPk(id)
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error retrieving Status with id=" + id
//             });
//         });
// };



// // Delete a Status with the specified id in the request
// exports.delete = (req, res) => {
//     const id = req.params.id;

//     Status.destroy({
//             where: { id: id }
//         })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "Status was deleted successfully!"
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot delete Status with id=${id}. Maybe Status was not found!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Could not delete Status with id=" + id
//             });
//         });
// };

// // Delete all Statuss from the database.
// exports.deleteAll = (req, res) => {
//     Status.destroy({
//             where: {},
//             truncate: false
//         })
//         .then(nums => {
//             res.send({ message: `${nums} Statuss were deleted successfully!` });
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while removing all Statuss."
//             });
//         });
// };

// // Find all published Statuss
// exports.findAllPublished = (req, res) => {
//     Status.findAll({ where: { published: true } })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving Statuss."
//             });
//         });
// };