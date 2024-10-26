import Route from "./route"


const initRoutes = (app) => {

    app.use('/api', Route)

    return app.use('/', (req, res) => {
        // console.log("Server onl")
        res.json("Sever onl...")
    })
}

export default initRoutes