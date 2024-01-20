import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View, Pressable, Text, TextInput } from "react-native";

export default function App() {
   const [logined, setLogined] = useState(false);

   const [inputValue, setInputValue] = useState({
      email: "",
      password: "",
   });

   function loginProcess() {
      const expectedUser = {
         email: "batazo",
         password: "123",
      };
      const newLoginStatus = expectedUser.email === inputValue.email && expectedUser.password === inputValue.password ? true : null;
      setInputValue({ email: "", password: "" });
      setLogined(newLoginStatus);
   }

   return (
      <View style={styles.container}>
         {logined === false && (
            <>
               <Text style={styles.label}>Felhasználónév</Text>
               <TextInput
                  testID="email-input"
                  style={styles.textinput}
                  value={inputValue.email}
                  onChangeText={(text) => {
                     setInputValue((prev) => ({ ...prev, email: text }));
                  }}
               />
               <Text style={styles.label}>Jelszó</Text>
               <TextInput
                  testID="password-input"
                  secureTextEntry={true}
                  style={styles.textinput}
                  value={inputValue.password}
                  onChangeText={(text) => {
                     setInputValue((prev) => ({ ...prev, password: text }));
                  }}
               />
               <Pressable testID="login-button" style={styles.button} onPress={() => loginProcess()}>
                  <Text style={styles.text}>LOGIN</Text>
               </Pressable>
            </>
         )}
         {logined === true && (
            <>
               <Text testID="login-success-text" style={styles.successlogin}>
                  Sikeresen bejelentkeztél!
               </Text>
               <Pressable testID="logout-button" style={styles.button} onPress={() => setLogined(false)}>
                  <Text style={styles.text}>LOGOUT</Text>
               </Pressable>
            </>
         )}
         {logined === null && (
            <>
               <Text testID="login-wrong-text" style={styles.badlogin}>
                  Sikertelen bejelentkezés
               </Text>
               <Pressable testID="back-button" style={styles.button} onPress={() => setLogined(false)}>
                  <Text style={styles.text}>VISSZA</Text>
               </Pressable>
            </>
         )}
         <StatusBar style="auto" />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
   successlogin: {
      fontSize: 30,
      color: "green",
   },
   badlogin: {
      fontSize: 30,
      color: "red",
   },
   label: {
      color: "#4630EB",
      fontSize: 16,
      fontWeight: "bold",
   },
   button: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: "#4630EB",
   },
   text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "white",
   },
   textinput: {
      height: 50,
      width: "90%",
      borderWidth: 4,
      borderColor: "#4630EB",
      padding: 10,
      color: "#4630EB",
      fontSize: 16,
      fontWeight: "bold",
      margin: 10,
   },
});
