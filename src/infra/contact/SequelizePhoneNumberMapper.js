const PhoneNumber = require('src/domain/contact/PhoneNumber');

const SequelizePhoneNumberMapper = {
    toEntity({ dataValues }) {
        const { id, number,type} = dataValues;

        return new PhoneNumber({ id, number,type});
    },

    toDatabase(survivor) {
        const { id, number,type} = survivor;

        return { id, number,type};
    }
};

module.exports = SequelizePhoneNumberMapper;
