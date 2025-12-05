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

  // Login CAPTCHA & OTP
  const captchaCanvas = document.getElementById("captcha-canvas");
  const reloadCaptchaBtn = document.getElementById("reload-captcha-btn");
  const captchaInput = document.getElementById("captcha-input");
  const loginOtpModal = document.getElementById("login-otp-modal");
  const loginOtpInput = document.getElementById("login-otp-input");
  const loginOtpError = document.getElementById("login-otp-error");
  const loginOtpCancelBtn = document.getElementById("login-otp-cancel-btn");
  const loginOtpVerifyBtn = document.getElementById("login-otp-verify-btn");
  
  // Sections
  const dashboardSection = document.getElementById("dashboard-section");
  const historySection = document.getElementById("history-section");
  const financeSection = document.getElementById("finance-section");
  const settingsSection = document.getElementById("settings-section"); 
  
  // Maintenance Portal
  const flatList = document.getElementById("flat-list");
  const floorNavigation = document.getElementById("floor-navigation");
  const backToAllFlatsBtn = document.getElementById("back-to-all-flats-btn");

  // History Portal
  const searchButton = document.getElementById("search-button");
  const flatSearchInput = document.getElementById("flat-search-input");
  const searchResultsDropdown = document.getElementById("search-results-dropdown");
  const showAllButton = document.getElementById("show-all-button");
  const paymentHistoryTableContainer = document.getElementById(
    "payment-history-table-container"
  );
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
  const budgetHistoryTableContainer = document.getElementById(
    "budget-history-table-container"
  );
  const generateBudgetPdfButton = document.getElementById(
    "generate-budget-pdf-button"
  );
  const overallProfitLossPdfBtn = document.getElementById(
    "overall-profit-loss-pdf-btn"
  );
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

  // Desktop navigation buttons
  const desktopDashboardNav = document.getElementById('desktop-dashboard-nav');
  const desktopHistoryNav = document.getElementById('desktop-history-nav');
  const desktopFinanceNav = document.getElementById('desktop-finance-nav');
  const desktopSettingsNav = document.getElementById('desktop-settings-nav');
  
  if (desktopDashboardNav) desktopDashboardNav.addEventListener('click', () => navigateToSection(dashboardNavBtn, dashboardSection));
  if (desktopHistoryNav) desktopHistoryNav.addEventListener('click', () => navigateToSection(historyNavBtn, historySection));
  if (desktopFinanceNav) desktopFinanceNav.addEventListener('click', () => navigateToSection(financeNavBtn, financeSection));
  if (desktopSettingsNav) desktopSettingsNav.addEventListener('click', () => navigateToSection(settingsNavBtn, settingsSection));

  // --- 3D Login Card Tilt Effect ---
  const loginCardWrapper = document.querySelector(".login-card-wrapper");
  const loginCard = document.querySelector(".login-card");

  if (loginCardWrapper && loginCard) {
    loginCardWrapper.addEventListener("mousemove", (e) => {
      if (window.innerWidth < 640) return; 
      const rect = loginCardWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateY = (x / (rect.width / 2)) * 10; 
      const rotateX = (-y / (rect.height / 2)) * 10; 

      loginCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    loginCardWrapper.addEventListener("mouseleave", () => {
      loginCard.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  }


  // --- Constants & State ---
  const BACKEND_URL = window.location.origin; 
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "pass"; 
  const ADMIN_EMAIL = "kush.work1310@gmail.com";
  let currentCaptcha = "";
  let activeSection = null; 
  let newMaintenanceAmount = 0; 
  const MAINTENANCE_YEARS = Array.from({length: 2031 - 2023 + 1}, (_, i) => 2023 + i); // 2023 to 2031

  const MONTHS_SHORT = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  let flats = {};
  const floorMap = {
    "1st Floor": ["101", "102", "103", "104"],
    "2nd Floor": ["201", "202", "203", "204"],
    "3rd Floor": ["301", "302", "303", "304"],
    "4th Floor": ["401", "402", "403", "404"],
    "5th Floor": ["501", "502", "503", "504"],
    "6th Floor": ["601", "602", "603", "604"],
  };

  const FLAT_EMAIL_MAP = {
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


  // --- Utility Functions ---

  const showAlert = (title, text, icon) => {
    Swal.fire({
      title: title,
      html: text, 
      icon: icon, 
      confirmButtonColor: '#4f46e5', 
    });
  };

  const showToast = (title, icon) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: icon, 
      title: title
    });
  };

  function showModal(modalElement) {
      modalElement.classList.remove("hidden", "is-hiding");
  }

  function hideModal(modalElement) {
    if (modalElement) { 
        modalElement.classList.add("is-hiding");
        setTimeout(() => {
            modalElement.classList.add("hidden");
        }, 200); 
    }
  }

  function formatDate(inputDate) {
    if (!inputDate) return "N/A";
    const date = new Date(inputDate);
    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset);

    return `${String(adjustedDate.getDate()).padStart(2, "0")}-${String(
      adjustedDate.getMonth() + 1
    ).padStart(2, "0")}-${adjustedDate.getFullYear()}`;
  }
  
  function getDateObj(dateStr) {
      if (typeof dateStr === 'string' && dateStr.includes('-')) {
          const parts = dateStr.split('-');
          if (parts.length === 3) {
             const date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
             if (!isNaN(date.getTime())) {
                 return date;
             }
          }
      }
      const date = new Date(dateStr);
      return isNaN(date.getTime()) ? new Date(0) : date; 
  }

  // --- Sidebar & Navigation ---

  function toggleSidebar() {
    sidebar.classList.toggle("-translate-x-full");
    hamburgerBtn.classList.toggle("active");
    sidebarOverlay.classList.toggle("hidden");
  }

  hamburgerBtn.addEventListener("click", toggleSidebar);
  sidebarOverlay.addEventListener("click", toggleSidebar);

  function navigateToSection(buttonToActivate, sectionToShow) {
    if (activeSection === sectionToShow) {
        if (!sidebar.classList.contains("-translate-x-full")) {
            toggleSidebar();
        }
        return; 
    }

    document.querySelectorAll(".main-nav button").forEach((btn) => {
      btn.classList.remove("active");
    });
    buttonToActivate.classList.add("active");

    if (activeSection) {
        activeSection.classList.add("is-exiting");
    }
    
    setTimeout(() => {
        if (activeSection) {
            activeSection.style.display = 'none';
            activeSection.classList.remove("is-exiting");
        }
        
        sectionToShow.style.display = "block";
        sectionToShow.classList.add("is-entering");
        
        activeSection = sectionToShow;
        
        setTimeout(() => {
            sectionToShow.classList.remove("is-entering");
        }, 300); 

    }, 300); 

    if (!sidebar.classList.contains("-translate-x-full")) {
        toggleSidebar();
    }
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

  // ** NEW: Helper to create a blank year status **
  const createBlankYear = () => {
    return MONTHS_SHORT.reduce((acc, month) => {
        acc[month] = false;
        return acc;
    }, {});
  };

  // ** UPDATED: getFlatData to pre-populate all years 2023-2031 **
  function getFlatData() {
    const staticFlatNames = floorMap["1st Floor"]
        .concat(floorMap["2nd Floor"], floorMap["3rd Floor"], floorMap["4th Floor"], floorMap["5th Floor"], floorMap["6th Floor"]);
    
    const data = getFromStorage("flatMaintenanceData", {});

    staticFlatNames.forEach((flatName) => {
      if (!data[flatName]) {
        // Create brand new flat
        data[flatName] = {
          id: flatName,
          name: flatName,
          status: "Owned",
          maintenanceStatus: {}, // Start empty
          paymentHistory: [],
        };
      } 
      
      // Ensure the maintenanceStatus object exists
      if (typeof data[flatName].maintenanceStatus !== 'object' || data[flatName].maintenanceStatus === null || Array.isArray(data[flatName].maintenanceStatus)) {
         console.log(`Migrating old data structure for flat ${flatName}`);
         data[flatName].maintenanceStatus = {};
      }
      
      // ** NEW: Ensure all years from 2023 to 2031 exist **
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
      const newNotification = {
          message: message,
          timestamp: new Date().toISOString()
      };
      const updatedNotifications = [newNotification, ...notifications].slice(0, 10);
      saveToStorage("notifications", updatedNotifications);
      renderNotifications();
  }
  
  function renderNotifications() {
      const notifications = getNotifications();
      if (notifications.length === 0) {
          notificationsList.innerHTML = `
            <div class="bg-gray-100 p-3 rounded-lg">
              <p class="text-sm text-gray-700 font-medium">No new notifications</p>
              <p class="text-xs text-gray-500">All systems are operational.</p>
            </div>`;
          return;
      }
      
      notificationsList.innerHTML = notifications.map(n => {
          const timeAgo = new Date(n.timestamp);
          return `
            <div class="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
              <p class="text-sm text-indigo-800 font-medium">${n.message}</p>
              <p class="text-xs text-indigo-500">${timeAgo.toLocaleString()}</p>
            </div>`;
      }).join('');
  }


  // --- Authentication ---

  function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; 
    let text = "";
    for (let i = 0; i < 5; i++) { 
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
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
    
    ctx.font = "bold 24px 'Inter', sans-serif";
    ctx.fillStyle = "#374151"; 
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.setTransform(1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, 1, 0, 0);
    ctx.fillText(currentCaptcha, captchaCanvas.width / 2, captchaCanvas.height / 2);
    ctx.setTransform(1, 0, 0, 1, 0, 0); 
  }
  
  if (reloadCaptchaBtn) {
    reloadCaptchaBtn.addEventListener("click", generateCaptcha);
  }

  function showLogin() {
    loginContainer.style.display = "flex";
    dashboardContainer.style.display = "none";
    loginError.textContent = "";
    if (usernameInput) usernameInput.value = "";
    if (passwordInput) passwordInput.value = "";
    if (captchaInput) captchaInput.value = "";
    generateCaptcha();
    if(usernameInput) usernameInput.focus();
  }

  function showDashboard() {
    loginContainer.style.display = "none";
    dashboardContainer.style.display = "block"; 
    
    activeSection = dashboardSection; 
    dashboardSection.style.display = "block";
    historySection.style.display = "none";
    financeSection.style.display = "none";
    settingsSection.style.display = "none";
    
    document.querySelectorAll(".main-nav button.active").forEach(b => b.classList.remove("active"));
    dashboardNavBtn.classList.add("active");

    renderFloorButtons();
    renderNotifications();
    
    floorNavigation.style.display = "flex";
    backToAllFlatsBtn.style.display = "none";
    flatList.style.display = "none";
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      loginError.textContent = "";
      const loginButton = loginForm.querySelector('button[type="submit"]');

      if ( usernameInput.value !== ADMIN_USERNAME || passwordInput.value !== ADMIN_PASSWORD ) {
        loginError.textContent = "Invalid Username or Password.";
        generateCaptcha(); 
        return;
      }
      
      if (captchaInput.value.toLowerCase() !== currentCaptcha.toLowerCase()) {
          loginError.textContent = "CAPTCHA does not match. Please try again.";
          generateCaptcha(); 
          captchaInput.value = "";
          return;
      }

      loginButton.disabled = true;
      loginError.textContent = "Sending OTP to admin email...";
      
      Swal.fire({ 
        title: 'Sending OTP...',
        text: 'Please wait while we email the admin.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        }
      });

      try {
        const response = await fetch(`${BACKEND_URL}/send-login-otp`, {
          method: "POST"
        });

        if (response.ok) {
          Swal.close();
          loginOtpInput.value = "";
          loginOtpError.textContent = "";
          showModal(loginOtpModal);
          loginError.textContent = ""; 
        } else {
          throw new Error("Failed to send OTP");
        }
      } catch (error) {
        console.error(error);
        Swal.close();
        loginError.textContent = "Error sending OTP. Check server and try again.";
      } finally {
        loginButton.disabled = false;
      }
    });
  }

  loginOtpCancelBtn.addEventListener("click", () => {
      hideModal(loginOtpModal);
      loginError.textContent = "Login cancelled.";
      generateCaptcha();
  });
  
  loginOtpVerifyBtn.addEventListener("click", async () => {
    const otp = loginOtpInput.value.trim();
    if (!otp) {
        loginOtpError.textContent = "Please enter the OTP.";
        return;
    }

    loginOtpError.textContent = "Verifying...";
    loginOtpVerifyBtn.disabled = true;

    try {
        const response = await fetch(`${BACKEND_URL}/verify-login-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ otp: otp })
        });

        if (response.ok) {
            hideModal(loginOtpModal);
            saveToStorage("isAuthenticated", "true");
            showToast('Login Successful!', 'success'); 
            showDashboard();
        } else {
            const data = await response.json();
            loginOtpError.textContent = data.message || "Invalid OTP. Please try again.";
        }
    } catch (error) {
        console.error(error);
        loginOtpError.textContent = "Error verifying OTP. Please try again.";
    } finally {
        loginOtpVerifyBtn.disabled = false;
    }
  });

  const handleLogout = () => {
      Swal.fire({ 
        title: 'Are you sure?',
        text: "You will be logged out.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4f46e5',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log out!'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("isAuthenticated");
          showLogin();
          showToast('Logged out successfully.', 'info');
        }
      });
  };

  logoutButtonDesktop.addEventListener("click", handleLogout);
  logoutButtonMobile.addEventListener("click", handleLogout);


  // --- Forgot Password Modal Logic ---
  
  function showForgotPasswordModal() {
    forgotStep1.classList.remove("hidden");
    forgotStep2.classList.add("hidden");
    forgotStep3.classList.add("hidden");
    forgotEmailInput.value = "";
    forgotOtpInput.value = "";
    forgotEmailError.textContent = "";
    forgotOtpError.textContent = "";
    showModal(forgotPasswordModal);
  }

  function hideForgotPasswordModal() {
    hideModal(forgotPasswordModal);
  }

  if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener("click", showForgotPasswordModal);
    forgotCancelBtn.addEventListener("click", hideForgotPasswordModal);
    forgotCancelBtn2.addEventListener("click", hideForgotPasswordModal);
    forgotSuccessCloseBtn.addEventListener("click", hideForgotPasswordModal);
  }

  forgotEmailNextBtn.addEventListener("click", async () => {
    if (forgotEmailInput.value.trim().toLowerCase() !== ADMIN_EMAIL) {
      forgotEmailError.textContent = "Email does not match admin records.";
      return;
    }

    forgotEmailError.textContent = "Sending OTP...";
    forgotEmailNextBtn.disabled = true;

    Swal.fire({ 
      title: 'Sending OTP...',
      text: `Sending verification code to ${ADMIN_EMAIL}`,
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading() }
    });

    try {
        const response = await fetch(`${BACKEND_URL}/send-forgot-otp`, {
            method: "POST"
        });

        if (response.ok) {
            Swal.close();
            forgotStep1.classList.add("hidden");
            forgotStep2.classList.remove("hidden");
            forgotEmailError.textContent = "";
        } else {
            throw new Error("Failed to send OTP");
        }
    } catch (error) {
        console.error(error);
        Swal.close();
        forgotEmailError.textContent = "Error sending OTP. Check server.";
    } finally {
        forgotEmailNextBtn.disabled = false;
    }
  });

  forgotOtpVerifyBtn.addEventListener("click", async () => {
    const otp = forgotOtpInput.value.trim();
    if (!otp) {
        forgotOtpError.textContent = "Please enter the OTP.";
        return;
    }

    forgotOtpError.textContent = "Verifying...";
    forgotOtpVerifyBtn.disabled = true;

    try {
        const response = await fetch(`${BACKEND_URL}/verify-forgot-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ otp: otp })
        });

        if (response.ok) {
            forgotStep2.classList.add("hidden");
            forgotStep3.classList.remove("hidden");
            forgotOtpError.textContent = "";
        } else {
            const data = await response.json();
            forgotOtpError.textContent = data.message || "Invalid OTP. Please try again.";
        }
    } catch (error) {
        console.error(error);
        forgotOtpError.textContent = "Error verifying OTP. Please try again.";
    } finally {
        forgotOtpVerifyBtn.disabled = false;
    }
  });


  // --- Section Navigation ---

  dashboardNavBtn.addEventListener("click", () => {
    navigateToSection(dashboardNavBtn, dashboardSection);
    floorNavigation.style.display = "flex";
    backToAllFlatsBtn.style.display = "none";
    flatList.style.display = "none";
  });

  historyNavBtn.addEventListener("click", () => {
    navigateToSection(historyNavBtn, historySection);
    renderPaymentHistoryTable(flats);
    updatePendingMaintenancePdfButton();
    generateSearchedFlatPdfButton.style.display = 'none';
  });

  financeNavBtn.addEventListener("click", () => {
    navigateToSection(financeNavBtn, financeSection);
    renderBudgetSection();
    updateFinancePdfButtons();
    populateFinancialYearSelect();
    populateTxnHistoryYearSelect();
    populatePLYearSelect();
  });
  
  settingsNavBtn.addEventListener("click", () => {
      navigateToSection(settingsNavBtn, settingsSection);
      maintenanceAmountInput.value = getMaintenanceAmount();
  });


  // --- Maintenance Portal (Dashboard) ---

  function renderFloorButtons() {
    floorNavigation.innerHTML = "";
    const floorNames = Object.keys(floorMap);
    floorNames.forEach((floor) => {
      const button = document.createElement("button");
      button.textContent = floor;
      button.className = "floor-button bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-transform transform hover:-translate-y-1 duration-200 shadow-xl";
      button.addEventListener("click", () => {
        filterFlatsByFloor(floor);
      });
      floorNavigation.appendChild(button);
    });
  }

  function filterFlatsByFloor(floor) {
    const flatsForFloor = floorMap[floor];
    const filteredFlatsData = {};
    flatsForFloor.forEach((flatNum) => {
      if (flats[flatNum]) {
        filteredFlatsData[flatNum] = flats[flatNum];
      }
    });

    floorNavigation.style.display = "none";
    backToAllFlatsBtn.style.display = "flex";
    flatList.style.display = "grid";
    renderFlatCards(filteredFlatsData);
  }

  backToAllFlatsBtn.addEventListener("click", () => {
    floorNavigation.style.display = "flex";
    backToAllFlatsBtn.style.display = "none";
    flatList.style.display = "none";
  });

  async function sendReceipt(flatNumber, date, months, year, amount, mode, remarks) {
    const emails = FLAT_EMAIL_MAP[flatNumber];
    if (!emails || emails.length === 0) {
      console.warn(`No email recipients found for flat ${flatNumber}. Skipping email.`);
      return; 
    }

    const receiptData = {
      flatNumber,
      emails,
      date: formatDate(date), 
      months: months.map(m => `${m} (${year})`), // e.g., "Jan (2023)"
      amount,
      mode,
      remarks
    };

    try {
      const response = await fetch(`${BACKEND_URL}/send-receipt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(receiptData)
      });
      if (response.ok) {
        showToast(`Receipts sent to owners of flat ${flatNumber}.`, 'success');
      } else {
        throw new Error('Server failed to send receipts.');
      }
    } catch (error) {
      console.error('Error sending receipt:', error);
      showAlert('Receipt Error', `Payment was saved, but failed to send email receipts to owners of flat ${flatNumber}.`, 'error');
    }
  }

  // ** UPDATED: renderFlatCards with Multi-Year Logic **
  function renderFlatCards(flatsToRender = flats) {
    flatList.innerHTML = "";
    if (Object.keys(flatsToRender).length === 0) {
      flatList.innerHTML = "<p class='text-center text-gray-500 italic p-10 col-span-full'>No Flats Found.</p>";
      return;
    }
    
    const currentMaintenanceAmount = getMaintenanceAmount(); 

    Object.values(flatsToRender).sort((a, b) => a.name.localeCompare(b.name)).forEach((flat) => {
      let selectedMonthsForThisCard = [];
      const card = document.createElement("div");
      card.className = "flat-card"; 
      
      const maintenanceYears = Object.keys(flat.maintenanceStatus).sort((a, b) => b - a); // Sort desc
      const currentYear = new Date().getFullYear().toString();
      let selectedYear = card.dataset.selectedYear || (maintenanceYears.includes(currentYear) ? currentYear : maintenanceYears[0]);
      
      if (!flat.maintenanceStatus[selectedYear]) {
          selectedYear = maintenanceYears[0];
      }

      let badgeClass = "";
      if (flat.status === "Owned") badgeClass = "badge-owned";
      else if (flat.status === "Rented") badgeClass = "badge-rented";
      else if (flat.status === "Empty") badgeClass = "badge-empty";

      const generateMonthStatusHtml = (year) => {
          const yearStatus = flat.maintenanceStatus[year] || createBlankYear();
          return MONTHS_SHORT.map(
            (month) => {
              const isPaid = yearStatus[month];
              const bgColor = isPaid ? 'bg-green-100' : 'bg-gray-100';
              const textColor = isPaid ? 'text-green-800' : 'text-gray-500';
              const fontWeight = isPaid ? 'font-semibold' : 'font-medium';
              
              return `
                <div class="${bgColor} ${textColor} ${fontWeight} text-xs px-2 py-1.5 rounded-md text-center">
                  ${month}
                </div>
              `;
            }
          ).join("");
      };
      
      let paymentHistoryHtml = `<p class='no-payments-message text-sm italic text-gray-500 text-center p-4'>No Payments Recorded.</p>`;
      if (flat.paymentHistory.length > 0) {
           paymentHistoryHtml = `
            <ul class="space-y-2 p-4">
              ${flat.paymentHistory
                .slice()
                .sort((a,b) => getDateObj(b.date) - getDateObj(a.date)) // Sort desc
                .map(
                  (p) =>
                    `<li class="bg-gray-50 p-3 rounded-md text-xs border border-gray-200">
                      <strong>Month:</strong> ${p.month} (${p.year || new Date(p.date).getFullYear()}), 
                      <strong>Date:</strong> ${formatDate(p.date)}, 
                      <strong>₹${p.amount}</strong>, 
                      <strong>Mode:</strong> ${p.mode}
                      ${p.remarks ? `, <strong>Remarks:</strong> ${p.remarks}` : ""}
                    </li>`
                )
                .join("")}
            </ul>`;
      }

      const monthInputHTML = `
        <div class="month-search-container">
            <div class="relative">
                <input type="text" class="month-search-input form-input w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Type to select month(s)..." autocomplete="off">
                <button type="button" class="select-all-months-btn">Select All</button>
            </div>
            <div class="month-suggestions-dropdown hidden">
                <!-- Suggestions will be built by JS -->
            </div>
            <div class="selected-months-container mt-2 flex flex-wrap gap-2">
                <!-- Selected month tags will go here -->
            </div>
        </div>
      `;
      
      const yearSelectorHTML = `
        <div class="maintenance-status-header">
            <h4>Maintenance Status</h4>
            <select class="maintenance-year-select form-select">
                ${maintenanceYears.map(year => `<option value="${year}" ${year === selectedYear ? 'selected' : ''}>${year}</option>`).join('')}
            </select>
        </div>
      `;

      card.innerHTML = `
        <div class="flat-card-header">
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-3xl font-bold text-indigo-600">${flat.name}</h3>
            <div class="status-overlay px-3 py-1 text-xs font-bold rounded-full ${badgeClass}">${flat.status}</div>
          </div>
          <div class="flat-status space-x-4">
            <label class="text-sm cursor-pointer"><input type="radio" name="status-${flat.id}" value="Owned" ${flat.status === "Owned" ? "checked" : ""} class="form-radio mr-1 text-indigo-600">Owned</label>
            <label class="text-sm cursor-pointer"><input type="radio" name="status-${flat.id}" value="Rented" ${flat.status === "Rented" ? "checked" : ""} class="form-radio mr-1 text-indigo-600">Rented</label>
            <label class="text-sm cursor-pointer"><input type="radio" name="status-${flat.id}" value="Empty" ${flat.status === "Empty" ? "checked" : ""} class="form-radio mr-1 text-indigo-600">Empty</label>
          </div>
        </div>

        <div class="flat-card-body">
          ${yearSelectorHTML}
          
          <div class="month-status-grid grid grid-cols-6 gap-2 mb-6 mt-3">
            ${generateMonthStatusHtml(selectedYear)}
          </div>
          
          <details class="flat-accordion border-t border-gray-200 pt-4">
            <summary class="text-gray-700 hover:text-indigo-600">View Payment History</summary>
            <div class="flat-payment-history mt-4 max-h-48 overflow-y-auto custom-scrollbar border border-gray-200 rounded-lg">
                ${paymentHistoryHtml}
            </div>
          </details>
        </div>
        
        <div class="flat-card-footer">
          <div class="payment-disabled-message p-5 text-center text-sm text-gray-500 italic ${flat.status !== 'Empty' ? 'hidden' : ''}">
            Maintenance entry is disabled for empty flats.
          </div>
          
          <details class="payment-section flat-accordion ${flat.status === 'Empty' ? 'hidden' : ''}">
            <summary class="text-gray-700 hover:text-indigo-600 p-5">
              Add New Maintenance Record
            </summary>
            <div class="payment-form-content flat-accordion-content">
              <div class="space-y-4">
                <input type="number" class="payment-amount form-input w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600" value="${currentMaintenanceAmount}" readonly>
                
                ${monthInputHTML} 
                
                <input type="date" class="payment-date form-input w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <select class="payment-mode form-select w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Select Mode</option>
                  <option value="UPI">UPI</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
                <textarea class="payment-remarks form-textarea w-full px-4 py-2 border border-gray-300 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Remarks (UPI ID, Cheque No., etc.)"></textarea>
                <button class="add-payment-btn w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-transform transform hover:-translate-y-0.5 duration-200 shadow-lg">Add Payment</button>
              </div>
            </div>
          </details>
        </div>
      `;

      flatList.appendChild(card);

      // --- Event Listeners for this card ---
      card
        .querySelectorAll(`input[name="status-${flat.id}"]`)
        .forEach((radio) => {
          radio.addEventListener("change", () => {
            flat.status = radio.value;
            saveToStorage("flatMaintenanceData", flats);
            renderFlatCards(flatsToRender); 
          });
        });
        
      const yearSelect = card.querySelector('.maintenance-year-select');
      const monthStatusGrid = card.querySelector('.month-status-grid');
      
      yearSelect.addEventListener('change', () => {
          const newSelectedYear = yearSelect.value;
          card.dataset.selectedYear = newSelectedYear; 
          monthStatusGrid.innerHTML = generateMonthStatusHtml(newSelectedYear);
      });
        
      // --- Month Autocomplete Logic ---
      const monthInput = card.querySelector('.month-search-input');
      const monthSuggestions = card.querySelector('.month-suggestions-dropdown');
      const tagsContainer = card.querySelector('.selected-months-container');
      const selectAllBtn = card.querySelector('.select-all-months-btn');

      const renderMonthTags = () => {
        tagsContainer.innerHTML = selectedMonthsForThisCard.map(month => `
          <div class="selected-month-tag">
            <span>${month}</span>
            <button type="button" class="selected-month-tag-remove" data-month="${month}">&times;</button>
          </div>
        `).join('');
      };

      monthInput.addEventListener('input', () => {
        const query = monthInput.value.toLowerCase();
        const currentSelectedYear = card.querySelector('.maintenance-year-select').value;
        const yearStatus = flat.maintenanceStatus[currentSelectedYear] || createBlankYear();
        
        const availableMonths = MONTHS_SHORT.filter(m => 
            !selectedMonthsForThisCard.includes(m) && // Not already in tag list
            !yearStatus[m] && // Not already paid for this year
            m.toLowerCase().startsWith(query) 
        );
        
        if (availableMonths.length > 0) {
          monthSuggestions.innerHTML = availableMonths.map(m => 
            `<div class="month-suggestion-item" data-month="${m}">${m}</div>`
          ).join('');
          monthSuggestions.classList.remove('hidden');
        } else {
          monthSuggestions.classList.add('hidden');
        }
      });
      
      monthInput.addEventListener('blur', () => {
          setTimeout(() => {
              monthSuggestions.classList.add('hidden');
          }, 150);
      });
      
      monthInput.addEventListener('focus', () => {
          const currentSelectedYear = card.querySelector('.maintenance-year-select').value;
          const yearStatus = flat.maintenanceStatus[currentSelectedYear] || createBlankYear();
          const availableMonths = MONTHS_SHORT.filter(m => !selectedMonthsForThisCard.includes(m) && !yearStatus[m]);
           if (availableMonths.length > 0) {
              monthSuggestions.innerHTML = availableMonths.map(m => 
                `<div class="month-suggestion-item" data-month="${m}">${m}</div>`
              ).join('');
              monthSuggestions.classList.remove('hidden');
           }
      });

      monthSuggestions.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('month-suggestion-item')) {
          const clickedMonth = e.target.dataset.month;
          selectedMonthsForThisCard.push(clickedMonth);
          renderMonthTags();
          monthInput.value = "";
          monthSuggestions.classList.add('hidden');
        }
      });

      tagsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('selected-month-tag-remove')) {
          const monthToRemove = e.target.dataset.month;
          selectedMonthsForThisCard = selectedMonthsForThisCard.filter(m => m !== monthToRemove);
          renderMonthTags();
        }
      });
      
      selectAllBtn.addEventListener('click', () => {
          const currentSelectedYear = card.querySelector('.maintenance-year-select').value;
          const yearStatus = flat.maintenanceStatus[currentSelectedYear] || createBlankYear();
          // Select all months for that year that are not paid and not already tagged
          const allMonths = MONTHS_SHORT.filter(m => !yearStatus[m] && !selectedMonthsForThisCard.includes(m));
          selectedMonthsForThisCard.push(...allMonths);
          renderMonthTags();
      });

      const addBtn = card.querySelector(".add-payment-btn");
      if (addBtn) {
        addBtn.addEventListener("click", () => {
          const amountPerMonth = getMaintenanceAmount(); 
          
          const selectedMonths = selectedMonthsForThisCard;
          
          const paymentDateStr = card.querySelector(".payment-date").value;
          const mode = card.querySelector(".payment-mode").value;
          const remarks = card.querySelector(".payment-remarks").value;

          // ** THIS IS THE FIX: Get the year from the dropdown **
          const maintenanceYear = card.querySelector('.maintenance-year-select').value;

          if (!selectedMonths.length || !paymentDateStr || !mode) {
            showAlert("Incomplete Form", "Please Fill All Required Fields: Months, Date, and Mode Of Payment.", "warning");
            return;
          }
          
          // Create year object if it doesn't exist (should be redundant now, but safe)
          if (!flat.maintenanceStatus[maintenanceYear]) {
              flat.maintenanceStatus[maintenanceYear] = createBlankYear();
          }

          let alreadyPaidMonths = [];
          let newMonths = [];

          selectedMonths.forEach((month) => {
            // ** FIXED: Check the correct maintenanceYear **
            if (!flat.maintenanceStatus[maintenanceYear][month]) {
              flat.maintenanceStatus[maintenanceYear][month] = true;
              flat.paymentHistory.push({
                amount: amountPerMonth,
                month: month,
                date: paymentDateStr, 
                year: maintenanceYear, // ** Store the maintenance year **
                mode: mode,
                remarks: remarks,
              });
              newMonths.push(month);
            } else {
              alreadyPaidMonths.push(month);
            }
          });

          if (newMonths.length > 0) {
              const newTotalAmount = amountPerMonth * newMonths.length;
              // ** FIXED: Reason uses maintenanceYear **
              const newReason = `Maintenance of Flat: ${flat.name} for ${newMonths.join(", ")} ${maintenanceYear}`;
              
              // ** CORRECT: Budget uses paymentDateStr **
              addFundToBudget(newTotalAmount, paymentDateStr, newReason, true); 
              
              const currentYearStatus = flat.maintenanceStatus[maintenanceYear];
              const isYearComplete = MONTHS_SHORT.every(m => currentYearStatus[m]);
              if (isYearComplete) {
                  const nextYear = (parseInt(maintenanceYear) + 1).toString();
                  if (!flat.maintenanceStatus[nextYear] && MAINTENANCE_YEARS.includes(parseInt(nextYear))) {
                      flat.maintenanceStatus[nextYear] = createBlankYear();
                  }
              }
              
              saveToStorage("flatMaintenanceData", flats);
              renderFlatCards(flatsToRender); 
              
              let alertMessage = `Maintenance of ₹${newTotalAmount} for ${flat.name} (${newMonths.join(", ")}) for **${maintenanceYear}** has been added!`;
              if (alreadyPaidMonths.length > 0) {
                  alertMessage += `<br><br>Note: ${alreadyPaidMonths.join(", ")} was already paid for ${maintenanceYear} and was skipped.`;
              }
              showAlert("Maintenance Added!", alertMessage, "success");
              addNotification(`Flat ${flat.name}: ₹${newTotalAmount} maintenance added.`);

              sendReceipt(flat.name, paymentDateStr, newMonths, maintenanceYear, newTotalAmount, mode, remarks);

          } else if (alreadyPaidMonths.length > 0) {
              showAlert("Already Paid", `Maintenance for ${alreadyPaidMonths.join(", ")} for ${maintenanceYear} has already been paid.`, "info");
          }

          selectedMonthsForThisCard = [];
          renderMonthTags();
          card.querySelector(".payment-date").value = "";
          card.querySelector(".payment-mode").value = "";
          card.querySelector(".payment-remarks").value = "";
          
          const detailsElement = card.querySelector('.payment-section');
          if (detailsElement) {
              detailsElement.removeAttribute('open');
          }
        });
      }
    });
  }


  // --- Maintenance History Portal ---

  function renderPaymentHistoryTable(data) {
    const allPayments = [];
    Object.values(data).forEach((flat) => {
      flat.paymentHistory.forEach((p) => {
        allPayments.push({ flat: flat.name, ...p });
      });
    });

    allPayments.sort((a, b) => getDateObj(a.date) - getDateObj(b.date));

    if (allPayments.length === 0) {
        paymentHistoryTableContainer.innerHTML = `<p class='no-results text-center text-gray-500 italic p-10'>No Payments Recorded.</p>`;
        return;
    }

    const tableHTML = `
      <table class="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Payment Date</th>
            <th class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Flat Number</th>
            <th class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Amount</th>
            <th class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Month (for Year)</th>
            <th class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Mode</th>
            <th class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Remarks</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          ${allPayments
            .map(
              (p) =>
                `<tr class="hover:bg-gray-50 transition duration-150">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${formatDate(p.date)}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${p.flat}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹${p.amount}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${p.month} (${p.year || new Date(p.date).getFullYear()})</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${p.mode}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${p.remarks || "-"}</td>
                </tr>`
            )
            .join("")}
        </tbody>
      </table>`;
    paymentHistoryTableContainer.innerHTML = tableHTML;
  }
  
  flatSearchInput.addEventListener("input", () => {
    const query = flatSearchInput.value.trim().toLowerCase();
    generateSearchedFlatPdfButton.style.display = 'none'; 
    
    if (!query) {
      searchResultsDropdown.innerHTML = "";
      searchResultsDropdown.classList.add("hidden");
      return;
    }

    const allFlatNumbers = Object.keys(flats);
    const matches = allFlatNumbers.filter(flatNum => flatNum.startsWith(query));

    if (matches.length > 0) {
      searchResultsDropdown.innerHTML = matches.map(match => 
        `<div class="search-result-item px-4 py-2 hover:bg-gray-100 cursor-pointer">${match}</div>`
      ).join("");
      searchResultsDropdown.classList.remove("hidden");
    } else {
      searchResultsDropdown.innerHTML = "";
      searchResultsDropdown.classList.add("hidden");
    }
  });

  searchResultsDropdown.addEventListener("click", (e) => {
    if (e.target.classList.contains("search-result-item")) {
      flatSearchInput.value = e.target.textContent;
      searchResultsDropdown.innerHTML = "";
      searchResultsDropdown.classList.add("hidden");
    }
  });
  
  document.addEventListener("click", (e) => {
      // Close search dropdown
      if (!e.target.closest("#flat-search-input") && !e.target.closest("#search-results-dropdown")) {
          searchResultsDropdown.classList.add("hidden");
      }
      
      // Close all open month dropdowns
      document.querySelectorAll('.month-suggestions-dropdown').forEach(dropdown => {
          if (!dropdown.closest('.month-search-container').contains(e.target)) {
              dropdown.classList.add('hidden');
          }
      });
  });

  searchButton.addEventListener("click", () => {
    const query = flatSearchInput.value.trim();
    searchResultsDropdown.classList.add("hidden");
    generateSearchedFlatPdfButton.style.display = 'none';
    
    if (!query) {
      renderPaymentHistoryTable(flats);
      return;
    }
    const filtered = {};
    let matchFound = false;
    Object.entries(flats).forEach(([k, v]) => {
      if (k.includes(query)) {
          filtered[k] = v;
          matchFound = k === query; 
      }
    });
    renderPaymentHistoryTable(filtered);

    if (matchFound && Object.keys(filtered).length === 1 && flats[query].paymentHistory.length > 0) {
        generateSearchedFlatPdfButton.style.display = 'flex';
    }
  });

  showAllButton.addEventListener("click", () => {
    flatSearchInput.value = "";
    generateSearchedFlatPdfButton.style.display = 'none';
    searchResultsDropdown.classList.add("hidden");
    renderPaymentHistoryTable(flats);
  });

  // --- Finance Portal ---
  
  function renderBudgetSection() {
    const budgetData = getBudgetData();
    totalFundsDisplay.textContent = `₹ ${budgetData.totalFunds.toFixed(2)}`;

    addFundAmountInput.value = "";
    addFundDateInput.value = "";
    addFundReasonInput.value = "";
    deductFundAmountInput.value = "";
    deductFundDateInput.value = "";
    deductFundReasonInput.value = "";

    const budgetTransactions = budgetData.transactions;
    budgetTransactions.sort((a, b) => getDateObj(a.date) - getDateObj(b.date));

    if (budgetTransactions.length === 0) {
        budgetHistoryTableContainer.innerHTML = `<p class='no-results text-center text-gray-500 italic p-10'>No Transactions To Display.</p>`;
        return;
    }

    const tableHTML = `
      <table class="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
            <th class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Type</th>
            <th class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Amount</th>
            <th class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Reason</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          ${budgetTransactions
            .map(
              (t) =>
                `<tr class="hover:bg-gray-50 transition duration-150 ${t.type === 'Added' ? 'bg-green-50' : 'bg-red-50'}">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${formatDate(t.date)}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium ${t.type === 'Added' ? 'text-green-600' : 'text-red-600'}">${t.type}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold ${t.type === 'Added' ? 'text-green-600' : 'text-red-600'}">₹${t.amount.toFixed(2)}</td>
                  <td class="px-6 py-4 text-sm text-gray-700 break-words">${t.reason}</td>
                </tr>`
            )
            .join("")}
        </tbody>
      </table>`;
    
    budgetHistoryTableContainer.innerHTML = tableHTML;
  }

  function addFundToBudget(amount, date, reason, silent = false) {
    let budgetData = getBudgetData();
    budgetData.totalFunds += amount;
    budgetData.transactions.push({
      type: "Added",
      amount: amount,
      date: date,
      reason: reason,
    });
    saveToStorage("budgetData", budgetData);
    
    if (!silent) {
        renderBudgetSection();
        updateFinancePdfButtons();
        populateFinancialYearSelect();
        populateTxnHistoryYearSelect();
        populatePLYearSelect();
        addNotification(`₹${amount.toFixed(2)} added to budget.`);
    }
  }

  function deductFundFromBudget(amount, date, reason) {
    let budgetData = getBudgetData();
    if (budgetData.totalFunds >= amount) {
      budgetData.totalFunds -= amount;
      budgetData.transactions.push({
        type: "Deducted",
        amount: amount,
        date: date,
        reason: reason,
      });
      saveToStorage("budgetData", budgetData);
      renderBudgetSection();
      updateFinancePdfButtons();
      populateFinancialYearSelect();
      populateTxnHistoryYearSelect();
      populatePLYearSelect();
      addNotification(`₹${amount.toFixed(2)} deducted from budget.`);
      return true;
    } else {
      showAlert("Insufficient Funds", "There are not enough funds for this deduction.", "error");
      return false;
    }
  }
  
  addFundBtn.addEventListener("click", () => {
    const amount = parseFloat(addFundAmountInput.value);
    const date = addFundDateInput.value;
    const reason = addFundReasonInput.value.trim();

    if (isNaN(amount) || amount <= 0 || !date || !reason) {
      showAlert("Invalid Input", "Please Enter a Valid Amount, Date and Reason.", "warning");
      return;
    }

    addFundToBudget(amount, date, reason);
    showAlert("Funds Added!", `Successfully Added ₹${amount.toFixed(2)} to Funds.`, "success");
  });

  deductFundBtn.addEventListener("click", () => {
    const amount = parseFloat(deductFundAmountInput.value);
    const date = deductFundDateInput.value;
    const reason = deductFundReasonInput.value.trim();

    if (isNaN(amount) || amount <= 0 || !date || !reason) {
      showAlert("Invalid Input", "Please Enter a Valid Amount, Date and Reason.", "warning");
      return;
    }

    const deducted = deductFundFromBudget(amount, date, reason);
    if (deducted) {
      showAlert("Funds Deducted", `Successfully Deducted ₹${amount.toFixed(2)} from Funds.`, "success");
    }
  });
  
  // --- Settings Portal ---
  
  saveSettingsBtn.addEventListener("click", async () => {
      const amountStr = maintenanceAmountInput.value;
      const amount = parseFloat(amountStr);

      if (isNaN(amount) || amount <= 0) {
          showAlert("Invalid Amount", "Please enter a valid, positive number for the maintenance amount.", "error");
          return;
      }
      
      newMaintenanceAmount = amount; 
      
      Swal.fire({
        title: 'Sending OTP...',
        text: `Sending verification code to ${ADMIN_EMAIL}`,
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading() }
      });

      try {
          const response = await fetch(`${BACKEND_URL}/send-settings-otp`, { method: "POST" });
          if (!response.ok) throw new Error("Failed to send OTP");

          Swal.close();
          settingsOtpInput.value = "";
          settingsOtpError.textContent = "";
          showModal(settingsOtpModal);

      } catch (error) {
          Swal.fire("Error", "Could not send OTP. Please check the server and try again.", "error");
      }
  });

  settingsOtpCancelBtn.addEventListener("click", () => {
      hideModal(settingsOtpModal);
  });
  
  settingsOtpVerifyBtn.addEventListener("click", async () => {
      const otp = settingsOtpInput.value.trim();
      if (!otp) {
          settingsOtpError.textContent = "Please enter the OTP.";
          return;
      }
      
      settingsOtpError.textContent = "Verifying...";
      settingsOtpVerifyBtn.disabled = true;

      try {
          const response = await fetch(`${BACKEND_URL}/verify-settings-otp`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ otp: otp })
          });

          if (response.ok) {
              saveToStorage("maintenanceAmount", newMaintenanceAmount);
              hideModal(settingsOtpModal);
              showToast('Settings saved successfully!', 'success');
              if(activeSection === dashboardSection) {
                  renderFlatCards(flats);
              }
          } else {
              const data = await response.json();
              settingsOtpError.textContent = data.message || "Invalid OTP. Please try again.";
          }
      } catch (error) {
          settingsOtpError.textContent = "Error verifying OTP. Please try again.";
      } finally {
          settingsOtpVerifyBtn.disabled = false;
      }
  });


  // --- PDF Generation & Button Disabling ---

  function getPendingMaintenanceData() {
    const tableData = [];
    
    Object.values(flats).forEach((flat) => {
      if (flat.status === "Empty") return;
      
      // ** UPDATED: Check all years for pending **
      Object.keys(flat.maintenanceStatus).forEach(year => {
          // Only report pending for current year or past years
          if (parseInt(year) <= new Date().getFullYear()) { 
              const yearStatus = flat.maintenanceStatus[year];
              const pendingMonths = MONTHS_SHORT.filter(
                (month) => !yearStatus[month]
              );
              if (pendingMonths.length > 0) {
                tableData.push([flat.name, year, pendingMonths.join(", "), flat.status]);
              }
          }
      });
    });
    return tableData;
  }
  
  function updatePendingMaintenancePdfButton() {
      const pendingData = getPendingMaintenanceData();
      generatePdfButton.disabled = pendingData.length === 0;
  }

  generatePdfButton.addEventListener("click", () => {
    if (generatePdfButton.disabled) {
        showAlert("No Data", "No pending maintenance records to generate a report.", "info");
        return;
    }
    const tableData = getPendingMaintenanceData();
    if (tableData.length === 0) return; 
    
    showToast("Generating Pending PDF...", "info");

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "mm", "a4");

    doc.setFontSize(16);
    doc.text("Pending Maintenance Report | All Flats (All Years)", 105, 15, { align: "center" });

    doc.autoTable({
      startY: 25,
      head: [["Flat Number", "Year", "Pending Months", "Status"]],
      body: tableData.sort((a,b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1])), // Sort by flat, then year
      theme: "grid",
      headStyles: { fillColor: [220, 53, 69], textColor: 255, fontSize: 12 },
      bodyStyles: { fontSize: 10, textColor: 20 },
    });
    doc.save("Shreeji_Complex_Pending_Maintenance_Report.pdf");
  });

  generateSearchedFlatPdfButton.addEventListener("click", () => {
      const flatNumber = flatSearchInput.value.trim();
      if (!flatNumber || !flats[flatNumber]) {
          showAlert("Error", "Invalid flat number selected.", "error");
          return;
      }
      
      const flat = flats[flatNumber];
      if (flat.paymentHistory.length === 0) {
          showAlert("No Data", `No payment history found for Flat ${flatNumber}.`, "info");
          return;
      }
      
      showToast(`Generating PDF for Flat ${flatNumber}...`, "info");
      
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF("p", "mm", "a4");
      
      doc.setFontSize(16);
      doc.text(`Payment History for Flat ${flatNumber}`, 105, 15, { align: "center" });
      doc.setFontSize(12);
      doc.text(`Status: ${flat.status}`, 14, 25);
      
      const tableData = flat.paymentHistory
        .sort((a,b) => getDateObj(a.date) - getDateObj(b.date)) // ** SORTED ASC **
        .map(p => [
            formatDate(p.date),
            `${p.month} (${p.year})`, // ** Use stored year **
            p.amount.toFixed(2), // Clean number
            p.mode,
            p.remarks || "-"
        ]);

      doc.autoTable({
          startY: 35,
          head: [["Date", "Month (for Year)", "Amount (₹)", "Mode", "Remarks"]],
          body: tableData,
          theme: "grid",
          headStyles: { fillColor: [22, 163, 74], textColor: 255, fontSize: 12 },
          bodyStyles: { fontSize: 10, textColor: 20, halign: 'right' },
          columnStyles: { 
              0: { halign: 'left' }, 
              1: { halign: 'left' },
              3: { halign: 'left' },
              4: { halign: 'left' }
          },
      });
      doc.save(`Shreeji_Complex_History_${flatNumber}.pdf`);
  });

  function updateFinancePdfButtons() {
      const budgetData = getBudgetData();
      const hasTransactions = budgetData.transactions.length > 0;
      
      generateBudgetPdfButton.disabled = !hasTransactions;
      overallProfitLossPdfBtn.disabled = !hasTransactions;
      generateAnnualStatementPdfBtn.disabled = !hasTransactions;
  }

  generateBudgetPdfButton.addEventListener("click", () => {
    if (generateBudgetPdfButton.disabled) {
        showAlert("No Data", "No transactions available to generate a report.", "info");
        return;
    }
    
    const selectedYear = txnHistoryYearSelect.value;
    if (!selectedYear) {
        showAlert("No Year Selected", "Please select a year for the transaction report.", "warning");
        return;
    }
    
    const budgetData = getBudgetData();
    let transactions = budgetData.transactions;
    
    let reportTitle = `Shreeji Complex Finance Report (${selectedYear})`;
    
    if (selectedYear !== "all") {
        transactions = transactions.filter(t => t.date && new Date(t.date).getFullYear() == selectedYear);
    } else {
        reportTitle = "Shreeji Complex Finance Report (All Time)";
    }
    
    if (transactions.length === 0) {
        showAlert("No Data", `No transactions found for ${selectedYear}.`, "info");
        return;
    }

    showToast(`Generating TXN History for ${selectedYear}...`, "info");
    
    transactions.sort((a, b) => getDateObj(a.date) - getDateObj(b.date)); // ** SORTED ASC **

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "mm", "a4");

    const totalFundsAdded = transactions
      .filter((t) => t.type === "Added")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalFundsDeducted = transactions
      .filter((t) => t.type === "Deducted")
      .reduce((sum, t) => sum + t.amount, 0);

    doc.setFontSize(16);
    doc.text(reportTitle, 105, 15, { align: "center" });
    doc.setFontSize(12);
    doc.setTextColor(40, 167, 69);
    doc.text(`Total Funds Added: ₹ ${totalFundsAdded.toFixed(2)}`, 15, 30);
    doc.setTextColor(220, 53, 69);
    doc.text(`Total Funds Deducted: ₹ ${totalFundsDeducted.toFixed(2)}`, 15, 38);
    doc.setTextColor(20);

    const tableData = transactions.map((t) => [
      formatDate(t.date),
      t.type,
      t.type === "Added" ? t.amount.toFixed(2) : "",
      t.type === "Deducted" ? t.amount.toFixed(2) : "",
      t.reason,
    ]);

    doc.autoTable({
      startY: 50,
      head: [["Date", "Type", "Funds Added (₹)", "Funds Deducted (₹)", "Reason"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [0, 123, 255], textColor: 255, fontSize: 12 },
      bodyStyles: { fontSize: 10, textColor: 20, halign: 'right' },
      columnStyles: { 
          0: { halign: 'left' }, 
          1: { halign: 'left' },
          4: { halign: 'left' }
      },
      didDrawCell: (data) => {
        if (data.row.section === "body") {
          const type = data.row.raw[1]; // Type is now at index 1
          if (type === "Added") {
              if (data.column.index === 1) data.cell.styles.textColor = [40, 167, 69];
              if (data.column.index === 2) data.cell.styles.fontStyle = "bold";
          } else if (type === "Deducted") {
              if (data.column.index === 1) data.cell.styles.textColor = [220, 53, 69];
              if (data.column.index === 3) data.cell.styles.fontStyle = "bold";
          }
        }
      }
    });
    doc.save(`Shreeji_Complex_TXN_History_${selectedYear}.pdf`);
  });

  overallProfitLossPdfBtn.addEventListener("click", () => {
    if (overallProfitLossPdfBtn.disabled) {
        showAlert("No Data", "No transactions available to generate a report.", "info");
        return;
    }
    
    const selectedYear = plReportYearSelect.value;
    if (!selectedYear) {
        showAlert("No Year Selected", "Please select a year for the P/L report.", "warning");
        return;
    }
    
    const budgetData = getBudgetData();
    let transactions = budgetData.transactions;
    let reportTitle = `Profit/Loss Report (${selectedYear})`;

    if (selectedYear !== "all") {
        transactions = transactions.filter(t => t.date && new Date(t.date).getFullYear() == selectedYear);
    } else {
        reportTitle = "Overall Profit/Loss Report (All Time)";
    }
    
    if (transactions.length === 0) {
        showAlert("No Data", `No transactions found for ${selectedYear}.`, "info");
        return;
    }
    
    showToast(`Generating P/L Report for ${selectedYear}...`, "info");
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "mm", "a4");

    const totalIncome = transactions
      .filter((t) => t.type === "Added")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === "Deducted")
      .reduce((sum, t) => sum + t.amount, 0);

    const netProfitLoss = totalIncome - totalExpenses;
    
    let profitLossPercent = 0;
    if (totalIncome > 0) {
        profitLossPercent = (netProfitLoss / totalIncome) * 100;
    } else if (totalIncome === 0 && totalExpenses > 0) {
        profitLossPercent = -100; // Total loss
    }
    
    const netColor = netProfitLoss >= 0 ? [40, 167, 69] : [220, 53, 69];

    doc.setFontSize(16);
    doc.text("Shreeji Complex Profit/Loss Report", 105, 15, { align: "center" });
    doc.setFontSize(12);
    doc.text(`For the Year: ${selectedYear}`, 105, 22, { align: "center" });

    const reportData = [
      ["Total Income (All Sources)", totalIncome.toFixed(2)],
      ["Total Expenses (All Deductions)", totalExpenses.toFixed(2)],
      ["Net Profit / (Loss)", netProfitLoss.toFixed(2)],
      ["Profit / (Loss) Percentage", `${profitLossPercent.toFixed(2)} %`]
    ];

    doc.autoTable({
      startY: 30,
      head: [["Metric", "Amount (₹)"]], 
      body: reportData,
      theme: "grid",
      headStyles: { fillColor: [139, 92, 246], textColor: 255 }, // purple-500
      bodyStyles: { halign: 'right' },
      columnStyles: { 0: { halign: 'left' } },
      didDrawCell: (data) => {
        if (data.row.section === "body") {
            if(data.row.index === 0) data.cell.styles.textColor = [40, 167, 69]; // Income
            if(data.row.index === 1) data.cell.styles.textColor = [220, 53, 69]; // Expense
            if (data.row.index === 2 || data.row.index === 3) { // Net and %
                data.cell.styles.fontStyle = "bold";
                data.cell.styles.textColor = netColor;
            }
        }
      }
    });
    
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("Disclaimer: This is a system-generated financial statement. Profit/Loss Percentage is calculated as (Net / Total Income).", 14, doc.lastAutoTable.finalY + 10);
    
    doc.save(`Shreeji_Complex_PL_Report_${selectedYear}.pdf`);
  });
  
  // -- Year Selectors --
  
  function getTransactionYears() {
      const budgetData = getBudgetData();
      const transactions = budgetData.transactions;
      let years = new Set();
      
      transactions.forEach(t => {
          if(t.date) years.add(new Date(t.date).getFullYear());
      });
      
      // ** UPDATED: Use defined year range **
      for (const year of MAINTENANCE_YEARS) {
          years.add(year);
      }
      
      return [...years].sort((a,b) => b - a); // Sort descending
  }
  
  function getFinancialYears() {
      const budgetData = getBudgetData();
      const transactions = budgetData.transactions;
      let options = new Set();
      
      // Add from existing transactions
      transactions.forEach(t => {
          if (!t.date) return;
          const date = new Date(t.date);
          const month = date.getMonth(); // 0-11
          const year = date.getFullYear();

          if (month >= 3) { // April (3) to Dec (11)
              options.add(`${year}-${year + 1}`);
          } else { // Jan (0) to Mar (2)
              options.add(`${year - 1}-${year}`);
          }
      });
      
      // ** UPDATED: Add from defined year range **
      for (const year of MAINTENANCE_YEARS) {
          options.add(`${year}-${year + 1}`);
          options.add(`${year - 1}-${year}`);
      }
      
      return [...options].sort((a,b) => b.localeCompare(a)); // Sort descending
  }
  
  function populateTxnHistoryYearSelect() {
      const years = getTransactionYears();
      if (years.length === 0) {
          txnHistoryYearSelect.innerHTML = `<option value="">No Data</option>`;
          return;
      }
      
      const currentYear = new Date().getFullYear();
      txnHistoryYearSelect.innerHTML = `<option value="all">All Time</option>` + years
        .map(y => `<option value="${y}" ${y === currentYear ? 'selected' : ''}>${y}</option>`)
        .join('');
  }
  
  function populatePLYearSelect() {
      const years = getTransactionYears();
      if (years.length === 0) {
          plReportYearSelect.innerHTML = `<option value="">No Data</option>`;
          return;
      }
      
      const currentYear = new Date().getFullYear();
      plReportYearSelect.innerHTML = `<option value="all">All Time</option>` + years
        .map(y => `<option value="${y}" ${y === currentYear ? 'selected' : ''}>${y}</option>`)
        .join('');
  }
  
  function populateFinancialYearSelect() {
      const fyOptions = getFinancialYears();
      if (fyOptions.length === 0) {
          financialYearSelect.innerHTML = `<option value="">No Data</option>`;
          return;
      }
      
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const currentFY = currentMonth >= 3 ? `${currentYear}-${currentYear + 1}` : `${currentYear - 1}-${currentYear}`;

      financialYearSelect.innerHTML = fyOptions
        .map(fy => `<option value="${fy}" ${fy === currentFY ? 'selected' : ''}>FY ${fy}</option>`)
        .join('');
  }
  
  generateAnnualStatementPdfBtn.addEventListener("click", () => {
      if (generateAnnualStatementPdfBtn.disabled) {
          showAlert("No Data", "No transactions available to generate a report.", "info");
          return;
      }
      
      const selectedFY = financialYearSelect.value;
      if (!selectedFY) {
          showAlert("No Year Selected", "Please select a financial year.", "warning");
          return;
      }
      
      showToast(`Generating Annual Statement...`, "info");
      
      const [startYear, endYear] = selectedFY.split('-').map(Number);
      const startDate = new Date(`${startYear}-04-01T00:00:00Z`);
      const endDate = new Date(`${endYear}-04-01T00:00:00Z`); 
      
      const budgetData = getBudgetData();
      const relevantTransactions = budgetData.transactions.filter(t => {
          if (!t.date) return false;
          const tDate = new Date(t.date);
          return tDate >= startDate && tDate < endDate; 
      }).sort((a, b) => getDateObj(a.date) - getDateObj(b.date)); // ** SORTED ASC **
      
      if (relevantTransactions.length === 0) {
          showAlert("No Data", `No transactions found for financial year ${selectedFY}.`, "info");
          return;
      }
      
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF("p", "mm", "a4");
      
      doc.setFontSize(16);
      doc.text(`Financial Statement for Shreeji Complex`, 105, 15, { align: "center" });
      doc.setFontSize(12);
      doc.text(`Financial Year: ${selectedFY} (01-Apr-${startYear} to 31-Mar-${endYear})`, 105, 22, { align: "center" });
      
      const income = relevantTransactions.filter(t => t.type === "Added");
      const expenses = relevantTransactions.filter(t => t.type === "Deducted");
      
      const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
      const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
      const net = totalIncome - totalExpenses;
      
      doc.autoTable({
          startY: 30,
          head: [["Summary", "Amount (₹)"]],
          body: [
              ["Total Income", totalIncome.toFixed(2)],
              ["Total Expenditure", totalExpenses.toFixed(2)],
              ["Net Profit / (Loss)", net.toFixed(2)]
          ],
          theme: "grid",
          headStyles: { fillColor: [13, 148, 136] }, // teal-600
          bodyStyles: { halign: 'right' },
          columnStyles: { 0: { halign: 'left' } },
          didDrawCell: (data) => {
              if (data.row.section === "body") {
                  if (data.row.index === 0) data.cell.styles.textColor = [40, 167, 69];
                  if (data.row.index === 1) data.cell.styles.textColor = [220, 53, 69];
                  if (data.row.index === 2) {
                      data.cell.styles.fontStyle = "bold";
                      data.cell.styles.textColor = net >= 0 ? [40, 167, 69] : [220, 53, 69];
                  }
              }
          }
      });
      
      const tableData = relevantTransactions.map(t => [
          formatDate(t.date),
          t.reason,
          t.type === "Added" ? t.amount.toFixed(2) : "",
          t.type === "Deducted" ? t.amount.toFixed(2) : ""
      ]);

      doc.autoTable({
          startY: doc.lastAutoTable.finalY + 10,
          head: [["Date", "Particulars", "Income (₹)", "Expenditure (₹)"]],
          body: tableData,
          theme: "striped",
          headStyles: { fillColor: [55, 65, 81] }, // gray-700
          bodyStyles: { fontSize: 9, halign: 'right' },
          columnStyles: { 0: { halign: 'left' }, 1: { halign: 'left' } },
          didDrawCell: (data) => {
              if (data.row.section === "body") {
                  if (data.column.index === 2 && data.cell.text[0] !== "") {
                      data.cell.styles.textColor = [40, 167, 69];
                  }
                  if (data.column.index === 3 && data.cell.text[0] !== "") {
                      data.cell.styles.textColor = [220, 53, 69];
                  }
              }
          }
      });
      
      const finalY = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text("Disclaimer: This is a system-generated financial statement based on user-entered data. It is not an official audit report. Please consult a chartered accountant for official audit and tax purposes.", 14, finalY);

      doc.save(`Shreeji_Complex_Statement_${selectedFY}.pdf`);
  });

  // --- Initial Setup ---
  function initializeApp() {
    
    flats = getFlatData();

    if (getFromStorage("isAuthenticated", "false") === "true") {
      showDashboard();
    } else {
      showLogin();
    }
  }

  initializeApp();
});