const Operation = require('src/app/Operation');

class DeleteContact extends Operation {
  constructor({ contactsRepository }) {
    super();
    this.contactsRepository = contactsRepository;
  }

  async execute(contactId) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;

    try {
      await this.contactsRepository.remove(contactId);
      this.emit(SUCCESS);
    } catch(error) {
      if(error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }

      this.emit(ERROR, error);
    }
  }
}

DeleteContact.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = DeleteContact;
