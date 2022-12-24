import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyArticles from "./screens/MyArticles/MyArticles";
import Rules from "./screens/Rules";
import All from "./screens/All";
import SingleArticle from "./screens/SingleArticle/SingleArticle";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateArticle from "./screens/SingleArticle/CreateArticle";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import Password from "./screens/ProfileScreen/Password";
import About from "./screens/About";
import NotFound from "./screens/NotFound";
import Shared from "./screens/SingleArticle/Shared";
import { Switch } from "react-router-dom";

function App() {
  const [search, setSearch] = useState("");
  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      <main className="App">
        <Switch>
          <Route path="/sign" component={LandingPage} exact />
          <Route path="/signin" exact component={LoginScreen} />
          <Route path="/signup" exact component={RegisterScreen} />
          <Route
            path="/myarticles"
            exact
            component={({ history }) => (
              <MyArticles search={search} history={history} />
            )}
          />
          <Route path="/" exact component={() => <All search={search} />} />
          <Route path="/resetpassword" exact component={Password} />
          <Route path="/article/:id" exact component={SingleArticle} />
          <Route path="/articles/:id" exact component={Shared} />
          <Route path="/about" exact component={About} />
          <Route path="/rules" exact component={Rules} />
          <Route path="/create" exact component={CreateArticle} />
          <Route path="/profile" exact component={ProfileScreen} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
