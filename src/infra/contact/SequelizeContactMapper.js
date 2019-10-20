const Contact = require('src/domain/contact/Contact');

const SequelizeContactMapper = {
  toEntity({ dataValues }) {
    const { id, name, email, phoneNumbers } = dataValues;
    return new Contact({ id, name, email, phoneNumbers });
  },

  toDatabase(survivor) {
    const { name, email, phoneNumbers } = survivor;

    return { name, email, phoneNumbers };
  }
};

module.exports = SequelizeContactMapper;
