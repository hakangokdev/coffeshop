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

// Sample payment methods data
const paymentMethodsData = [
  {
    id: '1',
    type: 'credit_card' as const,
    cardNumber: '**** **** **** 1234',
    cardHolder: 'AHMET KAYA',
    expiryDate: '12/26',
    cardType: 'visa' as const,
    isDefault: true,
    lastUsed: '2 gün önce'
  },
  {
    id: '2',
    type: 'credit_card' as const,
    cardNumber: '**** **** **** 5678',
    cardHolder: 'AHMET KAYA',
    expiryDate: '08/25',
    cardType: 'mastercard' as const,
    isDefault: false,
    lastUsed: '1 hafta önce'
  },
  {
    id: '3',
    type: 'mobile_payment' as const,
    name: 'Apple Pay',
    icon: 'phone-iphone',
    isDefault: false,
    lastUsed: '3 gün önce'
  },
  {
    id: '4',
    type: 'mobile_payment' as const,
    name: 'Google Pay',
    icon: 'payment',
    isDefault: false,
    lastUsed: 'Hiç kullanılmadı'
  }
];

export default function PaymentMethodsScreen() {
  const [paymentMethods, setPaymentMethods] = useState(paymentMethodsData);

  const getCardTypeIcon = (cardType: string) => {
    switch (cardType) {
      case 'visa':
        return { icon: 'credit-card', color: '#1A1F71' };
      case 'mastercard':
        return { icon: 'credit-card', color: '#EB001B' };
      default:
        return { icon: 'credit-card', color: '#8B8B8B' };
    }
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
    Alert.alert('Başarılı', 'Varsayılan ödeme yöntemi güncellendi.');
  };

  const handleDeletePaymentMethod = (id: string, name: string) => {
    Alert.alert(
      'Ödeme Yöntemini Sil',
      `${name} ödeme yöntemini silmek istediğinize emin misiniz?`,
      [
        {
          text: 'İptal',
          style: 'cancel'
        },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            setPaymentMethods(prev => prev.filter(method => method.id !== id));
          }
        }
      ]
    );
  };

  const handleAddCard = () => {
    console.log('Add new card');
    // Navigate to add card page
  };

  const handleEditCard = (id: string) => {
    console.log('Edit card:', id);
    // Navigate to edit card page
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
          
          <Text style={styles.headerTitle}>Ödeme Yöntemleri</Text>
          
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddCard}
            activeOpacity={0.8}
          >
            <MaterialIcons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Add New Card Section */}
        <View style={styles.addCardSection}>
          <TouchableOpacity
            style={styles.addCardButton}
            onPress={handleAddCard}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#C67C4E', '#A85A3A']}
              style={styles.addCardGradient}
            >
              <MaterialIcons name="add-circle" size={24} color="#FFFFFF" />
              <Text style={styles.addCardText}>Yeni Kart Ekle</Text>
              <MaterialIcons name="chevron-right" size={20} color="rgba(255,255,255,0.8)" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Payment Methods List */}
        <View style={styles.methodsSection}>
          <Text style={styles.sectionTitle}>
            Kayıtlı Ödeme Yöntemleri ({paymentMethods.length})
          </Text>
          
          {paymentMethods.map((method) => (
            <View key={method.id} style={styles.methodCard}>
              {method.type === 'credit_card' ? (
                // Credit Card Layout
                <>
                  <View style={styles.cardHeader}>
                    <View style={styles.cardIconContainer}>
                      <MaterialIcons 
                        name={getCardTypeIcon(method.cardType || 'visa').icon as any} 
                        size={24} 
                        color={getCardTypeIcon(method.cardType || 'visa').color} 
                      />
                    </View>
                    
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardNumber}>{method.cardNumber}</Text>
                      <Text style={styles.cardHolder}>{method.cardHolder}</Text>
                    </View>
                    
                    {method.isDefault && (
                      <View style={styles.defaultBadge}>
                        <MaterialIcons name="star" size={14} color="#C67C4E" />
                        <Text style={styles.defaultText}>Varsayılan</Text>
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.cardDetails}>
                    <Text style={styles.expiryLabel}>Son Kullanma:</Text>
                    <Text style={styles.expiryDate}>{method.expiryDate}</Text>
                    <Text style={styles.lastUsed}>• {method.lastUsed}</Text>
                  </View>
                  
                  <View style={styles.cardActions}>
                    {!method.isDefault && (
                      <TouchableOpacity
                        style={styles.setDefaultButton}
                        onPress={() => handleSetDefault(method.id)}
                        activeOpacity={0.8}
                      >
                        <MaterialIcons name="star-border" size={16} color="#C67C4E" />
                        <Text style={styles.setDefaultText}>Varsayılan Yap</Text>
                      </TouchableOpacity>
                    )}
                    
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => handleEditCard(method.id)}
                      activeOpacity={0.8}
                    >
                      <MaterialIcons name="edit" size={16} color="#8B8B8B" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeletePaymentMethod(method.id, method.cardNumber || 'Kart')}
                      activeOpacity={0.8}
                    >
                      <MaterialIcons name="delete" size={16} color="#FF6B6B" />
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                // Mobile Payment Layout
                <>
                  <View style={styles.mobileHeader}>
                    <View style={styles.mobileIconContainer}>
                      <MaterialIcons 
                        name={method.icon as any} 
                        size={24} 
                        color="#C67C4E" 
                      />
                    </View>
                    
                    <View style={styles.mobileInfo}>
                      <Text style={styles.mobileName}>{method.name}</Text>
                      <Text style={styles.mobileLastUsed}>{method.lastUsed}</Text>
                    </View>
                    
                    {method.isDefault && (
                      <View style={styles.defaultBadge}>
                        <MaterialIcons name="star" size={14} color="#C67C4E" />
                        <Text style={styles.defaultText}>Varsayılan</Text>
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.mobileActions}>
                    {!method.isDefault && (
                      <TouchableOpacity
                        style={styles.setDefaultButton}
                        onPress={() => handleSetDefault(method.id)}
                        activeOpacity={0.8}
                      >
                        <MaterialIcons name="star-border" size={16} color="#C67C4E" />
                        <Text style={styles.setDefaultText}>Varsayılan Yap</Text>
                      </TouchableOpacity>
                    )}
                    
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeletePaymentMethod(method.id, method.name || 'Ödeme Yöntemi')}
                      activeOpacity={0.8}
                    >
                      <MaterialIcons name="delete" size={16} color="#FF6B6B" />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          ))}
        </View>

        {/* Payment Security Section */}
        <View style={styles.securitySection}>
          <Text style={styles.sectionTitle}>Güvenlik</Text>
          
          <View style={styles.securityCard}>
            <View style={styles.securityHeader}>
              <MaterialIcons name="security" size={24} color="#4CAF50" />
              <Text style={styles.securityTitle}>Güvenli Ödeme</Text>
            </View>
            
            <Text style={styles.securityDescription}>
              Tüm ödeme bilgileriniz 256-bit SSL şifrelemesi ile korunmaktadır. 
              Kart bilgileriniz hiçbir zaman sunucularımızda saklanmaz.
            </Text>
            
            <View style={styles.securityFeatures}>
              <View style={styles.securityFeature}>
                <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
                <Text style={styles.featureText}>SSL Şifreleme</Text>
              </View>
              <View style={styles.securityFeature}>
                <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
                <Text style={styles.featureText}>PCI DSS Uyumlu</Text>
              </View>
              <View style={styles.securityFeature}>
                <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
                <Text style={styles.featureText}>3D Secure</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Empty State */}
        {paymentMethods.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialIcons name="payment" size={80} color="#E3E3E3" />
            <Text style={styles.emptyStateTitle}>Ödeme Yöntemi Yok</Text>
            <Text style={styles.emptyStateText}>
              Hızlı ödeme için kart bilgilerinizi ekleyin
            </Text>
            <TouchableOpacity
              style={styles.addFirstCardButton}
              onPress={handleAddCard}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#C67C4E', '#A85A3A']}
                style={styles.addFirstCardGradient}
              >
                <MaterialIcons name="add-card" size={20} color="#FFFFFF" />
                <Text style={styles.addFirstCardText}>İlk Kartınızı Ekleyin</Text>
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
  addCardSection: {
    padding: 20,
    paddingBottom: 8,
  },
  addCardButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: 'rgba(198, 124, 78, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 6,
  },
  addCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  addCardText: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
    marginLeft: 12,
  },
  methodsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Sora',
    fontSize: 18,
    fontWeight: '700',
    color: '#313131',
    marginBottom: 16,
  },
  methodCard: {
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIconContainer: {
    width: 48,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardNumber: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '700',
    color: '#313131',
    marginBottom: 2,
  },
  cardHolder: {
    fontFamily: 'Sora',
    fontSize: 12,
    color: '#8B8B8B',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  defaultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  defaultText: {
    fontFamily: 'Sora',
    fontSize: 12,
    color: '#C67C4E',
    fontWeight: '600',
  },
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  expiryLabel: {
    fontFamily: 'Sora',
    fontSize: 14,
    color: '#8B8B8B',
    fontWeight: '500',
  },
  expiryDate: {
    fontFamily: 'Sora',
    fontSize: 14,
    color: '#313131',
    fontWeight: '600',
  },
  lastUsed: {
    fontFamily: 'Sora',
    fontSize: 12,
    color: '#A2A2A2',
    fontWeight: '500',
  },
  cardActions: {
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
  mobileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  mobileIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF5F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  mobileInfo: {
    flex: 1,
  },
  mobileName: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '700',
    color: '#313131',
    marginBottom: 2,
  },
  mobileLastUsed: {
    fontFamily: 'Sora',
    fontSize: 12,
    color: '#8B8B8B',
    fontWeight: '500',
  },
  mobileActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  securitySection: {
    padding: 20,
    paddingTop: 8,
  },
  securityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: 'rgba(198, 124, 78, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  securityTitle: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '700',
    color: '#313131',
  },
  securityDescription: {
    fontFamily: 'Sora',
    fontSize: 14,
    color: '#8B8B8B',
    lineHeight: 20,
    marginBottom: 16,
  },
  securityFeatures: {
    gap: 8,
  },
  securityFeature: {
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
  addFirstCardButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  addFirstCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 8,
  },
  addFirstCardText: {
    fontFamily: 'Sora',
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  bottomPadding: {
    height: 30,
  },
}); 