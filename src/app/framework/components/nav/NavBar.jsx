import React, { useState } from 'react';
import { Container, Menu, Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { NavLink, useHistory } from 'react-router-dom';
import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';

function NavBar() {
  const { t } = useTranslation();
  const [authenticated, setAuthenticated] = useState(false);
  const history = useHistory();

  function handleSignOut() {
    setAuthenticated(false);
    history.push('/');
  }

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={ NavLink } exact to='/' className='logo'>
          <img src="/assets/logo.png" alt="Logo"/>
          React Events
        </Menu.Item>
        <Menu.Item as={ NavLink } exact to='/events' name={ t('navigation.item.events') }/>
        { authenticated &&
        <Menu.Item as={ NavLink } to='/createEvent'>
          <Button positive inverted content={ t('navigation.button.createEvent') }/>
        </Menu.Item> }
        { authenticated
          ? <SignedInMenu signOut={ handleSignOut }/>
          : <SignedOutMenu setAuthenticated={ setAuthenticated }/>
        }
      </Container>
    </Menu>
  )
}

export default NavBar;