import { log } from "./logger";

if (ObjC.available) {

    const pendingBlocks = new Set();

    log("Injecting...");

    const hook = ObjC.classes["biometric_storage.SwiftBiometricStoragePlugin"]["- handleMethodCall:result:"];

    Interceptor.attach(hook.implementation, {
        onEnter(args) {
            log(`-[biometric_storage.SwiftBiometricStoragePlugin handleMethodCall:${args[2]} result:${args[3]}]`);
            const arg2 = new ObjC.Object(args[2]);

            const flutterMethodChannelParams = Object.values(arg2.$ivars);

            log(flutterMethodChannelParams.toString());

            if (flutterMethodChannelParams[0] == "FlutterMethodCall" && flutterMethodChannelParams[1] == "read") {

                // Change return value

                const block = new ObjC.Block(args[3]);
                log(JSON.stringify(block));
                pendingBlocks.add(block);
                const appCallback = block.implementation;
                block.implementation = (success, error) => {
                    // Original value
                    log(success);
                    // New value
                    success = 'New Biometric Storage Random Value';
                    // Log for good measure :D
                    log(success);

                    appCallback(success, error);
                    pendingBlocks.delete(block);
                };
            } else if (flutterMethodChannelParams[0] == "FlutterMethodCall" && flutterMethodChannelParams[1] == "write") {

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

