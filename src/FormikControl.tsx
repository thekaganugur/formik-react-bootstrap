import { useField, useFormikContext } from 'formik';
import * as React from 'react';
import {
  FormControl,
  FormControlProps,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
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

export function fieldToFormControl({
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
    ...field,
    ...props,
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

      <FormControl as={props.as} {...fieldToFormControl(props)}>
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
