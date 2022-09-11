import React, { useContext, useEffect } from "react";
import Header from "./Page/Header/Header";
import Footer from "./Page/Footer/Footer";
import ListCategoryTopHeader from "../layout/Page/Slide/SlideStick/ListCategoryTopHeader";
import Container from "./Page/Container/Container";
import Slide from "../layout/Page/Slide/Slide";

import ProtectedRouteUser from "../../Store/Routing/ProtectedRouteUser";
import { ProductContext } from "../../Store/Context/ProductContext";
import { CategoryContext } from "../../Store/Context/CategoryContext";

const Landing = () => {
    const { getProduct } = useContext(ProductContext);
    const { getCategory } = useContext(CategoryContext);

    useEffect(async () => {
        await getProduct();
        await getCategory();
    }, []);
    return (
        <>
            <ProtectedRouteUser>
                <Header />
                <ListCategoryTopHeader />
                <Slide />
                <Container />
                <Footer />
            </ProtectedRouteUser>
        </>
    );
};

export default Landing;
