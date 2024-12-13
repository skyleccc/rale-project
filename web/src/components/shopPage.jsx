import React from "react";
import { Link } from "react-router-dom";

import ShopPageTop from "./shopPagetop";
import ShopPage2 from "./shopPage2";
import Header from "./Header";


function shopPage() {
    return (
        <div>
            <Header />
            <ShopPageTop />
            <ShopPage2 />
        </div>
    );
}

export default shopPage;