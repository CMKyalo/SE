// CHILDREN FORM
document.addEventListener('DOMContentLoaded', () => {
  const childForm = document.getElementById('childForm');
  const caregiverForm = document.getElementById('caregiverForm');
  const childrenList = document.getElementById('childrenList');
  const caregiverList = document.getElementById('caregiverList');

  // Add Child
  if (childForm) {
    childForm.addEventListener('submit', e => {
      e.preventDefault();
      const child = {
        name: document.getElementById('childName').value,
        age: document.getElementById('childAge').value,
        gender: document.getElementById('childGender').value,
        location: document.getElementById('childLocation').value,
        bio: document.getElementById('childBio').value
      };
      let children = JSON.parse(localStorage.getItem('children')) || [];
      children.push(child);
      localStorage.setItem('children', JSON.stringify(children));
      alert('Child added successfully!');
      childForm.reset();
    });
  }

  // View Children
  if (childrenList) {
    const children = JSON.parse(localStorage.getItem('children')) || [];
    childrenList.innerHTML = children.map(c => `
      <div class="card">
        <h3>${c.name} (${c.age} yrs)</h3>
        <p><strong>Gender:</strong> ${c.gender}</p>
        <p><strong>Location:</strong> ${c.location}</p>
        <p>${c.bio}</p>
      </div>
    `).join('');
  }

  // Add Caregiver
  if (caregiverForm) {
    caregiverForm.addEventListener('submit', e => {
      e.preventDefault();
      const caregiver = {
        name: document.getElementById('caregiverName').value,
        age: document.getElementById('caregiverAge').value,
        gender: document.getElementById('caregiverGender').value,
        phone: document.getElementById('caregiverPhone').value,
        bio: document.getElementById('caregiverBio').value
      };
      let caregivers = JSON.parse(localStorage.getItem('caregivers')) || [];
      caregivers.push(caregiver);
      localStorage.setItem('caregivers', JSON.stringify(caregivers));
      alert('Caregiver added successfully!');
      caregiverForm.reset();
    });
  }

  // View Caregivers
  if (caregiverList) {
    const caregivers = JSON.parse(localStorage.getItem('caregivers')) || [];
    caregiverList.innerHTML = caregivers.map(c => `
      <div class="card">
        <h3>${c.name} (${c.age} yrs)</h3>
        <p><strong>Gender:</strong> ${c.gender}</p>
        <p><strong>Phone:</strong> ${c.phone}</p>
        <p>${c.bio}</p>
      </div>
    `).join('');
  }
  // Simulated database (in production, this would be API calls)
    let currentUser = null;
    let children = [
      {id: 1, firstName: 'Emma', lastName: 'Johnson', age: 5, gender: 'Female', county: 'Nairobi', bio: 'Cheerful and energetic girl', status: 'available', home: 'Hope Center'},
      {id: 2, firstName: 'Michael', lastName: 'Ochieng', age: 8, gender: 'Male', county: 'Kisumu', bio: 'Intelligent boy who loves reading', status: 'available', home: 'Sunshine Home'},
      {id: 3, firstName: 'Grace', lastName: 'Wanjiru', age: 3, gender: 'Female', county: 'Nakuru', bio: 'Sweet toddler who loves music', status: 'available', home: 'Little Angels'}
    ];
    
    let applicants = [
      {id: 1, name: 'Sarah Kimani', nationalId: '12345678', county: 'Nairobi', date: '2025-01-15', bgCheck: 'approved', payment: 'paid'},
      {id: 2, name: 'James Mwangi', nationalId: '87654321', county: 'Mombasa', date: '2025-02-10', bgCheck: 'pending', payment: 'paid'}
    ];

    // Page Navigation
    function showPage(pageName) {
      document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
      document.getElementById(pageName + 'Page').classList.remove('hidden');
      
      if (pageName === 'dashboard' && currentUser) {
        loadDashboard();
      } else if (pageName === 'children') {
        loadChildren();
      } else if (pageName === 'applicants') {
        loadApplicants();
      }
    }

    // Modal Functions
    function showLogin() {
      document.getElementById('loginModal').classList.add('active');
    }

    function showRegister(type) {
      document.getElementById('registerModal').classList.add('active');
      document.getElementById('fosterForm').classList.add('hidden');
      document.getElementById('homeForm').classList.add('hidden');
      
      if (type === 'foster') {
        document.getElementById('registerTitle').textContent = 'Become a Foster Parent';
        document.getElementById('fosterForm').classList.remove('hidden');
      } else {
        document.getElementById('registerTitle').textContent = "Register Children's Home";
        document.getElementById('homeForm').classList.remove('hidden');
      }
    }

    function closeModal(modalId) {
      document.getElementById(modalId).classList.remove('active');
    }

    // Authentication
    function handleLogin(e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const role = document.getElementById('loginRole').value;
      
      // Simulate login
      currentUser = {
        name: email.split('@')[0],
        email: email,
        role: role
      };
      
      document.getElementById('loginBtn').classList.add('hidden');
      document.getElementById('userMenu').classList.remove('hidden');
      document.getElementById('userName').textContent = currentUser.name;
      
      // Show relevant navigation
      document.getElementById('navDashboard').classList.remove('hidden');
      if (role === 'childrens_home') {
        document.getElementById('navChildren').classList.remove('hidden');
      }
      if (role === 'social_worker' || role === 'gov_officer' || role === 'admin') {
        document.getElementById('navChildren').classList.remove('hidden');
        document.getElementById('navApplicants').classList.remove('hidden');
        document.getElementById('navReports').classList.remove('hidden');
      }
      
      closeModal('loginModal');
      showPage('dashboard');
      
      showAlert('Login successful!', 'success');
    }

    function handleRegister(e) {
      e.preventDefault();
      showAlert('Registration submitted! Awaiting verification.', 'success');
      closeModal('registerModal');
    }

    function logout() {
      currentUser = null;
      document.getElementById('loginBtn').classList.remove('hidden');
      document.getElementById('userMenu').classList.add('hidden');
      document.querySelectorAll('#navDashboard, #navChildren, #navApplicants, #navReports').forEach(el => {
        el.classList.add('hidden');
      });
      showPage('home');
    }

    // Dashboard
    function loadDashboard() {
      const statsHTML = `
        <div class="stat-card">
          <h3>${children.filter(c => c.status === 'available').length}</h3>
          <p>Available Children</p>
        </div>
        <div class="stat-card">
          <h3>${applicants.length}</h3>
          <p>Total Applicants</p>
        </div>
        <div class="stat-card">
          <h3>${applicants.filter(a => a.bgCheck === 'pending').length}</h3>
          <p>Pending Verifications</p>
        </div>
        <div class="stat-card">
          <h3>15</h3>
          <p>Active Placements</p>
        </div>
      `;
      document.getElementById('dashboardStats').innerHTML = statsHTML;
      
      // Show pending actions based on role
      let pendingHTML = '<h2>Pending Actions</h2>';
      if (currentUser.role === 'gov_officer') {
        pendingHTML += `
          <div class="table-container" style="margin-top: 1rem;">
            <table>
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${applicants.filter(a => a.bgCheck === 'pending').map(a => `
                  <tr>
                    <td>${a.name}</td>
                    <td>Background Verification</td>
                    <td>${a.date}</td>
                    <td><button class="btn btn-small btn-primary" onclick="approveBackground(${a.id})">Review</button></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      } else if (currentUser.role === 'foster_applicant') {
        pendingHTML += `
          <div class="payment-box">
            <h3>Complete Your Application</h3>
            <p>Application Processing Fee</p>
            <div class="payment-amount">KES 5,000</div>
            <p>Pay via M-Pesa to Paybill: 123456</p>
            <button class="btn btn-primary" onclick="initiatePayment()">Pay Now</button>
          </div>
        `;
      }
      document.getElementById('pendingActions').innerHTML = pendingHTML;
    }

    // Children Management
    function loadChildren() {
      const canView = currentUser && ['foster_applicant', 'childrens_home', 'social_worker', 'gov_officer', 'admin'].includes(currentUser.role);
      const canAdd = currentUser && currentUser.role === 'childrens_home';
      
      document.getElementById('addChildBtn').classList.toggle('hidden', !canAdd);
      
      if (!canView) {
        document.getElementById('childrenList').innerHTML = `
          <div class="alert alert-info">
            Please login and complete verification to view children profiles.
          </div>
        `;
        return;
      }
      
      const filteredChildren = children; // Apply filters here
      const html = filteredChildren.map(child => `
        <div class="card">
          <div class="card-image">👶</div>
          <div class="card-content">
            <h3>${child.firstName} ${child.lastName}</h3>
            <p><strong>Age:</strong> ${child.age} years</p>
            <p><strong>Gender:</strong> ${child.gender}</p>
            <p><strong>Location:</strong> ${child.county}</p>
            <p><strong>Home:</strong> ${child.home}</p>
            <p>${child.bio}</p>
            <p><span class="badge badge-success">${child.status}</span></p>
          </div>
          <div class="card-actions">
            <button class="btn btn-small btn-primary" onclick="viewChildDetails(${child.id})">View Details</button>
            ${currentUser.role === 'foster_applicant' ? 
              `<button class="btn btn-small btn-secondary" onclick="expressInterest(${child.id})">Express Interest</button>` : ''}
          </div>
        </div>
      `).join('');
      document.getElementById('childrenList').innerHTML = html || '<p>No children found.</p>';
    }

    function showAddChild() {
      // In production, this would open a modal with a form
      showAlert('Add Child form would open here', 'info');
    }

    function viewChildDetails(childId) {
      const child = children.find(c => c.id === childId);
      if (!child) return;
      
      const modal = document.createElement('div');
      modal.className = 'modal active';
      modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h2>${child.firstName} ${child.lastName}</h2>
            <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
          </div>
          <div class="card-image" style="margin-bottom: 1rem;">👶</div>
          <p><strong>Age:</strong> ${child.age} years</p>
          <p><strong>Gender:</strong> ${child.gender}</p>
          <p><strong>County:</strong> ${child.county}</p>
          <p><strong>Current Home:</strong> ${child.home}</p>
          <p><strong>Bio:</strong> ${child.bio}</p>
          <h3 style="margin-top: 1.5rem;">Health Information</h3>
          <p>Blood Type: O+</p>
          <p>Allergies: None known</p>
          <p>Vaccinations: Up to date</p>
          <h3 style="margin-top: 1.5rem;">Placement History</h3>
          <p>Admitted: January 2024</p>
          <p>Reason: Family unable to care for child</p>
          ${currentUser.role === 'foster_applicant' ? 
            `<button class="btn btn-primary" style="width: 100%; margin-top: 1rem;" onclick="expressInterest(${child.id})">Express Interest</button>` : ''}
        </div>
      `;
      document.body.appendChild(modal);
    }

    function expressInterest(childId) {
      const child = children.find(c => c.id === childId);
      if (confirm(`Express interest in adopting ${child.firstName}?`)) {
        showAlert('Interest submitted! A social worker will contact you soon.', 'success');
        document.querySelectorAll('.modal').forEach(m => m.remove());
      }
    }

    function applyFilters() {
      loadChildren();
    }

    // Applicants Management
    function loadApplicants() {
      const html = applicants.map(a => `
        <tr>
          <td>${a.name}</td>
          <td>${a.nationalId}</td>
          <td>${a.county}</td>
          <td>${a.date}</td>
          <td><span class="badge ${a.bgCheck === 'approved' ? 'badge-success' : 'badge-warning'}">${a.bgCheck}</span></td>
          <td><span class="badge ${a.payment === 'paid' ? 'badge-success' : 'badge-danger'}">${a.payment}</span></td>
          <td>
            <button class="btn btn-small btn-primary" onclick="viewApplicant(${a.id})">View</button>
            ${a.bgCheck === 'pending' ? `<button class="btn btn-small btn-secondary" onclick="approveBackground(${a.id})">Approve</button>` : ''}
          </td>
        </tr>
      `).join('');
      document.getElementById('applicantsTableBody').innerHTML = html;
    }

    function viewApplicant(id) {
      const applicant = applicants.find(a => a.id === id);
      showAlert(`Viewing details for ${applicant.name}`, 'info');
    }

    function approveBackground(id) {
      if (confirm('Approve this applicant\'s background check?')) {
        const applicant = applicants.find(a => a.id === id);
        applicant.bgCheck = 'approved';
        showAlert('Background check approved!', 'success');
        loadApplicants();
        loadDashboard();
      }
    }

    // Payment
    function initiatePayment() {
      const modal = document.createElement('div');
      modal.className = 'modal active';
      modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h2>M-Pesa Payment</h2>
            <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
          </div>
          <form onsubmit="processPayment(event)">
            <div class="payment-box" style="background: white; color: #667eea; border: 2px solid #667eea;">
              <h3>Amount: KES 5,000</h3>
            </div>
            <div class="form-group">
              <label>M-Pesa Phone Number</label>
              <input type="tel" id="paymentPhone" placeholder="254712345678" required>
            </div>
            <div class="alert alert-info">
              You will receive an M-Pesa prompt on your phone. Enter your PIN to complete payment.
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Send Payment Request</button>
          </form>
        </div>
      `;
      document.body.appendChild(modal);
    }

    function processPayment(e) {
      e.preventDefault();
      showAlert('Payment request sent! Please check your phone for M-Pesa prompt.', 'success');
      setTimeout(() => {
        showAlert('Payment successful! Your application is now being processed.', 'success');
        document.querySelectorAll('.modal').forEach(m => m.remove());
        loadDashboard();
      }, 3000);
    }

    // Reports
    function generateReport(e) {
      e.preventDefault();
      const type = document.getElementById('reportType').value;
      const start = document.getElementById('reportStart').value;
      const end = document.getElementById('reportEnd').value;
      
      const reportHTML = `
        <div class="form-section">
          <h2>${type.charAt(0).toUpperCase() + type.slice(1)} Compliance Report</h2>
          <p><strong>Period:</strong> ${start} to ${end}</p>
          <div class="dashboard" style="margin: 2rem 0;">
            <div class="stat-card">
              <h3>${children.length}</h3>
              <p>Total Children</p>
            </div>
            <div class="stat-card">
              <h3>${children.filter(c => c.status === 'available').length}</h3>
              <p>Available</p>
            </div>
            <div class="stat-card">
              <h3>${applicants.filter(a => a.bgCheck === 'approved').length}</h3>
              <p>Verified Applicants</p>
            </div>
            <div class="stat-card">
              <h3>15</h3>
              <p>Placements Made</p>
            </div>
          </div>
          <h3>Summary</h3>
          <p>During this period, ${applicants.length} new applications were received and processed. ${children.filter(c => c.status === 'available').length} children remain available for placement. All welfare visits were conducted on schedule, with no major compliance issues identified.</p>
          <button class="btn btn-primary" onclick="downloadReport()">Download PDF</button>
        </div>
      `;
      document.getElementById('reportResults').innerHTML = reportHTML;
    }

    function downloadReport() {
      showAlert('Report downloaded successfully!', 'success');
    }

    // Utility Functions
    function showAlert(message, type) {
      const alert = document.createElement('div');
      alert.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'error' : 'info'}`;
      alert.textContent = message;
      alert.style.position = 'fixed';
      alert.style.top = '100px';
      alert.style.right = '20px';
      alert.style.zIndex = '9999';
      alert.style.maxWidth = '400px';
      document.body.appendChild(alert);
      setTimeout(() => alert.remove(), 4000);
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
      showPage('home');
    });
});
