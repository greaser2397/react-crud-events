import React, { useState } from 'react';
import { Form, Header, Segment, Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import cuid from 'cuid';
import { Link } from 'react-router-dom';

function EventForm({ setFormOpen, setEvents, createEvent, selectedEvent, formState, setFormState, updateEvent }) {
  const { t } = useTranslation();

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
    formState === 'edit'
      ? updateEvent({ ...selectedEvent, ...values })
      : createEvent({
        ...values,
        id: cuid(),
        hostedBy: 'Bob',
        attendees: [],
        hostPhotoURL: '/assets/user.png'
      });
    setFormState(null);
    setFormOpen(false);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value })
  }

  return (
    <Segment clearing>
      <Header content={ t(`form.title.${ formState }`) }/>
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
          content={ t(`form.button.${ formState === 'edit' ? 'update' : 'submit' }`) }
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