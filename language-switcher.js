// Language switcher module
class LanguageSwitcher {
    constructor() {
        this.languages = {};
        this.currentLanguage = 'en';
        this.init();
    }

    // Initialize the language switcher
    async init() {
        try {
            // Load the language data from JSON file
            const response = await fetch('languages.json');
            this.languages = await response.json();
            
            // Get initial language from localStorage or default to English
            const savedLang = localStorage.getItem('preferredLanguage') || 'en';
            
            // Set current language without triggering a reload
            this.currentLanguage = savedLang;
            
            // Update UI directly for first load
            this.updateUI();
            this.updateButtonStates();
            
            // Setup event listeners for language buttons
            this.setupEventListeners();
            
            // Initialize typing text after a slight delay to ensure DOM is ready
            setTimeout(() => {
                this.updateTypingText();
            }, 500);
        } catch (error) {
            console.error('Error initializing language switcher:', error);
        }
    }

    // Setup event listeners for language switching
    setupEventListeners() {
        // English button
        document.getElementById('lang-en').addEventListener('click', () => {
            this.setLanguage('en');
        });

        // Vietnamese button
        document.getElementById('lang-vi').addEventListener('click', () => {
            this.setLanguage('vi');
        });
    }

    // Set the active language
    setLanguage(lang) {
        // If language is changing, reload the page
        const currentLang = localStorage.getItem('preferredLanguage');
        
        // Store the current language
        this.currentLanguage = lang;
        
        // Save preference to localStorage
        localStorage.setItem('preferredLanguage', lang);
        
        // If language changed and not initial load, show loading then reload the page
        if (currentLang && currentLang !== lang) {
            console.log('Language changed, reloading page...');
            
            // Show loading screen before reload
            document.querySelector('body').classList.remove('loaded');
            
            // Reload after a brief delay to show loading screen
            setTimeout(() => {
                window.location.reload();
            }, 800);
            
            return; // Stop execution since page will reload
        }

        // Update UI elements with the selected language
        this.updateUI();

        // Update active state in buttons
        this.updateButtonStates();

        // Update typing text
        this.updateTypingText();
    }

    // Update UI with the current language
    updateUI() {
        // Find all elements with data-lang-key attribute
        const elements = document.querySelectorAll('[data-lang-key]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-lang-key');
            const translation = this.getTranslation(key);
            
            if (translation) {
                element.textContent = translation;
            }
        });

        // Update form placeholders
        this.updateFormPlaceholders();
    }

    // Get translation for a key from the current language
    getTranslation(key) {
        // Split the key by dots to access nested objects
        const keys = key.split('.');
        let translation = this.languages[this.currentLanguage];

        // Navigate through the object using the key parts
        for (const k of keys) {
            if (translation && translation[k] !== undefined) {
                translation = translation[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return null;
            }
        }

        return translation;
    }

    // Update the active state of language buttons
    updateButtonStates() {
        const enButton = document.getElementById('lang-en');
        const viButton = document.getElementById('lang-vi');

        enButton.classList.toggle('active', this.currentLanguage === 'en');
        viButton.classList.toggle('active', this.currentLanguage === 'vi');
    }

    // Update typing text for roles
    updateTypingText() {
        if (window.roleIndex !== undefined) {
            window.roles = this.languages[this.currentLanguage].hero.roles;
            
            // Reset typing to start from beginning with new language
            window.roleIndex = 0;
            window.charIndex = 0;
            window.isDeleting = false;
            
            // Force update of typing text
            if (window.typeRoleTimeout) {
                clearTimeout(window.typeRoleTimeout);
                window.typeRole();
            }
        }
    }

    // Update form placeholders
    updateFormPlaceholders() {
        const form = document.getElementById('contact-form');
        if (form) {
            const translations = this.languages[this.currentLanguage].contact.form;
            
            const nameInput = form.querySelector('input[name="name"]');
            const emailInput = form.querySelector('input[name="email"]');
            const subjectInput = form.querySelector('input[name="subject"]');
            const messageInput = form.querySelector('textarea[name="message"]');
            const submitButton = form.querySelector('button[type="submit"]');

            if (nameInput) nameInput.placeholder = translations.name;
            if (emailInput) emailInput.placeholder = translations.email;
            if (subjectInput) subjectInput.placeholder = translations.subject;
            if (messageInput) messageInput.placeholder = translations.message;
            if (submitButton) {
                const icon = submitButton.innerHTML.split('</i>')[0] + '</i> ';
                submitButton.innerHTML = icon + translations.send;
            }
        }
    }
}

// Initialize language switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageSwitcher = new LanguageSwitcher();
});
