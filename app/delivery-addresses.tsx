import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  StyleSheet, 
  Alert 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Stack } from 'expo-router';

// Sample delivery addresses data
const deliveryAddressesData = [
  {
    id: '1',
    title: 'Ev',
    type: 'home' as const,
    address: 'Atatürk Caddesi No:123, Daire:5',
    district: 'Kadıköy',
    city: 'İstanbul',
    phone: '+90 535 123 45 67',
    instructions: 'Kapıcıya bırakabilirsiniz',
    isDefault: true,
    lastUsed: '2 gün önce'
  },
  {
    id: '2',
    title: 'İş Yeri',
    type: 'work' as const,
    address: 'Maslak Mahallesi, Büyükdere Caddesi No:245',
    district: 'Sarıyer',
    city: 'İstanbul',
    phone: '+90 212 345 67 89',
    instructions: 'Resepsiyona teslim edilebilir',
    isDefault: false,
    lastUsed: '5 gün önce'
  },
  {
    id: '3',
    title: 'Annemin Evi',
    type: 'other' as const,
    address: 'Bağdat Caddesi No:78, Kat:3',
    district: 'Kadıköy',
    city: 'İstanbul',
    phone: '+90 216 456 78 90',
    instructions: 'Zil çalmadan önce arayın',
    isDefault: false,
    lastUsed: '2 hafta önce'
  }
];

