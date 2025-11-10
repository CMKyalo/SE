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
});
