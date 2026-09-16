## Daniela's Todo List
Hello and welcome!

This is a full-stack JavaScript todo list application built with React.js as part of my classwork in the "Web Development with Full-Stack Javascript" program with Code the Dream (CTD).

Using my foundations from my knowledge in HTML, CSS, and JavaScript, I could build on what I know while learning React through this project, including component-based development, state management, routing, authentication, API requests, and responsive styling.

## Features
* Add new todo items
* Edit existing todo items
* Mark todos as complete or incomplete
* View active todo items
* Filter todos using a search/filter input
* Sort todos by selected criteria
* Authenticate users through a login page
* Protect authenticated routes
* View a user profile with todo statistics
* Navigate between pages using React Router
* Display validation and error messages
* Responsive design for desktop and mobile screens
* Accessible interactive elements with keyboard-friendly focus indicators
* Styled forms, buttons, navigation, and todo components

## Technologies Used
* React.js – building the user interface with reusable components
* React Router – client-side routing and protected routes
* JavaScript (ES6+) – application logic and functionality
* HTML – semantic page structure
* CSS – styling, responsive design, and interactive states
* Vite – development server and build tooling
* Git & GitHub – version control and project hosting
* REST API – communicating with the application's backend

## Screenshots
### Desktop
![Screenshot of desktop view, showing /todos](./src/images/screenshots/desktop_view.png)
### Mobile
![Screenshot of mobile view, showing /todos](./src/images/screenshots/mobile_view.png)

## Getting Started
### Prerequisite: 
Before running the project locally, ensure you have
* Installed Node.js and Git
* Access to a web browswer
### Installation instructions
1. Visit [project URL] (https://github.com/dhblanco/react26.3-ctd-todo-list-project/)
2. Clone repository and install locally
3. Run commands in terminal
    * `git clone https://github.com/dhblanco/react26.3-ctd-todo-list-project/`
    * `npm install`
### How to run the development server
1. Within project root, run command
    * `npm run dev`
2. Locate URL, something like "Local: http://localhost:5173/"
3. Open URL in browser to view live app


## Available Scripts
The following npm scripts are available in the project:

`npm run dev`
Starts the Vite development server and allows the application to be viewed locally during development.
`npm run build`
Creates a production-ready build of the application.
`npm run preview`
Locally previews the production build created by npm run build.
`npm install`
Installs the dependencies listed in package.json.

## Design Decisions
I was behind this class due to some wonky feedback from my class' AI reviewer, so I had other visions and when I was crunched for time, I remembered the basics... like an flash card generator I made as a project to apply to Code The Dream. What if I could make the todo list feel familiar, like a sheet of paper?

So for the visual design, I used CSS modules and in-line stlying to mimic the feel of a lined piece of paper or index card, and added contrasting soft colors (whites, blues, yellows, reds) to invite a notebook / school feeling. 

I also wanted to highlight the React features, so I isolated header, nav, login/off, and `todo-controls` to be near the top of the page and keep the todos on the lined paper below. I hope this offers visual contrast and not too distant from the feel of grabbing a sheet of paper with your todos snd keep tracking!

Accessibility was also considered in the design. Form controls use associated labels, error messages are communicated to users, and interactive elements include visible focus states for keyboard navigation. Super cool to see the feedback as you tab across the screen!

## Future improvements
I would love to add a sticky note that users can move around with the filter/sort controls, adding another layer of real-life feeling. Additionally, I'd like to refine mobile view, visual feedback and animations where appropriate, thus offering more personalized style. 

I'm really inspired by apps like ["Stick it with Robert"](https://stick-it-with-robert.vercel.app/), made by Arissa, a student from Singapore. It was so cool to come across this as I was starting class with CTD and then to learn the React project would be a todo list. Maybe in the future I can find a fun way to overlay things and keep mimicking that cozy paper/real-life feel. 

## License
This project is licensed under the [MIT license](https://github.com/react/react/blob/main/LICENSE). 

## About the author
### Author information: 
Name: Daniela Hernández Blanco (me!)

About me: I am a student from Costa Rica learning programming through Code The Dream (CTD), a nonprofit organization based in Durham, NC. I hope to share my skills with community members in need of service and can connect in ways that help us keep dreaming and creating a life we can enjoy. 

### Contact
Github: [@dhblanco](https://github.com/dhblanco)

