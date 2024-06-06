# POPUPQUIZ


## Google Forms Integration

This project includes an integration with Google Forms to create and manage forms programmatically.

### Prerequisites

1. **Node.js**: Download and install Node.js from [Node.js Official Website](https://nodejs.org/). This will also install npm (Node Package Manager).

2. **Google Cloud Project**: Set up a project in Google Cloud and enable the Google Forms API. Follow the steps below:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project.
   - Navigate to the **APIs & Services > Library**.
   - Search for and enable the **Google Forms API**.
   - Navigate to **APIs & Services > Credentials**.
   - Create **OAuth 2.0 Client IDs** and download the credentials JSON file. Save this file as `credentials.json` in your project directory.

### Installation

1. **Clone the Repository**

   ```bash
   git clone <https://github.com/linaahlem/POPUPQUIZ.git>
   cd <your-repository-name>
   ```

2. **Install Dependencies**
    ```bash
   npm install
    ```

### Prerequisites
1. **Start the server**
   - Run the following command to start your server
       ```bash
      node app.js
       ```
   -You should see a message indicating the server is running:
      ```bash
      Server running at http://localhost:3000
       ```
1. **Start the server**
   -Open your web browser and navigate to:
         ```bash
      http://localhost:3000/auth
       ```
   This will prompt you to log in with your Google account and authorize the application. After successful authentication, you will receive a message confirming that you can now create forms.

### Create a Form
You can create a form by sending a POST request to http://localhost:3000/api/create-form. You can use tools like Postman or write a frontend that makes this reques


 
   




   
