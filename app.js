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
const CLIENT_ID = "your_client_id";
const CLIENT_SECRET = "your_client_secret";
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

    // Create a new form
    const newForm = {
      info: { title: "Welcome to popupQuiz" },
    };
    const createResponse = await forms.forms.create({ requestBody: newForm });

    const formId = createResponse.data.formId;

    // Convert the form to a quiz
    const updateRequest = {
      requests: [
        {
          updateSettings: {
            settings: {
              quizSettings: {
                isQuiz: true,
              },
            },
            updateMask: 'quizSettings.isQuiz',
          },
        },
      ],
    };

    await forms.forms.batchUpdate({
      formId: formId,
      requestBody: updateRequest,
    });

    // Validate and add questions to the quiz
    const { update } = req.body;
    
    console.log('update form :', update);

    // Validate update structure
    if (!update || !update.requests || !Array.isArray(update.requests)) {
      return res.status(400).send("Invalid update structure.");
    }


    const updateResponse = await forms.forms.batchUpdate({
      formId: formId,
      requestBody: update,
    });
    console.log('update response form :', updateResponse);

    const formUrl = `https://docs.google.com/forms/d/${formId}/viewform`;

    res.json({ formUrl, formId: createResponse.data.formId, formData: createResponse.data }); 

  } catch (error) {
    console.error('Failed to create form:', error);
    res.status(500).send("Failed to create form.");
  }
});

app.post("/api/close-form", async (req, res) => {
  const { formId } = req.body;
  if (!formId) {
      return res.status(400).send("formId is required.");
  }
  try {
      const formUrl = `https://docs.google.com/forms/d/${formId}/edit`;
      
      // Now proceed with the rest of the code to call the Google Apps Script
      const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwJBj-yEvWCnabpKh4L6NTFPcPRP-izalx_jPyrrI8RIDZjTOwazkT_0keZVE7QoDyyIA/exec'; // Replace with your web app URL
      const response = await fetch(`${GAS_WEB_APP_URL}?formUrl=${encodeURIComponent(formUrl)}`);
      const text = await response.text();
      res.send(text);
  } catch (error) {
      console.error("Failed to close form:", error.message);
      res.status(500).send("Failed to close form.");
  }
});

app.post("/api/get-responses", async (req, res) => {
  const { formId } = req.body;
  try {
    if (!oauth2Client.credentials || !oauth2Client.credentials.access_token) {
      return res.status(401).send("Authentication is required.");
    }

    if (!formId) {
      return res.status(400).send("Form ID is required.");
    }

    await oauth2Client.getAccessToken();

    const forms = google.forms({
      version: "v1",
      auth: oauth2Client,
    });

    const formResponse = await forms.forms.responses.list({
      formId: formId,
    });

    console.log("Form Response:", formResponse);

    const responses = formResponse.data.responses;

    res.json({ responses });
  } catch (error) {
    console.error('Failed to get responses:', error);
    res.status(500).send("Failed to get responses.");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
