# ASIMS 

Academic Staff Information Management System (ASIMS) is a sails web application developed for the Dean's Office of the Faculty of Science, U of Winnipeg.

Project Leader: Craig W.

Technical Lead: Anita N.

Systems Analyst: James M.

Lead Programmer: Azri A. , Daeyoun K.

Lead QA: Darren K.

How to deploy application in development:
-------------------------------------------
`sails lift`

Remote Database Setup:
-------------------------------
1. Open config/local.js in the c9 shared repo. Copy credentials manually and create your own local.js. Never place this anywhere else.
2. Or setup the above as $ENV corresponding to the one setup in config/connection.js

Development Workflow
-------------------------------
1. Choose an issue you want to tackle on or create a new one based on meetings discussed
2. Ensure you have latest master
3. `git checkout -b 'IssueNo-Your-Branch-Name'` NB:issue no is assigned by issue No ON github issues page
4. Develop your feature
5. Do more stuff
6. Pull from `master` branch before commiting and ensure you have latest version
7. Push and commit to your own branch first and reference the issue from github
8. Create a pull request on GitHub detailing the merge
9. Code will be reviewed by me and I will merge it


Agile testing
-----------------
Suggestions??

Docs:

[Sails Docs](http://sailsjs.org/documentation/concepts/) |
[Waterline Docs](https://github.com/balderdashy/waterline-docs) |
[Angular Docs](https://docs.angularjs.org/api) |
[UI Bootstrap](https://angular-ui.github.io/bootstrap/) |
[Useful utilities code "machines"](http://node-machine.org/machinepacks)
