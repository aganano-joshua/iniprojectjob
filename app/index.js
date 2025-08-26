import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const [name, setName] = useState("");
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Welcome 👋</Text>
        <Text style={styles.subtitle}>Enter your name to continue</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          placeholderTextColor="#999"
          style={styles.input}
        />

        <TouchableOpacity
          disabled={!name.trim()}
          onPress={() => router.push({ pathname: "/home", params: { name } })}
          style={[styles.button, !name.trim() && styles.buttonDisabled]}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    backgroundColor: "#f3f4f6",
    padding: 14,
    borderRadius: 16,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    color: "#111",
  },
  button: {
    backgroundColor: "#4f46e5",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: "#cbd5e1",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});