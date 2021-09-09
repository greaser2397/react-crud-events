import React, { useEffect, useState } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import EventList from '../components/events/dashboard/EventList';
import { useDispatch, useSelector } from 'react-redux';
import EventListItemPlaceholder from '../components/events/dashboard/EventListItemPlaceholder';
import EventFilters from '../components/events/dashboard/EventFilters';
import { clearEvents, fetchEvents } from '../components/events/eventActions';
import EventsFeed from '../components/events/dashboard/EventsFeed';


function Dashboard() {
  const limit = 2;
  const dispatch = useDispatch();
  const { events, moreEvents } = useSelector(state => state.event);
  const { loading } = useSelector(state => state.async);
  const { currentUser, authenticated } = useSelector(state => state.auth);
  const [lastDocSnapshot, setLastDocSnapshot] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(false);

  const [predicate, setPredicate] = useState(new Map([
    ['startDate', new Date()],
    ['filter', 'all']
  ]));

  function handleSetPredicate(key, value) {
    dispatch(clearEvents());
    setLastDocSnapshot(null);
    setPredicate(new Map(predicate.set(key, value)));
  }

  useEffect(() => {
    setLoadingInitial(true);
    dispatch(fetchEvents(predicate, limit)).then(lastVisibleDoc => {
      setLastDocSnapshot(lastVisibleDoc);
      setLoadingInitial(false);
    });

    return () => {
      dispatch(clearEvents());
    }
  }, [dispatch, predicate]);

  function handleFetchNextEvents() {
    dispatch(fetchEvents(predicate, limit, lastDocSnapshot)).then(lastVisibleDoc => {
      setLastDocSnapshot(lastVisibleDoc);
    });
  }

  return (
    <Grid className='dashboard'>
      <Grid.Column width={ 10 }>
        { loadingInitial
          ? (
            <>
              <EventListItemPlaceholder />
              <EventListItemPlaceholder />
            </>
          ) : (
            <EventList
              events={ events }
              loading={ loading }
              getNextEvents={ handleFetchNextEvents }
              moreEvents={ moreEvents }
            />
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
      <Grid.Column width={ 10 }>
        <Loader active={ loading } />
      </Grid.Column>
    </Grid>
  )
}

export default Dashboard;