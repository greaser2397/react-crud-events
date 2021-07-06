import { Form, Formik } from 'formik';
import TextInput from '../forms/TextInput';
import TextArea from '../forms/TextArea';
import * as Yup from 'yup';
import { Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { updateUserProfile } from '../../../firestore/firestoreService';

export default function ProfileForm({ profile }) {
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
          <TextInput name='displayName' placeholder='Display Name' />
          <TextArea name='description' placeholder='Description' />
          <Button
            loading={ isSubmitting }
            disabled={ isSubmitting || !dirty || !isValid }
            floated='right'
            positive size='large'
            content='Update Profile'
          />
        </Form>
      ) }
    </Formik>
  )
}