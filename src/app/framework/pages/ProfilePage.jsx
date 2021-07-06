import React from 'react';
import { Grid } from 'semantic-ui-react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileContent from '../components/profile/ProfileContent';
import { useDispatch, useSelector } from 'react-redux';
import useFirestoreDoc from '../hooks/useFirestoreDoc';
import { getUserProfile } from '../../firestore/firestoreService';
import { listenToSelectedUserProfile } from '../components/profile/profileActions';
import AsyncLoader from '../../layout/AsyncLoader';

export default function ProfilePage({ match }) {
  const dispatch = useDispatch();
  const { selectedUserProfile } = useSelector(state => state.profile);
  const { currentUser } = useSelector(state => state.auth);
  const { loading, error } = useSelector(state => state.async);

  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    data: profile => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, match.params.id]
  });

  if ((loading && !selectedUserProfile) || (!selectedUserProfile && !error)) return <AsyncLoader
    content='Loading profile...' />;

  return (
    <Grid>
      <Grid.Column width={ 16 }>
        <ProfileHeader profile={ selectedUserProfile } isCurrentUser={ currentUser.uid === selectedUserProfile.id } />
        <ProfileContent profile={ selectedUserProfile } isCurrentUser={ currentUser.uid === selectedUserProfile.id } />
      </Grid.Column>
    </Grid>
  )
}