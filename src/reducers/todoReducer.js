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
    RESET_FILTERS: 'RESET_FILTERS',
}

export const initialTodoState = {
    todoList: [],
    error: "",
    filterError: "",
    isTodoListLoading: true,
    sortBy: "createdAt",
    sortDirection: "asc",
    filterTerm: "",
    dataVersion: 0,    
}

export function todoReducer(state, action) {
    switch (action.type) {
        case TODO_ACTIONS.FETCH_START:
            return {
                ...state,
                isTodoListLoading: true,
                error: '',
                filterError: '',
            };

        case TODO_ACTIONS.FETCH_SUCCESS:
            return {
                ...state,
                todoList: action.payload.todos,
                isTodoListLoading: false,
                error: '',
                filterError: '',
        };

        case TODO_ACTIONS.FETCH_ERROR:
            return {
                ...state,
                isTodoListLoading: false,
                error: action.payload.isFilterError
                    ? ''
                    : action.payload.message,
                filterError: action.payload.isFilterError
                    ? action.payload.message
                    : '',
        };

        case TODO_ACTIONS.ADD_TODO_START:
            return {
                ...state,
                //migrated logic: setTodoList((previous) => [newTodo, ...previous]);
        };

        case TODO_ACTIONS.ADD_TODO_SUCCESS:
            return {
                ...state,
                //migrated logic,
        };

        case TODO_ACTIONS.ADD_TODO_ERROR:
            return {
                ...state,
                //migrated logic,
        };

        //add cases here
        /*  example case skeleton
                case TODO_ACTIONS.ACTION_NAME:
            return {
                ...state,
                //migrated logic,
        };
        */
        default:
            throw new Error(`Unknown action type: ${action.type}`);
        }
}