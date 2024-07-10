import { combineReducers } from "redux";
import userReducer from "./userReducer";
// import someOtherReducer from "./someOtherReducer"; // Esta línea está causando el problema

const rootReducer = combineReducers({
    user: userReducer,
  // other: someOtherReducer // Eliminar esta línea si no es necesario
});

export default rootReducer;
