let regex = new RegExp('(&lt;!--(.*?)--&gt;)','gm');
export function comments (){

}

export function get (slides){
  let comments = [];
  let cnt = 0;
  for(let s of slides){
    // console.log(`slide ${cnt}`);
    // console.log(s);
    let res = s.match(regex);
    comments.push({'slide':cnt,'comments':res});
    cnt++;
  }
  for(let i = 0; i < comments.length; i++){
    if(comments[i].comments === null){
      comments[i].comments = [''];
      continue;
    }
    for(let j = 0; j < comments[i].comments.length;j++){
      comments[i].comments[j] = clean(comments[i].comments[j]);
    }
  }
  // console.log(comments);
return comments;
}

function clean (str){
  str = str.replace(/&lt;!--/g,'');
  str = str.replace(/--&lt;/g,''); // why does this not match???
  return str.trim();
}