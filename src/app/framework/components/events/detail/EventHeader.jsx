import React from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

function EventHeader({ event }) {
  return (
    <Segment.Group className='eventHeader'>
      <Segment basic attached="top" style={ { padding: '0' } }>
        <Image src={ `/assets/categoryImages/${ event.category }.jpg` } fluid/>
        <Segment basic className='imageText'>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={ event.title }
                  style={ { color: 'white' } }
                />
                <p>{ format(event.date, 'MMMM d, yyyy h:mm a') }</p>
                <p>
                  Hosted by <strong>{ event.hostedBy }</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        <Button>Cancel My Place</Button>
        <Button color="teal">JOIN THIS EVENT</Button>

        <Button color="orange" floated="right" as={ Link } to={ `/manage/${ event.id }` }>
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  )
}

export default EventHeader;