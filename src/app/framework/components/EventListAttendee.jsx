import React from 'react';
import { Image, List } from 'semantic-ui-react';

function EventAttendee({ attendee }) {
  return (
    <List.Item>
      <Image size='mini' circular src={ attendee.photoURL || '/assets/user.png' } alt={ attendee.name }/>
    </List.Item>
  )
}

export default EventAttendee;