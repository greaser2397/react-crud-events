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
      <Image avatar spaced='right' src={ currentUserProfile.photoURL || '/assets/user.png' } />
      <Dropdown pointing='top left' text={ currentUserProfile.displayName }>
        <Dropdown.Menu>
          <Dropdown.Item as={ Link } to='/createEvent' text={ t('navigation.button.createEvent') } icon='plus' />
          <Dropdown.Item text={ t('navigation.item.profile') } icon='user' as={ Link } to={ `/profile/${ currentUserProfile.id }` } />
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