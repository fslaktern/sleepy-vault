import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private'

const FLAG = env.FLAG;
const ADMIN_USERNAME = ';JG[e]ev!l21<2';
const ADMIN_PASSWORD = "8~5[T5Wm,5'tj&";

function checkMatch(adminValue, userValue) {
    let correctLetters = 0;
    let match = adminValue === userValue;

    if (!match) {
        const minLength = Math.min(adminValue.length, userValue.length);
        for (let i = 0; i < minLength; i++) {
            if (adminValue[i] === userValue[i]) {
                correctLetters++;
            }
        }
    }
    return { match, correctLetters };
}

async function check_credentials(username, password) {
    let usernameResult = checkMatch(ADMIN_USERNAME, username);
    let passwordResult = checkMatch(ADMIN_PASSWORD, password);
    let correctLetters = usernameResult.correctLetters + passwordResult.correctLetters;
    let delay = 200;
    if (correctLetters > 0) {
        delay = correctLetters * 2000;
    }
    await new Promise((r) => setTimeout(r, delay));
    return usernameResult.match && passwordResult.match;
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        let data = await request.formData();
        let username = data.get('username');
        let password = data.get('password');

        if (username == null) return fail(400, { username, missing: true });
        else if (password == null) return fail(400, { password, missing: true });

        let login_status = await check_credentials(username, password);
        if (login_status === true) return { success: true, flag: FLAG };
        else return fail(401, { username, password, incorrect: true });
    },
};
