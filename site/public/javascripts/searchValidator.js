window.addEventListener("load", () => {
        let search = document.getElementById("searchForm")
        search.addEventListener("submit", (e) => {
            e.preventDefault();
            let searchInput= document.getElementById("searchInput");
            if(searchInput.value !== ''){
                search.submit()
            }
        })
    })