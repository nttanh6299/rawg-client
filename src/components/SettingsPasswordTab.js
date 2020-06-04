import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import CustomTextField from './CustomTextField';
import { AiOutlineLoading } from 'react-icons/ai';
import { toast } from 'react-toastify';

const propTypes = {
  currentUser: PropTypes.object
};

const defaultProps = {};

const initialValues = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
  error: ''
};

const validationSchema = yup.object({
  oldPassword: yup.string().required('This field is required'),
  newPassword: yup
    .string()
    .required('This field is required')
    .min(6, 'This field min 6 characters'),
  confirmNewPassword: yup
    .string()
    .required('This field is required')
    .when('newPassword', {
      is: val => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Both password need to be the same')
    })
});

const SettingsPasswordTab = ({ changePassword }) => {
  const handleSubmit = async (data, actions) => {
    const { setSubmitting, setFieldError, resetForm } = actions;
    const { oldPassword, newPassword } = data;

    setSubmitting(true);
    try {
      const error = await changePassword(oldPassword, newPassword);

      if (error) {
        const [name, msg] = error.split('-');
        setFieldError(name, msg);
      } else {
        resetForm();
        toast.dark('🦄 Change password successfully!', {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="profile">
      <div className="form">
        <h2 className="heading-1">CHANGE MY PASSWORD</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form className="form__form">
              <CustomTextField
                type="password"
                name="oldPassword"
                className="form__input"
                placeholder="Old password"
              />
              <CustomTextField
                type="password"
                name="newPassword"
                className="form__input"
                placeholder="New Password"
              />
              <CustomTextField
                type="password"
                name="confirmNewPassword"
                className="form__input"
                placeholder="New password confirmation"
              />
              {errors['error'] && (
                <span
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: '100',
                    color: '#f00'
                  }}
                >
                  {errors['error']}
                </span>
              )}
              <button
                type={isSubmitting ? 'button' : 'submit'}
                className="btn form__submit"
              >
                {isSubmitting && (
                  <AiOutlineLoading className="icon icon--loading" />
                )}
                SAVE CHANGES
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

SettingsPasswordTab.propTypes = propTypes;
SettingsPasswordTab.defaultProps = defaultProps;

export default SettingsPasswordTab;
