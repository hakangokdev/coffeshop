import React, { useState } from 'react';
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

// FAQ Data
const faqData = [
  {
    id: '1',
    question: 'Siparişim ne zaman gelir?',
    answer: 'Siparişleriniz ortalama 25-35 dakika içinde teslimat adresinize ulaşır. Teslimat durumunu uygulama üzerinden takip edebilirsiniz.'
  },
  {
    id: '2',
    question: 'Minimum sipariş tutarı var mı?',
    answer: 'Evet, minimum sipariş tutarı 50₺\'dir. Bu tutar altındaki siparişler için 15₺ ek teslimat ücreti uygulanır.'
  },
  {
    id: '3',
    question: 'Ödeme yöntemleri nelerdir?',
    answer: 'Kredi kartı, banka kartı, nakit ödeme, Apple Pay ve Google Pay ile ödeme yapabilirsiniz. Tüm ödemeler güvenli SSL ile şifrelenir.'
  },
  {
    id: '4',
    question: 'Siparişimi iptal edebilir miyim?',
    answer: 'Henüz hazırlanmaya başlanmamış siparişleri uygulama üzerinden iptal edebilirsiniz. Hazırlanan siparişler için müşteri hizmetlerini arayın.'
  },
  {
    id: '5',
    question: 'Promosyon kodları nasıl kullanılır?',
    answer: 'Sepet sayfasında "Promosyon Kodu" alanına kodunuzu girin ve "Uygula" butonuna basın. İndirim otomatik olarak hesaplanacaktır.'
  }
];

