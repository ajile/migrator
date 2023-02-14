#!/usr/bin/env ts-node
import "dotenv/config";
import "./global";

require("./src/cli").help().argv;
