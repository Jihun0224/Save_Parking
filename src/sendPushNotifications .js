import React from 'react';

export const sendPushNotifications = async (fcmToken) => {
    const FIREBASE_API_KEY = "AAAAAj_i0e0:APA91bFpjtbGo0nxW0Q3k93expq65CH-38K-qP1oShtPjDmhVgeUwLLltQFxJ0nNDJ0PUPB81TOD1KBHOxzzad24gw_cErzLnUSAoAOUuLOenmeMAtdbIbTz0a1tbvwPSJUA6Dw0cBpx";
    const message = {
        to: fcmToken,
  
      notification: {
        title: "This is a Notification",
        boby: "This is the body of the Notification",
        vibrate: 1,
        sound: 1,
        show_in_foreground: true,
        priority: "high",
        content_available: true,
      },
      data: {
        title: "This is a Notification",
        boby: "This is the body of the Notification",
        score: 50,
        wicket: 1,
  
      },
    }
    
    let headers = new Headers({
      "Content-Type" : "application/json",
      Authorization: "key=" + FIREBASE_API_KEY,
    })
  
    let response = await fetch ("https://fcm.googleapis.com/fcm/send",{
      method: "POST",
      headers,
      body: JSON.stringify(message),
    })
    response = await response.json();
    console.log(response);
  }