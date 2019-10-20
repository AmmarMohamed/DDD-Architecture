const ContactMapper = require('./SequelizeContactMapper');
const PhoneNumberMapper = require('./SequelizePhoneNumberMapper');
class SequelizeContactsRepository {
  constructor({ ContactModel,PhoneNumberModel }) {
    this.ContactModel = ContactModel;
    this.PhoneNumberModel = PhoneNumberModel;
  }

  async getAll(...args) {
    const contacts = await this.ContactModel.findAll(...args);
    return contacts.map(ContactMapper.toEntity);
  }

  async getById(id) {
    const contact = await this._getById(id,{
        include: [{// Notice `include` takes an ARRAY
          model: this.PhoneNumberModel,
          attributes:['number','type']
        }]});
    return ContactMapper.toEntity(contact);
  }

  async add(contact) {
    //const { valid, errors } = contact.validate();
    const { valid, errors } = contact.validate();

    if(!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      throw error;
    }
    const transaction = await this.ContactModel.sequelize.transaction();

    try {
    const newContact = await this.ContactModel.create(ContactMapper.toDatabase(contact),{
      include: [this.PhoneNumberModel],
      transaction
    });

    await transaction.commit();
    return await this.getById(newContact.id);

    }
    catch(error){
      await transaction.rollback();

      throw error;
    }
    //var phoneRecord = {number:phoneNumber.number , contactId:newContact.id}
    //const newPhoneNumber = await this.PhoneNumberModel.bulkCreate(PhoneNumberMapper.toDatabase(phoneRecord))
  }

  async remove(id) {
    const contact = await this._getById(id);

    await contact.destroy();
    return;
  }

  async update(id, newData) {
    const contact = await this._getById(id,{
      include: [{// Notice `include` takes an ARRAY
        model: this.PhoneNumberModel,
        attributes:['number',"type"]
      }]});

    const transaction = await this.ContactModel.sequelize.transaction();

    try {
      const updatedContact = await contact.update(newData,{ include: [this.PhoneNumberModel],
        transaction });
      const contactEntity = ContactMapper.toEntity(updatedContact);

      const { valid, errors } = contactEntity.validate();

      if(!valid) {
        const error = new Error('ValidationError');
        error.details = errors;
  
        throw error;
      }

      await transaction.commit();

      return contactEntity;
    } catch(error) {
      await transaction.rollback();

      throw error;
    }
  }

  async count() {
    return await this.ContactModel.count();
  }

  // Private

  async _getById(id,...args) {
    try {
      return await this.ContactModel.findById(id,...args, { rejectOnEmpty: true });
    } catch(error) {
      if(error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `Contact with id ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }
}

module.exports = SequelizeContactsRepository;
