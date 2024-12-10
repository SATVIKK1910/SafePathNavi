import React, { useEffect } from "react";
import { SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity, StatusBar, StyleSheet } from "react-native";
import { auth } from '../firebaseConfig'; // Import Firebase auth

const MainPage = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('Map'); // Redirect to Map screen if logged in
      }
    });
    return unsubscribe; // Cleanup subscription
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Set StatusBar to transparent with no background color */}
      <StatusBar barStyle="white-content" translucent={true} backgroundColor="transparent" />

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.mainContent}>
          <Image
            source={require('../assets/main.png')}
            style={styles.image}
          />
          <Text style={styles.title}>Safe Path Navigator</Text>
          <Text style={styles.subtitle}>
            Stay Safe, Stay Navigated With Us, {"\n"}Start by login or signup
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Auth')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Full screen height
    backgroundColor: "#FFFFFF", // Set background color to white
  },
  scrollView: {
    flexGrow: 1, // Ensures ScrollView takes full screen height
    justifyContent: 'center', // Center contents vertically
    alignItems: 'center', // Center contents horizontally
  },
  mainContent: {
    backgroundColor: "#5E17EB",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%', // Ensure it takes full width
    paddingTop: 40, // Adjust padding as needed
    paddingBottom: 20, // Adjust padding as needed
  },
  image: {
    height: 200,
    width: 200,
    marginBottom: 20, // Adjust spacing
  },
  title: {
    color: "#FFFFFF",
    fontSize: 33,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 30,
    textAlign: "center",
    marginHorizontal: 30, // Adjust margin for better readability
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal:10,
    marginBottom: 15,
    marginHorizontal: 50,
  },
  buttonText: {
    color: "#000000",
    fontSize: 22,
  },
});

