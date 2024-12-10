import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, Image, Text, TouchableOpacity, View, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Ensure proper Ionicons import
import { firestore, auth } from '../firebaseConfig'; // Import firestore and auth from the firebase config
import { collection, query, where, getDocs } from 'firebase/firestore'; // Firestore functions

const styles = {
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#5E17EB',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 10, // Ensures it's above other elements
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    marginTop: 4,
    fontSize: 14,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5E17EB",
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingTop: 40,
    marginBottom: 10,
  },
  profileImage: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerText: {
    color: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 19,
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#000000",
    borderRadius: 15,
    paddingVertical: 12,
    marginBottom: 20,
    marginHorizontal: 14,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 19,
  },
  sectionTitle: {
    color: "#000000",
    fontSize: 19,
    marginBottom: 10,
    marginLeft: 17,
  },
  notFoundText: {
    color: "#000000",
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
  reportItem: {
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  reportText: {
    fontSize: 16,
    color: "#333",
  },
  scrollContent: {
    paddingBottom: 100, // Ensure space for the bottom navigation
  },
};

export default function ProfilePage({ navigation }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(
          collection(firestore, "crimeReports"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const reportsData = querySnapshot.docs.map(doc => doc.data());
        setReports(reportsData);
      }
    };

    fetchReports();
  }, []);

  const handleSubmitReport = () => {
    navigation.navigate('CrimeReportForm');
  };

  const renderReport = ({ item }) => (
    <View style={styles.reportItem}>
      <Text style={[styles.reportText, { fontWeight: 'bold' }]}>Crime Type: {item.crimeType}</Text>
      <Text style={[styles.reportText, { fontWeight: 'bold' }]}>Location: {item.location}</Text>
      <Text style={[styles.reportText, { fontWeight: 'bold' }]}>Time: {item.time}</Text>
      <Text style={[styles.reportText, { fontWeight: 'bold' }]}>Description: {item.description || 'No description provided'}</Text>
    </View>
  );


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png",
            }}
            resizeMode={"stretch"}
            style={styles.profileImage}
          />
          <View style={styles.headerTextContainer}>
            <Text style={[styles.headerText, styles.headerTitle]}>Hello, User</Text>
            <Text style={[styles.headerText, styles.headerSubtitle]}>Welcome to your profile</Text>
          </View>
        </View>

        {/* Submit Crime Report Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmitReport}>
          <Text style={styles.buttonText}>Submit Crime Report</Text>
        </TouchableOpacity>

        {/* Crime Reports Section */}
        <Text style={styles.sectionTitle}>Your Crime Reports</Text>
        {reports.length === 0 ? (
          <Text style={styles.notFoundText}>NOT FOUND</Text>
        ) : (
          <FlatList
            data={reports}
            renderItem={renderReport}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Map')} // Navigate to Map
        >
          <Ionicons name="home" size={30} color="#fff" />
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
        >
          <Ionicons name="person-circle" size={30} color="#fff" />
          <Text style={styles.navButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
