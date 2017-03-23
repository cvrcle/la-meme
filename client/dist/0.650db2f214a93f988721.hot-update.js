webpackHotUpdate(0,{

/***/ 100:
false,

/***/ 101:
false,

/***/ 109:
false,

/***/ 123:
false,

/***/ 124:
false,

/***/ 125:
false,

/***/ 126:
false,

/***/ 127:
false,

/***/ 128:
false,

/***/ 129:
false,

/***/ 130:
false,

/***/ 131:
false,

/***/ 132:
false,

/***/ 133:
false,

/***/ 134:
false,

/***/ 135:
false,

/***/ 136:
false,

/***/ 137:
false,

/***/ 158:
false,

/***/ 163:
false,

/***/ 18:
false,

/***/ 198:
false,

/***/ 199:
false,

/***/ 200:
false,

/***/ 201:
false,

/***/ 202:
false,

/***/ 203:
false,

/***/ 204:
false,

/***/ 205:
false,

/***/ 206:
false,

/***/ 207:
false,

/***/ 208:
false,

/***/ 209:
false,

/***/ 210:
false,

/***/ 211:
false,

/***/ 212:
false,

/***/ 213:
false,

/***/ 214:
false,

/***/ 215:
false,

/***/ 216:
false,

/***/ 217:
false,

/***/ 218:
false,

/***/ 219:
false,

/***/ 22:
false,

/***/ 220:
false,

/***/ 221:
false,

/***/ 222:
false,

/***/ 223:
false,

/***/ 224:
false,

/***/ 225:
false,

/***/ 24:
false,

/***/ 240:
false,

/***/ 25:
false,

/***/ 251:
false,

/***/ 254:
false,

/***/ 255:
false,

/***/ 258:
false,

/***/ 259:
false,

/***/ 260:
false,

/***/ 27:
false,

/***/ 30:
false,

/***/ 327:
false,

/***/ 329:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _getPrototypeOf = __webpack_require__(439);\n\nvar _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);\n\nvar _classCallCheck2 = __webpack_require__(2);\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(443);\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _possibleConstructorReturn2 = __webpack_require__(5);\n\nvar _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);\n\nvar _inherits2 = __webpack_require__(4);\n\nvar _inherits3 = _interopRequireDefault(_inherits2);\n\nvar _extends2 = __webpack_require__(3);\n\nvar _extends3 = _interopRequireDefault(_extends2);\n\nvar _objectWithoutProperties2 = __webpack_require__(6);\n\nvar _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);\n\nvar _dec, _class;\n\n/* Components */\n\n\n/* Auth0 Service */\n\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactBootstrap = __webpack_require__(612);\n\nvar _reactRedux = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module \\\"react-redux\\\"\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n\nvar _reactRouterDom = __webpack_require__(718);\n\nvar _socket = __webpack_require__(746);\n\nvar _socket2 = _interopRequireDefault(_socket);\n\nvar _Navigation = __webpack_require__(763);\n\nvar _Navigation2 = _interopRequireDefault(_Navigation);\n\nvar _HomeContainer = __webpack_require__(780);\n\nvar _HomeContainer2 = _interopRequireDefault(_HomeContainer);\n\nvar _DashboardContainer = __webpack_require__(779);\n\nvar _DashboardContainer2 = _interopRequireDefault(_DashboardContainer);\n\nvar _MemeRoomContainer = __webpack_require__(781);\n\nvar _MemeRoomContainer2 = _interopRequireDefault(_MemeRoomContainer);\n\nvar _Login = __webpack_require__(783);\n\nvar _Login2 = _interopRequireDefault(_Login);\n\nvar _AuthService = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module \\\"../../utils/AuthService.jsx\\\"\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n\nvar _AuthService2 = _interopRequireDefault(_AuthService);\n\nvar _lesson = __webpack_require__(700);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/* Socket.IO Connection */\nvar socket = (0, _socket2.default)('http://localhost:3000');\n\n// handles our protected routes\nfunction PrivateRoute(_ref) {\n  var Component = _ref.component,\n      authed = _ref.authed,\n      authService = _ref.authService,\n      userProfile = _ref.userProfile,\n      socket = _ref.socket,\n      logout = _ref.logout,\n      rest = (0, _objectWithoutProperties3.default)(_ref, ['component', 'authed', 'authService', 'userProfile', 'socket', 'logout']);\n\n  return _react2.default.createElement(_reactRouterDom.Route, (0, _extends3.default)({}, rest, {\n    render: function render(props) {\n      return authed === true ? _react2.default.createElement(Component, (0, _extends3.default)({ socket: socket, logout: logout, profile: userProfile, auth: authService }, props)) : _react2.default.createElement(_reactRouterDom.Redirect, { to: { pathname: '/login', state: { from: props.location } } });\n    }\n  }));\n}\n\n// handles our public routes\nfunction PublicRoute(_ref2) {\n  var Component = _ref2.component,\n      authed = _ref2.authed,\n      authService = _ref2.authService,\n      login = _ref2.login,\n      rest = (0, _objectWithoutProperties3.default)(_ref2, ['component', 'authed', 'authService', 'login']);\n\n  return _react2.default.createElement(_reactRouterDom.Route, (0, _extends3.default)({}, rest, {\n    render: function render(props) {\n      return authed === false ? _react2.default.createElement(Component, (0, _extends3.default)({ login: login, auth: authService }, props)) : _react2.default.createElement(_reactRouterDom.Redirect, { to: '/dashboard' });\n    }\n  }));\n}\n\n// redirects from login to dash if user is already logged in\nfunction alreadyLoggedIn(nextState, replaceState) {\n  if (auth.loggedIn()) replaceState({ nextPathname: nextState.location.pathname }, '/dashboard');\n}\n\nvar App = (_dec = (0, _reactRedux.connect)(function (store) {\n  return {\n    mounted: store.lesson.mounted\n  };\n}), _dec(_class = function (_Component) {\n  (0, _inherits3.default)(App, _Component);\n\n  function App(props) {\n    (0, _classCallCheck3.default)(this, App);\n\n    var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props));\n\n    _this.state = {\n      auth: new _AuthService2.default('KhDTuf4lq48s3Db6kEvHHaLGaQCb7ETk', 'lameme.auth0.com'),\n      authed: false\n    };\n    _this.getUsersProfile = _this.getUsersProfile.bind(_this);\n    _this.logout = _this.logout.bind(_this);\n    _this.login = _this.login.bind(_this);\n    return _this;\n  }\n\n  (0, _createClass3.default)(App, [{\n    key: 'componentWillMount',\n    value: function componentWillMount() {\n      // attempt to grab profile from localStorage\n      // if it exists, setState, if not hit auth0 api for profile\n      // solves refresh issue~\n      var profile = JSON.parse(localStorage.getItem('profile'));\n      if (profile) {\n        this.setState({\n          authed: true,\n          profile: profile\n        });\n      } else {\n        this.getUsersProfile();\n      }\n    }\n  }, {\n    key: 'componentDidMount',\n    value: function componentDidMount() {\n      this.getUsersProfile();\n      console.log(\"xsxxsxs\");\n      this.props.dispatch(_lesson.actions.dispatchMountAction());\n    }\n  }, {\n    key: 'componentWillUpdate',\n    value: function componentWillUpdate(nextProps, nextState) {\n      console.log(nextState);\n    }\n  }, {\n    key: 'componentDidUpdate',\n    value: function componentDidUpdate() {\n      if (this.state.userProfile) {\n        this.setState({\n          authed: true\n        });\n      }\n    }\n  }, {\n    key: 'getUsersProfile',\n    value: function getUsersProfile() {\n      var _this2 = this;\n\n      this.state.auth.lock.on('authenticated', function (authResult) {\n        _this2.state.auth.lock.getUserInfo(authResult.accessToken, function (err, profile) {\n          if (err) {\n            console.log(err);\n          }\n          _this2.setState({\n            authed: true,\n            profile: profile\n          });\n        });\n      });\n    }\n  }, {\n    key: 'login',\n    value: function login() {\n      this.setState({\n        authed: true\n      });\n    }\n  }, {\n    key: 'logout',\n    value: function logout() {\n      this.setState({\n        authed: false,\n        profile: null\n      });\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      return _react2.default.createElement(\n        _reactRouterDom.BrowserRouter,\n        null,\n        _react2.default.createElement(\n          _reactBootstrap.Grid,\n          { fluid: true },\n          _react2.default.createElement(_Navigation2.default, null),\n          _react2.default.createElement(\n            _reactBootstrap.Row,\n            null,\n            _react2.default.createElement(\n              _reactBootstrap.Col,\n              { xs: 12, md: 8, mdOffset: 1 },\n              _react2.default.createElement(\n                'div',\n                null,\n                _react2.default.createElement(\n                  _reactRouterDom.Switch,\n                  null,\n                  _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _HomeContainer2.default }),\n                  _react2.default.createElement(PublicRoute, { login: this.login, authService: this.state.auth, authed: this.state.authed, path: '/login', component: _Login2.default, onEnter: alreadyLoggedIn }),\n                  _react2.default.createElement(PrivateRoute, { socket: socket, logout: this.logout, userProfile: this.state.profile, authService: this.state.auth, authed: this.state.authed, path: '/dashboard', component: _DashboardContainer2.default }),\n                  _react2.default.createElement(PrivateRoute, { socket: socket, authed: this.state.authed, userProfile: this.state.profile, path: '/play', component: _MemeRoomContainer2.default }),\n                  _react2.default.createElement(_reactRouterDom.Route, { render: function render() {\n                      return _react2.default.createElement(\n                        'h1',\n                        null,\n                        ' Page not found '\n                      );\n                    } })\n                )\n              )\n            )\n          )\n        )\n      );\n    }\n  }]);\n  return App;\n}(_react.Component)) || _class);\n\n\nApp.PropTypes = {\n  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react2.default.PropTypes.node), _react.PropTypes.node])\n};\n\nvar _default = App;\nexports.default = _default;\n;\n\nvar _temp = function () {\n  if (typeof __REACT_HOT_LOADER__ === 'undefined') {\n    return;\n  }\n\n  __REACT_HOT_LOADER__.register(PrivateRoute, 'PrivateRoute', '/Users/monica/Desktop/la-meme/client/src/components/App.jsx');\n\n  __REACT_HOT_LOADER__.register(PublicRoute, 'PublicRoute', '/Users/monica/Desktop/la-meme/client/src/components/App.jsx');\n\n  __REACT_HOT_LOADER__.register(alreadyLoggedIn, 'alreadyLoggedIn', '/Users/monica/Desktop/la-meme/client/src/components/App.jsx');\n\n  __REACT_HOT_LOADER__.register(socket, 'socket', '/Users/monica/Desktop/la-meme/client/src/components/App.jsx');\n\n  __REACT_HOT_LOADER__.register(App, 'App', '/Users/monica/Desktop/la-meme/client/src/components/App.jsx');\n\n  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/monica/Desktop/la-meme/client/src/components/App.jsx');\n}();\n\n;\n\n ;(function register() { /* react-hot-loader/webpack */ if (process.env.NODE_ENV !== 'production') { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', \"/Users/monica/Desktop/la-meme/client/src/components/App.jsx\"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, \"/Users/monica/Desktop/la-meme/client/src/components/App.jsx\"); } } })();\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))\n\n//////////////////\n// WEBPACK FOOTER\n// ./client/src/components/App.jsx\n// module id = 329\n// module chunks = 0\n\n//# sourceURL=webpack:///./client/src/components/App.jsx?");

