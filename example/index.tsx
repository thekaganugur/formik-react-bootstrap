import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import * as Yup from 'yup';
import { FormikControl, FormikCheck } from '../.';
import { Container, Button } from 'react-bootstrap';

const schema = Yup.object({
  email: Yup.string()
    .email()
    .required(),
  fullName: Yup.string().required(),
  gender: Yup.string(),
  terms: Yup.bool().oneOf([true]),
});

interface initial {
  email: string;
  fullName: string;
  background: string;
  gender: string;
  terms: boolean;
}

const initState: initial = {
  email: '',
  fullName: '',
  background: '',
  gender: '',
  terms: false,
};

const App = () => {
  return (
    <Container className="my-5">
      <Formik
        initialValues={initState}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ handleSubmit, isSubmitting, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            {errors.terms}
            <FormikControl name="fullName" label="Name Surname" />
            <FormikControl name="email" label="Email" />
            <FormikControl name="background" as="textarea" label="Background" />
            <FormikCheck name="terms" label="Agree to terms and conditions" />

            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
