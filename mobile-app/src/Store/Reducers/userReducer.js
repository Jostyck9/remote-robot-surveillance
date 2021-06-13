import { ACTIONS_TYPES } from '../../Actions/userActions';

const INITIAL_STATE = {
    state: 0,
    url: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTIONS_TYPES.INIT:
            return { ...state, state: 0, url: '' };
        case ACTIONS_TYPES.MASTER:
            return { ...state, state: 1, url: action.payload};
        case ACTIONS_TYPES.SPECTATOR:
            return { ...state, state: 2, url: action.payload };
        default:
            return state;
    }
};
