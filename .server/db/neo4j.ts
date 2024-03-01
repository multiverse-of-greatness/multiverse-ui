import nconf from "./config";
import neo4j from "neo4j-driver";

const driver = neo4j.driver(
  nconf.get("neo4j-local"),
  neo4j.auth.basic(nconf.get("USERNAME"), nconf.get("PASSWORD")),
);

export const getSession = () => driver.session();
