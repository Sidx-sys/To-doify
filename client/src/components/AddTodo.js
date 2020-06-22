import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions/todoActions";
import classnames from "classnames";
import { clearErrors } from "../actions/errorActions";

class AddTodo extends Component {
    state = {
        title: "",
        content: "",
    };

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const newTodo = {
            title: this.state.title,
            content: this.state.content,
        };
        document.querySelector("#form").reset();
        this.setState({
            title: "",
            content: "",
        });
        this.props.addTodo(newTodo);
        this.props.clearErrors();
    };

    render() {
        const { error } = this.props;
        const errors = error.msg;
        return (
            <div
                className="card col l4 m6 s12 push-s2 push-m1 hoverable cyan lighten-4"
                id="size"
                key="1232312"
            >
                <div className="card-content">
                    <span className="card-title">
                        <em>Add To-do</em>{" "}
                        <span className="material-icons">note_add</span>
                    </span>
                    <form
                        className="col s12 cyan lighten-4"
                        onSubmit={this.onSubmit}
                        id="form"
                    >
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    id="title"
                                    type="text"
                                    className="validate"
                                    error={errors.title}
                                    onChange={this.onChange}
                                    className={classnames("", {
                                        invalid: errors.title,
                                    })}
                                />
                                <label htmlFor="title">Title</label>
                                <span className="red-text">{errors.title}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    id="content"
                                    type="text"
                                    className="validate"
                                    error={errors.content}
                                    onChange={this.onChange}
                                    className={classnames("", {
                                        invalid: errors.content,
                                    })}
                                />
                                <label htmlFor="content">Description</label>
                                <span className="red-text">
                                    {errors.content}
                                </span>
                            </div>
                            <button className="btn waves-effect waves-light btn-small">
                                Add
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    error: state.error,
});

export default connect(mapStateToProps, { addTodo, clearErrors })(AddTodo);
