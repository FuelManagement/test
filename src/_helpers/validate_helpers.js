export const validate = (val, rules, connectedValue) => {
    let isValid = true;
    for (let rule in rules) {
      switch (rule) {
        case "isEmail":
          isValid = isValid && emailValidator(val);
          break;
        case "isPhone":
          isValid = isValid && phoneValidator(val);
          break;
        case "isDate":
          isValid = isValid && dateValidator(val);
          break;
        case "isName":
          isValid = isValid && nameValidator(val);
          break;
        case "isRole":
          isValid = isValid && roleValidator(val);
          break;
        case "validPassword":
          isValid = isValid && passwordValidator(val);
          break;
        case "minLength":
          isValid = isValid && minLengthValidator(val, connectedValue[rule]);
          break;
          case "maxLength":
          isValid = isValid && maxLengthValidator(val, connectedValue[rule]);
          break;
          case "isNumber":
              isValid = isValid && numberValidator(val);
              break;
        case "equalTo":
          isValid = isValid && equalToValidator(val, connectedValue[rule]);
          break;
        case "notEmpty":
          isValid = isValid && notEmptyValidator(val);
          break;
        case "isGreaterThan":
          isValid = isValid && greaterThan(val, connectedValue[rule]);
          break;
        case "requiredSelectValidator":
          isValid = isValid && requiredSelectValidator(val);
          break;
        case "requiredBoolean":
          isValid = isValid && val;
          break;
        case "notEmptyArray":
          isValid = isValid && notEmptyArray(val);
          break;
        case "minArrayLength":
          isValid = isValid && minArrayLengthValidator(val, connectedValue[rule]);
          break;
        default:
          isValid = true;
      }
    }
    return isValid;
  };
  
  const emailValidator = val => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
      val
    );
  };

  const phoneValidator = val => {
    return val.match(/^\(?([0-9]{2,3})\)?[-. ]?([0-9]{3,4})[-. ]?([0-9]{4})$/);
  };
  const nameValidator = val => {
    if (val.trim() === "") return true;
    return /^[0-9a-zA-Z\ .-]+$/.test(val);
  };
  const numberValidator = val => {
    if (val.trim() === "") return true;
    return !isNaN(val);
  };
  const roleValidator = val => {
    if (val.trim() === "") return true;
    return /^[0-9a-zA-Z\ ]+$/.test(val);
  };
  const passwordValidator = val => {
    return val.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{6,30}$/
    );
  };
  const dateValidator = val => {
    return val.match(
      /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/
    );
  };
  const minLengthValidator = (val, minLength) => {
    return val.length >= minLength;
  };
  const maxLengthValidator = (val, maxLength) => {
    return val.length <= maxLength;
  };
  const equalToValidator = (val, checkValue) => {
    return val === checkValue;
  };
  const greaterThan = (val, checkValue) => {
    return val > checkValue;
  };
  const notEmptyValidator = val => {
    return val.trim() !== "";
  };
  const notEmptyArray = val => {
    return val.length > 0;
  };
  const requiredSelectValidator = val => {
    return val.trim() !== "" && val.trim() !== "-1" && val.trim() !== -1;
  };
  const minArrayLengthValidator = (val, minLength) => {
    return val.length >= minLength;
  };
  export default validate;
  