import React from 'react';
import { Dimensions, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../../../assets/styles/colors';

const BannerItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <Image
                source={item.image}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.textContainer}>
                <Text style={styles.description}>
                    {item.text}
                </Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>
                        En savoir plus
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        height: height * 0.6,
        width: width,
        flexDirection: 'row'
    },
    textContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        padding: 20,
        justifyContent: 'flex-end'
    },
    description: {
        fontSize: 16,
        color: '#ffffff', // Texte en blanc pour contraster avec le fond sombre
        marginBottom: 10
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    buttonText: {
        color: colors.primary,
        fontSize: 16
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    }
});

export default BannerItem;
