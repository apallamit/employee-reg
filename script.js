// Employee Exit Management System JavaScript

// Global state management
const state = {
    currentUser: {
        id: 'AR',
        name: 'Anuroop Pillarisetti',
        role: 'Lead Customer Success',
        department: 'Customer Success',
        hasResignation: false,
        resignationStatus: null
    },
    exitRequests: [
        {
            id: 1,
            employee: 'Zoeb Nomi',
            role: 'Software Developer',
            type: 'Termination',
            noticeDate: '18 Dec 2024',
            reason: 'Death',
            comment: 'c',
            lastWorkingDay: '18 Dec 2024',
            status: 'pending',
            approver: 'Raj Varaham'
        },
        {
            id: 2,
            employee: 'Neeraj Chopra',
            role: 'Project Manager',
            type: 'Resignation',
            noticeDate: '18 Dec 2024',
            reason: 'Explore Other careers',
            comment: 'cd',
            lastWorkingDay: '18 Feb 2025',
            status: 'pending',
            approver: 'Global admin / HR manager'
        }
    ],
    resignationReasons: [
        'Health Reason',
        'Retirement',
        'Personal Reasons',
        'Relocating',
        'Explore Other careers',
        'Other'
    ],
    terminationReasons: [
        'Absconding',
        'Death',
        'Medical Condition',
        'Performance Issue',
        'Misconduct'
    ]
};

// DOM Elements
const elements = {
    // Navigation
    navTabs: document.querySelectorAll('.tab-btn'),
    tabContents: document.querySelectorAll('.tab-content'),
    
    // Profile
    resignBtn: document.getElementById('resignBtn'),
    resignationBanner: document.getElementById('resignationBanner'),
    resignationStatus: document.getElementById('resignationStatus'),
    
    // Modal
    resignationModal: document.getElementById('resignationModal'),
    closeModal: document.getElementById('closeModal'),
    cancelResignation: document.getElementById('cancelResignation'),
    submitResignation: document.getElementById('submitResignation'),
    resignationForm: document.getElementById('resignationForm'),
    
    // Exit Process
    exitTabs: document.querySelectorAll('.exit-tab'),
    exitPhases: document.querySelectorAll('.exit-phase'),
    
    // Settings
    settingsTabs: document.querySelectorAll('.settings-tab'),
    settingsContents: document.querySelectorAll('.settings-content'),
    editSettingsBtn: document.getElementById('editSettingsBtn')
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadDashboardData();
});

function initializeApp() {
    // Set initial active states
    showTab('dashboard');
    showExitPhase('under-review');
    showSettingsContent('resignation-settings');
    
    // Update UI based on current state
    updateResignationStatus();
}

function setupEventListeners() {
    // Navigation tabs
    elements.navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            showTab(tabName);
        });
    });
    
    // Profile tabs
    document.querySelectorAll('.profile-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            showProfileTab(tabName);
        });
    });
    
    // Exit process tabs
    elements.exitTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const phase = tab.dataset.phase;
            showExitPhase(phase);
        });
    });
    
    // Settings tabs
    elements.settingsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const settingsType = tab.dataset.settings;
            showSettingsContent(`${settingsType}-settings`);
        });
    });
    
    // Resignation modal
    elements.resignBtn.addEventListener('click', openResignationModal);
    elements.closeModal.addEventListener('click', closeResignationModal);
    elements.cancelResignation.addEventListener('click', closeResignationModal);
    elements.submitResignation.addEventListener('click', submitResignation);
    
    // Close modal when clicking outside
    elements.resignationModal.addEventListener('click', (e) => {
        if (e.target === elements.resignationModal) {
            closeResignationModal();
        }
    });
    
    // Settings edit button
    elements.editSettingsBtn.addEventListener('click', toggleSettingsEdit);
    
    // Form validation
    elements.resignationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        validateResignationForm();
    });
    
    // Exit management panel
    setupExitManagementPanel();
    
    // Setup action buttons and modals
    setupActionButtons();
    setupModals();
    setupDropdownMenus();
    
    // Setup enhanced functionality
    setupAssetManagement();
    setupTeamManagement();
    setupSurveyManagement();
    setupTaskManagement();
    setupActivityManagement();
    setupAssetRecoveryModal();
}

function showTab(tabName) {
    // Update tab buttons
    elements.navTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        }
    });
    
    // Update tab content
    elements.tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabName) {
            content.classList.add('active');
        }
    });
}

