import React, { useState } from 'react';
import { Form, Header, Segment, Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import cuid from 'cuid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, updateEvent } from '../components/events/eventActions';

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

  const [values, setValues] = useState(defaultValues);

  function handleFormSubmit() {
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
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value })
  }

  return (
    <Segment clearing>
      <Header content={ t(`form.title.create`) }/>
      <Form onSubmit={ handleFormSubmit }>
        <Form.Field>
          <input type="text" name='title' value={ values.title } placeholder={ t('form.field.title') }
                 onChange={ (e) => handleInputChange(e) }/>
        </Form.Field>
        <Form.Field>
          <input type="text" name='category' value={ values.category } placeholder={ t('form.field.category') }
                 onChange={ e => handleInputChange(e) }/>
        </Form.Field>
        <Form.Field>
          <input type="text" name='description' value={ values.description } placeholder={ t('form.field.description') }
                 onChange={ e => handleInputChange(e) }/>
        </Form.Field>
        <Form.Field>
          <input type="text" name='city' value={ values.city } placeholder={ t('form.field.city') }
                 onChange={ e => handleInputChange(e) }/>
        </Form.Field>
        <Form.Field>
          <input type="text" name='venue' value={ values.venue } placeholder={ t('form.field.venue') }
                 onChange={ e => handleInputChange(e) }/>
        </Form.Field>
        <Form.Field>
          <input type="date" name='date' value={ values.date } placeholder={ t('form.field.date') }
                 onChange={ e => handleInputChange(e) }/>
        </Form.Field>
        <Button
          positive
          type='submit'
          floated='right'
          content={ t(`form.button.submit`) }
        />
        <Button
          type='submit'
          floated='right'
          content={ t('form.button.cancel') }
          as={ Link }
          to='/events'
        />
      </Form>
    </Segment>
  )
}

export default EventForm;