export default function HelpSupportScreen() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleContactMethod = (method: string, contact: string) => {
    switch (method) {
      case 'phone':
        Linking.openURL(`tel:${contact}`);
        break;
      case 'email':
        Linking.openURL(`mailto:${contact}`);
        break;
      case 'whatsapp':
        Linking.openURL(`whatsapp://send?phone=${contact}`);
        break;
      case 'chat':
        Alert.alert('Canlı Sohbet', 'Canlı sohbet özelliği yakında aktif olacak!');
        break;
      default:
        break;
    }
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
          
          <Text style={styles.headerTitle}>Yardım & Destek</Text>
          
          <View style={styles.headerSpacer} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Quick Contact */}
        <View style={styles.quickContactSection}>
          <Text style={styles.sectionTitle}>Hızlı İletişim</Text>
          
          <View style={styles.contactGrid}>
            <TouchableOpacity
              style={styles.contactCard}
              onPress={() => handleContactMethod('phone', '+902121234567')}
              activeOpacity={0.8}
            >
              <View style={[styles.contactIcon, { backgroundColor: '#E8F5E8' }]}>
                <MaterialIcons name="phone" size={24} color="#4CAF50" />
              </View>
              <Text style={styles.contactTitle}>Telefon</Text>
              <Text style={styles.contactSubtitle}>7/24 Destek</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactCard}
              onPress={() => handleContactMethod('whatsapp', '+905551234567')}
              activeOpacity={0.8}
            >
              <View style={[styles.contactIcon, { backgroundColor: '#E8F5E8' }]}>
                <MaterialIcons name="chat" size={24} color="#25D366" />
              </View>
              <Text style={styles.contactTitle}>WhatsApp</Text>
              <Text style={styles.contactSubtitle}>Hızlı Yanıt</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactCard}
              onPress={() => handleContactMethod('email', 'destek@coffeeshop.com')}
              activeOpacity={0.8}
            >
              <View style={[styles.contactIcon, { backgroundColor: '#E3F2FD' }]}>
                <MaterialIcons name="email" size={24} color="#2196F3" />
              </View>
              <Text style={styles.contactTitle}>E-posta</Text>
              <Text style={styles.contactSubtitle}>24 saat içinde</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactCard}
              onPress={() => handleContactMethod('chat', '')}
              activeOpacity={0.8}
            >
              <View style={[styles.contactIcon, { backgroundColor: '#FFF3E0' }]}>
                <MaterialIcons name="support-agent" size={24} color="#FF9800" />
              </View>
              <Text style={styles.contactTitle}>Canlı Sohbet</Text>
              <Text style={styles.contactSubtitle}>Yakında</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Sık Sorulan Sorular</Text>
          
          <View style={styles.faqContainer}>
            {faqData.map((faq, index) => (
              <TouchableOpacity
                key={faq.id}
                style={[
                  styles.faqItem,
                  expandedFaq === faq.id && styles.expandedFaqItem,
                  index === faqData.length - 1 && styles.lastFaqItem
                ]}
                onPress={() => toggleFaq(faq.id)}
                activeOpacity={0.8}
              >
                <View style={styles.faqHeader}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <MaterialIcons 
                    name={expandedFaq === faq.id ? "expand-less" : "expand-more"} 
                    size={24} 
                    color="#C67C4E" 
                  />
                </View>
                
                {expandedFaq === faq.id && (
                  <View style={styles.faqAnswerContainer}>
                    <Text style={styles.faqAnswer}>{faq.answer}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.contactInfoSection}>
          <Text style={styles.sectionTitle}>İletişim Bilgileri</Text>
          
          <View style={styles.contactInfoCard}>
            <View style={styles.contactInfoItem}>
              <MaterialIcons name="location-on" size={20} color="#C67C4E" />
              <View style={styles.contactInfoText}>
                <Text style={styles.contactInfoTitle}>Adres</Text>
                <Text style={styles.contactInfoSubtitle}>
                  Atatürk Mahallesi, Kahve Sokak No:1{'\n'}
                  Beşiktaş / İstanbul
                </Text>
              </View>
            </View>

            <View style={styles.contactInfoItem}>
              <MaterialIcons name="access-time" size={20} color="#C67C4E" />
              <View style={styles.contactInfoText}>
                <Text style={styles.contactInfoTitle}>Çalışma Saatleri</Text>
                <Text style={styles.contactInfoSubtitle}>
                  Pazartesi - Pazar: 06:00 - 24:00{'\n'}
                  Destek: 7/24 Aktif
                </Text>
              </View>
            </View>
          </View>
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
  quickContactSection: {
    padding: 20,
    paddingBottom: 8,
  },
  faqSection: {
    padding: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  contactInfoSection: {
    padding: 20,
    paddingTop: 8,
  },
  sectionTitle: {
    fontFamily: 'Sora',
    fontSize: 18,
    fontWeight: '700',
    color: '#313131',
    marginBottom: 16,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  contactCard: {
    flex: 1,
    minWidth: '46%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: 'rgba(198, 124, 78, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactTitle: {
    fontFamily: 'Sora',
    fontSize: 14,
    fontWeight: '600',
    color: '#313131',
    marginBottom: 4,
  },
  contactSubtitle: {
    fontFamily: 'Sora',
    fontSize: 12,
    color: '#8B8B8B',
    textAlign: 'center',
  },
  faqContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 4,
    shadowColor: 'rgba(198, 124, 78, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  faqItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  lastFaqItem: {
    borderBottomWidth: 0,
  },
  expandedFaqItem: {
    backgroundColor: '#FFF9F5',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQuestion: {
    fontFamily: 'Sora',
    fontSize: 15,
    fontWeight: '600',
    color: '#313131',
    flex: 1,
    marginRight: 12,
  },
  faqAnswerContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  faqAnswer: {
    fontFamily: 'Sora',
    fontSize: 14,
    color: '#8B8B8B',
    lineHeight: 20,
  },
  contactInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: 'rgba(198, 124, 78, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
    gap: 20,
  },
  contactInfoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  contactInfoText: {
    flex: 1,
  },
  contactInfoTitle: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '600',
    color: '#313131',
    marginBottom: 4,
  },
  contactInfoSubtitle: {
    fontFamily: 'Sora',
    fontSize: 14,
    color: '#8B8B8B',
    lineHeight: 20,
  },
  bottomPadding: {
    height: 100,
  },
});
