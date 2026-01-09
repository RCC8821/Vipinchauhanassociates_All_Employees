// const express = require('express');
// const jwt = require('jsonwebtoken');
// const { sheets, spreadsheetId } = require('../config/googleSheet');

// const router = express.Router();

// // Login endpoint
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId,
//       range: 'Users!A:C',
//     });

//     const rows = response.data.values || [];
//     console.log('Google Sheet rows:', rows); // Log all rows

//     if (rows.length === 0) {
//       return res.status(400).json({ error: 'No users found in the sheet' });
//     }

//     const user = rows.slice(1).find((row) => row[0] === email && row[1] === password);
//     console.log('Matched user:', user); // Log matched user

//     if (!user) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//  const userType = user[2]?.trim();

// // Extra safety: remove any extra invisible characters and normalize case if needed
// const normalizedUserType = userType
//   .replace(/\s+/g, ' ')    // multiple spaces ko single kar do
//   .trim();

// // अब validation case-insensitive कर दो (सुरक्षित रहेगा)
// const validUserTypes = ['Admin','Bharti','Govind Ram Nagar', 'Ravindra Singh', 'Ashok Sir'];
// if (!validUserTypes.includes(normalizedUserType)) {
//   return res.status(400).json({ error: 'Invalid user type' });
// }

// // Token में normalized भेजो
// const token = jwt.sign({ email, userType: normalizedUserType }, process.env.JWT_SECRET, {
//   expiresIn: '1h',
// });

// return res.json({ token, userType: normalizedUserType });
//   } catch (error) {
//     console.error('Error in login:', error.message, error.stack);
//     return res.status(500).json({ error: 'Server error', details: error.message });
//   }
// });

// // Protected route example
// router.get('/user', (req, res) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'No token' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     res.json({ email: decoded.email });
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// });

// module.exports = router;

const express = require('express');
const jwt = require('jsonwebtoken');
const { sheets, spreadsheetId } = require('../config/googleSheet');

const router = express.Router();

// Define valid user types (must match frontend dashboard EXACTLY)
const VALID_USER_TYPES = ['Admin', 'Bharti', 'Govind Ram Nagar', 'Ravindra Singh', 'Ashok Sir'];

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Users!A:C',
    });

    const rows = response.data.values || [];
    console.log('Google Sheet rows:', rows);
    
    // Debug: सभी users के type को देखो
    console.log('\n=== ALL USER TYPES IN SHEET ===');
    rows.slice(1).forEach((row, idx) => {
      const rawType = row[2] || '';
      console.log(`Row ${idx + 1}: "${rawType}" (length: ${rawType.length})`);
      console.log(`  Char codes:`, rawType.split('').map(c => `${c}=${c.charCodeAt(0)}`).join(', '));
    });
    console.log('===========================\n');

    if (rows.length === 0) {
      return res.status(400).json({ error: 'No users found in the sheet' });
    }

    // Find user by email and password
    const user = rows.slice(1).find((row) => row[0] === email && row[1] === password);
    console.log('Matched user:', user);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Normalize user type: remove all extra spaces, trim, and handle case
    let userType = (user[2] || '')
      .trim()                           // शुरु और अंत का space हटाओ
      .replace(/\s+/g, ' ')             // multiple spaces को single में करो
      .replace(/[^\w\s]/g, '');         // special characters हटाओ
    
    console.log('Raw userType from sheet:', `"${user[2]}"`);
    console.log('Normalized userType:', `"${userType}"`);
    
    // ✅ Don't convert to lowercase - keep exact case from sheet
    // Validate user type exists in our system
    if (!VALID_USER_TYPES.includes(userType)) {
      console.error(`Invalid user type: "${userType}". Valid types: ${VALID_USER_TYPES.join(', ')}`);
      return res.status(400).json({ 
        error: 'Invalid user type in database',
        receivedType: userType,
        receivedTypeDebug: `"${userType}"`,
        validTypes: VALID_USER_TYPES,
        hint: 'Check for extra spaces or special characters in Google Sheet'
      });
    }

    // Create JWT token with normalized user type
    const token = jwt.sign(
      { email, userType },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ 
      token, 
      userType,
      email 
    });

  } catch (error) {
    console.error('Error in login:', error.message, error.stack);
    return res.status(500).json({ 
      error: 'Server error', 
      details: error.message 
    });
  }
});

// Protected route example
router.get('/user', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ 
      email: decoded.email,
      userType: decoded.userType
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;