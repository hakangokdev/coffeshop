import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  StyleSheet, 
  Image 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Stack } from 'expo-router';

// Sample order data
const orderData = [
  {
    id: '#2024001',
    date: '15 Aralık 2024',
    time: '14:30',
    status: 'delivered',
    total: 127.50,
    items: [
      { name: 'Cappuccino', size: 'Büyük', quantity: 2, price: 45.00 },
      { name: 'Americano', size: 'Orta', quantity: 1, price: 32.50 },
      { name: 'Cheesecake', size: '', quantity: 1, price: 50.00 }
    ],
    address: 'Atatürk Caddesi No:123, Kadıköy',
    paymentMethod: 'Kredi Kartı'
  },
  {
    id: '#2024002',
    date: '12 Aralık 2024',
    time: '09:15',
    status: 'delivered',
    total: 89.75,
    items: [
      { name: 'Latte', size: 'Büyük', quantity: 1, price: 42.00 },
      { name: 'Croissant', size: '', quantity: 2, price: 23.75 }
    ],
    address: 'İstiklal Caddesi No:45, Beyoğlu',
    paymentMethod: 'Nakit'
  },
  {
    id: '#2024003',
    date: '10 Aralık 2024',
    time: '16:45',
    status: 'cancelled',
    total: 65.25,
    items: [
      { name: 'Espresso', size: 'Küçük', quantity: 3, price: 65.25 }
    ],
    address: 'Bağdat Caddesi No:78, Kadıköy',
    paymentMethod: 'Kredi Kartı'
  },
  {
    id: '#2024004',
    date: '8 Aralık 2024',
    time: '11:20',
    status: 'delivered',
    total: 156.80,
    items: [
      { name: 'Cappuccino', size: 'Büyük', quantity: 2, price: 45.00 },
      { name: 'Mocha', size: 'Orta', quantity: 1, price: 38.90 },
      { name: 'Muffin', size: '', quantity: 3, price: 72.90 }
    ],
    address: 'Nişantaşı Caddesi No:12, Şişli',
    paymentMethod: 'Mobil Ödeme'
  }
];

