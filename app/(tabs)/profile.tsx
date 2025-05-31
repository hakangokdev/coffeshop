import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const menuItems = [
    { 
      icon: 'person', 
      title: 'Profili Düzenle', 
      description: 'Kişisel bilgilerinizi güncelleyin',
      action: () => router.push('/profile-edit') 
    },
    { 
      icon: 'history', 
      title: 'Sipariş Geçmişi', 
      description: 'Geçmiş siparişlerinizi görüntüleyin',
      action: () => router.push('/order-history') 
    },
    { 
      icon: 'payment', 
      title: 'Ödeme Yöntemleri', 
      description: 'Kredi kartı ve diğer ödeme seçenekleri',
      action: () => router.push('/payment-methods') 
    },
    { 
      icon: 'location-on', 
      title: 'Teslimat Adresleri', 
      description: 'Kayıtlı adreslerinizi yönetin',
      action: () => router.push('/delivery-addresses') 
    },
    { 
      icon: 'notifications', 
      title: 'Bildirimler', 
      description: 'Bildirim tercihlerinizi ayarlayın',
      action: () => router.push('/notifications') 
    },
    { 
      icon: 'help', 
      title: 'Yardım & Destek', 
      description: 'SSS, iletişim ve teknik destek',
      action: () => router.push('/help-support') 
    },
    { 
      icon: 'info', 
      title: 'Hakkında', 
      description: 'Uygulama ve şirket bilgileri',
      action: () => router.push('/about') 
    },
  ];

  const handleLogout = () => {
    console.log('Logout');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <MaterialIcons name="person" size={40} color="#FFFFFF" />
            </View>
            <TouchableOpacity style={styles.editAvatarButton} activeOpacity={0.8}>
              <MaterialIcons name="camera-alt" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>
            Ahmet Kaya
          </Text>
          <Text style={styles.userEmail}>
            ahmet.kaya@email.com
          </Text>
          
          <View style={styles.membershipContainer}>
            <View style={styles.membershipBadge}>
              <MaterialIcons name="star" size={16} color="#C67C4E" />
              <Text style={styles.membershipText}>
                Gold Üye
              </Text>
            </View>
            <Text style={styles.membershipSubtext}>
              %15 indirim kazandınız!
            </Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <MaterialIcons name="shopping-bag" size={24} color="#C67C4E" />
            </View>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Sipariş</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <MaterialIcons name="savings" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.statNumber}>₺127</Text>
            <Text style={styles.statLabel}>Kazanç</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <MaterialIcons name="favorite" size={24} color="#FF6B6B" />
            </View>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Favori</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Hesap Ayarları</Text>
          
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.title}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.lastMenuItem
              ]}
              onPress={item.action}
              activeOpacity={0.8}
            >
              <View style={styles.menuIconContainer}>
                <MaterialIcons
                  name={item.icon as any}
                  size={22}
                  color="#C67C4E"
                />
              </View>
              
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>
                  {item.title}
                </Text>
                <Text style={styles.menuDescription}>
                  {item.description}
                </Text>
              </View>
              
              <MaterialIcons
                name="chevron-right"
                size={20}
                color="#E3E3E3"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <MaterialIcons name="logout" size={20} color="#FF6B6B" />
            <Text style={styles.logoutText}>Çıkış Yap</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfoContainer}>
          <View style={styles.appInfoCard}>
            <MaterialIcons name="local-cafe" size={24} color="#C67C4E" />
            <Text style={styles.appName}>Coffee Shop</Text>
            <Text style={styles.versionText}>Sürüm 1.0.0</Text>
          </View>
          
          <Text style={styles.copyrightText}>
            © 2025 Coffee Shop. Tüm hakları saklıdır.
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
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    paddingTop: 60,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#C67C4E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  userName: {
    fontFamily: 'Sora',
    fontSize: 24,
    fontWeight: '700',
    color: '#313131',
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: 'Sora',
    fontSize: 14,
    color: '#8B8B8B',
    marginBottom: 16,
  },
  membershipContainer: {
    alignItems: 'center',
  },
  membershipBadge: {
    backgroundColor: '#FFF5F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#EDD6C8',
  },
  membershipText: {
    fontFamily: 'Sora',
    color: '#C67C4E',
    fontSize: 13,
    fontWeight: '700',
  },
  membershipSubtext: {
    fontFamily: 'Sora',
    fontSize: 11,
    color: '#A2A2A2',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF5F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontFamily: 'Sora',
    fontSize: 20,
    fontWeight: '700',
    color: '#313131',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Sora',
    fontSize: 12,
    color: '#8B8B8B',
    fontWeight: '500',
  },
  menuContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Sora',
    fontSize: 18,
    fontWeight: '700',
    color: '#313131',
    marginBottom: 16,
    marginLeft: 4,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  lastMenuItem: {
    marginBottom: 0,
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF5F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '600',
    color: '#313131',
    marginBottom: 2,
  },
  menuDescription: {
    fontFamily: 'Sora',
    fontSize: 12,
    color: '#8B8B8B',
    lineHeight: 16,
  },
  actionContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  logoutButton: {
    backgroundColor: '#FFF5F5',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#FFE8E8',
  },
  logoutText: {
    fontFamily: 'Sora',
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  appInfoContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  appInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  appName: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '700',
    color: '#313131',
    marginTop: 8,
    marginBottom: 4,
  },
  versionText: {
    fontFamily: 'Sora',
    fontSize: 12,
    color: '#8B8B8B',
    fontWeight: '500',
  },
  copyrightText: {
    fontFamily: 'Sora',
    fontSize: 11,
    color: '#A2A2A2',
    textAlign: 'center',
    lineHeight: 16,
  },
  bottomPadding: {
    height: 20,
  },
}); 