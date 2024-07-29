import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import pokemon from '../configs/pokemon';
import CardModal from 'src/components/CardModal';
import { Card } from 'src/components/CardModal';
import { styles } from "src/assets/styles";

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
    <View style={styles.container2}>
      <Text style={styles.title}>Featured Roulette</Text>
      <FlatList
        data={cards}
        horizontal
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card2}>
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


export default Home;
