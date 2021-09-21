import React from 'react';
import { Container, Menu, Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';
import { useSelector } from 'react-redux';
import LanguageSwitcher from './LanguageSwitcher';

function NavBar() {
  const { t } = useTranslation();
  const { authenticated } = useSelector(state => state.auth);

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={ NavLink } exact to='/' className='logo'>
          <img src="/assets/logo.png" alt="Logo" />
          { t('common.appName', { defaultValue: 'React Events' }) }
        </Menu.Item>
        <Menu.Item
          as={ NavLink }
          exact
          to='/events'
          name={ t('navigation.item.events', { defaultValue: 'Events' }) }
        />
        {/*<Menu.Item as={ NavLink } exact to='/sandbox' name='Sandbox'/>*/ }
        { authenticated &&
        <Menu.Item as={ NavLink } to='/createEvent'>
          <Button
            positive
            inverted
            content={ t('navigation.item.createEvent', { defaultValue: 'Create Event' }) }
          />
        </Menu.Item> }
        <Menu.Item position='right'>
          <LanguageSwitcher />
        </Menu.Item>
        { authenticated
          ? <SignedInMenu />
          : <SignedOutMenu />
        }
      </Container>
    </Menu>
  )
}

export default NavBar;