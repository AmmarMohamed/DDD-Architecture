const Operation = require('src/app/Operation');

class GetContact extends Operation {
  constructor({ contactsRepository }) {
    super();
    this.contactsRepository = contactsRepository;
  }

  async execute(contactId) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const contact = await this.contactsRepository.getById(contactId);
      this.emit(SUCCESS, contact);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetContact.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetContact;
