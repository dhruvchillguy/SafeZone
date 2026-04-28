SafeZone

Problem It Solves
People have no reliable, real time source to know whether an area is safe before they travel. Police data is outdated and not publicly accessible. Google Maps shows roads, not safety. SafeZone fills this gap by letting citizens themselves build a live safety map of their city together.

Project Idea
SafeZone is a map based web application where people can view and report crimes in their area in real time. If someone spots something suspicious, they can report it in one click and their GPS location gets captured automatically using the browser's built in Geolocation API.
The map displays color coded zones red for high crime areas, yellow for moderate, and green for safe zones. A live dashboard shows how many incidents happened this week, which areas are the most unsafe, and a heatmap of crime hotspots across the city.
The core idea is simple if people report together, we build a real and honest picture of the city that neither Google Maps nor official police data ever shows. This helps students, women, and late night commuters make smarter and safer travel decisions.

Features

Interactive Map View crime hotspots across the city with color coded red, yellow, and green zones
Auto Location Capture GPS location is captured automatically when reporting an incident
One Click Crime Reporting Anonymously report incidents with crime type, description, and location
Heatmap Overlay Visual heatmap showing density of crimes in different areas
Live Dashboard Stats on total incidents, most unsafe areas, and crime type breakdown
Safety Alerts Get a warning when you're entering a red zone
Area Search Search any location and get its current safety rating
Filter by Time View crimes reported during day vs night separately


Tech Stack
The frontend is built using React.js with Tailwind CSS for styling. For the interactive map and heatmap visualization, we are using React Leaflet and Leaflet.js. Crime reports are stored and synced in real time using Firebase Firestore. The user's GPS location is captured automatically using the browser's built in Geolocation API. Dashboard charts and graphs are built using Recharts.