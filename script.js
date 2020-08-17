const searchBox = document.getElementById('search-box')
const searchBtn = document.getElementById('search-btn')
const albumShow = document.getElementById('album-show')
const lyricFull = document.getElementById('lyric-full')
const titleSong = document.getElementById('title-song')

searchBtn.addEventListener('click', () => {
    const searchItem = searchBox.value;
    fetch(`https://api.lyrics.ovh/suggest/${searchItem}`)
        .then(res => res.json())
        .then(data => data.data.slice(0, 10).map((lyric) => {
            let pCreate = document.createElement('p')
            // console.log(lyric);
            pCreate.className = 'author lead'
            pCreate.innerHTML= `
            <strong>${lyric.title}</strong> Album by <span>${lyric.album.title}</span> <button onclick='getLyric("${lyric.artist.name}", "${lyric.title}")' class="btn btn-success">Get Lyrics</button>
            `
            albumShow.appendChild(pCreate)
        }))
})

function getLyric(artist, title){
    titleSong.innerText = title
fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
.then(res => res.json())
.then(data=> {
    lyricFull.innerHTML = data.lyrics
})
}