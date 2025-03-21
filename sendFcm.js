

function sendNotification(token, title, body) {
    const notificationPayload = {
        message: {
            token: token, // FCM Token of the target device
            notification: {
                title: title,
                body: body,
            },
        },
    };

    const options = {
        hostname: 'fcm.googleapis.com',
        path: `/v1/projects/${PROJECT_ID}/messages:send`,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
        },
    };

    const req = https.request(options, (res) => {
        let data = '';

        // Accumulate data
        res.on('data', (chunk) => {
            data += chunk;
        });

        // Log the response when the request is finished
        res.on('end', () => {
            try {
                const jsonResponse = JSON.parse(data);
                console.log('Notification sent successfully:', jsonResponse);
            } catch (error) {
                console.error('Error parsing response:', error);
            }
        });
    });

    // Handle request errors
    req.on('error', (error) => {
        console.error('Error sending notification:', error);
    });

    // Send the request with the payload
    req.write(JSON.stringify(notificationPayload));
    req.end();
}


sendNotification(fcmToken, dynamicTitle, dynamicBody);

const https = require('https');
const { GoogleAuth } = require('google-auth-library');
const fs = require('fs');

// Replace with your actual Firebase project ID
const API_URL = `https://fcm.googleapis.com/v1/projects/${PROJECT_ID}/messages:send`;

// Path to your service account key file
const SERVICE_ACCOUNT_KEY_FILE = '/path/to/your-service-account-key.json';

// Load the service account key file
const auth = new GoogleAuth({
    keyFile: SERVICE_ACCOUNT_KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
});

// Function to get a new access token
async function getAccessToken() {
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    return accessToken.token;
}

// Function to send notification
async function sendNotification(token, title, body) {
    const accessToken = await getAccessToken();  // Get a fresh access token
    
    const notificationPayload = {
        message: {
            token: token,  // FCM Token of the target device
            notification: {
                title: title,
                body: body,
            },
        },
    };

    const options = {
        hostname: 'fcm.googleapis.com',
        path: `/v1/projects/${PROJECT_ID}/messages:send`,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,  // Use fresh access token
            'Content-Type': 'application/json',
        },
    };

    const req = https.request(options, (res) => {
        let data = '';

        // Accumulate data
        res.on('data', (chunk) => {
            data += chunk;
        });

        // Log the response when the request is finished
        res.on('end', () => {
            try {
                const jsonResponse = JSON.parse(data);
                console.log('Notification sent successfully:', jsonResponse);
            } catch (error) {
                console.error('Error parsing response:', error);
            }
        });
    });

    // Handle request errors
    req.on('error', (error) => {
        console.error('Error sending notification:', error);
    });

    // Send the request with the payload
    req.write(JSON.stringify(notificationPayload));
    req.end();
}


sendNotification(fcmToken, 'Test Title', 'This is a test notification body.');


