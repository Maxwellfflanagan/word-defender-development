"bundle";
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.to-object.js', ['npm:core-js@1.2.7/library/modules/$.defined.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var defined = $__require('npm:core-js@1.2.7/library/modules/$.defined.js');
  module.exports = function (it) {
    return Object(defined(it));
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/es6.object.keys.js', ['npm:core-js@1.2.7/library/modules/$.to-object.js', 'npm:core-js@1.2.7/library/modules/$.object-sap.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var toObject = $__require('npm:core-js@1.2.7/library/modules/$.to-object.js');
  $__require('npm:core-js@1.2.7/library/modules/$.object-sap.js')('keys', function ($keys) {
    return function keys(it) {
      return $keys(toObject(it));
    };
  });
});
System.registerDynamic('npm:core-js@1.2.7/library/fn/object/keys.js', ['npm:core-js@1.2.7/library/modules/es6.object.keys.js', 'npm:core-js@1.2.7/library/modules/$.core.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  $__require('npm:core-js@1.2.7/library/modules/es6.object.keys.js');
  module.exports = $__require('npm:core-js@1.2.7/library/modules/$.core.js').Object.keys;
});
System.registerDynamic("npm:babel-runtime@5.8.38/core-js/object/keys.js", ["npm:core-js@1.2.7/library/fn/object/keys.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("npm:core-js@1.2.7/library/fn/object/keys.js"), __esModule: true };
});
System.registerDynamic('npm:whatwg-fetch@1.1.1/fetch.js', [], true, function ($__require, exports, module) {
  /* */
  "format cjs";

  var global = this || self,
      GLOBAL = global;
  (function (self) {
    'use strict';

    if (self.fetch) {
      return;
    }

    var support = {
      searchParams: 'URLSearchParams' in self,
      iterable: 'Symbol' in self && 'iterator' in Symbol,
      blob: 'FileReader' in self && 'Blob' in self && function () {
        try {
          new Blob();
          return true;
        } catch (e) {
          return false;
        }
      }(),
      formData: 'FormData' in self,
      arrayBuffer: 'ArrayBuffer' in self
    };

    if (support.arrayBuffer) {
      var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

      var isDataView = function (obj) {
        return obj && DataView.prototype.isPrototypeOf(obj);
      };

      var isArrayBufferView = ArrayBuffer.isView || function (obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
      };
    }

    function normalizeName(name) {
      if (typeof name !== 'string') {
        name = String(name);
      }
      if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
      }
      return name.toLowerCase();
    }

    function normalizeValue(value) {
      if (typeof value !== 'string') {
        value = String(value);
      }
      return value;
    }

    // Build a destructive iterator for the value list
    function iteratorFor(items) {
      var iterator = {
        next: function () {
          var value = items.shift();
          return { done: value === undefined, value: value };
        }
      };

      if (support.iterable) {
        iterator[Symbol.iterator] = function () {
          return iterator;
        };
      }

      return iterator;
    }

    function Headers(headers) {
      this.map = {};

      if (headers instanceof Headers) {
        headers.forEach(function (value, name) {
          this.append(name, value);
        }, this);
      } else if (headers) {
        Object.getOwnPropertyNames(headers).forEach(function (name) {
          this.append(name, headers[name]);
        }, this);
      }
    }

    Headers.prototype.append = function (name, value) {
      name = normalizeName(name);
      value = normalizeValue(value);
      var list = this.map[name];
      if (!list) {
        list = [];
        this.map[name] = list;
      }
      list.push(value);
    };

    Headers.prototype['delete'] = function (name) {
      delete this.map[normalizeName(name)];
    };

    Headers.prototype.get = function (name) {
      var values = this.map[normalizeName(name)];
      return values ? values[0] : null;
    };

    Headers.prototype.getAll = function (name) {
      return this.map[normalizeName(name)] || [];
    };

    Headers.prototype.has = function (name) {
      return this.map.hasOwnProperty(normalizeName(name));
    };

    Headers.prototype.set = function (name, value) {
      this.map[normalizeName(name)] = [normalizeValue(value)];
    };

    Headers.prototype.forEach = function (callback, thisArg) {
      Object.getOwnPropertyNames(this.map).forEach(function (name) {
        this.map[name].forEach(function (value) {
          callback.call(thisArg, value, name, this);
        }, this);
      }, this);
    };

    Headers.prototype.keys = function () {
      var items = [];
      this.forEach(function (value, name) {
        items.push(name);
      });
      return iteratorFor(items);
    };

    Headers.prototype.values = function () {
      var items = [];
      this.forEach(function (value) {
        items.push(value);
      });
      return iteratorFor(items);
    };

    Headers.prototype.entries = function () {
      var items = [];
      this.forEach(function (value, name) {
        items.push([name, value]);
      });
      return iteratorFor(items);
    };

    if (support.iterable) {
      Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
    }

    function consumed(body) {
      if (body.bodyUsed) {
        return Promise.reject(new TypeError('Already read'));
      }
      body.bodyUsed = true;
    }

    function fileReaderReady(reader) {
      return new Promise(function (resolve, reject) {
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.onerror = function () {
          reject(reader.error);
        };
      });
    }

    function readBlobAsArrayBuffer(blob) {
      var reader = new FileReader();
      var promise = fileReaderReady(reader);
      reader.readAsArrayBuffer(blob);
      return promise;
    }

    function readBlobAsText(blob) {
      var reader = new FileReader();
      var promise = fileReaderReady(reader);
      reader.readAsText(blob);
      return promise;
    }

    function readArrayBufferAsText(buf) {
      var view = new Uint8Array(buf);
      var chars = new Array(view.length);

      for (var i = 0; i < view.length; i++) {
        chars[i] = String.fromCharCode(view[i]);
      }
      return chars.join('');
    }

    function bufferClone(buf) {
      if (buf.slice) {
        return buf.slice(0);
      } else {
        var view = new Uint8Array(buf.byteLength);
        view.set(new Uint8Array(buf));
        return view.buffer;
      }
    }

    function Body() {
      this.bodyUsed = false;

      this._initBody = function (body) {
        this._bodyInit = body;
        if (!body) {
          this._bodyText = '';
        } else if (typeof body === 'string') {
          this._bodyText = body;
        } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
          this._bodyBlob = body;
        } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
          this._bodyFormData = body;
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this._bodyText = body.toString();
        } else if (support.arrayBuffer && support.blob && isDataView(body)) {
          this._bodyArrayBuffer = bufferClone(body.buffer);
          // IE 10-11 can't handle a DataView body.
          this._bodyInit = new Blob([this._bodyArrayBuffer]);
        } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
          this._bodyArrayBuffer = bufferClone(body);
        } else {
          throw new Error('unsupported BodyInit type');
        }

        if (!this.headers.get('content-type')) {
          if (typeof body === 'string') {
            this.headers.set('content-type', 'text/plain;charset=UTF-8');
          } else if (this._bodyBlob && this._bodyBlob.type) {
            this.headers.set('content-type', this._bodyBlob.type);
          } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
            this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
          }
        }
      };

      if (support.blob) {
        this.blob = function () {
          var rejected = consumed(this);
          if (rejected) {
            return rejected;
          }

          if (this._bodyBlob) {
            return Promise.resolve(this._bodyBlob);
          } else if (this._bodyArrayBuffer) {
            return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          } else if (this._bodyFormData) {
            throw new Error('could not read FormData body as blob');
          } else {
            return Promise.resolve(new Blob([this._bodyText]));
          }
        };

        this.arrayBuffer = function () {
          if (this._bodyArrayBuffer) {
            return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
          } else {
            return this.blob().then(readBlobAsArrayBuffer);
          }
        };
      }

      this.text = function () {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob);
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text');
        } else {
          return Promise.resolve(this._bodyText);
        }
      };

      if (support.formData) {
        this.formData = function () {
          return this.text().then(decode);
        };
      }

      this.json = function () {
        return this.text().then(JSON.parse);
      };

      return this;
    }

    // HTTP methods whose capitalization should be normalized
    var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

    function normalizeMethod(method) {
      var upcased = method.toUpperCase();
      return methods.indexOf(upcased) > -1 ? upcased : method;
    }

    function Request(input, options) {
      options = options || {};
      var body = options.body;

      if (typeof input === 'string') {
        this.url = input;
      } else {
        if (input.bodyUsed) {
          throw new TypeError('Already read');
        }
        this.url = input.url;
        this.credentials = input.credentials;
        if (!options.headers) {
          this.headers = new Headers(input.headers);
        }
        this.method = input.method;
        this.mode = input.mode;
        if (!body && input._bodyInit != null) {
          body = input._bodyInit;
          input.bodyUsed = true;
        }
      }

      this.credentials = options.credentials || this.credentials || 'omit';
      if (options.headers || !this.headers) {
        this.headers = new Headers(options.headers);
      }
      this.method = normalizeMethod(options.method || this.method || 'GET');
      this.mode = options.mode || this.mode || null;
      this.referrer = null;

      if ((this.method === 'GET' || this.method === 'HEAD') && body) {
        throw new TypeError('Body not allowed for GET or HEAD requests');
      }
      this._initBody(body);
    }

    Request.prototype.clone = function () {
      return new Request(this, { body: this._bodyInit });
    };

    function decode(body) {
      var form = new FormData();
      body.trim().split('&').forEach(function (bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
      return form;
    }

    function parseHeaders(rawHeaders) {
      var headers = new Headers();
      rawHeaders.split('\r\n').forEach(function (line) {
        var parts = line.split(':');
        var key = parts.shift().trim();
        if (key) {
          var value = parts.join(':').trim();
          headers.append(key, value);
        }
      });
      return headers;
    }

    Body.call(Request.prototype);

    function Response(bodyInit, options) {
      if (!options) {
        options = {};
      }

      this.type = 'default';
      this.status = 'status' in options ? options.status : 200;
      this.ok = this.status >= 200 && this.status < 300;
      this.statusText = 'statusText' in options ? options.statusText : 'OK';
      this.headers = new Headers(options.headers);
      this.url = options.url || '';
      this._initBody(bodyInit);
    }

    Body.call(Response.prototype);

    Response.prototype.clone = function () {
      return new Response(this._bodyInit, {
        status: this.status,
        statusText: this.statusText,
        headers: new Headers(this.headers),
        url: this.url
      });
    };

    Response.error = function () {
      var response = new Response(null, { status: 0, statusText: '' });
      response.type = 'error';
      return response;
    };

    var redirectStatuses = [301, 302, 303, 307, 308];

    Response.redirect = function (url, status) {
      if (redirectStatuses.indexOf(status) === -1) {
        throw new RangeError('Invalid status code');
      }

      return new Response(null, { status: status, headers: { location: url } });
    };

    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;

    self.fetch = function (input, init) {
      return new Promise(function (resolve, reject) {
        var request = new Request(input, init);
        var xhr = new XMLHttpRequest();

        xhr.onload = function () {
          var options = {
            status: xhr.status,
            statusText: xhr.statusText,
            headers: parseHeaders(xhr.getAllResponseHeaders() || '')
          };
          options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
          var body = 'response' in xhr ? xhr.response : xhr.responseText;
          resolve(new Response(body, options));
        };

        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };

        xhr.ontimeout = function () {
          reject(new TypeError('Network request failed'));
        };

        xhr.open(request.method, request.url, true);

        if (request.credentials === 'include') {
          xhr.withCredentials = true;
        }

        if ('responseType' in xhr && support.blob) {
          xhr.responseType = 'blob';
        }

        request.headers.forEach(function (value, name) {
          xhr.setRequestHeader(name, value);
        });

        xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
      });
    };
    self.fetch.polyfill = true;
  })(typeof self !== 'undefined' ? self : this);
});
System.registerDynamic("npm:whatwg-fetch@1.1.1.js", ["npm:whatwg-fetch@1.1.1/fetch.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("npm:whatwg-fetch@1.1.1/fetch.js");
});
System.register('github:innovationsforlearning/centralstation-js-client@master/centralstation.js', ['npm:babel-runtime@5.8.38/helpers/create-class.js', 'npm:babel-runtime@5.8.38/helpers/class-call-check.js', 'npm:babel-runtime@5.8.38/core-js/object/keys.js', 'npm:babel-runtime@5.8.38/core-js/promise.js', 'npm:whatwg-fetch@1.1.1.js'], function (_export) {
  var _createClass, _classCallCheck, _Object$keys, _Promise, wgfetch, CentralStationV2;

  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  return {
    setters: [function (_npmBabelRuntime5838HelpersCreateClassJs) {
      _createClass = _npmBabelRuntime5838HelpersCreateClassJs['default'];
    }, function (_npmBabelRuntime5838HelpersClassCallCheckJs) {
      _classCallCheck = _npmBabelRuntime5838HelpersClassCallCheckJs['default'];
    }, function (_npmBabelRuntime5838CoreJsObjectKeysJs) {
      _Object$keys = _npmBabelRuntime5838CoreJsObjectKeysJs['default'];
    }, function (_npmBabelRuntime5838CoreJsPromiseJs) {
      _Promise = _npmBabelRuntime5838CoreJsPromiseJs['default'];
    }, function (_npmWhatwgFetch111Js) {
      wgfetch = _npmWhatwgFetch111Js['default'];
    }],
    execute: function () {
      'use strict';

      CentralStationV2 = (function () {
        function CentralStationV2() {
          var environment = arguments.length <= 0 || arguments[0] === undefined ? "development" : arguments[0];

          _classCallCheck(this, CentralStationV2);

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

        _createClass(CentralStationV2, [{
          key: 'transmit',
          value: function transmit(uri) {
            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            var _this2 = this;

            var method = arguments.length <= 2 || arguments[2] === undefined ? "POST" : arguments[2];
            var onFailure = arguments.length <= 3 || arguments[3] === undefined ? function (error) {
              console.log(error);
            } : arguments[3];

            var _this = this;
            // Convert to GET params if necessary
            if (method == "GET") {
              uri += "?" + _Object$keys(params).map(function (key) {
                return key + '=' + params[key];
              }).join('&');
            }

            // Build headers
            var headers = {
              'Content-Type': 'application/json'
            };
            if (this.token) headers['Authorization'] = 'Bearer ' + this.token;

            if (this.offline) {
              return onFailure();
            }
            /* @returns {wrapped Promise} with .resolve/.reject/.catch methods */
            // It goes against Promise concept to not have external access to .resolve/.reject methods, but provides more flexibility
            var getWrappedPromise = function getWrappedPromise() {
              var wrappedPromise = {},
                  promise = new _Promise(function (resolve, reject) {
                wrappedPromise.resolve = resolve;
                wrappedPromise.reject = reject;
              });
              wrappedPromise.then = promise.then.bind(promise);
              wrappedPromise['catch'] = promise['catch'].bind(promise);
              wrappedPromise.promise = promise; // e.g. if you want to provide somewhere only promise, without .resolve/.reject/.catch methods
              return wrappedPromise;
            };

            /* @returns {wrapped Promise} with .resolve/.reject/.catch methods */
            var getWrappedFetch = function getWrappedFetch() {
              var wrappedPromise = getWrappedPromise();
              var args = Array.prototype.slice.call(arguments); // arguments to Array

              fetch.apply(null, args) // calling original fetch() method
              .then(function (response) {
                wrappedPromise.resolve(response);
              }, function (error) {
                wrappedPromise.reject(error);
              })['catch'](function (error) {
                wrappedPromise['catch'](error);
              });
              return wrappedPromise;
            };

            var getJSON = function getJSON(url, params) {
              var wrappedFetch = getWrappedFetch(url, params);

              var timeoutId = setTimeout(function () {
                wrappedFetch.reject(new Error('Load timeout for resource: ' + params.url)); // reject on timeout
              }, 30000);

              return wrappedFetch.promise // getting clear promise from wrapped
              .then(function (response) {
                clearTimeout(timeoutId);
                return response;
              });
            };

            return getJSON(this.baseURL + uri, {
              method: method,
              mode: 'cors',
              redirect: 'follow',
              headers: new Headers(headers),
              body: method == "POST" ? JSON.stringify(params) : null
            }).then(function (response) {
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
            }).then(function (response) {
              return response.json();
            }).then(function (data) {
              // Hold token for future calls
              if (data && data.token) _this2.token = data.token;

              return data;
            })['catch'](function () {
              _this.offline = true;
              return onFailure();
            });
          }
        }, {
          key: 'studentPortalAuth',
          value: function studentPortalAuth() {
            var studentList = getCookie('studentList');
            var players = getCookie('players');
            var authToken = getCookie('authToken');

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
        }, {
          key: 'studentDetails',
          value: function studentDetails(playerId) {
            for (var x = 0; x < this.studentList.length; x++) {
              if (this.studentList[x].id === playerId) {
                return this.studentList[x];
              }
            }
          }

          // Get an auth token for subsequent requests
        }, {
          key: 'authenticate',
          value: function authenticate(email, password) {
            return this.transmit('auth', {
              email: email,
              password: password
            });
          }

          // Create a new game session amongst a group of students
        }, {
          key: 'gameSession',
          value: function gameSession(activity_name) {
            var _this = this;
            return this.transmit('game_session', {
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
        }, {
          key: 'createOfflineGameSession',
          value: function createOfflineGameSession(id, activity_name, skill) {
            var gameSessions = window.localStorage.getItem('offlineGameSessions');
            gameSessions = gameSessions && gameSessions.length ? JSON.parse(gameSessions) : [];
            var newGameSession = id ? { id: id, answers: [] } : {
              created_at: new Date().getTime(),
              activity_name: activity_name,
              skill: skill,
              answers: []
            };
            gameSessions.push(newGameSession);
            window.localStorage.setItem('offlineGameSessions', JSON.stringify(gameSessions));
            return _Promise.resolve('Offline');
          }

          // Log an answer selection within a game session
        }, {
          key: 'logAnswer',
          value: function logAnswer(question_id, answer_id, is_correct) {
            var player_id = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
            var game_session_id = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];

            return this.transmit('game_sessions/' + game_session_id + '/answer_selections', {
              question_id: question_id,
              answer_id: answer_id,
              is_correct: is_correct,
              player_id: player_id
            }, "POST", this.convertToOfflineGameSession.bind(this, question_id, answer_id, is_correct, player_id, game_session_id));
          }
        }, {
          key: 'convertToOfflineGameSession',
          value: function convertToOfflineGameSession(question_id, answer_id, is_correct) {
            var player_id = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
            var game_session_id = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];

            this.createOfflineGameSession(game_session_id);
            return this.logAnswerOffline(question_id, answer_id, is_correct, player_id, game_session_id);
          }

          // Log an answer selection within a game session
        }, {
          key: 'logAnswerOffline',
          value: function logAnswerOffline(question_id, answer_id, is_correct) {
            var player_id = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
            var game_session_id = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];

            var gameSessions = window.localStorage.getItem('offlineGameSessions');
            gameSessions = gameSessions.length ? JSON.parse(gameSessions) : [];
            var answerSelections = gameSessions[gameSessions.length - 1]['answers'];
            answerSelections.push({
              question_id: question_id,
              answer_id: answer_id,
              is_correct: is_correct,
              player_id: player_id,
              created_at: new Date().getTime()
            });
            gameSessions[gameSessions.length - 1]['answers'] = answerSelections;
            window.localStorage.setItem('offlineGameSessions', JSON.stringify(gameSessions));
            return _Promise.resolve();
          }

          //  Get single random question for a given user id
        }, {
          key: 'randomQuestion',
          value: function randomQuestion(user_id, readingLevel, skill) {
            return this.transmit('users/' + user_id + '/questions/random', { skill: this.questionSkill }, "GET", this.randomOfflineQuestion.bind(this, readingLevel, skill));
          }
        }, {
          key: 'randomOfflineQuestion',
          value: function randomOfflineQuestion(readingLevel, skill) {
            var assessment_to_question_skill_map = {
              'onset_rimes': ['onset', 'rime'],
              'affixes': ['affix'],
              'sight_words': ['sight_word'],
              'letter_names': ['letter']
            };
            var questionBank = JSON.parse(decodeURIComponent(window.localStorage.getItem('questionBank')));
            var subSkills = assessment_to_question_skill_map[skill] ? assessment_to_question_skill_map[skill] : [];
            var filteredBank = questionBank.filter(function (q) {
              return q.assessed.reading_stage === readingLevel && (skill === 'all' || subSkills.indexOf(q.assessed.type.toLowerCase()) != -1);
            });
            if (filteredBank.length === 0) {
              filteredBank = questionBank.filter(function (q) {
                return skill === 'all' || subSkills.indexOf(q.assessed.type.toLowerCase()) != -1;
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
            return _Promise.resolve(randomQuestion);
          }

          // Get full question bank
        }, {
          key: 'getQuestions',
          value: function getQuestions() {
            return this.transmit('questions', {}, "GET");
          }

          // Get full question bank
        }, {
          key: 'syncGameSessions',
          value: function syncGameSessions() {
            var gameSessions = window.localStorage.getItem('offlineGameSessions');
            gameSessions = gameSessions && gameSessions.length ? JSON.parse(gameSessions) : [];
            if (gameSessions.length) {
              return this.transmit('game_session_collection', { game_sessions: gameSessions }, "POST").then(function () {
                window.localStorage.setItem('offlineGameSessions', '');
              });
            }
          }

          // Get full question bank
        }, {
          key: 'getStudents',
          value: function getStudents() {
            return this.transmit('students', {}, "GET");
          }
        }, {
          key: 'TTSSpeak',
          value: function TTSSpeak(speech, onDone) {

            if ("android" in window) {
              window.TTSCallback = {
                onDone: onDone ? onDone : function () {}
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
        }]);

        return CentralStationV2;
      })();

      _export('default', CentralStationV2);
    }
  };
});

System.register("github:innovationsforlearning/centralstation-js-client@master.js", ["github:innovationsforlearning/centralstation-js-client@master/centralstation.js"], function (_export) {
  "use strict";

  return {
    setters: [function (_githubInnovationsforlearningCentralstationJsClientMasterCentralstationJs) {
      var _exportObj = {};

      for (var _key in _githubInnovationsforlearningCentralstationJsClientMasterCentralstationJs) {
        if (_key !== "default") _exportObj[_key] = _githubInnovationsforlearningCentralstationJsClientMasterCentralstationJs[_key];
      }

      _exportObj["default"] = _githubInnovationsforlearningCentralstationJsClientMasterCentralstationJs["default"];

      _export(_exportObj);
    }],
    execute: function () {}
  };
});

System.registerDynamic('npm:core-js@1.2.7/library/modules/$.object-sap.js', ['npm:core-js@1.2.7/library/modules/$.export.js', 'npm:core-js@1.2.7/library/modules/$.core.js', 'npm:core-js@1.2.7/library/modules/$.fails.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* */
    var $export = $__require('npm:core-js@1.2.7/library/modules/$.export.js'),
        core = $__require('npm:core-js@1.2.7/library/modules/$.core.js'),
        fails = $__require('npm:core-js@1.2.7/library/modules/$.fails.js');
    module.exports = function (KEY, exec) {
        var fn = (core.Object || {})[KEY] || Object[KEY],
            exp = {};
        exp[KEY] = exec(fn);
        $export($export.S + $export.F * fails(function () {
            fn(1);
        }), 'Object', exp);
    };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/es6.object.get-own-property-descriptor.js', ['npm:core-js@1.2.7/library/modules/$.to-iobject.js', 'npm:core-js@1.2.7/library/modules/$.object-sap.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var toIObject = $__require('npm:core-js@1.2.7/library/modules/$.to-iobject.js');
  $__require('npm:core-js@1.2.7/library/modules/$.object-sap.js')('getOwnPropertyDescriptor', function ($getOwnPropertyDescriptor) {
    return function getOwnPropertyDescriptor(it, key) {
      return $getOwnPropertyDescriptor(toIObject(it), key);
    };
  });
});
System.registerDynamic('npm:core-js@1.2.7/library/fn/object/get-own-property-descriptor.js', ['npm:core-js@1.2.7/library/modules/$.js', 'npm:core-js@1.2.7/library/modules/es6.object.get-own-property-descriptor.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var $ = $__require('npm:core-js@1.2.7/library/modules/$.js');
  $__require('npm:core-js@1.2.7/library/modules/es6.object.get-own-property-descriptor.js');
  module.exports = function getOwnPropertyDescriptor(it, key) {
    return $.getDesc(it, key);
  };
});
System.registerDynamic("npm:babel-runtime@5.8.38/core-js/object/get-own-property-descriptor.js", ["npm:core-js@1.2.7/library/fn/object/get-own-property-descriptor.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("npm:core-js@1.2.7/library/fn/object/get-own-property-descriptor.js"), __esModule: true };
});
System.registerDynamic("npm:babel-runtime@5.8.38/helpers/get.js", ["npm:babel-runtime@5.8.38/core-js/object/get-own-property-descriptor.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var _Object$getOwnPropertyDescriptor = $__require("npm:babel-runtime@5.8.38/core-js/object/get-own-property-descriptor.js")["default"];
  exports["default"] = function get(_x, _x2, _x3) {
    var _again = true;
    _function: while (_again) {
      var object = _x,
          property = _x2,
          receiver = _x3;
      _again = false;
      if (object === null) object = Function.prototype;
      var desc = _Object$getOwnPropertyDescriptor(object, property);
      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
          return undefined;
        } else {
          _x = parent;
          _x2 = property;
          _x3 = receiver;
          _again = true;
          desc = parent = undefined;
          continue _function;
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;
        if (getter === undefined) {
          return undefined;
        }
        return getter.call(receiver);
      }
    }
  };
  exports.__esModule = true;
});
System.registerDynamic('npm:core-js@1.2.7/library/fn/object/create.js', ['npm:core-js@1.2.7/library/modules/$.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var $ = $__require('npm:core-js@1.2.7/library/modules/$.js');
  module.exports = function create(P, D) {
    return $.create(P, D);
  };
});
System.registerDynamic("npm:babel-runtime@5.8.38/core-js/object/create.js", ["npm:core-js@1.2.7/library/fn/object/create.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("npm:core-js@1.2.7/library/fn/object/create.js"), __esModule: true };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/es6.object.set-prototype-of.js', ['npm:core-js@1.2.7/library/modules/$.export.js', 'npm:core-js@1.2.7/library/modules/$.set-proto.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var $export = $__require('npm:core-js@1.2.7/library/modules/$.export.js');
  $export($export.S, 'Object', { setPrototypeOf: $__require('npm:core-js@1.2.7/library/modules/$.set-proto.js').set });
});
System.registerDynamic('npm:core-js@1.2.7/library/fn/object/set-prototype-of.js', ['npm:core-js@1.2.7/library/modules/es6.object.set-prototype-of.js', 'npm:core-js@1.2.7/library/modules/$.core.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  $__require('npm:core-js@1.2.7/library/modules/es6.object.set-prototype-of.js');
  module.exports = $__require('npm:core-js@1.2.7/library/modules/$.core.js').Object.setPrototypeOf;
});
System.registerDynamic("npm:babel-runtime@5.8.38/core-js/object/set-prototype-of.js", ["npm:core-js@1.2.7/library/fn/object/set-prototype-of.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("npm:core-js@1.2.7/library/fn/object/set-prototype-of.js"), __esModule: true };
});
System.registerDynamic("npm:babel-runtime@5.8.38/helpers/inherits.js", ["npm:babel-runtime@5.8.38/core-js/object/create.js", "npm:babel-runtime@5.8.38/core-js/object/set-prototype-of.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var _Object$create = $__require("npm:babel-runtime@5.8.38/core-js/object/create.js")["default"];
  var _Object$setPrototypeOf = $__require("npm:babel-runtime@5.8.38/core-js/object/set-prototype-of.js")["default"];
  exports["default"] = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      } });
    if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };
  exports.__esModule = true;
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/es6.object.to-string.js", [], true, function ($__require, exports, module) {
  /* */
  "format cjs";

  var global = this || self,
      GLOBAL = global;
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.string-at.js', ['npm:core-js@1.2.7/library/modules/$.to-integer.js', 'npm:core-js@1.2.7/library/modules/$.defined.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var toInteger = $__require('npm:core-js@1.2.7/library/modules/$.to-integer.js'),
      defined = $__require('npm:core-js@1.2.7/library/modules/$.defined.js');
  module.exports = function (TO_STRING) {
    return function (that, pos) {
      var s = String(defined(that)),
          i = toInteger(pos),
          l = s.length,
          a,
          b;
      if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/es6.string.iterator.js', ['npm:core-js@1.2.7/library/modules/$.string-at.js', 'npm:core-js@1.2.7/library/modules/$.iter-define.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var $at = $__require('npm:core-js@1.2.7/library/modules/$.string-at.js')(true);
  $__require('npm:core-js@1.2.7/library/modules/$.iter-define.js')(String, 'String', function (iterated) {
    this._t = String(iterated);
    this._i = 0;
  }, function () {
    var O = this._t,
        index = this._i,
        point;
    if (index >= O.length) return {
      value: undefined,
      done: true
    };
    point = $at(O, index);
    this._i += point.length;
    return {
      value: point,
      done: false
    };
  });
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.add-to-unscopables.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function () {/* empty */};
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.iter-step.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (done, value) {
    return { value: value, done: !!done };
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.iobject.js', ['npm:core-js@1.2.7/library/modules/$.cof.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var cof = $__require('npm:core-js@1.2.7/library/modules/$.cof.js');
  module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return cof(it) == 'String' ? it.split('') : Object(it);
  };
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.defined.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  // 7.2.1 RequireObjectCoercible(argument)
  module.exports = function (it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.to-iobject.js', ['npm:core-js@1.2.7/library/modules/$.iobject.js', 'npm:core-js@1.2.7/library/modules/$.defined.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var IObject = $__require('npm:core-js@1.2.7/library/modules/$.iobject.js'),
      defined = $__require('npm:core-js@1.2.7/library/modules/$.defined.js');
  module.exports = function (it) {
    return IObject(defined(it));
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.iter-create.js', ['npm:core-js@1.2.7/library/modules/$.js', 'npm:core-js@1.2.7/library/modules/$.property-desc.js', 'npm:core-js@1.2.7/library/modules/$.set-to-string-tag.js', 'npm:core-js@1.2.7/library/modules/$.hide.js', 'npm:core-js@1.2.7/library/modules/$.wks.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var $ = $__require('npm:core-js@1.2.7/library/modules/$.js'),
      descriptor = $__require('npm:core-js@1.2.7/library/modules/$.property-desc.js'),
      setToStringTag = $__require('npm:core-js@1.2.7/library/modules/$.set-to-string-tag.js'),
      IteratorPrototype = {};
  $__require('npm:core-js@1.2.7/library/modules/$.hide.js')(IteratorPrototype, $__require('npm:core-js@1.2.7/library/modules/$.wks.js')('iterator'), function () {
    return this;
  });
  module.exports = function (Constructor, NAME, next) {
    Constructor.prototype = $.create(IteratorPrototype, { next: descriptor(1, next) });
    setToStringTag(Constructor, NAME + ' Iterator');
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.iter-define.js', ['npm:core-js@1.2.7/library/modules/$.library.js', 'npm:core-js@1.2.7/library/modules/$.export.js', 'npm:core-js@1.2.7/library/modules/$.redefine.js', 'npm:core-js@1.2.7/library/modules/$.hide.js', 'npm:core-js@1.2.7/library/modules/$.has.js', 'npm:core-js@1.2.7/library/modules/$.iterators.js', 'npm:core-js@1.2.7/library/modules/$.iter-create.js', 'npm:core-js@1.2.7/library/modules/$.set-to-string-tag.js', 'npm:core-js@1.2.7/library/modules/$.js', 'npm:core-js@1.2.7/library/modules/$.wks.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var LIBRARY = $__require('npm:core-js@1.2.7/library/modules/$.library.js'),
      $export = $__require('npm:core-js@1.2.7/library/modules/$.export.js'),
      redefine = $__require('npm:core-js@1.2.7/library/modules/$.redefine.js'),
      hide = $__require('npm:core-js@1.2.7/library/modules/$.hide.js'),
      has = $__require('npm:core-js@1.2.7/library/modules/$.has.js'),
      Iterators = $__require('npm:core-js@1.2.7/library/modules/$.iterators.js'),
      $iterCreate = $__require('npm:core-js@1.2.7/library/modules/$.iter-create.js'),
      setToStringTag = $__require('npm:core-js@1.2.7/library/modules/$.set-to-string-tag.js'),
      getProto = $__require('npm:core-js@1.2.7/library/modules/$.js').getProto,
      ITERATOR = $__require('npm:core-js@1.2.7/library/modules/$.wks.js')('iterator'),
      BUGGY = !([].keys && 'next' in [].keys()),
      FF_ITERATOR = '@@iterator',
      KEYS = 'keys',
      VALUES = 'values';
  var returnThis = function () {
    return this;
  };
  module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    $iterCreate(Constructor, NAME, next);
    var getMethod = function (kind) {
      if (!BUGGY && kind in proto) return proto[kind];
      switch (kind) {
        case KEYS:
          return function keys() {
            return new Constructor(this, kind);
          };
        case VALUES:
          return function values() {
            return new Constructor(this, kind);
          };
      }
      return function entries() {
        return new Constructor(this, kind);
      };
    };
    var TAG = NAME + ' Iterator',
        DEF_VALUES = DEFAULT == VALUES,
        VALUES_BUG = false,
        proto = Base.prototype,
        $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
        $default = $native || getMethod(DEFAULT),
        methods,
        key;
    if ($native) {
      var IteratorPrototype = getProto($default.call(new Base()));
      setToStringTag(IteratorPrototype, TAG, true);
      if (!LIBRARY && has(proto, FF_ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
      if (DEF_VALUES && $native.name !== VALUES) {
        VALUES_BUG = true;
        $default = function values() {
          return $native.call(this);
        };
      }
    }
    if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
      hide(proto, ITERATOR, $default);
    }
    Iterators[NAME] = $default;
    Iterators[TAG] = returnThis;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: !DEF_VALUES ? $default : getMethod('entries')
      };
      if (FORCED) for (key in methods) {
        if (!(key in proto)) redefine(proto, key, methods[key]);
      } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/es6.array.iterator.js', ['npm:core-js@1.2.7/library/modules/$.add-to-unscopables.js', 'npm:core-js@1.2.7/library/modules/$.iter-step.js', 'npm:core-js@1.2.7/library/modules/$.iterators.js', 'npm:core-js@1.2.7/library/modules/$.to-iobject.js', 'npm:core-js@1.2.7/library/modules/$.iter-define.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var addToUnscopables = $__require('npm:core-js@1.2.7/library/modules/$.add-to-unscopables.js'),
      step = $__require('npm:core-js@1.2.7/library/modules/$.iter-step.js'),
      Iterators = $__require('npm:core-js@1.2.7/library/modules/$.iterators.js'),
      toIObject = $__require('npm:core-js@1.2.7/library/modules/$.to-iobject.js');
  module.exports = $__require('npm:core-js@1.2.7/library/modules/$.iter-define.js')(Array, 'Array', function (iterated, kind) {
    this._t = toIObject(iterated);
    this._i = 0;
    this._k = kind;
  }, function () {
    var O = this._t,
        kind = this._k,
        index = this._i++;
    if (!O || index >= O.length) {
      this._t = undefined;
      return step(1);
    }
    if (kind == 'keys') return step(0, index);
    if (kind == 'values') return step(0, O[index]);
    return step(0, [index, O[index]]);
  }, 'values');
  Iterators.Arguments = Iterators.Array;
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/web.dom.iterable.js', ['npm:core-js@1.2.7/library/modules/es6.array.iterator.js', 'npm:core-js@1.2.7/library/modules/$.iterators.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  $__require('npm:core-js@1.2.7/library/modules/es6.array.iterator.js');
  var Iterators = $__require('npm:core-js@1.2.7/library/modules/$.iterators.js');
  Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.library.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = true;
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.export.js', ['npm:core-js@1.2.7/library/modules/$.global.js', 'npm:core-js@1.2.7/library/modules/$.core.js', 'npm:core-js@1.2.7/library/modules/$.ctx.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var global = $__require('npm:core-js@1.2.7/library/modules/$.global.js'),
      core = $__require('npm:core-js@1.2.7/library/modules/$.core.js'),
      ctx = $__require('npm:core-js@1.2.7/library/modules/$.ctx.js'),
      PROTOTYPE = 'prototype';
  var $export = function (type, name, source) {
    var IS_FORCED = type & $export.F,
        IS_GLOBAL = type & $export.G,
        IS_STATIC = type & $export.S,
        IS_PROTO = type & $export.P,
        IS_BIND = type & $export.B,
        IS_WRAP = type & $export.W,
        exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
        target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
        key,
        own,
        out;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      own = !IS_FORCED && target && key in target;
      if (own && key in exports) continue;
      out = own ? target[key] : source[key];
      exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? function (C) {
        var F = function (param) {
          return this instanceof C ? new C(param) : C(param);
        };
        F[PROTOTYPE] = C[PROTOTYPE];
        return F;
      }(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
      if (IS_PROTO) (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
    }
  };
  $export.F = 1;
  $export.G = 2;
  $export.S = 4;
  $export.P = 8;
  $export.B = 16;
  $export.W = 32;
  module.exports = $export;
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.strict-new.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (it, Constructor, name) {
    if (!(it instanceof Constructor)) throw TypeError(name + ": use the 'new' operator!");
    return it;
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.iter-call.js', ['npm:core-js@1.2.7/library/modules/$.an-object.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var anObject = $__require('npm:core-js@1.2.7/library/modules/$.an-object.js');
  module.exports = function (iterator, fn, value, entries) {
    try {
      return entries ? fn(anObject(value)[0], value[1]) : fn(value);
    } catch (e) {
      var ret = iterator['return'];
      if (ret !== undefined) anObject(ret.call(iterator));
      throw e;
    }
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.is-array-iter.js', ['npm:core-js@1.2.7/library/modules/$.iterators.js', 'npm:core-js@1.2.7/library/modules/$.wks.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* */
    var Iterators = $__require('npm:core-js@1.2.7/library/modules/$.iterators.js'),
        ITERATOR = $__require('npm:core-js@1.2.7/library/modules/$.wks.js')('iterator'),
        ArrayProto = Array.prototype;
    module.exports = function (it) {
        return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
    };
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.to-integer.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  // 7.1.4 ToInteger
  var ceil = Math.ceil,
      floor = Math.floor;
  module.exports = function (it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.to-length.js', ['npm:core-js@1.2.7/library/modules/$.to-integer.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var toInteger = $__require('npm:core-js@1.2.7/library/modules/$.to-integer.js'),
      min = Math.min;
  module.exports = function (it) {
    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.classof.js', ['npm:core-js@1.2.7/library/modules/$.cof.js', 'npm:core-js@1.2.7/library/modules/$.wks.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* */
    var cof = $__require('npm:core-js@1.2.7/library/modules/$.cof.js'),
        TAG = $__require('npm:core-js@1.2.7/library/modules/$.wks.js')('toStringTag'),
        ARG = cof(function () {
        return arguments;
    }()) == 'Arguments';
    module.exports = function (it) {
        var O, T, B;
        return it === undefined ? 'Undefined' : it === null ? 'Null' : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : ARG ? cof(O) : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
    };
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.iterators.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = {};
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/core.get-iterator-method.js', ['npm:core-js@1.2.7/library/modules/$.classof.js', 'npm:core-js@1.2.7/library/modules/$.wks.js', 'npm:core-js@1.2.7/library/modules/$.iterators.js', 'npm:core-js@1.2.7/library/modules/$.core.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* */
    var classof = $__require('npm:core-js@1.2.7/library/modules/$.classof.js'),
        ITERATOR = $__require('npm:core-js@1.2.7/library/modules/$.wks.js')('iterator'),
        Iterators = $__require('npm:core-js@1.2.7/library/modules/$.iterators.js');
    module.exports = $__require('npm:core-js@1.2.7/library/modules/$.core.js').getIteratorMethod = function (it) {
        if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
    };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.for-of.js', ['npm:core-js@1.2.7/library/modules/$.ctx.js', 'npm:core-js@1.2.7/library/modules/$.iter-call.js', 'npm:core-js@1.2.7/library/modules/$.is-array-iter.js', 'npm:core-js@1.2.7/library/modules/$.an-object.js', 'npm:core-js@1.2.7/library/modules/$.to-length.js', 'npm:core-js@1.2.7/library/modules/core.get-iterator-method.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var ctx = $__require('npm:core-js@1.2.7/library/modules/$.ctx.js'),
      call = $__require('npm:core-js@1.2.7/library/modules/$.iter-call.js'),
      isArrayIter = $__require('npm:core-js@1.2.7/library/modules/$.is-array-iter.js'),
      anObject = $__require('npm:core-js@1.2.7/library/modules/$.an-object.js'),
      toLength = $__require('npm:core-js@1.2.7/library/modules/$.to-length.js'),
      getIterFn = $__require('npm:core-js@1.2.7/library/modules/core.get-iterator-method.js');
  module.exports = function (iterable, entries, fn, that) {
    var iterFn = getIterFn(iterable),
        f = ctx(fn, that, entries ? 2 : 1),
        index = 0,
        length,
        step,
        iterator;
    if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
    if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
      entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
      call(iterator, f, step.value, entries);
    }
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.set-proto.js', ['npm:core-js@1.2.7/library/modules/$.js', 'npm:core-js@1.2.7/library/modules/$.is-object.js', 'npm:core-js@1.2.7/library/modules/$.an-object.js', 'npm:core-js@1.2.7/library/modules/$.ctx.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var getDesc = $__require('npm:core-js@1.2.7/library/modules/$.js').getDesc,
      isObject = $__require('npm:core-js@1.2.7/library/modules/$.is-object.js'),
      anObject = $__require('npm:core-js@1.2.7/library/modules/$.an-object.js');
  var check = function (O, proto) {
    anObject(O);
    if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
  };
  module.exports = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? function (test, buggy, set) {
      try {
        set = $__require('npm:core-js@1.2.7/library/modules/$.ctx.js')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) {
        buggy = true;
      }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
    check: check
  };
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.same-value.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  // 7.2.9 SameValue(x, y)
  module.exports = Object.is || function is(x, y) {
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.an-object.js', ['npm:core-js@1.2.7/library/modules/$.is-object.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var isObject = $__require('npm:core-js@1.2.7/library/modules/$.is-object.js');
  module.exports = function (it) {
    if (!isObject(it)) throw TypeError(it + ' is not an object!');
    return it;
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.species-constructor.js', ['npm:core-js@1.2.7/library/modules/$.an-object.js', 'npm:core-js@1.2.7/library/modules/$.a-function.js', 'npm:core-js@1.2.7/library/modules/$.wks.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* */
    var anObject = $__require('npm:core-js@1.2.7/library/modules/$.an-object.js'),
        aFunction = $__require('npm:core-js@1.2.7/library/modules/$.a-function.js'),
        SPECIES = $__require('npm:core-js@1.2.7/library/modules/$.wks.js')('species');
    module.exports = function (O, D) {
        var C = anObject(O).constructor,
            S;
        return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
    };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.a-function.js', [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.ctx.js', ['npm:core-js@1.2.7/library/modules/$.a-function.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var aFunction = $__require('npm:core-js@1.2.7/library/modules/$.a-function.js');
  module.exports = function (fn, that, length) {
    aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1:
        return function (a) {
          return fn.call(that, a);
        };
      case 2:
        return function (a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function () {
      return fn.apply(that, arguments);
    };
  };
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.invoke.js", [], true, function ($__require, exports, module) {
                  var global = this || self,
                      GLOBAL = global;
                  // fast apply, http://jsperf.lnkit.com/fast-apply/5
                  module.exports = function (fn, args, that) {
                                    var un = that === undefined;
                                    switch (args.length) {
                                                      case 0:
                                                                        return un ? fn() : fn.call(that);
                                                      case 1:
                                                                        return un ? fn(args[0]) : fn.call(that, args[0]);
                                                      case 2:
                                                                        return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
                                                      case 3:
                                                                        return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
                                                      case 4:
                                                                        return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
                                    }return fn.apply(that, args);
                  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.html.js', ['npm:core-js@1.2.7/library/modules/$.global.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = $__require('npm:core-js@1.2.7/library/modules/$.global.js').document && document.documentElement;
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.is-object.js', [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.dom-create.js', ['npm:core-js@1.2.7/library/modules/$.is-object.js', 'npm:core-js@1.2.7/library/modules/$.global.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* */
    var isObject = $__require('npm:core-js@1.2.7/library/modules/$.is-object.js'),
        document = $__require('npm:core-js@1.2.7/library/modules/$.global.js').document,
        is = isObject(document) && isObject(document.createElement);
    module.exports = function (it) {
        return is ? document.createElement(it) : {};
    };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.task.js', ['npm:core-js@1.2.7/library/modules/$.ctx.js', 'npm:core-js@1.2.7/library/modules/$.invoke.js', 'npm:core-js@1.2.7/library/modules/$.html.js', 'npm:core-js@1.2.7/library/modules/$.dom-create.js', 'npm:core-js@1.2.7/library/modules/$.global.js', 'npm:core-js@1.2.7/library/modules/$.cof.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    var ctx = $__require('npm:core-js@1.2.7/library/modules/$.ctx.js'),
        invoke = $__require('npm:core-js@1.2.7/library/modules/$.invoke.js'),
        html = $__require('npm:core-js@1.2.7/library/modules/$.html.js'),
        cel = $__require('npm:core-js@1.2.7/library/modules/$.dom-create.js'),
        global = $__require('npm:core-js@1.2.7/library/modules/$.global.js'),
        process = global.process,
        setTask = global.setImmediate,
        clearTask = global.clearImmediate,
        MessageChannel = global.MessageChannel,
        counter = 0,
        queue = {},
        ONREADYSTATECHANGE = 'onreadystatechange',
        defer,
        channel,
        port;
    var run = function () {
      var id = +this;
      if (queue.hasOwnProperty(id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
      }
    };
    var listner = function (event) {
      run.call(event.data);
    };
    if (!setTask || !clearTask) {
      setTask = function setImmediate(fn) {
        var args = [],
            i = 1;
        while (arguments.length > i) args.push(arguments[i++]);
        queue[++counter] = function () {
          invoke(typeof fn == 'function' ? fn : Function(fn), args);
        };
        defer(counter);
        return counter;
      };
      clearTask = function clearImmediate(id) {
        delete queue[id];
      };
      if ($__require('npm:core-js@1.2.7/library/modules/$.cof.js')(process) == 'process') {
        defer = function (id) {
          process.nextTick(ctx(run, id, 1));
        };
      } else if (MessageChannel) {
        channel = new MessageChannel();
        port = channel.port2;
        channel.port1.onmessage = listner;
        defer = ctx(port.postMessage, port, 1);
      } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
        defer = function (id) {
          global.postMessage(id + '', '*');
        };
        global.addEventListener('message', listner, false);
      } else if (ONREADYSTATECHANGE in cel('script')) {
        defer = function (id) {
          html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
            html.removeChild(this);
            run.call(id);
          };
        };
      } else {
        defer = function (id) {
          setTimeout(ctx(run, id, 1), 0);
        };
      }
    }
    module.exports = {
      set: setTask,
      clear: clearTask
    };
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.cof.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var toString = {}.toString;

  module.exports = function (it) {
    return toString.call(it).slice(8, -1);
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.microtask.js', ['npm:core-js@1.2.7/library/modules/$.global.js', 'npm:core-js@1.2.7/library/modules/$.task.js', 'npm:core-js@1.2.7/library/modules/$.cof.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    var global = $__require('npm:core-js@1.2.7/library/modules/$.global.js'),
        macrotask = $__require('npm:core-js@1.2.7/library/modules/$.task.js').set,
        Observer = global.MutationObserver || global.WebKitMutationObserver,
        process = global.process,
        Promise = global.Promise,
        isNode = $__require('npm:core-js@1.2.7/library/modules/$.cof.js')(process) == 'process',
        head,
        last,
        notify;
    var flush = function () {
      var parent, domain, fn;
      if (isNode && (parent = process.domain)) {
        process.domain = null;
        parent.exit();
      }
      while (head) {
        domain = head.domain;
        fn = head.fn;
        if (domain) domain.enter();
        fn();
        if (domain) domain.exit();
        head = head.next;
      }
      last = undefined;
      if (parent) parent.enter();
    };
    if (isNode) {
      notify = function () {
        process.nextTick(flush);
      };
    } else if (Observer) {
      var toggle = 1,
          node = document.createTextNode('');
      new Observer(flush).observe(node, { characterData: true });
      notify = function () {
        node.data = toggle = -toggle;
      };
    } else if (Promise && Promise.resolve) {
      notify = function () {
        Promise.resolve().then(flush);
      };
    } else {
      notify = function () {
        macrotask.call(global, flush);
      };
    }
    module.exports = function asap(fn) {
      var task = {
        fn: fn,
        next: undefined,
        domain: isNode && process.domain
      };
      if (last) last.next = task;
      if (!head) {
        head = task;
        notify();
      }
      last = task;
    };
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.property-desc.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.hide.js', ['npm:core-js@1.2.7/library/modules/$.js', 'npm:core-js@1.2.7/library/modules/$.property-desc.js', 'npm:core-js@1.2.7/library/modules/$.descriptors.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var $ = $__require('npm:core-js@1.2.7/library/modules/$.js'),
      createDesc = $__require('npm:core-js@1.2.7/library/modules/$.property-desc.js');
  module.exports = $__require('npm:core-js@1.2.7/library/modules/$.descriptors.js') ? function (object, key, value) {
    return $.setDesc(object, key, createDesc(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.redefine.js', ['npm:core-js@1.2.7/library/modules/$.hide.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = $__require('npm:core-js@1.2.7/library/modules/$.hide.js');
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.redefine-all.js', ['npm:core-js@1.2.7/library/modules/$.redefine.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var redefine = $__require('npm:core-js@1.2.7/library/modules/$.redefine.js');
  module.exports = function (target, src) {
    for (var key in src) redefine(target, key, src[key]);
    return target;
  };
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.has.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var hasOwnProperty = {}.hasOwnProperty;
  module.exports = function (it, key) {
    return hasOwnProperty.call(it, key);
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.set-to-string-tag.js', ['npm:core-js@1.2.7/library/modules/$.js', 'npm:core-js@1.2.7/library/modules/$.has.js', 'npm:core-js@1.2.7/library/modules/$.wks.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var def = $__require('npm:core-js@1.2.7/library/modules/$.js').setDesc,
      has = $__require('npm:core-js@1.2.7/library/modules/$.has.js'),
      TAG = $__require('npm:core-js@1.2.7/library/modules/$.wks.js')('toStringTag');
  module.exports = function (it, tag, stat) {
    if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {
      configurable: true,
      value: tag
    });
  };
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.fails.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.descriptors.js', ['npm:core-js@1.2.7/library/modules/$.fails.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = !$__require('npm:core-js@1.2.7/library/modules/$.fails.js')(function () {
    return Object.defineProperty({}, 'a', { get: function () {
        return 7;
      } }).a != 7;
  });
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.set-species.js', ['npm:core-js@1.2.7/library/modules/$.core.js', 'npm:core-js@1.2.7/library/modules/$.js', 'npm:core-js@1.2.7/library/modules/$.descriptors.js', 'npm:core-js@1.2.7/library/modules/$.wks.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var core = $__require('npm:core-js@1.2.7/library/modules/$.core.js'),
      $ = $__require('npm:core-js@1.2.7/library/modules/$.js'),
      DESCRIPTORS = $__require('npm:core-js@1.2.7/library/modules/$.descriptors.js'),
      SPECIES = $__require('npm:core-js@1.2.7/library/modules/$.wks.js')('species');
  module.exports = function (KEY) {
    var C = core[KEY];
    if (DESCRIPTORS && C && !C[SPECIES]) $.setDesc(C, SPECIES, {
      configurable: true,
      get: function () {
        return this;
      }
    });
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.shared.js', ['npm:core-js@1.2.7/library/modules/$.global.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* */
    var global = $__require('npm:core-js@1.2.7/library/modules/$.global.js'),
        SHARED = '__core-js_shared__',
        store = global[SHARED] || (global[SHARED] = {});
    module.exports = function (key) {
        return store[key] || (store[key] = {});
    };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.uid.js', [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var id = 0,
      px = Math.random();
  module.exports = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.global.js', [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.wks.js', ['npm:core-js@1.2.7/library/modules/$.shared.js', 'npm:core-js@1.2.7/library/modules/$.uid.js', 'npm:core-js@1.2.7/library/modules/$.global.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* */
    var store = $__require('npm:core-js@1.2.7/library/modules/$.shared.js')('wks'),
        uid = $__require('npm:core-js@1.2.7/library/modules/$.uid.js'),
        Symbol = $__require('npm:core-js@1.2.7/library/modules/$.global.js').Symbol;
    module.exports = function (name) {
        return store[name] || (store[name] = Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
    };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.iter-detect.js', ['npm:core-js@1.2.7/library/modules/$.wks.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var ITERATOR = $__require('npm:core-js@1.2.7/library/modules/$.wks.js')('iterator'),
      SAFE_CLOSING = false;
  try {
    var riter = [7][ITERATOR]();
    riter['return'] = function () {
      SAFE_CLOSING = true;
    };
    Array.from(riter, function () {
      throw 2;
    });
  } catch (e) {}
  module.exports = function (exec, skipClosing) {
    if (!skipClosing && !SAFE_CLOSING) return false;
    var safe = false;
    try {
      var arr = [7],
          iter = arr[ITERATOR]();
      iter.next = function () {
        return { done: safe = true };
      };
      arr[ITERATOR] = function () {
        return iter;
      };
      exec(arr);
    } catch (e) {}
    return safe;
  };
});
System.registerDynamic('npm:process@0.11.9/browser.js', [], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    // shim for using process in browser
    var process = module.exports = {};

    // cached from whatever global is present so that test runners that stub it
    // don't break things.  But we need to wrap it in a try catch in case it is
    // wrapped in strict mode code which doesn't define any globals.  It's inside a
    // function because try/catches deoptimize in certain engines.

    var cachedSetTimeout;
    var cachedClearTimeout;

    function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
    }
    function defaultClearTimeout() {
        throw new Error('clearTimeout has not been defined');
    }
    (function () {
        try {
            if (typeof setTimeout === 'function') {
                cachedSetTimeout = setTimeout;
            } else {
                cachedSetTimeout = defaultSetTimout;
            }
        } catch (e) {
            cachedSetTimeout = defaultSetTimout;
        }
        try {
            if (typeof clearTimeout === 'function') {
                cachedClearTimeout = clearTimeout;
            } else {
                cachedClearTimeout = defaultClearTimeout;
            }
        } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
        }
    })();
    function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
            //normal enviroments in sane situations
            return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedSetTimeout(fun, 0);
        } catch (e) {
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                return cachedSetTimeout.call(null, fun, 0);
            } catch (e) {
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                return cachedSetTimeout.call(this, fun, 0);
            }
        }
    }
    function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
            //normal enviroments in sane situations
            return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedClearTimeout(marker);
        } catch (e) {
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                return cachedClearTimeout.call(null, marker);
            } catch (e) {
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                return cachedClearTimeout.call(this, marker);
            }
        }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;

    function cleanUpNextTick() {
        if (!draining || !currentQueue) {
            return;
        }
        draining = false;
        if (currentQueue.length) {
            queue = currentQueue.concat(queue);
        } else {
            queueIndex = -1;
        }
        if (queue.length) {
            drainQueue();
        }
    }

    function drainQueue() {
        if (draining) {
            return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;

        var len = queue.length;
        while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
                if (currentQueue) {
                    currentQueue[queueIndex].run();
                }
            }
            queueIndex = -1;
            len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
    }

    process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i];
            }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
        }
    };

    // v8 likes predictible objects
    function Item(fun, array) {
        this.fun = fun;
        this.array = array;
    }
    Item.prototype.run = function () {
        this.fun.apply(null, this.array);
    };
    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = ''; // empty string to avoid regexp issues
    process.versions = {};

    function noop() {}

    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;

    process.binding = function (name) {
        throw new Error('process.binding is not supported');
    };

    process.cwd = function () {
        return '/';
    };
    process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
    };
    process.umask = function () {
        return 0;
    };
});
System.registerDynamic("npm:process@0.11.9.js", ["npm:process@0.11.9/browser.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("npm:process@0.11.9/browser.js");
});
System.registerDynamic('github:jspm/nodelibs-process@0.1.2/index.js', ['npm:process@0.11.9.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = System._nodeRequire ? process : $__require('npm:process@0.11.9.js');
});
System.registerDynamic("github:jspm/nodelibs-process@0.1.2.js", ["github:jspm/nodelibs-process@0.1.2/index.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("github:jspm/nodelibs-process@0.1.2/index.js");
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/es6.promise.js', ['npm:core-js@1.2.7/library/modules/$.js', 'npm:core-js@1.2.7/library/modules/$.library.js', 'npm:core-js@1.2.7/library/modules/$.global.js', 'npm:core-js@1.2.7/library/modules/$.ctx.js', 'npm:core-js@1.2.7/library/modules/$.classof.js', 'npm:core-js@1.2.7/library/modules/$.export.js', 'npm:core-js@1.2.7/library/modules/$.is-object.js', 'npm:core-js@1.2.7/library/modules/$.an-object.js', 'npm:core-js@1.2.7/library/modules/$.a-function.js', 'npm:core-js@1.2.7/library/modules/$.strict-new.js', 'npm:core-js@1.2.7/library/modules/$.for-of.js', 'npm:core-js@1.2.7/library/modules/$.set-proto.js', 'npm:core-js@1.2.7/library/modules/$.same-value.js', 'npm:core-js@1.2.7/library/modules/$.wks.js', 'npm:core-js@1.2.7/library/modules/$.species-constructor.js', 'npm:core-js@1.2.7/library/modules/$.microtask.js', 'npm:core-js@1.2.7/library/modules/$.descriptors.js', 'npm:core-js@1.2.7/library/modules/$.redefine-all.js', 'npm:core-js@1.2.7/library/modules/$.set-to-string-tag.js', 'npm:core-js@1.2.7/library/modules/$.set-species.js', 'npm:core-js@1.2.7/library/modules/$.core.js', 'npm:core-js@1.2.7/library/modules/$.iter-detect.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var $ = $__require('npm:core-js@1.2.7/library/modules/$.js'),
        LIBRARY = $__require('npm:core-js@1.2.7/library/modules/$.library.js'),
        global = $__require('npm:core-js@1.2.7/library/modules/$.global.js'),
        ctx = $__require('npm:core-js@1.2.7/library/modules/$.ctx.js'),
        classof = $__require('npm:core-js@1.2.7/library/modules/$.classof.js'),
        $export = $__require('npm:core-js@1.2.7/library/modules/$.export.js'),
        isObject = $__require('npm:core-js@1.2.7/library/modules/$.is-object.js'),
        anObject = $__require('npm:core-js@1.2.7/library/modules/$.an-object.js'),
        aFunction = $__require('npm:core-js@1.2.7/library/modules/$.a-function.js'),
        strictNew = $__require('npm:core-js@1.2.7/library/modules/$.strict-new.js'),
        forOf = $__require('npm:core-js@1.2.7/library/modules/$.for-of.js'),
        setProto = $__require('npm:core-js@1.2.7/library/modules/$.set-proto.js').set,
        same = $__require('npm:core-js@1.2.7/library/modules/$.same-value.js'),
        SPECIES = $__require('npm:core-js@1.2.7/library/modules/$.wks.js')('species'),
        speciesConstructor = $__require('npm:core-js@1.2.7/library/modules/$.species-constructor.js'),
        asap = $__require('npm:core-js@1.2.7/library/modules/$.microtask.js'),
        PROMISE = 'Promise',
        process = global.process,
        isNode = classof(process) == 'process',
        P = global[PROMISE],
        empty = function () {},
        Wrapper;
    var testResolve = function (sub) {
      var test = new P(empty),
          promise;
      if (sub) test.constructor = function (exec) {
        exec(empty, empty);
      };
      (promise = P.resolve(test))['catch'](empty);
      return promise === test;
    };
    var USE_NATIVE = function () {
      var works = false;
      function P2(x) {
        var self = new P(x);
        setProto(self, P2.prototype);
        return self;
      }
      try {
        works = P && P.resolve && testResolve();
        setProto(P2, P);
        P2.prototype = $.create(P.prototype, { constructor: { value: P2 } });
        if (!(P2.resolve(5).then(function () {}) instanceof P2)) {
          works = false;
        }
        if (works && $__require('npm:core-js@1.2.7/library/modules/$.descriptors.js')) {
          var thenableThenGotten = false;
          P.resolve($.setDesc({}, 'then', { get: function () {
              thenableThenGotten = true;
            } }));
          works = thenableThenGotten;
        }
      } catch (e) {
        works = false;
      }
      return works;
    }();
    var sameConstructor = function (a, b) {
      if (LIBRARY && a === P && b === Wrapper) return true;
      return same(a, b);
    };
    var getConstructor = function (C) {
      var S = anObject(C)[SPECIES];
      return S != undefined ? S : C;
    };
    var isThenable = function (it) {
      var then;
      return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
    };
    var PromiseCapability = function (C) {
      var resolve, reject;
      this.promise = new C(function ($$resolve, $$reject) {
        if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
        resolve = $$resolve;
        reject = $$reject;
      });
      this.resolve = aFunction(resolve), this.reject = aFunction(reject);
    };
    var perform = function (exec) {
      try {
        exec();
      } catch (e) {
        return { error: e };
      }
    };
    var notify = function (record, isReject) {
      if (record.n) return;
      record.n = true;
      var chain = record.c;
      asap(function () {
        var value = record.v,
            ok = record.s == 1,
            i = 0;
        var run = function (reaction) {
          var handler = ok ? reaction.ok : reaction.fail,
              resolve = reaction.resolve,
              reject = reaction.reject,
              result,
              then;
          try {
            if (handler) {
              if (!ok) record.h = true;
              result = handler === true ? value : handler(value);
              if (result === reaction.promise) {
                reject(TypeError('Promise-chain cycle'));
              } else if (then = isThenable(result)) {
                then.call(result, resolve, reject);
              } else resolve(result);
            } else reject(value);
          } catch (e) {
            reject(e);
          }
        };
        while (chain.length > i) run(chain[i++]);
        chain.length = 0;
        record.n = false;
        if (isReject) setTimeout(function () {
          var promise = record.p,
              handler,
              console;
          if (isUnhandled(promise)) {
            if (isNode) {
              process.emit('unhandledRejection', value, promise);
            } else if (handler = global.onunhandledrejection) {
              handler({
                promise: promise,
                reason: value
              });
            } else if ((console = global.console) && console.error) {
              console.error('Unhandled promise rejection', value);
            }
          }
          record.a = undefined;
        }, 1);
      });
    };
    var isUnhandled = function (promise) {
      var record = promise._d,
          chain = record.a || record.c,
          i = 0,
          reaction;
      if (record.h) return false;
      while (chain.length > i) {
        reaction = chain[i++];
        if (reaction.fail || !isUnhandled(reaction.promise)) return false;
      }
      return true;
    };
    var $reject = function (value) {
      var record = this;
      if (record.d) return;
      record.d = true;
      record = record.r || record;
      record.v = value;
      record.s = 2;
      record.a = record.c.slice();
      notify(record, true);
    };
    var $resolve = function (value) {
      var record = this,
          then;
      if (record.d) return;
      record.d = true;
      record = record.r || record;
      try {
        if (record.p === value) throw TypeError("Promise can't be resolved itself");
        if (then = isThenable(value)) {
          asap(function () {
            var wrapper = {
              r: record,
              d: false
            };
            try {
              then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
            } catch (e) {
              $reject.call(wrapper, e);
            }
          });
        } else {
          record.v = value;
          record.s = 1;
          notify(record, false);
        }
      } catch (e) {
        $reject.call({
          r: record,
          d: false
        }, e);
      }
    };
    if (!USE_NATIVE) {
      P = function Promise(executor) {
        aFunction(executor);
        var record = this._d = {
          p: strictNew(this, P, PROMISE),
          c: [],
          a: undefined,
          s: 0,
          d: false,
          v: undefined,
          h: false,
          n: false
        };
        try {
          executor(ctx($resolve, record, 1), ctx($reject, record, 1));
        } catch (err) {
          $reject.call(record, err);
        }
      };
      $__require('npm:core-js@1.2.7/library/modules/$.redefine-all.js')(P.prototype, {
        then: function then(onFulfilled, onRejected) {
          var reaction = new PromiseCapability(speciesConstructor(this, P)),
              promise = reaction.promise,
              record = this._d;
          reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
          reaction.fail = typeof onRejected == 'function' && onRejected;
          record.c.push(reaction);
          if (record.a) record.a.push(reaction);
          if (record.s) notify(record, false);
          return promise;
        },
        'catch': function (onRejected) {
          return this.then(undefined, onRejected);
        }
      });
    }
    $export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: P });
    $__require('npm:core-js@1.2.7/library/modules/$.set-to-string-tag.js')(P, PROMISE);
    $__require('npm:core-js@1.2.7/library/modules/$.set-species.js')(PROMISE);
    Wrapper = $__require('npm:core-js@1.2.7/library/modules/$.core.js')[PROMISE];
    $export($export.S + $export.F * !USE_NATIVE, PROMISE, { reject: function reject(r) {
        var capability = new PromiseCapability(this),
            $$reject = capability.reject;
        $$reject(r);
        return capability.promise;
      } });
    $export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, { resolve: function resolve(x) {
        if (x instanceof P && sameConstructor(x.constructor, this)) return x;
        var capability = new PromiseCapability(this),
            $$resolve = capability.resolve;
        $$resolve(x);
        return capability.promise;
      } });
    $export($export.S + $export.F * !(USE_NATIVE && $__require('npm:core-js@1.2.7/library/modules/$.iter-detect.js')(function (iter) {
      P.all(iter)['catch'](function () {});
    })), PROMISE, {
      all: function all(iterable) {
        var C = getConstructor(this),
            capability = new PromiseCapability(C),
            resolve = capability.resolve,
            reject = capability.reject,
            values = [];
        var abrupt = perform(function () {
          forOf(iterable, false, values.push, values);
          var remaining = values.length,
              results = Array(remaining);
          if (remaining) $.each.call(values, function (promise, index) {
            var alreadyCalled = false;
            C.resolve(promise).then(function (value) {
              if (alreadyCalled) return;
              alreadyCalled = true;
              results[index] = value;
              --remaining || resolve(results);
            }, reject);
          });else resolve(results);
        });
        if (abrupt) reject(abrupt.error);
        return capability.promise;
      },
      race: function race(iterable) {
        var C = getConstructor(this),
            capability = new PromiseCapability(C),
            reject = capability.reject;
        var abrupt = perform(function () {
          forOf(iterable, false, function (promise) {
            C.resolve(promise).then(capability.resolve, reject);
          });
        });
        if (abrupt) reject(abrupt.error);
        return capability.promise;
      }
    });
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.core.js', [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var core = module.exports = { version: '1.2.6' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
System.registerDynamic('npm:core-js@1.2.7/library/fn/promise.js', ['npm:core-js@1.2.7/library/modules/es6.object.to-string.js', 'npm:core-js@1.2.7/library/modules/es6.string.iterator.js', 'npm:core-js@1.2.7/library/modules/web.dom.iterable.js', 'npm:core-js@1.2.7/library/modules/es6.promise.js', 'npm:core-js@1.2.7/library/modules/$.core.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  $__require('npm:core-js@1.2.7/library/modules/es6.object.to-string.js');
  $__require('npm:core-js@1.2.7/library/modules/es6.string.iterator.js');
  $__require('npm:core-js@1.2.7/library/modules/web.dom.iterable.js');
  $__require('npm:core-js@1.2.7/library/modules/es6.promise.js');
  module.exports = $__require('npm:core-js@1.2.7/library/modules/$.core.js').Promise;
});
System.registerDynamic("npm:babel-runtime@5.8.38/core-js/promise.js", ["npm:core-js@1.2.7/library/fn/promise.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("npm:core-js@1.2.7/library/fn/promise.js"), __esModule: true };
});
System.register('scripts/word.js', ['npm:babel-runtime@5.8.38/helpers/create-class.js', 'npm:babel-runtime@5.8.38/helpers/class-call-check.js', 'npm:babel-runtime@5.8.38/core-js/promise.js', 'scripts/audioManager.js'], function (_export) {
    var _createClass, _classCallCheck, _Promise, AudioManager, Word;

    return {
        setters: [function (_npmBabelRuntime5838HelpersCreateClassJs) {
            _createClass = _npmBabelRuntime5838HelpersCreateClassJs['default'];
        }, function (_npmBabelRuntime5838HelpersClassCallCheckJs) {
            _classCallCheck = _npmBabelRuntime5838HelpersClassCallCheckJs['default'];
        }, function (_npmBabelRuntime5838CoreJsPromiseJs) {
            _Promise = _npmBabelRuntime5838CoreJsPromiseJs['default'];
        }, function (_scriptsAudioManagerJs) {
            AudioManager = _scriptsAudioManagerJs['default'];
        }],
        execute: function () {
            'use strict';

            Word = (function () {
                function Word(options) {
                    _classCallCheck(this, Word);

                    this.stimulus = options.stimulus;
                    this.$el = options.$el || $("<span class='word'/>");
                    this.centralStation = options.centralStation;
                }

                _createClass(Word, [{
                    key: 'getText',
                    value: function getText() {
                        return this.stimulus.text;
                    }
                }, {
                    key: 'speak',
                    value: function speak() {
                        return new _Promise((function (resolve, reject) {
                            AudioManager.playOrSpeak(this.stimulus.text, this.stimulus.audio, resolve);
                        }).bind(this));
                    }
                }, {
                    key: 'delay',
                    value: function delay(ms, value) {
                        return function (val) {
                            return new _Promise(function (resolve, reject) {
                                setTimeout(resolve, ms, value !== undefined ? value : val);
                            });
                        };
                    }
                }, {
                    key: 'review',
                    value: function review() {
                        var _this = this;
                        return new _Promise((function (resolve, reject) {
                            this.highlight();
                            this.speak().then(this.delay(2000)).then(function () {
                                _this.removeHighlight();
                                resolve();
                            });
                        }).bind(this));
                    }
                }, {
                    key: 'reviewCorrect',
                    value: function reviewCorrect() {
                        this.$el.addClass('correct');
                        return this.review();
                    }
                }, {
                    key: 'highlight',
                    value: function highlight() {
                        this.$el.addClass('highlight');
                    }
                }, {
                    key: 'removeHighlight',
                    value: function removeHighlight() {
                        this.$el.removeClass('highlight');
                    }
                }, {
                    key: 'render',
                    value: function render() {
                        return this.$el.html(this.getText());
                    }
                }]);

                return Word;
            })();

            _export('default', Word);

            ;
        }
    };
});

System.register('scripts/onsetRimeWord.js', ['npm:babel-runtime@5.8.38/helpers/get.js', 'npm:babel-runtime@5.8.38/helpers/inherits.js', 'npm:babel-runtime@5.8.38/helpers/create-class.js', 'npm:babel-runtime@5.8.38/helpers/class-call-check.js', 'npm:babel-runtime@5.8.38/core-js/promise.js', 'scripts/audioManager.js', 'scripts/word.js'], function (_export) {
    var _get, _inherits, _createClass, _classCallCheck, _Promise, AudioManager, Word, OnsetRimeWord;

    return {
        setters: [function (_npmBabelRuntime5838HelpersGetJs) {
            _get = _npmBabelRuntime5838HelpersGetJs['default'];
        }, function (_npmBabelRuntime5838HelpersInheritsJs) {
            _inherits = _npmBabelRuntime5838HelpersInheritsJs['default'];
        }, function (_npmBabelRuntime5838HelpersCreateClassJs) {
            _createClass = _npmBabelRuntime5838HelpersCreateClassJs['default'];
        }, function (_npmBabelRuntime5838HelpersClassCallCheckJs) {
            _classCallCheck = _npmBabelRuntime5838HelpersClassCallCheckJs['default'];
        }, function (_npmBabelRuntime5838CoreJsPromiseJs) {
            _Promise = _npmBabelRuntime5838CoreJsPromiseJs['default'];
        }, function (_scriptsAudioManagerJs) {
            AudioManager = _scriptsAudioManagerJs['default'];
        }, function (_scriptsWordJs) {
            Word = _scriptsWordJs['default'];
        }],
        execute: function () {
            'use strict';

            OnsetRimeWord = (function (_Word) {
                _inherits(OnsetRimeWord, _Word);

                function OnsetRimeWord() {
                    _classCallCheck(this, OnsetRimeWord);

                    _get(Object.getPrototypeOf(OnsetRimeWord.prototype), 'constructor', this).apply(this, arguments);
                }

                _createClass(OnsetRimeWord, [{
                    key: 'getOnsetAudio',
                    value: function getOnsetAudio() {
                        return this.stimulus.onsetAudio;
                    }
                }, {
                    key: 'getRimeAudio',
                    value: function getRimeAudio() {
                        return this.stimulus.rimeAudio;
                    }
                }, {
                    key: 'getOnset',
                    value: function getOnset() {
                        if (!this.onset) {
                            var onset = this.stimulus.onsetAudio.replace(/\\/g, '/');
                            this.onset = onset.substring(onset.lastIndexOf('/') + 1, onset.lastIndexOf('.'));
                        }
                        return this.onset;
                    }
                }, {
                    key: 'getRime',
                    value: function getRime() {
                        if (!this.rime) {
                            var rime = this.stimulus.rimeAudio.replace(/\\/g, '/');
                            this.rime = rime.substring(rime.lastIndexOf('/') + 1, rime.lastIndexOf('.'));
                        }
                        return this.rime;
                    }
                }, {
                    key: 'review',
                    value: function review() {
                        return new _Promise((function (resolve, reject) {
                            this.reviewOnset().then(function () {
                                return this.reviewRime();
                            });
                        }).bind(this));
                    }
                }, {
                    key: 'reviewCorrect',
                    value: function reviewCorrect() {
                        this.$el.addClass('correct');
                    }
                }, {
                    key: 'speakPart',
                    value: function speakPart(word, url) {
                        return new _Promise((function (resolve, reject) {
                            AudioManager.playOrSpeak(word, url, resolve);
                        }).bind(this));
                    }
                }, {
                    key: 'reviewOnset',
                    value: function reviewOnset() {
                        return new _Promise((function (resolve, reject) {
                            this.highlight('.onset');
                            this.speakPart(this.getOnset(), this.getOnsetAudio()).then(this.delay(2000)).then(function () {
                                this.removeHighlight('.onset');
                                resolve();
                            });
                        }).bind(this));
                    }
                }, {
                    key: 'reviewRime',
                    value: function reviewRime() {
                        return new _Promise((function (resolve, reject) {
                            this.highlight('.rime');
                            this.speakPart(this.getRime(), this.getRimeAudio()).then(this.delay(2000)).then(function () {
                                this.removeHighlight('.rime');
                                resolve();
                            });
                        }).bind(this));
                    }
                }, {
                    key: 'highlight',
                    value: function highlight(subSelector) {
                        this.$el.find(subSelector).addClass('highlight');
                    }
                }, {
                    key: 'removeHighlight',
                    value: function removeHighlight() {
                        this.$el.find(subSelector).removeClass('highlight');
                    }
                }, {
                    key: 'render',
                    value: function render() {
                        this.$el.append($("<span/>").addClass('onset').text(this.getOnset()));
                        this.$el.append($("<span/>").addClass('rime').text(this.getRime()));
                        return this.$el;
                    }
                }]);

                return OnsetRimeWord;
            })(Word);

            _export('default', OnsetRimeWord);

            ;
        }
    };
});

System.register('scripts/character.js', ['npm:babel-runtime@5.8.38/helpers/create-class.js', 'npm:babel-runtime@5.8.38/helpers/class-call-check.js', 'github:innovationsforlearning/centralstation-js-client@master.js', 'scripts/word.js', 'scripts/onsetRimeWord.js'], function (_export) {
    var _createClass, _classCallCheck, CentralStation, Word, OnsetRimeWord, Character;

    return {
        setters: [function (_npmBabelRuntime5838HelpersCreateClassJs) {
            _createClass = _npmBabelRuntime5838HelpersCreateClassJs['default'];
        }, function (_npmBabelRuntime5838HelpersClassCallCheckJs) {
            _classCallCheck = _npmBabelRuntime5838HelpersClassCallCheckJs['default'];
        }, function (_githubInnovationsforlearningCentralstationJsClientMasterJs) {
            CentralStation = _githubInnovationsforlearningCentralstationJsClientMasterJs['default'];
        }, function (_scriptsWordJs) {
            Word = _scriptsWordJs['default'];
        }, function (_scriptsOnsetRimeWordJs) {
            OnsetRimeWord = _scriptsOnsetRimeWordJs['default'];
        }],
        execute: function () {
            'use strict';

            Character = (function () {
                function Character(options) {
                    _classCallCheck(this, Character);

                    this.location = options.location;
                    this.stimulus = options.stimulus;
                    this.question = options.question;
                    this.template = options.template;
                    this.onCorrect = options.onCorrect;
                    this.onIncorrect = options.onIncorrect;
                    this.position = 0;
                    this.word = this.initializeWord(this.stimulus);
                    this.initialize();
                }

                _createClass(Character, [{
                    key: 'initialize',
                    value: function initialize() {
                        this.createElement();
                        if (this.isCorrect()) {
                            this.bindCorrectHandler();
                            this.speak();
                        } else {
                            this.bindIncorrectHandler();
                        }
                    }
                }, {
                    key: 'initializeWord',
                    value: function initializeWord(word) {
                        return this.isOnsetOrRimeQuestion() ? new OnsetRimeWord({ stimulus: word }) : new Word({ stimulus: word });
                    }
                }, {
                    key: 'getCorrectWord',
                    value: function getCorrectWord() {
                        return $.grep(this.question.stimuli, function (s) {
                            return s.isCorrect;
                        })[0];
                    }
                }, {
                    key: 'isCorrect',
                    value: function isCorrect() {
                        return this.stimulus.isCorrect;
                    }
                }, {
                    key: 'isOnsetOrRimeQuestion',
                    value: function isOnsetOrRimeQuestion() {
                        return this.question.type == 'onset' || this.question.type == 'rime';
                    }
                }, {
                    key: 'createElement',
                    value: function createElement() {
                        this.$el = $("<Figure></Figure>").append(this.word.render()).append($("<span class='pointsTotal'></span>"));
                    }
                }, {
                    key: 'changeWord',
                    value: function changeWord(word) {
                        this.$el.html(word.render());
                    }
                }, {
                    key: 'remove',
                    value: function remove() {
                        this.$el.remove();
                    }
                }, {
                    key: 'bindCorrectHandler',
                    value: function bindCorrectHandler() {
                        this.$el.on('click', (function (e) {
                            this.onCorrect(this);
                        }).bind(this));
                    }
                }, {
                    key: 'bindIncorrectHandler',
                    value: function bindIncorrectHandler() {
                        this.$el.on('click', (function (e) {
                            this.onIncorrect(this);
                        }).bind(this));
                    }
                }, {
                    key: 'displayPoints',
                    value: function displayPoints(points) {
                        this.$el.find('.pointsTotal').html(points);
                        this.points = true;
                    }
                }, {
                    key: 'review',
                    value: function review() {
                        return this.word.review();
                    }
                }, {
                    key: 'reviewCorrect',
                    value: function reviewCorrect() {
                        var word = this.initializeWord(this.getCorrectWord());
                        this.changeWord(word);
                        return word.reviewCorrect();
                    }
                }, {
                    key: 'speak',
                    value: function speak() {
                        return this.word.speak();
                    }
                }, {
                    key: 'animate',
                    value: function animate() {
                        var frame = this.template[Math.floor(this.position / 2)];
                        var translateText = 'transform: rotateZ(' + this.location.rotateY + 'deg) rotateX(' + this.location.rotateX + 'deg) translateZ(' + this.location.translateZ + 'px) rotateX(180deg); ';
                        this.$el[0].style.cssText = 'display: inline-block; width:' + frame['frame']['w'] + 'px; height: ' + frame['frame']['h'] + 'px;' + 'background-position: -' + frame['frame']['x'] + 'px -' + frame['frame']['y'] + 'px ; ' + 'padding: 0;' + translateText;
                        this.$el[0].className = frame.classname + (this.points ? ' points' : '');
                        this.position = this.position + 1 >= this.template.length * 2 ? 0 : this.position + 1;
                    }
                }]);

                return Character;
            })();

            _export('default', Character);

            ;
        }
    };
});

System.register('scripts/characterSet.js', ['npm:babel-runtime@5.8.38/helpers/create-class.js', 'npm:babel-runtime@5.8.38/helpers/class-call-check.js', 'scripts/character.js'], function (_export) {
    var _createClass, _classCallCheck, Character, CharacterSet;

    return {
        setters: [function (_npmBabelRuntime5838HelpersCreateClassJs) {
            _createClass = _npmBabelRuntime5838HelpersCreateClassJs['default'];
        }, function (_npmBabelRuntime5838HelpersClassCallCheckJs) {
            _classCallCheck = _npmBabelRuntime5838HelpersClassCallCheckJs['default'];
        }, function (_scriptsCharacterJs) {
            Character = _scriptsCharacterJs['default'];
        }],
        execute: function () {
            'use strict';

            CharacterSet = (function () {
                function CharacterSet(options) {
                    _classCallCheck(this, CharacterSet);

                    this.characters = [];
                    this.quadrants = this.shuffleArray([0, 1, 2, 3]);
                    this.characterTemplates = this.shuffleArray(options.characterTemplates.slice(0));
                    this.$viewpointElement = options.viewpointElement;
                    this.question = options.question;
                    this.onCorrect = options.onCorrect;
                    this.onIncorrect = options.onIncorrect;
                    this.generateCharacters();
                    this.populateCharacters();
                }

                _createClass(CharacterSet, [{
                    key: 'generateCharacters',
                    value: function generateCharacters() {
                        this.characters = this.question.stimuli.map(this.generateCharacter.bind(this));
                    }
                }, {
                    key: 'generateCharacter',
                    value: function generateCharacter(stimulus) {
                        return new Character({ location: this.randomLocation(),
                            template: this.randomTemplate(),
                            stimulus: stimulus,
                            onCorrect: this.onCorrect,
                            onIncorrect: this.onIncorrect,
                            question: this.question
                        });
                    }
                }, {
                    key: 'animate',
                    value: function animate() {
                        this.characters.forEach(function (character) {
                            character.animate.call(character);
                        });
                    }
                }, {
                    key: 'randomQuadrant',
                    value: function randomQuadrant() {}
                }, {
                    key: 'randomLocation',
                    value: function randomLocation() {
                        return {
                            rotateX: Math.floor(Math.random() * 110) + 40,
                            rotateY: Math.floor(Math.random() * 90) + this.quadrants.pop() * 90 + 1,
                            rotateZ: 0,
                            translateZ: 1500
                        };
                    }
                }, {
                    key: 'randomTemplate',
                    value: function randomTemplate() {
                        return this.characterTemplates.pop();
                    }
                }, {
                    key: 'shuffleArray',
                    value: function shuffleArray(array) {
                        for (var i = array.length - 1; i > 0; i--) {
                            var j = Math.floor(Math.random() * (i + 1));
                            var temp = array[i];
                            array[i] = array[j];
                            array[j] = temp;
                        }
                        return array;
                    }
                }, {
                    key: 'remove',
                    value: function remove() {
                        this.characters.forEach(function (character) {
                            character.remove();
                        });
                    }
                }, {
                    key: 'replayAudio',
                    value: function replayAudio() {
                        $.grep(this.characters, function (c) {
                            return c.isCorrect();
                        })[0].speak();
                    }
                }, {
                    key: 'populateCharacters',
                    value: function populateCharacters() {
                        this.characters.forEach(this.appendCharacter.bind(this));
                    }
                }, {
                    key: 'appendCharacter',
                    value: function appendCharacter(character) {
                        this.$viewpointElement.append(character.$el);
                    }
                }]);

                return CharacterSet;
            })();

            _export('default', CharacterSet);

            ;
        }
    };
});

System.register("scripts/pointsTimer.js", ["npm:babel-runtime@5.8.38/helpers/create-class.js", "npm:babel-runtime@5.8.38/helpers/class-call-check.js"], function (_export) {
    var _createClass, _classCallCheck, PointsTimer;

    return {
        setters: [function (_npmBabelRuntime5838HelpersCreateClassJs) {
            _createClass = _npmBabelRuntime5838HelpersCreateClassJs["default"];
        }, function (_npmBabelRuntime5838HelpersClassCallCheckJs) {
            _classCallCheck = _npmBabelRuntime5838HelpersClassCallCheckJs["default"];
        }],
        execute: function () {
            "use strict";

            PointsTimer = (function () {
                function PointsTimer(options) {
                    _classCallCheck(this, PointsTimer);

                    this.zones = options.zones;
                    this.onNoMoreTimers = options.onNoMoreTimers;
                    this.$el = options.$el;
                    this.timeout = null;
                    this.position = 0;
                    this.initialize();
                }

                _createClass(PointsTimer, [{
                    key: "initialize",
                    value: function initialize() {
                        this.startCurrentTimer();
                        this.renderCurrentPoints();
                    }
                }, {
                    key: "startCurrentTimer",
                    value: function startCurrentTimer() {
                        this.timeout = setTimeout(this.nextPointZone.bind(this), this.zones[this.position].time);
                        this.renderCurrentPoints();
                    }
                }, {
                    key: "renderCurrentPoints",
                    value: function renderCurrentPoints() {
                        this.$el.html("<span class='timer timer-" + this.currentPoints() + "'/>");
                    }
                }, {
                    key: "currentPoints",
                    value: function currentPoints() {
                        return this.zones[this.position].points;
                    }
                }, {
                    key: "nextPointZone",
                    value: function nextPointZone() {
                        if (this.position + 1 >= this.zones.length) {
                            this.onNoMoreTimers();
                        } else {
                            this.position = this.position + 1;
                            this.startCurrentTimer();
                            this.renderCurrentPoints();
                        }
                    }
                }, {
                    key: "pause",
                    value: function pause() {
                        clearTimeout(this.timeout);
                    }
                }]);

                return PointsTimer;
            })();

            _export("default", PointsTimer);

            ;
        }
    };
});

System.register("scripts/playerScore.js", ["npm:babel-runtime@5.8.38/helpers/create-class.js", "npm:babel-runtime@5.8.38/helpers/class-call-check.js"], function (_export) {
    var _createClass, _classCallCheck, PlayerScore;

    return {
        setters: [function (_npmBabelRuntime5838HelpersCreateClassJs) {
            _createClass = _npmBabelRuntime5838HelpersCreateClassJs["default"];
        }, function (_npmBabelRuntime5838HelpersClassCallCheckJs) {
            _classCallCheck = _npmBabelRuntime5838HelpersClassCallCheckJs["default"];
        }],
        execute: function () {
            "use strict";

            PlayerScore = (function () {
                function PlayerScore(options) {
                    _classCallCheck(this, PlayerScore);

                    this.player = options.player;
                    this.$nameEl = options.$nameEl;
                    this.$scoreEl = options.$scoreEl;
                    this.score = 0;
                    this.initialize();
                }

                _createClass(PlayerScore, [{
                    key: "initialize",
                    value: function initialize() {
                        this.render();
                    }
                }, {
                    key: "addPoints",
                    value: function addPoints(points) {
                        this.score = this.score + points;
                        this.render();
                    }
                }, {
                    key: "currentScore",
                    value: function currentScore() {
                        return this.score;
                    }
                }, {
                    key: "render",
                    value: function render() {
                        this.$scoreEl.html(this.score);
                        this.$nameEl.html(this.player.name);
                    }
                }]);

                return PlayerScore;
            })();

            _export("default", PlayerScore);

            ;
        }
    };
});

System.registerDynamic("npm:core-js@1.2.7/library/modules/$.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var $Object = Object;
  module.exports = {
    create: $Object.create,
    getProto: $Object.getPrototypeOf,
    isEnum: {}.propertyIsEnumerable,
    getDesc: $Object.getOwnPropertyDescriptor,
    setDesc: $Object.defineProperty,
    setDescs: $Object.defineProperties,
    getKeys: $Object.keys,
    getNames: $Object.getOwnPropertyNames,
    getSymbols: $Object.getOwnPropertySymbols,
    each: [].forEach
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/fn/object/define-property.js', ['npm:core-js@1.2.7/library/modules/$.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var $ = $__require('npm:core-js@1.2.7/library/modules/$.js');
  module.exports = function defineProperty(it, key, desc) {
    return $.setDesc(it, key, desc);
  };
});
System.registerDynamic("npm:babel-runtime@5.8.38/core-js/object/define-property.js", ["npm:core-js@1.2.7/library/fn/object/define-property.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("npm:core-js@1.2.7/library/fn/object/define-property.js"), __esModule: true };
});
System.registerDynamic("npm:babel-runtime@5.8.38/helpers/create-class.js", ["npm:babel-runtime@5.8.38/core-js/object/define-property.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var _Object$defineProperty = $__require("npm:babel-runtime@5.8.38/core-js/object/define-property.js")["default"];
  exports["default"] = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        _Object$defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  exports.__esModule = true;
});
System.registerDynamic("npm:babel-runtime@5.8.38/helpers/class-call-check.js", [], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports["default"] = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  exports.__esModule = true;
});
System.register('scripts/nextPlayerScreen.js', ['npm:babel-runtime@5.8.38/helpers/create-class.js', 'npm:babel-runtime@5.8.38/helpers/class-call-check.js'], function (_export) {
    var _createClass, _classCallCheck, NextPlayerScreen;

    return {
        setters: [function (_npmBabelRuntime5838HelpersCreateClassJs) {
            _createClass = _npmBabelRuntime5838HelpersCreateClassJs['default'];
        }, function (_npmBabelRuntime5838HelpersClassCallCheckJs) {
            _classCallCheck = _npmBabelRuntime5838HelpersClassCallCheckJs['default'];
        }],
        execute: function () {
            'use strict';

            NextPlayerScreen = (function () {
                function NextPlayerScreen(options) {
                    _classCallCheck(this, NextPlayerScreen);

                    this.players = options.players;
                    this.$el = options.$el;
                    this.initialize();
                    this.callback = function () {};
                }

                _createClass(NextPlayerScreen, [{
                    key: 'initialize',
                    value: function initialize() {
                        this.$el.find('.player-name.player1').html(this.players[0].name + "'s Turn");
                        this.$el.find('.player-name.player2').html(this.players[1].name + "'s Turn");
                        this.$el.on('click', this.hideScreen.bind(this));
                    }
                }, {
                    key: 'showScreen',
                    value: function showScreen(currentPlayerIndex, callback) {
                        this.$el.addClass('player' + (currentPlayerIndex + 1));
                        this.callback = callback;
                    }
                }, {
                    key: 'hideScreen',
                    value: function hideScreen() {
                        this.$el.removeClass('player1 player2');
                        this.callback();
                    }
                }]);

                return NextPlayerScreen;
            })();

            _export('default', NextPlayerScreen);

            ;
        }
    };
});

(function() {
var define = System.amdDefine;
(function() {
  var cache = {};
  var ctx = null,
      usingWebAudio = true,
      noAudio = false;
  try {
    if (typeof AudioContext !== 'undefined') {
      ctx = new AudioContext();
    } else if (typeof webkitAudioContext !== 'undefined') {
      ctx = new webkitAudioContext();
    } else {
      usingWebAudio = false;
    }
  } catch (e) {
    usingWebAudio = false;
  }
  if (!usingWebAudio) {
    if (typeof Audio !== 'undefined') {
      try {
        new Audio();
      } catch (e) {
        noAudio = true;
      }
    } else {
      noAudio = true;
    }
  }
  if (usingWebAudio) {
    var masterGain = (typeof ctx.createGain === 'undefined') ? ctx.createGainNode() : ctx.createGain();
    masterGain.gain.value = 1;
    masterGain.connect(ctx.destination);
  }
  var HowlerGlobal = function(codecs) {
    this._volume = 1;
    this._muted = false;
    this.usingWebAudio = usingWebAudio;
    this.ctx = ctx;
    this.noAudio = noAudio;
    this._howls = [];
    this._codecs = codecs;
    this.iOSAutoEnable = true;
  };
  HowlerGlobal.prototype = {
    volume: function(vol) {
      var self = this;
      vol = parseFloat(vol);
      if (vol >= 0 && vol <= 1) {
        self._volume = vol;
        if (usingWebAudio) {
          masterGain.gain.value = vol;
        }
        for (var key in self._howls) {
          if (self._howls.hasOwnProperty(key) && self._howls[key]._webAudio === false) {
            for (var i = 0; i < self._howls[key]._audioNode.length; i++) {
              self._howls[key]._audioNode[i].volume = self._howls[key]._volume * self._volume;
            }
          }
        }
        return self;
      }
      return (usingWebAudio) ? masterGain.gain.value : self._volume;
    },
    mute: function() {
      this._setMuted(true);
      return this;
    },
    unmute: function() {
      this._setMuted(false);
      return this;
    },
    _setMuted: function(muted) {
      var self = this;
      self._muted = muted;
      if (usingWebAudio) {
        masterGain.gain.value = muted ? 0 : self._volume;
      }
      for (var key in self._howls) {
        if (self._howls.hasOwnProperty(key) && self._howls[key]._webAudio === false) {
          for (var i = 0; i < self._howls[key]._audioNode.length; i++) {
            self._howls[key]._audioNode[i].muted = muted;
          }
        }
      }
    },
    codecs: function(ext) {
      return this._codecs[ext];
    },
    _enableiOSAudio: function() {
      var self = this;
      if (ctx && (self._iOSEnabled || !/iPhone|iPad|iPod/i.test(navigator.userAgent))) {
        return;
      }
      self._iOSEnabled = false;
      var unlock = function() {
        var buffer = ctx.createBuffer(1, 1, 22050);
        var source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        if (typeof source.start === 'undefined') {
          source.noteOn(0);
        } else {
          source.start(0);
        }
        setTimeout(function() {
          if ((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
            self._iOSEnabled = true;
            self.iOSAutoEnable = false;
            window.removeEventListener('touchend', unlock, false);
          }
        }, 0);
      };
      window.addEventListener('touchend', unlock, false);
      return self;
    }
  };
  var audioTest = null;
  var codecs = {};
  if (!noAudio) {
    audioTest = new Audio();
    codecs = {
      mp3: !!audioTest.canPlayType('audio/mpeg;').replace(/^no$/, ''),
      opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ''),
      ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
      wav: !!audioTest.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''),
      aac: !!audioTest.canPlayType('audio/aac;').replace(/^no$/, ''),
      m4a: !!(audioTest.canPlayType('audio/x-m4a;') || audioTest.canPlayType('audio/m4a;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
      mp4: !!(audioTest.canPlayType('audio/x-mp4;') || audioTest.canPlayType('audio/mp4;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
      weba: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')
    };
  }
  var Howler = new HowlerGlobal(codecs);
  var Howl = function(o) {
    var self = this;
    self._autoplay = o.autoplay || false;
    self._buffer = o.buffer || false;
    self._duration = o.duration || 0;
    self._format = o.format || null;
    self._loop = o.loop || false;
    self._loaded = false;
    self._sprite = o.sprite || {};
    self._src = o.src || '';
    self._pos3d = o.pos3d || [0, 0, -0.5];
    self._volume = o.volume !== undefined ? o.volume : 1;
    self._urls = o.urls || [];
    self._rate = o.rate || 1;
    self._timeout = o.timeout || 10000;
    self._model = o.model || null;
    self._onload = [o.onload || function() {}];
    self._onloaderror = [o.onloaderror || function() {}];
    self._onend = [o.onend || function() {}];
    self._onpause = [o.onpause || function() {}];
    self._onplay = [o.onplay || function() {}];
    self._onendTimer = [];
    self._webAudio = usingWebAudio && !self._buffer;
    self._audioNode = [];
    if (self._webAudio) {
      self._setupAudioNode();
    }
    if (typeof ctx !== 'undefined' && ctx && Howler.iOSAutoEnable) {
      Howler._enableiOSAudio();
    }
    Howler._howls.push(self);
    self.load();
  };
  Howl.prototype = {
    load: function() {
      var self = this,
          url = null;
      if (noAudio) {
        self.on('loaderror', new Error('No audio support.'));
        return;
      }
      for (var i = 0; i < self._urls.length; i++) {
        var ext,
            urlItem;
        if (self._format) {
          ext = self._format;
        } else {
          urlItem = self._urls[i];
          ext = /^data:audio\/([^;,]+);/i.exec(urlItem);
          if (!ext) {
            ext = /\.([^.]+)$/.exec(urlItem.split('?', 1)[0]);
          }
          if (ext) {
            ext = ext[1].toLowerCase();
          } else {
            self.on('loaderror', new Error('Could not extract format from passed URLs, please add format parameter.'));
            return;
          }
        }
        if (codecs[ext]) {
          url = self._urls[i];
          break;
        }
      }
      if (!url) {
        self.on('loaderror', new Error('No codec support for selected audio sources.'));
        return;
      }
      self._src = url;
      if (self._webAudio) {
        loadBuffer(self, url);
      } else {
        var newNode = new Audio();
        newNode.addEventListener('error', function() {
          if (newNode.error && newNode.error.code === 4) {
            HowlerGlobal.noAudio = true;
          }
          self.on('loaderror', {type: newNode.error ? newNode.error.code : 0});
        }, false);
        self._audioNode.push(newNode);
        newNode.src = url;
        newNode._pos = 0;
        newNode.preload = 'auto';
        newNode.volume = (Howler._muted) ? 0 : self._volume * Howler.volume();
        var listener = function() {
          self._duration = Math.ceil(newNode.duration * 10) / 10;
          if (Object.getOwnPropertyNames(self._sprite).length === 0) {
            self._sprite = {_default: [0, self._duration * 1000]};
          }
          if (!self._loaded) {
            self._loaded = true;
            self.on('load');
          }
          if (self._autoplay) {
            self.play();
          }
          newNode.removeEventListener('canplaythrough', listener, false);
        };
        newNode.addEventListener('canplaythrough', listener, false);
        newNode.load();
      }
      return self;
    },
    urls: function(urls) {
      var self = this;
      if (urls) {
        self.stop();
        self._urls = (typeof urls === 'string') ? [urls] : urls;
        self._loaded = false;
        self.load();
        return self;
      } else {
        return self._urls;
      }
    },
    play: function(sprite, callback) {
      var self = this;
      if (typeof sprite === 'function') {
        callback = sprite;
      }
      if (!sprite || typeof sprite === 'function') {
        sprite = '_default';
      }
      if (!self._loaded) {
        self.on('load', function() {
          self.play(sprite, callback);
        });
        return self;
      }
      if (!self._sprite[sprite]) {
        if (typeof callback === 'function')
          callback();
        return self;
      }
      self._inactiveNode(function(node) {
        node._sprite = sprite;
        var pos = (node._pos > 0) ? node._pos : self._sprite[sprite][0] / 1000;
        var duration = 0;
        if (self._webAudio) {
          duration = self._sprite[sprite][1] / 1000 - node._pos;
          if (node._pos > 0) {
            pos = self._sprite[sprite][0] / 1000 + pos;
          }
        } else {
          duration = self._sprite[sprite][1] / 1000 - (pos - self._sprite[sprite][0] / 1000);
        }
        var loop = !!(self._loop || self._sprite[sprite][2]);
        var soundId = (typeof callback === 'string') ? callback : Math.round(Date.now() * Math.random()) + '',
            timerId;
        (function() {
          var data = {
            id: soundId,
            sprite: sprite,
            loop: loop
          };
          timerId = setTimeout(function() {
            if (!self._webAudio && loop) {
              self.stop(data.id).play(sprite, data.id);
            }
            if (self._webAudio && !loop) {
              self._nodeById(data.id).paused = true;
              self._nodeById(data.id)._pos = 0;
              self._clearEndTimer(data.id);
            }
            if (!self._webAudio && !loop) {
              self.stop(data.id);
            }
            self.on('end', soundId);
          }, (duration / self._rate) * 1000);
          self._onendTimer.push({
            timer: timerId,
            id: data.id
          });
        })();
        if (self._webAudio) {
          var loopStart = self._sprite[sprite][0] / 1000,
              loopEnd = self._sprite[sprite][1] / 1000;
          node.id = soundId;
          node.paused = false;
          refreshBuffer(self, [loop, loopStart, loopEnd], soundId);
          self._playStart = ctx.currentTime;
          node.gain.value = self._volume;
          if (typeof node.bufferSource.start === 'undefined') {
            loop ? node.bufferSource.noteGrainOn(0, pos, 86400) : node.bufferSource.noteGrainOn(0, pos, duration);
          } else {
            loop ? node.bufferSource.start(0, pos, 86400) : node.bufferSource.start(0, pos, duration);
          }
        } else {
          if (node.readyState === 4 || !node.readyState && navigator.isCocoonJS) {
            node.readyState = 4;
            node.id = soundId;
            node.currentTime = pos;
            node.muted = Howler._muted || node.muted;
            node.volume = self._volume * Howler.volume();
            setTimeout(function() {
              node.play();
            }, 0);
          } else {
            self._clearEndTimer(soundId);
            (function() {
              var sound = self,
                  playSprite = sprite,
                  fn = callback,
                  newNode = node;
              var listener = function() {
                sound.play(playSprite, fn);
                newNode.removeEventListener('canplaythrough', listener, false);
              };
              newNode.addEventListener('canplaythrough', listener, false);
            })();
            return self;
          }
        }
        self.on('play');
        if (typeof callback === 'function')
          callback(soundId);
        return self;
      });
      return self;
    },
    pause: function(id) {
      var self = this;
      if (!self._loaded) {
        self.on('play', function() {
          self.pause(id);
        });
        return self;
      }
      self._clearEndTimer(id);
      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        activeNode._pos = self.pos(null, id);
        if (self._webAudio) {
          if (!activeNode.bufferSource || activeNode.paused) {
            return self;
          }
          activeNode.paused = true;
          if (typeof activeNode.bufferSource.stop === 'undefined') {
            activeNode.bufferSource.noteOff(0);
          } else {
            activeNode.bufferSource.stop(0);
          }
        } else {
          activeNode.pause();
        }
      }
      self.on('pause');
      return self;
    },
    stop: function(id) {
      var self = this;
      if (!self._loaded) {
        self.on('play', function() {
          self.stop(id);
        });
        return self;
      }
      self._clearEndTimer(id);
      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        activeNode._pos = 0;
        if (self._webAudio) {
          if (!activeNode.bufferSource || activeNode.paused) {
            return self;
          }
          activeNode.paused = true;
          if (typeof activeNode.bufferSource.stop === 'undefined') {
            activeNode.bufferSource.noteOff(0);
          } else {
            activeNode.bufferSource.stop(0);
          }
        } else if (!isNaN(activeNode.duration)) {
          activeNode.pause();
          activeNode.currentTime = 0;
        }
      }
      return self;
    },
    mute: function(id) {
      var self = this;
      if (!self._loaded) {
        self.on('play', function() {
          self.mute(id);
        });
        return self;
      }
      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        if (self._webAudio) {
          activeNode.gain.value = 0;
        } else {
          activeNode.muted = true;
        }
      }
      return self;
    },
    unmute: function(id) {
      var self = this;
      if (!self._loaded) {
        self.on('play', function() {
          self.unmute(id);
        });
        return self;
      }
      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        if (self._webAudio) {
          activeNode.gain.value = self._volume;
        } else {
          activeNode.muted = false;
        }
      }
      return self;
    },
    volume: function(vol, id) {
      var self = this;
      vol = parseFloat(vol);
      if (vol >= 0 && vol <= 1) {
        self._volume = vol;
        if (!self._loaded) {
          self.on('play', function() {
            self.volume(vol, id);
          });
          return self;
        }
        var activeNode = (id) ? self._nodeById(id) : self._activeNode();
        if (activeNode) {
          if (self._webAudio) {
            activeNode.gain.value = vol;
          } else {
            activeNode.volume = vol * Howler.volume();
          }
        }
        return self;
      } else {
        return self._volume;
      }
    },
    loop: function(loop) {
      var self = this;
      if (typeof loop === 'boolean') {
        self._loop = loop;
        return self;
      } else {
        return self._loop;
      }
    },
    sprite: function(sprite) {
      var self = this;
      if (typeof sprite === 'object') {
        self._sprite = sprite;
        return self;
      } else {
        return self._sprite;
      }
    },
    pos: function(pos, id) {
      var self = this;
      if (!self._loaded) {
        self.on('load', function() {
          self.pos(pos);
        });
        return typeof pos === 'number' ? self : self._pos || 0;
      }
      pos = parseFloat(pos);
      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        if (pos >= 0) {
          self.pause(id);
          activeNode._pos = pos;
          self.play(activeNode._sprite, id);
          return self;
        } else {
          return self._webAudio ? activeNode._pos + (ctx.currentTime - self._playStart) : activeNode.currentTime;
        }
      } else if (pos >= 0) {
        return self;
      } else {
        for (var i = 0; i < self._audioNode.length; i++) {
          if (self._audioNode[i].paused && self._audioNode[i].readyState === 4) {
            return (self._webAudio) ? self._audioNode[i]._pos : self._audioNode[i].currentTime;
          }
        }
      }
    },
    pos3d: function(x, y, z, id) {
      var self = this;
      y = (typeof y === 'undefined' || !y) ? 0 : y;
      z = (typeof z === 'undefined' || !z) ? -0.5 : z;
      if (!self._loaded) {
        self.on('play', function() {
          self.pos3d(x, y, z, id);
        });
        return self;
      }
      if (x >= 0 || x < 0) {
        if (self._webAudio) {
          var activeNode = (id) ? self._nodeById(id) : self._activeNode();
          if (activeNode) {
            self._pos3d = [x, y, z];
            activeNode.panner.setPosition(x, y, z);
            activeNode.panner.panningModel = self._model || 'HRTF';
          }
        }
      } else {
        return self._pos3d;
      }
      return self;
    },
    fade: function(from, to, len, callback, id) {
      var self = this,
          diff = Math.abs(from - to),
          dir = from > to ? 'down' : 'up',
          steps = diff / 0.01,
          stepTime = len / steps;
      if (!self._loaded) {
        self.on('load', function() {
          self.fade(from, to, len, callback, id);
        });
        return self;
      }
      self.volume(from, id);
      for (var i = 1; i <= steps; i++) {
        (function() {
          var change = self._volume + (dir === 'up' ? 0.01 : -0.01) * i,
              vol = Math.round(1000 * change) / 1000,
              toVol = to;
          setTimeout(function() {
            self.volume(vol, id);
            if (vol === toVol) {
              if (callback)
                callback();
            }
          }, stepTime * i);
        })();
      }
    },
    fadeIn: function(to, len, callback) {
      return this.volume(0).play().fade(0, to, len, callback);
    },
    fadeOut: function(to, len, callback, id) {
      var self = this;
      return self.fade(self._volume, to, len, function() {
        if (callback)
          callback();
        self.pause(id);
        self.on('end');
      }, id);
    },
    _nodeById: function(id) {
      var self = this,
          node = self._audioNode[0];
      for (var i = 0; i < self._audioNode.length; i++) {
        if (self._audioNode[i].id === id) {
          node = self._audioNode[i];
          break;
        }
      }
      return node;
    },
    _activeNode: function() {
      var self = this,
          node = null;
      for (var i = 0; i < self._audioNode.length; i++) {
        if (!self._audioNode[i].paused) {
          node = self._audioNode[i];
          break;
        }
      }
      self._drainPool();
      return node;
    },
    _inactiveNode: function(callback) {
      var self = this,
          node = null;
      for (var i = 0; i < self._audioNode.length; i++) {
        if (self._audioNode[i].paused && self._audioNode[i].readyState === 4) {
          callback(self._audioNode[i]);
          node = true;
          break;
        }
      }
      self._drainPool();
      if (node) {
        return;
      }
      var newNode;
      if (self._webAudio) {
        newNode = self._setupAudioNode();
        callback(newNode);
      } else {
        self.load();
        newNode = self._audioNode[self._audioNode.length - 1];
        var listenerEvent = navigator.isCocoonJS ? 'canplaythrough' : 'loadedmetadata';
        var listener = function() {
          newNode.removeEventListener(listenerEvent, listener, false);
          callback(newNode);
        };
        newNode.addEventListener(listenerEvent, listener, false);
      }
    },
    _drainPool: function() {
      var self = this,
          inactive = 0,
          i;
      for (i = 0; i < self._audioNode.length; i++) {
        if (self._audioNode[i].paused) {
          inactive++;
        }
      }
      for (i = self._audioNode.length - 1; i >= 0; i--) {
        if (inactive <= 5) {
          break;
        }
        if (self._audioNode[i].paused) {
          if (self._webAudio) {
            self._audioNode[i].disconnect(0);
          }
          inactive--;
          self._audioNode.splice(i, 1);
        }
      }
    },
    _clearEndTimer: function(soundId) {
      var self = this,
          index = -1;
      for (var i = 0; i < self._onendTimer.length; i++) {
        if (self._onendTimer[i].id === soundId) {
          index = i;
          break;
        }
      }
      var timer = self._onendTimer[index];
      if (timer) {
        clearTimeout(timer.timer);
        self._onendTimer.splice(index, 1);
      }
    },
    _setupAudioNode: function() {
      var self = this,
          node = self._audioNode,
          index = self._audioNode.length;
      node[index] = (typeof ctx.createGain === 'undefined') ? ctx.createGainNode() : ctx.createGain();
      node[index].gain.value = self._volume;
      node[index].paused = true;
      node[index]._pos = 0;
      node[index].readyState = 4;
      node[index].connect(masterGain);
      node[index].panner = ctx.createPanner();
      node[index].panner.panningModel = self._model || 'equalpower';
      node[index].panner.setPosition(self._pos3d[0], self._pos3d[1], self._pos3d[2]);
      node[index].panner.connect(node[index]);
      return node[index];
    },
    on: function(event, fn) {
      var self = this,
          events = self['_on' + event];
      if (typeof fn === 'function') {
        events.push(fn);
      } else {
        for (var i = 0; i < events.length; i++) {
          if (fn) {
            events[i].call(self, fn);
          } else {
            events[i].call(self);
          }
        }
      }
      return self;
    },
    off: function(event, fn) {
      var self = this,
          events = self['_on' + event];
      if (fn) {
        for (var i = 0; i < events.length; i++) {
          if (fn === events[i]) {
            events.splice(i, 1);
            break;
          }
        }
      } else {
        self['_on' + event] = [];
      }
      return self;
    },
    unload: function() {
      var self = this;
      var nodes = self._audioNode;
      for (var i = 0; i < self._audioNode.length; i++) {
        if (!nodes[i].paused) {
          self.stop(nodes[i].id);
          self.on('end', nodes[i].id);
        }
        if (!self._webAudio) {
          nodes[i].src = '';
        } else {
          nodes[i].disconnect(0);
        }
      }
      for (i = 0; i < self._onendTimer.length; i++) {
        clearTimeout(self._onendTimer[i].timer);
      }
      var index = Howler._howls.indexOf(self);
      if (index !== null && index >= 0) {
        Howler._howls.splice(index, 1);
      }
      delete cache[self._src];
      self = null;
    }
  };
  if (usingWebAudio) {
    var loadBuffer = function(obj, url) {
      if (url in cache) {
        obj._duration = cache[url].duration;
        loadSound(obj);
        return;
      }
      if (/^data:[^;]+;base64,/.test(url)) {
        var data = atob(url.split(',')[1]);
        var dataView = new Uint8Array(data.length);
        for (var i = 0; i < data.length; ++i) {
          dataView[i] = data.charCodeAt(i);
        }
        decodeAudioData(dataView.buffer, obj, url);
      } else {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.timeout = obj._timeout;
        xhr.ontimeout = function() {
          obj.on('loaderror', new Error('File load timed out.'));
        };
        xhr.onload = function() {
          decodeAudioData(xhr.response, obj, url);
        };
        xhr.onerror = function() {
          if (obj._webAudio) {
            obj._buffer = true;
            obj._webAudio = false;
            obj._audioNode = [];
            delete obj._gainNode;
            delete cache[url];
            obj.load();
          }
        };
        try {
          xhr.send();
        } catch (e) {
          xhr.onerror();
        }
      }
    };
    var decodeAudioData = function(arraybuffer, obj, url) {
      ctx.decodeAudioData(arraybuffer, function(buffer) {
        if (buffer) {
          cache[url] = buffer;
          loadSound(obj, buffer);
        }
      }, function(err) {
        obj.on('loaderror', err);
      });
    };
    var loadSound = function(obj, buffer) {
      obj._duration = (buffer) ? buffer.duration : obj._duration;
      if (Object.getOwnPropertyNames(obj._sprite).length === 0) {
        obj._sprite = {_default: [0, obj._duration * 1000]};
      }
      if (!obj._loaded) {
        obj._loaded = true;
        obj.on('load');
      }
      if (obj._autoplay) {
        obj.play();
      }
    };
    var refreshBuffer = function(obj, loop, id) {
      var node = obj._nodeById(id);
      node.bufferSource = ctx.createBufferSource();
      node.bufferSource.buffer = cache[obj._src];
      node.bufferSource.connect(node.panner);
      node.bufferSource.loop = loop[0];
      if (loop[0]) {
        node.bufferSource.loopStart = loop[1];
        node.bufferSource.loopEnd = loop[1] + loop[2];
      }
      node.bufferSource.playbackRate.value = obj._rate;
    };
  }
  if (typeof define === 'function' && define.amd) {
    define("github:innovationsforlearning/howler.js@timeout-fix/howler.js", [], function() {
      return {
        Howler: Howler,
        Howl: Howl
      };
    });
  }
  if (typeof exports !== 'undefined') {
    exports.Howler = Howler;
    exports.Howl = Howl;
  }
  if (typeof window !== 'undefined') {
    window.Howler = Howler;
    window.Howl = Howl;
  }
})();

})();
(function() {
var define = System.amdDefine;
define("github:innovationsforlearning/howler.js@timeout-fix.js", ["github:innovationsforlearning/howler.js@timeout-fix/howler.js"], function(main) {
  return main;
});

})();
System.register('scripts/audioManager.js', ['github:innovationsforlearning/howler.js@timeout-fix.js'], function (_export) {
    'use strict';

    var Howl;
    return {
        setters: [function (_githubInnovationsforlearningHowlerJsTimeoutFixJs) {
            Howl = _githubInnovationsforlearningHowlerJsTimeoutFixJs.Howl;
        }],
        execute: function () {
            _export('default', {

                initialize: function initialize(centralstation) {
                    this.centralStation = centralstation;
                    this.wordAudio = [];
                },

                playOrSpeak: function playOrSpeak(word, url, callback) {
                    var _this = this;

                    var minTime = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

                    var startTime = new Date() * 1;
                    if (this.centralStation.offline || !url) {
                        this.speakWordAudio(word, url, callback, startTime, minTime);
                    } else if (this.wordAudio[url]) {
                        this.wordAudio[url].play();

                        window.setTimeout(function () {
                            if (callback) callback();
                        }, minTime);
                    } else {
                        this.wordAudio[url] = new Howl({
                            urls: [url],
                            onload: function onload() {
                                if (_this.wordAudio[url]) {
                                    _this.wordAudio[url].play();

                                    window.setTimeout(function () {
                                        if (callback) callback();
                                    }, Math.max(startTime - new Date() * 1, minTime));
                                } else {
                                    _this.speakWordAudio(word, url, callback, startTime, minTime);
                                }
                            },
                            onloaderror: function onloaderror() {
                                _this.speakWordAudio(word, url, callback, startTime, minTime);
                            }
                        });
                    }
                },

                speakWordAudio: function speakWordAudio(word, url, callback, startTime, minTime) {
                    var _this2 = this;

                    try {
                        this.centralStation.TTSSpeak(word);
                    } catch (e) {
                        console.error(e);
                    } finally {
                        this.centralStation.offline = true;
                        window.setTimeout(function () {
                            if (url && _this2.wordAudio[url]) {

                                delete _this2.wordAudio[url];
                            }
                            if (callback) callback();
                        }, Math.max(startTime - new Date() * 1, minTime));
                    }
                }

            });
        }
    };
});

System.register("json/WD_blueBear_idle-0.js", [], function (_export) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            _export("default", {
                "frames": [{
                    "filename": "goalIdle_blueBear_0000",
                    "frame": { "x": 1, "y": 1, "w": 171, "h": 231 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 155, "y": 23, "w": 171, "h": 231 },
                    "sourceSize": { "w": 480, "h": 270 },
                    "pivot": { "x": 0.5, "y": 0.5 }
                }, {
                    "filename": "goalIdle_blueBear_0001",
                    "frame": { "x": 173, "y": 234, "w": 171, "h": 229 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 156, "y": 23, "w": 171, "h": 229 },
                    "sourceSize": { "w": 480, "h": 270 },
                    "pivot": { "x": 0.5, "y": 0.5 }
                }, {
                    "filename": "goalIdle_blueBear_0002",
                    "frame": { "x": 1, "y": 234, "w": 170, "h": 230 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 157, "y": 23, "w": 170, "h": 230 },
                    "sourceSize": { "w": 480, "h": 270 },
                    "pivot": { "x": 0.5, "y": 0.5 }
                }, {
                    "filename": "goalIdle_blueBear_0003",
                    "frame": { "x": 1, "y": 466, "w": 170, "h": 230 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 158, "y": 23, "w": 170, "h": 230 },
                    "sourceSize": { "w": 480, "h": 270 },
                    "pivot": { "x": 0.5, "y": 0.5 }
                }, {
                    "filename": "goalIdle_blueBear_0004",
                    "frame": { "x": 1, "y": 698, "w": 171, "h": 228 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 158, "y": 24, "w": 171, "h": 228 },
                    "sourceSize": { "w": 480, "h": 270 },
                    "pivot": { "x": 0.5, "y": 0.5 }
                }, {
                    "filename": "goalIdle_blueBear_0005",
                    "frame": { "x": 174, "y": 1, "w": 171, "h": 228 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 158, "y": 24, "w": 171, "h": 228 },
                    "sourceSize": { "w": 480, "h": 270 },
                    "pivot": { "x": 0.5, "y": 0.5 }
                }, {
                    "filename": "goalIdle_blueBear_0006",
                    "frame": { "x": 347, "y": 1, "w": 172, "h": 227 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 157, "y": 25, "w": 172, "h": 227 },
                    "sourceSize": { "w": 480, "h": 270 },
                    "pivot": { "x": 0.5, "y": 0.5 }
                }, {
                    "filename": "goalIdle_blueBear_0007",
                    "frame": { "x": 515, "y": 230, "w": 171, "h": 227 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 156, "y": 25, "w": 171, "h": 227 },
                    "sourceSize": { "w": 480, "h": 270 },
                    "pivot": { "x": 0.5, "y": 0.5 }
                }, {
                    "filename": "goalIdle_blueBear_0008",
                    "frame": { "x": 521, "y": 1, "w": 172, "h": 227 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 153, "y": 25, "w": 172, "h": 227 },
                    "sourceSize": { "w": 480, "h": 270 },
                    "pivot": { "x": 0.5, "y": 0.5 }
                }, {
                    "filename": "goalIdle_blueBear_0009",
                    "frame": { "x": 695, "y": 1, "w": 172, "h": 227 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 151, "y": 25, "w": 172, "h": 227 },
                    "sourceSize": { "w": 480, "h": 270 },
                    "pivot": { "x": 0.5, "y": 0.5 }
                }, {
                    "filename": "goalIdle_blueBear_0010",
                    "frame": { "x": 688, "y": 230, "w": 170, "h": 226 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 150, "y": 26, "w": 170, "h": 226 },
                    "sourceSize": { "w": 480, "h": 270 },
                    "pivot": { "x": 0.5, "y": 0.5 }
                }, {
                    "filename": "goalIdle_blueBear_0038",
                    "frame": { "x": 860, "y": 230, "w": 162, "h": 224 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 147, "y": 28, "w": 162, "h": 224 },
                    "sourceSize": { "w": 480, "h": 270 },
                    "pivot": { "x": 0.5, "y": 0.5 }
                }, {
                    "filename": "goalIdle_blueBear_0054",
                    "frame": { "x": 859, "y": 458, "w": 164, "h": 226 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 157, "y": 26, "w": 164, "h": 226 },
                    "sourceSize": { "w": 480, "h": 270 },
                    "pivot": { "x": 0.5, "y": 0.5 }
                }, {
                    "filename": "goalIdle_blueBear_0058",
                    "frame": { "x": 859, "y": 686, "w": 164, "h": 226 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 164, "y": 27, "w": 164, "h": 226 },
                    "sourceSize": { "w": 480, "h": 270 },
                    "pivot": { "x": 0.5, "y": 0.5 }
                }, {
                    "filename": "goalIdle_blueBear_0064",
                    "frame": { "x": 685, "y": 687, "w": 169, "h": 225 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 163, "y": 28, "w": 169, "h": 225 },
                    "sourceSize": { "w": 480, "h": 270 },
                    "pivot": { "x": 0.5, "y": 0.5 }
                }, {
                    "filename": "goalIdle_blueBear_0066",
                    "frame": { "x": 345, "y": 695, "w": 168, "h": 228 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 161, "y": 26, "w": 168, "h": 228 },
                    "sourceSize": { "w": 480, "h": 270 },
                    "pivot": { "x": 0.5, "y": 0.5 }
                }, {
                    "filename": "goalIdle_blueBear_0067",
                    "frame": { "x": 346, "y": 231, "w": 167, "h": 228 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 160, "y": 25, "w": 167, "h": 228 },
                    "sourceSize": { "w": 480, "h": 270 },
                    "pivot": { "x": 0.5, "y": 0.5 }
                }, {
                    "filename": "goalIdle_blueBear_0068",
                    "frame": { "x": 515, "y": 687, "w": 168, "h": 227 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 159, "y": 25, "w": 168, "h": 227 },
                    "sourceSize": { "w": 480, "h": 270 },
                    "pivot": { "x": 0.5, "y": 0.5 }
                }, {
                    "filename": "goalIdle_blueBear_0070",
                    "frame": { "x": 515, "y": 459, "w": 169, "h": 226 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 156, "y": 25, "w": 169, "h": 226 },
                    "sourceSize": { "w": 480, "h": 270 },
                    "pivot": { "x": 0.5, "y": 0.5 }
                }, {
                    "filename": "goalIdle_blueBear_0071",
                    "frame": { "x": 688, "y": 458, "w": 169, "h": 227 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 155, "y": 25, "w": 169, "h": 227 },
                    "sourceSize": { "w": 480, "h": 270 },
                    "pivot": { "x": 0.5, "y": 0.5 }
                }, {
                    "filename": "goalIdle_blueBear_0072",
                    "frame": { "x": 173, "y": 465, "w": 169, "h": 228 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 155, "y": 25, "w": 169, "h": 228 },
                    "sourceSize": { "w": 480, "h": 270 },
                    "pivot": { "x": 0.5, "y": 0.5 }
                }, {
                    "filename": "goalIdle_blueBear_0073",
                    "frame": { "x": 174, "y": 695, "w": 169, "h": 228 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 156, "y": 24, "w": 169, "h": 228 },
                    "sourceSize": { "w": 480, "h": 270 },
                    "pivot": { "x": 0.5, "y": 0.5 }
                }, {
                    "filename": "goalIdle_blueBear_0074",
                    "frame": { "x": 344, "y": 465, "w": 169, "h": 228 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 156, "y": 24, "w": 169, "h": 228 },
                    "sourceSize": { "w": 480, "h": 270 },
                    "pivot": { "x": 0.5, "y": 0.5 }
                }],
                "meta": {
                    "app": "http://www.codeandweb.com/texturepacker",
                    "version": "1.0",
                    "image": "WD_blueBear_idle-0.png",
                    "format": "RGBA8888",
                    "size": {
                        "w": 1024, "h": 927
                    },

                    "scale": "0.5",
                    "smartupdate": "$TexturePacker:SmartUpdate:4f6baf32a7a6fd13347f8a6feb1b14c8:00ce79ddc85bce63a76899ec120b3dc1:e37464558dafb4ea80c298444d20932f$"
                }
            });
        }
    };
});

System.register("json/WD_blueBear_idle-1.js", [], function (_export) {
	"use strict";

	return {
		setters: [],
		execute: function () {
			_export("default", { "frames": [{
					"filename": "goalIdle_blueBear_0011",
					"frame": { "x": 1, "y": 1, "w": 168, "h": 226 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 149, "y": 26, "w": 168, "h": 226 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0012",
					"frame": { "x": 676, "y": 455, "w": 167, "h": 224 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 148, "y": 27, "w": 167, "h": 224 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0016",
					"frame": { "x": 1, "y": 685, "w": 167, "h": 221 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 149, "y": 30, "w": 167, "h": 221 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0017",
					"frame": { "x": 680, "y": 227, "w": 168, "h": 222 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 150, "y": 30, "w": 168, "h": 222 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0018",
					"frame": { "x": 171, "y": 1, "w": 169, "h": 223 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 151, "y": 30, "w": 169, "h": 223 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0019",
					"frame": { "x": 342, "y": 1, "w": 168, "h": 223 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 153, "y": 30, "w": 168, "h": 223 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0020",
					"frame": { "x": 512, "y": 1, "w": 168, "h": 223 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 154, "y": 30, "w": 168, "h": 223 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0021",
					"frame": { "x": 847, "y": 681, "w": 166, "h": 223 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 156, "y": 30, "w": 166, "h": 223 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0030",
					"frame": { "x": 852, "y": 1, "w": 164, "h": 225 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 154, "y": 29, "w": 164, "h": 225 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0031",
					"frame": { "x": 171, "y": 454, "w": 166, "h": 226 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 152, "y": 28, "w": 166, "h": 226 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0032",
					"frame": { "x": 507, "y": 454, "w": 167, "h": 225 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 151, "y": 28, "w": 167, "h": 225 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0033",
					"frame": { "x": 171, "y": 226, "w": 167, "h": 226 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 150, "y": 27, "w": 167, "h": 226 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0034",
					"frame": { "x": 511, "y": 681, "w": 167, "h": 225 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 149, "y": 27, "w": 167, "h": 225 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0035",
					"frame": { "x": 845, "y": 455, "w": 166, "h": 224 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 148, "y": 28, "w": 166, "h": 224 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0055",
					"frame": { "x": 339, "y": 454, "w": 166, "h": 226 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 158, "y": 26, "w": 166, "h": 226 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0056",
					"frame": { "x": 508, "y": 226, "w": 166, "h": 225 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 161, "y": 27, "w": 166, "h": 225 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0057",
					"frame": { "x": 850, "y": 228, "w": 166, "h": 225 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 162, "y": 27, "w": 166, "h": 225 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0059",
					"frame": { "x": 680, "y": 681, "w": 165, "h": 225 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 28, "w": 165, "h": 225 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0060",
					"frame": { "x": 340, "y": 226, "w": 166, "h": 226 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 28, "w": 166, "h": 226 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0061",
					"frame": { "x": 171, "y": 682, "w": 168, "h": 224 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 168, "h": 224 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0062",
					"frame": { "x": 341, "y": 682, "w": 168, "h": 224 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 168, "h": 224 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0063",
					"frame": { "x": 682, "y": 1, "w": 168, "h": 224 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 168, "h": 224 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0065",
					"frame": { "x": 1, "y": 229, "w": 168, "h": 226 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 162, "y": 27, "w": 168, "h": 226 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0069",
					"frame": { "x": 1, "y": 457, "w": 168, "h": 226 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 158, "y": 25, "w": 168, "h": 226 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}],
				"meta": {
					"app": "http://www.codeandweb.com/texturepacker",
					"version": "1.0",
					"image": "WD_blueBear_idle-1.png",
					"format": "RGBA8888",
					"size": { "w": 1017, "h": 907 },
					"scale": "0.5",
					"smartupdate": "$TexturePacker:SmartUpdate:4f6baf32a7a6fd13347f8a6feb1b14c8:00ce79ddc85bce63a76899ec120b3dc1:e37464558dafb4ea80c298444d20932f$"
				}
			});
		}
	};
});

System.register("json/WD_blueBear_idle-2.js", [], function (_export) {
	"use strict";

	return {
		setters: [],
		execute: function () {
			_export("default", { "frames": [{
					"filename": "goalIdle_blueBear_0013",
					"frame": { "x": 167, "y": 229, "w": 165, "h": 223 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 148, "y": 28, "w": 165, "h": 223 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0014",
					"frame": { "x": 167, "y": 679, "w": 165, "h": 222 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 148, "y": 29, "w": 165, "h": 222 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0015",
					"frame": { "x": 1, "y": 1, "w": 166, "h": 222 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 148, "y": 29, "w": 166, "h": 222 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0022",
					"frame": { "x": 167, "y": 454, "w": 165, "h": 223 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 157, "y": 30, "w": 165, "h": 223 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0023",
					"frame": { "x": 831, "y": 226, "w": 163, "h": 222 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 159, "y": 30, "w": 163, "h": 222 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0024",
					"frame": { "x": 832, "y": 674, "w": 163, "h": 221 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 159, "y": 31, "w": 163, "h": 221 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0026",
					"frame": { "x": 831, "y": 450, "w": 163, "h": 222 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 158, "y": 31, "w": 163, "h": 222 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0027",
					"frame": { "x": 666, "y": 452, "w": 163, "h": 223 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 157, "y": 30, "w": 163, "h": 223 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0028",
					"frame": { "x": 500, "y": 678, "w": 163, "h": 223 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 156, "y": 30, "w": 163, "h": 223 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0029",
					"frame": { "x": 1, "y": 225, "w": 164, "h": 224 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 155, "y": 29, "w": 164, "h": 224 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0036",
					"frame": { "x": 1, "y": 451, "w": 164, "h": 224 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 148, "y": 28, "w": 164, "h": 224 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0037",
					"frame": { "x": 500, "y": 1, "w": 163, "h": 224 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 147, "y": 28, "w": 163, "h": 224 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0041",
					"frame": { "x": 665, "y": 1, "w": 161, "h": 224 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 147, "y": 28, "w": 161, "h": 224 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0043",
					"frame": { "x": 500, "y": 227, "w": 163, "h": 224 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 147, "y": 28, "w": 163, "h": 224 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0044",
					"frame": { "x": 500, "y": 453, "w": 164, "h": 223 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 148, "y": 28, "w": 164, "h": 223 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0045",
					"frame": { "x": 665, "y": 227, "w": 164, "h": 223 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 149, "y": 28, "w": 164, "h": 223 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0046",
					"frame": { "x": 828, "y": 1, "w": 164, "h": 223 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 149, "y": 28, "w": 164, "h": 223 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0047",
					"frame": { "x": 1, "y": 677, "w": 164, "h": 224 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 150, "y": 27, "w": 164, "h": 224 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0048",
					"frame": { "x": 334, "y": 1, "w": 164, "h": 224 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 151, "y": 27, "w": 164, "h": 224 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0049",
					"frame": { "x": 334, "y": 227, "w": 164, "h": 224 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 152, "y": 27, "w": 164, "h": 224 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0050",
					"frame": { "x": 334, "y": 679, "w": 164, "h": 222 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 153, "y": 28, "w": 164, "h": 222 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0051",
					"frame": { "x": 666, "y": 677, "w": 164, "h": 222 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 153, "y": 28, "w": 164, "h": 222 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0052",
					"frame": { "x": 334, "y": 453, "w": 164, "h": 224 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 154, "y": 27, "w": 164, "h": 224 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0053",
					"frame": { "x": 169, "y": 1, "w": 163, "h": 226 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 155, "y": 26, "w": 163, "h": 226 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}],
				"meta": {
					"app": "http://www.codeandweb.com/texturepacker",
					"version": "1.0",
					"image": "WD_blueBear_idle-2.png",
					"format": "RGBA8888",
					"size": { "w": 996, "h": 902 },
					"scale": "0.5",
					"smartupdate": "$TexturePacker:SmartUpdate:4f6baf32a7a6fd13347f8a6feb1b14c8:00ce79ddc85bce63a76899ec120b3dc1:e37464558dafb4ea80c298444d20932f$"
				}
			});
		}
	};
});

System.register("json/WD_blueBear_idle-3.js", [], function (_export) {
	"use strict";

	return {
		setters: [],
		execute: function () {
			_export("default", { "frames": [{
					"filename": "goalIdle_blueBear_0025",
					"frame": { "x": 1, "y": 1, "w": 163, "h": 221 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 159, "y": 31, "w": 163, "h": 221 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0039",
					"frame": { "x": 166, "y": 1, "w": 161, "h": 225 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 147, "y": 28, "w": 161, "h": 225 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0040",
					"frame": { "x": 1, "y": 224, "w": 161, "h": 225 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 147, "y": 28, "w": 161, "h": 225 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "goalIdle_blueBear_0042",
					"frame": { "x": 164, "y": 228, "w": 161, "h": 223 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 147, "y": 28, "w": 161, "h": 223 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}],
				"meta": {
					"app": "http://www.codeandweb.com/texturepacker",
					"version": "1.0",
					"image": "WD_blueBear_idle-3.png",
					"format": "RGBA8888",
					"size": { "w": 328, "h": 452 },
					"scale": "0.5",
					"smartupdate": "$TexturePacker:SmartUpdate:4f6baf32a7a6fd13347f8a6feb1b14c8:00ce79ddc85bce63a76899ec120b3dc1:e37464558dafb4ea80c298444d20932f$"
				}
			});
		}
	};
});

System.register("json/WD_tiger_idle-0.js", [], function (_export) {
	"use strict";

	return {
		setters: [],
		execute: function () {
			_export("default", { "frames": [{
					"filename": "NPG_Tiger_idle_0003.tif",
					"frame": { "x": 857, "y": 704, "w": 117, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 20, "w": 117, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0004.tif",
					"frame": { "x": 617, "y": 704, "w": 118, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 183, "y": 20, "w": 118, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0005.tif",
					"frame": { "x": 737, "y": 703, "w": 118, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 183, "y": 20, "w": 118, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0024.tif",
					"frame": { "x": 753, "y": 1, "w": 123, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 176, "y": 21, "w": 123, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0027.tif",
					"frame": { "x": 251, "y": 704, "w": 121, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 178, "y": 19, "w": 121, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0028.tif",
					"frame": { "x": 251, "y": 469, "w": 121, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 179, "y": 18, "w": 121, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0029.tif",
					"frame": { "x": 374, "y": 469, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 180, "y": 18, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0030.tif",
					"frame": { "x": 374, "y": 704, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 181, "y": 18, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0031.tif",
					"frame": { "x": 499, "y": 234, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 181, "y": 18, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0032.tif",
					"frame": { "x": 496, "y": 469, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 182, "y": 18, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0033.tif",
					"frame": { "x": 621, "y": 234, "w": 119, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 183, "y": 18, "w": 119, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0034.tif",
					"frame": { "x": 496, "y": 704, "w": 119, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 18, "w": 119, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0035.tif",
					"frame": { "x": 742, "y": 234, "w": 118, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 18, "w": 118, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0036.tif",
					"frame": { "x": 862, "y": 233, "w": 116, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 187, "y": 18, "w": 116, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0037.tif",
					"frame": { "x": 861, "y": 469, "w": 117, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 187, "y": 18, "w": 117, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0038.tif",
					"frame": { "x": 740, "y": 469, "w": 119, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 187, "y": 19, "w": 119, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0039.tif",
					"frame": { "x": 618, "y": 469, "w": 120, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 186, "y": 19, "w": 120, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0051.tif",
					"frame": { "x": 378, "y": 1, "w": 123, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 20, "w": 123, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0052.tif",
					"frame": { "x": 126, "y": 703, "w": 123, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 20, "w": 123, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0053.tif",
					"frame": { "x": 503, "y": 1, "w": 123, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 20, "w": 123, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0054.tif",
					"frame": { "x": 628, "y": 1, "w": 123, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 20, "w": 123, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0055.tif",
					"frame": { "x": 1, "y": 1, "w": 124, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 19, "w": 124, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0056.tif",
					"frame": { "x": 1, "y": 235, "w": 124, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 19, "w": 124, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0057.tif",
					"frame": { "x": 127, "y": 1, "w": 124, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 19, "w": 124, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0058.tif",
					"frame": { "x": 1, "y": 469, "w": 124, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 19, "w": 124, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0059.tif",
					"frame": { "x": 127, "y": 235, "w": 123, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 19, "w": 123, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0060.tif",
					"frame": { "x": 253, "y": 1, "w": 123, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 19, "w": 123, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0061.tif",
					"frame": { "x": 1, "y": 703, "w": 123, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 19, "w": 123, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0062.tif",
					"frame": { "x": 127, "y": 469, "w": 122, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 19, "w": 122, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0063.tif",
					"frame": { "x": 252, "y": 235, "w": 122, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 19, "w": 122, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0064.tif",
					"frame": { "x": 376, "y": 235, "w": 121, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 19, "w": 121, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}],
				"meta": {
					"app": "http://www.codeandweb.com/texturepacker",
					"version": "1.0",
					"image": "WD_tiger_idle-0.png",
					"format": "RGBA8888",
					"size": { "w": 979, "h": 938 },
					"scale": "0.5",
					"smartupdate": "$TexturePacker:SmartUpdate:8dbe240da9c7259f84d72f7851b837e9:f9fdcde694ae532731f85d50522035ba:8dbaf283dadf7682b4c4e8a7492417d1$"
				}
			});
		}
	};
});

System.register("json/WD_tiger_idle-1.js", [], function (_export) {
	"use strict";

	return {
		setters: [],
		execute: function () {
			_export("default", { "frames": [{
					"filename": "NPG_tiger_idle2_0081.tif",
					"frame": { "x": 611, "y": 234, "w": 118, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 20, "w": 118, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_tiger_idle2_0082.tif",
					"frame": { "x": 850, "y": 1, "w": 117, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 20, "w": 117, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_tiger_idle2_0084.tif",
					"frame": { "x": 850, "y": 234, "w": 116, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 116, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0000.tif",
					"frame": { "x": 612, "y": 1, "w": 117, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 20, "w": 117, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0001.tif",
					"frame": { "x": 611, "y": 467, "w": 117, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 20, "w": 117, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0006.tif",
					"frame": { "x": 371, "y": 234, "w": 118, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 183, "y": 20, "w": 118, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0007.tif",
					"frame": { "x": 372, "y": 1, "w": 118, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 183, "y": 20, "w": 118, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0014.tif",
					"frame": { "x": 611, "y": 700, "w": 117, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 21, "w": 117, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0015.tif",
					"frame": { "x": 730, "y": 467, "w": 117, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 21, "w": 117, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0025.tif",
					"frame": { "x": 1, "y": 1, "w": 123, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 176, "y": 21, "w": 123, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0026.tif",
					"frame": { "x": 126, "y": 1, "w": 122, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 177, "y": 20, "w": 122, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0040.tif",
					"frame": { "x": 126, "y": 234, "w": 121, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 186, "y": 20, "w": 121, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0041.tif",
					"frame": { "x": 126, "y": 467, "w": 121, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 186, "y": 20, "w": 121, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0043.tif",
					"frame": { "x": 1, "y": 233, "w": 123, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 21, "w": 123, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0044.tif",
					"frame": { "x": 1, "y": 465, "w": 123, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 21, "w": 123, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0045.tif",
					"frame": { "x": 1, "y": 697, "w": 123, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 21, "w": 123, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0065.tif",
					"frame": { "x": 126, "y": 700, "w": 121, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 121, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0066.tif",
					"frame": { "x": 249, "y": 234, "w": 120, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 120, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0067.tif",
					"frame": { "x": 250, "y": 1, "w": 120, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 120, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0068.tif",
					"frame": { "x": 249, "y": 700, "w": 119, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 119, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0069.tif",
					"frame": { "x": 249, "y": 467, "w": 120, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 20, "w": 120, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0070.tif",
					"frame": { "x": 370, "y": 700, "w": 119, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 119, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0071.tif",
					"frame": { "x": 491, "y": 234, "w": 118, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 118, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0072.tif",
					"frame": { "x": 492, "y": 1, "w": 118, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 118, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0073.tif",
					"frame": { "x": 491, "y": 467, "w": 118, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 118, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0075.tif",
					"frame": { "x": 730, "y": 700, "w": 117, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 117, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0076.tif",
					"frame": { "x": 731, "y": 1, "w": 117, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 117, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0077.tif",
					"frame": { "x": 731, "y": 234, "w": 117, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 117, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0078.tif",
					"frame": { "x": 849, "y": 467, "w": 117, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 117, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0079.tif",
					"frame": { "x": 849, "y": 700, "w": 117, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 117, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0080.tif",
					"frame": { "x": 491, "y": 700, "w": 118, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 20, "w": 118, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}],
				"meta": {
					"app": "http://www.codeandweb.com/texturepacker",
					"version": "1.0",
					"image": "WD_tiger_idle-1.png",
					"format": "RGBA8888",
					"size": { "w": 968, "h": 932 },
					"scale": "0.5",
					"smartupdate": "$TexturePacker:SmartUpdate:8dbe240da9c7259f84d72f7851b837e9:f9fdcde694ae532731f85d50522035ba:8dbaf283dadf7682b4c4e8a7492417d1$"
				}
			});
		}
	};
});

System.register("json/WD_tiger_idle-2.js", [], function (_export) {
	"use strict";

	return {
		setters: [],
		execute: function () {
			_export("default", { "frames": [{
					"filename": "NPG_tiger_idle2_0083.tif",
					"frame": { "x": 249, "y": 233, "w": 117, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 20, "w": 117, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0002.tif",
					"frame": { "x": 368, "y": 233, "w": 117, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 21, "w": 117, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0008.tif",
					"frame": { "x": 248, "y": 697, "w": 118, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 183, "y": 21, "w": 118, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0009.tif",
					"frame": { "x": 368, "y": 697, "w": 118, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 183, "y": 21, "w": 118, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0010.tif",
					"frame": { "x": 607, "y": 697, "w": 118, "h": 229 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 183, "y": 22, "w": 118, "h": 229 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0011.tif",
					"frame": { "x": 496, "y": 1, "w": 118, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 183, "y": 22, "w": 118, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0012.tif",
					"frame": { "x": 370, "y": 465, "w": 117, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 22, "w": 117, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0013.tif",
					"frame": { "x": 488, "y": 697, "w": 117, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 22, "w": 117, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0016.tif",
					"frame": { "x": 487, "y": 233, "w": 117, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 22, "w": 117, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0017.tif",
					"frame": { "x": 608, "y": 464, "w": 117, "h": 229 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 183, "y": 22, "w": 117, "h": 229 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0018.tif",
					"frame": { "x": 606, "y": 233, "w": 118, "h": 229 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 182, "y": 22, "w": 118, "h": 229 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0019.tif",
					"frame": { "x": 249, "y": 466, "w": 119, "h": 229 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 181, "y": 22, "w": 119, "h": 229 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0020.tif",
					"frame": { "x": 374, "y": 1, "w": 120, "h": 229 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 180, "y": 22, "w": 120, "h": 229 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0021.tif",
					"frame": { "x": 125, "y": 697, "w": 121, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 179, "y": 21, "w": 121, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0022.tif",
					"frame": { "x": 1, "y": 233, "w": 122, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 178, "y": 21, "w": 122, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0023.tif",
					"frame": { "x": 126, "y": 1, "w": 122, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 177, "y": 21, "w": 122, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0042.tif",
					"frame": { "x": 1, "y": 465, "w": 122, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 21, "w": 122, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0046.tif",
					"frame": { "x": 1, "y": 697, "w": 122, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 21, "w": 122, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0047.tif",
					"frame": { "x": 125, "y": 233, "w": 122, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 21, "w": 122, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0048.tif",
					"frame": { "x": 250, "y": 1, "w": 122, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 21, "w": 122, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0049.tif",
					"frame": { "x": 125, "y": 465, "w": 122, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 21, "w": 122, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0050.tif",
					"frame": { "x": 1, "y": 1, "w": 123, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 21, "w": 123, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Tiger_idle_0074.tif",
					"frame": { "x": 489, "y": 465, "w": 117, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 21, "w": 117, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}],
				"meta": {
					"app": "http://www.codeandweb.com/texturepacker",
					"version": "1.0",
					"image": "WD_tiger_idle-2.png",
					"format": "RGBA8888",
					"size": { "w": 726, "h": 928 },
					"scale": "0.5",
					"smartupdate": "$TexturePacker:SmartUpdate:8dbe240da9c7259f84d72f7851b837e9:f9fdcde694ae532731f85d50522035ba:8dbaf283dadf7682b4c4e8a7492417d1$"
				}
			});
		}
	};
});

System.register("json/panda_idle-0.js", [], function (_export) {
	"use strict";

	return {
		setters: [],
		execute: function () {
			_export("default", { "frames": [{
					"filename": "NPG_Panda_idle_0005.tif",
					"frame": { "x": 124, "y": 1, "w": 121, "h": 237 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 169, "y": 25, "w": 121, "h": 237 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0006.tif",
					"frame": { "x": 1, "y": 475, "w": 121, "h": 237 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 169, "y": 25, "w": 121, "h": 237 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0011.tif",
					"frame": { "x": 1, "y": 713, "w": 122, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 26, "w": 122, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0018.tif",
					"frame": { "x": 613, "y": 1, "w": 120, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 28, "w": 120, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0019.tif",
					"frame": { "x": 735, "y": 235, "w": 119, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 28, "w": 119, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0020.tif",
					"frame": { "x": 855, "y": 235, "w": 119, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 119, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0021.tif",
					"frame": { "x": 853, "y": 703, "w": 119, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 119, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0022.tif",
					"frame": { "x": 734, "y": 1, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 29, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0023.tif",
					"frame": { "x": 611, "y": 707, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 29, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0024.tif",
					"frame": { "x": 855, "y": 1, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 29, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0025.tif",
					"frame": { "x": 732, "y": 471, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 29, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0026.tif",
					"frame": { "x": 732, "y": 705, "w": 119, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 119, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0027.tif",
					"frame": { "x": 853, "y": 470, "w": 120, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 120, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0031.tif",
					"frame": { "x": 491, "y": 1, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 28, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0033.tif",
					"frame": { "x": 492, "y": 236, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 28, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0034.tif",
					"frame": { "x": 246, "y": 475, "w": 122, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 28, "w": 122, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0035.tif",
					"frame": { "x": 248, "y": 238, "w": 122, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 28, "w": 122, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0036.tif",
					"frame": { "x": 368, "y": 1, "w": 122, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 28, "w": 122, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0037.tif",
					"frame": { "x": 123, "y": 475, "w": 122, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 28, "w": 122, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0038.tif",
					"frame": { "x": 246, "y": 710, "w": 121, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 28, "w": 121, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0039.tif",
					"frame": { "x": 490, "y": 710, "w": 120, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 28, "w": 120, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0040.tif",
					"frame": { "x": 611, "y": 471, "w": 120, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 28, "w": 120, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0041.tif",
					"frame": { "x": 614, "y": 236, "w": 120, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 120, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0061.tif",
					"frame": { "x": 1, "y": 239, "w": 123, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 168, "y": 28, "w": 123, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0067.tif",
					"frame": { "x": 125, "y": 239, "w": 122, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 168, "y": 28, "w": 122, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0068.tif",
					"frame": { "x": 368, "y": 710, "w": 121, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 167, "y": 28, "w": 121, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0093.tif",
					"frame": { "x": 1, "y": 1, "w": 122, "h": 237 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 26, "w": 122, "h": 237 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0095.tif",
					"frame": { "x": 246, "y": 1, "w": 121, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 27, "w": 121, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0096.tif",
					"frame": { "x": 124, "y": 711, "w": 121, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 27, "w": 121, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0101.tif",
					"frame": { "x": 369, "y": 473, "w": 120, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 27, "w": 120, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0102.tif",
					"frame": { "x": 371, "y": 236, "w": 120, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 27, "w": 120, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0103.tif",
					"frame": { "x": 490, "y": 473, "w": 120, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 27, "w": 120, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}],
				"meta": {
					"app": "http://www.codeandweb.com/texturepacker",
					"version": "1.0",
					"image": "panda_idle-0.png",
					"format": "RGBA8888",
					"size": { "w": 976, "h": 976 },
					"scale": "0.5",
					"smartupdate": "$TexturePacker:SmartUpdate:766dee1abaa390e871c05af8eb47bf04:0e11d3a4ddbea0a77e2178369eb5ae9c:22e5236db7c4d6275b65e8944391d628$"
				}
			});
		}
	};
});

System.register("json/panda_idle-1.js", [], function (_export) {
	"use strict";

	return {
		setters: [],
		execute: function () {
			_export("default", { "frames": [{
					"filename": "NPG_Panda_idle_0028.tif",
					"frame": { "x": 732, "y": 472, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 28, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0029.tif",
					"frame": { "x": 732, "y": 706, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 28, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0030.tif",
					"frame": { "x": 245, "y": 706, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 28, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0032.tif",
					"frame": { "x": 245, "y": 472, "w": 121, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 28, "w": 121, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0042.tif",
					"frame": { "x": 366, "y": 706, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0043.tif",
					"frame": { "x": 367, "y": 472, "w": 121, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 121, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0044.tif",
					"frame": { "x": 489, "y": 472, "w": 121, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 121, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0045.tif",
					"frame": { "x": 247, "y": 237, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0046.tif",
					"frame": { "x": 1, "y": 472, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0047.tif",
					"frame": { "x": 369, "y": 237, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0048.tif",
					"frame": { "x": 1, "y": 237, "w": 122, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 29, "w": 122, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0049.tif",
					"frame": { "x": 124, "y": 237, "w": 122, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 30, "w": 122, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0054.tif",
					"frame": { "x": 735, "y": 237, "w": 120, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 120, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0055.tif",
					"frame": { "x": 491, "y": 237, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 29, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0056.tif",
					"frame": { "x": 611, "y": 472, "w": 120, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 167, "y": 29, "w": 120, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0058.tif",
					"frame": { "x": 613, "y": 237, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 167, "y": 28, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0069.tif",
					"frame": { "x": 616, "y": 1, "w": 121, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 28, "w": 121, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0071.tif",
					"frame": { "x": 124, "y": 471, "w": 120, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 28, "w": 120, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0087.tif",
					"frame": { "x": 1, "y": 1, "w": 122, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 27, "w": 122, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0088.tif",
					"frame": { "x": 124, "y": 1, "w": 122, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 27, "w": 122, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0089.tif",
					"frame": { "x": 247, "y": 1, "w": 122, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 27, "w": 122, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0090.tif",
					"frame": { "x": 370, "y": 1, "w": 122, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 27, "w": 122, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0091.tif",
					"frame": { "x": 493, "y": 1, "w": 122, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 27, "w": 122, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0098.tif",
					"frame": { "x": 738, "y": 1, "w": 121, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 28, "w": 121, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}],
				"meta": {
					"app": "http://www.codeandweb.com/texturepacker",
					"version": "1.0",
					"image": "panda_idle-1.png",
					"format": "RGBA8888",
					"size": { "w": 940, "h": 940 },
					"scale": "0.5",
					"smartupdate": "$TexturePacker:SmartUpdate:766dee1abaa390e871c05af8eb47bf04:0e11d3a4ddbea0a77e2178369eb5ae9c:22e5236db7c4d6275b65e8944391d628$"
				}
			});
		}
	};
});

System.register("json/panda_idle-2.js", [], function (_export) {
	"use strict";

	return {
		setters: [],
		execute: function () {
			_export("default", { "frames": [{
					"filename": "NPG_Panda_idle_0001.tif",
					"frame": { "x": 124, "y": 1, "w": 118, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 168, "y": 27, "w": 118, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0002.tif",
					"frame": { "x": 123, "y": 475, "w": 118, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 168, "y": 27, "w": 118, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0004.tif",
					"frame": { "x": 123, "y": 238, "w": 119, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 169, "y": 26, "w": 119, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0007.tif",
					"frame": { "x": 1, "y": 238, "w": 121, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 169, "y": 25, "w": 121, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0008.tif",
					"frame": { "x": 1, "y": 1, "w": 122, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 168, "y": 25, "w": 122, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0009.tif",
					"frame": { "x": 1, "y": 475, "w": 121, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 168, "y": 25, "w": 121, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0050.tif",
					"frame": { "x": 364, "y": 707, "w": 122, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 30, "w": 122, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0051.tif",
					"frame": { "x": 609, "y": 1, "w": 121, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 30, "w": 121, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0052.tif",
					"frame": { "x": 731, "y": 1, "w": 121, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 30, "w": 121, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0053.tif",
					"frame": { "x": 731, "y": 235, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 30, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0057.tif",
					"frame": { "x": 609, "y": 235, "w": 121, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 167, "y": 29, "w": 121, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0059.tif",
					"frame": { "x": 243, "y": 237, "w": 122, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 167, "y": 28, "w": 122, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0060.tif",
					"frame": { "x": 364, "y": 1, "w": 122, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 168, "y": 28, "w": 122, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0070.tif",
					"frame": { "x": 364, "y": 472, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 29, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0072.tif",
					"frame": { "x": 366, "y": 236, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0073.tif",
					"frame": { "x": 486, "y": 471, "w": 120, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 120, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0074.tif",
					"frame": { "x": 487, "y": 1, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 29, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0075.tif",
					"frame": { "x": 488, "y": 236, "w": 120, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 29, "w": 120, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0076.tif",
					"frame": { "x": 728, "y": 703, "w": 119, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 30, "w": 119, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0077.tif",
					"frame": { "x": 609, "y": 469, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 163, "y": 30, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0078.tif",
					"frame": { "x": 607, "y": 703, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 163, "y": 30, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0080.tif",
					"frame": { "x": 487, "y": 706, "w": 119, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 29, "w": 119, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0099.tif",
					"frame": { "x": 242, "y": 475, "w": 121, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 28, "w": 121, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0100.tif",
					"frame": { "x": 243, "y": 1, "w": 120, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 28, "w": 120, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}],
				"meta": {
					"app": "http://www.codeandweb.com/texturepacker",
					"version": "1.0",
					"image": "panda_idle-2.png",
					"format": "RGBA8888",
					"size": { "w": 941, "h": 941 },
					"scale": "0.5",
					"smartupdate": "$TexturePacker:SmartUpdate:766dee1abaa390e871c05af8eb47bf04:0e11d3a4ddbea0a77e2178369eb5ae9c:22e5236db7c4d6275b65e8944391d628$"
				}
			});
		}
	};
});

System.register("json/panda_idle-3.js", [], function (_export) {
	"use strict";

	return {
		setters: [],
		execute: function () {
			_export("default", { "frames": [{
					"filename": "NPG_Panda_idle_0000.tif",
					"frame": { "x": 615, "y": 471, "w": 119, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 167, "y": 27, "w": 119, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0003.tif",
					"frame": { "x": 735, "y": 471, "w": 118, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 169, "y": 27, "w": 118, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0010.tif",
					"frame": { "x": 248, "y": 238, "w": 122, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 167, "y": 26, "w": 122, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0012.tif",
					"frame": { "x": 371, "y": 473, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 27, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0013.tif",
					"frame": { "x": 492, "y": 236, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 27, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0014.tif",
					"frame": { "x": 494, "y": 1, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 27, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0015.tif",
					"frame": { "x": 493, "y": 471, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 27, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0016.tif",
					"frame": { "x": 614, "y": 236, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 27, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0017.tif",
					"frame": { "x": 738, "y": 1, "w": 119, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 28, "w": 119, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0062.tif",
					"frame": { "x": 1, "y": 1, "w": 123, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 168, "y": 27, "w": 123, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0063.tif",
					"frame": { "x": 1, "y": 238, "w": 123, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 169, "y": 27, "w": 123, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0064.tif",
					"frame": { "x": 1, "y": 475, "w": 123, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 169, "y": 27, "w": 123, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0065.tif",
					"frame": { "x": 125, "y": 238, "w": 122, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 169, "y": 27, "w": 122, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0066.tif",
					"frame": { "x": 125, "y": 1, "w": 123, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 168, "y": 27, "w": 123, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0079.tif",
					"frame": { "x": 615, "y": 707, "w": 119, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 30, "w": 119, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0081.tif",
					"frame": { "x": 735, "y": 707, "w": 119, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 119, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0082.tif",
					"frame": { "x": 736, "y": 236, "w": 120, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 28, "w": 120, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0083.tif",
					"frame": { "x": 616, "y": 1, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 28, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0084.tif",
					"frame": { "x": 248, "y": 474, "w": 122, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 28, "w": 122, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0085.tif",
					"frame": { "x": 493, "y": 706, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 27, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0086.tif",
					"frame": { "x": 371, "y": 1, "w": 122, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 27, "w": 122, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0092.tif",
					"frame": { "x": 125, "y": 475, "w": 122, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 27, "w": 122, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0094.tif",
					"frame": { "x": 249, "y": 1, "w": 121, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 27, "w": 121, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Panda_idle_0097.tif",
					"frame": { "x": 371, "y": 236, "w": 120, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 27, "w": 120, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}],
				"meta": {
					"app": "http://www.codeandweb.com/texturepacker",
					"version": "1.0",
					"image": "panda_idle-3.png",
					"format": "RGBA8888",
					"size": { "w": 941, "h": 941 },
					"scale": "0.5",
					"smartupdate": "$TexturePacker:SmartUpdate:766dee1abaa390e871c05af8eb47bf04:0e11d3a4ddbea0a77e2178369eb5ae9c:22e5236db7c4d6275b65e8944391d628$"
				}
			});
		}
	};
});

System.register("json/nPG_redRainbowBear_idle01-0.js", [], function (_export) {
	"use strict";

	return {
		setters: [],
		execute: function () {
			_export("default", { "frames": [{
					"filename": "NPG_redBear_idle2_0024.tif",
					"frame": { "x": 628, "y": 1, "w": 123, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 176, "y": 21, "w": 123, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0025.tif",
					"frame": { "x": 753, "y": 1, "w": 123, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 176, "y": 21, "w": 123, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0026.tif",
					"frame": { "x": 377, "y": 470, "w": 122, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 177, "y": 20, "w": 122, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0027.tif",
					"frame": { "x": 499, "y": 703, "w": 121, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 178, "y": 19, "w": 121, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0028.tif",
					"frame": { "x": 127, "y": 235, "w": 121, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 179, "y": 18, "w": 121, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0029.tif",
					"frame": { "x": 250, "y": 235, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 180, "y": 18, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0030.tif",
					"frame": { "x": 372, "y": 235, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 181, "y": 18, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0031.tif",
					"frame": { "x": 494, "y": 234, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 181, "y": 18, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0032.tif",
					"frame": { "x": 616, "y": 234, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 182, "y": 18, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0033.tif",
					"frame": { "x": 626, "y": 469, "w": 119, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 183, "y": 18, "w": 119, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0034.tif",
					"frame": { "x": 747, "y": 465, "w": 119, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 18, "w": 119, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0035.tif",
					"frame": { "x": 747, "y": 700, "w": 118, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 18, "w": 118, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0036.tif",
					"frame": { "x": 867, "y": 700, "w": 116, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 187, "y": 18, "w": 116, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0037.tif",
					"frame": { "x": 868, "y": 465, "w": 117, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 187, "y": 18, "w": 117, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0043.tif",
					"frame": { "x": 501, "y": 469, "w": 123, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 21, "w": 123, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0044.tif",
					"frame": { "x": 738, "y": 233, "w": 123, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 21, "w": 123, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0045.tif",
					"frame": { "x": 622, "y": 704, "w": 123, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 21, "w": 123, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0050.tif",
					"frame": { "x": 863, "y": 233, "w": 123, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 21, "w": 123, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0051.tif",
					"frame": { "x": 127, "y": 470, "w": 123, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 20, "w": 123, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0052.tif",
					"frame": { "x": 252, "y": 470, "w": 123, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 20, "w": 123, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0053.tif",
					"frame": { "x": 378, "y": 1, "w": 123, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 20, "w": 123, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0054.tif",
					"frame": { "x": 503, "y": 1, "w": 123, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 20, "w": 123, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0055.tif",
					"frame": { "x": 1, "y": 1, "w": 124, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 19, "w": 124, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0056.tif",
					"frame": { "x": 1, "y": 235, "w": 124, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 19, "w": 124, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0057.tif",
					"frame": { "x": 127, "y": 1, "w": 124, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 19, "w": 124, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0058.tif",
					"frame": { "x": 1, "y": 469, "w": 124, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 19, "w": 124, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0059.tif",
					"frame": { "x": 1, "y": 703, "w": 123, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 19, "w": 123, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0060.tif",
					"frame": { "x": 126, "y": 703, "w": 123, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 19, "w": 123, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0061.tif",
					"frame": { "x": 253, "y": 1, "w": 123, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 19, "w": 123, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0062.tif",
					"frame": { "x": 251, "y": 703, "w": 122, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 19, "w": 122, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0063.tif",
					"frame": { "x": 375, "y": 703, "w": 122, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 19, "w": 122, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}],
				"meta": {
					"app": "http://www.codeandweb.com/texturepacker",
					"version": "1.0",
					"image": "nPG_redRainbowBear_idle01-0.png",
					"format": "RGBA8888",
					"size": { "w": 987, "h": 936 },
					"scale": "0.5",
					"smartupdate": "$TexturePacker:SmartUpdate:aa1472c793943dcd64cf6a642ac58e09:96482cfe6f0af399f4dbd3fceeb7cc29:660564851ca7e7736a2c0ba84df525a1$"
				}
			});
		}
	};
});

System.register("json/nPG_redRainbowBear_idle01-1.js", [], function (_export) {
	"use strict";

	return {
		setters: [],
		execute: function () {
			_export("default", { "frames": [{
					"filename": "NPG_redBear_idle2_0000.tif",
					"frame": { "x": 856, "y": 1, "w": 117, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 20, "w": 117, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0003.tif",
					"frame": { "x": 855, "y": 468, "w": 117, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 20, "w": 117, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0004.tif",
					"frame": { "x": 615, "y": 700, "w": 118, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 183, "y": 20, "w": 118, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0005.tif",
					"frame": { "x": 735, "y": 234, "w": 118, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 183, "y": 20, "w": 118, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0006.tif",
					"frame": { "x": 855, "y": 234, "w": 118, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 183, "y": 20, "w": 118, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0007.tif",
					"frame": { "x": 615, "y": 234, "w": 118, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 183, "y": 20, "w": 118, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0008.tif",
					"frame": { "x": 855, "y": 702, "w": 118, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 183, "y": 21, "w": 118, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0019.tif",
					"frame": { "x": 372, "y": 234, "w": 119, "h": 229 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 181, "y": 22, "w": 119, "h": 229 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0020.tif",
					"frame": { "x": 249, "y": 466, "w": 120, "h": 229 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 180, "y": 22, "w": 120, "h": 229 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0021.tif",
					"frame": { "x": 371, "y": 700, "w": 121, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 179, "y": 21, "w": 121, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0022.tif",
					"frame": { "x": 1, "y": 235, "w": 122, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 178, "y": 21, "w": 122, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0023.tif",
					"frame": { "x": 124, "y": 1, "w": 122, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 177, "y": 21, "w": 122, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0038.tif",
					"frame": { "x": 494, "y": 700, "w": 119, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 187, "y": 19, "w": 119, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0039.tif",
					"frame": { "x": 371, "y": 466, "w": 120, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 186, "y": 19, "w": 120, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0040.tif",
					"frame": { "x": 125, "y": 697, "w": 121, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 186, "y": 20, "w": 121, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0041.tif",
					"frame": { "x": 248, "y": 697, "w": 121, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 186, "y": 20, "w": 121, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0042.tif",
					"frame": { "x": 1, "y": 467, "w": 122, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 21, "w": 122, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0046.tif",
					"frame": { "x": 1, "y": 699, "w": 122, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 21, "w": 122, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0047.tif",
					"frame": { "x": 125, "y": 233, "w": 122, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 21, "w": 122, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0048.tif",
					"frame": { "x": 248, "y": 1, "w": 122, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 21, "w": 122, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0049.tif",
					"frame": { "x": 125, "y": 465, "w": 122, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 21, "w": 122, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0064.tif",
					"frame": { "x": 1, "y": 1, "w": 121, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 19, "w": 121, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0065.tif",
					"frame": { "x": 249, "y": 233, "w": 121, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 121, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0066.tif",
					"frame": { "x": 372, "y": 1, "w": 120, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 120, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0067.tif",
					"frame": { "x": 493, "y": 234, "w": 120, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 120, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0068.tif",
					"frame": { "x": 493, "y": 467, "w": 119, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 119, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0069.tif",
					"frame": { "x": 494, "y": 1, "w": 120, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 20, "w": 120, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0070.tif",
					"frame": { "x": 614, "y": 467, "w": 119, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 119, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0071.tif",
					"frame": { "x": 616, "y": 1, "w": 118, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 118, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0072.tif",
					"frame": { "x": 736, "y": 1, "w": 118, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 118, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0073.tif",
					"frame": { "x": 735, "y": 468, "w": 118, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 118, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0080.tif",
					"frame": { "x": 735, "y": 701, "w": 118, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 20, "w": 118, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}],
				"meta": {
					"app": "http://www.codeandweb.com/texturepacker",
					"version": "1.0",
					"image": "nPG_redRainbowBear_idle01-1.png",
					"format": "RGBA8888",
					"size": { "w": 974, "h": 933 },
					"scale": "0.5",
					"smartupdate": "$TexturePacker:SmartUpdate:aa1472c793943dcd64cf6a642ac58e09:96482cfe6f0af399f4dbd3fceeb7cc29:660564851ca7e7736a2c0ba84df525a1$"
				}
			});
		}
	};
});

System.register("json/nPG_redRainbowBear_idle01-2.js", [], function (_export) {
	"use strict";

	return {
		setters: [],
		execute: function () {
			_export("default", { "frames": [{
					"filename": "NPG_redBear_idle2_0001.tif",
					"frame": { "x": 241, "y": 1, "w": 117, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 20, "w": 117, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0002.tif",
					"frame": { "x": 1, "y": 466, "w": 117, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 21, "w": 117, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0009.tif",
					"frame": { "x": 1, "y": 1, "w": 118, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 183, "y": 21, "w": 118, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0010.tif",
					"frame": { "x": 239, "y": 234, "w": 118, "h": 229 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 183, "y": 22, "w": 118, "h": 229 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0011.tif",
					"frame": { "x": 121, "y": 1, "w": 118, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 183, "y": 22, "w": 118, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0012.tif",
					"frame": { "x": 120, "y": 466, "w": 117, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 22, "w": 117, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0013.tif",
					"frame": { "x": 596, "y": 465, "w": 117, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 22, "w": 117, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0014.tif",
					"frame": { "x": 1, "y": 233, "w": 117, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 21, "w": 117, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0015.tif",
					"frame": { "x": 120, "y": 233, "w": 117, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 21, "w": 117, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0016.tif",
					"frame": { "x": 598, "y": 1, "w": 117, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 184, "y": 22, "w": 117, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0017.tif",
					"frame": { "x": 479, "y": 234, "w": 117, "h": 229 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 183, "y": 22, "w": 117, "h": 229 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0018.tif",
					"frame": { "x": 359, "y": 234, "w": 118, "h": 229 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 182, "y": 22, "w": 118, "h": 229 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0074.tif",
					"frame": { "x": 598, "y": 233, "w": 117, "h": 230 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 21, "w": 117, "h": 230 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0075.tif",
					"frame": { "x": 360, "y": 1, "w": 117, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 117, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0076.tif",
					"frame": { "x": 239, "y": 465, "w": 117, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 117, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0077.tif",
					"frame": { "x": 358, "y": 465, "w": 117, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 117, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0078.tif",
					"frame": { "x": 477, "y": 465, "w": 117, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 117, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_redBear_idle2_0079.tif",
					"frame": { "x": 479, "y": 1, "w": 117, "h": 231 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 185, "y": 20, "w": 117, "h": 231 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}],
				"meta": {
					"app": "http://www.codeandweb.com/texturepacker",
					"version": "1.0",
					"image": "nPG_redRainbowBear_idle01-2.png",
					"format": "RGBA8888",
					"size": { "w": 716, "h": 697 },
					"scale": "0.5",
					"smartupdate": "$TexturePacker:SmartUpdate:aa1472c793943dcd64cf6a642ac58e09:96482cfe6f0af399f4dbd3fceeb7cc29:660564851ca7e7736a2c0ba84df525a1$"
				}
			});
		}
	};
});

System.register("json/WD_pinkBear_idle-0.js", [], function (_export) {
	"use strict";

	return {
		setters: [],
		execute: function () {
			_export("default", { "frames": [{
					"filename": "NPG_Pink_idle_0000.tif",
					"frame": { "x": 867, "y": 1, "w": 118, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 167, "y": 27, "w": 118, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0001.tif",
					"frame": { "x": 865, "y": 476, "w": 118, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 168, "y": 27, "w": 118, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0002.tif",
					"frame": { "x": 743, "y": 715, "w": 119, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 168, "y": 27, "w": 119, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0004.tif",
					"frame": { "x": 499, "y": 715, "w": 120, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 169, "y": 26, "w": 120, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0005.tif",
					"frame": { "x": 1, "y": 240, "w": 120, "h": 237 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 169, "y": 25, "w": 120, "h": 237 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0006.tif",
					"frame": { "x": 1, "y": 1, "w": 121, "h": 237 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 169, "y": 25, "w": 121, "h": 237 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0007.tif",
					"frame": { "x": 373, "y": 1, "w": 121, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 169, "y": 25, "w": 121, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0008.tif",
					"frame": { "x": 376, "y": 477, "w": 121, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 169, "y": 25, "w": 121, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0009.tif",
					"frame": { "x": 248, "y": 239, "w": 122, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 168, "y": 25, "w": 122, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0010.tif",
					"frame": { "x": 743, "y": 1, "w": 122, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 167, "y": 26, "w": 122, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0011.tif",
					"frame": { "x": 619, "y": 1, "w": 122, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 26, "w": 122, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0013.tif",
					"frame": { "x": 864, "y": 715, "w": 121, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 26, "w": 121, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0037.tif",
					"frame": { "x": 863, "y": 239, "w": 122, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 28, "w": 122, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0061.tif",
					"frame": { "x": 1, "y": 717, "w": 123, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 168, "y": 28, "w": 123, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0062.tif",
					"frame": { "x": 1, "y": 479, "w": 124, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 168, "y": 27, "w": 124, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0063.tif",
					"frame": { "x": 123, "y": 240, "w": 123, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 169, "y": 27, "w": 123, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0064.tif",
					"frame": { "x": 127, "y": 478, "w": 123, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 169, "y": 27, "w": 123, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0065.tif",
					"frame": { "x": 251, "y": 716, "w": 123, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 169, "y": 27, "w": 123, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0066.tif",
					"frame": { "x": 124, "y": 1, "w": 123, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 168, "y": 27, "w": 123, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0089.tif",
					"frame": { "x": 126, "y": 717, "w": 123, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 27, "w": 123, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0091.tif",
					"frame": { "x": 249, "y": 1, "w": 122, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 27, "w": 122, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0092.tif",
					"frame": { "x": 252, "y": 477, "w": 122, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 27, "w": 122, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0093.tif",
					"frame": { "x": 372, "y": 239, "w": 122, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 27, "w": 122, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0094.tif",
					"frame": { "x": 376, "y": 715, "w": 121, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 27, "w": 121, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0095.tif",
					"frame": { "x": 496, "y": 1, "w": 121, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 27, "w": 121, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0096.tif",
					"frame": { "x": 496, "y": 239, "w": 121, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 27, "w": 121, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0097.tif",
					"frame": { "x": 621, "y": 715, "w": 120, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 27, "w": 120, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0098.tif",
					"frame": { "x": 619, "y": 239, "w": 120, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 27, "w": 120, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0100.tif",
					"frame": { "x": 622, "y": 477, "w": 120, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 27, "w": 120, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0101.tif",
					"frame": { "x": 499, "y": 477, "w": 121, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 27, "w": 121, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0102.tif",
					"frame": { "x": 741, "y": 239, "w": 120, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 27, "w": 120, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0103.tif",
					"frame": { "x": 744, "y": 477, "w": 119, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 167, "y": 27, "w": 119, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}],
				"meta": {
					"app": "http://www.codeandweb.com/texturepacker",
					"version": "1.0",
					"image": "WD_pinkBear_idle-0.png",
					"format": "RGBA8888",
					"size": { "w": 986, "h": 953 },
					"scale": "0.5",
					"smartupdate": "$TexturePacker:SmartUpdate:34f662fa81fc9acc20b8c32a66a00e26:93642e97bd5eb2f3274fc249489d6ed3:9e021dbf662244e752a28435e35f99a8$"
				}
			});
		}
	};
});

System.register("json/WD_pinkBear_idle-1.js", [], function (_export) {
	"use strict";

	return {
		setters: [],
		execute: function () {
			_export("default", { "frames": [{
					"filename": "NPG_Pink_idle_0003.tif",
					"frame": { "x": 868, "y": 1, "w": 118, "h": 236 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 169, "y": 27, "w": 118, "h": 236 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0012.tif",
					"frame": { "x": 619, "y": 237, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 27, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0014.tif",
					"frame": { "x": 742, "y": 237, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 27, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0015.tif",
					"frame": { "x": 865, "y": 239, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 27, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0016.tif",
					"frame": { "x": 372, "y": 473, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 27, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0019.tif",
					"frame": { "x": 742, "y": 709, "w": 120, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 28, "w": 120, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0031.tif",
					"frame": { "x": 372, "y": 709, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 28, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0032.tif",
					"frame": { "x": 619, "y": 473, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 28, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0033.tif",
					"frame": { "x": 742, "y": 473, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 28, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0034.tif",
					"frame": { "x": 248, "y": 1, "w": 122, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 28, "w": 122, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0035.tif",
					"frame": { "x": 372, "y": 1, "w": 122, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 28, "w": 122, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0036.tif",
					"frame": { "x": 496, "y": 1, "w": 122, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 28, "w": 122, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0038.tif",
					"frame": { "x": 125, "y": 1, "w": 121, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 28, "w": 121, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0039.tif",
					"frame": { "x": 125, "y": 238, "w": 120, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 28, "w": 120, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0040.tif",
					"frame": { "x": 864, "y": 711, "w": 120, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 120, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0044.tif",
					"frame": { "x": 865, "y": 475, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0045.tif",
					"frame": { "x": 619, "y": 709, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0047.tif",
					"frame": { "x": 620, "y": 1, "w": 122, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 29, "w": 122, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0048.tif",
					"frame": { "x": 744, "y": 1, "w": 122, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 29, "w": 122, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0049.tif",
					"frame": { "x": 124, "y": 475, "w": 122, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 29, "w": 122, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0050.tif",
					"frame": { "x": 495, "y": 473, "w": 122, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 30, "w": 122, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0051.tif",
					"frame": { "x": 495, "y": 708, "w": 122, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 30, "w": 122, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0059.tif",
					"frame": { "x": 124, "y": 711, "w": 122, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 167, "y": 28, "w": 122, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0060.tif",
					"frame": { "x": 247, "y": 239, "w": 122, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 168, "y": 28, "w": 122, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0067.tif",
					"frame": { "x": 1, "y": 475, "w": 121, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 168, "y": 28, "w": 121, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0069.tif",
					"frame": { "x": 248, "y": 475, "w": 122, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 29, "w": 122, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0084.tif",
					"frame": { "x": 248, "y": 711, "w": 122, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 28, "w": 122, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0086.tif",
					"frame": { "x": 371, "y": 237, "w": 122, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 27, "w": 122, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0087.tif",
					"frame": { "x": 495, "y": 237, "w": 122, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 27, "w": 122, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0088.tif",
					"frame": { "x": 1, "y": 1, "w": 122, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 27, "w": 122, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0090.tif",
					"frame": { "x": 1, "y": 238, "w": 122, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 27, "w": 122, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0099.tif",
					"frame": { "x": 1, "y": 712, "w": 121, "h": 235 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 28, "w": 121, "h": 235 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}],
				"meta": {
					"app": "http://www.codeandweb.com/texturepacker",
					"version": "1.0",
					"image": "WD_pinkBear_idle-1.png",
					"format": "RGBA8888",
					"size": { "w": 987, "h": 948 },
					"scale": "0.5",
					"smartupdate": "$TexturePacker:SmartUpdate:34f662fa81fc9acc20b8c32a66a00e26:93642e97bd5eb2f3274fc249489d6ed3:9e021dbf662244e752a28435e35f99a8$"
				}
			});
		}
	};
});

System.register("json/WD_pinkBear_idle-2.js", [], function (_export) {
	"use strict";

	return {
		setters: [],
		execute: function () {
			_export("default", { "frames": [{
					"filename": "NPG_Pink_idle_0018.tif",
					"frame": { "x": 370, "y": 1, "w": 119, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 28, "w": 119, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0022.tif",
					"frame": { "x": 247, "y": 709, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 29, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0024.tif",
					"frame": { "x": 857, "y": 706, "w": 120, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 30, "w": 120, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0025.tif",
					"frame": { "x": 735, "y": 707, "w": 120, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 30, "w": 120, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0028.tif",
					"frame": { "x": 369, "y": 709, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 28, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0029.tif",
					"frame": { "x": 491, "y": 709, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 28, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0030.tif",
					"frame": { "x": 1, "y": 709, "w": 121, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 28, "w": 121, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0041.tif",
					"frame": { "x": 491, "y": 1, "w": 120, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 120, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0042.tif",
					"frame": { "x": 613, "y": 709, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0043.tif",
					"frame": { "x": 857, "y": 1, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0046.tif",
					"frame": { "x": 1, "y": 1, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0052.tif",
					"frame": { "x": 124, "y": 709, "w": 121, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 30, "w": 121, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0053.tif",
					"frame": { "x": 857, "y": 236, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 30, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0054.tif",
					"frame": { "x": 370, "y": 237, "w": 120, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 120, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0055.tif",
					"frame": { "x": 370, "y": 473, "w": 120, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 29, "w": 120, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0056.tif",
					"frame": { "x": 492, "y": 237, "w": 120, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 167, "y": 29, "w": 120, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0057.tif",
					"frame": { "x": 1, "y": 237, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 167, "y": 28, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0058.tif",
					"frame": { "x": 1, "y": 473, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 167, "y": 28, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0068.tif",
					"frame": { "x": 124, "y": 1, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 167, "y": 29, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0070.tif",
					"frame": { "x": 124, "y": 237, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 29, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0071.tif",
					"frame": { "x": 613, "y": 1, "w": 120, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 29, "w": 120, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0072.tif",
					"frame": { "x": 124, "y": 473, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0073.tif",
					"frame": { "x": 492, "y": 473, "w": 120, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 120, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0074.tif",
					"frame": { "x": 247, "y": 1, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 29, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0075.tif",
					"frame": { "x": 735, "y": 1, "w": 120, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 29, "w": 120, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0076.tif",
					"frame": { "x": 614, "y": 237, "w": 119, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 29, "w": 119, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0077.tif",
					"frame": { "x": 735, "y": 237, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 163, "y": 30, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0078.tif",
					"frame": { "x": 857, "y": 471, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 163, "y": 30, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0080.tif",
					"frame": { "x": 614, "y": 473, "w": 119, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 29, "w": 119, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0081.tif",
					"frame": { "x": 735, "y": 472, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0083.tif",
					"frame": { "x": 247, "y": 237, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 28, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0085.tif",
					"frame": { "x": 247, "y": 473, "w": 121, "h": 234 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 27, "w": 121, "h": 234 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}],
				"meta": {
					"app": "http://www.codeandweb.com/texturepacker",
					"version": "1.0",
					"image": "WD_pinkBear_idle-2.png",
					"format": "RGBA8888",
					"size": { "w": 978, "h": 943 },
					"scale": "0.5",
					"smartupdate": "$TexturePacker:SmartUpdate:34f662fa81fc9acc20b8c32a66a00e26:93642e97bd5eb2f3274fc249489d6ed3:9e021dbf662244e752a28435e35f99a8$"
				}
			});
		}
	};
});

System.register("json/WD_pinkBear_idle-3.js", [], function (_export) {
	"use strict";

	return {
		setters: [],
		execute: function () {
			_export("default", { "frames": [{
					"filename": "NPG_Pink_idle_0017.tif",
					"frame": { "x": 123, "y": 1, "w": 119, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 166, "y": 28, "w": 119, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0020.tif",
					"frame": { "x": 244, "y": 1, "w": 119, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 119, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0021.tif",
					"frame": { "x": 365, "y": 1, "w": 119, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 119, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0023.tif",
					"frame": { "x": 486, "y": 1, "w": 119, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 29, "w": 119, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0026.tif",
					"frame": { "x": 607, "y": 1, "w": 119, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 119, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0027.tif",
					"frame": { "x": 849, "y": 1, "w": 120, "h": 232 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 120, "h": 232 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0079.tif",
					"frame": { "x": 728, "y": 1, "w": 119, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 164, "y": 30, "w": 119, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}, {
					"filename": "NPG_Pink_idle_0082.tif",
					"frame": { "x": 1, "y": 1, "w": 120, "h": 233 },
					"rotated": false,
					"trimmed": true,
					"spriteSourceSize": { "x": 165, "y": 29, "w": 120, "h": 233 },
					"sourceSize": { "w": 480, "h": 270 },
					"pivot": { "x": 0.5, "y": 0.5 }
				}],
				"meta": {
					"app": "http://www.codeandweb.com/texturepacker",
					"version": "1.0",
					"image": "WD_pinkBear_idle-3.png",
					"format": "RGBA8888",
					"size": { "w": 970, "h": 235 },
					"scale": "0.5",
					"smartupdate": "$TexturePacker:SmartUpdate:34f662fa81fc9acc20b8c32a66a00e26:93642e97bd5eb2f3274fc249489d6ed3:9e021dbf662244e752a28435e35f99a8$"
				}
			});
		}
	};
});

System.register('scripts/main.js', ['npm:babel-runtime@5.8.38/helpers/create-class.js', 'npm:babel-runtime@5.8.38/helpers/class-call-check.js', 'npm:babel-runtime@5.8.38/core-js/promise.js', 'github:innovationsforlearning/centralstation-js-client@master.js', 'scripts/characterSet.js', 'scripts/pointsTimer.js', 'scripts/playerScore.js', 'scripts/nextPlayerScreen.js', 'scripts/audioManager.js', 'json/WD_blueBear_idle-0.js', 'json/WD_blueBear_idle-1.js', 'json/WD_blueBear_idle-2.js', 'json/WD_blueBear_idle-3.js', 'json/WD_tiger_idle-0.js', 'json/WD_tiger_idle-1.js', 'json/WD_tiger_idle-2.js', 'json/panda_idle-0.js', 'json/panda_idle-1.js', 'json/panda_idle-2.js', 'json/panda_idle-3.js', 'json/nPG_redRainbowBear_idle01-0.js', 'json/nPG_redRainbowBear_idle01-1.js', 'json/nPG_redRainbowBear_idle01-2.js', 'json/WD_pinkBear_idle-0.js', 'json/WD_pinkBear_idle-1.js', 'json/WD_pinkBear_idle-2.js', 'json/WD_pinkBear_idle-3.js'], function (_export) {
    var _createClass, _classCallCheck, _Promise, CentralStation, CharacterSet, PointsTimer, PlayerScore, NextPlayerScreen, AudioManager, bear, bear1, bear2, bear3, tiger, tiger1, tiger2, panda, panda1, panda2, panda3, redRainbow, redRainbow1, redRainbow2, pinkBear, pinkBear1, pinkBear2, pinkBear3, App;

    return {
        setters: [function (_npmBabelRuntime5838HelpersCreateClassJs) {
            _createClass = _npmBabelRuntime5838HelpersCreateClassJs['default'];
        }, function (_npmBabelRuntime5838HelpersClassCallCheckJs) {
            _classCallCheck = _npmBabelRuntime5838HelpersClassCallCheckJs['default'];
        }, function (_npmBabelRuntime5838CoreJsPromiseJs) {
            _Promise = _npmBabelRuntime5838CoreJsPromiseJs['default'];
        }, function (_githubInnovationsforlearningCentralstationJsClientMasterJs) {
            CentralStation = _githubInnovationsforlearningCentralstationJsClientMasterJs['default'];
        }, function (_scriptsCharacterSetJs) {
            CharacterSet = _scriptsCharacterSetJs['default'];
        }, function (_scriptsPointsTimerJs) {
            PointsTimer = _scriptsPointsTimerJs['default'];
        }, function (_scriptsPlayerScoreJs) {
            PlayerScore = _scriptsPlayerScoreJs['default'];
        }, function (_scriptsNextPlayerScreenJs) {
            NextPlayerScreen = _scriptsNextPlayerScreenJs['default'];
        }, function (_scriptsAudioManagerJs) {
            AudioManager = _scriptsAudioManagerJs['default'];
        }, function (_jsonWD_blueBear_idle0Js) {
            bear = _jsonWD_blueBear_idle0Js['default'];
        }, function (_jsonWD_blueBear_idle1Js) {
            bear1 = _jsonWD_blueBear_idle1Js['default'];
        }, function (_jsonWD_blueBear_idle2Js) {
            bear2 = _jsonWD_blueBear_idle2Js['default'];
        }, function (_jsonWD_blueBear_idle3Js) {
            bear3 = _jsonWD_blueBear_idle3Js['default'];
        }, function (_jsonWD_tiger_idle0Js) {
            tiger = _jsonWD_tiger_idle0Js['default'];
        }, function (_jsonWD_tiger_idle1Js) {
            tiger1 = _jsonWD_tiger_idle1Js['default'];
        }, function (_jsonWD_tiger_idle2Js) {
            tiger2 = _jsonWD_tiger_idle2Js['default'];
        }, function (_jsonPanda_idle0Js) {
            panda = _jsonPanda_idle0Js['default'];
        }, function (_jsonPanda_idle1Js) {
            panda1 = _jsonPanda_idle1Js['default'];
        }, function (_jsonPanda_idle2Js) {
            panda2 = _jsonPanda_idle2Js['default'];
        }, function (_jsonPanda_idle3Js) {
            panda3 = _jsonPanda_idle3Js['default'];
        }, function (_jsonNPG_redRainbowBear_idle010Js) {
            redRainbow = _jsonNPG_redRainbowBear_idle010Js['default'];
        }, function (_jsonNPG_redRainbowBear_idle011Js) {
            redRainbow1 = _jsonNPG_redRainbowBear_idle011Js['default'];
        }, function (_jsonNPG_redRainbowBear_idle012Js) {
            redRainbow2 = _jsonNPG_redRainbowBear_idle012Js['default'];
        }, function (_jsonWD_pinkBear_idle0Js) {
            pinkBear = _jsonWD_pinkBear_idle0Js['default'];
        }, function (_jsonWD_pinkBear_idle1Js) {
            pinkBear1 = _jsonWD_pinkBear_idle1Js['default'];
        }, function (_jsonWD_pinkBear_idle2Js) {
            pinkBear2 = _jsonWD_pinkBear_idle2Js['default'];
        }, function (_jsonWD_pinkBear_idle3Js) {
            pinkBear3 = _jsonWD_pinkBear_idle3Js['default'];
        }],
        execute: function () {
            'use strict';

            App = (function () {
                function App(environment) {
                    _classCallCheck(this, App);

                    this.characters = [];

                    this.characterSprites = [{ sprites: [bear, bear1, bear2, bear3] }, { sprites: [tiger, tiger1, tiger2] }, { sprites: [panda, panda1, panda2, panda3] }, { sprites: [redRainbow, redRainbow1, redRainbow2] }, { sprites: [pinkBear, pinkBear1, pinkBear2, pinkBear3] }];
                    this.direction = {
                        rotateY: 0,
                        rotateX: 0,
                        rotateZ: 0
                    };
                    this.player = {
                        id: window.localStorage.getItem('userId'),
                        name: window.localStorage.getItem('firstName'),
                        readingLevel: window.localStorage.getItem('readingLevel'),
                        token: window.localStorage.getItem('authToken')
                    };
                    this.players = [this.player, {
                        name: 'Player 2'
                    }];

                    this.$viewpointElement = $('#targets');
                    this.playerScores = [new PlayerScore({
                        $scoreEl: $('.wd-score.student'),
                        $nameEl: $('.wd-player.student'),
                        player: this.player
                    }), new PlayerScore({
                        $scoreEl: $('.wd-score.player2'),
                        $nameEl: $('.wd-player.player2'),
                        player: this.players[1]
                    })];
                    this.nextPlayerScreen = new NextPlayerScreen({
                        players: this.players,
                        $el: $('.next-player__container')
                    });
                    this.currentPlayerIndex = 0;
                    this.centralstation = new CentralStation('staging');
                    this.centralstation.token = this.player.token;
                    this.centralstation.players = [this.player.id];
                    AudioManager.initialize(this.centralstation);
                }

                _createClass(App, [{
                    key: 'init',
                    value: function init() {
                        var _this2 = this;

                        this.centralstation.gameSession('word_defender').then(function (data) {
                            _this2.gameSessionId = data.id;
                        }).then(this.startGame())['catch'](function () {
                            // Keep going?
                            // (window.top || window).location = this.centralStation.studentPortalUrl;
                        });
                    }
                }, {
                    key: 'startGame',
                    value: function startGame() {
                        this.generateSpritemaps();
                        this.startCamera();
                        this.updateOnGyro();
                        this.showNextPlayerScreen(this.currentPlayerIndex);
                        this.bindReplayAudio();
                        window.requestAnimationFrame(this.loop.bind(this));
                    }
                }, {
                    key: 'startCamera',
                    value: function startCamera() {
                        setTimeout(function () {
                            CameraPreview.startCamera({
                                x: 0,
                                y: 0,
                                width: window.screen.width,
                                height: window.screen.height,
                                toBack: true,
                                camera: 'back'
                            }, function () {
                                $('.container').css('border', '0px');
                            });
                        }, 200);
                    }
                }, {
                    key: 'updateOnGyro',
                    value: function updateOnGyro() {

                        var gn = new GyroNorm();
                        var _this = this;

                        gn.init({
                            screenAdjusted: true
                        }).then(function () {
                            gn.start(function (data) {

                                _this.direction = {
                                    rotateY: -1 * data['do'].gamma,
                                    rotateX: 1 * data['do'].beta,
                                    rotateZ: 1 * data['do'].alpha - 180
                                };
                            });
                        })['catch'](function (e) {
                            // Catch if the DeviceOrientation or DeviceMotion is not supported by the browser or device
                        });
                    }
                }, {
                    key: 'loop',
                    value: function loop(timestamp) {
                        this.render();
                        window.requestAnimationFrame(this.loop.bind(this));
                    }
                }, {
                    key: 'render',
                    value: function render(progress) {
                        var translation = 'rotateY(' + this.direction.rotateY + 'deg) rotateX(' + this.direction.rotateX + 'deg) rotateZ(' + this.direction.rotateZ + 'deg) ';
                        this.$viewpointElement.css("transform", translation);
                        this.animateCharacters();
                    }
                }, {
                    key: 'generateSpritemaps',
                    value: function generateSpritemaps() {
                        this.spriteMaps = this.characterSprites.map(this.getSpriteMapping);
                    }
                }, {
                    key: 'getSpriteMapping',
                    value: function getSpriteMapping(template) {
                        var spriteMapping = [];
                        template.sprites.forEach(function (s) {
                            s.frames.forEach(function (f) {
                                var sprite_number = parseInt(f.filename.split('_').pop());
                                spriteMapping[sprite_number] = {
                                    frame: f.frame,
                                    sprite: s.meta.image,
                                    filename: f.filename,
                                    classname: s.meta.image.split('.')[0]
                                };
                            });
                        });
                        return spriteMapping;
                    }
                }, {
                    key: 'animateCharacters',
                    value: function animateCharacters() {
                        if (this.characterSet) {
                            this.characterSet.animate();
                        }
                    }
                }, {
                    key: 'newQuestion',
                    value: function newQuestion() {
                        this.centralstation.randomQuestion(this.player.id, this.player.readingLevel).then(this.displayQuestion.bind(this));
                    }
                }, {
                    key: 'displayQuestion',
                    value: function displayQuestion(question) {
                        this.updateTurnIndicator();
                        this.characterSet = new CharacterSet({ question: question,
                            characterTemplates: this.spriteMaps,
                            viewpointElement: this.$viewpointElement,
                            onCorrect: this.correctFlow.bind(this),
                            onIncorrect: this.incorrectFlow.bind(this)
                        });
                        this.replaceTimer();
                    }
                }, {
                    key: 'replaceTimer',
                    value: function replaceTimer() {
                        this.timer = new PointsTimer({
                            $el: $('.timer__container'),
                            zones: [{
                                time: 3000,
                                points: 9
                            }, {
                                time: 3000,
                                points: 8
                            }, {
                                time: 3000,
                                points: 7
                            }, {
                                time: 3000,
                                points: 6
                            }, {
                                time: 3000,
                                points: 5
                            }, {
                                time: 3000,
                                points: 4
                            }, {
                                time: 3000,
                                points: 3
                            }, {
                                time: 3000,
                                points: 2
                            }, {
                                time: 3000,
                                points: 1
                            }],
                            onNoMoreTimers: this.onNoMoreTimers.bind(this)
                        });
                    }
                }, {
                    key: 'bindReplayAudio',
                    value: function bindReplayAudio() {
                        $('.ear-button').on('click', (function (e) {
                            this.replayAudio();
                        }).bind(this));
                    }
                }, {
                    key: 'replayAudio',
                    value: function replayAudio() {
                        this.characterSet.replayAudio();
                    }
                }, {
                    key: 'correctFlow',
                    value: function correctFlow(character) {
                        var _this = this;
                        this.timer.pause();
                        character.displayPoints(this.timer.currentPoints());
                        this.playerScores[this.currentPlayerIndex].addPoints(this.timer.currentPoints());
                        if (this.isStudent()) {
                            this.centralstation.logAnswer(character.question.assessed.id, character.stimulus.id, true, this.player.id, this.gameSessionId);
                        }
                        setTimeout((function () {
                            _this.characterSet.remove();
                            _this.nextPlayer.call(_this);
                        }).bind(this), 3000);
                    }
                }, {
                    key: 'isStudent',
                    value: function isStudent() {
                        return this.currentPlayerIndex === 0;
                    }
                }, {
                    key: 'incorrectFlow',
                    value: function incorrectFlow(character) {
                        var _this = this;
                        this.timer.pause();
                        if (this.isStudent()) {
                            this.centralstation.logAnswer(character.question.assessed.id, character.stimulus.id, false, this.player.id, this.gameSessionId);
                        }
                        character.review().then(function () {
                            return character.reviewCorrect();
                        }).then(this.delay(1000)).then(function () {
                            _this.characterSet.remove();
                            _this.nextPlayer.call(_this);
                        });
                    }
                }, {
                    key: 'nextPlayer',
                    value: function nextPlayer() {
                        this.currentPlayerIndex = this.currentPlayerIndex + 1 >= this.playerScores.length ? 0 : this.currentPlayerIndex + 1;
                        this.showNextPlayerScreen();
                    }
                }, {
                    key: 'showNextPlayerScreen',
                    value: function showNextPlayerScreen() {
                        this.nextPlayerScreen.showScreen(this.currentPlayerIndex, (function () {
                            this.newQuestion();
                        }).bind(this));
                    }
                }, {
                    key: 'updateTurnIndicator',
                    value: function updateTurnIndicator() {
                        $('#lasso-area').removeClass('player1 player2');
                        $('#lasso-area').addClass('player' + (this.currentPlayerIndex + 1));
                    }
                }, {
                    key: 'delay',
                    value: function delay(ms, value) {
                        return function (val) {
                            return new _Promise(function (resolve, reject) {
                                setTimeout(resolve, ms, value !== undefined ? value : val);
                            });
                        };
                    }
                }, {
                    key: 'onNoMoreTimers',
                    value: function onNoMoreTimers() {
                        //alert("It's over here!");
                    }
                }, {
                    key: 'getScreenshot',
                    value: function getScreenshot() {

                        CameraPreview.setOnPictureTakenHandler(function (picture) {
                            document.body.style.cssText = 'background-image: url(data:image/jpeg;base64,' + picture + ')';
                            navigator.screenshot.save(function (error, res) {
                                if (error) {
                                    console.error(error);
                                } else {
                                    cordova.plugins.imagesaver.saveImageToGallery(res.filePath, function () {
                                        alert("Saved to Camera Roll!");
                                        document.body.style.cssText = 'background: transparent';
                                    }, function (error) {
                                        console.error(error);
                                    });
                                }
                            });
                        });
                        CameraPreview.takePicture({ maxWidth: 640, maxHeight: 640 });
                    }
                }]);

                return App;
            })();

            _export('default', App);

            ;
        }
    };
});