/***/ }),

/***/ 330:
false,

/***/ 333:
false,

/***/ 334:
false,

/***/ 335:
false,

/***/ 336:
false,

/***/ 337:
false,

/***/ 338:
false,

/***/ 339:
false,

/***/ 340:
false,

/***/ 341:
false,

/***/ 342:
false,

/***/ 343:
false,

/***/ 344:
false,

/***/ 345:
false,

/***/ 346:
false,

/***/ 347:
false,

/***/ 348:
false,

/***/ 349:
false,

/***/ 350:
false,

/***/ 351:
false,

/***/ 352:
false,

/***/ 353:
false,

/***/ 354:
false,

/***/ 355:
false,

/***/ 356:
false,

/***/ 357:
false,

/***/ 358:
false,

/***/ 359:
false,

/***/ 36:
false,

/***/ 360:
false,

/***/ 361:
false,

/***/ 362:
false,

/***/ 363:
false,

/***/ 364:
false,

/***/ 365:
false,

/***/ 366:
false,

/***/ 367:
false,

/***/ 368:
false,

/***/ 369:
false,

/***/ 37:
false,

/***/ 370:
false,

/***/ 371:
false,

/***/ 372:
false,

/***/ 373:
false,

/***/ 374:
false,

/***/ 375:
false,

