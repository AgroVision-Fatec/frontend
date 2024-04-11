import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, Modal, Image, ActivityIndicator  } from "react-native";
import {Camera} from 'expo-camera'
import {FontAwesome} from '@expo/vector-icons'


export default function CameraComponent() {

    const [typeCamera, setTypeCamera] = useState(Camera.Constants.Type.back)
    const [hasPermission, setHasPermission] = useState(null)
    const [capturedPhoto, setCapturedPhoto] = useState(null)
    const [modalIsOpen, setModalIsOpen] = useState(true)
    const [isSaving, setIsSaving] = useState(false);
    const camRef = useRef(null)


    useEffect(() => {

        (async() => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted')
            console.log(status)
        })();
    },[])

    if(hasPermission === null) {
        return <View />
    }

    if(hasPermission === false) {
        return <Text>Acesso Negado!</Text>
    }


    async function takePicture() {
        if(camRef) {
            const data = await camRef.current.takePictureAsync();
            setCapturedPhoto(data.uri)
            setModalIsOpen(true)
            
        }
    }

    async function savePicture() {
        

        //salvar a imagem no banco ou sei la aonde


        // setIsSaving(false)
        // setModalIsOpen(false)
        

    }



    return (
        <SafeAreaView style={styles.container}>

            <Camera 
                style={{flex: 1, aspectRatio: 3/4}}
                type={typeCamera}
                ref={camRef}
            />

            <View style={styles.containerButtons}>
   

                <TouchableOpacity style={styles.buttonCamera} onPress={ takePicture }>
                    <FontAwesome name="camera" size={23} color={'white'}/>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.buttonRotate}
                onPress={ () => {
                    setTypeCamera(
                        typeCamera === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    )
                }}
                >
                <FontAwesome name="rotate-right" size={23} color={'#fff'} />
                </TouchableOpacity>

            </View>

            


            { capturedPhoto  &&
            
            
                <Modal
                animationType="slide"
                transparent={false}
                visible={modalIsOpen}
                >

                    <View style={{flex: 1, backgroundColor:'#323335'}}>

                    
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20}}>

                        <Image 
                            style={{width: '100%', height: 300, borderRadius: 20}}
                            source={{uri: capturedPhoto}}
                        />

                        <View style={{flex:0, flexDirection:"row"}}>
                            <TouchableOpacity style={{margin: 10}} onPress={() => {setModalIsOpen(false), setIsSaving(false) }}>
                                <FontAwesome name="window-close" size={50} color={'red'}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ margin: 10 }} onPress={savePicture}>
                                {isSaving ? (
                                    <ActivityIndicator size={50} color="green" />
                                ) : (
                                    <FontAwesome name="check" size={50} color={'green'} />
                                )}
                            </TouchableOpacity>
                        </View>
                        

                       

                    </View>
                    </View>

                </Modal>
            
            }

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
    },
    containerButtons:{
        flex:0,
        flexDirection: 'row',
        justifyContent: 'center',
        height: 80,
        backgroundColor: '#323335',
    },
    buttonRotate: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F45D16',
        borderRadius: 100,
        margin: 10,
        marginRight: 20,
        height: 50,
        width: 80
    },
    buttonCamera: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F45D16',
        borderRadius: 100,
        margin: 10,
        marginLeft: 30,
        height: 50,
        width: 80,
    }
})