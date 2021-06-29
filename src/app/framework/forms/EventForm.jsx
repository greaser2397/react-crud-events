import React from 'react';
import { Header, Segment, Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import cuid from 'cuid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, updateEvent } from '../components/events/eventActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from '../components/forms/TextInput';
import TextArea from '../components/forms/TextArea';
import SelectInput from '../components/forms/SelectInput';
import { categoryData } from '../../api/categoryOptions';
import DateInput from '../components/forms/DateInput';

function EventForm({ match, history }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const selectedEvent = useSelector(state => state.event.events.find(e => e.id === match.params.id));

  const defaultValues = selectedEvent || {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: ''
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
    category: Yup.string().required('You must provide a category'),
    description: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
    date: Yup.string().required(),
  });

  return (
    <Segment clearing>
      <Formik
        initialValues={ defaultValues }
        validationSchema={ validationSchema }
        onSubmit={ values => {
          selectedEvent
            ? dispatch(updateEvent({ ...selectedEvent, ...values }))
            : dispatch(createEvent({
              ...values,
              id: cuid(),
              hostedBy: 'Bob',
              attendees: [],
              hostPhotoURL: '/assets/user.png'
            }));
          history.push('/events')
        } }
      >
        { ({ isSubmitting, dirty, isValid }) => (
          <Form className='ui form'>
            <Header sub color='teal' content='Event Details'/>
            <TextInput name='title' placeholder={ t('form.field.title') }/>
            <SelectInput name='category' placeholder={ t('form.field.category') } options={ categoryData }/>
            <TextArea name='description' placeholder={ t('form.field.description') }/>
            <Header sub color='teal' content='Event Location Details'/>
            <TextInput name='city' placeholder={ t('form.field.city') }/>
            <TextInput name='venue' placeholder={ t('form.field.venue') }/>
            <DateInput
              name='date'
              placeholderText={ t('form.field.date') }
              timeFormat='HH:mm'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm a'
            />
            <Button
              positive
              type='submit'
              floated='right'
              loading={ isSubmitting }
              disabled={ isSubmitting || !dirty || !isValid }
              content={ t(`form.button.${ selectedEvent ? 'update' : 'submit' }`) }
            />
            <Button
              type='submit'
              floated='right'
              disabled={ isSubmitting }
              content={ t('form.button.cancel') }
              onClick={ history.goBack }
            />
          </Form>
        ) }
      </Formik>
    </Segment>
  )
}

export default EventForm;