/***/ 376:
false,

/***/ 377:
false,

/***/ 378:
false,

/***/ 379:
false,

/***/ 38:
false,

/***/ 380:
false,

/***/ 381:
false,

/***/ 382:
false,

/***/ 383:
false,

/***/ 384:
false,

/***/ 385:
false,

/***/ 386:
false,

/***/ 387:
false,

/***/ 388:
false,

/***/ 389:
false,

/***/ 39:
false,

/***/ 390:
false,

/***/ 391:
false,

/***/ 392:
false,

/***/ 393:
false,

/***/ 394:
false,

/***/ 395:
false,

/***/ 396:
false,

/***/ 397:
false,

/***/ 398:
false,

/***/ 399:
false,

/***/ 400:
false,

/***/ 401:
false,

/***/ 402:
false,

/***/ 403:
false,

/***/ 404:
false,

/***/ 405:
false,

/***/ 406:
false,

/***/ 407:
false,

/***/ 408:
false,

/***/ 409:
false,

/***/ 410:
false,

/***/ 411:
false,

/***/ 412:
false,

/***/ 413:
false,

/***/ 414:
false,

/***/ 415:
false,

/***/ 416:
false,

/***/ 417:
false,

/***/ 418:
false,

/***/ 419:
false,

/***/ 420:
false,

