export function emailValidator(email: React.InputHTMLAttributes<HTMLInputElement>['value']) {
  if (typeof email !== 'string') {
    return { isValid: false, message: '유효한 이메일 입력 부탁드립니다.' };
  }

  const emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
  if (!emailRegex.test(email)) {
    return { isValid: false, message: '이메일 형식을 지켜 주세요.' };
  }
  return { isValid: true, message: '' };
}

export function passwordValidator(
  password: React.InputHTMLAttributes<HTMLInputElement>['value'],
  form?: Record<string, any>
) {
  if (typeof password !== 'string') {
    return { isValid: false, message: '유효한 비밀번호 입력 부탁드립니다.' };
  }

  const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  if (!passwordReg.test(password)) {
    return { isValid: false, message: '비밀번호는 영어 대소문자, 숫자 포함 8자 이상입니다.' };
  }

  if (form?.confirmPassword) {
    if (password === form?.confirmPassword && password === form?.password) {
      return { isValid: true, message: '' };
    } else {
      return { isValid: false, message: '입력한 비밀번호와 비밀번호 확인 입력이 동일하지않습니다.' };
    }
  }

  return { isValid: true, message: '' };
}
