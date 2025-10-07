// Music Configuration - Ensure file paths are correct
const musicConfig = {
    tracks: [
        { id: 1, name: "Cosmic Melody 1", file: "./favmusic1.mp3" },
        { id: 2, name: "Stellar Harmony", file: "./favmusic2.mp3" },
        { id: 3, name: "Nebula Dreams", file: "./favmusic3.mp3" },
        { id: 4, name: "Galaxy Whispers", file: "./favmusic4.mp3" },
        { id: 5, name: "Orbital Love", file: "./favmusic5.mp3" },
        { id: 6, name: "Starlight Serenade", file: "./favmusic6.mp3" },
        { id: 7, name: "Moonbeam Dance", file: "./favmusic7.mp3" },
        { id: 8, name: "Cosmic Finale", file: "./favmusic8.mp3" }
    ],
    settings: {
        fadeDuration: 1000,
        crossfadeBuffer: 5,
        initialVolume: 0.7,
        loop: true
    }
};

// Website data
const websiteData = {
    title: "For My Love - A Cosmic Journey",
    loadingQuotes: [
        "Initializing cosmic connection...",
        "Downloading starlight data...",
        "Calibrating heart frequency...",
        "Mapping constellation of your smile...",
        "Warping through memories...",
        "Synchronizing our cosmic wavelengths...",
        "Journey through the stars begins now..."
    ],
    sections: {
        naruto: {
            title: "My Cosmic Hokage",
            quote: "In the vast expanse of the universe, there are infinite stars and galaxies, but none shine as brightly as you do in my world. You're my Nine-Tails, my Rasengan, my everything.",
            pickupLine: "If loving you was a shinobi mission, I'd gladly go rogue and break every rule just to complete it successfully."
        },
        mlbb: {
            title: "Your Cosmic Warriors",
            hayabusa: {
                quote: "Like Hayabusa swiftly moving between shadows in the battlefield, you've stealthily captured my heart without me even realizing it was under attack.",
                pickupLine: "You've invaded my thoughts more effectively than Hayabusa's shadow kill, and I don't want you to ever leave my mental space."
            },
            kagura: {
                quote: "As graceful and powerful as Kagura commanding her umbrella through battles, you navigate life with an elegance that leaves everyone mesmerized by your presence.",
                pickupLine: "Your beauty hits harder than Kagura's full combo, and I'm completely stunned - no purification spell can save me from this enchantment."
            },
            flicker: {
                quote: "Just like how you perfectly time your Flicker to escape tricky situations, you've found a way to escape my thoughts - because you're permanently living there rent-free.",
                pickupLine: "You make my heart race faster than Flicker's cooldown reduction, and I wouldn't mind being stunned by your beauty for the rest of my life."
            },
            layla: {
                quote: "That infectious Layla LOL emote laugh is exactly like yours - once I hear it, I can't help but smile and feel like everything in the world is suddenly perfect.",
                pickupLine: "If I had Layla's emote wheel, I'd spam the heart eyes every time I see you, followed by 'I'm carrying you to victory in the game of love' in all chat."
            }
        },
        favorites: {
            title: "Your Cosmic Signature",
            colors: {
                text: "White for your pure heart that shines brighter than any star, and navy blue for the depth of your soul that's more mysterious and beautiful than the deepest parts of the cosmos. Together they create the perfect palette that is uniquely you."
            },
            flowers: {
                text: "The lily represents your elegant grace, the tulip your perfect charm, and baby's breath your delicate beauty that complements everything around you. Just like these flowers, you make every moment more beautiful just by being there."
            },
            song: {
                text: "'m.' by Anil Emre Daldal resonates with your soul perfectly - it's deep, meaningful, and stays with you long after it's over, just like the impression you leave on everyone lucky enough to know you."
            },
            snack: {
                text: "Pani Puri - explosive, full of surprises, and absolutely irresistible. Just like you, each moment is a burst of different flavors that leaves me craving for more. The perfect combination of spicy, tangy, and sweet - much like your personality."
            }
        },
        final: {
            title: "For You, My Starlight",
            message: "My love, let me put this in terms even a pro gamer would understand: You've successfully ganked my heart without any warning, and now I'm permanently CC'd by your charm. My heart's cooldown reduction is at 100% when it comes to thinking about you, and my map awareness is completely focused on your location at all times. You're the MVP of my life, the legendary skin I never knew I needed, and the buff that makes everything better. If life had a scoreboard, you'd be 20-0-15 with all the turrets destroyed because you've completely conquered my defenses.",
            closingMessage: "So here's the deal - I'm pretty sure my heart has downloaded some kind of permanent patch where it only works properly when you're around. You've cast some kind of ultimate spell on me that I never want to be cleansed from. You're the secret OP pick in the game of life, and I'd gladly let you steal all my buffs, my kills, and even the lord if it means seeing that victorious smile at the end of the match. You're my perfect duo queue partner, and I never want to play this game called life without you. 💫"
        }
    }
};

