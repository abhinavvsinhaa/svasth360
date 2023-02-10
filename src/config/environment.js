let _Environments = {
    production: {
        BASE_URL: 'http://44.201.226.198:3005/v1/',
        SOCKET_URL: 'http://44.201.226.198:3004/',
        APP_ID: '231510712346de81',
        REGION: 'us',
        AUTH_KEY: 'bffdd621fbdcfd21a892ea3dae880eb33abf0073'
    },
    development: {
        BASE_URL: 'http://10.0.2.2:3005/v1/',
        SOCKET_URL: 'http://10.0.2.2:3004/',
        APP_ID: '231510712346de81',
        REGION: 'us',
        AUTH_KEY: 'bffdd621fbdcfd21a892ea3dae880eb33abf0073'
    }
}

function getEnvironment() {
    return _Environments.production
}

let env = getEnvironment()
export default env
