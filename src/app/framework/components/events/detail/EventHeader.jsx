import React, { useState } from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { addUserAttendance, cancelUserAttendance } from '../../../../firestore/firestoreService';
import { useSelector } from 'react-redux';
import UnauthModal from '../../../auth/UnauthModal';
import { useTranslation } from 'react-i18next';

function EventHeader({ event, isGoing, isHost }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { authenticated } = useSelector(state => state.auth);

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
    <>
      { modalOpen && <UnauthModal setModalOpen={ setModalOpen } /> }
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
                    { t('event.hostedBy', {
                      defaultValue: 'Hosted by'
                    }) } <strong><Link to={ `/profile/${ event.hostUid }` }>{ event.hostedBy }</Link></strong>
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
                <Button
                  loading={ loading }
                  onClick={ handleUserLeaveEvent }
                  content={ t('event.button.leaveEvent', { defaultValue: 'Cancel My Place' }) }
                />
              ) : (
                <Button
                  onClick={ authenticated ? handleUserJoinEvent : () => setModalOpen(true) }
                  loading={ loading }
                  color="teal"
                  content={ t('event.button.joinEvent', { defaultValue: 'JOIN THIS EVENT' }) }
                />
              ) }
            </>
          ) }

          { isHost && (
            <Button
              color="orange"
              floated="right"
              as={ Link }
              to={ `/manage/${ event.id }` }
              content={ t('event.button.manageEvent', { defaultValue: 'Manage Event' }) }
            />
          ) }
        </Segment>
      </Segment.Group>
    </>
  )
}

export default EventHeader;