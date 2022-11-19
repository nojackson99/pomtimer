export class LocalStorage {
  constructor() {}

  saveSessionLengths(sessionLengths) {
    const jsonData = JSON.stringify(sessionLengths);
    localStorage.setItem('sessionLengths', jsonData);
  }

  // Load sessionLengths from localStorage or return default data.
  loadSessionLengths() {
    const jsonData = localStorage.getItem('sessionLengths');
    let sessionLengths = JSON.parse(jsonData);

    // On first app run no sessionLengths will be stored. Return default data,
    // this will be replaced if user changes/saves new session length data
    if (sessionLengths == null) {
      sessionLengths = {
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 20,
      };
    }
    return sessionLengths;
  }

  saveProfileData(profileData) {
    const jsonData = JSON.stringify(profileData);
    localStorage.setItem('profileData', jsonData);
  }

  loadProfileData() {
    const jsonData = localStorage.getItem('profileData');
    let profileData = JSON.parse(jsonData);

    if (profileData == null) {
      profileData = [];
    }

    return profileData;
  }
}
