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
  const { selectedUserProfile, currentUserProfile } = useSelector(state => state.profile);
  const { currentUser } = useSelector(state => state.auth);
  const { loading, error } = useSelector(state => state.async);
  let profile;

  if (match.params.id === currentUser.uid) {
    profile = currentUserProfile;
  } else {
    profile = selectedUserProfile;
  }

  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    data: profile => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, match.params.id],
    shouldExecute: match.params.id !== currentUser.id
  });

  if ((loading && !selectedUserProfile) || (!selectedUserProfile && !error)) return <AsyncLoader
    content='Loading profile...' />;

  return (
    <Grid>
      <Grid.Column width={ 16 }>
        <ProfileHeader profile={ profile } isCurrentUser={ currentUser.uid === profile.id } />
        <ProfileContent profile={ profile } isCurrentUser={ currentUser.uid === profile.id } />
      </Grid.Column>
    </Grid>
  )
}