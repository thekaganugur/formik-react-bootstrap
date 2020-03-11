import { Form, Formik } from 'formik';
import * as React from 'react';
import 'react-app-polyfill/ie11';
import { Button, Container } from 'react-bootstrap';
import * as ReactDOM from 'react-dom';
import * as Yup from 'yup';
import { FormikCheck, FormikControl } from '../.';

const schema = Yup.object({
  email: Yup.string()
    .email()
    .required(),
  fullName: Yup.string().required(),
  gender: Yup.string(),
});

interface initial {
  email: string;
  fullName: string;
  background: string;
  gender: string;
  checkbox: number;
}

const initState: initial = {
  email: '',
  fullName: '',
  background: '',
  gender: '',
  checkbox: 1,
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
        {({ handleSubmit, isSubmitting }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <FormikControl name="fullName" label="Name Surname" />
            <FormikControl name="email" label="Email" />
            <FormikControl name="background" as="textarea" label="Background" />
            <FormikCheck name="radio" label="Check box 1" value="1" />
            <FormikCheck
              name="checkbox"
              label="Check box 2"
              type="radio"
              value="2"
            />

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
