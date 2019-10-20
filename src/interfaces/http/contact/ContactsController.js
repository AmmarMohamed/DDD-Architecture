const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const ContactsController = {
  get router() {
    const router = Router();

    router.use(inject('contactSerializer'));

    router.get('/', inject('getAllContacts'), this.index);
    router.get('/:id', inject('getContact'), this.show);
    router.post('/', inject('createContact'), this.create);
    router.put('/:id', inject('updateContact'), this.update);
    router.delete('/:id', inject('deleteContact'), this.delete);

    return router;
  },

  index(req, res, next) {
    const { getAllContacts, contactSerializer } = req;
    const { SUCCESS, ERROR } = getAllContacts.outputs;

    getAllContacts
      .on(SUCCESS, (contacts) => {
        res
          .status(Status.OK)
          .json(contacts.map(contactSerializer.serialize));
      })
      .on(ERROR, next);

    getAllContacts.execute();
  },

  show(req, res, next) {
    const { getContact, contactSerializer } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = getContact.outputs;

    getContact
      .on(SUCCESS, (contact) => {
        res
          .status(Status.OK)
          .json(contactSerializer.serialize(contact));
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    getContact.execute(Number(req.params.id));
  },

  create(req, res, next) {
    const { createContact, contactSerializer } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = createContact.outputs;

    createContact
      .on(SUCCESS, (contact) => {
        res
          .status(Status.CREATED)
          .json(contactSerializer.serialize(contact));
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(ERROR, next);

    createContact.execute(req.body);
  },

  update(req, res, next) {
    const { updateContact, contactSerializer } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = updateContact.outputs;

    updateContact
      .on(SUCCESS, (contact) => {
        res
          .status(Status.ACCEPTED)
          .json(contactSerializer.serialize(contact));
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    updateContact.execute(Number(req.params.id), req.body);
  },

  delete(req, res, next) {
    const { deleteContact } = req;
    const { SUCCESS, ERROR,  NOT_FOUND } = deleteContact.outputs;

    deleteContact
      .on(SUCCESS, () => {
        res.status(Status.ACCEPTED).end();
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    deleteContact.execute(Number(req.params.id));
  }
};

module.exports = ContactsController;
