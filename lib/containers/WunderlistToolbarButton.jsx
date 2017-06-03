import { Menu, MenuItem, RetinaImg, Toast } from 'nylas-component-kit'
import { Actions, DatabaseStore, React, ReactDOM, Thread } from 'nylas-exports'
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

    onClick() {
        const buttonRectangle = ReactDOM.findDOMNode(this.refs.wunderlist_button).getBoundingClientRect()

        Actions.openPopover(
            <WunderlistPopover thread={this.props.thread}/>,
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
                onClick={this.onClick.bind(this)}
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
