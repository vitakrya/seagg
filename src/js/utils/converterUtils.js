export let toFahrenheit = (celsius) => {
  return (celsius * 9 / 5) + 32;
};

export let toCelsius = (fahrenheit) => {
  return (fahrenheit - 32) * 5 / 9;
};

export let tryConvert = (value, convert) => {
  const input = parseFloat(value);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
};

let converterUtils = {
  toFahrenheit: toFahrenheit,
  toCelsius: toCelsius,
  tryConvert: tryConvert
};

export default converterUtils;