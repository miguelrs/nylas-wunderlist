import {Task, TaskRegistry, DatabaseStore} from 'nylas-exports'

export default class CreateTodoTask extends Task {
    constructor(toDo) {
        super();
        this.toDo = toDo;
    }

    performLocal() {
        console.log('TASK: CreateTodoTask::performLocal()');
    }

    performRemote() {
        console.log('TASK: CreateTodoTask::performRemote()');
    };
}
