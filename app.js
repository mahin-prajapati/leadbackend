require("dotenv").config()

//Define Packages
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")

//My Routes
const authRoutes = require("./routes/auth")
const companyRoutes = require("./routes/companies")
const permissionRoutes = require("./routes/permissions")
const roleRoutes = require("./routes/roles")
const industryRoutes = require("./routes/industries")
const currencyRoutes = require("./routes/currencies")
const leadsourceRoutes = require("./routes/leadsources")
const leadRoutes = require("./routes/leads")
const leadcontactRoutes = require("./routes/leadcontacts")
const leadstatusRoutes = require("./routes/leadstatus")
const countryRoutes = require("./routes/countries")
const employeeCountRoutes = require("./routes/employeeCount")
const clientTypeRoutes = require("./routes/clientType")
const preferenceRoutes = require("./routes/preferences")
const commtypeRoutes = require("./routes/commTypes")
const leadcommRoutes = require("./routes/leadcommunications")
const tagRoutes = require("./routes/tags")


//DB Connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => {
    console.log("DB CONNECTED")
})

//Middleware
app.use(bodyParser.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(cookieParser())
app.use(cors())

//Routes
app.use("/api", authRoutes)
app.use("/api", companyRoutes)
app.use("/api", permissionRoutes)
app.use("/api", roleRoutes)
app.use("/api", industryRoutes)
app.use("/api", currencyRoutes)
app.use("/api", leadsourceRoutes)
app.use("/api", leadRoutes)
app.use("/api", leadcontactRoutes)
app.use("/api", leadstatusRoutes)
app.use("/api", countryRoutes)
app.use("/api", employeeCountRoutes)
app.use("/api", clientTypeRoutes)
app.use("/api", preferenceRoutes)
app.use("/api", commtypeRoutes)
app.use("/api", leadcommRoutes)
app.use("/api", tagRoutes)

//PORT
const port = process.env.PORT || 8000

//Starting a Server
app.listen(port, () => {
	console.log(`app is running at ${port}`)
})