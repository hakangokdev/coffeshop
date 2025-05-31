import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, FlatList, Image, StyleSheet } from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { MOCK_PRODUCTS, Product } from '../../data/mockData';
import { useCartStore } from '../../store/cartStore';
import { useFavoritesStore } from '../../store/favoritesStore';
import { MaterialIcons } from '@expo/vector-icons';

export default function MenuScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCartStore();
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavoritesStore();

  const categories = [
    { id: 'all', label: 'Tümü', icon: 'apps' },
    { id: 'hot', label: 'Sıcak Kahve', icon: 'local-fire-department' },
    { id: 'cold', label: 'Soğuk Kahve', icon: 'ac-unit' },
    { id: 'tea', label: 'Çay', icon: 'emoji-food-beverage' },
    { id: 'pastries', label: 'Hamur İşi', icon: 'bakery-dining' },
    { id: 'food', label: 'Yemek', icon: 'restaurant' },
  ];

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product, size: string = 'medium', quantity: number = 1) => {
    addToCart(product, size, quantity);
  };

  const handleToggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product.id);
    }
  };

  const renderCategoryItem = ({ item }: { item: any }) => {
    const isSelected = selectedCategory === item.id;
    return (
      <TouchableOpacity
        style={[
          styles.categoryCard,
          isSelected && styles.selectedCategoryCard
        ]}
        onPress={() => setSelectedCategory(item.id)}
        activeOpacity={0.8}
      >
        <View style={[
          styles.categoryIconContainer,
          isSelected && styles.selectedCategoryIconContainer
        ]}>
          <MaterialIcons 
            name={item.icon} 
            size={20} 
            color={isSelected ? '#FFFFFF' : '#C67C4E'} 
          />
        </View>
        <Text style={[
          styles.categoryText,
          isSelected && styles.selectedCategoryText
        ]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderProduct = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => router.push(`/product/${item.id}`)}
        activeOpacity={0.9}
      >
        <View style={styles.productImageContainer}>
          <Image source={item.image} style={styles.productImage} />
          <TouchableOpacity
            style={[
              styles.favoriteButton,
              isFavorite(item.id) && styles.favoriteButtonActive
            ]}
            onPress={() => handleToggleFavorite(item)}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name={isFavorite(item.id) ? "favorite" : "favorite-border"}
              size={18}
              color={isFavorite(item.id) ? "#FFFFFF" : "#C67C4E"}
            />
          </TouchableOpacity>
          <View style={styles.ratingBadge}>
            <MaterialIcons name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.productDescription} numberOfLines={2}>{item.description}</Text>
          <View style={styles.productFooter}>
            <Text style={styles.productPrice}>₺{item.price.small.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => handleAddToCart(item)}
              activeOpacity={0.8}
            >
              <MaterialIcons name="add" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <MaterialIcons name="restaurant-menu" size={24} color="#FFFFFF" />
          <Text style={styles.headerTitle}>Menümüz</Text>
        </View>
        <View style={styles.headerStats}>
          <Text style={styles.headerStatsText}>{filteredProducts.length} ürün</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <MaterialIcons name="search" size={20} color="#A2A2A2" style={styles.searchIcon} />
            <Searchbar
              placeholder="Kahve, çay veya yemek ara..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchBar}
              inputStyle={styles.searchInput}
              iconColor="transparent"
            />
          </View>
        </View>

        {/* Categories */}
        <LinearGradient
          colors={['#F9F2ED', '#FDFCFB', '#F9F2ED']}
          locations={[0, 0.5, 1]}
          style={styles.categoriesSection}
        >
          <Text style={styles.sectionTitle}>Kategoriler</Text>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
            ItemSeparatorComponent={() => <View style={styles.categorySeparator} />}
          />
        </LinearGradient>

        {/* Products Section Header */}
        <View style={styles.productsHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'Tüm Ürünler' : categories.find(c => c.id === selectedCategory)?.label}
          </Text>
          <Text style={styles.productsCount}>({filteredProducts.length})</Text>
        </View>

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {filteredProducts.map((item, index) => {
            if (index % 2 === 0) {
              const nextItem = filteredProducts[index + 1];
              return (
                <View key={`row-${index}`} style={styles.productRow}>
                  <TouchableOpacity
                    style={styles.productCard}
                    onPress={() => router.push(`/product/${item.id}`)}
                    activeOpacity={0.9}
                  >
                    <View style={styles.productImageContainer}>
                      <Image source={item.image} style={styles.productImage} />
                      <TouchableOpacity
                        style={[
                          styles.favoriteButton,
                          isFavorite(item.id) && styles.favoriteButtonActive
                        ]}
                        onPress={() => handleToggleFavorite(item)}
                        activeOpacity={0.8}
                      >
                        <MaterialIcons
                          name={isFavorite(item.id) ? "favorite" : "favorite-border"}
                          size={18}
                          color={isFavorite(item.id) ? "#FFFFFF" : "#C67C4E"}
                        />
                      </TouchableOpacity>
                      <View style={styles.ratingBadge}>
                        <MaterialIcons name="star" size={12} color="#FFD700" />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.productInfo}>
                      <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                      <Text style={styles.productDescription} numberOfLines={2}>{item.description}</Text>
                      <View style={styles.productFooter}>
                        <Text style={styles.productPrice}>₺{item.price.small.toFixed(2)}</Text>
                        <TouchableOpacity
                          style={styles.addToCartButton}
                          onPress={() => handleAddToCart(item)}
                          activeOpacity={0.8}
                        >
                          <MaterialIcons name="add" size={18} color="#FFFFFF" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                  
                  {nextItem && (
                    <TouchableOpacity
                      style={styles.productCard}
                      onPress={() => router.push(`/product/${nextItem.id}`)}
                      activeOpacity={0.9}
                    >
                      <View style={styles.productImageContainer}>
                        <Image source={nextItem.image} style={styles.productImage} />
                        <TouchableOpacity
                          style={[
                            styles.favoriteButton,
                            isFavorite(nextItem.id) && styles.favoriteButtonActive
                          ]}
                          onPress={() => handleToggleFavorite(nextItem)}
                          activeOpacity={0.8}
                        >
                          <MaterialIcons
                            name={isFavorite(nextItem.id) ? "favorite" : "favorite-border"}
                            size={18}
                            color={isFavorite(nextItem.id) ? "#FFFFFF" : "#C67C4E"}
                          />
                        </TouchableOpacity>
                        <View style={styles.ratingBadge}>
                          <MaterialIcons name="star" size={12} color="#FFD700" />
                          <Text style={styles.ratingText}>{nextItem.rating}</Text>
                        </View>
                      </View>
                      
                      <View style={styles.productInfo}>
                        <Text style={styles.productName} numberOfLines={1}>{nextItem.name}</Text>
                        <Text style={styles.productDescription} numberOfLines={2}>{nextItem.description}</Text>
                        <View style={styles.productFooter}>
                          <Text style={styles.productPrice}>₺{nextItem.price.small.toFixed(2)}</Text>
                          <TouchableOpacity
                            style={styles.addToCartButton}
                            onPress={() => handleAddToCart(nextItem)}
                            activeOpacity={0.8}
                          >
                            <MaterialIcons name="add" size={18} color="#FFFFFF" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  
                  {!nextItem && <View style={styles.productCard} />}
                </View>
              );
            }
            return null;
          })}
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
    backgroundColor: '#C67C4E',
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
    gap: 12,
    marginBottom: 8,
  },
  headerTitle: {
    fontFamily: 'Sora',
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerStats: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  headerStatsText: {
    fontFamily: 'Sora',
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  searchContainer: {
    padding: 20,
    paddingBottom: 16,
  },
  searchWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderRadius: 16,
    paddingLeft: 20,
  },
  searchInput: {
    fontFamily: 'Sora',
    fontSize: 14,
    color: '#313131',
    paddingLeft: 24,
  },
  categoriesSection: {
    paddingBottom: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Sora',
    fontSize: 20,
    fontWeight: '700',
    color: '#313131',
    marginHorizontal: 24,
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    alignItems: 'center',
    minWidth: 110,
    shadowColor: 'rgba(198, 124, 78, 0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 0,
  },
  selectedCategoryCard: {
    backgroundColor: '#C67C4E',
    shadowColor: 'rgba(198, 124, 78, 0.3)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 8,
    transform: [{ scale: 1.02 }],
  },
  categoryIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF5F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedCategoryIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  categoryText: {
    fontFamily: 'Sora',
    fontSize: 13,
    fontWeight: '600',
    color: '#5C5C5C',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  selectedCategoryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  categorySeparator: {
    width: 16,
  },
  productsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  productsCount: {
    fontFamily: 'Sora',
    fontSize: 14,
    fontWeight: '500',
    color: '#A2A2A2',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  productsGrid: {
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginHorizontal: 6,
    padding: 18,
    shadowColor: 'rgba(198, 124, 78, 0.08)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 0,
  },
  productImageContainer: {
    position: 'relative',
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteButtonActive: {
    backgroundColor: '#C67C4E',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontFamily: 'Sora',
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '700',
    color: '#313131',
    marginBottom: 6,
  },
  productDescription: {
    fontFamily: 'Sora',
    fontSize: 12,
    color: '#8B8B8B',
    marginBottom: 12,
    lineHeight: 16,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '700',
    color: '#C67C4E',
  },
  addToCartButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#C67C4E',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#C67C4E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  bottomPadding: {
    height: 30,
    backgroundColor: 'transparent',
  },
}); 