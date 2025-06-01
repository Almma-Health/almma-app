import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import MenuButton from "../components/MenuButton";

const UserProfilePage = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dietaryPreferences: ["Vegetarian", "Gluten-Free"],
    profileImage: "https://via.placeholder.com/150",
  });

  const [editProfile, setEditProfile] = useState({ ...profile });

  const handleSave = () => {
    setProfile(editProfile);
    setIsEditing(false);
    Alert.alert("Success", "Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditProfile(profile);
    setIsEditing(false);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigateTo = (page) => {
    setMenuVisible(false);
    navigation.navigate(page);
  };

  const renderMenuOption = ({ item }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => navigateTo(item.page)}
    >
      <Ionicons name={item.icon} size={24} color="#444" style={styles.menuIcon} />
      <Text style={styles.menuText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const menuOptions = [
    { id: 'profile', title: 'My Profile', icon: 'person-outline', page: 'UserProfile' },
    { id: 'security', title: 'Security Settings', icon: 'shield-outline', page: 'Security' },
    { id: 'reviews', title: 'Restaurant Reviews', icon: 'restaurant-outline', page: 'RestaurantReviews' },
    { id: 'help', title: 'Help & Contact', icon: 'help-circle-outline', page: 'HelpContact' },
  ];

  const ProfileField = ({ label, value, onChange, editable }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {editable ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChange}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
    </View>
  );

  const DietaryPreferenceTag = ({ preference }) => (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{preference}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <MenuButton onPress={toggleMenu} />
      </View>

      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Menu</Text>
              <TouchableOpacity onPress={() => setMenuVisible(false)}>
                <Ionicons name="close" size={24} color="#444" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={menuOptions}
              renderItem={renderMenuOption}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.menuList}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <ScrollView style={styles.contentContainer}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: profile.profileImage }}
              style={styles.profileImage}
            />
            {isEditing && (
              <TouchableOpacity style={styles.editImageButton}>
                <Ionicons name="camera" size={24} color="white" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.profileName}>{profile.name}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <ProfileField
            label="Name"
            value={isEditing ? editProfile.name : profile.name}
            onChange={(text) => setEditProfile({ ...editProfile, name: text })}
            editable={isEditing}
          />
          <ProfileField
            label="Email"
            value={isEditing ? editProfile.email : profile.email}
            onChange={(text) => setEditProfile({ ...editProfile, email: text })}
            editable={isEditing}
          />
          <ProfileField
            label="Phone"
            value={isEditing ? editProfile.phone : profile.phone}
            onChange={(text) => setEditProfile({ ...editProfile, phone: text })}
            editable={isEditing}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dietary Preferences</Text>
          <View style={styles.tagsContainer}>
            {profile.dietaryPreferences.map((preference, index) => (
              <DietaryPreferenceTag key={index} preference={preference} />
            ))}
          </View>
          {isEditing && (
            <TouchableOpacity style={styles.addPreferenceButton}>
              <Ionicons name="add-circle" size={24} color="#007AFF" />
              <Text style={styles.addPreferenceText}>Add Preference</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.buttonContainer}>
          {isEditing ? (
            <>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={[styles.buttonText, styles.cancelButtonText]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={[styles.button, styles.editButton]}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    top: 43,
  },
  logoContainer: {
    position: "absolute",
    top: 43,
    left: "50%",
    transform: [{ translateX: -71.5 }],
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginTop: 100,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#007AFF",
    borderRadius: 20,
    padding: 8,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  fieldContainer: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  fieldValue: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  tag: {
    backgroundColor: "#E5E5E5",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: "#333",
    fontSize: 14,
  },
  addPreferenceButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  addPreferenceText: {
    color: "#007AFF",
    marginLeft: 8,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: "#007AFF",
  },
  saveButton: {
    backgroundColor: "#007AFF",
  },
  cancelButton: {
    backgroundColor: "#E5E5E5",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButtonText: {
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
  },
  menuContainer: {
    width: 300,
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    height: '100%',
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuList: {
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
  },
});

export default UserProfilePage; 