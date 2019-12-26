import { environment as devEnvironment } from './environment.dev';
import { environment as prodEnvironment } from './environment.prod';

export const environment = (() => {
    let envVars;
    console.log(process);

    if (
        typeof process !== 'undefined' && process &&
        Object.prototype.hasOwnProperty.call(process, 'env') && process.env &&
        Object.prototype.hasOwnProperty.call(process.env, 'environment') && process.env.environment
    ) {
        switch (process.env.environment) {
            case 'prod':
                envVars = prodEnvironment;
                break;
            // TODO: Add additional environment (e.g. uat) if required.
            default:
                envVars = devEnvironment;
        }
    } else {
        envVars = devEnvironment;
    }

    return envVars;
})();
