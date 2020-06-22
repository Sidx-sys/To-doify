import {
    GET_TODOS,
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
    TODOS_LOADING,
    TO_EDIT_TODO,
} from "../actions/types";

const initialState = {
    todos: [],
    loading: false,
    editMap: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TODOS:
            let EditMap = [];
            action.payload.forEach((todo) => {
                EditMap = [...EditMap, { _id: todo._id, toEdit: false }];
            });
            return {
                ...state,
                todos: action.payload,
                loading: false,
                editMap: EditMap,
            };
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(
                    (todo) => todo._id !== action.payload
                ),
                editMap: state.editMap.filter(
                    (todo) => todo._id !== action.payload
                ),
            };
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload],
                editMap: [
                    ...state.editMap,
                    { _id: action.payload._id, toEdit: false },
                ],
            };
        case EDIT_TODO:
            const elementsIndex = state.todos.findIndex(
                (element) => element._id === action.payload._id
            );
            let newTodos = [...state.todos];
            newTodos[elementsIndex] = {
                ...newTodos[elementsIndex],
                title: action.payload.title,
                content: action.payload.content,
            };

            const elementsIndex2 = state.editMap.findIndex(
                (element) => element._id === action.payload._id
            );
            let newEditMap = [...state.editMap];
            newEditMap[elementsIndex2] = {
                ...newEditMap[elementsIndex2],
                toEdit: false,
            };

            return {
                ...state,
                todos: newTodos,
                editMap: newEditMap,
            };
        case TO_EDIT_TODO:
            const editIndex = state.editMap.findIndex(
                (element) => element._id === action.payload
            );
            let toEditMap = [...state.editMap];
            toEditMap[editIndex] = {
                ...toEditMap[editIndex],
                toEdit: true,
            };

            return {
                ...state,
                editMap: toEditMap,
            };
        case TODOS_LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
}
