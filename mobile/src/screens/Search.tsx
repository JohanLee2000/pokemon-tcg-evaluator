import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import pokemon from 'pokemontcgsdk';
import { POKEMON_API_KEY } from '@env';

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
  const [filter, setFilter] = useState('name'); // State for selected filter

  const searchCards = async () => {
    setLoading(true);
    try {
      let result;
      if (filter === 'name') {
        result = await pokemon.card.where({ q: `name:${query}` });
      } else if (filter === 'series') {
        result = await pokemon.set.where({ q: `series:${query}` });
      } else if (filter === 'types') {
        result = await pokemon.card.where({ q: `types:${query}` });
      }
      setCards(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
          <Picker
            selectedValue={filter}
            style={styles.picker}
            onValueChange={(itemValue) => setFilter(itemValue)}
          >
            <Picker.Item label="Name" value="name" />
            <Picker.Item label="Series" value="series" />
            <Picker.Item label="Types" value="types" />
          </Picker>
        </View>
        <Button title="Search" onPress={searchCards} disabled={loading} />
      </View>
      {loading ? <Text>Loading...</Text> : (
        <FlatList
          data={cards}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            //Can add interactions with card here. For Sets, use item.images.symbol or item.images.logo
            <View style={styles.card}>
              <Image source={{ uri: item.images.small }} style={styles.image} />
            </View>
          )}
          numColumns={2}
          columnWrapperStyle={styles.row} // Add a wrapper style for rows
        />
      )}
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
    marginBottom: 0,
    paddingHorizontal: 10,
  },
  inputContainer: {
    marginHorizontal: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  filterLabel: {
    marginRight: 10,
    paddingHorizontal: 10,
  },
  picker: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
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
});

export default Search;
