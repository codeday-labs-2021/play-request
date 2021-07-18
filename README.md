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

### Frontend - ReactJS

To run:
```bash
cd client
yarn start
```

### Backend - Express

*todo*

### Firebase

To access the Firebase database and storage bucket, go to `https://console.firebase.google.com/`

This project uses the Realtime database to store project data in a JSON-like format. The tab for this is called "Realtime Database" on the left. Data can be inputted manually here or through the [API](https://firebase.google.com/docs/database).

To store and monitor sound files, navigate to the tab called "Storage". Files can either be uploaded here or through the [API](https://firebase.google.com/docs/storage).
