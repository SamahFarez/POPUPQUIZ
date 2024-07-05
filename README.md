# POPUPQUIZ

At POPUPQUIZ, we revolutionize the way of approaching learning and assessment. Our platform seamlessly integrates with lectures, allowing to generate customized quizzes that enhance understanding and retention. Whether it is an educator looking to create dynamic assessments or a student seeking interactive study tools, POPUPQUIZ offers a user-friendly interface and robust features designed to meet their needs.

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

### Running the Application

1. **Start the server**
2. **Run the following command to start your server**
       ```bash
      node app.js
       ```
       
   You should see a message indicating the server is running:
      ```bash
      Server running at http://localhost:3000
      ```
      
3. **Start the server**
   -Open your web browser and navigate to:
   ```bash
      http://localhost:3000/auth
   ```
   
This will prompt you to log in with your Google account and authorize the application. After successful authentication, you will receive a message confirming that you can now create forms.

### Create a Form
You can create a form by sending a POST request to http://localhost:3000/api/create-form. You can use tools like Postman or write a frontend for it 

## Model API

This repository also contains the Model API, which allows you to interact with our model using a simple app. Follow the steps below to set up and run the application.

## Setup Instructions

### 1. Create and Activate a Virtual Environment

Create a virtual environment to manage the project dependencies and activate it.
   ```bash
   conda create -p venv python==3.12
   conda activate venv/
   ```

### 2. Install Required Libraries
Install all necessary libraries listed in the requirements.txt file.
   ```bash
   pip install -r requirements.txt 
   ```

### 3. Create a .env File

- GROQ_API_KEY=your_groq_api_key_here
- GOOGLE_API_KEY=your_google_api_key_here

### 4. Navigate to the Model Directory and Run the Application 

Run the app.py script to start the application.
   ```bash
   cd model
   python app.py
   ```

Once the application is running, you can start using the model through the provided API endpoints.



## Contributing

We welcome contributions to enhance Durar - Quranic School Management System! If you have suggestions, bug reports, or want to contribute new features, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
