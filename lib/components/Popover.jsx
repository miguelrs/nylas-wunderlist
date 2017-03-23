import {React} from 'nylas-exports';

const styles = {
    popover: {
        background: '#f6f6f6',
        width: 250,
        maxHeight: 400,
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
