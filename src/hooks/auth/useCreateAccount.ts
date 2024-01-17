import { DEFAULT_ERROR_MESSAGE } from '@/constants/api';
import { emailValidator, passwordValidator, usernameValidator } from '@/libs/client';
import { toastMessage } from '@/libs/client/toastMessage';
import { UserInput } from '@/types';

import useLogInMutation from '../api/useCreateAccountMutation';
import useForm from '../common/useForm';

interface CreateAccount extends UserInput {
  confirmPassword: string;
}

const useCreateAccount = () => {
  const { errorMessage, form, getErrorMessage, isError, onChange } = useForm<CreateAccount>(
    {
      confirmPassword: '',
      email: '',
      name: '',
      password: '',
    },
    {
      confirmPassword: passwordValidator,
      email: emailValidator,
      name: usernameValidator,
      password: passwordValidator,
    }
  );

  const { isCreateAccountMutating, mutateCreateAccount } = useLogInMutation();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isError) return toastMessage('error', errorMessage.at(0) ?? DEFAULT_ERROR_MESSAGE);

    mutateCreateAccount({
      email: form.email,
      name: form.name,
      password: form.password,
    });
  };

  return {
    form: {
      isError: {
        confirmPassword: getErrorMessage('confirmPassword'),
        email: getErrorMessage('email'),
        name: getErrorMessage('name'),
        password: getErrorMessage('password'),
      },
      onChange,
      values: form,
    },
    register: { isCreateAccountMutating, onSubmit },
  };
};

export default useCreateAccount;
