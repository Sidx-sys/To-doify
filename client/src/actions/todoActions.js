import axios from "axios";
import {
    GET_TODOS,
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
    TODOS_LOADING,
    TO_EDIT_TODO,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getTodos = () => (dispatch) => {
    dispatch(setTodosLoading());
    axios
        .get("/api/items")
        .then((res) => {
            dispatch({
                type: GET_TODOS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const deleteTodo = (id) => (dispatch, getState) => {
    const config = tokenConfig(getState);
    axios
        .delete(`/api/items/${id}`, config)
        .then((res) =>
            dispatch({
                type: DELETE_TODO,
                payload: id,
            })
        )
        .catch((err) =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const addTodo = (todo) => (dispatch, getState) => {
    const config = tokenConfig(getState);
    axios
        .post("/api/items", todo, config)
        .then((res) =>
            dispatch({
                type: ADD_TODO,
                payload: res.data,
            })
        )
        .catch((err) =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const editTodo = (todo) => (dispatch, getState) => {
    const config = tokenConfig(getState);
    const body = {
        title: todo.title,
        content: todo.content,
    };
    axios
        .put(`/api/items/${todo._id}`, body, config)
        .then((res) => {
            dispatch({
                type: EDIT_TODO,
                payload: todo,
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const setTodosLoading = () => {
    return {
        type: TODOS_LOADING,
    };
};

export const toEditTodo = (_id) => {
    return {
        type: TO_EDIT_TODO,
        payload: _id,
    };
};
