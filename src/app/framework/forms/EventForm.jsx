import React from 'react';
import { Form, Header, Segment, Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

function EventForm({ setFormOpen }) {
  const { t } = useTranslation();

  return (
    <Segment clearing>
      <Header content={ t('form.title') }/>
      <Form>
        <Form.Field>
          <input type="text" placeholder={ t('form.field.title') }/>
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder={ t('form.field.category') }/>
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder={ t('form.field.description') }/>
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder={ t('form.field.city') }/>
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder={ t('form.field.venue') }/>
        </Form.Field>
        <Form.Field>
          <input type="date" placeholder={ t('form.field.date') }/>
        </Form.Field>
        <Button type='submit' floated='right' positive content={ t('form.button.submit') }/>
        <Button type='submit' floated='right' content={ t('form.button.cancel') } onClick={ () => setFormOpen(false) }/>
      </Form>
    </Segment>
  )
}

export default EventForm;