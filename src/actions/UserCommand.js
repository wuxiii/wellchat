import ActionTypes from '.'
import Http from '../Http';

export default class UserCommand {
    static login(dispatch, request) {
        Http
            .post('/user/login', request)
            .then(result => {
                dispatch({type: ActionTypes.USER_LOGIN_SUCCESS, response: result});
                this.info(dispatch);
            })
    }
    static info(dispatch) {
        Http
            .get('/user/info')
            .then(result => {
                dispatch({type: ActionTypes.USER_LOGIN_SUCCESS, response: result.data});
            })
    }
    static token_login(dispatch, request) {
        Http
            .post('/user/login/token', request)
            .then(result => {
                dispatch({type: ActionTypes.USER_LOGIN_SUCCESS, response: result});
                this.info(dispatch);
            })
    }
}