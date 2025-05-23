import { Text, View } from "react-native";
import Header from "../src/components/Header";
import '../global.css';
import TicketForm from "../src/screens/TicketForm";

export default function Page() {
  return (
    <View>
      <Header />
      <TicketForm />
    </View>
  );
}
