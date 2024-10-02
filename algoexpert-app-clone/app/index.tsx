import { useEffect, useState } from "react";
import { Button, TouchableOpacity, View } from "react-native";
import { Snackbar, Surface, Text, TextInput } from "react-native-paper";
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";

export default function Index() {
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // check if the user is already logged in
    // if yes then navigate to the next page
    AsyncStorage.getItem("userToken").then((token) => {
      if (token) {
        setText(token);
        setVisible(true);
      }
    });
  }, []);

  useEffect(() => {
    // Set the title dynamically when the component mounts
    navigation.setOptions({ title: "Algoexpert.io" });
  }, []);

  return (
    <View
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        paddingTop: 200,
        backgroundColor: "#fcf6ed",
      }}
    >
      <Snackbar
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
        action={{
          label: "ok",
          onPress: () => {
            // Do something
            setVisible(false);
          },
        }}
      >
        Your token exists in local storage
      </Snackbar>
      {/* Image */}

      <Text
        style={{
          color: "#02203b",
          fontSize: 40,
          textAlign: "center",
          fontWeight: "900",
        }}
      >
        ALGOEXPERT.IO
      </Text>

      {/* https://miro.medium.com/v2/resize:fit:1400/1*3YcC1B9RSH9sS5xiiLqImg.png */}

      <Surface
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          backgroundColor: "#ffffff",
          borderRadius: 10,
          margin: 20,
          elevation: 10,
          gap: 40,
        }}
      >
        <TextInput
          mode="outlined"
          style={{
            // center vertically
            height: 50,
            width: "100%",
            borderColor: "#00162a",
          }}
          label="Enter your token from algoexpert"
          value={text}
          onChangeText={(e) => {
            setText(e);
          }}
        />

        <View
          style={{
            backgroundColor: "#02203b",
            borderRadius: 20,
            elevation: 10,
            shadowColor: "#000000",
            shadowOffset: {
              width: 4,
              height: 4,
            },
            padding: 10,
            shadowOpacity: 0.1,
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              // navigate to next page
              // store the token in the local storage
              // and then navigate to the next page
              await AsyncStorage.setItem("userToken", text);

              // navigation.navigate("questions"); // Replace 'NextPage' with the name of your next screen
              navigation.navigate("questions");
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Login to Algoexpert
            </Text>
          </TouchableOpacity>
        </View>
      </Surface>
    </View>
  );
}
