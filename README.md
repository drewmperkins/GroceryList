# GroceryList
![](/frontend/src/favicon.ico)

## **Table of Contents**

1. [Objectives](#objectives)
2. [Overview](#overview)
3. [Build](#build)
4. [Notes](#notes)
<br/><br/><br/>

## **Objectives**
Create a simple grocery list web application. A user should be able to view the current items on their list, add items, and delete items. You may implement functionality to create and store multiple lists if you wish, but it is not a requirement.

The frontend should be in Angular (preferably the latest version), and the backend should be .NET Core or .NET 6. The backend should store the shopping list items in a SQL database using Entity Framework Core, using a Code First approach. Choose whichever SQL database is most convenient for or familiar to you.

It's not required, but we would be impressed if you included a handful of automated tests for both frontend and backend.

Finally, provide any instructions necessary to get your project up and running. The preferred way to submit your project would be a GitHub (or other social coding) link to the repository. If that is not possible, a .zip file containing the source code would be acceptable.

What we're looking for when we review your project:
- Does it work?
- Were instructions followed?
- Is the code clean and well-crafted?
- Are standard best practices being followed?
- Are project files well-organized?
<br/><br/><br/>

## **Overview**

Inspiration for the overall design was inspired from Google Keep, which I normally utilize when creating grocery lists.  There are a few features in the Keep app that I believe could be improved upon, and I implemented just a few here.

Areas for improvement with more time:
- Grocery Items should be http patched, instead of add\delete
- Error handling could be improved
- Sort\Move grocery items in list
- UI for multiple lists
- Frontend tests
<br/><br/><br/>

## **Build**

Software Requirements:
- Net6 SDK
- Node - v16.13.2 used
- Angular CLI - npm install -g @angular/cli
- VS Code
- Docker - or instance of mysql

Setup docker mysql database:

    sudo docker pull mysql
    sudo docker run --name mysql -e MYSQL_ROOT_PASSWORD=P@ssw0rd123 -p 3306:3306 mysql:latest

Setup backend:

    cd backend
    // modify appsettings.json to point to mysql server/username/password
    dotnet ef migrations add InitialCreate
    dotnet ef database update
    dotnet run

*Note: At this point should be able to connect to backend swagger at https://localhost:44300/swagger/index.html and run the GET endpoint.*

Run backend tests:

    cd backend-test
    dotnet test

Setup frontend:

    cd frontend
    npm install
    npm run start

*Note: Open browser to http://localhost:4200/*
<br/><br/><br/>

## **Notes**

Below are the notes\commands initially used to get the project structured.

## **Database - MySQL**
    sudo docker pull mysql
    sudo docker run --name mysql -e MYSQL_ROOT_PASSWORD=P@ssw0rd123 -p 3306:3306 mysql:latest

## **Frontend - Angular v15**
    // supports node.js versions: 14.20.x, 16.13.x and 18.10.x
    // supports TypeScript version 4.8 or later
    nvm install 16.13.2
    nvm use 16.13.2
    npm install -g @angular/cli
    ng new frontend --routing=true --style=scss --skipTests=false
    cd frontend
    ng add @angular/material --save
 
## **Backend - .NET6.0**

*Swagger URL - https://localhost:44300/swagger/index.html*

*Net6 SDK - https://download.visualstudio.microsoft.com/download/pr/0a672516-37fb-40de-8bef-725975e0b137/a632cde8d629f9ba9c12196f7e7660db/dotnet-sdk-6.0.404-win-x64.exe*

### Create backend project
    dotnet dev-certs https -ep %userprofile%\.aspnet\https\aspnetapp.pfx -p P@ssw0rd123
    dotnet dev-certs https --trust
    dotnet new webapi --name backend
    cd backend

### Add EFCore Tools
    dotnet tool install --global dotnet-ef --version 6.0.7
    dotnet add package Microsoft.EntityFrameworkCore.Design --version 6.0.7
    // scaffolding bug using MySql.EntityFrameworkCore package. 
    // see: https://stackoverflow.com/questions/70224907/unable-to-resolve-service-for-type-microsoft-entityframeworkcore-diagnostics-idi
    // dotnet add package MySql.EntityFrameworkCore --version 6.0.7
    dotnet add package Pomelo.EntityFrameworkCore.MySql --version 6.0.2

### Create database\tables
    dotnet ef migrations add InitialCreate
    dotnet ef database update
    // dotnet ef database update 0
    // dotnet ef migrations remove

## **Backend - Unit Testing**
    dotnet new xunit -o backend-test
    dotnet add package Moq --version 4.18.2
    dotnet test

## **Docker - Production - Beta**
    
    // Install nvm - https://github.com/nvm-sh/nvm#installing-and-updating
    nvm install 16.13.2
    nvm use 16.13.2
    sudo npm install -g @angular/cli

    cp aspnetapp.pfx /tmp
    sudo docker-compose up --build

    sudo docker build -t frontend .
    sudo docker run --name frontend -p 4200:80 --restart=always frontend