import { useField, useFormikContext } from 'formik';
import * as React from 'react';
import { FormCheck, FormCheckProps, FormGroup } from 'react-bootstrap';
import { ReplaceProps } from 'react-bootstrap/helpers';

interface FormikCheckBaseProps extends FormCheckProps {
  name: string;
}

type FormikCheckProps<As extends React.ElementType = 'input'> = {
  as?: As;
} & ReplaceProps<As, FormikCheckBaseProps>;

export function fieldToFormCheck({
  disabled,
  custom,
  id,
  name,
  ...props
}: FormikCheckProps): FormCheckProps {
  const { isSubmitting } = useFormikContext();
  const [field, meta] = useField(name);

  const fieldError = meta.error;
  const showError = meta.touched && !!fieldError;
  const [, { error }] = useField(name);

  if (props.value && field.value) {
    field.checked = props.value.toString() === field.value.toString();
  }

  return {
    ...field,
    ...props,
    disabled: disabled ?? isSubmitting,
    custom: custom ?? true,
    id: id ?? `check-${name}${props.value ? '-' + props.value : ''}`,
    isInvalid: showError,
    feedback: error,
  };
}

export const FormikCheck = <As extends React.ElementType = 'input'>(
  props: FormikCheckProps<As>
) => (
  <FormGroup>
    <FormCheck {...fieldToFormCheck(props)} />
  </FormGroup>
);

export default FormikCheck;
