const loadLession = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then((res) => res.json())
        .then((json) => displayLession(json.data))
}
loadLession() //call function for fetch data

const loadlabelWrod = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    // console.log(url);
    fetch(url)
        .then(rest => rest.json())
        .then(data => wordShowDisplay(data.data))
}

const wordShowDisplay = (words) => {
    const wordColumn = document.getElementById('wordColumn')
    wordColumn.innerHTML = ""   //make card container empty before looping
    if (words.length <= 0) {
        // check if no api data found this empty massage show in display
        wordColumn.innerHTML = `
        <div class="flex flex-col space-y-2 col-span-full text-center">
        <p class="font-bold">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
         <p>নেক্সট Lesson এ যান</p>
        </div>
         
         `
    }
    for (const word of words) {
        // console.log(word);
        const wordCardElement = document.createElement('div')
        wordCardElement.innerHTML = `
    <div class="wrodCard w-80 h-75.5 bg-white rounded-md flex items-center justify-center flex-col px-5 py-7 gap-y-7">
            <h1 class="font-bold">${word.word}</h1>
            <span>Meaning/Pronounction</span>
            <span>${word.meaning}/${word.pronunciation}</span>
            <div class="icons flex w-full items-center justify-between px-5">
          <i class="fa-solid fa-info"></i>
            <i class="fa-solid fa-volume-high"></i>
            </div>
        </div>
   `
        wordColumn.append(wordCardElement)   //append word to display
    }

}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//show dynamic lesson buttons
const displayLession = (lessions) => {
    // 1. get the container and Empty it
    const lessonsButtonsContainer = document.getElementById('lessonsButtonsContainer')
    lessonsButtonsContainer.innerHTML = ""
    // 2. get into everylession (using map/for)
    for (const lession of lessions) {
        // console.log(lession);
        // create Elemet
        const lessonBtn = document.createElement('div')
        lessonBtn.innerHTML = `        
                    <button class="btn" onclick="loadlabelWrod(${lession.level_no})" btn-outline btn-primary font-normal"><i class="fa-solid fa-book"></i>
                        Lession-${lession.level_no}</button>
             
        `
        lessonsButtonsContainer.append(lessonBtn)  //append into display

    }
}


