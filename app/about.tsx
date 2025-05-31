import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  StyleSheet,
  Linking,
  Alert 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Stack } from 'expo-router';

export default function AboutScreen() {
  const handleSocialLink = (platform: string, url: string) => {
    if (url) {
      Linking.openURL(url);
    } else {
      Alert.alert('Bilgi', `${platform} sayfamız yakında aktif olacak!`);
    }
  };

  const handleLink = (type: string) => {
    Alert.alert('Bilgi', `${type} sayfası yakında aktif olacak!`);
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
          
          <Text style={styles.headerTitle}>Hakkında</Text>
          
          <View style={styles.headerSpacer} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* App Info */}
        <View style={styles.appInfoSection}>
          <View style={styles.appLogoContainer}>
            <View style={styles.appLogo}>
              <MaterialIcons name="local-cafe" size={60} color="#FFFFFF" />
            </View>
            <Text style={styles.appName}>Coffee Shop</Text>
            <Text style={styles.appSlogan}>Lezzet, kalite ve hızın buluştuğu nokta</Text>
          </View>
        </View>

        {/* App Details */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Uygulama Bilgileri</Text>
          
          <View style={styles.detailsCard}>
            <View style={styles.detailItem}>
              <MaterialIcons name="info" size={20} color="#C67C4E" />
              <View style={styles.detailText}>
                <Text style={styles.detailTitle}>Versiyon</Text>
                <Text style={styles.detailSubtitle}>1.0.0 (Build 2025.01.01)</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <MaterialIcons name="update" size={20} color="#C67C4E" />
              <View style={styles.detailText}>
                <Text style={styles.detailTitle}>Son Güncelleme</Text>
                <Text style={styles.detailSubtitle}>1 Ocak 2025</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <MaterialIcons name="storage" size={20} color="#C67C4E" />
              <View style={styles.detailText}>
                <Text style={styles.detailTitle}>Uygulama Boyutu</Text>
                <Text style={styles.detailSubtitle}>25.4 MB</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <MaterialIcons name="devices" size={20} color="#C67C4E" />
              <View style={styles.detailText}>
                <Text style={styles.detailTitle}>Platform</Text>
                <Text style={styles.detailSubtitle}>iOS & Android</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Company Info */}
        <View style={styles.companySection}>
          <Text style={styles.sectionTitle}>Şirket Bilgileri</Text>
          
          <View style={styles.companyCard}>
            <View style={styles.companyHeader}>
              <MaterialIcons name="business" size={24} color="#C67C4E" />
              <Text style={styles.companyName}>Coffee Shop Ltd. Şti.</Text>
            </View>
            
            <Text style={styles.companyDescription}>
              2020 yılından beri kaliteli kahve deneyimi sunan Coffee Shop, 
              teknoloji ve lezzeti birleştirerek müşterilerimize en iyi hizmeti 
              vermeyi hedefliyor. Hızlı teslimat, taze ürünler ve müşteri 
              memnuniyeti önceliğimizdir.
            </Text>

            <View style={styles.companyDetails}>
              <View style={styles.companyDetailItem}>
                <MaterialIcons name="location-on" size={16} color="#8B8B8B" />
                <Text style={styles.companyDetailText}>İstanbul, Türkiye</Text>
              </View>
              <View style={styles.companyDetailItem}>
                <MaterialIcons name="calendar-today" size={16} color="#8B8B8B" />
                <Text style={styles.companyDetailText}>Kuruluş: 2020</Text>
              </View>
              <View style={styles.companyDetailItem}>
                <MaterialIcons name="group" size={16} color="#8B8B8B" />
                <Text style={styles.companyDetailText}>50+ Çalışan</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Social Media */}
        <View style={styles.socialSection}>
          <Text style={styles.sectionTitle}>Sosyal Medya</Text>
          
          <View style={styles.socialGrid}>
            <TouchableOpacity
              style={styles.socialCard}
              onPress={() => handleSocialLink('Instagram', '')}
              activeOpacity={0.8}
            >
              <View style={[styles.socialIcon, { backgroundColor: '#FCE4EC' }]}>
                <MaterialIcons name="camera-alt" size={24} color="#E91E63" />
              </View>
              <Text style={styles.socialTitle}>Instagram</Text>
              <Text style={styles.socialHandle}>@coffeeshop</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialCard}
              onPress={() => handleSocialLink('Facebook', '')}
              activeOpacity={0.8}
            >
              <View style={[styles.socialIcon, { backgroundColor: '#E3F2FD' }]}>
                <MaterialIcons name="facebook" size={24} color="#1976D2" />
              </View>
              <Text style={styles.socialTitle}>Facebook</Text>
              <Text style={styles.socialHandle}>Coffee Shop</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialCard}
              onPress={() => handleSocialLink('Twitter', '')}
              activeOpacity={0.8}
            >
              <View style={[styles.socialIcon, { backgroundColor: '#E8F5E8' }]}>
                <MaterialIcons name="alternate-email" size={24} color="#388E3C" />
              </View>
              <Text style={styles.socialTitle}>Twitter</Text>
              <Text style={styles.socialHandle}>@coffeeshop_tr</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialCard}
              onPress={() => handleSocialLink('YouTube', '')}
              activeOpacity={0.8}
            >
              <View style={[styles.socialIcon, { backgroundColor: '#FFEBEE' }]}>
                <MaterialIcons name="play-arrow" size={24} color="#D32F2F" />
              </View>
              <Text style={styles.socialTitle}>YouTube</Text>
              <Text style={styles.socialHandle}>Coffee Shop</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Legal Links */}
        <View style={styles.legalSection}>
          <Text style={styles.sectionTitle}>Yasal Belgeler</Text>
          
          <View style={styles.legalCard}>
            <TouchableOpacity
              style={styles.legalItem}
              onPress={() => handleLink('Kullanım Koşulları')}
              activeOpacity={0.8}
            >
              <MaterialIcons name="description" size={20} color="#C67C4E" />
              <Text style={styles.legalTitle}>Kullanım Koşulları</Text>
              <MaterialIcons name="chevron-right" size={20} color="#E3E3E3" />
            </TouchableOpacity>

            <View style={styles.legalDivider} />

            <TouchableOpacity
              style={styles.legalItem}
              onPress={() => handleLink('Gizlilik Politikası')}
              activeOpacity={0.8}
            >
              <MaterialIcons name="privacy-tip" size={20} color="#C67C4E" />
              <Text style={styles.legalTitle}>Gizlilik Politikası</Text>
              <MaterialIcons name="chevron-right" size={20} color="#E3E3E3" />
            </TouchableOpacity>

            <View style={styles.legalDivider} />

            <TouchableOpacity
              style={styles.legalItem}
              onPress={() => handleLink('Çerez Politikası')}
              activeOpacity={0.8}
            >
              <MaterialIcons name="cookie" size={20} color="#C67C4E" />
              <Text style={styles.legalTitle}>Çerez Politikası</Text>
              <MaterialIcons name="chevron-right" size={20} color="#E3E3E3" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerSection}>
          <Text style={styles.copyrightText}>
            © 2025 Coffee Shop Ltd. Şti.{'\n'}
            Tüm hakları saklıdır.
          </Text>
          <Text style={styles.madeWithText}>
            ❤️ ile İstanbul'da yapıldı
          </Text>
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
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  appInfoSection: {
    padding: 20,
    paddingBottom: 8,
  },
  detailsSection: {
    padding: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  companySection: {
    padding: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  socialSection: {
    padding: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  legalSection: {
    padding: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  footerSection: {
    padding: 20,
    paddingTop: 8,
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Sora',
    fontSize: 18,
    fontWeight: '700',
    color: '#313131',
    marginBottom: 16,
  },
  appLogoContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    shadowColor: 'rgba(198, 124, 78, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  appLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#C67C4E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#C67C4E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  appName: {
    fontFamily: 'Sora',
    fontSize: 24,
    fontWeight: '700',
    color: '#313131',
    marginBottom: 8,
  },
  appSlogan: {
    fontFamily: 'Sora',
    fontSize: 14,
    color: '#8B8B8B',
    textAlign: 'center',
    lineHeight: 20,
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: 'rgba(198, 124, 78, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailText: {
    flex: 1,
  },
  detailTitle: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '600',
    color: '#313131',
    marginBottom: 2,
  },
  detailSubtitle: {
    fontFamily: 'Sora',
    fontSize: 14,
    color: '#8B8B8B',
  },
  companyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: 'rgba(198, 124, 78, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  companyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  companyName: {
    fontFamily: 'Sora',
    fontSize: 18,
    fontWeight: '700',
    color: '#313131',
  },
  companyDescription: {
    fontFamily: 'Sora',
    fontSize: 14,
    color: '#8B8B8B',
    lineHeight: 20,
    marginBottom: 16,
  },
  companyDetails: {
    gap: 8,
  },
  companyDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  companyDetailText: {
    fontFamily: 'Sora',
    fontSize: 13,
    color: '#8B8B8B',
  },
  socialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  socialCard: {
    flex: 1,
    minWidth: '46%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: 'rgba(198, 124, 78, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  socialIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  socialTitle: {
    fontFamily: 'Sora',
    fontSize: 14,
    fontWeight: '600',
    color: '#313131',
    marginBottom: 4,
  },
  socialHandle: {
    fontFamily: 'Sora',
    fontSize: 12,
    color: '#8B8B8B',
  },
  legalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 4,
    shadowColor: 'rgba(198, 124, 78, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  legalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  legalTitle: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '600',
    color: '#313131',
    flex: 1,
  },
  legalDivider: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 20,
  },
  copyrightText: {
    fontFamily: 'Sora',
    fontSize: 12,
    color: '#A2A2A2',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 8,
  },
  madeWithText: {
    fontFamily: 'Sora',
    fontSize: 12,
    color: '#C67C4E',
    textAlign: 'center',
    fontWeight: '600',
  },
  bottomPadding: {
    height: 30,
  },
}); 