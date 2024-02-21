import {
  Alert,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { rooms } from "@/assets/data/rooms";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const Page = () => {
  const screenWidth = Dimensions.get("window").width;
  function onStartMeeting(): void {
    const randomId = Math.floor(Math.random() * 1000000000).toString();
    router.push(`/(inside)/(room)/${randomId}`);
  }

  function onJoinMeeting(): void {
    Alert.prompt("Join meeting", "Please enter your meeting id:", (id) => {
      console.log(id);
      router.push(`/(inside)/(room)/${id}`);
    });
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={onStartMeeting}>
          <Ionicons name="videocam" size={24} color="white" />
          <Text numberOfLines={2} style={styles.startMeetingText}>
            Start new Meeting
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onJoinMeeting}>
          <Ionicons name="videocam" size={24} color="white" />
          <Text style={styles.startMeetingText}>Join Meeting by Id</Text>
        </TouchableOpacity>
      </View>

      <View style={{ margin: 20, alignItems: "center", flexDirection: "row" }}>
        <View style={styles.divider} />
        <Text style={styles.orText}>or Join public room</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.wrapper}>
        {rooms.map((room) => {
          return (
            <Link key={room.id} href={`/(inside)/(room)/${room.id}`} asChild>
              <TouchableOpacity>
                <ImageBackground
                  imageStyle={styles.imageStyle}
                  source={room.img}
                  style={[styles.image, { width: screenWidth - 40 }]}
                  resizeMode="cover"
                >
                  <View style={styles.overlay}>
                    <Text style={styles.text}>{room.name}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </Link>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    // flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 20,
    margin: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    alignItems: "center",
    gap: 20,
    justifyContent: "center",
    padding: 20,
  },
  image: {
    // flex: 1,
    width: 200,
    height: 150,
  },
  imageStyle: {
    borderRadius: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  startMeetingText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 10,
  },
  divider: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#000",
    marginVertical: 20,
  },
  orText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 10,
  },
});
