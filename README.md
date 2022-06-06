  # Social Network API

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  ## Description
  This is my example of a RESTful API system for a Social Networking website. This project includes many necessary features such as creating a user, creating thoughts (comments), and creating reactions (replies) to thoughts. All the data is handled by MongoDB and all data is tied to a model for strict data structuring.

  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Tests](#tests)
  - [Questions](#questions)
  - [Credits](#credits)
  - [License](#license)

  ## Installation
  * Make sure you have MongoDB installed on your machine. You can visit their [website](https://www.mongodb.com/docs/manual/installation/) for installation details
  * You will also need Insomnia or another API testing application to view and test these API routes
  * After you have copied the repository to your machine, make sure you run `npm i` within your terminal to install all required libraries
  * Once you have those installed, simply type `npm start` in your terminal and refer to your preferred API testing application, all routes are built onto `localhost:3001`

  ## Usage
  This app is purely backend coding. To view these routes, refer to your preferred API testing application.

  ## Routes
  All routes begin with `localhost:3001`
  ### User Routes
  <b>POST and PUT route JSON body requires "username" and "email"</b>
  * `GET` get all `/api/users`
  * `GET` get one by id `/api/users/:userId`
  * `POST` create a user `/api/users`
  * `PUT` update user info `/api/users/:userId`
  * `DELETE` delete a user `/api/users/:userId`

  ### Friend Routes
  * `POST` create a new friend link `/api/users/:userId/friends/:friendId`
  * `DELETE` delete a friend link `/api/users/:userId/friends/:friendId`

  ### Thought Routes
  <b>POST and PUT route requires "thoughtText", "username", and "userId"</b>
  * `GET` get all `/api/thoughts`
  * `GET` get one by id `/api/thoughts/:thoughtId`
  * `POST` create a thought `/api/thoughts`
  * `PUT` update a thought `/api/thoughts/:thoughtId`
  * `DELETE` delete a thought `/api/thoughts/:thoughtId`

  ### Reaction Routes

  * `POST` create a new reaction `/api/thoughts/:thoughtId/reactions`<br>
  * <b>POST route JSON body requires "reactionBody" and "username"</b>
  * `DELETE` delete a reaction `/api/thoughts/:thoughtId/reactions`
  * <b>POST route JSON body requires "reactionBody" and "username"</b>

  ## Questions
  Any questions can be directed at the primary author via: <br>
  [GitHub](https://github.com/cory-hall) <br>
  [Contact Me!](mailto:cory.c.hall@gmail.com)

  ## Credits
  Cory Hall

  ## License
  Copyright 2022 Cory Hall

        Permission is hereby granted, free of charge, to any person obtaining a copy of this 
        software and associated documentation files (the "Software"), to deal in the Software 
        without restriction, including without limitation the rights to use, copy, modify, 
        merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
        permit persons to whom the Software is furnished to do so, subject to the following 
        conditions:
        
        The above copyright notice and this permission notice shall be included in all 
        copies or substantial portions of the Software.
        
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
        INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
        PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
        FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
        OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
        DEALINGS IN THE SOFTWARE.