export default function OrderHistoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const filterOptions = [
    { key: 'all', label: 'Tümü' },
    { key: 'delivered', label: 'Teslim Edildi' },
    { key: 'cancelled', label: 'İptal Edildi' }
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'delivered':
        return {
          label: 'Teslim Edildi',
          color: '#4CAF50',
          backgroundColor: '#E8F5E8',
          icon: 'check-circle'
        };
      case 'cancelled':
        return {
          label: 'İptal Edildi',
          color: '#FF6B6B',
          backgroundColor: '#FFE8E8',
          icon: 'cancel'
        };
      default:
        return {
          label: 'Bilinmiyor',
          color: '#8B8B8B',
          backgroundColor: '#F5F5F5',
          icon: 'help'
        };
    }
  };

  const filteredOrders = selectedFilter === 'all' 
    ? orderData 
    : orderData.filter(order => order.status === selectedFilter);

  const handleOrderDetail = (orderId: string) => {
    console.log('Order detail for:', orderId);
    // Navigate to order detail page
  };

  const handleReorder = (order: any) => {
    console.log('Reorder:', order.id);
    // Add items to cart and navigate to cart
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
          
          <Text style={styles.headerTitle}>Sipariş Geçmişi</Text>
          
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Filter Section */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Filtreleme</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filterScrollView}
            contentContainerStyle={styles.filterScrollContent}
          >
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.filterChip,
                  selectedFilter === option.key && styles.selectedFilterChip
                ]}
                onPress={() => setSelectedFilter(option.key)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedFilter === option.key && styles.selectedFilterChipText
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Orders List */}
        <View style={styles.ordersSection}>
          <Text style={styles.sectionTitle}>
            {filteredOrders.length} Sipariş Bulundu
          </Text>
          
          {filteredOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            
            return (
              <View key={order.id} style={styles.orderCard}>
                {/* Order Header */}
                <View style={styles.orderHeader}>
                  <View style={styles.orderIdContainer}>
                    <Text style={styles.orderId}>{order.id}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: statusInfo.backgroundColor }]}>
                      <MaterialIcons name={statusInfo.icon as any} size={14} color={statusInfo.color} />
                      <Text style={[styles.statusText, { color: statusInfo.color }]}>
                        {statusInfo.label}
                      </Text>
                    </View>
                  </View>
                  
                  <TouchableOpacity
                    style={styles.detailButton}
                    onPress={() => handleOrderDetail(order.id)}
                    activeOpacity={0.8}
                  >
                    <MaterialIcons name="chevron-right" size={20} color="#C67C4E" />
                  </TouchableOpacity>
                </View>

                {/* Order Info */}
                <View style={styles.orderInfo}>
                  <View style={styles.dateTimeContainer}>
                    <MaterialIcons name="schedule" size={16} color="#8B8B8B" />
                    <Text style={styles.orderDateTime}>
                      {order.date} • {order.time}
                    </Text>
                  </View>
                  
                  <View style={styles.addressContainer}>
                    <MaterialIcons name="location-on" size={16} color="#8B8B8B" />
                    <Text style={styles.orderAddress} numberOfLines={1}>
                      {order.address}
                    </Text>
                  </View>
                </View>

                {/* Order Items */}
                <View style={styles.itemsContainer}>
                  {order.items.map((item, index) => (
                    <View key={index} style={styles.orderItem}>
                      <Text style={styles.itemName}>
                        {item.quantity}x {item.name}
                        {item.size && ` (${item.size})`}
                      </Text>
                      <Text style={styles.itemPrice}>
                        ₺{item.price.toFixed(2)}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Order Footer */}
                <View style={styles.orderFooter}>
                  <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Toplam:</Text>
                    <Text style={styles.totalAmount}>₺{order.total.toFixed(2)}</Text>
                  </View>
                  
                  <View style={styles.orderActions}>
                    <TouchableOpacity
                      style={styles.detailActionButton}
                      onPress={() => handleOrderDetail(order.id)}
                      activeOpacity={0.8}
                    >
                      <MaterialIcons name="receipt" size={18} color="#8B8B8B" />
                      <Text style={styles.detailActionText}>Detay</Text>
                    </TouchableOpacity>
                    
                    {order.status === 'delivered' && (
                      <TouchableOpacity
                        style={styles.reorderButton}
                        onPress={() => handleReorder(order)}
                        activeOpacity={0.8}
                      >
                        <LinearGradient
                          colors={['#C67C4E', '#A85A3A']}
                          style={styles.reorderButtonGradient}
                        >
                          <MaterialIcons name="refresh" size={16} color="#FFFFFF" />
                          <Text style={styles.reorderButtonText}>Tekrar</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialIcons name="shopping-bag" size={80} color="#E3E3E3" />
            <Text style={styles.emptyStateTitle}>Sipariş Bulunamadı</Text>
            <Text style={styles.emptyStateText}>
              Seçilen filtreye uygun sipariş bulunmuyor.
            </Text>
            <TouchableOpacity
              style={styles.browseButton}
              onPress={() => router.push('/(tabs)')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#C67C4E', '#A85A3A']}
                style={styles.browseButtonGradient}
              >
                <MaterialIcons name="local-cafe" size={20} color="#FFFFFF" />
                <Text style={styles.browseButtonText}>Kahveleri Keşfet</Text>
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
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  filterSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingLeft: 20,
    marginBottom: 8,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  filterTitle: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '600',
    color: '#313131',
    marginBottom: 12,
  },
  filterScrollView: {
    overflow: 'visible',
  },
  filterScrollContent: {
    paddingRight: 20,
    gap: 12,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#F8F8F8',
    borderWidth: 1.5,
    borderColor: '#E3E3E3',
  },
  selectedFilterChip: {
    backgroundColor: '#C67C4E',
    borderColor: '#C67C4E',
  },
  filterChipText: {
    fontFamily: 'Sora',
    fontSize: 14,
    fontWeight: '600',
    color: '#8B8B8B',
  },
  selectedFilterChipText: {
    color: '#FFFFFF',
  },
  ordersSection: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Sora',
    fontSize: 18,
    fontWeight: '700',
    color: '#313131',
    marginBottom: 16,
  },
  orderCard: {
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderIdContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orderId: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '700',
    color: '#313131',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontFamily: 'Sora',
    fontSize: 12,
    fontWeight: '600',
  },
  detailButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF5F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderInfo: {
    marginBottom: 16,
    gap: 8,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orderDateTime: {
    fontFamily: 'Sora',
    fontSize: 14,
    color: '#8B8B8B',
    fontWeight: '500',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orderAddress: {
    fontFamily: 'Sora',
    fontSize: 14,
    color: '#8B8B8B',
    fontWeight: '500',
    flex: 1,
  },
  itemsContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  itemName: {
    fontFamily: 'Sora',
    fontSize: 14,
    color: '#313131',
    fontWeight: '500',
    flex: 1,
  },
  itemPrice: {
    fontFamily: 'Sora',
    fontSize: 14,
    color: '#C67C4E',
    fontWeight: '600',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    minWidth: 120,
  },
  totalLabel: {
    fontFamily: 'Sora',
    fontSize: 16,
    color: '#313131',
    fontWeight: '600',
  },
  totalAmount: {
    fontFamily: 'Sora',
    fontSize: 18,
    color: '#C67C4E',
    fontWeight: '700',
  },
  orderActions: {
    flexDirection: 'row',
    gap: 8,
    flexShrink: 0,
  },
  detailActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F8F8F8',
    gap: 4,
  },
  detailActionText: {
    fontFamily: 'Sora',
    fontSize: 13,
    color: '#8B8B8B',
    fontWeight: '600',
  },
  reorderButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  reorderButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
  },
  reorderButtonText: {
    fontFamily: 'Sora',
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '600',
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
  browseButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  browseButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 8,
  },
  browseButtonText: {
    fontFamily: 'Sora',
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  bottomPadding: {
    height: 30,
  },
}); 