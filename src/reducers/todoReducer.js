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
    CLEAR_FILTER_ERROR: 'CLEAR_FILTER_ERROR',
    RESET_FILTERS: 'RESET_FILTERS',
    DATA_VERSION_COUNT: 'DATA_VERSION_COUNT',
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
    //  let's explore flow
    console.log('REDUCER ACTION:', action.type);
    console.log('PAYLOAD:', action.payload);
    console.log('DATA VERSION:', state.dataVersion);
    console.log('BEFORE STATE:', state);
    console.log('****************************');


    //rest of code below
    switch (action.type) {
        case TODO_ACTIONS.DATA_VERSION_COUNT:
            return {
                ...state,
                dataVersion: state.dataVersion + 1,
            };

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
                todoList: [action.payload.newTodo, ...state.todoList],
                error: '',
            };

        case TODO_ACTIONS.ADD_TODO_SUCCESS:
            console.log('ADD SUCCESS - optimistic ID:', action.payload.newTodo.id);
            console.log('ADD SUCCESS - server data:', action.payload.data);
        
            return {
                ...state,
                todoList: state.todoList.map((todo) =>
                     todo.id === action.payload.newTodo.id ? action.payload.data : todo
                    ),
                //dataVersion: state.dataVersion + 1,
                isTodoListLoading: false,               
                error: '',
            };

        case TODO_ACTIONS.ADD_TODO_ERROR:
            return {
                ...state,
                todoList: state.todoList.filter((todo) => todo.id !== action.payload.newTodo.id),
                isTodoListLoading: false,
                error: action.payload.message,
            };

        case TODO_ACTIONS.COMPLETE_TODO_START:
            console.log('COMPLETE START ID:', action.payload.id);
            
            return {
                ...state,
                    // Optimistically mark the todo as completed
                todoList: state.todoList.map((todo) =>
                    todo.id === action.payload.id
                        ? { ...todo, isCompleted: true }
                        : todo
                    ),
                error: '',
            };

        case TODO_ACTIONS.COMPLETE_TODO_SUCCESS:
            console.log('COMPLETE SUCCESS ID:', action.payload.id);
            console.log('COMPLETE SUCCESS server data:', action.payload.data);
            
            return {
                ...state,
                todoList: state.todoList.map((todo) =>
                    todo.id === action.payload.id 
                        ? action.payload.data 
                        : todo
                ),
                //dataVersion: state.dataVersion + 1,
                error: '',
                isTodoListLoading: false,               

            }

        case TODO_ACTIONS.COMPLETE_TODO_ERROR:
            return {
                ...state,
                todoList: state.todoList.map((todo) =>
                    todo.id === action.payload.id 
                        ? action.payload.originalTodo 
                        : todo
                ),
                isTodoListLoading: false,               
                error: action.payload.message,
            };

        case TODO_ACTIONS.UPDATE_TODO_START:
            console.log('UPDATE START ID:', action.payload.editedTodo.id);
            console.log('UPDATE original:', action.payload.originalTodo);
        
             return {
                ...state,
                todoList: state.todoList.map((todo) =>
                    todo.id === action.payload.editedTodo.id 
                        ? { ...action.payload.editedTodo } 
                        : todo
                ),
                error: '',
            };

        case TODO_ACTIONS.UPDATE_TODO_SUCCESS:
            console.log('UPDATE SUCCESS optimistic ID:', action.payload.editedTodo.id);
            console.log('UPDATE SUCCESS server data:', action.payload.data);
        
            return {
                ...state,
                todoList: state.todoList.map((todo) =>
                    todo.id === action.payload.editedTodo.id 
                        ? action.payload.data 
                        : todo
                ),
                //dataVersion: state.dataVersion + 1,
                isTodoListLoading: false,               
                error: '',
            };

        case TODO_ACTIONS.UPDATE_TODO_ERROR:
            return {
                ...state,
                todoList: state.todoList.map((todo) =>
                    todo.id === action.payload.editedTodo.id 
                        ? action.payload.originalTodo 
                        : todo
                ),
                error: action.payload.message,
                isTodoListLoading: false,
            };

            
        case TODO_ACTIONS.SET_SORT:
            return {
                ...state,
                sortBy: action.payload.sortBy,
                sortDirection: action.payload.sortDirection,
                filterError: '',
            };

        case TODO_ACTIONS.SET_FILTER:
            return {
                ...state,
                filterTerm: action.payload.newTerm,
                filterError: '',
            };

        case TODO_ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                error: '',
            };

        case TODO_ACTIONS.CLEAR_FILTER_ERROR:
            return {
                ...state,
                filterError: '',
            };

        case TODO_ACTIONS.RESET_FILTERS:
            return {
                ...state,
                filterTerm: '',
                sortBy: 'createdAt',
                sortDirection: 'asc',
                filterError: '',
            };            

        default:
            throw new Error(`Unknown action type: ${action.type}`);
        }
}