import './App.css';
import Anthropic from '@anthropic-ai/sdk';
import { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoadingScreen from './components/Loading/Loading';

function App() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
  });
  const [recommendations, setRecommendations] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = [
    {
        label: "What are your primary sources of energy?",
        name: "energySources",
        placeholder: "e.g., electricity, gas, renewable sources",
    },
    {
        label: "How do you typically commute or travel, and how often?",
        name: "commute",
        placeholder: "e.g., driving daily, public transport weekly",
    },
    {
        label: "Do you practice waste segregation or recycling at home or work?",
        name: "recycling",
        placeholder: "e.g., yes, no, sometimes",
    },
    {
        label: "What type of diet do you follow, and how often do you consume animal products?",
        name: "diet",
        placeholder: "e.g., vegetarian, omnivore, vegan",
    },
    {
        label: "How often do you purchase new clothing or products?",
        name: "purchases",
        placeholder: "e.g., weekly, monthly, rarely",
    },
    {
        label: "Do you prioritize energy-efficient appliances and electronics?",
        name: "energyEfficiency",
        placeholder: "e.g., yes, no, sometimes",
    },
    {
        label: "What steps do you take to conserve water in your daily routine?",
        name: "waterConservation",
        placeholder: "e.g., short showers, fixing leaks, none",
    },
    {
        label: "How do you handle waste disposal for electronic devices or hazardous materials?",
        name: "eWasteDisposal",
        placeholder: "e.g., recycling center, regular trash",
    },
    {
        label: "Do you support or engage with local environmental or sustainability initiatives?",
        name: "localInitiatives",
        placeholder: "e.g., yes, no, sometimes",
    },
    {
        label: "How often do you use single-use plastics or disposable items?",
        name: "singleUsePlastics",
        placeholder: "e.g., daily, weekly, rarely",
    },
    {
        label: "Do you grow any of your food or participate in local food-sharing programs?",
        name: "foodPrograms",
        placeholder: "e.g., yes, no, planning to",
    },
    {
        label: "What steps have you taken to reduce your carbon footprint?",
        name: "carbonFootprint",
        placeholder: "e.g., using public transport, planting trees",
    },
    {
        label: "Do you consider the sustainability of businesses or brands when making purchases?",
        name: "sustainablePurchases",
        placeholder: "e.g., yes, no, sometimes",
    },
    {
        label: "Are you aware of your household’s energy and water consumption levels?",
        name: "energyWaterAwareness",
        placeholder: "e.g., yes, no, somewhat",
    },
    {
        label: "How often do you use public transportation, bike, or walk instead of driving?",
        name: "alternativeCommute",
        placeholder: "e.g., daily, weekly, rarely",
    },
    {
        label: "Do you offset your carbon emissions through programs or contributions?",
        name: "carbonOffsets",
        placeholder: "e.g., yes, no, planning to",
    },
    {
        label: "How often do you repair or reuse items instead of discarding them?",
        name: "reuseRepair",
        placeholder: "e.g., frequently, rarely, never",
    },
    {
        label: "Do you minimize paper usage by opting for digital alternatives when possible?",
        name: "paperReduction",
        placeholder: "e.g., yes, no, sometimes",
    },
    {
        label: "Have you implemented renewable energy sources, like solar panels, in your home?",
        name: "renewableEnergy",
        placeholder: "e.g., yes, no, planning to",
    },
    {
        label: "What kind of cleaning products or personal care items do you use, and are they eco-friendly?",
        name: "ecoFriendlyProducts",
        placeholder: "e.g., natural products, conventional items",
    }
];


  const anthropic = new Anthropic({
    apiKey: process.env.REACT_APP_ANTHROPIC_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const inputText = `You will be given information in the <tag>format question: answer</tag>. for each question, respond in the format <tag>personalized recommendation for improving your impact on the environment</tag>. do not provide anything else in your response.` + 
      questions.map((q) => 
        `<${q.name}>${q.label.split('?')[0]}: ${userInput[q.name] || "not specified"}</${q.name}>`
      ).join(",\n")
      console.log(inputText)

      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 5000,
        temperature: 0.7,
        top_p: 1,
        messages: [{ role: 'user', content: inputText }],
      });

      setRecommendations(response.content[0].text);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
    setLoading(false);
  };

  return (
    <div className="App">

      {loading && <LoadingScreen />}

      <Header/>
      <main>
        {!isSubmitted ? (
          
          <>
            <span className="">You may not realize, but every single decision you make, from driving to work in your favorite sports car to eating a juicy steak for lunch, has an impact on the environment. Answer this quick survey to learn how you can make a positive impact on the environment, leaving us all with a better world.</span>
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                {questions.map((question, index) => (
                  <div key={index} className="input-field">
                    <label htmlFor={question.name}>{question.label}</label>
                    <input
                      type="text"
                      id={question.name}
                      name={question.name}
                      value={userInput[question.name]}
                      onChange={handleInputChange}
                      placeholder={question.placeholder}
                      required
                    />
                  </div>
                ))}
                <button type="submit" className="submit-btn">Get Recommendations</button>
              </form>
            </div>
          </>

        ) : (

          <>
              <div className="recommendations-container">
                <h3>Your Recommendations:</h3>
                <p>{recommendations}</p>
                <button onClick={() => setIsSubmitted(false)} className="retry-btn">Try Again</button>
              </div>
            <span className="">You may not realize, but every single decision you make, from driving to work in your favorite sports car to eating a juicy steak for lunch, has an impact on the environment. Answer this quick survey to learn how you can make a positive impact on the environment, leaving us all with a better world.</span>
          </>

        )}
      </main>
      <Footer/>

    </div>
  );
}

export default App;
