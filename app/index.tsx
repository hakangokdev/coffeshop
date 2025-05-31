import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function IndexPage() {
  useEffect(() => {
    // Redirect to onboarding on app start
    router.replace('/onboarding');
  }, []);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
}); 