import React from 'react';
import { Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { switchLanguage } from '../../auth/authActions';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { lang } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  function handleSwitchLanguage(e) {
    if (!e.target.value) return;
    dispatch(switchLanguage(e.target.value));
    i18n.changeLanguage(e.target.value);
  }

  return (
    <Button.Group
      className='lang-switcher'
      basic
      compact
      inverted
      size='small'
      color='olive'
    >
      <Button
        className={ lang === 'en' ? 'active' : '' }
        content={ 'EN' }
        value='en'
        onClick={ handleSwitchLanguage }
      />
      {/*<Button.Or />*/}
      <Button
        className={ lang === 'ru' ? 'active' : '' }
        content={ 'RU' }
        value='ru'
        onClick={ handleSwitchLanguage }
      />
    </Button.Group>
  )
}