$(document).ready(function() {

    const url = 'https://catfact.ninja/breeds';
    $('#clientes').DataTable({
        scrollX: true,
        scrollY: '250px',
        scrollCollapse: true,
        processing: true,
        serverSide: true,
        bPaginate: true,
        serverMethod: 'get',
        pageLength: 50,
        ajax: function(data, callback) {
            $.get(url, {
                limit: data.length,
                format: 'json',
                pageIndex: (data.length + data.start) / data.length,
            }, function (res) {
                callback({
                    recordsTotal: res.total,
                    data: [...res.data.filter(f => 
                        f.breed.trim().toLowerCase().includes(data.search.value.toLowerCase()) ||  
                        f.country.trim().toLowerCase().includes(data.search.value.toLowerCase()) ||
                        f.origin.trim().toLowerCase().includes(data.search.value.toLowerCase()) ||
                        f.coat.trim().toLowerCase().includes(data.search.value.toLowerCase()) ||
                        f.pattern.trim().toLowerCase().includes(data.search.value.toLowerCase())
                    )],
                    recordsFiltered: res.per_page,
                })
            })
        },
        'columns': [
            { data: 'breed' },
            { data: 'country' },
            { data: 'origin' },
            { data: 'coat' },
            { data: 'pattern' },
        ]
    });

    getData();

});



const getData = () => {

    for(let item = 1; item < 4; item ++) {
        const random = getRandomInt(100, 150);
        const url = `https://catfact.ninja/fact?max_length=${random}`;
        fetch(url)
            .then(response => response.json())
            .then(response => {
                document.getElementById(`fact-${item}`).innerHTML = response.fact;
            })
            .catch(error => console.error(error))
    }

};

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
