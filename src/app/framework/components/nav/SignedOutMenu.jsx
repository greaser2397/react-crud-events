import { Menu, Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

function SignedOutMenu({ setAuthenticated }) {
  const { t } = useTranslation();

  return (
    <Menu.Item position='right'>
      <Button
        className='login'
        basic
        inverted
        content={ t('navigation.button.login') }
        onClick={ () => setAuthenticated(true) }
      />
      <Button className='register' basic inverted content={ t('navigation.button.register') }/>
    </Menu.Item>
  )
}

export default SignedOutMenu;