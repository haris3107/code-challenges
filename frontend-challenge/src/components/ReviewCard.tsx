import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Review } from '../data/mockData';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i < rating ? "star" : "star-outline"}
          size={16}
          color="#FFD700"
        />
      );
    }
    return stars;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{review.userName}</Text>
          <View style={styles.stars}>
            {renderStars(review.rating)}
          </View>
        </View>
        <Text style={styles.date}>{formatDate(review.date)}</Text>
      </View>
      
      <Text style={styles.comment}>{review.comment}</Text>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.helpfulButton}>
          <Ionicons name="thumbs-up-outline" size={16} color="#666" />
          <Text style={styles.helpfulText}>
            Helpful ({review.helpful})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  stars: {
    flexDirection: 'row',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  comment: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  helpfulText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});

export default ReviewCard;
