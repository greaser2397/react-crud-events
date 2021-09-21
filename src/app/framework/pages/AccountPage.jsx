import React from 'react';
import { Button, Header, Label, Segment } from 'semantic-ui-react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../components/forms/TextInput';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateUserPassword } from '../../firestore/firebaseService';
import { useTranslation } from 'react-i18next';

export default function AccountPage() {
  const { t } = useTranslation();
  const { currentUser } = useSelector(state => state.auth);

  return (
    <Segment>
      <Header dividing size='large' content='Account' />
      { currentUser.providerId === 'password' && (
        <>
          <Header
            sub
            color='teal'
            content={ t('account.header.changePassword', { defaultValue: 'Change Password' }) }
          />
          <p>
            { t('account.message.changePassword', {
              defaultValue: 'Use this form to change your password'
            }) }
          </p>
          <Formik
            initialValues={ { newPassword: '', newPasswordConfirm: '' } }
            validationSchema={ Yup.object({
              newPassword: Yup.string().required(t('form.message.passwordRequired', {
                defaultValue: 'Password is required'
              })),
              newPasswordConfirm: Yup.string().oneOf([Yup.ref('newPassword'), null],
                t('form.message.inconsistentPasswords', { defaultValue: 'Passwords do not match' }))
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
                <TextInput
                  name='newPassword'
                  type='password'
                  placeholder={ t('form.field.newPassword', { defaultValue: 'New Password' }) }
                />
                <TextInput
                  name='newPasswordConfirm'
                  type='password'
                  placeholder={ t('form.field.confirmPassword', { defaultValue: 'Confirm Password' }) }
                />
                { errors.auth && <Label basic color='red' style={ { marginBottom: 10 } } content={ errors.auth } /> }
                <Button
                  style={ { display: 'block' } }
                  loading={ isSubmitting }
                  positive type='submit' size='large'
                  disabled={ !isValid || isSubmitting || !dirty }
                  content={ t('form.button.updatePassword', { defaultValue: 'Update Password' }) }
                />
              </Form>
            ) }
          </Formik>
        </>
      ) }
      { currentUser.providerId === 'facebook.com' && (
        <>
          <Header
            sub
            color='teal'
            content={ t('account.header.facebookAccount', { defaultValue: 'Facebook Account' }) }
          />
          <p>
            { t('account.message.visitFacebook', {
              defaultValue: 'Please visit Facebook to update your account'
            }) }
          </p>
          <Button
            icon='facebook'
            color='facebook'
            as={ Link }
            to='https://facebook.com'
            content={ t('account.button.toFacebook', { defaultValue: 'Go to Facebook' }) }
          />
        </>
      ) }
      { currentUser.providerId === 'google.com' && (
        <>
          <Header
            sub
            color='teal'
            content={ t('account.header.googleAccount', { defaultValue: 'Google Account' }) }
          />
          <p>
            { t('account.message.visitGoogle', {
              defaultValue: 'Please visit Google to update your account'
            }) }
          </p>
          <Button
            icon='google'
            color='google plus'
            as={ Link }
            to='https://google.com'
            content={ t('account.button.toGoogle', { defaultValue: 'Go to Google' }) }
          />
        </>
      ) }
    </Segment>
  )
}