function showProfileTab(tabName) {
    document.querySelectorAll('.profile-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.profile-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

function showExitPhase(phase) {
    elements.exitTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    elements.exitPhases.forEach(phaseEl => {
        phaseEl.classList.remove('active');
    });
    
    document.querySelector(`[data-phase="${phase}"]`).classList.add('active');
    document.getElementById(phase).classList.add('active');
}

function showSettingsContent(contentId) {
    elements.settingsTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    elements.settingsContents.forEach(content => {
        content.classList.remove('active');
    });
    
    document.querySelector(`[data-settings="${contentId.replace('-settings', '')}"]`).classList.add('active');
    document.getElementById(contentId).classList.add('active');
}

function openResignationModal() {
    elements.resignationModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Reset form
    elements.resignationForm.reset();
    
    // Add animation
    elements.resignationModal.querySelector('.modal-content').style.animation = 'modalSlideIn 0.3s ease';
}

function closeResignationModal() {
    elements.resignationModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function validateResignationForm() {
    const form = elements.resignationForm;
    const formData = new FormData(form);
    
    // Check if reason is selected
    const reasonSelect = form.querySelector('select');
    if (!reasonSelect.value) {
        showNotification('Please select a reason for resignation', 'error');
        return false;
    }
    
    // Check if manager discussion is selected
    const managerDiscussion = form.querySelector('input[name="manager-discussion"]:checked');
    if (!managerDiscussion) {
        showNotification('Please indicate if you discussed with your manager', 'error');
        return false;
    }
    
    return true;
}

function submitResignation() {
    if (!validateResignationForm()) {
        return;
    }
    
    const form = elements.resignationForm;
    const formData = new FormData(form);
    
    // Create resignation request
    const resignationRequest = {
        id: Date.now(),
        employee: state.currentUser.name,
        role: state.currentUser.role,
        type: 'Resignation',
        noticeDate: new Date().toLocaleDateString('en-GB'),
        reason: form.querySelector('select').value,
        comment: form.querySelector('textarea').value,
        lastWorkingDay: 'To be finalised',
        status: 'pending',
        approver: 'Global admin / HR manager',
        managerDiscussion: form.querySelector('input[name="manager-discussion"]:checked').value,
        earlyExit: form.querySelector('input[name="early-exit"]:checked').value
    };
    
    // Update state
    state.currentUser.hasResignation = true;
    state.currentUser.resignationStatus = 'pending';
    state.exitRequests.push(resignationRequest);
    
    // Update UI
    updateResignationStatus();
    updateExitProcessTable();
    closeResignationModal();
    
    // Show success message
    showNotification('Resignation submitted successfully! Your request is now under review.', 'success');
    
    // Simulate approval process
    setTimeout(() => {
        simulateApprovalProcess(resignationRequest.id);
    }, 5000);
}

function updateResignationStatus() {
    if (state.currentUser.hasResignation) {
        elements.resignationBanner.style.display = 'flex';
        elements.resignBtn.style.display = 'none';
        
        const statusText = state.currentUser.resignationStatus === 'pending' 
            ? 'Your resignation request is awaiting approval from Vijay Kumar +2 more reviewers. Last working day will be available post approval.'
            : 'Your resignation has been approved. Your last working day is 15 Feb 2025.';
        
        elements.resignationStatus.textContent = statusText;
    } else {
        elements.resignationBanner.style.display = 'none';
        elements.resignBtn.style.display = 'inline-flex';
    }
}

function simulateApprovalProcess(requestId) {
    const request = state.exitRequests.find(req => req.id === requestId);
    if (request) {
        request.status = 'approved';
        state.currentUser.resignationStatus = 'approved';
        updateResignationStatus();
        updateExitProcessTable();
        showNotification('Your resignation has been approved!', 'success');
    }
}

function updateExitProcessTable() {
    const tableBody = document.querySelector('#under-review .exit-table tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    state.exitRequests.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox"></td>
            <td>
                <div class="employee-info">
                    <div class="employee-avatar">${getInitials(request.employee)}</div>
                    <div>
                        <div class="employee-name">${request.employee}</div>
                        <div class="employee-role">${request.role}</div>
                    </div>
                </div>
            </td>
            <td><span class="exit-type ${request.type.toLowerCase()}">${request.type}</span></td>
            <td>${request.noticeDate}</td>
            <td>${request.reason}, ${request.comment}</td>
            <td>${request.lastWorkingDay} <span class="status-pending">(To be finalised)</span></td>
            <td>${request.approver} <span class="status-pending">(Needs to approve)</span></td>
            <td>
                <button class="btn btn-sm ${request.status === 'approved' ? 'btn-primary' : ''}">
                    ${request.status === 'approved' ? 'Complete Review' : 'View Details'}
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function toggleSettingsEdit() {
    const isEditing = elements.editSettingsBtn.textContent === 'Edit';
    
    if (isEditing) {
        elements.editSettingsBtn.textContent = 'Save';
        elements.editSettingsBtn.classList.add('btn-success');
        enableSettingsEditing();
    } else {
        elements.editSettingsBtn.textContent = 'Edit';
        elements.editSettingsBtn.classList.remove('btn-success');
        disableSettingsEditing();
        showNotification('Settings saved successfully!', 'success');
    }
}

function enableSettingsEditing() {
    // Enable all form controls
    document.querySelectorAll('#settings input, #settings select, #settings textarea').forEach(control => {
        control.disabled = false;
    });
    
    // Add visual feedback
    document.querySelectorAll('.setting-item, .reason-item').forEach(item => {
        item.style.backgroundColor = '#f8f9fa';
        item.style.border = '1px solid #dee2e6';
        item.style.borderRadius = '5px';
        item.style.padding = '1rem';
        item.style.marginBottom = '0.5rem';
    });
}

function disableSettingsEditing() {
    // Disable all form controls
    document.querySelectorAll('#settings input, #settings select, #settings textarea').forEach(control => {
        control.disabled = true;
    });
    
    // Remove visual feedback
    document.querySelectorAll('.setting-item, .reason-item').forEach(item => {
        item.style.backgroundColor = '';
        item.style.border = '';
        item.style.borderRadius = '';
        item.style.padding = '';
        item.style.marginBottom = '';
    });
}

function loadDashboardData() {
    // Update dashboard statistics
    const pendingCount = state.exitRequests.filter(req => req.status === 'pending').length;
    const inProgressCount = state.exitRequests.filter(req => req.status === 'approved').length;
    
    document.querySelector('.dashboard-card:nth-child(1) .stat-number').textContent = pendingCount;
    document.querySelector('.dashboard-card:nth-child(2) .stat-number').textContent = inProgressCount;
    
    // Update exit process badges
    document.querySelector('[data-phase="under-review"] .badge').textContent = pendingCount;
    document.querySelector('[data-phase="in-progress"] .badge').textContent = inProgressCount;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
        border-radius: 5px;
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }
    
    .btn-success {
        background: #28a745 !important;
    }
    
    .btn-success:hover {
        background: #218838 !important;
    }
`;
document.head.appendChild(style);

// Utility functions
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-GB');
}

function generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
}

function setupExitManagementPanel() {
    const manageButtons = document.querySelectorAll('.manage-btn');
    const closePanelBtn = document.getElementById('closePanelBtn');
    const exitManagementPanel = document.getElementById('exitManagementPanel');
    const panelNavButtons = document.querySelectorAll('.panel-nav-btn');
    const panelSections = document.querySelectorAll('.panel-section');
    
    // Open panel when manage button is clicked
    manageButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const employeeId = e.target.dataset.employee;
            openExitManagementPanel(employeeId);
        });
    });
    
    // Close panel
    closePanelBtn.addEventListener('click', closeExitManagementPanel);
    
    // Close panel when clicking outside
    exitManagementPanel.addEventListener('click', (e) => {
        if (e.target === exitManagementPanel) {
            closeExitManagementPanel();
        }
    });
    
    // Panel navigation
    panelNavButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.dataset.section;
            showPanelSection(sectionId);
        });
    });
}

function openExitManagementPanel(employeeId) {
    const panel = document.getElementById('exitManagementPanel');
    const employeeData = getEmployeeData(employeeId);
    
    // Update panel with employee data
    updatePanelEmployeeInfo(employeeData);
    
    // Show panel
    panel.classList.add('open');
    document.body.style.overflow = 'hidden';
    
    // Show notification
    showNotification(`Opening exit management for ${employeeData.name}`, 'info');
}

function closeExitManagementPanel() {
    const panel = document.getElementById('exitManagementPanel');
    panel.classList.remove('open');
    document.body.style.overflow = 'auto';
}

function showPanelSection(sectionId) {
    // Update navigation buttons
    document.querySelectorAll('.panel-nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
    
    // Update sections
    document.querySelectorAll('.panel-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`${sectionId}-section`).classList.add('active');
}

function getEmployeeData(employeeId) {
    const employeeData = {
        'saurabh-khare': {
            name: 'Saurabh Khare',
            role: 'SDE',
            department: 'Engineering',
            location: 'DMart bldg',
            lastWorkingDay: '21 Dec 2024',
            daysLeft: 2,
            avatar: 'SK'
        },
        'new-pay': {
            name: 'new pay',
            role: 'Product Manager',
            department: 'Engineering',
            location: 'Main Office',
            lastWorkingDay: '16 Jan 2025',
            daysLeft: 28,
            avatar: 'NP'
        },
        'raj-varaham': {
            name: 'Raj Varaham',
            role: 'Product Manager',
            department: 'Product',
            location: 'Main Office',
            lastWorkingDay: '18 Feb 2025',
            daysLeft: 61,
            avatar: 'RV'
        },
        'jim-corbett': {
            name: 'Jim Corbett',
            role: 'Product Manager',
            department: 'Data Engineering',
            location: 'Main Office',
            lastWorkingDay: '18 Feb 2025',
            daysLeft: 61,
            avatar: 'JC'
        }
    };
    
    return employeeData[employeeId] || employeeData['saurabh-khare'];
}

function updatePanelEmployeeInfo(employeeData) {
    // Update header
    const avatar = document.querySelector('.side-panel-header .employee-avatar');
    const name = document.querySelector('.side-panel-header h3');
    const department = document.querySelector('.side-panel-header .employee-details p:first-of-type');
    const location = document.querySelector('.side-panel-header .employee-details p:last-of-type');
    const lastWorkingDay = document.querySelector('.last-working-info span:first-of-type');
    const daysLeft = document.querySelector('.days-left-badge');
    
    if (avatar) avatar.textContent = employeeData.avatar;
    if (name) name.textContent = `${employeeData.name} - ${employeeData.role}`;
    if (department) department.textContent = employeeData.department;
    if (location) location.textContent = employeeData.location;
    if (lastWorkingDay) lastWorkingDay.textContent = `Last working day ${employeeData.lastWorkingDay}`;
    if (daysLeft) daysLeft.textContent = `${employeeData.daysLeft} days left`;
}

function setupActionButtons() {
    // View Details buttons
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const employeeId = e.target.dataset.employee;
            openViewDetailsModal(employeeId);
        });
    });
    
    // Review buttons
    document.querySelectorAll('.review-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const employeeId = e.target.dataset.employee;
            openReviewModal(employeeId);
        });
    });
    
    // Complete Review buttons
    document.querySelectorAll('.complete-review-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const employeeId = e.target.dataset.employee;
            completeReview(employeeId);
        });
    });
}

function setupModals() {
    // View Details Modal
    const viewDetailsModal = document.getElementById('viewDetailsModal');
    const closeViewDetailsModal = document.getElementById('closeViewDetailsModal');
    const closeViewDetailsBtn = document.getElementById('closeViewDetailsBtn');
    const reviewOnBehalfBtn = document.getElementById('reviewOnBehalfBtn');
    
    closeViewDetailsModal.addEventListener('click', () => closeModal(viewDetailsModal));
    closeViewDetailsBtn.addEventListener('click', () => closeModal(viewDetailsModal));
    reviewOnBehalfBtn.addEventListener('click', () => {
        closeModal(viewDetailsModal);
        openReviewModal('zoeb-nomi');
    });
    
    // Review Modal
    const reviewModal = document.getElementById('reviewModal');
    const closeReviewModal = document.getElementById('closeReviewModal');
    const closeReviewBtn = document.getElementById('closeReviewBtn');
    const submitReviewBtn = document.getElementById('submitReviewBtn');
    const reviewActionBtn = document.getElementById('reviewActionBtn');
    const reviewActionBtn2 = document.getElementById('reviewActionBtn2');
    
    closeReviewModal.addEventListener('click', () => closeModal(reviewModal));
    closeReviewBtn.addEventListener('click', () => closeModal(reviewModal));
    submitReviewBtn.addEventListener('click', submitReview);
    
    // Review action buttons
    reviewActionBtn.addEventListener('click', showDetailedReviewForm);
    reviewActionBtn2.addEventListener('click', showDetailedReviewForm);
    
    // Cancel Resignation Modal
    const cancelModal = document.getElementById('cancelResignationModal');
    const closeCancelModal = document.getElementById('closeCancelModal');
    const closeCancelBtn = document.getElementById('closeCancelBtn');
    const confirmCancelBtn = document.getElementById('confirmCancelBtn');
    
    closeCancelModal.addEventListener('click', () => closeModal(cancelModal));
    closeCancelBtn.addEventListener('click', () => closeModal(cancelModal));
    confirmCancelBtn.addEventListener('click', confirmCancelResignation);
    
    // Asset Recovery Modal
    const assetRecoveryModal = document.getElementById('assetRecoveryModal');
    const closeAssetRecoveryModal = document.getElementById('closeAssetRecoveryModal');
    const cancelAssetRecovery = document.getElementById('cancelAssetRecovery');
    const saveAssetRecovery = document.getElementById('saveAssetRecovery');
    
    closeAssetRecoveryModal.addEventListener('click', () => closeModal(assetRecoveryModal));
    cancelAssetRecovery.addEventListener('click', () => closeModal(assetRecoveryModal));
    saveAssetRecovery.addEventListener('click', saveAssetRecoveryDetails);
    
    // Close modals when clicking outside
    [viewDetailsModal, reviewModal, cancelModal, assetRecoveryModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
}

function setupDropdownMenus() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    document.querySelectorAll('.dropdown-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const employeeId = e.target.closest('.dropdown-toggle').dataset.employee;
            showDropdownMenu(e.target, employeeId);
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        dropdownMenu.classList.remove('show');
    });
    
    // Handle dropdown item clicks
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const action = e.currentTarget.dataset.action;
            const employeeId = dropdownMenu.dataset.employee;
            handleDropdownAction(action, employeeId);
            dropdownMenu.classList.remove('show');
        });
    });
}

function openViewDetailsModal(employeeId) {
    const modal = document.getElementById('viewDetailsModal');
    const employeeData = getEmployeeData(employeeId);
    
    // Update modal content
    updateViewDetailsModal(employeeData);
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openReviewModal(employeeId) {
    const modal = document.getElementById('reviewModal');
    const employeeData = getEmployeeData(employeeId);
    
    // Update modal content
    updateReviewModal(employeeData);
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openCancelResignationModal(employeeId) {
    const modal = document.getElementById('cancelResignationModal');
    const employeeData = getEmployeeData(employeeId);
    
    // Update modal content
    document.getElementById('cancelEmployeeAvatar').textContent = employeeData.avatar;
    document.getElementById('cancelEmployeeName').textContent = employeeData.name;
    document.getElementById('cancelEmployeeRole').textContent = employeeData.role;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function updateViewDetailsModal(employeeData) {
    // Update employee info in modal
    const avatar = document.querySelector('#viewDetailsModal .employee-avatar');
    const name = document.querySelector('#viewDetailsModal .employee-info h3');
    const role = document.querySelector('#viewDetailsModal .employee-info p');
    
    if (avatar) avatar.textContent = employeeData.avatar;
    if (name) name.textContent = employeeData.name;
    if (role) role.textContent = employeeData.role;
}

function updateReviewModal(employeeData) {
    // Update employee info in modal
    const avatar = document.querySelector('#reviewModal .employee-avatar');
    const name = document.querySelector('#reviewModal .employee-info h3');
    const role = document.querySelector('#reviewModal .employee-info p');
    
    if (avatar) avatar.textContent = employeeData.avatar;
    if (name) name.textContent = employeeData.name;
    if (role) role.textContent = employeeData.role;
}

function submitReview() {
    const form = document.getElementById('reviewForm');
    const formData = new FormData(form);
    
    const decision = formData.get('decision');
    const comments = form.querySelector('textarea').value;
    
    if (!comments.trim()) {
        showNotification('Please add comments for your review', 'error');
        return;
    }
    
    // Simulate review submission
    showNotification(`Resignation ${decision === 'approve' ? 'approved' : 'rejected'} successfully!`, 'success');
    closeModal(document.getElementById('reviewModal'));
    
    // Update UI based on decision
    if (decision === 'approve') {
        // Move to next phase
        showNotification('Resignation moved to Exits in Progress', 'info');
    }
}

function completeReview(employeeId) {
    // Simulate completing review
    showNotification('Review completed successfully! Resignation moved to Exits in Progress.', 'success');
    
    // Update button text
    const btn = document.querySelector(`[data-employee="${employeeId}"].complete-review-btn`);
    if (btn) {
        btn.textContent = 'Review Completed';
        btn.disabled = true;
        btn.style.opacity = '0.6';
    }
}

function confirmCancelResignation() {
    const form = document.getElementById('cancelForm');
    const formData = new FormData(form);
    
    const reason = formData.get('reason');
    const comments = form.querySelector('textarea').value;
    
    if (!reason || !comments.trim()) {
        showNotification('Please provide reason and comments for cancellation', 'error');
        return;
    }
    
    // Simulate cancellation
    showNotification('Resignation cancelled successfully! Employee status reverted to active.', 'success');
    closeModal(document.getElementById('cancelResignationModal'));
    
    // Reset form
    form.reset();
}

function showDropdownMenu(button, employeeId) {
    const dropdownMenu = document.getElementById('dropdownMenu');
    const rect = button.getBoundingClientRect();
    
    dropdownMenu.style.top = `${rect.bottom + 5}px`;
    dropdownMenu.style.left = `${rect.left}px`;
    dropdownMenu.dataset.employee = employeeId;
    dropdownMenu.classList.add('show');
}

function handleDropdownAction(action, employeeId) {
    switch (action) {
        case 'send-reminder':
            showNotification('Reminder sent successfully!', 'success');
            break;
        case 'view-details':
            openViewDetailsModal(employeeId);
            break;
        case 'update-details':
            showNotification('Update details functionality coming soon!', 'info');
            break;
        case 'cancel-resignation':
            openCancelResignationModal(employeeId);
            break;
    }
}

function showDetailedReviewForm() {
    const detailedForm = document.getElementById('detailedReviewForm');
    const submitBtn = document.getElementById('submitReviewBtn');
    
    detailedForm.style.display = 'block';
    submitBtn.style.display = 'inline-block';
    
    // Hide the review action buttons
    document.getElementById('reviewActionBtn').style.display = 'none';
    document.getElementById('reviewActionBtn2').style.display = 'none';
}

function setupAssetManagement() {
    // Mark as recovered buttons
    document.querySelectorAll('.mark-recovered-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const assetId = e.target.dataset.asset;
            markAssetAsRecovered(assetId);
        });
    });
    
    // Asset dropdown menus
    document.querySelectorAll('.asset-dropdown').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const assetId = e.target.closest('.asset-dropdown').dataset.asset;
            showAssetDropdownMenu(e.target, assetId);
        });
    });
    
    // Asset dropdown item clicks
    document.querySelectorAll('.asset-dropdown-menu .dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const action = e.currentTarget.dataset.action;
            const assetId = document.querySelector('.asset-dropdown-menu').dataset.asset;
            handleAssetAction(action, assetId);
            document.querySelector('.asset-dropdown-menu').classList.remove('show');
        });
    });
    
    // Close asset dropdown when clicking outside
    document.addEventListener('click', () => {
        document.querySelector('.asset-dropdown-menu').classList.remove('show');
    });
}

function markAssetAsRecovered(assetId) {
    // Open the asset recovery modal instead of directly marking as recovered
    openAssetRecoveryModal(assetId);
}

function showAssetDropdownMenu(button, assetId) {
    const dropdownMenu = document.querySelector('.asset-dropdown-menu');
    const rect = button.getBoundingClientRect();
    
    dropdownMenu.style.top = `${rect.bottom + 5}px`;
    dropdownMenu.style.left = `${rect.left}px`;
    dropdownMenu.dataset.asset = assetId;
    dropdownMenu.classList.add('show');
}

function handleAssetAction(action, assetId) {
    switch (action) {
        case 'view-details':
            showNotification('Asset details functionality coming soon!', 'info');
            break;
        case 'update-details':
            showNotification('Update asset details functionality coming soon!', 'info');
            break;
        case 'mark-not-available':
            markAssetAsNotAvailable(assetId);
            break;
    }
}

function markAssetAsNotAvailable(assetId) {
    showNotification('Asset marked as not available!', 'success');
}

function setupTeamManagement() {
    // Team navigation
    document.querySelectorAll('.team-nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const sectionId = e.target.dataset.teamSection;
            showTeamSection(sectionId);
        });
    });
    
    // Set for everyone checkbox
    const setForEveryoneCheckbox = document.getElementById('setForEveryone');
    if (setForEveryoneCheckbox) {
        setForEveryoneCheckbox.addEventListener('change', (e) => {
            const searchInputs = document.querySelectorAll('.search-employee-input');
            if (e.target.checked) {
                // Set all inputs to the same value
                const firstInput = searchInputs[0];
                if (firstInput.value) {
                    searchInputs.forEach(input => {
                        input.value = firstInput.value;
                    });
                }
            }
        });
    }
    
    // Save team changes
    const saveTeamBtn = document.querySelector('.team-actions .btn-primary');
    if (saveTeamBtn) {
        saveTeamBtn.addEventListener('click', saveTeamChanges);
    }
}

function showTeamSection(sectionId) {
    // Update navigation
    document.querySelectorAll('.team-nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-team-section="${sectionId}"]`).classList.add('active');
    
    // Update content
    document.querySelectorAll('.team-subsection').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`${sectionId}-section`).classList.add('active');
}

function saveTeamChanges() {
    const searchInputs = document.querySelectorAll('.search-employee-input');
    const changes = [];
    
    searchInputs.forEach((input, index) => {
        if (input.value.trim()) {
            const employeeName = input.closest('.report-item').querySelector('strong').textContent;
            changes.push({
                employee: employeeName,
                newManager: input.value.trim()
            });
        }
    });
    
    if (changes.length > 0) {
        showNotification(`Team changes saved for ${changes.length} employees!`, 'success');
    } else {
        showNotification('No changes to save.', 'info');
    }
}

function setupSurveyManagement() {
    // Survey toggle
    const surveyToggle = document.querySelector('.toggle-switch input');
    if (surveyToggle) {
        surveyToggle.addEventListener('change', (e) => {
            const status = e.target.checked ? 'enabled' : 'disabled';
            showNotification(`Exit survey ${status}!`, 'success');
        });
    }
    
    // Preview survey button
    const previewBtn = document.querySelector('.survey-actions .btn-secondary');
    if (previewBtn) {
        previewBtn.addEventListener('click', () => {
            showNotification('Survey preview functionality coming soon!', 'info');
        });
    }
    
    // Send survey now button
    const sendNowBtn = document.querySelector('.survey-actions .btn-primary');
    if (sendNowBtn) {
        sendNowBtn.addEventListener('click', () => {
            showNotification('Exit survey sent to employee!', 'success');
        });
    }
}

function setupTaskManagement() {
    // Add new task button
    const addTaskBtn = document.querySelector('.add-task-btn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', () => {
            showNotification('Add new task functionality coming soon!', 'info');
        });
    }
    
    // Task action buttons
    document.querySelectorAll('.task-actions-bar .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = e.target.textContent.toLowerCase();
            handleTaskAction(action);
        });
    });
}

