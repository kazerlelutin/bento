import {
  After,
  Before,
  setDefaultTimeout,
  setWorldConstructor,
} from "@cucumber/cucumber"
import { BentoWorld } from "./world.utils.js"

setDefaultTimeout(60 * 1000)
setWorldConstructor(BentoWorld)

Before(async function () {

})

After(async function () {

})

