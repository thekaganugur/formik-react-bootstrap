import { useField, useFormikContext } from 'formik';
import * as React from 'react';
import { FormCheck, FormCheckProps, FormGroup } from 'react-bootstrap';

interface FormikCheckProps extends FormCheckProps {
  name: string;
}

export function fieldToFormikCheck({
  disabled,
  name,
  id,
  ...props
}: FormikCheckProps): FormCheckProps {
  const { isSubmitting } = useFormikContext();
  const [field, meta] = useField(name);

  const fieldError = meta.error;
  const showError = meta.touched && !!fieldError;
  const [, { error }] = useField(name);

  return {
    ...props,
    ...field,
    isInvalid: showError,
    disabled: disabled ?? isSubmitting,
    feedback: error,
    id: id ?? 'check-' + id,
  };
}

export const FormikCheck = (props: FormikCheckProps) => (
  <FormGroup>
    <FormCheck {...fieldToFormikCheck(props)} />
  </FormGroup>
);

export default FormikCheck;