// Simplified Audio System
class CosmicAudioSystem {
    constructor(config) {
        this.tracks = config.tracks;
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.volume = config.settings.initialVolume;
        this.userInteracted = false;
        
        this.audioElement = document.createElement('audio');
        this.audioElement.volume = this.volume;
        this.audioElement.loop = false;
        
        document.getElementById('audioContainer').appendChild(this.audioElement);
        this.setupUserInteraction();
    }

    setupUserInteraction() {
        const enableAudio = () => {
            if (!this.userInteracted) {
                this.userInteracted = true;
                console.log('🎵 User interaction detected - audio enabled');
            }
        };

        ['click', 'touchstart', 'keydown'].forEach(eventType => {
            document.addEventListener(eventType, enableAudio, { once: true });
        });
    }

    async startPlaylist() {
        if (!this.userInteracted) {
            console.log('🎵 Waiting for user interaction...');
            return false;
        }

        this.isPlaying = true;
        return this.playTrack(this.currentTrackIndex);
    }

    async playTrack(trackIndex) {
        if (!this.isPlaying) return;

        const track = this.tracks[trackIndex];
        if (!track) return;

        try {
            this.audioElement.src = track.file;
            this.audioElement.currentTime = 0;
            
            await this.audioElement.play();
            console.log(`▶️ Playing: ${track.name}`);
            
            this.audioElement.onended = () => {
                this.skipToNext();
            };
            
        } catch (error) {
            console.error('❌ Error playing track:', error);
        }
    }

    skipToNext() {
        if (!this.isPlaying) return;
        
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
        this.playTrack(this.currentTrackIndex);
    }

    pause() {
        this.isPlaying = false;
        this.audioElement.pause();
    }

    resume() {
        if (this.isPlaying && !this.audioElement.paused) {
            this.audioElement.play();
        }
    }

    setVolume(newVolume) {
        this.volume = Math.max(0, Math.min(1, newVolume));
        this.audioElement.volume = this.volume;
    }
}

// Main Website Class
class CosmicLoveWebsite {
    constructor() {
        this.currentSection = 0;
        this.sections = ['naruto', 'mlbb', 'favorites', 'final'];
        this.noClickCount = 0;
        this.maxNoClicks = 10;
        this.loadingProgress = 0;
        this.quoteIndex = 0;
        this.data = websiteData;

        this.isMobile = this.detectMobile();
        this.audioSystem = new CosmicAudioSystem(musicConfig);
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    detectMobile() {
        return window.innerWidth <= 768 || 
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    init() {
        console.log('🚀 Initializing Cosmic Love Website...');
        this.startLoading();
        this.setupEventListeners();
        this.createMeteorShower();
    }

    setupEventListeners() {
        // Start button
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.hideIntroScreen();
                setTimeout(() => {
                    this.audioSystem.startPlaylist();
                }, 500);
            });
        }

