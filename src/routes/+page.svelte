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
            for (let i = 0; i < server.length - 1; i++) {
                let path = "";
                img_paths.push("");
            }
            console.log(server);
            test = JSON.stringify(server);
        }}
    />
    <!-- <p>{test} {test}</p> -->
    <!-- <SearchResult page="100" /> -->
    {#each server["found"] as item}
        <!-- {JSON.stringify(item["item"])} -->
        <div
            class="self-center flex justify-between flex-row w-150 h-[300px] border-solid border-2 border-black hover:border-orange-600 p-2 mb-[20px]"
        >
            <img src="img_plans/{item['item']['img']}" class="h-[280px]" />
            <div class="self-end text-3xl">{item["item"]["page"]}</div>
        </div>
        <!-- <SearchResult page={item["item"]["page"]} /> -->
    {/each}
</div>
