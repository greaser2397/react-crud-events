import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventSidebar from '../components/events/detail/EventSidebar';
import EventHeader from '../components/events/detail/EventHeader';
import EventInfo from '../components/events/detail/EventInfo';
import EventChat from '../components/events/detail/EventChat';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import useFirestoreDoc from '../hooks/useFirestoreDoc';
import { listenToEventFromFirestore } from '../../firestore/firestoreService';
import { listenToEvents } from '../components/events/eventActions';
import AsyncLoader from '../../layout/AsyncLoader';

function EventDetailView({ match }) {
  const event = useSelector(state => state.event.events.find(e => e.id === match.params.id));
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.async);

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (evt) => dispatch(listenToEvents([evt])),
    deps: [match.params.id, dispatch]
  });

  if (loading || (!event && !error)) return <AsyncLoader content='Loading event...' />
  if (error) return <Redirect to='/error' />

  return (
    <Grid className='eventDetailView'>
      <Grid.Column width={ 10 }>
        <EventHeader event={ event } />
        <EventInfo event={ event } />
        <EventChat />
      </Grid.Column>
      <Grid.Column width={ 6 }>
        <EventSidebar attendees={ event.attendees } />
      </Grid.Column>
    </Grid>
  )
}

export default EventDetailView;