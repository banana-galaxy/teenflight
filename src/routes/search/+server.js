import { json as svjson } from "@sveltejs/kit";
import Fuse from "fuse.js";
import data from "../../../static/indexed_plans.json";

const fuseOptions = {
  keys: ["content"],
  includeMatches: "true",
  includeScore: "true"
};

export async function POST({ request, cookies }) {
  const client = await request.json();

  //console.log(client);
  //console.log(data[0]);
  const fuse = new Fuse(data, fuseOptions);
  const result = fuse.search(client["search"]);
  //console.log(result)
  for (let i = 0; i < result.length; i++) {
    result[i]['matches']['match'] = "";
    //console.log(result[i]["matches"][0]["indices"]);
    //for (let x = 0; x < result[i]['matches'][0]['indices'].length; x++) {
      console.log(result[i]['matches'][0]['indices'][0]);
      console.log(result[i]['matches'][0]['value'])
    //}
  }

  return svjson({ found: result });
}
