import {Actions, React} from "nylas-exports";
import {FixedPopover, Menu, Spinner} from "nylas-component-kit";
import WunderlistStore from "../stores/WunderlistStore";
import Icon from "../components/Icon";
import List from "../model/List";
import ToDo from "../model/ToDo";

export default class WunderlistPopover extends FixedPopover {

    static displayName = 'WunderlistPopover';

    static propTypes = {
        thread: React.PropTypes.object.isRequired,
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
            account: WunderlistStore.getAccount(),
        };
    };

    onSelectList(list) {
        const {thread} = this.props;

        if (!list instanceof List) {
            return;
        }

        WunderlistStore.postToDo(
            new ToDo({
                list_id: list.getId(),
                title: thread.subject,
            })
        );

        Actions.closePopover();
    }

    onEscape = () => {
        Actions.closePopover();
    };

    buildListPickerMenuItems() {
        const {account} = this.state;

        return account.getListsSorted().toArray();
    };

    renderMenuItem = (item) => {
        const iconLeft = item.isInbox() ? 'inbox' : 'list';

        return (
            <div key={item.getId()}>
                <span style={styles.iconLeft}><Icon icon={iconLeft}/></span>
                {item.getTitle()}
                <span style={styles.iconRight}><Icon icon='chevron-right'/></span>
            </div>
        );
    };

    render() {
        const headerComponents = [
            <p style={styles.menuHeader}>Select a list:</p>,
        ];

        return (
            <div style={styles.popover}>
                <Menu
                    headerComponents={headerComponents}
                    footerComponents={[]}
                    itemContent={this.renderMenuItem.bind(this)}
                    itemKey={item => item.get('id').toString()}
                    items={this.buildListPickerMenuItems()}
                    onSelect={this.onSelectList.bind(this)}
                    onEscape={this.onEscape}
                />
            </div>
        );
    }
}

const styles = {
    iconLeft: {
        marginRight: 10,
    },
    iconRight: {
        float: 'right',
    },
    menuHeader: {
        margin: 0,
    },
    popover: {
        background: '#f6f6f6',
        maxHeight: 400,
        minHeight: 100,
        overflow: 'auto',
        width: 250,
    },
};
