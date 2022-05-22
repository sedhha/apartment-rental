# Project Overview

This App is created with Frontend on React and Backend on Node. For Auth and Database purposes, Firebase Cloud is used. (Firebase Auth and Firestore). For deployment Vercel is used.

For Global State management, Redux Toolkit is used and for simplifying the styles tailwind is used. The states that are not supposed to be globally shared have been handled in a local reducer whereas auth data is handled in the global reducer.

## Frontend Details

All the Frontend Components can be found in [components](components/) directory. This contains the pages and respective components.

Routing is handled via file based routing and all the routes can be found in [pages](pages/) folder. [api](pages/api/) folder contains all the routing logic for backend APIs.

In total we have 4 routes:

- homepage [You can navigate to register and login from here]
- login [To log user in]
- register [To register for a new account]
- profile [This is a compound route consisting of three sub routes.]
