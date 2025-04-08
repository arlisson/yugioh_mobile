import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';

export default function CampoCalendario({ dataSelecionada, setDataSelecionada,titulo }) {
  const dataSistema = moment();
  const [dataAtual, setDataAtual] = useState(dataSelecionada || dataSistema.format('YYYY-MM-DD'));
  const [anoSelecionado, setAnoSelecionado] = useState(dataSistema.year());
  const [mesSelecionado, setMesSelecionado] = useState(dataSistema.month()); // 0–11

  const handleSelecionarData = (day) => {
    setDataAtual(day.dateString);
    setDataSelecionada(day.dateString);
  };

  const handleTrocarAno = (novoAno) => {
    setAnoSelecionado(novoAno);
  };

  const handleTrocarMes = (info) => {
    setAnoSelecionado(info.year);
    setMesSelecionado(info.month - 1); // Calendar dá mês de 1–12
  };

  const anosDisponiveis = [];
  for (let i = dataSistema.year() - 50; i <= dataSistema.year(); i++) {
    anosDisponiveis.push(i);
  }

  const dataKey = `${anoSelecionado}-${mesSelecionado}`;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{titulo}:</Text>

      {/* Picker de ano */}
      <Picker
        selectedValue={anoSelecionado}
        style={styles.picker}
        onValueChange={handleTrocarAno}
        dropdownIconColor="#4A90E2"
      >
        {anosDisponiveis.map((ano) => (
          <Picker.Item key={ano} label={ano.toString()} value={ano} />
        ))}
      </Picker>

      <Calendar
        key={dataKey} // 🔥 força re-render ao trocar mês/ano
        current={moment().year(anoSelecionado).month(mesSelecionado).startOf('month').format('YYYY-MM-DD')}
        onDayPress={handleSelecionarData}
        markedDates={{
          [dataAtual]: {
            selected: true,
            selectedColor: '#4A90E2',
          },
        }}
        enableSwipeMonths={true}
        onMonthChange={handleTrocarMes}
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
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
});
