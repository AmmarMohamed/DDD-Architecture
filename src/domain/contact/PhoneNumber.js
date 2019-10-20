const { attributes } = require('structure');

const PhoneNumber = attributes({
  id: Number,
  number: {
    type: String,
    required: true
  },
  type:{
    type: String,
  },
  contactId:{
    type: String,
    required: true
  }
})(class PhoneNumber {
  
});


module.exports = PhoneNumber;