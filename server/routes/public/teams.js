const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.use(function(req, res, next) {
  console.log('Request on /api/pool');
  res.header("Access-Control-Allow-Origin", "*");
  next();
})

// define model =================
var Team     = require('../../models/team');

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all teams
router.route('/')
.get(function (req, res) {


  if ( Object.keys(req.query).length === 0) {
    console.log('SERVER : Get all teams');
    // use mongoose to get all teams in the database
    Team.find(function(err, teams) {

      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
      res.send(err)

      res.json(teams); // return all teams in JSON format
    });
  } else {
    console.log('Query : ' + JSON.stringify(req.query));
    if (req.query.idTournament != null)
    {

      // TODO
      
      Pool.find({"tournamentId" : req.query.idTournament}, function(err, pools) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
        res.send(err)

        // Pour chaque pool trouvée, on retourne toutes les teams

        //res.json(pools); // return all pools in JSON format
      });
      
      
      /*Team.find({"tournamentId" : req.query.idTournament}, function(err, teams) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
        res.send(err)

        res.json(teams); // return all teams in JSON format
      });*/
    }
    else if (req.query.idPool != null)
    {

      Team.find({"poolId" : req.query.idPool}, function(err, teams) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
        res.send(err)

        res.json(teams); // return all teams in JSON format
      });
    } else {
      console.log('Unknown Query : ' + JSON.stringify(req.query));
      res.status(400).send('Bad request : Unknown Query : ' + JSON.stringify(req.query));
    }
  }
});


router.route('/:team_id')
.get(function(req, res) {
  console.log('SERVER : Get a team');
  Team.findById(req.params.team_id, function (err, team) {
    if ( err ) {
      console.log('error while getting team with id ');
      res.send(err);
    }
    res.json(team);
  })
});

module.exports = router;
