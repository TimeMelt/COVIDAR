import { StyleSheet, Dimensions } from 'react-native';
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: '#263238', //#fff
    },
    card: {
      elevation: 4,
      backgroundColor: '#E0E0E0', 
    },
    cases_widget: {
      flex: 1,
      margin: 3,
      backgroundColor: '#00E5FF'
    },
    deaths_widget: {
      flex: 1,
      margin: 3,
      backgroundColor: '#D50000'
    },
    recovered_widget: {
      flex: 1,
      margin: 3,
      backgroundColor: '#64DD17'
    },
    today_widget: {
      flex: 1,
      margin: 3,
      backgroundColor: '#FFC107'
    },
    active_widget: {
      flex: 1,
      margin: 3,
      backgroundColor: '#7b1fa2' //#E91E63
    },
    critical_widget: {
      flex: 1,
      margin: 3,
      backgroundColor: '#FF3D00'
    },
    world_text: {
      fontSize: 15,
    },
    chart_container: {
      flex: 1,
      padding: 15,
      backgroundColor: '#263238', 
      
    },
    mini_chart: {
      flex: 1,
      padding: 5,
      backgroundColor: '#263238',
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 20,
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    label: {
      alignContent: 'center',
    }
  });