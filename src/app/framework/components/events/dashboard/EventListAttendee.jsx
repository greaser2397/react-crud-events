import React from 'react';
import { Image, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function EventListAttendee({ attendee }) {
  return (
    <List.Item as={ Link } to={ `/profile/${ attendee.id }` }>
      <Image size='mini' circular src={ attendee.photoURL || '/assets/user.png' } alt={ attendee.name } />
    </List.Item>
  )
}

export default EventListAttendee;