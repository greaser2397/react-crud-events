import React from 'react';
import { Button, Header, Label, Segment } from 'semantic-ui-react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../components/forms/TextInput';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateUserPassword } from '../../firestore/firebaseService';

export default function AccountPage() {
  const { currentUser } = useSelector(state => state.auth);

  return (
    <Segment>
      <Header dividing size='large' content='Account' />
      { currentUser.providerId === 'password' && (
        <>
          <Header color='teal' sub content='Change Password' />
          <p>Use this form to change your password</p>
          <Formik
            initialValues={ { newPassword: '', newPasswordConfirm: '' } }
            validationSchema={ Yup.object({
              newPassword: Yup.string().required('Password is required'),
              newPasswordConfirm: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords do not match')
            }) }
            onSubmit={ async (values, { setSubmitting, setErrors }) => {
              try {
                await updateUserPassword(values);
              } catch (error) {
                setErrors({ auth: error.message });
              } finally {
                setSubmitting(false);
              }
            } }
          >
            { ({ isSubmitting, dirty, isValid, errors }) => (
              <Form className='ui form'>
                <TextInput name='newPassword' type='password' placeholder='New Password' />
                <TextInput name='newPasswordConfirm' type='password' placeholder='Confirm Password' />
                { errors.auth && <Label basic color='red' style={ { marginBottom: 10 } } content={ errors.auth } /> }
                <Button
                  style={ { display: 'block' } }
                  loading={ isSubmitting }
                  positive type='submit' size='large'
                  disabled={ !isValid || isSubmitting || !dirty }
                  content='Update Password'
                />
              </Form>
            ) }
          </Formik>
        </>
      ) }
      { currentUser.providerId === 'facebook.com' && (
        <>
          <Header color='teal' sub content='Facebook Account' />
          <p>Please visit Facebook to update your account</p>
          <Button icon='facebook' color='facebook' as={ Link } to='https://facebook.com' content='Go to Facebook' />
        </>
      ) }
      { currentUser.providerId === 'google.com' && (
        <>
          <Header color='teal' sub content='Google Account' />
          <p>Please visit Google to update your account</p>
          <Button icon='google' color='google plus' as={ Link } to='https://google.com' content='Go to Google' />
        </>
      ) }
    </Segment>
  )
}