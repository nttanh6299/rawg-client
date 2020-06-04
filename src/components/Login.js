import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import CustomTextField from './CustomTextField';
import { AiOutlineLoading } from 'react-icons/ai';
import withLogged from './HOCs/withLogged';

const initialValues = {
  email: '',
  password: '',
  failed: ''
};

const validationSchema = yup.object({
  email: yup.string().required('This field is required'),
  password: yup.string().required('This field is required')
});

const Login = ({ login }) => {
  const handleSubmit = async (data, actions) => {
    const { setSubmitting, setFieldError } = actions;
    const { email, password } = data;

    setSubmitting(true);
    try {
      await login(email, password);
    } catch (error) {
      console.log(error);
      setFieldError('failed', 'Unable to log in with provided credentials');
      setSubmitting(false);
    }
  };

  return (
    <div className="form">
      <h2 className="heading-1">LOGIN</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
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
            {errors && errors.failed && (
              <div
                style={{
                  color: '#f00',
                  fontSize: '1.4rem',
                  fontWeight: '100',
                  marginBottom: '1rem'
                }}
              >
                {errors.failed}
              </div>
            )}
            <button
              type={isSubmitting ? 'button' : 'submit'}
              className="btn form__submit"
            >
              {isSubmitting && (
                <AiOutlineLoading className="icon icon--loading" />
              )}
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

export default withLogged(Login);
