import {React} from 'nylas-exports';

const styles = {
    button: {
        display: 'block',
        margin: '0 auto 10px',
    },
};

export default class Button extends React.Component {

    static displayName = 'Button';

    render() {
        const {children} = this.props;
        return (
            <button style={styles.popover}>
                {children}
            </button>
        );
    }
}
