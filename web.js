const createEle = (arr) => {  //display synonemms in Modal using array map methood///
    const htmlElements = arr.map((el) => `<h1 class="w-[120px] text-center flex items-center justify-center h-8 bg-slate-500 rounded-md text-white">${el}</h1>`)
    const htmlEleJoin = htmlElements.join(" ")
    return htmlEleJoin;
}

const loadLession = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then((res) => res.json())
        .then((json) => displayLession(json.data))
}
loadLession() //call function for fetch data

const btnClassRemover = () => {
    const btnClsRemover = document.querySelectorAll('.lessonBtnClassRemover')
    console.log(btnClsRemover);
    btnClsRemover.forEach((btn) => btn.classList.remove('active'))

}
const loadlabelWrod = (id) => {  //this is a on-click Evern function
    // loadingAnimation(true)  dontUnderstand Animation spinner
    btnClassRemover()
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    // console.log(url);
    fetch(url)
        .then(rest => rest.json())
        .then(data => {
            wordShowDisplay(data.data)
            const clickBtn = document.getElementById(`lessonBtnId${id}`)
            clickBtn.classList.add('active')
            console.log(clickBtn);

        })
}

// loader Function show in Display>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// const loadingAnimation = (status) => {
//     if (status) {
//         document.getElementById('loadingAnimation').classList.remove('hidden')
//         document.getElementById('wordColumn').classList.add('hidden')

//     } else {
//         document.getElementById('wordColumn').classList.add('hidden')
//         document.getElementById('loadingAnimation').classList.remove('hidden')
//     }
// }

const loadWordDatils = async (id) => { //this function is use for load data in Modal display//
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)    //dont understand those two lines
    const details = await res.json()
    displayWrodDetails(details.data)
}
// Display Word Details ///
const displayWrodDetails = (word) => {
    console.log(word);
    const detailsBox = document.getElementById('detailsContainer')
    detailsBox.innerHTML = `
        <div class="flex flex-col space-y-1">
            <div class="wordPronounce flex items-center justify-start gap-x-1">
                <h1>${word.word}</h1>
                <i class="fa-solid fa-microphone-lines"></i>
                <span>${word.pronunciation}</span>
            </div>
            <h1>Bangla Meaning</h1>
            <h1>${word.meaning}</h1>
            <span class="font-bold">Example</span>
            <p>${word.sentence}</p>
            <span>সমার্থক শব্দ গুলো</span>
            <div class="w-100 flex items-center justify-between">${createEle(word.synonyms)}</div>
        </div>
`

    document.getElementById('wordModal').showModal()   //dont underStand this line?? how ShowModal work and where it comes from???????????????????????

}


const wordShowDisplay = (words) => {
    const wordColumn = document.getElementById('wordColumn')
    wordColumn.innerHTML = ""   //make card container empty before looping
    if (words.length <= 0) {
        // check if no api data found this empty massage show in display
        wordColumn.innerHTML = `
        <div class="flex flex-col space-y-2 col-span-full w-full items-center">
        <i class="text-7xl text-gray-500 fa-solid fa-triangle-exclamation"></i>
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
            <h1 class="font-bold">${word.word ? word.word : "শব্দ পাওয়া যায় নি"}</h1>
            <span>Meaning/Pronounction</span>
            <span>${word.meaning ? word.meaning : "শব্দের অর্থ পাওয়া যায় নি"}/${word.pronunciation ? word.pronunciation : "শব্দের উচ্চারণ পাওয়া যায় নি"}</span>
            <div class="icons flex w-full items-center justify-between px-5">

          <i class="fa-solid fa-info" onclick="loadWordDatils(${word.id})"></i>
            <i class="fa-solid fa-volume-high"></i>
            </div>
        </div>
   `
        wordColumn.append(wordCardElement)   //append word to display
    }

    // loadingAnimation(false)      dont understand spinner????????????????

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
                    <button class="btn lessonBtnClassRemover" id="lessonBtnId${lession.level_no}" onclick="loadlabelWrod(${lession.level_no})" btn-outline btn-primary font-normal"><i class="fa-solid fa-book"></i>
                        Lession-${lession.level_no}</button>
             
        `
        lessonsButtonsContainer.append(lessonBtn)  //append into display

    }
}


