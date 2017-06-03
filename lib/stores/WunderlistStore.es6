import electronOauth2 from 'electron-oauth2'
import { Map, Seq } from 'immutable'
import { Actions, NylasAPI } from 'nylas-exports'
import NylasStore from 'nylas-store'
import request from 'request'
import Logger from '../logger/Logger'
import { Account, Folder, List } from '../model'

const config = {
    clientId: '6bea596d4278c3d9896b',
    authorizationUrl: 'https://www.wunderlist.com/oauth/authorize',
    redirectUri: 'https://github.com/miguelrs/nylas-wunderlist',
    useBasicAuthorizationHeader: false //???
}

// ???
const windowParams = {
    alwaysOnTop: true,
    autoHideMenuBar: true,
    webPreferences: {
        nodeIntegration: false,
    },
}

const myApiOauth = electronOauth2(config, windowParams)

/**
 * Store for the actions related with Wunderlist API.
 */
class WunderlistStore extends NylasStore {

    /**
     * WunderlistStore constructor.
     */
    constructor() {
        super()

        this.account = new Account()
        this.token = localStorage.getItem('nylas-wunderlist.access_token')

        this.authorize(() => {
            this.fetchFolders()
            this.fetchListPositions()
            this.fetchLists()
        })
    }

    /**
     * Ensures there is an access token and runs the callback afterwards.
     *
     * @param {function} callback
     */
    authorize(callback) {
        if (this.token !== null) {
            callback()
            return
        }

        myApiOauth.getAuthorizationCode().then(code => {
            Logger.logRequestSucceed(config.authorizationUrl, {}, {code: code})

            const uri = 'https://nylas-wunderlist.herokuapp.com/authenticate/' + code
            this.makeRequest(uri, (error, response, data) => {
                if (error !== null || !data.access_token) {
                    Logger.logRequestFailed(uri, error, response, data)
                    return
                }

                Logger.logRequestSucceed(uri, response, data)
                this.token = data.access_token
                localStorage.setItem('nylas-wunderlist.access_token', this.token)
                callback()
            })
        }).catch(error => {
            Logger.logRequestFailed(config.authorizationUrl, error)
        })
    }

    /**
     * Fetches Folders from Wunderlist API.
     *
     * @returns {request}
     */
    fetchFolders() {
        const uri = this.getUri('folders')

        return this.makeRequest(uri, (error, response, data) => {
            if (error !== null || !Array.isArray(data)) {
                Logger.logRequestFailed(uri, error, response, data)
                return
            }

            Logger.logRequestSucceed(uri, response, data)
            this.account = this.account.addFolders(
                Map(data.map(folderData => [folderData.id, new Folder(folderData)])),
            )
            this.trigger()
        })
    }

    /**
     * Fetches List positions from Wunderlist API.
     *
     * @returns {request}
     */
    fetchListPositions() {
        const uri = this.getUri('list_positions')

        return this.makeRequest(uri, (error, response, data) => {
            if (error !== null || !Array.isArray(data)) {
                Logger.logRequestFailed(uri, error, response, data)
                return
            }

            Logger.logRequestSucceed(uri, response, data)
            this.account = this.account.setListPositions(
                Seq(data[0].values),
            )
            this.trigger()
        })
    }

    /**
     * Fetches Lists from Wunderlist API.
     *
     * @returns {request}
     */
    fetchLists() {
        const uri = this.getUri('lists')

        return this.makeRequest(uri, (error, response, data) => {
            if (error !== null || !Array.isArray(data)) {
                Logger.logRequestFailed(uri, error, response, data)
                return
            }

            Logger.logRequestSucceed(uri, response, data)
            this.account = this.account.addLists(
                Map(data.map(listData => [listData.id, new List(listData)])),
            )
            this.trigger()
        })
    }

    /**
     * Posts a Task to Wunderlist API.
     *
     * @returns {request}
     */
    postTask(task) {
        const uri = this.getUri('tasks')
        const postData = task.toJS()

        return this.makeRequest(uri, (error, response, data) => {
            if (error !== null) {
                Logger.logRequestFailed(uri, error, response, data)
                return
            }

            Logger.logRequestSucceed(uri, response, data)
            this.trigger()
        }, postData)
    }

    /**
     * Returns the active account.
     *
     * @returns {Account}
     */
    getAccount() {
        return this.account
    }

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
                'X-Access-Token': this.token,
            },
            json: true,
            body: body,
        }, callback)
    }

    getUri = (endpoint) => 'https://a.wunderlist.com/api/v1/' + endpoint
}

export default new WunderlistStore()
