const {NylasAPI} = require('nylas-exports');
const NylasStore = require('nylas-store');

/**
 * Store for the actions related with Wunderlist API.
 */
class WunderlistStore extends NylasStore {
    constructor(thread) {
        super();
        this.thread = thread;
    }

    /**
     * Adds a task to Wunderlist.
     */
    addToWunderlist() {
        this.sendEmailToWunderlist();
    }

    /**
     * Sends an email to the 'mail to wunderlist' email address from the current account email address.
     * Note: Wunderlist needs to be configured to create tasks from emails sent to this address.
     */
    sendEmailToWunderlist() {
        const emailAddress = 'me@wunderlist.com';

        console.log('Sending email to ' + emailAddress + ' from: ' + this.thread.accountId);

        NylasAPI.makeRequest({
            path: '/send',
            method: 'POST',
            accountId: this.thread.accountId,
            body: {
                body: this.thread.snippet,
                subject: this.thread.subject,
                to: [{
                    email: emailAddress
                }]
            },
            success: () => {
                console.log('Email successfully sent to ' + emailAddress);
                alert('Wunderlist ToDo successfully added from ' + this.thread.accountId);
            },
            error: (error) => {
                console.error('Email not sent to  ' + emailAddress + '. ERROR: ' + error);
                alert('Error adding Wunderlist ToDo from ' + this.thread.accountId);
            }
        });
    }
}

module.exports = WunderlistStore;
