import {
  Dimensions,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import {
  Call,
  CallContent,
  StreamCall,
  StreamVideoEvent,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import Spinner from "react-native-loading-spinner-overlay";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import ChatView from "@/components/ChatView";
import CustomBottomSheet from "@/components/CustomBottomSheet";
import CustomTopView from "@/components/CustomTopView";
import CustomCallControlls from "@/components/CustomCallControlls";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Page = () => {
  const [call, setCall] = React.useState<Call | null>(null);
  const client = useStreamVideoClient();
  const { id } = useLocalSearchParams<{ id: string }>();

  const navigation = useNavigation();

  console.log("Call", id);

  useEffect(() => {
    if (!client || call) return;
    const joinCall = async () => {
      const call = client.call("default", id);
      call.join({ create: true });
      setCall(call);
    };
    joinCall();
  }, [client, call]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={shareMeeting}>
          <Ionicons name="share-outline" size={24} color="white" />
        </TouchableOpacity>
      ),
    });

    if (!client || call) return;

    const unsubscribe = client!.on("all", (event: StreamVideoEvent) => {
      console.log("Event", event);
      if (event.type === "call.reaction_new") {
        console.log("New Reaction", event.reaction);
      }

      if (event.type === "call.session_participant_joined") {
        console.log("Participant joined", event.participant);
        const user = event.participant.user.name;
        Toast.show({
          text1: "User joined",
          text2: "Say hello to " + user,
        });
      }
      if (event.type === "call.session_participant_left") {
        console.log("Participant left", event.participant);
        const user = event.participant.user.name;
        Toast.show({
          text1: "User left",
          text2: "Say goodbye to " + user,
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const goToHomeScreen = () => {
    router.back();
  };

  // Share the meeting link
  const shareMeeting = async () => {
    Share.share({
      message: `Join my meeting: myapp://(inside)/(room)/${id}`,
    });
  };

  if (!call) return null;
  return (
    <View style={styles.container}>
      <Spinner visible={!call} />

      <StreamCall call={call}>
        <View style={styles.streamView}>
          <CallContent
            CallTopView={CustomTopView}
            CallControls={CustomCallControlls}
            onHangupCallHandler={goToHomeScreen}
            layout="grid"
          />
          {WIDTH > HEIGHT ? (
            <View style={styles.chatView}>
              <ChatView channelId={id} />
            </View>
          ) : (
            <CustomBottomSheet channelId={id} />
          )}
        </View>
      </StreamCall>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  streamView: {
    flex: 1,
    flexDirection: WIDTH > HEIGHT ? "row" : "column",
  },
  chatView: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
