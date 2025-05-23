import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import MyTabBar from '../components/MyTabBar'

export default function TicketForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.subject || !form.message) {
      Alert.alert('Please fill in all fields.');
      return;
    }

    // Simulate ticket submission
    Alert.alert('Ticket Submitted', JSON.stringify(form, null, 2));
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <View>
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 50 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 40, textAlign: 'center' }}>
        Submit a Ticket
      </Text>

      <TextInput
        placeholder="Name"
        value={form.name}
        onChangeText={(value) => handleChange('name', value)}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={(value) => handleChange('email', value)}
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Subject"
        value={form.subject}
        onChangeText={(value) => handleChange('subject', value)}
        style={styles.input}
      />

      <TextInput
        placeholder="Message"
        value={form.message}
        onChangeText={(value) => handleChange('message', value)}
        multiline
        numberOfLines={4}
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
    <MyTabBar/> 
    </View>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#000000',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
};
