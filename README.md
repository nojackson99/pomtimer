# PomTimer
![PomTimer Logo](./new_tomato_app/misc_project_files/images/PomTimer-logo-full.png)

## Motavation
This is a personal projct to help me learn JavaScript, HTML, and CSS and apply parts of these launguages that I already know. There is a project similar to this one called pomofocus.io that I have used to help me with productivity and focus. However, there are some features of this webapp that are behind a paywall. I didn't like this! Since I am an professional software devloper I decided to use my knowledge to develop my own version of this app and improve upon its design. I am hoping to integrate all major features found on pomfocus.io and add some new ones!

## Visuals
[Placeholder]

## Installation
Current steps to run:
- Clone project with either ssh or https ex: git clone git@gitlab.com:nojackson99/pomtimer.git
- navigate to new_tomato_app directory
- install easytimer 
    - npm install easytimer.js --save
- run npm install to ensure all other dependencies installed
- start local server to run current build
    - npm run dev

Dev server will deploy to http://localhost:3000/ 

## Usage
Current funtionality is as follows:
- after starting with proper command navigate to localhost url
- currently displays timer with associated theme
- switch between work and break timers
- press Start Focus/Break to begin countdown from displayed time to zero
- end timer sound will play once timer has reached zero
- create profile to store your tasks by hovering over profile in top left and clicking createe new profile
- changer work and break lenghts at settings button on at top right
- enter in task name and number of work sessions below timer
- click on a created task to make it active, this will track how many sessions you have completed working on this task

## Development Tools and Libraries Used
Vite - build tool to provide more strealined development experience for modern web products
EasyTimer.js - implements countdown timer and timer controls

## Resources
Vite docs: https://vitejs.dev/   
EasyTImer.js docs: https://albert-gonzalez.github.io/easytimer.js/

## Support
For any support questions please refer to above resources or email me at nojackson99@gmail.com

## Roadmap
Major feature Roadmap:

Not started:
- Deploy to web server
- Implement local chrome data storage

Complete:
- Add button/timer sounds & end timer notification
- Timer Improvements
- Implement basic task tracking
- EasyTimer.js implementation

## Contributing
Currently not open to outside contributers. This may change in the future. If you have any suggestions for features to add or changes to the current state of the app please email me at nojackson99@gmail.com

## Authors and acknowledgment
Creator: Noah Jackson

## License
Copyright © 2022, Noah Jackson, All rights reserved.

## Project status
Major development finshed, may deploy to website and implement local data storage

