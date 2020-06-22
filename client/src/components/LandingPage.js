import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";

class LandingPage extends Component {
    static propTypes = {
        isAuthenticated: propTypes.bool,
    };

    componentDidMount() {
        if (this.props.isAuthenticated) this.props.history.push("/todolist");
    }

    render() {
        return (
            <div className="LandingPage">
                <h1>
                    <strong>Welcome, </strong>
                    <span style={{ fontSize: "2rem" }}>to To-doify</span>
                </h1>
                <div className="row">
                    <div
                        className="card col l4 m6 s12 push-s2 push-m1 hoverable cyan lighten-4"
                        id="size"
                    >
                        <div className="card-content">
                            <span className="card-title">Todos!</span>
                            <p className="card-text">
                                Make your everyday easy :)
                            </p>
                            <br />
                            <button className="btn" id="done">
                                Done
                                <i className="material-icons right">
                                    assignment_turned_in
                                </i>
                            </button>
                            <button
                                className="waves-effect btn-floating btn-small"
                                id="edit"
                            >
                                <i className="material-icons">create</i>
                            </button>
                        </div>
                    </div>
                    <div className="col">
                        <table>
                            <tr>
                                <td>
                                    <button
                                        className="btn pulse"
                                        style={{ marginTop: "0.75rem" }}
                                    >
                                        Done
                                        <i className="material-icons right">
                                            assignment_turned_in
                                        </i>
                                    </button>
                                </td>
                                <td>
                                    <span style={{ marginLeft: "1rem" }}>
                                        Mark this button to finish off a task
                                    </span>
                                </td>
                            </tr>
                            <br />
                            <tr>
                                <td>
                                    <button className="waves-effect btn-floating btn-small pulse">
                                        <i className="material-icons">create</i>
                                    </button>
                                </td>
                                <td>
                                    <span style={{ marginLeft: "1rem" }}>
                                        Click this button to edit a task
                                    </span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <h5 className="center-align" style={{ marginTop: "5rem" }}>
                    Please Login / Register to maintain Todos
                </h5>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(LandingPage);
