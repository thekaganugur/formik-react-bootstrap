import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Formik, Form, Field } from 'formik';
import { FormikControl } from '../.';

interface initial {
  email: string | undefined;
}

const initState: initial = {
  email: '',
};

const App = () => {
  return (
    <div>
      <Formik
        initialValues={initState}
        // validate={(values: initial) => {
        //   const errors: initial = { email: undefined };
        //   if (!values.email) {
        //     errors.email = 'Required';
        //   } else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //   ) {
        //     errors.email = 'Invalid email address';
        //   }
        //   return errors;
        // }}
        onSubmit={(values, { setSubmitting }) => {
          console.log('aaaaaaaaaaa');

          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Field as={FormikControl} name="email" label="Email" />
            {/* <Field as={FormikControl} ass="select" name="email" label="Email">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </Field> */}

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
