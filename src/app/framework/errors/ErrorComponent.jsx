import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ErrorComponent() {
  const { t } = useTranslation();
  const { error } = useSelector(state => state.async);

  return (
    <Segment placeholder>
      <Header
        textAlign='center'
        content={ error?.message || t('errors.default', { defaultValue: 'Oops - we have an error' }) }
      />
      <Button
        primary
        as={ Link }
        to='/events'
        style={ { marginTop: 20 } }
        content={ t('common.returnToEvents', { defaultValue: 'Return to events page' }) }
      />
    </Segment>
  )
}