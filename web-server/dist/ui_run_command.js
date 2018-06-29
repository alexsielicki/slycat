/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"ui_run_command": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./web-server/plugins/slycat-run-command/ui.js","vendors~slycat_model~slycat_page~slycat_project~slycat_projects~ui_run_command","slycat_model~slycat_page~slycat_project~slycat_projects~ui_run_command"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./web-server/plugins/slycat-run-command/ui.js":
/*!*****************************************************!*\
  !*** ./web-server/plugins/slycat-run-command/ui.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function($) {\n\nvar _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ \"./node_modules/babel-runtime/core-js/json/stringify.js\");\n\nvar _stringify2 = _interopRequireDefault(_stringify);\n\nvar _slycatServerRoot = __webpack_require__(/*! ../../js/slycat-server-root */ \"./web-server/js/slycat-server-root.js\");\n\nvar _slycatServerRoot2 = _interopRequireDefault(_slycatServerRoot);\n\nvar _urijs = __webpack_require__(/*! urijs */ \"./node_modules/urijs/src/URI.js\");\n\nvar _urijs2 = _interopRequireDefault(_urijs);\n\nvar _slycatWebClient = __webpack_require__(/*! ../../js/slycat-web-client */ \"./web-server/js/slycat-web-client.js\");\n\nvar _slycatWebClient2 = _interopRequireDefault(_slycatWebClient);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar test_script_json = {\n    \"scripts\": [{\n        \"name\": \"test\",\n        \"parameters\": [{\n            \"name\": \"--number\",\n            \"value\": 2\n        }]\n    }],\n    \"hpc\": {\n        \"is_hpc_job\": false,\n        \"parameters\": {\n            wckey: \"test1\",\n            nnodes: \"1\",\n            partition: \"mypartition\",\n            ntasks_per_node: \"1\",\n            time_hours: \"01\",\n            time_minutes: \"30\",\n            time_seconds: \"30\",\n            working_dir: \"slycat\"\n        }\n    }\n};\n\nvar computer_time_series_script_json = {\n    \"scripts\": [{\n        \"name\": \"compute_timeseries\",\n        \"parameters\": [{\n            \"name\": \"--directory\",\n            \"value\": \"/home/slycat/src/slycat/web-client/500-times-series\"\n        }, {\n            \"name\": \"--cluster-sample-count\",\n            \"value\": 50\n        }, {\n            \"name\": \"--cluster-sample-type\",\n            \"value\": \"uniform-paa\"\n        }, {\n            \"name\": \"--cluster-type\",\n            \"value\": \"average\"\n        }, {\n            \"name\": \"--cluster-metric\",\n            \"value\": \"euclidean\"\n        }, {\n            \"name\": \"--workdir\",\n            \"value\": \"/home/slycat/workdir\"\n        }, {\n            \"name\": \"--hash\",\n            \"value\": \"1a2b3c4d5e6f\"\n        }]\n    }],\n    \"hpc\": {\n        \"is_hpc_job\": false,\n        \"parameters\": {\n            wckey: \"test1\",\n            nnodes: \"1\",\n            partition: \"mypartition\",\n            ntasks_per_node: \"1\",\n            time_hours: \"01\",\n            time_minutes: \"30\",\n            time_seconds: \"30\",\n            working_dir: \"slycat\"\n        }\n    }\n};\nvar timeseries_to_hdf5_script_json = {\n    \"scripts\": [{\n        \"name\": \"timeseries_to_hdf5\",\n        \"parameters\": [{\n            \"name\": \"--output-directory\",\n            \"value\": \"/home/slycat/output\"\n        }, {\n            \"name\": \"--inputs-file\",\n            \"value\": \"/home/slycat/input\"\n        }, {\n            \"name\": \"--inputs-file-delimiter\",\n            \"value\": \",\"\n        }, {\n            \"name\": \"--force\",\n            \"value\": \"\"\n        }]\n    }],\n    \"hpc\": {\n        \"is_hpc_job\": false,\n        \"parameters\": {\n            wckey: \"test1\",\n            nnodes: \"1\",\n            partition: \"mypartition\",\n            ntasks_per_node: \"1\",\n            time_hours: \"01\",\n            time_minutes: \"30\",\n            time_seconds: \"30\",\n            working_dir: \"slycat\"\n        }\n    }\n};\nfunction prettyPrint() {\n    try {\n        var ugly = $('#command').val();\n        var obj = JSON.parse(ugly);\n        document.getElementById('command').value = (0, _stringify2.default)(obj, undefined, 4);\n\n        var ugly = $('#response').val();\n        var obj = JSON.parse(ugly);\n        document.getElementById('response').value = (0, _stringify2.default)(obj, undefined, 4);\n    } catch (e) {\n        // no opp.\n    }\n}\n\nfunction run_remote_command() {\n    var payload = { \"command\": JSON.parse($('#command').val()) };\n    $.ajax({\n        contentType: \"application/json\",\n        type: \"POST\",\n        url: (0, _urijs2.default)(_slycatServerRoot2.default + \"remotes/\" + $('#hostname').val() + \"/post-remote-command\"),\n        success: function success(result) {\n            document.getElementById('response').value = (0, _stringify2.default)(result);\n        },\n        error: function error(request, status, reason_phrase) {\n            console.log(\"status:\" + request.status);\n            if (request.status === 400) {\n                document.getElementById('response').value = \"status: \" + request.status + \"\\n\\nmessage: \" + request.getResponseHeader('X-Slycat-Message');\n            } else {\n                document.getElementById('response').value = \"error response from server:\\n\" + \"error request:\" + (0, _stringify2.default)(request, undefined, 4) + \"\\n\\n status: \" + request.status + \"\\n\\n reason: \" + reason_phrase;\n            }\n        },\n        data: (0, _stringify2.default)(payload)\n    });\n}\n\nfunction post_session() {\n    _slycatWebClient2.default.post_remotes({\n        hostname: $('#hostname').val(),\n        username: $('#username').val(),\n        password: $('#password').val(),\n        success: function success(response) {\n            document.getElementById('response').value = \"host session made sid:\" + (0, _stringify2.default)(response, undefined, 2);\n        },\n        error: function error(request, status, reason_phrase) {\n            window.alert(\"error request:\" + request.responseJSON + \" status: \" + status + \" reason: \" + reason_phrase);\n            console.log(\"error request:\" + request.responseJSON + \" status: \" + status + \" reason: \" + reason_phrase);\n        }\n    });\n}\n\nfunction get_session() {\n    _slycatWebClient2.default.get_session_status({\n        hostname: $('#hostname').val(),\n        success: function success(message) {\n            document.getElementById('response').value = \"host session found\";\n        },\n        error: function error(request, status, reason_phrase) {\n            document.getElementById('response').value = \"no session found\";\n            post_session();\n        }\n    });\n}\nfunction set_command(name) {\n    if (name === \"test\") {\n        document.getElementById('command').value = (0, _stringify2.default)(test_script_json);\n    } else if (name === \"computer_time_series\") {\n        document.getElementById('command').value = (0, _stringify2.default)(computer_time_series_script_json);\n    } else if (name === \"timeseries_to_hdf5\") {\n        document.getElementById('command').value = (0, _stringify2.default)(timeseries_to_hdf5_script_json);\n    } else {\n        document.getElementById('command').value = \"command does not match command in list of commands\";\n    }\n}\ndocument.getElementById(\"prettyPrint\").addEventListener(\"click\", prettyPrint, false);\ndocument.getElementById(\"go\").addEventListener(\"click\", run_remote_command, false);\ndocument.getElementById(\"getSession\").addEventListener(\"click\", get_session, false);\ndocument.getElementById(\"test\").addEventListener(\"click\", function () {\n    set_command(\"test\");\n}, false);\ndocument.getElementById(\"computeTimeSeries\").addEventListener(\"click\", function () {\n    set_command(\"computer_time_series\");\n}, false);\ndocument.getElementById(\"timeseriesToHdf5\").addEventListener(\"click\", function () {\n    set_command(\"timeseries_to_hdf5\");\n}, false);\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\")))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93ZWItc2VydmVyL3BsdWdpbnMvc2x5Y2F0LXJ1bi1jb21tYW5kL3VpLmpzPzdjZGEiXSwibmFtZXMiOlsidGVzdF9zY3JpcHRfanNvbiIsIndja2V5Iiwibm5vZGVzIiwicGFydGl0aW9uIiwibnRhc2tzX3Blcl9ub2RlIiwidGltZV9ob3VycyIsInRpbWVfbWludXRlcyIsInRpbWVfc2Vjb25kcyIsIndvcmtpbmdfZGlyIiwiY29tcHV0ZXJfdGltZV9zZXJpZXNfc2NyaXB0X2pzb24iLCJ0aW1lc2VyaWVzX3RvX2hkZjVfc2NyaXB0X2pzb24iLCJwcmV0dHlQcmludCIsInVnbHkiLCIkIiwidmFsIiwib2JqIiwiSlNPTiIsInBhcnNlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInZhbHVlIiwidW5kZWZpbmVkIiwiZSIsInJ1bl9yZW1vdGVfY29tbWFuZCIsInBheWxvYWQiLCJhamF4IiwiY29udGVudFR5cGUiLCJ0eXBlIiwidXJsIiwic2VydmVyX3Jvb3QiLCJzdWNjZXNzIiwicmVzdWx0IiwiZXJyb3IiLCJyZXF1ZXN0Iiwic3RhdHVzIiwicmVhc29uX3BocmFzZSIsImNvbnNvbGUiLCJsb2ciLCJnZXRSZXNwb25zZUhlYWRlciIsImRhdGEiLCJwb3N0X3Nlc3Npb24iLCJjbGllbnQiLCJwb3N0X3JlbW90ZXMiLCJob3N0bmFtZSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJyZXNwb25zZSIsIndpbmRvdyIsImFsZXJ0IiwicmVzcG9uc2VKU09OIiwiZ2V0X3Nlc3Npb24iLCJnZXRfc2Vzc2lvbl9zdGF0dXMiLCJtZXNzYWdlIiwic2V0X2NvbW1hbmQiLCJuYW1lIiwiYWRkRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJQSxtQkFBbUI7QUFDakIsZUFBVyxDQUNQO0FBQ0ksZ0JBQVEsTUFEWjtBQUVJLHNCQUFjLENBQ1Y7QUFDSSxvQkFBUSxV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b21tYW5kL3VpLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNlcnZlcl9yb290IGZyb20gJy4uLy4uL2pzL3NseWNhdC1zZXJ2ZXItcm9vdCc7XG5pbXBvcnQgVVJJIGZyb20gXCJ1cmlqc1wiO1xuaW1wb3J0IGNsaWVudCBmcm9tICcuLi8uLi9qcy9zbHljYXQtd2ViLWNsaWVudCc7XG5cbnZhciB0ZXN0X3NjcmlwdF9qc29uID0ge1xuICAgICAgXCJzY3JpcHRzXCI6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwibmFtZVwiOiBcInRlc3RcIixcbiAgICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCI6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCItLW51bWJlclwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogMlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwiaHBjXCI6IHtcbiAgICAgICAgICBcImlzX2hwY19qb2JcIjogZmFsc2UsXG4gICAgICAgICAgXCJwYXJhbWV0ZXJzXCI6IHtcbiAgICAgICAgICAgICAgd2NrZXkgOiBcInRlc3QxXCIsXG4gICAgICAgICAgICAgIG5ub2RlcyA6IFwiMVwiLFxuICAgICAgICAgICAgICBwYXJ0aXRpb24gOiBcIm15cGFydGl0aW9uXCIsXG4gICAgICAgICAgICAgIG50YXNrc19wZXJfbm9kZSA6IFwiMVwiLFxuICAgICAgICAgICAgICB0aW1lX2hvdXJzIDogXCIwMVwiLFxuICAgICAgICAgICAgICB0aW1lX21pbnV0ZXMgOiBcIjMwXCIsXG4gICAgICAgICAgICAgIHRpbWVfc2Vjb25kcyA6IFwiMzBcIixcbiAgICAgICAgICAgICAgd29ya2luZ19kaXIgOiBcInNseWNhdFwiXG4gICAgICAgICAgfVxuICAgICAgfVxufTtcblxudmFyIGNvbXB1dGVyX3RpbWVfc2VyaWVzX3NjcmlwdF9qc29uID0ge1xuICAgICAgXCJzY3JpcHRzXCI6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwibmFtZVwiOiBcImNvbXB1dGVfdGltZXNlcmllc1wiLFxuICAgICAgICAgICAgICBcInBhcmFtZXRlcnNcIjogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIi0tZGlyZWN0b3J5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIi9ob21lL3NseWNhdC9zcmMvc2x5Y2F0L3dlYi1jbGllbnQvNTAwLXRpbWVzLXNlcmllc1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIi0tY2x1c3Rlci1zYW1wbGUtY291bnRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IDUwXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIi0tY2x1c3Rlci1zYW1wbGUtdHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCJ1bmlmb3JtLXBhYVwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIi0tY2x1c3Rlci10eXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcImF2ZXJhZ2VcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCItLWNsdXN0ZXItbWV0cmljXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcImV1Y2xpZGVhblwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIi0td29ya2RpclwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCIvaG9tZS9zbHljYXQvd29ya2RpclwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIi0taGFzaFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCIxYTJiM2M0ZDVlNmZcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBcImhwY1wiOiB7XG4gICAgICAgICAgXCJpc19ocGNfam9iXCI6IGZhbHNlLFxuICAgICAgICAgIFwicGFyYW1ldGVyc1wiOiB7XG4gICAgICAgICAgICAgIHdja2V5IDogXCJ0ZXN0MVwiLFxuICAgICAgICAgICAgICBubm9kZXMgOiBcIjFcIixcbiAgICAgICAgICAgICAgcGFydGl0aW9uIDogXCJteXBhcnRpdGlvblwiLFxuICAgICAgICAgICAgICBudGFza3NfcGVyX25vZGUgOiBcIjFcIixcbiAgICAgICAgICAgICAgdGltZV9ob3VycyA6IFwiMDFcIixcbiAgICAgICAgICAgICAgdGltZV9taW51dGVzIDogXCIzMFwiLFxuICAgICAgICAgICAgICB0aW1lX3NlY29uZHMgOiBcIjMwXCIsXG4gICAgICAgICAgICAgIHdvcmtpbmdfZGlyIDogXCJzbHljYXRcIlxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgfTtcbnZhciB0aW1lc2VyaWVzX3RvX2hkZjVfc2NyaXB0X2pzb24gPSB7XG4gICAgICBcInNjcmlwdHNcIjogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJuYW1lXCI6IFwidGltZXNlcmllc190b19oZGY1XCIsXG4gICAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiLS1vdXRwdXQtZGlyZWN0b3J5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIi9ob21lL3NseWNhdC9vdXRwdXRcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCItLWlucHV0cy1maWxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIi9ob21lL3NseWNhdC9pbnB1dFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIi0taW5wdXRzLWZpbGUtZGVsaW1pdGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIixcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCItLWZvcmNlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIlwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJocGNcIjoge1xuICAgICAgICAgIFwiaXNfaHBjX2pvYlwiOiBmYWxzZSxcbiAgICAgICAgICBcInBhcmFtZXRlcnNcIjoge1xuICAgICAgICAgICAgICB3Y2tleSA6IFwidGVzdDFcIixcbiAgICAgICAgICAgICAgbm5vZGVzIDogXCIxXCIsXG4gICAgICAgICAgICAgIHBhcnRpdGlvbiA6IFwibXlwYXJ0aXRpb25cIixcbiAgICAgICAgICAgICAgbnRhc2tzX3Blcl9ub2RlIDogXCIxXCIsXG4gICAgICAgICAgICAgIHRpbWVfaG91cnMgOiBcIjAxXCIsXG4gICAgICAgICAgICAgIHRpbWVfbWludXRlcyA6IFwiMzBcIixcbiAgICAgICAgICAgICAgdGltZV9zZWNvbmRzIDogXCIzMFwiLFxuICAgICAgICAgICAgICB3b3JraW5nX2RpciA6IFwic2x5Y2F0XCJcbiAgICAgICAgICB9XG4gICAgICB9XG4gIH07XG5mdW5jdGlvbiBwcmV0dHlQcmludCgpIHtcbiAgdHJ5IHtcbiAgICB2YXIgdWdseSA9ICQoJyNjb21tYW5kJykudmFsKCk7XG4gICAgdmFyIG9iaiA9IEpTT04ucGFyc2UodWdseSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1hbmQnKS52YWx1ZSA9IEpTT04uc3RyaW5naWZ5KG9iaiwgdW5kZWZpbmVkLCA0KTtcblxuICAgIHZhciB1Z2x5ID0gJCgnI3Jlc3BvbnNlJykudmFsKCk7XG4gICAgdmFyIG9iaiA9IEpTT04ucGFyc2UodWdseSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3BvbnNlJykudmFsdWUgPSBKU09OLnN0cmluZ2lmeShvYmosIHVuZGVmaW5lZCwgNCk7XG4gIH0gY2F0Y2ggKGUpXG4gIHtcbiAgICAvLyBubyBvcHAuXG4gIH1cbn1cblxuZnVuY3Rpb24gcnVuX3JlbW90ZV9jb21tYW5kKClcbntcbiAgdmFyIHBheWxvYWQgPSB7XCJjb21tYW5kXCI6IEpTT04ucGFyc2UoJCgnI2NvbW1hbmQnKS52YWwoKSl9O1xuICAkLmFqYXgoXG4gIHtcbiAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgdHlwZTogXCJQT1NUXCIsXG4gICAgdXJsOiBVUkkoc2VydmVyX3Jvb3QgKyBcInJlbW90ZXMvXCIrJCgnI2hvc3RuYW1lJykudmFsKCkrXCIvcG9zdC1yZW1vdGUtY29tbWFuZFwiKSxcbiAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpXG4gICAge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3BvbnNlJykudmFsdWUgPSBKU09OLnN0cmluZ2lmeShyZXN1bHQpXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24ocmVxdWVzdCwgc3RhdHVzLCByZWFzb25fcGhyYXNlKVxuICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coIFwic3RhdHVzOlwiICsgcmVxdWVzdC5zdGF0dXMpO1xuICAgICAgICBpZihyZXF1ZXN0LnN0YXR1cyA9PT0gNDAwKXtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNwb25zZScpLnZhbHVlID0gXCJzdGF0dXM6IFwiICsgcmVxdWVzdC5zdGF0dXMgKyBcIlxcblxcbm1lc3NhZ2U6IFwiICsgcmVxdWVzdC5nZXRSZXNwb25zZUhlYWRlcignWC1TbHljYXQtTWVzc2FnZScpO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzcG9uc2UnKS52YWx1ZSA9IFwiZXJyb3IgcmVzcG9uc2UgZnJvbSBzZXJ2ZXI6XFxuXCIgKyBcImVycm9yIHJlcXVlc3Q6XCJcbiAgICAgICAgICAgICAgICArIEpTT04uc3RyaW5naWZ5KHJlcXVlc3QsIHVuZGVmaW5lZCwgNCkgKyBcIlxcblxcbiBzdGF0dXM6IFwiICsgcmVxdWVzdC5zdGF0dXMgKyBcIlxcblxcbiByZWFzb246IFwiICsgcmVhc29uX3BocmFzZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZClcbiAgfSk7XG5cbn1cblxuZnVuY3Rpb24gcG9zdF9zZXNzaW9uKClcbntcbiAgY2xpZW50LnBvc3RfcmVtb3Rlcyh7XG4gICAgaG9zdG5hbWU6ICQoJyNob3N0bmFtZScpLnZhbCgpLFxuICAgIHVzZXJuYW1lOiAkKCcjdXNlcm5hbWUnKS52YWwoKSxcbiAgICBwYXNzd29yZDogJCgnI3Bhc3N3b3JkJykudmFsKCksXG4gICAgc3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3BvbnNlJykudmFsdWUgPSBcImhvc3Qgc2Vzc2lvbiBtYWRlIHNpZDpcIiArIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLCB1bmRlZmluZWQsIDIpO1xuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uKHJlcXVlc3QsIHN0YXR1cywgcmVhc29uX3BocmFzZSkge1xuICAgICAgICB3aW5kb3cuYWxlcnQoXCJlcnJvciByZXF1ZXN0OlwiICsgcmVxdWVzdC5yZXNwb25zZUpTT04gK1wiIHN0YXR1czogXCIrIHN0YXR1cyArIFwiIHJlYXNvbjogXCIgKyByZWFzb25fcGhyYXNlKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciByZXF1ZXN0OlwiICsgcmVxdWVzdC5yZXNwb25zZUpTT04gK1wiIHN0YXR1czogXCIrIHN0YXR1cyArIFwiIHJlYXNvbjogXCIgKyByZWFzb25fcGhyYXNlKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRfc2Vzc2lvbigpIHtcbiAgY2xpZW50LmdldF9zZXNzaW9uX3N0YXR1cyhcbiAgICB7XG4gICAgICBob3N0bmFtZTogJCgnI2hvc3RuYW1lJykudmFsKCksXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNwb25zZScpLnZhbHVlID0gXCJob3N0IHNlc3Npb24gZm91bmRcIjtcbiAgICAgIH0sXG4gICAgICBlcnJvcjogZnVuY3Rpb24gKHJlcXVlc3QsIHN0YXR1cywgcmVhc29uX3BocmFzZSkge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNwb25zZScpLnZhbHVlID0gXCJubyBzZXNzaW9uIGZvdW5kXCI7XG4gICAgICAgICAgcG9zdF9zZXNzaW9uKCk7XG4gICAgICB9XG4gICAgfVxuICApO1xufVxuZnVuY3Rpb24gc2V0X2NvbW1hbmQobmFtZSl7XG4gICAgaWYobmFtZSA9PT0gXCJ0ZXN0XCIpe1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWFuZCcpLnZhbHVlID0gSlNPTi5zdHJpbmdpZnkodGVzdF9zY3JpcHRfanNvbik7XG4gICAgfVxuICAgIGVsc2UgaWYobmFtZSA9PT0gXCJjb21wdXRlcl90aW1lX3Nlcmllc1wiKXtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1hbmQnKS52YWx1ZSA9IEpTT04uc3RyaW5naWZ5KGNvbXB1dGVyX3RpbWVfc2VyaWVzX3NjcmlwdF9qc29uKTtcbiAgICB9XG4gICAgZWxzZSBpZihuYW1lID09PSBcInRpbWVzZXJpZXNfdG9faGRmNVwiKXtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1hbmQnKS52YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHRpbWVzZXJpZXNfdG9faGRmNV9zY3JpcHRfanNvbik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWFuZCcpLnZhbHVlID0gXCJjb21tYW5kIGRvZXMgbm90IG1hdGNoIGNvbW1hbmQgaW4gbGlzdCBvZiBjb21tYW5kc1wiXG4gICAgfVxufVxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmV0dHlQcmludFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJldHR5UHJpbnQsIGZhbHNlKTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ29cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJ1bl9yZW1vdGVfY29tbWFuZCwgZmFsc2UpO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZXRTZXNzaW9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBnZXRfc2Vzc2lvbiwgZmFsc2UpO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXN0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe3NldF9jb21tYW5kKFwidGVzdFwiKX0sIGZhbHNlKTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tcHV0ZVRpbWVTZXJpZXNcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7c2V0X2NvbW1hbmQoXCJjb21wdXRlcl90aW1lX3Nlcmllc1wiKX0sIGZhbHNlKTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZXNlcmllc1RvSGRmNVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtzZXRfY29tbWFuZChcInRpbWVzZXJpZXNfdG9faGRmNVwiKX0sIGZhbHNlKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./web-server/plugins/slycat-run-command/ui.js\n");

/***/ })

/******/ });