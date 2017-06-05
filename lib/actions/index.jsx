import Reflux from 'reflux'

const Actions = Reflux.createActions([
    'authorize',
])

// ???
//for (const key of Object.keys(Actions)) {
//    Actions[key].sync = true
//}

export default Actions