export default MainPage;


  //
  //
  // import React, { useState, useRef } from 'react';
  // import {
  //     View,
  //     StyleSheet,
  //     TextInput,
  //     FlatList,
  //     TouchableOpacity,
  //     Text,
  //     ActivityIndicator,
  //     Alert,
  //     Animated,
  //     Dimensions,
  // } from 'react-native';
  // import MapView, { Marker, Polyline } from 'react-native-maps';
  // import axios from 'axios';
  // import { Ionicons } from 'react-native-vector-icons';
  //
  //
  // const HERE_API_KEY = 'zbc0Wp2fOBVGaVgH7W2rVJ0YV0XiQOiwLc6oe9F89PY';
  //
  // const MapScreen = ({navigation}) => {
  //     const [origin, setOrigin] = useState({ title: '', latitude: null, longitude: null });
  //     const [destination, setDestination] = useState({ title: '', latitude: null, longitude: null });
  //     const [suggestions, setSuggestions] = useState([]);
  //     const [selectedField, setSelectedField] = useState('');
  //     const [routeCoords, setRouteCoords] = useState([]);
  //     const [routeDetails, setRouteDetails] = useState([]);
  //     const [loading, setLoading] = useState(false);
  //     const [isMapReady, setIsMapReady] = useState(false);
  //     const [selectedRouteIndex, setSelectedRouteIndex] = useState(null); // State for selected route
  //     const [showTopFields, setShowTopFields] = useState(true); // State to toggle top fields visibility
  //     const [showRouteDetails, setShowRouteDetails] = useState(false); // New container for route details
  //     const [selectedRouteDetails, setSelectedRouteDetails] = useState(null);
  //     const [isModalVisible, setModalVisible] = useState(false); // State to control modal visibility
  //
  //
  //
  //     const mapRef = useRef(null);
  //
  //     const fetchSuggestions = async (query) => {
  //         if (!query.trim()) {
  //             setSuggestions([]);
  //             return;
  //         }
  //
  //         const latitude = 37.7749; // Example user location
  //         const longitude = -122.4194; // Example user location
  //         const url = `https://autosuggest.search.hereapi.com/v1/autosuggest?q=${encodeURIComponent(
  //             query
  //         )}&at=${latitude},${longitude}&apiKey=${HERE_API_KEY}&limit=5`;
  //
  //         try {
  //             const response = await axios.get(url);
  //             setSuggestions(response.data.items || []);
  //         } catch (error) {
  //             console.error('Error fetching suggestions:', error);
  //             Alert.alert('Error', 'Failed to fetch location suggestions.');
  //         }
  //     };
  //
  //     const handleSelectLocation = (item) => {
  //         const location = {
  //             latitude: item.position.lat,
  //             longitude: item.position.lng,
  //             title: item.title,
  //         };
  //
  //         if (selectedField === 'origin') {
  //             setOrigin(location);
  //         } else if (selectedField === 'destination') {
  //             setDestination(location);
  //         }
  //         setSuggestions([]);
  //     };
  //
  //     const findRoute = async () => {
  //       alert("KKKK")
  //         if (!origin.latitude || !destination.latitude) {
  //             Alert.alert('Missing Data', 'Please set both origin and destination locations.');
  //             return;
  //         }
  //         setLoading(true);
  //         try {
  //             const url = `https://graphhopper.com/api/1/route?point=${origin.latitude},${origin.longitude}&point=${destination.latitude},${destination.longitude}&vehicle=car&key=3bf6b28b-27c0-4559-b5ce-60ba16e252d0&instructions=true&algorithm=alternative_route`;
  //             const response = await axios.get(url);
  //
  //             if (response.data.paths?.length > 0) {
  //                 const routes = response.data.paths.slice(0, 3).map((route, index) => ({
  //                     coords: decodePolyline(route.points),
  //                     distance: (route.distance / 1000).toFixed(2), // Convert to km
  //                     crimeScore: Math.floor(Math.random() * 10) + 1, // Simulated data
  //                     proximityScore: Math.floor(Math.random() * 10) + 1, // Simulated data
  //                     label: `Route ${index + 1}`,
  //                 }));
  //
  //                 setRouteCoords(routes.map((route) => route.coords));
  //                 setRouteDetails(routes);
  //             } else {
  //                 Alert.alert('Route Error', 'No routes found.');
  //             }
  //         } catch (error) {
  //             console.error('Error fetching routes:', error);
  //             Alert.alert('Error', 'Failed to fetch routes.');
  //         } finally {
  //             setLoading(false);
  //         }
  //     };
  //
  //     const decodePolyline = (encoded) => {
  //         const coords = [];
  //         let index = 0,
  //             lat = 0,
  //             lng = 0;
  //
  //         while (index < encoded.length) {
  //             let b, shift = 0,
  //                 result = 0;
  //
  //             do {
  //                 b = encoded.charCodeAt(index++) - 63;
  //                 result |= (b & 0x1f) << shift;
  //                 shift += 5;
  //             } while (b >= 0x20);
  //
  //             const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
  //             lat += deltaLat;
  //
  //             shift = 0;
  //             result = 0;
  //
  //             do {
  //                 b = encoded.charCodeAt(index++) - 63;
  //                 result |= (b & 0x1f) << shift;
  //                 shift += 5;
  //             } while (b >= 0x20);
  //
  //             const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
  //             lng += deltaLng;
  //
  //             coords.push({
  //                 latitude: lat / 1e5,
  //                 longitude: lng / 1e5,
  //             });
  //         }
  //
  //         return coords;
  //     };
  //
  //     const getRouteColors = (routeDetails) => {
  //         if (!routeDetails || routeDetails.length === 0) return [];
  //
  //         // Sort the routes by crimeScore in ascending order
  //         const sortedRoutes = [...routeDetails].sort((a, b) => a.crimeScore - b.crimeScore);
  //
  //         // Assign colors based on sorted order
  //         sortedRoutes[0].color = 'green'; // Safest route
  //         if (sortedRoutes.length > 1) sortedRoutes[1].color = 'orange'; // Moderately safe
  //         if (sortedRoutes.length > 2) sortedRoutes[2].color = 'red'; // Least safe
  //
  //         // Return the sorted array with assigned colors
  //         return routeDetails.map((route) => {
  //             const foundRoute = sortedRoutes.find(r => r.crimeScore === route.crimeScore);
  //             return { ...route, color: foundRoute.color };
  //         });
  //     };
  //
  //     // const handleRouteSelection = (route) => {
  //     //     setSelectedRouteDetails(route); // Store route details
  //         // setSelectedRouteIndex(route.index); // Highlight the selected route
  //     // };
  //
  //         const handleRouteSelection = (route) => {
  //             setSelectedRouteDetails(route);
  //             setSelectedRouteIndex(route.index); // Highlight the selected route
  //             setShowTopFields(false); // Hide top fields when route is selected
  //             setShowRouteDetails(true); // Show route details container
  //         };
  //         const doo = () => {
  //           alert("APIs Invalid")
  //         }
  //     return (
  //         <View style={styles.container}>
  //         {/* Top Fields and Find Route Button */}
  //         {showTopFields && (
  //             <View style={styles.topContainer}>
  //                 <TextInput
  //                     style={styles.input}
  //                     placeholder="Enter origin"
  //                     value={origin.title}
  //                     onFocus={() => setSelectedField('origin')}
  //                     onChangeText={(text) => {
  //                         setOrigin({ ...origin, title: text });
  //                         fetchSuggestions(text);
  //                     }}
  //                 />
  //                 <TextInput
  //                     style={styles.input}
  //                     placeholder="Enter destination"
  //                     value={destination.title}
  //                     onFocus={() => setSelectedField('destination')}
  //                     onChangeText={(text) => {
  //                         setDestination({ ...destination, title: text });
  //                         fetchSuggestions(text);
  //                     }}
  //                 />
  //                 <TouchableOpacity style={styles.findRouteButton} onPress={findRoute}>
  //                     {loading ? (
  //                         <ActivityIndicator size="small" color="black" />
  //                     ) : (
  //                         <Text style={styles.findRouteButtonText}>Find Route</Text>
  //                     )}
  //                 </TouchableOpacity>
  //             </View>
  //         )}
  //         {showRouteDetails && selectedRouteDetails && (
  //             <View style={styles.routeDetailsContainer}>
  //
  //                 <Text style={styles.routeDetailText}>
  //                     Route Name: {selectedRouteDetails.label || 'Unnamed Route'}
  //                 </Text>
  //                 <Text style={styles.routeDetailText}>
  //                     Distance: {selectedRouteDetails.distance || 'N/A'} km
  //                 </Text>
  //                 <Text style={styles.routeDetailText}>
  //                     Estimated Time: {selectedRouteDetails.estimatedTime || 'N/A'} mins
  //                 </Text>
  //                 <Text style={styles.routeDetailText}>
  //                     Safety Score: {selectedRouteDetails.crimeScore || 'N/A'}
  //                 </Text>
  //             </View>
  //         )}
  //
  //
  //         <MapView
  //
  //             style={styles.map}
  //             // provider={'OSM'}  // Use null to avoid Google Maps and use OpenStreetMap by default
  //
  //             initialRegion={{
  //                 latitude: origin.latitude || 37.78825,
  //                 longitude: origin.longitude || -122.4324,
  //                 latitudeDelta: 0.0922,
  //                 longitudeDelta: 0.0421,
  //             }}
  //         >
  //             {/* Show origin and destination markers */}
  //             {origin.latitude && <Marker coordinate={origin} />}
  //             {destination.latitude && <Marker coordinate={destination} />}
  //
  //             {/* Calculate route colors dynamically */}
  //             {(() => {
  //                 const coloredRoutes = getRouteColors(routeDetails); // Add colors to routes
  //                 return selectedRouteIndex === null
  //                     ? routeCoords.map((coords, idx) => (
  //                           <Polyline
  //                               key={idx}
  //                               coordinates={coords}
  //                               strokeColor={coloredRoutes[idx].color} // Use dynamic color
  //                               strokeWidth={5}
  //                           />
  //                       ))
  //                     : (
  //                           <Polyline
  //                               coordinates={routeCoords[selectedRouteIndex]}
  //                               strokeColor={coloredRoutes[selectedRouteIndex].color} // Use selected route's color
  //                               strokeWidth={5}
  //                           />
  //                       );
  //             })()}
  //         </MapView>
  //
  //
  //             {selectedRouteDetails && (
  //                 <View style={styles.routeDetailsContainer}>
  //                   <View style={styles.rr}>
  //
  //                               <TouchableOpacity
  //                                   style={styles.clearSelectionButton}
  //                                   onPress={() => {
  //                                     console.log("Close button pressed");
  //                                     setSelectedRouteDetails(null);
  //                                     setShowRouteDetails(false);
  //                                     setSelectedRouteIndex(null);
  //                                     setShowTopFields(true); // Hide top fields when a route is selected
  //                                   }} // Reset to show all routes
  //                               >
  //                               <Ionicons name="close" size={30} color="#fff" />
  //
  //                               </TouchableOpacity>
  //                     <Text style={[styles.routeDetailTextHead,{color: selectedRouteDetails.color} ]}>
  //                         {selectedRouteDetails.label || 'Unnamed Route'}
  //                     </Text>
  //                     </View>
  //                     <Text style={styles.routeDetailText}>
  //                         Distance: {selectedRouteDetails.distance || 'N/A'} km
  //                     </Text>
  //                     <Text style={styles.routeDetailText}>
  //                         Crime Score: {selectedRouteDetails.crimeScore || 'N/A'} / 10
  //                         <Ionicons name="cloudy" size={15} color="#fff" style={styles.iconn} />
  //
  //                     </Text>
  //                     <Text style={styles.routeDetailText}>
  //                         Proximity Score: {selectedRouteDetails.proximityScore || 'N/A'} / 10
  //                     </Text>
  //                     <TouchableOpacity style={styles.findRouteButtonSN} onPress={doo}>
  //                         {loading ? (
  //                             <ActivityIndicator size="small" color="#fff" />
  //                         ) : (
  //                             <Text style={styles.findRouteButtonTextSN}>Start Navigation</Text>
  //                         )}
  //                     </TouchableOpacity>
  //                 </View>
  //             )}
  //
  //             // Replace getColor with inline logic using getRouteColors
  //             <View style={styles.routeCardsContainer}>
  //                 {(() => {
  //                     const coloredRoutes = getRouteColors(routeDetails); // Get the routes with colors
  //                     return coloredRoutes.map((route, idx) => (
  //                         <TouchableOpacity
  //                             key={idx}
  //                             style={styles.routeCard}
  //                             onPress={() => {
  //                                 setSelectedRouteIndex(idx); // Highlight selected route
  //                                 setShowTopFields(false); // Hide top fields when a route is selected
  //                                 setShowRouteDetails(true);
  //                                 setSelectedRouteDetails(route);
  //                             }}
  //                         >
  //                             <Text style={[styles.routeLabel, { color: route.color }]}>
  //                                 {route.label}
  //                             </Text>
  //                             <Text style={styles.routeText}>Distance: {route.distance} km</Text>
  //                             <Text style={styles.routeText}>Proximity Score: {route.proximityScore}</Text>
  //                             <Text style={styles.routeText}>Crime Score: {route.crimeScore}</Text>
  //                         </TouchableOpacity>
  //                     ));
  //                 })()}
  //             </View>``
  //
  //             {/* Suggestions List */}
  //             {suggestions.length > 0 && (
  //                 <View style={styles.suggestionsContainer}>
  //                     <FlatList
  //                         data={suggestions}
  //                         keyExtractor={(item, index) => index.toString()}
  //                         renderItem={({ item }) => (
  //                             <TouchableOpacity onPress={() => handleSelectLocation(item)} style={styles.suggestionItem}>
  //                                 <Text style={styles.suggestionText}>{item.title}</Text>
  //                             </TouchableOpacity>
  //                         )}
  //                     />
  //                 </View>
  //             )}
  //
  //             {/* Bottom Navigation */}
  //             <View style={styles.bottomNav}>
  //                 <TouchableOpacity style={styles.navButton}>
  //                     <Ionicons name="home" size={30} color="#fff" />
  //                     <Text style={styles.navButtonText}>Home</Text>
  //                 </TouchableOpacity>
  //                 <TouchableOpacity
  //                 style={styles.navButton}
  //                 onPress={() => navigation.navigate('Profile')} // Navigate to ProfileScreen
  //
  //                 >
  //                     <Ionicons name="person-circle" size={30} color="#fff" />
  //                     <Text style={styles.navButtonText}>Profile</Text>
  //                 </TouchableOpacity>
  //             </View>
  //         </View>
  //     );
  // };
  //
  // const styles = StyleSheet.create({
  //     container: {
  //         flex: 1,
  //         justifyContent: 'flex-start',
  //         alignItems: 'stretch',
  //         backgroundColor: '#fff',
  //     },
  //     topContainer: {
  //         padding: 10,
  //         backgroundColor: '#5E17EB',
  //         width: '100%',
  //         paddingTop:50
  //     },
  //     input: {
  //         height: 45,
  //         borderColor: '#fff',
  //         borderWidth: 1,
  //         marginBottom: 5,
  //         paddingLeft: 10,
  //         borderRadius: 10,
  //         backgroundColor: '#fff',
  //     },
  //     findRouteButton: {
  //         backgroundColor: '#fff',
  //         paddingVertical: 15,
  //         borderRadius: 10,
  //         alignItems: 'center',
  //     },
  //     findRouteButtonSN: {
  //         backgroundColor: 'black',
  //         paddingVertical: 15,
  //         marginTop:5,
  //         borderRadius: 10,
  //         alignItems: 'center',
  //     },
  //     findRouteButtonTextSN: {
  //         color: '#fff',
  //         fontSize: 18,
  //         fontWeight: 'bold',
  //     },
  //     findRouteButtonText: {
  //         color: 'black',
  //         fontSize: 18,
  //         fontWeight: 'bold',
  //     },
  //     map: {
  //         height: '100%',
  //     },
  //     routeCardsContainer: {
  //         position: 'absolute',
  //         bottom: 80,
  //         width: '70%',
  //         paddingHorizontal: 5,
  //         flex:1,
  //         flexDirection:'row',
  //
  //
  //     },
  //     routeCard: {
  //         padding: 5,
  //         marginBottom: 10,
  //         borderRadius: 10,
  //         marginLeft:7,
  //         backgroundColor: '#fff',
  //         shadowColor: '#000',
  //         shadowOffset: { width: 0, height: 4 },
  //         shadowOpacity: 0.3,
  //         shadowRadius: 5,
  //         elevation: 5,
  //     },
  //     routeLabel: {
  //         fontSize: 14,
  //         fontWeight: 'bold',
  //     },
  //     routeText: {
  //         fontSize: 10,
  //         marginTop: 1,
  //     },
  //     bottomNav: {
  //         flexDirection: 'row',
  //         justifyContent: 'space-around',
  //         alignItems: 'center',
  //         backgroundColor: '#5E17EB',
  //         padding: 5,
  //         position: 'absolute',
  //         bottom: 0,
  //         width: '100%',
  //     },
  //     navButton: {
  //         alignItems: 'center',
  //     },
  //     navButtonText: {
  //         color: '#fff',
  //         marginTop: 5,
  //         fontSize: 14,
  //     },
  //     suggestionsContainer: {
  //         position: 'absolute',
  //         top: '35%',
  //         width: '90%',
  //         alignSelf: 'center',
  //         backgroundColor: 'white',
  //         zIndex: 1,
  //         borderRadius: 10,
  //         elevation: 5,
  //     },
  //     suggestionItem: {
  //         padding: 10,
  //         borderBottomWidth: 1,
  //         borderBottomColor: '#ccc',
  //     },
  //     suggestionText: {
  //         fontSize: 16,
  //     },
  //
  //   routeDetailsContainer: {
  //       padding: 10,
  //       margin: 0,
  //       backgroundColor: '#f5f5f5',
  //       position:'absolute',
  //       borderBottomLeftRadius: 20, // bottom-left corner radius
  //       borderBottomRightRadius: 20, // bottom-right corner radius
  //       width:'100%',
  //       elevation: 3,
  //       backgroundColor: '#5E17EB',
  //
  //   },
  //   routeDetailText: {
  //       // fontSize: 16,
  //       marginBottom: 5,
  //       color: '#fff',
  //       fontSize: 14,
  //       fontWeight: 'bold',
  //
  //
  //   },
  //   routeDetailTextHead: {
  //       // fontSize: 16,
  //       marginBottom: 0,
  //       // color: '#333',
  //       fontSize: 14,
  //       fontWeight: 'bold',
  //       backgroundColor:'#fff',
  //       padding:3,
  //       borderRadius:6,
  //       marginLeft:"69%",
  //
  //
  //
  //   },
  //   rr:{
  //     flex:1,
  //     flexDirection:'row',
  //     marginTop:20,
  //     alignItems:"center",
  //     marginBottom:10,
  //     backgroundColor:"#5E17EB"
  //
  //   },
  //   iconn:{
  //   }
  // });
  //
  // export default MapScreen;
