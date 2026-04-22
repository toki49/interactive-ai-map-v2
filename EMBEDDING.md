# JAI-T Interactive Map - Embedding Guide

## Quick Start: Embedding Your Interactive Map

### Option 1: iframe (Easiest)
Perfect for most websites including WordPress, Squarespace, and CMS platforms.

```html
<iframe 
    src="https://yourwebsite.com/jai-t-map/" 
    width="100%" 
    height="800" 
    frameborder="0" 
    style="border:0; border-radius: 12px;"
    allowfullscreen>
</iframe>
```

### Option 2: Direct Integration (Most Flexible)
Best for full control and optimal performance.

1. **Upload files to your web server**
   ```
   /jai-t-map/
   |-- index.html
   |-- styles.css
   |-- script.js
   |-- data.csv
   ```

2. **Add to your HTML page**
   ```html
   <!-- In your <head> -->
   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
   <link rel="stylesheet" href="/jai-t-map/styles.css">
   
   <!-- In your <body> where you want the map -->
   <div class="jai-t-map-container">
       <div class="stats-bar">
           <div class="stat-item"><span class="stat-number" id="cities-count">0</span> Cities</div>
           <div class="stat-item"><span class="stat-number" id="tools-count">0</span> Tools shown</div>
           <div class="stat-item"><span class="stat-number" id="active-count">0</span> Active tools</div>
           <div class="stat-item"><span class="stat-number" id="domains-count">0</span> Across domains</div>
       </div>
       
       <div class="filters">
           <div class="filter-row">
               <div class="filter-group">
                   <h3>Categories</h3>
                   <div class="filter-buttons">
                       <button class="filter-btn active" data-filter="all" data-type="category">All</button>
                       <button class="filter-btn" data-filter="detection" data-type="category">Detection</button>
                       <button class="filter-btn" data-filter="surveillance" data-type="category">Surveillance</button>
                       <button class="filter-btn" data-filter="prediction" data-type="category">Prediction</button>
                       <button class="filter-btn" data-filter="forensic analysis" data-type="category">Forensic Analysis</button>
                       <button class="filter-btn" data-filter="back-end admin" data-type="category">Back-end Admin</button>
                       <button class="filter-btn" data-filter="front-end support" data-type="category">Front-end Support</button>
                   </div>
               </div>
           </div>
           <div class="filter-row">
               <div class="filter-group">
                   <h3>Domains</h3>
                   <div class="filter-buttons">
                       <button class="filter-btn active" data-filter="all" data-type="domain">All</button>
                       <button class="filter-btn" data-filter="corrections" data-type="domain">Corrections</button>
                       <button class="filter-btn" data-filter="courts" data-type="domain">Courts</button>
                       <button class="filter-btn" data-filter="law enforcement" data-type="domain">Law Enforcement</button>
                   </div>
               </div>
           </div>
       </div>
       
       <div class="map-container">
           <div id="map"></div>
       </div>
   </div>
   
   <!-- Before closing </body> -->
   <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js"></script>
   <script src="/jai-t-map/script.js"></script>
   ```

## Platform-Specific Instructions

### WordPress
1. **Upload files** to `/wp-content/uploads/jai-t-map/`
2. **Add HTML block** to your page with the iframe code
3. **Alternative**: Use a custom HTML block with the direct integration code

### Squarespace
1. **Upload files** using the "Manage Custom Files" option
2. **Add Code Block** with the iframe embed code
3. **Update paths** to use Squarespace's file URLs

### Wix
1. **Upload files** to Wix's media manager
2. **Add HTML iframe element** with the embed code
3. **Set dimensions** appropriately

### Shopify
1. **Upload files** to the `assets` folder
2. **Add Liquid template** or HTML section with the embed code
3. **Use asset URLs** for file references

### Custom HTML/CMS
1. **Upload files** to your web server
2. **Choose iframe or direct integration**
3. **Test thoroughly** on your platform

## Configuration Options

### Responsive Sizing
```css
/* Add to your CSS for responsive behavior */
.jai-t-map-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
}

@media (max-width: 768px) {
    .jai-t-map-container {
        padding: 10px;
    }
    
    #map {
        height: 400px !important;
    }
}
```

### Custom Colors (Optional)
If you want to change the teal theme:
```css
:root {
    --jai-primary: #14b8a6;  /* Change this color */
    --jai-secondary: #64748b;
}

/* Update all references */
.stat-number { color: var(--jai-primary); }
.filter-btn.active { background: var(--jai-primary); }
.custom-marker { background: var(--jai-primary); }
```

### Map Initial View
```javascript
// In script.js, modify the initial view:
map = L.map('map').setView([39.8283, -98.5795], 4); // [lat, lng], zoom
```

## Data Updates

### Updating Your CSV Data
1. **Replace `data.csv`** with your new file
2. **Maintain column structure** - keep the same headers
3. **Add new city coordinates** if needed in `script.js`

### Adding New Cities
```javascript
// In script.js, add to cityCoordinates object:
const cityCoordinates = {
    "New City": { lat: 40.7128, lng: -74.0060 },
    // ... existing cities
};
```

## Performance Optimization

### For Large Datasets
1. **Enable gzip compression** on your server
2. **Minify CSS/JS files** if possible
3. **Consider CDN** for Leaflet tiles

### Caching
```html
<!-- Add cache headers for better performance -->
<meta http-equiv="Cache-Control" content="max-age=31536000">
```

## Troubleshooting

### Common Issues

**Map not loading:**
- Check browser console for errors
- Ensure files are served via HTTP (not file://)
- Verify all file paths are correct

**CSV not loading:**
- Check CSV file format
- Ensure Papa Parse is loaded
- Verify file permissions

**Styling issues:**
- Check CSS file path
- Verify no CSS conflicts
- Test in different browsers

**Responsive problems:**
- Check viewport meta tag
- Test on mobile devices
- Adjust container widths

### Browser Console Errors
Open browser dev tools (F12) and check the console for:
- 404 errors (missing files)
- JavaScript errors
- CORS issues

## Security Considerations

### HTTPS Required
- Use HTTPS URLs for all external resources
- Serve your files over HTTPS
- Update mixed content warnings

### File Permissions
- Set appropriate file permissions (644 for files, 755 for directories)
- Restrict access to sensitive files if needed

## Support

### Testing Checklist
- [ ] Map loads correctly
- [ ] Filters work as expected
- [ ] Hover tooltips appear
- [ ] Click interactions open sidebar
- [ ] Responsive design works on mobile
- [ ] Statistics update correctly
- [ ] All cities display with correct data

### Getting Help
1. **Check browser console** for error messages
2. **Verify file paths** and server configuration
3. **Test with minimal setup** first
4. **Check this guide** for common solutions

## Advanced Customization

### Custom Tooltips
```javascript
// Modify showTooltip function in script.js
function showTooltip(e, city, tools) {
    // Custom tooltip content here
}
```

### Additional Filters
```html
<!-- Add new filter buttons -->
<button class="filter-btn" data-filter="custom" data-type="category">Custom</button>
```

### Custom Map Tiles
```javascript
// Use different map tiles
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);
```

---

**Ready to embed!** Your interactive map now matches the original teal color scheme and can be easily integrated into any website platform.
