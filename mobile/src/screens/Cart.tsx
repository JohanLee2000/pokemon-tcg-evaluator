import React, {useState} from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';

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
	const handleOpenURL = (url: string) => {
		Linking.openURL(url);
	  };
  
	return (
	  <View style={styles.container}>
		<Text style={styles.title}>My Cart</Text>
		<FlatList
			data={cart}
			keyExtractor={item => item.id}
			renderItem={({ item }) => (
			  <View style={styles.cartRows}>
				<View style={styles.cartRowInfo}>
					<Text style={styles.cartRowText}>{item.name}</Text>
				</View>
				<View style={styles.cartRowInfo}>
					{/* Cardmarket Price Link */}
					{item.cardmarket?.url && (
					<View>
						<Text style={styles.cartRowText}>Cardmarket Price</Text>
						<TouchableOpacity onPress={() => handleOpenURL(item.cardmarket.url)}>
							<Text style={styles.urlText}>€{item.cardmarket?.prices.averageSellPrice ?? 'N/A'} | {item.cardmarket?.prices.avg1} | {item.cardmarket?.prices.trendPrice}</Text>
						</TouchableOpacity>
					</View>
					)}
					{/* TCGPlayer Price Link */}
					{item.tcgplayer?.url && (
					<View>
						<Text style={styles.cartRowText}>TCGPlayer Price</Text>
						<TouchableOpacity onPress={() => handleOpenURL(item.tcgplayer.url)}>
							<Text style={styles.urlText}>${item.tcgplayer?.prices.holofoil.market ?? 'N/A'} | {item.tcgplayer?.prices.holofoil.mid}</Text>
						</TouchableOpacity>
					</View>
					)}
				</View>
				<TouchableOpacity onPress={() => openCardModal(item)}>
				  <Image source={{ uri: item.images.small }} style={styles.cartImage} />
				</TouchableOpacity>
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