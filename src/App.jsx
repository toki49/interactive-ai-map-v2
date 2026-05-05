import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from 'react-leaflet';
import { Search, Filter, X, MapPin, Activity, Users, Globe } from 'lucide-react';
import Papa from 'papaparse';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import usStates from '../public/us-states.json';

// Custom marker icons
const createCustomIcon = (category, size) => {
  const colors = {
    detection: '#14b8a6',
    surveillance: '#ec4899',
    prediction: '#f97316',
    'forensic analysis': '#22c55e',
    'back-end admin': '#8b5cf6',
    'front-end support': '#92400e',
    other: '#6b7280'
  };
  
  const color = colors[category?.toLowerCase()] || colors.other;
  const radius = Math.min(Math.max(size * 2, 8), 25);
  
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background: ${color}; width: ${radius * 2}px; height: ${radius * 2}px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
    iconSize: [radius * 2, radius * 2],
    iconAnchor: [radius, radius]
  });
};

// Map bounds component
const MapBounds = ({ data }) => {
  const map = useMap();
  
  useEffect(() => {
    if (data && data.length > 0) {
      const bounds = L.latLngBounds(data.map(d => [d.lat, d.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [data, map]);
  
  return null;
};

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(['all']);
  const [selectedDomains, setSelectedDomains] = useState(['all']);
  const [selectedStatus, setSelectedStatus] = useState(['all']);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load and parse CSV data
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data.csv');
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const processedData = results.data
              .filter(row => row.City && row.State)
              .map(row => ({
                city: row.City,
                state: row.State,
                category1: row['Category 1'],
                category2: row['Category 2'],
                category3: row['Category 3'],
                domain: row.Domain,
                stage: row['Stage of Deployment'],
                toolName: row['Name of Tool'],
                vendor: row['Vendor or Name of Tech (if applicable)'],
                description: row['Description of Tool in your own words\n(1-2 sentences)  '],
                totalCases: parseInt(row['# Total Cases Per City']) || 0,
                corrections: parseInt(row.Corrections) || 0,
                courts: parseInt(row.Courts) || 0,
                lawEnforcement: parseInt(row['Law Enforcement']) || 0,
                // Add coordinates for major cities (you'd want to geocode these properly)
                lat: getLatForCity(row.City, row.State),
                lng: getLngForCity(row.City, row.State)
              }))
              .filter(d => d.lat && d.lng);
            
            setData(processedData);
            setFilteredData(processedData);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Simple coordinate lookup (in production, you'd use a geocoding API)
  const getLatForCity = (city, state) => {
    const coordinates = {
      'New York City': 40.7128,
      'Los Angeles': 34.0522,
      'Chicago': 41.8781,
      'Houston': 29.7604,
      'Phoenix': 33.4484,
      'Philadelphia': 39.9526,
      'San Antonio': 29.4241,
      'San Diego': 32.7157,
      'Dallas': 32.7767,
      'San Jose': 37.3382
    };
    return coordinates[city] || null;
  };

  const getLngForCity = (city, state) => {
    const coordinates = {
      'New York City': -74.0060,
      'Los Angeles': -118.2437,
      'Chicago': -87.6298,
      'Houston': -95.3698,
      'Phoenix': -112.0740,
      'Philadelphia': -75.1652,
      'San Antonio': -98.4936,
      'San Diego': -117.1611,
      'Dallas': -96.7970,
      'San Jose': -121.8863
    };
    return coordinates[city] || null;
  };

  // Filter data based on selected filters
  useEffect(() => {
    let filtered = data;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.toolName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (!selectedCategories.includes('all')) {
      filtered = filtered.filter(item =>
        selectedCategories.some(cat => 
          item.category1?.toLowerCase() === cat ||
          item.category2?.toLowerCase() === cat ||
          item.category3?.toLowerCase() === cat
        )
      );
    }

    // Domain filter
    if (!selectedDomains.includes('all')) {
      filtered = filtered.filter(item =>
        selectedDomains.includes(item.domain?.toLowerCase())
      );
    }

    // Status filter
    if (!selectedStatus.includes('all')) {
      filtered = filtered.filter(item =>
        selectedStatus.includes(item.stage?.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [data, searchTerm, selectedCategories, selectedDomains, selectedStatus]);

  // Calculate statistics
  const stats = useMemo(() => {
    const cities = new Set(filteredData.map(d => `${d.city}, ${d.state}`));
    const activeTools = filteredData.filter(d => d.stage?.toLowerCase() === 'active');
    const domains = new Set(filteredData.map(d => d.domain).filter(Boolean));
    
    return {
      cities: cities.size,
      tools: filteredData.length,
      activeTools: activeTools.length,
      domains: domains.size
    };
  }, [filteredData]);

  // Group data by city for markers
  const cityData = useMemo(() => {
    const grouped = {};
    
    filteredData.forEach(item => {
      const key = `${item.city}, ${item.state}`;
      if (!grouped[key]) {
        grouped[key] = {
          city: item.city,
          state: item.state,
          lat: item.lat,
          lng: item.lng,
          tools: [],
          categories: new Set(),
          domains: new Set(),
          corrections: 0,
          courts: 0,
          lawEnforcement: 0
        };
      }
      
      grouped[key].tools.push(item);
      if (item.category1) grouped[key].categories.add(item.category1);
      if (item.category2) grouped[key].categories.add(item.category2);
      if (item.category3) grouped[key].categories.add(item.category3);
      if (item.domain) grouped[key].domains.add(item.domain);
      grouped[key].corrections += item.corrections;
      grouped[key].courts += item.courts;
      grouped[key].lawEnforcement += item.lawEnforcement;
    });
    
    return Object.values(grouped);
  }, [filteredData]);

  const toggleFilter = (type, value) => {
    if (type === 'category') {
      if (value === 'all') {
        setSelectedCategories(['all']);
      } else {
        setSelectedCategories(prev => 
          prev.includes(value) 
            ? prev.filter(v => v !== value)
            : [...prev.filter(v => v !== 'all'), value]
        );
      }
    } else if (type === 'domain') {
      if (value === 'all') {
        setSelectedDomains(['all']);
      } else {
        setSelectedDomains(prev => 
          prev.includes(value) 
            ? prev.filter(v => v !== value)
            : [...prev.filter(v => v !== 'all'), value]
        );
      }
    } else if (type === 'status') {
      if (value === 'all') {
        setSelectedStatus(['all']);
      } else {
        setSelectedStatus(prev => 
          prev.includes(value) 
            ? prev.filter(v => v !== value)
            : [...prev.filter(v => v !== 'all'), value]
        );
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading map data...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header with Statistics */}
      <div className="bg-white shadow-sm border-b border-gray-300 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Classifying real-world deployments of AI in the criminal justice system
          </h1>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-800">{stats.cities}</div>
              <div className="text-sm text-gray-600">City Count</div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-800">{stats.tools}</div>
              <div className="text-sm text-gray-600">Application Count</div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-800">{stats.activeTools}</div>
              <div className="text-sm text-gray-600">Active Tools</div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-800">{stats.domains}</div>
              <div className="text-sm text-gray-600">Domains</div>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search cities, tools, or states..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              {showFilters && <X className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Category Filters */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4 text-lg">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {['all', 'detection', 'surveillance', 'prediction', 'forensic analysis', 'back-end admin', 'front-end support'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => toggleFilter('category', cat)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedCategories.includes(cat) 
                          ? 'bg-gray-800 text-white shadow-lg' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Domain Filters */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4 text-lg">Domains</h3>
                <div className="flex flex-wrap gap-2">
                  {['all', 'law enforcement', 'courts', 'corrections'].map(domain => (
                    <button
                      key={domain}
                      onClick={() => toggleFilter('domain', domain)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedDomains.includes(domain) 
                          ? 'bg-gray-800 text-white shadow-lg' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {domain.charAt(0).toUpperCase() + domain.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filters */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4 text-lg">Status</h3>
                <div className="flex flex-wrap gap-2">
                  {['all', 'active', 'inactive', 'unsure'].map(status => (
                    <button
                      key={status}
                      onClick={() => toggleFilter('status', status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedStatus.includes(status) 
                          ? 'bg-gray-800 text-white shadow-lg' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="relative" style={{ height: '600px' }}>
        <MapContainer
          center={[39.8283, -98.5795]}
          zoom={4}
          style={{ height: '100%', width: '100%' }}
          bounds={[[25.0, -125.0], [50.0, -65.0]]}
          maxBounds={[[15.0, -180.0], [55.0, -50.0]]}
          minZoom={3}
          maxZoom={10}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          
          <GeoJSON 
            data={usStates}
            style={() => ({
              color: '#666',
              weight: 1.5,
              opacity: 0.7,
              fillOpacity: 0.02,
              fillColor: '#f0f0f0'
            })}
          />
          
          <MapBounds data={cityData} />
          
          {cityData.map((city, index) => {
            const primaryCategory = Array.from(city.categories)[0] || 'other';
            const icon = createCustomIcon(primaryCategory, city.tools.length);
            
            return (
              <Marker
                key={index}
                position={[city.lat, city.lng]}
                icon={icon}
              >
                <Popup>
                  <div className="p-4 min-w-72 bg-white">
                    <h3 className="font-bold text-lg text-gray-800 mb-3">
                      {city.city}, {city.state}
                    </h3>
                    <div className="space-y-3">
                      <div className="text-sm text-gray-700">
                        <span className="font-semibold">Total AI tool deployments:</span> {city.tools.length}
                      </div>
                      
                      {city.corrections > 0 && (
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Corrections:</span> {city.corrections}
                        </div>
                      )}
                      
                      {city.courts > 0 && (
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Courts:</span> {city.courts}
                        </div>
                      )}
                      
                      {city.lawEnforcement > 0 && (
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Law Enforcement:</span> {city.lawEnforcement}
                        </div>
                      )}
                      
                      <div className="pt-3 border-t border-gray-200">
                        <div className="text-sm font-semibold text-gray-700 mb-2">Categories:</div>
                        <div className="flex flex-wrap gap-2">
                          {Array.from(city.categories).map(cat => (
                            <span
                              key={cat}
                              className="px-2 py-1 rounded-full text-xs font-medium text-white"
                              style={{
                                backgroundColor: {
                                  detection: '#14b8a6',
                                  surveillance: '#ec4899',
                                  prediction: '#f97316',
                                  'forensic analysis': '#22c55e',
                                  'back-end admin': '#8b5cf6',
                                  'front-end support': '#92400e'
                                }[cat?.toLowerCase()] || '#6b7280'
                              }}
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        
        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">Legend</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-teal-500"></div>
              <span className="text-gray-700">Detection</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-pink-500"></div>
              <span className="text-gray-700">Surveillance</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <span className="text-gray-700">Prediction</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-gray-700">Forensic</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-purple-500"></div>
              <span className="text-gray-700">Back-end</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-yellow-800"></div>
              <span className="text-gray-700">Front-end</span>
            </div>
          </div>
          <div className="text-xs text-gray-600 mt-3 pt-3 border-t border-gray-200">
            Dot size = number of tools
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
