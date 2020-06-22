import React, { Fragment, Component } from "react";
import { logout } from "../../actions/authActions";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

class Logout extends Component {
    static propTypes = {
        logout: propTypes.func.isRequired,
    };

    render() {
        return (
            <Fragment>
                <li onClick={this.props.logout}>
                    <Link to="/">
                        Logout <span>⬅️</span>
                    </Link>
                </li>
                <li>
                    <Link to="/todolist">
                        Todos <span>📝</span>
                    </Link>
                </li>
            </Fragment>
        );
    }
}

export default connect(null, { logout })(Logout);
