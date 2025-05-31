import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Image, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCartStore } from '../store/cartStore';

const { width } = Dimensions.get('window');

export default function CheckoutScreen() {
  const [deliveryType, setDeliveryType] = useState<'deliver' | 'pickup'>('deliver');
  const [quantity, setQuantity] = useState(1);
  const { items, getTotalPrice } = useCartStore();

  const deliveryFee = deliveryType === 'deliver' ? 1.0 : 0;
  const discount = 1.0;
  const subtotal = getTotalPrice();
  const total = subtotal + deliveryFee - discount;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleOrder = () => {
    console.log('Order placed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Delivery Type Toggle */}
        <View style={styles.deliveryTypeContainer}>
          <TouchableOpacity
            style={[
              styles.deliveryTypeButton,
              deliveryType === 'deliver' && styles.activeDeliveryType
            ]}
            onPress={() => setDeliveryType('deliver')}
            activeOpacity={0.8}
          >
            <MaterialIcons 
              name="delivery-dining" 
              size={20} 
              color={deliveryType === 'deliver' ? '#FFFFFF' : '#8B5A3C'} 
            />
            <Text style={[
              styles.deliveryTypeText,
              deliveryType === 'deliver' && styles.activeDeliveryTypeText
            ]}>
              Teslimat
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.deliveryTypeButton,
              deliveryType === 'pickup' && styles.activeDeliveryType
            ]}
            onPress={() => setDeliveryType('pickup')}
            activeOpacity={0.8}
          >
            <MaterialIcons 
              name="storefront" 
              size={20} 
              color={deliveryType === 'pickup' ? '#FFFFFF' : '#8B5A3C'} 
            />
            <Text style={[
              styles.deliveryTypeText,
              deliveryType === 'pickup' && styles.activeDeliveryTypeText
            ]}>
              Gel Al
            </Text>
          </TouchableOpacity>
        </View>

        {/* Delivery Address Card */}
        <View style={styles.addressCard}>
          <View style={styles.addressHeader}>
            <MaterialIcons name="location-on" size={20} color="#C67C4E" />
            <Text style={styles.deliveryAddressTitle}>Teslimat Adresi</Text>
          </View>
          <View style={styles.addressContent}>
            <Text style={styles.addressStreet}>Jl. Kpg Sutoyo</Text>
            <Text style={styles.addressFull}>
              Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai.
            </Text>
          </View>
          <View style={styles.addressActions}>
            <TouchableOpacity style={styles.addressButton} activeOpacity={0.7}>
              <MaterialIcons name="edit" size={16} color="#C67C4E" />
              <Text style={styles.addressButtonText}>Düzenle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addressButton} activeOpacity={0.7}>
              <MaterialIcons name="note-add" size={16} color="#C67C4E" />
              <Text style={styles.addressButtonText}>Not Ekle</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Product Card */}
        <View style={styles.productCard}>
          <View style={styles.productHeader}>
            <MaterialIcons name="shopping-bag" size={20} color="#C67C4E" />
            <Text style={styles.productSectionTitle}>Sipariş Detayı</Text>
          </View>
          <View style={styles.productContent}>
            <View style={styles.productImageContainer}>
              <Image
                source={require('../assets/images/coffee-2.png')}
                style={styles.productImage}
              />
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>Caffe Mocha</Text>
              <Text style={styles.productSubtext}>Deep Foam</Text>
              <View style={styles.productPriceContainer}>
                <Text style={styles.productPrice}>₺{(subtotal / quantity).toFixed(2)}</Text>
              </View>
            </View>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(-1)}
                activeOpacity={0.7}
              >
                <MaterialIcons name="remove" size={18} color="#8B5A3C" />
              </TouchableOpacity>
              <View style={styles.quantityDisplay}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>
              <TouchableOpacity
                style={[styles.quantityButton, styles.quantityButtonAdd]}
                onPress={() => handleQuantityChange(1)}
                activeOpacity={0.7}
              >
                <MaterialIcons name="add" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Discount Section */}
        <TouchableOpacity style={styles.discountCard} activeOpacity={0.7}>
          <View style={styles.discountContent}>
            <View style={styles.discountIconContainer}>
              <MaterialIcons name="local-offer" size={20} color="#C67C4E" />
            </View>
            <View style={styles.discountTextContainer}>
              <Text style={styles.discountText}>1 İndirim Uygulandı</Text>
              <Text style={styles.discountSubtext}>Daha fazla indirim için tıklayın</Text>
            </View>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={16} color="#A2A2A2" />
        </TouchableOpacity>

        {/* Payment Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <MaterialIcons name="receipt" size={20} color="#C67C4E" />
            <Text style={styles.paymentSummaryTitle}>Ödeme Özeti</Text>
          </View>
          <View style={styles.summaryContent}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Ara Toplam</Text>
              <Text style={styles.summaryValue}>₺{subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Teslimat Ücreti</Text>
              <View style={styles.deliveryFeeContainer}>
                {deliveryFee > 0 && (
                  <Text style={styles.originalDeliveryFee}>₺2.00</Text>
                )}
                <Text style={[styles.summaryValue, deliveryFee === 0 && styles.freeDelivery]}>
                  {deliveryFee === 0 ? 'Ücretsiz' : `₺${deliveryFee.toFixed(2)}`}
                </Text>
              </View>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>İndirim</Text>
              <Text style={styles.discountValue}>-₺{discount.toFixed(2)}</Text>
            </View>
            <View style={styles.dividerLine} />
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Toplam</Text>
              <Text style={styles.totalValue}>₺{total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Payment Section */}
      <View style={styles.bottomSection}>
        <View style={styles.paymentMethodCard}>
          <View style={styles.paymentMethodContent}>
            <View style={styles.walletIconContainer}>
              <MaterialIcons name="account-balance-wallet" size={24} color="#C67C4E" />
            </View>
            <View style={styles.walletDetails}>
              <Text style={styles.walletLabel}>Nakit/Cüzdan</Text>
              <Text style={styles.walletAmount}>₺{total.toFixed(2)}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.paymentDropdown} activeOpacity={0.7}>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#8B5A3C" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.orderButton} 
          onPress={handleOrder}
          activeOpacity={0.9}
        >
          <MaterialIcons name="shopping-cart" size={20} color="#FFFFFF" />
          <Text style={styles.orderButtonText}>Siparişi Onayla</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Sora',
    fontSize: 18,
    fontWeight: '700',
    color: '#2A2A2A',
  },
  headerSpacer: {
    width: 40,
  },
  deliveryTypeContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  deliveryTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  activeDeliveryType: {
    backgroundColor: '#C67C4E',
    shadowColor: '#C67C4E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  deliveryTypeText: {
    fontFamily: 'Sora',
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5A3C',
  },
  activeDeliveryTypeText: {
    color: '#FFFFFF',
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  deliveryAddressTitle: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '700',
    color: '#242424',
  },
  addressContent: {
    marginBottom: 16,
    paddingLeft: 32,
  },
  addressStreet: {
    fontFamily: 'Sora',
    fontSize: 15,
    fontWeight: '600',
    color: '#313131',
    marginBottom: 4,
  },
  addressFull: {
    fontFamily: 'Sora',
    fontSize: 13,
    fontWeight: '400',
    color: '#8B8B8B',
    lineHeight: 18,
  },
  addressActions: {
    flexDirection: 'row',
    gap: 12,
    paddingLeft: 32,
  },
  addressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#FFF5F0',
    borderWidth: 1,
    borderColor: '#F0E6DC',
  },
  addressButtonText: {
    fontFamily: 'Sora',
    fontSize: 12,
    fontWeight: '500',
    color: '#C67C4E',
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  productSectionTitle: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '700',
    color: '#242424',
  },
  productContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 32,
  },
  productImageContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  productInfo: {
    flex: 1,
    marginLeft: 16,
  },
  productName: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '700',
    color: '#242424',
    marginBottom: 4,
  },
  productSubtext: {
    fontFamily: 'Sora',
    fontSize: 12,
    fontWeight: '400',
    color: '#8B8B8B',
    marginBottom: 6,
  },
  productPriceContainer: {
    backgroundColor: '#FFF5F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  productPrice: {
    fontFamily: 'Sora',
    fontSize: 14,
    fontWeight: '600',
    color: '#C67C4E',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonAdd: {
    backgroundColor: '#C67C4E',
    borderColor: '#C67C4E',
  },
  quantityDisplay: {
    minWidth: 30,
    alignItems: 'center',
  },
  quantityText: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '700',
    color: '#2A2A2A',
  },
  discountCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#C67C4E',
  },
  discountContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  discountIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  discountTextContainer: {
    flex: 1,
  },
  discountText: {
    fontFamily: 'Sora',
    fontSize: 14,
    fontWeight: '600',
    color: '#313131',
    marginBottom: 2,
  },
  discountSubtext: {
    fontFamily: 'Sora',
    fontSize: 11,
    fontWeight: '400',
    color: '#8B8B8B',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  paymentSummaryTitle: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '700',
    color: '#242424',
  },
  summaryContent: {
    paddingLeft: 32,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontFamily: 'Sora',
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  summaryValue: {
    fontFamily: 'Sora',
    fontSize: 14,
    fontWeight: '600',
    color: '#242424',
  },
  deliveryFeeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  originalDeliveryFee: {
    fontFamily: 'Sora',
    fontSize: 12,
    fontWeight: '400',
    color: '#999999',
    textDecorationLine: 'line-through',
  },
  freeDelivery: {
    color: '#4CAF50',
  },
  discountValue: {
    fontFamily: 'Sora',
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 12,
  },
  totalRow: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  totalLabel: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '700',
    color: '#242424',
  },
  totalValue: {
    fontFamily: 'Sora',
    fontSize: 18,
    fontWeight: '700',
    color: '#C67C4E',
  },
  bottomSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  walletIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF5F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  walletDetails: {
    flex: 1,
  },
  walletLabel: {
    fontFamily: 'Sora',
    fontSize: 14,
    fontWeight: '600',
    color: '#242424',
    marginBottom: 2,
  },
  walletAmount: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '700',
    color: '#C67C4E',
  },
  paymentDropdown: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderButton: {
    backgroundColor: '#C67C4E',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#C67C4E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  orderButtonText: {
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});