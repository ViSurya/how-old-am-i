const About = `<h1>About How Old Am I</h1>

<p>Welcome to <strong>How Old Am I</strong>, the ultimate online age calculator that takes age calculation to a whole new level. Our mission is to provide you with a comprehensive and mind-blowing analysis of your age and life journey so far, going far beyond just telling you how old you are in years, months, and days.</p>

<h2>Our Story</h2>

<p>How Old Am I was born out of our team's fascination with the incredible numbers and statistics that define our lives. We realized that traditional age calculators only scratch the surface, failing to reveal the astounding facts and figures that truly quantify the amazing journey of life.</p>

<p>So, we set out to create a tool that would not only calculate your age with precision but also uncover the mind-boggling details about your heartbeats, breaths, cell regenerations, and overall consumption and travel. After months of research and development, How Old Am I was launched, providing users worldwide with a unique and eye-opening perspective on their age and lifetime.</p>

<h2>What Makes Us Different</h2>

<p>At How Old Am I, we believe that age is more than just a number – it's a tapestry of incredible statistics and facts that deserve to be explored and celebrated. Our age calculator is designed to do just that, offering a level of detail and insight that you won't find anywhere else.</p>

<ul>
    <li>Calculate your age down to the exact second, with a live counter constantly ticking</li>
    <li>Discover your age on the time scales of other planets in our solar system</li>
    <li>Explore your age across various calendar systems, from Gregorian to Chinese to Hebrew</li>
    <li>Uncover fascinating lifetime facts, like your total heartbeats, breaths taken, and cell regenerations</li>
    <li>Learn about famous people who share your birth date and historical events that occurred on that day</li>
</ul>

<p>With How Old Am I, you'll gain a newfound appreciation for the incredible journey of life and the amazing numbers that define it.</p>

<h2>Our Team</h2>

<p>Behind How Old Am I is a passionate team of data enthusiasts, programmers, and researchers who are dedicated to providing you with the most accurate and comprehensive age analysis possible. We continuously update our algorithms and databases to ensure that you receive the latest and most reliable information.</p>

<p>Join us on this fascinating exploration of age and life, and discover the mind-blowing facts that make your journey truly unique.</p>

<h2>Contact Us</h2>

<p>If you have any questions, suggestions, or feedback, we'd love to hear from you. You can reach us at:</p>

<p>Email: <a href="mailto:info@how-old-am-i.online">info@how-old-am-i.online</a><br>
Phone: +1 (555) 123-4567</p>`
   const PrivacyPolicy = `<h1>Privacy Policy</h1>

<p>At How Old Am I, we are committed to protecting the privacy and security of our users. This Privacy Policy explains how we collect, use, and safeguard the information you provide when using our age calculation tool.</p>

<h2>Information We Collect</h2>

<p>Our age calculator requires you to input your date of birth to perform the calculation. This is the only personal information we collect from you. We do not store or retain your date of birth or any other personal data after the calculation is completed.</p>

<h2>Use of Information</h2>

<p>The date of birth you provide is used solely for the purpose of calculating your age and generating the detailed age analysis and statistics. We do not use this information for any other purpose, nor do we share or sell it to third parties.</p>

<h2>Data Security</h2>

<p>We take appropriate technical and organizational measures to protect the information you provide from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of data transmission over the internet or electronic storage is completely secure.</p>

<h2>Cookies</h2>

<p>Our website does not use cookies or any other tracking technologies to collect or store user information.</p>

<h2>Third-Party Links</h2>

<p>Our website may contain links to third-party websites or services that are not owned or controlled by How Old Am I. We have no control over and assume no responsibility for the privacy practices or content of these third-party websites. We encourage you to review the privacy policies of these third-party websites before providing any personal information.</p>

<h2>Children's Privacy</h2>

<p>Our age calculation tool is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13 years of age. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will take steps to remove that information from our system.</p>

<h2>Changes to This Privacy Policy</h2>

<p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this Privacy Policy periodically for any updates or changes.</p>

<h2>Contact Us</h2>

<p>If you have any questions or concerns about our Privacy Policy or the handling of your personal information, please contact us at:</p>

<p>Email: <a href="mailto:privacy@how-old-am-i.online">privacy@how-old-am-i.online</a></p>`
  const Disclaimer = `<h1>Disclaimer</h1>

<p>The information provided by the How Old Am I age calculator is intended for entertainment and educational purposes only. While we strive to provide accurate and up-to-date information, we cannot guarantee the accuracy, completeness, or reliability of the results obtained from our tool.</p>

<h2>Calculation Accuracy</h2>

<p>The age calculations and statistics presented on our website are based on algorithms and formulas that rely on the accuracy of the input data provided by you, the user. Any errors or inaccuracies in the date of birth or current date entered may result in incorrect or misleading calculations and information.</p>

<p>Additionally, the calculations related to lifetime statistics, such as total heartbeats, breaths taken, and cell regenerations, are based on averages and estimates. Individual variations in physiology, lifestyle, and environmental factors may impact the accuracy of these calculations.</p>

<h2>External Data Sources</h2>

<p>Some information displayed on our website, such as historical events and famous birthdays, is sourced from external databases and third-party sources. While we make efforts to ensure the reliability of these sources, we cannot guarantee the accuracy or completeness of the information obtained from them.</p>

<h2>No Professional Advice</h2>

<p>The information provided by How Old Am I is not intended to serve as professional advice, medical or otherwise. The age calculator and associated statistics are provided for informational and educational purposes only and should not be relied upon for making any personal, medical, legal, or financial decisions.</p>

<h2>User Responsibility</h2>

<p>By using the How Old Am I age calculator, you acknowledge and agree that you are solely responsible for the accuracy and validity of the input data you provide. You further understand and accept that the information and calculations provided by our tool are for general purposes only and should be used at your own risk.</p>

<h2>Limitation of Liability</h2>

<p>How Old Am I shall not be held liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use or misuse of the information provided by our age calculator or any other content on our website.</p>

<h2>Changes and Updates</h2>

<p>We reserve the right to modify, update, or discontinue the How Old Am I age calculator or any part of our website at any time without prior notice. We encourage you to review this Disclaimer periodically for any changes or updates.</p>

<p>If you have any questions or concerns regarding this Disclaimer, please contact us at <a href="mailto:info@how-old-am-i.online">info@how-old-am-i.online</a>.</p>`

// Function to get the hash from the URL
function getHash() {
    return window.location.hash.substring(1);
  }
  
  // Function to populate the content based on the hash
  function populateContent() {
    const root = document.getElementById('root');
    const hash = getHash();
  
    switch (hash) {
      case 'about':
        root.innerHTML = About;
        break;
      case 'privacy-policy':
        root.innerHTML = PrivacyPolicy;
        break;
      case 'disclaimer':
        root.innerHTML = Disclaimer;
        break;
      default:
        // Redirect to the homepage if the hash is not recognized
        // window.location.href = '/'; // Replace with your homepage URL
        break;
    }
  }
  
  // Call the populateContent function when the page loads or when the hash changes
  window.addEventListener('load', populateContent);
  window.addEventListener('hashchange', populateContent);