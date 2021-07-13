import React, { useState } from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { addUserAttendance, cancelUserAttendance } from '../../../../firestore/firestoreService';

function EventHeader({ event, isGoing, isHost }) {
  const [loading, setLoading] = useState(false);

  async function handleUserJoinEvent() {
    setLoading(true);
    try {
      await addUserAttendance(event);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUserLeaveEvent() {
    setLoading(true);
    try {
      await cancelUserAttendance(event);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Segment.Group className='eventHeader'>
      <Segment basic attached="top" style={ { padding: '0' } }>
        <Image src={ `/assets/categoryImages/${ event.category }.jpg` } fluid />
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
                  Hosted by <strong><Link to={ `/profile/${ event.hostUid }` }>{ event.hostedBy }</Link></strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom" clearing>
        { !isHost && (
          <>
            { isGoing ? (
              <Button loading={ loading } onClick={ handleUserLeaveEvent }>Cancel My Place</Button>
            ) : (
              <Button onClick={ handleUserJoinEvent } loading={ loading } color="teal">JOIN THIS EVENT</Button>
            ) }
          </>
        ) }

        { isHost &&
        <Button color="orange" floated="right" as={ Link } to={ `/manage/${ event.id }` }>Manage Event</Button> }
      </Segment>
    </Segment.Group>
  )
}

export default EventHeader;