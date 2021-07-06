import React from 'react';
import { useSelector } from 'react-redux';
import TestModal from '../sandbox/TestModal';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';

export default function ModalManager() {
  const modalLookup = {
    TestModal,
    LoginForm,
    RegisterForm
  };
  const currentModal = useSelector(state => state.modal);
  let renderedModal;

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderedModal = <ModalComponent { ...modalProps } />
  }

  return <span>{ renderedModal }</span>
}