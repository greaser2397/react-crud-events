import React, { useState } from 'react';
import Dashboard from '../framework/pages/Dashboard';
import NavBar from '../framework/components/NavBar';
import { Container } from 'semantic-ui-react';
import Footer from '../framework/components/Footer';

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formState, setFormState] = useState(null);

  function handleSelectEvent(event) {
    setSelectedEvent(event);
    setFormState('edit');
    setFormOpen(true);
  }

  function handleCreateFormOpen() {
    setSelectedEvent(null);
    setFormState('create');
    setFormOpen(true);
  }

  return (
    <>
      <NavBar
        formOpen={ formOpen }
        formState={ formState }
        setFormOpen={ handleCreateFormOpen }
      />
      <Container className='main'>
        <Dashboard
          formOpen={ formOpen }
          setFormOpen={ setFormOpen }
          selectEvent={ handleSelectEvent }
          selectedEvent={ selectedEvent }
          formState={ formState }
          setFormState={ setFormState }
        />
      </Container>
      <Footer/>
    </>
  );
}

export default App;
