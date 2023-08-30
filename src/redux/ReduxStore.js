import React from "react";
import { createDispatchHook, createSelectorHook } from "react-redux";
import initStore from "./store";

export default class ReduxStore {
    static store = null;
    static context = null;
    static useSelector = null;
    static useDispatch = null;
    static initStore = (_context) => {
        this.context = _context;
        this.store = initStore();
        this.useSelector = createSelectorHook(_context);
        this.useDispatch = createDispatchHook(_context)
    }
}