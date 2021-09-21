import React, { useState } from 'react';
import { Tab } from 'semantic-ui-react';
import AboutTab from './tabs/AboutTab';
import PhotosTab from './tabs/PhotosTab';
import EventsTab from './tabs/EventsTab';
import FollowingTab from './tabs/FollowingTab';
import { useTranslation } from 'react-i18next';

export default function ProfileContent({ profile, isCurrentUser }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);

  const panes = [
    {
      menuItem: t('profile.panes.about.label', { defaultValue: 'About' }),
      render: () => <AboutTab profile={ profile } isCurrentUser={ isCurrentUser } />
    },
    {
      menuItem: t('profile.panes.photos.label', { defaultValue: 'Photos' }),
      render: () => <PhotosTab profile={ profile } isCurrentUser={ isCurrentUser } />
    },
    {
      menuItem: t('profile.panes.events.label', { defaultValue: 'Events' }),
      render: () => <EventsTab profile={ profile } />
    },
    {
      menuItem: t('profile.panes.followers.label', { defaultValue: 'Followers' }),
      render: () => (
        <FollowingTab
          profile={ profile }
          key={ profile.id }
          activeTab={ activeTab } />
      )
    },
    {
      menuItem: t('profile.panes.following.label', { defaultValue: 'Following' }),
      render: () => (
        <FollowingTab
          profile={ profile }
          key={ profile.id }
          activeTab={ activeTab } />
      )
    }
  ];

  return (
    <Tab
      menu={ { fluid: true, vertical: true } }
      menuPosition='right'
      panes={ panes }
      onTabChange={ (e, data) => setActiveTab(data.activeIndex) }
      activeIndex={ activeTab }
    />
  )
}