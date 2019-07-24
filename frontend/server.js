const express = require('express');
const next = require('next');
const compression = require('compression');

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Wordpress API Configuration
const wp = require('./next.config').publicRuntimeConfig.wp;

app.prepare().then(() => {
    const server = express();

    server.use(express.json());
    server.use(compression());

    server.use(express.static(__dirname + '/static'));

    server.get('/artist/:slug', (req, res) => {
        const actualPage = '/post';
        const queryParams = { slug: req.params.slug };
        app.render(req, res, actualPage, queryParams);
    });

    // Create a new post using the /artist endpoint
    // https://github.com/WP-API/node-wpapi#creating-posts

    server.post('/artist', async (req, res) => {
        const { body = {} } = req;
        try {
            const response = await wp.posts().create(body);
            res.send(response);
        } catch (error) {
            res.send(error);
        }

    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });


    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`NextJS is ready on port ${PORT}!`);
    })

}).catch((error) => {
    console.error(error.stack);
});