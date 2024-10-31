import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components
import Navbar from "../src/components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Container from "../src/components/layout/Container";

// pages
import Login from "../src/components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import Home from "./components/pages/Home";
import Message from "./components/layout/Message";
import Profile from "./components/pages/User/Profile";
import MyPets from "./components/pages/Pet/MyPets";
import EditPet from "./components/pages/Pet/EditPet";
import PetDetails from "./components/pages/Pet/PetDetails";





// context
import { UserProvider } from "./context/UserContext";
import AddPet from "./components/pages/Pet/AddPet";
import MyAdoptions from "./components/pages/Pet/MyAdoptions";

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/user/profile">
              <Profile />
            </Route>
            <Route path="/pet/mypets">
              <MyPets />
            </Route>
            <Route path="/pet/add">
              <AddPet />
            </Route>
            <Route path="/pet/edit/:id">
              <EditPet />
            </Route>
            <Route path="/pet/myadoptions">
              <MyAdoptions />
            </Route>
            <Route path="/pet/:id">
              <PetDetails />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
