# ☕ CoffeeShop - Premium Coffee Experience Mobile App

<div align="center">
  <img src="https://img.shields.io/badge/React%20Native-0.79.2-blue.svg" alt="React Native Version" />
  <img src="https://img.shields.io/badge/Expo-~53.0.9-black.svg" alt="Expo Version" />
  <img src="https://img.shields.io/badge/TypeScript-~5.8.3-blue.svg" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Platform-iOS%20%7C%20Android-lightgrey.svg" alt="Platform" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License" />
</div>

## 🎯 Overview

CoffeeShop is a modern, feature-rich mobile application designed to deliver a premium coffee ordering experience. Built with React Native and Expo, this app provides a seamless interface for browsing coffee products, managing orders, and creating personalized coffee experiences.

## ✨ Key Features

### 🛍️ **Shopping Experience**
- **Interactive Product Catalog** - Browse through various coffee categories (Hot Coffee, Cold Coffee, Tea & More)
- **Advanced Product Details** - Detailed product information including ingredients, nutritional facts, and sizing options
- **Smart Cart Management** - Add, modify, and manage items with size and customization options
- **Favorites System** - Save and manage favorite products for quick reordering

### 👤 **User Experience**
- **Onboarding Flow** - Smooth introduction with animated welcome screens
- **Profile Management** - Complete user profile with order history and preferences
- **Order Tracking** - Real-time order status updates with multiple delivery options
- **Personalized Recommendations** - AI-driven suggestions based on user preferences

### 🎨 **Design & UI/UX**
- **Modern Material Design** - Beautiful UI with React Native Paper components
- **Smooth Animations** - Fluid transitions and interactive animations
- **Responsive Layout** - Optimized for all screen sizes and orientations
- **Dark/Light Mode Support** - User interface style preferences

### 🔧 **Technical Features**
- **State Management** - Robust state handling with Zustand
- **Type Safety** - Full TypeScript implementation for better code quality
- **Form Handling** - Advanced form management with React Hook Form
- **Navigation** - File-based routing with Expo Router
- **Performance Optimized** - Efficient rendering and memory management

## 🏗️ Architecture

### **Project Structure**
```
coffeshop/
├── app/                          # Main application screens
│   ├── (tabs)/                   # Tab-based navigation
│   │   ├── index.tsx             # Home screen with product catalog
│   │   ├── menu.tsx              # Menu browsing
│   │   ├── cart.tsx              # Shopping cart management
│   │   ├── favorites.tsx         # Favorite products
│   │   └── profile.tsx           # User profile
│   ├── product/                  # Product detail screens
│   ├── onboarding.tsx            # App introduction
│   ├── checkout.tsx              # Order checkout process
│   ├── order-history.tsx         # Past orders
│   ├── profile-edit.tsx          # Profile editing
│   ├── payment-methods.tsx       # Payment management
│   ├── delivery-addresses.tsx    # Address management
│   ├── notifications.tsx         # Push notifications
│   ├── help-support.tsx          # Customer support
│   └── about.tsx                 # App information
├── components/                   # Reusable UI components
│   └── ProductCard.tsx           # Product display component
├── stores/                       # State management
│   ├── cartStore.ts              # Shopping cart state
│   └── favoritesStore.ts         # Favorites state
├── types/                        # TypeScript definitions
│   └── index.ts                  # Core type definitions
├── data/                         # Mock data and constants
│   └── mockData.ts               # Product catalog data
├── constants/                    # App constants
├── assets/                       # Images and static files
└── ...config files
```

### **Core Technologies**

| Technology | Version | Purpose |
|------------|---------|---------|
| React Native | 0.79.2 | Mobile framework |
| Expo | ~53.0.9 | Development platform |
| TypeScript | ~5.8.3 | Type safety |
| Zustand | ^5.0.2 | State management |
| React Native Paper | ^5.12.5 | UI components |
| React Hook Form | ^7.54.0 | Form handling |
| Expo Router | ~5.0.7 | Navigation |
| Expo Linear Gradient | ~14.1.4 | UI gradients |
| React Native SVG | 15.11.2 | Vector graphics |

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/hakangokdev/coffeshop.git
   cd coffeshop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on specific platforms**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 📱 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo development server |
| `npm run android` | Run on Android emulator/device |
| `npm run ios` | Run on iOS simulator/device |
| `npm run web` | Run in web browser |
| `npm run build` | Build for production |

## 🎨 Features Deep Dive

### **Product Management**
- **Multi-category Support**: Coffee, Tea, Pastries, Food items
- **Size Variations**: Small, Medium, Large with dynamic pricing
- **Nutritional Information**: Calories, caffeine content, sugar levels
- **Availability Status**: Real-time stock management
- **Rating System**: User reviews and ratings

### **Shopping Cart**
- **Smart Quantity Management**: Easy increment/decrement controls
- **Size Selection**: Dynamic size options per product
- **Customization Options**: Special requests and modifications
- **Price Calculation**: Real-time total with tax and fees

### **User Profile**
- **Order History**: Complete purchase history with details
- **Favorite Products**: Quick access to preferred items
- **Address Management**: Multiple delivery addresses
- **Payment Methods**: Secure payment option management

### **Delivery & Pickup**
- **Multiple Delivery Types**: Pickup, Delivery, Dine-in options
- **Address Management**: Save multiple delivery locations
- **Order Tracking**: Real-time status updates
- **Estimated Times**: Accurate delivery/pickup time estimates

## 🛠️ Development

### **Code Style**
- ESLint configuration for code quality
- TypeScript strict mode enabled
- Consistent component structure
- Proper error handling

### **State Management**
The app uses Zustand for efficient state management:
- **Cart Store**: Manages shopping cart items and operations
- **Favorites Store**: Handles favorite products functionality
- **Persistence**: State persisted across app sessions

### **Type Safety**
Comprehensive TypeScript interfaces:
- `Product`: Complete product information
- `CartItem`: Shopping cart item structure
- `User`: User profile and preferences
- `Order`: Order information and status

## 📦 Building for Production

### **EAS Build Setup**
1. Install EAS CLI: `npm install -g eas-cli`
2. Configure build: `eas build:configure`
3. Build for Android: `eas build --platform android`
4. Build for iOS: `eas build --platform ios`

### **Environment Configuration**
- Development environment with hot reloading
- Production optimizations enabled
- Asset bundling and compression

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### **Contribution Guidelines**
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- 📧 Email: support@coffeeshop.app
- 📱 In-app help section
- 🐛 [Issue Tracker](https://github.com/yourusername/coffeshop/issues)

## 🙏 Acknowledgments

- React Native community for excellent documentation
- Expo team for the amazing development platform
- Coffee lovers worldwide for inspiration

---

<div align="center">
  <p>Made with ❤️ and ☕ by the CoffeeShop Team</p>
  <p>© 2025 CoffeeShop. All rights reserved.</p>
</div> 