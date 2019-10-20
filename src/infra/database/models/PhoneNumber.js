'use strict';
module.exports = function (sequelize, DataTypes) {
  const PhoneNumber = sequelize.define('phoneNumber', {
    number:{
        type: DataTypes.STRING,
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
      }    
    },
    contactId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'contact', // Can be both a string representing the table name or a Sequelize model
        key: 'id'
      }
    },
    type:{
      type:DataTypes.STRING,
      defaultValue: 'Home'
  },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        PhoneNumber.belongsTo(models.Contact)
      }
    }
  });

  return PhoneNumber;
};
