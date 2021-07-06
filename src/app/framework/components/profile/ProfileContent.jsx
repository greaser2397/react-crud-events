import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from 'semantic-ui-react';

export default function ProfileHeader() {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={ 12 }>
          <Item.Group>
            <Item>
              <Item.Image avatar size='small' src='/assets/user.png' />
              <Item.Content verticalAlign='middle'>
                <Header as='h1' style={ { marginBottom: 10, display: 'block' } } content='Display Name' />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={ 4 }>
          <Statistic.Group>
            <Statistic label='Followers' value={ 10 } />
            <Statistic label='Following' value={ 5 } />
          </Statistic.Group>
          <Divider />
          <Reveal animated='move'>
            <Reveal.Content visible style={ { width: '100%' } }>
              <Button fluid color='teal' content='Following' />
            </Reveal.Content>
            <Reveal.Content hidden style={ { width: '100%' } }>
              <Button fluid color='red' content='Unfollow' />
            </Reveal.Content>
          </Reveal>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}