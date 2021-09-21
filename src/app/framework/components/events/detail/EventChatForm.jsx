import React from 'react';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import { addEventChatComment } from '../../../../firestore/firebaseService';
import { Loader } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export default function EventChatForm({ eventId, parentId, closeForm }) {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={ { comment: '' } }
      validationSchema={ Yup.object({
        comment: Yup.string().required()
      }) }
      onSubmit={ async (values, { setSubmitting, resetForm }) => {
        try {
          await addEventChatComment(eventId, { ...values, parentId });
          resetForm();
        } catch (error) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
          closeForm();
        }
      } }
    >
      { ({ isSubmitting, handleSubmit, isValid }) => (
        <Form className='ui form'>
          <Field name='comment'>
            { ({ field }) => (
              <div style={ { position: 'relative' } }>
                <Loader active={ isSubmitting } />
                <textarea
                  rows='2' { ...field }
                  placeholder={ t('event.chat.textareaHint', {
                    defaultValue: 'Please enter your comment (ENTER to submit, SHIFT + ENTER for a new line)'
                  }) }
                  onKeyPress={ e => {
                    if (e.key === 'Enter' && e.shiftKey) return;
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      isValid && handleSubmit();
                    }
                  } }
                />
              </div>
            ) }
          </Field>
        </Form>
      ) }
    </Formik>
  )
}