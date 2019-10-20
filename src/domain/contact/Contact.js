const { attributes } = require('structure');

const Contact = attributes({
  id: Number,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumbers:  {
    type: Array,
    itemType: Object,
  }


}) (class Contact {

});


module.exports = Contact;
