import request from 'request'
import { Logger } from '../index'

/**
 * Service to make requests to the Wunderlist API.
 *
 * @author Miguel Rosales Sueiro
 */
class Requester {
    /**
     * Makes a request to Wunderlist API with the given parameters.
     *
     * @param {string} uri
     * @param {function} callback
     * @param {*} body
     * @returns {request}
     */
    makeRequest(uri, callback, body = null) {
        Logger.logRequestStarted(uri, body)
        return request({
            uri: uri,
            method: body === null ? 'GET' : 'POST',
            headers: {
                // 'X-Client-ID': NylasEnv.config.get('nylas-wunderlist.clientId'),
                'X-Client-ID': '6bea596d4278c3d9896b',
                'X-Access-Token': localStorage.getItem('nylas-wunderlist.access_token'),
            },
            json: true,
            body: body,
        }, callback)
    }
}

export default new Requester()
