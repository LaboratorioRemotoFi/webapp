import Navbar from "../src/components/navbar";
import Footer from "../src/components/footer";

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

export default Layout;
