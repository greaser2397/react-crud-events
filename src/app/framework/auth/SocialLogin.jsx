import React from 'react';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../modals/modalReducer';
import { socialLogin } from '../../firestore/firebaseService';
import { useTranslation } from 'react-i18next';

export default function SocialLogin() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  function handleSocialLogin(provider) {
    dispatch(closeModal());
    socialLogin(provider);
  }

  return (
    <>
      <Button
        fluid
        icon='facebook'
        color='facebook'
        style={ { marginBottom: 10 } }
        content={ t('modal.social.facebookLogin', { defaultValue: 'Login with Facebook' }) }
        onClick={ () => handleSocialLogin('facebook') }
      />
      <Button
        fluid
        icon='google'
        color='google plus'
        content={ t('modal.social.googleLogin', { defaultValue: 'Login with Google' }) }
        onClick={ () => handleSocialLogin('google') }
      />
    </>
  )
}