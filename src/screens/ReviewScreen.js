import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ReviewScreen({ navigation, route }) {
  const { booking } = route.params;
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [photos, setPhotos] = useState([]);

  const serviceTags = ['Haircut', 'Beard Trim', 'Styling'];
  const qualityTags = ['Professional', 'Clean', 'Skilled', 'Friendly', 'On Time', 'Good Value'];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos([...photos, result.uri]);
    }
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    const reviewData = {
      rating,
      review,
      tags: selectedTags,
      photos,
      barberId: booking.barber.id,
      serviceId: booking.service.id,
      date: new Date(),
    };

    console.log('Review submitted:', reviewData);
    navigation.navigate('Home');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Write Review</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.barberInfo}>
        <View style={styles.barberImage} />
        <Text style={styles.barberName}>{booking.barber.name}</Text>
        <Text style={styles.serviceInfo}>{booking.service.name}</Text>
      </View>

      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
          >
            <Ionicons
              name={rating >= star ? 'star' : 'star-outline'}
              size={40}
              color={rating >= star ? '#FFD700' : '#ccc'}
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Service Type</Text>
      <View style={styles.tagContainer}>
        {serviceTags.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[styles.tag, selectedTags.includes(tag) && styles.selectedTag]}
            onPress={() => {
              setSelectedTags(
                selectedTags.includes(tag)
                  ? selectedTags.filter(t => t !== tag)
                  : [...selectedTags, tag]
              );
            }}
          >
            <Text style={[styles.tagText, selectedTags.includes(tag) && styles.selectedTagText]}>
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Experience</Text>
      <View style={styles.tagContainer}>
        {qualityTags.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[styles.tag, selectedTags.includes(tag) && styles.selectedTag]}
            onPress={() => {
              setSelectedTags(
                selectedTags.includes(tag)
                  ? selectedTags.filter(t => t !== tag)
                  : [...selectedTags, tag]
              );
            }}
          >
            <Text style={[styles.tagText, selectedTags.includes(tag) && styles.selectedTagText]}>
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.reviewInput}
        placeholder="Share your experience..."
        multiline
        numberOfLines={4}
        value={review}
        onChangeText={setReview}
      />

      <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
        <Ionicons name="camera-outline" size={24} color="#2196F3" />
        <Text style={styles.photoButtonText}>Add Photos</Text>
      </TouchableOpacity>

      {photos.length > 0 && (
        <ScrollView horizontal style={styles.photoList}>
          {photos.map((photo, index) => (
            <Image key={index} source={{ uri: photo }} style={styles.photoThumbnail} />
          ))}
        </ScrollView>
      )}

      <TouchableOpacity 
        style={[styles.submitButton, rating === 0 && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={rating === 0}
      >
        <Text style={styles.submitButtonText}>Submit Review</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  barberInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  barberImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
    marginBottom: 10,
  },
  barberName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  serviceInfo: {
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    gap: 10,
  },
  tag: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  selectedTag: {
    backgroundColor: '#2196F3',
  },
  tagText: {
    color: '#666',
  },
  selectedTagText: {
    color: '#fff',
  },
  reviewInput: {
    margin: 20,
    padding: 15,
    height: 120,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    textAlignVertical: 'top',
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  photoButtonText: {
    color: '#2196F3',
    marginLeft: 10,
  },
  photoList: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  photoThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});