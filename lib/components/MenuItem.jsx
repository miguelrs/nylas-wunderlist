import {React} from 'nylas-exports';
import Icon from './Icon';

const styles = {
    itemIndentLevel0: {
    },
    itemIndentLevel1: {
        paddingLeft: 10,
    },
    iconLeft: {
        marginRight: 10,
    },
    iconRight: {
        float: 'right',
    },
};


export default class WunderlistListPickerMenuItem extends React.Component {

    static displayName = 'WunderlistListPickerMenuItem';

    static propTypes = {
        iconLeft: React.PropTypes.string,
        iconRight: React.PropTypes.string,
        indentLevel: React.PropTypes.number,
        label: React.PropTypes.string.isRequired,
    };

    render() {
        const {label, iconLeft, iconRight, indentLevel} = this.props;
        return (
            <div style={styles[`itemIndentLevel${indentLevel}`]}>
                {iconLeft &&
                    <span style={styles.iconLeft}><Icon icon={iconLeft}/></span>
                }
                {label}
                {iconRight &&
                    <span style={styles.iconRight}><Icon icon={iconRight}/></span>
                }
            </div>
        );
    }
}
