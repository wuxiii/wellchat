import ActionType from '../actions'
import Storage from '../Storage'

const initialState = {
    status: ''
};
export default function Env(state = initialState, action) {
    switch (action.type) {
        default:
            return {
                ...state,
                status: action.type
            };
    }
}