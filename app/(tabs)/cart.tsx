import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, SafeAreaView, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useCartStore } from '../../store/cartStore';
import { useRouter } from 'expo-router';

export default function CartScreen() {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice, getTotalItems } = useCartStore();
  const router = useRouter();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastAnimation] = useState(new Animated.Value(0));

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    
    Animated.sequence([
      Animated.timing(toastAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(toastAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setToastVisible(false);
    });
  };

  const handleQuantityChange = (id: string, newQuantity: number, itemName: string) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      showToast(`${itemName} sepetten çıkarıldı 🗑️`);
    } else {
      updateQuantity(id, newQuantity);
      showToast(`${itemName} miktarı güncellendi 📝`);
    }
  };

  const handleRemoveItem = (id: string, itemName: string) => {
    removeFromCart(id);
    showToast(`${itemName} sepetten çıkarıldı 🗑️`);
  };

  const handleClearCart = () => {
    clearCart();
    showToast('Sepet temizlendi! 🧹');
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItemCard}>
      <View style={styles.cartItemRow}>
        <View style={styles.cartItemImageContainer}>
          <Image
            source={item.image}
            style={styles.cartItemImage}
          />
          <View style={styles.sizeBadge}>
            <Text style={styles.sizeBadgeText}>{item.size}</Text>
          </View>
        </View>
        
        <View style={styles.cartItemContent}>
          <View style={styles.cartItemHeader}>
            <Text style={styles.cartItemName} numberOfLines={2}>
              {item.name}
            </Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveItem(item.id, item.name)}
              activeOpacity={0.8}
            >
              <MaterialIcons name="close" size={18} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.cartItemFooter}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Fiyat</Text>
              <Text style={styles.cartItemPrice}>
                ₺{item.price.toFixed(2)}
              </Text>
            </View>
            
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(item.id, item.quantity - 1, item.name)}
                activeOpacity={0.8}
              >
                <MaterialIcons name="remove" size={16} color="#8B8B8B" />
              </TouchableOpacity>
              
              <View style={styles.quantityDisplay}>
                <Text style={styles.quantityText}>
                  {item.quantity}
                </Text>
              </View>
              
              <TouchableOpacity
                style={styles.quantityButtonAdd}
                onPress={() => handleQuantityChange(item.id, item.quantity + 1, item.name)}
                activeOpacity={0.8}
              >
                <MaterialIcons name="add" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MaterialIcons name="shopping-cart" size={24} color="#C67C4E" />
            <Text style={styles.headerTitle}>
              Sepetim
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.itemCount}>
              {getTotalItems()} ürün
            </Text>
          </View>
        </View>

        <FlatList
          data={items}
          renderItem={renderCartItem}
          keyExtractor={(item) => `${item.id}-${item.size}`}
          showsVerticalScrollIndicator={false}
          style={styles.cartList}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconContainer}>
                <MaterialIcons name="shopping-cart" size={64} color="#E3E3E3" />
              </View>
              <Text style={styles.emptyTitle}>
                Sepetiniz boş
              </Text>
              <Text style={styles.emptySubtitle}>
                Lezzetli ürünler ekleyerek başlayın
              </Text>
              <TouchableOpacity 
                style={styles.browseButton}
                onPress={() => router.push('/(tabs)/menu')}
                activeOpacity={0.8}
              >
                <MaterialIcons name="explore" size={20} color="#FFFFFF" />
                <Text style={styles.browseButtonText}>Ürünlere Göz At</Text>
              </TouchableOpacity>
            </View>
          }
        />

        {items.length > 0 && (
          <View style={styles.checkoutSection}>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Toplam Ürün:</Text>
                <Text style={styles.summaryValue}>{getTotalItems()} adet</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Genel Toplam:</Text>
                <Text style={styles.totalPrice}>₺{getTotalPrice().toFixed(2)}</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={() => router.push('/checkout')}
              activeOpacity={0.9}
            >
              <MaterialIcons name="payment" size={20} color="#FFFFFF" />
              <Text style={styles.checkoutButtonText}>Ödemeye Geç</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={handleClearCart}
              activeOpacity={0.8}
            >
              <MaterialIcons name="delete-sweep" size={18} color="#8B8B8B" />
              <Text style={styles.clearButtonText}>Sepeti Temizle</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Toast Notification */}
      {toastVisible && (
        <Animated.View
          style={[
            styles.toastContainer,
            {
              opacity: toastAnimation,
              transform: [
                {
                  translateY: toastAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.toast}>
            <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
            <Text style={styles.toastText}>{toastMessage}</Text>
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F2ED',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Sora',
    fontSize: 24,
    fontWeight: '700',
    color: '#313131',
    marginLeft: 12,
  },
  headerRight: {
    backgroundColor: '#FFF5F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  itemCount: {
    fontFamily: 'Sora',
    fontSize: 12,
    fontWeight: '600',
    color: '#C67C4E',
  },
  cartList: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemSeparator: {
    height: 16,
  },
  cartItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  cartItemRow: {
    flexDirection: 'row',
  },
  cartItemImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  cartItemImage: {
    width: 90,
    height: 90,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  sizeBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#C67C4E',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  sizeBadgeText: {
    fontFamily: 'Sora',
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cartItemContent: {
    flex: 1,
  },
  cartItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cartItemName: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '700',
    color: '#313131',
    flex: 1,
    marginRight: 12,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFE8E8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  priceContainer: {
    alignItems: 'flex-start',
  },
  priceLabel: {
    fontFamily: 'Sora',
    fontSize: 11,
    fontWeight: '500',
    color: '#A2A2A2',
    marginBottom: 2,
  },
  cartItemPrice: {
    fontFamily: 'Sora',
    fontSize: 18,
    fontWeight: '700',
    color: '#C67C4E',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quantityButtonAdd: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#C67C4E',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#C67C4E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  quantityDisplay: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  quantityText: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '700',
    color: '#313131',
    minWidth: 20,
    textAlign: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 80,
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontFamily: 'Sora',
    fontSize: 20,
    fontWeight: '700',
    color: '#313131',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontFamily: 'Sora',
    fontSize: 14,
    color: '#8B8B8B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },
  browseButton: {
    backgroundColor: '#C67C4E',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#C67C4E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  browseButtonText: {
    fontFamily: 'Sora',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  checkoutSection: {
    marginTop: 20,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontFamily: 'Sora',
    fontSize: 14,
    fontWeight: '500',
    color: '#8B8B8B',
  },
  summaryValue: {
    fontFamily: 'Sora',
    fontSize: 14,
    fontWeight: '600',
    color: '#313131',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontFamily: 'Sora',
    fontSize: 18,
    fontWeight: '700',
    color: '#313131',
  },
  totalPrice: {
    fontFamily: 'Sora',
    fontSize: 20,
    fontWeight: '700',
    color: '#C67C4E',
  },
  checkoutButton: {
    backgroundColor: '#C67C4E',
    borderRadius: 20,
    paddingVertical: 18,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#C67C4E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  checkoutButtonText: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  clearButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  clearButtonText: {
    fontFamily: 'Sora',
    fontSize: 14,
    fontWeight: '600',
    color: '#8B8B8B',
  },
  toastContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  toast: {
    backgroundColor: '#2E2E2E',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  toastText: {
    fontFamily: 'Sora',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
}); 