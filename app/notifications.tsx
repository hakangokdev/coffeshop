import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  StyleSheet, 
  Switch,
  Alert 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Stack } from 'expo-router';

// Sample notification settings data
const initialNotificationSettings = {
  orderUpdates: true,
  promotions: true,
  newMenuItems: false,
  deliveryNotifications: true,
  paymentConfirmations: true,
  securityAlerts: true,
  weeklyDigest: false,
  pushNotifications: true,
  emailNotifications: true,
  smsNotifications: false
};

// Sample notification history data
const notificationHistoryData = [
  {
    id: '1',
    type: 'order' as const,
    title: 'Siparişiniz Hazırlanıyor',
    message: '#2024001 numaralı siparişiniz mutfakta hazırlanmaya başlandı.',
    time: '15 dakika önce',
    read: false
  },
  {
    id: '2',
    type: 'promotion' as const,
    title: 'Özel İndirim!',
    message: 'Sadece bugün geçerli %25 indirim fırsatını kaçırmayın!',
    time: '2 saat önce',
    read: true
  },
  {
    id: '3',
    type: 'delivery' as const,
    title: 'Siparişiniz Teslim Edildi',
    message: '#2024000 numaralı siparişiniz başarıyla teslim edilmiştir.',
    time: '1 gün önce',
    read: true
  },
  {
    id: '4',
    type: 'security' as const,
    title: 'Güvenlik Bildirimi',
    message: 'Hesabınıza yeni bir cihazdan giriş yapıldı.',
    time: '2 gün önce',
    read: true
  }
];

