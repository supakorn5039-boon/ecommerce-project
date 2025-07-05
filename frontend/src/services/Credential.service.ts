import { API_ROUTES } from '@/constants/ApiConst';
import { CredentialDefaultValue, CredentialResolver, type CredentialSchemaProps } from '@/dto/CredentialDTO';
import type { CredentialProps } from '@/types/Credential';
import { fetchClient } from '@/utils/axios';
import { useForm } from 'react-hook-form';

export const CredentialService = {
  QUERY_KEY: 'credential',

  Login: async (data: CredentialProps): Promise<CredentialProps> => {
    const res = await fetchClient.post(API_ROUTES.LOGIN, data);
    return res.data;
  },

  Register: async (data: CredentialProps): Promise<CredentialProps> => {
    const res = await fetchClient.post(API_ROUTES.REGISTER, data);
    return res.data;
  },

  useCredentialForm: (initialFormData: CredentialSchemaProps = CredentialDefaultValue) => {
    return useForm<CredentialSchemaProps>({
      defaultValues: initialFormData,
      resolver: CredentialResolver,
    });
  },
};
