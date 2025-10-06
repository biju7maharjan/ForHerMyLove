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
        crossfadeBuffer: 5, // Increased buffer for reliability
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

// Optimized Audio System for Mobile
// Optimized Audio System with Proper Track Transitions
class CosmicAudioSystem {
    constructor(config) {
        this.tracks = [];
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.fadeDuration = config.settings.fadeDuration;
        this.crossfadeBuffer = config.settings.crossfadeBuffer;
        this.volume = config.settings.initialVolume;
        this.loop = config.settings.loop;
        this.isInitialized = false;
        this.audioContainer = document.getElementById('audioContainer');
        this.userInteracted = false;
        this.playbackAttempted = false;

        // Mobile detection
        this.isMobile = this.detectMobile();

        this.init(config.tracks);
        this.setupUserInteraction();
    }

    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    setupUserInteraction() {
        const enableAudio = () => {
            if (!this.userInteracted) {
                this.userInteracted = true;
                console.log('🎵 User interaction detected - audio enabled');

                // Retry playback if it was attempted before user interaction
                if (this.playbackAttempted && !this.isPlaying) {
                    this.startPlaylist();
                }
            }
        };

        ['click', 'touchstart', 'touchend', 'keydown'].forEach(eventType => {
            document.addEventListener(eventType, enableAudio, { once: true, passive: true });
        });
    }

    async init(trackConfigs) {
        try {
            console.log('🎵 Initializing Audio System...');

            // Load fewer tracks on mobile
            const tracksToLoad = this.isMobile ? trackConfigs.slice(0, 4) : trackConfigs;

            for (const trackConfig of tracksToLoad) {
                const audioElement = document.createElement('audio');
                audioElement.id = `track-${trackConfig.id}`;
                audioElement.preload = 'metadata';
                audioElement.muted = true; // Start muted

                const sourceElement = document.createElement('source');
                sourceElement.src = trackConfig.file;
                sourceElement.type = 'audio/mpeg';

                audioElement.appendChild(sourceElement);
                this.audioContainer.appendChild(audioElement);

                const track = {
                    element: audioElement,
                    id: trackConfig.id,
                    name: trackConfig.name,
                    file: trackConfig.file,
                    duration: 0,
                    isLoaded: false,
                    loadError: false
                };

                this.tracks.push(track);
                await this.setupTrackEvents(track);
            }

            console.log(`✅ Audio system initialized with ${this.tracks.length} tracks`);
            this.isInitialized = true;

        } catch (error) {
            console.error('❌ Error initializing audio system:', error);
        }
    }

    setupTrackEvents(track) {
        return new Promise((resolve) => {
            const onLoaded = () => {
                track.duration = track.element.duration;
                track.isLoaded = true;
                console.log(`✅ Track ${track.id} loaded: ${track.name}`);
                resolve();
            };

            const onError = () => {
                console.error(`❌ Failed to load track ${track.id}`);
                track.loadError = true;
                resolve();
            };

            const onEnded = () => {
                console.log(`🔚 Track ${track.id} ended`);
                this.handleTrackEnd();
            };

            // Remove existing listeners first
            track.element.removeEventListener('loadedmetadata', onLoaded);
            track.element.removeEventListener('error', onError);
            track.element.removeEventListener('ended', onEnded);

            // Add new listeners
            track.element.addEventListener('loadedmetadata', onLoaded, { once: true });
            track.element.addEventListener('error', onError, { once: true });
            track.element.addEventListener('ended', onEnded);

            // Load the track
            track.element.load();
        });
    }

    async startPlaylist() {
        if (!this.isInitialized) {
            console.error('❌ Audio system not initialized');
            return false;
        }

        this.playbackAttempted = true;

        // Check if user has interacted with the page
        if (!this.userInteracted) {
            console.log('🎵 Waiting for user interaction before starting audio...');
            return false;
        }

        try {
            this.isPlaying = true;

            // Find the first playable track
            let startIndex = 0;
            while (startIndex < this.tracks.length && this.tracks[startIndex].loadError) {
                startIndex++;
            }

            if (startIndex >= this.tracks.length) {
                console.error('❌ No playable tracks found');
                this.isPlaying = false;
                return false;
            }

            await this.playTrack(startIndex);
            console.log('🎶 Playlist started successfully');
            return true;

        } catch (error) {
            console.error('❌ Error starting playlist:', error);
            this.isPlaying = false;
            return false;
        }
    }