function setupActivityManagement() {
    // Send note button
    const sendNoteBtn = document.getElementById('sendNoteBtn');
    const activityNoteInput = document.getElementById('activityNoteInput');
    
    if (sendNoteBtn && activityNoteInput) {
        sendNoteBtn.addEventListener('click', addActivityNote);
        
        // Send note on Enter key
        activityNoteInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addActivityNote();
            }
        });
    }
}

function addActivityNote() {
    const activityNoteInput = document.getElementById('activityNoteInput');
    const noteText = activityNoteInput.value.trim();
    
    if (!noteText) {
        showNotification('Please enter a note before sending.', 'error');
        return;
    }
    
    // Create new activity item
    const activityLog = document.querySelector('.activity-log');
    const newActivityItem = createActivityItem({
        user: 'Current User',
        avatar: 'CU',
        time: new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }),
        action: 'Added note',
        details: noteText
    });
    
    // Add to top of activity log
    activityLog.insertBefore(newActivityItem, activityLog.firstChild);
    
    // Clear input
    activityNoteInput.value = '';
    
    // Show success notification
    showNotification('Note added successfully!', 'success');
}

function createActivityItem(activityData) {
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    
    activityItem.innerHTML = `
        <div class="activity-content">
            <div class="activity-header">
                <div class="activity-user">
                    <div class="user-avatar">${activityData.avatar}</div>
                    <div class="user-info">
                        <strong>${activityData.user}</strong>
                        <span class="activity-time">${activityData.time}</span>
                    </div>
                </div>
            </div>
            <div class="activity-details">
                <p><strong>Action:</strong> ${activityData.action}</p>
                <p>${activityData.details}</p>
            </div>
        </div>
    `;
    
    return activityItem;
}

