import { Container, Menu, Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { switchLanguage } from '../auth/authActions';
import { useDispatch, useSelector } from 'react-redux';

function Footer() {
  const { i18n } = useTranslation();
  const { lang } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // function changeLanguage(e) {
  //   const btn = e.target;
  //   i18n.changeLanguage(btn.value);
  //   setLang(btn.value);
  //   btn.parentNode.querySelector(`[value="${ lang }"]`).classList.remove('active');
  //   btn.parentNode.querySelector(`[value="${ btn.value }"]`).classList.add('active');
  // }

  function handleSwitchLanguage(e) {
    if (!e.target.value) return;
    dispatch(switchLanguage(e.target.value));
    i18n.changeLanguage(e.target.value);
  }

  return (
    <Menu inverted>
      <Container>
        <Menu.Item position='right'>
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
            <Button.Or />
            <Button
              className={ lang === 'ru' ? 'active' : '' }
              content={ 'RU' }
              value='ru'
              onClick={ handleSwitchLanguage }
            />
          </Button.Group>
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default Footer;