    async playTrack(trackIndex) {
        if (!this.isPlaying) return;

        console.log(`🎵 Attempting to play track ${trackIndex + 1}`);

        if (trackIndex < 0 || trackIndex >= this.tracks.length) {
            console.error('❌ Invalid track index:', trackIndex);
            this.skipToNext();
            return;
        }

        const track = this.tracks[trackIndex];

        if (track.loadError) {
            console.warn(`⚠️ Skipping track ${trackIndex + 1} due to load error`);
            this.skipToNext();
            return;
        }

        // Stop current track if different
        if (this.currentTrackIndex !== trackIndex && this.tracks[this.currentTrackIndex]) {
            await this.stopCurrentTrack();
        }

        this.currentTrackIndex = trackIndex;

        try {
            // Ensure track is ready
            if (!track.isLoaded && !track.loadError) {
                console.log(`🔄 Loading track ${trackIndex + 1}...`);
                await new Promise(resolve => {
                    const checkLoaded = () => {
                        if (track.isLoaded || track.loadError) {
                            resolve();
                        } else {
                            setTimeout(checkLoaded, 100);
                        }
                    };
                    checkLoaded();
                });
            }

            if (track.loadError) {
                this.skipToNext();
                return;
            }

            // Set up track for playback
            track.element.currentTime = 0;
            track.element.muted = false;
            track.element.volume = this.volume;

            console.log(`▶️ Playing: ${track.name}`);
            await track.element.play();

            // Set up time update listener for crossfade
            track.element.addEventListener('timeupdate', () => this.handleTimeUpdate());

            // Preload next track
            const nextIndex = (trackIndex + 1) % this.tracks.length;
            if (!this.tracks[nextIndex].isLoaded && !this.tracks[nextIndex].loadError) {
                this.tracks[nextIndex].element.load();
            }

        } catch (error) {
            console.error(`❌ Error playing track ${trackIndex + 1}:`, error);

            if (error.name === 'NotAllowedError') {
                console.log('🎵 Autoplay prevented, waiting for user interaction...');
                this.userInteracted = false;
                this.isPlaying = false;
            } else {
                this.skipToNext();
            }
        }
    }

    async stopCurrentTrack() {
        const currentTrack = this.tracks[this.currentTrackIndex];
        if (currentTrack && !currentTrack.loadError) {
            try {
                // Remove timeupdate listener
                currentTrack.element.removeEventListener('timeupdate', () => this.handleTimeUpdate());

                // Quick fade out and stop
                await this.quickFadeOut(currentTrack.element);
                currentTrack.element.pause();
                currentTrack.element.currentTime = 0;
            } catch (error) {
                console.warn('⚠️ Error stopping current track:', error);
                currentTrack.element.pause();
                currentTrack.element.currentTime = 0;
            }
        }
    }

    quickFadeOut(audioElement) {
        return new Promise((resolve) => {
            const startVolume = audioElement.volume;
            const duration = 300; // Quick 300ms fade
            const startTime = performance.now();

            const fade = () => {
                const elapsed = performance.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                audioElement.volume = startVolume * (1 - progress);

                if (progress < 1) {
                    requestAnimationFrame(fade);
                } else {
                    resolve();
                }
            };

            fade();
        });
    }

    handleTrackEnd() {
        if (!this.isPlaying) return;

        console.log('🔄 Track ended, preparing next track...');

        if (this.loop || this.currentTrackIndex < this.tracks.length - 1) {
            this.skipToNext();
        } else {
            console.log('⏹️ Playlist completed');
            this.isPlaying = false;
        }
    }

    handleTimeUpdate() {
        if (!this.isPlaying) return;

        const currentTrack = this.tracks[this.currentTrackIndex];
        if (!currentTrack || !currentTrack.isLoaded || currentTrack.loadError) return;

        const timeRemaining = currentTrack.duration - currentTrack.element.currentTime;

        // Start crossfade before track ends (simplified for reliability)
        if (timeRemaining <= 5) { // 5 seconds before end
            this.skipToNext();
        }
    }

    skipToNext() {
        if (!this.isPlaying) return;

        let nextTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
        let attempts = 0;

        // Find next playable track (max 3 attempts to avoid infinite loop)
        while (attempts < 3 && this.tracks[nextTrackIndex].loadError) {
            nextTrackIndex = (nextTrackIndex + 1) % this.tracks.length;
            attempts++;
        }

        if (this.tracks[nextTrackIndex].loadError) {
            console.error('❌ No playable tracks available');
            this.isPlaying = false;
            return;
        }

        console.log(`⏭️ Skipping to track ${nextTrackIndex + 1}`);
        this.playTrack(nextTrackIndex);
    }

