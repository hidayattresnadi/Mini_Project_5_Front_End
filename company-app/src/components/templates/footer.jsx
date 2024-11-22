import Container from '../elements/container';
import Text from '../elements/text';
import FooterSection from '../modules/footerSection';

const Footer = () => (
  <footer className="bg-dark text-white text-center py-3 mt-5">
    <Container className="container-fluid">
      <h5 className="mb-3">Company App</h5>
      <Text>© {new Date().getFullYear()} Company. All rights reserved.</Text>
      <FooterSection />
    </Container>
  </footer>
);

export default Footer;
