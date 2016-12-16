import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import * as Constants from '../../constants';


export default function validateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.identifier)) {
    errors.identifier = Constants.ERROR_FIELD_REQUIRED;
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = Constants.ERROR_FIELD_REQUIRED;
  }
  
  //if (Validator.isEmpty(data.errorcaptcha)) {
   // errors.errorcaptcha = 'Click Captcha';
  //}

  
  return {
    errors,
    isValid: isEmpty(errors)
  };
}