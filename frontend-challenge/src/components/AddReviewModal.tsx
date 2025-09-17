import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AddReviewModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  courtName: string;
}

const AddReviewModal: React.FC<AddReviewModalProps> = ({
  visible,
  onClose,
  onSubmit,
  courtName,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Rating Required', 'Please select a rating before submitting.');
      return;
    }
    if (comment?.trim()?.length < 10) {
      Alert.alert('Comment Required', 'Please write at least 10 characters for your review.');
      return;
    }

    onSubmit(rating, comment.trim());
    setRating(0);
    setComment('');
    setHoveredRating(0);
    onClose();
  };

  const handleClose = () => {
    setRating(0);
    setComment('');
    setHoveredRating(0);
    onClose();
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isActive = i <= (hoveredRating || rating);
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i)}
          onPressIn={() => setHoveredRating(i)}
          onPressOut={() => setHoveredRating(0)}
          style={styles.starButton}
        >
          <Ionicons
            name={isActive ? "star" : "star-outline"}
            size={32}
            color={isActive ? "#FFD700" : "#ccc"}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Write a Review</Text>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.courtInfo}>
            <Text style={styles.courtName}>{courtName}</Text>
          </View>

          <View style={styles.ratingSection}>
            <Text style={styles.sectionTitle}>Your Rating</Text>
            <View style={styles.starsContainer}>
              {renderStars()}
            </View>
            <Text style={styles.ratingText}>
              {rating === 0 ? 'Tap to rate' : `${rating} star${rating > 1 ? 's' : ''}`}
            </Text>
          </View>

          <View style={styles.commentSection}>
            <Text style={styles.sectionTitle}>Your Review</Text>
            <TextInput
              style={styles.commentInput}
              placeholder="Share your experience playing at this court..."
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              placeholderTextColor="#999"
            />
            <Text style={styles.characterCount}>
              {comment?.length}/500 characters
            </Text>
          </View>

          <View style={styles.guidelines}>
            <Text style={styles.guidelinesTitle}>Review Guidelines</Text>
            <Text style={styles.guidelinesText}>
              • Be honest and constructive{'\n'}
              • Focus on the court conditions and facilities{'\n'}
              • Avoid personal attacks or inappropriate language{'\n'}
              • Help other players make informed decisions
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  closeButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  submitButton: {
    padding: 8,
  },
  submitText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  courtInfo: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 20,
  },
  courtName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  ratingSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  starButton: {
    padding: 4,
  },
  ratingText: {
    fontSize: 16,
    color: '#666',
  },
  commentSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    minHeight: 120,
    marginBottom: 8,
  },
  characterCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  guidelines: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  guidelinesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  guidelinesText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default AddReviewModal;
