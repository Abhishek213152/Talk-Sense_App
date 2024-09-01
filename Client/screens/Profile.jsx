import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {auth} from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {clearEmail} from '../EmailReducer';
import {
  setProfilePicture,
  clearProfilePicture,
} from '../ProfilePictureReducer'; 

const Profile = ({navigation}) => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const email = useSelector(state => state.email.email);
  const profilePictureUri = useSelector(state => state.profilePicture.uri); // 
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const savedPhotoUri = await AsyncStorage.getItem('profilePhoto');
        if (savedPhotoUri) {
          dispatch(setProfilePicture(savedPhotoUri));
          setProfilePhoto(savedPhotoUri);
        }
      } catch (error) {
        console.error('Failed to load profile data:', error);
      }
    };

    loadProfileData();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      await AsyncStorage.clear(); 
      dispatch(clearEmail()); 
      dispatch(clearProfilePicture()); 
      navigation.replace('login'); 
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const pickImage = () => {
    launchImageLibrary({}, async response => {
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setProfilePhoto(uri);
        dispatch(setProfilePicture(uri)); 
        await AsyncStorage.setItem('profilePhoto', uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TouchableOpacity onPress={pickImage} style={styles.photoContainer}>
        {profilePhoto ? (
          <Image source={{uri: profilePhoto}} style={styles.profilePhoto} />
        ) : (
          <Text style={styles.photoPlaceholder}>Add Photo</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.email}>{email}</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  photoPlaceholder: {
    color: '#fff',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#ff5252',
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Profile;
