import React from 'react';
import { Icon, Item, List, Segment, Button, Label } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

function EventListItem({ event }) {
  const { t } = useTranslation();

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src={ event.hostPhotoURL } />
            <Item.Content>
              <Item.Header content={ event.title } />
              <Item.Description>
                { t('event.hostedBy', {
                  defaultValue: 'Hosted by'
                }) } <Link to={ `/profile/${ event.hostUid }` }>{ event.hostedBy }</Link>
              </Item.Description>
              { event.isCancelled && (
                <Label
                  style={ { top: '-40px' } }
                  ribbon='right'
                  color='red'
                  content={ t('event.cancelledLabel', { defaultValue: 'This event has been cancelled' }) }
                />
              ) }
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' /> { format(event.date, 'MMMM d, yyyy h:mm a') }
          <Icon name='marker' /> { event.venue.address }
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          { event.attendees.map(attendee => <EventListAttendee key={ attendee.id } attendee={ attendee } />) }
        </List>
      </Segment>
      <Segment clearing>
        <div>{ event.description }</div>
        <Button
          floated='right'
          color='teal'
          content={ t('event.button.view', { defaultValue: 'View' }) }
          as={ Link } to={ `/events/${ event.id }` }
        />
      </Segment>
    </Segment.Group>
  )
}

export default EventListItem;