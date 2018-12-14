import {Toast} from 'antd-mobile-rn';
import Config from './Config'

export default class Http {
    static get = (url) => {
        url = url.indexOf('http') == 0
            ? url
            : Config.baseUrl + url
        return new Promise(((resolve, reject) => {
            fetch(url, {
                    credentials: 'include',
                    method: 'GET',
                    mode: "cors",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    if (result.error) {
                        let toast = result.status
                            ? '[' + result.status + '] '
                            : '';
                        Toast.fail(toast + result.error, 1);
                    } else if (!result.success && result.msg) {
                        Toast.fail(result.msg, 1);
                    } else {
                        resolve(result);
                    }
                })
                .catch(error => {
                    console.log('response error');
                    console.log(error);
                    Toast.offline('请求失败', 1);
                })
        }))
    };
    static post = (url, data) => {
        url = url.indexOf('http') == 0
            ? url
            : Config.baseUrl + url
        return new Promise(((resolve, reject) => {
            fetch(url, {
                credentials: 'include',
                method: 'POST',
                mode: "cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    if (result.error) {
                        let toast = result.status
                            ? '[' + result.status + '] '
                            : '';
                        Toast.fail(toast + result.error, 1);
                    } else if (!result.success && result.msg) {
                        Toast.fail(result.msg, 1);
                    } else {
                        resolve(result);
                    }
                })
                .catch(error => {
                    console.log('response error');
                    console.log(error);
                    Toast.offline('请求失败', 1);
                })
        }))
    }
}