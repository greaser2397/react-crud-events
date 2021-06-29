import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventSidebar from '../components/events/detail/EventSidebar';
import EventHeader from '../components/events/detail/EventHeader';
import EventInfo from '../components/events/detail/EventInfo';
import EventChat from '../components/events/detail/EventChat';

function EventDetailView() {
  return (
    <Grid className='eventDetailView'>
      <Grid.Column width={ 10 }>
        <EventHeader/>
        <EventInfo/>
        <EventChat/>
      </Grid.Column>
      <Grid.Column width={ 6 }>
        <EventSidebar/>
      </Grid.Column>
    </Grid>
  )
}

export default EventDetailView;