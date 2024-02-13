/**
 * Function to initiate OAuth 2.0 authentication with Spring Authorization Server.
 * It creates a form to request an access token.
 */
function authServerSignIn() {
    // Internal-Server endpoint for requesting an access token
    let oauth2Endpoint = 'http://localhost:8180/oauth2/authorize';
    // let oauth2Endpoint = 'https://deployment-server-url/oauth2/authorize'; -> replace with deployment server url

    // Create a form element to open OAuth 2.0 endpoint in a new window.
    let form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauth2Endpoint);

    // Parameters required for authorization
    let params = {
        'client_id': 'test-client',                        // Client ID registered with the Authorization Server
        'response_type': 'code',                           // Response type indicating code flow
        'scope': 'profile',                                // Scopes requested for access
        'redirect_uri': 'http://localhost:8080/authorized' // Redirect URI to handle the response
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
