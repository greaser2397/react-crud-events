import React from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function EventHeader() {
  return (
    <Segment.Group className='eventHeader'>
      <Segment basic attached="top" style={ { padding: '0' } }>
        <Image src={ `/assets/categoryImages/drinks.jpg` } fluid/>
        <Segment basic className='imageText'>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content='Event Title'
                  style={ { color: 'white' } }
                />
                <p>Event Date</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        <Button>Cancel My Place</Button>
        <Button color="teal">JOIN THIS EVENT</Button>

        <Button color="orange" floated="right" as={ Link } to='/manage/'>
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  )
}

export default EventHeader;