import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from '../components/EventList';
import { sampleData } from '../../api/sampleData';


function Dashboard() {
  const [events, setEvents] = useState(sampleData);

  // function handleCreateEvent(event) {
  //   setEvents([...events, event]);
  // }
  //
  // function handleUpdateEvent(updatedEvent) {
  //   setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
  // }

  function handleDeleteEvent(eventId) {
    setEvents(events.filter(event => event.id !== eventId));
  }

  return (
    <Grid className='dashboard'>
      <Grid.Column width={ 10 }>
        <EventList events={ events } deleteEvent={ handleDeleteEvent }/>
      </Grid.Column>
      <Grid.Column width={ 6 }>
        <h2>Event Filters</h2>
      </Grid.Column>
    </Grid>
  )
}

export default Dashboard;