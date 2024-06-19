const URL = process.env.BACKEND_URL || 'https://leaguebackend-sridhars-projects-ef3aeec5.vercel.app';
// const URL = process.env.BACKEND_URL || 'https://didactic-space-broccoli-r67q5wg55w5fp9q-3001.app.github.dev'

async function fetchAPI(url = '', method = 'GET', body = {}) {
    try {
        let apiResult = await fetch(`${URL}${url}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            // If method is != get no need to send body
            ...(method !== 'GET' ? { body: JSON.stringify(body) } : {}),
        });

        if (!apiResult.ok) {
            throw new Error((await apiResult.json()).message);
        }

        apiResult = apiResult.json();
        return apiResult;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { fetchAPI };
