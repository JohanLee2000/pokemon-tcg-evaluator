//When clicked, card modal pops up with card information. Can be used in collections, featured cards, search results, cart.
// CardModal.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { colors, styles } from 'src/assets/styles';
import { useCollectionCart } from './CollectionCartContext'; // Adjust the path as necessary
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { fireSymbol, waterSymbol, grassSymbol, darkSymbol, dragonSymbol, electricSymbol, fairySymbol, fightingSymbol, normalSymbol, psychicSymbol, metalSymbol } from "../assets/images"


export type Card = {
  id: string;
  name: string;
  images: {
    small: string;
    large: string;
  };
  hp: string;
  types: string[];
  artist: string;
  nationalPokedexNumbers: number;
  number: number;
  rarity?: string;
  cardmarket?: {
    url: string;
    prices: {
      averageSellPrice: number;
      avg1: number;
      avg7: number;
      avg30: number;
      trendPrice: number;
    };
  };
  tcgplayer?: {
    url: string;
    prices: {
      holofoil: {
        market: number;
        low: number;
        mid: number;
        high: number;
      }
    }
  }
  attacks?: {
    name: string;
  }[];
  set?: {
    id: string;
    releaseDate: string;
    printedTotal: number;
	images: {
		logo: string;
		symbol: string;
	}
  };
  [key: string]: any; // Add other card properties you might need
};

type CardModalProps = {
  isVisible: boolean;
  onClose: () => void;
  card: Card | null;
};

const CardModal: React.FC<CardModalProps> = ({ isVisible, onClose, card }) => {
  if (!card) return null;

  //Collection and Cart handling
  const { collection, cart, addToCollection, removeFromCollection, addToCart, removeFromCart } = useCollectionCart();
  const handleAddToCollection = () => {
    addToCollection(card);
    onClose();
  };
  const handleRemoveFromCollection = () => {
    removeFromCollection(card.id);
    onClose();
  };
  const handleAddToCart = () => {
    addToCart(card);
    onClose();
  };
  const handleRemoveFromCart = () => {
    removeFromCart(card.id);
    onClose();
  };
  const isCardInCollection = collection.some(c => c.id === card.id);
  const isCardInCart = cart.some(c => c.id === card.id);


  const typeImages = {
    Fire: fireSymbol,
    Water: waterSymbol,
    Grass: grassSymbol,
    Darkness: darkSymbol,
    Dragon: dragonSymbol,
    Lightning: electricSymbol,
    Fairy: fairySymbol,
    Fighting: fightingSymbol,
    Colorless: normalSymbol,
    Psychic: psychicSymbol,
    Metal: metalSymbol,
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
    >
      <View style={styles.cardModalContainer}>

        {/* Cart Buttons */}
        <Text style={styles.title}>{card.name}</Text>
        {!isCardInCart && <TouchableOpacity style={styles.cartAddButton} onPress={handleAddToCart}>
          <MaterialCommunityIcons name="cart" color='white' size={20} />
        </TouchableOpacity>}
        {isCardInCart && <TouchableOpacity style={styles.cartRemoveButton} onPress={handleRemoveFromCart}>
          <MaterialCommunityIcons name="cart" color='white' size={20} />
        </TouchableOpacity>}

        <Image source={{ uri: card.images.large }} style={styles.cardImage} />
        {/* Add more card details here */}
        {card.cardmarket?.prices.averageSellPrice ? <Text>Market Price: ${card.cardmarket?.prices.averageSellPrice}</Text> : <Text>Market Price: ${card.tcgplayer?.prices.holofoil.market ?? 'N/A'}</Text>}
        <Text>HP: {card.hp}</Text>
          <View style={styles.types}>
          <Text>Type: {card.types.join(', ')}</Text>
            {card.types.map((type, index) => (
              <Image key={index} source={typeImages[type]} style={styles.typeImage} resizeMode='contain' />
            ))}
          </View>
        
        {card.rarity ? <Text>Rarity: {card.rarity}</Text> : (<Text>Rarity not found</Text>)}
        <Text>Artist: {card.artist}</Text>
        <Text>Pokedex: #{card.nationalPokedexNumbers}</Text>
        <Text>Release Date: {card.set.releaseDate}</Text>
        <Text>Set: {card.set.id} ({card.number}/{card.set.printedTotal}) </Text> 
        <Image source={{ uri: card.set.images.symbol }} style={styles.logoImage} resizeMode='contain' />

        {/* Buttons */}
        {!isCardInCollection && <TouchableOpacity style={styles.addButton} onPress={handleAddToCollection}>
          <Text style={styles.buttonText}>Add to Collection</Text>
        </TouchableOpacity>}
        {isCardInCollection && <TouchableOpacity style={styles.removeButton} onPress={handleRemoveFromCollection}>
          <Text style={styles.buttonText}>Remove From Collection</Text>
        </TouchableOpacity>}

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
        
      </View>
    </Modal>
  );
};



export default CardModal;
