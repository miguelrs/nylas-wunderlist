import Reflux from 'reflux'

const Actions = Reflux.createActions([
    'authorize',
    'refreshAuthorization',
    'createTask',
    'finishLoading',
    'startLoading',
])

// ???
//for (const key of Object.keys(Actions)) {
//    Actions[key].sync = true
//}

export default Actions
