import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { styles } from 'src/assets/styles';

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  applyFilter: (filter: string) => void;
}

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
        <Button title="Rarity" onPress={() => applyFilter('Rarity')} />
        <Button title="HP" onPress={() => applyFilter('HP')} />
      </View>
    </Modal>
  );
};

export default FilterModal;
