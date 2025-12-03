import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { properties } from '../data/properties'; 

const DetailsScreen = ({ route }) => {
  const { propertyId } = route.params; 
  const [property, setProperty] = useState(null); 

  useEffect(() => {
    
    const foundProperty = properties.find(p => p.id === propertyId);
    setProperty(foundProperty);
  }, [propertyId]); 

  const handleContactAgent = () => {
    Alert.alert('Contact Agent', `You've contacted the agent for ${property.title}!`);
  };

  if (!property) {
    return (
      <View style={styles.noPropertyContainer}>
        <Text>Loading property details or no property found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: property.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{property.title}</Text>
        <Text style={styles.price}>{property.price}</Text>
        <Text style={styles.location}>{property.location}</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Type:</Text>
          <Text style={styles.detailValue}>{property.type}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Bedrooms:</Text>
          <Text style={styles.detailValue}>{property.bedrooms}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Bathrooms:</Text>
          <Text style={styles.detailValue}>{property.bathrooms}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Area:</Text>
          <Text style={styles.detailValue}>{property.area}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Year Built:</Text>
          <Text style={styles.detailValue}>{property.yearBuilt}</Text>
        </View>
        <Text style={styles.descriptionHeader}>Description:</Text>
        <Text style={styles.description}>{property.description}</Text>
        <Button title="Contact Agent" onPress={handleContactAgent} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  noPropertyContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#007bff',
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
    color: '#333',
  },
  detailValue: {
    fontSize: 16,
    color: '#555',
  },
  details: {
    fontSize: 16,
    marginBottom: 15,
    fontStyle: 'italic',
  },
  descriptionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
});

export default DetailsScreen;
