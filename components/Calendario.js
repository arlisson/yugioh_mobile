import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function CampoCalendario({ dataSelecionada, setDataSelecionada }) {
  const [dataAtual, setDataAtual] = useState(dataSelecionada || null);

  const handleSelecionarData = (day) => {
    setDataAtual(day.dateString);       // '2025-04-08'
    setDataSelecionada(day.dateString); // envia para componente pai
    console.log('Data selecionada:', day.dateString);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Data da Compra:</Text>
      <Calendar
        onDayPress={handleSelecionarData}
        markedDates={{
          [dataAtual]: {
            selected: true,
            selectedColor: '#4A90E2',
          },
        }}
        theme={{
          selectedDayBackgroundColor: '#4A90E2',
          todayTextColor: '#4A90E2',
          arrowColor: '#4A90E2',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
