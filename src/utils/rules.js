export function validateNumber(rule, value, callback) {
  let no = /^[0-9]*$/g;
  if(value.toString().indexOf('*')==-1){
    if (!no.test(value)) {
      callback(new Error('请输入数字'))
    } else {
      callback();
    }
  }else{
    callback()
  }
}

export function validateDecimalsNumber(rule, value, callback) {
  if (!value) callback();
  let no = /^[1-9]\d*\.\d*|[1-9]\d*$/g;
  if (!no.test(value)) {
    callback(new Error('请输入正确数字'))
  } else {
    callback();
  }
}

export function validatePositiveNumber(rule, value, callback) {
  if (!value) callback();
  let no = /^[1-9]\d*$/g;
  if (!no.test(value)) {
    callback(new Error('请输入大于0的正确数字'))
  } else {
    callback();
  }
}

export function validateNumberAndLetter(rule, value, callback) {
  let no = /^[A-Za-z0-9]+$/g;
  if(!value) callback();
  if(value.toString().indexOf('*')==-1){
    if (!no.test(value)) {
      callback(new Error('请输入数字与字母，不能输入其他字符'))
    } else {
      callback();
    }
  }else{
    callback()
  }
}

export function validateHexadecimal(rule, value, callback) {
  if (!value) callback();
  let no = /^[0-9a-fA-F]*$/g;
  if (!no.test(value)) {
    callback(new Error('请输入正确的卡号'))
  } else {
    callback();
  }
}

export function validateBirthDate(rule, value, callback) {
  if (!value) callback();
  let formatDate = new Date(value).getTime();
  if (formatDate > new Date().getTime()) {
    callback(new Error('请输入正确的日期'))
  } else {
    callback();
  }
}

export function validateMobile(rule, value, callback) {
  if (!value) callback(); 
  let no = /^1(3|4|5|6|7|8|9)\d{9}$/g;
    if (!no.test(value)) {
      callback(new Error('请输入正确的手机号码'))
    } else {
      callback();
    }
}

export function validateCitizenId(rule, value, callback) {
  if (!value) callback();
  let no = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
  if(value.toString().indexOf('*')==-1){
    if (!no.test(value)) {
      callback(new Error('请输入正确的身份证号码'))
    } else {
      callback();
    }
  }else{
    callback()
  }
}

export function validateEmoji(rule, value, callback) {
  if (!value) callback();
  let no = /(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f])|(\ud83d[\ude80-\udeff])/;
  if (no.test(value)) {
    callback(new Error('请输入正确的字符'))
  } else {
    callback();
  }
}

export function validateAsterisk(rule, value, callback) {
  if (!value) callback();
  if (value.indexOf('*') != -1) {
    callback(new Error('信息不可输入*符号'))
  } else {
    callback();
  }
}