import {React} from 'nylas-exports';

const styles = {
    popover: {
        background: '#f6f6f6',
        maxHeight: 400,
        minHeight: 100,
        overflow: 'overlay',
        padding: 10,
        position: 'relative',
        width: 250,
    },
};

export default class Popover extends React.Component {

    static displayName = 'Popover';

    render() {
        const {children} = this.props;
        return (
            <div style={styles.popover}>
                {children}
            </div>
        );
    }
}
