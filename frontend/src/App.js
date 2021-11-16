import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyNotes from "./screens/MyNotes/MyNotes";
import SingleNote from "./screens/SingleNote/SingleNote";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/SingleNote/CreateNote";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import About from "./screens/About";
import NotFound from "./screens/NotFound";
import { Switch } from 'react-router-dom';

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      <main className="App">
        <Switch>
          <Route path="/" component={LandingPage} exact />
          <Route path="/signin" exact component={LoginScreen} />
          <Route path="/signup" exact component={RegisterScreen} />
          <Route
            path="/myarticles" exact
            component={({ history }) => (
              <MyNotes search={search} history={history} />
            )}
          />
          <Route path="/note/:id" exact component={SingleNote} />
          <Route path="/about" exact component={About} />
          <Route path="/create" exact component={CreateNote} />
          <Route path="/profile" exact component={ProfileScreen} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

//Create '.env' on the root directory and add environment variables to it from 'envars.cs'.
