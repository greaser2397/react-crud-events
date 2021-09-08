import React, { useState } from 'react';
import { Tab } from 'semantic-ui-react';
import AboutTab from './tabs/AboutTab';
import PhotosTab from './tabs/PhotosTab';
import EventsTab from './tabs/EventsTab';
import FollowingTab from './tabs/FollowingTab';

export default function ProfileContent({ profile, isCurrentUser }) {
  const [activeTab, setActiveTab] = useState(0);

  const panes = [
    { menuItem: 'About', render: () => <AboutTab profile={ profile } isCurrentUser={ isCurrentUser } /> },
    { menuItem: 'Photos', render: () => <PhotosTab profile={ profile } isCurrentUser={ isCurrentUser } /> },
    { menuItem: 'Events', render: () => <EventsTab profile={ profile } /> },
    {
      menuItem: 'Followers', render: () =>
        <FollowingTab
          profile={ profile }
          key={ profile.id }
          activeTab={ activeTab } />
    },
    {
      menuItem: 'Following', render: () =>
        <FollowingTab
          profile={ profile }
          key={ profile.id }
          activeTab={ activeTab } />
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