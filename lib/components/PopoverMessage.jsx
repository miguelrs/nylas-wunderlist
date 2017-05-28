import {React} from 'nylas-exports';
import Icon from './Icon';

const styles = {
    closeButton: {
        background: 'transparent',
        border: 'none',
        fontWeight: 'bold',
        height: 24,
        padding: 2,
        position: 'absolute',
        right: 0,
        top: 0,
        width: 24,
    },
    container: {
        textAlign: 'center',
    },
    success: {
        color: 'green',
    },
};

export default class PopoverMessage extends React.Component {

    static displayName = 'PopoverMessage';

    render() {
        const {children, icon, onClose, text, type} = this.props;
        return (
            <div style={styles.container}>
                <button style={styles.closeButton} onClick={onClose}>X</button>
                <p style={styles[type]}><Icon icon={icon} size={32}/></p>
                <p style={styles[type]}>{text}</p>
            </div>
        );
    }
}
