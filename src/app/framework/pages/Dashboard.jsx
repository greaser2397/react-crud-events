import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from '../components/EventList';
import EventForm from '../forms/EventForm';
import { sampleData } from '../../api/sampleData';


function Dashboard({ formOpen, setFormOpen }) {
  const [events, setEvents] = useState(sampleData);

  return (
    <Grid className='dashboard'>
      <Grid.Column width={ 10 }>
        <EventList events={ events }/>
      </Grid.Column>
      <Grid.Column width={ 6 }>
        { formOpen &&
        <EventForm setFormOpen={ setFormOpen }/> }
      </Grid.Column>
    </Grid>
  )
}

export default Dashboard;