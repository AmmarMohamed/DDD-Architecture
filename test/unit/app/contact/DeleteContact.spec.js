const { expect } = require('chai');
const DeleteContact = require('src/app/contact/DeleteContact');

describe('App :: Contact :: DeleteContact', () => {
  var deleteContact;

  context('when contact exists', () => {
    before(() => {
      const MockContactsRepository = {
        remove: () => Promise.resolve()
      };

      deleteContact = new DeleteContact({
        contactsRepository: MockContactsRepository
      });
    });

    it('deletes the contact and emits SUCCESS with no payload', (done) => {
      deleteContact.on(deleteContact.outputs.SUCCESS, (response) => {
        expect(response).to.be.undefined();
        done();
      });

      deleteContact.execute(123);
    });
  });

  context('when the contact does not exist', () => {
    before(() => {
      const MockContactsRepository = {
        remove: () => Promise.reject(new Error('NotFoundError'))
      };

      deleteContact = new DeleteContact({
        contactsRepository: MockContactsRepository
      });
    });

    it('emits NOT_FOUND with the error', (done) => {
      deleteContact.on(deleteContact.outputs.NOT_FOUND, (response) => {
        expect(response.message).to.equal('NotFoundError');
        done();
      });

      deleteContact.execute(123);
    });
  });


  context('when there is an internal error', () => {
    before(() => {
      const MockContactsRepository = {
        remove: () => Promise.reject(new Error('Some Error'))
      };

      deleteContact = new DeleteContact({
        contactsRepository: MockContactsRepository
      });
    });

    it('emits ERROR with the error', (done) => {
      deleteContact.on(deleteContact.outputs.ERROR, (response) => {
        expect(response.message).to.equal('Some Error');
        done();
      });

      deleteContact.execute(321);
    });
  });
});
