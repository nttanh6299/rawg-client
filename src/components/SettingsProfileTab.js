import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import CustomTextField from './CustomTextField';
import CustomImageInput from './CustomImageInput';
import { AiOutlineLoading } from 'react-icons/ai';
import { FILE_SIZE, SUPPORTED_FORMATS } from '../constants/GlobalConstants';
import { toast } from 'react-toastify';

const propTypes = {
  currentUser: PropTypes.object
};

const defaultProps = {};

const initialValues = {
  photo: undefined,
  username: ''
};

const validationSchema = yup.object({
  photo: yup
    .mixed()
    .test(
      'fileSize',
      'File too large',
      value => !value || value.size <= FILE_SIZE
    )
    .test(
      'fileFormat',
      'Unsupported format',
      value => !value || SUPPORTED_FORMATS.includes(value.type)
    ),
  username: yup
    .string()
    .trim()
    .required('This field is required')
    .min(6, 'This field min 6 characters')
    .max(15, 'This field max 15 characters')
});

const SettingsProfileTab = ({ currentUser, updateUser }) => {
  const { displayName } = currentUser || {};

  const handleSubmit = async (data, actions) => {
    const { setSubmitting, setFieldError } = actions;
    const { photo, username } = data;

    if (!photo && displayName === username) {
      return;
    }

    setSubmitting(true);
    try {
      const error = await updateUser(data);
      if (error) {
        const [name, msg] = error.split('-');
        setFieldError(name, msg);
      } else {
        toast.dark('🦄 Update profile successfully!', {
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
        <h2 className="heading-1">MY PROFILE</h2>
        <Formik
          initialValues={(initialValues, { username: displayName || '' })}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, setFieldValue }) => (
            <Form className="form__form">
              <Field
                name="photo"
                component={CustomImageInput}
                setFieldValue={setFieldValue}
                errorMessage={errors['photo'] ? errors['photo'] : undefined}
                touched={touched['photo']}
              />
              <CustomTextField
                type="text"
                name="username"
                className="form__input"
                placeholder="Username"
              />
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

SettingsProfileTab.propTypes = propTypes;
SettingsProfileTab.defaultProps = defaultProps;

export default SettingsProfileTab;
