# Project Name: Runouts

## Description

Web mobile social application to stay in touch with other runners, find and create running groups and join them.
 
 ## User Stories
 <!-- @Review 404 could be a bit more user friendly-->
 - **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
  <!-- @Review 500 could be a bit more user friendly (wtf)-->
 - **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.
 - **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login, signup or logout.
 - **sign up** - As a user I want to sign up on the webpage so that I can see all the groups. 
 - **login** - As a user I want to be able to log in on the webpage so that I can get back to my account.
 <!-- @Review The purpose of the logout is not as well defined as it could be, as an alternative the account sesstion could expire -->
 - **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account.
 - **group create** - As a user I want to create a running group so that I can invite others to join.
 - **group list** - As a user I want to see all the groups available so that I can choose which ones I want to join.
 - **group detail** - As a user I want to see more information regarding one group so that I can decide if I want to join. 
 - **user list** - As a user I want to be able to see all the users so I can see their information and groups.
 - **user profile** - As a user I want to be able to see all my information and my groups.

## Backlog

User profile:
- see my profile
- upload my profile picture
- list groups the user is joined
- edit my profile information
- delete my user

Group profile: 
- add geolocation to groups when creating
- show group in a map in group detail page
- add schedule with routes by level
- edit my group information
- list users of the group
- delete my group

List places: 
- add list of places
- see groups in that places

Homepage: 
- Add search card

Search page: 
- filter options
- see results
- link group/user/place result

Email control:
- send email to new users
- send email when join a group


## ROUTES:
```

Homepage: 
<!-- @Review Include authentication (layout)-->
    GET / 

Login:
<!-- @Review Include validation and authentication -->
    GET /auth/login
    POST /auth/login - POST Body: username, password

Signup:
<!-- @Review Include validation and authentication -->
    GET /auth/signup
    POST auth/signup - POST Body: username, password    

Logout:
<!-- @Review Include authentication -->
    POST auth/logout - POST Body: nothing

List groups:
    GET /groups
<!-- @Review  This filter is from the backlog ^_^ can be included in the user stories if it's working-->
    POST /groups/:filter

Detail groups: 
    GET /groups/:id
    
Join a group:
<!-- @Review Include validation (+1 you can't join twice the same group) and authentication -->
    POST /groups/:id

Profile: 
<!-- @Review Include validation and authentication -->
    GET /profile/:id

Add group: 
<!-- @Review Include validation and authentication -->
    GET /groups/add
    POST /groups

List users: 
<!-- @Review Include  authentication -->
    GET /users

```

## MODELS

```
Group
<!-- @Review it would have been interesting to include requirements as it's is actually compustory to fill all fields-->
 - name: String
 - description: String
 - day: Number
 - hour: String
 - place: String
 - owner: User
 - members: [Users]
 - active: Boolean (default: true)
```    
 
```
User
 - username: String 
 - password: String (required)
 - email: String (unique, required)
 - groups: [Groups]  ?????
```
## Mockup

<!-- @Review On the mockups it's not clear it authentication is required to join groups on the wireframes -->
![alt text](Mockup.jpg "Mockup")

## Links

### Trello

[Link to trello](https://trello.com/b/SXwUZaO5)

### Git

[Runouts](https://github.com/Arkhanne/runouts)

[Deploy Link](http://runouts.herokuapp.com/)

### Slides.com

[Slides Link](http://slides.com)



### Bugs

When We tried to join a different group we didn't create it threw and error:

TypeError: Cannot read property 'username' of null
    at Group.find.populate.then.group (/Users/dbp/IronHack Bootcamp/code/exercises/runouts/routes/groups.js:87:36)
    at process._tickCallback (internal/process/next_tick.js:68:7)




## Git History

Include better details of the commits to make more clear about changes on the code.
On this particualr project the commits have not a lot to do with the code, for example a commit related to handle errors was on app.js require express but no changes on errors it was just a delete and add line.


## code quality

- consistency
    very consistent +1
- formatting
 comments on routes specially groups.js are helpful +1
- best practices
    no 'use strict'

- simplicity
    maybe in the errors instead of catching then calling next could catch(next)

- DRY
    Don't repeat themselves only tiy recomendation was with the catch.
- validation

- authorization
    You can go to log in again even tho you're already logged in.
    Same with signup
- semantic html
    Identation!
    Too many classes that don't explain what the class do
    Could have invluded other types of tags as ul , li, sections
    too many Ids and classes
- clean css 
    we are not familiar with bootstrap =( no comments

## product quality

- usability
    It does the user stories
    Sometimes when you register there's not a lot of feedback for the user.
    For example when you are on your profile it's not clear what the + botton does
    
    
- design
    It's coherent with the wireframe and on the application
    should have a tiny of design on the errors pages

- responsiveness
    it's not designed for desktop
    it's a mobile app
- finished look
    +1 consistant in colours style, most of the elements of the app were styled.
    