export const TODO_ACTIONS = {
    //async ADD_TODO operations
    FETCH_START: 'FETCH_START',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_ERROR: 'FETCH_ERROR',
    //todo operations
    ADD_TODO_START: 'ADD_TODO_START',
    ADD_TODO_SUCCESS: 'ADD_TODO_SUCCESS',
    ADD_TODO_ERROR: 'ADD_TODO_ERROR',
    COMPLETE_TODO_START: 'COMPLETE_TODO_START',
    COMPLETE_TODO_SUCCESS: 'COMPLETE_TODO_SUCCESS',
    COMPLETE_TODO_ERROR: 'COMPLETE_TODO_ERROR',
    UPDATE_TODO_START: 'UPDATE_TODO_START',
    UPDATE_TODO_SUCCESS: 'UPDATE_TODO_SUCCESS',
    UPDATE_TODO_ERROR: 'UPDATE_TODO_ERROR',
    //UI operations
    SET_SORT: 'SET_SORT',
    SET_FILTER: 'SET_FILTER',
    CLEAR_ERROR: 'CLEAR_ERROR',
    SET_FILTERS: 'SET_FILTERS',
}

export const initialTodoState = {
    todoList: [],
    error: "",
    filterError: "",
    isTodoListLoading: false,
    sortBy: "createdAt",
    sortDirection: "asc",
    filterTerm: "",
    dataVersion: 0,    
}

export function todoReducer(state, action) {
    switch (action.type) {
        //add cases here
        default:
            throw new Error(`Unknown action type: ${action.type}`);
        }
}