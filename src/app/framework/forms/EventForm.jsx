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

  if (loading) return (
    <AsyncLoader content={ t('event.loading', { defaultValue: 'Loading event...' }) } />
  )
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
            <Header
              sub
              color='teal'
              content={ t('event.header.details', { defaultValue: 'Event Details' }) }
            />
            <TextInput
              name='title'
              placeholder={ t('event.field.title', { defaultValue: 'Title' }) }
            />
            <SelectInput
              name='category'
              placeholder={ t('event.field.category', { defaultValue: 'Category' }) }
              options={ categoryData }
            />
            <TextArea
              name='description'
              placeholder={ t('event.field.description', { defaultValue: 'Description' }) }
              rows={ 4 }
            />
            <Header
              sub
              color='teal'
              content={ t('event.header.locationDetails', { defaultValue: 'Event Location Details' }) }
            />
            <PlaceInput
              name='city'
              placeholder={ t('event.field.city', { defaultValue: 'City' }) }
            />
            <PlaceInput
              name='venue'
              placeholder={ t('event.field.venue', { defaultValue: 'Venue' }) }
              disabled={ !values.city.latLng }
              options={ {
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000,
                types: ['establishment']
              } }
            />
            <DateInput
              name='date'
              placeholderText={ t('event.field.date', { defaultValue: 'Date' }) }
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
                  content={ selectedEvent.isCancelled
                    ? t('form.button.reactivateEvent', { defaultValue: 'Reactivate Event' })
                    : t('form.button.cancelEvent', { defaultValue: 'Cancel Event' }) }
                  onClick={ () => setConfirmToggleOpen(true) }
                />
                <Button
                  loading={ loadingDelete }
                  type='button'
                  floated='left'
                  color='red'
                  content={ t('form.button.deleteEvent', { defaultValue: 'Delete Event' }) }
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
              content={ selectedEvent
                ? t('form.button.update', { defaultValue: 'Update' })
                : t('form.button.create', { defaultValue: 'Create' }) }
            />
            <Button
              type='submit'
              floated='right'
              disabled={ isSubmitting }
              content={ t('form.button.cancel', { defaultValue: 'Cancel' }) }
              onClick={ history.goBack }
            />
          </Form>
        ) }
      </Formik>
      <Confirm
        open={ confirmToggleOpen }
        onCancel={ () => setConfirmToggleOpen(false) }
        onConfirm={ () => handleCancelToggle(selectedEvent) }
        content={ selectedEvent?.isCancelled
          ? t('event.message.reactivateEvent', {
            defaultValue: 'This will reactivate the selected event. Are you sure?'
          })
          : t('event.message.cancelEvent', {
            defaultValue: 'This will cancel the selected event. Are you sure?'
          }) }
      />
      <Confirm
        open={ confirmDeleteOpen }
        onCancel={ () => setConfirmDeleteOpen(false) }
        onConfirm={ () => handleDeleteEvent(selectedEvent) }
        content={ t('event.message.deleteEvent', {
          defaultValue: 'This will delete the selected event. Are you sure?'
        }) }
      />
    </Segment>
  )
}

export default EventForm;