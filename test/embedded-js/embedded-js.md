## foo

---

## bah   

---

# script 

<div id="code">
</div>
<script type="text/javascript">
// // $('#code').ready(function(){
//   console.log('inline code');
// // })
    $('#code').bind('DOMSubtreeModified', ()=>{
        console.log('inline script');
    });

// this.executeJavaScript('console.log("Hello webview")', false, function(){
//     console.log('webview');
// })
// window.onload = function(){
//     console.log('window on load')
}
</script>


---


