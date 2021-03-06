import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, Modal } from 'semantic-ui-react';
import { openModal } from '../modals/modalReducer';
import { useTranslation } from 'react-i18next';

export default function UnauthModal({ history, setModalOpen }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const { prevLocation } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  function handleClose() {
    if (!history) {
      setOpen(false);
      setModalOpen && setModalOpen(false);
      return;
    }
    const location = history && prevLocation ? prevLocation.pathname : '/events';

    history.push(location);
    setOpen(false);
  }

  function handleOpenLoginModal(modalType) {
    dispatch(openModal({ modalType }));
    setOpen(false);
    setModalOpen && setModalOpen(false);
  }

  return (
    <Modal
      open={ open }
      size='mini'
      onClose={ handleClose }
    >
      <Modal.Header
        content={ t('modal.message.unauthorized', { defaultValue: 'You need to be signed in to do that' }) }
      />
      <Modal.Content>
        <p>{ t('modal.message.loginOrRegister', {
          defaultValue: 'Please either login or register to see this content'
        }) }</p>
        <Button.Group widths={ 4 }>
          <Button
            fluid
            color='teal'
            content={ t('modal.button.login', { defaultValue: 'Login' }) }
            onClick={ () => handleOpenLoginModal('LoginForm') }
          />
          <Button.Or />
          <Button
            fluid
            color='green'
            content={ t('modal.button.register', { defaultValue: 'Register' }) }
            onClick={ () => dispatch(openModal({ modalType: 'RegisterForm' })) }
          />
        </Button.Group>
        <Divider />
        <div style={ { textAlign: 'center' } }>
          <p>{ t('modal.message.continueAsGuest', {
            defaultValue: 'Or click cancel to continue as a guest'
          }) }</p>
          <Button
            onClick={ handleClose }
            content={ t('form.button.cancel', { defaultValue: 'Cancel' }) }
          />
        </div>
      </Modal.Content>
    </Modal>
  )
}