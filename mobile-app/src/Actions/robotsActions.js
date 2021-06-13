export const ACTIONS_TYPES = {
    INIT: 'INIT_ROBOT',
    ADD: 'ADD_ROBOT',
    REMOVE: 'REMOVE_ROBOT'
};

export const initRobots = (robots) => ({
    type: ACTIONS_TYPES.INIT,
    payload: robots
});

export const addRobot = (robot) => ({
    type: ACTIONS_TYPES.ADD,
    payload: robot
});

export const removeRobot = (id) => ({
    type: ACTIONS_TYPES.REMOVE,
    payload: id
});