/***/ 421:
false,

/***/ 422:
false,

/***/ 423:
false,

/***/ 424:
false,

/***/ 425:
false,

/***/ 426:
false,

/***/ 427:
false,

/***/ 428:
false,

/***/ 429:
false,

/***/ 430:
false,

/***/ 431:
false,

/***/ 432:
false,

/***/ 433:
false,

/***/ 434:
false,

/***/ 435:
false,

/***/ 45:
false,

/***/ 46:
false,

/***/ 48:
false,

/***/ 49:
false,

/***/ 494:
false,

/***/ 495:
false,

/***/ 496:
false,

/***/ 497:
false,

/***/ 498:
false,

/***/ 523:
false,

/***/ 524:
false,

/***/ 529:
false,

/***/ 530:
false,

/***/ 531:
false,

/***/ 532:
false,

/***/ 533:
false,

/***/ 534:
false,

/***/ 535:
false,

/***/ 536:
false,

/***/ 537:
false,

/***/ 538:
false,

/***/ 539:
false,

/***/ 540:
false,

/***/ 542:
false,

/***/ 544:
false,

/***/ 545:
false,

/***/ 546:
false,

/***/ 547:
false,

/***/ 548:
false,

/***/ 549:
false,

/***/ 550:
false,

/***/ 551:
false,

/***/ 57:
false,

/***/ 58:
false,

/***/ 59:
false,

/***/ 625:
false,

/***/ 654:
false,

/***/ 660:
false,

/***/ 661:
false,

/***/ 67:
false,

/***/ 68:
false,

/***/ 69:
false,

/***/ 70:
false,

/***/ 729:
false,

/***/ 730:
false,

/***/ 731:
false,

/***/ 737:
false,

/***/ 738:
false,

/***/ 739:
false,

/***/ 742:
false,

/***/ 743:
false,

/***/ 744:
false,

/***/ 757:
false,

/***/ 758:
false,

/***/ 79:
false,

/***/ 84:
false,

/***/ 9:
false,

/***/ 95:
false,

/***/ 96:
false,

/***/ 97:
false,

/***/ 98:
false,

/***/ 99:
false

})