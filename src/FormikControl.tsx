import * as React from 'react';
import {
  FormControlProps,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import { FieldProps, useFormikContext, useField } from 'formik';

interface FormikControlProps extends FieldProps, FormControlProps {
  ass: any;
  name: string;
  label?: string;
  noFormGroup?: boolean;
  children?: React.ReactNode;
}

export function fieldToFormikControl({
  noFormGroup,
  children,
  label,
  disabled,
  name,
  ...props
}: FormikControlProps): FormControlProps {
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
}: FormikControlProps): string | undefined {
  const [, { error }] = useField(name);
  return error;
}

export const FormikControl = (props: FormikControlProps) => {
  const Core = (
    <>
      <FormLabel>{props.label}</FormLabel>
      <FormControl as={props.ass} {...fieldToFormikControl(props)}>
        {props.children}
      </FormControl>
      <FormControl.Feedback type="invalid">
        {fieldToFeedBack(props)}
      </FormControl.Feedback>
    </>
  );

  return props.noFormGroup ? Core : <FormGroup>{Core}</FormGroup>;
};

// export default FormikControl;
