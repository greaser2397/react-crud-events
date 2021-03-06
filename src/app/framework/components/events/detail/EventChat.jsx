import React, { useEffect, useState } from 'react';
import { Segment, Header, Comment } from 'semantic-ui-react';
import EventChatForm from './EventChatForm';
import { useDispatch, useSelector } from 'react-redux';
import { firebaseObjectToArray, getEventChatRef } from '../../../../firestore/firebaseService';
import { listenToEventChat } from '../eventActions';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { CLEAR_COMMENTS } from '../eventConstants';
import { createDataTree } from '../../../util/Util';
import { useTranslation } from 'react-i18next';

function EventChat({ eventId }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { comments } = useSelector(state => state.event);
  const [showReplyForm, setShowReplyForm] = useState({ open: false, commentId: null });
  const { authenticated } = useSelector(state => state.auth);

  function handleCloseReplyForm() {
    setShowReplyForm({ open: false, commentId: null });
  }

  useEffect(() => {
    getEventChatRef(eventId).on('value', snapshot => {
      if (!snapshot.exists()) return;
      dispatch(listenToEventChat(firebaseObjectToArray(snapshot.val()).reverse()));
    });
    return () => {
      dispatch({ type: CLEAR_COMMENTS });
      getEventChatRef().off();
    }
  }, [eventId, dispatch]);

  return (
    <Segment.Group className='eventChat'>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={ { border: 'none' } }
      >
        <Header>{ authenticated
          ? t('event.header.chatAboutEvent', { defaultValue: 'Chat about this event' })
          : t('event.header.signInToComment', { defaultValue: 'Sign in to view and comment' }) }
        </Header>
      </Segment>

      { authenticated && (
        <Segment attached>
          <EventChatForm eventId={ eventId } parentId={ 0 } closeForm={ handleCloseReplyForm } />
          <Comment.Group>
            { createDataTree(comments).map(comment => (
              <Comment key={ comment.id }>
                <Comment.Avatar src={ comment.photoURL || '/assets/user.png' } />
                <Comment.Content>
                  <Comment.Author as={ Link }
                                  to={ `/profile/${ comment.uid }` }>{ comment.displayName }</Comment.Author>
                  <Comment.Metadata>
                    <div>{ formatDistance(comment.date, new Date()) }</div>
                  </Comment.Metadata>
                  <Comment.Text>
                    { comment.text.split('\n').map((text, i) => <span key={ i }>{ text }<br /></span>) }
                  </Comment.Text>
                  <Comment.Actions>
                    <Comment.Action
                      onClick={ () => setShowReplyForm({ open: true, commentId: comment.id }) }>
                      Reply
                    </Comment.Action>
                    { showReplyForm.open && showReplyForm.commentId === comment.id && (
                      <EventChatForm
                        eventId={ eventId }
                        parentId={ comment.id }
                        closeForm={ handleCloseReplyForm }
                      />
                    ) }
                  </Comment.Actions>
                </Comment.Content>
                { comment.childNodes.length > 0 && (
                  <Comment.Group>
                    { comment.childNodes.reverse().map(child => (
                      <Comment key={ child.id }>
                        <Comment.Avatar src={ child.photoURL || '/assets/user.png' } />
                        <Comment.Content>
                          <Comment.Author as={ Link }
                                          to={ `/profile/${ child.uid }` }>{ child.displayName }</Comment.Author>
                          <Comment.Metadata>
                            <div>{ formatDistance(child.date, new Date()) }</div>
                          </Comment.Metadata>
                          <Comment.Text>
                            { child.text.split('\n').map((text, i) => <span key={ i }>{ text }<br /></span>) }
                          </Comment.Text>
                          <Comment.Actions>
                            <Comment.Action
                              onClick={ () => setShowReplyForm({ open: true, commentId: child.id }) }>
                              Reply
                            </Comment.Action>
                            { showReplyForm.open && showReplyForm.commentId === child.id && (
                              <EventChatForm
                                eventId={ eventId }
                                parentId={ child.parentId }
                                closeForm={ handleCloseReplyForm }
                              />
                            ) }
                          </Comment.Actions>
                        </Comment.Content>
                      </Comment>
                    )) }
                  </Comment.Group>
                ) }
              </Comment>
            )) }
          </Comment.Group>
        </Segment>
      ) }
    </Segment.Group>
  )
}

export default EventChat;