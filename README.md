# OAuth 2.0 Connect Flow Application

This is a Java Spring application that implements the OAuth 2.0 Connect Flow. It exposes three templates: sign-in, authorized, and home. These templates are used for the authentication process and displaying the obtained authorization code and access token.

## Structure

- `src/main/java/ro/bogdan_mierloiu/connect_flow/`: Java source code directory.
    - `controller/`: Contains the main controller class.
- `src/main/resources/`: Resources directory.
    - `static/`: Contains static resources like CSS and JavaScript files.
        - `js/`: JavaScript files for sign-in and token retrieval.
        - `style/`: CSS files for styling the templates.
    - `templates/`: Thymeleaf templates.
        - `sign-in.html`: Template for sign-in options.
        - `authorized.html`: Template for displaying the authorization code.
        - `home.html`: Template for displaying the obtained access token.
- `pom.xml`: Maven project configuration file.

## Functionality

1. **Sign-in**: The sign-in page allows users to choose between signing in with Google or the Spring Authorization Server.
2. **Authorized**: After choosing an authentication provider, the user is redirected to the corresponding provider's authentication page, where they can sign in and authorize the application.
3. **Home**: Upon successful authorization, the application receives an authorization code, which is then exchanged for an access token using a JavaScript POST request to the `/oauth2/token` endpoint of the authentication provider.
    - The obtained access token is stored in the browser's local storage.
    - The home page displays the access token.

## JavaScript Files
    
    - `authServerSignIn.js`: Handles the sign-in process with the Spring Authorization Server.
    - `googleSignIn.js`: Handles the sign-in process with Google.
    - `accessToken.js`: Handles the token retrieval process.
    - **Note**: Make sure to replace the client IDs, client secrets, and other credentials with your actual values.

## Setting Credentials

- Ensure that you have the necessary credentials (client IDs, client secrets, etc.) from Google and the Spring Authorization Server.
- Replace the placeholders in the JavaScript files with your actual credentials.

## Running the Application

1. Clone this repository.
2. Make sure you have Java and Maven installed on your system.
3. Navigate to the project directory and run `mvn spring-boot:run`.
4. Open your web browser and go to `http://localhost:8080` to access the application.
