# Running Meetup Site

Simple web app to organize local running meetup — list event schedule, connect with the group.

Live site is deployed with Netlify to [socialrunners.netlify.app](https://socialrunners.netlify.app/)

## Quick start
```bash
git clone https://github.com/shaneM50/running_meetup_site.git
cd running_meetup_site

# install dependencies (example)
# npm install   OR   pip install -r requirements.txt

# configure
# create .env with required values:
# DATABASE_URL, SECRET_KEY, MAPS_API_KEY

# run (example)
# npm start   OR   flask run
```

## Features
- Info about the group.
- Event list with date/time, route and distance   
- Connect to the group.

## Project layout (typical)
- `src/` — application source code  
- `public/` — static assets  
- `scripts/` — migrations, seeds, helpers  
- `tests/` — test suite

## Contributing
1. Fork the repo  
2. Create a branch for your change  
3. Add tests where applicable  
4. Open a pull request
