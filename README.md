Hiya,

What you need to do in order to run the app:
    - go to the project's root folder and run 'npm install'
    - then run 'npm start'
    - then open browser on 'localhost:3000'
    
You can login as admin using username 'admin' and password 'secret'
 
You should be able to create users by clicking register button with user details.

I did not have time to fully complete the specification, but it's quite close.

I did not use any framework like Meteor or React or Angular to accomplish the task.

I think they would have saved some time, but taken the fun of building the app from scratch.

Also this way the app is more performant, even though it should have some model binding mechanism.

There's no lost password mechanism as I did not have time for it. I also think you were looking
for some kind of drag and drop functionality. I skipped this for same reason. The team is assigned
automatically. It does not work if there is more than 1 match. So yes the application is fragile one.
I still did put a lot of effort into it and I hope you take this to consideration. Also there's plenty
of place where one could do major refactoring. I did do 3 refactor cycles as the methods were initially
per asteroid and action. Like delete asteroid. I tried to refactor these to better fitted functions.
But yes.. still a lot of room for improvement. Also the 'styles' are horrible, but I paid very little 
attention to them as I wanted the functionality close to done.

Hope you enjoy the game :D

BR,

Sakari Ruoho

---------------------------------------------


Initial Specification:

Build a simple app

We know that behind each Asteroid hides an UFO. Those UFOs are constantly seeking good developers here on Earth. 

Unfortunately, they only have a certain number of vacancies available and therefore, can only take one Group of developers at a time. 

There is an ingenious process to select this Group, associating the name of the Asteroid with the name of the Group. 

Both names are converted into a number represented by the product of the letters where 'A' is 1, 'B' is 2 ... 'Z' is 26. 

If the remainder of the division of the number that represents the Group by 45 is equal to the remainder of the division 
of the number that represents the Asteroid by 45, then the group will be taken.

Your task is to write a web application allows users to select an Asteroid and a group name, and displays in the screen 
whether or not the group will be taken.

You should use JavaScript, but the choice of framework is up to you.

You must at least meet the following requirements:

Only registered users can use the application
Anyone can register as a user and should have access to a 'Forgot password' feature 
No one can register as an admin user, but there should be at least one admin user registered in the application
Admins can add, edit and delete any Asteroid or any Group of developers
Normal users can add as many Asteroids or Groups they want but can only edit and delete those created by themselves
Group names and Asteroid names should always be in UPPERCASE
Only the letters from 'A' to 'Z' are allowed for both the Asteroid and Group names 


