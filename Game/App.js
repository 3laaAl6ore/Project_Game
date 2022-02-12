import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,ImageBackground , TouchableOpacity} from 'react-native';
import QuestionItem from './components/Quistions';

export default function App() {

  let tempQuestionsArr = [];
  const [correctAnswers , setCorrectAnswers] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [nextQuestion, setNextQuestion] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [letsPlay , setLetsPlay] = useState(false);
  useEffect(async () => {
    const url = 'https://opentdb.com/api.php?amount=20&category=18';
    const response = await fetch(url, { method: 'get' });
    const response_data = await response.json();

    let questionId = 0;

    response_data.results.forEach(question => {

      let answers = [];
      const correct_answer = { title: question.correct_answer, isCorrect: true };
      answers.push(correct_answer);
      question.incorrect_answers.forEach(item => {
        const incorrect_answer = { title: item, isCorrect: false };
        answers.push(incorrect_answer);
      })

      const formatted_question = {
        id: questionId++,
        title: question.question,
        type: question.type,
        category: question.category,
        difficulty: question.difficulty,
        answers: shuffle(answers)
      }
      tempQuestionsArr.push(formatted_question);
    })
    setQuestions(tempQuestionsArr);
  }, [])

  const shuffle = (arr) => {
    let currentIndex = arr.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex],arr[currentIndex]];
    }
    return arr;
  }




  const onNextQuestion = () => {
    console.log("currentQuestion->",currentQuestion," questions.length:",questions.length);
    if(currentQuestion == questions.length)
      return ;
    let number = currentQuestion;
    number++;
    setCurrentQuestion(number);
    let nextQuest = questions[currentQuestion].id;
    setNextQuestion(nextQuest);
  }

  const onAnswer = (answer) => {
         console.log(answer.isCorrect);
    if(answer.isCorrect)
    {
      setCorrectAnswers(correctAnswers+1)
 
    }
  //  console.log(JSON.stringify(answer.isCorrect)+"-> " + correctAnswers);
     else
      return;
  }
 
  const questionsUI = questions.map((question, index) => {
   // if(currentQuestion+1 ==questions.length)
    // {
     // return  <Text>HHH</Text>
    // }
     // else
    //  {
         if (nextQuestion == question.id) {
         return <QuestionItem 
         key={index} 
         questionItem={question}
         onNextQuestion={onNextQuestion}
         onAnswer={onAnswer}
         correct = {correctAnswers} 
         current = {currentQuestion}
         ArrLen ={questions.length}
      />
     }
   //}

  })


  return (
    <View style={styles.container}>
      {
        letsPlay ? (questionsUI) : (
          <View style={{width:'100%',height:'100%'}}>
          <ImageBackground style={styles.BackgroundImage} source={require('./assets/letsPlay.jpg')}>
            <TouchableOpacity style={styles.letsPlay}
            onPress={()=>setLetsPlay(true)}
            >
          <Text 
            style={{
              fontSize:44,
              fontWeight:'bold',   
            }}
          > Let's Play </Text>
        </TouchableOpacity>
        </ImageBackground> 
        </View>
		)
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddf0f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BackgroundImage:{
    width:'100%',
    height:'100%'
  },
  letsPlay:{
   marginTop:'145%',
   marginLeft:'30%',
    backgroundColor:'white',
    width:'45%',
  }
});