export default function DeliveryAddressesScreen() {
  const [addresses, setAddresses] = useState(deliveryAddressesData);

  const getAddressTypeInfo = (type: string) => {
    switch (type) {
      case 'home':
        return {
          icon: 'home',
          color: '#4CAF50',
          backgroundColor: '#E8F5E8'
        };
      case 'work':
        return {
          icon: 'business',
          color: '#2196F3',
          backgroundColor: '#E3F2FD'
        };
      case 'other':
        return {
          icon: 'location-on',
          color: '#FF9800',
          backgroundColor: '#FFF3E0'
        };
      default:
        return {
          icon: 'location-on',
          color: '#8B8B8B',
          backgroundColor: '#F5F5F5'
        };
    }
  };

  const handleSetDefault = (id: string) => {
    setAddresses(prev => 
      prev.map(address => ({
        ...address,
        isDefault: address.id === id
      }))
    );
    Alert.alert('Başarılı', 'Varsayılan teslimat adresi güncellendi.');
  };

  const handleDeleteAddress = (id: string, title: string) => {
    Alert.alert(
      'Adresi Sil',
      `${title} adresini silmek istediğinize emin misiniz?`,
      [
        {
          text: 'İptal',
          style: 'cancel'
        },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            setAddresses(prev => prev.filter(address => address.id !== id));
          }
        }
      ]
    );
  };

  const handleAddAddress = () => {
    console.log('Add new address');
    // Navigate to add address page
  };

  const handleEditAddress = (id: string) => {
    console.log('Edit address:', id);
    // Navigate to edit address page
  };

  const handleSelectAddress = (id: string) => {
    // For order flow - select address and go back
    console.log('Selected address:', id);
    router.back();
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
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Teslimat Adresleri</Text>
          
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddAddress}
            activeOpacity={0.8}
          >
            <MaterialIcons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Add New Address Section */}
        <View style={styles.addAddressSection}>
          <TouchableOpacity
            style={styles.addAddressButton}
            onPress={handleAddAddress}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#C67C4E', '#A85A3A']}
              style={styles.addAddressGradient}
            >
              <MaterialIcons name="add-location" size={24} color="#FFFFFF" />
              <Text style={styles.addAddressText}>Yeni Adres Ekle</Text>
              <MaterialIcons name="chevron-right" size={20} color="rgba(255,255,255,0.8)" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Addresses List */}
        <View style={styles.addressesSection}>
          <Text style={styles.sectionTitle}>
            Kayıtlı Adresler ({addresses.length})
          </Text>
          
          {addresses.map((address) => {
            const typeInfo = getAddressTypeInfo(address.type);
            
            return (
              <View key={address.id} style={styles.addressCard}>
                {/* Address Header */}
                <View style={styles.addressHeader}>
                  <View style={styles.addressTitleContainer}>
                    <View style={[styles.typeIconContainer, { backgroundColor: typeInfo.backgroundColor }]}>
                      <MaterialIcons 
                        name={typeInfo.icon as any} 
                        size={20} 
                        color={typeInfo.color} 
                      />
                    </View>
                    
                    <View style={styles.addressTitleInfo}>
                      <Text style={styles.addressTitle}>{address.title}</Text>
                      {address.isDefault && (
                        <View style={styles.defaultBadge}>
                          <MaterialIcons name="star" size={12} color="#C67C4E" />
                          <Text style={styles.defaultText}>Varsayılan</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  
                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => handleSelectAddress(address.id)}
                    activeOpacity={0.8}
                  >
                    <MaterialIcons name="check-circle" size={20} color="#C67C4E" />
                  </TouchableOpacity>
                </View>

                {/* Address Details */}
                <View style={styles.addressDetails}>
                  <View style={styles.addressRow}>
                    <MaterialIcons name="location-on" size={16} color="#8B8B8B" />
                    <Text style={styles.addressText}>
                      {address.address}
                    </Text>
                  </View>
                  
                  <View style={styles.addressRow}>
                    <MaterialIcons name="place" size={16} color="#8B8B8B" />
                    <Text style={styles.addressText}>
                      {address.district}, {address.city}
                    </Text>
                  </View>
                  
                  <View style={styles.addressRow}>
                    <MaterialIcons name="phone" size={16} color="#8B8B8B" />
                    <Text style={styles.addressText}>
                      {address.phone}
                    </Text>
                  </View>
                  
                  {address.instructions && (
                    <View style={styles.instructionsContainer}>
                      <MaterialIcons name="info" size={16} color="#FF9800" />
                      <Text style={styles.instructionsText}>
                        {address.instructions}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Address Meta */}
                <View style={styles.addressMeta}>
                  <Text style={styles.lastUsedText}>
                    Son kullanım: {address.lastUsed}
                  </Text>
                </View>

                {/* Address Actions */}
                <View style={styles.addressActions}>
                  {!address.isDefault && (
                    <TouchableOpacity
                      style={styles.setDefaultButton}
                      onPress={() => handleSetDefault(address.id)}
                      activeOpacity={0.8}
                    >
                      <MaterialIcons name="star-border" size={16} color="#C67C4E" />
                      <Text style={styles.setDefaultText}>Varsayılan Yap</Text>
                    </TouchableOpacity>
                  )}
                  
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleEditAddress(address.id)}
                    activeOpacity={0.8}
                  >
                    <MaterialIcons name="edit" size={16} color="#8B8B8B" />
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteAddress(address.id, address.title)}
                    activeOpacity={0.8}
                  >
                    <MaterialIcons name="delete" size={16} color="#FF6B6B" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        {/* Delivery Info Section */}
        <View style={styles.deliveryInfoSection}>
          <Text style={styles.sectionTitle}>Teslimat Bilgisi</Text>
          
          <View style={styles.deliveryInfoCard}>
            <View style={styles.deliveryInfoHeader}>
              <MaterialIcons name="local-shipping" size={24} color="#4CAF50" />
              <Text style={styles.deliveryInfoTitle}>Hızlı Teslimat</Text>
            </View>
            
            <Text style={styles.deliveryInfoDescription}>
              Siparişiniz ortalama 25-35 dakika içinde kapınızda olacak. 
              Teslimat alanımızda yer alan tüm adresler için ücretsiz teslimat hizmeti.
            </Text>
            
            <View style={styles.deliveryFeatures}>
              <View style={styles.deliveryFeature}>
                <MaterialIcons name="access-time" size={16} color="#4CAF50" />
                <Text style={styles.featureText}>25-35 Dakika</Text>
              </View>
              <View style={styles.deliveryFeature}>
                <MaterialIcons name="local-shipping" size={16} color="#4CAF50" />
                <Text style={styles.featureText}>Ücretsiz Teslimat</Text>
              </View>
              <View style={styles.deliveryFeature}>
                <MaterialIcons name="phone" size={16} color="#4CAF50" />
                <Text style={styles.featureText}>Telefon Desteği</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Empty State */}
        {addresses.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialIcons name="location-off" size={80} color="#E3E3E3" />
            <Text style={styles.emptyStateTitle}>Kayıtlı Adres Yok</Text>
            <Text style={styles.emptyStateText}>
              Hızlı teslimat için adreslerinizi ekleyin
            </Text>
            <TouchableOpacity
              style={styles.addFirstAddressButton}
              onPress={handleAddAddress}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#C67C4E', '#A85A3A']}
                style={styles.addFirstAddressGradient}
              >
                <MaterialIcons name="add-location" size={20} color="#FFFFFF" />
                <Text style={styles.addFirstAddressText}>İlk Adresinizi Ekleyin</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  addAddressSection: {
    padding: 20,
    paddingBottom: 8,
  },
  addAddressButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: 'rgba(198, 124, 78, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 6,
  },
  addAddressGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  addAddressText: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
    marginLeft: 12,
  },
  addressesSection: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Sora',
    fontSize: 18,
    fontWeight: '700',
    color: '#313131',
    marginBottom: 16,
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: 'rgba(198, 124, 78, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  addressTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addressTitleInfo: {
    flex: 1,
  },
  addressTitle: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '700',
    color: '#313131',
    marginBottom: 2,
  },
  defaultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    gap: 4,
    alignSelf: 'flex-start',
  },
  defaultText: {
    fontFamily: 'Sora',
    fontSize: 10,
    color: '#C67C4E',
    fontWeight: '600',
  },
  selectButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF5F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressDetails: {
    marginBottom: 12,
    gap: 8,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  addressText: {
    fontFamily: 'Sora',
    fontSize: 14,
    color: '#313131',
    fontWeight: '500',
    flex: 1,
    lineHeight: 20,
  },
  instructionsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#FFF9E6',
    padding: 12,
    borderRadius: 12,
    marginTop: 4,
  },
  instructionsText: {
    fontFamily: 'Sora',
    fontSize: 13,
    color: '#E65100',
    fontWeight: '500',
    flex: 1,
    lineHeight: 18,
  },
  addressMeta: {
    marginBottom: 16,
  },
  lastUsedText: {
    fontFamily: 'Sora',
    fontSize: 12,
    color: '#A2A2A2',
    fontWeight: '500',
  },
  addressActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  setDefaultButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
    flex: 1,
  },
  setDefaultText: {
    fontFamily: 'Sora',
    fontSize: 13,
    color: '#C67C4E',
    fontWeight: '600',
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryInfoSection: {
    padding: 20,
    paddingTop: 8,
  },
  deliveryInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: 'rgba(198, 124, 78, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  deliveryInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  deliveryInfoTitle: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '700',
    color: '#313131',
  },
  deliveryInfoDescription: {
    fontFamily: 'Sora',
    fontSize: 14,
    color: '#8B8B8B',
    lineHeight: 20,
    marginBottom: 16,
  },
  deliveryFeatures: {
    gap: 8,
  },
  deliveryFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontFamily: 'Sora',
    fontSize: 14,
    color: '#313131',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontFamily: 'Sora',
    fontSize: 20,
    fontWeight: '700',
    color: '#313131',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyStateText: {
    fontFamily: 'Sora',
    fontSize: 14,
    color: '#8B8B8B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  addFirstAddressButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  addFirstAddressGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 8,
  },
  addFirstAddressText: {
    fontFamily: 'Sora',
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  bottomPadding: {
    height: 30,
  },
}); 