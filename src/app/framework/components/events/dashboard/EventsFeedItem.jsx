import React from 'react';
import { Link } from 'react-router-dom';
import { Feed } from 'semantic-ui-react';
import { formatDistance } from 'date-fns';
import { useTranslation } from 'react-i18next';

export default function EventsFeedItem({ post }) {
  const { t } = useTranslation();
  let summary;

  switch (post.code) {
    case 'joined-event':
      summary = (
        <>
          <Link to={ `/profile/${ post.userUid }` }>{ post.displayName }</Link> { t('event.newsFeed.joinedEvent', {
          defaultValue: 'has signed up to'
        }) } <Link to={ `/events/${ post.eventId }` }>{ post.title }</Link>
        </>
      );
      break;
    case 'left-event':
      summary = (
        <>
          <Link to={ `/profile/${ post.userUid }` }>{ post.displayName }</Link> { t('event.newsFeed.leftEvent', {
          defaultValue: 'has cancelled place on'
        }) } <Link to={ `/events/${ post.eventId }` }>{ post.title }</Link>
        </>
      );
      break;
    default:
      summary = t('event.newsFeed.defaultMessage', { defaultValue: 'something happened...' })
      break;
  }

  return (
    <Feed.Event>
      <Feed.Label image={ post.photoURL } />
      <Feed.Content>
        <Feed.Date>{ formatDistance(new Date(post.date), new Date()) } ago</Feed.Date>
        <Feed.Summary>{ summary }</Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  )
}