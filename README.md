You are welcome to use this project.

# ZenVid Backend Documentation

This project wouldn't be possible without the help of your contributions. What you see today is the product of hundreds changes made to keep up with an ever-evolving ecosystem. [Thank you](#thank-you) for all of your help.

## Table of Contents

1. [Requirements](#requirements)
1. [Installation](#getting-started)
1. [Running the Project](#running-the-project)
1. [Project Structure](#project-structure)
1. [Hot Reloading](#hot-reloading)
1. [API Reference](#ApiReference)
1. [Thank You](#thank-you)

## Requirements

- node `v16.17.0`
- npm `v8.15.0`

  ## Installation

After confirming that your environment meets the above [requirements](#requirements), you can get a copy of this software by doing the following:

```bash
$ git clone <remote-url>
<my-project-name>
$ cd <my-project-name>

```

Done cloning add following in in .zprofile, .bash_profile or inside other environment variable.

```bash
export JWT_SECRET_KEY='<replace-key>'
export OUTLOOK_USER='<replace-outlook-email>'
export OUTLOOK_PASSWORD='<outlook-password>'
export SENDER_ADDRESS='<replace-outlook-email>'
```

When that's done, install the project dependencies. It is recommended that you use `npm install`.

## Running the Project

After completing the [installation](#installation) step, you're ready to start the project!

```bash
$ npm run dev  # run on server in development mode
```

While developing, you will probably rely mostly on `npm run dev`; however, there are additional scripts at your disposal:

| `npm <script>` | Description                               |
| -------------- | ----------------------------------------- |
| `run dev`      | Runs in Development `http:localhost:4000` |
| `run prod`     | Run in Production                         |

## Project Structure

The project structure presented in this boilerplate is **fractal**, where functionality is grouped primarily by feature rather than file type. This structure is only meant to serve as a guide, it is by no means prescriptive. That said, it aims to represent generally accepted guidelines and patterns for building scalable applications. If you wish to read more about this pattern, please check out this [awesome writeup](https://github.com/davezuko/react-redux-starter-kit/wiki/Fractal-Project-Structure) by [Justin Greenberg](https://github.com/justingreenberg).

```
.
├── api                                # all api endpoints
│   ├── v1                             # version of the api
│   │   ├── controllers                # Endpoints Controllers
│   │   │   └── explore.controller.mjs # Explore controllers
│   │   │   └── user.controller.mjs    # user controllers
│   │   │   └── watch.controller.mjs   # Watch controllers
│   │   ├── routes                     # Routes and endpoints
│   │   │   └── explore.routes.mjs     # Explore routes and endpoints
│   │   │   └── user.routes.mjs        # User routes and endpoints
│   │   │   └── watch.routes.mjs       # Watch routes and endpoints
├── public                             # All public static files not imported anywhere
├── avatars                            # Static public profile pictures not imported anywhere
├── watch                              # Static public videos not imported anywhere
│   ├── [username]                     # Categorize by username
│   │   └── [video-name]               # Random video file name
├── configs                            # Configuration
│   └── mongodb.mjs                    # Mongodb connection configuration
│   └── nodemailer.mjs                 # Nodemailer configuration
├── constants                          # Global constants
├── helpers                            # Helper functions
│   │   └── index.mjs                  # Exported all helpers as helpers
├── middlewares                        # Middleware used in express
│   │   └── index.mjs                  # Exported all middlewares as middlewares
├── mongodb                            # Mongodb Database
│   ├── models                         # All Mongodb models
│   │   └── index.mjs                  # Exported all models as models
│   │   └── user.model.mjs             # User model
│   │   └── watch.model.mjs            # Watch model
│   ├── schema                         # All Mongodb models schema
│   │   └── index.mjs                  # Exported all schema as schemas
│   │   └── user.schema.mjs            # User model schema
│   │   └── watch.schema.mjs           # Watch model schema
├── routers                            # Mapped all router and exported as routers [used in app.mjs]
├── utils                              # All utils inside
│   └── jwt.mjs                        # Jsonwebtoken configuration
│   └── validator.mjs                  # Express validator configuration
├── validators                         # Express validators for endpoint payload validation
│   └── index.mjs                      # Mapped all validators and exported as validators
│   └── explore.validators.mjs         # Explore express validators
│   └── user.validators.mjs            # User express validators
├── app.mjs                            # Entry point of this application
├── requests.rest                      # Rest client file
```

### Hot Reloading

Hot reloading is enabled by default when the application is running in development mode (`npm run dev`). This feature is implemented with [nodemon](https://github.com/remy/nodemon) capabilities, where you code updates automatically on any changes made in file, you don't have to restart the app each time.

## ApiReference

## Thank You

Everyone who has contributed to this project
