import jwt from 'jsonwebtoken';


const createToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const adminLogin = async (req, res) => {
  try {

    const {username, password } = req.body;

    if (!username || !password) {
      return res.json({ success: false, message: 'Email and password are required' });
    }

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      const token = createToken(username);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

export { adminLogin }
