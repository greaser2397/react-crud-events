import React, { useEffect } from 'react';
import { Feed, Header, Segment } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { firebaseObjectToArray, getUserFeedRef } from '../../../../firestore/firebaseService';
import { listenToFeed } from '../../profile/profileActions';
import EventsFeedItem from './EventsFeedItem';

export default function EventsFeed() {
  const dispatch = useDispatch();
  const { feed } = useSelector(state => state.profile);

  useEffect(() => {
    const userFeedRef = getUserFeedRef();
    if (!userFeedRef) return;

    userFeedRef.on('value', snapshot => {
      if (!snapshot.exists()) {
        return;
      }

      const feed = firebaseObjectToArray(snapshot.val()).reverse();
      dispatch(listenToFeed(feed));
    });

    return () => {
      userFeedRef.off();
    }
  }, [dispatch])

  return (
    <>
      <Header
        attached
        color='teal'
        icon='newspaper'
        content='News feed'
      />
      <Segment attached='bottom'>
        <Feed>
          { feed.map(post => <EventsFeedItem post={ post } key={ post.id } />) }
        </Feed>
      </Segment>
    </>
  )
}