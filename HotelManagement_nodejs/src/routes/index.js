const hotelRouter = require('./hotel');
const siteRouter = require('./site');
const userRouter = require('./user');
const typeRoomRouter = require('./typeRoom');
const roomRouter = require('./room');

function route(app) {
    app.use('/room', roomRouter);

    app.use('/typeRoom', typeRoomRouter);

    app.use('/hotel', hotelRouter);

    app.use('/user', userRouter);
    
    // Always at the bottom
    app.use('/', siteRouter);
}

module.exports = route;
