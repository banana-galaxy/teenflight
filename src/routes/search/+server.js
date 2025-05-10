import { json } from "@sveltejs/kit";
import Fuse from "fuse.js";
import data from "../../../static/indexed_plans.json";

const fuseOptions = {
  keys: ["content"],
  includeMatches: "true"
};

export async function POST({ request, cookies }) {
  const client = await request.json();

  //console.log(client);
  //console.log(data[0]);
  const fuse = new Fuse(data, fuseOptions);
  const result = fuse.search(client["search"]);
  //console.log(result)

  return json({ found: result });
}
