import React from 'react';
import ModalWrapper from '../modals/ModalWrapper';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../components/forms/TextInput';
import { Button, Divider, Label } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../modals/modalReducer';
import { signInWithEmail } from '../../firestore/firebaseService';
import SocialLogin from './SocialLogin';

export default function LoginForm() {
  const dispatch = useDispatch();

  return (
    <ModalWrapper size='mini' header='Sign in to React Events'>
      <Formik
        initialValues={ { email: '', password: '' } }
        validationSchema={ Yup.object({
          email: Yup.string().required().email(),
          password: Yup.string().required()
        }) }
        onSubmit={ async (values, { setSubmitting, setErrors }) => {
          try {
            await signInWithEmail(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            setSubmitting(false);
            setErrors({ auth: error.message || 'Problem with username or password' });
          }
        } }
      >
        { ({ isSubmitting, dirty, isValid, errors }) => (
          <Form className='ui form'>
            <TextInput name='email' placeholder='Email Address' />
            <TextInput name='password' type='password' placeholder='Password' />
            { errors.auth && <Label basic color='red' style={ { marginBottom: 10 } } content={ errors.auth } /> }
            <Button
              fluid
              loading={ isSubmitting }
              disabled={ isSubmitting || !dirty || !isValid }
              type='submit'
              size='large'
              color='teal'
              content='Login'
            />
            <Divider horizontal>Or</Divider>
            <SocialLogin />
          </Form>
        ) }
      </Formik>
    </ModalWrapper>
  )
}