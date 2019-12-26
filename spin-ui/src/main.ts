// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
var driver = require("nativescript-sqlite");


(async () => {
    try {
        const connection = await createConnection({
            database: 'spin-ui.db',
            type: 'nativescript',
            driver,
            entities: [
                User
            ],
            logging: true
        });

        console.log("Connection Created");

        await connection.synchronize(false);

        console.log("Synchronized");


    } catch (err) {
        console.error(err)
    }
})();

import { AppModule } from "./app/app.module";
import {createConnection} from "typeorm/browser";
import {User} from "~/app/entity/User";
// A traditional NativeScript application starts by initializing global objects,
// setting up global CSS rules, creating, and navigating to the main page.
// Angular applications need to take care of their own initialization:
// modules, components, directives, routes, DI providers.
// A NativeScript Angular app needs to make both paradigms work together,
// so we provide a wrapper platform object, platformNativeScriptDynamic,
// that sets up a NativeScript application and can bootstrap the Angular framework.
platformNativeScriptDynamic().bootstrapModule(AppModule);
