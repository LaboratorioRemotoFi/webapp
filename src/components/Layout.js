import Navbar from "./Navbar";
import Footer from "./Footer";
import Box from "@mui/material/Box";

const Layout = ({ children }) => (
  <>
    <Navbar />
    <Box
      sx={{
        display: "block",
        position: "relative",
        height: "84.8vh",
        width: "100%",
      }}
    >
      {children}
    </Box>
    <Footer />
  </>
);

export default Layout;