        // Next button
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (this.currentSection < this.sections.length - 1) {
                    this.showConfirmation();
                } else {
                    this.showEndMessage();
                }
            });
        }

        // Yes button
        const yesBtn = document.getElementById('yesBtn');
        if (yesBtn) {
            yesBtn.addEventListener('click', () => {
                this.proceedToNextSection();
            });
        }

        // No button
        const noBtn = document.getElementById('noBtn');
        if (noBtn) {
            noBtn.addEventListener('click', (e) => {
                this.handleNoClick(e);
            });
        }

        // Handle page visibility
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.audioSystem.pause();
            } else {
                this.audioSystem.resume();
            }
        });
    }

    startLoading() {
        const loadingPercentage = document.querySelector('.loading-percentage');
        const totalLoadingTime = this.isMobile ? 3000 : 6000;
        const updateInterval = 30;
        const totalUpdates = totalLoadingTime / updateInterval;
        const progressIncrement = 100 / totalUpdates;

        const loadingInterval = setInterval(() => {
            this.loadingProgress += progressIncrement;
            if (loadingPercentage) {
                loadingPercentage.textContent = `${Math.min(Math.round(this.loadingProgress), 100)}%`;
            }

            if (this.loadingProgress >= 100) {
                clearInterval(loadingInterval);
                setTimeout(() => {
                    this.hideLoadingScreen();
                }, 1000);
            }
        }, updateInterval);

        this.startQuoteCycle();
    }

    startQuoteCycle() {
        const quoteElement = document.getElementById('loadingQuote');
        const quoteInterval = this.isMobile ? 1000 : 2000;

        let cycleInterval = setInterval(() => {
            if (this.quoteIndex < this.data.loadingQuotes.length && quoteElement) {
                quoteElement.textContent = this.data.loadingQuotes[this.quoteIndex];
                this.quoteIndex++;
            } else {
                clearInterval(cycleInterval);
            }
        }, quoteInterval);
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const introScreen = document.getElementById('introScreen');

        if (loadingScreen && introScreen) {
            loadingScreen.classList.remove('active');
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                introScreen.classList.remove('hidden');
                introScreen.classList.add('active');

                const delay = this.isMobile ? 1000 : 5000;
                setTimeout(() => {
                    const startBtn = document.getElementById('startBtn');
                    if (startBtn) startBtn.classList.remove('hidden');
                }, delay);
            }, 500);
        }
    }

    hideIntroScreen() {
        const introScreen = document.getElementById('introScreen');
        const mainContent = document.getElementById('mainContent');
        const navigation = document.getElementById('navigation');

        if (introScreen && mainContent && navigation) {
            introScreen.classList.remove('active');
            setTimeout(() => {
                introScreen.classList.add('hidden');
                mainContent.classList.remove('hidden');
                navigation.classList.remove('hidden');
                this.showSection(0);
            }, 800);
        }
    }

    showSection(sectionIndex) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active', 'hidden');
            section.classList.add('hidden');
        });

        const nextBtn = document.getElementById('nextBtn');
        const confirmation = document.getElementById('confirmation');
        
        if (nextBtn) nextBtn.classList.add('hidden');
        if (confirmation) confirmation.classList.add('hidden');

        if (sectionIndex === 1) this.resetMLBBCards();
        if (sectionIndex === 2) this.resetFavoritesCards();

        const currentSection = document.getElementById(`${this.sections[sectionIndex]}Section`);
        if (currentSection) {
            currentSection.classList.remove('hidden');
            setTimeout(() => {
                currentSection.classList.add('active');
                this.populateSectionContent(sectionIndex);

                const delay = this.isMobile ? 2000 : 5000;
                setTimeout(() => {
                    if (nextBtn) {
                        nextBtn.classList.remove('hidden');
                        if (sectionIndex < this.sections.length - 1) {
                            nextBtn.textContent = "Warp to Next";
                        } else {
                            nextBtn.textContent = "See Cosmic Surprise!";
                        }
                    }
                }, delay);
            }, 50);
        }
    }

    resetMLBBCards() {
        ['hayabusaCard', 'kaguraCard', 'flickerCard', 'laylaCard'].forEach(card => {
            const cardElement = document.getElementById(card);
            if (cardElement) {
                cardElement.classList.remove('active');
                cardElement.classList.add('hidden');
            }
        });
    }

    resetFavoritesCards() {
        ['colorsCard', 'flowersCard', 'songCard', 'snackCard'].forEach(card => {
            const cardElement = document.getElementById(card);
            if (cardElement) {
                cardElement.classList.remove('active');
                cardElement.classList.add('hidden');
            }
        });
    }

    populateSectionContent(sectionIndex) {
        const sectionKey = this.sections[sectionIndex];
        const sectionData = this.data.sections[sectionKey];

        switch (sectionKey) {
            case 'naruto':
                this.setElementText('narutoQuote', sectionData.quote);
                this.setElementText('narutoPickup', sectionData.pickupLine);
                break;
            case 'mlbb':
                this.populateMLBB(sectionData);
                break;
            case 'favorites':
                this.populateFavorites(sectionData);
                break;
            case 'final':
                this.setElementText('finalMessage', sectionData.message);
                this.setElementText('closingMessage', sectionData.closingMessage);
                break;
        }
    }

    setElementText(id, text) {
        const element = document.getElementById(id);
        if (element) element.textContent = text;
    }

    populateMLBB(data) {
        this.setElementText('hayabusaQuote', data.hayabusa.quote);
        this.setElementText('hayabusaPickup', data.hayabusa.pickupLine);
        this.setElementText('kaguraQuote', data.kagura.quote);
        this.setElementText('kaguraPickup', data.kagura.pickupLine);
        this.setElementText('flickerText', data.flicker.quote);
        this.setElementText('flickerPickup', data.flicker.pickupLine);
        this.setElementText('laylaText', data.layla.quote);
        this.setElementText('laylaPickup', data.layla.pickupLine);

        const delays = this.isMobile ? [300, 600, 900, 1200] : [1000, 2000, 3000, 4000];
        const cards = ['hayabusaCard', 'kaguraCard', 'flickerCard', 'laylaCard'];

        cards.forEach((cardId, index) => {
            setTimeout(() => {
                const card = document.getElementById(cardId);
                if (card) {
                    card.classList.remove('hidden');
                    setTimeout(() => card.classList.add('active'), 50);
                }
            }, delays[index]);
        });
    }

    populateFavorites(data) {
        const cards = [
            { id: 'colorsCard', textId: 'colorsText', data: data.colors },
            { id: 'flowersCard', textId: 'flowersText', data: data.flowers },
            { id: 'songCard', textId: 'songText', data: data.song },
            { id: 'snackCard', textId: 'snackText', data: data.snack }
        ];

        const delayMultiplier = this.isMobile ? 300 : 800;

        cards.forEach((card, index) => {
            setTimeout(() => {
                this.setElementText(card.textId, card.data.text);
                const cardElement = document.getElementById(card.id);
                if (cardElement) {
                    cardElement.classList.remove('hidden');
                    setTimeout(() => cardElement.classList.add('active'), 50);
                }
            }, index * delayMultiplier);
        });
    }

    showConfirmation() {
        const nextBtn = document.getElementById('nextBtn');
        const confirmation = document.getElementById('confirmation');
        const errorMessage = document.getElementById('errorMessage');
        
        if (nextBtn) nextBtn.classList.add('hidden');
        if (confirmation) confirmation.classList.remove('hidden');
        if (errorMessage) errorMessage.classList.add('hidden');
        
        this.noClickCount = 0;
        this.resetNoButtonPosition();
    }

    resetNoButtonPosition() {
        const noBtn = document.getElementById('noBtn');
        if (noBtn) {
            noBtn.style.position = 'static';
            noBtn.style.left = '';
            noBtn.style.top = '';
            noBtn.style.transform = '';
            noBtn.style.display = 'block';
        }
    }

    handleNoClick(e) {
        e.preventDefault();
        e.stopPropagation();

        this.noClickCount++;
        const noBtn = e.target;
        const errorMessage = document.getElementById('errorMessage');
        const messages = [
            "Come on 😅",
            "Esto ta haina holaaaaa! 🙄",
            "Pretty please? 🥺",
            "You know you want to ahemm i mean ahemmm. Arent you curiossssssssssss? 🫨",
            "Just click Engage Warp Drive already! 😭",
            "I'm still gonna chase until you click that Engage Warp Drive! 😏",
            "Your persistence is admirable! But nuh uhhh you gotta click Engage Warp Drive hmmmph 😜",
            "Okay, you win... but not until you click Engage Warp Drive! 🤣",
            "I see you're having fun! But you know it would be more fun if you clicked Engage Warp Drive huhu 😉",
            "NUH UH ABRACADABRA THE NO BUTTON DISAPPEARS universe is calling so Engage Warp Drive hannai parcha! 😈"
        ];

        if (errorMessage) {
            errorMessage.textContent = messages[Math.min(this.noClickCount - 1, messages.length - 1)];
            errorMessage.classList.remove('hidden');
        }

        if (this.noClickCount >= this.maxNoClicks && noBtn) {
            noBtn.style.display = 'none';
            return;
        }

        this.moveNoButtonRandomly(noBtn);
    }

    moveNoButtonRandomly(button) {
        const confirmationButtons = document.querySelector('.confirmation-buttons');
        if (!confirmationButtons || !button) return;

        const buttonsRect = confirmationButtons.getBoundingClientRect();
        const buttonWidth = button.offsetWidth;
        const buttonHeight = button.offsetHeight;
        const maxX = buttonsRect.width - buttonWidth - 10;
        const maxY = buttonsRect.height - buttonHeight - 10;
        const randomX = Math.max(0, Math.min(maxX, Math.random() * maxX));
        const randomY = Math.max(0, Math.min(maxY, Math.random() * maxY));

        button.style.position = 'absolute';
        button.style.left = `${randomX}px`;
        button.style.top = `${randomY}px`;
        button.style.transform = 'none';
    }

    proceedToNextSection() {
        const confirmation = document.getElementById('confirmation');
        const errorMessage = document.getElementById('errorMessage');
        
        if (confirmation) confirmation.classList.add('hidden');
        if (errorMessage) errorMessage.classList.add('hidden');
        
        this.currentSection++;

        if (this.currentSection < this.sections.length) {
            this.showSection(this.currentSection);
        } else {
            this.showEndMessage();
        }
    }

    showEndMessage() {
        const navigation = document.getElementById('navigation');
        if (navigation) navigation.classList.add('hidden');

        const finalSection = document.getElementById('finalSection');
        if (finalSection) {
            const endingMessage = document.createElement('div');
            endingMessage.className = 'ending-message cosmic-card';
            endingMessage.innerHTML = `
                <div class="cosmic-animation">
                    <div class="alien">👽</div>
                    <div class="ufo">🛸</div>
                </div>
                <h2>Mission Complete, Captain!</h2>
                <p>You've successfully navigated through this cosmic journey made just for you, my love! 🚀</p>
                <p>Remember, in the vast universe of possibilities, you'll always be my favorite constellation. 💫</p>
                <p class="console-message">Check the browser console for a secret cosmic message! (Press F12)</p>
            `;

            const container = finalSection.querySelector('.container');
            if (container) container.appendChild(endingMessage);
        }

        console.log(`%c
╔══════════════════════════════════════════════════════╗
║                                                      ║
║   Cosmic Journey Complete! Thank you for exploring   ║
║   this universe I created just for you, my love.     ║
║                                                      ║
║   You're the gravity that keeps me grounded,         ║
║   the starlight that guides me through darkness,     ║
║   and the supernova that brightens my entire         ║
║   existence. Never forget how astronomically         ║
║   amazing you are! 💫                                ║
║                                                      ║
║   This website was crafted with stardust,            ║
║   moonlight, and infinite love just for you.         ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
        `, "color: #FFD166; font-size: 14px; font-weight: bold;");

        console.log("%cYou're my favorite constellation in this vast universe! Keep shining, my starlight! ✨", "color: #5D3FD3; font-size: 16px; font-style: italic;");

        setTimeout(() => {
            this.showCompletionPrompt();
        }, 5000);
    }

    showCompletionPrompt() {
        const promptOverlay = document.createElement('div');
        promptOverlay.className = 'completion-prompt-overlay';
        promptOverlay.innerHTML = `
            <div class="completion-prompt">
                <div class="prompt-icon">🚀</div>
                <h3>Cosmic Journey Complete!</h3>
                <p>Thank you for exploring this universe made just for you, my love!</p>
                <p>You are the most beautiful constellation in my galaxy, and I'm so lucky to orbit around you. 💫</p>
                <div class="prompt-buttons">
                    <button id="restartJourney" class="btn">Restart Journey</button>
                    <button id="closePrompt" class="btn">Keep Exploring</button>
                </div>
            </div>
        `;

        document.body.appendChild(promptOverlay);

        document.getElementById('restartJourney').addEventListener('click', () => {
            location.reload();
        });

        document.getElementById('closePrompt').addEventListener('click', () => {
            document.body.removeChild(promptOverlay);
        });
    }

    createMeteorShower() {
        let container = document.getElementById('meteorShower');
        if (!container) return;

        const meteorCount = this.isMobile ? 3 : 8;
        for (let i = 0; i < meteorCount; i++) {
            const meteor = document.createElement('div');
            meteor.className = 'meteor';
            meteor.style.left = `${Math.random() * 100}%`;
            meteor.style.animationDelay = `${Math.random() * 10}s`;
            meteor.style.animationDuration = `${2 + Math.random() * 3}s`;
            container.appendChild(meteor);
        }
    }
}

// Initialize the website when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.cosmicWebsite = new CosmicLoveWebsite();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.cosmicWebsite) {
        window.cosmicWebsite.audioSystem.pause();
    }
});