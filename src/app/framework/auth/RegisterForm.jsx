import React from 'react';
import ModalWrapper from '../modals/ModalWrapper';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../components/forms/TextInput';
import { Button, Divider, Label } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../modals/modalReducer';
import { registerInFirebase } from '../../firestore/firebaseService';
import SocialLogin from './SocialLogin';
import { useTranslation } from 'react-i18next';

export default function RegisterForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <ModalWrapper
      size='mini'
      header={ t('modal.message.registerInApp', { defaultValue: 'Register to React Events' }) }
    >
      <Formik
        initialValues={ { displayName: '', email: '', password: '' } }
        validationSchema={ Yup.object({
          displayName: Yup.string().required(),
          email: Yup.string().required().email(),
          password: Yup.string().required()
        }) }
        onSubmit={ async (values, { setSubmitting, setErrors }) => {
          try {
            await registerInFirebase(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            setErrors({ auth: error.message });
            setSubmitting(false);
          }
        } }
      >
        { ({ isSubmitting, dirty, isValid, errors }) => (
          <Form className='ui form'>
            <TextInput
              name='displayName'
              placeholder={ t('form.field.displayName', { defaultValue: 'Display Name' }) }
            />
            <TextInput
              name='email'
              placeholder={ t('form.field.email', { defaultValue: 'Email Address' }) }
            />
            <TextInput
              name='password'
              type='password'
              placeholder={ t('form.field.password', { defaultValue: 'Password' }) }
            />
            { errors.auth && <Label basic color='red' style={ { marginBottom: 10 } } content={ errors.auth } /> }
            <Button
              fluid
              loading={ isSubmitting }
              disabled={ isSubmitting || !dirty || !isValid }
              type='submit'
              size='large'
              color='teal'
              content={ t('form.button.register', { defaultValue: 'Register' }) }
            />
            <Divider horizontal>Or</Divider>
            <SocialLogin />
          </Form>
        ) }
      </Formik>
    </ModalWrapper>
  )
}