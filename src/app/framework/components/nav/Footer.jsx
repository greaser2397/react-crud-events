import { Container, Menu } from 'semantic-ui-react';
import LanguageSwitcher from './LanguageSwitcher';

function Footer() {
  return (
    <Menu inverted>
      <Container>
        <Menu.Item position='right'>
          <LanguageSwitcher />
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default Footer;