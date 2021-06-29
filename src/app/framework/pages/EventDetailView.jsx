import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventSidebar from '../components/events/detail/EventSidebar';
import EventHeader from '../components/events/detail/EventHeader';
import EventInfo from '../components/events/detail/EventInfo';
import EventChat from '../components/events/detail/EventChat';
import { useSelector } from 'react-redux';

function EventDetailView({ match }) {
  const event = useSelector(state => state.event.events.find(e => e.id === match.params.id))

  return (
    <Grid className='eventDetailView'>
      <Grid.Column width={ 10 }>
        <EventHeader event={ event }/>
        <EventInfo event={ event }/>
        <EventChat/>
      </Grid.Column>
      <Grid.Column width={ 6 }>
        <EventSidebar attendees={ event.attendees }/>
      </Grid.Column>
    </Grid>
  )
}

export default EventDetailView;