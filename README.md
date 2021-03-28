# tag list

Thanks to, The project Template adapted : https://aditya-sridhar.github.io/simple-reactjs-app

## What is the use of this Repo

This Project is a Tag List Project which demonstrates the following using mock data.
1. List tags
2. Open Tag details
3. Add or remove tags to images

## Live Application URL

This URL has the application deployed in

## Prerequisites

### Install Node JS
Refer to https://nodejs.org/en/ to install nodejs

```
## Live Application URL

The Application is deployed in : https://aaanandan.github.io/taglist

Click on the link to see the application

## Cloning and Running the Application in local

Clone the project into local

Install all the npm packages. Go into the project folder and type the following command to install all npm packages

```bash
npm install
```

In order to run the application Type the following command

```bash
npm start
```

The Application Runs on **localhost:3000**

## Application design

#### Components

1. **TagList** Component : This Component displays a list of tags. This Component gets the data from a json file in assets folder

2. **TaggedItems** Component : This Component Displays the details of the selected tag. This Component gets its data from a json file in assets folder as well. This Component is the Child Component of *TagList* Component

#### HTTP client

**axios** library is used to make HTTP Calls

#### URL

The application has just one url /taglist which ties to *TagList* Component

## Resources

**create-react-app** : The following link has all the commands that can be used with create-react-app
https://github.com/facebook/create-react-app

**ReactJS** : Refer to https://reactjs.org/ to understand the concepts of ReactJS

**React Bootstrap** : Refer to https://react-bootstrap.github.io/getting-started/introduction/ to understand how to use React Bootstrap
