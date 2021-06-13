import { ACTIONS_TYPES } from '../../Actions/robotsActions';

const INITIAL_STATE = {
    robots: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTIONS_TYPES.INIT:
            return { ...state, robots: action.payload };
        case ACTIONS_TYPES.ADD:
            return { ...state, robots: [...state.robots, action.payload] };
        case ACTIONS_TYPES.REMOVE:
            return { ...state, robots: Object.values(state.robots).filter(el => el.robotId !== action.payload) };
        default:
            return state;
    }
};
