import ButtonCustom from '@/components/button/ButtonCustom';
import FormInputField from '@/components/Input/FormInputField';
import { showErrorToast, showSuccessToast } from '@/components/Toast/Toast';
import { CredentialService } from '@/services/Credential.service';
import type { CredentialProps } from '@/types/Credential';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import Cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

export default function RegisterIndex() {
  const { register, handleSubmit, formState } = CredentialService.useCredentialForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: CredentialService.Register,
    onSuccess: (data) => {
      const { token } = data;

      Cookie.set('token', token!, { expires: 1 });
      queryClient.invalidateQueries({ queryKey: [CredentialService.QUERY_KEY] });
      navigate('/');
      showSuccessToast('สมัครสมาชิกสำเร็จ');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const msg = error.response?.data.message ?? 'Register Fail !';
      showErrorToast(msg);
    },
  });

  const onSubmit = (formData: CredentialProps) => {
    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 via-teal-100 to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-black px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 space-y-6 border dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">สมัครสมาชิก</h2>

        <FormInputField
          label="Username"
          name="username"
          type="text"
          register={register('username')}
          error={formState.errors.username}
        />
        <FormInputField
          label="Password"
          name="password"
          type="password"
          register={register('password')}
          error={formState.errors.password}
        />
        <ButtonCustom
          BoxClass="flex justify-center"
          label="สมัครสมาชิก"
          type="submit"
          isLoading={mutation.isPending}
          disabled={mutation.isPending}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
        />

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          มีบัญชีอยู่แล้ว?{' '}
          <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400 cursor-pointer">
            เข้าสู่ระบบที่นี่
          </Link>
        </div>
      </form>
    </div>
  );
}
