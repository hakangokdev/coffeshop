import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  StyleSheet, 
  Animated,
  Dimensions,
  StatusBar 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { MOCK_PRODUCTS, Product } from '../../data/mockData';
import { useCartStore } from '../../store/cartStore';
import { useFavoritesStore } from '../../store/favoritesStore';

const { width, height } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const product = MOCK_PRODUCTS.find(p => p.id === id) as Product;
  
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [quantity, setQuantity] = useState(1);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastAnimation] = useState(new Animated.Value(0));
  const [imageScale] = useState(new Animated.Value(1));
  const scrollY = React.useRef(new Animated.Value(0)).current;
  
  const { addToCart } = useCartStore();
  const { favorites, addToFavorites, removeFromFavorites } = useFavoritesStore();
  
  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    
    Animated.sequence([
      Animated.timing(toastAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2500),
      Animated.timing(toastAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setToastVisible(false);
    });
  };

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F9F2ED" />
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={64} color="#C67C4E" />
          <Text style={styles.errorTitle}>Ürün Bulunamadı</Text>
          <Text style={styles.errorSubtitle}>Bu ürün mevcut değil veya kaldırılmış olabilir</Text>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <MaterialIcons name="arrow-back" size={20} color="#FFFFFF" />
            <Text style={styles.backButtonText}>Geri Dön</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  const isFavorite = favorites.includes(product.id);
  const currentPrice = product.price[selectedSize];
  const totalPrice = currentPrice * quantity;
  
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const imageParallax = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    showToast(`${product.name} (${quantity} adet) sepete eklendi! 🛒`);
    
    // Image scale animation
    Animated.sequence([
      Animated.timing(imageScale, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(imageScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(product.id);
      showToast(`${product.name} favorilerden çıkarıldı 💔`);
    } else {
      addToFavorites(product.id);
      showToast(`${product.name} favorilere eklendi! ❤️`);
    }
  };

  const getSizeLabel = (size: string) => {
    switch (size) {
      case 'small': return 'Küçük';
      case 'medium': return 'Orta';
      case 'large': return 'Büyük';
      default: return size;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'hot': return 'Sıcak İçecek';
      case 'cold': return 'Soğuk İçecek';
      case 'tea': return 'Çay & Bitki';
      case 'food': return 'Yiyecek';
      case 'pastries': return 'Hamur İşi';
      default: return 'Özel Karışım';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F2ED" />
      
      {/* Animated Header */}
      <Animated.View style={[styles.animatedHeader, { opacity: headerOpacity }]}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <MaterialIcons name="arrow-back-ios" size={20} color="#313131" />
        </TouchableOpacity>
        
        <Text style={styles.animatedHeaderTitle} numberOfLines={1}>
          {product.name}
        </Text>
        
        <TouchableOpacity 
          style={[styles.headerButton, isFavorite && styles.favoriteHeaderButton]}
          onPress={handleToggleFavorite}
          activeOpacity={0.8}
        >
          <MaterialIcons 
            name={isFavorite ? "favorite" : "favorite-border"} 
            size={20} 
            color={isFavorite ? "#FFFFFF" : "#313131"} 
          />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <MaterialIcons name="arrow-back-ios" size={20} color="#313131" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Ürün Detayı</Text>
          
          <TouchableOpacity 
            style={[styles.headerButton, isFavorite && styles.favoriteHeaderButton]}
            onPress={handleToggleFavorite}
            activeOpacity={0.8}
          >
            <MaterialIcons 
              name={isFavorite ? "favorite" : "favorite-border"} 
              size={20} 
              color={isFavorite ? "#FFFFFF" : "#313131"} 
            />
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <Animated.View style={[styles.imageContainer, { transform: [{ translateY: imageParallax }] }]}>
          <Animated.View style={[styles.imageWrapper, { transform: [{ scale: imageScale }] }]}>
            <Image
              source={product.image}
              style={styles.productImage}
              resizeMode="cover"
            />
            
            {/* Stock Badge */}
            <View style={styles.stockBadge}>
              <MaterialIcons 
                name={product.inStock ? "check-circle" : "cancel"} 
                size={16} 
                color={product.inStock ? "#4CAF50" : "#FF6B6B"} 
              />
              <Text style={[styles.stockText, { color: product.inStock ? "#4CAF50" : "#FF6B6B" }]}>
                {product.inStock ? "Stokta" : "Stokta Yok"}
              </Text>
            </View>

            {/* Rating Badge */}
            <View style={styles.ratingBadge}>
              <MaterialIcons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingBadgeText}>{product.rating}</Text>
            </View>
          </Animated.View>
        </Animated.View>

        {/* Product Details */}
        <View style={styles.detailsContainer}>
          {/* Product Title & Category */}
          <View style={styles.titleSection}>
            <View style={styles.titleColumn}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productCategory}>{getCategoryLabel(product.category)}</Text>
            </View>
            
            <View style={styles.pricePreview}>
              <Text style={styles.pricePreviewLabel}>Fiyat</Text>
              <Text style={styles.pricePreviewValue}>₺{currentPrice.toFixed(2)}</Text>
            </View>
          </View>

          {/* Features Row */}
          <View style={styles.featuresRow}>
            <View style={styles.featureItem}>
              <MaterialIcons name="delivery-dining" size={24} color="#C67C4E" />
              <Text style={styles.featureText}>Hızlı Teslimat</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="coffee" size={24} color="#C67C4E" />
              <Text style={styles.featureText}>Taze Kahve</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="eco" size={24} color="#C67C4E" />
              <Text style={styles.featureText}>Doğal</Text>
            </View>
          </View>

          {/* Separator Line */}
          <View style={styles.separator} />

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Açıklama</Text>
            <Text style={styles.descriptionText}>
              {product.description}
            </Text>
            
            {/* Nutrition Info */}
            <View style={styles.nutritionContainer}>
              <View style={styles.nutritionItem}>
                <MaterialIcons name="local-fire-department" size={20} color="#FF6B6B" />
                <Text style={styles.nutritionText}>{product.nutrition.calories} kcal</Text>
              </View>
              <View style={styles.nutritionItem}>
                <MaterialIcons name="coffee" size={20} color="#8B4513" />
                <Text style={styles.nutritionText}>{product.nutrition.caffeine}mg kafein</Text>
              </View>
              <View style={styles.nutritionItem}>
                <MaterialIcons name="star" size={20} color="#FFD700" />
                <Text style={styles.nutritionText}>{product.nutrition.sugar}g şeker</Text>
              </View>
            </View>
          </View>

          {/* Size Selection */}
          <View style={styles.sizeSection}>
            <Text style={styles.sectionTitle}>Boyut Seçimi</Text>
            <View style={styles.sizeOptions}>
              {(['small', 'medium', 'large'] as const).map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.sizeButtonSelected
                  ]}
                  onPress={() => setSelectedSize(size)}
                  activeOpacity={0.8}
                >
                  <Text style={[
                    styles.sizeText,
                    selectedSize === size && styles.sizeTextSelected
                  ]}>
                    {getSizeLabel(size)}
                  </Text>
                  <Text style={[
                    styles.sizePriceText,
                    selectedSize === size && styles.sizePriceTextSelected
                  ]}>
                    ₺{product.price[size].toFixed(2)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quantity Selection */}
          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Adet</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]}
                onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                disabled={quantity <= 1}
                activeOpacity={0.8}
              >
                <MaterialIcons name="remove" size={20} color={quantity <= 1 ? "#A0A0A0" : "#C67C4E"} />
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{quantity}</Text>
              
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
                activeOpacity={0.8}
              >
                <MaterialIcons name="add" size={20} color="#C67C4E" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      {/* Bottom Purchase Section */}
      <View style={styles.bottomSection}>
        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Toplam Fiyat</Text>
          <Text style={styles.priceValue}>₺{totalPrice.toFixed(2)}</Text>
          {quantity > 1 && (
            <Text style={styles.priceDetail}>{quantity} adet × ₺{currentPrice.toFixed(2)}</Text>
          )}
        </View>
        
        <TouchableOpacity
          style={[styles.buyButton, !product.inStock && styles.buyButtonDisabled]}
          onPress={handleAddToCart}
          disabled={!product.inStock}
          activeOpacity={0.8}
        >
          <MaterialIcons 
            name="shopping-cart" 
            size={20} 
            color={product.inStock ? "#FFFFFF" : "#A0A0A0"} 
          />
          <Text style={[styles.buyButtonText, !product.inStock && styles.buyButtonTextDisabled]}>
            {product.inStock ? "Sepete Ekle" : "Stokta Yok"}
          </Text>
        </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
  errorTitle: {
    fontFamily: 'Sora',
    fontSize: 24,
    fontWeight: '700',
    color: '#313131',
    textAlign: 'center',
  },
  errorSubtitle: {
    fontFamily: 'Sora',
    fontSize: 16,
    color: '#8B8B8B',
    textAlign: 'center',
    lineHeight: 24,
  },
  backButton: {
    backgroundColor: '#C67C4E',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  backButtonText: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  
  // Animated Header
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#F9F2ED',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 44,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  animatedHeaderTitle: {
    fontFamily: 'Sora',
    fontWeight: '600',
    fontSize: 18,
    color: '#313131',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 16,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  favoriteHeaderButton: {
    backgroundColor: '#C67C4E',
  },
  headerTitle: {
    fontFamily: 'Sora',
    fontWeight: '600',
    fontSize: 18,
    color: '#313131',
    textAlign: 'center',
  },
  
  // Image Styles
  imageContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
  },
  productImage: {
    width: '100%',
    height: 240,
  },
  stockBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  stockText: {
    fontFamily: 'Sora',
    fontSize: 12,
    fontWeight: '600',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingBadgeText: {
    fontFamily: 'Sora',
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  
  // Details Styles
  detailsContainer: {
    paddingHorizontal: 24,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  titleColumn: {
    flex: 1,
  },
  productName: {
    fontFamily: 'Sora',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
    color: '#313131',
    marginBottom: 6,
  },
  productCategory: {
    fontFamily: 'Sora',
    fontWeight: '500',
    fontSize: 14,
    color: '#8B8B8B',
  },
  pricePreview: {
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  pricePreviewLabel: {
    fontFamily: 'Sora',
    fontWeight: '500',
    fontSize: 12,
    color: '#8B8B8B',
    marginBottom: 2,
  },
  pricePreviewValue: {
    fontFamily: 'Sora',
    fontWeight: '700',
    fontSize: 20,
    color: '#C67C4E',
  },
  
  // Features Styles
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  featureItem: {
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontFamily: 'Sora',
    fontSize: 12,
    fontWeight: '600',
    color: '#313131',
    textAlign: 'center',
  },
  
  // Separator
  separator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginBottom: 24,
  },
  
  // Description Styles
  descriptionSection: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontFamily: 'Sora',
    fontWeight: '700',
    fontSize: 18,
    color: '#313131',
    marginBottom: 12,
  },
  descriptionText: {
    fontFamily: 'Sora',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: '#8B8B8B',
    marginBottom: 16,
  },
  nutritionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  nutritionItem: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nutritionText: {
    fontFamily: 'Sora',
    fontSize: 12,
    fontWeight: '600',
    color: '#313131',
  },
  
  // Size Styles
  sizeSection: {
    marginBottom: 24,
  },
  sizeOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  sizeButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sizeButtonSelected: {
    borderColor: '#C67C4E',
    backgroundColor: '#FFF8F5',
  },
  sizeText: {
    fontFamily: 'Sora',
    fontWeight: '600',
    fontSize: 14,
    color: '#313131',
    marginBottom: 4,
  },
  sizeTextSelected: {
    color: '#C67C4E',
  },
  sizePriceText: {
    fontFamily: 'Sora',
    fontWeight: '500',
    fontSize: 12,
    color: '#8B8B8B',
  },
  sizePriceTextSelected: {
    color: '#C67C4E',
    fontWeight: '600',
  },

  // Quantity Styles
  quantitySection: {
    marginBottom: 32,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  quantityButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#F9F2ED',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C67C4E',
  },
  quantityButtonDisabled: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E0E0E0',
  },
  quantityText: {
    fontFamily: 'Sora',
    fontSize: 20,
    fontWeight: '700',
    color: '#313131',
    minWidth: 40,
    textAlign: 'center',
  },
  
  // Bottom Section Styles
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 60,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
  },
  priceSection: {
    flex: 1,
  },
  priceLabel: {
    fontFamily: 'Sora',
    fontWeight: '500',
    fontSize: 14,
    color: '#8B8B8B',
    marginBottom: 4,
  },
  priceValue: {
    fontFamily: 'Sora',
    fontWeight: '700',
    fontSize: 24,
    color: '#C67C4E',
  },
  priceDetail: {
    fontFamily: 'Sora',
    fontWeight: '500',
    fontSize: 12,
    color: '#A0A0A0',
    marginTop: 2,
  },
  buyButton: {
    backgroundColor: '#C67C4E',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#C67C4E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  buyButtonDisabled: {
    backgroundColor: '#E0E0E0',
    shadowOpacity: 0,
    elevation: 0,
  },
  buyButtonText: {
    fontFamily: 'Sora',
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF',
  },
  buyButtonTextDisabled: {
    color: '#A0A0A0',
  },
  bottomSpacing: {
    height: 40,
  },

  // Toast Styles
  toastContainer: {
    position: 'absolute',
    bottom: 120,
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