import { Sequelize } from "sequelize";
import vars from "./vars";

require("dotenv").config();

const sequelize = new Sequelize(
  (process.env.IS_PRODUCTION === "true"
    ? process.env.SERVER_DISTANT_DATABASE
    : process.env.SERVER_LOCAL_DATABASE) as string,
  (process.env.IS_PRODUCTION === "true"
    ? process.env.SERVER_DISTANT_USERNAME
    : process.env.SERVER_LOCAL_USERNAME) as string,
  (process.env.IS_PRODUCTION === "true"
    ? process.env.SERVER_DISTANT_PASSWORD
    : process.env.SERVER_LOCAL_PASSWORD) as string,
  {
    host:
      process.env.IS_PRODUCTION === "true"
        ? process.env.SERVER_DISTANT_HOST
        : process.env.SERVER_LOCAL_HOST,
    dialect: "postgres",
    logging: false,
    pool: {
      acquire: 60000, // Augmenter le délai d'attente en millisecondes (par défaut : 30000)
    },
  },
);

sequelize
  .authenticate()
  .then(async () => {
    console.log("Connection successfully ");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error.message);
    vars.writeLogToFile(error, "sequelize-database-connection.log");
  });

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Tables created or  updated");
  })
  .catch((error) => {
    vars.writeLogToFile(error, "sequelize-database-synchronization.log");
    console.error("Error creating or updating tables:", error);
  });

export default sequelize;
