const { expect } = require('chai');
const GetContact = require('src/app/contact/GetContact');

describe('App :: Contact :: GetContact', () => {
  let getContact;

  context('when contact exists', () => {
    beforeEach(() => {
      const MockContactsRepository = {
        getById: (contactId) => Promise.resolve({
          id: contactId,
          name: 'The Contact'
        })
      };

      getContact = new GetContact({
        contactsRepository: MockContactsRepository
      });
    });

    it('emits SUCCESS with the contact', (done) => {
      getContact.on(getContact.outputs.SUCCESS, (contact) => {
        expect(contact.id).to.equal(123);
        expect(contact.name).to.equal('The Contact');
        done();
      });

      getContact.execute(123);
    });
  });

  context('when contact does not exist', () => {
    beforeEach(() => {
      const MockContactsRepository = {
        getById: () => Promise.reject({
          details: 'Contact with id 123 can\'t be found.'
        })
      };

      getContact = new GetContact({
        contactsRepository: MockContactsRepository
      });
    });

    it('emits NOT_FOUND with the error', (done) => {
      getContact.on(getContact.outputs.NOT_FOUND, (error) => {
        expect(error.details).to.equal('Contact with id 123 can\'t be found.');
        done();
      });

      getContact.execute(123);
    });
  });
});
