const url = window.location.href;
const match = url.match(/[?&]code=([^&]+)/);

function requestAccessTokenFromGoogle() {
    localStorage.removeItem('access_token');
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    if (match) {
        const code = match[1];
        requestGoogleToken(code);
    }
}

function requestAccessTokenFromSpringAuthServer() {
    localStorage.removeItem('access_token');
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    if (match) {
        const code = match[1];
        requestSpringServerToken(code);
    }
}


function requestGoogleToken(code) {

    const tokenEndpoint = 'https://accounts.google.com/o/oauth2/token';
    const params = {
        client_id: 'your-client-id',
        client_secret: 'your-client-secret',
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'your-redirect-uri'
    };

    const formBody = Object.keys(params)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', tokenEndpoint, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(formBody);
    xhr.onload = function () {
        const data = JSON.parse(this.responseText);
        setAccessTokenCookie(data.access_token);
        setRefreshTokenCookie(data.refresh_token);
        localStorage.setItem('access_token', data.access_token);
        window.location.href = '/home'; // Redirect to the home page
    };
}


function requestSpringServerToken(code) {
    const tokenEndpoint = 'http://localhost:8180/oauth2/token';    // The token endpoint of the Spring Authorization Server
    const params = {
        client_id: 'test-client',
        client_secret: 'test1234',
        scope: 'profile',
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'http://localhost:8080/authorized'
    };

    const formBody = Object.keys(params)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', tokenEndpoint, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(formBody);
    xhr.onload = function () {
        const data = JSON.parse(this.responseText);
        setAccessTokenCookie(data.access_token);
        setRefreshTokenCookie(data.refresh_token);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        window.location.href = '/home'; // Redirect to the home page
    };
}

function setAccessTokenCookie(accessToken) {
    const expirationMinutes = 59;
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + expirationMinutes);
    document.cookie = `access_token=${accessToken}; expires=${expirationDate.toUTCString()}; path=/`;
    localStorage.setItem('access_token_expiration', expirationDate);
}

function setRefreshTokenCookie(refreshToken) {
    document.cookie = `refresh_token=${refreshToken}; path=/`;
}


// Verify if the user has an access token stored in the local storage
const storedAccessToken = localStorage.getItem('access_token');
if (storedAccessToken) {
    const expirationDate = new Date(localStorage.getItem('access_token_expiration'));
    if (expirationDate > new Date()) {
        setAccessTokenCookie(storedAccessToken);
    } else {
        const code = url.substring(url.indexOf('?code=') + 6, url.indexOf('&scope='));
        requestGoogleToken(code);
    }
}



