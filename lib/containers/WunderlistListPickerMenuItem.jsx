import {React} from 'nylas-exports';
import MenuItem from '../components/MenuItem';

/**
 *
 */
export default class WunderlistListPickerMenuItem extends React.Component {

    static displayName = 'WunderlistListPickerMenuItem';

    static propTypes = {
        item: React.PropTypes.shape({
            id: React.PropTypes.number.isRequired,
            indent_level: React.PropTypes.number.isRequired,
            list_type: React.PropTypes.oneOf(['inbox', 'list']), // Only when type is list.
            title: React.PropTypes.string.isRequired,
            type: React.PropTypes.oneOf(['folder', 'list']).isRequired,
        }).isRequired,
    };

    getIconLeft() {
        if (this.props.item.type === 'list') {
            return this.props.item.list_type;
        }
        return this.props.item.type;
    }

    getIconRight() {
        if (this.props.item.type !== 'list') {
            return '';
        }
        return 'chevron-right';
    }

    getIndentLevel() {
        return this.props.item.indent_level;
    }

    getLabel() {
        return this.props.item.title;
    }

    render() {
        return (
            <MenuItem
                iconLeft={this.getIconLeft()}
                iconRight={this.getIconRight()}
                indentLevel={this.getIndentLevel()}
                label={this.getLabel()}
            />
        );
    }
}
