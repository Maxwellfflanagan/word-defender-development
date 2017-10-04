'use strict';

import wgfetch from 'whatwg-fetch';

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

export default class CentralStationV2 {
  constructor(environment = "development") {

    switch (environment) {
      case "development":
        this.baseURL = "http://" + window.location.hostname + ":3001/api/";
        this.studentPortalUrl = "http://" + window.location.hostname + ":3000/studentportal";
        break;
      case "staging":
        this.baseURL = "https://staging.tutormate.org/api/v2/";
        this.studentPortalUrl = "https://portal.sp-staging.tutormate.org";
        break;
      case "production":
        this.baseURL = "https://www.tutormate.org/api/v2/";
        this.studentPortalUrl = "https://portal.sp.tutormate.org";
        break;
      default:
        this.baseURL = "https://www.tutormate.org/api/v2/";
        this.studentPortalUrl = "https://portal.sp.tutormate.org";
    }


    this.token = "";
    this.offline = false;
  }

  transmit(uri, params = {}, method = "POST", onFailure = function (error) {
    console.log(error);
  }) {
    var _this = this;
    // Convert to GET params if necessary
    if (method == "GET") {
      uri += "?" + Object.keys(params).map(function (key) {
          return key + '=' + params[key];
        }).join('&');
    }

    // Build headers
    var headers = {
      'Content-Type': 'application/json'
    }
    if (this.token) headers['Authorization'] = 'Bearer ' + this.token;

    if (this.offline) {
      return onFailure();
    }
    /* @returns {wrapped Promise} with .resolve/.reject/.catch methods */
// It goes against Promise concept to not have external access to .resolve/.reject methods, but provides more flexibility
    var getWrappedPromise = function () {
      var wrappedPromise = {},
        promise = new Promise(function (resolve, reject) {
          wrappedPromise.resolve = resolve;
          wrappedPromise.reject = reject;
        });
      wrappedPromise.then = promise.then.bind(promise);
      wrappedPromise.catch = promise.catch.bind(promise);
      wrappedPromise.promise = promise;// e.g. if you want to provide somewhere only promise, without .resolve/.reject/.catch methods
      return wrappedPromise;
    };

    /* @returns {wrapped Promise} with .resolve/.reject/.catch methods */
    var getWrappedFetch = function () {
      var wrappedPromise = getWrappedPromise();
      var args = Array.prototype.slice.call(arguments);// arguments to Array

      fetch.apply(null, args)// calling original fetch() method
        .then(function (response) {
          wrappedPromise.resolve(response);
        }, function (error) {
          wrappedPromise.reject(error);
        })
        .catch(function (error) {
          wrappedPromise.catch(error);
        });
      return wrappedPromise;
    };

    var getJSON = function (url, params) {
      var wrappedFetch = getWrappedFetch(
        url,
        params
      );

      var timeoutId = setTimeout(function () {
        wrappedFetch.reject(new Error('Load timeout for resource: ' + params.url));// reject on timeout
      }, 30000);

      return wrappedFetch.promise// getting clear promise from wrapped
        .then(function (response) {
          clearTimeout(timeoutId);
          return response;
        })
    };

    return getJSON(this.baseURL + uri, {
      method: method,
      mode: 'cors',
      redirect: 'follow',
      headers: new Headers(headers),
      body: (method == "POST") ? JSON.stringify(params) : null
    }).then((response) => {
      // Check status
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        // Throw error
        var error = new Error(response.statusText);
        error.response = response;
        console.error('External error while fetching API request.', response.code, response);

        throw error;
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      // Hold token for future calls
      if (data && data.token) this.token = data.token;

      return data;
    }).catch(function () {
      _this.offline = true;
      return onFailure();
    });
  }

  studentPortalAuth() {
    var studentList = getCookie('studentList');
    var players = getCookie('players');
    var authToken = getCookie('authToken')

    if (!studentList || !players || !authToken) {
      (window.top || window).location = this.studentPortalUrl;
    } else {
      this.token = authToken;
      this.players = JSON.parse(decodeURIComponent(players));
      this.studentList = JSON.parse(decodeURIComponent(studentList));
      this.questionSkill = getCookie('questionSkill') || 'all';
      if (this.players.length) {
        this.player = this.studentDetails(this.players[0]);
      }
    }
  }

  studentDetails(playerId) {
    for (var x = 0; x < this.studentList.length; x++) {
      if (this.studentList[x].id === playerId) {
        return this.studentList[x];
      }
    }
  }

  // Get an auth token for subsequent requests
  authenticate(email, password) {
    return this.transmit(`auth`, {
      email: email,
      password: password
    });
  }

  // Create a new game session amongst a group of students
  gameSession(activity_name) {
    var _this = this;
    return this.transmit(`game_session`, {
      students: this.players,
      activity_name: activity_name,
      skill: this.questionSkill
    }, "POST", this.createOfflineGameSession.bind(this, null, activity_name, this.questionSkill)).then(function (gameSession) {
      if (gameSession != 'Offline') {
        _this.syncGameSessions();
      }
      return gameSession;
    });
  }

