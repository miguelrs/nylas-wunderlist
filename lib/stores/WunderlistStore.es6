import { Map, Seq } from 'immutable'
import NylasStore from 'nylas-store'
import WunderlistActions from '../actions'
import { Account, Folder, List } from '../model'
import { Logger, Requester } from '../services'
import WunderlistAuthStore from './WunderlistAuthStore'

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

        this.listenTo(WunderlistAuthStore, this._onAuthorizationChanged)
        this.listenTo(WunderlistActions.createTask, this._postTask)
    }

    /**
     * Returns the active account.
     *
     * @returns {Account}
     */
    getAccount = () => {
        return this.account
    }

    /**
     * Fetches Folders from Wunderlist API.
     *
     * @returns {request}
     */
    _fetchFolders = () => {
        const uri = this._getUri('folders')

        return Requester.makeRequest(uri, (error, response, data) => {
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
    _fetchListPositions = () => {
        const uri = this._getUri('list_positions')

        return Requester.makeRequest(uri, (error, response, data) => {
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
    _fetchLists = () => {
        const uri = this._getUri('lists')

        return Requester.makeRequest(uri, (error, response, data) => {
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
     * Returns the Wunderlist URI for the given endpoint.
     *
     * @param {string} endpoint
     */
    _getUri = (endpoint) => 'https://a.wunderlist.com/api/v1/' + endpoint

    /**
     *
     * @param {boolean} authorized
     */
    _onAuthorizationChanged = (authorized) => {
        if (authorized) {
            this._fetchFolders()
            this._fetchListPositions()
            this._fetchLists()
        }
    }

    /**
     * Posts a Task to Wunderlist API.
     *
     * @returns {request}
     */
    _postTask = (task) => {
        const uri = this._getUri('tasks')
        const postData = task.toJS()

        return Requester.makeRequest(uri, (error, response, data) => {
            if (error !== null) {
                Logger.logRequestFailed(uri, error, response, data)
                return
            }

            Logger.logRequestSucceed(uri, response, data)
            this.trigger()
        }, postData)
    }
}

export default new WunderlistStore()
