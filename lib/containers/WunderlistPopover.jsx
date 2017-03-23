import {React} from 'nylas-exports';
import Icon from '../components/Icon';
import Popover from '../components/Popover';
import WunderlistListPickerMenu from './WunderlistListPickerMenu';

/**
 *
 */
export default class WunderlistPopover extends React.Component {

    static displayName = 'WunderlistPopover';

    static propTypes = {
        thread: React.PropTypes.object.isRequired,
        toDo: React.PropTypes.shape({
            list_id: React.PropTypes.number.isRequired,
            list_title: React.PropTypes.string.isRequired,
            title: React.PropTypes.string.isRequired,
        }),
    };

    renderConfirmation() {
        return (
            <Popover style={styles.popover}>
                <p><Icon icon="assignment-turned-in" size={32}/></p>
                <p>ToDo created successfully!</p>
            </Popover>
        );
    }

    renderListPickerMenu() {
        return (
            <Popover>
                <WunderlistListPickerMenu thread={this.props.thread}/>
            </Popover>
        );
    }

    render() {
        const {toDo} = this.props;

        if (toDo) {
            return this.renderConfirmation();
        } else {
            return this.renderListPickerMenu();
        }
    }
}

const styles = {
    popover: {
        textAlign: 'center',
    },
};