export default function NotificationsScreen() {
  const [settings, setSettings] = useState(initialNotificationSettings);
  const [notificationHistory, setNotificationHistory] = useState(notificationHistoryData);

  const getNotificationTypeInfo = (type: string) => {
    switch (type) {
      case 'order':
        return {
          icon: 'shopping-bag',
          color: '#4CAF50',
          backgroundColor: '#E8F5E8'
        };
      case 'promotion':
        return {
          icon: 'local-offer',
          color: '#FF9800',
          backgroundColor: '#FFF3E0'
        };
      case 'delivery':
        return {
          icon: 'local-shipping',
          color: '#2196F3',
          backgroundColor: '#E3F2FD'
        };
      case 'security':
        return {
          icon: 'security',
          color: '#F44336',
          backgroundColor: '#FFEBEE'
        };
      default:
        return {
          icon: 'notifications',
          color: '#8B8B8B',
          backgroundColor: '#F5F5F5'
        };
    }
  };

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleMarkAllAsRead = () => {
    setNotificationHistory(prev => 
      prev.map(notification => ({
        ...notification,
        read: true
      }))
    );
    Alert.alert('Başarılı', 'Tüm bildirimler okundu olarak işaretlendi.');
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Bildirimleri Temizle',
      'Tüm bildirim geçmişini silmek istediğinize emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel'
        },
        {
          text: 'Temizle',
          style: 'destructive',
          onPress: () => {
            setNotificationHistory([]);
          }
        }
      ]
    );
  };

  const handleNotificationPress = (id: string) => {
    setNotificationHistory(prev =>
      prev.map(notification =>
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const unreadCount = notificationHistory.filter(n => !n.read).length;

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
          
          <Text style={styles.headerTitle}>Bildirimler</Text>
          
          <TouchableOpacity 
            style={styles.markAllButton}
            onPress={handleMarkAllAsRead}
            activeOpacity={0.8}
          >
            <MaterialIcons name="done-all" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Notification Settings Section */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Bildirim Ayarları</Text>
          
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialIcons name="shopping-bag" size={20} color="#4CAF50" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Sipariş Güncellemeleri</Text>
                  <Text style={styles.settingDescription}>Sipariş durumu hakkında bildirim alın</Text>
                </View>
              </View>
              <Switch
                value={settings.orderUpdates}
                onValueChange={() => handleToggle('orderUpdates')}
                trackColor={{ false: '#E3E3E3', true: '#C67C4E' }}
                thumbColor={settings.orderUpdates ? '#FFFFFF' : '#FFFFFF'}
                ios_backgroundColor="#E3E3E3"
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialIcons name="local-offer" size={20} color="#FF9800" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Promosyonlar</Text>
                  <Text style={styles.settingDescription}>Özel teklifler ve indirimler</Text>
                </View>
              </View>
              <Switch
                value={settings.promotions}
                onValueChange={() => handleToggle('promotions')}
                trackColor={{ false: '#E3E3E3', true: '#C67C4E' }}
                thumbColor={settings.promotions ? '#FFFFFF' : '#FFFFFF'}
                ios_backgroundColor="#E3E3E3"
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialIcons name="restaurant-menu" size={20} color="#9C27B0" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Yeni Menü Öğeleri</Text>
                  <Text style={styles.settingDescription}>Yeni ürünler hakkında bilgi alın</Text>
                </View>
              </View>
              <Switch
                value={settings.newMenuItems}
                onValueChange={() => handleToggle('newMenuItems')}
                trackColor={{ false: '#E3E3E3', true: '#C67C4E' }}
                thumbColor={settings.newMenuItems ? '#FFFFFF' : '#FFFFFF'}
                ios_backgroundColor="#E3E3E3"
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialIcons name="local-shipping" size={20} color="#2196F3" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Teslimat Bildirimleri</Text>
                  <Text style={styles.settingDescription}>Teslimat durumu güncellemeleri</Text>
                </View>
              </View>
              <Switch
                value={settings.deliveryNotifications}
                onValueChange={() => handleToggle('deliveryNotifications')}
                trackColor={{ false: '#E3E3E3', true: '#C67C4E' }}
                thumbColor={settings.deliveryNotifications ? '#FFFFFF' : '#FFFFFF'}
                ios_backgroundColor="#E3E3E3"
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialIcons name="payment" size={20} color="#4CAF50" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Ödeme Onayları</Text>
                  <Text style={styles.settingDescription}>Ödeme işlemleri hakkında bildirim</Text>
                </View>
              </View>
              <Switch
                value={settings.paymentConfirmations}
                onValueChange={() => handleToggle('paymentConfirmations')}
                trackColor={{ false: '#E3E3E3', true: '#C67C4E' }}
                thumbColor={settings.paymentConfirmations ? '#FFFFFF' : '#FFFFFF'}
                ios_backgroundColor="#E3E3E3"
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialIcons name="security" size={20} color="#F44336" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Güvenlik Uyarıları</Text>
                  <Text style={styles.settingDescription}>Hesap güvenliği bildirimleri</Text>
                </View>
              </View>
              <Switch
                value={settings.securityAlerts}
                onValueChange={() => handleToggle('securityAlerts')}
                trackColor={{ false: '#E3E3E3', true: '#C67C4E' }}
                thumbColor={settings.securityAlerts ? '#FFFFFF' : '#FFFFFF'}
                ios_backgroundColor="#E3E3E3"
              />
            </View>

            <View style={[styles.settingItem, styles.lastSettingItem]}>
              <View style={styles.settingInfo}>
                <MaterialIcons name="email" size={20} color="#673AB7" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Haftalık Özet</Text>
                  <Text style={styles.settingDescription}>Haftalık aktivite raporu</Text>
                </View>
              </View>
              <Switch
                value={settings.weeklyDigest}
                onValueChange={() => handleToggle('weeklyDigest')}
                trackColor={{ false: '#E3E3E3', true: '#C67C4E' }}
                thumbColor={settings.weeklyDigest ? '#FFFFFF' : '#FFFFFF'}
                ios_backgroundColor="#E3E3E3"
              />
            </View>
          </View>
        </View>

        {/* Communication Preferences */}
        <View style={styles.communicationSection}>
          <Text style={styles.sectionTitle}>İletişim Tercihleri</Text>
          
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialIcons name="phone-iphone" size={20} color="#C67C4E" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Push Bildirimleri</Text>
                  <Text style={styles.settingDescription}>Mobil uygulama bildirimleri</Text>
                </View>
              </View>
              <Switch
                value={settings.pushNotifications}
                onValueChange={() => handleToggle('pushNotifications')}
                trackColor={{ false: '#E3E3E3', true: '#C67C4E' }}
                thumbColor={settings.pushNotifications ? '#FFFFFF' : '#FFFFFF'}
                ios_backgroundColor="#E3E3E3"
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialIcons name="email" size={20} color="#2196F3" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>E-posta Bildirimleri</Text>
                  <Text style={styles.settingDescription}>E-posta ile bildirim alın</Text>
                </View>
              </View>
              <Switch
                value={settings.emailNotifications}
                onValueChange={() => handleToggle('emailNotifications')}
                trackColor={{ false: '#E3E3E3', true: '#C67C4E' }}
                thumbColor={settings.emailNotifications ? '#FFFFFF' : '#FFFFFF'}
                ios_backgroundColor="#E3E3E3"
              />
            </View>

            <View style={[styles.settingItem, styles.lastSettingItem]}>
              <View style={styles.settingInfo}>
                <MaterialIcons name="sms" size={20} color="#4CAF50" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>SMS Bildirimleri</Text>
                  <Text style={styles.settingDescription}>Kısa mesaj ile bildirim</Text>
                </View>
              </View>
              <Switch
                value={settings.smsNotifications}
                onValueChange={() => handleToggle('smsNotifications')}
                trackColor={{ false: '#E3E3E3', true: '#C67C4E' }}
                thumbColor={settings.smsNotifications ? '#FFFFFF' : '#FFFFFF'}
                ios_backgroundColor="#E3E3E3"
              />
            </View>
          </View>
        </View>

        {/* Notification History */}
        <View style={styles.historySection}>
          <View style={styles.historySectionHeader}>
            <Text style={styles.sectionTitle}>
              Bildirim Geçmişi {unreadCount > 0 && `(${unreadCount} okunmamış)`}
            </Text>
            {notificationHistory.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleClearHistory}
                activeOpacity={0.8}
              >
                <MaterialIcons name="delete-sweep" size={20} color="#FF6B6B" />
              </TouchableOpacity>
            )}
          </View>
          
          {notificationHistory.length > 0 ? (
            <View style={styles.historyCard}>
              {notificationHistory.map((notification, index) => {
                const typeInfo = getNotificationTypeInfo(notification.type);
                
                return (
                  <TouchableOpacity
                    key={notification.id}
                    style={[
                      styles.notificationItem,
                      !notification.read && styles.unreadNotification,
                      index === notificationHistory.length - 1 && styles.lastNotificationItem
                    ]}
                    onPress={() => handleNotificationPress(notification.id)}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.notificationIconContainer, { backgroundColor: typeInfo.backgroundColor }]}>
                      <MaterialIcons 
                        name={typeInfo.icon as any} 
                        size={20} 
                        color={typeInfo.color} 
                      />
                    </View>
                    
                    <View style={styles.notificationContent}>
                      <View style={styles.notificationHeader}>
                        <Text style={[
                          styles.notificationTitle,
                          !notification.read && styles.unreadText
                        ]}>
                          {notification.title}
                        </Text>
                        {!notification.read && (
                          <View style={styles.unreadDot} />
                        )}
                      </View>
                      
                      <Text style={styles.notificationMessage}>
                        {notification.message}
                      </Text>
                      
                      <Text style={styles.notificationTime}>
                        {notification.time}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <View style={styles.emptyHistoryState}>
              <MaterialIcons name="notifications-off" size={60} color="#E3E3E3" />
              <Text style={styles.emptyHistoryTitle}>Bildirim Yok</Text>
              <Text style={styles.emptyHistoryText}>
                Henüz herhangi bir bildiriminiz bulunmuyor
              </Text>
            </View>
          )}
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
  markAllButton: {
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
  settingsSection: {
    padding: 20,
    paddingBottom: 8,
  },
  communicationSection: {
    padding: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  historySection: {
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
  historySectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  clearButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 4,
    shadowColor: 'rgba(198, 124, 78, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 4,
    shadowColor: 'rgba(198, 124, 78, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  lastSettingItem: {
    borderBottomWidth: 0,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '600',
    color: '#313131',
    marginBottom: 2,
  },
  settingDescription: {
    fontFamily: 'Sora',
    fontSize: 12,
    color: '#8B8B8B',
    lineHeight: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  lastNotificationItem: {
    borderBottomWidth: 0,
  },
  unreadNotification: {
    backgroundColor: '#FFF9F5',
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  notificationTitle: {
    fontFamily: 'Sora',
    fontSize: 14,
    fontWeight: '600',
    color: '#313131',
    flex: 1,
  },
  unreadText: {
    fontWeight: '700',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C67C4E',
    marginLeft: 8,
  },
  notificationMessage: {
    fontFamily: 'Sora',
    fontSize: 13,
    color: '#8B8B8B',
    lineHeight: 18,
    marginBottom: 4,
  },
  notificationTime: {
    fontFamily: 'Sora',
    fontSize: 11,
    color: '#A2A2A2',
    fontWeight: '500',
  },
  emptyHistoryState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyHistoryTitle: {
    fontFamily: 'Sora',
    fontSize: 18,
    fontWeight: '700',
    color: '#313131',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyHistoryText: {
    fontFamily: 'Sora',
    fontSize: 14,
    color: '#8B8B8B',
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomPadding: {
    height: 30,
  },
}); 