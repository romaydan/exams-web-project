export const ACTIONS = {
    SELECT_ONE: 'select-one',
    SELECT_MULTIPLE: 'select-mul',
    SET: 'set',
    FILTER: 'filter'
};
export const radioButtonReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SELECT_ONE:
            return state.map((ans) => ({
                ...ans,
                selected: ans._id === action.payload._id,
            }));
        case ACTIONS.SELECT_MULTIPLE:
            return state.map((ans) =>
                ans._id === action.payload._id
                    ? {
                        ...ans,
                        selected: !ans.selected,
                    }
                    : ans
            );
        case ACTIONS.SET:
            return action.payload;
        default:
            break;
    }
};