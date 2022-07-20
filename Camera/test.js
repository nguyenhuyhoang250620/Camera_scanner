import  React,{useEffect,useState,useRef} from 'react';
import { TouchableOpacity, SafeAreaView, StyleSheet,Image,View ,PermissionsAndroid, Platform,Text,Animated } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/Ionicons'

Icon.loadFont()

export default function BarcodeScanner() {
  const camera = useRef(null)
  const [hasPermission, setHasPermission] = useState(false);
  const [anh,setAnh] = useState()
  const [manganh,setManganh] = useState([])
  const devices = useCameraDevices();
  const device = devices.front;
  const [openswipper,setOpenswipper] = useState(false)

  const Top = useRef(new Animated.Value(0)).current
  const Bottom = useRef(new Animated.Value(600)).current
  const Right = useRef(new Animated.Value(100)).current
  const Left = useRef(new Animated.Value(100)).current
  const [x,setX]= useState(300)
  const [y,setY]= useState(300)
  const [z,setZ]= useState(100)
  const [h,setH]= useState(100)
  
  
  

 
    // setInterval(() => {
    //   setX(x+30);
    //   setY(y-30);
    //   setZ(z+30);
    //   setH(h-30);
    //   Animated.parallel([
    //     Animated.timing(Top,{
    //       toValue:x,
    //       useNativeDriver:false,
    //       duration:33.33
    //     }),
    //     Animated.timing(Bottom,{
    //       toValue:y,
    //       useNativeDriver:false,
    //       duration:33.33
    //     }),
    //     Animated.timing(Right,{
    //       toValue:z,
    //       useNativeDriver:false,
    //       duration:33.33
    //     }),
    //     Animated.timing(Left,{
    //       toValue:h,
    //       useNativeDriver:false,
    //       duration:33.33
    //     })
    //   ]).start()
    // }, 1000);


  
  

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();

  }, []);
  // const hasAndroidPermission=async()=> {
  //   const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  
  //   const hasPermission = await PermissionsAndroid.check(permission);
  //   if (hasPermission) {
  //     return true;
  //   }
  
  //   const status = await PermissionsAndroid.request(permission);
  //   return status === 'granted';
  // }
  
  // const savePicture=async()=> {
  //   if (Platform.OS === "android" && !(await hasAndroidPermission())) {
  //     return;
  //   }
  //   CameraRoll.save(anh, {type:"photo",album:Math.random() })
  // };

  const photo  =async ()=>{
      const result =await camera.current.takePhoto({
      qualityPrioritization: 'quality',
      enableAutoRedEyeReduction: true
    })
    console.log(result)
    setAnh(result.path)
    setManganh([...manganh,result.path])
    console.log(manganh)
    
  }  
  const test = async()=>{
      setOpenswipper(!openswipper)
  }
 
  const ViewRectangle = ()=>{
    return(
      <Animated.View
        style={{
          borderWidth:3,
          borderColor:"blue",
          position:"absolute",
          top:Top,
          bottom:Bottom,
          right:Right,
          left:Left
        }}
      >

      </Animated.View>
    )
  }
  
  return (
      <SafeAreaView style={styles.container}>
        {device != null &&
        hasPermission && (
        <>
            <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            photo={true}
            isActive={true}
            />
            {/* {ViewRectangle()} */}
            <TouchableOpacity style={styles.btn_camera} onPress={photo}>
              <View style={{
                height:30,
                width:30,
                backgroundColor:"blue",
                borderRadius:500/2,
                opacity:1
              }}></View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.img_camera} onPress={test}>
              <FastImage
                  style={{height:50,width:50,borderRadius:500/2}}
                  source={{
                    uri:`file://${anh}`,
                    cache: FastImage.cacheControl.immutable
                  }}
              />
            </TouchableOpacity>
        </>)}    
        {
          openswipper
          &&
          <View style={{flex:1}}>
            <View>
              <TouchableOpacity style={styles.btn_back} onPress={()=>setOpenswipper(false)}>
                  <Icon
                    name='arrow-back-outline'
                    size={35}
                    color="white"
                  />
              </TouchableOpacity>
            </View>
          <Swiper
              loop={false}
              showsPagination={false}
            >
              {
                manganh.map(
                  (node, index) => (
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#333',
                      }}
                    >
                      <FastImage
                          style={{height:"100%",width:"100%"}}
                          resizeMode={FastImage.resizeMode.cover}
                          source={{
                            uri:`file://${node}`,
                            cache: FastImage.cacheControl.immutable
                          }}
                      >
                      </FastImage>
                      
                    </View>
                  )
                )
              }
            </Swiper>
          </View>
        }
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center"
  },
  btn_camera:{
    height:50,
    width:50,
    backgroundColor:"black",
    position:"absolute",
    bottom:30,
    borderRadius:500/2,
    justifyContent:"center",
    alignItems:"center"
  },
  img_camera:{
    height:50,
    width:50,
    position:"absolute",
    bottom:30,
    left:20,
    borderRadius:500/2
  },
  btn_back:{
    padding:5,
    width:"100%",
    backgroundColor:"black",
    alignItems:"flex-start"
  }
});