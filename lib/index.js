// Required environment variables: GITHUB_APP_PRIVATE_KEY, GITHUB_APP_ID
const getAppCredentials = () => {
    // Get GitHub App credentials from environment
    const privateKey = Buffer.from(process.env.GITHUB_APP_PRIVATE_KEY, 'base64').toString();
    const id = process.env.GITHUB_APP_ID;
    return { privateKey, id };
};

const getAuthenticatedApp = () => {
    const { Octokit } = require('@octokit/rest');
    const { createAppAuth } = require('@octokit/auth-app');

    // Create new Octokit instance that is authenticated as a GitHub App
    return new Octokit({
        authStrategy: createAppAuth,
        auth: {
            type: 'app',
            ...getAppCredentials()
        }
    });
};

const doRotate = (app) => {

};

exports.rotate = (req, res) => {
    try {
        const app = getAuthenticatedApp();
        const success = doRotate(app);
        
        return success ? res.status(200) : res.status(404);
    }
    catch (error) {
        return res.status(500).send(error);
    }
};    