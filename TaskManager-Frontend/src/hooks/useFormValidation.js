import { zodResolver } from '@hookform/resolvers/zod';

export const useFormValidation = (schema) => {
  return zodResolver(schema);
};
