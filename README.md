# Jabber.ru

This repository contains js code and some static files for https://jabber.ru website. Development version is at https://beta.jabber.ru

To build it for your own use, you should have node installed.
Then commit following commands (not verified):

```bash
git clone https://github.com/oxpa/www.jabber.ru 
cd www.jabber.ru
npm i package.json
node_modules/.bin/webpack
mkdir public
cp -ar static/* public/
cp -ar compiled/* pulic/
rm public/main.js public/fonts.js 
```
Public will contain directory suitable to serve with web server.

Result is distributed across two directories: `compiled` and `compiledos`. 
The latter will have only two files suitable for production deployment.

### Contribution guide
Please, discuss desired improvement at [support@conference.jabber.ru](xmpp://support@conference.jabber.ru) or in an issue before you do anything. May be someone else is working on the same feature already.

### Roadmap
* Make site multilingual (suggestions on implementation are welcome)
* Implement view for news feed
* Implement administrative interface for news items and feedbacks
* Add more clients to /download section
* Reimplement login form
* Reimplement some styles to fit into all screen better
* Add more help items
* Add full roster management into personal space
* Implement plugins for message processing (e.g. to highlight links and reformat juick messages)
* Implement simple web client inside personal space
* Implement virtual hosting management

