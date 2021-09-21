import React, { useEffect, useState } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import EventList from '../components/events/dashboard/EventList';
import { useDispatch, useSelector } from 'react-redux';
import EventListItemPlaceholder from '../components/events/dashboard/EventListItemPlaceholder';
import EventFilters from '../components/events/dashboard/EventFilters';
import { fetchEvents } from '../components/events/eventActions';
import EventsFeed from '../components/events/dashboard/EventsFeed';
import { RETAIN_STATE } from '../components/events/eventConstants';


function Dashboard() {
  const limit = 4;
  const dispatch = useDispatch();
  const {
    events,
    moreEvents,
    filter,
    startDate,
    lastVisible,
    retainState
  } = useSelector(state => state.event);
  const { loading } = useSelector(state => state.async);
  const { currentUser, authenticated } = useSelector(state => state.auth);
  const [loadingInitial, setLoadingInitial] = useState(false);

  useEffect(() => {
    if (retainState) return;

    setLoadingInitial(true);
    dispatch(fetchEvents(filter, startDate, limit)).then(() => setLoadingInitial(false));

    return () => {
      dispatch({ type: RETAIN_STATE });
    }
  }, [dispatch, filter, startDate, retainState]);

  function handleFetchNextEvents() {
    dispatch(fetchEvents(filter, startDate, limit, lastVisible));
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