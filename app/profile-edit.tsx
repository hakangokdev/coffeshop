import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  StyleSheet, 
  Alert,
  Image 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Stack } from 'expo-router';

export default function ProfileEditScreen() {
  const [formData, setFormData] = useState({
    firstName: 'Ahmet',
    lastName: 'Kaya',
    email: 'ahmet.kaya@email.com',
    phone: '+90 532 123 45 67',
    address: 'Atatürk Caddesi No:123, Kadıköy',
    city: 'İstanbul',
    birthDate: '15/08/1990'
  });

  const [isChanged, setIsChanged] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setIsChanged(true);
  };

  const handleSave = () => {
    Alert.alert(
      'Profil Güncellendi',
      'Bilgileriniz başarıyla güncellendi.',
      [
        {
          text: 'Tamam',
          onPress: () => router.back()
        }
      ]
    );
  };

  const handleCancel = () => {
    if (isChanged) {
      Alert.alert(
        'Değişiklikleri Kaydetmediniz',
        'Yaptığınız değişiklikler kaybolacak. Emin misiniz?',
        [
          {
            text: 'Kalın',
            style: 'cancel'
          },
          {
            text: 'Çık',
            style: 'destructive',
            onPress: () => router.back()
          }
        ]
      );
    } else {
      router.back();
    }
  };

  const handleImageChange = () => {
    Alert.alert(
      'Profil Fotoğrafı',
      'Fotoğrafınızı değiştirmek istediğinize emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel'
        },
        {
          text: 'Kamera',
          onPress: () => console.log('Camera selected')
        },
        {
          text: 'Galeri',
          onPress: () => console.log('Gallery selected')
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <LinearGradient
        colors={['#C67C4E', '#A85A3A']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleCancel}
            activeOpacity={0.8}
          >
            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Profili Düzenle</Text>
          
          <TouchableOpacity 
            style={[styles.saveHeaderButton, !isChanged && styles.saveHeaderButtonDisabled]}
            onPress={handleSave}
            disabled={!isChanged}
            activeOpacity={0.8}
          >
            <MaterialIcons name="check" size={24} color={isChanged ? "#FFFFFF" : "rgba(255,255,255,0.5)"} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Image Section */}
        <View style={styles.imageSection}>
          <LinearGradient
            colors={['#FDFCFB', '#F9F2ED']}
            style={styles.imageSectionBackground}
          >
            <TouchableOpacity 
              style={styles.avatarContainer}
              onPress={handleImageChange}
              activeOpacity={0.8}
            >
              <View style={styles.avatar}>
                <MaterialIcons name="person" size={50} color="#FFFFFF" />
              </View>
              <View style={styles.editAvatarButton}>
                <MaterialIcons name="camera-alt" size={18} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
            
            <Text style={styles.imageChangeText}>
              Fotoğrafınızı değiştirmek için dokunun
            </Text>
          </LinearGradient>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Kişisel Bilgiler</Text>
          
          {/* First Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Ad</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="person-outline" size={20} color="#A2A2A2" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                value={formData.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
                placeholder="Adınızı girin"
                placeholderTextColor="#A2A2A2"
              />
            </View>
          </View>

          {/* Last Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Soyad</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="person-outline" size={20} color="#A2A2A2" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                value={formData.lastName}
                onChangeText={(value) => handleInputChange('lastName', value)}
                placeholder="Soyadınızı girin"
                placeholderTextColor="#A2A2A2"
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>E-posta</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="email" size={20} color="#A2A2A2" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                placeholder="E-posta adresinizi girin"
                placeholderTextColor="#A2A2A2"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Phone */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Telefon</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="phone" size={20} color="#A2A2A2" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                placeholder="Telefon numaranızı girin"
                placeholderTextColor="#A2A2A2"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Birth Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Doğum Tarihi</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="cake" size={20} color="#A2A2A2" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                value={formData.birthDate}
                onChangeText={(value) => handleInputChange('birthDate', value)}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#A2A2A2"
              />
            </View>
          </View>
        </View>

        {/* Address Section */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Adres Bilgileri</Text>
          
          {/* Address */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Adres</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="location-on" size={20} color="#A2A2A2" style={styles.inputIcon} />
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={formData.address}
                onChangeText={(value) => handleInputChange('address', value)}
                placeholder="Adresinizi girin"
                placeholderTextColor="#A2A2A2"
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          {/* City */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Şehir</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="location-city" size={20} color="#A2A2A2" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                value={formData.city}
                onChangeText={(value) => handleInputChange('city', value)}
                placeholder="Şehrinizi girin"
                placeholderTextColor="#A2A2A2"
              />
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelButtonText}>İptal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.saveButton, !isChanged && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={!isChanged}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={isChanged ? ['#C67C4E', '#A85A3A'] : ['#E3E3E3', '#D0D0D0']}
              style={styles.saveButtonGradient}
            >
              <MaterialIcons 
                name="save" 
                size={20} 
                color={isChanged ? "#FFFFFF" : "#A2A2A2"} 
              />
              <Text style={[
                styles.saveButtonText,
                !isChanged && styles.saveButtonTextDisabled
              ]}>
                Kaydet
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F2ED',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    shadowColor: '#C67C4E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Sora',
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 16,
  },
  saveHeaderButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveHeaderButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  scrollView: {
    flex: 1,
  },
  imageSection: {
    marginBottom: 20,
  },
  imageSectionBackground: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#C67C4E',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#C67C4E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#A85A3A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  imageChangeText: {
    fontFamily: 'Sora',
    fontSize: 14,
    color: '#8B8B8B',
    textAlign: 'center',
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    padding: 24,
    shadowColor: 'rgba(198, 124, 78, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  sectionTitle: {
    fontFamily: 'Sora',
    fontSize: 18,
    fontWeight: '700',
    color: '#313131',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: 'Sora',
    fontSize: 14,
    fontWeight: '600',
    color: '#313131',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  inputIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  textInput: {
    flex: 1,
    fontFamily: 'Sora',
    fontSize: 16,
    color: '#313131',
    padding: 0,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  actionSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: '#E3E3E3',
  },
  cancelButtonText: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '600',
    color: '#8B8B8B',
  },
  saveButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  saveButtonText: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  saveButtonTextDisabled: {
    color: '#A2A2A2',
  },
  bottomPadding: {
    height: 30,
  },
}); 