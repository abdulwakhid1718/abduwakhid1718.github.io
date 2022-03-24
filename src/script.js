function getAjax(url) {
    return $.ajax({url: url, dataType: 'json', method: 'get'})
}

function getSurah(id) {
    let surah = 'https://api.quran.sutanlab.id/surah/'+id+''
    getAjax(surah).done((result) => {
        let dataSurah = result.data
        console.log(dataSurah);
        console.log(id);
        if (id != null) {
            $.get('src/bacaQuran.html', function(data) {
                $('#index').html(data)
                $('#judul').html('('+dataSurah.name.short+') ' + dataSurah.name.transliteration.id)
                if (id == 1) $('#basmallah').attr('hidden',true)
                $.each(dataSurah.verses, (i,params) => {
                    i=i+1
                    $('.content').append(`
                    <div class="col-md-12">
                    <div class="card w-100 mt-3">
                        <div class="card-body p-4">
                            <h5 class="card-title text-end pb-3 pt-2 lh-lg">`+params.text.arab+`</h5>
                            <p class="fs-6 fw-normal fst-italic p-2"><span class="badge bg-secondary">`+ i +`</span> &nbsp;"`+params.translation.id+`"</p>
                            <audio controls preload="none" >
                                <source src="`+params.audio.primary+`" type="audio/mpeg">
                                Browsermu tidak mendukung tag audio, upgrade donk!
                            </audio>
                        </div>
                    </div>
                    </div>
                    `)
                })
            })
        }
    })
}


function getListSurah(){
    getAjax('https://api.quran.sutanlab.id/surah').done((result) => {
        let arrSurah = result.data
        $.each(arrSurah, (i,surah) => {
            let surahID = surah.name.transliteration.id
            let surahAR = surah.name.short
            let artiSurah = surah.name.translation.id
            let turunSurah = surah.revelation.id
            let noAyat = surah.number
            let jumlahAyat = surah.numberOfVerses
            
            $("#list-surah").append(`
                <div class="col-md-4">
                    <div class="card w-100 mt-3">
                    <div class="card-body">
                        <h6 class="card-title mb-3"><span class="badge p-2 fs-4" style="background-color: #252772;">`+ noAyat +`</span> &nbsp;`+ surahID +` (`+ surahAR +`)</h6>
                        <h6 class="card-text fst-italic fw-light">"`+ artiSurah+`"</h6>
                        <p class="text-muted">`+ jumlahAyat +` Ayat | `+ turunSurah +`</p>
                        <span class="btn btn-outline-danger btn-sm" id="`+surah.number+`" data-id = "`+surah.number+`">Baca</span>
                        <a href="#" class="btn btn-danger btn-sm">Tafsir</a>
                    </div>
                    </div>
                </div>
                `)
                $('#'+surah.number+'').click(function () {
                    let id = $(this).data('id')
                    getSurah(id)
                })
            })
    })
}


// function getUrlVars(param=null)
// {
// 	if(param !== null)
// 	{
// 		var vars = [], hash;
// 		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
// 		for(var i = 0; i < hashes.length; i++)
// 		{
// 			hash = hashes[i].split('=');
// 			vars.push(hash[0]);
// 			vars[hash[0]] = hash[1];
// 		}
// 		return vars[param];
// 	} 
// 	else 
// 	{
// 		return null;
// 	}
// }

