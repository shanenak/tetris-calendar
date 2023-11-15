import { combineReducers } from "redux";
import puzzleReducer from "./puzzle-reducer";


const reducers = combineReducers({
    puzzle: puzzleReducer
});

export default reducers