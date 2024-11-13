const Together = require("together-ai");
const { readFileSync } = require("fs");
const { Client } = require("pg");
const { parse } = JSON;

const prompt = parse(readFileSync(process.cwd() + "/prompt.json", "utf8"));

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

const pgClient = new Client({
  connectionString: process.env.DATABASE_URL,
});

pgClient
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL");
    createTable();
  })
  .catch((err) => console.error("Connection error", err.stack));

async function createTable() {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS combinations (
        id SERIAL PRIMARY KEY,
        elements TEXT[],
        emoji TEXT,
        combination TEXT
      );
    `;
    await pgClient.query(query);
    console.log('Table "combinations" created successfully');
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

// Function to save combination and emoji to database
const saveCombinationAndEmojiToDB = async (
  elements,
  emojiSymbol,
  combination,
) => {
  try {
    const query = `
      INSERT INTO combinations (elements, emoji, combination)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [elements, emojiSymbol, combination];
    const res = await pgClient.query(query, values);
    console.log("Combination and emoji saved to PostgreSQL:", res.rows[0]);
  } catch (error) {
    console.error("Error saving combination and emoji to PostgreSQL:", error);
    throw error;
  }
};

// Function to check if a combination exists in the database for a specific word
const checkCombinationExists = async (word) => {
  try {
    const query = `
      SELECT * FROM combinations
      WHERE $1 = ANY(elements);
    `;
    const values = [word];
    const res = await pgClient.query(query, values);

    if (res.rows.length > 0) {
      console.log("Combination found in PostgreSQL:", res.rows);
      return true;
    } else {
      console.log("No combination found for the word:", word);
      return false;
    }
  } catch (error) {
    console.error("Error checking combination in PostgreSQL:", error);
    throw error;
  }
};

// Function to get combination and emoji from database
const getCombinationAndEmojiFromDB = async (elements) => {
  try {
    const query = `
      SELECT emoji, combination FROM combinations
      WHERE elements @> $1::text[];
    `;
    const values = [elements];
    const res = await pgClient.query(query, values);
    if (res.rows.length > 0) {
      console.log(
        "Combination and emoji retrieved from PostgreSQL:",
        res.rows[0],
      );
      return res.rows[0];
    } else {
      console.log("No combination and emoji found in PostgreSQL");
      return null;
    }
  } catch (error) {
    console.error(
      "Error retrieving combination and emoji from PostgreSQL:",
      error,
    );
    throw error;
  }
};

async function combineElements(key, element1, element2) {
  const sorted = [element1, element2].sort();
  const [w1, w2] = sorted;

  if (key == process.env.KEY && w1 && w2) {
    let combo = await getCombinationAndEmojiFromDB([w1, w2]);
    if (combo) combo.new = false;

    if (!combo) {
      let messages = prompt;
      messages.push({
        role: "user",
        content: `Combine "${w1}" and "${w2}", the first letter of the combination should be capitalized, and ONLY THE JSON!`,
      });

      const response = await together.chat.completions.create({
        messages: messages,
        model: "meta-llama/Meta-Llama-3-70B-Instruct-Lite",
        max_tokens: 512,
        temperature: 0.7,
        top_p: 0.7,
        top_k: 50,
        repetition_penalty: 1,
        stop: ["<|eot_id|>"],
      });

      const msg = response.choices[0].message.content;
      console.log("Message: ", msg);

      let js = JSON.parse(msg);
      console.log("JSON: ", js);

      js.new = !(await checkCombinationExists(js.combination));

      if (!js.elements) js.elements = [w1, w2];

      await saveCombinationAndEmojiToDB(js.elements, js.emoji, js.combination);

      console.log("New element created! ", js);
      return { combination: js.combination, emoji: js.emoji, new: js.new };
    } else return combo;
  } else throw new Error("Invalid key");
}

module.exports = combineElements;
