import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import * as Constants from '../../constants';

export default function validateInput(data) {
    let errors = {};
    //Define validation rules
    if (Validator.isEmpty(data.username)) {
        errors.username = Constants.ERROR_FIELD_REQUIRED;
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = Constants.ERROR_FIELD_REQUIRED;
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = Constants.ERROR_INVALID_EMAIL;
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = Constants.ERROR_FIELD_REQUIRED;
    }
    if (Validator.isEmpty(data.passwordConfirmation)) {
        errors.passwordConfirmation = Constants.ERROR_FIELD_REQUIRED;
    }
    if (!Validator.equals(data.password, data.passwordConfirmation)) {
        errors.passwordConfirmation = Constants.ERROR_PASSWORD_MISMATCH;
    }
    if (Validator.isEmpty(data.timezone)) {
        errors.timezone = Constants.ERROR_FIELD_REQUIRED;
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
