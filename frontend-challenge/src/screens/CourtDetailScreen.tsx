import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';

import { Review } from '../data/mockData';
import { RootStackParamList } from '../../App';
import ReviewCard from '../components/ReviewCard';
import AddReviewModal from '../components/AddReviewModal';

type CourtDetailRouteProp = RouteProp<RootStackParamList, 'CourtDetail'>;


const CourtDetailScreen: React.FC = () => {
  const route = useRoute<CourtDetailRouteProp>();
  const navigation = useNavigation();
  const { court } = route.params;

  const [showAddReview, setShowAddReview] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(court.reviews);

  const renderStars = (rating: number, size: number = 20) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={size} color="#FFD700" />);
    }

    if (hasHalfStar) {
      stars.push(<Ionicons key="half" name="star-half" size={size} color="#FFD700" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={size} color="#FFD700" />
      );
    }

    return stars;
  };

  const handleAddReview = (rating: number, comment: string) => {
    const newReview: Review = {
      id: `review-${Date.now()}`,
      userId: 'current-user',
      userName: 'You',
      rating,
      comment,
      date: new Date().toISOString(),
      helpful: 0,
    };

    setReviews(prev => [newReview, ...prev]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: court.image }} style={styles.image} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Court Info */}
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name}>{court.name}</Text>
            <View style={styles.ratingContainer}>
              <View style={styles.stars}>{renderStars(court.rating, 18)}</View>
              <Text style={styles.ratingText}>
                {court.rating} ({court.reviewCount} reviews)
              </Text>
            </View>
          </View>

          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={20} color="#666" />
            <Text style={styles.location}>{court.location}</Text>
          </View>

          <Text style={styles.address}>{court.address}</Text>

          {/* Quick Info */}
          <View style={styles.quickInfo}>
            <View style={styles.infoItem}>
              <Ionicons name="tennisball-outline" size={20} color="#007AFF" />
              <Text style={styles.infoLabel}>Surface</Text>
              <Text style={styles.infoValue}>{court.surface}</Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="cash-outline" size={20} color="#007AFF" />
              <Text style={styles.infoLabel}>Price</Text>
              <Text style={styles.infoValue}>${court.price}/hr</Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons
                name={court.indoor ? 'home-outline' : 'sunny-outline'}
                size={20}
                color="#007AFF"
              />
              <Text style={styles.infoLabel}>Type</Text>
              <Text style={styles.infoValue}>{court.indoor ? 'Indoor' : 'Outdoor'}</Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons
                name={court.lights ? 'bulb-outline' : 'moon-outline'}
                size={20}
                color="#007AFF"
              />
              <Text style={styles.infoLabel}>Lighting</Text>
              <Text style={styles.infoValue}>{court.lights ? 'Yes' : 'No'}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{court.description}</Text>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesContainer}>
              {(court.amenities ?? []).map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Reviews Section */}
          <View style={styles.section}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionTitle}>Reviews ({reviews?.length})</Text>
              <TouchableOpacity
                style={styles.addReviewButton}
                onPress={() => setShowAddReview(true)}
              >
                <Ionicons name="add" size={20} color="#007AFF" />
                <Text style={styles.addReviewText}>Add Review</Text>
              </TouchableOpacity>
            </View>

            {reviews?.length === 0 ? (
              <View style={styles.noReviews}>
                <Ionicons name="chatbubbles-outline" size={48} color="#ccc" />
                <Text style={styles.noReviewsText}>No reviews yet</Text>
                <Text style={styles.noReviewsSubtext}>
                  Be the first to review this court!
                </Text>
              </View>
            ) : ((reviews ?? []).map(review => <ReviewCard key={review.id} review={review} />)
            )}
          </View>
        </View>
      </ScrollView>

      <AddReviewModal
        visible={showAddReview}
        onClose={() => setShowAddReview(false)}
        onSubmit={handleAddReview}
        courtName={court.name}
      />
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 16,
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  address: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  quickInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    gap: 16,
  },
  infoItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  amenityText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addReviewText: {
    fontSize: 14,
    color: '#007AFF',
    marginLeft: 4,
    fontWeight: '500',
  },
  noReviews: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noReviewsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 12,
    marginBottom: 4,
  },
  noReviewsSubtext: {
    fontSize: 14,
    color: '#999',
  },
});

export default CourtDetailScreen;
