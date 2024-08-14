import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import Modal from 'react-native-modal';
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

const FilterModal: React.FC<FilterModalProps> = ({ isVisible, onClose, applyFilter }) => {
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
        {/* Rarity Dropdown */}
        <Text style={styles.filterModalTitle}>Rarity</Text>
        <RNPickerSelect
          onValueChange={(value) => {
            if (value) {
              applyFilter('Rarity', value);
              onClose(); // Close the modal after selection
            }
          }}
          items={rarityLevels}
          placeholder={{ label: "Select a Rarity", value: null }}
        />
        <Button title="HP" onPress={() => applyFilter('HP')} />
      </View>
    </Modal>
  );
};

export default FilterModal;
