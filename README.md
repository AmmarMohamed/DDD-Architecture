# Contacts App Backend

Contacts is a responsive web application for simple contact management that includes add, update, delete, search and list functionalities served by a backend Restful API.

# Project Architecture (domain driven design architecture)

=> Folder structure(src):

- Application layer (app) : The application layer is responsible to mediate between your input interfaces and your business domain.
- Domain layer : define your business domain classes, functions and services.
- Infrastructure layer : for communication with  outside your application, like the database ...
- Input interfaces layer:contains all the entry points for your application (http , ws , console )


# setup the project steps 

1- Clone the repository 
2- npm install 
3- Run the database migrations with npm run sequelize db:migrate
4- npm start 


# documented api by swagger 
# tested api by chai


# NOTE:  I have just made the key points to review the way of build my code and the project architecture!










