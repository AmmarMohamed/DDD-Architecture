const Operation = require('src/app/Operation');
class GetAllContacts extends Operation {
  constructor({ contactsRepository,PhoneNumberModel }) {
    super();
    this.contactsRepository = contactsRepository;
    this.PhoneNumberModel=PhoneNumberModel
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;
    try {
      const contacts = await this.contactsRepository.getAll({
        include: [{// Notice `include` takes an ARRAY
          model: this.PhoneNumberModel,
          attributes:['number','type'],
          raw : true
        }]
      });

      this.emit(SUCCESS, contacts);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllContacts.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllContacts;
