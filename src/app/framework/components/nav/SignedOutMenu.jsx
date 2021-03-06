import { Menu, Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { openModal } from '../../modals/modalReducer';

function SignedOutMenu() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Menu.Item position='right'>
      <Button
        className='login'
        basic
        inverted
        content={ t('navigation.item.login', { defaultValue: 'Login' }) }
        onClick={ () => dispatch(openModal({ modalType: 'LoginForm' })) }
      />
      <Button
        className='register'
        basic
        inverted
        content={ t('navigation.item.register', { defaultValue: 'Register' }) }
        onClick={ () => dispatch(openModal({ modalType: 'RegisterForm' })) }
      />
    </Menu.Item>
  )
}

export default SignedOutMenu;