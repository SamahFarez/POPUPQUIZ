import express from "express";
import { google } from "googleapis";
import open from "open";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// Determine __dirname equivalent in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

const OAuth2Client = google.auth.OAuth2;
const CLIENT_ID =
  "712015173804-411e4pqa7jjldl3lrt6eb2t6raj3ror3.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000/oauth2callback";

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
const SCOPES = [
  "https://www.googleapis.com/auth/forms",
  "https://www.googleapis.com/auth/drive",
];
const TOKEN_PATH = path.join(__dirname, 'token.json');

// Function to load tokens from file
function loadTokens() {
  try {
    if (fs.existsSync(TOKEN_PATH)) {
      const tokenData = fs.readFileSync(TOKEN_PATH, 'utf8');
      return JSON.parse(tokenData);
    } else {
      console.log('Token file not found, proceeding without tokens.');
      return null;
    }
  } catch (err) {
    console.error('Error loading tokens:', err);
    return null;
  }
}

// Function to save tokens to file
function saveTokens(tokens) {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
}

// Load tokens if available
const storedTokens = loadTokens();
if (storedTokens) {
  oauth2Client.setCredentials(storedTokens);
}

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline", // Ensures a refresh token is returned
  scope: SCOPES,
});

app.get("/auth", (req, res) => {
  open(authUrl);
  res.send("Authentication request sent. Check your browser.");
});

app.get("/oauth2callback", async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    saveTokens(tokens);
    res.send("Authentication successful! You can now create forms.");
  } catch (error) {
    console.error(`Error getting tokens: ${error}`);
    res.send("Failed to authenticate.");
  }
});

app.post("/api/create-form", async (req, res) => {
  if (!oauth2Client.credentials || !oauth2Client.credentials.access_token) {
    return res.status(401).send("Authentication is required.");
  }

  try {
    // Ensure the token is refreshed if needed
    await oauth2Client.getAccessToken();

    const forms = google.forms({
      version: "v1",
      auth: oauth2Client,
    });

    const newForm = {
      info: { title: "Welcome to popupQuiz" },
    };
    const createResponse = await forms.forms.create({ requestBody: newForm });

    const { update } = req.body;

    const updateResponse = await forms.forms.batchUpdate({
      formId: createResponse.data.formId,
      requestBody: update,
    });

    const formUrl = `https://docs.google.com/forms/d/${createResponse.data.formId}/viewform`;

    res.json({ formUrl, formData: createResponse.data });

  } catch (error) {
    console.error('Failed to create form:', error);
    res.status(500).send("Failed to create form.");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
