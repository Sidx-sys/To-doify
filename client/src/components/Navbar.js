import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Logout from "./auth/Logout";
import { connect } from "react-redux";
import { Component } from "react";
import propTypes from "prop-types";

class Navbar extends Component {
    static propTypes = {
        auth: propTypes.object.isRequired,
    };

    render() {
        const { user, isAuthenticated } = this.props.auth;

        const authLinks = (
            <Fragment>
                <ul className="right">
                    <li style={{ marginRight: "3rem" }}>
                        {user ? `Welcome ${user.name}` : ""}
                    </li>
                </ul>
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <Logout />
                </ul>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li>
                        <Link to="/register">
                            Register <span>👤</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/login">
                            Login <span>➡️</span>
                        </Link>
                    </li>
                </ul>
            </Fragment>
        );

        return (
            <Fragment>
                <nav style={{ marginBottom: "20px" }}>
                    <div className="nav-wrapper">
                        <Link to="/" className="brand-logo center">
                            To-doify
                        </Link>
                        <a
                            href="#"
                            data-target="mobile-demo"
                            className="sidenav-trigger"
                        >
                            <i className="material-icons">menu</i>
                        </a>
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </nav>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, null)(Navbar);
