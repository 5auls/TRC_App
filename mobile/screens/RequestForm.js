import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { Picker } from '@react-native-picker/picker';

// A very simple request form illustrating the basic fields.
// In a real application this component would support media upload,
// address autocomplete, date/time picker and form validation.

export default function RequestForm({ onSubmit }) {
  // Default category set to the first option
  const [category, setCategory] = useState('crawlspace_repairs');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ category, description });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Service Category</Text>
      <Picker
        selectedValue={category}
        onValueChange={(val) => setCategory(val)}
        style={styles.picker}
      >
        {/* Main service categories supplied by the client */}
        <Picker.Item label="Crawlspace Repairs" value="crawlspace_repairs" />
        <Picker.Item label="Structural/Foundation Repairs" value="structural_repairs" />
        <Picker.Item label="Waterproofing" value="waterproofing" />
        <Picker.Item label="Mold Remediation" value="mold_remediation" />
        <Picker.Item label="Attic Solutions" value="attic_solutions" />
      </Picker>
      <Text style={styles.label}>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        placeholder="Describe the issue"
        multiline
      />
      <Button title="Submit Request" onPress={handleSubmit} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: colors.surface,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    color: colors.secondary,
  },
  picker: {
    backgroundColor: colors.background,
  },
  input: {
    backgroundColor: colors.background,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    minHeight: 60,
  },
});