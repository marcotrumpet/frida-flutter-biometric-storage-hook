(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
if (ObjC.available) {
    const pendingBlocks = new Set();
    (0, logger_1.log)("Injecting...");
    const hook = ObjC.classes["biometric_storage.SwiftBiometricStoragePlugin"]["- handleMethodCall:result:"];
    Interceptor.attach(hook.implementation, {
        onEnter(args) {
            (0, logger_1.log)(`-[biometric_storage.SwiftBiometricStoragePlugin handleMethodCall:${args[2]} result:${args[3]}]`);
            const arg2 = new ObjC.Object(args[2]);
            const flutterMethodChannelParams = Object.values(arg2.$ivars);
            (0, logger_1.log)(flutterMethodChannelParams.toString());
            if (flutterMethodChannelParams[0] == "FlutterMethodCall" && flutterMethodChannelParams[1] == "read") {
                // Change return value
                const block = new ObjC.Block(args[3]);
                (0, logger_1.log)(JSON.stringify(block));
                pendingBlocks.add(block);
                const appCallback = block.implementation;
                block.implementation = (success, error) => {
                    // Original value
                    (0, logger_1.log)(success);
                    // New value
                    success = 'New Biometric Storage Random Value';
                    // Log for good measure :D
                    (0, logger_1.log)(success);
                    appCallback(success, error);
                    pendingBlocks.delete(block);
                };
            }
            else if (flutterMethodChannelParams[0] == "FlutterMethodCall" && flutterMethodChannelParams[1] == "write") {
                var dict = flutterMethodChannelParams[2];
                const enumerator = dict.keyEnumerator();
                var key;
                while ((key = enumerator.nextObject()) !== null) {
                    // Search for `content` key in arguments
                    if (key == "content") {
                        // Get the original value
                        var myObj = dict.objectForKey_(key);
                        // Set the new custom value you want to save
                        myObj = "Set Biometric Storage Custom Value";
                        // Update the dictionary
                        dict.setObject_forKey_(myObj, key);
                    }
                }
            }
        },
    });
}

},{"./logger":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
function log(message) {
    console.log(message);
}
exports.log = log;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhZ2VudC9pbmRleC50cyIsImFnZW50L2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEscUNBQStCO0FBRS9CLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtJQUVoQixNQUFNLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBRWhDLElBQUEsWUFBRyxFQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRXBCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsK0NBQStDLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0lBRXpHLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtRQUNwQyxPQUFPLENBQUMsSUFBSTtZQUNSLElBQUEsWUFBRyxFQUFDLG9FQUFvRSxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0RyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdEMsTUFBTSwwQkFBMEIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUU5RCxJQUFBLFlBQUcsRUFBQywwQkFBMEIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBRTNDLElBQUksMEJBQTBCLENBQUMsQ0FBQyxDQUFDLElBQUksbUJBQW1CLElBQUksMEJBQTBCLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxFQUFFO2dCQUVqRyxzQkFBc0I7Z0JBRXRCLE1BQU0sS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsSUFBQSxZQUFHLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QixNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDO2dCQUN6QyxLQUFLLENBQUMsY0FBYyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFO29CQUN0QyxpQkFBaUI7b0JBQ2pCLElBQUEsWUFBRyxFQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNiLFlBQVk7b0JBQ1osT0FBTyxHQUFHLG9DQUFvQyxDQUFDO29CQUMvQywwQkFBMEI7b0JBQzFCLElBQUEsWUFBRyxFQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUViLFdBQVcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQzVCLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQzthQUNMO2lCQUFNLElBQUksMEJBQTBCLENBQUMsQ0FBQyxDQUFDLElBQUksbUJBQW1CLElBQUksMEJBQTBCLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxFQUFFO2dCQUV6RyxJQUFJLElBQUksR0FBRywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN4QyxJQUFJLEdBQUcsQ0FBQztnQkFFUixPQUFPLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLElBQUksRUFBRTtvQkFFN0Msd0NBQXdDO29CQUV4QyxJQUFJLEdBQUcsSUFBSSxTQUFTLEVBQUU7d0JBQ2xCLHlCQUF5Qjt3QkFDekIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDcEMsNENBQTRDO3dCQUM1QyxLQUFLLEdBQUcsb0NBQW9DLENBQUM7d0JBQzdDLHdCQUF3Qjt3QkFDeEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztxQkFDdEM7aUJBQ0o7YUFDSjtRQUNMLENBQUM7S0FDSixDQUFDLENBQUM7Q0FDTjs7Ozs7O0FDNURELFNBQWdCLEdBQUcsQ0FBQyxPQUFlO0lBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekIsQ0FBQztBQUZELGtCQUVDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIifQ==
