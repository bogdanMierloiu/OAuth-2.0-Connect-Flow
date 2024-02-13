/**
 * Function to initiate OAuth 2.0 authentication with Google Server.
 * It creates a form to request an access token.
 */

function googleSignIn() {

    // Google endpoint for requesting an access token
    let oauth2Endpoint = 'https://accounts.google.com/o/oauth2/auth';

    // Create element to open OAuth 2.0 endpoint in new window.
    let form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauth2Endpoint);

    let params = {
        'client_id': 'your-client-id',                          // Client ID registered in Google Developer Console
        'client_secret': 'your-client-secret',                  // Client secret registered in Google Developer Console
        'response_type': 'code',                                // Response type indicating code flow
        'scope': 'https://www.googleapis.com/auth/calendar',    // Scopes requested for access
        'redirect_uri': 'http://localhost:8080/authorized',     // Redirect URI to handle the response
        'access_type': 'offline'                                // Access type to request a refresh token
    };

    // Add form parameters as hidden input values.
    for (let p in params) {
        let input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }

    // Append the form to the body and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
}

