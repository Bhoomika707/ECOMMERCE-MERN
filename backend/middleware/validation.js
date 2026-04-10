const validator = require('validator');

const validateEmail = (email) => {
  return validator.isEmail(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

const validatePhone = (phone) => {
  return validator.isMobilePhone(phone);
};

const validateProductData = (data) => {
  const { name, description, price, category, stock } = data;
  
  if (!name || !description || !price || !category || stock === undefined) {
    return false;
  }
  
  if (price <= 0 || stock < 0) {
    return false;
  }
  
  return true;
};

module.exports = {
  validateEmail,
  validatePassword,
  validatePhone,
  validateProductData,
};