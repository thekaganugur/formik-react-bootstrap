import * as React from 'react';
import {
  FormControlProps,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import { useFormikContext, useField } from 'formik';
import { ReplaceProps } from 'react-bootstrap/helpers';

interface FormikControlBaseProps extends FormControlProps {
  name: string;
  label?: string;
  noFormGroup?: boolean;
  children?: React.ReactNode;
}

type FormikControlProps<As extends React.ElementType = 'input'> = {
  as?: As;
} & ReplaceProps<As, FormikControlBaseProps>;

export function fieldToFormikControl({
  noFormGroup,
  children,
  label,
  disabled,
  name,
  ...props
}: FormikControlBaseProps): FormControlProps {
  const { isSubmitting } = useFormikContext();
  const [field, meta] = useField(name);

  const fieldError = meta.error;
  const showError = meta.touched && !!fieldError;

  return {
    ...props,
    ...field,
    isInvalid: showError,
    disabled: disabled ?? isSubmitting,
  };
}

export function fieldToFeedBack({
  name,
}: FormikControlBaseProps): string | undefined {
  const [, { error }] = useField(name);
  return error;
}

export const FormikControl = <As extends React.ElementType = 'input'>(
  props: FormikControlProps<As>
) => {
  const Core = (
    <>
      <FormLabel>{props.label}</FormLabel>

      <FormControl as={props.as} {...fieldToFormikControl(props)}>
        {props.children}
      </FormControl>

      <FormControl.Feedback type="invalid">
        {fieldToFeedBack(props)}
      </FormControl.Feedback>
    </>
  );

  return props.noFormGroup ? Core : <FormGroup>{Core}</FormGroup>;
};

export default FormikControl;
