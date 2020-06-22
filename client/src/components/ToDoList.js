import React, { Component } from "react";
import { connect } from "react-redux";
import { getTodos, deleteTodo } from "../actions/todoActions";
import propTypes from "prop-types";
import M from "materialize-css";

import "./ToDoList.css";
import Preloader from "./Preloader";
import { addTodo, toEditTodo } from "../actions/todoActions";
import "./AddTodo";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";

class Todos extends Component {
    static propTypes = {
        getTodos: propTypes.func.isRequired,
        deleteTodo: propTypes.func.isRequired,
        addTodo: propTypes.func.isRequired,
        toEditTodo: propTypes.func.isRequired,
        todo: propTypes.object.isRequired,
    };

    componentDidMount() {
        this.props.getTodos();
        if (!this.props.isAuthenticated) this.props.history.push("/");
    }

    deleteTodo = (id) => {
        this.props.deleteTodo(id);
    };

    undoDelete = (todo) => {
        let undo = document.querySelector("#undo");
        undo.addEventListener("click", () => {
            this.props.addTodo(todo);
            M.Toast.dismissAll();
        });
    };

    render() {
        const { todos, loading, editMap } = this.props.todo;

        if (loading) {
            return <Preloader />;
        }

        let todoList = todos.length ? (
            todos.map((todo) => {
                const editIndex = editMap.findIndex(
                    (element) => element._id === todo._id
                );
                if (editMap[editIndex].toEdit) {
                    return <EditTodo todo={todo} />;
                }
                return (
                    <div
                        className="card col l4 m6 s12 push-s2 push-m1 hoverable cyan lighten-4"
                        id="size"
                        key={todo._id}
                    >
                        <div className="card-content">
                            <span className="card-title">{todo.title}</span>
                            <p className="card-text">{todo.content}</p>
                            <br />
                            <button
                                className="btn"
                                id="done"
                                onClick={() => {
                                    this.props.deleteTodo(todo._id);
                                    const deletedTodo = {
                                        title: todo.title,
                                        content: todo.content,
                                    };
                                    let toastHTML =
                                        '<span>Deleted</span><button class="btn-flat toast-action" id="undo">Undo</button>';
                                    M.toast({
                                        html: toastHTML,
                                        classes: "rounded",
                                    });
                                    this.undoDelete(deletedTodo);
                                }}
                            >
                                Done
                                <i className="material-icons right">
                                    assignment_turned_in
                                </i>
                            </button>
                            <button
                                className="waves-effect btn-floating btn-small"
                                id="edit"
                                onClick={() => {
                                    this.props.toEditTodo(todo._id);
                                }}
                            >
                                <i className="material-icons">create</i>
                            </button>
                        </div>
                        <div className="divider"></div>
                    </div>
                );
            })
        ) : (
            <div className="collection">
                <a
                    href="#!"
                    className="collection-item hoverable deep-purple lighten-4"
                >
                    <span className="badge"></span>No new tasks...
                </a>
            </div>
        );
        return (
            <div className="row center-align">
                {todoList}
                <AddTodo />
            </div>
        );
    }
}

const mapStatetoProps = (state) => ({
    todo: state.todo,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStatetoProps, {
    getTodos,
    deleteTodo,
    addTodo,
    toEditTodo,
})(Todos);
