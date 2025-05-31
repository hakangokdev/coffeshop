import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, SafeAreaView, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { MOCK_PRODUCTS, Product } from '../../data/mockData';
import { useCartStore } from '../../store/cartStore';
import { useFavoritesStore } from '../../store/favoritesStore';

export default function FavoritesScreen() {
  const { favorites, removeFromFavorites } = useFavoritesStore();
  const { addToCart } = useCartStore();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastAnimation] = useState(new Animated.Value(0));

  const favoriteProducts = MOCK_PRODUCTS.filter(product => 
    favorites.includes(product.id)
  );

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

  const handleAddToCart = (product: Product) => {
    addToCart(product, 'medium', 1);
    showToast(`${product.name} sepete eklendi! 🛒`);
  };

  const handleRemoveFavorite = (productId: string) => {
    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    removeFromFavorites(productId);
    if (product) {
      showToast(`${product.name} favorilerden çıkarıldı 💔`);
    }
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => router.push(`/product/${item.id}`)}
      activeOpacity={0.9}
    >
      <View style={styles.productRow}>
        <View style={styles.productImageContainer}>
          <Image
            source={item.image}
            style={styles.productImage}
          />
          <View style={styles.ratingBadge}>
            <MaterialIcons name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingBadgeText}>{item.rating}</Text>
          </View>
        </View>
        
        <View style={styles.productContent}>
          <View style={styles.productHeader}>
            <Text style={styles.productName} numberOfLines={2}>
              {item.name}
            </Text>
            <TouchableOpacity
              style={styles.heartButton}
              onPress={() => handleRemoveFavorite(item.id)}
              activeOpacity={0.8}
            >
              <MaterialIcons name="favorite" size={20} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.productDescription} numberOfLines={2}>
            {item.description}
          </Text>
          
          <View style={styles.productFooter}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Fiyat</Text>
              <Text style={styles.productPrice}>
                ₺{item.price.medium.toFixed(2)}
              </Text>
            </View>
            
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => handleAddToCart(item)}
              activeOpacity={0.8}
            >
              <MaterialIcons name="shopping-cart" size={16} color="#FFFFFF" />
              <Text style={styles.addToCartText}>
                Sepete Ekle
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MaterialIcons name="favorite" size={24} color="#C67C4E" />
            <Text style={styles.headerTitle}>
              Favorilerim
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.itemCount}>
              {favoriteProducts.length} ürün
            </Text>
          </View>
        </View>

        <FlatList
          data={favoriteProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconContainer}>
                <MaterialIcons name="favorite-border" size={64} color="#E3E3E3" />
              </View>
              <Text style={styles.emptyTitle}>
                Henüz favori yok
              </Text>
              <Text style={styles.emptySubtitle}>
                Kalp simgesine tıklayarak ürünleri favorilerinize ekleyin
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
  listContainer: {
    paddingBottom: 20,
  },
  itemSeparator: {
    height: 16,
  },
  productCard: {
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
  productRow: {
    flexDirection: 'row',
  },
  productImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  ratingBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingBadgeText: {
    fontFamily: 'Sora',
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  productContent: {
    flex: 1,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  productName: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '700',
    color: '#313131',
    flex: 1,
    marginRight: 12,
  },
  heartButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF5F0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productDescription: {
    fontFamily: 'Sora',
    color: '#8B8B8B',
    fontSize: 13,
    marginBottom: 16,
    lineHeight: 18,
  },
  productFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  productPrice: {
    fontFamily: 'Sora',
    fontSize: 18,
    fontWeight: '700',
    color: '#C67C4E',
  },
  addToCartButton: {
    backgroundColor: '#C67C4E',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#C67C4E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addToCartText: {
    fontFamily: 'Sora',
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
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