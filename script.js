const words = [
    { id: 1, text: "까마귀 오", image: "1.png" },
    { id: 2, text: "날 비", image: "2.png" },
    { id: 3, text: "배 리", image: "3.png" },
    { id: 4, text: "떨어질 락", image: "4.png" },
    { id: 5, text: "나 오", image: "5.png" },
    { id: 6, text: "코 비", image: "6.png" },
    { id: 7, text: "자 척", image: "7.png" },
    { id: 8, text: "씨, 심을 종", image: "8.png" },
    { id: 9, text: "제기, 콩 두", image: "9.png" },
    { id: 10, text: "얻을 득", image: "10.png" },
    { id: 11, text: "흐릴 혼", image: "11.png" },
    { id: 12, text: "온전할 전", image: "12.png" },
    { id: 13, text: "올 래", image: "13.png" },
    { id: 14, text: "아름다울 미", image: "14.png" },
    { id: 15, text: "갈 거", image: "15.png" },
    { id: 16, text: "어찌 하", image: "16.png" },
    { id: 17, text: "깨달을 오", image: "17.png" },
    { id: 18, text: "등잔 등", image: "18.png" },
    { id: 19, text: "밝을 명", image: "19.png" },
    { id: 20, text: "서리 상", image: "20.png" },
    { id: 21, text: "귀 이", image: "21.png" },
    { id: 22, text: "경서 경", image: "22.png" },
    { id: 23, text: "입 구", image: "23.png" },
    { id: 24, text: "무리, 등급 등", image: "24.png" },
    { id: 25, text: "알릴 고 / 청할 곡", image: "25.png" },
    { id: 26, text: "권할 권", image: "26.png" },
    { id: 27, text: "혀 설", image: "27.png" },
    { id: 28, text: "맛 미", image: "28.png" },
    { id: 29, text: "묘할 묘", image: "29.png" },
    { id: 30, text: "잃을, 죽을 상", image: "30.png" },
    { id: 31, text: "잃을 실", image: "31.png" },
    { id: 32, text: "불 취", image: "32.png" },
    { id: 33, text: "칠 타", image: "33.png" },
    { id: 34, text: "푸를 록", image: "34.png" },
    { id: 35, text: "큰 대", image: "35.png" },
    { id: 36, text: "붉을 적", image: "36.png" },
    { id: 37, text: "고울 선", image: "37.png" },
    { id: 38, text: "이미 기", image: "38.png" },
    { id: 39, text: "권세 권", image: "39.png" },
    { id: 40, text: "사사로울 사", image: "40.png" },
    { id: 41, text: "밭 전", image: "41.png" },
    { id: 42, text: "바 소", image: "42.png" },
    { id: 43, text: "점 점", image: "43.png" },
    { id: 44, text: "순박할, 후박나무 박", image: "44.png" }
];

let questionPool = [];
let memorized = [];
let unmemorized = [];
let currentWord = null;
let currentMode = "all";
let currentQuizType = "textToImage";

// 문제 리스트 초기화 및 섞기
function resetQuestions() {
    if (currentMode === "all") {
        questionPool = shuffle([...words]);
    } else if (currentMode === "memorized") {
        questionPool = shuffle([...memorized]);
    } else if (currentMode === "unmemorized") {
        questionPool = shuffle([...unmemorized]);
    }
}

// 학습 모드 변경
document.getElementById("modeSelect").addEventListener("change", (e) => {
    currentMode = e.target.value;
    resetQuestions();
    loadNextQuestion();
});

// 출제 방식 변경
document.getElementById("quizType").addEventListener("change", (e) => {
    currentQuizType = e.target.value;
    loadNextQuestion();
});

// 랜덤 섞기
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// 다음 문제 로드
function loadNextQuestion() {
    if (questionPool.length === 0) {
        resetQuestions();
    }

    if (questionPool.length === 0) {
        document.getElementById("question").textContent = "문제가 없습니다.";
        document.getElementById("image").classList.add("hidden");
        return;
    }

    currentWord = questionPool.pop();

    if (currentQuizType === "textToImage") {
        document.getElementById("question").textContent = currentWord.text;
        document.getElementById("image").src = `images/${currentWord.image}`;
        document.getElementById("image").classList.add("hidden");
    } else {
        document.getElementById("question").textContent = "";
        document.getElementById("image").src = `images/${currentWord.image}`;
        document.getElementById("image").classList.remove("hidden");
    }

    updateProgress();
}

// 진행 상황 업데이트 (현재 문제 번호 포함)
function updateProgress() {
    const totalQuestions = words.length;
    const currentQuestionNumber = totalQuestions - questionPool.length;
    
    document.getElementById("progress").textContent =
        `현재 문제: ${currentQuestionNumber} / ${totalQuestions}  
        | 남은 문제: ${questionPool.length}  
        | 외운 문제: ${memorized.length}  
        | 못 외운 문제: ${unmemorized.length}`;
}


// 정답 보기
document.getElementById("showAnswer").addEventListener("click", () => {
    if (currentQuizType === "textToImage") {
        document.getElementById("image").classList.remove("hidden");
    } else {
        document.getElementById("question").textContent = currentWord.text;
    }
});

// 몰라요
document.getElementById("dontKnow").addEventListener("click", () => {
    if (!unmemorized.includes(currentWord)) {
        unmemorized.push(currentWord);
    }
    loadNextQuestion();
});

// 알아요
document.getElementById("know").addEventListener("click", () => {
    if (!memorized.includes(currentWord)) {
        memorized.push(currentWord);
    }
    loadNextQuestion();
});

// 진행 상황 업데이트
function updateProgress() {
    document.getElementById("progress").textContent = 
        `남은 문제: ${questionPool.length}, 외운 문제: ${memorized.length}, 못 외운 문제: ${unmemorized.length}`;
}

// 초기 문제 설정
resetQuestions();
loadNextQuestion();