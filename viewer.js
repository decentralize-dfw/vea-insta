'use strict';
const labels={following:'Takip edilen',target:'Ek 100',hashtag:'Hashtag'};
const $=id=>document.getElementById(id);
const formatDay=day=>new Intl.DateTimeFormat('tr-TR',{day:'numeric',month:'long',year:'numeric',timeZone:'Europe/Paris'}).format(new Date(day+'T12:00:00Z'));
let archive=[],active,stream='all',toastTimer;
function element(tag,className,text){const el=document.createElement(tag);if(className)el.className=className;if(text!==undefined)el.textContent=text;return el;}
function toast(text){$('toast').textContent=text;$('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),2200);}
function renderComments(){
 const query=$('search').value.trim().replace(/^@/,'').toLowerCase();
 const posts=active.comments.filter(p=>(stream==='all'||p.stream===stream)&&p.handle.toLowerCase().includes(query));
 $('comments').replaceChildren();$('empty').hidden=posts.length!==0;$('result-count').textContent=posts.length+' yorum taslağı';
 for(const p of posts){
  const article=element('article','comment');article.id=p.key;
  const top=element('div','comment-top'),link=element('a','post-link','@'+p.handle+' · Instagram');link.href=p.url;link.target='_blank';link.rel='noopener noreferrer';top.append(link,element('span','source',labels[p.stream]));
  const text=element('p','comment-text',p.comment);text.lang='en';
  const bottom=element('div','comment-bottom'),copy=element('button','copy','Yorumu kopyala');copy.type='button';copy.setAttribute('aria-label',p.handle+' yorumunu kopyala');
  copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(p.comment);toast('Yorum kopyalandı.');}catch{const range=document.createRange();range.selectNodeContents(text);const s=window.getSelection();s.removeAllRanges();s.addRange(range);toast('Metin seçildi. Kopyalama kısayolunu kullanın.');}});
  bottom.append(element('p','fit','VEA uyumu '+p.fit+'/10'),copy);
  const detail=element('details','fit-note');detail.append(element('summary',null,'Uyum gerekçesi'),element('p',null,p.rationale));
  article.append(top,text,bottom,detail);if(p.note)article.append(element('p','availability',p.note));$('comments').append(article);
 }
}
function showDay(day,changeUrl=false){
 active=archive.find(x=>x.date===day)||archive[0];if(!active)throw Error('Henüz günlük kayıt yok.');
 if(changeUrl){const u=new URL(location.href);u.searchParams.set('date',active.date);history.pushState(null,'',u);}
 document.title=formatDay(active.date)+' — VEA comments';$('day').textContent=formatDay(active.date);
 $('summary').textContent=active.comments.length+' yorum · '+active.comments.filter(p=>p.stream==='hashtag').length+' hashtag keşfi · Instagram’a gönderilmedi';
 $('coverage').textContent=active.coverage_note;$('report').href=(document.body.dataset.reportBase||'days/')+active.date+'.md';
 for(const link of $('dates').querySelectorAll('a')){if(link.dataset.date===active.date)link.setAttribute('aria-current','date');else link.removeAttribute('aria-current');}
 renderComments();
}
for(const b of document.querySelectorAll('[data-stream]'))b.addEventListener('click',()=>{stream=b.dataset.stream;for(const btn of document.querySelectorAll('[data-stream]'))btn.setAttribute('aria-pressed',String(btn===b));if(active)renderComments();});
$('search').addEventListener('input',()=>{if(active)renderComments();});
window.addEventListener('popstate',()=>{if(archive.length)showDay(new URL(location.href).searchParams.get('date'));});
fetch(document.body.dataset.archiveUrl||'data/archive.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Arşiv yüklenemedi.');return r.json();}).then(data=>{
 archive=data.days.sort((a,b)=>b.date.localeCompare(a.date));
 for(const d of archive){const a=element('a',null,formatDay(d.date));a.href='?date='+d.date;a.dataset.date=d.date;a.addEventListener('click',e=>{if(e.button||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();showDay(d.date,true);});$('dates').append(a);}
 showDay(new URL(location.href).searchParams.get('date'));
}).catch(e=>{$('day').textContent='Yorum arşivi';$('error').textContent=e.message+' Sayfayı yenileyin veya depodaki günlük kaydı açın.';$('error').hidden=false;});
