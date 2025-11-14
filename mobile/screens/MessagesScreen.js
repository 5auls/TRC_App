import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { useStore } from '../store';
import { colors } from '../theme';

/*
 * MessagesScreen
 *
 * A basic chat interface for a single job thread.  It loads the current
 * message list (currently empty due to the stub backend) and allows
 * the user to send new messages.  Messages are appended to local state
 * via the store.  When real endpoints are available, this screen
 * should fetch messages for the selected job and support multiple threads.
 */

export default function MessagesScreen() {
  // Hardcode a job ID for this stubbed chat.  In a real app the user
  // would select a job to view messages for.
  const jobId = 101;
  const messages = useStore((state) => state.messages);
  const fetchMessages = useStore((state) => state.fetchMessages);
  const sendMessage = useStore((state) => state.sendMessage);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchMessages(jobId);
  }, [fetchMessages, jobId]);

  const handleSend = () => {
    if (input.trim().length === 0) return;
    sendMessage(jobId, 'customer', input.trim());
    setInput('');
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.message,
        item.sender === 'customer' ? styles.messageOutgoing : styles.messageIncoming,
      ]}
    >
      <Text style={styles.messageSender}>{item.sender}</Text>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, idx) => String(idx)}
        renderItem={renderItem}
        contentContainerStyle={styles.messagesList}
        ListEmptyComponent={<Text>No messages yet.</Text>}
      />
      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          style={styles.textInput}
        />
        <Button title="Send" onPress={handleSend} color={colors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  messagesList: {
    padding: 16,
    flexGrow: 1,
  },
  message: {
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
    maxWidth: '75%',
  },
  messageOutgoing: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    color: '#fff',
  },
  messageIncoming: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
  },
  messageSender: {
    fontSize: 10,
    color: colors.dark,
    marginBottom: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.background,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
});