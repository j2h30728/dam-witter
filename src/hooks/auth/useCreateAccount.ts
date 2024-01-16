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
  const { errorMessage, errors, form, isError, onChange } = useForm<CreateAccount>(
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
        confirmPassword: form.confirmPassword && !errors.confirmPassword.isValid && errors.confirmPassword.message,
        email: form.email && !errors.email.isValid && errors.email.message,
        name: form.name && !errors.name.isValid && errors.name.message,
        password: form.password && !errors.password.isValid && errors.password.message,
      },
      onChange,
      values: form,
    },
    register: { isCreateAccountMutating, onSubmit },
  };
};

export default useCreateAccount;
