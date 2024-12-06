import './App.css';
import Anthropic from '@anthropic-ai/sdk';
import { useState, useEffect } from 'react';

function App() {
  const [questionNumber, setQuestionNumber] = useState(0)
  const [question, setquestion] = useState('')
  const anthropic = new Anthropic({
    apiKey: '',
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    (async () => {
      const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1000,
        temperature: 1.0,
        system: "you may only respond in format <q> [question] </q> <a> [answer choice A.] / [explanation for why A. is wrong or right] </a> <b> [answer choice B.] / [explanation for why B. is wrong or right] </b> <c> [answer choice C.] / [explanation for why C. is wrong or right] </c> <d> [answer choice D.] / [explanation for why D. is wrong or right] </d> <ca> [correct answer] </ca> <ex> [explain the correct answer] </ex> <sk> [skill this question is testing.] </sk>",
        messages: [
            {
            "role": "user",
            "content": [
                {
                "type": "text",
                "text": "Subject: Math. Skill: n/a. Difficulty: Easy. Generate me a SAT question"
                }
            ]
            }
        ]
      });
      console.log(msg)
      setquestion(msg.content[0].text)
    })()
  }, [questionNumber])

  return (
    <div className="App">
      <header className="Header">
        SAT Prep
      </header>
      <div>
        <span className="">{questionNumber}</span>
        <div className="">{question}</div>
        <button className="" onClick={() => {setQuestionNumber(questionNumber + 1)}}></button>
      </div>
    </div>
  );
}

export default App;
