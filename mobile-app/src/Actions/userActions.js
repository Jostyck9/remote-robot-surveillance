export const ACTIONS_TYPES = {
    INIT: 'SET_INIT',
    MASTER: 'SET_MASTER',
    SPECTATOR: 'SET_SPECTATOR',
};

export const setInit = () => ({
    type: ACTIONS_TYPES.INIT,
});

export const setMaster = (url) => ({
    type: ACTIONS_TYPES.MASTER,
    payload: url
});

export const setSpectator = (url) => ({
    type: ACTIONS_TYPES.SPECTATOR,
    payload: url
});
