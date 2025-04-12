<script>
    import SearchResult from "$lib/Search_result.svelte";
    let test = $state("test");
    let server = $state([{ page: "1" }, { page: "2" }]);
</script>

<h1 class="self-center mt-5">RV12 Plans Search</h1>
<div class="flex flex-col self-center">
    <input
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
            console.log(server);
            test = JSON.stringify(server);
        }}
    />
    <!-- <p>{test} {test}</p> -->
    {#each server as item}
        <script>
            console.log({ item });
        </script>
        <SearchResult page={item["page"]} />
    {/each}
</div>
