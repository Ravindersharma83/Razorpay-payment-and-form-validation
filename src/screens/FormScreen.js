import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';

const FormScreen = () => {
    let PrefilForm ={name: 'Ravinder Sharma ', email: 'ravinder@gmail.com', password: 'Temp123$', confirmPassword: 'Temp123$', mobile: '9856955698'}
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(6, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Please enter your full name'),
    email: Yup.string()
      .email('Invalid email')
      .required('Please enter your email address'),
    password: Yup.string()
      .min(8)
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must contain minimun 8 characters and at least one uppercase letter,one lowercase letter, one number and one special character')
      .required('Please enter a password'),
    confirmPassword: Yup.string()
      .min(8,'Confirm password must be 8 characters long')
      .oneOf([Yup.ref('password'), null], 'Your Passwords do not match')
      .required('Please confirm your password'),
    mobile: Yup.string()
      .min(10,'Must be exactly 10 digits')
      .min(10,'Must be exactly 10 digits')
      .matches(/^[0-9]{10}$/, 'Invalid mobile number')
      .required('Please enter your mobile number'),
  });

  return (
    <Formik
      initialValues={{
        name: PrefilForm.name,
        email: PrefilForm.email,
        password: PrefilForm.password,
        confirmPassword: PrefilForm.confirmPassword,
        mobile: PrefilForm.mobile
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        // Handle form submission here
        console.log('Form values:', values);
        Alert.alert(JSON.stringify(values));
        PrefilForm = {...PrefilForm,name:values.name,email:values.email,password:values.password,confirmPassword:values.confirmPassword,mobile:values.mobile}
        console.log('user-profile-data',PrefilForm);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, setFieldTouched, handleSubmit, isValid }) => (
        <View style={styles.wrapper}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Form Validation</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder='Full Name'
                value={values.name}
                onChangeText={handleChange('name')}
                // onBlur={handleBlur('name')}
                onBlur={()=>setFieldTouched('name')}
              />
              {touched.name && errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder='Email'
                // autoCapitalize={false}
                value={values.email}
                onChangeText={handleChange('email')}
                // onBlur={handleBlur('email')}
                onBlur={()=>setFieldTouched('email')}
                keyboardType='email-address'
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder='Password'
                // autoCapitalize={false}
                value={values.password}
                onChangeText={handleChange('password')}
                // onBlur={handleBlur('password')}
                onBlur={()=>setFieldTouched('password')}
                // secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder='Confirm Password'
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                // onBlur={handleBlur('confirmPassword')}
                onBlur={()=>setFieldTouched('confirmPassword')}
                // secureTextEntry
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder='Mobile Number'
                value={values.mobile}
                onChangeText={handleChange('mobile')}
                // onBlur={handleBlur('mobile')}
                onBlur={()=>setFieldTouched('mobile')}
                keyboardType='phone-pad'
              />
              {touched.mobile && errors.mobile && (
                <Text style={styles.errorText}>{errors.mobile}</Text>
              )}
            </View>

            <TouchableOpacity onPress={handleSubmit} 
            style={[
                styles.submitBtn,
                    {backgroundColor:isValid ? '#395b64' : '#A5C99CA' }
                ]} 
                disabled={!isValid}>
              <Text style={styles.submitBtnTxt}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
}

export default FormScreen;

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'gray',
        paddingHorizontal:15
    },
    formContainer:{
        backgroundColor:'#f5eddc',
        padding:20,
        borderRadius:15,
        width:'100%',
        elevation:10
    },
    title:{
        color:'#16213e',
        fontSize:26,
        fontWeight:'400',
        marginBottom:15
    },
    inputWrapper:{
        marginBottom:15,
    },
    inputStyle:{
        borderColor:'#16213e',
        borderWidth:1,
        borderRadius:5,
        padding:10
    },
    errorText:{
        fontSize:12,
        color:'#ff0d10'
    },
    submitBtn:{
        // backgroundColor:'#395b64',
        padding:10,
        borderRadius:15,
        justifyContent:'center'
    },
    submitBtnTxt:{
        color:'#fff',
        textAlign:'center',
        fontSize:18,
        fontWeight:'700'
    }
});
