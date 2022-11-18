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
      console.log('in sessionLengths == null');
      sessionLengths = {
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 20,
      };
    }
    console.log('in loadSessionLengths()');
    console.log(sessionLengths);
    return sessionLengths;
  }
}
