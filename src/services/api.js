// src/services/api.js
/**
 * Frontend API Service Layer.
 * Communicates with the Express backend endpoints using fetch.
 * Handles JWT credentials implicitly via httpOnly cookies.
 */

const API_BASE = '/api';

/**
 * handleResponse
 * Helper to parse fetch response and throw errors for non-2xx statuses.
 */
async function handleResponse(response) {
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;
  
  if (!response.ok) {
    const errorMsg = data?.message || `API error: ${response.status} ${response.statusText}`;
    throw new Error(errorMsg);
  }
  
  return data;
}

export async function loginSendOtp(username, password) {
  const response = await fetch(`${API_BASE}/login-send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return handleResponse(response);
}

export async function loginVerifyOtp(username, otp) {
  const response = await fetch(`${API_BASE}/login-verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, otp }),
  });
  return handleResponse(response);
}

export async function forgotSendOtp(email) {
  const response = await fetch(`${API_BASE}/forgot-send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return handleResponse(response);
}

export async function forgotVerifyOtp(otp) {
  const response = await fetch(`${API_BASE}/forgot-verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ otp }),
  });
  return handleResponse(response);
}

export async function checkAuth() {
  const response = await fetch(`${API_BASE}/check-auth`);
  return handleResponse(response);
}

export async function logout() {
  const response = await fetch(`${API_BASE}/logout`, { method: 'POST' });
  return handleResponse(response);
}

export async function getFlats() {
  const response = await fetch(`${API_BASE}/flats`);
  return handleResponse(response);
}

export async function updateFlatStatus(flatNumber, status) {
  const response = await fetch(`${API_BASE}/flats/${flatNumber}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return handleResponse(response);
}

export async function addPayment(paymentData) {
  const response = await fetch(`${API_BASE}/payments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData),
  });
  return handleResponse(response);
}

export async function sendReceipt(receiptData) {
  const response = await fetch(`${API_BASE}/send-receipt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(receiptData),
  });
  return handleResponse(response);
}

export async function getBudget() {
  const response = await fetch(`${API_BASE}/budget`);
  return handleResponse(response);
}

export async function addBudgetTransaction(type, amount, date, reason) {
  const response = await fetch(`${API_BASE}/budget`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, amount, date, reason }),
  });
  return handleResponse(response);
}

export async function getSettings() {
  const response = await fetch(`${API_BASE}/settings`);
  return handleResponse(response);
}

export async function updateSettings(maintenanceAmount) {
  const response = await fetch(`${API_BASE}/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ maintenanceAmount }),
  });
  return handleResponse(response);
}

export async function sendSettingsOtp() {
  const response = await fetch(`${API_BASE}/send-settings-otp`, {
    method: 'POST',
  });
  return handleResponse(response);
}

export async function verifySettingsOtp(otp) {
  const response = await fetch(`${API_BASE}/verify-settings-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ otp }),
  });
  return handleResponse(response);
}

export async function addFlatEmail(flatNumber, email) {
  const response = await fetch(`${API_BASE}/flats/${flatNumber}/emails`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return handleResponse(response);
}

export async function removeFlatEmail(flatNumber, email) {
  const response = await fetch(`${API_BASE}/flats/${flatNumber}/emails`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return handleResponse(response);
}

export async function sendEmailOtp(flatNumber, email) {
  const response = await fetch(`${API_BASE}/send-email-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ flatNumber, email }),
  });
  return handleResponse(response);
}

export async function verifyEmailOtp(otp, flatNumber, email, action) {
  const response = await fetch(`${API_BASE}/verify-email-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ otp, flatNumber, email, action }),
  });
  return handleResponse(response);
}