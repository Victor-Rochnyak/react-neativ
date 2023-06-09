import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

const CreateScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    console.log("latitude", location.coords.latitude);
    console.log("longitude", location.coords.longitude);
    console.log("camera", photo.uri);
    setPhoto(photo.uri);
  };

  const sendPhoto = () => {
    console.log("navigation", navigation);
    navigation.navigate("DefaultScreen", { photo });
  };

  useEffect(() => {
    (async () => {
      // let { status } = await Location.requestForegroundPermissionsAsync();
      let { status } = await Camera.requestCameraPermissionsAsync();
      console.log("status", status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Camera.requestPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access camera was denied");
  //       return;
  //     }
  //     const { status: locationStatus } =
  //       await Location.requestForegroundPermissionsAsync();
  //     if (locationStatus !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }
  //     setCamera(true);
  //   })();
  // }, []);

  // const takePhoto = async () => {
  //   if (!camera) {
  //     return;
  //   }
  //   const { uri } = await camera.takePictureAsync();
  //   const location = await Location.getCurrentPositionAsync();
  //   console.log("latitude", location.coords.latitude);
  //   console.log("longitude", location.coords.longitude);
  //   console.log("camera", uri);
  //   setPhoto(uri);
  // };

  // const sendPhoto = () => {
  //   console.log("navigation", navigation);
  //   navigation.navigate("Posts", { photo });
  // };

  // if (!camera) {
  //   return <Text>Loading...</Text>;
  // }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={(ref) => setCamera(ref)}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 200, width: 150, borderRadius: 10 }}
            />
          </View>
        )}
        <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
          <Text style={styles.snap}>snap</Text>
        </TouchableOpacity>
      </Camera>
      <TouchableOpacity onPress={sendPhoto} style={styles.sendBtn}>
        <Text style={styles.sendTitle}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: "80%",
    // flex: 1,
    // height: 300,
    // marginTop: 50,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  snap: {
    color: "#fff",
  },
  snapContainer: {
    // marginTop: 200,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ff0000",
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoContainer: {
    borderRadius: 10,
    position: "absolute",
    top: 50,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
  sendBtn: {
    marginHorizontal: 30,
    height: 40,
    borderWidth: 2,
    borderColor: "#20b2aa",
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendTitle: {
    color: "#2ba2aa",
    fontSize: 20,
  },
});
export default CreateScreen;
