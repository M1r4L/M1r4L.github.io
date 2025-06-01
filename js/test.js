class Question {
    constructor(text, options) {
        this.text = text;
        this.options = options;
    }
}

class PersonalityQuiz {
    constructor(questions, results) {
        this.questions = questions;
        this.results = results;
        this.answersCount = {};
        this.currentQuestionIndex = 0;

        Object.keys(results).forEach(key => {
            this.answersCount[key] = 0;
        });
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    nextQuestion() {
        this.currentQuestionIndex++;
    }

    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }

    registerAnswer(answerKey) {
        if (this.answersCount.hasOwnProperty(answerKey)) {
            this.answersCount[answerKey]++;
        }
        this.nextQuestion();
    }

    getResult() {

        let maxCount = 0;
        let resultKey = Object.keys(this.results)[0];

        for (const [key, count] of Object.entries(this.answersCount)) {
            if (count > maxCount) {
                maxCount = count;
                resultKey = key;
            }
        }

        return this.results[resultKey];
    }
}


const questions = [
    new Question("Как вы проводите свободное время?", {
        "A": "Прокрастинирую",
        "B": "Общаюсь с друзьями",
        "C": "Читаю книги",
        "D": "Работаю над проектами"
    }),
    new Question("Какую музыку ты предпочитаешь?", {
        "A": "Рок, метал, тяжелые жанры",
        "B": "Поп, фолк, авторскую песню",
        "C": "Классику, фламенко, латиноамериканскую музыку",
        "D": "Вообще не люблю гитарную музыку"
    }),
    new Question("Где ты планируешь играть?", {
        "A": "На сцене, в группе, с усилителем",
        "B": "Дома, в походах, для друзей",
        "C": "В музыкальной школе, для себя",
        "D": "Нигде не планирую играть"
    }),
    new Question("Что для вас важнее в работе?", {
        "A": "Технические детали",
        "B": "Общение с коллегами",
        "C": "Творческая реализация",
        "D": "Четкие задачи и результат"
    }),
    new Question("Насколько важен для тебя комфорт при игре?", {
        "A": "Готов терпеть неудобства ради крутого звука",
        "B": "Хочу удобный инструмент для регулярной игры",
        "C": "Комфорт - главное, особенно для новичка",
        "D": "Мне все равно, я не собираюсь играть"
    }),
    new Question("Как часто ты планируешь заниматься?", {
        "A": "Каждый день, серьезно",
        "B": "Пару раз в неделю для души",
        "C": "Регулярно, но без фанатизма",
        "D": "Вообще не планирую"
    }),
    new Question("Что тебя привлекает в гитаре?", {
        "A": "Мощный звук, драйв, крутой вид",
        "B": "Универсальность, возможность петь под нее",
        "C": "Красивый тембр, благородство звучания",
        "D": "Ничего не привлекает"
    }),
    new Question("Какой у тебя бюджет на инструмент?", {
        "A": "Готов потратиться на гитару + оборудование",
        "B": "Хочу что-то недорогое, но качественное",
        "C": "Важен комфорт игры, цена второстепенна",
        "D": "Не хочу тратить деньги на гитару"
    }),
    new Question("Какой стиль игры тебе ближе?", {
        "A": "Мощные риффы, соло, спецэффекты",
        "B": "Аккорды, перебор, пение под гитару",
        "C": "Мелодичный перебор, пальцевые техники",
        "D": "Не представляю себя играющим"
    }),
];

const results = {
    "A": {
        title: "Электрогитара",
        description: "Тебе идеально подойдет электрогитара! Ты рокер в душе, и мощный звук с эффектами - это то, что тебе нужно. Приготовься к громким репетициям и выступлениям!"
    },
    "B": {
        title: "Акустическая гитара",
        description: "Твой выбор - акустическая гитара! Она идеальна для посиделок с друзьями, песен у костра и домашних концертов. Универсальный инструмент для душевного музицирования."
    },
    "C": {
        title: "Классическая гитара",
        description: "Тебе понравится классическая гитара с нейлоновыми струнами. Ее мягкий тембр и удобство идеальны для классических произведений, фламенко и нежных мелодий."
    },
    "D": {
        title: "Другое",
        description: "По результатам теста кажется, что гитара не вызывает у тебя особого энтузиазма. Но не расстраивайся! В мире есть множество других интересных занятий и инструментов - возможно, стоит попробовать что-то другое."
    }
};

const quiz = new PersonalityQuiz(questions, results);

function displayQuestion() {
    if (quiz.hasEnded()) {
        showResult();
    } else {
        const question = quiz.getCurrentQuestion();
        const questionElement = document.getElementById("question");
        const optionsElement = document.getElementById("options");

        questionElement.textContent = question.text;
        optionsElement.innerHTML = "";

        Object.entries(question.options).forEach(([key, text]) => {
            const button = document.createElement("button");
            button.textContent = `${key}: ${text}`;
            button.onclick = () => selectAnswer(key);
            optionsElement.appendChild(button);
        });
    }
}

function selectAnswer(answerKey) {
    quiz.registerAnswer(answerKey);
    displayQuestion();
}

function showResult() {
    const quizElement = document.getElementById("quiz");
    const result = quiz.getResult();

    quizElement.innerHTML = `
    <h1 class="result-title">Ваш результат: ${result.title}</h1>
    <p>${result.description}</p>
    <button onclick="location.reload()">Пройти тест снова</button>
    `;
}

displayQuestion();