function setupAssetRecoveryModal() {
    // Remove recovered by chip
    const removeRecoveredBy = document.getElementById('removeRecoveredBy');
    if (removeRecoveredBy) {
        removeRecoveredBy.addEventListener('click', () => {
            const chip = document.getElementById('recoveredByChip');
            const addBtn = document.getElementById('addRecoveredBy');
            chip.style.display = 'none';
            addBtn.style.display = 'flex';
        });
    }
    
    // Add employee button
    const addRecoveredBy = document.getElementById('addRecoveredBy');
    if (addRecoveredBy) {
        addRecoveredBy.addEventListener('click', () => {
            // Simulate adding employee
            const chip = document.getElementById('recoveredByChip');
            const addBtn = document.getElementById('addRecoveredBy');
            chip.style.display = 'flex';
            addBtn.style.display = 'none';
        });
    }
    
    // Add asset image attachment
    const addAssetImage = document.getElementById('addAssetImage');
    if (addAssetImage) {
        addAssetImage.addEventListener('click', () => {
            handleFileUpload('assetImageFiles', ['png', 'jpg', 'jpeg'], 20);
        });
    }
    
    // Add asset documents attachment
    const addAssetDocuments = document.getElementById('addAssetDocuments');
    if (addAssetDocuments) {
        addAssetDocuments.addEventListener('click', () => {
            handleFileUpload('assetDocumentFiles', ['png', 'jpg', 'jpeg', 'pdf', 'doc', 'docx'], 20);
        });
    }
}

