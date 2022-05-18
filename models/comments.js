'use strict';

const Sequelize = require('sequelize');

module.exports = ((sequelize, DataTypes) => {
    const comments =  sequelize.define('Comments',{
        comment: {
            type: Sequelize.TEXT,
            allowNull: false,
        }
    }, {
        timestamp:true,
        paranoid: true,
        underscored: true,
        tableName: 'comments'
    });
    return comments;
});