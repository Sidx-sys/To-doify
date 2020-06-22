import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize";
import M from "materialize-css";

import { loadUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/Navbar";
import TodoList from "./components/ToDoList";
import LandingPage from "./components/LandingPage";
import RegisterPage from "./components/auth/RegisterPage";
import LoginPage from "./components/auth/LoginPage";

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Navbar />
                        <div className="container">
                            <Route exact path="/" component={LandingPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/todolist" component={TodoList} />
                        </div>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
