/**
 * WhoIsPlaying is a simple command line utility for finding this week's NFL schedule
 */

const axios = require("axios");

const Teams = {
    "ARI": "Arizona Cardinals",
    "ATL": "Atlanta Falcons",
    "BAL": "Baltimore Ravens",
    "BUF": "Buffalo Bills",
    "CAR": "Carolina Panthers",
    "CHI": "Chicago Bears",
    "CIN": "Cincinnati Bengals",
    "CLE": "Cleveland Browns",
    "DAL": "Dallas Cowboys",
    "DEN": "Denver Broncos",
    "DET": "Detroit Lions",
    "GB":  "Green Bay Packers",
    "HOU": "Houston Texans",
    "IND": "Indianapolis Colts",
    "JAC": "Jacksonville Jaguars",
    "KC": "Kansas City Chiefs",
    "LAC": "Los Angeles Chargers",
    "LA": "Los Angeles Rams",
    "MIA": "Miami Dolphins",
    "MIN": "Minnesota Vikings",
    "NE": "New England Patriots",
    "NO": "New Orleans Saints",
    "NYG": "New York Giants",
    "NYJ": "New York Jets",
    "OAK": "Oakland Raiders",
    "PHI": "Philadelphia Eagles",
    "PIT": "Pittsburgh Steelers",
    "SEA": "Seattle Seahawks",
    "SF": "San Francisco 49ers",
    "TB": "Tampa Bay Buccaneers",
    "TEN": "Tennessee Titans",
    "WAS": "Washington Redskins"
}

class Schedule
{
    onLoaded(res, done)
    {
        const data = res.data;

        done(data);
    }

    onError(err)
    {
        console.log(err)
    }

    get(done)
    {
        axios.get("http://www.nfl.com/liveupdate/scores/scores.json").then(res => this.onLoaded(res, done));
    }
}

class Renderer
{
    game(id, home, away, network, score)
    {
        var output = "| ";
        var matchup = Teams[away] + " @ " + Teams[home];
        
        var month = id.substring(4, 6)
        var day = id.substring(6, 8);
        output += "(" + month + "/" + day + ") ";

        output += matchup + " (" + network + ")";

        var diff = 60 - output.length;
        for(var i = 0; i < diff; i++)
        {
            output += " ";
        }

        output += " |";

        console.log(output);
    }

    row()
    {
        let output = "+";

        for(var i = 0; i < 60; i++)
        {
            output += "-";
        }

        output += "+";

        console.log(output);
    }
}

class Parser
{
    parse(data, renderer)
    {
        for(var id in data)
        {
            const game = data[id];
            renderer.game(id, game.home.abbr, game.away.abbr, game.media.tv);
            renderer.row();
        }
    }
}

var schedule = new Schedule();
var renderer = new Renderer();
var parser = new Parser();

renderer.row();
schedule.get(data => {
    parser.parse(data, renderer);
});
