import {React, ReactDOM, Actions} from 'nylas-exports';
import {RetinaImg, Menu, MenuItem, Toast} from 'nylas-component-kit';
import WunderlistPopover from './WunderlistPopover';

/**
 * Toolbar button to add an email as a Wunderlist Task.
 */
export default class WunderlistToolbarButton extends React.Component {

    static displayName = 'WunderlistToolbarButton';

    static propTypes = {
        // This comes in the props because it is registered as a thread action button.
        thread: React.PropTypes.object.isRequired,
    };

    onClick() {
        const buttonRectangle = ReactDOM.findDOMNode(this.refs.wunderlist_button).getBoundingClientRect();

        Actions.openPopover(
            <WunderlistPopover thread={this.props.thread}/>,
            {
                originRect: buttonRectangle,
                direction: 'down',
            }
        );
    }

    render() {
        return (
            <button
                className={'btn btn-toolbar'}
                onClick={this.onClick.bind(this)}
                title='Add to Wunderlist'
                ref='wunderlist_button'
            >
                <RetinaImg
                    mode={RetinaImg.Mode.ContentIsMask}
                    url='nylas://nylas-wunderlist/assets/nylas-wunderlist-toolbar@2x.png'
                />
            </button>
        );
    }
}
