import { Container, Menu, Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

function Footer() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState('en');

  function changeLanguage(e) {
    const btn = e.target;
    i18n.changeLanguage(btn.value);
    setLang(btn.value);
    btn.parentNode.querySelector(`[value="${ lang }"]`).classList.remove('active');
    btn.parentNode.querySelector(`[value="${ btn.value }"]`).classList.add('active');
  }

  return (
    <Menu inverted>
      <Container>
        <Menu.Item position='right'>
          <Button.Group className='lang-switcher' size='small' basic compact inverted color='olive'>
            <Button className='active' content={ 'EN' } value='en' onClick={ changeLanguage }/>
            <Button.Or/>
            <Button content={ 'RU' } value='ru' onClick={ changeLanguage }/>
          </Button.Group>
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default Footer;