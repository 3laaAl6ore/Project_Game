import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const QuestionItem = props => {
   console.log(props)
   const answers =  props.questionItem.answers;
    return(
        <View style={styles.container}>
            {

       props.current ==20 ?(
                  <Text> **** ***</Text>
       ):(
           <View>

            <View style={{flexDirection:'row'}}>
                 <Text style={styles.header}>Question {props.current+1}/{props.ArrLen}</Text>
                 <Image
                        style={styles.tinyLogo}
                        source={require('../assets/logo.png')}
                        
                    />
            </View>
       
        <Text style={styles.questTitle}>{props.questionItem.title}</Text>

        {
            
            answers.map((answer,index) => (
                    <TouchableOpacity style={styles.btn} key={index} onPress={() => {
                    props.onNextQuestion(props.questionItem.id);
                    props.onAnswer(answer);
                }}>
                    <Text style={styles.btn_text}>{answer.title}</Text>
                </TouchableOpacity>
            ))
        }
        </View>
       )

   }
        </View>
    )

}

const styles = StyleSheet.create({
    btn:{
        width:'100%',
        backgroundColor:'#ffffff',
        padding:15,
        borderRadius:12,
        marginBottom:12,
        shadowColor: '#000000',
        shadowOpacity:0.1,
        shadowOffset: {width:0, height:3},
        shadowRadius: 2, elevation:5
    },
    btn_text: {fontSize:22},
    questTitle: {fontSize:28, marginBottom:40},
    container: {
        flex:1, width:'100%',
        alignItems:'flex-start', 
    },
    header:{


    },
    tinyLogo:{
        width:'100%',
        height:'100%',
        resizeMode:'contain',
        alignItems:'flex-end'
    }
});

export default QuestionItem;