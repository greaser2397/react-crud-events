/* global google */
import React, { useEffect, useState } from 'react';
import { Header, Segment, Button, Confirm } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedEvent, listenToSelectedEvent } from '../components/events/eventActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from '../components/forms/TextInput';
import TextArea from '../components/forms/TextArea';
import SelectInput from '../components/forms/SelectInput';
import { categoryData } from '../../api/categoryOptions';
import DateInput from '../components/forms/DateInput';
import PlaceInput from '../components/forms/PlaceInput';
import useFirestoreDoc from '../hooks/useFirestoreDoc';
import AsyncLoader from '../../layout/AsyncLoader';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  addEventToFirestore, cancelEventToggle, deleteEventInFirestore,
  listenToEventFromFirestore,
  updateEventInFirestore
} from '../../firestore/firestoreService';

function EventForm({ match, history, location }) {
  const { t } = useTranslation();
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [confirmToggleOpen, setConfirmToggleOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const dispatch = useDispatch();
  const { selectedEvent } = useSelector(state => state.event);
  const { loading, error } = useSelector(state => state.async);

  useEffect(() => {
    if (location.pathname !== '/createEvent') return;
    dispatch(clearSelectedEvent());
  }, [dispatch, location.pathname]);

  const defaultValues = selectedEvent || {
    title: '',
    category: '',
    description: '',
    city: {
      address: '',
      latLng: ''
    },
    venue: {
      address: '',
      latLng: ''
    },
    date: ''
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
    category: Yup.string().required('You must provide a category'),
    description: Yup.string().required(),
    city: Yup.object().shape({ address: Yup.string().required('City is required'), }),
    venue: Yup.object().shape({ address: Yup.string().required('Venue is required'), }),
    date: Yup.string().required(),
  });

  async function handleCancelToggle(event) {
    setConfirmToggleOpen(false);
    setLoadingCancel(true);

    try {
      await cancelEventToggle(event);
      setLoadingCancel(false);
    } catch (err) {
      setLoadingCancel(true);
      toast.error(err.message);
    }
  }

  async function handleDeleteEvent(event) {
    setConfirmDeleteOpen(false);
    setLoadingDelete(true);

    try {
      await deleteEventInFirestore(event.id);
      setLoadingDelete(false);
      history.push('/events')
    } catch (err) {
      setLoadingDelete(true);
      toast.error(err.message);
    }
  }

  useFirestoreDoc({
    shouldExecute: match.params.id !== selectedEvent?.id && location.pathname !== '/createEvent',
    query: () => listenToEventFromFirestore(match.params.id),
    data: (evt) => dispatch(listenToSelectedEvent(evt)),
    deps: [match.params.id, dispatch]
  });

  if (loading) return <AsyncLoader content='Loading event...' />
  if (error) return <Redirect to='/error' />

  return (
    <Segment clearing>
      <Formik
        enableReinitialize
        initialValues={ defaultValues }
        validationSchema={ validationSchema }
        onSubmit={ async (values, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventInFirestore(values)
              : await addEventToFirestore(values)
            setSubmitting(false);
            history.push('/events');

          } catch (err) {
            toast.error(err.message);
            setSubmitting(false);
          }
        } }
      >
        { ({ isSubmitting, dirty, isValid, values }) => (
          <Form className='ui form'>
            <Header sub color='teal' content='Event Details' />
            <TextInput name='title' placeholder={ t('form.field.title') } />
            <SelectInput name='category' placeholder={ t('form.field.category') } options={ categoryData } />
            <TextArea name='description' placeholder={ t('form.field.description') } rows={ 4 } />
            <Header sub color='teal' content='Event Location Details' />
            <PlaceInput name='city' placeholder={ t('form.field.city') } />
            <PlaceInput
              name='venue'
              placeholder={ t('form.field.venue') }
              disabled={ !values.city.latLng }
              options={ {
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000,
                types: ['establishment']
              } }
            />
            <DateInput
              name='date'
              placeholderText={ t('form.field.date') }
              timeFormat='HH:mm'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm a'
              autoComplete='off'
            />
            { selectedEvent && (
              <>
                <Button
                  loading={ loadingCancel }
                  type='button'
                  floated='left'
                  color={ selectedEvent.isCancelled ? 'green' : 'red' }
                  content={ selectedEvent.isCancelled ? 'Reactivate Event' : 'Cancel Event' }
                  onClick={ () => setConfirmToggleOpen(true) }
                />
                <Button
                  loading={ loadingDelete }
                  type='button'
                  floated='left'
                  color='red'
                  content='Delete Event'
                  onClick={ () => setConfirmDeleteOpen(true) }
                />
              </>
            ) }
            <Button
              positive
              type='submit'
              floated='right'
              loading={ isSubmitting }
              disabled={ !isValid || !dirty || isSubmitting }
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
      <Confirm
        content={ selectedEvent?.isCancelled
          ? 'This will reactivate the selected event. Are you sure?'
          : 'This will cancel the selected event. Are you sure?' }
        open={ confirmToggleOpen }
        onCancel={ () => setConfirmToggleOpen(false) }
        onConfirm={ () => handleCancelToggle(selectedEvent) }
      />
      <Confirm
        content='This will delete the selected event. Are you sure?'
        open={ confirmDeleteOpen }
        onCancel={ () => setConfirmDeleteOpen(false) }
        onConfirm={ () => handleDeleteEvent(selectedEvent) }
      />
    </Segment>
  )
}

export default EventForm;