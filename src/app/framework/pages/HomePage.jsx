import React from 'react';
import { Button, Container, Header, Icon, Image, Segment } from 'semantic-ui-react';

function HomePage({history}) {
  return (
    <Segment inverted textAlign='center' vertical className='homepage'>
      <Container>
        <Header as='h1' inverted>
          <Image size='massive' src='/assets/logo.png' style={ { marginBottom: 12 } }/>
          React Events
        </Header>
        <Button size='huge' inverted onClick={ () => history.push('/events') }>
          Get Started
          <Icon name='right arrow' inverted/>
        </Button>
      </Container>
    </Segment>
  )
}

export default HomePage;