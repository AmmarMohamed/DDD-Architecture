'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('phoneNumbers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            number: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isValidPhoneNo: function (value) {
                        if (!value) return value;

                        var regexp = /^[0-9]+$/;
                        var values = (Array.isArray(value)) ? value : [value];

                        values.forEach(function (val) {
                            if (!regexp.test(val)) {
                                throw new Error("Number only is allowed.");
                            }
                        });
                        return value;
                    }
                },
                
            },
            contactId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'contacts', // Can be both a string representing the table name or a Sequelize model
                    key: 'id'
                }
            },
            type:{
                type:Sequelize.STRING,
                defaultValue: 'Home'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('phoneNumber');
    }
};
