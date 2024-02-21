import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  ToggleCameraFaceButton,
  HangUpCallButton,
  useCall,
  CallControlProps,
  StreamReactionType,
  ReactionsButton,
} from "@stream-io/video-react-native-sdk";
import Colors from "@/constants/Colors";

export const reactions: StreamReactionType[] = [
  {
    type: "reaction",
    emoji_code: ":smile:",
    custom: {},
    icon: "😊",
  },
  {
    type: "raised-hand",
    emoji_code: ":raise-hand:",
    custom: {},
    icon: "✋",
  },
  {
    type: "reaction",
    emoji_code: ":fireworks:",
    custom: {},
    icon: "🎉",
  },
  {
    type: "reaction",
    emoji_code: ":like:",
    custom: {},
    icon: "😍",
  },
];

const CustomCallControlls = (props: CallControlProps) => {
  const call = useCall();

  const onLike = () => {
    const reaction = {
      type: "reaction",
      emoji_code: ":like:",
      custom: {},
      icon: "😍",
    };
    call?.sendReaction(reaction);
  };

  return (
    <View style={styles.customCallControlsContainer}>
      <ToggleAudioPublishingButton
        onPressHandler={() => call?.microphone.toggle()}
      />
      <ToggleVideoPublishingButton
        onPressHandler={() => call?.camera.toggle()}
      />
      <ToggleCameraFaceButton onPressHandler={() => call?.camera.flip()} />
      <HangUpCallButton onHangupCallHandler={props.onHangupCallHandler} />
      <ReactionsButton supportedReactions={reactions} />
      <Button title="Like" onPress={onLike} color={Colors.secondary} />
    </View>
  );
};

export default CustomCallControlls;

const styles = StyleSheet.create({
  customCallControlsContainer: {
    position: "absolute",
    right: 0,
    top: 160,
    gap: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#0333c17c",
    borderRadius: 6,
    borderColor: "#fff",
    borderWidth: 2,
    zIndex: 5,
  },
});
