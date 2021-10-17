/**
 * NOTE: this endpoint currently does not work & spams the console with errors.
 */


const axios = require("axios").default;

module.exports = {
    name: "discordstatus",
    run: async (req, res) => {

        //fetching discord status
        const response = axios.get("https://discordstatus.com/api/v2/status.json");

        //defining objects
        let name = response.name;
        let url = response.url;
        let timezone = response.time_zone;
        let last_updated = response.updated_at;

        //fetching components
        const components = axios.get("https://discordstatus.com/api/v2/components.json");

        //defining components
        let api_status = components.components[0].status;
        let api_descrp = components.components[0].description;
        let cloudfare = components.components[1].status;
        let cloudfare_descrp = components.components[1].description;
        let voice = components.components[10].status;
        let voice_descrp = components.components[10].description;

        //sending json result
        res.json({
            name: name,
            url: url,
            timezone: timezone,
            last_updated: last_updated,
            components: [
                {
                    name: "API",
                    status: api_status,
                    description: api_descrp
                },
                {
                    name: "CloudFare",
                    status: cloudfare,
                    description: cloudfare_descrp
                },
                {
                    name: "Voice",
                    status: voice,
                    description: voice_descrp
                }
            ]
        })
    }
}