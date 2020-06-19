const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
const btn3 = document.getElementById('btn3')
const btn4 = document.getElementById('btn4')
var band = true;

btn1.addEventListener('click', show);
btn2.addEventListener('click', show);
btn3.addEventListener('click', show);
btn4.addEventListener('click', show);

function show(ev) {
    var button = ev.target.dataset.btn;

    switch(button) {
        case 'btn1': 
            if(band) {
                document.getElementById('Edit1').classList.remove('hide');
                document.getElementById('Delete1').classList.remove('hide');
                band = false
            } else if(!band) {
                document.getElementById('Edit1').classList.add('hide');
                document.getElementById('Delete1').classList.add('hide');
                band = true
            }
            break;
        case 'btn2':
            if(band) {
                document.getElementById('Edit2').classList.remove('hide');
                document.getElementById('Delete2').classList.remove('hide');
                band = false
            } else if(!band) {
                document.getElementById('Edit2').classList.add('hide');
                document.getElementById('Delete2').classList.add('hide');
                band = true
            }
            break;
        case 'btn3':
            if(band) {
                document.getElementById('Edit3').classList.remove('hide');
                document.getElementById('Delete3').classList.remove('hide');
                band = false
            } else if(!band) {
                document.getElementById('Edit3').classList.add('hide');
                document.getElementById('Delete3').classList.add('hide');
                band = true
            }
            break;
        case 'btn4':
            if(band) {
                document.getElementById('Edit4').classList.remove('hide');
                document.getElementById('Delete4').classList.remove('hide');
                band = false
            } else if(!band) {
                document.getElementById('Edit4').classList.add('hide');
                document.getElementById('Delete4').classList.add('hide');
                band = true
            }
            break;
    }
}