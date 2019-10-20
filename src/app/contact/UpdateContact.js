const Operation = require('src/app/Operation');

class UpdateContact extends Operation {
  constructor({ contactsRepository }) {
    super();
    this.contactsRepository = contactsRepository;
  }

  async execute(contactId, contactData) {
    const {
      SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR
    } = this.outputs;

    try {
      const contact = await this.contactsRepository.update(contactId, contactData);
      this.emit(SUCCESS, contact);
    } catch(error) {
      switch(error.message) {
      case 'ValidationError':
        return this.emit(VALIDATION_ERROR, error);
      case 'NotFoundError':
        return this.emit(NOT_FOUND, error);
      default:
        this.emit(ERROR, error);
      }
    }
  }
}

UpdateContact.setOutputs(['SUCCESS', 'NOT_FOUND', 'VALIDATION_ERROR', 'ERROR']);

module.exports = UpdateContact;
