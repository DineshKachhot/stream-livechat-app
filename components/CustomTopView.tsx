import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useCallStateHooks } from "@stream-io/video-react-native-sdk";

const CustomTopView = () => {
  const { useParticipantCount } = useCallStateHooks();
  const participantCount = useParticipantCount();
  return (
    <View style={styles.topView}>
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.topText}>
        {participantCount + " participants in Video"}
      </Text>
    </View>
  );
};

export default CustomTopView;

const styles = StyleSheet.create({
  topView: {
    width: "75%",
    position: "absolute",
    left: "25%",
    height: 50,
    backgroundColor: "#0333C17c",
    justifyContent: "center",
    alignItems: "center",
  },
  topText: {
    color: "white",
    fontSize: 14,
    padding: 5,
  },
});
