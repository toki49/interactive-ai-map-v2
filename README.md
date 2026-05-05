# JAI-T Interactive Map

An interactive map visualization for the Justice and AI Technologies (JAI-T) database, showing AI tools deployed across US cities with filtering capabilities and detailed information.

## Features

- **Interactive Map**: Browse cities with AI tools using Leaflet.js
- **Category Filters**: Filter by Detection, Surveillance, Prediction, Forensic Analysis, Back-end Admin, Front-end Support
- **Domain Filters**: Filter by Corrections, Courts, Law Enforcement
- **Live Statistics**: Real-time updates showing cities, tools, active deployments, and domains
- **Hover Tooltips**: Quick summaries on hover
- **Detailed Sidebar**: Click cities for complete tool details
- **Responsive Design**: Works on desktop and mobile devices

## Data Structure

The map uses data from `data.csv` with the following structure:
- City, State locations
- Tool categories and domains
- Deployment stages (Active/Inactive/Unsure)
- Tool descriptions and vendors
- Citations and sources

## Setup Instructions

### Local Development

1. **Download the project files**
   ```bash
   # Extract or copy all files to your local directory
   ```

2. **Start a local server**
   
   Since the map uses Papa Parse to load CSV data, you need to run it from a web server (not directly from file:// protocol).

   **Option A: Using Python**
   ```bash
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

   **Option B: Using Node.js**
   ```bash
   npx http-server
   # Then visit http://localhost:8080
   ```

   **Option C: Using Live Server in VS Code**
   - Install the "Live Server" extension
   - Right-click `index.html` and select "Open with Live Server"

### Embedding in Your Website

To embed this map in the www.jai-t.com website:

1. **Copy the files** to your website's directory
2. **Update paths** in `index.html` if needed
3. **Include the map** using an iframe or by integrating the HTML/CSS/JS directly

#### iframe Method (Simple):
```html
<iframe src="/path/to/interactive-map/" width="100%" height="800" frameborder="0"></iframe>
```

#### Direct Integration (Recommended):
```html
<!-- Add to your existing HTML -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<link rel="stylesheet" href="/path/to/styles.css">

<div id="jait-map-container">
    <!-- Include the map HTML structure from index.html -->
</div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js"></script>
<script src="/path/to/script.js"></script>
```

## Customization

### Adding New Cities

To add coordinates for new cities, update the `cityCoordinates` object in `script.js`:

```javascript
const cityCoordinates = {
    "New City Name": { lat: 40.7128, lng: -74.0060 },
    // Add more cities...
};
```

### Updating Colors

Modify the `categoryColors` object in `script.js`:

```javascript
const categoryColors = {
    'detection': '#3b82f6',
    'surveillance': '#ec4899',
    // Update colors...
};
```

### Styling

All styles are in `styles.css`. Key sections:
- `.stats-bar` - Statistics display
- `.filter-buttons` - Filter button styling
- `.custom-marker` - Map marker appearance
- `.sidebar` - City details panel

## Data Updates

To update the map with new data:

1. **Update the CSV**: Replace `data.csv` with your new data file
2. **Maintain column structure**: Keep the same column headers as the original file
3. **Add city coordinates**: If adding new cities, update the `cityCoordinates` object

## Known Issues & Fixes

### Pittsburgh Coordinates
Fixed the Pittsburgh coordinates issue - they were plotting in Canada. Updated to correct coordinates:
```javascript
"Pittsburgh": { lat: 40.4406, lng: -79.9959 }
```

### Cities Without Tools
Cities like Jersey City, Laredo, Garland, and Boise show as gray dots when they have no recorded tools.

### Uncategorized Tools
Tools without categories appear in "All" view but disappear when category filters are applied.

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance

The map handles large datasets efficiently by:
- Using Papa Parse for fast CSV parsing
- Implementing client-side filtering
- Creating markers only for visible/filtered cities

## Dependencies

- **Leaflet.js** - Interactive maps
- **Papa Parse** - CSV parsing
- **OpenStreetMap** - Base map tiles

## License

This project is part of the JAI-T initiative found at www.jai-t.com by Evidence for Justice Lab at Georgetown University McCourt School of Public Policy. Created for solely research and not commercial purposes.

## Support

For issues or questions:
1. Check the browser console for error messages
2. Ensure all files are served via HTTP (not file://)
3. Verify the CSV file has the correct format
4. Test with a local web server first
