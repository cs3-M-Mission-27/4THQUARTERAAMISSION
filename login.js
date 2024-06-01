document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const rememberCheckbox = document.getElementById('remember');
    const togglePassword = document.getElementById('togglePassword');

    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        confirmPasswordInput.setAttribute('type', type);
        togglePassword.classList.toggle('active');
    });

    function setLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }

    function getLocalStorage(key) {
        return localStorage.getItem(key);
    }

    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    function getCookie(name) {
        const cookieName = `${name}=`;
        const cookieArray = document.cookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i].trim();
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return null;
    }

    const savedUsernameLocalStorage = getLocalStorage('username');
    const savedPasswordLocalStorage = getLocalStorage('password');
    const savedRememberLocalStorage = getLocalStorage('remember');

    if (savedUsernameLocalStorage && savedPasswordLocalStorage && savedRememberLocalStorage === 'true') {
        usernameInput.value = savedUsernameLocalStorage;
        passwordInput.value = savedPasswordLocalStorage;
        confirmPasswordInput.value = savedPasswordLocalStorage;
        rememberCheckbox.checked = true;

        alert('You are already logged in!');
        window.location.href = 'index.html';
    }

    const savedUsernameCookie = getCookie('username');
    const savedPasswordCookie = getCookie('password');
    const savedRememberCookie = getCookie('remember');

    if (savedUsernameCookie && savedPasswordCookie && savedRememberCookie === 'true') {
        usernameInput.value = savedUsernameCookie;
        passwordInput.value = savedPasswordCookie;
        confirmPasswordInput.value = savedPasswordCookie;
        rememberCheckbox.checked = true;

        alert('You are already logged in!');
        window.location.href = 'index.html';
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const remember = rememberCheckbox.checked;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (remember) {
            setLocalStorage('username', username);
            setLocalStorage('password', password);
            setLocalStorage('remember', 'true');

            setCookie('username', username, 30);
            setCookie('password', password, 30);
            setCookie('remember', 'true', 30);
        } else {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
            localStorage.removeItem('remember');

            setCookie('username', '', -1);
            setCookie('password', '', -1);
            setCookie('remember', '', -1);
        }

        alert('Account logged in successfully.');
        window.location.href = 'index.html';
    });
});
