# JAI-T Interactive Map

## Deployment Instructions

### Option 1: GitHub Pages (Free)
1. Create a new GitHub repository
2. Push the `dist` folder to the repository
3. Enable GitHub Pages in repository settings
4. Select `main` branch and `root` folder as source

### Option 2: Netlify (Free)
1. Sign up at [Netlify](https://netlify.com)
2. Drag and drop the `dist` folder to the deployment area
3. Your site will be live instantly with a random URL

### Option 3: Vercel (Free)
1. Sign up at [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Deploy automatically from the `dist` folder

### Option 4: Local Web Server
```bash
# Install a simple HTTP server
npm install -g serve

# Serve the dist folder
serve dist
```
Then visit `http://localhost:3000`

### Option 5: Web Hosting
Upload the entire `dist` folder to any web hosting service (Bluehost, GoDaddy, etc.)

## Files Included
- `index.html` - Main application file
- `assets/` - CSS and JavaScript bundles
- `data.csv` - Your AI deployment data
- `us-states.json` - US states GeoJSON for map boundaries

## Notes
- The application is fully self-contained
- All dependencies are bundled
- Works offline once loaded
- Responsive design for all devices
