import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CourtCard from '../components/CourtCard';
import { RootStackParamList } from '../../App';
import { mockTennisCourts, searchCourts } from '../data/mockData';

type CourtListNavProp = StackNavigationProp<RootStackParamList, 'CourtList'>;
interface CourtListScreenProps {
}

const CourtListScreen: React.FC<CourtListScreenProps> = () => {
  const navigation = useNavigation<CourtListNavProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'name'>('rating');

  const filteredAndSortedCourts = useMemo(() => {
    let courts = searchQuery ? searchCourts(searchQuery) : mockTennisCourts;

    return courts.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.price - b.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [searchQuery, sortBy]);

  const renderSortButton = (type: 'rating' | 'price' | 'name', label: string) => (
    <TouchableOpacity
      style={[styles.sortButton, sortBy === type && styles.activeSortButton]}
      onPress={() => setSortBy(type)}
    >
      <Text style={[styles.sortButtonText, sortBy === type && styles.activeSortButtonText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Tennis Courts</Text>
      <Text style={styles.subtitle}>
        {filteredAndSortedCourts?.length} courts found
      </Text>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search courts, locations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {searchQuery?.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <View style={styles.sortButtons}>
          {renderSortButton('rating', 'Rating')}
          {renderSortButton('price', 'Price')}
          {renderSortButton('name', 'Name')}
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="tennisball-outline" size={64} color="#ccc" />
      <Text style={styles.emptyStateTitle}>No courts found</Text>
      <Text style={styles.emptyStateText}>
        Try adjusting your search or filters
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <FlatList
        data={filteredAndSortedCourts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourtCard court={item} onPress={() => navigation.navigate('CourtDetail', { court: item })} />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortLabel: {
    fontSize: 16,
    color: '#666',
    marginRight: 12,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeSortButton: {
    backgroundColor: '#007AFF',
  },
  sortButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeSortButtonText: {
    color: '#fff',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default CourtListScreen;
