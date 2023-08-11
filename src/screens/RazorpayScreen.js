import { Alert,StyleSheet, View, Button, TextInput } from 'react-native';
import React from 'react';
import RazorpayCheckout from 'react-native-razorpay';

const RazorpayScreen = () => {
    const [amount, setAmount] = React.useState(null);
  let options = {
    description: 'Online Fee',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    key: 'rzp_test_45rMrwLDI4F15M',
    amount: Math.round(amount * 100),
    name: 'Test',
    prefill: {
      email: 'void@razorpay.com',
      contact: '9191919191',
      name: 'Razorpay Software'
    },
    theme: {color: '#F37254'}
  }

  const onPressButton = () => {
    RazorpayCheckout.open(options).then((data) => {
      // handle success
      Alert.alert(`Success: ${data.razorpay_payment_id}`);
      setAmount(null);
    }).catch((error) => {
      // handle failure
      Alert.alert(`Error: ${error.code} | ${error.description}`);
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
      <TextInput
        style={styles.input}
        onChangeText={(val)=>setAmount(val)}
        value={amount}
        keyboardType="numeric"
        placeholder='Enter Amount'
      />
        <Button title='Pay using Razorpay' onPress={onPressButton}/>
      </View>
    </View>
  )
}

export default RazorpayScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center'
      },
      buttonContainer:{
        margin:20
      },
      alternativeLayoutButtonController:{
        margin:20,
        flexDirection:'row',
        justifyContent:'space-between'
      },
      input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
})