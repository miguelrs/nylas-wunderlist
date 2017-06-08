import { Menu, MenuItem, RetinaImg, Toast } from 'nylas-component-kit'
import { Actions, DatabaseStore, React, ReactDOM, Thread } from 'nylas-exports'
import { WunderlistAuthStore, WunderlistLoadingStore } from '../stores'
import WunderlistLoginPopover from './WunderlistLoginPopover'
import WunderlistPopover from './WunderlistPopover'

/**
 * Toolbar button to add an email as a Wunderlist Task.
 *
 * @author Miguel Rosales
 */
export default class WunderlistToolbarButton extends React.Component {
    static displayName = 'WunderlistToolbarButton'

    static propTypes = {
        // This comes in the props because it is registered as a thread action button.
        thread: React.PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props)
        this.state = this._getStateFromStores()
    }

    componentDidMount() {
        this.unsubscribeAuthStore = WunderlistAuthStore.listen(this._onChange)
        this.unsubscribeLoadingStore = WunderlistLoadingStore.listen(this._onChange)
    }

    componentWillUnmount() {
        this.unsubscribeAuthStore()
        this.unsubscribeLoadingStore()
    }

    _onChange = () => {
        this.setState(this._getStateFromStores())
    }

    _getStateFromStores = () => {
        return {
            authorized: WunderlistAuthStore.isAuthorized(),
            loading: WunderlistLoadingStore.isLoading(),
        }
    }

    onClick = () => {
        const buttonRectangle = ReactDOM.findDOMNode(this.refs.wunderlist_button).getBoundingClientRect()

        let popover
        if (this.state.authorized) {
            popover = <WunderlistPopover thread={this.props.thread}/>
        } else {
            popover = <WunderlistLoginPopover/>
        }

        Actions.openPopover(
            popover,
            {
                originRect: buttonRectangle,
                direction: 'down',
            },
        )
    }

    render() {
        const {loading} = this.state

        let img = loading
            ? 'nylas://nylas-wunderlist/assets/toolbar_button_spinner@2x.svg'
            : 'nylas://nylas-wunderlist/assets/nylas-wunderlist-toolbar@2x.png'

        return (
            <button
                className={'btn btn-toolbar'}
                onClick={this.onClick}
                ref='wunderlist_button'
                title='Add to Wunderlist'
                disabled={loading}
            >
                <RetinaImg mode={RetinaImg.Mode.ContentIsMask} url={img}/>
            </button>
        )
    }
}
