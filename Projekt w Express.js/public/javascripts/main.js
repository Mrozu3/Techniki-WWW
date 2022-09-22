function deleteMovie() {

    if (confirm("Film zostanie usunięty na zawsze. Jesteś pewien?") === true) {
        const id = event.target.parentElement.dataset.id;

        fetch(`http://localhost:3000/movies/${id}`, {
            method: 'DELETE',
        }).then(response => response.json()).then((data) => {
            location.reload();
            alert(data.message)
        })
    }


}


