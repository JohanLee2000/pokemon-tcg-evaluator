import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

import Modal from 'react-native-modal';
import DropdownSelector from './DropdownSelector';
import { styles } from 'src/assets/styles';

import { hpLabels, rarityLabels, seriesLabels, typeLabels } from 'src/assets/constants';

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  applyFilter: (filter: string, value?: string) => void;
}


const FilterModal: React.FC<FilterModalProps> = ({ isVisible, onClose, applyFilter }) => {
	const [selectedRarity, setSelectedRarity] = useState<string | undefined>();
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [selectedHP, setSelectedHP] = useState<string | undefined>();
  const [selectedSeries, setSelectedSeries] = useState<string | undefined>();
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
        {/* Series Dropdown */}
        <Text style={styles.filterModalTitle}>Series</Text>
        <DropdownSelector
          items={seriesLabels}
          selectedValue={selectedSeries}
          placeholder='Select a Series'
          onValueChange={(value) => {
            setSelectedSeries(value);
            applyFilter('Series', value);
            onClose(); // Close the modal after selection
          }}
        />
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
          items={rarityLabels}
          selectedValue={selectedRarity}
          placeholder='Select a Rarity'
          onValueChange={(value) => {
            setSelectedRarity(value);
            applyFilter('Rarity', value);
            onClose(); // Close the modal after selection
          }}
        />
        {/* HP Dropdown */}
        <Text style={styles.filterModalTitle}>HP</Text>
        <DropdownSelector
          items={hpLabels}
          selectedValue={selectedHP}
          placeholder='Select a HP value'
          onValueChange={(value) => {
            setSelectedHP(value);
            applyFilter('HP', value);
            onClose(); // Close the modal after selection
          }}
        />

      </View>
    </Modal>
  );
};

export default FilterModal;
