import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from '../components/events/dashboard/EventList';
import { useDispatch, useSelector } from 'react-redux';
import EventListItemPlaceholder from '../components/events/dashboard/EventListItemPlaceholder';
import EventFilters from '../components/events/dashboard/EventFilters';
import { listenToEventsFromFirestore } from '../../firestore/firestoreService';
import { listenToEvents } from '../components/events/eventActions';
import useFirestoreCollection from '../hooks/useFirestoreCollection';


function Dashboard() {
  const dispatch = useDispatch();
  const { events } = useSelector(state => state.event);
  const { loading } = useSelector(state => state.async);

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(),
    data: evts => dispatch(listenToEvents(evts)),
    deps: [dispatch]
  });

  return (
    <Grid className='dashboard'>
      <Grid.Column width={ 10 }>
        { loading &&
        <>
          <EventListItemPlaceholder />
          <EventListItemPlaceholder />
        </>
        }
        <EventList events={ events } />
      </Grid.Column>
      <Grid.Column width={ 6 }>
        <EventFilters />
      </Grid.Column>
    </Grid>
  )
}

export default Dashboard;