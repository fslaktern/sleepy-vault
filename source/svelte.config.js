import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    onwarn: (warning, handler) => {
        if (warning.code === 'css-unused-selector') {
            return;
        }
        handler(warning);
    },
    kit: {
        adapter: adapter(),
        csrf: {
            checkOrigin: false,
        },
    },
};

export default config;
