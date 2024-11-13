# InfiniteCraft Copy

InfiniteCraft is an element-combining game.

## Features

- **Element Combination:** Combine elements to discover new ones.
- **Emoji Integration:** Each combination is represented with an emoji.
- **Database Storage:** Store and retrieve combinations and emojis from a PostgreSQL database.
- **AI Assistance:** Use Cohere's AI to determine new combinations and appropriate emojis.

## API Endpoints

### Combine Elements

**Endpoint:** `/api/combine`

**Method:** `GET`

**Parameters:**

- `ele1`: The first element to combine.
- `key`: A key for authorization.
- `ele2`: The second element to combine.

**Example Request:**
```bash
curl "http://localhost:3000/api/combine?ele1=water&key=your_key&ele2=fire"
```
**Example Response:**
```
{
  "emoji": "🔥",
  "combination": "steam"
}
```

## How It Works

1. **Element Combination:**
   - Users provide two elements via the `/api/combine` endpoint.
   - The script checks if the combination exists in the PostgreSQL database.
   - If not found then Cohere's AI is used to determine the combination and its emoji.

2. **Emoji Handling:**
   - The script retrieves or generates an appropriate emoji for the combination.
   - The combination and emoji are stored in the PostgreSQL database for future use.

3. **Database Operations:**
   - A PostgreSQL table `combinations` stores combinations and their corresponding emojis.
   - The table is created if it does not already exist.
