import home from "./routes/home.js";
import units from "./routes/units.js";
import user from "./routes/user.js"

export default app => {
app.use('/', home);
app.use('/', units);
app.use('/', user);
}