function openAssetRecoveryModal(assetId) {
    const modal = document.getElementById('assetRecoveryModal');
    
    // Set current date as default
    const recoveryDate = document.getElementById('recoveryDate');
    if (recoveryDate) {
        const today = new Date().toISOString().split('T')[0];
        recoveryDate.value = today;
    }
    
    // Store current asset ID
    modal.dataset.assetId = assetId;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function saveAssetRecoveryDetails() {
    const modal = document.getElementById('assetRecoveryModal');
    const assetId = modal.dataset.assetId;
    const form = document.getElementById('assetRecoveryForm');
    
    // Get form data
    const recoveryDate = document.getElementById('recoveryDate').value;
    const assetCondition = document.getElementById('assetCondition').value;
    const chargeDamage = document.getElementById('chargeDamage').checked;
    const additionalNote = document.getElementById('additionalNote').value;
    
    // Validate required fields
    if (!recoveryDate || !assetCondition) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Update the asset button
    const btn = document.querySelector(`[data-asset="${assetId}"].mark-recovered-btn`);
    if (btn) {
        btn.innerHTML = 'Marked as: Recovered';
        btn.style.background = '#28a745';
        btn.style.color = 'white';
        btn.disabled = true;
        
        // Add dropdown menu
        const dropdown = document.createElement('button');
        dropdown.className = 'btn-icon dropdown-toggle asset-dropdown';
        dropdown.dataset.asset = assetId;
        dropdown.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
        
        btn.parentNode.appendChild(dropdown);
    }
    
    // Close modal
    closeModal(modal);
    
    // Show success notification
    showNotification('Asset recovery details saved successfully!', 'success');
    
    // Add activity log entry
    addAssetRecoveryActivity(assetId, recoveryDate, assetCondition, chargeDamage);
}

function handleFileUpload(containerId, allowedTypes, maxSizeMB) {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = allowedTypes.map(type => `.${type}`).join(',');
    
    input.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        const container = document.getElementById(containerId);
        
        files.forEach(file => {
            // Validate file type
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (!allowedTypes.includes(fileExtension)) {
                showNotification(`File type .${fileExtension} is not supported.`, 'error');
                return;
            }
            
            // Validate file size
            const maxSizeBytes = maxSizeMB * 1024 * 1024;
            if (file.size > maxSizeBytes) {
                showNotification(`File size exceeds ${maxSizeMB}MB limit.`, 'error');
                return;
            }
            
            // Add file to container
            addFileToContainer(container, file);
        });
    });
    
    input.click();
}

