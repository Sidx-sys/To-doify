import React, { Component } from "react";
import { connect } from "react-redux";
import { editTodo } from "../actions/todoActions";
import { toEditTodo } from "../actions/todoActions";
import classnames from "classnames";
import { clearErrors } from "../actions/errorActions";

class EditTodo extends Component {
    state = {
        title: this.props.todo.title,
        content: this.props.todo.content,
    };

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const newTodo = {
            _id: this.props.todo._id,
            title: this.state.title,
            content: this.state.content,
        };
        this.props.editTodo(newTodo);
        this.props.toEditTodo(this.props._id);
        this.props.clearErrors();
    };

    render() {
        const { error } = this.props;
        const errors = error.msg;
        return (
            <div
                className="card col l4 m6 s12 push-s2 push-m1 hoverable cyan lighten-4"
                id="size"
                key="12323121"
            >
                <div className="card-content">
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
                                    onChange={this.onChange}
                                    error={errors.title}
                                    value={this.state.title}
                                    className={classnames("", {
                                        invalid: errors.title,
                                    })}
                                />
                                <label className="active" htmlFor="title">
                                    Title
                                </label>
                                <span className="red-text">{errors.title}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    id="content"
                                    type="text"
                                    className="validate"
                                    onChange={this.onChange}
                                    error={errors.content}
                                    value={this.state.content}
                                    className={classnames("", {
                                        invalid: errors.content,
                                    })}
                                />
                                <label className="active" htmlFor="content">
                                    Description
                                </label>
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

export default connect(mapStateToProps, { editTodo, toEditTodo, clearErrors })(
    EditTodo
);
