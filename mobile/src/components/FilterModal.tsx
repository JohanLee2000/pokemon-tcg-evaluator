import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

import Modal from 'react-native-modal';
import DropdownSelector from './DropdownSelector';
import { styles } from 'src/assets/styles';

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  applyFilter: (filter: string, value?: string) => void;
}

const rarityLevels = [
	{ label: 'Common', value: 'Common' },
	{ label: 'Rare', value: 'Rare' },
	{ label: 'Promo', value: 'Promo' },
	{ label: 'LEGEND', value: 'LEGEND' },
	{ label: 'Rare ACE', value: 'Rare ACE' },
	{ label: 'Rare BREAK', value: 'Rare BREAK' },
	{ label: 'Rare Holo', value: 'Rare Holo' },
	{ label: 'Rare Holo EX', value: 'Rare Holo EX' },
	{ label: 'Rare Holo GX', value: 'Rare Holo GX' },
	{ label: 'Rare Holo LV.X', value: 'Rare Holo LV.X' },
	{ label: 'Rare Holo Star', value: 'Rare Holo Star' },
	{ label: 'Rare Holo V', value: 'Rare Holo V' },
	{ label: 'Rare Holo VMAX', value: 'Rare Holo VMAX' },
	{ label: 'Rare Prime', value: 'Rare Prime' },
	{ label: 'Rare Rainbow', value: 'Rare Rainbow' },
	{ label: 'Rare Secret', value: 'Rare Secret' },
	{ label: 'Rare Shining', value: 'Rare Shining' },
	{ label: 'Rare Shiny', value: 'Rare Shiny' },
	{ label: 'Rare Shiny GX', value: 'Rare Shiny GX' },
	{ label: 'Rare Ultra', value: 'Rare Ultra' },
  ];

const typeLabels = [
  { label: 'Fire', value: 'Fire' },
  { label: 'Water', value: 'Water' },
  { label: 'Grass', value: 'Grass' },
  { label: 'Darkness', value: 'Darkness' },
  { label: 'Dragon', value: 'Dragon' },
  { label: 'Lightning', value: 'Lightning' },
  { label: 'Fairy', value: 'Fairy' },
  { label: 'Fighting', value: 'Fighting' },
  { label: 'Colorless', value: 'Colorless' },
  { label: 'Psychic', value: 'Psychic' },
  { label: 'Metal', value: 'Metal' },
]; 

const FilterModal: React.FC<FilterModalProps> = ({ isVisible, onClose, applyFilter }) => {
	const [selectedRarity, setSelectedRarity] = useState<string | undefined>();
  const [selectedType, setSelectedType] = useState<string | undefined>();
	return (
    <Modal
      animationIn="pulse"
      animationOut="bounceOut"
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
    >
      <View style={styles.filterModalContainer}>
        <Text style={styles.filterModalTitle}>Filter by</Text>
        <Button title="Name" onPress={() => applyFilter('Name')} />
        <Button title="Series" onPress={() => applyFilter('Series')} />
        <Button title="Types" onPress={() => applyFilter('Types')} />
        {/* Type Dropdown */}
        <Text style={styles.filterModalTitle}>Types</Text>
        <DropdownSelector
          items={typeLabels}
          selectedValue={selectedType}
          placeholder='Select a Type'
          onValueChange={(value) => {
            setSelectedType(value);
            applyFilter('Types', value);
            onClose(); // Close the modal after selection
          }}
        />
        {/* Rarity Dropdown */}
        <Text style={styles.filterModalTitle}>Rarity</Text>
        <DropdownSelector
          items={rarityLevels}
          selectedValue={selectedRarity}
          placeholder='Select a Rarity'
          onValueChange={(value) => {
            setSelectedRarity(value);
            applyFilter('Rarity', value);
            onClose(); // Close the modal after selection
          }}
        />
        <Button title="HP" onPress={() => applyFilter('HP')} />
      </View>
    </Modal>
  );
};

export default FilterModal;
