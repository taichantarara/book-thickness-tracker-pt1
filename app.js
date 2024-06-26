let books = JSON.parse(localStorage.getItem('books')) || [];
let chart;

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('add-book-btn').addEventListener('click', addBook);
    updateChart();
});

function addBook() {
    const title = document.getElementById('book-title').value;
    const thickness = parseInt(document.getElementById('book-thickness').value);
    
    if (title && thickness) {
        books.push({ title, thickness });
        localStorage.setItem('books', JSON.stringify(books));
        updateChart();
        document.getElementById('book-title').value = '';
        document.getElementById('book-thickness').value = '';
    } else {
        alert('タイトルと厚さを入力してください');
    }
}

function updateChart() {
    const ctx = document.getElementById('book-layers').getContext('2d');
    
    if (chart) {
        chart.destroy();
    }
    
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: books.map(book => book.title),
            datasets: [{
                label: '本の厚さ (mm)',
                data: books.map(book => book.thickness),
                backgroundColor: books.map(() => `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.6)`)
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true
                }
            }
        }
    });
}
