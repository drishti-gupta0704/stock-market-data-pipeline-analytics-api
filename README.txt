STOCKPULSE FRONTEND — HTML, CSS, VANILLA JAVASCRIPT

WHAT IT DOES
- Loads a stock's latest record using GET /stocks/:symbol
- Draws recent price history using GET /stocks/history/:symbol
- Displays top gainers and losers using the analytics endpoints
- Provides CSV export links for one symbol and all stock records
- Uses the deployed backend URL by default

HOW TO RUN
Recommended: use VS Code's Live Server extension.
1. Extract this folder.
2. Open the folder in VS Code.
3. Right-click index.html and choose "Open with Live Server".
4. Wait for the API to respond. The first request to a hosted free service can take a little while.

Alternatively, in this folder run:
  python3 -m http.server 5500
Then open http://localhost:5500

CONNECT TO LOCAL BACKEND
In app.js, change API_BASE to your local backend address, e.g.:
  const API_BASE = 'http://localhost:5000';
Then start the backend with npm start (or node server.js, depending on your project setup).

CORS NOTE
The current backend code does not appear to register CORS middleware. If the browser console reports a CORS error, in the backend project:
  npm install cors
Then in server.js, near the top:
  const cors = require('cors');
  app.use(cors());
Put app.use(cors()) before the routes, then restart/redeploy the backend.
For production, restrict CORS to your frontend origin rather than allowing every origin.

NOTES
- This UI displays data from the existing backend; it does not create mock stock data.
- The analytics queries return rows from your stored database records, so the same symbol can appear more than once if your database stores multiple timestamps.
- Never share your backend .env file or database/API credentials. Since the uploaded archive included an .env file, rotate any credentials contained in it and keep the replacement only in your local environment file.
