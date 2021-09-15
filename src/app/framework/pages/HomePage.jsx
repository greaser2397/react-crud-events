import React from 'react';
import { Button, Container, Header, Icon, Image, Segment } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

function HomePage({ history }) {
  const { t } = useTranslation();

  return (
    <Segment inverted textAlign='center' vertical className='homepage'>
      <Container>
        <Header as='h1' inverted>
          <Image size='massive' src='/assets/logo.png' style={ { marginBottom: 12 } } />
          { t('common.appName', { defaultValue: 'React Events' }) }
        </Header>
        <Button
          inverted
          size='huge'
          onClick={ () => history.push('/events') }>
          { t('common.getStarted', { defaultValue: 'Get Started' }) }
          <Icon name='right arrow' inverted />
        </Button>
      </Container>
    </Segment>
  )
}

export default HomePage;