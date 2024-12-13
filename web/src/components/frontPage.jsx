import React from "react";
import { Element } from "react-scroll";

import Header from "./Header";
import FirstPage from "./FirstPage";
import Footer from "./Footer";
import ShopSection from "./shopSection";
import PageBreak1 from "./pagebreak1";
import ShirtCatalog from "./shirtcatalog";
import Design from "./design";

function FrontPage() {
    return (
      <div>
        <Header />
        <FirstPage />
        <ShopSection />
        <PageBreak1 />
        <Element name="shirtCatalog">
          <ShirtCatalog />
        </Element>
        <Design />
        <Element name="Footer">
          <Footer />
        </Element>
      </div>
    );
  }
  
  export default FrontPage;
  
