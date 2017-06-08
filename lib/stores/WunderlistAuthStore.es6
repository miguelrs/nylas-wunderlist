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

        const oauthConfig = NylasEnv.config.get('nylas-wunderlist.oauthConfig')
        const oauthWindowParams = NylasEnv.config.get('nylas-wunderlist.oauthWindowParams')

        const myApiOauth = electronOauth2(oauthConfig, oauthWindowParams)

        WunderlistActions.startLoading()
        myApiOauth.getAuthorizationCode().then(code => {
            Logger.logRequestSucceed(oauthConfig.authorizationUrl, {}, {code: code})

            const tokenUrl = oauthConfig.tokenUrl + code
            Requester.get(
                tokenUrl,
                (data) => {
                    this.token = data.access_token
                    localStorage.setItem('nylas-wunderlist.access_token', this.token)
                    this.trigger(this.isAuthorized())
                    WunderlistActions.finishLoading()
                },
                (data) => {
                    return data.hasOwnProperty('access_token')
                },
            )
        }).catch(error => {
            Logger.logRequestFailed(oauthConfig.authorizationUrl, error)
            WunderlistActions.finishLoading()
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
