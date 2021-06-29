import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from '../components/events/dashboard/EventList';
import { useSelector } from 'react-redux';


function Dashboard() {
  const { events } = useSelector(state => state.event)

  return (
    <Grid className='dashboard'>
      <Grid.Column width={ 10 }>
        <EventList events={ events }/>
      </Grid.Column>
      <Grid.Column width={ 6 }>
        <h2>Event Filters</h2>
      </Grid.Column>
    </Grid>
  )
}

export default Dashboard;