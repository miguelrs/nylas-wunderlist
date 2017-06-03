/**
 * Service to log information and errors to console.
 *
 * @author Miguel Rosales Sueiro
 */
class Logger {

    /**
     * Logs that an API request has started.
     *
     * @param {string} uri
     * @param {*} body
     */
    logRequestStarted(uri, body = null) {
        console.log(this._getLogHeader())
        console.log('Request started to: ' + uri)
        console.log(body)
        console.log(this._getLogFooter())
    }

    /**
     * Logs that an API request has failed.
     *
     * @param {string} uri
     * @param {*} error
     * @param {*} response
     * @param {*} body
     */
    logRequestFailed(uri, error = null, response = null, body = null) {
        console.error(this._getLogHeader())
        console.error('Request failed to: ' + uri)
        console.error(error)
        console.error(response)
        console.error(body)
        console.error(this._getLogFooter())
    }

    /**
     * Logs that an API request has finished successfully.
     *
     * @param {string} uri
     * @param {*} response
     * @param {*} body
     */
    logRequestSucceed(uri, response = null, body = null) {
        console.log(this._getLogHeader())
        console.log('Request finished to: ' + uri)
        console.log(response)
        console.log(body)
        console.log(this._getLogFooter())
    }

    /**
     * Internal functions to print header and footer for a log entry.
     */
    _getLogHeader = () => '~-~ Wunderlist log (' + (new Date()).toString() + ') -~-~-~-~-~-~-~-~-~-~'
    _getLogFooter = () => '~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~'
}

export default new Logger()
