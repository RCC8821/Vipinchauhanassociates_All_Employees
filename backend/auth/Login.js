

// const express = require('express');
// const jwt = require('jsonwebtoken');
// const { sheets, spreadsheetId } = require('../config/googleSheet');

// const router = express.Router();

// // Define valid user types (must match frontend dashboard EXACTLY)
// const VALID_USER_TYPES = ['Admin', 'Bharti', 'Govind Ram Nagar', 'Ravindra Singh', 'Ashok Sir'];

// // Login endpoint
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId,
//       range: 'Users!A:C',
//     });

//     const rows = response.data.values || [];
//     console.log('Google Sheet rows:', rows);
    
//     // Debug: सभी users के type को देखो
//     console.log('\n=== ALL USER TYPES IN SHEET ===');
//     rows.slice(1).forEach((row, idx) => {
//       const rawType = row[2] || '';
//       console.log(`Row ${idx + 1}: "${rawType}" (length: ${rawType.length})`);
//       console.log(`  Char codes:`, rawType.split('').map(c => `${c}=${c.charCodeAt(0)}`).join(', '));
//     });
//     console.log('===========================\n');

//     if (rows.length === 0) {
//       return res.status(400).json({ error: 'No users found in the sheet' });
//     }

//     // Find user by email and password
//     const user = rows.slice(1).find((row) => row[0] === email && row[1] === password);
//     console.log('Matched user:', user);

//     if (!user) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Normalize user type: remove all extra spaces, trim, and handle case
//     let userType = (user[2] || '')
//       .trim()                           // शुरु और अंत का space हटाओ
//       .replace(/\s+/g, ' ')             // multiple spaces को single में करो
//       .replace(/[^\w\s]/g, '');         // special characters हटाओ
    
//     console.log('Raw userType from sheet:', `"${user[2]}"`);
//     console.log('Normalized userType:', `"${userType}"`);
    
//     // ✅ Don't convert to lowercase - keep exact case from sheet
//     // Validate user type exists in our system
//     if (!VALID_USER_TYPES.includes(userType)) {
//       console.error(`Invalid user type: "${userType}". Valid types: ${VALID_USER_TYPES.join(', ')}`);
//       return res.status(400).json({ 
//         error: 'Invalid user type in database',
//         receivedType: userType,
//         receivedTypeDebug: `"${userType}"`,
//         validTypes: VALID_USER_TYPES,
//         hint: 'Check for extra spaces or special characters in Google Sheet'
//       });
//     }

//     // Create JWT token with normalized user type
//     const token = jwt.sign(
//       { email, userType },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     return res.json({ 
//       token, 
//       userType,
//       email 
//     });

//   } catch (error) {
//     console.error('Error in login:', error.message, error.stack);
//     return res.status(500).json({ 
//       error: 'Server error', 
//       details: error.message 
//     });
//   }
// });

// // Protected route example
// router.get('/user', (req, res) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'No token' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     res.json({ 
//       email: decoded.email,
//       userType: decoded.userType
//     });
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// });

// module.exports = router;



const express = require('express');
const jwt = require('jsonwebtoken');
const { sheets, spreadsheetId } = require('../config/googleSheet');

const router = express.Router();

// Valid user types - exact match after normalization (case-sensitive)
const VALID_USER_TYPES = ['Admin', 'Bharti', 'Abhinandan meena', 'Ravindra Singh', 'Ashok Sir'];

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Fetch all columns A to M
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Users!A:M',
    });

    const rows = response.data.values || [];

    // Debug logs for Type column issues
    console.log('\n=== DEBUG: ALL USER TYPES IN SHEET ===');
    rows.slice(1).forEach((row, idx) => {
      const rawType = row[2] || '';
      console.log(`Row ${idx + 1}: "${rawType}" (length: ${rawType.length})`);
      console.log(`  Char codes: ${rawType.split('').map(c => `${c}=${c.charCodeAt(0)}`).join(', ')}`);
    });
    console.log('=====================================\n');

    if (rows.length <= 1) {
      return res.status(400).json({ error: 'No users found in the sheet' });
    }

    // Find user by email (col 0) and password (col 1)
    const userRow = rows.slice(1).find(row => row[0] === email && row[1] === password);

    if (!userRow) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Normalize Type (column C → index 2)
    let userType = (userRow[2] || '')
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s-]/g, '');  // keep hyphen & space

    console.log('Raw userType from sheet:', `"${userRow[2]}"`);
    console.log('Normalized userType:', `"${userType}"`);

    // Validate type
    if (!VALID_USER_TYPES.includes(userType)) {
      console.error(`Invalid user type: "${userType}" | Raw: "${userRow[2]}"`);
      return res.status(400).json({
        error: 'Invalid user type in database',
        receivedType: userType,
        rawFromSheet: userRow[2],
        validTypes: VALID_USER_TYPES,
        hint: 'Check for extra spaces, tabs, special characters or typos in Google Sheet Type column'
      });
    }

    // Build complete user object
    const user = {
      email: userRow[0] || '',
      type: userType,
      name: userRow[3] || '',
      employeeId: userRow[4] || '',
      phone: userRow[5] || '',
      role: userRow[6] || '',
      department: userRow[7] || '',
      location: userRow[8] || '',
      joinDate: userRow[9] || '',
      photo: userRow[10] || '',
      bio: userRow[11] || '',
      projects: []
    };

    // Parse projects JSON from URL column (M → index 12)
    const urlJson = userRow[12] || '[]';
    try {
      user.projects = JSON.parse(urlJson);
      if (!Array.isArray(user.projects)) {
        user.projects = [];
      }
    } catch (parseError) {
      console.error('JSON parse error in URL column:', parseError.message);
      user.projects = [];
    }

    // Generate JWT token (only minimal data)
    const token = jwt.sign(
      { email: user.email, userType: user.type },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send full user profile data
    return res.json({
      success: true,
      token,
      user: {
        email: user.email,
        type: user.type,
        name: user.name,
        employeeId: user.employeeId,
        phone: user.phone,
        role: user.role,
        department: user.department,
        location: user.location,
        joinDate: user.joinDate,
        photo: user.photo,
        bio: user.bio,
        projects: user.projects  // [{name, sheet_url, script_url, email, password, ...}]
      }
    });

  } catch (error) {
    console.error('Login error:', error.message, error.stack);
    return res.status(500).json({
      error: 'Server error',
      details: error.message
    });
  }
});

module.exports = router;