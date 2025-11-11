// navbar.js
document.addEventListener("DOMContentLoaded", () => {
  const header = document.createElement("header");
  header.innerHTML = `
    <h1>NestCare Agency</h1>
    <nav>
      <a href="index.html">Home</a>
      <a href="add-child.html">Add Child</a>
      <a href="view-children.html">View Children</a>
      <a href="add-caregiver.html">Add Caregiver</a>
      <a href="view-caregivers.html">View Caregivers</a>
    </nav>
  `;
  document.body.prepend(header);
});

