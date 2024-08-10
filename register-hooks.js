import { register } from "node:module";
import { pathToFileURL } from "node:url";

// File that registers the ts-node/esm module loader so that we can run
// typescript straight in nodejs, no idea how it works but this is to avoid
// using the experimental loader in nodejs that will print a warning in the log.
// is used in package.json start command.
// node --import <this-file> <build-script>
register("ts-node/esm", pathToFileURL("./"));