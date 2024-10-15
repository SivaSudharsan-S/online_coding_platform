import React from 'react';
import './css/Profile.css';
import { useTheme } from './ThemeContext'; // Import the theme hook

const Profile = () => {
  const { theme } = useTheme(); // Access the theme from the context
  
  return (
    <div className={`profile-page ${theme}`}>
      {/* Basic Information Section */}
      <div className={`basic-info ${theme}`}>
        <img src="/avatar.png" alt="Profile" className={`profile-picture ${theme}`} />
        <h2 className={theme}>Velavan P K</h2>
        <p className={theme}>Email: velavan.pk@example.com</p>
        <p className={theme}>Rank: 3,293,401</p>
        <p className={theme}>Bio: Software Engineer and coding enthusiast. Always learning and improving.</p>
      </div>

      {/* Statistics Section */}
      <div className={`stats-section ${theme}`}>
        <h3 className={theme}>Statistics</h3>
        <ul>
          <li className={theme}>Total Solved Problems: 13</li>
          <li className={theme}>Accepted Submissions: 48</li>
          <li className={theme}>Accuracy Rate: 27%</li>
          <li className={theme}>Problem-Solving Streak: Max Streak 2</li>
          <li className={theme}>Ranking on Platform: 3,293,401</li>
        </ul>
      </div>

      {/* Recent Activity Section */}
      <div className={`recent-activity ${theme}`}>
        <h3 className={theme}>Recent Activity</h3>
        <ul>
          <li className={theme}>Recent Submissions: Climbing Stairs, Single Number</li>
          <li className={theme}>Recent Contests: Weekly Contest 416, Biweekly Contest 139</li>
          <li className={theme}>Recent Comments: "Great solution!", "Can this be optimized further?"</li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
