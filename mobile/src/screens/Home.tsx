import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import pokemon from '../configs/pokemon';
import CardModal from 'src/components/CardModal';
import { Card } from 'src/components/CardModal';
import { styles } from "src/assets/styles";

function Home() {
  const [cardRoulette, setCardRoulette] = useState<Card[]>([]);
  const [valuableCards, setValuableCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [cardModalVisible, setCardModalVisible] = useState(false);

  useEffect(() => {
    const fetchFeaturedCards = async () => {
      try {
        // Card Roulette
        let rouletteResults: Card[] = [];
        const rouletteQueries = ['charizard', 'darkrai', 'luxray', 'salamence', 'klang', 'swinub', 'gardevoir', 'mewtwo', 'dragonite', 'arceus', 'haunter', 'gible', 'cufant', 'escavalier', 'golurk', 'spheal', 'venomoth', 'riolu', 'trubbish', 'charcadet', 'skarmory', 'torkoal', 'groudon', 'zapdos', 'aggron', 'mantine', 'kingdra', 'rhyperior'];

        //Randomly select 5 pokemon from the list
        const selectedQueries = [];
        while (selectedQueries.length < 6) {
          const randomIndex = Math.floor(Math.random() * rouletteQueries.length);
          const selectedQuery = rouletteQueries[randomIndex];
          if (!selectedQueries.includes(selectedQuery)) {
            selectedQueries.push(selectedQuery);
          }
        }
        for (const query of selectedQueries) {
          const result = await pokemon.card.where({ q: `name:${query}`, pageSize: 1});
          rouletteResults = [...rouletteResults, ...result.data];
        }
        setCardRoulette(rouletteResults);

        // Valuable Cards
        let valuableResults: Card[] = [];
        const valuableQueries = ['swsh12pt5-37', 'xy7-92', 'swsh35-71', 'sm5-100', 'bw8-95', 'xy1-2'];

        for (const query of valuableQueries) {
          const result = await pokemon.card.find(query);
          valuableResults.push(result);
        }
        setValuableCards(valuableResults);

      } catch (error) {
        console.error(error);
        console.log("Could not fetch featured cards");
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
    <View style={styles.homeContainer}>
      <Text style={styles.title}>Featured Roulette</Text>
        <View style={styles.flatListContainer}>
          <FlatList
            data={cardRoulette}
            horizontal
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.rouletteCard}>
                <TouchableOpacity onPress={() => openCardModal(item)}>
                  <Image source={{ uri: item.images.small }} style={styles.image} />
                </TouchableOpacity>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      <Text style={styles.title}>Expensive Cards</Text>
        <View style={styles.flatListContainer}>
          <FlatList
            data={valuableCards}
            horizontal
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.rouletteCard}>
                <TouchableOpacity onPress={() => openCardModal(item)}>
                  <Image source={{ uri: item.images.small }} style={styles.image} />
                </TouchableOpacity>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      <CardModal
        isVisible={cardModalVisible}
        onClose={closeCardModal}
        card={selectedCard}
      />
    </View>
  );
}


export default Home;
