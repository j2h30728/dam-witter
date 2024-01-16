import { DEFAULT_ERROR_MESSAGE } from '@/constants/api';
import { emailValidator, passwordValidator } from '@/libs/client';
import { toastMessage } from '@/libs/client/toastMessage';
import { UserInput } from '@/types';

import useLoginMutation from '../api/useLogInMutation';
import useForm from '../common/useForm';

const useLogIn = () => {
  const { isLoginMutating, mutateLogIn } = useLoginMutation();

  const { errorMessage, errors, form, isError, onChange } = useForm<Pick<UserInput, 'email' | 'password'>>(
    { email: '', password: '' },
    { email: emailValidator, password: passwordValidator }
  );

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isError) return toastMessage('error', errorMessage.at(0) ?? DEFAULT_ERROR_MESSAGE);
    mutateLogIn({ email: form.email, password: form.password });
  };

  return {
    form: {
      isError: {
        email: form.email && !errors.email.isValid && errors.email.message,
        name: form.name && !errors.name.isValid && errors.name.message,
        password: form.password && !errors.password.isValid && errors.password.message,
      },
      onChange,
      values: form,
    },
    login: { isLoginMutating, onSubmit },
  };
};

export default useLogIn;
