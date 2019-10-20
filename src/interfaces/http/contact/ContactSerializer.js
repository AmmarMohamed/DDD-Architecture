const ContactSerializer = {
  serialize({ id, name,email,phoneNumbers }) {
    return {
      id,
      name,
      email,
      phoneNumbers
    };
  }
};

module.exports = ContactSerializer;
