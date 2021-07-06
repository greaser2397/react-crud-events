import React from 'react';
import ModalWrapper from '../modals/ModalWrapper';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../components/forms/TextInput';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../modals/modalReducer';
import { signInWithEmail } from '../../firestore/firebaseService';

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
        onSubmit={ async (values, { setSubmitting }) => {
          try {
            await signInWithEmail(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            setSubmitting(false);
            console.log(error)
          }
        } }
      >
        { ({ isSubmitting, dirty, isValid }) => (
          <Form className='ui form'>
            <TextInput name='email' placeholder='Email Address' />
            <TextInput name='password' type='password' placeholder='Password' />
            <Button
              fluid
              loading={ isSubmitting }
              disabled={ isSubmitting || !dirty || !isValid }
              type='submit'
              size='large'
              color='teal'
              content='Login'
            />
          </Form>
        ) }
      </Formik>
    </ModalWrapper>
  )
}