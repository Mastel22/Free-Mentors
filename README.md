[![Build Status](https://travis-ci.org/Mastel22/Free-Mentors.svg?branch=develop)](https://travis-ci.org/Mastel22/Free-Mentors) [![Coverage Status](https://coveralls.io/repos/github/Mastel22/Free-Mentors/badge.svg?branch=develop)](https://coveralls.io/github/Mastel22/Free-Mentors?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/a85b6711fbe0165e69ee/maintainability)](https://codeclimate.com/github/Mastel22/Free-Mentors/maintainability)


# Free-Mentors

Free Mentors is a social initiative where accomplished professionals become role models to young people to provide free mentorship sessions.

# Homepage

https://mastel22.github.io/Free-Mentors/UI/index.html

# Required Features
1. Users can sign up:  `https://mastel22.github.io/Free-Mentors/UI/pages/signup.html`
2. Users can sign in. `https://mastel22.github.io/Free-Mentors/UI/pages/signin.html` 
3. Admin can change a user to a mentor. `https://mastel22.github.io/Free-Mentors/UI/pages/admin.html`
4. Users can view mentors.  `https://mastel22.github.io/Free-Mentors/UI/pages/mentors.html`
5. Users can view a specific mentor.  `https://mastel22.github.io/Free-Mentors/UI/pages/mentorView.html`
6. Users can create a mentorship session request with a mentor.  `https://mastel22.github.io/Free-Mentors/UI/pages/request.html`
7. A mentor can accept a mentorship session request. `https://mastel22.github.io/Free-Mentors/UI/pages/mentorsrequest.html`
8. A mentor can decline a mentorship session request. `https://mastel22.github.io/Free-Mentors/UI/pages/mentorsrequest.html`
 
# Optional Features 

● Users can view all their mentorship sessions.  
● Users can review a mentor after a mentorship session.  
● Admin can delete a review deemed as inappropriate. `https://mastel22.github.io/Free-Mentors/UI/pages/deleteReview.html`


## Getting Started
To get started with this project  follow all instruction below.

## Prerequisites
Install the software on your local machine [NodeJs](https://nodejs.org/en/download/)

## Installing
Clone this repo to your local machine by running in bash `git clone https://github.com/Mastel22/Free-Mentors.git`, and navigate to the project root to install all dependencies by using the command below

```
> npm i
```

## Run the server
```
> npm run dev
```

## Testing API

```
> Use Postman to test API endpoints
```

## Run the test

```
> npm test
```

## API Endpoints

| Request Route | Methods  | Description  |
| ------- | --- | --- |
| /api/v1/auth/signup | POST | Users can sign up |
| /api/v1/auth/signin | POST |  Users can sign in  |
| /api/v1/user/:userId | PATCH | Admin can change a user to a mentor |
| /api/v1/mentors | GET | Users can view mentors |
| /api/v1/mentors/:mentorId | GET | Users can view a specific mentor |
| /api/v1/sessions | POST | Users can create a mentorship session request with a mentor |
| /api/v1/sessions/:sessionId/accept | PATCH | A mentor can accept a mentorship session request |
| /api/v1/sessions/:sessionId/reject | PATCH | A mentor can reject a mentorship session request |


### User Interface (UI)

* HTML
* CSS
* Javascript

### Back End
* Node Js

### Framework
* Express

## Tools Used

* Mocha
* Chai
* Babel

### User Interface (UI)

* HTML
* CSS
* Javascript

### Deployment
```
Heroku
```
### Pivotal Tracker Stories 
[Project Stories](https://www.pivotaltracker.com/n/projects/2382117)

### Heroku link

[My app on Heroku](https://freementor-app.herokuapp.com/)

## Author
- Pierrette MAHORO MASTE <pmastel82@gmail.com>
---

## Copyright
Copyright (c) Pierrette MAHORO MASTEL
