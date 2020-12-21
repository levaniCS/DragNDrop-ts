namespace App {
  // Validation
  export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  export function validate(validatableInput: Validatable) {
    let isValid = true;

    // Required: true
    if(validatableInput.required) {
      isValid = isValid && validatableInput.value.toString().trim().length !==0
    } 

    // minLength: '5'
    if(
      validatableInput.minLength != null &&
      validatableInput.minLength && 
      typeof validatableInput.value === 'string'
      ) {
      isValid = isValid && validatableInput.value.length >= validatableInput.minLength
    } 

    // maxLength: '10'
    if(
      validatableInput.minLength != null &&
      validatableInput.maxLength && 
      typeof validatableInput.value === 'string'
      ) {
      isValid = isValid && validatableInput.value.length <= validatableInput.maxLength
    }


    // min: 2
    if(validatableInput.min != null && typeof validatableInput.value === 'number') {
      isValid = isValid && validatableInput.value >= validatableInput.min
    }

    // max: 4
    if(validatableInput.max != null && typeof validatableInput.value === 'number') {
      isValid = isValid && validatableInput.value <= validatableInput.max
    }

    return isValid;
  }
}