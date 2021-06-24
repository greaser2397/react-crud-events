import { Container, Menu, Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

function Footer() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState('en');

  function changeLanguage(e) {
    i18n.changeLanguage(e.target.value);
    setLang(e.target.value);
    document.querySelector('.lang-switcher .button.active').classList.remove('active');
    document.querySelector(`.lang-switcher .button[value="${ e.target.value }"]`).classList.add('active');
  }

  return (
    <Menu inverted>
      <Container>
        <Menu.Item position='right'>
          <Button.Group className='lang-switcher' size='small' basic compact inverted color='olive'>
            <Button className='active' content={ 'English' } value='en' onClick={ changeLanguage }/>
            <Button.Or/>
            <Button content={ 'Russian' } value='ru' onClick={ changeLanguage }/>
          </Button.Group>
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default Footer;