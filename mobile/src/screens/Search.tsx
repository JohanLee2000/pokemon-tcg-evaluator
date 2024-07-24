import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import Modal from 'react-native-modal';
import pokemon from '../configs/pokemon';
import { Ionicons } from '@expo/vector-icons';
import CardModal from 'src/components/CardModal';
import { Card } from 'src/components/CardModal';


const Search = () => {
  const [query, setQuery] = useState('');
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('Name'); // State for selected filter
  const [filterModalVisible, setFilterModalVisible] = useState(false); // State for modal visibility
  const [selectedCard, setSelectedCard] = useState<Card | null>(null); // State for selected card
  const [cardModalVisible, setCardModalVisible] = useState(false); // State for card modal visibility

  const searchCards = async () => {
    setLoading(true);
    try {
      Keyboard.dismiss();
      let result;
      if (filter === 'Name') {
        result = await pokemon.card.where({ q: `name:${query}` });
      } else if (filter === 'Series') {
        result = await pokemon.set.where({ q: `series:${query}` });
      } else if (filter === 'Types') {
        result = await pokemon.card.where({ q: `types:${query}` });
      }
      setCards(result.data);
      console.log(result.data[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = (selectedFilter: string) => {
    setFilter(selectedFilter);
    setFilterModalVisible(false);
  };

  const openCardModal = (card: Card) => {
    setSelectedCard(card);
    setCardModalVisible(true);
  };

  const closeCardModal = () => {
    setCardModalVisible(false);
    setSelectedCard(null);
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
        {/* Filter  */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Filter by:</Text>
          <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
            <View style={styles.filterContent}>
              <Text style={styles.filterText}>{filter}</Text>
              <Ionicons name="filter" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        {/* Search Button */}
        <View style={styles.buttonContainer}>
          <Button title="Search" onPress={searchCards} disabled={loading} />
        </View>
      </View>
      {/* Cards List*/}
      {loading ? <Text>Loading...</Text> : (
        <FlatList
          data={cards}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity onPress={() => openCardModal(item)}>
                <Image source={{ uri: item.images.small }} style={styles.image} />
              </TouchableOpacity>
            </View>
          )}
          numColumns={2}
          columnWrapperStyle={styles.row} // Add a wrapper style for rows
        />
      )}
      {/* Filter Modal */}
      <Modal
        animationIn="pulse"
        animationOut="bounceOut"
        isVisible={filterModalVisible}
        onBackdropPress={() => setFilterModalVisible(false)}
        onBackButtonPress={() => setFilterModalVisible(false)}
        style={styles.modal}
      >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filter by</Text>
            <Button title="Name" onPress={() => applyFilter('Name')} />
            <Button title="Series" onPress={() => applyFilter('Series')} />
            <Button title="Types" onPress={() => applyFilter('Types')} />
          </View>
      </Modal>
      <CardModal
        isVisible={cardModalVisible}
        onClose={closeCardModal}
        card={selectedCard}
      />
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
    fontSize: 16,
  },
  filterText: {
    marginRight: 5,
    fontSize: 16,
  },
  buttonContainer: {
    paddingHorizontal: 30,
    
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
