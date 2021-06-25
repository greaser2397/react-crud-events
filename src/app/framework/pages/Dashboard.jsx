import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from '../components/EventList';
import EventForm from '../forms/EventForm';
import { sampleData } from '../../api/sampleData';


function Dashboard({ formOpen, setFormOpen, formState, setFormState, selectEvent, selectedEvent }) {
  const [events, setEvents] = useState(sampleData);

  function handleCreateEvent(event) {
    setEvents([...events, event]);
  }

  function handleUpdateEvent(updatedEvent) {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    selectEvent(null);
  }

  function handleDeleteEvent(eventId) {
    setEvents(events.filter(event => event.id !== eventId));
    selectEvent(null);
    setFormOpen(false);
  }

  return (
    <Grid className='dashboard'>
      <Grid.Column width={ 10 }>
        <EventList
          events={ events }
          selectEvent={ selectEvent }
          deleteEvent={ handleDeleteEvent }
        />
      </Grid.Column>
      <Grid.Column width={ 6 }>
        { formOpen &&
        <EventForm
          setFormOpen={ setFormOpen }
          setEvents={ setEvents }
          createEvent={ handleCreateEvent }
          selectedEvent={ selectedEvent }
          formState={ formState }
          setFormState={ setFormState }
          updateEvent={ handleUpdateEvent }
          key={ selectedEvent ? selectedEvent.id : null }
        /> }
      </Grid.Column>
    </Grid>
  )
}

export default Dashboard;