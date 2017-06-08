import request from 'request'
import WunderlistActions from '../../actions'
import { Logger } from '../index'

/**
 * Service to make requests to the Wunderlist API.
 *
 * @author Miguel Rosales Sueiro
 */
class Requester {

    /**
     *
     * @param url
     * @param processor
     * @param validator
     */
    get(url, processor, validator = null) {
        return this._request(url, null, processor, validator)
    }

    /**
     *
     * @param url
     * @param body
     * @param processor
     * @param validator
     */
    post(url, body, processor, validator = null) {
        return this._request(url, body, processor, validator)
    }

    /**
     *
     * @param uri
     * @param body
     * @param processor
     * @param validator
     * @returns {*}
     * @private
     */
    _request = (uri, body, processor, validator = null) => {
        WunderlistActions.startLoading()
        Logger.logRequestStarted(uri, body)

        return request({
            uri: uri,
            method: body === null ? 'GET' : 'POST',
            headers: {
                'X-Client-ID': NylasEnv.config.get('nylas-wunderlist.oauthConfig.clientId'),
                'X-Access-Token': localStorage.getItem('nylas-wunderlist.access_token'),
            },
            json: true,
            body: body,
        }, (error, response, data) => {
            if (error !== null || (validator !== null && !validator(data))) {
                Logger.logRequestFailed(uri, error, response, data)
                WunderlistActions.finishLoading()
                return
            }

            Logger.logRequestSucceed(uri, response, data)
            processor(data)
            WunderlistActions.finishLoading()
        })
    }
}

export default new Requester()
