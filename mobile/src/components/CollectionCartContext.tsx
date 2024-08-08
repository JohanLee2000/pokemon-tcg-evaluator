import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Card } from './CardModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


type CollectionCartContextType = {
  collection: Card[];
  cart: Card[];
  addToCollection: (card: Card) => void;
  removeFromCollection: (cardId: string) => void;
  addToCart: (card: Card) => void;
  removeFromCart: (cardId: string) => void;
};

const CollectionCartContext = createContext<CollectionCartContextType | undefined>(undefined);
const COLLECTION_STORAGE_KEY = '@user_collection';
const CART_STORAGE_KEY = '@user_cart';


export const CollectionCartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [collection, setCollection] = useState<Card[]>([]);
  const [cart, setCart] = useState<Card[]>([]);

  useEffect(() => {
    const loadCollection = async () => {
      try {
        const storedCollection = await AsyncStorage.getItem(COLLECTION_STORAGE_KEY);
        if (storedCollection) {
          setCollection(JSON.parse(storedCollection));
        }
      } catch (error) {
        console.error('Failed to load collection from AsyncStorage', error);
      }
    };
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Failed to load cart from AsyncStorage', error);
      }
    };

    loadCollection();
    loadCart();
  }, []);

  useEffect(() => {
    const saveCollection = async () => {
      try {
        await AsyncStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(collection));
      } catch (error) {
        console.error('Failed to save collection to AsyncStorage', error);
      }
    };
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error('Failed to save cart to AsyncStorage', error);
      }
    };

    saveCollection();
    saveCart();
  }, [collection, cart]);

  const addToCollection = (card: Card) => {
    const cardExists = collection.some(existingCard => existingCard.id === card.id);
    if (!cardExists) {
      setCollection(prevCollection => [...prevCollection, card]);
    } else {
		Alert.alert('','Card already exists in the collection', [{ text: 'OK' }]);
    }
  };

  const removeFromCollection = (cardId: string) => {
    setCollection((prevCollection) => prevCollection.filter(card => card.id !== cardId));
  };

  const addToCart = (card: Card) => {
    const cardExists = cart.some(existingCard => existingCard.id === card.id);
    if (!cardExists) {
      setCart(prevCart => [...prevCart, card]);
    } else {
		Alert.alert('','Card has already been added to the cart', [{ text: 'OK' }]);
    }
  };

  const removeFromCart = (cardId: string) => {
    setCart(prevCart => prevCart.filter(card => card.id !== cardId));
  };

  return (
    <CollectionCartContext.Provider value={{ collection, cart, addToCollection, removeFromCollection, addToCart, removeFromCart }}>
      {children}
    </CollectionCartContext.Provider>
  );
};

export const useCollectionCart = (): CollectionCartContextType => {
  const context = useContext(CollectionCartContext);
  if (!context) {
    throw new Error('useCollection must be used within a CollectionCartProvider');
  }
  return context;
};
