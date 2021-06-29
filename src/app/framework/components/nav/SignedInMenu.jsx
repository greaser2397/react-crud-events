import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../../auth/authActions';

function SignedInMenu() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.auth);
  const history = useHistory();

  return (
    <Menu.Item position='right'>
      <Image avatar spaced='right' src={ currentUser.photoURL || '/assets/user.png' }/>
      <Dropdown pointing='top left' text={ currentUser.email }>
        <Dropdown.Menu>
          <Dropdown.Item as={ Link } to='/createEvent' text={ t('navigation.button.createEvent') } icon='plus'/>
          <Dropdown.Item text={ t('navigation.item.profile') } icon='user'/>
          <Dropdown.Item
            text={ t('navigation.item.signOut') }
            icon='power'
            onClick={ () => {
              dispatch(signOutUser());
              history.push('/')
            } }
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  )
}

export default SignedInMenu;