export const changeConstant = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let value = input.value;

  const filteredValue = value.replace(/[^0-9\-]/g, '');

  if (filteredValue.indexOf('-') > 0) {
    value =
      filteredValue.slice(0, filteredValue.indexOf('-') + 1) +
      filteredValue.slice(filteredValue.indexOf('-') + 1).replace(/-/g, '');
  } else {
    value = filteredValue;
  }

  return value
};