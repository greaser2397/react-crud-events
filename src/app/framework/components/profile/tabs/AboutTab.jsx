import React, { useState } from 'react';
import { Button, Grid, Header, Tab } from 'semantic-ui-react';
import { format } from 'date-fns';
import ProfileForm from '../ProfileForm';
import { useTranslation } from 'react-i18next';


export default function AboutTab({ profile, isCurrentUser }) {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={ 16 }>
          <Header
            floated='left'
            icon='user'
            content={ `${ t('profile.panes.about.label', { defaultValue: 'About' }) } ${ profile.displayName }` }
          />
          { isCurrentUser &&
          <Button
            onClick={ () => setEditMode(!editMode) }
            floated='right'
            basic
            content={ editMode
              ? t('profile.panes.about.cancelEdit', { defaultValue: 'Cancel' })
              : t('profile.panes.about.edit', { defaultValue: 'Edit' }) }
          /> }
        </Grid.Column>
        <Grid.Column width={ 16 }>
          { editMode ? (
            <ProfileForm profile={ profile } />
          ) : (
            <>
              <div style={ { marginBottom: 10 } }>
                <strong>{ t('profile.panes.about.memberSince', {
                  defaultValue: 'Member since:'
                }) } { format(profile.createdAt, 'dd MMM yyyy') }</strong>
                <div>{ profile.description || null }</div>
              </div>
            </>
          ) }
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}