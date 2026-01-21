        // Language System
        let currentLang = 'en';
        
        const translations = {
            en: {
                subtitle: "Ready to test your limits?",
                getStarted: "Get Started",
                wpm: "WPM",
                time: "Time",
                accuracy: "Accuracy",
                restart: "🔄 Restart",
                congratulations: "🎉 Congratulations!",
                playAgain: "Play Again"
            },
            tr: {
                subtitle: "Hızını test etmeye hazır mısın?",
                getStarted: "Başla",
                wpm: "DBK",
                time: "Süre",
                accuracy: "Doğruluk",
                restart: "🔄 Yeniden Başla",
                congratulations: "🎉 Tebrikler!",
                playAgain: "Tekrar Oyna"
            }
        };

        const wordLists = {
            en: [
                "the", "be", "to", "of", "and", "a", "in", "that", "have", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us", "down", "man", "woman", "child", "world", "school", "state", "family", "student", "group", "country", "problem", "hand", "part", "place", "case", "week", "company", "system", "program", "question", "government", "number", "night", "point", "home", "water", "room", "mother", "area", "money", "story", "fact", "month", "lot", "right", "study", "book", "eye", "job", "word", "business", "issue", "side", "kind", "head", "house", "service", "friend", "father", "power", "hour", "game", "line", "end", "member", "law", "car", "city", "community", "name", "president", "team", "minute", "idea", "kid", "body", "information", "parent", "face", "others", "level", "office", "door", "health", "person", "art", "war", "history", "party", "result", "change", "morning", "reason", "low", "win", "research", "girl", "guy", "moment", "air", "teacher", "force", "education"
            ],
            tr: [
                "bir", "ve", "bu", "için", "ne", "daha", "ben", "ile", "o", "var", "ki", "de", "mi", "da", "çok", "şey", "gibi", "en", "ya", "kadar", "ama", "sonra", "göre", "yani", "iki", "zaman", "kendi", "yer", "onlar", "olarak", "sen", "şu", "artık", "bile", "böyle", "olan", "biz", "hem", "hiç", "insan", "işte", "üç", "tam", "iyi", "ay", "siz", "benim", "olan", "herkes", "o", "son", "biri", "zaten", "yeni", "üzere", "önce", "yok", "ancak", "çünkü", "gün", "yine", "ise", "yıl", "bunu", "biri", "hep", "diğer", "bunlar", "sen", "diye", "şimdi", "tam", "olur", "bazen", "her", "bana", "yani", "bunu", "hala", "belki", "şöyle", "her", "işte", "neden", "bir", "sonra", "hele", "hiç", "ancak", "öyle", "hayat", "insan", "dünya", "ev", "gün", "yıl", "adam", "kadın", "çocuk", "okul", "iş", "su", "el", "göz", "yüz", "baş", "güzel", "küçük", "büyük", "yeni", "eski", "iyi", "kötü", "beyaz", "siyah", "kırmızı", "mavi", "yeşil", "sarı", "gelmek", "gitmek", "vermek", "almak", "yapmak", "etmek", "demek", "olmak", "bilmek", "görmek", "duymak", "söylemek", "anlamak", "düşünmek", "istemek", "sevmek", "bakmak", "bulmak", "çıkmak", "kalmak", "gelmek", "başlamak", "bitmek", "açmak", "kapatmak", "okumak", "yazmak", "konuşmak", "dinlemek", "yemek", "içmek", "oturmak", "kalkmak", "yürümek", "koşmak", "düşmek", "atlamak", "uçmak", "yüzmek", "uyumak", "uyanmak", "güldürmek", "ağlamak", "şaşırmak", "korkmak", "üzülmek", "sevinmek"
            ]
        };

        let charIndex = 0;
        let timer = 60;
        let interval = null;
        let isStarted = false;
        let correctChars = 0;
        let incorrectChars = 0;
        let totalCharsTyped = 0;

        const menu = document.getElementById('main-menu');
        const gameContainer = document.getElementById('game-container');
        const startBtn = document.getElementById('gts');
        const textDisplay = document.getElementById('text-display');
        const inputField = document.getElementById('hidden-input');
        const wpmDisplay = document.getElementById('wpm');
        const timerDisplay = document.getElementById('timer');
        const accuracyDisplay = document.getElementById('accuracy-display');
        const progressFill = document.getElementById('progress-fill');
        const restartBtn = document.getElementById('restart-btn');
        const resultModal = document.getElementById('result-modal');
        const playAgainBtn = document.getElementById('play-again');
        const langButtons = document.querySelectorAll('.lang-btn');

        // Language selection
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                langButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentLang = btn.dataset.lang;
                updateUILanguage();
            });
        });

        function updateUILanguage() {
            const t = translations[currentLang];
            document.getElementById('subtitle').innerText = t.subtitle;
            startBtn.innerText = t.getStarted;
            document.querySelector('.stat-label').innerText = t.wpm;
            document.querySelectorAll('.stat-label')[1].innerText = t.time;
            document.querySelectorAll('.stat-label')[2].innerText = t.accuracy;
            restartBtn.innerText = t.restart;
            document.querySelector('#result-content h2').innerText = t.congratulations;
            playAgainBtn.innerText = t.playAgain;
            document.querySelectorAll('.result-stat-label')[0].innerText = t.wpm;
            document.querySelectorAll('.result-stat-label')[1].innerText = t.accuracy;
        }

        startBtn.addEventListener('click', startGame);
        restartBtn.addEventListener('click', () => location.reload());
        playAgainBtn.addEventListener('click', () => location.reload());

        function startGame() {
            menu.classList.add('hidden');
            gameContainer.classList.remove('hidden');
            updateUILanguage();
            initGame();
        }

        function generateWords(count = 100) {
            const wordList = wordLists[currentLang];
            const words = [];
            for (let i = 0; i < count; i++) {
                words.push(wordList[Math.floor(Math.random() * wordList.length)]);
            }
            return words.join(" ") + " ";
        }

        function initGame() {
            const text = generateWords();
            textDisplay.innerHTML = "";
            
            text.split("").forEach(char => {
                const span = document.createElement("span");
                span.innerText = char;
                span.className = "char";
                textDisplay.appendChild(span);
            });

            const chars = textDisplay.querySelectorAll('.char');
            if (chars.length > 0) {
                chars[0].classList.add('char-current');
            }

            charIndex = 0;
            timer = 60;
            isStarted = false;
            correctChars = 0;
            incorrectChars = 0;
            totalCharsTyped = 0;

            timerDisplay.innerText = timer;
            wpmDisplay.innerText = 0;
            accuracyDisplay.innerText = "100%";
            progressFill.style.width = "0%";

            inputField.value = "";
            inputField.disabled = false;
            inputField.focus();
        }

        inputField.addEventListener('input', (e) => {
            const characters = textDisplay.querySelectorAll('.char');
            
            if (!isStarted && e.inputType !== "deleteContentBackward") {
                startTimer();
            }

            if (e.inputType === "deleteContentBackward") {
                handleBackspace(characters);
            } else {
                handleTyping(e.data, characters);
            }

            inputField.value = "";
            updateStats();
        });

        function handleBackspace(characters) {
            if (charIndex > 0) {
                characters[charIndex].classList.remove('char-current');
                charIndex--;
                
                const prevChar = characters[charIndex];
                if (prevChar.classList.contains('char-correct')) {
                    correctChars--;
                } else if (prevChar.classList.contains('char-incorrect')) {
                    incorrectChars--;
                }
                totalCharsTyped--;
                
                prevChar.classList.remove('char-correct', 'char-incorrect');
                prevChar.classList.add('char-current');
            }
        }

        function handleTyping(typedChar, characters) {
            if (charIndex >= characters.length) return;

            const currentChar = characters[charIndex];
            const targetChar = currentChar.innerText;

            currentChar.classList.remove('char-current');

            if (typedChar === targetChar) {
                currentChar.classList.add('char-correct');
                correctChars++;
            } else {
                currentChar.classList.add('char-incorrect');
                incorrectChars++;
            }

            totalCharsTyped++;
            charIndex++;

            if (charIndex < characters.length) {
                characters[charIndex].classList.add('char-current');
                
                // Improved scroll effect - keep current word in view
                const currentCharElement = characters[charIndex];
                const container = textDisplay;
                const charTop = currentCharElement.offsetTop;
                const charHeight = currentCharElement.offsetHeight;
                const containerHeight = container.clientHeight;
                const scrollTop = container.scrollTop;
                
                // Scroll when character is in the bottom third of the visible area
                if (charTop - scrollTop > containerHeight * 0.6) {
                    container.scrollTop = charTop - containerHeight * 0.3;
                }
            }
        }

        function startTimer() {
            isStarted = true;
            interval = setInterval(() => {
                if (timer > 0) {
                    timer--;
                    timerDisplay.innerText = timer;
                    updateProgress();
                } else {
                    endGame();
                }
            }, 1000);
        }

        function updateStats() {
            const timeElapsed = (60 - timer) / 60;
            
            if (timeElapsed > 0) {
                const wpm = Math.round((correctChars / 5) / timeElapsed);
                wpmDisplay.innerText = wpm >= 0 ? wpm : 0;
            }

            if (totalCharsTyped > 0) {
                const accuracy = Math.round((correctChars / totalCharsTyped) * 100);
                accuracyDisplay.innerText = accuracy + "%";
            }
        }

        function updateProgress() {
            const progress = ((60 - timer) / 60) * 100;
            progressFill.style.width = progress + "%";
        }

        function endGame() {
            clearInterval(interval);
            isStarted = false;
            inputField.disabled = true;

            const finalWPM = wpmDisplay.innerText;
            const finalAccuracy = accuracyDisplay.innerText;

            document.getElementById('final-wpm').innerText = finalWPM;
            document.getElementById('final-accuracy').innerText = finalAccuracy;

            resultModal.classList.remove('hidden');
        }

        // Focus management
        document.addEventListener('click', (e) => {
            if (!resultModal.classList.contains('hidden')) return;
            if (e.target.id !== 'restart-btn' && e.target.id !== 'gts' && !e.target.classList.contains('lang-btn')) {
                inputField.focus();
            }
        });

        // Prevent context menu on text display
        textDisplay.addEventListener('contextmenu', (e) => e.preventDefault());