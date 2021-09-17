import { Container, Menu } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <Menu
      className='footer'
      inverted
    >
      <Container>
        <p>{ t('footer.copyright', {
          year: new Date().getFullYear(),
          defaultValue: '© {{ year }} React Events. All rights reserved.'
        }) }</p>
      </Container>
    </Menu>
  )
}

export default Footer;