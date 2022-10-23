export const requiredValidate = (str) => {
  if (typeof str === 'number' && !str.toString()) return '必填欄位';
  if (typeof str !== 'number' && !str) return '必填欄位';
  return '';
};

export const requiredArrayValidate = (arr) => {
  if (arr.length === 0) return '必填欄位';
  return '';
};

export const numberValidate = (str) => {
  if (window.isNaN(str)) return '必須為數字';
  return '';
};

export const minValidate = (value, minimum) => {
  if (typeof value === 'number' && value < minimum) return `最小為 ${minimum}`;
  if (typeof value === 'string' && value.length < minimum)
    return `長度最小為 ${minimum}`;
  return '';
};

export const maxValidate = (value, maximum) => {
  if (typeof value === 'number' && value > maximum) return `最大為 ${maximum}`;
  if (typeof value === 'string' && value.length > maximum)
    return `長度最大為 ${maximum}`;
  return '';
};

export const emailValidate = (str) => {
  const validateEmail = (str) => {
    return String(str)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  if (!validateEmail(str)) return '不合法 email 格式';
  return '';
};

export const dateStartBeforeEndValidate = (startDateStr, endDateStr) => {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  if (startDate.getTime() > endDate.getTime())
    return '開始時間不可大於結束時間';
  return '';
};
