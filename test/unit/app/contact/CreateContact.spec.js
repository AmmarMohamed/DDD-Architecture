const { expect } = require('chai');
const CreateContact = require('src/app/contact/CreateContact');

describe('App :: Contact :: CreateContact', () => {
  var createContact;

  context('when contact is valid', () => {
    before(() => {
      const MockContactsRepository = {
        add: (contact) => Promise.resolve(contact)
      };

      createContact = new CreateContact({
        contactsRepository: MockContactsRepository
      });
    });

    it('creates the contact and emits SUCCESS', (done) => {
      const contactData = { name: 'New Contact',email:"ammar@yahoo.com","phoneNumbers": [
        {
            "number": "42243287315356342",
            "type": "Home"
        }
    ]};

      createContact.on(createContact.outputs.SUCCESS, (response) => {
        expect(response.name).to.equal('New Contact');
        done();
      });

      createContact.execute(contactData);
    });
  });

  context('when contact is invalid', () => {
    before(() => {
      const MockContactsRepository = {
        add: () => Promise.reject(Error('ValidationError'))
      };

      createContact = new CreateContact({
        contactsRepository: MockContactsRepository
      });
    });

    it('emits VALIDATION_ERROR with the error', (done) => {
      const contactData = { name: 'New Contact' };

      createContact.on(createContact.outputs.VALIDATION_ERROR, (response) => {
        expect(response.message).to.equal('ValidationError');
        done();
      });

      createContact.execute(contactData);
    });
  });

  context('when there is an internal error', () => {
    before(() => {
      const MockContactsRepository = {
        add: () => Promise.reject(new Error('Some Error'))
      };

      createContact = new CreateContact({
        contactsRepository: MockContactsRepository
      });
    });

    it('emits ERROR with the error', (done) => {
      const contactData = { name: 'New Contact' };

      createContact.on(createContact.outputs.ERROR, (response) => {
        expect(response.message).to.equal('Some Error');
        done();
      });

      createContact.execute(contactData);
    });
  });
});
