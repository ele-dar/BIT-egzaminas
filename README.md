# Book registry app
Exam assignment for Javascript course in Baltic Institute of Technology

## Overview
- All users can view all books that are registered.
- Registered user can view all books, reserve books, see their reserved books with expected return date. Registered user can extend the reservation period by one month.
- User with administrator role can add, delete and update books in the registry. They can also view the list of users.


## Running the app
### Prerequisites
- SQL service 
- Node.js

### Getting started
- After cloning the repository install node modules in both **server** and **client** folders (run `npm install`)
- Update database and login **credentials** in **server > database > connect.js**
- Running `npm start` in **server** integrated terminal will start the express server and a connection to SQL database will be established
- Running `npm start` in **client** integrated terminal and agreeing to use another port will start the react app


