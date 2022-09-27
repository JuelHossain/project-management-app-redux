# Project Manager app With Redux

## some users to login and adding member in team

### User Emails

    - test@test.com
    - test1@test.com
    - test2@test.com
    - test3@test.com
    - test4@test.com
    - test5@test.com
    - test6@test.com
    - test7@test.com
    - test8@test.com
    - test9@test.com
    - test10@test.com

### Admin Emails

    - admin@admin.com
    - jrrahman01@gmail.com

### Password

    - hello

## Please Consider Checking these features

### login page

1. Login as admin
2. login as random user

### Dashboard

if you click on the name of the user after logging in from the navbar. you will be redirected to dashboard

#### admin control

1. admin can create user
2. admin can see users
3. admin can delete users

#### user control

1. user can see projects created by user with a list view.

   - [ ] user can see team working on the team with blue color
   - [ ] user can see project stage with green color chip

2. user can see teams they member of with a list view.

   - [ ] dynamic color icon
   - [ ] icon based on user position on the team
   - [ ] green tag based on user position on the team

### teams page

1. user can see all the teams user member of with a card view
2. user can create new teams from the right top corner plus button
3. card will show a menu icon on the right top corner.
   if user click on the icon another popup card will show and user can

   - [ ] add member on the team
   - [ ] delete team based on some complex logic
   - [ ] change the color in one click
   - [ ] see the team members on right side with a list view

4. ##### add member features

   - when user will type on the add user input field and popup with users available will be shown and if use click on one of the user from the list that user will fill the input field and input field color will be changed to green,

   - if user already exist as a member it will show in the suggestion list.still if use want to add that user user will get an error that user already a member.
   - if user doesn't exist as a member and user doesn't exist in the database an error will be shown that user not found
   - add button will be enable only when user is found in the server and the full email is matched otherwise add button will be disabled

5. #### members features

   - members count shown after title
   - dynamic icon shown after the name of member
     if user is the creator of the team a sheild-check icon will be show after user name and after all user a delete icon will be shown because only creator of the team can delete team members

   - if user not the creator of team then an user circle icon will be shown after user name and user cannot change anything in the team and an error will be shown by default that you are unauthorized to changed anything.

6. #### color features

   - if user is the creator of the team then color picker card will be shown
   - if user clicks one of the color the whole teams color will be changed instantly and project related to this teams color will be changed too.

7. #### delete features

   - if there is project related to this team and one of the project is not in backlog stage then no-one can delete this team and an error card will be shown

   - if there is projects available related to this team and all of the projects in backlog stage then if the creator of this team can deletes this team but the project related to this team will be deleted too before deleting an error message will be shown.

   - if there is no projects available related to this team then creator of the team can delete this team with an confirmation.

### projects page

1. there is six stage of the projects
2. when project will be in backlog user will get an option to create a project. from the plus icon from the backlog section.
3. after creating the project . by default project will be in backlog section
4. from the right corner of project card user can open the menu of the project and will get various options with some logic.

   - user can see project a delete button at the top right corner after opening the menu card from the backlog stage. delete button will only be available when project will be in backlog stage. if user clicks on delete another popup will be shown based on some logic
   - if user is the creator of this project or if user is the creator of team of this project then user will get an confirmation popup to delete the project. after confirmation the project will be deleted.
   - if user is not the creator of this project nor the creator of team of this project then user will get an error popup saying you are not authorized to delete this project.

5. all stages will be shown and active stage will be highlighted

   - if user click on the un-highlighted stage project stage will be changed
   - if user drag and drop stage will be changed to the dropped section

6. user can edit the title of the project from the menu

> #### Thats is please consider checking all of the features and give me mark . i have done this project with 7 days of hard work. and also check the quality of code i have done. thank you.
