import { Menu, MenuItem, RetinaImg, Toast } from 'nylas-component-kit'
import { Actions, DatabaseStore, React, ReactDOM, Thread } from 'nylas-exports'
import WunderlistAuthStore from '../stores/WunderlistAuthStore'
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
        this.state = this.getStateFromStores()
    }

    componentDidMount() {
        this.unsubscribe = WunderlistAuthStore.listen(this.onChange)
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    onChange = () => {
        this.setState(this.getStateFromStores())
    }

    getStateFromStores = () => {
        return {
            authorized: WunderlistAuthStore.isAuthorized(),
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
        return (
            <button
                className={'btn btn-toolbar'}
                onClick={this.onClick}
                ref='wunderlist_button'
                title='Add to Wunderlist'
            >
                <RetinaImg
                    mode={RetinaImg.Mode.ContentIsMask}
                    url='nylas://nylas-wunderlist/assets/nylas-wunderlist-toolbar@2x.png'
                />
            </button>
        )
    }
}
