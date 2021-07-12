# Press Play Request (working title)

## User Requirements

- A user can log in
- A user can join a room or group
- A user can propose an edit to a track in a group
- A user can view proposed edits to the track in a group and approve/deny them
- A user can comment on a proposed edit to the track in a group
- A user can select from multiple samples
- A user can add samples to their room/group and account
- A user can chat with their teammates in their group

## Roadmap

Think in terms of building up from scratch. What comes first? Which elements
of the project depend on others?

## Prerequisites

Homebrew (Mac users) https://brew.sh/  
npm (Window users) https://www.npmjs.com/get-npm  
Yarn & Node  
Mac: <code>$ brew install yarn</code>  
Windows: <code>$ npm install --global yarn</code>  
Check that you have installed them:  
<code>$ yarn --version</code>  
<code>$ node --version</code>

### Backend

<code>$ yarn global add nodemon</code>  
<code>$ yarn add babel-node --dev</code>

## How to run the server

1. <code>yarn start</code>
2. Go to http://localhost:4000/
