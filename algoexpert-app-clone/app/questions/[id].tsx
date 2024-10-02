import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import RenderHtml from "react-native-render-html";

import { Text } from "react-native-paper";

const QuestionInfo = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const navigation = useNavigation();

  const [question, setQuestion] = useState({});
  const fetchQuestionInformation = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const response = await axios.post(
      "https://prod.api.algoexpert.io/api/problems/v1/algoexpert/coding-questions/get",
      {
        name: id,
      },
      {
        headers: {
          accept: "application/json, text/plain, */*",
          authorization: token,
        },
      }
    );
    console.log(response.data);
    setQuestion(response.data);
  };
  useEffect(() => {
    // set the question information on the title
    navigation.setOptions({ title: id });

    fetchQuestionInformation();
  }, []);
  return (
    <ScrollView style={{ padding: 30, paddingBottom: 50 }}>
      <Text style={{ paddingBottom: 20 }}>Question Name: {question?.name}</Text>

      <Text>Question Description:</Text>
      <View>
        <RenderHtml
          contentWidth={300}
          source={{
            html: `<div>${question?.prompt}</div>`,
          }}
        />
      </View>

      <Text>Python Solution:</Text>

      <View>
        <Text>${question?.resources?.python.solutions?.[0]}</Text>
      </View>
    </ScrollView>
  );
};

export default QuestionInfo;
