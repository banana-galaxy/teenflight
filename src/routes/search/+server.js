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

  const fuse = new Fuse(data, fuseOptions);
  const result = fuse.search(client["search"]);
  for (let i = 0; i < result.length; i++) {
    let biggest_delta = 0;
    let first_indice = 0;
    let second_indice = 0;
    
    let indices = result[i]['matches'][0]['indices']
    for (let x = 0; x < indices.length; x++) {
      if (indices[x][1] - indices[x][0] > biggest_delta) {
        biggest_delta = indices[x][1] - indices[x][0];
        first_indice = indices[x][0];
        second_indice = indices[x][1];
      }
    }
    
    let value = result[i]['matches'][0]['value'];
    while (value[first_indice] != ' ' && first_indice != 0 && value[first_indice] != '\n') {
      --first_indice;
    }
    ++first_indice;

    while (value[second_indice] != ' ' && second_indice < value.length-1 && value[second_indice] != '\n') {
      ++second_indice;
    }

        
    result[i]['match'] = result[i]['matches'][0]['value'].slice(first_indice, second_indice);
  }

  return svjson({ found: result });
}
