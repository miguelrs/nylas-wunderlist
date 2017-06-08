import { Set } from 'immutable'
import NylasStore from 'nylas-store'
import WunderlistActions from '../actions'

/**
 * Store that keeps track of whether there are active requests,
 * in order to show spinners, for example.
 *
 * @author Miguel Rosales Sueiro
 */
class WunderlistLoadingStore extends NylasStore {

    /**
     * WunderlistApiStore constructor.
     */
    constructor() {
        super()

        this.activeRequests = new Set()

        this.listenTo(WunderlistActions.startLoading, this._addActiveRequest)
        this.listenTo(WunderlistActions.finishLoading, this._deleteActiveRequest)
    }

    /**
     * Returns whether there is any active requests.
     *
     * @returns {Account}
     */
    isLoading = () => {
        return !this.activeRequests.isEmpty()
    }

    /**
     * Adds the given URL as one of the active requests.
     *
     * @returns {string} url
     */
    _addActiveRequest = (url) => {
        this.activeRequests = this.activeRequests.add(url)
        this.trigger()
    }

    /**
     * Removes the given URL as one of the active requests.
     *
     * @param {string} url
     */
    _deleteActiveRequest = (url) => {
        this.activeRequests = this.activeRequests.delete(url)
        this.trigger()
    }
}

export default new WunderlistLoadingStore()
