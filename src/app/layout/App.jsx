import React, { useState } from 'react';
import Dashboard from '../framework/pages/Dashboard';
import NavBar from '../framework/components/NavBar';
import { Container } from 'semantic-ui-react';
import Footer from '../framework/components/Footer';

function App() {
  const [formOpen, setFormOpen] = useState(false);
  return (
    <>
      <NavBar formOpen={ formOpen } setFormOpen={ setFormOpen }/>
      <Container className='main'>
        <Dashboard formOpen={ formOpen } setFormOpen={ setFormOpen }/>
      </Container>
      <Footer/>
    </>
  );
}

export default App;