  createOfflineGameSession(id, activity_name, skill) {
    var gameSessions = window.localStorage.getItem('offlineGameSessions');
    gameSessions = (gameSessions && gameSessions.length) ? JSON.parse(gameSessions) : [];
    var newGameSession = id ? {id: id, answers: []} : {
        created_at: (new Date).getTime(),
        activity_name: activity_name,
        skill: skill,
        answers: []
      };
    gameSessions.push(newGameSession);
    window.localStorage.setItem('offlineGameSessions', JSON.stringify(gameSessions));
    return Promise.resolve('Offline');
  }

  // Log an answer selection within a game session
  logAnswer(question_id, answer_id, is_correct, player_id = 0, game_session_id = 0) {
    return this.transmit(`game_sessions/${game_session_id}/answer_selections`, {
      question_id: question_id,
      answer_id: answer_id,
      is_correct: is_correct,
      player_id: player_id
    }, "POST", this.convertToOfflineGameSession.bind(this, question_id, answer_id, is_correct, player_id, game_session_id));
  }

  convertToOfflineGameSession(question_id, answer_id, is_correct, player_id = 0, game_session_id = 0) {
    this.createOfflineGameSession(game_session_id);
    return this.logAnswerOffline(question_id, answer_id, is_correct, player_id, game_session_id);
  }

  // Log an answer selection within a game session
  logAnswerOffline(question_id, answer_id, is_correct, player_id = 0, game_session_id = 0) {
    var gameSessions = window.localStorage.getItem('offlineGameSessions');
    gameSessions = gameSessions.length ? JSON.parse(gameSessions) : [];
    var answerSelections = gameSessions[gameSessions.length - 1]['answers'];
    answerSelections.push({
      question_id: question_id,
      answer_id: answer_id,
      is_correct: is_correct,
      player_id: player_id,
      created_at: (new Date).getTime()
    });
    gameSessions[gameSessions.length - 1]['answers'] = answerSelections;
    window.localStorage.setItem('offlineGameSessions', JSON.stringify(gameSessions));
    return Promise.resolve();
  }

  //  Get single random question for a given user id
  randomQuestion(user_id, readingLevel, skill) {
    return this.transmit(`users/${user_id}/questions/random`, {skill: this.questionSkill}, "GET", this.randomOfflineQuestion.bind(this, readingLevel, skill));
  }


  randomOfflineQuestion(readingLevel, skill) {
    var assessment_to_question_skill_map = {
      'onset_rimes': ['onset', 'rime'],
      'affixes': ['affix'],
      'sight_words': ['sight_word'],
      'letter_names': ['letter']
    };
    var questionBank = JSON.parse(decodeURIComponent(window.localStorage.getItem('questionBank')));
    var subSkills = assessment_to_question_skill_map[skill] ? assessment_to_question_skill_map[skill] : [];
    var filteredBank = questionBank.filter(function (q) {
      return q.assessed.reading_stage === readingLevel
        && (skill === 'all' || subSkills.indexOf(q.assessed.type.toLowerCase()) != -1);
    });
    if (filteredBank.length === 0) {
      filteredBank = questionBank.filter(function (q) {
        return (skill === 'all' || subSkills.indexOf(q.assessed.type.toLowerCase()) != -1);
      });
      var lowestLevel = Math.min.apply(null, filteredBank.map(function (q) {
        return q.assessed.reading_stage;
      }));
      filteredBank = filteredBank.filter(function (q) {
        return q.assessed.reading_stage === lowestLevel;
      });
    }
    if (filteredBank.length === 0) {
      filteredBank = questionBank.filter(function (q) {
        return q.assessed.reading_stage === readingLevel;
      });
    }
    var randomQuestion = filteredBank[Math.floor(Math.random() * filteredBank.length)];
    randomQuestion['selectedAnswer'] = -1;
    return Promise.resolve(randomQuestion);
  }

  // Get full question bank
  getQuestions() {
    return this.transmit(`questions`, {}, "GET");
  }

  // Get full question bank
  syncGameSessions() {
    var gameSessions = window.localStorage.getItem('offlineGameSessions');
    gameSessions = (gameSessions && gameSessions.length) ? JSON.parse(gameSessions) : [];
    if (gameSessions.length) {
      return this.transmit(`game_session_collection`, {game_sessions: gameSessions}, "POST").then(function () {
        window.localStorage.setItem('offlineGameSessions', '');
      });
    }
  }

  // Get full question bank
  getStudents() {
    return this.transmit(`students`, {}, "GET");
  }

  TTSSpeak(speech, onDone) {

    if ("android" in window) {
      window.TTSCallback = {
        onDone: onDone ? onDone : () => {
          }
      };
      window.android.speak(speech);
    } else {

      var utterance = new SpeechSynthesisUtterance(speech);

      if (onDone) {
        utterance.addEventListener("end", onDone);
      }
      window.speechSynthesis.speak(utterance);
    }
  }

}