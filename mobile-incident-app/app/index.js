
import { Text, View, StyleSheet } from "react-native";
import Header from "../src/components/Header";
import '../global.css'
import TicketForm from "../src/screens/TicketForm";

export default function Page() {
  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <View style={styles.content}>
        <TicketForm/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    position: 'relative',
  },
});