    pause() {
        this.isPlaying = false;
        const currentTrack = this.tracks[this.currentTrackIndex];
        if (currentTrack && !currentTrack.loadError && !currentTrack.element.paused) {
            currentTrack.element.pause();
        }
        console.log('⏸️ Playback paused');
    }

    resume() {
        if (!this.isPlaying && this.tracks[this.currentTrackIndex]) {
            const currentTrack = this.tracks[this.currentTrackIndex];
            if (!currentTrack.loadError && currentTrack.element.paused) {
                this.isPlaying = true;
                currentTrack.element.play().then(() => {
                    console.log('▶️ Playback resumed');
                }).catch(error => {
                    console.error('❌ Error resuming playback:', error);
                });
            }
        }
    }

    setVolume(newVolume) {
        this.volume = Math.max(0, Math.min(1, newVolume));
        const currentTrack = this.tracks[this.currentTrackIndex];
        if (currentTrack && !currentTrack.loadError) {
            currentTrack.element.volume = this.volume;
        }
        console.log(`🔊 Volume set to: ${Math.round(this.volume * 100)}%`);
    }

    getPlaybackInfo() {
        const currentTrack = this.tracks[this.currentTrackIndex];
        if (!currentTrack) return null;

        return {
            currentTrack: currentTrack.name,
            trackNumber: this.currentTrackIndex + 1,
            totalTracks: this.tracks.length,
            isPlaying: this.isPlaying,
            volume: Math.round(this.volume * 100),
            currentTime: currentTrack.element.currentTime,
            duration: currentTrack.duration
        };
    }
}

// Optimized Main Website Class
class CosmicLoveWebsite {
    constructor() {
        this.currentSection = 0;
        this.sections = ['naruto', 'mlbb', 'favorites', 'final'];
        this.noClickCount = 0;
        this.maxNoClicks = 5; // Reduced for mobile
        this.loadingProgress = 0;
        this.quoteIndex = 0;
        this.data = websiteData;

        // Mobile detection
        this.isMobile = this.detectMobile();

        this.audioSystem = new CosmicAudioSystem(musicConfig);
        this.init();
    }

    detectMobile() {
        return window.innerWidth <= 768 ||
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    init() {
        this.optimizeForMobile();
        this.startLoading();
        this.setupEventListeners();
        this.createMeteorShower();
    }

    optimizeForMobile() {
        if (this.isMobile) {
            console.log('📱 Mobile optimizations applied');
            // Reduce animation intensity
            this.reduceAnimations();
        }
    }

    reduceAnimations() {
        // These will be handled by CSS, but we can also reduce JS animations
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                * {
                    animation-duration: 0.5s !important;
                    transition-duration: 0.3s !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        // Start button
        document.getElementById('startBtn').addEventListener('click', () => {
            this.hideIntroScreen();
            // Start audio when journey begins
            setTimeout(() => {
                this.audioSystem.startPlaylist().then(success => {
                    if (success) {
                        console.log('🎶 Background music started');
                    } else {
                        console.warn('⚠️ Background music could not be started - user interaction required');
                    }
                });
            }, 500);
        });

        // Next button
        document.getElementById('nextBtn').addEventListener('click', () => {
            if (this.currentSection < this.sections.length - 1) {
                this.showConfirmation();
            } else {
                this.showEndMessage();
            }
        });

        // Yes button (confirmation)
        document.getElementById('yesBtn').addEventListener('click', () => {
            this.proceedToNextSection();
        });

        // No button (confirmation)
        document.getElementById('noBtn').addEventListener('click', (e) => {
            this.handleNoClick(e);
        });

        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.audioSystem.pause();
            } else {
                this.audioSystem.resume();
            }
        });

        // Handle page unload
        window.addEventListener('beforeunload', () => {
            this.audioSystem.pause();
        });

        // Handle window resize for mobile optimization
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    handleResize() {
        // Re-check if mobile on resize
        const wasMobile = this.isMobile;
        this.isMobile = this.detectMobile();

        if (wasMobile !== this.isMobile) {
            console.log('📱 Screen size changed, reapplying optimizations');
            this.optimizeForMobile();
        }
    }

