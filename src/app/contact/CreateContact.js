const Operation = require('src/app/Operation');
const Contact = require('src/domain/contact/Contact');

class CreateContact extends Operation {
  constructor({ contactsRepository }) {
    super();
    this.contactsRepository = contactsRepository;
  }

  async execute(contactData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

    const contact = new Contact(contactData);

    try {
      const newContact = await this.contactsRepository.add(contact);

      this.emit(SUCCESS, newContact);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}

CreateContact.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = CreateContact;
