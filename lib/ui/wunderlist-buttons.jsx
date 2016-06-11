const {React} = require('nylas-exports');
const {RetinaImg} = require('nylas-component-kit');
const WunderlistStoreManager = require('../wunderlist-store-manager');

class AddToWunderlistToolbarButton extends React.Component {

    static displayName = 'AddToWunderlistToolbarButton';

    static propTypes = {
        thread: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.load(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.load(newProps);
        this.setState(this.wunderlistStore.threadState);
    }

    componentWillUnmount() {
        return this.unload();
    }

    onMessageLoad(threadState) {
        this.setState(threadState);
    }

    onClick(event) {
        this.wunderlistStore.addToWunderlist();

        // Don't trigger the thread row click
        event.stopPropagation()
    }

    load(props) {
        this.unload();
        this.wunderlistStore = WunderlistStoreManager.getStoreForThread(props.thread);
        this.unlisten = this.wunderlistStore.listen(this.onMessageLoad.bind(this));
        this.wunderlistStore.triggerUpdate();
    }

    unload() {
        if (this.unlisten) {
            this.unlisten();
        }
        this.unlisten = null;
        this.wunderlistStore = null;
    }

    render() {
        return (
            <button
                className={'btn btn-toolbar'}
                onClick={this.onClick.bind(this)}
                title='Add to Wunderlist'
            >
                <RetinaImg
                    mode={RetinaImg.Mode.ContentIsMask}
                    url='nylas://n1-wunderlist/assets/n1-wunderlist-toolbar@2x.png'
                />
            </button>
        );
    }
}

module.exports = {
    AddToWunderlistToolbarButton
};
