const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');

const app = express();
const route = require('./routes/index.js');
const PORT = process.env.PORT || 5000;
const db = require('./config/db');
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

// Connect to DB
db.sequelize.authenticate()
  .then(() => {
    console.log('Connection to database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

db.sequelize.sync()
  .then(() => {
    console.log('All models synced successfully');
    db.hotel.hasMany(db.room, {
      foreignKey: 'HOTEL_ID',
      as: 'rooms'
    });
    db.room.belongsTo(db.type_room, {
      foreignKey: 'ROOM_TYPE_ID',
      as: 'typeRoom'
    });
  })
  .catch(err => {
    console.error('Error syncing models: ', err);
  });

// HTTP logger
app.use(morgan('combined'))
// Template engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'src/resource/views')
// Get image
app.use(express.static(path.join(__dirname, 'public')))

// Use middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes init
route(app)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
