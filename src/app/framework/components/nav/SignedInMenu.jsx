import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { signOutFirebase } from '../../../firestore/firebaseService';

function SignedInMenu() {
  const { t } = useTranslation();
  const { currentUser } = useSelector(state => state.auth);
  const history = useHistory();

  async function handleSignOut() {
    try {
      history.push('/');
      await signOutFirebase();
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Menu.Item position='right'>
      <Image avatar spaced='right' src={ currentUser.photoURL || '/assets/user.png' } />
      <Dropdown pointing='top left' text={ currentUser.displayName }>
        <Dropdown.Menu>
          <Dropdown.Item as={ Link } to='/createEvent' text={ t('navigation.button.createEvent') } icon='plus' />
          <Dropdown.Item text={ t('navigation.item.profile') } icon='user' />
          <Dropdown.Item text='My Account' icon='settings' as={ Link } to='/account' />
          <Dropdown.Item
            text={ t('navigation.item.signOut') }
            icon='power'
            onClick={ handleSignOut }
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  )
}

export default SignedInMenu;