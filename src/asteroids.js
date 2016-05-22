/**
 * Created by finnishandy on 20/05/2016.
 */
var low = require('lowdb'),
    storage = require('lowdb/file-sync'),
    db = low('db.json', { storage });

var asteroidNames = [
    'TUNGUSKA',
    'HOBA',
    'WILLAMETTE',
    'SIKHOTE',
    'SYLACAUGAHODGES',
    'ALH',
    'ORGUEIL',
    'PEEKSKILL',
    'MURCHISON',
    'ALLENDE'];

var groupNames = [
    'YELLOW',
    'GREEN',
    'ORANGE',
    'RED',
    'BLACK',
    'BLUE'
]

var nameTotal = function(prev, current) {
    //console.log(prev, current);
    return prev + parseInt(current.charCodeAt(0) - 64);
};

var getTeams = function() {
    var teams = [];
    db('groups').forEach(function (group) {
        var asteroid = db('asteroids').find({remainder: group.remainder});
        if (asteroid) teams.push({group: group, asteroid: asteroid});
    });
    return teams;
};

var getAsteroids = function() {
    return db('asteroids');
};

var getGroups = function() {
    return db('groups');
};

var getAll = function(admin) {
    return {
            asteroids: getAsteroids(),
            groups: getGroups(),
            teams: getTeams(),
            admin: admin
    }
}

var insert = function(table, data) {
    db(table).push(data);
};

var find = function(table, data) {
    return db(table).find(data);
};

var findUser = function(name) {
   return find('users', {username: name});
};

var getRemainder = function(value) {
    return value.split('').reduce(nameTotal, 0) % 45;
}

var update = function(data) {
    var oldValue = data.old, newValue = data.new;
    db(data.type)
        .chain()
        .find({ name: oldValue })
        .assign({ name: newValue, remainder: getRemainder(newValue)})
        .value();
};

var remove = function(value) {
    db(value.type).remove({ name: value.name })
}

exports.getAll = getAll;
exports.nameTotal = nameTotal;
exports.getAsteroids = getAsteroids;
exports.getGroups = getGroups;
exports.getTeams = getTeams;
exports.insert = insert;
exports.find = find;
exports.findUser = findUser;
exports.update = update;
exports.remove = remove;
