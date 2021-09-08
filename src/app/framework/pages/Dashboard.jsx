import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from '../components/events/dashboard/EventList';
import { useDispatch, useSelector } from 'react-redux';
import EventListItemPlaceholder from '../components/events/dashboard/EventListItemPlaceholder';
import EventFilters from '../components/events/dashboard/EventFilters';
import { listenToEventsFromFirestore } from '../../firestore/firestoreService';
import { listenToEvents } from '../components/events/eventActions';
import useFirestoreCollection from '../hooks/useFirestoreCollection';
import EventsFeed from '../components/events/dashboard/EventsFeed';


function Dashboard() {
  const dispatch = useDispatch();
  const { events } = useSelector(state => state.event);
  const { loading } = useSelector(state => state.async);
  const { currentUser, authenticated } = useSelector(state => state.auth);

  const [predicate, setPredicate] = useState(new Map([
    ['startDate', new Date()],
    ['filter', 'all']
  ]));

  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)));
  }

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(predicate),
    data: (events) => dispatch(listenToEvents(events)),
    deps: [dispatch, predicate]
  });

  return (
    <Grid className='dashboard'>
      <Grid.Column width={ 10 }>
        { loading
          ? (
            <>
              <EventListItemPlaceholder />
              <EventListItemPlaceholder />
            </>
          ) : (
            <EventList events={ events } />
          )
        }
      </Grid.Column>
      <Grid.Column width={ 6 }>
        { authenticated && (
          <EventsFeed />
        ) }
        <EventFilters
          predicate={ predicate }
          setPredicate={ handleSetPredicate }
          loading={ loading }
          currentUser={ currentUser }
        />
      </Grid.Column>
    </Grid>
  )
}

export default Dashboard;