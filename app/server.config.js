/**
 * WARNING
 * WARNING
 * WARNING
 * WARNING
 * WARNING: these data shouldn't be NEVER imported/required in files that's gonna be exposed in browser
 * WARNING ... only in server scripts
 * WARNING
 * WARNING
 * WARNING: ... and don't remove this message, please...
 */

module.exports = {
    jwt: {
        secret: 'dfbt43q876bjyevhrteba',

        // https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
        // param 'maxAge'
        tokenExpireAfter: '3m',
        users: [
            {
                username: 'admin',
                password: 'defpass'
            }
        ]
    }
}
