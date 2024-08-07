import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Card } from './CardModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


type CollectionContextType = {
  collection: Card[];
  addToCollection: (card: Card) => void;
  removeFromCollection: (cardId: string) => void;
};

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);
const COLLECTION_STORAGE_KEY = '@user_collection';


export const CollectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [collection, setCollection] = useState<Card[]>([]);

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

    loadCollection();
  }, []);

  useEffect(() => {
    const saveCollection = async () => {
      try {
        await AsyncStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(collection));
      } catch (error) {
        console.error('Failed to save collection to AsyncStorage', error);
      }
    };

    saveCollection();
  }, [collection]);

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

  return (
    <CollectionContext.Provider value={{ collection, addToCollection, removeFromCollection }}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollection = (): CollectionContextType => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error('useCollection must be used within a CollectionProvider');
  }
  return context;
};
