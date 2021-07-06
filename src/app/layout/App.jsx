import React from 'react';
import Dashboard from '../framework/pages/Dashboard';
import NavBar from '../framework/components/nav/NavBar';
import { Container } from 'semantic-ui-react';
import Footer from '../framework/components/Footer';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../framework/pages/HomePage';
import EventDetailView from '../framework/pages/EventDetailView';
import EventForm from '../framework/forms/EventForm';
import Sandbox from '../framework/sandbox/Sandbox';
import ModalManager from '../framework/modals/ModalManager';
import { ToastContainer } from 'react-toastify';
import ErrorComponent from '../framework/errors/ErrorComponent';
import AccountPage from '../framework/pages/AccountPage';
import { useSelector } from 'react-redux';
import AsyncLoader from './AsyncLoader';

function App() {
  const { key } = useLocation();
  const { initialized } = useSelector(state => state.async);

  if (!initialized) return <AsyncLoader content='Loading app...' />

  return (
    <>
      <ModalManager />
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={ HomePage } />
      <Route path={ '/(.+)' } render={ () => (
        <>
          <NavBar />
          <Container className='main'>
            <Route exact path='/events' component={ Dashboard } />
            <Route exact path='/sandbox' component={ Sandbox } />
            <Route path='/events/:id' component={ EventDetailView } />
            <Route path={ ['/createEvent', '/manage/:id'] } component={ EventForm } key={ key } />
            <Route path='/account' component={ AccountPage } />
            <Route path='/error' component={ ErrorComponent } />
          </Container>
          <Footer />
        </>
      ) } />
    </>
  );
}


export default App;