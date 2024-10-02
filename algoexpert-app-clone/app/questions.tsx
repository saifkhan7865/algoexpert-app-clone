import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Platform,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios, { all } from "axios";
import {
  ActivityIndicator,
  Appbar,
  List,
  MD2Colors,
  SegmentedButtons,
  Snackbar,
} from "react-native-paper";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const MyComponent = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [questionsList, setQuestionsList] = useState([]);
  const [categoryWiseQuestions, setCategoryWiseQuestions] = useState({});
  const [allTheCategories, setAllCategories] = useState([]);
  const showToast = (message: any) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      // For iOS
      alert(message); // Or use a custom Toast component
    }
  };
  const getQuestionsList = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const response = await axios.post(
      "https://prod.api.algoexpert.io/api/problems/v1/algoexpert/coding-questions/list",
      null,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(response);
    const questionsList = response.data?.questions;

    setQuestionsList(questionsList);

    const categoryWiseQuestions = questionsList.reduce(
      (acc: any, question: any) => {
        if (!acc[question.category]) {
          acc[question.category] = [];
        }
        acc[question.category].push(question);
        return acc;
      },
      {}
    );

    const allCategories = Object.keys(categoryWiseQuestions).map(
      (category) => ({
        value: category,
        label: category,
      })
    );

    setAllCategories([...allTheCategories, ...allCategories]);

    setCategoryWiseQuestions(categoryWiseQuestions);
    setCurrentCategory(Object.keys(categoryWiseQuestions)[0]);

    setIsLoading(false);
  };

  const [currentCategory, setCurrentCategory] = useState("all");
  useEffect(() => {
    getQuestionsList();
  }, []);

  useEffect(() => {
    // Set the title dynamically when the component mounts
    navigation.setOptions({ title: "All Questions" });
  }, []);
  const MyComponent = () => (
    <ActivityIndicator
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      size={"large"}
      animating={true}
      color={"#02203b"}
    />
  );
  if (isLoading) {
    return <MyComponent />;
  }
  return (
    <View
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        paddingTop: 40,
        backgroundColor: "#fcf6ed",
        paddingHorizontal: 20,
      }}
    >
      <Text style={styles.text}>List of All The Questions</Text>

      <ScrollView horizontal>
        <SegmentedButtons
          style={{
            // marginBottom: 10,
            height: 40,
            // paddingBottom: 10,
          }}
          value={currentCategory}
          onValueChange={(value) => {
            setCurrentCategory(value);
          }}
          buttons={allTheCategories}
        />
      </ScrollView>

      <FlatList
        data={categoryWiseQuestions[currentCategory]}
        renderItem={({ item }) => (
          <List.Item
            key={item.name}
            title={item.name}
            description={item.category}
            onPress={() => {
              router.push(`/questions/${item.name}`);
            }}
            style={{
              backgroundColor: "#02203b",
              borderRadius: 10,
              marginVertical: 10, // Adjust margin for vertical spacing
              paddingHorizontal: 10, // Adjust padding for horizontal spacing
            }}
            titleStyle={{
              color: "#ffffff",
              textAlign: "left",
            }}
            descriptionStyle={{
              height: 0,
            }}
            rippleColor={"#ffffff"}
          />
        )}
        keyExtractor={(item) => item.name}
        style={{
          maxHeight: "86%",
          padding: 10,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default MyComponent;
