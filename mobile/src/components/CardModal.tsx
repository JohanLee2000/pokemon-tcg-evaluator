//When clicked, card modal pops up with card information. Can be used in collections, featured cards, search results, cart.
// CardModal.tsx
import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
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
    prices: {
      averageSellPrice: number;
    };
  };
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

  const attackNames = card.attacks?.map(attack => attack.name).join(', ');

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
      <View style={styles.modalContainer}>
        <Text style={styles.title}>{card.name}</Text>
        <Image source={{ uri: card.images.large }} style={styles.image} />
        {/* Add more card details here */}
		<Text>Market Price: ${card.cardmarket?.prices.averageSellPrice ?? 'N/A'}</Text>
		<Text>HP: {card.hp}</Text>
      <View style={styles.types}>
      <Text>Type: {card.types.join(', ')}</Text>
        {card.types.map((type, index) => (
          <Image key={index} source={typeImages[type]} style={styles.typeImage} resizeMode='contain' />
        ))}
      </View>
		
		{attackNames ? (
          <Text>Attacks: {attackNames}</Text>
        ) : (
          <Text>No attacks found</Text>
        )}
		{card.rarity ? <Text>Rarity: {card.rarity}</Text> : (<Text>Rarity not found</Text>)}
		<Text>Artist: {card.artist}</Text>
		<Text>Pokedex: #{card.nationalPokedexNumbers}</Text>
    <Text>Release Date: {card.set.releaseDate}</Text>
		<Text>Set: {card.set.id} ({card.number}/{card.set.printedTotal}) </Text> 
		<Image source={{ uri: card.set.images.symbol }} style={styles.logoImage} resizeMode='contain' />
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 280,
    marginBottom: 10,
  },
  logoImage: {
	  width: 50,
    height: 50,
  },
  types: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeImage: {
    width: 20,
    height: 20,
  },
});

export default CardModal;
