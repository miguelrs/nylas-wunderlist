const {
    NylasAPI,
} = require('nylas-exports');
const NylasStore = require('nylas-store');

class WunderlistStore extends NylasStore {
    constructor(thread) {
        super();

        this.thread = thread;
        this.threadState = {};
    }

    triggerUpdate() {
        this.trigger(this.threadState);
    }

    addToWunderlist() {
        this.sendEmailToWunderlist('me@wunderlist.com');
    }

    // Sends a task email to Wunderlist.
    sendEmailToWunderlist() {
        const emailAddress = 'me@wunderlist.com';

        console.log('Sending email to ' + emailAddress + ' from: ' + this.thread.accountId);

        NylasAPI.makeRequest({
            path: '/send',
            method: 'POST',
            accountId: this.thread.accountId,
            body: {
                body: '',
                subject: this.thread.subject,
                to: [{
                    email: emailAddress
                }]
            },
            success: () => {
                console.log('Email successfully sent to ' + emailAddress);
            },
            error: (error) => {
                console.error('Email not sent to  ' + emailAddress + '. ERROR: ' + error);
            }
        });
    }
}

module.exports = WunderlistStore;
