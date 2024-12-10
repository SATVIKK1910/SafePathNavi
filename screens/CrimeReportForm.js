import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { firestore, auth } from '../firebaseConfig'; // Import firestore and auth from the updated config
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions

const CrimeReportForm = () => {
  const [crimeType, setCrimeType] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isCrimeTypeModalVisible, setCrimeTypeModalVisible] = useState(false);
  const [isTimeModalVisible, setTimeModalVisible] = useState(false);

  const crimeTypes = ['Murder', 'Rape', 'Eve Teasing', 'Robbery', 'Kidnapping'];
  const times = ['Day', 'Night'];

  const submitReport = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert('You need to be logged in to submit a report.');
      return;
    }

    if (!crimeType || !time || !location) {
      alert('Please fill all mandatory fields.');
      return;
    }

    const report = {
      userId: user.uid,
      crimeType,
      time,
      location,
      description,
      submittedAt: new Date(),
    };

    try {
      // Use Firestore's collection method to add a document to 'crimeReports'
      await addDoc(collection(firestore, 'crimeReports'), report);
      alert('Report submitted successfully.');
      setCrimeType('');
      setTime('');
      setLocation('');
      setDescription('');
    } catch (error) {
      alert('Error submitting report: ' + error.message);
    }
  };

  const renderDropdown = (data, onSelect, setModalVisible) => (
    <FlatList
      data={data}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.dropdownItem}
          onPress={() => {
            onSelect(item);
            setModalVisible(false);
          }}
        >
          <Text style={styles.dropdownText}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Crime Report Form</Text>

      {/* Custom Crime Type Picker */}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setCrimeTypeModalVisible(true)}
      >
        <Text style={styles.dropdownLabel}>
          {crimeType || 'Select Crime Type'}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={isCrimeTypeModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Crime Type</Text>
            {renderDropdown(crimeTypes, setCrimeType, setCrimeTypeModalVisible)}
          </View>
        </View>
      </Modal>

      {/* Custom Time Picker */}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setTimeModalVisible(true)}
      >
        <Text style={styles.dropdownLabel}>{time || 'Select Time'}</Text>
      </TouchableOpacity>
      <Modal
        visible={isTimeModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Time</Text>
            {renderDropdown(times, setTime, setTimeModalVisible)}
          </View>
        </View>
      </Modal>

      {/* Location Input */}
      <TextInput
        placeholder="Enter Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />

      {/* Description Input */}
      <TextInput
        placeholder="Enter Description (Optional)"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.textArea]}
        multiline
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={submitReport}>
        <Text style={styles.buttonText}>Submit Report</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    height: 50,
    justifyContent: 'center',
  },
  dropdownLabel: { color: '#666' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    height: 50,
  },
  textArea: { height: 100 },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 5,
    padding: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownText: { fontSize: 16 },
});

export default CrimeReportForm;
