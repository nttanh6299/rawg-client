import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import CustomTextField from './CustomTextField';
import { AiOutlineLoading } from 'react-icons/ai';
import withLogged from './HOCs/withLogged';

const initialValues = {
  email: '',
  username: '',
  password: '',
  passwordConfirmation: ''
};

const validationSchema = yup.object({
  email: yup
    .string()
    .required('This field is required')
    .email('This field must be email'),
  username: yup
    .string()
    .required('This field is required')
    .min(6, 'This field min 6 characters')
    .max(15, 'This field max 15 characters'),
  password: yup
    .string()
    .required('This field is required')
    .min(6, 'This field min 6 characters'),
  passwordConfirmation: yup
    .string()
    .required('This field is required')
    .when('password', {
      is: val => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref('password')], 'Both password need to be the same')
    })
});

const Signup = ({ signUp }) => {
  const handleSubmit = async (data, actions) => {
    const { setSubmitting, setFieldError } = actions;
    const { email, password, username } = data;

    setSubmitting(true);
    try {
      const error = await signUp(email, username, password);
      if (error) {
        const [name, msg] = error.split('-');
        setFieldError(name, msg);
      }
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="form">
      <h2 className="heading-1">SIGN UP</h2>
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
              type="text"
              name="username"
              className="form__input"
              placeholder="Username"
            />
            <CustomTextField
              type="password"
              name="password"
              className="form__input"
              placeholder="Password"
            />
            <CustomTextField
              type="password"
              name="passwordConfirmation"
              className="form__input"
              placeholder="Confirm password"
            />
            <button
              type={isSubmitting ? 'button' : 'submit'}
              className="btn form__submit"
            >
              {isSubmitting && (
                <AiOutlineLoading className="icon icon--loading" />
              )}
              SIGN UP
            </button>
          </Form>
        )}
      </Formik>
      <Link style={{ color: '#fff' }} to="/login">
        Already have an account? Login.
      </Link>
    </div>
  );
};

export default withLogged(Signup);
