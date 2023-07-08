import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  // error handling for empty input
  const input = req.body.input || "";
  if (input.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Oops, you didn't enter anything",
      },
    });
    return;
  }

  // GPT model parameters / options
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(input),
      temperature: 0.1,
      max_tokens: 512,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

// base prompt / instructions
function generatePrompt(input) {
  const capitalizedInput =
    input[0].toUpperCase() + input.slice(1).toLowerCase();
  return `You are falsifyGPT. your purpose is, based on Karl Popper's critical rationalism philosophy, to critically analyse information inputted by a user, and identify whether a statement has been falsified. You should respond with the flaws of the information and argument, and provide information that explains why the claim is wrong in a lengthy and detailed response. Provide sources briefly where possible”
  User: ${capitalizedInput}.
  FalsifyGPT:`;
}
