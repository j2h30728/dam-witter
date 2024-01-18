type InputValue = React.InputHTMLAttributes<HTMLInputElement>['value'];
export type InputOrTextAreaValue = React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>['value'];
export type Validator<T> = (value: InputOrTextAreaValue, formValues?: T) => ValidationField;
export type ValidationField = { isValid: boolean; message: string };
export type FormValues = Record<string, any>;

const requiredValidator = ({
  formValues,
  nextValidator,
  value,
}: {
  formValues?: FormValues;
  nextValidator: Validator<FormValues>;
  value: InputOrTextAreaValue;
}) => {
  if (value === undefined || value === '') {
    return { isValid: false, message: '입력 값을 모두 채워주세요.' };
  }
  return nextValidator ? nextValidator(value, formValues) : { isValid: true, message: '' };
};

const validatedEmail = (email: InputValue) => {
  if (typeof email !== 'string') {
    return { isValid: false, message: '유효한 이메일 입력 부탁드립니다.' };
  }

  const emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
  if (!emailRegex.test(email)) {
    return { isValid: false, message: '이메일 형식을 지켜 주세요.' };
  }
  return { isValid: true, message: '' };
};

const validatedPassword = (password: InputValue, formValues?: Record<string, InputOrTextAreaValue>) => {
  if (typeof password !== 'string') {
    return { isValid: false, message: '유효한 비밀번호 입력 부탁드립니다.' };
  }

  const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  if (!passwordReg.test(password)) {
    return { isValid: false, message: '비밀번호는 영어 대소문자, 숫자 포함 8자 이상입니다.' };
  }

  if (formValues?.confirmPassword) {
    if (password === formValues?.confirmPassword && password === formValues?.password) {
      return { isValid: true, message: '' };
    } else {
      return { isValid: false, message: '입력한 비밀번호와 비밀번호 확인 입력이 동일하지않습니다.' };
    }
  }

  return { isValid: true, message: '' };
};

const validatedUsername = (username: InputValue) => {
  if (typeof username !== 'string') {
    return { isValid: false, message: '유효한 이름 입력 부탁드립니다.' };
  }

  if (username.trim().length < 1) {
    return { isValid: false, message: '이름은 필수 입력 값입니다.' };
  }

  const usernameReg = /^.{1,6}$/;
  if (!usernameReg.test(username)) {
    return { isValid: false, message: '이름은 최대 6자 이하 입니다' };
  }
  return { isValid: true, message: '' };
};

const validatedBio = (bio: InputOrTextAreaValue) => {
  if (typeof bio !== 'string') {
    return { isValid: false, message: '유효한 자기소개 입력 부탁드립니다.' };
  }
  if (bio.trim().length < 1 && bio.length > 100) {
    return { isValid: false, message: '자기소개는 최소 1글자 이상 최대 100자 이하 입니다.' };
  }
  return { isValid: true, message: '' };
};

const validatedBasicText = (text: InputOrTextAreaValue) => {
  if (typeof text !== 'string') {
    return { isValid: false, message: '유효한 입력 부탁드립니다.' };
  }
  return { isValid: true, message: '' };
};

export const emailValidator = (email: InputValue) => requiredValidator({ nextValidator: validatedEmail, value: email });
export const passwordValidator = (password: InputValue, formValues?: FormValues) =>
  requiredValidator({ formValues, nextValidator: validatedPassword, value: password });
export const usernameValidator = (username: InputValue) =>
  requiredValidator({ nextValidator: validatedUsername, value: username });
export const bioValidator = (bio: InputOrTextAreaValue) =>
  requiredValidator({ nextValidator: validatedBio, value: bio });
export const basicTextValidator = (text: InputOrTextAreaValue) =>
  requiredValidator({ nextValidator: validatedBasicText, value: text });
