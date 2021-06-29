import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function SignedInMenu({ signOut }) {
  const { t } = useTranslation();

  return (
    <Menu.Item position='right'>
      <Image avatar spaced='right' src='/assets/user.png'/>
      <Dropdown pointing='top left' text='Bob'>
        <Dropdown.Menu>
          <Dropdown.Item as={ Link } to='/createEvent' text={ t('navigation.button.createEvent') } icon='plus'/>
          <Dropdown.Item text={ t('navigation.item.profile') } icon='user'/>
          <Dropdown.Item
            text={ t('navigation.item.signOut') }
            icon='power'
            onClick={ signOut }
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  )
}

export default SignedInMenu;