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
    try {
        const token_config = await fetchAPI(`/admin/git_token`);
        if (!token_config?.config_value) {
            throw new Error('GitHub token not configured');
        }
        
        const repoName = 'Images';
        
        // Validate base64 format
        if (!imageUrl || !imageUrl.includes('base64,')) {
            throw new Error('Invalid image format - must be base64');
        }
        
        const base64Content = imageUrl.split('base64,')[1];
        if (!base64Content) {
            throw new Error('Invalid base64 content');
        }

        const result = await fetchAPI(
            `https://api.github.com/repos/sridh-ar/${repoName}/contents/${imageName}`,
            'PUT',
            {
                message: 'Add player image',
                content: base64Content,
            },
            {
                Authorization: `Bearer ${token_config.config_value}`,
                'Content-Type': 'application/json',
            },
            true,
        );
        
        if (!result?.content?.download_url) {
            throw new Error('GitHub API did not return download URL');
        }
        
        return result.content.download_url;
    } catch (error) {
        console.error('GitHub upload error:', error);
        throw new Error(`Upload failed: ${error.message || 'Unknown error'}`);
    }
}

module.exports = { fetchAPI, uploadToGit };
