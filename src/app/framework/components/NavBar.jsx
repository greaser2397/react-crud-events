import { Container, Menu, Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

function NavBar({ formOpen, setFormOpen }) {
  const { t } = useTranslation();

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item className='logo'>
          <img src="/assets/logo.png" alt="Logo"/>
          React Events
        </Menu.Item>
        <Menu.Item name={ t('navigation.item.events') }/>
        <Menu.Item>
          <Button positive inverted disabled={ formOpen }
                  content={ t('navigation.button.createEvent') } onClick={ () => setFormOpen(true) }/>
        </Menu.Item>
        <Menu.Item position='right'>
          <Button className='login' basic inverted content={ t('navigation.button.login') }/>
          <Button className='register' basic inverted content={ t('navigation.button.register') }/>
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default NavBar;