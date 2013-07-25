module.exports = function () {
    process.setMaxListeners(0);
    console.log('Generic Steps Loaded');
    var selectors = require('../support/selectors.js');
    var windowSizeIs;

    /* "<Given> I visit <url>" */
    this.Given(/^I visit "(https?:\/\/.*\..*)"$/, function (url, callback) {
        try {
            this.init().url(url, callback);
        } catch(o_O) {
            callback.fail(o_O);
        }
    });

    // "<Given> the window size is <width> by <height>"
    // Set the browser window size to the specified one
    windowSizeIs = function(width, height, callback) {
        width = parseInt(width, 10);
        height = parseInt(height, 10);
        this.setWindowSize(width, height, callback);
    };
    this.Given(/^the window size is "([^"]*)" by "([^"]*)"$/, windowSizeIs);

    /* "<When> I enter <text> into <selector>" */
    this.When(/^I enter '(.*)' into '(.*)'$/, function (text, selector, callback) {
        selector = selectors(selector);
        this.waitFor(selector, 1000, function (err, result) {
            if(err) {
                return callback.fail(err);
            }
            return this.setValue(selector, text, callback);
        });
    });

    /* "<When> I submit the form <selector>" */
    this.When(/^I submit the form '(.*)'$/, function (selector, callback) {
        selector = selectors(selector);
        this.submitForm(selector, callback);
    });

    /* "<Then> I should see <text> in the element <selector>" */
    this.Then(/^I should see '(.*)' in the element '(.*)'$/, function (text, selector, callback) {
        selector = selectors(selector);

        this.waitFor(selector, 1000, function (result) {
            // if (result.status !== 0) return callback.fail(new Error('Element ' + inputId + ' was not found after 2s'));

            // this.getText(inputId, function(text) {
            //     text = ('' + text.value).match(/^We've found ([\d,]+) repository results$/);
            //     text = parseInt(text[1].replace(/,/g, ''), 10);

            //     // Fail this test if the search results are null
            //     if (text === 0 || isNaN(text)) return callback.fail(new Error('Expected to see some results, but saw 0 (captured result count is ' + number + ')'));

            //     // Pass and say about it.
            //     console.log('(Saw ' + text + ' results)');
            //     return callback();

            // });
        });
    });
};