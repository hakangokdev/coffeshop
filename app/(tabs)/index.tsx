import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  FlatList, 
  SafeAreaView, 
  StyleSheet, 
  Dimensions,
  StatusBar,
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { MOCK_PRODUCTS, Product } from '../../data/mockData';
import { useCartStore } from '../../store/cartStore';
import { useFavoritesStore } from '../../store/favoritesStore';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastAnimation] = useState(new Animated.Value(0));
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

  const categories = [
    { id: 'all', label: 'Tüm Kahveler', icon: 'coffee' },
    { id: 'hot', label: 'Sıcak Kahve', icon: 'local-fire-department' },
    { id: 'cold', label: 'Soğuk Kahve', icon: 'ac-unit' },
    { id: 'tea', label: 'Çay & Diğer', icon: 'emoji-food-beverage' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(product => product.category === selectedCategory);

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 'medium', 1);
    showToast(`${product.name} sepete eklendi! 🛒`);
  };

  const handleToggleFavorite = (product: Product) => {
    if (favorites.includes(product.id)) {
      removeFromFavorites(product.id);
      showToast(`${product.name} favorilerden çıkarıldı 💔`);
    } else {
      addToFavorites(product.id);
      showToast(`${product.name} favorilere eklendi! ❤️`);
    }
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });

  const headerScale = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0.95],
    extrapolate: 'clamp',
  });

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleProductPress(item.id)}
      activeOpacity={0.8}
    >
      <View style={styles.productImageContainer}>
        <Image source={item.image} style={styles.productImage} />
        <View style={styles.ratingBadge}>
          <MaterialIcons name="star" size={12} color="#FFD700" />
          <Text style={styles.ratingBadgeText}>{item.rating}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.favoriteIcon,
            favorites.includes(item.id) && styles.favoriteIconActive
          ]}
          onPress={() => handleToggleFavorite(item)}
          activeOpacity={0.8}
        >
          <MaterialIcons 
            name={favorites.includes(item.id) ? "favorite" : "favorite-border"} 
            size={18} 
            color={favorites.includes(item.id) ? "#FF6B6B" : "#8B8B8B"} 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productDescription} numberOfLines={1}>
          {item.category === 'hot' ? 'Sıcak Kahve' : item.category === 'cold' ? 'Soğuk/Sıcak' : 'Özel Karışım'}
        </Text>
        <View style={styles.productFooter}>
          <Text style={styles.productPrice}>₺{item.price.small.toFixed(2)}</Text>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={() => handleAddToCart(item)}
            activeOpacity={0.8}
          >
            <MaterialIcons name="add" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSpecialOffer = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.specialOfferCard}
      onPress={() => handleProductPress(item.id)}
      activeOpacity={0.9}
    >
      <View style={styles.specialOfferImageContainer}>
        <Image source={item.image} style={styles.specialOfferImage} />
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>%20</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.favoriteIconSmall,
            favorites.includes(item.id) && styles.favoriteIconActive
          ]}
          onPress={() => handleToggleFavorite(item)}
          activeOpacity={0.8}
        >
          <MaterialIcons 
            name={favorites.includes(item.id) ? "favorite" : "favorite-border"} 
            size={14} 
            color={favorites.includes(item.id) ? "#FF6B6B" : "#8B8B8B"} 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.specialOfferContent}>
        <Text style={styles.specialOfferName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.specialOfferDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.specialOfferFooter}>
          <View style={styles.priceContainer}>
            <Text style={styles.originalPrice}>₺{(item.price.small * 1.25).toFixed(2)}</Text>
            <Text style={styles.specialOfferPrice}>₺{item.price.small.toFixed(2)}</Text>
          </View>
          <TouchableOpacity 
            style={styles.specialOfferButton} 
            onPress={() => handleAddToCart(item)}
            activeOpacity={0.8}
          >
            <MaterialIcons name="add" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryChip = (category: any, index: number) => {
    const isSelected = selectedCategory === category.id;
    return (
      <TouchableOpacity
        key={category.id}
        style={[
          styles.categoryChip,
          isSelected && styles.selectedCategoryChip
        ]}
        onPress={() => setSelectedCategory(category.id)}
        activeOpacity={0.8}
      >
        <MaterialIcons 
          name={category.icon} 
          size={18} 
          color={isSelected ? '#FFFFFF' : '#8B8B8B'} 
          style={styles.categoryIcon}
        />
        <Text style={[
          styles.categoryText,
          isSelected && styles.selectedCategoryText
        ]}>
          {category.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#C67C4E" />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <Animated.View style={[
          styles.headerSection, 
          { 
            opacity: headerOpacity,
            transform: [{ scale: headerScale }]
          }
        ]}>
          {/* Location & Notification */}
          <View style={styles.topBar}>
            <View style={styles.locationContainer}>
              <View style={styles.locationInfo}>
                <Text style={styles.locationLabel}>Lokasyon</Text>
                <TouchableOpacity style={styles.locationRow} activeOpacity={0.8}>
                  <MaterialIcons name="location-on" size={16} color="#FFFFFF" />
                  <Text style={styles.locationText}>İstanbul, Kadıköy</Text>
                  <MaterialIcons name="keyboard-arrow-down" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.notificationButton} activeOpacity={0.8}>
              <MaterialIcons name="notifications-none" size={24} color="#FFFFFF" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>

          {/* Welcome Text */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Günaydın! ☀️</Text>
            <Text style={styles.welcomeSubtext}>Bugün hangi lezzeti tercih edersiniz?</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TouchableOpacity style={styles.searchBar} activeOpacity={0.8}>
              <MaterialIcons name="search" size={20} color="#A0A0A0" />
              <Text style={styles.searchText}>Kahve ara...</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton} activeOpacity={0.8}>
              <MaterialIcons name="tune" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Promo Banner */}
        <View style={styles.promoBannerContainer}>
          <TouchableOpacity style={styles.promoBanner} activeOpacity={0.95}>
            <Image 
              source={require('../../assets/images/coffee-1.png')} 
              style={styles.bannerImage}
            />
            <LinearGradient
              colors={[
                'rgba(198, 124, 78, 0.1)',
                'rgba(139, 69, 19, 0.7)', 
                'rgba(0, 0, 0, 0.8)'
              ]}
              locations={[0, 0.6, 1]}
              style={styles.bannerOverlay}
            >
              <View style={styles.bannerContent}>
                <View style={styles.promoTagContainer}>
                  <LinearGradient
                    colors={['#FF6B6B', '#FF8E53']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.promoTag}
                  >
                    <MaterialIcons name="local-offer" size={16} color="#FFFFFF" />
                    <Text style={styles.promoTagText}>Özel Fırsat</Text>
                  </LinearGradient>
                  <View style={styles.discountCircle}>
                    <Text style={styles.discountPercentage}>%25</Text>
                    <Text style={styles.discountLabel}>İndirim</Text>
                  </View>
                </View>
                
                <View style={styles.bannerTextContainer}>
                  <Text style={styles.bannerTitle}>Premium Kahve{'\n'}Deneyimi</Text>
                  <Text style={styles.bannerSubtitle}>
                    İlk siparişinizde özel indirim fırsatı! 
                    En kaliteli kahveleri keşfedin.
                  </Text>
                </View>

                <TouchableOpacity style={styles.bannerButton} activeOpacity={0.8}>
                  <LinearGradient
                    colors={['#C67C4E', '#A86240']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.bannerButtonGradient}
                  >
                    <MaterialIcons name="shopping-cart" size={18} color="#FFFFFF" />
                    <Text style={styles.bannerButtonText}>Hemen Sipariş Ver</Text>
                    <MaterialIcons name="arrow-forward" size={16} color="#FFFFFF" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <LinearGradient
          colors={['#F9F2ED', '#FDFCFB', '#F9F2ED']}
          locations={[0, 0.5, 1]}
          style={styles.categoriesSection}
        >
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>Kategoriler</Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.categoriesScroll}
            style={styles.categoriesScrollView}
          >
            {categories.map(renderCategoryChip)}
          </ScrollView>
        </LinearGradient>

        {/* Products Grid */}
        <LinearGradient
          colors={['#FDFCFB', '#F9F2ED']}
          locations={[0, 1]}
          style={styles.productsSection}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popüler Kahveler</Text>
            <TouchableOpacity onPress={() => router.push('/menu')} activeOpacity={0.8}>
              <Text style={styles.seeAllText}>Tümünü Gör →</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredProducts.slice(0, 4)}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.productRow}
            scrollEnabled={false}
            contentContainerStyle={styles.productsContainer}
          />
        </LinearGradient>

        {/* Special Offers Section */}
        <LinearGradient
          colors={['#F9F2ED', '#FDFCFB']}
          locations={[0, 1]}
          style={styles.specialOffersSection}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Senin İçin Özel</Text>
            <TouchableOpacity onPress={() => router.push('/menu')} activeOpacity={0.8}>
              <Text style={styles.seeAllText}>Tümünü Gör →</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredProducts.slice(4, 7)}
            renderItem={renderSpecialOffer}
            keyExtractor={(item) => `special-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.specialOffersList}
          />
        </LinearGradient>

        {/* Bottom Spacing */}
        <LinearGradient
          colors={['#FDFCFB', '#F9F2ED']}
          locations={[0, 1]}
          style={styles.bottomSpacing}
        />
      </ScrollView>

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
  scrollContent: {
    flexGrow: 1,
    backgroundColor: '#F9F2ED',
  },
  headerSection: {
    backgroundColor: '#C67C4E',
    paddingTop: 40,
    paddingBottom: 32,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    marginBottom: 24,
    marginTop: 10,
  },
  locationContainer: {
    flex: 1,
  },
  locationInfo: {
    alignItems: 'flex-start',
  },
  locationLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Sora',
    fontWeight: '500',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontFamily: 'Sora',
    fontWeight: '700',
  },
  notificationButton: {
    position: 'relative',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    backgroundColor: '#FF6B6B',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  welcomeContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontFamily: 'Sora',
    fontWeight: '700',
    marginBottom: 6,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'Sora',
    fontWeight: '500',
    lineHeight: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 16,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  searchText: {
    color: '#A0A0A0',
    fontSize: 14,
    fontFamily: 'Sora',
    fontWeight: '500',
    flex: 1,
  },
  filterButton: {
    backgroundColor: '#8B4513',
    padding: 16,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  promoBannerContainer: {
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 28,
  },
  promoBanner: {
    height: 180,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 24,
    justifyContent: 'space-between',
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  promoTagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  promoTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  promoTagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Sora',
  },
  discountCircle: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  discountPercentage: {
    fontSize: 14,
    fontWeight: '800',
    color: '#C67C4E',
    fontFamily: 'Sora',
    lineHeight: 16,
  },
  discountLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#8B4513',
    fontFamily: 'Sora',
    lineHeight: 12,
  },
  bannerTextContainer: {
    alignItems: 'center',
    gap: 8,
    marginVertical: 20,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Sora',
    lineHeight: 36,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  bannerSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Sora',
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  bannerButton: {
    borderRadius: 25,
    shadowColor: '#C67C4E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    alignSelf: 'center',
  },
  bannerButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
  },
  bannerButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Sora',
  },
  categoriesSection: {
    paddingTop: 32,
    paddingBottom: 40,
    marginBottom: 8,
  },
  categoryHeader: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#313131',
    fontFamily: 'Sora',
    letterSpacing: 0.3,
  },
  categoriesScrollView: {
    backgroundColor: 'transparent',
    overflow: 'visible',
  },
  categoriesScroll: {
    paddingHorizontal: 24,
    gap: 18,
    paddingVertical: 8,
  },
  categoryChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: 'rgba(0, 0, 0, 0.04)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
    minWidth: 140,
    borderWidth: 0.5,
    borderColor: 'rgba(198, 124, 78, 0.08)',
  },
  selectedCategoryChip: {
    backgroundColor: '#C67C4E',
    shadowColor: 'rgba(198, 124, 78, 0.25)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 8,
    borderColor: 'transparent',
    transform: [{ scale: 1.03 }],
  },
  categoryIcon: {
    marginRight: 10,
  },
  categoryText: {
    fontSize: 14,
    color: '#6B6B6B',
    fontFamily: 'Sora',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  selectedCategoryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  productsSection: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 40,
    marginBottom: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#313131',
    fontFamily: 'Sora',
    letterSpacing: 0.5,
  },
  seeAllText: {
    fontSize: 14,
    color: '#C67C4E',
    fontFamily: 'Sora',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  productsContainer: {
    gap: 20,
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 20,
    width: (width - 68) / 2,
    shadowColor: 'rgba(198, 124, 78, 0.08)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 0,
    transform: [{ scale: 1 }],
  },
  productImageContainer: {
    position: 'relative',
    marginBottom: 16,
    borderRadius: 24,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 140,
    borderRadius: 24,
    resizeMode: 'cover',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.85)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  ratingBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Sora',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  favoriteIconActive: {
    backgroundColor: 'rgba(255, 107, 107, 0.15)',
    borderColor: 'rgba(255, 107, 107, 0.3)',
    borderWidth: 1,
  },
  favoriteIconSmall: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  productInfo: {
    gap: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#313131',
    fontFamily: 'Sora',
    letterSpacing: 0.3,
  },
  productDescription: {
    fontSize: 12,
    color: '#8B8B8B',
    fontFamily: 'Sora',
    fontWeight: '500',
    marginBottom: 6,
    lineHeight: 16,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#C67C4E',
    fontFamily: 'Sora',
    letterSpacing: 0.5,
  },
  addButton: {
    backgroundColor: '#C67C4E',
    padding: 14,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#C67C4E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    transform: [{ scale: 1 }],
  },
  specialOffersSection: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 40,
    marginBottom: 0,
  },
  specialOffersList: {
    gap: 20,
    paddingRight: 24,
  },
  specialOfferCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 20,
    width: 260,
    shadowColor: 'rgba(198, 124, 78, 0.08)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 0,
  },
  specialOfferImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  specialOfferImage: {
    width: '100%',
    height: 120,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'Sora',
  },
  specialOfferContent: {
    gap: 8,
  },
  specialOfferName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#313131',
    fontFamily: 'Sora',
  },
  specialOfferDescription: {
    fontSize: 12,
    color: '#8B8B8B',
    fontFamily: 'Sora',
    fontWeight: '500',
    marginBottom: 4,
    lineHeight: 16,
  },
  specialOfferFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    alignItems: 'flex-start',
  },
  originalPrice: {
    fontSize: 12,
    color: '#A0A0A0',
    fontFamily: 'Sora',
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  specialOfferPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#C67C4E',
    fontFamily: 'Sora',
  },
  specialOfferButton: {
    backgroundColor: '#C67C4E',
    padding: 10,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#C67C4E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  bottomSpacing: {
    height: 100,
    backgroundColor: 'transparent',
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