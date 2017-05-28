import {Task, TaskRegistry} from 'nylas-exports'

class CreateTodoTask extends Task {
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

export default CreateTodoTask;
