import { Tab } from 'semantic-ui-react';
import AboutTab from './tabs/AboutTab';
import PhotosTab from './tabs/PhotosTab';
import EventsTab from './tabs/EventsTab';

export default function ProfileContent({ profile, isCurrentUser }) {
  const panes = [
    { menuItem: 'About', render: () => <AboutTab profile={ profile } isCurrentUser={ isCurrentUser } /> },
    { menuItem: 'Photos', render: () => <PhotosTab profile={ profile } isCurrentUser={ isCurrentUser } /> },
    { menuItem: 'Events', render: () => <EventsTab profile={ profile } /> },
    { menuItem: 'Followers', render: () => <Tab.Pane>Followers</Tab.Pane> },
    { menuItem: 'Following', render: () => <Tab.Pane>Following</Tab.Pane> }
  ];

  return (
    <Tab
      menu={ { fluid: true, vertical: true } }
      menuPosition='right'
      panes={ panes }
    />
  )
}