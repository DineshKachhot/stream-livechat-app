import {
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { TextInput } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { useAuth } from "@/context/AuthContext";

const Page = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { onLogin, onRegister } = useAuth();

  console.log("AuthState", onLogin, onRegister, useAuth());

  const onSignInPressed = async () => {
    setIsLoading(true);
    try {
      const result = await onLogin!(email, password);
      console.log("Login result", result);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRegisterPressed = async () => {
    try {
      const result = await onRegister!(email, password);
      console.log("Register result", result);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Spinner visible={isLoading} />
      <Text style={styles.header}>Meet Me</Text>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.inputField}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.inputField}
        secureTextEntry
      />

      <TouchableOpacity onPress={onSignInPressed} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Button title="Don't have signin, Register" onPress={onRegisterPressed} />
      <Text style={styles.subHeader}>The fastest way to meet people</Text>
    </KeyboardAvoidingView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  subHeader: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 40,
  },
  inputField: {
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerLink: {
    marginTop: 20,
    textAlign: "center",
  },
});
