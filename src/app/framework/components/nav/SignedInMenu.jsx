import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { signOutFirebase } from '../../../firestore/firebaseService';

function SignedInMenu() {
  const { t } = useTranslation();
  const { currentUserProfile } = useSelector(state => state.profile);
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
      <Image avatar spaced='right' src={ currentUserProfile?.photoURL || '/assets/user.png' } />
      <Dropdown pointing='top left' text={ currentUserProfile?.displayName }>
        <Dropdown.Menu>
          <Dropdown.Item
            as={ Link }
            to='/createEvent'
            icon='plus'
            text={ t('navigation.item.createEvent', { defaultValue: 'Create Event' }) }
          />
          <Dropdown.Item
            as={ Link }
            to={ `/profile/${ currentUserProfile?.id }` }
            icon='user'
            text={ t('navigation.item.profile', { defaultValue: 'My Profile' }) }
          />
          <Dropdown.Item
            as={ Link }
            to='/account'
            icon='settings'
            text={ t('navigation.item.account', { defaultValue: 'My Account' }) }
          />
          <Dropdown.Item
            icon='power'
            text={ t('navigation.item.signOut', { defaultValue: 'Sign out' }) }
            onClick={ handleSignOut }
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  )
}

export default SignedInMenu;