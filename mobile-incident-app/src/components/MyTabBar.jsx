import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function SimpleTabBar() {
  const handleTabPress = (tabName) => {
    // Add your navigation logic here
    console.log(`${tabName} tab pressed`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => handleTabPress('Home')}
      >
        <Text style={styles.tabText}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => handleTabPress('Profile')}
      >
        <Text style={styles.tabText}>Profile</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => handleTabPress('Tickets')}
      >
        <Text style={[styles.tabText, styles.activeTab]}>Tickets</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 16,
    color: '#6c757d',
  },
  activeTab: {
    color: '#007bff',
    fontWeight: 'bold',
  },
};