import home from "./assets/routes/home.js";
import units from "./assets/routes/units.js";
import user from "./assets/routes/user.js"

export default app => {
app.use('/', home);
app.use('/', units);
app.use('/', user);
}