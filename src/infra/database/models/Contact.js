'use strict';

module.exports = function (sequelize, DataTypes) {
  const Contact = sequelize.define('contact', {
    name:{ 
      type:DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      lowercase: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
      unique: true
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Contact.hasMany(models.PhoneNumber)
      }
    }
  });

  return Contact;
};