function addFileToContainer(container, file) {
    const fileItem = document.createElement('div');
    fileItem.className = 'attached-file';
    
    const fileIcon = getFileIcon(file.name);
    const fileSize = formatFileSize(file.size);
    
    fileItem.innerHTML = `
        <div class="file-info-item">
            <i class="fas ${fileIcon} file-icon"></i>
            <div class="file-details">
                <div class="file-name">${file.name}</div>
                <div class="file-size">${fileSize}</div>
            </div>
        </div>
        <button type="button" class="remove-file" onclick="removeFile(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(fileItem);
}

function getFileIcon(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
        case 'pdf':
            return 'fa-file-pdf';
        case 'doc':
        case 'docx':
            return 'fa-file-word';
        case 'png':
        case 'jpg':
        case 'jpeg':
            return 'fa-file-image';
        default:
            return 'fa-file';
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function removeFile(button) {
    button.closest('.attached-file').remove();
}

function addAssetRecoveryActivity(assetId, recoveryDate, condition, chargeDamage) {
    const activityLog = document.querySelector('.activity-log');
    if (activityLog) {
        const newActivityItem = createActivityItem({
            user: 'Current User',
            avatar: 'CU',
            time: new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }),
            action: 'Asset Recovery',
            details: `Asset recovered on ${recoveryDate}. Condition: ${condition}${chargeDamage ? '. Damage charges applied.' : '.'}`
        });
        
        activityLog.insertBefore(newActivityItem, activityLog.firstChild);
    }
}

function handleTaskAction(action) {
    switch (action) {
        case 'select all':
            showNotification('All tasks selected!', 'success');
            break;
        case 'remind':
            showNotification('Reminder sent to task owners!', 'success');
            break;
        case 'skip':
            showNotification('Tasks skipped!', 'info');
            break;
    }
}

// Export functions for potential external use
window.EmployeeExitSystem = {
    state,
    showNotification,
    openResignationModal,
    closeResignationModal,
    submitResignation,
    openExitManagementPanel,
    closeExitManagementPanel,
    openViewDetailsModal,
    openReviewModal,
    openCancelResignationModal
};
