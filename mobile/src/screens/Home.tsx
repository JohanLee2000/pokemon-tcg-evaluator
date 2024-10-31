import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, useWindowDimensions, TouchableOpacity, Image } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { styles } from "src/assets/styles";
import pokemon from '../configs/pokemon';
import CardModal from 'src/components/CardModal';
import { Card } from 'src/components/CardModal';


interface CardComponentProps {
  item: Card; // Specify that item is of type Card
  onPress: () => void; // Specify the onPress prop
}

function Home() {
  const [cardRoulette, setCardRoulette] = useState<Card[]>([]);
  const [valuableCards, setValuableCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [cardModalVisible, setCardModalVisible] = useState(false);

  const { width } = useWindowDimensions();
  // Separate refs for each FlatList
  const rouletteRef = useAnimatedRef();
  const valuableRef = useAnimatedRef();

  // Shared values for each FlatList
  const rouletteOffset = useSharedValue(0);
  const valuableOffset = useSharedValue(0);

  const CardComponent: React.FC<CardComponentProps> = React.memo(({ item, onPress }) => {
    return (
      <View style={styles.rouletteCard}>
        <TouchableOpacity onPress={onPress}>
          <Image source={{ uri: item.images.small }} style={styles.image} />
        </TouchableOpacity>
      </View>
    );
  });
  

  useEffect(() => {
    const fetchFeaturedCards = async () => {
      try {
        // Card Roulette
        let rouletteResults: Card[] = [];
        const rouletteQueries = ['charizard', 'darkrai', 'luxray', 'salamence', 'klang', 'swinub', 'latios','gardevoir', 'mewtwo', 'dragonite', 'arceus', 'haunter', 'gible', 'cufant', 'escavalier', 'golurk', 'spheal', 'venomoth', 'riolu', 'trubbish', 'charcadet', 'skarmory', 'torkoal', 'groudon', 'zapdos', 'aggron', 'mantine', 'kingdra', 'rhyperior'];

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
        const valuableQueries = ['swsh12pt5-37', 'xy7-92', 'xy7-98', 'sm5-100', 'bw8-95', 'xy1-2'];

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
  const handleOpenCardModal = useCallback((card) => {
    openCardModal(card);
  }, [openCardModal]);
  

  const closeCardModal = () => {
    setCardModalVisible(false);
    setSelectedCard(null);
  };

  // Separate onScroll handlers for each list
  const onRouletteScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      rouletteOffset.value = e.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      rouletteOffset.value = e.contentOffset.x;
    },
  });

  const onValuableScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      valuableOffset.value = e.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      valuableOffset.value = e.contentOffset.x;
    },
    
  });

  
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.title}>Featured Roulette</Text>
      <View style={styles.flatListContainer}>
        <Animated.FlatList
          ref={rouletteRef}
          data={cardRoulette}
          horizontal
          keyExtractor={(item, index) => `${item.id}-${index}`} // Unique key by combining id and index
          renderItem={({ item }) => (
            <CardComponent item={item} onPress={() => handleOpenCardModal(item)} />

          )}
          showsHorizontalScrollIndicator={false}
          onScroll={onRouletteScroll}
          scrollEventThrottle={16}
          onEndReached={() => {
            // Logic to fetch more cards or duplicate current cards for scrolling effect
            setCardRoulette(prev => [...prev, ...cardRoulette]); // Dummy implementation
          }}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.flatListContent}
          // extraData={cardRoulette} // Pass relevant state here
        />
      </View>
      <Text style={styles.title}>Expensive Cards</Text>
      <View style={styles.flatListContainer}>
        <Animated.FlatList
          ref={valuableRef}
          data={valuableCards}
          horizontal
          keyExtractor={(item, index) => `${item.id}-${index}`} // Ensure unique key by appending index
          renderItem={({ item }) => (
            <CardComponent item={item} onPress={() => handleOpenCardModal(item)} />

          )}
          showsHorizontalScrollIndicator={false}
          onScroll={onValuableScroll}
          scrollEventThrottle={16}
          onEndReached={() => {
            setValuableCards(prev => [...prev, ...valuableCards]); // Dummy implementation
          }}
          onEndReachedThreshold={0.5}
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