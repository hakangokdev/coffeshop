import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  Animated 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Product } from '../data/mockData';
import { useFavoritesStore } from '../store/favoritesStore';
import { useCartStore } from '../store/cartStore';

const { width } = Dimensions.get('window');

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavoritesStore();
  const { addToCart } = useCartStore();
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

  const isFavorite = favorites.includes(product.id);

  const handleFavoritePress = () => {
    if (isFavorite) {
      removeFromFavorites(product.id);
      showToast(`${product.name} favorilerden çıkarıldı 💔`);
    } else {
      addToFavorites(product.id);
      showToast(`${product.name} favorilere eklendi! ❤️`);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, 'medium', 1);
    showToast(`${product.name} sepete eklendi! 🛒`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={styles.imageContainer}>
          <Image
            source={product.image}
            style={styles.productImage}
            resizeMode="cover"
          />
          
          {/* Rating Badge */}
          <View style={styles.ratingBadge}>
            <MaterialIcons name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingText}>{product.rating}</Text>
          </View>

          {/* Favorite Button */}
          <TouchableOpacity
            style={[
              styles.favoriteButton,
              isFavorite && styles.favoriteButtonActive
            ]}
            onPress={handleFavoritePress}
            activeOpacity={0.8}
          >
            <MaterialIcons 
              name={isFavorite ? "favorite" : "favorite-border"} 
              size={18} 
              color={isFavorite ? "#FF6B6B" : "#8B8B8B"} 
            />
          </TouchableOpacity>

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <View style={styles.outOfStockOverlay}>
              <Text style={styles.outOfStockText}>Stokta Yok</Text>
            </View>
          )}
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.productName} numberOfLines={1}>
              {product.name}
            </Text>
            <Text style={styles.productPrice}>
              ₺{product.price.small.toFixed(2)}
            </Text>
          </View>
          
          <Text style={styles.productDescription} numberOfLines={2}>
            {product.description}
          </Text>
          
          <View style={styles.footerRow}>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={16} color="#C67C4E" />
              <Text style={styles.ratingDetailText}>
                {product.rating} (0)
              </Text>
            </View>
            
            <TouchableOpacity
              onPress={handleAddToCart}
              disabled={!product.inStock}
              style={[
                styles.addButton,
                !product.inStock && styles.addButtonDisabled
              ]}
              activeOpacity={0.8}
            >
              <MaterialIcons 
                name="add" 
                size={16} 
                color={product.inStock ? "#FFFFFF" : "#8B8B8B"} 
              />
              <Text style={[
                styles.addButtonText,
                !product.inStock && styles.addButtonTextDisabled
              ]}>
                Sepete Ekle
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  productImage: {
    width: '100%',
    height: 140,
    borderRadius: 20,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'Sora',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  favoriteButtonActive: {
    backgroundColor: 'rgba(255, 107, 107, 0.15)',
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Sora',
  },
  contentContainer: {
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#313131',
    fontFamily: 'Sora',
    flex: 1,
    marginRight: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#C67C4E',
    fontFamily: 'Sora',
  },
  productDescription: {
    fontSize: 12,
    color: '#8B8B8B',
    fontFamily: 'Sora',
    fontWeight: '500',
    lineHeight: 16,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingDetailText: {
    fontSize: 12,
    color: '#8B8B8B',
    fontFamily: 'Sora',
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#C67C4E',
    paddingHorizontal: 16,
    paddingVertical: 8,
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
  addButtonDisabled: {
    backgroundColor: '#E5E5E5',
    shadowOpacity: 0,
    elevation: 0,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Sora',
  },
  addButtonTextDisabled: {
    color: '#8B8B8B',
  },
  toastContainer: {
    position: 'absolute',
    bottom: -60,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  toast: {
    backgroundColor: '#2E2E2E',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    marginHorizontal: 20,
  },
  toastText: {
    fontFamily: 'Sora',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
}); 