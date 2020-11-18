import { camelize } from './helpers';

export const tratarErrosForm = (errors, form) => {
  if (!errors) return;

  const errorsForm = [];

  Object.keys(errors).forEach((key) => {
    let keyAux = key.toLowerCase();

    if (/\[(\w+)\]/.test(key)) {
      const options = key.split('.');
      const position = options[0].split('[');

      keyAux = [
        camelize(position[0]),
        parseInt(position[1].substring(0, position[1].length - 1)),
        options[1].toLowerCase(),
      ];
    }

    errorsForm.push({
      name: keyAux,
      errors: errors[key],
    });
  });

  form.setFields(errorsForm);
};
