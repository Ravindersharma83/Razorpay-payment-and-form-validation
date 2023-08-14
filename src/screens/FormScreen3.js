import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    TextInput,
    Button,
    TouchableOpacity,
    Image
  } from 'react-native'
import React, { useState } from 'react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import CustomInput from './CustomInput'
import ImagePicker from 'react-native-image-crop-picker';

const FormScreen3 = () => {
    const[visible,setVisible] = useState(false);
    const blogValidationSchema = yup.object().shape({
        title: yup
          .string()
          .required('Title is required'),
        post: yup
          .string()
          .min(20, ({ min, value }) => `${min - value.length} characters to go`)
          .required('Blog post is required'),
        photo: yup.object().required('Photo is required'),
      })
  return (
    <SafeAreaView style={styles.container}>
    <View style={{margin:20}}>
       {!visible ? (
        <>
         <Text style={{textAlign:'center',fontWeight:'bold',fontSize:24}}>Post Blog Form Example</Text>
         <Text style={{color:'blue',textTransform:'capitalize',marginVertical:10}}>Finally, let’s jump onto our last form. The content creation form, in this form we will have three fields for title, content, and photo.Notice we added a few properties to the post input, making it multiline and increasing numberOfLines to three.</Text>
         <Text style={{color:'blue',textTransform:'capitalize',marginVertical:10}}>Earlier, we used .min() to ensure passwords are above 8 characters, we’ll use the same here to ensure the post is long enough (20 character minimum) and show the user a message on the number of characters to go:</Text>
         </>
       ) : null}
    </View>

    {visible ? (
        <View style={styles.signupContainer}>
        <Text>Blog Screen</Text>
        <Formik
          initialValues={{
            title: '',
            post: '',
            photo: null,
          }}
          onSubmit={values => console.log(values)}
          validationSchema={blogValidationSchema}
        >
          {({ handleSubmit, isValid, values, setFieldValue, setFieldTouched, errors, touched }) => (
            <>
              <Field
                component={CustomInput}
                name="title"
                placeholder="Title"
              />
              <Field
                component={CustomInput}
                name="post"
                placeholder="Write post..."
                multiline
                numberOfLines={3}
              />
              <TouchableOpacity
                  style={styles.photoButton}
                  onPress={() => {
                    ImagePicker.openCamera({
                      width: 300,
                      height: 400,
                      cropping: true,
                    }).then(image => {
                      console.log(image.path);
                      if (image) setFieldValue('photo', image)
                        setFieldTouched('photo', true)
                    });
                  }}
                >
                <Text>Add Image</Text>
              </TouchableOpacity>
              {values.photo &&
                // <Text>{`...${values.photo.path}`}</Text>
                <Image source={{uri:values.photo.path}} style={{height:50,width:50,marginBottom:10}}/>
              }

              {(errors.photo && touched.photo || values.photo === null) &&
                <Text style={{ color: 'red' }}>{errors.photo}</Text>
              }
              <Button
                onPress={handleSubmit}
                title="POST"
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

export default FormScreen3

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
    photoButton:{
      backgroundColor:'orange',
      padding:10,
      margin:10
    }
})