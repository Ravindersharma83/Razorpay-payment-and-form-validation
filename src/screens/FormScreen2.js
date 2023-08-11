import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    TextInput,
    Button,
  } from 'react-native'
  import { Formik, Field } from 'formik'
  import * as yup from 'yup'
import React, { useState } from 'react'
import CustomInput from './CustomInput'

const FormScreen2 = () => {
    const[visible,setVisible] = useState(false);
    const signUpValidationSchema = yup.object().shape({
        fullName: yup
          .string()
          .matches(/(\w.+\s).+/, 'Enter at least 2 names')
          .required('Full name is required'),
        phoneNumber: yup
          .string()
          .matches(/(01)(\d){8}\b/, 'Enter a valid phone number')
          .required('Phone number is required'),
        email: yup
          .string()
          .email("Please enter valid email")
          .required('Email is required'),
        password: yup
          .string()
          .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
          .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
          .matches(/\d/, "Password must have a number")
          .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
          .min(8, ({ min }) => `Password must be at least ${min} characters`)
          .required('Password is required'),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref('password')], 'Passwords do not match')
          .required('Confirm password is required'),
      })
  return (
    <SafeAreaView style={styles.container}>
    <View style={{margin:20}}>
       {!visible ? (
        <>
         <Text style={{textAlign:'center',fontWeight:'bold',fontSize:24}}>Sign up form</Text>
         <Text style={{color:'blue',textTransform:'capitalize',marginVertical:10}}>In the previous section on login form, we used Formik to handle our forms but still had to pass the different functions (like handleChange, handleBlur value, etc.) to each TextInput, this can become a lot of work as inputs increase.Formik provides a component Field that automatically hooks up inputs to Formik for us.</Text>
         <Text style={{color:'blue',textTransform:'capitalize',marginVertical:10}}>In this section, we will explore that.Let’s start this section by creating a CustomInput component that will be passed into the Field component, get the Formik props, and handle the inputs for us.this CustomInput takes care of a lot of the things we were doing in the login form TextInputs, from handling the input, styling, checking for and rendering errors, etc.</Text>
         </>
       ) : null}
        {/* <Button title={visible ? 'Hide Example' : 'View Example'} color={visible ? 'red' : 'green'} onPress={()=>setVisible(!visible)}/> */}
    </View>
    {visible ? (
            <View style={styles.signupContainer}>
            <Text>Sign Up Screen</Text>
            <Formik
                  initialValues={{
                    fullName: '',
                    email: '',
                    phoneNumber: '',
                    password: '',
                    confirmPassword: '',
                  }}
                  onSubmit={values => console.log(values)}
                  validationSchema={signUpValidationSchema}
                >
                  {({ handleSubmit, isValid }) => (
                    <>
                      <Field
                        component={CustomInput}
                        name="fullName"
                        placeholder="Full Name"
                      />
                      <Field
                        component={CustomInput}
                        name="email"
                        placeholder="Email Address"
                        keyboardType="email-address"
                      />
                      <Field
                        component={CustomInput}
                        name="phoneNumber"
                        placeholder="Phone Number"
                        keyboardType="numeric"
                      />
                      <Field
                        component={CustomInput}
                        name="password"
                        placeholder="Password"
                        secureTextEntry
                      />
                      <Field
                        component={CustomInput}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        secureTextEntry
                      />
      
                      <Button
                        onPress={handleSubmit}
                        title="SIGN UP"
                        disabled={!isValid}
                      />
                    </>
                  )}
              </Formik>
          </View>
    ) : null}
    <View style={{marginVertical:20}}>
        <Button title={visible ? 'Hide Example' : 'View Example'} color={visible ? 'red' : 'green'} onPress={()=>setVisible(!visible)}/>
    </View>
  </SafeAreaView>

  )
}

export default FormScreen2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupContainer: {
        width: '80%',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        elevation: 10,
        backgroundColor: '#e6e6e6'
    },
})