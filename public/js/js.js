editor.document.designMode = "On";

function transform(option, argument) {
  editor.document.execCommand(option, false, argument);

  // console.log(argument);

}

// function getTextEditor () {
//   var content= editor.document.body.innerHTML;
//   console.log(content);
//   return;
// }

function appendTextEditor () {
  var content=`<br><div><span style="color: rgba(0, 0, 0, 0.84); font-family: Roboto, sans-serif; font-size: 16px; background-color: rgb(255, 255, 255);"><br></span></div><div><span style="color: rgba(0, 0, 0, 0.84); font-family: Roboto, sans-serif; font-size: 16px; background-color: rgb(255, 255, 255);"><br></span></div><div><span style="color: rgba(0, 0, 0, 0.84); font-family: Roboto, sans-serif; font-size: 16px; background-color: rgb(255, 255, 255);">Inversion Count for an array indicates – how far (or close) the array is from being sorted. If the array is already sorted then inversion count is 0. If the array is sorted in the reverse order that inversion count is the maximum.</span><br style="color: rgba(0, 0, 0, 0.84); font-family: Roboto, sans-serif; font-size: 16px; background-color: rgb(255, 255, 255);"><span style="color: rgba(0, 0, 0, 0.84); font-family: Roboto, sans-serif; font-size: 16px; background-color: rgb(255, 255, 255);">Two elements a[i] and a[j] form an inversion if a[i] &gt; a[j] and i &lt; j. For simplicity, we may assume that all elements are unique.</span></div>`;
  editor.document.body.innerHTML+=content;
  // console.log(content);
  return;
}


  // editor.document.addEventListener('keyup', getTextEditor, false);
  // // editor.document.addEventListener('paste', getTextEditor, false);


  // here is work for side bar 
  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";    
  }
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("main").style.content = "center";
  }



// it is used for screenn to hide chatbox on screen
  var screensize = document.documentElement.clientWidth;
  if (screensize  < 400) {
    //  alert('Less than 400');
    $('#chatbox').css('display','none');
     $('#main').removeClass('col-9');
      $('#main').addClass('col-12');
      $('#chatbox').removeClass('col-3');   
  }

  

