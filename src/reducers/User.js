import ActionType from '../actions'
import Storage from '../Storage'

const initialState = {
    data: '',
    token: '',
    is_first: false
};
export default function User(state = initialState, action) {
    switch (action.type) {
        case ActionType.USER_LOGIN_SUCCESS:
            Storage.save('user', {
                ...state,
                ...action.response
            });
            return {
                ...state,
                ...action.response
            };
        default:
            return state;
    }
}