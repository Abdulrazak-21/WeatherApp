import React, { useEffect, useRef, useState } from "react"
import { Modal, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Button, Image, Animated } from "react-native"
const styles = StyleSheet.create({
    modalContainer: {
        width: '80%',
        backgroundColor: '#E6E6FA',
        padding: 20,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    header: {
        //width: '100%',
        height: 40,
        backgroundColor: '#fff',
        alignItems: 'flex-end'

    },
    top: {
        fontSize: 50,
        fontWeight: '800',
        color: '#000',
    },
    temp: {
        marginLeft: 10,
        fontSize: 14,
        fontWeight: '600',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
    },
    bottomWrapper: {
        borderWidth: 2,
        borderRadius: 10,
        width: "50%",
        alignItems: 'center',
        marginHorizontal: 3,
    },
}
)
const ModalPopup = ({ visible, children }) => {
    const [showModal, setShowModal] = useState(visible)
    const scaleValue = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        toggleModal();
    }, [visible])
    const toggleModal = () => {
        if (visible) {
            setShowModal(true);
            Animated.spring(scaleValue, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        } else {
            setShowModal(false)
        }
    }
    return (
        <Modal transparent visible={showModal}>
            <View style={styles.modalBackground}>
                <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>{children}</Animated.View>
            </View>
        </Modal>
    )
};
const Modalscreen = (props) => {
    const [visible, setVisible] = useState(false);
    return (
        <SafeAreaView>
            <View>
                <ModalPopup visible={visible}>
                    <View>
                        {/* <View style={styles.header}> */}
                        <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => setVisible(false)}>
                            <Image source={require('../assets/images/cancel.png')}
                                style={{ width: 20, height: 20, borderColor: '#000', borderWidth: 2, borderRadius: 30, }}></Image>
                        </TouchableOpacity>
                        {/* </View> */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View>
                                <Text style={styles.top}>{props.temp}&#176;C</Text>
                            </View>
                            <View >
                                <Text style={styles.temp}>Feels Like {props.feels_like}&#176;C</Text>
                                <Text style={styles.temp}>Pressure {props.pressure} hPA</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontWeight: '500', fontSize: 20, color: '#000', }}>It seems like {props.description}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <View style={styles.bottomWrapper}>
                                <View>
                                    <Text style={{ fontSize: 24, color: '#000', }}>Humidity</Text>
                                    <Text style={styles.temp}>{props.humidity}%</Text>
                                </View>
                            </View>
                            <View style={styles.bottomWrapper}>
                                <View>
                                    <Text style={{ fontSize: 24, color: '#000', }}>UV Index</Text>
                                    <Text style={styles.temp}>{props.uvi} of 10</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ModalPopup>
                <View style={{ marginTop: 10, }}>
                    <Button title="More" onPress={() => setVisible(true)} />
                </View>
            </View>
        </SafeAreaView>
    )
}
export default Modalscreen;