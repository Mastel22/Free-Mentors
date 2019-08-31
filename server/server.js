import app from './app';

const port = process.env.port || 3010;

const server = app.listen(port, () => console.log(`The server is running on port:${port}`));

export default server;
