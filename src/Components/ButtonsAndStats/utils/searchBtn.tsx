//////////////////////////
//    Search for btn    //
//////////////////////////

export default function search(e: any) {
  const searchValue = e.target.value.toUpperCase();
  const btns = document.getElementsByClassName(
    "btn"
  ) as HTMLCollectionOf<HTMLElement>;
  //Match any part of search
  for (let i = 0; i < btns.length; i++) {
    if (btns[i].innerHTML.includes(searchValue)) {
      btns[i].style.display = "";
    } else {
      btns[i].style.display = "none";
    }
  }
}
