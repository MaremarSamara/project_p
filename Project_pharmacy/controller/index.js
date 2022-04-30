const DB = require("../DB/index");
class DrugsController {
    async getDrug(req, res) {
        try {
            let drugsNames = await DB.getDrugsNames();
            drugsNames = drugsNames.map(obj => obj.pharmaceuticalName);
            let drugName = req.params.drugName;
            let drug = typeof drugName === "string" ? await DB.getDrugsByName(drugName) : null;
            //this function return html using a template enjene...
            // return res.render("pages/lab", {title: "Labs", labsNames, lab})
            //use res.json to return a json object as an API...
            res.status(200).json({ title: "Drugs", drugsNames, drug })
        } catch (err) {
            console.log(err);
            //return an error page using the template enjene...
            // return res.render("pages/error", {message: err.message, title: "error page"});
            res.status(400).json({ message: err.message, title: "error page" })
        }
    }
}
process.on("unhandledRejection", (reason, promise) => {
    console.log(reason);
})
module.exports = new DrugsController();