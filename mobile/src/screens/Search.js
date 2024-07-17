// src/screens/Search.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet } from 'react-native';
import pokemon from 'pokemontcgsdk';
import { POKEMON_API_KEY } from '@env';

// Configure the API key for pokemontcgsdk
pokemon.configure({ apiKey: POKEMON_API_KEY });

const Search = () => {
  const [query, setQuery] = useState('');
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchCards = async () => {
    setLoading(true);
    try {
      const result = await pokemon.card.where({ q: `name:${query}` });
      setCards(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for Pokémon cards"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={searchCards} disabled={loading} />
      {loading ? <Text>Loading...</Text> : (
        <FlatList
          data={cards}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            //Can add interactions with card here
            <View style={styles.card}>
              <Image source={{ uri: item.images.small }} style={styles.image} />
              <Text>{item.name}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 70,
    marginRight: 10,
  },
});

export default Search;
