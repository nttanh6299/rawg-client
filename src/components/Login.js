import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import CustomTextField from './CustomTextField';
import { AiOutlineLoading } from 'react-icons/ai';

const initialValues = {
  email: '',
  password: ''
};

const validationSchema = yup.object({
  email: yup.string().required('This field is required'),
  password: yup.string().required('This field is required')
});

const Login = () => {
  const handleSubmit = (data, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    setTimeout(() => {
      console.log(data);
      setSubmitting(false);
      resetForm();
    }, 4000);
  };

  return (
    <div className="form">
      <h2 className="heading-1">LOGIN</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form__form">
            <CustomTextField
              type="email"
              name="email"
              className="form__input"
              placeholder="Email"
            />
            <CustomTextField
              type="password"
              name="password"
              className="form__input"
              placeholder="Password"
            />
            <button
              type={isSubmitting ? 'button' : 'submit'}
              className="btn form__submit"
            >
              {isSubmitting && <AiOutlineLoading className="form__loading" />}
              LOGIN
            </button>
          </Form>
        )}
      </Formik>
      <Link style={{ color: '#fff' }} to="/signup">
        Don't have an account? Sign up.
      </Link>
      <Link style={{ color: '#fff' }} to="/password-recovery">
        Forgot your password?
      </Link>
    </div>
  );
};

export default Login;
