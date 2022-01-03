import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export function Profile() {
  return (
    <View>
      <Text testID="text-title">Profile</Text>

      <TextInput
        testID="input-name"
        placeholder="Nome"
        autoCorrect={false}
        value="Wesley"
      />
      <TextInput
        testID="input-surname"
        placeholder="Sobrenome"
        value="Feitosa"
      />

      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
}
