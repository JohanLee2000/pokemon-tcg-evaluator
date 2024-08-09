import React, {useState} from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useCollectionCart } from '../components/CollectionCartContext'; // Adjust the path as necessary
import { styles } from 'src/assets/styles';
import CardModal from 'src/components/CardModal';
import { Card } from 'src/components/CardModal';

function Cart() {
	const { cart } = useCollectionCart();
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
		<Text style={styles.title}>My Cart</Text>
		<FlatList
			data={cart}
			keyExtractor={item => item.id}
			renderItem={({ item }) => (
			  <View style={styles.cartRows}>
				<TouchableOpacity onPress={() => openCardModal(item)}>
				  <Image source={{ uri: item.images.small }} style={styles.cartImage} />
				</TouchableOpacity>
				<View style={styles.cartRowInfo}>
					<Text style={styles.cartRowText}>{item.name}</Text>
				</View>
				<View style={styles.cartRowInfo}>
					<Text style={styles.cartRowText}>Cardmarket Price</Text>
					<Text>${item.cardmarket?.prices.averageSellPrice}</Text>
					{/* <Text style={styles.cartRowText}>TCGPlayer Price</Text>
					<Text>${item.tcgplayer?.prices.normal.market}</Text> */}
				</View>
			  </View>
			)}
		  />
		<CardModal
		  isVisible={cardModalVisible}
		  onClose={closeCardModal}
		  card={selectedCard}
		/>
	  </View>
	);
  }

export default Cart;