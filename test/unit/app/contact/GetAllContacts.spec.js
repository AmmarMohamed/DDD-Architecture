const { expect } = require('chai');
const GetAllContacts = require('src/app/contact/GetAllContacts');

describe('App :: Contact :: GetAllContacts', () => {
  var getAllContacts;

  context('when query is successful', () => {
    before(() => {
      const MockContactsRepository = {
        getAll: () => Promise.resolve('Imagine all the contacts...')
      };

      getAllContacts = new GetAllContacts({
        contactsRepository: MockContactsRepository
      });
    });

    it('emits SUCCESS with all the contacts', (done) => {
      getAllContacts.on(getAllContacts.outputs.SUCCESS, (response) => {
        expect(response).to.equal('Imagine all the contacts...');
        done();
      });

      getAllContacts.execute();
    });
  });

  context('when there is an internal error', () => {
    before(() => {
      const MockContactsRepository = {
        getAll: () => Promise.reject(new Error('Failed'))
      };

      getAllContacts = new GetAllContacts({
        contactsRepository: MockContactsRepository
      });
    });

    it('emits ERROR with the error', (done) => {
      getAllContacts.on(getAllContacts.outputs.ERROR, (response) => {
        expect(response.message).to.equal('Failed');

        done();
      });

      getAllContacts.execute();
    });
  });
});
