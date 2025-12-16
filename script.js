document.addEventListener("DOMContentLoaded", () => {
  // --- Element Cache ---
  const loginContainer = document.getElementById("login-container");
  const dashboardContainer = document.getElementById("dashboard-container");
  const loginForm = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginError = document.getElementById("login-error");
  const logoutButtonDesktop = document.getElementById("logout-button-desktop");
  const logoutButtonMobile = document.getElementById("logout-button-mobile");
  const dashboardNavBtn = document.getElementById("dashboard-nav-btn");
  const historyNavBtn = document.getElementById("history-nav-btn");
  const financeNavBtn = document.getElementById("finance-nav-btn");
  const settingsNavBtn = document.getElementById("settings-nav-btn"); 

  // Desktop Navigation
  const desktopSettingsNav = document.getElementById("desktop-settings-nav");
  const desktopLogoutBtn = document.getElementById("desktop-logout-btn");
  const backHomeBtn = document.getElementById("back-home-btn");
  
  // Desktop Home Cards
  const desktopHomeCards = document.getElementById("desktop-home-cards");
  const homeCardDashboard = document.getElementById("home-card-dashboard");
  const homeCardHistory = document.getElementById("home-card-history");
  const homeCardFinance = document.getElementById("home-card-finance");
  const desktopNotificationsList = document.getElementById("desktop-notifications-list");

  // Login CAPTCHA & OTP
  const captchaCanvas = document.getElementById("captcha-canvas");
  const reloadCaptchaBtn = document.getElementById("reload-captcha-btn");
  const captchaInput = document.getElementById("captcha-input");
  const loginOtpModal = document.getElementById("login-otp-modal");
  const loginOtpInput = document.getElementById("login-otp-input");
  const loginOtpError = document.getElementById("login-otp-error");
  const loginOtpCancelBtn = document.getElementById("login-otp-cancel-btn");
  const loginOtpVerifyBtn = document.getElementById("login-otp-verify-btn");
  
  // Biometric Modal
  const biometricSetupModal = document.getElementById("biometric-setup-modal");
  const biometricSkipBtn = document.getElementById("biometric-skip-btn");
  const biometricEnableBtn = document.getElementById("biometric-enable-btn");
  
  // Sections
  const dashboardSection = document.getElementById("dashboard-section");
  const historySection = document.getElementById("history-section");
  const financeSection = document.getElementById("finance-section");
  const settingsSection = document.getElementById("settings-section"); 
  
  // All sections array for easy management
  const allSections = [dashboardSection, historySection, financeSection, settingsSection];
  
  // Maintenance Portal
  const flatList = document.getElementById("flat-list");
  const floorNavigation = document.getElementById("floor-navigation");
  const flatNumberNavigation = document.getElementById("flat-number-navigation");
  const backToAllFlatsBtn = document.getElementById("back-to-all-flats-btn");

  // History Portal
  const searchButton = document.getElementById("search-button");
  const flatSearchInput = document.getElementById("flat-search-input");
  const searchResultsDropdown = document.getElementById("search-results-dropdown");
  const showAllButton = document.getElementById("show-all-button");
  const paymentHistoryTableContainer = document.getElementById("payment-history-table-container");
  const generatePdfButton = document.getElementById("generate-pdf-button");
  const generateSearchedFlatPdfButton = document.getElementById("generate-searched-flat-pdf-button");

  // Finance Portal
  const totalFundsDisplay = document.getElementById("total-funds");
  const addFundAmountInput = document.getElementById("add-fund-amount");
  const addFundDateInput = document.getElementById("add-fund-date");
  const addFundReasonInput = document.getElementById("add-fund-reason");
  const addFundBtn = document.getElementById("add-fund-btn");
  const deductFundAmountInput = document.getElementById("deduct-fund-amount");
  const deductFundDateInput = document.getElementById("deduct-fund-date");
  const deductFundReasonInput = document.getElementById("deduct-fund-reason");
  const deductFundBtn = document.getElementById("deduct-fund-btn");
  const budgetHistoryTableContainer = document.getElementById("budget-history-table-container");
  const generateBudgetPdfButton = document.getElementById("generate-budget-pdf-button");
  const overallProfitLossPdfBtn = document.getElementById("overall-profit-loss-pdf-btn");
  const financialYearSelect = document.getElementById("financial-year-select");
  const txnHistoryYearSelect = document.getElementById("txn-history-year-select"); 
  const plReportYearSelect = document.getElementById("pl-report-year-select");
  const generateAnnualStatementPdfBtn = document.getElementById("generate-annual-statement-pdf-btn");

  // Settings Portal
  const maintenanceAmountInput = document.getElementById("maintenance-amount-input");
  const saveSettingsBtn = document.getElementById("save-settings-btn");
  const settingsOtpModal = document.getElementById("settings-otp-modal");
  const settingsOtpInput = document.getElementById("settings-otp-input");
  const settingsOtpError = document.getElementById("settings-otp-error");
  const settingsOtpCancelBtn = document.getElementById("settings-otp-cancel-btn");
  const settingsOtpVerifyBtn = document.getElementById("settings-otp-verify-btn");
  
  // Email Update Settings
  const emailFlatSearch = document.getElementById("email-flat-search");
  const emailFlatDropdown = document.getElementById("email-flat-dropdown");
  const currentEmailsContainer = document.getElementById("current-emails-container");
  const currentEmailsList = document.getElementById("current-emails-list");
  const saveAllEmailsBtn = document.getElementById("save-all-emails-btn");

  // Sidebar & Notifications
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const mainContent = document.getElementById("main-content");
  const notificationsList = document.getElementById("notifications-list");

  // Forgot Password Modal
  const forgotPasswordBtn = document.getElementById("forgot-password-btn");
  const forgotPasswordModal = document.getElementById("forgot-password-modal");
  const forgotStep1 = document.getElementById("forgot-step-1-email");
  const forgotStep2 = document.getElementById("forgot-step-2-otp");
  const forgotStep3 = document.getElementById("forgot-step-3-success");
  const forgotEmailInput = document.getElementById("forgot-email-input");
  const forgotEmailError = document.getElementById("forgot-email-error");
  const forgotCancelBtn = document.getElementById("forgot-cancel-btn");
  const forgotEmailNextBtn = document.getElementById("forgot-email-next-btn");
  const forgotOtpInput = document.getElementById("forgot-otp-input");
  const forgotOtpError = document.getElementById("forgot-otp-error");
  const forgotCancelBtn2 = document.getElementById("forgot-cancel-btn-2");
  const forgotOtpVerifyBtn = document.getElementById("forgot-otp-verify-btn");
  const forgotSuccessCloseBtn = document.getElementById("forgot-success-close-btn");


  // --- Constants & State ---
  const BACKEND_URL = window.location.origin; 
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "pass"; 
  const ADMIN_EMAIL = "kush.work1310@gmail.com";
  
  // Demo Credentials - bypass OTP everywhere
  const DEMO_USERNAME = "demo_userflat1";
  const DEMO_PASSWORD = "pass_demouser1";
  let isDemoMode = false;
  
  let currentCaptcha = "";
  let activeSection = null; 
  let newMaintenanceAmount = 0; 
  let currentSelectedFloor = null;
  let currentSelectedFlatNumber = null;
  let selectedEmailFlat = null;
  let pendingEmailChanges = {}; // Store multiple email changes
  let editingEmailIndex = null;
  
  // 15 years: 2023 to 2038
  const MAINTENANCE_YEARS = Array.from({length: 16}, (_, i) => 2023 + i);
  const SKELETON_MIN_TIME = 1500; // 1.5 seconds minimum skeleton loading

  const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let flats = {};
  const floorMap = {
    "1st Floor": ["101", "102", "103", "104"],
    "2nd Floor": ["201", "202", "203", "204"],
    "3rd Floor": ["301", "302", "303", "304"],
    "4th Floor": ["401", "402", "403", "404"],
    "5th Floor": ["501", "502", "503", "504"],
    "6th Floor": ["601", "602", "603", "604"],
  };

  // Initialize FLAT_EMAIL_MAP from localStorage or defaults
  const defaultEmailMap = {
    "101": ["s22cp38@gmail.com"],
    "102": ["owner102@example.com"],
    "103": ["owner103-a@example.com", "owner103-b@example.com"],
    "104": ["owner104@example.com"],
    "201": ["owner201@example.com"],
    "202": ["owner202@example.com"],
    "203": ["owner203@example.com"],
    "204": ["owner204@example.com"],
    "301": ["owner301@example.com"],
    "302": ["owner302@example.com"],
    "303": ["kushshah900@gmail.com"],
    "304": ["owner304@example.com"],
    "401": ["owner401@example.com"],
    "402": ["owner402@example.com"],
    "403": ["owner403@example.com"],
    "404": ["owner404@example.com"],
    "501": ["owner501@example.com"],
    "502": ["owner502@example.com"],
    "503": ["owner503@example.com"],
    "504": ["owner504@example.com"],
    "601": ["owner601@example.com"],
    "602": ["owner602@example.com"],
    "603": ["owner603@example.com"],
    "604": ["owner604@example.com"],
  };

  let FLAT_EMAIL_MAP = getFromStorage("flatEmailMap", null) || defaultEmailMap;
  
  // Check for biometric credentials
  const biometricCredentials = getFromStorage("biometricCredentials", null);
  
  // Check if device supports biometrics (mobile only)
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && window.innerWidth < 1024;
  }
  
  function supportsWebAuthn() {
    return window.PublicKeyCredential !== undefined && isMobileDevice();
  }


  // --- Custom Modal System (Replace SweetAlerts) ---
  function showCustomModal(options) {
    const { title, message, icon = 'info', confirmText = 'OK', cancelText = null, onConfirm = null, onCancel = null, showLoading = false } = options;
    
    const iconHtml = {
      success: `<div class="custom-modal-icon success"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>`,
      error: `<div class="custom-modal-icon error"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>`,
      warning: `<div class="custom-modal-icon warning"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></div>`,
      info: `<div class="custom-modal-icon info"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></div>`,
      loading: `<div class="custom-modal-icon loading"><div class="spinner"></div></div>`
    };
    
    const loadingHtml = showLoading ? iconHtml.loading : iconHtml[icon];
    
    const modalHtml = `
      <div class="custom-modal-overlay" id="custom-modal-overlay">
        <div class="custom-modal">
          ${loadingHtml}
          <h3 class="custom-modal-title">${title}</h3>
          ${message ? `<p class="custom-modal-message">${message}</p>` : ''}
          ${!showLoading ? `
            <div class="custom-modal-actions">
              ${cancelText ? `<button class="btn-secondary btn-sm custom-modal-cancel">${cancelText}</button>` : ''}
              <button class="btn-primary btn-sm custom-modal-confirm">${confirmText}</button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const overlay = document.getElementById('custom-modal-overlay');
    
    if (!showLoading) {
      const confirmBtn = overlay.querySelector('.custom-modal-confirm');
      const cancelBtn = overlay.querySelector('.custom-modal-cancel');
      
      confirmBtn?.addEventListener('click', () => {
        closeCustomModal();
        if (onConfirm) onConfirm();
      });
      
      cancelBtn?.addEventListener('click', () => {
        closeCustomModal();
        if (onCancel) onCancel();
      });
    }
    
    return overlay;
  }
  
  function closeCustomModal() {
    const overlay = document.getElementById('custom-modal-overlay');
    if (overlay) {
      overlay.classList.add('closing');
      setTimeout(() => overlay.remove(), 200);
    }
  }
  
  function showLoadingModal(title, message) {
    return showCustomModal({ title, message, showLoading: true });
  }
  
  function showSuccessModal(title, message) {
    return showCustomModal({ title, message, icon: 'success' });
  }
  
  function showErrorModal(title, message) {
    return showCustomModal({ title, message, icon: 'error' });
  }
  
  function showWarningModal(title, message) {
    return showCustomModal({ title, message, icon: 'warning' });
  }
  
  function showConfirmModal(title, message, onConfirm, onCancel) {
    return showCustomModal({ title, message, icon: 'warning', confirmText: 'Yes', cancelText: 'Cancel', onConfirm, onCancel });
  }

  // Toast notification
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `custom-toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
      <span class="toast-message">${message}</span>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }


  function showModal(modalElement) {
    modalElement.classList.remove("hidden", "is-hiding");
  }

  function hideModal(modalElement) {
    if (modalElement) { 
      modalElement.classList.add("is-hiding");
      setTimeout(() => { modalElement.classList.add("hidden"); }, 200); 
    }
  }

  function formatDate(inputDate) {
    if (!inputDate) return "N/A";
    const date = new Date(inputDate);
    if (isNaN(date.getTime())) return "Invalid Date";
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
    return `${String(adjustedDate.getDate()).padStart(2, "0")}-${String(adjustedDate.getMonth() + 1).padStart(2, "0")}-${adjustedDate.getFullYear()}`;
  }
  
  function getDateObj(dateStr) {
    if (typeof dateStr === 'string' && dateStr.includes('-')) {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        if (!isNaN(date.getTime())) return date;
      }
    }
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? new Date(0) : date; 
  }

  // --- Skeleton Loading (1.5 second minimum) ---
  function showSkeletonLoader(container, type = 'buttons', count = 6) {
    let skeletonHtml = '<div class="skeleton-container"><div class="skeleton-loader">';
    
    if (type === 'buttons') {
      for (let i = 0; i < count; i++) {
        skeletonHtml += `<div class="skeleton skeleton-button" style="animation-delay: ${i * 0.1}s"></div>`;
      }
    } else if (type === 'card') {
      skeletonHtml += '<div class="skeleton skeleton-card"></div>';
    } else if (type === 'table') {
      skeletonHtml += '<div class="skeleton skeleton-table"></div>';
    }
    
    skeletonHtml += '</div></div>';
    container.innerHTML = skeletonHtml;
  }

  async function withSkeletonLoading(container, type, count, callback) {
    const startTime = Date.now();
    showSkeletonLoader(container, type, count);
    
    // Minimum 1.5 second skeleton loading
    await new Promise(resolve => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(SKELETON_MIN_TIME - elapsed, 0);
      setTimeout(resolve, remaining);
    });
    
    callback();
  }

  // --- Sidebar & Navigation ---
  function toggleSidebar() {
    sidebar.classList.toggle("-translate-x-full");
    hamburgerBtn.classList.toggle("active");
    sidebarOverlay.classList.toggle("hidden");
  }

  hamburgerBtn.addEventListener("click", toggleSidebar);
  sidebarOverlay.addEventListener("click", toggleSidebar);

  function showDesktopHome() {
    if (desktopHomeCards) desktopHomeCards.style.display = "flex";
    mainContent.style.display = "none";
    if (backHomeBtn) backHomeBtn.classList.remove("visible");
    activeSection = null;
  }
  
  function hideDesktopHome() {
    if (desktopHomeCards) desktopHomeCards.style.display = "none";
    mainContent.style.display = "block";
    if (backHomeBtn && window.innerWidth >= 1024) backHomeBtn.classList.add("visible");
  }
  
  // Close all sections
  function closeAllSections() {
    allSections.forEach(section => {
      if (section) {
        section.style.display = 'none';
        section.classList.remove('is-entering', 'is-exiting');
      }
    });
  }

  function navigateToSection(buttonToActivate, sectionToShow, showSkeleton = true) {
    hideDesktopHome();
    
    // Close all other sections immediately
    closeAllSections();
    
    document.querySelectorAll(".main-nav button").forEach((btn) => btn.classList.remove("active"));
    if (buttonToActivate) buttonToActivate.classList.add("active");

    sectionToShow.style.display = "block";
    sectionToShow.classList.add("is-entering");
    activeSection = sectionToShow;
    
    setTimeout(() => { sectionToShow.classList.remove("is-entering"); }, 350); 

    if (!sidebar.classList.contains("-translate-x-full")) {
      toggleSidebar();
    }
  }

  // Back to Home button for desktop
  if (backHomeBtn) {
    backHomeBtn.addEventListener("click", () => {
      closeAllSections();
      showDesktopHome();
    });
  }

  // --- Local Storage & Data Functions ---
  function getFromStorage(key, defaultValue) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error(`Error loading ${key} from local storage`, e);
      return defaultValue;
    }
  }

  function saveToStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`Error saving ${key} to local storage`, e);
    }
  }
  
  function getMaintenanceAmount() {
    return getFromStorage("maintenanceAmount", 500); 
  }

  const createBlankYear = () => {
    return MONTHS_SHORT.reduce((acc, month) => { acc[month] = false; return acc; }, {});
  };

  function getFlatData() {
    const staticFlatNames = Object.values(floorMap).flat();
    const data = getFromStorage("flatMaintenanceData", {});

    staticFlatNames.forEach((flatName) => {
      if (!data[flatName]) {
        data[flatName] = { id: flatName, name: flatName, status: "Owned", maintenanceStatus: {}, paymentHistory: [] };
      } 
      if (typeof data[flatName].maintenanceStatus !== 'object' || data[flatName].maintenanceStatus === null || Array.isArray(data[flatName].maintenanceStatus)) {
        data[flatName].maintenanceStatus = {};
      }
      for (const year of MAINTENANCE_YEARS) {
        if (!data[flatName].maintenanceStatus[year]) {
          data[flatName].maintenanceStatus[year.toString()] = createBlankYear();
        }
      }
    });
    
    saveToStorage("flatMaintenanceData", data);
    return data;
  }

  function getBudgetData() {
    return getFromStorage("budgetData", { totalFunds: 0, transactions: [] });
  }
  
  function getNotifications() {
    return getFromStorage("notifications", []);
  }

  function addNotification(message) {
    const notifications = getNotifications();
    const newNotification = { message: message, timestamp: new Date().toISOString() };
    const updatedNotifications = [newNotification, ...notifications].slice(0, 10);
    saveToStorage("notifications", updatedNotifications);
    renderNotifications();
  }
  
  function renderNotifications() {
    const notifications = getNotifications();
    const noNotifHtml = `<div class="bg-gray-100 p-3 rounded-lg"><p class="text-sm text-gray-700 font-medium">No new notifications</p><p class="text-xs text-gray-500">All systems are operational.</p></div>`;
    
    if (notifications.length === 0) {
      if (notificationsList) notificationsList.innerHTML = noNotifHtml;
      if (desktopNotificationsList) desktopNotificationsList.innerHTML = noNotifHtml;
      return;
    }
    
    const html = notifications.map(n => {
      const timeAgo = new Date(n.timestamp);
      return `<div class="notification-item"><p class="text-sm text-cyan-800 font-medium">${n.message}</p><p class="text-xs text-cyan-500">${timeAgo.toLocaleString()}</p></div>`;
    }).join('');
    
    if (notificationsList) notificationsList.innerHTML = html;
    if (desktopNotificationsList) desktopNotificationsList.innerHTML = html;
  }


  // --- Authentication ---
  function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; 
    let text = "";
    for (let i = 0; i < 5; i++) { text += chars.charAt(Math.floor(Math.random() * chars.length)); }
    currentCaptcha = text;
    
    if (!captchaCanvas) return; 
    const ctx = captchaCanvas.getContext("2d");
    ctx.clearRect(0, 0, captchaCanvas.width, captchaCanvas.height);
    ctx.fillStyle = "#f0f4f8"; 
    ctx.fillRect(0, 0, captchaCanvas.width, captchaCanvas.height);
    
    for(let i = 0; i < 3; i++) {
      ctx.strokeStyle = `rgba(${Math.random()*150}, ${Math.random()*150}, ${Math.random()*150}, 0.2)`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * captchaCanvas.width, Math.random() * captchaCanvas.height);
      ctx.lineTo(Math.random() * captchaCanvas.width, Math.random() * captchaCanvas.height);
      ctx.stroke();
    }
    
    ctx.font = "bold 24px Inter, sans-serif";
    ctx.fillStyle = "#0891b2";
    ctx.textAlign = "center"; 
    ctx.textBaseline = "middle";
    ctx.fillText(text, captchaCanvas.width / 2, captchaCanvas.height / 2);
  }

  function showLogin() {
    loginContainer.style.display = "flex";
    dashboardContainer.style.display = "none";
    generateCaptcha();
    usernameInput.value = "";
    passwordInput.value = "";
    captchaInput.value = "";
    loginError.textContent = "";
    isDemoMode = false;
  }

  function showDashboard() {
    loginContainer.style.display = "none";
    dashboardContainer.style.display = "block";
    flats = getFlatData();
    renderNotifications();
    
    // On desktop, show home cards. On mobile, show nothing until user clicks a tab
    if (window.innerWidth >= 1024) {
      showDesktopHome();
    } else {
      // Mobile: hide all sections initially
      closeAllSections();
      mainContent.style.display = "block";
    }
  }

  reloadCaptchaBtn.addEventListener("click", generateCaptcha);

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();
      const captcha = captchaInput.value.trim().toUpperCase();

      // Check for demo credentials
      if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
        isDemoMode = true;
        if (captcha !== currentCaptcha) {
          loginError.textContent = "Invalid CAPTCHA.";
          generateCaptcha();
          return;
        }
        // Demo mode - bypass OTP completely
        saveToStorage("isAuthenticated", "true");
        showToast('Demo Mode - Login Successful!', 'success');
        showDashboard();
        return;
      }

      if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        loginError.textContent = "Invalid username or password.";
        return;
      }
      if (captcha !== currentCaptcha) {
        loginError.textContent = "Invalid CAPTCHA.";
        generateCaptcha();
        return;
      }
      
      // Check if biometric credentials exist (skip OTP)
      if (biometricCredentials && isMobileDevice()) {
        saveToStorage("isAuthenticated", "true");
        showToast('Login Successful!', 'success');
        showDashboard();
        return;
      }

      const loginButton = loginForm.querySelector('button[type="submit"]');
      loginButton.disabled = true;
      loginError.textContent = "Sending OTP...";

      showLoadingModal('Sending OTP...', `Verification code being sent to ${ADMIN_EMAIL}`);

      try {
        const response = await fetch(`${BACKEND_URL}/send-login-otp`, { method: "POST" });
        if (response.ok) {
          closeCustomModal();
          loginOtpInput.value = "";
          loginOtpError.textContent = "";
          showModal(loginOtpModal);
          loginError.textContent = ""; 
        } else { throw new Error("Failed to send OTP"); }
      } catch (error) {
        console.error(error);
        closeCustomModal();
        loginError.textContent = "Error sending OTP. Check server and try again.";
      } finally { loginButton.disabled = false; }
    });
  }

  loginOtpCancelBtn.addEventListener("click", () => { hideModal(loginOtpModal); loginError.textContent = "Login cancelled."; generateCaptcha(); });
  
  loginOtpVerifyBtn.addEventListener("click", async () => {
    const otp = loginOtpInput.value.trim();
    if (!otp) { loginOtpError.textContent = "Please enter the OTP."; return; }
    loginOtpError.textContent = "Verifying...";
    loginOtpVerifyBtn.disabled = true;

    try {
      const response = await fetch(`${BACKEND_URL}/verify-login-otp`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ otp: otp }) });
      if (response.ok) {
        hideModal(loginOtpModal);
        saveToStorage("isAuthenticated", "true");
        showToast('Login Successful!', 'success');
        
        // Offer biometric setup on mobile (only if not demo mode)
        if (supportsWebAuthn() && !isDemoMode) {
          setTimeout(() => showModal(biometricSetupModal), 500);
        } else {
          showDashboard();
        }
      } else {
        const data = await response.json();
        loginOtpError.textContent = data.message || "Invalid OTP. Please try again.";
      }
    } catch (error) { console.error(error); loginOtpError.textContent = "Error verifying OTP. Please try again."; }
    finally { loginOtpVerifyBtn.disabled = false; }
  });
  
  // Biometric Setup Handlers
  if (biometricSkipBtn) {
    biometricSkipBtn.addEventListener("click", () => {
      hideModal(biometricSetupModal);
      showDashboard();
    });
  }
  
  if (biometricEnableBtn) {
    biometricEnableBtn.addEventListener("click", async () => {
      try {
        // Store credentials for biometric login
        const credentials = {
          username: ADMIN_USERNAME,
          password: ADMIN_PASSWORD,
          enabled: true,
          timestamp: new Date().toISOString()
        };
        saveToStorage("biometricCredentials", credentials);
        hideModal(biometricSetupModal);
        showToast('Biometric login enabled!', 'success');
        showDashboard();
      } catch (error) {
        console.error("Biometric setup failed:", error);
        showToast('Failed to enable biometrics', 'error');
        hideModal(biometricSetupModal);
        showDashboard();
      }
    });
  }

  const handleLogout = () => {
    showConfirmModal(
      'Logout',
      'Are you sure you want to logout?',
      () => {
        localStorage.removeItem("isAuthenticated");
        isDemoMode = false;
        showLogin();
        showToast('Logged out successfully.', 'info');
      }
    );
  };

  if (logoutButtonDesktop) logoutButtonDesktop.addEventListener("click", handleLogout);
  if (logoutButtonMobile) logoutButtonMobile.addEventListener("click", handleLogout);
  if (desktopLogoutBtn) desktopLogoutBtn.addEventListener("click", handleLogout);


  // --- Forgot Password Modal Logic ---
  function showForgotPasswordModal() {
    forgotStep1.classList.remove("hidden"); forgotStep2.classList.add("hidden"); forgotStep3.classList.add("hidden");
    forgotEmailInput.value = ""; forgotOtpInput.value = ""; forgotEmailError.textContent = ""; forgotOtpError.textContent = "";
    showModal(forgotPasswordModal);
  }

  function hideForgotPasswordModal() { hideModal(forgotPasswordModal); }

  if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener("click", showForgotPasswordModal);
    forgotCancelBtn.addEventListener("click", hideForgotPasswordModal);
    forgotCancelBtn2.addEventListener("click", hideForgotPasswordModal);
    forgotSuccessCloseBtn.addEventListener("click", hideForgotPasswordModal);
  }

  forgotEmailNextBtn.addEventListener("click", async () => {
    if (forgotEmailInput.value.trim().toLowerCase() !== ADMIN_EMAIL) { forgotEmailError.textContent = "Email does not match admin records."; return; }
    
    if (isDemoMode) {
      // Demo mode - skip OTP
      forgotStep1.classList.add("hidden");
      forgotStep3.classList.remove("hidden");
      return;
    }
    
    forgotEmailError.textContent = "Sending OTP..."; forgotEmailNextBtn.disabled = true;
    showLoadingModal('Sending OTP...', `Sending verification code to ${ADMIN_EMAIL}`);

    try {
      const response = await fetch(`${BACKEND_URL}/send-forgot-otp`, { method: "POST" });
      if (response.ok) { closeCustomModal(); forgotStep1.classList.add("hidden"); forgotStep2.classList.remove("hidden"); forgotEmailError.textContent = ""; }
      else { throw new Error("Failed to send OTP"); }
    } catch (error) { console.error(error); closeCustomModal(); forgotEmailError.textContent = "Error sending OTP. Check server."; }
    finally { forgotEmailNextBtn.disabled = false; }
  });

  forgotOtpVerifyBtn.addEventListener("click", async () => {
    const otp = forgotOtpInput.value.trim();
    if (!otp) { forgotOtpError.textContent = "Please enter the OTP."; return; }
    forgotOtpError.textContent = "Verifying..."; forgotOtpVerifyBtn.disabled = true;

    try {
      const response = await fetch(`${BACKEND_URL}/verify-forgot-otp`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ otp: otp }) });
      if (response.ok) { forgotStep2.classList.add("hidden"); forgotStep3.classList.remove("hidden"); forgotOtpError.textContent = ""; }
      else { const data = await response.json(); forgotOtpError.textContent = data.message || "Invalid OTP. Please try again."; }
    } catch (error) { console.error(error); forgotOtpError.textContent = "Error verifying OTP. Please try again."; }
    finally { forgotOtpVerifyBtn.disabled = false; }
  });


  // --- Section Navigation with Skeleton Loading ---
  function handleDashboardNav() {
    navigateToSection(dashboardNavBtn, dashboardSection);
    setTimeout(() => {
      withSkeletonLoading(floorNavigation, 'buttons', 6, () => {
        renderFloorButtons();
      });
    }, 100);
    if (flatNumberNavigation) flatNumberNavigation.style.display = "none";
    backToAllFlatsBtn.style.display = "none";
    flatList.style.display = "none";
    currentSelectedFloor = null;
    currentSelectedFlatNumber = null;
  }

  function handleHistoryNav() {
    navigateToSection(historyNavBtn, historySection);
    setTimeout(() => {
      withSkeletonLoading(paymentHistoryTableContainer, 'table', 1, () => {
        renderPaymentHistoryTable(flats);
      });
    }, 100);
    updatePendingMaintenancePdfButton();
    generateSearchedFlatPdfButton.style.display = 'none';
  }

  function handleFinanceNav() {
    navigateToSection(financeNavBtn, financeSection);
    setTimeout(() => {
      withSkeletonLoading(budgetHistoryTableContainer, 'table', 1, () => {
        renderBudgetHistoryTable();
      });
    }, 100);
    renderBudgetSection();
    updateFinancePdfButtons();
    populateFinancialYearSelect();
    populateTxnHistoryYearSelect();
    populatePLYearSelect();
  }

  function handleSettingsNav() {
    navigateToSection(settingsNavBtn, settingsSection);
    maintenanceAmountInput.value = getMaintenanceAmount();
    resetEmailSettings();
  }

  dashboardNavBtn.addEventListener("click", handleDashboardNav);
  historyNavBtn.addEventListener("click", handleHistoryNav);
  financeNavBtn.addEventListener("click", handleFinanceNav);
  settingsNavBtn.addEventListener("click", handleSettingsNav);

  // Desktop home cards navigation with skeleton
  if (homeCardDashboard) homeCardDashboard.addEventListener("click", handleDashboardNav);
  if (homeCardHistory) homeCardHistory.addEventListener("click", handleHistoryNav);
  if (homeCardFinance) homeCardFinance.addEventListener("click", handleFinanceNav);
  if (desktopSettingsNav) desktopSettingsNav.addEventListener("click", handleSettingsNav);


  // --- Maintenance Portal (Dashboard) ---
  function renderFloorButtons() {
    floorNavigation.innerHTML = "";
    floorNavigation.style.display = "flex";
    const floorNames = Object.keys(floorMap);
    floorNames.forEach((floor, index) => {
      const button = document.createElement("button");
      button.textContent = floor;
      button.className = "floor-button";
      button.style.animationDelay = `${index * 0.08}s`;
      button.addEventListener("click", () => { showFlatNumberButtons(floor); });
      floorNavigation.appendChild(button);
    });
  }

  function showFlatNumberButtons(floor) {
    currentSelectedFloor = floor;
    currentSelectedFlatNumber = null;
    const flatNumbers = floorMap[floor];
    
    floorNavigation.style.display = "none";
    flatNumberNavigation.style.display = "flex";
    flatNumberNavigation.innerHTML = "";
    backToAllFlatsBtn.style.display = "flex";
    flatList.style.display = "none";
    
    const floorTitle = document.createElement("div");
    floorTitle.className = "flat-nav-title";
    floorTitle.innerHTML = `<span>${floor}</span> - Select Flat`;
    flatNumberNavigation.appendChild(floorTitle);
    
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "flat-number-buttons";
    
    flatNumbers.forEach((flatNum, index) => {
      const button = document.createElement("button");
      button.textContent = `Flat ${flatNum}`;
      button.className = "flat-number-button";
      button.style.animationDelay = `${index * 0.08}s`;
      button.addEventListener("click", () => { showSingleFlatCard(flatNum); });
      buttonContainer.appendChild(button);
    });
    
    flatNumberNavigation.appendChild(buttonContainer);
  }

  function showSingleFlatCard(flatNum) {
    currentSelectedFlatNumber = flatNum;
    flatNumberNavigation.style.display = "none";
    flatList.style.display = "grid";
    
    const singleFlatData = {};
    if (flats[flatNum]) { singleFlatData[flatNum] = flats[flatNum]; }
    renderFlatCards(singleFlatData);
  }

  backToAllFlatsBtn.addEventListener("click", () => {
    if (currentSelectedFlatNumber) {
      showFlatNumberButtons(currentSelectedFloor);
    } else {
      floorNavigation.style.display = "flex";
      flatNumberNavigation.style.display = "none";
      backToAllFlatsBtn.style.display = "none";
      flatList.style.display = "none";
      currentSelectedFloor = null;
      currentSelectedFlatNumber = null;
    }
  });

  async function sendReceipt(flatNumber, date, months, year, amount, mode, remarks) {
    if (isDemoMode) {
      // Demo mode - skip email sending
      showToast(`Demo: Receipt would be sent to flat ${flatNumber}`, 'info');
      return;
    }
    
    const emails = FLAT_EMAIL_MAP[flatNumber];
    if (!emails || emails.length === 0) { console.warn(`No email recipients found for flat ${flatNumber}. Skipping email.`); return; }
    const receiptData = { flatNumber, emails, date: formatDate(date), months: months.map(m => `${m} (${year})`), amount, mode, remarks };

    try {
      const response = await fetch(`${BACKEND_URL}/send-receipt`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(receiptData) });
      if (response.ok) { showToast(`Receipts sent to owners of flat ${flatNumber}.`, 'success'); }
      else { throw new Error('Server failed to send receipts.'); }
    } catch (error) { console.error('Error sending receipt:', error); showErrorModal('Receipt Error', `Payment was saved, but failed to send email receipts to owners of flat ${flatNumber}.`); }
  }

  function renderFlatCards(flatsToRender = flats) {
    flatList.innerHTML = "";
    if (Object.keys(flatsToRender).length === 0) {
      flatList.innerHTML = "<p class='text-center text-gray-500 italic p-10 col-span-full'>No Flats Found.</p>";
      return;
    }

    const currentYear = new Date().getFullYear();

    Object.keys(flatsToRender).sort((a, b) => parseInt(a) - parseInt(b)).forEach((flatName) => {
      const flat = flatsToRender[flatName];
      const card = document.createElement("div");
      card.className = "flat-card";
      card.dataset.flatId = flat.id;

      const yearStatusObj = flat.maintenanceStatus[currentYear] || createBlankYear();
      const monthsHtml = MONTHS_SHORT.map((month) => `<span class="month-badge ${yearStatusObj[month] ? "paid" : "unpaid"}" data-month="${month}" title="${yearStatusObj[month] ? "Paid" : "Unpaid"}">${month}</span>`).join("");

      // Radio buttons for status
      const statusOptions = ['Owned', 'Rented', 'Empty'];
      const statusRadiosHtml = statusOptions.map(s => `
        <label class="status-radio-label">
          <input type="radio" name="status-${flat.id}" value="${s}" ${flat.status === s ? 'checked' : ''} class="status-radio" />
          <span>${s}</span>
        </label>
      `).join('');

      card.innerHTML = `
        <div class="flat-card-header">
          <h3 class="flat-title">${flat.name}</h3>
          <span class="flat-status status-${flat.status.toLowerCase()}">${flat.status.toUpperCase()}</span>
        </div>
        <div class="flat-card-body">
          <div class="status-radio-group">${statusRadiosHtml}</div>
          
          <div class="maintenance-status-section">
            <label class="section-label">Maintenance Status</label>
            <div class="year-selector-container">
              <select id="year-select-${flat.id}" class="year-select" data-flat-id="${flat.id}">
                ${MAINTENANCE_YEARS.map(y => `<option value="${y}" ${y === currentYear ? 'selected' : ''}>${y}</option>`).join('')}
              </select>
            </div>
            <div class="months-grid" id="months-grid-${flat.id}">${monthsHtml}</div>
          </div>
          
          <div class="add-record-section">
            <div class="section-header">
              <label class="section-label">Add New Maintenance Record</label>
              <button class="toggle-section-btn" data-target="add-record-form-${flat.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
            </div>
            <div id="add-record-form-${flat.id}" class="add-record-form">
              <div class="form-group">
                <input type="number" id="amount-input-${flat.id}" placeholder="${getMaintenanceAmount()}" class="form-input" value="${getMaintenanceAmount()}" />
                <button class="select-all-btn" data-flat-id="${flat.id}">Select All</button>
              </div>
              <div class="form-group">
                <div class="month-input-container">
                  <input type="text" id="month-search-${flat.id}" placeholder="Type to select month(s)..." class="form-input month-search-input" autocomplete="off" data-flat-id="${flat.id}" />
                  <div id="month-dropdown-${flat.id}" class="month-dropdown hidden"></div>
                </div>
                <div id="selected-months-${flat.id}" class="selected-months-container"></div>
              </div>
              <div class="form-group">
                <input type="date" id="date-input-${flat.id}" class="form-input" />
              </div>
              <div class="form-group">
                <select id="mode-select-${flat.id}" class="form-select">
                  <option value="">Select Mode</option>
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>
              <div class="form-group">
                <textarea id="remarks-input-${flat.id}" placeholder="Remarks (UPI ID, Cheque No., etc.)" class="form-textarea" rows="2"></textarea>
              </div>
              <button class="btn-success w-full add-payment-btn" data-flat-id="${flat.id}">Add Payment</button>
            </div>
          </div>
        </div>
      `;
      flatList.appendChild(card);
    });
  
    // Event listeners
    document.querySelectorAll('.year-select').forEach(select => { select.addEventListener('change', handleYearChange); });
    document.querySelectorAll('.toggle-section-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetId = btn.dataset.target;
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.classList.toggle('expanded');
          btn.classList.toggle('rotated');
        }
      });
    });
    document.querySelectorAll('.select-all-btn').forEach(btn => {
      btn.addEventListener('click', () => selectAllMonths(btn.dataset.flatId));
    });
    document.querySelectorAll('.month-search-input').forEach(input => {
      input.addEventListener('input', (e) => handleMonthSearch(e, input.dataset.flatId));
      input.addEventListener('focus', (e) => handleMonthSearch(e, input.dataset.flatId));
    });
    document.querySelectorAll('.add-payment-btn').forEach(btn => {
      btn.addEventListener('click', () => handleAddPayment(btn.dataset.flatId));
    });
    document.querySelectorAll('.status-radio').forEach(radio => {
      radio.addEventListener('change', (e) => {
        const flatId = e.target.name.replace('status-', '');
        const newStatus = e.target.value;
        flats[flatId].status = newStatus;
        saveToStorage("flatMaintenanceData", flats);
        // Update badge
        const badge = e.target.closest('.flat-card').querySelector('.flat-status');
        badge.textContent = newStatus.toUpperCase();
        badge.className = `flat-status status-${newStatus.toLowerCase()}`;
      });
    });
  }
  
  // Month search and selection
  let selectedMonthsMap = {};
  
  function handleMonthSearch(e, flatId) {
    const input = e.target;
    const query = input.value.toLowerCase();
    const dropdown = document.getElementById(`month-dropdown-${flatId}`);
    const flat = flats[flatId];
    const currentYear = document.getElementById(`year-select-${flatId}`)?.value || new Date().getFullYear();
    const yearStatus = flat.maintenanceStatus[currentYear] || {};
    
    // Get unpaid months
    const unpaidMonths = MONTHS_SHORT.filter(m => !yearStatus[m]);
    const filtered = query ? unpaidMonths.filter(m => m.toLowerCase().includes(query)) : unpaidMonths;
    
    if (filtered.length === 0) {
      dropdown.classList.add('hidden');
      return;
    }
    
    dropdown.innerHTML = filtered.map(m => `
      <div class="month-dropdown-item" data-month="${m}" data-flat-id="${flatId}">${m}</div>
    `).join('');
    dropdown.classList.remove('hidden');
    
    dropdown.querySelectorAll('.month-dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        addSelectedMonth(flatId, item.dataset.month);
        input.value = '';
        dropdown.classList.add('hidden');
      });
    });
  }
  
  function addSelectedMonth(flatId, month) {
    if (!selectedMonthsMap[flatId]) selectedMonthsMap[flatId] = [];
    if (!selectedMonthsMap[flatId].includes(month)) {
      selectedMonthsMap[flatId].push(month);
      renderSelectedMonths(flatId);
    }
  }
  
  function removeSelectedMonth(flatId, month) {
    if (selectedMonthsMap[flatId]) {
      selectedMonthsMap[flatId] = selectedMonthsMap[flatId].filter(m => m !== month);
      renderSelectedMonths(flatId);
    }
  }
  
  function renderSelectedMonths(flatId) {
    const container = document.getElementById(`selected-months-${flatId}`);
    const months = selectedMonthsMap[flatId] || [];
    
    container.innerHTML = months.map(m => `
      <span class="selected-month-tag">
        ${m}
        <button class="remove-month-btn" data-flat-id="${flatId}" data-month="${m}">&times;</button>
      </span>
    `).join('');
    
    container.querySelectorAll('.remove-month-btn').forEach(btn => {
      btn.addEventListener('click', () => removeSelectedMonth(btn.dataset.flatId, btn.dataset.month));
    });
  }
  
  function selectAllMonths(flatId) {
    const flat = flats[flatId];
    const currentYear = document.getElementById(`year-select-${flatId}`)?.value || new Date().getFullYear();
    const yearStatus = flat.maintenanceStatus[currentYear] || {};
    const unpaidMonths = MONTHS_SHORT.filter(m => !yearStatus[m]);
    
    selectedMonthsMap[flatId] = [...unpaidMonths];
    renderSelectedMonths(flatId);
  }
  
  function handleAddPayment(flatId) {
    const months = selectedMonthsMap[flatId] || [];
    const amount = parseFloat(document.getElementById(`amount-input-${flatId}`).value);
    const date = document.getElementById(`date-input-${flatId}`).value;
    const mode = document.getElementById(`mode-select-${flatId}`).value;
    const remarks = document.getElementById(`remarks-input-${flatId}`).value;
    const year = document.getElementById(`year-select-${flatId}`)?.value || new Date().getFullYear();
    
    if (months.length === 0) { showWarningModal('No Months Selected', 'Please select at least one month.'); return; }
    if (isNaN(amount) || amount <= 0) { showWarningModal('Invalid Amount', 'Please enter a valid amount.'); return; }
    if (!date) { showWarningModal('Date Required', 'Please select a payment date.'); return; }
    if (!mode) { showWarningModal('Mode Required', 'Please select a payment mode.'); return; }
    
    const totalAmount = months.length * amount;
    
    // Process payment
    months.forEach((m) => {
      if (!flats[flatId].maintenanceStatus[year]) { flats[flatId].maintenanceStatus[year] = createBlankYear(); }
      flats[flatId].maintenanceStatus[year][m] = true;
    });

    const paymentRecord = { date: formatDate(date), months: months.map(m => `${m} (${year})`), amount: totalAmount, mode: mode, remarks: remarks || "N/A" };
    flats[flatId].paymentHistory.push(paymentRecord);
    saveToStorage("flatMaintenanceData", flats);
    
    const budget = getBudgetData();
    budget.totalFunds += totalAmount;
    budget.transactions.push({ type: "Addition", date: formatDate(date), amount: totalAmount, reason: `Flat ${flatId} - ${months.join(", ")} (${year})` });
    saveToStorage("budgetData", budget);

    addNotification(`Payment of ₹${totalAmount} received from Flat ${flatId} for ${months.join(', ')} (${year}).`);
    
    // Clear form
    selectedMonthsMap[flatId] = [];
    renderSelectedMonths(flatId);
    document.getElementById(`date-input-${flatId}`).value = '';
    document.getElementById(`mode-select-${flatId}`).value = '';
    document.getElementById(`remarks-input-${flatId}`).value = '';
    
    showSuccessModal('Payment Added', `₹${totalAmount} payment for Flat ${flatId} confirmed!`);
    
    // 2 second delay then show receipt notification
    setTimeout(() => {
      sendReceipt(flatId, date, months, year, totalAmount, mode, remarks || "N/A");
    }, 2000);

    // Refresh card
    if (currentSelectedFlatNumber) { showSingleFlatCard(currentSelectedFlatNumber); }
  }

  function handleYearChange(e) {
    const selectedYear = e.target.value;
    const flatId = e.target.dataset.flatId;
    const flat = flats[flatId];
    if (!flat) return;

    const yearStatusObj = flat.maintenanceStatus[selectedYear] || createBlankYear();
    const monthsGrid = document.getElementById(`months-grid-${flatId}`);
    
    if (monthsGrid) {
      monthsGrid.innerHTML = MONTHS_SHORT.map((month) => `<span class="month-badge ${yearStatusObj[month] ? "paid" : "unpaid"}" data-month="${month}" title="${yearStatusObj[month] ? "Paid" : "Unpaid"}">${month}</span>`).join("");
    }
    
    // Clear selected months when year changes
    selectedMonthsMap[flatId] = [];
    renderSelectedMonths(flatId);
  }


  // --- Settings: Email Update Feature with Table ---
  function resetEmailSettings() {
    if (emailFlatSearch) emailFlatSearch.value = "";
    if (emailFlatDropdown) emailFlatDropdown.classList.add("hidden");
    if (currentEmailsContainer) currentEmailsContainer.classList.add("hidden");
    selectedEmailFlat = null;
    editingEmailIndex = null;
    pendingEmailChanges = {};
  }
  
  if (emailFlatSearch) {
    // Single click selection (not double)
    emailFlatSearch.addEventListener("input", () => {
      const query = emailFlatSearch.value.trim().toLowerCase();
      emailFlatDropdown.innerHTML = "";
      
      if (query.length === 0) { emailFlatDropdown.classList.add("hidden"); currentEmailsContainer.classList.add("hidden"); return; }

      const allFlats = Object.keys(FLAT_EMAIL_MAP);
      const matchingFlats = allFlats.filter(f => f.includes(query));

      if (matchingFlats.length > 0) {
        emailFlatDropdown.classList.remove("hidden");
        matchingFlats.forEach(flatNum => {
          const item = document.createElement("div");
          item.className = "dropdown-item";
          item.textContent = `Flat ${flatNum}`;
          // Single click to select
          item.addEventListener("click", (e) => {
            e.stopPropagation();
            selectEmailFlat(flatNum);
          });
          emailFlatDropdown.appendChild(item);
        });
      } else { emailFlatDropdown.classList.add("hidden"); }
    });
    
    // Hide dropdown on outside click
    document.addEventListener("click", (e) => {
      if (!emailFlatSearch.contains(e.target) && !emailFlatDropdown.contains(e.target)) {
        emailFlatDropdown.classList.add("hidden");
      }
    });
  }
  
  function selectEmailFlat(flatNum) {
    selectedEmailFlat = flatNum;
    emailFlatSearch.value = flatNum;
    emailFlatDropdown.classList.add("hidden");
    renderEmailTable(flatNum);
  }
  
  function renderEmailTable(flatNum) {
    const emails = FLAT_EMAIL_MAP[flatNum] || [];
    currentEmailsContainer.classList.remove("hidden");
    
    if (emails.length === 0) {
      currentEmailsList.innerHTML = `<p class="text-sm text-gray-500 italic">No emails configured for this flat.</p>`;
      return;
    }
    
    let tableHtml = `<table class="email-table"><thead><tr><th>#</th><th>Email Address</th><th>Action</th></tr></thead><tbody>`;
    emails.forEach((email, idx) => {
      const pending = pendingEmailChanges[`${flatNum}-${idx}`];
      const displayEmail = pending ? pending.newEmail : email;
      const isPending = pending ? ' (pending)' : '';
      tableHtml += `<tr id="email-row-${idx}"><td>${idx + 1}</td><td id="email-cell-${idx}">${displayEmail}${isPending}</td><td><button class="email-edit-btn" data-index="${idx}" title="Edit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg></button></td></tr>`;
    });
    tableHtml += `</tbody></table>`;
    tableHtml += `<div id="email-edit-form" class="email-edit-form hidden"><label class="block text-sm font-medium text-gray-700 mb-1">New Email Address</label><input type="email" id="edit-email-input" class="form-input mb-3" placeholder="Enter new email"><div class="flex gap-2"><button id="cancel-email-edit" class="btn-secondary btn-sm flex-1">Cancel</button><button id="confirm-email-edit" class="btn-primary btn-sm flex-1">Confirm</button></div></div>`;
    
    // Save All button at the end
    const hasPending = Object.keys(pendingEmailChanges).length > 0;
    tableHtml += `<button id="save-all-emails-btn" class="btn-success w-full mt-4 ${hasPending ? '' : 'hidden'}">Save All Email Changes</button>`;
    
    currentEmailsList.innerHTML = tableHtml;
    
    // Add event listeners to edit buttons
    document.querySelectorAll('.email-edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        editingEmailIndex = parseInt(btn.dataset.index);
        document.getElementById('email-edit-form').classList.remove('hidden');
        const currentEmail = pendingEmailChanges[`${selectedEmailFlat}-${editingEmailIndex}`]?.newEmail || FLAT_EMAIL_MAP[selectedEmailFlat][editingEmailIndex];
        document.getElementById('edit-email-input').value = currentEmail;
        document.getElementById('edit-email-input').focus();
      });
    });
    
    document.getElementById('cancel-email-edit')?.addEventListener('click', () => {
      document.getElementById('email-edit-form').classList.add('hidden');
      editingEmailIndex = null;
    });
    
    document.getElementById('confirm-email-edit')?.addEventListener('click', () => {
      const newEmail = document.getElementById('edit-email-input').value.trim();
      if (!newEmail || !newEmail.includes('@')) { showWarningModal("Invalid Email", "Please enter a valid email address."); return; }
      
      // Store pending change (no OTP yet)
      pendingEmailChanges[`${selectedEmailFlat}-${editingEmailIndex}`] = {
        flatNum: selectedEmailFlat,
        emailIndex: editingEmailIndex,
        oldEmail: FLAT_EMAIL_MAP[selectedEmailFlat][editingEmailIndex],
        newEmail: newEmail
      };
      
      document.getElementById('email-edit-form').classList.add('hidden');
      editingEmailIndex = null;
      
      // Re-render table to show pending changes
      renderEmailTable(selectedEmailFlat);
      showToast('Email change staged. Click "Save All" to apply.', 'info');
    });
    
    // Save All button handler
    document.getElementById('save-all-emails-btn')?.addEventListener('click', saveAllEmailChanges);
  }
  
  async function saveAllEmailChanges() {
    const changes = Object.values(pendingEmailChanges);
    if (changes.length === 0) {
      showWarningModal('No Changes', 'No email changes to save.');
      return;
    }
    
    // Demo mode - skip OTP
    if (isDemoMode) {
      applyEmailChanges();
      return;
    }
    
    // Send single OTP for all changes
    showLoadingModal('Sending OTP...', 'Verification required to save email changes.');

    try {
      const response = await fetch(`${BACKEND_URL}/send-settings-otp`, { method: "POST" });
      if (response.ok) {
        closeCustomModal();
        const emailOtpModal = document.getElementById('email-otp-modal');
        const emailOtpInput = document.getElementById('email-otp-input');
        const emailOtpError = document.getElementById('email-otp-error');
        emailOtpInput.value = "";
        emailOtpError.textContent = "";
        showModal(emailOtpModal);
      } else { throw new Error("Failed to send OTP"); }
    } catch (err) {
      console.error(err);
      closeCustomModal();
      showErrorModal("Error", "Could not send OTP. Check server connection.");
    }
  }
  
  function applyEmailChanges() {
    const changes = Object.values(pendingEmailChanges);
    
    changes.forEach(change => {
      FLAT_EMAIL_MAP[change.flatNum][change.emailIndex] = change.newEmail;
      addNotification(`Email for Flat ${change.flatNum} changed to ${change.newEmail}`);
    });
    
    saveToStorage("flatEmailMap", FLAT_EMAIL_MAP);
    pendingEmailChanges = {};
    
    showSuccessModal('Emails Updated', `${changes.length} email(s) updated successfully!`);
    
    if (selectedEmailFlat) {
      renderEmailTable(selectedEmailFlat);
    }
  }
  
  // Email OTP Modal handlers
  const emailOtpModal = document.getElementById('email-otp-modal');
  const emailOtpCancelBtn = document.getElementById('email-otp-cancel-btn');
  const emailOtpVerifyBtn = document.getElementById('email-otp-verify-btn');
  
  if (emailOtpCancelBtn) { emailOtpCancelBtn.addEventListener("click", () => { hideModal(emailOtpModal); }); }
  
  if (emailOtpVerifyBtn) {
    emailOtpVerifyBtn.addEventListener("click", async () => {
      const emailOtpInput = document.getElementById('email-otp-input');
      const emailOtpError = document.getElementById('email-otp-error');
      const otp = emailOtpInput.value.trim();
      if (!otp) { emailOtpError.textContent = "Please enter the OTP."; return; }

      emailOtpError.textContent = "Verifying...";
      emailOtpVerifyBtn.disabled = true;

      try {
        const response = await fetch(`${BACKEND_URL}/verify-settings-otp`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ otp: otp }) });

        if (response.ok) {
          hideModal(emailOtpModal);
          applyEmailChanges();
        } else {
          const data = await response.json();
          emailOtpError.textContent = data.message || "Invalid OTP.";
        }
      } catch (error) { console.error(error); emailOtpError.textContent = "Error verifying OTP."; }
      finally { emailOtpVerifyBtn.disabled = false; }
    });
  }


  // --- Settings: Maintenance Amount ---
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener("click", () => {
      const newAmount = parseInt(maintenanceAmountInput.value);
      if (isNaN(newAmount) || newAmount <= 0) { showWarningModal("Invalid Amount", "Please enter a valid maintenance amount."); return; }
      
      // Demo mode - skip OTP
      if (isDemoMode) {
        saveToStorage("maintenanceAmount", newAmount);
        addNotification(`Maintenance amount updated to ₹${newAmount}`);
        showSuccessModal('Settings Saved', 'Maintenance amount updated successfully!');
        return;
      }
      
      newMaintenanceAmount = newAmount;
      
      showLoadingModal('Sending OTP...', 'Verification required to save settings.');

      fetch(`${BACKEND_URL}/send-settings-otp`, { method: "POST" })
        .then(res => { if (res.ok) { closeCustomModal(); settingsOtpInput.value = ""; settingsOtpError.textContent = ""; showModal(settingsOtpModal); } else { throw new Error("Failed to send OTP"); } })
        .catch(err => { console.error(err); closeCustomModal(); showErrorModal("Error", "Could not send OTP. Check server connection."); });
    });
  }
  
  if (settingsOtpCancelBtn) { settingsOtpCancelBtn.addEventListener("click", () => { hideModal(settingsOtpModal); }); }
  
  if (settingsOtpVerifyBtn) {
    settingsOtpVerifyBtn.addEventListener("click", async () => {
      const otp = settingsOtpInput.value.trim();
      if (!otp) { settingsOtpError.textContent = "Please enter the OTP."; return; }
      settingsOtpError.textContent = "Verifying..."; settingsOtpVerifyBtn.disabled = true;

      try {
        const response = await fetch(`${BACKEND_URL}/verify-settings-otp`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ otp: otp }) });
        if (response.ok) {
          hideModal(settingsOtpModal);
          saveToStorage("maintenanceAmount", newMaintenanceAmount);
          addNotification(`Maintenance amount updated to ₹${newMaintenanceAmount}`);
          showSuccessModal('Settings Saved', 'Maintenance amount updated successfully!');
        } else { const data = await response.json(); settingsOtpError.textContent = data.message || "Invalid OTP."; }
      } catch (error) { console.error(error); settingsOtpError.textContent = "Error verifying OTP."; }
      finally { settingsOtpVerifyBtn.disabled = false; }
    });
  }


  // --- Maintenance History ---
  let lastSearchedFlatId = null;

  flatSearchInput.addEventListener("input", () => {
    const query = flatSearchInput.value.trim().toLowerCase();
    searchResultsDropdown.innerHTML = "";
    generateSearchedFlatPdfButton.style.display = 'none';
    lastSearchedFlatId = null;

    if (query.length === 0) { searchResultsDropdown.classList.add("hidden"); return; }

    const matchingFlats = Object.keys(flats).filter((flatName) => flatName.toLowerCase().includes(query));

    if (matchingFlats.length > 0) {
      searchResultsDropdown.classList.remove("hidden");
      matchingFlats.forEach((flatName) => {
        const item = document.createElement("div");
        item.className = "search-result-item dropdown-item";
        item.textContent = `Flat ${flatName}`;
        item.addEventListener("click", () => { flatSearchInput.value = flatName; searchResultsDropdown.classList.add("hidden"); });
        searchResultsDropdown.appendChild(item);
      });
    } else { searchResultsDropdown.classList.add("hidden"); }
  });

  searchButton.addEventListener("click", () => {
    const query = flatSearchInput.value.trim();
    searchResultsDropdown.classList.add("hidden");

    if (query && flats[query]) {
      renderPaymentHistoryTable({ [query]: flats[query] });
      lastSearchedFlatId = query;
      generateSearchedFlatPdfButton.style.display = 'inline-flex';
    } else if (query) { showWarningModal("Not Found", `Flat "${query}" not found.`); lastSearchedFlatId = null; generateSearchedFlatPdfButton.style.display = 'none'; }
    else { showWarningModal("Input Required", "Please enter a flat number to search."); }
  });

  showAllButton.addEventListener("click", () => {
    flatSearchInput.value = "";
    searchResultsDropdown.classList.add("hidden");
    renderPaymentHistoryTable(flats);
    lastSearchedFlatId = null;
    generateSearchedFlatPdfButton.style.display = 'none';
  });

  function renderPaymentHistoryTable(flatsToRender) {
    let allPayments = [];
    Object.keys(flatsToRender).forEach((flatName) => {
      const flat = flatsToRender[flatName];
      if (flat.paymentHistory && flat.paymentHistory.length > 0) {
        flat.paymentHistory.forEach((p) => { allPayments.push({ flatName: flat.name, ...p }); });
      }
    });

    allPayments.sort((a, b) => getDateObj(b.date) - getDateObj(a.date));

    if (allPayments.length === 0) { paymentHistoryTableContainer.innerHTML = `<p class="no-results text-center text-gray-500 italic p-10">No payment history found.</p>`; return; }

    let tableHtml = `<table class="data-table"><thead><tr><th>Flat</th><th>Date</th><th>Month(s)</th><th>Amount</th><th>Mode</th><th>Remarks</th></tr></thead><tbody>`;
    allPayments.forEach((p) => {
      tableHtml += `<tr><td>${p.flatName}</td><td>${p.date}</td><td>${Array.isArray(p.months) ? p.months.join(", ") : p.months}</td><td class="text-green-600 font-semibold">₹${p.amount}</td><td>${p.mode}</td><td>${p.remarks}</td></tr>`;
    });
    tableHtml += `</tbody></table>`;
    paymentHistoryTableContainer.innerHTML = tableHtml;
  }


  // --- Budget Section ---
  function renderBudgetSection() {
    const budget = getBudgetData();
    totalFundsDisplay.textContent = `₹${budget.totalFunds.toLocaleString('en-IN')}`;
  }
  
  function renderBudgetHistoryTable() {
    const budget = getBudgetData();
    if (!budget.transactions || budget.transactions.length === 0) {
      budgetHistoryTableContainer.innerHTML = `<p class="no-results text-center text-gray-500 italic p-10">No transactions found.</p>`;
      return;
    }
    
    const sortedTxns = [...budget.transactions].sort((a, b) => getDateObj(b.date) - getDateObj(a.date));
    
    let tableHtml = `<table class="data-table"><thead><tr><th>Type</th><th>Date</th><th>Amount</th><th>Reason</th></tr></thead><tbody>`;
    sortedTxns.forEach(t => {
      const colorClass = t.type === 'Addition' ? 'text-green-600' : 'text-red-600';
      tableHtml += `<tr><td><span class="badge-${t.type === 'Addition' ? 'success' : 'danger'}">${t.type.toUpperCase()}</span></td><td>${t.date}</td><td class="${colorClass} font-semibold">₹${t.amount.toLocaleString('en-IN')}</td><td>${t.reason}</td></tr>`;
    });
    tableHtml += `</tbody></table>`;
    budgetHistoryTableContainer.innerHTML = tableHtml;
  }

  if (addFundBtn) {
    addFundBtn.addEventListener("click", () => {
      const amount = parseFloat(addFundAmountInput.value);
      const date = addFundDateInput.value;
      const reason = addFundReasonInput.value.trim();
      
      if (isNaN(amount) || amount <= 0) { showWarningModal("Invalid Amount", "Please enter a valid amount."); return; }
      if (!date) { showWarningModal("Date Required", "Please select a date."); return; }
      if (!reason) { showWarningModal("Reason Required", "Please provide a reason."); return; }
      
      const budget = getBudgetData();
      budget.totalFunds += amount;
      budget.transactions.push({ type: "Addition", date: formatDate(date), amount: amount, reason: reason });
      saveToStorage("budgetData", budget);
      
      addNotification(`Added ₹${amount.toLocaleString('en-IN')} to budget: ${reason}`);
      showSuccessModal('Amount Added', `₹${amount.toLocaleString('en-IN')} added to budget!`);
      
      addFundAmountInput.value = "";
      addFundDateInput.value = "";
      addFundReasonInput.value = "";
      renderBudgetSection();
      renderBudgetHistoryTable();
      updateFinancePdfButtons();
    });
  }

  if (deductFundBtn) {
    deductFundBtn.addEventListener("click", () => {
      const amount = parseFloat(deductFundAmountInput.value);
      const date = deductFundDateInput.value;
      const reason = deductFundReasonInput.value.trim();
      
      if (isNaN(amount) || amount <= 0) { showWarningModal("Invalid Amount", "Please enter a valid amount."); return; }
      if (!date) { showWarningModal("Date Required", "Please select a date."); return; }
      if (!reason) { showWarningModal("Reason Required", "Please provide a reason."); return; }
      
      const budget = getBudgetData();
      budget.totalFunds -= amount;
      budget.transactions.push({ type: "Deduction", date: formatDate(date), amount: amount, reason: reason });
      saveToStorage("budgetData", budget);
      
      addNotification(`Deducted ₹${amount.toLocaleString('en-IN')} from budget: ${reason}`);
      showSuccessModal('Amount Deducted', `₹${amount.toLocaleString('en-IN')} deducted from budget!`);
      
      deductFundAmountInput.value = "";
      deductFundDateInput.value = "";
      deductFundReasonInput.value = "";
      renderBudgetSection();
      renderBudgetHistoryTable();
      updateFinancePdfButtons();
    });
  }

  function updateFinancePdfButtons() {
    const budget = getBudgetData();
    const hasTransactions = budget.transactions && budget.transactions.length > 0;
    generateBudgetPdfButton.disabled = !hasTransactions;
    overallProfitLossPdfBtn.disabled = !hasTransactions;
    generateAnnualStatementPdfBtn.disabled = !hasTransactions;
  }

  function populateFinancialYearSelect() {
    const currentYear = new Date().getFullYear();
    financialYearSelect.innerHTML = '';
    for (let y = currentYear; y >= 2023; y--) {
      financialYearSelect.innerHTML += `<option value="${y}-${y+1}">FY ${y}-${y+1}</option>`;
    }
  }

  function populateTxnHistoryYearSelect() {
    const currentYear = new Date().getFullYear();
    txnHistoryYearSelect.innerHTML = '<option value="all">All Years</option>';
    for (let y = currentYear; y >= 2023; y--) {
      txnHistoryYearSelect.innerHTML += `<option value="${y}">${y}</option>`;
    }
  }

  function populatePLYearSelect() {
    const currentYear = new Date().getFullYear();
    plReportYearSelect.innerHTML = '';
    for (let y = currentYear; y >= 2023; y--) {
      plReportYearSelect.innerHTML += `<option value="${y}">${y}</option>`;
    }
  }


  // --- PDF Generation (Enhanced Styling) ---
  function updatePendingMaintenancePdfButton() {
    const hasPending = Object.values(flats).some(flat => {
      const currentYear = new Date().getFullYear();
      const yearStatus = flat.maintenanceStatus[currentYear] || {};
      return MONTHS_SHORT.some(month => !yearStatus[month]);
    });
    generatePdfButton.disabled = !hasPending;
  }

  function addPdfHeader(doc, title, subtitle = '') {
    // Header background
    doc.setFillColor(8, 145, 178);
    doc.rect(0, 0, 210, 35, 'F');
    
    // Logo text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('SHREEJI COMPLEX', 14, 18);
    
    // Subtitle
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(title, 14, 28);
    
    // Date
    doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, 196, 18, { align: 'right' });
    
    if (subtitle) {
      doc.text(subtitle, 196, 28, { align: 'right' });
    }
    
    return 45; // Return Y position after header
  }
  
  function addPdfFooter(doc, pageNumber) {
    const pageHeight = doc.internal.pageSize.height;
    doc.setFillColor(245, 245, 245);
    doc.rect(0, pageHeight - 20, 210, 20, 'F');
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(8);
    doc.text(`Page ${pageNumber}`, 105, pageHeight - 8, { align: 'center' });
    doc.text('Developer: Kush Shah | Contact: +91 9426557314', 14, pageHeight - 8);
  }

  generatePdfButton.addEventListener("click", () => {
    if (generatePdfButton.disabled) return;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const currentYear = new Date().getFullYear();

    const startY = addPdfHeader(doc, 'Pending Maintenance Report', `Year: ${currentYear}`);

    const tableData = [];
    Object.keys(flats).sort((a,b) => parseInt(a) - parseInt(b)).forEach(flatId => {
      const flat = flats[flatId];
      const yearStatus = flat.maintenanceStatus[currentYear] || {};
      const unpaidMonths = MONTHS_SHORT.filter(m => !yearStatus[m]);
      if (unpaidMonths.length > 0) { 
        tableData.push([`Flat ${flat.name}`, unpaidMonths.join(', '), `₹${unpaidMonths.length * getMaintenanceAmount()}`]); 
      }
    });

    doc.autoTable({ 
      head: [['Flat No.', 'Unpaid Months', 'Amount Due']], 
      body: tableData, 
      startY: startY, 
      theme: 'striped',
      headStyles: { fillColor: [8, 145, 178], textColor: 255, fontStyle: 'bold', halign: 'center' },
      bodyStyles: { halign: 'center' },
      alternateRowStyles: { fillColor: [240, 248, 255] },
      margin: { left: 14, right: 14 }
    });
    
    addPdfFooter(doc, 1);
    doc.save(`pending_maintenance_${currentYear}.pdf`);
    showSuccessModal('PDF Generated', 'Pending Maintenance PDF downloaded!');
  });
  
  generateSearchedFlatPdfButton.addEventListener("click", () => {
    if (!lastSearchedFlatId || !flats[lastSearchedFlatId]) return;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const flat = flats[lastSearchedFlatId];

    const startY = addPdfHeader(doc, `Payment History - Flat ${flat.name}`, `Status: ${flat.status}`);

    const tableData = flat.paymentHistory.map(p => [
      p.date, 
      Array.isArray(p.months) ? p.months.join(', ') : p.months, 
      `₹${p.amount.toLocaleString('en-IN')}`, 
      p.mode, 
      p.remarks
    ]);
    
    doc.autoTable({ 
      head: [['Date', 'Months', 'Amount', 'Mode', 'Remarks']], 
      body: tableData, 
      startY: startY, 
      theme: 'striped',
      headStyles: { fillColor: [8, 145, 178], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [240, 248, 255] },
      columnStyles: {
        0: { halign: 'center' },
        2: { halign: 'right', fontStyle: 'bold' },
        3: { halign: 'center' }
      },
      margin: { left: 14, right: 14 }
    });
    
    addPdfFooter(doc, 1);
    doc.save(`flat_${flat.name}_history.pdf`);
    showSuccessModal('PDF Generated', 'Flat History PDF downloaded!');
  });

  generateBudgetPdfButton.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const budget = getBudgetData();
    const selectedYear = txnHistoryYearSelect.value;

    const startY = addPdfHeader(doc, 'Transaction History', selectedYear === 'all' ? 'All Years' : `Year: ${selectedYear}`);

    let filteredTxns = budget.transactions;
    if (selectedYear !== 'all') {
      filteredTxns = budget.transactions.filter(t => t.date && t.date.includes(selectedYear));
    }

    const tableData = filteredTxns.map(t => [
      t.type.toUpperCase(), 
      t.date, 
      `₹${t.amount.toLocaleString('en-IN')}`, 
      t.reason
    ]);
    
    doc.autoTable({ 
      head: [['Type', 'Date', 'Amount', 'Reason']], 
      body: tableData, 
      startY: startY, 
      theme: 'striped',
      headStyles: { fillColor: [8, 145, 178], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [240, 248, 255] },
      columnStyles: {
        0: { halign: 'center', fontStyle: 'bold' },
        1: { halign: 'center' },
        2: { halign: 'right' }
      },
      margin: { left: 14, right: 14 },
      didParseCell: function(data) {
        if (data.section === 'body' && data.column.index === 0) {
          if (data.cell.raw === 'ADDITION') {
            data.cell.styles.textColor = [16, 185, 129];
          } else {
            data.cell.styles.textColor = [239, 68, 68];
          }
        }
      }
    });
    
    // Summary
    const totalAdditions = filteredTxns.filter(t => t.type === 'Addition').reduce((sum, t) => sum + t.amount, 0);
    const totalDeductions = filteredTxns.filter(t => t.type === 'Deduction').reduce((sum, t) => sum + t.amount, 0);
    const finalY = doc.lastAutoTable.finalY + 10;
    
    doc.setFontSize(10);
    doc.setTextColor(16, 185, 129);
    doc.text(`Total Additions: ₹${totalAdditions.toLocaleString('en-IN')}`, 14, finalY);
    doc.setTextColor(239, 68, 68);
    doc.text(`Total Deductions: ₹${totalDeductions.toLocaleString('en-IN')}`, 14, finalY + 6);
    doc.setTextColor(8, 145, 178);
    doc.setFont('helvetica', 'bold');
    doc.text(`Net: ₹${(totalAdditions - totalDeductions).toLocaleString('en-IN')}`, 14, finalY + 12);
    
    addPdfFooter(doc, 1);
    doc.save(`transaction_history_${selectedYear}.pdf`);
    showSuccessModal('PDF Generated', 'Transaction History PDF downloaded!');
  });
  
  if (overallProfitLossPdfBtn) {
    overallProfitLossPdfBtn.addEventListener("click", () => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      const budget = getBudgetData();
      const selectedYear = plReportYearSelect.value;

      const startY = addPdfHeader(doc, 'Profit & Loss Report', `Year: ${selectedYear}`);
      
      const yearTxns = budget.transactions.filter(t => t.date && t.date.includes(selectedYear));
      const totalAdditions = yearTxns.filter(t => t.type === 'Addition').reduce((sum, t) => sum + t.amount, 0);
      const totalDeductions = yearTxns.filter(t => t.type === 'Deduction').reduce((sum, t) => sum + t.amount, 0);
      const netPL = totalAdditions - totalDeductions;
      
      // Summary cards
      doc.setFillColor(16, 185, 129);
      doc.roundedRect(14, startY, 55, 30, 3, 3, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text('Total Income', 41.5, startY + 10, { align: 'center' });
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`₹${totalAdditions.toLocaleString('en-IN')}`, 41.5, startY + 22, { align: 'center' });
      
      doc.setFillColor(239, 68, 68);
      doc.roundedRect(77, startY, 55, 30, 3, 3, 'F');
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Total Expenses', 104.5, startY + 10, { align: 'center' });
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`₹${totalDeductions.toLocaleString('en-IN')}`, 104.5, startY + 22, { align: 'center' });
      
      doc.setFillColor(netPL >= 0 ? 8 : 239, netPL >= 0 ? 145 : 68, netPL >= 0 ? 178 : 68);
      doc.roundedRect(140, startY, 55, 30, 3, 3, 'F');
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(netPL >= 0 ? 'Net Profit' : 'Net Loss', 167.5, startY + 10, { align: 'center' });
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`₹${Math.abs(netPL).toLocaleString('en-IN')}`, 167.5, startY + 22, { align: 'center' });
      
      addPdfFooter(doc, 1);
      doc.save(`pl_report_${selectedYear}.pdf`);
      showSuccessModal('PDF Generated', 'P/L Report PDF downloaded!');
    });
  }
  
  if (generateAnnualStatementPdfBtn) {
    generateAnnualStatementPdfBtn.addEventListener("click", () => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      const budget = getBudgetData();
      const selectedFY = financialYearSelect.value;
      const [startYear, endYear] = selectedFY.split('-').map(Number);

      const startY = addPdfHeader(doc, 'Annual Financial Statement', `Financial Year: ${selectedFY}`);
      
      // Filter transactions for FY (April to March)
      const fyTxns = budget.transactions.filter(t => {
        if (!t.date) return false;
        const parts = t.date.split('-');
        if (parts.length !== 3) return false;
        const month = parseInt(parts[1]);
        const year = parseInt(parts[2]);
        return (year === startYear && month >= 4) || (year === endYear && month <= 3);
      });
      
      const tableData = fyTxns.map(t => [t.type.toUpperCase(), t.date, `₹${t.amount.toLocaleString('en-IN')}`, t.reason]);
      
      doc.autoTable({ 
        head: [['Type', 'Date', 'Amount', 'Description']], 
        body: tableData, 
        startY: startY, 
        theme: 'striped',
        headStyles: { fillColor: [8, 145, 178], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [240, 248, 255] },
        margin: { left: 14, right: 14 }
      });
      
      addPdfFooter(doc, 1);
      doc.save(`annual_statement_FY${selectedFY}.pdf`);
      showSuccessModal('PDF Generated', 'Annual Statement PDF downloaded!');
    });
  }


  // --- Initialization ---
  function init() {
    if (getFromStorage("isAuthenticated", false) === "true") {
      showDashboard();
    } else {
      showLogin();
    }
    generateCaptcha();
  }

  init();
  
  // Hide dropdowns on outside click
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.month-dropdown').forEach(dd => {
      if (!dd.contains(e.target) && !e.target.classList.contains('month-search-input')) {
        dd.classList.add('hidden');
      }
    });
  });
});
