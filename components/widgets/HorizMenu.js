import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../assets/styles/colors';

const HorizMenu = ({ tabsItems }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [render, setRender] = useState(tabsItems[0]?.component);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (scrollViewRef.current && activeTab !== null) {
      const offsetX = activeTab * 100; // Remplacez 100 par la largeur de votre onglet
      scrollViewRef.current.scrollTo({ x: offsetX, animated: true });
    }
  }, [activeTab]);

  const handleTabPress = (index) => {
    setActiveTab(index);
    setRender(tabsItems[index].component);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          style
        >
          {tabsItems.map((tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleTabPress(index)}
              style={[styles.tab, { borderBottomWidth: index === activeTab ? 2 : 0 }]}
            >
              <Text style={[styles.tabText, { color: index === activeTab ? colors.primary : 'black' }]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={{ flex: 1 }}>{render}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  scrollContent: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HorizMenu;
