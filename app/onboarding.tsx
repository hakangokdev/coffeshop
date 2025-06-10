import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar, 
  ImageBackground,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastAnimation] = useState(new Animated.Value(0));
  const [fadeAnimation] = useState(new Animated.Value(0));
  const [slideAnimation] = useState(new Animated.Value(50));
  const [buttonScale] = useState(new Animated.Value(1));

  useEffect(() => {
    // Entry animations
    Animated.parallel([
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

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

  const handleGetStarted = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    showToast('Hoş geldiniz! Kahve dünyasına adım atıyorsunuz! ☕');
    
    setTimeout(() => {
      router.replace('/(tabs)');
    }, 1000);
  };

  const handleLearnMore = () => {
    showToast('Yakında daha fazla bilgi gelecek! 📱');
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={styles.container}>
        <ImageBackground 
          source={require('../assets/images/coffee-6.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
          imageStyle={styles.backgroundImageStyle}
        >
          {/* Enhanced Gradient Overlay */}
          <LinearGradient
            colors={[
              'rgba(198, 124, 78, 0.1)',
              'rgba(0, 0, 0, 0.3)', 
              'rgba(0, 0, 0, 0.7)',
              'rgba(0, 0, 0, 0.9)'
            ]}
            locations={[0, 0.4, 0.7, 1]}
            style={styles.gradientOverlay}
          />
          
          {/* App Logo/Brand Section */}
          <Animated.View 
            style={[
              styles.logoSection,
              {
                opacity: fadeAnimation,
                transform: [{ translateY: slideAnimation }]
              }
            ]}
          >
            <View style={styles.logoContainer}>
              <MaterialIcons name="coffee" size={48} color="#C67C4E" />
              <Text style={styles.brandName}>CoffeeShop</Text>
            </View>
            <Text style={styles.brandTagline}>Premium Kahve Deneyimi</Text>
          </Animated.View>
          
          {/* Main Content */}
          <Animated.View 
            style={[
              styles.contentWrapper,
              {
                opacity: fadeAnimation,
                transform: [{ translateY: slideAnimation }]
              }
            ]}
          >
            <View style={styles.textContainer}>
              <Text style={styles.mainTitle}>
                Kahvenin Büyülü{'\n'}Dünyasına Hoş Geldiniz!
              </Text>
              <Text style={styles.subtitle}>
                Her yudum bir hikaye, her fincan bir anı. Size özel hazırlanmış 
                kahve deneyimi için hazır mısınız?
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <TouchableOpacity 
                  style={styles.getStartedButton}
                  onPress={handleGetStarted}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={['#C67C4E', '#A86240']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.buttonGradient}
                  >
                    <MaterialIcons name="arrow-forward" size={24} color="#FFFFFF" />
                    <Text style={styles.buttonText}>Başlayalım</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
              
              <TouchableOpacity 
                style={styles.learnMoreButton}
                onPress={handleLearnMore}
                activeOpacity={0.8}
              >
                <MaterialIcons name="info-outline" size={20} color="#FFFFFF" />
                <Text style={styles.learnMoreText}>Daha Fazla Bilgi</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Decorative Elements */}
          <View style={styles.decorativeElements}>
            <Animated.View 
              style={[
                styles.floatingElement,
                styles.element1,
                {
                  opacity: fadeAnimation,
                  transform: [
                    {
                      rotate: fadeAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      }),
                    },
                  ],
                },
              ]}
            >
              <MaterialIcons name="coffee" size={24} color="rgba(198, 124, 78, 0.3)" />
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.floatingElement,
                styles.element2,
                {
                  opacity: fadeAnimation,
                  transform: [
                    {
                      rotate: fadeAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['360deg', '0deg'],
                      }),
                    },
                  ],
                },
              ]}
            >
              <MaterialIcons name="favorite" size={20} color="rgba(255, 107, 107, 0.3)" />
            </Animated.View>
          </View>
        </ImageBackground>

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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  backgroundImageStyle: {
    transform: [{ translateY: -60 }],
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  
  // Logo Section
  logoSection: {
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 30,
    zIndex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  brandName: {
    fontFamily: 'Sora',
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  brandTagline: {
    fontFamily: 'Sora',
    fontSize: 14,
    fontWeight: '500',
    color: '#E0E0E0',
    marginTop: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  
  // Content Wrapper
  contentWrapper: {
    paddingHorizontal: 30,
    paddingBottom: 80,
    zIndex: 1,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  mainTitle: {
    fontFamily: 'Sora',
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0.5,
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontFamily: 'Sora',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.2,
    textAlign: 'center',
    color: '#E0E0E0',
    marginBottom: 30,
    paddingHorizontal: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  
  // Buttons
  buttonContainer: {
    gap: 16,
    marginBottom: 40,
  },
  getStartedButton: {
    borderRadius: 25,
    shadowColor: '#C67C4E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonText: {
    fontFamily: 'Sora',
    fontWeight: '700',
    fontSize: 18,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  learnMoreText: {
    fontFamily: 'Sora',
    fontWeight: '600',
    fontSize: 16,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  
  // Decorative Elements
  decorativeElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  floatingElement: {
    position: 'absolute',
  },
  element1: {
    top: '20%',
    right: '10%',
  },
  element2: {
    top: '60%',
    left: '15%',
  },
  
  // Toast Styles
  toastContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  toast: {
    backgroundColor: 'rgba(46, 46, 46, 0.95)',
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
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  toastText: {
    fontFamily: 'Sora',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
});