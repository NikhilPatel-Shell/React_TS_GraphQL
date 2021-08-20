import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import customerReducer from "./customers/reducer";
import createSagaMiddleware from "redux-saga";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export const rootReducers = combineReducers({
    customer: customerReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, createLogger({ collapsed: true })];

export const store = createStore(
    rootReducers,
    composeEnhancer(applyMiddleware(...middleware))
)

// sagaMiddleware.run();


export type State = ReturnType<typeof rootReducers>
export * as actionsCreators from './customers/actions'