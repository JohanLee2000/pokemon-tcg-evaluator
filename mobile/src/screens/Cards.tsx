import React, {useState} from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useCollection } from '../components/CollectionContext'; // Adjust the path as necessary
import { styles } from 'src/assets/styles';
import CardModal from 'src/components/CardModal';
import { Card } from 'src/components/CardModal';

const Cards: React.FC = () => {
  const { collection } = useCollection();
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [cardModalVisible, setCardModalVisible] = useState(false);

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
      <Text style={styles.title}>My Collection</Text>
      <FlatList
          data={collection}
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
      <CardModal
        isVisible={cardModalVisible}
        onClose={closeCardModal}
        card={selectedCard}
      />
    </View>
  );
};

export default Cards;