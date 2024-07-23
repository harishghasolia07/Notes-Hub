import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";

const rootReducer = combineReducers({
    user: userReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

//OR

// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./slices/user-slice";


// export const store = configureStore({
//     reducer: userReducer,
// });

//Note: Use combineReducers if you anticipate having multiple slices of state and want a modular, scalable setup. It’s particularly useful for larger applications where state management can become complex.