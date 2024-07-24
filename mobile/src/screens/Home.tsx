import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import pokemon from '../configs/pokemon';
import CardModal from 'src/components/CardModal';
import { Card } from 'src/components/CardModal';

function Home() {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [cardModalVisible, setCardModalVisible] = useState(false);

  useEffect(() => {
    const fetchFeaturedCards = async () => {
      try {
        let combinedResults: Card[] = [];
        const queries = ['charizard', 'venusaur', 'blastoise'];

        for (const query of queries) {
          const result = await pokemon.card.where({ q: `name:${query}`, pageSize: 1 });
          combinedResults = [...combinedResults, ...result.data];
        }
        setCards(combinedResults);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFeaturedCards();
  }, []);

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
      <Text style={styles.title}>Featured Roulette</Text>
      <FlatList
        data={cards}
        horizontal
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => openCardModal(item)}>
              <Image source={{ uri: item.images.small }} style={styles.image} />
            </TouchableOpacity>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
      <CardModal
        isVisible={cardModalVisible}
        onClose={closeCardModal}
        card={selectedCard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20, // Adjust the padding as needed
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  flatListContent: {
    paddingVertical: 10, // Adjust the padding as needed
  },
  card: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 2,
    marginVertical: 5, // Add vertical margin
  },
  image: {
    width: 150,
    height: 210,
  },
});

export default Home;
