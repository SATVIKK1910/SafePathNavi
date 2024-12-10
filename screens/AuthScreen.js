// // AuthScreen.js
// import React, { useState } from 'react';
// import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
// import { auth } from '../firebaseConfig.js';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// import * as Google from 'expo-auth-session/providers/google';
//
// const AuthScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSignup, setIsSignup] = useState(true);
//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//     clientId: '651369739698-d8ks70htpqhvdmdqoi14ous78gjmjl4j.apps.googleusercontent.com',
//   });
//
//   const handleSubmit = async () => {
//     try {
//       if (isSignup) {
//         await createUserWithEmailAndPassword(auth, email, password);
//       } else {
//         await signInWithEmailAndPassword(auth, email, password);
//       }
//       navigation.navigate('Map'); // Navigate to your Map screen after successful auth
//     } catch (error) {
//       console.error(error);
//     }
//   };
//
//   const handleGoogleSignIn = async () => {
//     const result = await promptAsync();
//     if (result?.type === 'success') {
//       const { id_token } = result.params;
//       // Implement Google Sign-In logic here using id_token
//     }
//   };
//
//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button title={isSignup ? "Sign Up" : "Log In"} onPress={handleSubmit} />
//       <Button title={`Switch to ${isSignup ? "Log In" : "Sign Up"}`} onPress={() => setIsSignup(!isSignup)} />
//       <Button title="Sign In with Google" onPress={handleGoogleSignIn} disabled={!request} />
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 15,
//     paddingLeft: 10,
//   },
// });
//
// export default AuthScreen;


// New CODE --------------------------------------------------------------------------------------------
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { auth } from '../firebaseConfig.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
} from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';

const AuthScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      '651369739698-d8ks70htpqhvdmdqoi14ous78gjmjl4j.apps.googleusercontent.com',
  });

  const handleSubmit = async () => {
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigation.navigate('Map');
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await promptAsync();
    if (result?.type === 'success') {
      const { id_token } = result.params;
      const credential = GoogleAuthProvider.credential(id_token);

      try {
        await signInWithCredential(auth, credential);
        navigation.navigate('Map');
      } catch (error) {
        console.error('Google Sign-In error:', error.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require('../assets/login.png')}
          style={styles.logo}
        />
        <Text style={styles.headerText}>
          {isSignup ? 'Create an Account' : 'Welcome Back!'}
        </Text>
        <Text style={styles.subHeaderText}>
          {isSignup
            ? 'Sign up to start your safe journey from here.'
            : 'Login to continue your safe journey.'}
        </Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            {isSignup ? 'Sign Up' : 'Log In'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.switchText}>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <Text
            style={styles.switchLink}
            onPress={() => setIsSignup(!isSignup)}
          >
            {isSignup ? 'Log In' : 'Sign Up'}
          </Text>
        </Text>
        <Text style={styles.orText}>OR</Text>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
          disabled={!request}
        >
          <Image
            source={require('../assets/google.png')}
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Sign In with Google</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#5E17EB',
  },
  logo: {
    width: 171,
    height: 178,
    alignSelf: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeaderText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
    marginVertical: 5,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#0C3CFB',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchText: {
    color: '#B3A5FF',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
  switchLink: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  orText: {
    color: '#B8B8B8',
    textAlign: 'center',
    marginVertical: 15,
    fontSize: 16,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#393939',
    fontSize: 16,
  },
});

export default AuthScreen;
