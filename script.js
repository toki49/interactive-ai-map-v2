// City coordinates database
const cityCoordinates = {
    "New York City": { lat: 40.7128, lng: -74.0060 },
    "Los Angeles": { lat: 34.0522, lng: -118.2437 },
    "Chicago": { lat: 41.8781, lng: -87.6298 },
    "Houston": { lat: 29.7604, lng: -95.3698 },
    "Phoenix": { lat: 33.4484, lng: -112.0740 },
    "Philadelphia": { lat: 39.9526, lng: -75.1652 },
    "San Antonio": { lat: 29.4241, lng: -98.4936 },
    "San Diego": { lat: 32.7157, lng: -117.1611 },
    "Dallas": { lat: 32.7767, lng: -96.7970 },
    "San Jose": { lat: 37.3382, lng: -121.8863 },
    "Austin": { lat: 30.2672, lng: -97.7431 },
    "Jacksonville": { lat: 30.3322, lng: -81.6557 },
    "Fort Worth": { lat: 32.7555, lng: -97.3308 },
    "Columbus": { lat: 39.9612, lng: -82.9988 },
    "Charlotte": { lat: 35.2271, lng: -80.8431 },
    "San Francisco": { lat: 37.7749, lng: -122.4194 },
    "Indianapolis": { lat: 39.7684, lng: -86.1581 },
    "Seattle": { lat: 47.6062, lng: -122.3321 },
    "Denver": { lat: 39.7392, lng: -104.9903 },
    "Boston": { lat: 42.3601, lng: -71.0589 },
    "Nashville": { lat: 36.1627, lng: -86.7816 },
    "Oklahoma City": { lat: 35.4676, lng: -97.5164 },
    "El Paso": { lat: 31.7619, lng: -106.4850 },
    "Las Vegas": { lat: 36.1699, lng: -115.1398 },
    "Detroit": { lat: 42.3314, lng: -83.0458 },
    "Portland": { lat: 45.5152, lng: -122.6784 },
    "Memphis": { lat: 35.1495, lng: -90.0490 },
    "Louisville": { lat: 38.2527, lng: -85.7585 },
    "Milwaukee": { lat: 43.0389, lng: -87.9065 },
    "Baltimore": { lat: 39.2904, lng: -76.6122 },
    "Albuquerque": { lat: 35.0844, lng: -106.6504 },
    "Tucson": { lat: 32.2226, lng: -110.9747 },
    "Fresno": { lat: 36.7378, lng: -119.7871 },
    "Sacramento": { lat: 38.5816, lng: -121.4944 },
    "Kansas City": { lat: 39.0997, lng: -94.5786 },
    "Mesa": { lat: 33.4152, lng: -111.8315 },
    "Atlanta": { lat: 33.7490, lng: -84.3880 },
    "Omaha": { lat: 41.2565, lng: -95.9345 },
    "Colorado Springs": { lat: 38.8339, lng: -104.8214 },
    "Raleigh": { lat: 35.7796, lng: -78.6382 },
    "Long Beach": { lat: 33.7701, lng: -118.1937 },
    "Virginia Beach": { lat: 36.8529, lng: -75.9780 },
    "Miami": { lat: 25.7617, lng: -80.1918 },
    "Oakland": { lat: 37.8044, lng: -122.2711 },
    "Minneapolis": { lat: 44.9778, lng: -93.2650 },
    "Tampa": { lat: 27.9506, lng: -82.4572 },
    "Tulsa": { lat: 36.1540, lng: -95.9940 },
    "Arlington": { lat: 32.7157, lng: -97.1081 },
    "New Orleans": { lat: 29.9511, lng: -90.0715 },
    "Wichita": { lat: 37.6872, lng: -97.3301 },
    "Cleveland": { lat: 41.4993, lng: -81.6944 },
    "Bakersfield": { lat: 35.3733, lng: -119.0187 },
    "Aurora": { lat: 39.7294, lng: -104.8319 },
    "Anaheim": { lat: 33.8366, lng: -117.9143 },
    "Honolulu": { lat: 21.3099, lng: -157.8581 },
    "Santa Ana": { lat: 33.7455, lng: -117.8677 },
    "Riverside": { lat: 33.9533, lng: -117.3962 },
    "Corpus Christi": { lat: 27.8006, lng: -97.3964 },
    "Lexington": { lat: 38.0406, lng: -84.5037 },
    "Henderson": { lat: 36.0395, lng: -114.9817 },
    "Stockton": { lat: 37.9577, lng: -121.2908 },
    "St. Paul": { lat: 44.9537, lng: -93.0900 },
    "Cincinnati": { lat: 39.1031, lng: -84.5120 },
    "Pittsburgh": { lat: 40.4406, lng: -79.9959 }, // Fixed coordinates
    "Greensboro": { lat: 36.0726, lng: -79.7920 },
    "Lincoln": { lat: 40.8092, lng: -96.6917 },
    "Orlando": { lat: 28.5383, lng: -81.3792 },
    "Plano": { lat: 33.0198, lng: -96.6989 },
    "Durham": { lat: 35.9940, lng: -78.8986 },
    "St. Louis": { lat: 38.6270, lng: -90.1994 },
    "Irvine": { lat: 33.6846, lng: -117.8265 },
    "Laredo": { lat: 27.5116, lng: -99.5075 },
    "Garland": { lat: 32.9126, lng: -96.6389 },
    "Boise": { lat: 43.6150, lng: -116.2023 },
    "Buffalo": { lat: 42.8864, lng: -78.8784 },
    "Jersey City": { lat: 40.7177, lng: -74.0431 },
    "Chula Vista": { lat: 32.6401, lng: -117.0842 },
    "Fort Wayne": { lat: 41.0793, lng: -85.1394 },
    "Chandler": { lat: 33.3062, lng: -111.8413 },
    "St. Petersburg": { lat: 27.7676, lng: -82.6403 },
    "Lubbock": { lat: 33.5779, lng: -101.8553 },
    "Scottsdale": { lat: 33.4942, lng: -111.9261 },
    "Madison": { lat: 43.0731, lng: -89.4012 },
    "Gilbert": { lat: 33.3528, lng: -111.7890 },
    "Reno": { lat: 39.5296, lng: -119.8138 },
    "Glendale": { lat: 33.5387, lng: -112.1860 },
    "Winston-Salem": { lat: 36.0999, lng: -80.2442 },
    "North Las Vegas": { lat: 36.1989, lng: -115.1175 },
    "Fremont": { lat: 37.5485, lng: -121.9886 },
    "Norfolk": { lat: 36.8468, lng: -76.2852 },
    "Irving": { lat: 32.8140, lng: -96.9489 },
    "Greenville": { lat: 34.8526, lng: -82.3940 },
    "Hialeah": { lat: 25.8576, lng: -80.2781 },
    "Garland": { lat: 32.9126, lng: -96.6389 },
    "Boise": { lat: 43.6150, lng: -116.2023 },
    "Birmingham": { lat: 33.5207, lng: -86.8025 }
};

