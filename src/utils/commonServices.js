const URL = process.env.BACKEND_URL || 'https://leaguebackend-sridhars-projects-ef3aeec5.vercel.app';
// const URL = 'http://localhost:3001';
// const URL = process.env.BACKEND_URL || 'https://didactic-space-broccoli-r67q5wg55w5fp9q-3001.app.github.dev'

async function fetchAPI(url = '', method = 'GET', body = {}, headers = {}, rawUrl = false) {
    try {
        let apiResult = await fetch(rawUrl ? `${url}` : `${URL}${url}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            // If method is != get no need to send body
            ...(method !== 'GET' ? { body: JSON.stringify(body) } : {}),
        });

        if (!apiResult.ok) {
            throw new Error((await apiResult.json()).message);
        }
        apiResult = await apiResult.json();
        return apiResult;
    } catch (error) {
        throw new Error(error);
    }
}

async function uploadToGit(imageName, imageUrl) {
    const token_config = await fetchAPI(`/admin/git_token`);
    const repoName = 'Images';

    try {
        await fetchAPI(
            `https://api.github.com/repos/sridh-ar/${repoName}/contents/${imageName}`,
            'PUT',
            {
                message: 'Add image',
                content: imageUrl.split('base64,')[1],
            },
            {
                Authorization: `Bearer ${token_config.config_value}`,
            },
            true,
        );
        console.log('Image uploaded successfully!');
        return true;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { fetchAPI, uploadToGit };