    startLoading() {
        const loadingPercentage = document.querySelector('.loading-percentage');

        // Faster loading on mobile
        const totalLoadingTime = this.isMobile ? 3000 : 6000;
        const updateInterval = 30; // Faster updates
        const totalUpdates = totalLoadingTime / updateInterval;
        const progressIncrement = 100 / totalUpdates;

        const loadingInterval = setInterval(() => {
            this.loadingProgress += progressIncrement;
            loadingPercentage.textContent = `${Math.min(Math.round(this.loadingProgress), 100)}%`;

            if (this.loadingProgress >= 100) {
                clearInterval(loadingInterval);
                setTimeout(() => {
                    this.hideLoadingScreen();
                }, 1000); // Shorter delay on mobile
            }
        }, updateInterval);

        this.startQuoteCycle();
    }

    startQuoteCycle() {
        const quoteElement = document.getElementById('loadingQuote');
        // Faster quote cycling on mobile
        const quoteInterval = this.isMobile ? 1000 : 2000;

        let cycleInterval = setInterval(() => {
            if (this.quoteIndex < this.data.loadingQuotes.length) {
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

        loadingScreen.classList.remove('active');
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            introScreen.classList.remove('hidden');
            introScreen.classList.add('active');

            // Show start button immediately on mobile
            const delay = this.isMobile ? 1000 : 5000;
            setTimeout(() => {
                document.getElementById('startBtn').classList.remove('hidden');
            }, delay);
        }, 500); // Faster transition
    }

    hideIntroScreen() {
        const introScreen = document.getElementById('introScreen');
        const mainContent = document.getElementById('mainContent');
        const navigation = document.getElementById('navigation');

        introScreen.classList.remove('active');
        setTimeout(() => {
            introScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            navigation.classList.remove('hidden');
            this.showSection(0);
        }, 800);
    }

    showSection(sectionIndex) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active', 'hidden');
            section.classList.add('hidden');
        });

        document.getElementById('nextBtn').classList.add('hidden');
        document.getElementById('confirmation').classList.add('hidden');

        if (sectionIndex === 1) this.resetMLBBCards();
        if (sectionIndex === 2) this.resetFavoritesCards();

        const currentSection = document.getElementById(`${this.sections[sectionIndex]}Section`);
        currentSection.classList.remove('hidden');

        setTimeout(() => {
            currentSection.classList.add('active');
            this.populateSectionContent(sectionIndex);

            // Faster reveal on mobile
            const delay = this.isMobile ? 2000 : 5000;
            setTimeout(() => {
                if (sectionIndex < this.sections.length - 1) {
                    document.getElementById('nextBtn').classList.remove('hidden');
                    document.getElementById('nextBtn').textContent = "Warp to Next";
                } else {
                    document.getElementById('nextBtn').classList.remove('hidden');
                    document.getElementById('nextBtn').textContent = "See Cosmic Surprise!";
                }
            }, delay);
        }, 50); // Faster
    }

    resetMLBBCards() {
        ['hayabusaCard', 'kaguraCard', 'flickerCard', 'laylaCard'].forEach(card => {
            document.getElementById(card).classList.remove('active');
            document.getElementById(card).classList.add('hidden');
        });
    }

    resetFavoritesCards() {
        ['colorsCard', 'flowersCard', 'songCard', 'snackCard'].forEach(card => {
            document.getElementById(card).classList.remove('active');
            document.getElementById(card).classList.add('hidden');
        });
    }

    populateSectionContent(sectionIndex) {
        const sectionKey = this.sections[sectionIndex];
        const sectionData = this.data.sections[sectionKey];

        switch (sectionKey) {
            case 'naruto':
                document.getElementById('narutoQuote').textContent = sectionData.quote;
                document.getElementById('narutoPickup').textContent = sectionData.pickupLine;
                break;
            case 'mlbb':
                this.populateMLBB(sectionData);
                break;
            case 'favorites':
                this.populateFavorites(sectionData);
                break;
            case 'final':
                document.getElementById('finalMessage').textContent = sectionData.message;
                document.getElementById('closingMessage').textContent = sectionData.closingMessage;
                break;
        }
    }

    populateMLBB(data) {
        document.getElementById('hayabusaQuote').textContent = data.hayabusa.quote;
        document.getElementById('hayabusaPickup').textContent = data.hayabusa.pickupLine;
        document.getElementById('kaguraQuote').textContent = data.kagura.quote;
        document.getElementById('kaguraPickup').textContent = data.kagura.pickupLine;
        document.getElementById('flickerText').textContent = data.flicker.quote;
        document.getElementById('flickerPickup').textContent = data.flicker.pickupLine;
        document.getElementById('laylaText').textContent = data.layla.quote;
        document.getElementById('laylaPickup').textContent = data.layla.pickupLine;

        // Faster sequencing on mobile
        const delays = this.isMobile ? [300, 600, 900, 1200] : [1000, 2000, 3000, 4000];

        setTimeout(() => {
            document.getElementById('hayabusaCard').classList.remove('hidden');
            setTimeout(() => document.getElementById('hayabusaCard').classList.add('active'), 50);
        }, delays[0]);

        setTimeout(() => {
            document.getElementById('kaguraCard').classList.remove('hidden');
            setTimeout(() => document.getElementById('kaguraCard').classList.add('active'), 50);
        }, delays[1]);

        setTimeout(() => {
            document.getElementById('flickerCard').classList.remove('hidden');
            setTimeout(() => document.getElementById('flickerCard').classList.add('active'), 50);
        }, delays[2]);

        setTimeout(() => {
            document.getElementById('laylaCard').classList.remove('hidden');
            setTimeout(() => document.getElementById('laylaCard').classList.add('active'), 50);
        }, delays[3]);
    }

    populateFavorites(data) {
        const cards = [
            { id: 'colorsCard', textId: 'colorsText', data: data.colors },
            { id: 'flowersCard', textId: 'flowersText', data: data.flowers },
            { id: 'songCard', textId: 'songText', data: data.song },
            { id: 'snackCard', textId: 'snackText', data: data.snack }
        ];

        // Faster sequencing on mobile
        const delayMultiplier = this.isMobile ? 300 : 800;

        cards.forEach((card, index) => {
            setTimeout(() => {
                document.getElementById(card.textId).textContent = card.data.text;
                const cardElement = document.getElementById(card.id);
                cardElement.classList.remove('hidden');
                setTimeout(() => cardElement.classList.add('active'), 50);
            }, index * delayMultiplier);
        });
    }

    showConfirmation() {
        document.getElementById('nextBtn').classList.add('hidden');
        document.getElementById('confirmation').classList.remove('hidden');
        document.getElementById('errorMessage').classList.add('hidden');
        this.noClickCount = 0;
        this.resetNoButtonPosition();
    }

    resetNoButtonPosition() {
        const noBtn = document.getElementById('noBtn');
        noBtn.style.position = 'static';
        noBtn.style.left = '';
        noBtn.style.top = '';
        noBtn.style.transform = '';
        noBtn.style.display = 'block'; // Ensure it's visible
    }

    handleNoClick(e) {
        e.preventDefault();
        e.stopPropagation();

        this.noClickCount++;
        const noBtn = e.target;
        const errorMessage = document.getElementById('errorMessage');
        const messages = [
            "Come on, the universe is waiting! 😅",
            "Esto ta haina holaaaaa! The cosmos demands your attention! 🙄",
            "Pretty please with a supernova on top? 🥺",
            "You know you want to explore the cosmic wonders! 🫨",
            "Just click 'Engage Warp Drive' already! 😭",
            "I'm still gonna orbit around you until you click that yes! 😏",
            "Your persistence is admirable! But the space-time continuum needs you to click yes! 😜",
            "Okay, you win... but not until you click 'Engage Warp Drive'! 🤣",
            "I see you're enjoying the view! But it would be even better at light speed! 😉",
            "ABRACADABRA THE NO BUTTON VANISHES INTO A BLACK HOLE! Now you have to click yes! 😈"
        ];

        errorMessage.textContent = messages[Math.min(this.noClickCount - 1, messages.length - 1)];
        errorMessage.classList.remove('hidden');

        if (this.noClickCount >= this.maxNoClicks) {
            noBtn.style.display = 'none';
            return;
        }

        this.moveNoButtonRandomly(noBtn);
    }

    moveNoButtonRandomly(button) {
        const confirmationButtons = document.querySelector('.confirmation-buttons');
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
        document.getElementById('confirmation').classList.add('hidden');
        document.getElementById('errorMessage').classList.add('hidden');
        this.currentSection++;

        if (this.currentSection < this.sections.length) {
            this.showSection(this.currentSection);
        } else {
            this.showEndMessage();
        }
    }

    showEndMessage() {
        document.getElementById('navigation').classList.add('hidden');

        const finalSection = document.getElementById('finalSection');
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

        finalSection.querySelector('.container').appendChild(endingMessage);

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

        if (!container) {
            container = document.createElement('div');
            container.id = 'meteorShower';
            container.className = 'meteor-shower';
            document.body.appendChild(container);
        }

        // Fewer meteors on mobile
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

// Handle page visibility changes for better performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.cosmicWebsite) {
        window.cosmicWebsite.audioSystem.pause();
    }
});