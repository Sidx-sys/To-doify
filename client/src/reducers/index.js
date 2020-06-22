import { combineReducers } from "redux";
import todoReducer from "./todoReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
    todo: todoReducer,
    auth: authReducer,
    error: errorReducer,
});

export default rootReducer;
