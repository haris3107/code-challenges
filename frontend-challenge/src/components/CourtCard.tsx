import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TennisCourt } from '../data/mockData';

interface CourtCardProps {
  court: TennisCourt;
  onPress: () => void;
}


const CourtCard: React.FC<CourtCardProps> = ({ court, onPress }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={14} color="#FFD700" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={14} color="#FFD700" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={14} color="#FFD700" />
      );
    }

    return stars;
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: court.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {court.name}
          </Text>
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {renderStars(court.rating)}
            </View>
            <Text style={styles.ratingText}>
              {court.rating} ({court.reviewCount})
            </Text>
          </View>
        </View>

        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.location} numberOfLines={1}>
            {court.location}
          </Text>
        </View>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Ionicons name="tennisball-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{court.surface}</Text>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="cash-outline" size={16} color="#666" />
            <Text style={styles.detailText}>${court.price}/hr</Text>
          </View>

          {court.indoor && (
            <View style={styles.detailItem}>
              <Ionicons name="home-outline" size={16} color="#666" />
              <Text style={styles.detailText}>Indoor</Text>
            </View>
          )}

          {court.lights && (
            <View style={styles.detailItem}>
              <Ionicons name="bulb-outline" size={16} color="#666" />
              <Text style={styles.detailText}>Lights</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
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
    fontSize: 14,
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
    flex: 1,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});

export default CourtCard;