// Global variables
let map;
let markers = [];
let cityData = [];
let currentFilters = {
    category: 'all',
    domain: 'all'
};

// Category color mapping
const categoryColors = {
    'detection': '#14b8a6',
    'surveillance': '#ec4899',
    'prediction': '#f97316',
    'forensic analysis': '#22c55e',
    'back-end admin': '#8b5cf6',
    'front-end support': '#92400e'
};

// Initialize the map
function initMap() {
    map = L.map('map').setView([39.8283, -98.5795], 4); // Center of USA

    // Simple grayscale map tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // Load and process CSV data
    loadCSVData();
}

// Load CSV data using Papa Parse
function loadCSVData() {
    Papa.parse('data.csv', {
        header: true,
        download: true,
        complete: function(results) {
            processData(results.data);
            updateStatistics();
        },
        error: function(error) {
            console.error('Error loading CSV:', error);
        }
    });
}

// Process the CSV data
function processData(data) {
    // Group data by city
    cityData = {};
    
    data.forEach(row => {
        const city = row.City;
        const state = row.State;
        const cityKey = `${city}, ${state}`;
        
        if (!cityData[cityKey]) {
            cityData[cityKey] = {
                city: city,
                state: state,
                tools: [],
                coordinates: cityCoordinates[city] || null
            };
        }
        
        // Add tool if it has valid data
        if (row['Name of Tool '] && row['Name of Tool '].trim()) {
            cityData[cityKey].tools.push({
                name: row['Name of Tool '] || '',
                vendor: row['Vendor or Name of Tech (if applicable)'] || '',
                category1: row['Category 1'] || '',
                category2: row['Category 2'] || '',
                category3: row['Category 3'] || '',
                domain: row['Domain'] || '',
                stage: row['Stage of Deployment '] || '',
                description: row['Description of Tool in your own words\n(1-2 sentences)  '] || ''
            });
        }
    });
    
    // Create markers for each city
    createMarkers();
}

