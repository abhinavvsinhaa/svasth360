let _Environments = {
    production: {
        BASE_URL: '',
        APP_ID: '231510712346de81',
        REGION: 'us',
    },
    development: {
        BASE_URL: '',
        APP_ID: '231510712346de81',
        REGION: 'us',
        AUTH_KEY: 'bffdd621fbdcfd21a892ea3dae880eb33abf0073'
    }
}

function getEnvironment() {
    return _Environments.development
}

let env = getEnvironment()
export default env
