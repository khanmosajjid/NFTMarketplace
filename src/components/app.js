import React, { useEffect } from "react";
import ScrollToTopBtn from "./menu/ScrollToTop";
import Header from "./menu/header";
import Home from "./pages/home";
import Explore from "./pages/explore";
import Collection from "./pages/collection";
import ItemDetail from "./pages/ItemDetail";
import Author from "./pages/Author";
import Wallet from "./pages/wallet";
import Create2 from "./pages/createSingle";
import Create3 from "./pages/createMultiple";
import CreateOption from "./pages/createOptions";
import { createGlobalStyle } from "styled-components";
import UpdateProfile from "./pages/updateProfile";
import PersonalProfile from "./pages/personalProfile";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { Routes, Route } from "react-router-dom";
import ItemNotFound from "./pages/ItemNotFound";
import { useCookies } from "react-cookie";
import ExploreCollections from "./pages/exploreCollections";
import ExploreAuthors from "./pages/exploreAuthors";
import { checkAuthorization } from "../apiServices";
import eventEmitter from "../events/events";

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

export const ScrollTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0, 0), [location]);
  return children;
};

const App = (props) => {
  const [cookies] = useCookies(["selected_account", "Authorization"]);

  useEffect(() => {
    async function fetchData() {
      if (cookies.Authorization && cookies.selected_account) {
        localStorage.setItem("Authorization", cookies.Authorization);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    cookies.Authorization,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // localStorage.getItem("selected_account"),
    cookies.selected_account,
  ]);

  useEffect(() => {
    console.log("cookies.selected_account", cookies.selected_account, typeof cookies.selected_account)
    const fetch = async () => {
      let res = await checkAuthorization()
      if (res === false) {
        console.log("here--->>>")
        eventEmitter.emit("disconnectWallet")
      }
    }
    if (cookies.selected_account) {
      console.log("0---00--")
      fetch()
    }
  }, [cookies.selected_account])

  return (
    <>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/author" element={<Author />}>
          <Route path="/author/:id" element={<Author />} />
        </Route>
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="/profile" element={<PersonalProfile />} />
        <Route exact path="/collection" element={<Collection />}>
          <Route path="/collection/:address" element={<Collection />} />
        </Route>
        <Route path="/createOption" element={<CreateOption />} />
        <Route path="/createSingle" element={<Create2 />} />
        <Route path="/createMultiple" element={<Create3 />} />
        <Route path="/exploreCollections" element={<ExploreCollections />} />
        <Route path="/exploreAuthors" element={<ExploreAuthors />} />
        <Route exact path="/itemDetail" element={<ItemDetail />}>
          <Route path="/itemDetail/:id" element={<ItemDetail />} />
        </Route>
        <Route path="*" component={ItemNotFound} />
      </Routes>
      <ScrollToTopBtn />
      <NotificationContainer />

    </>
  );
};

export default App;
