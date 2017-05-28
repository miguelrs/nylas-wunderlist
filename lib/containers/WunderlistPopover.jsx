import {Actions, React} from "nylas-exports";
import Popover from "../components/Popover";
import {FixedPopover, Spinner} from "nylas-component-kit";
import WunderlistListPickerMenu from "./WunderlistListPickerMenu";
import WunderlistStore from "../stores/WunderlistStore";
import PopoverMessage from "../components/PopoverMessage";

/**
 *
 */
export default class WunderlistPopover extends FixedPopover {

    static displayName = 'WunderlistPopover';

    static propTypes = {
        thread: React.PropTypes.object.isRequired,
        toDo: React.PropTypes.shape({
            list_id: React.PropTypes.number.isRequired,
            list_title: React.PropTypes.string.isRequired,
            title: React.PropTypes.string.isRequired,
        }),
    };

    constructor(props) {
        super(props);
        this.state = this.getStateFromStores();
    }

    componentDidMount() {
        this.unsubscribe = WunderlistStore.listen(this.onChange);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onChange = () => {
        this.setState(this.getStateFromStores());
    };

    getStateFromStores = () => {
        return {
            loading: WunderlistStore.isLoading(),
            toDo: WunderlistStore.getCreatedToDo(),
        };
    };

    renderConfirmation() {
        return (
            <Popover style={styles.popover}>
                <PopoverMessage
                    icon="assignment-turned-in"
                    onClose={() => Actions.closePopover()}
                    text="ToDo created successfully!"
                    type="success"
                />
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

    renderSpinner() {
        return (
            <Popover>
                <Spinner visible={true} withCover={true}/>
            </Popover>
        );
    }

    render() {
        const {loading, toDo} = this.state;

        if (loading) {
            return this.renderSpinner();
        } else if (toDo) {
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
