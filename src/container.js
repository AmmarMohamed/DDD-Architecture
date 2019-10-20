const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const config = require('../config');
const Application = require('./app/Application');
const {
  CreateContact,
  GetAllContacts,
  GetContact,
  UpdateContact,
  DeleteContact
} = require('./app/contact');

const ContactSerializer = require('./interfaces/http/contact/ContactSerializer');

const Server = require('./interfaces/http/Server');
const router = require('./interfaces/http/router');
const loggerMiddleware = require('./interfaces/http/logging/loggerMiddleware');
const errorHandler = require('./interfaces/http/errors/errorHandler');
const devErrorHandler = require('./interfaces/http/errors/devErrorHandler');
const swaggerMiddleware = require('./interfaces/http/swagger/swaggerMiddleware');

const logger = require('./infra/logging/logger');
const SequelizeContactsRepository = require('./infra/contact/SequelizeContactsRepository');
const { database, Contact: ContactModel,PhoneNumber:PhoneNumberModel } = require('./infra/database/models');

const container = createContainer();

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton()
  })
  .register({
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton()
  })
  .register({
    config: asValue(config)
  });

// Middlewares
container
  .register({
    loggerMiddleware: asFunction(loggerMiddleware).singleton()
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandler: asValue(config.production ? errorHandler : devErrorHandler),
    swaggerMiddleware: asValue([swaggerMiddleware])
  });

// Repositories
container.register({
  contactsRepository: asClass(SequelizeContactsRepository).singleton()
});

// Database
container.register({
  database: asValue(database),
  ContactModel: asValue(ContactModel),
  PhoneNumberModel:asValue(PhoneNumberModel)

});

// Operations
container.register({
  createContact: asClass(CreateContact),
  getAllContacts: asClass(GetAllContacts),
  getContact: asClass(GetContact),
  updateContact: asClass(UpdateContact),
  deleteContact: asClass(DeleteContact)
});

// Serializers
container.register({
  contactSerializer: asValue(ContactSerializer)
});

module.exports = container;
