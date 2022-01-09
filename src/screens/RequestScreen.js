import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const RequestScreen = () => {
    const [url, setUrl] = useState('');
    return (
        <View>
            <TextInput style={styles.input} onChangeText={setUrl} value={url} />
        </View>
    );
};

export default RequestScreen;

const styles = StyleSheet.create({});
