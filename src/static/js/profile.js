const btn1 = document.getElementById('btn0')
const btn2 = document.getElementById('btn1')
const btn3 = document.getElementById('btn2')
const btn4 = document.getElementById('btn3')
var band1 = true;
var band2 = true;
var band3 = true;
var band4 = true;

if(btn1) {
    btn1.addEventListener('click', show);
}
if(btn2) {
    btn2.addEventListener('click', show);
}
if(btn3) {
    btn3.addEventListener('click', show);
}
if(btn4) {
    btn4.addEventListener('click', show);
}
function show(ev) {
    var button = ev.target.dataset.btn;

    switch(button) {
        case 'btn0': 
            if(band1) {
                document.getElementById('Edit0').classList.remove('hide');
                document.getElementById('Delete0').classList.remove('hide');
                band1 = false
            } else if(!band1) {
                document.getElementById('Edit0').classList.add('hide');
                document.getElementById('Delete0').classList.add('hide');
                band1 = true
            }
            break;
        case 'btn1':
            if(band2) {
                document.getElementById('Edit1').classList.remove('hide');
                document.getElementById('Delete1').classList.remove('hide');
                band2 = false
            } else if(!band2) {
                document.getElementById('Edit1').classList.add('hide');
                document.getElementById('Delete1').classList.add('hide');
                band2 = true
            }
            break;
        case 'btn2':
            if(band3) {
                document.getElementById('Edit2').classList.remove('hide');
                document.getElementById('Delete2').classList.remove('hide');
                band3 = false
            } else if(!band3) {
                document.getElementById('Edit2').classList.add('hide');
                document.getElementById('Delete2').classList.add('hide');
                band3 = true
            }
            break;
        case 'btn3':
            if(band4) {
                document.getElementById('Edit3').classList.remove('hide');
                document.getElementById('Delete3').classList.remove('hide');
                band4 = false
            } else if(!band4) {
                document.getElementById('Edit3').classList.add('hide');
                document.getElementById('Delete3').classList.add('hide');
                band4 = true
            }
            break;
    }
}