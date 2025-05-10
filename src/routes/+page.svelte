<script>
    import SearchResult from "$lib/Search_result.svelte";
    let server = $state([{ page: "1" }, { page: "2" }]);
    let img_paths = [];
</script>

<h1 class="self-center mt-5">RV12 Plans Search</h1>
<div class="flex flex-col self-center">
    <input
        class="border-solid border-3 border-black focus-visible:outline-none px-3 py-2 w-150 mb-[20px]"
        placeholder="Search parts"
        oninput={async (e) => {
            const term = document.getElementsByTagName("input")[0].value;
            const response = await fetch("/search", {
                method: "POST",
                body: JSON.stringify({ search: term }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            server = await response.json();
            /*for (let i = 0; i < server.length - 1; i++) {
                let path = "";
                img_paths.push("");
            }
            console.log(server);
            /*for (let i = 0; i < server["found"].length; i++) {
                let delta = 0;
                let match = [0,0]
                let indices = server["found"][i]["matches"][0]["indices"];

                for (let ind = 0; ind+1 < indices.length; ind++) {
                    if (ind % 2 == 0) {
                        if (ind+1 - ind > delta) {
                            delta = ind+1 - ind;
                            match[0] = ind;
                            match[1] = ind+1;
                        }
                    }
                }

                server["found"][i]["match"] = server["found"][i]["item"]["content"].slice(match[0], match[1]+1)
                console.log("matches: "+server["found"][i]["matches"][0]["indices"][4]);
                console.log("matches: "+server["found"][i]["matches"][0]["indices"][5]);
            }*/
        }}
    />
    <!-- <p>{test} {test}</p> -->
    <!-- <SearchResult page="100" /> -->
    {#each server["found"] as item}
        <!-- {JSON.stringify(item["item"])} -->
        <a
            class="group self-center flex justify-between flex-col w-[600px] h-[450px] border-solid border-2 border-black hover:border-orange-600 p-2 mb-[20px]"
            href="pdf_plans/{item['item']['section']}.pdf#page={item['item']['page']}"
            target="_blank"
        >
            <h1 class="self-center text-3xl font-bold group-hover:text-orange-600">Section {item['item']['section']}</h1>
            <img src="img_plans/{item['item']['section']}/{item['item']['section']}_{item['item']['page']}-1.jpg" class="self-center h-[280px] w-[433px]" />
            <!--<p>{item["match"]}</p>-->
            <div class="self-end text-3xl font-bold group-hover:text-orange-600">{item["item"]["page"]}</div>
        </a>
        <!-- <SearchResult page={item["item"]["page"]} />w-[600px] h-[450px] -->
    {/each}
</div>
