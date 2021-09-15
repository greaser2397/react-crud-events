import { Form, Formik } from 'formik';
import TextInput from '../forms/TextInput';
import TextArea from '../forms/TextArea';
import * as Yup from 'yup';
import { Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { updateUserProfile } from '../../../firestore/firestoreService';
import { useTranslation } from 'react-i18next';

export default function ProfileForm({ profile }) {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={ {
        displayName: profile.displayName || '',
        description: profile.description || ''
      } }
      validationSchema={ Yup.object({
        displayName: Yup.string().required()
      }) }
      onSubmit={ async (values, { setSubmitting }) => {
        try {
          await updateUserProfile(values);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
        }
      } }
    >
      { ({ isSubmitting, dirty, isValid }) => (
        <Form className='ui form'>
          <TextInput
            name='displayName'
            placeholder={ t('profile.field.displayName', { defaultValue: 'Display Name' }) }
          />
          <TextArea
            name='description'
            placeholder={ t('profile.field.description', { defaultValue: 'Description' }) }
          />
          <Button
            loading={ isSubmitting }
            disabled={ isSubmitting || !dirty || !isValid }
            floated='right'
            positive size='large'
            content={ t('profile.button.updateProfile', { defaultValue: 'Update Profile' }) }
          />
        </Form>
      ) }
    </Formik>
  )
}