const { expect } = require('chai');
const UpdateContact = require('src/app/contact/UpdateContact');

describe('App :: Contact :: UpdateContact', () => {
  var updateContact;

  context('when contact exists', () => {
    context('when data is valid', () => {
      before(() => {
        const MockContactsRepository = {
          update: (id, data) => Promise.resolve(data)
        };

        updateContact = new UpdateContact({
          contactsRepository: MockContactsRepository
        });
      });

      it('updates the contact and emits SUCCESS', (done) => {
        const contactData = { name: 'Updated Contact',email:"gddg@jgh.com" };

        updateContact.on(updateContact.outputs.SUCCESS, (response) => {
          expect(response.name).to.equal('Updated Contact');
          done();
        });

        updateContact.execute(123, contactData);
      });
    });

    context('when data is invalid', () => {
      before(() => {
        const MockContactsRepository = {
          update: () => Promise.reject(Error('ValidationError'))
        };

        updateContact = new UpdateContact({
          contactsRepository: MockContactsRepository
        });
      });

      it('emits VALIDATION_ERROR with the error', (done) => {
        const contactData = { name: 'New Contact' };

        updateContact.on(updateContact.outputs.VALIDATION_ERROR, (response) => {
          expect(response.message).to.equal('ValidationError');
          done();
        });

        updateContact.execute(321, contactData);
      });
    });
  });

  context('when the contact does not exist', () => {
    before(() => {
      const MockContactsRepository = {
        update: () => Promise.reject(new Error('NotFoundError'))
      };

      updateContact = new UpdateContact({
        contactsRepository: MockContactsRepository
      });
    });

    it('emits NOT_FOUND with the error', (done) => {
      const contactData = { name: 'New Contact' };

      updateContact.on(updateContact.outputs.NOT_FOUND, (response) => {
        expect(response.message).to.equal('NotFoundError');
        done();
      });

      updateContact.execute(123, contactData);
    });
  });


  context('when there is an internal error', () => {
    before(() => {
      const MockContactsRepository = {
        update: () => Promise.reject(new Error('Some Error'))
      };

      updateContact = new UpdateContact({
        contactsRepository: MockContactsRepository
      });
    });

    it('emits ERROR with the error', (done) => {
      const contactData = { name: 'New Contact' };

      updateContact.on(updateContact.outputs.ERROR, (response) => {
        expect(response.message).to.equal('Some Error');
        done();
      });

      updateContact.execute(321, contactData);
    });
  });
});
