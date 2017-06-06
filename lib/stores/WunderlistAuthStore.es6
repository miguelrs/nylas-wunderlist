import electronOauth2 from 'electron-oauth2'
import NylasStore from 'nylas-store'
import WunderlistActions from '../actions'
import { Logger, Requester } from '../services'

/**
 * Store for the actions related with Wunderlist API.
 */
class WunderlistAuthStore extends NylasStore {

    /**
     * WunderlistApiStore constructor.
     */
    constructor() {
        super()

        this.token = localStorage.getItem('nylas-wunderlist.access_token')

        this.listenTo(WunderlistActions.authorize, this._authorize.bind(this))

        // Set timeout to give the other store time to start listening. TODO: Improve this.
        setTimeout(() => {
            this.trigger(this.isAuthorized())
            this._refresh()
        }, 1000)
    }

    isAuthorized = () => this.token !== null

    /**
     * Ensures there is an access token and runs the callback afterwards.
     */
    _authorize() {
        if (this.authorized) {
            return
        }

        const myApiOauth = electronOauth2(
            NylasEnv.config.get('nylas-wunderlist.oauthConfig'),
            NylasEnv.config.get('nylas-wunderlist.oauthWindowParams'),
        )

        const authUrl = NylasEnv.config.get('nylas-wunderlist.oauthConfig.authorizationUrl')
        myApiOauth.getAuthorizationCode().then(code => {
            Logger.logRequestSucceed(authUrl, {}, {code: code})

            const tokenUrl = NylasEnv.config.get('nylas-wunderlist.oauthConfig.tokenUrl') + code
            Requester.makeRequest(tokenUrl, (error, response, data) => {
                if (error !== null || !data.access_token) {
                    Logger.logRequestFailed(tokenUrl, error, response, data)
                    return
                }

                Logger.logRequestSucceed(tokenUrl, response, data)

                this.token = data.access_token
                localStorage.setItem('nylas-wunderlist.access_token', this.token)

                this.trigger(this.isAuthorized())
            })
        }).catch(error => {
            Logger.logRequestFailed(authUrl, error)
        })
    }

    /**
     * Triggers every 10 minutes so data can refreshed.
     * TODO: make this configurable and add a manual refresh button.
     * TODO: handle expired token (although it seems Wunderlist API tokens don't expire!).
     */
    _refresh = () => {
        setTimeout(() => {
            this.trigger(this.isAuthorized())
            this._refresh()
        }, 600000)
    }
}

export default new WunderlistAuthStore()
