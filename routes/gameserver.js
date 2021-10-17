const { query } = require("gamedig");

module.exports = {
    name: "gameserver",
    run: async (req, res) => {

        if (!req.query.game) {
            res.json({
                error: "The game parameter is required!"
            })
        }
        if (!req.query.ip) {
            res.json({
                error: "The ip parameter is required!"
            })
        }

        //defing params
        const game = req.query.game;
        const ip = req.query.ip;

        //registering a query through gamedig
        query({
            type: game,
            host: ip,
        }).then((state) => {
            let server_motd = state.name;
            let server_players = state.players.length;
            let server_ping = state.ping;
            let server_online_players = state.players;

            //sending json response
            res.json({
                motd: server_motd,
                players: server_players,
                max_players: state.maxplayers,
                ping: server_ping,
                online_players: server_online_players
            })
        })

            //throwing caught error
            .catch((error) => {
                res.json({
                    error: "Something went wrong! Either the provided parameters are invalid or the server is currently offline. Please assure that the game server has to be online to get the status."
                })
                console.log(error);
            })


    }




}

/*
For list of available games & docs check this gist:
https://gist.github.com/TheInsanec0der/d70d48fdb67f95ec29eab3f7f2b26a88
*/
