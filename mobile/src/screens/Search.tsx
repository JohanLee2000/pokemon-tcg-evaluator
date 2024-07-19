import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import pokemon from 'pokemontcgsdk';
import { POKEMON_API_KEY } from '@env';
import { Ionicons } from '@expo/vector-icons';

// Configure the API key for pokemontcgsdk
pokemon.configure({ apiKey: POKEMON_API_KEY });

type Card = {
  id: string;
  images: {
    small: string;
    large: string;
  };
};

const Search = () => {
  const [query, setQuery] = useState('');
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('Name'); // State for selected filter
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  const searchCards = async () => {
    setLoading(true);
    try {
      let result;
      if (filter === 'Name') {
        result = await pokemon.card.where({ q: `name:${query}` });
      } else if (filter === 'Series') {
        result = await pokemon.set.where({ q: `series:${query}` });
      } else if (filter === 'Types') {
        result = await pokemon.card.where({ q: `types:${query}` });
      }
      setCards(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = (selectedFilter: string) => {
    setFilter(selectedFilter);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter search term here"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={searchCards} // Trigger search on keyboard submit
          returnKeyType="go" // Change the keyboard button to "Search"
        />
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Filter by:</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.filterContent}>
              <Text style={styles.filterText}>{filter}</Text>
              <Ionicons name="filter" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <Button title="Search" onPress={searchCards} disabled={loading} />
      </View>
      {loading ? <Text>Loading...</Text> : (
        <FlatList
          data={cards}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.images.small }} style={styles.image} />
            </View>
          )}
          numColumns={2}
          columnWrapperStyle={styles.row} // Add a wrapper style for rows
        />
      )}

      <Modal
        animationIn="pulse"

        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        style={styles.modal}
      >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filter by</Text>
            <Button title="Name" onPress={() => applyFilter('Name')} />
            <Button title="Series" onPress={() => applyFilter('Series')} />
            <Button title="Types" onPress={() => applyFilter('Types')} />
          </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 3,
    paddingHorizontal: 10,
  },
  inputContainer: {
    marginHorizontal: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  filterContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterLabel: {
    marginRight: 7,
    paddingHorizontal: 10,
  },
  filterText: {
    marginRight: 5,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    width: 150,
    height: 210,
  },
  row: {
    justifyContent: 'space-between',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Search;
