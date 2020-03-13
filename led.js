// настройка скорости
delay = 30;
step = 2;

is_start = true;
fullwidth = 1;
cpos = 0;
scrollw = 0;

function start_scroll()
{
var scrolltext = document.getElementById('scrolltext');
var scroll = document.getElementById('scroll');
fullwidth = scrolltext.offsetWidth;
scrolltext.style.left = scroll.offsetWidth;
scrollw = scroll.offsetWidth;
scrolltext.style.position = 'relative';

myinterval = setInterval(do_scroll, delay);
}

function do_scroll()
{
var scroll = document.getElementById('scroll');
var scrolltext = document.getElementById('scrolltext');

if (is_start)
{
cpos = scroll.offsetWidth;
scrolltext.style.left = cpos;
is_start = false;
}
else
  {
    cpos -= step;
    scrolltext.style.left = cpos;
    if (cpos < -fullwidth) { is_start = true; }
  }
}

function stop_scroll()
{
  clearInterval(myinterval);
}
function continue_scroll()
{
  myinterval = setInterval(do_scroll, delay);}
function do_resize()
{
  var scroll = document.getElementById('scroll');
  newscrollw = scroll.offsetWidth;
  if (cpos >= 0) { absstp = scrollw - cpos; }
  else { absstp = scrollw + Math.abs(cpos); }
  oldprc = absstp / (scrollw + fullwidth);
  newlen = newscrollw + fullwidth;
  newabsstp = newlen * oldprc;

  if (newabsstp <= newscrollw) { cpos = newscrollw - newabsstp; }
  else { cpos = -(newabsstp - newscrollw); }
  scrollw = newscrollw;
}