// Create markers for cities
function createMarkers() {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    Object.keys(cityData).forEach(cityKey => {
        const city = cityData[cityKey];
        
        if (!city.coordinates) {
            console.warn(`No coordinates found for ${city.city}`);
            return;
        }
        
        // Filter tools based on current filters
        const filteredTools = filterTools(city.tools);
        
        if (filteredTools.length === 0) return;
        
        // Determine marker color and size
        const markerInfo = getMarkerInfo(filteredTools);
        
        // Create custom icon
        const icon = L.divIcon({
            className: 'custom-marker ' + markerInfo.categoryClass,
            html: `<div style="width: ${markerInfo.size}px; height: ${markerInfo.size}px; border-radius: 50%; background: ${markerInfo.color}; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
            iconSize: [markerInfo.size, markerInfo.size],
            iconAnchor: [markerInfo.size/2, markerInfo.size/2]
        });
        
        // Create marker
        const marker = L.marker([city.coordinates.lat, city.coordinates.lng], { icon })
            .addTo(map);
        
        // Add hover tooltip
        marker.on('mouseover', function(e) {
            showTooltip(e, city, filteredTools);
        });
        
        marker.on('mouseout', function() {
            hideTooltip();
        });
        
        // Add click event
        marker.on('click', function() {
            showCityDetails(city, filteredTools);
        });
        
        markers.push(marker);
    });
}

// Filter tools based on current filters
function filterTools(tools) {
    return tools.filter(tool => {
        // Category filter
        if (currentFilters.category !== 'all') {
            const categories = [tool.category1, tool.category2, tool.category3].filter(c => c && c.trim());
            const hasCategory = categories.some(cat => 
                cat.toLowerCase().includes(currentFilters.category.toLowerCase())
            );
            if (!hasCategory) return false;
        }
        
        // Domain filter
        if (currentFilters.domain !== 'all') {
            if (!tool.domain || !tool.domain.toLowerCase().includes(currentFilters.domain.toLowerCase())) {
                return false;
            }
        }
        
        return true;
    });
}

// Get marker information (color, size, category)
function getMarkerInfo(tools) {
    const categories = new Set();
    
    tools.forEach(tool => {
        [tool.category1, tool.category2, tool.category3].forEach(cat => {
            if (cat && cat.trim()) {
                categories.add(cat.toLowerCase());
            }
        });
    });
    
    let color = '#6b7280'; // Default gray for multiple/other
    let categoryClass = 'multiple';
    
    if (categories.size === 1) {
        const category = Array.from(categories)[0];
        if (categoryColors[category]) {
            color = categoryColors[category];
            categoryClass = category.replace(/\s+/g, '-');
        }
    }
    
    // Size based on number of tools (smaller dots)
    const size = Math.min(Math.max(12, tools.length * 4), 35);
    
    return { color, size, categoryClass };
}

// Show tooltip on hover
function showTooltip(e, city, tools) {
    const tooltip = document.getElementById('tooltip');
    const activeTools = tools.filter(t => t.stage.toLowerCase() === 'active');
    
    let content = `<strong>${city.city}, ${city.state}</strong><br>`;
    content += `${tools.length} tools (${activeTools.length} active)<br>`;
    
    // Show categories
    const categories = new Set();
    tools.forEach(tool => {
        [tool.category1, tool.category2, tool.category3].forEach(cat => {
            if (cat && cat.trim()) categories.add(cat);
        });
    });
    
    if (categories.size > 0) {
        content += `Categories: ${Array.from(categories).join(', ')}<br>`;
    }
    
    // Show first few tools
    content += '<br><strong>Tools:</strong><br>';
    tools.slice(0, 3).forEach(tool => {
        content += `&bull; ${tool.name}<br>`;
    });
    
    if (tools.length > 3) {
        content += `... and ${tools.length - 3} more`;
    }
    
    tooltip.innerHTML = content;
    tooltip.style.left = e.originalEvent.pageX + 10 + 'px';
    tooltip.style.top = e.originalEvent.pageY - 10 + 'px';
    tooltip.classList.add('show');
}

// Hide tooltip
function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('show');
}

// Show city details in sidebar
function showCityDetails(city, tools) {
    const sidebar = document.getElementById('sidebar');
    const cityName = document.getElementById('city-name');
    const cityDetails = document.getElementById('city-details');
    
    cityName.textContent = `${city.city}, ${city.state}`;
    
    let detailsHTML = `<div class="city-summary">
        <p><strong>Total Tools:</strong> ${tools.length}</p>
        <p><strong>Active Tools:</strong> ${tools.filter(t => t.stage.toLowerCase() === 'active').length}</p>
    </div>`;
    
    tools.forEach(tool => {
        const category = tool.category1 || tool.category2 || tool.category3 || 'Uncategorized';
        const categoryClass = category.toLowerCase().replace(/\s+/g, '-');
        
        detailsHTML += `
            <div class="tool-item">
                <h4>${tool.name}</h4>
                <div class="tool-vendor">${tool.vendor}</div>
                <div class="tool-description">${tool.description}</div>
                <div class="tool-meta">
                    <span class="tool-badge badge-category">${category}</span>
                    <span class="tool-badge badge-domain">${tool.domain}</span>
                    <span class="tool-badge badge-stage ${tool.stage.toLowerCase()}">${tool.stage}</span>
                </div>
            </div>
        `;
    });
    
    cityDetails.innerHTML = detailsHTML;
    sidebar.classList.add('open');
}

// Close sidebar
function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('open');
}

// Update statistics
function updateStatistics() {
    let totalCities = 0;
    let totalTools = 0;
    let activeTools = 0;
    const domains = new Set();
    
    Object.keys(cityData).forEach(cityKey => {
        const city = cityData[cityKey];
        const filteredTools = filterTools(city.tools);
        
        if (filteredTools.length > 0) {
            totalCities++;
            totalTools += filteredTools.length;
            
            filteredTools.forEach(tool => {
                if (tool.stage && tool.stage.toLowerCase() === 'active') {
                    activeTools++;
                }
                if (tool.domain) {
                    domains.add(tool.domain);
                }
            });
        }
    });
    
    document.getElementById('cities-count').textContent = totalCities;
    document.getElementById('tools-count').textContent = totalTools;
    document.getElementById('active-count').textContent = activeTools;
    document.getElementById('domains-count').textContent = domains.size;
}

// Filter button event listeners
function setupFilterButtons() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filterType = this.dataset.type;
            const filterValue = this.dataset.filter;
            
            // Update active state
            document.querySelectorAll(`.filter-btn[data-type="${filterType}"]`).forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            // Update filter
            currentFilters[filterType] = filterValue;
            
            // Recreate markers and update stats
            createMarkers();
            updateStatistics();
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    setupFilterButtons();
});

// Close sidebar when clicking outside
document.addEventListener('click', function(e) {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('open') && 
        !sidebar.contains(e.target) && 
        !e.target.closest('.custom-marker')) {
        closeSidebar();
    }
});
