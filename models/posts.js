'use strict';

const Sequelize = require('sequelize');

module.exports = ((sequelize, DataTypes) => {
    const posts =  sequelize.define('Posts',{
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
        }
    }, {
        timestamp:true,
        paranoid: true,
        underscored: true,
        tableName: 'posts'
    });
    return posts;
});