import './App.css';
import Anthropic from '@anthropic-ai/sdk';
import { useState, useEffect } from 'react';
import LoadingScreen from './components/Loading/Loading';

function App() {
  const [questionNumber, setQuestionNumber] = useState(1)
  const [subject, setsubject] = useState('Math')
  const [skill, setskill] = useState('any')
  const [difficulty, setdifficulty] = useState('Easy')
  const [loading, setloading] = useState(true)
  const [question, setquestion] = useState('')
  const [answers, setanswers] = useState([])
  const [correctanswer, setcorrectanswer] = useState('')
  const [explanation, setexplanation] = useState('')
  const [currentskill, setcurrentskill] = useState('')
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const anthropic = new Anthropic({
    apiKey: process.env.REACT_APP_ANTHROPIC_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const parseXML = (xmlString) => {
    const fullXml = `<?xml version="1.0" encoding="UTF-8"?><root>${xmlString}</root>`;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(fullXml, 'text/xml');
    
    return {
      question: xmlDoc.querySelector('q').textContent,
      answers: [
        { label: 'A', text: xmlDoc.querySelector('a').textContent.split('/')[0], explanation: xmlDoc.querySelector('a').textContent.split('/')[1] },
        { label: 'B', text: xmlDoc.querySelector('b').textContent.split('/')[0], explanation: xmlDoc.querySelector('b').textContent.split('/')[1] },
        { label: 'C', text: xmlDoc.querySelector('c').textContent.split('/')[0], explanation: xmlDoc.querySelector('c').textContent.split('/')[1] },
        { label: 'D', text: xmlDoc.querySelector('d').textContent.split('/')[0], explanation: xmlDoc.querySelector('d').textContent.split('/')[1] }
      ],
      correctanswer: { label: xmlDoc.querySelector('ca').textContent.toUpperCase(), explanation: xmlDoc.querySelector('ex').textContent},
      skill: xmlDoc.querySelector('sk').textContent,
    };
  };

  useEffect(() => {
    (async () => {
      setloading(true)
      try {
        const msg = await anthropic.messages.create({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 2000,
          temperature: 1,
          top_p: 0,
          system: `Generate a Subject: ${subject}. Skill: ${skill}. Difficulty: ${difficulty} SAT question in strict XML format. Wrap each component in exact XML tags. Ensure NO newlines or extra whitespace. Format: <q>Question text</q><a>Choice A / Explanation</a><b>Choice B / Explanation</b><c>Choice C / Explanation</c><d>Choice D / Explanation</d><ca>Correct Answer Letter</ca><ex>Detailed Solution Explanation</ex><sk>Skill Tested</sk>`,
          messages: [
              {
              "role": "user",
              "content": [
                  {
                  "type": "text",
                  "text": `${Math.random()}`,
                }
              ]
              }
          ]
        });
        const parsedquestion = parseXML(msg.content[0].text)
        setquestion(parsedquestion['question'])
        setanswers(parsedquestion['answers'])
        setcorrectanswer(parsedquestion['correctanswer'])
        setexplanation(parsedquestion['explanation'])
        setcurrentskill(parsedquestion['skill'])
      }
      catch (error) {
        console.error(error)
      }
      setloading(false)
    })()
  }, [questionNumber, subject, skill, difficulty])

  return (
    <div className="App">
      {loading && <LoadingScreen />}
      <header className="Header">SAT Prep</header>
      
      <div className="question-container">
        <div>
          <span className="question-number">{questionNumber}</span>
          <span className="skill-tag">{currentskill}</span>
        </div>
        
        <div className="question-text">{question}</div>
        
        <div className="answers-container">
          {answers.map((answer, index) => (
            <div 
              key={index}
              className={`answer-option ${selectedAnswer === answer.label ? 'selected' : ''}`}
              onClick={() => setSelectedAnswer(answer.label)}
            >
              {answer.label}: {answer.text}
            </div>
          ))}
        </div>
        
        <button 
          className="check-btn" 
          onClick={() => {
            setQuestionNumber(questionNumber + 1);
            setSelectedAnswer(null);
          }}
        >
          Next Question
        </button>
      </div>
    </div>
  );
}

export default App;
