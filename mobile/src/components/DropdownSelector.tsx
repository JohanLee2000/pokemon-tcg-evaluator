import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from 'src/assets/styles';

interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownSelectorProps {
  items: DropdownItem[];
  selectedValue?: string;
  placeholder?: string;
  onValueChange: (value: string) => void;
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  items,
  selectedValue,
  placeholder = "Select an option",
  onValueChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setIsOpen(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.dropdownToggle}
        onPress={() => setIsOpen(!isOpen)}
      >
        <View style={styles.dropdownContent}>
        <Text style={styles.dropdownText}>
          {selectedValue ? items.find(item => item.value === selectedValue)?.label : placeholder}
        </Text>
        <Ionicons name={isOpen ? "caret-up" : "caret-down"} size={16} color="black"/>
        </View>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownListContainer}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleSelect(item.value)}
              >
                <Text style={styles.dropdownItemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default DropdownSelector;
