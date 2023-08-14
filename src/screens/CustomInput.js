import { Text, TextInput, StyleSheet } from 'react-native';
import React from 'react'; 

const CustomInput = (props) => {
    const {
        field: { name, onBlur, onChange, value },
        form: { errors, touched, setFieldTouched },
        ...inputProps
      } = props;

    const hasError = errors[name] && touched[name]
  return (
    <>
        <TextInput
        style={[
            styles.textInput,
            props.multiline && { height: props.numberOfLines * 40 }, // for multi line textinput
            hasError && styles.errorInput
        ]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
            setFieldTouched(name)
            onBlur(name)
        }}
        {...inputProps}
        />
        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  )
}

export default CustomInput

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        width: '100%',
        margin: 10,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        textAlignVertical: 'top'
      },
      errorText: {
        fontSize: 10,
        color: 'red',
      },
      errorInput: {
        borderColor: 'red',
      }
})