import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, TouchableOpacity, Keyboard } from 'react-native';
import Modal from 'react-native-modal';
import pokemon from '../configs/pokemon';
import { Ionicons } from '@expo/vector-icons';
import CardModal from 'src/components/CardModal';
import { Card } from 'src/components/CardModal';
import { styles } from 'src/assets/styles';


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
          <View style={styles.filterModalContainer}>
            <Text style={styles.filterModalTitle}>Filter by</Text>
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


export default Search;
