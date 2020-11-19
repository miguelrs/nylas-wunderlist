# Nylas Wunderlist

Plugin for [Nylas](https://www.nylas.com/nylas-mail/) mail client to interact with [Wunderlist](https://www.wunderlist.com/) task manager. 

## Installation

1. Download and run Nylas Mail.

2. Download the latest version from the [Releases](https://github.com/miguelrs/nylas-wunderlist/releases) tab
and unzip the file.

3. On the Nylas Mail menu, select `Developer > Install a Plugin...` and choose the unzipped directory.


## Usage

- Select an email to see the Wunderlist toolbar button and sign in.

![Sign In button](/assets/docs_usage_sign_in.png)

- Authorize Nylas Wunderlist (this app) to access your Wunderlist account.

![Authorize app](/assets/docs_usage_authorize.png)

- Select a list and a new task will be created in Wunderlist!

![Authorize app](/assets/docs_usage_create_task.png)


## ToDo

- [x] Enable sign in.
- [x] Enable creating tasks.
- [x] Allow selecting a list.
- [x] Show spinner when loading.
- [x] Show folders.
- [ ] Post email text content as a task note.
- [ ] Add tests.
- [ ] Show confirmation (toast?) when task created.
- [ ] Allow starring the task.
- [ ] Allow adding a due date.
- [ ] Allow adding a reminder.
- [ ] Make use of the Nylas storage.
- [ ] Make use of Nylas Task objects.
- [ ] Enable offline mode.
- [ ] Improve authorization.
